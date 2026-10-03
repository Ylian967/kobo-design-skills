# Arena Guide — mises en page

## Principes

- Navigation statique 80px en haut (pas fixe sur la référence ; une version fixe est acceptable).
- Container 1208px pour les médias, colonne de texte ≤ 880px centrée.
- Padding de section mesuré : 48px 0 (64px pour la première), mais chaque section fait ~640px de haut : beaucoup d'air autour du contenu.
- Points de rupture mesurés : 1024px (principal), 768px, 600px, 420px.

## Structure d'une page guide

1. **Héros cinématique** (≈ 480px) : visuel plein cadre, texte à gauche.
2. **Intro blanche** : titre « Comment jouer » centré + paragraphe, puis panorama (image réelle fondue blanc → nuit, voir `assets.md`).
3. **Question générale** (« Qu'est-ce que le jeu ? ») : titre centré sur une vidéo floutée en fond, paragraphe centré.
4. **Sections objectif** (2 colonnes 50/50) : à gauche titre + paragraphe + médaillons-onglets ; à droite grand médaillon sur la carte fondue + sous-titre italique + explication centrée. Les sections suivantes inversent parfois les colonnes.
5. **Sections vidéo** : titre à gauche, bloc vidéo + vignettes centré.
6. **Appel final** : titre « Prêt à jouer ? » + bouton cyan large.

## Barre globale (toutes les pages)

`#111` ~80px : logos (emplacements) · liens capitales 14px/600 (APERÇU, CHAMPIONS ▾, ACTUALITÉS ▾, NOTES DE VERSION, DÉCOUVRIR ▾, PLUS ▾) · recherche ronde/carrée sombre · globe · pilule cyan JOUER. Les ▾ ouvrent un **menu déroulant** (panneau `--nav-panel`, bord haut cyan 2px).

## Gabarit « Liste des champions »

1. Fond clair (`--paper-2` ou `--paper`).
2. **En-tête centré** : « CHOISISSEZ VOTRE » petites capitales navy + « CHAMPION » serif 900 italique 57px navy + intro 2 lignes.
3. (Proposition, non relevée) barre de recherche + filtres de rôle centrés.
4. **Grille 4 colonnes** de cartes portrait ≈ 2:3 (mesuré 332×502), gouttière 16px, container 1440px max ; bandeau nom navy en bas de chaque carte.

## Gabarit « Fiche champion »

1. **Héros plein écran** : splash art, dégradé navy à gauche et en bas ; bloc texte en bas à gauche : sous-titre doré italique (~30px) → nom 75px → bio 16px → 2 cartes info carrées à bord or (rôle, difficulté).
2. **Compétences** (fond `--bg`) : H2 57px à gauche ; colonne gauche = rangée de 5 icônes-onglets 96px + nom et description de la compétence active ; colonne droite = vidéo de démonstration 16:9 dans le **double cadre doré**. Grille 5/7.
3. **Skins** (fond `--bg-2`) : H2 « SKINS » ; grande image 16:9 pleine largeur du container ; bande de 5 vignettes 16:9 (active cadre or + nom or) ; ligne de progression + flèches dorées.
4. (Facultatif) actus liées en grille 3 colonnes, puis appel final « Prêt à jouer ? ».

## Gabarit « Actualités »

1. **Bandeau navy ~290px** avec « ACTUS » serif 900 italique blanc aligné à gauche.
2. (Facultatif) onglets de catégorie = les liens du menu déroulant (TOUT, MISES À JOUR, E-SPORT…).
3. **Grille 3 colonnes** de cartes d'actu sur fond clair, gouttières 32px horizontales / 48px verticales.
4. Bouton « Voir plus » centré (bouton contour or ou bouton cyan).

## Mobile — observé à 390px (≤ 1024px puis ≤ 600px)

Relevé dans un cadre de 390px (points de rupture mesurés : 1024px principal, 768px, 600px, 420px) :
- **Barre** : logos à gauche ; à droite **globe + bouton hamburger carré gris arrondi** (`--panel`, rayon 8px, 44px). **JOUER n'est plus visible** dans la barre (le placer dans le panneau du menu ou en bas de page).
- **Héros cinématique** : image recadrée sur le visage (sujet centré), sur-titre « Cinématique », titre serif italique blanc, texte, **bouton doré plein « REGARDEZ »** (fond `--gold`, texte `--ink`, coins droits) sur toute la largeur utile.
- **Fiche champion** : le splash passe **en haut en 16:9**, puis un **bloc navy** avec sous-titre doré, nom (≈ 44px), bio, et les cartes info **sous** le texte (2 côte à côte).
- Compétences : icônes 64px défilables horizontalement, vidéo sous les icônes ; cadre doré simple (le second filet est retiré sous 600px).
- Skins : vignettes défilables (scroll-snap), flèches conservées.
- Liste des champions : **2 colonnes** (déduit des points de rupture ; 3 colonnes entre 600 et 1024px).
- Actus : bandeau réduit (~160px), grille en 1 colonne.
- Sections objectif du guide en une colonne : titre, paragraphe, médaillons (en ligne, défilables), puis le grand médaillon et l'explication.
- Titres réduits par `clamp` à 36px ; texte 16px / 26px.
- Vignettes vidéo défilables horizontalement.
