# Source — Serif Bistro Green

- **Site de référence** : https://dribbble.com/shots/27769189--Vesta-Dining-Restaurant-Landing-Page-UI-UX-Design (auteur : non relevé sur la capture du shot)
- **Famille** : Restaurant / food
- **Analysé le** : 2026-10-01, Chrome
- **Ce qui plaît dans ce shot** : l'association vert profond / crème / orange, la grande serif d'affiche avec un personnage glissé entre les mots, et les cartes de plats reliées comme un carnet.

## Ce qui a été vu

Captures du shot (maquette de landing page de restaurant) :

- **Héros** vert profond (~#0e5446) ; énorme titre sur deux lignes en **serif d'affiche à fort contraste**, haute et un peu condensée (type Abril Fatface / DM Serif Display), couleur crème ; une **personne détourée** se tient entre les mots du titre.
- **Navigation** : barre flottante vert sombre translucide, rayon ~8px ; logo à gauche (icône ronde orange + nom en serif) ; liens centrés en petites pilules, l'actif en pilule pleine ; bouton rond de recherche ; petit bouton orange « Book a Table ».
- **Boutons** petits, rayon ~4px : orange plein avec flèche ; contour crème « Our Story → ».
- **Sections crème** (~#fdf6e3) à grand rayon supérieur (~32px) qui **chevauchent** le vert.
- **« Signature Favorites »** : titre serif vert centré ; cartes orange (~#e8603c), rayon ~12px, assiette blanche vue de dessus, nom en blanc et bouton rond blanc avec flèche ; les cartes sont reliées par une **rangée d'anneaux type reliure à spirale** ; points de carrousel dessous.
- **« Exclusive Dining Experiences »** : titre serif échelonné sur plusieurs lignes avec de **petites photos carrées encadrées** (bord crème, ombre) intercalées entre les mots.
- **Newsletter** : bandeau orange avec **dessins au trait** crème (aliments, ustensiles), titre serif crème « Stay Connected », champ + bouton en pilule.
- **Pied de page** vert avec le **nom du restaurant en serif crème géante**.

## Non mesuré

- **Maquette Dribbble**, pas un site en ligne : rien n'a pu être passé au script d'extraction (pas de DOM, pas de CSS).
- **Analyse visuelle des images uniquement** : couleurs relevées à l'œil puis arrondies ; tailles, espacements, rayons et ombres **estimés**.
- **Polices choisies à l'œil** : DM Serif Display et DM Sans sont des équivalents Google Fonts proposés, pas les polices identifiées du shot.
- L'auteur du shot n'apparaissait pas dans les notes d'analyse : à compléter depuis la page Dribbble.
- Aucune animation visible sur une image fixe : `motion.md` est une proposition cohérente avec le genre, pas une observation.

## Écarts assumés

| Élément du shot | Dans le skill | Raison |
|---|---|---|
| Nom et logo du restaurant | Restaurant inventé « Sauge », icône feuille | Marque |
| Photos (personne, plats, salle) | Personnage, assiettes et vignettes dessinés en CSS + `data-slot` | Droits d'auteur et droit à l'image |
| Textes anglais du shot | Textes français réécrits | Droits d'auteur |
| Blanc / crème en petit texte sur orange vif (~3,2:1) | Petit texte en `--ink` sur `--orange`, ou blanc sur `--orange-strong` (#c4472a, 4,9:1) | Lisibilité |
| Bouton orange vif avec texte blanc | Bouton `--orange-strong` (4,9:1), l'orange vif reste en survol avec texte `--ink` | Lisibilité |
| Points de carrousel seuls | Points + flèches précédent / suivant, cibles 44px | Accessibilité |
