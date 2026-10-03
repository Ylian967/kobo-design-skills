# Showroom Bento — mises en page

## Écran principal (vu dans la référence)

Écran de 1440 × 1014px, mesuré sur le shot.

```
┌────────────────────────────────────────────────────────────────┐
│ ◆        (Modèles)(Services)(Expérience)(Marque)   ○ ○ (Commander)│  barre : marge 40, hauteur 50
│                                                                  │
│ Modèle Marque                                          429 €     │  titre à 166px du haut
│ légende                                    légende du prix       │
│                          ┌─────────┐                             │
│  ◖voisin                 │ PRODUIT │                 voisin◗     │  scène : hauteur restante
│                          └─────────┘                             │
│                  ⟮────────── sol ──────────⟯                      │
│                            ( ←  → )                              │  pilule 105 × 51
│┌──────────────┐┌──────┐┌──────┐┌──────┐┌──────────────┐          │
││ accessoire   ││ car. ││ car. ││ car. ││ teinte    ●  │          │  bento : 2 × 118px
││ prix  [photo]│├──────┤├──────┤├──────┤│ aperçu    ●  │          │  écart 4, marge 4
││ (Acheter)    ││ car. ││ car. ││ car. ││ + prix    ●  │          │
│└──────────────┘└──────┘└──────┘└──────┘└──────────────┘          │
└────────────────────────────────────────────────────────────────┘
```

- La scène remonte de 90px sous le titre : le produit peut frôler la ligne du titre, jamais la couvrir.
- L'écran fait au moins 800px de haut ; au-delà, c'est la scène qui grandit.
- Largeur maximale du cadre : 1680px.

## Tablette (proposée — sous 1100px)

- Les pilules gardent leur place mais prennent la largeur de leur texte.
- Bento sur 6 colonnes : accessoire et teinte côte à côte sur la première ligne (2 rangées), puis les six caractéristiques par trois.

## Mobile (proposé — sous 760px)

- Marge extérieure de 6px ; l'écran prend la hauteur de son contenu et la page défile.
- Barre : monogramme et outils sur une ligne, pilules sur une seconde ligne qui défile à l'horizontale.
- Titre, légende, prix (32px), légende du prix : empilés à gauche.
- Scène de 340px : un seul produit visible (78 % de large), les voisins sont cachés ; flèches ou glissement du doigt.
- Bento sur 2 colonnes : accessoire sur toute la largeur, six caractéristiques par deux, teinte sur toute la largeur.

## Autres écrans (proposés — non vus dans la référence)

**Gamme.** Même cadre ; à la place de la scène, une grille de tuiles blanches (3 colonnes, écart 4px), chacune avec un produit détouré sur fond `--frame`, nom en gras et prix. La pilule « Modèles » reste active.

**Configuration.** La scène occupe les deux tiers gauches ; à droite, une colonne de tuiles : teinte, finition, accessoires cochés, total en `--fs-title` et pilule « Commander » pleine largeur.

**Panier.** Tuiles larges empilées (photo à gauche, nom et prix à droite, bouton rond pour retirer), total dans une tuile `--ink` à texte blanc.

**Accessoires.** Rangée bento répétée : une tuile large par accessoire (texte, prix, pilule, photo), 2 par ligne.

## Règles

- Un seul produit grand par écran ; les voisins restent petits et coupés par le bord.
- Les tuiles ne se touchent jamais et ne s'écartent jamais de plus de 4px.
- Pas de section sous le cadre sur grand écran : tout tient dans l'écran.
- Le rouge n'apparaît qu'à trois endroits : monogramme, nom de marque, pastille.
