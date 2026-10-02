# {{Nom du style}} — mouvement

## Principes

{{Caractère du mouvement : nerveux, lent, mécanique, élastique… Durées et courbes mesurées.}}

## Catalogue

| Moment | Effet | Durée | Courbe | Notes |
|---|---|---|---|---|
| Chargement de page | | | | |
| Apparition au défilement | | | | |
| Survol de bouton | | | | |
| Survol de carte | | | | |
| Ouverture de modal | | | | |
| Changement de page | | | | |

## Code de référence

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 1ms !important; transition-duration: 1ms !important; }
}
```

## Mouvement réduit

{{Ce qui remplace chaque effet quand le mouvement est réduit.}}
