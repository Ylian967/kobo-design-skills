# Source — Lore Frame Editorial

- **Site de référence** : https://kprverse.com/ (fiche Awwwards : https://www.awwwards.com/sites/kpr — Site of the Day, déc. 2022)
- **Famille** : Narration / univers illustré
- **Analysé le** : 2026-10-01 (fiche Awwwards, chargement seul) ; **2026-10-03, réécriture complète** : Chrome 1536×674, fenêtre visible, parcours image par image de l'accueil entier, du menu et de 5 pages internes, styles calculés et variables CSS du site.
- **Ce qui plaît** : le cadre-terminal, les illustrations en planches de dossier qui se plient, la typo énorme et serrée, le texte qui se décode, et surtout toutes les animations.

## Mesures brutes (styles calculés, 1536px)

- **Polices chargées** : ABC Whyte Plus (variable 125–950 ; utilisée en 400 et 650), Hexaframe 700, IBM Plex Mono 400/450/500/600.
- **Tailles** : paragraphes 13.5px/17.55 (−0.02em) ; légendes de chapitre 18.9px ; phrases-chapitres **49.92px/44.928 650 −3.49px** ; menu **61.44px/52.224 650 −4.30px** ; manifeste 135.9px/114.16 −12.73px ; compteur Hexaframe **276px 700 −27.6px** ; mot-titre Hexaframe **291.84px/233.47 700 −29.18px** ; labels mono 9–9.9px ; nav 11px 450 ; pied 13.44px −0.54px ; bouton Connexion IBM Plex Mono 14px 600.
- **Variables du site** : `--menu-pad 20px`, `--menu-width 67px`, `--menu-height 51px`, `--menu-radius 10px`, `--radius 1rem`, `--overlap 2rem`, `--parallax 4rem`, `--line-light hsla(0,0%,100%,.2)`, `--line-dark rgba(0,0,0,.1)`, `--line-thickness 1px`, courbes `--ease-out-quad/cubic/quart`, `--ease-in-out-sine`.
- **Couleurs** : #fff, #000 (dominantes) ; lavande **rgb(150,138,223)** (fond collection et équipe) ; citron **rgb(192,251,80)** (menu actif) ; pervenche rgb(140,166,255) ; #e1e1e1 ; voiles noirs .4 / .6 / .72.
- **Formes** : bouton Connexion 120×49, `clip-path: polygon(…16px 100%, 0 calc(100% - 16px))`, rayon `10px 10px 0 0` ; boutons du pied coupés à 1.6rem ; panneau de menu 576px + rail, rayon 10px.
- **Transitions CSS** : surtout 0.1s / 0.2s ease (couleurs, opacités) ; `transform .2s var(--ease-in-out-sine)`. Les grands mouvements sont pilotés en JavaScript (pas de bibliothèque d'animation exposée ; Nuxt, Howler pour le son, 1 canvas WebGL plein écran).
- **Keyframes CSS** : `spin-clockwise`, `spin-counterclockwise` (anneau du curseur), `dashoffset`, `flash`, `pulse`, `blink`.

## Pages explorées

« Mesuré » = valeur lue dans le navigateur ; « observé » = relevé sur captures successives (≈).

| Page / écran | Relevé |
|---|---|
| Chargement | Observé : fond blanc, filet pleine largeur qui se remplit, « ▸▸ LOADING – 77% » à gauche, chemin d'URL tapé à droite, cercle « click to enable sound » qui suit le pointeur avec anneau tournant ; puis barres arrondies noires qui fusionnent en logo géant (effet liquide), qui se retire sur l'illustration. |
| Ouverture | Observé : portrait illustré plein cadre, logo blanc géant puis manifeste « KEEP. PROTECT. REIMAGINE. » en escalier avec index « 01K 02P 03R », paragraphe en haut à gauche, « SCROLL ↘ ». |
| Héros → planche | Observé : l'illustration rétrécit en planche de dossier et glisse à droite ; panneau blanc à bord biseauté qui entre par la gauche. |
| 001 — monde | Observé : phrase-chapitre révélée gris → noir, 1re ligne indentée après « ■ 001 » ; trois planches de dossier (paysage, portrait « ■ ANIMUS CHARACTER », tour) ; paragraphe tapé lettre à lettre. |
| 002 / 003 | Observé : illustration plein cadre (nuages, montagne) en parallaxe, grille de filets blancs avec diagonale, coordonnées, « 33.8° » avec mini-jauge, nuage de points blanc ; phrases-chapitres blanches. |
| Transition | Observé : rideau de barres blanches liquides au-dessus de l'illustration. |
| 004 — collection | Observé : compteur Hexaframe vertical « 05K » → « 10K », label « ▸▸ INITIAL COLLECTION », cristal sur grille avec règle graduée, planche « WINDOWS TO THE » (œil) ; puis fond lavande, « 10,000 UNIQUE DIGITAL COLLECTIBLES. », éventail de 11 portraits qui tourne. |
| Chapitres | Observé : planches éparses → une planche grandit plein cadre (« 001 ■ THE KEEP ») → légende 18.9px centrée → sortie en biais, bord bas déformé ; idem « 002 ■ FACTIONS », « 003 ■ THE WORLD » ; la nav du cadre suit (carré « ■ »). |
| Gardiens | Mesuré : « KEEPERS » Hexaframe 291.84px. Observé : planches flottantes qui s'aplatissent horizontalement en sortie. |
| Pied | Observé : noir, 4 colonnes, textes mono qui se décodent, lien survolé en négatif, bouton contour coupé « DOWNLOAD BRAND BOOK », logo géant blanc, liens légaux. |
| Menu | Mesuré : mots Whyte 61.44px 650, panneau 576px rayon 10px, citron rgb(192,251,80). Observé : glissement depuis le rail, page grisée derrière, mots décodés en cascade, page active sur bloc citron coupé + « PAGE 001 », survol bloc blanc coupé + décodage, rangées Connect / Buy on / langue. |
| /about | Observé : phrase longue en 3 tons révélée au défilement, écran partagé avec étoile géante, section lavande (mesuré rgb(150,138,223)), « TEAM » géant, grille d'équipe à filets (nom, rôle, numéro, diagonales, logos), planche-portrait qui surgit au survol. |
| /gallery | Observé : filtres en accordéon (mono, cases, compteurs), recherche à coin coupé, grille 5 colonnes, images délavées puis en couleur, bouton « mélanger ». |
| /journal | Observé : nav de filtres, « // LOADING CONTENT » (contenu non chargé pendant la visite). |
| /media | Observé : mot « MEDIA » Hexaframe derrière une vidéo en planche, fiche fichier mono. |
| /protocol | Observé : fond bleu nuit, cercle fin et onde, lune, nav à crochets, consigne « HOLD [SPACEBAR] » dans un cartouche coupé. |
| < ~800px | Observé : écran « RESIZE » (site non pris en charge). |

## Non mesuré

- Durées des grands mouvements (chargement, fusion, planches, menu) : **estimées** sur captures successives ; elles sont pilotées en JavaScript, sans valeur CSS lisible.
- Les déformations des planches sont faites en WebGL sur la référence ; le skill les approche en CSS (inclinaison + cisaillement selon la vitesse).
- Les gris de révélation et de nav inactive sont relevés à l'œil.
- Pas de version mobile sur la référence : la section mobile de `layouts.md` est une proposition.

## Écarts assumés

| Élément du site | Dans le skill | Raison |
|---|---|---|
| ABC Whyte Plus (payante) | Inter Tight 650 (variable) | Licence ; même grotesque serrée, même graisse |
| Hexaframe (payante) | Tektur 700 | Licence ; police à angles coupés comparable |
| Paragraphes 13.5px | 14px minimum | Lisibilité |
| Nav inactive gris clair | `--muted` #6e6e6e | Contraste ≥ 4,5:1 à 11px |
| Planches WebGL déformées | Planches CSS + `clipPath` SVG, inclinaison selon la vitesse | Pas de dépendance ; option WebGL décrite dans `assets.md` |
| Pas de mobile (écran « RESIZE ») | Vraie version mobile | Le skill doit servir sur tous les écrans |
| Logo, personnages, illustrations, textes, univers | Univers inventé « AXO », photos libres colorées en attendant de vraies illustrations | Identité et droits d'auteur |
| Son (Howler) | Bouton son présent, aucun son joué par défaut | Accessibilité, poids |
