# Glacial Mono 3D — mises en page

## Scène plein écran

- `canvas` fixe en fond (`position: fixed; inset: 0`), interface fixe par-dessus (`pointer-events` seulement sur les éléments cliquables).
- Le document a une hauteur artificielle (ex. 600vh) : le défilement pilote la caméra, il n'y a pas de sections HTML visibles.
- Marges de l'interface : `--edge` (28px) sur desktop, 16px sur mobile.

## Chapitres (au défilement)

1. **Arrivée** : paysage de brouillard, objet principal en 3D (éclats de glace ou bâtiment de glace, voir `assets.md`) au centre. Manifeste en haut à droite.
2. **Nuit** : la caméra plonge, le fond passe à `--night`, un objet sombre (rocher, sculpture) flotte ; le panneau de contenu peut s'ouvrir.
3. **Socle** : carrousel d'objets 3D (logos en particules) sur un socle métallique, navigation précédente / suivante en bas.
4. **Sortie** : retour au brouillard, liens et crédits en mono.

## Mobile

- Interface réduite à : logo, rubrique (1 ligne), son, flèches du carrousel.
- Paragraphes du manifeste dans un tiroir qui s'ouvre via `⌜ Lire ⌟`.
- Scène 3D allégée (moins de particules, pas d'ombres) ou vidéo en boucle.

---

## Parcours réel (observé, 2026-10-03)

1. **Accueil** : igloo de glace aux joints lumineux dans un paysage enneigé gris, interface aux 4 coins.
2. **Recul de caméra** au défilement : l'igloo s'éloigne, aberration chromatique (franges arc-en-ciel) pendant le mouvement, l'interface des coins s'efface.
3. **Portfolio** : brouillard gris uni ; une suite de **blocs de glace** qui passent au premier plan un par un, chacun avec son étiquette ; on traverse le brouillard entre deux blocs.
4. **Symbole** : anneaux qui s'assemblent puis flou radial.
5. **Fin** : socle lumineux, sculpture de particules, carrousel de liens à crochets.

Pas de sections HTML : un seul plan 3D piloté par le défilement, l'interface reste fixe aux coins. Sur écran étroit, mêmes positions de coin, textes ~11px.
