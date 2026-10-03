# Chrome Atelier — images et 3D

> Les visuels font la moitié du style. **Jamais** de bijou, d'oreille ou de matière dessinés en CSS ou SVG : de **vraies photos** et une **vraie pièce en 3D** (ou sa vidéo). Restent dessinés, parce que ce sont des signes : le logo, les filets, les cercles, les arcs du chargement, la courbe de la galerie, le chevron.

## 1. Ce que montrent les images de référence (relevé le 2026-10-03)

| Emplacement (`data-slot`) | Sur la référence | Cadrage | Traitement |
|---|---|---|---|
| `hero-portrait` | gros plan d'une oreille d'homme portant la pièce chromée, peau éclairée de côté, fond bleu-gris très sombre | paysage, oreille au centre-droit, **gauche de l'image sombre et vide** pour le titre | aucun filtre ; voile `--night` à gauche, noir léger en haut et en bas |
| `spec-card` (×3) | mains gantées tenant la pièce, oreilles en très gros plan, pièce dans la paume | portrait 9:16 | voile noir en haut pour le libellé |
| `piece-3d` | la pièce seule : masse lisse et pliée, métal poli, en or jaune, blanc ou rose | sur blanc, au centre du cercle | reflets clairs, pas d'ombre portée |
| `press-photo` (×4) | photos des articles : pièce posée sur un galet, sur une main, sur une oreille | portrait 235 / 365 | voile noir à 34 % sous le logo blanc |
| `gallery` (×6 ou plus) | portraits de profil, oreilles avec la pièce, détails de mains ; tons chauds de peau, fonds neutres | 3:4, 4:5 et carrés mêlés | aucun |
| `faq-macro` | très gros plan de métal liquide or et chrome sur fond vert sombre | portrait ou carré | aucun |
| `waitlist-bg` | pièce sombre posée dans une lumière rasante | plein écran | opacité 50 % sur noir, vignette |

**Règle de cohérence** : deux mondes seulement — **peau et métal** en lumière douce (photos), **blanc et filets** (planche). Pas de décor, pas de couleur vive : la seule couleur vient de l'or et de la peau.

## 2. Où les trouver

1. **Les images du projet** : rendus 3D du produit sur fond blanc (un par finition), portraits portés, macros. Toujours en priorité.
2. **Banques gratuites** : [Unsplash](https://unsplash.com) (licence Unsplash, usage commercial permis). Mots-clés : « ear piercing close up », « ear cuff », « earring portrait dark », « silver jewelry hand », « liquid metal », « liquid gold », « chrome abstract ».
3. **Génération IA** — prompts de départ :
   - Héros : > *extreme close-up photo of a human ear wearing a sculptural liquid-chrome ear cuff, side light on skin, very dark blue-grey background, empty dark space on the left, shallow depth of field, 3:2, no text*
   - Pièce : > *studio render of a single sculptural ear cuff shaped like folded liquid metal, polished yellow gold, soft reflections, pure white background, no shadow, centered, 1:1, no text*
   - Macro : > *macro photo of molten gold and chrome flowing together, dark green background, sharp reflections, no text*
4. **À éviter** : bijoux de catalogue sur présentoir, fonds colorés, photos posées souriantes, pierres de couleur, rendus 3D mats.

## 3. La pièce en 3D

Le site joue une **séquence d'images** d'un rendu 3D au défilement. Trois façons de faire, de la plus fidèle à la plus légère :

| Option | Quand | Comment |
|---|---|---|
| **Modèle `.glb`** du produit | on a le fichier 3D | Three.js : `GLTFLoader`, `MeshStandardMaterial` métal (`metalness: 1`, `roughness` 0.06 à 0.12), environnement clair (`RoomEnvironment`), `envMapIntensity` 1.5, fond transparent |
| **Vidéo ou séquence** pré-rendue | on a seulement des rendus | une vidéo par finition, avancée avec `video.currentTime = p × durée`, ou 60 images par tour |
| **Volume procédural** (démo) | rien encore | trois joncs de métal entrelacés (un épais dans l'or choisi, un poli miroir, un fil fin), terminés par des perles : des tubes le long de courbes, plus épais au milieu, à section légèrement ondulée ; à remplacer dès que le modèle existe |

```js
const METALS = ['--gold', '--white-gold', '--rose'].map(n => new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue(n).trim()));
const mat = new THREE.MeshStandardMaterial({ color: METALS[0].clone(), metalness: 1, roughness: .1, envMapIntensity: 1.5 });
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.03).texture;
// à chaque rendu : mat.color.lerp(METALS[cible], .12)
```
Règles : rendu **à la demande** (voir `motion.md`, « Performance »), rapport de pixels ≤ 1,5, repli photo si WebGL manque, `role="img"` et `aria-label` sur le conteneur.

## 4. Traitements (code)

```css
/* Héros : assombrir la gauche pour le titre, garder le bijou net */
.hero__photo::after { background:
  linear-gradient(90deg, var(--night) 4%, color-mix(in srgb, var(--night) 72%, transparent) 34%, color-mix(in srgb, var(--black) 18%, transparent) 62%, color-mix(in srgb, var(--black) 46%, transparent)),
  linear-gradient(180deg, color-mix(in srgb, var(--black) 34%, transparent), transparent 30%, transparent 70%, color-mix(in srgb, var(--black) 55%, transparent)); }
/* Carte : voile haut pour le libellé */
.spec-card::after { background: linear-gradient(180deg, color-mix(in srgb, var(--black) 55%, transparent), transparent 42%); }
/* Presse : photo révélée dans la cellule active */
.press__row img { opacity: 0; transform: scale(1.06); }
.press__row button[aria-pressed="true"] img { opacity: 1; transform: none; }
```

## 5. Intégration

- Vrai `alt` sur le héros, les cartes et la galerie ; `alt=""` sur les photos de presse (le bouton porte le logo) et sur le fond de la liste d'attente.
- `object-position` du héros réglé pour garder le bijou sous le centre des cercles (`--cx`, `--cy`).
- Poids : héros 2000px ≤ 350 Ko ; cartes 760 × 1350 ; galerie 800px ; tout sauf le héros en `loading="lazy"`.
- **React Native / Expo** : `expo-image` ; pièce en vidéo (`expo-video`) ou `expo-gl` + three ; filets et cercles avec `react-native-svg`.
