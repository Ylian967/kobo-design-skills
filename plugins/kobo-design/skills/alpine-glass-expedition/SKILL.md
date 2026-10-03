---
name: alpine-glass-expedition
description: Direction artistique « Alpine Glass Expedition » pour sites de voyage d'aventure et d'outdoor (agence de trek, randonnée, alpinisme, bivouac, ski de randonnée, écotourisme, refuge, guide de montagne), inspirée d'un concept Dribbble de site de voyages d'aventure. Photo plein écran d'un alpiniste de près dans la brume, presque monochrome bleu-gris avec un seul objet chaud, lumière en diagonale (brume claire en haut à gauche, bleu nuit en bas à droite) ; énorme titre en serif à empattements, capitales blanches sur deux lignes, posé en bas devant le sujet ; nav en capitales espacées sombres avec pilule blanche ; bouton rond « sphère de verre » bleu avec flèche ↗ ; bouton lecture rond et trois lignes en capitales ; note « 4,8/5 ★ » en chiffres fins et étroits ; puces en contour blanc empilées. Animée : altimètre de chargement, brume qui se lève, brume en dérive et neige fine, titre qui sort de la pente, sphère qui flotte et suit le pointeur, cartes qui se lèvent, itinéraire qui se trace au défilement. À utiliser pour une landing d'agence d'aventure, une page de séjours, une fiche itinéraire, un site de refuge ou une app de randonnée au style « montagne, brume, verre, froid, premium outdoor ».
---

# Alpine Glass Expedition

> Un alpiniste sort de la brume, le titre est gravé en capitales blanches devant lui, et une sphère de verre bleu flotte sur la pente.

## L'idée

La page est une **photo de montagne vue de près**, presque monochrome : tout va de la brume claire `--mist` au bleu nuit `--deep`, et **un seul objet reste chaud** (un casque, un sac). La lumière tombe **en diagonale** : clair en haut à gauche, sombre en bas à droite, bas de l'écran uni pour porter le texte. Deux voix : une **serif à empattements en capitales énormes** pour le titre, et **Archivo** pour tout le reste (capitales espacées pour la nav et les boutons, chiffres fins et étroits pour la note). L'interface est **ronde** : pilule blanche, puces en contour, disque de lecture, et la **sphère de verre** bleue.

Le mouvement fait la moitié du style (`references/motion.md`). Attention : la référence est une image fixe, donc **toutes les animations sont proposées** par le skill (voir `source.md`).

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : ni le nom, ni le logo, ni la photo, ni les textes du shot.

## Règles prioritaires

1. **Une photo, de près, froide** : une personne en montagne dans la brume, plein écran, refroidie sur la rampe `--abyss → --deep → --ridge → --slate → --steel → --haze → --mist`. Jamais de couleurs chaudes en fond.
2. **Un seul point chaud dans la photo** (casque, sac) ; dans l'interface, seule l'étoile `--star` est chaude (`--ember` est réservé aux erreurs).
3. **Lumière en diagonale** : voile à 155°, texte **sombre** `--ink` en haut à gauche (nav, logo, bouton lecture), texte **blanc** en bas et à droite.
4. **Titre** : serif capitales, 2 lignes courtes (≤ 14 caractères), `--fs-hero`, ancré en bas à 372px du bord, devant le sujet.
5. **Tout est rond** : pilules, puces, disques, cartes à `--r-card`. Aucun angle vif.
6. **Une sphère de verre par écran** : dégradé bleu opaque, jamais de `backdrop-filter`.
7. **Le site reste bleu nuit** après le héros : fond `--deep` partout, pas de section blanche.
8. **Fluide** : photos refroidies une fois (canvas), voile dans le calque de la photo, brume et neige dans un seul canvas, une seule boucle (`motion.md`, « Performance »).
9. **Accessibilité** : vrai texte en `aria-label` pour le titre découpé et la note ; `prefers-reduced-motion` ouvre sur l'état final ; cibles ≥ 44px ; focus blanc 2px ; contrastes de `tokens.css`.
10. **Aucune valeur en dur** : tout vient de `references/tokens.css` (la rampe est lue dans les variables CSS en JS).

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : couleurs mesurées sur l'image, tailles, grille du héros. |
| `references/motion.md` | **Toujours** : les 10 mouvements signature, le code, les règles de performance. |
| `references/components.md` | Nav, photo et voile diagonal, titre, sphère de verre, bouton lecture, note, puces, composants des sections, états. |
| `references/layouts.md` | Positions exactes du héros, page complète, mobile. |
| `references/assets.md` | Avant de choisir une photo : sujet, cadrage, haut clair, refroidissement, replis, React Native. |
| `examples/demo.html` | Page complète animée (agence fictive « Hautvent »). |
| `source.md` | Ce qui a été mesuré sur l'image, ce qui est proposé, les écarts. |

## Typographie

| Rôle | Police (Google Fonts) | Réglages |
|---|---|---|
| Titre, titres de section et de carte, logo | **Roboto Serif** 500, largeur 90 % | capitales ; titre 122px à 1440, interligne 0.92, approche −0.035em |
| Citation | Roboto Serif 400, largeur 90 % | bas de casse, 24–42px / 1.16 |
| Nav, pilule, puces, sphère | **Archivo** 600 (500 dans la sphère) | 16px capitales ; approche .1em (nav), .08em (pilule), .04em (puces) |
| Trois lignes du bouton lecture | Archivo 500 | 24px / 24px, capitales |
| Note et chiffres | Archivo **300**, largeur 70 % | 67px ; libellé 400, 19,6px capitales |
| Paragraphes | Archivo 400 | 20px / 30px sous le titre, 16px ailleurs |

La serif du shot n'est pas identifiée (empattements épais, contraste moyen, lettres serrées) ; Roboto Serif resserrée est la plus proche parmi celles comparées. Pour l'interface, les largeurs mesurées collent à Archivo au pixel près.

## Couleurs

| Rôle | Token |
|---|---|
| Rampe de la photo | `--abyss`, `--deep`, `--ridge`, `--slate`, `--steel`, `--haze`, `--mist` |
| Fond de page, bas du héros | `--deep` ; pied `--abyss` |
| Titre | `--white` → `--snow` (dégradé vertical) |
| Texte sombre sur brume | `--ink` |
| Note | `--frost` ; étoile `--star` |
| Sphère de verre | `--sky`, `--glacier`, `--steel`, `--slate` |
| Bouton lecture | `--tarn` |
| Pilule | `--white` avec lueur `--pill-glow` en haut |
| Texte secondaire sur sombre | `--muted` |
| Erreur | `--ember` |

## Images et 3D

Le héros est une **vraie photo** : une personne en montagne, de près, dans la neige ou la brume, avec un objet de couleur chaude, **haut de l'image clair**. Toutes les photos (héros, cartes de séjour, étapes, portrait du guide, photo finale) sont refroidies une fois dans un canvas sur la rampe du skill ; les pixels chauds sont épargnés. Brume et flocons sont ajoutés par-dessus. Jamais de montagne, de tente ou de personne dessinée ; le profil d'altitude est un graphique et reste en SVG. Pas de 3D attendue. Détails dans `references/assets.md`.

## Signature

**La sphère de verre sur la pente** : un disque bleu en dégradé (reflet clair en haut, bord inférieur éclairci) qui flotte à droite, juste au-dessus d'un titre serif géant posé devant un alpiniste dans la brume.

## À éviter

- Des photos chaudes ou colorées, un paysage sans personne dans le héros, un ciel sombre derrière la nav.
- Un titre en sans-serif, en bas de casse ou sur trois lignes.
- Plusieurs sphères de verre par écran, ou du verre flouté (`backdrop-filter`) partout.
- Des sections blanches ou des cartes à angles vifs.
- `--star` ou `--ember` en fond de bouton.
- Du texte blanc sur la brume claire, du texte sombre sur l'ombre bleue.
- Le nom, le logo, la photo ou les textes du shot.

## Adaptation React / React Native

- Héros : composant `<MistHero src focus="48% 30%" />` qui refroidit l'image dans un `useEffect` après `onLoad` ; un seul `requestAnimationFrame` pour parallaxe, brume et neige.
- Entrées et compteurs : hook `useInView` ; observer le parent d'un élément découpé par `clip-path`.
- React Native : images déjà refroidies, `expo-linear-gradient` pour le voile diagonal et la sphère (dégradé vertical + bordure), `react-native-reanimated` pour le flottement et le défilement, `react-native-svg` pour le profil d'altitude.
- Polices : `@expo-google-fonts/roboto-serif`, `@expo-google-fonts/archivo`.

## Avant de livrer

- [ ] Tokens importés, aucune valeur en dur (rampe lue dans les variables CSS).
- [ ] Photo du héros : personne entre 40 et 50 % de la largeur, haut clair, un seul point chaud.
- [ ] Voile diagonal en place ; texte sombre en haut à gauche, blanc ailleurs.
- [ ] Les 10 mouvements de `motion.md` présents, coupés en mouvement réduit.
- [ ] Règles « Performance » respectées (deux grands calques, pas de flou d'arrière-plan, une seule boucle).
- [ ] Contrastes vérifiés (`python3 tools/check.py alpine-glass-expedition`).
- [ ] Testé à 390px et 1440px, sans débordement horizontal.
- [ ] Aucun élément du shot d'origine.
