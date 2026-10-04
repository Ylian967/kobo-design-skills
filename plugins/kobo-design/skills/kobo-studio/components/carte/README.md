# Carte

**Rôle.** Regrouper ce qui décrit un même objet (une sortie, un article, un produit) : image, surtitre, titre, texte, pied.

Fichiers : `carte.css`, `Carte.jsx`. Pas de script.

## Anatomie

```
article.k-card
├── .k-card__media > img      photo (rapport 3:2), alt qui décrit la photo
├── .k-card__body
│   ├── .k-card__meta         surtitre
│   ├── hN.k-card__title      titre ; contient le lien si la carte est cliquable
│   ├── p.k-card__text
│   ├── .k-card__inset        encart de second niveau (--k-surface-2)
│   └── .k-card__flag         mention « Sélectionnée » avec icône
└── .k-card__foot             prix, actions
```

## États

| État | Déclencheur | Rendu |
|---|---|---|
| Repos | — | fond `--k-surface`, bordure `--k-line` |
| Survol | `:hover` sur `k-card--link` | bordure `--k-line-strong`, fond `--k-surface-2`, titre souligné. Rien ne grossit, l'image ne zoome pas |
| Focus clavier | focus sur le lien du titre | contour `--k-focus` autour de **toute** la carte |
| Actif | `:active` | fond `--k-surface-2`, ombre retirée |
| Sélectionnée | `aria-current="true"` | bordure doublée **et** mention écrite avec icône |
| Indisponible | `aria-disabled="true"` | fond `--k-surface-2`, texte `--k-text-muted`, photo en gris ; le bouton du pied est `disabled` |
| Chargement | squelette (voir `../chargement/`) dans la carte, `aria-busy="true"` | les blocs gris tiennent la place du contenu |
| Vide, erreur | — | une carte vide n'existe pas : c'est la liste qui affiche un état vide (`../etat-vide/`) |

## Variantes

| Classe | Usage |
|---|---|
| `k-card--link` | carte entièrement cliquable : le lien du titre est étiré sur la carte |
| `k-card--flat` | sans fond ni ombre |
| `k-card--row` | image à gauche, texte à droite |
| `k-card--biseau`, `k-card--crochets` | variantes de signature : voir `../signatures/` |

## Clavier

Une carte cliquable n'a qu'**un** arrêt de tabulation, le lien du titre ; `Entrée` l'ouvre. Les autres actions du pied restent atteignables séparément.

## Accessibilité

- `<article>` avec un vrai titre (`h2` à `h4` selon le contexte).
- Une seule cible par carte cliquable : pas de lien sur l'image **et** sur le titre.
- `alt` décrit la photo. `alt=""` seulement pour un décor.
- Pas de série de trois cartes icône-titre-texte : une carte porte un contenu réel, pas un argument de vente.

## Exemple

```html
<article class="k-card k-card--link">
  <div class="k-card__media"><img src="bivouac.jpg" alt="Deux tentes sur la neige face à la mer de nuages"></div>
  <div class="k-card__body">
    <span class="k-card__meta">1 nuit · tous niveaux</span>
    <h3 class="k-card__title"><a href="/sorties/bivouac">Bivouac au-dessus des nuages</a></h3>
    <p class="k-card__text">Montée en fin d'après-midi, repas chaud, lever de soleil sur les crêtes.</p>
  </div>
  <div class="k-card__foot"><span>180 € par personne</span><span>6 places</span></div>
</article>
```

```jsx
<Carte titre="Bivouac au-dessus des nuages" href="/sorties/bivouac" meta="1 nuit · tous niveaux"
       image={{ src: 'bivouac.jpg', alt: 'Deux tentes sur la neige face à la mer de nuages' }}
       pied={<><span>180 € par personne</span><span>6 places</span></>}>
  <TexteCarte>Montée en fin d'après-midi, repas chaud, lever de soleil sur les crêtes.</TexteCarte>
</Carte>
```
