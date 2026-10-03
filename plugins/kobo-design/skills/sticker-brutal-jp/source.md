# Source — Sticker Brutal JP

- **Référence** : https://dribbble.com/shots/27769104-Neobrutalism-in-Japanese-Localizing-My-Website-for-Japan (« Neobrutalism in Japanese: Localizing My Website for Japan », par Kristina Volchek)
- **Site en ligne** : https://kristi.digital/jp — le shot présente la version japonaise du site de l'autrice, qui existe réellement.
- **Famille** : Portfolio / néo-brutalisme japonais
- **Analysé le** : 2026-10-01 (première version, à l'œil, sur les images seules) ; **2026-10-03, réécriture complète** : les images du shot téléchargées en pleine résolution, et surtout **le site en ligne mesuré** (styles calculés, règles de survol, variables CSS) à 1440px.
- **Ce qui plaît** : un néo-brutalisme rendu chaleureux, et une localisation japonaise qui garde toute l'énergie de la version latine.

> La première version indiquait « maquette Dribbble, pas un site en ligne » : c'était faux, le site existe et a pu être mesuré.

## Ce que contient la référence

**Le shot** — six images fixes, aucune vidéo :

1. La page japonaise dans un cadre, entourée d'autocollants (3200 × 2400).
2. Versions anglaise et japonaise côte à côte.
3. Les polices nommées par l'autrice : Unigeo32, Mochiy Pop One, Noto Sans JP, Cabin.
4. La page ouverte dans l'outil de conception.
5. Le portrait, versions anglaise et japonaise.
6. Un bandeau d'illustrations.

Deux autres images visibles sur la page du shot appartiennent à d'autres projets de l'autrice.

**Le site** — une page de 8602px de haut à 1440px : navigation, héros, témoignages, services, projets, autres projets, blog, contact, pied. Il **n'a pas de cadre ni d'autocollants flottants** : ceux-ci n'existent que dans la mise en scène du shot.

## Mesuré sur le site (styles calculés)

| Élément | Valeur |
|---|---|
| Couleurs (variables du site) | fond #f9f5f2 ; titres #282825 ; texte #52514e ; jaune #f7cb45 ; bleu #91a8ed ; rose #ff91e7 ; vert #22a094 ; violet #b196ff |
| Texte courant | Noto Sans JP 18px / 25.2px |
| Titre latin | Unigeo 32, 104px / 104px, graisse 700, approche −2px |
| Sous-titre japonais | Mochiy Pop One 36px / 43.2px |
| Titre de section | Mochiy Pop One 48px / 57.6px |
| Titre de fiche | Unigeo 32, 32px / 38.4px, graisse 600 |
| Salutation, chapeau | Noto Sans JP 20px / 28px, #52514e |
| Navigation | Unigeo 32, 17px, graisse 500, approche 0.4px, marge intérieure 8px 16px, rayon 100px ; barre de 89px |
| Bouton | 197 × 60px, fond jaune, contour 1px, rayon 12px, ombre `3px 3px 0`, marge 0 32px, texte 18px graisse 800 |
| Fiche de service | 381 × 669px, fond blanc, contour 1px, rayon 20px, ombre `3px 3px 0`, marge 32px 24px ; image de 160px |
| Étiquette | 16px graisse 500, marge 8px 16px, rayon 100px, contour et ombre dure |
| Champ | 54px de haut, rayon 12px, contour et ombre dure ; zone de texte 300px |
| Contenu | de 96 à 1344px (1248px) |
| Sections | héros 714px ; témoignages 628px sur blanc ; services à marges de 100px ; blog sur jaune, marges 60px / 100px |
| Survols | fiche, bouton, article : ombre `6px 6px 0`, `translate(-4px, -4px)` ; navigation : `translate(-2px, -2px)`, ombre `3px 3px 0`, fond blanc ; champs : ombre `6px 6px 0` |
| Transition | 250ms `cubic-bezier(0.645, 0.045, 0.355, 1)` |
| Animations | aucune : pas d'image clé hormis une roue de chargement, pas d'effet au défilement |

## Mesuré sur le shot (lecture des pixels)

| Élément | Valeur |
|---|---|
| Fond autour du cadre | #fceee3 |
| Contour du cadre | ≈ 9px dans l'image, soit ≈ 3px à l'écran |
| Katakana vertical | #f7cc49 |
| Pastille « disponible » | #3aee81 |
| Point du drapeau | #e8332c |

## Lu à l'œil (non mesuré)

- Rayon du cadre, taille et inclinaison des autocollants, épaisseur de leur contour et de leur ombre.
- Composition du portrait : sur le site c'est **une seule image** (574 × 614px) ; ses éléments ont été reconstruits un par un.

## Proposé par le skill

- **Toutes les animations hors survol** : arrivée des autocollants, dévoilement du katakana, rebond au changement de langue, décalage au défilement, appui du bouton.
- La **bascule de langue dans la page** (sur le site, c'est un lien vers une autre page).
- La forme des autocollants (demi-anneaux, étoile, spirale, tampon).
- Les versions tablette et mobile, les autres pages.
- Les images par seconde de `motion.md`, mesurées dans un Chrome sans carte graphique, à 1440px seulement.

## Écarts assumés

| Référence | Dans le skill | Raison |
|---|---|---|
| Prénom, portrait, logo, textes de l'autrice | Designer fictive « Mio Arata / ミオ・アラタ », photo Unsplash, textes réécrits | Identité, droit à l'image |
| Japonais et anglais | Français et japonais | Textes en français |
| Unigeo 32 (payante) | Outfit 800 | Police libre ; Mochiy Pop One et Noto Sans JP sont celles du site |
| Portrait détouré | Photo entière fondue dans le rose (`multiply`) et masquée en écusson | Pas de détourage |
| Illustrations d'icônes de 160px | Tuile colorée à pictogramme au trait | Ne pas reprendre les illustrations |
| Captures de projets réels | Photos Unsplash posées de travers sur un aplat | Droits |
| Autocollants : logos d'outils, poisson illustré | Formes géométriques, tampon rouge | Pas de logo de marque ni d'illustration reprise |
| Le site n'a ni cadre ni autocollants | Cadre et autocollants repris du shot | C'est la signature retenue pour le skill |
| Section « autres projets » en mosaïque | Non reprise | Doublon avec le damier |
| Bouton sans état d'appui | Appui qui enfonce | Retour tactile |

## Limites connues

- Le japonais de la démo a été rédigé pour l'exemple : à faire relire avant tout usage réel.
- Seule la page d'accueil du site a été mesurée, et seulement à 1440px.
