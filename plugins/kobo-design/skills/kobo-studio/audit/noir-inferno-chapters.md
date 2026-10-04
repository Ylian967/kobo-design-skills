# Audit — noir-inferno-chapters

> Relevé en lecture seule. Sources : `references/tokens.css`, `examples/demo.html`, `SKILL.md`.
> Les états des composants sont détectés automatiquement à partir des sélecteurs CSS et des attributs ARIA de la démo, puis relus ; ils n'ont pas été vérifiés sur capture d'écran.

- Variables dans `tokens.css` : **42**
- Démo : 286 lignes, dont 108 de script ; polices chargées : Instrument Serif, Inter
- Rôles du contrat : 18 remplis, 9 dérivables, 9 absents (sur 36)

## a. Variables classées par rôle du contrat

### Surfaces

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-bg` | rempli | `--bg` |  |
| `--k-surface` | rempli | `--shade` |  |
| `--k-surface-2` | dérivable | `--paper` | panneau « À propos » clair |
| `--k-overlay` | rempli | `--veil-1`, `--veil-2` |  |

### Texte

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-text` | rempli | `--text` |  |
| `--k-text-2` | rempli | `--soft` |  |
| `--k-text-muted` | dérivable | `--half` |  |
| `--k-on-accent` | absent | — |  |

### Accent et états

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-accent` | rempli | `--signal` | une seule fois, dernière scène |
| `--k-accent-2` | absent | — |  |
| `--k-success` | absent | — |  |
| `--k-warning` | absent | — |  |
| `--k-danger` | absent | — |  |
| `--k-focus` | dérivable | `--text` |  |

### Filets

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-line` | rempli | `--faint` |  |
| `--k-line-strong` | dérivable | `--half` |  |

### Typo

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-font-display` | rempli | `--font-title` |  |
| `--k-font-body` | rempli | `--font-ui` |  |
| `--k-font-mono` | absent | — |  |
| `--k-fs-hero` | rempli | `--fs-title` |  |
| `--k-fs-h1` | dérivable | `--fs-final` |  |
| `--k-fs-h2` | dérivable | `--fs-quote` |  |
| `--k-fs-body` | rempli | `--fs-text` | 13px |
| `--k-fs-small` | rempli | `--fs-ui` | 10px |

### Formes

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-radius` | absent | — |  |
| `--k-radius-lg` | absent | — |  |
| `--k-border-w` | rempli | `--hair` |  |
| `--k-cut` | dérivable | — | 0 |

### Espace

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-space-1…12` | absent | — |  |
| `--k-edge` | rempli | `--edge` |  |
| `--k-container` | dérivable | `--col-text` |  |

### Mouvement

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-ease-out` | rempli | `--ease-out` |  |
| `--k-ease-in-out` | rempli | `--ease` |  |
| `--k-dur-fast` | dérivable | `--dur-line` | 600ms : rien de « rapide » |
| `--k-dur-base` | rempli | `--dur-fade` |  |
| `--k-dur-slow` | rempli | `--dur-scene` |  |

### Rôles sans équivalent dans ce skill

`--k-on-accent`, `--k-accent-2`, `--k-success`, `--k-warning`, `--k-danger`, `--k-font-mono`, `--k-radius`, `--k-radius-lg`, `--k-space-1…12`

### Toutes les variables de `tokens.css`

| Variable | Valeur | Famille | Rôle du contrat |
|---|---|---|---|
| `--bg` | `#0d0d0d` | Couleur | `--k-bg` |
| `--text` | `#ffffff` | Couleur | `--k-text` |
| `--soft` | `#9c9c9c` | Couleur | `--k-text-2` |
| `--half` | `rgb(255 255 255 / 0.5)` | Couleur | `--k-text-muted` (dérivable) |
| `--faint` | `rgb(255 255 255 / 0.22)` | Couleur | `--k-line` |
| `--shade` | `#1a1a1a` | Couleur | `--k-surface` |
| `--veil-0` | `rgb(13 13 13 / 0)` | Couleur | `--k-sig-veil-0` |
| `--veil-1` | `rgb(13 13 13 / 0.6)` | Couleur | `--k-overlay` |
| `--veil-2` | `rgb(13 13 13 / 0.9)` | Couleur | `--k-overlay` |
| `--paper` | `#dedede` | Couleur | `--k-surface-2` (dérivable) |
| `--ink` | `#000000` | Couleur | `--k-sig-ink` |
| `--ink-soft` | `#5a5a5a` | Couleur | `--k-sig-ink-soft` |
| `--signal` | `#d0202a` | Couleur | `--k-accent` |
| `--font-title` | `'Instrument Serif', 'Times New Roman', serif` | Typo | `--k-font-display` |
| `--font-ui` | `'Inter', system-ui, sans-serif` | Typo | `--k-font-body` |
| `--fs-title` | `clamp(2rem, 5vmin, 3.25rem)` | Typo | `--k-fs-hero` |
| `--fs-quote` | `1.25rem` | Typo | `--k-fs-h2` (dérivable) |
| `--ls-quote` | `0.03em` | Typo | hors contrat — typo (candidat `--k-sig-ls-quote`) |
| `--fs-number` | `2.5rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-number`) |
| `--fs-text` | `0.8125rem` | Typo | `--k-fs-body` |
| `--fs-ui` | `0.625rem` | Typo | `--k-fs-small` |
| `--ls-ui` | `0.14em` | Typo | hors contrat — typo (candidat `--k-sig-ls-ui`) |
| `--lh-ui` | `1.8` | Typo | hors contrat — typo (candidat `--k-sig-lh-ui`) |
| `--fs-panel` | `0.75rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-panel`) |
| `--fs-final` | `1.9125rem` | Typo | `--k-fs-h1` (dérivable) |
| `--edge` | `clamp(18px, 3.2vw, 46px)` | Espace | `--k-edge` |
| `--circle` | `52px` | Dimension de composant | hors contrat — dimension de composant |
| `--circle-small` | `26px` | Dimension de composant | hors contrat — dimension de composant |
| `--target` | `65px` | Dimension de composant | hors contrat — dimension de composant |
| `--pull` | `160px` | Dimension de composant | hors contrat — dimension de composant |
| `--hair` | `0.8px` | Formes | `--k-border-w` |
| `--close` | `20px` | Dimension de composant | hors contrat — dimension de composant |
| `--close-top` | `60px` | Dimension de composant | hors contrat — dimension de composant |
| `--col-text` | `500px` | Dimension de composant | `--k-container` (dérivable) |
| `--col-scene` | `30rem` | Dimension de composant | hors contrat — dimension de composant |
| `--ease-line` | `cubic-bezier(0.95, 0.05, 0.795, 0.035)` | Mouvement | `--k-sig-ease-line` |
| `--ease` | `cubic-bezier(0.7, 0, 0.3, 1)` | Mouvement | `--k-ease-in-out` |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Mouvement | `--k-ease-out` |
| `--dur-line` | `600ms` | Mouvement | `--k-dur-fast` (dérivable) |
| `--dur-fade` | `700ms` | Mouvement | `--k-dur-base` |
| `--dur-scene` | `1400ms` | Mouvement | `--k-dur-slow` |
| `--dur-dust` | `900ms` | Mouvement | `--k-sig-dur-dust` |

## b. Composants de `examples/demo.html`

| Composant | Nom(s) dans la démo | États présents | États manquants |
|---|---|---|---|
| Barre de navigation | `.hud` | repos, survol, focus | actif |
| Héros | `.stage` | repos | — |
| Bouton principal | `.open`, `.more` | repos, survol, focus, actif | désactivé, chargement |
| Bouton rond / icône | `.close`, `.social`, `.about-btn` | repos, survol, focus | actif, désactivé |
| Onglets / sélecteur | `.lang` | repos, focus | survol, actif, désactivé |
| Carrousel / pagination | `.nums` | repos, survol, focus, actif | désactivé |
| Panneau / modale | `.about` | repos, focus, actif | — |

Le focus est assuré par une règle globale `:focus-visible` (présente dans les 23 démos) ; il est compté comme présent pour tout composant interactif, mais rarement dessiné composant par composant.

Classes propres au skill (hors composants communs) : `.copy`, `.handle`, `.pull`, `.scene`, `.dim`, `.dust`, `.brand`, `.grain`, `.intro-quote`, `.tip`, `.last`.

Balises : nav ×1, main ×1, aside ×1, button ×6, a ×3, ul ×1, h1 ×1, h2 ×1.

Attributs d'accessibilité : aria-label ×6, aria-hidden ×2, aria-current ×1, aria-live ×1, role ×1, aria-modal ×1, aria-labelledby ×1.

## c. Schémas UX

- **Structure de page** : Écran unique sans défilement : une scène = image plein écran + titre + 3 lignes ; pagination par numéros ; panneau « À propos » latéral.
- **Navigation** : Numéros de chapitre en bas ; molette, flèches, Entrée et glisser font avancer.
- **Parcours** : Citation d'ouverture → tirer le cercle → scène suivante → … → dernière scène (rouge).
- **États** : Scène active, transition occupée (`busy`), texte effacé en poussière, panneau ouvert (`aria-modal`, `inert`).
- **Formulaire** : aucun formulaire.
- **Mouvement** : 1 animation(s) nommée(s) (dust) ; mécanismes : rAF, matchMedia, aria-set, keydown-keys, focus(), preventDefault, inert, wheel, pointer ; `prefers-reduced-motion` pris en compte (2 mention(s)).
- **Points de rupture** : max-width: 700px.

## d. Signature (à ne pas rendre générique)

- Le cercle à tirer le long d'une ligne pointillée.
- Le titre qui se défait en poussière.
- Noir et blanc strict, un seul rouge à la fin ; capitales de 10px.

## e. Défauts repérés (notés, non corrigés)

Relevés à la lecture :

- `<h1>` vide dans le HTML (rempli par script).
- Aucune balise `<img>` : les images sont en fond CSS, donc sans texte alternatif.
- Interface à 10px, texte à 13px.
- `--signal` sur fond = 3,63:1.
- Les 3 liens pointent sur `href="#"`.
- Contour de focus de 1px seulement.

Relevés automatiquement :

- Valeurs en px écrites en dur dans le CSS de la démo : 57 (pour 127 usages de `var()`), alors que SKILL.md annonce « aucune valeur en dur ».
- Aucune échelle d'espacement (`--space-*`) dans les tokens : les marges et écarts sont des valeurs px en dur.
- Paires de contraste validées seulement au seuil « grand texte » (3:1) : `signal:bg`. À vérifier à l'œil qu'elles ne servent jamais à du petit texte.
- Tailles de texte sous 12px : `--fs-ui` = 0.625rem.
- Survols non protégés par `@media (hover: hover)` : effets collants possibles au toucher.
- Pas de lien d'évitement (« aller au contenu »).
- 3 lien(s) `href="#"` (ne mènent nulle part).
- 6 bouton(s) sans attribut `type`.
- Un seul point de rupture (max-width: 700px) : pas de palier tablette.
- Aucun état désactivé (`:disabled`, `aria-disabled`) dans la démo.
- Aucun état vide (liste sans résultat, panier vide…) dans la démo.
