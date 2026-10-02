# Heritage Lens — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo, un monument ou un objet : on utilise de vraies photos du site, de vraies reconstitutions (3D ou image retravaillée) et, quand le projet le permet, une vraie scène 3D. Seule la dentelle de la lentille, les anneaux et le médaillon restent en SVG/CSS : ce sont des ornements d'interface.

## 1. Ce que montrent les images

Le style repose sur une **paire** : la reconstitution (le lieu tel qu'il était) et l'état actuel (la ruine), **exactement au même point de vue**, pour que la lentille superpose les deux sans saut.

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `home` | Le site entier ou une colonnade au soleil bas | Plein écran 16:9 (portrait 9:16 en mobile), horizon bas, ciel ample au-dessus pour le titre | Coucher de soleil, contre-jour doré | Chaud (`sepia(.25) saturate(1.3)`), voile `--veil` en bas |
| `reconstruction` | Le lieu reconstitué : colonnes entières, couleurs peintes, toit | Plein écran, **même point de vue** que `today` | Lumière dorée rasante, ombres longues | « Reconstitué » : chaleur, saturation, lueur dorée (voir §3) |
| `today` | Le même lieu aujourd'hui, en ruines | Plein écran, même cadrage que `reconstruction` | Lumière du jour neutre, ciel tel quel | « Aujourd'hui » : couleurs naturelles légèrement désaturées, plus froides |
| `place-*` | Un lieu par point de chapitre (porte, escalier, salle, trésor, tombeaux) | Plein écran, sujet au centre-droit (la lentille y flotte) | Idem `reconstruction` | Idem paire reconstitution / aujourd'hui |
| `card-*` (mobile) | Le même lieu en carte arrondie | 9:16, sujet centré | Idem | Idem |

**Règle de cohérence** : la reconstitution est **toujours plus chaude, plus saturée et plus dorée** que la photo actuelle ; l'actuel est toujours **neutre, un peu plus froid et plus pâle**. Aucun autre filtre (pas de N&B, pas de vignettage lourd) : la scène doit rester crédible, comme un documentaire.

## 2. Où les trouver

1. **Les images du projet** : photos du site par l'institution, relevés photogrammétriques, reconstitutions validées par les archéologues. Toujours en priorité, et toujours avec la source citée dans le panneau « À propos ».
2. **Banques gratuites** : [Unsplash](https://unsplash.com), [Pexels](https://www.pexels.com) (licences gratuites, usage commercial permis), et [Wikimedia Commons](https://commons.wikimedia.org) (vérifier la licence image par image, souvent CC-BY-SA : créditer). Mots-clés qui marchent :
   - FR : « ruines antiques coucher de soleil », « colonnes antiques », « Persépolis », « temple ruines », « site archéologique », « pilier pierre sculptée ».
   - EN : « ancient ruins sunset », « ancient columns golden hour », « Persepolis », « archaeological site », « carved stone pillar », « temple ruins wide angle ».
3. **Génération IA** — à réserver à la reconstitution (jamais à la photo « aujourd'hui », qui doit rester un document). Toujours partir **de la vraie photo de la ruine** pour garder la géométrie (voir §5.2). Prompt de départ (img2img / ControlNet, avec la photo actuelle en entrée) :
   > photorealistic reconstruction of the same ancient palace hall as in the reference image, same camera position and perspective, all columns restored to full height with carved bull capitals, painted cedar ceiling, red and gold painted plaster, glazed brick reliefs, warm golden hour light from the left, long soft shadows, documentary archaeological visualization, no people, no text, no logo
   Pour l'accueil (sans image d'entrée) :
   > wide cinematic landscape of an ancient Persian-style city on a terrace at sunset, golden backlight, warm haze, low horizon, large empty sky for a title, photorealistic archaeological reconstruction, no text, no logo
4. **À éviter** : photos de touristes au premier plan, perches à selfie, panneaux modernes visibles dans la reconstitution ; reconstitutions « fantasy » (dorures partout, cristaux, éclairages magiques) ; mélanger les points de vue entre `reconstruction` et `today` ; utiliser les reconstitutions 3D d'une autre institution.

## 3. Traitements (code)

```css
/* Conteneur de scène : repli = nuit chaude */
.layer { position: absolute; inset: 0; overflow: hidden; background: var(--bg); }
.layer img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }

/* « Reconstitué » à partir de la même photo (démo) : chaleur, saturation, lumière dorée */
.past img { filter: sepia(.35) saturate(1.6) contrast(1.08) brightness(1.06) hue-rotate(-6deg); }
.past::before { content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: radial-gradient(70% 60% at 25% 20%, var(--gold), transparent 70%); mix-blend-mode: soft-light; opacity: .8; }
.past::after { content: ""; position: absolute; inset: 0; z-index: 1; background: var(--veil); pointer-events: none; }

/* « Aujourd'hui » : neutre, un peu plus froid et pâle */
.today img { filter: saturate(.6) contrast(1.02) brightness(1.02); }

/* La lentille découpe la couche « aujourd'hui » */
.today { clip-path: circle(calc(var(--lens) / 2) at var(--x) var(--y)); }
.scene.is-today .today { clip-path: circle(150% at var(--x) var(--y)); }
```

Le retraitement CSS d'une même photo **n'est qu'un substitut** : il dit « autrefois » par la couleur, mais il ne remet pas les colonnes debout. Une vraie visite utilise une reconstitution (§5).

## 4. Intégration

- `<img>` avec `width`/`height`, `alt` qui décrit **ce qu'on voit** et précise l'état (« La salle aux colonnes reconstituée, colonnes entières sous la lumière dorée » / « La même salle aujourd'hui : treize colonnes debout, à ciel ouvert »), `loading="lazy"` sauf l'image d'accueil (`fetchpriority="high"`).
- Les deux images d'une paire ont **les mêmes dimensions et le même `object-position`** ; sinon la lentille montre un décalage.
- Précharger l'image « aujourd'hui » de la scène courante (`<link rel="preload" as="image">`) pour que la lentille ne s'ouvre pas sur du vide.
- Formats : AVIF/WebP via `<picture>` ou un CDN d'images ; accueil ≤ 300 Ko ; chaque scène 2 × ≤ 250 Ko.
- Couleur de repli = `background: var(--bg)` sur chaque couche : l'ivoire et l'or restent lisibles si l'image ne charge pas.
- **React Native / Expo** : `expo-image` (`contentFit="cover"`, `placeholder` en blurhash, `transition={300}`) ; lentille = `MaskedView` (`@react-native-masked-view/masked-view`) avec un cercle qui suit le geste (Reanimated + Gesture Handler) ; les filtres CSS n'existent pas en natif : exporter deux images déjà traitées.

## 5. Reconstitution et 3D

**Recommandée** (la référence est une reconstitution WebGL), mais la démo fonctionne avec des photos. Trois niveaux, du plus simple au plus fidèle :

### 5.1 Photo retraitée (démo)
Même photo pour les deux couches, la couche « reconstitué » réchauffée (§3). Suffit pour un prototype ; indiquer clairement « illustration d'ambiance » dans le panneau « À propos ».

### 5.2 Reconstitution IA guidée par la photo
1. Prendre la photo actuelle de la ruine (haute définition, sans touristes).
2. Extraire sa structure : carte de profondeur (Depth Anything, MiDaS) et contours (Canny).
3. Générer avec Stable Diffusion XL / Flux + **ControlNet depth + canny** (force 0,8–1) et le prompt du §2 : la perspective et la position des colonnes sont conservées, l'IA « remonte » les parties manquantes. Alternatives : Firefly « Remplissage génératif » dans Photoshop, zone par zone ; Midjourney avec l'image en référence de structure.
4. Corriger à la main (Photoshop/Krita) : supprimer les anachronismes, aligner sur la photo d'origine (calque en différence).
5. **Faire valider par un archéologue** et afficher « reconstitution hypothétique » : l'IA invente des détails.

### 5.3 Vraie reconstitution 3D
- **Quoi** : le lieu modélisé à l'échelle, posé sur le relevé de la ruine.
- **Relevé de la ruine** : photogrammétrie (RealityCapture, Meshroom (libre), Polycam ou Luma AI sur téléphone ; 200 à 600 photos tout autour), ou modèles existants sur [Sketchfab](https://sketchfab.com/search?features=downloadable&licenses=7c23a1ba438d4306920229c12afcb5f9) (nombreux scans de sites antiques en CC-BY : créditer), [Smithsonian 3D](https://3d.si.edu) (CC0 pour une partie).
- **Reconstitution** : dans Blender, compléter le scan (colonnes extrudées depuis les bases, chapiteaux d'après les fragments, toit d'après les plans publiés), peindre les matières (enduit, polychromie). Exporter en `.glb` compressé (Draco ou Meshopt, textures KTX2), 2 variantes : `ruine.glb` et `reconstitution.glb` **avec la même origine**.
- **Matières et lumière** : `MeshStandardMaterial` pierre (rugosité 0,85–0,95, métal 0), enduit peint (rugosité 0,7), or des chapiteaux (`MeshPhysicalMaterial` métal 1, rugosité 0,3) ; soleil bas = `DirectionalLight` chaude (couleur lue dans `--gold`) à 10–15° au-dessus de l'horizon, ombres douces (`PCFSoftShadowMap`), ciel HDRI de coucher de soleil ([Poly Haven](https://polyhaven.com/hdris), CC0) en `scene.environment`, tone mapping ACES, brume légère (`FogExp2` couleur `--earth`).
- **Caméra** : perspective 35–45°, travellings lents entre points de vue enregistrés (un par point de chapitre), interpolés en 2,4 s (`--dur-cam`) ; pas d'orbite libre (le récit guide).
- **La lentille en 3D** : rendre les deux modèles dans la même scène et afficher la ruine dans un cercle autour du pointeur via le **stencil** (un disque écrit dans le stencil, la reconstitution masquée à l'intérieur) ou en rendant la ruine dans un `WebGLRenderTarget` puis en l'affichant à travers un shader circulaire. La dentelle reste en SVG au-dessus du canvas.
- **Web** : Three.js (`GLTFLoader` + `DRACOLoader` + `KTX2Loader`) ou React Three Fiber + drei (`useGLTF`, `Environment`, `CameraControls` pour les travellings, `MeshPortalMaterial` ou `Mask`/`useMask` pour la lentille).
- **React Native** : `expo-gl` + `@react-three/fiber/native` + `@react-three/drei/native` sur appareils récents ; sinon, rendus pré-calculés (une paire d'images par point de vue, exportée depuis Blender) et la lentille en `MaskedView`.
- **Repli** : la paire d'images (rendus pré-calculés ou photos) reste sous le canvas ; elle s'affiche si WebGL est absent, si l'appareil est faible ou si `prefers-reduced-motion` est actif (pas de travelling, coupes en fondu).
