# Nocturne Architecture — mouvement

**La référence est une suite d'images fixes** (cinq captures d'une maquette) : aucune animation n'y est visible. Tout ce qui suit est **proposé** par le skill, dans le ton du visuel : lent, sobre, sans rebond — comme une pose longue. Deux éléments de la maquette appellent le mouvement : les bandeaux de texte coupés aux deux bords (défilement) et la ligne rouge sous le carrousel (progression).

## Catalogue

| Moment | Effet | Durée / courbe |
|---|---|---|
| Arrivée du héros | La photo dézoome de 1.08 à 1 ; les lettres du mot-marque montent une à une (70ms d'écart) | 2400ms et 1300ms `--ease` |
| Grande phrase | Les mots passent du gris au blanc un à un, **au fil du défilement** | lié au défilement ; couleur 500ms |
| Chiffres | Comptent de 0 à leur valeur quand ils entrent à l'écran | 1500ms, ralenti en fin |
| Blocs | Montée de 32px en fondu, une fois | `--dur-slow` (1000ms) `--ease` |
| Bandeau de mots | Défile vers la gauche en boucle ; un mot sur deux est éteint | `--dur-marquee` (30s) linéaire |
| Bandeau de catégories | Défile dans l'autre sens | idem |
| Pilule rouge | Un fond blanc monte du bas, le texte passe au noir | 500ms `--ease` |
| Bouton rond | Se remplit de blanc ; s'écrase à 0.92 au clic | 200ms / 500ms |
| Bouton lecture | La pastille grossit à 1.25 | 500ms `--ease` |
| Carte de bien, d'article | La photo zoome à 1.05 (1.04) dans son cadre | 1000ms `--ease` |
| Carrousel | Défilement natif aimanté ; la ligne rouge s'allonge avec la position | 500ms `--ease` |
| Étape | La ligne s'ouvre en hauteur, les autres se referment ; le titre rougit au survol | 700ms `--ease` |

## Code

```css
/* Mot-marque : chaque lettre monte */
.word span { display: inline-block; transform: translateY(60%); opacity: 0;
  transition: transform 1300ms var(--ease), opacity 600ms linear; transition-delay: calc(var(--i) * 70ms + 200ms); }
.loaded .word span { transform: none; opacity: 1; }

/* Phrase en deux tons */
.phrase span { color: var(--dim); transition: color var(--dur) linear; }
.phrase span.lit { color: var(--text); }

/* Pilule : le fond blanc monte */
.pill::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit;
  background: var(--paper); transform: translateY(101%); transition: transform var(--dur) var(--ease); }
.pill:hover::before { transform: none; }

/* Étape : hauteur animée sans la mesurer */
.step .body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 700ms var(--ease); }
.step.open .body { grid-template-rows: 1fr; }
.step .inner { overflow: hidden; }
```

```js
// Mots allumés : proportion de la phrase déjà passée dans l'écran
const t = Math.min(1, Math.max(0, (innerHeight * 0.85 - rect.top) / (innerHeight * 0.5 + rect.height)));
const n = Math.round(t * words.length);
if (n !== lit) words.forEach((w, i) => w.classList.toggle('lit', i < n));     // rien si le compte n'a pas changé

// Barre de progression du carrousel
bar.style.transform = `scaleX(${0.25 + 0.75 * rail.scrollLeft / (rail.scrollWidth - rail.clientWidth)})`;
```

## Performance

- Seuls `transform`, `opacity` et `color` sont animés, plus `grid-template-rows` sur une ligne d'étape.
- **Deux animations continues seulement**, les bandeaux : des bandes de 60 à 80px de haut, jamais du plein écran. La photo du héros ne bouge qu'à l'arrivée.
- La phrase en deux tons ne modifie des classes **que si le nombre de mots allumés change** ; un `requestAnimationFrame` au plus par image.
- Le carrousel est un défilement natif (`scroll-snap`) : aucun script pendant le glissement, sauf la mise à jour de la barre.
- Aucun filtre ni flou ; les voiles sur photo sont des dégradés fixes.
- Mesuré dans un Chrome sans carte graphique (rendu logiciel, écran 144 Hz), 1440×900 : arrivée du héros 62 images/s, héros au repos 145, défilement de la page 139, section avec bandeau 145, carrousel 142, ouverture d'une étape 143.

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; transition-delay: 0s !important; }
  .rise { opacity: 1; transform: none; }
  .hero > img { transform: none; }
  .marquee { flex-wrap: wrap; white-space: normal; }
  .marquee > div + div { display: none; }
  .phrase span { color: var(--text); }
}
```

Le mot-marque et la photo sont en place, la phrase est entièrement blanche, les chiffres affichent leur valeur, les bandeaux deviennent des listes fixes sur plusieurs lignes, les étapes s'ouvrent sans glissement.
