# Audit — chrome-atelier

> Relevé en lecture seule. Sources : `references/tokens.css`, `examples/demo.html`, `SKILL.md`.
> Les états des composants sont détectés automatiquement à partir des sélecteurs CSS et des attributs ARIA de la démo, puis relus ; ils n'ont pas été vérifiés sur capture d'écran.

- Variables dans `tokens.css` : **76**
- Démo : 482 lignes, dont 147 de script ; polices chargées : Inter, IBM Plex Mono, Bodoni Moda
- Rôles du contrat : 21 remplis, 11 dérivables, 4 absents (sur 36)

## a. Variables classées par rôle du contrat

### Surfaces

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-bg` | rempli | `--paper` |  |
| `--k-surface` | rempli | `--panel` |  |
| `--k-surface-2` | rempli | `--mist` |  |
| `--k-overlay` | rempli | `--bar` |  |

### Texte

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-text` | rempli | `--ink` |  |
| `--k-text-2` | rempli | `--body` |  |
| `--k-text-muted` | dérivable | `--soft` | utilisable sur fond nuit seulement |
| `--k-on-accent` | dérivable | `--paper` | texte sur pilule encre |

### Accent et états

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-accent` | dérivable | `--ink` | pas d'accent : l'action est en encre, l'or est réservé au métal |
| `--k-accent-2` | dérivable | `--gold-ink` |  |
| `--k-success` | absent | — |  |
| `--k-warning` | absent | — |  |
| `--k-danger` | dérivable | `--gold-ink` | bordure du champ invalide |
| `--k-focus` | dérivable | `currentColor` |  |

### Filets

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-line` | rempli | `--rule` |  |
| `--k-line-strong` | dérivable | `--ink` | trait de 0.8px en encre |

### Typo

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-font-display` | rempli | `--font-display` |  |
| `--k-font-body` | dérivable | `--font-display` | une seule famille sans |
| `--k-font-mono` | rempli | `--font-mono` |  |
| `--k-fs-hero` | rempli | `--fs-hero` |  |
| `--k-fs-h1` | absent | — |  |
| `--k-fs-h2` | rempli | `--fs-h2` |  |
| `--k-fs-body` | rempli | `--fs-body` | 13px |
| `--k-fs-small` | rempli | `--fs-label` | 11px |

### Formes

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-radius` | dérivable | — | 0 sauf pilules (r-pill) |
| `--k-radius-lg` | absent | — |  |
| `--k-border-w` | rempli | `--hairline` |  |
| `--k-cut` | dérivable | — | 0 |

### Espace

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-space-1…12` | rempli | space-1…12 | 1,2,3,4,6,8,12 + 16,20,24 |
| `--k-edge` | rempli | `--edge`, `--edge-hero` |  |
| `--k-container` | rempli | `--container` |  |

### Mouvement

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-ease-out` | rempli | `--ease-out` |  |
| `--k-ease-in-out` | rempli | `--ease-io` |  |
| `--k-dur-fast` | rempli | `--dur-nav` |  |
| `--k-dur-base` | rempli | `--dur-ui` |  |
| `--k-dur-slow` | dérivable | `--dur-fade`, `--dur-shift` |  |

### Rôles sans équivalent dans ce skill

`--k-success`, `--k-warning`, `--k-fs-h1`, `--k-radius-lg`

### Toutes les variables de `tokens.css`

| Variable | Valeur | Famille | Rôle du contrat |
|---|---|---|---|
| `--paper` | `#ffffff` | Couleur | `--k-bg` |
| `--mist` | `#eaeaea` | Couleur | `--k-surface-2` |
| `--panel` | `#f3f3f3` | Couleur | `--k-surface` |
| `--ink` | `#10191e` | Couleur | `--k-text` |
| `--body` | `#3f464a` | Couleur | `--k-text-2` |
| `--rule` | `#e0e0e0` | Couleur | `--k-line` |
| `--ghost` | `#cacccd` | Couleur | `--k-sig-ghost` |
| `--night` | `#1c2c39` | Couleur | `--k-sig-night` |
| `--night-2` | `#293339` | Couleur | `--k-sig-night-2` |
| `--black` | `#000201` | Couleur | `--k-sig-black` |
| `--soft` | `#b3b3b3` | Couleur | `--k-text-muted` (dérivable) |
| `--bar` | `rgb(2 2 2 / 0.2)` | Couleur | `--k-overlay` |
| `--bar-line` | `rgb(255 255 255 / 0.16)` | Couleur | `--k-sig-bar-line` |
| `--pill-ghost` | `rgb(255 255 255 / 0.04)` | Couleur | `--k-sig-pill-ghost` |
| `--gold-lo` | `#523d0d` | Couleur | `--k-sig-gold-lo` |
| `--gold` | `#c3a23e` | Couleur | `--k-sig-gold` |
| `--gold-hi` | `#eddfa4` | Couleur | `--k-sig-gold-hi` |
| `--white-gold-lo` | `#5b5b5b` | Couleur | `--k-sig-white-gold-lo` |
| `--white-gold` | `#bbbbbb` | Couleur | `--k-sig-white-gold` |
| `--white-gold-hi` | `#e6e6e6` | Couleur | `--k-sig-white-gold-hi` |
| `--rose-lo` | `#5b2217` | Couleur | `--k-sig-rose-lo` |
| `--rose` | `#b77f6b` | Couleur | `--k-sig-rose` |
| `--rose-hi` | `#edd1c2` | Couleur | `--k-sig-rose-hi` |
| `--gold-ink` | `#7a5d14` | Couleur | `--k-accent-2` (dérivable) |
| `--font-display` | `'Inter', 'Helvetica Neue', Arial, sans-serif` | Typo | `--k-font-display` |
| `--font-mono` | `'IBM Plex Mono', ui-monospace, monospace` | Typo | `--k-font-mono` |
| `--weight` | `400` | Typo | hors contrat — typo (candidat `--k-sig-weight`) |
| `--fs-hero` | `clamp(1.375rem, 1.8vw, 2.5rem)` | Typo | `--k-fs-hero` |
| `--lh-hero` | `1.1` | Typo | hors contrat — typo (candidat `--k-sig-lh-hero`) |
| `--ls-hero` | `0.0125em` | Typo | hors contrat — typo (candidat `--k-sig-ls-hero`) |
| `--fs-h2` | `clamp(1.25rem, 1.35vw, 1.875rem)` | Typo | `--k-fs-h2` |
| `--lh-h2` | `1` | Typo | hors contrat — typo (candidat `--k-sig-lh-h2`) |
| `--ls-h2` | `-0.01em` | Typo | hors contrat — typo (candidat `--k-sig-ls-h2`) |
| `--fs-body` | `0.8125rem` | Typo | `--k-fs-body` |
| `--lh-body` | `1.385` | Typo | hors contrat — typo (candidat `--k-sig-lh-body`) |
| `--ls-body` | `0.033em` | Typo | hors contrat — typo (candidat `--k-sig-ls-body`) |
| `--fs-label` | `0.6875rem` | Typo | `--k-fs-small` |
| `--ls-label` | `0.08em` | Typo | hors contrat — typo (candidat `--k-sig-ls-label`) |
| `--fs-btn` | `0.6875rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-btn`) |
| `--ls-btn` | `0.092em` | Typo | hors contrat — typo (candidat `--k-sig-ls-btn`) |
| `--fs-value` | `clamp(1rem, 1.04vw, 1.25rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-value`) |
| `--ls-mono` | `-0.108em` | Typo | hors contrat — typo (candidat `--k-sig-ls-mono`) |
| `--indent` | `1.55em` | Typo | hors contrat — typo (candidat `--k-sig-indent`) |
| `--edge` | `clamp(20px, 4.6vw, 67px)` | Espace | `--k-edge` |
| `--edge-hero` | `clamp(16px, 2.2vw, 32px)` | Espace | `--k-edge` |
| `--nav-h` | `44px` | Dimension de composant | hors contrat — dimension de composant |
| `--bar-h` | `58px` | Dimension de composant | hors contrat — dimension de composant |
| `--pill-h` | `44px` | Dimension de composant | hors contrat — dimension de composant |
| `--ring` | `min(75vh, 47vw)` | Dimension de composant | hors contrat — dimension de composant |
| `--hairline` | `0.8px` | Formes | `--k-border-w` |
| `--r-pill` | `999px` | Formes | `--k-sig-r-pill` |
| `--card-w` | `clamp(180px, 26.2vw, 377px)` | Dimension de composant | hors contrat — dimension de composant |
| `--cell-w` | `clamp(150px, 16.3vw, 235px)` | Dimension de composant | hors contrat — dimension de composant |
| `--blur` | `4px` | Formes | `--k-sig-blur` |
| `--space-1` | `4px` | Espace | `--k-space-1…12` |
| `--space-2` | `8px` | Espace | `--k-space-1…12` |
| `--space-3` | `12px` | Espace | `--k-space-1…12` |
| `--space-4` | `16px` | Espace | `--k-space-1…12` |
| `--space-6` | `24px` | Espace | `--k-space-1…12` |
| `--space-8` | `32px` | Espace | `--k-space-1…12` |
| `--space-12` | `48px` | Espace | `--k-space-1…12` |
| `--space-16` | `64px` | Espace | `--k-space-1…12` |
| `--space-20` | `80px` | Espace | `--k-space-1…12` |
| `--space-24` | `96px` | Espace | `--k-space-1…12` |
| `--container` | `1280px` | Espace | `--k-container` |
| `--ease` | `ease` | Mouvement | `--k-sig-ease` |
| `--ease-io` | `cubic-bezier(0.45, 0, 0.55, 1)` | Mouvement | `--k-ease-in-out` |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Mouvement | `--k-ease-out` |
| `--dur-nav` | `200ms` | Mouvement | `--k-dur-fast` |
| `--dur-ui` | `300ms` | Mouvement | `--k-dur-base` |
| `--dur-move` | `450ms` | Mouvement | `--k-sig-dur-move` |
| `--dur-fade` | `500ms` | Mouvement | `--k-dur-slow` (dérivable) |
| `--dur-shift` | `1000ms` | Mouvement | `--k-dur-slow` (dérivable) |
| `--dur-draw` | `3000ms` | Mouvement | `--k-sig-dur-draw` |
| `--dur-float` | `3s` | Mouvement | `--k-sig-dur-float` |
| `--float-y` | `-15px` | Mouvement | `--k-sig-float-y` |

## b. Composants de `examples/demo.html`

| Composant | Nom(s) dans la démo | États présents | États manquants |
|---|---|---|---|
| Chargement de page | `.loader` | repos, chargement | — |
| Barre de navigation | `.nav` | repos, survol, focus, actif | — |
| Héros | `.hero`, `.stage` | repos | — |
| Bouton principal | `.pill`, `.pill--light`, `.pill--full` | repos, survol, focus, chargement | actif, désactivé |
| Onglets / sélecteur | `.wheel`, `.karats` | repos, focus, actif | survol, désactivé |
| Carte | `.spec-card`, `.cards` | repos, focus | survol, chargement, vide |
| Puce / étiquette | `.tag`, `.label` | repos | actif |
| Accordéon / étapes | `.faq` | repos, focus, actif | survol |
| Champ / formulaire | `.wait`, `.field`, `.hint` | repos, survol, focus, chargement, erreur | désactivé |
| Chiffres clés | `.count` | repos | — |
| Indice de défilement | `.scrolldown` | repos | — |

Le focus est assuré par une règle globale `:focus-visible` (présente dans les 23 démos) ; il est compté comme présent pour tout composant interactif, mais rarement dessiné composant par composant.

Classes propres au skill (hors composants communs) : `.press`, `.gallery`, `.guides`, `.piece`, `.specs`, `.atelier`, `.lines`, `.logo`, `.ring`, `.under`, `.acts`, `.wm1`, `.wm2`, `.wm3`, `.wm4`.

Balises : header ×1, nav ×1, main ×1, section ×7, article ×4, footer ×1, form ×1, input ×2, button ×8, a ×17, img ×17, ul ×3, label ×2, svg ×4, h1 ×1, h2 ×5, h3 ×4.

Attributs d'accessibilité : aria-hidden ×9, aria-label ×8, aria-pressed ×7, aria-labelledby ×6, role ×3, aria-live ×2, aria-describedby ×1.

## c. Schémas UX

- **Structure de page** : Page longue : héros nuit → cartes de caractéristiques → atelier (pièce 3D + choix du métal) → presse → galerie → FAQ → liste d'attente.
- **Navigation** : Barre haute discrète + mini-nav dans le héros ; ancres.
- **Parcours** : Désir (photo) → preuve (chiffres) → manipulation (tourner la pièce, choisir l'or) → réassurance (presse, FAQ) → inscription à la liste d'attente.
- **États** : Chargement tracé, sélecteur de métal `aria-pressed`, FAQ ouverte/fermée, champ `aria-invalid`, bouton `aria-busy`, confirmation `aria-live`.
- **Formulaire** : validation + erreur + chargement.
- **Mouvement** : 1 animation(s) nommée(s) (floatY) ; mécanismes : IntersectionObserver, rAF, three, matchMedia, aria-set, focus(), preventDefault, wheel, pointer ; `prefers-reduced-motion` pris en compte (3 mention(s)).
- **Points de rupture** : max-width: 767px.

## d. Signature (à ne pas rendre générique)

- La planche au cercle : quatre filets, un grand cercle fin, la pièce de métal au centre.
- Tout en Regular, minuscule (13px / 11px), traits de 0.8px.
- Étiquettes mono entre crochets ; la couleur ne vient que du métal.

## e. Défauts repérés (notés, non corrigés)

Relevés à la lecture :

- Section « presse » : titres d'articles et médias inventés (équivalent de logos clients).
- Texte à 13px et libellés à 11px : sous le seuil de confort habituel (assumé dans SKILL.md).
- Une règle `:focus` sans `-visible` sur le champ.
- Police Bodoni Moda chargée mais absente des tokens.

Relevés automatiquement :

- Valeurs en px écrites en dur dans le CSS de la démo : 55 (pour 285 usages de `var()`), alors que SKILL.md annonce « aucune valeur en dur ».
- Tailles de texte sous 12px : `--fs-label` = 0.6875rem, `--fs-btn` = 0.6875rem.
- Survols non protégés par `@media (hover: hover)` : effets collants possibles au toucher.
- Pas de lien d'évitement (« aller au contenu »).
- Un seul point de rupture (max-width: 767px) : pas de palier tablette.
- Aucun état désactivé (`:disabled`, `aria-disabled`) dans la démo.
- Aucun état vide (liste sans résultat, panier vide…) dans la démo.
