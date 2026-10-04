# Audit — alpine-glass-expedition

> Relevé en lecture seule. Sources : `references/tokens.css`, `examples/demo.html`, `SKILL.md`.
> Les états des composants sont détectés automatiquement à partir des sélecteurs CSS et des attributs ARIA de la démo, puis relus ; ils n'ont pas été vérifiés sur capture d'écran.

- Variables dans `tokens.css` : **72**
- Démo : 630 lignes, dont 165 de script ; polices chargées : Archivo, Roboto Serif
- Rôles du contrat : 20 remplis, 10 dérivables, 6 absents (sur 36)

## a. Variables classées par rôle du contrat

### Surfaces

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-bg` | rempli | `--deep` |  |
| `--k-surface` | dérivable | `--tarn`, `--ridge` | bleus de la rampe, non nommés « surface » |
| `--k-surface-2` | dérivable | `--ridge`, `--slate` |  |
| `--k-overlay` | absent | — |  |

### Texte

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-text` | rempli | `--white` |  |
| `--k-text-2` | rempli | `--frost`, `--snow` |  |
| `--k-text-muted` | rempli | `--muted` |  |
| `--k-on-accent` | dérivable | `--ink` | texte sombre sur la pilule blanche |

### Accent et états

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-accent` | dérivable | `--white` | l'action principale est une pilule blanche : pas de couleur d'accent |
| `--k-accent-2` | dérivable | `--star` | seul point chaud de l'interface |
| `--k-success` | absent | — |  |
| `--k-warning` | absent | — |  |
| `--k-danger` | rempli | `--ember` | réservé aux erreurs (SKILL.md) |
| `--k-focus` | dérivable | `--white` |  |

### Filets

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-line` | rempli | `--line` |  |
| `--k-line-strong` | absent | — |  |

### Typo

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-font-display` | rempli | `--font-display` |  |
| `--k-font-body` | rempli | `--font-ui` |  |
| `--k-font-mono` | absent | — |  |
| `--k-fs-hero` | rempli | `--fs-hero` |  |
| `--k-fs-h1` | dérivable | `--fs-hero` |  |
| `--k-fs-h2` | rempli | `--fs-h2` |  |
| `--k-fs-body` | dérivable | `--fs-lead`, `--fs-ui` |  |
| `--k-fs-small` | rempli | `--fs-small` |  |

### Formes

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-radius` | dérivable | `--r-card` | un seul rayon de carte (28px) + pilule |
| `--k-radius-lg` | rempli | `--r-card` |  |
| `--k-border-w` | absent | — |  |
| `--k-cut` | dérivable | — | 0 |

### Espace

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-space-1…12` | rempli | space-1…12 | 1,2,3,4,6,8,12 + 16,24,32 |
| `--k-edge` | rempli | `--edge`, `--edge-end` |  |
| `--k-container` | rempli | `--container` |  |

### Mouvement

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-ease-out` | rempli | `--ease` |  |
| `--k-ease-in-out` | rempli | `--ease-in-out` |  |
| `--k-dur-fast` | rempli | `--dur-fast` |  |
| `--k-dur-base` | rempli | `--dur` |  |
| `--k-dur-slow` | rempli | `--dur-slow` |  |

### Rôles sans équivalent dans ce skill

`--k-overlay`, `--k-success`, `--k-warning`, `--k-line-strong`, `--k-font-mono`, `--k-border-w`

### Toutes les variables de `tokens.css`

| Variable | Valeur | Famille | Rôle du contrat |
|---|---|---|---|
| `--white` | `#ffffff` | Couleur | `--k-text` |
| `--snow` | `#ebecee` | Couleur | `--k-text-2` |
| `--frost` | `#eff3f8` | Couleur | `--k-text-2` |
| `--mist` | `#d8e2eb` | Couleur | `--k-sig-mist` |
| `--haze` | `#afc4d4` | Couleur | `--k-sig-haze` |
| `--sky` | `#a0d3fe` | Couleur | `--k-sig-sky` |
| `--glacier` | `#76a9d4` | Couleur | `--k-sig-glacier` |
| `--steel` | `#4e7795` | Couleur | `--k-sig-steel` |
| `--slate` | `#3a5f79` | Couleur | `--k-surface-2` (dérivable) |
| `--ridge` | `#264d66` | Couleur | `--k-surface` (dérivable) |
| `--tarn` | `#203d4f` | Couleur | `--k-surface` (dérivable) |
| `--deep` | `#1b2d3b` | Couleur | `--k-bg` |
| `--abyss` | `#182a38` | Couleur | `--k-sig-abyss` |
| `--ink` | `#142633` | Couleur | `--k-on-accent` (dérivable) |
| `--muted` | `#9db3c4` | Couleur | `--k-text-muted` |
| `--star` | `#efa801` | Couleur | `--k-accent-2` (dérivable) |
| `--ember` | `#e8742c` | Couleur | `--k-danger` |
| `--line` | `rgb(255 255 255 / 0.22)` | Couleur | `--k-line` |
| `--line-ink` | `rgb(20 38 51 / 0.18)` | Couleur | `--k-sig-line-ink` |
| `--pill-glow` | `#91b6d3` | Couleur | `--k-sig-pill-glow` |
| `--font-display` | `'Roboto Serif', 'Source Serif 4', Georgia, serif` | Typo | `--k-font-display` |
| `--font-ui` | `'Archivo', 'Inter', system-ui, sans-serif` | Typo | `--k-font-body` |
| `--display-weight` | `500` | Typo | hors contrat — typo (candidat `--k-sig-display-weight`) |
| `--display-wdth` | `90%` | Typo | hors contrat — typo (candidat `--k-sig-display-wdth`) |
| `--fs-hero` | `clamp(2.75rem, 8.5vw, 7.66rem)` | Typo | `--k-fs-hero` |
| `--lh-hero` | `0.92` | Typo | hors contrat — typo (candidat `--k-sig-lh-hero`) |
| `--ls-hero` | `-0.035em` | Typo | hors contrat — typo (candidat `--k-sig-ls-hero`) |
| `--fs-h2` | `clamp(2.25rem, 5vw, 4.5rem)` | Typo | `--k-fs-h2` |
| `--fs-h3` | `clamp(1.5rem, 2.1vw, 1.875rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-h3`) |
| `--fs-quote` | `clamp(1.5rem, 2.9vw, 2.625rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-quote`) |
| `--fs-lead` | `clamp(1rem, 1.39vw, 1.25rem)` | Typo | `--k-fs-body` (dérivable) |
| `--lh-lead` | `1.5` | Typo | hors contrat — typo (candidat `--k-sig-lh-lead`) |
| `--fs-caps` | `clamp(1rem, 1.67vw, 1.5rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-caps`) |
| `--fs-ui` | `clamp(0.8125rem, 1.11vw, 1rem)` | Typo | `--k-fs-body` (dérivable) |
| `--fs-small` | `0.875rem` | Typo | `--k-fs-small` |
| `--fs-rating` | `clamp(2.75rem, 4.65vw, 4.19rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-rating`) |
| `--rating-wdth` | `70%` | Typo | hors contrat — typo (candidat `--k-sig-rating-wdth`) |
| `--fs-rating-label` | `clamp(0.875rem, 1.36vw, 1.225rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-rating-label`) |
| `--ls-nav` | `0.1em` | Typo | hors contrat — typo (candidat `--k-sig-ls-nav`) |
| `--ls-btn` | `0.08em` | Typo | hors contrat — typo (candidat `--k-sig-ls-btn`) |
| `--ls-chip` | `0.04em` | Typo | hors contrat — typo (candidat `--k-sig-ls-chip`) |
| `--edge` | `clamp(16px, 6.32vw, 91px)` | Espace | `--k-edge` |
| `--edge-end` | `clamp(16px, 5.14vw, 74px)` | Espace | `--k-edge` |
| `--col-side` | `clamp(0px, 19.5vw, 281px)` | Dimension de composant | hors contrat — dimension de composant |
| `--lead-w` | `580px` | Dimension de composant | hors contrat — dimension de composant |
| `--nav-h` | `86px` | Dimension de composant | hors contrat — dimension de composant |
| `--pill-h` | `54px` | Dimension de composant | hors contrat — dimension de composant |
| `--chip-h` | `58px` | Dimension de composant | hors contrat — dimension de composant |
| `--chip-gap` | `16px` | Dimension de composant | hors contrat — dimension de composant |
| `--play` | `clamp(56px, 5.3vw, 76px)` | Dimension de composant | hors contrat — dimension de composant |
| `--glass` | `clamp(132px, 13.3vw, 192px)` | Dimension de composant | hors contrat — dimension de composant |
| `--container` | `1258px` | Espace | `--k-container` |
| `--r-pill` | `999px` | Formes | `--k-sig-r-pill` |
| `--r-card` | `28px` | Formes | `--k-radius` (dérivable) |
| `--space-1` | `4px` | Espace | `--k-space-1…12` |
| `--space-2` | `8px` | Espace | `--k-space-1…12` |
| `--space-3` | `12px` | Espace | `--k-space-1…12` |
| `--space-4` | `16px` | Espace | `--k-space-1…12` |
| `--space-6` | `24px` | Espace | `--k-space-1…12` |
| `--space-8` | `32px` | Espace | `--k-space-1…12` |
| `--space-12` | `48px` | Espace | `--k-space-1…12` |
| `--space-16` | `64px` | Espace | `--k-space-1…12` |
| `--space-24` | `96px` | Espace | `--k-space-1…12` |
| `--space-32` | `128px` | Espace | `--k-space-1…12` |
| `--ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | Mouvement | `--k-ease-out` |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Mouvement | `--k-ease-in-out` |
| `--dur-fast` | `180ms` | Mouvement | `--k-dur-fast` |
| `--dur` | `420ms` | Mouvement | `--k-dur-base` |
| `--dur-slow` | `1100ms` | Mouvement | `--k-dur-slow` |
| `--dur-veil` | `1400ms` | Mouvement | `--k-sig-dur-veil` |
| `--dur-float` | `7s` | Mouvement | `--k-sig-dur-float` |
| `--dur-pulse` | `2.6s` | Mouvement | `--k-sig-dur-pulse` |

## b. Composants de `examples/demo.html`

| Composant | Nom(s) dans la démo | États présents | États manquants |
|---|---|---|---|
| Menu plein écran | `.menu` | repos, focus, actif | — |
| Barre de navigation | `.nav` | repos, survol, focus | actif |
| Héros | `.hero` | repos | — |
| Bouton principal | `.pill` | repos, survol, focus, actif, chargement | désactivé |
| Bouton rond / icône | `.orb`, `.play` | repos, survol, focus | actif, désactivé |
| Onglets / sélecteur | `.days`, `.chips`, `.filters` | repos, focus, actif | survol, désactivé |
| Carte | `.card`, `.cards` | repos, survol, focus | chargement, vide |
| Puce / étiquette | `.chip`, `.kicker` | repos, survol, actif | — |
| Accordéon / étapes | `.route` | repos, focus, actif | survol |
| Champ / formulaire | `.form`, `.hint` | repos, focus, chargement, erreur | désactivé |
| Panneau / modale | `.veil` | repos, focus | actif |
| Chiffres clés | `.rating`, `.stat`, `.stats` | repos | — |
| Citation / avis | `.voice`, `.quote` | repos, actif | — |

Le focus est assuré par une règle globale `:focus-visible` (présente dans les 23 démos) ; il est compté comme présent pour tout composant interactif, mais rarement dessiné composant par composant.

Classes propres au skill (hors composants communs) : `.final`, `.profile`, `.logo`, `.title`, `.ln`, `.orb-wrap`, `.trips`.

Balises : header ×1, nav ×1, main ×1, section ×5, footer ×1, form ×1, input ×1, button ×6, a ×18, img ×10, canvas ×1, ul ×3, label ×1, svg ×16, h1 ×1, h2 ×3, h3 ×4.

Attributs d'accessibilité : aria-hidden ×16, aria-label ×7, aria-labelledby ×5, aria-pressed ×4, role ×2, aria-expanded ×1, aria-controls ×1, aria-describedby ×1, aria-live ×1.

## c. Schémas UX

- **Structure de page** : Page longue : héros photo → cartes de séjours filtrables → itinéraire jour par jour → citation de guide → appel final avec formulaire → pied.
- **Navigation** : Barre haute (logo, liens centrés, pilule à droite), menu repliable sur mobile (`aria-expanded`).
- **Parcours** : Inspiration → choisir un séjour (puces de filtre) → lire l'itinéraire (onglets de jours) → confiance (guide, note) → inscription à la lettre.
- **États** : Chargement de page, filtres `aria-pressed`, champ avec erreur écrite, bouton `aria-busy`, message de succès. Pas d'état vide quand un filtre ne renvoie rien.
- **Formulaire** : validation + erreur + chargement.
- **Mouvement** : 3 animation(s) nommée(s) (pulse, star, float) ; mécanismes : IntersectionObserver, rAF, matchMedia, aria-set, keydown-keys, focus(), preventDefault, pointer ; `prefers-reduced-motion` pris en compte (2 mention(s)).
- **Points de rupture** : max-width: 860px.

## d. Signature (à ne pas rendre générique)

- La sphère de verre bleue (dégradé peint, sans flou) qui flotte au-dessus du titre.
- Serif en capitales énormes devant une photo de montagne refroidie.
- Tout est rond ; un seul point chaud (étoile, casque).

## e. Défauts repérés (notés, non corrigés)

Relevés à la lecture :

- Note « 4,8/5 ★ » sans source ni nombre d'avis.
- Citation de guide inventée (personne fictive).
- 5 règles de survol avec `scale()` : le motif « tout grossit au survol » est proche.

Relevés automatiquement :

- Rayons écrits en dur dans la démo : 4px.
- Valeurs en px écrites en dur dans le CSS de la démo : 103 (pour 309 usages de `var()`), alors que SKILL.md annonce « aucune valeur en dur ».
- Paires de contraste validées seulement au seuil « grand texte » (3:1) : `white:steel`, `frost:steel`. À vérifier à l'œil qu'elles ne servent jamais à du petit texte.
- 5 règles de survol avec `scale()` (motif « tout grossit au survol »).
- Survols non protégés par `@media (hover: hover)` : effets collants possibles au toucher.
- Pas de lien d'évitement (« aller au contenu »).
- Un seul point de rupture (max-width: 860px) : pas de palier tablette.
- Aucun état désactivé (`:disabled`, `aria-disabled`) dans la démo.
- Aucun état vide (liste sans résultat, panier vide…) dans la démo.
