# Source — Hyper Lime Street

- **Site de référence** : https://zenless.hoyoverse.com/fr-fr/main (site officiel d'un jeu d'action urbain)
- **Famille** : Jeu vidéo
- **Analysé le** : 2026-10-01, Chrome, 1536×674, page d'accueil complète (5441px)
- **Méthode** : `extract-design.js` + captures de chaque section

## Mesures brutes

- **Polices chargées** : Impact (« en impact »), icomoon ; texte secondaire en police système (« meSubFont », Inter, system-ui)
- **Tailles** : 25.2px (dominant, display), 12px, 52.8px, 14.4px, 14px, 24px, 60px, 39px, 19.2px, 48px
- **Textes** : #222122 (dominant), #919191, #ccd0d2, #000000, #ffffff, #787878
- **Fonds** : #111111 (dominant), #000000, #ffffff, #c6e800, #d8fa00 ; fond de page #efefef
- **Bordures** : 4.8px solid #767678 (boutons pilule), 2.4px #646464, 0.8px #c6e800
- **Rayons** : 8.4px (×18), 72px (×7), 100%, 24px, 3px
- **Padding de section** : 117px 0 (×62)
- **Transitions** : all 0.3/0.4/0.5/0.6s cubic-bezier(0.215, 0.61, 0.355, 1) (~250 éléments), transform 0.3s ease-in-out
- **Animations** : wordsLoop 20s linear, heartbeat 0.8s ; keyframes rotation, tada, wordsLoopMob, swiper-preloader-spin
- **Bouton plein** : « M'abonner maintenant » fond #c6e800, rayon 24px, padding 14px 16px, all 0.2s linear
- **Points de rupture** : min-width 1025px, 1024px, max-width 1023px, 1024–1365px, max-width 374px

## Pages explorées (2026-10-02)

Exploration en navigateur des pages internes, menus et survols. **Mesuré** = valeur lue par script dans le navigateur ; **observé** = relevé à l'œil sur capture.

| URL | Relevé | Nature |
|---|---|---|
| `/fr-fr/main` | Accueil (voir « Mesures brutes ») | mesuré |
| (navigation, toutes pages) | Barre noire ~60px ; libellés gris clair 13px gras sur 2 lignes centrés ; actif = pilule blanche texte noir ; « Plus ▾ » ; bouton pilule lime « Télécharger maintenant » ; icône musique ronde | observé (sauf hauteur et couleurs déjà mesurées sur l'accueil) |
| `/fr-fr/news` | Badge de section lime « Actu & infos / NEWS & INFO / 04 » sur bande diagonale noire rayée ; filigrane « NEWS & INFO » géant italique gris pâle ; carrousel bannière 16:9 rayon ~24px + points (actif lime cerclé) ; barre d'onglets pilule noire, actif = parallélogramme blanc ; grille 3 colonnes de cartes à image aux coins asymétriques (haut-gauche + bas-droit 24px), date 14px gras + étiquette catégorie parallélogramme noir texte lime 11px, titre 17px gras 1 ligne, extrait gris 12px 2 lignes | observé |
| `/fr-fr/news/166535` (article) | Titre centré gras ~28px ; barre pilule noire (fil d'Ariane blanc / date) ; texte centré 13px ; onglet latéral fixe vertical « Retour » noir/lime | observé |
| `/fr-fr/video` | Badge « 03 », filigrane « VIDEO » | observé |
| `/fr-fr/world` | Badge « 05 » ; fond = image floutée plein écran ; coverflow : carte centrale noire (rayon ~16px, titre condensé blanc ~40px, sous-titre lime, image en bandes diagonales), voisines plus petites et assombries ; flèches dans des pilules noires à contour blanc aux bords | observé |
| `/fr-fr/character?id=…` | Badge **bleu** #1f6bff « 02 » ; rendu du personnage à gauche ; nom ~48px gras + filigrane du nom ; pilule de doublage (micro, nom, interrupteur JP/EN) ; citation en gras ; texte gris dans un bloc défilant à barre fine ; colonne de cartes noires verticales à emblèmes (factions) + pilule lime « Plus de factions » | observé |
| (bas de page) | Icônes réseaux grises sur #111 ; « M'abonner aux messages » 26px gras blanc ; champ pilule #222 ; bouton pilule lime ; case de consentement + lien lime « Détails >> » | observé |
| mobile (390px) | **Non observable** : le site sert une version mobile selon l'appareil ; l'iframe de 390px affiche la version bureau réduite | — |

Toutes les durées d'animation des pages internes sont **estimées** (`references/motion.md`) ; les nouveaux tokens (`--accent-blue`, `--field`, `--radius-lg`, `--radius-asym`, tailles 10/17/28/48px) sont observés, pas mesurés.

## Non mesuré

- Mobile non mesuré ni observable (version mobile servie selon l'appareil) : adaptation déduite des points de rupture, voir `references/layouts.md` § Mobile.
- Les rayures fines des rubans et la pellicule ont été relevées sur captures (ce sont des images sur la référence) ; elles sont recodées en CSS.

## Écarts assumés

| Élément du site | Dans le skill | Raison |
|---|---|---|
| Impact (police système) | Anton (Google Fonts) | Disponible partout, même structure condensée |
| Gris #787878 sur béton | #6b6b6b | 3,8:1 → 4,6:1 |
| Logo, personnages, illustrations | Emplacements `data-slot` | Droits d'auteur |
| Rendus de personnages, emblèmes de factions, illustrations de l'univers | Photos de rue Unsplash et emplacements `data-slot` dans `examples/actus.html` | Droits d'auteur |
| Visuels de la démo | Photos Unsplash libres (licence Unsplash), à remplacer par les images du projet | Démo sans droits ; voir `references/assets.md` |
