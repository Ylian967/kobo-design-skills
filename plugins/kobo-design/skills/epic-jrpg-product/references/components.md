# Epic JRPG Product — composants

## En-tête (deux étages puis compact)

- **Étage haut** (70px, noir) : à droite icône compte, langue « FR », logo éditeur (emplacement).
- **Filet multicolore** : une ligne de 4px en 4 segments égaux (`--stripe-1` à `--stripe-4`) qui court au-dessus de la navigation, depuis ~28 % de la largeur jusqu'au bord droit.
- **Étage navigation** (70px) : logo du jeu à gauche, liens Montserrat 500 16px blancs, loupe, bouton **ACHETER** or.
- Au défilement, l'étage haut disparaît (`--height-header` 140px → 70px).

## Bouton or

```css
.btn-gold { display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); min-height: var(--cta-min); padding: 12px 25px;
  background: var(--gold); color: var(--on-gold); border: 0.8px solid var(--gold); border-radius: var(--radius-md);
  font: 600 var(--text-sm)/1 var(--font); letter-spacing: var(--tracking-caps); text-transform: uppercase; text-decoration: none;
  transition: color var(--dur-fast) var(--ease), background-color var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease); }
.btn-gold:hover { background: transparent; color: var(--gold); }
```
Variantes : **contour or** (fond transparent, texte or, icône cœur « Ajouter à la liste de souhaits ») ; **large** avec icône à gauche (« Dématérialisé », 50px de haut).

## Plaque de titre (signature)

```css
.plate { display: inline-block; padding: 14px 20px 14px 80px; background: var(--gold); color: var(--on-gold); font: 700 var(--text-xl)/1.3 var(--font); letter-spacing: var(--tracking); text-align: right; }
```
Elle chevauche le haut d'une image (décalage de -40px) et peut être alignée à gauche ou à droite selon le zigzag.

## Ornement losange

SVG fin blanc : un losange central plein entre deux losanges ajourés reliés par des traits. Posé centré au-dessus et au-dessous d'une vidéo (débord de 10px), ou seul sous un paragraphe (24px).

## Vidéo encadrée

Image 16:9 à coins 4px, logo du jeu en haut à gauche (emplacement), bouton lecture rond blanc 64px avec triangle contour au centre. Au clic, l'image est remplacée par la vidéo.

## Badges de plateforme

Rectangles à contour blanc 0.8px, rayon 4px, logo de la plateforme en blanc, date de sortie en 12px au-dessus si différente.

## Bandeau de notes presse

Bandeau bleu (image) de 1000px, grille 4×2 : note « 9/10 » en 24px 700 blanc encadrée de deux traînées lumineuses, nom du média en capitales 12px dessous.

## Module d'achat

- Colonne gauche : `select` pays, `select` édition (fond transparent, contour blanc 0.8px, rayon 5px, chevron), titre « Sélectionnez la plateforme » 700 18px, **grille 2×3 de tuiles** (contour blanc, logo ; tuile active = fond or, logo bleu nuit).
- Colonne droite : visuel de l'édition (rayon 4px, bouton plein écran carré noir), nom de l'édition 700 18px, bouton or large « Dématérialisé », **accordéon** « Voir le contenu de l'édition » avec « + » or et filet or dessous.

## Boutons flottants

Pile verticale en bas à droite : trois cercles 62px, blancs avec icône or (newsletter, vidéos), le dernier **or avec icône blanche** (panier). Ombre `--shadow`.

## Sous-titre de pitch

Phrase en 700 16px blanc centrée (« Libérez-vous des chaînes… »), un ornement losange dessous, puis des paragraphes 500 16px/24px.

## États

- **Chargement** : 4 points qui tournent (keyframes `dot-move`, `dot-rotate` mesurées), couleur or.
- **Indisponible** : tuile plateforme en pointillés, texte `--muted`, `aria-disabled`.
- **Erreur** : plaque rouge `--red` avec texte blanc, bouton contour or « Réessayer ».
