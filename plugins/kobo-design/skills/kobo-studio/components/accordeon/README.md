# Accordéon

**Rôle.** Replier des réponses qu'on ne lit pas toutes : questions fréquentes, conditions, détails d'une étape. Pas pour cacher un contenu que tout le monde doit lire, ni pour raccourcir une page.

Fichiers : `accordeon.css`, `accordeon.js`, `Accordeon.jsx`.

## Anatomie

```
div.k-accordion[data-k-single]
└── div.k-accordion__item
    ├── h3.k-accordion__head                  le niveau de titre suit le plan de la page
    │   └── button.k-accordion__trigger[aria-expanded][aria-controls]
    │       └── span.k-accordion__mark[aria-hidden]   plus / moins
    └── div.k-accordion__panel[role=region][aria-labelledby][hidden]
```

## États

| État | Déclencheur | Rendu |
|---|---|---|
| Fermé | `aria-expanded="false"` | intitulé et signe plus |
| Survol | `:hover` | fond `--k-surface` sur toute la ligne |
| Focus clavier | `:focus-visible` | contour `--k-focus`, tracé vers l'intérieur |
| Ouvert | `aria-expanded="true"` | signe moins **et** intitulé en gras ; le panneau apparaît sans animation de hauteur |
| Désactivé | `disabled` | intitulé `--k-text-muted`, pas de survol |
| Sans script | — | livrer les panneaux **sans** `hidden` : tout se lit ; le script les referme au chargement |

Erreur, chargement et vide ne s'appliquent pas : un accordéon sans élément ne s'affiche pas. Variantes : `data-k-single` (un seul ouvert), `k-accordion--titles` (intitulés dans la police de titre du skill).

## Clavier

`Tab` passe d'un intitulé à l'autre et dans le panneau ouvert ; `Entrée` ou `Espace` ouvre et ferme ; `↓` `↑` vont à l'intitulé suivant et précédent ; `Début` et `Fin` au premier et au dernier.

## Accessibilité

- L'intitulé est un vrai bouton (`button type="button"`) dans un vrai titre : il figure dans le plan de la page.
- `aria-expanded` dit l'état ; `aria-controls` relie le panneau ; le panneau est une `region` nommée par son intitulé (au-delà de six panneaux, retirer `role="region"` pour ne pas saturer les repères).
- Un panneau fermé est `hidden` : ni lu ni atteint au clavier. La recherche du navigateur ne le trouve pas : ne pas y mettre l'information principale.
- Zone cliquable : toute la ligne, au moins `--k-hit-min` de haut.
- `prefers-reduced-motion` : le signe change sans tourner.

## Exemple

```html
<div class="k-accordion" data-k-single>
  <div class="k-accordion__item">
    <h3 class="k-accordion__head"><button type="button" class="k-accordion__trigger" id="q1" aria-controls="r1" aria-expanded="false">Et si la météo est mauvaise ?<span class="k-accordion__mark" aria-hidden="true"></span></button></h3>
    <div class="k-accordion__panel" id="r1" role="region" aria-labelledby="q1"><p>Le guide décide la veille à 18 h. La sortie est reportée, ou remboursée si aucune date ne vous convient.</p></div>
  </div>
</div>
```

```jsx
<Accordeon unSeul elements={[{ id: 'meteo', titre: 'Et si la météo est mauvaise ?', contenu: <p>Le guide décide la veille à 18 h.</p> }]} />
```
