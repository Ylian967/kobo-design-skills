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

## Mobile (≤ 1024px puis ≤ 600px)

- Navigation : logos + bouton JOUER + menu burger ; liens dans un panneau sombre.
- Sections objectif en une colonne : titre, paragraphe, médaillons (en ligne, défilables), puis le grand médaillon et l'explication.
- Titres réduits par `clamp` à 36px ; texte 16px / 26px.
- Vignettes vidéo défilables horizontalement.
