# Composants kobo-studio — premier lot

Dix composants de base, neutres : ils ne lisent que les rôles `--k-*` du contrat (`../contract/`) et prennent donc l'apparence du skill dont la fiche est chargée. Aucune couleur, taille, rayon ni durée écrite en dur.

| Dossier | Composant | Classe | Script | React |
|---|---|---|---|---|
| `bouton/` | Bouton | `k-btn` | — | `Bouton.jsx` |
| `champ/` | Champ texte et zone de texte | `k-field` | `champ.js` | `Champ.jsx` |
| `carte/` | Carte | `k-card` | — | `Carte.jsx` |
| `barre-nav/` | Barre de navigation | `k-nav` | `barre-nav.js` | `BarreNav.jsx` |
| `menu-mobile/` | Menu mobile plein écran | `k-menu` | `menu-mobile.js` | `MenuMobile.jsx` |
| `modale/` | Modale et confirmation | `k-modal` | `modale.js` | `Modale.jsx` |
| `onglets/` | Onglets | `k-tabs` | `onglets.js` | `Onglets.jsx` |
| `notification/` | Notification (toast) | `k-toast` | `notification.js` | `Notification.jsx` |
| `etat-vide/` | État vide | `k-empty` | — | `EtatVide.jsx` |
| `chargement/` | Squelette et barre de progression | `k-skeleton`, `k-progress` | `chargement.js` | `Chargement.jsx` |
| `signatures/` | Variantes de signature (biseau, crochets) | `k-btn--biseau`… | — | prop `signature` |

Chaque dossier a son `README.md` : rôle, anatomie, états, clavier, accessibilité, variantes, exemple.

## Charger

```html
<link rel="stylesheet" href="contract/maps/<id-du-skill>.css">   <!-- importe roles.css, les polices et les tokens du skill -->
<link rel="stylesheet" href="components/socle.css">
<link rel="stylesheet" href="components/bouton/bouton.css">       <!-- un fichier par composant utilisé -->
<link rel="stylesheet" href="components/signatures/<id-du-skill>.css">   <!-- facultatif : variantes de signature -->
<script src="components/modale/modale.js"></script>                <!-- scripts classiques : fonctionnent en file:// -->
```

Les scripts s'accrochent à `window.Kobo` (`Kobo.field`, `Kobo.nav`, `Kobo.menu`, `Kobo.modal`, `Kobo.tabs`, `Kobo.toast`, `Kobo.progress`) et s'activent seuls sur le balisage présent au chargement. Les versions React n'utilisent pas ces scripts : elles portent le même comportement.

`socle.css` fournit : `k-sr-only`, `k-icon`, le ton inversé (`data-k-tone="inverse"` sur un bloc : les composants qu'il contient lisent la paire inversée du skill) et le blocage du défilement sous une modale.

## Règles communes

- **Rôles seulement.** Variables locales `--_x` admises ; `--k-sig-*` réservé à `signatures/`.
- **États.** Repos, survol, focus clavier, appui, désactivé, chargement, erreur, vide : chaque README dit lesquels s'appliquent. `data-k-state="hover|focus|active"` fige un état pour la documentation.
- **Zone cliquable** d'au moins `--k-hit-min`, même si `--k-control-h` est plus petit.
- **Accent pâle** (`--k-accent-on-bg: 0`) : l'accent ne porte jamais seul une information ; les composants passent au texte ou au contour `--k-accent-edge`.
- **Un état n'est jamais signalé par la couleur seule** : toujours une icône et un texte.
- **Rien ne grossit au survol**, aucune ombre hors `--k-shadow`, aucun dégradé, aucun flou.
- **`prefers-reduced-motion`** respecté partout.
- **Intensité** : `data-k-intensity="full|reduced|off"` sur un parent ; elle n'agit que sur les variantes de signature.

## Vérifier

```bash
python3 tools/check_components.py     # valeurs en dur, README, focus, React, motifs anti-slop
python3 tools/check_contract.py       # fiches du contrat
```

Puis ouvrir `gallery.html` (directement depuis le disque) : tous les composants, tous leurs états, sous les 23 skills et les trois intensités, avec des déclencheurs qui fonctionnent. Adresse : `gallery.html#<id>` ou `#<id>:off`.

## Limites connues

- Les versions React sont compilées et rendues côté serveur sans erreur, mais n'ont pas été essayées dans un navigateur.
- Testé dans Chrome seulement. `<dialog>`, `:has()`, `color-mix()` et `clip-path: polygon(evenodd, …)` demandent un navigateur récent.
- Les durées d'affichage d'une notification (6 s, 200 ms de sortie) sont dans le script : ce ne sont pas des rôles du contrat.
- Le libellé des boutons garde la casse du texte : le contrat n'a pas de rôle pour dire qu'un skill écrit ses boutons en capitales.
- Les photos ne reçoivent pas le traitement d'image du skill (duotone, noir et blanc, grain) : ce sera un composant de signature.
