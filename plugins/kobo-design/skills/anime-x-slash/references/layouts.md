# Anime X Slash — mises en page

## Grille

- Fond `--bg` sur toute la page ; sections séparées par l'espace (padding vertical 80px mesuré), jamais par des traits horizontaux.
- Container du contenu : 1146px max. Colonne de texte : 720px qui démarre vers 20 % de la largeur (≈ 330px sur 1536px).
- Les titres de section ne respectent pas le container : ils partent du bord gauche de l'écran.
- Décor de fond fixe : 3 à 6 **filets diagonaux** au même angle (1px, `--line-accent` et `--line-ghost`) qui dessinent un grand X en contour. Ils restent derrière tout, `pointer-events: none`.
- Points de rupture mesurés : 768px (mobile ≤ 768, desktop ≥ 769).

## Écran de chargement

Fond noir plein écran. Au centre, le logotype en gris foncé qui **se remplit de blanc de bas en haut** au fil du pourcentage (masque). En bas à gauche « LOADING » (Oswald 11px blanc), en bas à droite le pourcentage. Sortie : fondu noir 500ms. Le contenu doit rester accessible même si le script échoue (le loader disparaît après 4s maximum).

## En-tête

Pas de barre : seulement le **carré MENU** fixe en haut à gauche, le **sélecteur de langue** en haut à droite, le rail « OFFICIAL » + icônes sociales fixe en bas à gauche.

## Héros (pleine hauteur)

1. Fond `--bg`.
2. Derrière : une **lettre X géante** en aplat magenta/rouge tramé (halftone en `radial-gradient`) et éclats colorés.
3. Devant : le visuel principal (groupe de personnages) centré, qui déborde en haut.
4. En bas au centre : le logotype noir en italique condensé, qui chevauche le visuel.
5. À droite : « VISUAL SELECTER » vertical + 4 vignettes.

Sans illustrations : remplacer par une composition de formes (parallélogrammes de couleurs `--chara-*`, trame, X géant) et un emplacement `data-slot="key-visual"`.

## Bande visuelle découpée

Section noire avec un grand visuel découpé en X (voir `components.md`), voile sombre, gros mot Oswald gris translucide qui sort en bas (titre de la section suivante, ex. « INTRODUCTION »).

## Actualités

Liste noire centrée dans le container, juste après le héros, chevauchant légèrement la section suivante.

## Introduction

Titre « INTRODUCTION » rouge géant à gauche → colonne de texte gras 20px/40px → une phrase d'accroche en rouge 32px gras → bande noire pleine largeur avec le pitch en blanc (même colonne).

## Staff & casting

Deux colonnes égales, titres « STAFF » / « CAST » en Oswald noir 48px, listes en italique (voir composants).

## Classement / personnages

Deux rangées de 5 cartes-parallélogrammes emboîtées ; triangles noirs aux extrémités ; la 2ᵉ rangée est décalée d'une demi-carte vers la gauche.

## Pied de page

Noir. Logos partenaires au centre, tag-btn « OFFICIAL SNS », liens sociaux en ligne, copyright 11px, mentions en gris 14px alignées à droite, liens SUPPORT | PRIVACY à gauche.

## Mobile (≤ 768px)

- Bouton MENU réduit à 60×60.
- Titres de section : `clamp` les ramène à ~56px, toujours à gauche.
- Colonne de texte : pleine largeur avec 20px de marge, texte 16px/32px.
- Classement : grille 2 colonnes, cartes moins inclinées (skew -12deg), chiffres 56px.
- Visuel découpé : une seule bande diagonale.
- Rails latéraux masqués, réseaux sociaux déplacés dans le menu.
