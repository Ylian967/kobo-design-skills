# Source — Tiny Planet Toy

- **Site de référence** : https://messenger.abeto.co/ (fiche Awwwards : https://www.awwwards.com/sites/messenger — Site of the Day, catégories « Animated », « Scrolling », « One page »)
- **Famille** : Expérience web / jeu
- **Analysé le** : 2026-10-01, Chrome, 1536×674

## Observations

- Écran-titre : fond turquoise uni avec poussières claires, petite planète dessinée (bâtiments, arbres, routes) au centre, logo en lettres-blocs crème posées en grille 3×3 sur la planète, bouton « BEGIN » jaune penché sous la planète.
- La page entière est rendue dans un canvas WebGL (le document principal ne contient que 25 éléments, aucune police web, aucun canvas accessible au script) : **aucune valeur n'a pu être mesurée par `extract-design.js`**.
- 2026-10-01 : le clic sur « BEGIN » n'avait pas lancé l'expérience. **2026-10-03 : expérience lancée** (navigateur intégré, clic réel) : écran de chargement, entrée, scène de jeu observés (voir ci-dessous).

## Pages explorées (2026-10-03)

| Écran | Relevé (observé, ≈ — rendu WebGL, aucun texte DOM) |
|---|---|
| Chargement | Fond blanc, enveloppe dessinée au trait, « LOADING » manuscrit. |
| Entrée | Volet turquoise incliné, planète qui grandit, blocs du logo qui tombent, bloc « BEGIN » jaune en 3D qui tourne. |
| Scène de jeu | Troisième personne, rue résidentielle en cel-shading à contours d'encre, sac rouge du personnage, nuages plats, horizon courbe ; aucun HUD au départ. Déplacement au clavier (W) vérifié. |

## Non mesuré

- **Toutes les couleurs sont estimées à l'œil** sur captures (turquoise ≈ #63c5be, crème ≈ #f6f1e4, jaune ≈ #f4c84a).
- Les polices sont des équivalents choisis pour le rendu observé (lettres-blocs, pixel), pas des polices identifiées.
- La scène de jeu est désormais observée ; le **HUD** et les **bulles** de `components.md` restent des propositions (absents au départ de la partie, non vus plus loin).
- Observation faite en largeur 612px (panneau du navigateur intégré), pas en 1440px.

## Écarts assumés

| Élément du site | Dans le skill | Raison |
|---|---|---|
| Monde 3D, logo, personnages | Planète Three.js low-poly générique | Droits d'auteur |
| Rendu 100 % WebGL | Planète en WebGL, interface en HTML, repli image/disque | Accessibilité, performance, mouvement réduit |
| Visuels | Visuels de la démo : photos Unsplash libres (licence Unsplash) et/ou scène Three.js, à remplacer par les images du projet | Droits d'auteur |
