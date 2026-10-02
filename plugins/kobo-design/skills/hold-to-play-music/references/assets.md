# Hold To Play Music — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo, un personnage ou un objet : pas de silhouette en `clip-path`, pas de dégradé « qui fait photo ». On utilise de vraies photos et, dès que possible, de vraies vidéos noir et blanc.

## 1. Ce que montrent les images

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `bw-video` (accueil, ×3) | Le même musicien (ou trois musiciens d'un même label) en train de jouer : mains sur l'instrument, visage de profil, corps assis | Trois colonnes verticales ≈ 4:7, sujet centré dans chaque colonne ; plein écran une fois assemblées | Lumière dure de scène ou de fenêtre, beaucoup de noir | N&B `grayscale(1) contrast(1.15)`, grain en surimpression, voile `--veil` pour le texte |
| `portrait` (page d'artiste) | Un artiste seul, buste ou trois-quarts, de face ou de profil | 4:5, la tête dans le tiers haut, le buste touche le bas de l'écran | Contre-jour ou fond clair : le sujet doit se lire comme une **silhouette sombre** | N&B très contrasté `contrast(1.8)`, `mix-blend-mode: multiply` sur `--paper`, bords fondus par masque radial |
| `cover` (vignette) | Pochette : vinyle, platine, instrument en gros plan, objet du studio | Carré 1:1, 90px (64px mobile) | Indifférente | N&B `contrast(1.2)` |

**Règle de cohérence** : tout est en noir et blanc, granuleux, à fort contraste ; la seule couleur de la page vient du lettrage peint et du remplissage orange de la touche. Une photo en couleur est toujours désaturée par `filter`.

## 2. Où les trouver

1. **Les images du projet** : rushes de concert, sessions studio, photos de presse des artistes, pochettes réelles (avec l'accord du label). Toujours en priorité, et en **vidéo** si elle existe.
2. **Banques gratuites** : [Unsplash](https://unsplash.com), [Pexels](https://www.pexels.com) (photos **et vidéos** gratuites, usage commercial permis), [Mixkit](https://mixkit.co/free-stock-video/) pour des boucles vidéo. Mots-clés :
   - FR : « musicien noir et blanc », « guitariste contre-jour », « piano noir et blanc », « platine vinyle », « concert silhouette ».
   - EN : « black and white musician », « guitarist backlit », « piano black and white », « vinyl turntable monochrome », « concert silhouette », « studio session film grain ».
3. **Génération IA** (Midjourney, Flux, Firefly…) — prompts de départ :
   - Triptyque : > *black and white film photograph of a musician playing an acoustic guitar in a dark room, hard side light from a window, deep shadows, heavy 35mm grain, vertical framing, subject centered, no text, no logo*
   - Portrait : > *high-contrast black and white portrait of a singer standing against a bright white backdrop, strong backlight turning the figure into a near silhouette, chest-up, 4:5, soft film grain, no text*
   - Pochette : > *black and white close-up of a vinyl record spinning on a turntable, shallow depth of field, grainy, square crop, no label text*
4. **À éviter** : photos de concert en couleur saturée (fumées violettes, LED), stock souriant face caméra, micros brandis façon publicité, toute image des artistes ou pochettes du label de référence, silhouettes dessinées.

## 3. Traitements (code)

```css
/* Triptyque N&B + grain + voile (photo OU vidéo, même règle) */
.bw { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(3, 1fr); background: var(--bg); }
.bw figure { position: relative; margin: 0; overflow: hidden; background: var(--bg); }
.bw img, .bw video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
  filter: grayscale(1) contrast(1.15) brightness(.9); }
.bw::before { /* grain : bruit SVG en data-URI, opacity .18, mix-blend-mode: overlay */ }
.bw::after { content: ""; position: absolute; inset: 0; background: var(--veil); }

/* Portrait « contre-jour » sur papier blanc */
.portrait { width: min(46vw, 420px); aspect-ratio: 4/5; background: var(--paper); /* le multiply a besoin du blanc dessous */
  mask-image: radial-gradient(75% 85% at 50% 60%, black 55%, transparent 100%); }
.portrait img { width: 100%; height: 100%; object-fit: cover;
  filter: grayscale(1) contrast(1.8) brightness(.85); mix-blend-mode: multiply; }
```

Le `multiply` fait disparaître les blancs de la photo dans `--paper` : seule la figure sombre reste, sans détourage manuel. Si la photo a un fond sombre, préférer une autre photo plutôt que de forcer le contraste.

## 4. Intégration

- **Photo → vidéo** : chaque `<img>` du triptyque se remplace par
  ```html
  <video muted loop playsinline autoplay preload="metadata" poster="musicien-1.jpg" aria-hidden="true">
    <source src="musicien-1.webm" type="video/webm">
    <source src="musicien-1.mp4" type="video/mp4">
  </video>
  ```
  Même classe, même filtre CSS. `muted` + `playsinline` sont obligatoires pour l'autoplay mobile ; le son se branche à part, après le premier geste. Avec `prefers-reduced-motion`, appeler `video.pause()` et laisser le `poster`. Boucles de 6 à 12 s, 720p, ≤ 2 Mo chacune (H.264 + VP9/AV1), déjà en N&B si possible (le `filter` coûte du GPU).
- `<img>` avec `width`/`height`, `alt` qui décrit la personne et l'action (« Guitariste assis, noir et blanc »), `loading="lazy"` sauf le triptyque d'accueil (`fetchpriority="high"`).
- Formats : AVIF/WebP via `<picture>` ou CDN d'images ; chaque colonne ≤ 150 Ko.
- Repli : `background: var(--bg)` sur les colonnes, `var(--paper)` sur le portrait (la page d'artiste reste un écran blanc propre), `var(--ink)` sur la pochette : le titre et la touche restent lisibles sans image.
- **React Native / Expo** : `expo-video` (`VideoView`, `player.loop = true`, `player.muted = true`) pour le triptyque, `expo-image` (`contentFit="cover"`, `placeholder` blurhash, `transition={300}`) pour le portrait et la pochette. Pas de `filter` CSS en natif : livrer des sources déjà en N&B, et simuler le `multiply` avec une image pré-traitée sur fond blanc.

## 5. 3D

Optionnelle, et sobre : un **disque vinyle** en Three.js (`CylinderGeometry` très plat, `MeshStandardMaterial` noir rugosité 0,35, sillons en `normalMap`) qui tourne à 33 tr/min tant que la touche est maintenue et ralentit au relâchement, posé à la place de la vignette de pochette. Couleurs lues dans les tokens (`--ink`, `--orange` pour l'étiquette), rendu figé si `prefers-reduced-motion`, la photo de pochette reste en repli sous le canvas. Jamais de 3D sur le triptyque : il doit rester photographique.
