# Source — Showroom Bento

- **Site de référence** : https://dribbble.com/shots/27766449-Motorcycle-E-Commerce-Website-Design (Nixtio)
- **Famille** : E-commerce / showroom produit
- **Analysé le** : 2026-10-01, Chrome

## Ce qui a été vu

- **Description du shot** : showroom digital premium ; moto au centre, accès rapide au prix, aux caractéristiques, au choix du modèle, aux accessoires et à la configuration de couleur.
- **Écran unique dans un cadre arrondi** (rayon ~16px), fond gris clair (~#e4e4e4) avec une lumière radiale blanche au centre et une ombre elliptique au sol sous la moto.
- **Navigation** : monogramme géométrique rouge à gauche ; groupe de pilules centré (active noire ~#1a1a1a texte blanc, les autres blanches) ; à droite, deux boutons ronds blancs (panier, compte) et une pilule noire « Order ».
- **Titre** à gauche en grotesque géométrique grasse (~44px) « Model V4 » + nom de marque en rouge (~#d42a2a), légende grise 11px dessous ; à droite, prix géant de même graisse, symbole monétaire en gris.
- **Carrousel** : motos voisines plus petites et estompées, coupées aux bords gauche et droit ; pilule blanche centrée sous la moto avec flèches ← →.
- **Rangée bento** en bas : tuiles blanches (rayon ~8px, écart ~3px) — carte accessoire (texte, prix « $350.5 », pilule noire « Buy Now », image de casque), six tuiles caractéristiques (icône, valeur grasse « Petrol », petite étiquette « Fuel type »), carte couleur (texte, moto vue de face, colonne verticale de pastilles rouge / jaune / bleu / gris / noir, sélection cochée, « +$140.5 »).

## Non mesuré

- Il s'agit d'un **mockup Dribbble** : analyse visuelle des images uniquement, aucun site en ligne, aucun code inspecté.
- Toutes les valeurs (couleurs, tailles, rayons, écarts) sont **estimées à l'œil** et arrondies sur une échelle de 4px (sauf l'écart bento de 3px, conservé).
- La police n'est pas identifiée : Outfit et Inter sont **choisies à l'œil**.
- Aucune animation n'est visible sur des images fixes : le mouvement (`motion.md`) est une proposition.

## Écarts assumés

| Élément du shot | Dans le skill | Raison |
|---|---|---|
| Marque, monogramme, nom de modèle, textes | Marque fictive « Vantor Moto », monogramme V inventé, modèles « Ardente / Strale / Solare », textes en français | Marque et droits d'auteur |
| Photos / rendus de la moto, du casque | Dessins SVG stylisés recolorables (emplacements `data-slot`) | Droits d'auteur ; à remplacer par vos rendus détourés |
| Rouge de marque #d42a2a en petit texte (4:1 sur le gris) | Rouge réservé au grand titre (paire `:large`) ; `--accent-ink` #b81f1f pour le petit texte (5,1:1) | Contraste ≥ 4,5:1 |
| Légende grise claire 11px | `--muted` #5e5e5e (5,1:1 sur le cadre) | Lisibilité |
| Prix en dollars à décimale anglaise (« $ 32.000 », « $350.5 ») | Euros au format français (« 32 000 € », « 350,50 € ») | Contenu localisé |
| Pastilles de couleur ~24px | Zone cliquable 44×44px autour d'une pastille de 24px | Cible tactile |
| Composition figée sur une seule largeur | Versions tablette et mobile (bento en 2 colonnes, voisins masqués) | Adaptation |
