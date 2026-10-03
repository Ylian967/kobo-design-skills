# Source — Glacial Mono 3D

- **Site de référence** : https://www.igloo.inc/ (fiche Awwwards : https://www.awwwards.com/sites/igloo-inc — Site of the Day, 23/07/2024)
- **Famille** : Expérience web 3D
- **Analysé le** : 2026-10-01 (chargement, fiche Awwwards) ; 2026-10-03 (parcours dans un navigateur intégré, 612px) ; **2026-10-03, réécriture complète** : Chrome 1440×900, chargement capturé en 16 images, parcours capturé à 5 positions de défilement, couleurs lues sur les captures.
- **Ce qui plaît** : la scène de glace monochrome, l'interface minuscule aux coins, les crochets, le texte qui se décode, l'assemblage de la scène.

## Ce qui est mesurable

Le site est une page presque vide : un seul script, **aucun élément visible dans le document** (4 éléments, pas de texte), tout est dessiné dans un canvas WebGL, texte compris.

| Mesuré | Valeur |
|---|---|
| Fond du document (style calculé) | `#a0a5b1` |
| Polices déclarées | IBM Plex Mono Regular et Medium |
| Fiche Awwwards | palette `#b6bac5`, `#383e4e` ; technologies : WebGL, défilement infini, transitions |

## Lu sur capture (1440 × 900)

- **Accueil** : ciel `#9398a4`, brume `#b7bbc6`, blocs et neige à l'ombre `#474e5c`, ombres `#383e54`, lueur des joints `#e5f1f6`, texte et pavés `#ffffff`, cartouche sous le logo `#393a3c`.
- **Projet** : fond `#717885` à `#8d929f`, glace `#657081`, étiquettes blanches.
- **Positions** : logo en haut à gauche (≈ 50px du bord), cartouche dessous ; bloc de texte aligné à droite en haut à droite (≈ 150px de large) ; ligne de texte en bas à gauche ; constellation de 5 points numérotés sur l'objet ; étiquettes pleines reliées par des traits coudés.

## Observé

| Écran | Relevé |
|---|---|
| Chargement | fond uni, courte chaîne de signes au centre. |
| Assemblage | l'objet apparaît en fil de fer lumineux, un réseau de traits s'étend autour, la matière se remplit, puis le relief enneigé se construit par pavés depuis le centre. |
| Accueil | dôme de blocs de glace dont les blocs s'écartent, cœur lumineux, points numérotés 01 à 05 reliés par des traits, texte d'interface affiché d'abord en pavés blancs. |
| Recul | l'image se casse en pavés avec des franges arc-en-ciel pendant le déplacement. |
| Projet | cube de glace translucide contenant un signe, étiquettes pleines, traits de rappel, grand texte flou en fond, grille de points. |
| Symbole, fin (passe précédente) | anneaux qui s'assemblent, socle lumineux, sculpture en particules, carrousel de liens à crochets. |

## Non mesuré / proposé

- **Toutes les durées et courbes** : rien n'est lisible dans le canvas, et le site tournait à environ une image toutes les 8 secondes dans le navigateur de test (sans carte graphique) ; son rythme réel n'a pas pu être chronométré.
- Tailles de texte : approchées sur capture (10 à 13px).
- Le mobile du site n'a pas été observé ; l'adaptation est proposée.
- Les scènes « symbole » et « fin » n'ont pas été revues à 1440px dans cette passe (deux dernières captures non exploitées) : elles reposent sur la passe précédente.
- Images par seconde de `motion.md` : mesurées sur la démo dans un Chrome sans carte graphique.

## Écarts assumés

| Élément du site | Dans le skill | Raison |
|---|---|---|
| Logo, mascotte, dôme de glace, modèles et textes | Studio fictif « Polar Labs », amas de cristaux, bloc et socle génériques | Marque et droits d'auteur |
| Interface dessinée dans le canvas | Interface en HTML par-dessus | Accessibilité, netteté, coût |
| Matières réalistes (réfraction, textures, post-traitement) | Matières simples à facettes | Fluidité : 5 → 105 images/s en rendu logiciel |
| Transition traitée dans l'image entière | 14 pavés CSS avec franges | Même lecture, coût négligeable |
| Texte blanc sur brouillard clair (≈ 2,5:1) | Texte sombre `--steel` sur clair | Lisibilité |
| Relief qui se construit par pavés | Sol qui s'étend depuis le centre | Simplicité |
| Logotype dessiné | Unbounded 700 | Police libre approchante |
