# Glass Frame Estate — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo de maison, d'intérieur ou de personne. Seuls les signes restent en SVG : logo, flèche, épingle, pictogrammes des puces, chevron.

Le style est **noir, blanc et gris** : toute la couleur vient des photos. Il en faut beaucoup (la démo en montre une quarantaine) et elles doivent se ressembler.

## 1. Ce que montrent les images

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière |
|---|---|---|---|
| `hero-photo` | **Un seul bâtiment à la silhouette simple** (maison en A, pignon, cube) devant un **ciel dégagé** | Paysage 4:3 ou 16:9, sommet du bâtiment dans le quart haut, ciel uni autour du sommet, sol sombre en bas | Jour franc ou fin de journée ; ciel bleu ou doré, jamais blanc |
| `hero-back` | La même photo, floutée | Même fichier en 480px avec flou serveur | — |
| `agent-portrait` | Le conseiller, visage cadré serré | ≈ 8:7, 320px | Fond neutre |
| `about` | Détail d'architecture vertical (angle de façade, terrasse, végétation) | 2:3 | Naturelle |
| `listing-1…4` | Un bien par carte : façade entière, piscine, ou séjour pour un appartement | 5:4 (580 × 460) | Ciel bleu ou heure bleue ; pas de nuit noire |
| Vignettes de service | Trois biens par service | Carré, 200px | Variées |
| Quartiers | Une vue reconnaissable par ville : canal, quai, place, toits | ≈ 1:1 (270 × 250) | Jour |
| `film` | Grande vue d'ensemble d'une villa (ou vidéo de visite) | 12:7, 2000px | Fin de journée |
| Étapes | Une scène par étape : séjour vide, façade, maquette et clés, clés en main | 4:3 | Douce |
| Témoignages | Portraits en situation, souriants, cadrés poitrine | 8:9 | Extérieur doux |
| Agents | Portraits de studio, buste, **fond gris neutre**, même distance | ≈ 1:1 (380 × 399) | Studio |
| Articles | Façades et intérieurs | 5:3 et 5:4 | Jour |
| Pied de page | Tour ou façade graphique en contre-plongée | Paysage | Convertie en gris, 28 % d'opacité |

**Cohérence** : pas de grand-angle déformant, horizons droits, pas de personnages dans les photos de biens ; les six portraits d'agents sur le même type de fond.

## 2. La photo du héros et son détourage

Le mot-marque passe **derrière** le bâtiment. Pour cela la photo est posée deux fois et la copie du dessus est découpée au contour du bâtiment :

```css
.shot { position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  width: max(100%, var(--hero-h) * 1.3323);   /* 1.3323 = largeur / hauteur de la photo */
  aspect-ratio: 1600 / 1201; }
.shot.front { clip-path: polygon(56.9% 4.9%, 77.5% 33.6%, 98% 74%, 33% 72.4%); }
```

Relever le polygone d'une nouvelle photo :
1. Ouvrir la photo, noter ses dimensions (ici 1600 × 1201) et reporter le ratio dans `.shot`.
2. Relever en pixels les points du contour du bâtiment **au-dessus de la ligne où finissent les lettres** (ici : le sommet, un point sur le pan droit, les deux pieds du toit). Diviser par la largeur et la hauteur pour obtenir des pourcentages.
3. Vérifier en grand que le bord du toit n'est ni rogné ni doublé d'un liseré de ciel.

Choisir une photo qui s'y prête : **arêtes droites** (trois à six points suffisent), pas d'arbre ni de fil devant le bâtiment à hauteur des lettres. Si la silhouette est complexe, fournir à la place un PNG détouré du bâtiment, posé au même endroit.

Écran étroit : `.shot` couvre en hauteur ; le recentrer sur le bâtiment (`translateX(-57%)` ici, le sommet étant à 57 % de la largeur).

## 3. Où les trouver

1. **Les photos du projet** : reportage du photographe de l'agence, portraits de l'équipe sur un même fond.
2. **Banques libres** : [Unsplash](https://unsplash.com), [Pexels](https://www.pexels.com). Recherches utiles : `a-frame house`, `modern villa exterior`, `modern house exterior evening`, `modern interior living room`, `house keys`, `professional headshot grey background`, `real estate agent portrait`, plus le nom de chaque ville.
3. **Génération** — prompts de départ :
   > Architectural photograph of a dark timber A-frame house with a fully glazed gable, seen from the front three-quarter, clean triangular silhouette against a clear deep blue sky, a few pine trees on the left, wooden deck in the foreground, natural daylight, 35mm, straight verticals, no people, no text, 4:3

   > Studio portrait of a real estate advisor, chest-up, dark blazer, neutral mid-grey seamless background, soft key light from the left, calm friendly expression, 85mm, 1:1
4. **À éviter** : ciel blanc ou brûlé (le mot-marque y disparaît), HDR, intérieurs encombrés, portraits sur fond blanc pur, photos d'un template ou d'une agence existante.

## 4. Traitements

```css
.ph { overflow: hidden; border-radius: var(--r-card); background: var(--surface); }   /* repli pendant le chargement */
img { width: 100%; height: 100%; object-fit: cover; }
.frame::after { background: linear-gradient(var(--veil), var(--veil)),
  linear-gradient(180deg, var(--shade-0) 46%, var(--shade-1) 96%); }                  /* voile du héros */
.say.photo::before { background: linear-gradient(180deg, var(--shade-0) 40%, var(--ink) 96%); }
.foot > img { opacity: 0.28; filter: grayscale(1); }
```

- **Aucun filtre de couleur** sur les photos de biens : le site les montre telles quelles.
- Paramètres d'image (Unsplash / imgix) : `fit=crop&w=…&h=…` au ratio de l'emplacement ; `fit=facearea&facepad=3` pour recadrer un portrait sur le visage ; `blur=160` pour le fond du héros.
- `loading="lazy"` partout sauf la photo du héros (`fetchpriority="high"`). Texte alternatif descriptif pour les biens, vide pour les vignettes décoratives.

## 5. 3D (optionnel)

Le style n'en a pas besoin. Si le projet possède une **maquette 3D d'un bien** (`.glb`), elle peut remplacer la photo de la section « film » ou la galerie d'une fiche : Three.js, fond `--surface`, lumière douce, rotation lente au glisser, 30 images/s au plus, rendu arrêté hors écran. Jamais dans le héros, qui reste une photo.

## 6. Photos de la démo (Unsplash, licence libre)

Héros : `photo-1720876988024-bbc62e64f02e` (maison en A). Annonces : `1670589953882-b94c9cb380f5`, `1738168246881-40f35f8aba0a`, `1748063578185-3d68121b11ff`, `1696237461860-630be53f179c`. Les autres identifiants sont dans `examples/demo.html`. À remplacer par les images du projet.
