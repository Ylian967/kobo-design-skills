# Arena Guide — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo, un héros, un bâtiment ou une carte : on utilise de vraies images (captures, cinématiques, splash arts, photos). Les éléments graphiques du style (anneaux de camp, losanges, filets, dégradé du bouton) restent en CSS.

## 1. Ce que montrent les images

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `cinematic` (héros) | Image ou boucle vidéo de cinématique : forteresse, héros face au danger | Plein cadre ≈ 3:1 desktop, sujet au tiers droit (le texte est à gauche) | Crépuscule mauve ou bleu, lumière dorée sur le sujet | Voile `rgb(10 20 40 / .92)` → transparent de gauche à droite |
| `panorama` (sortie de l'intro blanche) | Paysage large : vallée, château, montagnes | Bandeau ≈ 5:1, horizon au milieu | Jour clair en haut, ombres en bas | Fondu `--paper` en haut, fondu `--bg` en bas |
| `what-backdrop` | Ambiance du jeu : arène, scène, partie en cours | 16:9 en fond de section | Faisceaux, bleu froid | `blur(6px) saturate(.8)` + radial nuit (texte centré dessus) |
| `map` (derrière le grand médaillon) | Carte de jeu vue de dessus, ou à défaut un terrain (roche, forêt vue d'en haut) | Carré ou 3:2, centre à 60 % / 45 % | Neutre | `saturate(.5) brightness(.7)`, teinte `--bg` en `mix-blend-mode: color`, masque radial |
| `objective` + médaillons | L'objectif ou le lieu (base alliée, base ennemie, monstre, héros) | Carré 1:1, sujet centré (recadré en cercle) | Lisible en 92px | Aucun filtre ; l'anneau cyan / rouge dit le camp |
| `tutorial-video` + vignettes | Boucle de 6 s du geste expliqué ; poster = image fixe | 16:9 ; vignettes 126×72 | Identique au jeu | Vignettes à 70 % d'opacité, 100 % si actives |
| `champion-card` (liste) | Le personnage en pied ou buste, pose héroïque | 2:3 portrait (332×502), visage dans le tiers haut | Splash art coloré, fond peint | Aucun filtre ; bandeau nom navy par-dessus |
| `splash` (fiche) | Splash art large du personnage | Plein écran ≈ 16:9, sujet au tiers droit ; mobile recadré 16:9 sur le visage | Crépuscule, lumière dorée | `--veil-left` + `--veil-bottom` |
| icônes de compétences + `skill-video` | Icône carrée de l'effet ; boucle de 6 s de la compétence | 1:1 (96px) ; 16:9 | Effets lumineux sur fond sombre | Icônes à 60 % d'opacité si inactives |
| `skin-splash` + vignettes | Variante du personnage (skin) | 16:9 | Celle du skin | Aucun filtre |
| `news-N` | Image d'article ou de vidéo | 16:9, sans arrondi | — | Aucun filtre ; pastille `--panel` 44px |
| `final-backdrop` | Paysage épique (paroi, sommet, porte de forteresse) | Plein cadre | Sombre, contrasté | `saturate(.6)` + dégradé nuit de haut en bas |

**Règle de cohérence** : un monde de fantasy héroïque sous un ciel de crépuscule ; toutes les images passent sous un voile bleu nuit, le texte ne repose jamais directement sur une image claire.

## 2. Où les trouver

1. **Les images du projet** : captures du jeu, splash arts, cinématiques, carte officielle. Toujours en priorité (droits de l'éditeur).
2. **Banques gratuites** : [Unsplash](https://unsplash.com), [Pexels](https://www.pexels.com) (usage commercial permis, crédit apprécié). Mots-clés :
   - FR : « château montagne », « forteresse brume », « vallée château », « paroi rocheuse », « arène esport », « scène gaming lumière ».
   - EN : « fairytale castle mountain », « fortress mist », « castle valley », « rock cliff face », « esports arena », « gaming stage lights », « aerial forest top down ».
3. **Génération IA** — prompts de départ :
   - `cinematic` :
     > Epic fantasy fortress on a mountain peak at dusk, violet and deep blue sky, warm golden light on the walls, a lone armored defender silhouette on the battlements, painterly cinematic splash art, wide 3:1, subject on the right third, no text, no logo
   - `map` :
     > Top-down fantasy battle map, three lanes crossing a river and a jungle between two fortified bases, hand-painted game art, muted greens and blues, no UI, no text, square
   - médaillon `objective` :
     > Glowing crystal core inside a stone fortress, centered, dark blue background, golden rim light, game icon art, square, no text
4. **À éviter** : champions, carte, logos ou captures d'un jeu existant ; photos de stock de joueurs souriants ; images très claires sans voile sous le texte ; « carte » ou « base » dessinée en CSS (cercles verts, dégradés) à la place d'une image.

## 3. Traitements (code)

```css
/* Média plein cadre + voile de lecture */
.media { position: absolute; inset: 0; overflow: hidden; background: var(--bg); }
.media img { width: 100%; height: 100%; object-fit: cover; }
.hero .media::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, rgb(10 20 40 / .92) 30%, transparent 75%); }

/* Panorama : sortie du blanc, entrée dans la nuit */
.panorama { position: relative; height: 320px; overflow: hidden; background: var(--bg); }
.panorama::before, .panorama::after { content: ""; position: absolute; left: 0; right: 0; height: 45%; }
.panorama::before { top: 0; background: linear-gradient(180deg, var(--paper), transparent); }
.panorama::after { bottom: 0; background: linear-gradient(0deg, var(--bg), transparent); }

/* Carte fondue derrière le grand médaillon */
.stage__map { position: absolute; inset: 0; overflow: hidden; background: var(--bg-2);
  -webkit-mask-image: radial-gradient(60% 60% at 60% 45%, #000 40%, transparent 75%); mask-image: radial-gradient(60% 60% at 60% 45%, #000 40%, transparent 75%); }
.stage__map img { width: 100%; height: 100%; object-fit: cover; filter: saturate(.5) brightness(.7); }
.stage__map::after { content: ""; position: absolute; inset: 0; background: var(--bg); mix-blend-mode: color; opacity: .6; }

/* Image dans le médaillon */
.medal__img img, .big-medal img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; background: var(--bg-2); }
```

(Les `#000` des masques ne sont pas des couleurs affichées : seule l'opacité compte.) Changement d'onglet : l'image du grand médaillon et le texte passent à 0 puis reviennent (180ms), l'anneau change de couleur avec `--ease-snap`.

## 4. Intégration

- `<img>` avec `width`/`height`, `alt` qui décrit l'image (« Château blanc dans la vallée : votre base »), `loading="lazy"` sauf le héros (`fetchpriority="high"`). Fonds décoratifs (`what-backdrop`, `map`, `final-backdrop`) : conteneur `aria-hidden="true"`, `alt=""`. Images des petits médaillons : `alt=""`, l'onglet porte le libellé.
- Vidéos : `<video muted loop playsinline poster="…">` avec contrôles ; le poster est l'image du slot ; `preload="none"` sous la ligne de flottaison.
- Formats : AVIF/WebP via `<picture>` ou un CDN ; héros ≤ 300 Ko.
- Repli : fond token sur chaque conteneur (`--bg`, `--bg-2`, `--panel`) ; tous les voiles sont des dégradés de tokens, donc le texte reste lisible sans image.
- **React Native / Expo** : `expo-image` (`contentFit="cover"`, `placeholder` blurhash, `transition={180}`) ; voiles avec `expo-linear-gradient` ; vidéos avec `expo-video` (muettes, boucle).

## 5. 3D

Optionnelle. Usage sobre qui sert le style : à la place de l'image `map`, un **plateau 3D** de la carte (modèle `.glb` du projet) vu en caméra orthographique inclinée à 55°, lumière de crépuscule (directionnelle `--gold` + ambiante `--bg-2`), sur lequel le médaillon actif fait s'élever la base concernée (anneau lumineux cyan ou rouge au sol). Rotation limitée à ±15° au pointeur, aucune animation continue. Modèles : ceux du projet, ou libres sur [Kenney](https://kenney.nl/assets) (« Castle Kit », « Tower Defense Kit », CC0), [Quaternius](https://quaternius.com) (CC0), [Poly Pizza](https://poly.pizza) (CC0/CC-BY, créditer). Web : Three.js (`GLTFLoader`) ou React Three Fiber + drei (`useGLTF`, `OrthographicCamera`) ; React Native : `expo-gl` + `@react-three/fiber/native`. Repli : l'image de carte fondue si WebGL est absent ou en mouvement réduit.
