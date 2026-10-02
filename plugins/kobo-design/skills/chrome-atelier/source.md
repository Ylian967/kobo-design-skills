# Source — Chrome Atelier

- **Site de référence** : https://dribbble.com/shots/27491195-Website-Design-for-Avant-Garde-Jewelry-Product (Shakuro)
- **Famille** : Luxe / bijou produit 3D
- **Analysé le** : 2026-10-01, Chrome

## Ce qui a été vu

- **Page produit (claire)** : fond blanc cassé (~#f2f2f0), filets gris fins en diagonale et en croix passant par le centre, grand cercle fin autour du produit ; bijou d'oreille sculptural en chrome et or, rendu 3D, centré.
- **Bloc texte à gauche** : minuscule étiquette entre crochets (« [ … ] »), titre en grotesque capitale sur deux lignes décalées (la seconde indentée), trois lignes de texte courant en petit corps.
- **Légendes** : traits reliant la pièce à de petites étiquettes « • YELLOW GOLD », « WHITE GOLD » ; en bas au centre, la liste des titres d'or « 10K, 14K, 18K, 22K ».
- **Navigation** : logo-mot géométrique à gauche ; à droite, petits liens en capitales et pilule à contour « JOIN WAITLIST ».
- **Héros sombre** : photo bleu-gris très foncée, gros plan d'un portrait portant la pièce chromée ; titre en escalier sur quatre lignes ; pilule à contour ; barre de caractéristiques en bas, trois colonnes séparées par des filets (petite étiquette + valeur : épaisseur, prix, volume) ; cercles-guides fins sur la photo.
- **Autres écrans** : carte de confirmation de liste d'attente blanche sur fond sombre, rangée de logos presse, section communauté avec panneau blanc qui chevauche une photo sombre.

## Non mesuré

- Il s'agit d'un **mockup Dribbble** : analyse visuelle des images uniquement, aucun site en ligne, aucun code inspecté.
- Toutes les valeurs (couleurs, tailles, espacements, rayons) sont **estimées à l'œil** et arrondies sur une échelle de 4px.
- Les polices d'origine ne sont pas identifiées : Archivo (élargie), IBM Plex Mono et Inter sont **choisies à l'œil** comme équivalents gratuits.
- Aucune animation n'est visible sur des images fixes : le mouvement (`motion.md`) est une proposition cohérente avec le style.

## Écarts assumés

| Élément du shot | Dans le skill | Raison |
|---|---|---|
| Nom de marque, logo-mot, textes | Marque fictive « Ossel », logo à cercle, textes inventés en français | Marque et droits d'auteur |
| Rendu 3D du bijou, photo de portrait | Visuels de la démo : photos Unsplash libres (licence Unsplash) et scène Three.js (pièce procédurale), à remplacer par les images et le modèle du projet | Droits d'auteur |
| Logos presse | Mots-symboles typographiques inventés | Marques tierces |
| Or utilisé en petit texte | `--gold-ink` #7f6127 (5,1:1 sur `--bg`) ; `--gold` réservé au métal et au texte sur nuit (8:1) | Lisibilité |
| Liens de nav gris très clair | `--muted` #5c5c58 (6:1) | Contraste ≥ 4,5:1 |
| « 10K, 14K… » en simple texte | Boutons à bascule de 44px | Accessibilité, cible tactile |
| Prix en dollars | Prix en euros, unités françaises (0,7 cm³) | Contenu localisé |
