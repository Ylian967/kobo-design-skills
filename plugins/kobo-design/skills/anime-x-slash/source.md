# Source — Anime X Slash

- **Site de référence** : https://tbhx.net/en/ (site officiel d'une série animée d'action)
- **Famille** : Jeu vidéo & anime
- **Analysé le** : 2026-10-01 et 2026-10-02 (accueil puis pages internes, 1536×730) ; **2026-10-03, réécriture complète** : Chrome 1440×900, chargement capturé image par image, accueil entier, 7 pages internes, menu ouvert, mobile 390px, styles calculés, et **lecture des feuilles de style et des scripts du site** (`common.css`, `top.css`, `character.css`, `news.css`, `story.css`, `movie.css`, `music.css`, `special.css`, `common.js`, `top.js` et les scripts de page).
- **Ce qui plaît** : les découpes en biais, la grille de classement, le rouge sur gris, le chargement et le glitch.

## Mesures brutes

- **Technique** : jQuery, TweenMax (curseur), Rellax (parallaxe), Swiper (bannières), lecteur YouTube. Aucun canvas, aucun WebGL.
- **Base de mise à l'échelle** : `--vw-min: 1200` ; tailles en `min(n / 1200 × 100vw, n px)`. Points de rupture `max-width: 768px` / `767px`.
- **Polices chargées** : Noto Sans JP 400/500/700, Oswald 400/500, Roboto 400/500 et Noto Sans SC 400 (marginaux). Les grands titres, le menu et le logo sont des **images SVG** (masques).
- **Variables** : `--color-red01 #ff4040`, `--color-red02 #ed2215`, `--color-red03 #ff211e`, 10 couleurs de personnages (`#eaf4fc`, `#f8e58c`, `#7f1184`, `#fcc800`, `#ff9933`, `#eb6ea0`, `#00fa9a`, `#f5b2ac`, `#008db7`, `#fdd35c`).
- **Couleurs** : fond `#f4f4f4` ; fond du héros `#ededed` et magenta du logotype `#ee00bd` (lus sur capture) ; noir, blanc.
- **Angles** : cartes `skewX(-36.4deg)` et contenu `skewX(36.4deg)` ; portes de la bande-annonce `skewX(-37deg)` ; bande du chargement `skewX(-25deg)` ; traits du bouton MENU `rotate(±20deg)`.
- **Tailles (1440px)** : héros 765px ; bouton MENU 80×80 ; langue 40×24 (Oswald 14) ; titres de section 80px de haut ; bouton contour 200×40, bord 2px, Oswald 14 ; liste d'actualités 1052px, ligne 96px, bord haut 4px, marges 30/80/30/40, date 16px de haut en Oswald 14 ; texte d'intro 880px, 20px/40px 700, accroche 32px/1.875 ; staff : colonne de rôles 160px, noms 20px 700 `#ff211e`, 42px entre lignes ; grille 840px, carte 160×320, marge 8px, cadre intérieur 2px blanc à 40 %, image 247,5 % de large décalée de −72,5 %, numéro 91px, étiquettes 11px, nom 16px 700 ; curseur 110px ; pied 431px.
- **Chargement** (`top.js`) : compteur +1 % toutes les 10ms ; puis classe `is-firstAni` (bande `widthup 0.2s`, accroche `0.2s`) ; 1000ms plus tard `is-firstAniEnd` (glitch 0,25 / 0,35 / 0,5s) ; 300ms plus tard `is-hidden` (`opacity 0.5s`) ; 10ms plus tard arrivée des personnages ; 2000ms plus tard parallaxe et glitch toutes les 5000ms (2000ms d'activation).
- **Arrivée** : `.js-initAni { transition: all 0.4s cubic-bezier(0.86,0,0.07,1) }`, `translateX(±20%)`, `scale(1.25)` / `scale(0.75)` / `scale(1.15)`, retards 0,07 à 0,16s, accroche 0,6s.
- **Parallaxe** : `.rellax { transition: all 0.5s cubic-bezier(0.47,0.53,0.18,1) }`.
- **Curseur** : 110px, `mix-blend-mode: difference`, suivi `(cible − position) / 10` par tic, rotation 10s (6s mobile), `opacity 0.2s`.
- **Survols** : `a { transition: 0.4s }` ; boutons, onglets, actualités, cartes `0.3s ease` ; actualité `translateX(15px)`, chevron retardé de 0,2s ; carte `scale(1.1)` + `body.is-hover` → `grayscale(100%)` ; menu `opacity 0.5s ease-in-out` ; modales `fadeIn(500)` ; ancres `1000ms easeOutQuart` ; `strokeAnim 3s linear infinite`.
- **Observation des sections** : classe `js-scrani` / `is-ani` prévue dans le script, mais **aucune règle CSS ne l'utilise sur l'accueil** : pas de révélation au défilement.

## Pages explorées

« Mesuré » = lu dans le navigateur ou le code ; « observé » = relevé sur capture.

| Page / écran | Relevé |
|---|---|
| Chargement | Observé image par image : noir, « LOADING » et pourcentage en bas, logo gris qui blanchit, bande rouge avec accroche, glitch, fondu. Durées mesurées (ci-dessus). |
| Accueil — héros | Observé : illustration de groupe sur logotype magenta tramé, logo noir, bande noire d'annonce, rails « OFFICIAL » et « VISUAL SELECTOR » (4 vignettes). Mesuré : entrées, parallaxe, changement de visuel (`scale(1.2)`, 0,5s). |
| Accueil — bande-annonce | Observé : vidéo sombre visible dans un X, traits noirs parallèles, logo gris, bouton « ARCHIVE », partage. Mesuré : portes `skewX(-37deg)` qui passent de `50%` à `125%` en 0,5s. |
| Accueil — actualités, introduction, staff et casting, personnages, pied | Mesuré (tailles ci-dessus). Observé : filets rouges et gris fixes derrière, bloc noir dans l'introduction, triangles noirs aux bouts de la grille. |
| Menu ouvert | Mesuré : fondu 0,5s, bouton rouge, traits à ±20°. Observé : illustration de groupe grise, liens sur 2 colonnes, logo blanc à droite, langue, réseaux. |
| `/character` | Observé : logo noir centré, titre, grille, onglets rectangulaires, bande « Episode of … » rose, lignes d'épisode. Mesuré : onglets `0.3s`, contenu `fadeIn .4s`. |
| `/character/?chara=x` | Observé : fond noir, nom blanc, rang rouge, « CV », accroche sur étiquette noire biaisée, illustration sur éclats multicolores, 2 vignettes vidéo, grille en gris sauf l'actif. Mesuré : changement de vue `scale(0.8)` → `1`, bouton rond `rotate(-180deg)`. |
| `/news` | Observé : mêmes barres que l'accueil, sur une colonne plus haute. Mesuré : pagination `0.6s`. |
| `/story` | Observé : cases #24 → #01 sur 2 rangées, active rouge ; image d'épisode, bande de vignettes, texte ; vignette de bande-annonce. Mesuré : `0.3s`, vignettes grises → couleur. |
| `/movie` | Observé : filtres 2 × 4 sur noir, actif rouge avec encoche ; grille de vignettes légendées. Mesuré : liste `opacity .6s`, vignette `scale(1.1)`. |
| `/music` | Observé : onglets 3 colonnes, accordéons (noir ou image grise), rond « + » / « − », panneau noir avec pochette, titre entre 「 」, crédits rouges, bouton contour. Mesuré : `slideToggle`, `0.3s`, section `fadeIn(1000)`. |
| `/special` | Observé : une bannière « KEYWORD » rouge et noire, légende. |
| Mobile 390px | Observé : MENU en haut à droite, visuel en hauteur, logo sous le visuel, menu en une colonne centrée, textes pleine largeur, générique en une colonne. |

## Non mesuré / proposé

- Le **visuel du héros en 5 éclats photo** : le site montre une seule illustration de groupe ; la découpe en éclats est une proposition qui reprend l'angle et la technique de ses cartes.
- La forme exacte du **X** de la bande-annonce (celle du site vient de son logo) et le **logotype** en texte.
- Le mobile des pages internes (fiche, histoire, musique) : déduit.
- Pagination d'article et page d'article : non vues.
- Les images par seconde de `motion.md` : mesurées sur la démo dans un Chrome sans carte graphique.
- Les anciennes pages d'exemple `personnage.html` et `medias.html` ont été supprimées : seule `demo.html` illustre le skill.

## Écarts assumés

| Élément du site | Dans le skill | Raison |
|---|---|---|
| Logo, illustrations, personnages, noms, textes | Série fictive « Rank Zero », logotype en texte, photos Unsplash colorées | Identité et droits d'auteur |
| Titres et menu en images | Texte Oswald | Accessibilité, traduction |
| Curseur et bouton en `mix-blend-mode: difference` | Disque et bouton opaques | Fluidité (42 → 83 images/s en rendu logiciel) |
| Filets du fond redessinés en boucle (3s) | Filets fixes | Fluidité |
| Portes de la bande-annonce rouges (thème rouge) ou grises (thème par défaut) | Grises (`--bg`) | Thème par défaut du site ; le titre rouge reste lisible |
| Blanc sur rouge (bouton MENU ouvert, onglets actifs, étiquette du pied) | Noir sur rouge, ou rouge assombri `--menu-close` | Contraste |
| 10 couleurs de personnages | 8 tokens `--chara-*` | Suffisant pour le langage ; en ajouter au besoin |
| Vidéo YouTube en fond de la bande-annonce | Photo fixe | Poids, pas de dépendance |
| Rôles du staff en très petit | 13px | Lisibilité |
