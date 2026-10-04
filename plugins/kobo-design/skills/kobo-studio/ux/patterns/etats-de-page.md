# États de page

Une page n'a pas un état mais cinq. Chacun se prévoit avant d'écrire la page.

| État | Quand | Composant | Ce que la personne doit lire |
|---|---|---|---|
| **Chargement** | Le contenu arrive dans plus de 300 ms | `chargement` : squelette à la forme du contenu ; barre si la durée est connue | Rien à lire : la forme annonce ce qui vient. Un texte `role="status"` pour les lecteurs d'écran |
| **Vide** | La liste, la recherche ou le filtre ne rend rien | `etat-vide` | Ce qui se passe, pourquoi, quoi faire ensuite (une action) |
| **Erreur** | Le chargement a échoué | `etat-vide` variante `k-empty--error`, `role="alert"` | Ce qui a échoué, ce qui n'est pas perdu, un bouton « Réessayer » |
| **Hors ligne** | Le réseau est coupé | `notification` de type `warning`, qui reste | Que la page affichée est peut-être ancienne ; ce qui reste possible |
| **Partiel** | Une partie seulement a chargé | Le contenu reçu, plus un `etat-vide` d'erreur à la place du reste | Ce qui manque, et le moyen de le redemander |

## Règles

1. **Le squelette a la forme du contenu.** Même nombre de lignes, même hauteur d'image : rien ne saute quand le contenu arrive. Pas de roue d'attente seule au milieu d'une page.
2. **Sous 300 ms, rien.** Un squelette qui clignote est pire que pas de squelette. Au-delà de 10 s, le chargement devient une erreur, avec « Réessayer ».
3. **Un état vide n'est pas une erreur.** Pas de rouge, pas d'icône d'alerte : une explication et une suite.
4. **L'erreur dit ce qui est sauf.** « Vos réponses sont gardées », « Rien n'a été débité ».
5. **Hors ligne ne vide pas la page.** On garde ce qui est affiché ; on désactive ce qui demande le réseau, en disant pourquoi (voir `formulaire.md`, bouton d'envoi).
6. **La zone qui change est annoncée** : `aria-busy="true"` pendant le chargement, retiré ensuite ; `role="status"` pour un résultat, `role="alert"` pour une erreur.
7. **Le focus ne se perd pas.** Si l'élément qui avait le focus disparaît (bouton « Réessayer » remplacé par le contenu), le focus va au titre de la zone.

## Où c'est déjà fait

- Vide après recherche : `structures/site-vitrine/` (accueil, « Chercher une sortie »).
- Échec d'envoi : `structures/landing-produit/landing-produit.js`.
- Squelette, barre, échec de chargement : `../../components/gallery.html`, sections « Chargement » et « État vide ».

## Hors ligne : esquisse

```js
window.addEventListener('offline', function () {
  Kobo.toast({ type: 'warning', title: 'Connexion perdue', text: 'La page reste lisible. L’envoi reprendra au retour du réseau.', duration: 0 });
});
```

Non fourni dans les structures : aucune ne dépend d'un réseau après son chargement.
