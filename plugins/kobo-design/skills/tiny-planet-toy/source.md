# Source — Tiny Planet Toy

- **Référence** : https://messenger.abeto.co/ (fiche Awwwards : https://www.awwwards.com/sites/messenger — Site of the Day)
- **Famille** : Expérience web / jeu
- **Analysé le** : 2026-10-01 (première version, à l'œil, fenêtre de 612px) ; **2026-10-03, réécriture complète** : site ouvert à 1440 × 900, séquence d'entrée capturée image par image, jeu lancé et joué, couleurs **lues au pixel** sur les captures.
- **Ce qui plaît** : la planète-jouet qu'on a envie de toucher, le logo en blocs posé dessus, le rendu dessiné à contours d'encre.

## Ce que contient la référence

Un **jeu en ligne rendu entièrement en WebGL**. Le document ne contient ni texte, ni police web, ni feuille de style utile : **aucun style calculé n'a pu être relevé**, tout vient de captures d'écran.

Écrans vus :

| Écran | Relevé |
|---|---|
| Chargement | Fond blanc, enveloppe au trait, « LOADING » |
| Entrée | Volet turquoise incliné qui balaie le blanc ; planète petite en haut, puis au centre et plus grande ; blocs du logo en grille 3 × 3 ; bouton jaune « BEGIN » en dernier |
| Écran-titre | Fond turquoise uni, poussières claires, planète, logo, bouton |
| Jeu | Vue derrière le personnage, rue en volume au rendu dessin animé, contours d'encre, ciel turquoise à nuages plats ; déplacement au clavier vérifié |
| Dialogue | Étiquette bleue « MESSENGER », panneau blanc légèrement de travers, texte en capitales tracées à la main qui s'écrit lettre à lettre, bouton carré à flèche bleue |

Non vu : la suite du jeu, ses menus, une éventuelle version mobile.

## Mesuré (lecture des pixels sur captures à 1440 × 900)

| Élément | Valeur |
|---|---|
| Fond de l'écran-titre | #65c1bc (99 184 points) |
| Lettres-blocs | #eef2e4 ; tranche #b8b7a2 |
| Bouton | #eaca65 à #f2cf59 |
| Nuages, halos | #9ee5d5 |
| Eau, ombres du ciel | #2a8490 |
| Arbres | #306840 ; pont #61a78d |
| Murs | #98a898, #a8a098 ; chaussée #6f9190 |
| Encre | #333d3f à #3a383b |
| Étiquette du dialogue | #66bee6 |
| Panneau du dialogue | #fdfdfd, ≈ 715 × 122px ; étiquette ≈ 210 × 50px |
| Veste du personnage | #b75758 |
| Planète et logo | ≈ 45 % de la largeur de l'écran |

Les captures sont des images compressées : les valeurs sont justes à quelques unités près.

## Observé à l'œil (non mesuré)

- Les durées : volet d'entrée (un peu moins d'une seconde), vitesse de frappe du dialogue (≈ 30ms par lettre).
- La pente du volet (≈ 7°) et celle du bouton (≈ 4°).
- L'épaisseur des contours et des tranches.

## Polices

Le site n'en charge aucune : lettres du logo, étiquettes et dialogues sont **dessinés**. Rubik Mono One, Silkscreen et Patrick Hand sont des équivalents libres choisis à l'œil.

## Proposé par le skill

- **Toute la page autour de l'écran-titre** : quartiers, « comment jouer », appel, pied. Le site ne montre que l'écran-titre puis le jeu.
- La planète **générique** en formes simples, sa rotation lente, le glisser, le pivot vers un quartier.
- Les courbes et durées de toutes les animations ; les survols et les appuis.
- Les fiches de quartier, les touches de clavier, la version mobile, les autres écrans.
- Les images par seconde de `motion.md`, mesurées dans un Chrome sans carte graphique, à 1440px seulement.

## Écarts assumés

| Référence | Dans le skill | Raison |
|---|---|---|
| Monde, personnages, logo « Messenger », textes anglais | Planète générique, jeu fictif « Estafette », textes français | Identité, droits |
| Planète finement modélisée et peinte | Cubes, pyramides, cylindres et icosaèdres | Montrer le rendu sans reprendre le modèle |
| Tout en WebGL, plein écran | Planète seule en WebGL (canvas de 620px), interface en HTML | Accessibilité, performance, texte sélectionnable |
| Lettres du logo en objets 3D | Blocs HTML posés au-dessus du canvas | Idem ; elles restent nettes |
| Poussières qui dérivent | Poussières immobiles | Pas d'animation continue en plein écran |
| Texte blanc sur l'étiquette bleue (2:1) | Texte `--ink` (5,4:1) | Contraste |
| Le bouton lance le jeu | Le bouton mène à la suite de la page | Il n'y a pas de jeu derrière la démo |
| Aucune photo | Aucune photo : la 3D tient lieu d'image | Le style n'en utilise pas |

## Limites connues

- La planète de la démo est bien plus simple que celle du site : c'est une maquette de rendu, pas une copie.
- Sur mobile, la planète ne suit pas le défilement : on ne la voit plus quand on choisit un quartier.
- Le glisser de la planète et la fluidité à 390px n'ont pas été mesurés.
