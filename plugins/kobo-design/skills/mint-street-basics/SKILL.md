---
name: mint-street-basics
description: Direction artistique « Mint Street Basics » pour e-commerce de mode et de vêtements de tous les jours (basiques, streetwear, sweat, t-shirt, marque textile éthique, drop de collection), inspirée d'un concept Dribbble de boutique de mode moderne. Héros bleu nuit avec titre géant en capitales condensées très grasses (type Anton), chiffres « 120+ » au « + » vert, mannequin devant un grand arc vert qui passe du vert franc au menthe, pilule blanche « Explorer », logotype à empattements ; bandeau défilant vert ; corps de page menthe pâle, cartes produit arrondies 16px blanches ou vert pâle, noms en capitales condensées, prix et pastilles de couleur ; fiche produit avec étoiles, puces de taille carrées arrondies (choisie en blanc), pilule verte « Ajouter au panier » et bouton favori carré ; pied de page bleu nuit avec collage de cercles et logotype géant sur carte menthe. À utiliser pour une boutique en ligne, une fiche produit, une page collection, un lancement de marque de vêtements ou une app shopping au style « frais, sportif, condensé, vert et bleu nuit ».
---

# Mint Street Basics

> Une vitrine de basiques qui crie en capitales condensées sur bleu nuit, puis respire sur un fond menthe où tout ce qui se vend est vert.

## L'idée

Le visiteur doit sentir une marque **jeune, nette et rassurante** : des vêtements simples présentés avec l'énergie d'une affiche de sport. Le langage vient des boutiques de mode en ligne récentes : **ouverture bleu nuit** avec un titre géant en **capitales condensées**, un **mannequin détouré devant un arc vert**, puis un **corps menthe pâle** où les produits flottent sur des cartes arrondies. Le style vit dans les titres condensés, l'arc vert, le **bandeau défilant** et le **vert d'action** ; les cartes, les prix et les textes restent sobres et lisibles. Le logotype à empattements apporte une note « maison » qui adoucit le tout.

Inspiré de : voir `source.md`. On reprend le langage visuel (proportions, rythme, traitements), jamais l'identité : pas de nom de marque, de logotype, de photo ni de texte du shot d'origine.

## Règles prioritaires

1. **Deux mondes, un vert** : bleu nuit `--navy` pour l'ouverture et la clôture, menthe `--mint` pour le corps ; le vert relie les deux (arc, « + », bandeau, bouton d'achat).
2. **Les titres crient, le reste parle** : capitales condensées Anton pour le héros, les titres de section et les noms de produit ; tout le reste en DM Sans 400–700, petit et calme.
3. Contraste : texte courant ≥ 4,5:1 ; le vert franc `--green` ne porte que du **grand** texte blanc (bandeau en 24px) ; les boutons d'achat utilisent `--green-strong` ; le vert en petit texte sur menthe est `--green-ink` (paires vérifiées dans `references/tokens.css`).
4. **Formes** : pilules pour les actions, cartes à 16px, puces de taille et bouton favori en carré arrondi 8px, cercles pour le collage et l'arc. Pas d'angles vifs.
5. **Le produit flotte** : vraie photo du vêtement, packshot détouré sur fond blanc ou vert pâle (légère ombre portée) ou photo cadrée en passe-partout dans la carte ; jamais de photo d'ambiance pleine carte.
6. **Mouvement vif et élastique** : bandeau qui défile en continu, arc qui tourne en entrant, badge du panier qui rebondit, cartes qui montent de 4px au survol.
7. Accessibilité : cibles ≥ 44px (pastilles de couleur comprises), focus visible (vert vif sur bleu nuit, vert foncé sur menthe), `prefers-reduced-motion` respecté, groupes de taille et de couleur au clavier (flèches).
8. Aucune valeur en dur : couleurs, polices, tailles, rayons et durées viennent de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root` dans le projet. |
| `references/components.md` | Avant de coder une pilule, la navigation, une carte produit, des pastilles, des puces de taille, le bandeau, l'arc, un champ. |
| `references/layouts.md` | Avant de construire une page : héros, collection, fiche produit, pied de page, mobile. |
| `references/motion.md` | Avant d'ajouter une animation ou une transition. |
| `references/assets.md` | Avant de placer une image ou une scène 3D : portés, packshots, fenêtre ronde du héros, passe-partout des cartes, sources, prompts IA, 3D optionnelle. |
| `examples/demo.html` | Pour voir le résultat attendu et reprendre des morceaux. |
| `source.md` | Pour connaître le shot de référence et ce qui a été estimé. |

## Typographie

| Rôle | Police (Google Fonts) | Poids | Taille | Interligne | Espacement |
|---|---|---|---|---|---|
| Titre du héros | **Anton** | 400 (déjà très gras) | `--text-hero` 56–120px | 0.92 | capitales |
| Titres de section | Anton | 400 | `--text-title` 36–72px | 0.92 | capitales, un mot en vert possible |
| Chiffres clés | Anton | 400 | `--text-stat` 36–52px | 1 | « + » en `--green-bright` |
| Nom produit | Anton | 400 | 16–18px | 1.1 | capitales |
| Logotype | **DM Serif Display** | 400 | 32px (barre), jusqu'à 320px (pied) | 0.78 | -0.03em, minuscules + point vert |
| Texte, prix, boutons | **DM Sans** | 400 / 500 / 700 | 12–18px | 1.55 | boutons et surtitres en capitales +0.1em |

La police du shot ressemble à Anton / Bebas Neue ; Anton est l'équivalent gratuit choisi à l'œil. La pile de secours (`'Arial Narrow', Impact`) garde l'effet condensé si Google Fonts ne charge pas.

## Couleurs

| Rôle | Token | Usage |
|---|---|---|
| Ouverture / clôture | `--navy` #15162e, `--navy-2` | Héros, pied, puce de filtre active |
| Corps | `--mint` #e3f3e3 | Fond de toutes les sections produit |
| Cartes | `--card` blanc, `--card-alt` vert pâle | En alternance dans la grille |
| Texte | `--ink` #2a2d4a, `--muted` #4f5466 | Sur menthe et sur cartes |
| Texte inversé | `--text-inv`, `--muted-inv` | Sur bleu nuit |
| Vert de marque | `--green` #22a650 → `--green-light` | Bandeau, arc, bulle du collage |
| Vert d'action | `--green-strong` #18823f | « Ajouter au panier », « S'inscrire » |
| Vert vif | `--green-bright` | « + », pastilles, focus sur bleu nuit |

**Règle de l'accent** : le vert signale ce qui fait vendre ou avancer (achat, promo, chiffres). Jamais en fond de carte produit.

## Images et 3D

Les vêtements et le mannequin sont de **vraies photos** : porté net en lumière du jour dans la fenêtre ronde du héros, packshots détourés ou photos en passe-partout dans les cartes 4:5, une vraie photo par coloris sur la fiche, portés variés dans les cercles du collage. Couleurs naturelles, jamais de filtre vert sur le vêtement ; chaque conteneur garde un fond token (`--card`, `--card-alt`, `--navy-2`) en repli. La 3D est optionnelle (vue 360° du modèle `.glb` du produit sur la fiche). Jamais de dessin CSS/SVG à la place d'une photo, d'un mannequin ou d'un vêtement : détails dans `references/assets.md`.

## Signature

**Le héros à l'arc vert** : titre condensé géant sur trois lignes à gauche, chiffres « 120+ / 15k+ » et pilule blanche « Explorer » dessous ; à droite, la photo d'un mannequin dans une fenêtre ronde, coupée par le bas du héros, entourée d'un **anneau vert en dégradé** (vert franc → menthe, ouvert sur un quart) posé sur un disque plus sombre. Suivi immédiatement du **bandeau vert défilant**. Une fois par page.

## À éviter

- Des titres en minuscules ou en graisse normale : le condensé capitale fait le style.
- Le vert franc avec du petit texte blanc (3,2:1) : passer à `--green-strong` ou agrandir.
- Des cartes produit à fond photo, des ombres lourdes, des rayons différents d'une carte à l'autre.
- Plus d'un bandeau défilant par page, ou un bandeau qui ne s'arrête pas au survol.
- Le logotype en sans-serif : il doit rester à empattements, avec le point vert.
- Copier des assets, logos, textes ou interfaces du shot de référence.

## Adaptation React / React Native

- Arc du héros : `react-native-svg` (`Circle` avec `strokeDasharray` et `LinearGradient` vert → menthe), rotation d'entrée avec Reanimated.
- Bandeau : deux copies du texte dans une `Animated.View` translatée en boucle (`withRepeat(withTiming(-width))`), arrêt quand l'écran perd le focus.
- Cartes : `FlatList` à 2 colonnes, `borderRadius: 16`, photo via `expo-image` (`contentFit="contain"` pour un détouré, `"cover"` en passe-partout).
- Puces de taille et pastilles : `Pressable` 44×44 avec `accessibilityRole="radio"` et `accessibilityState={{ checked, disabled }}`.
- Badge du panier : `withSpring` sur l'échelle à chaque ajout ; retour haptique léger (`expo-haptics`).
- Polices : `@expo-google-fonts/anton`, `@expo-google-fonts/dm-serif-display`, `@expo-google-fonts/dm-sans`.

## Avant de livrer

- [ ] Tokens importés, aucune valeur en dur.
- [ ] Héros bleu nuit : titre condensé, chiffres au « + » vert, pilule blanche, photo du mannequin dans l'arc vert.
- [ ] Bandeau vert défilant (texte ≥ 24px), en pause au survol, figé en mouvement réduit.
- [ ] Corps menthe : cartes 16px alternées blanc / vert pâle, noms condensés, prix, pastilles 44px.
- [ ] Fiche produit : étoiles, puces de taille (choisie en blanc, épuisée barrée), pilule verte + favori carré.
- [ ] Pied bleu nuit : collage de cercles, inscription, logotype géant sur carte menthe.
- [ ] Vraies images (ou 3D) traitées selon `references/assets.md` (portés, packshots, une photo par coloris), avec `alt` et couleur de repli.
- [ ] Testé à 390px et 1440px, sans défilement horizontal ; mouvement réduit respecté.
- [ ] Aucun élément du shot d'origine (nom, logotype, photos, textes).
