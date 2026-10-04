# Audit — zigzag-snack-pop

> Relevé en lecture seule. Sources : `references/tokens.css`, `examples/demo.html`, `SKILL.md`.
> Les états des composants sont détectés automatiquement à partir des sélecteurs CSS et des attributs ARIA de la démo, puis relus ; ils n'ont pas été vérifiés sur capture d'écran.

- Variables dans `tokens.css` : **50**
- Démo : 394 lignes, dont 28 de script ; polices chargées : Anton, Barlow, Barlow Semi Condensed
- Rôles du contrat : 21 remplis, 6 dérivables, 9 absents (sur 36)

## a. Variables classées par rôle du contrat

### Surfaces

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-bg` | rempli | `--white`, `--orange`, `--brown` | trois fonds alternés |
| `--k-surface` | rempli | `--blush` |  |
| `--k-surface-2` | rempli | `--brown` |  |
| `--k-overlay` | dérivable | `--track` |  |

### Texte

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-text` | rempli | `--ink` |  |
| `--k-text-2` | rempli | `--soft` |  |
| `--k-text-muted` | absent | — |  |
| `--k-on-accent` | dérivable | `--ink` | encre sur jaune |

### Accent et états

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-accent` | rempli | `--yellow` |  |
| `--k-accent-2` | rempli | `--orange`, `--orange-hot` |  |
| `--k-success` | dérivable | `--lime` |  |
| `--k-warning` | absent | — |  |
| `--k-danger` | absent | — |  |
| `--k-focus` | dérivable | `--yellow` |  |

### Filets

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-line` | absent | — |  |
| `--k-line-strong` | absent | — |  |

### Typo

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-font-display` | rempli | `--font-display` |  |
| `--k-font-body` | rempli | `--font` |  |
| `--k-font-mono` | absent | — |  |
| `--k-fs-hero` | rempli | `--fs-hero` |  |
| `--k-fs-h1` | dérivable | `--fs-giant` |  |
| `--k-fs-h2` | rempli | `--fs-h2` |  |
| `--k-fs-body` | rempli | `--fs-body` |  |
| `--k-fs-small` | rempli | `--fs-small` |  |

### Formes

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-radius` | rempli | `--r` |  |
| `--k-radius-lg` | rempli | `--r-card` |  |
| `--k-border-w` | absent | — |  |
| `--k-cut` | dérivable | `--zig` | dents de scie (22px), pas un biseau |

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

`--k-text-muted`, `--k-warning`, `--k-danger`, `--k-line`, `--k-line-strong`, `--k-font-mono`, `--k-border-w`, `--k-space-1…12`, `--k-ease-in-out`

### Toutes les variables de `tokens.css`

| Variable | Valeur | Famille | Rôle du contrat |
|---|---|---|---|
| `--outer` | `#351c12` | Couleur | `--k-sig-outer` |
| `--brown` | `#62382e` | Couleur | `--k-bg` |
| `--brown-deep` | `#531f10` | Couleur | `--k-sig-brown-deep` |
| `--ink` | `#3e2617` | Couleur | `--k-text` |
| `--soft` | `#6b5449` | Couleur | `--k-text-2` |
| `--white` | `#ffffff` | Couleur | `--k-bg` |
| `--blush` | `#f6ece9` | Couleur | `--k-surface` |
| `--orange` | `#ee6410` | Couleur | `--k-bg` |
| `--orange-light` | `#fd7c24` | Couleur | `--k-sig-orange-light` |
| `--orange-hot` | `#ff6011` | Couleur | `--k-accent-2` |
| `--orange-ink` | `#c2410c` | Couleur | `--k-sig-orange-ink` |
| `--yellow` | `#ffeb33` | Couleur | `--k-accent` |
| `--lime` | `#b3ce20` | Couleur | `--k-success` (dérivable) |
| `--sky` | `#2f78b7` | Couleur | `--k-sig-sky` |
| `--taupe` | `#84685f` | Couleur | `--k-sig-taupe` |
| `--c1` | `#e8f69b` | Couleur | `--k-sig-c1` |
| `--c2` | `#fff068` | Couleur | `--k-sig-c2` |
| `--c3` | `#f3e4df` | Couleur | `--k-sig-c3` |
| `--c4` | `#dcc1a1` | Couleur | `--k-sig-c4` |
| `--c5` | `#ffe6b5` | Couleur | `--k-sig-c5` |
| `--track` | `rgb(53 28 18 / 0.35)` | Couleur | `--k-overlay` (dérivable) |
| `--lift` | `rgb(53 28 18 / 0.35)` | Couleur | `--k-sig-lift` |
| `--font-display` | `'Anton', 'Impact', 'Arial Narrow', sans-serif` | Typo | `--k-font-display` |
| `--font` | `'Barlow', 'Helvetica Neue', Arial, sans-serif` | Typo | `--k-font-body` |
| `--font-label` | `'Barlow Semi Condensed', 'Barlow', sans-serif` | Typo | hors contrat — typo (candidat `--k-sig-font-label`) |
| `--fs-hero` | `clamp(3rem, 8.5vw, 7.75rem)` | Typo | `--k-fs-hero` |
| `--fs-h2` | `clamp(2.1rem, 4.4vw, 3.9rem)` | Typo | `--k-fs-h2` |
| `--fs-h3` | `clamp(1.5rem, 2.3vw, 2rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-h3`) |
| `--fs-giant` | `clamp(4rem, 15.5vw, 14rem)` | Typo | `--k-fs-h1` (dérivable) |
| `--fs-label` | `1.375rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-label`) |
| `--fs-body` | `1.0625rem` | Typo | `--k-fs-body` |
| `--fs-small` | `0.875rem` | Typo | `--k-fs-small` |
| `--fs-nav` | `0.8125rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-nav`) |
| `--page` | `1440px` | Espace | `--k-container` |
| `--gutter` | `clamp(16px, 4.2vw, 60px)` | Espace | `--k-edge` |
| `--frame` | `clamp(0px, 1.1vw, 16px)` | Dimension de composant | hors contrat — dimension de composant |
| `--nav-h` | `47px` | Dimension de composant | hors contrat — dimension de composant |
| `--btn-h` | `56px` | Dimension de composant | hors contrat — dimension de composant |
| `--hard` | `5px 5px 0 0 var(--brown-deep)` | Formes | `--k-sig-hard` |
| `--hard-up` | `8px 8px 0 0 var(--brown-deep)` | Formes | `--k-sig-hard-up` |
| `--r` | `4px` | Formes | `--k-radius` |
| `--r-card` | `10px` | Formes | `--k-radius-lg` |
| `--zig` | `22px` | Formes | `--k-cut` (dérivable) |
| `--circle` | `148px` | Dimension de composant | hors contrat — dimension de composant |
| `--ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | Mouvement | `--k-ease-out` |
| `--ease-pop` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Mouvement | `--k-sig-ease-pop` |
| `--dur-fast` | `150ms` | Mouvement | `--k-dur-fast` |
| `--dur` | `450ms` | Mouvement | `--k-dur-base` |
| `--dur-slow` | `800ms` | Mouvement | `--k-dur-slow` |
| `--marquee` | `36s` | Mouvement | `--k-sig-marquee` |

## b. Composants de `examples/demo.html`

| Composant | Nom(s) dans la démo | États présents | États manquants |
|---|---|---|---|
| Barre de navigation | `.nav-links`, `.burger`, `.nav` | repos, survol, focus, actif | — |
| Héros | `.hero` | repos | — |
| Bouton principal | `.btn`, `.cart`, `.btn--line`, `.btn--s`, `.btn--orange` | repos, survol, focus, actif | désactivé, chargement |
| Carte | `.cell`, `.flavor`, `.fuel-card`, `.person` | repos, survol, focus | chargement, vide |
| Puce / étiquette | `.stamp`, `.tagpill`, `.chip` | repos | actif |
| Carrousel / pagination | `.strip`, `.track` | repos, survol, focus | actif, désactivé |
| Champ / formulaire | `.news`, `.search` | repos, focus | erreur, désactivé, chargement |
| Citation / avis | `.quote`, `.review` | repos | — |
| Pied de page | `.foot`, `.legal` | repos, survol, focus | — |

Le focus est assuré par une règle globale `:focus-visible` (présente dans les 23 démos) ; il est compté comme présent pour tout composant interactif, mais rarement dessiné composant par composant.

Classes propres au skill (hors composants communs) : `.everyone`, `.zig`, `.ing`, `.path`, `.who`, `.peaks`, `.duo`, `.bento`, `.faces`, `.pack`, `.claim`, `.flavors`, `.brand`, `.sticker-word`, `.stack`, `.fuel`, `.giant`.

Balises : header ×1, nav ×1, main ×1, section ×7, article ×3, form ×1, input ×2, button ×6, a ×17, img ×27, ul ×4, label ×2, svg ×4, h1 ×1, h2 ×5, h3 ×6.

Attributs d'accessibilité : aria-hidden ×16, aria-label ×4, aria-live ×1, aria-expanded ×1, aria-controls ×1.

## c. Schémas UX

- **Structure de page** : Bandes alternées orange / blanc / brun à bords en dents de scie : héros → ingrédients défilants → pour tout le monde → saveurs → parcours → preuves → lettre d'info.
- **Navigation** : Barre haute avec recherche et panier ; menu mobile.
- **Parcours** : Envie → ingrédients → saveurs → preuve → inscription.
- **États** : Défilant en pause au survol et au focus, panier `aria-live`. Formulaire : « Merci ! » sans validation.
- **Formulaire** : succès affiché sans validation ni erreur.
- **Mouvement** : 2 animation(s) nommée(s) (bump, slide) ; mécanismes : IntersectionObserver, rAF, matchMedia, aria-set ; `prefers-reduced-motion` pris en compte (2 mention(s)).
- **Points de rupture** : max-width: 640px, max-width: 980px.

## d. Signature (à ne pas rendre générique)

- Bords de section en dents de scie.
- Titre condensé énorme avec un seul mot jaune.
- Ombre dure brune, bouton jaune d'autocollant, photos dans des cadres penchés.

## e. Défauts repérés (notés, non corrigés)

Relevés à la lecture :

- Aucun `<footer>`.
- Formulaire : succès sans erreur ni chargement ; la recherche ne fait rien.
- 16 images sur 27 avec `alt` vide.
- « ★ » en caractère comme icône.
- Avis de coach inventé.
- Blanc sur `--orange` = 3,25:1 (grand texte seulement).
- Rayons 6, 8, 14px en dur.

Relevés automatiquement :

- Rayons écrits en dur dans la démo : 99px, 14px, 120px 120px 0 0, 6px, 8px.
- Valeurs en px écrites en dur dans le CSS de la démo : 184 (pour 178 usages de `var()`), alors que SKILL.md annonce « aucune valeur en dur ».
- Aucune échelle d'espacement (`--space-*`) dans les tokens : les marges et écarts sont des valeurs px en dur.
- Paires de contraste validées seulement au seuil « grand texte » (3:1) : `white:orange`. À vérifier à l'œil qu'elles ne servent jamais à du petit texte.
- Survols non protégés par `@media (hover: hover)` : effets collants possibles au toucher.
- Pas de lien d'évitement (« aller au contenu »).
- 2 lien(s) `href="#"` (ne mènent nulle part).
- 5 bouton(s) sans attribut `type`.
- Aucun état désactivé (`:disabled`, `aria-disabled`) dans la démo.
- Aucun état vide (liste sans résultat, panier vide…) dans la démo.
