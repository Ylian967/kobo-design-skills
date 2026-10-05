# Gabarits de signature

Un gabarit remplit un emplacement d'une structure de page (`../README.md`) avec la mise en page qui fait reconnaître un skill. Il ne touche pas à la structure : ni l'ordre des sections, ni les ancres, ni le niveau des titres, ni le parcours au clavier.

Chaque **famille** est construite une fois (`<famille>/<famille>.css` et `.js`), puis **habillée** par skill (`<famille>/<skill>.css` et `.js`). La famille porte la mécanique et ne lit que des rôles `--k-*` ; l'habillage règle des variables locales et cite, en tête de fichier, ce qu'il a lu dans le skill et ce qu'il n'a pas repris.

## Familles écrites

| Famille | Emplacement | Ce qu'elle fait | Habillage |
|---|---|---|---|
| `cadre/` | `frame` | Cadre fixe autour de l'écran : filet, rail et barre facultatifs, progression | lore-frame-editorial, retro-mission-poster, sticker-brutal-jp |
| `image/` | `media` | Forme et traitement d'une image de contenu ; parallaxe dans la forme | lore-frame-editorial (planches en forme de dossier) |
| `hero-photo/` | `hero` | Photo du héros en plein cadre, texte et action posés dessus, rendus lisibles par le moyen de la démo du skill (voile, dégradé, zone calme) ; couches colorées cuites en canvas ; pièces propres à un skill (lentille, mot peint et touche à maintenir, produit détouré et rangée bento) | 20 habillages : acid-scan, lore-frame, hyper-lime, nocturne, alpine-glass, pocket-device, glass-frame, mint-street, zigzag, serif-bistro, pixel-lime, signal-orange, sticker-brutal, retro-mission, showroom, cosmic, anime-x-slash, heritage-lens, hold-to-play, chrome-atelier |
| `scene/` | `backdrop` | Scène 3D fixe derrière la page, chargée en différé, photo de repli ; ou une photo seule | glacial-mono-3d (scène de glace), cosmic-voyage (ciel étoilé, sans 3D) |
| `objet/` | `hero` | Objet 3D à la place d'honneur du héros, qu'on tourne en le tirant ou avec deux boutons ; repli sur la photo | tiny-planet-toy (la planète) ; pocket-device-noir (l'appareil, accueilli par son héros photo : `F.objet.models`, `F.objet.mount`) |
| `chapitre-ecran/` | `chapter` | Chapitre en scène de la hauteur de l'écran, cercle à tirer vers le suivant | noir-inferno-chapters |
| `formes-inclinees/` | `chapter` | Bloc numéroté, panneau à image découpée et bande, penchés au même angle | hyper-lime-street |
| `titre-geant/` | `title` | Un mot choisi, repris en très grand, d'un bord à l'autre, coupé par le bas (voir « Mots géants ») | nocturne-architecture |

## Mots géants

Vaut pour `titre-geant` (titres de section) et pour le mot du héros de nocturne-architecture.

- **Le mot géant est choisi exprès** : le nom du projet, ou un mot-clé de la section. Jamais un mot pris automatiquement dans un titre.
- **Pas d'article, pas de mot vide** : « lieu », pas « le » ; « tarifs », pas « nos ». Trois lettres au moins.
- **D'où il vient** : `data-k-word="…"` posé sur le titre (`<h2 data-k-word="lieu">`) ou sur son surtitre ; à défaut le surtitre (`k-kicker`), dont les articles de tête sont retirés. Pour le héros : `data-k-word` sur le `<h1>`, à défaut le premier mot du nom du projet dans la barre.
- **Rien à agrandir, rien d'agrandi** : sans surtitre ni `data-k-word`, ou avec un mot de moins de trois lettres, le titre reste neutre.
- **Tailles cohérentes entre sections** : chaque mot va d'un bord à l'autre de son bloc, mais aucun ne dépasse une fois et demie le plus petit de la page. Choisir des mots de longueur voisine (4 à 9 lettres) : un mot très long rapetisse tous les autres.
- `check_studio.py` signale en alerte un mot géant de moins de trois lettres ou réduit à un mot vide.

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
- Un canvas est un décor (`aria-hidden`) : aucun texte de la page n'y est porté. La photo reste une `<img>` avec son texte alternatif. Deux exceptions décoratives : l'écran de l'appareil de pocket-device (un faux affichage, l'objet est nommé par `aria-label`) et le mot peint de hold-to-play (copie filtrée du titre, qui reste dans la page).
- Un mot géant est un décor ; le texte qu'il reprend reste dans le document pour les lecteurs d'écran.
- Un mot géant décoratif vit **dans le plan de l'image** : `z-index` négatif dans son bloc (comme la photo et son voile), `pointer-events: none`. Il passe sous le texte, les faits et les boutons, jamais par-dessus : il ne gêne ni la lecture ni les clics.
- Le défilement n'est jamais confisqué.
- **Texte posé sur une image ou une scène : 4.5:1 au pire pixel** (3:1 pour un texte d'au moins 24 px), mesuré dans le navigateur, lettres contre leur entourage : deux captures de chaque texte (avec, puis sans les lettres), les pixels qui diffèrent sont les lettres, et la couleur du texte est comparée aux pixels du fond situés sous et autour d'elles (2 px). La méthode vaut pour un texte incliné, en dégradé, ou posé sur une image, une scène 3D ou une forme.

**Replis.** Chacun laisse une page lisible : pas de WebGL → la photo de repli (scène, planète) ou le héros photo seul (appareil) ; image absente → elle est masquée, le fond et le texte du gabarit restent ; canvas refusé → la photo garde le filtre CSS du skill, le produit n'est pas détouré ; photo qui ne se prête pas au détourage (pas un objet sur fond uni) → elle reste entière dans sa tuile.

**Gestes.** Un geste a toujours une autre voie : tourner un objet → deux boutons et les flèches ; maintenir la touche (hold-to-play) → la barre d'espace maintenue, Entrée sur la touche, ou le lien « sans maintenir ».

**Contenu.** Un gabarit ne masque jamais un contenu : texte, faits, légende, action et photo restent affichés. Le vérificateur refuse `display: none` sur ces éléments.

**Lisibilité.** Le moyen de la démo du skill, repris tel quel : son voile local, son dégradé, sa zone calme, son cadrage. Comme le texte d'un projet est souvent plus long que celui de la démo, les arrêts du voile sont calés sur le bloc de texte (`--_plate`, derrière `.g-hero__content`) plutôt que sur la hauteur du héros. Une plaque unie n'est gardée que si la démo en a une (glacial-mono-3d : son panneau voilé). Voir `../../quality/relecture-etape-4b.md`, « la solution retenue pour chaque héros ».

**Images.** De vraies photos ou une vraie scène 3D. Le point d'intérêt d'une photo se donne par `data-k-focus="x% y%"` sur l'`<img>` ; `data-k-mark="x% y%"` place les repères d'un skill ailleurs que le cadrage.

## Vérifier

```bash
python3 tools/check_components.py   # couvre ux/templates/ : règles d'une couche de signature, en-tête de sources, fichiers par famille
```

Puis `../structures.html` : sélecteur « Gabarits : signature / neutres ».

## Limites connues

- Les vingt-trois skills ont le gabarit de leur premier écran, pièces uniques comprises. Hors du héros, la plupart des emplacements rendent encore leur contenu neutre. Pas de version React.
- Le détourage de showroom-bento ne vaut que pour un objet photographié sur un fond uni ; avec une autre photo, elle reste entière.
- Testé dans Chrome seulement. `tan()`, `:has()`, l'imbrication de `color-mix()` et `import()` dynamique demandent un navigateur récent.
- La scène 3D charge three.js depuis un CDN : hors ligne, la photo de repli reste.
- Voir `../../quality/relecture-etape-4b.md` pour les verdicts et ce qui reste incertain.

## En React

`Gabarits.jsx` pose dans un emplacement rendu par React les gabarits écrits pour les pages HTML : mêmes fichiers, donc aucun écart possible entre les deux. `kit.py … --react` écrit les imports dans l'ordre (feuilles avant la couche de signature ; puis `gabarits.js`, chaque famille, l'habillage du skill).

```jsx
import { gabarits } from './kobo/kobo-studio/ux/templates/Gabarits.jsx';
<LandingProduit … emplacements={gabarits('nocturne-architecture')} />
```

| | |
|---|---|
| Essayé dans un navigateur | `hero-photo` (20 skills) et `objet` (pocket-device-noir, tiny-planet-toy), dans la landing et l'accueil du site vitrine, à 1440 et 390 px, en `full`, `reduced`, `off`, sous `prefers-reduced-motion` et sous `StrictMode` |
| Non essayé | `cadre`, `titre-geant`, `image`, `chapitre-ecran`, `formes-inclinees`, `scene` : ils passent par le même chemin avec `gabarits(skill, { familles: [...] })`, sans garantie |
| Repli | l'emplacement rend d'abord son contenu neutre ; le gabarit ne le remplace que s'il se pose. Pas de photo dans le héros, intensité `off`, skill sans gabarit, échec du gabarit : le contenu neutre reste, entier. Objet 3D sans WebGL ou sans réseau : la photo reste seule |
| Photo dont l'adresse est morte | comme en HTML : le gabarit se pose, l'image est marquée `data-k-broken`, le fond et le texte restent |
| Props qui changent | le gabarit tient les éléments du héros (mêmes nœuds, écouteurs React compris) et peut en découper le texte. Quand le contenu des parts change (texte, image, lien), ou `data-k-intensity` / `data-k-skill` sur `<html>`, l'emplacement est remonté et le gabarit reposé : la page affiche toujours les props en cours. L'entrée du gabarit rejoue alors |

