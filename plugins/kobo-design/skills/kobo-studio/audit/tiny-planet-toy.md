# Audit — tiny-planet-toy

> Relevé en lecture seule. Sources : `references/tokens.css`, `examples/demo.html`, `SKILL.md`.
> Les états des composants sont détectés automatiquement à partir des sélecteurs CSS et des attributs ARIA de la démo, puis relus ; ils n'ont pas été vérifiés sur capture d'écran.

- Variables dans `tokens.css` : **46**
- Démo : 362 lignes, dont 143 de script ; polices chargées : Patrick Hand, Rubik Mono One, Silkscreen
- Rôles du contrat : 21 remplis, 9 dérivables, 6 absents (sur 36)

## a. Variables classées par rôle du contrat

### Surfaces

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-bg` | rempli | `--sky` |  |
| `--k-surface` | rempli | `--card`, `--paper` |  |
| `--k-surface-2` | rempli | `--cream` |  |
| `--k-overlay` | absent | — |  |

### Texte

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-text` | rempli | `--ink` |  |
| `--k-text-2` | rempli | `--soft` |  |
| `--k-text-muted` | absent | — |  |
| `--k-on-accent` | dérivable | `--ink` |  |

### Accent et états

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-accent` | rempli | `--yellow` |  |
| `--k-accent-2` | rempli | `--blue` |  |
| `--k-success` | dérivable | `--green` |  |
| `--k-warning` | dérivable | `--orange` |  |
| `--k-danger` | dérivable | `--red` |  |
| `--k-focus` | dérivable | `--ink` |  |

### Filets

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-line` | dérivable | `--ink` |  |
| `--k-line-strong` | dérivable | `--ink` |  |

### Typo

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-font-display` | rempli | `--font-block` |  |
| `--k-font-body` | rempli | `--font-hand` |  |
| `--k-font-mono` | dérivable | `--font-pixel` | police pixel, tient le rôle d'étiquette |
| `--k-fs-hero` | rempli | `--fs-block` |  |
| `--k-fs-h1` | absent | — |  |
| `--k-fs-h2` | rempli | `--fs-h2` |  |
| `--k-fs-body` | rempli | `--fs-body` |  |
| `--k-fs-small` | rempli | `--fs-small` |  |

### Formes

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-radius` | rempli | `--r` |  |
| `--k-radius-lg` | absent | — |  |
| `--k-border-w` | rempli | `--bw` |  |
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
| `--k-dur-slow` | rempli | `--dur-wipe` |  |

### Rôles sans équivalent dans ce skill

`--k-overlay`, `--k-text-muted`, `--k-fs-h1`, `--k-radius-lg`, `--k-space-1…12`, `--k-ease-in-out`

### Toutes les variables de `tokens.css`

| Variable | Valeur | Famille | Rôle du contrat |
|---|---|---|---|
| `--sky` | `#65c1bc` | Couleur | `--k-bg` |
| `--sky-light` | `#9ee5d5` | Couleur | `--k-sig-sky-light` |
| `--sky-deep` | `#2a8490` | Couleur | `--k-sig-sky-deep` |
| `--cream` | `#eef2e4` | Couleur | `--k-surface-2` |
| `--cream-side` | `#b8b7a2` | Couleur | `--k-sig-cream-side` |
| `--paper` | `#fdfdfd` | Couleur | `--k-surface` |
| `--card` | `#f4f6ec` | Couleur | `--k-surface` |
| `--ink` | `#333d3f` | Couleur | `--k-text` |
| `--soft` | `#55615f` | Couleur | `--k-text-2` |
| `--yellow` | `#f2cf59` | Couleur | `--k-accent` |
| `--yellow-side` | `#c9a23a` | Couleur | `--k-sig-yellow-side` |
| `--blue` | `#66bee6` | Couleur | `--k-accent-2` |
| `--red` | `#b75758` | Couleur | `--k-danger` (dérivable) |
| `--orange` | `#e0803c` | Couleur | `--k-warning` (dérivable) |
| `--green` | `#306840` | Couleur | `--k-success` (dérivable) |
| `--green-light` | `#61a78d` | Couleur | `--k-sig-green-light` |
| `--wall` | `#98a898` | Couleur | `--k-sig-wall` |
| `--wall-warm` | `#a8a098` | Couleur | `--k-sig-wall-warm` |
| `--road` | `#6f9190` | Couleur | `--k-sig-road` |
| `--shadow` | `rgb(51 61 63 / 0.28)` | Couleur | `--k-sig-shadow` |
| `--font-block` | `'Rubik Mono One', 'Arial Black', sans-serif` | Typo | `--k-font-display` |
| `--font-pixel` | `'Silkscreen', 'Courier New', monospace` | Typo | `--k-font-mono` (dérivable) |
| `--font-hand` | `'Patrick Hand', 'Comic Sans MS', cursive` | Typo | `--k-font-body` |
| `--fs-block` | `clamp(1.6rem, 4.4vw, 3.9rem)` | Typo | `--k-fs-hero` |
| `--fs-h2` | `clamp(1.5rem, 3vw, 2.6rem)` | Typo | `--k-fs-h2` |
| `--fs-dialog` | `clamp(1.25rem, 1.9vw, 1.6rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-dialog`) |
| `--fs-body` | `1.25rem` | Typo | `--k-fs-body` |
| `--fs-tag` | `1.0625rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-tag`) |
| `--fs-small` | `0.875rem` | Typo | `--k-fs-small` |
| `--bw` | `3px` | Formes | `--k-border-w` |
| `--drop` | `5px 5px 0 0 var(--ink)` | Formes | `--k-sig-drop` |
| `--r` | `4px` | Formes | `--k-radius` |
| `--depth` | `8px` | Formes | `--k-sig-depth` |
| `--tilt` | `-4deg` | Signature | `--k-sig-tilt` |
| `--wipe` | `-7deg` | Signature | `--k-sig-wipe` |
| `--page` | `1200px` | Espace | `--k-container` |
| `--gutter` | `clamp(16px, 5vw, 64px)` | Espace | `--k-edge` |
| `--planet` | `clamp(280px, 46vw, 620px)` | Dimension de composant | hors contrat — dimension de composant |
| `--dialog-w` | `720px` | Dimension de composant | hors contrat — dimension de composant |
| `--dialog-h` | `122px` | Dimension de composant | hors contrat — dimension de composant |
| `--ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | Mouvement | `--k-ease-out` |
| `--ease-drop` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Mouvement | `--k-sig-ease-drop` |
| `--dur-fast` | `160ms` | Mouvement | `--k-dur-fast` |
| `--dur` | `450ms` | Mouvement | `--k-dur-base` |
| `--dur-wipe` | `900ms` | Mouvement | `--k-dur-slow` |
| `--type-speed` | `28ms` | Mouvement | `--k-sig-type-speed` |

## b. Composants de `examples/demo.html`

| Composant | Nom(s) dans la démo | États présents | États manquants |
|---|---|---|---|
| Chargement de page | `.loader` | repos, chargement | — |
| Héros | `.hero` | repos | — |
| Bouton principal | `.cta` | repos, survol, focus, actif | désactivé, chargement |
| Onglets / sélecteur | `.tab`, `.tabs` | repos, survol, focus, actif | désactivé |
| Carte | `.world` | repos, focus | survol, chargement, vide |
| Accordéon / étapes | `.step`, `.how`, `.steps` | repos, survol, focus | actif |
| Champ / formulaire | `.hint` | repos, focus | erreur, désactivé, chargement |
| Panneau / modale | `.dialog` | repos, survol, focus, actif | — |
| Pied de page | `.foot` | repos, focus | survol |

Le focus est assuré par une règle globale `:focus-visible` (présente dans les 23 démos) ; il est compté comme présent pour tout composant interactif, mais rarement dessiné composant par composant.

Classes propres au skill (hors composants communs) : `.planet`, `.districts`, `.dust`, `.planet-in`, `.logo`, `.key`, `.pixel`, `.fallback`, `.begin`, `.caret`, `.keys`.

Balises : main ×1, section ×4, article ×3, footer ×1, button ×4, a ×2, canvas ×1, svg ×2, h1 ×1, h2 ×3, h3 ×3.

Attributs d'accessibilité : aria-hidden ×8, aria-label ×3, aria-pressed ×3, role ×2, aria-labelledby ×1, aria-live ×1.

## c. Schémas UX

- **Structure de page** : Page courte : héros avec planète 3D → 3 quartiers (onglets) → comment jouer (3 étapes) → appel final → pied.
- **Navigation** : Aucune barre ; onglets de quartier ; gros bouton jaune.
- **Parcours** : Jouer avec la planète → lire les répliques → comprendre les règles → lancer.
- **États** : Chargement, planète prête, onglet `aria-pressed`, texte qui s'écrit, bloc enfoncé (4 règles `:active`), repli sans 3D.
- **Formulaire** : aucun formulaire.
- **Mouvement** : 2 animation(s) nommée(s) (blink, tap) ; mécanismes : IntersectionObserver, rAF, three, matchMedia, setInterval, aria-set, pointer ; `prefers-reduced-motion` pris en compte (3 mention(s)).
- **Points de rupture** : max-width: 900px.

## d. Signature (à ne pas rendre générique)

- Petite planète 3D au rendu dessin animé, cernée d'encre.
- Tout ce qui se clique est un bloc épais qui s'enfonce.
- Trois écritures : blocs, pixels, main levée ; boîte de dialogue.

## e. Défauts repérés (notés, non corrigés)

Relevés à la lecture :

- Aucun `<header>` ni `<nav>`.
- 4 boutons sans `type`.
- Aucune photo (attendu : la 3D en tient lieu).
- `--ink` sur `--sky` = 5,27:1 : marge faible pour du texte fin en police manuscrite.

Relevés automatiquement :

- Valeurs en px écrites en dur dans le CSS de la démo : 76 (pour 173 usages de `var()`), alors que SKILL.md annonce « aucune valeur en dur ».
- Aucune échelle d'espacement (`--space-*`) dans les tokens : les marges et écarts sont des valeurs px en dur.
- Paires de contraste validées seulement au seuil « grand texte » (3:1) : `cream:sky-deep`. À vérifier à l'œil qu'elles ne servent jamais à du petit texte.
- Survols non protégés par `@media (hover: hover)` : effets collants possibles au toucher.
- Pas de lien d'évitement (« aller au contenu »).
- 4 bouton(s) sans attribut `type`.
- Un seul point de rupture (max-width: 900px) : pas de palier tablette.
- Aucun état désactivé (`:disabled`, `aria-disabled`) dans la démo.
- Aucun état vide (liste sans résultat, panier vide…) dans la démo.
