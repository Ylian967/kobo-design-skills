# Noir Inferno Chapters — mouvement

## Principes

Lent et grave. Les passages se font par le noir, comme au cinéma. Catégories de la fiche Awwwards : animation, page unique, WebGL, art & illustration, promotionnel.

## Catalogue

| Moment | Effet | Durée | Courbe |
|---|---|---|---|
| Chapitre suivant | Fondu au noir (600ms) puis fondu de la nouvelle scène (600ms) | 1.2s | `--ease` |
| Titre | Apparition par flou → net (blur 8px → 0) et opacité | 1.8s, après la scène | `--ease` |
| Numéro | Fondu croisé | 600ms | `--ease` |
| Scène au repos | Zoom très lent 1 → 1.06 (effet Ken Burns) | 20s | linéaire |
| Brume | Dérive alternée | 40s | linéaire |
| Verrou | Pas de nouveau changement pendant une transition (anti-défilement en rafale) | 1.2s | — |

## Mouvement réduit

Coupes franches entre chapitres, pas de Ken Burns ni de brume animée, titre affiché directement.
