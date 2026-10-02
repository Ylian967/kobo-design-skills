---
name: sticker-brutal-jp
description: Direction artistique « Sticker Brutal JP » — néo-brutalisme joyeux à la japonaise pour portfolios de freelance, sites de designer, studios, landings de service ou pages « à propos » bilingues japonais / anglais. Page pêche, contenu posé dans un grand cadre façon fenêtre de navigateur à contour noir épais, autocollants plats (demi-cercles, carrés arrondis, étoiles) à contour noir et ombre décalée sans flou, titre latin énorme très gras, sous-titres japonais en Noto Sans JP 900, katakana vertical jaune contouré de noir, portrait noir et blanc découpé en hexagone sur fond rose, bulles et pastilles inclinées, bouton jaune qui s'enfonce au clic. À utiliser quand on demande : néo-brutalisme, neubrutalism, brutalist, sticker, autocollant, ombre dure, hard shadow, contour noir, style japonais, Japan, kawaii pop, site en japonais, localisation japonaise, portfolio coloré, freelance, personal brand. Fournit tokens, composants, mises en page, animations et une page d'exemple.
---

# Sticker Brutal JP

> Un carnet de stickers collé sur une fenêtre de navigateur : noir franc, couleurs bonbon, et du japonais qui tape fort.

## L'idée

Le visiteur doit sentir une **personne** derrière la page, drôle et sûre d'elle. Le langage vient du néo-brutalisme web (contours noirs épais, ombres décalées sans flou, aplats saturés) adouci par des coins arrondis et une palette pastel-bonbon, puis **localisé en japonais** : titres latins massifs pour l'impact, mais tout le sens passe par du japonais très gras et lisible. Le style vit dans les **autocollants** (formes, bulles, pastilles, tuiles d'icône) et dans le **cadre** qui contient la page ; le texte courant reste sobre, noir sur papier crème.

Inspiré de : voir `source.md`. On reprend le langage visuel (proportions, rythme, traitements), jamais l'identité : pas de logo, de portrait, de nom ni de texte du shot d'origine.

## Règles prioritaires

1. **Tout ce qui est « objet » est un autocollant** : aplat de couleur + contour `--ink` 2–3px + ombre `--shadow-hard` (décalée, flou 0). Jamais d'ombre floue, jamais de dégradé sur un autocollant.
2. **Le texte est toujours noir** (`--ink`) ; les couleurs vives sont des fonds. Seule exception : le katakana vertical jaune, contouré de noir.
3. **Un cadre** : la page est un grand panneau `--paper` à contour 3px et rayon 24px posé sur la page pêche `--bg`, avec des autocollants qui débordent autour.
4. **Hiérarchie** : un mot latin énorme (Archivo 900) crie ; le sous-titre japonais (Noto Sans JP 900) explique ; le corps japonais (500, interlignage 1.85) se tait en `--muted`.
5. **Inclinaisons** : les autocollants penchent (-12° à +10°, jamais tous dans le même sens) ; les cartes et boutons restent droits au repos.
6. **Mouvement physique** : au survol, l'objet monte (`translate -2px`) et son ombre grandit ; à l'appui, il s'écrase sur son ombre (`translate 5px`, ombre 0).
7. **Contraste** : texte noir sur toutes les couleurs de la palette (≥ 5:1, paires vérifiées dans `references/tokens.css`) ; jamais de blanc sur rose ou sarcelle.
8. **Accessibilité** : cibles ≥ 44px, focus = contour noir 3px décalé, `prefers-reduced-motion` coupe flottement et bande défilante, `lang="ja"` sur la page (ou sur les blocs japonais).
9. **Aucune valeur en dur** : couleurs, polices, tailles, rayons, ombres et durées viennent de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root` dans le projet. |
| `references/components.md` | Avant de coder un bouton, une carte, la navigation, une puce, un champ, une bulle, une pastille, le portrait hexagonal ou le katakana vertical. |
| `references/layouts.md` | Avant de construire une page : cadre navigateur, héros deux colonnes, sections, bande défilante, contact, mobile. |
| `references/motion.md` | Avant d'ajouter une animation : appui « écrasé », apparition « pop », flottement, bande. |
| `references/assets.md` | Avant de placer le portrait ou une image : sujet, cadrage, N&B + `multiply` sur le rose, détourage, sources, prompt IA, 3D optionnelle. |
| `examples/demo.html` | Pour voir le résultat attendu et reprendre des morceaux. |
| `source.md` | Pour connaître le shot de référence, ce qui a été vu et les écarts. |

## Typographie

| Rôle | Police (Google Fonts) | Poids | Taille | Interlignage | Espacement |
|---|---|---|---|---|---|
| Titre latin du héros | **Archivo** | 900 | `--text-hero` (52 → 120px) | 0.92 | -0.01em, capitales |
| Titres de carte, kicker, chiffres | Archivo | 900 | 12–48px | 1–1.1 | +0.04em, capitales |
| Sous-titre / titres de section japonais | **Noto Sans JP** | 900 | `--text-2xl` (28 → 40px) | 1.3–1.35 | 0 |
| Corps japonais | Noto Sans JP | 500 | 16px | 1.85 | 0 |
| Boutons, puces, liens | Noto Sans JP | 700–900 | 14–16px | 1 | 0 |
| Katakana vertical (signature) | **Dela Gothic One** | 400 | 48 → 90px | 1 | -0.02em, `writing-mode: vertical-rl` |

Le shot utilise une grotesque noire du type Archivo Black ; on prend **Archivo variable en 900** pour garder des graisses cohérentes et un repli lourd (Arial Black). Ne jamais mettre le japonais en italique ni en capitales espacées ; pour l'emphase, passer en 900 ou poser un fond d'autocollant derrière le mot.

## Couleurs

| Rôle | Token | Usage |
|---|---|---|
| Page | `--bg` pêche | autour du cadre uniquement |
| Papier | `--paper` crème | intérieur du cadre |
| Carte | `--card` blanc | cartes, champs, logo, barre du navigateur |
| Encre | `--ink` | tout le texte, contours, ombres |
| Action | `--yellow` | bouton principal, katakana, bande défilante, bloc contact |
| Identité | `--pink` | fond du portrait, sélecteur de langue |
| Décor | `--peri`, `--teal`, `--green`, `--mint` | autocollants, tuiles d'icône, chiffres, surlignage du titre |
| Statut | `--red` | point du sélecteur de langue seulement |

Règle d'usage : **jaune = l'action**, une seule zone jaune dominante par écran (bouton du héros ou bloc contact). Les autres couleurs tournent sans hiérarchie, mais jamais deux autocollants voisins de la même couleur.

## Images et 3D

La seule image indispensable est un **vrai portrait** de la personne, en noir et blanc sur fond blanc, découpé dans l'hexagone rose tramé : `grayscale` + `mix-blend-mode: multiply` fait prendre au fond blanc la couleur de la forme, ou un détourage PNG laisse dépasser la personne en bas. Les autocollants (formes, bulles, pastilles, tuiles, katakana) sont du graphisme et restent en CSS/SVG. La 3D est optionnelle (un seul autocollant en jeton 3D). Jamais de dessin CSS/SVG à la place d'une photo ou d'un personnage : détails dans `references/assets.md`.

## Signature

**Le portrait-autocollant** : un portrait en noir et blanc découpé en hexagone sur fond rose (trame de points), contour noir + ombre dure, entouré de 4–5 autocollants inclinés (bulle du prénom pervenche, tuile sarcelle, pastille jaune ronde, pastille verte « ✓ 受付中 ») et d'un **katakana vertical** jaune contouré qui déborde du cadre. Une fois par page, dans le héros. Ailleurs, les autocollants restent décoratifs et rares (2–5 autour du cadre).

## À éviter

- Ombres floues, dégradés, verre dépoli : le style devient « SaaS générique ».
- Texte blanc sur couleur, ou texte coloré sur papier.
- Contours fins (1px) ou gris : le contour est noir et épais, partout.
- Tout incliner : les blocs de lecture (cartes, formulaires) restent droits.
- Un japonais traduit automatiquement ou mis en Archivo : utiliser une vraie police japonaise et faire relire.
- Des autocollants partout : au-delà de 6 dans un écran, ça devient du bruit.
- Copier le portrait, le nom, le logo ou les textes du shot de référence.

## Adaptation React / React Native

- Ombre dure en natif : pas de `shadowRadius: 0` fiable sur Android ; dessiner une `View` noire décalée (`position: absolute`, `top: 5`, `left: 5`) derrière l'autocollant, et l'animer à l'appui avec `Pressable` + Reanimated (`translateX/Y` 0 → 5).
- Contours : `borderWidth: 3`, `borderColor: ink` ; les formes (demi-cercle, étoile, hexagone) en `react-native-svg`.
- Katakana vertical : React Native n'a pas `writing-mode` ; empiler un caractère par ligne dans une `View` en colonne (attention aux petits kana et au « ー » qu'il faut tourner de 90°), ou utiliser un SVG.
- Contour de texte : pas de `text-stroke` en natif ; superposer 4 `Text` noirs décalés de ±2px sous le `Text` jaune, ou SVG `<Text stroke>`.
- Polices : `@expo-google-fonts/archivo`, `@expo-google-fonts/noto-sans-jp`, `@expo-google-fonts/dela-gothic-one`.
- Web React : tout passe par les tokens CSS ; un composant `<Sticker color tilt>` qui applique contour, ombre et rotation évite les répétitions.

## Avant de livrer

- [ ] Tokens importés, aucune valeur en dur.
- [ ] Chaque objet interactif a contour noir + ombre dure + états survol / appui / focus / désactivé.
- [ ] Texte noir partout (sauf katakana contouré) ; contrastes vérifiés.
- [ ] Page dans un cadre, 2 à 5 autocollants autour, inclinaisons variées.
- [ ] Japonais réel, relu, `lang="ja"` ; titres latins en Archivo 900.
- [ ] Testé à 375px et 1440px sans défilement horizontal ; autocollants coupés proprement par `overflow-x: clip`.
- [ ] Mouvement réduit respecté (pas de flottement ni de bande défilante).
- [ ] Vraies images (ou 3D) traitées selon `references/assets.md`, avec `alt` et couleur de repli.
- [ ] Aucun élément du shot d'origine (portrait, nom, logo, textes).
