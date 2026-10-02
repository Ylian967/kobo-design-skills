# Hold To Play Music — mouvement

## Principes

Le temps de l'appui est le cœur du rythme. Catégories de la fiche Awwwards : musique & son, animation, navigation inhabituelle, WebGL.

## Catalogue

| Moment | Effet | Durée | Courbe |
|---|---|---|---|
| Appui | Touche qui s'enfonce de 4px, remplissage orange 0 → 100 % | 1.2s (`--hold`) | linéaire |
| Relâché trop tôt | Remplissage qui se vide | 300ms | `--ease` |
| Déclenchement | Flash blanc (opacité 0 → .8 → 0) puis nouvel artiste | 700ms | `--ease` |
| Titre peint | Lettres qui « sautent » une à une (scale 0.8 → 1) | 60ms / lettre | `--ease` |
| Vidéo | Lecture en boucle, muette | — | — |

## Code de référence

```js
let p = 0, held = false, last = 0;
function frame(t) { const dt = t - last; last = t; p = held ? Math.min(1, p + dt / 1200) : Math.max(0, p - dt / 300); key.style.setProperty('--p', p); if (p >= 1) { held = false; p = 0; next(); } requestAnimationFrame(frame); }
addEventListener('keydown', e => { if (e.code === 'Space' && !e.repeat) { e.preventDefault(); held = true; } });
addEventListener('keyup', e => { if (e.code === 'Space') held = false; });
```

## Mouvement réduit

Pas de flash ni de saut des lettres ; l'appui reste nécessaire mais un clic simple déclenche directement.
