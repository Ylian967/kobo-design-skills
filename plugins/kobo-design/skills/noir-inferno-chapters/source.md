# Source — Noir Inferno Chapters

- **Référence** : http://falter.wild.plus/ (« Falter Inferno », récit interactif pour un journal ; l'ancienne adresse http://falter.madebywild.com/ ne répond plus). Fiche Awwwards : https://www.awwwards.com/sites/falter-inferno (Site of the Day, avril 2016)
- **Famille** : Récit illustré / édition
- **Analysé le** : 2026-10-01 (première version, d'après la fiche Awwwards) ; **2026-10-03, réécriture complète** : site ouvert dans Chrome à 1440×900, de l'écran de chargement à la dernière scène ; ≈ 60 captures ; styles calculés ; feuille de style et script de la page lus.
- **Ce qui plaît** : les peintures en noir et blanc, le cercle à tirer, le titre qui part en poussière, la sobriété de l'interface.

## Ce que contient la référence

Un site **animé et sonore** : les scènes sont dessinées dans un canvas WebGL (three.js) — peintures en plans superposés, personnages animés en boucle, particules — et l'interface est en HTML. Les titres de scène sont eux aussi dessinés dans un canvas. Les animations sont **relevées** sur le site, sauf mention contraire.

## Écrans vus

| Écran | Relevé |
|---|---|
| Chargement | Fond #0d0d0d, une ligne horizontale ondulée, puis un conseil d'écoute au casque |
| Ouverture | Citation en trois lignes (serif étroite, capitales), cercle de 52px, ligne pointillée, cible en tirets, consigne en capitales de 10px ; grain et points blancs |
| Scène en état « titre » | Titre serif en capitales centré avec point final, une à trois lignes de texte sans, croix en haut, petit cercle sous le texte ; image assombrie |
| Scène en état « vue » | Nom du journal en haut à gauche, « MORE ABOUT *titre* » en haut au centre, langues en haut à droite, réseaux en bas à gauche, « ABOUT … » en bas à droite, numéro en bas au centre |
| Passage | Tirer le cercle : le titre se désagrège en particules, puis fondu vers la scène suivante |
| Scènes 1 à 8 | Rue de nuit et voitures ; personnage devant un mur ; forêt et écrans ; arbre sur une falaise dans la brume ; foule de personnages masqués ; silhouette dans une ruelle ; machine volante ; créatures sous un projecteur |
| Scène 9 | Pièce sombre, piles de papier ; **une main rouge** en haut de l'écran, à tirer vers le bas : le seul élément en couleur du site |

## Mesuré (1440×900)

| Élément | Valeur |
|---|---|
| Fond | #0d0d0d |
| Polices | « Parkinson Cond » 400 (citation, numéros, titres) ; police de texte nommée « bodyFont » (non identifiée) |
| Citation | 20px, capitales, approche 0.6px, 300px de large, haut à 153px |
| Consigne | 10px / 18px, capitales, approche 1.4px, 246px de large, à 712px du haut |
| Cercle | 52px, contour 0.8px blanc, centre à 357px du haut ; sous un titre : 26px |
| Ligne et cible | ligne de 160px, cercles de 50px dans la feuille de style ; cible en tirets ≈ 65px |
| Titre de scène | `5vmin` (script), soit 45px ; 711px de large pour « DAS FALTER INFERNO. » ; haut à 380px |
| Numéro | 40px, interligne 75px ; zone de 400px centrée |
| Croix | deux traits de 20px × 1px, à 60px du haut |
| Bouton « ouvrir la scène » | contour 1px blanc, capitales, approche 0.1em, padding vertical 15px, à 10vh du bas |
| Titres de section | approche 0.2em, capitales |
| Coins | nom à 45px du bord gauche, liens de droite jusqu'à 1392px, ligne du bas à 843px |
| Panneau « à propos » | fond #dedede, texte noir 12px / 20px, approche 0.02em, colonne de 500px (80 % au plus), image 520px, crédits 10px à 60 % |
| Soulignement des liens | `width .6s cubic-bezier(.95,.05,.795,.035)` |
| Appel final | 30.6px, gris #5a5a5a (relevé du 2026-10-01) |

## Lu sur captures (non chiffré dans le code)

- Rouge de la main : ≈ #c41c24 sur une capture JPEG compressée ; le skill retient #d0202a.
- Paragraphe de scène : ≈ 13px, ≈ 480px de large.
- Durées : fondu de scène de 1 à 2s, poussière du titre en moins d'une seconde.

## Proposé par le skill (non mesuré)

- **Des photos à la place des peintures animées**, un fondu simple entre scènes, un décalage de l'image à la souris.
- Le seuil de validation du cercle (80 %), son retour, la cible qui s'allume.
- Les trajectoires de la poussière du titre ; la poussière d'ambiance en CSS.
- La rangée de numéros en mode « vue », le bouton « Lire la scène » repris du site mais repositionné.
- Les voiles (`--veil-*`), `--shade`, `--faint`.
- Toute la version mobile.
- Les images par seconde de `motion.md`, mesurées dans un Chrome sans carte graphique.

## Non vu

- Le contenu des scènes 3 à 9 en état « titre » (vues en état « vue » seulement), l'appel final après la main rouge, le panneau « à propos » ouvert (connu par sa feuille de style).
- La version anglaise, le son.
- La version mobile du site.

## Écarts assumés

| Référence | Dans le skill | Raison |
|---|---|---|
| Nom du journal, titre de l'œuvre, textes | Récit fictif « La Descente », média fictif « Veille », textes français | Identité et droits |
| Peintures animées en WebGL | Photos Unsplash en noir et blanc, fixes | Droits ; utilisable sans illustrations ni 3D |
| Parkinson Condensed (payante) | Instrument Serif | Serif étroite libre |
| Police de texte non identifiée | Inter | — |
| Neuf scènes | Sept | Longueur de la démo |
| Navigation au cercle seulement | Cercle + molette + flèches + Entrée + numéros | Accessibilité |
| Main rouge illustrée | Le cercle devient rouge | Pas d'illustration ; le principe « un seul rouge, à la fin » est gardé |
| Titres dessinés dans un canvas | Titres en HTML, canvas seulement pour la poussière | Accessibilité, référencement |
| Son d'ambiance | Aucun | Démo |
