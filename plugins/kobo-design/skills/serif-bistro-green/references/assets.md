# Serif Bistro Green — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo, un personnage ou un plat : on utilise de vraies photos (la brigade, les assiettes, la salle). Seuls les **dessins au trait** du bandeau newsletter restent en SVG : ce sont des ornements, pas des représentations.

## 1. Ce que montrent les images

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `chef-portrait` (héros) | La cheffe ou le chef, en veste, au travail ou tenant une assiette | Portrait 3:4.2, visage dans le tiers haut (`object-position: 50% 30%`), cadré dans une **arche** (rayon pilule en haut, coupé net en bas par la feuille crème) | Lumière de cuisine chaude, latérale, fond sombre ou flou (inox, passe) | Saturation 0,92, contraste +4 %, fondu vert (`--green` à 55 %) sur le bas ; filet crème décalé de 10px autour de l'arche |
| `dish-photo` (cartes de plats) | Une assiette **vue de dessus** ou à 3/4 très plongeant, un plat par carte | Carré 1:1 recadré en **cercle**, l'assiette remplit le cercle | Lumière naturelle du jour, douce, ombres courtes | Couleurs naturelles (c'est ce qui donne faim) ; cercle bordé de 6px `--white` + ombre portée, comme une assiette posée sur l'orange |
| `photo-cuisine`, `photo-plat`, `photo-jardin` (titre échelonné) | Détails : mains en cuisine, un plat signature, la terrasse / le jardin / un verre | Carré 1:1 ou 4:3, petit (1,25 à 1,6em) | Chaude, intime | Aucun filtre ; cadre `--card` 8px, rayon 4px, ombre `--shadow-photo`, légère rotation (-4° à +5°) comme des tirages posés |
| `salle` (optionnel, page « À propos ») | La salle pendant le service, tables dressées | 16:9 ou 3:2 dans une feuille arrondie | Fin de journée, lampes allumées | Coins supérieurs `--radius-section`, dégradé vert vers le bas si du texte passe dessus |

**Règle de cohérence** : toutes les photos sont **chaudes et naturelles** (bois, lin, céramique, lumière du jour ou de lampe) ; jamais de fond blanc de studio, jamais de lumière froide ou de néon. Les plats gardent leurs vraies couleurs ; seul le portrait du héros est légèrement atténué pour laisser parler la serif.

## 2. Où les trouver

1. **Les photos du restaurant** : la vraie brigade et les vraies assiettes, toujours en priorité (un shooting d'une demi-journée suffit : 1 portrait vertical, 6 à 8 assiettes en plongée sur la même table).
2. **Banques gratuites** : [Unsplash](https://unsplash.com), [Pexels](https://www.pexels.com) (licences gratuites, usage commercial permis ; créditer est apprécié). Mots-clés :
   - FR : « cheffe cuisine portrait », « assiette vue de dessus », « plat bistrot », « salade bol bois », « risotto assiette », « table restaurant lumière naturelle ».
   - EN : « chef portrait kitchen », « food flat lay plate », « overhead plate rustic table », « bistro dish top view », « restaurant kitchen warm light ».
3. **Génération IA** — prompts de départ :
   - Héros : > *Vertical editorial portrait of a female chef in a white chef jacket plating a dish at the pass, warm tungsten side light, dark blurred stainless-steel kitchen background, shallow depth of field, 85mm lens, natural skin texture, subtle film grain, no text, no logo.*
   - Plat : > *Top-down photo of a seasonal bistro dish on a round white ceramic plate filling the frame, soft natural window light, linen and oak table barely visible at the edges, vibrant but natural colors, high detail, no text, no hands, no cutlery logo.*
   - Vignette : > *Close-up of a chef's hands finishing a plate with herbs, warm light, shallow depth of field, cozy French bistro atmosphere, no text.*
4. **À éviter** : photos de stock souriantes face caméra ; plats sur fond blanc pur ou ardoise noire avec fumée ajoutée ; filtres « Instagram » saturés ; un personnage détouré en PNG avec halo ; illustrations ou icônes de plats à la place des photos ; images d'un restaurant ou d'un chef réel existant.

## 3. Traitements (code)

```css
/* Arche du héros : photo de la cheffe entre les deux lignes du titre */
.chef { position: absolute; z-index: 2; width: clamp(220px, 26vw, 360px); aspect-ratio: 3 / 4.2; margin: 0; overflow: hidden;
  border-radius: var(--radius-pill) var(--radius-pill) 0 0; background: var(--green-deep);   /* repli */
  outline: 1px solid color-mix(in srgb, var(--cream) 35%, transparent); outline-offset: 10px; box-shadow: var(--shadow-photo); }
.chef img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: 50% 30%; filter: saturate(0.92) contrast(1.04); }
.chef::after { content: ""; position: absolute; inset: 55% 0 0; background: linear-gradient(transparent, color-mix(in srgb, var(--green) 55%, transparent)); }
/* Empilement : .l1 z-index 1, .chef 2, .l2 3 → la 2e ligne passe devant la photo */

/* Assiette ronde sur la carte orange */
.plate { width: 78%; aspect-ratio: 1; border-radius: 50%; overflow: hidden; border: 6px solid var(--white); background: var(--card);
  box-shadow: 0 16px 24px -10px color-mix(in srgb, var(--ink) 50%, transparent); transition: rotate var(--dur-slow) var(--ease-out); }
.plate img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
.dish:hover .plate { rotate: 25deg; }   /* l'assiette tourne : seulement avec une photo vue de dessus */

/* Tirage glissé dans le titre échelonné */
.ph { display: inline-block; width: 1.25em; aspect-ratio: 1; overflow: hidden; border: var(--frame-photo) solid var(--card);
  border-radius: var(--radius-btn); background: var(--line); box-shadow: var(--shadow-photo); rotate: -4deg; }
.ph img { width: 100%; height: 100%; object-fit: cover; }

/* Image cassée : on masque le texte alternatif à l'écran, la couleur de repli du cadre reste */
.chef img, .plate img, .ph img { color: transparent; }
```

## 4. Intégration

- `<img>` avec `width`/`height` (ou `aspect-ratio` sur le cadre), `alt` qui décrit le plat ou la personne (« Risotto crémeux dressé dans une assiette blanche »), `loading="lazy"` partout sauf le portrait du héros (`fetchpriority="high"`).
- Les vignettes du titre échelonné sont décoratives : `alt=""` et `aria-hidden="true"` sur le cadre, le titre se lit seul.
- Formats : AVIF/WebP via `<picture>` ou un CDN d'images (`?auto=format`), portrait du héros ≤ 200 Ko (800×1120), assiettes 400×400.
- Couleur de repli = un token sur chaque cadre (`--green-deep` pour l'arche, `--card` pour les assiettes, `--line` pour les tirages).
- **React Native / Expo** : `expo-image` (`contentFit="cover"`, `placeholder={{ blurhash }}`, `transition={300}`) ; arche = `View` avec `borderTopLeftRadius/RightRadius` = moitié de la largeur et `overflow: 'hidden'` ; assiette = `borderRadius` = moitié + `borderWidth: 6` blanc.

## 5. 3D

Optionnelle. Usage sobre possible : **une seule assiette signature en 3D** (scan photogrammétrique `.glb` du vrai plat) qui tourne lentement sur la carte orange de la page « Carte », à la place de la photo ronde, en `MeshStandardMaterial` d'origine, lumière `RoomEnvironment` chaude, caméra en plongée à 60°, rotation de 25° au survol comme la photo. Modèles : scan maison (Polycam, RealityScan) ou [Sketchfab](https://sketchfab.com/search?features=downloadable&licenses=7c23a1ba438d4306920229c12afcb5f9&q=food) filtré CC (créditer si CC-BY). Web : Three.js `GLTFLoader` ou React Three Fiber + drei (`useGLTF`, `PresentationControls`) ; React Native : `expo-gl` + `@react-three/fiber/native`. Repli : la photo vue de dessus du même plat. Jamais de 3D pour la cheffe ni pour la salle.
