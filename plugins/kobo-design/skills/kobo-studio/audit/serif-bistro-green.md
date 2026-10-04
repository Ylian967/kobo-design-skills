# Audit — serif-bistro-green

> Relevé en lecture seule. Sources : `references/tokens.css`, `examples/demo.html`, `SKILL.md`.
> Les états des composants sont détectés automatiquement à partir des sélecteurs CSS et des attributs ARIA de la démo, puis relus ; ils n'ont pas été vérifiés sur capture d'écran.

- Variables dans `tokens.css` : **48**
- Démo : 472 lignes, dont 67 de script ; polices chargées : Abril Fatface, DM Sans
- Rôles du contrat : 22 remplis, 6 dérivables, 8 absents (sur 36)

## a. Variables classées par rôle du contrat

### Surfaces

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-bg` | rempli | `--green` |  |
| `--k-surface` | rempli | `--cream` |  |
| `--k-surface-2` | rempli | `--cream-box`, `--green-card` |  |
| `--k-overlay` | dérivable | `--field` |  |

### Texte

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-text` | rempli | `--cream`, `--green` | crème sur vert, vert sur crème |
| `--k-text-2` | rempli | `--soft`, `--green-soft` |  |
| `--k-text-muted` | absent | — |  |
| `--k-on-accent` | dérivable | `--cream`, `--ink` | crème sur --orange-btn, encre sur --orange |

### Accent et états

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-accent` | rempli | `--orange` |  |
| `--k-accent-2` | rempli | `--orange-btn` |  |
| `--k-success` | absent | — |  |
| `--k-warning` | absent | — |  |
| `--k-danger` | absent | — |  |
| `--k-focus` | dérivable | `currentColor` |  |

### Filets

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-line` | rempli | `--line-green`, `--line-cream` |  |
| `--k-line-strong` | dérivable | `--line-art` |  |

### Typo

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-font-display` | rempli | `--font-display` |  |
| `--k-font-body` | rempli | `--font` |  |
| `--k-font-mono` | absent | — |  |
| `--k-fs-hero` | rempli | `--fs-hero` |  |
| `--k-fs-h1` | dérivable | `--fs-hero-2` |  |
| `--k-fs-h2` | rempli | `--fs-h2` |  |
| `--k-fs-body` | rempli | `--fs-body` |  |
| `--k-fs-small` | rempli | `--fs-small` |  |

### Formes

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-radius` | rempli | `--r-btn` |  |
| `--k-radius-lg` | rempli | `--r-card`, `--r-sheet` |  |
| `--k-border-w` | absent | — |  |
| `--k-cut` | dérivable | — | 0 |

### Espace

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-space-1…12` | absent | — |  |
| `--k-edge` | rempli | `--gutter` |  |
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

`--k-text-muted`, `--k-success`, `--k-warning`, `--k-danger`, `--k-font-mono`, `--k-border-w`, `--k-space-1…12`, `--k-ease-in-out`

### Toutes les variables de `tokens.css`

| Variable | Valeur | Famille | Rôle du contrat |
|---|---|---|---|
| `--green` | `#004e48` | Couleur | `--k-bg` |
| `--green-card` | `#18605a` | Couleur | `--k-surface-2` |
| `--cream` | `#fef8e6` | Couleur | `--k-surface` |
| `--cream-box` | `#fcf4e2` | Couleur | `--k-surface-2` |
| `--frame` | `#fae8d2` | Couleur | `--k-sig-frame` |
| `--orange` | `#e45834` | Couleur | `--k-accent` |
| `--orange-btn` | `#c8431f` | Couleur | `--k-accent-2` |
| `--paper` | `#ffffff` | Couleur | `--k-sig-paper` |
| `--ink` | `#1d1208` | Couleur | `--k-on-accent` (dérivable) |
| `--soft` | `#d5ddd0` | Couleur | `--k-text-2` |
| `--green-soft` | `#2f615c` | Couleur | `--k-text-2` |
| `--line-green` | `rgb(254 248 230 / 0.2)` | Couleur | `--k-line` |
| `--line-cream` | `rgb(0 78 72 / 0.18)` | Couleur | `--k-line` |
| `--line-art` | `rgb(254 248 230 / 0.6)` | Couleur | `--k-line-strong` (dérivable) |
| `--field` | `rgb(255 255 255 / 0.18)` | Couleur | `--k-overlay` (dérivable) |
| `--shadow` | `rgb(0 40 36 / 0.28)` | Couleur | `--k-sig-shadow` |
| `--font-display` | `'Abril Fatface', 'Bodoni 72', Georgia, serif` | Typo | `--k-font-display` |
| `--font` | `'DM Sans', 'Helvetica Neue', Arial, sans-serif` | Typo | `--k-font-body` |
| `--fs-hero` | `clamp(3.9rem, 10.6vw, 9.6rem)` | Typo | `--k-fs-hero` |
| `--fs-hero-2` | `clamp(2.5rem, 6.5vw, 5.9rem)` | Typo | `--k-fs-h1` (dérivable) |
| `--fs-stagger` | `clamp(3.4rem, 11vw, 10rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-stagger`) |
| `--fs-giant` | `clamp(3.6rem, 15.5vw, 14rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-giant`) |
| `--fs-h2` | `clamp(2.2rem, 4.4vw, 4rem)` | Typo | `--k-fs-h2` |
| `--fs-h3` | `1.5rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-h3`) |
| `--fs-card` | `1.125rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-card`) |
| `--fs-price` | `1.375rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-price`) |
| `--fs-lead` | `1.25rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-lead`) |
| `--fs-body` | `1rem` | Typo | `--k-fs-body` |
| `--fs-small` | `0.875rem` | Typo | `--k-fs-small` |
| `--fs-tiny` | `0.75rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-tiny`) |
| `--page` | `1440px` | Espace | `--k-container` |
| `--gutter` | `clamp(16px, 4.2vw, 60px)` | Espace | `--k-edge` |
| `--nav-w` | `1028px` | Dimension de composant | hors contrat — dimension de composant |
| `--nav-h` | `64px` | Dimension de composant | hors contrat — dimension de composant |
| `--btn-h` | `54px` | Dimension de composant | hors contrat — dimension de composant |
| `--btn-h-s` | `38px` | Dimension de composant | hors contrat — dimension de composant |
| `--r-btn` | `8px` | Formes | `--k-radius` |
| `--r-card` | `18px` | Formes | `--k-radius-lg` |
| `--r-sheet` | `clamp(24px, 3vw, 44px)` | Formes | `--k-radius-lg` |
| `--frame-w` | `8px` | Dimension de composant | hors contrat — dimension de composant |
| `--fav-w` | `300px` | Dimension de composant | hors contrat — dimension de composant |
| `--fav-gap` | `44px` | Dimension de composant | hors contrat — dimension de composant |
| `--arch-w` | `clamp(220px, 23vw, 340px)` | Dimension de composant | hors contrat — dimension de composant |
| `--ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | Mouvement | `--k-ease-out` |
| `--ease-back` | `cubic-bezier(0.34, 1.4, 0.64, 1)` | Mouvement | `--k-sig-ease-back` |
| `--dur-fast` | `200ms` | Mouvement | `--k-dur-fast` |
| `--dur` | `500ms` | Mouvement | `--k-dur-base` |
| `--dur-slow` | `1000ms` | Mouvement | `--k-dur-slow` |

## b. Composants de `examples/demo.html`

| Composant | Nom(s) dans la démo | États présents | États manquants |
|---|---|---|---|
| Barre de navigation | `.nav-links`, `.nav`, `.nav-tools`, `.burger` | repos, survol, focus, actif | — |
| Héros | `.hero-title`, `.hero-right`, `.hero-left`, `.hero`, `.hero-row`, `.hero-cta` | repos | — |
| Bouton principal | `.btn`, `.btn--line`, `.btn--s`, `.btn--paper`, `.go` | repos, survol, focus, actif | désactivé, chargement |
| Bouton rond / icône | `.round`, `.social`, `.fav` | repos, survol, focus | actif, désactivé |
| Onglets / sélecteur | `.chips` | repos, focus | survol, actif, désactivé |
| Carte | `.dish`, `.fav-card`, `.dishes` | repos, survol, focus | chargement, vide |
| Puce / étiquette | `.chip`, `.badge` | repos, survol, actif | — |
| Carrousel / pagination | `.dots`, `.fav-track` | repos, focus, actif | survol, désactivé |
| Champ / formulaire | `.news`, `.search` | repos, focus | erreur, désactivé, chargement |
| Panneau / modale | `.sheet` | repos, focus | actif |
| Pied de page | `.foot-grid`, `.foot`, `.legal` | repos, survol, focus | — |

Le focus est assuré par une règle globale `:focus-visible` (présente dans les 23 démos) ; il est compté comme présent pour tout composant interactif, mais rarement dessiné composant par composant.

Classes propres au skill (hors composants communs) : `.stagger`, `.banner`, `.logo`, `.frame`, `.stagger-text`, `.mask`, `.arch`, `.plate`, `.fav-foot`, `.art`, `.dish-foot`, `.giant`, `.sheet--cream`, `.sheet--orange`, `.sheet--green`, `.price`, `.frames`.

Balises : header ×1, nav ×1, main ×1, section ×5, article ×8, footer ×1, form ×1, input ×1, button ×9, a ×33, img ×18, ul ×4, label ×1, svg ×10, h1 ×1, h2 ×5, h3 ×16.

Attributs d'accessibilité : aria-label ×14, aria-pressed ×6, aria-hidden ×2, role ×2, aria-expanded ×1, aria-controls ×1, aria-live ×1.

## c. Schémas UX

- **Structure de page** : Feuilles empilées : héros vert → incontournables (carrousel) → titre échelonné → carte (grille filtrable) → soirées → contact orange → pied vert.
- **Navigation** : Barre flottante translucide à pilules + bouton « Réserver » ; menu mobile.
- **Parcours** : Ambiance → plats phares → carte (puces de filtre) → réserver / lettre d'info.
- **États** : Filtres `aria-pressed`, carrousel avec points, annonce `aria-live`. Formulaire : le bouton affiche « Merci ! » sans validation ni erreur.
- **Formulaire** : succès affiché sans validation ni erreur.
- **Mouvement** : 0 animation(s) nommée(s) (—) ; mécanismes : IntersectionObserver, rAF, matchMedia, setInterval, aria-set ; `prefers-reduced-motion` pris en compte (2 mention(s)).
- **Points de rupture** : max-width: 1000px, max-width: 760px.

## d. Signature (à ne pas rendre générique)

- Titre serif énorme avec une personne dans une arche entre les mots.
- Feuilles à grand rayon supérieur qui se recouvrent.
- Fiches de plats reliées par une spirale ; assiettes rondes vues de dessus.

## e. Défauts repérés (notés, non corrigés)

Relevés à la lecture :

- Formulaire : succès affiché sans validation, pas d'état d'erreur ni de chargement.
- Crème sur `--orange` = 3,44:1 (grand texte seulement).
- Rayons 10, 14, 99px en dur.
- Pas de section « Signature » dans SKILL.md (6 skills dans ce cas).
- Pas d'état vide si un filtre de carte ne renvoie rien.

Relevés automatiquement :

- Rayons écrits en dur dans la démo : 14px, 99px, 10px, 999px 999px 0 0.
- Valeurs en px écrites en dur dans le CSS de la démo : 162 (pour 174 usages de `var()`), alors que SKILL.md annonce « aucune valeur en dur ».
- Aucune échelle d'espacement (`--space-*`) dans les tokens : les marges et écarts sont des valeurs px en dur.
- Paires de contraste validées seulement au seuil « grand texte » (3:1) : `cream:orange`. À vérifier à l'œil qu'elles ne servent jamais à du petit texte.
- 3 règles de survol avec `scale()` (motif « tout grossit au survol »).
- Survols non protégés par `@media (hover: hover)` : effets collants possibles au toucher.
- Pas de lien d'évitement (« aller au contenu »).
- 3 lien(s) `href="#"` (ne mènent nulle part).
- 8 bouton(s) sans attribut `type`.
- Aucun état désactivé (`:disabled`, `aria-disabled`) dans la démo.
- Aucun état vide (liste sans résultat, panier vide…) dans la démo.
