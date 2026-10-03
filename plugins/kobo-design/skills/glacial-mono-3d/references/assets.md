# Glacial Mono 3D — images et 3D

> Ici, **la 3D est le visuel**. Jamais de glace, de montagne ou d'objet dessiné en CSS ou SVG : une **vraie scène 3D** (Three.js), ou à défaut de **vraies photos**. Restent en HTML / SVG, parce que ce sont des signes : le logotype, les crochets, la constellation numérotée, les traits de rappel, les étiquettes, les pavés de la transition.

## 1. Ce que montre le site de référence (captures du 2026-10-03)

| Scène | Ce qu'on voit | Couleurs lues |
|---|---|---|
| Accueil | un dôme de blocs de glace sur un relief enneigé ; les blocs s'écartent et laissent voir un cœur lumineux ; brume, flocons | ciel `#9398a4`, brume `#b7bbc6`, blocs `#474e5c`, ombres `#383e54`, lueur `#e5f1f6` |
| Transition | l'image se casse en pavés, avec des franges arc-en-ciel | — |
| Projet | un cube de glace translucide contenant un signe, surface martelée, arêtes cassées ; texte géant flou derrière | fond `#717885` à `#8d929f`, glace `#657081` |
| Fin (passe précédente) | socle lumineux, sculpture en particules | — |

Tout est **monochrome gris-bleu** ; la seule couleur vient des franges de la transition.

## 2. Construire la scène

| Élément | Géométrie | Matière |
|---|---|---|
| Cristaux, blocs de glace | octaèdres étirés, icosaèdres, boîtes biseautées | `MeshPhongMaterial` clair `--frost`, reflet blanc, à facettes, opacité 0,86 |
| Roche, bloc sombre | dodécaèdre subdivisé puis déformé | `MeshPhongMaterial` `--steel`, à facettes |
| Sol | disque large | `MeshLambertMaterial` `--frost` |
| Socle | cylindres empilés | `MeshPhongMaterial` clair brillant |
| Sculpture | 1 800 points sur la surface d'une forme | `PointsMaterial` `--steel` |
| Fil de fer, réseau | `EdgesGeometry`, segments | `LineBasicMaterial` `--text` transparent |
| Atmosphère | `scene.fog` de la couleur du fond | — |

Toutes les couleurs sont lues dans les tokens (`getComputedStyle`). Pour un projet réel : remplacer l'amas par le **modèle `.glb`** de l'objet de la marque, garder le brouillard, les traits et la caméra.

**Fidélité contre fluidité** : le site utilise des matières réalistes (réfraction, textures de neige, post-traitement). La démo s'en tient à des matières simples pour tourner partout ; sur une machine avec carte graphique, on peut réactiver `MeshPhysicalMaterial` (transmission) pour la glace et une carte d'environnement.

## 3. Photos de repli

Si WebGL manque, une photo par scène, traitée en gris :

```css
.fallback { filter: grayscale(1) contrast(.85) brightness(1.08); }          /* scènes claires */
.fallback[data-for="2"] { filter: grayscale(1) brightness(.45) contrast(1.1); }   /* scène de nuit */
```
Sujets : iceberg isolé, front de glacier, banquise sous ciel pâle. Source : [Unsplash](https://unsplash.com) (« iceberg », « glacier black and white », « snow fog minimal »). Prompts IA : > *lone iceberg in grey fog, monochrome blue-grey, minimal, soft light, 16:9, no text*.

**À éviter** : photos colorées, ciels bleus, glace turquoise saturée, personnages.

## 4. Intégration

- Canvas `aria-hidden="true"` ; le sens de la page est porté par l'interface HTML.
- `alt` descriptif sur les photos de repli.
- **React** : `@react-three/fiber` avec `frameloop="demand"` et `invalidate()` au défilement ; interface en composants HTML par-dessus.
- **React Native / Expo** : `expo-gl` + three, ou une vidéo pré-rendue par scène et l'interface en vues natives.
