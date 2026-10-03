# Source — Bubble Publisher Hub

- **Site de référence** : https://fr.bandainamcoent.eu/ (portail européen d'un éditeur japonais de jeux vidéo)
- **Famille** : Jeu vidéo
- **Analysé le** : 2026-10-01, Chrome, 1536×674
- **Méthode** : mesure ciblée des titres, liens et boutons + captures (manifeste, jeu à la une, club, playtest, sorties, fenêtre d'inscription). La plateforme technique est la même que la page produit analysée pour `epic-jrpg-product` (mêmes variables, transitions et points de rupture).

## Mesures brutes

- **Police** : Metropolis, puis Gotham, Helvetica Neue
- **H1** : 60px, 600, interlettrage -2.1px, interligne 60px, #0e2130
- **H2 (encarts)** : 24px, 700, -0.48px, #e20613
- **Navigation** : 16px, 600, -0.16px, noir, padding 0 19px
- **Couleur primaire (variable)** : #e20613 ; claire #f92432
- **Section club** : rose (relevé à l'œil ≈ #fb9aa2)
- **Rayons** : bulles ≈ 12px, boutons ≈ 8px (relevés sur captures)

## Pages explorées

Exploration complète le 2026-10-02 (Chrome, bureau + iframe 390px). « Mesuré » = valeur lue dans le navigateur ; « observé » = relevé à l'œil sur capture.

| URL | Ce qui y a été relevé |
|---|---|
| `/` (accueil) | Déjà analysée le 2026-10-01 (voir « Mesures brutes ») ; revue de l'en-tête (état actif, filet). |
| `/games` (Jeux) | Bande de couleur, lettre géante, titre en bulles empilées, cartes vedettes à queue, recherche + filtres, rangées-carrousels par catégorie, cartes à bordure HUD. |
| `/live` (Actualités) | Bande rose, titre-bulle noir, cartes d'actualité (pastille date, j'aime, bouton lecture), recherche d'actualités, filtre Catégorie. |
| Nav : Jeux, Store, Actualités, Films & séries, Club!, Support + loupe | En-tête commun ; footer : À propos, Presse, Recrutement, Licensing, ENREGISTRER UN JEU, REJOIGNEZ LE CLUB! |
| Toutes pages en iframe 390px | Barre utilitaire noire, logo-bulle blanc sur fond de couleur, loupe + burger, titres-bulles conservés, cartes pleine largeur. |

### Mesuré

- **Rose de la page Actualités** : #f99aa0.
- **Pastille date** des actualités : 14px / 700.
- **Titres d'actualité** : 24px / 300 noir ; franchise en capitales 16px gras.
- **Cartes** (jeux et actualités) : rayon 16px.
- **Champ de recherche** : bord noir 1.5px, rayon 12px.
- **Titres-bulles empilés** : texte blanc gras ≈ 44px. **Cartes vedettes** : titre capitales ≈ 24px.
- **Liens de nav** : ≈ 16px / 500 noirs (l'accueil donnait 600 : on garde 600 sur l'accueil, 500 sur les pages internes).
- **Trait actif** sous le lien : ≈ 16×4px arrondi, rouge.

### Observé (à l'œil)

- En-tête blanc, logo dans une bulle rouge contour (queue en bas à gauche) ; lien actif rouge.
- Filet multicolore **épais** (bleu, turquoise, jaune, rose) en haut à droite de l'en-tête, sur la partie droite seulement (épaisseur estimée 8px).
- Page Jeux : bande pleine noire couvrant la moitié haute des premières cartes ; lettre géante coupée en fond ; « Jeux » (petite bulle rouge) + « Populaires » (bulle rouge plus large) décalées ; 2 cartes vedettes avec dégradé noir, titre + date à droite, queue sous le coin bas gauche.
- Recherche : placeholder « Chercher un jeu », loupe rouge ; menus « Catégorie ⌄ », « Date de sortie ⌄ » texte noir + chevron rouge.
- Rangées par catégorie : titre en bulle noire à gauche, flèches ← → rouges fines à droite ; carrousel de cartes 16:9 avec une carte coupée au bord droit ; certaines cartes ont une bordure haute colorée à encoche/onglets (motif HUD).
- Actualités : pastille date blanche en bas à droite de l'image, cœur « j'aime » + compteur, bouton ▶ carré blanc à icône rouge sur les vidéos.
- Mobile : barre utilitaire noire (compte, FR, logo carré), logo-bulle blanc sur fond de couleur, loupe + burger ; accueil mobile : titre navy gras 32px puis carte image arrondie.

## Non mesuré

- Rayons, rose du club, dégradé des cartes de récompense et taille des queues de bulle relevés sur captures.
- Mobile observé en iframe 390px, sans mesures chiffrées. Épaisseur du filet épais, opacité de la lettre géante et durées des carrousels / filtres : estimées.

## Écarts assumés

| Élément du site | Dans le skill | Raison |
|---|---|---|
| Metropolis / Gotham | Montserrat | Libre, même famille de dessin |
| Logo-bulle, jeux, visuels | Formes et emplacements | Marque et droits d'auteur |
| Fenêtre d'inscription ouverte automatiquement | Ouverte au clic | Expérience et accessibilité |
| Lettre géante = fragment du nom du site/de la marque | Fragment d'un mot générique (« JEUX ») | Identité |
| Noms de franchises dans les actualités | Franchises inventées | Marques |
| Visuels de jeux | Visuels de la démo : photos Unsplash libres (licence Unsplash) et/ou scène Three.js, à remplacer par les images du projet | Droits d'auteur |
