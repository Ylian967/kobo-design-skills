# Showroom Bento — mouvement

## Principes

**Fluide et produit** : comme une platine de showroom, le produit sort et entre par glissement latéral avec un léger recul d'échelle ; l'interface autour reste immobile. Les survols sont courts (`--dur-fast` 160ms), les changements de modèle plus amples (`--dur-slide` 640ms). Le shot de référence étant une image fixe, ces mouvements sont une proposition (voir `source.md`).

## Catalogue

| Moment | Effet | Durée | Courbe | Notes |
|---|---|---|---|---|
| Chargement | Produit qui entre de -6 % en fondu | 640ms | `--ease-out` | |
| Chargement | Tuiles du bento : fondu + montée 16px, décalées de 40ms | 640ms | `--ease-out` | 8 tuiles → 280ms d'étalement |
| Modèle suivant / précédent | Produit qui sort (translateX ∓30 %, scale .8, fondu) puis le suivant entre du côté opposé | 280ms + 420ms | `--ease-inout` puis `--ease-out` | titre, prix, compteur mis à jour entre les deux |
| Voisins | Changement de teinte vers celle du modèle adjacent ; opacité .5 → .75 au survol | 320ms | `--ease-out` | |
| Changement de couleur | Fondu de la peinture (`fill` / `stroke`) sur le profil et la vue de face | 320ms | `--ease-inout` | avec des photos : fondu enchaîné entre images |
| Pastille | Agrandissement 1.12 au survol / à la sélection, anneau + coche | 160ms | `--ease-out` | |
| Survol pilule / bouton rond | Fond `--soft`, appui `scale(.97 / .94)` | 160ms | `--ease-out` | |
| Survol tuile accessoire | Visuel qui tourne de -4° et grossit de 4 % | 320ms | `--ease-out` | |

## Code de référence

```css
@keyframes rise { from { opacity: 0; transform: translateY(16px); } }
@keyframes drive-in { from { opacity: 0; transform: translateX(-6%); } }
.bento > * { animation: rise var(--dur-slide) var(--ease-out) both; }
.bento > :nth-child(2) { animation-delay: 40ms; } /* … +40ms par tuile */
.bike--main { animation: drive-in var(--dur-slide) var(--ease-out) both; }
.pt { fill: var(--paint); transition: fill var(--dur-base) var(--ease-inout); }
```

```js
// Changement de modèle (Web Animations API)
function go(dir) {
  if (reduce) { index += dir; render(); return; }
  bike.animate([{ transform: 'none', opacity: 1 }, { transform: `translateX(${-dir * 30}%) scale(.8)`, opacity: 0 }],
    { duration: 280, easing: 'cubic-bezier(0.65, 0, 0.35, 1)' }).onfinish = () => {
      index += dir; render();
      bike.animate([{ transform: `translateX(${dir * 30}%) scale(.8)`, opacity: 0 }, { transform: 'none', opacity: 1 }],
        { duration: 420, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
    };
}
```

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; }
}
```
- Changement de modèle en coupe franche (contenu remplacé, compteur annoncé).
- Bento et produit affichés directement.
- Changement de teinte instantané ; survols sans échelle.
