---
name: heritage-lens
description: Direction artistique « Heritage Lens » pour la culture et le patrimoine (musée, site archéologique, monument, exposition, fondation, tourisme culturel, récit historique, documentaire), mesurée sur un site immersif primé consacré à une cité antique. Visite guidée plein écran pilotée par le défilement - écran de chargement à anneau de dentelle doré et pourcentage, prologue en phrases centrées sous une brume bleue qui se lève, mot-titre géant en serif d'affiche, bouton d'entrée rond à double anneau, chapitres ouverts par un médaillon orné et un titre géant, récit en serif centré, points d'intérêt avec titre doré et lentille ronde qui révèle une autre vue du lieu (état actuel, nuit, détail), puces de navigation à droite, boutons ronds cerclés d'or, page éditoriale sombre à défilement horizontal. Fond #252525, or pâle #f6cea0, texte blanc. À utiliser pour une visite virtuelle, un récit de lieu, une page d'exposition, un avant/après, un site au style « immersif, cinématographique, doré, musée ».
---

# Heritage Lens

> Un lieu ancien que l'on traverse à la molette, comme un film dont on tient la manivelle.

## L'idée

Tout l'écran est une image du lieu. Le texte arrive par petites doses, **au centre**, dans une police d'affiche élégante, puis s'efface pour laisser regarder. Des **ornements dorés très fins** (anneaux de dentelle qui tournent lentement) marquent les moments importants : le chargement, le numéro du chapitre, la lentille. La **lentille** est la promesse du style : un rond qui laisse voir le même endroit autrement, et qui s'ouvre en grand d'un clic. Les commandes sont de petits ronds cerclés d'or, rangés dans les coins.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de nom, logo, images ni textes du site d'origine.

## Règles prioritaires

1. **Une image plein écran par moment**, jamais de mise en page en colonnes sur les scènes.
2. **Une seule chose à lire à la fois**, centrée. Les blocs de texte se remplacent, ils ne s'empilent pas.
3. **Or `--gold` pour les ornements, les filets et les titres de lieu ; blanc pour le reste.** Aucune autre couleur d'interface.
4. **Filets de 1px, formes rondes** : boutons ronds de 51px, pilules, médaillon, lentille. Pas de rectangle, pas d'ombre portée.
5. **Trois polices, trois rôles** : affiche (titres, phrases, citations), serif (récit), sans (aide, boutons, légendes).
6. **Le défilement fait avancer le récit** ; les ornements, eux, tournent tout seuls (60s, 30s, 20s).
7. **Texte toujours sur un voile** (`--veil-1` au moins) ; jamais de texte nu sur une zone claire.
8. **La lentille montre le même lieu**, pas une autre image décorative.
9. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root`. |
| `references/components.md` | Ornement, chargement, éléments fixes, boutons, phrase, titre, médaillon, récit, point d'intérêt, lentille, page éditoriale. |
| `references/layouts.md` | Écran type, déroulé des scènes, fenêtres, mobile. |
| `references/motion.md` | Scènes collantes, plages de défilement, remplissage des boutons, performance, mouvement réduit. |
| `references/assets.md` | Avant de placer une image : sujets par scène, paire scène / lentille, sources, voiles, 3D optionnelle. |
| `examples/demo.html` | Visite complète animée (fondation fictive, Pétra). |
| `source.md` | Référence, mesures, ce qui est proposé, écarts. |

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Titre du site, titres de chapitre | **Viaoda Libre** (site : Maghfirea) | `min(20vh, max(75px, 12.5px + 9.77vw))` → 153px à 1440, interligne 0.9 |
| Titre d'un point d'intérêt | Viaoda Libre | 77.5px / 0.9, or |
| Phrases du prologue, citations | Viaoda Libre | 48.75px / 1 |
| « ENTREZ », numéro, pourcentage | Viaoda Libre | 27.75px capitales, 26px, 37px |
| Récit | **EB Garamond** (site : Sabon Next) | 19.75px / 1.2, centré |
| Aide, boutons, légendes | **Inter** (site : Graphik) | 14.25px / 19px |

## Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `--bg` | #252525 | Chargement, page éditoriale, fin |
| `--gold` | #f6cea0 | Ornements, filets, titres de lieu, bouton plein |
| `--white` | #ffffff | Texte sur les scènes |
| `--night` | #314757 | Brume du prologue |
| `--soft` | #c4c4c4 | Citations, valeurs secondaires |
| `--mist` / `--bronze` | #eae8e5 / #79644b | Bulles d'aide (fond / texte) |
| `--veil-1`, `--veil-2`, `--shade` | brun-noir à 55 %, 82 %, plein | Voiles de lisibilité |

## Images et 3D

De **vraies images plein écran** : un paysage brumeux puis doré pour le prologue, deux vues par chapitre (l'approche, puis le monument de près), une autre vue du même lieu dans la lentille, des œuvres pour la page éditoriale. Aucun filtre : l'ambiance vient des photos et de voiles en dégradé. L'ornement en dentelle, les flèches et les pictogrammes sont des signes et restent en SVG ; jamais un monument dessiné. 3D optionnelle si le projet possède un modèle du lieu (caméra sur rail), avec repli en photos. Détails dans `references/assets.md`.

## Signature

1. L'**anneau de dentelle doré** qui tourne (chargement, médaillon, lentille).
2. La **lentille** et sa vue révélée en plein écran.
3. Le **mot géant** en serif d'affiche, centré sur la photo.
4. Les **phrases du prologue** sous la brume qui se lève.
5. Le **bouton rond qui se remplit d'or** par le bas.

## À éviter

- Plusieurs blocs de texte visibles en même temps, ou du texte aligné à gauche sur une scène.
- Des cartes, des grilles, des rectangles à coins vifs sur les scènes.
- Un or saturé ou jaune ; d'autres couleurs d'accent.
- Des filtres CSS ou des modes de fusion sur les photos plein écran, un cercle qui s'ouvre en `clip-path` plein écran (voir « Performance » dans `motion.md`).
- Bloquer le défilement natif pour le piloter en JavaScript.
- Une lentille qui montre une image sans rapport avec la scène.

## Adaptation React / React Native

- **React** : `Scene` (section collante, fournit la progression `p` par contexte), `Beat` (bloc visible entre `from` et `to`), `Layer` (photo avec fondu et zoom), `Lace` (ornement SVG), `Lens`, `Editorial`. Un seul écouteur de défilement au niveau de la page.
- **React Native** : `Animated.ScrollView` + valeurs interpolées pour l'opacité et l'échelle des photos ; ornement en `react-native-svg` avec rotation Reanimated ; vue révélée en `Modal` avec fondu ; page éditoriale en `ScrollView` horizontal ; retour haptique léger au clic sur la lentille.

## Avant de livrer

- [ ] `:root` copié de `tokens.css`, aucune couleur en dur ailleurs.
- [ ] Chaque texte est lisible sur sa photo (voile présent), y compris en mobile.
- [ ] Une seule chose à lire par moment ; les plages `data-on` ne se chevauchent pas.
- [ ] Lentille, pilule, puces et fermeture utilisables au clavier ; Échap ferme les fenêtres.
- [ ] `prefers-reduced-motion` et bouton de réglage : plus de rotation ni de zoom.
- [ ] Pas de défilement horizontal à 390px ; point d'intérêt en carte arrondie.
- [ ] Nom, images et textes propres au projet ; crédits des images en légende.
