# Hyper Lime Street — mouvement

## Principes

Une seule courbe pour presque tout : **easeOutCubic** `cubic-bezier(0.215, 0.61, 0.355, 1)`, mesurée sur ~250 éléments, à 300 / 400 / 500 / 600ms selon la taille de l'élément. Animations nommées : `wordsLoop` (défilant 20s linéaire), `heartbeat` (0.8s, bouton musique), `tada` (attention), `rotation` (disque musique).

## Catalogue

| Moment | Effet | Durée | Courbe |
|---|---|---|---|
| Entrée d'une section | Le ruban glisse de 80px sur l'axe de sa diagonale, le bloc lime suit 100ms après | 600ms | `--ease` |
| Numéro de section | Monte de 30px + fondu | 500ms | `--ease` |
| Changement de vignette | Vignette active : contour lime + scale 1.06 ; image principale en fondu croisé | 400ms | `--ease` |
| Survol pilule | Passe en lime, texte noir | 300ms | `--ease` |
| Défilant | Translation continue | 20s | linéaire |
| Bouton musique | Disque qui tourne + battement | 0.8s / 6s | ease / linéaire |
| Pagination latérale | Le numéro roule vers le haut | 300ms | `--ease` |

## Code de référence

```css
.marquee { overflow: hidden; white-space: nowrap; }
.marquee > span { display: inline-block; padding-right: 2em; animation: wordsLoop var(--marquee) linear infinite; }
.marquee:hover > span { animation-play-state: paused; }
@keyframes wordsLoop { to { transform: translateX(-100%); } }
.reveal-in { animation: slideIn var(--dur-4) var(--ease) both; }
@keyframes slideIn { from { transform: translate(-80px, 80px); opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .marquee > span, .reveal-in { animation: none; } }
```

## Mouvement réduit

Rubans et blocs affichés directement ; défilant figé (texte tronqué avec « … ») ; pas de disque qui tourne.
