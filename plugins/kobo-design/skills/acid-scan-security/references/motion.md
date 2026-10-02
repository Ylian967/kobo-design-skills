# Acid Scan Security — mouvement

## Principes

**Mécanique et numérique** : des balayages linéaires, des clignotements en tout-ou-rien (`steps(1)`), des allumages en pas (`--ease-step`). Pas de rebond, pas de flou animé. Les survols sont instantanés (`--dur-fast` 120ms). Le shot de référence étant une image fixe, ces mouvements sont une proposition (voir `source.md`).

## Catalogue

| Moment | Effet | Durée | Courbe | Notes |
|---|---|---|---|---|
| En continu | Ligne de balayage citron qui descend sur la photo | 3.2s | linéaire | `--dur-scan`, dégradé de 120px |
| En continu | Carré du surtitre et curseur du journal qui clignotent | 1s | `steps(1)` | `--dur-blink` |
| Chargement | Photo qui se « développe » : rampe révélée de `--bg` à `--text` par paliers | 700ms | `--ease-step` | option : redessiner le canvas avec un seuil croissant |
| Chargement | Cadre de scan : crochets qui se resserrent de 30px à 18px, puis l'étiquette apparaît | 240ms + 120ms | `--ease-out` | |
| Survol lien nav | Crochets `[ ]` `--signal` qui apparaissent | 120ms | — | |
| Survol bouton | Changement de fond + halo `--glow` | 120 / 240ms | `--ease-out` | |
| Survol carte CTA | Fond `--glass`, cadenas qui monte de 3px en pas, flèche +4px | 240ms | `--ease-step` / `--ease-out` | |
| Survol carte | Bordure et crochets qui passent en `--signal` | 240ms | `--ease-out` | |
| Analyse | Lignes du journal ajoutées une à une, jauge allumée segment par segment | 420ms par ligne | `--ease-step` | |

## Code de référence

```css
@keyframes sweep { from { transform: translateY(-120px); } to { transform: translateY(100vh); } }
@keyframes blink { 50% { opacity: 0; } }

.sweep { position: absolute; left: 0; right: 0; top: 0; height: 120px; pointer-events: none;
  background: linear-gradient(180deg, transparent, color-mix(in srgb, var(--acid) 14%, transparent) 85%, color-mix(in srgb, var(--acid) 60%, transparent) 99%, transparent);
  animation: sweep var(--dur-scan) linear infinite; }
.label::before { animation: blink var(--dur-blink) steps(1) infinite; }
.meter i { transition: background var(--dur-fast) var(--ease-step); }
```

```js
// Journal qui s'écrit : une ligne toutes les 420ms (0ms si mouvement réduit)
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let n = 0; const step = () => { log.append(makeLine(lines[n])); if (++n < lines.length) setTimeout(step, reduce ? 0 : 420); };
```

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; }
  .sweep { display: none; }
}
```
- Pas de balayage ; carré et curseur fixes (allumés).
- Le journal affiche toutes les lignes d'un coup ; la jauge se remplit sans pas.
- La photo et le cadre de scan apparaissent directement dans leur état final.
