# {{Nom du style}} — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo, un personnage ou un objet : on utilise de vraies images (photos, rendus, illustrations) et, quand le style le demande, une vraie scène 3D.

## 1. Ce que montrent les images

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `hero` | {{sujet}} | {{ex. plein cadre 16:9, sujet au tiers droit}} | {{ex. contre-jour, nuit}} | {{ex. duotone vert, grain}} |
| {{…}} | | | | |

**Règle de cohérence** : {{une phrase — ex. « toutes les photos sont froides et désaturées, jamais de couleurs vives »}}.

## 2. Où les trouver

1. **Les images du projet** (photos produit, portraits, captures) : toujours en priorité.
2. **Banques gratuites** : [Unsplash](https://unsplash.com) et [Pexels](https://www.pexels.com) (licences gratuites, usage commercial permis ; créditer le photographe est apprécié). Mots-clés qui marchent : {{« … », « … », « … »}}.
3. **Génération IA** (Midjourney, Flux, DALL·E, Firefly…) — prompt de départ :
   > {{prompt en anglais décrivant sujet, lumière, palette, objectif, grain, sans texte ni logo}}
4. **À éviter** : {{ex. photos de stock souriantes, fonds blancs génériques, images d'un jeu ou d'une marque existante}}.

## 3. Traitements (code)

```css
/* {{nom du traitement}} */
.media { position: relative; overflow: hidden; background: var(--{{token de repli}}); }
.media img { width: 100%; height: 100%; object-fit: cover; }
```

## 4. Intégration

- `<img>` avec `width`/`height` ou `aspect-ratio`, `alt` qui décrit l'image, `loading="lazy"` sauf l'image du héros (`fetchpriority="high"`).
- Formats : AVIF/WebP via `<picture>` ou un CDN d'images ; héros ≤ 300 Ko.
- Couleur de repli (`background` du conteneur) = un token, pour que la page reste lisible si l'image ne charge pas.
- **React Native / Expo** : `expo-image` (`contentFit="cover"`, `placeholder` en blurhash, `transition={300}`).

## 5. 3D

{{Soit « Optionnelle : … », soit la recette complète ci-dessous.}}

- **Quoi** : {{objet / scène}}.
- **Matières et lumière** : {{ex. MeshPhysicalMaterial métal 1, rugosité 0,15, environnement RoomEnvironment, tone mapping ACES}}.
- **Modèles** : modèle du projet en `.glb` (compressé Draco/Meshopt), ou modèles libres : [Poly Pizza](https://poly.pizza) (CC0/CC-BY), [Kenney](https://kenney.nl/assets) (CC0), [Quaternius](https://quaternius.com) (CC0), [Sketchfab](https://sketchfab.com/search?features=downloadable&licenses=7c23a1ba438d4306920229c12afcb5f9) (filtre CC). Vérifier la licence et créditer si CC-BY.
- **Web** : Three.js (`GLTFLoader` + `DRACOLoader`) ou React Three Fiber + drei (`useGLTF`, `Environment`, `Float`).
- **React Native** : `expo-gl` + `@react-three/fiber/native` + `@react-three/drei/native`, ou une image pré-rendue si l'appareil est faible.
- **Repli** : image fixe du rendu si WebGL est absent ou si `prefers-reduced-motion` est actif.
