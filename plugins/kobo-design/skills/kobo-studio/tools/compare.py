#!/usr/bin/env python3
"""
kobo-studio — la page livrée À CÔTÉ de la démo de son skill : une planche d'images prises aux mêmes instants.

  python3 tools/compare.py <projet> [--page index.html] [--skill <id>] [--largeur 1440] [--servir dist]

Pour la page du projet et pour ../<skill>/examples/demo.html, le script prend six images dans un navigateur sans interface,
mouvement NON réduit (les images d'animation, l'observation à l'écran et l'événement de défilement y sont relayés par des
minuteries, pour la page comme pour la démo : voir RELAIS) :
  - l'entrée : 250 ms, 700 ms et 2 s après l'ouverture ;
  - le défilement : un écran plus bas, 250 ms puis 2 s après le saut ; puis trois écrans plus bas, 2 s après.
Il les assemble en une planche de deux rangées (la page en haut, la démo en bas) : <projet>/captures/comparaison-<page>-<largeur>.png

C'est un enregistrement court, image par image, et une simulation : il montre si quelque chose bouge à l'entrée et au
défilement, et si la mise en page a la tenue de la démo. Il ne mesure rien et ne rend aucun verdict : le verdict « au niveau / en dessous » se donne en
regardant la planche (SKILL.md, étape e). La fluidité se mesure à part, dans un vrai navigateur au premier plan.
Projet React : construire d'abord (npm run build) ; les pages sont lues dans dist/.
"""
import argparse
import re
import shutil
import subprocess
import sys
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import check_studio as cs   # noqa: E402  (navigateur, chemins, dossier temporaire : les mêmes que la vérification)

STUDIO = Path(__file__).resolve().parent.parent
FILM = """<!doctype html><meta charset="utf-8"><style>html,body{margin:0;overflow:hidden}iframe{display:block;border:0}</style>
<iframe id="f"></iframe><script>
var q = new URLSearchParams(location.search), f = document.getElementById('f');
f.width = q.get('w'); f.height = q.get('h'); f.src = q.get('p');
f.onload = function () { var y = +q.get('y'); if (y) setTimeout(function () { var w = f.contentWindow; w.scrollTo({ top: y * w.innerHeight, behavior: 'instant' }); w.dispatchEvent(new Event('scroll')); w.document.dispatchEvent(new Event('scroll')); }, +q.get('d')); };
</script>"""
# Dans un navigateur sans interface à temps simulé, aucune image n'est produite avant la capture : requestAnimationFrame,
# IntersectionObserver et l'événement de défilement ne se déclenchent pas, et tout mouvement qui en dépend resterait figé sur la
# planche. La page ET la démo sont donc servies avec ce relais, qui les fait avancer par des minuteries (qui, elles, suivent le
# temps simulé). C'est une simulation : la planche montre l'allure des mouvements, pas leur fluidité ni leur durée exacte.
RELAIS = """<script>(function () {
  var n = 0, q = {};
  window.requestAnimationFrame = function (f) { var i = ++n; q[i] = setTimeout(function () { delete q[i]; f(performance.now()); }, 16); return i; };
  window.cancelAnimationFrame = function (i) { clearTimeout(q[i]); delete q[i]; };
  window.IntersectionObserver = function (cb, opt) {
    var els = [], state = new Map(), self = this, th = (opt && opt.threshold) || 0;
    if (Array.isArray(th)) th = th[0];
    this.observe = function (e) { if (els.indexOf(e) < 0) els.push(e); };
    this.unobserve = function (e) { els = els.filter(function (x) { return x !== e; }); state.delete(e); };
    this.disconnect = function () { els = []; };
    this.takeRecords = function () { return []; };
    setInterval(function () {
      var out = [];
      els.forEach(function (e) {
        var r = e.getBoundingClientRect(), h = Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0)), w = Math.max(0, Math.min(r.right, innerWidth) - Math.max(r.left, 0));
        var ratio = r.width * r.height ? (h * w) / (r.width * r.height) : 0, on = ratio > 0 && ratio >= th;
        if (state.get(e) !== on) { state.set(e, on); out.push({ target: e, isIntersecting: on, intersectionRatio: ratio, boundingClientRect: r }); }
      });
      if (out.length) cb(out, self);
    }, 50);
  };
})();</script>"""
# Le saut se fait d'un coup (behavior: instant) : une démo peut défiler en douceur.
# (écrans défilés, attente avant le saut, temps total) — en millisecondes de temps de page
FRAMES = [(0, 0, 250, "entrée, 250 ms"), (0, 0, 700, "entrée, 700 ms"), (0, 0, 2000, "entrée, 2 s"),
          (1, 2000, 2250, "1 écran plus bas, 250 ms"), (1, 2000, 4000, "1 écran plus bas, 2 s"), (3, 2000, 4000, "3 écrans plus bas, 2 s")]


class Handler(SimpleHTTPRequestHandler):
    roots = {}

    def log_message(self, *a):
        pass

    def translate_path(self, path):
        path = path.split("?", 1)[0].split("#", 1)[0]
        for prefix, root in self.roots.items():
            if path.startswith(prefix):
                return str(root / path[len(prefix):].lstrip("/"))
        return str(STUDIO / "tools" / "introuvable")

    def do_GET(self):
        if "kfilm=1" in self.path and self.path.split("?", 1)[0].endswith(".html"):
            target = Path(self.translate_path(self.path))
            if target.exists():
                text = target.read_text(encoding="utf-8", errors="replace")
                text = re.sub(r"(<head[^>]*>)", lambda m: m.group(1) + RELAIS, text, count=1) if "<head" in text else RELAIS + text
                body = text.encode("utf-8")
                self.send_response(200); self.send_header("Content-Type", "text/html; charset=utf-8"); self.send_header("Content-Length", str(len(body))); self.end_headers()
                self.wfile.write(body)
                return
        if self.path.startswith("/__film"):
            body = FILM.encode("utf-8")
            self.send_response(200); self.send_header("Content-Type", "text/html; charset=utf-8"); self.send_header("Content-Length", str(len(body))); self.end_headers()
            self.wfile.write(body)
            return
        super().do_GET()


def shoot(browser, tmp, port, target, w, h, frame, out):
    y, wait, total, _ = frame
    url = f"http://localhost:{port}/__film?p={target}%3Fkfilm%3D1&w={w}&h={h}&y={y}&d={wait}"
    args = [browser, "--headless", "--hide-scrollbars", "--no-first-run", "--no-default-browser-check", "--mute-audio", "--force-device-scale-factor=1",
            f"--user-data-dir={cs.native(tmp / 'profil', browser)}", f"--window-size={max(w, 500)},{h}", f"--virtual-time-budget={total}",
            f"--screenshot={cs.native(out, browser)}", url]
    for _ in range(2):                                    # le premier lancement d'un profil neuf ne rend parfois rien
        try:
            subprocess.run(args, capture_output=True, timeout=90)
        except subprocess.TimeoutExpired:
            pass
        if out.exists():
            return True
    return False


def main():
    ap = argparse.ArgumentParser(description="Planche de comparaison entre une page livrée et la démo de son skill.")
    ap.add_argument("projet")
    ap.add_argument("--page", default="index.html")
    ap.add_argument("--skill")
    ap.add_argument("--largeur", type=int, default=1440)
    ap.add_argument("--servir")
    a = ap.parse_args()
    project = Path(a.projet).resolve()
    serve = project / (a.servir or ("dist" if (project / "package.json").exists() else "."))
    page = serve / a.page
    if not page.exists():
        print(f"Page introuvable : {page}")
        return 1
    src = project / a.page if (project / a.page).exists() else page
    found = re.search(r'data-k-skill="([\w-]+)"', src.read_text(encoding="utf-8", errors="replace"))
    skill = a.skill or (found.group(1) if found else None)
    demo = STUDIO.parent / str(skill) / "examples" / "demo.html"
    if not skill or not demo.exists():
        print("Skill inconnu ou sans démo : préciser --skill <id>.")
        return 1
    browser = cs.find_browser()
    try:
        from PIL import Image, ImageDraw, ImageFont
    except ImportError:
        browser = None
    if not browser:
        print("COMPARAISON NON FAITE : aucun navigateur (Chrome, Chromium ; variable KOBO_CHROME) ou Pillow absent.")
        print("À écrire à la livraison : « Comparaison avec la démo du skill non faite : le niveau de la page n'est pas vérifié. »")
        return 2
    w, h = a.largeur, 900 if a.largeur > 500 else 844
    Handler.roots = {"/__projet/": serve, "/__demo/": demo.parent}
    server = ThreadingHTTPServer(("0.0.0.0", 0), partial(Handler))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    tmp = cs.work_dir(browser)
    rows, missing = [], 0
    try:
        shoot(browser, tmp, server.server_address[1], "about:blank", 500, 300, (0, 0, 100, ""), tmp / "amorce.png")
        for label, target in (("page", f"/__projet/{a.page}"), ("demo", "/__demo/demo.html")):
            shots = []
            for i, frame in enumerate(FRAMES):
                out = tmp / f"{label}-{i}.png"
                ok = shoot(browser, tmp, server.server_address[1], target, w, h, frame, out)
                missing += not ok
                shots.append(Image.open(out).convert("RGB").crop((0, 0, w, h)) if ok else Image.new("RGB", (w, h), (128, 128, 128)))
            rows.append(shots)
    finally:
        server.shutdown()
    tw = 360 if w > 500 else 180                          # largeur d'une vignette de la planche
    th, band = round(h * tw / w), 22
    sheet = Image.new("RGB", (tw * len(FRAMES) + 8 * (len(FRAMES) - 1), (th + band) * 2 + 10), (255, 255, 255))
    draw = ImageDraw.Draw(sheet)
    try:
        font = ImageFont.truetype("DejaVuSans.ttf", 12)
    except OSError:                                       # police sans accents : libellés lisibles quand même
        font = None
    for r, (shots, name) in enumerate(zip(rows, (f"La page ({a.page})", f"La démo du skill ({skill})"))):
        for i, shot in enumerate(shots):
            x, y = i * (tw + 8), r * (th + band + 10)
            text = f"{name} : {FRAMES[i][3]}" if i == 0 else FRAMES[i][3]
            draw.text((x + 2, y + 4), text if font else text.encode("ascii", "ignore").decode(), fill=(0, 0, 0), font=font)
            sheet.paste(shot.resize((tw, th), Image.LANCZOS), (x, y + band))
    out_dir = project / "captures"
    out_dir.mkdir(exist_ok=True)
    out = out_dir / f"comparaison-{Path(a.page).stem}-{w}.png"
    sheet.save(out, optimize=True)
    shutil.rmtree(tmp, ignore_errors=True)
    print(f"Planche : {out}")
    print("  rangée du haut : la page ; rangée du bas : la démo du skill, aux mêmes instants.")
    if missing:
        print(f"  {missing} image(s) non rendue(s) (cases grises).")
    print("  À regarder : quelque chose bouge-t-il à l'entrée et au défilement comme dans la démo ? La mise en page ose-t-elle autant ?")
    print("  Verdict à écrire à la livraison : « au niveau » ou « en dessous » ; en dessous, on continue au lieu de livrer.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
