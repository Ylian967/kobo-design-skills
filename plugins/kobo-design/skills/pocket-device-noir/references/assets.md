# Pocket Device Noir — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo ou l'objet : l'objet est une **vraie scène 3D** (ou un vrai rendu / une vraie photo produit), et les ambiances sont de **vraies photos** chaudes.

Le style repose sur un contraste : **objet froid et noir** (3D, matière mate, une touche de rouge) contre **photos chaudes** (bois, café, lampe, tissu orange, roche). L'interface autour reste noire, en verre fumé et en mono.

## 1. Ce que montrent les images

| Emplacement (`data-slot` / `data-3d`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `hero-desk-photo` | Bureau en bois avec tasse de café, clavier ou carnet, **sans** l'objet (il est ajouté en 3D) | Plein écran 3:2, plateau dans la moitié basse, zone calme au centre pour l'objet | Lumière de lampe ou de fin de journée, chaude | `--grade-warm` (assombri, réchauffé) + voile haut pour la barre + `--fade-bottom` jusqu'au noir |
| `data-3d="hero"` | L'objet posé sur le bureau | Centré, 48 % de la hauteur du héros | Même lampe chaude que la photo | Scène Three.js transparente au-dessus de la photo, ombre douce au sol |
| `data-3d="reveal"` | L'objet seul, devant son nom géant | 460×560px, centré | Lampe chaude + liseré froid | Scène Three.js interactive ; repli = photo de roche noire |
| `feature-rock` | **Texture** : roche noire fracturée, ardoise, basalte | Tuile haute 2:3 | Rasante, contrastée | Photo nette, voile noir en bas sous le panneau de verre |
| `feature-fabric` | **Texture** : tissu orange (canapé, laine, feutre), flou | Tuile carrée | Douce, chaude | Photo naturelle, voile noir en bas |
| `cta-lifestyle` + `data-3d="cta"` | Intérieur chaleureux (table en bois, chaise, tasse) + l'objet en 3D à droite | Tuile large 21:9, sujet à droite | Lumière du jour chaude | `--grade-warm` + fondu en dégradé noir depuis la gauche (texte lisible) |

**Règle de cohérence** : toutes les photos sont **chaudes et matières** (bois, céramique, tissu, pierre), jamais de studio blanc ni de tech froide ; l'objet est le seul élément noir et net de l'image.

## 2. Où les trouver

1. **Les images du projet** : rendus produit (Keyshot, Blender) et photos de mise en situation de l'objet réel ; le modèle `.glb` de l'objet pour la 3D.
2. **Banques gratuites** : [Unsplash](https://unsplash.com) et [Pexels](https://www.pexels.com) (licences gratuites, usage commercial permis ; créditer le photographe est apprécié). Mots-clés qui marchent :
   - EN : « wooden desk coffee warm light », « cozy desk lamp evening », « black rock texture », « basalt close up », « orange fabric sofa », « wool texture orange », « wooden table chair minimal interior ».
   - FR : « bureau bois café », « table en bois lumière chaude », « texture roche noire », « tissu orange », « intérieur chaleureux minimal ».
3. **Génération IA** (Midjourney, Flux, DALL·E, Firefly…) — prompts de départ :
   - Héros (sans l'objet, ajouté ensuite en 3D) :
     > Warm editorial photograph of an empty light oak desk at golden hour, a ceramic coffee cup and a closed notebook on the sides, empty space in the center of the desk, soft lamp glow from the upper right, dark wall behind, shallow depth of field, 35mm lens, film grain, no device, no text, no logo
   - Texture roche :
     > Macro photograph of fractured black basalt rock, matte surface, raking light from the left, deep shadows, high detail, square crop, no text
   - Mise en situation (avec l'objet du projet en rendu) :
     > Product lifestyle shot of a small matte black handheld device with a round metal dial and a red top button, lying on a warm wooden table next to a coffee cup, late afternoon sunlight, shallow depth of field, 50mm lens, no text, no logo
4. **À éviter** : studio blanc, néons bleus ou violets « IA », mains manucurées de stock, écrans de smartphone, mises en scène high-tech froides, et tout rendu ou photo du shot de référence.

## 3. Traitements (code)

```css
/* Tokens (dans :root) */
--grade-warm: brightness(0.62) saturate(1.1) sepia(0.18) contrast(1.06);
--fade-bottom: linear-gradient(180deg, rgb(0 0 0 / 0) 35%, rgb(0 0 0 / 0.75) 72%, #000000 100%);

/* Conteneur photo générique : couleur de repli token */
.shot { position: absolute; inset: 0; overflow: hidden; }
.shot img { width: 100%; height: 100%; object-fit: cover; color: transparent; }

/* Héros : photo chaude assombrie qui fond au noir */
.desk { background: var(--wall); }
.desk img { object-position: 50% 70%; filter: var(--grade-warm); }
.desk::before { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, color-mix(in srgb, var(--bg) 55%, transparent), transparent 30%); }
.desk::after  { content: ""; position: absolute; inset: 0; background: var(--fade-bottom); }

/* Tuiles texture : voile bas pour le panneau de verre */
.tile .shot::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 45%, color-mix(in srgb, var(--bg) 70%, transparent)); }

/* Appel final : fondu en dégradé depuis la gauche */
.cta__box { background: var(--wood-dark); isolation: isolate; }
.cta__box .shot { z-index: -1; }
.cta__box .shot::after { content: ""; position: absolute; inset: 0; background: linear-gradient(100deg, var(--bg) 25%, color-mix(in srgb, var(--bg) 40%, transparent) 60%, transparent); }

/* Scène 3D et repli */
[data-3d] { position: relative; }
[data-3d] canvas { position: absolute; inset: 0; display: block; }
[data-3d] .fallback { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; background: var(--rock); transition: opacity var(--dur-slow) var(--ease-out); }
[data-3d].is-3d-ready .fallback { opacity: 0; }
```

## 4. Intégration

- `<img>` avec `width`/`height`, `alt` qui décrit la photo en français, `loading="lazy"` partout sauf la photo du héros (`fetchpriority="high"`). Le conteneur 3D principal porte `role="img"` et un `aria-label` qui décrit l'objet ; le `<canvas>` est `aria-hidden`.
- Formats : AVIF/WebP via `<picture>` ou un CDN d'images (`w=2000` pour le héros, `w=1200` pour une tuile haute, `w=800` pour une tuile carrée) ; héros ≤ 300 Ko.
- Couleur de repli : `--wall`, `--rock`, `--fabric-dark`, `--wood-dark` sur chaque conteneur ; le texte blanc reste lisible si l'image ne charge pas.
- **React Native / Expo** : `expo-image` (`contentFit="cover"`, `placeholder={{ blurhash }}`, `transition={300}`) ; fondu = `expo-linear-gradient` ; pas de `filter` CSS en natif : pré-étalonner les photos (chaud, assombri).

## 5. 3D — l'objet (recette complète)

L'objet est **la** pièce 3D du style : il apparaît dans le héros (posé sur le bureau), dans la révélation (seul devant son nom géant, interactif) et dans l'appel final (incliné à droite). Un seul objet en scène par écran.

- **Quoi** : boîtier de poche 9 × 12,6 (proportions), épaisseur ≈ 0,28 de la largeur, coins très arrondis ; petit écran rectangulaire en haut ; 4 trous de micro ; grande **molette circulaire** à crans en bas ; **bouton rouge** sur la tranche supérieure.
- **Géométrie (sans modèle)** : `RoundedBoxGeometry(1.8, 2.52, 0.5, 8, 0.24)` pour le boîtier ; écran = `PlaneGeometry` avec **texture canvas** (`CanvasTexture`) redessinée ~20 fois/s : heure en `--font-mono`, onde de 20 barres, voyant rouge qui pulse, état (« À L'ÉCOUTE… » / « EN VEILLE ») ; molette = `CylinderGeometry` + 60 crans (`BoxGeometry`) + capuchon central + repère blanc ; bouton = `RoundedBoxGeometry(0.56, 0.16, 0.24, 4, 0.06)`.
- **Matières** (couleurs lues dans les tokens via `getComputedStyle`) :
  - boîtier noir **mat** : `MeshPhysicalMaterial` `--device`, rugosité 0,62, métal 0,15, vernis 0,25 (rugosité du vernis 0,7) ;
  - molette **métal** : `--metal`, métal 1, rugosité 0,32 ; capuchon `--device` métal 0,6 ;
  - écran : `MeshBasicMaterial` (`toneMapped: false`) sur la texture, cadre `--dial` très vernis ;
  - bouton : `--red`, rugosité 0,35, vernis 0,8.
- **Lumière** : `RoomEnvironment` (intensité 0,55) pour les reflets, lumière directionnelle chaude `--lamp` en haut à droite (comme la lampe des photos), liseré froid `--text` à l'arrière gauche, ambiance très faible ; tone mapping ACES, sortie sRGB.
- **Caméra** : `PerspectiveCamera` 30° (38° si le cadre est plus haut que large) ; héros légèrement en plongée (y 2,2, distance 8,4), révélation de face (distance 7,2).
- **Ombre** : plan au sol avec texture canvas en dégradé radial `--bg` → transparent (pas de shadow map : plus léger, plus doux).
- **Interaction** : rotation douce automatique (± 0,18 rad, 0,4 rad/s) + suivi du pointeur (± 0,9 rad en Y, ± 0,45 en X, lissage 6 %/image) ; **la molette tourne** de 40° au survol ; flottement de ± 0,1 unité (≈ 10px à l’écran) dans la révélation et l'appel final, avec l'ombre qui se resserre ; clic sur l'objet ou sur « Mettre en veille » = le bouton rouge s'enfonce et l'écran passe en veille. Rendu suspendu hors écran (`IntersectionObserver`).
- **Modèle du projet** : remplacer `makeDevice()` par le `.glb` de l'objet (`GLTFLoader` + `DRACOLoader` ou Meshopt, ≤ 2 Mo), garder l'écran en `CanvasTexture` appliquée au matériau de l'écran. Modèles libres pour prototyper : [Poly Pizza](https://poly.pizza) (CC0/CC-BY), [Sketchfab](https://sketchfab.com/search?features=downloadable&licenses=7c23a1ba438d4306920229c12afcb5f9) (filtre CC), en vérifiant la licence et en créditant si CC-BY.
- **Web** : Three.js r170 (importmap jsDelivr, `three/addons/geometries/RoundedBoxGeometry.js`, `three/addons/environments/RoomEnvironment.js`), voir le module en bas de `examples/demo.html`. React : React Three Fiber + drei (`<RoundedBox>`, `<Environment preset="apartment">`, `<Float>`, `<ContactShadows>`, texture d'écran via `useMemo(() => new CanvasTexture(canvas))`).
- **React Native** : `expo-gl` + `@react-three/fiber/native` + `@react-three/drei/native` (mêmes géométries), ou une **image pré-rendue** (PNG transparent) si l'appareil est faible ; écran via `expo-2d-context` ou texture précalculée.
- **Repli** : si WebGL est absent ou si le module ne charge pas, l'image `.fallback` (ou la photo de fond) reste visible ; avec `prefers-reduced-motion`, la scène est rendue une fois, sans rotation ni flottement, et redessinée toutes les 30 s pour l'heure.
