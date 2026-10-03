# Source — Hold To Play Music

- **Référence** : http://www.because-recollection.com/ (« Because Recollection », rétrospective des dix ans du label Because Music). Fiche Awwwards : https://www.awwwards.com/sites/because-recollection (Site of the Day, déc. 2015)
- **Famille** : Musique / expérience interactive
- **Analysé le** : 2026-10-01 (première version, d'après la fiche Awwwards) ; **2026-10-03, réécriture complète** : site ouvert dans Chrome à 1440×900, en français ; écran d'ouverture, accueil, appui sur la barre d'espace, trois artistes, une touche de scène ; ≈ 45 captures ; styles calculés des textes ; feuille de style du site lue en entier.
- **Ce qui plaît** : le geste « maintenir », le lettrage peint, le passage du gris à la couleur.

## Ce que contient la référence

Un site **animé et sonore**, dessiné dans un seul canvas plein écran (PixiJS) avec les textes en HTML par-dessus. Les animations sont donc **relevées**, pas inventées, sauf mention contraire. Pas de défilement.

## Écrans vus

| Écran | Relevé |
|---|---|
| Ouverture | Fond blanc à grain, logo du label, pictogrammes notes + casque, deux lignes dont des mots en orange et en bleu |
| Assemblage | Fond noir à grain ; des traits de pinceau bleus, orange et blancs se rangent pour former le mot-titre |
| Accueil | Vidéos en noir et blanc plein écran qui se succèdent (portraits, clips, illustration) ; logo « présente » ; mot peint ; accroche ; « Maintenez ( espace ) pour lancer … » ; pied de page mono |
| Appui | Les vidéos passent en couleur et changent très vite ; le mot devient blanc ; le contour de la touche se remplit en orange ; après ≈ 1.5s : « Relâchez ( espace ) … est prêt. » |
| Annonce | Nom de l'artiste + titre entre guillemets au centre, puis l'année seule |
| Scène | Image ou animation propre à l'artiste, grise ; consigne « Maintenez H pour déclencher le chaos » (ou « Cliquez sur le crâne pour dévoiler … ») ; en maintenant, la scène s'anime en couleur |
| Barre d'artiste | Vignette de pochette, « Nom (année) » + rond fléché, « Maintenez ( espace ) pour changer d'artiste. », « Besoin d'aide ? » ; rappel du mot en haut à droite |

## Mesuré (1440×900)

| Élément | Valeur |
|---|---|
| Polices | Camphor 200 / 400 (interface), Inconsolata 400 (mono) ; le mot-titre et le logo sont des images |
| Consigne | 20px / 48px, graisse 400, blanc ; à 655px du haut sur l'accueil, à 807px sur une scène |
| Touche | 140 × 48px, contour 1.6px blanc, rayon 24px, sans fond ; libellé 17px graisse 200 ; pendant l'appui libellé `rgb(255,102,0)` |
| Accroche | 14.3px / 16px, graisse 200, à 580px du haut |
| « présente » | Inconsolata 12px / 16px, #858585 |
| Pied | Inconsolata 13px, blanc, à 856px du haut ; liens à 248px et 319px du bord gauche, à droite mot-dièse et partage |
| Annonce d'artiste | 38px (feuille de style) |
| Année dans la barre | 20px / 27px |
| Pochette | vignette 150 × 150px à 30px du bord gauche ; ouverte 424 × 424px |
| Générique | 46px, interligne 1.4 |
| Couleurs | #fff (×29), #e47839 (×7), #383838 (×7), #000, #002fa7, #f60, #bababa, #858585 ; blanc à 40 % |
| Courbes | `cubic-bezier(1,0,0,1)` (×38), `(.77,0,.175,1)` (×12), `(.645,.045,.355,1)` (×6), `(.455,.03,.515,.955)` (×4), `(.19,1,.22,1)` (×4) |
| Durées | couleurs et opacités 0.5s ; touche 0.1s linéaire ; fondus 0.3s et 0.6s ; glissements 0.7s ; `push-cover` 1s ; `blink` 0.3s ; soulignement 0.25s puis 1s |
| Mot peint (capture) | ≈ 713px de large, ≈ 187px de haut, centré |

## Proposé par le skill (non mesuré)

- **Des photos à la place des vidéos**, en deux versions (gris / couleur), changées par coupe.
- La cadence des plans (2s au repos, 180ms pendant l'appui), le voile à 45 %, le grain fixe.
- L'assemblage du mot : positions de départ aléatoires, 900ms, 45ms entre lettres ; le lettrage lui-même (police étirée + filtre).
- La durée exacte de l'appui (`--hold` 1500ms : lue sur captures, pas dans le code).
- L'effet de la touche de scène (retour de la couleur), la liste des morceaux dans la pochette ouverte, le contenu de l'aide.
- L'issue au clavier (Entrée), le maintien au doigt, toute la version mobile en portrait.
- `--orange-ink`, `--veil`, `--veil-strong`.

## Non vu / non mesuré

- Sept des dix artistes, la page « À propos » (générique) au-delà de sa feuille de style, le partage, le plein écran.
- Le **son**.
- La version mobile (le site demande de tourner l'appareil).
- Le grain du site bouge et ses vidéos aussi ; dans la démo le grain est fixe et les photos immobiles (voir « Performance » dans `motion.md`).

## Écarts assumés

| Référence | Dans le skill | Raison |
|---|---|---|
| Because Music, ses artistes, clips, pochettes, logo | Label fictif « Minuit Dix », cinq artistes inventés, photos Unsplash, pochettes en peintures abstraites | Identité et droits |
| Lettrage peint (image) | Londrina Solid étirée + filtre ; vrai lettrage recommandé dans `assets.md` | Pas de lettrage libre équivalent |
| Camphor (payante), graisse 200 | Figtree 300 / 600 | Licence ; consignes en 600 pour la lisibilité sur photo |
| Vidéos + canvas | Photos, `visibility` | Démo légère, sans fichiers vidéo |
| Son | Aucun | Démo ; règle « pas de son avant un geste » gardée |
| Orange #e47839 sur blanc (2,9:1) | `--orange-ink` #b4541a | Contraste |
| Bleu #002fa7 en texte sur noir (2,1:1) | Grandes lettres peintes seulement | Contraste |
| Geste obligatoire, paysage imposé | Entrée pour passer, portrait accepté, maintien au doigt | Accessibilité, mobile |
| `blink` à 0.3s | 0.9s | Moins de 3 clignotements par seconde |
| Une interaction différente par artiste | Une seule (retour de la couleur) | Longueur de la démo |
