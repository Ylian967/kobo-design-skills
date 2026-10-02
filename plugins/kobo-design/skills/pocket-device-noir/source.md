# Source — Pocket Device Noir

- **Site de référence** : https://dribbble.com/shots/27771993-Noda-AI-Companion-Website-Design (shot Dribbble « Noda — AI Companion Website Design »)
- **Famille** : Produit tech / objet connecté
- **Analysé le** : 2026-10-01, Chrome

## Ce qui a été vu

- **Produit** : site sombre pour un assistant vocal IA de poche — boîtier noir, molette ronde, petit écran LCD (« 09:42 LISTENING… »), bouton rouge sur le dessus.
- **Héros** : photo de bureau chaleureuse (bois, café) assombrie jusqu'au noir en bas ; grand titre blanc centré en grotesque serrée (« Meet CUE. », ~64px), petit sous-titre gris, deux petits boutons : blanc plein et sombre transparent à contour. Carte de verre flottante en bas à droite (« Hot Offers! ») avec bouton blanc. Petits libellés dans les coins gauche et droit (« Cue A01 Model », « AI Companion »).
- **Navigation** : petit logo avec un petit carré, liens minuscules centrés, petit bouton blanc « Shop Now » (rayon ~4px).
- **Manifeste** : section noir pur #000 avec de fins rayons en éventail (filets en soleil), texte blanc centré ~26px, quelques mots surlignés en rouge (~#e5343a).
- **Nom géant** : nom de produit en très grand gris sombre (~#2a2a2a, contour ou atténué) derrière le rendu de l'objet.
- **Fonctions** : petits panneaux de verre sombre (blanc à 8 %, contour 1px) avec petites étiquettes (« Inside CUE A01 »), texte à gauche ; textures de roche sombre ; petites étiquettes grises (rayon ~3px, fond ~#2a2a2a).
- **Témoignages** : rangée de petites cartes avec avatar, nom et rôle.
- **Photos d'ambiance** : tissu orange chaud, roche noire. Palette relevée : #000, #0d0d0d, #1a1a1a, blanc, gris #8a8a8a, rouge #e5343a, tons chauds des photos.

## Non mesuré

- Il s'agit d'un **mockup Dribbble** : analyse visuelle des images uniquement, aucun site en ligne, aucun code inspecté.
- Toutes les valeurs (couleurs, tailles, rayons, flous) sont **estimées à l'œil** et arrondies sur une échelle de 4px.
- La police n'est pas identifiée : **Geist** et **Geist Mono** sont choisies à l'œil.
- Aucune animation n'est visible sur des images fixes : le mouvement (`motion.md`) est une proposition.
- L'appel final et le pied de page ne sont pas visibles dans les notes : ils sont extrapolés.

## Écarts assumés

| Élément du shot | Dans le skill | Raison |
|---|---|---|
| Nom du produit, logo, textes en anglais | Produit fictif « Ora P1 », logo carré inventé, textes en français | Marque et droits d'auteur |
| Rendus 3D de l'objet, photos de bureau, roche, tissu | Objet dessiné en CSS (boîtier, écran, molette, bouton) et ambiances en dégradés, dans des emplacements `data-slot` | Droits d'auteur ; à remplacer par vos rendus et photos |
| Texte gris des étiquettes sur #2a2a2a (contraste faible) | `--chip-text` #a6a6a6 (5,9:1) | Contraste ≥ 4,5:1 |
| Rouge #e5343a en texte sur gris #1a1a1a (4,1:1) | Rouge en texte uniquement sur noir (4,9:1) ; `--red-text` #ff5a5f sur gris (5,7:1) | Contraste |
| Nom géant #2a2a2a | `--giant` #1f1f1f + contour blanc à 8 % (décor, `aria-hidden`) | Rester en arrière-plan sans gêner la lecture |
| Petit bouton « Shop Now » (~32px) | Hauteur 36px visible + zone cliquable étendue à 44px | Cible tactile |
| Prix en dollars, offre « Hot Offers! » | « Offre du moment », prix en euros | Contenu localisé |
| Composition ordinateur uniquement | Version mobile (menu repliable, carte d'offre pleine largeur, légendes en grille sous l'objet) | Adaptation |
