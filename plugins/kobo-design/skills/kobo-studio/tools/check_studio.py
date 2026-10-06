#!/usr/bin/env python3
"""
kobo-studio — vérification d'un PROJET construit avec le skill.

  python3 tools/check_studio.py <projet> [--pages index.html …] [--servir dist] [--sans-navigateur] [--rapide] [--prefixe lot-1-]
  python3 tools/check_studio.py <site-existant> --constat [--captures <projet>/captures] [--prefixe avant-]     (mode reprise)

1. La bibliothèque : lance check_contract.py sur la fiche du skill du projet, puis check_components.py.
2. Les fichiers du projet (tout sauf kobo/, node_modules/, dist/, captures/) :
   - valeurs en dur (couleur, longueur, durée) et motifs anti-slop, avec les règles de check_components.py ;
   - un seul skill chargé ; ni apercu.js ni templates/index.js (outils de démonstration) ; aucun reste du contenu de démonstration ;
   - un <h1>, <header>, <main>, <footer>, lien d'évitement, langue ; de vraies images ;
   - brand.css, s'il existe : les paires de contraste du contrat recalculées avec les couleurs de la marque ;
   - alerte (pas une erreur) : la couche mouvement du skill (components/motion/) existe et la page ne la charge pas, ou la page
     n'a aucune animation signature (ni couche mouvement, ni gabarit).
3. Les pages dans un navigateur (Chrome ou Chromium sans interface), à 1440 et 390 px de large :
   - captures pleine page dans <projet>/captures/<page>-1440.png et -390.png (pour la grille anti-slop) ;
   - contenu masqué, texte sous 12 px, débordement horizontal, images qui ne chargent pas ;
   - alerte (pas une erreur) : séries de trois éléments ou plus de même forme côte à côte (cartes identiques) ;
   - contraste mesuré sur capture, avec les vraies images : deux captures de chaque écran, avec puis sans les lettres ;
     les pixels qui diffèrent sont les lettres ; la couleur du texte est comparée à chaque pixel du fond situé sous
     une lettre et à 2 px autour ; le pire rapport est retenu. Seuil 4,5 ; 3 pour un texte d'au moins 24 px
     (ou 18,66 px en gras). Mouvements figés (prefers-reduced-motion forcé).

Projet React : construire d'abord (npm run build, avec base: './' dans vite.config.js) ; les pages sont lues dans dist/.
Navigateur : variable KOBO_CHROME, sinon chrome / chromium du PATH, sinon le Chrome de Windows depuis WSL.
--rapide ne mesure que le premier écran. --prefixe nomme les captures (avant-, lot-1-…) pour garder l'avant et l'après.
--constat : pour un site qui n'est PAS un projet kobo-studio (mode reprise) ; ni bibliothèque ni règles du projet, seulement
les captures et ce que le navigateur mesure, rendu comme un état des lieux (code de sortie 0).
Sans navigateur (aucun trouvé, --sans-navigateur, ou il ne rend rien) : les contrôles 1 et 2 tournent quand même ; le script
écrit « VÉRIFICATION VISUELLE NON FAITE » et la phrase à reporter à la livraison. Rien de ce que le navigateur aurait mesuré
n'est alors tenu pour vérifié.
4. Les parcours : RIEN. Le script ne joue aucune tâche ; il le rappelle en fin de sortie et signale (alerte) un projet sans
   parcours.md. La vérification UX est quality/ux-grille.md.

Code de sortie : 1 si une erreur est trouvée ; 2 si aucune erreur mais la vérification visuelle n'a pas été faite ; 0 sinon.
"""
import argparse
import json
import math
import os
import queue
import re
import shutil
import subprocess
import sys
import tempfile
import threading
from concurrent.futures import ThreadPoolExecutor
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

TOOLS = Path(__file__).resolve().parent
sys.path.insert(0, str(TOOLS))
import check_components as cc  # noqa: E402
import check_contract as ct  # noqa: E402

STUDIO = TOOLS.parent
SKIP_DIRS = {"kobo", "node_modules", "dist", "build", "captures", "avant", ".git", ".vite"}
DEMO = re.compile(r"Cordée Brume|projet fictif|CONTENU DE DÉMONSTRATION", re.I)
SIZES = ((1440, 900), (390, 844))
MAX_TILES = 16

FRAME = TOOLS / "sonde.html"   # la page enveloppe : fige, défile, relève


class Handler(SimpleHTTPRequestHandler):
    reports, served = {}, [0, 0]

    def log_message(self, *a):
        pass

    def do_GET(self):
        url = urlparse(self.path)
        if url.path == "/__k/frame":
            body = FRAME.read_bytes()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        local = Path(self.translate_path(self.path))
        if local.is_file():
            Handler.served[0] += local.stat().st_size
            Handler.served[1] += 1
        super().do_GET()

    def do_POST(self):
        data = json.loads(self.rfile.read(int(self.headers.get("Content-Length", 0))) or b"{}")
        Handler.reports[data.get("key")] = data
        self.send_response(204)
        self.end_headers()


EMPTY_WORDS = {"le", "la", "les", "un", "une", "des", "du", "de", "au", "aux", "et", "ou", "en", "sur", "pour", "nos", "notre", "vos", "votre", "mes", "mon", "ma", "ses", "son", "sa", "ce", "cet", "cette", "ces", "the", "of", "and"}


def find_browser():
    env = os.environ.get("KOBO_CHROME")
    names = ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser", "chrome", "chrome-headless-shell", "msedge"]
    fixed = ["/mnt/c/Program Files/Google/Chrome/Application/chrome.exe", "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
             "/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
             r"C:\Program Files\Google\Chrome\Application\chrome.exe"]
    for cand in ([env] if env else []) + [shutil.which(n) for n in names] + fixed:
        if cand and Path(cand).exists():
            return cand
    return None


def native(path, browser):
    """Chemin tel que le navigateur le comprend (Chrome de Windows lancé depuis WSL : chemin Windows)."""
    if browser.endswith(".exe") and str(path).startswith("/"):
        return subprocess.run(["wslpath", "-w", str(path)], capture_output=True, text=True).stdout.strip()
    return str(path)


def work_dir(browser):
    """Dossier temporaire lisible par le navigateur et par ce script."""
    if browser.endswith(".exe") and Path("/mnt/c").exists():
        win = subprocess.run(["cmd.exe", "/c", "echo %TEMP%"], capture_output=True, text=True, cwd="/mnt/c").stdout.strip()
        unix = subprocess.run(["wslpath", "-u", win], capture_output=True, text=True).stdout.strip() if win else ""
        if unix and Path(unix).is_dir():
            return Path(tempfile.mkdtemp(prefix="kobo-studio-", dir=unix))
    return Path(tempfile.mkdtemp(prefix="kobo-studio-"))


def rgba(value):
    m = re.match(r"rgba?\(([^)]+)\)", value or "")
    if m:
        p = [float(x) for x in re.split(r"[,\s/]+", m.group(1).strip()) if x]
        return (p[0], p[1], p[2], p[3] if len(p) > 3 else 1.0)
    m = re.match(r"color\(srgb ([\d.]+) ([\d.]+) ([\d.]+)(?: / ([\d.]+))?\)", value or "")
    if m:
        return (float(m.group(1)) * 255, float(m.group(2)) * 255, float(m.group(3)) * 255, float(m.group(4) or 1))
    return None


class Browser:
    def __init__(self, path, port, tmp):
        self.path, self.port, self.tmp = path, port, tmp
        self.profiles = queue.Queue()
        for i in range(4):
            self.profiles.put(tmp / f"profil-{i}")
        self.warm = set()

    def run(self, profile, w, h, out, url):
        try:
            subprocess.run([self.path, "--headless", "--hide-scrollbars", "--no-first-run", "--no-default-browser-check", "--mute-audio",
                            "--force-device-scale-factor=1", "--force-prefers-reduced-motion", f"--user-data-dir={native(profile, self.path)}",
                            f"--window-size={max(w, 500)},{h}", "--virtual-time-budget=9000", f"--screenshot={native(out, self.path)}", url]
                           + os.environ.get("KOBO_CHROME_ARGS", "").split(), capture_output=True, timeout=60)
        except subprocess.TimeoutExpired:
            pass
        return out.exists()

    def shot(self, page, w, h, y, mode, key):
        out = self.tmp / f"{key}-{mode}.png"
        url = f"http://localhost:{self.port}/__k/frame?p=/{page}&w={w}&h={h}&y={y}&m={mode}&k={key}"
        profile = self.profiles.get()
        try:
            if profile not in self.warm:                     # le premier lancement d'un profil neuf ne rend rien : on le fait à vide
                self.run(profile, 500, 300, self.tmp / f"{profile.name}.png", "about:blank")
                self.warm.add(profile)
            for _ in range(2):
                if self.run(profile, w, h, out, url) and (mode == "bare" or key in Handler.reports):
                    break
        finally:
            self.profiles.put(profile)
        return out if out.exists() else None


def measure(shot, bare, texts, found, top=0):
    """Contraste des textes d'un écran : lettres = pixels qui diffèrent entre les deux captures."""
    from PIL import ImageChops, ImageFilter
    bands = ImageChops.difference(shot, bare).split()
    diff = ImageChops.lighter(ImageChops.lighter(bands[0], bands[1]), bands[2]).point(lambda v: 255 if v > 3 else 0)
    for it in texts:
        col = rgba(it["fill"]) if it["fill"] and rgba(it["fill"]) and rgba(it["fill"])[3] > 0 else rgba(it["color"])
        key = (it["t"], it["where"])
        entry = found.setdefault(key, {"t": it["t"], "where": it["where"], "ratio": None, "note": "", "y": round(top + it["rects"][0][1]),
                                       "need": 3.0 if it["size"] >= 24 or (it["size"] >= 18.66 and it["weight"] >= 700) else 4.5, "size": it["size"]})
        if it["off"]:
            entry["note"] = "désactivé"
            continue
        if col is None or col[3] == 0:
            entry["note"] = entry["note"] or "couleur non lue (texte en dégradé ?)"
            continue
        for x, y, w, h in it["rects"]:
            box = (max(0, int(x) - 2), max(0, int(y) - 2), min(shot.width, math.ceil(x + w) + 2), min(shot.height, math.ceil(y + h) + 2))
            if box[2] <= box[0] or box[3] <= box[1]:
                continue
            mask = diff.crop(box)
            lit = mask.histogram()[255]
            if not lit:
                continue
            if lit > 0.7 * mask.width * mask.height:
                entry["note"] = "fond changeant (vidéo, 3D) : non mesuré"
                continue
            ring = mask.filter(ImageFilter.MaxFilter(5))
            grounds = {px for px, k in zip(bare.crop(box).get_flattened_data() if hasattr(bare, 'get_flattened_data') else bare.crop(box).getdata(), ring.tobytes()) if k}
            for g in grounds:
                r = ct.ratio(ct.over(col, g) if col[3] < 1 else col, g)
                if entry["ratio"] is None or r < entry["ratio"]:
                    entry["ratio"] = r


def browse(page, w, h, browser, out_dir, quick, prefix=""):
    """Capture une page à une largeur. Renvoie (erreurs, notes)."""
    from PIL import Image
    errs, notes, name = [], [], Path(page).stem
    Handler.served[:] = [0, 0]
    key0 = f"{name}-{w}-0"
    first = browser.shot(page, w, h, 0, "probe", key0)
    rep = Handler.reports.get(key0)
    if not first or not rep:
        return [f"{page} à {w} px : capture impossible (le navigateur n'a rien rendu)"], notes
    weight = tuple(Handler.served)
    doc = rep["doc"]
    count = 1 if quick else min(MAX_TILES, math.ceil(doc["height"] / h))
    jobs = [(i, "probe") for i in range(1, count)] + [(i, "bare") for i in range(count)]
    with ThreadPoolExecutor(4) as pool:
        shots = dict(zip(jobs, pool.map(lambda j: browser.shot(page, w, h, j[0] * h, j[1], f"{name}-{w}-{j[0]}"), jobs)))
    shots[(0, "probe")] = first
    full = Image.new("RGB", (w, min(doc["height"], count * h)))
    found = {}
    for i in range(count):
        rep_i, a, b = Handler.reports.get(f"{name}-{w}-{i}"), shots.get((i, "probe")), shots.get((i, "bare"))
        if not (rep_i and a and b):
            notes.append(f"{page} à {w} px : écran {i + 1} non capturé")
            continue
        a, b = Image.open(a).convert("RGB").crop((0, 0, w, h)), Image.open(b).convert("RGB").crop((0, 0, w, h))
        full.paste(a, (0, int(rep_i["y"])))
        measure(a, b, rep_i["texts"], found, rep_i["y"])
    full.save(out_dir / f"{prefix}{name}-{w}.png")
    if doc["height"] > count * h and not quick:
        notes.append(f"{page} à {w} px : page de {doc['height']} px, mesurée jusqu'à {count * h} px")
    where = f"{page} à {w} px"
    if doc["overflow"] > 1:
        errs.append(f"{where} : débordement horizontal de {doc['overflow']} px")
    for s in doc["hidden"][:12]:
        errs.append(f"{where} : contenu masqué : {s}")
    for s in doc["broken"]:
        errs.append(f"{where} : image qui ne charge pas : {s}")
    seen = set()
    for s in doc["small"]:
        if (s["t"], s["size"]) not in seen and len(seen) < 12:
            seen.add((s["t"], s["size"]))
            errs.append(f"{where} : texte de {s['size']:g} px (sous 12 px) : {s['where']} « {s['t']} »")
    if w == SIZES[0][0]:
        if doc["h1"] != 1:
            errs.append(f"{page} : {doc['h1']} <h1> dans la page rendue (il en faut un)")
        if not doc["main"] or not doc["skip"]:
            errs.append(f"{page} : <main> ou lien d'évitement (.k-skip) absent de la page rendue")
        if not doc["images"] and not doc.get("app"):   # une application n'a pas de photo imposée
            (errs if Path(page).stem == "index" else notes).append(f"{page} : aucune image dans la page rendue (anti-slop I3 : de vraies images)")
        for s in doc.get("series", []):
            notes.append(f"ALERTE anti-slop (K2, F1) — {page} : {s['count']} éléments de même forme côte à côte dans {s['where']} (« {s['first']} »…) : "
                         "une liste est une liste ; des cartes seulement si chacune a une image et une destination, l'une mise en avant")
        for word in doc.get("giants", []):
            letters = re.sub(r"[^A-Za-zÀ-ÿ0-9]", "", word)
            if len(letters) < 3 or word.lower() in EMPTY_WORDS:
                notes.append(f"ALERTE anti-slop (Y2) — {page} : mot géant « {word} » ({len(letters)} lettre(s)) : un mot géant est le nom du projet ou un mot-clé "
                             "choisi exprès (data-k-word), jamais un article ni un mot vide")
        if doc["eager"]:
            notes.append(f"{page} : {doc['eager']} image(s) sous le premier écran sans loading=\"lazy\" (performance)")
        notes.append(f"{page} : {weight[1]} fichier(s) locaux, {weight[0] / 1024:.0f} Ko servis au premier écran (hors polices et images distantes)"
                     + (" — lourd : au-delà de 1 Mo, réduire les images du premier écran" if weight[0] > 1024 * 1024 else ""))
    measured = [e for e in found.values() if e["ratio"] is not None]
    for e in sorted(measured, key=lambda e: e["ratio"]):
        if e["ratio"] < e["need"] - 0.005:
            errs.append(f"{where} : contraste {e['ratio']:.2f}:1 (min {e['need']:g}) : {e['where']} « {e['t']} » ({e['size']:g} px, à {e['y']} px du haut)")
    skipped = sorted({e["note"] for e in found.values() if e["ratio"] is None and e["note"] and e["note"] != "désactivé"})
    worst = min(measured, key=lambda e: e["ratio"]) if measured else None
    notes.append(f"{where} : {len(measured)} texte(s) mesuré(s) sur capture"
                 + (f", pire rapport {worst['ratio']:.2f}:1 « {worst['t'][:30]} »" if worst else "")
                 + (" ; non mesurés : " + ", ".join(skipped) if skipped else ""))
    return errs, notes


def brand(path, skill):
    """Paires de contraste du contrat, recalculées avec les couleurs de marque."""
    css = cc.strip_comments(path.read_text(encoding="utf-8"))
    m = re.search(r":root\[data-k-brand\]\s*\{(.*?)\}", css, re.S)
    over = ct.declarations(m.group(1)) if m else {}
    if not over:
        return [], ["brand.css : aucune couleur de marque déclarée"]
    errs = [f"brand.css : {k} n'est pas un rôle (on ne redéfinit que des --k-*, jamais un --k-sig-*)" for k in over if not k.startswith("--k-") or k.startswith("--k-sig")]
    map_path = STUDIO / "contract/maps" / f"{skill}.css"
    tokens = ct.root_block((STUDIO.parent / skill / "references/tokens.css").read_text(encoding="utf-8"))
    env = {**ct.root_block((STUDIO / "contract/roles.css").read_text(encoding="utf-8")), **tokens, **ct.root_block(map_path.read_text(encoding="utf-8")), **over}
    bg, lines = ct.color("var(--k-bg)", env), []
    for fg_role, bg_role, need in ct.PAIRS:
        fg, back = ct.color(f"var(--k-{fg_role})", env), ct.color(f"var(--k-{bg_role})", env)
        if fg is None or back is None or bg is None:
            errs.append(f"brand.css : {fg_role}/{bg_role} : couleur illisible")
            continue
        back = ct.over(back, bg)
        r = ct.ratio(ct.over(fg, back), back)
        if (fg_role, bg_role) == ("accent", "bg") and r < need:
            edge = ct.color("var(--k-accent-edge)", env)
            r_edge = ct.ratio(ct.over(edge, bg), bg) if edge else 0
            if env.get("--k-accent-on-bg", "").strip() != "0" or r_edge < need:
                errs.append(f"brand.css : accent de marque à {r:.2f}:1 sur le fond (min 3) : déclarer --k-accent-edge (3:1) et --k-accent-on-bg: 0")
            continue
        if (fg_role, bg_role) == ("accent", "bg") and env.get("--k-accent-on-bg", "").strip() == "0":
            errs.append(f"brand.css : l'accent de marque atteint {r:.2f}:1 sur le fond : déclarer --k-accent-on-bg: 1")
        (lines if r >= need else errs).append(f"brand.css : {'' if r >= need else 'contraste '}{fg_role}/{bg_role} {r:.2f}:1 (min {need:g})")
    return errs, [f"brand.css : {len(over)} rôle(s) redéfini(s), {len(lines)} paire(s) conformes"]


def demo_titles():
    """Titres des pages de démonstration des structures : en retrouver un dans un projet, c'est du contenu non remplacé."""
    out = set()
    for f in (STUDIO / "ux/structures").glob("*/*.html"):
        # un titre marqué data-k-fixed appartient à la structure (fenêtre d'aide…) : le garder n'est pas un oubli
        for t in re.findall(r"<h[1-3](?![^>]*\bdata-k-fixed)[^>]*>(.*?)</h[1-3]>", f.read_text(encoding="utf-8"), flags=re.S):
            t = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", t)).strip()
            if len(t) > 14:
                out.add(t)
    return out


def static(project):
    """Fichiers du projet. Renvoie (erreurs, notes, skill)."""
    errs, notes, maps, texts = [], [], set(), {}
    demo = demo_titles()
    roles = set(re.findall(r"(--k-[\w-]+)\s*:", (STUDIO / "contract/roles.css").read_text(encoding="utf-8")))
    for f in sorted(project.rglob("*")):
        rel = f.relative_to(project)
        if not f.is_file() or SKIP_DIRS & set(rel.parts) or f.suffix not in (".html", ".css", ".js", ".jsx", ".tsx", ".ts"):
            continue
        if f.name.endswith((".config.js", ".config.ts")):
            continue
        texts[rel.as_posix()] = f.read_text(encoding="utf-8", errors="replace")
    for where, text in texts.items():
        maps |= set(re.findall(r"contract/maps/([\w-]+)\.css", text))
        if re.search(r"apercu\.js|templates/index\.js", text):
            errs.append(f"{where} : outil de démonstration chargé (apercu.js ou templates/index.js) : une page livrée charge son skill en dur")
        m = DEMO.search(text)
        left = [m.group(0)] if m else sorted(t for t in demo if t in text)[:3]
        if left:
            errs.append(f"{where} : reste du contenu de démonstration (« {' », « '.join(left)} ») : contenu réel seulement")
        if where.endswith(".css"):
            if Path(where).name == "brand.css":
                continue
            css = cc.strip_comments(text)
            errs += cc.hard_values(css, where) + cc.slop(css, where)
            for name in sorted(set(re.findall(r"var\((--k-[\w-]+)", css)) - roles):
                errs.append(f"{where} : rôle inexistant {name} (voir kobo/kobo-studio/contract/roles.css ; échelle d'espace : 1, 2, 3, 4, 6, 8, 12, 16, 24, 32)")
            for n, line in enumerate(css.splitlines(), 1):
                if re.search(r"(\.k-facts|\.k-lead|\.k-kicker|caption|\.k-btn|\bh[1-4]\b|\bp\b|\bimg\b)[^{]*\{[^}]*display\s*:\s*none", line):
                    errs.append(f"{where}:{n} contenu masqué (display: none sur un texte, une image ou une action)")
        elif where.endswith(".html"):
            for block in re.findall(r"<style[^>]*>(.*?)</style>", text, flags=re.S):
                css = cc.strip_comments(block)
                errs += cc.hard_values(css, where + " <style>") + cc.slop(css, where + " <style>")
            body = re.sub(r"<style.*?</style>|<script.*?</script>", "", text, flags=re.S)
            errs += cc.markup(body, where)
            plain = re.sub(r"<!--.*?-->", "", body, flags=re.S)
            if 'type="module"' in text and "<h1" not in plain:
                continue                                         # coquille d'une application : la page rendue est vérifiée dans le navigateur
            if len(re.findall(r"<h1\b", plain)) != 1:
                errs.append(f"{where} : {len(re.findall(r'<h1', plain))} <h1> (il en faut un seul)")
            app = 'class="k-page ap"' in plain or "ap-body" in plain   # structure « application » : un outil n'a ni pied de page ni photo imposée
            for tag in ("header", "main") + (() if app else ("footer",)):
                if f"<{tag}" not in plain:
                    errs.append(f"{where} : <{tag}> manquant (anti-slop U12)")
            if "k-skip" not in plain:
                errs.append(f"{where} : lien d'évitement manquant (anti-slop U9)")
            if not re.search(r"<html[^>]*\blang=", plain):
                errs.append(f"{where} : attribut lang manquant sur <html>")
            if not app and not re.search(r"<(img|video|canvas)\b", plain):
                (errs if Path(where).stem == "index" else notes).append(f"{where} : aucune image (anti-slop I3 : de vraies images)")
            empty = len(re.findall(r"<img\b[^>]*\balt=\"\"", plain))
            if empty:
                notes.append(f"{where} : {empty} image(s) avec alt=\"\" : à réserver au décor (anti-slop T8)")
        else:
            errs += cc.markup(text, where)
    # Couche mouvement : une page sans le mouvement signature de son skill n'est pas au niveau de la démo (alerte, pas erreur)
    skill_id = sorted(maps)[0] if len(maps) == 1 else None
    if skill_id:
        has_layer = (STUDIO / f"components/motion/{skill_id}.css").exists()
        pages = [w for w in texts if w.endswith(".html")]
        code = "\n".join(texts.values())
        for w in pages:
            text = texts[w]
            module = 'type="module"' in text                 # page React : les imports sont dans src/
            src = code if module else text
            loaded = f"components/motion/{skill_id}.css" in src and f"components/motion/{skill_id}.js" in src and "components/motion/motion.js" in src
            if has_layer and not loaded:
                notes.append(f"ALERTE mouvement — {w} : la couche mouvement de {skill_id} existe et n'est pas chargée (motion.css, {skill_id}.css, motion.js, {skill_id}.js) : "
                             "la page n'a pas le mouvement signature du skill")
            elif has_layer and module and "useMouvement" not in code:
                notes.append(f"ALERTE mouvement — {w} : la couche mouvement est importée mais useMouvement() n'est appelé nulle part : rien ne se révèle")
            elif not has_layer and not re.search(r"ux/templates/[\w-]+/[\w-]+\.js", src):
                notes.append(f"ALERTE mouvement — {w} : aucune animation signature chargée ({skill_id} n'a pas encore de couche mouvement, et aucun gabarit n'est posé) : "
                             "le dire à la livraison")
        if re.search(r'data-k-intensity="(?:reduced|off)"', code) and has_layer:
            notes.append("mouvement : l'intensité de la page n'est pas « full » : la couche mouvement donne l'état final, sans bouger (choix du client à rappeler à la livraison)")
    if len(maps) > 1:
        errs.append("deux skills chargés (" + ", ".join(sorted(maps)) + ") : l'UI vient d'un seul skill")
    if not maps:
        errs.append("aucune fiche de skill chargée (contract/maps/<id>.css)")
    return errs, notes, (sorted(maps)[0] if maps else None), len(texts)


def tool(name, args):
    r = subprocess.run([sys.executable, str(TOOLS / name)] + args, capture_output=True, text=True)
    lines = [line for line in r.stdout.splitlines() if line.strip()]
    return r.returncode, [line for line in lines if "✗" in line], (lines[-1] if lines else "")


def main():
    ap = argparse.ArgumentParser(description="Vérifie un projet kobo-studio.")
    ap.add_argument("projet")
    ap.add_argument("--pages", nargs="*")
    ap.add_argument("--servir")
    ap.add_argument("--sans-navigateur", action="store_true")
    ap.add_argument("--rapide", action="store_true")
    ap.add_argument("--constat", action="store_true")
    ap.add_argument("--captures")
    ap.add_argument("--prefixe", default="")
    a = ap.parse_args()
    project = Path(a.projet).resolve()
    captures = Path(a.captures).resolve() if a.captures else project / "captures"   # résolu avant tout changement de dossier
    if not project.is_dir():
        print(f"Dossier introuvable : {project}")
        return 1
    errs, notes, skill, n_files = ([], [], None, 0) if a.constat else static(project)
    print(f"== {'État des lieux' if a.constat else 'Projet'} : {project.name}" + ("" if a.constat else f" — skill : {skill or 'inconnu'} — {n_files} fichier(s) du projet lus"))

    if not a.constat:
        print("\n== 1. Bibliothèque")
    for name, args in () if a.constat else (("check_contract.py", [skill] if skill else []), ("check_components.py", [])):
        code, bad, last = tool(name, args)
        print(f"  [{'OK' if code == 0 else 'ÉCHEC'}] {name} : {last.strip()}")
        errs += [f"{name} {line.strip()}" for line in bad[:10]] if code else []

    if skill and (project / "brand.css").exists():
        e, n = brand(project / "brand.css", skill)
        errs, notes = errs + e, notes + n
        shell = "\n".join(f.read_text(encoding="utf-8", errors="replace") for f in project.glob("*.html"))
        if "data-k-brand" not in shell:
            notes.append("brand.css présent mais data-k-brand absent de <html> : la marque ne s'applique pas")

    blind = ""                                               # raison pour laquelle le navigateur n'a rien vérifié
    react = (project / "package.json").exists()
    serve = project / (a.servir or ("dist" if react else "."))
    if not a.sans_navigateur:
        browser = find_browser()
        pages = a.pages or sorted(p.name for p in serve.glob("*.html")) if serve.is_dir() else []
        try:
            import PIL  # noqa: F401
        except ImportError:
            browser, blind = None, "Pillow absent (pip install pillow)"
        if not browser:
            blind = blind or "aucun navigateur trouvé (Chrome ou Chromium ; variable KOBO_CHROME)"
        elif not pages:
            errs.append(f"aucune page .html dans {serve}" + (" : lancer « npm run build » (base: './')" if react else ""))
        else:
            os.chdir(serve)
            server = ThreadingHTTPServer(("0.0.0.0", 0), Handler)
            threading.Thread(target=server.serve_forever, daemon=True).start()
            tmp = work_dir(browser)
            out = captures
            out.mkdir(parents=True, exist_ok=True)
            try:
                b = Browser(browser, server.server_address[1], tmp)
                seen, dead = 0, []
                for page in pages:
                    for w, h in SIZES:
                        e, n = browse(page, w, h, b, out, a.rapide, a.prefixe)
                        if len(e) == 1 and "capture impossible" in e[0]:
                            dead.append(e[0])
                            continue
                        seen, errs, notes = seen + 1, errs + e, notes + n
                if seen:
                    errs += dead
                else:                                        # le navigateur est là mais ne rend aucune page (pas d'affichage, bac à sable)
                    blind = f"le navigateur ({browser}) n'a rendu aucune page"
            finally:
                server.shutdown()
                shutil.rmtree(tmp, ignore_errors=True)
            if not blind:
                notes.append(f"captures : {out}/{a.prefixe}<page>-1440.png et -390.png (à relire avec quality/anti-slop.md)")
    else:
        blind = "navigateur non lancé (--sans-navigateur)"

    print("\n== Constats" if a.constat else "\n== 2. Projet")
    for e in errs:
        print("  ✗", e)
    for n in notes:
        print("  ·", n)
    if blind:
        print(f"\n== VÉRIFICATION VISUELLE NON FAITE : {blind}")
        print("  Non contrôlé : captures à 1440 et 390 px, contenu masqué, texte sous 12 px, débordement, images qui ne chargent pas,")
        print("  contraste sur capture, grille anti-slop, clavier.")
        print("  À écrire tel quel à la livraison, sous « Mesuré » : « Vérification visuelle non faite (pas de navigateur) : ni capture,")
        print("  ni contraste mesuré sur la page, ni essai au clavier. Seuls les contrôles par script des fichiers ont tourné. »")
    if not a.constat:
        plan = (project / "parcours.md").exists()
        print("\n== 3. Parcours : NON VÉRIFIÉS PAR CE SCRIPT")
        if not plan:
            print("  ALERTE parcours.md absent : le plan de parcours (ux/methode.md) n'est pas dans le projet.")
        print("  Ce script ne joue aucune tâche. Avant de livrer : quality/ux-grille.md (chaque tâche jouée à 390 px au doigt")
        print("  et à 1440 px au clavier, tableau des tâches jouées, verdict « parcours OK » ou « à corriger »).")
    print(f"\n{len(errs)} {'constat(s)' if a.constat else 'erreur(s)'}" + (" sur les seuls contrôles par script ; vérification visuelle NON FAITE." if blind else "."))
    return 0 if a.constat else 1 if errs else 2 if blind else 0


if __name__ == "__main__":
    sys.exit(main())
