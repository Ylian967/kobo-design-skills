---
name: retro-mission-poster
description: Direction artistique « Retro Mission Poster » pour un récit de marque ou de mission (énergie, climat, industrie, mobilité, aérospatial, startup à grande ambition, manifeste, rapport annuel raconté, campagne), d'après un site primé à l'esthétique d'affiche de voyage rétro. Chaque écran est une affiche plein cadre - image en aplats granuleux dans une gamme terre rouge et ciel sarcelle, cadre crème tout autour de l'écran, titre géant en capitales très hautes et étroites incliné vers le haut, petit « Chapitre N » espacé, mot rouge géant derrière le titre, accroche en capitales grasses façon Futura en bas à droite avec bouton crème rectangulaire, anneau dentelé rouge qui tourne autour d'une flèche, logo rouge. Menu et journal sur fond presque noir avec titres rouges géants et filets rouges. À utiliser pour une landing en chapitres, un récit de mission, une page de lancement ou un site au style « affiche vintage, années 60, désert, optimiste, cinématographique ».
---

# Retro Mission Poster

> Une affiche de voyage des années 60 pour une idée d'aujourd'hui : un désert rouge, un ciel sarcelle, un titre qui grimpe en biais.

## L'idée

On ne lit pas une page, on feuillette **une série d'affiches**. Chaque chapitre est une image plein écran aux **aplats granuleux**, enfermée dans un **cadre crème** comme un tirage. Le titre, en capitales immenses et étroites, **monte en diagonale** ; derrière lui, parfois, un mot rouge géant à moitié hors cadre. En bas à droite, une accroche courte et un bouton rectangulaire ; au centre, un **anneau dentelé** qui tourne autour d'une flèche et invite à descendre. Le ton est optimiste et un peu héroïque : une mission, des chapitres, un cap.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de nom, logo, visuels ni textes du site d'origine.

## Règles prioritaires

1. **Un chapitre = une affiche plein écran.** Une image, un titre, une accroche. Rien d'autre.
2. **Le cadre crème** entoure toujours l'écran.
3. **Le titre est incliné de 13°** et tient sur deux lignes ; il alterne droite / gauche d'un chapitre à l'autre.
4. **Trois encres** : crème, rouge, noir chaud. Les images restent en terre rouge et sarcelle.
5. **Images traitées en aplats avec grain**, calculées une fois ; jamais de filtre en direct.
6. **Capitales partout** dans l'interface ; texte courant seulement dans l'accroche et le journal.
7. **Le rouge en grand** (logo, mots géants, titres du journal, filets) ; pas de petit texte rouge sur sombre sans `--red-text`.
8. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root`. |
| `references/components.md` | Cadre, logo et menu, titre de chapitre, mot géant, accroche, anneau, liste de faits, carte du journal, inscription. |
| `references/layouts.md` | Un chapitre, déroulé, journal et article, menu, mobile. |
| `references/motion.md` | Entrées, anneau, mot géant, menu, performance, mouvement réduit. |
| `references/assets.md` | Avant de placer une image : sujets, effet d'affiche, sources, 3D optionnelle. |
| `examples/demo.html` | Récit complet animé (entreprise fictive « Hélios », cinq chapitres et un journal). |
| `source.md` | Référence, ce qui a pu être mesuré, ce qui est proposé, écarts. |

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Titres, mots géants | **Big Shoulders Display** 800 (site : Mars Condensed) | 120px, interligne 0.84, capitales ; mot géant jusqu'à 368px |
| Titres du journal | Big Shoulders Display 800 | 40px / 34px |
| Accroches, boutons, logo | **Jost** 700 (site : Futura LT Bold) | 20px et 14px, capitales |
| Texte | Jost 500 (site : Futura LT Medium) | 18px / 24px |
| Dates, « Chapitre N » | Jost 500 | 14px, capitales, espacées |

## Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `--bg` | #161616 | Chargement, menu, journal |
| `--cream` | #fdf0e1 | Cadre, titres, texte, bouton |
| `--red` / `--red-text` | #e74833 / #f0604c | Logo, mots géants, filets / petit texte rouge |
| `--soft` | #d8d8d8 | Texte et traits du menu |
| `--rust-deep`, `--rust`, `--sand` | #4a2a22, #885040, #e8d8c0 | Ombre, terre, lumière des affiches |
| `--sky`, `--sky-pale` | #285868, #98b0b0 | Ciel des affiches |

## Images et 3D

De **vraies photos** — véhicule ancien dans un désert, route et falaises, usine, avion, soleil bas — redessinées une fois en **affiches** : aplats, trois tons chauds, ciel sarcelle, grain. Le cadre, l'anneau dentelé, les flèches et les traits sont des signes en CSS / SVG ; jamais un paysage ou un véhicule dessiné. 3D optionnelle (c'était la forme du site d'origine) avec repli sur les affiches fixes. Détails dans `references/assets.md`.

## Signature

1. Le **titre géant incliné** en capitales étroites.
2. Le **cadre crème** autour de l'écran.
3. Les **images en aplats granuleux**, terre rouge et sarcelle.
4. L'**anneau dentelé** rouge et sa flèche.
5. Le **mot rouge géant** derrière le titre.

## À éviter

- Des photos brutes, nettes, non traitées ; des couleurs hors gamme.
- Un titre droit, centré ou en bas de casse.
- Plus d'un bloc de texte par chapitre.
- Des boutons arrondis, des ombres, du verre dépoli.
- Un grain ou un filtre appliqué en direct sur tout l'écran (voir « Performance » dans `motion.md`).
- Du rouge en petit texte sur fond sombre.

## Adaptation React / React Native

- **React** : `PosterImage` (calcule l'affiche une fois, met le résultat en cache, ou reçoit une image déjà traitée), `Chapter` (titre, accroche, anneau ; classe `in` par observateur), `Frame`, `ToothRing`, `ChapterMenu`, `NewsCard`.
- **React Native** : chapitres en `FlatList` verticale paginée (`pagingEnabled`) ; affiches **préparées à l'avance** (pas de calcul de pixels sur l'appareil) ; titre incliné avec `transform: [{ rotate: '-13deg' }, { skewX: '-13deg' }]` ; anneau en `react-native-svg` avec rotation Reanimated ; cadre en `View` à bordure posé au-dessus.

## Avant de livrer

- [ ] `:root` copié de `tokens.css`, aucune couleur en dur ailleurs.
- [ ] Chaque titre lisible sur son image (zone calme, sombre ou moyenne).
- [ ] Images traitées une fois ; aucun filtre ni grain en direct.
- [ ] Le cadre reste visible à toutes les tailles.
- [ ] Menu au clavier (Échap, focus) ; anneau et boutons de 44px au moins.
- [ ] `prefers-reduced-motion` : titres en place, anneau fixe, pas d'aimant.
- [ ] Pas de défilement horizontal à 390px.
- [ ] Nom, images et textes propres au projet.
