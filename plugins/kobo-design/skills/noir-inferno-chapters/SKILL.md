---
name: noir-inferno-chapters
description: Direction artistique « Noir Inferno Chapters » pour le récit illustré et l'édition (journal, magazine, campagne éditoriale, documentaire, album, roman graphique, exposition, manifeste), mesurée sur un récit interactif primé en noir et blanc. Expérience plein écran sans défilement, scène par scène - images en noir et blanc brumeuses avec grain, vignettage et poussière, citation d'ouverture en serif étroite, cercle fin à tirer vers une cible en tirets pour avancer, titre de scène centré en capitales serif suivi de trois lignes de texte, croix qui défait le titre en poussière pour laisser voir l'image, interface minuscule en capitales de 10px dans les coins, numéros de scène en bas, panneau « à propos » gris clair, un seul rouge pour le dernier geste. À utiliser pour un récit en chapitres, une landing éditoriale, une page de campagne ou un site au style « sombre, cinéma, noir et blanc, contemplatif, littéraire ».
---

# Noir Inferno Chapters

> Un livre d'images que l'on feuillette en tirant sur un cercle : une scène, une phrase, le noir, puis la suivante.

## L'idée

Chaque écran est **une image en noir et blanc**, brumeuse, granuleuse, sombre sur les bords. Au centre, **un titre en capitales serif** et quelques lignes — jamais plus. Pour avancer, on ne clique pas sur « suivant » : on **tire un petit cercle** vers une cible, comme on descend d'un cran. Une croix efface le texte, qui **se défait en poussière**, et l'image apparaît entière avec une interface minuscule dans les coins. Aucune couleur, sauf un rouge qui n'arrive qu'une fois, à la fin.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de nom, logo, illustrations ni textes du site d'origine.

## Règles prioritaires

1. **Noir et blanc.** Un seul rouge (`--signal`), une seule fois, pour le dernier geste.
2. **Une scène = une image plein écran + un titre + trois lignes au plus.** Pas de défilement.
3. **On avance en tirant le cercle** ; la molette, les flèches et Entrée font la même chose.
4. **Interface minuscule** : capitales de 10px espacées, traits de 1px, rien dans les coins tant que le texte est affiché.
5. **Texte toujours centré**, titre terminé par un point.
6. **Images brumeuses et sombres**, grain et vignettage par-dessus ; gris fait dans le fichier ou par le serveur, jamais en filtre CSS.
7. **Lenteur** : fondus de plus d'une seconde, aucun rebond.
8. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root`. |
| `references/components.md` | Cercle à tirer, citation, titre de scène, croix, interface de coin, numéros, bouton, panneau, grain et poussière. |
| `references/layouts.md` | Les trois états d'un écran, déroulé, mobile, variantes. |
| `references/motion.md` | Geste, fondus, poussière du titre, performance, mouvement réduit. |
| `references/assets.md` | Avant de placer une image : sujets par scène, sources, traitements, plans en profondeur. |
| `examples/demo.html` | Récit complet animé (« La Descente », sept scènes). |
| `source.md` | Référence, mesures, ce qui est proposé, écarts. |

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Titre de scène | **Instrument Serif** (site : Parkinson Condensed) | 5vmin (45px), capitales, centré, point final |
| Citation d'ouverture | Instrument Serif | 20px, capitales, approche 0.6px |
| Numéro de scène | Instrument Serif | 40px (les autres 18px) |
| Texte de scène | **Inter** 400 | 13px / 1.6, 480px au plus |
| Interface | Inter 400 | 10px / 18px, capitales, approche 0.14em |
| Panneau | Inter 400 | 12px / 20px, noir |

## Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `--bg` | #0d0d0d | Fond, voiles |
| `--text` | #ffffff | Texte, traits, cercles |
| `--soft` | #9c9c9c | Texte secondaire |
| `--half` / `--faint` | blanc 50 % / 22 % | Éléments en retrait / pointillés, cible |
| `--paper` / `--ink` / `--ink-soft` | #dedede / #000000 / #5a5a5a | Panneau « à propos » |
| `--signal` | #d0202a | Le cercle de la dernière scène, rien d'autre |

## Images et 3D

De **vraies images** en noir et blanc, une par scène, plein écran : rue dans la brume, falaise au-dessus du brouillard, silhouettes à contre-jour, forêt, escalier, mer d'orage, tunnel. Idéalement des illustrations peintes livrées en plans séparés ; sinon des photos passées en gris par le serveur d'images. Cercles, pointillés, croix, grain et poussière sont des signes et restent en CSS ; jamais une scène dessinée. 3D (WebGL) optionnelle pour animer des plans en profondeur. Détails dans `references/assets.md`.

## Signature

1. Le **cercle à tirer** le long d'une ligne pointillée.
2. Le **titre qui se défait en poussière**.
3. L'**image noir et blanc** brumeuse, granuleuse, vignettée.
4. Les **capitales de 10px** dans les coins et le **numéro serif** en bas.
5. Le **rouge unique** de la dernière scène.

## À éviter

- De la couleur, même discrète, avant la fin.
- Plusieurs blocs de texte, des listes, des cartes, des boutons pleins.
- Un bouton « suivant » à la place du cercle (l'issue au clavier suffit).
- `filter: grayscale()` ou un zoom animé sur des images plein écran (voir « Performance » dans `motion.md`).
- Des images nettes, lumineuses, détaillées.
- Des transitions rapides ou des rebonds.

## Adaptation React / React Native

- **React** : une machine à trois états (`intro`, `title`, `view`) et un index de scène dans un seul `useReducer` ; `PullCircle` (événements pointeur + clavier), `SceneStack` (images empilées, classe active), `DustTitle` (canvas temporaire), `CornerHud`, `AboutPanel`.
- **React Native** : `PanGestureHandler` + Reanimated pour le cercle (seuil à 80 %, retour en `withTiming`), retour haptique au franchissement du seuil ; images en `Image` superposées avec opacité animée ; poussière du titre avec `react-native-skia` ou remplacée par un simple fondu ; interface de coin en `Text` de 10px `letterSpacing: 1.4`.

## Avant de livrer

- [ ] `:root` copié de `tokens.css`, aucune couleur en dur ailleurs.
- [ ] On peut tout parcourir au clavier (Entrée, flèches, numéros) et à la molette.
- [ ] Chaque texte de scène est lisible sur son image (voile présent) ; trois lignes au plus.
- [ ] Images en gris dans le fichier ou par le serveur, toutes dans la même gamme.
- [ ] Le rouge n'apparaît qu'à la dernière scène.
- [ ] `prefers-reduced-motion` : pas de poussière, pas de fondu long.
- [ ] Titre, images et textes propres au projet.
