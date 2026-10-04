# Menu mobile

**Rôle.** Montrer la navigation en plein écran quand la barre est repliée.

Fichiers : `menu-mobile.css`, `menu-mobile.js`, `MenuMobile.jsx`. Va avec `../barre-nav/`.

Il repose sur l'élément `<dialog>` ouvert par `showModal()` : le piège du focus, la touche Échap et la mise hors service du reste de la page sont fournis par le navigateur.

## Anatomie

```
dialog.k-menu[aria-labelledby]
├── .k-menu__head
│   ├── h2.k-menu__title          nom du menu
│   └── button[data-k-menu-close] « Fermer », avec texte visible
├── nav > ul.k-menu__list
│   └── li > a.k-menu__link       aria-current="page" + span.k-menu__here « page actuelle »
└── .k-menu__foot                 action principale (facultatif)
```

Déclencheur : `<button type="button" data-k-menu-open="id" aria-expanded="false" aria-controls="id">`.

## États

| État | Déclencheur | Rendu |
|---|---|---|
| Fermé | — | absent de l'écran et de l'arbre d'accessibilité |
| Ouvert | `showModal()` | plein écran, fond `--k-bg` ; entrée en fondu de `--k-dur-base` |
| Survol d'un lien | `:hover` | fond `--k-surface` |
| Focus clavier | `:focus-visible` | contour `--k-focus`, tracé vers l'intérieur |
| Page courante | `aria-current="page"` | filet épais à gauche **et** mention écrite « page actuelle » |

## Clavier

| Touche | Effet |
|---|---|
| `Entrée` / `Espace` sur le bouton « Menu » | ouvre le menu ; le focus passe au premier élément (« Fermer ») |
| `Tab` / `Maj+Tab` | parcourt le menu sans en sortir |
| `Échap` | ferme le menu |
| `Entrée` sur un lien | suit le lien et ferme le menu |

À la fermeture, le focus revient au bouton qui a ouvert le menu.

## Accessibilité

- `aria-expanded` du bouton est tenu à jour par le script.
- Le menu a un nom (`aria-labelledby`) et un bouton de fermeture avec un texte visible, pas seulement une croix.
- Chaque lien fait au moins `--k-hit-min` de haut.
- `prefers-reduced-motion` : pas d'animation d'entrée.

## Exemple

```html
<dialog class="k-menu" id="menu" aria-labelledby="menu-titre">
  <div class="k-menu__head">
    <h2 class="k-menu__title" id="menu-titre">Menu</h2>
    <button type="button" class="k-btn k-btn--secondary" data-k-menu-close>Fermer</button>
  </div>
  <nav aria-label="Menu">
    <ul class="k-menu__list">
      <li><a class="k-menu__link" href="/sorties" aria-current="page">Sorties <span class="k-menu__here">page actuelle</span></a></li>
      <li><a class="k-menu__link" href="/guides">Guides</a></li>
    </ul>
  </nav>
</dialog>
```

```jsx
<MenuMobile id="menu" ouvert={ouvert} surFermer={() => setOuvert(false)} liens={liens}
            pied={<Bouton href="/reserver" bloc>Réserver une sortie</Bouton>} />
```
