# Cosmic Voyage — composants

Toutes les valeurs viennent de `tokens.css`. Code complet dans `examples/demo.html` (accueil) ; la carte et la fiche d'un monde n'ont pas de page d'exemple. « Mesuré » = lu dans le navigateur à 1440px ; « observé » = relevé sur capture (beaucoup d'éléments du site sont des images de fond) ; « proposé » = ajouté par le skill.

## 1. Barre de navigation (mesuré)

Barre **`--nav` de 57px**, pleine largeur, fixe. De gauche à droite :
- **égaliseur** : 5 petites barres grises qui bougent (musique de fond) ;
- **liens** en 15px, blancs, 110 à 150px de large chacun ; lien courant **bleu `--link`** avec un filet bleu de 2px au bas de la barre ;
- « Connexion » + icône ronde ;
- **plaque dorée « Télécharger maintenant »** collée au bord droit, 168 × 54px, texte noir gras sur deux lignes, coin bas gauche arrondi.
Mobile : pilule blanche « Télécharger maintenant » à gauche, trois traits à droite.

## 2. Logotype

Mot en capitales italiques grasses très espacées, surmonté d'un petit mot doré. En haut à gauche de l'intro et du héros, centré dans le pied. C'est un signe : il reste en texte.

## 3. Héros (observé)

Visuel clé plein écran (illustration de la version en cours sur le site). En bas, centrés : **plaques de boutique** rectangulaires sombres à bord fin (44px), puis le **bouton lecture rond** à anneau dégradé violet → bleu → orange. Tout en bas : « Défiler » et un trait vertical qui respire. Mobile : un seul **gros bouton jaune** `--cta-yellow` à bord doré et lueur.

## 4. Rail « Suivre » (observé)

Fixe au bord droit, centré en hauteur : le mot « Suivre » écrit verticalement, un petit trait, puis une colonne de **pastilles rondes blanches** de 26px (cible de 44px). Survol : pastille dorée.

## 5. Frise du voyage et titre de section (signature, observé)

À gauche du contenu, un **filet doré vertical** court sur toute la page ; devant chaque section, un **nœud** : anneau doré de 18px avec un point au centre. Le **titre de section** est un petit cartouche : barre verticale grise de 2px, texte 15px blanc, fond noir qui s'efface vers la droite (≈ 240 × 34px).

```css
.sec__title { display: inline-flex; align-items: center; min-width: 240px; height: 34px; padding: 0 var(--space-4); border-left: 2px solid var(--muted);
  background: linear-gradient(90deg, color-mix(in srgb, var(--bg-deep) 70%, transparent), transparent); }
.sec__title::before { /* nœud */ width: 18px; height: 18px; border: 1px solid var(--gold); border-radius: 50%; background: radial-gradient(circle, var(--gold) 3px, var(--bg) 4px); }
```

## 6. Carte d'actualité à un seul coin arrondi (signature, mesuré)

**424 × 331px**. Cadre fin doré, fond sombre, **seul le coin haut droit est arrondi** (`--radius-card` : 28px). Image 396 × 227. Dessous : date en `--gold` 11,8px à gauche, « + more » gris à droite, titre 12,4px / 20,5px en `--text` sur deux lignes.

```css
.ncard { border: 1px solid color-mix(in srgb, var(--gold) 45%, transparent); border-radius: var(--radius-card); background: color-mix(in srgb, var(--surface) 86%, transparent); }
```
Autour : flèches rondes à contour (44px), compteur « 01 / 05 » (24px + petit), bouton « En savoir plus ».

## 7. Bouton contour « En savoir plus » (mesuré)

**146 × 27px**, bord 0,8px `--line`, texte 11px `--text-soft`, sans arrondi. Survol : fond et bord `--accent`, texte noir.

## 8. Bouton principal doré (mesuré)

Fond `--accent`, texte noir, bord 0,8px `--accent`, rayon 12px, `all 0.2s linear`. Accolé à un champ, il n'arrondit que son côté droit.

## 9. Carte de personnage (mesuré)

**226 × 486px**, même cadre doré et même coin haut droit arrondi. Portrait plein cadre, fondu noir en bas, **nom centré** 16,9px blanc, petit **losange** de couleur sous le nom. La carte choisie garde un bord doré plein.

## 10. Frise d'emblèmes (signature, mesuré + observé)

Colonne à gauche de la fiche : emblèmes ronds de **108 × 98px** enfilés sur un filet doré, chevrons en haut et en bas. Emblème inactif : terne, libellé gris `#6f6e6e` 11,8px gras. Actif : éclairé, plus grand, libellé blanc. Les dessins des emblèmes sont des signes (SVG) propres à chaque projet.

## 11. Panneau de verre du personnage (signature, mesuré + observé)

Bloc d'environ **450 × 497px de contenu**, coins de 12px. **En-tête bleu nuit** `--glass` (≈ 99px) : icône de voie, nom en **29,8px** Regular, ligne « Voix : … » en 10,7px. **Corps en verre bleu clair** `--glass-light`. Dedans : une **boîte de texte claire** (12,4px / 19,7px, texte sombre). Le **portrait** déborde à droite et se fond dans le panneau. Sur le portrait, la **citation en bandes** : chaque ligne sur son ruban noir à 72 %, en serif italique, alignée à droite. En bas : une rangée de **vignettes carrées** des autres personnages (48px, active à bord doré).

## 12. Carte stellaire des mondes (observé)

Fond bleu nuit en dégradé radial. De **grands cercles** se croisent : traits pleins fins et **pointillés épais**. Chaque monde est une **icône ronde lumineuse** (photo ou rendu) avec halo bleu et libellé 11px dessous. Étiquette de page en haut à gauche. Fiche d'un monde : illustration floutée en fond, bouton « Retour », titre centré, carrousel de lieux (image centrale nette, voisines assombries).

## 13. Liste d'actualités (page Informations, mesuré)

**Onglets** en 16,9px séparés par une petite étoile ; actif en `--gold`. Chaque article : bandeau de **993 × 151px** au coin haut droit arrondi, vignette à gauche, titre 16,9px / 21,4px, extrait gris, date en bas à droite. Bouton pleine largeur « En savoir plus » sous la liste.

## 14. Bande d'abonnement et pied (mesuré)

Bande `--sub` : titre gras 24px sur deux lignes et texte à gauche ; à droite champ sombre + bouton doré, case de consentement dessous. Pied noir : logotypes centrés, liens gris.

## États

- **Chargement** : saut en hyperespace (voir `motion.md`).
- **Image absente** : cartes sur fond `--surface-2`, héros sur `--bg-top`, panneau lisible sans portrait.
- **Formulaire** : erreur (liseré `--accent-hot`, message doré, `aria-invalid`, focus renvoyé), consentement manquant, envoi (`aria-busy`), confirmation en `aria-live`.
- **Carrousel** : flèche désactivée en bout de course (30 % d'opacité).
- **Focus clavier** : contour doré 2px décalé de 3px. **Cibles tactiles** : 44px.
