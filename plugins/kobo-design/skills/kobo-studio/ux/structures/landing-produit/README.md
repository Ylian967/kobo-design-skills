# Landing produit

Une page pour une seule offre, avec un seul parcours : comprendre, vérifier, choisir, demander.

## Quand la choisir

- Il y a **une** chose à vendre, à réserver ou à faire essayer, et une seule action au bout.
- La personne arrive de l'extérieur (lien, publicité, message) et ne connaît pas le reste du site.

Ne pas la choisir s'il y a plusieurs offres à comparer (→ site vitrine) ou si le contenu est d'abord à lire (→ article, récit).

## Fichiers

| Fichier | Rôle |
|---|---|
| `landing-produit.html` | La page, remplie d'un exemple fictif (Cordée Brume) |
| `landing-produit.css` | Ce qui lui est propre : étapes, lignes de date, envoi |
| `landing-produit.js` | Le choix d'une date libère l'envoi ; le formulaire valide, envoie, confirme |
| `LandingProduit.jsx` | Version React |

Composants utilisés : bouton, champ, barre-nav, menu-mobile, onglets, notification.

## Enchaînement des sections

| # | Section | Question à laquelle elle répond | Forme |
|---|---|---|---|
| 1 | Promesse (`hero`) | Qu'est-ce que c'est, pour qui, combien ? | Titre, phrase, trois faits, **une** action, une photo |
| 2 | Déroulé | Que va-t-il se passer, concrètement ? | Liste ordonnée, l'heure en marge — pas des cartes |
| 3 | Pratique | Qu'est-ce qui est compris, que dois-je apporter ? | Onglets |
| 4 | Dates | Quand ? | Lignes à cocher (boutons radio), les complètes dites complètes |
| 5 | Demande (`finale`) | Comment je m'inscris ? | Formulaire, sur le ton inversé |

L'ordre suit les questions de la personne, pas un plan type : ni rangée de logos, ni témoignages, ni trois arguments en cartes.

## Emplacements

| Emplacement | Où | Parts |
|---|---|---|
| `frame`, `backdrop` | Toute la page | — |
| `hero` | Section 1 | `kicker`, `title`, `lead`, `facts`, `action`, `media` |
| `media` | Photo du héros, photo du déroulé | — |
| `title` | Tête des sections 2, 3, 4 | `kicker`, `title`, `lead` |
| `grid` | Liste des dates | `item` (une ligne à cocher) |
| `finale` | Section 5 | `title`, `lead`, `form` |

Un gabarit qui remplace `grid` doit garder des boutons radio nommés `date` : c'est eux que le formulaire lit.

## Comportement mobile

- Le héros s'empile : texte, faits, action, puis photo. L'action reste visible sans défilement sur un écran de 390 × 850 px sous la plupart des skills.
- Titre et liste du déroulé s'empilent ; les onglets défilent horizontalement s'ils ne tiennent pas.
- Les lignes de date font au moins 60 px de haut ; le nombre de places passe à la ligne s'il le faut.
- La barre se replie en bouton « Menu » dès que ses liens ne tiennent plus.

## Clavier

Tab : lien d'évitement → barre → action du héros → onglets (flèches pour changer) → dates (flèches entre les dates, Espace pour choisir) → champs → envoi. Le bouton d'envoi reste atteignable tant qu'aucune date n'est choisie : activé, il conduit au lien « Choisissez d'abord une date ».

## États

| État | Rendu |
|---|---|
| Date complète | Bouton radio désactivé, libellé barré, mention « Complet » |
| Aucune date choisie | Envoi en `aria-disabled`, lien d'explication à côté, mention « Aucune date choisie » |
| Date choisie | La mention l'annonce (`role="status"`), l'envoi se libère |
| Champ en erreur | Message écrit sous le champ, à la sortie du champ et à l'envoi ; focus sur le premier champ en erreur |
| Envoi en cours | Bouton en `aria-busy`, libellé « Envoi en cours… » |
| Succès | Notification, formulaire vidé |
| Échec | Notification d'erreur qui reste ; les réponses sont gardées |

L'envoi de la démonstration est simulé (`send()` dans le script) : le remplacer par l'appel réel. Pour voir l'échec d'envoi, ouvrir `landing-produit.html?echec`.

## Exemple React

```jsx
<ZoneNotifications>
  <LandingProduit page={page} hero={hero} deroule={deroule} pratique={pratique} dates={dates}
    demande={{ titre: 'Demander une place', appui: '…', champs, libelleEnvoi: 'Envoyer la demande', envoyer: (donnees) => api.demander(donnees), succes, echec }} />
</ZoneNotifications>
```
