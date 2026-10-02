# Alpine Glass Expedition — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo, un paysage, un personnage ou un objet : la montagne est une **vraie photo** plein écran, les séjours montrent de **vrais lieux**. Restent en CSS/SVG seulement les éléments graphiques de la marque : logo, filets de crêtes de la section nuit, découpe de crête du pied de page, calque de brume animé, verre.

## 1. Ce que montrent les images

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `mountain-photo` (héros) | Un massif enneigé, sommets nets, brume ou nuages bas | Plein écran (`100svh`, `object-fit: cover`) ; **ciel sombre et vide dans le tiers haut** pour le titre blanc, sommets sous le texte, décalés à droite du centre ; le bas peut être sombre (vignette) | Heure bleue, aube froide, ciel couvert ; jamais de soleil direct orange | `saturate(.55) contrast(1.05) brightness(.95)` + calque `--steel` → `--deep` en `mix-blend-mode: color` à 40 % + brume CSS qui dérive + `--vignette` |
| `trip-photo` (cartes de séjour) | Le terrain du séjour : crêtes dans la brume, tente en alpage, alpiniste minuscule sous les pics, lac gelé | Portrait 4:5,2 (800×1040), sujet dans la moitié haute (le panneau de verre couvre le bas) | Froide, diffuse | Même traitement froid, teinte à 35 % ; dégradé `--night` 55 % en bas ; zoom 1.05 au survol |
| `avatar` (témoignage) | La personne qui témoigne, en montagne ; à défaut une photo de son séjour | Carré 1:1, 48px, rond, bordure blanche 2px | — | `saturate(.55)` |
| `stage-photo` (fiche séjour, optionnel) | Étape de l'itinéraire, refuge, bivouac | 3:2 dans un panneau rayon 20px | Idem héros | Idem cartes |

**Règle de cohérence** : toutes les photos tirent vers le **bleu froid et la brume** ; un élément chaud du sujet (tente orange, veste rouge) est accepté, mais toujours désaturé par le traitement. Jamais de coucher de soleil saturé, de forêt verte vive ni de ciel bleu « carte postale » à côté d'une photo brumeuse.

## 2. Où les trouver

1. **Les photos de l'agence ou du refuge** (guides, terrain réel, clients consentants) : toujours en priorité. Pour le héros, une photo horizontale très large (≥ 2400px) avec du ciel au-dessus des sommets.
2. **Banques gratuites** : [Unsplash](https://unsplash.com), [Pexels](https://www.pexels.com) (licences gratuites, usage commercial permis ; créditer est apprécié). Mots-clés :
   - FR : « sommets enneigés brume », « montagne heure bleue », « crêtes dans le brouillard », « alpiniste sous les pics », « tente alpage », « lac de montagne gelé ».
   - EN : « snowy peaks blue hour », « misty mountain ridges », « alpine fog layers », « tiny mountaineer below peaks », « tent alpine meadow », « frozen mountain lake ».
3. **Génération IA** — prompts de départ :
   - Héros : > *Wide landscape photograph of a snow-covered alpine massif at blue hour, low mist drifting through the valleys, peaks slightly right of center in the lower half, large dark empty navy sky in the upper third, cold desaturated blues and whites, no sun, crisp detail, medium format, no people, no text, no logo.*
   - Carte : > *Vertical photo of a lone hiker's tent on an alpine meadow below misty peaks, overcast cold light, muted blue-grey palette, subject in the upper half, empty foreground, natural film look, no text, no brand logos.*
   - Avatar : > *Candid portrait of a hiker in a technical jacket on a snowy ridge, overcast light, muted colors, head and shoulders, natural smile, no logo.*
4. **À éviter** : couchers de soleil orange et roses saturés laissés tels quels ; photos HDR ; paysages tropicaux ou forestiers verts ; sommets célèbres reconnaissables présentés comme une destination qu'on ne propose pas ; personnes de stock posées face caméra ; illustrations ou paysages vectoriels ; la photo du shot d'origine.

## 3. Traitements (code)

```css
/* Héros : photo réelle refroidie */
.land { position: absolute; inset: 0; z-index: -2; margin: 0; overflow: hidden;
  background: linear-gradient(180deg, var(--slate), var(--steel) 40%, var(--ice) 70%, var(--deep)); }  /* repli */
.land img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 40%;
  filter: saturate(0.55) contrast(1.05) brightness(0.95); }
.land::after { content: ""; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(180deg, var(--steel), var(--deep)); mix-blend-mode: color; opacity: 0.4; }   /* teinte froide */
.hero::after { content: ""; position: absolute; inset: 0; z-index: -1; background: var(--vignette); }   /* vignette */

/* Brume qui dérive (calque CSS, pas une image) */
.mist { position: absolute; inset: 40% -10% 10%; z-index: -1; pointer-events: none; filter: blur(12px);
  background: radial-gradient(50% 30% at 30% 40%, color-mix(in srgb, var(--white) 30%, transparent), transparent 70%),
              radial-gradient(55% 25% at 75% 70%, color-mix(in srgb, var(--fog) 35%, transparent), transparent 70%); }
@media (prefers-reduced-motion: no-preference) { .mist { animation: drift var(--dur-drift) var(--ease-in-out) infinite alternate; } }

/* Carte de séjour */
.scene { position: absolute; inset: 0; z-index: -1; margin: 0; background: linear-gradient(180deg, var(--ice), var(--steel) 52%, var(--slate)); }
.scene img { width: 100%; height: 100%; object-fit: cover; filter: saturate(0.55) contrast(1.05); }
.scene::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, var(--steel), var(--deep)); mix-blend-mode: color; opacity: 0.35; }

/* Image cassée : texte alternatif masqué à l'écran, le dégradé de repli reste */
.land img, .scene img, .avatar img { color: transparent; }

/* Mobile portrait : garder les sommets dans l'écran */
@media (max-width: 760px) { .land img { object-position: 55% 30%; } }
```

**Lisibilité** : le titre blanc se pose sur le ciel sombre ; si la photo choisie a un ciel clair, renforcer le haut de `--vignette` (0.35 → 0.55) ou baisser `brightness` plutôt que d'ajouter un fond derrière le texte.

## 4. Intégration

- `<figure class="land" data-slot="mountain-photo"><img … fetchpriority="high" alt="Sommets enneigés sous un ciel bleu nuit"></figure>` ; pas de `loading="lazy"` sur le héros.
- Cartes : `<figure class="scene" data-slot="trip-photo"><img … loading="lazy" width="800" height="1040" alt="…"></figure>` ; `alt` qui décrit le lieu, pas le titre de la carte.
- Avatar : `alt=""` si le nom est écrit à côté.
- Formats : AVIF/WebP via `<picture>` ou CDN (`?auto=format`), héros ≤ 300 Ko (2000px), cartes ≤ 120 Ko. Le zoom d'arrivée (1.08 → 1) s'applique à l'`<img>`, pas au conteneur.
- Couleur de repli = dégradé de tokens sur chaque conteneur : le titre blanc reste lisible sur `--slate`.
- **React Native / Expo** : `expo-image` plein écran (`contentFit="cover"`, `contentPosition="top center"`, `placeholder={{ blurhash }}`, `transition={300}`) ; teinte froide via une `View` absolue `--deep` à 25 % ou image exportée déjà refroidie ; vignette `expo-linear-gradient` ; brume = `View` floutée animée par Reanimated, coupée si `isReduceMotionEnabled`.

## 5. 3D

Optionnelle. Usage sobre possible : sur la fiche séjour, une **carte de relief 3D du parcours** (maillage de terrain issu d'un MNT, tracé de l'itinéraire en ligne `--white`, points d'étape) que l'on fait pivoter doucement au glisser, matériau `MeshStandardMaterial` mat couleur `--ice`/`--slate` lue dans les tokens, lumière rasante froide + `RoomEnvironment` faible, brouillard `THREE.Fog` couleur `--fog`, caméra perspective plongeante à 35°. Sources : MNT libres (IGN RGE ALTI, Copernicus DEM, Mapzen Terrain Tiles) convertis en `.glb`, ou [Sketchfab](https://sketchfab.com/search?features=downloadable&licenses=7c23a1ba438d4306920229c12afcb5f9&q=terrain) filtré CC (créditer si CC-BY). Web : Three.js (`GLTFLoader`) ou React Three Fiber + drei (`useGLTF`, `OrbitControls` bridés, `Line`) ; React Native : `expo-gl` + `@react-three/fiber/native`. Repli : la photo du séjour ou une carte statique. Jamais de 3D à la place de la photo du héros.
