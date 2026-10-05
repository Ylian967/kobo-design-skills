# Info-bulle

**Rôle.** Donner une précision courte sur un élément : le nom d'un bouton à icône, la définition d'un terme, la raison d'un état. Jamais une information indispensable, jamais un lien ni un bouton dans la bulle : ce qui doit être lu par tous s'écrit dans la page.

Fichiers : `info-bulle.css`, `info-bulle.js`, `InfoBulle.jsx`.

## Anatomie

```
span.k-tooltip[data-k-place]
├── button | a                       le déclencheur : focalisable, relié par aria-describedby
└── span.k-tooltip__bubble[role=tooltip][id]   la bulle, en ton inversé
```

`k-tooltip__term` : un mot du texte, souligné en pointillé, qui porte une précision (c'est un bouton).

## États

| État | Déclencheur | Rendu |
|---|---|---|
| Masquée | — | bulle invisible, mais présente dans la page et reliée au déclencheur |
| Affichée | focus clavier, survol à la souris (`@media (hover: hover)`), ou `data-k-open` | bulle au-dessus, centrée ; dessous si la place manque ; décalée pour rester dans l'écran |
| Refermée | `Échap` | bulle masquée jusqu'à ce que le pointeur ou le focus quitte le déclencheur ; le focus ne bouge pas |
| Au toucher | un appui donne le focus au déclencheur | la bulle s'affiche ; un appui ailleurs la retire |

Désactivé : un bouton `disabled` ne reçoit ni focus ni survol ; utiliser `aria-disabled="true"` si la bulle doit expliquer pourquoi. Erreur, chargement et vide ne s'appliquent pas.

## Clavier

`Tab` jusqu'au déclencheur affiche la bulle ; `Échap` la referme ; `Tab` la quitte. La bulle n'entre jamais dans l'ordre de tabulation.

## Accessibilité

- `role="tooltip"` et `aria-describedby` : le texte est lu après le nom du déclencheur. Pour un bouton à icône, la bulle ne remplace pas `aria-label`.
- La bulle reste tant que le pointeur est sur elle ou sur le déclencheur, se referme à `Échap`, et ne disparaît pas d'elle-même (WCAG 1.4.13).
- Texte d'au moins `--k-fs-min`, sur `--k-bg-inverse` / `--k-text-inverse` (paire vérifiée du contrat).
- Aucun survol au toucher : c'est le focus qui affiche.
- `prefers-reduced-motion` : apparition sans fondu.

## Exemple

```html
<span class="k-tooltip">
  <button type="button" class="k-btn k-btn--secondary k-btn--icon" aria-label="Supprimer la réservation" aria-describedby="tip-suppr"><svg class="k-icon" aria-hidden="true"><use href="#i-trash"/></svg></button>
  <span class="k-tooltip__bubble" role="tooltip" id="tip-suppr">Remboursée en entier jusqu'à 7 jours avant le départ.</span>
</span>
```

```jsx
<InfoBulle texte="Remboursée en entier jusqu'à 7 jours avant le départ."><Bouton variante="secondary" iconeSeule aria-label="Supprimer la réservation"><Icone nom="fermer" /></Bouton></InfoBulle>
```
