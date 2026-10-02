# Pocket Device Noir — mouvement

## Principes

**Discret, mécanique, précis.** On anime ce qu'un objet réel ferait : une molette qui tourne, un voyant qui respire, un objet qui flotte au-dessus de son ombre. L'interface, elle, apparaît simplement (fondu + 16px). Survols à `--dur-fast` 150ms, entrées à `--dur-slow` 800ms. Le shot de référence étant une image fixe, ces mouvements sont une proposition (voir `source.md`).

## Catalogue

| Moment | Effet | Durée | Courbe | Notes |
|---|---|---|---|---|
| Chargement | Titre, sous-titre, boutons qui montent de 16px en fondu, décalés de 100ms | 800ms | `--ease-out` | carte d'offre à 400ms |
| Continu | Voyant rouge de l'écran qui pulse (opacité 1 → .25) | 1.6s | `ease-in-out` | éteint en veille |
| Continu | Rayons du manifeste qui tournent | 120s | linéaire | presque imperceptible |
| Continu | Objet de la révélation qui flotte de 10px | 6s | `ease-in-out` | |
| Continu | Barres de l'onde sonore (échelle .35 → 1) | 1.2s | `ease-in-out` alterné | décalées |
| Survol objet | Molette qui tourne de 40° | 800ms | `--ease-out` | |
| Clic objet / bouton | Écoute ↔ veille : texte de l'écran et voyant | immédiat | — | `aria-pressed` sur le bouton |
| Survol bouton | Fond éclairci ou verre plus opaque ; appui 1px | 150ms | `--ease-out` | |
| Survol panneau | Contour de verre plus visible | 300ms | — | |
| Fermer l'offre | La carte disparaît | immédiat | — | ajouter un fondu de 300ms si souhaité |

## Code de référence

```css
@keyframes fade-up { from { opacity: 0; transform: translateY(16px); } }
.hero h1 { animation: fade-up var(--dur-slow) var(--ease-out) both; }
.hero__sub { animation: fade-up var(--dur-slow) var(--ease-out) 100ms both; }

@keyframes pulse { 50% { opacity: .25; } }
.device__lcd span::before { animation: pulse var(--dur-pulse) ease-in-out infinite; }

@keyframes turn { to { rotate: 360deg; } }
.rays { animation: turn 120s linear infinite; }

@keyframes hover-y { 50% { translate: 0 -10px; } }
.reveal .device { animation: hover-y 6s ease-in-out infinite; }

.device__dial { transition: transform var(--dur-slow) var(--ease-out); }
.device:hover .device__dial { transform: rotate(40deg); }
```

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; }
}
```
Tout est affiché d'emblée ; voyant fixe, rayons et objet immobiles, onde figée ; les changements d'état (écoute / veille, « Réservé ✓ ») restent visibles.
