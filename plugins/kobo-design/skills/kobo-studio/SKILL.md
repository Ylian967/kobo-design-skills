---
name: kobo-studio
description: Chef d'atelier Kōbō pour lancer un projet de site ou d'interface, ou reprendre un site existant, de la demande à la livraison vérifiée. À utiliser quand on demande « fais-moi un site », « une landing pour… », « un site vitrine », « lance un projet d'interface », « refais / reprends / modernise ce site existant », « migre ce site vers un style Kōbō », ou toute demande de site sans style imposé. Mène une courte interview, écrit d'abord le plan de parcours (qui utilise le site, pour quelles tâches, écran par écran), propose ensuite 2 ou 3 skills de style choisis selon le public, l'ambiance et les images, attend la validation, construit avec une seule direction artistique et une UX commune (structures de page, composants, gabarits), puis vérifie par script, captures 390 / 1440 px, grille anti-slop et parcours joués dans le navigateur. HTML ou React.
---

# kobo-studio

Tu conduis un projet de site du premier message à la livraison. Les 24 skills de style donnent l'**apparence** ; ce skill donne la **méthode**, la structure des pages, les composants et la vérification.

**L'ordre ne se discute pas : les personnes, leurs tâches, leurs parcours ; ensuite seulement l'apparence.** Un projet ne part jamais d'un registre ni d'une liste de composants.

## Règles fixes

1. **L'UI vient d'un seul skill.** Une page charge une seule fiche (`contract/maps/<id>.css`). Jamais deux styles mélangés.
2. **L'UX est composée.** La structure de la page, les composants et les états viennent de ce skill (`ux/`, `components/`), pas du skill de style. On ne réinvente ni une barre de navigation ni un formulaire.
3. **Contenu réel.** Les textes, prix, horaires, noms viennent du client. Rien de la démonstration ne reste. Pas de faux avis, de faux logos, de chiffres sans source. Ce que tu as dû inventer est **dit** à la livraison.
4. **De vraies images.** Les photos du client d'abord ; à défaut de vraies photos d'une banque libre, signalées « à remplacer ». Jamais de dessin CSS ou SVG à la place d'une photo.
5. **Aucun contenu masqué.** Texte, légende, action et photo restent affichés à toutes les largeurs. On déplace, on ne cache pas.
6. **Un état n'est jamais signalé par la couleur seule** : toujours un mot, une icône, une graisse ou un filet en plus.
7. **On ne contourne jamais un contrôle.** Ne retire, ne masque ni ne dégrade aucun contenu (lien, texte, image, fonction) pour faire passer `check_studio.py` ou la grille. Si un contrôle échoue et que la capture montre un faux positif, laisse la page telle quelle et signale-le à la livraison (ligne du script, ce que montre la capture). Le script peut avoir tort ; la page ne paie pas pour lui.
8. **La signature ne s'arrête pas au héros.** Tous les gabarits que le catalogue donne au skill hors du héros sont posés : au moins deux autres emplacements quand le skill en a deux ou plus. Quand il en a moins, on le **dit** au client, à la proposition et à la livraison.
9. **Performance.** On ne charge que les fichiers dont la page a besoin ; images dimensionnées et différées ; rien ne bloque ni ne confisque le défilement ; la 3D ne se charge qu'après la page.
10. **Le niveau de la démo.** Une page livrée doit tenir à côté de la démo du skill (`../<id>/examples/demo.html`) : son **mouvement signature** est là (couche mouvement chargée, intensité `full` sauf choix du client), sa **mise en page ose** comme la démo (pas une suite de blocs sages sur un fond uni), et les **gabarits de signature** vont au-delà du héros. On le vérifie en posant la page à côté de la démo (étape e). En dessous : on continue, on ne livre pas ; ce qui ne peut pas être rattrapé se dit au client comme une limite, pas comme un détail.
11. **Les parcours d'abord.** Aucun skill n'est proposé, aucun fichier n'est écrit avant le plan de parcours (`ux/methode.md`) : un à trois profils, leurs tâches, chaque parcours écran par écran avec ses états et son objectif d'étapes. Chaque profil a un chemin qu'il peut finir, y compris celui qui n'a pas de compte ; tout ce qui se fait se défait ; **aucune fonction sans tâche** (recherche, filtres, raccourcis clavier, barre latérale, tableau de bord ne s'ajoutent que si une tâche du plan les demande).
12. **Un parcours non joué n'est pas vérifié.** Avant de livrer, chaque tâche du plan est jouée dans le navigateur, au doigt à 390 px et au clavier à 1440 px (`quality/ux-grille.md`). `check_studio.py` à 0 erreur ne dit rien des parcours. Verdict « à corriger » : on corrige, on ne livre pas.

## Ne lis que ce que l'étape demande

Ce dossier est gros. **N'ouvre pas** `audit/`, `quality/relecture-*.md`, `contract/README.md`, `components/README.md`, `ux/README.md`, `ux/templates/` ni les fichiers CSS / JS de la bibliothèque : tu n'en as pas besoin pour construire, et `tools/kit.py` branche tout pour toi. La liste des composants est dans `components/INDEX.md`.

| Étape | À lire | Seulement si |
|---|---|---|
| b. Interview | `interview.md` | toujours |
| c. Plan de parcours | `ux/methode.md`, puis dans `ux/patterns/domaines/` le `README.md` et **les seules fiches** des tâches du projet | toujours, **avant** le catalogue |
| c. Proposition | `catalogue.md`, puis `ux/structures/<structure>/README.md` de la structure retenue (une seule) | toujours |
| | `components/INDEX.md` : une ligne par composant (rôle, états, script, fichier React) | le plan a besoin d'une pièce que la structure ne fournit pas ; à relire en d avant d'ajouter un composant |
| d. Construction | `ux/patterns/formulaire.md` | la page a un formulaire que tu modifies |
| | `ux/patterns/etats-de-page.md` | la page charge des données |
| | `components/<nom>/README.md` | tu **utilises** ce composant : tu modifies son balisage, tu en ajoutes un exemplaire, tu t'appuies sur son script, ou tu l'ajoutes à la page. Seulement ceux-là : un composant de la page de départ que tu laisses tel quel (tu n'y changes que les textes) ne demande pas son README |
| | `brand.md` | le client a des couleurs de marque (à lire dès l'étape c, avant de proposer un skill) |
| | `reprise.md` | mode reprise |
| e. Vérification | `quality/anti-slop.md`, à partir de « Grille de relecture visuelle » | toujours |
| | `quality/ux-grille.md` | toujours : c'est elle qui rejoue les parcours |
| | `components/motion/README.md` | la page a une couche mouvement et tu ajoutes une section que tu veux voir bouger |

Le skill de style choisi se lit par sa fiche de `catalogue.md`. N'ouvre son `SKILL.md` (`../<id>/SKILL.md`) que si tu dois écrire une section que la page de départ ne contient pas.

## Le déroulé

Six étapes, dans l'ordre. Deux arrêts obligatoires : après les questions (b), après le plan de parcours et la proposition (c).

### a. Choisir le mode

- **Nouveau projet** : rien n'existe, ou seulement des textes et des photos.
- **Reprise** : un site existe (fichiers ou adresse) et doit être refait sans perdre son contenu. Lis `reprise.md` et suis-le : il remplace les étapes b à d ; e et f restent les mêmes.

Si la demande ne le dit pas, c'est la première question de l'interview.

### b. Interview

Lis `interview.md`. Le premier tour commence par **les personnes** : qui utilise le site, sur quel appareil, à quelle fréquence, pour faire quoi. La nature du projet (site ouvert au public, outil interne d'employés, ou les deux) se déduit de ces réponses, elle ne se demande pas en premier. Pose le **premier tour** en un seul message, puis **arrête-toi** et attends les réponses. Ne suppose pas à la place du client ; ne commence aucun fichier.

Le second tour se pose avec la proposition (étape c), une fois les skills candidats connus : il porte sur ce que ces skills exigent.

### c. Plan de parcours, puis proposition : 2 ou 3 skills et le plan UX

**D'abord le plan de parcours, sans ouvrir le catalogue.** Lis `ux/methode.md` et suis-la : profils, tâches, puis pour chaque tâche la fiche de domaine qui lui correspond (`ux/patterns/domaines/`), le parcours écran par écran, ses états (vide, erreur, succès, déconnecté) et son **objectif d'étapes** sur téléphone. Écris-le dans `<projet>/parcours.md` : il sera rejoué à l'étape e.

**Ensuite seulement** lis `catalogue.md` et choisis les skills (voir « Choisir l'UI » ci-dessous). Écris au client un seul message, qui **commence par le plan de parcours** (bloc de `ux/methode.md`, point 4), puis :

1. **La nature du projet** en une phrase, dite par son public : « un site pour des curieux et des membres, sur téléphone », « un outil interne pour six commerciaux ». Seul un **outil interne utilisé par des employés** (les quatre « oui » de `ux/patterns/domaines/outil-interne.md`) reçoit le skill `clear-ledger-desk` et la structure **application** ; présente-le alors seul, avec `/kobo-design:site-to-skill` comme seconde voie. Voir `interview.md`, « Nature du projet ».
2. **Deux ou trois skills**, chacun avec :
   - une raison tirée **du public, de l'ambiance voulue et des images disponibles** (pas une description du style, jamais le seul registre) ;
   - sa **limite honnête** : ce que le skill exige et que le client n'a peut-être pas (type de photo, 3D), ce que le gabarit ne reproduit pas, un contraste qui dépend de la photo ;
   - les gabarits de signature disponibles (colonne « Gabarits » du catalogue).
   Recommande-en un, et dis pourquoi.
3. **Le plan UX** :
   - la **structure** (une des cinq, tableau ci-dessous) et pourquoi. Lis son README **avant** d'écrire le plan : il donne les sections qu'elle fournit, celles que tu composeras toi-même se disent ;
   - les **sections dans l'ordre**, chacune avec la question du visiteur à laquelle elle répond et le contenu réel qui la remplit ;
   - l'**action principale**, la même du héros à la fin ;
   - les **emplacements** qui recevront un gabarit du skill (tableau « Gabarits par emplacement » du catalogue) : le héros, **et tous les autres** que le skill prévoit. Choisis la structure qui a ces emplacements (un gabarit de `chapter` ne se pose que dans un récit collant). Si le skill n'a de gabarit que pour le héros, écris-le : « sous le premier écran, le style tient par les couleurs, la typo et les composants, pas par une mise en page » ;
   - les **photos** nécessaires, et lesquelles manquent.
4. **Le second tour** de questions (`interview.md`), limité à ce qui bloque.

Puis **arrête-toi** et attends la validation. Le client valide **le plan de parcours et le skill** ; il peut changer l'un ou l'autre. S'il change une tâche, réécris son parcours et son objectif d'étapes avant de construire.

**Choisir l'UI.** Le skill se choisit dans cet ordre : le **public** (qui regarde, et dans quel état d'esprit : un grimpeur de vingt ans n'attend pas l'écran d'un comptable), l'**ambiance** que le client a dite en trois mots, les **images** qu'il a vraiment (ligne « Photos exigées » de chaque fiche). Le registre ne sert qu'à écarter : `clear-ledger-desk` est **réservé aux outils internes d'employés** et ne se propose jamais pour un public, même pour son espace connecté ; un skill expressif ne se propose jamais pour un outil interne.

**Projet mixte : un site public et un espace connecté** (page de présentation, adhésion, puis espace où les membres réservent ; boutique et compte client). C'est **un seul projet, un seul skill, une seule marque** :

- le skill est celui de la partie publique, choisi comme ci-dessus ;
- la partie publique est en intensité **`full`** ; les pages de l'espace connecté portent `data-k-intensity="reduced"` sur leur `<html>` (ou `off` si, sur capture, `reduced` gêne encore le geste répété) : mêmes couleurs, même typo, mêmes composants, sans le mouvement ni les grands gabarits qui gêneraient un geste répété chaque semaine ;
- l'espace connecté se construit avec les pages de la structure publique (page intérieure du `site-vitrine`, composants `carte`, `onglets`, `bouton-radio`, `modale`, `notification`) et la **même barre de navigation**. Il ne prend **pas** la structure `application` : elle est faite pour un employé à son bureau ;
- regarde sur capture que les pages en `reduced` ou `off` gardent la marque (ligne « Interface sobre » du catalogue) ; un skill qui ne tient pas sans son héros se dit au client à la proposition.

**Projet à deux natures : un outil interne et sa page de présentation** (un CRM avec une page qui le présente). Le client dit laquelle doit être réussie d'abord : elle donne le skill et la structure principale. L'autre partie prend une **seconde structure** : lis aussi son README (seule exception à « une seule »). Le projet garde un seul skill ; dis au client ce qu'il ne fera pas pour la seconde partie (`clear-ledger-desk` donne une page publique claire et sobre, pas une vitrine). À la construction : `kit.py … --structure <seconde> --prefixe public-`.

**Une page de plus dans la même structure** (connexion, mes réservations) : copie la page de départ qui s'en rapproche le plus (`page-interieure.html` pour un site vitrine), renomme-la, et garde ses balises `<link>` et `<script>`.

| Structure | À choisir quand | Dossier |
|---|---|---|
| Landing produit | une seule offre, un seul parcours, une demande au bout | `ux/structures/landing-produit/` |
| Site vitrine | plusieurs offres ou plusieurs pages : un accueil qui oriente, des pages qui renseignent | `ux/structures/site-vitrine/` |
| Récit collant | une histoire en chapitres, lue dans l'ordre | `ux/structures/recit-collant/` |
| Article | un texte long à lire d'une traite | `ux/structures/article/` |
| Application | **outil interne d'employés seulement** (CRM, back-office, ERP, administration) : on y cherche, trie, filtre et ouvre des enregistrements toute la journée, sur ordinateur. Jamais pour l'espace connecté d'un public. Trois écrans de départ : liste et détail, fiche d'un enregistrement, tableau de bord | `ux/structures/application/` |

### d. Construction

**1. Poser le kit.** Une commande copie dans le projet les seuls fichiers nécessaires (contrat, fiche du skill, composants de la structure, gabarits du skill) et écrit une page de départ déjà branchée :

```bash
python3 <kobo-studio>/tools/kit.py <projet> --skill <id> --structure <structure> [--composants modale,chargement] [--marque]
```

La commande dit si le skill a une **couche mouvement** (`components/motion/`) : elle est alors déjà branchée dans la page de départ (deux feuilles après la couche de signature, deux scripts avant `Kobo.templates.apply()`) ; ne la retire pas. Sans couche mouvement, seuls les gabarits et la couche de signature bougent : dis-le au client à l'étape c. Pour le savoir dès l'étape c : les skills qui ont une couche mouvement sont listés dans `catalogue.md` (« Couche mouvement »).

Résultat : `<projet>/kobo/` (**ne jamais le modifier**) et `<projet>/index.html` (plus `page-interieure.html` pour un site vitrine ; plus `fiche.html` et `tableau-de-bord.html` pour une application : supprime les écrans que le plan n'a pas, et leurs liens). La page charge un seul skill, la couche de signature en dernier, et pose les gabarits (`Kobo.templates.apply()`).

**2. Reprendre le README de la structure** (lu à l'étape c), et lui seul : ordre des sections, emplacements, états, clavier.

**3. Remplacer tout le contenu de démonstration** (« Cordée Brume ») par le contenu réel, section par section :

- Garde le balisage : classes `k-*`, `data-k-slot`, `data-k-part`, ancres, niveaux de titre. Un gabarit redispose les parts ; il ne réécrit pas le texte.
- Retire une section sans contenu réel plutôt que de la remplir. Si tu retires la dernière section qui se servait d'un composant ou du script de la structure (formulaire, onglets, notification), retire aussi ses balises `<link>` et `<script>` : la page ne charge que ce qu'elle utilise.
- Une section que la structure n'a pas (tarifs, horaires, galerie, accès) se compose avec les briques ci-dessous, sans lire le CSS.
- Le titre du héros reste court : huit mots au plus. Plusieurs gabarits le redécoupent (lignes, moitiés, mot géant) et un titre long les casse. Regarde le héros sur capture avant de tenir le titre pour acquis ; si tu dois le raccourcir après validation, dis-le.
- **Mot géant** (nocturne-architecture : héros et titres de section) : c'est le nom du projet ou un mot-clé **choisi exprès**, jamais un mot pris automatiquement dans un titre. Pas d'article ni de mot vide (« lieu », pas « le »), trois lettres au moins, des mots de longueur voisine d'une section à l'autre (4 à 9 lettres) pour que les tailles se tiennent. Il vient du surtitre (`k-kicker`) de la section, ou de `data-k-word="…"` posé sur le titre ; pour le héros, du premier mot du nom dans la barre, ou de `data-k-word` sur le `<h1>`. Regarde-les sur capture : `check_studio.py` signale un mot de moins de trois lettres. Le héros de glass-frame-estate a aussi un mot géant, pris de la même façon : si le nom commence par un mot commun (« Atelier », « Cabinet », « Studio »), choisis le mot qui distingue avec `data-k-word` sur le `<h1>`.
- Le nom dans la barre : sur téléphone, un nom long passe sur deux lignes à côté du bouton Menu (il n'est pas tronqué). Deux ou trois mots tiennent sur une ligne ; regarde-le sur la capture à 390 px.
- Projet mixte : l'action principale est celle du profil **sans compte** sur les pages publiques (« Venir essayer »), celle du membre dans l'espace connecté (« Réserver un créneau ») ; une page qui est elle-même la destination de l'action n'a pas de dernière section qui y renvoie. Un compte de démonstration, s'il en faut un pour essayer une connexion simulée, est écrit sur la page de connexion et dit à la livraison sous « Inventé ».
- Une seule action dans le héros ; **la même** dans la barre et dans la dernière section de chaque page. Une autre suite (la page qui lève les doutes, un itinéraire) est un lien simple `k-link` à côté, jamais un second bouton.
- Titre de page, `lang`, textes alternatifs, pied de page : ce sont aussi du contenu.
- Les liens mènent quelque part : ancre de la page, page du site, `mailto:`, `tel:`. Jamais `href="#"`.
- Pas de formulaire dans le projet (l'action est un lien, un téléphone, un e-mail) : la dernière section garde son emplacement `finale` avec une phrase et le bouton d'action ; les dates à cocher et le formulaire de la landing se retirent avec leurs balises.
- Formulaire : l'envoi de la page de départ est simulé. Branche l'appel réel si le client a une destination ; sinon garde la simulation et **dis-le** à la livraison.

Briques de page (fournies par `page.css`, déjà chargé) :

| Besoin | Balisage |
|---|---|
| Une section, sa largeur | `<section class="k-section" aria-labelledby="…"><div class="k-wrap">…` ; variantes `k-section--alt` (fond de surface), `k-section--rule` (filet), `k-section--tight` ; `k-wrap--text` pour une colonne de lecture |
| Titre de section | `<header data-k-slot="title">` avec `<p class="k-kicker" data-k-part="kicker">`, `<h2 class="k-h2" data-k-part="title">`, `<p class="k-lead" data-k-part="lead">` |
| Empiler | `k-stack` (`k-stack--sm`, `k-stack--lg`) |
| Deux colonnes qui se replient | `k-split`, la colonne large en `k-split__main` |
| Texte courant, liens soulignés | `k-prose` ; un lien isolé : `k-link` ; une remarque : `k-note`. Un `k-link` fait une vingtaine de pixels de haut : **une étape d'un parcours** (« Mes réservations », « Annuler ») est un bouton (`k-btn`), pas un `k-link` |
| Liste de faits (horaires, prix, adresse) | `<dl class="k-facts"><div><dt>…</dt><dd>…</dd></div>…</dl>` |
| Liste d'éléments en colonnes | `<ul data-k-slot="grid">` avec des `<li data-k-part="item">` ; `k-grid__wide` pour un élément sur toute la largeur. Cartes : composant `carte`, seulement si chaque élément a une image et une destination, et l'une d'elles est mise en avant. Des prix, des formules, des horaires sont une liste de faits, pas une rangée de cartes identiques |
| Photo et légende | `<figure data-k-slot="media"><img …><figcaption>…</figcaption></figure>` |

Un composant en plus en cours de route : choisis-le dans `components/INDEX.md`, relance `kit.py` avec `--composants <nom>` (il affiche les balises à ajouter à la page), puis lis son README.

**Gabarits hors du héros.** `kit.py` charge toutes les familles du skill ; elles ne se posent que si la page a leur emplacement. Vérifie-le : `frame` et `backdrop` sont deux `<div>` vides en tête de la page de départ (ne les retire pas) ; `title` est chaque `<header data-k-slot="title">` de section ; `media` chaque `<figure data-k-slot="media">` ; `chapter` chaque chapitre d'un récit. Sur la capture, tu dois voir le gabarit à chacun de ces endroits ; sinon cherche l'emplacement manquant avant de livrer.

**4. Images.** Photos provisoires : de vraies photos d'une banque libre (Unsplash, ou Wikimedia Commons avec le crédit que sa licence demande), du type que le skill exige, téléchargées dans `images/` à une taille raisonnable (1600 px de large suffit pour un héros) ou appelées par leur adresse directe ; vérifie que chacune charge. Ces banques refusent souvent la recherche automatique : si tu n'obtiens rien, garde les photos que le client a déjà (reprise) ou demande-lui des adresses, et dis-le — ne dessine rien à la place. `<img>` avec `alt` qui décrit la photo, `width` et `height`, `loading="lazy"` sous le premier écran. Le sujet se donne par `data-k-focus="x% y%"` sur l'`<img>` du héros. Respecte le type de photo qu'exige le skill (catalogue) : sinon le gabarit rend moins bien, ou le texte posé dessus perd son contraste.

**5. Styles du projet.** S'il en faut, dans `<projet>/site.css`, dont le `<link>` se place juste avant celui de `components/signatures/<id>.css` (donc après la structure et les gabarits) : uniquement des rôles `--k-*` (couleurs, tailles, espaces `--k-space-*`, durées). Aucune valeur en dur (zéro est admis), aucun `--k-sig-*`, aucune ombre, aucun dégradé, aucun point de rupture : les colonnes se replient seules (`flex-wrap`, `auto-fit`). Une largeur se donne par `--k-measure`, `--k-container` ou un multiple d'un pas d'espace (`calc(var(--k-space-32) * 2)`) ; l'échelle a les pas 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, pas d'autre. La liste des rôles : `kobo/kobo-studio/contract/roles.css` (à consulter par recherche, pas à lire en entier).

**6. Intensité.** `data-k-intensity` sur `<html>` : `full` (tout le skill), `reduced` (formes sans mouvement), `off` (interface sobre aux couleurs du skill, gabarits non posés). Suis le choix du client.

**7. Couleurs de marque** : `brand.md`. Lis-le dès l'étape c si le client annonce des couleurs : il dit quels skills les acceptent, et ce que chaque couleur peut porter.

**React.** `kit.py … --react` copie le kit dans `src/kobo/` (versions `.jsx` comprises) et écrit le socle Vite s'il manque : `package.json`, `vite.config.js` (`base: './'`, une entrée par page `.html` de la racine), `index.html` (`lang`, `data-k-skill`, `data-k-intensity`) et `src/main.jsx` avec les imports dans l'ordre. Une page de plus = un fichier `.html` à la racine et son point d'entrée dans `src/`. Images dans `public/images/`. Les props de la structure sont dans son README (« Exemple React ») et en tête de son `.jsx` ; une image accepte `ratio` (cadrage, par exemple `'3 / 4'` pour un portrait), `largeur`, `hauteur` et `sujet`. Une page de plus se crée à la main (copie d'`index.html`, autre point d'entrée) ; les imports de styles se partagent dans un module commun. Si le composant de la structure impose une section sans objet (la recherche de l'accueil pour quatre éléments), compose ta page avec ses pièces (`Page`, `Emplacement`, `TitreSection`, `Image`, `Finale`, `Carte`…) : c'est permis, tant que le balisage et les classes restent ceux du kit. **Gabarits en React** : `kit.py … --react` écrit leurs imports ; passe `emplacements={gabarits('<id>')}` à la structure (ou à `Page` et `Emplacement` si tu composes avec les pièces). Seuls le héros photo et l'objet 3D sont essayés en React. **Limite à dire au client dès l'étape c** : les autres gabarits (cadre de page, titres géants, images, chapitres, fond de scène) restent neutres en React ; quand le contenu du héros change, le gabarit est reposé et son entrée rejoue.

### e. Vérification

```bash
python3 <kobo-studio>/tools/check_studio.py <projet>          # React : npm run build d'abord
```

Le script vérifie la bibliothèque, les fichiers du projet (valeurs en dur, reste de démonstration, un seul skill, structure), puis ouvre chaque page à 1440 et 390 px : contenu masqué, texte sous 12 px, débordement, images cassées, et **contraste mesuré sur capture** avec les vraies images. Il écrit `captures/<page>-1440.png` et `-390.png`.

1. Corrige chaque ligne `✗`, relance, jusqu'à 0 erreur — sans jamais appauvrir la page pour y arriver (règle 7). Une ligne `ALERTE` n'est pas une erreur : elle demande un regard (une série d'éléments identiques côte à côte devient une liste, ou reçoit un élément mis en avant ; ou tu justifies). Un contraste en échec sur une photo se corrige par la photo (cadrage `data-k-focus`, autre photo plus calme sous le texte) ou par un texte plus court ; jamais en modifiant `kobo/`.
2. **Regarde les deux captures** (ouvre les images). Le script ne voit pas une mise en page laide.
3. Remplis la grille de `quality/anti-slop.md` (« Grille de relecture visuelle ») sur ces captures. Une case non cochée se corrige ou se justifie (skill + règle). Outil interne : les cases du héros, des photos et des cartes sont sans objet, dis-le ; celles des états, du clavier, du contenu et de la largeur de 390 px s'appliquent toutes.
4. **Pose la page à côté de la démo du skill** (règle 10) :

   ```bash
   python3 <kobo-studio>/tools/compare.py <projet> [--page index.html] [--largeur 390]
   ```

   Le script écrit `captures/comparaison-<page>-1440.png` : six instants de la page (entrée, puis défilement) au-dessus des six mêmes instants de la démo. Ouvre la planche et réponds à trois questions. Quelque chose **bouge**-t-il à l'entrée et au défilement, comme dans la démo ? La **mise en page** a-t-elle la tenue de la démo : fonds qui alternent, images qui prennent de la place, titres qui pèsent ? La **signature** se voit-elle sous le premier écran ? Donne un verdict : **au niveau** ou **en dessous**. En dessous, corrige (gabarits manquants, sections `k-section--alt`, images plus grandes, emplacements `title` et `media` posés) et relance. La planche est une simulation image par image : elle ne dit rien de la fluidité.
5. Essaie ce que le script ne fait pas sur les pages elles-mêmes : formulaire envoyé vide, menu au clavier, Échap. Avec une couche mouvement : parcours la page **à la touche Tab seulement** (chaque élément atteint doit être visible), puis passe `data-k-intensity` à `reduced` et à `off` (tout doit être affiché, immobile). Pour ouvrir la page toi-même, sers le dossier (`python3 -m http.server <port libre>` depuis le projet) plutôt que `file://`.
6. **Joue les parcours : `quality/ux-grille.md`.** Chaque tâche de `parcours.md` est jouée en vrai dans un navigateur piloté, de son point d'entrée à son état de succès : à **390 px au doigt simulé**, puis à **1440 px au clavier seul**, en comptant les étapes face à l'objectif du plan ; puis la tâche inverse et les états vide, erreur, déconnecté. Remplis le tableau des tâches jouées, la grille des dix heuristiques de Nielsen et des règles mobile **avec une preuve par ligne**, et la liste des erreurs du domaine. Donne le verdict : **parcours OK** ou **à corriger**. À corriger : corrige, rejoue, et ne livre qu'ensuite. Les points 1 à 5 ne remplacent pas celui-ci : une page sans erreur peut n'offrir aucun chemin.

**Sans navigateur.** Si le script ne trouve pas de navigateur, ou si celui-ci ne rend rien, il fait quand même les contrôles par script (bibliothèque, fichiers du projet, contrastes de `brand.css`) et termine par « VÉRIFICATION VISUELLE NON FAITE » (code de sortie 2). Dans ce cas :

- corrige les erreurs que le script a trouvées : elles comptent toujours ;
- ne remplace pas les captures par une lecture du code : tu ne peux ni remplir la grille anti-slop, ni dire qu'un contraste tient sur la page, ni dire que le clavier marche ;
- si tu trouves un autre moyen de voir la page (un autre navigateur, `KOBO_CHROME`), dis lequel et à quelle largeur réelle : une capture à 500 px n'est pas une vérification à 390 px ;
- à la livraison, recopie sous **Mesuré** la phrase que le script donne, et n'écris « vérifié » pour rien de ce qui se voit.

### f. Livraison

Un message court au client :

- ce qui est livré (pages, dossier, comment l'ouvrir) ;
- le skill, la structure, l'intensité (par partie, pour un projet mixte) ;
- **Parcours** : le **tableau des tâches jouées** de `quality/ux-grille.md`, recopié en entier (tâche, entrée, étapes à 390 px face à l'objectif, plus petite cible, étapes au clavier à 1440 px, retours et états joués, résultat), puis le verdict. Sans ce tableau, la livraison n'est pas faite. Si les parcours n'ont pas été joués : « PARCOURS NON JOUÉS » en première ligne du message ;
- **Mesuré** : résultat de `check_studio.py` (erreurs, pire contraste à 1440 et 390 px), ce que tu as essayé à la main. Si la vérification visuelle n'a pas été faite, c'est la **première ligne** du message, avant ce qui est livré ;
- **Estimé** : ce que tu as jugé à l'œil sur les captures (grille anti-slop), sans mesure, et le **verdict face à la démo** (« au niveau » ou « en dessous », avec ce qui manque) ;
- **Inventé** : tout texte, chiffre, photo ou comportement qui ne vient pas du client (photos de banque à remplacer, envoi de formulaire simulé, horaires supposés…). « Signalé à remplacer » veut dire : dit au client, ici. Sur la page, une mention visible ne se justifie que si la photo provisoire peut tromper le visiteur (elle prétend montrer le lieu, l'équipe ou les produits) ;
- les **faux positifs** laissés en l'état (règle 7), et les **alertes** du script non suivies, avec la raison ;
- la **signature hors du héros** : les emplacements qui portent un gabarit, ou la phrase qui dit qu'il n'y en a pas (règle 8) ;
- ce qui reste à faire, et les limites du skill qui se voient dans le résultat.

Ne dis pas « vérifié » pour ce qui est seulement estimé.

## Organisation d'un projet

```
<projet>/
  parcours.md           le plan de parcours validé (ux/methode.md) : rejoué à la vérification
  index.html            la ou les pages
  site.css              styles du projet (facultatif, rôles --k-* seulement)
  site.js               script du projet (facultatif : données d'exemple, formulaire simulé), chargé après ceux du kit
  brand.css             couleurs de marque (facultatif)
  images/               photos du client
  kobo/                 le kit, posé par tools/kit.py — ne pas modifier
  captures/             écrites par tools/check_studio.py ; captures/parcours/ : preuves des tâches jouées
```

## Quand rien ne convient

- Aucun skill ne colle à l'ambiance voulue : propose `/kobo-design:site-to-skill <adresse>` pour créer un style à partir d'un site que le client aime, ou `/kobo-design:site-to-skill` avec le type de projet pour qu'il propose dix références au plus et laisse choisir. Le skill créé arrive avec sa fiche de correspondance et sa couche de signature : reviens ici ensuite.
- Outil interne d'employés : skill `clear-ledger-desk` et structure `application` ; pour une autre allure, `site-to-skill` (références sobres : tableaux denses, filtres, raccourcis). Voir `interview.md`, « Nature du projet ».
- Un parcours du plan n'a pas de fiche dans `ux/patterns/domaines/` : écris-le quand même écran par écran avec la méthode, appuie-toi sur les dix heuristiques, et dis au client qu'aucun parcours type ne l'encadre.
- Une pièce manque (composant, structure) : dis-le au lieu de l'improviser ; propose la forme la plus proche qui existe.
