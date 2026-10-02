# Nocturne Architecture — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo, un bâtiment, une ville ou un intérieur : on utilise de vraies photos d'architecture (ou des rendus 3D d'archi photoréalistes) et, au besoin, une vraie scène 3D.

Ici l'image **est** l'ambiance : une ville ou une maison **la nuit**, bleutée, avec quelques fenêtres chaudes et des traînées de phares. L'interface reste noire, blanche et rouge ; le bleu et l'ambre n'existent que dans les photos.

## 1. Ce que montrent les images

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `hero-night-city` | Ville la nuit en **pose longue** : tours éclairées, autoroute ou avenue avec traînées rouges et ambrées | Plein écran (16:9 sur ordinateur, recadré au centre en 9:16 sur mobile) ; ligne d'horizon au tiers bas, ciel dégagé en haut pour la barre, zone calme en bas pour le mot-marque | Heure bleue ou nuit, ciel bleu marine, fenêtres ambrées, aucune lumière blanche dure | `--grade-night` + voile `--shade-hero` (noir en haut et en bas) + zoom très lent |
| `studio-photo` | Maison d'architecte aux baies vitrées allumées | 3:2 ou 4:3, bâtiment entier, légère contre-plongée | Crépuscule, intérieur chaud, ciel bleu profond | `--grade-night` + teinte nuit |
| `project-1` … `project-n` | Une résidence par carte : villa, tour, maison sur la côte, intérieur | **4:5** vertical, sujet centré dans le tiers haut, bas assez sombre pour le nom en blanc | Nuit ou crépuscule ; un intérieur de jour est accepté s'il passe dans la teinte nuit | `--grade-night` + teinte nuit + voile bas `--shade-card` |
| `process-1` … `process-4` | Étapes : terrain au crépuscule, maquette ou séjour, chantier ou tour de nuit, maison livrée éclairée | **4:3** horizontal | Même famille que les cartes | `--grade-night` + teinte nuit |

**Règle de cohérence** : toutes les photos sont **nocturnes et froides** (bleu marine dominant, seules les fenêtres et les phares sont chauds) ; jamais de ciel bleu de midi, de verdure saturée ou de personnes souriantes au premier plan.

## 2. Où les trouver

1. **Les images du projet** : photos d'architecte et rendus 3D du programme (ils existent presque toujours). Demander les versions « nuit » ou « heure bleue ».
2. **Banques gratuites** : [Unsplash](https://unsplash.com) et [Pexels](https://www.pexels.com) (licences gratuites, usage commercial permis ; créditer le photographe est apprécié). Mots-clés qui marchent :
   - EN : « city night long exposure », « light trails skyline », « modern house night », « architecture blue hour », « villa pool dusk », « concrete house lit windows », « luxury interior night ».
   - FR : « ville nuit pose longue », « traînées lumineuses », « maison d'architecte nuit », « villa crépuscule », « heure bleue architecture ».
3. **Génération IA** (Midjourney, Flux, DALL·E, Firefly…) — prompts de départ (puis appliquer le traitement CSS) :
   - Héros :
     > Long exposure photograph of a modern city skyline at night, glass towers with warm amber windows, a curving highway with red and amber light trails in the foreground, deep navy blue sky, calm empty top third, shot on a full-frame camera with a 24mm lens, tripod, f/8, 20-second exposure, subtle film grain, cinematic, no text, no logo, no people
   - Carte de projet :
     > Architectural photograph of a minimalist concrete villa at blue hour, floor-to-ceiling glass glowing with warm interior light, infinity pool reflecting the house, dark navy sky, vertical 4:5 composition with the house in the upper half and dark foreground, 35mm lens, high dynamic range, no text, no people
   - Étape « chantier » :
     > Night photograph of a residential tower under construction, tower crane silhouette, scattered work lights, deep blue sky, long exposure, quiet and moody, 4:3, no text, no logo
4. **À éviter** : photos de jour au ciel bleu vif, HDR criard, fisheye, foules, agents immobiliers souriants, images de stock à fond blanc, et toute photo ou rendu du shot de référence (droits d'auteur).

## 3. Traitements (code)

```css
/* Tokens (dans :root) */
--grade-night: saturate(0.8) contrast(1.08) brightness(0.82);  /* étalonnage commun */

/* Conteneur photo : couleur de repli = ciel de nuit */
.photo { position: relative; overflow: hidden; isolation: isolate; border-radius: var(--radius-card); background: var(--night); }
.photo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: var(--grade-night); }

/* Teinte nuit : ramène toutes les photos (même de jour) vers le bleu marine */
.photo::before { content: ""; position: absolute; inset: 0; z-index: 1; background: var(--night-3); mix-blend-mode: color; opacity: .22; pointer-events: none; }

/* Voile bas pour la lisibilité du nom de projet */
.photo::after { content: ""; position: absolute; inset: 0; z-index: 1; background: var(--shade-card); pointer-events: none; }

/* Héros : voile haut/bas + zoom « pose longue » très lent */
.city { position: absolute; inset: 0; z-index: -1; background: var(--night); overflow: hidden; }
.city img { width: 100%; height: 100%; object-fit: cover; filter: var(--grade-night); animation: breathe 40s var(--ease-inout) infinite alternate; }
.city::after { content: ""; position: absolute; inset: 0; background: var(--shade-hero); }
@keyframes breathe { to { transform: scale(1.06); } }
.hero.is-paused .city img { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) { .city img { animation: none; } }
```

Pour des **traînées de phares vivantes**, utiliser une **vraie vidéo** en boucle (pose longue en timelapse, 6–10 s, `muted autoplay loop playsinline`, poster = la photo du héros), jamais des lignes dessinées en CSS.

## 4. Intégration

- `<img>` avec `width`/`height` (ou `aspect-ratio` sur le conteneur), `alt` qui décrit l'image en français (« Villa basse aux baies vitrées éclairées, piscine au crépuscule »), `loading="lazy"` partout sauf l'image du héros (`fetchpriority="high"`, pas de lazy).
- Formats : AVIF/WebP via `<picture>` ou un CDN d'images (`?auto=format&w=2000` pour le héros, `w=800` pour une carte 4:5, `w=1200` pour une photo 4:3) ; héros ≤ 300 Ko.
- Couleur de repli : `background: var(--night)` sur chaque conteneur ; le texte blanc reste lisible si l'image ne charge pas.
- Le conteneur garde son `data-slot` pour qu'on retrouve où remplacer l'image.
- **React Native / Expo** : `expo-image` (`contentFit="cover"`, `placeholder={{ blurhash }}`, `transition={300}`), teinte nuit = `View` absolue `backgroundColor: night3, opacity: .22` (pas de `mix-blend-mode` en natif : pré-étalonner les images si possible), voile = `expo-linear-gradient`.

## 5. 3D

**Optionnelle.** Le style vit de photos ; une scène 3D n'a de sens que si le promoteur a la **maquette du programme**. Usage sobre conseillé : dans la carte rouge ou l'étape « Esquisse et lumière », une maquette blanche (`.glb` fourni par l'architecte) posée sur un socle noir, éclairée par une seule lumière ambrée qui tourne lentement comme le soleil puis s'éteint pour laisser les fenêtres allumées (matériau émissif `--window`). Caméra fixe en 3/4, rotation au pointeur limitée à ±15°.

- **Web** : Three.js (`GLTFLoader` + `DRACOLoader`, `RoomEnvironment`, tone mapping ACES) ou React Three Fiber + drei (`useGLTF`, `ContactShadows`).
- **Modèles** : uniquement la maquette du projet (exports SketchUp, Revit, Rhino → `.glb` compressé Draco).
- **React Native** : image pré-rendue (plus fiable) ou `expo-gl` + `@react-three/fiber/native`.
- **Repli** : la photo du projet si WebGL est absent ou si `prefers-reduced-motion` est actif.
