# Sticker Brutal JP — mouvement

## Principes

Physique et jouet : les objets sont des autocollants épais posés sur la page. Ils **montent** quand on les survole, **s'écrasent** sur leur ombre quand on appuie, **sautent** en place quand ils apparaissent (ressort léger). Rien de flou, rien de lent : 120–240ms pour les interactions, 600ms pour les apparitions. Le shot est une image fixe : ce catalogue est une proposition cohérente avec le genre, pas une observation (voir `source.md`).

## Catalogue

| Moment | Effet | Durée | Courbe | Notes |
|---|---|---|---|---|
| Chargement de page | Autocollants du héros qui « pop » (scale 0.6 → 1, opacité), décalés de 80ms | 600ms | `--ease-spring` | 5 objets max |
| Apparition au défilement | Cartes qui montent de 16px et tournent de 2° → 0 | 400ms | `--ease-spring` | une fois, `IntersectionObserver` |
| Survol de bouton | Monte de 2px, ombre 5 → 7px | 120ms | `--ease-out` | |
| Appui de bouton | Descend de 5px, ombre → 0 (« écrasé ») | 120ms | `--ease-out` | aussi au clavier (`:active`) |
| Survol de carte | Monte de 4px, rotation -1°, ombre 8px | 240ms | `--ease-spring` | |
| Autocollants décoratifs | Flottement vertical de 10px, aller-retour | 6s | `--ease-out` | décalages négatifs différents |
| Bande défilante | Translation continue de -50 % | 26s | linéaire | contenu dupliqué |
| Sélecteur de langue | Le libellé bascule, le point rouge fait un petit saut | 240ms | `--ease-spring` | |
| Ouverture du menu mobile | Panneau qui tombe de -8px avec rotation 1° → 0 | 240ms | `--ease-spring` | |

## Code de référence

```css
@keyframes pop { from { opacity: 0; scale: 0.6; } }
@keyframes bob { to { translate: 0 -10px; } }
@keyframes tape { to { transform: translateX(-50%); } }

.pop { animation: pop var(--dur-slow) var(--ease-spring) both; }
.pop:nth-child(2) { animation-delay: 80ms; }
.float { animation: bob 6s var(--ease-out) infinite alternate; }
.tape__track { display: flex; width: max-content; animation: tape 26s linear infinite; }

.btn { transition: translate var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out); }
.btn:hover { translate: -2px -2px; box-shadow: 7px 7px 0 0 var(--ink); }
.btn:active { translate: 5px 5px; box-shadow: 0 0 0 0 var(--ink); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; }
  .btn:hover, .card:hover { translate: none; rotate: none; }
}
```

## Mouvement réduit

- Pop, flottement et bande défilante : supprimés, objets affichés à leur place finale.
- Survols : seule l'ombre change (pas de déplacement ni de rotation).
- Appui : conservé en instantané (c'est un retour d'état, pas une animation décorative).
- Menu mobile : apparition sans déplacement.
