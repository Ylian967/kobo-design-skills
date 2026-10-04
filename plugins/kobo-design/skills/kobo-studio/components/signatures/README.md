# Variantes de signature

Le composant de base est neutre : il ne lit que les rôles `--k-*` et reste sobre sous n'importe quel skill. Une **variante de signature** s'ajoute par-dessus pour retrouver un geste propre à un skill.

| Fichier | Skill d'origine | Classes | Ce qu'elle lit |
|---|---|---|---|
| `lore-frame-editorial.css` | lore-frame-editorial | `k-btn--biseau`, `k-card--biseau` | `--k-cut`, `--k-sig-chamfer-lg` |
| `acid-scan-security.css` | acid-scan-security | `k-btn--crochets`, `k-card--crochets` | `--k-sig-bracket-len`, `--k-sig-bracket-w`, `--k-sig-cta-gap` |

## Règles

1. **Seuls les fichiers de ce dossier lisent des `--k-sig-*`.** `tools/check_components.py` refuse un `--k-sig-*` ailleurs.
2. Une variante **ajoute** une classe à un composant de base : `class="k-btn k-btn--crochets"`. Elle ne remplace jamais le composant.
3. Elle prévoit un repli quand le skill actif n'a pas la variable : `var(--k-sig-bracket-len, var(--k-space-6))`. Sous un skill sans biseau, `--k-cut` vaut 0 et `k-btn--biseau` redevient un bouton ordinaire.
4. Elle garde tout ce que le composant garantit : contour de focus entier, zone cliquable, états, `prefers-reduced-motion`.
5. Elle obéit à l'intensité.

## Intensité

`data-k-intensity` se pose sur `<html>` ou sur n'importe quel parent ; il vaut pour sa descendance.

| Valeur | `--k-sig` | `--k-sig-motion` | Effet sur les variantes |
|---|---|---|---|
| `full` | 1 | 1 | ornement dessiné, mouvement de signature joué |
| `reduced` | 1 | 0 | ornement dessiné, immobile |
| `off` | 0 | 0 | ornement retiré : il reste le composant de base, avec les couleurs, la typo et les formes du skill |

Une variante se branche sur ces deux interrupteurs, sans sélecteur d'intensité à elle :

```css
.k-btn--biseau { --_cut: calc(var(--k-cut) * var(--k-sig)); }                       /* off : le biseau se referme */
.k-btn--crochets::before { opacity: var(--k-sig); }                                   /* off : les crochets disparaissent */
.k-btn--crochets::before { transition: inset calc(var(--k-dur-base) * var(--k-sig-motion)) var(--k-ease-out); }  /* reduced : plus de mouvement */
```

Limite : on resserre l'intensité en descendant dans la page (`full` → `reduced` → `off`). Un bloc `full` placé dans un parent `off` retrouve ses ornements, mais pas les durées de signature que la fiche a remises à zéro.

## Écrire une nouvelle variante

1. Créer `signatures/<id-du-skill>.css`.
2. Nommer la classe d'après le geste (`--biseau`, `--crochets`), pas d'après le skill.
3. Multiplier toute dimension d'ornement par `var(--k-sig)` et toute durée par `var(--k-sig-motion)`.
4. Vérifier le contour de focus : un `clip-path` posé sur l'élément le couperait. Rogner un calque (`::before`) plutôt que l'élément, ou tracer le contour vers l'intérieur.
5. Lancer `python3 tools/check_components.py`, puis regarder la variante dans `gallery.html` aux trois intensités.
