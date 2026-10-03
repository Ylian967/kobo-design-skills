# Source — Chrome Atelier

- **Référence** : https://dribbble.com/shots/27491195-Website-Design-for-Avant-Garde-Jewelry-Product (Shakuro)
- **Site en ligne de la marque** : https://www.eargrillz.com/ (le concept du shot mis en production)
- **Famille** : Luxe / bijou produit 3D
- **Analysé le** : 2026-10-01 (images) ; **2026-10-03, réécriture complète** : les 11 images du shot ouvertes à pleine résolution, la vidéo (1600×1200, 15,7s) vue toutes les 0,5s, le site en ligne parcouru à 1440×900 et à 390px (styles calculés, feuille de style Webflow, scripts de la page), couleurs des métaux lues sur les captures.
- **Ce qui plaît** : la planche blanche aux filets, le cercle autour de la pièce, la pièce qui change d'or, le héros de nuit, le chargement au compas.

## Ce que contient la référence

| Source | Contenu |
|---|---|
| 11 images du shot | héros nuit (ordinateur et téléphone), planche « variations » en or jaune, galerie, questions, presse sur téléphone, variations sur téléphone (or rose, or blanc, avec rangée de trois libellés), 3 visuels d'ambiance |
| Vidéo du shot | planche qui tourne, presse au survol, fenêtre de liste d'attente et confirmation, galerie, **chargement au compas avec pourcentage**, héros, cellules de la barre qui montent en cartes, pièce qui passe de l'or rose à l'or jaune |
| Site en ligne | les mêmes sections, avec des textes mis à jour ; le chargement au compas ne s'est pas affiché pendant la visite (son script est présent dans la page) |

## Mesures (site en ligne, 1440 × 900)

- **Racine** : `html { font-size: 0.9vw }` → 12,97px à 1440 ; 16,7px à 390. Tout est en `rem`.
- **Polices** : Suisse Int'l 400 (et 300), Suisse Mono 400.
- **Tailles** : texte 0,75rem / 1.385, approche 0.025rem, `#3f464a` ; titre du héros 2rem / 1.1, capitales, approche 0.025rem ; titres de section 1,5rem / 1, capitales, approche −0.015rem, `#10191e` ; nav 0,625rem, approche 0.05rem ; boutons 0,75rem, approche 0.06875rem, marges 1rem / 1,25rem, contour 0,8px, rayon plein ; étiquettes mono 0,75rem, approche −0.08125rem ; barre : libellé 0,625rem `#b3b3b3`, valeur 1,15rem blanche.
- **Variables du site** : `--dark #10191e`, `--body #3f464a`, `--gray #b3b3b3`, `--gray-v2 #e0e0e0`, `--gray-v3 #eaeaea`, `#f3f3f3`, `--dark-bg #000201`, `--dark-blue #293339`, conteneur 80rem.
- **Barre** : 58px, `rgba(2,2,2,.2)`, contour `rgba(255,255,255,.16)` 0,8px, `backdrop-filter: blur(4px)`. Pilule fantôme : `rgba(255,255,255,.04)`.
- **Positions** : titre du héros à 32px du bord, à mi-hauteur ; sections claires à 67px ; cartes 377px, 9:16 ; cercle de l'atelier ≈ 678px ; cellules de presse ≈ 235 × 365px ; sections : héros 900, cartes puis atelier 2 700 de défilement, presse 912, galerie 1 556, questions 900, pied 267.
- **Couleurs lues sur capture** : photo de nuit `#1c2c39` à `#233340` ; or jaune `#523d0d` / `#c3a23e` / `#eddfa4` ; or blanc `#5b5b5b` / `#bbbbbb` / `#e6e6e6` ; or rose `#5b2217` / `#b77f6b` / `#edd1c2` (ombre / ton moyen / reflet).
- **Transitions CSS** : boutons `background-color .3s` ; barre de navigation `all .2s` ; nav du héros `transform .45s` ; logo et liens `300ms ease` ; points `opacity .5s` ; `floatY 3s ease-in-out infinite` (−15px) ; anneau vidéo `stroke-dashoffset .1s linear`.
- **Scripts** : accordéon GSAP `duration 0.3, ease "power1.inOut"`, icône à −180° ; chargement : 3e groupe d'arcs à 3 000ms pendant 3 000ms, cercle central `opacity 0.5s` à 15 %, glissement `transform 1s ease` vers 50,7 % de la hauteur, puis points et tracés ; compteurs CountUp déclenchés à 80 % de l'écran ; carrousel Swiper pour la presse ; `scroll-behavior: smooth`.
- **Bibliothèques** : jQuery, GSAP + ScrollTrigger, Swiper, CountUp, interactions Webflow, une séquence d'images pour la pièce ; aucun WebGL.

## Observé (sans valeur lisible)

Ces mouvements sont pilotés par les interactions Webflow : leur déroulé vient de la vidéo et de captures prises à plusieurs positions de défilement.
- Les cellules de la barre montent en trois cartes photo à des vitesses différentes.
- Les filets de l'atelier partent du centre, puis le cercle, la pièce et les légendes apparaissent.
- La pièce change de métal au défilement (jaune → blanc → rose) et les légendes tournent autour du cercle.
- Presse : la cellule survolée affiche sa photo et son article.
- Galerie : colonnes décalées qui glissent à des vitesses différentes ; grande courbe fine derrière le texte.

## Non mesuré / proposé

- Durées de la roue des légendes, des entrées du héros, des fondus de la presse : proposées.
- Le chargement de la démo est raccourci (tracé 1,5s au lieu de 3s + 3s).
- La forme de la pièce de la démo est procédurale et inventée : trois joncs de métal entrelacés et terminés par des perles, sans rapport avec la pièce de la marque.
- Les images par seconde de `motion.md` sont mesurées sur la démo dans un Chrome sans carte graphique : 136 à 142 hors 3D, 45 à 60 dans la scène 3D.
- Fenêtre de liste d'attente du site : vue dans la vidéo seulement ; la démo en fait une section.

## Écarts assumés

| Élément de la référence | Dans le skill | Raison |
|---|---|---|
| Nom, logo, textes, articles et médias réels | Marque fictive « Ossel », logo à traits, médias et textes inventés | Identité et droits |
| Pièce et photos de la marque | Bijou 3D procédural (trois joncs et perles), photos Unsplash | Droits d'auteur |
| Séquence d'images pré-rendues | Scène Three.js en temps réel | Pas de rendus disponibles ; la vidéo reste possible (`assets.md`) |
| Texte de 8 à 10px (racine 0,9vw) | 13px pour le texte, 11px pour les libellés | Lisibilité |
| Pilules de 37px, barre de nav de 39px | 44px | Cible tactile |
| Suisse Int'l, Suisse Mono (payantes) | Inter, IBM Plex Mono | Licence |
| Barre du héros floutée (4px) | Aplat translucide | Fluidité : la photo glisse dessous |
| Libellés de métal non choisis en gris très clair | Gardés (`--ghost`), mais chaque libellé est un bouton de 44px et l'actif est en `--ink` | Fidélité ; l'information utile reste lisible |
| Prix en dollars | Euros, unités françaises | Contenu localisé |
| Vidéos dans la galerie | Photos | Poids, droits |
