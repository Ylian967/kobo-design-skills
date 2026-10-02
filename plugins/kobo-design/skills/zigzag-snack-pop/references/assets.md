# Zigzag Snack Pop — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo, un aventurier, un paysage ou le produit : on utilise de vraies photos (sport outdoor, produit, ingrédients) et, si le projet en a, un vrai rendu 3D de l'emballage.

Le style est une **affiche imprimée** : les photos d'aventure passent en **duotone brun → orange** et sont découpées en **crêtes de montagne** ; les photos de produit restent appétissantes, en couleurs, posées dans un **cadre autocollant** (contour brun épais + ombre dure). Les éléments purement graphiques (soleil, dents de scie, pastilles d'ingrédients à pictogramme, tampon, traces de pneu) restent en CSS/SVG.

## 1. Ce que montrent les images

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `mountains-back` | Paroi rocheuse ou falaise avec un grimpeur (ou un cycliste sur une crête) | Bande pleine largeur ≈ 4:1, sujet dans le tiers haut (il doit rester sous la ligne de crête) | Plein soleil, ciel dégagé, roche texturée | **Duotone** `--brown-deep` → `--orange-bright`, contraste fort, découpe `clip-path` en crêtes |
| `mountains-front` | Deuxième scène d'aventure : grimpeur sous un surplomb, skateur, trail | Bande pleine largeur, 58 % de la hauteur de la scène | Idem, plus sombre | **Duotone** `--brown-deep` → `--orange`, crêtes plus basses |
| `product-hero` | Le produit hors emballage (barre coupée, granola) ou dans sa main | **Cercle** 1:1 (disque orange), produit au centre | Studio lumineux, ombres franches | Couleurs naturelles un peu poussées (`--grade-pop`), cadre rond, contour `--stroke` + ombre dure |
| `product-*` (cartes) | Une saveur par carte : barre, morceaux, ingrédient vedette (cacahuètes, cacao, avoine) | **4:3**, sujet centré, gros plan | Studio, fond uni clair ou bois | `--grade-pop`, cadre « photo collée » : contour 3px, ombre dure, rotation -3° |

**Règle de cohérence** : les photos d'**aventure** sont toujours en duotone brun/orange (jamais en couleurs réelles), les photos de **nourriture** toujours en couleurs, nettes et lumineuses ; aucune photo n'a d'ombre floue autour d'elle.

## 2. Où les trouver

1. **Les images du projet** : packshots de l'emballage, photos de la barre coupée, photos d'athlètes ambassadeurs (avec droits à l'image).
2. **Banques gratuites** : [Unsplash](https://unsplash.com) et [Pexels](https://www.pexels.com) (licences gratuites, usage commercial permis ; créditer le photographe est apprécié). Mots-clés qui marchent :
   - EN : « rock climber cliff », « bouldering overhang », « mountain bike ridge », « skateboarder air blue sky », « trail runner mountain », « protein bar », « granola bar white background », « peanut butter peanuts », « dark chocolate pieces ».
   - FR : « grimpeur falaise », « escalade surplomb », « VTT crête », « barre de céréales », « cacahuètes », « chocolat noir morceaux ».
3. **Génération IA** (Midjourney, Flux, DALL·E, Firefly…) — prompts de départ :
   - Bande d'aventure (sera passée en duotone) :
     > Wide action photograph of a rock climber on a sunlit red sandstone cliff, climber small in the upper third of the frame, strong midday sun, deep shadows, high contrast, crisp texture, 24mm lens, panoramic 4:1 crop, no text, no logo
   - Produit :
     > Close-up food photograph of a chunky oat and peanut protein bar cut in half on a plain cream background, visible peanut pieces and chocolate chunks, bright studio light with a hard shadow, saturated warm colors, top-down at 45 degrees, 4:3, no packaging text, no logo
4. **À éviter** : photos de salle de sport ou de corps sculptés, sportifs en studio sur fond blanc, ombres floues « premium », emballages d'une marque existante, et les illustrations ou photos de la référence.

## 3. Traitements (code)

```css
/* Tokens (dans :root) */
--grade-pop: saturate(1.15) contrast(1.06);

/* Duotone brun → orange (photo d'aventure) */
.duo { position: absolute; left: 0; right: 0; bottom: 0; overflow: hidden; isolation: isolate; background: var(--orange-deep); }
.duo img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(1) contrast(1.25) brightness(1.05); mix-blend-mode: multiply; }
.duo::before { content: ""; position: absolute; inset: 0; z-index: -1; background: var(--orange-bright); }      /* teinte des clairs */
.duo::after  { content: ""; position: absolute; inset: 0; background: var(--brown-deep); mix-blend-mode: lighten; } /* teinte des ombres */

/* Découpe en crêtes (masque de la photo) */
.duo--back  { height: 100%; clip-path: polygon(0 60%, 9% 30%, 17% 52%, 27% 8%, 38% 48%, 46% 30%, 55% 56%, 66% 12%, 76% 44%, 85% 26%, 100% 50%, 100% 100%, 0 100%); }
.duo--front { height: 58%;  clip-path: polygon(0 40%, 12% 10%, 22% 46%, 34% 30%, 50% 62%, 63% 24%, 74% 44%, 88% 4%, 100% 32%, 100% 100%, 0 100%); }
.duo--front::before { background: var(--orange); }   /* plan avant plus sombre */

/* Produit sur disque orange (cadre rond autocollant) */
.disc { width: 78%; aspect-ratio: 1; border-radius: 50%; overflow: hidden; background: var(--orange);
  border: var(--stroke) solid var(--ink); box-shadow: var(--shadow-hard-lg); }
.disc img { width: 100%; height: 100%; object-fit: cover; filter: var(--grade-pop); }

/* Photo collée dans une carte saveur */
.snap { aspect-ratio: 4 / 3; overflow: hidden; border: var(--stroke) solid var(--ink); border-radius: var(--radius-sm);
  background: var(--cream); box-shadow: var(--shadow-hard); transform: rotate(-3deg); }
.snap img { width: 100%; height: 100%; object-fit: cover; filter: var(--grade-pop); }
```

Sur un fond photo, un texte se pose toujours sur un **aplat** (étiquette `--ink`, pilule jaune), jamais directement sur l'image.

## 4. Intégration

- `<img>` avec `width`/`height`, `alt` en français qui décrit la photo (« Grimpeur sur une falaise de grès rouge »), `loading="lazy"` partout sauf l'image du héros (`fetchpriority="high"`). Les bandes d'aventure du héros sont décoratives : `alt=""` + conteneur `aria-hidden="true"`.
- Formats : AVIF/WebP via `<picture>` ou un CDN d'images (`w=2000` pour les bandes du héros, `w=1000` pour le disque produit, `w=800` pour une carte) ; héros ≤ 300 Ko.
- Couleur de repli : `--orange-deep`, `--orange`, `--cream` sur chaque conteneur ; si une photo ne charge pas, la forme de crête ou le disque restent en aplat et la page garde son allure d'affiche.
- **React Native / Expo** : `expo-image` (`contentFit="cover"`, `placeholder={{ blurhash }}`, `transition={300}`) ; pas de `mix-blend-mode` en natif → **pré-calculer le duotone** (export des photos déjà teintées) ; crêtes = `react-native-svg` `ClipPath` + `Image`, ou `@shopify/react-native-skia` (`ColorMatrix` pour le duotone).

## 5. 3D

**Optionnelle.** Usage précis et sobre : dans la section brune, remplacer le disque photo par l'**emballage de la barre en 3D** (le `.glb` du packaging, ou un pavé `RoundedBoxGeometry` aux bords sertis avec la texture de l'emballage), posé sur le disque orange, qui tourne de -12° à +12° en suivant le pointeur et fait un petit saut (`--ease-pop`) au clic sur « Composer ma box ». Lumière franche d'un côté (ombre dure : `DirectionalLight` + `ShadowMaterial` au sol, sans flou), matières mates (rugosité 0,7), aluplast légèrement brillant (métal 0,3) sur les sertissages.

- **Modèles** : le packaging du projet (export du fichier d'impression en texture + gabarit 3D) ; sinon un pavé texturé. Modèles libres pour prototyper : [Poly Pizza](https://poly.pizza) (CC0/CC-BY), [Kenney](https://kenney.nl/assets) (CC0).
- **Web** : Three.js (`GLTFLoader`, `RoundedBoxGeometry`) ou React Three Fiber + drei (`useGLTF`, `Float`, `ContactShadows` avec `blur={0}` pour une ombre dure).
- **React Native** : `expo-gl` + `@react-three/fiber/native`, ou une image pré-rendue.
- **Repli** : la photo du produit dans le disque si WebGL est absent ou si `prefers-reduced-motion` est actif.
