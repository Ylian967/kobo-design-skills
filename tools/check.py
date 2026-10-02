#!/usr/bin/env python3
"""
Kōbō — vérification des skills.

Pour chaque dossier plugins/kobo-design/skills/<style>/ :
  - les fichiers obligatoires existent ;
  - le frontmatter de SKILL.md est valide (name = nom du dossier, description ≤ 1536 caractères) ;
  - les paires de contraste déclarées dans references/tokens.css passent (4.5:1 par défaut, 3:1 si suffixe ":large") ;
  - la page d'exemple n'écrit pas de couleur en dur en dehors de :root.

Usage : python3 tools/check.py            (tous les skills)
        python3 tools/check.py <style>    (un seul)
Code de sortie 1 si une erreur est trouvée.
"""
import re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKILLS = ROOT / "plugins" / "kobo-design" / "skills"
REQUIRED = ["SKILL.md", "source.md", "references/tokens.css", "references/components.md",
            "references/layouts.md", "references/motion.md", "examples/demo.html"]
META_SKILLS = {"site-to-skill", "catalogue"}  # skills outils, sans tokens ni démo


def lum(h):
    h = h.lstrip('#')
    if len(h) == 3:
        h = ''.join(c * 2 for c in h)
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    c = [x / 12.92 if x <= 0.03928 else ((x + 0.055) / 1.055) ** 2.4 for x in c]
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]


def ratio(a, b):
    la, lb = lum(a), lum(b)
    return (max(la, lb) + 0.05) / (min(la, lb) + 0.05)


def frontmatter(text):
    m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    if not m:
        return None
    out = {}
    for line in m.group(1).splitlines():
        if ":" in line and not line.startswith(" "):
            k, v = line.split(":", 1)
            out[k.strip()] = v.strip()
    return out


def check_skill(d: Path):
    errs, notes = [], []
    if d.name in META_SKILLS:
        req = ["SKILL.md"]
    else:
        req = REQUIRED
    for f in req:
        if not (d / f).exists():
            errs.append(f"fichier manquant : {f}")
    sk = d / "SKILL.md"
    if sk.exists():
        fm = frontmatter(sk.read_text(encoding="utf-8"))
        if not fm:
            errs.append("SKILL.md : frontmatter absent")
        else:
            if fm.get("name") != d.name:
                errs.append(f"SKILL.md : name '{fm.get('name')}' ≠ dossier '{d.name}'")
            desc = fm.get("description", "")
            if not desc:
                errs.append("SKILL.md : description vide")
            elif len(desc) > 1536:
                errs.append(f"SKILL.md : description trop longue ({len(desc)} > 1536)")
        lines = sk.read_text(encoding="utf-8").count("\n")
        if lines > 500:
            notes.append(f"SKILL.md fait {lines} lignes : déplacer du détail vers references/")
    tok = d / "references" / "tokens.css"
    if tok.exists():
        css = tok.read_text(encoding="utf-8")
        vars_ = dict(re.findall(r"--([\w-]+)\s*:\s*(#[0-9a-fA-F]{3,6})\b", css))
        pairs = re.findall(r"@contrast\s+([^*]+)", css)
        if not pairs:
            errs.append("tokens.css : aucune ligne /* @contrast fg:bg ... */")
        for group in pairs:
            for p in group.split():
                large = p.endswith(":large")
                p = p.removesuffix(":large")
                fg, _, bg = p.partition(":")
                if fg not in vars_ or bg not in vars_:
                    errs.append(f"contraste {fg}/{bg} : variable introuvable")
                    continue
                r = ratio(vars_[fg], vars_[bg])
                need = 3.0 if large else 4.5
                (errs if r < need else notes).append(f"contraste {fg}/{bg} = {r:.2f}:1 (min {need})")
    demo = d / "examples" / "demo.html"
    if demo.exists():
        html = demo.read_text(encoding="utf-8")
        styles = "".join(re.findall(r"<style[^>]*>(.*?)</style>", html, re.S))
        body = re.sub(r":root\s*\{.*?\}", "", styles, flags=re.S)
        hard = set(re.findall(r"#[0-9a-fA-F]{6}\b", body))
        if hard:
            notes.append(f"demo.html : {len(hard)} couleur(s) en dur hors :root ({', '.join(sorted(hard)[:5])})")
    return errs, notes


def main():
    names = sys.argv[1:]
    dirs = sorted(p for p in SKILLS.iterdir() if p.is_dir()) if SKILLS.exists() else []
    if names:
        dirs = [d for d in dirs if d.name in names]
    if not dirs:
        print("Aucun skill à vérifier.")
        return 0
    failed = 0
    for d in dirs:
        errs, notes = check_skill(d)
        status = "ÉCHEC" if errs else "OK"
        print(f"\n[{status}] {d.name}")
        for e in errs:
            print("  ✗", e)
        for n in notes:
            print("  ·", n)
        failed += bool(errs)
    print(f"\n{len(dirs) - failed}/{len(dirs)} skill(s) valides.")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
