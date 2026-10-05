# Bouton radio

**Rôle.** Choisir **une seule** réponse parmi deux à cinq, toutes visibles. Au-delà : sélection. Plusieurs réponses : cases à cocher.

Fichiers : `bouton-radio.css`, `BoutonRadio.jsx` (`GroupeRadio`). Pas de script : le groupe et son clavier sont natifs.

## Anatomie

```
fieldset.k-radio-group
├── legend.k-radio-group__legend            la question
├── div.k-radio-group__list
│   └── label.k-radio
│       ├── input.k-radio__input[type=radio]   le vrai bouton, invisible, étendu à la zone cliquable
│       ├── span.k-radio__box[aria-hidden]      le rond dessiné
│       └── span.k-radio__text
│           ├── span.k-radio__label
│           └── span.k-radio__help             précision (facultative)
├── p.k-radio-group__help
└── p.k-radio-group__error
```

Un bouton radio n'existe jamais seul : toujours dans un groupe de même `name`.

## États

| État | Déclencheur | Rendu |
|---|---|---|
| Repos | — | rond vide au contour `--k-line-strong` d'au moins 2 px |
| Survol | `:hover` | fond `--k-surface-2` |
| Focus clavier | `:focus-visible` | contour `--k-focus` autour du rond |
| Choisi | `:checked` | point plein de la couleur du texte **et** libellé en gras |
| Désactivé | `disabled` (+ `k-radio--off`) | contour en tirets, texte `--k-text-muted`, libellé barré ; la raison s'écrit dans `k-radio__help` (« Complet ») |
| Erreur | `aria-invalid="true"` sur les boutons + message du groupe | contour `--k-danger` doublé **et** message écrit avec icône |

Chargement et vide ne s'appliquent pas. Aucun choix par défaut si aucune réponse n'est plus probable que les autres.

## Clavier

Natif : `Tab` entre dans le groupe (sur le choix coché, sinon le premier) et en sort ; `↑` `↓` `←` `→` passent d'un choix à l'autre et le cochent ; `Espace` coche le choix qui a le focus.

## Accessibilité

- `<fieldset>` + `<legend>` : la question est annoncée avec chaque réponse, ainsi que « 2 sur 4 ».
- Le libellé est cliquable en entier ; zone cliquable d'au moins `--k-hit-min`.
- Le choix n'est jamais dit par la couleur seule : point plein et graisse.
- Obligatoire : `required` sur les boutons ; l'erreur s'écrit sous le groupe, reliée par `aria-describedby` au `<fieldset>`.
- `prefers-reduced-motion` : transitions coupées.

## Exemple

```html
<fieldset class="k-radio-group" aria-describedby="date-aide">
  <legend class="k-radio-group__legend">Date de la sortie</legend>
  <div class="k-radio-group__list">
    <label class="k-radio"><input type="radio" class="k-radio__input" name="date" value="17-01"><span class="k-radio__box" aria-hidden="true"></span><span class="k-radio__text"><span class="k-radio__label">Samedi 17 janvier</span><span class="k-radio__help">4 places</span></span></label>
    <label class="k-radio k-radio--off"><input type="radio" class="k-radio__input" name="date" value="31-01" disabled><span class="k-radio__box" aria-hidden="true"></span><span class="k-radio__text"><span class="k-radio__label">Samedi 31 janvier</span><span class="k-radio__help">Complet</span></span></label>
  </div>
  <p class="k-radio-group__help" id="date-aide">Six places par sortie.</p>
</fieldset>
```

```jsx
<GroupeRadio legende="Date de la sortie" options={dates} valeur={date} surChangement={setDate} aide="Six places par sortie." />
```
