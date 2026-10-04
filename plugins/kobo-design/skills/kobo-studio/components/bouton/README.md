# Bouton

**Rôle.** Déclencher une action. Pour aller ailleurs, c'est un lien ; `k-btn` s'applique aussi à un `<a>` quand le lien doit avoir le poids d'un bouton.

Fichiers : `bouton.css`, `Bouton.jsx`. Pas de script : les états se pilotent par attributs.

## Anatomie

```
.k-btn
├── .k-btn__spinner   témoin de chargement (facultatif, aria-hidden)
├── svg.k-icon        icône (facultative, aria-hidden)
└── texte             libellé : un verbe (« Réserver », « Envoyer la demande »)
```

## États

| État | Déclencheur | Rendu |
|---|---|---|
| Repos | — | aplat `--k-accent`, texte `--k-on-accent`, contour `--k-accent-edge` ; casse et approche du libellé : `--k-btn-case`, `--k-btn-tracking` ; jamais sous 12px (`--k-fs-min`) |
| Survol | `:hover` | aplat éclairci vers `--k-on-accent` ; rien ne grossit |
| Focus clavier | `:focus-visible` | contour `--k-focus` de `--k-focus-w`, décalé de `--k-focus-offset` |
| Appui | `:active`, ou `aria-pressed="true"` pour une bascule | aplat plus marqué, ombre retirée |
| Désactivé | `disabled` ou `aria-disabled="true"` | gris lisible (`--k-text-muted` sur `--k-surface-2`), sans transparence |
| Chargement | `aria-busy="true"` | témoin tournant ; le libellé dit ce qui se passe (« Envoi en cours… ») ; le bouton ne réagit plus |

Erreur et vide ne s'appliquent pas à un bouton. `data-k-state="hover|focus|active"` fige un état pour la documentation.

## Variantes

| Classe | Usage |
|---|---|
| (aucune) | action principale : une seule par écran |
| `k-btn--secondary` | action secondaire : contour `--k-line-strong`, fond transparent |
| `k-btn--ghost` | action discrète : texte souligné. Prend l'accent seulement si `--k-accent-on-bg` vaut 1 |
| `k-btn--danger` | action destructrice : toujours avec une icône et un verbe explicite, jamais la couleur seule |
| `k-btn--pill` | rayon `--k-radius-pill` |
| `k-btn--icon` | icône seule, carrée : `aria-label` obligatoire |
| `k-btn--block` | pleine largeur |
| `k-btn--crochets` | variante à la demande d'acid-scan-security. Les couches de signature s'appliquent seules : voir `../signatures/` |

## Clavier

`Tab` atteint le bouton ; `Entrée` et `Espace` l'activent (natif). Un bouton désactivé par `disabled` sort de l'ordre de tabulation ; avec `aria-disabled="true"` il y reste, et c'est au code de bloquer l'action.

## Accessibilité

- Toujours un `<button type="button">` (ou `submit`) : jamais un `<div>` cliquable.
- Le nom accessible vient du texte ; pour une icône seule, de `aria-label`.
- Zone cliquable : au moins `--k-hit-min` de côté, même si `--k-control-h` est plus petit (pseudo-élément `::after`). Laisser au moins `--k-space-2` entre deux petits boutons.
- Accent pâle (`--k-accent-on-bg: 0`) : l'aplat est cerné de `--k-accent-edge` ; la variante discrète prend la couleur du texte.
- `prefers-reduced-motion` : transitions coupées, le témoin de chargement ne tourne plus (pointillé fixe).

## Exemple

```html
<button type="button" class="k-btn">Réserver</button>
<button type="button" class="k-btn k-btn--secondary">Voir le programme</button>
<button type="submit" class="k-btn" aria-busy="true"><span class="k-btn__spinner" aria-hidden="true"></span>Envoi en cours…</button>
<button type="button" class="k-btn k-btn--secondary k-btn--icon" aria-label="Fermer"><svg class="k-icon" aria-hidden="true">…</svg></button>
```

```jsx
<Bouton>Réserver</Bouton>
<Bouton variante="secondary">Voir le programme</Bouton>
<Bouton type="submit" enCours={envoi} libelleEnCours="Envoi en cours…">Envoyer</Bouton>
```
