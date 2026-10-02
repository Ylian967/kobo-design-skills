# Lore Frame Editorial — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo, un personnage ou un objet : on utilise de vraies images (art de concept, photos, rendus) et, si le projet s'y prête, une vraie scène 3D. Seuls le cadre, l'étoile-boussole, le glyphe de chapitre et le logo tracé restent en SVG : ce sont des signes graphiques, pas des représentations.

## 1. Ce que montrent les images

Le style vit d'un **univers** : chaque image est un fragment de monde (un visage, une ville, un lieu) qu'on montre comme une planche de livre d'art.

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `opening-illustration` | Un personnage ou un masque, regard vers l'objectif ou de trois quarts | Plein cadre (100vw × 100vh), visage au tiers droit, espace libre en haut à gauche pour l'intro | Nuit, une seule source latérale, fond presque noir | Teinte violette (`--accent` en `soft-light`) + dégradé `--ink` en bas pour le manifeste |
| `archive` (vignette-onglet) | Un lieu de l'univers : rue, ruelle, intérieur | 16:10, petite (180px) | Néon, pluie, reflets | Teinte violette + coin « onglet » |
| `subject` (vignette carrée) | Un second lieu ou un détail (enseigne, fenêtre) | 1:1, 200px | Néon froid (cyan/magenta) | Teinte violette + coin coupé |
| `key-art` | L'image-clé : une ville, une tour, un panorama | Portrait ~3:4, pleine hauteur de la colonne droite | Nuit, beaucoup de petites lumières | Teinte violette + coin coupé, zoom 1.04 au survol |
| `landscape` | Le monde vu de loin (ville, vallée, côte) | Plein cadre 16:9 | Sombre, profondeur, brume | Assombri (`brightness(.55)`), voile `--ink` pour que le glyphe blanc ressorte |
| `faction-*` | Un visage ou une silhouette par faction | 3:4, 160px | Une couleur dominante différente par faction | Teinte violette + liseré `--signal` |

**Règle de cohérence** : toutes les images sont **nocturnes, sombres et teintées vers le violet de lore** ; aucune image de jour, aucune couleur saturée qui ne passe pas par la teinte. Une image claire ou souriante casse immédiatement le registre « livre d'art ».

## 2. Où les trouver

1. **L'art du projet** (concept art, illustrations, key art, captures du jeu) : toujours en priorité. Si l'univers a un illustrateur, lui commander les 6 emplacements ci-dessus avec ces cadrages.
2. **Banques gratuites** : [Unsplash](https://unsplash.com) et [Pexels](https://www.pexels.com) (licences gratuites, usage commercial permis ; créditer le photographe est apprécié). Mots-clés qui marchent :
   - FR : « ville futuriste nuit », « rue néon pluie », « masque obscurité », « cyberpunk ruelle », « portrait clair-obscur ».
   - EN : « neon city aerial night », « rainy street neon », « white mask dark », « cyberpunk alley », « low key portrait », « dystopian skyline ».
3. **Génération IA** (Midjourney, Flux, DALL·E, Firefly…) — prompts de départ (ajouter `--ar 16:9` ou `--ar 3:4` selon l'emplacement) :
   - `opening-illustration` :
     > concept art portrait of a masked sentinel in darkness, face lit from one side by a cold violet rim light, painterly digital illustration, deep indigo and black background with a faint acid-green glow, cinematic, art book quality, empty negative space top left, no text, no logo
   - `key-art` :
     > vertical concept art of a dense futuristic city at night seen from above, thousands of small lights, violet and teal haze, a single tall watchtower in the center, painterly matte painting, art book plate, no text, no logo
   - `landscape` :
     > wide matte painting of a quiet dark world, distant city in fog, muted violet and grey, cinematic depth, very dark lower half, room for a large white symbol in the center, no text, no logo
4. **À éviter** : photos de stock lumineuses ou souriantes, fonds blancs, images reconnaissables d'une licence existante (personnages, logos, symboles d'un jeu), vignettes carrées sans coin coupé, images au ratio imposé par un CMS qui coupe les visages.

## 3. Traitements (code)

```css
/* Teinte de lore : la photo passe sous un voile violet, les noirs restent profonds */
.media { position: relative; overflow: hidden; background: var(--ink); isolation: isolate; }
.media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
  filter: saturate(.8) contrast(1.05); transition: transform var(--dur-fast) var(--ease); }
.media::before { content: ""; position: absolute; inset: 0; z-index: 1; background: var(--accent);
  mix-blend-mode: soft-light; opacity: .55; pointer-events: none; }
.media:hover img { transform: scale(1.04); }

/* Chapitre plein cadre : dégradé de lisibilité pour l'intro (haut gauche) et le manifeste (bas) */
.art::after { content: ""; position: absolute; inset: 0; z-index: 2; pointer-events: none;
  background: linear-gradient(180deg, rgb(27 23 38 / .55), transparent 35% 55%, var(--ink)); }

/* Paysage : assombri pour porter le glyphe blanc */
.art--landscape img { filter: brightness(.55) saturate(.7); }

/* Coin coupé et onglet (la forme reste en CSS, l'image passe dedans) */
.chamfer { clip-path: polygon(0 0, calc(100% - var(--chamfer)) 0, 100% var(--chamfer), 100% 100%, var(--chamfer) 100%, 0 calc(100% - var(--chamfer))); }
.tab { clip-path: polygon(0 0, 34% 0, 40% 10%, 100% 10%, 100% 100%, 0 100%); }
```

Image manquante : le conteneur garde son fond `--ink` et son coin coupé, avec le label mono `IMAGE · À VENIR`.

## 4. Intégration

- `<img>` avec `width`/`height` (ou `aspect-ratio` sur le conteneur), `alt` qui décrit la scène (« Un masque blanc qui émerge de l'obscurité »), `loading="lazy"` sauf l'image d'ouverture (`fetchpriority="high"`, pas de lazy).
- Formats : AVIF/WebP via `<picture>` ou un CDN d'images ; ouverture ≤ 300 Ko, vignettes ≤ 60 Ko (servies à 2× leur taille d'affichage).
- `object-position` pour garder le visage dans le cadre quand le ratio change (mobile : `object-position: 65% 30%` pour un visage au tiers droit).
- Couleur de repli = `background: var(--ink)` sur chaque conteneur : le texte blanc reste lisible si l'image ne charge pas.
- **React Native / Expo** : `expo-image` (`contentFit="cover"`, `placeholder` en blurhash, `transition={300}`) ; teinte = une `View` absolue `backgroundColor: accent, opacity: .3` par-dessus (pas de `mix-blend-mode` en natif) ; coin coupé = `MaskedView` + `react-native-svg`.

## 5. 3D

**Optionnelle.** Le style est d'abord une suite de planches. Usage sobre qui marche : pour le chapitre « Le monde », remplacer l'image `landscape` par une **maquette 3D low-poly de la ville** vue de très haut, qui tourne de quelques degrés au défilement (pas d'interaction libre).

- **Quoi** : un diorama de ville (blocs, une tour plus haute au centre), sans textures, posé sur un plan.
- **Matières et lumière** : `MeshStandardMaterial` couleur `--ink` éclaircie, rugosité 0,9 ; une lumière directionnelle rasante teintée `--accent` ; `scene.fog = new THREE.Fog(ink, 8, 20)` pour la profondeur ; quelques points émissifs `--signal` pour les fenêtres.
- **Caméra** : perspective 30°, plongée à 60°, rotation liée au défilement (±8°).
- **Modèles** : modèle du projet en `.glb` (compressé Draco/Meshopt), ou kits libres [Kenney City Kit](https://kenney.nl/assets) (CC0), [Quaternius](https://quaternius.com) (CC0), [Poly Pizza](https://poly.pizza) (CC0/CC-BY). Vérifier la licence et créditer si CC-BY.
- **Web** : Three.js (`GLTFLoader` + `DRACOLoader`) ou React Three Fiber + drei (`useGLTF`, `Fog`, `ScrollControls`).
- **React Native** : `expo-gl` + `@react-three/fiber/native`, ou une image pré-rendue de la maquette.
- **Repli** : la photo `landscape` reste sous le canvas ; elle s'affiche si WebGL est absent ou si `prefers-reduced-motion` est actif. Le glyphe blanc reste en SVG au-dessus.
