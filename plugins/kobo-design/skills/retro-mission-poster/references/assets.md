# Retro Mission Poster — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo, un véhicule, une personne ou un paysage : on utilise de vraies photos (ou rendus) **traitées en affiche imprimée** — grain, couleurs réduites, duotone chaud. Seuls le cadre crème, l'anneau dentelé et le symbole du logo restent en CSS/SVG : ce sont des éléments graphiques.

## 1. Ce que montrent les images

Une affiche de mission des années 70 : **désert, ciel immense, une machine, quelques humains minuscules**. Chaque chapitre est un collage de deux ou trois photos.

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `desert` (fond chapitre 1) | Désert, dunes ou plateau au crépuscule, ciel dégagé | Plein écran 16:9, horizon au tiers bas, ciel libre en haut à droite pour le titre | Soleil rasant, orange et ocre, ciel bleu acier qui vire au pêche | Postérisation (5 niveaux par canal) + saturation 1,3 + grain |
| `vehicle` (collage chapitre 1) | La machine du récit : fusée, navette, voiture, éolienne, usine | Carte 4:5 posée de biais dans l'affiche (≈ 30 % de la largeur), bord crème de 6px | Ciel coloré, fumée, contre-jour | Duotone `--rust` → `--dusk` + grain |
| `planet` (fond chapitre « mission ») | Ciel, lancement, planète, nuage de fumée : ce qui est « là-haut » | Plein écran, sujet dans la moitié haute | Crépuscule, contraste fort | Duotone nuit `--bg` → `--sky` (le bleu acier de l'affiche, sur lequel le rouge du mot géant claque) + grain |
| `silhouettes` / `horizon` (premier plan « mission ») | Personnes en silhouette sur une crête, ou à défaut la ligne de dunes | Bande basse (≈ 45 % de la hauteur), bord supérieur détouré ou fondu | Contre-jour | Postérisé, très sombre, grain |

**Règle de cohérence** : toutes les images ont **le même grain, la même gamme réduite** (ocre, rouille, pêche, et le bleu acier `--sky` pour les ciels de nuit) et **aucune n'est nette et lisse** ; une photo moderne non traitée casse instantanément l'affiche.

## 2. Où les trouver

1. **Les images du projet** (photos de l'usine, du véhicule, de l'équipe) : en priorité, traitées avec les filtres du §3.
2. **Banques gratuites** : [Unsplash](https://unsplash.com) et [Pexels](https://www.pexels.com) (licences gratuites, usage commercial permis ; créditer le photographe est apprécié) ; archives de la NASA ([images.nasa.gov](https://images.nasa.gov), domaine public pour la plupart, sans logo NASA). Mots-clés :
   - FR : « désert crépuscule », « dunes ocre », « lancement fusée », « navette décollage », « silhouettes crête désert », « route désert ».
   - EN : « desert dusk », « orange dunes », « rocket launch smoke », « space shuttle liftoff », « people silhouette ridge sunset », « vintage car desert road ».
3. **Génération IA** — prompts de départ :
   - `desert` :
     > 1970s retro-futurist travel poster, vast red desert at dusk, striated steel-blue sky fading to peach, long shadows, limited color palette of rust, ochre, peach and navy, visible print grain and halftone, gouache texture, lots of empty sky top right, no text, no logo
   - `vehicle` :
     > vintage 1970s photograph of a rocket lifting off from a desert launch pad, huge billowing smoke cloud, warm dusk light, faded film colors, heavy grain, no text, no logo
   - `silhouettes` (sur fond uni pour détourage facile) :
     > a row of six small human silhouettes standing on a desert ridge, seen from below against a plain flat light background, backlit, simple shapes, no text
4. **À éviter** : photos HDR nettes, ciels bleus saturés modernes, images de la référence (voiture, logo, illustrations), dégradés « techno » violets, emojis de fusée, silhouettes dessinées en CSS.

## 3. Traitements (code)

Les filtres SVG s'appliquent aux images (même cross-origin) : on les déclare une fois dans la page.

```html
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <!-- Grain d'impression -->
  <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
  <!-- Postérisation : 5 niveaux par canal, effet sérigraphie -->
  <filter id="posterize" color-interpolation-filters="sRGB"><feComponentTransfer>
    <feFuncR type="discrete" tableValues="0 .25 .5 .75 1"/><feFuncG type="discrete" tableValues="0 .25 .5 .75 1"/><feFuncB type="discrete" tableValues="0 .25 .5 .75 1"/>
  </feComponentTransfer></filter>
</svg>
```

```css
/* Conteneur : repli = terre, l'affiche reste cohérente sans image */
.media { position: absolute; inset: 0; overflow: hidden; background: var(--rust); isolation: isolate; }
.media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }

/* Postérisé chaud (fonds de paysage) */
.poster img { filter: saturate(1.3) contrast(1.1) url(#posterize); }

/* Duotone chaud : ombres = --rust, lumières = --dusk */
.duo { background: var(--dusk); }
.duo img { filter: grayscale(1) contrast(1.25) url(#posterize); mix-blend-mode: multiply; }
.duo::before { content: ""; position: absolute; inset: 0; z-index: 1; background: var(--rust); mix-blend-mode: lighten; pointer-events: none; }
/* Duotone nuit (chapitre « mission ») : ombres = --bg, lumières = --sky */
.duo--night { background: var(--sky); }
.duo--night::before { background: var(--bg); }

/* Grain par-dessus toutes les images */
.grain::after { content: ""; position: absolute; inset: 0; z-index: 2; filter: url(#grain); opacity: var(--grain-opacity); mix-blend-mode: overlay; pointer-events: none; }

/* Premier plan fondu (à défaut de PNG détouré) : le haut de la photo disparaît */
.fade-top { -webkit-mask-image: linear-gradient(transparent, #000 35%); mask-image: linear-gradient(transparent, #000 35%); }

/* Carte de collage : bord crème, légère rotation */
.collage { position: absolute; border: 6px solid var(--cream); rotate: -3deg; box-shadow: 0 20px 40px rgb(0 0 0 / .35); }
```

**Le mot entre deux plans** demande un premier plan **détouré** : PNG/WebP à fond transparent obtenu avec Photoshop (« Sélectionner le sujet »), [remove.bg](https://www.remove.bg), `rembg` (libre, en ligne de commande) ou Figma (Remove background). À défaut, la démo utilise une photo de dunes dont le haut est fondu (`.fade-top`) : l'horizon passe devant le mot.

## 4. Intégration

- `<img>` avec `width`/`height`, `alt` qui décrit la scène (« Une navette décolle dans un ciel rose »), `loading="lazy"` sauf le fond du chapitre 1 (`fetchpriority="high"`). Le premier plan détouré décoratif reçoit `alt=""` si le mot est déjà donné en `<h2 class="sr-only">`.
- Formats : AVIF/WebP via `<picture>` ou un CDN d'images ; fonds ≤ 300 Ko (le grain ajouté en CSS évite d'alourdir les fichiers) ; PNG détouré → WebP avec transparence.
- Couleur de repli = `background: var(--rust)` ou `var(--dusk)` sur chaque conteneur : crème et rouge restent lisibles.
- **React Native / Expo** : `expo-image` (`contentFit="cover"`, `placeholder` en blurhash, `transition={300}`) ; pas de filtres SVG en natif : exporter les images **déjà postérisées / duotone** (Photoshop « Isohélie » + « Courbe de transfert de dégradé », ou `sharp` côté build), grain = PNG de bruit en `opacity: 0.18`.

## 5. 3D

**Optionnelle.** Usage sobre qui marche : pour le chapitre « mission », une **planète** en Three.js qui monte lentement derrière le mot géant, rendue comme une affiche.

- **Quoi** : une sphère (`SphereGeometry(1, 64, 64)`) avec une texture de planète libre ([Solar System Scope](https://www.solarsystemscope.com/textures/), CC-BY ; ou NASA, domaine public), éventuellement un anneau.
- **Matières et lumière** : `MeshToonMaterial` avec un `gradientMap` à 3 tons (couleurs lues dans `--rust`, `--sand`, `--dusk`) pour l'aspect sérigraphié ; une seule `DirectionalLight` rasante ; pas d'environnement réfléchissant.
- **Caméra** : perspective 30°, fixe ; la planète monte de 10 % et tourne de 5° pendant l'entrée du chapitre.
- **Grain** : garder le `.grain::after` CSS au-dessus du canvas (ou un `ShaderPass` de bruit en post-traitement).
- **Modèles** : véhicule ou fusée en `.glb` (compressé Draco/Meshopt) depuis [Poly Pizza](https://poly.pizza) (CC0/CC-BY), [Kenney Space Kit](https://kenney.nl/assets) (CC0), [Quaternius](https://quaternius.com) (CC0) ; vérifier la licence et créditer si CC-BY.
- **Web** : Three.js ou React Three Fiber + drei (`useTexture`, `Float`).
- **React Native** : `expo-gl` + `@react-three/fiber/native`, ou une image pré-rendue.
- **Repli** : la photo `planet` traitée reste sous le canvas ; elle s'affiche si WebGL est absent ou si `prefers-reduced-motion` est actif.
