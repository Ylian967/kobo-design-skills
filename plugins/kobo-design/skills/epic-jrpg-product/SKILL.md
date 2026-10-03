---
name: epic-jrpg-product
description: Direction artistique « Epic JRPG Product » pour sites de jeu vidéo complets (fiche de jeu, page Acheter / configurateur d'éditions, visionneuse média, actualités du jeu, menu mobile), inspirée des sites officiels de grands J-RPG d'éditeurs japonais. Fond noir et lave/braises, or doux, plaques de titre dorées, ornements en losanges (onglet actif ✦✦✦), barre éditeur à filet multicolore, vidéo encadrée, bandeau de notes presse, configurateur d'achat (pays, édition, plateformes en tuiles, carte d'édition en verre sombre, configuration requise), bas de page newsletter + réseaux, boutons flottants ronds. À utiliser pour une page de jeu, une boutique d'éditions, une landing de sortie, une app de catalogue de jeux au style « fantasy épique, J-RPG, édition collector ».
---

# Epic JRPG Product

> La page officielle d'un J-RPG : nuit et braises, or chaleureux, ornements fins, et tout mène au bouton « Acheter ».

## L'idée

C'est une **page produit** avant d'être une page d'ambiance. Le fond est sombre et texturé (braises, roche), la typographie est une sans-serif géométrique propre (Montserrat/Metropolis) légèrement resserrée, et **l'or** structure tout : boutons, plaques de titre, filets, tuiles de plateforme sélectionnées. Des **ornements en losanges** (✦ ◆ ✦) encadrent les médias importants. Le parcours est clair : héros → pitch + vidéo → plateformes et achat → notes presse → caractéristiques → module d'achat détaillé.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de logo, de personnages, de jaquettes ni de noms du jeu ou de l'éditeur.

## Règles prioritaires

1. **Or = action et titre.** Bouton d'achat, plaque de titre de section, tuile active. Le texte posé sur l'or est **bleu nuit** `--on-gold` (le blanc mesuré sur la référence est illisible : 1,6:1).
2. **Fond sombre texturé** (braises, lave) pour toutes les sections de contenu ; une seule bande claire (dorée) par page : le pied de page doré ou le panneau « Nous suivre ».
3. **Typo unique** Montserrat, interlettrage légèrement négatif (-0.03em) partout, capitales espacées seulement sur les boutons.
4. **Ornements** : losanges fins en haut et en bas des vidéos et des visuels clés, un petit losange sous les paragraphes de pitch. Jamais plus de deux par écran.
5. **Achat toujours accessible** : bouton « Acheter » dans la barre (dans le menu sur mobile) et bouton flottant rond or (panier) en bas à droite.
6. **Accessibilité** : sélecteurs natifs (`select`, `radio` pour les plateformes), cibles ≥ 44px (mesuré : `--size-cta--min: 4.4rem`).
7. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier. |
| `references/components.md` | Barre éditeur + filet, nav à ornement actif, menu mobile, boutons or, plaque de titre, ornements, vidéo encadrée, configurateur d'achat, carte d'édition, configuration requise, visionneuse média, newsletter + réseaux, héros mobile, boutons flottants. |
| `references/layouts.md` | Fiche produit, pages Acheter, Média, Actualités, bas de page commun, mobile observé. |
| `references/motion.md` | Transitions courtes (0.2s), menu mobile, changement d'édition, visionneuse, accordéon. |
| `references/assets.md` | Avant de placer une image ou une scène 3D : sujets, cadrages, traitements, sources, prompts IA, 3D optionnelle. |
| `examples/demo.html` | Exemple 1 : fiche produit (accueil du jeu). |
| `examples/achat.html` | Exemple 2 : page Acheter (configurateur, configuration requise, newsletter + réseaux, menu mobile). |
| `source.md` | Mesures et écarts. |

## Pages couvertes

| Gabarit | Où le trouver |
|---|---|
| Fiche produit (héros, pitch + vidéo, notes, caractéristiques, achat) | `layouts.md` « Ordre de la page produit » · `examples/demo.html` |
| Acheter (configurateur d'éditions + configuration requise) | `layouts.md` « Page Acheter » · `components.md` « Configurateur » · `examples/achat.html` |
| Média (visionneuse 1/8) | `layouts.md` « Page Média » · `components.md` « Visionneuse média » |
| Actualités du jeu | `layouts.md` « Page Actualités » |
| Bas de page commun (newsletter + réseaux) | `components.md` · `examples/achat.html` |
| Menu ouvert et mobile | `components.md` « Menu mobile », « Héros mobile » · `layouts.md` « Mobile » |

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Tout | **Montserrat** 300–900 (Metropolis d'origine, libre mais absente de Google Fonts) | 16px/20px 500 dominant ; nav 17px 300 ; titres 36px 700 (900 sur les pages internes) ; libellés de formulaire 18px 900 ; H1 45px 900 ; boutons 14px 600 capitales +0.08em |

## Images et 3D

Le style vit de **visuels sombres et chauds** : key art et captures du jeu, ou, en maquette, photos de braises, de flammes, d'armures et de silhouettes à contre-jour. Le héros fond vers le noir pour porter le titre, les photos N&B passent en duotone braise, et une texture de braises réelle tapisse le fond des sections. La 3D est optionnelle (coffret collector qu'on fait pivoter dans le module d'achat). Jamais de dessin CSS/SVG à la place d'une photo, d'un personnage ou d'un objet : seuls les ornements restent dessinés. Détails dans `references/assets.md`.

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
- [ ] Chaque page a la barre éditeur + filet, la nav à ornement actif et le bas de page commun.
- [ ] Testé à 375px et 1440px, mouvement réduit respecté.
- [ ] Vraies images (ou 3D) traitées selon `references/assets.md`, avec `alt` et couleur de repli.
- [ ] Aucun élément du jeu ou de l'éditeur d'origine.
