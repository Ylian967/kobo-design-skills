#!/usr/bin/env python3
"""
Kōbō — génère la galerie docs/index.html (publiable avec GitHub Pages, dossier /docs).
Chaque skill apparaît avec un aperçu vivant de sa page d'exemple (examples/demo.html),
copiée dans docs/demos/<style>.html, et un lien vers son SKILL.md.

Usage : python3 tools/build_gallery.py
"""
import html, json, re, shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILLS = ROOT / "plugins" / "kobo-design" / "skills"
DOCS = ROOT / "docs"
REPO_URL = "https://github.com/{owner}/kobo-design-skills"  # remplacé si docs/config.json existe


def fm(text):
    m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    d = {}
    if m:
        for line in m.group(1).splitlines():
            if ":" in line and not line.startswith(" "):
                k, v = line.split(":", 1)
                d[k.strip()] = v.strip()
    return d


def main():
    cfg = {}
    if (DOCS / "config.json").exists():
        cfg = json.loads((DOCS / "config.json").read_text(encoding="utf-8"))
    repo = cfg.get("repo", REPO_URL)
    (DOCS / "demos").mkdir(parents=True, exist_ok=True)
    items = []
    for d in sorted(p for p in SKILLS.iterdir() if p.is_dir()):
        demo = d / "examples" / "demo.html"
        if not demo.exists():
            continue
        meta = fm((d / "SKILL.md").read_text(encoding="utf-8"))
        src = (d / "source.md").read_text(encoding="utf-8") if (d / "source.md").exists() else ""
        title = re.search(r"^# (.+)$", (d / "SKILL.md").read_text(encoding="utf-8"), re.M)
        tag = re.search(r"^> (.+)$", (d / "SKILL.md").read_text(encoding="utf-8"), re.M)
        cat = re.search(r"^- \*\*Famille\*\* : (.+)$", src, re.M)
        shutil.copy(demo, DOCS / "demos" / f"{d.name}.html")
        assets = d / "examples" / "assets"
        if assets.exists():
            shutil.copytree(assets, DOCS / "demos" / "assets", dirs_exist_ok=True)
        items.append({"id": d.name, "title": title.group(1) if title else d.name,
                      "tagline": tag.group(1) if tag else meta.get("description", "")[:140],
                      "cat": cat.group(1).strip() if cat else "Autre"})

    cards = "\n".join(f"""
    <article class="card" data-cat="{html.escape(i['cat'])}">
      <a class="frame" href="demos/{i['id']}.html" target="_blank" rel="noopener" aria-label="Ouvrir la démo {html.escape(i['title'])}">
        <iframe src="demos/{i['id']}.html" loading="lazy" tabindex="-1" title="Aperçu {html.escape(i['title'])}"></iframe>
      </a>
      <div class="meta"><h2>{html.escape(i['title'])}</h2><span>{html.escape(i['cat'])}</span></div>
      <p>{html.escape(i['tagline'])}</p>
      <div class="links"><a href="demos/{i['id']}.html" target="_blank" rel="noopener">Démo plein écran</a><a href="{repo}/blob/main/plugins/kobo-design/skills/{i['id']}/SKILL.md">SKILL.md</a><code>/kobo-design:{i['id']}</code></div>
    </article>""" for i in items) or '<p class="empty">Aucun skill pour l\'instant. Le premier arrive bientôt.</p>'

    page = f"""<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Kōbō Design Skills</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,800&family=Instrument+Sans:wght@400;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
:root{{--bg:#EDEDEA;--panel:#F8F8F5;--line:#D6D6D0;--fg:#18181A;--dim:#5D5D63;--hl:#E8452C;--d:'Bricolage Grotesque',system-ui,sans-serif;--b:'Instrument Sans',system-ui,sans-serif;--m:'IBM Plex Mono',ui-monospace,monospace}}
@media (prefers-color-scheme:dark){{:root{{--bg:#121214;--panel:#1B1B1E;--line:#2E2E33;--fg:#EDEDEA;--dim:#A0A0A8;--hl:#FF6A4D;color-scheme:dark}}}}
*{{box-sizing:border-box}}body{{margin:0;background:var(--bg);color:var(--fg);font:15px/1.55 var(--b)}}
.wrap{{overflow-x:clip;max-width:1320px;margin:0 auto;padding:clamp(28px,5vw,64px) clamp(16px,4vw,48px) 80px}}
header{{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);gap:40px;align-items:end;padding-bottom:28px;border-bottom:1px solid var(--line);margin-bottom:28px}}
.eb{{font:500 12px var(--m);letter-spacing:.14em;text-transform:uppercase;color:var(--dim)}}.eb b{{color:var(--hl);font-weight:500}}
h1{{font:800 clamp(56px,10vw,128px)/.86 var(--d);letter-spacing:-.045em;margin:14px 0 0}}h1 span{{color:var(--hl)}}
.lede{{color:var(--dim);font-size:16px;max-width:52ch;margin:0 0 12px}}
pre{{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:12px 14px;font:13px/1.6 var(--m);overflow-x:auto;margin:0}}
.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(340px,100%),1fr));gap:30px 22px}}
.card{{display:flex;flex-direction:column;gap:10px;min-width:0}}
.frame{{display:block;position:relative;aspect-ratio:16/10;border-radius:10px;overflow:hidden;background:var(--panel);border:1px solid var(--line);container-type:inline-size}}
.frame iframe{{position:absolute;left:0;top:0;width:1440px;height:900px;border:0;transform-origin:0 0;transform:scale(calc(100cqw / 1440px));pointer-events:none}}
@supports not (transform:scale(calc(100cqw / 1440px))){{.frame iframe{{transform:scale(.25)}}}}
.meta{{display:flex;justify-content:space-between;gap:10px;align-items:baseline}}.meta h2{{margin:0;font:700 20px var(--d)}}.meta span{{font:12px var(--m);color:var(--dim)}}
.card p{{margin:0;color:var(--dim);font-size:14px}}
.links{{display:flex;gap:14px;flex-wrap:wrap;align-items:center;font-size:14px}}.links a{{color:var(--fg)}}.links code{{font:12px var(--m);color:var(--dim);overflow-wrap:anywhere}}
.empty{{color:var(--dim)}}
@media (max-width:860px){{header{{grid-template-columns:minmax(0,1fr)}}}}
</style></head><body><div class="wrap">
<header><div><div class="eb"><b>工房</b> Skills de direction artistique pour Claude Code</div><h1>Kōbō<span>.</span></h1></div>
<div><p class="lede">Chaque skill est construit à partir d'un site ou d'une maquette de référence analysés dans le navigateur, puis testé sur une page d'exemple. Installe-les dans Claude Code :</p>
<pre>/plugin marketplace add {repo.replace('https://github.com/', '')}
/plugin install kobo-design@kobo</pre></div></header>
<main class="grid">{cards}</main></div>
<script>
/* Ajuste l'échelle des aperçus si les unités de conteneur dans calc() ne sont pas gérées */
for (const f of document.querySelectorAll('.frame')) {{
  const ifr = f.querySelector('iframe');
  const fit = () => {{ ifr.style.transform = 'scale(' + (f.clientWidth / 1440) + ')'; }};
  new ResizeObserver(fit).observe(f); fit();
}}
</script></body></html>"""
    (DOCS / "index.html").write_text(page, encoding="utf-8")
    (DOCS / ".nojekyll").write_text("", encoding="utf-8")
    print(f"Galerie générée : {len(items)} skill(s) → docs/index.html")


if __name__ == "__main__":
    main()
