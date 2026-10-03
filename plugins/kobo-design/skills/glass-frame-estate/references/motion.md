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

---

## Relevé sur le site en ligne (2026-10-03)

| Moment | Effet | Durée / courbe | Statut |
|---|---|---|---|
| Survol des liens, boutons, lignes de service | Changement de **couleur** seulement | 400ms `cubic-bezier(0.44, 0, 0.56, 1)` (`--dur-color`, `--ease-color`) | **Mesuré** (seule transition CSS de la page, ×23) |
| Titres de section | Texte d'abord gris clair, se remplit en noir mot à mot au défilement | lié au défilement | Observé |
| Compteurs | Chaque chiffre défile verticalement (odomètre) jusqu'à la valeur | ≈ 1.2s | Observé |
| Étapes | Section collante : les cartes photo s'empilent, les index « 01. 02. 03. » se rangent en haut | lié au défilement | Observé |
| Menu | Voile flouté 5px + liens centrés en fondu ; MENU → FERMER | ≈ 400ms | Flou mesuré, durée estimée |
| Héros | Photo plein écran, mot-marque légèrement plus bas au chargement puis en place | ≈ 1s | Observé |

```css
.reveal-words span { color: var(--line); transition: color var(--dur-color) var(--ease-color); }
.reveal-words span.is-in { color: var(--ink); }   /* classe ajoutée mot par mot par IntersectionObserver */
```
Mouvement réduit : titres directement noirs, compteurs à leur valeur finale, étapes affichées les unes sous les autres sans section collante.
