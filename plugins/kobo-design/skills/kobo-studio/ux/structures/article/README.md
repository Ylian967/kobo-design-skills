# Article / page éditoriale

Un texte long, fait pour être lu d'une traite : une colonne de lecture étroite, un sommaire qui suit, rien qui distraie.

## Quand la choisir

- Billet de journal, guide, étude de cas, page « à propos » longue, documentation rédigée.
- Le texte fait plus de trois écrans et a des intertitres.

Ne pas la choisir pour un contenu surtout visuel, chapitre par chapitre (→ récit en sections collantes).

## Fichiers

| Fichier | Rôle |
|---|---|
| `article.html` | La page, remplie d'un exemple fictif |
| `article.css` | En-tête, couverture, colonnes, suite de lecture |
| `article.js` | Titre en cours dans le sommaire ; copie du lien |
| `Article.jsx` | Version React |

Composants utilisés : bouton, barre-nav, menu-mobile, notification.

## Enchaînement des sections

| # | Section | Forme |
|---|---|---|
| 1 | En-tête (`hero`) | Fil d'Ariane, rubrique, titre, chapô, auteur · date · durée de lecture |
| 2 | Couverture (`media`) | Une image large et sa légende |
| 3 | Texte | Sommaire étroit qui reste sur le côté ; colonne de lecture bornée (80 caractères par ligne au plus) |
| 4 | À lire ensuite | Deux lignes cliquables, pas des cartes |
| 5 | Suite (`finale`) | Une phrase, une action |

Dans le texte : intertitres `<h2 id>`, listes, figures, et une citation **tirée du texte** (`<blockquote class="k-pull">`) — jamais un témoignage.

## Emplacements

| Emplacement | Où | Parts |
|---|---|---|
| `frame`, `backdrop` | Toute la page | — |
| `hero` | En-tête | `kicker`, `title`, `lead`, `meta` |
| `media` | Couverture, figures du texte | — |
| `title` | Tête de « À lire ensuite » | `title` |
| `grid` | Les deux lectures | `item` |
| `finale` | Dernière section | `title`, `lead`, `action` |

La colonne de lecture n'est pas un emplacement : sa largeur et sa taille de texte sont une règle de lisibilité, pas une signature.

## Comportement mobile

Le sommaire passe au-dessus du texte et ne colle plus. La couverture garde son rapport de 2 pour 1. La ligne d'auteur passe sur plusieurs lignes.

## Clavier

Tab : lien d'évitement → barre → fil d'Ariane → sommaire → « Copier le lien » → liens du texte → lectures → suite. Les liens du sommaire conduisent aux intertitres ; la barre collée ne les recouvre pas (`scroll-padding`).

## États

| État | Rendu |
|---|---|
| Titre en cours de lecture | Son lien dans le sommaire passe en gras, soulignement épaissi, `aria-current="true"` |
| Lien copié | Notification de succès ; le focus revient au bouton |
| Copie refusée par le navigateur | Notification d'erreur qui donne l'adresse à copier à la main |
| Sans script | Le sommaire reste une liste de liens ; le bouton « Copier » ne fait rien (à ne pas servir sans le script) |

## Exemple React

```jsx
<ZoneNotifications>
  <Article page={page} chemin={chemin} couverture={{ src, alt, legende, ratio: '2 / 1' }}
    entete={{ surtitre: 'Journal · Savoir-faire', titre: 'Dormir sur la neige sans avoir froid', chapo: '…', auteur: 'Par …', date: '12 janvier', duree: '5 minutes de lecture' }}
    sommaire={[{ libelle: 'La neige est un isolant', id: 'air' }]} lectures={lectures} suite={suite}>
    <p>…</p>
    <h2 className="k-h2" id="air">La neige est un isolant</h2>
  </Article>
</ZoneNotifications>
```
