# Retro Mission Poster — composants

Valeurs dans `tokens.css`. « Mesuré » = lu dans la feuille de style de l'ancien site (archive du web) ou sur la capture officielle ; le reste est proposé. Code complet dans `examples/demo.html`.

## Règles communes

- **Une affiche par écran** : image plein cadre traitée en aplats granuleux, cadre crème, titre en biais.
- **Trois couleurs d'encre** : crème `--cream`, rouge `--red`, noir chaud `--bg`. Les images restent dans une gamme terre / sarcelle.
- **Deux polices** : des capitales très hautes et étroites (`--font-display`) pour les titres ; une géométrique façon Futura (`--font-body`), en gras capitales pour les accroches, en médium pour le texte.
- Aucun arrondi sur les boutons ; 12px sur les images du journal ; boutons ronds à contour de 2px.

## Cadre

Bordure crème fixe sur les quatre côtés (`--frame`, ≈ 9px à 1440), au-dessus de tout, sans capter les clics. C'est lui qui fait « affiche imprimée ».

## Logo et menu

Logo en capitales grasses rouges, espacées, en haut à gauche. Menu : trois traits crème de 2px en haut à droite ; ils se croisent quand le menu est ouvert.

## Titre de chapitre

```html
<div class="title"><small>Chapitre 1</small>
  <h1 aria-label="Du carburant tiré de l'air"><span aria-hidden="true"><b>Du carburant</b></span><span aria-hidden="true"><b>tiré de l'air</b></span></h1></div>
```

- Capitales étroites de 120px, interligne 0.84, crème, sur deux lignes.
- **Incliné** : `rotate(-13deg) skewX(-13deg)` — le titre monte vers la droite et ses verticales restent d'aplomb.
- Au-dessus, « CHAPITRE 1 » en petites capitales très espacées (0.42em).
- Dans la moitié droite ou gauche, sur une zone calme de l'image.

## Mot géant

Un mot en rouge, capitales étroites de très grande taille, placé derrière le titre, à moitié hors cadre. Décoratif (`aria-hidden`).

## Accroche

En bas à droite, alignée à droite : titre en capitales grasses 20px, deux lignes de texte 18px, puis un **bouton crème rectangulaire** (44px de haut, texte noir 14px gras espacé). Survol : fond rouge.

## Anneau dentelé

Cercle à 44 dents en trait rouge de 1.5px, ≈ 150px, posé à cheval sur le bord bas ; une flèche fine au centre. Il tourne lentement. C'est le lien vers le chapitre suivant.

## Liste de faits

Trois lignes séparées par un filet rouge de 1px : intitulé en capitales étroites 40px, une ligne en petites capitales 14px.

## Carte du journal

Image 1 : 0.627 aux coins de 12px ; date en capitales 14px ; titre en capitales étroites 40px / 34px ; filet rouge. Survol : contour rouge de 2px autour de l'image.

## Inscription (menu)

Titre rouge en capitales grasses, texte gris `--soft`, champ sans fond souligné de 2px avec une flèche pour envoyer, trois boutons ronds de 52px à contour de 2px.

## Accessibilité

- Crème sur l'image : toujours sur une zone sombre ou moyenne (terre, ciel profond) ; un dégradé sombre renforce le bas de l'écran sous l'accroche.
- Le rouge `--red` sur fond sombre fait 4,4:1 : réservé aux grands titres et aux traits ; petit texte rouge en `--red-text`.
- Titres découpés en lignes : texte entier dans `aria-label`.
- Chaque image traitée garde son texte alternatif.
- Menu : `inert` quand il est fermé, Échap ferme, le bouton annonce son état (`aria-expanded`).
- Cibles de 44px au moins (menu, bouton, anneau, champ).
