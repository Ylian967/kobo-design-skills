# Audit — pocket-device-noir

> Relevé en lecture seule. Sources : `references/tokens.css`, `examples/demo.html`, `SKILL.md`.
> Les états des composants sont détectés automatiquement à partir des sélecteurs CSS et des attributs ARIA de la démo, puis relus ; ils n'ont pas été vérifiés sur capture d'écran.

- Variables dans `tokens.css` : **55**
- Démo : 467 lignes, dont 119 de script ; polices chargées : Inter Tight, JetBrains Mono
- Rôles du contrat : 23 remplis, 6 dérivables, 7 absents (sur 36)

## a. Variables classées par rôle du contrat

### Surfaces

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-bg` | rempli | `--bg` |  |
| `--k-surface` | rempli | `--surface` |  |
| `--k-surface-2` | rempli | `--panel` |  |
| `--k-overlay` | rempli | `--glass`, `--veil-1` |  |

### Texte

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-text` | rempli | `--text` |  |
| `--k-text-2` | rempli | `--soft` |  |
| `--k-text-muted` | dérivable | `--tag-text` |  |
| `--k-on-accent` | dérivable | `--ink` | texte sur bouton blanc |

### Accent et états

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-accent` | rempli | `--red` | signal ponctuel ; le bouton principal est blanc (--paper) |
| `--k-accent-2` | absent | — |  |
| `--k-success` | absent | — |  |
| `--k-warning` | absent | — |  |
| `--k-danger` | absent | — |  |
| `--k-focus` | dérivable | `--text` |  |

### Filets

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-line` | rempli | `--line` |  |
| `--k-line-strong` | rempli | `--glass-line` |  |

### Typo

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-font-display` | dérivable | `--font` | une seule famille |
| `--k-font-body` | rempli | `--font` |  |
| `--k-font-mono` | rempli | `--font-lcd` |  |
| `--k-fs-hero` | rempli | `--fs-hero` |  |
| `--k-fs-h1` | dérivable | `--fs-manifesto` |  |
| `--k-fs-h2` | rempli | `--fs-h2` |  |
| `--k-fs-body` | rempli | `--fs-body` |  |
| `--k-fs-small` | rempli | `--fs-small` |  |

### Formes

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-radius` | rempli | `--r-btn` |  |
| `--k-radius-lg` | rempli | `--r-card` | 8px seulement |
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

`--k-accent-2`, `--k-success`, `--k-warning`, `--k-danger`, `--k-border-w`, `--k-space-1…12`, `--k-ease-in-out`

### Toutes les variables de `tokens.css`

| Variable | Valeur | Famille | Rôle du contrat |
|---|---|---|---|
| `--bg` | `#000000` | Couleur | `--k-bg` |
| `--bg-2` | `#0b0b0b` | Couleur | `--k-sig-bg-2` |
| `--foot` | `#121212` | Couleur | `--k-sig-foot` |
| `--surface` | `#181818` | Couleur | `--k-surface` |
| `--tag` | `#1c1c1c` | Couleur | `--k-sig-tag` |
| `--tag-text` | `#c8c8c8` | Couleur | `--k-text-muted` (dérivable) |
| `--panel` | `#2c2c2c` | Couleur | `--k-surface-2` |
| `--glass` | `rgb(255 255 255 / 0.12)` | Couleur | `--k-overlay` |
| `--glass-line` | `rgb(255 255 255 / 0.22)` | Couleur | `--k-line-strong` |
| `--text` | `#ffffff` | Couleur | `--k-text` |
| `--soft` | `#b4b4b4` | Couleur | `--k-text-2` |
| `--giant-top` | `#3a3a3a` | Couleur | `--k-sig-giant-top` |
| `--giant-bottom` | `#0a0a0a` | Couleur | `--k-sig-giant-bottom` |
| `--red` | `#fc383c` | Couleur | `--k-accent` |
| `--red-text` | `#ff6466` | Couleur | `--k-sig-red-text` |
| `--paper` | `#fcfcfc` | Couleur | `--k-sig-paper` |
| `--ink` | `#0a0a0a` | Couleur | `--k-on-accent` (dérivable) |
| `--line` | `rgb(255 255 255 / 0.16)` | Couleur | `--k-line` |
| `--shade` | `#1a1410` | Couleur | `--k-sig-shade` |
| `--veil-0` | `rgb(0 0 0 / 0)` | Couleur | `--k-sig-veil-0` |
| `--veil-1` | `rgb(0 0 0 / 0.55)` | Couleur | `--k-overlay` |
| `--veil-2` | `rgb(0 0 0 / 1)` | Couleur | `--k-sig-veil-2` |
| `--device` | `#1d1d1f` | Couleur | `--k-sig-device` |
| `--device-edge` | `#3c3c40` | Couleur | `--k-sig-device-edge` |
| `--screen` | `#101012` | Couleur | `--k-sig-screen` |
| `--dial` | `#0e0e10` | Couleur | `--k-sig-dial` |
| `--dial-ring` | `#b9b9c2` | Couleur | `--k-sig-dial-ring` |
| `--lcd` | `#e8e8e8` | Couleur | `--k-sig-lcd` |
| `--font` | `'Inter Tight', 'Helvetica Neue', Arial, sans-serif` | Typo | `--k-font-display` (dérivable) |
| `--font-lcd` | `'JetBrains Mono', ui-monospace, monospace` | Typo | `--k-font-mono` |
| `--fs-hero` | `clamp(3.5rem, 7.2vw, 6.5rem)` | Typo | `--k-fs-hero` |
| `--fs-giant` | `clamp(7rem, 23vw, 20.5rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-giant`) |
| `--fs-manifesto` | `clamp(1.75rem, 3.2vw, 2.9rem)` | Typo | `--k-fs-h1` (dérivable) |
| `--fs-h2` | `clamp(1.75rem, 2.9vw, 2.6rem)` | Typo | `--k-fs-h2` |
| `--fs-h3` | `1.5rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-h3`) |
| `--fs-body` | `1.0625rem` | Typo | `--k-fs-body` |
| `--fs-small` | `0.875rem` | Typo | `--k-fs-small` |
| `--fs-tiny` | `0.75rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-tiny`) |
| `--ls-tight` | `-0.035em` | Typo | hors contrat — typo (candidat `--k-sig-ls-tight`) |
| `--page` | `1440px` | Espace | `--k-container` |
| `--gutter` | `clamp(16px, 5.55vw, 80px)` | Espace | `--k-edge` |
| `--btn-h` | `40px` | Dimension de composant | hors contrat — dimension de composant |
| `--r-btn` | `6px` | Formes | `--k-radius` |
| `--r-card` | `8px` | Formes | `--k-radius-lg` |
| `--tag-h` | `32px` | Dimension de composant | hors contrat — dimension de composant |
| `--thumb-w` | `206px` | Dimension de composant | hors contrat — dimension de composant |
| `--thumb-h` | `202px` | Dimension de composant | hors contrat — dimension de composant |
| `--thumb-h-on` | `282px` | Dimension de composant | hors contrat — dimension de composant |
| `--card-w` | `327px` | Dimension de composant | hors contrat — dimension de composant |
| `--card-h` | `250px` | Dimension de composant | hors contrat — dimension de composant |
| `--blur` | `18px` | Formes | `--k-sig-blur` |
| `--ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | Mouvement | `--k-ease-out` |
| `--dur-fast` | `200ms` | Mouvement | `--k-dur-fast` |
| `--dur` | `500ms` | Mouvement | `--k-dur-base` |
| `--dur-slow` | `1000ms` | Mouvement | `--k-dur-slow` |

## b. Composants de `examples/demo.html`

| Composant | Nom(s) dans la démo | États présents | États manquants |
|---|---|---|---|
| Menu plein écran | `.menu` | repos, survol, focus | actif |
| Barre de navigation | `.nav`, `.rail` | repos, survol, focus, actif | — |
| Héros | `.hero-copy`, `.hero` | repos | — |
| Bouton principal | `.btn`, `.cta` | repos, survol, focus, actif | désactivé, chargement |
| Bouton rond / icône | `.round` | repos, survol, focus | actif, désactivé |
| Onglets / sélecteur | `.segs` | repos, focus, actif | survol, désactivé |
| Carte | `.card` | repos, focus | survol, chargement, vide |
| Puce / étiquette | `.tag` | repos | actif |
| Carrousel / pagination | `.strip` | repos, survol, focus, actif | désactivé |
| Champ / formulaire | `.news` | repos, focus | erreur, désactivé, chargement |
| Panneau / modale | `.glass`, `.offer` | repos, focus | actif |
| Citation / avis | `.quote`, `.voices` | repos | — |
| Pied de page | `.foot`, `.foot-top`, `.legal` | repos, survol, focus | — |

Le focus est assuré par une règle globale `:focus-visible` (présente dans les 23 démos) ; il est compté comme présent pour tout composant interactif, mais rarement dessiné composant par composant.

Classes propres au skill (hors composants communs) : `.shot`, `.inside`, `.manifesto`, `.product`, `.feature`, `.voices-head`, `.side`, `.spot`, `.device`, `.logo`, `.arc`, `.why`, `.ruler`, `.inside-foot`, `.pair`, `.rays`, `.giant`, `.rock`, `.price`.

Balises : header ×4, nav ×1, main ×1, section ×7, article ×3, aside ×1, footer ×1, form ×1, input ×1, button ×8, a ×19, img ×19, ul ×2, label ×1, svg ×3, h1 ×1, h2 ×5, h3 ×4.

Attributs d'accessibilité : aria-hidden ×20, aria-label ×8, aria-pressed ×5, role ×2, aria-current ×1, aria-live ×1.

## c. Schémas UX

- **Structure de page** : Page longue : héros photo chaude → manifeste → produit (3D) → pourquoi → en vedette → intérieur → témoignages → appel final → pied.
- **Navigation** : Barre haute simple ; carte d'offre flottante.
- **Parcours** : Rencontre → manifeste → objet sous tous les angles → caractéristiques (segments) → preuve sociale → précommande / lettre d'info.
- **États** : Segments et vignettes `aria-pressed`, vignette centrale agrandie. Formulaire `return false`.
- **Formulaire** : onsubmit="return false" (aucun retour).
- **Mouvement** : 1 animation(s) nommée(s) (ping) ; mécanismes : IntersectionObserver, rAF, three, matchMedia, aria-set, pointer ; `prefers-reduced-motion` pris en compte (2 mention(s)).
- **Points de rupture** : max-width: 900px.

## d. Signature (à ne pas rendre générique)

- L'objet noir sur une photo de bureau ensoleillé.
- Le nom géant gris derrière l'objet.
- Manifeste aux deux mots rouges ; pointillés et verre fumé.

## e. Défauts repérés (notés, non corrigés)

Relevés à la lecture :

- Rangée de témoignages miniatures inventés.
- Formulaire factice (`return false`).
- `#000` en dur (masques) et rayon 6px en dur.
- 188 valeurs px en dur pour 161 usages de variables.
- Une seule règle de focus.

Relevés automatiquement :

- Couleurs en dur hors `:root` dans la démo : #000 ; 0 appel(s) `rgb()`.
- Rayons écrits en dur dans la démo : 6px.
- Valeurs en px écrites en dur dans le CSS de la démo : 188 (pour 161 usages de `var()`), alors que SKILL.md annonce « aucune valeur en dur ».
- Aucune échelle d'espacement (`--space-*`) dans les tokens : les marges et écarts sont des valeurs px en dur.
- Survols non protégés par `@media (hover: hover)` : effets collants possibles au toucher.
- Pas de lien d'évitement (« aller au contenu »).
- 2 lien(s) `href="#"` (ne mènent nulle part).
- 8 bouton(s) sans attribut `type`.
- Formulaire : onsubmit="return false" (aucun retour).
- Un seul point de rupture (max-width: 900px) : pas de palier tablette.
- Aucun état désactivé (`:disabled`, `aria-disabled`) dans la démo.
- Aucun état vide (liste sans résultat, panier vide…) dans la démo.
