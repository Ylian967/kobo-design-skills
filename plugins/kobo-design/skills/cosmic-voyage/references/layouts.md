# Cosmic Voyage — mises en page

Mesures prises à 1440 × 900 le 2026-10-03. Le site règle sa racine à 3,90625vw (1rem = 56,25px à 1440) : toutes ses tailles suivent la largeur de l'écran.

## Accueil (ordre du site)

| # | Section | Fond | Contenu |
|---|---|---|---|
| 0 | Intro | noir | saut en hyperespace, logo en haut à gauche |
| 1 | Héros (un écran) | visuel clé | barre de navigation, logo, plaques de boutique et bouton lecture en bas, « Défiler » |
| 2 | « La voix de la galaxie » | nuit étoilée | titre en cartouche, carrousel de cartes (3 visibles), compteur, « En savoir plus » |
| 3 | « Personnages » | nuit étoilée | 4 cartes hautes, bouton « En savoir plus » centré |
| 4 | Abonnement | `--sub` | titre et texte à gauche, champ et bouton à droite |
| 5 | Pied | noir | logotypes, liens, classification |

```
▮▯▮▯  Accueil  Informations  Personnages  Mondes      Connexion ◯ ┃Télécharger┃
 ASTRALIS                                                         ┃maintenant ┃
                    (visuel clé plein écran)                        S
                                                                    u  ← rail
              [ Console ] [ Ordinateur ] [ Mobile ]  (▶)            i  ○ ○ ○ ○
                            Défiler │                               v
 ◉─▏La voix de la galaxie
 │  ╭──────────╮ ╭──────────╮ ╭──────────╮
 │  │  image  ╮│ │  image  ╮│ │  image  ╮│     ← un seul coin arrondi
 │  │ date  + │ │ date  + │ │ date  + │
 │  ╰──────────┘ ╰──────────┘ ╰──────────┘
 │  01 / 05                          [ En savoir plus ]
 ◉─▏Personnages
```

Règles :
- Contenu à **225px du bord gauche** (15,6 % de la largeur) ; la frise dorée court 52px plus à gauche.
- Le héros est **un seul écran** ; sur le site, la molette passe d'un écran à l'autre.
- Deux fonds seulement : la **nuit étoilée** (du `--bg-top` au `--bg`, halo `--bg-glow`) et le **noir** (`--nav`, `--sub`, pied).

## Pages internes

| Page | Composition |
|---|---|
| **Informations** | titre en cartouche ; onglets (actif doré) ; liste de bandeaux de 993 × 151px ; bouton pleine largeur ; bande d'abonnement |
| **Personnages** | titre en cartouche ; frise d'emblèmes à gauche ; panneau de verre ; portrait qui déborde à droite ; vignettes en bas du panneau |
| **Mondes** | carte stellaire plein écran sous la barre ; étiquette « Mondes » en haut à gauche ; mondes cliquables |
| **Fiche d'un monde** | illustration floutée ; « Retour » ; titre centré ; carrousel de lieux |

## Mobile (≤ 860px)

Le site sert sa version mobile selon l'appareil ; dans un navigateur de bureau rétréci à 390px, il garde sa mise en page large. La version mobile a été **observée le 2026-10-02** dans un autre navigateur (accueil seulement) ; le reste est une adaptation proposée.

- **Barre** 52px : pilule blanche « Télécharger maintenant » à gauche, trois traits à droite.
- **Héros** portrait plein écran, logo en haut à gauche, gros bouton jaune centré, bouton lecture dessous.
- Frise dorée et rail masqués ; contenu à 16px des bords.
- Carrousel : une carte à 78 % de la largeur, flèches posées sur les bords.
- Personnages en 2 × 2 ; frise d'emblèmes en ligne au-dessus du panneau ; portrait en haut du panneau, citation sous le texte.
- Carte des mondes : même carte, icônes de 48px.
- Abonnement : champ puis bouton, en colonne.
