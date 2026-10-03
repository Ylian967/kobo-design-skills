# Hold To Play Music — gabarits

Une seule page plein écran, **sans défilement** : tout tient dans la fenêtre et les écrans se remplacent. Marges de 30px (16px en mobile). Le site de référence est pensé pour le paysage et demande de tourner l'appareil en portrait ; le skill, lui, s'adapte au portrait.

## Accueil (1440 × 900)

```
┌──────────────────────────────────────────────────────────────┐
│ ☻                                                            │  logo du label, 30px du bord
│ MINUIT DIX                                                   │
│                          présente                            │  mono 12px gris
│                                                              │
│              P E R S I S T A N C E                           │  mot peint ≈ 50 % de la largeur, centré vers 46 % de la hauteur
│                                                              │
│      Une expérience interactive à travers dix ans…           │  14.3px fin
│                                                              │
│        Maintenez  ( espace )  pour lancer Persistance.       │  20px gras, à ≈ 72 % de la hauteur
│                                                              │
│ © …  À propos                          #Persistance  mention │  mono 13px, à 44px du bas
└──────────────────────────────────────────────────────────────┘
        fond : plans noir et blanc plein écran + voile + grain
```

## Enchaînement des écrans

| # | Écran | Contenu |
|---|---|---|
| 0 | Blanc | Logo, pictogrammes, phrase colorée, « Commencer » |
| 1 | Accueil | Mot peint qui s'assemble, consigne, plans noir et blanc |
| 2 | Appui | Même écran ; plans couleur rapides, mot blanc, touche qui se remplit |
| 3 | Annonce | Nom + morceau au centre, puis l'année |
| 4 | Scène d'artiste | Image de l'artiste plein écran ; touche de scène au centre ; barre d'artiste en bas ; rappel du mot en haut à droite |
| 5 | Pochette / aide | Fenêtres sur voile sombre |

Retour à l'écran 2 à chaque nouvel appui : la boucle 2 → 3 → 4 est le cœur du style.

## Scène d'artiste

```
│ ☻ MINUIT DIX                                    PERSISTANCE │
│                                                              │
│                 [H]  Maintenez H pour …                      │  centre
│                                                              │
│ ┌──────┐                                                     │
│ │pochet│                                                     │
│ └──────┘                                                     │
│ Nom (2016) ⓥ     Maintenez ( espace ) pour changer…   aide ? │  à ≈ 70px du bas
│ © …                                                          │
```

## Pochette ouverte

Deux colonnes centrées : pochette carrée de 424px à gauche, à droite nom + titre, année, liste des morceaux (420px au plus). Bouton « Fermer » en mono en haut à droite.

## Mobile (390px, proposé)

- Mot peint réduit (`--fs-paint` descend à 50px), consigne sur deux ou trois lignes, touche inchangée (140 × 48px, bonne cible tactile).
- Barre d'artiste remontée : vignette de 92px à gauche, aide réduite à son pictogramme ; la consigne passe en dessous, centrée.
- Pochette ouverte en une colonne défilante.
- Pied de page réduit à « À propos » et à la mention.

## Autres pages possibles

- **Générique / à propos** : fond noir, texte géant 46px en continu, rôles orange, noms blancs.
- **Page d'un artiste hors expérience** (lien partagé) : même scène, la consigne devient « Maintenez ( espace ) pour découvrir les autres artistes ».
- **Écran de fin** après le dernier artiste : mot peint, « Maintenez pour recommencer », liens du label.
