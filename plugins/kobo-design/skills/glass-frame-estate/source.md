# Source — Glass Frame Estate

- **Site de référence** : https://dribbble.com/shots/27776118-Realeste-Real-Estate-Property-Listing-Website-Template (shot Dribbble « Realeste — Real Estate Property Listing Website Template », par Imran)
- **Famille** : Immobilier / annonces
- **Site en ligne du template** : https://realeste.framer.website/ (lien donné dans la description du shot)
- **Analysé le** : 2026-10-01, Chrome (shot) ; 2026-10-03, Chrome 1536×730 + navigateur 612px (site en ligne, `extract-design.js` + styles calculés)

## Ce qui a été vu

- **Héros** : carte encadrée (filet blanc 1px, rayon ~6px) posée sur la même photo en plein écran, floutée. Photo : maison contemporaine en A sur une colline verte, ciel de fin de journée doré.
- **Mot-marque géant** en haut au centre, blanc avec un dégradé vertical vers la transparence (~70 % → 0), placé derrière le bâtiment, effet vitré.
- **Navigation** : logo avec une marque en X à gauche, petite heure au centre, à droite la ville, « MENU » et une icône ronde blanche à points.
- **Titre** en bas à gauche, capitales blanches en grotesque légère/régulière (~40px, proche d'Inter), petit bouton blanc rectangulaire « LEARN MORE → » (rayon ~2px, texte noir).
- **Carte conseiller en verre** : portrait carré, numéro de téléphone, bouton blanc « CALL NOW → ».
- **Page longue** (vue seulement en vignette) : sections blanches, grille d'annonces 2×2 avec photos, bande noire de chiffres et de logos, équipe en grille 4×2 de portraits, cartes de blog, lettre d'info, pied de page noir avec le mot-marque géant estompé.

## Pages explorées (2026-10-03)

« Mesuré » = valeur lue dans le navigateur ; « observé » = relevé à l'œil sur capture (≈).

### Mesures brutes (accueil, 1536px, hauteur 15 946px)

- **Polices chargées** : Inter 400/500/600, Geist Mono 500 (heure). Inter ×4034 caractères.
- **Tailles** : 16px/25.6 400 (texte), 16px/16 500 (surtitres, boutons, étiquettes), 20px/22 500 (−0.4px), 24px/26.4 500 (−0.48px), 32px/35.2 500 (−0.64px), 48px/52.8 500 (−0.96px), 80px/88 500 (−1.6px, héros), 100px/110 600 (−2px, pages internes), 280px/308 600 (−11.2px, mot-marque). Capitales partout (×2363).
- **Couleurs de texte** : #000, #fff, #555 (secondaire), blanc 80 %.
- **Fonds** : #fff (dominant), #f2f2f2, #000, #fafafa, #191919 à 20 % (voiles), noir 5 % (cellule du héros).
- **Dégradés** : `linear-gradient(270deg, rgba(9,9,9,0) 12%, #090909 103%)`, `linear-gradient(rgba(0,0,0,0) 56%, #000 92%)` (voiles photo), `linear-gradient(0deg, rgba(255,255,255,0) 8%, rgba(255,255,255,.4) 116%)` (mot-marque).
- **Rayons** : 10px (×51), 6px (×51), 4px (×38). Aucune bordure CSS.
- **Flous** : `backdrop-filter` blur(2px) cellule conseiller, blur(5px) menu, blur(7px).
- **Espacements** : gap 10px (dominant), 80px, 20px ; paddings 140px 30px (sections), 30px (panneaux), 22×20 (FAQ), 13×18 (boutons), 10px (cartes).
- **Transitions** : `color 0.4s cubic-bezier(0.44, 0, 0.56, 1)` (seule, ×23).
- **Points de rupture** : 1200px, 768px.
- **Médias** : 50 images, 1 vidéo.

### Pages

| URL | Relevé |
|---|---|
| `/` | Mesuré ci-dessus. Observé : héros **plein écran** (pas de cadre sur le site), mot-marque derrière le bâtiment, cellule conseiller en deux parties ; compteurs odomètre ; règle graduée ; 4 annonces 2×2 (étiquettes lieu + statut) ; services sur noir ; 4 quartiers en cartes grises ; étapes empilées collantes ; mosaïque de témoignages 3×2 ; 6 agents sur #f2f2f2 ; contact + formulaire gris ; journal ; FAQ ; appel final ; pied noir. |
| Menu (clic MENU) | Mesuré : voile `backdrop-filter: blur(5px)`, padding 120/30/80, liens H4 32px/35.2 500. Observé : liens centrés empilés, MENU → CLOSE. |
| `/about` | Mesuré : héros 700px, H1 100px ; logos clients 624px ; « Qui nous sommes » 1 430px ; agents sur #f2f2f2 ; témoignages 4×380px sur 2 rangées, gap 10px. Observé : 8 logos en cases grises 4×2, 4 cartes de chiffres avec indicateur de 4 carrés, grande photo rayon 10px. |
| `/services` | Mesuré : 6 lignes de 1200px. |
| `/services/<détail>` | Mesuré : titre 40px, 9 blocs de 750px, sous-titres 32px. |
| `/property` | Mesuré : grille d'annonces sur 2 730px. |
| `/property/<fiche>` | Mesuré : H1 100px/110 600 −2px ; colonne 650px (5 blocs, gap 60px) ; encart prix noir 460×95 padding 30px rayon 10px (« PRICE » 24px, montant 32px) ; encarts gris 460px. Observé : galerie 2×2, carte Google. |
| `/neighborhood/<quartier>` | Mesuré : héros 700px + biens du quartier (700px). |
| `/blog`, `/blog/<article>` | Mesuré : 3 cartes (titre 24px) ; article : titre 48px, 6 blocs de 800px, intertitres 32px. |
| `/contact` | Mesuré : héros « GET IN TOUCH » 100px, bloc contact 1 041px, carte 740px. |
| `/404` | Mesuré : « 404 » H1 340px blanc. Observé : translucide sur photo assombrie, message 16px dessous. |
| Mobile (612px) | Mesuré : héros 40px, H2 32px, nom de bien 16px, mot-marque 280px. Observé : annonces en 1 colonne. |

## Non mesuré

- Le **shot** est une image ; les valeurs de la partie « Pages explorées » viennent du site Framer en ligne du template. Le **cadre** autour du héros n'existe que sur le shot (mise en scène) : il reste la signature du skill, assumée.
- **Analyse visuelle des images uniquement** : couleurs, tailles, flous et espacements sont **estimés** ; le bas de page du shot n'était visible qu'en vignette ; il est désormais remplacé par les sections relevées sur le site en ligne.
- **Polices choisies à l'œil** (Inter, Inter Tight) : la police d'origine n'a pas été identifiée.
- Animations : seule la transition de couleur est mesurée ; titres qui se remplissent, odomètres et étapes collantes sont observés, leurs durées sont estimées. Les premières lignes de `motion.md` (mise au point, montée) restent une proposition.
- Mobile observé à 612px (pas 390px) ; détail des colonnes latérales du détail de service et de la page contact non relevé (estimé).

## Écarts assumés

| Élément de la maquette | Dans le skill | Raison |
|---|---|---|
| Texte blanc directement sur la photo | Voile `--shade` en bas de photo, texte posé dessus (13:1) | Contraste garanti quelle que soit la photo |
| Carte en verre seule | Repli opaque `--glass-solid` sans `backdrop-filter` | Compatibilité, contraste |
| Prix / liens | Ambre `--accent` #a8641f gardé pour les prix et « Lire → » ; le site, lui, est entièrement noir et blanc | Proposition du skill, assumée |
| Inter 300 (premier jet, d'après le shot) | Inter 500 (mesuré) | Corrigé d'après le site |
| Héros plein écran sur le site | Cadre 1px sur photo floutée (vu sur le shot) | Signature conservée |
| Nom « Realeste », logo, photos de maisons et de l'équipe, numéro de téléphone | Marque fictive « Halden », photos Unsplash libres (`data-slot`), numéro factice | Marque, droits d'auteur, vie privée |
| Textes anglais | Textes français inventés | Identité, langue |
| Photos de maisons et d'équipe | Visuels de la démo : photos Unsplash libres (licence Unsplash) et/ou scène Three.js, à remplacer par les images du projet | Droits d'auteur ; démonstration du rendu avec de vraies images |
