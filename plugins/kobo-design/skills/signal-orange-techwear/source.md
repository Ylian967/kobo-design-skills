# Source — Signal Orange Techwear

- **Site de référence** : https://dribbble.com/shots/27776418-CyberRonin-TechWear-website-concept (shot Dribbble « CyberRonin — TechWear website concept »)
- **Famille** : Mode / techwear cyberpunk
- **Analysé le** : 2026-10-01, Chrome
- **[URL choisie par recherche : 3 shots « Cyber Ronin » existent]** : l'URL exacte du shot n'a pas été confirmée par l'utilisateur.

## Ce qui a été vu

- **Palette** : panneaux anthracite (~#1a1a1a / #222), accent orange signal (~#e8601c), blanc.
- **Titres** : police display géométrique très étendue en capitales (type Michroma / Syncopate) ; empilement « RONIN-X » en orange, « // » orange suivi d'une forme orange en pilule, « SHADOW » en orange **contour seul**, « NIGHTFALL » en blanc.
- **Texte** : petite étiquette « New Collection », texte courant ~11px gris, lien souligné « Explore », icônes sociales rondes au contour.
- **Texte vertical** « Techwear 26 » (`writing-mode` vertical) en haut à droite du mannequin.
- **Colonne de droite** : panneau sombre translucide à filet fin avec vignette produit, petite étiquette orange « CR-01 SNEAKER », description et bouton contour orange « WATCH PRODUCT FILM ↗ » ; tableau « Operative Specs » : lignes avec étiquettes orange espacées (VISION, NERVE, REFLEX, ARMOR) et valeurs grises à droite, filets, pied « ● DEPTH ON ».
- **Navigation** : logo « CYBER » orange + « RONIN » blanc, liens au centre avec soulignement orange sur l'actif, « Bag » + compteur rond.
- **Sections** : index orange « 01 / THE COLLECTION —NIGHTFALL », titre display géant orange « EVERY LAYER. », onglets de filtre (rectangle orange plein « FULL ITEMS » + contours), cartes produit avec étiquette « CR-03 / ACCESSORIES », chevron de défilement centré.

## Non mesuré

- Il s'agit d'une **maquette Dribbble**, pas d'un site en ligne : aucune extraction de styles possible.
- **Analyse visuelle des images uniquement** : couleurs, tailles, espacements et rayons sont **estimés**.
- **Polices choisies à l'œil** (Michroma, JetBrains Mono, Inter) : la police d'origine n'a pas été identifiée.
- Les animations ne sont pas visibles sur un shot statique : `references/motion.md` est une proposition cohérente avec le style (ligne de scan, découpe, balayage).

## Écarts assumés

| Élément de la maquette | Dans le skill | Raison |
|---|---|---|
| Texte courant gris ~11px (valeur exacte inconnue) | `--muted` #9a9a9a (6,2:1 sur panneau) | Contraste garanti |
| Texte sur onglet orange plein | `--on-accent` noir (5,5:1) au lieu du blanc (3,4:1) | Contraste en petite taille |
| Jauges et interrupteur purement visuels | `role="switch"`, texte `sr-only` pour les jauges | Accessibilité |
| Nom « CyberRonin », produits « RONIN-X », « CR-01 », photos du mannequin | Marque fictive « Noctunit », références « NX-0x », mannequin et produits en photos Unsplash libres (`data-slot`) | Marque et droits d'auteur |
| Textes anglais | Textes français inventés | Identité, langue |
| Photos du mannequin et des produits | Visuels de la démo : photos Unsplash libres (licence Unsplash) et/ou scène Three.js, à remplacer par les images du projet | Droits d'auteur ; démonstration du rendu avec de vraies images |
