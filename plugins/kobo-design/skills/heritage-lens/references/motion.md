# Heritage Lens — mouvement

## Principes

Lent, solennel, comme un travelling de documentaire. Technologies listées par la fiche Awwwards : WebGL, GSAP, Vue.js, 360°, 3D, défilement, storytelling.

## Catalogue

| Moment | Effet | Durée | Courbe |
|---|---|---|---|
| Entrer | Le titre se dissout, la caméra avance vers la cité | 2.4s | `--ease` |
| Lieu suivant | Fondu enchaîné + léger zoom avant (1.06) de la nouvelle scène | 1.2s | `--ease` |
| Titre de lieu | Lettres qui apparaissent en fondu une à une (30ms) | 600ms | `--ease` |
| Lentille | Suit la souris avec lissage (lerp 0.15) | continu | — |
| Lentille ouverte | `clip-path: circle()` qui s'étend à tout l'écran | 800ms | `--ease` |
| Anneau Entrer | L'anneau extérieur s'écarte au survol | 250ms | `--ease` |

## Mouvement réduit

Pas de travelling : coupes en fondu de 200ms ; lentille fixe (pas de suivi de souris) ; titres affichés d'un coup.

---

## Observé sur le site (2026-10-03)

| Moment | Effet | Statut |
|---|---|---|
| Prologue | Phrase qui se fond dans la suivante à chaque cran de défilement | Observé, ≈ 600ms |
| Lumière | Étalonnage du décor qui passe de l'aube bleue à l'or au fil du prologue | Observé, lié au défilement |
| Entrée | Clic « Entrez » → caméra qui avance vers la cité | Observé, ≈ 3s |
| Progression | Fine barre orange sur le bord droit | Observé |
