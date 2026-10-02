# Mint Street Basics — mouvement

## Principes

**Vif, sportif, un peu élastique.** Les titres montent comme sur une affiche qu'on déroule, le bandeau défile sans fin, les petits retours (panier, flèche, pastille) rebondissent avec `--ease-spring`. Les survols sont courts (`--dur-fast` 160ms), les entrées plus amples (`--dur-slow` 700ms). Le shot de référence étant une image fixe, ces mouvements sont une proposition (voir `source.md`).

## Catalogue

| Moment | Effet | Durée | Courbe | Notes |
|---|---|---|---|---|
| Chargement | Lignes du titre qui montent de 40 % en fondu, décalées de 80ms | 700ms | `--ease-out` | 3 lignes |
| Chargement | Arc vert qui tourne de -60° à 0 en fondu | 1.2s | `--ease-out` | |
| Continu | Bandeau défilant (piste dupliquée, -50 %) | 28s | linéaire | pause au survol |
| Continu | Étiquette flottante et bulles du collage qui montent de 8px | 5–6s | `ease-in-out` | décalées |
| Survol carte | Visuel +4px vers le haut, photo 1.04 (détouré : 1.05 et -2°) | 300ms / 700ms | `--ease-out` | |
| Survol pilule | Flèche +3px | 300ms | `--ease-spring` | appui `scale(.97)` |
| Pastille | Agrandissement 1.2 au survol, double anneau à la sélection | 160ms | `--ease-spring` | recolore le visuel |
| Ajout au panier | « Ajout… » 500ms → « Ajouté ✓ » sur bleu nuit 1,8s ; badge du panier à 1.3 puis retour | 300ms | `--ease-spring` | |
| Filtre | Cartes masquées / affichées | immédiat | — | ajouter un fondu de 300ms si la grille le permet |

## Code de référence

```css
@keyframes up { from { opacity: 0; transform: translateY(40%); } }
.hero h1 span { display: block; animation: up var(--dur-slow) var(--ease-out) both; }
.hero h1 span:nth-child(2) { animation-delay: 80ms; }
.hero h1 span:nth-child(3) { animation-delay: 160ms; }

@keyframes spin-in { from { opacity: 0; transform: rotate(-60deg); } }
.arc { animation: spin-in 1.2s var(--ease-out) both; }

@keyframes marquee { to { transform: translateX(-50%); } }
.band__track { animation: marquee var(--dur-marquee) linear infinite; }

.badge { transition: transform var(--dur-base) var(--ease-spring); }
.badge.bump { transform: scale(1.3); }
```

```js
// Badge du panier
count.classList.add('bump'); setTimeout(() => count.classList.remove('bump'), 300);
```

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; }
}
```
Titre et arc affichés directement, bandeau figé (le premier message reste lisible), bulles immobiles ; les changements d'état (pastille choisie, « Ajouté ✓ ») restent visibles.
