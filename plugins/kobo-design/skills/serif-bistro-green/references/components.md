# Serif Bistro Green — composants

Toutes les valeurs viennent de `tokens.css`. Le code complet est dans `examples/demo.html`.

## Barre de navigation flottante

Mesurée : 1028 × 69px, centrée, détachée du bord. Fond `--green-card`, contour `--line-green`, rayon 14px. Logo (pastille ronde orange + nom en `--font-display`), liens en pilules (l'actif : fond crème, texte vert), bouton rond de recherche, bouton orange « Réserver ».

```html
<nav class="nav">
  <a class="logo" href="#"><i><svg>…</svg></i>Maison Sauge</a>
  <div class="nav-links" id="menu"><a class="is-on" href="#">Accueil</a><a href="#">La carte</a></div>
  <div class="nav-tools">
    <button class="round search" aria-label="Rechercher">…</button>
    <a class="btn" href="#">Réserver</a>
    <button class="round burger" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="menu">…</button>
  </div>
</nav>
```

Sous 1000px : les liens deviennent un panneau sous la barre, ouvert par le bouton rond à deux traits.

## Bouton

Mesuré : 214 × 54px, rayon ≈ 8px. Texte en `--font-display`, petit, espacé, suivi d'une flèche.

| Variante | Fond | Texte | Usage |
|---|---|---|---|
| `.btn` | `--orange-btn` | `--cream` | action principale |
| `.btn--line` | transparent, contour | couleur du texte | action secondaire |
| `.btn--paper` | `--paper` | `--orange-btn` | sur fond orange |
| `.btn--s` | hauteur 38px | — | fiches de plat |

L'orange du shot (`--orange`) sert aux **surfaces** ; les boutons prennent `--orange-btn`, plus foncé, pour que le petit texte crème reste lisible.

## Titre du héros avec arche

Deux lignes en `--font-display` ; chaque ligne est coupée en deux moitiés écartées de la largeur de l'arche (`gap: var(--arch-w)`). L'arche (cadre `--frame` de 8px, sommet en demi-cercle, pas de bord en bas) remonte dans le titre par une marge négative et passe au-dessus des lettres.

```html
<h1 class="hero-title display">
  <span class="line l1"><span class="mask"><b>Chaque</b></span> <span class="mask"><b>table</b></span></span>
  <span class="line l2"><span class="mask"><b>a le goût</b></span> <span class="mask"><b>de chez soi</b></span></span>
</h1>
<figure class="arch"><img src="…" alt="…"></figure>
```

## Assiette ronde

Une vraie photo vue de dessus, recadrée en cercle (`border-radius: 50%`), ombre portée vers le bas. 190px dans le héros, 178px sur les fiches. C'est l'image qui tourne, pas le disque.

## Fiche reliée (carrousel)

Fiche `--orange` de 300 × 330px, rayon `--r-card` : assiette, nom en `--font-display` (24px), bouton rond blanc à flèche. Entre deux fiches, une **reliure à spirale** : un pseudo-élément blanc, masqué par un motif d'anneaux arrondis répété tous les 24px, qui déborde de 13px sur chaque fiche.

```css
.fav-card + .fav-card::before { content: ""; position: absolute; left: calc(-1 * var(--fav-gap) - 13px); top: 26px; bottom: 26px;
  width: calc(var(--fav-gap) + 26px); background: var(--paper); mask: url("…anneau.svg") 0 0 / 100% 24px repeat-y; }
```

La piste défile avec `scroll-snap` (souris, doigt, clavier) ; des points ronds en dessous indiquent la position.

## Feuille

Chaque section est une feuille : coins supérieurs très arrondis (`--r-sheet`), remontée d'autant sur la précédente. Trois couleurs : `sheet--cream`, `sheet--orange`, `sheet--green`. Ne jamais poser deux feuilles de même couleur à la suite.

## Pastille de filtre

Hauteur 36px, contour `--line-green`, texte en `--font-display`. Active : fond `--orange-btn`. Ce sont des `<button aria-pressed>`.

## Fiche de plat

Fond `--green-card`, contour `--line-green`, marge intérieure 12px. Image dans une boîte `--cream-box` (rapport 1 / 0.8, rayon 10px), nom en `--font-display` (18px), description en `--soft`, puis prix (22px) et petit bouton sur une même ligne, collés en bas.

## Titre en escalier et cadres

Trois lignes géantes (`--fs-stagger`) décalées vers la droite ; trois photos dans un cadre `--frame` de 8px, posées en absolu entre les mots. Une photo peut mordre sur une lettre, jamais masquer un mot entier.

## Bandeau à dessins au trait

Feuille orange, titre crème sur trois lignes décalées, petits dessins au trait (`stroke: var(--line-art)`, sans remplissage) au début et à la fin des lignes. Dans le formulaire de la lettre : champ translucide `--field`, texte `--ink`, bouton blanc.

## Pied de page

Feuille verte : logo et réseaux, trois colonnes (naviguer, contact, horaires), ligne légale sous un filet, puis le **nom géant** en `--fs-giant` sur toute la largeur.

## États

- Survol : voir `motion.md`.
- Focus clavier : contour de 2px de la couleur du texte, décalé de 3px.
- Petit texte sur orange : toujours `--ink`, jamais crème.
