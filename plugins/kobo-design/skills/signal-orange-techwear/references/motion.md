# Signal Orange Techwear — mouvement

## Principes

Mécanique et précis : des **découpes** (clip-path) plutôt que des fondus, une **ligne de scan** comme sur un HUD, des états qui claquent en quelques pas (`--ease-snap`). Rien de rebondissant.

## Catalogue

| Moment | Effet | Durée | Courbe |
|---|---|---|---|
| Entrée du titre | Chaque ligne se découvre de gauche à droite (`clip-path: inset`) + glisse de 12px, décalage 90ms | 700ms | `--ease` |
| Mannequin | Ligne de scan orange qui va et vient de haut en bas | 3.2s aller | `--ease`, alternée |
| Lien de nav | Soulignement orange qui se déroule depuis la gauche | 320ms | `--ease` |
| Bouton contour | Remplissage orange, flèche ↗ qui avance de 2px | 160 / 320ms | `--ease` |
| Carte produit | Fond `--panel-2`, image `scale(1.07) rotate(-1deg)`, la couleur revient à 40 %, ligne orange qui balaie l'image | 700 / 900ms | `--ease` |
| Point « Profondeur on » | Clignotement | 1.6s | `steps(4)` |
| Interrupteur | Pastille qui glisse de 20px | 320ms | `--ease` |
| Bandeau | Défilement continu, pause au survol | 40s | linéaire |
| Chevron | Petit va-et-vient de 4px | 1.8s | `--ease` |

## Code

```css
.stack span { animation: slice var(--dur-slow) var(--ease) both; }
.stack span:nth-child(2) { animation-delay: 90ms; } /* … */
@keyframes slice { from { opacity: 0; clip-path: inset(0 100% 0 0); transform: translateX(-12px); } to { opacity: 1; clip-path: inset(0); transform: none; } }

.scan { position: absolute; left: 10%; right: 10%; height: 1px; background: linear-gradient(90deg, transparent, var(--accent), transparent); animation: scan var(--dur-scan) var(--ease) infinite alternate; }
@keyframes scan { from { top: 10%; } to { top: 86%; } }

.card .pic .sweep { position: absolute; inset: 0; z-index: 2; background: linear-gradient(transparent 0 calc(50% - 1px), var(--accent) calc(50% - 1px) 50%, transparent 50%) 0 -100% / 100% 200% no-repeat; opacity: 0; }
.card a:hover .pic .sweep { opacity: .5; animation: sweep 900ms var(--ease) both; }
@keyframes sweep { to { background-position: 0 100%; } }
```

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; }
  .scan { display: none; }
}
```
Titres affichés d'emblée, pas de scan, de balayage, de clignotement ni de bandeau en mouvement ; les états de survol changent de couleur uniquement.
