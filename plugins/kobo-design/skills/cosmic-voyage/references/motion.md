# Cosmic Voyage — mouvement

## Principes

Doux et « flottant ». Mesuré : `opacity 0.2s ease`, `opacity 0.3s ease-out`, `all 0.2s linear` sur les boutons, `width 0.4s ease`, transitions de panneau `0.5s ease-in-out`, animations `float-1…5` (0.3–0.7s) sur des éléments qui flottent, `scroll` 2s linéaire pour l'indicateur « Scroll Down », `rotation` pour les anneaux.

## Catalogue

| Moment | Effet | Durée | Courbe |
|---|---|---|---|
| Arrivée sur le site | Intro « hyperespace » : traînées d'étoiles qui partent du centre (canvas), puis fondu au noir | 2–6s, sautable | linéaire puis ease |
| Apparition de l'accueil | Fondu de l'illustration + montée du bloc de téléchargement | 500ms | `--ease-out` |
| Changement de personnage | Illustration qui glisse de 40px + fondu, texte en fondu décalé de 100ms | 500ms | ease-in-out |
| Éléments décoratifs | Flottement vertical ±6px en boucle | 3–5s | ease-in-out |
| Indicateur Scroll Down | Trait qui se remplit de haut en bas en boucle | 2s | linéaire |
| Survol carte | Décalage 4px + fond plus clair | 300ms | ease |
| Bouton lecture | Anneau dégradé qui tourne | 6s | linéaire |

### Mondes et mobile (observés le 2026-10-02 ; durées **estimées**)

| Moment | Effet | Durée | Courbe |
|---|---|---|---|
| Arrivée sur la carte | Orbites tracées (`stroke-dashoffset` de la longueur à 0), puis les mondes apparaissent en fondu + `scale(.6 → 1)` décalés de 80ms | 1200ms + 400ms | `--ease-out` |
| Dérive de la carte | Le champ d'étoiles 3D tourne très lentement, parallaxe au pointeur ; les orbites et les mondes restent fixes (sinon les mondes quittent leur orbite) | continu | linéaire |
| Survol d'un monde | Halo qui grandit, icône `scale(1.12)` | 300ms | `--ease-out` |
| Ouverture d'une fiche | Fondu au noir 200ms, la fiche entre en fondu, le titre monte de 16px | 500ms | ease-in-out (mesuré : transitions de panneau 0.5s ease-in-out) |
| Carrousel de lieux | Les images glissent d'une position ; la nouvelle centrale perd son voile | 500ms | ease-in-out |
| Menu mobile | Hamburger → croix ; tiroir en fondu + glissement de 12px | 300ms | `--ease` |
| Bouton jaune mobile | Lueur qui pulse (24px ↔ 36px) | 2.4s en boucle | ease-in-out |
| Chevron ⌄ | Descend de 6px et revient (proche de `moreDown` relevé dans les keyframes) | 1.6s en boucle | ease-in-out |

## Code de référence

```js
// Hyperespace : traînées radiales sur canvas, sautable et désactivé si mouvement réduit
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
function warp(canvas, ms = 2500) {
  if (reduce) return Promise.resolve();
  const ctx = canvas.getContext('2d'); const stars = Array.from({ length: 400 }, () => ({ a: Math.random() * Math.PI * 2, r: Math.random() * 40, v: 2 + Math.random() * 10 }));
  return new Promise(done => { const t0 = performance.now(); (function frame(t) {
    const { width: w, height: h } = canvas; ctx.fillStyle = 'rgb(0 0 0 / .35)'; ctx.fillRect(0, 0, w, h); ctx.strokeStyle = 'rgb(233 233 233 / .8)';
    for (const s of stars) { const r0 = s.r; s.r += s.v; s.v *= 1.04; ctx.beginPath(); ctx.moveTo(w/2 + Math.cos(s.a) * r0, h/2 + Math.sin(s.a) * r0); ctx.lineTo(w/2 + Math.cos(s.a) * s.r, h/2 + Math.sin(s.a) * s.r); ctx.stroke(); if (s.r > Math.max(w, h)) { s.r = Math.random() * 40; s.v = 2 + Math.random() * 10; } }
    t - t0 < ms ? requestAnimationFrame(frame) : done(); })(t0); });
}
```

## Code de référence — orbites tracées

```css
/* <ellipse class="o" pathLength="1"> pour les orbites pleines ; les pointillées n'ont pas de pathLength */
.orbits .o:not(.o--dim) { stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw 1.2s var(--ease-out) forwards; }
.orbits .o--dim { stroke-dasharray: 4 8; stroke-dashoffset: 0; animation: fadeIn 1.2s var(--ease-out) both; }
@keyframes draw { to { stroke-dashoffset: 0; } }
.world { animation: pop .4s var(--ease-out) both; animation-delay: calc(1s + var(--i) * 80ms); }
@keyframes pop { from { opacity: 0; scale: .6; } }
@media (prefers-reduced-motion: reduce) { .orbits .o, .world { animation: none; stroke-dashoffset: 0; } }
```

## Mouvement réduit

Carte des mondes affichée d'emblée (orbites tracées, pas de dérive ni de parallaxe) ; carrousel de lieux sans glissement ; bouton jaune sans pulsation, chevron fixe. Pas d'intro (affichage direct), pas de flottement ni d'anneau qui tourne ; changement de personnage en fondu simple de 150ms.
