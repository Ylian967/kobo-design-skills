---
name: showroom-bento
description: Direction artistique « Showroom Bento » pour e-commerce de produits techniques et configurateurs (moto, voiture, vélo, trottinette, électroménager premium, enceinte, objet design), inspirée d'un concept Dribbble de showroom digital de moto. Écran unique dans un cadre arrondi gris clair éclairé au centre comme un studio photo, produit en grand au centre avec ombre au sol, modèles voisins recadrés et estompés sur les bords, flèches dans une pilule blanche, titre gras géométrique avec le nom de marque en rouge, prix géant à droite, groupe de pilules de navigation (active en noir), boutons ronds blancs, et une rangée bento de tuiles blanches serrées (accessoire à acheter, six caractéristiques à icône, configurateur de couleur à pastilles verticales). À utiliser pour une fiche produit premium, un configurateur, une vitrine de gamme ou une app de concession au style « showroom, studio, épuré, bento, automobile ».
---

# Showroom Bento

> Un studio photo dans un écran : le produit au centre sous la lumière, le prix bien en vue, et tout ce qu'il faut pour l'acheter rangé dans une rangée de tuiles blanches.

## L'idée

Tout tient dans **un seul écran encadré** (rayon 16px) au fond **gris studio** éclairé par une **lumière radiale blanche** au centre. Le **produit** occupe le milieu, posé sur une **ombre au sol** floue ; ses **voisins de gamme** dépassent, plus petits et estompés, aux bords gauche et droit — on comprend tout de suite qu'on peut faire défiler. En haut, une **navigation en pilules** (l'active en noir) ; à gauche, le **titre gras** avec le nom de marque en **rouge** ; à droite, le **prix géant** de même graisse. En bas, une **rangée bento** de tuiles blanches presque collées (3px) : accessoire à acheter, six caractéristiques à icône, configurateur de couleur.

Inspiré de : voir `source.md`. On reprend le langage visuel (cadre studio, carrousel à voisins, pilules, bento), jamais l'identité : pas de marque, de monogramme, de modèle, de photo ni de texte d'origine.

## Règles prioritaires

1. **Un écran, un produit** : sur ordinateur, la vitrine tient dans la hauteur de la fenêtre (cadre `min-height: 100vh - 24px`) ; le produit est le plus grand élément.
2. **Studio neutre** : le cadre est gris `--frame` avec lumière `--frame-hi` au centre ; aucune autre couleur de fond.
3. **Le rouge est rare** : monogramme, nom de marque du titre, peinture par défaut, pastille du panier. Jamais en fond de bouton.
4. **Noir = actif ou action** : pilule active, bouton « Commander », « Acheter ». Le reste est blanc.
5. **Bento serré** : tuiles `--tile` à rayon 8px, écart de 3px, contenu en trois niveaux (icône, valeur grasse, étiquette 11px).
6. **Formes** : pilules (999px) pour les actions et la nav, cercles 44px pour les icônes, tuiles 8px, cadre 16px. Rien de carré.
7. Contraste : texte `--ink` partout (≥ 13,7:1) ; légendes `--muted` (5,1:1 sur le cadre) ; le rouge `--accent` n'écrit qu'en grand sur le cadre (4:1, titre ≥ 32px gras) et `--accent-ink` en petit.
8. Accessibilité : cibles ≥ 44px (pastilles de couleur incluses), focus visible, carrousel pilotable au clavier (← →), changement de modèle annoncé (`aria-live`), `prefers-reduced-motion` respecté.
9. Aucune valeur en dur : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier. |
| `references/components.md` | Cadre studio, pilules, boutons ronds, titre + prix, carrousel à voisins, ombre au sol, tuiles accessoire / caractéristique / couleur, pastilles, badge. |
| `references/layouts.md` | Écran vitrine, grille bento, tablette, mobile. |
| `references/motion.md` | Changement de modèle, entrée du bento, changement de peinture. |
| `references/assets.md` | Avant de placer une photo produit : cadrages du carrousel, accessoire, teintes, rendus détourés, sources, prompts IA, 3D optionnelle. |
| `examples/demo.html` | Page complète (marque fictive « Vantor Moto »). |
| `source.md` | Shot de référence, ce qui a été vu, écarts. |

## Typographie

| Rôle | Police (Google Fonts) | Réglages |
|---|---|---|
| Titre produit, prix | **Outfit** 700 | `--text-title` 32–44px, interligne 1.05, -0.02em ; « € » en 500 `--muted` |
| Titres de tuiles, valeurs | Outfit 600 | 16–18px |
| Nav, boutons, texte | **Inter** 500 / 400 | 14px ; légendes et étiquettes 11px `--muted` |

La police du shot n'est pas identifiée : c'est une grotesque géométrique grasse ; Outfit en est l'équivalent gratuit le plus proche à l'œil (alternatives : Manrope 800, Plus Jakarta Sans 700).

## Couleurs

| Rôle | Token | Usage |
|---|---|---|
| Autour du cadre | `--page` | fond de la page |
| Studio | `--frame`, `--frame-hi` | fond du cadre, lumière centrale |
| Tuiles | `--tile`, `--soft` | tuiles, pilules, boutons ronds ; fonds de visuels, survols |
| Texte | `--ink`, `--muted` | titres, valeurs ; légendes, étiquettes, « € » |
| Action | `--ink` / `--on-ink` | pilule active, Commander, Acheter |
| Marque | `--accent`, `--accent-ink`, `--on-accent` | monogramme, nom de marque, badge |
| Produit | `--paint-*`, `--metal*`, `--rubber`, `--rim`, `--glass` | rendus et pastilles — jamais du texte |

## Images et 3D

Le produit se montre en **vraies photos** : de préférence des rendus ou packshots **détourés** de profil posés sur l'ombre au sol ; à défaut, une photo studio dans un cadre arrondi (jamais de faux détourage). Le carrousel enchaîne une photo par modèle, la tuile accessoire montre la vraie photo du casque, la tuile couleur une photo par teinte. 3D optionnelle (configurateur à 360°). Jamais de moto, de casque ou de produit dessiné en CSS/SVG : détails dans `references/assets.md`.

## Signature

**Le carrousel studio** : produit centré sous la lumière radiale, ombre elliptique au sol, voisins recadrés et estompés (opacité .5, flou 1px, désaturés) aux deux bords, et une pilule blanche « ← 01 / 03 → » centrée sous le produit. Associée à la **rangée bento** juste en dessous. Une fois par page.

## À éviter

- Des fonds colorés, des dégradés vifs ou des ombres lourdes sur les tuiles (ombre 1px au plus).
- Espacer les tuiles du bento (le 3px fait le style) ou varier leurs rayons.
- Un rouge en aplat de bouton ou de bandeau : il perd sa valeur de marque.
- Faire défiler la vitrine sur ordinateur : tout doit être visible d'un coup.
- Reprendre la marque, le monogramme, le nom du modèle, les photos ou les textes du shot de référence.

## Adaptation React / React Native

- Cadre studio : `View` avec `borderRadius: 16`, `overflow: 'hidden'` et une `RadialGradient` (`react-native-svg`) en fond.
- Carrousel : `FlatList` horizontale avec `snapToInterval`, `contentInset` négatif pour laisser voir les voisins ; opacité et échelle des voisins interpolées sur `scrollX` (Reanimated).
- Ombre au sol : ellipse `RadialGradient` SVG sous l'image (les ombres natives ne font pas d'ellipse floue).
- Bento : `View` en `flexWrap` avec `gap: 3` (RN ≥ 0.71).
- Pastilles de couleur : `Pressable` 44×44 avec `accessibilityRole="radio"` et `accessibilityState={{ checked }}`.
- Polices : `@expo-google-fonts/outfit`, `@expo-google-fonts/inter`.

## Avant de livrer

- [ ] Tokens importés, aucune couleur en dur.
- [ ] Cadre studio arrondi avec lumière centrale ; vitrine contenue dans la hauteur de l'écran (ordinateur).
- [ ] Produit centré avec ombre au sol ; voisins recadrés et estompés ; pilule de navigation du carrousel.
- [ ] Titre gras avec nom de marque rouge ; prix géant à droite (« € » en `--muted`).
- [ ] Bento à 3px : accessoire, six caractéristiques, couleur.
- [ ] Pilules et boutons : repos, survol, appui, focus, désactivé ; pastilles avec coche.
- [ ] Testé à 390px et 1440px, sans défilement horizontal ; clavier ← → ; mouvement réduit respecté.
- [ ] Aucun élément de la marque d'origine.
- [ ] Vraies images (ou 3D) traitées selon `references/assets.md`, avec `alt` et couleur de repli.
