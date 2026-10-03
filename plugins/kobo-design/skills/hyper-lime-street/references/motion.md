# Hyper Lime Street — mouvement

Le site de référence est nerveux mais simple : les grandes formes **glissent le long de leur diagonale**, les carrousels changent d'un coup sec, un texte défile en continu, une icône bat. Les courbes « mesuré » viennent des feuilles de style du site ; ses durées d'entrée sont posées par script et n'ont pas pu être lues : celles de ce fichier sont proposées (voir `source.md`).

## Catalogue

| Moment | Effet | Durée / courbe | Statut |
|---|---|---|---|
| Chargement | Écran blanc, « NOW LOADING » en italique en bas à droite, barre qui se remplit ; l'écran part vers le haut | 0.9s puis 700ms `--ease` | Écran observé ; sortie proposée |
| Entrée d'une section | Le bloc lime arrive de son côté, le panneau blanc du côté opposé (120ms plus tard), la bande noire glisse dans son axe | `--dur-in` (700ms) `--ease` ; opacité 400ms ease-out | Courbe **mesurée** (`cubic-bezier(.15,.59,.45,.89)`, opacité en ease-out) ; durée et distances proposées |
| Barre de navigation | L'onglet de la section en cours devient une pilule blanche agrandie à 1.12 | 400ms `--ease` | Échelle 1.12 **mesurée** ; durée proposée |
| Carrousel | La diapositive sortante s'efface (200ms), l'entrante arrive de 40px à droite | 700ms `--ease` + opacité 400ms | Courbes **mesurées** (transform + opacité) ; valeurs proposées |
| Vignettes | La vignette choisie prend un contour lime ; au survol elle monte de 2px | 400ms | Proposé |
| Bouton « En savoir plus » | Fond et texte s'inversent en lime, la pastille avance de 4px | 400ms `--ease` | `background-color` avec `--ease` **mesuré** ; pastille proposée |
| Texte défilant | Une phrase défile de droite à gauche, en boucle | `--dur-ticker` (20s) linéaire | **Mesuré** (`wordsLoop 20s linear infinite`) |
| Icône de son | Bat à 1.12 quand le son est actif | `--dur-beat` (0.8s) | **Mesuré** (`heartbeat .8s infinite`, échelle ≈ 1.1 relevée) |
| Mot géant | Dérive horizontalement avec le défilement (18 % de la distance) | lié au défilement | Observé (sections décalées au défilement) ; valeur proposée |
| Onglet latéral | Le numéro suit la section ; les flèches font défiler jusqu'à la suivante | défilement doux | Observé |
| Pilules lime | Grossissent à 1.04–1.06 | 200ms linéaire | **Mesuré** (`all .2s linear`) |

## Code

```css
/* Les formes glissent dans leur axe : la bande reste inclinée pendant qu'elle se déplace */
.sec .block, .sec .panel, .sec .slab { transition: transform var(--dur-in) var(--ease), opacity var(--dur) ease-out; }
.sec:not(.in) .block { transform: translate(-70%, 0); opacity: 0; }
.sec:not(.in) .panel { transform: translate(40%, 0); opacity: 0; }
.sec:not(.in) .slab  { transform: skewX(calc(var(--angle) * -1)) translateX(60%); }
.sec .panel { transition-delay: 120ms; }

/* Carrousel : une diapositive visible, les autres attendent à droite */
.slide { transition: opacity var(--dur) ease-out, transform var(--dur-in) var(--ease); }
.slide:not(.is-on) { opacity: 0; transform: translateX(40px); visibility: hidden;
  transition: opacity var(--dur-fast) ease-out, transform 0s var(--dur-fast), visibility 0s var(--dur-fast); }

.ticker span { display: inline-block; padding-right: 3em; animation: wordsLoop var(--dur-ticker) linear infinite; }
@keyframes wordsLoop { to { transform: translateX(-100%); } }
```

```js
// Entrée : une fois, quand la section dépasse le bas de l'écran de 18 %
const enter = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); enter.unobserve(e.target); }
}), { rootMargin: '0px 0px -18% 0px' });

// Section en cours : une bande d'observation au milieu de l'écran
const spy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setCurrent(e.target); }),
  { rootMargin: '-45% 0px -50% 0px' });
```

## Performance

- **Les formes sont des blocs CSS inclinés** (`skewX`) à fond uni : aucune image, aucun masque à recalculer. Les photos, elles, ne sont jamais inclinées : elles sont découpées par un `clip-path` fixe.
- Seuls `transform` et `opacity` sont animés ; les entrées se jouent une fois.
- **Une seule animation continue**, le texte défilant : une ligne de texte, pas une zone plein écran. Le battement de l'icône ne tourne que si le son est actif.
- Le mot géant est le seul élément lié au défilement : un `requestAnimationFrame` au plus par image, et seulement quand sa section est à l'écran.
- La trame des bandes noires est un `repeating-linear-gradient` fixe.
- Mesuré dans un Chrome sans carte graphique (rendu logiciel, écran 144 Hz), 1440×900 : accueil au repos 145 images/s, défilement de toute la page 130, section avec texte défilant 145, changement de diapositive 136.

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; transition-delay: 0s !important; }
  .sec:not(.in) .block, .sec:not(.in) .panel { transform: none; opacity: 1; }
  .sec:not(.in) .slab { transform: skewX(calc(var(--angle) * -1)); }
  .ticker { white-space: normal; }
}
```

Les formes sont en place d'emblée, le texte défilant devient un paragraphe fixe, le mot géant ne dérive plus, l'écran de chargement s'efface sans attendre.
