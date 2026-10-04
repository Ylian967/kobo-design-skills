# Barre de navigation

**Rôle.** Dire où l'on est et mener aux sections principales. Elle porte la marque, quatre à six liens, et une ou deux actions.

Fichiers : `barre-nav.css`, `barre-nav.js`, `BarreNav.jsx`. Va avec `../menu-mobile/`.

## Anatomie

```
header.k-nav                       [k-nav--sticky] ; data-k-collapsed posé par le script
├── a.k-nav__brand                 marque, lien vers l'accueil
├── nav[aria-label] > ul.k-nav__list
│   └── li > a.k-nav__link         aria-current="page" sur la page courante
└── .k-nav__actions
    ├── .k-nav__extra              action cachée quand la barre est repliée (elle passe dans le menu)
    └── button.k-nav__burger       ouvre le menu mobile ; visible seulement repliée
```

## Repli sans point de rupture

La barre ne connaît aucune largeur d'écran. Le script la mesure : si les liens ne tiennent plus sur une ligne, il pose `data-k-collapsed`, la CSS cache les liens et montre le bouton « Menu ». La mesure est refaite quand la largeur change et quand la police a fini de charger. Sans script, les liens passent à la ligne.

## États

| État | Déclencheur | Rendu |
|---|---|---|
| Repos | — | fond `--k-bg`, filet bas `--k-line` |
| Survol d'un lien | `:hover` | fond `--k-surface` |
| Focus clavier | `:focus-visible` | contour `--k-focus` |
| Appui | `:active` | fond `--k-surface-2` |
| Page courante | `aria-current="page"` | filet sous le lien **et** graisse renforcée, dans la couleur du texte (jamais l'accent seul) |
| Repliée | `data-k-collapsed` | liens cachés, bouton « Menu » affiché |

Désactivé, chargement, erreur et vide ne s'appliquent pas.

## Clavier

`Tab` parcourt la marque, les liens, les actions, dans l'ordre visuel. Repliée, `Tab` atteint le bouton « Menu » ; `Entrée` ou `Espace` ouvre le menu mobile.

## Accessibilité

- `<header>` contient un `<nav aria-label="Navigation principale">` : le libellé distingue cette navigation des autres.
- Le bouton de menu a un texte visible (« Menu »), `aria-expanded` et `aria-controls`.
- Chaque lien fait au moins `--k-hit-min` de haut (ou la hauteur de la barre si elle est plus basse).
- Ajouter un lien d'évitement « Aller au contenu » avant la barre.

## Exemple

```html
<header class="k-nav k-nav--sticky">
  <a class="k-nav__brand" href="/">Cordée Brume</a>
  <nav aria-label="Navigation principale">
    <ul class="k-nav__list">
      <li><a class="k-nav__link" href="/sorties" aria-current="page">Sorties</a></li>
      <li><a class="k-nav__link" href="/guides">Guides</a></li>
    </ul>
  </nav>
  <div class="k-nav__actions">
    <a class="k-btn k-nav__extra" href="/reserver">Réserver</a>
    <button type="button" class="k-btn k-btn--secondary k-nav__burger" data-k-menu-open="menu" aria-expanded="false" aria-controls="menu">Menu</button>
  </div>
</header>
```

```jsx
<BarreNav marque={{ libelle: 'Cordée Brume', href: '/' }} liens={liens} collante
          idMenu="menu" menuOuvert={ouvert} surOuvrirMenu={() => setOuvert(true)}
          actions={<Bouton href="/reserver" className="k-nav__extra">Réserver</Bouton>} />
```
