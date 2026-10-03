# Source — Acid Scan Security

- **Référence** : https://dribbble.com/shots/27776445-ThreatIQ-Next-Gen-Data-Security-Website (Subash Chandra)
- **Famille** : Tech / cybersécurité
- **Analysé le** : 2026-10-01 (première version) ; **2026-10-03, réécriture complète** : image du shot ouverte à pleine résolution (3200×2400) dans Chrome, couleurs **mesurées par lecture des pixels** (échantillonnage canvas zone par zone), tailles et positions relevées sur l'image ramenée à 1440px de large, polices pixel comparées côte à côte.
- **Ce qui plaît** : le portrait vert de vision nocturne, la bande et le cadre jaune sur l'œil, le titre pixel, les crochets autour du bouton.

## Ce que contient la référence

Le shot ne contient **qu'une image** : le héros d'une landing, en 4:3. Aucune autre image, aucune vidéo, aucun site en ligne trouvé. **Aucune animation n'est visible.**

## Mesures (pixels de l'image)

| Élément | Valeur mesurée |
|---|---|
| Vert dominant du fond | #189000 (couleur la plus fréquente) ; plus vif #2bab00 |
| Ombres (cheveux) | #000300 → #001800 |
| Frange rouge des cheveux | #301800 → #481800 |
| Titre lignes 1–2 | jusqu'à #f4ffcb (moyenne des lettres #d8ffa8) |
| Titre ligne 3 | #9de373 |
| Surtitre | #ffff2c (jaune) |
| Paragraphe | #c6ffa8 |
| Nav | #d2ffa9 |
| Bouton nav | fond moyen #5f8654, texte #fcfff0 |
| Carte CTA | haut #0a3e05, bas #002301 |
| Crochets | #afff78 |
| Intérieur du cadre jaune | jusqu'à #ffff4e (moyenne #839d19, l'œil reste visible) |
| Contraste texte pâle / vert vif | 3,6 à 3,9:1 |

## Positions et tailles (image ramenée à 1440px)

| Élément | Relevé (≈) |
|---|---|
| Barre de nav | 72px ; bouton ≈ 214 × 72px collé en haut à droite |
| Marge gauche (logo, surtitre, titre) | ≈ 78px |
| Paragraphe | gauche 68 %, haut 17,5 %, ≈ 383px de large, 4 lignes |
| Surtitre | haut ≈ 27 %, capitales pixel ≈ 23px de haut |
| Réticule | vertical 50 %, horizontal ≈ 36 % |
| Cadre de l'œil | ≈ 121 × 118px, moitié haute jaune |
| Bande des yeux | de ≈ 40 % à 74 % de la largeur, ≈ 6 % de la hauteur |
| Titre | 3 lignes, capitales ≈ 75px de haut, pas de ligne ≈ 93px |
| Carte CTA | ≈ 186px de côté, crochets ≈ 14px plus loin |

## Non mesuré / proposé

- **Toutes les animations** (`motion.md`) sont proposées : la référence est une image fixe. Elles prolongent ce que l'image évoque (scan, verrouillage, écran cathodique, données).
- **Les sections sous le héros** (mesures, plateforme, console, bandeau final) sont proposées.
- Les tailles sont déduites des proportions de l'image (pas de code lisible).
- La police du titre n'est pas identifiée ; VT323 retenue après comparaison avec Jersey 10, Silkscreen, Tiny5, Micro 5, Pixelify Sans et Doto.
- Le gain de performance cité dans `motion.md` (17 → 60 images/s) est mesuré dans un Chromium sans carte graphique : un vrai navigateur sera plus rapide dans les deux cas.

## Écarts assumés

| Élément du shot | Dans le skill | Raison |
|---|---|---|
| Nom ThreatIQ, logo, textes anglais | Marque fictive « Gridward », logo anneau, textes français | Identité et droits |
| Photo du shot | Photo Unsplash (licence Unsplash) recolorée, à remplacer par celle du projet | Droit à l'image |
| Texte pâle directement sur le vert vif (3,6–3,9:1) | Voiles `--veil` derrière le titre et le paragraphe (≥ 9:1) | Lisibilité |
| Bouton nav translucide | Translucide sur la photo, `--glass` opaque (5,9:1) une fois la page défilée | Contraste vérifiable |
| Une seule image | Page complète + version mobile | Rendre le skill utilisable |
| Interligne du titre très serré | 1 (au lieu de ≈ 0,87) | Les accents français se chevauchaient |
