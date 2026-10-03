# Nocturne Architecture — composants

Valeurs dans `tokens.css`. Les dimensions sont **mesurées au pixel** sur la maquette (page de 1440px) ou « lues » à l'œil quand c'est indiqué. Les états (survol, ouvert) sont proposés. Code complet dans `examples/demo.html`.

## Règles communes

- **Noir presque pur, blanc net, un seul rouge.** Le rouge ne sert qu'à l'action (pilule), à une carte mise en avant, aux points et à la ligne de progression.
- **Une grotesque serrée** (`--font-display`, graisse 500, approche −0.035em) pour tout ce qui est grand ; texte courant en `--font-body` 13 à 16px.
- **Deux tons de texte dans une même phrase** : blanc pour ce qui compte, gris `--dim` pour la suite. Le gris n'est utilisé qu'en grand.
- Filets de 1px `--line` plutôt que des cartes ; coins de 12px sur les photos, 20px sur les grands panneaux.
- Petits libellés en capitales de 11px, précédés d'un **point plein**.

## Barre du haut

Posée sur la photo du héros, sans fond, soulignée d'un filet : liens 13px à gauche ; à droite **date \ heure \ température** en capitales séparées par des barres obliques inverses, un filet vertical, puis la pilule rouge. Sous 860px : la date et la pilule seulement.

## Mot-marque géant

Le nom du studio en **minuscules**, d'un bord à l'autre de l'écran (6 lettres sur 1407px, `--fs-word`), approche −0.055em, blanc, posé en bas du héros et **coupé par le bas** (un cinquième des lettres disparaît). Repris en bas du pied de page. `aria-label` sur le titre, lettres en `span` pour l'animation.

## Bouton lecture

Pastille rouge de 22px avec un triangle blanc + libellé en capitales 13px (« VOIR LE FILM »). Variante claire (pastille blanche) sur une photo. Dessous, dans le héros : un paragraphe de 440px au plus.

## Pilules

| Variante | Fond | Texte | Usage |
|---|---|---|---|
| `.pill` | `--accent-deep` | blanc 13px / 500 | Action principale, 48px de haut (151 × 48 sur la maquette) |
| `.pill.white` | blanc | noir | Sur la carte rouge |
| `.pill.line` | transparent, contour `--line` | blanc | Lien secondaire |

## Grande phrase en deux tons

48px, interligne 1.2, graisse 500. Le début est blanc, la suite `--dim`. Chaque mot est un `span` ; la phrase entière est dans `aria-label`.

## Chiffres

Grille 2 × 2. Chiffre fin de 88px (graisse 400), suffixe « + » ou « K » en `--ghost`, libellé 16px dessous, filet sous chaque case.

## Bandeau de mots

Le nom du studio répété, 66px, séparé par des **points rouges** ; un exemplaire sur deux est éteint (`--mark`). Décoratif : `aria-hidden`.

## Carte de bien

438 × 461px, coins 12px.
- **Carte photo** : image plein cadre, dégradé sombre en bas, nom 26px en bas à gauche.
- **Carte rouge** (la première) : fond `--accent-deep` à damier très discret, nom en haut, pilule blanche « Voir le projet », trois lignes de texte, puis trois caractéristiques séparées par des filets blancs.

Sous le rail : bouton rond blanc (précédent), **ligne de 1px avec un segment rouge de 3px** qui s'allonge, bouton rond à contour (suivant).

## Ligne d'étape

Numéro « /01 » (barre oblique en `--ghost`) à gauche, titre 22px à droite, filet dessous. Ouverte : à gauche « Points clés » et une liste à étoiles, une pilule rouge ; à droite une phrase et une photo large à coins de 12px. Une seule ligne ouverte à la fois.

## Panneau « méthode »

Bloc `--panel` à coins de 20px : à gauche libellé, titre, petite photo (290px) et une note ; à droite une liste de titres 22px suivis d'une phrase, séparés par des filets.

## Puces de catégories

Pilules à contour de 60px, texte 24px, en bandeau défilant. Décoratif.

## Carte film

Grande photo sombre à coins de 20px (≈ 840px de haut), phrase en deux tons en bas à gauche, bouton lecture clair en bas à droite.

## Carte d'article

Photo à coins de 12px (480px de haut), **étiquette blanche** en pilule en haut à gauche, titre 22px dessous et durée de lecture à droite.

## Pied de page

Fond `--foot` : petit signe à gauche, « MENU » à droite, trois colonnes de texte 13px, ligne légale en capitales 11px, puis le mot-marque géant coupé.

## Accessibilité

- Texte blanc sur `--bg` (19:1) ; `--muted` pour le petit texte secondaire (6,9:1) ; `--dim` seulement à partir de 24px.
- Texte blanc sur rouge : toujours sur `--accent-deep` (5,5:1), pas sur `--accent`.
- Sur photo, un voile `--veil` sous tout texte.
- Étapes : boutons avec `aria-expanded` ; le contenu fermé est masqué (`visibility: hidden`) pour ne pas recevoir le focus.
- Carrousel : zone défilante focusable, flèches du clavier natives, boutons précédent / suivant nommés.
- Bandeaux et mots géants décoratifs en `aria-hidden` ; date et heure dans des `<time>`.
