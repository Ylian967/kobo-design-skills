# Audit — mint-street-basics

> Relevé en lecture seule. Sources : `references/tokens.css`, `examples/demo.html`, `SKILL.md`.
> Les états des composants sont détectés automatiquement à partir des sélecteurs CSS et des attributs ARIA de la démo, puis relus ; ils n'ont pas été vérifiés sur capture d'écran.

- Variables dans `tokens.css` : **60**
- Démo : 406 lignes, dont 53 de script ; polices chargées : Anton, DM Sans, DM Serif Display
- Rôles du contrat : 24 remplis, 7 dérivables, 5 absents (sur 36)

## a. Variables classées par rôle du contrat

### Surfaces

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-bg` | rempli | `--mint` |  |
| `--k-surface` | rempli | `--card` |  |
| `--k-surface-2` | rempli | `--card-soft` |  |
| `--k-overlay` | absent | — |  |

### Texte

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-text` | rempli | `--ink` |  |
| `--k-text-2` | rempli | `--ink-2` |  |
| `--k-text-muted` | rempli | `--muted` |  |
| `--k-on-accent` | dérivable | `--navy` | bleu nuit sur vert |

### Accent et états

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-accent` | rempli | `--green` |  |
| `--k-accent-2` | rempli | `--aqua` |  |
| `--k-success` | dérivable | `--green` |  |
| `--k-warning` | dérivable | `--star` |  |
| `--k-danger` | absent | — |  |
| `--k-focus` | dérivable | `--ink` |  |

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
| `--k-fs-hero` | rempli | `--fs-hero` |  |
| `--k-fs-h1` | dérivable | `--fs-pdp` |  |
| `--k-fs-h2` | rempli | `--fs-h2` |  |
| `--k-fs-body` | rempli | `--fs-body` |  |
| `--k-fs-small` | rempli | `--fs-small` |  |

### Formes

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-radius` | rempli | `--r-chip` |  |
| `--k-radius-lg` | rempli | `--r-card` |  |
| `--k-border-w` | absent | — |  |
| `--k-cut` | dérivable | — | 0 |

### Espace

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-space-1…12` | dérivable | `--gap` | un seul écart nommé |
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

`--k-overlay`, `--k-danger`, `--k-line-strong`, `--k-font-mono`, `--k-border-w`

### Toutes les variables de `tokens.css`

| Variable | Valeur | Famille | Rôle du contrat |
|---|---|---|---|
| `--navy` | `#1c1d36` | Couleur | `--k-on-accent` (dérivable) |
| `--navy-2` | `#040521` | Couleur | `--k-sig-navy-2` |
| `--mint` | `#e5f2e5` | Couleur | `--k-bg` |
| `--card` | `#ffffff` | Couleur | `--k-surface` |
| `--card-soft` | `#f0f0f0` | Couleur | `--k-surface-2` |
| `--aqua` | `#a1dddf` | Couleur | `--k-accent-2` |
| `--aqua-2` | `#80d0d0` | Couleur | `--k-sig-aqua-2` |
| `--green` | `#08a863` | Couleur | `--k-accent` |
| `--green-2` | `#29c279` | Couleur | `--k-sig-green-2` |
| `--green-3` | `#269357` | Couleur | `--k-sig-green-3` |
| `--green-ink` | `#0b6b41` | Couleur | `--k-sig-green-ink` |
| `--ink` | `#1b1b35` | Couleur | `--k-text` |
| `--ink-2` | `#4d5161` | Couleur | `--k-text-2` |
| `--muted` | `#555a6a` | Couleur | `--k-text-muted` |
| `--white` | `#ffffff` | Couleur | `--k-sig-white` |
| `--silver` | `#d3d3d3` | Couleur | `--k-sig-silver` |
| `--soft` | `#b9bbd0` | Couleur | `--k-sig-soft` |
| `--line` | `#c9dfcb` | Couleur | `--k-line` |
| `--star` | `#f2b200` | Couleur | `--k-warning` (dérivable) |
| `--halo` | `rgb(161 221 223 / 0.55)` | Couleur | `--k-sig-halo` |
| `--c-cream` | `#ecdcc0` | Couleur | `--k-sig-c-cream` |
| `--c-slate` | `#4a4f63` | Couleur | `--k-sig-c-slate` |
| `--c-sage` | `#a9d3a6` | Couleur | `--k-sig-c-sage` |
| `--c-lilac` | `#d9c2e6` | Couleur | `--k-sig-c-lilac` |
| `--c-sky` | `#a9c4e0` | Couleur | `--k-sig-c-sky` |
| `--c-white` | `#f4f2ec` | Couleur | `--k-sig-c-white` |
| `--font-display` | `'Anton', 'Impact', 'Arial Narrow', sans-serif` | Typo | `--k-font-display` |
| `--font-logo` | `'DM Serif Display', Georgia, serif` | Typo | hors contrat — typo (candidat `--k-sig-font-logo`) |
| `--font-body` | `'DM Sans', system-ui, sans-serif` | Typo | `--k-font-body` |
| `--fs-hero` | `clamp(3.75rem, 12.1vw, 10.9rem)` | Typo | `--k-fs-hero` |
| `--lh-hero` | `1` | Typo | hors contrat — typo (candidat `--k-sig-lh-hero`) |
| `--fs-h2` | `clamp(2.75rem, 7vw, 6.3rem)` | Typo | `--k-fs-h2` |
| `--lh-h2` | `0.98` | Typo | hors contrat — typo (candidat `--k-sig-lh-h2`) |
| `--fs-h2-center` | `clamp(2.5rem, 6.3vw, 5.7rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-h2-center`) |
| `--fs-pdp` | `clamp(2.25rem, 5.75vw, 5.2rem)` | Typo | `--k-fs-h1` (dérivable) |
| `--fs-stat` | `clamp(3rem, 5.5vw, 5rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-stat`) |
| `--fs-inset` | `2.125rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-inset`) |
| `--fs-name` | `clamp(1.375rem, 2.2vw, 2rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-name`) |
| `--fs-body` | `1rem` | Typo | `--k-fs-body` |
| `--fs-small` | `0.875rem` | Typo | `--k-fs-small` |
| `--fs-nav` | `0.8125rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-nav`) |
| `--fs-ticker` | `1.25rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-ticker`) |
| `--page` | `1440px` | Espace | `--k-container` |
| `--gutter` | `clamp(20px, 5.55vw, 80px)` | Espace | `--k-edge` |
| `--gap` | `24px` | Espace | `--k-space-1…12` (dérivable) |
| `--hero-h` | `clamp(640px, 76.8vw, 1106px)` | Dimension de composant | hors contrat — dimension de composant |
| `--ticker-h` | `82px` | Dimension de composant | hors contrat — dimension de composant |
| `--card-h` | `clamp(300px, 32vw, 461px)` | Dimension de composant | hors contrat — dimension de composant |
| `--r-card` | `28px` | Formes | `--k-radius-lg` |
| `--r-inset` | `22px` | Formes | `--k-sig-r-inset` |
| `--r-chip` | `14px` | Formes | `--k-radius` |
| `--r-pill` | `999px` | Formes | `--k-sig-r-pill` |
| `--btn-h` | `62px` | Dimension de composant | hors contrat — dimension de composant |
| `--round` | `64px` | Formes | `--k-sig-round` |
| `--ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | Mouvement | `--k-ease-out` |
| `--ease-io` | `cubic-bezier(0.65, 0, 0.35, 1)` | Mouvement | `--k-ease-in-out` |
| `--dur-fast` | `200ms` | Mouvement | `--k-dur-fast` |
| `--dur` | `450ms` | Mouvement | `--k-dur-base` |
| `--dur-slow` | `900ms` | Mouvement | `--k-dur-slow` |
| `--dur-ticker` | `26s` | Mouvement | `--k-sig-dur-ticker` |

## b. Composants de `examples/demo.html`

| Composant | Nom(s) dans la démo | États présents | États manquants |
|---|---|---|---|
| Barre de navigation | `.nav` | repos, survol, focus | actif |
| Héros | `.hero`, `.stage` | repos | — |
| Bouton principal | `.more`, `.cart`, `.pill`, `.buy` | repos, survol, focus, actif | désactivé, chargement |
| Bouton rond / icône | `.round`, `.fav`, `.arrows` | repos, survol, focus, actif, désactivé | — |
| Onglets / sélecteur | `.swatches`, `.sizes` | repos, survol, focus, actif | désactivé |
| Carte | `.prod` | repos, survol, focus | chargement, vide |
| Carrousel / pagination | `.deck`, `.dots` | repos, focus | survol, actif, désactivé |
| Champ / formulaire | `.news` | repos, focus | erreur, désactivé, chargement |
| Chiffres clés | `.stats`, `.rating` | repos | — |
| Défilant | `.ticker` | repos, survol | — |
| Pied de page | `.foot-top`, `.foot`, `.foot-card`, `.legal` | repos, survol, focus | — |

Le focus est assuré par une règle globale `:focus-visible` (présente dans les 23 démos) ; il est compté comme présent pour tout composant interactif, mais rarement dessiné composant par composant.

Classes propres au skill (hors composants communs) : `.essentials`, `.pdp`, `.green-disc`, `.disc`, `.inset`, `.coll`, `.price`, `.lede`, `.arch`, `.grid`, `.big-disc`, `.stripes`, `.logo`, `.swatch-name`, `.wordmark`.

Balises : header ×1, nav ×1, main ×1, section ×3, article ×5, footer ×1, form ×1, input ×1, button ×17, a ×23, img ×11, ul ×3, label ×1, svg ×9, h1 ×1, h2 ×4, h3 ×10.

Attributs d'accessibilité : aria-label ×21, aria-hidden ×17, aria-pressed ×9, role ×3, aria-live ×2.

## c. Schémas UX

- **Structure de page** : Page longue : héros bleu nuit → bandeau défilant → collections → grille produits → fiche produit intégrée → pied bleu nuit avec lettre d'info.
- **Navigation** : Barre dans le héros (logo serif, liens, panier).
- **Parcours** : Vitrine → collections → produits → fiche (taille, couleur, ajout au panier, favori) → lettre d'info.
- **États** : Pastilles et tailles `aria-pressed`, panier incrémenté (`aria-live`), favori actif, bouton rond désactivé. Formulaire `return false`.
- **Formulaire** : onsubmit="return false" (aucun retour).
- **Mouvement** : 1 animation(s) nommée(s) (ticker) ; mécanismes : IntersectionObserver, rAF, matchMedia, aria-set ; `prefers-reduced-motion` pris en compte (2 mention(s)).
- **Points de rupture** : max-width: 900px.

## d. Signature (à ne pas rendre générique)

- Titre géant condensé en dégradé sur bleu nuit.
- Grand disque vert et photo en arche.
- Pilule blanche à anneau clair ; pastilles de couleur au-dessus des noms.

## e. Défauts repérés (notés, non corrigés)

Relevés à la lecture :

- Formulaire de lettre d'info factice (`return false`).
- 7 liens `href="#"`, 17 boutons sans `type`.
- « 120+ » et note en étoiles sans source.
- Étoiles « ★★★★★ » en caractères (masquées aux lecteurs d'écran, sans équivalent chiffré visible vérifié).
- Rayons 6, 12, 18px en dur.
- Pas d'état d'erreur pour une taille non choisie.

Relevés automatiquement :

- Rayons écrits en dur dans la démo : 999px 999px 0 0, 6px, 12px, 18px.
- Valeurs en px écrites en dur dans le CSS de la démo : 149 (pour 184 usages de `var()`), alors que SKILL.md annonce « aucune valeur en dur ».
- Aucune échelle d'espacement (`--space-*`) dans les tokens : les marges et écarts sont des valeurs px en dur.
- Paires de contraste validées seulement au seuil « grand texte » (3:1) : `green:navy`. À vérifier à l'œil qu'elles ne servent jamais à du petit texte.
- 3 règles de survol avec `scale()` (motif « tout grossit au survol »).
- Survols non protégés par `@media (hover: hover)` : effets collants possibles au toucher.
- Pas de lien d'évitement (« aller au contenu »).
- 7 lien(s) `href="#"` (ne mènent nulle part).
- 17 bouton(s) sans attribut `type`.
- Formulaire : onsubmit="return false" (aucun retour).
- Un seul point de rupture (max-width: 900px) : pas de palier tablette.
- Aucun état vide (liste sans résultat, panier vide…) dans la démo.
