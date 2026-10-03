# Pixel Lime Portfolio — gabarits

Grille **mesurée** sur la maquette (page de 1440px) : marges de 17px, quadrillage de 17 colonnes (84.7px), blocs de texte centrés en retrait de 290px. Les sections se touchent, sans espace entre elles : c'est le changement de fond qui les sépare.

## Héros (1440 × 932)

```
┌───────────────────────────────────────────────────────────────┐
│ TRAVAUX            À PROPOS            SERVICES        CONTACT │  liens mono soulignés, répartis
│                                                               │
│            photo noir et blanc plein cadre                    │
│   ▄ ▄▄  ▄▄▄ ▄ ▄▄▄▄▄▄ ▄▄ ▄▄▄ ▄▄▄▄ ▄ ▄▄▄ ▄▄▄ ▄                  │
│  ▄▄▄▄▄▄▄▄▄▄▄▄[créatif]▄▄▄▄▄[designer]▄▄▄▄▄[portfolio]▄▄▄▄▄▄▄  │  mosaïque lime : de 30 % à 70 % de la hauteur
│   ▀ ▀▀▀ ▀▀ ▀▀▀▀  ▀▀▀ ▀▀▀▀▀ ▀▀ ▀▀▀▀  ▀▀ ▀                      │
│                                                               │
│ noé                                   Entre stratégie, design │
│    valin                              et récit…  [DÉCOUVRIR →]│
└───────────────────────────────────────────────────────────────┘
```

## Page d'accueil (ordre de la maquette)

| # | Section | Fond | Hauteur relevée | Disposition |
|---|---|---|---|---|
| 1 | Héros | photo | 932px | voir ci-dessus |
| 2 | Énoncé | gris clair quadrillé | 773px | étiquette noire + deux paragraphes géants, en retrait de 290px |
| 3 | Services | noir quadrillé | 1358px | titre entouré, trois fiches, grand énoncé, bouton |
| 4 | Projets | gris clair | — | grille 4 × 2 à filets, pleine largeur |
| 5 | Récompenses | gris clair | (4 + 5 : 1509px) | titre et photo à gauche, liste à droite |
| 6 | Contact | lime quadrillé | 562px | texte à gauche, feuille de formulaire à droite |
| 7 | Pied | noir | 571px | question + colonnes, puis nom géant |

Rythme des fonds : photo → clair → **noir** → clair → **lime** → **noir**. Le lime n'est un fond qu'une seule fois.

## Grille de projets

```
┌────────┬────────┬────────┬────────┐
│ image  │ nom    │ image  │ nom    │
│        │ texte  │        │ texte  │
├────────┼────────┼────────┼────────┤
│ nom    │ image  │ appel  │ bouton │
│ texte  │        │        │        │
└────────┴────────┴────────┴────────┘
```

Les images et les textes sont **en quinconce** d'une rangée à l'autre.

## Autres pages (proposées, la maquette ne montre que l'accueil)

- **Projet** : photo plein cadre avec mosaïque et nom du projet en bas de casse ; énoncé ; grille d'images à filets ; fiche de carnet « rôle / année / client ».
- **À propos** : portrait à mosaïque, énoncé long avec gestes de carnet, liste de récompenses.
- **Journal** : liste d'articles sur le modèle des récompenses (titre à gauche, date à droite, ligne noire au survol).

## Mobile (390px, proposé)

- Héros en colonne : navigation sur une ligne (11px), mosaïque plus petite (les blocs suivent la largeur), texte et bouton au-dessus du nom.
- Énoncés à 28px ; les ovales et surlignages restent.
- Fiches empilées sur toute la largeur.
- Grille de projets en 2 colonnes ; les cases de texte prennent la hauteur de leur contenu.
- Récompenses : liste, puis photo.
- Contact : texte puis feuille ; champs en une colonne.
- Pied : colonnes de liens deux par deux ; nom géant toujours d'un bord à l'autre.
