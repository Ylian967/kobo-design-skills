---
name: chrome-atelier
description: Direction artistique « Chrome Atelier » pour fiches produit de luxe et landings de pré-lancement (bijou, joaillerie, horlogerie, objet design, parfum, accessoire haut de gamme), inspirée d'un concept Dribbble de bijou d'oreille sculptural et du site en ligne de la marque. Héros nuit en photo bleu-gris profond avec cercles de cadrage fins, titre en capitales Regular sur quatre lignes en escalier, barre de trois caractéristiques ; puis planche blanche traversée de filets gris qui passent par le centre, grand cercle fin autour de la pièce en 3D, étiquettes entre crochets en mono, titres sur deux lignes décalées, légendes de métal posées sur le cercle, pilules à contour fin. Animée — chargement tracé au compas avec pourcentage, cellules de la barre qui montent en cartes photo, planche qui se dessine, pièce qui tourne et change d'or au défilement, presse au survol. À utiliser pour une page produit premium, une liste d'attente, un lancement en série limitée ou une app e-commerce au style « luxe technique, chrome et or, galerie, minimal ».
---

# Chrome Atelier

> Une pièce d'orfèvrerie posée sur une planche d'architecte : des filets fins, un cercle de cadrage, et l'or qui brille seul au milieu du blanc.

## L'idée

Deux ambiances qui partagent la même grammaire de **traits fins et de cercles** :
1. **La nuit** — une photo bleu-gris très sombre du bijou porté, cadrée par des cercles et deux axes ; le titre descend en escalier à gauche ; une barre de trois chiffres ferme l'écran.
2. **L'atelier** — une page blanche où quatre filets se croisent au centre, un grand cercle entoure la **pièce en 3D**, et les noms des métaux se rangent sur le cercle comme sur un cadran.

Tout le reste est minuscule et calme : texte de 13px, capitales en Regular (jamais de gras), étiquettes mono entre crochets, pilules à contour de 0,8px. Le seul objet coloré de la page, c'est le métal.

Le mouvement prolonge l'idée de planche : tout **se trace**, puis la pièce **tourne avec le défilement**. Détail et sources dans `references/motion.md`.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : ni le nom, ni le logo, ni la pièce, ni les photos, ni les textes de la marque.

## Règles prioritaires

1. **Tout passe par le centre** : filets, cercle, pièce, axes du héros. Un seul centre par écran.
2. **Regular partout** : titres en capitales 400, petits (26px dans le héros, 20px ailleurs à 1440), sur 2 lignes décalées ou 4 en escalier. Jamais de gras, jamais de grande taille.
3. **Une étiquette entre crochets** en mono au-dessus de chaque titre.
4. **Traits de 0,8px** : contours des pilules, filets, cercles, barre. Aucun arrondi sauf les pilules.
5. **Deux palettes seulement** : blanc + `--ink` + `--body` (atelier), `--night` + blanc + `--soft` (nuit). La couleur vient du métal et de la peau.
6. **Une vraie pièce** : modèle 3D, vidéo ou séquence de rendus ; jamais un dessin.
7. **Beaucoup de vide** : un bloc de texte par écran, 34 à 36 caractères par ligne.
8. **Lisibilité** : le site descend à 8–10px ; le skill tient 13px pour le texte et 11px pour les libellés, cibles de 44px. `--soft` et `--ghost` ne servent jamais de texte sur blanc.
9. **Fluide** : 3D rendue à la demande, une seule boucle de défilement, pas de flou d'arrière-plan qui bouge (`motion.md`, « Performance »).
10. **Accessibilité** : `prefers-reduced-motion` ouvre sur l'état final et rend la scène non collante ; légendes, logos de presse et questions sont des boutons ; `aria-live` sur l'article et le formulaire.
11. **Aucune valeur en dur** : tout vient de `references/tokens.css` (les couleurs des métaux sont lues dans les variables CSS par la scène 3D).

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : couleurs, métaux, tailles, grille, durées mesurées. |
| `references/motion.md` | **Toujours** : les 8 mouvements signature, ce qui est mesuré, observé ou proposé, le code, la performance. |
| `references/components.md` | Étiquette, titre décalé, pilules, navigation, héros, barre, cartes, planche et roue des légendes, pièce, presse, galerie, questions, liste d'attente, états. |
| `references/layouts.md` | Ordre et mesures de la page, schéma, mobile. |
| `references/assets.md` | Avant de choisir une image ou de monter la 3D : sujets, cadrages, trois façons de montrer la pièce. |
| `examples/demo.html` | Page complète animée (marque fictive « Ossel »). |
| `source.md` | Ce qui a été mesuré, observé, proposé ; écarts. |

## Typographie

| Rôle | Police (Google Fonts) | Réglages |
|---|---|---|
| Titres, texte, boutons, libellés | **Inter** 400 (site : Suisse Int'l) | titres en capitales ; héros `--fs-hero` / 1.1 ; sections `--fs-h2` / 1 ; texte 13px / 1.385 ; boutons et libellés 11px capitales espacées |
| Étiquettes, pourcentage, compteur | **IBM Plex Mono** 400 (site : Suisse Mono) | 13px, approche −0.108em |

## Couleurs

| Rôle | Token |
|---|---|
| Fond clair, barre de navigation | `--paper` |
| Fond du chargement | `--mist` |
| Titres, contours, logo | `--ink` |
| Texte courant, étiquettes | `--body` |
| Filets, cercles | `--rule` |
| Éléments non choisis (logos de presse, métaux) | `--ghost` |
| Photo de nuit, pied | `--night`, `--black` |
| Texte secondaire sur nuit | `--soft` |
| Barre de caractéristiques | `--bar`, `--bar-line` |
| Métaux de la pièce | `--gold`, `--white-gold`, `--rose` (+ `-lo`, `-hi`) |
| Message d'erreur | `--gold-ink` |

## Images et 3D

Photos : un **gros plan du bijou porté** sur fond bleu-gris sombre pour le héros, des portraits et des détails de peau et de métal pour les cartes, la presse et la galerie, une macro de métal liquide pour les questions. La **pièce** est en vraie 3D : modèle `.glb` du produit, vidéo pré-rendue ou, en attendant, le volume procédural de la démo (Three.js), avec les couleurs de métal des tokens. Filets, cercles, arcs et logo sont des signes et restent en CSS / SVG ; jamais un bijou dessiné. Détails dans `references/assets.md`.

## Signature

**La planche au cercle** : sur du blanc, quatre filets qui se croisent, un grand cercle fin, la pièce de métal au centre, et le nom de l'or choisi accroché au cercle par un trait.

## À éviter

- Des titres gras ou grands ; du texte centré.
- Des coins arrondis, des ombres, des cartes à fond gris.
- Des couleurs d'accent : l'or ne sert jamais de couleur de bouton.
- Un bijou dessiné, une icône de diamant, un rendu 3D mat.
- Plusieurs centres ou des filets qui ne passent par aucun.
- Des animations qui jouent seules dans la scène : c'est le défilement qui commande.
- Le nom, le logo, la pièce ou les textes de la marque d'origine.

## Adaptation React / React Native

- Scène collante : composant `<Stage>` avec un hook `useScrollProgress(ref)` ; la 3D dans `@react-three/fiber` (`frameloop="demand"`, `invalidate()` quand la progression change).
- Roue des légendes : état `metal`, variable CSS `--rot`.
- React Native : `react-native-reanimated` (`useScrollViewOffset`), `react-native-svg` pour filets, cercles et arcs, pièce en vidéo (`expo-video`) plutôt qu'en 3D.
- Polices : `@expo-google-fonts/inter`, `@expo-google-fonts/ibm-plex-mono`.

## Avant de livrer

- [ ] Tokens importés, aucune valeur en dur.
- [ ] Un centre par écran ; filets, cercle et pièce alignés dessus.
- [ ] Titres en Regular, décalés ; étiquette entre crochets au-dessus.
- [ ] Vraie pièce (3D, vidéo ou rendus) et vraies photos, avec replis.
- [ ] Les 8 mouvements de `motion.md` présents là où la page en a besoin, coupés en mouvement réduit.
- [ ] Règles « Performance » respectées (3D à la demande).
- [ ] Contrastes vérifiés (`python3 tools/check.py chrome-atelier`).
- [ ] Testé à 390px et 1440px, sans débordement horizontal.
- [ ] Aucun élément de la marque d'origine.
