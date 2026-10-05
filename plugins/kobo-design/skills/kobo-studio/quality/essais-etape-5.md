# Essais réels de l'étape 5

Trois sous-agents qui ne connaissaient rien de ce travail ont reçu le chemin de `SKILL.md`, une demande d'une ligne et un dossier de sortie. Les réponses du client ont été jouées à la main, tour par tour. Chaque agent a rendu, après la livraison, un journal : fichiers lus, endroits où le skill guide, endroits où il s'est perdu, commandes en échec.

Les captures complètes sont dans `examples/<nom>/captures/` (dossier ignoré par git) ; une planche réduite de chaque essai, 1440 px à gauche et 390 px à droite, est dans `essais-etape-5/`.

Ce que ces essais ne prouvent pas : un seul passage par demande, un seul client joué (coopératif, réponses complètes), Chrome seulement, et un juge qui est aussi l'auteur du skill.

## Vue d'ensemble

| Essai | Skill retenu | Structure | Fichiers du skill lus | Lectures hors consigne | `check_studio.py` final | Pire contraste |
|---|---|---|---|---|---|---|
| Festival à Lyon (expressif) | hold-to-play-music | landing produit | 5 + la page de départ | 3 recherches dans le CSS du kit, 1 dans `check_studio.py` | 0 erreur | 5,48:1 |
| Restaurant en React (produit) | serif-bistro-green | site vitrine, 2 pages | 4 + les `.jsx` du kit | `check_studio.py` (3 fonctions), 1 recherche dans `page.css` | 0 erreur | 4,62:1 |
| Reprise d'un site (reprise) | serif-bistro-green | landing produit | 7 | 2 recherches dans le CSS, l'en-tête d'un gabarit, `measure()` et la sonde | 0 erreur | 4,62:1 |
| CRM d'une PME (fonctionnel, essai 4) | clear-ledger-desk | application | 11, dont 5 README de composants | `application.js`, `tableau.js`, un `ls` des composants | 0 erreur | 4,51:1 |
| Cabinet d'architectes (produit, marque imposée, essai 5) | glass-frame-estate | site vitrine, 2 pages | 6, dont `brand.md` | 2 extraits de `check_studio.py`, 4 recherches dans le kit | 0 erreur | 6,66:1 |
| Club d'escalade (deux registres, essai 6) | clear-ledger-desk | application, 2 pages | 12, dont `INDEX.md` et 6 README de composants | `kit.py --help`, recherches dans le CSS et les scripts du kit, 3 fonctions de `check_studio.py` | 0 erreur | 4,51:1 |

Les trois premiers agents ont respecté les deux arrêts, n'ont ouvert ni `audit/`, ni `quality/relecture-*`, ni les README généraux, et ont chargé un seul skill. Chacun a pourtant dû fouiller du CSS ou le vérificateur au moins une fois : c'est là que le skill manquait.

## 1. Landing pour un festival de musique électronique à Lyon

Client joué : « Nuits Basses », 4e édition, deux soirs, billetterie externe, pas de photos sous la main, public sur téléphone, « nocturne, brut, physique », pas de dégradé violet.

**Proposition.** Registre expressif. Trois skills : signal-orange-techwear (recommandé : sombre, orange, chemin court vers le billet), hold-to-play-music, hyper-lime-street, chacun avec une limite tirée du catalogue (le geste jamais essayé au doigt, le lime ni nocturne ni orange). Le client a choisi hold-to-play-music contre la recommandation.

**Où le skill a guidé.** Les deux arrêts ; le catalogue (lignes « Limites » et « Photos exigées ») ; `kit.py` du premier coup ; les messages de `check_studio.py` (fichier, ligne, valeur) ; la trame Mesuré / Estimé / Inventé.

**Où l'agent s'est perdu.**

- La landing suppose des dates à cocher et un formulaire ; l'action était un lien. Rien ne disait quoi retirer : il a deviné (juste).
- Le catalogue ne disait pas que le gabarit transforme l'action du héros en touche à maintenir, ni qu'un appui court ne fait rien. Découvert dans le navigateur, alors que le client en faisait une condition.
- Aucune liste des classes de mise en page : il a écrit `site.css` pour deux colonnes et une grille.
- Aucun rôle de largeur : `14rem` refusé par le script, remplacé par des `calc()` sur l'échelle d'espace ; un `--k-space-5` inexistant n'était pas signalé.
- `width` et `height` sur une `<img>` d'emplacement `media` donnaient des photos de 960 px de haut : défaut de `page.css`.
- « Banque libre » sans nom : Unsplash a refusé la recherche automatique, il est passé par Wikimedia Commons et a crédité les photos.

**Résultat** (`essais-etape-5/festival-lyon.png`). Premier écran reconnaissable : mot peint orange et blanc, photo grise, consigne et touche. Dessous, page sombre à filets, sans cartes. Sept sections dans l'ordre du plan, une seule action partout.

**`check_studio.py`.** Premier passage : 2 erreurs (valeurs en dur dans `site.css`). Final : 0 erreur ; 65 textes mesurés à 1440 px, 62 à 390 px, pire rapport 5,48:1 ; 1 010 Ko servis au premier écran (photo du héros).

**Grille anti-slop** (jugée sur les captures).

- Conforme : signature au premier écran ; pas de dégradé violet ; pas de série de cartes ; contenu réel ; lignes courtes ; aucun débordement à 390 px.
- Réserves : héros centré (règle du skill, exception citée par l'agent) ; signature absente sous le héros (K7) : la page pourrait appartenir à un autre skill sombre ; titre peint petit à 390 px ; premier écran lourd.
- Non jugé sur capture : l'état « maintenu » (photo en couleur), le survol, le défilement rapide.

**Corrigé dans le skill.** Fiche hold-to-play-music du catalogue (comportement de la touche) ; `SKILL.md` : « pas de formulaire », tableau des briques de page, règle des largeurs et pas de l'échelle, sources de photos et taille ; `check_studio.py` : rôle `--k-*` inexistant refusé, poids du premier écran signalé au-delà de 1 Mo ; `page.css` : `block-size: auto` sur les images d'emplacement.

**Non relancé.** Les corrections ne changent pas le parcours de cet essai.

## 2. Site vitrine d'un restaurant de quartier, en React

Client joué : « Chez Odile », Lyon 1er, réservation par téléphone, deux pages, pas de formulaire, photos à venir, React imposé.

**Proposition.** Registre produit. serif-bistro-green (recommandé), glass-frame-estate, zigzag-snack-pop. La limite React (aucun gabarit de signature, héros neutre) est dite en tête, avec l'alternative HTML. Le client garde React.

**Où le skill a guidé.** Les arrêts ; le catalogue ; la limite React à dire à l'étape c ; `kit.py --react` et sa liste d'imports ; le rapport du script ; la trame de livraison.

**Où l'agent s'est perdu.**

- Le plan UX se validait avant la lecture du README de la structure : son plan ne correspondait pas à la forme réelle de l'accueil.
- Le composant `Accueil` impose un champ de recherche, absurde pour quatre plats. Il a composé sa propre page avec les pièces du kit, sans savoir si c'était permis.
- `kit.py --react` n'écrivait aucun socle : `package.json`, `vite.config.js`, `index.html`, `main.jsx`, pages multiples et emplacement des images ont été devinés.
- Le script ne reconnaissait la coquille React qu'avec `<div id="root">` : 12 fausses erreurs avec un autre identifiant.
- Faux positif de contraste à 1,00:1 sur les liens soulignés : il a changé un libellé (« Itinéraire ») pour passer.
- Les composants `Image` et `Carte` n'acceptaient ni `width` / `height` ni `data-k-focus`.
- Le script exigeait une image sur chaque page ; la page intérieure n'en prévoit pas.
- Capture de la page carte : l'encart collant apparaît trois fois, la capture étant assemblée écran par écran.

**React dans un vrai navigateur.** Fait pour la première fois : construction Vite, puis les deux pages ouvertes dans Chrome par `check_studio.py` (1440 et 390 px) et par l'agent (menu au clavier, Échap, lien d'évitement, liens `tel:`). Les versions `.jsx` de la barre, du menu, du bouton, de la carte et des pièces de `Page.jsx` rendent et fonctionnent. Non essayés : `Onglets`, `Modale`, `Notification`, `Champ`, `EtatVide`, `Chargement`, et les structures autres que le site vitrine.

**Résultat** (`essais-etape-5/restaurant-react.png`). Vert profond, crème, serif d'affiche, bouton orange : le skill se reconnaît sans son arche. Héros neutre, texte à gauche et photo à droite. Deux pages, contenu dans un seul fichier `src/contenu.js`.

**`check_studio.py`.** Passages : 19 erreurs (12 dues à l'identifiant, 6 faux contrastes, 1 image), puis 2, puis 0. Final sur les deux pages : 0 erreur, pire rapport 4,62:1 (le bouton, comme mesuré à l'étape 4b).

**Grille anti-slop.**

- Conforme : héros non centré, une action ; grille de plats sur deux colonnes ; ordre des sections ; une colonne propre à 390 px.
- Réserves : un surtitre en capitales au-dessus de chaque section (Y5) ; quatre cartes de plat de même forme, aucune mise en avant ; pas d'arche (limite React annoncée).

**Corrigé dans le skill.** `kit.py --react` écrit le socle Vite (une entrée par page `.html`) ; `SKILL.md` : README de la structure lu à l'étape c, droit de composer sa page avec les pièces du kit, images dans `public/images/` ; `Page.jsx` et `Carte.jsx` : `largeur`, `hauteur`, `sujet` ; `check_studio.py` : coquille reconnue à son script de module, image exigée sur la page d'accueil seulement, soulignements rendus transparents dans la capture sans lettres.

**Relancé** : voir « Relances ».

## 3. Reprendre un site existant

Page de départ écrite pour l'essai (`examples/reprise-poterie/avant/index.html`) : atelier de poterie fictif, volontairement médiocre — dégradé violet, héros centré à deux boutons morts, trois cartes en faux texte, faux avis, faux logos, chiffres inventés, tableau de tarifs masqué sur téléphone, largeur fixe de 1 200 px, texte gris pâle en 10 px, formulaire qui affiche « Merci ! » sans rien envoyer, une image cassée. Le vrai contenu (cours, tarifs, horaires, adresse) y est enfoui.

**État des lieux** (`--constat`). 75 constats : débordement de 810 px à 390 px, horaires et galerie masqués, pire contraste 1,35:1, texte en 10 px, image cassée. L'agent les a rendus tels quels au client, avec la liste du faux contenu.

**Proposition.** serif-bistro-green (recommandé), heritage-lens, chrome-atelier, en disant qu'aucun skill n'est fait pour un atelier d'artisanat. Tableau de rapprochement de 21 lignes (gardé, réécrit, retiré avec la raison), deux lots.

**Où le skill a guidé.** Le renvoi vers `reprise.md` ; l'état des lieux chiffré ; le tableau de rapprochement et la règle « aucune information ne disparaît sans être dite » ; `kit.py` qui n'écrase pas une page existante.

**Où l'agent s'est perdu.**

- Nombre d'arrêts : `reprise.md` en annonçait un, `interview.md` un par tour. Il en a fait deux (juste).
- Sections sans équivalent dans la structure (tarifs, horaires, galerie) : pas de liste de classes, d'où une recherche dans le CSS.
- Titre du héros : le gabarit le coupe en quatre parts autour de l'arche ; le titre de neuf mots validé par la cliente cassait le héros. Il a lu le script du gabarit, puis raccourci le titre après validation.
- Faux positif de contraste à 1,00:1 sur les liens soulignés : il a **retiré les liens** `tel:` et `mailto:` du texte pour passer. C'est le script qui avait tort, et la page y a perdu.
- `--captures` avec un chemin relatif écrivait dans `avant/`.
- `kit.py --composants carte` sur une page existante ne disait pas quelles balises ajouter.
- Pour une page courte, la frontière entre lot 1 et lot 2 était artificielle.

**Résultat** (`essais-etape-5/reprise-poterie-avant.png` et `reprise-poterie.png`). Tout le contenu vrai est gardé, le faux est retiré et listé, les horaires ne sont plus masqués, la page tient à 390 px. Héros de signature avec l'arche ; dessous, sections sobres.

**`check_studio.py`.** Avant : 75 constats. Lot 1 : 7 erreurs, toutes le faux positif. Final : 0 erreur, pire rapport 4,62:1.

**Grille anti-slop.**

- Conforme : plus de dégradé violet, de héros centré, de faux contenu ; signature au premier écran ; lignes courtes ; une colonne à 390 px.
- Réserves : quatre cartes de formule de même forme ; le nom dans la barre fait 25 px de haut (cible tactile sous 44 px, défaut de la bibliothèque, non corrigé) ; téléphone et e-mail non cliquables dans le texte (conséquence du faux positif).

**Corrigé dans le skill.** `sonde.html` : soulignements rendus transparents ; `check_studio.py` : `--captures` résolu avant tout changement de dossier ; `reprise.md` : deux arrêts, lot unique admis pour une page très courte ; `SKILL.md` : briques de page, titre du héros à huit mots au plus ; catalogue : la coupe du titre de serif-bistro-green ; `kit.py` : balises à ajouter pour un composant posé après coup.

**Relancé** : voir « Relances ».

## Relances

Les essais 2 et 3 ont été relancés avec un agent neuf, sur le skill corrigé, dans `examples/restaurant-react/` et `examples/reprise-poterie/` (les premiers passages ont été remplacés par les relances : seule la dernière version de chaque essai est gardée). Pour ces relances, les réponses du client ont été données d'avance dans la demande (les arrêts de l'interview, déjà vus aux premiers passages, ne sont donc pas réessayés).

### Festival, second passage, après les corrections (`essais-etape-5/festival-lyon.png`)

Agent neuf, même demande, mêmes réponses du client, les deux arrêts tenus (questions, puis proposition). La capture jointe est celle de ce passage ; le dossier `examples/festival-lyon/` aussi. Le premier passage (décrit en 1) n'est plus dans le dépôt.

Le client a choisi `nocturne-architecture` plutôt que le style recommandé (`signal-orange-techwear`), **à cause du tableau « Gabarits par emplacement »** : c'est le seul des trois proposés dont la signature descend sous le héros. L'agent l'avait écrit dans la proposition, style par style.

| Correction vérifiée | Ce que l'agent a fait |
|---|---|
| Règle 7, ne jamais contourner un contrôle | Premier passage du script : 4 lignes ✗, contraste 2,05:1 sur les liens de crédit des légendes (lien nu, bleu du navigateur sur noir). Vrai défaut. Corrigé en posant `k-link`, sans rien retirer ni masquer. Aucun faux positif rencontré : le cas « laisser tel quel et signaler » n'a pas été exercé |
| Règle 8, signature hors du héros | `titre-geant` posé sur les quatre titres de section ; la livraison dit que c'est le seul emplacement hors héros du style, et que la finale et le pied tiennent par les couleurs et la typo |
| Alerte des séries de même forme | Aucune alerte : l'agent a fait des listes et des faits, pas de cartes. L'alerte elle-même se déclenche bien sur `examples/reprise-poterie` (4 éléments de même forme dans une liste) |

Résultat : 0 erreur, pire contraste 4,60:1 aux deux largeurs. Lecture de `SKILL.md`, `interview.md`, `catalogue.md`, un README de structure, la grille.

Ce que ce passage a encore trouvé, non corrigé :

- **D'où viennent les mots géants** n'est écrit nulle part : celui du héros est le premier mot de la marque, celui d'un titre de section est son surtitre. « Le lieu » a d'abord donné un « le » géant ; l'agent a dû ouvrir deux scripts de gabarit, que le skill dit de ne pas ouvrir.
- Les mots géants ont des tailles très inégales selon leur longueur (« lieu » énorme, « programmation » petit), et celui du héros est rogné à droite : voulu par le gabarit ou non, le catalogue ne le dit pas.
- Le mot géant du héros recouvre la légende de la photo : le crédit a été déplacé au pied de page.
- « Retirer ses balises » quand il n'y a pas de formulaire : lesquelles, le skill ne les nomme pas.
- `data-k-part` du bouton de la finale sans formulaire, et `k-link` à poser sur un lien de légende : devinés.
- L'agent n'avait ni navigateur ni serveur (contrainte de la machine ce jour-là) : clavier, focus et mouvement réduit n'ont pas été essayés à la main. Le skill ne prévoit pas ce cas.
- À 1440 px, la finale laisse sa moitié droite vide.

### Reprise, second passage (`essais-etape-5/reprise-poterie.png`)

| | Premier passage | Relance |
|---|---|---|
| Fichiers du skill lus | 7 | 6 |
| Lectures hors consigne | CSS du kit, en-tête et script d'un gabarit, `measure()` | une recherche dans le CSS du kit |
| Erreurs au premier contrôle | 7 (toutes fausses) | 0 |
| Titre du héros | changé après validation | bon du premier coup (limite lue dans le catalogue) |
| Liens `tel:` et `mailto:` dans le texte | retirés pour contourner le script | gardés |
| Sections hors structure | classes cherchées dans le CSS | composées avec le tableau des briques |
| Résultat final | 0 erreur, 4,62:1 | 0 erreur, 4,62:1 |

Ce que la relance a encore trouvé, corrigé ensuite :

- Au lot 1, le corps de la page était encore celui de la démonstration et le script rendait 0 erreur : il ne cherchait que le nom « Cordée Brume ». Il compare maintenant les titres du projet à ceux des pages de démonstration.
- Une liste `<ul data-k-slot="grid">` gardait ses puces et son retrait : corrigé dans `page.css`.
- Recherche de photos refusée par les banques : `SKILL.md` dit quoi faire dans ce cas.

Resté tel quel : liens du bloc « Venir » de 21 px de haut (cible tactile) ; légende de la photo du héros détachée de la photo à 1440 px (effet du gabarit) ; `quality/anti-slop.md` lu en entier au lieu de sa grille.

### React, second passage (`essais-etape-5/restaurant-react.png`)

| | Premier passage | Relance |
|---|---|---|
| Socle Vite | deviné à la main | écrit par `kit.py`, compile du premier coup |
| Erreurs au premier contrôle | 19 (18 fausses) | 0 |
| Recherche imposée par `Accueil` | page recomposée sans savoir si c'était permis | page recomposée, permission lue dans le skill |
| Libellés changés pour passer le script | oui (« Itinéraire ») | non |
| Résultat final | 0 erreur, 4,62:1 | 0 erreur, 4,62:1 |

Ce que la relance a encore trouvé :

- La prop `ratio` de `Image` n'était pas citée : un portrait recadré en 4:3 perdait la tête. Ajoutée à `SKILL.md`.
- La seconde page React se crée à la main, et les imports de styles se répètent par point d'entrée : dit dans `SKILL.md`, non outillé.
- `Page.jsx` n'a pas d'en-tête de props d'ensemble : l'agent a lu sept fichiers `.jsx` du kit. Non corrigé.
- Le README du site vitrine veut une finale « vers la page qui lève les doutes », `SKILL.md` la même action partout : contradiction relevée, tranchée après les essais : la finale porte l'action principale du site, la page qui lève les doutes l'accompagne en lien simple (README, page de départ et `Finale` de `Page.jsx` alignés sur `SKILL.md`).
- L'encart collant apparaissait trois fois dans `carte-1440.png` (capture assemblée par écrans) : corrigé après les essais dans `tools/sonde.html`, il reprend sa place dans le flux le temps de la capture (vérifié sur la même page : une seule fois).
- Deux photos provisoires ne montrent pas le plat annoncé (asperges pour poireaux, poisson pour quenelle) : dit par l'agent à la livraison, mais c'est la limite d'une photo de banque posée sous un vrai nom de plat.

## Reprises des exemples après publication (5 octobre 2026)

Trois exemples ont été repris à la main après relecture de la galerie en ligne ; ce ne sont plus les livraisons brutes des agents.

| Exemple | Ce qui a changé | Pourquoi |
|---|---|---|
| `festival-lyon` | Le mot géant du héros passe sous le texte et les boutons (gabarit corrigé : il vit dans le plan de l'image) | Il se posait par-dessus le contenu |
| `restaurant-react` | Refait sous `retro-mission-poster`, même contenu et même React : héros-affiche à titre incliné sur la photo de la façade, cadre de page ; le portrait d'Odile descend dans « La maison », la photo de la salle passe sur la page de la carte | Deux exemples utilisaient `serif-bistro-green`. Ce skill demande des paysages peu détaillés en aplats préparés : une photo de rue n'est pas son sujet, et cela se voit |
| `club-escalade` | Données complètes rétablies (« Cours encadré », « Débutant », « Réservé par vous ») ; le tableau tient à 390 px en repliant quatre colonnes en trois (`k-table__sub`) ; la recherche de « débutant » trouve ses cinq créneaux | L'agent avait raccourci les données pour gagner de la place |

## Couche mouvement : trois exemples rejoués, chacun à côté de la démo de son skill (5 octobre 2026)

Constat de départ : les pages produites par kobo-studio n'étaient pas au niveau des démos des skills. Il manquait surtout le mouvement, et la mise en page restait sage. Une couche mouvement par skill a été écrite pour six skills (`components/motion/`, voir son README), et trois exemples ont été rejoués avec elle. Il n'existe pas d'autre exemple sous `nocturne-architecture` que `festival-lyon`.

Chaque exemple a été posé à côté de la démo de son skill par `tools/compare.py` : six instants de la page au-dessus des six mêmes instants de la démo. Les planches sont dans `quality/mouvement/`. Le verdict est donné à l'œil sur ces planches et dans le navigateur ; ce n'est pas une mesure.

| Exemple | Skill | Ce que la couche a ajouté | Mouvement face à la démo | Mise en page face à la démo | Verdict |
|---|---|---|---|---|---|
| `festival-lyon` (Nuits Basses) | nocturne-architecture | Titres de section qui s'allument mot à mot au défilement, blocs qui montent, prix qui comptent, bouton dont le fond monte, liens de la barre en fondu ; le mot géant passe sous le contenu | Proche : les mouvements de la démo qui ont une pièce dans la page y sont. Manquent les deux bandeaux qui défilent et le carrousel | En dessous : après le héros, des sections sombres presque identiques ; la démo alterne grande phrase, chiffres géants, cartes de biens en couleur | **En dessous**, de peu : par la mise en page, plus par le mouvement |
| `reprise-poterie` (Terre & Feu) | serif-bistro-green | Mots des titres qui montent derrière un cache, blocs qui montent de 28 px, photos en arche, liens de la barre ; intensité passée de `reduced` à `full` pour l'essai | Présent, plus discret que la démo : pas d'assiette qui tourne, pas de carrousel, pas de dessins qui se tracent | **Nettement en dessous** : toute la page est verte ; la démo empile des feuilles crème, un bloc orange, des fiches reliées | **En dessous** |
| `restaurant-react` (Chez Odile) | retro-mission-poster | Titres mot à mot derrière un cache, surtitres en fondu, faits qui arrivent de la gauche, contour rouge des cartes, cascade de la barre ; en React (`useMouvement`) | Présent sur les titres et les blocs. Manquent l'anneau qui tourne, le mot géant qui glisse, l'écran de chargement | **En dessous** : la démo est une suite d'affiches plein écran en aplats rouille et bleu, avec un mot géant par chapitre ; la page a une affiche (le héros) puis des blocs sombres. Les photos ne sont pas traitées en aplats, ce que le skill exige | **En dessous** |

Aucun des trois n'atteint la barre posée dans `SKILL.md` (règle 10). Le mouvement n'est plus ce qui manque le plus : c'est la **mise en page sous le héros**, que la couche mouvement ne change pas. Elle dépend des gabarits hors du héros (sections en feuilles, chapitres-affiches, bandeaux), qui restent à écrire pour ces skills.

**Fluidité**, mesurée dans Chrome, fenêtre ramenée au premier plan, écran 144 Hz, sur un défilement de toute la page en 2,5 s :

| Page | 1440 px | 390 px |
|---|---|---|
| Nuits Basses | 145 images/s, pire image 7 ms | 145 images/s, pire image 7 ms |
| Terre & Feu | 145 images/s, pire image 7 ms | 145 images/s, pire image 7 ms |
| Chez Odile, accueil (React) | 142 images/s, pire image 14 ms | 144 images/s, pire image 21 ms |
| Chez Odile, carte (React) | 145 images/s, pire image 7 ms | 145 images/s, pire image 7 ms |

Sur le festival, la même mesure sans la couche (intensité `off`) donne aussi 145 images/s : la couche ne coûte rien de mesurable ici. Les trois autres couches, essayées sur la page de départ d'une landing : acid-scan-security 128 à 140 images/s (pire image 28 ms), lore-frame-editorial 132 à 145 (21 ms). Sous hold-to-play-music, une image de 1,3 à 1,5 s apparaît au début du défilement, **avec et sans** la couche : elle vient du gabarit du héros, pas du mouvement ajouté ; elle n'est pas corrigée.

**Autres essais** : au clavier seul (Tab d'un bout à l'autre des trois pages : 15 à 18 arrêts, chaque élément atteint est révélé et visible) ; intensité `reduced`, `off` et mouvement réduit du système : tout est affiché, immobile, aucun titre découpé ; `check_studio.py` : 0 erreur sur les trois.

**Défauts trouvés et corrigés en route** : un bloc dépassé d'un coup au défilement n'était jamais révélé (il restait masqué derrière soi) ; un texte en cours de décodage restait à moitié écrit quand il sortait de l'écran ; un titre de bas de page restait gris faute de pouvoir monter assez haut.

## 4. Un CRM B2B pour une PME de services (registre fonctionnel, 5 octobre 2026)

Essai fait après l'ajout du skill `clear-ledger-desk` et de la structure `application`. Agent neuf, avec seulement `SKILL.md` et la demande ; les deux arrêts tenus ; je jouais le client (Atelier Rivage, conseil numérique à Nantes, six utilisateurs, outil « Rivage Suivi », premier écran : la liste des affaires). Résultat : `examples/crm-pme/`, capture `essais-etape-5/crm-pme.png`.

**Ce qu'il devait trouver, et qu'il a trouvé seul :**

| Attendu | Fait |
|---|---|
| Lire le projet comme *fonctionnel* et le dire | Oui, dès le premier message : « un outil de travail, pas un site de présentation » |
| Proposer `clear-ledger-desk` | Oui, **seul**, en refusant de présenter un skill expressif comme adapté ; `site-to-skill` donné en seconde voie |
| Proposer la structure `application` | Oui, avec son plan en sept zones tiré du README de la structure |
| Poser les questions du registre | Oui : enregistrements et volumes, colonnes, gestes répétés, utilisateurs et écrans, origine des données |

**Livraison :** liste de 24 affaires fictives (16 ouvertes affichées par défaut), trois filtres, recherche, détail avec changement d'étape, fenêtre « Créer une affaire » à formulaire validé, bascule de densité, raccourcis. `check_studio.py` : 0 erreur après correction du script (voir plus bas), pire contraste 4,51:1. Lecture : `SKILL.md`, `interview.md`, le README de la structure, le catalogue en partie, un pattern, cinq README de composants, la grille.

**Où il s'est perdu :**

| Point | Ce qui s'est passé | Suite donnée |
|---|---|---|
| « Deux ou trois skills » alors qu'un seul est fonctionnel | Il a hésité, puis présenté un skill et la voie `site-to-skill` | `SKILL.md` dit maintenant de présenter `clear-ledger-desk` seul |
| « Une des quatre structures » | Le texte disait quatre, le tableau en listait cinq | Corrigé |
| Faux positif du script : « reste du contenu de démonstration (« Raccourcis clavier ») » | Le titre de la fenêtre d'aide, fourni par la structure, était pris pour un oubli. Il l'a laissé et signalé (règle 7), sans rebaptiser le titre | Corrigé dans le script : un titre marqué `data-k-fixed` appartient à la structure |
| Ce que font les scripts de la structure | Pour un filtre à valeur de départ, « Effacer », l'ajout d'une ligne, le tri par script et la densité, le README ne suffisait pas : il a ouvert `application.js` et `tableau.js`, ce que le skill interdit | Section « Brancher ses données et ses gestes » ajoutée au README de la structure |
| Liste des composants | `components/README.md` est interdit de lecture et rien d'autre ne les liste : il a fait un `ls` | Corrigé ensuite : `components/INDEX.md`, une ligne par composant, cité dans le tableau des lectures de `SKILL.md` |
| README d'un composant déjà présent dans la page de départ | Le skill ne dit de le lire que s'il est absent ; `champ` et `modale` étaient là, mais sans le balisage d'un formulaire ni d'un pied de fenêtre : lus quand même | Corrigé ensuite : `SKILL.md` dit de lire le README des composants qu'on **utilise**, et seulement ceux-là |
| Où ranger le script du projet | Rien ne le disait : il a créé `site.js` | Ajouté à « Organisation d'un projet » |
| Grand blanc sous la tête d'écran | Marge d'un titre de section, héritée de `page.css` ; il ne savait pas s'il pouvait la corriger | Corrigé dans `application.css` |
| Grille anti-slop | Écrite pour des landings : héros, photos, cartes sans objet | `SKILL.md` dit quelles cases s'appliquent à un projet fonctionnel ; la grille elle-même n'est pas réécrite |
| Premier tour de l'interview | Parle de visiteur et de photos : il l'a reformulé pour un outil | Corrigé ensuite : le registre est la première question, et le premier tour a une suite pour un site et une suite pour un outil (utilisateurs, tâches fréquentes, données, écrans, rôles et droits) |
| Cases à cocher des lignes | « Garder le balisage » contre « ne charger que l'utile » : il a retiré les cases, faute d'action groupée | Le README dit maintenant comment retirer la colonne |
| Bascule de densité dans l'en-tête | Elle cassait l'en-tête sur téléphone : il l'a rangée avec les filtres | Le README conseille cet endroit |
| Essais manuels sans navigateur | Contrainte de la machine ce jour-là. Il a monté son propre banc (Chrome sans écran), à 500 px de large au plus étroit, pas 390 | Corrigé ensuite : sans navigateur, `check_studio.py` fait quand même les contrôles par script, écrit « VÉRIFICATION VISUELLE NON FAITE » (code de sortie 2) et donne la phrase à reporter ; `SKILL.md` dit qu'une capture à 500 px n'est pas une vérification à 390 px |

Deux remarques de l'agent sans objet : « 24 skills ici, 26 dans la liste des skills » (la liste du plugin compte aussi deux skills outils et n'a pas été touchée) et des fichiers du skill modifiés hors de son dossier (c'était ce travail-ci, en cours et non commité).

**Ce que l'essai ne dit pas :** l'écran de fiche et le tableau de bord n'ont pas été demandés, donc pas exercés par un agent (ils ont été ajoutés à la structure après cet essai, et essayés à la main) ; rien n'a été essayé au doigt ni avec un lecteur d'écran ; un seul agent, une seule demande.

## 5. Site vitrine d'un cabinet d'architectes, couleurs de marque imposées (5 octobre 2026)

Premier essai de `brand.md` dans un projet complet. Agent neuf, avec seulement `SKILL.md` et la demande : « Site vitrine d'un cabinet d'architectes ; charte imposée : vert sapin #1F4D3A et ocre #C8892B ». Les deux arrêts tenus ; je jouais le client (Atelier Sorbier architectes, cabinet fictif à Chambéry : deux associées, quatre projets, pas de photos présentables, pas de formulaire, « pas un site tout noir », les deux codes ne se modifient pas). Résultat : `examples/cabinet-architectes/`, capture `essais-etape-5/cabinet-architectes.png`.

**Ce qu'on voulait savoir, vérifié sur pièces après la livraison (fichiers relus, script relancé, pages ouvertes à 1440 et 390 px) :**

| Question | Constat |
|---|---|
| `brand.md` est-il suivi ? | Oui. `kit.py … --marque`, `brand.css` chargé en dernier, `data-k-brand` sur `<html>`, les lignes du niveau 1 remplies ensemble (`--k-accent`, `--k-on-accent`, `--k-accent-edge`, `--k-accent-2`, drapeau à 1). Aucune variable du skill ni `--k-sig-*` redéfinie, `kobo/` intact. Il l'a lu dès l'étape c, avant de proposer un skill, alors que le tableau des lectures le plaçait en d |
| Le skill choisi accepte-t-il une marque ? | Oui : `glass-frame-estate`, un des six skills à accent neutre que `brand.md` conseille. Il a écarté `nocturne-architecture` (noir, photos de nuit : ce que le client refuse) et `serif-bistro-green` malgré son vert (portrait exigé) |
| Les contrastes sont-ils revérifiés ? | Oui, deux fois. Par calcul avant de construire : il a annoncé au client que l'ocre fait environ 2,97:1 sur blanc et ne servirait donc jamais de texte. Par le script : 22 paires conformes avec les couleurs de la marque, pire contraste sur capture 6,66:1 (accueil) et 9,63:1 (agence), aux deux largeurs. Relancé par moi : mêmes chiffres |
| Les codes de la marque sont-ils intacts ? | Oui. Lus dans la page rendue : bouton `rgb(31, 77, 58)` à texte blanc, filet `rgb(200, 137, 43)` |
| Le skill reste-t-il reconnaissable ? | Dans le héros, oui : photo encadrée d'un filet, mot géant derrière le voile, titre en bas à gauche. Sous le héros, non : ce skill n'a de gabarit que là, et la page tient par la typo et les composants. L'agent l'a dit à la proposition et à la livraison (règle 8) |
| Quelque chose est-il masqué ou dégradé pour passer un contrôle ? | Non. Aucune erreur à aucun passage, donc rien à faire passer. Deux changements faits à cause d'une ligne du script, dits dans son journal : les photos réduites (premier écran de 1934 à 560 Ko) et la liste des projets passée de trois à deux colonnes (un projet restait seul sur sa rangée ; l'alerte « éléments de même forme » a disparu du même coup). Aucun texte, lien ni image retiré. Compté dans la page à 390 px : aucun élément de texte masqué |

**Où il s'est perdu, et la suite donnée :**

| Point | Ce qui s'est passé | Suite donnée |
|---|---|---|
| La seconde couleur n'apparaît nulle part | `brand.md` disait que la marque « prend la place d'`--k-accent-2` sans rien casser », mais aucun composant ni aucune structure ne lit ce rôle : l'ocre était invisible. Il l'a posé lui-même dans `site.css`, en deux filets | **`brand.md` corrigé** : section « Où chaque couleur apparaît », qui dit ce que lit chaque rôle et comment poser la seconde couleur |
| Les liens ne prennent pas l'accent | Il comprenait de `brand.md` que `--k-accent-on-bg: 1` colorait les liens ; seul leur soulignement le lit. Ajouté dans `site.css` | **`brand.md` corrigé** : la règle à écrire, et sa condition de contraste |
| Bloc de fin noir | Il a redéfini la paire inversée en vert, de sa propre initiative, parce que le client refuse le noir. `brand.md` ne prévoyait ce changement qu'au niveau 2. Il l'a dit à la livraison, avec la façon de revenir en arrière | **`brand.md` corrigé** : permis au niveau 1, à proposer ou à dire |
| Mot géant du héros | Promis « Sorbier », obtenu « ATELIER » : le gabarit de glass-frame-estate prenait le premier mot du nom, et `data-k-word` n'y existait pas. Il n'a pas contourné : écart dit à la livraison | Gabarit corrigé : `data-k-word` sur le `<h1>` ; `SKILL.md` le dit. Exemple mis à jour après l'essai (« Sorbier ») |
| Nom tronqué dans la barre à 390 px | « ATELIER SORB… » : comportement de la barre, laissé tel quel et signalé | Corrigé ensuite dans le composant : un nom long passe à la ligne, sans être tronqué (essayé sous les 24 skills à 390 px) ; le kit de l'exemple a été mis à jour |
| `brand.md` lu trop tard d'après le tableau | Il l'a lu en c de lui-même | `SKILL.md` : à lire dès l'étape c |
| Liste composée à la main sur deux colonnes | Le skill ne dit pas comment : il a repris la classe `sv-grid` de la structure, trouvée par recherche dans son CSS | **Non corrigé** |
| Crédit d'une photo sous licence | Le skill ne dit pas où l'écrire : dans chaque légende | **Non corrigé** |
| Recherche et cartes de l'accueil retirées | Le skill ne prévoit ce retrait qu'en React ; appliqué en HTML, avec les balises devenues inutiles | **Non corrigé** (le résultat est juste) |
| `anti-slop.md` lu en entier | La consigne disait « à partir de la grille » | Rien : erreur de l'agent |

**Essayé par moi après la livraison**, parce que l'agent ne l'avait pas fait : parcours à la touche Tab sur les deux pages (ordre logique, contour de focus partout ; les liens des légendes ont le contour par défaut du navigateur, pas celui du kit), menu sur téléphone ouvert au clavier, fermé par Échap, focus rendu au bouton Menu.

**Ce que l'essai ne dit pas :** un accent pâle (ici le vert passe partout : le chemin `--k-accent-edge` et drapeau à 0 n'a pas servi) ; le niveau 2 (fonds de la marque) ; une police de marque ; une marque posée sur un skill dont l'identité est une couleur. Les photos viennent d'une banque et ne se ressemblent pas : ce que donnerait le skill avec les photos qu'il exige n'est pas montré. Un seul agent, une seule demande.

## 6. Essai de contrôle : réservation d'un club d'escalade, page publique et espace membre (5 octobre 2026)

Essai fait pour rejouer les corrections tirées de l'essai 4 (interview par registre, `components/INDEX.md`, README des composants utilisés), sur une demande qui mêle deux registres : « Application de réservation pour un club d'escalade, avec une page publique et un espace membre ». Agent neuf, avec seulement `SKILL.md` et la demande ; je jouais le client (Club Les Dalles, club fictif à Grenoble : 180 membres, surtout sur téléphone, l'espace membre d'abord, un seul écran, trois réservations par semaine au plus). Résultat : `examples/club-escalade/`, capture `essais-etape-5/club-escalade.png` (espace membre à 1440 et 390 px, page publique à 390 px).

**Ce qu'on voulait savoir :**

| Question | Constat |
|---|---|
| Utilise-t-il l'interview par registre ? | Oui. Il a reconnu que la demande ne tranchait pas, posé le **tronc commun seul** (registre, mode, technique) et s'est arrêté. Après la réponse, il a annoncé « registre fonctionnel » et posé la suite pour un outil (utilisateurs, tâches fréquentes, données, écrans, règles et droits, marque, habitudes), sans « visiteur » ni ambiance. Trois arrêts au lieu de deux, comme prévu dans ce cas |
| Utilise-t-il `components/INDEX.md` ? | Oui, à l'étape c, pour trouver `notification`, `barre-nav` et `menu-mobile` ; aucun `ls`, aucun README général ouvert |
| Lit-il les README des composants qu'il utilise, et seulement ceux-là ? | Oui : six README (les trois ajoutés, plus `modale`, `tableau` et `bouton` qu'il modifiait) ; pas `champ`, `selection` ni `etat-vide`, laissés tels quels |
| Propose-t-il le skill fonctionnel seul ? | Oui, `clear-ledger-desk` seul, avec `site-to-skill` en seconde voie et ses limites dites (page publique sobre, pas une vitrine) |
| Tient-il la livraison honnête ? | Oui : 0 erreur aux deux passages du script (relancé par moi : mêmes chiffres, pire contraste 4,51:1), essais faits et non faits listés, textes et données inventés listés |

**Où il s'est perdu, et la suite donnée :**

| Point | Ce qui s'est passé | Suite donnée |
|---|---|---|
| Un projet à deux natures | Rien ne disait quoi faire d'une page de présentation et d'un outil dans le même projet. Il a tout mis sous un skill et une structure, ajouté de lui-même deux questions de la suite « site » (contenu, photos), et composé la page publique en déduisant le balisage du héros, de la dernière section et du pied de page du CSS, faute d'avoir le droit de lire le README d'une seconde structure | **Corrigé** : `SKILL.md` et `interview.md` ont un paragraphe « projet à deux natures » (la partie à réussir d'abord donne le registre, un seul skill, une seconde structure dont on lit le README) ; `kit.py --prefixe` pose la seconde structure à côté de la première |
| Balises d'un composant ajouté | `kit.py --composants …` au premier passage ne disait pas quelles balises ajouter (il ne le faisait que pour une page déjà là). Écrites à la main | **Corrigé** dans `kit.py` |
| Tableau trop large à 390 px | La colonne « Places » sortait de l'écran. Il a d'abord tenté de laisser les cellules passer à la ligne, sans effet contre la couche de signature, puis a **raccourci les données** (« Cours » pour « Cours encadré, débutant »). Conséquence dite à la livraison : chercher « débutant » ne trouve plus rien. Ce n'est pas un contrôle contourné (le script ne signalait rien), mais c'est un contenu appauvri pour une largeur | **Corrigé en partie** : la recherche lit aussi `data-ap-keywords` sur la ligne, et le README dit de réduire les colonnes plutôt que les données. L'exemple n'a pas été repris |
| « 1 créneaux affichés » | Le modèle du résumé n'accordait pas | **Corrigé** : `data-ap-sum-one` |
| Bouton plein hors de la tête d'écran | La structure disait « une seule action pleine : celle de la tête d'écran » ; ici on ne réserve qu'un créneau ouvert. Il l'a mis dans le panneau et l'a dit | **Corrigé** : le README le prévoit |
| Ordre entre remplissage du panneau et `k-app:open` | Non documenté : il a cherché dans `application.js` | **Corrigé** : dit dans le README |
| Barre de sélection du tableau | Retirée avec les cases, sans que le README le dise | **Corrigé** : dit dans le README |
| Filtres à deux ou trois valeurs | `INDEX.md` conseille autre chose qu'une sélection, mais le filtrage ne lit que des `select` | **Non corrigé** |
| Une page de plus hors site vitrine | Le skill ne dit pas comment nommer ni créer une seconde page en HTML : il a copié la page de départ | **Non corrigé** (`--prefixe` couvre le cas d'une seconde structure, pas celui d'une page de plus de la même) |
| Essais sans serveur | Chrome sans interface ne descend pas sous 500 px de fenêtre : sa première mesure « à 390 » était à 454 px. Il s'en est aperçu et a refait l'essai dans un cadre de 390 px | Rien : `SKILL.md` prévient déjà qu'une largeur annoncée doit être la largeur réelle |
| Zone tactile du bouton « Menu » | 32 px de haut mesurés ; il a coché la case d'après la promesse du README, sans vérifier | Vérifié par moi : la zone cliquable fait 44 px (un appui 5 px au-dessus du bouton l'atteint) |

**Ce que l'essai ne dit pas :** la correction « projet à deux natures » vient de cet essai et n'a pas été rejouée ; `--prefixe` a été essayé à la main (les deux structures se posent côte à côte), pas par un agent. Rien au doigt, pas de lecteur d'écran, Chrome seulement. Un seul agent, une seule demande.

## Ce que les essais ont changé dans le skill

| Fichier | Changement | Vu dans |
|---|---|---|
| `SKILL.md` | README de la structure lu dès la proposition | 2 |
| `SKILL.md` | Tableau des briques de page ; règle des largeurs ; rôles consultables par recherche | 1, 3 |
| `SKILL.md` | Projet sans formulaire ; retrait des balises devenues inutiles | 1, 3 |
| `SKILL.md` | Titre du héros court, à regarder sur capture | 3 |
| `SKILL.md` | React : socle écrit par le kit, pages multiples, droit de composer avec les pièces | 2 |
| `SKILL.md` | Photos provisoires : sources, taille, mention visible seulement si la photo peut tromper | 1, 3 |
| `reprise.md` | Deux arrêts ; lot unique pour une page très courte | 3 |
| `catalogue.md` | hold-to-play-music : la touche à maintenir ; serif-bistro-green : le titre coupé en quatre | 1, 3 |
| `tools/kit.py` | Socle Vite ; balises à ajouter pour un composant posé après coup | 2, 3 |
| `tools/check_studio.py`, `sonde.html` | Faux positif des soulignements ; chemin de `--captures` ; coquille React ; image par page ; rôle inexistant ; poids | 1, 2, 3 |
| `ux/structures/page.css` | `block-size: auto` sur les images d'emplacement | 1, 3 |
| `ux/structures/Page.jsx`, `components/carte/Carte.jsx` | `largeur`, `hauteur`, `sujet` | 2 |
| `SKILL.md`, `interview.md` | Registre dès le premier tour, suite pour un outil ; un seul skill fonctionnel présenté seul ; README des composants utilisés ; repli sans navigateur | 4 |
| `components/INDEX.md` | Une ligne par composant | 4 |
| `ux/structures/application/` | « Brancher ses données et ses gestes » ; marge de la tête d'écran ; écrans fiche et tableau de bord | 4 |
| `tools/check_studio.py` | Titres `data-k-fixed` ; vérification visuelle non faite dite en toutes lettres (code de sortie 2) | 4 |
| `brand.md` | Où chaque couleur apparaît ; liens, seconde couleur, bloc de fin | 5 |
| `SKILL.md`, `interview.md`, `tools/kit.py` | Projet à deux natures ; `--prefixe` ; balises des composants ajoutés au premier passage | 6 |
| `ux/structures/application/` | `data-ap-keywords`, `data-ap-sum-one` ; bouton plein dans le panneau ; ordre de `k-app:open` | 6 |
| `components/barre-nav/` | Nom long sur deux lignes au lieu d'être tronqué (`data-k-brand`) | 5 |
| `components/motion/`, `tools/compare.py`, `SKILL.md` | Couche mouvement de six skills ; planche page / démo ; règle 10 (le niveau de la démo) ; alerte mouvement de `check_studio.py` | exemples rejoués |
| `ux/templates/hero-photo/glass-frame-estate.js`, `SKILL.md` | Mot géant choisi par `data-k-word` ; nom court dans la barre ; `brand.md` lu dès l'étape c | 5 |

## Ce qui reste incertain

- **La mesure de contraste est neuve.** Elle retrouve le 4,62:1 de l'étape 4b sur le bouton de serif-bistro-green, mais elle a déjà produit un faux positif (soulignements) ; d'autres cas sont probables : bordures en `currentColor` collées aux lettres, textes qui se chevauchent, fond animé.
- **Les captures sont assemblées écran par écran.** Une barre collée en haut est masquée après le premier écran ; un encart collant sur le côté est remis dans le flux le temps de la capture. La capture sert à juger, pas à mesurer une mise en page collante.
- **L'état « maintenu » de hold-to-play-music** et tout état au survol ou au focus ne sont pas mesurés.
- **Aucun essai au doigt** sur un vrai téléphone, aucun autre navigateur que Chrome.
- **Le script dépend d'un Chrome ou d'un Chromium installé.** Essayé avec le Chrome de Windows lancé depuis WSL ; non essayé sous macOS, sous Linux natif, ni avec Edge.
- **Hors du héros, la signature est mince** dans les trois résultats : la page tient par les couleurs, la typo et les composants. C'est la limite connue de l'étape 4b (gabarits du premier écran seulement), et elle se voit.
- **Séries de cartes de même forme** (formules, plats) : le skill les déconseille, deux agents en ont fait. Depuis, `check_studio.py` les signale en alerte (trois éléments ou plus de même forme côte à côte). C'est une alerte, pas une erreur : une vraie liste de même forme la déclenche aussi.
- **Cible tactile du nom dans la barre** (25 px) : corrigé après les essais, la zone cliquable fait `--k-hit-min` de haut sans changer la hauteur affichée.
- **Récit collant et article** : aucun essai ne les a exercés. Le registre fonctionnel et les couleurs de marque l'ont été une fois chacun (essais 4 et 5). Pour la marque, seul le cas facile est passé dans un projet complet : un accent foncé sur un skill à accent neutre. L'accent pâle n'a été essayé qu'à la main sur `brand.css` (jaune refusé, puis accepté avec contour et drapeau à 0), jamais sur capture.
- **Le niveau de la démo n'est atteint par aucun exemple rejoué** : voir la section « Couche mouvement ». Dix-huit skills n'ont pas de couche mouvement.
- **`tools/compare.py` est une simulation** : dans un navigateur sans interface, les images d'animation, l'observation à l'écran et le défilement sont relayés par des minuteries. La planche montre l'allure d'un mouvement, pas sa durée exacte ni sa fluidité ; un titre lié au défilement peut y paraître éteint alors qu'il s'allume dans un vrai navigateur.
- **Corrections rejouées ou non.** L'essai 6 a rejoué celles de l'essai 4 (interview par registre, index des composants, README utilisés) : elles tiennent. Celles de l'essai 5 (`brand.md`) et de l'essai 6 (projet à deux natures) n'ont pas été rejouées.
- **Mode reprise** : essayé sur une page locale unique ; ni site en ligne, ni site à plusieurs pages.
