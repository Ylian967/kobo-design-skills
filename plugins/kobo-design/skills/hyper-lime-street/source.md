# Source — Hyper Lime Street

- **Référence** : https://zenless.hoyoverse.com/fr-fr/main (site officiel d'un jeu d'action urbain)
- **Famille** : Jeu vidéo
- **Analysé le** : 2026-10-01 et 2026-10-02 (première version et pages internes) ; **2026-10-03, réécriture complète de l'accueil** : Chrome 1440×900, page parcourue en entier (5141px), ≈ 20 captures, styles calculés des éléments clés, feuilles de style de la page (≈ 580 000 caractères) lues par script, images de formes du site téléchargées et mesurées.
- **Ce qui plaît** : les formes inclinées, le lime, les numéros géants, l'énergie.

## Ce que contient la référence

Un site **animé** (HTML et CSS, sans canvas) : écran de chargement, carrousels, texte défilant, entrées au défilement. Les formes (bandes noires, blocs lime, panneaux) sont des **images PNG** en fond.

## Mesuré (1440×900)

| Élément | Valeur |
|---|---|
| Base | `html { font-size: 56.25px }` = largeur / 25.6 ; tout le site suit la largeur |
| Polices | Impact (« en impact ») pour l'affiche ; police système et Inter pour le reste |
| Fond de page | #efefef |
| Barre | 56px, noire ; liens 11.25px gras #787878 ; onglet actif : pilule blanche 78 × 28px, rayon 67.5px, `scale(1.12)`, texte noir ; pilule lime #d8fa00 148 × 25px |
| Contenu | 1080px de large |
| Sections | hauteurs 865, 690, 667, 687, 599, 861px |
| Bloc titre | image de 475 × 442px ; titre 36.56px, sous-titre anglais 18px, numéro 104.6px, texte #222122, à 218px du bord gauche |
| Panneau | 1161 × 442px (images `chara-panel`, `panel`) |
| Angle | **41°** par rapport à la verticale (bord diagonal de `bg-nav.png`, mesuré au pixel) |
| Mot géant | 406px / 320px, `rgba(239,239,239,.1)` |
| Nom de personnage | 49.5px, #222122, bloc de 349px aligné à droite |
| Pilule de vignettes | 374 × 43px, fond #222122, rayon 21.4px ; vignettes au pas de 90px |
| Bouton « En savoir plus » | 138 × 43px, texte 13.5px #d6d6d6 en police d'affiche |
| Titre sur image | 45px, `rgba(216,250,0,.9)` |
| Texte défilant | 22.5px / 32.6px, `wordsLoop 20s linear infinite` |
| Onglet latéral | 46 × 201px, #0a0a0a, rayon 8.44px à gauche ; numéro 27px blanc |
| Pied | titre 24px / 28px gras #ccd0d2 ; bouton 195 × 48px #c6e800, rayon 24px ; champ en pilule #222 |
| Couleurs les plus fréquentes | #fff (66), #000 (33), #61636b (19), #323339 (17), #333 (14), #222122 (12), #d8fa00 (9), #2d2e33 (9), #ccd0d2 (8), #111 (7), #c6e800 (6) |
| Courbes | `cubic-bezier(0.15, 0.59, 0.45, 0.89)` (102 règles sur la couleur de fond, 40 sur les transformations, 30 sur l'opacité) ; `ease-in-out` sur les glissements (44 règles) ; opacité en `ease-out` avec 0.05s de retard |
| Animations | `wordsLoop 20s`, `heartbeat .8s` (échelle 1.097 relevée en cours), `all .4s ease-out`, `all 300ms`, fenêtres 200ms |
| Rayons | 8.44px (cartes, onglet), 67.5px (pilules), 24px (bouton), ≈ 22px sur les grandes formes (lu sur les images) |

## Observé sur captures

- Écran de chargement blanc, « NOW LOADING » en bas à droite.
- Visuel clé à coins arrondis, logo et « Télécharger maintenant » en autocollants inclinés, rangée de boutons de plateformes, QR code.
- Pellicule en diagonale derrière les sections ; bande noire tramée ; alternance bloc lime à gauche / à droite.
- Les sections se décalent légèrement au défilement (transformation verticale relevée : −27px).

## Proposé par le skill (non mesuré)

- **Les durées et distances des entrées** : sur le site elles sont posées par script (les règles n'indiquent que la courbe). `--dur-in` 700ms, glissements de 40 à 70 %.
- Les formes **refaites en CSS** (`skewX`, `border-radius`, `clip-path`) au lieu des PNG ; la trame des bandes (dégradé répété).
- La dérive du mot géant, le survol des vignettes et des boutons, la sortie de l'écran de chargement.
- `--nav-idle` (#878787 au lieu de #787878), `--watermark`, `--veil`, `--hatch`.
- Toute la version mobile.
- Les images par seconde de `motion.md`, mesurées dans un Chrome sans carte graphique.

## Non vu

- La **version mobile** : le site sert une page différente selon l'appareil.
- Les pages internes n'ont **pas été rouvertes** le 2026-10-03 : `layouts.md` reprend le relevé du 2026-10-02 (actualités, article, univers, personnage). L'ancienne page d'exemple `actus.html` a été supprimée : seule `demo.html` illustre le skill.
- Le menu « Plus », la connexion, le lecteur de musique.

## Écarts assumés

| Référence | Dans le skill | Raison |
|---|---|---|
| Nom, logo, personnages, illustrations du jeu | Jeu fictif « NEON DISTRICT », personnages inventés, photos Unsplash de rue | Identité et droits |
| Impact | Anton | Police libre, disponible partout |
| Personnages détourés (illustrations) | Photos découpées en bande inclinée | Pas d'illustrations libres ; le détourage est décrit dans `assets.md` |
| Formes en images PNG | Formes en CSS | S'adapter à toutes les largeurs, pas de fichiers |
| Logos de plateformes et QR code | Libellés « PC », « Console », « iOS », « Android » | Marques |
| Liens de la barre #787878 (4,4:1) | #878787 | Contraste |
| Tout le site proportionnel à la largeur | Tailles bornées par `clamp()` | Lisibilité sur petit et très grand écran |
| Icônes de réseaux | Sigles en lettres | Marques |
