# Récit en sections collantes

Une histoire en chapitres. Dans chaque chapitre, l'image reste à l'écran pendant que le texte défile ; un rail dit où l'on en est.

## Quand la choisir

- Le contenu se lit **dans l'ordre**, du début à la fin : un reportage, l'histoire d'un produit, un déroulé, un bilan d'année.
- Chaque étape a une image forte, et assez de texte pour que l'image ait le temps de rester (deux ou trois paragraphes).

Ne pas la choisir pour une page que l'on parcourt en diagonale ou où l'on cherche une information : le collant ralentit.

## Fichiers

| Fichier | Rôle |
|---|---|
| `recit-collant.html` | La page, remplie d'un exemple fictif |
| `recit-collant.css` | Sommaire d'ouverture, rail, chapitre |
| `recit-collant.js` | Chapitre en cours, barre de progression, disposition de chaque chapitre |
| `RecitCollant.jsx` | Version React |

Composants utilisés : bouton, barre-nav, menu-mobile.

## Enchaînement des sections

| # | Section | Forme |
|---|---|---|
| 1 | Ouverture (`hero`) | Titre, phrase, et le sommaire des chapitres à la place d'un bouton |
| 2 | Rail | Collé en haut : un lien par chapitre, celui en cours souligné, une barre qui avance |
| 3 | Chapitres (`chapter`, autant qu'il en faut) | Image qui colle, texte qui passe |
| 4 | Sortie (`finale`) | Une phrase et une seule suite |

La barre de navigation se cache quand on descend et revient quand on remonte (`data-k-nav="auto-hide"`). Quand elle revient, le rail descend de sa hauteur pour rester visible ; quand elle se cache, il remonte.

## Emplacements

| Emplacement | Où | Parts |
|---|---|---|
| `frame`, `backdrop` | Toute la page | — |
| `hero` | Ouverture | `kicker`, `title`, `lead`, `toc` |
| `chapter` | Chaque chapitre | `media`, `kicker`, `title`, `text` (un par paragraphe) |
| `media` | L'image de chaque chapitre | — |
| `finale` | Sortie | `title`, `lead`, `action` |

Un gabarit de `chapter` garde l'`id` du chapitre (porté par l'emplacement lui-même) : le rail et le sommaire y conduisent.

## Comment le collant est fait

En CSS seulement : `position: sticky` sur l'image. Le script ne fait que mesurer, une fois par image affichée, pour dire le chapitre en cours et poser `data-k-layout` sur chaque chapitre :

- `side` (image et texte côte à côte) : le texte reçoit une hauteur plus grande que l'écran, pour que l'image reste ;
- `stacked` (une colonne) : l'image ne prend que le haut de l'écran.

Sans script, ni l'un ni l'autre : le récit se lit à plat, image puis texte. Le défilement n'est jamais intercepté.

## Comportement mobile

L'image colle en haut, sur 42 % de la hauteur d'écran ; le texte défile dessous et passe sous elle. Le rail reste au-dessus et défile horizontalement s'il y a beaucoup de chapitres ; le chapitre en cours est ramené dans le champ.

## Clavier

Tab : lien d'évitement → barre → sommaire d'ouverture → rail → suite. Chaque lien du rail et du sommaire conduit à son chapitre. Le chapitre en cours porte `aria-current="step"` et son libellé commence par « Chapitre n : » pour les lecteurs d'écran. Quand le focus entre dans la barre cachée, elle revient.

## États

| État | Rendu |
|---|---|
| Chapitre en cours | Lien du rail souligné et en gras, `aria-current="step"` |
| Progression | Barre sous le rail, de 0 à 1 sur la longueur du récit |
| Image pas encore chargée | Fond du skill à la place, à la bonne hauteur : rien ne saute |
| Mouvement réduit | Rien ne change : le collant est une position, pas une animation. La barre se cache sans glisser |

## Exemple React

```jsx
<RecitCollant page={page} ouverture={{ surtitre: 'Récit · 6 minutes de lecture', titre: 'Une nuit là-haut', appui: '…' }}
  chapitres={[{ id: 'ch-1', quand: '15 h', titre: 'Le parking du col', image: { src, alt }, textes: ['…', '…'] }]}
  suite={{ titre: '…', appui: '…', action: { libelle: 'Voir la sortie', href: '/bivouac' } }} />
```
