# Glass Frame Estate — mouvement

## Principes

Lent, photographique, sans rebond. La photo fait sa **mise au point** (léger dézoom), le texte **monte** doucement, les survols déplacent à peine (flèche de 4px, zoom de 4 %). Jamais de parallaxe agressive ni de défilement piloté.

## Catalogue

| Moment | Effet | Durée | Courbe |
|---|---|---|---|
| Arrivée du héros | Photo de `scale(1.08)` à 1 | 1.4s | `--ease` |
| Titre du héros | Montée de 16px + fondu, délai 200ms | 900ms | `--ease` |
| Carte verre | Montée de 16px + fondu, délai 380ms | 900ms | `--ease` |
| Survol bouton | La flèche avance de 4px | 420ms | `--ease` |
| Survol rond MENU | Les points tournent de 45° | 420ms | `--ease` |
| Survol annonce | Photo `scale(1.04)` dans son cadre | 900ms | `--ease` |
| Survol portrait | Désaturation retirée | 420ms | `--ease` |
| Ouverture du menu | Panneau plein écran en verre, fondu + flou de 0 à `--blur-glass` | 420ms | `--ease-in-out` |

## Code

```css
.frame .photo { animation: settle var(--dur-photo) var(--ease) both; }
.hero-title { animation: up var(--dur-slow) var(--ease) 200ms both; }
.agent { animation: up var(--dur-slow) var(--ease) 380ms both; }
@keyframes settle { from { transform: scale(1.08); } }
@keyframes up { from { opacity: 0; transform: translateY(16px); } }
.listing .pic img { transition: transform var(--dur-slow) var(--ease); }
.listing a:hover .pic img { transform: scale(1.04); }
```

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; }
}
```
La photo est affichée nette d'emblée, les textes sont visibles sans montée, les survols changent de couleur sans mouvement.
