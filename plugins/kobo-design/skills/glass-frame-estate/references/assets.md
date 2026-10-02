# Glass Frame Estate — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo, un personnage ou un objet : on utilise de vraies images (photos d'architecture, portraits) et, si le projet en a, une maquette 3D du bien.

Ici, tout le style repose sur **une photo d'architecture en lumière dorée**, encadrée et posée sur elle-même floutée. Une mauvaise photo (plein midi, ciel blanc, grand-angle déformant) casse le héros quel que soit le CSS.

## 1. Ce que montrent les images

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `hero-photo` | Une maison d'architecte entière (A-frame, chalet vitré, villa) dans son paysage | Plein cadre ≈ 16:9 (portrait 9:16 en mobile via `<picture>`), bâtiment centré ou au tiers, **ciel dégagé sur le tiers haut** (le mot-marque s'y pose), sol dans le quart bas (le voile s'y pose) | Golden hour, soleil rasant ou contre-jour, fenêtres allumées si possible | Grade chaud léger + voile `--shade` en bas ; même photo floutée (`--blur-bg`) hors du cadre |
| `agent-portrait` | Conseiller·ère en tenue sobre, regard caméra ou trois-quarts | Carré 1:1, épaules dans le cadre, visage au tiers haut | Lumière douce naturelle, fond neutre ou ville floue | Aucun (couleurs naturelles), rayon 2px |
| `listing-1…4` | Un bien par carte : façade, piscine, vue d'ensemble | 16:10, bâtiment entier, horizon droit | Fin de journée de préférence, ciel bleu profond accepté | Grade chaud léger, zoom 1.04 au survol |
| `team-1…8` | Portraits de l'équipe, même fond et même distance pour tous | 4:5, buste, tête au tiers haut | Douce, homogène | `grayscale(.35)` retiré au survol |
| `post-1…3` | Détail d'architecture, intérieur, paysage (terrain, montagne) | 4:3 | Dorée ou brume | Grade chaud léger |

**Règle de cohérence** : toutes les photos de biens partagent la **même heure du jour** (fin d'après-midi, lumière chaude et rasante) ; les portraits partagent **le même fond et la même distance**. Jamais de photo de plein midi à côté d'un coucher de soleil.

## 2. Où les trouver

1. **Les images du projet** (photos du photographe de l'agence, portraits de l'équipe) : toujours en priorité. Demander au photographe une version « ciel dégagé » du héros pour le mot-marque.
2. **Banques gratuites** : [Unsplash](https://unsplash.com) et [Pexels](https://www.pexels.com) (licences gratuites, usage commercial permis ; créditer le photographe est apprécié). Mots-clés qui marchent :
   - FR : « maison en A coucher de soleil », « chalet vitré forêt », « villa architecte piscine crépuscule », « maison bois béton », « portrait professionnel costume ».
   - EN : « a-frame house golden hour », « glass cabin forest dusk », « modern villa pool sunset », « architect house hillside », « real estate agent portrait », « professional headshot neutral background ».
3. **Génération IA** (Midjourney, Flux, DALL·E, Firefly…) — prompts de départ :
   - Héros :
     > Architectural photograph of a contemporary timber A-frame house with a fully glazed gable, standing alone on a gentle green hillside, golden hour, low warm sun behind the house, windows glowing amber, clear soft gradient sky occupying the upper third, 35mm lens at eye level, straight verticals, natural colors, subtle film grain, no people, no text, no logo, 16:9
   - Annonce :
     > Real estate listing photo of a modern villa with wood and concrete volumes and a long pool, late afternoon warm side light, deep blue sky, wide but undistorted 24mm tilt-shift look, crisp details, no people, no text, 16:10
   - Portrait :
     > Professional portrait of a real estate advisor in a dark tailored jacket, chest-up, soft window light, neutral warm grey background, calm confident expression, 85mm lens, shallow depth of field, natural skin tones, no text, square crop
4. **À éviter** : photos de plein midi aux ombres dures, ciels blancs brûlés (le mot-marque blanc y disparaît), HDR surchargé, grands-angles qui font pencher les murs, intérieurs encombrés, portraits de stock au sourire figé sur fond blanc pur, photos ou noms d'un template ou d'une agence existante.

## 3. Traitements (code)

```css
/* Conteneur : repli = dégradé de ciel en tokens, visible si l'image ne charge pas */
.media { position: relative; overflow: hidden; background: linear-gradient(180deg, var(--sky-top), var(--sky-mid) 55%, var(--shade)); }
.media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }

/* Grade « golden hour » léger : un peu de chaleur, jamais un filtre visible */
.media--warm img { filter: saturate(1.06) contrast(1.03); }
.media--warm::after { content: ""; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(200deg, color-mix(in srgb, var(--sky-glow) 30%, transparent), transparent 55%);
  mix-blend-mode: soft-light; }

/* Voile de lisibilité du héros (le texte blanc repose dessus) */
.veil { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 50%, color-mix(in srgb, var(--shade) 80%, transparent) 88%, var(--shade)); }

/* Même photo, floutée, hors du cadre */
.hero-bg { position: absolute; inset: calc(-2 * var(--blur-bg)); background: var(--shade); }
.hero-bg img { width: 100%; height: 100%; object-fit: cover; filter: blur(var(--blur-bg)) saturate(1.1); }

/* Mise au point à l'arrivée (voir motion.md) */
.frame .media img { animation: settle var(--dur-photo) var(--ease) both; }

/* Portraits d'équipe */
.member img { filter: grayscale(.35); transition: filter var(--dur) var(--ease); }
.member:hover img { filter: none; }
```

**Mot-marque derrière le bâtiment** : avec une photo normale, le mot-marque se place **dans le ciel, au-dessus du toit, sans le toucher**. Pour qu'il passe vraiment *derrière* le toit, il faut un deuxième calque : la même photo détourée en PNG/WebP transparent (sujet seul), posée au-dessus du mot-marque :

```html
<div class="media" data-slot="hero-photo">
  <img src="maison.jpg" alt="…">                       <!-- ciel + maison -->
  <p class="wordmark" aria-hidden="true">Marque</p>
  <img class="cutout" src="maison-detouree.webp" alt="">  <!-- maison seule, même cadrage -->
  <div class="veil"></div>
</div>
```
Le détourage se fait dans Photoshop (« Sélectionner le sujet »), Photopea ou `rembg` ; ne jamais le simuler avec un `clip-path` dessiné.

## 4. Intégration

- `<img>` avec `width`/`height` ou `aspect-ratio`, `alt` qui décrit le bien (« Maison en A en bois et verre sur une colline au coucher du soleil »), `loading="lazy"` sauf l'image du héros (`fetchpriority="high"`, `decoding="async"`). La copie floutée hors cadre a `alt=""` et `aria-hidden="true"`.
- Héros : `<picture>` avec une source portrait pour mobile (`media="(max-width: 640px)"`), AVIF/WebP, ≤ 300 Ko. La copie floutée peut être une version 400px (le flou masque la définition).
- Couleur de repli (`background` du conteneur) = un token (`--shade`, dégradé `--sky-*`), pour que le titre blanc reste lisible si l'image ne charge pas.
- **React Native / Expo** : `expo-image` (`contentFit="cover"`, `placeholder={{ blurhash }}`, `transition={300}`) ; fond flouté = la même `Image` avec `blurRadius={22}` ; voile = `expo-linear-gradient`.

## 5. 3D

Optionnelle : **la maquette du bien** sur une fiche d'annonce, jamais dans le héros (la photo reste la signature).

- **Quoi** : maquette blanche du bâtiment (export SketchUp/Revit/Blender en `.glb`, compressé Draco), posée sur un socle, dans une carte 16:10 « Visite 3D » à côté de la galerie photo.
- **Matières et lumière** : `MeshStandardMaterial` blanc mat (couleur `--white`, rugosité 0.9), vitrages `MeshPhysicalMaterial` (`transmission` 0.9, teinte `--sky-top`), une `DirectionalLight` chaude rasante (couleur `--sun`, ombres douces) qui rejoue la golden hour, `RoomEnvironment` faible, tone mapping ACES.
- **Caméra et interaction** : vue trois-quarts à hauteur d'œil, `OrbitControls` limités (pas de passage sous le sol, zoom borné), rotation lente au repos.
- **Modèles** : le modèle de l'architecte en priorité ; pour une maquette : [Poly Pizza](https://poly.pizza) (CC0/CC-BY), [Kenney](https://kenney.nl/assets) (CC0), [Sketchfab](https://sketchfab.com/search?features=downloadable&licenses=7c23a1ba438d4306920229c12afcb5f9) (filtre CC). Vérifier la licence et créditer si CC-BY.
- **Web** : Three.js (`GLTFLoader` + `DRACOLoader`) ou React Three Fiber + drei (`useGLTF`, `Environment`, `ContactShadows`, `OrbitControls`).
- **React Native** : `expo-gl` + `@react-three/fiber/native`, ou une série d'images pré-rendues (rotation par glissement) sur appareil modeste.
- **Repli** : la photo principale du bien si WebGL est absent ou si `prefers-reduced-motion` est actif (pas de rotation automatique).
