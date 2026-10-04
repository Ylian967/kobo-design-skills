# Navigation

Composants : `barre-nav`, `menu-mobile`. Socle : `structures/page.css` (`.k-page__top`, `.k-crumbs`, `.k-toc`) et `structures/page.js`.

## Choisir

| Brique | Quand | Comment |
|---|---|---|
| **Barre fixe** | Par défaut. Pages où l'on change souvent de section ou de page | `<div class="k-page__top">` autour de `.k-nav` : elle colle en haut |
| **Barre qui se cache** | Lecture longue ou récit, où la barre gêne l'image | `<div class="k-page__top" data-k-nav="auto-hide">` : cachée quand on descend, rendue dès qu'on remonte |
| **Menu plein écran** | Dès que les liens ne tiennent plus dans la barre | Automatique : `barre-nav.js` mesure et replie ; le bouton « Menu » ouvre `menu-mobile` |
| **Fil d'Ariane** | Page à plus d'un niveau sous l'accueil | `<nav class="k-crumbs" aria-label="Fil d'Ariane"><ol>…` ; le dernier élément porte `aria-current="page"` et n'est pas un lien |
| **Sommaire de page** | Texte de plus de trois titres | `<nav class="k-toc">` ; collé sur le côté quand la largeur le permet |
| **Rail de progression** | Récit en chapitres | Voir `structures/recit-collant/` |

## Règles

1. **Le premier élément focalisable est le lien d'évitement** (`.k-skip`), vers `<main id="contenu" tabindex="-1">`.
2. **La page courante est dite** : `aria-current="page"` sur son lien, dans la barre et dans le menu. Elle est marquée par un filet et une graisse, pas par l'accent seul.
3. **Pas de point de rupture pour le repli.** La barre se replie quand ses liens ne tiennent plus, quelle que soit la largeur de l'écran, la police du skill ou la longueur des libellés.
4. **Une barre collée ne cache pas la cible d'une ancre** : `scroll-padding-block-start` vaut la hauteur de la barre (posé par `page.css`).
5. **La barre qui se cache revient** quand on remonte, quand le focus y entre au clavier, et en haut de page. Elle ne se cache jamais tant que le menu est ouvert.
6. **Le menu plein écran est un `<dialog>`** : le focus y reste, Échap le ferme, le focus revient au bouton « Menu ». Un lien suivi le ferme.
7. **Une action dans la barre, au plus.** C'est la même que celle du héros.
8. **Pas de menu déroulant au survol.** S'il faut un second niveau, c'est une page.

## Performance

- Le repli de la barre mesure une fois par changement de largeur (`ResizeObserver`), pas au défilement.
- La barre qui se cache lit `scrollY` une fois par image affichée (`requestAnimationFrame`, écouteur passif) et n'anime que `transform`.
