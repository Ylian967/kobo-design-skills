# Audit — lore-frame-editorial

> Relevé en lecture seule. Sources : `references/tokens.css`, `examples/demo.html`, `SKILL.md`.
> Les états des composants sont détectés automatiquement à partir des sélecteurs CSS et des attributs ARIA de la démo, puis relus ; ils n'ont pas été vérifiés sur capture d'écran.

- Variables dans `tokens.css` : **57**
- Démo : 697 lignes, dont 227 de script ; polices chargées : Inter Tight, Tektur, IBM Plex Mono
- Rôles du contrat : 24 remplis, 5 dérivables, 7 absents (sur 36)

## a. Variables classées par rôle du contrat

### Surfaces

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-bg` | rempli | `--paper` |  |
| `--k-surface` | rempli | `--panel` |  |
| `--k-surface-2` | dérivable | `--lavender` | section « collection » |
| `--k-overlay` | rempli | `--veil` |  |

### Texte

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-text` | rempli | `--ink` |  |
| `--k-text-2` | absent | — |  |
| `--k-text-muted` | rempli | `--muted` |  |
| `--k-on-accent` | dérivable | `--ink` | noir sur citron |

### Accent et états

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-accent` | rempli | `--lime` |  |
| `--k-accent-2` | rempli | `--lavender`, `--periwinkle` |  |
| `--k-success` | absent | — |  |
| `--k-warning` | absent | — |  |
| `--k-danger` | absent | — |  |
| `--k-focus` | dérivable | `currentColor` |  |

### Filets

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-line` | rempli | `--line-dark`, `--line-light` |  |
| `--k-line-strong` | absent | — |  |

### Typo

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-font-display` | rempli | `--font-display` |  |
| `--k-font-body` | dérivable | `--font-mono` | le texte courant est en mono |
| `--k-font-mono` | rempli | `--font-mono` |  |
| `--k-fs-hero` | rempli | `--fs-manifest` |  |
| `--k-fs-h1` | rempli | `--fs-statement` |  |
| `--k-fs-h2` | dérivable | `--fs-menu` |  |
| `--k-fs-body` | rempli | `--fs-body` |  |
| `--k-fs-small` | rempli | `--fs-label` |  |

### Formes

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-radius` | rempli | `--frame-radius` |  |
| `--k-radius-lg` | rempli | `--radius` |  |
| `--k-border-w` | rempli | `--line` | ici --line est une ÉPAISSEUR |
| `--k-cut` | rempli | `--chamfer`, `--chamfer-lg` |  |

### Espace

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-space-1…12` | absent | — |  |
| `--k-edge` | rempli | `--frame-pad` |  |
| `--k-container` | absent | — |  |

### Mouvement

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-ease-out` | rempli | `--ease-out-cubic`, `--ease-out-quart` |  |
| `--k-ease-in-out` | rempli | `--ease-in-out-cubic` |  |
| `--k-dur-fast` | rempli | `--dur-fast` |  |
| `--k-dur-base` | rempli | `--dur-ui` |  |
| `--k-dur-slow` | rempli | `--dur-menu`, `--dur-panel` |  |

### Rôles sans équivalent dans ce skill

`--k-text-2`, `--k-success`, `--k-warning`, `--k-danger`, `--k-line-strong`, `--k-space-1…12`, `--k-container`

### Toutes les variables de `tokens.css`

| Variable | Valeur | Famille | Rôle du contrat |
|---|---|---|---|
| `--paper` | `#ffffff` | Couleur | `--k-bg` |
| `--ink` | `#000000` | Couleur | `--k-text` |
| `--muted` | `#6e6e6e` | Couleur | `--k-text-muted` |
| `--panel` | `#efefef` | Couleur | `--k-surface` |
| `--lavender` | `#968adf` | Couleur | `--k-surface-2` (dérivable) |
| `--lime` | `#c0fb50` | Couleur | `--k-accent` |
| `--periwinkle` | `#8ca6ff` | Couleur | `--k-accent-2` |
| `--on-dark-muted` | `#a6a6a6` | Couleur | `--k-sig-on-dark-muted` |
| `--reveal-from` | `#c4c4c4` | Couleur | `--k-sig-reveal-from` |
| `--reveal-from-dark` | `rgb(255 255 255 / 0.32)` | Couleur | `--k-sig-reveal-from-dark` |
| `--line-light` | `rgb(255 255 255 / 0.2)` | Couleur | `--k-line` |
| `--line-dark` | `rgb(0 0 0 / 0.1)` | Couleur | `--k-line` |
| `--veil` | `rgb(0 0 0 / 0.4)` | Couleur | `--k-overlay` |
| `--font-display` | `'Inter Tight', 'Helvetica Neue', Arial, sans-serif` | Typo | `--k-font-display` |
| `--font-hex` | `'Tektur', 'Chakra Petch', sans-serif` | Typo | hors contrat — typo (candidat `--k-sig-font-hex`) |
| `--font-mono` | `'IBM Plex Mono', ui-monospace, monospace` | Typo | `--k-font-body` (dérivable) |
| `--weight-display` | `650` | Typo | hors contrat — typo (candidat `--k-sig-weight-display`) |
| `--weight-hex` | `700` | Typo | hors contrat — typo (candidat `--k-sig-weight-hex`) |
| `--fs-label` | `max(10px, 0.645vw)` | Typo | `--k-fs-small` |
| `--fs-nav` | `11px` | Typo | hors contrat — typo (candidat `--k-sig-fs-nav`) |
| `--fs-menu-small` | `13.44px` | Typo | hors contrat — typo (candidat `--k-sig-fs-menu-small`) |
| `--fs-body` | `max(14px, 0.879vw)` | Typo | `--k-fs-body` |
| `--fs-story` | `max(17px, 1.23vw)` | Typo | hors contrat — typo (candidat `--k-sig-fs-story`) |
| `--fs-statement` | `max(30px, 3.25vw)` | Typo | `--k-fs-h1` |
| `--fs-menu` | `max(40px, 4vw)` | Typo | `--k-fs-h2` (dérivable) |
| `--fs-manifest` | `max(56px, 8.85vw)` | Typo | `--k-fs-hero` |
| `--fs-counter` | `max(120px, 18vw)` | Typo | hors contrat — typo (candidat `--k-sig-fs-counter`) |
| `--fs-word` | `max(84px, 19vw)` | Typo | hors contrat — typo (candidat `--k-sig-fs-word`) |
| `--lh-statement` | `0.9` | Typo | hors contrat — typo (candidat `--k-sig-lh-statement`) |
| `--lh-manifest` | `0.84` | Typo | hors contrat — typo (candidat `--k-sig-lh-manifest`) |
| `--lh-menu` | `0.85` | Typo | hors contrat — typo (candidat `--k-sig-lh-menu`) |
| `--lh-hex` | `0.8` | Typo | hors contrat — typo (candidat `--k-sig-lh-hex`) |
| `--ls-display` | `-0.07em` | Typo | hors contrat — typo (candidat `--k-sig-ls-display`) |
| `--ls-manifest` | `-0.094em` | Typo | hors contrat — typo (candidat `--k-sig-ls-manifest`) |
| `--ls-hex` | `-0.1em` | Typo | hors contrat — typo (candidat `--k-sig-ls-hex`) |
| `--ls-mono` | `-0.04em` | Typo | hors contrat — typo (candidat `--k-sig-ls-mono`) |
| `--indent-first` | `2.6em` | Typo | hors contrat — typo (candidat `--k-sig-indent-first`) |
| `--frame-pad` | `20px` | Dimension de composant | `--k-edge` |
| `--rail-w` | `67px` | Dimension de composant | hors contrat — dimension de composant |
| `--bar-h` | `51px` | Dimension de composant | hors contrat — dimension de composant |
| `--frame-radius` | `10px` | Formes | `--k-radius` |
| `--line` | `1px` | Formes | `--k-border-w` |
| `--radius` | `1rem` | Formes | `--k-radius-lg` |
| `--overlap` | `2rem` | Dimension de composant | hors contrat — dimension de composant |
| `--parallax` | `4rem` | Dimension de composant | hors contrat — dimension de composant |
| `--chamfer` | `16px` | Formes | `--k-cut` |
| `--chamfer-lg` | `1.6rem` | Formes | `--k-cut` |
| `--ease-out-cubic` | `cubic-bezier(.215, .61, .355, 1)` | Mouvement | `--k-ease-out` |
| `--ease-out-quart` | `cubic-bezier(.165, .84, .44, 1)` | Mouvement | `--k-ease-out` |
| `--ease-in-out-cubic` | `cubic-bezier(.645, .045, .355, 1)` | Mouvement | `--k-ease-in-out` |
| `--ease-in-out-sine` | `cubic-bezier(.445, .05, .55, .95)` | Mouvement | `--k-sig-ease-in-out-sine` |
| `--dur-ui` | `200ms` | Mouvement | `--k-dur-base` |
| `--dur-fast` | `100ms` | Mouvement | `--k-dur-fast` |
| `--dur-scramble-tick` | `40ms` | Mouvement | `--k-sig-dur-scramble-tick` |
| `--dur-menu` | `700ms` | Mouvement | `--k-dur-slow` |
| `--dur-panel` | `900ms` | Mouvement | `--k-dur-slow` |
| `--dur-loader-min` | `1800ms` | Mouvement | `--k-sig-dur-loader-min` |

## b. Composants de `examples/demo.html`

| Composant | Nom(s) dans la démo | États présents | États manquants |
|---|---|---|---|
| Chargement de page | `.loader`, `.curtain` | repos, chargement | — |
| Menu plein écran | `.menu`, `.menu-open` | repos, survol, focus, actif | — |
| Barre de navigation | `.hud`, `.nav`, `.burger` | repos, focus, actif | survol |
| Héros | `.hero` | repos | — |
| Bouton principal | `.btn-line`, `.btn-sign` | repos, focus | survol, actif, désactivé, chargement |
| Bouton rond / icône | `.sound`, `.close`, `.icon-btn` | repos, focus, actif | survol, désactivé |
| Puce / étiquette | `.label` | repos | actif |
| Panneau / modale | `.veil` | repos, focus | actif |
| Pied de page | `.footer` | repos, survol, focus | — |

Le focus est assuré par une règle globale `:focus-visible` (présente dans les 23 démos) ; il est compté comme présent pour tout composant interactif, mais rarement dessiné composant par composant.

Classes propres au skill (hors composants communs) : `.s001`, `.frame`, `.manifest`, `.counter`, `.s004a`, `.on-art`, `.chapter`, `.s004b`, `.s-gardiens`, `.sound-cursor`, `.fan`, `.goo`, `.planche`, `.art-sec`, `.star`, `.statement-block`, `.on-art-local`, `.pin`, `.p-tower`, `.temp`, `.points`, `.statement`, `.hex`, `.ruler-cell`, `.ruler-lines`, `.ruler`, `.crystal`, `.scatter`.

Balises : nav ×1, main ×1, section ×9, footer ×1, button ×4, a ×28, img ×16, canvas ×1, ul ×5, svg ×7, h1 ×1, h2 ×4.

Attributs d'accessibilité : aria-label ×19, aria-hidden ×10, aria-current ×2, aria-expanded ×1, aria-controls ×1, aria-pressed ×1.

## c. Schémas UX

- **Structure de page** : Cadre fixe (rail gauche + barre haute) autour de sections épinglées de 1,5 à 3 écrans : ouverture, rôle, question, collection, projet, bastion, factions, monde, gardiens, pied.
- **Navigation** : Barre de cadre avec progression et nom de section ; menu plein écran ; bouton son.
- **Parcours** : Chargement type terminal → manifeste mot à mot → chapitres qui s'ouvrent en plein cadre → collection → pied.
- **États** : Chargement, texte qui se décode, menu ouvert, cadre inversé sur illustration, son actif. Pas de formulaire.
- **Formulaire** : aucun formulaire.
- **Mouvement** : 4 animation(s) nommée(s) (spin-clockwise, bar, mark, eq) ; mécanismes : IntersectionObserver, rAF, matchMedia, setInterval, aria-set, keydown-keys, focus(), pointer ; `prefers-reduced-motion` pris en compte (2 mention(s)).
- **Points de rupture** : max-width: 760px.

## d. Signature (à ne pas rendre générique)

- Le cadre-terminal toujours présent, qui s'inverse sur les illustrations.
- Deux tailles seulement : énorme (Inter Tight serré) ou minuscule (mono).
- Planches en forme de dossier à coin coupé qui se plient et s'ouvrent.

## e. Défauts repérés (notés, non corrigés)

Relevés à la lecture :

- Couleurs en dur hors `:root` : `#fff` et 7 `rgb()` (voiles et dégradés).
- 2 `outline: none` sur des liens au focus (remplacés par une inversion de couleur : à vérifier à l'œil).
- `--fs-label` à 10px, nav à 11px.
- Le `<h2>` précède le `<h1>` dans l'ordre du document.
- `--line` désigne ici une épaisseur, alors que c'est une couleur dans 12 autres skills.

Relevés automatiquement :

- Couleurs en dur hors `:root` dans la démo : #fff ; 7 appel(s) `rgb()`.
- Valeurs en px écrites en dur dans le CSS de la démo : 112 (pour 232 usages de `var()`), alors que SKILL.md annonce « aucune valeur en dur ».
- Aucune échelle d'espacement (`--space-*`) dans les tokens : les marges et écarts sont des valeurs px en dur.
- Tailles de texte sous 12px : `--fs-label` = max(10px, 0.645vw), `--fs-nav` = 11px.
- Survols non protégés par `@media (hover: hover)` : effets collants possibles au toucher.
- Pas de lien d'évitement (« aller au contenu »).
- 4 bouton(s) sans attribut `type`.
- Un seul point de rupture (max-width: 760px) : pas de palier tablette.
- Aucun état désactivé (`:disabled`, `aria-disabled`) dans la démo.
- Aucun état vide (liste sans résultat, panier vide…) dans la démo.
