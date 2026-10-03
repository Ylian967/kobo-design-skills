# Bubble Publisher Hub — mouvement

## Principes

Même plateforme que les pages produit de l'éditeur : transitions courtes `0.2s ease` (couleurs, fonds, bordures), `0.3s` pour les déplacements, flèches de carrousel `0.5s ease`.

## Catalogue

| Moment | Effet | Durée | Courbe |
|---|---|---|---|
| Survol bouton rouge | Rouge plus clair | 200ms | ease |
| Survol carte de sortie | Image zoom 1.04, bulle reste fixe | 300ms | ease |
| Carrousel | Glissement d'une carte | 500ms | ease |
| Barre au défilement | La barre noire se replie | 300ms | ease |
| Fenêtre d'inscription | Fondu + montée de 16px ; tuiles du collage qui tournent de 15° → 12° au survol | 300ms | ease |
| Lien souligné | Le soulignement s'allonge de gauche à droite | 200ms | ease |
| Lien de nav (survol / actif) | Texte rouge + trait-pilule qui s'étire depuis le centre (`scaleX` 0 → 1) | 200ms (mesuré : transitions `0.2s ease`) | ease |
| Menu mobile | Panneau en fondu + descente de 8px ; burger → ✕ | 300ms (estimé) | ease |
| Flèches de rangée | Glissement d'une carte (`scrollBy`, défilement doux) ; survol : flèche décalée de 3px | 500ms (mesuré pour les flèches de carrousel) / 200ms | ease |
| Filtres et recherche | Mise à jour immédiate des rangées, compteur `aria-live` | instantané | — |
| Chevron de menu déroulant | Rotation 180° au focus | 200ms (estimé) | ease |
| Survol carte de jeu / actu | Zoom image 1.04 | 300ms | ease |
| J'aime | Cœur rempli + scale 1.15 | 200ms (estimé) | ease |
| Bouton ▶ | Scale 1.06 au survol | 200ms (estimé) | ease |

## Mouvement réduit

Pas de zoom ni de rotation ; carrousel sans animation (`scroll-behavior: auto`) ; menu mobile sans descente ; fenêtre affichée sans montée.
