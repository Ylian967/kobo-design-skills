---
name: hold-to-play-music
description: Direction artistique « Hold To Play Music » pour sites musicaux interactifs (label, rétrospective d'artistes, album, festival, playlist animée), inspirée des expériences primées où l'on maintient la barre d'espace pour avancer. Vidéo noir et blanc en fond, lettrage peint à la main bleu/orange/blanc, consigne centrale « Maintenez [espace] pour lancer », touche dessinée qui se remplit pendant l'appui, portraits en contre-jour sur blanc, vignette de l'artiste en bas à gauche, interface minuscule. À utiliser pour un site de label, une rétrospective, une page d'album ou de tournée, une expérience audio ou une app musicale au style « peint main, rétro, interactif, jouable au clavier ».
---

# Hold To Play Music

> Une rétrospective qu'on joue au clavier : on maintient la barre d'espace, la touche se remplit, et l'artiste suivant apparaît.

## L'idée

L'interaction principale est **un geste unique** : maintenir la barre d'espace (ou le doigt sur l'écran). Une **touche dessinée** au centre bas se remplit pendant l'appui ; quand elle est pleine, on passe à l'artiste/au morceau suivant. Le fond est une **vidéo ou photo noir et blanc** granuleuse ; le titre est un **lettrage peint** où chaque lettre a sa couleur (bleu, orange, blanc). Les pages d'artiste basculent sur **blanc avec un portrait en contre-jour**, une vignette de pochette en bas à gauche, l'année et un bouton ↓. Le reste est minuscule.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de logo de label, d'artistes, de pochettes ni de vidéos d'origine.

## Règles prioritaires

1. **Un seul geste** au centre de l'expérience, toujours expliqué par la phrase « Maintenez [touche] pour … » au-dessus du pied de page.
2. **La touche se remplit** pendant l'appui (`--hold`) ; relâcher trop tôt la vide en douceur.
3. **Lettrage peint** pour le titre seulement, 3 couleurs qui alternent par lettre ; le reste en Fira Sans.
4. **Images en noir et blanc** (filtre si besoin) ; la couleur n'existe que dans le lettrage et l'état d'appui.
5. **Alternative au geste** : bouton cliquable et touches fléchées, le geste n'est jamais obligatoire.
6. **Contraste** : le bleu `--blue` seulement en lettrage ≥ 32px (3,9:1) ; pour du petit texte bleu, `--blue-light`.
7. **Son** : coupé jusqu'à la première action de la personne ; contrôle visible.
8. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier. |
| `references/components.md` | Touche « maintenir », lettrage peint (filtre SVG), page d'artiste, vignette, pied de page, aide. |
| `references/layouts.md` | Accueil, page d'artiste, transitions, mobile. |
| `references/motion.md` | Remplissage, bascule d'artiste, vidéo. |
| `examples/demo.html` | Démo jouable (espace ou appui). |
| `source.md` | Observations et écarts. |

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Titre peint | **Londrina Solid** 900 + filtre SVG « pinceau » | capitales, 56–144px, une couleur par lettre |
| Consigne, interface | **Fira Sans** 500/700 | 12–18px |
| Pied de page | **Fira Mono** 400 | 10px |

## Signature

**La touche « espace » dessinée** : une pilule blanche à contour, avec un relief de 4px, qui se remplit de gauche à droite en orange pendant l'appui.

## À éviter

- Ajouter des boutons partout : un geste, une consigne.
- Des couleurs dans les photos ou les fonds.
- Un lettrage typographique propre pour le titre : il doit être irrégulier.
- Reprendre le logo, les artistes, les pochettes ou les vidéos de la référence.

## Adaptation React / React Native

- Maintenir : `Pressable` avec `onPressIn`/`onPressOut` et `withTiming` sur une valeur de progression (Reanimated).
- Vidéo de fond : `expo-video` muette en boucle, filtre N&B appliqué à la source.
- Lettrage : image SVG pré-rendue (les filtres SVG ne sont pas pris en charge partout en natif).

## Avant de livrer

- [ ] Un seul geste, consigne visible, alternative clic/clavier.
- [ ] Touche qui se remplit et se vide.
- [ ] Images N&B, couleur uniquement dans le lettrage.
- [ ] Son coupé par défaut.
- [ ] Testé à 375px et 1440px, mouvement réduit respecté.
- [ ] Aucun élément du label d'origine.
