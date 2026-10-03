# Source — Showroom Bento

- **Référence** : https://dribbble.com/shots/27766449-Motorcycle-E-Commerce-Website-Design (« Motorcycle E-Commerce Website Design », par Nixtio)
- **Famille** : E-commerce / showroom produit
- **Analysé le** : 2026-10-01 (première version, à l'œil) ; **2026-10-03, réécriture complète** : image téléchargée en pleine résolution, couleurs **lues au pixel**, tailles et positions mesurées par balayage des pixels.
- **Ce qui plaît** : le produit seul sous une lumière de studio, les voisins coupés par les bords, la rangée de tuiles blanches très serrées.

## Ce que contient la référence

- **Une seule image fixe** (3200 × 2400) : un écran de 2840 × 2000px posé sur un fond sombre, soit une page de 1440 × 1014px à l'échelle 1.97.
- Une vidéo de 12s jointe au shot : c'est un bandeau promotionnel du studio, sans rapport avec ce style.
- Les autres images visibles sur la page du shot appartiennent à d'autres projets du même studio.
- Aucun site en ligne. **Aucune animation n'est visible** : tout le mouvement de `motion.md` est proposé.

## Mesuré (lecture des pixels ; valeurs ramenées à 1440px)

| Élément | Valeur |
|---|---|
| Fond de l'écran | #e9e9e9 |
| Encre (texte, pilule active, boutons) | #1b1d1c |
| Rouge (marque, monogramme, pastille) | #cf1f22 |
| Tuiles, pilules | #ffffff |
| Pastilles | #cf1f22, #efd82a, #003581, #d9d9db, #1b1d1c |
| Flèches | #8e8e8e ; symbole du prix #c7c7c7 |
| Écran | 1440 × 1014px |
| Marges | 40px (monogramme, titre, bouton de droite) |
| Pilules de navigation | 134 × 50px, écart de 10px ; boutons ronds de 50px ; « Order » 129 × 50px |
| Titre | capitales de 47px de haut (≈ 67px de corps), à 166px du haut de l'écran |
| Pilule à flèches | 105 × 51px |
| Rangée bento | 240px de haut : deux rangées de 118px ; écart et marge de 4px |
| Colonnes bento | 427 / 187 / 187 / 187 / 427px |
| Bouton d'achat | 150 × 50px ; prix de l'accessoire : capitales de 31px (≈ 44px de corps) |
| Pastilles | 31px de diamètre, au pas de 37px |

## Lu à l'œil (non mesuré)

- Rayons du cadre (≈ 16px) et des tuiles (≈ 12px).
- Tailles des légendes, des valeurs et des étiquettes de caractéristique.
- Le halo clair de la scène, l'anneau et l'ombre au sol.
- Taille et place des voisins.

## Police

Grotesque géométrique **non identifiée**. Outfit est choisie à l'œil.

## Proposé par le skill

- **Toutes les animations** et tous les états (survol, focus, glissement, relais des textes, défilement du prix, suivi du pointeur).
- Le **détourage dans la page** et la **simulation des teintes** (la référence montre des rendus prêts à l'emploi).
- `--muted`, `--accent-ink`, `--outer`, `--light`, les ombres.
- Tablette, mobile et autres écrans (`layouts.md`).
- Les images par seconde de `motion.md`, mesurées dans un Chrome sans carte graphique, à 1440px seulement.

## Écarts assumés

| Maquette | Dans le skill | Raison |
|---|---|---|
| Marque et modèle réels de moto, textes anglais | Marque fictive « Orphée », modèles inventés, textes français | Identité |
| Une moto | Un casque audio | Aucune photo libre de moto sur fond de studio uni n'a été trouvée ; le style vaut pour tout produit technique |
| Rendus détourés fournis | Photos Unsplash détourées dans la page | Droits |
| Une image par teinte | Teintes calculées à partir de la photo noire | Une seule photo par modèle |
| Vue de face dans la tuile de teinte | La même vue que le centre, en petit | Idem |
| Casque détouré dans la tuile accessoire | Photo entière en cadre arrondi | Idem |
| Légendes gris clair | `--muted` #666666 (4,7:1) | Contraste |
| Prix en dollars | Euros, symbole après le nombre | Contenu localisé |
| Pastilles de 31px | Zone de clic agrandie à 47px | Cible tactile |
| Une seule largeur | Tablette et mobile | Rendre le skill utilisable |

## Limites connues de la démo

- Le détourage est automatique : de près, les bords sont un peu doux et quelques reflets clairs du produit deviennent transparents.
- Une petite inscription de marque reste lisible sur la branche d'un des casques photographiés.
- Les teintes sont une simulation : un vrai coloris n'a pas exactement ce rendu.
