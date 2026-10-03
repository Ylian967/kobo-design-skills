# Source — Anime X Slash

- **Site de référence** : https://tbhx.net/en/ (site officiel d'une série animée d'action)
- **Famille** : Jeu vidéo & anime
- **Analysé le** : 2026-10-01, Chrome, fenêtre 1536×730, page d'accueil complète (7114px de haut)
- **Méthode** : `extract-design.js` + captures à chaque section (héros, visuel découpé, actualités, introduction, staff/casting, classement, pied de page)

## Mesures brutes

- **Polices chargées** : Noto Sans JP 400/500/700, Oswald 400/500, Roboto 400/500 (marginal), Noto Sans SC 400 (marginal)
- **Tailles dominantes** : 20px (texte d'intro), 16px, 11–12px (labels), 32px (accroches), 91px (titres de section)
- **Graisse dominante** : 700 ; espacement 0.8px ; interligne 40px sur 20px
- **Fonds (pondérés par surface)** : #f4f4f4 (dominant), #000000, #ffffff, #ff211e, #ff4040
- **Textes** : #000000, #ffffff, #ff211e, #ff4040
- **Variables CSS** : --color-red01 #ff4040, --color-red02 #ed2215, --color-red03 #ff211e, 9 couleurs de personnages (--chara-color-*)
- **Bordures** : 0.8px et 1.6px noir, 4px #ff4040
- **Rayons** : uniquement 50% (boutons ronds)
- **Ombres, dégradés CSS** : aucun (hors visuels)
- **Mélange** : mix-blend-mode difference (×2)
- **Transitions** : all 0.4s ease (×56), all 0.3s ease (×41), all 0.5s cubic-bezier(0.47, 0.53, 0.18, 1) (×17), all 1s ease
- **Keyframes** : strokeAnim, widthup, rotate, glitch-effect, glitch-effect-loop, fadeIn
- **Points de rupture** : max-width 768px / min-width 769px
- **En-tête** : fixe ; padding des sections 80px 0 ; container des actualités ≈ 1146px ; colonne de texte à x≈332px

## Pages explorées (2026-10-02, Chrome 1536×730 + cadre 390px)

« Mesuré » = valeur lue dans le navigateur (styles calculés) ; « observé » = relevé à l'œil sur capture.

| URL | Relevé |
|---|---|
| `/en/` (accueil) | Déjà analysée (ci-dessus). Observé : loader logo #333 → blanc, trait du X dessiné, bande rouge diagonale d'intro ; X fuchsia tramé derrière le visuel ; « VISUAL SELECTOR » vertical + 4 vignettes. |
| Menu ouvert (toutes pages) | Observé : overlay sur illustration de groupe N&B assombrie ; bouton → carré rouge « CLOSE » ; liens en 2 colonnes ~44px (texte en image/SVG) ; survol rouge #ff4040 (mesuré) ; langue JP/EN avec pastille rouge ; réseaux + « OFFICIAL » vertical en bas à gauche. Mesuré : bouton 80×80. |
| `/en/character` | Mesuré : onglets Oswald 20px, bord 0.8px noir, actif fond noir / texte blanc, transition 0.3s ; bande « Episode of … » H3 Oswald 24/500 sur #eb6ea0 ; nom d'épisode Noto Sans JP 20/700 #ff4040, « CV » 20/400, texte 16px. Observé : titre rouge ~90px coupé à gauche, parallélogrammes en filet, grille de cartes inclinées (~60°) séparées par des traits blancs, triangles noirs aux bouts, tags noirs « HERO NAME » / « RANKING No. », numéros rouges géants. |
| `/en/character/?chara=x` | Observé : fond noir, nom blanc énorme, rang rouge géant à droite, ligne « CV » rouge + 2 boutons ronds, accroche blanche 2 lignes alignée à droite, illustration sur éclats triangulaires multicolores, 2 vignettes vidéo + tag « CHARACTER MOVIE », grille en bas (autres persos N&B). |
| `/en/news` | Mesuré : barre noire 96px, bord haut 4px #ff4040, date Oswald 14/700 noir sur rouge, titre blanc 16px. Observé : chevron › blanc. |
| `/en/story` | Mesuré : cases 30×16 de texte, Noto 16/500, bord noir fin, active fond rouge texte noir ; titre d'épisode Noto 32/700 rouge, texte 16px. |
| `/en/movie` | Observé : barre de filtres 2×4 fond noir Oswald 20 blanc, actif rouge + encoche ; vignettes avec bandeau titre en haut. |
| `/en/music` | Observé : onglets 3 colonnes (actif rouge + encoche) ; accordéon ~110px, titre Oswald centré, bouton rond blanc « + » → rouge « − » ; panneau noir, pochette + titre 「 」 géant. |
| `/en/special` | Observé : carte bannière « KEYWORD » (rouge + parallélogramme noir + X), légende 12px. |
| Pages internes (commun) | Observé : fond #f3f3f3 avec X / parallélogrammes en filet rouge et gris, logo noir centré en haut, MENU noir en haut à gauche. |
| Mobile (cadre 390px) | Mesuré : `max-width: 768px` (243 règles) et 767px. Observé : logo en haut à gauche, MENU en haut à droite, titre rouge pleine largeur, grille personnages 2 par rangée avec triangles, numéros plus petits. |

## Non mesuré

- Mobile : observé sur l'accueil et la page personnages à 390px ; les autres pages internes en mobile (fiche, story, music) sont **déduites** dans `layouts.md`.
- Pagination des actualités, page d'article et lecteur vidéo en modal : non vus, proposés dans le même langage.
- Durées du menu, de l'intro et de l'accordéon : estimées (marquées ≈ dans `motion.md`).
- Les animations ont été observées sur des captures fixes ; les durées viennent des feuilles de style, l'enchaînement exact est reconstitué.

## Écarts assumés

| Élément du site | Dans le skill | Raison |
|---|---|---|
| Logo, illustrations et personnages officiels | Formes, trames et emplacements `data-slot` | Droits d'auteur |
| Visuels de la démo | Photos Unsplash libres (licence Unsplash), à remplacer par les images du projet | Démo sans droits ; voir `references/assets.md` |
| Noms de la série, des personnages et du casting | Contenu fictif | Identité de l'œuvre |
| Blanc sur rouge en 14px (« OFFICIAL SNS ») | Noir sur rouge | Contraste 3,8:1 insuffisant |
| Filtre / onglet actif : blanc sur rouge #ff4040 en 20px | Noir sur rouge (`--on-accent`) | 3,5:1 insuffisant pour du 20px non gras |
| Carré CLOSE rouge vif avec texte blanc 14px | Rouge assombri `--menu-close` (#c8100d, 5,9:1) | Contraste |
| Liens du menu en images de texte | Texte HTML Oswald | Accessibilité, traduction |
| Libellés « HERO NAME », « RANKING No. », « CHARACTER MOVIE » | « NOM », « RANG », « VIDÉOS » | Texte d'origine |
