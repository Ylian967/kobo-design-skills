# Menu déroulant

**Rôle.** Ranger derrière un bouton des **actions** qu'on ne fait pas souvent (modifier, dupliquer, supprimer), ou un choix d'affichage (trier par…). Ce n'est ni une navigation de site (pas de menu déroulant au survol : voir `ux/patterns/navigation.md`) ni un champ de formulaire (→ sélection).

Fichiers : `menu-deroulant.css`, `menu-deroulant.js`, `MenuDeroulant.jsx`. **Dépend de `bouton/bouton.css`** pour le déclencheur.

## Anatomie

```
div.k-dropdown[data-k-align][data-k-place]
├── button.k-btn[aria-haspopup=menu][aria-expanded][aria-controls]
│   └── span.k-dropdown__caret[aria-hidden]
└── ul.k-dropdown__menu[role=menu][hidden]
    ├── li[role=presentation].k-dropdown__label          intertitre (facultatif)
    ├── li[role=none] > button.k-dropdown__item[role=menuitem]
    │   ├── svg.k-icon | span.k-dropdown__tick            icône, ou coche d'un choix
    │   └── span.k-dropdown__hint                         précision à droite (facultative)
    └── li[role=separator].k-dropdown__sep
```

Un choix exclusif (tri) : `role="menuitemradio"` et `aria-checked`. Une option à cocher : `role="menuitemcheckbox"`. Une destination : un lien `a` portant le rôle `menuitem`.

## États

| État | Déclencheur | Rendu |
|---|---|---|
| Fermé | `aria-expanded="false"` | le bouton et son chevron |
| Ouvert | `aria-expanded="true"` | chevron retourné ; panneau sous le bouton, aligné à gauche — à droite ou au-dessus si la place manque |
| Survol d'un choix | `:hover` | fond `--k-surface-2` |
| Focus d'un choix | `:focus-visible` | contour `--k-focus` vers l'intérieur **et** fond |
| Coché | `aria-checked="true"` | coche **et** graisse |
| Désactivé | `aria-disabled="true"` sur un choix | texte `--k-text-muted`, barré ; le choix est sauté au clavier |
| Action destructrice | `k-dropdown__item--danger` | couleur d'erreur **avec** une icône et un verbe explicite ; elle ouvre une confirmation, elle ne supprime pas |
| Chargement | — | désactiver le bouton (`aria-busy`) tant que les actions ne sont pas connues |
| Vide | aucun choix | le bouton ne s'affiche pas |

Aucune ombre sauf `--k-shadow` du skill ; le panneau se détache par son contour.

## Clavier

Sur le bouton : `Entrée`, `Espace` ou `↓` ouvrent et vont au premier choix ; `↑` va au dernier. Dans le menu : `↓` `↑` (en boucle), `Début`, `Fin`, une lettre (choix qui commence par elle), `Entrée` ou `Espace` activent, `Échap` ferme et rend le focus au bouton, `Tab` ferme et passe à la suite. Le menu ne compte qu'un arrêt de tabulation : le bouton.

## Accessibilité

- Modèle ARIA « menu button » : `aria-haspopup="menu"`, `aria-expanded`, `role="menu"` et `menuitem`. Les `<li>` portent `role="none"`.
- Le bouton a un libellé visible ; un bouton à icône seule porte `aria-label` (« Actions sur la réservation de Camille »).
- Un clic ou un focus hors du menu le ferme ; un seul menu ouvert à la fois.
- Cibles d'au moins `--k-hit-min` de haut.
- `prefers-reduced-motion` : le chevron se retourne sans tourner.

## Exemple

```html
<div class="k-dropdown">
  <button type="button" class="k-btn k-btn--secondary" aria-haspopup="menu" aria-expanded="false" aria-controls="act-1">Actions<span class="k-dropdown__caret" aria-hidden="true"></span></button>
  <ul class="k-dropdown__menu" role="menu" id="act-1" hidden>
    <li role="none"><button type="button" class="k-dropdown__item" role="menuitem" data-k-value="modifier">Modifier</button></li>
    <li role="none"><button type="button" class="k-dropdown__item" role="menuitem" data-k-value="dupliquer">Dupliquer</button></li>
    <li role="separator" class="k-dropdown__sep"></li>
    <li role="none"><button type="button" class="k-dropdown__item k-dropdown__item--danger" role="menuitem" data-k-value="supprimer"><svg class="k-icon" aria-hidden="true"><use href="#i-trash"/></svg>Supprimer…</button></li>
  </ul>
</div>
```

```jsx
<MenuDeroulant libelle="Trier par" choix={tri} surChangement={setTri} elements={[{ id: 'date', libelle: 'Date' }, { id: 'prix', libelle: 'Prix' }]} />
```
