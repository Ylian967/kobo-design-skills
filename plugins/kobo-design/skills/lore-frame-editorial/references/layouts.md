# Lore Frame Editorial — mises en page

Le contenu vit **dans le cadre** : zone utile = écran − 20px de marge − rail 67px à gauche − barre 51px en haut. Les grilles internes sont découpées par des **filets** (`--line-dark` sur blanc, `--line-light` sur illustration) plutôt que par des marges : on voit les cellules. Les grandes tailles de texte suivent la largeur de l'écran.

## Accueil (récit d'un univers) — ordre relevé sur la référence

Hauteur ≈ 13 000px à 1536px de large. Chaque étape est une section collante qui dure 1,5 à 3 hauteurs d'écran.

| # | Section | Fond | Contenu | Mouvement |
|---|---|---|---|---|
| 0 | **Chargement** | blanc | filet de progression pleine largeur, `▸▸ CHARGEMENT – 47%` à gauche, chemin de fichier tapé à droite, cercle « activer le son » qui suit le pointeur | 1, 2 |
| 1 | **Ouverture** | illustration plein cadre (portrait) | logo géant blanc qui s'efface, puis paragraphe d'intro en haut à gauche, **manifeste** en escalier avec index, « DÉFILER ↓ » | 3, 4 |
| 2 | **001 — Le monde** | blanc | à gauche : phrase-chapitre (2 lignes) puis filet, petite planche paysage, paragraphe tapé en bas ; au centre : planche-portrait ; à droite (cellule séparée par un filet vertical) : grande planche verticale | 7, 4, 5, 6 |
| 3 | **002 — Le rôle** | illustration plein cadre (ciel, nuages) | grille HUD (filets blancs), phrase-chapitre blanche 3 lignes en haut à gauche, coordonnées + température à droite, nuage de points | 4, 8 |
| 4 | **003 — La question** | même illustration qui défile (montagne) | grille HUD avec diagonale, phrase-chapitre 4 lignes dans la cellule de droite, label `■ SYMBOLE DES GARDIENS` | 4 |
| — | **Rideau de barres** | blanc translucide sur l'illustration | transition | 9 (rideau) |
| 5 | **004 — La collection, compteur** | blanc | 3 colonnes : compteur vertical hexagonal « 05K » + label vertical ; planche-portrait centrale ; à droite fiche objet à règle + planche « fenêtre » (gros plan d'œil) | compteur roulant |
| 6 | **004 — La collection, éventail** | `--lavender` | en haut 2 colonnes : phrase-chapitre « 10 000 GARDIENS UNIQUES. » / label + paragraphe ; en bas l'**éventail** de 11 portraits | éventail |
| 7 | **Chapitres** (Le Bastion, Les Factions, Le Monde) | illustration plein cadre | pour chacun : planches éparses → une planche grandit plein cadre → légende centrée `00X ■ NOM` + phrase → sortie en biais ; la nav du cadre suit la section | 8, 6 |
| 8 | **Gardiens** | blanc | mot-titre hexagonal géant sur toute la largeur, planches flottantes par-dessus ; en dessous label `■ DEVENIR GARDIEN` et question finale (2 lignes) | cartes qui s'écrasent |
| 9 | **Pied de page** | noir | 4 colonnes, logo géant, liens légaux | 3 |

## Pages internes

| Page | Composition |
|---|---|
| **À propos** | Phrase-chapitre longue (3 lignes) en 3 tons (noir, gris, gris clair) qui se révèle au défilement ; écran partagé en deux illustrations avec l'étoile géante au centre ; section `--lavender` : 2 colonnes texte ; mot-titre « ÉQUIPE » ; **grille d'équipe** 4 colonnes à filets ; « CE QUE NOUS DÉFENDONS » ; pied. La nav du cadre devient `■ REJOINDRE SUR  X / DISCORD`. |
| **Galerie** | Barre latérale de filtres (≈ 22 % de large, défilement propre), grille de 5 colonnes de portraits carrés, compteur `10 000 GARDIENS`, bouton « mélanger ». Nav : `■ COLLECTION DES GARDIENS / MA COLLECTION`, bouton `✦ CONNECTER` à droite. |
| **Journal** | Nav de filtres `■ TOUT  MISES À JOUR  COMMUNAUTÉ  LABO` ; état de chargement `// CHARGEMENT DU CONTENU` au centre ; liste d'articles en planches. |
| **Média** | Mot-titre hexagonal « MÉDIA » qui passe derrière une **vidéo** en planche (label `■ BANDE-ANNONCE`, `DURÉE : 0:41`), fiche fichier en mono à droite (`// BANDE-ANNONCE.MP4 / DONNÉES / PUBLIÉ 03.10.26`). |
| **Protocole** | Fond bleu nuit dégradé, grand cercle fin au centre avec une **onde** verticale, lune en haut à droite, nav à crochets `VISUEL ]  HISTOIRE ]…`, consigne « MAINTENIR [ESPACE] POUR LE MODE K.A.I. » dans un cartouche blanc à coin coupé. |

## Grille des pages éditoriales (blanc)

- Contenu découpé en **colonnes à filets** : 2/3 + 1/3 (accueil 001), 1/2 + 1/2 (collection), 4 colonnes (équipe, pied).
- Dans une cellule : padding ≈ 40px ; le label en haut à gauche, le titre juste dessous, le paragraphe **en bas à gauche** de la cellule.
- Les planches **débordent** volontairement des filets et se chevauchent.

## Mobile

La référence ne gère pas les petits écrans (écran « AGRANDIR »). Le skill, lui, doit :
- **Cadre** : marge 10px, **pas de rail** ; la barre du haut (48px) garde l'icône menu à gauche, l'étoile au centre, « Connexion » à droite ; la nav de section passe dans le menu.
- **Ouverture** : illustration recadrée sur le visage (`object-position`), manifeste à `max(56px, 15vw)` sur 3 lignes, paragraphe sous le manifeste.
- **Sections éditoriales** : une colonne ; planches à 100 % de la largeur, l'une sous l'autre, toujours avec leur forme de dossier ; filets horizontaux entre les blocs.
- **Phrases-chapitres** : `max(30px, 8vw)`, 4–5 lignes maximum.
- **Chapitres plein cadre** : la planche couvre l'écran, la légende passe en bas, phrase sur 3–4 lignes.
- **Éventail** : défilement horizontal avec aimantation (5 cartes visibles), compteur au-dessus en horizontal.
- **Mot-titre géant** : `--fs-word` (peut déborder et se couper, c'est voulu).
- **Pied** : colonnes empilées, logo géant à 100 % de la largeur.
- **Menu** : panneau plein écran (marge 10px), mots à `max(40px, 11vw)`.
