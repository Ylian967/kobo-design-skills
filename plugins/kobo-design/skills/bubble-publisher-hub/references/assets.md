# Bubble Publisher Hub — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo, un personnage ou un objet : on utilise de vraies images (visuels de jeux, captures, photos de joueurs) et, si besoin, un rendu 3D. Ce qui reste dessiné : la forme de bulle elle-même, les pictogrammes au trait rouge, les grands contours translucides de la section club et les aplats du collage.

## 1. Ce que montrent les images

Sur un vrai portail d'éditeur, ces emplacements reçoivent les **key arts et captures des jeux** du catalogue. En maquette : photos de jeu vidéo « pop » — manettes, joueurs, salles d'arcade, néons.

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `manifesto-visual` | Des gens qui jouent ensemble (la communauté, pas un produit) | 4:3 dans une bulle, sujets au centre-bas, haut droit libre pour la bulle-slogan rouge | Chaleureuse, intérieure, couleurs franches | Masque bulle (rayon `--radius` + queue), aucune retouche couleur |
| `featured-game` | Key art du jeu à la une | Plein cadre ≈ 700px de haut, 16:9 → 21:9 ; sujet **à gauche**, tiers droit calme pour la pile d'encarts | Vive, saturée, contraste fort | Plein cadre, léger dégradé sombre à droite seulement si l'image est claire |
| `playtest` | Ambiance d'atelier ou de salle de jeu sombre | Plein cadre ≈ 460px, détail lumineux à droite | Sombre, néon | Dégradé `--ink` → transparent de gauche à droite (60 %) pour le texte blanc |
| `release-1…n` | Jaquette / capture de chaque sortie | 4:3, sujet au centre-haut (le bas porte le nom et la date) | Couleurs du jeu | Masque bulle, dégradé noir sur le bas (45 %), zoom 1,04 au survol |
| Collage (fenêtre d'inscription) | 3–4 vignettes de jeux mêlées aux aplats noirs/rouges | Carré 1:1, tournées de -15° | Variées mais saturées | Coins arrondis différents par tuile (forme de bulle) |

**Règle de cohérence** : des images **franches, saturées et lumineuses**, toujours enfermées dans une bulle (ou plein cadre sous une bulle) ; jamais d'image posée sans rayon, jamais de filtre N&B ni de teinte qui écraserait le rouge de marque.

## 2. Où les trouver

1. **Les images du projet** : key arts, captures et jaquettes fournis par les studios. Toujours en priorité.
2. **Banques gratuites** : [Unsplash](https://unsplash.com) et [Pexels](https://www.pexels.com) (usage commercial permis, créditer est apprécié).
   - FR : « amis jouent console », « manette fond coloré », « salle d'arcade néon », « enseigne arcade », « joueurs canapé télé ».
   - EN : « friends playing video games », « gamepad colorful background », « arcade neon », « arcade sign », « couch co-op gaming ».
3. **Génération IA** — prompts de départ :
   - Manifeste : > Two friends laughing on a couch holding game controllers, lit by the glow of a TV, warm living room, candid moment, vivid colors, 35mm photo, shallow depth of field, no logos, no text.
   - Jeu à la une : > Bright stylized key art of a young adventurer leaping across floating islands, saturated sky, bold rim light, character on the left third, empty calm area on the right, game cover style, no text, no logo.
   - Playtest : > Dark game studio test room, a single player silhouetted in front of a glowing monitor, magenta and cyan neon accents, moody, cinematic, no text.
   - Carte de sortie : > Colorful game cover illustration, cute creature explorer in a jungle, centered subject, clean background at the bottom, vibrant palette, no title, no logo.
4. **À éviter** : jaquettes ou personnages de jeux existants, logos de consoles ou d'éditeurs, photos de stock « gamer en sueur avec casque RGB », images froides et désaturées, images au texte incrusté.

## 3. Traitements (code)

```css
/* Image-bulle : l'image prend les coins arrondis, la queue est un triangle de couleur token */
.bubble-media { position: relative; border-radius: var(--radius); background: var(--text); }   /* repli */
.bubble-media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius); }
.bubble-media::after { content: ""; position: absolute; left: 0; bottom: calc(var(--tail) * -1 + 1px);
  width: var(--tail); height: var(--tail); background: var(--bubble-bg, var(--ink)); clip-path: polygon(0 0, 100% 0, 0 100%); }

/* Carte de sortie : dégradé de lisibilité en bas + zoom au survol */
.card__img { position: absolute; inset: 0; border-radius: var(--radius); overflow: hidden; background: var(--text); }
.card__img img { width: 100%; height: 100%; object-fit: cover; transition: transform var(--dur) var(--ease); }
.card__img::after { content: ""; position: absolute; inset: 55% 0 0; background: linear-gradient(transparent, rgb(0 0 0 / .75)); }
.card:hover .card__img img { transform: scale(1.04); }

/* Plein cadre sombre (playtest) : voile latéral pour le texte blanc */
.playtest__bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.playtest::before { content: ""; position: absolute; inset: 0; z-index: 1; background: linear-gradient(90deg, rgb(0 0 0 / .8), transparent 65%); }

/* Tuile du collage : forme de bulle variable */
.collage .tile { position: absolute; width: 140px; height: 140px; transform: rotate(-15deg); border-radius: 50% 50% 12px 50%; overflow: hidden; background: var(--ink); }
.collage .tile img { width: 100%; height: 100%; object-fit: cover; transform: rotate(15deg) scale(1.3); } /* contre-rotation : l'image reste droite */
```

## 4. Intégration

- `<img>` avec `width`/`height`, `alt` descriptif en français, `loading="lazy"` sauf l'image visible au chargement (manifeste : `fetchpriority="high"`).
- Formats : AVIF/WebP via `<picture>` ou CDN ; plein cadre ≤ 300 Ko, cartes ≤ 120 Ko.
- Couleur de repli : `background: var(--text)` (ou `--ink`) sur chaque conteneur d'image ; les encarts-bulles blancs restent lisibles quel que soit le fond.
- Collage décoratif : `aria-hidden="true"` sur le conteneur, `alt=""` sur ses images.
- **React Native / Expo** : `expo-image` (`contentFit="cover"`, `placeholder={{ blurhash }}`, `transition={300}`) dans une `View` à `borderRadius: 12, overflow: 'hidden'` ; la queue est une `View` triangle en `position: 'absolute'` hors du conteneur masqué ; dégradés avec `expo-linear-gradient`.

## 5. 3D

**Optionnelle.** Le style vit des key arts et des bulles. Usage sobre possible : sur la page d'un jeu ou dans la section club, une **mascotte ou une manette en 3D** posée dans une bulle blanche, qui suit légèrement le pointeur (±15°) et rebondit une fois à l'apparition. Matières mates (`MeshStandardMaterial`, rugosité 0,6), couleurs lues dans `--red` et `--ink`, `RoomEnvironment` + une lumière directionnelle douce, caméra 35° de face.

- Web : Three.js (`GLTFLoader`) ou React Three Fiber + drei (`useGLTF`, `Float`, `Environment`).
- Modèles libres : [Kenney](https://kenney.nl/assets) (manettes, personnages, CC0), [Poly Pizza](https://poly.pizza) (CC0/CC-BY), [Quaternius](https://quaternius.com) (CC0). Vérifier la licence, créditer si CC-BY.
- React Native : `expo-gl` + `@react-three/fiber/native`, sinon image pré-rendue.
- Repli : une image fixe de la mascotte dans la même bulle si WebGL est absent ou `prefers-reduced-motion` actif.
