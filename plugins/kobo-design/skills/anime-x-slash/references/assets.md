# Anime X Slash — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo, un personnage ou un objet : on utilise de vraies images (illustrations du projet, photos, rendus). Les formes graphiques du style (X géant, trames, éclats, filets diagonaux) restent en CSS.

## 1. Ce que montrent les images

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `key-visual` (héros) | Le ou les héros en pose d'action (sabre sur l'épaule, garde haute) | 3:4 vertical, personnage centré, tête dans le tiers haut ; l'image est contre-biaisée dans un cadre en parallélogramme | Fond uni clair ou gris, lumière dure latérale | N&B contrasté (`grayscale(1) contrast(1.25)`) + voile `--accent` en multiply à 18 % |
| vignettes du sélecteur | Les 3 à 5 variantes du visuel principal | Carré 1:1, 44px, visage ou arme au centre | Identique au héros | N&B, bordure noire 1.6px, actif = contour rouge |
| `cut-visual` (bande découpée) | Décor : rue de nuit, toits, ville néon, scène de combat large | Panoramique 16:9 à 21:9, horizon bas | Nuit, enseignes, contrastes forts | Désaturé à 60 %, voile `--veil`, masque à deux bandes diagonales à `--slant` |
| `chara-N` (cartes de classement) | Un personnage par carte, buste ou plan américain | 3:4, cadrage serré ; `object-position` réglé par carte (`--pos`) | Contre-jour ou studio | N&B + calque `--c` (couleur du personnage) en `multiply` + trame blanche à 22 % + fondu blanc en bas pour le chiffre |
| fiche personnage (modal) | Le personnage en pied | 2:3 | Studio | N&B + liseré couleur `--c` |

**Règle de cohérence** : toutes les images sont ramenées au noir et blanc dur ; la couleur ne vient jamais de la photo mais des tokens (`--c`, `--accent`, `--veil`), une couleur de personnage par image.

## 2. Où les trouver

1. **Les images du projet** : key visuals, illustrations de personnages en PNG détouré, captures d'épisodes. Toujours en priorité (avec les droits).
2. **Banques gratuites** : [Unsplash](https://unsplash.com), [Pexels](https://www.pexels.com) (usage commercial permis, crédit apprécié). Mots-clés :
   - FR : « silhouette sabre », « katana contre-jour », « cosplay épée », « rue Tokyo nuit », « samouraï noir et blanc », « combat arts martiaux ».
   - EN : « katana silhouette », « sword backlight », « samurai black and white », « tokyo street night neon », « cosplay sword studio », « martial arts action ».
3. **Génération IA** (Midjourney, Flux, DALL·E, Firefly) — prompts de départ :
   - `key-visual` :
     > Anime-style key visual of a lone hero in a black coat resting a katana on his shoulder, dynamic low angle, plain light grey background, hard side light, cel-shaded, bold ink lines, high contrast black and white with no color, vertical 3:4, no text, no logo
   - `cut-visual` :
     > Wide night street in a Japanese city, red vertical neon signs, wet asphalt reflections, cinematic 21:9, deep shadows, high contrast, slightly desaturated, no people in focus, no text legible, no logo
   - `chara-N` :
     > Half-body portrait of an original anime action hero, confident pose, backlit rim light, plain background, monochrome high-contrast cel shading, 3:4, no text, no logo
4. **À éviter** : personnages, logos ou captures d'une série existante ; photos de stock souriantes ; images déjà très colorées qu'on laisserait en couleur (elles cassent la règle des trois couleurs) ; fonds chargés derrière les personnages des cartes (le chiffre devient illisible).

## 3. Traitements (code)

```css
/* Héros : photo N&B contre-biaisée dans un cadre en parallélogramme + voile rouge */
.hero__slot { position: relative; aspect-ratio: 3/4; overflow: hidden; background: var(--muted); transform: skewX(var(--skew)); border: var(--border-bold) solid var(--ink); }
.hero__slot img { position: absolute; top: 0; left: -35%; width: 170%; height: 100%; object-fit: cover; transform: skewX(calc(var(--skew) * -1)); filter: grayscale(1) contrast(1.25); }
.hero__slot::after { content: ""; position: absolute; inset: 0; background: var(--accent); mix-blend-mode: multiply; opacity: .18; pointer-events: none; }

/* Carte de classement : N&B + couleur du personnage + trame */
.rank-card__art { position: absolute; inset: -10% -30%; background: var(--ink); transform: skewX(calc(var(--skew) * -1)); }
.rank-card__art img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: var(--pos, 50% 30%); filter: grayscale(1) contrast(1.3); }
.rank-card__art::before { content: ""; position: absolute; inset: 0; z-index: 1; background: var(--c); mix-blend-mode: multiply; }
.rank-card__art::after { content: ""; position: absolute; inset: 0; z-index: 1; background: radial-gradient(circle, rgb(255 255 255 / .22) 30%, transparent 32%) 0 0/10px 10px; }

/* Bande découpée en X : photo de décor masquée par deux bandes à l'angle --slant */
.x-cut { position: absolute; inset: 0; background: var(--ink);
  -webkit-mask-image: linear-gradient(57deg, transparent 0 14%, #000 14% 38%, transparent 38% 41%, #000 41% 64%, transparent 64%);
          mask-image: linear-gradient(57deg, transparent 0 14%, #000 14% 38%, transparent 38% 41%, #000 41% 64%, transparent 64%); }
.x-cut img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(.6) contrast(1.2); }
.x-cut::after { content: ""; position: absolute; inset: 0; background: var(--veil); }
```

Changement de visuel (sélecteur) : fondu de l'image à 0 en 250ms, changement de `src`/`alt`, retour à 1 ; immédiat si `prefers-reduced-motion`.

## 4. Intégration

- `<img>` avec `width`/`height`, `alt` qui décrit l'image (« Homme vêtu de noir, sabre posé sur l'épaule »), `loading="lazy"` sauf le visuel du héros (`fetchpriority="high"`). Les vignettes du sélecteur ont `alt=""` : le bouton porte le libellé.
- Bande découpée décorative : conteneur `aria-hidden="true"`, `alt=""`.
- Formats : AVIF/WebP via `<picture>` ou un CDN d'images ; héros ≤ 300 Ko ; cartes 600px de large suffisent.
- Repli : chaque conteneur a un fond token (`--muted` pour le héros, `--ink` pour les cartes et la bande) ; avec le calque `--c`, une carte sans image reste une carte de couleur lisible.
- **React Native / Expo** : `expo-image` (`contentFit="cover"`, `placeholder` blurhash, `transition={250}`) ; N&B via une version pré-traitée côté serveur ou `react-native-color-matrix-image-filters` (`Grayscale`) ; le calque couleur = une `View` absolue `backgroundColor: c` avec `mixBlendMode: 'multiply'` (RN ≥ 0.77) ou opacité 0.45 sinon.

## 5. 3D

Optionnelle. Seul usage sobre qui sert le style : dans la fiche d'un personnage, un modèle `.glb` cel-shadé (`MeshToonMaterial` avec une rampe à 3 tons, contour par `OutlineEffect` de three/addons) qui tourne de ±20° au pointeur, fond `--bg`, posé dans le même parallélogramme que les cartes. Modèles : ceux du projet, ou libres sur [Quaternius](https://quaternius.com) (CC0), [Poly Pizza](https://poly.pizza), [Sketchfab](https://sketchfab.com) filtre CC (créditer si CC-BY). Web : Three.js ou React Three Fiber + drei (`useGLTF`) ; React Native : `expo-gl` + `@react-three/fiber/native`. Repli : l'illustration N&B de la fiche si WebGL est absent ou en mouvement réduit.
