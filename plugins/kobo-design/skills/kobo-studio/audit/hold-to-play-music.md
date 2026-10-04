# Audit — hold-to-play-music

> Relevé en lecture seule. Sources : `references/tokens.css`, `examples/demo.html`, `SKILL.md`.
> Les états des composants sont détectés automatiquement à partir des sélecteurs CSS et des attributs ARIA de la démo, puis relus ; ils n'ont pas été vérifiés sur capture d'écran.

- Variables dans `tokens.css` : **46**
- Démo : 367 lignes, dont 132 de script ; polices chargées : Figtree, Inconsolata, Londrina Solid
- Rôles du contrat : 21 remplis, 6 dérivables, 9 absents (sur 36)

## a. Variables classées par rôle du contrat

### Surfaces

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-bg` | rempli | `--bg` |  |
| `--k-surface` | rempli | `--paper` |  |
| `--k-surface-2` | absent | — |  |
| `--k-overlay` | rempli | `--veil`, `--veil-strong` |  |

### Texte

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-text` | rempli | `--white` |  |
| `--k-text-2` | rempli | `--pale` |  |
| `--k-text-muted` | rempli | `--grey` |  |
| `--k-on-accent` | dérivable | `--white` | blanc sur --klein |

### Accent et états

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-accent` | rempli | `--orange`, `--hot` |  |
| `--k-accent-2` | rempli | `--klein` |  |
| `--k-success` | absent | — |  |
| `--k-warning` | absent | — |  |
| `--k-danger` | absent | — |  |
| `--k-focus` | dérivable | `--hot` |  |

### Filets

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-line` | dérivable | `--ghost` |  |
| `--k-line-strong` | absent | — |  |

### Typo

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-font-display` | rempli | `--font-paint` |  |
| `--k-font-body` | rempli | `--font-ui` |  |
| `--k-font-mono` | rempli | `--font-mono` |  |
| `--k-fs-hero` | rempli | `--fs-paint` |  |
| `--k-fs-h1` | dérivable | `--fs-credit` |  |
| `--k-fs-h2` | dérivable | `--fs-artist` |  |
| `--k-fs-body` | rempli | `--fs-say` |  |
| `--k-fs-small` | rempli | `--fs-mono`, `--fs-mono-s` |  |

### Formes

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-radius` | absent | — |  |
| `--k-radius-lg` | absent | — |  |
| `--k-border-w` | rempli | `--key-line` |  |
| `--k-cut` | dérivable | — | 0 |

### Espace

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-space-1…12` | absent | — |  |
| `--k-edge` | rempli | `--edge` |  |
| `--k-container` | absent | — |  |

### Mouvement

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-ease-out` | rempli | `--ease-push` |  |
| `--k-ease-in-out` | rempli | `--ease-soft`, `--ease-slide` |  |
| `--k-dur-fast` | rempli | `--dur-fade` |  |
| `--k-dur-base` | rempli | `--dur-snap` |  |
| `--k-dur-slow` | rempli | `--dur-push` |  |

### Rôles sans équivalent dans ce skill

`--k-surface-2`, `--k-success`, `--k-warning`, `--k-danger`, `--k-line-strong`, `--k-radius`, `--k-radius-lg`, `--k-space-1…12`, `--k-container`

### Toutes les variables de `tokens.css`

| Variable | Valeur | Famille | Rôle du contrat |
|---|---|---|---|
| `--bg` | `#000000` | Couleur | `--k-bg` |
| `--paper` | `#ffffff` | Couleur | `--k-surface` |
| `--white` | `#ffffff` | Couleur | `--k-text` |
| `--ink` | `#383838` | Couleur | `--k-sig-ink` |
| `--orange` | `#e47839` | Couleur | `--k-accent` |
| `--hot` | `#ff6600` | Couleur | `--k-accent` |
| `--klein` | `#002fa7` | Couleur | `--k-accent-2` |
| `--grey` | `#858585` | Couleur | `--k-text-muted` |
| `--pale` | `#bababa` | Couleur | `--k-text-2` |
| `--orange-ink` | `#b4541a` | Couleur | `--k-sig-orange-ink` |
| `--veil` | `rgb(0 0 0 / 0.45)` | Couleur | `--k-overlay` |
| `--veil-strong` | `rgb(0 0 0 / 0.86)` | Couleur | `--k-overlay` |
| `--ghost` | `rgb(255 255 255 / 0.4)` | Couleur | `--k-line` (dérivable) |
| `--font-paint` | `'Londrina Solid', 'Impact', sans-serif` | Typo | `--k-font-display` |
| `--font-ui` | `'Figtree', system-ui, sans-serif` | Typo | `--k-font-body` |
| `--font-mono` | `'Inconsolata', ui-monospace, monospace` | Typo | `--k-font-mono` |
| `--w-thin` | `300` | Typo | hors contrat — typo (candidat `--k-sig-w-thin`) |
| `--fs-paint` | `clamp(3.1rem, 9vw, 8.2rem)` | Typo | `--k-fs-hero` |
| `--paint-tall` | `1.9` | Typo | hors contrat — typo (candidat `--k-sig-paint-tall`) |
| `--fs-artist` | `2.375rem` | Typo | `--k-fs-h2` (dérivable) |
| `--fs-credit` | `2.875rem` | Typo | `--k-fs-h1` (dérivable) |
| `--fs-say` | `1.25rem` | Typo | `--k-fs-body` |
| `--lh-say` | `3rem` | Typo | hors contrat — typo (candidat `--k-sig-lh-say`) |
| `--fs-key` | `1.0625rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-key`) |
| `--fs-tag` | `0.894rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-tag`) |
| `--fs-mono` | `0.8125rem` | Typo | `--k-fs-small` |
| `--fs-mono-s` | `0.75rem` | Typo | `--k-fs-small` |
| `--edge` | `clamp(16px, 2.1vw, 30px)` | Espace | `--k-edge` |
| `--key-w` | `140px` | Dimension de composant | hors contrat — dimension de composant |
| `--key-h` | `48px` | Dimension de composant | hors contrat — dimension de composant |
| `--key-line` | `1.6px` | Formes | `--k-border-w` |
| `--cover` | `150px` | Dimension de composant | hors contrat — dimension de composant |
| `--cover-big` | `424px` | Dimension de composant | hors contrat — dimension de composant |
| `--foot-y` | `44px` | Dimension de composant | hors contrat — dimension de composant |
| `--ease-snap` | `cubic-bezier(1, 0, 0, 1)` | Mouvement | `--k-sig-ease-snap` |
| `--ease-slide` | `cubic-bezier(0.77, 0, 0.175, 1)` | Mouvement | `--k-ease-in-out` |
| `--ease-push` | `cubic-bezier(0.19, 1, 0.22, 1)` | Mouvement | `--k-ease-out` |
| `--ease-soft` | `cubic-bezier(0.645, 0.045, 0.355, 1)` | Mouvement | `--k-ease-in-out` |
| `--dur-blink` | `100ms` | Mouvement | `--k-sig-dur-blink` |
| `--dur-fade` | `300ms` | Mouvement | `--k-dur-fast` |
| `--dur-snap` | `500ms` | Mouvement | `--k-dur-base` |
| `--dur-slide` | `700ms` | Mouvement | `--k-sig-dur-slide` |
| `--dur-push` | `1000ms` | Mouvement | `--k-dur-slow` |
| `--hold` | `1500ms` | Mouvement | `--k-sig-hold` |
| `--zap` | `180ms` | Mouvement | `--k-sig-zap` |
| `--cut` | `2000ms` | Mouvement | `--k-sig-cut` |

## b. Composants de `examples/demo.html`

| Composant | Nom(s) dans la démo | États présents | États manquants |
|---|---|---|---|
| Barre de navigation | `.bar` | repos, focus, actif | survol |
| Héros | `.intro` | repos | — |
| Bouton rond / icône | `.help-btn`, `.close` | repos, focus | survol, actif, désactivé |
| Puce / étiquette | `.label`, `.tag` | repos | actif |
| Champ / formulaire | `.hint` | repos, focus | erreur, désactivé, chargement |
| Panneau / modale | `.sheet` | repos, focus, actif | — |
| Citation / avis | `.say` | repos | — |
| Pied de page | `.foot` | repos, survol, focus | — |

Le focus est assuré par une règle globale `:focus-visible` (présente dans les 23 démos) ; il est compté comme présent pour tout composant interactif, mais rarement dessiné composant par composant.

Classes propres au skill (hors composants communs) : `.paint`, `.artist`, `.sleeve`, `.shots`, `.key`, `.zap`, `.mini`, `.fill`, `.grain`, `.presents`, `.skip`.

Balises : main ×1, section ×1, footer ×1, button ×9, a ×1, img ×2, ul ×2, svg ×9, h1 ×1, h2 ×4.

Attributs d'accessibilité : aria-hidden ×11, aria-label ×4, role ×2, aria-modal ×2, aria-labelledby ×2, aria-live ×1.

## c. Schémas UX

- **Structure de page** : Écran unique sans défilement : accueil (consigne centrale) ↔ fiche artiste ; pied en mono ; feuille d'aide en modale.
- **Navigation** : Aucune navigation classique : un geste (maintenir espace / clic long), bouton d'aide, bouton passer.
- **Parcours** : Consigne → maintenir → relâcher → artiste révélé → recommencer. Issue de secours au clavier (Entrée) et au clic.
- **États** : Repos (gris) / appui (couleur) / relâché ; modale d'aide (`aria-modal`, `inert`) ; annonces `aria-live`.
- **Formulaire** : aucun formulaire.
- **Mouvement** : 2 animation(s) nommée(s) (blink, push) ; mécanismes : matchMedia, setInterval, keydown-keys, focus(), preventDefault, inert ; `prefers-reduced-motion` pris en compte (2 mention(s)).
- **Points de rupture** : max-width: 760px.

## d. Signature (à ne pas rendre générique)

- La touche en pilule dont le contour se remplit pendant l'appui.
- Le mot peint à la main en bleu Klein, orange et blanc.
- Gris au repos, couleur dans l'action ; coupes franches.

## e. Défauts repérés (notés, non corrigés)

Relevés à la lecture :

- `<h1>` vide dans le HTML (texte seulement dans `aria-label`, lettres ajoutées par script).
- Une seule photo réelle dans la démo.
- Seulement 2 règles `:hover` et 1 de focus : les états des 9 boutons sont très peu différenciés.
- Rayons 999px et 8px en dur.
- Le menu contextuel est bloqué (`contextmenu`).

Relevés automatiquement :

- Rayons écrits en dur dans la démo : 999px, 8px.
- Valeurs en px écrites en dur dans le CSS de la démo : 66 (pour 115 usages de `var()`), alors que SKILL.md annonce « aucune valeur en dur ».
- Aucune échelle d'espacement (`--space-*`) dans les tokens : les marges et écarts sont des valeurs px en dur.
- Survols non protégés par `@media (hover: hover)` : effets collants possibles au toucher.
- Pas de lien d'évitement (« aller au contenu »).
- 1 lien(s) `href="#"` (ne mènent nulle part).
- 9 bouton(s) sans attribut `type`.
- Un seul point de rupture (max-width: 760px) : pas de palier tablette.
- Aucun état désactivé (`:disabled`, `aria-disabled`) dans la démo.
- Aucun état vide (liste sans résultat, panier vide…) dans la démo.
