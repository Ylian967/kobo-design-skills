#!/usr/bin/env python3
"""
kobo-studio — pose dans un projet les seuls fichiers dont il a besoin, et une page de départ déjà branchée.

  python3 tools/kit.py <projet> --skill <id> --structure <structure> [--composants modale,onglets] [--react] [--marque] [--prefixe public-]

  <structure> : landing-produit | site-vitrine | recit-collant | article | application
  --composants : composants en plus de ceux de la structure (noms de dossier : voir components/INDEX.md)
  --react      : copie aussi les versions .jsx, dans <projet>/src/kobo/ ; n'écrit pas de page HTML
  --marque     : copie le modèle brand.css à la racine du projet (voir brand.md)
  --prefixe    : préfixe du nom des pages écrites (public-index.html) : pour poser une seconde structure dans un projet
                 qui a deux natures (une page publique et un outil), sans toucher aux pages déjà là

Ce qui est écrit :
  <projet>/kobo/kobo-studio/…          contrat, fiche du skill, composants, structure, gabarits du skill (NE PAS MODIFIER)
  <projet>/kobo/<id>/references/tokens.css   les variables du skill, que la fiche importe
  <projet>/<page>.html                 la page de la structure, liens réécrits, UN seul skill chargé en dur.
                                       Son contenu est celui de la démonstration (Cordée Brume) : à remplacer en entier.
Une page déjà présente n'est jamais écrasée. Relancer la commande met à jour kobo/ seulement.
"""
import argparse
import os
import re
import shutil
import sys
from pathlib import Path

STUDIO = Path(__file__).resolve().parent.parent
SKILLS = STUDIO.parent
REACT = {  # socle d'un projet React (Vite), écrit seulement si le fichier manque
    "package.json": """{
  "name": "%(name)s",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": { "dev": "vite", "build": "vite build", "preview": "vite preview" },
  "dependencies": { "react": "^18.3.1", "react-dom": "^18.3.1" },
  "devDependencies": { "@vitejs/plugin-react": "^4.3.4", "vite": "^5.4.11" }
}
""",
    "vite.config.js": """import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

// Une entrée par page .html posée à la racine : ajouter une page, c'est ajouter un fichier (et son src/<page>.jsx).
const pages = readdirSync(import.meta.dirname).filter((f) => f.endsWith('.html'));

export default defineConfig({
  base: './',
  plugins: [react()],
  build: { rollupOptions: { input: Object.fromEntries(pages.map((f) => [f.replace('.html', ''), resolve(import.meta.dirname, f)])) } },
});
""",
    "index.html": """<!doctype html>
<html lang="fr" data-k-skill="%(skill)s" data-k-intensity="full">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>À REMPLACER : titre de la page</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./src/main.jsx"></script>
  </body>
</html>
""",
    "src/main.jsx": """import React from 'react';
import { createRoot } from 'react-dom/client';
%(imports)s
// La structure du kit : ses props sont décrites en tête du fichier et dans le README de la structure.
// import { … } from './kobo/kobo-studio/%(jsx)s';
%(gabarits)s
function App() {
  return null; // À REMPLACER : la page, composée avec la structure ou avec ses pièces (Page, Emplacement, TitreSection, Image, Finale…)
}

createRoot(document.getElementById('root')).render(<App />);
""",
}
COMPONENTS = {  # composants utilisés par chaque structure (voir son README)
    "landing-produit": ["bouton", "champ", "barre-nav", "menu-mobile", "onglets", "notification"],
    "site-vitrine": ["bouton", "champ", "carte", "barre-nav", "menu-mobile", "etat-vide", "fil-ariane"],
    "recit-collant": ["bouton", "barre-nav", "menu-mobile"],
    "article": ["bouton", "barre-nav", "menu-mobile", "notification", "fil-ariane"],
    "application": ["bouton", "champ", "selection", "case-a-cocher", "tableau", "etat-vide", "modale", "onglets"],
}
PAGES = {  # page de la structure → nom dans le projet
    "landing-produit": {"landing-produit.html": "index.html"},
    "site-vitrine": {"accueil.html": "index.html", "page-interieure.html": "page-interieure.html"},
    "recit-collant": {"recit-collant.html": "index.html"},
    "article": {"article.html": "index.html"},
    "application": {"application.html": "index.html", "fiche.html": "fiche.html", "tableau-de-bord.html": "tableau-de-bord.html"},
}


def families(skill):
    """Familles de gabarits du skill, lues dans ux/templates/index.js."""
    text = (STUDIO / "ux/templates/index.js").read_text(encoding="utf-8")
    m = re.search(r"'%s'\s*:\s*\{(.*?)\}" % re.escape(skill), text)
    return re.findall(r"'?([\w-]+)'?\s*:\s*\[", m.group(1)) if m else []


def kit_files(skill, structure, extra, react):
    """Fichiers de kobo-studio nécessaires, en chemins relatifs à kobo-studio/."""
    comps = list(dict.fromkeys(COMPONENTS[structure] + extra))
    files = ["contract/roles.css", f"contract/maps/{skill}.css", "components/socle.css",
             f"components/signatures/{skill}.css", "ux/structures/page.css", "ux/structures/page.js"]
    for c in comps:
        files += [f"components/{c}/{c}.css", f"components/{c}/{c}.js"]
    files += [f"ux/structures/{structure}/{structure}.css", f"ux/structures/{structure}/{structure}.js", "ux/templates/gabarits.js"]
    fams = families(skill)
    for f in fams:
        files += [f"ux/templates/{f}/{f}.css", f"ux/templates/{f}/{f}.js", f"ux/templates/{f}/{skill}.css", f"ux/templates/{f}/{skill}.js"]
    if react:
        files += ["components/Icone.jsx", "ux/structures/Page.jsx", "ux/templates/Gabarits.jsx"]
        for c in comps:
            files += [str(p.relative_to(STUDIO)) for p in (STUDIO / "components" / c).glob("*.jsx")]
        files += [str(p.relative_to(STUDIO)) for p in (STUDIO / "ux/structures" / structure).glob("*.jsx")]
    return [f.replace("\\", "/") for f in files if (STUDIO / f).exists()], comps, fams


def page(src, skill, structure, fams, names):
    """La page de démonstration d'une structure, branchée en dur sur un skill et sur kobo/."""
    html = src.read_text(encoding="utf-8")
    base = "kobo/kobo-studio/"
    html = re.sub(r"<html([^>]*)>", lambda m: f'<html{m.group(1)} data-k-skill="{skill}">', html, count=1)
    html = re.sub(r"\s*<script src=\"[^\"]*apercu\.js\"[^>]*></script>", "", html)
    html = re.sub(r'<link rel="stylesheet" id="map" href="[^"]*">', f'<link rel="stylesheet" href="{base}contract/maps/{skill}.css">', html)
    head = "".join(f'<link rel="stylesheet" href="{base}ux/templates/{f}/{n}.css">\n' for f in fams for n in (f, skill)
                   if (STUDIO / f"ux/templates/{f}/{n}.css").exists())
    html = re.sub(r'<link rel="stylesheet" id="sig">', lambda m: head + f'<link rel="stylesheet" href="{base}components/signatures/{skill}.css">', html)
    tags = "".join(f'<script src="{base}ux/templates/{f}/{n}.js"></script>\n' for f in fams for n in (f, skill)
                   if (STUDIO / f"ux/templates/{f}/{n}.js").exists())
    html = re.sub(r'<script src="[^"]*templates/index\.js"></script>\n?', lambda m: tags, html)
    html = re.sub(r"<!-- Structure «.*?-->", "<!-- CONTENU DE DÉMONSTRATION (Cordée Brume) : tout le texte, les liens et les photos sont à remplacer par ceux du projet.\n"
                  "     Fichiers de kobo/ : ne pas les modifier. Styles du projet : site.css (rôles --k-* seulement). -->", html, count=1, flags=re.S)

    def attr(m):
        name, url = m.group(1), m.group(2)
        if not url or re.match(r"(?:[a-z]+:|#|//|kobo/)", url):
            return m.group(0)
        path, sep, frag = url.partition("#")
        target = (src.parent / path).resolve()
        if target.suffix == ".html":  # lien vers une autre page de démonstration
            return f'{name}="{names.get(target.name, "index.html")}{sep}{frag}"'
        if STUDIO in target.parents:
            return f'{name}="{base}{target.relative_to(STUDIO).as_posix()}"'
        return m.group(0)

    html = re.sub(r'\b(href|src|action)="([^"]*)"', attr, html).replace(" data-k-keep", "")
    apply = ("<script>\n  Kobo.templates.apply();\n"
             "  if (document.fonts) document.fonts.ready.then(function () { document.querySelectorAll('.k-nav').forEach(Kobo.nav.fit); });\n</script>\n")
    return html.replace("</body>", apply + "</body>")


def main():
    ap = argparse.ArgumentParser(description="Pose le kit kobo-studio dans un projet.")
    ap.add_argument("projet")
    ap.add_argument("--skill", required=True)
    ap.add_argument("--structure", required=True, choices=sorted(COMPONENTS))
    ap.add_argument("--composants", default="")
    ap.add_argument("--react", action="store_true")
    ap.add_argument("--marque", action="store_true")
    ap.add_argument("--prefixe", default="")
    a = ap.parse_args()
    if not (STUDIO / f"contract/maps/{a.skill}.css").exists():
        print(f"Skill inconnu : {a.skill}. Voir catalogue.md.")
        return 1
    extra = [c for c in a.composants.split(",") if c]
    unknown = [c for c in extra if not (STUDIO / "components" / c).is_dir()]
    if unknown:
        print("Composant(s) inconnu(s) : " + ", ".join(unknown))
        return 1
    project = Path(a.projet).resolve()
    kobo = project / ("src/kobo" if a.react else "kobo")
    files, comps, fams = kit_files(a.skill, a.structure, extra, a.react)
    for f in files:
        dest = kobo / "kobo-studio" / f
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(STUDIO / f, dest)
    tokens = kobo / a.skill / "references/tokens.css"
    tokens.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(SKILLS / a.skill / "references/tokens.css", tokens)
    print(f"{len(files) + 1} fichier(s) dans {os.path.relpath(kobo)}/ — skill {a.skill}, structure {a.structure}")
    print("  composants : " + ", ".join(comps))
    print("  gabarits de signature : " + (", ".join(fams) if fams else "aucun"))
    if a.marque and not (project / "brand.css").exists():
        shutil.copyfile(STUDIO / "contract/brand.css", project / "brand.css")
        print("  brand.css : modèle copié, à remplir (brand.md)")
    if a.react:
        css = [f for f in files if f.endswith(".css") and "/templates/" not in f and f != "contract/roles.css"]
        css.sort(key=lambda f: (f.startswith("components/signatures/"), "structures" in f, not f.startswith("contract/")))
        jsx = next(f for f in files if f.endswith(".jsx") and f"structures/{a.structure}/" in f)
        # Gabarits de signature : les mêmes fichiers que les pages HTML, posés par ux/templates/Gabarits.jsx.
        # Feuilles avant la couche de signature ; scripts ensuite, le moteur d'abord, puis chaque famille avant son habillage.
        gab_css = [f for f in files if f.endswith(".css") and "/templates/" in f]
        gab_js = [f for f in files if f.endswith(".js") and "/templates/" in f] if fams else []
        css = css[:-1] + gab_css + css[-1:] if fams else css
        lines = [f"import './kobo/kobo-studio/{f}';" for f in css + gab_js]
        if fams:
            lines.append("import { gabarits } from './kobo/kobo-studio/ux/templates/Gabarits.jsx';")
        values = {"name": project.name, "skill": a.skill, "jsx": jsx, "imports": "\n".join(lines) + "\n",
                  "gabarits": f"// Gabarits de signature : passer emplacements={{gabarits('{a.skill}')}} à la structure (ou à <Page> et <Emplacement>).\n" if fams else ""}
        for name, body in REACT.items():
            if not (project / name).exists():
                (project / name).parent.mkdir(parents=True, exist_ok=True)
                (project / name).write_text(body % values, encoding="utf-8")
                print(f"  {name} : écrit")
        print("  images : dans public/images/, appelées par « images/<fichier> »")
        print("\nImports (déjà dans src/main.jsx s'il vient d'être écrit ; la couche de signature est la dernière feuille) :")
        for line in lines:
            print("  " + line)
        print(f"Structure : import {{ … }} from './kobo/kobo-studio/{jsx}';   (props : voir le README de la structure)")
        if fams:
            print(f"Gabarits de signature : emplacements={{gabarits('{a.skill}')}} sur la structure. Essayés en React : héros photo et objet 3D ;"
                  " les autres familles restent neutres (option familles de gabarits(), non essayée).")
        else:
            print("Ce skill n'a pas de gabarit de signature : la page rend les emplacements neutres.")
        return 0
    names = {src: a.prefixe + name for src, name in PAGES[a.structure].items()}
    for src_name, name in names.items():
        out = project / name
        if out.exists():
            print(f"  {name} existe déjà : non écrasée")
            for c in extra:                                      # composant ajouté en cours de route : balises à poser à la main
                if f"components/{c}/{c}.css" not in out.read_text(encoding="utf-8"):
                    print(f'    à ajouter dans <head>, avant page.css : <link rel="stylesheet" href="kobo/kobo-studio/components/{c}/{c}.css">')
                    if (STUDIO / f"components/{c}/{c}.js").exists():
                        print(f'    à ajouter avant page.js : <script src="kobo/kobo-studio/components/{c}/{c}.js"></script>')
            continue
        out.write_text(page(STUDIO / "ux/structures" / a.structure / src_name, a.skill, a.structure, fams, names), encoding="utf-8")
        print(f"  {name} : page de départ écrite (contenu de démonstration à remplacer)")
        for c in extra:                                          # composant demandé en plus : la page de départ ne le charge pas
            if f"components/{c}/{c}.css" not in out.read_text(encoding="utf-8"):
                print(f'    à ajouter dans <head>, avant page.css : <link rel="stylesheet" href="kobo/kobo-studio/components/{c}/{c}.css">')
                if (STUDIO / f"components/{c}/{c}.js").exists():
                    print(f'    à ajouter avant page.js : <script src="kobo/kobo-studio/components/{c}/{c}.js"></script>')
    return 0


if __name__ == "__main__":
    sys.exit(main())
