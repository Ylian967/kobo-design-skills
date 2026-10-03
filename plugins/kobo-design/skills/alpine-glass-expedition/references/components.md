# Alpine Glass Expedition — composants

Toutes les valeurs viennent de `tokens.css`. Code complet dans `examples/demo.html`. « Relevé » = mesuré sur l'image de référence (maquette 1440px) ; « proposé » = ajouté par le skill pour faire une page complète.

## 1. Navigation (relevé)

Barre de 86px **sans fond**, posée sur la brume claire de la photo, texte **sombre** `--ink`. Grille 3 colonnes.
- **Logo** à gauche (marge `--edge`, 91px) : petit signe (≈ 27 × 23px) + nom en **serif** 500, ≈ 29px, approche −0.02em.
- **Liens** centrés sur la page : Archivo 600, 16px, capitales, approche `--ls-nav` (.1em), écart 82px. Survol : filet 1px qui s'étire.
- **Pilule blanche** à droite (marge `--edge-end`, 74px) : ≈ 199 × 54px, rayon plein, texte `--ink` Archivo 600 16px capitales `--ls-btn`. Détail relevé : **lueur bleue en haut** de la pilule (`--pill-glow` → blanc à 38 %).
- Après le héros (proposé) : fond `--deep` à 94 %, texte blanc, hauteur 70px, filet bas `--line`.
- Mobile : logo + pilule « Menu » ; panneau plein écran `--deep`, liens en serif capitales 44px.

```css
.pill { height: var(--pill-h); padding: 0 26px; border-radius: var(--r-pill); color: var(--ink);
  background: linear-gradient(180deg, var(--pill-glow), var(--white) 38%);
  font: 600 var(--fs-ui)/1 var(--font-ui); letter-spacing: var(--ls-btn); text-transform: uppercase; }
```

## 2. Photo du héros et voile diagonal (signature, relevé)

Une **vraie photo** plein cadre (sujet : une personne en montagne, de près, dans la brume), refroidie sur la rampe du skill. Par-dessus, un **voile en diagonale** : la lumière vient du coin haut gauche (`--mist`), l'ombre bleue occupe le coin bas droit (`--ridge` puis `--deep`), et tout le bas de l'écran est `--deep` uni pour porter le titre.

```css
.hero__photo { position: absolute; top: -4%; bottom: -4%; left: -26%; width: 130%; will-change: transform; }   /* marge pour la parallaxe */
.hero__shade { position: absolute; inset: 0; background:           /* DANS .hero__photo : un seul calque */
  linear-gradient(180deg, transparent 50%, color-mix(in srgb, var(--deep) 86%, transparent) 74%, var(--deep) 90%),
  linear-gradient(155deg, transparent 37%, color-mix(in srgb, var(--ridge) 82%, transparent) 57%, color-mix(in srgb, var(--deep) 94%, transparent) 74%),
  radial-gradient(46% 51% at 97% 18%, color-mix(in srgb, var(--ridge) 78%, transparent), transparent 72%),      /* sous la note */
  radial-gradient(40% 46% at 20% 15%, color-mix(in srgb, var(--mist) 88%, transparent), transparent 78%); }     /* sous le logo et le bouton lecture */
```
Par-dessus encore : le canvas `.fx` (brume + neige, voir `motion.md`).

## 3. Titre (relevé)

Serif à empattements épais, un peu étroite, **capitales blanches sur deux lignes**, la 2e plus longue. `--fs-hero` (122px à 1440 : capitales de 87px), interligne `--lh-hero` 0.92, approche `--ls-hero`, graisse 500, largeur 90 %. Léger **dégradé vertical** blanc → `--snow`. Aligné à 372px du bord gauche, en bas de l'écran. 12 à 14 caractères par ligne au plus.

```css
.title { font: var(--display-weight) var(--fs-hero)/var(--lh-hero) var(--font-display); font-stretch: var(--display-wdth);
  letter-spacing: var(--ls-hero); text-transform: uppercase; color: var(--white); }
.title .ln > span { background: linear-gradient(180deg, var(--white) 25%, var(--snow)); -webkit-background-clip: text; background-clip: text; color: transparent; }
```
Le dégradé se pose sur le `<span>` de chaque ligne (pas sur le `<h1>`) : un parent en `background-clip: text` ne peint pas ses enfants animés.

## 4. Paragraphe (relevé)

Archivo 400, `--fs-lead` (20px / 30px), blanc, largeur `--lead-w` (580px), 3 lignes, 50px sous le titre, même bord gauche.

## 5. Bouton de verre (signature, relevé)

Disque de `--glass` (192px) posé **à droite, juste au-dessus du titre** (son bas mord de 8px sur la hauteur des capitales). **Sphère en dégradé**, pas de transparence : reflet `--sky` tout en haut, `--glacier`, `--steel` au centre, `--slate` en bas, liseré clair qui remonte au bord inférieur, fin contour sombre et ombre portée. Dedans : flèche ↗ 16px, puis deux lignes Archivo 500 16px capitales, interligne 1, blanc.

```css
.orb { width: var(--glass); aspect-ratio: 1; border-radius: 50%; display: grid; place-content: center; justify-items: center; gap: 14px; color: var(--white);
  background: radial-gradient(125% 100% at 50% -4%, var(--sky), var(--glacier) 20%, var(--steel) 46%, var(--slate) 78%, var(--steel) 104%);
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--abyss) 60%, transparent), 0 26px 46px -20px var(--abyss); }
```
Variante 56px sans texte dans les cartes. **Un seul grand bouton de verre par écran.**

## 6. Bouton lecture + trois lignes (relevé)

Disque `--tarn` de `--play` (76px), triangle blanc aux coins arrondis, halo de 5px à 22 %. À 15px à droite : **trois lignes** Archivo 500 `--fs-caps` (24px / 24px), capitales sans approche, `--ink`. Placé à gauche, à ≈ 19 % de la hauteur, **sur la brume claire**.

## 7. Note (relevé)

« 4,8/5 » en Archivo **300 étroit** (`font-stretch: var(--rating-wdth)`), `--fs-rating` (67px), `--frost` ; **étoile `--star`** de 14px en exposant à droite ; dessous, à 12px, libellé Archivo 400 `--fs-rating-label` (19,6px) capitales. Placée à droite, à la hauteur du bouton lecture, sur l'ombre bleue.

```html
<p class="rating" aria-label="Note moyenne : 4,8 sur 5">
  <span class="rating__num" aria-hidden="true"><span data-count="4.8" data-dec="1">4,8</span>/5<svg>…étoile…</svg></span>
  <span class="rating__lbl" aria-hidden="true">Note moyenne</span>
</p>
```

## 8. Puces en contour (relevé)

Pilules `--chip-h` (58px), contour blanc 1px, texte blanc Archivo 600 16px capitales `--ls-chip`, marge intérieure 22px ; **empilées** à gauche du titre (écart 16px), leur haut aligné sur le haut du titre. Fond `--deep` à 26 % (ajout pour la lisibilité). Survol et état choisi (`aria-pressed="true"`) : aplat blanc, texte `--ink`.

## 9. Composants des sections (proposé)

| Composant | Description |
|---|---|
| **Surtitre** | filet de 34px + Archivo 600 16px capitales `--ls-nav`, `--muted` |
| **Titre de section** | même serif que le héros, `--fs-h2`, 2 lignes, révélé par lignes |
| **Carte de séjour** | ratio 3 / 4.3, rayon `--r-card`, photo refroidie plein cadre, voile haut et bas ; étiquette en contour (34px) en haut à gauche ; en bas : nom en serif capitales `--fs-h3`, méta 14px `--frost`, petite sphère de verre 56px avec flèche |
| **Filtres** | rangée de puces 46px, une seule choisie ; les cartes hors filtre passent à 22 % |
| **Chiffres** | 4 colonnes à filets `--line` ; valeur dans le style de la note (Archivo 300 étroit, `--fs-rating`), libellé 14px capitales `--muted` |
| **Film de la semaine** | scène collante : cadre photo arrondi avec l'altitude en grand ; liste des 6 jours à filets (jour actif en blanc, décalé de 10px) ; **profil d'altitude** en SVG (trait blanc 1,5px qui se trace, point `--star`) |
| **Témoignage** | portrait rond 190px + citation en serif bas de casse `--fs-quote`, mots allumés un à un ; signature en capitales `--muted` |
| **Champ pilule** | contour blanc 1px, rayon plein, champ transparent + pilule blanche dedans ; focus : contour `--sky` ; erreur : contour et message `--ember` |
| **Pied** | `--abyss`, une ligne 14px `--muted` |

## États

- **Chargement de la page** : altimètre puis voile de brume (voir `motion.md`).
- **Image absente** : le héros garde son dégradé diagonal `--mist → --haze → --ridge → --deep`, cartes et cadres leur fond `--ridge` ; tout le texte reste lisible.
- **Canvas refusé** (image sans CORS) : filtre CSS de repli `saturate(.45)`.
- **Formulaire** : vide (aide `--muted`), erreur (message + contour `--ember`, `aria-invalid`, focus renvoyé), envoi (`aria-busy`, pilule à 60 %), terminé (message de confirmation en `aria-live`).
- **Focus clavier** : contour 2px blanc décalé de 4px partout.
- **Cibles tactiles** : 44px au moins (pilule, puces et menu passent à 44px en mobile).
