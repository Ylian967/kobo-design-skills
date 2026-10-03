# Pixel Lime Portfolio — composants

Valeurs dans `tokens.css`. Les dimensions sont **mesurées au pixel** sur la maquette (ramenées à une page de 1440px) ou « lues » à l'œil quand c'est indiqué. Les états (survol, focus) sont proposés. Code complet dans `examples/demo.html`.

## Règles communes

- **Noir, blanc, gris très clair, et un seul lime.** Les photos sont en noir et blanc.
- **Aucun arrondi** : blocs, boutons, fiches, champs sont à angles vifs. Seules les petites étiquettes du pied sont en pilule.
- **Deux voix typographiques** : une grotesque serrée en **bas de casse** pour les noms et les énoncés (graisse 400, mots importants en 600) ; une **mono en capitales** pour la navigation, les boutons et les fiches.
- **Des gestes de carnet** par-dessus : ovales tracés au feutre, surlignages, petits autocollants carrés posés en biais, étiquettes noires.
- **Un quadrillage discret** de 17 colonnes sur les sections claires et sombres.

## Mosaïque de pixels

Une bande de carrés lime de `--pixel` (34px à 1440, soit 0.4 case du quadrillage) posée sur la photo du héros, haute de 11 blocs, plus dense au centre, effilochée sur les bords. Elle passe devant le visage. Dessinée dans un `<canvas aria-hidden>` ; la même, plus petite, sur la photo des récompenses.

## Barre de navigation

Quatre liens mono 12px en capitales, **soulignés**, répartis sur toute la largeur (`justify-content: space-between`), posés sur la photo à 22px du haut. Pas de logo.

## Étiquette noire

Petit rectangle noir, texte blanc 11 à 13px en sans : mots-clés posés sur la photo (« créatif », « designer », « portfolio ») ou titre d'un bloc (« Ma façon de travailler »).

## Nom

En bas à gauche du héros : deux lignes en bas de casse, 58px, graisse 400, approche serrée ; la seconde ligne est **décalée d'un cadratin**. À droite, un court texte (290px) aux mots en gras et un bouton mono.

## Bouton mono

Rectangle lime de 26px de haut, texte mono 12px capitales **souligné**, flèche « → ». Survol : noir à texte lime. Variante noire pleine largeur (40px) pour l'envoi du formulaire.

## Énoncé

Grande phrase de 52px, interligne 1.22, graisse 400, avec :
- des **mots en gras** (600) ;
- un **surlignage** : mots en italique gras sur un rectangle lime ;
- un **ovale au feutre** lime autour de deux ou trois mots (SVG, voir `motion.md`) ;
- un **soulignement** lime épais ;
- des **autocollants** : carrés lime de la moitié de la hauteur du texte, inclinés de ±6 à 14°, avec un pictogramme au trait.

Sur noir, les mots forts sont en italique gras **lime**. Un seul de chaque geste par paragraphe.

## Fiche de carnet

304 × 353px, texte mono. Trois teintes côte à côte : lime, blanche, lime sombre.

```
● │ 01 - DESIGN
● │ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
● │ Que ça ressemble           ← 17px
● │ à ce que vous voulez dire.
● │ Identités, systèmes…       ← 11px
● │
● │ Je travaille sur
● │ •Identité •Graphisme
● │ ▓ Explorer le design → ▓   ← lien sur une barre plus sombre
```

Perforations noires à gauche (une tous les 43px), marge en pointillé, titre en capitales suivi d'un filet en tirets, liste à puces sur une ligne, lien souligné sur une barre (`--lime-bar`, `--grey-bar`, `--lime-bar-deep`).

## Grille de projets

Quatre colonnes de cases carrées séparées par des filets de 1px `--grey-bar`, sans marge. Les cases alternent **image** (vignette en noir et blanc avec un retrait de 17 à 24px) et **texte** (nom du projet en bas de casse 42px, discipline en gris dessous, deux lignes en bas de case). Les deux dernières cases portent une phrase d'appel et un bouton.

## Liste de récompenses

Titre en bas de casse avec deux petits traits « d'éclat » ; dessous, une photo carrée à mosaïque. À droite, une liste : intitulé à gauche, année à droite, lignes de 49px sans filet. Ligne survolée : fond noir, texte blanc, deux carrés lime en biais.

## Bloc contact

Section entièrement lime, quadrillée. À gauche : « contact » entouré d'un ovale noir au feutre, puis une phrase et deux paragraphes aux mots en gras. À droite : une **feuille de carnet** blanche (perforations lime, marge filetée) avec un titre centré, des champs gris sans contour, libellés en bas de casse, et le bouton noir.

## Pied de page

Noir. En haut : une question en deux lignes, un texte court, un petit bouton lime ; à droite quatre colonnes de liens gris. Puis la ligne légale, puis le **nom géant** en blanc d'un bord à l'autre, parsemé d'étiquettes lime en pilule (« image de marque », « design créatif ») et d'autocollants.

## Accessibilité

- Noir sur lime (17:1), noir sur lime sombre (9,3:1), blanc sur noir. Le lime n'est jamais un texte sur fond clair.
- Texte secondaire en `--muted` (#6a6a6a), pas le gris plus clair de la maquette.
- Texte posé sur la photo : un voile sombre en haut et en bas du héros.
- Mosaïque, ovales, autocollants, nom géant du pied : décoratifs, `aria-hidden`.
- Le nom découpé en lignes animées garde son texte entier dans `aria-label`.
- Champs avec libellé visible ; focus par contour noir.
- Cibles : les liens de navigation et de pied ont un padding vertical qui porte leur zone à 36–44px.
