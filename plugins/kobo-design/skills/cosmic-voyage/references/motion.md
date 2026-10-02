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

## Mouvement réduit

Pas d'intro (affichage direct), pas de flottement ni d'anneau qui tourne ; changement de personnage en fondu simple de 150ms.
