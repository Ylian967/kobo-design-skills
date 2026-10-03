# Pocket Device Noir — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer l'objet ou une photo. L'objet est une **photo de produit** ou un **modèle 3D** ; les ambiances sont des photos. Seuls les signes restent en CSS / SVG : logo, pictogramme, flèches, rayons, graduation, points d'intérêt.

Sur la maquette, toutes les images montrent **le produit lui-même**, tenu en main ou posé, dans une lumière chaude. Un vrai projet a ces images ; la démo, qui n'a pas de produit, le remplace par un modèle 3D posé sur des photos d'ambiance.

## 1. Ce que montrent les images

| Emplacement | Sujet | Cadrage | Lumière |
|---|---|---|---|
| `hero` | Un bureau en bois vu de près : carnet, stylo, tasse, bord d'un ordinateur ; idéalement **une main qui tient l'objet** au centre | Paysage 3:2, 2000px ; centre dégagé (objet et titre), bas sombre | Soleil rasant, ombres longues, tons bois |
| Produit | L'objet de face sur fond noir, deux **roches sombres** de part et d'autre | Détouré ou sur noir | Lumière douce venue du haut |
| Vignettes « pourquoi » | L'objet dans cinq situations : en main, sur un fauteuil, sur le bureau, dans une poche, près d'un téléphone | Portrait 3:4, 500px | Chaude ; une teinte dominante par vignette |
| En vedette | L'objet en main au-dessus d'une table (café, carnet, ordinateur) | Paysage 8:5, 2000px ; la moitié gauche sera floutée sous le panneau | Soleil à travers un feuillage |
| Intérieur | L'objet de trois quarts, éclaté (coque, carte, composants) | Sur noir texturé | Froide, précise |
| Témoignages | Portraits serrés (64px) et photos de l'objet chez des gens | Carré ; 5:6 | Naturelle |
| Appel final | L'objet tenu devant un mur où tombe l'ombre d'une fenêtre | Paysage 8:5 | Dorée |
| Pied, intérieur | Pierre noire, texture | Paysage | Désaturée, à 35–40 % d'opacité |

**Cohérence** : bois, cuir, tissu orange, pierre noire. Pas de bleu, pas de néon, pas de fond blanc.

## 2. Où les trouver

1. **Les photos du produit** : un shooting d'une journée (en main, sur bureau, en poche) et des rendus 3D de l'objet seul. Toujours en priorité.
2. **Banques libres** pour les ambiances : [Unsplash](https://unsplash.com), [Pexels](https://www.pexels.com). Recherches utiles : `wooden desk coffee notebook sunlight`, `desk warm light shadow laptop`, `window shadow wall warm`, `black rock dark texture`, `orange fabric sofa sunlight`, `hands notebook writing desk warm`.
3. **Génération** — prompts de départ :
   > Product lifestyle photo, a hand holding a small matte black pocket voice recorder with a round dial and a tiny LCD screen, red button on top, over a wooden desk with a notebook, pen and coffee cup, warm low sunlight with long shadows, shallow depth of field, 3:2

   > Studio product render, matte black pocket device with a round metal-rimmed dial, small monochrome LCD showing a waveform, two soft keys and a speaker grille, front view, between two dark slate rocks, black background, soft top light
4. **À éviter** : photos froides ou bleutées, bureaux blancs, produits d'une marque existante, fonds de studio clairs.

## 3. L'objet en 3D

La démo construit l'objet avec Three.js, à partir de formes simples :

| Pièce | Forme | Matière |
|---|---|---|
| Boîtier | Boîte arrondie 2 × 3.6 × 0.44, rayon 0.2 | Phong `--device`, reflet `--device-edge` |
| Écran | Cadre arrondi 1.66 × 0.92 + plan texturé | Texture dessinée dans un canvas 2D (heure, état, forme d'onde) |
| Molette | Cylindre clair (rayon 0.66) + capuchon sombre (0.6) + point central | `--dial-ring`, `--dial`, `--lcd` |
| Touches | Deux boîtes arrondies 0.74 × 0.36 | Phong `--device` |
| Grille | Plan texturé (4 rangées de 11 trous) | Canvas 2D |
| Bouton | Boîte arrondie rouge sur la tranche du haut | Phong `--red` |

Éclairage : une lumière d'ambiance, une directionnelle chaude en haut à gauche, un contre-jour froid. Pas d'ombres portées, pas d'environnement. Les couleurs sont lues dans les tokens (`getComputedStyle`).

Avec un **vrai modèle** (`.glb`) : le charger avec `GLTFLoader` à la place de `makeDevice()`, garder le même montage (une pose par emplacement, rendu à la demande, 30 images/s au plus, arrêt hors écran). Sans WebGL : afficher une photo détourée du produit au même endroit.

## 4. Traitements

```css
/* Photo du héros : fondue au noir vers le bas, assombrie en haut pour la barre */
.hero::after { background: linear-gradient(180deg, var(--veil-1), var(--veil-0) 18%, var(--veil-0) 40%, var(--veil-1) 70%, var(--veil-2) 98%); }
/* Panneau de verre posé sur la photo */
.glass { background: var(--glass); backdrop-filter: blur(var(--blur)); }
/* Roches : photo désaturée, fondue par un masque radial */
.rock { opacity: .55; mask: radial-gradient(ellipse 50% 50% at 50% 50%, #000 30%, transparent 72%); }
```

- Aucun filtre de couleur sur les photos chaudes ; les textures de pierre sont désaturées par le serveur d'images (`sat=-100`).
- Tailles : 2000px pour les photos plein cadre, 500px pour les vignettes, 130px pour les portraits (`fit=facearea`).
- `fetchpriority="high"` pour le héros, `loading="lazy"` ailleurs.

## 5. Photos de la démo (Unsplash, licence libre)

Héros : `photo-1606242403192-c40d308b704d`. Vignettes : `1688296524530-a916565cf7dc`, `1556970181-98e37c414e87`, `1645821522738-551e9d46d1e6`, `1671104695361-8b16c458b552`, `1623697899813-60dc464abeef`. En vedette : `1557928082-c17dbf42a70f`, `1679387552459-9a1f2a9bcced`, `1671154453575-b0cea38bb19a`. Appel final : `1631832612525-98ba50f35189`. Pierre : `1701105040869-40cb9a5bbe6c`, `1595026677025-0eff2b5b3a16`. À remplacer par les images du projet.
