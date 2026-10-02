# Glacial Mono 3D — mises en page

## Scène plein écran

- `canvas` fixe en fond (`position: fixed; inset: 0`), interface fixe par-dessus (`pointer-events` seulement sur les éléments cliquables).
- Le document a une hauteur artificielle (ex. 600vh) : le défilement pilote la caméra, il n'y a pas de sections HTML visibles.
- Marges de l'interface : `--edge` (28px) sur desktop, 16px sur mobile.

## Chapitres (au défilement)

1. **Arrivée** : paysage de brouillard, objet principal (bâtiment de glace aux joints lumineux) au centre. Manifeste en haut à droite.
2. **Nuit** : la caméra plonge, le fond passe à `--night`, un objet sombre (rocher, sculpture) flotte ; le panneau de contenu peut s'ouvrir.
3. **Socle** : carrousel d'objets 3D (logos en particules) sur un socle métallique, navigation précédente / suivante en bas.
4. **Sortie** : retour au brouillard, liens et crédits en mono.

## Mobile

- Interface réduite à : logo, rubrique (1 ligne), son, flèches du carrousel.
- Paragraphes du manifeste dans un tiroir qui s'ouvre via `⌜ Lire ⌟`.
- Scène 3D allégée (moins de particules, pas d'ombres) ou vidéo en boucle.
