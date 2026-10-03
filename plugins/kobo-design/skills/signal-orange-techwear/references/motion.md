# Signal Orange Techwear — mouvement

**La référence est une suite d'images fixes** (cinq captures d'une maquette) : aucune animation n'y est visible. Tout ce qui suit est **proposé** par le skill, à partir de ce que le visuel suggère : un affichage tête haute, des panneaux d'instrument, une pilule numérotée « 01/04 » qui appelle un changement de silhouette. Deux registres : le **glissé** (titres, panneaux : `--ease`) et le **sec** (boutons, onglets : par pas, `--ease-cut`).

## Catalogue

| Moment | Effet | Durée / courbe |
|---|---|---|
| Entrée d'un écran | Chaque ligne du titre empilé monte derrière un cache, l'une après l'autre ; étiquettes, texte et panneaux montent de 18px en fondu | `--dur-slow` (900ms) `--ease`, 80ms d'écart entre les lignes |
| Pilule « 01/04 » | Au clic : la silhouette du héros change en fondu, le numéro avance, le petit rond de la pilule pivote | fondu 700ms ; rond `--dur` `--ease` |
| Tableau de specs | À chaque changement de silhouette, les valeurs se « décodent » : signes tirés au hasard, remplacés de gauche à droite | pas de 40ms, deux signes par pas, 70ms d'écart entre les lignes |
| Profondeur | La silhouette suit le pointeur (14px au plus, 8px en hauteur) ; l'interrupteur « Profondeur on/off » du panneau coupe l'effet | 600ms `--ease` |
| Navigation | Trait orange de 54px qui se déploie sous le lien ; la barre prend un fond sombre dès qu'on défile | `--dur` `--ease` |
| Bouton, onglet | Le fond passe à l'orange **par pas** | `--dur-fast` (160ms) `--ease-cut` |
| Fiche système | Monte de 4px, contour orange, halo orange au bas ; la flèche part en diagonale | `--dur` `--ease` |
| Filtre de l'équipement | Les fiches sortent (fondu, 12px), puis celles de la catégorie reviennent en cascade | 200ms ; `--dur`, 70ms d'écart |
| Fiche produit | Zoom de la photo à 1.05 ; le bouton rond « + » devient orange et tourne d'un quart | `--dur-slow` ; `--dur` |
| Ajout au sac | Le compteur de la barre grossit à 1.35 et se remplit d'orange un instant | 400ms `--ease` |
| Liens fléchés | La flèche ↗ part de 3px en diagonale | `--dur` `--ease` |

## Code

```css
/* Titre empilé : chaque ligne monte derrière son cache */
.stack .ln { display: block; overflow: hidden; padding-block: 0.06em; }
.js .stack .ln > span { transform: translateY(108%); transition: transform var(--dur-slow) var(--ease) var(--d, 0ms); }
.js .in .stack .ln > span { transform: none; }

/* Lettres creuses : le remplissage sombre recouvre la moitié intérieure du contour */
.hollow { color: var(--bg); -webkit-text-stroke: calc(var(--stroke) * 2) var(--orange); paint-order: stroke fill; }

/* Bouton : remplissage sec */
.btn { transition: background-color var(--dur-fast) var(--ease-cut), color var(--dur-fast); }

/* Profondeur : deux variables posées par le script */
.figure { transform: translate3d(calc(var(--px, 0) * -14px), calc(var(--py, 0) * -8px), 0); transition: transform 600ms var(--ease); }
```

```js
// Décodage d'une valeur du tableau
const scramble = (el, text) => { let n = 0; clearInterval(el._t);
  el._t = setInterval(() => { n++;
    el.textContent = [...text].map((c, i) => i < n * 2 || c === ' ' ? c : glyphs[(Math.random() * glyphs.length) | 0]).join('');
    if (n * 2 >= text.length) clearInterval(el._t); }, 40); };

// Changement de silhouette : on charge dans le calque caché, puis on échange
next.onload = () => { next.classList.remove('is-off'); cur.classList.add('is-off'); };
next.src = looks[i].img;
```

## Performance

- **Rien ne tourne en continu** : aucune boucle au repos, aucune ligne de balayage, aucun grain animé.
- La silhouette du héros est une image de 44 % de la largeur, fondue sur ses bords par un **masque fixe** ; seule sa position change. Les changements de silhouette sont de simples fondus d'opacité.
- Les photos passent en noir et blanc **côté serveur d'images** (`sat=-100`), pas par `filter`.
- Les voiles sombres sont des dégradés fixes ; les panneaux translucides n'utilisent **pas de flou d'arrière-plan**.
- Le décodage n'écrit que quatre petits textes, pendant moins d'une demi-seconde.
- Seuls `transform`, `opacity` et des couleurs sont animés.
- Mesuré le 2026-10-03 dans un Chrome sans carte graphique (rendu logiciel, écran 144 Hz), 1440×852 : entrée du héros 121 images/s, changement de silhouette 82, suivi du pointeur 75, défilement de toute la page en 4s 110, filtre 145. Non mesuré : la fluidité à 390px.

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; transition-delay: 0s !important; }
  .js .rise, .js .stack .ln > span { opacity: 1; transform: none; }
  .figure { transform: none; }
  .card:hover img, .system:hover { transform: none; }
}
```

Le script lit aussi la préférence : les valeurs du tableau changent d'un coup, la silhouette ne suit plus le pointeur, le filtre trie sans attendre.
