---
name: nocturne-architecture
description: Direction artistique « Nocturne Architecture » pour l'architecture et l'immobilier haut de gamme (studio d'architecture, promoteur, agence d'intérieur, constructeur, cabinet de design, hôtel), mesurée sur une maquette Dribbble de site de studio. Site noir presque pur avec un seul rouge signal - héros en photo de ville la nuit, mot-marque géant en minuscules d'un bord à l'autre et coupé par le bas, barre fine avec date, heure et température séparées par des barres obliques, pilule rouge, bouton lecture. Grande phrase en deux tons blanc puis gris, chiffres fins géants à suffixe gris, bandeau de mots à points rouges, carrousel de biens avec carte rouge et ligne de progression, étapes numérotées en accordéon à filets, panneau méthode, puces de catégories défilantes, carte film, articles à étiquette blanche, pied avec mot-marque géant. À utiliser pour une landing de studio, un portfolio de projets, une page de services ou un site au style « sombre, luxe sobre, éditorial, suisse, nuit ».
---

# Nocturne Architecture

> Une ville la nuit, un nom immense écrit en bas de l'image, et le silence du noir autour.

## L'idée

Le site est **noir**, le texte **blanc**, et une seule couleur intervient : un **rouge signal**, réservé au bouton d'action et à une carte. Le héros est une photo de ville en pose longue ; le nom du studio y est posé en **minuscules géantes**, d'un bord à l'autre, coupé par le bas comme s'il sortait de l'image. Ensuite, tout se lit comme une revue : de grandes phrases dont la fin s'éteint en gris, des chiffres fins et immenses, des filets à la place des cartes, de petits libellés en capitales précédés d'un point.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de nom, logo, photos ni textes de la maquette d'origine.

## Règles prioritaires

1. **Un seul rouge**, et seulement pour agir ou désigner : pilule, carte mise en avant, points, ligne de progression. Jamais de titre rouge.
2. **Le mot-marque géant** en minuscules, d'un bord à l'autre, coupé par le bas du héros (et repris dans le pied).
3. **Des phrases en deux tons** : blanc puis gris `--dim`. Le gris ne sert qu'aux grands textes.
4. **Des filets, pas des boîtes** : listes, chiffres et étapes sont séparés par des lignes de 1px.
5. **Deux colonnes inégales** (≈ 31 % / 69 %) : libellé à gauche, contenu à droite.
6. **Photos de nuit ou d'heure bleue** ; le jour n'apparaît que dans le journal et le panneau « méthode ».
7. **Grotesque serrée** en graisse 500 pour les grands textes, 400 pour les chiffres ; rien en gras épais.
8. **Texte blanc sur rouge** uniquement sur `--accent-deep`.
9. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root`. |
| `references/components.md` | Barre, mot-marque, bouton lecture, pilules, phrase en deux tons, chiffres, bandeaux, carte de bien, ligne d'étape, panneau, carte film, article, pied. |
| `references/layouts.md` | Héros, ordre des sections, autres pages, mobile. |
| `references/motion.md` | Arrivée du héros, mots qui s'allument, bandeaux, carrousel, accordéon, performance, mouvement réduit. |
| `references/assets.md` | Avant de placer une image : sujets, lumière, voiles, sources. |
| `examples/demo.html` | Accueil complet animé (studio fictif « noctua »). |
| `source.md` | Référence, mesures, ce qui est proposé, écarts. |

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Mot-marque | **Inter Tight** 500 | 34.2vw (6 lettres sur toute la largeur), approche −0.055em, minuscules |
| Grande phrase | Inter Tight 500 | 48px / 1.2, −0.035em |
| Titres de section | Inter Tight 500 | 56px / 1.05 |
| Chiffres | Inter Tight 400 | 88px, suffixe gris |
| Bandeau | Inter Tight 500 | 66px |
| Noms, étapes | Inter Tight 500 | 26px et 22px |
| Texte | **Inter** 400 | 16px (héros), 13px (reste) |
| Libellés | Inter 500 | 11px, capitales, point devant |

## Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `--bg` | #0e0e0e | Fond de la page |
| `--panel` / `--foot` | #171516 / #121210 | Panneau, pied |
| `--text` | #ffffff | Texte, mot-marque |
| `--dim` | #626262 | Fin grise des grandes phrases |
| `--muted` | #9a9a9a | Petit texte secondaire |
| `--ghost` / `--mark` | #565656 / #2a2a2a | Suffixes des chiffres, mots éteints (décor) |
| `--line` | #2b2b2b | Filets |
| `--accent` / `--accent-deep` | #ef2525 / #d50000 | Rouge de la carte et des points / des pilules |

## Images et 3D

De **vraies photos** de nuit : une ville en pose longue pour le héros, des maisons à l'heure bleue pour les cartes, un intérieur sombre pour la carte film ; deux respirations de jour (panneau « méthode », journal). Aucun filtre, seulement des voiles en dégradé sous le texte. Triangle de lecture, chevrons, points et signe du studio restent en SVG / CSS ; jamais un bâtiment dessiné. 3D optionnelle pour une maquette de projet. Détails dans `references/assets.md`.

## Signature

1. Le **mot-marque géant coupé** par le bas d'une photo de ville la nuit.
2. La **phrase en deux tons** dont les mots s'allument.
3. La **date \ heure \ température** dans la barre.
4. La **carte rouge** en tête du carrousel et sa ligne de progression.
5. Les **étapes à filets** numérotées « /01 ».

## À éviter

- Du rouge décoratif (titres, fonds de section, icônes multiples).
- Des cartes à fond gris partout : préférer les filets.
- Un mot-marque en capitales, en gras épais ou entier dans le cadre.
- Des photos de plein jour dans le héros ; des photos colorées ou saturées.
- Du texte gris `--dim` en petit corps.
- Des animations rapides ou rebondies ; plus de deux bandeaux défilants.

## Adaptation React / React Native

- **React** : `WordMark` (lettres en `span`, largeur en `vw`), `TwoTonePhrase` (un seul écouteur de défilement partagé), `StatGrid`, `Marquee`, `PropertyRail` (défilement natif + barre), `ProcessAccordion` (une ligne ouverte), `Pill`.
- **React Native** : mot-marque avec `adjustsFontSizeToFit` sur une ligne et un conteneur qui le coupe ; phrase en deux tons avec des `Text` imbriqués dont la couleur suit un `SharedValue` de défilement ; rail en `FlatList` horizontale à `snapToInterval` ; accordéon avec Reanimated (`Layout`) ; bandeaux avec `withRepeat` linéaire.

## Avant de livrer

- [ ] `:root` copié de `tokens.css`, aucune couleur en dur ailleurs.
- [ ] Un seul rouge, uniquement sur les actions, la carte et la progression.
- [ ] Mot-marque lisible sur le bas de la photo, d'un bord à l'autre à 1440 et à 390px.
- [ ] Gris `--dim` réservé aux grands textes ; petit texte en `--muted`.
- [ ] Étapes et carrousel utilisables au clavier ; contenu fermé non focusable.
- [ ] `prefers-reduced-motion` : phrase blanche, bandeaux figés.
- [ ] Nom, photos et textes propres au projet.
