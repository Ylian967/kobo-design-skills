---
name: bubble-publisher-hub
description: Direction artistique « Bubble Publisher Hub » pour portails d'éditeur de jeux, catalogues et hubs de communauté, inspirée des sites d'éditeurs japonais de jeux vidéo. Blanc, rouge de marque, noir, bulles de dialogue (rectangles arrondis avec une queue en bas à gauche) pour les titres, les cartes et les médias, grands visuels plein cadre, section communauté rose, collage de vignettes en forme de bulles. À utiliser pour un site d'éditeur ou de studio, un catalogue de jeux, une page de sorties à venir, un club de fans, une app vitrine au style « pop, éditeur, bulles de BD ».
---

# Bubble Publisher Hub

> Le portail d'un éditeur de jeux : blanc franc, rouge de marque et des bulles de dialogue partout.

## L'idée

Le **logo-bulle** de l'éditeur devient tout le système : titres posés dans des bulles (noires ou blanches), cartes de jeux à coins arrondis avec une **queue triangulaire en bas à gauche**, encarts d'actualité en bulles blanches sur des visuels plein cadre. Le fond est blanc, les visuels de jeux sont rois, et le **rouge** sert d'unique couleur d'action. Un filet de 4 couleurs court sous la barre du haut, une section rose accueille la communauté.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de logo, de nom d'éditeur, de jeux ni de visuels d'origine.

## Règles prioritaires

1. **Toute surface importante est une bulle** : rayon 12px + queue de 22px en bas à gauche. Titres de section, cartes, encarts, médias, fenêtre d'inscription.
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
| `references/components.md` | Bulle (CSS), barre double, boutons rouges, encart de jeu, carte de sortie, titre-bulle, section club, collage, lien souligné. |
| `references/layouts.md` | Accueil éditeur, sorties à venir, club, mobile. |
| `references/motion.md` | Survols, carrousels, fenêtre. |
| `references/assets.md` | Avant de placer une image ou une scène 3D : sujets, cadrages, masque bulle, sources, prompts IA, 3D optionnelle. |
| `examples/demo.html` | Page d'exemple complète. |
| `source.md` | Mesures et écarts. |

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Tout | **Montserrat** (Metropolis / Gotham d'origine) | Hero 60px 600 -0.035em ; titres-bulles 48px 700 ; titres d'encart 24px 700 rouge ; nav 16px 600 ; boutons 14px 700 capitales +0.1em |

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
- [ ] Testé à 375px et 1440px, mouvement réduit respecté.
- [ ] Vraies images (ou 3D) traitées selon `references/assets.md`, avec `alt` et couleur de repli.
- [ ] Aucun élément de l'éditeur d'origine.
