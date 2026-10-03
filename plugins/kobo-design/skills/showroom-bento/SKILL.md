---
name: showroom-bento
description: Direction artistique « Showroom Bento » pour e-commerce de produits techniques et configurateurs (moto, voiture, vélo, trottinette, casque audio, électroménager premium, enceinte, objet design), inspirée d'un concept Dribbble de showroom digital de moto. Écran unique dans un cadre arrondi gris clair éclairé au centre comme un studio photo, produit détouré en grand au centre avec ombre au sol, modèles voisins réduits et coupés par les bords, flèches dans une pilule blanche, titre gras géométrique avec le nom de marque en rouge, prix géant à droite, groupe de pilules de navigation (active en noir), boutons ronds blancs, et une rangée bento de tuiles blanches serrées (accessoire à acheter, six caractéristiques à pictogramme, configurateur de teinte à pastilles verticales). À utiliser pour une fiche produit premium, un configurateur, une vitrine de gamme ou une app de concession au style « showroom, studio, épuré, bento, automobile ». Fournit tokens, composants, mises en page, animations et une page d'exemple.
---

# Showroom Bento

> Un produit seul sous la lumière d'un studio, et tout ce qu'il faut savoir rangé en tuiles juste en dessous.

## L'idée

Le visiteur entre dans un **showroom** : un seul produit, grand, au centre, posé sur un sol gris clair ; les autres modèles attendent sur les bords. Autour, l'interface se fait oublier : des **pilules** blanches ou noires, un **titre gras** dont seul le nom de marque est rouge, un **prix** de la même taille en face. En bas, une **rangée bento** de tuiles blanches très serrées répond aux questions d'un acheteur : un accessoire, six caractéristiques, le choix de la teinte. Tout tient dans **un écran**.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de nom, photos ni textes de la maquette d'origine.

## Règles prioritaires

1. **Un écran, un cadre** : fond `--frame`, coins de 16px, posé sur un fond sombre. Rien sous le cadre sur grand écran.
2. **Un seul produit grand**, détouré, au centre ; deux voisins petits, coupés par les bords.
3. **Gris, blanc, noir, et un seul rouge** : le rouge ne sert qu'au monogramme, au nom de marque et à une pastille.
4. **Tout est pilule ou tuile** : pilules et ronds de 50px pour les actions, tuiles blanches de rayon 12px pour l'information.
5. **Bento serré** : 4px entre les tuiles et au bord du cadre, deux rangées de 118px.
6. **Titre et prix se répondent** : même taille, même graisse, l'un à gauche, l'autre à droite.
7. **Vraie image du produit**, jamais un dessin ; les teintes sont de vraies variantes ou une simulation assumée.
8. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root`. |
| `references/components.md` | Écran, barre, titre et prix, scène, rangée bento, pastilles, états. |
| `references/layouts.md` | Repères de l'écran, tablette, mobile, autres écrans. |
| `references/motion.md` | Arrivée, glissement des modèles, textes qui se relaient, teinte, pointeur, performance, mouvement réduit. |
| `references/assets.md` | Avant de placer une image : image détourée, détourage dans la page, teintes, pictogrammes. |
| `examples/demo.html` | Écran complet animé (marque fictive « Orphée », casques audio). |
| `source.md` | Référence, mesures, ce qui est proposé, écarts. |

## Typographie

Une seule famille : **Outfit**.

| Rôle | Graisse | Taille |
|---|---|---|
| Nom du modèle, prix | 600, approche −0.02em | `--fs-title` (≈ 67px) |
| Prix de tuile | 600 | `--fs-price` (44px) |
| Valeur de caractéristique | 600 | `--fs-value` (20px) |
| Pilules, textes de tuile | 400 | `--fs-nav`, `--fs-body` (17px) |
| Légendes | 300, `--muted` | `--fs-body` |
| Étiquette de caractéristique | 300, `--muted` | `--fs-label` (13px) |

Pas de capitales forcées, pas d'italique. Chiffres tabulaires pour les prix.

## Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `--outer` | #2e2b2b | Fond autour du cadre |
| `--frame` | #e9e9e9 | Fond de l'écran |
| `--tile` | #ffffff | Tuiles, pilules, boutons ronds |
| `--ink` | #1b1d1c | Texte, pilule active, boutons d'action |
| `--muted` | #666666 | Légendes |
| `--accent` | #cf1f22 | Monogramme, nom de marque (grand texte) |
| `--accent-ink` | #b81b1e | Petit texte rouge |
| `--sw-*` | rouge, jaune, bleu, gris, noir | Pastilles de teinte |

## Mise en page

- Écran de 1440 × 1014px : barre (marge 40px), titre et prix, scène qui prend la hauteur restante, rangée bento de 240px.
- Bento : `427fr 187fr 187fr 187fr 427fr` — accessoire, six caractéristiques sur deux rangées, teinte.
- Tablette, mobile et autres écrans : `references/layouts.md`.

## Mouvement

La référence est fixe : tout le mouvement est **proposé**. Trois gestes : les **modèles glissent** d'une place (900ms), les **textes se relaient** et le prix défile, la **teinte se fond**. Le produit suit légèrement le pointeur. Rien ne tourne en continu. Détail, code et mesures : `references/motion.md`.

## Images et 3D

- Le produit est une **vraie image détourée** : de préférence des PNG transparents fournis par le projet, une par modèle et par teinte.
- À défaut, une **photo sur fond uni** détourée une fois dans la page (canvas), puis teintée à partir de sa luminosité : c'est ce que fait la démo. Conditions et limites dans `references/assets.md`.
- La tuile accessoire montre une vraie photo entière, dans un cadre arrondi.
- **3D** : non utilisée ici. Un modèle 3D tournant peut remplacer l'image du centre (configurateur à 360°) si le projet le fournit ; rendu à la demande seulement.
- Jamais de produit dessiné en CSS ou en SVG.

## Accessibilité

- Contrastes vérifiés dans `tokens.css` (`@contrast`) ; légendes foncées par rapport au shot.
- Carrousel : scène focalisable, flèches du clavier, boutons libellés, voisins cliquables, glissement au doigt.
- Teintes : `radiogroup`, pastilles libellées, zone de clic agrandie, flèches du clavier.
- Le symbole monétaire gris est décoratif ; le prix reste lisible sans lui.
- `prefers-reduced-motion` : changements immédiats, plus de suivi du pointeur.

## À ne pas faire

- Ajouter une seconde couleur d'accent, un dégradé coloré, une photo d'ambiance en fond.
- Écarter les tuiles ou leur donner une ombre au repos.
- Montrer deux produits grands à la fois.
- Mettre du rouge `--accent` en petit texte.
- Animer un filtre ou un mode de fusion pendant le glissement.

## Vérification

1. `python3 tools/check.py showroom-bento` passe.
2. À 1440px : tout l'écran tient sans défilement à partir de 800px de haut ; à 390px : pas de défilement horizontal.
3. Aucune erreur dans la console ; les trois modèles et les cinq teintes s'affichent.
4. Le produit ne couvre ni le titre ni le prix.
5. Mouvement réduit : l'écran reste entièrement utilisable.
