# Epic JRPG Product — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo, un personnage ou un objet : on utilise de vraies images (visuels clés du jeu, captures, rendus, photos) et, si besoin, un rendu 3D. Seuls les ornements en losanges, le filet multicolore et les motifs du pied de page restent en SVG/CSS.

## 1. Ce que montrent les images

Sur une vraie page de jeu, ces emplacements reçoivent les **visuels officiels du jeu** (key art, captures, rendus de l'édition). Pour une démo ou une maquette, on prend des photos d'ambiance « fantasy épique » : feu, braises, armure, silhouettes à contre-jour.

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `key-visual` (héros) | Groupe de héros (key art) ; en démo : silhouette à contre-jour devant une lumière orange | Plein cadre 16:9 desktop, 4:5 mobile ; sujet centré, haut du cadre libre, bas sombre pour le titre | Nuit, contre-jour chaud, braises | Fondu vers `--bg` sur le tiers bas + vignette, légère chaleur |
| `trailer` | Image d'attente de la bande-annonce : personnage ou armure en plan rapproché | 16:9, coins `--radius-xs`, sujet au centre (le bouton lecture le recouvre) | Clair-obscur, fond rouge sombre | Voile `--scrim` léger pour faire ressortir le bouton blanc |
| `feature-1`, `feature-2`… | Une capture par caractéristique (combat, exploration, personnage) | 16:9, sujet au tiers opposé à la plaque dorée | Action, feu, contraste fort | Image nette ; les photos N&B passent en **duotone braise** |
| `edition-art` | Visuel de l'édition (coffret, jaquette, contenu) | 16:9, objet centré sur fond sombre | Studio sombre, reflets chauds | Aucun, ou vignette douce |
| Fond « lave » (page Acheter, newsletter) | Braises / roche incandescente, flammes sur noir | Plein écran, `object-fit: cover` | Rouge-orange profond sur noir | Opacité 0,3 sur `--lava` + deux halos radiaux (braise, rouge) |
| Fond « braises » des sections | Texture de braises / particules incandescentes | Plein cadre, fixe ou très étiré | Points orange sur noir | Opacité 0,25–0,35 sous un dégradé `--bg-warm` |

**Règle de cohérence** : toutes les images sont **chaudes et sombres** (noir, rouille, orange, or) — jamais de ciel bleu vif, de lumière de jour plate ni de couleurs pastel ; le texte n'est jamais posé directement sur une zone claire de l'image.

## 2. Où les trouver

1. **Les images du projet** : key art, captures in-game, rendus des éditions fournis par l'éditeur. Toujours en priorité (et seulement si on a le droit de les utiliser).
2. **Banques gratuites** : [Unsplash](https://unsplash.com) et [Pexels](https://www.pexels.com) (usage commercial permis, créditer est apprécié).
   - FR : « braises nuit », « chevalier armure », « silhouette contre-jour feu », « flammes fond noir », « épée médiévale ».
   - EN : « embers night », « knight armor dark », « silhouette fire backlight », « flames black background », « medieval sword dramatic ».
3. **Génération IA** — prompts de départ :
   - Héros : > Epic fantasy key art, a small group of adventurers seen from behind on a cliff, facing a burning sky, glowing embers drifting in the air, warm orange and deep red backlight, dark foreground, cinematic wide shot, painterly JRPG style, no text, no logo.
   - Bande-annonce : > Close-up of an ornate steel knight helmet in a dark forge, warm rim light, sparks in the air, deep crimson background, shallow depth of field, cinematic still, no text.
   - Caractéristique : > Dynamic battle scene, a swordsman slashing through a wall of fire, motion blur on the blade, embers exploding, dark night, high contrast orange and black, game screenshot look, no UI, no text.
   - Édition : > Collector's edition box with a gold embossed emblem on black leather, artbook and steelbook beside it, dark studio, warm spotlight, product shot, no brand names.
4. **À éviter** : key art ou personnages d'un jeu existant, logos d'éditeurs/plateformes, photos de cosplay reconnaissables, stock « gamer souriant », fonds blancs, images froides (bleu/vert dominant).

## 3. Traitements (code)

```css
/* Conteneur commun : couleur de repli = token */
.media { position: relative; overflow: hidden; background: var(--bg-warm); }
.media img { display: block; width: 100%; height: 100%; object-fit: cover; }

/* Héros : fondu vers le noir + vignette (lisibilité du titre) */
.hero .media::after { content: ""; position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 40%, var(--bg) 96%),
              radial-gradient(80% 70% at 50% 40%, transparent 50%, var(--scrim)); }

/* Duotone « braise » pour une photo N&B : la photo en gris, l'or et la braise par-dessus */
.media--ember img { filter: grayscale(1) contrast(1.15) brightness(.9); }
.media--ember::after { content: ""; position: absolute; inset: 0; background: var(--ember); mix-blend-mode: multiply; opacity: .55; }
.media--ember::before { content: ""; position: absolute; inset: 0; z-index: 1; background: var(--gold); mix-blend-mode: soft-light; opacity: .35; }

/* Texture de braises derrière les sections */
.embers { position: relative; background: var(--bg-warm); isolation: isolate; }
.embers > .embers__bg { position: absolute; inset: 0; z-index: -1; width: 100%; height: 100%; object-fit: cover; opacity: .3; }

/* Image d'attente de la vidéo : voile pour le bouton lecture */
.video img { filter: brightness(.8); }
```

## 4. Intégration

- `<img>` avec `width`/`height` (ou `aspect-ratio` sur le conteneur), `alt` qui décrit l'image en français, `loading="lazy"` sauf le héros (`fetchpriority="high"`, pas de lazy).
- Héros : `<picture>` avec une source 4:5 pour le mobile (`media="(max-width: 767px)"`), AVIF/WebP, ≤ 300 Ko.
- Image décorative (texture de braises) : `alt=""` et `aria-hidden="true"`.
- Couleur de repli : `background: var(--bg-warm)` (ou `--bg`) sur chaque conteneur ; le titre du héros reste blanc sur noir si l'image manque.
- Vidéo : l'image d'attente est un `<img>` (ou l'attribut `poster`), remplacée au clic par `<video>` ou l'iframe.
- **React Native / Expo** : `expo-image` (`contentFit="cover"`, `placeholder={{ blurhash }}`, `transition={300}`) ; fondu du héros avec `expo-linear-gradient` (`['transparent', tokens.bg]`) ; duotone : superposer une `View` `backgroundColor: tokens.ember, opacity: .5` (pas de `mix-blend-mode` en natif, ou pré-traiter l'image).

## 5. 3D

**Optionnelle.** Le style vit des visuels clés et des captures, pas de la 3D. Usage sobre et utile : dans le module d'achat, remplacer le visuel de l'édition par le **coffret collector en 3D** (`.glb` fourni par l'éditeur) qu'on fait pivoter au glisser, sur fond `--bg-warm`, éclairé par une lumière chaude rasante (`DirectionalLight` couleur lue dans `--gold`) et l'environnement `RoomEnvironment`. Rotation limitée à ±30°, pas d'auto-rotation rapide.

- Web : Three.js (`GLTFLoader` + `DRACOLoader`) ou React Three Fiber + drei (`useGLTF`, `PresentationControls`, `Environment`).
- Modèles d'appoint libres : [Poly Pizza](https://poly.pizza) (coffres, épées, CC0/CC-BY), [Quaternius](https://quaternius.com) (CC0), [Kenney](https://kenney.nl/assets) (CC0). Vérifier la licence, créditer si CC-BY.
- React Native : `expo-gl` + `@react-three/fiber/native`, sinon image fixe.
- Repli : l'image `edition-art` reste dessous, visible si WebGL est absent ou si `prefers-reduced-motion` est actif.
