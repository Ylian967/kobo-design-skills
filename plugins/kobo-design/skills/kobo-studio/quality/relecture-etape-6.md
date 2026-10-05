# Relecture de l'étape 6

Passe de vérification faite avant le commit du second lot de composants, des essais React et des gabarits React. Date : 5 octobre 2026. Navigateur : Chrome (celui de la machine, piloté), 1440 et 390 px.

## 1. Couches de signature du second lot : huit skills relus

Méthode, pour chaque skill : relire `references/components.md`, puis regarder dans `components/gallery.html` les dix composants du second lot (sélection, case, radio, interrupteur, tableau, accordéon, pagination, fil d'Ariane, info-bulle, menu déroulant) à côté de deux écrans de `examples/demo.html`. Question posée : « si je cache le nom, est-ce encore ce skill, ou un composant générique à ses couleurs ? »

| Skill | Verdict | Ce qui était générique ou contraire | Corrigé |
|---|---|---|---|
| lore-frame-editorial | **corrigé** | Accordéon en texte courant, alors que le skill écrit ses accordéons de filtres en micro-labels mono (§17, « OREILLE + »). En-têtes de tableau sans le carré plein des labels (§3). Menu au survol gris, alors que le skill inverse le mot survolé et pose la page active sur citron (§14) | Intitulés d'accordéon en mono capitales ; carré plein devant chaque en-tête ; survol et focus du menu en bloc inversé ; choix coché sur citron ; cases à angles droits |
| acid-scan-security | **corrigé** | Lignes du tableau en police de texte, alors que le journal du skill est en mono (§9). Menu en simple boîte, sans les crochets d'angle des panneaux (§8) | Lignes du tableau en mono ; crochets d'angle autour du menu ; menu à angles droits |
| sticker-brutal-jp | **corrigé** | Accordéon en simples filets : contraire à « l'effet autocollant, base de presque tous les composants » | Chaque question est une fiche blanche cernée d'encre, à ombre dure |
| hyper-lime-street | **conforme** | Rien à reprendre : pagination dans une pilule noire, page courante cerclée de lime (c'est la « pilule de vignettes » du skill), panneaux blancs à liseré lime, police d'affiche sur les en-têtes, aucun texte lime sur clair | Le focus figé d'un numéro était invisible sur la pilule noire : contour lime |
| noir-inferno-chapters | **corrigé** | Fonds pleins au survol (accordéon, menu, numéros), contraires à « pas de fond de bouton » ; menu en boîte pleine ; fil d'Ariane en bas de casse dans une interface « en capitales très espacées » | Survols par un filet tracé dessous ; menu sur le noir de la page, à filet fin, en petites capitales ; fil d'Ariane en capitales espacées |
| retro-mission-poster | **conforme, une retouche** | Lignes de l'accordéon en gris : la « liste de faits » du skill est séparée par un filet rouge | Filets rouges entre les questions |
| zigzag-snack-pop | **conforme, deux retouches** | Tableau sans l'ombre dure que portent boutons et champs ; ligne choisie marquée d'un filet neutre | Ombre dure sous le tableau ; ligne choisie marquée d'orange |
| tiny-planet-toy | **corrigé** | Cases vides de la couleur du ciel, illisibles dans un tableau crème ; info-bulle sombre quelconque ; accordéon en filets, alors que « tout ce qui se clique a une épaisseur » ; menu sur le bleu du ciel | Cases et glissières sur crème ; info-bulle en étiquette bleue cernée (l'étiquette du nom de la boîte de dialogue) ; accordéon en fiches cernées à ombre décalée (la fiche de quartier) ; menu sur crème |

Ce que la relecture n'a **pas** changé, et pourquoi :

- **Les cases à cocher restent carrées sous noir-inferno** (« tout est rond ou linéaire ») : une case ronde ne se distinguerait plus d'un bouton radio.
- **La coche et le point restent de la couleur du texte**, jamais de l'accent : règle du composant, pour les skills à accent pâle.
- **Le champ de sélection de lore-frame** n'a pas le coin coupé du champ de recherche du skill : la couche du premier lot ne le donne pas non plus au champ texte ; à traiter avec lui.
- **Les quinze autres skills n'ont pas été relus** sur leur `components.md` : leur couche reporte ce qu'elle fait déjà sur le premier lot (voir `components/signatures/README.md`).

## 2. Captures « off » et grille anti-slop sur la galerie

**Captures `off`** (nocturne-architecture, sticker-brutal-jp, acid-scan-security, hyper-lime-street, serif-bistro-green, 1440 px, second lot entier) : regardées une à une. Les composants sont ceux de base, avec les couleurs, la typo et les rayons du skill ; aucune forme de signature ne reste. Deux défauts trouvés là, corrigés :

- **Boutons radio carrés sous acid-scan** (le skill n'a aucun arrondi) : indiscernables d'une case. Le rond du bouton radio ne dépend plus du rayon du skill.
- **Bulle figée ouverte qui passait sous son bouton** et recouvrait sa voisine : le placement jugeait la place par rapport à l'écran, alors que la bulle était hors de l'écran au chargement. Corrigé dans `info-bulle.js`.

**Grille anti-slop**, appliquée à `gallery.html` (premier et second lot) sous les 23 skills, à 1440 et 390 px. La galerie n'est pas un site : les points « héros », « parcours » et « images » de la grille ne s'appliquent pas.

| Point | Résultat | Détail |
|---|---|---|
| Défilement horizontal à 390 et 1440 px | conforme, mesuré (46 pages) | 0 px sur les 23 skills |
| Texte sous 12 px (Y3) | **corrigé** | Les textes de la galerie elle-même (intertitres, légendes, intro de section) tombaient à 10 ou 11 px sous cinq skills. Les composants, eux, étaient conformes. Après correction : 0 cas |
| Lignes de plus de 80 caractères (Y7) | **corrigé** | Les intros de section montaient à 97–136 caractères par ligne. Largeur ramenée à `--k-measure`. Après correction : 0 cas |
| Cibles tactiles de 44 px à 390 px | **corrigé** | Le bouton « … » du fil d'Ariane (24 px) et le terme à info-bulle (18 à 32 px) : zone cliquable portée à `--k-hit-min`. Après correction : 0 cas |
| `href="#"`, bouton sans `type`, image sans `alt`, plusieurs `<h1>` (T7, U10, T8, U12) | conforme | 0 de chaque |
| Texte de remplissage, faux chiffres (T1 à T4) | conforme | Données fictives annoncées en tête de galerie et dans la légende du tableau |
| Emoji ou symbole en guise d'icône (T5) | **exception, dite** | La coche « ✓ » d'une option choisie dans une liste multiple est un caractère : une `<option>` n'accepte ni image ni SVG. Les séparateurs du fil d'Ariane (« / », « // », « \ », « ✦ », « > ») sont des signes de ponctuation tirés de chaque skill, pas des icônes |
| Série de cartes identiques (K2) | conforme | Aucune série ajoutée ; les états figés sont des listes |
| Ombres et dégradés hors skill (F3, F5) | conforme | `check_components.py` : 0 erreur. Un dégradé et une ombre essayés pour l'option choisie ont été refusés par le script et retirés |
| Focus clavier visible (U8) | conforme, vu sur capture | États figés présents pour chaque composant interactif |
| Erreur écrite et reliée, état vide, désactivé, chargement (U2, U5, U6, U3) | conforme, essayé au clavier | Voir section 3 pour React ; HTML essayé à l'étape 6 |
| Mouvement réduit (M5) | conforme | Aucun mouvement de signature sur le second lot ; transitions coupées sous `prefers-reduced-motion` dans chaque feuille |

Non fait : la partie « capture pleine page relue à l'œil » n'a porté que sur 13 skills (les cinq en `full` et `off`, les huit de la section 1). Les dix autres ne sont couverts que par les mesures.

## 3. React, rejoué sous trois autres skills

Le banc `quality/banc-react/` (compilé une fois, servi en fichiers) avait été joué sous glass-frame-estate seulement. Rejoué sous **tiny-planet-toy** (objet 3D, tout a une épaisseur), **sticker-brutal-jp** (forme forte, ombres dures) et **acid-scan-security** (sombre, mono, angles droits).

| Essai | tiny-planet-toy | sticker-brutal-jp | acid-scan-security |
|---|---|---|---|
| 20 composants au clavier (14 parcours : menu mobile, onglets, modale, notification, sélection, cases, radios, interrupteur, tableau, accordéon, pagination, fil d'Ariane, info-bulle, menu déroulant) | 14 sur 14 après correction | 14 sur 14 après correction | 14 sur 14 après correction |
| 5 pages de structure à 1440 px (accueil, page intérieure, landing, article, récit) | aucun débordement, un seul `<h1>`, aucune image cassée | idem | idem |
| Les mêmes à 390 px, menu mobile ouvert puis fermé au clavier | conforme, 5 sur 5 | conforme, 5 sur 5 | conforme, 5 sur 5 |
| Erreurs de console | 0 | 0 | 0 |

**Ce qui a cassé, et qui est corrigé :**

- **Menu déroulant : le focus n'allait pas au premier choix à l'ouverture** sous les trois skills (il y allait sous glass-frame-estate). Le composant attendait une image d'animation pour le donner ; quand la fenêtre est masquée ou lente, cette image n'arrive pas à temps et le clavier reste sur le bouton. Le focus est maintenant donné dès que le menu est rendu. Le script HTML n'avait pas ce défaut.
- **Texte du héros qui ne suivait plus les props** une fois le gabarit posé. `Gabarits.jsx` calcule une empreinte du contenu des parts ; quand elle change, ou quand `data-k-intensity` ou `data-k-skill` change sur `<html>`, l'emplacement est remonté et le gabarit reposé. Essayé sous `StrictMode` avec cinq skills (serif-bistro-green et signal-orange-techwear, qui découpent le titre ; pocket-device-noir et tiny-planet-toy, en 3D ; sticker-brutal-jp) : deux changements de titre de suite s'affichent, le passage à `off` rend le contenu neutre avec le titre en cours, le retour à `full` repose le gabarit. Aucune erreur.

**Faux échec du premier passage :** « onglets » sous deux skills. Le test lisait le focus 130 ms après la touche ; rejoué avec un délai plus long, la flèche déplace bien le focus. Défaut du test, pas du composant.

**Vu sur capture** (accueil, landing, article à 1440 px, sous les trois skills) : chaque page porte les couleurs, la typo et les formes de son skill ; rien de cassé.

**Non essayé :** les 19 autres skills en React ; les gabarits autres que héros photo et objet 3D ; un vrai téléphone ; un autre navigateur que Chrome.

## 4. Mots géants

Règle écrite dans `ux/templates/README.md` (« Mots géants ») et dans `SKILL.md` ; appliquée par `titre-geant.js` et par le héros de nocturne-architecture ; signalée par `check_studio.py`.

- Le mot vient de `data-k-word`, sinon du surtitre, dont les articles et mots vides de tête sont retirés. Plus jamais du titre.
- Moins de trois lettres, ou pas de surtitre : pas de mot géant, le titre reste neutre.
- Aucun mot ne dépasse une fois et demie le plus petit de la page.

Essayé sur une landing nocturne-architecture posée par `kit.py` : « Le déroulé » donne « déroulé », à la même taille que « pratique » ; un `data-k-word="le"` posé exprès s'affiche plafonné et déclenche l'alerte « mot géant « le » (2 lettres) ».

Limite : l'exemple `examples/festival-lyon/` garde sa copie du kit d'avant la règle (son « lieu » énorme vient de là) ; il n'a pas été reposé.

## 5. Bulles figées ouvertes à 390 px

Les deux bulles figées ouvertes de la galerie (« ouverte », « dessous »), mesurées à 390 px sous les 23 skills, en `full` et en `off`.

| Passage | Mesures | Bulles hors de l'écran |
|---|---|---|
| Après la première correction (placement au chargement de la fiche) | 46 | 0 |
| Après la correction du basculement (section 2), deux passes à des délais différents | 92 | **2, par intermittence** : acid-scan-security (bulle à −36 px du bord gauche) et sticker-brutal-jp (bulle collée au bord droit, 2 px de défilement) |
| Après la dernière correction, trois passes à 400, 900 et 1 500 ms sur les huit skills les plus sensibles (dont ces deux-là) | 48 | 0 |

La cause des deux cas : la bulle était placée une fois, puis une police arrivait et déplaçait son bouton sans que rien ne la replace. `info-bulle.js` replace maintenant une bulle ouverte quand sa largeur ou celle de son déclencheur change, quand un lot de polices finit de charger, et à la fin du chargement de la page.

Non refait : la passe complète sur les 23 skills après cette dernière correction (seuls huit skills ont été remesurés).
