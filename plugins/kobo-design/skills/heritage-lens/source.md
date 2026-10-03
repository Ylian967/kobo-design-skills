# Source — Heritage Lens

- **Référence** : https://persepolis.getty.edu/ (« Persepolis Reimagined », Getty ; l'ancienne adresse http://www.getty.edu/persepolis y redirige). Fiche Awwwards : https://www.awwwards.com/sites/persepolis-reimagined
- **Famille** : Culture / patrimoine immersif
- **Analysé le** : 2026-10-01 (première version) ; **2026-10-03, réécriture complète** : site parcouru dans Chrome à 1440×900, en français, du chargement à la fin du premier chapitre ; ≈ 80 captures ; styles calculés des textes ; feuille de style du site lue en entier.
- **Ce qui plaît** : la lentille avant / après, les ornements dorés très fins, le mot géant sur le paysage, le rythme lent.

## Ce que contient la référence

Un site **animé**, entièrement en WebGL (un seul canvas plein écran) avec les textes et les commandes en HTML par-dessus. Les animations sont donc **relevées**, pas inventées, sauf mention contraire. Le défilement de la page est bloqué : la molette fait avancer une caméra dans une reconstitution 3D.

## Écrans vus

| Écran | Relevé |
|---|---|
| Chargement | Fond #252525, anneau de dentelle doré qui tourne, pourcentage au centre |
| Prologue | Paysage de nuit sous brume bleue (un arbre, une plaine) ; 3 phrases centrées l'une après l'autre ; la brume se lève, lumière dorée ; « Getty présente » |
| Titre | Mot géant, sous-titre plus petit décalé à droite, bouton rond « ENTREZ » à double anneau, aide « Cliquez sur Entrée pour continuer » |
| Survol | 2 phrases pendant que la caméra descend vers la cité |
| Chapitre 1 | Médaillon orné numéroté + titre géant sur 2 lignes (lettres séparées) ; puces à droite ; bouton plein or en haut à droite ; « À propos de ce projet → » en bas à gauche |
| Récit | Paragraphe serif blanc centré, halo sombre derrière |
| Point d'intérêt | Titre or à droite, récit, pilule vers une page éditoriale ; à gauche la lentille (dentelle + photo de l'état actuel) et « Cliquez pour révéler la vue actuelle » ; bulle d'aide claire sur la puce |
| Vue actuelle | Photo plein écran des ruines, bouton fermer en haut à droite |
| Page éditoriale | Fond #252525, défilement horizontal : grande image, titre or, fil d'Ariane, paragraphes, œuvres avec légendes, grande citation grise |

## Mesuré (1440×900)

| Élément | Valeur |
|---|---|
| Polices | Maghfirea 400 (affiche), Sabon Next (récit), Graphik 400 (interface) |
| Titre géant | `min(20vh, max(75px, 12.5px + 9.766vw))` = 153px, interligne 0.9 |
| Titre de lieu | 77.5px / 69.75px, #f6cea0, bloc de 426px dont le bord gauche est à 795px |
| Phrases | 48.75px / 48.75px, blanc, bloc de 1008px |
| Récit | 19.75px / 23.7px, blanc, colonne de 373px |
| Interface | 14.25px / 19px (`13px + 2 × (100vw − 640px) / 1280`) |
| « ENTREZ » | 27.75px capitales ; bouton de 4.4em = 122px |
| Numéro de chapitre | 26.25px dans un médaillon de 96px |
| Pourcentage | 37px, #f6cea0 |
| Couleurs | #252525 (fond), #f6cea0 (53 emplois), #fff, #000, #79644b (texte des bulles), #eae8e5 (bulles), #314757, #c4c4c4, #aeaeae ; or à 50 % ; blanc à 50 % (légendes) et 20 % (filets) |
| Boutons ronds | 51px (2em × 25.5px), à 31px des bords ; pilule 212 × 51px |
| Puces | 20px, pas de 39px, à 31px du bord droit ; anneau actif de 24px |
| Lentille | centre vers 568px (39 % de la largeur), ≈ 210px ornement compris (lu sur capture) |
| Aide de défilement | à `max(80px, 60px + 3.125vw)` du bas |
| Courbes | `cubic-bezier(.455,.03,.515,.955)` (×15), `(.2,0,0,1)` (×10), `(.25,.46,.45,.94)` (×9), `(.55,.085,.68,.53)` (×6) |
| Durées | couleurs 0.3s et 0.6s ; transformations 0.25, 0.3, 0.4s ; remplissage des boutons 0.65s (0.45s pour l'entrée) ; menu 0.8s |
| Rotations | ornements 60s, couche du milieu 30s à l'envers, points d'intérêt et puce 20s, 75s et 10s ailleurs ; halo `pulse` 1.5s linéaire, délai 0.5s |
| Points de rupture | 920px, 640px, 1920px |

## Proposé par le skill (non mesuré)

- **Des photos à la place de la 3D** : scènes collantes, deux photos par scène qui zooment et se fondent, plages de défilement des textes (`data-on`).
- La lentille qui révèle « une autre vue » (nuit, détail, contre-plongée) et non l'état actuel ; son ouverture en fondu.
- Les distances des entrées de texte (18px), le décalage entre lettres (28ms), le flottement de l'aide, le survol de la lentille, l'entrée de la page éditoriale.
- Le tracé exact de la dentelle (cercles qui se chevauchent) : refait à l'œil d'après les captures.
- Toute la version mobile, la page de fin, la liste déroulante du plan.
- Les voiles sombres (`--shade`, `--veil-*`, `--night-veil`).
- Les images par seconde de `motion.md`, mesurées dans un Chrome sans carte graphique.

## Non vu

- Les chapitres 2 et suivants, la **carte** (le bouton de plan n'a pas réagi au clic pendant l'exploration), l'index des œuvres, « À propos », le panneau d'accessibilité et le sélecteur de langue (présents dans la feuille de style).
- La **version mobile** du site.
- Le son.

## Écarts assumés

| Référence | Dans le skill | Raison |
|---|---|---|
| Getty, Persépolis, textes et images du site | Fondation fictive « Séléné », Pétra, textes français inventés, photos Unsplash | Identité et droits |
| Maghfirea, Sabon Next, Graphik (payantes) | Viaoda Libre, EB Garamond, Inter | Polices libres ; Viaoda Libre choisie parmi 15 candidates pour ses formes fines et son « y » bouclé |
| Reconstitution 3D et caméra | Photos plein écran, zoom et fondu | Utilisable sans modèle 3D ; 3D décrite en option dans `assets.md` |
| Défilement bloqué et piloté | Défilement natif, scènes collantes | Accessibilité, clavier, ancres |
| Lentille = état actuel du monument | Lentille = autre vue du même lieu | Pas de reconstitution disponible en photos libres |
| Texte blanc sur halo léger | Voiles plus marqués + ombre de texte | Contraste garanti sur des photos claires |
| Plusieurs points d'intérêt par chapitre | Un seul dans la démo | Longueur de la démo |
| Carte du lieu | Liste des chapitres | Carte non vue |
