# Showroom Bento — mouvement

**La référence est une seule image fixe** : aucune animation n'y est visible. Tout ce qui suit est **proposé** par le skill, à partir de ce que l'image suggère : un produit posé sous la lumière d'un studio, des voisins qui attendent sur les bords, des tuiles qu'on consulte d'un coup d'œil. Le ton : **net et court** pour l'interface (180 à 450ms), **ample** pour le produit (900ms).

## Catalogue

| Moment | Effet | Durée / courbe |
|---|---|---|
| Arrivée | Barre, titre, prix puis tuiles montent de 22px en fondu, en cascade ; le produit monte de 40px en passant de 0.9 à 1 ; l'ombre au sol apparaît | 800ms `--ease`, écarts de 60ms ; produit 1300ms, retard 250ms ; sol 1200ms |
| Changement de modèle | Les trois produits glissent d'une place : le centre part sur un bord en rétrécissant à 0.36, le voisin vient au centre. Celui qui doit traverser tout l'écran saute sans transition, en fondu | `--dur-slide` (900ms) `--ease` |
| Nom, légende, valeurs | L'ancien texte part vers le haut en fondu, le nouveau arrive par le bas ; les six caractéristiques se relaient en cascade | 180ms puis `--dur` (450ms), 50ms d'écart |
| Prix | Le nombre défile de l'ancienne valeur à la nouvelle | 700ms, ralenti cubique |
| Changement de teinte | Fondu entre deux calques du produit ; la coche se trace dans la pastille ; un anneau l'entoure ; l'aperçu de la tuile grossit de 0.9 à 1 | `--dur` ; coche `--dur` `--ease` ; aperçu `--ease-back` |
| Pointeur sur la scène | Le produit suit le pointeur de 14px au plus, l'ombre part de 18px en sens inverse | 500ms `--ease` |
| Tuile | Monte de 4px, ombre douce | `--dur` `--ease` |
| Pilule, bouton rond | Monte de 2px | `--dur` `--ease` |
| Flèches | La flèche survolée avance de 3px et fonce | `--dur` `--ease-back` |
| Photo de l'accessoire | Zoom à 1.06 au survol de la tuile | 900ms `--ease` |

## Code

```css
/* Trois places : gauche, centre, droite */
.model { transition: transform var(--dur-slide) var(--ease), opacity var(--dur-slide) var(--ease); }
.model[data-pos="-1"] { transform: translate(-88%, 16%) scale(0.36); opacity: 0.85; }
.model[data-pos="1"]  { transform: translate(88%, 16%) scale(0.36); opacity: 0.85; }
.model.is-jump { transition: none; opacity: 0; }   /* celui qui passe d'un bord à l'autre */

/* Texte qui se relaie */
.swap { display: inline-block; transition: transform var(--dur) var(--ease), opacity var(--dur-fast); }
.swap.is-out { transform: translateY(-35%); opacity: 0; transition-duration: var(--dur-fast); }
.swap.is-pre { transform: translateY(35%); opacity: 0; transition: none; }

/* Le produit suit le pointeur : seule la couche intérieure bouge */
.model-in { transform: translate(calc(var(--px, 0) * 14px), calc(var(--py, 0) * 8px)); transition: transform 500ms var(--ease); }
```

```js
// Place de chaque modèle autour du modèle courant
els.forEach((el, i) => { let pos = i - current; if (pos > 1) pos -= n; if (pos < -1) pos += n;
  const jump = Math.abs(pos - Number(el.dataset.pos)) > 1;
  if (jump) { el.classList.add('is-jump'); el.dataset.pos = pos; el.offsetWidth; el.classList.remove('is-jump'); }
  else el.dataset.pos = pos; });

// Texte : sortie, remplacement, entrée
el.classList.add('is-out');
setTimeout(() => { el.textContent = text; el.classList.remove('is-out'); el.classList.add('is-pre'); el.offsetWidth; el.classList.remove('is-pre'); }, 180);
```

## Performance

- **Rien ne tourne en continu** : aucune boucle au repos. Le seul `requestAnimationFrame` durable est le compteur du prix (700ms).
- **Détourage et teinte sont cuits une fois** : chaque photo est détourée dans un canvas à son premier affichage, chaque teinte est calculée une fois puis gardée en image (`toBlob`). Ensuite ce sont de simples images : aucun filtre, aucun `mix-blend-mode` pendant les animations.
- Le glissement n'anime que `transform` et `opacity` sur trois images ; le pointeur écrit deux variables CSS, au plus une fois par image.
- La lumière de la scène et l'ombre au sol sont des dégradés fixes.
- Mesuré le 2026-10-03 dans un Chrome sans carte graphique (rendu logiciel, écran 144 Hz), 1440×1040 : arrivée (détourage compris) 94 images/s, changement de modèle 100, changement de teinte 98. Non mesuré : le suivi du pointeur, et tout à 390px.

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; transition-delay: 0s !important; }
  .js .rise, .js .stage-in, .js .floor { opacity: 1; transform: none; }
  .model-in, .floor::before { transform: none; }
  .tile:hover, .pill:hover, .round:hover { transform: none; }
}
```

Le script lit aussi la préférence : les textes changent d'un coup, le prix ne défile plus, le produit ne suit plus le pointeur. Le carrousel et les teintes restent utilisables.
