# Cosmic Voyage — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo, un personnage, une planète ou un ciel : on utilise de vraies images (illustrations du projet, photos d'espace, rendus) et une vraie scène 3D pour le fond. Les ornements (étoile ✦, filets dorés, coin arrondi) restent en CSS.

## 1. Ce que montrent les images

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `space-3d` (fond fixe) | Scène Three.js : étoiles, nébuleuse en particules, planète annelée ; dessous, photo de nébuleuse | Plein écran fixe ; planète au tiers droit du héros (en haut, réduite à 70 % sur mobile) | Nuit profonde, soleil chaud venant du haut gauche | Photo à 70 % d'opacité (28 % quand la 3D est prête) + fondu `--bg` en bas |
| `key-art` (héros, si le projet en a) | Illustration de l'équipage / du véhicule (train, vaisseau) | Plein écran 16:9, personnages à droite, ciel à gauche pour le logo | Contre-jour doré, ciel bleu nuit | Voile noir dégradé à gauche (`.hero__veil`) |
| `character-art` (panneau) | Le personnage, ou à défaut sa « destination » (planète, station, nébuleuse) | Paysage 3:2 qui remplit la colonne droite du panneau, déborde aux bords | Bleu acier + une source chaude | Masque en dégradé vers la gauche (fondu dans le verre) + bande sombre en bas pour les citations |
| vignettes du carrousel | Visage / buste du personnage | Carré 1:1, 52px | Identique | Aucun ; bordure `--gold` si active |
| `news-thumb` | Bannière d'événement : nébuleuse, station, planète, personnage | Bandeau 196:64 (16:6 sur mobile) | Saturation modérée, bleus et ors | Zoom 1.05 au survol |

**Règle de cohérence** : palette nuit + bleu acier + or ; une image trop chaude (rouge, orange vif) est refroidie ou évitée, jamais de couleurs néon.

## 2. Où les trouver

1. **Les images du projet** : illustrations PNG détourées des personnages, key art, bannières d'événements. Toujours en priorité.
2. **Banques gratuites** : [Unsplash](https://unsplash.com), [Pexels](https://www.pexels.com), et les archives publiques **NASA / ESA / ESO** (domaine public ou CC-BY selon l'agence : vérifier et créditer). Mots-clés :
   - FR : « nébuleuse », « voie lactée », « station spatiale », « Terre depuis l'orbite », « galaxie spirale », « ciel étoilé ».
   - EN : « nebula », « milky way », « space station orbit », « earth from space », « spiral galaxy », « deep space starfield », « Hubble », « JWST ».
3. **Génération IA** — prompts de départ :
   - fond / repli :
     > Deep space panorama, soft blue and violet nebula with a few warm gold highlights, thousands of tiny sharp stars, dark navy background, cinematic, high dynamic range, 16:9, no planets in the center, no text, no logo
   - `character-art` :
     > Elegant science-fantasy character, interstellar cartographer in a long coat, standing in a train observation car with a galaxy outside the window, steel blue and gold palette, soft rim light, anime-inspired semi-realistic illustration, 3:2, no text, no logo
   - `news-thumb` :
     > Wide banner of a ringed gas giant rising over a glowing nebula, steel blue and gold, painterly sci-fi concept art, 3:1, no text, no logo
4. **À éviter** : illustrations, logos ou emblèmes d'un jeu existant ; images arc-en-ciel ou néon ; vues d'artiste « clipart » de planètes ; planètes et étoiles dessinées en CSS (dégradés radiaux) à la place d'une image ou de la 3D.

## 3. Traitements (code)

```css
/* Fond fixe : 3D au-dessus d'une photo de nébuleuse */
.space { position: fixed; inset: 0; z-index: -1; background: var(--bg); overflow: hidden; }
.space canvas { position: absolute; inset: 0; }
.space .fallback { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .7; transition: opacity 1.2s var(--ease); }
.space.is-3d-ready .fallback { opacity: .28; }          /* la photo reste en fond lointain sous les particules */
.space::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, var(--bg)); opacity: .6; }

/* Illustration fondue dans le verre du panneau */
.art { position: relative; overflow: hidden; border-radius: var(--radius-card); background: var(--glass); }
.art img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 35%); mask-image: linear-gradient(90deg, transparent, #000 35%); }
.art::after { content: ""; position: absolute; inset: 0; background: linear-gradient(0deg, var(--quote-strip), transparent 45%); }
```

(Les `#000` des masques ne sont pas des couleurs affichées : seule l'opacité compte.)

## 4. Intégration

- `<img>` avec `width`/`height`, `alt` qui décrit l'image (« Station spatiale aux panneaux dorés sur fond noir »), `loading="lazy"` sauf la photo de fond (`fetchpriority="high"`). Le fond 3D et sa photo sont décoratifs : conteneur `aria-hidden="true"`, `alt=""`.
- Changement de personnage : fondu + glissement de 40px, puis changement de `src`/`alt` de l'image du panneau.
- Formats : AVIF/WebP via `<picture>` ou un CDN ; photo de fond ≤ 300 Ko (elle est floue de toute façon à 28 %).
- Repli : chaque conteneur a un fond token (`--bg`, `--glass`, `--surface-2`) ; sans image ni WebGL, la page reste une nuit bleu marine lisible.
- **React Native / Expo** : `expo-image` (`contentFit="cover"`, `placeholder` blurhash, `transition={300}`) ; fondu du panneau avec `expo-linear-gradient` + `@react-native-masked-view/masked-view`.

## 5. 3D — recette (attendue)

- **Quoi** : un ciel 3D fixe derrière toute l'interface. (1) **Champ d'étoiles** : ~3 200 points blancs (`--text`) + 500 dorés (`--gold`) sur une coquille sphérique de rayon 18–58 autour de la caméra, sprite rond doux. (2) **Nébuleuse** : ~2 600 particules en nuage aplati (distribution gaussienne), couleurs mélangées entre `--glass`, `--link` et 18 % de `--gold`, `AdditiveBlending`, opacité 0,32, taille 1,1. (3) **Planète gazeuse** : sphère avec texture à bandes générée sur un canvas à partir de `--glass` / `--text-soft` / `--bg`, atmosphère en fresnel (`ShaderMaterial`, couleur `--link`, additive), **anneau doré** (`RingGeometry` dont on remappe les UV en radial, texture de bandes `--gold` avec une division sombre), inclinée de ~18°.
- **Matières et lumière** : `MeshStandardMaterial` rugosité 0,9 pour le globe ; lumière directionnelle `--accent-sand` intensité 2,6 depuis le haut gauche (le « soleil »), ambiante `--glass` à 0,35 ; tone mapping ACES, sortie sRGB.
- **Caméra** : perspective 35°, z = 9, `lookAt(0,0,0)`. La planète est placée en coordonnées calculées depuis le cadre visible (tiers droit sur desktop, haut et ×0,7 en portrait).
- **Interaction** : au défilement la planète monte et sort du cadre (`scrollY / innerHeight × 3,2`), le ciel tourne légèrement ; parallaxe douce de la caméra au pointeur (±0,6) ; rotation lente du globe (0,08 rad/s).
- **Couleurs** : toutes lues dans les tokens via `getComputedStyle(document.documentElement)` → `new THREE.Color(...)`. Aucune couleur en dur.
- **Modèles** : la planète procédurale suffit ; pour un vaisseau, un train ou une station : `.glb` du projet (Draco/Meshopt), ou libres sur [Poly Pizza](https://poly.pizza) (CC0/CC-BY), [Kenney Space Kit](https://kenney.nl/assets/space-kit) (CC0), [Quaternius](https://quaternius.com) (CC0), [NASA 3D Resources](https://science.nasa.gov/3d-resources/) ; vérifier la licence, créditer si CC-BY. Textures de planètes réelles : [Solar System Scope](https://www.solarsystemscope.com/textures/) (CC-BY).
- **Web** : Three.js r170 (importmap jsDelivr) comme dans la démo, ou React Three Fiber + drei : `<Stars radius={40} depth={40} count={3000} factor={3} fade />`, `<Points>` pour la nébuleuse, `<Sphere>` + `<Ring>`, `useScroll` pour le défilement.
- **React Native** : `expo-gl` + `@react-three/fiber/native` (+ `@react-three/drei/native`), nombre de particules divisé par 3 ; ou une image pré-rendue de la scène si l'appareil est faible.
- **Repli** : la photo de nébuleuse (`.fallback`) sous le canvas, opaque si WebGL est absent (`.no-webgl`) ; avec `prefers-reduced-motion`, la scène est rendue une fois puis seulement au défilement (aucune animation continue, pas de parallaxe).
