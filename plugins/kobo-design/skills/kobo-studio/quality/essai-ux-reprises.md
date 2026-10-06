# Essai de la méthode UX en reprise : les cinq autres exemples (6 octobre 2026)

Cinq agents neufs, chacun avec `SKILL.md` et une demande d'une phrase, en mode reprise sur un exemple existant. Avant de les lancer, j'ai écrit une fiche client neutre par exemple (`fiches-clients.md`) : qui est le client, son public, ce qu'il veut, ses contraintes, sans les problèmes de l'audit ni les écrans attendus. Je n'ai répondu aux interviews qu'à partir de ces fiches ; ce que la fiche ne disait pas a reçu « je ne sais pas, décidez ». Faits inventés sur le moment : les budgets du cabinet sont « tous hors taxes ».

Résultats, tâche par tâche : `ux-audit-exemples.md`, « Après les reprises ».

## Ce qu'on voulait savoir

| Question | Constat |
|---|---|
| La méthode tient-elle en reprise ? | Oui pour les cinq : questions sur les personnes d'abord, `parcours.md` écrit avant toute proposition, tableau des tâches jouées à la livraison. Elle n'était pas dans `reprise.md` avant cet essai : ajoutée juste avant |
| Les fiches jamais exercées servent-elles ? | `boutique-panier` (festival), `contact-devis` (cabinet, restaurant, poterie), `outil-interne` (CRM), `reservation-creneaux` hors club (restaurant, poterie) : lues et suivies. `prise-de-rendez-vous` : **toujours jamais lue** (le cabinet a pris `contact-devis`, à raison : c'est l'atelier qui fixe la date) |
| Le skill d'origine est-il gardé ? | Oui, les cinq, chaque fois avec sa limite dite. Aucun plan n'a montré qu'il fallait en changer ; deux agents ont noté que le skill ne « convient à » pas le métier dans le catalogue (festival en `nocturne-architecture`, restaurant en `retro-mission-poster`) et l'ont gardé parce que le client le voulait |
| Les attendus sortent-ils sans être soufflés ? | En grande partie : billetterie complète, réservation avec places et annulation, formulaire de devis avec délai, annulation d'étape, modification, archivage, barre latérale retirée. **Trois ne sont pas sortis seuls** : les cartes de plats du restaurant, l'appel réservé au téléphone, le bouton d'achat du festival visible sur téléphone ; et une page par projet au cabinet (écartée, avec raison). Les trois premiers sont corrigés par moi |
| Les parcours sont-ils joués ? | Oui, par les cinq, aux deux passes, avec preuves ; mais chaque agent a laissé des preuves périmées ou des états non joués, et l'a dit |

## Où les agents se sont perdus, et la suite donnée

| Point (qui) | Suite |
|---|---|
| `avant/` copié sans `kobo/` : état des lieux sans styles, faux constats (les cinq) | **Corrigé** : `reprise.md` (copie avec `kobo/`, `src/` et `dist/` en React) |
| `kit.py` réécrit des pages de départ en reprise (CRM, cabinet) | **Corrigé** : `kit.py --maj` |
| « Deux ou trois skills » contre « garde-le » (les cinq) | **Corrigé** dans `SKILL.md` |
| Aucune fiche pour une billetterie ; pas de sélecteur de quantité (festival) | **Corrigé** : section « Petite offre et billetterie » ; le sélecteur manque toujours, c'est dit |
| « Ce qui se fait se défait » contre « pas de remboursement » (festival) | **Corrigé** dans `ux/methode.md` |
| Comment compter une liste déroulante, un lien de la barre replié derrière « Menu » (festival, restaurant) | **Corrigé** dans `ux/methode.md` |
| Réservation sans compte : coordonnées, nombre de personnes, retrouver par référence, plus de sept jours (restaurant, poterie) | **Corrigé** : section « Sans compte » de `reservation-creneaux.md` |
| Objectif « sur téléphone » et règle des trois colonnes pour un outil jamais utilisé au téléphone (CRM) | **Corrigé** : `ux/methode.md`, `quality/ux-grille.md` |
| Outil à une seule vue, plus de deux gestes dans le détail, rôle sans authentification (CRM) | **Corrigé** : `outil-interne.md`, `application/README.md` ; la touche `[` ne fait plus rien sans barre latérale |
| Demandes trop vagues : quoi demander (cabinet) | **Corrigé** : section de `contact-devis.md` |
| Rendez-vous : quelle fiche (cabinet) | **Corrigé** : `domaines/README.md` |
| Consulter des réalisations : aucune fiche (cabinet) | **Dit**, pas de fiche : `domaines/README.md`, « Une tâche sans fiche » |
| `formulaire.md` (succès en notification, formulaire vidé) contre les fiches (confirmation qui reste) (cabinet, poterie) | **Corrigé** dans `formulaire.md` |
| La couche mouvement réécrivait un total mis à jour par script (festival) | **Corrigé** : `motion.js` (`data-k-still`, valeur vivante jamais comptée) |
| Le menu mobile ramenait la page vers le haut après un lien d'ancre (festival) | **Corrigé** : `menu-mobile.js` ; non rejoué |
| Le panier disparaît de la barre repliée (festival) | **Documenté** : hors de `k-nav__extra` ; appliqué au festival |
| Notification d'erreur qui reste après un succès ; notification sur le panneau de détail (cabinet, CRM) | **Documenté** dans les README |
| Menu déroulant : choix masqué en tête, indication trop longue (CRM) | **Corrigé** |
| `data-k-msg` remplace aussi le bon message d'adresse incomplète (cabinet, poterie) | **Corrigé** : `data-k-msg-vide` |
| `k-link` de 20 px, étape ou lien secondaire (cabinet, restaurant) | **Corrigé** : zone cliquable de `--k-hit-min`, règle clarifiée |
| Liens vers des pages absentes non vus par `check_studio.py` (cabinet, restaurant, poterie) | **Corrigé** |
| Faux contraste de 1,27 : le bas du cadre fixe figé au milieu de la capture (restaurant) | **Corrigé** dans `tools/sonde.html` |
| Simulation du doigt : taille Playwright, réglages qui survivent dans l'onglet (les cinq) | **Corrigé** : un onglet neuf par passe, contrôles de début de passe |
| Liens `tel:`, `mailto:`, listes du système, états liés à l'heure (les cinq) | **Corrigé** dans la grille |
| Règle 10 inapplicable aux skills sans gabarit hors du héros (les cinq) | **Dit** dans la règle ; le fond reste le chantier des sections signature |
| `bouton-radio` sans validation, `Champ.jsx` sans validation à l'envoi, `Bouton.jsx` sans icône (cabinet, restaurant) | Non corrigé |
| Aucune pièce « une ligne avec son geste à droite », ni « un nombre de 1 à 6 », ni choix de jour compact (poterie, restaurant) | Non corrigé |
| Ordre des feuilles CSS en React quand deux pages n'importent pas la même liste (restaurant) | Non corrigé |
| `check_studio.py` ne capture que l'état d'arrivée d'une page (festival, poterie) | Non corrigé |
| Aucune structure ne fournit de page de commande, de confirmation, de formulaire hors landing | Non corrigé |
| Dix README de composants à lire à la construction | Non corrigé |

## Manques relevés à l'essai du club (`essai-ux-club.md`), repris ici

Corrigés : piège de focus de la modale (bouclé par le script), notifications empilées (trois au plus, un tiers de l'écran), lien simple à côté du bouton du héros (`data-k-part="more"`), moment d'activation des composants et contenu créé par script (README de `champ`, `onglets`, `modale`, et `SKILL.md`), retour de `Kobo.field.validate`, balisage de l'erreur d'un groupe radio, `data-k-tone="inverse"` documenté. Vérifié sans rien changer : la carte de `zigzag-snack-pop` ne grossit pas au survol, elle se soulève et penche d'un degré (c'est la signature) ; le README le dit. Non corrigé : le volume de lecture des README.

## Ce que l'essai ne dit pas

- J'ai écrit les fiches clients en connaissant les attendus : le choix de ce qu'« il veut » (« vendre les billets eux-mêmes », « sans appeler pendant le service ») oriente déjà. Les fiches évitent de souffler les écrans, pas le but.
- Les corrections des fiches et des composants faites pendant l'essai n'ont pas été rejouées par un agent neuf ; les trois derniers agents en ont reçu une partie par mes messages de coordination (pièges du navigateur).
- Je n'ai rejoué qu'une ou deux tâches par exemple (tableau de l'audit) ; le reste repose sur les tableaux des agents, qui signalent eux-mêmes des preuves prises avant leur dernière correction.
- Tout ce qui touche à l'argent, aux places, aux comptes et aux envois est simulé. Doigt simulé, Chrome seulement, aucun lecteur d'écran.
