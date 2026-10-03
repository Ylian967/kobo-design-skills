# Glass Frame Estate — mouvement

Le site de référence bouge peu et toujours de la même façon : **tout monte de 80px en fondu, avec un ressort très amorti**, et les survols ne changent que des couleurs. Une seule séquence est pilotée par le défilement : les cartes d'étapes qui basculent. Les valeurs « mesuré » viennent des scripts et des styles du site en ligne (voir `source.md`) ; le reste est proposé.

## Catalogue

| Moment | Effet | Durée / courbe | Statut |
|---|---|---|---|
| Arrivée du héros | Mot-marque, titre + bouton, cellules en verre : montée de 80px + fondu. La photo ne bouge pas | `--dur-rise` (1.1s) `--ease-spring` | **Mesuré** (ressort raideur 250, amortissement 54, masse 1 ; stable en 1.06s). Décalage de 120ms entre les blocs : proposé |
| Entrée d'une section | Le bloc entier monte de 80px + fondu, **une seule fois**, dès qu'il touche le bas de l'écran | idem | **Mesuré** (seuil 0, `animateOnce`) |
| Étapes | Section collante à 40px du haut. Chaque carte suivante part de `translateY(288px) rotateX(90deg)` et se pose sur la précédente, liée au défilement (≈ 600px par carte) | défilement | **Mesuré** (cibles de transformation, sans perspective) |
| Liens, textes de bouton | Changement de couleur | 400ms `cubic-bezier(.44, 0, .56, 1)` | **Mesuré** |
| Fond de survol (bouton, ligne de service) | Un calque de couleur inverse recouvre l'élément | 300ms, même courbe | Durée et courbe **mesurées** ; sens (il monte du bas) proposé |
| Ligne de service | Fond blanc, texte noir, contenu resserré de 20px vers le centre | 300ms | Observé (capture) ; décalage proposé |
| Carte d'agent | Une carte blanche (nom, rôle, réseaux) recouvre le portrait, de gauche à droite | 500ms | Observé ; durée **mesurée** (transition 0.5s du site) |
| Menu | Voile sombre + liens centrés qui montent de 20px en cascade (40ms) ; fond flouté de 5px | 500ms | Flou et durée **mesurés** ; cascade proposée |
| FAQ | La réponse se déplie, le chevron tourne de 180° | 300ms | Durée **mesurée** |
| Compteurs | Chaque chiffre défile dans sa colonne 0–9 jusqu'à sa valeur | `--dur-odo` (1.4s), 120ms entre chiffres | Observé ; durées proposées |
| Photo d'annonce, de quartier | Zoom à 1.04 dans son cadre | 900ms | Proposé (absent du site) |
| Flèche de bouton | Avance de 4px | 300ms | Proposé |

## Code

```css
/* 1. Montée au ressort : la courbe est le ressort du site recalculé en linear() */
[data-rise] { opacity: 0; transform: translateY(var(--rise));
  transition: opacity var(--dur-rise) var(--ease-spring), transform var(--dur-rise) var(--ease-spring); }
[data-rise].in { opacity: 1; transform: none; }

.intro .word, .intro .hero-body > * { animation: rise var(--dur-rise) var(--ease-spring) both; }
.intro .hero-body > :nth-child(2) { animation-delay: 120ms; }
@keyframes rise { from { opacity: 0; transform: translateY(var(--rise)); } }

/* 2. Fond de survol */
.btn::before { content: ""; position: absolute; inset: 0; z-index: -1; background: var(--ink);
  transform: translateY(101%); transition: transform var(--dur-ui) var(--ease-color); }
.btn:hover::before { transform: none; }
```

```js
// Apparitions : une fois
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('[data-rise]').forEach(el => io.observe(el));

// Étapes : t va de 0 à (nombre de cartes − 1) sur la hauteur de la section
const range = steps.offsetHeight - pin.offsetHeight - parseFloat(getComputedStyle(steps).paddingBottom);
const t = Math.min(1, Math.max(0, -steps.getBoundingClientRect().top / range)) * cards.length;
cards.forEach((c, k) => {                       // cards = toutes les cartes sauf la première
  const p = Math.min(1, Math.max(0, t - k));
  c.style.transform = `translateY(${Math.round(288 * (1 - p))}px) rotateX(${(90 * (1 - p)).toFixed(2)}deg)`;
  c.style.visibility = p ? 'visible' : 'hidden';
});
```

La section d'étapes mesure `100svh + 1500px` ; le bloc collant (titre + carte de 380px) reste à 40px du haut pendant que les trois cartes suivantes basculent. Sans perspective, `rotateX(90deg)` écrase simplement la carte : elle se déplie en montant.

## Performance

- **Seules `transform` et `opacity` sont animées**, plus `clip-path` sur la petite carte d'agent et `grid-template-rows` sur une ligne de FAQ.
- **Un seul calcul au défilement** (les étapes) : un `requestAnimationFrame` au plus par image, actif seulement quand la section est à l'écran (IntersectionObserver), coupé sous 810px.
- **Le verre ne bouge pas sur une photo qui bouge** : la photo du héros est fixe, les cellules (`backdrop-filter: blur(2px)`, 160 et 259px de large) ne montent qu'à l'arrivée.
- **Jamais de flou plein écran animé.** Le fond du héros est flouté par le serveur d'images (`&blur=160`, image de 480px), pas en CSS. À l'ouverture du menu, le flou de 5px est posé **d'un coup, après le fondu**, sur le héros seul (la page est verrouillée) : un `backdrop-filter` plein écran animé tombait à 19 images/s et laissait des reflets parasites en rendu logiciel.
- Les éléments animés ne portent `will-change` que sur les cartes d'étapes.
- Mesuré dans un Chrome **sans carte graphique** (rendu logiciel, écran 144 Hz), 1440×900 : arrivée du héros 86 images/s, défilement du héros 115, étapes 141, témoignages et agents 140 ; 390×844 : 144. Ouverture du menu : 61 avec le flou différé (mesure faite sur la variante `backdrop-filter` différée ; la variante finale n'a pas pu être re-mesurée de façon fiable).

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; transition-delay: 0s !important; }
  [data-rise] { opacity: 1; transform: none; }
  .steps { height: auto; } .steps-pin { position: static; }
  .deck { height: auto; display: grid; gap: var(--gap); }
  .step { position: static; transform: none !important; }
}
```

Tout est visible d'emblée, les compteurs affichent leur valeur, les étapes se lisent l'une sous l'autre (c'est aussi leur forme en mobile, **mesurée** sur le site).
