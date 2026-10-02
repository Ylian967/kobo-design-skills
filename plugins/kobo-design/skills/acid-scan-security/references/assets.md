# Acid Scan Security — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS, SVG ou canvas pour remplacer une photo, un personnage ou un objet : le visage scanné est une **vraie photo**, pixelisée et tramée par le code. Seuls les pictos pixel (cadenas, cible), la trame de points, le réticule et les crochets restent dessinés : ce sont des éléments d'interface.

## 1. Ce que montrent les images

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `portrait-duotone` (héros) | Un visage humain, de face, **regard caméra**, expression neutre | Source 4:5 (≥ 1200×1500), visage centré, yeux vers 40 % de la hauteur, épaules dans le bas du cadre ; dans la page, le visage occupe toute la hauteur du héros, centré (56 % en mobile) | Lumière douce et frontale, fond uni sombre ou gris ; un côté du visage plus éclairé donne du relief à la trame | Canvas : luminance → rampe `--bg, --deep, --mid, --acid, --text`, tramage Bayer 4×4, 1 pixel = `--dot-size` ; bande des yeux en `--signal` / `--on-signal` ; trame de points + lignes de balayage par-dessus |
| (option) bandeau final ou carte « Isoler » | Baie de serveurs, câbles, voyants | 16:9 ou 3:1, lignes verticales nettes | Pénombre, petites lumières | Même rampe tramée, opacité 40 % derrière le texte, ou duotone CSS |

**Règle de cohérence** : une seule rampe de couleur pour tout, du noir-vert au citron. Une photo n'apparaît jamais en couleur naturelle : elle passe toujours par le canvas tramé (ou, en repli, par le duotone CSS).

## 2. Où les trouver

1. **Les images du projet** : portrait d'un membre de l'équipe ou d'un mannequin avec cession de droit à l'image (un visage reconnaissable demande toujours une autorisation écrite). En priorité.
2. **Banques gratuites** : [Unsplash](https://unsplash.com) (CORS autorisé sur `images.unsplash.com`, utile pour le canvas), [Pexels](https://www.pexels.com). Mots-clés :
   - FR : « portrait regard caméra fond sombre », « visage de face neutre », « portrait studio femme cheveux sombres », « salle serveurs verte ».
   - EN : « portrait looking at camera dark background », « front facing neutral face », « studio headshot grey background », « server rack green light », « data center cables ».
   - Avec Unsplash, `&fit=crop&crop=faces&w=1200&h=1500` recadre automatiquement sur le visage.
3. **Génération IA** (Midjourney, Flux, Firefly…) — prompts de départ :
   - Portrait : > *studio headshot of a person facing the camera with a neutral expression, eyes level, soft frontal key light with gentle falloff on one side, plain dark grey background, sharp focus on the eyes, 4:5 vertical, high detail, no jewelry, no text*
   - Serveurs : > *dark data center aisle, server racks with tiny green status lights, strong vertical lines, low light, wide 16:9, no people, no text, no logos*
4. **À éviter** : profils ou trois-quarts (la bande de scan doit couvrir les deux yeux), lunettes de soleil, cheveux sur les yeux, sourires de stock, fonds chargés (ils deviennent du bruit vert), clichés « hacker à capuche », cadenas et boucliers 3D génériques, le visage du shot de référence.

## 3. Traitements (code)

```html
<div class="photo" data-slot="portrait-duotone" data-eye="0.5 0.42" data-face="0.36" role="img" aria-label="Portrait … traité en duotone vert acide tramé">
  <img id="portraitSrc" crossorigin="anonymous" src="…?auto=format&fit=crop&crop=faces&w=1200&h=1500&q=80" width="1200" height="1500" alt="" fetchpriority="high">
  <span class="photo__tint" aria-hidden="true"></span>
  <canvas id="portrait" aria-hidden="true"></canvas>
</div>
```

```css
.photo { position: absolute; inset: 0; z-index: -2; background: radial-gradient(40% 60% at 50% 40%, var(--mid), var(--deep) 60%, var(--bg)); } /* repli sans image */
/* Repli duotone CSS (photo visible tant que le canvas n'a pas réussi) */
.photo img { position: absolute; max-width: none; filter: grayscale(1) contrast(1.4) brightness(.95);
  mask-image: linear-gradient(90deg, transparent, black 18%, black 82%, transparent); }
.photo__tint { position: absolute; inset: 0; background: var(--acid); mix-blend-mode: multiply; } /* blanc → --acid, noir → noir */
/* Canvas tramé */
.photo canvas { position: absolute; inset: 0; width: 100%; height: 100%; image-rendering: pixelated; opacity: 0; }
.photo.is-dithered canvas { opacity: 1; }
.photo.is-dithered img, .photo.is-dithered .photo__tint { visibility: hidden; }
/* Trame de points et lignes de balayage au-dessus (z-index: 1) : voir components.md */
```

```js
// Lecture de la photo et quantification sur la rampe (extrait de la démo)
const ramp = ['--bg', '--deep', '--mid', '--acid', '--text'].map(hex);   // couleurs lues dans les tokens
ctx.drawImage(src, X, Y, DW, DH);                       // canvas à 1 pixel = --dot-size
const img = ctx.getImageData(0, 0, w, h);               // SecurityError si la photo n'est pas servie en CORS
for (…) {
  let l = (.2126 * r + .7152 * g + .0722 * b) / 255;
  l = Math.min(1, Math.max(0, (l - .06) * 1.25));       // contraste
  const t = (bayer[(y & 3) * 4 + (x & 3)] + .5) / 16;   // seuil Bayer 4×4
  const v = l * (ramp.length - 1), k = Math.floor(v);
  color = ramp[Math.min(ramp.length - 1, k + (v - k > t ? 1 : 0))];
  // dans la bande des yeux : --on-signal si l < .35, sinon --signal
}
// try/catch : en cas d'échec, on retire .is-dithered → le duotone CSS reste affiché
```

- **Calage** : `data-eye="x y"` = position des yeux dans la photo source (fractions), `data-face` = largeur du visage / largeur de la photo. Le script place la photo pour que les yeux tombent à 40 % de la hauteur du héros, puis pose la bande de scan, le réticule et le cadre sur ces coordonnées. À régler une fois par photo.
- Le canvas est redessiné au redimensionnement (temporisé 150ms), jamais en boucle.

## 4. Intégration

- `crossorigin="anonymous"` **avant** le chargement (attribut dans le HTML) ; le serveur d'images doit renvoyer `Access-Control-Allow-Origin` (Unsplash, Cloudinary, imgix le font ; sinon, servir la photo depuis le même domaine). Sans CORS, l'image ne se charge pas du tout avec cet attribut : prévoir l'image sur le même domaine en production.
- `alt=""` sur l'`<img>` source (le conteneur `role="img"` porte un `aria-label` qui décrit la personne **et** le traitement) ; `fetchpriority="high"` : c'est l'image du héros.
- Formats : JPEG/WebP 1200×1500 ≤ 250 Ko ; le canvas n'a pas besoin de plus (il travaille à 1/5e de la résolution).
- Repli : fond en dégradé de tokens (`--mid → --deep → --bg`) si la photo ne charge pas (`.is-missing`) ; le titre reste lisible.
- **React Native / Expo** : pas de `getImageData` simple en natif : livrer une image **déjà tramée** (traitement côté serveur avec le même algorithme, ou une fois au build) et l'afficher avec `expo-image` (`contentFit="cover"`, `placeholder` = couleur `--deep`, `transition={300}`). Dynamique : `@shopify/react-native-skia` (`Image` + `RuntimeShader` qui applique la rampe et la matrice de Bayer).

## 5. 3D

Optionnelle, et sobre : un **nuage de points** Three.js (`Points` + `BufferGeometry`) échantillonné sur la même photo (un point par pixel tramé, profondeur = luminance × 0,3), couleurs de la rampe lues dans les tokens, qui pivote de ±8° avec le pointeur pour donner du relief au scan. Pas d'éclairage ni de matière : seulement des carrés `--dot-size` en `sizeAttenuation: false`. Le canvas 2D tramé reste le repli (WebGL absent, `prefers-reduced-motion`). Jamais de globe, bouclier ou cadenas 3D.
