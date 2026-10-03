# Source — Mint Street Basics

- **Référence** : https://dribbble.com/shots/27774954-Modern-Fashion-E-commerce-Website (shofipy, maquette « SeroWear »)
- **Famille** : Mode / e-commerce streetwear
- **Analysé le** : 2026-10-01 (première version, à l'œil) ; **2026-10-03, réécriture complète** : les deux images du shot téléchargées en pleine résolution, couleurs **lues au pixel**, hauteurs de texte et positions mesurées par balayage des pixels.
- **Ce qui plaît** : le titre géant sur bleu nuit, le disque vert, la fraîcheur du menthe, les formes rondes.

> L'adresse du shot a été retrouvée par recherche lors de la première version : elle n'a pas été confirmée par l'utilisateur comme étant celle qu'il avait en tête. La maquette qu'elle montre est bien celle décrite ici.

## Ce que contient la référence

**Deux images fixes**, aucune vidéo, aucun site en ligne :
1. Une mise en scène (3200 × 2400) montrant le héros et des morceaux de page.
2. La **page d'accueil entière** (1600 × 7106) : une page de 1440px présentée à l'échelle 1 dans un cadre gris de 80px.

**Aucune animation n'est visible** : tout le mouvement décrit dans `motion.md` est proposé par le skill.

## Mesures (image 2, pixels = pixels de la page)

| Élément | Valeur |
|---|---|
| Page | 1440px de large, marges de 80px ; cadre gris #dfdfdf |
| Héros | de 0 à 1106px ; dégradé vertical #1c1d36 (haut) → #13142e (milieu) → #040521 (bas) |
| Bandeau | 82px ; dégradé #29c279 → #28b26d → #279f5f → #269357 |
| Corps | menthe #e5f2e5 sur 3886px |
| Pied | 1872px ; même dégradé bleu nuit ; carte menthe #e5f2e5 |
| Titre du héros | 3 lignes, capitales de 153px de haut, pas de 175px ; « ELEVATED » fait 587px de large ; dégradé #ffffff (haut) → #d3d3d3 (bas) |
| Titre de section | capitales de 89px, pas de 99px ; dégradé #1b1b35 → #4d5161 ; bloc de 481px de large |
| Titre centré | capitales de 80px, 731px de large |
| Titre de fiche | capitales de 73px |
| Chiffres clés | 70px de haut |
| Nom de produit / encart | 28px / 30px de haut |
| Cartes produit | carte double 845px, carte simple 411px, écart 24px, photo de 461px de haut |
| Carte de fiche | 738px de large, dégradé #80d0d0 → #a1dddf |
| Bouton d'achat | 352 × 62px, #08a863 (dégradé ≈ #00c070 → #00a860) |
| Verts du disque | ≈ #00a860 à #00b068 |
| Logotype du pied | ≈ 1222px de large, encre #04051f |

## Police

Le titre est une capitale condensée très grasse. Rapport largeur / hauteur de « ELEVATED » mesuré : 3.84. Comparé à cinq polices libres : Anton 3.9, Bebas Neue 4.04, Big Shoulders Display 4.26, League Gothic 3.47, Oswald 4.7 → **Anton**. Le logotype (serif gras à forts contrastes) et le texte courant (sans géométrique) n'ont pas été identifiés : DM Serif Display et DM Sans sont choisis à l'œil.

## Lu à l'œil (non mesuré au pixel)

- Rayons : cartes ≈ 28px, encart ≈ 22px, puces ≈ 14px.
- Tailles du texte courant (≈ 16px), des liens de navigation (≈ 13px), du bandeau (≈ 20px).
- L'anneau clair autour des pilules, la couleur des étoiles.
- Les coloris des pastilles.

## Proposé par le skill

- **Toutes les animations** et tous les états (survol, taille choisie, « ajouté au panier », favori).
- `--muted`, `--soft`, `--line`, `--green-ink`.
- La pile de cartes animée (la maquette montre une carte et le bord de la suivante).
- Les autres pages (`layouts.md`) et **toute la version mobile**.
- Les images par seconde de `motion.md`, mesurées dans un Chrome sans carte graphique.

## Écarts assumés

| Maquette | Dans le skill | Raison |
|---|---|---|
| Nom « SeroWear », textes anglais, prix en dollars | Boutique fictive « Verveine », textes français, euros | Identité |
| Photos de la maquette (mannequins détourés) | Photos Unsplash sur fond uni, dans des arches et des cartes | Droits ; le détourage est décrit dans `assets.md` |
| Texte **blanc** sur le bandeau vert et sur le bouton d'achat (2,3:1 à 4:1) | Texte **bleu nuit** | Contraste |
| Mannequin détouré qui dépasse du disque | Photo dans une arche | Pas de PNG détouré libre |
| « 10,000+ Cups Brewed Each Month » (légende sans rapport avec la mode) | « Pièces recyclées chaque mois » | Cohérence du contenu |
| Titre de fiche coupé au milieu d'un mot (« ECOESSENTI / ALS ») | Césure propre | Lisibilité |
| Logos de réseaux sociaux | Non repris | Marques |
| Une seule largeur (1440px) | Tailles en `clamp()`, version mobile | Rendre le skill utilisable |
