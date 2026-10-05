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

Les trois agents ont respecté les deux arrêts, n'ont ouvert ni `audit/`, ni `quality/relecture-*`, ni les README généraux, et ont chargé un seul skill. Chacun a pourtant dû fouiller du CSS ou le vérificateur au moins une fois : c'est là que le skill manquait.

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

## Ce qui reste incertain

- **La mesure de contraste est neuve.** Elle retrouve le 4,62:1 de l'étape 4b sur le bouton de serif-bistro-green, mais elle a déjà produit un faux positif (soulignements) ; d'autres cas sont probables : bordures en `currentColor` collées aux lettres, textes qui se chevauchent, fond animé.
- **Les captures sont assemblées écran par écran.** Une barre collée en haut est masquée après le premier écran ; un encart collant sur le côté est remis dans le flux le temps de la capture. La capture sert à juger, pas à mesurer une mise en page collante.
- **L'état « maintenu » de hold-to-play-music** et tout état au survol ou au focus ne sont pas mesurés.
- **Aucun essai au doigt** sur un vrai téléphone, aucun autre navigateur que Chrome.
- **Le script dépend d'un Chrome ou d'un Chromium installé.** Essayé avec le Chrome de Windows lancé depuis WSL ; non essayé sous macOS, sous Linux natif, ni avec Edge.
- **Hors du héros, la signature est mince** dans les trois résultats : la page tient par les couleurs, la typo et les composants. C'est la limite connue de l'étape 4b (gabarits du premier écran seulement), et elle se voit.
- **Séries de cartes de même forme** (formules, plats) : le skill les déconseille, deux agents en ont fait. Depuis, `check_studio.py` les signale en alerte (trois éléments ou plus de même forme côte à côte). C'est une alerte, pas une erreur : une vraie liste de même forme la déclenche aussi.
- **Cible tactile du nom dans la barre** (25 px) : corrigé après les essais, la zone cliquable fait `--k-hit-min` de haut sans changer la hauteur affichée.
- **Registre fonctionnel, couleurs de marque (`brand.md`), récit collant et article** : aucun essai ne les a exercés. La vérification de `brand.css` a été essayée à la main sur trois marques (bleu conforme, jaune pâle refusé, jaune accepté avec contour et drapeau à 0), jamais dans un projet complet ni sur capture.
- **Mode reprise** : essayé sur une page locale unique ; ni site en ligne, ni site à plusieurs pages.
