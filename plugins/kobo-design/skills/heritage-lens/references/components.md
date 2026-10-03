# Heritage Lens — composants

Valeurs dans `tokens.css`. Les dimensions sont **mesurées** sur le site de référence à 1440×900 sauf mention « proposé ». Code complet dans `examples/demo.html`.

## Règles communes

- **Trois voix** : la police d'affiche (`--font-display`) pour tout ce qui se dit fort (titres, phrases du prologue, citations, numéros, « ENTREZ ») ; le serif de lecture (`--font-text`) pour le récit ; la sans (`--font-ui`) pour l'aide, les boutons, les légendes.
- **Deux couleurs sur les scènes** : blanc pour le texte, or `--gold` pour les ornements, les anneaux et les titres de lieu.
- Tout ce qui est rond est **cerclé d'un filet d'or de 1px**, sans fond. Seul le bouton de plan est plein.
- Le texte est **centré**, même dans la colonne de droite d'un point d'intérêt.

## Ornement en dentelle

Le motif du site : un anneau de cercles qui se chevauchent. Il sert au chargement, au médaillon de chapitre et à la lentille. C'est un signe, il reste en SVG, tracé par quelques lignes de script (`data-lace="22"` = 22 cercles) :

```js
const n = 22, R = 40, r = R * Math.sin(Math.PI / n) * 1.9;   // viewBox -50 -50 100 100
// n cercles de rayon r posés sur un cercle de rayon R, plus un cercle intérieur
```

`stroke: currentColor`, 1px (`vector-effect: non-scaling-stroke`), rotation lente continue.

## Écran de chargement

Fond `--bg`, anneau de 190px, pourcentage en `--font-display` 37px or au centre. Le compte suit le vrai chargement des premières images.

## Éléments fixes (marge 31px)

| Emplacement | Élément |
|---|---|
| Haut gauche | Nom de l'institution, `--font-display` 24px |
| Haut droite | **Bouton de plan** : rond plein or de 51px, icône sombre, halo blanc qui pulse |
| Bas gauche | « À propos de ce projet » + petite flèche cerclée (22px) |
| Bas droite | Deux boutons ronds cerclés de 51px : réglages, son |
| Droite, centré | **Puces** : points de 4px espacés de 39px ; la puce active a un anneau en pointillé de 24px qui tourne ; au survol, bulle `--mist` à texte `--bronze` à gauche |

Les puces et le lien du bas sont masqués pendant le prologue et sur la page de fin.

## Boutons

- **Rond** (`.round`) : 51px, filet or, icône 16px. Survol : disque or qui monte, icône sombre.
- **Pilule** (`.pill`) : hauteur 51px, padding 34px, texte sans 14px / 500. Même survol.
- **Entrée** (`.enter`) : 122px, **double anneau** (filet or + second anneau à 50 % à 8px à l'intérieur), « ENTREZ » en `--font-display` 27.75px capitales.
- **Fermer** : libellé « Fermer » + bouton rond avec croix, en haut à droite.

## Phrase du prologue

`--font-display` 48.75px, interligne 1, blanche, centrée, 1008px de large au plus, une seule à l'écran. Sous elle, en bas : l'aide « Faire défiler pour continuer » (sans 14px) et son bouton rond à flèche.

## Titre du site

Mot géant `--fs-hero` (153px à 1440, interligne 0.9), sous-titre or en `--fs-phrase` décalé vers la droite, bouton d'entrée dessous.

## Ouverture de chapitre

Médaillon de 96px (deux dentelles concentriques, chiffre romain blanc 26px) au-dessus du titre géant, centré sur la photo.

## Récit

Paragraphe `--font-text` 19.75px / 1.2, blanc, centré, 30em au plus, posé sur le voile radial ; ombre de texte `--shade` pour les photos claires.

## Point d'intérêt

```
        ╭─────────╮          Titre du lieu        ← --fs-place (77.5px), or
        │ lentille │      Récit centré, 373px
        ╰─────────╯        ( Pilule vers la page éditoriale )
   Cliquez pour révéler…
```

- Colonne de texte de 426px dont le centre est à 70 % de la largeur ; lentille à sa gauche (centre vers 40 %).
- Voile latéral sombre à droite (`.veil.side`) pour le contraste.
- Mobile : lentille de 132px au-dessus, texte dans une **carte arrondie** (rayon 20px, fond `--veil-2`) en bas de l'écran.

## Lentille

Bouton rond de ≈ 210px : dentelle or qui tourne, fenêtre circulaire (60 % du diamètre) montrant une **autre vue du même lieu**, légende sans 14px / 500 dessous (« Cliquez pour révéler la vue de nuit »). Au clic, la vue s'ouvre en plein écran avec une légende en bas à gauche et un bouton fermer.

C'est un vrai `<button>` : il se déclenche au clavier, Échap referme, le focus revient sur la lentille.

## Page éditoriale

Fenêtre plein écran sur `--bg`, **défilement horizontal** : grande image sur 38 % de la largeur, titre or + fil d'Ariane (« Chapitre — *lieu* ») + deux paragraphes, puis en alternance des œuvres (image 3:4, légende à droite en bas : titre en sans, date en serif capitales), une grande citation `--soft` en `--font-display`, d'autres paragraphes. Mobile : une colonne verticale.

## Page de fin

Deux moitiés : photo à gauche, à droite titre or, texte, liste à filets `--line` (libellé à gauche, valeur `--soft` à droite), pilule de retour.

## Accessibilité

- Texte blanc toujours sur un voile (`--veil-1` au moins) ; l'or ne sert jamais à un petit texte sur photo claire.
- Cibles de 44px au moins (les puces de 20px ont une zone de clic élargie à 44px).
- Fenêtres : `role="dialog"`, `inert` quand elles sont fermées, Échap, retour du focus.
- Titres découpés en lettres : le mot entier est dans `aria-label`, les lettres sont `aria-hidden`.
- Bouton « réduire les animations » en plus de `prefers-reduced-motion`.
