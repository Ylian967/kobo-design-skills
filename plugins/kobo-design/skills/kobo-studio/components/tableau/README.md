# Tableau de données

**Rôle.** Comparer des éléments sur plusieurs critères : réservations, commandes, membres. Une liste d'éléments qu'on ne compare pas (des articles, des plats) n'est pas un tableau : c'est une liste ou des cartes.

Fichiers : `tableau.css`, `tableau.js`, `Tableau.jsx`. **Dépend de** `case-a-cocher/` (lignes à sélectionner) et de `etat-vide/` (état vide).

## Anatomie

```
div.k-table[role=region][aria-labelledby][tabindex=0]    la zone qui défile horizontalement, focalisable
├── div.k-table__bar                                     « 2 lignes sélectionnées » + les actions sur la sélection (facultative)
│   └── span.k-table__count
├── table
│   ├── caption                                          ce que le tableau contient : son nom
│   ├── thead > tr
│   │   ├── th.k-table__check > label.k-check            case « Tout sélectionner » (data-k-select-all)
│   │   └── th[scope=col][aria-sort] > button.k-table__sort > span.k-table__arrow
│   └── tbody > tr[aria-selected]
│       ├── td.k-table__check > label.k-check            case de la ligne, nommée (« Sélectionner Camille Roux »)
│       ├── th[scope=row]                                la cellule qui nomme la ligne
│       └── td[data-k-type=number][data-k-sort]
├── div.k-table__empty[hidden] > .k-empty                état vide
└── p.k-table__status.k-sr-only[role=status]             annonce du tri et de la sélection
```

## États

| État | Déclencheur | Rendu |
|---|---|---|
| Repos | — | lignes séparées d'un filet, en-tête sur `--k-surface`, nombres alignés à droite |
| Survol d'une ligne | `:hover` (souris) | fond `--k-surface` |
| Focus | `:focus-visible` sur la zone, un en-tête triable, une case | contour `--k-focus` |
| Trié | `aria-sort="ascending"` ou `"descending"` sur le `<th>` | un seul chevron, plein, dans le sens du tri ; l'en-tête passe en `--k-text` ; annoncé « Trié par Prix, ordre croissant » |
| Non trié | `aria-sort="none"` | deux chevrons discrets : la colonne peut se trier |
| Ligne sélectionnée | `aria-selected="true"` | fond `--k-surface-2`, filet épais à gauche **et** case cochée ; la barre écrit le nombre |
| Sélection partielle | — | la case d'en-tête montre un tiret |
| Ligne indisponible | `aria-disabled="true"` sur la ligne, case `disabled` | texte `--k-text-muted` ; la raison est écrite dans la ligne (« Annulée ») |
| Chargement | `aria-busy="true"` sur `.k-table` | corps estompé ; au premier chargement, préférer des lignes de squelette (`chargement`) |
| Vide | aucune ligne visible | l'en-tête reste, `.k-table__empty` dit pourquoi et quoi faire (effacer le filtre, créer la première ligne) |
| Erreur | le chargement échoue | `.k-empty--error` dans `.k-table__empty`, avec « Réessayer » |

## Clavier

`Tab` : la zone (si elle défile, les flèches la font défiler), puis la case d'en-tête, les en-têtes triables, puis les cases et les liens de chaque ligne. `Entrée` ou `Espace` sur un en-tête trie, puis inverse le tri. `Espace` coche une ligne. Le tri ne déplace pas le focus.

**Lignes parcourables** (`data-k-rownav` sur `.k-table` ; en React, la prop `surOuvrir`) : une seule ligne est dans l'ordre de tabulation. `↑` `↓` changent de ligne, `Début` et `Fin` vont aux extrémités, `Espace` coche la ligne, `Entrée` (ou un clic sur la ligne) l'ouvre : événement `k-table:open` (`detail.row`). La page pose `aria-current="true"` sur la ligne ouverte (en React : prop `ouverte`). À utiliser quand une ligne mène à une fiche ou à un panneau de détail.

## Accessibilité

- Un vrai `<table>` : `<caption>`, `<th scope="col">`, `<th scope="row">` pour la cellule qui nomme la ligne.
- `aria-sort` sur l'en-tête trié ; le tri et la sélection sont annoncés par un `role="status"`.
- La sélection n'est jamais dite par la couleur seule : case cochée, filet, et le nombre écrit.
- Chaque case de ligne a un nom propre ; la case d'en-tête dit « Tout sélectionner ».
- Écran étroit : le tableau **défile** dans sa zone, il ne se transforme pas en cartes et ne masque aucune colonne. La zone est focalisable et nommée.
- `prefers-reduced-motion` : transitions coupées.

## Exemple

```html
<div class="k-table" role="region" aria-labelledby="res-t" tabindex="0">
  <div class="k-table__bar"><span class="k-table__count"></span></div>
  <table>
    <caption id="res-t">Réservations de février</caption>
    <thead><tr>
      <th scope="col" class="k-table__check"><label class="k-check"><input type="checkbox" class="k-check__input" data-k-select-all><span class="k-check__box" aria-hidden="true"></span><span class="k-sr-only">Tout sélectionner</span></label></th>
      <th scope="col" aria-sort="none"><button type="button" class="k-table__sort">Nom<span class="k-table__arrow" aria-hidden="true"></span></button></th>
      <th scope="col" data-k-type="number" aria-sort="none"><button type="button" class="k-table__sort">Prix<span class="k-table__arrow" aria-hidden="true"></span></button></th>
    </tr></thead>
    <tbody>
      <tr><td class="k-table__check"><label class="k-check"><input type="checkbox" class="k-check__input"><span class="k-check__box" aria-hidden="true"></span><span class="k-sr-only">Sélectionner Camille Roux</span></label></td>
        <th scope="row">Camille Roux</th><td data-k-type="number" data-k-sort="180">180 €</td></tr>
    </tbody>
  </table>
  <div class="k-table__empty" hidden><div class="k-empty k-empty--plain"><h3 class="k-empty__title">Aucune réservation en février</h3><p class="k-empty__text">Les demandes reçues apparaîtront ici.</p></div></div>
  <p class="k-table__status k-sr-only" role="status"></p>
</div>
```

```jsx
<Tableau legende="Réservations de février" selectionnable colonnes={[{ id: 'nom', libelle: 'Nom', triable: true }, { id: 'prix', libelle: 'Prix', type: 'number', triable: true, rendu: (l) => `${l.prix} €` }]} lignes={reservations}
  vide={{ titre: 'Aucune réservation en février', texte: 'Les demandes reçues apparaîtront ici.' }} />
```
