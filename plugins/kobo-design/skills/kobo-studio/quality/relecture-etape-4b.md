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


---

# Second lot : les 17 autres skills

Règle : chaque skill reçoit d'abord le gabarit de son **premier écran**, puis ses autres signatures. Travail par paquets de quatre, chacun vérifié avant le suivant : capture à côté du premier écran de la démo (accueil du site vitrine, full, 1440 px), fluidité, 390 px, contraste au pire pixel du texte posé sur image.

Toutes les mesures de contraste sont faites en `reduced` (image fixe), à 1440 et 390 px. Fluidité : 2,5 s de souris en mouvement puis 2,5 s de défilement ; « lentes » = images de plus de 34 ms.

## Paquet 1 — alpine-glass, pocket-device, glass-frame, mint-street

Famille réutilisée : `hero-photo`, quatre habillages.

| Skill | Verdict | Ce qui fait reconnaître | Ce qui manque | Fluidité | 390 px | Contraste (pire pixel) |
|---|---|---|---|---|---|---|
| **alpine-glass-expedition** | **oui** | Photo plein cadre, voile diagonal brume → bleu profond, titre géant à empattements en capitales en bas | La sphère de verre qui suit le pointeur, les puces, la note du site d'origine, la brume en canvas | 0 lente | aucun débordement | 7.5 à 13.9 |
| **pocket-device-noir** | **en partie** | Photo qui fond au noir, titre géant centré en bas, phrase et bouton centrés, grand cercle d'un filet | L'objet en 3D au centre de la photo : c'est le sujet de la démo, et le projet ne fournit aucun modèle | 0 lente | aucun débordement | 9.4 à 16.7 |
| **glass-frame-estate** | **oui** | Photo dans un cadre à filet, mot-marque en capitales derrière le voile, titre en bas à gauche, bouton large à flèche en bas à droite | Le sujet détouré qui passe devant le mot, les cellules de verre (données du site d'origine), le fond flouté | 0 lente | aucun débordement | 9.4 à 11.7 |
| **mint-street-basics** | **oui** | Fond bleu nuit, titre géant en capitales blanc → argent, disque vert, photo dans son arche | Le titre ne passe devant le disque que sous un voile (lisibilité) ; bandeau défilant, étoiles et chiffres du site d'origine | 0 lente | aucun débordement | titre 4.2 (1440), 9.5 (390) ; surtitre 16.4 |

Corrigé pendant le paquet : la géométrie des disques de mint-street (ils vivent dans la partie droite du héros) ; le surtitre, placé là où la plaque s'estompait, passait sous 4.5:1 dans trois héros — la plaque reste dense sous tout le texte et ne s'estompe qu'au-dessus.

## Paquet 2 — zigzag-snack, serif-bistro, pixel-lime, signal-orange

Famille réutilisée : `hero-photo`, quatre habillages.

| Skill | Verdict | Ce qui fait reconnaître | Ce qui manque | Fluidité | 390 px | Contraste (pire pixel) |
|---|---|---|---|---|---|---|
| **zigzag-snack-pop** | **oui** | Héros orange, titre géant blanc centré, photo à bord blanc épais et ombre dure, penchée | Le bord en dents de scie, le tampon rond, le slogan jaune ; la photo est sous le titre, pas à cheval dessus | 0 lente | aucun débordement | titre 3.2 (grand texte) ; surtitre et phrase posés sur une étiquette blanche (paire du contrat) |
| **serif-bistro-green** | **en partie** | Très grand titre à empattements, photo dans une arche à filet épais, phrase et bouton à droite | L'arche ne remonte pas dans le titre : dans la démo les mots s'écartent pour lui laisser la place, ce qu'un titre libre ne permet pas ; l'assiette ronde | 0 lente | aucun débordement | 9.1 partout |
| **pixel-lime-portfolio** | **en partie** | Photo noir et blanc plein cadre, titre en minuscules en bas à gauche, phrase et bouton lime en bas à droite | La bande de mosaïque en pixels lime sur la photo : c'est le signe de la démo | 1 lente (35 ms) | aucun débordement | 12.8 à 16.2 |
| **signal-orange-techwear** | **oui** | Titre empilé en capitales (ligne orange, ligne creuse au contour, lignes pleines), silhouette noir et blanc en colonne au centre | Les panneaux de caractéristiques à droite, le texte vertical, la pilule de changement de silhouette | 0 lente | aucun débordement | 8.1 à 19.3 |

Corrigé pendant le paquet : blanc sur orange (3,2:1) et brun sur orange (3,0:1) ne tiennent pas pour un petit texte sous zigzag ; à 390 px le texte de signal-orange passait sur la silhouette (1.2 à 1.8) — la plaque prend toute la largeur ; le titre de serif-bistro passait devant la photo claire (1.1) — l'arche reste sous le titre.

## Paquet 3 — sticker-brutal, retro-mission, showroom-bento, cosmic-voyage

Familles réutilisées : `hero-photo` (quatre habillages) et `cadre` (deux habillages : sticker-brutal, retro-mission). La famille `cadre` a été étendue : épaisseur du filet et retrait réglables, rail et barre facultatifs.

| Skill | Verdict | Ce qui fait reconnaître | Ce qui manque | Fluidité | 390 px | Contraste (pire pixel) |
|---|---|---|---|---|---|---|
| **retro-mission-poster** | **oui** | Cadre crème épais autour de l'écran, affiche plein écran, titre géant incliné en haut à droite, logo rouge espacé, bouton crème | La photo en aplats granuleux (un fichier préparé, pas un filtre), l'anneau dentelé, le passage par crans | 0 lente | aucun débordement | phrase 8.7 à 12.1 ; **titre non mesuré** : sa boîte, inclinée, est traversée par le cadre crème, de la couleur du texte — la mesure rend 1.0 et ne dit rien du fond réel |
| **sticker-brutal-jp** | **en partie** | Cadre d'encre épais à coins ronds, titre en capitales très grasses, photo en autocollant penché à ombre dure | Les autocollants de couleur à cheval sur le cadre et autour de la photo, le titre japonais, le texte vertical : ce sont eux qui font l'écran de la démo | 0 lente | aucun débordement | texte sur fond uni (paires du contrat) |
| **showroom-bento** | **en partie** | Barre de pilules, titre centré, image dans une tuile arrondie sur un halo de lumière | Le produit détouré sur son sol de studio (le projet fournit une photo rectangulaire), la rangée bento, les pastilles de teinte | 0 lente | aucun débordement | texte sur fond uni (paires du contrat) |
| **cosmic-voyage** | **en partie** | Photo plein écran entre deux voiles de nuit, titre en haut à gauche, action centrée en bas, barre à lien bleu et bouton doré | Le ciel étoilé : c'est la photo qui fait la démo, et celle du projet est une montagne de jour ; la frise du voyage | 0 lente | aucun débordement | 5.2 à 13.4 |

Corrigé pendant le paquet : le bouton de retro-mission étiré par la grille ; le titre de sticker-brutal, trop grand, coupait un mot.

## Paquet 4 — anime-x-slash, heritage-lens, hold-to-play, chrome-atelier

Famille réutilisée : `hero-photo`, quatre habillages.

| Skill | Verdict | Ce qui fait reconnaître | Ce qui manque | Fluidité | 390 px | Contraste (pire pixel) |
|---|---|---|---|---|---|---|
| **anime-x-slash** | **oui** | La photo découpée en éclats biaisés à filet intérieur, le titre rouge géant en capitales condensées | Le logo penché à barre oblique, les formes de couleur derrière les éclats, le changement de personnage ; cinq éclats de la même photo, là où la démo en montre cinq différentes | 0 lente | aucun débordement | titre 3.3 et 3.2 (grand texte) ; reste 17.6 à 18.9 |
| **chrome-atelier** | **oui** | Héros nuit, photo à droite sous son voile, cercles et axes de cadrage d'un filet, petit titre en capitales | La pièce en 3D sur sa planche (second écran de la démo), la barre de caractéristiques, le décalage ligne à ligne du titre | 0 lente | aucun débordement | 5.6 à 12.2 |
| **heritage-lens** | **en partie** | Scène plein écran, texte centré, titre en or dans la police d'affiche | La lentille avant / après, l'anneau de dentelle, les points de navigation : la démo ouvre sur une phrase, pas sur un titre | 0 lente | aucun débordement | titre 3.9 (grand texte) ; reste 6.2 à 8.3 |
| **hold-to-play-music** | **en partie** | Écran unique en noir et blanc, texte centré, touche en pilule à contour | Le mot peint à la main (une image), les plans vidéo, le geste « maintenir pour jouer » : la touche est ici un lien ordinaire | 0 lente | aucun débordement | 10.0 à 11.7 |

Corrigé pendant le paquet : la plaque délavait les éclats d'anime (elle ne sert plus que sur écran étroit) ; les lettres du titre de heritage, animées une à une, coupaient les mots ; la plaque de hold-to-play dessinait une bande visible (remplacée par un voile uni) ; la phrase de chrome passait à 4.4.

## tiny-planet-toy — non fait

Le premier écran de sa démo est une planète en 3D construite pièce par pièce (maisons, arbres, phare, route), sur 90 lignes de code serré et une douzaine de couleurs. La reprendre fidèlement dans la famille `scene` demandait une lecture et un portage que je n'ai pas menés à bout dans ce lot ; une planète simplifiée aurait été une invention. **Ce skill n'a donc aucun gabarit** : ses emplacements rendent leur contenu neutre.

## Bilan du second lot

16 skills sur 17 ont le gabarit de leur premier écran. **8 « oui »** (alpine-glass, glass-frame, mint-street, zigzag, signal-orange, retro-mission, anime-x-slash, chrome-atelier), **8 « en partie »** (pocket-device, serif-bistro, pixel-lime, sticker-brutal, showroom, cosmic, heritage, hold-to-play), **1 non fait** (tiny-planet). Avec le premier lot : 14 « oui » sur 23.

Les « en partie » se rangent en trois causes :
- **le sujet dépend de la photo ou d'un objet que le projet ne fournit pas** : pocket-device (objet 3D), showroom (produit détouré), cosmic (ciel étoilé), hold-to-play (mot peint, vidéo) ;
- **une pièce de signature reste à écrire** : pixel-lime (mosaïque), heritage (lentille), sticker-brutal (autocollants) ;
- **le gabarit a dû céder à la lisibilité** : serif-bistro (l'arche ne remonte plus dans le titre).

### Familles créées ou étendues

Aucune famille créée. Étendues :
- `hero-photo` : 16 habillages de plus (20 en tout). Ajouts à la famille : variante et retouche par habillage, repère distinct du cadrage (`data-k-mark`), plaque de lisibilité horizontale ou verticale, qui prend toute la largeur sur écran étroit, mots et lettres d'un titre qui montent à l'ouverture.
- `cadre` : 2 habillages de plus (sticker-brutal, retro-mission) ; épaisseur et retrait du filet réglables, rail et barre facultatifs.
- Moteur : préchargement des photos un écran avant, image absente masquée.

### Ce qui n'a pas été fait dans ce second lot

La consigne demandait, après le premier écran, « les autres signatures selon la répartition par famille ». **Seul le premier écran est fait.** Restent, par famille :
- `image` : mosaïque de pixel-lime, lentille de heritage, couches d'acid sur les autres photos ;
- `chapitre-ecran` : heritage-lens, hold-to-play ;
- `formes-inclinees` : anime-x-slash (grille en parallélogrammes), retro-mission ;
- `titre-geant` : signal-orange, mint-street, zigzag, pocket-device ;
- `scene` : tiny-planet, pièce 3D de chrome-atelier ;
- à créer : fond et fil de page (cosmic, zigzag, serif-bistro), grilles particulières (showroom, anime, glass-frame).

### Fluidité la plus faible du second lot

pixel-lime : 1 image de 35 ms au défilement. Les 15 autres : aucune image lente. Aucun de ces héros n'a de tâche dans la boucle d'animation ; leurs mouvements sont des entrées jouées une fois.
Sur les deux lots, le point faible reste **hyper-lime au premier défilement** (15 à 21 images lentes), non résolu.

### Non vérifié dans ce second lot

- Chaque héros n'a été regardé que sur l'accueil du site vitrine ; pas sur la landing, où le héros porte une liste de faits que plusieurs habillages masquent.
- Les entrées (mots qui montent, éclats, disques, arche) : seul leur état final a été vu.
- Les replis (image absente, hors ligne) n'ont pas été redéclenchés sur les 16 nouveaux habillages ; ils passent par le même code que le premier lot.
- Le titre incliné de retro-mission : contraste non mesuré (sa boîte est traversée par le cadre crème).
- Contraste mesuré en `reduced` seulement.
- Clavier : aucun de ces héros n'a de geste ; l'ordre de tabulation n'a pas été reparcouru.
- `reduced` et `off` n'ont pas été recontrôlés skill par skill pour ce lot.

---

# Dernier lot : pièces uniques et reprises

## 1. Pièces uniques — quatre faites sur huit

Reprises du code des démos (lecture seule), adaptées aux rôles `--k-*`.

| Skill | Pièce | État | Comment |
|---|---|---|---|
| **tiny-planet-toy** | la planète 3D | **fait** | Nouvelle famille `objet` (objet 3D dans le héros). La scène de la démo est portée telle quelle : ombrage à trois paliers, contour d'encre, maisons, arbres, phare, bateau, graine 7. Seul écart : la fusion des géométries est écrite sur place (le module de three.js demandait une table d'import). On la tourne en la tirant, ou avec deux boutons, ou aux flèches. Repli : sans WebGL ou hors ligne, la scène n'occupe aucune place et la photo du héros tient seule |
| **pixel-lime-portfolio** | la mosaïque de pixels | **fait** | Fonction de la démo reprise : 11 rangées, densité 0,5, graine 7, plus dense au centre ; allumage par vagues puis cinq blocs toutes les 900 ms, cadence tenue par la boucle commune |
| **cosmic-voyage** | la photo de ciel étoilé | **fait** | La photo de la démo (Unsplash, Voie lactée) devient le fond de page (famille `scene`, sans 3D). Le héros est transparent ; la photo du projet reste, dans un cadre |
| **sticker-brutal-jp** | les autocollants de couleur | **fait** | Quatre formes de la démo (tracés identiques) à cheval sur le cadre : carré bleu à étoile, demi-anneaux vert et bleu, rond rose à spirale, rond rouge |
| **pocket-device-noir** | l'objet 3D | **non fait** | La famille `objet` est prête à le recevoir ; le code de l'appareil (65 lignes, textures d'écran et de grille) n'est pas porté |
| **heritage-lens** | la lentille | **non fait** | — |
| **hold-to-play-music** | le mot peint et le geste « maintenir » | **non fait** | — |
| **showroom-bento** | le produit détouré et la rangée bento | **non fait** | — |

## 2. serif-bistro-green : l'arche remonte dans le titre

Le titre est coupé en deux lignes de deux moitiés, écartées de la largeur de l'arche — la construction de la démo (`justify-content: space-between`, `gap: --arch-w`). L'arche remonte entre les moitiés : le texte ne passe jamais devant la photo, aucune plaque n'est nécessaire.

Garde-fou : le script mesure la distance à remonter et vérifie qu'aucun texte ne se trouve devant l'arche ; sinon elle reste sous le texte. Constaté : sur la landing (« Une nuit / sous la · tente, au-dessus / des nuages ») l'arche remonte ; sur l'accueil, dont le titre est plus long, le garde-fou la laisse dessous. Sur écran étroit, le titre se remet en lignes.

## 3. Lisibilité : la solution retenue pour chaque héros

Mesure au pire pixel, à 1440 et 390 px, sur la landing (surtitre, titre, phrase, faits, légende).

| Skill | Solution | Plaque ? | Pire contraste mesuré |
|---|---|---|---|
| acid-scan | voile vert du skill renforcé à gauche, texte à gauche du sujet | plaque horizontale, couleur du fond vert | 7.8 |
| alpine-glass | voile du skill : la démo fonce déjà le bas vers le bleu profond ; le texte y est posé | oui, verticale, bleu profond | 7.7 |
| anime-x-slash | texte à gauche sur le fond uni, éclats à droite | seulement sur écran étroit | titre 3.3 (grand) |
| chrome-atelier | voile nuit de gauche à droite du skill, renforcé ; texte à gauche | seulement sur écran étroit | 5.6 |
| cosmic-voyage | le ciel étoilé n'a aucune zone calme (1.0 sur une étoile) : texte dans un panneau de nuit à filet doré, le « verre peint » du skill | panneau habillé | 12.0 (après correction) |
| glacial-mono | texte du héros sur une plaque du fond du skill | oui, fond de brume | 4.9 |
| glass-frame | voile sombre du skill sous le texte, dans le cadre | oui, verticale, ombre du skill | 8.9 |
| heritage-lens | voile uni sur toute la photo (la démo assombrit sa scène) | non | titre 3.8 (grand) ; reste 5.9 |
| hold-to-play | voile uni sur toute la photo, pas de boîte | non | 10.5 |
| hyper-lime | titre sur le bas du visuel, que le skill fonce ; le reste sous le visuel, sur le fond de page | non | 11.2 |
| lore-frame | voile par le bas sous le manifeste, voile du haut sous le court texte | deux voiles, pas de boîte | 4.8 |
| mint-street | voile bleu nuit sur le haut du héros ; faits et légende sur un cartouche arrondi | cartouche | 9.5 (1.4 et 3.2 avant correction, à 390 px) |
| nocturne | voiles du skill (haut et gauche) renforcés | oui, horizontale | 11.1 |
| pixel-lime | voile noir du bas du skill | oui, verticale, noire | 12.8 |
| pocket-device | la photo fond au noir, comme dans la démo | oui, verticale, noire | 8.7 |
| retro-mission | voile haut et bas sur l'affiche | voile | phrase 8.7 ; **titre : mesure non concluante** |
| serif-bistro | composition : le titre s'écarte autour de l'arche | **non** | texte sur fond uni |
| showroom | texte sur fond uni, image dans sa tuile | **non** | paires du contrat |
| signal-orange | texte à gauche de la silhouette | plaque étroite ; pleine largeur sur écran étroit | 8.1 |
| sticker-brutal | texte à gauche, photo à droite | **non** | paires du contrat |
| tiny-planet | texte à gauche, planète à droite | **non** | paires du contrat |
| zigzag | titre blanc sur orange (3.2, grand texte) ; petit texte sur étiquette blanche | étiquette | 3.2 |

Bilan honnête : la plaque n'est plus dans quatre héros (serif, showroom, sticker, tiny-planet) et elle est remplacée par un voile uni ou un panneau habillé dans cinq autres. **Dans sept héros elle est toujours là** (acid, alpine, glass-frame, nocturne, pixel-lime, pocket, glacial) : je n'ai pas repris leur composition un par un comme demandé. Elle y est de la couleur du voile du skill, pas la même boîte partout, mais c'est encore un réflexe.

**Titre incliné de retro-mission** : cadre crème masqué, la mesure rend toujours 1.0. La boîte du titre, inclinée, englobe autre chose que son fond (bouton crème ou logo). La méthode ne convient pas à un texte incliné ; contraste **non établi**.

## 4. Un gabarit ne masque jamais de contenu

Treize habillages cachaient les faits du héros (durée, niveau, prix), trois la légende de la photo, un la phrase d'appui. Tous corrigés ; le vérificateur refuse désormais `display: none` sur un texte, une légende ou une action dans `ux/templates/`.

Vérifié sur le héros de la landing, 23 skills, 1440 et 390 px : surtitre, titre, phrase, trois faits, action, photo et légende présents et visibles partout. Cas particulier : sous anime-x-slash la photo d'origine est réduite à un pixel, elle est montrée par ses cinq éclats.

Trouvé au passage : à 390 px, la légende de la photo recouvrait le bouton dans cinq héros. Elle est maintenant dans le texte du héros, à la suite.

## 5. hyper-lime-street : fluidité du premier défilement

Fenêtre au premier plan, vérifié à chaque mesure.

| État | Images de plus de 34 ms | Pire image |
|---|---|---|
| avant | 16, 12, 17 | 56 à 70 ms |
| sans fondu | 2 | 49 ms |
| sans aucune entrée | 0 | 28 ms |
| **après correction**, trois essais | **1, 0, 1** | 42, 28, 35 ms |

Cause : le fondu (`opacity`) du panneau, qui contient l'image découpée par `clip-path`. L'entrée est maintenant en `transform` seul : les formes arrivent de l'extérieur de l'écran. L'objectif « aucune » est atteint une fois sur trois ; il reste une image de 35 à 42 ms sur les deux autres.

## 6. Mesures manquantes

- **`reduced` et `off`, 17 habillages** (les 16 du second lot et tiny-planet) : en `reduced`, gabarits posés et aucune entrée en attente ; en `off`, aucun gabarit. Écart : sous tiny-planet, une tâche reste dans la boucle en `reduced` — elle ne dessine que lorsqu'on tourne la planète.
- **Hors ligne, 17 habillages** (photos et CDN bloqués) : titre visible partout, aucune image cassée affichée dans un gabarit.
- **Canvas refusé et WebGL absent** : non redéclenchés sur les nouvelles pièces (mosaïque, planète).

## Verdicts des neuf skills

| Skill | Avant | Maintenant | Raison |
|---|---|---|---|
| tiny-planet-toy | non fait | **oui** | La planète de la démo, qu'on fait tourner. Manque le logo en lettres-blocs posé dessus |
| pixel-lime-portfolio | en partie | **oui** | La mosaïque lime sur la photo noir et blanc, le titre en minuscules en bas |
| cosmic-voyage | en partie | **oui** | Le ciel étoilé de la démo derrière la page, barre à lien bleu et bouton doré |
| sticker-brutal-jp | en partie | **oui** | Cadre d'encre, autocollants de couleur à cheval dessus, photo en autocollant |
| serif-bistro-green | en partie | **oui** | L'arche remonte dans le titre qui s'écarte (landing) ; sur l'accueil elle reste dessous |
| pocket-device-noir | en partie | en partie | L'objet 3D n'est pas porté |
| heritage-lens | en partie | en partie | La lentille n'est pas faite |
| hold-to-play-music | en partie | en partie | Ni le mot peint ni le geste |
| showroom-bento | en partie | en partie | Ni le produit détouré ni la rangée bento |

Sur 23 skills : **19 « oui », 4 « en partie »**.

## Fluidité des nouvelles pièces

Fenêtre au premier plan ; 2,5 s par mesure.

| Pièce | Souris en mouvement | Défilement |
|---|---|---|
| tiny-planet · planète 3D | 144 images/s, 0 lente | 0 lente, pire 14 ms |
| pixel-lime · mosaïque | 144 images/s, 0 lente | 0 lente, pire 14 ms |
| cosmic · ciel étoilé | — | 0 lente, pire 14 ms |
| sticker-brutal · autocollants | — | 0 lente, pire 7 ms |

La plus faible de ce lot : hyper-lime, 1 image de 42 ms au premier défilement.

## Non vérifié dans ce dernier lot

- 390 px : captures regardées pour pixel-lime, sticker-brutal, cosmic et tiny-planet seulement ; les autres par la mesure (débordement, présence du contenu).
- Clavier sur la planète : le bouton « Tourner à droite » reçoit le focus et son contour ; l'effet de la rotation n'a pas été vérifié à l'image.
- L'arche de serif-bistro sur d'autres titres que ceux de la démonstration.
- Les quatre « à cheval » de sticker-brutal par rapport au texte sur des écrans de taille intermédiaire.
