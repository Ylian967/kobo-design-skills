# Mouvements génériques

Les mouvements de la partie commune sont peu nombreux et ont tous une cause : un défilement ou une action. Le mouvement de signature d'un skill (ce qui glisse, se trace, se resserre) vit dans sa couche de signature et suit `data-k-intensity`.

## Les trois mouvements communs

| Mouvement | Ce qu'il dit | Technique | Règle de performance |
|---|---|---|---|
| **Section collante** | « Ceci reste pendant que tu lis cela » | `position: sticky` ; aucun script pour coller | Aucun écouteur de défilement pour le collant lui-même. Le script qui dit le chapitre en cours lit la mise en page une fois par image (`requestAnimationFrame`, écouteur `passive`) et n'écrit qu'une variable (`--_progress`) et un attribut |
| **Apparition au défilement** | « Ceci vient d'entrer » — réservé à un élément par écran, jamais à tous | `IntersectionObserver` qui pose un attribut une seule fois, puis se détache ; transition CSS sur `opacity` et `transform` | Jamais d'écouteur `scroll` ; seulement `opacity` et `transform` (pas de `top`, `height`, `margin`, `filter`) ; pas de `will-change` permanent ; durée `--k-dur-base`, pas de retard en cascade au-delà de trois éléments |
| **Transition de page** | « On change de page, pas de site » | API View Transitions (`@view-transition { navigation: auto; }`) quand le navigateur l'a ; sinon, rien | Un fondu de `--k-dur-fast` au plus ; aucune bibliothèque ; aucune attente ajoutée avant la navigation ; sans prise en charge, la page change normalement |

Seul le premier est fourni en code (`structures/recit-collant/`). Les deux autres sont décrits : à écrire au moment où une page en a besoin.

## Règles

1. **Un mouvement a une cause.** Défilement, survol, appui, arrivée d'un contenu. Aucune boucle décorative.
2. **Pas le même fondu sur chaque bloc.** Si tout apparaît de la même façon, plus rien n'apparaît : un élément par écran, au plus.
3. **Le contenu ne dépend pas du mouvement.** Un élément qui « apparaît » est visible par défaut ; le script le cache puis le montre. Sans script, tout est là.
4. **`prefers-reduced-motion: reduce`** : plus de déplacement ni de zoom. Les changements d'état restent, instantanés. Le collant reste (ce n'est pas un mouvement, c'est une position).
5. **Le défilement n'est jamais confisqué** : pas de `preventDefault` sur la molette, pas de défilement par crans imposé, pas de `overflow: hidden` sur la page hors menu et modale.
6. **Rien ne grossit au survol.** Le survol dit « ceci est cliquable » par un fond, un filet ou un soulignement.
7. **Les survols sont protégés au toucher** : `@media (hover: hover)` autour des effets qui resteraient accrochés.
8. **Durées et courbes viennent du contrat** : `--k-dur-fast`, `--k-dur-base`, `--k-dur-slow`, `--k-ease-out`. Jamais une valeur écrite.

## Apparition au défilement : esquisse

```css
[data-k-reveal="pending"] { opacity: 0; transform: translateY(var(--k-space-4)); }
[data-k-reveal] { transition: opacity var(--k-dur-base) var(--k-ease-out), transform var(--k-dur-base) var(--k-ease-out); }
@media (prefers-reduced-motion: reduce) { [data-k-reveal] { transition: none; transform: none; } }
```

```js
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) { if (e.isIntersecting) { e.target.setAttribute('data-k-reveal', 'done'); io.unobserve(e.target); } });
}, { rootMargin: '0px 0px -10% 0px' });
document.querySelectorAll('[data-k-reveal]').forEach(function (el) { el.setAttribute('data-k-reveal', 'pending'); io.observe(el); });
```

L'attribut `pending` est posé par le script : sans script, l'élément reste visible.
