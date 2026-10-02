# Serif Bistro Green — mouvement

## Principes

Lent et appétissant, comme un service qui prend son temps : montées douces, fondus longs, rotations d'assiette. Courbe unique `--ease-out` (décélération franche, pas de rebond). Interactions à 180ms, apparitions à 800ms. Le shot est une image fixe : ce catalogue est une proposition cohérente avec le genre, pas une observation (voir `source.md`).

## Catalogue

| Moment | Effet | Durée | Courbe | Notes |
|---|---|---|---|---|
| Chargement de page | Lignes du titre qui montent de 0.3em + fondu, la 2e décalée de 120ms ; personnage qui monte de 30px | 800ms / 1s | `--ease-out` | personnage décalé de 200ms |
| Apparition au défilement | Blocs (`.reveal`) qui montent de 48px pendant leur entrée dans l'écran | lié au défilement | linéaire | `animation-timeline: view()`, sans JS ; contenu visible si non supporté |
| Survol de bouton | Couleur de fond + flèche qui glisse de 3px | 180ms | `--ease-out` | |
| Survol de carte de plat | L'assiette tourne de 25° | 800ms | `--ease-out` | |
| Bouton rond de carte | Rotation de -45° (↗ devient →) | 180ms | `--ease-out` | |
| Carrousel | Défilement doux jusqu'à la carte, point actif qui s'allonge | 320ms | `--ease-out` | `scroll-snap` |
| Changement de feuille | Aucun effet ajouté : le chevauchement suffit | — | — | |

## Code de référence

```css
@keyframes rise { from { opacity: 0; translate: 0 0.3em; } }
.headline .l1, .headline .l2 { animation: rise var(--dur-slow) var(--ease-out) both; }
.headline .l2 { animation-delay: 120ms; }

/* Apparition liée au défilement : jamais d'opacité 0 au repos, le contenu reste lisible sans support */
@keyframes reveal { from { translate: 0 48px; } }
@supports (animation-timeline: view()) {
  .reveal { animation: reveal linear both; animation-timeline: view(); animation-range: entry 0% entry 40%; }
}

.plate { transition: rotate var(--dur-slow) var(--ease-out); }
.dish:hover .plate { rotate: 25deg; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; }
  .dish:hover .plate { rotate: none; }
}
```

## Mouvement réduit

- Titre et personnage affichés directement, sans montée.
- Apparitions au défilement supprimées (contenu déjà en place).
- Assiettes fixes au survol ; seul le changement de couleur des boutons reste (instantané).
- Carrousel : saut direct à la carte (`behavior: 'auto'`).
