# Tiny Planet Toy — images, 3D et pictogrammes

## Ce que montre la référence

Un monde **entièrement modélisé et peint à la main** : une planète couverte de maisons, d'arbres, de routes ; des rues en volume, des personnages, des contours d'encre, des aplats sans dégradé. Aucune photo.

## Ce que fait le skill

Ce style **n'utilise pas de photo** : son sujet est un monde en volume. La démo construit une planète **générique** dans Three.js, à partir de formes simples, pour montrer le rendu sans rien reprendre du jeu.

| Élément | Construction |
|---|---|
| Sol | Icosaèdre subdivisé, `--green-light` |
| Maison | Cube étiré + pyramide à quatre pans |
| Arbre | Cylindre + icosaèdre à facettes |
| Eau | Calotte de sphère à peine au-dessus du sol |
| Phare | Quatre tronçons de cylindre alternés, lanterne, cône |
| Bateau | Trois boîtes |
| Contour | Copie de chaque volume, agrandie de 14 %, faces arrière en `--ink` |

Tout est placé par un tirage au hasard **à graine fixe** : la planète est la même à chaque visite. Les couleurs sont lues dans les variables CSS, jamais écrites dans le script.

### Recette du rendu

- `MeshToonMaterial` avec une rampe de **trois valeurs** (texture de 3 × 1, filtrage « au plus proche ») : ombre, demi-teinte, lumière.
- Une lumière d'ambiance forte et une seule lumière directionnelle ; pas d'ombres portées.
- Contour par **coque inversée** : pas de post-traitement.
- Géométries fusionnées par couleur (`mergeGeometries`) : une dizaine d'appels de dessin.

### Remplacer la planète de la démo

Un vrai projet fournira son propre modèle (glTF). Conserver : le canvas limité à la planète, le rendu à la demande, les matériaux à paliers, le contour d'encre. Un modèle détaillé gagne à être **cuit en image** si la planète ne doit pas tourner.

## Si le projet a quand même des photos

Elles n'entrent pas dans l'écran-titre. Plus bas dans la page, les présenter comme des **vignettes à contour d'encre** et ombre décalée, de petite taille, jamais en fond.

## Pictogrammes

Très peu : une enveloppe au trait (chargement), un triangle plein (réplique suivante), des flèches typographiques. Trait de 1.5 à 1.6, couleur `--ink`.

## Polices

- **Rubik Mono One** : lettres-blocs du logo, titres de section. Sur le site, les lettres du logo sont des objets 3D dessinés, pas une police.
- **Silkscreen** 400, 700 : étiquettes, boutons, touches, mentions.
- **Patrick Hand** : dialogues (en capitales) et texte courant.

Toutes trois sont des équivalents libres choisis à l'œil.

## Interdits

- Pas de photo ni de vidéo dans l'écran-titre.
- Pas de dégradé lisse, de reflet ni d'ombre floue sur la planète.
- Pas de planète dessinée en CSS : sans WebGL, un simple disque à contour sert de repli, rien de plus.
- Pas de canvas plein écran.
