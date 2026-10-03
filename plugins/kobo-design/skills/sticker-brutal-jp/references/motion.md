# Sticker Brutal JP — mouvement

Deux sources :

- **Mesuré sur le site en ligne** (kristi.digital/jp, le 2026-10-03) : le site ne contient **aucune animation d'entrée ni boucle** ; tout son mouvement tient dans les **survols**, tous sur la même courbe et la même durée.
- **Proposé par le skill** : l'arrivée des autocollants, le changement de langue, le décalage au défilement, l'appui du bouton.

Le geste de base est celui d'un autocollant qu'on **décolle** : l'élément monte en diagonale et son ombre s'allonge.

## Mesuré

| Élément | Au survol | Transition |
|---|---|---|
| Bouton principal, fiche de service, fiche d'article | ombre de `3px 3px 0` à `6px 6px 0`, `translate(-4px, -4px)` | `box-shadow` et `transform`, 250ms `cubic-bezier(0.645, 0.045, 0.355, 1)` |
| Lien de navigation (pilule) | contour 1px, ombre `3px 3px 0`, fond blanc, `translate(-2px, -2px)` ; fond jaune pour « Contact » | 250ms, même courbe |
| Logo | fond blanc, ombre `6px 6px 0`, `translate(-2px, -2px)` | idem |
| Champ de formulaire | ombre `6px 6px 0`, sans déplacement ; contour #5c5b66 quand il est actif | idem |

## Proposé

| Moment | Effet | Durée / courbe |
|---|---|---|
| Arrivée de la page | Les autocollants du cadre apparaissent un à un en tournant (de 0 à leur taille) ; les bulles du portrait de même ; le portrait monte de 30px ; le katakana vertical se dévoile de haut en bas | `--dur-pop` (600ms) `--ease-pop`, 80 à 120ms d'écart ; katakana 900ms `--ease` |
| Textes et fiches | Montée de 24px en fondu à l'entrée de chaque section | 600 à 700ms `--ease-pop` |
| Changement de langue | Chaque texte visible est remplacé et « rebondit » (8px, 0.98 → 1) ; le point du drapeau change de couleur et grossit | 380ms `--ease-pop` |
| Appui sur un bouton | L'élément s'enfonce : `translate(3px, 3px)`, ombre à 0 | 80ms |
| Pilule de langue | Au survol, se soulève de 3px et penche de −2° | `--dur` `--ease` |
| Autocollants au défilement | Chacun glisse à sa vitesse (−0.08 à 0.1) | lié au défilement |
| Tuile de service | Penche de −5° et grossit à 1.04 au survol de la fiche | `--dur-pop` `--ease-pop` |
| Image de projet | Se redresse (de ±3° à 0°) et grossit à 1.03 | `--dur-pop` `--ease-pop` |
| Flèche des liens | Avance de 6px | `--dur` `--ease` |

## Code

```css
/* L'effet autocollant : une seule classe pour tout ce qui se décolle */
.brut { border: var(--bw) solid var(--ink); box-shadow: var(--shadow);
  transition: box-shadow var(--dur) var(--ease), transform var(--dur) var(--ease), background-color var(--dur) var(--ease); }
a.brut:hover, button.brut:hover { box-shadow: var(--shadow-up); transform: translate(var(--lift), var(--lift)); }
a.brut:active, button.brut:active { box-shadow: 0 0 0 0 var(--ink); transform: translate(3px, 3px); transition-duration: 80ms; }

/* Arrivée d'un autocollant : c'est le dessin qui grossit, le conteneur garde sa place */
.js .sticker svg { transform: scale(0) rotate(-40deg); transition: transform var(--dur-pop) var(--ease-pop) var(--d, 0ms); }
.js .is-ready .sticker svg { transform: none; }

/* Texte qui change de langue */
.swapping { animation: swap 380ms var(--ease-pop); }
@keyframes swap { 0% { opacity: 0; transform: translateY(8px) scale(0.98); } }
```

```js
// Autocollants : léger décalage, seulement ceux qui sont près de l'écran
const move = () => { tick = false; const y = scrollY, h = innerHeight;
  stickers.forEach(s => { if (s.top > y - 300 && s.top < y + h + 300)
    s.el.style.setProperty('--ty', ((y + h / 2 - s.top) * s.speed).toFixed(1) + 'px'); }); };
addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(move); } }, { passive: true });
```

## Performance

- **Rien ne tourne en continu** : pas de flottement permanent des autocollants, pas de boucle.
- Les autocollants sont de petits SVG (64 à 150px) ; leur ombre est **un second tracé décalé**, pas un `filter`.
- Le portrait est fondu dans le rose par `mix-blend-mode: multiply` sur une image fixe : il n'est jamais animé une fois en place.
- Le défilement n'écrit qu'une variable CSS par autocollant visible, au plus une fois par image.
- Le changement de langue ne rejoue l'animation que sur les textes visibles à l'écran.
- Seuls `transform`, `opacity`, `box-shadow`, `clip-path` (une fois, sur le katakana) et des couleurs sont animés.
- Mesuré le 2026-10-03 dans un Chrome sans carte graphique (rendu logiciel, écran 144 Hz), 1440×900 : arrivée 131 images/s, changement de langue 129, défilement de toute la page en 5s 138. Non mesuré : la fluidité à 390px.

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; transition-delay: 0s !important; }
  .js .rise, .js .art .portrait { opacity: 1; transform: none; }
  .js .sticker svg { transform: none; }
  .js .art .pop { transform: rotate(var(--r1, 0deg)); }
  .js .vertical { clip-path: none; }
  .sticker { transform: rotate(var(--rot, 0deg)); }
}
```

Le script lit aussi la préférence : les autocollants ne se décalent plus au défilement et les textes changent de langue sans rebond. Les survols restent, mais instantanés.
