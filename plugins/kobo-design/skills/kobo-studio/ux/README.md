# UX commune — structures de page et emplacements

La partie de kobo-studio qui ne dépend d'aucun skill : comment une page est construite, dans quel ordre, avec quels états. Elle n'utilise que les composants de `../components/` et les rôles `--k-*` de `../contract/`. Le skill choisi lui donne son apparence ; il ne change pas sa structure.

| Dossier | Contenu |
|---|---|
| `structures/` | Quatre structures de page complètes (HTML, CSS, JS, React, README) et leur socle commun (`page.css`, `page.js`) |
| `patterns/` | Fiches courtes sur les briques transverses : états de page, formulaire, navigation, mouvements |
| `structures.html` | Démonstration : chaque structure sous chacun des 23 skills, aux trois intensités |

## Le principe des emplacements

Une structure de page est neutre : elle marche telle quelle sous n'importe quel skill. Mais l'identité d'un skill tient souvent à une mise en page (un héros photo plein cadre, un cadre autour de l'écran, une grille en parallélogrammes) qu'une structure neutre ne peut pas deviner.

Un **emplacement** est un endroit nommé de la structure, marqué par `data-k-slot="<nom>"`, où un gabarit de signature pourra s'installer. Trois règles :

1. **Chaque emplacement a un contenu neutre.** Sans gabarit, la page est complète. Un emplacement n'est jamais un trou.
2. **Un gabarit remplace le contenu d'un emplacement, jamais sa place.** L'ordre des sections, les ancres, les titres et le parcours au clavier appartiennent à la structure.
3. **Un gabarit reprend les éléments du contenu neutre.** Le titre, la phrase d'appui, l'action, l'image sont marqués `data-k-part="<nom>"` : le gabarit les redispose, il ne réécrit pas le texte.

### Les huit emplacements

| Nom | Où | Contenu neutre | Ce qu'un gabarit de signature y mettra (étape 4b) |
|---|---|---|---|
| `frame` | Posé par-dessus toute la page, fixe | Rien | Cadre d'écran, filet, rail, autocollants à cheval |
| `backdrop` | Derrière toute la page, fixe | Le fond du skill, rien d'autre | Nuit étoilée, filets de fond, pellicule, scène 3D |
| `hero` | Premier écran | Texte et une action d'un côté, image de l'autre ; aligné au bord, jamais centré | Photo plein cadre, mot-marque géant, scène, affiche |
| `title` | En tête de chaque section | Surtitre, titre, phrase d'appui | Titre empilé, titre incliné, titre collé au bord |
| `media` | Chaque image de contenu | La photo au filtre du skill, sa légende dessous | Traitement d'image du skill : rampe, mosaïque, lentille, cadre |
| `grid` | Chaque liste d'éléments | Colonnes égales qui se replient ; ou des lignes | Bento, parallélogrammes, mosaïque, 2 × 2 |
| `chapter` | Chaque chapitre d'un récit | L'image colle, le texte passe à côté | Scène plein écran, chapitre-affiche |
| `finale` | Dernière section | Une phrase et une action, sur le ton inversé | Bloc de fin propre au skill |

Un emplacement peut en contenir un autre (`hero` contient un `media`, `chapter` aussi). Les parts d'un emplacement imbriqué lui appartiennent.

### Les parts

| `data-k-part` | Ce que c'est |
|---|---|
| `kicker` | Surtitre |
| `title` | Titre (garde son niveau et son `id`) |
| `lead` | Phrase d'appui |
| `action` | L'action de l'emplacement (une seule dans un `hero`) |
| `media` | L'image et sa légende |
| `facts`, `meta`, `toc`, `form` | Liste de faits, ligne d'auteur et de date, sommaire, formulaire |
| `item` | Un élément d'un `grid` |
| `text` | Un paragraphe d'un `chapter` |

### Remplir un emplacement

En HTML et JS (`structures/page.js`) :

```js
// rendu reçoit des COPIES des parts du contenu neutre, l'élément de l'emplacement et son rang
Kobo.slots.fill('hero', function (parts, el, index) {
  var box = document.createElement('div');
  box.className = 'mon-gabarit';
  box.append(parts.media[0], parts.title[0], parts.action[0]);
  return box;               // un nœud, du HTML, ou null pour garder le contenu neutre
});
Kobo.slots.reset('hero');   // remet le contenu neutre, avec ses écouteurs
Kobo.slots.list();          // [{ name, el, filled }]
```

Après chaque changement, l'emplacement reçoit `data-k-filled` et émet l'événement `k-slot-change` ; les composants qu'il contient (champs, barre, onglets) sont réactivés.

En React, chaque structure accepte une propriété `emplacements` : un objet `{ nom: (parts) => élément }`. `parts` contient les éléments React du contenu neutre, déjà construits. Sans entrée pour un nom, le contenu neutre est rendu.

```jsx
<LandingProduit {...contenu} emplacements={{ hero: ({ title, lead, action, media }) => <MonHeros>{media}{title}{action}</MonHeros> }} />
```

### Ce qu'un gabarit n'a pas le droit de faire

- Retirer une part qui porte une information ou une action (il peut la déplacer, pas la supprimer).
- Changer le niveau d'un titre, l'ordre de tabulation ou une ancre.
- Ajouter une seconde action dans un `hero`.
- Dépendre du mouvement : en `reduced` et en `off`, et sous `prefers-reduced-motion`, la page doit rester complète. En `off`, les gabarits ne s'installent pas : la structure rend son contenu neutre.

## Les quatre structures

| Structure | Dossier | À choisir quand | Emplacements |
|---|---|---|---|
| Landing produit | `structures/landing-produit/` | Une seule offre, un seul parcours, une demande au bout | frame, backdrop, hero, media, title, grid, finale |
| Récit en sections collantes | `structures/recit-collant/` | Une histoire en chapitres, lue dans l'ordre | frame, backdrop, hero, chapter, media, finale |
| Site vitrine | `structures/site-vitrine/` | Plusieurs pages : un accueil qui oriente, des pages intérieures qui renseignent | frame, backdrop, hero, media, title, grid, finale |
| Article / page éditoriale | `structures/article/` | Un texte long, fait pour être lu d'une traite | frame, backdrop, hero, media, title, grid, finale |

Toutes partagent `structures/page.css` (coquille, largeurs, rythme, texte, emplacements neutres) et `structures/page.js` (emplacements, barre qui se cache).

## Règles communes aux structures

- **Lignes de 80 caractères au plus.** Un paragraphe est borné par `--k-measure`, une liste de faits par `--k-measure-wide` (rôles du socle, en caractères) : la longueur de ligne suit la police du skill.
- **Aucune valeur en dur, aucun point de rupture.** Les colonnes se replient seules (`flex-wrap`, grilles `auto-fit`) ; quand un script doit savoir si deux blocs sont côte à côte, il mesure.
- **Une page, un `<h1>`, des repères** : lien d'évitement, `<header>`, `<main>`, `<footer>`, sections titrées.
- **Une action principale par écran.** Le héros n'a qu'un bouton. Les autres suites sont des liens.
- **Pas de série de cartes identiques.** Une liste est une liste (lignes, étapes, faits) ; les cartes servent quand chaque élément a une image et une destination, et l'une d'elles est mise en avant.
- **Tout ce qui est annoncé fonctionne** : la recherche cherche, le formulaire valide et aboutit, un choix manquant est dit.
- **Sans script, la page se lit en entier.** Les scripts ajoutent la progression, le filtre, l'envoi ; ils ne conditionnent pas le contenu.
- **Mouvement** : voir `patterns/mouvements.md`. Rien n'intercepte le défilement.

## Charger une structure

```html
<link rel="stylesheet" href="contract/roles.css">
<link rel="stylesheet" href="contract/maps/<id-du-skill>.css">
<link rel="stylesheet" href="components/socle.css">
<link rel="stylesheet" href="components/<composant>/<composant>.css">   <!-- ceux que la structure utilise -->
<link rel="stylesheet" href="ux/structures/page.css">
<link rel="stylesheet" href="ux/structures/<structure>/<structure>.css">
<link rel="stylesheet" href="components/signatures/<id-du-skill>.css">   <!-- en dernier -->
```

Les pages de `structures/` chargent en plus `apercu.js`, qui choisit le skill d'après l'adresse (`page.html#<id>:<intensité>:slots`). C'est un outil de démonstration : une vraie page charge une seule fiche, et ne le livre pas.

## Vérifier

```bash
python3 tools/check_components.py   # couvre aussi ux/ : valeurs en dur, motifs anti-slop, fichiers attendus par structure
```

Puis ouvrir `structures.html` : sélecteur de structure, de skill et d'intensité ; « Montrer les emplacements » dessine leur contour et leur nom ; « Largeur de téléphone » réduit le cadre.

## Limites connues

- Aucun gabarit de signature n'existe encore : tous les emplacements rendent leur contenu neutre. `frame` et `backdrop` sont donc vides.
- Les versions React sont compilées et rendues côté serveur, pas essayées dans un navigateur.
- Testé dans Chrome seulement.
