# Audit — anime-x-slash

> Relevé en lecture seule. Sources : `references/tokens.css`, `examples/demo.html`, `SKILL.md`.
> Les états des composants sont détectés automatiquement à partir des sélecteurs CSS et des attributs ARIA de la démo, puis relus ; ils n'ont pas été vérifiés sur capture d'écran.

- Variables dans `tokens.css` : **92**
- Démo : 490 lignes, dont 88 de script ; polices chargées : Oswald, Noto Sans JP
- Rôles du contrat : 20 remplis, 10 dérivables, 6 absents (sur 36)

## a. Variables classées par rôle du contrat

### Surfaces

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-bg` | rempli | `--bg` |  |
| `--k-surface` | rempli | `--surface` |  |
| `--k-surface-2` | dérivable | `--bg-inner`, `--bg-hero`, `--panel` |  |
| `--k-overlay` | rempli | `--veil`, `--menu-veil` |  |

### Texte

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-text` | rempli | `--text` |  |
| `--k-text-2` | dérivable | `--dim` |  |
| `--k-text-muted` | rempli | `--muted` |  |
| `--k-on-accent` | rempli | `--on-accent` |  |

### Accent et états

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-accent` | rempli | `--accent` |  |
| `--k-accent-2` | dérivable | `--accent-deep`, `--pop` |  |
| `--k-success` | absent | — |  |
| `--k-warning` | absent | — |  |
| `--k-danger` | absent | — |  |
| `--k-focus` | dérivable | `--accent-text` |  |

### Filets

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-line` | rempli | `--line-grey`, `--line-ghost` |  |
| `--k-line-strong` | dérivable | `--line-accent` | filet rouge, pas un filet « fort » neutre |

### Typo

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-font-display` | rempli | `--font-display` |  |
| `--k-font-body` | rempli | `--font-body` |  |
| `--k-font-mono` | absent | — |  |
| `--k-fs-hero` | dérivable | `--text-title` | titres de section géants ; pas de taille « héros » |
| `--k-fs-h1` | rempli | `--text-page` |  |
| `--k-fs-h2` | dérivable | `--text-xl`, `--text-h3` |  |
| `--k-fs-body` | rempli | `--text-base`, `--text-lg` |  |
| `--k-fs-small` | rempli | `--text-sm` |  |

### Formes

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-radius` | dérivable | — | aucun arrondi (0), pas de token |
| `--k-radius-lg` | absent | — |  |
| `--k-border-w` | rempli | `--border-thin`, `--border-bold` |  |
| `--k-cut` | dérivable | `--slant`, `--skew`, `--notch` | le biseau est un ANGLE (36,4°), pas une longueur |

### Espace

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-space-1…12` | rempli | space-1…20 | 1,2,4,6,10 + 20 |
| `--k-edge` | absent | — |  |
| `--k-container` | rempli | `--container` |  |

### Mouvement

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-ease-out` | rempli | `--ease-out-quart` |  |
| `--k-ease-in-out` | dérivable | `--ease-slam`, `--ease-snap` |  |
| `--k-dur-fast` | rempli | `--dur-fast` |  |
| `--k-dur-base` | rempli | `--dur-base` |  |
| `--k-dur-slow` | rempli | `--dur-slow` |  |

### Rôles sans équivalent dans ce skill

`--k-success`, `--k-warning`, `--k-danger`, `--k-font-mono`, `--k-radius-lg`, `--k-edge`

### Toutes les variables de `tokens.css`

| Variable | Valeur | Famille | Rôle du contrat |
|---|---|---|---|
| `--bg` | `#f4f4f4` | Couleur | `--k-bg` |
| `--bg-hero` | `#ededed` | Couleur | `--k-surface-2` (dérivable) |
| `--pop` | `#ee00bd` | Couleur | `--k-accent-2` (dérivable) |
| `--surface` | `#ffffff` | Couleur | `--k-surface` |
| `--ink` | `#000000` | Couleur | `--k-sig-ink` |
| `--on-ink` | `#ffffff` | Couleur | `--k-sig-on-ink` |
| `--text` | `#000000` | Couleur | `--k-text` |
| `--muted` | `#555555` | Couleur | `--k-text-muted` |
| `--accent` | `#ff211e` | Couleur | `--k-accent` |
| `--accent-text` | `#ff4040` | Couleur | `--k-focus` (dérivable) |
| `--accent-deep` | `#ed2215` | Couleur | `--k-accent-2` (dérivable) |
| `--on-accent` | `#000000` | Couleur | `--k-on-accent` |
| `--line-accent` | `rgb(255 64 64 / 0.55)` | Couleur | `--k-line-strong` (dérivable) |
| `--line-ghost` | `rgb(0 0 0 / 0.08)` | Couleur | `--k-line` |
| `--veil` | `rgb(0 0 0 / 0.55)` | Couleur | `--k-overlay` |
| `--bg-inner` | `#f3f3f3` | Couleur | `--k-surface-2` (dérivable) |
| `--panel` | `#111111` | Couleur | `--k-surface-2` (dérivable) |
| `--menu-close` | `#c8100d` | Couleur | `--k-sig-menu-close` |
| `--menu-veil` | `rgb(0 0 0 / 0.72)` | Couleur | `--k-overlay` |
| `--line-grey` | `rgb(0 0 0 / 0.14)` | Couleur | `--k-line` |
| `--dim` | `rgb(0 0 0 / 0.55)` | Couleur | `--k-text-2` (dérivable) |
| `--fade` | `rgb(255 255 255 / 0.85)` | Couleur | `--k-sig-fade` |
| `--halftone` | `rgb(255 255 255 / 0.22)` | Couleur | `--k-sig-halftone` |
| `--chara-1` | `#eaf4fc` | Couleur | `--k-sig-chara-1` |
| `--chara-2` | `#f8e58c` | Couleur | `--k-sig-chara-2` |
| `--chara-3` | `#7f1184` | Couleur | `--k-sig-chara-3` |
| `--chara-4` | `#fcc800` | Couleur | `--k-sig-chara-4` |
| `--chara-5` | `#ff9933` | Couleur | `--k-sig-chara-5` |
| `--chara-6` | `#eb6ea0` | Couleur | `--k-sig-chara-6` |
| `--chara-7` | `#00fa9a` | Couleur | `--k-sig-chara-7` |
| `--chara-8` | `#008db7` | Couleur | `--k-sig-chara-8` |
| `--font-display` | `'Oswald', 'Arial Narrow', sans-serif` | Typo | `--k-font-display` |
| `--font-body` | `'Noto Sans JP', system-ui, sans-serif` | Typo | `--k-font-body` |
| `--text-xs` | `0.6875rem` | Typo | hors contrat — typo (candidat `--k-sig-text-xs`) |
| `--text-sm` | `0.875rem` | Typo | `--k-fs-small` |
| `--text-base` | `1rem` | Typo | `--k-fs-body` |
| `--text-lg` | `1.25rem` | Typo | `--k-fs-body` |
| `--text-xl` | `2rem` | Typo | `--k-fs-h2` (dérivable) |
| `--text-title` | `clamp(3.5rem, 6.86vw, 6.175rem)` | Typo | `--k-fs-hero` (dérivable) |
| `--text-number` | `clamp(4rem, 7vw, 6.5rem)` | Typo | hors contrat — typo (candidat `--k-sig-text-number`) |
| `--text-page` | `clamp(3.5rem, 7vw, 5.625rem)` | Typo | `--k-fs-h1` |
| `--text-menu` | `clamp(2rem, 3.2vw, 2.75rem)` | Typo | hors contrat — typo (candidat `--k-sig-text-menu`) |
| `--text-tab` | `1.25rem` | Typo | hors contrat — typo (candidat `--k-sig-text-tab`) |
| `--text-h3` | `1.5rem` | Typo | `--k-fs-h2` (dérivable) |
| `--text-chara` | `clamp(3rem, 7vw, 6rem)` | Typo | hors contrat — typo (candidat `--k-sig-text-chara`) |
| `--text-quote` | `clamp(2.5rem, 6vw, 5rem)` | Typo | hors contrat — typo (candidat `--k-sig-text-quote`) |
| `--leading-body` | `2` | Typo | hors contrat — typo (candidat `--k-sig-leading-body`) |
| `--leading-tight` | `1` | Typo | hors contrat — typo (candidat `--k-sig-leading-tight`) |
| `--tracking-body` | `0.04em` | Typo | hors contrat — typo (candidat `--k-sig-tracking-body`) |
| `--tracking-caps` | `0.06em` | Typo | hors contrat — typo (candidat `--k-sig-tracking-caps`) |
| `--space-1` | `4px` | Espace | `--k-space-1…12` |
| `--space-2` | `8px` | Espace | `--k-space-1…12` |
| `--space-4` | `16px` | Espace | `--k-space-1…12` |
| `--space-6` | `24px` | Espace | `--k-space-1…12` |
| `--space-10` | `40px` | Espace | `--k-space-1…12` |
| `--space-20` | `80px` | Espace | `--k-space-1…12` |
| `--container` | `1146px` | Espace | `--k-container` |
| `--text-column` | `720px` | Typo | hors contrat — typo (candidat `--k-sig-text-column`) |
| `--menu-size` | `80px` | Dimension de composant | hors contrat — dimension de composant |
| `--news-row` | `96px` | Dimension de composant | hors contrat — dimension de composant |
| `--accordion-row` | `110px` | Dimension de composant | hors contrat — dimension de composant |
| `--story-cell-w` | `30px` | Dimension de composant | hors contrat — dimension de composant |
| `--slant` | `36.4deg` | Signature | `--k-cut` (dérivable) |
| `--skew` | `-36.4deg` | Signature | `--k-cut` (dérivable) |
| `--band-skew` | `-25deg` | Signature | `--k-sig-band-skew` |
| `--card-h` | `320px` | Dimension de composant | hors contrat — dimension de composant |
| `--card-gap` | `8px` | Dimension de composant | hors contrat — dimension de composant |
| `--grid-w` | `840px` | Dimension de composant | hors contrat — dimension de composant |
| `--text-w` | `880px` | Typo | hors contrat — typo (candidat `--k-sig-text-w`) |
| `--news-w` | `1052px` | Dimension de composant | hors contrat — dimension de composant |
| `--title-h` | `80px` | Dimension de composant | hors contrat — dimension de composant |
| `--cursor` | `110px` | Dimension de composant | hors contrat — dimension de composant |
| `--btn-w` | `200px` | Dimension de composant | hors contrat — dimension de composant |
| `--border-thin` | `0.8px` | Formes | `--k-border-w` |
| `--border-bold` | `1.6px` | Formes | `--k-border-w` |
| `--bar` | `4px` | Signature | `--k-sig-bar` |
| `--notch` | `10px` | Formes | `--k-cut` (dérivable) |
| `--round` | `44px` | Formes | `--k-sig-round` |
| `--ease` | `ease` | Mouvement | `--k-sig-ease` |
| `--ease-snap` | `cubic-bezier(0.47, 0.53, 0.18, 1)` | Mouvement | `--k-ease-in-out` (dérivable) |
| `--ease-slam` | `cubic-bezier(0.86, 0, 0.07, 1)` | Mouvement | `--k-ease-in-out` (dérivable) |
| `--ease-out-quart` | `cubic-bezier(0.165, 0.84, 0.44, 1)` | Mouvement | `--k-ease-out` |
| `--dur-xs` | `200ms` | Mouvement | `--k-sig-dur-xs` |
| `--dur-fast` | `300ms` | Mouvement | `--k-dur-fast` |
| `--dur-base` | `400ms` | Mouvement | `--k-dur-base` |
| `--dur-slow` | `500ms` | Mouvement | `--k-dur-slow` |
| `--dur-reveal` | `1000ms` | Mouvement | `--k-sig-dur-reveal` |
| `--dur-glitch` | `500ms` | Mouvement | `--k-sig-dur-glitch` |
| `--glitch-every` | `5s` | Mouvement | `--k-sig-glitch-every` |
| `--dur-stroke` | `3s` | Mouvement | `--k-sig-dur-stroke` |
| `--dur-spin` | `10s` | Mouvement | `--k-sig-dur-spin` |
| `--hover-shift` | `15px` | Mouvement | `--k-sig-hover-shift` |

## b. Composants de `examples/demo.html`

| Composant | Nom(s) dans la démo | États présents | États manquants |
|---|---|---|---|
| Chargement de page | `.loading` | repos, chargement | — |
| Menu plein écran | `.menu` | repos, survol, focus, actif | — |
| Barre de navigation | `.menu-btn`, `.rail` | repos, survol, focus, actif | — |
| Héros | `.hero`, `.intro` | repos | — |
| Bouton principal | `.btn` | repos, survol, focus | actif, désactivé, chargement |
| Bouton rond / icône | `.share`, `.to-top`, `.sns` | repos, survol, focus | actif, désactivé |
| Onglets / sélecteur | `.lang` | repos, survol, focus, actif | désactivé |
| Carte | `.card`, `.cards` | repos, survol, focus | chargement, vide |
| Puce / étiquette | `.tag` | repos | actif |
| Champ / formulaire | `.news` | repos, survol, focus | erreur, désactivé, chargement |

Le focus est assuré par une règle globale `:focus-visible` (présente dans les 23 démos) ; il est compté comme présent pour tout composant interactif, mais rarement dessiné composant par composant.

Classes propres au skill (hors composants communs) : `.trailer`, `.credits`, `.cast`, `.glitch`, `.cursor`, `.deco`, `.ghost`, `.mark`, `.shard`, `.onair`, `.burst`, `.mark--load`, `.shards`, `.rail--l`, `.rail--r`, `.title`, `.chara`.

Balises : nav ×1, main ×1, section ×6, footer ×1, button ×9, a ×24, img ×10, ul ×5, svg ×3, h1 ×1, h2 ×5, h3 ×2.

Attributs d'accessibilité : aria-label ×19, aria-hidden ×7, aria-labelledby ×5, aria-pressed ×3, aria-current ×2, role ×2, aria-expanded ×1, aria-controls ×1.

## c. Schémas UX

- **Structure de page** : Page longue : héros en éclats → bande-annonce → actualités (liste) → introduction → équipe et voix → grille de personnages → pied. Pas de page annexe : seule `demo.html`.
- **Navigation** : Bouton menu rond fixe + menu plein écran ; rails latéraux ; sélecteur de langue ; retour en haut.
- **Parcours** : Arrivée spectaculaire (chargement) → vidéo → actualités → découverte des personnages. Aucun formulaire.
- **États** : Chargement de page complet, menu ouvert/fermé, carte survolée (couleur) / au repos (noir et blanc), vignette choisie. Pas de désactivé, d'erreur ni de vide.
- **Formulaire** : aucun formulaire.
- **Mouvement** : 3 animation(s) nommée(s) (widthup, glitch, spin) ; mécanismes : IntersectionObserver, rAF, matchMedia, setInterval, aria-set, keydown-keys, preventDefault, pointer ; `prefers-reduced-motion` pris en compte (2 mention(s)).
- **Points de rupture** : max-width: 768px.

## d. Signature (à ne pas rendre générique)

- Un seul angle (36,4°) pour tous les biais : éclats, parallélogrammes, étiquettes.
- Titres rouges condensés collés au bord gauche, numéros géants.
- Le noir et blanc est un état (non survolé), pas un style.

## e. Défauts repérés (notés, non corrigés)

Relevés à la lecture :

- Aucun `<header>` : la nav est un `<nav>` seul.
- Les 10 images ont un `alt` vide, y compris les personnages (contenu, pas décor).
- Glyphe « ✕ » utilisé comme séparateur dans le texte circulaire.

Relevés automatiquement :

- Valeurs en px écrites en dur dans le CSS de la démo : 168 (pour 295 usages de `var()`), alors que SKILL.md annonce « aucune valeur en dur ».
- Paires de contraste validées seulement au seuil « grand texte » (3:1) : `accent-text:bg`. À vérifier à l'œil qu'elles ne servent jamais à du petit texte.
- Tailles de texte sous 12px : `--text-xs` = 0.6875rem.
- Survols non protégés par `@media (hover: hover)` : effets collants possibles au toucher.
- Pas de lien d'évitement (« aller au contenu »).
- Un seul point de rupture (max-width: 768px) : pas de palier tablette.
- Aucun état désactivé (`:disabled`, `aria-disabled`) dans la démo.
- Aucun état vide (liste sans résultat, panier vide…) dans la démo.
