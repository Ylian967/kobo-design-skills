# Acid Scan Security — images et 3D

> Les visuels font la moitié du style. **Jamais** de visage, de serveur ou d'objet dessiné en CSS, SVG ou canvas : ce sont de **vraies photos**, recolorées. Seuls les signes d'interface (réticule, cadre, crochets, cadenas, chiffres binaires) sont dessinés.

## 1. Ce que montre l'image de référence (relevé)

Un **portrait de femme aux longs cheveux sombres**, de face, regard caméra, tête un peu inclinée, qui remplit le centre de l'écran. La photo est passée en **vert monochrome** : fond très lumineux (vert vif `--mid`/`--hot`), cheveux presque noirs (`--void`), visage vert moyen ; une **frange rouge sombre** (`--ghost`) borde les zones sombres comme sur un vieux moniteur ; une **tranche horizontale plus claire et décalée** traverse les yeux ; des rangées de **0 et 1** minuscules couvrent l'image ; un **dégradé plus sombre** vers le bas.

| Emplacement (`data-slot`) | Sujet | Cadrage | Traitement |
|---|---|---|---|
| `portrait-scan` (héros) | une personne de face, regard caméra, cheveux sombres de préférence, **fond clair et simple** | portrait 7:8 ou 4:5, ≥ 1400px de large, les deux yeux bien visibles | 4 couches (base verte, frange, bande, cadre) — voir `components.md` §2 |
| cartes de section | matériel numérique : circuit, baies de serveurs, câbles réseau | 4:3 | rampe verte + lignes de balayage + décryptage en mosaïque |
| fiche d'identité | portrait de face | 3:4 | rampe verte + réticule |

**Pourquoi un fond clair** : la rampe donne du vert vif aux zones claires et du noir aux zones sombres. Fond clair + cheveux sombres = le contraste de la référence (silhouette sombre sur vert lumineux). Un fond sombre donne une image toute noire.

## 2. Où les trouver

1. **Les images du projet** : portrait d'une personne de l'équipe ou d'un modèle avec **autorisation écrite** de droit à l'image.
2. **Banques gratuites** : [Unsplash](https://unsplash.com) (licence Unsplash, usage commercial permis ; `images.unsplash.com` autorise le CORS, nécessaire pour le canvas). Mots-clés : « portrait looking at camera », « woman long dark hair portrait », « face front light background », « server rack », « circuit board », « ethernet cables ».
3. **Génération IA** — prompts de départ :
   - Portrait : > *portrait photo of a young woman with long dark wavy hair facing the camera, neutral expression, eyes level and clearly visible, soft even light, plain light grey background, sharp focus, 4:5, no text*
   - Matériel : > *close-up of a glowing printed circuit board in a dark room, strong lines, high contrast, 4:3, no text, no logo*
4. **À éviter** : profils (la bande et le cadre doivent tomber sur les yeux), lunettes de soleil, cheveux sur les yeux, fond sombre ou chargé, photos déjà très colorées en vert (on perd le contraste).

## 3. Réglages par photo

- `data-eye="x y"` : position de l'**œil gauche à l'écran** dans la photo source, en fractions (démo : `0.334 0.28`). Le script place la photo pour que cet œil tombe sur le croisement du réticule, juste au-dessus de la ligne.
- `data-scale` : hauteur de la photo / hauteur du héros (démo : `1.32`). Plus grand = visage plus gros.
- Mesurer `x y` : ouvrir la photo, relever la position de l'œil en pixels et diviser par la largeur / hauteur.

## 4. Traitements (code)

```js
// Rampe = liste de couleurs des tokens ; chaque pixel prend la couleur qui correspond à sa luminance.
const L = 0.3 * r + 0.59 * g + 0.11 * b;               // 0…255
const t = lut(RAMPS.duo);                              // table de 256 couleurs
out[i] = t[L * 3]; out[i + 1] = t[L * 3 + 1]; out[i + 2] = t[L * 3 + 2];
```
- Calcul **une seule fois** au chargement, dans 4 canvas (≈ 100ms pour une photo 1400px) ; le détail est dans `motion.md`.
- **Repli 1** (canvas refusé : image sans CORS) : filtre SVG `feColorMatrix` (niveaux de gris) + `feComponentTransfer` (tables `tableValues` remplies en JS depuis les tokens) sur les `<img>`.
- **Repli 2** (image absente) : fond radial `--hot → --mid → --deep` ; la page reste lisible.
- Les images des sections utilisent le même filtre SVG (elles ne bougent pas, donc pas de coût en continu).
- En production, on peut aussi livrer des images **déjà recolorées** (traitement côté serveur avec la même rampe) : plus simple, plus léger.

## 5. Intégration

- `crossorigin="anonymous"` **dans le HTML** sur toutes les copies de la photo du héros (une seule requête réseau partagée).
- `alt=""` sur les `<img>` du héros ; le conteneur `role="img"` porte un `aria-label` qui décrit la personne **et** le traitement. Les images de section ont un vrai `alt`.
- Poids : portrait JPEG/WebP 1400px ≤ 250 Ko ; cartes 900px ≤ 120 Ko, `loading="lazy" decoding="async"`.
- **React / Next** : faire le calcul de la rampe dans un `useEffect` après `onLoad`, ou servir l'image déjà recolorée.
- **React Native / Expo** : pas de lecture de pixels simple en natif → images **déjà recolorées** (au build ou côté serveur), affichées avec `expo-image` ; la frange et la bande deviennent 2 images supplémentaires empilées (`position: absolute`), la bande découpée par `MaskedView`.

## 6. 3D

Optionnelle et sobre : un **nuage de points** Three.js échantillonné sur la même photo (un point par pixel d'une version réduite, profondeur = luminance × 0,3, couleur = rampe verte) qui tourne de quelques degrés avec la souris. Repli : la photo en couches. Ne jamais remplacer le visage par une tête 3D générique.
