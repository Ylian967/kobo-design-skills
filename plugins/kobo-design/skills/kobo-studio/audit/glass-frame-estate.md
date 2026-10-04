# Audit — glass-frame-estate

> Relevé en lecture seule. Sources : `references/tokens.css`, `examples/demo.html`, `SKILL.md`.
> Les états des composants sont détectés automatiquement à partir des sélecteurs CSS et des attributs ARIA de la démo, puis relus ; ils n'ont pas été vérifiés sur capture d'écran.

- Variables dans `tokens.css` : **69**
- Démo : 725 lignes, dont 62 de script ; polices chargées : Geist Mono, Inter
- Rôles du contrat : 22 remplis, 8 dérivables, 6 absents (sur 36)

## a. Variables classées par rôle du contrat

### Surfaces

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-bg` | rempli | `--white` |  |
| `--k-surface` | rempli | `--surface` |  |
| `--k-surface-2` | rempli | `--surface-2` |  |
| `--k-overlay` | rempli | `--veil`, `--shade-1`, `--glass-solid` |  |

### Texte

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-text` | rempli | `--ink` |  |
| `--k-text-2` | absent | — |  |
| `--k-text-muted` | rempli | `--muted` |  |
| `--k-on-accent` | dérivable | `--white` | texte sur bouton noir |

### Accent et états

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-accent` | dérivable | `--ink` | règle du skill : aucune couleur d'accent |
| `--k-accent-2` | absent | — |  |
| `--k-success` | absent | — |  |
| `--k-warning` | absent | — |  |
| `--k-danger` | absent | — |  |
| `--k-focus` | dérivable | `currentColor` |  |

### Filets

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-line` | rempli | `--rule`, `--rule-dark` |  |
| `--k-line-strong` | dérivable | `--tick` |  |

### Typo

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-font-display` | dérivable | `--font` | une seule famille |
| `--k-font-body` | rempli | `--font` |  |
| `--k-font-mono` | rempli | `--font-mono` |  |
| `--k-fs-hero` | rempli | `--fs-hero` |  |
| `--k-fs-h1` | rempli | `--fs-page` |  |
| `--k-fs-h2` | rempli | `--fs-h2` |  |
| `--k-fs-body` | rempli | `--fs-body` |  |
| `--k-fs-small` | rempli | `--fs-label-s` |  |

### Formes

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-radius` | rempli | `--r-btn`, `--r-inner` |  |
| `--k-radius-lg` | rempli | `--r-card`, `--r-frame` |  |
| `--k-border-w` | absent | — |  |
| `--k-cut` | dérivable | — | 0 |

### Espace

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-space-1…12` | dérivable | `--gap`, `--gap-row`, `--gap-head`, `--pad-card`, `--pad-panel` | espacements nommés, pas d'échelle |
| `--k-edge` | rempli | `--gutter` |  |
| `--k-container` | rempli | `--container` |  |

### Mouvement

| Rôle `--k-*` | État | Variable(s) du skill | Remarque |
|---|---|---|---|
| `--k-ease-out` | dérivable | `--ease-spring` |  |
| `--k-ease-in-out` | rempli | `--ease-color` |  |
| `--k-dur-fast` | rempli | `--dur-ui` |  |
| `--k-dur-base` | rempli | `--dur-color` |  |
| `--k-dur-slow` | rempli | `--dur-rise` |  |

### Rôles sans équivalent dans ce skill

`--k-text-2`, `--k-accent-2`, `--k-success`, `--k-warning`, `--k-danger`, `--k-border-w`

### Toutes les variables de `tokens.css`

| Variable | Valeur | Famille | Rôle du contrat |
|---|---|---|---|
| `--white` | `#ffffff` | Couleur | `--k-bg` |
| `--ink` | `#000000` | Couleur | `--k-text` |
| `--surface` | `#f2f2f2` | Couleur | `--k-surface` |
| `--surface-2` | `#fafafa` | Couleur | `--k-surface-2` |
| `--muted` | `#555555` | Couleur | `--k-text-muted` |
| `--soft` | `#cccccc` | Couleur | `--k-sig-soft` |
| `--tick` | `rgb(17 17 17 / 0.3)` | Couleur | `--k-line-strong` (dérivable) |
| `--rule-dark` | `rgb(255 255 255 / 0.16)` | Couleur | `--k-line` |
| `--rule` | `rgb(0 0 0 / 0.1)` | Couleur | `--k-line` |
| `--veil` | `rgb(23 23 23 / 0.2)` | Couleur | `--k-overlay` |
| `--shade` | `#2b2d27` | Couleur | `--k-sig-shade` |
| `--shade-0` | `rgb(0 0 0 / 0)` | Couleur | `--k-sig-shade-0` |
| `--shade-1` | `rgb(0 0 0 / 0.62)` | Couleur | `--k-overlay` |
| `--glass` | `rgb(0 0 0 / 0.05)` | Couleur | `--k-sig-glass` |
| `--glass-edge` | `rgb(255 255 255 / 0.5)` | Couleur | `--k-sig-glass-edge` |
| `--glass-solid` | `rgb(43 45 39 / 0.72)` | Couleur | `--k-overlay` |
| `--frame-line` | `rgb(255 255 255 / 0.9)` | Couleur | `--k-sig-frame-line` |
| `--word-from` | `rgb(255 255 255 / 0.62)` | Couleur | `--k-sig-word-from` |
| `--word-to` | `rgb(255 255 255 / 0)` | Couleur | `--k-sig-word-to` |
| `--word-dark` | `rgb(255 255 255 / 0.34)` | Couleur | `--k-sig-word-dark` |
| `--font` | `'Inter', system-ui, sans-serif` | Typo | `--k-font-display` (dérivable) |
| `--font-mono` | `'Geist Mono', ui-monospace, monospace` | Typo | `--k-font-mono` |
| `--w-text` | `400` | Typo | hors contrat — typo (candidat `--k-sig-w-text`) |
| `--w-title` | `500` | Typo | hors contrat — typo (candidat `--k-sig-w-title`) |
| `--w-word` | `600` | Typo | hors contrat — typo (candidat `--k-sig-w-word`) |
| `--fs-word` | `clamp(5.25rem, 19.4vw, 17.5rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-word`) |
| `--fs-hero` | `clamp(2.5rem, 5.56vw, 5rem)` | Typo | `--k-fs-hero` |
| `--fs-page` | `clamp(3rem, 7vw, 6.25rem)` | Typo | `--k-fs-h1` |
| `--fs-h2` | `clamp(2rem, 3.34vw, 3rem)` | Typo | `--k-fs-h2` |
| `--fs-h3` | `clamp(1.375rem, 2.2vw, 2rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-h3`) |
| `--fs-h4` | `1.5rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-h4`) |
| `--fs-h5` | `clamp(1rem, 1.4vw, 1.25rem)` | Typo | hors contrat — typo (candidat `--k-sig-fs-h5`) |
| `--fs-body` | `1rem` | Typo | `--k-fs-body` |
| `--fs-label` | `1rem` | Typo | hors contrat — typo (candidat `--k-sig-fs-label`) |
| `--fs-label-s` | `0.875rem` | Typo | `--k-fs-small` |
| `--lh-title` | `1.1` | Typo | hors contrat — typo (candidat `--k-sig-lh-title`) |
| `--lh-body` | `1.6` | Typo | hors contrat — typo (candidat `--k-sig-lh-body`) |
| `--ls-title` | `-0.02em` | Typo | hors contrat — typo (candidat `--k-sig-ls-title`) |
| `--ls-word` | `-0.04em` | Typo | hors contrat — typo (candidat `--k-sig-ls-word`) |
| `--container` | `1200px` | Espace | `--k-container` |
| `--gutter` | `clamp(20px, 2.1vw, 30px)` | Espace | `--k-edge` |
| `--section-y` | `clamp(60px, 9.7vw, 140px)` | Espace | hors contrat — espace nommé |
| `--gap` | `10px` | Espace | `--k-space-1…12` (dérivable) |
| `--gap-row` | `30px` | Espace | `--k-space-1…12` (dérivable) |
| `--gap-head` | `80px` | Espace | `--k-space-1…12` (dérivable) |
| `--pad-card` | `10px` | Espace | `--k-space-1…12` (dérivable) |
| `--pad-panel` | `30px` | Espace | `--k-space-1…12` (dérivable) |
| `--btn-h` | `50px` | Dimension de composant | hors contrat — dimension de composant |
| `--tag-h` | `34px` | Dimension de composant | hors contrat — dimension de composant |
| `--chip-h` | `32px` | Dimension de composant | hors contrat — dimension de composant |
| `--step-h` | `380px` | Dimension de composant | hors contrat — dimension de composant |
| `--step-top` | `40px` | Dimension de composant | hors contrat — dimension de composant |
| `--frame-inset` | `clamp(8px, 1.4vw, 20px)` | Dimension de composant | hors contrat — dimension de composant |
| `--r-frame` | `10px` | Formes | `--k-radius-lg` |
| `--r-card` | `10px` | Formes | `--k-radius-lg` |
| `--r-inner` | `6px` | Formes | `--k-radius` |
| `--r-btn` | `4px` | Formes | `--k-radius` |
| `--blur-glass` | `2px` | Formes | `--k-sig-blur-glass` |
| `--blur-menu` | `5px` | Formes | `--k-sig-blur-menu` |
| `--blur-back` | `28px` | Formes | `--k-sig-blur-back` |
| `--ease-color` | `cubic-bezier(0.44, 0, 0.56, 1)` | Mouvement | `--k-ease-in-out` |
| `--ease-spring` | `linear(0, 0.219, 0.449, 0.614, 0.729, 0.811, 0.868, 0.908, 0.937, 0.957, 0.971, 0.981, 0.988, 0.992, 0.996, 0.998, 1)` | Mouvement | `--k-ease-out` (dérivable) |
| `--dur-color` | `400ms` | Mouvement | `--k-dur-base` |
| `--dur-ui` | `300ms` | Mouvement | `--k-dur-fast` |
| `--dur-menu` | `500ms` | Mouvement | `--k-sig-dur-menu` |
| `--dur-rise` | `1100ms` | Mouvement | `--k-dur-slow` |
| `--rise` | `80px` | Mouvement | `--k-sig-rise` |
| `--flip-y` | `288px` | Mouvement | `--k-sig-flip-y` |
| `--dur-odo` | `1400ms` | Mouvement | `--k-sig-dur-odo` |

## b. Composants de `examples/demo.html`

| Composant | Nom(s) dans la démo | États présents | États manquants |
|---|---|---|---|
| Menu plein écran | `.menu-open`, `.menu`, `.menu-close` | repos, survol, focus | actif |
| Barre de navigation | `.top`, `.menu-btn` | repos, survol, focus | actif |
| Héros | `.hero-body`, `.intro`, `.hero`, `.hero-back` | repos | — |
| Bouton principal | `.btn`, `.cta`, `.more` | repos, survol, focus | actif, désactivé, chargement |
| Onglets / sélecteur | `.chips` | repos, focus | survol, actif, désactivé |
| Carte | `.svc`, `.cell`, `.agent-card`, `.post`, `.listing`, `.hood`, `.agent`, `.posts`, `.listings`, `.cells` | repos, survol, focus | chargement, vide |
| Puce / étiquette | `.label`, `.tag`, `.eyebrow`, `.tags`, `.chip` | repos | actif |
| Carrousel / pagination | `.deck`, `.dots` | repos, focus | survol, actif, désactivé |
| Accordéon / étapes | `.q`, `.step`, `.steps`, `.faq`, `.qa` | repos, focus, actif | survol |
| Champ / formulaire | `.field`, `.contact`, `.form` | repos, focus | erreur, désactivé, chargement |
| Panneau / modale | `.about` | repos, focus | actif |
| Chiffres clés | `.odo`, `.stats`, `.stat` | repos | — |
| Citation / avis | `.say` | repos | — |
| Pied de page | `.foot`, `.foot-top`, `.legal` | repos, survol, focus | — |

Le focus est assuré par une règle globale `:focus-visible` (présente dans les 23 démos) ; il est compté comme présent pour tout composant interactif, mais rarement dessiné composant par composant.

Classes propres au skill (hors composants communs) : `.film`, `.step-txt`, `.who`, `.mini`, `.shot`, `.svc-head`, `.steps-pin`, `.frame`, `.logo`, `.clock`, `.hoods`, `.mosaic`, `.agents`, `.meta`, `.word`, `.about-foot`, `.ruler`, `.center-row`, `.post-txt`, `.faq-left`, `.city`.

Balises : header ×1, nav ×1, main ×1, section ×12, article ×7, footer ×1, form ×1, input ×3, select ×1, textarea ×1, button ×9, a ×63, img ×48, ul ×17, label ×5, svg ×40, h1 ×1, h2 ×11, h3 ×24.

Attributs d'accessibilité : aria-hidden ×46, aria-expanded ×7, aria-label ×4, aria-controls ×1, role ×1, aria-modal ×1.

## c. Schémas UX

- **Structure de page** : Page très longue (12 sections) : héros encadré → à propos → annonces 2×2 → services (bloc noir) → quartiers → chiffres → étapes épinglées → avis → conseillers → contact → journal → FAQ → appel final → pied.
- **Navigation** : Petite barre en capitales (heure, ville, MENU) + menu plein écran (`aria-modal`, `inert`). Deux points de rupture.
- **Parcours** : Vitrine → annonces → services → preuve (chiffres, avis) → contact. Formulaire long (5 champs).
- **États** : Menu ouvert, FAQ `aria-expanded`, cartes au survol. Le formulaire fait `onsubmit="return false"` : aucun retour, ni erreur, ni succès.
- **Formulaire** : onsubmit="return false" (aucun retour).
- **Mouvement** : 1 animation(s) nommée(s) (rise) ; mécanismes : IntersectionObserver, rAF, matchMedia, setInterval, aria-set, keydown-keys, focus(), inert ; `prefers-reduced-motion` pris en compte (2 mention(s)).
- **Points de rupture** : max-width: 1199px, max-width: 809px.

## d. Signature (à ne pas rendre générique)

- Le mot-marque géant qui passe derrière le bâtiment, dans un cadre d'un pixel.
- Aucune couleur d'interface : noir, blanc, gris.
- Surtitres « // », règle graduée, carte d'étape noire qui se déplie.

## e. Défauts repérés (notés, non corrigés)

Relevés à la lecture :

- 45 liens `href="#"`.
- Formulaire de contact factice (`return false`), 3 champs `required` sans message d'erreur stylé.
- 6 avis clients inventés avec noms.
- Bande de chiffres et de logos non sourcés.
- 23 images sur 48 avec `alt` vide (dont des photos de biens).
- 9 boutons sans attribut `type`.
- 210 valeurs en px écrites en dur dans le CSS de la démo.

Relevés automatiquement :

- Valeurs en px écrites en dur dans le CSS de la démo : 210 (pour 249 usages de `var()`), alors que SKILL.md annonce « aucune valeur en dur ».
- Aucune échelle d'espacement (`--space-*`) dans les tokens : les marges et écarts sont des valeurs px en dur.
- Pas de lien d'évitement (« aller au contenu »).
- 45 lien(s) `href="#"` (ne mènent nulle part).
- 9 bouton(s) sans attribut `type`.
- Formulaire : onsubmit="return false" (aucun retour).
- Aucun état désactivé (`:disabled`, `aria-disabled`) dans la démo.
- Aucun état vide (liste sans résultat, panier vide…) dans la démo.
