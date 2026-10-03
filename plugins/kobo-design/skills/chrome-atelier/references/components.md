# Chrome Atelier — composants

Toutes les valeurs viennent de `tokens.css`. Code complet dans `examples/demo.html`. « Mesuré » = lu sur le site en ligne à 1440px ; « observé » = relevé sur les images, la vidéo ou les captures ; « proposé » = ajouté par le skill. Le site écrit tout en `rem` avec une racine de 0,9vw : les tailles ci-dessous donnent la valeur du site puis celle du skill.

## 1. Étiquette entre crochets (mesuré)

`[variations]`, `[articles]`, `[41%]` : mono 400, 0,75rem, approche **−0.108em** (très serrée), `--body`. Toujours **au-dessus** du titre, sur sa propre ligne, à la marge gauche.

```css
.tag { font: 400 var(--fs-body)/1 var(--font-mono); letter-spacing: var(--ls-mono); color: var(--body); }
```

## 2. Titre décalé (mesuré)

Regular 400, capitales, 1,5rem / 1, approche −0.01em, `--ink`. **Deux lignes, la seconde décalée** de `--indent` (30px pour 19,5px de corps). Le texte qui suit (0,75rem, 34 caractères par ligne) est décalé d'un cran de plus.

```html
<h2 class="h2"><span>Trois ors,</span><span>une seule main</span></h2>
```
```css
.h2 { font-size: var(--fs-h2); line-height: var(--lh-h2); letter-spacing: var(--ls-h2); text-transform: uppercase; color: var(--ink); }
.h2 span { display: block; }  .h2 span + span { padding-left: var(--indent); }
```
Titre du héros : 2rem / 1.1, **4 lignes en escalier** (retraits 0.8em, 0, 3em, 3.8em), blanc.

## 3. Pilule (mesuré)

Contour **0,8px**, rayon plein, capitales 0,75rem, approche 0.092em, marges 1rem / 1,25rem (37px de haut sur le site, 44px dans le skill).

| Variante | Repos | Survol |
|---|---|---|
| Contour sur clair | texte et contour `--ink`, fond transparent | fond `--ink`, texte blanc |
| Pleine sur photo | fond blanc, texte `--ink` | fond transparent, texte blanc |
| Fantôme sur photo | contour blanc, fond blanc à 4 % | fond blanc, texte `--ink` |
| Petite (nav) | 28px de haut | idem contour |

À côté d'une pilule, un **lien souligné** en capitales (« Portée par ») sert d'action secondaire.

## 4. Navigation (mesuré + observé)

- **Dans le héros** : logo-signe blanc centré en haut ; liens en capitales 0,625rem alignés **à droite, à mi-hauteur** de la photo.
- **Après le héros** : barre blanche de 39px (44px dans le skill) qui glisse depuis le haut : logo à gauche, liens à droite, petite pilule « Liste d'attente ».
- Mobile : logo à gauche, deux traits à droite.

## 5. Héros nuit (mesuré + observé)

Photo plein écran d'un **gros plan d'oreille portant le bijou**, fond bleu-gris profond `--night`, assombrie à gauche pour le texte. **Cercles de cadrage** fins (0,8px, blanc à 16 %) centrés sur le bijou, un axe vertical et un axe horizontal. À gauche, à mi-hauteur : titre en escalier, paragraphe `--soft`, deux pilules, une ligne en italique. En bas : « Défiler pour explorer » en mono qui flotte, puis la barre.

## 6. Barre de caractéristiques (mesuré)

Collée en bas du héros, **58px**, fond noir à 20 % (flouté 4px sur le site), filet haut blanc à 16 %. **3 cellules** centrées : libellé 0,625rem capitales `--soft`, valeur 1,15rem capitales blanche.

## 7. Carte issue de la barre (observé)

Photo verticale **9:16**, 377px de large à 1440, sans arrondi ; en haut, centrés, le même libellé et la même valeur que la cellule, en blanc sur un léger voile. Trois cartes à des hauteurs différentes (celle du milieu plus haut).

## 8. Planche de l'atelier (signature, mesuré + observé)

Fond blanc. **4 filets** `--rule` passant par le centre (horizontal, vertical, deux diagonales) et un **cercle** de 0,8px (≈ 75 % de la hauteur d'écran). Au centre la **pièce**. En haut à gauche : étiquette, titre décalé, texte, pilule + lien. En bas au centre : « 10K, 14K, 18K, 22K ». En bas à gauche : compteur « 1/3 » en mono.

**Roue des légendes** : trois libellés posés sur le cercle à −40°, 0° et +40° ; l'actif (`--ink`, point noir) est relié à la pièce par un trait de 30 % du diamètre ; les autres sont en `--ghost`. Ce sont des boutons (`aria-pressed`). Mobile : la roue devient une rangée de trois libellés sous la pièce.

## 9. Pièce (observé)

Sur le site : séquence d'images d'un rendu 3D (or jaune, blanc, rose). Dans le skill : **scène Three.js** (un maillage, matériau métal, environnement clair) ou vidéo détourée du projet ; repli photo si WebGL manque. Elle occupe environ la moitié du cercle.

## 10. Rangée de presse (observé)

Cellules de **235px** (rapport 235 / 365) séparées par des filets `--rule`, logos de médias en `--ghost`. La cellule active montre une photo, son logo passe en blanc ; **au-dessus d'elle**, l'article : titre 0,75rem capitales `--ink`, deux lignes de texte, auteur en italique. Mobile : une cellule par écran, défilement horizontal aimanté.

## 11. Galerie (observé)

À gauche : étiquette, titre, texte, pilule, sur une **grande courbe fine** `--rule`. À droite, sur la moitié de la largeur : **deux colonnes** de photos sans arrondi, 8px d'écart, la seconde commençant 13vw plus bas. Sur le site, certaines tuiles sont des vidéos avec un petit bouton rond dont le contour suit la lecture.

## 12. Questions (mesuré + observé)

Deux moitiés : à gauche une **macro de métal** pleine hauteur, collante ; à droite étiquette, titre décalé, liste. Chaque question : chevron de 9px à gauche, texte 0,75rem `--ink` ; la réponse se déplie dessous, alignée sur le texte.

## 13. Liste d'attente (observé dans le shot)

Fond noir avec une photo sombre de métal liquide ; au centre une **carte blanche** sans arrondi : titre décalé, texte, champs à simple filet bas, pilule noire. Après envoi, la carte affiche le remerciement. Dessous, le nombre de pièces de la série.

## 14. Pied (mesuré)

Noir `--black`, une ligne de texte minuscule en bas à gauche.

## États

- **Chargement** : écran au compas (voir `motion.md`).
- **WebGL absent** : la pièce est remplacée par une photo (`.piece.no-webgl img`).
- **Image absente** : fonds `--night-2` (cartes), `--panel` (galerie) ; textes lisibles.
- **Formulaire** : erreur (message `--gold-ink`, filet du champ, `aria-invalid`, focus renvoyé), envoi (`aria-busy`, pilule à 50 %), terminé (remerciement).
- **Focus clavier** : contour 1px de la couleur du texte, décalé de 4px.
- **Cibles tactiles** : 44px (pilules, liens de nav, libellés de la roue, questions).
