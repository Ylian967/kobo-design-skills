# Lore Frame Editorial — images et 3D

> Les images font la moitié du style. **Jamais** de dessin CSS/SVG à la place d'un personnage, d'un lieu ou d'un objet. Seuls le cadre, l'étoile-réticule, le rideau de barres, la règle graduée et le logo restent en SVG/CSS : ce sont des **signes**, pas des représentations.

## 1. Ce que montrent les images (relevé sur la référence)

La référence est un **univers illustré à la main** : peinture numérique au pinceau visible, style « concept art » de jeu, couleurs **saturées et lumineuses** (pas du tout nocturnes). Deux familles d'images :

| Famille | Sujets | Couleurs | Usage |
|---|---|---|---|
| **Portraits de personnages** | Buste, regard caméra ou trois quarts, accessoires tech (prothèse, implant, masque fantôme), coiffures fortes | Fond uni pastel (lavande, rose, vert de gris), personnage très coloré, contour blanc net | Ouverture, planches-portraits, éventail de la collection, galerie, fiche d'équipe |
| **Panoramas du monde** | Cité flottante, tours lumineuses, vaisseaux, falaises, ciel de nuages au couchant, montagne enneigée, cratère vu d'en haut | Couchant orange-rose, violet, lavande, rayons lumineux ; un personnage minuscule en silhouette donne l'échelle | Chapitres plein cadre, sections HUD, planches paysage |
| **Objets** | Cristal, artefact, gros plan d'œil | Isolés sur blanc ou très cadrés | Fiche objet à règle, planche « fenêtre » |

Emplacements (`data-slot`) du skill :

| Emplacement | Sujet | Ratio | Traitement |
|---|---|---|---|
| `opening` | Portrait d'un personnage, visage au centre-droit | plein cadre | aucun filtre ; voile noir 30 % en haut à gauche pour l'intro |
| `world-small` | Silhouette sur une falaise dans la brume | 16:9, ≈ 230px | planche `folder-b` |
| `character` | Portrait sur fond uni | 1:1 → 3:4 | planche `folder-a` |
| `tower` | Grande tour / ville verticale | 3:4 vertical | planche `folder-c` |
| `sky`, `mountain` | Ciel de nuages au couchant, montagne | plein cadre, défile en parallaxe | grille HUD par-dessus |
| `crystal` | Objet détouré | 1:2 | sur blanc, avec règle |
| `eye` | Gros plan d'œil | 16:9 | planche simple coins 10px |
| `fan-01…11` | Portraits variés, fonds unis différents | 3:4 | éventail |
| `chapter-*` | Panoramas du monde | plein cadre | voile noir en bas pour la légende |

**Règle de cohérence** : couleurs vives et lumineuses, une **dominante lavande/violet** sur l'ensemble (le fond de la collection est `--lavender`), des touches **rose, orange de couchant et vert néon**. Pas de photo de stock grise, pas de nuit noire uniforme.

## 2. Où les trouver

1. **L'art du projet** (illustrateur, concept art du jeu ou de la licence) : toujours en priorité. Commander les emplacements ci-dessus avec ces cadrages ; demander des portraits sur **fond uni** (indispensable pour l'éventail).
2. **Banques gratuites** (photos, en attendant l'art) : [Unsplash](https://unsplash.com) (licence Unsplash, usage commercial permis). Choisir des photos **colorées** : portrait éclairé par des néons de couleur, montagne sous ciel violet, nuages au couchant, ville futuriste, cristal d'améthyste, macro d'œil. Mots-clés : « neon portrait », « colorful light portrait », « purple mountains », « golden hour clouds », « sci-fi city », « amethyst », « eye close up ».
3. **Génération IA** — prompts de départ (ajouter le ratio voulu) :
   - Portrait : > painterly digital illustration, bust portrait of a young cyberpunk guardian with a glowing teal spirit mask floating behind, bold hair shape, flat lavender background, crisp white rim outline, concept art for a game, vibrant colors, visible brush strokes, no text, no logo
   - Panorama : > painterly concept art matte painting, floating city with tall luminous towers and bridges above clouds at sunset, pink and violet sky, light rays, tiny silhouette of a character on a cliff in the foreground, visible brush strokes, no text, no logo
   - Objet : > painterly illustration of a single elongated violet crystal, isolated on pure white, soft shading, concept art prop sheet, no text
4. **À éviter** : images reconnaissables d'une licence existante, photos ternes, fonds blancs derrière les portraits de l'éventail (le fond uni coloré fait la carte), images au format imposé qui coupent les visages.

## 3. Traitements (code)

```css
/* Planche : la forme vient du clipPath SVG (components.md §6), la couleur de fond sert de repli */
.planche { background: var(--lavender); }
.planche img { width: 100%; height: 100%; object-fit: cover; display: block; }

/* Chapitre : voile pour la légende centrée */
.chapter__art::after { content: ""; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(180deg, transparent 45%, rgb(0 0 0 / .55)); }

/* Galerie : arrivée délavée puis couleur */
.grid img { filter: saturate(0) brightness(1.25); opacity: .6; transition: filter .6s, opacity .6s; }
.grid img.is-loaded { filter: none; opacity: 1; }
```

## 4. Intégration

- `<img>` avec `width`/`height`, `alt` qui décrit la scène, `loading="lazy"` sauf l'ouverture (`fetchpriority="high"`).
- `object-position` pour garder le visage dans la planche quand le ratio change.
- Chaque planche a une **couleur de repli** (`--lavender`, `--panel`) : la page reste lisible si l'image ne charge pas.
- **React Native / Expo** : `expo-image` ; forme de dossier = `MaskedView` + `react-native-svg` (même chemin en unités relatives).

## 5. 3D et WebGL

La référence rend ses planches dans **un seul canvas WebGL** pour pouvoir les **plier** au défilement. Le skill obtient l'essentiel en CSS (`motion.md` §6). Pour aller plus loin :
- **Plans pliés** : une `PlaneGeometry` subdivisée par image (Three.js), texture = l'image, vertex shader qui courbe le plan selon la vitesse de défilement (`position.z += sin(uv.y * PI) * uVelocity * .002`), masque de dossier en texture alpha.
- **Nuage de points** (section HUD) : `THREE.Points` sur une grille de 120×60 déformée par un bruit, points blancs de 1,5px, rotation lente.
- **Repli** : les `<img>` restent dans le DOM sous le canvas ; si WebGL manque ou si le mouvement est réduit, on n'affiche que les images.
