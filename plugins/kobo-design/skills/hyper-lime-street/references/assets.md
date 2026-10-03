# Hyper Lime Street — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer un personnage, un décor ou une capture de jeu. Seuls les **signes** sont en CSS ou SVG : bandes inclinées, blocs lime, pellicule, flèches, pictogrammes, logo.

Sur le site de référence, les images sont des **illustrations du jeu** : un visuel clé, des personnages détourés, des vignettes de vidéos, des bannières. La démo les remplace par des photos de rue.

## 1. Ce que montrent les images

| Emplacement | Sujet | Cadrage | Notes |
|---|---|---|---|
| `hero` | Le visuel clé : une rue, une scène d'action, plusieurs personnages | Paysage 5:3, 2000px ; tiers bas un peu sombre (accroche et boutons) | Couleurs saturées : rose, cyan, néons |
| Personnage | Un personnage par fiche, **visage et buste**, regard fort | Paysage 14:9 ; le sujet au centre gauche, il sera vu dans une bande inclinée | Idéalement un PNG détouré qui dépasse du panneau ; sinon une photo découpée |
| Vignettes | Le même visuel, réduit | 120 × 80px | — |
| Vidéo | Image arrêtée d'une scène d'action (saut, course, combat) | 2:1 ; sujet à gauche, le bord droit est coupé en diagonale | Voile en bas pour la légende |
| Actualité | Bannière d'annonce | 2:1, 1400px | Laisser le coin haut gauche libre (étiquette) |
| Univers | Un lieu du jeu : ruelle, quartier, salle | 16:9 | Voile en bas pour le nom du lieu |
| Caractéristique | Capture de jeu spectaculaire | 2:1 ; le bas droit reçoit un titre lime | Image plutôt sombre ou bleue : le lime doit ressortir |

**Cohérence** : ville la nuit, néons, béton, mouvement. Pas de paysage naturel, pas de photo de studio sur fond blanc (sauf personnage détouré), pas d'image pastel.

## 2. Où les trouver

1. **Les visuels du projet** : illustrations, rendus des personnages (PNG détourés), captures et bandes-annonces. Toujours en priorité.
2. **Banques libres** : [Unsplash](https://unsplash.com), [Pexels](https://www.pexels.com). Recherches utiles : `tokyo street night neon`, `techwear portrait`, `streetwear fashion portrait urban`, `skateboarder trick`, `graffiti alley`, `arcade neon`, `parkour urban`.
3. **Génération** — prompts de départ :
   > Anime-style key visual, three young characters in techwear sitting on the hood of a white 80s car in a neon-lit city street at night, dynamic low angle, saturated pink and cyan signs, crisp cel shading, no text, 5:3

   > Full-body character render, urban fox-eared swordsman in a long dark coat, confident pose, flat cel shading, transparent background, 3:4
4. **À éviter** : visuels d'un jeu existant, logos de plateformes ou de consoles sans autorisation (la démo écrit « PC », « Console », « iOS », « Android » en toutes lettres), photos floues ou ternes.

## 3. Traitements

```css
/* Une photo n'est jamais inclinée : elle est découpée à l'angle commun */
.cut { position: absolute; inset: 0 -30vw 0 0;
  clip-path: polygon(calc(var(--panel-h) * var(--slant)) 0, 100% 0, 100% 100%, 0 100%); }
.cut::after { content: ""; position: absolute; inset: 0; background: linear-gradient(0deg, var(--veil), transparent 50%); }  /* sous un texte */
.world .card { border-radius: var(--r-shape); box-shadow: 10px 10px 0 var(--accent); }                                       /* ombre lime pleine */
```

- **Aucun filtre de couleur** : les images gardent leurs teintes ; c'est le lime et le noir autour qui font l'identité.
- Personnage détouré (PNG) : le poser dans le panneau avec `object-fit: contain`, ancré en bas, et le laisser dépasser de 8 à 15 % au-dessus (`inset-block: -12% 0`), sans `clip-path`.
- Tailles : 2000px pour le visuel clé, 1400–1600px pour les panneaux, 120px pour les vignettes ; `loading="lazy"` partout sauf le visuel clé.
- Texte alternatif : ce que montre l'image ; vide pour les vignettes (le bouton porte le nom).

## 4. Formes (CSS, pas des images)

Le site utilise des PNG pour ses bandes et ses blocs (`bg-nav`, `chara-panel`, `panel`, `fill-film-bar`). Le skill les refait en CSS pour qu'ils s'adaptent à toutes les largeurs :

```css
.shape { border-radius: var(--r-shape); transform: skewX(calc(var(--angle) * -1)); }            /* 41° */
.slab  { background: var(--ink) repeating-linear-gradient(135deg, var(--hatch) 0 2px, transparent 2px 6px); }
.film  { height: 26px; transform: rotate(calc(var(--angle) - 90deg));
  background: var(--ink) repeating-linear-gradient(90deg, transparent 0 14px, var(--bg) 14px 28px) 0 50% / 100% 12px no-repeat; }
```

## 5. 3D (optionnel)

Le style n'en a pas besoin. Si le projet a un **modèle 3D d'un personnage** (`.glb`), il peut remplacer la photo de la fiche : Three.js, fond transparent posé sur le panneau blanc, rotation au glisser, éclairage à plat (matériaux sans reflets) pour rester proche du dessin, 30 images/s au plus, rendu arrêté hors écran.

## 6. Photos de la démo (Unsplash, licence libre)

Visuel clé : `photo-1551641506-ee5bf4cb45f1` (rue aux néons). Personnages : `1769414761120-a186e3bad614`, `1769414761122-6ca0d27fa504`, `1563879749063-046655493341`, `1785414671439-e220425de0e5`. Vidéos : `1723236900134-63561e5832b3`, `1663243216708-a7831e1a9c55`, `1597019558926-3eef445fdf60`. Les autres identifiants sont dans `examples/demo.html`. À remplacer par les visuels du projet.
