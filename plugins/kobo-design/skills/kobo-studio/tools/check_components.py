#!/usr/bin/env python3
"""
kobo-studio — vérification des composants (components/).

Pour chaque dossier de components/ :
  - fichiers attendus : <nom>.css, README.md, une version React (*.jsx) ;
  - un état de focus clavier (:focus-visible avec un contour --k-focus), sauf si la feuille de style
    porte la mention « k-check: non-interactif » ;
  - prefers-reduced-motion pris en compte dès qu'il y a une transition ou une animation.

Dans toutes les feuilles de style, les styles en ligne et la galerie :
  - aucune valeur en dur : couleur (#…, rgb(), hsl(), couleur nommée), longueur (px, rem, em, pt, ch…),
    rayon, durée (ms, s). Sont admis : les rôles --k-*, les variables locales --_x, les pourcentages,
    les unités de fenêtre (vw, vh, dvh), fr, deg, turn, les nombres sans unité, zéro, transparent, currentColor ;
  - aucun --k-sig-* hors de components/signatures/ (là, une ombre peut aussi venir d'un --k-sig-* du skill) ;
  - motifs de quality/anti-slop.md : dégradés (C1 ; admis dans signatures/ quand le skill les décrit), ombres hors --k-shadow (F1, F5), flou d'arrière-plan (F3),
    scale() au survol (M1), transition: all (M4), outline retiré sans remplacement (U8), texte de remplissage (T1),
    emoji en guise d'icône (T5), liens href="#" (T7), boutons sans type (U10), images sans alt (T8).

Dans ux/ (structures de page, fiches de patterns, page de démonstration) : les mêmes règles — aucune valeur en dur, aucun
--k-sig-*, motifs anti-slop — et, pour chaque dossier de ux/structures/ : README.md, une page .html, une feuille .css, une version React.
Dans ux/templates/ (gabarits de signature) : les règles d'une couche de signature (--k-sig-*, dégradés et ombres composées admis),
un en-tête qui cite les sources, et pour chaque famille : <famille>.css, <famille>.js, au moins un habillage portant le nom d'un skill.

Usage : python3 tools/check_components.py          Code de sortie 1 si une erreur est trouvée.
"""
import re
import sys
from pathlib import Path

STUDIO = Path(__file__).resolve().parent.parent
COMP = STUDIO / "components"
SIG = COMP / "signatures"
UX = STUDIO / "ux"
NAMED = ("white|black|red|green|blue|yellow|orange|purple|violet|pink|gray|grey|silver|gold|navy|teal|"
         "maroon|olive|lime|aqua|fuchsia|brown|beige|ivory|indigo|cyan|magenta|crimson|coral|salmon|tomato")
FILLER = re.compile(r"lorem|ipsum|dolor sit|votre texte ici|titre de la section|description courte|texte de remplissage ici", re.I)
EMOJI = re.compile("[\U0001F300-\U0001FAFF☀-➿⭐✅]")


def strip_comments(css):
    return re.sub(r"/\*.*?\*/", lambda m: "\n" * m.group(0).count("\n"), css, flags=re.S)


def hard_values(css, where):
    """Valeurs en dur dans du CSS (commentaires déjà retirés). Renvoie des messages « fichier:ligne … »."""
    out = []
    for n, line in enumerate(css.splitlines(), 1):
        code = re.sub(r"var\(--[\w-]+", "var(", line)          # un nom de variable n'est pas une valeur
        code = re.sub(r"--[\w-]+\s*:", "", code)               # ni le nom d'une variable locale déclarée
        code = re.sub(r'"[^"]*"|\'[^\']*\'', '""', code)       # ni le contenu d'une chaîne
        if re.match(r"\s*@media", code):
            code = re.sub(r"\(prefers-reduced-motion[^)]*\)", "", code)
        for pat, what in [
            (r"#[0-9a-fA-F]{3,8}\b", "couleur"),
            (r"\b(?:rgba?|hsla?|oklch|oklab|lab|lch)\(", "couleur"),
            (r"(?<![\w-])(?:%s)(?![\w-])" % NAMED, "couleur nommée"),
            (r"(?<![\w.-])-?(?:\d*\.)?\d+(?:px|rem|em|pt|pc|cm|mm|in|ch|ex|lh|rlh)\b", "longueur"),
            (r"(?<![\w.-])-?(?:\d*\.)?\d+m?s\b", "durée"),
        ]:
            for m in re.finditer(pat, code):
                v = m.group(0)
                if what in ("longueur", "durée") and float(re.match(r"-?[\d.]+", v).group(0)) == 0:
                    continue                                    # zéro est admis
                out.append(f"{where}:{n} valeur en dur ({what}) : {v}")
    return out


def slop(css, where, signature=False):
    out = []
    for n, line in enumerate(css.splitlines(), 1):
        if re.search(r"gradient\(", line) and not signature:   # une couche de signature peut reprendre un dégradé décrit par le skill (cité en tête de fichier)
            out.append(f"{where}:{n} dégradé (anti-slop C1) : {line.strip()[:70]}")
        m = re.search(r"box-shadow\s*:\s*([^;}]+)", line)
        # une signature peut lire l'ombre du skill, ou composer une ombre dure (sans flou chiffré) à partir de rôles
        shadow_ok = m and (m.group(1).strip() in ("none", "var(--k-shadow)")
                           or (signature and not re.sub(r"var\(--[\w-]+\)|inset|\b0\b|[\s,]", "", m.group(1))))
        if m and not shadow_ok:
            out.append(f"{where}:{n} ombre hors --k-shadow (anti-slop F1/F5) : {m.group(1).strip()[:50]}")
        if "backdrop-filter" in line:
            out.append(f"{where}:{n} flou d'arrière-plan (anti-slop F3)")
        if re.search(r":hover[^{]*\{[^}]*scale\(", line):
            out.append(f"{where}:{n} scale() au survol (anti-slop M1)")
        if re.search(r"transition(?:-property)?\s*:\s*all\b", line):
            out.append(f"{where}:{n} transition: all (anti-slop M4)")
        if not signature and "--k-sig-" in line:
            out.append(f"{where}:{n} --k-sig-* lu hors de components/signatures/")
    removed = len(re.findall(r"outline\s*:\s*(?:none|0)\b", css))
    drawn = len(re.findall(r"outline\s*:\s*var\(--k-focus-w\)", css))
    if removed and drawn < removed:
        out.append(f"{where} : outline retiré {removed} fois pour {drawn} contour(s) de focus dessiné(s) (anti-slop U8)")
    return out


def markup(text, where):
    out = []
    plain = re.sub(r"<!--.*?-->|/\*.*?\*/|^\s*//.*$", "", text, flags=re.S | re.M)
    if FILLER.search(plain):
        out.append(f"{where} : texte de remplissage (anti-slop T1) : « {FILLER.search(plain).group(0)} »")
    if EMOJI.search(plain):
        out.append(f"{where} : emoji ou symbole en guise d'icône (anti-slop T5) : {' '.join(sorted(set(EMOJI.findall(plain))))}")
    if re.search(r'href=["\'](?:#|javascript:)?["\']', plain):
        out.append(f"{where} : lien sans destination, href=\"#\" (anti-slop T7)")
    for b in re.findall(r"<button\b[^>]*>", plain, flags=re.S):
        if not re.search(r"\btype=", b):
            out.append(f"{where} : bouton sans attribut type (anti-slop U10) : {re.sub(chr(10), ' ', b)[:60]}")
    for i in re.findall(r"<img\b[^>]*>", plain, flags=re.S):
        if not re.search(r"\balt=", i):
            out.append(f"{where} : image sans alt (anti-slop T8)")
    for s in re.findall(r'style="([^"]*)"', plain):
        out += hard_values(s, where + " (style en ligne)")
    for s in re.findall(r"style=\{\{(.*?)\}\}", plain, flags=re.S):
        out += hard_values(re.sub(r"'--_[\w-]+'\s*:", "", s), where + " (style en ligne)")
    return out


def check_ux(errs):
    """Structures de page et patterns (ux/). Renvoie le nombre de dossiers de structure vérifiés."""
    if not UX.exists():
        return 0
    dirs = sorted(d for d in (UX / "structures").iterdir() if d.is_dir()) if (UX / "structures").exists() else []
    for d in dirs:
        rel = f"ux/structures/{d.name}"
        for pattern, what in [("README.md", "README.md"), ("*.html", "page .html"), ("*.css", "feuille .css"), ("*.jsx", "version React (*.jsx)")]:
            if not list(d.glob(pattern)):
                errs.append(f"{rel} : {what} manquant")
    for f in sorted(UX.rglob("*")):
        if not f.is_file() or f.suffix not in (".css", ".html", ".js", ".jsx", ".md"):
            continue
        text = f.read_text(encoding="utf-8")
        where = str(f.relative_to(STUDIO)).replace("\\", "/")
        gabarit = (UX / "templates") in f.parents          # un gabarit de signature suit les règles d'une couche de signature
        if f.suffix == ".css":
            css = strip_comments(text)
            errs += hard_values(css, where) + slop(css, where, signature=gabarit)
            if gabarit and not text.lstrip().startswith("/*"):
                errs.append(f"{where} : en-tête manquant (sources lues dans le skill, ce qui n'est pas repris)")
            if re.search(r"\b(?:transition|animation)\s*:", css) and "prefers-reduced-motion" not in css:
                errs.append(f"{where} : mouvement sans prise en compte de prefers-reduced-motion (anti-slop M5)")
        elif f.suffix == ".html":
            for block in re.findall(r"<style[^>]*>(.*?)</style>", text, flags=re.S):
                css = strip_comments(block)
                errs += hard_values(css, where + " <style>") + slop(css, where + " <style>")
            errs += markup(re.sub(r"<style.*?</style>|<script.*?</script>", "", text, flags=re.S), where)
        else:
            errs += markup(text, where)
    # Gabarits de signature : chaque famille a sa feuille, son script et au moins un habillage de skill
    fam = sorted(d for d in (UX / "templates").iterdir() if d.is_dir()) if (UX / "templates").exists() else []
    skills = {d.name for d in STUDIO.parent.iterdir() if d.is_dir()}
    for d in fam:
        rel = f"ux/templates/{d.name}"
        for name in (f"{d.name}.css", f"{d.name}.js"):
            if not (d / name).exists():
                errs.append(f"{rel} : {name} manquant")
        skins = {f.stem for f in d.iterdir() if f.is_file() and f.stem != d.name}
        if not skins:
            errs.append(f"{rel} : aucun habillage de skill")
        for s in sorted(skins - skills):
            errs.append(f"{rel} : habillage « {s} » sans skill de ce nom")
    return len(dirs)


def main():
    errs, notes = [], []
    if not COMP.exists():
        print("components/ introuvable.")
        return 1
    dirs = sorted(d for d in COMP.iterdir() if d.is_dir())
    for d in dirs:
        rel = f"components/{d.name}"
        sig = d == SIG
        css_files = sorted(d.glob("*.css"))
        if not (d / "README.md").exists():
            errs.append(f"{rel} : README.md manquant")
        if not sig:
            if not (d / f"{d.name}.css").exists():
                errs.append(f"{rel} : {d.name}.css manquant")
            if not list(d.glob("*.jsx")):
                errs.append(f"{rel} : version React (*.jsx) manquante")
        for f in css_files:
            raw = f.read_text(encoding="utf-8")
            css = strip_comments(raw)
            where = f"{rel}/{f.name}"
            errs += hard_values(css, where) + slop(css, where, signature=sig)
            if not sig:
                if "k-check: non-interactif" in raw:
                    notes.append(f"{where} : déclaré non interactif, pas d'état de focus attendu")
                elif not re.search(r":focus-visible[^{]*\{[^}]*outline\s*:\s*var\(--k-focus-w\)\s+solid\s+var\(--k-focus\)", css):
                    errs.append(f"{where} : aucun état de focus clavier (:focus-visible avec contour --k-focus)")
            if re.search(r"\b(?:transition|animation)\s*:", css) and "prefers-reduced-motion" not in css:
                errs.append(f"{where} : mouvement sans prise en compte de prefers-reduced-motion (anti-slop M5)")
        for f in sorted(list(d.glob("*.jsx")) + list(d.glob("*.js")) + list(d.glob("*.md"))):
            errs += markup(f.read_text(encoding="utf-8"), f"{rel}/{f.name}")
    for f in sorted(list(COMP.glob("*.css")) + list(COMP.glob("*.html")) + list(COMP.glob("*.jsx"))):
        text = f.read_text(encoding="utf-8")
        where = f"components/{f.name}"
        if f.suffix == ".css":
            css = strip_comments(text)
            errs += hard_values(css, where) + slop(css, where)
        else:
            for block in re.findall(r"<style[^>]*>(.*?)</style>", text, flags=re.S):
                css = strip_comments(block)
                errs += hard_values(css, where + " <style>") + slop(css, where + " <style>")
            errs += markup(re.sub(r"<style.*?</style>|<script.*?</script>", "", text, flags=re.S), where)
    ux_dirs = check_ux(errs)
    for e in errs:
        print("  ✗", e)
    for n in notes:
        print("  ·", n)
    print(f"\n{len(dirs)} dossier(s) de composants et {ux_dirs} structure(s) de page vérifié(s), {len(errs)} erreur(s).")
    return 1 if errs else 0


if __name__ == "__main__":
    sys.exit(main())
