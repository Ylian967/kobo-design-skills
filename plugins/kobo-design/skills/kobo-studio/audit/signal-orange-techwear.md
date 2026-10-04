# Audit — signal-orange-techwear

> Relevé en lecture seule. Sources : `references/tokens.css`, `examples/demo.html`, `SKILL.md`.
> Les états des composants sont détectés automatiquement à partir des sélecteurs CSS et des attributs ARIA de la démo, puis relus ; ils n'ont pas été vérifiés sur capture d'écran.

- Variables dans `tokens.css` : **47**
- Démo : 432 lignes, dont 60 de script ; polices chargées : Orbitron, Unbounded
- Rôles du contrat : 24 remplis, 2 dérivables, 10 absents (sur 36)

## a. Variables classées par rôle du contrat

### Surfaces

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-bg` | rempli | `--bg` |  |
| `--k-surface` | rempli | `--panel-solid`, `--panel` |  |
| `--k-surface-2` | rempli | `--screen` |  |
| `--k-overlay` | rempli | `--veil-1`, `--veil-2` |  |

### Texte

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-text` | rempli | `--text` |  |
| `--k-text-2` | absent | — |  |
| `--k-text-muted` | rempli | `--muted` |  |
| `--k-on-accent` | rempli | `--on-orange` |  |

### Accent et états

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-accent` | rempli | `--orange` |  |
| `--k-accent-2` | rempli | `--orange-deep` |  |
| `--k-success` | absent | — |  |
| `--k-warning` | absent | — |  |
| `--k-danger` | absent | — |  |
| `--k-focus` | dérivable | `--orange` |  |

### Filets

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-line` | rempli | `--line-soft` |  |
| `--k-line-strong` | rempli | `--line` |  |

### Typo

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-font-display` | rempli | `--font-display` |  |
| `--k-font-body` | rempli | `--font` |  |
| `--k-font-mono` | absent | — |  |
| `--k-fs-hero` | rempli | `--fs-title` |  |
| `--k-fs-h1` | absent | — |  |
| `--k-fs-h2` | dérivable | `--fs-lead` |  |
| `--k-fs-body` | rempli | `--fs-body` | 14px |
| `--k-fs-small` | rempli | `--fs-small` |  |

### Formes

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-radius` | rempli | `--r` | 2px |
| `--k-radius-lg` | absent | — |  |
| `--k-border-w` | rempli | `--stroke` |  |
| `--k-cut` | absent | — |  |

### Espace

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-space-1…12` | absent | — |  |
| `--k-edge` | rempli | `--pad` |  |
| `--k-container` | rempli | `--page` |  |

### Mouvement

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-ease-out` | rempli | `--ease` |  |
| `--k-ease-in-out` | absent | — |  |
| `--k-dur-fast` | rempli | `--dur-fast` |  |
| `--k-dur-base` | rempli | `--dur` |  |
| `--k-dur-slow` | rempli | `--dur-slow` |  |

### Rôles sans équivalent dans ce skill

`--k-text-2`, `--k-success`, `--k-warning`, `--k-danger`, `--k-font-mono`, `--k-fs-h1`, `--k-radius-lg`, `--k-cut`, `--k-space-1…12`, `--k-ease-in-out`

### Toutes les variables de `tokens.css`

| Variable | Valeur | Famille | Rôle du contrat |
|---|---|---|---|
| `--bg` | `#0e0e0f` | Couleur | `--k-bg` |
| `--screen` | `#141515` | Couleur | `--k-surface-2` |
| `--footer` | `#0a0a0b` | Couleur | `--k-sig-footer` |
| `--panel` | `rgb(16 14 13 / 0.74)` | Couleur | `--k-surface` |
| `--panel-solid` | `#171413` | Couleur | `--k-surface` |
| `--panel-hot` | `rgb(224 92 26 / 0.12)` | Couleur | `--k-sig-panel-hot` |
| `--line` | `rgb(255 255 255 / 0.2)` | Couleur | `--k-line-strong` |
| `--line-soft` | `rgb(255 255 255 / 0.1)` | Couleur | `--k-line` |
| `--orange` | `#e05c1a` | Couleur | `--k-accent` |
| `--on-orange` | `#0e0e0f` | Couleur | `--k-on-accent` |
| `--orange-deep` | `#b8430a` | Couleur | `--k-accent-2` |
| `--text` | `#ffffff` | Couleur | `--k-text` |
| `--muted` | `#a9a9a9` | Couleur | `--k-text-muted` |
| `--fog` | `#dcdcdc` | Couleur | `--k-sig-fog` |
| `--fog-panel` | `#ececec` | Couleur | `--k-sig-fog-panel` |
| `--ink` | `#0e0e0f` | Couleur | `--k-sig-ink` |
| `--veil-0` | `rgb(14 14 15 / 0)` | Couleur | `--k-sig-veil-0` |
| `--veil-1` | `rgb(14 14 15 / 0.62)` | Couleur | `--k-overlay` |
| `--veil-2` | `rgb(14 14 15 / 0.94)` | Couleur | `--k-overlay` |
| `--fog-0` | `rgb(220 220 220 / 0)` | Couleur | `--k-sig-fog-0` |
| `--fog-1` | `rgb(220 220 220 / 0.92)` | Couleur | `--k-sig-fog-1` |
| `--font-display` | `'Unbounded', 'Arial Black', sans-serif` | Typo | `--k-font-display` |
| `--font` | `'Orbitron', 'Eurostile', 'Segoe UI', sans-serif` | Typo | `--k-font-body` |
| `--fs-title` | `clamp(2.05rem, 4.6vw, 4.15rem)` | Typo | `--k-fs-hero` |
| `--lh-title` | `1.04` | Typo | hors contrat — typo (candidat `--k-sig-lh-title`) |
| `--fs-lead` | `1rem` | Typo | `--k-fs-h2` (dérivable) |
| `--fs-body` | `0.875rem` | Typo | `--k-fs-body` |
| `--fs-small` | `0.75rem` | Typo | `--k-fs-small` |
| `--fs-tiny` | `0.6875rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-tiny`) |
| `--ls-label` | `0.18em` | Typo | hors contrat — typo (candidat `--k-sig-ls-label`) |
| `--stroke` | `1.5px` | Formes | `--k-border-w` |
| `--page` | `1440px` | Espace | `--k-container` |
| `--screen-h` | `852px` | Dimension de composant | hors contrat — dimension de composant |
| `--pad` | `clamp(16px, 2.8vw, 40px)` | Espace | `--k-edge` |
| `--nav-top` | `39px` | Dimension de composant | hors contrat — dimension de composant |
| `--aside-w` | `310px` | Dimension de composant | hors contrat — dimension de composant |
| `--row-h` | `43px` | Dimension de composant | hors contrat — dimension de composant |
| `--circle` | `36px` | Dimension de composant | hors contrat — dimension de composant |
| `--tab-h` | `30px` | Dimension de composant | hors contrat — dimension de composant |
| `--look-w` | `clamp(104px, 11.4vw, 164px)` | Dimension de composant | hors contrat — dimension de composant |
| `--look-h` | `clamp(34px, 3.6vw, 52px)` | Dimension de composant | hors contrat — dimension de composant |
| `--r` | `2px` | Formes | `--k-radius` |
| `--ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | Mouvement | `--k-ease-out` |
| `--ease-cut` | `steps(5, end)` | Mouvement | `--k-sig-ease-cut` |
| `--dur-fast` | `160ms` | Mouvement | `--k-dur-fast` |
| `--dur` | `450ms` | Mouvement | `--k-dur-base` |
| `--dur-slow` | `900ms` | Mouvement | `--k-dur-slow` |

## b. Composants de `examples/demo.html`

| Composant | Nom(s) dans la démo | États présents | États manquants |
|---|---|---|---|
| Barre de navigation | `.nav-links`, `.nav`, `.nav-tools`, `.burger` | repos, survol, focus, actif | — |
| Héros | `.hero`, `.hero-copy` | repos | — |
| Bouton principal | `.next`, `.more`, `.btn--full`, `.add`, `.btn`, `.buy` | repos, survol, focus | actif, désactivé, chargement |
| Bouton rond / icône | `.socials` | repos, survol, focus | actif, désactivé |
| Onglets / sélecteur | `.tab`, `.tabs` | repos, survol, focus, actif | désactivé |
| Carte | `.system`, `.card`, `.look`, `.cards` | repos, survol, focus | chargement, vide |
| Puce / étiquette | `.kicker`, `.label`, `.tag` | repos | actif |
| Panneau / modale | `.sheet`, `.panel` | repos, focus | actif |
| Chiffres clés | `.count` | repos | — |
| Indice de défilement | `.scroll` | repos | — |
| Pied de page | `.foot` | repos, survol, focus | — |

Le focus est assuré par une règle globale `:focus-visible` (présente dans les 23 démos) ; il est compté comme présent pour tout composant interactif, mais rarement dessiné composant par composant.

Classes propres au skill (hors composants communs) : `.figure`, `.specs`, `.sheet-copy`, `.vertical`, `.depth`, `.sheet-photo`, `.panel--fog`, `.screen`, `.stack`, `.aside`, `.product`, `.card-foot`, `.logo`, `.screen-bg`, `.systems`, `.motto`, `.card-head`, `.sheet-aside`, `.hollow`, `.slashes`, `.index`, `.rubric`, `.lookno`, `.bag-word`.

Balises : nav ×1, main ×1, section ×6, article ×7, aside ×1, footer ×1, button ×14, a ×25, img ×14, ul ×1, svg ×4, h1 ×1, h2 ×5, h3 ×9.

Attributs d'accessibilité : aria-label ×14, aria-hidden ×8, aria-pressed ×4, aria-live ×2, aria-labelledby ×2, role ×2, aria-expanded ×1, aria-controls ×1, aria-checked ×1.

## c. Schémas UX

- **Structure de page** : Quatre écrans : accueil (silhouette + specs) → collection (3 systèmes) → équipement (grille à onglets) → fiche produit → pied.
- **Navigation** : Barre haute (liens, compteur de panier), icônes rondes ; menu mobile.
- **Parcours** : Collection → système → pièce → fiche (taille, ajout au panier).
- **États** : Onglets `aria-pressed`, panier `aria-live`, taille `aria-checked`. Pas de formulaire.
- **Formulaire** : aucun formulaire.
- **Mouvement** : 1 animation(s) nommée(s) (bump) ; mécanismes : IntersectionObserver, rAF, matchMedia, setInterval, aria-set, pointer ; `prefers-reduced-motion` pris en compte (2 mention(s)).
- **Points de rupture** : max-width: 1080px, max-width: 760px.

## d. Signature (à ne pas rendre générique)

- Titre empilé à quatre registres (orange plein, « // », creux, blanc).
- Tableau « specs opérateur » : étiquettes orange espacées face à des valeurs grises.
- Panneaux translucides à filet de 1px, angles de 2px.

## e. Défauts repérés (notés, non corrigés)

Relevés à la lecture :

- Le « coin coupé » des cartes annoncé dans la description n'a ni token ni `clip-path` dans la démo.
- 14 boutons sans `type`, 4 liens `href="#"`.
- Orbitron pour tout le texte courant, à 14px / 11px : lisibilité à vérifier.
- Aucun `<header>`.
- Pas d'état « rupture de stock » ni désactivé.

Relevés automatiquement :

- Rayons écrits en dur dans la démo : 99px, 4px.
- Valeurs en px écrites en dur dans le CSS de la démo : 159 (pour 200 usages de `var()`), alors que SKILL.md annonce « aucune valeur en dur ».
- Aucune échelle d'espacement (`--space-*`) dans les tokens : les marges et écarts sont des valeurs px en dur.
- Paires de contraste validées seulement au seuil « grand texte » (3:1) : `orange-deep:fog`. À vérifier à l'œil qu'elles ne servent jamais à du petit texte.
- Tailles de texte sous 12px : `--fs-tiny` = 0.6875rem.
- Survols non protégés par `@media (hover: hover)` : effets collants possibles au toucher.
- Pas de lien d'évitement (« aller au contenu »).
- 4 lien(s) `href="#"` (ne mènent nulle part).
- 14 bouton(s) sans attribut `type`.
- Aucun état désactivé (`:disabled`, `aria-disabled`) dans la démo.
- Aucun état vide (liste sans résultat, panier vide…) dans la démo.
