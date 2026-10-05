# Clear Ledger Desk — mouvement

Le mouvement répond à un geste ou dit un état. Il ne présente rien, n'accueille personne, ne décore pas.

## Observé (mesuré sur la référence de style)

| Quoi | Propriétés | Durée | Courbe |
|---|---|---|---|
| Survol d'un bouton, d'un lien, d'une ligne | couleur de fond, de bordure, de texte | 50 ms (100 ms pour quelques liens) | `cubic-bezier(0.4, 1, 0.6, 1)` |
| Champ : survol, focus | fond, bordure, ombre intérieure | 150 à 200 ms | la même, ou `ease-in-out` |
| Menu, info-bulle | opacité, déplacement | 200 ms | `ease-out` |

Aucune animation d'entrée de page, aucun effet lié au défilement.

## Proposé

| Quoi | Propriétés | Durée |
|---|---|---|
| Panneau de détail, tiroir de la barre latérale | `transform` (glissement), puis `visibility` | `--dur-slow` (200 ms) |
| Repli de la barre latérale | largeur de la colonne de grille | `--dur-slow` |
| Notification | `opacity`, `transform` de 16 px | `--dur-base` (150 ms) |
| Squelette de chargement | `opacity` entre 1 et 0,45, en va-et-vient | 1,2 s |

Ce qui ne bouge jamais : les chiffres (pas de compteur qui monte), le tri (les lignes changent d'ordre d'un coup), le changement d'écran, le changement de densité.

## Code

```css
.btn, tbody tr, .side a { transition: background-color var(--dur-fast) var(--ease-out); }
.detail { transform: translateX(100%); visibility: hidden;
  transition: transform var(--dur-slow) var(--ease-out), visibility 0s linear var(--dur-slow); }
.detail[data-open] { transform: none; visibility: visible; transition-delay: 0s; }
.skel { animation: pulse 1.2s var(--ease-out) infinite alternate; }
@keyframes pulse { to { opacity: 0.45; } }
```

Le focus n'attend jamais une animation : il est donné dès que l'élément est rendu.

## Performance

- Seuls `background-color`, `opacity` et `transform` sont animés, plus la largeur d'une colonne de grille au repli de la barre (un geste rare).
- **Une seule animation continue**, le squelette, et seulement pendant un chargement ; elle n'anime que `opacity`.
- Aucun écouteur de défilement, aucune boucle `requestAnimationFrame`, aucun observateur.
- Le tableau de la démo (12 lignes) est rendu d'un coup ; au-delà de quelques centaines de lignes, virtualiser la liste.
- Non mesuré : les images par seconde. Il n'y a pas d'animation longue à mesurer ; le poids de la démo est de 57 Ko, polices et quatre portraits de 96 px en plus.

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  :root { --dur-fast: 0ms; --dur-base: 0ms; --dur-slow: 0ms; }
  .skel { animation: none; }
}
```

Tout reste utilisable : les panneaux apparaissent d'un coup, le squelette est fixe.
