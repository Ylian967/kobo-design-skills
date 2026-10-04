# Source — Cosmic Voyage

- **Site de référence** : https://hsr.hoyoverse.com/fr-fr/home (site officiel d'un RPG gacha de science-fantasy)
- **Famille** : Jeu vidéo & gacha
- **Analysé le** : 2026-10-01 et 2026-10-02 (accueil, personnages, actualités, mondes, mobile) ; **2026-10-03, réécriture complète** : Chrome 1440×900, arrivée capturée image par image, accueil parcouru écran par écran, pages Informations, Personnages et Mondes, styles calculés, lecture des 53 feuilles de style de la page (images clés, transitions), couleurs lues sur capture.
- **Ce qui plaît** : la nuit étoilée, les cartes à un coin, le panneau de verre des personnages, la carte des mondes, le saut en hyperespace.

## Mesures (1440 × 900)

- **Technique** : Nuxt (Vue), Swiper pour les carrousels, 1 canvas (intro), styles en ligne. Racine `html` à **56,25px** (3,90625vw) : tout est en `rem`.
- **Police** : Microsoft YaHei (police système), Arial en repli ; une police d'icônes.
- **Barre** : 57px, fond `#121212` ; liens 15px blancs ; lien courant `#307af7` ; plaque « Télécharger » 168 × 54px.
- **Cartes d'actualité** : 424 × 331px, image 396 × 227 ; date 11,8px `#dbbf91` ; « + more » 11,25px `#bfbfbf` ; titre 12,4px / 20,5px `#e9e9e9`, graisse 500.
- **Bouton « En savoir plus »** : 146 × 27px, bord 0,8px `rgba(230,230,230,.5)`, texte 11,25px.
- **Cartes de personnage** : 226 × 486px, nom 16,9px blanc ; rangée de 1 215px commençant à 225px du bord.
- **Fiche personnage** : contenu 450 × 497px ; nom 29,8px 400 `#ededed` ; « VA » 10,7px `#d7d7d7` ; texte 12,4px / 19,7px ; emblèmes 108 × 98px ; libellé de faction 11,8px 700, `#6f6e6e` quand inactif.
- **Page Informations** : onglets 16,9px, actif `#dbbf91` ; bandeau d'article 993 × 151px ; titre 16,9px / 21,4px 500.
- **Couleurs lues sur capture** (éléments peints dans des images) : nuit `#141936` (haut) → `#070a1b` (bas), halo `#234177` ; en-tête du panneau `#1a264e`, corps `#7d8ea2` ; bande d'abonnement `#121212` ; bouton d'abonnement `#df9540` ; pied noir.
- **Transitions** : barre `transform 0.5s ease-in-out` ; menu déroulant `opacity 0.2s` ; nom d'un personnage `opacity 0.4s, transform 0.4s` ; fiche `visibility 0.6s` ; carte des mondes `opacity 0.3s, transform 0.3s` ; changement de page `0.3s linear` ; fenêtres 0,2s, courbe `cubic-bezier(0.15, 0.59, 0.45, 0.89)`.
- **Animations** : étoiles `fade-out` 1,08 à 1,88s `ease` en aller-retour (retards 0,53 à 1,2s) ; égaliseur 5 barres de 0,3 à 0,7s en aller-retour ; trait « Scroll Down » 2s `linear` en aller-retour ; chevron mobile 2s ; reflet `left: -100% → 100%` ; `rotation` 360°.
- Passe du 2026-10-01 (non remesuré) : rayons `0 28px 0 0`, 12px ; échelle `--global-radius` 6 à 48px et `--global-spacing` 4 à 80px ; bouton principal `#db9a45`, rayon 12px, `all 0.2s linear`.

## Pages explorées

« Mesuré » = lu dans le navigateur ; « observé » = relevé sur capture.

| Page / écran | Relevé |
|---|---|
| Arrivée | Observé toutes les 0,6s : noir ≈ 2s, puis traits de lumière qui fusent du centre avec le logo en haut à gauche, puis le visuel clé. |
| Accueil — héros | Observé : visuel clé plein écran, plaques de boutique et bouton lecture en bas, rail « Follow » à droite, « Scroll Down ». |
| Accueil — actualités | Mesuré (tailles ci-dessus). Observé : titre en cartouche, nœud doré sur un filet vertical, 3 cartes visibles, flèches rondes, compteur « 01 / 05 ». |
| Accueil — personnages, abonnement, pied | Mesuré. Observé : 4 cartes hautes à losange coloré, bande noire avec champ et bouton orange, logotypes centrés. |
| `/news` | Mesuré : onglets, bandeaux. Observé : étoile entre les onglets, vignette à gauche, date à droite, bouton pleine largeur. |
| `/character` | Mesuré : nom, textes, emblèmes. Observé : frise de 3 emblèmes avec chevrons, panneau à en-tête sombre et corps clair, boîte de texte claire, portrait débordant à droite, citation en 4 bandes noires, 4 vignettes. |
| `/world` | Observé : grands cercles pleins et pointillés, mondes lumineux à halo avec libellé, étiquette « Mondes ». Le clic vers la fiche d'un monde n'a pas abouti pendant cette passe : la fiche est décrite d'après la passe du 2026-10-02. |
| Mobile | Dans Chrome rétréci à 390px, le site garde sa mise en page de bureau (il choisit sa version selon l'appareil). La version mobile décrite vient de l'observation du 2026-10-02 dans un autre navigateur, accueil seulement. |

## Non mesuré / proposé

- Durée exacte du saut en hyperespace, du glissement du carrousel, de la rotation de l'anneau de lecture, du cycle du reflet : proposées.
- Le visuel clé du site change à chaque version du jeu ; au moment du relevé il était clair et très coloré. Le skill garde la nuit étoilée comme ambiance de référence.
- Entrées au défilement (blocs qui montent en fondu), survols des cartes : proposés.
- Pages internes en mobile : proposées.
- L'ancienne page d'exemple `mondes.html` a été supprimée : seule `demo.html` illustre le skill.
- Images par seconde de `motion.md` : mesurées sur la démo dans un Chrome sans carte graphique.

## Écarts assumés

| Élément du site | Dans le skill | Raison |
|---|---|---|
| Logo, illustrations, personnages, emblèmes, noms, textes | Jeu fictif « Astralis », logotype en texte, emblèmes génériques, photos Unsplash | Identité et droits d'auteur |
| Microsoft YaHei (système Windows) | Noto Sans, Noto Serif pour les citations | Disponible partout |
| Panneau, bandeaux et cartouches peints dans des images | Dégradés et bordures CSS | Pas de dépendance aux images du site |
| Molette qui passe d'un écran à l'autre sur l'accueil | Défilement normal | Accessibilité, mobile |
| Blanc sur plaque dorée, libellés gris sombre sur la nuit | Noir sur doré, gris `--muted` réservé aux éléments inactifs | Contraste |
| Tailles liées à la largeur (racine 3,9vw) | Tailles fixes avec `clamp` sur les cartes | Lisibilité sur petit écran |
| Fiche personnage sur sa propre page | Intégrée à l'accueil de la démo, sous les cartes | Montrer la signature dans une seule page |
