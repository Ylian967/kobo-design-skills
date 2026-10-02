# Serif Bistro Green — mises en page

Structures déduites des captures du shot (valeurs estimées), réécrites comme patrons réutilisables.

## Grille et conteneur

- Conteneur `--container` (1240px), marges latérales 24px (16px sous 720px).
- Grilles : héros 1fr / 1fr pour le pied du héros ; carrousel 4 colonnes, gouttière de reliure 28px ; expériences 3 colonnes ; newsletter 1.1fr / 1fr ; pied de page 1.4fr / 1fr / 1fr / 1fr.
- Points de rupture : 1024px (navigation repliée, carrousel à 2,2 cartes, pied en 2 colonnes), 720px (tout en une colonne).

## Le principe des feuilles

```
┌──────────── vert (héros) ─────────────┐
│                                        │
╭──────────── crème (rayon 32) ─────────╮   ← margin-top: -32px, z-index 5
│  carte · expériences                   │
╭──────────── orange (rayon 32) ────────╮   ← z-index 6
│  newsletter                            │
╭──────────── vert (rayon 32) ──────────╮   ← z-index 7
│  pied de page · NOM GÉANT              │
└────────────────────────────────────────┘
```

Chaque feuille ajoute `padding-bottom: + 32px` pour que la suivante ne mange pas son contenu.

## En-tête / navigation

Barre flottante collante (`position: sticky; top: 16px`), largeur du conteneur, au-dessus du héros vert. Hauteur ~60px. Reste visible au défilement (sa teinte translucide passe aussi sur le crème).

## Héros

Le personnage est une **image réelle** (photo de la cheffe dans une arche, voir `assets.md`).

```
 [● Sauge]   (Accueil) La carte  Expériences  Contact   (⌕) [Réserver →]

 — BISTROT DE SAISON · LYON 2E
 Cuisine            ┌─toque─┐
                    │ tête  │      de saison
                    │ veste │  ← la 2e ligne passe devant le torse
 phrase 2 lignes    │assiette│        OUVERT  COUVERTS  MENU
 [Réserver →] [Notre histoire →]   Mar→Sam  38 places dès 29 €
╭────────────── feuille crème (coupe le personnage) ─────────────╮
```

- Padding : 48px haut, 64px + 32px bas.
- Arche photo : `position: absolute`, centrée (`left: 50%`, `translate: -46% 0`), largeur `clamp(220px, 26vw, 360px)`, ratio 3:4.2, bas sous le bord de la feuille crème.
- Empilement : ligne 1 `z-index: 1`, personnage `2`, ligne 2 `3`, pied du héros `4`.
- Un léger halo crème (radial à 9 %) derrière l'arche, et un filet crème décalé de 10px autour d'elle.

## Sections types

### Nos incontournables
En-tête centré (surtitre, titre serif vert, phrase), carrousel relié, contrôles centrés. Padding 96px haut.

### Expériences
Titre échelonné avec vignettes (96px au-dessus, 48px en dessous), puis 3 blocs numérotés sous un filet.

### Newsletter
Feuille orange, dessins au trait en fond plein cadre, titre à gauche, texte + champ à droite. Padding 64px.

## Pied de page

Feuille verte : 4 colonnes, filet, mentions, puis le nom géant centré, `white-space: nowrap`, qui touche le bas de la page.

## Adaptation mobile

- Sous 720px : navigation = logo + bouton « Réserver » réduit à la flèche + menu.
- Héros : titre à `clamp(3.25rem, 17vw, 5rem)` ; l'arche photo (46vw) se cale à droite, sous la toque la 1re ligne « Cuisine » à gauche, la 2e ligne (« de saison ») traverse son torse ; le bas de l'arche s'efface (`mask-image` dégradé) ; texte et boutons passent sous l'arche (marge 96px) ; chiffres en ligne.
- Carrousel : cartes à 78 % de largeur, la suivante dépasse pour inviter au geste.
- Titre échelonné : lignes alignées à gauche sauf la dernière ; vignettes conservées.
- Expériences, newsletter, pied de page : une colonne. Le nom géant reste sur une ligne (22vw).
- Vérifier `scrollWidth = 390` : les éléments larges (champ newsletter) ont `min-width: 0`.
