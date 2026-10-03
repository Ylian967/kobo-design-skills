---
name: bubble-publisher-hub
description: Direction artistique « Bubble Publisher Hub » pour portails d'éditeur de jeux complets (accueil, catalogue de jeux avec recherche, filtres et carrousels par catégorie, page actualités, club, menu mobile), inspirée des sites d'éditeurs japonais de jeux vidéo. Blanc, rouge de marque, noir, bulles de dialogue (rectangles arrondis avec une queue en bas à gauche) pour les titres, les cartes et les médias, titres en bulles empilées, bandes de couleur avec lettre géante, cartes de jeu et d'actualité (pastille date, j'aime, lecture), grands visuels plein cadre, section communauté rose, collage de vignettes en forme de bulles. À utiliser pour un site d'éditeur ou de studio, un catalogue de jeux, une page de sorties à venir, un club de fans, une app vitrine au style « pop, éditeur, bulles de BD ».
---

# Bubble Publisher Hub

> Le portail d'un éditeur de jeux : blanc franc, rouge de marque et des bulles de dialogue partout.

## L'idée

Le **logo-bulle** de l'éditeur devient tout le système : titres posés dans des bulles (noires ou blanches), cartes de jeux à coins arrondis avec une **queue triangulaire en bas à gauche**, encarts d'actualité en bulles blanches sur des visuels plein cadre. Le fond est blanc, les visuels de jeux sont rois, et le **rouge** sert d'unique couleur d'action. Un filet de 4 couleurs court sous la barre du haut, une section rose accueille la communauté.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de logo, de nom d'éditeur, de jeux ni de visuels d'origine.

## Règles prioritaires

1. **Toute surface importante est une bulle** : rayon 12px (16px pour les cartes des pages internes) + queue de 22px en bas à gauche. Titres de section, cartes vedettes, encarts, médias, fenêtre d'inscription.
2. **Rouge = action**, un seul bouton plein rouge par bloc ; titres d'encart en rouge 24px 700.
3. **Grands titres resserrés** : 60px 600, interlettrage -0.035em, bleu-noir `--text`, alignés à gauche.
4. **Visuels plein cadre** derrière les encarts : l'encart (bulle blanche) se pose à droite, aligné en bas.
5. **Contraste** : blanc sur rouge 4,9:1 (texte ≥ 14px gras) ; noir sur rose club 10:1.
6. **Accessibilité** : la fenêtre d'inscription est un vrai `dialog` avec fermeture visible et clavier, jamais ouverte de force au chargement.
7. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier. |
| `references/components.md` | Bulle (CSS), barre double, en-tête interne (lien actif à pilule), menu mobile, bande + lettre géante, titre en bulles empilées, cartes vedette / jeu / HUD / actualité, recherche et filtres, rangée-carrousel, boutons rouges, encart, club, collage. |
| `references/layouts.md` | Accueil éditeur, catalogue Jeux, Actualités, pied de page, mobile observé. |
| `references/motion.md` | Survols, nav, menu mobile, carrousels, filtres, j'aime, fenêtre. |
| `references/assets.md` | Avant de placer une image ou une scène 3D : sujets, cadrages, masque bulle, sources, prompts IA, 3D optionnelle. |
| `examples/demo.html` | Exemple 1 : accueil d'éditeur. |
| `examples/jeux.html` | Exemple 2 : catalogue de jeux (titre empilé, vedettes, recherche + filtres fonctionnels, rangées-carrousels, aperçu actualités, menu mobile). |
| `source.md` | Mesures et écarts. |

## Pages couvertes

| Gabarit | Où le trouver |
|---|---|
| Accueil d'éditeur (manifeste, jeu à la une, club, playtest, sorties) | `layouts.md` « Accueil d'éditeur » · `examples/demo.html` |
| Catalogue de jeux (bande, titre empilé, vedettes, recherche, filtres, rangées) | `layouts.md` « Catalogue Jeux » · `examples/jeux.html` |
| Actualités (bande rose, cartes d'actualité) | `layouts.md` « Actualités » · `components.md` « Carte d'actualité » · aperçu dans `examples/jeux.html` |
| Menu ouvert et mobile | `components.md` « Menu mobile » · `layouts.md` « Mobile » |

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Tout | **Montserrat** (Metropolis / Gotham d'origine) | Hero 60px 600 -0.035em ; titres-bulles 48px 700 (empilés ≈ 44px 800) ; titres d'encart 24px 700 rouge ; titres d'actualité 24px 300 ; nav 16px 600 (500 sur les pages internes) ; boutons 14px 700 capitales +0.1em |

## Images et 3D

Les visuels de jeux sont rois : key arts, jaquettes, captures, ou en maquette des photos pop et saturées (joueurs, manettes, arcades néon). Chaque image est **enfermée dans une bulle** (coins `--radius` + queue) ou posée plein cadre sous des encarts-bulles blancs ; les cartes de sortie reçoivent un dégradé noir en bas pour le nom et la date. La 3D est optionnelle (mascotte ou manette dans une bulle). Jamais de dessin CSS/SVG à la place d'une photo, d'un personnage ou d'un objet. Détails dans `references/assets.md`.

## Signature

**La bulle** : `border-radius: 12px` + un petit triangle collé sous le coin inférieur gauche, de la même couleur que la bulle.

## À éviter

- Des cartes sans queue (le style perd son identité) ou des queues de tailles variables.
- Plusieurs couleurs d'action : le rouge seul.
- Du texte sur visuel sans bulle de fond.
- Copier le logo, le nom de l'éditeur, les jaquettes ou les noms de jeux.

## Adaptation React / React Native

- Bulle : `View` arrondie + `View` triangle (bordures transparentes) en `position: absolute; bottom: -22; left: 0`.
- Collage : `FlatList` à 2 colonnes, chaque tuile avec un rayon différent par coin (`borderTopLeftRadius`…).
- Montserrat : `@expo-google-fonts/montserrat`.

## Avant de livrer

- [ ] Toutes les surfaces importantes en bulle avec la même queue.
- [ ] Rouge réservé à l'action.
- [ ] Encarts en bulle sur les visuels.
- [ ] Fenêtre d'inscription accessible et non intrusive.
- [ ] Pages internes : bande de couleur, titre-bulle, lien actif à pilule rouge.
- [ ] Testé à 375px et 1440px, mouvement réduit respecté.
- [ ] Vraies images (ou 3D) traitées selon `references/assets.md`, avec `alt` et couleur de repli.
- [ ] Aucun élément de l'éditeur d'origine.
