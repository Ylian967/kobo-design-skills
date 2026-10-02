# Noir Inferno Chapters — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo, une foule, un visage ou un lieu : chaque chapitre est **une vraie image** (photo, illustration peinte, gravure, rendu) en noir et blanc très contrasté. Seuls la brume, le vignettage, le grain et le point du numéro restent en CSS : ce sont des effets d'atmosphère, pas des représentations.

## 1. Ce que montrent les images

Une image par chapitre, comme une gravure ou un photogramme de film muet. Les sujets sont **humains et graves** : une foule, un visage, une silhouette, une rue vide.

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `chapter-1` (ouverture) | Une foule, une rue, un lieu collectif | Plein écran 16:9 (portrait 9:16 en mobile), sujet centré, zone calme au centre pour le titre des chapitres suivants | Ciel blanc ou nuit, contraste fort | N&B dur (`grayscale(1) contrast(1.4) brightness(.85)`) + vignettage + grain |
| `chapter-n` (foule / geste) | Un geste collectif : poings levés, mains, pancartes sans texte lisible | Plein écran, ligne d'horizon haute, centre dégagé | Contre-jour ou lumière dure | Idem, plus brume |
| `chapter-n` (visage) | Un visage en gros plan, regard caméra ou baissé | Plein écran, yeux au tiers haut, titre posé sur le bas du visage ou l'ombre | Clair-obscur, une seule source | Idem, `object-position` sur les yeux |
| `chapter-last` | Une silhouette ou un visage presque englouti par le noir | Plein écran, sujet petit ou de côté, beaucoup de noir | Low key, 80 % de l'image dans l'ombre | N&B très sombre (`brightness(.6)`), vignettage renforcé |

**Règle de cohérence** : **noir et blanc strict, noirs bouchés, blancs francs**, grain visible, jamais une couleur, même résiduelle (une photo couleur passe toujours par `grayscale(1)`). Les images doivent avoir l'air de la même pellicule : même contraste, même grain.

## 2. Où les trouver

1. **Les images du projet** (photos de tournage, illustrations peintes de l'artiste, pochettes) : en priorité. Si un illustrateur est disponible, lui commander des scènes peintes au lavis ou au fusain : c'est le registre d'origine.
2. **Banques gratuites** : [Unsplash](https://unsplash.com) et [Pexels](https://www.pexels.com) (licences gratuites, usage commercial permis ; créditer le photographe est apprécié) ; archives du domaine public (Library of Congress, Wikimedia Commons, Rawpixel domaine public) pour les gravures. Mots-clés :
   - FR : « foule noir et blanc », « manifestation N&B », « portrait clair-obscur », « visage noir et blanc gros plan », « rue la nuit brouillard », « silhouette dans le noir ».
   - EN : « black and white crowd », « protest fists black and white », « low key portrait », « monochrome face close up », « foggy street night », « figure in darkness », « film noir ».
3. **Génération IA** — prompts de départ (ajouter `--ar 16:9`) :
   - foule :
     > black and white painted illustration of a dense crowd raising their fists under a white misty sky, charcoal and ink wash, heavy film grain, strong contrast, crushed blacks, solemn atmosphere, calm empty area in the center of the frame, no text, no signs, no logo
   - visage :
     > monochrome close-up portrait of a woman emerging from deep shadow, single hard side light, high contrast black and white, film grain, painterly, cinematic still from a silent film, no text, no logo
   - lieu :
     > black and white ink painting of an empty city street at night in heavy fog, parked cars, a single streetlight, dramatic vignette, grain, no text, no logo
4. **À éviter** : couleur (même un sépia léger), photos de stock lisses ou souriantes, HDR, slogans lisibles sur les pancartes (ils écrasent le titre), images de la référence, scènes reconnaissables de personnes réelles identifiables sans leur accord dans un contexte militant.

## 3. Traitements (code)

```html
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
</svg>
```

```css
/* Scène : repli = gris foncé, le titre blanc reste lisible */
.scene { position: absolute; inset: 0; overflow: hidden; background: var(--mid); }
.scene img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
  filter: grayscale(1) contrast(1.4) brightness(.85);
  transform: scale(1); transition: transform 20s linear; }          /* Ken Burns */
.chapter.is-active .scene img { transform: scale(1.06); }
.scene--dark img { filter: grayscale(1) contrast(1.5) brightness(.6); }

/* Vignettage + grain par-dessus */
.scene::before { content: ""; position: absolute; inset: 0; z-index: 1; background: var(--shade); }
.scene::after { content: ""; position: absolute; inset: 0; z-index: 2; filter: url(#grain); opacity: .14; mix-blend-mode: overlay; pointer-events: none; }

/* Brume qui dérive (au-dessus de la scène, sous le titre) */
.haze { position: absolute; inset: -20%; background: radial-gradient(40% 30% at 30% 60%, var(--haze), transparent 70%), radial-gradient(35% 25% at 70% 40%, var(--haze), transparent 70%); animation: drift var(--drift) linear infinite alternate; pointer-events: none; }
```

Si une image est claire au centre (ciel blanc), garder l'ombre large du titre (`text-shadow: 0 0 40px var(--bg)`) et renforcer `--shade` plutôt que d'assombrir toute l'image.

## 4. Intégration

- `<img>` avec `width`/`height`, `alt` qui décrit la scène (c'est le seul « texte » du chapitre pour un lecteur d'écran : « Une foule, poings levés, sous un ciel blanc »). L'image du chapitre 1 a `fetchpriority="high"` ; les suivantes `loading="lazy"`, et on précharge la suivante pendant la lecture (`new Image().src = …`) pour que le fondu ne tombe pas sur du vide.
- `object-position` par image pour garder le sujet au centre en portrait (mobile) : visage `50% 30%`, foule `50% 40%`.
- Formats : AVIF/WebP via `<picture>` ou un CDN d'images ; ≤ 300 Ko par chapitre ; une version N&B pré-traitée évite le coût du filtre sur mobile.
- Couleur de repli = `background: var(--mid)` sur chaque scène : titre et numéro blancs restent lisibles.
- **React Native / Expo** : `expo-image` (`contentFit="cover"`, `placeholder` en blurhash, `transition={600}` pour le fondu) ; pas de `filter` en natif : exporter les images déjà en N&B contrasté ; vignettage = `expo-linear-gradient` radial simulé ou PNG ; grain = PNG de bruit à 14 %.

## 5. 3D

**Optionnelle.** Usage sobre qui marche : une **parallaxe 2,5D** de la photo du chapitre, qui donne l'impression d'un plan de cinéma, plutôt qu'un objet 3D.

- **Quoi** : la photo du chapitre plaquée sur un plan subdivisé (`PlaneGeometry(16, 9, 256, 144)`), déformé par sa **carte de profondeur** (générée avec Depth Anything V2 ou MiDaS, ou peinte à la main) ; la caméra glisse de quelques centimètres (travelling très lent, ±2°) et réagit à peine au pointeur.
- **Matières et lumière** : `MeshBasicMaterial` avec la photo en `map` (déjà N&B) et `displacementMap` = carte de profondeur (`displacementScale` 0,3–0,6) ; pas de lumière. Ajouter des **particules de poussière/cendre** (`Points`, 400 points, `PointsMaterial` blanc couleur lue dans `--text`, taille 0,02, opacité 0,4) qui dérivent lentement.
- **Caméra** : perspective 30°, immobile sauf le travelling ; aucune orbite.
- **Modèles** : pas de modèle nécessaire. Pour une scène peinte en vrai volume, modèles libres sur [Poly Pizza](https://poly.pizza) (CC0/CC-BY) ou [Sketchfab](https://sketchfab.com/search?features=downloadable&licenses=7c23a1ba438d4306920229c12afcb5f9) (filtre CC), rendus en N&B avec brouillard (`FogExp2` couleur `--bg`). Vérifier la licence et créditer si CC-BY.
- **Web** : Three.js ou React Three Fiber + drei (`useTexture`, `Points`/`Sparkles` en blanc).
- **React Native** : `expo-gl` + `@react-three/fiber/native`, ou rester en image fixe avec Ken Burns (`Animated` scale 1 → 1.06).
- **Repli** : l'image N&B reste sous le canvas ; elle s'affiche si WebGL est absent ou si `prefers-reduced-motion` est actif (pas de travelling ni de particules).
