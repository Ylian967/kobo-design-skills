# Glass Frame Estate — gabarits

Grille **mesurée** sur le site de référence : contenu de 1200px, marges de 30px (20px en mobile), sections séparées par 140px (60px en mobile), 80px entre un titre de section et son contenu, écart de 10px entre cartes. Points de rupture du site : 1200px et 810px.

## Héros (1440 × 900)

```
┌──────────────────────────────────────────────────────────────┐  ← photo floutée, marge --frame-inset
│ ╭──────────────────────────────────────────────────────────╮ │
│ │ ✕ HALDEN            18:42        ANNECY, …      MENU (⁙) │ │  libellés 16px, à 34px du haut
│ │                                                          │ │
│ │      H  A  L  ◢◣  E  N        ← mot-marque 280px,        │ │  haut à 100px, derrière la maison
│ │              ◢██◣                                        │ │
│ │ DES MAISONS ◢████◣                                       │ │  titre 80px, bord gauche = contenu
│ │ D'EXCEPTION              ┌──────┐┌───────────────┐       │ │
│ │ [ DÉCOUVRIR        → ]   │ photo ││ 04 50 …       │       │ │  cellules en verre 160 + 259 × 140
│ │                          └──────┘│ [ APPELER  → ]│       │ │
│ ╰──────────────────────────────────────────────────────────╯ │  bas des blocs à 48px du bord
└──────────────────────────────────────────────────────────────┘
```

- Titre et bouton en bas à gauche, cellules en bas à droite, alignés sur leur bord inférieur.
- Le bâtiment occupe le centre ou le tiers droit, **son sommet mord dans les lettres**.
- Mobile : barre réduite au logo et au menu ; titre 40px, bouton, puis les deux cellules côte à côte sur toute la largeur.

## Accueil (ordre mesuré sur le site, 13 sections)

| # | Section | Fond | Disposition |
|---|---|---|---|
| 1 | Héros | photo | voir ci-dessus |
| 2 | À propos | blanc | 2 colonnes : texte (surtitre, titre 48px, paragraphe, 3 compteurs, bouton + adresse) / photo verticale 490 × 730. Règle graduée dessous |
| 3 | Annonces | blanc | titre centré, grille 2 × 2, bouton « Voir plus » centré |
| 4 | Services | **noir** | surtitre à gauche, titre décalé à droite ; 4 lignes de service |
| 5 | Quartiers | blanc | titre à gauche + bouton à droite ; 4 cartes grises |
| 6 | Film | blanc | une vidéo ou photo de 1200 × 700, rayon 10px |
| 7 | Étapes | blanc | titre centré + carte noire collante ; règle graduée dessous |
| 8 | Témoignages | blanc | titre à gauche ; mosaïque 3 × 2 en damier |
| 9 | Agents | **gris** | titre centré ; 6 portraits en 3 colonnes |
| 10 | Contact | blanc | 2 colonnes : titre + coordonnées / formulaire gris. Règle graduée dessous |
| 11 | Journal | blanc | titre centré ; 1 grande carte + 2 cartes horizontales |
| 12 | FAQ | **gris** | 2 colonnes : titre + mini-carte du conseiller / 6 questions (580px) |
| 13 | Appel final + pied | blanc puis **noir** | carte photo ; pied à 4 colonnes et mot-marque géant |

Rythme des fonds : blanc dominant, **un seul bloc noir** (services) avant le pied, deux blocs gris. Les titres alternent centré / à gauche.

## Pages internes (mesurées)

| Page | Gabarit |
|---|---|
| À propos, Contact, Quartier | Héros photo de 700px, titre `--fs-page` (100px, graisse 600) centré ; puis sections de l'accueil |
| Biens | Grille d'annonces 2 colonnes sur toute la page |
| Fiche d'un bien | Titre 100px ; colonne de texte de 650px (blocs espacés de 60px) + colonne de 460px : encart **prix** noir (padding 30px, « PRIX » 24px, montant 32px), encarts gris (visite, formulaire) ; galerie 2 × 2 |
| Services | 6 lignes de service de 1200px |
| Détail d'un service | Titre 40px, colonne de 750px, sous-titres 32px |
| Journal | 3 cartes d'article (titre 24px) |
| Article | Titre 48px, colonne de 800px, intertitres 32px |
| 404 | « 404 » de 340px, blanc translucide sur photo assombrie, message 16px dessous |

## Mobile (390px, mesuré)

- Tout passe en **une colonne** : annonces, témoignages, agents, articles. Les quartiers restent en 2 colonnes (proposé ; le site les empile).
- Sections à 60px, marges de 20px ; titres 32px, surtitres 14px, nom de bien 16px.
- Services : numéro + titre 22px, les trois vignettes sur toute la largeur, lien dessous.
- **Étapes : plus de carte collante**, quatre cartes noires l'une sous l'autre (photo en haut, texte dessous).
- Agents : la carte blanche devient un bandeau fixe en bas du portrait.
- Le mot-marque reste très grand et dépasse du cadre sur le site ; ici il est réduit pour tenir (84px au moins).
