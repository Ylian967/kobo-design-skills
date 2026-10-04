# Site vitrine

Deux pages types pour un site à plusieurs pages : un **accueil** qui oriente, une **page intérieure** qui renseigne.

## Quand la choisir

- Une maison, un lieu, une équipe qui propose **plusieurs** choses et a besoin de pages d'information autour.
- La personne vient pour s'orienter ou pour une question précise (horaires, tarifs, conditions).

Ne pas la choisir pour une offre unique (→ landing produit).

## Fichiers

| Fichier | Rôle |
|---|---|
| `accueil.html` | Page d'accueil, remplie d'un exemple fictif |
| `page-interieure.html` | Page intérieure type |
| `site-vitrine.css` | En-tête de liste, grille à deux colonnes, encart |
| `site-vitrine.js` | La recherche de l'accueil |
| `SiteVitrine.jsx` | Version React : `Accueil` et `PageInterieure` |

Composants utilisés : bouton, champ, carte, barre-nav, menu-mobile, etat-vide.

## Enchaînement des sections

**Accueil**

| # | Section | Forme |
|---|---|---|
| 1 | Qui on est (`hero`) | Titre, phrase, **une** action vers l'offre, une photo |
| 2 | L'offre | Titre et champ de recherche ; une carte mise en avant sur toute la largeur, puis les autres sur deux colonnes ; état vide si rien ne correspond |
| 3 | La maison | Photo, deux paragraphes, liste de faits |
| 4 | Suite (`finale`) | Une phrase, une action vers la page qui lève les doutes |

**Page intérieure**

| # | Section | Forme |
|---|---|---|
| 1 | En-tête (`hero`) | Fil d'Ariane, titre, phrase |
| 2 | Contenu | Texte long à gauche ; à droite un encart qui reste : sommaire, faits, une action |
| 3 | Lectures | Deux cartes en ligne, pas plus |
| 4 | Suite (`finale`) | Une phrase, une action |

La grille ne fait jamais plus de deux colonnes : pas de rangée de trois cartes identiques.

## Emplacements

| Emplacement | Où | Parts |
|---|---|---|
| `frame`, `backdrop` | Toute la page | — |
| `hero` | Section 1 des deux pages | `kicker`, `title`, `lead`, `action`, `media` (accueil) ; `title`, `lead` (page intérieure) |
| `media` | Photos du héros, de la maison, du contenu | — |
| `title` | Tête des sections | `kicker`, `title`, `lead` |
| `grid` | Liste de l'offre, lectures | `item` (une carte) |
| `finale` | Dernière section | `title`, `lead`, `action` |

Un gabarit de `grid` sur l'accueil garde l'attribut `data-sv-item` de chaque élément : la recherche filtre dessus.

## Comportement mobile

- Les cartes passent en une colonne ; la carte mise en avant remet son image au-dessus du texte.
- Le champ de recherche passe sous le titre, sur toute la largeur.
- Page intérieure : l'encart passe sous le texte et ne colle plus (il ne colle que lorsqu'il tient à côté du texte).

## Clavier

Tab : lien d'évitement → barre → action du héros → recherche → cartes (une carte cliquable n'a qu'un arrêt : son titre) → suite. Sur la page intérieure : fil d'Ariane → liens du texte → sommaire de l'encart → action de l'encart → lectures → suite. Entrée dans le champ de recherche ne recharge pas la page.

## États

| État | Rendu |
|---|---|
| Recherche | Le nombre de résultats est écrit sous le champ et annoncé (`role="status"`) |
| Aucun résultat | État vide centré : ce qui se passe, des mots à essayer, « Effacer la recherche » (qui rend le focus au champ) |
| Élément indisponible | Carte en `aria-disabled`, photo grisée, mention « Complet » écrite |
| Page courante | `aria-current="page"` dans la barre, le menu et le fil d'Ariane |
| Sans script | Tous les éléments restent affichés ; la recherche ne filtre pas |

## Exemple React

```jsx
<Accueil page={page} hero={hero} maison={maison} suite={suite}
  offre={{ surtitre: 'Hiver en cours', titre: 'Cinq sorties', recherche: { libelle: 'Chercher une sortie', exemple: 'raquettes, nuit…' },
           vide: { titre: 'Aucune sortie ne correspond', texte: 'Essayez « raquettes ».' }, elements }} />

<PageInterieure page={page} chemin={[{ libelle: 'Accueil', href: '/' }, { libelle: 'Préparer sa sortie' }]} titre="Préparer sa sortie" appui="…" encart={encart} lectures={lectures} suite={suite}>
  <h2 className="k-h2" id="sac">Le sac</h2>
  <p>…</p>
</PageInterieure>
```
