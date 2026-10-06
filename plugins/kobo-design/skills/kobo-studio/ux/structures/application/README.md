# Application

La coquille d'un outil de travail : on y revient chaque jour pour faire une tâche, pas pour découvrir une offre. Une barre latérale, un en-tête à recherche, et trois écrans de départ : la **liste** (avec le détail de la ligne ouverte), la **fiche** d'un enregistrement en pleine page, le **tableau de bord**.

## Quand la choisir

- **Outil interne utilisé par des employés** : CRM, back-office, ERP, espace d'administration. Vérifie les quatre « oui » de `../../patterns/domaines/outil-interne.md`.
- L'utilisateur gère des enregistrements (clients, affaires, commandes, réservations) : il cherche, trie, filtre, coche, ouvre.

Ne pas la choisir pour présenter ou vendre (→ landing produit, site vitrine) : elle n'a ni héros, ni dernière section d'appel, ni pied de page.

Ne pas la choisir non plus pour l'**espace connecté d'un public** (membres, clients, adhérents), même si la demande dit « application » : barre latérale, tableau dense, recherche et raccourcis sont faits pour un employé à son bureau, pas pour quelqu'un qui réserve sur son téléphone (→ pages du site vitrine en intensité `reduced`, voir `SKILL.md`, « Projet mixte », et `../../patterns/domaines/compte-espace-membre.md`).

## Fichiers

| Fichier | Rôle |
|---|---|
| `application.html` | Écran **liste** : filtres, tableau, panneau de détail. Exemple fictif (réservations d'un organisateur de sorties) |
| `fiche.html` | Écran **fiche** : un enregistrement en pleine page |
| `tableau-de-bord.html` | Écran **tableau de bord** |
| `application.css` | La coquille et les trois écrans |
| `application.js` | Mesure de la place, barre repliable et tiroir, panneau de détail, filtres, chemin d'étapes, raccourcis. Le même script pour les trois écrans |
| `Application.jsx` | React : `Application` (écran liste), `Coquille`, `TeteEcran`, `Touche` |
| `Fiche.jsx` | React : `Fiche`, `FaitsCles`, `Etapes`, `Historique`, `Colonnes` |
| `TableauDeBord.jsx` | React : `TableauDeBord`, `Chiffres`, `Panneau`, `Repartition`, `Enregistrements` |

`tools/kit.py` pose les trois pages : `index.html` (la liste), `fiche.html`, `tableau-de-bord.html`. Supprime celles que le projet n'a pas, et leurs liens dans la barre latérale des autres.

Composants utilisés : bouton, champ, etat-vide, modale sur les trois écrans ; selection, case-a-cocher, tableau sur la liste ; onglets sur la fiche. Chaque page ne charge que les siens. Le tableau porte `data-k-rownav` : ses lignes se parcourent aux flèches.

## Les trois écrans

| Écran | Quand | Ce qu'il contient |
|---|---|---|
| Liste | chercher, trier, filtrer, cocher, ouvrir | tête d'écran, filtres, tableau, panneau de détail |
| Fiche | lire ou faire avancer **un** enregistrement | retour, tête, faits clés, chemin d'étapes, onglets, historique |
| Tableau de bord | voir où l'on en est en arrivant | tête, chiffres, panneaux (répartition, enregistrements qui attendent, activité, état vide) |

La coquille (en-tête, barre latérale, aide des raccourcis) est la même partout ; la section en cours de la barre porte `aria-current="page"`. Sur la fiche, c'est la section de la liste d'où l'on vient.

## Écran liste : enchaînement des zones

| # | Zone | Forme |
|---|---|---|
| 1 | En-tête | Bouton de la barre latérale, nom de l'application, recherche (« / »), aide des raccourcis (« ? »). Collé en haut |
| 2 | Barre latérale | Sections de l'application, groupées sous un intitulé ; compteur facultatif ; la section en cours a un filet, un fond et une graisse |
| 3 | Tête d'écran (`title`) | Surtitre, titre, résumé chiffré annoncé (`role="status"`), **une seule** action principale |
| 4 | Filtres | Sélections libellées, « Effacer les filtres » |
| 5 | Liste (`grid`) | Un tableau triable, à lignes sélectionnables et parcourables ; son état vide dit pourquoi et quoi faire |
| 6 | Panneau de détail | Le titre de la ligne ouverte, ses faits, deux actions visibles au plus ; s'il en faut davantage (modifier, archiver, restaurer, supprimer), les rares vont derrière un `menu-deroulant` « Autres actions ». Modifier un enregistrement se fait **dans le panneau** (ses faits deviennent des champs, la liste reste visible), pas dans une modale. À côté de la liste s'il y a la place, par-dessus sinon |

Une seule action pleine par écran : celle de la tête d'écran. Dans le panneau de détail, les actions sont secondaires.

## Écran fiche

| # | Zone | Forme |
|---|---|---|
| 1 | Retour (`ap-back`) | Un lien vers la liste d'où l'on vient, avec son nom |
| 2 | Tête (`title`) | Surtitre (type et numéro de l'enregistrement), nom, **état en toutes lettres**, une action pleine ; les autres en `k-btn--secondary` dans `ap-head__actions` |
| 3 | Faits clés (`ap-keyfacts`) | Cinq faits au plus, lisibles sans ouvrir un onglet |
| 4 | Chemin d'étapes (`ap-steps`) | Une liste ordonnée ; le bouton fait avancer d'une étape |
| 5 | Onglets | Le reste, par parties de même niveau : détails (`ap-cols` : deux groupes de faits côte à côte), historique (`ap-timeline`), une partie vide montre un état vide |

Chemin d'étapes : une étape faite porte `data-k-step="done"` (coche **et** mot), l'étape en cours `aria-current="step"` (point plein, filet, fond, graisse **et** mot), une étape à venir un rond vide et son mot. L'état s'écrit toujours dans `ap-steps__state`. `[data-ap-step-next]` fait avancer : il réécrit son libellé d'après son modèle (`data-ap-step-next="Passer à « {nom} »"`), annonce l'étape (`[data-ap-step-status]`, `role="status"`) et émet `k-app:step` sur `.ap` (`detail.index`, `detail.name`). À la dernière étape il passe en `aria-disabled="true"` avec le libellé de `data-ap-step-end` : il garde le focus et ne fait plus rien. Les mots écrits à l'avancement viennent de `data-ap-done` et `data-ap-now` sur la liste.

Ce que la fiche ne fait pas : enregistrer. Écouter `k-app:step` pour envoyer le changement ; en cas d'échec, remettre l'étape et le dire (composant `notification`).

## Écran tableau de bord

| # | Zone | Forme |
|---|---|---|
| 1 | Tête (`title`) | La période, la date des chiffres, la même action principale que la liste |
| 2 | Chiffres (`ap-stats`) | Quatre au plus : ce que le nombre compte, le nombre, sa précision en toutes lettres |
| 3 | Panneaux (`ap-panels` > `ap-panel`) | Chacun répond à une question et mène à la liste ou à une fiche |

Pièces d'un panneau : `ap-bars` (répartition : chaque ligne écrit son nom et son nombre, la barre ne fait que les montrer, sa longueur vient de `style="--_v: 0.667"`, de 0 à 1) ; `ap-rows` (courte liste d'enregistrements, le nom est le lien vers la fiche) ; `ap-timeline` (activité, dates écrites) ; un état vide `k-empty--plain` quand le panneau n'a rien à montrer ; `ap-panel__note` pour un total ou un lien vers la liste.

Règles : un chiffre n'est jamais seul (libellé et précision) ; une évolution se dit par des mots (« 2 de plus que la semaine dernière »), pas par une couleur ou une flèche seule ; pas de graphique dessiné en CSS au-delà de ces barres. Le tableau de bord ne remplace pas la liste : il y mène.

## Emplacements

| Emplacement | Où | Parts |
|---|---|---|
| `frame`, `backdrop` | Tout l'écran | — |
| `title` | Tête d'écran | `kicker`, `title`, `lead`, `action` |
| `grid` | La liste (écran liste seulement) | — |

Pas d'emplacement `hero`, `media`, `chapter` ni `finale` : un outil n'a pas de premier écran à signer. Sous un skill expressif, seuls le cadre (`frame`) et le titre de l'écran (`title`) peuvent recevoir un gabarit ; la liste et le panneau de détail restent toujours neutres, pour rester lisibles.

## Place et repli : mesurés, sans point de rupture

`application.js` compare la largeur de la coquille à deux repères écrits en rôles, et pose :

| Attribut sur `.ap` | Quand | Effet |
|---|---|---|
| `data-k-narrow` | la barre ne tient plus à côté du contenu | la barre devient un tiroir, ouvert par le bouton de l'en-tête (`data-k-drawer`) |
| `data-k-side="min"` | l'utilisateur replie la barre (bouton ou « [ ») | icônes seules ; chaque lien garde son nom (lu, et en info-bulle) |
| `data-k-detail="side"` ou `"over"` | selon la place à côté de la liste | panneau collé à droite de la liste, ou posé par-dessus le bord droit |

Sans script : barre ouverte, panneau de détail sous la liste, tout est lisible.

## Comportement mobile

La barre latérale est un tiroir. La recherche passe sous le nom. Les filtres s'empilent. Le tableau défile de côté dans sa zone (elle est focalisable). Le panneau de détail prend toute la largeur. Sur la fiche, les faits clés passent sur deux colonnes, les étapes s'empilent par deux, les groupes de faits l'un sous l'autre. Sur le tableau de bord, chiffres et panneaux s'empilent. Rien n'est masqué.

## Clavier

Tab : lien d'évitement → bouton de la barre → nom → recherche → raccourcis → barre latérale → action de l'écran → filtres → tableau (case d'en-tête, en-têtes triables, **une** ligne) → panneau de détail.

| Touche | Effet |
|---|---|
| `/` | va à la recherche ; `Entrée` y conduit à la première ligne |
| `↑` `↓`, `Début`, `Fin` | changent de ligne |
| `Espace` | coche la ligne |
| `Entrée` | ouvre le détail de la ligne ; le focus va à son titre |
| `Échap` | ferme le tiroir, sinon le panneau de détail ; le focus revient à la ligne |
| `[` | replie ou ouvre la barre latérale |
| `?` | ouvre l'aide des raccourcis (une modale) |

Les raccourcis à une touche ne s'appliquent pas dans un champ.

Fiche : Tab va du retour aux actions de la tête, au bouton des étapes, puis aux onglets (`←` `→`, `Début`, `Fin`) et au panneau. Tableau de bord : Tab va de lien en lien dans les panneaux. Sur ces deux écrans, `Entrée` dans la recherche mène à la liste, filtrée (`?q=…`, lu par la liste à l'ouverture) : le formulaire de recherche porte l'adresse de la liste dans `action`.

## États

| État | Rendu |
|---|---|
| Ligne en cours de tabulation | contour de focus dans la ligne |
| Ligne cochée | fond, filet épais et case cochée (`aria-selected`) |
| Ligne ouverte | fond et nom en gras souligné (`aria-current="true"`) |
| Aucun résultat | état vide dans le tableau : pourquoi, et « Effacer les filtres » |
| Résumé | « 5 réservations affichées sur 8 », réécrit et annoncé à chaque filtre |
| Barre repliée, tiroir ouvert | `aria-expanded` sur le bouton ; le tiroir fermé est `inert` |
| Étape faite, en cours, à venir (fiche) | coche, point plein ou rond vide, et toujours le mot |
| Dernière étape atteinte (fiche) | le bouton reste atteignable, `aria-disabled`, et le dit |
| Onglet ou panneau sans contenu | un état vide qui dit pourquoi, jamais un blanc |
| Chargement, erreur | à poser dans la liste ou dans un panneau avec les composants `chargement` et `etat-vide` (variante `error`) : non montrés dans l'exemple |

## Exemple HTML

```html
<div class="k-page ap">
  <div class="k-page__top"><header class="ap-top">
    <button type="button" class="k-btn k-btn--ghost k-btn--icon" data-ap-side aria-expanded="true" aria-controls="ap-side" aria-label="Barre latérale">…</button>
    <a class="ap-brand" href="/">Cordée Brume · guides</a>
    <form class="k-field ap-search" role="search">…<input class="k-field__control" type="search" data-ap-search>…</form>
  </header></div>
  <div class="ap-body">
    <nav class="ap-side" id="ap-side" aria-label="Sections">…<a class="ap-side__link" href="/reservations" aria-current="page" title="Réservations">…</a></nav>
    <main id="contenu" class="ap-main" tabindex="-1">
      <header data-k-slot="title" class="ap-head">…<p class="ap-head__sum" role="status" data-ap-sum="{n} réservations affichées sur {total}"></p>…</header>
      <div class="ap-tools">…<select data-ap-filter="etat">…</select>…</div>
      <div class="ap-work">
        <section data-k-slot="grid" class="ap-list"><div class="k-table" data-k-rownav>… <tr data-etat="payee">…</tr> …</div></section>
        <aside class="ap-detail" hidden><h2 class="ap-detail__title" tabindex="-1"></h2><dl class="k-facts" data-ap-facts></dl></aside>
      </div>
    </main>
  </div>
</div>
```

Le panneau se remplit seul d'après la ligne ouverte : son en-tête de ligne devient le titre, ses autres cellules une liste de faits. Pour un contenu plus riche, écouter `k-app:open` (`detail.row`) et écrire le panneau soi-même.

## Exemple React

```jsx
<Application marque={{ libelle: 'Cordée Brume · guides', href: '/' }} sections={sections}
  recherche={{ libelle: 'Chercher une réservation', exemple: 'Un nom, une sortie…', valeur: q, surChangement: setQ }}
  entete={{ surtitre: 'Hiver 2027', titre: 'Réservations', resume: `${lignes.length} réservations affichées sur ${toutes.length}`, action: { libelle: 'Nouvelle réservation', surClic: creer } }}
  outils={<><Selection libelle="Sortie" vide="Toutes les sorties" options={sorties} valeur={sortie} surChangement={setSortie} /></>}
  detail={ouverte && { titre: ouverte.nom, sousTitre: 'Réservation', contenu: <Faits faits={faitsDe(ouverte)} /> }} surFermerDetail={() => setOuverte(null)}>
  <Tableau legende="Réservations de l'hiver" colonnes={colonnes} lignes={lignes} selectionnable surOuvrir={setOuverte} ouverte={ouverte?.id}
    vide={{ titre: 'Aucune réservation ne correspond', texte: 'Élargissez les filtres ou effacez la recherche.' }} />
</Application>
```

En React, le filtrage et le contenu du panneau sont à la charge de la page : `Application` fournit la coquille, la mesure, le focus et les raccourcis.

```jsx
<Fiche marque={marque} sections={sections} recherche={{ …, surValider: () => allerALaListe(q) }}
  retour={{ libelle: 'Réservations', href: '/reservations' }}
  entete={{ surtitre: 'Réservation R-2027-014', titre: 'Agathe Morel', resume: 'Payée le 12 janvier 2027.', action: { libelle: 'Envoyer la convocation', surClic: envoyer } }}
  secondaires={<Bouton variante="secondary">Modifier</Bouton>}
  faits={[{ terme: 'Sortie', valeur: 'Bivouac' }, { terme: 'Montant', valeur: '360 €' }]}
  etapes={{ etapes: [{ nom: 'Demande reçue', etat: 'faite le 4 janvier' }, { nom: 'Solde payé', etat: 'en cours' }], courante: 1, surAvancer: avancer, annonce }}
  onglets={[{ id: 'details', libelle: 'Détails', contenu: <Colonnes groupes={groupes} /> }, { id: 'historique', libelle: 'Historique', compte: 4, contenu: <Historique evenements={evenements} /> }]} />

<TableauDeBord marque={marque} sections={sections} recherche={recherche}
  entete={{ surtitre: 'Hiver 2027', titre: 'Tableau de bord', resume: 'Chiffres arrêtés au 4 février 2027, 8 h.' }}
  chiffres={[{ libelle: 'Encaissé', valeur: '1 720 €', note: '5 réservations payées' }]}>
  <Panneau titre="Réservations par sortie"><Repartition lignes={[{ nom: 'Bivouac', valeur: 3 }, { nom: 'Igloo', valeur: 2 }]} /></Panneau>
  <Panneau titre="Paiements en attente" note="Total : 740 €."><Enregistrements lignes={[{ nom: 'Camille Roux', href: '/reservations/12', faits: 'Raquettes · 260 €' }]} /></Panneau>
</TableauDeBord>
```

`Fiche` et `TableauDeBord` reprennent `Coquille` : mêmes props `marque`, `sections`, `recherche`, `emplacements`. Les étapes sont pilotées : la page tient `courante`, écrit l'état de chaque étape et la phrase annoncée.

## Brancher ses données et ses gestes

**Une seule vue : sans barre latérale.** Retire de la page `#ap-side` et le bouton `data-ap-side` ; la touche `[` ne fait alors plus rien, et la ligne correspondante sort de l'aide des raccourcis.

**Confirmer un geste sans cacher le détail.** Une `notification` s'affiche en bas à droite, **sur le panneau de détail** : pour un message qui doit rester avec son bouton « Annuler » (étape changée, affaire archivée), écris-le dans la page (`role="status"`, au-dessus de la liste et dans le panneau) plutôt que dans une notification.

Ce que `application.js` et `tableau.js` font, pour ne pas avoir à les ouvrir :

| Besoin | Comment |
|---|---|
| Un filtre qui a une valeur au départ (« affaires ouvertes ») | donner `selected` à l'option : le filtre s'applique au chargement. Une ligne passe si son `data-<nom>` vaut la valeur de la sélection |
| Un filtre à plusieurs valeurs (ouvertes = trois étapes) | poser sur chaque ligne un second attribut (`data-avancement="ouverte"`) et filtrer dessus |
| « Effacer les filtres » | `[data-ap-reset]` remet **toutes** les sélections et la recherche à vide. Pour revenir à une valeur de départ, écouter le clic, reposer la valeur, puis appeler `Kobo.app.filter(ap)` |
| Le résumé au singulier | `data-ap-sum-one="{n} réservation affichée sur {total}"` à côté de `data-ap-sum` : il sert quand une seule ligne reste |
| Chercher un mot qui n'est pas dans les cellules | `data-ap-keywords="débutant cours encadré"` sur la ligne : la recherche lit le texte de la ligne **et** cet attribut |
| Refiltrer après un changement fait par script | `Kobo.app.filter(document.querySelector('.ap'))` : lignes masquées, état vide, résumé |
| Ajouter une ligne | l'insérer dans `<tbody>`, puis `Kobo.app.filter(ap)` ; pour la ranger à sa place, `Kobo.table.sort(tableau, th, 'ascending')` sur l'en-tête trié |
| Trier par script | `Kobo.table.sort(racineDuTableau, th, 'ascending' ou 'descending')` |
| Écrire soi-même le panneau de détail | écouter `k-app:open` sur `.ap` (`detail.row`) et remplir `.ap-detail` : l'événement part **après** le remplissage automatique, ce que tu écris reste ; `Kobo.app.close(ap)` le ferme |
| Densité (clear-ledger-desk) | poser ou retirer `data-density="compact"` sur `<html>` ; un interrupteur dans les filtres suffit. La mémoriser est à la charge de la page |
| Des lignes sans case à cocher | retirer la colonne `k-table__check` (en-tête et lignes), la barre `k-table__bar` et `case-a-cocher` des fichiers chargés ; `Espace` ne fait alors rien |
| L'action ne vaut que pour la ligne ouverte (réserver **ce** créneau) | le bouton plein va dans le panneau de détail, et la tête d'écran n'en a pas : toujours un seul bouton plein à l'écran |
| Un tableau trop large pour un téléphone | il défile de côté dans sa zone, c'est prévu. Réduire le nombre de colonnes plutôt que raccourcir les données : deux colonnes se replient en une avec `k-table__sub` (seconde ligne d'une cellule, voir le README du tableau). Si une cellule est quand même abrégée, le mot entier va dans le panneau de détail et dans `data-ap-keywords` |
| Faire avancer une étape par script (fiche) | `Kobo.app.step(ap, true)` ; écouter `k-app:step` pour enregistrer |
| Une répartition (tableau de bord) | écrire le nombre dans `ap-bars__value` et la part dans `style="--_v: …"` (valeur ÷ la plus grande valeur) |
| Un écran en moins | supprimer sa page et son lien dans la barre latérale des autres |
| Le script du projet | `site.js`, chargé après ceux du kit |

`data-k-intensity` reste sur `<html>` : sous clear-ledger-desk il ne change rien (aucun mouvement de signature).

## Limites

- Trois écrans de départ, pas plus : pas d'écran de formulaire de création (la modale suffit pour une saisie courte), de réglages ni de connexion.
- Le tableau de bord n'a pas de graphique (courbe, camembert) : des chiffres écrits et des barres de répartition.
- `check_studio.py` signale les chiffres du tableau de bord par une ALERTE « éléments de même forme côte à côte » : ce ne sont pas des cartes, la ligne se justifie à la livraison.
- Aucune donnée n'est enregistrée ni chargée : les pages sont statiques, le changement d'étape ne survit pas au rechargement.
- Pas de densité dans la structure elle-même : c'est le skill qui la porte (clear-ledger-desk : `data-density="compact"`).
- Le tableau n'est pas virtualisé : au-delà de quelques centaines de lignes, paginer (composant `pagination`).
- Essayée dans Chrome, à 1440 et 390 px, au clavier, en HTML et en React. La liste : sous les 24 skills en HTML. La fiche et le tableau de bord : sous clear-ledger-desk, sticker-brutal-jp, tiny-planet-toy et nocturne-architecture seulement. Pas au doigt, pas avec un lecteur d'écran.
- Sous un skill à mot géant (nocturne-architecture), le surtitre d'une fiche est trop long pour servir de mot : poser `data-k-word` sur le `<h1>` (React : `entete.mot`).
