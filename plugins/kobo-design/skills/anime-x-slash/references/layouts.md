# Anime X Slash — mises en page

Mesures prises à 1440px de large le 2026-10-03. Le site est construit sur une base de 1200px : chaque taille s'écrit `min(valeur / 1200 × 100vw, valeur)`, donc tout rétrécit en proportion sous 1200px et reste fixe au-dessus.

## Accueil — ordre et mesures

| # | Section | Hauteur à 1440 × 900 | Fond | Contenu |
|---|---|---|---|---|
| 0 | Chargement | plein écran | noir | logo au centre (un tiers de la largeur), « LOADING » en bas à gauche, pourcentage en bas à droite (marges 3,33vw) |
| 1 | Héros | 765px (53 % de la largeur, au plus la hauteur de l'écran) | `--bg-hero` | visuel en éclats, logotype magenta derrière, logotype noir en bas (à 5,8vw du bas), bande d'annonce, rails |
| 2 | Bande-annonce | 807px (16:9) | `--bg` | titre à gauche, bouton à droite, X découpé, portes diagonales |
| 3 | Actualités | 568px | `--bg` | titre, bouton, liste de 1052px (160px sous le haut) |
| 4 | Introduction | ≈ 2000px | `--bg` puis noir | titre, colonne de 880px, accroche rouge, bloc noir |
| 5 | Staff et casting | ≈ 1370px | `--bg` | titre, 2 colonnes |
| 6 | Personnages | ≈ 1050px | `--bg` | titre, bouton, grille de 840px |
| 7 | Pied | 431px | noir | logotypes, réseaux, mentions |

```
┌MENU┐                                              LANGUE [FR][JP]
│    │            ◢ éclats photo en biais ◣
└────┘       ◢◤  ◢◤  ◢◤ visuel central ◥◣  ◥◣  ◥◣         V
 O        (grand logotype magenta tramé derrière)          I
 F                                                         S  ← vignettes
 F ■                  RANK ZERO/                           ■
   ■        ▰▰ Tous les dimanches… dès avril ▰▰            ■
TITRE (collé à gauche)                          [ ARCHIVE ]
        ╲            ╱
         ╲  vidéo   ╱        ← visible seulement dans le X
         ╱    X     ╲
```

Règles :
- **Titres collés au bord gauche**, sans marge ; le bouton contour est à 80px du bord droit.
- **Colonnes centrées** de largeur fixe : 1052px (actualités), 880px (texte), 840px (grille), ≈ 1050px (staff et casting).
- **80px** au-dessus de chaque titre, **80px** entre le titre et le contenu (160px pour les actualités).
- Les **filets de fond** sont fixes derrière le contenu : ils ne défilent pas.
- En-tête : seul le bouton MENU est fixe. Sur l'accueil il n'y a pas de logo en haut ; sur les pages internes, logotype noir centré à 40px du haut.

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
- **Grille personnages** : **2 cartes par rangée**, parallélogrammes conservés avec triangles noirs aux extrémités ; numéros rouges plus petits (≈ 56px). Le biais reste le même qu'en grand écran.
- Colonne de texte : pleine largeur avec 20px de marge, texte 16px/32px.
- Fiche : une colonne — nom + rang, illustration, CV + accroche (alignée à gauche), description, vidéos en 1 colonne.
- Actualités : barres de hauteur auto (min 96px), padding 20px, date au même endroit.
- Filtres Movie : 2 colonnes × 4 rangées ; onglets Music : 3 colonnes conservées (texte 16px).
- Accordéon : panneau en une colonne (pochette au-dessus du titre, titre 40px).
- Sélecteur d'épisodes : 5 cases par rangée.
- Héros : visuel en hauteur (≈ 150 % de la largeur), logotype et bande d'annonce en bas, vignettes du sélecteur en haut à droite sous le bouton MENU, réseaux en haut à gauche.
- Bande-annonce : bloc 4:5, X plus large ; boutons contour sous les titres, alignés à droite.

