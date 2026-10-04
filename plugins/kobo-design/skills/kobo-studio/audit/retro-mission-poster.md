# Audit — retro-mission-poster

> Relevé en lecture seule. Sources : `references/tokens.css`, `examples/demo.html`, `SKILL.md`.
> Les états des composants sont détectés automatiquement à partir des sélecteurs CSS et des attributs ARIA de la démo, puis relus ; ils n'ont pas été vérifiés sur capture d'écran.

- Variables dans `tokens.css` : **40**
- Démo : 290 lignes, dont 63 de script ; polices chargées : Big Shoulders Display, Jost
- Rôles du contrat : 20 remplis, 6 dérivables, 10 absents (sur 36)

## a. Variables classées par rôle du contrat

### Surfaces

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-bg` | rempli | `--bg` |  |
| `--k-surface` | dérivable | `--cream`, `--rust-deep` |  |
| `--k-surface-2` | absent | — |  |
| `--k-overlay` | rempli | `--veil-1` |  |

### Texte

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-text` | rempli | `--cream` |  |
| `--k-text-2` | rempli | `--soft` |  |
| `--k-text-muted` | absent | — |  |
| `--k-on-accent` | dérivable | `--ink` | 4,63:1 sur rouge : grand texte |

### Accent et états

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-accent` | rempli | `--red`, `--red-hot` |  |
| `--k-accent-2` | rempli | `--sky`, `--rust` |  |
| `--k-success` | absent | — |  |
| `--k-warning` | absent | — |  |
| `--k-danger` | absent | — |  |
| `--k-focus` | dérivable | `--cream` |  |

### Filets

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-line` | dérivable | `--cream` | ici --line est une ÉPAISSEUR (2px) |
| `--k-line-strong` | absent | — |  |

### Typo

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-font-display` | rempli | `--font-display` |  |
| `--k-font-body` | rempli | `--font-body` |  |
| `--k-font-mono` | absent | — |  |
| `--k-fs-hero` | rempli | `--fs-giant` |  |
| `--k-fs-h1` | rempli | `--fs-title` |  |
| `--k-fs-h2` | dérivable | `--fs-card` |  |
| `--k-fs-body` | rempli | `--fs-body` |  |
| `--k-fs-small` | rempli | `--fs-small` |  |

### Formes

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-radius` | rempli | `--r-card` |  |
| `--k-radius-lg` | absent | — |  |
| `--k-border-w` | rempli | `--line` |  |
| `--k-cut` | dérivable | — | 0 (l'inclinaison --tilt est une signature) |

### Espace

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-space-1…12` | absent | — |  |
| `--k-edge` | rempli | `--edge` |  |
| `--k-container` | absent | — |  |

### Mouvement

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-ease-out` | rempli | `--ease` |  |
| `--k-ease-in-out` | rempli | `--ease-fade` |  |
| `--k-dur-fast` | rempli | `--dur-ui` |  |
| `--k-dur-base` | rempli | `--dur-fade` |  |
| `--k-dur-slow` | rempli | `--dur-move` |  |

### Rôles sans équivalent dans ce skill

`--k-surface-2`, `--k-text-muted`, `--k-success`, `--k-warning`, `--k-danger`, `--k-line-strong`, `--k-font-mono`, `--k-radius-lg`, `--k-space-1…12`, `--k-container`

### Toutes les variables de `tokens.css`

| Variable | Valeur | Famille | Rôle du contrat |
|---|---|---|---|
| `--bg` | `#161616` | Couleur | `--k-bg` |
| `--cream` | `#fdf0e1` | Couleur | `--k-surface` (dérivable) |
| `--soft` | `#d8d8d8` | Couleur | `--k-text-2` |
| `--red` | `#e74833` | Couleur | `--k-accent` |
| `--red-hot` | `#ee2f22` | Couleur | `--k-accent` |
| `--red-text` | `#f0604c` | Couleur | `--k-sig-red-text` |
| `--ink` | `#161616` | Couleur | `--k-on-accent` (dérivable) |
| `--sky` | `#285868` | Couleur | `--k-accent-2` |
| `--sky-pale` | `#98b0b0` | Couleur | `--k-sig-sky-pale` |
| `--rust` | `#885040` | Couleur | `--k-accent-2` |
| `--rust-deep` | `#4a2a22` | Couleur | `--k-surface` (dérivable) |
| `--sand` | `#e8d8c0` | Couleur | `--k-sig-sand` |
| `--veil-0` | `rgb(22 22 22 / 0)` | Couleur | `--k-sig-veil-0` |
| `--veil-1` | `rgb(22 22 22 / 0.5)` | Couleur | `--k-overlay` |
| `--font-display` | `'Big Shoulders Display', 'Oswald', 'Arial Narrow', sans-serif` | Typo | `--k-font-display` |
| `--font-body` | `'Jost', 'Futura', 'Century Gothic', sans-serif` | Typo | `--k-font-body` |
| `--fs-title` | `clamp(4rem, 8.33vw, 7.5rem)` | Typo | `--k-fs-h1` |
| `--lh-title` | `0.84` | Typo | hors contrat — typo (candidat `--k-sig-lh-title`) |
| `--fs-giant` | `clamp(7rem, 26vw, 23rem)` | Typo | `--k-fs-hero` |
| `--fs-card` | `2.5rem` | Typo | `--k-fs-h2` (dérivable) |
| `--fs-head` | `1.25rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-head`) |
| `--fs-body` | `1.125rem` | Typo | `--k-fs-body` |
| `--lh-body` | `1.34` | Typo | hors contrat — typo (candidat `--k-sig-lh-body`) |
| `--fs-small` | `0.875rem` | Typo | `--k-fs-small` |
| `--fs-tiny` | `0.75rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-tiny`) |
| `--ls-chapter` | `0.42em` | Typo | hors contrat — typo (candidat `--k-sig-ls-chapter`) |
| `--tilt` | `-13deg` | Signature | `--k-sig-tilt` |
| `--frame` | `clamp(6px, 0.63vw, 9px)` | Dimension de composant | hors contrat — dimension de composant |
| `--edge` | `clamp(20px, 3.4vw, 50px)` | Espace | `--k-edge` |
| `--r-card` | `12px` | Formes | `--k-radius` |
| `--r-pill` | `35px` | Formes | `--k-sig-r-pill` |
| `--line` | `2px` | Formes | `--k-border-w` |
| `--ring` | `clamp(110px, 10.4vw, 150px)` | Dimension de composant | hors contrat — dimension de composant |
| `--ease` | `cubic-bezier(0.19, 1, 0.22, 1)` | Mouvement | `--k-ease-out` |
| `--ease-fade` | `cubic-bezier(0.455, 0.03, 0.515, 0.955)` | Mouvement | `--k-ease-in-out` |
| `--dur-ui` | `300ms` | Mouvement | `--k-dur-fast` |
| `--dur-fade` | `500ms` | Mouvement | `--k-dur-base` |
| `--dur-move` | `1000ms` | Mouvement | `--k-dur-slow` |
| `--spin` | `50s` | Mouvement | `--k-sig-spin` |
| `--draw` | `4s` | Mouvement | `--k-sig-draw` |

## b. Composants de `examples/demo.html`

| Composant | Nom(s) dans la démo | États présents | États manquants |
|---|---|---|---|
| Chargement de page | `.loader` | repos, chargement | — |
| Menu plein écran | `.menu`, `.menu-open` | repos, survol, focus, actif | — |
| Barre de navigation | `.burger` | repos, survol, focus | actif |
| Bouton principal | `.next`, `.btn` | repos, survol, focus | actif, désactivé, chargement |
| Bouton rond / icône | `.social` | repos, survol, focus | actif, désactivé |
| Carte | `.card`, `.cards` | repos, survol, focus | chargement, vide |
| Champ / formulaire | `.signup`, `.news` | repos, survol, focus | erreur, désactivé, chargement |
| Chiffres clés | `.facts` | repos | — |
| Pied de page | `.legal` | repos, focus | survol |

Le focus est assuré par une règle globale `:focus-visible` (présente dans les 23 démos) ; il est compté comme présent pour tout composant interactif, mais rarement dessiné composant par composant.

Classes propres au skill (hors composants communs) : `.title`, `.chapter`, `.pitch`, `.frame`, `.logo`, `.giant`.

Balises : nav ×1, main ×1, section ×6, article ×2, form ×1, input ×1, button ×2, a ×22, img ×7, ul ×2, label ×1, svg ×13, h1 ×1, h2 ×6, h3 ×7.

Attributs d'accessibilité : aria-hidden ×25, aria-label ×17, aria-expanded ×1, aria-controls ×1.

## c. Schémas UX

- **Structure de page** : Cinq chapitres-affiches plein écran dans un cadre crème + journal ; menu plein écran qui contient le formulaire d'inscription.
- **Navigation** : Bouton menu + anneau dentelé « suivant » ; pas de barre.
- **Parcours** : Chapitre 1 → … → 5 (mission) → journal → inscription.
- **États** : Chargement tracé, menu ouvert (`inert`). Formulaire `return false`.
- **Formulaire** : onsubmit="return false" (aucun retour).
- **Mouvement** : 2 animation(s) nommée(s) (draw, rotate) ; mécanismes : IntersectionObserver, rAF, matchMedia, aria-set, keydown-keys, focus(), inert ; `prefers-reduced-motion` pris en compte (2 mention(s)).
- **Points de rupture** : max-width: 760px.

## d. Signature (à ne pas rendre générique)

- Titre géant incliné de 13° en capitales étroites.
- Cadre crème autour de l'écran.
- Images en aplats granuleux ; anneau dentelé rouge.

## e. Défauts repérés (notés, non corrigés)

Relevés à la lecture :

- Formulaire factice (`return false`).
- Aucun `<header>` ni `<footer>`.
- Un `<h2>` (menu) précède le `<h1>`.
- 1 `transition: all`.
- `--line` est une épaisseur (2px), pas une couleur.
- Dates et promesses chiffrées (« premier plein en 2027 ») sans source.

Relevés automatiquement :

- Valeurs en px écrites en dur dans le CSS de la démo : 63 (pour 154 usages de `var()`), alors que SKILL.md annonce « aucune valeur en dur ».
- Aucune échelle d'espacement (`--space-*`) dans les tokens : les marges et écarts sont des valeurs px en dur.
- Paires de contraste validées seulement au seuil « grand texte » (3:1) : `ink:red`. À vérifier à l'œil qu'elles ne servent jamais à du petit texte.
- `transition: all` : 1 occurrence(s).
- Survols non protégés par `@media (hover: hover)` : effets collants possibles au toucher.
- Pas de lien d'évitement (« aller au contenu »).
- 3 lien(s) `href="#"` (ne mènent nulle part).
- 2 bouton(s) sans attribut `type`.
- Formulaire : onsubmit="return false" (aucun retour).
- Un seul point de rupture (max-width: 760px) : pas de palier tablette.
- Aucun état désactivé (`:disabled`, `aria-disabled`) dans la démo.
- Aucun état vide (liste sans résultat, panier vide…) dans la démo.
