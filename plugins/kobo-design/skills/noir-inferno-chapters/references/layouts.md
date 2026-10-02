# Noir Inferno Chapters — mises en page

## Séquence

1. **Ouverture** (chapitre 1) : photo réelle de rue ou de foule (voir `assets.md`), sans titre central — seulement le nom du projet en haut à gauche et « 1 » en bas.
2. **Chapitres 2 à N** : une scène + un titre central + le numéro.
3. **Fin** : écran noir, une phrase finale centrée, liens d'écoute / d'achat en capitales espacées.

Chaque chapitre est fixe plein écran ; le défilement ne fait pas glisser la page, il déclenche le passage au chapitre suivant (fondu au noir).

## Grille

Aucune grille de contenu : position absolue centrée pour le titre, coins à `--edge` (40px).

## Mobile

- Coins réduits : nom du projet + numéro + bouton « SOMMAIRE ».
- Titres à 28px, sur 2 lignes si besoin.
- Glisser vers le haut = chapitre suivant.
- Images recadrées sur le sujet principal (`object-position`).
