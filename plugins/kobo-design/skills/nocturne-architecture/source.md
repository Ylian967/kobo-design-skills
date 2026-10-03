# Source — Nocturne Architecture

- **Site de référence** : https://dribbble.com/shots/27769939-Architecture-Studio-Website-Design-Baraka (shot Dribbble « Architecture Studio Website Design — Baraka »)
- **Famille** : Architecture / immobilier de luxe
- **Analysé le** : 2026-10-01, Chrome ; 2026-10-03, vérification de toutes les pièces jointes du shot

## Ce qui a été vu

- **Ambiance générale** : site sombre (~#111 / #141414), un seul accent rouge (~#e3191f) sur une pilule « Let's Connect », une carte de propriété et une ligne de progression.
- **Héros** : photo plein cadre d'une ville la nuit (dominante bleue, pose longue avec traînées de phares) ; mot-marque géant en minuscules, grotesque serrée (type Helvetica / Inter Display, ~-0.04em), blanc, coupé par le bas du héros et touchant les deux bords.
- **Haut de page** : liens minuscules blancs à gauche (Studio, Projects, Services, Blog) ; à droite, date, heure et température en capitales séparées par des barres obliques inverses (« MON 2 DEC \ 09:12 \ 21°C ») et pilule rouge.
- **En haut à gauche** : bouton rond rouge avec icône lecture + « PLAY SHOWREELS », court paragraphe dessous.
- **À propos** : petit libellé précédé d'un point (« • ABOUT US »), « ©2025 » à gauche, grande phrase en deux tons (blanc puis gris ~#777). Grille de chiffres 2×2 : grands nombres fins (« 15+ » avec « + » gris), petit libellé, filets de séparation.
- **Propriétés** : titre « Exclusive properties by … », cartes horizontales ~4:5 ; la première est un aplat rouge avec une pilule blanche « View Work » et trois caractéristiques, les autres sont des photos avec le nom en bas à gauche ; bouton rond « précédent » et ligne de progression rouge.
- **Processus** : titre « Turning your real-estate dreams true », lignes numérotées 01 / 02 / 03 séparées par des filets ; la ligne ouverte montre une photo, une liste « Key Features » à puces et une pilule rouge.

## Pages explorées (2026-10-03)

| Source | Relevé |
|---|---|
| Shot Dribbble | Une seule image (2400×1800). Relue : rien de plus. |
| Autres shots du même projet / site en ligne | Aucun trouvé (recherche Dribbble par nom de projet, description du shot sans lien). |

## Non mesuré

- Il s'agit d'un **mockup Dribbble** : analyse visuelle des images uniquement, aucun site en ligne, aucun code inspecté.
- Toutes les valeurs (couleurs, tailles, espacements, rayons) sont **estimées à l'œil** et arrondies sur une échelle de 4px.
- La police n'est pas identifiée : **Inter Tight** et **Inter** sont choisies à l'œil.
- Aucune animation n'est visible sur des images fixes : le mouvement (`motion.md`) est une proposition cohérente avec le ton.
- Le pied de page et le formulaire de contact ne sont pas visibles dans les captures : ils sont extrapolés.

## Écarts assumés

| Élément du shot | Dans le skill | Raison |
|---|---|---|
| Nom du studio, mot-marque, textes en anglais | Studio fictif « orsel », projets et textes inventés en français | Marque et droits d'auteur |
| Photos de ville, de villas et d'intérieurs | Autres photos nocturnes libres (`data-slot`), étalonnées selon `references/assets.md` | Droits d'auteur |
| Rouge #e3191f en petit texte sur #111 (4:1) | Rouge réservé aux aplats et au grand texte (`:large`) ; `--accent-text` #ff3b3f pour le petit texte (5,4:1) | Contraste ≥ 4,5:1 |
| Gris de continuation ~#777 (4,2:1) | Gardé pour le grand texte uniquement (paire `:large`) ; petit texte gris en `--muted` #8a8a8a (5,5:1) | Contraste |
| Liens de navigation minuscules sans zone de clic | Zone de 44px de haut, soulignement animé au survol | Cibles tactiles |
| Date / heure / température figées | Horloge réelle en français ; température fictive | Contenu localisé |
| Composition ordinateur uniquement | Version mobile (menu repliable, mot-marque à 44vw, carrousel à 78 %) | Adaptation |
| Visuels de la démo | Photos Unsplash libres (licence Unsplash), à remplacer par les images du projet | Démo sans images propriétaires |
