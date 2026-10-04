# Couches de signature

Le composant de base est neutre : il ne lit que les rôles `--k-*` et reste sobre sous n'importe quel skill. La **couche de signature** d'un skill s'ajoute par-dessus et retraduit, sur les dix composants, ce qui fait son identité : formes, casse et typo des libellés, traitement des cartes et des photos, survols, ornements.

Une couche par skill : `signatures/<id-du-skill>.css`, chargée en dernier. Rien à changer dans le balisage : la couche s'applique seule aux classes `k-*`.

| Couche | Ce qu'elle traduit | Ce qu'elle laisse de côté |
|---|---|---|
| `lore-frame-editorial.css` | bouton mono à coin coupé et survol en négatif ; micro-labels au carré plein ; nav et onglets mono dont l'actif porte le carré ; titres en capitales serrées ; image de carte à coin coupé sur lavande ; menu en panneau noir, page active sur citron | le cadre fixe et son rail, le décodage des textes, l'onglet des planches |
| `pixel-lime-portfolio.css` | bouton mono souligné à flèche, inversé par pas au survol ; étiquette noire ; carte sans image en fiche de carnet perforée ; onglet actif surligné ; champs gris sans contour ; modale en feuille de carnet | la mosaïque de pixels, les ovales au feutre, les autocollants, le grain |
| `serif-bistro-green.css` | barre flottante à liens en pilules ; bouton en serif d'affiche à flèche ; onglets en pastilles de filtre ; fiche de plat (photo en boîte crème, prix en serif) ; modale en feuille | le titre à arche, la reliure à spirale, les assiettes rondes, les dessins au trait |
| `glacial-mono-3d.css` | boutons sans fond à quatre crochets de coin ; étiquette pleine blanche ; rubriques « ////// » ; squelette en pavés blancs ; modale et menu en panneau de nuit ; focus en pointillé | la scène 3D, l'interface aux quatre coins, le décodage, le logotype à halo |
| `sticker-brutal-jp.css` | effet autocollant (contour d'encre, ombre dure) sur boutons, cartes, champs, onglets, modale ; nav en pilules ; étiquettes en pilules colorées ; survol qui décolle, appui qui enfonce | le cadre de page et ses autocollants, le portrait en écusson, le katakana vertical |
| `noir-inferno-chapters.css` | bouton à contour sans fond, inversé au survol ; liens à filet qui se trace ; pas de carte ; onglets en numéros de scène serif ; champ réduit à une ligne ; état vide centré dans une cible en tirets ; progression en ligne pointillée ; modale claire | le cercle à tirer, la poussière, le grain et le vignettage |
| `acid-scan-security.css` | crochets d'angle sur les panneaux et, au survol, sur les cartes ; aplat qui glisse dans le bouton ; nav sans fond à filet jaune ; champ terminal à invite `>_` ; ligne de scan sur l'image d'une carte survolée | la photo en 4 couches, le réticule, les trames, la jauge segmentée |

Chaque fichier cite en tête les passages du skill dont il part (`SKILL.md`, `references/components.md`, `references/motion.md`). **Rien n'y est inventé** : un ornement absent du skill n'entre pas dans sa couche.

## Intensité

`data-k-intensity` se pose sur `<html>` ou sur n'importe quel parent.

| Valeur | Ce qui s'applique |
|---|---|
| `full` (ou absent) | toute la couche : formes et mouvements de signature |
| `reduced` | les formes ; plus aucun mouvement de signature |
| `off` | rien : le composant de base, avec les couleurs, la typo et les rayons du skill |

La couche est écrite en deux blocs, grâce à l'imbrication CSS :

```css
/* formes : partout sauf sous « off » */
:not([data-k-intensity="off"] *) {
  &.k-btn { … }
}
/* mouvements : ni sous « off », ni sous « reduced » */
:not([data-k-intensity="off"] *, [data-k-intensity="reduced"] *) {
  &.k-btn:hover { … }
}
```

Vérifié dans le navigateur : en `off`, les sept couches rendent exactement le composant de base.

Limite : on resserre l'intensité en descendant dans la page. Un bloc `full` placé dans un parent `off` reste éteint.

## Règles d'écriture

1. **Seuls les fichiers de ce dossier lisent des `--k-sig-*`.** Toujours aucune valeur en dur : une dimension vient d'un rôle, d'un `--k-sig-*` ou d'un calcul sur eux.
2. **Ne pas casser les états.** La couche a la même force qu'une règle d'état du composant et passe après elle : redonner à la main le survol, et exclure `:disabled` et `[aria-disabled="true"]` de ce qui touche au fond ou au contour.
3. **Garder le contour de focus entier** : un `clip-path` posé sur l'élément le couperait. Rogner un calque (`::before`), jamais le bouton.
4. **`::after` est pris** sur le bouton (zone cliquable) : les ornements vont dans `::before`.
5. **Accent pâle et couleur seule** : les règles du contrat restent vraies. Un onglet actif surligné garde sa graisse ou son filet.
6. **`prefers-reduced-motion`** : une requête en fin de fichier coupe transitions et déplacements.
7. Un mouvement que le skill mesure lui-même (zoom de photo de serif-bistro) est admis, en `full` seulement, avec un commentaire qui cite la source.

## Variante à la demande

`acid-scan-security.css` garde deux classes à poser soi-même : `k-btn--crochets` et `k-card--crochets` (crochets visibles au repos, comme la carte au cadenas du skill).

## Écrire la couche d'un autre skill

1. Relire son `SKILL.md`, `references/components.md` et `references/motion.md`.
2. Lister ce qui se traduit sur les dix composants, et ce qui n'en relève pas (mise en page, image, script) : le noter en tête du fichier.
3. Renseigner dans sa fiche `--k-btn-case`, `--k-btn-tracking`, `--k-label-case` et `--k-img-filter` (lignes `[main]`).
4. Écrire les deux blocs, ajouter l'identifiant à `LAYERS` dans `gallery.html`.
5. `python3 tools/check_components.py`, puis comparer la galerie à `examples/demo.html` du skill : « si je cache le nom, est-ce que je reconnais la démo ? »
