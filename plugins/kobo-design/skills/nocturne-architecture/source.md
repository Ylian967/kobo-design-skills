# Source — Nocturne Architecture

- **Référence** : https://dribbble.com/shots/27769939-Architecture-Studio-Website-Design-Baraka (« Architecture Studio Website Design — Baraka », par One Week Wonders)
- **Famille** : Architecture / immobilier de luxe
- **Analysé le** : 2026-10-01 (première version, à l'œil, sur une seule image) ; **2026-10-03, réécriture complète** : les **cinq** images du shot téléchargées en pleine résolution, couleurs **lues au pixel**, tailles et positions mesurées par balayage des pixels sur la page entière.
- **Ce qui plaît** : le mot géant coupé par la photo de nuit, le noir, le rouge unique, les phrases en deux tons.

> La première version notait « une seule image » : le shot en contient cinq. La page entière a donc été vue en totalité cette fois.

## Ce que contient la référence

Cinq **images fixes**, aucune vidéo, aucun site en ligne :
1. et 2. Mises en scène du héros et du début de la page (2400 × 1800), à plat puis en perspective.
3. Le détail des trois premières cartes de biens (2400 × 1040) : carte rouge à damier discret, deux cartes photo.
4. Le héros présenté dans un ordinateur portable (2400 × 1800).
5. La **page d'accueil entière**, 1440 × 8144, à l'échelle 1.

**Aucune animation n'est visible** : tout le mouvement décrit dans `motion.md` est proposé par le skill.

## Sections de la page (image 5)

Héros · À propos (phrase en deux tons, 4 chiffres) · bandeau « Baraka Arch Studio » · Réalisations (carte rouge + cartes photo, ligne de progression) · Processus (4 étapes, la première ouverte) · panneau « Simplicity in Motion » · bandeau de catégories en pilules · grande carte photo avec phrase et « Play showreel » · Articles (2 cartes) · pied avec mot-marque géant.

## Mesures (image 5, pixels = pixels de la page)

| Élément | Valeur |
|---|---|
| Page | 1440 × 8144px, marges de 40px |
| Héros | 0 à 1000px ; bleu de la photo #1a3f59 (haut) à #315670 (milieu) |
| Fond | #0e0e0e de 1000 à 7460px ; pied #121210 ; panneau #171516 |
| Mot-marque | 6 lettres de 0 à 1407px de large ; haut à 520px ; coupé à 1000px par le bas du héros |
| Pilule rouge | 151 × 48px, #d50000, à 30px du bord droit, à 24px du haut |
| Carte rouge, points | #ef2525 (#ee2424) ; points du bandeau #fe3a3a |
| Grande phrase | lignes de 47px de haut au pas de 58px ; blanc #ffffff puis gris #626262 |
| Chiffres | 66px de haut ; suffixes #565656 ; filet #2b2b2b sous chaque case |
| Bandeau de mots | 53px de haut ; mots éteints #2a2a2a |
| Titres de section | lignes de 58px de haut |
| Cartes de biens | première carte de 40 à 478px (438px de large), 461px de haut, écart 23px |
| Puces de catégories | 2 bandes de 24px de haut de texte, pilules à contour |

## Lu à l'œil (non mesuré au pixel)

- Rayons : ≈ 12px (cartes, photos), ≈ 20px (panneau, carte film).
- Tailles du petit texte (≈ 13px), des libellés (≈ 11px), des noms et des titres d'étapes (≈ 22 à 26px).
- Le damier très discret de la carte rouge ; les boutons ronds du carrousel (≈ 60px).
- L'approche serrée des grands textes.

## Police

Grotesque serrée de type néo-grotesque (le « a » et le « k » du mot-marque rappellent Helvetica / Neue Haas) : **non identifiée**. Inter Tight (titres) et Inter (texte) sont choisies à l'œil.

## Proposé par le skill

- **Toutes les animations** et tous les états (survol, étape ouverte / fermée, progression).
- `--muted` (#9a9a9a) : le petit texte secondaire de la maquette est plus sombre et trop peu lisible.
- `--accent-text`, `--veil`, `--night`.
- L'heure et la date réelles dans la barre ; le contenu des étapes 2 à 4 (fermées sur la maquette).
- Les autres pages (`layouts.md`) et **toute la version mobile**.
- Les images par seconde de `motion.md`, mesurées dans un Chrome sans carte graphique.

## Écarts assumés

| Maquette | Dans le skill | Raison |
|---|---|---|
| Nom « Baraka », textes anglais | Studio fictif « noctua », textes français | Identité |
| Photos de la maquette | Photos Unsplash de nuit et d'heure bleue | Droits |
| Petit texte blanc sur la carte rouge #ef2525 (4,2:1) | Carte sur `--accent-deep` #d50000 (5,5:1), damier en `--accent` à 35 % | Contraste |
| Petit texte gris sombre | `--muted` #9a9a9a | Lisibilité |
| Gris #626262 pour la fin des phrases | Gardé, réservé aux grands textes (3,2:1) | Fidélité, sous condition de taille |
| Surfaces en pieds carrés | Mètres carrés | Langue |
| Mentions du pied (autre nom de société) | Mentions du studio fictif | Cohérence |
| Une seule largeur (1440px) | Tailles en `clamp()` et `vw`, version mobile | Rendre le skill utilisable |
