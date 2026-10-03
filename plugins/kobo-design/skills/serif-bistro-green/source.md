# Source — Serif Bistro Green

- **Référence** : https://dribbble.com/shots/27769189--Vesta-Dining-Restaurant-Landing-Page-UI-UX-Design (« Vesta Dining — Restaurant Landing Page », auteur : Nazmul Haque)
- **Famille** : Restaurant / food
- **Analysé le** : 2026-10-01 (première version, à l'œil) ; **2026-10-03, réécriture complète** : les **huit** images du shot téléchargées en pleine résolution, couleurs **lues au pixel**, tailles du héros mesurées.
- **Ce qui plaît** : l'accord vert profond / crème / orange, la grande serif d'affiche avec une personne glissée entre les mots, les fiches de plats reliées comme un carnet.

> La version précédente notait « 2 images » : le shot en contient huit.

## Ce que contient la référence

Huit **images fixes** de 3200 × 2400px, aucune vidéo, aucun site en ligne. Ce sont des **vues de présentation** (écrans posés sur un fond gris, parfois en perspective ou recadrés) : **il n'y a pas de capture de la page entière**.

1. Deux écrans côte à côte : héros + « Signature Favorites », et fin de page.
2. La même vue, recadrée.
3. Le héros seul, de face.
4. La feuille « Signature Favorites » (trois fiches orange reliées, points).
5. Le bandeau orange « Crafting Exceptional Dining Experiences ».
6. La section verte « Explore Our Food » (pastilles, fiches de plat).
7. La section crème « Exclusive Dining Experiences » (titre en escalier, trois photos encadrées).
8. Le bandeau « Stay Connected » et le pied de page.

**Aucune animation n'est visible** : tout le mouvement de `motion.md` est proposé par le skill.

## Mesuré (lecture des pixels)

| Élément | Valeur |
|---|---|
| Vert | #004e48 (héros, carte, pied) |
| Crème | #fef8e6 |
| Orange | #e45834 |
| Fiche de plat | #18605a ; fond de son image #fcf4e2 |
| Cadre des photos | ≈ #fae8d2 |
| Fond gris de présentation | #cec8c8 (non repris) |
| Héros (image 3, ramenée à 1440px) | barre flottante ≈ 1028 × 69px ; capitales du titre ≈ 190px (ligne 1) et ≈ 125px (ligne 2) ; texte de droite ≈ 22px ; bouton principal 214 × 54px, rayon ≈ 8px |

## Lu à l'œil (non mesuré)

- Tailles des titres de section, des noms de plat, des prix, des pastilles.
- Taille et écart des fiches orange, forme de la reliure, rayon des feuilles.
- Épaisseur du cadre des photos, colonnes du pied.
- L'ordre exact et la hauteur des sections : aucune image ne montre la page entière.

## Police

Didone grasse d'affiche, **non identifiée** ; celle du héros est nettement plus étroite que celle des autres titres. Abril Fatface et DM Sans sont choisies à l'œil.

## Proposé par le skill

- **Toutes les animations** et tous les états (survol, focus, filtre, avance du carrousel, barre qui se range).
- L'arche autour du portrait, le recadrage rond des assiettes.
- `--orange-btn`, `--ink`, `--soft`, `--green-soft`, les filets et l'ombre.
- Les autres pages (`layouts.md`) et **toute la version mobile**.
- Les images par seconde de `motion.md`, mesurées dans un Chrome sans carte graphique, à 1440px seulement.

## Écarts assumés

| Maquette | Dans le skill | Raison |
|---|---|---|
| Nom « Vesta Dining », textes anglais | Restaurant fictif « Maison Sauge », textes français | Identité |
| Personne détourée qui recouvre les lettres | Portrait entier dans une arche à cadre crème | Pas de détourage ; photo libre de droits |
| Plats détourés sur orange et crème | Photos d'assiettes vues de dessus, recadrées en cercle ; photos pleines dans les fiches de plat | Idem |
| Titre du héros en didone étroite, capitales de 190px | Abril Fatface, plus large : 154px de corps au maximum, réglé sur la largeur | Police libre disponible |
| Titre qui passe sous la personne | Chaque ligne coupée en deux autour de l'arche | Garder tous les mots lisibles |
| Boutons #e45834 à petit texte crème (3,5:1) | `--orange-btn` #c8431f (4,6:1) | Contraste |
| Petit texte crème sur les bandeaux orange | Texte `--ink` | Contraste |
| Dessins au trait de restauration rapide (burger, frites) | Cloche, verre, couverts | Cohérence avec un bistrot |
| Pastille « Starters » active d'emblée | Pastille « Tout » ajoutée, active d'emblée | Montrer toute la carte |
| Trois points sous le carrousel | Autant de points que de positions | S'adapter à la largeur |
| Une seule largeur | Tailles en `clamp()`, version mobile | Rendre le skill utilisable |
