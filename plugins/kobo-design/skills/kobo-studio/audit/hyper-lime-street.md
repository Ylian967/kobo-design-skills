# Audit — hyper-lime-street

> Relevé en lecture seule. Sources : `references/tokens.css`, `examples/demo.html`, `SKILL.md`.
> Les états des composants sont détectés automatiquement à partir des sélecteurs CSS et des attributs ARIA de la démo, puis relus ; ils n'ont pas été vérifiés sur capture d'écran.

- Variables dans `tokens.css` : **51**
- Démo : 505 lignes, dont 51 de script ; polices chargées : Anton, Inter
- Rôles du contrat : 21 remplis, 5 dérivables, 10 absents (sur 36)

## a. Variables classées par rôle du contrat

### Surfaces

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-bg` | rempli | `--bg` |  |
| `--k-surface` | rempli | `--surface` |  |
| `--k-surface-2` | dérivable | `--field`, `--ink` |  |
| `--k-overlay` | rempli | `--veil` |  |

### Texte

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-text` | rempli | `--text` |  |
| `--k-text-2` | absent | — |  |
| `--k-text-muted` | rempli | `--muted` |  |
| `--k-on-accent` | rempli | `--on-accent` |  |

### Accent et états

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-accent` | rempli | `--accent` |  |
| `--k-accent-2` | rempli | `--accent-2` |  |
| `--k-success` | absent | — |  |
| `--k-warning` | absent | — |  |
| `--k-danger` | absent | — |  |
| `--k-focus` | dérivable | `--accent` |  |

### Filets

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-line` | absent | — |  |
| `--k-line-strong` | absent | — |  |

### Typo

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-font-display` | rempli | `--font-display` |  |
| `--k-font-body` | rempli | `--font-body` |  |
| `--k-font-mono` | absent | — |  |
| `--k-fs-hero` | dérivable | `--fs-name`, `--fs-feature` |  |
| `--k-fs-h1` | rempli | `--fs-title` |  |
| `--k-fs-h2` | dérivable | `--fs-foot-title` |  |
| `--k-fs-body` | rempli | `--fs-body` | 14px |
| `--k-fs-small` | dérivable | `--fs-nav` |  |

### Formes

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-radius` | rempli | `--r-card` |  |
| `--k-radius-lg` | rempli | `--r-shape` |  |
| `--k-border-w` | absent | — |  |
| `--k-cut` | rempli | `--angle`, `--slant` | le biseau est un ANGLE (41°) |

### Espace

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-space-1…12` | absent | — |  |
| `--k-edge` | absent | — |  |
| `--k-container` | rempli | `--container` |  |

### Mouvement

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-ease-out` | rempli | `--ease` |  |
| `--k-ease-in-out` | rempli | `--ease-io` |  |
| `--k-dur-fast` | rempli | `--dur-fast` |  |
| `--k-dur-base` | rempli | `--dur` |  |
| `--k-dur-slow` | rempli | `--dur-in` |  |

### Rôles sans équivalent dans ce skill

`--k-text-2`, `--k-success`, `--k-warning`, `--k-danger`, `--k-line`, `--k-line-strong`, `--k-font-mono`, `--k-border-w`, `--k-space-1…12`, `--k-edge`

### Toutes les variables de `tokens.css`

| Variable | Valeur | Famille | Rôle du contrat |
|---|---|---|---|
| `--bg` | `#efefef` | Couleur | `--k-bg` |
| `--surface` | `#ffffff` | Couleur | `--k-surface` |
| `--text` | `#222122` | Couleur | `--k-text` |
| `--muted` | `#61636b` | Couleur | `--k-text-muted` |
| `--ink` | `#111111` | Couleur | `--k-surface-2` (dérivable) |
| `--black` | `#000000` | Couleur | `--k-sig-black` |
| `--tab` | `#0a0a0a` | Couleur | `--k-sig-tab` |
| `--on-ink` | `#ffffff` | Couleur | `--k-sig-on-ink` |
| `--soft` | `#ccd0d2` | Couleur | `--k-sig-soft` |
| `--nav-idle` | `#878787` | Couleur | `--k-sig-nav-idle` |
| `--accent` | `#d8fa00` | Couleur | `--k-accent` |
| `--accent-2` | `#c6e800` | Couleur | `--k-accent-2` |
| `--on-accent` | `#000000` | Couleur | `--k-on-accent` |
| `--field` | `#222222` | Couleur | `--k-surface-2` (dérivable) |
| `--hatch` | `rgb(255 255 255 / 0.05)` | Couleur | `--k-sig-hatch` |
| `--watermark` | `rgb(34 33 34 / 0.06)` | Couleur | `--k-sig-watermark` |
| `--watermark-ink` | `rgb(239 239 239 / 0.1)` | Couleur | `--k-sig-watermark-ink` |
| `--veil` | `rgb(17 17 17 / 0.5)` | Couleur | `--k-overlay` |
| `--font-display` | `'Anton', 'Impact', 'Haettenschweiler', sans-serif` | Typo | `--k-font-display` |
| `--font-body` | `'Inter', system-ui, sans-serif` | Typo | `--k-font-body` |
| `--fs-num` | `clamp(4.5rem, 7.27vw, 6.54rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-num`) |
| `--fs-title` | `clamp(1.6rem, 2.54vw, 2.285rem)` | Typo | `--k-fs-h1` |
| `--fs-en` | `clamp(0.8125rem, 1.25vw, 1.125rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-en`) |
| `--fs-name` | `clamp(2rem, 3.44vw, 3.1rem)` | Typo | `--k-fs-hero` (dérivable) |
| `--fs-feature` | `clamp(1.75rem, 3.125vw, 2.8rem)` | Typo | `--k-fs-hero` (dérivable) |
| `--fs-ticker` | `clamp(1rem, 1.56vw, 1.4rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-ticker`) |
| `--fs-btn` | `clamp(0.8125rem, 0.94vw, 0.844rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-btn`) |
| `--fs-nav` | `0.72rem` | Typo | `--k-fs-small` (dérivable) |
| `--fs-mark` | `clamp(7rem, 28.2vw, 25.4rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-mark`) |
| `--fs-foot-title` | `1.5rem` | Typo | `--k-fs-h2` (dérivable) |
| `--fs-body` | `0.875rem` | Typo | `--k-fs-body` |
| `--angle` | `41deg` | Signature | `--k-cut` |
| `--slant` | `0.869` | Signature | `--k-cut` |
| `--container` | `min(1080px, 75vw)` | Espace | `--k-container` |
| `--nav-h` | `56px` | Dimension de composant | hors contrat — dimension de composant |
| `--panel-h` | `clamp(300px, 30.7vw, 442px)` | Dimension de composant | hors contrat — dimension de composant |
| `--block-w` | `clamp(240px, 33vw, 475px)` | Dimension de composant | hors contrat — dimension de composant |
| `--r-shape` | `clamp(12px, 1.5vw, 22px)` | Formes | `--k-radius-lg` |
| `--r-card` | `8.4px` | Formes | `--k-radius` |
| `--r-pill` | `999px` | Formes | `--k-sig-r-pill` |
| `--btn-h` | `43px` | Dimension de composant | hors contrat — dimension de composant |
| `--pill-h` | `25px` | Dimension de composant | hors contrat — dimension de composant |
| `--tab-w` | `46px` | Dimension de composant | hors contrat — dimension de composant |
| `--underline` | `8px` | Formes | `--k-sig-underline` |
| `--ease` | `cubic-bezier(0.15, 0.59, 0.45, 0.89)` | Mouvement | `--k-ease-out` |
| `--ease-io` | `ease-in-out` | Mouvement | `--k-ease-in-out` |
| `--dur-fast` | `200ms` | Mouvement | `--k-dur-fast` |
| `--dur` | `400ms` | Mouvement | `--k-dur-base` |
| `--dur-in` | `700ms` | Mouvement | `--k-dur-slow` |
| `--dur-ticker` | `20s` | Mouvement | `--k-sig-dur-ticker` |
| `--dur-beat` | `0.8s` | Mouvement | `--k-sig-dur-beat` |

## b. Composants de `examples/demo.html`

| Composant | Nom(s) dans la démo | États présents | États manquants |
|---|---|---|---|
| Chargement de page | `.loader` | repos, chargement | — |
| Barre de navigation | `.nav`, `.top` | repos, survol, focus, actif | — |
| Héros | `.hero` | repos | — |
| Bouton principal | `.more`, `.cta` | repos, survol, focus | actif, désactivé, chargement |
| Bouton rond / icône | `.play`, `.social` | repos, survol, focus | actif, désactivé |
| Onglets / sélecteur | `.thumbs`, `.tab` | repos, survol, focus, actif | désactivé |
| Carte | `.world`, `.feat` | repos, focus, actif | survol, chargement, vide |
| Puce / étiquette | `.sticker` | repos | actif |
| Carrousel / pagination | `.dots`, `.slide` | repos, focus, actif | survol, désactivé |
| Champ / formulaire | `.sub`, `.news` | repos, survol, focus | erreur, désactivé, chargement |
| Panneau / modale | `.panel` | repos, focus | actif |
| Défilant | `.ticker` | repos | survol |
| Pied de page | `.legal`, `.foot` | repos, survol, focus | — |

Le focus est assuré par une règle globale `:focus-visible` (présente dans les 23 démos) ; il est compté comme présent pour tout composant interactif, mais rarement dessiné composant par composant.

Classes propres au skill (hors composants communs) : `.block`, `.video`, `.chara`, `.stores`, `.slab`, `.key`, `.brand`, `.beat`, `.mark`, `.stack`, `.row`, `.shape`, `.cut`, `.film`, `.fill`.

Balises : header ×1, nav ×1, main ×1, section ×6, aside ×1, footer ×1, form ×1, input ×2, button ×21, a ×33, img ×22, ul ×3, label ×2, svg ×13, h1 ×1, h2 ×6, h3 ×7.

Attributs d'accessibilité : aria-label ×35, aria-hidden ×25, role ×17, aria-selected ×13, aria-current ×1, aria-pressed ×1.

## c. Schémas UX

- **Structure de page** : Page longue en 6 sections numérotées (accueil, personnages, vidéos, actus, univers, jeu) + pied avec abonnement. Une section sur deux inversée.
- **Navigation** : Barre noire fixe à onglets + onglet latéral ; `aria-current`.
- **Parcours** : Accueil → personnages (onglets + diapositives) → vidéos (vignettes) → actus → univers → téléchargement / abonnement.
- **États** : Chargement de page, onglets `aria-selected`, diapositive active, points de carrousel. Formulaire `return false` : aucun retour.
- **Formulaire** : onsubmit="return false" (aucun retour).
- **Mouvement** : 3 animation(s) nommée(s) (load, heartbeat, wordsLoop) ; mécanismes : IntersectionObserver, rAF, matchMedia, aria-set, keydown-keys, focus(), scrollIntoView ; `prefers-reduced-motion` pris en compte (2 mention(s)).
- **Points de rupture** : max-width: 1023px.

## d. Signature (à ne pas rendre générique)

- Grandes formes inclinées à 41° qui sortent de l'écran.
- Bloc lime numéroté : titre, sous-titre anglais, numéro géant.
- Noir tramé façon carbone, pellicule en diagonale, autocollants inclinés.

## e. Défauts repérés (notés, non corrigés)

Relevés à la lecture :

- 12 liens `href="#"`, 21 boutons sans `type`.
- Formulaire d'abonnement factice (`return false`).
- Rayons en dur : 6, 7, 8, 10, 14, 24px à côté de 3 tokens de rayon.
- 7 images sur 22 avec `alt` vide.
- Texte courant à 14px, nav à 11,5px.

Relevés automatiquement :

- Rayons écrits en dur dans la démo : 8px, 7px, 6px, 10px, 14px, 12px 12px 0 0, 24px.
- Valeurs en px écrites en dur dans le CSS de la démo : 177 (pour 269 usages de `var()`), alors que SKILL.md annonce « aucune valeur en dur ».
- Aucune échelle d'espacement (`--space-*`) dans les tokens : les marges et écarts sont des valeurs px en dur.
- 3 règles de survol avec `scale()` (motif « tout grossit au survol »).
- Survols non protégés par `@media (hover: hover)` : effets collants possibles au toucher.
- Pas de lien d'évitement (« aller au contenu »).
- 12 lien(s) `href="#"` (ne mènent nulle part).
- 21 bouton(s) sans attribut `type`.
- Formulaire : onsubmit="return false" (aucun retour).
- Un seul point de rupture (max-width: 1023px) : pas de palier tablette.
- Aucun état désactivé (`:disabled`, `aria-disabled`) dans la démo.
- Aucun état vide (liste sans résultat, panier vide…) dans la démo.
