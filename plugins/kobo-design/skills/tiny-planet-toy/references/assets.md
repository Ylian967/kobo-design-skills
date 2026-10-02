# Tiny Planet Toy — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une maison, un arbre, un paysage ou un personnage : le cœur du style est une **vraie petite planète en 3D** (Three.js), low-poly et toute ronde, qu'on fait tourner au glisser. Ce qui reste en CSS : le fond turquoise, les poussières, le logo en lettres-blocs, le bouton relief, le HUD et les bulles.

## 1. Ce que montrent les images

Ce style n'a **pas besoin de photo**. Les « images » sont des rendus 3D.

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `planet` (écran-titre) | Petite planète low-poly : herbe, deux chemins de pierre qui en font le tour, maisons à toit rouge, arbres ronds et coniques, rochers | Carré 1:1, planète centrée à ~75 % du cadre, halo turquoise foncé autour | Soleil doux en haut à gauche, ombres en 3 tons (cel), pas de noir | 3D : `MeshToonMaterial` + dégradé 3 paliers, couleurs des tokens |
| `planet` (exploration) | La même, zoomée ×1,6 | Planète qui déborde du cadre | Idem | Zoom caméra, pas de mise à l'échelle CSS du canvas |
| Repli sans WebGL | **Capture du rendu** de la planète (PNG/WebP transparent exportée depuis la scène) | Carré 1:1, mêmes proportions que le canvas | Idem | Aucun ; tant qu'elle n'existe pas, un disque aux couleurs `--grass`/`--stone` avec halo `--bg-deep` |
| Personnages, objets à livrer (exploration) | Petits modèles low-poly (facteur, lettres, boîte aux lettres) | Posés sur la surface, « haut » = normale de la sphère | Idem | Même matière toon |

**Règle de cohérence** : tout est **low-poly, poudré et en 3 tons** — couleurs des tokens uniquement (`--grass`, `--stone`, `--paper`, `--roof`, `--accent`), facettes visibles (géométrie non indexée), aucune texture photo, aucun noir ni blanc pur, aucun effet réaliste (pas de reflets métal, pas de bloom fort).

## 2. Où les trouver

1. **Les modèles du projet** (`.glb` faits dans Blender / MagicaVoxel) : toujours en priorité.
2. **Modèles libres low-poly** (vérifier la licence, créditer si CC-BY) :
   - [Kenney](https://kenney.nl/assets) — « Nature Kit », « City Kit (Suburban) », « Holiday Kit » (CC0).
   - [Quaternius](https://quaternius.com) — « Ultimate Nature », « Medieval Village », personnages animés (CC0).
   - [Poly Pizza](https://poly.pizza) — recherche « low poly house », « low poly tree », « planet » (CC0/CC-BY).
   - [Sketchfab](https://sketchfab.com/search?features=downloadable&licenses=7c23a1ba438d4306920229c12afcb5f9) filtre CC — « tiny planet low poly ».
   - Mots-clés : FR « petite planète low poly », « village miniature 3D », « diorama » ; EN « tiny planet », « low poly village », « isometric diorama », « cozy 3D ».
3. **Génération IA** (rendu fixe de repli, affiche, vignette de partage) :
   - Écran-titre : > A tiny round low-poly planet floating in a soft turquoise void, covered with little cream houses with red roofs, round and conical trees, two stone paths wrapping around the sphere, flat cel shading in three tones, soft top-left light, powdery pastel palette, toy diorama, centered, no text, no characters.
   - Exploration : > Close-up of the same tiny low-poly planet surface, a small postman character delivering letters between cozy houses, curved horizon, cel shaded, pastel turquoise sky, toy-like, no text.
4. **À éviter** : textures photo plaquées sur la sphère, planètes réalistes (Terre vue de l'espace), styles voxel « Minecraft » trop carrés, couleurs saturées criardes, le monde, le logo ou les personnages du site de référence.

## 3. Traitements (code)

```css
/* Conteneur de la planète : le canvas au-dessus du repli */
.planet { position: relative; width: min(84vw, 520px); aspect-ratio: 1; touch-action: none; cursor: grab; }
.planet:active { cursor: grabbing; }
.planet canvas { position: absolute; inset: 0; z-index: 1; }
/* Repli : capture du rendu, sinon disque aux couleurs des tokens */
.planet__fallback { position: absolute; inset: 12%; border-radius: 50%; background: radial-gradient(circle at 38% 32%, var(--stone), var(--grass) 70%);
  box-shadow: 0 0 0 18px var(--bg-deep), inset -20px -30px 0 var(--sky-shadow); transition: opacity var(--dur) var(--ease); }
.planet__fallback img { width: 100%; height: 100%; object-fit: contain; }
.planet.is-3d-ready .planet__fallback { opacity: 0; }
/* Logo par-dessus : ne bloque pas le glisser */
.logo { pointer-events: none; }
```

## 4. Intégration

- Le canvas est décoratif (`aria-hidden="true"`) ; l'action principale reste le bouton HTML « Commencer ». Indiquer le geste en texte (« Glisser pour tourner »).
- Repli : une `<img>` du rendu (`alt` « Petite planète couverte de maisons et d'arbres », `width`/`height`, `fetchpriority="high"`) dans `.planet__fallback`, ou le disque token ; il s'efface quand la scène ajoute `is-3d-ready`.
- Poids : modèles `.glb` low-poly ≤ 1 Mo (Meshopt), une seule matière toon partagée par couleur, objets répétés en `InstancedMesh`.
- **React Native / Expo** : `expo-gl` + `@react-three/fiber/native` (même scène, glisser via `PanResponder` ou `react-native-gesture-handler`) ; repli `expo-image` de la capture du rendu (`contentFit="contain"`, `transition={300}`).

## 5. 3D — recette complète

- **Quoi** : une sphère low-poly (`IcosahedronGeometry(1, 3)` légèrement bosselée par une fonction de la position), **deux chemins** (tores fins qui épousent la sphère, inclinés différemment), **maisons** (boîte `--paper` + toit pyramidal `ConeGeometry(…, 4)` `--roof`), **arbres** (tronc + boule ou cône `--grass` assombri), **rochers** (`DodecahedronGeometry` `--stone`), placés sur des points de Fibonacci de la sphère, hors des chemins, orientés par `quaternion.setFromUnitVectors(Y, normale)`. Un halo : sphère `BackSide` `--bg-deep` derrière la planète.
- **Matières** : `MeshToonMaterial({ color, gradientMap })` avec un `DataTexture` de 3 paliers (`RedFormat`, filtres `NearestFilter`) ; facettes obtenues par `geometry.toNonIndexed()` + `computeVertexNormals()` (le toon n'a pas d'option `flatShading`) ; couleurs lues dans les tokens hex via `getComputedStyle` (pas `--speck` ni `--sky-shadow`, en `rgb()` à espaces).
- **Lumière** : `HemisphereLight(--paper, --bg-deep, 1.6)` + `DirectionalLight(--paper, 2.2)` en haut à gauche ; pas d'environnement réfléchissant (rendu mat).
- **Caméra** : `PerspectiveCamera` 30°, distance 5, planète centrée ; au clic sur « Commencer », zoom caméra 1 → 1,6 (900ms, `--ease`) au lieu d'un `scale` CSS (qui flouterait le canvas).
- **Interaction** : **glisser pour tourner** (Pointer Events, `setPointerCapture`), rotation autour des axes écran (`rotateOnWorldAxis`), inertie amortie (×0,92 par image), rotation automatique lente (un tour en `--spin`, 60s) quand on ne touche pas ; léger rebond d'apparition (scale 0,8 → 1, `--ease-bounce`).
- **Web (React)** : React Three Fiber + drei : `<PresentationControls>` ou `<OrbitControls enableZoom={false} enablePan={false}>`, `<Instances>` pour les arbres, `useGLTF` pour des modèles Kenney/Quaternius.
- **React Native** : `expo-gl` + `@react-three/fiber/native` + `@react-three/drei/native`.
- **Mouvement réduit** : pas de rotation automatique, pas d'inertie ni de rebond, zoom instantané ; le glisser reste possible (geste volontaire), rendu à la demande.
- **Repli** : si WebGL est absent ou si le module ne charge pas, la capture du rendu (ou le disque token) reste affichée ; le bouton et le texte fonctionnent pareil.
