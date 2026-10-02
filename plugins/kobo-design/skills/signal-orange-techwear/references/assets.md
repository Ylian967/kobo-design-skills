# Signal Orange Techwear — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo, un personnage ou un objet : on utilise de vraies images (photos de mode, packshots) et, si le projet en a un, un vrai mannequin 3D.

Le style est un HUD de nuit : les photos y entrent **éteintes** (noir et blanc, sombres, contrastées) et c'est l'interface qui leur rend la seule couleur, l'orange signal, en halo et en reflet. Une photo colorée et lumineuse casse immédiatement la règle « une seule couleur ».

## 1. Ce que montrent les images

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `model-photo` | Mannequin en pied (ou à mi-cuisse) portant la pièce phare : coque longue, capuche, sangles | Vertical 3:4, sujet centré, tête dans le quart haut, **fond uni ou mur nu** (le fond est fondu en masque) | Nuit, lumière latérale dure ou néon unique, ombres profondes | N&B contrasté et assombri, halo `--accent-glow` en `screen`, masque radial qui fond le décor dans la page |
| `product-thumb` | Détail produit : semelle, laçage, boucle, fermeture | Carré 1:1, très serré | Lumière rasante qui révèle la matière | Même N&B sombre |
| `product-*` (cartes) | Une pièce par carte, portée (dos, profil, détail) ou posée sur fond sombre | 4:5, pièce entière, un peu d'air autour | Sombre, urbaine (béton, rails, briques, parking) | Même N&B ; au survol, la couleur revient à 40 % |
| `lookbook-*` (option) | Silhouette en mouvement dans la ville de nuit | 16:9 ou 21:9 | Pluie, lampadaires, longue pose | N&B + lueur orange en bas de cadre |

**Règle de cohérence** : **aucune couleur ne vient de la photo**. Toutes les images passent par le même filtre (N&B, contraste +15 %, luminosité −22 %) ; l'orange n'existe que dans l'interface (halo, étiquettes, filets). Les vêtements photographiés sont noirs, gris ou kaki foncé.

## 2. Où les trouver

1. **Les images du projet** (shooting de la collection, packshots) : toujours en priorité. Demander au photographe un fond uni sombre et une lumière latérale, plus une version détourée du mannequin (PNG/WebP transparent) pour le héros.
2. **Banques gratuites** : [Unsplash](https://unsplash.com) et [Pexels](https://www.pexels.com) (licences gratuites, usage commercial permis ; créditer le photographe est apprécié). Mots-clés qui marchent :
   - FR : « veste technique noire », « homme manteau long noir mur », « pantalon cargo noir rue », « hoodie noir brique », « mode urbaine nuit ».
   - EN : « techwear », « black tactical jacket », « man long black coat concrete wall », « cargo pants street night », « black hoodie brick wall », « urban ninja fashion », « dark streetwear editorial ».
3. **Génération IA** (Midjourney, Flux, DALL·E, Firefly…) — prompts de départ :
   - Héros :
     > Full-body fashion photograph of a model wearing black techwear: long waterproof shell coat with hood up, modular chest straps, tapered cargo pants, chunky black boots, face partly covered by a dark mask, standing straight facing camera, plain dark concrete background, single hard side light, deep shadows, monochrome, high contrast, 85mm lens, editorial look, no logo, no text, 3:4
   - Carte produit :
     > Studio product photo of a black technical jacket with taped seams and matte buckles, worn by a faceless model seen from behind, dark grey seamless background, low-key lighting with rim light, black and white, sharp fabric texture, no logo, no text, 4:5
   - Détail :
     > Macro photograph of a black trail sneaker sole and quick-lace toggle, raking light on ballistic mesh, dark background, monochrome, high contrast, no brand marks, square
4. **À éviter** : photos colorées ou en plein jour, sourires et poses de catalogue, logos de marques visibles, néons roses/cyans (le style n'a qu'une couleur), images ou produits du concept d'origine, mannequins détourés grossièrement.

## 3. Traitements (code)

```css
/* Conteneur : repli = halo anthracite en tokens */
.shot { position: relative; overflow: hidden; isolation: isolate;
  background: radial-gradient(circle at 50% 45%, var(--panel-2), var(--bg) 75%); }
.shot img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
  color: transparent;                                     /* masque le texte alt si l'image ne charge pas */
  filter: grayscale(1) contrast(1.15) brightness(.78); }  /* sombre et désaturé */

/* Accent orange : lueur en bas de cadre + reflet en haut à droite, en screen (n'éclaire que les ombres) */
.shot::after { content: ""; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(0deg, var(--accent-glow), transparent 45%),
              radial-gradient(circle at 85% 15%, var(--accent-glow), transparent 40%);
  mix-blend-mode: screen; }

/* Mannequin du héros : le décor se fond dans le quadrillage */
.model .shot { background: transparent;
  -webkit-mask-image: radial-gradient(ellipse 62% 72% at 50% 46%, black 55%, transparent 100%);
          mask-image: radial-gradient(ellipse 62% 72% at 50% 46%, black 55%, transparent 100%); }

/* Variante duotone stricte (anthracite → orange) pour un visuel de campagne */
.shot--duotone img { filter: grayscale(1) contrast(1.2); mix-blend-mode: multiply; }
.shot--duotone { background: var(--accent); }
.shot--duotone::before { content: ""; position: absolute; inset: 0; z-index: 1; background: var(--bg); mix-blend-mode: lighten; }

/* Survol d'une carte : un peu de couleur revient */
.card a:hover .shot img { filter: grayscale(.6) contrast(1.15) brightness(.85); transform: scale(1.07) rotate(-1deg); }
```

Avec un **mannequin détouré** (PNG/WebP transparent), supprimer le masque radial : le sujet se pose directement sur le quadrillage et le halo orange, avec une ombre au sol (`radial-gradient` `--bg`).

## 4. Intégration

- `<img>` avec `width`/`height` ou `aspect-ratio`, `alt` qui décrit la pièce portée (« Homme en long manteau noir devant un mur gris »), `loading="lazy"` sauf le mannequin du héros (`fetchpriority="high"`).
- Formats : AVIF/WebP via `<picture>` ou un CDN d'images ; héros ≤ 300 Ko (le N&B se compresse bien).
- Couleur de repli = `--bg` / `--panel-2` en dégradé : la page reste un HUD lisible sans image.
- Les étiquettes posées sur une photo (`.tag`) ont un fond `--scrim` : l'orange reste lisible quelle que soit l'image.
- **React Native / Expo** : `expo-image` (`contentFit="cover"`, `placeholder` blurhash, `transition={300}`) ; le N&B se fait en amont (images exportées en N&B) ou avec `react-native-color-matrix-image-filters` (`Grayscale`) ; la lueur orange = `expo-linear-gradient` par-dessus.

## 5. 3D

Optionnelle, mais naturelle pour ce style : **remplacer la photo du héros par un mannequin 3D** qu'on fait tourner comme sur un écran d'opérateur.

- **Quoi** : un mannequin (ou la pièce seule sur un buste) en `.glb`, vêtements noirs mats, avec une ou deux pièces d'équipement (boucles, filets réfléchissants) qui portent l'accent.
- **Matières** : tissus en `MeshStandardMaterial` couleur `--panel-2`, rugosité 0.85 ; boucles et zips en métal sombre (métal 1, rugosité 0.35) ; bandes réfléchissantes en `--accent` avec `emissive` `--accent` à 0.4. Toutes les couleurs lues dans les tokens (`getComputedStyle`).
- **Lumière** : fond transparent sur `--bg`, une `DirectionalLight` latérale dure (blanche), un contre-jour `PointLight` couleur `--accent` derrière l'épaule (c'est le halo de la page), `RoomEnvironment` très faible (0.2), tone mapping ACES, ombre au sol en `ContactShadows`.
- **Caméra** : focale longue (fov 25–30), cadrage en pied, légère contre-plongée.
- **Interaction** : rotation lente sur Y (une révolution en ~20 s), glisser pour tourner (`OrbitControls` limité à l'azimut, sans zoom ni pan) ; la ligne de scan `.scan` reste en HTML par-dessus le canvas ; l'interrupteur « Profondeur » coupe le contre-jour orange.
- **Modèles libres** : [Sketchfab](https://sketchfab.com/search?features=downloadable&licenses=7c23a1ba438d4306920229c12afcb5f9&q=techwear) (filtre CC, chercher « techwear », « cyberpunk outfit »), [Quaternius](https://quaternius.com) (personnages CC0 à rhabiller), [Poly Pizza](https://poly.pizza) (CC0/CC-BY) ; pour un mannequin sur mesure : [Ready Player Me](https://readyplayer.me) ou un export CLO3D/Marvelous Designer de la vraie collection. Vérifier la licence et créditer si CC-BY. Compresser (Draco ou Meshopt via `gltf-transform`), viser < 3 Mo.
- **Web** : Three.js (`GLTFLoader` + `DRACOLoader`) ou React Three Fiber + drei (`useGLTF`, `Environment`, `ContactShadows`, `PresentationControls`).
- **React Native** : `expo-gl` + `@react-three/fiber/native` + `@react-three/drei/native` ; sur appareil modeste, une séquence de 24 images pré-rendues qu'on fait défiler au glissement.
- **Repli** : la photo N&B du mannequin, au même cadrage, sous le canvas (fondu à l'arrivée de la 3D) ; affichée seule si WebGL est absent ou si `prefers-reduced-motion` est actif (pas de rotation automatique).
