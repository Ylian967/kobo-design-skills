# Retro Mission Poster — mouvement

## Principes

Cinématique : chaque chapitre entre comme un plan de film, avec une parallaxe à trois vitesses. Technologies listées par la fiche Awwwards : animation, plein écran, storytelling, filtres et effets, WebGL.

## Catalogue

| Moment | Effet | Durée | Courbe |
|---|---|---|---|
| Chargement | Dentelure de l'anneau qui se remplit | selon chargement | linéaire |
| Entrée de chapitre | Fond qui glisse de 6 %, premier plan de 14 %, mot géant de 10 % | 1.6s | `--ease` |
| Titre de chapitre | Mots qui montent depuis un masque, décalage 90ms | 900ms | `--ease` |
| Survol anneau | Rotation de 20° | 250ms | `--ease` |
| Grain | Bruit qui change légèrement toutes les 120ms (option) | — | steps |

## Mouvement réduit

Pas de parallaxe ni de grain animé ; titres visibles directement ; changement de chapitre en coupe.
