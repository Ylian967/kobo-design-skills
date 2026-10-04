# Audit — glacial-mono-3d

> Relevé en lecture seule. Sources : `references/tokens.css`, `examples/demo.html`, `SKILL.md`.
> Les états des composants sont détectés automatiquement à partir des sélecteurs CSS et des attributs ARIA de la démo, puis relus ; ils n'ont pas été vérifiés sur capture d'écran.

- Variables dans `tokens.css` : **48**
- Démo : 369 lignes, dont 226 de script ; polices chargées : IBM Plex Mono, Unbounded
- Rôles du contrat : 16 remplis, 9 dérivables, 11 absents (sur 36)

## a. Variables classées par rôle du contrat

### Surfaces

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-bg` | rempli | `--fog`, `--night` | deux ambiances : brouillard clair et nuit |
| `--k-surface` | dérivable | `--frost` |  |
| `--k-surface-2` | dérivable | `--steel` |  |
| `--k-overlay` | rempli | `--scrim-light`, `--scrim-dark` |  |

### Texte

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-text` | rempli | `--text`, `--ink` | clair sur nuit, sombre sur brouillard |
| `--k-text-2` | dérivable | `--steel` |  |
| `--k-text-muted` | rempli | `--muted` |  |
| `--k-on-accent` | dérivable | `--white` | texte sur étiquette --tag |

### Accent et états

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-accent` | absent | — |  |
| `--k-accent-2` | absent | — |  |
| `--k-success` | absent | — |  |
| `--k-warning` | absent | — |  |
| `--k-danger` | absent | — |  |
| `--k-focus` | dérivable | `currentColor` |  |

### Filets

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-line` | rempli | `--line` |  |
| `--k-line-strong` | absent | — |  |

### Typo

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-font-display` | rempli | `--font-logo` |  |
| `--k-font-body` | dérivable | `--font-mono` | tout le texte est en mono |
| `--k-font-mono` | rempli | `--font-mono` |  |
| `--k-fs-hero` | dérivable | `--text-logo` |  |
| `--k-fs-h1` | absent | — |  |
| `--k-fs-h2` | absent | — |  |
| `--k-fs-body` | rempli | `--text-xs`, `--text-base` | texte courant à 11px |
| `--k-fs-small` | rempli | `--text-2xs` | 10px |

### Formes

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-radius` | dérivable | — | 0, pas de token |
| `--k-radius-lg` | absent | — |  |
| `--k-border-w` | rempli | `--bracket-w` |  |
| `--k-cut` | dérivable | — | 0 |

### Espace

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-space-1…12` | rempli | space-2…8 | 2,3,4,6,8 seulement |
| `--k-edge` | rempli | `--edge` |  |
| `--k-container` | absent | — |  |

### Mouvement

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-ease-out` | rempli | `--ease` |  |
| `--k-ease-in-out` | absent | — |  |
| `--k-dur-fast` | rempli | `--dur-fast` |  |
| `--k-dur-base` | rempli | `--dur` |  |
| `--k-dur-slow` | rempli | `--dur-scene` |  |

### Rôles sans équivalent dans ce skill

`--k-accent`, `--k-accent-2`, `--k-success`, `--k-warning`, `--k-danger`, `--k-line-strong`, `--k-fs-h1`, `--k-fs-h2`, `--k-radius-lg`, `--k-container`, `--k-ease-in-out`

### Toutes les variables de `tokens.css`

| Variable | Valeur | Famille | Rôle du contrat |
|---|---|---|---|
| `--fog` | `#b6bac5` | Couleur | `--k-bg` |
| `--mist` | `#b7bbc6` | Couleur | `--k-sig-mist` |
| `--sky` | `#9398a4` | Couleur | `--k-sig-sky` |
| `--rock` | `#474e5c` | Couleur | `--k-sig-rock` |
| `--shade` | `#383e54` | Couleur | `--k-sig-shade` |
| `--ice` | `#657081` | Couleur | `--k-sig-ice` |
| `--halo` | `#e5f1f6` | Couleur | `--k-sig-halo` |
| `--white` | `#ffffff` | Couleur | `--k-on-accent` (dérivable) |
| `--tag` | `#393a3c` | Couleur | `--k-sig-tag` |
| `--prism-a` | `#ff8a7a` | Couleur | `--k-sig-prism-a` |
| `--prism-b` | `#ffe9a8` | Couleur | `--k-sig-prism-b` |
| `--prism-c` | `#8fd0ff` | Couleur | `--k-sig-prism-c` |
| `--frost` | `#d9dce3` | Couleur | `--k-surface` (dérivable) |
| `--loader` | `#a0a5b1` | Couleur | `--k-sig-loader` |
| `--night` | `#1f2430` | Couleur | `--k-bg` |
| `--steel` | `#383e4e` | Couleur | `--k-surface-2` (dérivable) |
| `--ink` | `#1f2430` | Couleur | `--k-text` |
| `--text` | `#e9ecf2` | Couleur | `--k-text` |
| `--muted` | `#8a91a3` | Couleur | `--k-text-muted` |
| `--glow` | `rgb(220 235 255 / 0.85)` | Couleur | `--k-sig-glow` |
| `--line` | `rgb(233 236 242 / 0.35)` | Couleur | `--k-line` |
| `--scrim-light` | `rgb(182 186 197 / 0.72)` | Couleur | `--k-overlay` |
| `--scrim-dark` | `rgb(31 36 48 / 0.72)` | Couleur | `--k-overlay` |
| `--font-mono` | `'IBM Plex Mono', ui-monospace, monospace` | Typo | `--k-font-body` (dérivable) |
| `--font-logo` | `'Unbounded', 'IBM Plex Mono', sans-serif` | Typo | `--k-font-display` |
| `--text-2xs` | `0.625rem` | Typo | `--k-fs-small` |
| `--text-xs` | `0.6875rem` | Typo | `--k-fs-body` |
| `--text-sm` | `0.8125rem` | Typo | hors contrat — typo (candidat `--k-sig-text-sm`) |
| `--text-base` | `1rem` | Typo | `--k-fs-body` |
| `--text-logo` | `1.5rem` | Typo | `--k-fs-hero` (dérivable) |
| `--leading` | `1.45` | Typo | hors contrat — typo (candidat `--k-sig-leading`) |
| `--tracking` | `0.02em` | Typo | hors contrat — typo (candidat `--k-sig-tracking`) |
| `--edge` | `28px` | Espace | `--k-edge` |
| `--space-2` | `8px` | Espace | `--k-space-1…12` |
| `--space-3` | `12px` | Espace | `--k-space-1…12` |
| `--space-4` | `16px` | Espace | `--k-space-1…12` |
| `--space-6` | `24px` | Espace | `--k-space-1…12` |
| `--space-8` | `32px` | Espace | `--k-space-1…12` |
| `--text-col` | `360px` | Typo | hors contrat — typo (candidat `--k-sig-text-col`) |
| `--bracket` | `8px` | Formes | `--k-sig-bracket` |
| `--bracket-w` | `1px` | Formes | `--k-border-w` |
| `--ease` | `cubic-bezier(0.16, 1, 0.3, 1)` | Mouvement | `--k-ease-out` |
| `--dur-fast` | `200ms` | Mouvement | `--k-dur-fast` |
| `--dur` | `600ms` | Mouvement | `--k-dur-base` |
| `--dur-scene` | `1600ms` | Mouvement | `--k-dur-slow` |
| `--dur-born` | `2800ms` | Mouvement | `--k-sig-dur-born` |
| `--dur-glitch` | `520ms` | Mouvement | `--k-sig-dur-glitch` |
| `--scramble` | `40ms` | Mouvement | `--k-sig-scramble` |

## b. Composants de `examples/demo.html`

| Composant | Nom(s) dans la démo | États présents | États manquants |
|---|---|---|---|
| Chargement de page | `.loader`, `.scr` | repos, chargement | — |
| Panneau / modale | `.panel` | repos, focus, actif | — |

Le focus est assuré par une règle globale `:focus-visible` (présente dans les 23 démos) ; il est compté comme présent pour tout composant interactif, mais rarement dessiné composant par composant.

Classes propres au skill (hors composants communs) : `.ui`, `.bracket`, `.scene`, `.fallback`, `.marks`, `.glitch`, `.snow`, `.logo`, `.ghost`, `.spacer`, `.tagline`, `.marks--2`.

Balises : section ×1, button ×5, a ×6, img ×3, svg ×2, h1 ×1, h2 ×1, h3 ×3.

Attributs d'accessibilité : aria-hidden ×5, aria-label ×3, role ×2, aria-pressed ×1, aria-modal ×1, aria-labelledby ×1.

## c. Schémas UX

- **Structure de page** : Pas de page : un canvas 3D fixe plein écran, un espace de défilement dessous, l'interface en HTML aux quatre coins, un panneau modal de résumé.
- **Navigation** : Aucune barre : liens et boutons à crochets dans les coins ; le défilement déplace la caméra.
- **Parcours** : Chargement ASCII → la scène s'assemble → défilement = voyage de caméra → panneau de résumé.
- **États** : Chargement, texte qui se brouille puis s'affiche, panneau ouvert (`aria-modal`), repli photo sans WebGL, mouvement réduit.
- **Formulaire** : aucun formulaire.
- **Mouvement** : 2 animation(s) nommée(s) (px, fall) ; mécanismes : rAF, three, matchMedia, setInterval, aria-set, keydown-keys, pointer ; `prefers-reduced-motion` pris en compte (3 mention(s)).
- **Points de rupture** : max-width: 700px.

## d. Signature (à ne pas rendre générique)

- Une scène, pas une page : l'objet de glace se construit en fil de fer.
- Interface minuscule en monospace collée aux coins.
- Crochets de coin autour de tout bouton ; monochrome gris-bleu.

## e. Défauts repérés (notés, non corrigés)

Relevés à la lecture :

- Aucune structure sémantique : ni `<header>`, ni `<nav>`, ni `<main>`, ni `<footer>`.
- Les 6 liens pointent sur `href="#"`.
- Texte courant à 11px, micro-labels à 10px.
- Une seule règle de focus (globale), en pointillé 1px : peu visible sur la scène.
- 1 couleur `rgb()` en dur hors `:root`.
- Pas de token d'accent : aucun moyen de désigner l'action principale.

Relevés automatiquement :

- Couleurs en dur hors `:root` dans la démo : — ; 1 appel(s) `rgb()`.
- Valeurs en px écrites en dur dans le CSS de la démo : 26 (pour 96 usages de `var()`), alors que SKILL.md annonce « aucune valeur en dur ».
- Tailles de texte sous 12px : `--text-2xs` = 0.625rem, `--text-xs` = 0.6875rem.
- Survols non protégés par `@media (hover: hover)` : effets collants possibles au toucher.
- Pas de lien d'évitement (« aller au contenu »).
- 6 lien(s) `href="#"` (ne mènent nulle part).
- 5 bouton(s) sans attribut `type`.
- Un seul point de rupture (max-width: 700px) : pas de palier tablette.
- Aucun état désactivé (`:disabled`, `aria-disabled`) dans la démo.
- Aucun état vide (liste sans résultat, panier vide…) dans la démo.
