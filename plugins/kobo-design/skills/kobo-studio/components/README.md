# Composants kobo-studio

Vingt composants de base (deux lots de dix), neutres : ils ne lisent que les rôles `--k-*` du contrat (`../contract/`) et prennent donc l'apparence du skill dont la fiche est chargée. Aucune couleur, taille, rayon ni durée écrite en dur.

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
| `selection/` | Liste déroulante native (dépend de `champ`) | `k-select` | — | `Selection.jsx` |
| `case-a-cocher/` | Case à cocher et groupe de cases | `k-check`, `k-check-group` | `case-a-cocher.js` (partielle, tout cocher) | `CaseACocher.jsx` |
| `bouton-radio/` | Groupe de boutons radio | `k-radio`, `k-radio-group` | — | `BoutonRadio.jsx` |
| `interrupteur/` | Réglage appliqué tout de suite | `k-switch` | `interrupteur.js` | `Interrupteur.jsx` |
| `tableau/` | Tableau de données : tri, lignes sélectionnées, état vide | `k-table` | `tableau.js` | `Tableau.jsx` |
| `accordeon/` | Panneaux repliables | `k-accordion` | `accordeon.js` | `Accordeon.jsx` |
| `pagination/` | Pages d'une liste | `k-pagination` | `pagination.js` (version pilotée) | `Pagination.jsx` |
| `fil-ariane/` | Fil d'Ariane | `k-crumbs` | `fil-ariane.js` (repli) | `FilAriane.jsx` |
| `info-bulle/` | Précision au survol et au focus | `k-tooltip` | `info-bulle.js` | `InfoBulle.jsx` |
| `menu-deroulant/` | Menu d'actions ou de choix | `k-dropdown` | `menu-deroulant.js` | `MenuDeroulant.jsx` |
| `signatures/` | Couches de signature : une par skill (24 sur 24) | mêmes classes | — | rien à ajouter |
| `motion/` | Couche mouvement : les mouvements signature d'un skill (6 sur 24), et leur moteur | mêmes classes, `data-k-reveal` | `motion.js`, `<skill>.js` | `Mouvement.jsx` (`useMouvement`) |

Chaque dossier a son `README.md` : rôle, anatomie, états, clavier, accessibilité, variantes, exemple.

## Charger

```html
<link rel="stylesheet" href="contract/maps/<id-du-skill>.css">   <!-- importe roles.css, les polices et les tokens du skill -->
<link rel="stylesheet" href="components/socle.css">
<link rel="stylesheet" href="components/bouton/bouton.css">       <!-- un fichier par composant utilisé -->
<link rel="stylesheet" href="components/signatures/<id-du-skill>.css">   <!-- en dernier : la couche de signature du skill, si elle existe -->
<script src="components/modale/modale.js"></script>                <!-- scripts classiques : fonctionnent en file:// -->
```

Les scripts s'accrochent à `window.Kobo` (`Kobo.field`, `Kobo.nav`, `Kobo.menu`, `Kobo.modal`, `Kobo.tabs`, `Kobo.toast`, `Kobo.progress`, `Kobo.check`, `Kobo.switch`, `Kobo.table`, `Kobo.accordion`, `Kobo.pagination`, `Kobo.crumbs`, `Kobo.tooltip`, `Kobo.dropdown`) et s'activent seuls sur le balisage présent au chargement. Les versions React n'utilisent pas ces scripts : elles portent le même comportement.

`socle.css` fournit : `k-sr-only`, `k-icon`, le ton inversé (`data-k-tone="inverse"` sur un bloc : les composants qu'il contient lisent la paire inversée du skill) et le blocage du défilement sous une modale.

## Règles communes

- **Rôles seulement.** Variables locales `--_x` admises ; `--k-sig-*` réservé à `signatures/`.
- **États.** Repos, survol, focus clavier, appui, désactivé, chargement, erreur, vide : chaque README dit lesquels s'appliquent. `data-k-state="hover|focus|active"` fige un état pour la documentation.
- **Zone cliquable** d'au moins `--k-hit-min`, même si `--k-control-h` est plus petit.
- **Accent pâle** (`--k-accent-on-bg: 0`) : l'accent ne porte jamais seul une information ; les composants passent au texte ou au contour `--k-accent-edge`.
- **Un état n'est jamais signalé par la couleur seule** : toujours une icône et un texte.
- **Rien ne grossit au survol**, aucune ombre hors `--k-shadow`, aucun dégradé, aucun flou.
- **`prefers-reduced-motion`** respecté partout.
- **Intensité** : `data-k-intensity="full|reduced|off"` sur un parent ; elle n'agit que sur la couche de signature (formes et mouvements en full, formes seules en reduced, rien en off).
- **Lisibilité** : tout texte fait au moins `--k-fs-min` (12px), surtitre de carte compris (il porte une information : durée, niveau, catégorie).
- **Casse et photos** : les libellés d'action suivent `--k-btn-case` et `--k-btn-tracking`, les surtitres `--k-label-case`, les photos `--k-img-filter`.

## Vérifier

```bash
python3 tools/check_components.py     # valeurs en dur, README, focus, React, motifs anti-slop ; couvre aussi ../ux/
python3 tools/check_contract.py       # fiches du contrat
```

Puis ouvrir `gallery.html` (directement depuis le disque) : tous les composants, tous leurs états, sous les 24 skills et les trois intensités, avec des déclencheurs qui fonctionnent. Adresse : `gallery.html#<id>` ou `#<id>:off`.

## Limites connues

- Les versions React sont compilées et rendues côté serveur sans erreur, mais n'ont pas été essayées dans un navigateur.
- Testé dans Chrome seulement. `<dialog>`, `:has()`, `color-mix()` et `clip-path: polygon(evenodd, …)` demandent un navigateur récent.
- Dix skills ne se reconnaissent qu'« en partie » : leur identité tient à un gabarit de mise en page (héros, cadre, scène) qui reste à écrire (voir `../quality/relecture-etape-3bis.md`).
- `--k-img-filter` n'est qu'un filtre CSS : la rampe en canvas d'acid-scan, le grain de pixel-lime ou de noir-inferno ne sont pas reproduits (la fiche le note).
- Les couches utilisent l'imbrication CSS (`&`) : navigateur récent requis.
