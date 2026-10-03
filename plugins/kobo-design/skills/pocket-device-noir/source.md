# Source — Pocket Device Noir

- **Référence** : https://dribbble.com/shots/27771993-Noda-AI-Companion-Website-Design (« Noda — AI Companion Website Design », par Lil Dicky pour Odama)
- **Famille** : Produit tech / objet connecté
- **Analysé le** : 2026-10-01 (première version, à l'œil) ; **2026-10-03, réécriture complète** : les **neuf** images du shot téléchargées en pleine résolution, la vidéo lue image par image (8 images), couleurs **lues au pixel**, tailles et positions mesurées sur la page entière.
- **Ce qui plaît** : l'objet noir dans une lumière chaude, le nom géant derrière lui, la sobriété de l'interface.

## Ce que contient la référence

- **Neuf images fixes** : huit mises en scène d'écrans (2400 × 1800) et la **page d'accueil entière** (1600 × 7276, soit une page de 1440px à l'échelle 1 dans un cadre de 80px).
- **Une vidéo** de 2,4 s (800 × 600) : un **diaporama** des mêmes écrans, en coupes franches. Elle ne montre aucune animation d'interface.
- Aucun site en ligne.

**Aucune animation n'est visible** : tout le mouvement décrit dans `motion.md` est proposé par le skill.

## Sections de la page

Héros (bureau, main tenant l'objet, titre, deux boutons, carte d'offre) · manifeste sur rayons · produit (nom géant, objet de face, roches, prix, bouton) · « pourquoi » (5 vignettes) · « en vedette » (panneau de verre + photo) · intérieur (objet éclaté, carte, points, graduation rouge) · témoignages · appel final sur mur doré · pied texturé.

## Mesures (page de 1440px)

| Élément | Valeur |
|---|---|
| Page | 1440px, marges de 80px ; cadre #eeeeee |
| Fonds | #000000 ; intérieur #040404 à #0b0b0b ; pied #101010 à #141414 |
| Titre du héros | capitales de 80px de haut ; « Meet CUE. » de 462 à 980px (518px de large) |
| Boutons | « Get CUE. » 146 × 40px ; « Shop Now » 106 × 37px ; blancs #fcfcfc |
| Carte d'offre / panneau de verre | #282828 à #303030 une fois composés |
| Manifeste | 3 lignes de 47px au pas de 52px ; rouge #fc383c |
| Nom géant | 224px de haut ; gris #0c0c0c en bas, plus clair en haut |
| Étiquette | 118 × 32px ; fond #181818 à #202020 ; texte ≈ #8c8c8c |
| Titres de section | lignes de 38px au pas de 50px |
| Vignettes | 5 sur 1064px (≈ 206px chacune) ; 202px de haut, celle du centre 282px |
| Carte de témoignage | 327 × 250px ; fond #181818 |
| Appel final | titre : lignes de 37 et 47px au pas de 52px |
| Hauteurs | héros ≈ 920px ; page 7146px |

## Lu à l'œil (non mesuré au pixel)

- Rayons (≈ 6 et 8px), tailles du texte courant (≈ 17px) et du petit texte (≈ 14px).
- Contours en tirets, pointillés, halo des boutons.
- Gris des paragraphes (≈ #b4b4b4), dégradé du nom géant.
- Détails de l'objet (proportions, molette, touches, grille).

## Police

Néo-grotesque serrée, **non identifiée** ; Inter Tight est choisie à l'œil. L'écran de l'objet utilise une police à segments ; JetBrains Mono la remplace.

## Proposé par le skill

- **Toutes les animations** et tous les états.
- **L'objet en 3D** (construit en formes simples) à la place des photos du produit, et son écran vivant.
- `--tag-text` (#c8c8c8 au lieu de ≈ #8c8c8c), `--red-text`, `--soft`, `--glass`, les voiles.
- Les trois « fonctions » du panneau en vedette (la maquette en montre une), les textes des vignettes.
- Les autres pages et **toute la version mobile**.
- Les images par seconde de `motion.md`, mesurées dans un Chrome sans carte graphique.

## Écarts assumés

| Maquette | Dans le skill | Raison |
|---|---|---|
| Marque « Noda », produit « CUE A01 », textes anglais | Produit fictif « Ora P1 », textes français | Identité |
| Photos du produit tenu en main | Photos d'ambiance Unsplash **sans** le produit + objet 3D par-dessus | Aucune photo libre de ce produit ; c'est l'écart le plus visible |
| Objet au rendu photoréaliste | Modèle 3D simple (formes de base, matériaux mats) | Légèreté ; un vrai modèle `.glb` le remplace |
| Vue intérieure éclatée | Objet de trois quarts, non éclaté | Pas de modèle des composants |
| Roches autour de l'objet | Photo de pierre fondue derrière l'objet | Pas de roches détourées libres |
| Texte des étiquettes ≈ #8c8c8c sur #1c1c1c | #c8c8c8 | Contraste |
| Portraits et noms des témoignages | Personnes fictives, portraits Unsplash | Identité |
| Prix en dollars | Euros | Langue |
| Une seule largeur | Tailles en `clamp()`, version mobile | Rendre le skill utilisable |
