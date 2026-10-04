# Audit — heritage-lens

> Relevé en lecture seule. Sources : `references/tokens.css`, `examples/demo.html`, `SKILL.md`.
> Les états des composants sont détectés automatiquement à partir des sélecteurs CSS et des attributs ARIA de la démo, puis relus ; ils n'ont pas été vérifiés sur capture d'écran.

- Variables dans `tokens.css` : **53**
- Démo : 526 lignes, dont 119 de script ; polices chargées : EB Garamond, Inter, Viaoda Libre
- Rôles du contrat : 18 remplis, 11 dérivables, 7 absents (sur 36)

## a. Variables classées par rôle du contrat

### Surfaces

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-bg` | rempli | `--bg` |  |
| `--k-surface` | dérivable | `--night` |  |
| `--k-surface-2` | dérivable | `--mist` | page éditoriale claire |
| `--k-overlay` | rempli | `--veil-1`, `--veil-2`, `--night-veil` |  |

### Texte

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-text` | rempli | `--white` |  |
| `--k-text-2` | rempli | `--soft` |  |
| `--k-text-muted` | dérivable | `--half` |  |
| `--k-on-accent` | dérivable | `--bg` | texte sombre sur or |

### Accent et états

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-accent` | rempli | `--gold` |  |
| `--k-accent-2` | dérivable | `--bronze` |  |
| `--k-success` | absent | — |  |
| `--k-warning` | absent | — |  |
| `--k-danger` | absent | — |  |
| `--k-focus` | dérivable | `--gold` |  |

### Filets

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-line` | rempli | `--line` |  |
| `--k-line-strong` | dérivable | `--gold-half` |  |

### Typo

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-font-display` | rempli | `--font-display` |  |
| `--k-font-body` | rempli | `--font-text` |  |
| `--k-font-mono` | absent | — |  |
| `--k-fs-hero` | rempli | `--fs-hero` |  |
| `--k-fs-h1` | rempli | `--fs-place` |  |
| `--k-fs-h2` | dérivable | `--fs-phrase` |  |
| `--k-fs-body` | rempli | `--fs-body` |  |
| `--k-fs-small` | rempli | `--fs-ui` |  |

### Formes

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-radius` | absent | — |  |
| `--k-radius-lg` | rempli | `--r-card` |  |
| `--k-border-w` | absent | — |  |
| `--k-cut` | dérivable | — | 0 |

### Espace

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-space-1…12` | absent | — |  |
| `--k-edge` | rempli | `--edge` |  |
| `--k-container` | dérivable | `--col-phrase`, `--col-text` |  |

### Mouvement

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-ease-out` | rempli | `--ease-out` |  |
| `--k-ease-in-out` | rempli | `--ease` |  |
| `--k-dur-fast` | rempli | `--dur-fast` |  |
| `--k-dur-base` | dérivable | `--dur-hot`, `--dur-fill` |  |
| `--k-dur-slow` | rempli | `--dur-text`, `--dur-open` |  |

### Rôles sans équivalent dans ce skill

`--k-success`, `--k-warning`, `--k-danger`, `--k-font-mono`, `--k-radius`, `--k-border-w`, `--k-space-1…12`

### Toutes les variables de `tokens.css`

| Variable | Valeur | Famille | Rôle du contrat |
|---|---|---|---|
| `--bg` | `#252525` | Couleur | `--k-bg` |
| `--night` | `#314757` | Couleur | `--k-surface` (dérivable) |
| `--white` | `#ffffff` | Couleur | `--k-text` |
| `--gold` | `#f6cea0` | Couleur | `--k-accent` |
| `--gold-half` | `rgb(246 206 160 / 0.5)` | Couleur | `--k-line-strong` (dérivable) |
| `--soft` | `#c4c4c4` | Couleur | `--k-text-2` |
| `--half` | `rgb(255 255 255 / 0.5)` | Couleur | `--k-text-muted` (dérivable) |
| `--bronze` | `#79644b` | Couleur | `--k-accent-2` (dérivable) |
| `--mist` | `#eae8e5` | Couleur | `--k-surface-2` (dérivable) |
| `--line` | `rgb(255 255 255 / 0.2)` | Couleur | `--k-line` |
| `--shade` | `#17120e` | Couleur | `--k-sig-shade` |
| `--veil-0` | `rgb(23 18 14 / 0)` | Couleur | `--k-sig-veil-0` |
| `--veil-1` | `rgb(23 18 14 / 0.55)` | Couleur | `--k-overlay` |
| `--veil-2` | `rgb(23 18 14 / 0.82)` | Couleur | `--k-overlay` |
| `--night-veil` | `rgb(49 71 87 / 0.78)` | Couleur | `--k-overlay` |
| `--font-display` | `'Viaoda Libre', 'Cormorant Infant', Georgia, serif` | Typo | `--k-font-display` |
| `--font-text` | `'EB Garamond', Georgia, serif` | Typo | `--k-font-body` |
| `--font-ui` | `'Inter', system-ui, sans-serif` | Typo | hors contrat — typo (candidat `--k-sig-font-ui`) |
| `--fs-hero` | `min(20vh, max(75px, calc(12.5px + 9.766vw)))` | Typo | `--k-fs-hero` |
| `--lh-hero` | `0.9` | Typo | hors contrat — typo (candidat `--k-sig-lh-hero`) |
| `--fs-place` | `clamp(2.75rem, 2.5vw + 2.6rem, 5.25rem)` | Typo | `--k-fs-h1` |
| `--fs-phrase` | `clamp(1.75rem, 2.2vw + 1.07rem, 3.4rem)` | Typo | `--k-fs-h2` (dérivable) |
| `--fs-body` | `clamp(1.0625rem, 0.47vw + 0.8rem, 1.35rem)` | Typo | `--k-fs-body` |
| `--lh-body` | `1.2` | Typo | hors contrat — typo (candidat `--k-sig-lh-body`) |
| `--fs-ui` | `clamp(0.8125rem, 0.156vw + 0.75rem, 0.9375rem)` | Typo | `--k-fs-small` |
| `--lh-ui` | `1.333` | Typo | hors contrat — typo (candidat `--k-sig-lh-ui`) |
| `--fs-enter` | `1.734rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-enter`) |
| `--fs-num` | `1.64rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-num`) |
| `--fs-pct` | `2.3125rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-pct`) |
| `--edge` | `clamp(16px, 2.15vw, 31px)` | Espace | `--k-edge` |
| `--btn` | `clamp(46px, 3.54vw, 54px)` | Dimension de composant | hors contrat — dimension de composant |
| `--enter` | `7.63rem` | Dimension de composant | hors contrat — dimension de composant |
| `--medal` | `6rem` | Dimension de composant | hors contrat — dimension de composant |
| `--lens` | `clamp(150px, 14.6vw, 210px)` | Dimension de composant | hors contrat — dimension de composant |
| `--bullet` | `20px` | Dimension de composant | hors contrat — dimension de composant |
| `--bullet-step` | `39px` | Dimension de composant | hors contrat — dimension de composant |
| `--col-text` | `373px` | Dimension de composant | `--k-container` (dérivable) |
| `--col-phrase` | `1008px` | Dimension de composant | `--k-container` (dérivable) |
| `--r-pill` | `999px` | Formes | `--k-sig-r-pill` |
| `--r-card` | `20px` | Formes | `--k-radius-lg` |
| `--ease` | `cubic-bezier(0.455, 0.03, 0.515, 0.955)` | Mouvement | `--k-ease-in-out` |
| `--ease-out` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Mouvement | `--k-ease-out` |
| `--ease-expo` | `cubic-bezier(0.2, 0, 0, 1)` | Mouvement | `--k-sig-ease-expo` |
| `--ease-in` | `cubic-bezier(0.55, 0.085, 0.68, 0.53)` | Mouvement | `--k-sig-ease-in` |
| `--dur-fast` | `300ms` | Mouvement | `--k-dur-fast` |
| `--dur-hot` | `400ms` | Mouvement | `--k-dur-base` (dérivable) |
| `--dur-fill` | `650ms` | Mouvement | `--k-dur-base` (dérivable) |
| `--dur-text` | `800ms` | Mouvement | `--k-dur-slow` |
| `--dur-open` | `1100ms` | Mouvement | `--k-dur-slow` |
| `--spin-slow` | `60s` | Mouvement | `--k-sig-spin-slow` |
| `--spin-mid` | `30s` | Mouvement | `--k-sig-spin-mid` |
| `--spin-fast` | `20s` | Mouvement | `--k-sig-spin-fast` |
| `--pulse` | `1.5s` | Mouvement | `--k-sig-pulse` |

## b. Composants de `examples/demo.html`

| Composant | Nom(s) dans la démo | États présents | États manquants |
|---|---|---|---|
| Chargement de page | `.loader-ring`, `.loader`, `.loader-pct` | repos, chargement | — |
| Menu plein écran | `.plan` | repos, focus, actif | — |
| Barre de navigation | `.hud` | repos, focus | survol, actif |
| Héros | `.hero-title`, `.stage` | repos, actif | — |
| Bouton principal | `.pill`, `.enter` | repos, survol, focus | actif, désactivé, chargement |
| Bouton rond / icône | `.round`, `.close` | repos, survol, focus, actif | désactivé |
| Carrousel / pagination | `.bullets` | repos, survol, focus, actif | désactivé |
| Champ / formulaire | `.hint`, `.sub` | repos, focus | erreur, désactivé, chargement |
| Panneau / modale | `.veil`, `.editorial` | repos, focus, actif | — |

Le focus est assuré par une règle globale `:focus-visible` (présente dans les 23 démos) ; il est compté comme présent pour tout composant interactif, mais rarement dessiné composant par composant.

Classes propres au skill (hors composants communs) : `.end-txt`, `.ed-fig`, `.lens`, `.ed-head`, `.plan-list`, `.about-link`, `.medal`, `.present`, `.ed-track`, `.layer`, `.beat`, `.stop`, `.lens-eye`, `.stop-text`, `.lace`, `.intro-zone`, `.ed-hero`, `.ed-copy`, `.ed-quote`, `.end`, `.end-pic`, `.ico`, `.brand`, `.tools`, `.scene`, `.phrase`, `.story`, `.place`.

Balises : header ×1, nav ×1, main ×1, section ×6, article ×1, button ×11, a ×11, img ×17, ul ×2, svg ×20, h1 ×1, h2 ×5, h3 ×3.

Attributs d'accessibilité : aria-hidden ×20, aria-label ×6, role ×3, aria-pressed ×2, aria-modal ×2, aria-live ×1, aria-expanded ×1, aria-controls ×1, aria-labelledby ×1.

## c. Schémas UX

- **Structure de page** : Suite de scènes plein écran (prologue, 3 lieux) + page éditoriale + page « à propos ». Texte centré, une chose à lire à la fois.
- **Navigation** : HUD dans les coins : points de navigation verticaux, boutons ronds (son, réglages, plan), plan du site en modale.
- **Parcours** : Chargement → bouton « Entrer » → défilement = récit → lentille avant/après sur chaque lieu → page éditoriale.
- **États** : Chargement avec pourcentage, scène active, lentille ouverte, son actif, modale (`aria-modal`, `inert`). Pas d'erreur ni de vide (aucun formulaire).
- **Formulaire** : aucun formulaire.
- **Mouvement** : 4 animation(s) nommée(s) (cw, ccw, pulse, bob) ; mécanismes : rAF, matchMedia, setInterval, aria-set, focus(), preventDefault, inert, wheel ; `prefers-reduced-motion` pris en compte (2 mention(s)).
- **Points de rupture** : max-width: 919px.

## d. Signature (à ne pas rendre générique)

- La lentille circulaire qui révèle le même lieu autrement.
- Anneaux de dentelle dorés qui tournent lentement.
- Serif d'affiche géante centrée ; boutons ronds qui se remplissent d'or.

## e. Défauts repérés (notés, non corrigés)

Relevés à la lecture :

- Aucun `<footer>`.
- 11 boutons sans `type`.
- Rayon 14px écrit en dur 2 fois.
- La roue de souris est interceptée (`wheel` + `preventDefault`) : risque de défilement confisqué.

Relevés automatiquement :

- Rayons écrits en dur dans la démo : 14px.
- Valeurs en px écrites en dur dans le CSS de la démo : 86 (pour 198 usages de `var()`), alors que SKILL.md annonce « aucune valeur en dur ».
- Aucune échelle d'espacement (`--space-*`) dans les tokens : les marges et écarts sont des valeurs px en dur.
- 3 règles de survol avec `scale()` (motif « tout grossit au survol »).
- Survols non protégés par `@media (hover: hover)` : effets collants possibles au toucher.
- Pas de lien d'évitement (« aller au contenu »).
- 11 bouton(s) sans attribut `type`.
- Un seul point de rupture (max-width: 919px) : pas de palier tablette.
- Aucun état désactivé (`:disabled`, `aria-disabled`) dans la démo.
- Aucun état vide (liste sans résultat, panier vide…) dans la démo.
