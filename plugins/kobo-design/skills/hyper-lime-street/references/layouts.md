# Hyper Lime Street — gabarits

Grille **mesurée** : contenu de 1080px (75 % de la largeur à 1440), barre de 56px, sections séparées par ≈ 117px, panneaux de 442px de haut. Le site entier s'agrandit avec la fenêtre (taille de base = largeur / 25.6) ; le skill borne ces valeurs avec `clamp()`.

## Une section type

```
                    ╱▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔→ sort à droite
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓╱     panneau blanc : image découpée + texte
▓ Personnages  ╱   ╱██████████████████████████████████████████
▓ CHARACTERS ╱   ╱████  bande noire tramée, décalée vers le bas
▓ 02       ╱   ╱██████
▓▓▓▓▓▓▓▓▓╱    ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔ liseré lime
← sort à gauche        ( ◂ ▢▢▢▢ ▸ )              ( En savoir plus ● )
```

- Le **bloc lime** déborde à gauche de l'écran, le **panneau** et la **bande** débordent à droite : rien ne s'arrête au bord du contenu.
- Une section sur deux est **inversée** (bloc lime à droite, formes sortant à gauche).
- Les commandes (vignettes, bouton) sont sur la dernière ligne du panneau.

## Accueil (ordre mesuré sur le site)

| N° | Section | Fond | Disposition |
|---|---|---|---|
| 01 | Accueil | béton | Visuel clé à coins arrondis, autocollants, boutons de plateformes, mot géant vertical, pellicule |
| 02 | Personnages | béton + bande noire à droite | Bloc lime à gauche, panneau blanc, fiche de personnage, vignettes |
| 03 | Documents vidéo | béton | Bloc lime **à droite**, panneau noir sortant à gauche, lecture, vignettes |
| 04 | Actu & infos | béton + bande noire à gauche | Bloc lime à gauche, panneau blanc avec bannière, puis texte défilant |
| 05 | Univers du jeu | béton + bande noire en bas à droite | Carte image à gauche, titre et numéro à droite (sans bloc lime), carte « radio » |
| 06 | Caractéristiques | béton + bande noire à gauche | Bloc lime à gauche, panneau noir avec image et titre lime |
| — | Pied | noir | Réseaux, abonnement, mentions |

Hauteurs relevées : accueil 865px, puis 690, 667, 687, 599, 861px ; page de 5141px.

## Éléments fixes

- Barre noire en haut (56px), toujours visible.
- Onglet latéral à droite (numéro de la section, flèches).
- Onglet « TOP » accroché au pied de page.

## Pages internes (relevé du 2026-10-02, non refait)

| Page | Gabarit |
|---|---|
| Actualités | Badge de section lime sur bande noire, mot géant en filigrane, carrousel de bannières, onglets en pilule noire (actif en parallélogramme blanc), grille de cartes à 3 colonnes aux coins asymétriques |
| Article | Titre centré, barre en pilule noire (fil d'Ariane, date), texte centré, onglet latéral « Retour » |
| Univers | Image floutée plein écran, cartes en éventail (centrale noire, voisines assombries), flèches en pilules |
| Personnage | Badge de section **bleu**, rendu du personnage à gauche, nom 48px sur filigrane, citation, cartes de factions |

Ces pages sont décrites d'après le relevé précédent ; elles n'ont pas de page d'exemple.

## Mobile (390px, proposé)

- Barre : logo, pilule lime, son. Pas d'onglet latéral.
- Le **bloc lime devient un bandeau** en tête de section : numéro à gauche (64px), titre et sous-titre à droite, lime incliné qui sort à gauche.
- Panneau sur toute la largeur ; les découpes d'image gardent l'angle mais sur la moitié de la hauteur.
- Fiche de personnage : nom en blanc sur la photo (voile en bas), texte masqué ; vignettes et bouton sous le panneau.
- Univers : titre au-dessus de l'image. Pied : une colonne, bouton sous le champ.
- Pellicule seulement sur l'accueil.

Le site sert une version mobile distincte selon l'appareil ; elle n'a pas pu être observée.
