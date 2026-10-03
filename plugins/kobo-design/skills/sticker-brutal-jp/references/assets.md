# Sticker Brutal JP — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo, un personnage ou un objet : on utilise de vraies images (ici, un vrai portrait) et, si on le souhaite, de la vraie 3D.

Dans ce style, **la photo qui compte le plus est la personne** : un portrait noir et blanc découpé dans l'hexagone rose. Sur la page Projets (proposée), les vignettes de projets sont aussi de vraies photos. Tout le reste (demi-cercles, étoiles, bulles, pastilles, tuiles d'icône, katakana) est du **graphisme** et reste en CSS/SVG : ce sont des autocollants, pas des représentations du réel.

## 1. Ce que montrent les images

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `portrait` | La personne derrière le site (freelance, fondatrice, designer), expressive : sourire franc, regard caméra, geste éventuel (main qui salue, lunettes relevées) | Carré 1:1, buste, tête dans le tiers haut et centrée (l'hexagone coupe les côtés), **fond blanc ou très clair uni** | Lumière de studio douce et franche, pas d'ombre portée sur le fond | N&B (`grayscale(1) contrast(1.12)`) en rendu **normal**, dans un hexagone intérieur à filet noir, le rose tramé en cadre autour ; idéalement détourage PNG qui dépasse légèrement en bas |
| `work-<id>` (page Projets : vignettes + fiche) | Photos ou mises en situation de projets réels (packaging en main, site sur téléphone, affiche dans la rue) ; dans la démo, photos Unsplash qui évoquent le client (café, salle d'arcade, pot de beurre de cacahuète…) | 4:3 (vignette 1200×900, `loading="lazy"`) | Lumière nette, fond uni ou coloré | Couleurs **naturelles** (ce sont des objets, pas des personnes), cadre 2px + rayon 8px ; repli = aplat tramé de la couleur de catégorie |
| `contact-avatar` (page Contact) | La même personne que le portrait | Carré, recadré rond 96px | Identique au portrait | N&B, rendu normal, fond `--pink` |
| `team-*` (option) | Autres membres du studio | Carré, même fond blanc | Identique au portrait principal | Même N&B en rendu normal, cadre d'une autre couleur de la palette (`--peri`, `--teal`, `--mint`) |

**Règle de cohérence** : toutes les personnes sont en **noir et blanc sur fond blanc**, encadrées par la forme colorée qui les porte ; jamais de photo de personne en couleur, jamais de décor visible derrière elle. La couleur vient des autocollants.

## 2. Où les trouver

1. **Les images du projet** : une vraie photo de la personne, toujours. C'est un site personnel : un portrait de banque d'images est un pis-aller pour une maquette. Faire une séance simple : mur blanc, lumière de fenêtre ou deux softbox, 3–4 expressions.
2. **Banques gratuites** (maquettes uniquement) : [Unsplash](https://unsplash.com) et [Pexels](https://www.pexels.com) (licences gratuites, usage commercial permis ; créditer le photographe est apprécié). Mots-clés qui marchent :
   - FR : « portrait femme souriante fond blanc », « portrait studio fond clair », « designer portrait joyeux ».
   - EN : « smiling woman portrait white background », « studio headshot plain background », « cheerful creative portrait », « japanese woman portrait white background ».
3. **Génération IA** (Midjourney, Flux, DALL·E, Firefly…) — pour une maquette, jamais pour représenter une vraie personne :
   > Studio portrait of a cheerful young designer, chest-up, big genuine smile, looking straight at the camera, one hand raised in a small wave, plain pure white seamless background, soft even lighting with no cast shadow, black and white photograph, high contrast, crisp details, centered composition with headroom, square 1:1, no text, no logo
4. **À éviter** : portraits sur fond chargé (bureau, rue, plantes) ; poses corporate figées ; lumière dure qui fait une ombre sur le fond ; photos en couleur ; le portrait ou la personne du shot d'origine ; une illustration « personnage » dessinée en CSS à la place d'une photo.

## 3. Traitements (code)

```css
/* Hexagone rose tramé : c'est le « fond » de la photo */
.hex { position: relative; overflow: hidden;
  clip-path: polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0 50%);
  background: radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--paper) 35%, transparent) 0 1.5px, transparent 2px) 0 0 / 14px 14px, var(--pink); }

/* A — photo N&B en rendu normal dans un hexagone intérieur à filet noir ; le rose tramé reste visible autour (cadre) */
.hex__photo { position: absolute; inset: 9% 9% 7%; clip-path: polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0 50%); background: var(--ink); }
.hex__photo img { position: absolute; inset: var(--stroke); width: calc(100% - 2 * var(--stroke)); height: calc(100% - 2 * var(--stroke));
  clip-path: polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0 50%); object-fit: cover; object-position: 50% 22%;
  color: transparent;                                      /* masque le texte alt si l'image ne charge pas */
  background: var(--paper);                                /* repli : papier dans le filet noir */
  filter: grayscale(1) contrast(1.12); }                   /* pas de brightness : on garde les gris de la peau */

/* B — photo détourée (PNG/WebP transparent) : gris neutres, la personne dépasse en bas du cadre */
.hex img.cutout { mix-blend-mode: normal; filter: grayscale(1) contrast(1.1);
  inset: auto 0 -4% 0; height: 104%; object-fit: contain; object-position: bottom; }

/* Contour noir qui suit l'hexagone + ombre dure : sur le parent, car clip-path coupe border et box-shadow */
.hex-wrap { filter: drop-shadow(var(--stroke) 0 0 var(--ink)) drop-shadow(calc(-1 * var(--stroke)) 0 0 var(--ink))
  drop-shadow(0 var(--stroke) 0 var(--ink)) drop-shadow(0 calc(-1 * var(--stroke)) 0 var(--ink)) drop-shadow(6px 6px 0 var(--ink)); }

/* Variante tramée « imprimé » (option, à tester avec la vraie photo) : trame de points noirs posée sur .hex__photo */
.hex__photo.hex--halftone::after { content: ""; position: absolute; inset: 0; pointer-events: none; mix-blend-mode: multiply; opacity: .18;
  background: radial-gradient(circle, var(--ink) 0 0.8px, transparent 1.2px) 0 0 / 5px 5px; }
```

### Pourquoi pas `multiply` (bug corrigé)

La première version posait la photo en `mix-blend-mode: multiply` + `grayscale(1) contrast(1.2) brightness(1.08)` directement sur le rose. Dans Chrome, avec la vraie photo chargée, **le portrait était invisible**. Causes :

1. **Le calcul lui-même** : `multiply` donne `photo × rose`. Le blanc devient rose (voulu), mais `brightness(1.08)` + `contrast(1.2)` poussent aussi la peau claire, les vêtements clairs et les reflets vers le blanc (un gris à 85 % ressort à ~98 %) : ils deviennent **presque le même rose que le fond**, et comme le rose est déjà un ton moyen, les gris moyens tombent en rose sombre sans écart lisible. Sur un portrait clair et souriant sur fond blanc (le cas idéal du brief !), il ne reste que quelques taches sombres (cheveux, yeux) noyées dans la trame — le visage disparaît.
2. **Le contexte de rendu, fragile** : le mélange se fait avec ce qu'il y a *dans le même groupe d'empilement*. Ici l'image est prise dans `clip-path` + `overflow: hidden` (`.hex`), sous un parent qui a `filter: drop-shadow(...)` ×5 et une animation `opacity`/`scale` (`.pop`) : trois choses qui isolent le groupe et le font passer sur sa propre couche GPU. Selon le navigateur et l'accélération matérielle, le fond avec lequel l'image se mélange n'est plus garanti. *Non reproduit dans le bac à sable (rendu logiciel, image de test sombre) : c'est l'explication probable, pas une mesure.*

Correctif retenu : **portrait N&B en rendu normal**, sans `mix-blend-mode` ni `brightness`, dans un hexagone intérieur (filet `--ink` de 3px), le rose tramé faisant cadre tout autour (~9 % de chaque côté). Le visage reste lisible quelle que soit la photo, et le rose est toujours là. Si on tient à l'effet « fond rose » : détourer la photo (variante B), c'est le seul rendu fiable.

Le détourage se fait dans Photoshop (« Sélectionner le sujet »), Photopea, Pixelmator ou `rembg` en ligne de commande. On ne simule jamais la silhouette avec un `clip-path` ou des formes CSS.

## 4. Intégration

- `<img>` avec `width`/`height`, `alt` qui décrit la personne (« Portrait en noir et blanc de Mio, souriante »), `fetchpriority="high"` (le portrait est dans le héros) ; vignettes de projets en `loading="lazy"`. Sur une page `lang="ja"`, l'`alt` est en japonais (ou porte `lang` s'il est dans une autre langue).
- Formats : AVIF/WebP via `<picture>` ; le portrait N&B carré tient en 60–120 Ko à 1000px.
- Repli : le rose tramé de `.hex` et le papier de l'hexagone intérieur restent visibles si l'image ne charge pas ; vignettes de projets : aplat tramé de la couleur de catégorie ; la composition (bulles, katakana, pastilles) tient sans la photo.
- **React Native / Expo** : `expo-image` (`contentFit="cover"`, `placeholder` blurhash, `transition={300}`) dans une forme hexagonale `react-native-svg` (`ClipPath` + `Image` SVG) ; pas de `mix-blend-mode` en natif, et de toute façon le web ne l'utilise plus : photo N&B dans un polygone intérieur, ou version détourée (B) posée sur le polygone rose.

## 5. 3D

Optionnelle, et sobre : **un seul autocollant en 3D**, pas une scène.

- **Idée** : la pastille ronde jaune « œil » (ou une étoile) devient un vrai jeton 3D épais, façon autocollant en vinyle : extrusion de la forme SVG (`ExtrudeGeometry`, biseau 0.04), face en `MeshToonMaterial` couleur `--yellow` (lue dans les tokens), tranche et contour en `--ink`, `OutlineEffect` de three.js pour le trait noir épais. Il tourne de ±15° en suivant le pointeur, comme un autocollant qu'on décolle.
- **Rendu** : éclairage plat (une `DirectionalLight` + `AmbientLight` forte), pas de reflets ni de flou : la 3D doit rester aussi « plate et franche » que le CSS ; l'ombre dure reste un plan noir décalé, pas une ombre réaliste.
- **Modèles** : forme maison extrudée depuis le SVG (pas de modèle externe nécessaire) ; pour des jouets/objets kawaii : [Poly Pizza](https://poly.pizza) (CC0/CC-BY), [Kenney](https://kenney.nl/assets) (CC0). Vérifier la licence et créditer si CC-BY.
- **Web** : Three.js (`SVGLoader` + `ExtrudeGeometry`) ou React Three Fiber + drei (`Float`, `Outlines`).
- **React Native** : `expo-gl` + `@react-three/fiber/native`, ou rester sur l'autocollant CSS/SVG (recommandé).
- **Repli** : l'autocollant CSS actuel, tel quel, si WebGL est absent ou si `prefers-reduced-motion` est actif.
