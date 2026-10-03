# Glacial Mono 3D — mouvement

## Principes

Lent, fluide et silencieux pour la caméra (courbe expo-out), nerveux pour le texte (brouillage). Catégories relevées sur la fiche Awwwards : animation, transitions, défilement infini, 3D, défilant de texte.

## Catalogue

| Moment | Effet | Durée | Courbe |
|---|---|---|---|
| Chargement | Chaîne ASCII qui change toutes les 80ms | jusqu'à la fin | — |
| Arrivée | Brouillard qui se lève (opacité du voile 1 → 0) + objet qui s'illumine | 1.6s | `--ease` |
| Défilement | Caméra interpolée vers la position du chapitre (lerp 0.08 par image) | continu | — |
| Changement de chapitre | Texte de la rubrique brouillé puis fixé | 10 × 40ms | steps |
| Survol bouton | Crochets qui se resserrent de 3px | 200ms | `--ease` |
| Carrousel | L'objet se désagrège en particules puis se reforme | 1.2s | `--ease` |
| Neige | Chute lente | 8–14s | linéaire |

## Three.js (squelette)

```js
// scène, brouillard, caméra pilotée par le défilement
scene.fog = new THREE.Fog(0xb6bac5, 4, 18);
const target = new THREE.Vector3(); let progress = 0;
addEventListener('scroll', () => { progress = scrollY / (document.body.scrollHeight - innerHeight); });
function frame() { const p = curve.getPointAt(progress); camera.position.lerp(p, 0.08); camera.lookAt(target); renderer.render(scene, camera); requestAnimationFrame(frame); }
```

## Mouvement réduit

Coupes franches entre chapitres (pas de travelling), texte affiché directement, pas de neige ni de particules.

---

## Observé sur le site (2026-10-03)

| Moment | Effet | Statut |
|---|---|---|
| Défilement | Caméra pilotée par le scroll (recul, traversée du brouillard) | Observé |
| Mouvement rapide | **Aberration chromatique** (franges RVB) et léger flou de mouvement en post-traitement, qui disparaissent à l'arrêt | Observé |
| Logo / textes | Brouillage de lettres pendant les changements de scène | Observé, ≈ 300–600ms |
| Blocs du portfolio | Rotation lente sur eux-mêmes, entrée par le bas | Observé |
| Symbole | Segments d'anneau qui convergent puis flou radial | Observé, lié au défilement |
| Sculpture finale | Particules qui se réorganisent d'une forme à l'autre au changement de lien | Observé |

Mouvement réduit : désactiver aberration et flou radial, remplacer les trajets de caméra par des fondus entre plans fixes.
