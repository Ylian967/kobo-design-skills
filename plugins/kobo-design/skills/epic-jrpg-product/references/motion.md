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
| Lien de nav (survol / actif) | Texte or + ornement ✦✦✦ en fondu | 200ms (mesuré : transitions `0.2s ease` du site) | ease |
| Menu mobile | Panneau en fondu + descente de 8px ; burger → ✕ | 300ms (estimé) | ease |
| Changement d'édition (configurateur) | Fondu croisé du visuel et du titre de la carte | 200ms (estimé) | ease |
| Sélection plateforme | Fond or + contour or | 200ms (mesuré) | ease |
| Visionneuse média | Fondu entre deux médias ; compteur mis à jour | 300ms (estimé) | ease |
| Flèches de la visionneuse | Survol or | 500ms (mesuré : flèches de carrousel `all 0.5s ease`) | ease |
| Bouton flottant | Survol : monte de 2px | 200ms (estimé) | ease |
| Newsletter envoyée | Le formulaire est remplacé par « Merci ! » en fondu | 300ms (estimé) | ease |
| Chargement de page | `fade-in` des blocs (keyframe mesurée) | 500ms (estimé) | ease |

## Mouvement réduit

Pas de fondu à l'apparition ni de fondu croisé (changement d'édition et visionneuse instantanés) ; menu mobile affiché sans descente ; accordéon instantané ; indicateur de chargement remplacé par le texte « Chargement… ».
