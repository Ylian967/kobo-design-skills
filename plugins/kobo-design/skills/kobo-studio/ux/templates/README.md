# Gabarits de signature

Un gabarit remplit un emplacement d'une structure de page (`../README.md`) avec la mise en page qui fait reconnaître un skill. Il ne touche pas à la structure : ni l'ordre des sections, ni les ancres, ni le niveau des titres, ni le parcours au clavier.

Chaque **famille** est construite une fois (`<famille>/<famille>.css` et `.js`), puis **habillée** par skill (`<famille>/<skill>.css` et `.js`). La famille porte la mécanique et ne lit que des rôles `--k-*` ; l'habillage règle des variables locales et cite, en tête de fichier, ce qu'il a lu dans le skill et ce qu'il n'a pas repris.

## Familles écrites

| Famille | Emplacement | Ce qu'elle fait | Habillage |
|---|---|---|---|
| `cadre/` | `frame` | Cadre fixe autour de l'écran : filet, rail et barre facultatifs, progression | lore-frame-editorial, retro-mission-poster, sticker-brutal-jp |
| `image/` | `media` | Forme et traitement d'une image de contenu ; parallaxe dans la forme | lore-frame-editorial (planches en forme de dossier) |
| `hero-photo/` | `hero` | Photo du héros en plein cadre, texte et action posés dessus, sur une plaque de lisibilité ; couches colorées cuites en canvas | 20 habillages : acid-scan, lore-frame, hyper-lime, nocturne, alpine-glass, pocket-device, glass-frame, mint-street, zigzag, serif-bistro, pixel-lime, signal-orange, sticker-brutal, retro-mission, showroom, cosmic, anime-x-slash, heritage-lens, hold-to-play, chrome-atelier |
| `scene/` | `backdrop` | Scène 3D fixe derrière la page, chargée en différé, photo de repli ; ou une photo seule | glacial-mono-3d (scène de glace), cosmic-voyage (ciel étoilé, sans 3D) |
| `objet/` | `hero` | Objet 3D à la place d'honneur du héros, qu'on tourne en le tirant ou avec deux boutons ; repli sur la photo | tiny-planet-toy (la planète) |
| `chapitre-ecran/` | `chapter` | Chapitre en scène de la hauteur de l'écran, cercle à tirer vers le suivant | noir-inferno-chapters |
| `formes-inclinees/` | `chapter` | Bloc numéroté, panneau à image découpée et bande, penchés au même angle | hyper-lime-street |
| `titre-geant/` | `title` | Le surtitre repris en très grand, d'un bord à l'autre, coupé par le bas | nocturne-architecture |

## Intensité

Lue sur `<html>` (`data-k-intensity`) :

| Intensité | Ce que fait le moteur |
|---|---|
| `full` | Le gabarit complet : formes et mouvements |
| `reduced` | Les mêmes formes, dans leur état final, sans mouvement (aucune tâche dans la boucle d'animation) |
| `off` | Rien : chaque emplacement rend son contenu neutre |

`prefers-reduced-motion: reduce` donne l'état final, comme `reduced`. `data-k-templates="neutral"` sur `<html>` retire les gabarits sans changer l'intensité (comparaison dans `../structures.html`).

## Écrire un gabarit

```js
// <famille>/<skill>.js
var g = Kobo.templates.families.chapitreEcran({ next: 'Chapitre suivant' });
Kobo.templates.register({ skill: 'noir-inferno-chapters', family: 'chapitre-ecran', slot: 'chapter', render: g.render, mount: g.mount });
```

- `render(parts, el, rang, ctx)` reçoit des copies des parts du contenu neutre et rend le nouveau contenu, ou `null` pour laisser le contenu neutre (un héros sans image ne reçoit pas le gabarit « héros photo »).
- `mount(el, ctx)` branche le mouvement et rend une fonction de nettoyage.
- `ctx.still` vaut `true` quand aucun mouvement ne doit jouer ; `ctx.color('--k-bg')` rend la couleur d'un rôle, pour un canvas ou WebGL.

## Charger

Dans une page livrée, en dur, après `ux/structures/page.js` :

```html
<html data-k-skill="noir-inferno-chapters" data-k-intensity="full">
…
<link rel="stylesheet" href="ux/templates/chapitre-ecran/chapitre-ecran.css">
<link rel="stylesheet" href="ux/templates/chapitre-ecran/noir-inferno-chapters.css">
<script src="ux/templates/gabarits.js"></script>
<script src="ux/templates/chapitre-ecran/chapitre-ecran.js"></script>
<script src="ux/templates/chapitre-ecran/noir-inferno-chapters.js"></script>
<script>Kobo.templates.apply();</script>
```

`index.js` (table skill → familles, chargement à la demande) ne sert qu'à la démonstration.

## Règles

**Sources.** La démo du skill et ses références, en lecture seule. On recopie et on adapte : rôles `--k-*` (dont `--k-sig-*`) uniquement, rien en dur. Rien n'est inventé ; ce qui n'est pas repris est écrit en tête de l'habillage.

**Performance.**
- Une seule boucle d'animation pour la page (`Kobo.loop`) ; une tâche ne tourne que si son élément est à l'écran et l'onglet visible.
- Seulement `transform`, `opacity` et `clip-path`.
- Rien n'est recalculé à chaque image qui peut l'être une fois : les versions colorées d'une photo sont cuites dans des canvas (`families.bake`), les géométries 3D créées une fois, une variable n'est réécrite que si sa valeur a changé.
- Une entrée se déclenche par `IntersectionObserver`, une fois, sans écouteur de défilement.
- Les photos d'un emplacement rempli sont demandées et décodées un écran avant leur arrivée.
- 3D : bibliothèque chargée après la page, au premier temps mort ; 30 images par seconde ; résolution abaissée d'elle-même si une image dépasse 45 ms ; photo de repli si WebGL manque ou si le chargement échoue.

**Accessibilité.**
- L'état final est l'état par défaut de la feuille de style : sans script d'entrée, sous `prefers-reduced-motion` et en `reduced`, tout est en place.
- Tout geste a un bouton : le cercle à tirer est un `<button>` ; un clic, Entrée ou Espace font ce que fait le geste, et le focus va au titre atteint.
- Un canvas est un décor (`aria-hidden`) : aucun texte n'y est dessiné. La photo reste une `<img>` avec son texte alternatif.
- Un mot géant est un décor ; le texte qu'il reprend reste dans le document pour les lecteurs d'écran.
- Le défilement n'est jamais confisqué.
- **Texte posé sur une image ou une scène : 4.5:1 au pire pixel** (3:1 pour un texte d'au moins 24 px), mesuré dans le navigateur. La famille « héros photo » fournit une plaque de lisibilité ; la scène 3D pose le texte du héros sur une plaque du fond.

**Replis.** Chacun laisse une page lisible : pas de WebGL → la photo de repli ; image absente → elle est masquée, le fond et le texte du gabarit restent ; canvas refusé → la photo garde le filtre CSS du skill.

**Contenu.** Un gabarit ne masque jamais un contenu : texte, faits, légende, action et photo restent affichés. Le vérificateur refuse `display: none` sur ces éléments.

**Lisibilité.** D'abord la composition de la démo (texte sur une zone calme, voile du skill, cadrage). La plaque de lisibilité ne vient qu'ensuite, et habillée par skill (couleur du voile du skill, panneau, cartouche) — jamais la même boîte partout. Voir `../../quality/relecture-etape-4b.md`, « la solution retenue pour chaque héros ».

**Images.** De vraies photos ou une vraie scène 3D. Le point d'intérêt d'une photo se donne par `data-k-focus="x% y%"` sur l'`<img>` ; `data-k-mark="x% y%"` place les repères d'un skill ailleurs que le cadrage.

## Vérifier

```bash
python3 tools/check_components.py   # couvre ux/templates/ : règles d'une couche de signature, en-tête de sources, fichiers par famille
```

Puis `../structures.html` : sélecteur « Gabarits : signature / neutres ».

## Limites connues

- Les vingt-trois skills ont le gabarit de leur premier écran. Quatre pièces uniques restent à écrire : l'objet 3D de pocket-device, la lentille de heritage-lens, le mot peint et le geste de hold-to-play, le produit détouré et la rangée bento de showroom. Pas de version React.
- Testé dans Chrome seulement. `tan()`, `:has()`, l'imbrication de `color-mix()` et `import()` dynamique demandent un navigateur récent.
- La scène 3D charge three.js depuis un CDN : hors ligne, la photo de repli reste.
- Voir `../../quality/relecture-etape-4b.md` pour les verdicts et ce qui reste incertain.
