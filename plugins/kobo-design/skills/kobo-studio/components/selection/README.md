# Sélection

**Rôle.** Choisir une valeur dans une liste fermée de cinq options ou plus. En dessous de cinq, des boutons radio se lisent mieux ; pour chercher parmi des dizaines de valeurs, il faut un champ de recherche, pas une liste.

Fichiers : `selection.css`, `Selection.jsx`. **Dépend de `champ/champ.css`** (à charger avant) et, pour la validation, de `champ/champ.js`. Pas de script propre : la liste est celle du système, donc juste au doigt, au clavier et au lecteur d'écran.

## Anatomie

```
.k-field.k-select
├── label.k-field__label                         libellé visible, relié par for / id
├── .k-field__box.k-select__box                  zone cliquable et chevron (deux filets, pas une image)
│   └── select.k-field__control.k-select__control
├── p.k-field__help                              pourquoi on demande (facultatif)
└── p.k-field__error                             message d'erreur écrit, précédé d'une icône
```

Le `<select>` porte les deux classes : il prend l'apparence du champ, ses états et la couche de signature du skill.

## États

| État | Déclencheur | Rendu |
|---|---|---|
| Repos | — | celui du champ, plus le chevron de la couleur du texte |
| Survol | `:hover` | fond `--k-surface-2` |
| Focus clavier | `:focus-visible` | contour `--k-focus` |
| Ouvert | natif | la liste du système |
| Désactivé | `disabled` | texte et chevron `--k-text-muted`, curseur interdit ; une option peut être désactivée seule |
| Erreur | `aria-invalid="true"` + message | bordure `--k-danger` épaissie à gauche **et** message écrit avec icône |
| Vide | première option `value=""` (« Choisir… ») | l'option vide tient lieu d'invite ; elle n'est pas un libellé |
| Chargement | — | désactiver la liste et écrire « Chargement des dates… » comme seule option |

Variante : `multiple` rend une liste ouverte sans chevron (Ctrl ou Maj pour étendre le choix) ; une option choisie porte une coche et passe en gras, sur le fond de sélection du système ; au-delà de quelques options, préférer des cases à cocher.

## Clavier

Natif : `Tab` atteint la liste ; `Espace`, `Entrée` ou `Alt + ↓` l'ouvrent ; `↑` `↓` changent de valeur ; une lettre saute à l'option qui commence par elle ; `Échap` referme.

## Accessibilité

- Un `<label>` visible, toujours. L'option vide n'en est pas un.
- L'erreur est écrite, reliée par `aria-describedby`, jamais signalée par la couleur seule.
- `data-k-validate` sur `.k-field` et `required` sur le `<select>` : `champ.js` vérifie à la sortie du champ et à l'envoi.
- Zone cliquable d'au moins `--k-hit-min` (héritée de `.k-field__box`).

## Exemple

```html
<div class="k-field k-select" data-k-validate>
  <label class="k-field__label" for="niveau">Votre niveau</label>
  <div class="k-field__box k-select__box">
    <select class="k-field__control k-select__control" id="niveau" required aria-describedby="niveau-aide">
      <option value="">Choisir…</option>
      <option>Jamais marché sur la neige</option><option>Quelques sorties en raquettes</option><option disabled>Alpinisme (complet)</option>
    </select>
  </div>
  <p class="k-field__help" id="niveau-aide">Le guide adapte l'allure du groupe.</p>
  <p class="k-field__error" id="niveau-erreur" hidden></p>
</div>
```

```jsx
<Selection libelle="Votre niveau" vide="Choisir…" requis="Choisissez un niveau : le guide en a besoin pour composer le groupe." options={niveaux} surChangement={setNiveau} />
```
