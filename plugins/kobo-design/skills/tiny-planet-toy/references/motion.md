# Tiny Planet Toy — mouvement

## Principes

Lent pour le décor, rebondi pour l'interface. La planète tourne en continu (60s par tour), les poussières dérivent, les boutons et bulles rebondissent (`--ease-bounce`).

## Catalogue

| Moment | Effet | Durée | Courbe |
|---|---|---|---|
| Arrivée | Planète qui apparaît en scale 0.8 → 1, lettres du logo qui tombent une à une | 600ms + 60ms/lettre | `--ease-bounce` |
| Repos | Rotation de la planète | 60s / tour | linéaire |
| Poussières | Dérive + rotation | 20–40s | linéaire, en boucle |
| Survol bouton | Monte de 2px | 150ms | `--ease` |
| Appui bouton | S'écrase de 4px | 150ms | `--ease` |
| Titre → jeu | Le logo s'envole, la planète zoome ×2.5 | 900ms | `--ease` |
| Bulle | Pop (scale 0.6 → 1) puis texte lettre par lettre (30ms) | 350ms | `--ease-bounce` |

## Mouvement réduit

Planète fixe, pas de poussières, pas de chute des lettres ; texte des bulles affiché d'un coup ; transition titre → jeu en fondu de 200ms.

---

## Observé sur le site (2026-10-03)

| Moment | Effet | Statut |
|---|---|---|
| Entrée | Volet turquoise au bord **incliné** (~3°) qui monte et recouvre l'écran de chargement | Observé, ≈ 800ms |
| Planète | Apparition minuscule puis croissance en tournant jusqu'à ~80 % de la largeur | Observé, ≈ 4–6s |
| Logo | Blocs qui tombent un par un sur la planète | Observé, ≈ 150ms d'écart |
| Bloc de départ | Rotation lente continue sur l'axe vertical | Observé |
| Transition vers le jeu | Chargement blanc puis même volet incliné | Observé |
| Jeu | Caméra qui suit le personnage, horizon courbe | Observé |

Mouvement réduit : pas de croissance ni de chute (écran-titre affiché composé), volet remplacé par un fondu court.
