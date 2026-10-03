# Pocket Device Noir — mises en page

Conteneur `--container` 1280px, marges `--gutter` (16px → 40px), sections de 96px (128px pour le manifeste), alternance `--bg` / `--bg-2` sans filet entre elles.

## Héros « bureau »

```
▢ ora               Produit  Fonctions  Avis  Assistance            [Acheter]
                         Rencontrez Ora.
              Sous-titre gris, 2 lignes, 40 caractères
                  [Précommander]  [▶ Voir la démo]
             [ photo du bureau + objet 3D posé dessus ]
ORA P1                         COMPAGNON IA        ┌ verre : offre du moment ┐
MODÈLE 2026                    VOCAL · HORS LIGNE  └ 149 € 179 €  [J'en profite] ┘
```
- Hauteur `max(700px, 100svh)`, `overflow: hidden`. Vraie photo de bureau chaud (image réelle, voir `assets.md`) étalonnée `--grade-warm`, voile haut pour la barre et `--fade-bottom` jusqu'au noir.
- Texte centré à 9vh sous la barre ; l'objet 3D (`data-3d="hero"`, 48 % de la hauteur) est posé au centre du plateau, vu légèrement en plongée.

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
Zone de 560px minimum, nom géant centré verticalement derrière l'objet 3D (zone 460×560px), quatre légendes aux coins.

## Grille de fonctions

```
[ photo roche, haute     ] [ 5 jours ]   [ photo tissu orange ]
[  + panneau verre       ] [ onde sonore, large (2 colonnes) ]
```
`grid-template-columns: 1.3fr 1fr 1fr`, écart 16px ; la tuile roche fait 620px de haut.

## Avis

Titre bicolore puis rangée de 4 témoignages miniatures (écart 12px).

## Appel final + pied

Grande tuile à coins de 20px : vraie photo d'intérieur chaleureux en fond, fondu noir depuis la gauche, objet 3D incliné à droite, texte à gauche (étiquette, titre bicolore, paragraphe, deux boutons). Pied : filet, mention légale à gauche, liens 12px à droite.

## Mobile (≤ 720px)

- Barre : logo, bouton menu carré, petit bouton « Acheter ».
- Héros 780px : texte centré, objet au milieu du plateau, libellé de coin gauche au-dessus de l'objet, carte d'offre pleine largeur en bas ; le libellé droit est masqué (≤ 1000px).
- Révélation : zone 3D de 440px de haut, légendes en grille 2 colonnes sous l'objet (alignées à gauche).
- Fonctions et avis : une colonne ; tuile roche 420px.
- Appel final : 660px de haut, texte en haut, objet 3D en bas sur 300px (fondu noir du haut vers le bas).
- Pas de défilement horizontal : les rayons et les photos débordent dans des sections en `overflow: hidden`.

---

## Écrans relevés dans la vidéo du shot

- **Pourquoi** (après le manifeste) : fond noir, en-tête centré (étiquette + titre 2 lignes), bande de 5 photos avec sélection centrale, paragraphe centré.
- **En vedette** : 2 colonnes égales, panneau de verre à gauche, photo à droite, carrousel (barre segmentée + flèche ronde).
- **Appel final** (remplace la version extrapolée) : photo plein cadre de l'objet en main, texte centré au-dessus de l'objet, bouton blanc centré sous l'objet, voile sombre en haut pour la lisibilité.

Tous les écrans de la vidéo sont présentés dans un **cadre arrondi à fin contour gris** sur fond noir (mise en scène du shot, pas forcément du site).
