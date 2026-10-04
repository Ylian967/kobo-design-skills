# Audit — showroom-bento

> Relevé en lecture seule. Sources : `references/tokens.css`, `examples/demo.html`, `SKILL.md`.
> Les états des composants sont détectés automatiquement à partir des sélecteurs CSS et des attributs ARIA de la démo, puis relus ; ils n'ont pas été vérifiés sur capture d'écran.

- Variables dans `tokens.css` : **43**
- Démo : 371 lignes, dont 117 de script ; polices chargées : Outfit
- Rôles du contrat : 20 remplis, 7 dérivables, 9 absents (sur 36)

## a. Variables classées par rôle du contrat

### Surfaces

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-bg` | rempli | `--frame`, `--outer` |  |
| `--k-surface` | rempli | `--tile` |  |
| `--k-surface-2` | rempli | `--light` |  |
| `--k-overlay` | absent | — |  |

### Texte

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-text` | rempli | `--ink` |  |
| `--k-text-2` | absent | — |  |
| `--k-text-muted` | rempli | `--muted` |  |
| `--k-on-accent` | dérivable | `--tile` | blanc sur pilule noire |

### Accent et états

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-accent` | rempli | `--accent` |  |
| `--k-accent-2` | rempli | `--accent-ink` |  |
| `--k-success` | absent | — |  |
| `--k-warning` | absent | — |  |
| `--k-danger` | absent | — |  |
| `--k-focus` | dérivable | `--ink` |  |

### Filets

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-line` | rempli | `--line` |  |
| `--k-line-strong` | absent | — |  |

### Typo

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-font-display` | dérivable | `--font` | une seule famille |
| `--k-font-body` | rempli | `--font` |  |
| `--k-font-mono` | absent | — |  |
| `--k-fs-hero` | rempli | `--fs-title` |  |
| `--k-fs-h1` | dérivable | `--fs-price` |  |
| `--k-fs-h2` | dérivable | `--fs-value` |  |
| `--k-fs-body` | rempli | `--fs-body` |  |
| `--k-fs-small` | rempli | `--fs-label` |  |

### Formes

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-radius` | rempli | `--r-tile` |  |
| `--k-radius-lg` | rempli | `--r-frame` |  |
| `--k-border-w` | absent | — |  |
| `--k-cut` | dérivable | — | 0 |

### Espace

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-space-1…12` | dérivable | `--bento-gap`, `--bento-pad` |  |
| `--k-edge` | rempli | `--pad` |  |
| `--k-container` | rempli | `--page` |  |

### Mouvement

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-ease-out` | rempli | `--ease` |  |
| `--k-ease-in-out` | absent | — |  |
| `--k-dur-fast` | rempli | `--dur-fast` |  |
| `--k-dur-base` | rempli | `--dur` |  |
| `--k-dur-slow` | rempli | `--dur-slide` |  |

### Rôles sans équivalent dans ce skill

`--k-overlay`, `--k-text-2`, `--k-success`, `--k-warning`, `--k-danger`, `--k-line-strong`, `--k-font-mono`, `--k-border-w`, `--k-ease-in-out`

### Toutes les variables de `tokens.css`

| Variable | Valeur | Famille | Rôle du contrat |
|---|---|---|---|
| `--outer` | `#2e2b2b` | Couleur | `--k-bg` |
| `--frame` | `#e9e9e9` | Couleur | `--k-bg` |
| `--light` | `#f7f7f7` | Couleur | `--k-surface-2` |
| `--tile` | `#ffffff` | Couleur | `--k-surface` |
| `--ink` | `#1b1d1c` | Couleur | `--k-text` |
| `--muted` | `#666666` | Couleur | `--k-text-muted` |
| `--symbol` | `#c7c7c7` | Couleur | `--k-sig-symbol` |
| `--arrow` | `#8e8e8e` | Couleur | `--k-sig-arrow` |
| `--accent` | `#cf1f22` | Couleur | `--k-accent` |
| `--accent-ink` | `#b81b1e` | Couleur | `--k-accent-2` |
| `--line` | `rgb(27 29 28 / 0.1)` | Couleur | `--k-line` |
| `--floor` | `rgb(27 29 28 / 0.22)` | Couleur | `--k-sig-floor` |
| `--lift` | `rgb(27 29 28 / 0.14)` | Couleur | `--k-sig-lift` |
| `--sw-red` | `#cf1f22` | Couleur | `--k-sig-sw-red` |
| `--sw-yellow` | `#efd82a` | Couleur | `--k-sig-sw-yellow` |
| `--sw-blue` | `#003581` | Couleur | `--k-sig-sw-blue` |
| `--sw-grey` | `#d9d9db` | Couleur | `--k-sig-sw-grey` |
| `--sw-black` | `#1b1d1c` | Couleur | `--k-sig-sw-black` |
| `--font` | `'Outfit', 'Helvetica Neue', Arial, sans-serif` | Typo | `--k-font-display` (dérivable) |
| `--fs-title` | `clamp(2.5rem, 4.65vw, 4.2rem)` | Typo | `--k-fs-hero` |
| `--fs-price` | `2.75rem` | Typo | `--k-fs-h1` (dérivable) |
| `--fs-value` | `1.25rem` | Typo | `--k-fs-h2` (dérivable) |
| `--fs-body` | `1.0625rem` | Typo | `--k-fs-body` |
| `--fs-nav` | `1.0625rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-nav`) |
| `--fs-label` | `0.8125rem` | Typo | `--k-fs-small` |
| `--fw-bold` | `600` | Typo | hors contrat — typo (candidat `--k-sig-fw-bold`) |
| `--ls-tight` | `-0.02em` | Typo | hors contrat — typo (candidat `--k-sig-ls-tight`) |
| `--page` | `1440px` | Espace | `--k-container` |
| `--pad` | `clamp(16px, 2.8vw, 40px)` | Espace | `--k-edge` |
| `--bento-pad` | `4px` | Signature | `--k-space-1…12` (dérivable) |
| `--bento-gap` | `4px` | Signature | `--k-space-1…12` (dérivable) |
| `--bento-row` | `118px` | Dimension de composant | hors contrat — dimension de composant |
| `--pill-h` | `50px` | Dimension de composant | hors contrat — dimension de composant |
| `--pill-w` | `134px` | Dimension de composant | hors contrat — dimension de composant |
| `--arrows-w` | `105px` | Dimension de composant | hors contrat — dimension de composant |
| `--swatch` | `31px` | Dimension de composant | hors contrat — dimension de composant |
| `--r-frame` | `16px` | Formes | `--k-radius-lg` |
| `--r-tile` | `12px` | Formes | `--k-radius` |
| `--ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | Mouvement | `--k-ease-out` |
| `--ease-back` | `cubic-bezier(0.34, 1.5, 0.64, 1)` | Mouvement | `--k-sig-ease-back` |
| `--dur-fast` | `180ms` | Mouvement | `--k-dur-fast` |
| `--dur` | `450ms` | Mouvement | `--k-dur-base` |
| `--dur-slide` | `900ms` | Mouvement | `--k-dur-slow` |

## b. Composants de `examples/demo.html`

| Composant | Nom(s) dans la démo | États présents | États manquants |
|---|---|---|---|
| Barre de navigation | `.pills`, `.bar` | repos, focus | survol, actif |
| Héros | `.stage` | repos | — |
| Bouton principal | `.pill`, `.pill--ink` | repos, survol, focus, actif | désactivé, chargement |
| Bouton rond / icône | `.arrows`, `.round` | repos, survol, focus | actif, désactivé |
| Onglets / sélecteur | `.swatch`, `.swatches` | repos, survol, focus | actif, désactivé |
| Carte | `.tile-text`, `.tile--acc`, `.tile--color`, `.tile`, `.tile--wide` | repos, survol, focus | chargement, vide |

Le focus est assuré par une règle globale `:focus-visible` (présente dans les 23 démos) ; il est compté comme présent pour tout composant interactif, mais rarement dessiné composant par composant.

Classes propres au skill (hors composants communs) : `.model`, `.spec`, `.floor`, `.preview`, `.logo`, `.swap`, `.bento`, `.frame`, `.model-in`, `.acc-img`, `.tools`.

Balises : header ×1, nav ×1, main ×1, section ×2, article ×2, button ×9, a ×7, img ×9, svg ×16, h1 ×1.

Attributs d'accessibilité : aria-label ×14, role ×6, aria-checked ×5, aria-current ×1, aria-roledescription ×1, aria-hidden ×1.

## c. Schémas UX

- **Structure de page** : Écran unique dans un cadre : barre → scène produit (carrousel de modèles) → rangée bento (accessoire, caractéristiques, couleur).
- **Navigation** : Groupe de pilules (active en noir), boutons ronds.
- **Parcours** : Regarder → changer de modèle (flèches, glisser, clavier) → choisir la teinte (groupe radio) → commander.
- **États** : Pilule courante, pastille `aria-checked`, glisser. Pas de formulaire.
- **Formulaire** : aucun formulaire.
- **Mouvement** : 0 animation(s) nommée(s) (—) ; mécanismes : rAF, matchMedia, aria-set, keydown-keys, focus(), preventDefault, pointer ; `prefers-reduced-motion` pris en compte (2 mention(s)).
- **Points de rupture** : max-width: 1100px, max-width: 760px.

## d. Signature (à ne pas rendre générique)

- Un seul produit, grand, au centre, sur un sol de studio.
- Rangée bento serrée à 4px.
- Titre et prix de même taille qui se répondent ; un seul rouge.

## e. Défauts repérés (notés, non corrigés)

Relevés à la lecture :

- Les 7 liens pointent sur `href="#"` (« Acheter », « Commander » compris).
- 9 boutons sans `type`.
- Aucun `<footer>`.
- Rayons 8px et 99px en dur.
- `--accent` sur cadre = 4,47:1 (grand texte seulement).
- Pas d'état de chargement pour le changement de modèle.

Relevés automatiquement :

- Rayons écrits en dur dans la démo : 99px, 8px.
- Valeurs en px écrites en dur dans le CSS de la démo : 75 (pour 105 usages de `var()`), alors que SKILL.md annonce « aucune valeur en dur ».
- Aucune échelle d'espacement (`--space-*`) dans les tokens : les marges et écarts sont des valeurs px en dur.
- Paires de contraste validées seulement au seuil « grand texte » (3:1) : `accent:frame`. À vérifier à l'œil qu'elles ne servent jamais à du petit texte.
- Survols non protégés par `@media (hover: hover)` : effets collants possibles au toucher.
- Pas de lien d'évitement (« aller au contenu »).
- 7 lien(s) `href="#"` (ne mènent nulle part).
- 9 bouton(s) sans attribut `type`.
- Aucun état désactivé (`:disabled`, `aria-disabled`) dans la démo.
- Aucun état vide (liste sans résultat, panier vide…) dans la démo.
