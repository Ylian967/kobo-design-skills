# Cosmic Voyage — mises en page

## Principes

- Barre de navigation fixe 58px en haut, contenu en dessous.
- Fond fixe : nuit étoilée (dégradé `--bg` → bleu nuit + étoiles), parfois une nébuleuse bleu-violet floue.
- Points de rupture mesurés : 1024px (desktop), 1024–1365px (petit desktop), ≤ 1023px (mobile/tablette).
- Échelle d'espacement 4 → 80px (mesurée), rayons 6 → 48px.

## Accueil (une seule hauteur d'écran)

La page d'accueil **ne défile pas** : c'est une scène pleine hauteur (100vh − nav).
1. Illustration plein écran (emplacement `data-slot="key-art"`).
2. Logo en haut à gauche (emplacement).
3. Bloc de téléchargement en bas au centre-gauche (QR + 6 boutons) et bouton lecture vidéo.
4. Rail social à droite, « Scroll Down » vertical à gauche.

## Page personnages

Grille sur 3 zones à 1440px : frise d'emblèmes (≈ 120px) à gauche, panneau de verre (≈ 900px) au centre, l'illustration qui déborde. En-tête de section « Personnages » au-dessus du panneau.

## Page actualités

Colonne centrée ≈ 880px : en-tête de section, onglets, puis liste de cartes à un coin espacées de 16px. Pagination simple en bas (numéros 14px, actif en or).

## Mobile (≤ 1023px)

- Navigation : barre de 52px avec logo à gauche, bouton Télécharger à droite, menu en tiroir plein écran (fond `--nav`, liens 18px).
- Accueil : illustration recadrée en portrait, bloc de téléchargement réduit à 2 boutons (stores).
- Personnages : frise d'emblèmes horizontale en haut (cercles 56px), panneau pleine largeur, illustration au-dessus du texte, citations masquées sauf la première.
- Actualités : cartes en une colonne, vignette au-dessus du texte (16:6), coin arrondi conservé.
