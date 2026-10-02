# Sticker Brutal JP — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo, un personnage ou un objet : on utilise de vraies images (ici, un vrai portrait) et, si on le souhaite, de la vraie 3D.

Dans ce style, **la seule photo qui compte est la personne** : un portrait noir et blanc découpé dans l'hexagone rose. Tout le reste (demi-cercles, étoiles, bulles, pastilles, tuiles d'icône, katakana) est du **graphisme** et reste en CSS/SVG : ce sont des autocollants, pas des représentations du réel.

## 1. Ce que montrent les images

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `portrait` | La personne derrière le site (freelance, fondatrice, designer), expressive : sourire franc, regard caméra, geste éventuel (main qui salue, lunettes relevées) | Carré 1:1, buste, tête dans le tiers haut et centrée (l'hexagone coupe les côtés), **fond blanc ou très clair uni** | Lumière de studio douce et franche, pas d'ombre portée sur le fond | N&B contrasté (`grayscale(1) contrast(1.2)`), `mix-blend-mode: multiply` sur le rose tramé ; idéalement détourage PNG qui dépasse légèrement en bas |
| `work-*` (option : vignettes de projets) | Captures ou photos de projets réels (logo sur packaging, site sur téléphone) | 4:3 dans une carte autocollant | Lumière nette, fond uni coloré | Couleurs naturelles, cadre `--stroke` + ombre dure, inclinaison ±2° |
| `team-*` (option) | Autres membres du studio | Carré, même fond blanc | Identique au portrait principal | Même N&B multiplié, sur une autre couleur de la palette (`--peri`, `--teal`, `--mint`) |

**Règle de cohérence** : toutes les personnes sont en **noir et blanc sur fond blanc**, puis colorées par la forme qui les porte ; jamais de photo de personne en couleur, jamais de décor visible derrière elle. La couleur vient des autocollants.

## 2. Où les trouver

1. **Les images du projet** : une vraie photo de la personne, toujours. C'est un site personnel : un portrait de banque d'images est un pis-aller pour une maquette. Faire une séance simple : mur blanc, lumière de fenêtre ou deux softbox, 3–4 expressions.
2. **Banques gratuites** (maquettes uniquement) : [Unsplash](https://unsplash.com) et [Pexels](https://www.pexels.com) (licences gratuites, usage commercial permis ; créditer le photographe est apprécié). Mots-clés qui marchent :
   - FR : « portrait femme souriante fond blanc », « portrait studio fond clair », « designer portrait joyeux ».
   - EN : « smiling woman portrait white background », « studio headshot plain background », « cheerful creative portrait », « japanese woman portrait white background ».
3. **Génération IA** (Midjourney, Flux, DALL·E, Firefly…) — pour une maquette, jamais pour représenter une vraie personne :
   > Studio portrait of a cheerful young designer, chest-up, big genuine smile, looking straight at the camera, one hand raised in a small wave, plain pure white seamless background, soft even lighting with no cast shadow, black and white photograph, high contrast, crisp details, centered composition with headroom, square 1:1, no text, no logo
4. **À éviter** : portraits sur fond chargé (bureau, rue, plantes) que le `multiply` rend boueux ; poses corporate figées ; lumière dure qui fait une ombre sur le fond ; photos en couleur ; le portrait ou la personne du shot d'origine ; une illustration « personnage » dessinée en CSS à la place d'une photo.

## 3. Traitements (code)

```css
/* Hexagone rose tramé : c'est le « fond » de la photo */
.hex { position: relative; overflow: hidden;
  clip-path: polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0 50%);
  background: radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--paper) 35%, transparent) 0 1.5px, transparent 2px) 0 0 / 14px 14px, var(--pink); }

/* A — photo sur fond blanc : N&B + multiply, le blanc devient rose tramé (aucun détourage nécessaire) */
.hex img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 18%;
  color: transparent;                                      /* masque le texte alt si l'image ne charge pas */
  filter: grayscale(1) contrast(1.2) brightness(1.08);     /* blanc franc, noirs denses */
  mix-blend-mode: multiply; }

/* B — photo détourée (PNG/WebP transparent) : gris neutres, la personne dépasse en bas du cadre */
.hex img.cutout { mix-blend-mode: normal; filter: grayscale(1) contrast(1.1);
  inset: auto 0 -4% 0; height: 104%; object-fit: contain; object-position: bottom; }

/* Contour noir qui suit l'hexagone + ombre dure : sur le parent, car clip-path coupe border et box-shadow */
.hex-wrap { filter: drop-shadow(var(--stroke) 0 0 var(--ink)) drop-shadow(calc(-1 * var(--stroke)) 0 0 var(--ink))
  drop-shadow(0 var(--stroke) 0 var(--ink)) drop-shadow(0 calc(-1 * var(--stroke)) 0 var(--ink)) drop-shadow(6px 6px 0 var(--ink)); }

/* Variante tramée « imprimé » (option) : une trame de points noirs en multiply sur la photo */
.hex--halftone::after { content: ""; position: absolute; inset: 0; pointer-events: none; mix-blend-mode: multiply; opacity: .18;
  background: radial-gradient(circle, var(--ink) 0 0.8px, transparent 1.2px) 0 0 / 5px 5px; }
```

Le détourage se fait dans Photoshop (« Sélectionner le sujet »), Photopea, Pixelmator ou `rembg` en ligne de commande. On ne simule jamais la silhouette avec un `clip-path` ou des formes CSS.

## 4. Intégration

- `<img>` avec `width`/`height`, `alt` qui décrit la personne (« Portrait en noir et blanc de Mio, souriante »), `fetchpriority="high"` (le portrait est dans le héros) ; vignettes de projets en `loading="lazy"`. Sur une page `lang="ja"`, l'`alt` est en japonais (ou porte `lang` s'il est dans une autre langue).
- Formats : AVIF/WebP via `<picture>` ; le portrait N&B carré tient en 60–120 Ko à 1000px.
- Repli : le rose tramé de `.hex` reste visible si l'image ne charge pas ; la composition (bulles, katakana, pastilles) tient sans la photo.
- **React Native / Expo** : `expo-image` (`contentFit="cover"`, `placeholder` blurhash, `transition={300}`) dans une forme hexagonale `react-native-svg` (`ClipPath` + `Image` SVG) ; pas de `mix-blend-mode` en natif → utiliser la version détourée (B), exportée en N&B, posée sur le polygone rose.

## 5. 3D

Optionnelle, et sobre : **un seul autocollant en 3D**, pas une scène.

- **Idée** : la pastille ronde jaune « œil » (ou une étoile) devient un vrai jeton 3D épais, façon autocollant en vinyle : extrusion de la forme SVG (`ExtrudeGeometry`, biseau 0.04), face en `MeshToonMaterial` couleur `--yellow` (lue dans les tokens), tranche et contour en `--ink`, `OutlineEffect` de three.js pour le trait noir épais. Il tourne de ±15° en suivant le pointeur, comme un autocollant qu'on décolle.
- **Rendu** : éclairage plat (une `DirectionalLight` + `AmbientLight` forte), pas de reflets ni de flou : la 3D doit rester aussi « plate et franche » que le CSS ; l'ombre dure reste un plan noir décalé, pas une ombre réaliste.
- **Modèles** : forme maison extrudée depuis le SVG (pas de modèle externe nécessaire) ; pour des jouets/objets kawaii : [Poly Pizza](https://poly.pizza) (CC0/CC-BY), [Kenney](https://kenney.nl/assets) (CC0). Vérifier la licence et créditer si CC-BY.
- **Web** : Three.js (`SVGLoader` + `ExtrudeGeometry`) ou React Three Fiber + drei (`Float`, `Outlines`).
- **React Native** : `expo-gl` + `@react-three/fiber/native`, ou rester sur l'autocollant CSS/SVG (recommandé).
- **Repli** : l'autocollant CSS actuel, tel quel, si WebGL est absent ou si `prefers-reduced-motion` est actif.
