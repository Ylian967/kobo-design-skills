# Source — Zigzag Snack Pop

- **Référence** : https://dribbble.com/shots/27735034-ONE-Protein-Bar-Performance-Snack-Landing-Page (« ONE — Protein Bar Performance Snack Landing Page », par Farzan Faruk pour Rylic Studio)
- **Famille** : Food / marque de snack énergique
- **Analysé le** : 2026-10-01 (première version, à l'œil) ; **2026-10-03, réécriture complète** : image téléchargée en pleine résolution (4800 × 3600), couleurs **lues au pixel**, tailles mesurées ; vidéo du shot examinée sur douze images.
- **Ce qui plaît** : l'énergie de l'orange et du jaune, les bandes déchirées en dents de scie, les boutons-autocollants.

> L'adresse du shot a été retenue à partir d'une recherche (plusieurs shots « ONE Protein Bar » existent) : elle n'a pas été confirmée par l'utilisateur.

## Ce que contient la référence

- **Une image fixe** : la page d'accueil entière, présentée sur deux colonnes ; la page y fait 2742px de large, soit 1440px à l'échelle 1.9.
- **Une vidéo de 15s** (2902 × 2176) : la même page qui défile de haut en bas.
- Une seconde vidéo (bandeau promotionnel du studio), sans rapport avec ce style.
- Aucun site en ligne.

Sections de la page : barre, héros orange, bande d'ingrédients, section brune « pour tout le monde », saveurs populaires, section brune « parcours » (avis, personnes), mosaïque « croquant », lettre d'information, pied au mot géant.

## Mesuré (lecture des pixels ; tailles ramenées à 1440px)

| Élément | Valeur |
|---|---|
| Fond autour de la page | #351c12 |
| Barre, sections brunes | #62382e |
| Orange du héros | ≈ #fd7c24 ; montagnes #ff6011 |
| Jaune | #ffeb33 (boutons, mot géant) ; #ffff39 (mot du titre) |
| Ombre dure | #531f10 |
| Titres sur blanc | #3e2617 |
| Pastilles d'ingrédients | #e8f69b, #fff068, #f3e4df, #dcc1a1, #ffe6b5 |
| Fiches de saveur | #b3ce20, #428fce, #a48b87 |
| Fiche d'avis, tuiles | #f6ece9, #f9eae5 |
| Barre de navigation | 47px de haut |
| Titre du héros | capitales de 92px de haut (≈ 124px de corps) |
| Bouton principal | ≈ 236 × 56px, 244 × 61 avec son ombre |
| Dents de scie | le blanc commence à ≈ 4px sous la pointe ; dents lues à ≈ 22 × 11px |

## Observé sur la vidéo (non mesuré)

- La bande d'ingrédients **défile à l'horizontale**.
- Les produits **se posent** sur les fiches de saveur après l'arrivée de celles-ci.
- Le produit de la section « croquant » **grossit** en entrant.
- Les silhouettes du héros se déplacent.
- Le mot géant du pied est **plein** et en italique (et non en contour, comme le notait la première version).

Durées, courbes et états survolés ne sont pas lisibles sur une vidéo.

## Lu à l'œil

Tailles des titres de section, des libellés, des fiches, des tuiles ; rayons ; taille des pastilles.

## Polices

Trois caractères **non identifiés** : une grotesque condensée très grasse, une semi-étroite arrondie pour les libellés, une grotesque en italique gras. Anton, Barlow Semi Condensed et Barlow sont choisies à l'œil.

## Proposé par le skill

- **Toutes les durées et les courbes**, les survols, l'appui des boutons, l'arrivée du titre, le tampon qui tourne, le compteur du panier.
- La fusion des photos dans leur couleur (`multiply`), le cadre penché, les arches.
- `--orange`, `--sky`, `--taupe`, `--orange-ink`, `--soft`.
- Les versions tablette et mobile, les autres pages.
- Les images par seconde de `motion.md`, mesurées dans un Chrome sans carte graphique, à 1440px seulement.

## Écarts assumés

| Maquette | Dans le skill | Raison |
|---|---|---|
| Marque « ONE », emballages, textes anglais | Marque fictive « ZIG », textes français | Identité, droits |
| Emballage détouré tenu dans une main | Photo de barres dans un cadre blanc penché | Pas de détourage ni d'emballage de marque |
| Ingrédients et produits détourés | Photos sur fond blanc fondues dans la couleur | Idem |
| Personnes détourées | Photos en arche avec pilule-étiquette | Idem |
| Silhouettes d'aventure dessinées | Non reprises | Pas d'illustration reprise ni redessinée |
| Héros #fd7c24 à titre blanc (2,6:1) | `--orange` #ee6410 (3,3:1, grand titre seulement) | Contraste |
| Fiches #428fce et #a48b87 à texte blanc | #2f78b7 et #84685f | Contraste |
| Prix orange vif sur blanc | `--orange-ink` #c2410c | Contraste |
| Texte gris clair des libellés | `--ink` et `--soft` | Contraste |
| Bouton orange à texte blanc | Texte `--ink` | Contraste |
| Une seule largeur | Tailles en `clamp()`, tablette et mobile | Rendre le skill utilisable |

## Limites connues

- Les produits des fiches de saveur sont posés dans un encart pâle, pas directement sur la couleur comme dans le shot : sans détourage, la couleur foncée les teinterait.
- Les montagnes du héros sont plus simples que celles du shot.
- La fluidité à 390px n'a pas été mesurée.
