# Source — Glass Frame Estate

- **Référence** : https://dribbble.com/shots/27776118-Realeste-Real-Estate-Property-Listing-Website-Template (« Realeste — Real Estate & Property Listing Website Template », par Imran)
- **Famille** : Immobilier / annonces
- **Site en ligne du template** : https://realeste.framer.website/ (site Framer)
- **Analysé le** : 2026-10-01 (première version) ; **2026-10-03, réécriture complète** : les deux images du shot téléchargées en pleine résolution, le site en ligne ouvert dans Chrome à 1440×900 et 390×844 (styles calculés, HTML et scripts du site lus, captures de l'arrivée, de tout le défilement, des survols, du menu).
- **Ce qui plaît** : le mot-marque derrière la maison, le cadre sous verre, le noir et blanc strict.

## Ce que contient la référence

- **Shot** : 2 images fixes. (1) Le héros, 3200×2400, présenté dans un cadre blanc arrondi sur un fond de ville flouté. (2) La page d'accueil entière, 1600×14 835. Aucune vidéo.
- **Site en ligne** : la même page, animée. C'est lui qui fournit les mesures et **les animations** (elles sont donc relevées, pas inventées, sauf mention contraire).

## Mesuré sur le site (1440×900)

| Élément | Valeur |
|---|---|
| Polices | Inter 400 / 500 / 600 ; Geist Mono 500 (heure) |
| Mot-marque | 280px / 308, graisse 600, approche −11.2px, 1200px de large, haut à 100px ; dégradé `0deg, blanc 0 % à 19 % → blanc à 170 %` (pied : `0 à 8 % → 0.4 à 116 %`) |
| Titre du héros | 80px / 88, graisse 500, approche −1.6px, capitales ; 550px de large, à 112px du bord |
| Titres | 48px / 52.8 (−0.96px), 32px / 35.2 (−0.64px), 24px / 26.4, 20px / 22 ; page interne 100px / 110 graisse 600 |
| Libellés | 16px / 16, graisse 500, capitales, sans approche ; texte 16px / 25.6 |
| Couleurs | #000, #fff, #f2f2f2, #fafafa, #555 ; blanc 80 % sur noir ; voile du héros `rgba(23,23,23,.2)` ; graduations `rgba(17,17,17,.3)` |
| Verre | fond `rgba(0,0,0,.05)`, `backdrop-filter: blur(2px)`, rayon 10px, ombres internes blanches ±1.5px à 50 % ; cellules 160×140 et 259×140, bas à 48px du bord |
| Boutons | 50px de haut, rayon 4px, fond #f2f2f2 ou noir, padding 13 / 12 / 13 / 18, écart libellé-flèche 80px ; 238px et 219px de large dans le héros |
| Étiquettes | 34px, rayon 4px, padding 9 / 12, écart 6px ; blanche (lieu) et noire (statut) ; puces 32px |
| Grille | contenu 1200px ; sections `140px 30px` ; écart 10px ; carte d'annonce 580×560 (écart 30px) ; ligne de service 1200×160 (padding 40px) ; quartier 290×320 (padding 10px) ; étape 1200×380 ; témoignage 380×428 (padding 30px) ; agent 380×399 ; ligne de FAQ 580px, padding 22 / 20 |
| Rayons | 10px, 6px, 4px |
| Dégradés | `270deg, rgba(9,9,9,0) 12% → #090909 103%` (appel final) ; `180deg, transparent 56% → #000 92%` (cartes photo) |
| Entrée des sections | de `opacity 0, y 80px` à la position finale, ressort raideur 250 / amortissement 54 / masse 1, une fois, seuil 0 |
| Étapes | bloc collant à 40px ; cartes de `y 288px, rotateX 90°` à 0, liées au défilement, sans perspective ; relevé en direct : 43.7° à mi-course, 600px de défilement par carte |
| Transitions | couleur 0.4s `cubic-bezier(.44,0,.56,1)` ; 0.3s et 0.5s même courbe ; ressort court 0.4s (rebond 0.2) |
| Menu | voile `backdrop-filter: blur(5px)`, padding 120 / 30 / 80, liens 32px / 35.2 graisse 500 centrés |
| Sections | Héros 972px, À propos, Annonces, Services (noir), Quartiers, Vidéo, Étapes (2 662px), Témoignages, Agents (gris), Contact, Journal, FAQ (gris), Appel final, Pied ; page de 15 946px |

**Mobile (390px)** : titre du héros 40px / 44, titres 32px, surtitres 14px, nom de bien 16px, service 22px ; sections `60px 20px` ; tout en une colonne ; **étapes empilées sans carte collante** ; cellules du héros empilées (335×290 et 335×128) ; mot-marque toujours à 280px (il déborde).

## Observé sur captures (non chiffré)

- Arrivée : le mot-marque, le titre et les cellules montent en fondu en moins d'une seconde ; la photo est déjà là.
- Survol d'une ligne de service : fond blanc, texte noir, contenu légèrement resserré.
- Survol d'un agent : une carte blanche (nom, rôle, « Fb / Be / X / Ln ») recouvre le portrait.
- Compteurs : les chiffres défilent verticalement.
- Sur le shot seulement : l'étiquette « FOR RENT » est jaune ; sur le site elle est noire. Le skill suit le site.

## Proposé par le skill (non mesuré)

- **Le cadre** : sur le shot il fait partie de la mise en scène (fond de ville flouté, marge de 6 %) ; le site est plein écran. Le skill en fait sa signature, avec la même photo floutée derrière et une marge de 8 à 20px.
- Le dégradé sombre sous le titre du héros, `--shade`, les filets `--rule` et `--rule-dark`.
- Le sens des fonds de survol, la cascade des liens du menu (40ms), le décalage de 120ms à l'arrivée, les durées des compteurs, le zoom 1.04 des photos, la flèche qui avance de 4px.
- Le bandeau fixe des agents sur écran tactile, les quartiers en 2 colonnes en mobile.
- Les images par seconde de `motion.md`, mesurées dans un Chrome sans carte graphique ; l'ouverture du menu dans sa forme finale n'a pas pu être re-mesurée de façon fiable.

## Non vu

- Les pages internes n'ont **pas été rouvertes** le 2026-10-03 : leurs mesures (`layouts.md`) datent du premier relevé du même jour sur le site.
- Le détail de la vidéo (section 6) et l'état de survol des boutons image par image.

## Écarts assumés

| Référence | Dans le skill | Raison |
|---|---|---|
| Nom « Realest », logo, textes anglais, adresses à New York | Agence fictive « Halden » à Annecy, textes français | Identité |
| Photos du template | Photos Unsplash libres, à remplacer par celles du projet | Droits |
| Maison en A sur une colline, ciel doré | Maison en A en bois sombre, ciel bleu, arbres à gauche | Photo libre à silhouette nette ; le mot-marque recouvre un peu les arbres et un nuage |
| Mot-marque derrière le bâtiment (image détourée) | Deux copies de la photo, celle du dessus en `clip-path` | Fonctionne avec n'importe quelle photo à arêtes droites |
| Héros plein écran | Cadre 1px sur photo floutée | Signature tirée du shot |
| Texte blanc sur voile à 20 % | Voile + dégradé noir jusqu'à 62 % en bas | Contraste garanti |
| Menu en `backdrop-filter: blur(5px)` | Flou de 5px posé sur le héros après le fondu | Fluidité (19 images/s sinon en rendu logiciel) et reflets parasites |
| Vidéo | Grande photo | Pas de vidéo libre équivalente |
| Mot-marque de 280px en mobile | Réduit à 84px au moins | Qu'il reste lisible |
| Surtitres 16px, boutons 50px | Identiques | — |
