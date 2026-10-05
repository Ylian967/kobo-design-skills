# Interrupteur

**Rôle.** Allumer ou éteindre un réglage **qui s'applique tout de suite**, sans bouton « Enregistrer ». Dans un formulaire qu'on envoie, c'est une case à cocher.

Fichiers : `interrupteur.css`, `interrupteur.js`, `Interrupteur.jsx`.

## Anatomie

```
button.k-switch[role=switch][aria-checked]
├── span.k-switch__track[aria-hidden]    glissière
│   └── span.k-switch__thumb             curseur
├── span.k-switch__label                 ce que le réglage commande : c'est le nom accessible
└── span.k-switch__state[aria-hidden]    le mot d'état, écrit par le CSS : data-on, data-off, data-busy
```

## États

| État | Déclencheur | Rendu |
|---|---|---|
| Éteint | `aria-checked="false"` | glissière vide, curseur à gauche, mot « Désactivé » |
| Allumé | `aria-checked="true"` | glissière pleine de la couleur du texte, curseur à droite, mot « Activé » |
| Survol | `:hover` | fond de la glissière `--k-surface-2` |
| Focus clavier | `:focus-visible` | contour `--k-focus` autour de l'ensemble |
| Désactivé | `disabled` ou `aria-disabled="true"` | glissière en tirets, texte `--k-text-muted` ; dire pourquoi dans un texte relié par `aria-describedby` |
| Chargement | `aria-busy="true"` (posé si `data-k-async`) | glissière en tirets, mot « Enregistrement… » ; le curseur ne bouge qu'à la réponse |
| Erreur | l'enregistrement échoue | l'interrupteur garde son ancien état ; une notification dit ce qui a échoué |

Vide ne s'applique pas. L'état n'est jamais dit par la couleur seule : position, fond et mot.

## Clavier

`Tab` atteint l'interrupteur ; `Espace` ou `Entrée` le bascule (c'est un bouton).

## Accessibilité

- `role="switch"` et `aria-checked` : annoncé « interrupteur, activé ». Le mot affiché est décoratif (`aria-hidden`), l'état vient de l'attribut.
- Le libellé nomme le réglage, pas l'action : « Rappel par e-mail », pas « Activer le rappel ».
- Zone cliquable : libellé compris, au moins `--k-hit-min` de haut.
- Si le changement peut échouer, `data-k-async` : rien ne bascule avant la réponse.
- `prefers-reduced-motion` : le curseur change de côté sans glisser.

## Exemple

```html
<button type="button" class="k-switch" role="switch" aria-checked="true">
  <span class="k-switch__track" aria-hidden="true"><span class="k-switch__thumb"></span></span>
  <span class="k-switch__label">Rappel par e-mail la veille</span>
  <span class="k-switch__state" aria-hidden="true" data-on="Activé" data-off="Désactivé" data-busy="Enregistrement…"></span>
</button>
```

```jsx
<Interrupteur libelle="Rappel par e-mail la veille" actif={rappel} surChangement={(v) => api.rappel(v).then(() => setRappel(v))} />
```
