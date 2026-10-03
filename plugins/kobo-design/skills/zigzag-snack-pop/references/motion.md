# Zigzag Snack Pop — mouvement

La référence est une **image fixe** accompagnée d'une **vidéo de 15 secondes** qui fait défiler la page. Douze images de cette vidéo ont été examinées : on y voit quelques effets, sans pouvoir en lire les durées ni les courbes.

- **Observé** sur la vidéo : ce qui bouge et dans quel ordre.
- **Proposé** par le skill : toutes les durées, les courbes, et les effets que la vidéo ne montre pas.

Le ton : **énergique et élastique** — les choses arrivent en trop grand et se remettent en place, les boutons claquent.

## Observé sur la vidéo

| Élément | Ce qu'on voit |
|---|---|
| Bande d'ingrédients | Les pastilles **défilent à l'horizontale**, lentement, en continu |
| Fiches de saveur | Les fiches arrivent d'abord **vides**, puis les produits **s'y posent** |
| Produit de la section « croquant » | Petit, puis grand : il **grossit** en entrant |
| Silhouettes du héros | Le cycliste est présent sur une image, absent sur la suivante : elles se déplacent |
| Boutons | Le pointeur s'y arrête ; l'état survolé n'est pas lisible |

## Proposé

| Moment | Effet | Durée / courbe |
|---|---|---|
| Titre du héros | Chaque mot arrive de 40px plus bas, penché de −6° et grossi à 1.25, puis se remet droit | 700ms `--ease-pop`, 90ms d'écart |
| Photo du produit | Arrive penchée de l'autre côté (8°), à 0.8, puis prend sa place à −6° | 900ms `--ease-pop`, retard 350ms |
| Tampon, mention, bouton | Grossissent de 0 à 1, l'un après l'autre | 600ms `--ease-pop`, de 800 à 1100ms |
| Tampon | Tourne avec le défilement (0.25° par pixel), tant que le héros est visible | lié au défilement |
| Bande d'ingrédients | Défile en boucle ; **s'arrête au survol, au focus et hors écran** | `--marquee` (36s), linéaire |
| Pastille d'ingrédient | Grossit à 1.08 et penche de −6° | `--dur` `--ease-pop` |
| Bouton | Se soulève de 3px en diagonale, l'ombre dure passe de 5 à 8px ; à l'appui, il s'écrase sur son ombre | `--dur-fast` (150ms) |
| Produits des fiches | Tombent de 46px, penchés de −9°, à 0.86, puis se posent | 800ms `--ease-pop`, 110ms d'écart |
| Fiche de saveur | Monte de 8px et penche de −1° au survol | `--dur` `--ease-pop` |
| Ajout au panier | Le compteur bondit à 1.5 en pivotant ; le bouton affiche « Ajoutée ! » une seconde | 420ms `--ease-pop` |
| Textes et tuiles | Montée de 26px en fondu à l'entrée d'une section | 600 à 700ms `--ease` |
| Tuile de la mosaïque | Zoom de la photo à 1.06 | `--dur-slow` `--ease` |
| Mot géant du pied | Monte de 60 % de sa hauteur | 1100ms `--ease` |

## Code

```css
/* Mot du titre : trop grand, de travers, puis en place */
.js .hero h1 .w { transform: translateY(40px) rotate(-6deg) scale(1.25); opacity: 0;
  transition: transform 700ms var(--ease-pop) var(--d, 0ms), opacity 300ms ease var(--d, 0ms); }
.js .hero.in h1 .w { transform: none; opacity: 1; }

/* Bouton à ombre dure */
.btn { box-shadow: var(--hard); transition: transform var(--dur-fast) var(--ease), box-shadow var(--dur-fast) var(--ease); }
.btn:hover { transform: translate(-3px, -3px); box-shadow: var(--hard-up); }
.btn:active { transform: translate(5px, 5px); box-shadow: 0 0 0 0 var(--brown-deep); }

/* Bande qui défile : la liste est écrite deux fois, on avance de la moitié */
.track { display: flex; width: max-content; animation: slide var(--marquee) linear infinite; }
.strip:hover .track, .strip.is-off .track, .strip:focus-within .track { animation-play-state: paused; }
@keyframes slide { to { transform: translateX(-50%); } }
```

```js
// La bande s'arrête dès qu'elle sort de l'écran
new IntersectionObserver(([e]) => strip.classList.toggle('is-off', !e.isIntersecting)).observe(strip);

// Le tampon tourne avec le défilement
requestAnimationFrame(() => { if (scrollY < innerHeight * 1.2) stamp.style.setProperty('--turn', (scrollY * 0.25).toFixed(1) + 'deg'); });
```

## Performance

- **Une seule animation continue** : la bande d'ingrédients, haute de 250px environ, qui n'anime que `transform`. Elle est mise en pause hors écran, au survol et au focus.
- Les dents de scie sont des **dégradés fixes** dans des pseudo-éléments ; les traces de pneu aussi.
- Les photos sur fond blanc sont fondues dans leur fiche par `mix-blend-mode: multiply`, sur des images de petite taille.
- Le tampon tourne par une variable CSS, écrite au plus une fois par image, et seulement près du héros.
- Seuls `transform`, `opacity`, `box-shadow` et des couleurs sont animés.
- Mesuré le 2026-10-03 dans un Chrome sans carte graphique (rendu logiciel, écran 144 Hz), 1440×900 : entrée du héros 130 images/s, bande qui défile 144, défilement de toute la page en 5s 94. Non mesuré : la fluidité à 390px.

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; transition-delay: 0s !important; }
  .js .rise, .js .hero h1 .w, .js .flavor img { opacity: 1; transform: none; }
  .js .pack figure { opacity: 1; transform: rotate(-6deg); }
  .js .pop, .js .giant { transform: none; }
  .stamp { transform: rotate(-14deg); }
  .strip { overflow-x: auto; }
}
```

La bande ne défile plus : elle devient une rangée que l'on fait glisser soi-même. Le tampon ne tourne plus.
