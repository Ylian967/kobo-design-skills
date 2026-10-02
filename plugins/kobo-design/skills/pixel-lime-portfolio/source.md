# Source — Pixel Lime Portfolio

- **Site de référence** : https://dribbble.com/shots/27766428-CH-Bold-Editorial-Creative-Personal-Portfolio-Website-UI-Design (LAIN)
- **Famille** : Portfolio / éditorial créatif
- **Analysé le** : 2026-10-01, Chrome

> [URL choisie par recherche « personal portfolio » récent] : le shot a été retenu à partir d'une recherche, pas d'un lien fourni ; vérifier qu'il s'agit bien de celui visé.

## Ce qui a été vu

- **Héros** : photo noir et blanc désaturée et granuleuse ; par-dessus, une mosaïque de carrés lime acide (~#c6f432) façon blocs glitch 8-bit ; deux petites étiquettes noires posées sur la photo (« creative », « designer »).
- **Nom** : en bas de casse, grotesque blanche de graisse légère à moyenne, sur deux lignes décalées ; petit bouton lime avec texte mono capitales « DISCOVER MORE → ».
- **Navigation** : liens mono capitales minuscules (WORK, ABOUT, SERVICES, CONTACT), soulignés, répartis sur toute la largeur en haut.
- **Section claire** : fond gris clair (~#ececec) avec grille fine ; grand énoncé (~28px) mêlant mots regular et gras, pilules lime derrière certains mots, soulignement et cercle tracés à la main, petits autocollants lime ; étiquette noire « how I think ».
- **Section sombre** : fond ~#0f0f0f avec grille ; trois « fiches » (lime, blanche, lime) en texte mono avec liste à cocher, légèrement inclinées ; énoncé avec mots en gras lime.
- **Travaux** : cartes claires, nom du projet en bas de casse, vignettes.
- **Polices** : grotesque type Inter Tight + mono type JetBrains / Space Mono.

## Non mesuré

- Il s'agit d'un **mockup Dribbble** : analyse visuelle des images uniquement, aucun site en ligne, aucun code inspecté.
- Toutes les valeurs (couleurs, tailles, espacements, pas de grille, taille des pixels, angles des fiches) sont **estimées à l'œil**.
- Les polices ne sont pas identifiées : Inter Tight et JetBrains Mono sont **choisies à l'œil**.
- Les sections services et contact, les filtres de projets et les états (survol, focus, erreur) ne figurent pas sur les captures : ils prolongent le langage du shot et sont proposés par le skill.
- Aucune animation n'est visible sur des images fixes : le mouvement (`motion.md`) est une proposition.

## Écarts assumés

| Élément du shot | Dans le skill | Raison |
|---|---|---|
| Nom de la personne, textes, projets | Portfolio fictif « noé valin », textes et projets inventés en français | Identité et droits d'auteur |
| Photo du portrait | Autre portrait N&B (Unsplash) + grain SVG, emplacement `data-slot="portrait-bw"` | Droit à l'image ; à remplacer par votre photo traitée |
| Vignettes de projets | Photos N&B (poste de travail, campagne, vêtement) + une composition graphique pour un logo, `data-slot="project-cover"` | Droits d'auteur |
| Visuels de la démo | Photos Unsplash libres (licence Unsplash), à remplacer par les images du projet | Démo |
| Gris secondaires très clairs sur gris clair | `--muted` #555555 (6,3:1 sur papier), `--muted-dark` #9a9a9a (6,8:1 sur nuit) | Contraste ≥ 4,5:1 |
| Liens de nav minuscules | Zone cliquable portée à 44px de haut, taille visuelle conservée | Accessibilité |
| Lime en texte | Uniquement sur `--ink` / `--card-dark` (≥ 13:1), jamais sur papier | Lisibilité |
