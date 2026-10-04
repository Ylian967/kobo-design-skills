# Audit — pixel-lime-portfolio

> Relevé en lecture seule. Sources : `references/tokens.css`, `examples/demo.html`, `SKILL.md`.
> Les états des composants sont détectés automatiquement à partir des sélecteurs CSS et des attributs ARIA de la démo, puis relus ; ils n'ont pas été vérifiés sur capture d'écran.

- Variables dans `tokens.css` : **45**
- Démo : 377 lignes, dont 47 de script ; polices chargées : Inter Tight, JetBrains Mono
- Rôles du contrat : 23 remplis, 6 dérivables, 7 absents (sur 36)

## a. Variables classées par rôle du contrat

### Surfaces

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-bg` | rempli | `--paper` |  |
| `--k-surface` | rempli | `--white` |  |
| `--k-surface-2` | rempli | `--field` |  |
| `--k-overlay` | rempli | `--veil` |  |

### Texte

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-text` | rempli | `--ink` |  |
| `--k-text-2` | absent | — |  |
| `--k-text-muted` | rempli | `--muted` |  |
| `--k-on-accent` | dérivable | `--ink` |  |

### Accent et états

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-accent` | rempli | `--lime` |  |
| `--k-accent-2` | rempli | `--lime-deep` |  |
| `--k-success` | absent | — |  |
| `--k-warning` | absent | — |  |
| `--k-danger` | absent | — |  |
| `--k-focus` | dérivable | `--ink`, `--lime` |  |

### Filets

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-line` | rempli | `--grid` |  |
| `--k-line-strong` | dérivable | `--ink` |  |

### Typo

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-font-display` | dérivable | `--font-sans` | une seule famille sans |
| `--k-font-body` | rempli | `--font-sans` |  |
| `--k-font-mono` | rempli | `--font-mono` |  |
| `--k-fs-hero` | rempli | `--fs-name` |  |
| `--k-fs-h1` | rempli | `--fs-statement` |  |
| `--k-fs-h2` | rempli | `--fs-h2` |  |
| `--k-fs-body` | rempli | `--fs-body` |  |
| `--k-fs-small` | rempli | `--fs-small` |  |

### Formes

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-radius` | rempli | `--r` | vaut 0 |
| `--k-radius-lg` | dérivable | `--r` | 0 |
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

`--k-text-2`, `--k-success`, `--k-warning`, `--k-danger`, `--k-border-w`, `--k-space-1…12`, `--k-ease-in-out`

### Toutes les variables de `tokens.css`

| Variable | Valeur | Famille | Rôle du contrat |
|---|---|---|---|
| `--ink` | `#000000` | Couleur | `--k-text` |
| `--paper` | `#f2f2f2` | Couleur | `--k-bg` |
| `--white` | `#f8f8f8` | Couleur | `--k-surface` |
| `--lime` | `#c9f852` | Couleur | `--k-accent` |
| `--lime-deep` | `#8cbc18` | Couleur | `--k-accent-2` |
| `--lime-bar` | `#84e000` | Couleur | `--k-sig-lime-bar` |
| `--lime-bar-deep` | `#709414` | Couleur | `--k-sig-lime-bar-deep` |
| `--grey-bar` | `#c4c4c4` | Couleur | `--k-sig-grey-bar` |
| `--field` | `#ececec` | Couleur | `--k-surface-2` |
| `--muted` | `#6a6a6a` | Couleur | `--k-text-muted` |
| `--soft` | `#a8a8a8` | Couleur | `--k-sig-soft` |
| `--grid` | `rgb(0 0 0 / 0.05)` | Couleur | `--k-line` |
| `--grid-dark` | `#1c1c10` | Couleur | `--k-sig-grid-dark` |
| `--veil` | `rgb(0 0 0 / 0.45)` | Couleur | `--k-overlay` |
| `--veil-0` | `rgb(0 0 0 / 0)` | Couleur | `--k-sig-veil-0` |
| `--font-sans` | `'Inter Tight', 'Helvetica Neue', Arial, sans-serif` | Typo | `--k-font-display` (dérivable) |
| `--font-mono` | `'JetBrains Mono', ui-monospace, monospace` | Typo | `--k-font-mono` |
| `--fs-name` | `clamp(2.5rem, 4.05vw, 3.65rem)` | Typo | `--k-fs-hero` |
| `--fs-statement` | `clamp(1.75rem, 3.6vw, 3.25rem)` | Typo | `--k-fs-h1` |
| `--lh-statement` | `1.22` | Typo | hors contrat — typo (candidat `--k-sig-lh-statement`) |
| `--fs-h2` | `clamp(1.75rem, 3.2vw, 2.9rem)` | Typo | `--k-fs-h2` |
| `--fs-project` | `clamp(1.75rem, 2.9vw, 2.6rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-project`) |
| `--giant` | `0.244` | Typo | hors contrat — typo (candidat `--k-sig-giant`) |
| `--fs-body` | `0.9375rem` | Typo | `--k-fs-body` |
| `--fs-small` | `0.8125rem` | Typo | `--k-fs-small` |
| `--fs-mono` | `0.75rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-mono`) |
| `--fs-note` | `0.6875rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-note`) |
| `--ls-tight` | `-0.03em` | Typo | hors contrat — typo (candidat `--k-sig-ls-tight`) |
| `--page` | `1440px` | Espace | `--k-container` |
| `--cell` | `calc(min(100vw, var(--page)) / 17)` | Dimension de composant | hors contrat — dimension de composant |
| `--pixel` | `calc(var(--cell) * 0.4)` | Dimension de composant | hors contrat — dimension de composant |
| `--gutter` | `clamp(16px, 1.2vw, 18px)` | Espace | `--k-edge` |
| `--hero-h` | `clamp(560px, 64.7vw, 932px)` | Dimension de composant | hors contrat — dimension de composant |
| `--col` | `clamp(0px, 20.1vw, 290px)` | Dimension de composant | hors contrat — dimension de composant |
| `--btn-h` | `26px` | Dimension de composant | hors contrat — dimension de composant |
| `--note-w` | `304px` | Dimension de composant | hors contrat — dimension de composant |
| `--note-h` | `353px` | Dimension de composant | hors contrat — dimension de composant |
| `--row-h` | `49px` | Dimension de composant | hors contrat — dimension de composant |
| `--r` | `0px` | Formes | `--k-radius` |
| `--ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | Mouvement | `--k-ease-out` |
| `--ease-step` | `steps(4, end)` | Mouvement | `--k-sig-ease-step` |
| `--dur-fast` | `150ms` | Mouvement | `--k-dur-fast` |
| `--dur` | `450ms` | Mouvement | `--k-dur-base` |
| `--dur-slow` | `900ms` | Mouvement | `--k-dur-slow` |
| `--dur-draw` | `1100ms` | Mouvement | `--k-sig-dur-draw` |

## b. Composants de `examples/demo.html`

| Composant | Nom(s) dans la démo | États présents | États manquants |
|---|---|---|---|
| Barre de navigation | `.nav` | repos, survol, focus | actif |
| Héros | `.hero` | repos | — |
| Bouton principal | `.btn` | repos, survol, focus | actif, désactivé, chargement |
| Carte | `.cell`, `.note` | repos, survol, focus | chargement, vide |
| Puce / étiquette | `.sticker`, `.tag` | repos | actif |
| Champ / formulaire | `.form`, `.contact` | repos, focus | erreur, désactivé, chargement |
| Pied de page | `.foot-top`, `.legal`, `.foot` | repos, focus | survol |

Le focus est assuré par une règle globale `:focus-visible` (présente dans les 23 démos) ; il est compté comme présent pour tout composant interactif, mais rarement dessiné composant par composant.

Classes propres au skill (hors composants communs) : `.rows`, `.awards`, `.ring`, `.name`, `.paper`, `.cols`, `.giant`, `.mark`, `.statement`, `.inset`, `.mosaic`, `.pitch`, `.notes`, `.works`, `.gridded`, `.under`.

Balises : header ×1, nav ×1, main ×1, section ×4, article ×3, footer ×1, form ×1, input ×4, textarea ×1, button ×1, a ×27, img ×5, canvas ×2, ul ×7, label ×5, svg ×12, h1 ×1, h2 ×5, h3 ×12.

Attributs d'accessibilité : aria-hidden ×14, aria-label ×2.

## c. Schémas UX

- **Structure de page** : Page longue : héros photo + mosaïque → énoncé annoté → services (fiches) → travaux (grille + distinctions) → contact lime → pied noir.
- **Navigation** : Navigation mono soulignée étalée sur toute la largeur.
- **Parcours** : Présentation → services → projets → preuves (prix) → formulaire de contact.
- **États** : Survol inversé des lignes, entrée au défilement. Formulaire `return false` avec 3 champs `required`.
- **Formulaire** : onsubmit="return false" (aucun retour).
- **Mouvement** : 0 animation(s) nommée(s) (—) ; mécanismes : IntersectionObserver, rAF, matchMedia, setInterval ; `prefers-reduced-motion` pris en compte (2 mention(s)).
- **Points de rupture** : max-width: 860px.

## d. Signature (à ne pas rendre générique)

- Mosaïque de pixels lime sur photo noir et blanc.
- Ovale au feutre et surlignage dans un énoncé géant.
- Fiches de carnet perforées en mono ; aucun arrondi.

## e. Défauts repérés (notés, non corrigés)

Relevés à la lecture :

- Formulaire de contact factice (`return false`).
- Aucun écouteur d'événement dans le script : aucune interaction réelle hors survol.
- Distinctions et prix inventés.
- 6 liens `href="#"`.
- `--fs-note` à 11px.

Relevés automatiquement :

- Rayons écrits en dur dans la démo : 999px.
- Valeurs en px écrites en dur dans le CSS de la démo : 147 (pour 191 usages de `var()`), alors que SKILL.md annonce « aucune valeur en dur ».
- Aucune échelle d'espacement (`--space-*`) dans les tokens : les marges et écarts sont des valeurs px en dur.
- Tailles de texte sous 12px : `--fs-note` = 0.6875rem.
- Survols non protégés par `@media (hover: hover)` : effets collants possibles au toucher.
- Pas de lien d'évitement (« aller au contenu »).
- 6 lien(s) `href="#"` (ne mènent nulle part).
- 1 bouton(s) sans attribut `type`.
- Formulaire : onsubmit="return false" (aucun retour).
- Un seul point de rupture (max-width: 860px) : pas de palier tablette.
- Aucun état désactivé (`:disabled`, `aria-disabled`) dans la démo.
- Aucun état vide (liste sans résultat, panier vide…) dans la démo.
