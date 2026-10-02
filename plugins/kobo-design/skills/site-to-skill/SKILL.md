---
name: site-to-skill
description: Méthode Kōbō pour transformer un site de référence en skill de direction artistique complet (tokens, composants, mises en page, mouvement, page d'exemple testée). À utiliser quand on demande de créer un skill de design à partir d'un site, d'analyser le style d'un site, ou d'ajouter un style à la bibliothèque Kōbō.
---

# Du site de référence au skill

Un skill Kōbō doit permettre à Claude de construire **un site entier** dans le style de la référence, pas seulement de choisir des couleurs. On mesure d'abord, on écrit ensuite, on prouve à la fin avec une page d'exemple comparée à l'original.

## Règle d'or : le style, pas l'identité

On reprend le langage visuel : proportions, rythme, traitements, hiérarchie, mouvement. On ne reprend jamais l'identité : logos, noms de marque, illustrations, personnages, photos, textes, polices propriétaires, ni une mise en page copiée au pixel au point qu'on puisse confondre la démo avec le vrai site. Les visuels de la démo sont des formes, dégradés ou emplacements nommés.

## Étapes

### 1. Cadrer (2 minutes)
Noter dans `source.md` : l'URL, la famille (Jeu vidéo, Gacha, Japon, Street & print, Art & graphisme), et **ce que la personne aime** dans ce site. Le skill insiste sur ces points.

### 2. Mesurer
Ouvrir la page dans un navigateur en 1440×900, attendre la fin des animations d'entrée, puis exécuter `${CLAUDE_SKILL_DIR}/scripts/extract-design.js` (copier son contenu dans la console du navigateur, ou l'injecter avec un outil d'automatisation). Recommencer en 390×844 pour le mobile. Recommencer sur une deuxième page du site (page personnage, actualités…) si elle existe.

L'extracteur donne : polices réellement chargées, échelle de tailles, couleurs pondérées par surface, rayons, ombres, clip-paths, filtres, espacements, transitions, animations, points de rupture, variables CSS, et styles calculés des boutons, liens, champs et cartes.

### 3. Observer ce que les mesures ne disent pas
Faire des captures : haut de page, chaque type de section, survol d'un bouton et d'une carte, menu mobile ouvert. Noter : composition du héros, traitement des images (cadres, masques, découpes), textures, ornements, comportement au défilement (parallaxe, sections épinglées, révélations), transitions entre pages.

### 4. Normaliser en tokens
Transformer les mesures en échelle propre : regrouper les tailles proches, base d'espacement (4 ou 8), 3 à 4 rayons maximum, 2 à 3 durées, 1 à 2 courbes. Remplacer chaque police payante par l'équivalent Google Fonts le plus proche (même structure : condensée, géométrique, à empattements…) et l'écrire dans `source.md`. Déclarer les paires de contraste dans `tokens.css` avec `@contrast`.

### 5. Écrire le skill
Dans le dépôt Kōbō, partir de `templates/skill/`. Dossier `plugins/kobo-design/skills/<id>/` :

- `SKILL.md` : l'idée, les règles prioritaires, la typo, les couleurs, la signature, ce qu'il faut éviter. Moins de 300 lignes ; le détail va dans `references/`.
- `references/tokens.css` : le bloc `:root` complet.
- `references/components.md` : chaque composant avec rôle, anatomie, états et code HTML/CSS de référence.
- `references/layouts.md` : patrons de pages et de sections, grille, en-tête, mobile.
- `references/motion.md` : catalogue des animations avec durées et courbes mesurées.
- `examples/demo.html` : une page complète construite **uniquement** à partir du skill.
- `source.md` : référence, mesures brutes, écarts assumés.

La `description` du SKILL.md commence par ce que fait le style, puis liste les mots qu'une personne utiliserait pour le demander.

### 6. Prouver
1. Construire `examples/demo.html` en lisant seulement le skill (pas le site).
2. Capturer la démo et le site aux mêmes tailles, les comparer côte à côte.
3. Lister les écarts : chacun est soit corrigé dans le skill (pas seulement dans la démo), soit assumé dans `source.md`.
4. Lancer `python3 tools/check.py <id>` : fichiers, frontmatter, contrastes.
5. Lancer `python3 tools/build_gallery.py` pour mettre à jour la galerie.

Un skill est terminé quand la démo est reconnaissable comme « du même style » que la référence, sans pouvoir être confondue avec elle.
