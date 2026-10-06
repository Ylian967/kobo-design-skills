# Champ (texte et zone de texte)

**Rôle.** Saisir une valeur courte (`<input>`) ou un texte libre (`<textarea>`), avec son libellé, son aide et son message d'erreur.

Fichiers : `champ.css`, `champ.js`, `Champ.jsx`.

## Anatomie

```
.k-field                      [data-k-validate] : validation à la sortie du champ
├── label.k-field__label      toujours visible ; .k-field__opt pour « (facultatif) »
├── .k-field__box             porte la zone cliquable ; aria-busy pendant une vérification
│   ├── .k-field__control     <input> ou <textarea>
│   └── .k-field__spinner     témoin de vérification (aria-hidden)
├── p.k-field__error          icône + <span> message ; hidden tant qu'il n'y a pas d'erreur
└── .k-field__foot
    ├── .k-field__help        aide permanente
    └── .k-field__count       compteur « 12 / 280 » (zone de texte avec maxlength)
```

## États

| État | Déclencheur | Rendu |
|---|---|---|
| Repos | — | fond `--k-surface`, bordure `--k-line-strong` |
| Survol | `:hover` | fond `--k-surface-2` |
| Focus clavier | `:focus-visible` | contour `--k-focus` |
| Désactivé | `disabled` | fond `--k-surface-2`, texte et libellé `--k-text-muted`, curseur interdit |
| Lecture seule | `readonly` | bordure en tirets |
| Chargement | `aria-busy="true"` sur `.k-field__box` | témoin dans le champ ; l'aide dit « Vérification… » (`role="status"`) |
| Erreur | `aria-invalid="true"` | bordure `--k-danger` épaissie à gauche **et** message écrit précédé d'une icône |
| Vide | — | l'exemple (`placeholder`) en `--k-text-muted` ; il ne remplace jamais le libellé |

## Script

- `data-k-validate` sur `.k-field` : validation native à la sortie du champ, message en français ; une erreur déjà affichée se corrige en direct à la frappe.
- `Kobo.field.setError(champ, message)` / `clearError(champ)` / `validate(champ)` : pour une erreur venue du serveur ou une validation à l'envoi. `champ` est l'élément `.k-field`. `validate` **rend `true` si le champ est valide, `false` sinon** (et écrit ou retire le message) : à l'envoi, valide tous les champs, puis donne le focus au premier qui rend `false`.
- **Quand il s'active** : seul, sur les `.k-field` présents au chargement de la page. Pour un champ ajouté ensuite par script : `Kobo.field.init(conteneur)`.
- `data-k-msg="…"` sur le contrôle remplace **tous** les messages automatiques du champ. `data-k-msg-vide="…"` ne remplace que celui du champ laissé vide (« Indiquez votre adresse e-mail. ») : le message d'un format faux reste automatique et précis. Préfère le second.
- Compteur mis à jour si `.k-field__count` existe et que le contrôle a un `maxlength`.

Un message d'erreur dit **quoi corriger** : « Adresse incomplète : il manque le domaine », pas « Champ invalide ».

## Clavier

`Tab` atteint le champ. Dans une zone de texte, `Entrée` fait un retour à la ligne. Rien n'est intercepté.

## Accessibilité

- Le `<label>` est relié par `for` / `id`. Le message d'erreur et l'aide sont reliés par `aria-describedby` (le script l'ajoute pour l'erreur).
- En React, le message d'erreur porte `role="alert"` : il est annoncé dès qu'il apparaît.
- Zone cliquable : si `--k-control-h` est plus petit que `--k-hit-min`, la boîte déborde au-dessus et au-dessous du champ sans déplacer la mise en page, et un appui dans cette marge donne le focus au champ.
- L'erreur n'est jamais signalée par la couleur seule : icône + texte.

## Exemple

```html
<div class="k-field" data-k-validate>
  <label class="k-field__label" for="mail">Adresse e-mail</label>
  <div class="k-field__box"><input class="k-field__control" id="mail" type="email" required aria-describedby="mail-aide"></div>
  <p class="k-field__error" hidden><svg class="k-icon" aria-hidden="true">…</svg><span></span></p>
  <span class="k-field__help" id="mail-aide">Pour la confirmation.</span>
</div>
```

```jsx
<Champ libelle="Adresse e-mail" type="email" required aide="Pour la confirmation." />
<Champ libelle="Votre message" multiligne minLength={20} maxLength={280} erreur={erreurServeur} />
```
