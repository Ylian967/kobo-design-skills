---
name: zigzag-snack-pop
description: Direction artistique « Zigzag Snack Pop » pour marques de snacks énergiques et produits food/sport (barre protéinée, boisson, granola, nutrition outdoor, D2C alimentaire), inspirée d'une landing Dribbble de barres protéinées. Héros orange vif à montagnes en aplats, titre en grotesque condensée très grasse avec un mot jaune « autocollant », photo du produit dans un cadre blanc penché, tampon rond à texte circulaire, bouton jaune rectangulaire à ombre dure décalée, sections blanches à bords en dents de scie, bande de pastilles d'ingrédients rondes qui défile, sections brunes à traces de pneu, portraits en arche avec pilule-étiquette, fiches produit couleur saveur dont celle du milieu est plus grande, mosaïque de tuiles, mot géant jaune en italique en pied de page. À utiliser pour une landing produit food, une boutique de snacks, une page « ingrédients », une app de commande ou un site au style « énergique, outdoor, sticker, pop, orange, fun et costaud ». Fournit tokens, composants, mises en page, animations et une page d'exemple.
---

# Zigzag Snack Pop

> De l'orange, du brun chocolat et un jaune qui claque : une affiche de rayon frais qui a envie de sortir courir.

## L'idée

Le visiteur doit avoir **faim et envie de bouger** en trois secondes. Tout est dit fort : un **titre condensé énorme**, un **orange** de panneau de chantier, un **bouton jaune** rectangulaire qui a l'air d'un autocollant collé de travers. La page avance par **grandes bandes** — orange, blanc, brun — découpées en **dents de scie** comme un emballage qu'on déchire. Entre deux, les ingrédients défilent dans des pastilles rondes, les produits se posent sur des fiches de leur couleur, et les gens qui les mangent sont dehors.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de nom, d'emballage, de photo ni de texte de la marque d'origine.

## Règles prioritaires

1. **Trois fonds qui alternent** : orange (héros), blanc, brun. Jamais deux fois le même à la suite.
2. **Dents de scie** à chaque bord d'une section blanche.
3. **Titres en capitales condensées très grasses** ; un seul mot jaune par titre.
4. **Ombre dure, jamais floue**, sur les boutons, les champs et les photos-autocollants (5px, brun foncé).
5. **Boutons rectangulaires** presque sans arrondi ; le jaune est l'action principale.
6. **Vraies photos** : produit dans un cadre penché, ingrédients en pastilles rondes, gens en arche.
7. **Une fiche plus grande que les autres** dans chaque rangée de produits.
8. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root`. |
| `references/components.md` | Dents de scie, barre, titre, bouton, photo-autocollant, tampon, pastille, section brune, portrait, fiche de saveur, avis, mosaïque, pied. |
| `references/layouts.md` | Ordre des sections, repères, tablette, mobile, autres pages. |
| `references/motion.md` | Effets vus sur la vidéo, mots qui claquent, bande qui défile, produits qui se posent, performance, mouvement réduit. |
| `references/assets.md` | Avant de placer une image : fusion dans la couleur, choix des photos. |
| `examples/demo.html` | Page d'accueil complète animée (marque fictive « ZIG »). |
| `source.md` | Référence, mesures, ce qui est proposé, écarts. |

## Typographie

| Rôle | Police | Taille |
|---|---|---|
| Titre du héros | Anton, capitales | `--fs-hero` (124px, interligne 1) |
| Titre de section | Anton, capitales | `--fs-h2` (≈ 62px) |
| Nom de saveur, bouton, note | Anton | 24px, 18px |
| Mention « 20 g de protéines », mot géant | Barlow 800 italique, capitales | 32px ; `--fs-giant` |
| Libellé d'ingrédient | Barlow Semi Condensed 600 | `--fs-label` (22px) |
| Navigation | Barlow Semi Condensed 500, capitales espacées | `--fs-nav` (13px) |
| Texte | Barlow 400 | `--fs-body` (17px) |

## Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `--orange` | #ee6410 | Fond du héros |
| `--orange-light`, `--orange-hot` | #fd7c24, #ff6011 | Montagnes ; boutons orange, tampon |
| `--brown` | #62382e | Barre, sections sombres |
| `--brown-deep` | #531f10 | Ombres dures |
| `--outer` | #351c12 | Fond autour de la page |
| `--yellow` | #ffeb33 | Boutons, mot fort, mot géant |
| `--ink` | #3e2617 | Texte sur blanc et sur jaune |
| `--blush` | #f6ece9 | Fiches et tuiles claires |
| `--lime`, `--sky`, `--taupe` | #b3ce20, #2f78b7, #84685f | Fiches de saveur |
| `--c1` à `--c5` | — | Pastilles d'ingrédients |

Le blanc sur l'orange n'est permis qu'en **grand titre** ; le prix en orange sur blanc prend `--orange-ink`.

## Mise en page

- Page de 1440px sur fond sombre ; barre de 47px.
- Héros centré : titre sur deux lignes, photo du produit qui mord sur la seconde, bouton.
- Puis : bande d'ingrédients, section brune asymétrique, saveurs, section brune d'avis et de portraits, mosaïque, lettre et pied au mot géant.
- Détail et mobile : `references/layouts.md`.

## Mouvement

La vidéo du shot montre la **bande d'ingrédients qui défile**, des **produits qui se posent** sur leurs fiches et un produit qui **grossit** en entrant ; durées et courbes n'y sont pas lisibles. Le skill **propose** le reste : mots du titre qui arrivent trop grands et de travers, bouton qui s'écrase sur son ombre, tampon qui tourne au défilement, compteur du panier qui bondit. Une seule animation continue (la bande), en pause hors écran. Détail, code et mesures : `references/motion.md`.

## Images et 3D

- **Pas de 3D** dans ce style.
- **Vraies photos** partout. La référence détoure ses produits, ses ingrédients et ses personnages ; le skill s'en passe grâce au **cadre** (autocollant penché, cercle, arche) et à la **fusion** : une photo sur fond blanc posée en `multiply` sur une couleur semble détourée.
- Montagnes et dents de scie sont des formes plates, décoratives.
- Les silhouettes d'aventure dessinées du shot ne sont pas reprises.
- Identifiants et conseils de choix : `references/assets.md`.

## Accessibilité

- Contrastes vérifiés dans `tokens.css` (`@contrast`) : héros foncé par rapport au shot, fiches bleue et brune foncées pour leur texte blanc.
- La bande défilante se met en pause au survol et au focus ; sa seconde moitié est masquée aux lecteurs d'écran.
- Compteur du panier annoncé (`aria-live`) ; champs étiquetés.
- Le mot géant du pied et le tampon sont décoratifs.
- `prefers-reduced-motion` : la bande devient une rangée à faire glisser, plus rien ne bouge seul.

## À ne pas faire

- Adoucir les ombres, arrondir les boutons, ajouter un dégradé.
- Mettre du petit texte blanc sur l'orange, ou du jaune sur du blanc.
- Enchaîner deux sections de même fond, ou oublier les dents de scie.
- Dessiner un emballage ou un personnage à la place d'une photo.
- Faire défiler plusieurs bandes à la fois.

## Vérification

1. `python3 tools/check.py zigzag-snack-pop` passe.
2. À 1440px et à 390px : pas de défilement horizontal, aucune erreur dans la console.
3. Les dents de scie sont nettes des deux côtés de chaque section blanche.
4. Les photos fondues dans une couleur ne laissent pas de rectangle visible.
5. Mouvement réduit : la page est entièrement lisible et utilisable.
