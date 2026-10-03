# Source — Chrome Atelier

- **Site de référence** : https://dribbble.com/shots/27491195-Website-Design-for-Avant-Garde-Jewelry-Product (Shakuro)
- **Famille** : Luxe / bijou produit 3D
- **Vidéo du shot** : 1600×1200, 15,7s (seconde pièce jointe du shot)
- **Site en ligne de la marque** : https://www.eargrillz.com/ (concept du shot mis en production)
- **Analysé le** : 2026-10-01, Chrome (images) ; 2026-10-03, vidéo image par image + site en ligne (Chrome 1536×730, styles calculés)

## Ce qui a été vu

- **Page produit (claire)** : fond blanc cassé (~#f2f2f0), filets gris fins en diagonale et en croix passant par le centre, grand cercle fin autour du produit ; bijou d'oreille sculptural en chrome et or, rendu 3D, centré.
- **Bloc texte à gauche** : minuscule étiquette entre crochets (« [ … ] »), titre en grotesque capitale sur deux lignes décalées (la seconde indentée), trois lignes de texte courant en petit corps.
- **Légendes** : traits reliant la pièce à de petites étiquettes « • YELLOW GOLD », « WHITE GOLD » ; en bas au centre, la liste des titres d'or « 10K, 14K, 18K, 22K ».
- **Navigation** : logo-mot géométrique à gauche ; à droite, petits liens en capitales et pilule à contour « JOIN WAITLIST ».
- **Héros sombre** : photo bleu-gris très foncée, gros plan d'un portrait portant la pièce chromée ; titre en escalier sur quatre lignes ; pilule à contour ; barre de caractéristiques en bas, trois colonnes séparées par des filets (petite étiquette + valeur : épaisseur, prix, volume) ; cercles-guides fins sur la photo.
- **Autres écrans** : carte de confirmation de liste d'attente blanche sur fond sombre, rangée de logos presse, section communauté avec panneau blanc qui chevauche une photo sombre.

## Pages explorées (2026-10-03)

« Mesuré » = valeur lue dans le navigateur ; « observé » = relevé à l'œil (≈).

### Mesures brutes (site en ligne, accueil, 1536px, 7 129px de haut)

- **Polices chargées** : Suisse Int'l 300/400/700, Suisse Mono 400. Racine `html` 13.84px (= 0.9vw), corps 0.75rem.
- **Tailles** (en rem) : 0.75/1.39 (texte, ×2000), 0.625 (nav, libellés), 1.15 (valeurs de la barre), 1.25, 1.5/1.0 −0.01em (titres de section), 2/1.1 (titre du héros). Capitales ×838. Étiquettes mono 0.75rem −0.108em.
- **Couleurs** : texte #3f464a (dominant), #10191e (titres), #fff, #b3b3b3, #cacbcc ; fonds #fff, #000201 (pied), noir 20 % (barre), blanc 4 % (pilule secondaire), #e0e0e0.
- **Contours** : 0.8px blanc (pilules sur photo), 0.8px blanc 16 % (barre), 0.8px #10191e (pilule nav). Rayons : pilules uniquement.
- **Transitions** : all 0.3s ease, transform 0.45s ease, background-color 0.3s ease, stroke-dashoffset 0.1s linear ; animation `floatY` 3s ease-in-out.
- **Flou** : `backdrop-filter: blur(4px)` ×2. **Bibliothèques** : GSAP, Swiper ; 8 vidéos, 0 canvas.
- **Points de rupture** : 991px, 767px, 479px (Webflow).

### Pages et écrans

| Source | Relevé |
|---|---|
| Site — héros | Mesuré : titre 2rem/1.1 400 blanc 4 lignes ; pilules 40px contour 0.8px ; barre 62px. Observé : logo centré, nav empilée à droite, cercles-guides sur la photo. |
| Site — atelier | Mesuré : étiquette `[…]` mono, titre 1.5rem 400 #10191e. Observé : section épinglée, pièce or jaune en vidéo, cercle, axes, légende « • YELLOW GOLD », « 10K, 14K, 18K, 22K ». |
| Site — presse, galerie, FAQ, pied | Mesuré : textes 0.75rem #3f464a, pied #000201 285px. Observé (texte) : 8 articles de presse, galerie, 11 questions. Captures bloquées au-delà de 2 900px (navigateur), complétées par la vidéo. |
| Vidéo du shot | Observé : intro au compas (cercles qui se croisent, nœuds, étiquette), presse avec cartes d'article révélées au-dessus des logos, galerie en deux colonnes décalées avec courbe de compas, écran liste d'attente (carte blanche sur nuit), confirmation mobile, cellules de la barre qui montent en cartes photo, pièce cuivrée/or rose tournante. |

## Non mesuré

- Il s'agit d'un **mockup Dribbble** : analyse visuelle des images uniquement, aucun site en ligne, aucun code inspecté.
- Toutes les valeurs (couleurs, tailles, espacements, rayons) sont **estimées à l'œil** et arrondies sur une échelle de 4px.
- Polices identifiées sur le site : Suisse Int'l et Suisse Mono (payantes) → Inter et IBM Plex Mono.
- Mouvement : durées mesurées sur le site (0.3s, 0.45s, 3s) ; séquences (intro, barre → cartes, presse) observées dans la vidéo, durées estimées. Le reste de `motion.md` (orbite du cercle, montée des titres) reste une proposition.
- Mobile du site non relevé (seulement l'écran de confirmation mobile de la vidéo).

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
| Suisse Int'l / Suisse Mono (payantes) | Inter 400 / IBM Plex Mono | Licence |
| Pièce en vidéo sur le site | Scène Three.js ou vidéo détourée du projet | Les deux sont permises par le skill |
| Libellés #b3b3b3 sur photo nuit | `--faint` gardé sur nuit seulement, jamais sur clair | Contraste |
| Articles de presse réels (médias, auteurs) | Médias et textes inventés | Marques et droits d'auteur |
