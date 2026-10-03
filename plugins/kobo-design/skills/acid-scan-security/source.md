# Source — Acid Scan Security

- **Site de référence** : https://dribbble.com/shots/27776445-ThreatIQ-Next-Gen-Data-Security-Website (Subash Chandra)
- **Famille** : Tech / cybersécurité
- **Analysé le** : 2026-10-01, Chrome ; 2026-10-03, vérification de toutes les pièces jointes du shot

## Ce qui a été vu

- **Héros plein cadre** : photo de visage en monochrome vert acide (duotone du noir-vert ~#0a1a00 au vert ~#2fbf00 et au citron ~#b8ff5a), recouverte d'une grille de points / lignes de balayage façon écran pixel.
- **Réticule** : un filet vertical au centre et un filet horizontal vers 40 % de la hauteur, à la hauteur des yeux.
- **Bande de scan** : rectangle citron vif (~#c8f000) en travers des yeux, entouré d'un cadre de détection fin.
- **Titre** : en bas à gauche, capitales d'aspect pixel / bitmap, hautes, citron pâle (~#d6ff9a), sur trois lignes, la dernière plus sombre.
- **Surtitre** « MILITARY-GRADE ENCRYPTION » en jaune-citron (~#e0ff3a), capitales ; petit paragraphe pâle en haut à droite.
- **Navigation** : logo anneau + nom à gauche, liens minuscules en capitales espacées au centre, bouton carré vert clair translucide « GET PROTECTED » à droite.
- **Carte CTA** : carré vert sombre avec icône cadenas et « START PROTECTING », encadré de crochets d'angle en L.

## Pages explorées (2026-10-03)

| Source | Relevé |
|---|---|
| Shot Dribbble | Une seule image (3200×2400, héros). Relue à pleine résolution : rien de plus que ce qui est décrit. |
| Autres shots du même projet / site en ligne | Aucun trouvé (recherche Dribbble par nom de projet, description du shot sans lien). |

## Non mesuré

- Il s'agit d'un **mockup Dribbble** : analyse visuelle des images uniquement, aucun site en ligne, aucun code inspecté.
- Toutes les valeurs (couleurs, tailles, pas de trame, espacements) sont **estimées à l'œil**.
- La police du titre n'est pas identifiée : Jersey 10 (pixel haute) est **choisie à l'œil** ; JetBrains Mono et Inter complètent.
- Les sections sous le héros (mesures, couches, console, bandeau final) ne figurent pas sur les captures : elles prolongent le langage du héros et sont proposées par le skill.
- Aucune animation n'est visible sur des images fixes : le mouvement (`motion.md`) est une proposition.

## Écarts assumés

| Élément du shot | Dans le skill | Raison |
|---|---|---|
| Nom de marque, logo, textes | Marque fictive « Gridward », logo anneau générique, textes inventés en français | Marque et droits d'auteur |
| Photo de visage | Visuels de la démo : photos Unsplash libres (licence Unsplash), lues et tramées en canvas (`data-slot="portrait-duotone"`), à remplacer par les images du projet | Droit à l'image |
| Bouton translucide (texte pâle sur vert clair transparent) | Fond `--acid` à 16 % ; paire de contraste vérifiée sur l'équivalent opaque `--glass` (11,2:1) | Lisibilité vérifiable |
| Texte gris-vert très sombre pour les métadonnées | `--dim` #6f9a45 (6:1) | Contraste ≥ 4,5:1 |
| Titre pixel dans tous les corps | Pixel réservé aux grands corps ; mono en dessous de 28px | Lisibilité |
| Seulement un héros | Sections supplémentaires et alerte `--danger` jaune | Rendre le skill utilisable sur une page complète |
