# Index des composants

Vingt composants, une ligne chacun. C'est la seule liste à lire pour savoir ce qui existe : le détail d'un composant (balisage, clavier, variantes, exemple) est dans `components/<dossier>/README.md`, à ouvrir **seulement pour ceux que la page utilise**.

Tous prennent l'apparence du skill chargé et ont un focus clavier visible. « États » liste ce que le composant sait montrer en plus du repos, du survol et du focus.

| Dossier | Rôle | États | Script | React (`components/<dossier>/…`) |
|---|---|---|---|---|
| `bouton` | Déclencher une action ; s'applique aussi à un lien qui doit peser comme un bouton | appui, bascule, désactivé, chargement | — | `Bouton.jsx` → `Bouton` |
| `champ` | Saisir une valeur courte ou un texte libre, avec libellé, aide et message d'erreur | désactivé, lecture seule, chargement, erreur | `Kobo.field` | `Champ.jsx` → `Champ` |
| `selection` | Choisir une valeur dans une liste fermée de cinq options ou plus (liste du système). Dépend de `champ` | désactivé, erreur, vide, chargement | — (validation : `champ.js`) | `Selection.jsx` → `Selection` |
| `case-a-cocher` | Dire oui ou non, ou choisir plusieurs réponses | cochée, partielle, désactivée, erreur | `Kobo.check` (partielle, tout cocher) | `CaseACocher.jsx` → `CaseACocher`, `GroupeCases` |
| `bouton-radio` | Choisir une seule réponse parmi deux à cinq, toutes visibles | choisi, désactivé, erreur | — | `BoutonRadio.jsx` → `GroupeRadio` |
| `interrupteur` | Allumer ou éteindre un réglage qui s'applique tout de suite | allumé, éteint, désactivé, chargement, erreur | `Kobo.switch` | `Interrupteur.jsx` → `Interrupteur` |
| `carte` | Regrouper ce qui décrit un même objet : image, surtitre, titre, texte, pied | sélectionnée, indisponible, chargement | — | `Carte.jsx` → `Carte`, `TexteCarte`, `EncartCarte` |
| `tableau` | Comparer des enregistrements sur plusieurs critères : tri, lignes à sélectionner, lignes parcourables au clavier. Dépend de `case-a-cocher` et d'`etat-vide` | trié, ligne sélectionnée, ligne ouverte, ligne indisponible, chargement, vide, erreur | `Kobo.table` | `Tableau.jsx` → `Tableau` |
| `pagination` | Parcourir une longue liste par pages numérotées. Dépend de `bouton` | page courante, désactivé, chargement, compacte | `Kobo.pagination` (liste qui change sans recharger) | `Pagination.jsx` → `Pagination`, `numeros` |
| `onglets` | Basculer entre des vues de même niveau sans changer de page | actif, désactivé, vide, chargement | `Kobo.tabs` | `Onglets.jsx` → `Onglets` |
| `accordeon` | Replier des réponses qu'on ne lit pas toutes (questions fréquentes, conditions) | ouvert, fermé, désactivé | `Kobo.accordion` | `Accordeon.jsx` → `Accordeon` |
| `menu-deroulant` | Ranger derrière un bouton des actions rares ou un choix d'affichage. Dépend de `bouton` | ouvert, coché, désactivé, action destructrice | `Kobo.dropdown` | `MenuDeroulant.jsx` → `MenuDeroulant` |
| `modale` | Demander une décision ou une saisie courte sans quitter la page | ouverte, chargement, erreur | `Kobo.modal` | `Modale.jsx` → `Modale` |
| `notification` | Confirmer le résultat d'une action, ou prévenir, sans interrompre | information, succès, avertissement, erreur ; compte à rebours suspendu au survol | `Kobo.toast` | `Notification.jsx` → `useNotifications`, `ZoneNotifications` |
| `info-bulle` | Préciser un élément (nom d'un bouton à icône, définition) ; jamais une information indispensable | affichée, refermée par Échap | `Kobo.tooltip` | `InfoBulle.jsx` → `InfoBulle` |
| `etat-vide` | Tenir la place d'un contenu absent : liste vide, recherche sans résultat, chargement échoué | vide, erreur | — | `EtatVide.jsx` → `EtatVide` |
| `chargement` | Faire patienter : squelette d'un contenu qui arrive, barre d'une opération longue | en cours, durée inconnue, terminé, erreur | `Kobo.progress` (barre) | `Chargement.jsx` → `Squelette`, `ZoneEnChargement`, `BarreProgression` |
| `barre-nav` | Barre de navigation d'un site : marque, quatre à six liens, une ou deux actions. Va avec `menu-mobile` | page courante, repliée | `Kobo.nav` | `BarreNav.jsx` → `BarreNav` |
| `menu-mobile` | Navigation en plein écran quand la barre est repliée | ouvert, page courante | `Kobo.menu` | `MenuMobile.jsx` → `MenuMobile` |
| `fil-ariane` | Dire où est la page dans le site et remonter d'un niveau | page courante, replié | `Kobo.crumbs` (repli) | `FilAriane.jsx` → `FilAriane` |

Une icône en React : `components/Icone.jsx`.

## Ce que chaque structure charge déjà

`tools/kit.py` pose ces composants avec la structure. Tout autre composant s'ajoute par `--composants <dossier>[,<dossier>]` ; la commande affiche les balises à ajouter à la page.

| Structure | Composants déjà posés |
|---|---|
| `landing-produit` | bouton, champ, barre-nav, menu-mobile, onglets, notification |
| `site-vitrine` | bouton, champ, carte, barre-nav, menu-mobile, etat-vide, fil-ariane |
| `recit-collant` | bouton, barre-nav, menu-mobile |
| `article` | bouton, barre-nav, menu-mobile, notification, fil-ariane |
| `application` | bouton, champ, selection, case-a-cocher, tableau, etat-vide, modale, onglets (écran fiche) |

## Choisir entre deux composants proches

- Une seule réponse : `bouton-radio` jusqu'à cinq options, `selection` au-delà. Plusieurs réponses : `case-a-cocher`.
- Un réglage appliqué tout de suite : `interrupteur`. Dans un formulaire qu'on envoie : `case-a-cocher`.
- Interrompre pour décider : `modale`. Confirmer sans interrompre : `notification`.
- Des éléments à comparer : `tableau`. Des éléments à parcourir, chacun avec une image et une destination : `carte`. Des faits (prix, horaires) : une liste `k-facts`, pas un composant.
- Changer de vue dans la page : `onglets`. Changer de page : des liens.
