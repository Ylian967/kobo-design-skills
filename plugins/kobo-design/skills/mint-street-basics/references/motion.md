# Mint Street Basics — mouvement

**La référence est une image fixe** (deux captures d'une maquette) : aucune animation n'y est visible. Tout ce qui suit est **proposé** par le skill, dans l'esprit du visuel : des formes rondes qui grandissent, des titres qui montent, des gestes courts et doux. Seul le bandeau défilant est suggéré par la maquette (texte répété et coupé aux deux bords).

## Catalogue

| Moment | Effet | Durée / courbe |
|---|---|---|
| Arrivée du héros | Chaque ligne du titre monte derrière un cache (110ms d'écart) ; le disque vert puis le disque clair grandissent de 0.6 à 1 ; la photo en arche monte de 12 % | 900ms, 1200ms, 1100ms `--ease` |
| Chiffres du héros | Comptent de 0 à leur valeur, en ralentissant | 1400ms, après 500ms |
| Bandeau | Défile de droite à gauche en boucle ; s'arrête au survol | `--dur-ticker` (26s) linéaire |
| Sections | Chaque bloc monte de 40px en fondu, une fois ; les cartes d'une rangée se suivent à 100ms | 900ms `--ease` |
| Pilule blanche | Grossit à 1.06, son anneau clair s'élargit de 7 à 12px | 450ms `--ease` |
| Pile de collections | La carte du dessus part à gauche en tournant de 6° ; les suivantes avancent d'un cran ; le texte de l'encart change | 900ms `--ease` |
| Carte produit | La photo zoome à 1.05 dans son cadre | 900ms `--ease` |
| Pastille de couleur | La pastille choisie s'allonge en pilule (20 → 44px) | 450ms `--ease` |
| Puce de taille | La puce choisie s'élargit (44 → 72px) et passe au blanc | 450ms / 200ms |
| Ajouter au panier | Monte de 3px au survol ; au clic devient bleu nuit « Ajouté au panier ✓ » pendant 1.8s | 450ms `--ease` |
| Favori | Le signet se remplit | 200ms |
| Liens de navigation | Un filet se trace sous le lien | 450ms `--ease` |
| Titre du pied | Glisse verticalement derrière la photo (12 % du défilement) | lié au défilement |

## Code

```css
/* Titre : chaque ligne monte derrière un cache */
.hero h1 span { display: block; overflow: hidden; padding-block: .03em; }
.hero h1 b { display: block; transform: translateY(105%);
  transition: transform var(--dur-slow) var(--ease); transition-delay: calc(var(--i) * 110ms + 150ms); }
.loaded .hero h1 b { transform: none; }

/* Disques : grandissent depuis 0.6 */
.disc { transform: scale(.6); opacity: 0; transition: transform 1200ms var(--ease), opacity var(--dur) linear; }
.loaded .disc { transform: none; opacity: 1; }

/* Pile : la position de chaque carte dépend de son rang --k */
.deck figure { transition: transform var(--dur-slow) var(--ease), opacity var(--dur) linear;
  transform: translate(calc(var(--k) * 9%), calc(var(--k) * 5%)) scale(calc(1 - var(--k) * .06));
  opacity: calc(1 - var(--k) * .35); z-index: calc(5 - var(--k)); }
.deck figure.gone { transform: translate(-40%, 0) rotate(-6deg); opacity: 0; z-index: 6; }

.ticker p { flex: none; padding-right: 3.2em; animation: ticker var(--dur-ticker) linear infinite; }
@keyframes ticker { to { transform: translateX(-100%); } }
```

```js
// Pile : la carte du dessus sort, puis les rangs sont recalculés
leaving.classList.add('gone'); top = (top + 1) % cards.length;
setTimeout(() => cards.forEach((c, i) => { c.style.setProperty('--k', (i - top + n) % n); c.classList.remove('gone'); }), 420);
```

## Performance

- Seuls `transform` et `opacity` sont animés ; les dégradés de texte (`background-clip: text`) sont fixes.
- **Une seule animation continue** : le bandeau, une bande de 82px de haut. Elle se met en pause au survol.
- Un seul élément lié au défilement (le titre du pied) : un `requestAnimationFrame` au plus par image, seulement quand le pied est à l'écran.
- Le compteur du héros s'arrête de lui-même après 1.4s ; les apparitions se jouent une fois (IntersectionObserver).
- Aucun filtre, aucun flou, aucune ombre animée : l'anneau des pilules est une `box-shadow` sans flou.
- Mesuré dans un Chrome sans carte graphique (rendu logiciel, écran 144 Hz), 1440×900 : arrivée du héros 107 images/s, héros au repos 145, défilement de la page 116, pile de collections 106.

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; transition-delay: 0s !important; }
  .rise { opacity: 1; transform: none; }
  .ticker { white-space: normal; height: auto; padding: 16px var(--gutter); }
  .ticker p + p { display: none; }
}
```

Le titre, les disques et la photo sont en place d'emblée, les chiffres affichent leur valeur, le bandeau devient une phrase fixe, la pile change de carte sans glissement, le titre du pied ne bouge plus.
