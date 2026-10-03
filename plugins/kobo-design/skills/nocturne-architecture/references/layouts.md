# Nocturne Architecture — gabarits

Grille **mesurée** sur la maquette : page de 1440px, marges de 40px, héros de 1000px, cartes de 438px écartées de 23px. Le contenu occupe toute la largeur ; la plupart des sections sont en **deux colonnes inégales** (≈ 31 % / 69 %) : un libellé ou un texte court à gauche, le contenu à droite.

## Héros (1440 × 1000)

```
┌───────────────────────────────────────────────────────────────┐
│ Studio  Projets  Méthode  Journal     LUN 2 DÉC \ 09:12 \ 12°C │ (Parlons-en)
│───────────────────────────────────────────────────────────────│  filet
│ ● VOIR LE FILM                                                 │
│ Nous écoutons d'abord, nous                                    │  paragraphe 440px
│ dessinons ensuite…                                             │
│                                                                │
│                 photo de ville, la nuit                        │
│  n  o  c  t  u  a                                              │  mot-marque d'un bord à l'autre : haut à 52 %
│  ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔     │  de la hauteur, coupé par le bas
└───────────────────────────────────────────────────────────────┘
```

## Page d'accueil (ordre de la maquette)

| # | Section | Disposition |
|---|---|---|
| 1 | Héros | Photo plein cadre, barre, bouton lecture + paragraphe, mot-marque géant |
| 2 | À propos | Gauche : libellé, « ©2026 », petit texte + pilule en bas. Droite : grande phrase en deux tons, grille de chiffres 2 × 2 |
| 3 | Bandeau de mots | Pleine largeur |
| 4 | Réalisations | Libellé, titre à gauche et texte court à droite ; rail de cartes ; boutons et ligne de progression |
| 5 | Processus | Libellé à gauche, titre à droite ; lignes numérotées sur toute la largeur |
| 6 | Méthode | Panneau `--panel` en deux colonnes |
| 7 | Bandeau de catégories | Pleine largeur |
| 8 | Film | Grande carte photo |
| 9 | Journal | Libellé, titre, pilule à contour à droite ; deux cartes |
| 10 | Pied | Signe, colonnes, mot-marque géant |

Pas de changement de fond entre les sections (sauf le panneau et le pied, à peine plus clairs) : ce sont les **filets** et les **blancs** qui séparent. Espacement entre sections ≈ 130px.

## Autres pages (proposées, la maquette ne montre que l'accueil)

- **Projet** : photo plein cadre de 1000px avec le nom en mot géant coupé ; fiche en deux colonnes (caractéristiques à filets à gauche, texte à droite) ; galerie en rail.
- **Studio** : grande phrase en deux tons, chiffres, portraits en grille de 3 à coins de 12px, panneau « méthode ».
- **Journal** : grille de cartes d'article à 2 colonnes, filtres en pilules à contour.
- **Contact** : phrase géante, formulaire à champs soulignés d'un filet, pilule rouge.

## Mobile (390px, proposé)

- Barre : date, heure, température et pilule ; pas de liens.
- Héros de 600px ; mot-marque toujours d'un bord à l'autre.
- Toutes les sections en une colonne ; chiffres en 2 colonnes.
- Rail de cartes de 260px, défilement au doigt ; boutons et barre conservés.
- Étape ouverte : la photo d'abord, les points clés dessous.
- Carte film : bouton lecture en haut à droite pour laisser la place à la phrase.
