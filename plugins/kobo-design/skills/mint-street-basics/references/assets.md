# Mint Street Basics — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo, un mannequin ou un vêtement : on utilise de vraies photos (portés, packshots, détails de matière) et, si le projet en a, un vrai modèle 3D du produit.

Ce qui se vend ici, c'est le vêtement : il doit être **vrai, net et lumineux**. L'interface (bleu nuit, menthe, vert) encadre la photo ; la photo n'est jamais teintée en vert.

## 1. Ce que montrent les images

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `hero-model` | Mannequin qui porte la pièce phare (sweat, hoodie), de face ou de trois quarts | **Cercle** (fenêtre ronde 1:1) dans l'arc vert ; visage dans le tiers haut, coupé à la taille par le bas du héros | Lumière du jour douce, fond neutre (rue claire, mur, studio) | Photo nette dans un disque, `object-position: 50% 20%`, anneau vert autour (l'arc reste en CSS) |
| `product-1` … `product-n` | Un vêtement par carte : **packshot détouré** (idéal) ou porté sur fond uni clair | **4:5**, vêtement centré, marge régulière | Studio, ombres très douces, couleurs fidèles | Détouré : `object-fit: contain` à 72 % + ombre portée ; photo pleine : cadre « passe-partout » 12px dans la carte |
| `pdp-main` + vignettes | La pièce de la fiche, un coloris par vue (ou face / dos / détail / porté) | **1:1**, rayon 28px ; vignettes 1:1 rayon 8px | Studio, même lumière pour toutes les vues | Même cadrage pour tous les coloris, changement d'image au clic sur la vignette |
| `footer-collage` | 4 portés ou packshots variés (homme, femme, détail broderie, matière) | **Cercles** de tailles différentes | Jour, couleurs naturelles | Photo en `object-fit: cover` dans le cercle, fond token visible en repli |

**Règle de cohérence** : photos **claires, nettes, couleurs naturelles** sur fonds neutres (blanc cassé, gris clair, béton) ; une seule lumière par série ; le vert n'apparaît que dans l'interface, jamais en filtre sur le vêtement.

## 2. Où les trouver

1. **Les images du projet** : packshots du fabricant (PNG/WebP détouré, fond transparent) et photos portées de la campagne. Toujours en priorité : un client achète ce qu'il voit.
2. **Banques gratuites** : [Unsplash](https://unsplash.com) et [Pexels](https://www.pexels.com) (licences gratuites, usage commercial permis ; créditer le photographe est apprécié). Mots-clés qui marchent :
   - EN : « hoodie model street », « sweatshirt studio », « hoodie flat lay », « embroidered sweatshirt », « streetwear portrait natural light », « basic t-shirt on white ».
   - FR : « sweat à capuche porté », « mannequin hoodie rue », « vêtement fond blanc », « sweat brodé ».
3. **Détourage** : outil du projet ou de l'éditeur photo (sélection du sujet), exporter en WebP avec transparence ; garder la même marge autour de chaque produit.
4. **Génération IA** (Midjourney, Flux, DALL·E, Firefly…) — utile pour des **portés d'ambiance**, jamais pour représenter un produit réel à vendre :
   - Héros :
     > Fashion e-commerce photo of a young adult wearing a plain oversized heavyweight hoodie in sand color, waist-up, facing camera with a relaxed expression, soft overcast daylight, clean light grey urban wall background, sharp focus on the fabric texture, 50mm lens, natural colors, no logo, no text
   - Carte produit :
     > Studio packshot of a plain organic cotton crewneck sweatshirt laid flat, front view, centered with even margins, soft diffuse lighting, subtle natural shadow, off-white seamless background, true-to-life color, no logo, no text, 4:5
5. **À éviter** : photos de stock trop posées ou retouchées, filtres vintage ou saturés, fonds chargés derrière un packshot, mannequin coupé à la tête, logos de marques visibles, et toute photo du shot de référence.

## 3. Traitements (code)

```css
/* Fenêtre ronde du héros, à l'intérieur de l'arc vert (l'arc reste un élément graphique CSS) */
.disc { position: absolute; left: 50%; bottom: -4%; width: min(430px, 76%); aspect-ratio: 1; translate: -50% 0;
  border-radius: 50%; overflow: hidden; background: var(--navy-2); }              /* repli = bleu nuit clair */
.disc img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 20%; color: transparent; }

/* Carte produit : photo pleine dans un passe-partout (le fond blanc / vert pâle de la carte fait le cadre) */
.card__media { position: relative; aspect-ratio: 4 / 5; border-radius: var(--radius-card); background: var(--card); overflow: hidden; }
.card__media img { position: absolute; inset: var(--space-3); width: calc(100% - 2 * var(--space-3)); height: calc(100% - 2 * var(--space-3));
  object-fit: cover; border-radius: calc(var(--radius-card) - 4px); background: var(--card-alt); transition: transform var(--dur-slow) var(--ease-out); }
.card:hover .card__media img { transform: scale(1.04); }

/* Variante packshot détouré (PNG/WebP transparent) */
.card__media img.cutout { inset: 14%; width: 72%; height: 72%; object-fit: contain; border-radius: 0; background: none;
  filter: drop-shadow(0 14px 14px color-mix(in srgb, var(--navy) 12%, transparent)); }
.card:hover .card__media img.cutout { transform: scale(1.05) rotate(-2deg); }

/* Bulles du collage */
.bubble { border-radius: 50%; overflow: hidden; background: var(--b); }
.bubble img { width: 100%; height: 100%; object-fit: cover; color: transparent; }
```

Pas de duotone, pas de grain : la photo reste naturelle. Le seul « traitement » est le **cadre** (cercle, passe-partout, rayon 16/28px).

## 4. Intégration

- `<img>` avec `width`/`height`, `alt` qui décrit le vêtement et le coloris (« Sweat à capuche blanc cassé, vue de face »), `loading="lazy"` partout sauf l'image du héros (`fetchpriority="high"`).
- Coloris : chaque pastille pointe vers **une vraie photo** du coloris (`data-src`), jamais un filtre CSS qui recolore le vêtement. Sans photo pour un coloris, la pastille sélectionne seulement.
- Formats : AVIF/WebP via `<picture>` ou un CDN d'images (`w=800` pour une carte, `w=1200` pour la fiche, `w=1000` pour le héros) ; héros ≤ 300 Ko.
- Couleur de repli : `--card`, `--card-alt` ou `--navy-2` sur chaque conteneur, pour que la page reste lisible si l'image ne charge pas.
- **React Native / Expo** : `expo-image` (`contentFit="cover"` ou `"contain"` pour un détouré, `placeholder={{ blurhash }}`, `transition={300}`) ; fenêtre ronde = `View` `borderRadius: width / 2`, `overflow: 'hidden'`.

## 5. 3D

**Optionnelle.** Usage précis et sobre : sur la fiche produit, une vignette « 360° » qui remplace la grande image par le **modèle 3D du vêtement** (exporté de CLO3D ou Marvelous Designer en `.glb`), qui tourne lentement sur un socle menthe et se fait pivoter au doigt ou à la souris. Pas d'autre 3D sur la page.

- **Matières et lumière** : `MeshStandardMaterial` avec la texture et la carte de normales du tissu (rugosité 0,9, métal 0), `RoomEnvironment` + une lumière douce de face, tone mapping ACES, ombre de contact sous le vêtement.
- **Modèles** : uniquement le modèle du produit (un vêtement générique trouvé en ligne tromperait l'acheteur) ; compressé Draco/Meshopt, ≤ 3 Mo.
- **Web** : `<model-viewer>` (le plus simple, AR incluse) ou Three.js (`GLTFLoader` + `DRACOLoader`, `OrbitControls` limités en vertical) ; React Three Fiber + drei (`useGLTF`, `Stage`, `PresentationControls`).
- **React Native** : `expo-gl` + `@react-three/fiber/native`, ou une suite de 24 photos tournantes.
- **Repli** : la photo de face si WebGL est absent ou si `prefers-reduced-motion` est actif (pas de rotation automatique).
