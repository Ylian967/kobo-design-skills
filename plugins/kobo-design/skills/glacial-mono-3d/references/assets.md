# Glacial Mono 3D — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo, un objet ou un paysage : ici le visuel principal est une **vraie scène 3D temps réel** (Three.js), doublée de **vraies photos de glace** en repli. Ce qui reste en CSS : la neige décorative, les crochets de coin, le chargeur ASCII, les voiles.

## 1. Ce que montrent les images

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `hero-3d` (scène, chapitre 1 « Arrivée ») | Amas d'**éclats de glace / cristaux** en verre posés sur une plaine de neige, dans le brouillard | Plein écran, objet au centre, horizon au tiers bas, beaucoup de vide autour | Jour blanc couvert, lumière froide rasante, brouillard dense | 3D : verre transmissif, brouillard `--fog` ; repli photo : N&B + voile `--scrim-light` |
| Chapitre 2 « Nuit » | Rocher sombre en suspension, quelques éclats en orbite | Plein écran, objet centré, caméra plus basse | Nuit d'acier, contre-jour froid | 3D : fond et brouillard `--night` ; repli photo : N&B assombri + voile `--scrim-dark` |
| Chapitre 3 « Socle » | Objet en particules qui flotte au-dessus d'un socle métallique à anneaux | Plongée légère, socle coupé par le bas | Brouillard clair, reflets métal | 3D : points `--steel`, métal `--frost` ; repli photo : banquise N&B |
| Photo de repli (sous le canvas) | Iceberg isolé, front de glacier, banquise | Plein écran 16:9 → 9:16, sujet au centre | Gris, ciel pâle | `grayscale(1)`, contraste réduit, voile token |

**Règle de cohérence** : **monochrome strict** — tout est gris-bleu (tokens `--fog`, `--frost`, `--steel`, `--night`) ; aucune photo ne garde sa couleur d'origine (le bleu glacier est désaturé), aucune lumière colorée dans la scène.

## 2. Où les trouver

1. **Les modèles et rendus du projet** (logo en `.glb`, objets produits, rendus de la scène) : toujours en priorité.
2. **Photos de repli** : [Unsplash](https://unsplash.com), [Pexels](https://www.pexels.com) (usage commercial permis).
   - FR : « iceberg brume », « front de glacier », « banquise ciel pâle », « cristaux de glace macro », « plaine enneigée brouillard ».
   - EN : « iceberg fog », « glacier wall », « sea ice pale sky », « ice crystal macro », « snowfield fog minimal ».
3. **Génération IA** — prompts de départ (rendus fixes de repli ou d'affiche) :
   - Arrivée : > Minimal monochrome 3D render, a cluster of translucent ice crystal shards standing on a flat snowfield, dense grey-blue fog, soft overcast cold light, glass refraction and subtle caustics, lots of negative space, centered composition, desaturated steel palette, no text.
   - Nuit : > Dark floating basalt rock suspended in a steel-blue night void, a few small ice shards orbiting it, cold rim light, volumetric fog, monochrome, cinematic, no text.
   - Socle : > A logo made of thousands of tiny grey particles hovering above a polished metal pedestal with concentric rings, light foggy background, monochrome, product visualization, no text.
4. **À éviter** : ciels bleu vif, aurores boréales colorées, ours polaires et pingouins, glace « néon » cyan, modèles ou mascotte du site de référence, textures de glace en clip-art.

## 3. Traitements (code)

```css
/* Scène : canvas au-dessus des photos de repli, couleur de repli = token */
.scene { position: fixed; inset: 0; overflow: hidden; background: var(--fog); }
.scene canvas { position: absolute; inset: 0; z-index: 1; }
.fallback { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
  filter: grayscale(1) contrast(.85) brightness(1.08); opacity: 0; transition: opacity var(--dur-scene) var(--ease); }
body[data-ch="1"] .fallback[data-for="1"], body[data-ch="2"] .fallback[data-for="2"], body[data-ch="3"] .fallback[data-for="3"] { opacity: 1; }
.fallback[data-for="2"] { filter: grayscale(1) brightness(.45) contrast(1.1); }   /* nuit */
/* Voile de lisibilité (encre acier sur clair, texte clair sur sombre) */
.scene__veil { position: absolute; inset: 0; background: var(--scrim-light); transition: background var(--dur-scene) var(--ease); }
body[data-ch="2"] .scene__veil { background: var(--scrim-dark); }
/* Quand la 3D est prête : photos et voile s'effacent */
.scene.is-3d-ready .fallback[data-for], .scene.is-3d-ready .scene__veil { opacity: 0; }
```

## 4. Intégration

- Le canvas est décoratif (`aria-hidden="true"`) : le contenu réel est dans l'interface HTML et le panneau.
- Photos de repli : `<img class="fallback">` dans la scène, `alt` descriptif en français, `fetchpriority="high"` pour celle du chapitre 1, `loading="lazy"` pour les autres, `width`/`height` renseignés.
- Couleur de repli : `background: var(--fog)` sur `.scene` ; l'interface reste lisible sur le token seul.
- Poids : modèles `.glb` compressés (Draco ou Meshopt) ≤ 2 Mo au total, textures KTX2 ; chargeur ASCII pendant le chargement réel (`LoadingManager.onProgress`).
- **React Native / Expo** : `expo-gl` + `@react-three/fiber/native` (scène allégée : 6 éclats, pas de transmission → `MeshStandardMaterial` translucide `opacity: .6`), ou vidéo pré-rendue en boucle (`expo-video`, muette) ; photo de repli en `expo-image` (`contentFit="cover"`, `transition={300}`) avec un `View` voile au token.

## 5. 3D — recette complète

- **Quoi** : trois « chapitres » le long d'un travelling de caméra piloté par le défilement.
  1. Amas de 10–14 **éclats de glace** (bipyramides `OctahedronGeometry` étirées en hauteur + blocs `IcosahedronGeometry`) autour d'un grand cristal central, sur un disque de neige ; une vingtaine de petits fragments qui flottent dans le brouillard.
  2. **Rocher sombre** (`DodecahedronGeometry` déformée par une fonction de la position, `flatShading`) avec 5 éclats en orbite lente.
  3. **Socle** de 4 anneaux métalliques concentriques + objet en **particules** (`Points` tirés sur la surface d'un octaèdre) qui se reforme à l'arrivée sur le chapitre.
- **Matières** :
  - Glace : `MeshPhysicalMaterial({ color: --frost, transmission: 1, thickness: 1.2, roughness: .08, ior: 1.31, attenuationColor: --fog, attenuationDistance: 2.5, clearcoat: 1, flatShading: true })`.
  - Neige : `MeshStandardMaterial({ color: --frost, roughness: 1 })`.
  - Rocher : `MeshStandardMaterial({ color: --steel, roughness: .85, flatShading: true })`.
  - Socle : `MeshPhysicalMaterial({ color: --frost, metalness: 1, roughness: .25 })` ; particules : `PointsMaterial({ color: --steel, size: .03 })`.
  - Toutes les couleurs sont lues dans les tokens hex avec `getComputedStyle` (pas `--glow`, en `rgb()` à espaces, que `THREE.Color` ne lit pas).
- **Lumière** : `RoomEnvironment` (PMREM) pour les reflets, `HemisphereLight(--frost, --steel, 1.2)`, une `DirectionalLight(--text, 2.5)` rasante depuis la gauche, tone mapping ACES. Fond et brouillard (`THREE.Fog`) interpolés entre `--fog` → `--night` → `--frost` selon le chapitre (le verre transmissif a besoin d'un `scene.background` opaque).
- **Caméra** : `PerspectiveCamera` 35° (50° en portrait), trois positions clés ; la progression de défilement est lissée (plateau sur chaque chapitre, `smoothstep` entre deux) et la caméra suit avec un lerp de 0,06 par image.
- **Interaction** : **parallaxe au pointeur** (±0,5 unité sur la caméra), rotation lente des éclats et des particules ; pas de clic sur la scène.
- **Modèles libres** : [Poly Pizza](https://poly.pizza) (rochers, cristaux, CC0/CC-BY), [Kenney](https://kenney.nl/assets) (CC0), [Quaternius](https://quaternius.com) (CC0), [Sketchfab](https://sketchfab.com/search?features=downloadable&licenses=7c23a1ba438d4306920229c12afcb5f9) (filtre CC). Vérifier la licence, créditer si CC-BY.
- **Web (React)** : React Three Fiber + drei : `<MeshTransmissionMaterial>` pour la glace, `<ScrollControls>` + `useScroll()` pour la caméra, `<Environment preset="city">`, `<Float>` pour les fragments, `<Sparkles>` pour la neige ; bloom léger via `@react-three/postprocessing`.
- **React Native** : `expo-gl` + `@react-three/fiber/native` + `@react-three/drei/native`, matières simplifiées (voir §4), ou vidéo pré-rendue.
- **Mouvement réduit** : coupes franches entre chapitres (caméra placée sans travelling), pas de rotation ni de reformation des particules, rendu à la demande.
- **Repli** : photos N&B par chapitre sous le canvas (classe `no-webgl` si WebGL est absent, ou si le module ne charge pas) ; elles s'effacent quand la scène ajoute `is-3d-ready`.
