# Source — Pixel Lime Portfolio

- **Référence** : https://dribbble.com/shots/27766428-CH-Bold-Editorial-Creative-Personal-Portfolio-Website-UI-Design (« CH — Bold Editorial Creative Personal Portfolio », par LAIN)
- **Famille** : Portfolio / éditorial créatif
- **Analysé le** : 2026-10-01 (première version, à l'œil, sur une seule image) ; **2026-10-03, réécriture complète** : les **trois** images du shot téléchargées en pleine résolution, couleurs **lues au pixel**, tailles et positions mesurées par balayage des pixels sur la page entière.
- **Ce qui plaît** : les pixels lime sur la photo noir et blanc, les annotations au feutre, les fiches de carnet.

> L'adresse du shot a été retenue à partir d'une recherche, pas d'un lien fourni : elle n'a pas été confirmée par l'utilisateur.
> La première version notait « une seule image » : le shot en contient trois, dont la page entière.

## Ce que contient la référence

Trois **images fixes**, aucune vidéo, aucun site en ligne :
1. Mise en scène en perspective du héros et du début de la page (2400 × 1800).
2. La **page d'accueil entière** : 2652 × 10331px, soit une page de 2592px de large dans un cadre gris — une page de 1440px à l'échelle 1.8.
3. Une vignette de présentation (1600 × 1200).

**Aucune animation n'est visible** : tout le mouvement décrit dans `motion.md` est proposé par le skill.

## Sections de la page (image 2)

Héros (photo, mosaïque, étiquettes, nom, navigation) · énoncé « how I work » sur gris clair quadrillé · « A few things I do » sur noir quadrillé (trois fiches, grand énoncé, bouton) · grille de projets à filets · « recognitions & awards » (titre, photo à mosaïque, liste) · contact sur lime (texte, formulaire sur feuille) · pied noir (question, colonnes de liens, nom géant couvert d'étiquettes).

## Mesures (image 2 ; valeurs ramenées à une page de 1440px)

| Élément | Valeur |
|---|---|
| Page | 2592px de large dans l'image (échelle 1.8) ; marges de 17px |
| Lime | #c9f852 (13 188 points relevés sur la mosaïque) ; section contact #c8f850 |
| Fonds | noir #000000 ; gris clair #f1f1f1 à #f3f3f3 ; papier #f4f4f4 à #f8f8f8 |
| Fiches | lime #c0f048, blanche #f4f4f4, sombre #8cbc18 ; barres de lien #84e000, #c4c4c4, #709414 |
| Quadrillage | 17 colonnes sur la largeur (152.5px dans l'image, 84.7px à 1440) ; trait #1c1c10 sur noir |
| Blocs de la mosaïque | 61px dans l'image, soit 34px : 0.4 case du quadrillage |
| Hauteurs | héros 932px ; énoncé 773px ; services 1358px ; projets + récompenses 1509px ; contact 562px ; pied 571px |
| Navigation | capitales de 9.4px de haut (≈ 12px) ; premier lien à 17px du bord |
| Nom du héros | 2 lignes au pas de 58px, 462px de large, bord gauche à 20px |
| Énoncé | lignes de 52px au pas de 64px ; retrait gauche de 303px (290px pour la section noire) |
| Fiche | 304 × 353px, écart de 33px |
| Grille de projets | 4 colonnes, filets #c4c4c4 |
| Liste de récompenses | lignes au pas de 49px ; ligne mise en avant : fond noir |
| Texte secondaire | #808080 sur clair ; #a8a8a8 sur noir |

## Lu à l'œil (non mesuré au pixel)

- Tailles des titres (≈ 46px), des noms de projets (≈ 42px), du texte courant (≈ 13 à 15px), du texte des fiches (≈ 11 et 17px).
- Le quadrillage sur gris clair (trop pâle pour être relevé de façon fiable).
- Inclinaison des autocollants, forme des ovales.

## Police

Néo-grotesque serrée (proche de Neue Haas / Helvetica Now) et mono de type machine à écrire : **non identifiées**. Inter Tight et JetBrains Mono sont choisies à l'œil.

## Proposé par le skill

- **Toutes les animations** et tous les états (survol des fiches, des boutons, des lignes ; focus des champs).
- Le tirage au hasard de la mosaïque (la maquette en montre un dessin précis), sa densité, son clignotement.
- `--muted` (#6a6a6a), `--field`, `--veil`, `--grid`.
- Les autres pages (`layouts.md`) et **toute la version mobile**.
- Les images par seconde de `motion.md`, mesurées dans un Chrome sans carte graphique (arrivée et repos du héros seulement ; le défilement n'a pas pu être mesuré).

## Écarts assumés

| Maquette | Dans le skill | Raison |
|---|---|---|
| Nom « creagen hayes », textes anglais | Créatif fictif « noé valin », textes français | Identité |
| Photos et visuels de projets de la maquette | Photos Unsplash passées en noir et blanc | Droits |
| Noms de prix et de concours réels dans la liste | Intitulés génériques inventés | Ne pas attribuer de vraies récompenses à une personne fictive |
| Texte secondaire #808080 sur #f2f2f2 (3,6:1) | #6a6a6a (4,8:1) | Contraste |
| Champs du formulaire presque invisibles | Fond #ececec et ombre intérieure légère | Lisibilité |
| Nom géant de 13 signes | Taille réglable (`--giant`), ici pour 9 signes | Le nom change |
| Dessin fixe de la mosaïque | Tirage au hasard à graine fixe | S'adapter à toutes les largeurs |
| Colonnes du pied (liens de produit) | Liens du portfolio | Cohérence du contenu |
| Une seule largeur | Tailles en `clamp()` et en fractions de largeur, version mobile | Rendre le skill utilisable |
