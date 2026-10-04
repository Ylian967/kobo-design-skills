# Audit — acid-scan-security

> Relevé en lecture seule. Sources : `references/tokens.css`, `examples/demo.html`, `SKILL.md`.
> Les états des composants sont détectés automatiquement à partir des sélecteurs CSS et des attributs ARIA de la démo, puis relus ; ils n'ont pas été vérifiés sur capture d'écran.

- Variables dans `tokens.css` : **69**
- Démo : 667 lignes, dont 267 de script ; polices chargées : VT323, Inter, JetBrains Mono
- Rôles du contrat : 26 remplis, 7 dérivables, 3 absents (sur 36)

## a. Variables classées par rôle du contrat

### Surfaces

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-bg` | rempli | `--bg` |  |
| `--k-surface` | rempli | `--panel` |  |
| `--k-surface-2` | rempli | `--deep` |  |
| `--k-overlay` | rempli | `--veil`, `--glass`, `--glass-a` |  |

### Texte

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-text` | rempli | `--text` |  |
| `--k-text-2` | rempli | `--text-2` |  |
| `--k-text-muted` | rempli | `--muted`, `--dim` |  |
| `--k-on-accent` | rempli | `--on-signal` |  |

### Accent et états

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-accent` | rempli | `--signal` |  |
| `--k-accent-2` | dérivable | `--hot`, `--label` | vert vif et jaune de surtitre, pas nommés « accent » |
| `--k-success` | absent | — |  |
| `--k-warning` | absent | — |  |
| `--k-danger` | absent | — |  |
| `--k-focus` | dérivable | `--signal` | le contour de focus réutilise --signal |

### Filets

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-line` | rempli | `--line` |  |
| `--k-line-strong` | rempli | `--line-solid` |  |

### Typo

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-font-display` | rempli | `--font-pixel` |  |
| `--k-font-body` | rempli | `--font-sans` |  |
| `--k-font-mono` | rempli | `--font-mono` |  |
| `--k-fs-hero` | rempli | `--fs-hero` |  |
| `--k-fs-h1` | dérivable | `--fs-hero` | pas de taille h1 distincte |
| `--k-fs-h2` | rempli | `--fs-h2` |  |
| `--k-fs-body` | dérivable | `--fs-intro` | le corps de texte s'appelle « intro » |
| `--k-fs-small` | rempli | `--fs-small` |  |

### Formes

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-radius` | rempli | `--radius` | vaut 0 |
| `--k-radius-lg` | dérivable | `--radius` | 0 partout |
| `--k-border-w` | dérivable | `--bracket-w` | 1.5px des crochets ; les filets sont en 1px en dur |
| `--k-cut` | dérivable | — | aucun biseau : 0 |

### Espace

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-space-1…12` | rempli | space-1…12 | échelle 1,2,3,4,6,8,12 + 16,24,32 (au-delà de 12) |
| `--k-edge` | rempli | `--edge` |  |
| `--k-container` | rempli | `--container` |  |

### Mouvement

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-ease-out` | rempli | `--ease-out` |  |
| `--k-ease-in-out` | rempli | `--ease-in-out` |  |
| `--k-dur-fast` | rempli | `--dur-fast` |  |
| `--k-dur-base` | rempli | `--dur-base` |  |
| `--k-dur-slow` | rempli | `--dur-slow` |  |

### Rôles sans équivalent dans ce skill

`--k-success`, `--k-warning`, `--k-danger`

### Toutes les variables de `tokens.css`

| Variable | Valeur | Famille | Rôle du contrat |
|---|---|---|---|
| `--void` | `#000a00` | Couleur | `--k-sig-void` |
| `--bg` | `#021800` | Couleur | `--k-bg` |
| `--deep` | `#0a3e05` | Couleur | `--k-surface-2` |
| `--veil` | `#0d4a03` | Couleur | `--k-overlay` |
| `--mid` | `#189000` | Couleur | `--k-sig-mid` |
| `--hot` | `#2bab00` | Couleur | `--k-accent-2` (dérivable) |
| `--ghost` | `#481800` | Couleur | `--k-sig-ghost` |
| `--text` | `#ecffd0` | Couleur | `--k-text` |
| `--text-2` | `#c6ffa8` | Couleur | `--k-text-2` |
| `--muted` | `#9de373` | Couleur | `--k-text-muted` |
| `--dim` | `#7fbf55` | Couleur | `--k-text-muted` |
| `--label` | `#f2ff2c` | Couleur | `--k-accent-2` (dérivable) |
| `--signal` | `#f5ff4a` | Couleur | `--k-accent` |
| `--on-signal` | `#021800` | Couleur | `--k-on-accent` |
| `--bracket` | `#afff78` | Couleur | `--k-sig-bracket` |
| `--panel` | `#002301` | Couleur | `--k-surface` |
| `--glass` | `#3f6a34` | Couleur | `--k-overlay` |
| `--glass-a` | `rgb(214 255 200 / 0.26)` | Couleur | `--k-overlay` |
| `--line` | `rgb(214 255 190 / 0.22)` | Couleur | `--k-line` |
| `--line-solid` | `#2c5a1c` | Couleur | `--k-line-strong` |
| `--bits-size` | `7px` | Dimension de composant | hors contrat — dimension de composant |
| `--bits-pitch` | `9px` | Signature | `--k-sig-bits-pitch` |
| `--bits-opacity` | `0.1` | Signature | `--k-sig-bits-opacity` |
| `--scanline` | `3px` | Signature | `--k-sig-scanline` |
| `--rgb-shift` | `6px` | Signature | `--k-sig-rgb-shift` |
| `--font-pixel` | `'VT323', 'Jersey 10', ui-monospace, monospace` | Typo | `--k-font-display` |
| `--font-sans` | `'Inter', system-ui, sans-serif` | Typo | `--k-font-body` |
| `--font-mono` | `'JetBrains Mono', ui-monospace, monospace` | Typo | `--k-font-mono` |
| `--fs-hero` | `clamp(3.5rem, min(7.4vw, 13.5vh), 7.25rem)` | Typo | `--k-fs-hero` |
| `--lh-hero` | `1` | Typo | hors contrat — typo (candidat `--k-sig-lh-hero`) |
| `--fs-label` | `clamp(1.5rem, 2.3vw, 2.125rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-label`) |
| `--lh-label` | `0.9` | Typo | hors contrat — typo (candidat `--k-sig-lh-label`) |
| `--fs-h2` | `clamp(2.75rem, 5.2vw, 5rem)` | Typo | `--k-fs-h2` |
| `--fs-stat` | `clamp(3rem, 5.6vw, 5.5rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-stat`) |
| `--fs-intro` | `clamp(1rem, 1.25vw, 1.125rem)` | Typo | `--k-fs-body` (dérivable) |
| `--fs-nav` | `0.75rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-nav`) |
| `--fs-small` | `0.875rem` | Typo | `--k-fs-small` |
| `--fs-mono` | `0.75rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-mono`) |
| `--tracking-nav` | `0.14em` | Typo | hors contrat — typo (candidat `--k-sig-tracking-nav`) |
| `--tracking-pixel` | `0.01em` | Typo | hors contrat — typo (candidat `--k-sig-tracking-pixel`) |
| `--edge` | `clamp(16px, 5.5vw, 80px)` | Espace | `--k-edge` |
| `--nav-h` | `72px` | Dimension de composant | hors contrat — dimension de composant |
| `--eye-y` | `36%` | Signature | `--k-sig-eye-y` |
| `--cta-size` | `186px` | Dimension de composant | hors contrat — dimension de composant |
| `--cta-gap` | `14px` | Dimension de composant | hors contrat — dimension de composant |
| `--bracket-len` | `32px` | Formes | `--k-sig-bracket-len` |
| `--bracket-w` | `1.5px` | Formes | `--k-border-w` (dérivable) |
| `--radius` | `0` | Formes | `--k-radius` |
| `--space-1` | `4px` | Espace | `--k-space-1…12` |
| `--space-2` | `8px` | Espace | `--k-space-1…12` |
| `--space-3` | `12px` | Espace | `--k-space-1…12` |
| `--space-4` | `16px` | Espace | `--k-space-1…12` |
| `--space-6` | `24px` | Espace | `--k-space-1…12` |
| `--space-8` | `32px` | Espace | `--k-space-1…12` |
| `--space-12` | `48px` | Espace | `--k-space-1…12` |
| `--space-16` | `64px` | Espace | `--k-space-1…12` |
| `--space-24` | `96px` | Espace | `--k-space-1…12` |
| `--space-32` | `128px` | Espace | `--k-space-1…12` |
| `--container` | `1320px` | Espace | `--k-container` |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Mouvement | `--k-ease-out` |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Mouvement | `--k-ease-in-out` |
| `--ease-step` | `steps(5, end)` | Mouvement | `--k-sig-ease-step` |
| `--dur-fast` | `120ms` | Mouvement | `--k-dur-fast` |
| `--dur-base` | `260ms` | Mouvement | `--k-dur-base` |
| `--dur-slow` | `700ms` | Mouvement | `--k-dur-slow` |
| `--dur-boot` | `1600ms` | Mouvement | `--k-sig-dur-boot` |
| `--dur-scan` | `1100ms` | Mouvement | `--k-sig-dur-scan` |
| `--dur-decode` | `900ms` | Mouvement | `--k-sig-dur-decode` |
| `--dur-blink` | `1s` | Mouvement | `--k-sig-dur-blink` |

## b. Composants de `examples/demo.html`

| Composant | Nom(s) dans la démo | États présents | États manquants |
|---|---|---|---|
| Chargement de page | `.boot` | repos, chargement | — |
| Barre de navigation | `.nav` | repos, survol, focus | actif |
| Héros | `.hero` | repos, actif | — |
| Bouton principal | `.cta`, `.btn-nav`, `.btn` | repos, survol, focus, chargement | actif, désactivé |
| Carte | `.card`, `.idcard`, `.cards` | repos, survol, focus | chargement, vide |
| Puce / étiquette | `.kicker` | repos | actif |
| Champ / formulaire | `.input`, `.field`, `.hint` | repos, focus, chargement, erreur | désactivé |
| Chiffres clés | `.stat`, `.gauge`, `.stats` | repos, actif | — |
| Indice de défilement | `.scroll-hint` | repos | — |

Le focus est assuré par une règle globale `:focus-visible` (présente dans les 23 démos) ; il est compté comme présent pour tout composant interactif, mais rarement dessiné composant par composant.

Classes propres au skill (hors composants communs) : `.term`, `.target`, `.fig`, `.final`, `.logo`, `.rig`, `.layer`, `.layer--ghost`, `.layer--box`, `.console`, `.layer--base`, `.layer--band`, `.ret-v`, `.ret-h`, `.layers`, `.brackets`, `.bits`, `.scanedge`.

Balises : header ×1, nav ×1, main ×1, section ×5, article ×3, footer ×1, form ×1, input ×1, button ×2, a ×7, img ×8, ul ×1, label ×1, svg ×3, h1 ×1, h2 ×3, h3 ×3.

Attributs d'accessibilité : aria-hidden ×34, aria-label ×8, aria-labelledby ×4, role ×2, aria-live ×2, aria-describedby ×1.

## c. Schémas UX

- **Structure de page** : Page longue à défilement vertical : héros photo plein écran → bandeau de chiffres → 3 cartes « couches » → console de scan (formulaire) → appel final → pied.
- **Navigation** : Barre fixe en haut, liens d'ancre en capitales, bouton d'action à droite. Un seul point de rupture (860px).
- **Parcours** : Découverte → preuve chiffrée → explication en 3 temps → essai (saisir un domaine) → conversion. Un seul formulaire, à un champ.
- **États** : Séquence de démarrage (boot), champ avec erreur écrite et `aria-invalid`, bouton `aria-busy`, résultat annoncé en `aria-live`. Pas d'état vide ni désactivé.
- **Formulaire** : validation + erreur + chargement.
- **Mouvement** : 3 animation(s) nommée(s) (spin, blink, sweep) ; mécanismes : IntersectionObserver, rAF, matchMedia, setInterval, aria-set, focus(), preventDefault, pointer ; `prefers-reduced-motion` pris en compte (2 mention(s)).
- **Points de rupture** : max-width: 860px.

## d. Signature (à ne pas rendre générique)

- Le scan du regard : photo en rampe verte + réticule sur l'œil + bande claire + cadre jaune à moitié rempli.
- Une seule rampe de couleur (noir-vert → citron) et un seul jaune de détection.
- Police pixel pour les titres, crochets d'angle en L, tout carré (rayon 0).

## e. Défauts repérés (notés, non corrigés)

Relevés à la lecture :

- Chiffre « 99,98 % » affiché sans source.
- 4 images sur 8 avec `alt` vide : à vérifier (les couches de la photo du héros sont décoratives, mais pas forcément toutes).

Relevés automatiquement :

- Valeurs en px écrites en dur dans le CSS de la démo : 101 (pour 319 usages de `var()`), alors que SKILL.md annonce « aucune valeur en dur ».
- Paires de contraste validées seulement au seuil « grand texte » (3:1) : `text:mid`, `label:mid`. À vérifier à l'œil qu'elles ne servent jamais à du petit texte.
- Survols non protégés par `@media (hover: hover)` : effets collants possibles au toucher.
- Pas de lien d'évitement (« aller au contenu »).
- Un seul point de rupture (max-width: 860px) : pas de palier tablette.
- Aucun état désactivé (`:disabled`, `aria-disabled`) dans la démo.
- Aucun état vide (liste sans résultat, panier vide…) dans la démo.
