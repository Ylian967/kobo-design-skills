# Pixel Lime Portfolio — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo, un personnage ou un objet : le portrait est une **vraie photo** passée en noir et blanc, les projets montrent de **vrais visuels** (photos, captures, mises en situation). Les **pixels lime**, les étiquettes, les tracés à la main et les autocollants restent en CSS/SVG : ce sont les gestes graphiques du style, posés **par-dessus** le réel.

## 1. Ce que montrent les images

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `portrait-bw` (héros) | La personne elle-même, pas un modèle : visage ou buste, une main au visage, dans un lieu à elle (voiture, atelier, rue) | Plein cadre 100svh, sujet au **centre-droit** (`object-position: 62% 35%`), vide à gauche et en bas pour le nom | Lumière dure, une seule source (fenêtre, contre-jour), ombres profondes | N&B : `grayscale(1) contrast(1.15) brightness(.88)`, grain SVG en `overlay` à `--grain-opacity`, voiles sombres haut/bas ; **grappe de pixels lime posée sur le visage ou le bord du sujet** |
| `project-cover` (grille de projets) | Le projet en situation : capture d'écran sur un poste, affiche dans la rue, objet ou vêtement porté, photo de campagne | 4:3, rayon 6px | Neutre ou dure, toujours la même famille que le portrait | N&B (`grayscale(1) contrast(1.1)`) par défaut ; mini-grappe de pixels au survol. Un logo pur peut rester une composition graphique (ce n'est pas un objet réel) |
| `about-portrait` (page « À propos ») | Second portrait, plus proche ou de dos, au travail | 3:4 | Idem héros | Idem héros, grappe plus petite |
| `project-hero` (page projet) | Le visuel le plus fort du projet | 16:9 plein cadre | — | N&B sauf si la couleur **est** le projet ; alors couleur sans filtre, mais aucune autre couleur que le lime dans l'interface autour |

**Règle de cohérence** : tout ce qui est photo est **noir et blanc, contrasté et granuleux** ; la seule couleur à l'écran est le lime des pixels et de l'interface. Jamais une photo en couleur à côté d'une photo N&B dans la même vue.

## 2. Où les trouver

1. **Les photos de la personne et de ses projets** : toujours en priorité. Pour le héros, une séance au téléphone suffit (mode portrait, lumière de fenêtre, fond qui raconte quelque chose).
2. **Banques gratuites** : [Unsplash](https://unsplash.com), [Pexels](https://www.pexels.com) (licences gratuites, usage commercial permis ; créditer est apprécié). Mots-clés :
   - FR : « portrait noir et blanc », « homme voiture noir et blanc », « portrait lumière dure », « bureau designer écrans », « pull noir détail ».
   - EN : « black and white portrait hand on face », « moody monochrome portrait car », « designer workstation monitors », « monochrome fashion knit close-up », « film grain portrait ».
3. **Génération IA** — prompts de départ :
   - Héros : > *Black and white editorial portrait of a creative director in their thirties sitting in a parked car, hand resting against the face, looking out of frame, hard window light from the right, deep shadows, subject on the right third with empty dark space on the left, 35mm film grain, high contrast, no text, no logo.*
   - Projet : > *Monochrome photo of a designer's desk with two monitors showing editorial layouts, late evening light, shallow depth of field, high contrast, film grain, no readable brand names, no text overlay.*
4. **À éviter** : portraits de stock souriants face caméra sur fond blanc ; photos en couleur « juste désaturées » trop plates (sans noirs profonds) ; filtres sépia ou duotone colorés ; un visage dessiné ou une silhouette en dégradés CSS ; maquettes d'écran génériques avec logos de marques ; la photo du portfolio d'origine.

## 3. Traitements (code)

```css
/* Portrait N&B plein cadre + voiles + grain */
.photo { position: absolute; inset: 0; z-index: -2; margin: 0;
  background: radial-gradient(ellipse 60% 70% at 64% 38%, var(--photo-3), var(--photo-1) 64%, var(--photo-0)); } /* repli */
.photo img { width: 100%; height: 100%; object-fit: cover; object-position: 62% 35%;
  filter: grayscale(1) contrast(1.15) brightness(0.88); }
.photo::after { content: ""; position: absolute; inset: 0;
  background: linear-gradient(180deg, color-mix(in srgb, var(--photo-0) 45%, transparent), transparent 22%, transparent 50%, color-mix(in srgb, var(--photo-0) 78%, transparent)); }
.grain::before { content: ""; position: absolute; inset: 0; z-index: 3; filter: url(#grain); opacity: var(--grain-opacity); mix-blend-mode: overlay; pointer-events: none; }
/* <svg><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3"/><feColorMatrix type="saturate" values="0"/></filter></svg> */

/* Grappe de pixels posée sur le visage : position en % du héros, à régler sur la vraie photo */
.m-face { position: absolute; left: 58%; top: 18%; }

/* Vignette projet N&B */
.thumb-photo { background: var(--photo-1); }
.thumb-photo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: grayscale(1) contrast(1.1); }

/* Image cassée : texte alternatif masqué à l'écran, le dégradé de repli reste */
.photo img, .thumb-photo img { color: transparent; }
```

**Variante pixellisation** (optionnelle, pour qu'un coin de la photo se « désagrège » en vrais pixels de l'image) : dessiner la photo dans un `<canvas>` réduit (`ctx.drawImage(img, 0, 0, w / 16, h / 16)`) puis l'agrandir avec `image-rendering: pixelated` dans un masque carré (`clip-path: inset(...)`) placé sous la grappe lime. La photo doit venir du même domaine ou d'un CDN qui envoie les en-têtes CORS (`crossorigin="anonymous"`).

**Placer la grappe** : la grappe principale mord le visage ou le contour du sujet (yeux, tempe, main), jamais le fond vide. Régler `left`/`top` après avoir choisi la photo, à 1440px **et** à 390px (l'`object-position` change le cadrage).

## 4. Intégration

- `<figure class="photo" data-slot="portrait-bw"><img … fetchpriority="high" alt="…"></figure>` ; `alt` qui décrit la scène (« un homme assis au volant, la main contre le visage »), pas « photo de moi ».
- Vignettes : `loading="lazy"`, `width`/`height` 1200×900, `alt` qui dit ce que montre le projet.
- Formats : AVIF/WebP via `<picture>` ou CDN (`?auto=format`) ; héros ≤ 300 Ko (2000px de large suffit, le grain masque la compression). Exporter déjà en N&B quand c'est possible : le `filter` reste comme garantie.
- Couleur de repli = tokens `--photo-0` → `--photo-3` (dégradé du conteneur) ; le nom blanc reste lisible dessus.
- **React Native / Expo** : `expo-image` (`contentFit="cover"`, `contentPosition={{ left: '62%', top: '35%' }}`, `placeholder={{ blurhash }}`, `transition={300}`) ; N&B via image pré-traitée ou `@shopify/react-native-skia` (`ColorMatrix` niveaux de gris) ; grain = PNG de bruit `opacity: 0.2` par-dessus ; grappe = `View` carrées absolues.

## 5. 3D

Optionnelle. Usage sobre possible : sur la page « À propos », un **cube de pixels lime** (`InstancedMesh` de petits cubes reprenant le motif de la grappe) qui flotte devant le portrait et se désassemble par à-coups (`steps`) au défilement, en `MeshStandardMaterial` couleur `--lime` lue dans les tokens, lumière unique dure, caméra orthographique pour garder l'aspect 8-bit. Pas de modèle externe nécessaire (géométrie procédurale) ; si besoin, voxels CC0 de [Kenney](https://kenney.nl/assets) ou [Poly Pizza](https://poly.pizza). Web : Three.js ou React Three Fiber (`<Instances>` de drei) ; React Native : `expo-gl` + `@react-three/fiber/native`. Repli : la grappe CSS habituelle. Jamais de 3D pour le portrait lui-même.
