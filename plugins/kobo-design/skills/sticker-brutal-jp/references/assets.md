# Sticker Brutal JP — images et pictogrammes

## Ce que montrent la référence et le site

- Un **portrait détouré en noir et blanc** de l'autrice sur un écusson rose, livré en une seule image avec ses bulles et son katakana.
- Des **illustrations d'icônes** en tête des fiches de service (160px).
- Des **captures d'écran de projets** posées sur des fonds de couleur.
- Autour du cadre (shot seulement) : des autocollants, dont des logos d'outils et un poisson rouge illustré.

## Ce que fait le skill

| Rôle | Solution |
|---|---|
| Portrait | Vraie photo, passée en noir et blanc par le serveur d'images (`sat=-100`), fondue dans le rose par `mix-blend-mode: multiply`, découpée par un masque en écusson |
| Bulles, katakana | Reconstruits en HTML et CSS autour du portrait : ils restent des textes, donc traduisibles |
| Tuiles de service | Petite fenêtre colorée avec un pictogramme au trait |
| Projets, articles | Vraies photos en couleur |
| Autocollants | Formes géométriques simples en SVG ; pas de logo de marque, pas d'illustration figurative |

## Photos de la démo (Unsplash)

| Rôle | Identifiant | Recadrage |
|---|---|---|
| Portrait | `photo-1684598273410-d891cbadec7a` | `fit=crop&crop=top&w=640&h=740&sat=-100` |
| Témoignage 1 | `photo-1507003211169-0a1dd7228f2d` | `crop=faces&w=120&h=120&sat=-100` |
| Témoignage 2 | `photo-1535713875002-d1d0cf377fde` | idem |
| Témoignage 3 | `photo-1604072366595-e75dc92d6bdc` | `w=160&h=160&sat=-100` |
| Projet : confiserie | `photo-1617825295690-28ae56c56135` | `w=900&h=700` |
| Projet : application | `photo-1633250391894-397930e3f5f2` | `w=900&h=700` |
| Projet : échoppe | `photo-1621212909598-c966bed86135` | `w=900&h=700` |
| Article 1 | `photo-1769218859578-370c803614d0` | `w=1000&h=500` |
| Article 2 | `photo-1628088784459-0eebea2d3ecf` | `w=1000&h=500` |

## Choisir le portrait

- **Fond uni clair ou moyen** : en fusion « multiply », un fond sombre noierait le rose. Le fond de la photo devient le rose de l'écusson.
- Visage dans le **tiers haut**, épaules visibles : la pointe de l'écusson coupe le bas.
- Noir et blanc obligatoire ; les portraits ronds des témoignages aussi.

## Choisir les autres photos

- Projets et articles **en couleur**, plutôt vives : elles répondent aux aplats.
- Sujet lisible une fois penché de 3° et réduit à 76 % de sa case.
- Éviter les photos dont la dominante est celle de la case (une photo jaune sur la case jaune).

## Pictogrammes

Tracés SVG en ligne, trait de 2.2 à 2.6, bouts et angles ronds, sans remplissage, couleur `--ink` : graphique dans une bulle, œil, coche, curseur, image, sac, enveloppe, menu.

## Polices

- **Mochiy Pop One** : titres japonais, titres de section, katakana vertical, pilule de langue. C'est la police du site.
- **Noto Sans JP** 400, 500, 800 : tout le texte courant, japonais comme français. C'est la police du site.
- **Outfit** 500, 600, 800 : titre latin, navigation, étiquettes. Remplace Unigeo 32, la police payante du site.

## Interdits

- Pas de portrait dessiné, pas d'avatar illustré à la place d'une photo.
- Pas de logo de marque en autocollant.
- Pas d'ombre floue, pas de dégradé.
- Pas d'émoji en guise de pictogramme.
