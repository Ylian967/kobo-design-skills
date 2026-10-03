---
name: heritage-lens
description: Direction artistique « Heritage Lens » pour visites virtuelles et récits patrimoniaux (musée, site archéologique, monument, histoire, voyage culturel), inspirée des reconstitutions WebGL primées de cités antiques. Scènes plein cadre à la lumière dorée, grand titre en serif d'affiche très contrastée, bouton « Entrer » à double anneau, lentille circulaire ornée qui révèle l'état actuel des ruines (avant/après), points de navigation verticaux, boutons ronds réglages et son, texte de récit en serif. À utiliser pour une page de musée, une expo en ligne, une visite guidée, un storytelling historique ou une app culturelle au style « patrimoine, antiquité, luxe calme ».
---

# Heritage Lens

> Une visite au soleil couchant : la cité renaît plein écran, et une lentille dorée laisse voir ce qu'il en reste aujourd'hui.

## L'idée

Chaque écran est une **scène** (image ou 3D) baignée de lumière chaude, avec un **titre de lieu** en serif d'affiche ivoire ou doré, un court récit en serif, et un **objet d'interaction unique** : la lentille ronde ornée qu'on survole ou qu'on touche pour voir la ruine actuelle à travers la reconstitution. L'interface est discrète et ronde : bouton « Entrer » cerclé, points de chapitre à droite, réglages et son en bas à droite, logo de l'institution en haut à gauche.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de logo d'institution, de reconstitutions 3D ni de textes d'origine.

## Règles prioritaires

1. **Image d'abord** : la scène occupe tout l'écran ; le texte se pose sur un voile en dégradé, jamais dans une boîte opaque.
2. **Trois voix typographiques** : serif d'affiche (titres de lieu), serif de lecture (récit), sans fine (interface).
3. **Tout ce qui est interactif est rond** : anneaux fins ivoire, double anneau pour l'action principale.
4. **La lentille** est l'élément signature : une seule par scène.
5. **Or et terracotta** viennent de la scène ; dans l'interface, l'or sert aux titres de lieu et à l'élément actif.
6. **Contraste** : texte sur voile sombre (16:1) ; ivoire sur terracotta seulement en grand (4:1).
7. **Accessibilité** : la lentille a un équivalent clavier (bouton « Voir aujourd'hui ») ; le son est coupé par défaut.
8. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier. |
| `references/components.md` | Bouton Entrer, lentille avant/après, points de chapitre, titre de lieu, bulle de lieu, réglages/son, panneau « À propos ». Puis, relevés sur le site : prologue en phrases au défilement, bouton « défiler » à double anneau, médaillon de chapitre, bouton carte doré. |
| `references/layouts.md` | Écran d'accueil, scène de lieu, version mobile en cartes. |
| `references/motion.md` | Travellings, révélation de la lentille, transitions. |
| `references/assets.md` | Avant de placer une image ou une scène 3D : paires reconstitution / aujourd'hui, traitements, sources, prompts IA, recette de reconstitution IA et 3D. |
| `examples/demo.html` | Page d'exemple complète. |
| `source.md` | Observations et écarts. |

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Titre d'accueil et de lieu | **Gilda Display** (site : Maghfirea 400, payante) | 64–160px, interligne 1.02, ivoire ou or |
| Récit | **Crimson Pro** 400 | 17px / 1.45, colonne 340px, centré sous le titre ; sur le site, les phrases d'intro sont en display 30px/1.0 blanc, centrées |
| Interface | **Inter** 400/500 | 12–14px |

## Images et 3D

Chaque scène est une **paire de vraies images au même point de vue** : la reconstitution (chaude, saturée, dorée) et la ruine actuelle (neutre, un peu froide), que la lentille superpose. Dans la démo, la reconstitution est la même photo retraitée ; un vrai projet utilise une reconstitution IA guidée par la photo (ControlNet) ou une vraie scène 3D (photogrammétrie + Blender + Three.js), recettes dans `references/assets.md`. La dentelle, les anneaux et le médaillon restent en SVG/CSS ; jamais de dessin CSS/SVG à la place d'une photo, d'un monument ou d'un objet.

## Signature

**La lentille ornée** : un disque de 220px bordé d'une dentelle (anneau festonné en SVG), qui montre l'image « aujourd'hui » à l'intérieur, avec l'aide « Cliquer pour voir l'état actuel ».

## À éviter

- Des cartes, grilles ou menus classiques par-dessus la scène.
- Des titres en sans-serif ou en gras.
- Des couleurs vives non issues de la scène.
- Reprendre le logo de l'institution, les modèles 3D ou les textes de la référence.

## Adaptation React / React Native

- Lentille : `MaskedView` circulaire qui suit le doigt, image « aujourd'hui » dedans.
- Scènes : `FlatList` horizontale paginée ou défilement vertical avec images plein écran.
- Polices : `@expo-google-fonts/gilda-display`, `crimson-pro`, `inter`.

## Avant de livrer

- [ ] Scène plein écran, texte sur voile.
- [ ] Trois voix typographiques respectées.
- [ ] Interactifs ronds, une lentille par scène avec équivalent clavier.
- [ ] Son coupé par défaut.
- [ ] Testé à 375px et 1440px, mouvement réduit respecté.
- [ ] Vraies images (ou 3D) traitées selon `references/assets.md`, avec `alt` et couleur de repli ; paires au même cadrage.
- [ ] Aucun élément de l'institution d'origine.
