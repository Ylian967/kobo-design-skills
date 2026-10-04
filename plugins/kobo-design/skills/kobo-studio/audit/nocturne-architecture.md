# Audit — nocturne-architecture

> Relevé en lecture seule. Sources : `references/tokens.css`, `examples/demo.html`, `SKILL.md`.
> Les états des composants sont détectés automatiquement à partir des sélecteurs CSS et des attributs ARIA de la démo, puis relus ; ils n'ont pas été vérifiés sur capture d'écran.

- Variables dans `tokens.css` : **50**
- Démo : 442 lignes, dont 57 de script ; polices chargées : Inter, Inter Tight
- Rôles du contrat : 25 remplis, 5 dérivables, 6 absents (sur 36)

## a. Variables classées par rôle du contrat

### Surfaces

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-bg` | rempli | `--bg` |  |
| `--k-surface` | rempli | `--panel` |  |
| `--k-surface-2` | dérivable | `--foot` |  |
| `--k-overlay` | rempli | `--veil` |  |

### Texte

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-text` | rempli | `--text` |  |
| `--k-text-2` | rempli | `--muted` |  |
| `--k-text-muted` | rempli | `--dim` | 3,16:1 : grands textes seulement |
| `--k-on-accent` | rempli | `--on-accent` |  |

### Accent et états

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-accent` | rempli | `--accent` |  |
| `--k-accent-2` | rempli | `--accent-deep` |  |
| `--k-success` | absent | — |  |
| `--k-warning` | absent | — |  |
| `--k-danger` | absent | — |  |
| `--k-focus` | dérivable | `--text` |  |

### Filets

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-line` | rempli | `--line` |  |
| `--k-line-strong` | absent | — |  |

### Typo

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-font-display` | rempli | `--font-display` |  |
| `--k-font-body` | rempli | `--font-body` |  |
| `--k-font-mono` | absent | — |  |
| `--k-fs-hero` | rempli | `--fs-word` | 34.2vw sans borne |
| `--k-fs-h1` | dérivable | `--fs-phrase` |  |
| `--k-fs-h2` | rempli | `--fs-h2` |  |
| `--k-fs-body` | rempli | `--fs-body` |  |
| `--k-fs-small` | rempli | `--fs-small` |  |

### Formes

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-radius` | rempli | `--r-card` |  |
| `--k-radius-lg` | rempli | `--r-panel` |  |
| `--k-border-w` | absent | — |  |
| `--k-cut` | dérivable | — | 0 |

### Espace

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-space-1…12` | dérivable | `--gap` |  |
| `--k-edge` | rempli | `--gutter` |  |
| `--k-container` | rempli | `--page` |  |

### Mouvement

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-ease-out` | rempli | `--ease` |  |
| `--k-ease-in-out` | rempli | `--ease-io` |  |
| `--k-dur-fast` | rempli | `--dur-fast` |  |
| `--k-dur-base` | rempli | `--dur` |  |
| `--k-dur-slow` | rempli | `--dur-slow` |  |

### Rôles sans équivalent dans ce skill

`--k-success`, `--k-warning`, `--k-danger`, `--k-line-strong`, `--k-font-mono`, `--k-border-w`

### Toutes les variables de `tokens.css`

| Variable | Valeur | Famille | Rôle du contrat |
|---|---|---|---|
| `--bg` | `#0e0e0e` | Couleur | `--k-bg` |
| `--panel` | `#171516` | Couleur | `--k-surface` |
| `--foot` | `#121210` | Couleur | `--k-surface-2` (dérivable) |
| `--text` | `#ffffff` | Couleur | `--k-text` |
| `--muted` | `#9a9a9a` | Couleur | `--k-text-2` |
| `--dim` | `#626262` | Couleur | `--k-text-muted` |
| `--ghost` | `#565656` | Couleur | `--k-sig-ghost` |
| `--mark` | `#2a2a2a` | Couleur | `--k-sig-mark` |
| `--line` | `#2b2b2b` | Couleur | `--k-line` |
| `--accent` | `#ef2525` | Couleur | `--k-accent` |
| `--accent-deep` | `#d50000` | Couleur | `--k-accent-2` |
| `--accent-text` | `#ff5a5a` | Couleur | `--k-sig-accent-text` |
| `--on-accent` | `#ffffff` | Couleur | `--k-on-accent` |
| `--paper` | `#ffffff` | Couleur | `--k-sig-paper` |
| `--ink` | `#0e0e0e` | Couleur | `--k-sig-ink` |
| `--night` | `#153a54` | Couleur | `--k-sig-night` |
| `--veil` | `rgb(14 14 14 / 0.55)` | Couleur | `--k-overlay` |
| `--veil-0` | `rgb(14 14 14 / 0)` | Couleur | `--k-sig-veil-0` |
| `--font-display` | `'Inter Tight', 'Helvetica Neue', Arial, sans-serif` | Typo | `--k-font-display` |
| `--font-body` | `'Inter', system-ui, sans-serif` | Typo | `--k-font-body` |
| `--fs-word` | `34.2vw` | Typo | `--k-fs-hero` |
| `--fs-phrase` | `clamp(1.75rem, 3.34vw, 3rem)` | Typo | `--k-fs-h1` (dérivable) |
| `--fs-stat` | `clamp(3.25rem, 6.1vw, 5.5rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-stat`) |
| `--fs-h2` | `clamp(2rem, 3.9vw, 3.5rem)` | Typo | `--k-fs-h2` |
| `--fs-marquee` | `clamp(2.25rem, 4.6vw, 4.1rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-marquee`) |
| `--fs-chip` | `1.5rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-chip`) |
| `--fs-row` | `1.375rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-row`) |
| `--fs-card` | `1.625rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-card`) |
| `--fs-body` | `1rem` | Typo | `--k-fs-body` |
| `--fs-small` | `0.8125rem` | Typo | `--k-fs-small` |
| `--fs-label` | `0.6875rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-label`) |
| `--ls-tight` | `-0.035em` | Typo | hors contrat — typo (candidat `--k-sig-ls-tight`) |
| `--ls-word` | `-0.055em` | Typo | hors contrat — typo (candidat `--k-sig-ls-word`) |
| `--page` | `1440px` | Espace | `--k-container` |
| `--gutter` | `clamp(16px, 2.8vw, 40px)` | Espace | `--k-edge` |
| `--hero-h` | `clamp(600px, 69.4vw, 1000px)` | Dimension de composant | hors contrat — dimension de composant |
| `--card-w` | `clamp(260px, 30.4vw, 438px)` | Dimension de composant | hors contrat — dimension de composant |
| `--card-h` | `clamp(300px, 32vw, 461px)` | Dimension de composant | hors contrat — dimension de composant |
| `--gap` | `23px` | Espace | `--k-space-1…12` (dérivable) |
| `--pill-h` | `48px` | Dimension de composant | hors contrat — dimension de composant |
| `--round` | `60px` | Formes | `--k-sig-round` |
| `--r-card` | `12px` | Formes | `--k-radius` |
| `--r-panel` | `20px` | Formes | `--k-radius-lg` |
| `--r-pill` | `999px` | Formes | `--k-sig-r-pill` |
| `--ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | Mouvement | `--k-ease-out` |
| `--ease-io` | `cubic-bezier(0.65, 0, 0.35, 1)` | Mouvement | `--k-ease-in-out` |
| `--dur-fast` | `200ms` | Mouvement | `--k-dur-fast` |
| `--dur` | `500ms` | Mouvement | `--k-dur-base` |
| `--dur-slow` | `1000ms` | Mouvement | `--k-dur-slow` |
| `--dur-marquee` | `30s` | Mouvement | `--k-sig-dur-marquee` |

## b. Composants de `examples/demo.html`

| Composant | Nom(s) dans la démo | États présents | États manquants |
|---|---|---|---|
| Barre de navigation | `.nav`, `.rail`, `.bar` | repos, survol, focus | actif |
| Héros | `.hero`, `.intro` | repos | — |
| Bouton principal | `.pill` | repos, survol, focus | actif, désactivé, chargement |
| Bouton rond / icône | `.play`, `.round` | repos, survol, focus, actif | désactivé |
| Carte | `.card`, `.post`, `.posts` | repos, survol, focus | chargement, vide |
| Puce / étiquette | `.label`, `.tag` | repos | actif |
| Accordéon / étapes | `.step`, `.how`, `.proc`, `.steps` | repos, survol, focus, actif | — |
| Panneau / modale | `.about` | repos, focus | actif |
| Chiffres clés | `.stat`, `.stats` | repos | — |
| Défilant | `.marquee` | repos | survol |
| Pied de page | `.foot-cols`, `.foot`, `.legal`, `.foot-top` | repos, survol, focus | — |

Le focus est assuré par une règle globale `:focus-visible` (présente dans les 23 démos) ; il est compté comme présent pour tout composant interactif, mais rarement dessiné composant par composant.

Classes propres au skill (hors composants communs) : `.reel`, `.phrase`, `.meta`, `.sign`, `.word`, `.ctrl`.

Balises : header ×1, nav ×1, main ×1, section ×4, article ×7, footer ×1, button ×6, a ×26, img ×13, ul ×7, svg ×5, h1 ×1, h2 ×4, h3 ×11.

Attributs d'accessibilité : aria-hidden ×15, aria-label ×5, aria-expanded ×4.

## c. Schémas UX

- **Structure de page** : Page longue : héros nuit avec mot-marque géant → phrase bicolore + chiffres 2×2 → carrousel de projets → méthode en accordéon → défilant → journal → pied.
- **Navigation** : Barre haute (liens, date \ heure \ température, pilule rouge).
- **Parcours** : Image de marque → preuve chiffrée → projets → méthode → contact (lien, pas de formulaire).
- **États** : Étapes d'accordéon `aria-expanded`, carrousel avec ligne de progression, lecture du showreel. Pas de formulaire.
- **Formulaire** : aucun formulaire.
- **Mouvement** : 1 animation(s) nommée(s) (slide) ; mécanismes : IntersectionObserver, rAF, matchMedia, setInterval, aria-set ; `prefers-reduced-motion` pris en compte (2 mention(s)).
- **Points de rupture** : max-width: 860px.

## d. Signature (à ne pas rendre générique)

- Mot-marque géant en minuscules, coupé par le bas du héros.
- Phrase en deux tons dont les mots s'allument.
- Un seul rouge pour agir ; des filets à la place des boîtes.

## e. Défauts repérés (notés, non corrigés)

Relevés à la lecture :

- Chiffres clés 2×2 sans source.
- Blanc sur `--accent` = 4,23:1 : validé seulement en grand texte, or la pilule « Parlons-en » est un petit texte (à vérifier à l'œil).
- `--dim` sur fond = 3,16:1.
- `--fs-word: 34.2vw` sans borne (pas de `clamp`).
- 5 liens `href="#"`, 6 boutons sans `type`.

Relevés automatiquement :

- Valeurs en px écrites en dur dans le CSS de la démo : 157 (pour 175 usages de `var()`), alors que SKILL.md annonce « aucune valeur en dur ».
- Aucune échelle d'espacement (`--space-*`) dans les tokens : les marges et écarts sont des valeurs px en dur.
- Paires de contraste validées seulement au seuil « grand texte » (3:1) : `dim:bg`, `on-accent:accent`. À vérifier à l'œil qu'elles ne servent jamais à du petit texte.
- Tailles de texte sous 12px : `--fs-label` = 0.6875rem.
- 3 règles de survol avec `scale()` (motif « tout grossit au survol »).
- Survols non protégés par `@media (hover: hover)` : effets collants possibles au toucher.
- Pas de lien d'évitement (« aller au contenu »).
- 5 lien(s) `href="#"` (ne mènent nulle part).
- 6 bouton(s) sans attribut `type`.
- Un seul point de rupture (max-width: 860px) : pas de palier tablette.
- Aucun état désactivé (`:disabled`, `aria-disabled`) dans la démo.
- Aucun état vide (liste sans résultat, panier vide…) dans la démo.
