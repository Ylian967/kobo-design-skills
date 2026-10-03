# Source — Signal Orange Techwear

- **Référence** : https://dribbble.com/shots/27776418-CyberRonin-TechWear-website-concept (« CyberRonin — TechWear website concept », par Dawid Tomczyk)
- **Famille** : Mode / techwear cyberpunk
- **Analysé le** : 2026-10-01 (première version, à l'œil) ; **2026-10-03, réécriture complète** : les cinq images téléchargées en pleine résolution, couleurs **lues au pixel**, tailles et positions mesurées sur le héros.
- **Ce qui plaît** : le titre empilé qui change de registre à chaque ligne, les panneaux d'instrument à filet fin, l'orange seul sur le noir.

> L'adresse du shot a été retenue à partir d'une recherche (trois shots « Cyber Ronin » existent) : elle n'a pas été confirmée par l'utilisateur.

## Ce que contient la référence

Cinq **images fixes**, aucune vidéo, aucun site en ligne :

1. Planche d'ensemble (2580 × 1925) : les quatre écrans réunis.
2. Écran 1 — héros « RONIN-X // SHADOW NIGHTFALL » (1800 × 1200).
3. Écran 2 — « EVERY LAYER. // A PURPOSE. » : trois fiches « System ».
4. Écran 4 — fiche produit sur fond gris : « RONIN-X // CR-01 SNEAKERS ».
5. Écran 3 — « BUILD YOUR OWN UNIFORM » : onglets et trois fiches produit.

Dans les images 2 à 5, chaque écran est **à l'échelle 1** : 1440 × 852px. **Aucune animation n'est visible** : tout le mouvement de `motion.md` est proposé.

## Mesuré (lecture des pixels, écran 1)

| Élément | Valeur |
|---|---|
| Orange | #e05c1a (10 587 points relevés sur le titre) ; onglet plein #cd561b |
| Fond d'écran | #141515 sous la photo ; zones sombres #08090a à #0e0e0f |
| Panneau | #0f0d0c à #191412 une fois composé ; filet ≈ #484445, soit du blanc à 20 % |
| Écran | 1440 × 852px ; marges de 40px ; ligne du logo à 39px du haut |
| Titre | capitales de 48px de haut, lignes au pas de ≈ 68px ; « RONIN-X » large de 405px |
| Colonne de panneaux | 310px ; panneau produit ≈ 155px de haut, tableau ≈ 280px |
| Tableau | lignes au pas de 43px |
| Navigation | trait sous le lien actif : 54 × 2px ; compteur du sac : rond de 28px |
| Ronds sociaux | 36px |
| Écran gris (image 4) | gris moyen #888889 à #a2a1a3, texte blanc |
| Fiches (images 3 et 5) | #0d0d0f à #141310, halo orange jusqu'à #26120a |

## Lu à l'œil (non mesuré)

- Tailles des textes courants, des étiquettes et des boutons ; espacement des lettres.
- Dimensions de la pilule « 01/04 », des fiches système, des onglets et des fiches produit.
- Épaisseur du contour des lettres creuses.

## Polices

Deux caractères **non identifiés** : une grotesque très étendue et grasse pour les titres, un caractère technique à angles arrondis pour tout le reste. Unbounded et Orbitron sont choisies à l'œil.

## Proposé par le skill

- **Toutes les animations** et tous les états : changement de silhouette par la pilule, décodage des valeurs, interrupteur « Profondeur » (la maquette n'en montre que le libellé), filtre, ajout au sac, survols.
- L'enchaînement des quatre écrans sur **une seule page** (la maquette montre des écrans séparés).
- `--on-orange`, `--orange-deep`, `--fog`, `--fog-panel`, `--muted`, les voiles.
- Toute la version mobile et les autres pages (`layouts.md`).
- Les images par seconde de `motion.md`, mesurées dans un Chrome sans carte graphique, à 1440px seulement.

## Écarts assumés

| Maquette | Dans le skill | Raison |
|---|---|---|
| Marque « CyberRonin », produits « RONIN-X », « CR-01 », textes anglais | Marque fictive « Noctunit », « Kage-X », « NX-01 », textes français | Identité |
| Images de synthèse noires et orange (armure, crâne, chaussure) | Photos Unsplash : une en couleur à lumière orange pour le héros, les autres en noir et blanc | Droits ; garder la palette avec de vraies photos |
| Chaussure « CR-01 » | Sac « NX-01 » | Les photos libres de chaussures noires et orange portent toutes une marque visible |
| Texte blanc sur onglet et bouton orange (3,3:1) | Texte sombre `--on-orange` (5,3:1) | Contraste |
| Écran de fiche gris moyen à texte blanc | Gris clair `--fog` à texte sombre ; orange foncé pour le grand titre | Contraste |
| Lettres creuses transparentes | Intérieur rempli de `--bg` | La police libre choisie montre ses tracés internes en contour seul |
| Navigation répétée sur chaque écran | Une seule barre fixe, qui prend un fond sombre au défilement | Une seule page |
| Fiche produit répétée sur l'écran 2 | Devise seule à droite | Éviter le doublon sur une même page |
| Une seule largeur | Tailles en `clamp()`, versions tablette et mobile | Rendre le skill utilisable |

## Limites connues de la démo

- Les photos ne portent pas d'orange hors du héros : l'effet « pièces orange sur noir » de la maquette n'est pas reproduit.
- Une inscription reste lisible sur le sweat de la photo de l'écran 3.
- Les looks 2 à 4 du héros sont en noir et blanc : seul le premier a la lumière orange.
