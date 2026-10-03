# Heritage Lens — gabarits

Le site de référence n'a pas de page au sens habituel : c'est une **suite de scènes plein écran**. Marge des éléments fixes : 31px (16px en mobile). Point de rupture du site : 920px (puis 640px et 1920px pour les tailles de texte).

## Écran type (1440 × 900)

```
┌──────────────────────────────────────────────────────────────┐
│ Séléné                                                   (◆) │  nom · bouton de plan
│                                                              │
│                       ( médaillon I )                        │
│                         LE  SIQ                            · │  titre géant centré
│                                                            ◉ │  puces à droite, centrées
│                                                            · │
│                                                              │
│                           ( ↓ )                              │
│                 Faire défiler pour continuer                 │  aide à 80px du bas
│ À propos de ce projet →                              (⚙) (♪) │
└──────────────────────────────────────────────────────────────┘
```

Rien ne touche les bords à moins de 31px. Le centre de l'écran appartient au texte ; les coins, aux commandes.

## Déroulé (ordre observé sur le site)

| # | Scène | Longueur (écrans) | Contenu |
|---|---|---|---|
| 0 | Chargement | — | Anneau + pourcentage |
| 1 | Prologue | 5 | Photo de nuit sous brume bleue → photo dorée ; 3 phrases puis « *L'institution* présente » |
| 2 | Titre | 1.6 | Mot géant, sous-titre or, bouton d'entrée |
| 3 | Chapitre I | 5 | Ouverture (0–24 %) · récit (30–52 %) · changement de photo (50–66 %) · point d'intérêt (à partir de 70 %) |
| 4 | Chapitre II, III… | 5 chacun | Même découpage |
| 5 | Fin | 1 | À propos, crédits, retour |

Les pourcentages sont ceux de la démo (proposés) ; l'ordre ouverture → récit → point d'intérêt est celui du site. Sur le site, un chapitre compte plusieurs points d'intérêt (une puce chacun) ; la démo en montre un par chapitre.

## Fenêtres

| Fenêtre | Disposition |
|---|---|
| Vue révélée | Photo plein écran, légende en bas à gauche, fermer en haut à droite |
| Page éditoriale | Bande horizontale : image 38 % · titre + texte (420px) · œuvre + légende · citation (680px) · œuvre · texte (380px) ; écarts de 60 à 140px ; fermer en haut à droite |
| Plan | Liste des chapitres sous le bouton de plan (le site ouvre une carte du lieu, non reproduite) |

## Mobile (390px)

- Titres : la formule `--fs-hero` descend à 75px ; phrases à 28px.
- Point d'intérêt : lentille centrée (132px), puis **carte arrondie** en bas avec titre, récit, pilule.
- Puces réduites au bord droit, sans bulle ; le lien « À propos » ne garde que sa flèche.
- Page éditoriale : une colonne, image en tête sur 46 % de la hauteur, bouton fermer sans libellé.
- Page de fin : photo au-dessus, texte dessous.

La version mobile du site n'a pas pu être ouverte ; ces choix reprennent ce que montre la capture mobile de sa fiche Awwwards (cartes arrondies) et restent une proposition.

## Autres pages possibles

- **Index des œuvres** (présent sur le site, non visité) : grille de vignettes 3:4 sur `--bg`, onglets par chapitre, fiche en fenêtre.
- **Page d'accueil d'une institution** utilisant ce style : une seule scène (photo + mot géant + bouton d'entrée), puis les chapitres en cartes plein écran.
