# Audit — cosmic-voyage

> Relevé en lecture seule. Sources : `references/tokens.css`, `examples/demo.html`, `SKILL.md`.
> Les états des composants sont détectés automatiquement à partir des sélecteurs CSS et des attributs ARIA de la démo, puis relus ; ils n'ont pas été vérifiés sur capture d'écran.

- Variables dans `tokens.css` : **90**
- Démo : 352 lignes, dont 76 de script ; polices chargées : Noto Sans, Noto Serif
- Rôles du contrat : 26 remplis, 5 dérivables, 5 absents (sur 36)

## a. Variables classées par rôle du contrat

### Surfaces

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-bg` | rempli | `--bg`, `--bg-top` |  |
| `--k-surface` | rempli | `--surface` |  |
| `--k-surface-2` | rempli | `--surface-2` |  |
| `--k-overlay` | rempli | `--glass-veil`, `--dim-side`, `--veil-world` |  |

### Texte

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-text` | rempli | `--text` |  |
| `--k-text-2` | rempli | `--text-soft` |  |
| `--k-text-muted` | rempli | `--muted` |  |
| `--k-on-accent` | rempli | `--on-accent` |  |

### Accent et états

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-accent` | rempli | `--accent` |  |
| `--k-accent-2` | rempli | `--gold`, `--accent-hot` |  |
| `--k-success` | absent | — |  |
| `--k-warning` | absent | — |  |
| `--k-danger` | dérivable | `--accent-hot` | bordure du champ invalide |
| `--k-focus` | dérivable | `--gold` |  |

### Filets

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-line` | rempli | `--line-dark` |  |
| `--k-line-strong` | rempli | `--line` |  |

### Typo

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-font-display` | rempli | `--font-title` |  |
| `--k-font-body` | rempli | `--font-ui` |  |
| `--k-font-mono` | absent | — |  |
| `--k-fs-hero` | rempli | `--text-hero` |  |
| `--k-fs-h1` | dérivable | `--text-world` |  |
| `--k-fs-h2` | rempli | `--text-xl` |  |
| `--k-fs-body` | rempli | `--text-base` |  |
| `--k-fs-small` | rempli | `--text-sm` |  |

### Formes

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-radius` | rempli | `--radius-2` |  |
| `--k-radius-lg` | rempli | `--radius-5` |  |
| `--k-border-w` | absent | — |  |
| `--k-cut` | dérivable | — | 0 ; le coin unique arrondi est une signature |

### Espace

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-space-1…12` | rempli | space-1…12 | 1,2,3,4,5,6,8,10,12 + 16,20 |
| `--k-edge` | absent | — |  |
| `--k-container` | rempli | `--container` |  |

### Mouvement

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-ease-out` | rempli | `--ease-out` |  |
| `--k-ease-in-out` | dérivable | `--ease-panel` |  |
| `--k-dur-fast` | rempli | `--dur-fast` |  |
| `--k-dur-base` | rempli | `--dur-base` |  |
| `--k-dur-slow` | rempli | `--dur-slow` |  |

### Rôles sans équivalent dans ce skill

`--k-success`, `--k-warning`, `--k-font-mono`, `--k-border-w`, `--k-edge`

### Toutes les variables de `tokens.css`

| Variable | Valeur | Famille | Rôle du contrat |
|---|---|---|---|
| `--bg` | `#070a1b` | Couleur | `--k-bg` |
| `--bg-top` | `#141936` | Couleur | `--k-bg` |
| `--bg-glow` | `#234177` | Couleur | `--k-sig-bg-glow` |
| `--bg-deep` | `#000000` | Couleur | `--k-sig-bg-deep` |
| `--nav` | `#121212` | Couleur | `--k-sig-nav` |
| `--sub` | `#121212` | Couleur | `--k-sig-sub` |
| `--surface` | `#111111` | Couleur | `--k-surface` |
| `--surface-2` | `#212226` | Couleur | `--k-surface-2` |
| `--glass` | `#1a264e` | Couleur | `--k-sig-glass` |
| `--glass-light` | `#7d8ea2` | Couleur | `--k-sig-glass-light` |
| `--ink-glass` | `#0b1324` | Couleur | `--k-sig-ink-glass` |
| `--glass-veil` | `rgb(93 127 181 / 0.42)` | Couleur | `--k-overlay` |
| `--glass-edge` | `rgb(255 255 255 / 0.22)` | Couleur | `--k-sig-glass-edge` |
| `--text` | `#e9e9e9` | Couleur | `--k-text` |
| `--text-soft` | `#ccd0d2` | Couleur | `--k-text-2` |
| `--muted` | `#919191` | Couleur | `--k-text-muted` |
| `--gold` | `#dbbf91` | Couleur | `--k-accent-2` |
| `--accent` | `#db9a45` | Couleur | `--k-accent` |
| `--accent-hot` | `#df9540` | Couleur | `--k-accent-2` |
| `--on-accent` | `#000000` | Couleur | `--k-on-accent` |
| `--accent-sand` | `#d9c29a` | Couleur | `--k-sig-accent-sand` |
| `--link` | `#307af7` | Couleur | `--k-sig-link` |
| `--line` | `rgb(230 230 230 / 0.5)` | Couleur | `--k-line-strong` |
| `--line-dark` | `#323339` | Couleur | `--k-line` |
| `--quote-strip` | `rgb(0 0 0 / 0.72)` | Couleur | `--k-sig-quote-strip` |
| `--map-bg` | `#061230` | Couleur | `--k-sig-map-bg` |
| `--map-bg-2` | `#0d2358` | Couleur | `--k-sig-map-bg-2` |
| `--orbit` | `rgb(255 255 255 / 0.38)` | Couleur | `--k-sig-orbit` |
| `--orbit-dim` | `rgb(255 255 255 / 0.16)` | Couleur | `--k-sig-orbit-dim` |
| `--halo` | `rgb(91 157 255 / 0.55)` | Couleur | `--k-sig-halo` |
| `--label-bg` | `#0b1324` | Couleur | `--k-sig-label-bg` |
| `--veil-world` | `rgb(6 18 48 / 0.62)` | Couleur | `--k-overlay` |
| `--dim-side` | `rgb(0 0 0 / 0.55)` | Couleur | `--k-overlay` |
| `--pill` | `#ffffff` | Couleur | `--k-sig-pill` |
| `--cta-yellow` | `#ffd93b` | Couleur | `--k-sig-cta-yellow` |
| `--cta-yellow-edge` | `#c9962b` | Couleur | `--k-sig-cta-yellow-edge` |
| `--cta-glow` | `rgb(255 217 59 / 0.45)` | Couleur | `--k-sig-cta-glow` |
| `--ring-a` | `#8b5cf6` | Couleur | `--k-sig-ring-a` |
| `--ring-b` | `#5b9dff` | Couleur | `--k-sig-ring-b` |
| `--ring-c` | `#ff9d3c` | Couleur | `--k-sig-ring-c` |
| `--cookie-blue` | `#2a63d4` | Couleur | `--k-sig-cookie-blue` |
| `--on-cookie` | `#ffffff` | Couleur | `--k-sig-on-cookie` |
| `--font-ui` | `'Noto Sans', 'Noto Sans SC', 'Microsoft YaHei', system-ui, sans-serif` | Typo | `--k-font-body` |
| `--font-title` | `'Noto Sans', 'Noto Sans SC', system-ui, sans-serif` | Typo | `--k-font-display` |
| `--font-quote` | `'Noto Serif', 'Noto Serif SC', Georgia, serif` | Typo | hors contrat — typo (candidat `--k-sig-font-quote`) |
| `--text-2xs` | `0.6875rem` | Typo | hors contrat — typo (candidat `--k-sig-text-2xs`) |
| `--text-xs` | `0.75rem` | Typo | hors contrat — typo (candidat `--k-sig-text-xs`) |
| `--text-sm` | `0.875rem` | Typo | `--k-fs-small` |
| `--text-base` | `0.9375rem` | Typo | `--k-fs-body` |
| `--text-lg` | `1.5rem` | Typo | hors contrat — typo (candidat `--k-sig-text-lg`) |
| `--text-xl` | `1.875rem` | Typo | `--k-fs-h2` |
| `--text-hero` | `3.125rem` | Typo | `--k-fs-hero` |
| `--text-orbit` | `0.6875rem` | Typo | hors contrat — typo (candidat `--k-sig-text-orbit`) |
| `--text-world` | `2.25rem` | Typo | `--k-fs-h1` (dérivable) |
| `--leading` | `1.6` | Typo | hors contrat — typo (candidat `--k-sig-leading`) |
| `--space-1` | `4px` | Espace | `--k-space-1…12` |
| `--space-2` | `8px` | Espace | `--k-space-1…12` |
| `--space-3` | `12px` | Espace | `--k-space-1…12` |
| `--space-4` | `16px` | Espace | `--k-space-1…12` |
| `--space-5` | `20px` | Espace | `--k-space-1…12` |
| `--space-6` | `24px` | Espace | `--k-space-1…12` |
| `--space-8` | `32px` | Espace | `--k-space-1…12` |
| `--space-10` | `40px` | Espace | `--k-space-1…12` |
| `--space-12` | `48px` | Espace | `--k-space-1…12` |
| `--space-16` | `64px` | Espace | `--k-space-1…12` |
| `--space-20` | `80px` | Espace | `--k-space-1…12` |
| `--nav-h` | `57px` | Dimension de composant | hors contrat — dimension de composant |
| `--card-w` | `clamp(260px, 29.4vw, 424px)` | Dimension de composant | hors contrat — dimension de composant |
| `--char-w` | `clamp(150px, 15.7vw, 226px)` | Dimension de composant | hors contrat — dimension de composant |
| `--emblem` | `clamp(72px, 7.5vw, 108px)` | Dimension de composant | hors contrat — dimension de composant |
| `--more-w` | `146px` | Dimension de composant | hors contrat — dimension de composant |
| `--container` | `880px` | Espace | `--k-container` |
| `--nav-h-mobile` | `52px` | Dimension de composant | hors contrat — dimension de composant |
| `--world-icon` | `64px` | Dimension de composant | hors contrat — dimension de composant |
| `--radius-1` | `6px` | Formes | `--k-sig-radius-1` |
| `--radius-2` | `12px` | Formes | `--k-radius` |
| `--radius-3` | `16px` | Formes | `--k-sig-radius-3` |
| `--radius-4` | `20px` | Formes | `--k-sig-radius-4` |
| `--radius-5` | `28px` | Formes | `--k-radius-lg` |
| `--radius-card` | `0 var(--radius-5) 0 0` | Formes | `--k-sig-radius-card` |
| `--ease` | `ease` | Mouvement | `--k-sig-ease` |
| `--ease-out` | `cubic-bezier(0.22, 0.61, 0.36, 1)` | Mouvement | `--k-ease-out` |
| `--ease-panel` | `cubic-bezier(0.15, 0.59, 0.45, 0.89)` | Mouvement | `--k-ease-in-out` (dérivable) |
| `--dur-fast` | `200ms` | Mouvement | `--k-dur-fast` |
| `--dur-base` | `300ms` | Mouvement | `--k-dur-base` |
| `--dur-name` | `400ms` | Mouvement | `--k-sig-dur-name` |
| `--dur-slow` | `500ms` | Mouvement | `--k-dur-slow` |
| `--dur-view` | `600ms` | Mouvement | `--k-sig-dur-view` |
| `--dur-hint` | `2s` | Mouvement | `--k-sig-dur-hint` |
| `--dur-star` | `1.4s` | Mouvement | `--k-sig-dur-star` |

## b. Composants de `examples/demo.html`

| Composant | Nom(s) dans la démo | États présents | États manquants |
|---|---|---|---|
| Barre de navigation | `.nav`, `.rail`, `.burger` | repos, survol, focus, actif | — |
| Héros | `.intro`, `.hero` | repos | — |
| Bouton principal | `.btn`, `.more`, `.cta` | repos, survol, focus, chargement | actif, désactivé |
| Bouton rond / icône | `.arrow`, `.play` | repos, survol, focus, désactivé | actif |
| Carte | `.ncard`, `.ccard`, `.world` | repos, survol, focus, actif | chargement, vide |
| Carrousel / pagination | `.frieze` | repos, focus, actif | survol, désactivé |
| Champ / formulaire | `.sub`, `.news`, `.hint` | repos, focus, chargement, erreur | désactivé |
| Panneau / modale | `.panel` | repos, focus, actif | — |

Le focus est assuré par une règle globale `:focus-visible` (présente dans les 23 démos) ; il est compté comme présent pour tout composant interactif, mais rarement dessiné composant par composant.

Classes propres au skill (hors composants communs) : `.music`, `.dl`, `.night`, `.mark`, `.stores`, `.store`, `.arrow--p`, `.arrow--n`, `.chars`, `.fiche`, `.star`, `.map`, `.orbit`, `.orbit--dash`.

Balises : header ×1, nav ×1, main ×1, section ×5, aside ×1, footer ×1, form ×1, input ×2, button ×6, a ×22, img ×8, canvas ×1, ul ×2, label ×2, svg ×7, h1 ×1, h2 ×4, h3 ×1.

Attributs d'accessibilité : aria-label ×14, aria-hidden ×7, aria-labelledby ×4, role ×3, aria-pressed ×3, aria-live ×2, aria-current ×1, aria-describedby ×1.

## c. Schémas UX

- **Structure de page** : Page longue : héros → actualités (carrousel) → personnages (frise + fiche) → mondes (carte) → abonnement → pied. Rail latéral fixe.
- **Navigation** : Barre noire fixe + rail vertical à nœuds dorés ; lien d'évitement présent (seul skill à en avoir un).
- **Parcours** : Arrivée → actualités → choisir un personnage (emblèmes) → explorer un monde → s'abonner.
- **États** : Flèches de carrousel désactivées en bout de course (seul skill avec `:disabled`), emblème choisi, champ `aria-invalid`, bouton `aria-busy`, message `aria-live`.
- **Formulaire** : validation + erreur + chargement.
- **Mouvement** : 5 animation(s) nommée(s) (bar, sheen, spin, hint, twinkle) ; mécanismes : IntersectionObserver, rAF, matchMedia, aria-set, focus(), preventDefault ; `prefers-reduced-motion` pris en compte (2 mention(s)).
- **Points de rupture** : max-width: 860px.

## d. Signature (à ne pas rendre générique)

- Le fil d'or vertical à nœuds et les cartes à un seul coin arrondi.
- Panneau de verre bleu peint (sans flou) d'où sort le personnage.
- Petite typo 11–15px, or en ornement uniquement.

## e. Défauts repérés (notés, non corrigés)

Relevés à la lecture :

- 6 `transition: all` dans la démo.
- Anneau du bouton lecture en dégradé violet → bleu → orange : `--ring-a: #8b5cf6` est le violet par défaut le plus répandu (valeur « estimée » d'après le commentaire).
- Texte de liste dominant à 11px.
- 7 images sur 8 avec `alt` vide.
- Un `<h3>` vide dans la section personnages (rempli par script).

Relevés automatiquement :

- Valeurs en px écrites en dur dans le CSS de la démo : 142 (pour 300 usages de `var()`), alors que SKILL.md annonce « aucune valeur en dur ».
- Tailles de texte sous 12px : `--text-2xs` = 0.6875rem, `--text-orbit` = 0.6875rem.
- `transition: all` : 6 occurrence(s).
- 3 règles de survol avec `scale()` (motif « tout grossit au survol »).
- Survols non protégés par `@media (hover: hover)` : effets collants possibles au toucher.
- Un seul point de rupture (max-width: 860px) : pas de palier tablette.
- Aucun état vide (liste sans résultat, panier vide…) dans la démo.
