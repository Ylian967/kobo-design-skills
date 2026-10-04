# Audit — sticker-brutal-jp

> Relevé en lecture seule. Sources : `references/tokens.css`, `examples/demo.html`, `SKILL.md`.
> Les états des composants sont détectés automatiquement à partir des sélecteurs CSS et des attributs ARIA de la démo, puis relus ; ils n'ont pas été vérifiés sur capture d'écran.

- Variables dans `tokens.css` : **49**
- Démo : 361 lignes, dont 39 de script ; polices chargées : Mochiy Pop One, Noto Sans JP, Outfit
- Rôles du contrat : 23 remplis, 5 dérivables, 8 absents (sur 36)

## a. Variables classées par rôle du contrat

### Surfaces

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-bg` | rempli | `--peach`, `--page` |  |
| `--k-surface` | rempli | `--card` |  |
| `--k-surface-2` | rempli | `--paper` |  |
| `--k-overlay` | absent | — |  |

### Texte

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-text` | rempli | `--ink` |  |
| `--k-text-2` | rempli | `--body` |  |
| `--k-text-muted` | absent | — |  |
| `--k-on-accent` | dérivable | `--ink` |  |

### Accent et états

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-accent` | rempli | `--yellow` |  |
| `--k-accent-2` | rempli | `--pink`, `--blue`, `--purple` |  |
| `--k-success` | dérivable | `--mint`, `--green` |  |
| `--k-warning` | absent | — |  |
| `--k-danger` | rempli | `--red` |  |
| `--k-focus` | rempli | `--focus` |  |

### Filets

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-line` | dérivable | `--ink` |  |
| `--k-line-strong` | dérivable | `--ink` |  |

### Typo

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-font-display` | rempli | `--font-latin`, `--font-jp-display` |  |
| `--k-font-body` | rempli | `--font` |  |
| `--k-font-mono` | absent | — |  |
| `--k-fs-hero` | absent | — |  |
| `--k-fs-h1` | rempli | `--fs-h1` |  |
| `--k-fs-h2` | rempli | `--fs-h2` |  |
| `--k-fs-body` | rempli | `--fs-body` |  |
| `--k-fs-small` | rempli | `--fs-small` |  |

### Formes

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-radius` | rempli | `--r-btn` |  |
| `--k-radius-lg` | rempli | `--r-card`, `--r-frame` |  |
| `--k-border-w` | rempli | `--bw`, `--bw-sticker`, `--bw-frame` |  |
| `--k-cut` | dérivable | — | 0 |

### Espace

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-space-1…12` | absent | — |  |
| `--k-edge` | rempli | `--gutter` |  |
| `--k-container` | rempli | `--page-w` |  |

### Mouvement

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-ease-out` | absent | — |  |
| `--k-ease-in-out` | rempli | `--ease` |  |
| `--k-dur-fast` | absent | — |  |
| `--k-dur-base` | rempli | `--dur` |  |
| `--k-dur-slow` | rempli | `--dur-pop` |  |

### Rôles sans équivalent dans ce skill

`--k-overlay`, `--k-text-muted`, `--k-warning`, `--k-font-mono`, `--k-fs-hero`, `--k-space-1…12`, `--k-ease-out`, `--k-dur-fast`

### Toutes les variables de `tokens.css`

| Variable | Valeur | Famille | Rôle du contrat |
|---|---|---|---|
| `--peach` | `#fceee3` | Couleur | `--k-bg` |
| `--paper` | `#f9f5f2` | Couleur | `--k-surface-2` |
| `--page` | `#f9f5f2` | Couleur | `--k-bg` |
| `--card` | `#ffffff` | Couleur | `--k-surface` |
| `--ink` | `#282825` | Couleur | `--k-text` |
| `--body` | `#52514e` | Couleur | `--k-text-2` |
| `--yellow` | `#f7cb45` | Couleur | `--k-accent` |
| `--pink` | `#ff91e7` | Couleur | `--k-accent-2` |
| `--blue` | `#91a8ed` | Couleur | `--k-accent-2` |
| `--purple` | `#b196ff` | Couleur | `--k-accent-2` |
| `--green` | `#22a094` | Couleur | `--k-success` (dérivable) |
| `--mint` | `#3aee81` | Couleur | `--k-success` (dérivable) |
| `--red` | `#e8332c` | Couleur | `--k-danger` |
| `--focus` | `#5c5b66` | Couleur | `--k-focus` |
| `--bw` | `1px` | Formes | `--k-border-w` |
| `--bw-frame` | `3px` | Formes | `--k-border-w` |
| `--bw-sticker` | `2.5px` | Formes | `--k-border-w` |
| `--shadow` | `3px 3px 0 0 var(--ink)` | Formes | `--k-sig-shadow` |
| `--shadow-up` | `6px 6px 0 0 var(--ink)` | Formes | `--k-sig-shadow-up` |
| `--lift` | `-4px` | Mouvement | `--k-sig-lift` |
| `--r-card` | `20px` | Formes | `--k-radius-lg` |
| `--r-btn` | `12px` | Formes | `--k-radius` |
| `--r-pill` | `100px` | Formes | `--k-sig-r-pill` |
| `--r-frame` | `40px` | Formes | `--k-radius-lg` |
| `--font-latin` | `'Outfit', 'Unigeo 32', Arial, sans-serif` | Typo | `--k-font-display` |
| `--font-jp-display` | `'Mochiy Pop One', 'Noto Sans JP', sans-serif` | Typo | `--k-font-display` |
| `--font` | `'Noto Sans JP', 'Outfit', sans-serif` | Typo | `--k-font-body` |
| `--fs-h1` | `clamp(3.25rem, 7.2vw, 6.5rem)` | Typo | `--k-fs-h1` |
| `--fs-h1-jp` | `clamp(1.5rem, 2.5vw, 2.25rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-h1-jp`) |
| `--fs-h2` | `clamp(1.75rem, 3.3vw, 3rem)` | Typo | `--k-fs-h2` |
| `--fs-h3` | `clamp(1.5rem, 2.2vw, 2rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-h3`) |
| `--fs-h4` | `1.5rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-h4`) |
| `--fs-lead` | `1.25rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-lead`) |
| `--fs-body` | `1.125rem` | Typo | `--k-fs-body` |
| `--fs-small` | `1rem` | Typo | `--k-fs-small` |
| `--fs-nav` | `1.0625rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-nav`) |
| `--fs-vertical` | `clamp(2.4rem, 4.6vw, 4.1rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-vertical`) |
| `--page-w` | `1248px` | Espace | `--k-container` |
| `--gutter` | `clamp(18px, 6.6vw, 96px)` | Espace | `--k-edge` |
| `--nav-h` | `89px` | Dimension de composant | hors contrat — dimension de composant |
| `--btn-h` | `60px` | Dimension de composant | hors contrat — dimension de composant |
| `--field-h` | `54px` | Dimension de composant | hors contrat — dimension de composant |
| `--card-pad` | `32px 24px` | Dimension de composant | hors contrat — dimension de composant |
| `--icon` | `160px` | Dimension de composant | hors contrat — dimension de composant |
| `--frame-gap` | `clamp(8px, 2.4vw, 34px)` | Dimension de composant | hors contrat — dimension de composant |
| `--ease` | `cubic-bezier(0.645, 0.045, 0.355, 1)` | Mouvement | `--k-ease-in-out` |
| `--dur` | `250ms` | Mouvement | `--k-dur-base` |
| `--ease-pop` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Mouvement | `--k-sig-ease-pop` |
| `--dur-pop` | `600ms` | Mouvement | `--k-dur-slow` |

## b. Composants de `examples/demo.html`

| Composant | Nom(s) dans la démo | États présents | États manquants |
|---|---|---|---|
| Barre de navigation | `.nav-links`, `.nav`, `.burger` | repos, survol, focus, actif | — |
| Héros | `.hero` | repos | — |
| Bouton principal | `.brut`, `.btn` | repos, survol, focus, actif | désactivé, chargement |
| Bouton rond / icône | `.arrow` | repos, survol, focus | actif, désactivé |
| Onglets / sélecteur | `.lang` | repos, survol, focus, actif | désactivé |
| Carte | `.service`, `.tile`, `.work-img`, `.post`, `.posts` | repos, survol, focus | chargement, vide |
| Puce / étiquette | `.sticker`, `.labels`, `.label` | repos, actif | — |
| Champ / formulaire | `.field`, `.contact` | repos, survol, focus | erreur, désactivé, chargement |
| Citation / avis | `.quotes`, `.quote-s`, `.quote-l` | repos | — |
| Pied de page | `.foot` | repos, focus | survol |

Le focus est assuré par une règle globale `:focus-visible` (présente dans les 23 démos) ; il est compté comme présent pour tout composant interactif, mais rarement dessiné composant par composant.

Classes propres au skill (hors composants communs) : `.portrait`, `.logo`, `.who`, `.services`, `.works`, `.work-text`, `.art`, `.b-chart`, `.b-eye`, `.b-ok`, `.vertical`, `.frame`, `.hello`, `.h1-jp`, `.bubble`, `.b-name`, `.cursor`, `.journal`.

Balises : header ×1, nav ×1, main ×1, section ×6, footer ×1, form ×1, input ×3, textarea ×1, button ×3, a ×16, img ×9, label ×4, svg ×17, h1 ×1, h2 ×4, h3 ×8.

Attributs d'accessibilité : aria-hidden ×12, aria-label ×3, aria-expanded ×1, aria-controls ×1.

## c. Schémas UX

- **Structure de page** : Page dans un grand cadre : héros portrait → citations → services → projets → journal → contact → pied.
- **Navigation** : Barre haute + sélecteur de langue FR/JA qui échange les textes.
- **Parcours** : Rencontre → avis → services → projets → formulaire de contact (4 champs).
- **États** : Survol qui décolle, appui qui enfonce (3 règles `:active`), langue active. Formulaire : « Message envoyé » sans validation personnalisée.
- **Formulaire** : succès affiché sans validation ni erreur.
- **Mouvement** : 1 animation(s) nommée(s) (swap) ; mécanismes : IntersectionObserver, rAF, matchMedia, aria-set ; `prefers-reduced-motion` pris en compte (2 mention(s)).
- **Points de rupture** : max-width: 1040px, max-width: 820px.

## d. Signature (à ne pas rendre générique)

- Autocollants à contour sombre et ombre dure qui se décollent au survol.
- Deux écritures : latin très gras + japonais dodu, katakana vertical.
- Portrait noir et blanc en écusson sur rose, dans un cadre de page.

## e. Défauts repérés (notés, non corrigés)

Relevés à la lecture :

- `lang="fr"` alors que la page contient du japonais (pas de `lang="ja"` vérifié sur les passages).
- Formulaire : succès sans état d'erreur ni de chargement.
- 1 `transition: all`.
- Rayons 8, 12, 16, 18px en dur.
- 3 avis clients inventés.
- `:focus` avec `outline: none` sur les champs (remplacé par bordure + ombre).

Relevés automatiquement :

- Rayons écrits en dur dans la démo : 8px, 18px, 16px, 12px.
- Valeurs en px écrites en dur dans le CSS de la démo : 148 (pour 210 usages de `var()`), alors que SKILL.md annonce « aucune valeur en dur ».
- Aucune échelle d'espacement (`--space-*`) dans les tokens : les marges et écarts sont des valeurs px en dur.
- `transition: all` : 1 occurrence(s).
- Pas de lien d'évitement (« aller au contenu »).
- 2 lien(s) `href="#"` (ne mènent nulle part).
- 2 bouton(s) sans attribut `type`.
- Aucun état désactivé (`:disabled`, `aria-disabled`) dans la démo.
- Aucun état vide (liste sans résultat, panier vide…) dans la démo.
