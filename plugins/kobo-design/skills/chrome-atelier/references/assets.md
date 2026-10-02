# Chrome Atelier — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo, un personnage ou un objet : le bijou est une **vraie scène 3D** (ou un vrai rendu), les portraits sont de **vraies photos**. Seuls les filets, cercles et pastilles restent en CSS/SVG : ce sont des éléments graphiques de la planche.

## 1. Ce que montrent les images

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `product-3d` (héros atelier) | La pièce seule : bijou sculptural or + chrome | Centrée sur l'intersection des filets, ~40 % de la largeur, dans le cercle `--ring-size` | Studio neutre, reflets nets, fond transparent sur `--bg` | Scène Three.js (§ 5) ; repli = photo du bijou porté recadrée en disque dans le cercle |
| `portrait-photo` (scène nuit) | Gros plan de profil, la pièce portée à l'oreille | Plein cadre, visage et oreille dans les deux tiers droits, zone sombre à gauche pour le titre | Basse lumière, une source latérale qui fait briller le métal | N&B `brightness(.62)` + calque `--night-3` en `mix-blend-mode: color`, fondu `--night` vers la gauche et le bas |
| `community-photo` | Visage ou buste dans l'obscurité, lumière latérale | 16:9 ou plus large, sujet à gauche (le panneau blanc chevauche la droite) | Clair-obscur | Même virage bleu-gris que la scène nuit |

**Règle de cohérence** : la seule couleur chaude de la page est le métal. Les photos sont toujours désaturées et virées bleu-gris (`--night-3`), jamais de peau dorée ni de fond coloré ; le blanc cassé `--bg` n'accueille que la pièce 3D.

## 2. Où les trouver

1. **Les images du projet** : rendus 3D du bijou (fichier `.glb` du CAO joaillier : Rhino/Matrix exporte en glTF), photos de campagne portées. Toujours en priorité.
2. **Banques gratuites** : [Unsplash](https://unsplash.com), [Pexels](https://www.pexels.com). Mots-clés :
   - FR : « boucle d'oreille sculpturale », « bijou porté profil », « portrait clair-obscur », « profil femme bijou noir et blanc », « homme lumière latérale fond noir ».
   - EN : « sculptural earring », « ear cuff close up », « jewelry portrait dark », « profile earring black and white », « chiaroscuro portrait », « side lit face dark background ».
3. **Génération IA** (Midjourney, Flux, Firefly…) — prompts de départ :
   - Pièce (repli ou texture) : > *studio product render of an avant-garde sculptural ear cuff, flowing organic shape combining polished yellow gold and mirror chrome, small spheres at the tips, centered, soft studio reflections, plain off-white background, 50mm, ultra sharp, no text, no logo*
   - Portrait nuit : > *cinematic close-up profile of a woman in near darkness wearing a sculptural chrome and gold ear cuff, single cold side light, deep blue-grey shadows, desaturated, negative space on the left, 85mm, fine film grain, no text*
   - Communauté : > *moody black and white portrait of a man emerging from darkness, hard side light sculpting the face, wide 16:9 frame, subject on the left, cool blue-grey tone, no text*
4. **À éviter** : bijoux sur velours ou fond coloré, mannequins souriants, éclairage chaud doré, plusieurs bijoux à la fois, photos de la campagne de référence, faux détourage (une photo « détourée » à la main sur `--bg`) : utiliser la 3D ou un vrai rendu sur fond uni.

## 3. Traitements (code)

```css
/* Portrait nuit : N&B virée bleu-gris + fondu vers le texte */
.portrait { position: absolute; inset: 0; background: var(--night); }
.portrait__img { position: absolute; top: 0; right: 0; width: 68%; height: 100%; background: var(--night-2); }
.portrait__img img { width: 100%; height: 100%; object-fit: cover; object-position: 60% 35%;
  filter: grayscale(1) contrast(1.15) brightness(.62); }
.portrait__img::after { content: ""; position: absolute; inset: 0; background: var(--night-3); mix-blend-mode: color; }
.portrait__img::before { content: ""; position: absolute; inset: 0; z-index: 1;
  background: linear-gradient(90deg, var(--night) 0%, color-mix(in srgb, var(--night) 40%, transparent) 35%, transparent 60%),
              linear-gradient(0deg, var(--night) 0%, transparent 30%); }

/* Pièce : canvas 3D + photo de repli en disque dans le cercle */
.piece { position: absolute; inset: 0; cursor: grab; touch-action: pan-y; }
.piece canvas { position: absolute; inset: 0; filter: drop-shadow(0 34px 30px color-mix(in srgb, var(--ink) 22%, transparent)); }
.piece .fallback { position: absolute; left: 50%; top: 50%; translate: -50% -50%; width: calc(var(--ring-size) * .82);
  aspect-ratio: 1; height: auto; object-fit: cover; border-radius: 50%; background: var(--white-gold); transition: opacity var(--dur-slow) var(--ease-out); }
.piece.is-3d-ready .fallback { opacity: 0; }
```

## 4. Intégration

- `<img>` avec `width`/`height`, `alt` qui décrit la personne et le bijou (« Profil d'une femme dans la pénombre, une boucle d'oreille sculpturale »), `loading="lazy"` sauf l'image de repli du héros (`fetchpriority="high"`, `alt=""` car le conteneur `role="img"` porte déjà la description).
- Formats : AVIF/WebP via `<picture>` ou CDN ; portrait nuit ≤ 300 Ko.
- Repli : `background: var(--night)` / `var(--night-2)` sur chaque conteneur photo ; le titre reste lisible (`--on-night` 15,8:1).
- **React Native / Expo** : `expo-image` (`contentFit="cover"`, `placeholder` blurhash, `transition={300}`) ; le virage bleu-gris se fait dans l'image source (pas de `mix-blend-mode` en natif) ; le fondu par `expo-linear-gradient` en `absoluteFill`.

## 5. 3D — recette complète

- **Quoi** : un bijou d'oreille sculptural, trois brins entrelacés (or jaune épais, chrome fin, or blanc très fin) terminés par des perles. Dans la démo, il est **procédural** : `TubeGeometry` le long d'une `CatmullRomCurve3`, rayon modulé (fin aux extrémités, plein au milieu) et section qui ondule (bruit sinusoïdal doux) pour un aspect coulé main, puis `computeVertexNormals()` et soudure de la couture. Variante plus simple : `TorusKnotGeometry` déformée par bruit, ou `LatheGeometry` torsadée.
- **Matières** : `MeshPhysicalMaterial` `metalness: 1` ; or `roughness .16`, `clearcoat .6` ; chrome `roughness .06`, `clearcoat 1` ; or blanc `roughness .22`. Couleurs **lues dans les tokens** (`getComputedStyle(...).getPropertyValue('--gold')`), jamais en dur.
- **Lumière** : `scene.environment` = `RoomEnvironment` via `PMREMGenerator` (indispensable : un métal sans environnement est noir), une directionnelle clé (3, 4, 5) intensité 2,2, un contre-jour (-4, 1, -3) intensité 1,2 ; `ACESFilmicToneMapping`, exposition 1,1 ; fond transparent (`alpha: true`) pour laisser voir filets et cercle.
- **Caméra** : perspective 35°, z = 8 (reculée si la colonne est plus haute que large) ; la pièce mesure ~3,3 unités de haut.
- **Interaction** : glisser horizontal = rotation (avec inertie), inclinaison légère selon la position verticale du pointeur, rotation lente automatique + flottement ; `touch-action: pan-y` pour ne pas bloquer le défilement mobile. **Titre d'or** : un événement `carat` change la couleur cible du matériau or (10K = `--gold` mêlé à 55 % de `--white-gold`, 14K = 30 %, 18K = `--gold`, 22K = `--gold` plus saturé) et la couleur glisse vers elle (`color.lerp(cible, .08)` par image). Pause hors écran (`IntersectionObserver`).
- **Modèles** : le `.glb` du projet (compressé Draco/Meshopt, ≤ 1,5 Mo), chargé par `GLTFLoader` + `DRACOLoader` ; remplacer les matériaux par ceux ci-dessus pour garder les tokens. Modèles libres pour maquetter : [Poly Pizza](https://poly.pizza) (CC0/CC-BY), [Sketchfab](https://sketchfab.com/search?features=downloadable&licenses=7c23a1ba438d4306920229c12afcb5f9&q=earring) (filtre CC, chercher « earring », « ring », « jewelry »), [Kenney](https://kenney.nl/assets) et [Quaternius](https://quaternius.com) (CC0, peu de bijoux). Vérifier la licence, créditer si CC-BY.
- **Web (React)** : React Three Fiber + drei : `<Canvas gl={{ alpha: true }}>`, `<Environment preset="studio" />` ou `<Environment><Lightformer …/></Environment>`, `<Float speed={1} rotationIntensity={.3}>`, `<PresentationControls>` pour le glisser, `useGLTF('/piece.glb')`.
- **React Native** : `expo-gl` + `@react-three/fiber/native` + `@react-three/drei/native` (`useGLTF` avec un asset local) ; sur appareil faible, une suite de rendus pré-calculés (24 vues) qu'on fait défiler au glisser.
- **Repli** : la photo sous le canvas reste visible si le module ne charge pas ou si WebGL manque (`.no-webgl`) ; avec `prefers-reduced-motion`, la scène est rendue une fois, sans rotation ni flottement, et se redessine seulement au glisser ou au changement de titre.
