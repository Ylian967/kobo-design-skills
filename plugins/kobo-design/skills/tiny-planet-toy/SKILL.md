---
name: tiny-planet-toy
description: Direction artistique « Tiny Planet Toy » pour sites-expériences ludiques et mini-jeux web, inspirée d'une expérience WebGL primée où l'on explore une petite planète dessinée à la main. Fond turquoise uni semé de poussières, petite planète ronde en volume couverte de maisons et d'arbres au rendu dessin animé à contours d'encre, logo en lettres-blocs crème posées en grille 3 × 3 sur la planète, bouton-bloc jaune penché qui s'enfonce comme une touche, volet d'entrée incliné, boîte de dialogue à étiquette bleue et texte tracé à la main qui s'écrit lettre à lettre, fiches à contour d'encre et ombre décalée, touches de clavier en blocs. À utiliser pour une landing de jeu indé, un portfolio interactif, une page d'événement ludique, un mini-jeu web ou une app au style « jouet, diorama, monde miniature, cosy 3D, low-poly, cel-shading ». Fournit tokens, composants, mises en page, animations et une page d'exemple avec planète Three.js.
---

# Tiny Planet Toy

> Une planète qui tient dans la main, posée sur du turquoise : on a envie de la faire tourner avant même de lire.

## L'idée

Le visiteur ne lit pas une page, il **reçoit un jouet**. Au centre, une **petite planète en volume** — maisons, arbres, un phare, un bateau — au rendu de dessin animé, cernée d'encre. Dessus, le nom du jeu en **lettres-blocs** tombées du ciel ; dessous, un **bloc jaune** penché qui ne demande qu'à être enfoncé. Le reste de l'interface parle comme le jeu : une **boîte de dialogue** où le texte s'écrit lettre à lettre, des fiches à gros contour, des touches de clavier en relief. Fond uni, peu de mots, tout a une **épaisseur**.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de monde, de personnage, de logo ni de texte du jeu d'origine.

## Règles prioritaires

1. **Une planète, seule, au centre** ; fond `--sky` uni, juste des poussières.
2. **Rendu dessin animé** : aplats, trois paliers d'ombre, contour d'encre `--ink` — jamais de dégradé lisse ni d'ombre floue.
3. **Tout ce qui se clique est un bloc** : une face, un contour de 3px, une tranche ou une ombre décalée ; il s'enfonce à l'appui.
4. **Trois écritures** : blocs (titres, logo), pixels (étiquettes, boutons), main levée (dialogues, texte).
5. **Le texte parle en répliques** : court, à la première personne, dans une boîte de dialogue.
6. **La 3D reste petite** : un canvas à la taille de la planète, rendu à la demande ; le reste est du HTML.
7. **Texte `--ink`** sur le turquoise, le jaune, le bleu et le crème.
8. **Aucune valeur en dur** : tout vient de `references/tokens.css`, y compris les couleurs de la scène 3D.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root`. |
| `references/components.md` | Ciel, planète, logo en blocs, bouton-bloc, boîte de dialogue, fiche de quartier, touche, chargement. |
| `references/layouts.md` | Écran-titre, page de présentation, mobile, autres écrans. |
| `references/motion.md` | Volet d'entrée, chute des blocs, rotation, pivot, machine à écrire, performance, mouvement réduit. |
| `references/assets.md` | Construction de la planète, recette du rendu, polices. |
| `examples/demo.html` | Page complète animée avec planète Three.js (jeu fictif « Estafette »). |
| `source.md` | Référence, mesures, ce qui est proposé, écarts. |

## Typographie

| Rôle | Police | Taille |
|---|---|---|
| Lettre d'un bloc du logo | Rubik Mono One | `--fs-block` (jusqu'à 62px) |
| Titre de section | Rubik Mono One, capitales | `--fs-h2` (jusqu'à 42px) |
| Étiquettes, boutons, touches | Silkscreen 700, capitales | `--fs-tag` (17px), 16 à 18px |
| Dialogue | Patrick Hand, capitales, approche 0.03em | `--fs-dialog` (≈ 24px) |
| Texte courant | Patrick Hand | `--fs-body` (20px) |
| Mentions | Silkscreen 400 | `--fs-small` (14px) |

## Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `--sky` | #65c1bc | Fond |
| `--sky-light` | #9ee5d5 | Poussières, halo |
| `--sky-deep` | #2a8490 | Eau, section d'appel |
| `--cream`, `--cream-side` | #eef2e4, #b8b7a2 | Blocs du logo et leur tranche |
| `--paper` | #fdfdfd | Dialogue, chargement |
| `--ink` | #333d3f | Contours, texte |
| `--yellow`, `--yellow-side` | #f2cf59, #c9a23a | Bouton-bloc, fiche active |
| `--blue` | #66bee6 | Étiquette du nom, flèche |
| `--red`, `--orange`, `--green`, `--green-light`, `--wall`… | — | Couleurs de la planète |

## Mise en page

- Écran-titre : la planète (≈ 45 % de la largeur), son logo, le bouton ; rien d'autre.
- Page de présentation : la planète reste à l'écran et glisse à gauche, une colonne de 520px à droite (fiches de quartier, dialogue) ; puis une section crème et une section d'appel.
- Détail et mobile : `references/layouts.md`.

## Mouvement

**Observé** sur le site : écran de chargement blanc, volet turquoise incliné, planète qui grossit, blocs qui se posent, bouton en dernier, dialogue lettre à lettre. **Proposé** : les durées et les courbes, la rotation lente de la planète, le pivot vers un quartier, le glissement au défilement, les touches qui s'enfoncent. Détail, code et mesures : `references/motion.md`.

## Images et 3D

- **La 3D est le sujet** : une planète Three.js faite de formes simples, matériaux à trois paliers, contour d'encre par coque inversée, géométries fusionnées.
- **Canvas à la taille de la planète** (620px au plus), rendu à la demande à 30 images/s, arrêté hors écran ; repli en disque à contour sans WebGL.
- **Pas de photo** dans ce style. Si un projet en a, elles vivent plus bas, en petites vignettes à contour d'encre.
- Un vrai projet remplace la planète de la démo par son propre modèle : voir `references/assets.md`.

## Accessibilité

- Le nom du jeu est un `h1` hors écran ; les blocs du logo sont décoratifs.
- Le canvas porte un nom accessible qui décrit la planète et le geste.
- Dialogue en `aria-live="polite"` ; le bouton « suivant » est libellé ; fiches de quartier en `aria-pressed`.
- Contrastes vérifiés dans `tokens.css` (`@contrast`) ; l'étiquette bleue porte du texte sombre.
- `prefers-reduced-motion` : plus de rotation automatique, de chute ni de frappe ; tout reste utilisable.

## À ne pas faire

- Remplir l'écran-titre : pas de navigation, pas de paragraphe, pas d'image.
- Mettre le canvas en plein écran ou le redessiner en continu quand rien ne bouge.
- Lisser le rendu (dégradés, reflets, ombres douces).
- Écrire de longs textes dans la police en blocs ou en pixels.
- Animer les poussières.

## Vérification

1. `python3 tools/check.py tiny-planet-toy` passe.
2. À 1440px et à 390px : pas de défilement horizontal, aucune erreur dans la console.
3. La planète s'affiche, tourne à la main et pivote vers chaque quartier.
4. Sans WebGL ou sans script, la page reste lisible (repli, pas de volet bloquant).
5. Mouvement réduit : rien ne bouge seul.
