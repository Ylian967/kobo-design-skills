# Mint Street Basics — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer un mannequin ou un vêtement. Restent en CSS / SVG les **formes de décor** (disques, arches, rayures, pilules) et les pictogrammes.

Tout le style repose sur des **photos de mode sur fond uni et clair**, posées dans des formes rondes. Les couleurs des vêtements sont pastel ; ce sont les fonds de la page (menthe, aqua, vert, bleu nuit) qui font l'identité.

## 1. Ce que montrent les images

| Emplacement | Sujet | Cadrage | Fond |
|---|---|---|---|
| `hero` | Un mannequin en sweat, assis ou en buste, attitude détendue | Portrait 3:5, tête dans le quart haut (elle suit la courbe de l'arche) | Uni, idéalement vert ou clair ; **l'idéal est un PNG détouré** posé sur les disques |
| Pile de collections | Le vêtement en gros plan : matière, capuche, pile de sweats, cintres | Portrait 5:6 | Clair, doux |
| Carte produit double | Deux mannequins ou un plan large | Paysage ≈ 11:6, visages en haut | Uni pastel (bleu-gris, sable) |
| Carte produit simple | Un mannequin de face, à mi-cuisse, vêtement entier | ≈ 8:9 | Blanc cassé ou gris très clair |
| Fiche produit | Le même vêtement, plan plus serré, regard caméra | Portrait 3:4 | Uni ; la carte aqua apparaît autour si le PNG est détouré |
| Essentiels (pied) | Mannequin à lunettes de soleil, de face | Portrait 3:4, visage au tiers haut | Clair |

**Cohérence** : lumière de studio douce, pas d'ombre dure ; vêtements unis sans gros logo ; une seule personne par carte simple ; même distance d'une carte à l'autre. Éviter les fonds sombres ou chargés (rue, mur de brique) dans la grille de produits.

## 2. Où les trouver

1. **Le shooting de la marque** : toujours en priorité, avec les mêmes fond et lumière pour toute une collection. Demander des **PNG détourés** pour le héros, la fiche et le pied.
2. **Banques libres** : [Unsplash](https://unsplash.com), [Pexels](https://www.pexels.com). Recherches utiles : `hoodie model studio`, `sweatshirt model`, `streetwear model pastel background`, `crewneck sweater portrait`, `oversized hoodie`, `fashion model sunglasses studio`.
3. **Génération** — prompts de départ :
   > Studio fashion photo, young woman with short blond locs and round sunglasses sitting on a pale green cube, oversized pastel yellow sweatshirt and off-white wide trousers, soft even light, plain light background, full figure, 3:5, no text

   > E-commerce product photo, male model facing camera in a plain lilac crewneck sweatshirt, cropped at mid-thigh, off-white seamless background, soft shadowless light, 8:9
4. **À éviter** : photos de rue en contre-jour, vêtements à logos, fonds noirs, poses de catalogue raides, filtres vintage.

## 3. Formes (CSS, pas des images)

```css
.disc { border-radius: 50%; background: radial-gradient(circle at 50% 38%, var(--green-2), var(--green) 70%); }   /* disque vert */
.disc.inner { background: linear-gradient(180deg, var(--mint), var(--aqua)); }                                    /* disque clair */
.arch { border-radius: 999px 999px 0 0; overflow: hidden; }                                                       /* photo en arche */
.stripes { background: repeating-linear-gradient(180deg, var(--aqua) 0 14px, transparent 14px 44px); }           /* rayures du pied */
.pdp .pic { background: linear-gradient(180deg, var(--aqua-2), var(--aqua)); border-radius: var(--r-card); }      /* carte aqua */
```

## 4. Traitements

- **Aucun filtre** sur les photos. Pas de mode de fusion.
- Photo non détourée : la poser dans une **arche** (`.arch`) ou une carte à coins de 28px, `object-fit: cover`.
- Photo détourée (PNG) : `object-fit: contain`, ancrée en bas, directement sur les disques ou la carte aqua ; elle peut dépasser en haut.
- Paramètres d'image (Unsplash / imgix) : `fit=crop&w=…&h=…` au ratio de l'emplacement ; `crop=top` ou `crop=faces` quand le visage doit rester dans le cadre.
- `fetchpriority="high"` pour la photo du héros, `loading="lazy"` ailleurs. Texte alternatif : la personne et le vêtement (« Homme en sweat blanc sur fond blanc »).
- Les **pastilles de couleur** reprennent la teinte réelle du vêtement (`--c-cream`, `--c-sage`…) ; ce ne sont jamais des filtres appliqués à la photo.

## 5. 3D (optionnel)

Le style n'en a pas besoin. Pour une fiche produit avancée, un vêtement en 3D (`.glb`) peut remplacer la photo de la carte aqua : Three.js, fond transparent, rotation au glisser, lumière douce, 30 images/s au plus, rendu arrêté hors écran.

## 6. Photos de la démo (Unsplash, licence libre)

Héros : `photo-1685354218056-cb10c98b8c88`. Collections : `1699275303942-47957eea44b1`, `1685328403755-de1d57e12e63`, `1620799140408-edc6dcb6d633`. Produits : `1607437763319-f7448e0e9b21`, `1671438118257-cefa6c86fd50`, `1688111421205-a0a85415b224`, `1516195851888-6f1a981a862e`, `1601396344868-31e008cd6e7c`. Fiche : `1578587018452-892bacefd3f2`. Pied : `1784708232447-d271515fbb03`. À remplacer par les images du projet.
