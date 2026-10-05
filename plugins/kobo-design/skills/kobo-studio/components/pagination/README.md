# Pagination

**Rôle.** Parcourir une liste trop longue pour une page, par pages numérotées. Si la personne cherche une chose précise, un filtre ou une recherche valent mieux que vingt pages.

Fichiers : `pagination.css`, `pagination.js` (seulement pour une liste qui change sans recharger), `Pagination.jsx`. **Dépend de `bouton/bouton.css`** pour « Précédent » et « Suivant ».

## Anatomie

```
nav.k-pagination[aria-label="Pages des sorties"]
├── a|button.k-btn.k-btn--secondary.k-pagination__step     Précédent
├── ol.k-pagination__list
│   ├── li > a|button.k-pagination__page[aria-current=page]   « Page 3 » (le mot « Page » est lu, pas affiché)
│   └── li > span.k-pagination__gap[aria-hidden]              …
├── a|button.k-pagination__step                             Suivant
└── p.k-pagination__status[role=status]                     Page 3 sur 12
```

Numéros affichés : le premier, le dernier, la page courante et ses deux voisines ; « … » entre deux numéros éloignés.

## États

| État | Déclencheur | Rendu |
|---|---|---|
| Repos | — | numéros `--k-text-2`, sans cadre |
| Survol | `:hover` | fond `--k-surface`, texte `--k-text` |
| Focus clavier | `:focus-visible` | contour `--k-focus` |
| Page courante | `aria-current="page"` | cadre `--k-line-strong`, fond `--k-surface-2` **et** graisse |
| Désactivé | `aria-disabled="true"` sur « Précédent » en page 1, « Suivant » en dernière page | bouton désactivé du composant bouton ; il reste atteignable au clavier et ne fait rien |
| Chargement | `aria-busy="true"` sur la `<nav>` pendant que la liste arrive | curseur d'attente ; la liste montre son squelette |
| Compacte | `k-pagination--compact`, ou posée seule quand les numéros ne tiennent pas | Précédent, « Page 3 sur 12 », Suivant |
| Vide | une seule page | la pagination ne s'affiche pas |

Erreur : si une page ne charge pas, c'est la liste qui le dit (état vide d'erreur) ; la pagination reste sur l'ancienne page.

## Clavier

`Tab` passe de bouton en bouton ; `Entrée` (lien ou bouton) ou `Espace` (bouton) change de page. Après un changement piloté par script, le focus reste sur le bouton utilisé, ou va à la page courante s'il vient d'être désactivé.

## Accessibilité

- Une `<nav>` nommée : « Pages des sorties », pas « Pagination ».
- Chaque numéro est lu « Page 3 » ; la page courante porte `aria-current="page"`.
- « Page 3 sur 12 » est un `role="status"` : annoncé à chaque changement sans déplacer le focus.
- Cibles d'au moins `--k-hit-min` de côté.
- Après un changement de page, ramener le haut de la liste à l'écran et lui donner le focus si la liste est longue : c'est à la page de le faire.

## Exemple

```html
<!-- liens : aucun script -->
<nav class="k-pagination" aria-label="Pages des sorties">
  <a class="k-btn k-btn--secondary k-pagination__step" href="?page=1" rel="prev">Précédent</a>
  <ol class="k-pagination__list">
    <li><a class="k-pagination__page" href="?page=1"><span class="k-sr-only">Page </span>1</a></li>
    <li><a class="k-pagination__page" href="?page=2" aria-current="page"><span class="k-sr-only">Page </span>2</a></li>
    <li><span class="k-pagination__gap" aria-hidden="true">…</span></li>
    <li><a class="k-pagination__page" href="?page=9"><span class="k-sr-only">Page </span>9</a></li>
  </ol>
  <a class="k-btn k-btn--secondary k-pagination__step" href="?page=3" rel="next">Suivant</a>
  <p class="k-pagination__status">Page 2 sur 9</p>
</nav>

<!-- pilotée par script -->
<nav class="k-pagination" aria-label="Pages des sorties" data-k-pages="9" data-k-page="2"></nav>
```

```jsx
<Pagination libelle="Pages des sorties" page={page} total={9} surChangement={setPage} />
```
