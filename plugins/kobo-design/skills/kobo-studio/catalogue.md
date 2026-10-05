# Catalogue des 23 skills de style, vu depuis kobo-studio

Une fiche courte par skill, pour choisir à l'étape c sans ouvrir les skills. Tout vient des fichiers existants : la description et `references/assets.md` de chaque skill, `audit/<id>.md`, `components/signatures/README.md`, les en-têtes de `ux/templates/` et `quality/relecture-etape-4b.md`. Rien n'est inventé ; une ligne vide de source dit « non relevé ».

Comment lire une fiche :

- **Registre** : *expressif* (l'image et le récit priment) ou *produit* (présenter, vendre). Aucun skill n'est *fonctionnel* (voir `interview.md`). Le classement est une lecture de l'audit, pas une donnée des skills.
- **Photos exigées** : ce que le gabarit attend pour ressembler à sa démo. Sans elles, il fonctionne mais rend moins bien.
- **Gabarits** : les mises en page de signature que kobo-studio sait poser (famille → emplacement). Tout autre emplacement rend son contenu neutre, habillé par la couche de signature des composants. En React, aucun gabarit.
- **Pièces lourdes** : ce qui coûte au chargement ou à l'affichage. Chacune a un repli (photo).
- **Contraste** : le pire rapport mesuré sur le premier écran avec les photos de la démonstration (seuil 4,5 ; 3 pour un grand titre). Il dépend de la photo : à remesurer sur le projet.

## Gabarits par emplacement

Ce que kobo-studio sait poser pour chaque skill, emplacement par emplacement. ● un gabarit de signature existe (entre parenthèses : sa famille) ; — l'emplacement rend son contenu neutre, habillé par la couche de signature des composants. Les emplacements `grid` et `finale` n'ont de gabarit pour aucun skill. `chapter` n'existe que dans la structure récit collant.

| Skill | `frame` | `backdrop` | `hero` | `title` | `media` | `chapter` | Hors héros |
|---|---|---|---|---|---|---|---|
| acid-scan-security | — | — | ● (hero-photo) | — | — | — | 0 |
| alpine-glass-expedition | — | — | ● (hero-photo) | — | — | — | 0 |
| anime-x-slash | — | — | ● (hero-photo) | — | — | — | 0 |
| chrome-atelier | — | — | ● (hero-photo) | — | — | — | 0 |
| cosmic-voyage | — | ● (scene) | ● (hero-photo) | — | — | — | 1 |
| glacial-mono-3d | — | ● (scene) | — | — | — | — | 1 |
| glass-frame-estate | — | — | ● (hero-photo) | — | — | — | 0 |
| heritage-lens | — | — | ● (hero-photo) | — | — | — | 0 |
| hold-to-play-music | — | — | ● (hero-photo) | — | — | — | 0 |
| hyper-lime-street | — | — | ● (hero-photo) | — | — | ● (formes-inclinees) | 1 |
| lore-frame-editorial | ● (cadre) | — | ● (hero-photo) | — | ● (image) | — | 2 |
| mint-street-basics | — | — | ● (hero-photo) | — | — | — | 0 |
| nocturne-architecture | — | — | ● (hero-photo) | ● (titre-geant) | — | — | 1 |
| noir-inferno-chapters | — | — | — | — | — | ● (chapitre-ecran) | 1 |
| pixel-lime-portfolio | — | — | ● (hero-photo) | — | — | — | 0 |
| pocket-device-noir | — | — | ● (hero-photo, objet) | — | — | — | 0 |
| retro-mission-poster | ● (cadre) | — | ● (hero-photo) | — | — | — | 1 |
| serif-bistro-green | — | — | ● (hero-photo) | — | — | — | 0 |
| showroom-bento | — | — | ● (hero-photo) | — | — | — | 0 |
| signal-orange-techwear | — | — | ● (hero-photo) | — | — | — | 0 |
| sticker-brutal-jp | ● (cadre) | — | ● (hero-photo) | — | — | — | 1 |
| tiny-planet-toy | — | — | ● (objet) | — | — | — | 0 |
| zigzag-snack-pop | — | — | ● (hero-photo) | — | — | — | 0 |

Lecture : un seul skill a deux gabarits hors du héros (`lore-frame-editorial`), six en ont un, seize n'en ont aucun. Tout gabarit listé hors du héros **doit** être posé (règle 8 de `SKILL.md`) ; pour les seize autres, la proposition et la livraison disent que la signature, sous le premier écran, ne tient que par les couleurs, la typo et les composants.

## Choisir vite

| Besoin | Regarder d'abord |
|---|---|
| Restaurant, food, épicerie | `serif-bistro-green`, `zigzag-snack-pop` |
| Musique, festival, label, clip | `hold-to-play-music`, `hyper-lime-street`, `noir-inferno-chapters` |
| Mode, boutique | `mint-street-basics`, `signal-orange-techwear` |
| Objet, produit tech, configurateur | `pocket-device-noir`, `showroom-bento`, `chrome-atelier` |
| Immobilier, architecture | `glass-frame-estate`, `nocturne-architecture` |
| Voyage, plein air | `alpine-glass-expedition` |
| Portfolio, indépendant, studio | `pixel-lime-portfolio`, `sticker-brutal-jp` |
| Culture, musée, patrimoine | `heritage-lens`, `lore-frame-editorial` |
| Jeu, anime, univers | `anime-x-slash`, `cosmic-voyage`, `hyper-lime-street`, `tiny-planet-toy` |
| Récit de marque, mission, campagne | `retro-mission-poster`, `noir-inferno-chapters`, `lore-frame-editorial` |
| Tech, sécurité, entreprise | `acid-scan-security`, `glacial-mono-3d` |
| Accent de marque du client à poser | accent neutre : `alpine-glass-expedition`, `chrome-atelier`, `glacial-mono-3d`, `glass-frame-estate`, `lore-frame-editorial`, `pocket-device-noir` |
| Interface sobre (intensité `off`) | `glass-frame-estate`, `chrome-atelier`, `showroom-bento`, `nocturne-architecture` |

Accent pâle (l'accent ne porte jamais seul une information sur le fond) : `hyper-lime-street`, `mint-street-basics`, `pixel-lime-portfolio`, `serif-bistro-green`, `sticker-brutal-jp`, `tiny-planet-toy`, `zigzag-snack-pop`.

---

## Produit

### `serif-bistro-green` — restaurant
- **Convient à** : restaurant, bistrot, brasserie, traiteur, cave, épicerie fine, landing food.
- **Ambiance** : vert profond, crème, orange ; très grand titre en serif d'affiche ; chaleureux, éditorial.
- **Forces** : identité forte dès le titre ; fiche de plat, pastilles de filtre et barre flottante dans la couche de signature.
- **Limites** : l'arche demande un portrait ; le titre du héros est coupé en quatre parts égales autour d'elle (quatre à huit mots : au-delà, les parts se lisent mal) ; l'assiette ronde et les feuilles de section empilées ne sont pas reprises. Bouton du héros mesuré à 4,62 : juste au-dessus du seuil.
- **Photos exigées** : portrait en pied ou à mi-corps, fond sombre uni, vêtement clair (arche) ; plats vus de dessus ; photos sombres et chaudes.
- **Gabarits** : `hero-photo` → héros (titre écarté autour de l'arche). Contraste : 4,62.
- **Pièces lourdes** : aucune.
- **Proches** : `zigzag-snack-pop` (plus vif), `glass-frame-estate` (plus sobre).

### `zigzag-snack-pop` — snack énergique
- **Convient à** : barre protéinée, boisson, granola, nutrition, marque alimentaire en vente directe.
- **Ambiance** : orange vif, jaune, brun ; titre condensé énorme ; ombre dure, photos dans des cadres penchés ; joyeux.
- **Forces** : énergie immédiate ; bouton jaune à ombre dure, champ et cadre photo dans la couche de signature.
- **Limites** : le bord en dents de scie entre sections n'est pas repris (famille à écrire), ni le tampon rond. Titre blanc sur orange mesuré à 3,25 : grand texte seulement ; le petit texte passe sur une étiquette blanche.
- **Photos exigées** : le produit (idéalement détouré ou sur fond clair) ; ingrédients sur fond clair ; personnes.
- **Gabarits** : `hero-photo` → héros (héros orange, photo-autocollant penchée). Contraste : 3,25 (titre).
- **Pièces lourdes** : aucune.
- **Proches** : `sticker-brutal-jp`, `tiny-planet-toy`.

### `mint-street-basics` — mode du quotidien
- **Convient à** : boutique de vêtements, basiques, streetwear, marque textile, lancement de collection.
- **Ambiance** : bleu nuit, menthe, vert ; titre géant condensé ; frais, sportif.
- **Forces** : carte produit, puces de taille, pilules dans la couche de signature.
- **Limites** : bandeau défilant, étoiles et note non repris ; le titre ne passe devant le disque que sous un voile.
- **Photos exigées** : mannequin en buste sur fond uni clair, portrait 3:5, tête dans le quart haut ; l'idéal est un PNG détouré.
- **Gabarits** : `hero-photo` → héros (titre géant, disque vert, photo en arche). Contraste : 5,95.
- **Pièces lourdes** : aucune.
- **Proches** : `signal-orange-techwear` (plus sombre), `hyper-lime-street`.

### `signal-orange-techwear` — techwear
- **Convient à** : mode technique, sneakers, équipement urbain, lookbook, style de vie du jeu vidéo.
- **Ambiance** : anthracite, un seul orange signal ; capitales très étendues empilées ; nuit, affichage tête haute.
- **Forces** : titre empilé à registres très reconnaissable ; onglets et étiquettes dans la couche de signature.
- **Limites** : panneaux de caractéristiques, texte vertical et pilule de silhouette non repris. L'orange est l'identité : une couleur de marque le défait.
- **Photos exigées** : pour le héros, une photo en couleur à dominante orange ou ambrée (silhouette, visage masqué) ; toutes les autres en noir et blanc, sombres.
- **Gabarits** : `hero-photo` → héros (titre empilé, silhouette en colonne). Contraste : 5,25.
- **Pièces lourdes** : aucune.
- **Proches** : `acid-scan-security`, `hyper-lime-street`.

### `pocket-device-noir` — objet tech
- **Convient à** : lancement d'objet connecté, précommande, fiche produit tech, application compagnon.
- **Ambiance** : noir pur, photo chaude qui fond au noir, verre fumé, rouge ponctuel ; premium.
- **Forces** : accent neutre (reçoit bien une marque) ; objet 3D qu'on tourne, avec boutons et clavier.
- **Limites** : sans modèle 3D du client, l'objet affiché est celui de la démonstration ou rien : le héros photo tient seul. Second bouton et libellés de côté non repris.
- **Photos exigées** : le produit de face sur fond noir ou détouré ; une photo d'ambiance chaude (bureau, bois, lumière).
- **Gabarits** : `hero-photo` → héros ; `objet` → héros (appareil 3D au-dessus du texte). Contraste : 5,64.
- **Pièces lourdes** : scène 3D (WebGL), chargée après la page ; repli : le héros photo seul.
- **Proches** : `chrome-atelier`, `showroom-bento`, `nocturne-architecture`.

### `showroom-bento` — configurateur, showroom
- **Convient à** : fiche produit premium, vitrine de gamme, véhicule, électroménager, objet design.
- **Ambiance** : gris studio éclairé au centre, pilules, tuiles bento blanches, un seul rouge ; épuré.
- **Forces** : rangée bento pour les faits ; lisible, texte toujours sur fond uni (13,83).
- **Limites** : reconnaissable **seulement avec une photo de produit sur fond uni** ; avec une autre photo, pas de détourage : elle reste entière dans une tuile. Un produit sombre sur fond sombre se détoure mal. Pastilles de teinte non reprises.
- **Photos exigées** : produit détouré (PNG transparent), ou objet entier sur fond uni.
- **Gabarits** : `hero-photo` → héros (produit sur son sol de studio, rangée bento). Contraste : 13,83.
- **Pièces lourdes** : détourage en canvas ; repli : la photo entière.
- **Proches** : `chrome-atelier`, `pocket-device-noir`.

### `chrome-atelier` — luxe, bijou
- **Convient à** : bijou, horlogerie, parfum, objet haut de gamme, liste d'attente, série limitée.
- **Ambiance** : blanc cassé, filets fins, cercles de cadrage, étiquettes mono entre crochets ; luxe technique.
- **Forces** : accent neutre ; très sobre, tient bien en intensité `off`.
- **Limites** : la pièce en 3D sur sa planche et la barre de caractéristiques ne sont pas reprises ; typo minuscule dans le skill (relevée à 12 px dans les composants).
- **Photos exigées** : gros plan du produit porté, paysage, sujet au centre-droit, **gauche de l'image sombre et vide** pour le titre.
- **Gabarits** : `hero-photo` → héros (héros nuit, cercles et axes). Contraste : 9,59.
- **Pièces lourdes** : aucune dans le gabarit.
- **Proches** : `showroom-bento`, `glass-frame-estate`.

### `glass-frame-estate` — immobilier
- **Convient à** : agence, promoteur, location de villas, architecture, hôtellerie.
- **Ambiance** : noir, blanc, gris ; photo dans un cadre à filet, mot-marque géant ; luxe calme.
- **Forces** : accent neutre ; aucune couleur d'interface, donc toute marque s'y pose ; sobre en `off`.
- **Limites** : il faut beaucoup de photos qui se ressemblent ; le sujet détouré devant le mot et les cellules de verre ne sont pas repris.
- **Photos exigées** : **un seul bâtiment à silhouette simple devant un ciel dégagé**, paysage 4:3 ou 16:9, sommet dans le quart haut, sol sombre en bas.
- **Gabarits** : `hero-photo` → héros (cadre, mot-marque, titre en bas à gauche). Contraste : 7,47.
- **Pièces lourdes** : aucune.
- **Proches** : `nocturne-architecture` (nuit), `chrome-atelier`.

### `nocturne-architecture` — architecture de nuit
- **Convient à** : studio d'architecture, promoteur haut de gamme, résidences, hôtellerie.
- **Ambiance** : noir presque pur, photos de nuit, mot-marque géant en minuscules coupé par le bas, un seul rouge.
- **Forces** : deux gabarits (héros et titres de section) : la signature tient jusqu'en bas de page.
- **Limites** : phrase en deux tons, date et météo de la barre non reprises. Exige des photos de nuit : de jour, le style tombe.
- **Photos exigées** : bâtiments **à l'heure bleue ou de nuit**, fenêtres allumées, verticales droites, sans personnage au premier plan.
- **Gabarits** : `hero-photo` → héros ; `titre-geant` → titres de section. Contraste : 5,48.
- **Pièces lourdes** : aucune.
- **Proches** : `glass-frame-estate`, `pocket-device-noir`.

### `alpine-glass-expedition` — voyage d'aventure
- **Convient à** : agence de trek, randonnée, refuge, guide de montagne, écotourisme.
- **Ambiance** : montagne en bleus froids, brume, serif en capitales géantes, tout est rond ; élégant, froid.
- **Forces** : accent neutre ; héros photo simple et sûr (5,66).
- **Limites** : sous un titre de trois lignes, la photo ne se voit bien que sur le premier tiers de l'écran : titre court conseillé. Sphère de verre, brume en canvas, bouton lecture non repris.
- **Photos exigées** : une personne en montagne, de près, neige ou brume, paysage 4:3 ou 3:2, **haut de l'image clair**.
- **Gabarits** : `hero-photo` → héros (photo plein cadre, voile diagonal). Contraste : 5,66.
- **Pièces lourdes** : aucune.
- **Proches** : `heritage-lens`, `glass-frame-estate`.

### `pixel-lime-portfolio` — portfolio créatif
- **Convient à** : designer, photographe, développeur créatif, studio solo, CV en ligne.
- **Ambiance** : noir et blanc granuleux, mosaïque de pixels lime, mono ; brut, éditorial.
- **Forces** : fiche de carnet, bouton mono, étiquettes dans la couche de signature.
- **Limites** : boutons de 26 px de haut (zone cliquable agrandie) ; ovale au feutre et autocollants non repris ; le voile est plus dense que dans la démo, par lisibilité. Le lime est l'identité : une couleur de marque le défait.
- **Photos exigées** : **portrait pris sur le vif**, paysage 3:2, visage au centre à mi-hauteur ; tout en noir et blanc.
- **Gabarits** : `hero-photo` → héros (photo plein cadre, mosaïque, nom géant). Contraste : 7,47.
- **Pièces lourdes** : mosaïque en canvas ; repli : la photo sans mosaïque.
- **Proches** : `sticker-brutal-jp`, `acid-scan-security`.

### `sticker-brutal-jp` — néo-brutalisme japonais
- **Convient à** : freelance, studio, landing de service, page « à propos », site bilingue japonais / français.
- **Ambiance** : pêche, autocollants à contour noir et ombre dure, titres très gras ; pop, joyeux.
- **Forces** : effet autocollant sur tous les composants ; cadre de page ; seul skill à avoir un jeton de focus dédié.
- **Limites** : le titre japonais, le katakana vertical et l'autocollant au caractère japonais ne sont pas repris : sans texte japonais, la moitié de la signature manque.
- **Photos exigées** : un portrait (passé en noir et blanc) ; photos de projets en couleur.
- **Gabarits** : `cadre` → cadre de page ; `hero-photo` → héros (photo-autocollant). Contraste : 9,56.
- **Pièces lourdes** : aucune.
- **Proches** : `zigzag-snack-pop`, `tiny-planet-toy`, `pixel-lime-portfolio`.

### `acid-scan-security` — cybersécurité
- **Convient à** : SaaS de sécurité, chiffrement, VPN, identité, conformité.
- **Ambiance** : vert acide monochrome, police pixel, réticule, crochets d'angle, rayon 0 ; terminal.
- **Forces** : héros très reconnaissable ; champ terminal, crochets dans la couche de signature ; l'un des rares skills au formulaire complet d'origine.
- **Limites** : sans portrait de face, le scan n'a pas de regard à viser. Chiffres binaires et score non repris. Le vert est l'identité.
- **Photos exigées** : **portrait de face, regard caméra, cheveux sombres de préférence, fond clair et simple**, les deux yeux visibles (un fond sombre donne une image toute noire).
- **Gabarits** : `hero-photo` → héros (scan en quatre couches). Contraste : 7,88.
- **Pièces lourdes** : couches cuites en canvas ; repli : la photo filtrée.
- **Proches** : `signal-orange-techwear`, `pixel-lime-portfolio`.

---

## Expressif

### `hold-to-play-music` — expérience musicale
- **Convient à** : label, festival, album, tournée, rétrospective d'artistes, liste de lecture.
- **Ambiance** : noir et blanc, mot peint à la main orange et blanc, une consigne centrale, une touche à maintenir.
- **Forces** : un premier écran qui se joue : maintenir la touche rend sa couleur à la photo ; clavier, clic et lien « sans maintenir » prévus.
- **Limites** : le gabarit **transforme l'action du héros en touche à maintenir** (environ 3 s, puis relâcher ; un appui court ne fait rien) et écrit lui-même la consigne « Maintenez … à la souris, au doigt ou avec la barre d'espace » ; le lien « Y aller sans maintenir » mène à la même destination. À dire au client si l'action est un achat. Pensé pour **un écran unique** : sous le héros, la page est sobre (ni carte ni panneau). Plans vidéo en coupes franches et pages d'artiste non repris ; le bleu de la démo est écarté (illisible sur noir). Titre peint mesuré à 3,46 : dépend de la photo. Geste non essayé au doigt sur un vrai téléphone.
- **Photos exigées** : scène, foule ou artiste, plein écran ; grise au repos, **elle doit avoir des couleurs franches** pour l'appui.
- **Gabarits** : `hero-photo` → héros (mot peint, consigne, touche). Contraste : 3,46 (titre).
- **Pièces lourdes** : mot peint cuit en canvas ; repli : lettres nettes.
- **Proches** : `noir-inferno-chapters`, `hyper-lime-street`.

### `hyper-lime-street` — action urbaine
- **Convient à** : jeu d'action, événement urbain, zine, culture de rue, festival.
- **Ambiance** : béton clair, blocs noirs tramés, lime fluo, formes inclinées à 41°, titres condensés.
- **Forces** : deux gabarits ; blocs numérotés pour un programme ou des chapitres ; pilules et étiquettes en parallélogramme.
- **Limites** : les formes inclinées s'installent dans les **chapitres d'un récit** (structure récit collant) ; ailleurs seul le héros est signé. Pellicule, autocollants, mot géant vertical non repris. Accent pâle.
- **Photos exigées** : ville la nuit, néons, béton, mouvement ; visage et buste au regard fort ; pas de paysage naturel ni de pastel.
- **Gabarits** : `hero-photo` → héros ; `formes-inclinees` → chapitres. Contraste : 6,85.
- **Pièces lourdes** : aucune.
- **Proches** : `anime-x-slash`, `signal-orange-techwear`, `mint-street-basics`.

### `noir-inferno-chapters` — récit en noir et blanc
- **Convient à** : clip, album, court-métrage, campagne engagée, manifeste, roman graphique.
- **Ambiance** : noir et blanc strict, scènes plein écran, un titre court en capitales serif, solennel.
- **Forces** : chapitres en scènes de la hauteur de l'écran, cercle à tirer (qui est aussi un bouton).
- **Limites** : **seulement en structure récit collant** : son gabarit habille les chapitres, pas le héros (qui reste neutre). Titre en poussière, grain, numéros de scène non repris. Aucune carte : mal adapté à une liste d'offres.
- **Photos exigées** : une image par scène, paysage 16:10, noir et blanc, **bords sombres**, centre lisible sous un texte blanc.
- **Gabarits** : `chapitre-ecran` → chapitres. Contraste : 5,10 (chapitres).
- **Pièces lourdes** : aucune.
- **Proches** : `hold-to-play-music`, `heritage-lens`, `retro-mission-poster`.

### `retro-mission-poster` — récit de marque rétro-futuriste
- **Convient à** : page « notre mission », énergie, climat, spatial, mobilité, récit de produit.
- **Ambiance** : affiche des années 70, cadre crème autour de l'écran, titre géant incliné, rouge.
- **Forces** : cadre de page et héros-affiche ; forte personnalité avec peu d'éléments.
- **Limites** : le traitement de la photo en aplats granuleux n'est pas un filtre : il faut des **images préparées**. Anneau dentelé et passage par crans non repris. Titre incliné mesuré à 3,05 : à la limite, dépend de la photo.
- **Photos exigées** : paysages désertiques ou véhicules, peu détaillés, gamme rouille / crème / bleu-vert ; pas de nuit.
- **Gabarits** : `cadre` → cadre de page ; `hero-photo` → héros (affiche, titre incliné). Contraste : 3,05 (titre).
- **Pièces lourdes** : aucune.
- **Proches** : `lore-frame-editorial`, `noir-inferno-chapters`.

### `lore-frame-editorial` — univers illustré
- **Convient à** : univers de jeu, bande dessinée, projet artistique, portfolio d'illustrateur.
- **Ambiance** : cadre fin et rail autour de l'écran, manifeste en capitales géantes, micro-labels mono.
- **Forces** : le skill le mieux couvert : trois gabarits (cadre, héros, images en forme de dossier) ; accent neutre.
- **Limites** : chargement à compteur, éventail de planches, cadre qui s'inverse sur les images non repris. Pensé pour des illustrations.
- **Photos exigées** : illustrations ou portraits sur fond uni, très colorés ; visage au centre-droit pour l'ouverture.
- **Gabarits** : `cadre` → cadre ; `hero-photo` → héros (manifeste) ; `image` → images de contenu. Contraste : 4,81 (titre).
- **Pièces lourdes** : aucune.
- **Proches** : `retro-mission-poster`, `heritage-lens`.

### `heritage-lens` — patrimoine
- **Convient à** : musée, monument, site archéologique, exposition en ligne, voyage culturel.
- **Ambiance** : scènes plein cadre dorées, serif d'affiche centrée, lentille ronde à anneau de dentelle ; luxe calme.
- **Forces** : la lentille ouvre la photo en grand avec sa légende ; texte centré assumé (règle du skill).
- **Limites** : l'avant / après de la lentille demande **deux images du même lieu** ; points de navigation verticaux non repris. Titre doré mesuré à 3,84 : grand texte, dépend de la photo.
- **Photos exigées** : le lieu vu de loin, plein cadre, sujet au centre, contrasté, zones sombres bienvenues.
- **Gabarits** : `hero-photo` → héros (scène, titre doré, lentille). Contraste : 3,84 (titre).
- **Pièces lourdes** : aucune.
- **Proches** : `alpine-glass-expedition`, `noir-inferno-chapters`, `lore-frame-editorial`.

### `glacial-mono-3d` — vitrine 3D glacée
- **Convient à** : entreprise tech, studio, lancement produit, portfolio WebGL.
- **Ambiance** : gris-bleu acier, scène 3D de glace derrière la page, mono minuscule, crochets de coin.
- **Forces** : accent neutre ; la scène suit le défilement ; texte posé sur un panneau voilé (6,93).
- **Limites** : la scène est **générique** tant que le client n'a pas son modèle `.glb` ; le héros lui-même reste neutre (le gabarit est le fond). Interface aux quatre coins, neige, transition en pixels non reprises. Six images lentes mesurées en 3 s de défilement.
- **Photos exigées** : aucune ; photo de repli en gris, sans couleur ni personnage.
- **Gabarits** : `scene` → fond de page (scène 3D). Contraste : 6,93.
- **Pièces lourdes** : three.js chargé depuis un CDN après la page, 30 images par seconde ; repli : photo (sans WebGL ou hors ligne).
- **Proches** : `pocket-device-noir`, `nocturne-architecture`.

### `cosmic-voyage` — science-fantasy
- **Convient à** : jeu, univers spatial, lanceur, wiki, communauté.
- **Ambiance** : nuit étoilée, verre bleu peint, cartes à un seul coin arrondi, or en ornement.
- **Forces** : ciel étoilé derrière toute la page ; carte à cadre doré, onglets à étoile.
- **Limites** : frise du voyage et frise d'emblèmes non reprises ; le texte du héros tient dans un panneau (aucune zone calme dans un ciel étoilé) ; petite typo d'origine.
- **Photos exigées** : illustrations colorées sur fond sombre ; à défaut des photos de nuit.
- **Gabarits** : `scene` → fond de page (ciel, sans 3D) ; `hero-photo` → héros. Contraste : 8,72.
- **Pièces lourdes** : aucune (le ciel est une photo).
- **Proches** : `anime-x-slash`, `hyper-lime-street`.

### `anime-x-slash` — anime d'action
- **Convient à** : série, personnages, classement, fan-site, jeu d'action.
- **Ambiance** : gris papier, noir, rouge signal, tout penché du même angle, titres condensés géants.
- **Forces** : héros en éclats biaisés ; étiquettes biaisées, menu noir à survol rouge.
- **Limites** : cinq éclats de la **même** photo là où la démo en montre cinq ; grille en parallélogrammes et bande-annonce en X non reprises. Titre rouge mesuré à 3,27 : grand texte seulement.
- **Photos exigées** : illustrations de personnages en priorité ; sinon portraits très colorés, visage dans le tiers haut.
- **Gabarits** : `hero-photo` → héros (éclats). Contraste : 3,27 (titre).
- **Pièces lourdes** : aucune.
- **Proches** : `hyper-lime-street`, `cosmic-voyage`.

### `tiny-planet-toy` — mini-monde ludique
- **Convient à** : jeu indépendant, événement ludique, portfolio interactif.
- **Ambiance** : turquoise, petite planète 3D cernée d'encre, boutons-blocs qui s'enfoncent ; jouet.
- **Forces** : planète qu'on tourne (boutons, flèches) ; blocs et fiches à ombre décalée sur tous les composants.
- **Limites** : **ce style n'utilise pas de photo** ; la planète est générique sans le modèle du client. Logo en lettres-blocs et boîte de dialogue qui s'écrit non repris. Accent pâle.
- **Photos exigées** : aucune ; un modèle glTF si le client veut son monde.
- **Gabarits** : `objet` → héros (la planète). Contraste : 5,27.
- **Pièces lourdes** : scène 3D (WebGL) ; repli : photo seule.
- **Proches** : `sticker-brutal-jp`, `zigzag-snack-pop`.

---

## Ce que le catalogue ne dit pas

- Les rapports de contraste valent pour les photos de la démonstration : `tools/check_studio.py` les remesure avec celles du projet.
- Hors du premier écran, la plupart des emplacements sont neutres : la signature y tient par la couche des composants (boutons, cartes, onglets, champs), pas par une mise en page.
- Testé dans Chrome seulement.
- Pour le détail d'un skill : `../<id>/SKILL.md` et `../<id>/references/assets.md`.
