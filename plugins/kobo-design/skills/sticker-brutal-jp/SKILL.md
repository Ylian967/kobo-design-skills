---
name: sticker-brutal-jp
description: Direction artistique « Sticker Brutal JP » — néo-brutalisme joyeux à la japonaise pour portfolios de freelance, sites de designer, studios, landings de service ou pages « à propos » bilingues japonais / français ou anglais. Page pêche, contenu posé dans un grand cadre à contour noir épais, autocollants plats (demi-anneaux, carré à étoile, spirale, tampon rouge) à contour noir et ombre décalée sans flou, titre latin énorme très gras, titres japonais en Mochiy Pop One, katakana vertical jaune cerné de noir, portrait noir et blanc découpé en écusson sur fond rose, bulles et pastilles inclinées, pilule de langue qui bascule toute la page, fiches blanches à ombre dure qui se « décollent » au survol, projets en damier texte / image, bande jaune. À utiliser quand on demande : néo-brutalisme, neubrutalism, brutalist, sticker, autocollant, ombre dure, hard shadow, contour noir, style japonais, Japan, kawaii pop, site en japonais, localisation japonaise, portfolio coloré, freelance, personal brand. Fournit tokens, composants, mises en page, animations et une page d'exemple bilingue.
---

# Sticker Brutal JP

> Un néo-brutalisme qui sourit : contours noirs, ombres dures, couleurs de bonbon — et le japonais traité comme une matière graphique.

## L'idée

Le visiteur rencontre **une personne**, pas une agence : un portrait découpé sur un écusson rose, entouré de bulles et de pastilles comme une planche d'autocollants. Tout ce qui se clique est un **autocollant** — contour sombre, ombre dure sans flou — qui se **décolle** quand on l'approche. Le texte joue sur deux écritures : un **titre latin** énorme et très gras, des **titres japonais** ronds et dodus, un **katakana vertical** jaune qui mord sur le portrait. La page entière tient dans un **cadre** à gros contour, avec des formes collées à cheval sur son bord.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de nom, portrait ni textes de l'autrice d'origine.

## Règles prioritaires

1. **Contour sombre + ombre dure** sur tout ce qui est interactif : 1px et `3px 3px 0`, jamais de flou.
2. **Le survol décolle** (`translate(-4px, -4px)`, ombre `6px 6px 0`), **l'appui enfonce**.
3. **Texte toujours `--ink`** sur les couleurs vives ; les couleurs ne servent jamais de couleur de texte.
4. **Deux écritures** : titre latin en capitales très grasses, titres japonais en Mochiy Pop One, texte courant en Noto Sans JP.
5. **Un cadre pour toute la page**, sur fond pêche, avec des autocollants sur ses bords.
6. **Portrait en noir et blanc** sur aplat rose, découpé en écusson ; jamais de portrait dessiné.
7. **Couleurs en aplats** : jaune, rose, bleu, violet, vert — pas de dégradé.
8. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root`. |
| `references/components.md` | Effet autocollant, cadre, autocollants, navigation, pilule de langue, titre, bouton, portrait, katakana, fiches, étiquettes, damier, formulaire. |
| `references/layouts.md` | Ordre des sections, repères, tablette, mobile, autres pages. |
| `references/motion.md` | Survols mesurés, arrivée des autocollants, changement de langue, performance, mouvement réduit. |
| `references/assets.md` | Avant de placer une image : portrait, photos de projet, pictogrammes, polices. |
| `examples/demo.html` | Page d'accueil complète, bilingue français / japonais (designer fictive « Mio Arata »). |
| `source.md` | Référence, mesures, ce qui est proposé, écarts. |

## Typographie

| Rôle | Police | Taille |
|---|---|---|
| Titre latin du héros | Outfit 800, capitales, approche −2px | `--fs-h1` (104px, interligne 1) |
| Sous-titre japonais | Mochiy Pop One | `--fs-h1-jp` (36px) |
| Titre de section | Mochiy Pop One | `--fs-h2` (48px) |
| Titre de fiche | Outfit 600, capitales | `--fs-h3` (32px) |
| Titre d'article | Mochiy Pop One | `--fs-h4` (24px) |
| Chapeau, salutation | Noto Sans JP 400 | `--fs-lead` (20px) |
| Texte | Noto Sans JP 400 | `--fs-body` (18px), 16px dans les fiches |
| Navigation, étiquettes | Outfit 500 | `--fs-nav` (17px), 16px |
| Bouton | Noto Sans JP 800 | 18px |

## Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `--peach` | #fceee3 | Fond autour du cadre |
| `--paper` | #f9f5f2 | Intérieur du cadre |
| `--card` | #ffffff | Fiches, champs, bande des témoignages |
| `--ink` | #282825 | Texte, contours, ombres |
| `--body` | #52514e | Texte secondaire |
| `--yellow` | #f7cb45 | Bouton, bande du journal, katakana |
| `--pink` | #ff91e7 | Portrait, pilule de langue, étiquette |
| `--blue`, `--purple`, `--green`, `--mint` | #91a8ed, #b196ff, #22a094, #3aee81 | Bulles, étiquettes, tuiles, autocollants |
| `--red` | #e8332c | Point du drapeau, tampon — décoratif |

## Mise en page

- Contenu de 1248px dans un cadre à contour de 3px et coins de 40px.
- Héros en deux colonnes : texte à gauche, portrait et ses autocollants à droite.
- Puis : bande blanche de témoignages, trois fiches de service, projets en damier, bande jaune du journal, contact avec formulaire.
- Détail, tablette et mobile : `references/layouts.md`.

## Mouvement

**Mesuré** sur le site en ligne : tous les survols (250ms, `cubic-bezier(0.645, 0.045, 0.355, 1)`), et l'absence de toute animation d'entrée. **Proposé** : les autocollants arrivent un à un en tournant, le katakana se dévoile, la pilule de langue fait rebondir les textes qu'elle remplace, les autocollants glissent légèrement au défilement, les boutons s'enfoncent à l'appui. Rien ne tourne en continu. Détail, code et mesures : `references/motion.md`.

## Images et 3D

- **Pas de 3D** dans ce style.
- **Vraies photos** : portrait en noir et blanc (`sat=-100`) fondu dans l'aplat rose et découpé par un masque ; portraits ronds pour les témoignages ; photos en couleur pour les projets et les articles.
- Bulles, pastilles et katakana sont du **texte** autour du portrait, pas une image : ils se traduisent avec la page.
- Autocollants et pictogrammes : formes simples en SVG, sans logo de marque ni illustration figurative.
- Identifiants et conseils de choix : `references/assets.md`.

## Accessibilité

- Contrastes vérifiés dans `tokens.css` (`@contrast`) : `--ink` sur chaque aplat.
- La pilule de langue change l'attribut `lang` de la page, son propre libellé et son nom accessible ; le point coloré n'est jamais seul à informer.
- Autocollants, bulles et katakana vertical sont décoratifs (`aria-hidden`).
- Champs étiquetés ; focus visible de 3px.
- `prefers-reduced-motion` : tout est en place d'emblée, plus de décalage au défilement.

## À ne pas faire

- Flouter une ombre, arrondir un contour jusqu'à le perdre, ajouter un dégradé.
- Écrire en couleur vive sur fond clair.
- Faire flotter les autocollants en boucle.
- Recouvrir un texte avec un autocollant.
- Remplacer le portrait par une illustration.

## Vérification

1. `python3 tools/check.py sticker-brutal-jp` passe.
2. À 1440px et à 390px : pas de défilement horizontal, aucune erreur dans la console.
3. La pilule de langue bascule tous les textes dans les deux sens.
4. Chaque élément cliquable se décolle au survol et s'enfonce à l'appui.
5. Mouvement réduit : la page est entièrement lisible et utilisable.
