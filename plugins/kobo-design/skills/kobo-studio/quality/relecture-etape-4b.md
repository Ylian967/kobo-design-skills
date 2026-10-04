# Relecture de l'étape 4b — gabarits de signature, premier lot

Six skills, un par famille. Même question qu'à l'étape 3 bis : **nom caché, est-ce que je reconnais le skill ?** Cette fois avec les gabarits posés dans une structure, en full à 1440 px, à côté du premier écran de la démo du skill.

## Verdicts

| Skill | Gabarit (emplacement) | Structure regardée | Verdict | Ce qui fait reconnaître | Ce qui manque encore |
|---|---|---|---|---|---|
| **acid-scan-security** | héros photo et scan (`hero`) | landing produit | **oui** | Photo en vert de vision nocturne, bande claire, cadre jaune, réticule, lignes de balayage, titre en police de terminal : c'est l'écran de la démo | Le sujet : la démo scanne un regard, la photo du projet montre des tentes ; le repère se pose où `data-k-mark` le dit. Carte d'action à crochets, chiffres binaires, décodage des lettres |
| **glacial-mono-3d** | scène 3D (`backdrop`) | landing produit | **oui** | L'amas d'éclats de glace, les fragments en suspension, le brouillard clair : la même scène, derrière la page | L'interface aux quatre coins (ici la page garde sa mise en page), le voyage par la nuit, le texte en pavés |
| **noir-inferno-chapters** | scène plein écran et cercle à tirer (`chapter`) | récit | **oui** | Image en noir et blanc plein cadre, titre en capitales à empattements au centre, cercle sur sa ligne pointillée | Le grain et la poussière ; le fondu sur place d'une scène à l'autre (ici la page défile) ; trois paragraphes là où la démo n'en a qu'un |
| **lore-frame-editorial** | cadre de page (`frame`) et planches (`media`) | article | **en partie** | Le cadre à 20 px du bord, le rail et son signe en étoile, la barre où avance la progression, l'image en forme de dossier | Le premier écran de la démo est un visage plein cadre sous un manifeste en mots géants : c'est un gabarit `hero`, pas encore écrit |
| **hyper-lime-street** | formes inclinées (`chapter`) | récit | **en partie** | Le bloc lime numéroté qui sort à gauche, le panneau blanc à liseré, l'image découpée à 41°, la bande noire tramée : ce sont les sections 02 à 06 de la démo | Le premier écran de la démo (visuel clé à coins ronds, autocollants, pellicule en diagonale, mot vertical) : un gabarit `hero` |
| **nocturne-architecture** | mot géant coupé (`title`) | accueil du site vitrine | **en partie** | Le mot en minuscules, d'un bord à l'autre de son bloc, coupé par le bas | La photo de ville la nuit derrière le mot : dans la démo le mot est posé en bas du héros ; ici il ouvre chaque section, sur fond uni. Il faut le gabarit `hero` pour retrouver le premier écran |

Trois « oui », trois « en partie », aucun « non ». Les trois « en partie » ont la même cause : le premier écran de leur démo est un héros, et ce lot leur donnait un autre emplacement.

## Fluidité mesurée

Chrome, fenêtre de 1440 × 900, écran à plus de 60 Hz. Mesure : nombre d'images par seconde pendant 3 s, et images de plus de 34 ms (c'est-à-dire sous 30 images par seconde).

| Gabarit | Situation | Images par seconde | Images de plus de 34 ms | Pire image |
|---|---|---|---|---|
| acid-scan · héros | souris en mouvement | 56 | 0 | 28 ms |
| noir-inferno · scène | souris en mouvement | 67 | 2 | 35 ms |
| noir-inferno · scènes | défilement, 1er passage | 122 | 0 | 21 ms |
| glacial · scène 3D | souris en mouvement | 104 | 0 | 14 ms |
| glacial · scène 3D | défilement | 75 | 1 | 35 ms |
| lore-frame · cadre et planches | défilement | 139 | 0 | 14 ms |
| hyper-lime · formes | défilement, 1er passage | 76 | 16 | 49 ms |
| hyper-lime · formes | défilement, 2e passage | 109 | 0 | 21 ms |
| nocturne · mots géants | défilement | 143 | 0 | 14 ms |

- La scène 3D est rendue à 30 images par seconde par choix (elle couvre l'écran) ; le reste de la page reste à la cadence de l'écran. Résolution du canvas : pleine (1425 × 900), jamais abaissée pendant la mesure.
- **hyper-lime, premier passage** : 16 images lentes, le temps que les photos des panneaux arrivent et soient découpées. Au second passage, aucune.
- noir-inferno : avant de rendre le décodage des images asynchrone, le premier défilement comptait 18 images lentes (pire : 83 ms).
- Les chiffres varient d'un passage à l'autre : la souris et la molette sont simulées, pas tenues par une main.

## Autres vérifications

| Contrôle | Résultat |
|---|---|
| `check_components.py` (étendu à `ux/templates/`), `check_contract.py` | 0 erreur ; 23 fiches valides |
| Erreurs de script pendant tous les passages | aucune |
| 390 px, 11 combinaisons skill × structure, page parcourue en entier | aucun débordement, aucun texte sous 12 px |
| `reduced`, 6 skills | gabarits posés, aucune tâche dans la boucle, aucun élément en attente d'entrée |
| `off`, et « gabarits : neutres », 6 skills | aucun gabarit : contenu neutre |
| Boucle d'animation | une seule ; 1 tâche pour acid, glacial ; 5 pour noir (une par scène, active seulement à l'écran) |
| Cuisson des couleurs (acid) | 4 canvas calculés une fois ; rien n'est filtré à chaque image |
| Scène 3D | chargée après la page ; `data-k-ready` posé ; photo de repli visible avant |

### Clavier seul, sur le geste

Cercle à tirer de noir-inferno :

- Le cercle est un bouton de 52 px, nommé « Chapitre suivant : La forêt, puis plus de forêt », avec un contour de focus.
- **Entrée** : la page va au chapitre 2 et le focus se pose sur son titre. **Tab** : on arrive au cercle suivant. **Espace** : même effet qu'Entrée.
- **Geste** (souris tenue, tirée de 150 px) : la cible s'allume passé 80 % de la course ; au relâcher, la page va au chapitre suivant et le focus suit.
- Dernier chapitre : le bouton s'appelle « Suite du récit : La prochaine nuit est le samedi 14 février » et conduit à la dernière section.

Les autres gabarits n'ont pas de geste.

## Ce qui a été difficile

- **Glacial : une scène pensée sans page.** La démo est un écran fixe dont le texte change de couleur quand la scène passe à la nuit. Derrière une page qui a son propre texte sombre, la nuit rendait ce texte illisible : le passage par la nuit et le rocher sombre ne sont pas repris, et un voile clair de 36 % couvre la scène. Le texte du héros passe encore devant des facettes grises.
- **Acid : le scan a besoin d'un sujet.** Le gabarit cuit n'importe quelle photo, mais la bande et le cadre doivent tomber quelque part : deux attributs sur l'image (`data-k-focus`, `data-k-mark`) le disent. Sans eux, les repères tombaient sur le titre.
- **Cadre de lore-frame : ne pas déplacer la navigation.** Dans la démo, les liens sont dans la barre du cadre. Ici la barre de la structure est seulement logée dans le cadre (fond transparent, la progression passe derrière) ; le bouton de menu et le bouton de son du rail ne sont pas repris.
- **Mot géant : le mesurer.** Sa taille dépend de la largeur du mot dans la police du skill ; elle est calculée une fois par bloc et à chaque changement de largeur, jamais à chaque image.
- **Seuils sans point de rupture.** Le rail du cadre et le retrait du texte sous les formes inclinées disparaissent sur écran étroit par un `clamp()` qui bascule à 6 × `--k-space-32`.
- **Trouvé en route** : `scrollIntoView` et la tabulation (étape 4a) ; le décodage d'images plein écran qui bloquait le défilement.

## Non vérifié

- Chaque gabarit a été regardé dans **une** structure à 1440 px ; les autres combinaisons ne sont couvertes que par les mesures à 390 px.
- À 390 px : une capture pour acid, noir et hyper-lime ; aucune pour glacial, lore-frame et nocturne.
- Les mouvements d'entrée (allumage et bande d'acid, lettres de nocturne, formes de hyper-lime, titre de noir) n'ont pas été vus image par image : seul leur état final l'a été.
- `prefers-reduced-motion` : même chemin que `reduced` dans le code, non essayé avec le réglage du système.
- Geste au doigt (écran tactile) sur le cercle : non essayé.
- Contraste en full, scène en mouvement : mesuré seulement sur image fixe.
- Fluidité de hyper-lime au premier défilement : non résolue (voir plus haut).
- Pas de version React des gabarits.

## Corrections après validation du premier lot

### 1. Gabarit de premier écran pour les trois « en partie »

Chacun reçoit un gabarit `hero` (famille `hero-photo`), pris dans le premier écran de sa démo. Comparaison refaite sur l'accueil du site vitrine, en full à 1440 px.

| Skill | Gabarit ajouté | Nouveau verdict | Raison |
|---|---|---|---|
| **lore-frame-editorial** | manifeste géant : photo plein cadre dans le cadre de page, court texte en haut à gauche, titre en capitales géantes sur trois lignes à repères | **oui** | Avec le cadre, le rail et le manifeste, c'est l'ouverture de la démo. Manque : le découpage de l'image en planche au défilement |
| **hyper-lime-street** | visuel clé à coins ronds, titre posé dessus, autocollant noir de la marque, autocollant blanc qui porte l'action, pellicule en diagonale, nom vertical | **oui** | C'est le premier écran de la démo. Manque : les boutons de plateformes, la seconde ligne du titre en lime |
| **nocturne-architecture** | photo plein cadre sous ses voiles, texte et action en haut à gauche, premier mot de la marque géant et coupé en bas | **oui** | La composition est celle de la démo. La photo est celle du projet (montagne de jour), pas une ville la nuit : la reconnaissance tient au mot coupé et à la mise en page |

Bilan du premier lot : **six « oui »**.

### 2. Contraste du texte posé sur image ou sur scène

Mesure faite pixel par pixel (capture de la zone de chaque texte, texte masqué), en gardant le **pire** pixel, pas la moyenne. Seuils : 4.5:1, ou 3:1 pour un texte d'au moins 24 px.

Première mesure : glacial passait sous le seuil (phrase d'appui 3.3, légende 3.0), mais aussi quatre des cinq autres héros — nocturne 1.9, lore-frame 1.1, acid-scan 1.3, phrase d'acid 2.6.

Corrigé sans toucher aux scènes ni aux photos :
- **glacial** : le texte du héros est posé sur une plaque du fond du skill à 80 % ; la légende de la photo aussi.
- **famille héros photo** : une plaque de lisibilité derrière la colonne de texte, de la couleur du fond pour lequel le texte est prévu, à 74 % ; elle prend toute la largeur sur écran étroit. Chaque habillage règle sa forme (lore-frame : par le bas, sous le manifeste).
- **hyper-lime** : voile du visuel renforcé sous le titre.

| Après correction (pire pixel) | 1440 px | 390 px |
|---|---|---|
| glacial | surtitre 4.9, titre 7.3, phrase 5.0, faits 5.8 à 7.3, légende 7.4 | surtitre 4.9, titre 7.5, phrase 5.1, faits 7.2 à 7.4 |
| acid-scan | de 8.7 à 15.4 | de 8.0 à 15.1 |
| nocturne | de 11.0 à 15.7 | de 8.7 à 13.2 |
| lore-frame | de 7.2 à 14.9 | de 5.1 à 14.5 |
| hyper-lime (titre sur le visuel) | 11.2 | — |
| noir-inferno (scènes 1 et 2) | de 5.1 à 5.6 | — |

Mesuré en `reduced` (image fixe). En full, la scène de glacial bouge derrière la plaque : la marge mesurée est de 0,4 point sur le surtitre.

### 3. Préchargement et fluidité de hyper-lime

Le moteur demande et décode maintenant les photos d'un emplacement **un écran avant** leur arrivée (tous les gabarits).

Remesure du premier défilement de hyper-lime : **toujours 15 à 21 images lentes** (pire : 56 à 70 ms) sur trois essais. En `reduced`, sans les entrées : **aucune** image lente, comme sur le récit neutre. La cause n'est donc pas le chargement des photos mais le mouvement d'entrée des formes. Essayé sans gain : une couche par forme pendant l'entrée. Les essais suivants (sans trame, sans découpe, sans fondu) n'ont pas pu conclure : la fenêtre du navigateur est passée à l'arrière-plan pendant la série et la cadence est tombée à une image par seconde, puis à 37 sur une page neutre. **Non résolu.**

### 4. Replis déclenchés pour de bon

| Repli | Déclenché par | Résultat |
|---|---|---|
| WebGL absent (glacial) | contexte WebGL refusé au navigateur | Pas de canvas ; la photo de repli (iceberg en noir et blanc) reste, sous le voile ; le texte garde sa plaque. Page lisible et tenue |
| Hors ligne : photos et CDN bloqués | requêtes vers Unsplash et jsdelivr annulées | glacial : fond de brume, emplacement de la photo du héros en bloc gris avec son texte alternatif. acid : fond vert sombre, réticule et cadre restent. noir : scènes noires, texte et cercle. hyper-lime : formes sans image. lore-frame : fond lavande sombre, manifeste. nocturne : fond nuit, mot géant. Aucune icône d'image cassée dans un gabarit |
| Canvas refusé (acid) | requête de cuisson (CORS) annulée, l'image ordinaire passe | Aucun canvas ; la photo reste affichée avec le filtre vert du skill ; bande, cadre et réticule ne se posent pas sur des couches absentes ; l'entrée se termine |

Corrigé à cette occasion : une image absente dans un gabarit est masquée (attribut `data-k-broken`) au lieu d'afficher une icône ; dans une structure neutre, elle laisse un bloc calme avec son texte alternatif.

Limite : une image pas encore demandée (plus bas dans la page) n'est marquée absente qu'à son tour.

## Pour les 17 autres skills

Familles déjà là, à habiller : `hero-photo` (alpine, nocturne, pocket, glass-frame, pixel-lime, serif-bistro, mint, zigzag), `cadre` (retro-mission, sticker-brutal, showroom, glass-frame), `scene` (tiny-planet, chrome-atelier), `chapitre-ecran` (heritage-lens, hold-to-play), `formes-inclinees` (anime-x-slash, retro-mission), `titre-geant` (signal-orange, mint, zigzag, pocket), `image` (pixel-lime, heritage-lens, acid).

Familles à créer : fond et fil de page (cosmic, zigzag, serif-bistro), grilles particulières (showroom, anime, glass-frame).

