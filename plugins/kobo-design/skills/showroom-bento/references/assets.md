# Showroom Bento — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo, un personnage ou un objet : la moto, le casque et les vues de teinte sont de **vraies photos ou de vrais rendus**. Seuls le monogramme, les icônes des caractéristiques et les pastilles de couleur restent en SVG/CSS.

## 1. Ce que montrent les images

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `product-side` (carrousel, centre) | Le modèle affiché, en entier | **Idéal** : rendu détouré vu de profil strict, roues posées sur la ligne de l'ombre, ~60 % de la largeur du cadre. **À défaut** : photo studio 16:9, moto entière, trois-quarts avant, sujet centré | Studio : lumière douce enveloppante, reflets longs sur le carénage | Détouré : `drop-shadow` léger + ellipse `--shadow-floor`. Photo : cadre arrondi `--radius-frame`, `--shadow-pop` |
| voisins (`.side`, ×2) | Modèles précédent et suivant | Même cadrage que le centre (même angle, même échelle) | Idem | `opacity: .5`, `saturate(.55)`, `blur(1px)`, coupés par le cadre |
| `accessory-image` | Un accessoire seul : casque, gants, blouson | 6:7 vertical, objet centré, petit espace autour | Fond clair uni (blanc, gris très clair) | Photo recadrée `cover` sur `--soft`, survol `rotate(-4deg) scale(1.04)` |
| `product-paint` (tuile couleur) | Le modèle dans la teinte choisie | 3:2, même angle pour toutes les teintes | Identique pour toutes les teintes | Une image par teinte, fondu enchaîné |

**Règle de cohérence** : toutes les vues produit partagent le même angle, la même focale, la même lumière et la même hauteur d'horizon ; on doit pouvoir passer d'un modèle ou d'une teinte à l'autre sans que la moto « saute ». Fonds neutres (gris, blanc, noir studio) : jamais de décor qui concurrence la couleur du carénage.

## 2. Où les trouver

1. **Les images du projet** : rendus constructeur (CGI) détourés par teinte, packshots studio, photos d'accessoires sur fond blanc. Toujours en priorité ; demander un **jeu complet par teinte** au même angle.
2. **Banques gratuites** : [Unsplash](https://unsplash.com), [Pexels](https://www.pexels.com). Mots-clés :
   - FR : « moto sportive studio », « moto de profil fond uni », « casque intégral fond blanc », « moto rouge fond sombre ».
   - EN : « sport motorcycle studio », « motorcycle side view isolated », « superbike dark studio », « full face helmet white background », « motorcycle gloves product shot ».
   - Les photos de banque sont rarement de profil strict : les présenter dans un cadre arrondi plutôt que de les détourer à la main.
3. **Génération IA** (Midjourney, Flux, Firefly…) — prompts de départ :
   - Moto : > *studio product render of a modern sport motorcycle in strict side profile, glossy red fairing, black wheels, soft overhead softbox lighting with long reflections, seamless light grey background, centered, wheels on the ground plane, 16:9, photorealistic, no brand logos, no text*
   - Teintes : même prompt en remplaçant *glossy red* par *solar yellow*, *track blue*, *titanium grey*, *matte black* (même seed pour garder l'angle).
   - Casque : > *product photo of a full-face motorcycle helmet, white shell, iridescent visor, three-quarter front view, plain off-white background, soft shadow, centered, no logos*
4. **À éviter** : photos d'action floues ou en virage, motos encombrées de décor (parking, rue) quand on peut avoir du studio, angles différents d'un modèle à l'autre, logos de constructeurs visibles, détourages approximatifs (halo blanc), les rendus du shot de référence.

## 3. Traitements (code)

```css
/* A. Rendu détouré (production) : posé sur l'ombre */
.bike img { display: block; width: 100%; height: auto; filter: drop-shadow(0 18px 14px color-mix(in srgb, var(--ink) 18%, transparent)); }
.floor { position: absolute; left: 50%; bottom: -18px; width: 96%; height: 46px; translate: -50% 0; background: var(--shadow-floor); }

/* B. Photo non détourée (démo) : cadre studio arrondi */
.bike { aspect-ratio: 16 / 9; overflow: hidden; border-radius: var(--radius-frame); background: var(--paint-black); box-shadow: var(--shadow-pop); }
.bike img, .side img, .visual img { width: 100%; height: 100%; object-fit: cover; }

/* Voisins estompés */
.side { aspect-ratio: 16 / 9; overflow: hidden; border-radius: var(--radius-frame); background: var(--paint-black);
  opacity: .5; filter: saturate(.55) blur(1px); }

/* Teinte : une image par teinte, empilées, fondu enchaîné */
.paint-stack { display: grid; }
.paint-stack img { grid-area: 1 / 1; opacity: 0; transition: opacity var(--dur-base) var(--ease-inout); }
.paint-stack img.is-active { opacity: 1; }
```

La démo n'a qu'une photo rouge : elle simule les autres teintes par `filter: hue-rotate()` sur la tuile couleur (`.visual[data-paint="yellow"] img { filter: hue-rotate(48deg) … }`). C'est un raccourci de maquette : il recolore aussi le fond et les reflets ; en production, une image par teinte.

## 4. Intégration

- `<img>` avec `width`/`height` (ou `aspect-ratio` sur le cadre), `alt` qui nomme le modèle et décrit la vue (« Ardente : moto sportive rouge en studio, vue de trois-quarts ») ; mis à jour à chaque changement de modèle. Voisins : `alt=""` (le bouton porte « Modèle précédent / suivant »).
- `fetchpriority="high"` sur la photo centrale, `loading="lazy"` ailleurs ; précharger la photo du modèle suivant (`new Image().src = …`) pour un carrousel sans trou.
- Formats : rendus détourés en **WebP/AVIF avec transparence** (pas de PNG de 3 Mo), 1600px de large au plus ; photo centrale ≤ 250 Ko.
- Repli : chaque cadre a un `background` token (`--paint-black` pour le produit, `--soft` pour l'accessoire) et garde ses proportions : la vitrine ne bouge pas si une image manque.
- **React Native / Expo** : `expo-image` (`contentFit="contain"` pour un rendu détouré, `"cover"` pour une photo, `placeholder` blurhash, `transition={300}` pour le fondu de teinte) ; carrousel en `FlatList` horizontale `pagingEnabled`, image suivante préchargée par `Image.prefetch`.

## 5. 3D

Optionnelle, et précise : un **configurateur à 360°** à la place de la photo centrale, quand le constructeur fournit un modèle. Three.js (`GLTFLoader` + `DRACOLoader`, `.glb` ≤ 4 Mo) ou React Three Fiber + drei (`useGLTF`, `<Environment preset="studio" />`, `<ContactShadows>` qui remplace l'ellipse `--shadow-floor`, `<PresentationControls>` limité à la rotation horizontale). Le matériau du carénage (`MeshPhysicalMaterial`, `clearcoat: 1`) prend sa couleur dans les tokens `--paint-*` au clic sur une pastille : c'est le seul cas où la teinte se calcule au lieu d'être photographiée. Caméra fixe en profil au repos, fond transparent sur le cadre studio. Modèles libres pour maquetter : [Sketchfab](https://sketchfab.com/search?features=downloadable&licenses=7c23a1ba438d4306920229c12afcb5f9&q=motorcycle) (filtre CC, chercher « motorcycle », « helmet »), [Poly Pizza](https://poly.pizza) (CC0/CC-BY) ; vérifier la licence et créditer si CC-BY. React Native : `expo-gl` + `@react-three/fiber/native`. Repli : la photo de profil, et une suite de 36 vues pré-rendues si l'appareil est faible ou si `prefers-reduced-motion` est actif.
