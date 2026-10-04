# Relecture — étape 3 bis (couche de signature)

Question posée pour chaque skill : **« si je cache le nom du skill, est-ce que je reconnais sa démo dans la galerie ? »**

Méthode : pour chacun des six skills, une capture de `components/gallery.html` en intensité full à 1440 px (du haut de page à la fin de la section « Carte »), regardée à côté d'une capture de `examples/demo.html` du skill (ouverte en lecture seule). Pour sticker-brutal et noir-inferno, la seconde moitié de la galerie a aussi été regardée (onglets, notifications, états vides, chargement, blocs d'intensité).

## Verdicts

| Skill | Verdict | Ce qui fait reconnaître la démo | Ce qui manque |
|---|---|---|---|
| **serif-bistro-green** | **oui** | La barre flottante à liens en pilules avec l'actif en crème, les boutons en serif d'affiche suivis d'une flèche, la fiche de plat (photo en boîte crème, prix en serif) : c'est la section « Explorez la carte » de la démo. | Les feuilles qui se recouvrent, l'arche du héros, la reliure à spirale. Ce sont des mises en page, pas des composants. |
| **sticker-brutal-jp** | **oui** | L'effet autocollant est partout : bouton jaune cerné à ombre dure, logo et liens en pilules, étiquettes en pilules colorées, champs et fiches à ombre dure, titres de fiche en capitales. | Le cadre de page avec ses autocollants à cheval, le portrait en écusson, le katakana vertical. |
| **pixel-lime-portfolio** | **oui** | Boutons lime mono soulignés à flèche, navigation mono soulignée, étiquettes noires, photos en noir et blanc, noms en bas de casse, fiche de carnet lime perforée. | La mosaïque de pixels sur la photo, premier signe du skill, et les ovales au feutre. Sans eux la galerie est juste, mais moins frappante que la démo. |
| **lore-frame-editorial** | **en partie** | Nav mono dont l'actif porte le carré « ■ », micro-labels au carré, titres en capitales très serrées, bouton noir mono à coin coupé, images à coin coupé. | Le cadre fixe avec son rail, qui est LA signature du skill ; la forme de dossier des planches (onglet) ; les illustrations très colorées, que des photos de montagne ne remplacent pas. Reste aussi le champ, trop ordinaire (gris arrondi). |
| **glacial-mono-3d** | **en partie** | Les boutons sans fond à quatre crochets de coin sont exactement le bouton « Lire » de la démo ; mono partout, étiquettes pleines, photos en gris, panneau de nuit pour la modale. | La démo, c'est une scène 3D plein écran et une interface minuscule aux quatre coins. Une planche de composants sur fond de brouillard ne peut pas y ressembler. On reconnaît l'interface, pas le skill entier. |
| **noir-inferno-chapters** | **en partie** | Bouton à contour qui s'inverse au survol, liens à filet, capitales espacées, titres serif en capitales, champs réduits à une ligne, photos en gris, état vide centré dans une cible en tirets. | La démo est une image plein écran, un titre et un cercle à tirer. Aucun de ces trois éléments n'est un composant du lot. La galerie rend bien son interface de coin, pas son écran. |

acid-scan-security, tenu à jour, n'a pas été recomparé à sa démo dans cette passe.

## Lecture d'ensemble

- Les trois « oui » sont des skills dont l'identité vit dans des **composants** (bouton, carte, nav, champ). Les trois « en partie » sont des skills dont l'identité vit dans une **mise en page ou une image** (cadre, scène 3D, photo plein écran). La couche de signature ne peut pas combler cet écart : il faudra des composants de mise en page propres à ces skills.
- Le défaut relevé à l'étape 3 (« kit sobre recoloré ») est corrigé pour les six : aucun ne se lit plus comme un kit générique en full.
- En « off », les sept couches rendent **exactement** le composant de base (comparaison des styles calculés, couche chargée en off contre couche retirée : identiques).

## Ce qui a été difficile à traduire

| Skill | Difficulté | Choix fait |
|---|---|---|
| lore-frame | Le coin coupé coupe aussi le contour de focus. | Le bouton rogne un calque (`::before`), pas lui-même. La bordure ne suit donc pas la diagonale. |
| lore-frame | Le décodage des textes est sa moitié de style, et c'est du script. | Non traduit : full et reduced rendent pareil. |
| pixel-lime | Les perforations de la fiche de carnet, sans dégradé ni image. | Une bordure épaisse en pointillés ronds. Espacement non réglable (une tous les 43 px dans le skill). |
| pixel-lime | Le skill inverse le bouton « par pas » (`steps(4)`). | Repris par `--k-sig-ease-step`. |
| serif-bistro | Le bouton monte de 3 px et sa flèche avance de 5 px : valeurs absentes des tokens. | Calculées sur `--k-space-1` (0,75 × et 1,25 ×). |
| serif-bistro | La photo zoome à 1,06 au survol : c'est le motif « tout grossit » de la liste noire. | Gardé en full seulement, avec un commentaire qui cite la source. |
| glacial | Tous les boutons sont des crochets sans fond : plus rien ne distingue l'action principale. | Principal en gras, secondaire en texte secondaire. Hiérarchie faible, fidèle au skill. |
| glacial | Le logotype est blanc à halo sur brouillard clair (1,9:1). | Non repris : illisible hors d'un logotype. |
| sticker-brutal | L'ombre plus longue au survol est dans un `--k-sig-*`, que le vérificateur refusait. | Le vérificateur admet maintenant une ombre venue d'un `--k-sig-*` dans `signatures/`. |
| noir-inferno | « Pas de carte, pas de fond de bouton » : le bouton secondaire devient un simple texte. | Repris tel quel. Au repos, rien ne dit que c'est cliquable hors la casse et l'approche. |
| noir-inferno | Les numéros de scène (le courant à 40 px) appliqués à des onglets qui portent des mots. | Repris : l'onglet actif est en serif à 40 px. À regarder de près, c'est le choix le plus risqué du lot. |
| noir-inferno | Le skill interdit le gris en filtre CSS. | `--k-img-filter` reste un repli, et la fiche le dit. |
| tous | La couche a la même force que les règles d'état du composant et passe après. | Survol et désactivé redonnés à la main dans chaque couche. |

## Corrigé pendant la relecture

- **Barre de navigation (défaut de l'étape 3, déjà commité)** : depuis que la marque pouvait rétrécir, la barre ne débordait plus jamais et ne se repliait donc plus ; dans un conteneur étroit elle montrait les liens sans la marque ni le bouton « Menu ». La marque ne rétrécit plus qu'une fois la barre repliée. Vérifié sur les 23 skills aux deux largeurs.
- **noir-inferno** : le bouton de base était rouge (l'accent du contrat pointait sur le rouge que le skill réserve à la fin du récit). L'accent de la fiche est maintenant neutre (blanc), le rouge passe en `--k-accent-2`.
- **pixel-lime** : la carte en cours de chargement devenait une fiche de carnet lime.

## Vérifications

| Contrôle | Résultat |
|---|---|
| `tools/check_components.py` | 0 erreur |
| `tools/check_contract.py` | 23 fiches valides (62 rôles) |
| `tools/gen_maps.py --check` | aucune fiche ne changerait |
| Débordement horizontal, 23 skills, 1440 et 390 px | aucun |
| Repli de la barre de navigation, 23 skills, deux largeurs | conforme |
| Texte informatif sous 12 px (aide, erreur, bouton, notification, lien, onglet), 23 skills | aucun |
| « off » = composant de base, 7 couches | identique |
| Durées de notification lues dans le contrat | 6 s puis sortie ; vérifié |

## Non vérifié

- Les **mouvements** de signature (survols, flèches, filets qui se tracent, ligne de scan) : écrits d'après `motion.md`, mais les captures sont fixes. Aucun n'a été regardé en train de jouer.
- L'intensité **reduced** : vérifiée par construction (les mouvements sont dans un bloc à part), pas à l'œil.
- Les couches à **390 px** : mesurées (aucun débordement), pas regardées.
- Modale, menu mobile et notification **ouverts** sous chaque couche : seule la lisibilité de la modale a été mesurée (couleurs de fond et de texte) pour quatre skills.
- acid-scan-security : couche mise à jour, non recomparée à sa démo.
- La démo de lore-frame affichait encore son rideau de chargement à la première capture ; la comparaison s'appuie sur la capture prise après défilement.

---

# Second lot : les 16 autres skills, et acid-scan-security

Même question, même méthode : pour chaque skill, une capture de la galerie en full à 1440 px (du haut de page à la fin de la section « Carte ») regardée à côté d'une capture du premier écran de sa démo. Travail fait par paquets de quatre, chacun vérifié avant le suivant.

## Verdicts

| Skill | Verdict | Ce qui fait reconnaître la démo | Ce qui manque | Est-ce un gabarit de mise en page ? |
|---|---|---|---|---|
| **cosmic-voyage** | **oui** | La barre noire au lien courant bleu et à la plaque dorée est celle de la démo ; cartes à cadre doré et coin unique. | La nuit étoilée derrière tout ; le filet doré vertical à nœuds ; la frise d'emblèmes. | Oui : fond de page étoilé, frise latérale du voyage. |
| **glass-frame-estate** | **oui** | Boutons larges à flèche, tout en capitales, surtitres « // », cartes grises à photo en retrait : ce sont les pages blanches de la démo. | Le héros : photo dans un cadre d'un pixel, mot-marque géant derrière le bâtiment, cellules de verre. | Oui : héros encadré sur photo floutée. |
| **mint-street-basics** | **oui** | Capitales condensées, pilule verte, pilule blanche à anneau, logotype serif, cartes produit centrées. | Le titre géant en dégradé qui passe devant la photo ; le disque vert et l'arche. | Oui : héros à titre géant et formes rondes ; bandeau défilant. |
| **showroom-bento** | **oui** | La barre de pilules (l'active en noir), les ronds blancs, la pilule noire, les tuiles blanches. | Le produit détouré au centre sur son sol de studio ; la rangée bento serrée. | Oui : écran unique dans un cadre, scène produit, grille bento. |
| **signal-orange-techwear** | **oui** | Boutons à contour orange suivis de ↗, étiquettes orange espacées, panneaux à halo orange, photos en noir et blanc. | Le titre empilé à quatre registres ; la silhouette centrale ; le texte vertical. | Oui : héros à titre empilé et silhouette, panneaux de specs à droite. |
| **tiny-planet-toy** | **oui** | Le bouton-bloc jaune penché à tranche est celui de la démo ; tout est cerné d'encre épaisse et a une épaisseur. | La planète en 3D et le logo en lettres-blocs. | Oui : héros planète, boîte de dialogue qui s'écrit. |
| **zigzag-snack-pop** | **oui** | Bouton jaune à ombre dure et chevron, barre brune, capitales condensées, champs à ombre dure. | Les bords de section en dents de scie ; le héros orange à titre géant et photo penchée. | Oui : sections alternées à bords en zigzag, héros. |
| **acid-scan-security** | **en partie** | Champ terminal à invite « >_ », bouton jaune en capitales, photos teintées en vert, titres pixel. | Le scan du regard : photo plein écran en quatre couches, réticule, bande claire, cadre jaune ; les trames. | Oui : héros photo à couches calculées en canvas. |
| **alpine-glass-expedition** | **en partie** | Pilule blanche à lueur, puces en contour, serif en capitales, bouton rond en sphère de verre. | La photo de montagne plein cadre et son voile diagonal ; le titre géant ; la grande sphère ; la note. | Oui : héros photo plein cadre à voile diagonal. |
| **anime-x-slash** | **en partie** | Oswald, aplat rouge à texte noir, bouton contour, bouton de menu noir, cartes en barres noires à bord rouge. | Le héros en éclats ; les titres rouges géants collés au bord gauche ; la grille en parallélogrammes ; la bande-annonce en X. | Oui : héros en éclats biaisés, titre de section collé au bord, grille de classement. |
| **chrome-atelier** | **en partie** | Pilules à contour fin, capitales en Regular, étiquettes entre crochets, champs à filet. | La planche au cercle avec ses quatre filets et la pièce en 3D ; le héros nuit et ses cercles de cadrage. | Oui : planche centrée (filets + cercle + pièce), héros nuit, barre de caractéristiques. |
| **heritage-lens** | **en partie** | Boutons cerclés d'or, bouton plein or, titres de lieu en or dans la police d'affiche. | Les scènes plein écran, la lentille avant / après, l'anneau de dentelle, les phrases centrées du prologue. | Oui : scène plein écran à texte centré, lentille, points de navigation verticaux. |
| **hold-to-play-music** | **en partie** | Le bouton-touche en pilule à contour, l'orange à l'action, les images grises qui prennent leur couleur. | Le mot peint à la main ; les plans vidéo ; le geste « maintenir » et son contour qui se trace. | Oui : écran unique sans défilement, consigne centrale ; le geste est un composant à part. |
| **hyper-lime-street** | **en partie** | La barre noire à pilule blanche et pilule lime est celle de la démo ; pilule noire à pastille lime ; liseré lime. | Les grandes formes inclinées qui sortent de l'écran ; le bloc lime numéroté ; la pellicule ; les autocollants. | Oui : section à formes inclinées (bande, bloc, panneau), numéro géant. |
| **nocturne-architecture** | **en partie** | Pilule rouge blanche au survol, libellés à point, filets à la place des boîtes, carte rouge. | Le mot-marque géant coupé par le héros ; la photo de ville la nuit ; la phrase en deux tons ; les chiffres. | Oui : héros photo à mot-marque géant, grille de chiffres 2 × 2. |
| **pocket-device-noir** | **en partie** | Bouton blanc à halo, logo en cartouche blanc, étiquettes grises, contours en tirets. | L'objet en 3D devant son nom géant ; la photo chaude du héros ; le manifeste. | Oui : héros photo qui fond au noir, bloc produit à nom géant. |
| **retro-mission-poster** | **en partie** | Bouton crème rectangulaire rouge au survol, logo rouge espacé, capitales étroites, filets rouges. | L'affiche plein écran en aplats granuleux ; le titre géant incliné ; le cadre crème autour de l'écran ; l'anneau dentelé. | Oui : chapitre-affiche plein écran dans un cadre, titre incliné. |

Bilan des 23 skills : **10 « oui »** (serif-bistro, sticker-brutal, pixel-lime, cosmic, glass-frame, mint-street, showroom, signal-orange, tiny-planet, zigzag), **13 « en partie »**, aucun « non ». Aucun skill ne se lit plus comme un kit recoloré.

## Gabarits de signature à prévoir pour l'étape 4

Tout ce qui manque aux « en partie » — et aux « oui » — est une mise en page, pas un composant. Regroupé par type :

| Type de gabarit | Skills | Ce qu'il doit porter |
|---|---|---|
| **Héros photo plein cadre** | alpine-glass, nocturne, pocket-device, acid-scan, glass-frame, pixel-lime, serif-bistro, mint-street, zigzag | Photo traitée (voile, rampe, mosaïque), titre géant, un ou deux éléments posés dessus. Variantes : voile diagonal (alpine), mot-marque coupé (nocturne), couches en canvas et réticule (acid), cadre et mot derrière le sujet (glass-frame), arche dans le titre (serif), disque et arche (mint). |
| **Cadre de page** | lore-frame, retro-mission, sticker-brutal, showroom, glass-frame | Un cadre fixe ou un filet autour de l'écran ; rail et barre de progression (lore) ; autocollants à cheval (sticker). |
| **Scène plein écran sans page** | glacial-mono (3D), heritage-lens, noir-inferno, hold-to-play, tiny-planet (3D), chrome-atelier (pièce 3D), showroom (produit) | Une image ou une scène 3D qui occupe l'écran, interface aux coins, avancée par défilement, geste ou numéros. |
| **Section à formes inclinées** | hyper-lime, anime-x-slash, retro-mission | Un angle unique : bandes et panneaux inclinés (hyper), éclats et parallélogrammes (anime), titre incliné (retro). |
| **Titre typographique géant** | signal-orange (titre empilé), lore-frame (manifeste et mots hexagonaux), mint-street, zigzag, nocturne, pocket-device (nom derrière l'objet) | Un composant de titre propre au skill, hors des dix composants. |
| **Fond et fil de page** | cosmic-voyage (nuit étoilée, frise à nœuds), anime (filets de fond), hyper-lime (pellicule), zigzag (dents de scie), serif-bistro (feuilles empilées) | Ce qui relie les sections entre elles. |
| **Grilles particulières** | showroom (bento), anime (classement en parallélogrammes), glass-frame (annonces 2 × 2, mosaïque d'avis), nocturne (chiffres 2 × 2) | Des grilles dont la forme est la signature. |
| **Composants de signature isolés** | heritage (lentille, anneau de dentelle), noir-inferno (cercle à tirer), hold-to-play (touche à maintenir), pixel-lime (mosaïque, ovale au feutre), lore-frame (planche en dossier), acid-scan (jauge segmentée, journal), alpine (sphère de verre, note) | Des pièces uniques, à écrire une par une. |

## Corrigé pendant ce second lot

- **glacial-mono-3d** : l'action principale ne se distinguait de la secondaire que par la graisse. Elle est maintenant une « étiquette pleine » (rectangle blanc à texte sombre, le signe qui porte « Cliquer pour explorer » dans la démo du skill), encadrée des mêmes crochets posés à l'extérieur. La secondaire reste aux crochets seuls.
- **Principal ≠ secondaire** : mesuré sur les 23 skills. Partout les deux boutons diffèrent par le fond, le contour, l'ombre ou le soulignement, jamais par la seule graisse.
- **Bouton discret (composant de base)** : son texte prenait l'accent dès 3:1, ce qui donnait un petit texte rouge illisible sous nocturne-architecture. Le texte reste maintenant de la couleur du texte ; seul le soulignement prend l'accent.
- **Bouton (composant de base)** : un libellé trop long passe à la ligne au lieu de faire déborder la page à 390 px (tiny-planet, signal-orange, glass-frame).
- **Carte (composant de base)** : son surtitre échappait au plancher de 12 px (10 à 11,5 px sous 9 skills : anime, chrome, glacial, hyper-lime, lore-frame, nocturne, noir-inferno, pixel-lime, signal-orange). Il porte une information ; le plancher s'y applique maintenant. Trouvé par le balayage final.
- **Champ (composant de base)** : il pouvait dépasser de sa colonne quand la couche élargissait sa marge intérieure (acid-scan).
- **Fiches** : accent rendu neutre pour retro-mission (bouton crème, le rouge passe en second accent) et showroom-bento (pilule noire, le rouge est réservé à la marque) ; taille de titre de carte corrigée pour nocturne et retro-mission.
- **Galerie** : la liste des skills contenait quatre doublons après une modification ; elle est reconstruite depuis les fiches.
- hyper-lime et zigzag : bouton de menu illisible dans leur barre sombre. heritage : squelette d'image déformé, et la sans du skill rendue aux boutons et à l'aide.

## Vérifications du second lot

| Contrôle | Résultat |
|---|---|
| `tools/check_components.py` | 0 erreur |
| `tools/check_contract.py` | 23 fiches valides |
| `tools/gen_maps.py --check` | aucune fiche ne changerait |
| « off » = composant de base, 23 couches | identique (noir-inferno demande d'attendre la fin de ses fondus lents avant de comparer) |
| Débordement horizontal, 23 skills, 1440 et 390 px | aucun |
| Texte informatif sous 12 px, 23 skills | aucun |
| Repli de la barre de navigation, 23 skills, deux largeurs | conforme |

## Passe de vérification avant commit

Faite après la validation du second lot, sans rien créer de nouveau.

| Contrôle | Méthode | Résultat |
|---|---|---|
| Seconde moitié de la galerie (onglets, notifications, états vides, chargement), 16 skills du second lot, full, 1440 px | captures de chaque section, regardées deux par deux | conforme, sauf un défaut corrigé (hyper-lime, ci-dessous) |
| Modale ouverte, 23 couches, 1440 px | capture de chaque modale ; contraste du titre et du texte mesuré sur le fond de la fenêtre | lisible partout après deux corrections (glacial, cosmic) |
| Menu mobile ouvert, 23 couches, 390 px | capture de chaque menu | lisible partout après une correction (glacial) ; aucun débordement |
| Focus clavier dans la modale et le menu | ouverture à la touche Entrée puis tabulations, sous hold-to-play, cosmic, glacial et tiny-planet | contour visible sur chaque élément (orange sur noir pour hold-to-play, doré pour cosmic, pointillé clair pour glacial) ; à la fermeture, le focus revient au bouton d'ouverture |
| Retour exact en « off », 23 couches | styles calculés de 1 908 éléments et pseudo-éléments, couche chargée en « off » puis couche retirée | identique. Les 8 écarts relevés à chaque passage sont les animations en cours (deux roues d'attente, cinq squelettes, une barre) : on trouve les mêmes 8 en comparant deux fois la même page |
| Bouton de fermeture de la modale, 23 couches, deux largeurs | mesure | 44 px de large partout après correction ; la modale tient dans l'écran |
| Débordement horizontal, 23 skills, 1440 et 390 px | mesure | aucun |

### Corrigé pendant cette passe

- **glacial-mono-3d** : dans la modale et le menu (panneaux de nuit), le libellé de l'action principale était clair sur l'étiquette blanche, donc invisible. L'étiquette garde maintenant un texte sombre dans les panneaux, et ses crochets restent clairs.
- **cosmic-voyage** : dans la modale, la valeur saisie dans un champ était sombre sur un champ sombre. Seuls les textes posés sur le verre clair prennent son encre ; la valeur saisie reste claire.
- **hyper-lime-street** : le bouton « Réessayer » d'une notification était clair sur clair. Il prend le contour clair déjà utilisé dans la barre de navigation.
- **Bouton à icône seule (composant de base)** : il pouvait être écrasé par un titre long (25 px de large sous tiny-planet, 38 px sous cosmic). Il ne rétrécit plus.

### Observé, laissé tel quel

- **hold-to-play-music** : la modale n'a pas de fond, par choix du skill ; elle repose sur un voile noir à 86 %. Le texte est blanc (gris clair pour le paragraphe) et se lit, mais le contenu de la page reste devinable derrière.
- **mint-street-basics, sticker-brutal-jp, tiny-planet-toy, chrome-atelier, showroom-bento** : le voile est clair ou léger (20 à 60 %). La page reste visible derrière ; la fenêtre se détache par son bord ou son ombre, pas par l'assombrissement.
- **showroom-bento** : un bouton secondaire (pilule blanche) posé sur une tuile ou une notification blanche se lit comme un simple texte.
- **Hauteur visible de certains boutons** sous 44 px (pixel-lime 26 px, pocket-device 40 px) : c'est la hauteur de contrôle du skill ; la zone cliquable reste de 44 px.
- Avec `<dialog>`, la tabulation passe par l'interface du navigateur avant de revenir dans la fenêtre : comportement natif.

## Non vérifié dans ce second lot

- Les blocs d'intensité (full / reduced / off côte à côte) et le ton inversé des 16 skills n'ont pas été regardés.
- Les démos ont été capturées sur leur **premier écran** seulement.
- Les **mouvements** (survols, disques qui montent, blocs qui s'enfoncent, filets qui se tracent) : écrits d'après les références, jamais vus en train de jouer.
- La modale de **confirmation** (alertdialog) et une notification **en mouvement** n'ont pas été regardées ; seule la fenêtre à formulaire l'a été.
- Le focus clavier dans la modale et le menu a été suivi sous 4 skills, pas sous les 23.
- zigzag-snack-pop : la casse des boutons en capitales est supposée, pas relevée.
- showroom-bento : l'ombre douce d'une tuile survolée, présente dans la démo, n'est pas reprise.
