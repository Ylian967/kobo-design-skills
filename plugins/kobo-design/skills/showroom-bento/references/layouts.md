# Showroom Bento — mises en page

## Grille et conteneur

- Page `--page`, cadre inséré de `--frame-inset` (12px, 8px en mobile), padding interne `--pad` (16 → 32px).
- Le cadre est une grille de 4 rangées : nav | titre + prix | scène (`minmax(340px, 1fr)`) | bento. Sur ordinateur, l'ensemble tient dans `100vh`.
- Points de rupture : 1100px (tablette), 720px (mobile).

## Écran vitrine (ordinateur)

```
╭──────────────────────────────────────────────────────────────────────────╮
│ V          (Modèles)(Configurer)(Accessoires)(Essai)(Concessions)  ◯ ◯ (Commander) │
│                                                                          │
│ Model V4 Ardente                                              32 000 €   │
│ légende 11px                                             mention 11px    │
│                                                                          │
│ ▒▒photo▒▒         ┌──── photo moto au centre ───────┐         ▒▒photo▒▒  │
│ (voisine,         │                                │          (voisine,  │
│  coupée)          └────────────────────────────────┘           coupée)  │
│                     ░░░░░░░ ombre au sol ░░░░░░░                         │
│                           ( ‹  01 / 03  › )                              │
│ ┌──────────────┐┌──────┐┌──────┐┌──────┐┌───────────────┐                │
│ │ Accessoire   ││ icône││ icône││ icône││ Couleur     ● │                │
│ │ texte  [img] ││Essence│214 ch││299km/h│ [vue face]  ● │                │
│ │ 350,50 €     │├──────┤├──────┤├──────┤│             ● │                │
│ │ (Acheter)    ││198 kg││6 rapp││124 Nm││ Rouge  Inclus ● │              │
│ └──────────────┘└──────┘└──────┘└──────┘└───────────────┘                │
╰──────────────────────────────────────────────────────────────────────────╯
```

## Grille bento

```css
.bento { display: grid; gap: var(--bento-gap);
  grid-template-columns: minmax(0, 1.7fr) repeat(3, minmax(0, 1fr)) minmax(0, 1.7fr); grid-template-rows: auto auto; }
.acc { grid-row: span 2; }
.color { grid-column: 5; grid-row: 1 / span 2; }
```
Les six caractéristiques remplissent automatiquement les colonnes 2 à 4.

## Pages secondaires (si besoin)

Garder le cadre et la nav ; remplacer la scène par une grille de produits en tuiles blanches (même rayon, même écart de 3px), chaque tuile = rendu détouré sur `--soft` + nom + prix + pilule.

## Pied de page

Hors du cadre, sur `--page` : une ligne 11px `--muted` (mention à gauche, liens à droite).

## Tablette (≤ 1100px)

Bento en 3 colonnes : accessoire sur 2 colonnes + couleur sur la 3e, puis les six caractéristiques en 3 × 2. Produit à 78vw ; voisins plus recadrés.

## Mobile (≤ 720px)

- La hauteur n'est plus contrainte : la page défile.
- Nav : monogramme + boutons ronds + « Commander » ; les pilules passent dessous, en ligne qui défile horizontalement dans le cadre.
- Titre puis prix empilés, alignés à gauche.
- Produit à ~104 % de la largeur (légèrement coupé par le cadre), voisins masqués, pilule du carrousel dessous.
- Bento en 2 colonnes : accessoire pleine largeur, caractéristiques en 2 × 3, couleur pleine largeur (pastilles toujours en colonne à droite).
