# Onglets

**Rôle.** Basculer entre des vues de même niveau sans changer de page. Pas pour une navigation entre pages (ce sont alors des liens).

Fichiers : `onglets.css`, `onglets.js`, `Onglets.jsx`.

## Anatomie

```
.k-tabs
├── .k-tabs__list[role="tablist"][aria-label]
│   └── button.k-tabs__tab[role="tab"]      aria-selected, aria-controls ; .k-tabs__count pour un nombre
└── .k-tabs__panel[role="tabpanel"]         aria-labelledby, tabindex="0" ; hidden si inactif
```

## États

| État | Déclencheur | Rendu |
|---|---|---|
| Repos | — | texte `--k-text-2` |
| Survol | `:hover` | texte `--k-text`, fond `--k-surface` |
| Focus clavier | `:focus-visible` | contour `--k-focus`, tracé vers l'intérieur (la liste défile) |
| Actif | `aria-selected="true"` | graisse renforcée **et** filet épais. Le filet prend l'accent seulement si `--k-accent-on-bg` vaut 1, sinon la couleur du texte |
| Désactivé | `disabled` | texte `--k-text-muted` barré ; sauté par les flèches |
| Vide | panneau sans contenu | le panneau affiche un état vide (`../etat-vide/`), jamais un blanc |
| Chargement | panneau en `aria-busy` | squelette (`../chargement/`) |

## Script

- **Quand il s'active** : seul, sur les `.k-tabs` présents au chargement (à `DOMContentLoaded`). Des onglets **créés par script** ne réagissent à rien tant que tu n'as pas appelé `Kobo.tabs.init(conteneur)` après les avoir insérés.
- Choisir un onglet depuis ton script : `Kobo.tabs.select(onglet)`, **après** l'initialisation. Un `onglet.click()` lancé avant est ignoré sans erreur.
- Chaque changement émet `k-tabs:change` sur `.k-tabs` (`detail.tab`, `detail.panel`).

## Clavier

Modèle ARIA « tabs » à activation automatique.

| Touche | Effet |
|---|---|
| `Tab` | entre dans la liste sur l'onglet actif ; un second `Tab` va au panneau |
| `→` / `←` | onglet suivant / précédent, en boucle ; l'onglet est activé aussitôt |
| `Début` / `Fin` | premier / dernier onglet |

Un seul onglet est dans l'ordre de tabulation (`tabindex` tournant).

## Accessibilité

- `role="tablist"` porte un nom (`aria-label`).
- Chaque onglet désigne son panneau (`aria-controls`), chaque panneau son onglet (`aria-labelledby`).
- Le panneau est focalisable (`tabindex="0"`) pour qu'un lecteur d'écran y entre même s'il ne contient aucun lien.
- L'onglet actif n'est jamais signalé par la couleur seule.
- Événement `k-tabs:change` sur `.k-tabs` (`detail.tab`, `detail.panel`).

## Exemple

```html
<div class="k-tabs">
  <div class="k-tabs__list" role="tablist" aria-label="Mes réservations">
    <button type="button" role="tab" class="k-tabs__tab" id="t1" aria-controls="p1" aria-selected="true">À venir <span class="k-tabs__count">2</span></button>
    <button type="button" role="tab" class="k-tabs__tab" id="t2" aria-controls="p2" aria-selected="false">Passées</button>
  </div>
  <div class="k-tabs__panel" role="tabpanel" id="p1" aria-labelledby="t1" tabindex="0">…</div>
  <div class="k-tabs__panel" role="tabpanel" id="p2" aria-labelledby="t2" tabindex="0" hidden>…</div>
</div>
```

```jsx
<Onglets libelle="Mes réservations" onglets={[
  { id: 'avenir', libelle: 'À venir', compte: 2, contenu: <ListeAVenir /> },
  { id: 'passees', libelle: 'Passées', contenu: <ListePassees /> },
  { id: 'factures', libelle: 'Factures', desactive: true, contenu: null },
]} />
```
