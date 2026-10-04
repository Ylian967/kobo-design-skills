# État vide

**Rôle.** Occuper la place d'un contenu absent : une liste sans élément, une recherche sans résultat, un chargement qui a échoué. Il dit ce qui se passe, pourquoi, et quoi faire.

Fichiers : `etat-vide.css`, `EtatVide.jsx`. Pas de script. Composant non interactif : ses actions sont des boutons (`../bouton/`).

## Anatomie

```
.k-empty                          [role="alert" pour la variante erreur]
├── svg.k-icon.k-empty__icon      icône au trait (aria-hidden)
├── hN.k-empty__title             ce qui se passe, en une phrase
├── p.k-empty__text               pourquoi, et ce qui va se passer
└── .k-empty__actions             un bouton, deux au plus
```

## Les trois cas

| Cas | Variante | Titre type | Action |
|---|---|---|---|
| Liste vide | (aucune) | « Aucune réservation ce mois-ci » | créer, ou aller voir ailleurs |
| Recherche ou filtre sans résultat | `k-empty--center` (facultatif) | « Aucune sortie pour « canyon » » — on répète la recherche | effacer la recherche |
| Échec de chargement | `k-empty--error` | « Les réservations n'ont pas pu être chargées » | réessayer |

`k-empty--plain` retire le cadre (à l'intérieur d'une carte ou d'un panneau d'onglet).

## États

Repos seulement. Survol, focus, appui, désactivé et chargement appartiennent aux boutons qu'il contient. La variante erreur ajoute une bordure pleine et colore l'icône en `--k-danger` ; le titre dit l'échec en toutes lettres.

## Accessibilité

- Un vrai titre, au bon niveau dans la page.
- L'icône est décorative (`aria-hidden`) : tout le sens est dans le texte.
- Variante erreur : `role="alert"` pour être annoncée à l'apparition.
- Pas d'illustration générique : une icône au trait suffit. Le texte est écrit pour ce cas précis, jamais « Rien à afficher ».
- Aligné à gauche par défaut ; le centrage est une variante, pas la règle.

## Exemple

```html
<div class="k-empty">
  <svg class="k-icon k-empty__icon" aria-hidden="true">…</svg>
  <h3 class="k-empty__title">Aucune réservation ce mois-ci</h3>
  <p class="k-empty__text">Dès qu'une personne réserve une de vos sorties, elle apparaît ici avec ses coordonnées.</p>
  <div class="k-empty__actions"><a class="k-btn" href="/sorties">Voir mes sorties</a></div>
</div>
```

```jsx
<EtatVide titre="Les réservations n'ont pas pu être chargées" variante="error"
          actions={<Bouton onClick={recharger}>Réessayer</Bouton>}>
  Le serveur n'a pas répondu. Vos données ne sont pas perdues.
</EtatVide>
```
