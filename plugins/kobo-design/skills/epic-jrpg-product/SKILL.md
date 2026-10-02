---
name: epic-jrpg-product
description: Direction artistique « Epic JRPG Product » pour pages produit de jeu vidéo (fiche de jeu, édition, précommande), inspirée des sites officiels de grands J-RPG d'éditeurs japonais. Fond noir et braises, or doux, plaques de titre dorées, ornements en losanges, vidéo encadrée, bandeau de notes presse, module d'achat (pays, édition, plateformes en tuiles, bouton dématérialisé), boutons flottants ronds. À utiliser pour une page de jeu, une boutique d'éditions, une landing de sortie, une app de catalogue de jeux au style « fantasy épique, J-RPG, édition collector ».
---

# Epic JRPG Product

> La page officielle d'un J-RPG : nuit et braises, or chaleureux, ornements fins, et tout mène au bouton « Acheter ».

## L'idée

C'est une **page produit** avant d'être une page d'ambiance. Le fond est sombre et texturé (braises, roche), la typographie est une sans-serif géométrique propre (Montserrat/Metropolis) légèrement resserrée, et **l'or** structure tout : boutons, plaques de titre, filets, tuiles de plateforme sélectionnées. Des **ornements en losanges** (✦ ◆ ✦) encadrent les médias importants. Le parcours est clair : héros → pitch + vidéo → plateformes et achat → notes presse → caractéristiques → module d'achat détaillé.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de logo, de personnages, de jaquettes ni de noms du jeu ou de l'éditeur.

## Règles prioritaires

1. **Or = action et titre.** Bouton d'achat, plaque de titre de section, tuile active. Le texte posé sur l'or est **bleu nuit** `--on-gold` (le blanc mesuré sur la référence est illisible : 1,6:1).
2. **Fond sombre texturé** pour toutes les sections de contenu ; une seule bande claire (dorée) pour le pied de page.
3. **Typo unique** Montserrat, interlettrage légèrement négatif (-0.03em) partout, capitales espacées seulement sur les boutons.
4. **Ornements** : losanges fins en haut et en bas des vidéos et des visuels clés, un petit losange sous les paragraphes de pitch. Jamais plus de deux par écran.
5. **Achat toujours accessible** : bouton « Acheter » dans la barre et bouton flottant rond (panier) en bas à droite.
6. **Accessibilité** : sélecteurs natifs (`select`, `radio` pour les plateformes), cibles ≥ 44px (mesuré : `--size-cta--min: 4.4rem`).
7. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier. |
| `references/components.md` | En-tête à filet multicolore, boutons or, plaque de titre, ornements, vidéo encadrée, tuiles plateformes, bandeau notes, accordéon, boutons flottants. |
| `references/layouts.md` | Héros, pitch + vidéo, achat rapide, caractéristiques en zigzag, module d'achat, mobile. |
| `references/motion.md` | Transitions courtes (0.2s), lecteur vidéo, accordéon. |
| `examples/demo.html` | Page d'exemple complète. |
| `source.md` | Mesures et écarts. |

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Tout | **Montserrat** 300–900 (Metropolis d'origine, libre mais absente de Google Fonts) | 16px/20px 500 dominant ; titres 36px 700 ; H1 45px 900 ; boutons 14px 600 capitales +0.08em |

## Signature

**La plaque de titre dorée** : un bloc or plein qui déborde de la grille, avec le titre de la caractéristique en Montserrat 700 24px bleu nuit aligné à droite, posé au-dessus d'une image floutée ou d'une vidéo.

## À éviter

- Du texte blanc sur or.
- Des dégradés dorés « métal » : l'or est un aplat doux.
- Des polices fantaisie médiévales : la fantasy vient des images et des ornements.
- Copier logos, illustrations, jaquettes, noms de jeu ou d'éditeur.

## Adaptation React / React Native

- Tuiles plateformes : `Pressable` en grille 2 colonnes, état sélectionné = fond or.
- Ornements : SVG (`react-native-svg`) réutilisable `<Flourish />`.
- Boutons flottants : `position: 'absolute'` dans un conteneur `SafeAreaView`, ombre `--shadow`.
- Montserrat : `@expo-google-fonts/montserrat`.

## Avant de livrer

- [ ] Or réservé à l'action et aux titres, texte bleu nuit dessus.
- [ ] Fond sombre texturé, une seule bande claire.
- [ ] Achat accessible en permanence.
- [ ] Ornements limités à deux par écran.
- [ ] Testé à 375px et 1440px, mouvement réduit respecté.
- [ ] Aucun élément du jeu ou de l'éditeur d'origine.
