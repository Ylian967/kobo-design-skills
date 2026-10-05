# Fil d'Ariane

**Rôle.** Dire où est la page dans le site et permettre de remonter d'un niveau. À partir de deux niveaux sous l'accueil ; inutile sur une landing.

Fichiers : `fil-ariane.css`, `fil-ariane.js` (repli, facultatif), `FilAriane.jsx`. Les structures de page le chargent quand elles en ont un (site vitrine, page intérieure).

## Anatomie

```
nav.k-crumbs[aria-label="Fil d'Ariane"]
└── ol
    ├── li > a                       un niveau (lien)
    ├── li > button.k-crumbs__more   « … » : niveaux du milieu repliés (posé par le script)
    └── li > span[aria-current="page"]   la page courante : pas un lien
```

## États

| État | Déclencheur | Rendu |
|---|---|---|
| Repos | — | liens soulignés, séparés par « / » (décor, non lu) |
| Survol | `:hover` | soulignement épaissi ; rien ne grossit |
| Focus clavier | `:focus-visible` | contour `--k-focus` |
| Page courante | `aria-current="page"` | graisse renforcée, pas de soulignement, pas de lien |
| Replié | `data-k-collapse` et plus de quatre niveaux | premier niveau, « … », deux derniers ; le bouton rend tout le chemin et donne le focus au premier niveau rendu |

Désactivé, erreur, chargement et vide ne s'appliquent pas : un fil d'Ariane sans chemin ne s'affiche pas.

## Clavier

`Tab` passe de lien en lien ; `Entrée` suit le lien ; `Entrée` ou `Espace` sur « … » déplie.

## Accessibilité

- Une `<nav>` nommée (`aria-label`), une liste **ordonnée** : le lecteur d'écran annonce le nombre de niveaux et leur ordre.
- La page courante est écrite, marquée `aria-current="page"`, et n'est pas un lien vers elle-même.
- Zone cliquable de chaque lien : au moins `--k-hit-min` de haut.
- Sur écran étroit le chemin passe à la ligne ; rien n'est tronqué ni masqué sans bouton pour le rendre.

## Exemple

```html
<nav class="k-crumbs" aria-label="Fil d'Ariane" data-k-collapse>
  <ol>
    <li><a href="/">Accueil</a></li>
    <li><a href="/sorties">Sorties</a></li>
    <li><span aria-current="page">Préparer sa sortie</span></li>
  </ol>
</nav>
```

```jsx
<FilAriane chemin={[{ libelle: 'Accueil', href: '/' }, { libelle: 'Sorties', href: '/sorties' }, { libelle: 'Préparer sa sortie' }]} replier />
```
