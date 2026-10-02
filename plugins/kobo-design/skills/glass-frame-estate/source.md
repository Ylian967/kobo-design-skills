# Source — Glass Frame Estate

- **Site de référence** : https://dribbble.com/shots/27776118-Realeste-Real-Estate-Property-Listing-Website-Template (shot Dribbble « Realeste — Real Estate Property Listing Website Template », par Imran)
- **Famille** : Immobilier / annonces
- **Analysé le** : 2026-10-01, Chrome

## Ce qui a été vu

- **Héros** : carte encadrée (filet blanc 1px, rayon ~6px) posée sur la même photo en plein écran, floutée. Photo : maison contemporaine en A sur une colline verte, ciel de fin de journée doré.
- **Mot-marque géant** en haut au centre, blanc avec un dégradé vertical vers la transparence (~70 % → 0), placé derrière le bâtiment, effet vitré.
- **Navigation** : logo avec une marque en X à gauche, petite heure au centre, à droite la ville, « MENU » et une icône ronde blanche à points.
- **Titre** en bas à gauche, capitales blanches en grotesque légère/régulière (~40px, proche d'Inter), petit bouton blanc rectangulaire « LEARN MORE → » (rayon ~2px, texte noir).
- **Carte conseiller en verre** : portrait carré, numéro de téléphone, bouton blanc « CALL NOW → ».
- **Page longue** (vue seulement en vignette) : sections blanches, grille d'annonces 2×2 avec photos, bande noire de chiffres et de logos, équipe en grille 4×2 de portraits, cartes de blog, lettre d'info, pied de page noir avec le mot-marque géant estompé.

## Non mesuré

- Il s'agit d'une **maquette Dribbble**, pas d'un site en ligne : aucune extraction de styles possible.
- **Analyse visuelle des images uniquement** : couleurs, tailles, flous et espacements sont **estimés** ; le bas de page n'a été vu qu'en vignette, sa composition est reconstituée.
- **Polices choisies à l'œil** (Inter, Inter Tight) : la police d'origine n'a pas été identifiée.
- Les animations ne sont pas visibles sur un shot statique : `references/motion.md` est une proposition cohérente avec le style.

## Écarts assumés

| Élément de la maquette | Dans le skill | Raison |
|---|---|---|
| Texte blanc directement sur la photo | Voile `--shade` en bas de photo, texte posé dessus (13:1) | Contraste garanti quelle que soit la photo |
| Carte en verre seule | Repli opaque `--glass-solid` sans `backdrop-filter` | Compatibilité, contraste |
| Prix / liens (couleur non relevée) | Ambre `--accent` #a8641f (4,7:1 sur blanc) tiré de la lumière dorée | Cohérence, contraste |
| Nom « Realeste », logo, photos de maisons et de l'équipe, numéro de téléphone | Marque fictive « Halden », photos Unsplash libres (`data-slot`), numéro factice | Marque, droits d'auteur, vie privée |
| Textes anglais | Textes français inventés | Identité, langue |
| Photos de maisons et d'équipe | Visuels de la démo : photos Unsplash libres (licence Unsplash) et/ou scène Three.js, à remplacer par les images du projet | Droits d'auteur ; démonstration du rendu avec de vraies images |
