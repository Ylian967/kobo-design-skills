# Source — Arena Guide

- **Site de référence** : https://www.leagueoflegends.com/fr-fr/how-to-play/ (page « comment jouer » d'un MOBA)
- **Famille** : Jeu vidéo
- **Analysé le** : 2026-10-01, Chrome, 1536×674, page complète (11716px)
- **Méthode** : `extract-design.js` + captures des sections héros, intro, objectifs, vidéos

## Mesures brutes

- **Polices chargées** : Beaufort for LOL 700/800 italique, Spiegel 400/600/700 (+ italique), Inter 400–700
- **Titres H1/H2** : Beaufort 57.14px, 900, interligne 64.28px, capitales, italique ; blanc ou #0a1428
- **Texte** : Spiegel 18px / 28px (dominant), 13px, 14px, 22px, 24px ; capitales ×882 (nav, boutons)
- **Textes** : #ffffff, #f9f9f9, #0a1428, #7e7e7e, #999999
- **Fonds** : #161f32, #0a1428 (dominants), #3b4353, #ffffff, #111111, #c8aa6e
- **Bordures** : 0.8px #c8aa6e, 0.8px #3b4353
- **Dégradé** : linear-gradient(315deg, #0bc4e2 0%, #2c8cc2 100%) (boutons JOUER)
- **Rayons** : 12px (×7), 8px, 16px, 6.4px
- **Espacements** : gaps 16/32px ; paddings 0 48px, 48px 0, 8px 16px, 18px 32px
- **Transitions** : transform, filter 0.3s ease ; all 0.2s linear ; color 1s / border-color 0.5s cubic-bezier(0.06, 0.81, 0, 0.98)
- **Points de rupture** : max-width 1024px (×143), 600px (×62), 768px, 420px, 640px
- **Médias** : 67 images, 2 vidéos, 37 SVG

## Pages explorées (2026-10-02)

« Mesuré » = valeur lue dans le navigateur ; « observé » = relevé à l'œil sur capture (valeurs marquées ≈).

| URL | Relevé |
|---|---|
| `/fr-fr/how-to-play/` | Déjà mesurée (ci-dessus). |
| Barre globale (toutes pages) | Observé : barre #111 ~80px, liens capitales 14px/600 espacés avec ▾ (CHAMPIONS, ACTUALITÉS, DÉCOUVRIR, PLUS) ; recherche = bouton carré arrondi gris foncé ; globe ; pilule cyan ≈ #1fa2d8 « JOUER » texte navy. |
| Menu déroulant (survol ACTUALITÉS ▾) | Mesuré : panneau #1e2328. Observé : onglet survolé sur fond gris foncé, bord haut cyan 2px, liens petites capitales blanches 12px espacées, ~36px par ligne. |
| `/fr-fr/champions/` | Mesuré : cartes 332×502, sans arrondi ; bandeau nom #0a1428 ; survol bandeau #3c4452 ; titre « CHAMPION » Beaufort 900 italique 57px #0a1428. Observé : « CHOISISSEZ VOTRE » petites capitales navy, intro 2 lignes centrée, grille 4 colonnes, zoom léger de l'image au survol, nom blanc italique gras ~16px. |
| `/fr-fr/champions/<fiche>/` | Mesuré : nom H1 Beaufort 700 italique 75px blanc ; or #c8aa6e ; fond compétences #0a1428 ; H2 900 italique 57px. Observé : sous-titre doré ~30px, bio 16px, 2 cartes info carrées à bord or, 5 icônes ~96px en onglets (actif blanc, inactifs gris), vidéo dans un double filet doré (marge ~24px), skins : grande image + 5 vignettes 16:9, active cadre or décollé 4px + nom or, ligne de progression + flèches dorées. |
| `/fr-fr/news/` | Mesuré : bandeau #0a1428, or #c8aa6e. Observé : bandeau ~290px, « ACTUS » 900 italique blanc à gauche ; grille 3 colonnes ; image 16:9 sans arrondi + pastille gris foncé 44px (↗ ou ▶ centré) ; méta catégorie or 13px \| date grise ; titre gras navy ~22px/1.4 ; extrait gris 15px. |
| Mobile (cadre 390px) | Observé : logos à gauche, globe + hamburger carré gris arrondi à droite, JOUER masqué ; héros recadré sur le visage, bouton or plein « REGARDEZ » coins droits ; fiche : splash 16:9 en haut puis bloc navy (sous-titre doré, nom, bio, cartes info). |

## Non mesuré

- Mobile : observé à 390px sur l'accueil du guide et la fiche champion ; la liste (2 colonnes) et les actus (1 colonne) en mobile sont déduites.
- Barre de recherche et filtres de rôle de la liste : non relevés, proposés.
- Durées du menu déroulant, des skins et du héros de fiche : estimées (≈ dans `motion.md`). Rouge `--enemy` relevé à l'œil sur les anneaux adverses. Le `--muted` (#a09b8c) est choisi pour l'onglet inactif observé en gris chaud.

## Écarts assumés

| Élément du site | Dans le skill | Raison |
|---|---|---|
| Beaufort for LOL (propriétaire) | Spectral 800 italique | Licence ; même serif robuste |
| Spiegel (propriétaire) | Source Sans 3 | Licence ; sans humaniste |
| Champions, carte, logos, vidéos | Emplacements et formes | Droits d'auteur |
| Catégorie d'actu or #c8aa6e sur fond clair (2,2:1) | `--gold-deep` #7f6430 | Contraste |
| Date grise #7e7e7e / #999 sur blanc | `--ink-muted` | Contraste |
| Noms de champions, skins, compétences, actus | Contenu inventé | Identité du jeu |
| Visuels de la démo | Photos Unsplash libres (licence Unsplash), à remplacer par les images du projet | Démo sans droits ; voir `references/assets.md` |
