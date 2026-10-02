# Alpine Glass Expedition — mouvement

## Principes

Le mouvement imite **l'air de montagne** : lent, ample, sans rebond. La photo « respire » (léger dézoom à l'arrivée, brume qui dérive), le texte se pose comme de la neige (montée courte + fondu), l'interface répond avec douceur (500ms, sortie très amortie). Rien ne clignote, rien ne rebondit.

Rien de ceci n'est visible sur le shot (image fixe) : c'est une proposition cohérente avec le langage visuel.

## Catalogue

| Moment | Effet | Durée | Courbe |
|---|---|---|---|
| Arrivée du héros | Photo qui dézoome de 1.08 à 1 | 2.4s | `--ease` |
| Surtitre, titre, texte | Montée de 24px + fondu, décalés (100, 200, 320, 480ms) | 1.2s | `--ease` |
| Bouton de verre, bas du héros | Même entrée, départ 700ms | 1.2s | `--ease` |
| Brume | Dérive horizontale ±3 %, aller-retour, deux bandes en sens opposés | 40s, infini | `--ease-in-out` |
| Survol bouton de verre | `scale(1.06)`, flèche ↗ en diagonale de 3px | 500ms | `--ease` |
| Survol pilule | Fond plus clair + ombre ; flèche ↗ de 2px | 200ms / 500ms | `--ease` |
| Lien de nav | Filet qui se trace de gauche à droite | 500ms | `--ease` |
| Carte de voyage | Image qui zoome à 1.05 ; rond ↗ qui pivote de 45° | 1.2s / 500ms | `--ease` |
| Panneaux d'étape | Entrée au défilement (montée + fondu) | lié au défilement | linéaire |
| Parallaxe (option) | Calques du paysage à 0.1 / 0.2 / 0.35 de la vitesse de défilement | continu | — |

## Code

```css
@keyframes drift    { from { transform: translateX(-3%); } to { transform: translateX(3%); } }
@keyframes up       { from { opacity: 0; transform: translateY(24px); } }
@keyframes zoom-out { from { transform: scale(1.08); } }

.drift { animation: drift var(--dur-drift) var(--ease-in-out) infinite alternate; }

@media (prefers-reduced-motion: no-preference) {
  .land { animation: zoom-out 2.4s var(--ease) both; }
  .kicker, .hero h1 span, .hero-text { animation: up var(--dur-slow) var(--ease) both; }
  .kicker { animation-delay: 100ms; }
  .hero h1 span:first-child { animation-delay: 200ms; }
  .hero h1 span:last-child { animation-delay: 320ms; }
  .hero-text { animation-delay: 480ms; }
  .hero .glass-btn, .hero-foot { animation: up var(--dur-slow) var(--ease) 700ms both; }

  @supports (animation-timeline: view()) {
    .step { animation: up linear both; animation-timeline: view(); animation-range: entry 0% entry 60%; }
  }
}
```

Parallaxe (option, en JS) : sur `scroll`, via `requestAnimationFrame`, appliquer `transform: translateY(calc(var(--y) * k))` à chaque calque du SVG ; ne l'activer que si `matchMedia('(prefers-reduced-motion: no-preference)')` est vrai.

`backdrop-filter` coûte cher : ne pas animer le flou lui-même, n'animer que `transform` et `opacity` des éléments en verre.

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; }
  html { scroll-behavior: auto; }
}
```
La photo est fixe, la brume immobile, les textes apparaissent directement ; les survols changent seulement les couleurs.

## React Native

- Entrées : Reanimated `FadeInDown.duration(1200).delay(n)` (layout animations).
- Brume : `withRepeat(withTiming(1, { duration: 40000, easing: Easing.inOut(Easing.cubic) }), -1, true)` sur `translateX`.
- `AccessibilityInfo.isReduceMotionEnabled()` → pas d'animation, pas de dérive.
