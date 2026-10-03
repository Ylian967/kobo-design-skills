# Retro Mission Poster — mouvement

L'expérience d'origine (un récit en 3D que l'on faisait défiler, récompensé en 2021) **n'existe plus** : le site a été remplacé. Ses animations de scène n'ont donc pas pu être revues. En revanche, sa feuille de style a été retrouvée dans l'archive du web : les courbes et durées de l'interface ci-dessous en viennent (« mesuré »). Le reste est proposé.

## Catalogue

| Moment | Effet | Durée / courbe | Statut |
|---|---|---|---|
| Chargement | Fond sombre, logo rouge, cercle qui se trace en boucle ; fondu de sortie | tracé `--draw` (4s) linéaire ; fondu 500ms, retard 500ms | **Mesuré** (`draw 4s linear infinite`, `opacity 500ms … 500ms`) |
| Entrée d'un chapitre | Chaque ligne du titre monte derrière un cache ; le petit « Chapitre N » apparaît ; l'accroche monte de 24px | `--dur-move` (1000ms) `--ease`, retard 150ms ; 120ms entre lignes | Durée, courbe et retard **mesurés** ; découpe en lignes proposée |
| Anneau dentelé | Tourne en continu ; la flèche descend de 8px au survol | `--spin` (50s) linéaire ; 300ms | Rotation **mesurée** (`rotate 50s linear infinite`) ; survol proposé |
| Mot géant | Glisse à l'horizontale avec le défilement (35 % de la distance) | lié au défilement | Proposé (le site plaçait le mot entre deux plans 3D) |
| Liste de faits | Les lignes arrivent de la gauche, l'une après l'autre | 1000ms `--ease`, 120ms d'écart | Proposé |
| Boutons, contours, liens | Changement de couleur, léger déplacement | `--dur-ui` (300ms) `--ease` | **Mesuré** (`all 300ms cubic-bezier(.19,1,.22,1)`) |
| Menu | Fondu du panneau sombre ; les titres de chapitres montent en cascade (70ms) | 500ms `--ease-fade` ; 1000ms `--ease` | Fondu **mesuré** ; cascade proposée |
| Carte du journal | Un contour rouge de 2px apparaît autour de l'image ; le filet rouge se rétracte | 300ms ; 1000ms | Contour rouge **mesuré** (`box-shadow 0 0 0 2px #e74833`) ; filet proposé |

Le site d'origine faisait aussi apparaître son grain en fondu (`GRAINS 1s linear`) ; ici le grain est dans l'image (voir plus bas).

## Code

```css
.title span { display: block; overflow: hidden; padding-top: .06em; }
.title b { display: block; transform: translateY(105%);
  transition: transform var(--dur-move) var(--ease); transition-delay: calc(var(--i) * 120ms + 150ms); }
.chapter.in .title b { transform: none; }

.next .teeth { animation: rotate var(--spin) linear forwards infinite; transform-origin: 50% 50%; }
.loader circle { stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw var(--draw) linear forwards infinite; }
```

```js
// Un chapitre « entre » quand il occupe 45 % de l'écran
new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')), { threshold: 0.45 });
```

Le défilement est natif, aimanté sur chaque chapitre (`scroll-snap-type: y proximity`).

## Performance

- **L'effet d'affiche est calculé une seule fois par photo** (aplats, trois tons, grain) dans un canvas, puis l'image obtenue remplace la photo. Ensuite, la page n'affiche que des images ordinaires.
- **Pas de calque de grain plein écran.** Posé en surimpression sur chaque chapitre, il faisait tomber le défilement à 40 images/s en rendu logiciel ; cuit dans l'image, le défilement tient 122.
- Aucun `filter`, aucun mode de fusion.
- Une seule animation continue : l'anneau (150px). Un seul élément lié au défilement : le mot géant, mis à jour au plus une fois par image.
- Mesuré dans un Chrome sans carte graphique (rendu logiciel, écran 144 Hz), 1440×900 : chapitre au repos 144 images/s, défilement de toute la page 122, ouverture du menu 78.

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; scroll-snap-type: none; }
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; transition-delay: 0s !important; }
  .title b, .menu ol a { transform: none; }
  .title small, .pitch, .facts li { opacity: 1; transform: none; }
}
```

Titres en place, anneau immobile, mot géant fixe, défilement libre sans aimant.
