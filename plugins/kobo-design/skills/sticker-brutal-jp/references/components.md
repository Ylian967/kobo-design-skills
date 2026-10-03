# Sticker Brutal JP — composants

Toutes les valeurs viennent de `tokens.css`. Le code complet est dans `examples/demo.html`. Sauf mention, les mesures viennent du site en ligne.

## L'effet autocollant (`.brut`)

La base de presque tous les composants : **contour de 1px** `--ink`, **ombre dure** `3px 3px 0` sans flou, fond plein. Au survol l'élément se décolle (`translate(-4px, -4px)`, ombre `6px 6px 0`) ; à l'appui il s'enfonce.

## Cadre (shot)

Tout le site est posé dans un cadre : contour `--bw-frame` (3px), rayon `--r-frame` (40px), fond `--paper`, sur une page `--peach`. Le cadre ne coupe pas son contenu : les autocollants sont posés **à cheval** sur son bord.

## Autocollants (shot)

Formes plates, contour de 2.5px, ombre décalée de 5px (un second tracé `--ink`) : demi-anneau, carré arrondi à étoile, rond à spirale, tampon rond rouge à caractère japonais. Chacun a sa couleur (`--c`), son inclinaison (`--rot`) et sa vitesse de décalage (`data-speed`). Décoratifs : `aria-hidden`.

```html
<div class="sticker" style="--w:118px;--c:var(--green);--rot:18deg;left:-76px;top:150px" data-speed="0.06" aria-hidden="true">
  <svg viewBox="0 0 120 70"><path class="sh" d="M5 62a55 55 0 0 1 110 0H84a24 24 0 0 0-48 0z"/><path d="M5 62a55 55 0 0 1 110 0H84a24 24 0 0 0-48 0z"/></svg>
</div>
```

## Navigation

Hauteur 89px. Logo dans une pilule à contour ; liens en pilules **sans contour au repos** (17px, graisse 500, marge intérieure 8px 16px), qui prennent contour, ombre et fond blanc au survol. Le lien « Contact » passe au jaune.

Sous 1040px : bouton rond de menu ; les liens s'ouvrent dans une fiche blanche à ombre dure.

## Pilule de langue (shot)

Grosse pilule `--pink` posée sur le coin haut droit du cadre : rond blanc avec un point (rouge pour le japonais), nom de la langue en `--font-jp-display`. C'est un bouton : il bascule toute la page d'une langue à l'autre. Le point n'est jamais seul à porter l'information : le libellé change aussi.

## Titre du héros

- Salutation : 20px, `--body`.
- **Titre latin** : `--font-latin`, graisse 800, capitales, `--fs-h1` (104px, interligne 1, approche −2px), sur deux lignes.
- **Sous-titre japonais** : `--font-jp-display` (Mochiy Pop One), 36px.
- Chapeau : 20px / 1.4, `--body`, 560px de large au plus.
- Bouton.

## Bouton

Mesuré : 60px de haut, marge intérieure 0 32px, rayon 12px, fond `--yellow`, texte 18px graisse 800, effet autocollant.

## Portrait découpé (shot)

Forme proche d'un écusson : carré aux coins arrondis terminé en pointe vers le bas. Quatre calques portant le même masque : ombre décalée de 7px, bord `--ink`, fond `--pink`, puis la **photo en noir et blanc** fondue dans le rose (`mix-blend-mode: multiply`).

Autour : bulle du prénom en katakana (pilule `--blue`), bulle `--green` au graphique, pastille ronde `--yellow` à l'œil, pastille `--mint` « Disponible », deux petits curseurs triangulaires.

## Katakana vertical (shot)

Deux colonnes écrites de haut en bas (`writing-mode: vertical-rl`), en `--font-jp-display`, **jaunes à gros contour sombre** et ombre décalée. Elles mordent sur le portrait.

```css
.vertical { writing-mode: vertical-rl; color: var(--yellow); -webkit-text-stroke: 5px var(--ink); paint-order: stroke fill; text-shadow: 4px 4px 0 var(--ink); }
```

## Témoignages

Bande blanche sur toute la largeur. À gauche deux citations courtes (16px) avec portrait rond de 48px à contour ; à droite une grande citation en graisse 800 (32px) avec portrait de 64px.

## Fiche de service

Fiche blanche, rayon 20px, marge intérieure 32px 24px, effet autocollant. Dans l'ordre : **tuile** colorée de 160px en forme de petite fenêtre (trois points en haut, pictogramme au trait, contour 2.5px, ombre de 6px), titre latin en capitales (32px, graisse 600), sous-titre gras dans la langue de la page, texte de 16px, lien fléché en bas.

## Étiquette

Pilule colorée (`--purple`, `--pink`, `--yellow`, `--green`, `--blue`), 16px graisse 500, marge intérieure 8px 16px, contour et ombre dure.

## Projet en damier

Grille de deux colonnes sans marge : une case de texte (étiquettes, titre gras de 24px, texte, lien fléché) et une case de couleur pleine où l'image du projet est posée **de travers** (±3°), avec contour, rayon et ombre de 8px. D'une ligne à l'autre, texte et image changent de côté.

## Fiche d'article

Sur la bande `--yellow` : fiche blanche (marge 24px), image au rapport 2 / 1 à contour, titre en `--font-jp-display` (24px), lien fléché.

## Formulaire

Champs blancs de 54px, rayon 12px, contour et ombre dure, texte d'aide en `--body` ; zone de texte de 200px. L'ombre s'allonge au survol et quand le champ est actif. Bouton aligné à droite.

## États

- Focus clavier : contour `--ink` de 3px, décalé de 3px.
- Texte toujours `--ink` sur les couleurs vives : aucune couleur vive ne sert de couleur de texte, sauf le jaune du katakana, cerné de sombre.
