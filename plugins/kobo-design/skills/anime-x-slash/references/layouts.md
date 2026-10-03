# Anime X Slash — mises en page

## Grille

- Fond `--bg` sur toute la page ; sections séparées par l'espace (padding vertical 80px mesuré), jamais par des traits horizontaux.
- Container du contenu : 1146px max. Colonne de texte : 720px qui démarre vers 20 % de la largeur (≈ 330px sur 1536px).
- Les titres de section ne respectent pas le container : ils partent du bord gauche de l'écran.
- Décor de fond fixe : 3 à 6 **filets diagonaux** au même angle (1px, `--line-accent` et `--line-ghost`) qui dessinent un grand X en contour. Ils restent derrière tout, `pointer-events: none`.
- Points de rupture mesurés : 768px (mobile ≤ 768, desktop ≥ 769).

## Écran de chargement

Fond noir plein écran. Au centre, le logotype en gris foncé (#333 observé) qui **se remplit de blanc de bas en haut** pendant que le trait du X se dessine, au fil du pourcentage (masque). En bas à gauche « LOADING » (Oswald 11px blanc), en bas à droite le pourcentage. Sortie : une **bande rouge diagonale** traverse le logo avec un texte qui défile (observé), puis fondu noir 500ms. Le contenu doit rester accessible même si le script échoue (le loader disparaît après 4s maximum).

## En-tête

Pas de barre : seulement le **carré MENU** fixe en haut à gauche, le **sélecteur de langue** en haut à droite, le rail « OFFICIAL » + icônes sociales fixe en bas à gauche.

## Héros (pleine hauteur)

1. Fond `--bg`.
2. Derrière : une **lettre X géante** en aplat magenta/rouge tramé (halftone en `radial-gradient`) et éclats colorés.
3. Devant : le visuel principal (groupe de personnages) centré, qui déborde en haut.
4. En bas au centre : le logotype noir en italique condensé, qui chevauche le visuel.
5. À droite : « VISUAL SELECTER » vertical + 4 vignettes.

Le visuel principal est toujours une image réelle (illustration officielle du projet, photo de cosplay/acteur, rendu) dans `data-slot="key-visual"` : voir `assets.md`. Le X géant, la trame et les éclats restent des formes graphiques CSS ; jamais de personnage dessiné en CSS/SVG.

## Bande visuelle découpée

Section noire avec un grand visuel découpé en X (voir `components.md`), voile sombre, gros mot Oswald gris translucide qui sort en bas (titre de la section suivante, ex. « INTRODUCTION »).

## Actualités

Liste noire centrée dans le container, juste après le héros, chevauchant légèrement la section suivante.

## Introduction

Titre « INTRODUCTION » rouge géant à gauche → colonne de texte gras 20px/40px → une phrase d'accroche en rouge 32px gras → bande noire pleine largeur avec le pitch en blanc (même colonne).

## Staff & casting

Deux colonnes égales, titres « STAFF » / « CAST » en Oswald noir 48px, listes en italique (voir composants).

## Classement / personnages

Deux rangées de 5 cartes-parallélogrammes emboîtées ; triangles noirs aux extrémités ; la 2ᵉ rangée est décalée d'une demi-carte vers la gauche.

## Pied de page

Noir. Logos partenaires au centre, tag-btn « OFFICIAL SNS », liens sociaux en ligne, copyright 11px, mentions en gris 14px alignées à droite, liens SUPPORT | PRIVACY à gauche.

## Pages internes — socle commun (observé le 2026-10-02)

Toutes les pages internes (personnages, actualités, histoire, vidéos, musique, spécial) partagent :
1. Fond `--bg-inner` (#f3f3f3) avec de **grands X / parallélogrammes en filet** rouge fin et gris derrière le contenu (`.page-deco`).
2. **Logotype noir centré en haut** (≈ 40px du haut), bouton MENU carré noir fixe en haut à gauche.
3. **Titre de page rouge géant coupé au bord gauche** (`.page-title`), puis le contenu dans le container 1146px.
4. Pas de loader complet : le loader n'apparaît qu'à l'arrivée sur le site (voir plus haut).
5. Pied de page noir identique à l'accueil.

## Gabarit « Personnages » (liste)

`titre de page` → `onglets` (saison / groupe) → **grille de cartes-parallélogrammes** (5 par rangée, triangles noirs aux bouts, rangées décalées comme à l'accueil) → bande « Épisode de … » du personnage mis en avant → lignes d'épisode (vignette 16:9 + texte, filet noir).

## Gabarit « Fiche personnage » (`?chara=…`)

```
┌──────────────── fond noir pleine largeur ───────────────────┐
│ NOM GÉANT (blanc)                       RANG  01 (rouge)    │
│ CV Interprète  ( ) ( )                                       │
│ illustration pleine hauteur      accroche 2 lignes (droite)  │
│ sur éclats couleur perso         description 16px            │
│                                  ┌ VIDÉOS ┐ vignette 1 + titre│
│                                  vignette 2 + titre          │
└──────────────────────────────────────────────────────────────┘
  grille complète des personnages (N&B, actif en couleur)
```
Grille desktop : 3 colonnes `1.1fr 1fr 0.8fr` (identité · illustration · vidéos) ; l'illustration déborde en haut et en bas de la bande noire.

## Gabarit « Actualités » (News)

`titre de page` → (onglets de catégorie facultatifs) → **liste de barres noires de 96px** espacées de 16px, chacune avec bord haut rouge 4px et date rouge collée en haut à gauche → pagination centrée. Page d'article (déduite) : date rouge, titre Noto Sans JP 32/700, image 16:9, texte en colonne 720px, bouton `tag-btn` « Retour à la liste ».

## Gabarit « Histoire » (Story)

`titre de page` → **sélecteur d'épisodes** (grille de cases #24…#01) → bloc épisode : image 16:9 à gauche (55 %), titre rouge 32px + synopsis à droite → navigation « ‹ épisode précédent / suivant › ».

## Gabarit « Vidéos » (Movie)

`titre de page` → **barre de filtres noire 2×4** (actif rouge + encoche) → grille 3 colonnes de cartes vidéo (bandeau titre en haut de la vignette) → lecteur en modal (fond `--veil`, vidéo 16:9, bouton CLOSE carré rouge).

## Gabarit « Musique » (Music)

`titre de page` → onglets 3 colonnes (actif rouge + encoche) → pile d'**accordéons** (barres noires 110px, + blanc → − rouge) ; panneau ouvert : pochette carrée + titre entre 「 」 géant + crédits.

## Gabarit « Spécial »

Grille 3 colonnes de **cartes bannière mot-clé** (rouge + parallélogramme noir + X), légende 12px dessous.

## Mobile (≤ 768px) — observé à 390px

Relevé dans un cadre de 390px de large (points de rupture mesurés : `max-width: 768px` avec 243 règles, et 767px) :
- **En-tête** : logotype noir **en haut à gauche**, bouton MENU carré noir **en haut à droite** (60px). Le sélecteur de langue et le rail social passent dans le menu.
- **Menu ouvert** : une seule colonne de liens (32px), langue en haut, réseaux en ligne en bas.
- **Titre de page** : rouge, pleine largeur (≈ 56px), toujours collé à gauche.
- **Grille personnages** : **2 cartes par rangée**, parallélogrammes conservés avec triangles noirs aux extrémités ; numéros rouges plus petits (≈ 56px). Le biais peut être réduit à `-12deg` pour garder les noms lisibles (choix du skill, non observé).
- Colonne de texte : pleine largeur avec 20px de marge, texte 16px/32px.
- Fiche : une colonne — nom + rang, illustration, CV + accroche (alignée à gauche), description, vidéos en 1 colonne.
- Actualités : barres de hauteur auto (min 96px), padding 20px, date au même endroit.
- Filtres Movie : 2 colonnes × 4 rangées ; onglets Music : 3 colonnes conservées (texte 16px).
- Accordéon : panneau en une colonne (pochette au-dessus du titre, titre 40px).
- Sélecteur d'épisodes : 5 cases par rangée.
- Visuel découpé de l'accueil : une seule bande diagonale.
