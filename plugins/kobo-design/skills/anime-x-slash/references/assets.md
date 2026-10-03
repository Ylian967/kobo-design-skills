# Anime X Slash — images et 3D

> Les visuels font la moitié du style. **Jamais** de personnage, d'arme ou de décor dessiné en CSS, SVG ou canvas : ce sont de **vraies images** (illustrations du projet en priorité, photos sinon). Restent dessinés, parce que ce sont des signes : le logotype, le X découpé, les éclats triangulaires, les trames de points, les filets de fond, les étiquettes.

## 1. Ce que montrent les images du site de référence (relevé le 2026-10-03)

Le site est celui d'une série animée : toutes les images sont des **illustrations de personnages très colorées**, au trait net, sur fond clair ou sur éclats de couleur vive.

| Emplacement (`data-slot`) | Sur le site | Dans le skill | Cadrage | Traitement |
|---|---|---|---|---|
| `hero-chara` (héros) | une illustration de groupe : 10 personnages en éventail autour d'un héros central en costume blanc, éclats triangulaires multicolores, sur un logotype magenta géant | **5 portraits** dans des éclats en parallélogramme, le sujet d'action au centre | portrait 3:4, sujet centré ; `--pos` par photo | **couleur d'origine**, aucun filtre |
| vignettes du sélecteur | 4 variantes du visuel | 3 variantes du visuel central | carré 44px | niveaux de gris, la vignette active en couleur |
| `trailer` | vidéo de la bande-annonce sous un voile noir à 80 % | rue de nuit, enseignes | 16:9 ou plus large | opacité 32 % sur noir, vue à travers le X |
| `chara-card` (grille) | un personnage par carte, buste, couleurs vives, fond propre à chacun | portraits éclairés au néon, armures, danseurs | 3:4 serré, visage dans le tiers haut | **couleur** ; les autres cartes passent en gris au survol |
| menu ouvert | illustration de groupe | photo de groupe ou de combat | plein écran | niveaux de gris + voile `--menu-veil` |
| fiche personnage | personnage en pied sur éclats de sa couleur | photo en pied | 3:4 | couleur ; grille du bas en gris sauf l'actif |
| épisodes, vidéos | image fixe 16:9 | idem | 16:9 | gris au repos, couleur au survol (épisodes) |

**Règle de cohérence** : les images sont **vives et saturées** (magenta, cyan, jaune, violet), c'est l'interface qui est stricte (gris papier, noir, rouge). Le noir et blanc n'est pas un style d'image : c'est un **état** (carte non survolée, vignette non choisie, fond du menu).

## 2. Où les trouver

1. **L'art du projet** : visuel clé, personnages détourés en PNG, images d'épisodes. Toujours en priorité, avec les droits. Demander un personnage par fichier, fond transparent ou uni : ils se placent directement dans les éclats du héros.
2. **Banques gratuites** (en attendant l'art) : [Unsplash](https://unsplash.com) (licence Unsplash, usage commercial permis). Chercher des portraits **très colorés** : « neon portrait », « cyberpunk portrait », « cosplay portrait », « samurai armor », « street dancer », « kendo », « tokyo night street ».
3. **Génération IA** — prompts de départ :
   - Personnage : > *anime key visual of an original action hero, half-body, confident pose, vivid saturated colors, clean cel shading, bold ink lines, plain bright background, 3:4, no text, no logo*
   - Visuel de groupe : > *anime key visual, ten original heroes fanned out around a central figure in a white suit, colorful triangular shards bursting behind them, light grey background, dynamic low angle, no text, no logo*
   - Décor : > *wide night street in a Japanese city, vertical neon signs, wet asphalt, cinematic 16:9, high contrast, no legible text*
4. **À éviter** : personnages ou logos d'une série existante ; photos ternes ou beiges ; portraits de face souriants façon banque d'images ; fonds chargés derrière le sujet des cartes (le numéro et le nom doivent rester lisibles).

## 3. Traitements (code)

```css
/* Éclat ou carte : parallélogramme, photo contre-biaisée */
.card { transform: skewX(var(--skew)); background: var(--surface); }
.card__img { position: absolute; inset: 0; overflow: hidden; background: var(--c, var(--ink)); }       /* --c : couleur du personnage, visible si l'image manque */
.card__img > div { position: absolute; top: 0; left: -72.5%; width: 247.5%; height: 100%; transform: skewX(var(--slant)); }
.card__img img { width: 100%; height: 100%; object-fit: cover; object-position: var(--pos, 50% 25%); }
/* lisibilité du nom (haut) et du numéro (bas) */
.card__img::before { top: 0; height: 30%; background: linear-gradient(color-mix(in srgb, var(--ink) 50%, transparent) 43%, transparent); }
.card__img::after  { bottom: 0; height: 30%; background: linear-gradient(transparent, color-mix(in srgb, var(--ink) 50%, transparent) 57%); }

/* État « non choisi » */
.cards:hover .card__img > div { filter: grayscale(1); }
.cards .card:hover .card__img > div { filter: none; }

/* Bande-annonce : image sombre vue à travers le X */
.trailer__x { background: var(--ink); clip-path: polygon(…); }
.trailer__x img { opacity: .32; filter: grayscale(.4); }

/* Menu : groupe en niveaux de gris sous un voile */
.menu > img { filter: grayscale(1) contrast(1.2); }  .menu::after { background: var(--menu-veil); }

/* Grand logotype tramé du héros : la moitié basse passe en points */
.ghost span:last-child { clip-path: inset(58% 0 0 0); mask: radial-gradient(circle, black 42%, transparent 46%) 0 0 / 12px 12px; }
```

## 4. Intégration

- Les images du héros ont `alt=""` ; le conteneur des éclats porte `role="img"` et un `aria-label` qui décrit l'ensemble. Les cartes ont un `aria-label` sur le lien (« Rang 3 : Dragon »).
- Visuel central : `fetchpriority="high"`, 1000px de large ; éclats latéraux 700 à 800px ; cartes 640px ; tout le reste en `loading="lazy" decoding="async"`.
- Régler `--pos` (ou `object-position`) carte par carte pour garder le visage entre le nom et le numéro.
- **React / Next** : mêmes classes ; `next/image` avec `fill` dans le conteneur contre-biaisé.
- **React Native / Expo** : `expo-image` ; parallélogramme = `View` avec `transform: [{ skewX: '-36.4deg' }]` et `overflow: 'hidden'`, image dans une `View` contre-biaisée ; gris via une image déjà traitée ou `react-native-color-matrix-image-filters`.

## 5. 3D

Optionnelle. Usage qui sert le style : sur la fiche d'un personnage, un modèle `.glb` en rendu « cel » (`MeshToonMaterial`, rampe à 3 tons, contour) qui tourne de ±20° au pointeur, à la place de l'image en pied ; le bouton rond de rotation du site (demi-tour au survol) le commande. Repli : l'image. Ne jamais remplacer un personnage par une forme 3D générique.
