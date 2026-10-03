# Source — Alpine Glass Expedition

- **Référence** : https://dribbble.com/shots/27767056-WayWild-Adventure-Travel-Website (Subash Chandra)
- **Famille** : Voyage / aventure
- **Analysé le** : 2026-10-01 (première version, à l'œil) ; **2026-10-03, réécriture complète** : image du shot ouverte à pleine résolution (3200×2400) dans Chrome, couleurs **mesurées par lecture des pixels**, tailles et positions relevées en pixels de maquette, polices comparées par leurs largeurs.
- **Ce qui plaît** : l'alpiniste dans la brume, la lumière en diagonale, le titre serif géant, la sphère de verre bleue.

## Ce que contient la référence

Le shot ne contient **qu'une image** : le héros d'une landing. Aucune autre image, aucune vidéo, aucun site en ligne (la description du shot ne donne pas de lien ; les autres vignettes de la page sont d'autres projets de l'auteur). **Aucune animation n'est visible.**

L'image fait 3200×2400 : un cadre noir de 160px, puis la maquette en **1440px de large affichée en @2x** (2880px), haute de 1120px et coupée en bas. Donc **2 px d'image = 1 px de maquette**, sans estimation d'échelle.

## Mesures (pixels de l'image)

| Élément | Valeur mesurée |
|---|---|
| Brume, coin haut gauche | #d8e2eb ; brume moyenne #afc4d4 ; haut centre #c5d4e3 |
| Ombre bleue de la diagonale | #264d66 ; coin haut droit #457190 |
| Bas de l'image | #1b2d3b (uniforme) ; sous le titre #182a38 |
| Titre | blanc #ffffff en haut de la 1re ligne → #ebecee en bas de la 2e |
| Texte de nav, logo | #142633 ; texte du bouton lecture #172935 |
| Pilule | blanc, lueur #91b6d3 en haut ; texte #1d3445 |
| Disque du bouton lecture | #203d4f |
| Note | #eff3f8 ; étoile #efa801 |
| Sphère de verre | haut #a0d3fe, puis #76a9d4, centre #4e7795, bas #3a5f79, bord inférieur #4c6f85 |
| Puces | contour et texte blancs, intérieur transparent |

## Positions et tailles (pixels de maquette, 1440 de large)

| Élément | Relevé |
|---|---|
| Marges | gauche 91px (logo, bouton lecture, puces) ; droite 74px (pilule) |
| Nav | liens centrés à 43px du haut, capitales de 11px, « ADVENTURES » 123px de large, écart 82px |
| Pilule | 199 × 54px |
| Bouton lecture | disque de 76px, haut à 217px ; texte à 184px du bord, 3 lignes, capitales de 16,5px, pas de 24px |
| Note | chiffres de 45px de haut, « 4.8/5 » 114px de large ; libellé 165px, capitales de 13,5px ; étoile 13,5px |
| Puces | ≈ 188 × 58px, écart 16px, haut à 706px |
| Titre | bord gauche 372px ; capitales de 87px ; pas de ligne 113px ; « WITHOUT LIMITS » 975px de large ; fûts de 12,5px |
| Paragraphe | 3 lignes, pas de 30px, 579px de large, 50px sous le titre, bas à 91px du bord |
| Sphère de verre | 192px, bord gauche 951px, de 517 à 709px du haut ; texte capitales de 11px sur 2 lignes |
| Diagonale | frontière clair / sombre de (1200, 250) à (30, 800) : dégradé à ≈ 155° |

## Polices

- **Interface : Archivo** — non lue dans un fichier, mais les largeurs concordent : à hauteur de capitale égale, « ADVENTURES » fait 108px sur le shot (dans la sphère, sans approche) et 109px en Archivo ; « THOUGHTFULLY » 189,5 contre 190,6px. Inter, Hanken Grotesk, Manrope, Geist, Onest, Host Grotesk et Schibsted Grotesk s'en écartent de 5 à 12 %. La note correspond à Archivo 300 à 70 % de largeur.
- **Titre : non identifié.** Serif à empattements épais, contraste moyen, jambe du R recourbée, lettres presque jointes. Comparées : Source Serif 4 (bonnes largeurs, trop contrastée), Literata, Besley (trop large), Domine, Frank Ruhl Libre, Newsreader, Instrument Serif (bien trop étroite), Gloock. Retenue : **Roboto Serif 500 à 90 % de largeur**, approche −0.035em.

## Non mesuré / proposé

- **Toutes les animations** (`motion.md`) : la référence est une image fixe.
- **Tout ce qui est sous le héros** (séjours, chiffres, film de la semaine, témoignage, appel final, pied) et **la version mobile**.
- La hauteur réelle de l'écran de la maquette (l'image est coupée) : le bloc titre est ancré en bas, le haut en pourcentage.
- `--muted`, `--ember`, les filets, les rayons de carte, les tailles des titres de section : choisis.
- Les images par seconde citées dans `motion.md` sont mesurées dans un Chrome **sans carte graphique** (rendu logiciel) : ≈ 58 dans le héros, 51 pendant son défilement, plus de 100 ensuite.

## Écarts assumés

| Élément du shot | Dans le skill | Raison |
|---|---|---|
| Nom WayWild, logo, textes anglais | Agence fictive « Hautvent », signe générique, textes français | Identité et droits |
| Photo de l'alpiniste | Photo Unsplash (skieur de randonnée de dos, sac rouge) refroidie ; à remplacer par celle du projet | Droits d'auteur |
| Alpiniste de face à ≈ 40 % de la largeur | Sujet de dos à ≈ 45 % | Photo libre disponible |
| Un objet chaud (casque orange) | Deux zones chaudes (sac rouge, veste jaune) | Idem ; le seuil de chaleur se règle dans `assets.md` |
| Photo déjà bleue | Refroidissement calculé en canvas, voile diagonal en CSS | S'adapter à n'importe quelle photo |
| Puces transparentes sur fond moyen (blanc sur ≈ #8499aa, 2,9:1) | Fond `--deep` à 26 % sous les puces, voile plus sombre | Lisibilité |
| Libellé de la note sur #4e7c96 (≈ 4,3:1) | Ombre `--ridge` renforcée dans le coin haut droit | Lisibilité |
| Texte de la sphère sur son haut clair | Dégradé assombri un peu plus tôt (texte sur `--steel` / `--slate`) | Contraste ≥ 4,5:1 |
| Serif du titre | Roboto Serif resserrée | Police non identifiée |
| Brume et flocons | Ajoutés en canvas par-dessus la photo | Donner vie à une image fixe |
| Une seule image | Page complète + mobile | Rendre le skill utilisable |
