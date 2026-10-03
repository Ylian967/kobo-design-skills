# Noir Inferno Chapters — composants

Valeurs dans `tokens.css`. Les dimensions sont **mesurées** sur le site de référence à 1440×900 sauf mention « proposé » ou « lu ». Code complet dans `examples/demo.html`.

## Règles communes

- **Noir et blanc stricts.** Aucune couleur, sauf un rouge unique réservé au dernier geste du récit.
- **L'image occupe tout l'écran** ; l'interface est minuscule : capitales de 10px très espacées, traits de 0.8 à 1px.
- **Un seul texte à la fois, centré** : un titre serif en capitales, puis au plus trois lignes.
- **Trois états** : ouverture (citation + cercle), **titre** (texte lisible, image assombrie), **vue** (texte masqué, image entière, interface de coin).
- Tout est rond ou linéaire : cercles, pointillés, filets. Pas de carte, pas de fond de bouton (sauf un bouton à contour).

## Cercle à tirer

```html
<div class="pull"><button class="handle" aria-label="Scène suivante : tirer le cercle vers le bas, ou appuyer sur Entrée"></button></div>
```

- Cercle de 52px, contour 0.8px blanc, un point au centre.
- Sous lui, une **ligne pointillée** de 160px, puis une **cible** de 65px en tirets.
- Sous un titre de scène, le cercle est réduit de moitié (26px).
- Dans la dernière scène, il est rouge (`--signal`).
- C'est un `<button>` : Entrée ou Espace valide sans tirer.

## Citation d'ouverture

Trois lignes centrées, serif 20px en capitales, approche 0.6px, largeur 300px, à 17 % du haut. En bas, la consigne en capitales de 10px sur deux lignes (260px).

## Titre de scène

Serif en capitales, `5vmin` (45px à 1440×900), centré, terminé par un point (« LE BORD DU MONDE. »). Dessous, à 18px : un paragraphe sans de 13px, blanc, 480px au plus, centré. L'image est assombrie (`--veil-1`) tant que le texte est affiché.

## Croix

Deux traits de 20px à 60px du haut, centrés. Zone de clic de 44px. Elle masque le texte et passe en mode « vue ».

## Interface de coin (mode « vue »)

| Coin | Élément |
|---|---|
| Haut gauche | Nom du média en serif étroite 28px |
| Haut centre | « EN SAVOIR PLUS SUR *titre de l'œuvre* » |
| Haut droite | Langues, l'inactive à 50 % |
| Bas gauche | Réseaux |
| Bas droite | « À PROPOS » |
| Bas centre | Numéros de scène |

Tout en capitales de 10px, approche 0.14em, à 46px des bords. Survol : un filet de 1px se trace dessous.

## Numéros de scène

Serif. Le numéro courant fait 40px ; en mode « vue », les autres apparaissent autour en 18px à 50 %. Chaque numéro est un bouton nommé (« Scène 3 : Ceux qui regardent. »).

## Bouton « Lire la scène »

Seul bouton à contour : 1px blanc, capitales de 10px, approche 0.1em, padding 15px 26px, à 10 % du bas. Survol : fond blanc, texte noir. Visible en mode « vue ».

## Panneau « à propos »

Plein écran, fond `--paper` (#dedede), texte noir : titre serif géant, colonne de 500px en 12px / 20px, crédits en capitales de 10px `--ink-soft` en bas, croix noire en haut. `role="dialog"`, Échap ferme.

## Grain et poussière

Un grain fixe à 13 % sur tout l'écran, un vignettage (bords et bas plus sombres), une quinzaine de points blancs de 2px qui dérivent. Ils unifient des images de sources différentes.

## Accessibilité

- Trois façons d'avancer : tirer le cercle, la molette, le clavier (Entrée sur le cercle, flèches, page suivante).
- Le texte de la scène est dans une zone `aria-live="polite"` : il est annoncé à chaque changement.
- Texte blanc sur image assombrie ; en mode « vue », il n'y a plus de texte courant sur l'image.
- Cibles de 44px pour la croix, de 34 × 54px pour les numéros ; le cercle réduit (26px) garde une zone de saisie de 46px.
- Le rouge `--signal` n'est jamais un petit texte (3,6:1).
- Chaque image de scène porte un texte alternatif qui décrit ce qu'on voit (« Falaise et sapins émergeant d'une mer de brouillard ») ; grain, poussière et voiles sont décoratifs.
