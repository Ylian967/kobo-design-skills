---
name: pocket-device-noir
description: Direction artistique « Pocket Device Noir » pour sites produit d'objets tech et connectés (assistant vocal IA, gadget de poche, enceinte, montre, écouteurs, caméra, wearable, hardware startup), inspirée d'un concept Dribbble de site pour un compagnon IA de poche. Fond noir pur, photo de bureau chaleureuse (bois, café, lampe) qui fond au noir en bas, grand titre centré en grotesque serrée « Rencontrez … », deux petits boutons (blanc plein et sombre à contour), carte de verre fumé flottante « Offre du moment », petits libellés techniques dans les coins, section manifeste sur noir avec rayons fins en éventail et mots surlignés en rouge, nom de produit géant gris sombre derrière le rendu de l'objet, panneaux de verre avec étiquettes grises à coins de 3px, textures de roche et de tissu orange, rangée de témoignages miniatures. À utiliser pour une page de lancement hardware, une précommande, une fiche produit tech ou une app compagnon au style « noir, premium, minimal, objet, Apple-like, chaleureux ».
---

# Pocket Device Noir

> Un objet noir posé sur un bureau en bois au soleil couchant, puis rien que du noir autour de lui, et un seul point rouge : son bouton.

## L'idée

Le visiteur doit sentir qu'on lui présente **un objet**, pas une application : le produit est le héros de chaque écran, le reste est noir. Le langage vient des sites de lancement hardware : une **photo d'ambiance chaude** qui disparaît dans le noir, un **titre centré court**, puis des sections très sombres où l'objet flotte devant son **nom géant gris sombre**. Le style vit dans le contraste entre **chaleur des photos** (bois, café, tissu orange) et **froid de l'interface** (noir, verre fumé, étiquettes en mono). Le **rouge** n'existe que là où il existe sur l'objet : son bouton, son voyant, et quelques mots du manifeste.

Inspiré de : voir `source.md`. On reprend le langage visuel (proportions, rythme, traitements), jamais l'identité : pas de nom de produit, de logo, de rendu ni de texte du shot d'origine.

## Règles prioritaires

1. **Noir d'abord** : `--bg` #000 et `--bg-2` #0d0d0d alternent ; la couleur vient des photos et de l'objet, jamais de l'interface.
2. **L'objet est le héros** : un rendu par section, centré, grand, avec une ombre au sol ; le texte s'organise autour (légendes en coins, panneaux de verre en bas).
3. **Hiérarchie** : un titre centré court en Geist 500 serré (-0.035em) ; sous-titres gris ; étiquettes en Geist Mono 11px capitales sur gris `--chip`. Le blanc plein est réservé à l'action principale.
4. Contraste : texte courant ≥ 4,5:1 ; texte des étiquettes `--chip-text` sur `--chip` ; rouge en texte seulement sur noir (`--red` 4,9:1) ou en `--red-text` sur gris ; jamais de texte blanc sur rouge (paires vérifiées dans `references/tokens.css`).
5. **Formes** : boutons à coins de 4px (pas de pilules), étiquettes à 3px, panneaux de verre à 12px, tuiles photo à 20px. Verre = `--glass` + contour 1px `--glass-line` + flou 18px.
6. **Mouvement discret et mécanique** : la molette tourne au survol, le voyant pulse, les rayons tournent très lentement, l'objet flotte de 10px. Pas d'effet spectaculaire.
7. Accessibilité : cibles ≥ 44px, focus visible (contour blanc), `prefers-reduced-motion` respecté, le rendu de l'objet a une description textuelle.
8. Aucune valeur en dur : couleurs, polices, tailles, rayons et durées viennent de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root` dans le projet. |
| `references/components.md` | Avant de coder un bouton, la navigation, une étiquette, la carte de verre, l'objet en CSS, un panneau de fonction, un témoignage. |
| `references/layouts.md` | Avant de construire une page : héros bureau, manifeste à rayons, révélation produit, grille de fonctions, avis, appel final, mobile. |
| `references/motion.md` | Avant d'ajouter une animation ou une transition. |
| `examples/demo.html` | Pour voir le résultat attendu et reprendre des morceaux. |
| `source.md` | Pour connaître le shot de référence et ce qui a été estimé. |

## Typographie

| Rôle | Police (Google Fonts) | Poids | Taille | Interligne | Espacement |
|---|---|---|---|---|---|
| Titre du héros | **Geist** | 500 | `--text-hero` 44–72px | 1 | -0.035em, centré |
| Titres de section | Geist | 500 | `--text-title` 32–48px | 1.08 | -0.035em, seconde phrase en `--muted` |
| Manifeste | Geist | 400 | `--text-statement` 20–26px | 1.4 | centré, 30 caractères de large |
| Nom géant | Geist | 600 | `--text-giant` jusqu'à 320px | 1 | -0.05em, `--giant` |
| Texte, boutons | Geist | 400 / 500 | 12–16px | 1.55 | normal |
| Étiquettes, coins, écran de l'objet | **Geist Mono** | 500 | 11px | 1.4 | +0.06em, capitales |

La police du shot ressemble à une grotesque néo-suisse (type Inter / SF) ; **Geist** et **Geist Mono** sont choisies à l'œil.

## Couleurs

| Rôle | Token | Usage |
|---|---|---|
| Fonds | `--bg` #000, `--bg-2` #0d0d0d | Sections alternées |
| Cartes opaques | `--surface` #1a1a1a | Témoignages, tuiles sans photo |
| Étiquettes | `--chip` #2a2a2a + `--chip-text` | Libellés techniques |
| Texte | `--text`, `--muted` #8a8a8a | Titres, sous-titres |
| Verre | `--glass`, `--glass-line`, `--glass-hi` | Carte d'offre, panneaux de fonction |
| Rouge | `--red` #e5343a | Mots surlignés sur noir, bouton et voyant de l'objet |
| Photos | `--wood`, `--lamp`, `--fabric`, `--rock`… | Emplacements dessinés, jamais l'interface |

**Règle de l'accent** : le rouge est la couleur de l'objet ; dans l'interface, il ne sert qu'à surligner deux ou trois mots d'un manifeste.

## Signature

**Le nom géant derrière l'objet** : le nom du produit en Geist 600 à 22vw, gris très sombre `--giant` presque fondu dans le noir, avec l'objet en grand qui flotte devant, et quatre légendes techniques (étiquette mono + titre + ligne) dans les coins. Associé au **manifeste à rayons** (éventail de filets fins sur noir, mots en rouge). Une fois chacun par page.

## À éviter

- Des dégradés colorés, des néons, du violet « IA » : la technologie se dit par le noir et la matière.
- Des boutons en pilule ou colorés : blanc plein ou contour sombre, coins de 4px.
- Du texte blanc sur rouge, ou du rouge en aplat de bouton.
- Des photos froides ou de studio blanc : les ambiances sont chaudes (bois, lampe, tissu, roche).
- Plus d'un rendu d'objet en compétition dans le même écran.
- Copier des assets, logos, textes ou interfaces du shot de référence.

## Adaptation React / React Native

- Héros : `ImageBackground` + `LinearGradient` (expo-linear-gradient) transparent → noir en bas.
- Verre fumé : `BlurView` (expo-blur, `intensity` 30, `tint="dark"`) avec `borderWidth: 1` et `borderColor` translucide.
- Rayons du manifeste : `react-native-svg` (lignes depuis le centre, opacité dégressive) ou une image ; rotation lente avec Reanimated.
- Nom géant : `Text` avec `adjustsFontSizeToFit` et `numberOfLines={1}`, couleur `--giant`, derrière une image détourée de l'objet.
- Objet : rendu 3D ou PNG détouré ; flottement `withRepeat(withTiming(translateY: -10))`, voyant `withRepeat` sur l'opacité.
- Polices : `@expo-google-fonts/geist`, `@expo-google-fonts/geist-mono`.

## Avant de livrer

- [ ] Tokens importés, aucune valeur en dur.
- [ ] Héros : photo chaude qui fond au noir, titre centré, bouton blanc + bouton à contour, carte de verre « offre », libellés de coins.
- [ ] Manifeste sur noir avec rayons fins et deux ou trois mots en rouge.
- [ ] Section produit : nom géant gris sombre derrière l'objet, légendes techniques avec étiquettes.
- [ ] Panneaux de verre sur textures (roche, tissu) ; témoignages miniatures.
- [ ] Composants conformes à `references/components.md` (repos, survol, appui, focus, désactivé).
- [ ] Testé à 390px et 1440px, sans défilement horizontal ; mouvement réduit respecté.
- [ ] Aucun élément du shot d'origine (nom, logo, rendus, textes).
