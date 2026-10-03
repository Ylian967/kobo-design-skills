# Chrome Atelier — mises en page

## Grille et conteneur

- Marges latérales `--edge` (20 → 56px). Pas de conteneur centré étroit : la planche occupe toute la largeur, les filets touchent les bords.
- Héros produit en grille 3 colonnes `1.25fr / 1.1fr / .75fr` : texte, pièce, légendes.
- Point de rupture principal : 900px.

## En-tête

Absolu (il défile avec le héros), transparent, padding 24px. Logo à gauche ; liens + pilule à droite. Sur la scène nuit, la même barre passe en `--on-night` si elle est fixe.

## Page produit « atelier » (héros)

```
OSSEL                         À PROPOS  VU DANS  PHOTOS  FAQ  (LISTE D'ATTENTE)
 ╲                             │                              ╱
   ╲            .───────────── │ ─────────────.             ╱
[ PIÈCE SIGNATURE ]         ╱  │   ┌──────┐     ╲  ─── • OR JAUNE
MATIÈRES MAGNIFIQUES       │   │   │pièce │      │
    SAVOIR-FAIRE SUPERBE ──┼───┼───┤  3D  ├──────┼─────────────────────
texte 3 lignes             │   │   └──────┘      │  ─── • OR BLANC
(RÉSERVER →) (VOIR)         ╲  │                ╱      POIDS 14,2 g
                              '────────────────'
01 / 04                TITRE  10K, 14K, 18K, 22K                DÉFILER ↓
```
Hauteur `max(100vh, 760px)`, padding haut 120px (sous la nav), bas 96px. Les coins portent un index mono (`01 / 04`) et l'aide « Défiler ↓ ».

## Scène nuit

```
[ MANIFESTE ]                                   ◯ cercles-guides
DES ANNÉES DE                           ( portrait, pièce à l'oreille )
      TECHNIQUE HUMAINE
  ET DE DESSIN
        NOUS ONT MENÉS ICI.   ← dernière ligne en --muted-night
(REJOINDRE LA LISTE →)
──────────────────┬──────────────────┬──────────────────
ÉPAISSEUR         │ PRIX             │ VOLUME
6 MICRONS         │ 1 000 €          │ 0,7 CM³
```
La photo (portrait réel, voir `assets.md`) occupe les deux tiers droits et se fond dans `--night` vers la gauche ; le visage et la pièce sont à droite, le titre à gauche peut chevaucher la zone sombre de la photo mais jamais la pièce. Barre de caractéristiques collée en bas, pleine largeur.

## Presse

Une ligne : étiquette `[ vu dans ]` (180px) + mots-symboles répartis (`space-between`), padding 64px, filet bas.

## Communauté / liste d'attente

Photo nuit sur ~74 % de la hauteur de la section, panneau `--paper` (620px max) aligné à droite qui démarre dans la photo et dépasse en dessous. Après envoi, le panneau affiche la confirmation.

## Pied de page

Une ligne mono 11px : mention à gauche, liens à droite, filet haut.

## Adaptation mobile (≤ 900px)

- Nav : logo + bouton menu rond 44px ; menu en panneau `--paper`.
- Héros : une colonne — étiquette, titre (lignes autorisées à se replier, indentation 1.2em), texte, pilules (empilées si besoin), puis la pièce dans son cercle (`--ring-size: min(84vw, 420px)`). Les filets restent pleine page.
- Légendes : deux seulement, posées de part et d'autre de la pièce avec un trait court (28px) ; la note « Poids » est masquée ; index et aide de coin masqués.
- Sélecteur de titre d'or : centré sous la pièce, légende au-dessus.
- Scène nuit : titre en haut, portrait recadré en bas à droite, barre de caractéristiques en liste (étiquette à gauche, valeur à droite).
- Presse : liste en flux, alignée à gauche.
- Communauté : photo 340px, panneau pleine largeur qui chevauche le bas de la photo.

---

## Ordre réel de la page (site en ligne, 1536px, ~7 100px)

1. **Héros nuit** plein écran : photo gros plan, titre décalé 4 lignes à gauche, 2 pilules, mention presse 0.75rem, nav empilée à droite, barre de caractéristiques en bas.
2. **Atelier** épinglé (fond blanc) : étiquette, titre 2 lignes, texte, pilule « Acheter » + lien souligné « Collection privée » ; pièce au centre du cercle, légendes, titres d'or.
3. **Presse** : étiquette `[presse]`, titre 2 lignes, rangée de logos défilante, cartes d'article révélées.
4. **Galerie** : texte à gauche, deux colonnes de photos décalées à droite.
5. **Inscription** : écran nuit + carte blanche de formulaire.
6. **FAQ** : titre à gauche, 11 questions.
7. **Pied** noir 285px.

Racine fluide : `html { font-size: 0.9vw }` (desktop) — toutes les tailles en rem suivent la largeur ; à figer par `clamp()` sous 992px. Points de rupture mesurés (Webflow) : 991px, 767px, 479px.

## Mobile observé (vidéo du shot)

Confirmation en plein écran : photo en haut (40 %), titre 2 lignes, texte, pilule encre en bas à gauche. Les écrans en mobile suivent l'ordre desktop, en une colonne.
