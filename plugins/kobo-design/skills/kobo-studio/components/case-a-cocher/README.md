# Case à cocher

**Rôle.** Dire oui ou non à une chose, ou choisir **plusieurs** réponses dans une liste. Pour un seul choix parmi plusieurs : bouton radio. Pour un réglage qui s'applique tout de suite : interrupteur.

Fichiers : `case-a-cocher.css`, `case-a-cocher.js` (état partiel et « tout cocher » seulement), `CaseACocher.jsx` (`CaseACocher`, `GroupeCases`).

## Anatomie

```
label.k-check
├── input.k-check__input[type=checkbox]   la vraie case, invisible, étendue à toute la zone cliquable
├── span.k-check__box[aria-hidden]         la case dessinée
└── span.k-check__text                     libellé
    └── span.k-check__help                 précision (facultative)

fieldset.k-check-group                     une question, plusieurs cases
├── legend.k-check-group__legend
├── div.k-check-group__list
├── p.k-check-group__help
└── p.k-check-group__error
```

## États

| État | Déclencheur | Rendu |
|---|---|---|
| Repos | — | case vide au contour `--k-line-strong` d'au moins 2 px |
| Survol | `:hover` sur le libellé ou la case | fond `--k-surface-2` |
| Focus clavier | `:focus-visible` | contour `--k-focus` autour de la case |
| Cochée | `:checked` | case pleine de la couleur du texte **et** coche |
| Partielle | `indeterminate` (script, ou `data-k-indeterminate`) | case pleine **et** tiret |
| Désactivée | `disabled` | contour en tirets, texte `--k-text-muted` ; la coche reste lisible |
| Erreur | `aria-invalid="true"` + message du groupe | contour `--k-danger` doublé **et** message écrit avec icône |

Chargement et vide ne s'appliquent pas. La coche prend la couleur du texte, pas l'accent : elle reste lisible sous les skills à accent pâle.

## Clavier

`Tab` atteint chaque case ; `Espace` coche ou décoche (natif). Dans un formulaire, `Entrée` envoie le formulaire, pas la case.

## Accessibilité

- Le libellé est cliquable en entier ; la zone cliquable fait au moins `--k-hit-min` de côté.
- Un groupe est un `<fieldset>` avec sa `<legend>` : la question est lue avant chaque réponse.
- La case partielle est annoncée « partiellement cochée » (propriété native `indeterminate`).
- Une case obligatoire seule (« J'accepte… ») porte `required` ; son erreur s'écrit sous elle, reliée par `aria-describedby`.
- `prefers-reduced-motion` : transitions coupées.

## Exemple

```html
<fieldset class="k-check-group" aria-describedby="mat-aide">
  <legend class="k-check-group__legend">Matériel à prêter</legend>
  <div class="k-check-group__list">
    <label class="k-check"><input type="checkbox" class="k-check__input" name="pret" value="raquettes"><span class="k-check__box" aria-hidden="true"></span><span class="k-check__text">Raquettes</span></label>
    <label class="k-check"><input type="checkbox" class="k-check__input" name="pret" value="duvet"><span class="k-check__box" aria-hidden="true"></span><span class="k-check__text">Duvet grand froid<span class="k-check__help">Confort −15 °C</span></span></label>
  </div>
  <p class="k-check-group__help" id="mat-aide">Compris dans le prix.</p>
</fieldset>
```

```jsx
<GroupeCases legende="Matériel à prêter" options={materiel} valeurs={pret} surChangement={setPret} aide="Compris dans le prix." />
```
