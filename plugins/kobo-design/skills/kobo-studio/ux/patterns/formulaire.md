# Formulaire

Composants : `champ`, `bouton`, `notification`. Exemple complet : `structures/landing-produit/` (section « Demander une place »).

## Validation

| Moment | Ce qui se passe |
|---|---|
| Pendant la saisie | Rien. On ne signale pas une erreur à quelqu'un qui n'a pas fini d'écrire. Exception : un compteur de caractères, une erreur déjà affichée qui se corrige |
| À la sortie du champ | Le champ est vérifié ; l'erreur s'écrit sous lui |
| À l'envoi | Tous les champs sont vérifiés ; le focus va au premier champ en erreur |
| Au retour du serveur | Une erreur qui concerne un champ s'écrit sous ce champ (`Kobo.field.setError`) ; une erreur générale passe par une notification |

`components/champ/champ.js` fait les deux premiers sur tout `.k-field[data-k-validate]`.

## Une erreur bien écrite

- **Écrite**, précédée d'une icône, reliée au champ par `aria-describedby`, avec `aria-invalid="true"`. Jamais la couleur seule.
- **Elle dit quoi corriger** : « Adresse incomplète : il manque le domaine, par exemple .fr », pas « Champ invalide ».
- **Elle ne vide pas le champ.** La personne corrige, elle ne recommence pas.
- L'aide (`k-field__help`) dit pourquoi on demande l'information. Elle reste visible quand l'erreur apparaît.

## Envoi

1. Le bouton passe en `aria-busy="true"` et son libellé dit « Envoi en cours… ». Il ne se désactive pas (il garderait mal le focus) ; un second clic est ignoré.
2. **Succès réel** : une notification de type `success` qui dit ce qui va se passer ensuite, et le formulaire se vide. Le succès vient de la réponse du serveur, jamais d'un changement de libellé dans `onsubmit`.
3. **Échec** : une notification de type `error`, qui reste affichée, dit que les réponses sont gardées et propose de réessayer. Le formulaire garde son contenu.
4. Au-delà de 10 s sans réponse : c'est un échec.

## Quand un choix manque

Un bouton d'envoi qui dépend d'un choix fait ailleurs (une date, une taille) reçoit `aria-disabled="true"` — pas `disabled` : il reste atteignable au clavier. À côté, un lien dit ce qui manque et y conduit (« Choisissez d'abord une date »). Dès que le choix est fait, le bouton se libère et un texte `role="status"` le dit.

## Règles

- Un `<label>` visible par champ. Le texte d'exemple (`placeholder`) n'en est pas un.
- `autocomplete`, `inputmode` et `type` justes : c'est la moitié du confort sur téléphone.
- Les champs facultatifs sont marqués « (facultatif) » ; les obligatoires ne portent pas d'astérisque.
- Un formulaire, une colonne. Deux champs côte à côte seulement s'ils se lisent ensemble (code postal et ville).
- `novalidate` sur le `<form>` : les bulles du navigateur ne suivent pas le skill et ne sont pas traduites.
- Tout bouton a un `type`.
