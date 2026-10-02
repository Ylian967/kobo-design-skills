# Epic JRPG Product — mouvement

## Principes

Sobre et rapide. Mesuré : `all 0.2s ease` (×23), `fill 0.2s ease`, `background-color, border-color 0.2s ease`, `opacity 0.2s ease` ; variables `--transition-duration: 0.3s`, `--fast: 0.2s`, `--faster: 0.1s` ; flèches de carrousel `all 0.5s ease`. Keyframes : `fade-in`, `dot-move`, `dot-rotate-1…4` (chargement), `splide-loading` (carrousel).

## Catalogue

| Moment | Effet | Durée | Courbe |
|---|---|---|---|
| Survol bouton or | Passe en contour, texte or | 200ms | ease |
| Survol tuile plateforme | Contour or | 200ms | ease |
| Sélection plateforme | Fond or | 200ms | ease |
| Accordéon | Hauteur + rotation du « + » de 45° | 300ms | ease |
| Lecture vidéo | Image → vidéo en fondu | 300ms | ease |
| Apparition des blocs | Fondu simple (`fade-in`) | 500ms | ease |
| En-tête au défilement | Étage haut qui se replie | 300ms | ease |

## Mouvement réduit

Pas de fondu à l'apparition ; accordéon instantané ; indicateur de chargement remplacé par le texte « Chargement… ».
