# Source — Alpine Glass Expedition

- **Site de référence** : https://dribbble.com/shots/27767056-WayWild-Adventure-Travel-Website (Subash Chandra)
- **Famille** : Voyage / aventure
- **Analysé le** : 2026-10-01, Chrome ; 2026-10-03, vérification de toutes les pièces jointes du shot

## Ce qui a été vu

- **Héros** : photo de montagne plein cadre, bleus et blancs froids désaturés (de la brume ~#e6edf3 au bleu profond ~#1d3550), vignette plus sombre en bas.
- **Titre** : serif contrastée, transitionnelle, légèrement condensée (type Gloock / Instrument Serif), en capitales blanches, ~70px, sur deux lignes (« EXPLORE / WITHOUT LIMITS »), la seconde plus large ; sous le titre, un petit texte blanc sur 3 lignes.
- **Navigation** : icône de logo + nom en serif à gauche ; liens minuscules en capitales espacées centrés (ADVENTURES, WILDLIFE, EXPERIENCES) ; pilule blanche « DISCOVER TRIPS » au texte sombre à droite.
- **Bas gauche** : bouton lecture rond et sombre + texte en petites capitales sur 3 lignes (« YOUR JOURNEY, THOUGHTFULLY PLANNED »).
- **Bas droite** : « 4.8/5 » avec étoile jaune + « AVERAGE RATING ».
- **Bouton rond en verre** (~110px) : dégradé bleu dépoli, bordure claire 1px, flèche ↗ et « EXPLORE ADVENTURES ».
- **Puces** en contour blanc 1px : « MOUNTAIN TREKS », « WILD CAMPING ».

## Pages explorées (2026-10-03)

| Source | Relevé |
|---|---|
| Shot Dribbble | Une seule image (3200×2400, héros). Relue : note « 4.8/5 » avec étoile ambre, puces contour « Mountain treks / Wild camping », bulle ronde en verre « Explore adventures ↗ » — déjà couverts. |
| Autres shots du même projet / site en ligne | Aucun trouvé (recherche Dribbble par nom de projet, description du shot sans lien). |

## Non mesuré

- Il s'agit d'un **mockup Dribbble** : analyse visuelle des images uniquement, aucun site en ligne, aucun code inspecté.
- Toutes les valeurs (couleurs, tailles, espacements, rayons, flou du verre) sont **estimées à l'œil**.
- Les polices ne sont pas identifiées : Instrument Serif et Inter sont **choisies à l'œil**.
- Seul le héros figure sur les captures : la grille de séjours, la section méthode, le témoignage, l'inscription et le pied de page prolongent le langage du héros et sont proposés par le skill.
- Aucune animation n'est visible sur des images fixes : le mouvement (`motion.md`) est une proposition.

## Écarts assumés

| Élément du shot | Dans le skill | Raison |
|---|---|---|
| Nom de marque, logo, textes | Agence fictive « Hautvent », logo montagne générique dans un cercle, textes inventés en français | Marque et droits d'auteur |
| Photo de montagne | Autre photo de sommets (Unsplash) refroidie, `data-slot="mountain-photo"` ; photos de cartes `data-slot="trip-photo"` | Droits d'auteur ; à remplacer par vos photos traitées en bleus froids |
| Visuels de la démo | Photos Unsplash libres (licence Unsplash), à remplacer par les images du projet | Démo |
| Texte blanc posé sur zones claires de la photo | Massif décalé sous le texte, ciel assombri en haut, ombre portée douce sur le texte ; paire vérifiée sur l'équivalent opaque `--slate` (7,4:1) | Lisibilité |
| Bouton de verre translucide | Contraste vérifié sur l'équivalent opaque `--glass-solid` (5,8:1) | Contraste vérifiable |
| Puces de 36px de haut | Zone tactile étendue à 44px par un pseudo-élément | Accessibilité |
| Texte blanc sur `--steel` | Réservé au grand texte (3,6:1, `:large`) | Contraste |
