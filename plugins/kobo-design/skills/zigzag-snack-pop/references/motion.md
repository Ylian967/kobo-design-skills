# Zigzag Snack Pop — mouvement

## Principes

Énergique mais bref : des **rebonds** courts (`--ease-pop`), des boutons qui se **décollent** et s'**écrasent** comme un autocollant, un seul élément en mouvement continu (le tampon). Rien ne glisse lentement, rien n'est flou.

## Catalogue

| Moment | Effet | Durée | Courbe |
|---|---|---|---|
| Entrée du héros | Surtitre, titre, accroche, actions montent de 24px avec -2° de rotation, décalage 80ms | 600ms | `--ease-pop` |
| Survol bouton jaune | Se décolle : `translate(-2px,-2px)`, ombre 6 → 8px | 140ms | `--ease-out` |
| Pression bouton | S'écrase : `translate(5px,5px)`, ombre 1px | 140ms | `--ease-out` |
| Survol pilule | `rotate(-4deg) scale(1.05)` | 280ms | `--ease-pop` |
| Survol carte produit | `translateY(-6px) rotate(-1deg)` | 280ms | `--ease-pop` |
| Ajout au panier | La barre passe en brun/jaune, compteur +1 | 140ms | — |
| Tampon | Rotation continue 360° | 14s | linéaire |

## Code

```css
.rise { animation: rise var(--dur-slow) var(--ease-pop) both; }
.rise:nth-child(2) { animation-delay: 80ms; } .rise:nth-child(3) { animation-delay: 160ms; } .rise:nth-child(4) { animation-delay: 240ms; }
@keyframes rise { from { opacity: 0; transform: translateY(24px) rotate(-2deg); } }

.stamp svg { animation: spin var(--dur-stamp) linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
```

N'utiliser l'entrée qu'au chargement (héros) : les sections plus bas restent visibles sans JavaScript.

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; }
  .rise { opacity: 1 !important; transform: none !important; }
}
```
Le tampon reste fixe, les états de survol changent sans déplacement perceptible, le héros est affiché d'emblée.

---

## Vu dans la vidéo du shot (2026-10-03)

| Moment | Effet | Statut |
|---|---|---|
| Bande d'ingrédients | Défilement horizontal continu des pastilles (marquee), pastilles coupées aux bords | Observé, vitesse estimée ≈ 40px/s |
| Carte produit au survol | La carte se soulève, la barre d'achat prend son ombre dure | Observé, durée estimée `--dur` |
| Tampon | Rotation continue | Observé (déjà dans le catalogue) |
