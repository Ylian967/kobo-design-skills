# Lore Frame Editorial — mouvement

## Principes

Narratif et posé : les éléments arrivent quand le chapitre commence, avec une courbe ease-in-out franche. Catégories de la fiche Awwwards : animation, défilement, storytelling, interaction, expérimental.

## Catalogue

| Moment | Effet | Durée | Courbe |
|---|---|---|---|
| Chargement | Logo tracé (`stroke-dashoffset`) puis épaississement | 1.4s + 400ms | `--ease` |
| Changement de chapitre | Cadre qui passe clair ↔ sombre, étoile qui tourne de 45° | 700ms | `--ease` |
| Manifeste | Chaque ligne monte de 40px depuis un masque (`clip-path: inset`) | 700ms, décalage 120ms | `--ease-out` |
| Vignettes | Parallaxe légère (vitesse 0.85 à 1.15 selon la vignette) | continu | — |
| Terminal | Lignes tapées (20ms/lettre), curseur clignotant | — | steps |
| Survol vignette | Image zoom 1.04 dans son masque | 250ms | `--ease` |

## Code de référence

```css
.line { display: block; overflow: hidden; }
.line > span { display: block; transform: translateY(100%); transition: transform var(--dur) var(--ease-out); }
.is-in .line > span { transform: none; }
.is-in .line:nth-child(2) > span { transition-delay: 120ms; } .is-in .line:nth-child(3) > span { transition-delay: 240ms; }
```
État par défaut visible si le script ne tourne pas : n'appliquer le `translateY` qu'à `html.js .line > span`.

## Mouvement réduit

Logo affiché plein directement, pas de parallaxe, lignes visibles sans montée, terminal affiché d'un coup.

---

## Relevé sur le site (2026-10-03)

| Moment | Effet | Statut |
|---|---|---|
| Labels mono, pied | Décodage lettre par lettre (caractères aléatoires qui se fixent) | Observé dans le DOM, durée estimée |
| Navigation | Libellé doublé qui roule au survol | Mesuré (structure) |
| Grands numéros | Chiffres qui changent (03 → 07 → 10) au défilement | Observé |
| Graisse | Police variable (125–950) chargée : la graisse du manifeste peut varier | Mesuré (polices), animation supposée |
