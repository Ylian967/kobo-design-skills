# Mint Street Basics — gabarits

Grille **mesurée** sur la maquette : page de 1440px, marges de 80px, cartes écartées de 24px. Hauteurs relevées : héros 1106px, bandeau 82px, corps menthe 3886px, pied 1872px (page de 6946px).

## Héros (1440 × 1106)

```
┌───────────────────────────────────────────────────────────────┐
│ Verveine  HOMME FEMME ENFANT SPORT                    ○ ○ ○ ○ │  marge 80px, 4 boutons ronds
│                                                               │
│ DES BASIQUES                              Des coupes justes…  │  texte d'accroche 270px
│ PENSÉS POUR            ╭──────╮                               │
│ TOUS LES JOURS        │ photo  │                              │  titre 3 lignes, devant la photo
│                   ╭───┤        ├────╮                         │
│ 120+             │ disque vert  (EXPLORER)                    │
│ Boutiques…       │                   │                        │
│ 10 000+          │                   │                        │
│ Pièces…                                                       │
├───────────────────────────────────────────────────────────────┤
│ ▓▓ Offre d'automne — livraison offerte… ▓▓ Offre d'automne ▓▓ │  bandeau vert 82px
```

## Page d'accueil (ordre de la maquette)

| # | Section | Fond | Disposition |
|---|---|---|---|
| 1 | Héros | bleu nuit (dégradé) | Titre à gauche, chiffres dessous, scène ronde à droite |
| 2 | Bandeau | vert | Texte défilant |
| 3 | Collections | menthe | 2 colonnes : titre + texte + flèches / pile de cartes + encart blanc |
| 4 | Produits | menthe | Titre centré ; rangée 1 : carte double + carte simple ; rangée 2 : trois cartes ; lien à droite |
| 5 | Fiche produit | menthe | 2 colonnes : photo sur carte aqua / informations et achat |
| 6 | Essentiels | bleu nuit | Disque aqua, titre géant, photo en arche, disque vert, rayures |
| 7 | Pied | carte menthe sur bleu nuit | Coordonnées, liens, abonnement, logotype géant |

Rythme : le bleu nuit **ouvre et ferme** la page ; entre les deux, tout est menthe, sans autre fond de section. Les sections sont séparées par ≈ 150px.

## Grille de produits

```
┌──────────────────────────────┐ ┌─────────────┐
│        carte double          │ │   simple    │   photos de 461px de haut
└──────────────────────────────┘ └─────────────┘
       ○ ○ ○ ○  NOM  prix            ○ ○ NOM prix
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│             │ │             │ │             │
└─────────────┘ └─────────────┘ └─────────────┘
                                   VOIR PLUS ↗
```

## Autres pages (proposées, la maquette ne montre que l'accueil)

- **Catalogue** : titre centré, filtres en pilules à contour, grille de 3 colonnes où une carte sur cinq est double.
- **Fiche produit seule** : la section 5 en haut de page, puis une rangée « Vous aimerez aussi » de trois cartes.
- **Panier** : sur menthe, lignes blanches à coins de 22px (vignette, nom en police d'affiche, pastille, quantité), récapitulatif dans une carte aqua, bouton vert.

## Mobile (390px, proposé)

- Héros en colonne : titre (60px), accroche, chiffres côte à côte, puis la scène ronde sur toute la largeur.
- Collections et fiche produit en une colonne ; l'encart blanc reste sur le coin de la pile.
- Produits : 2 colonnes, la carte double sur toute la largeur.
- Essentiels : disque aqua plus large que l'écran, photo centrée, disque vert réduit à son titre, pas de rayures.
- Pied : coordonnées et abonnement sur toute la largeur, liens sur 2 colonnes ; le logotype géant reste sur une ligne.
