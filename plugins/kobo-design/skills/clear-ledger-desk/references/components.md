# Clear Ledger Desk — composants

Tous lisent `tokens.css`. Les hauteurs suivent la densité (`--row-h`, `--field-h`, `--btn-h`) : ne jamais les écrire en dur. « mesuré » = relevé sur la référence de style ; « proposé » = ajouté par le skill ; « lu » = règle d'usage reprise de la référence CRM.

## Bouton (mesuré)

32 px de haut (28 en compact), rayon 6 px, 14 px en graisse 500, marge intérieure 0 12 px. Zone cliquable portée à 44 px par un pseudo-élément.

| Variante | Fond | Texte | Usage |
|---|---|---|---|
| `.btn--primary` | `--accent` | `--on-accent` | **l'**action de l'écran, une seule |
| `.btn` | `--neutral` | `--text` | toutes les autres actions |
| `.btn--quiet` | transparent | `--text-2` | actions rares, barre d'outils, fermeture |
| bascule | `--selected` + `--accent` quand `aria-pressed="true"` | | densité, filtres rapides |

Survol : un ton plus sombre (`--accent-hover`, `--line`), en 50 ms. Désactivé : texte `--disabled` sur `--surface`, et la raison écrite à côté.

## Champ et sélection (mesuré)

Libellé au-dessus : 12 px, graisse 650, `--text-2`, 4 px d'écart. Champ de 40 px (32 en compact), fond blanc, contour 1 px `--line-strong`, rayon 6 px, marge intérieure 0 8 px. Aide dessous en 12 px `--muted`.
Survol : fond `--surface`. Focus : contour `--focus` doublé d'un filet intérieur, fond blanc. Erreur : contour `--danger`, message `--danger` précédé d'une icône, relié par `aria-describedby`.

## Étiquette d'état (mesuré)

12 px, graisse 500, rayon 4 px, marge intérieure 0 6 px, sur une ligne. Neutre : `--neutral` / `--text-2`. Information : `--info-bg` / `--info`. Succès : `--success-bg` / `--success`. Attention : `--warning-bg` / `--warning`. Erreur : `--danger-bg` / `--danger`. **Le mot dit l'état** (« Gagnée », « En retard ») ; la couleur l'appuie.

## Tableau de données (mesuré pour les cotes, lu pour les règles)

```html
<div class="grid-wrap">
  <table aria-describedby="aide">
    <caption id="aide">Flèches : changer de ligne. Espace : sélectionner. Entrée : ouvrir le détail.</caption>
    <thead><tr>
      <th scope="col"><input type="checkbox" aria-label="Tout sélectionner"></th>
      <th scope="col" aria-sort="ascending"><button class="sort" type="button">Affaire <span aria-hidden="true">↑</span></button></th>
      <th scope="col" class="num" aria-sort="none"><button class="sort" type="button">Montant</button></th>
    </tr></thead>
    <tbody><tr tabindex="0" aria-selected="false">
      <td><input type="checkbox" tabindex="-1" aria-label="Sélectionner « Refonte du site »"></td>
      <th scope="row">Refonte du site</th><td class="num">18 400 €</td>
    </tr></tbody>
  </table>
</div>
```

- **En-tête** : 34 px (30 en compact), 12 px, graisse 650, `--text-2`, fond `--surface`, filet bas de 2 px. Ni capitales ni interlettrage. Il reste collé en haut quand la liste défile.
- **Ligne** : 48 px (36 en compact), marge de cellule 4 px 8 px, filet bas `--line`, une seule ligne de texte. La première cellule de données est l'en-tête de ligne (`<th scope="row">`, graisse 500).
- **Nombres, montants, dates courtes** : alignés à droite, chiffres tabulaires.
- **Survol** : fond `--surface`. **Sélection** : fond `--selected` **et** case cochée (`aria-selected="true"`). **Ligne ouverte** dans le panneau de détail : son nom en gras.
- **Tri** : l'en-tête est un bouton ; `aria-sort` dit le sens, une flèche l'écrit. Un seul tri à la fois.
- **Clavier** : une seule ligne est dans l'ordre de tabulation ; ↑ ↓ (ou k j) changent de ligne, Début et Fin vont aux extrémités, Espace (ou x) sélectionne, Entrée ouvre le détail.
- **Sélection multiple** : la case d'en-tête coche tout ce qui est affiché, et passe en état partiel.
- **Écran étroit** (lu : « un tableau se replie en liste de fiches ») : chaque ligne devient une fiche, chaque cellule est précédée de son intitulé.
- À ne pas faire (lu) : des cellules sur plusieurs lignes, trop de colonnes, de l'édition en place pour des champs rarement modifiés.

## Filtres (proposé)

Une rangée de sélections au-dessus du tableau, libellées, plus « Effacer les filtres » en bouton discret. Le résumé (« 5 affaires affichées sur 12, 58 800 € ») est une zone `role="status"` : il est annoncé à chaque changement.

## Actions groupées (lu)

Dès qu'une ligne est sélectionnée, un bandeau `--selected` apparaît au-dessus du tableau : le nombre sélectionné en gras, les actions (boutons neutres), « Tout désélectionner ». Une action groupée est toujours annulable : la notification qui la confirme porte « Annuler ».

## Chemin d'étapes (proposé, d'après l'indicateur de progression de la référence CRM)

```html
<ol class="path" aria-label="Étapes de l'affaire">
  <li data-state="done">Qualification <span class="sr">(terminée)</span></li>
  <li aria-current="step">Négociation <span class="sr">(étape en cours)</span></li>
  <li>Gagnée <span class="sr">(à venir)</span></li>
</ol>
```

Des segments de 32 px, rayon 6 px, côte à côte, qui passent à la ligne s'ils ne tiennent pas. Terminée : fond `--success-bg`, texte `--success`, une coche. En cours : fond `--accent`, texte `--on-accent`, en gras. À venir : fond `--neutral`. Perdue : un seul segment `--danger-bg`. Trois à six étapes, nommées par un mot (lu : « nommer l'étape, pas son numéro »).

## Onglets (mesuré)

Texte de 14 px en graisse 500, `--text-2` ; l'onglet choisi est en `--accent` avec un filet de 2 px dessous. `role="tablist"`, flèches gauche et droite, Début et Fin.

## Historique (proposé)

Liste verticale : une pastille ronde de 24 px avec l'icône du type (appel, e-mail, réunion, note), reliée à la suivante par un filet ; titre en gras, une ou deux lignes de texte `--text-2`, date à droite en 12 px `--muted`.

## Panneau de détail (proposé)

Glisse depuis la droite, 416 px (toute la largeur sur écran étroit), sous l'en-tête d'application, ombre `--shadow-overlay`. Il n'est pas modal : la liste reste utilisable. À l'ouverture, le focus va à son titre ; Échap le ferme et rend le focus à la ligne.

## Barre latérale (mesuré pour le lien choisi, proposé pour le repli)

240 px, fond `--surface`, filet droit. Lien de 32 px : icône de 16 px, libellé, compteur à droite. Lien courant : fond `--selected`, texte `--accent`, un trait de 2 px à gauche (`aria-current="page"`). Repliée : 56 px, icônes seules, chaque lien garde son nom accessible. Écran étroit : un tiroir par-dessus le contenu.

## Chiffre de tableau de bord (proposé)

Un cadre à filet : libellé de 12 px, chiffre de 32 px en graisse 650, une ligne de contexte en `--text-2`. Jamais plus de quatre côte à côte. Le chiffre n'est pas animé.

## Notification (mesuré pour le ton inversé)

En bas, au centre : fond `--inverse`, texte blanc, rayon 6 px, une phrase et au plus une action (« Annuler »). `role="status"`. Elle part seule au bout de six secondes ; une erreur reste jusqu'à ce qu'on la ferme.

## États

- **Vide** : une pastille ronde `--neutral` avec une icône, un titre de 20 px qui dit ce qui se passe, une phrase qui dit pourquoi et quoi faire, un bouton. Le bouton est plein seulement si c'est la première action à faire (« Nouvelle affaire »).
- **Chargement** : des barres `--neutral` de 12 px à la place des lignes, qui pulsent lentement ; la zone porte `aria-busy="true"` et une phrase lue par les lecteurs d'écran.
- **Erreur** : pastille `--danger-bg`, titre, ce qui est préservé (« rien n'a été modifié »), « Réessayer ». `role="alert"`.
- **Focus clavier** : contour 2 px `--focus`, décalé de 2 px (vers l'intérieur sur une ligne de tableau).
- **Désactivé** : jamais sans raison écrite.
