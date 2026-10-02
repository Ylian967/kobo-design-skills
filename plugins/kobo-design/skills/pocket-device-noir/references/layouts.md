# Pocket Device Noir — mises en page

Conteneur `--container` 1280px, marges `--gutter` (16px → 40px), sections de 96px (128px pour le manifeste), alternance `--bg` / `--bg-2` sans filet entre elles.

## Héros « bureau »

```
▢ ora               Produit  Fonctions  Avis  Assistance            [Acheter]
                         Rencontrez Ora.
              Sous-titre gris, 2 lignes, 40 caractères
                  [Précommander]  [▶ Voir la démo]
      ☕          [ objet posé sur le bureau ]          📓
ORA P1                         COMPAGNON IA        ┌ verre : offre du moment ┐
MODÈLE 2026                    VOCAL · HORS LIGNE  └ 149 € 179 €  [J'en profite] ┘
```
- Hauteur `max(700px, 100svh)`, `overflow: hidden`. Photo : mur sombre et lampe chaude en haut, plateau en bois à partir de 52 %, voile `--fade-bottom` jusqu'au noir.
- Texte centré à 9vh sous la barre ; l'objet est posé au centre du plateau, légèrement incliné en perspective.

## Manifeste

Noir pur, rayons en éventail centrés, étiquette « Pourquoi Ora » puis 3–4 lignes centrées avec mots rouges.

## Révélation produit

```
Tient dans la main.                         Paragraphe gris, 38 caractères
Pèse 62 grammes. (gris)
  ─ ÉCRAN                                         BOUTON ─
  Écran mémoire…        O r a [objet] P 1        Bouton rouge…
  ─ MICRO                                         MOLETTE ─
                         [Mettre en veille]
```
Zone de 560px minimum, nom géant centré verticalement derrière l'objet (34px de `--s`), quatre légendes aux coins.

## Grille de fonctions

```
[ roche, haute (2 rangs) ] [ 5 jours ]   [ tissu orange ]
[  objet + panneau verre ] [ onde sonore, large (2 colonnes) ]
```
`grid-template-columns: 1.3fr 1fr 1fr`, écart 16px ; la tuile roche fait 620px de haut.

## Avis

Titre bicolore puis rangée de 4 témoignages miniatures (écart 12px).

## Appel final + pied

Grande tuile à coins de 20px : dégradé noir → bois → lumière de lampe à droite, objet incliné à droite, texte à gauche (étiquette, titre bicolore, paragraphe, deux boutons). Pied : filet, mention légale à gauche, liens 12px à droite.

## Mobile (≤ 720px)

- Barre : logo, bouton menu carré, petit bouton « Acheter ».
- Héros 780px : texte centré, objet au milieu du plateau, libellé de coin gauche au-dessus de l'objet, carte d'offre pleine largeur en bas ; le libellé droit est masqué (≤ 1000px).
- Révélation : objet à 24px de `--s`, légendes en grille 2 colonnes sous l'objet (alignées à gauche).
- Fonctions et avis : une colonne ; tuile roche 420px.
- Appel final : 660px de haut, texte en haut, objet en bas au centre.
- Pas de défilement horizontal : les rayons, le bureau et le carnet débordent dans des sections en `overflow: hidden`.
