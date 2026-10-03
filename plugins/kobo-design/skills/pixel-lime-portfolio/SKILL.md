---
name: pixel-lime-portfolio
description: Direction artistique « Pixel Lime Portfolio » pour le portfolio et l'édition créative (designer, directeur artistique, journaliste, photographe, indépendant, studio, CV en ligne, agence), mesurée sur une maquette Dribbble de portfolio personnel. Héros en photo noir et blanc traversée d'une mosaïque de pixels lime acide, étiquettes noires posées sur l'image, nom en bas de casse sur deux lignes décalées, navigation mono soulignée répartie sur la largeur. Sections à quadrillage fin - grands énoncés avec mots en gras, surlignage lime, ovales tracés au feutre et petits autocollants ; fiches de carnet perforées en texte mono ; grille de projets à filets ; liste de récompenses dont la ligne survolée devient noire ; bloc contact entièrement lime avec formulaire sur feuille de carnet ; pied noir au nom géant couvert d'étiquettes. Aucun arrondi, une seule couleur. À utiliser pour un portfolio, une page personnelle ou un site de studio au style « éditorial, brutaliste doux, fait main, noir et blanc et fluo ».
---

# Pixel Lime Portfolio

> Une photo en noir et blanc, une pluie de pixels fluo, et des annotations au feutre comme dans un carnet de travail.

## L'idée

Le portfolio se présente comme **un carnet ouvert sur un écran** : une photo granuleuse en noir et blanc, traversée d'une **mosaïque de carrés lime** ; un nom écrit tout en minuscules ; puis de grandes phrases annotées — un mot surligné, deux autres entourés d'un ovale au feutre, un autocollant collé de travers. Les services sont des **fiches perforées** tapées à la machine. Tout est à angles vifs, posé sur un quadrillage discret. Une seule couleur, le lime, qui fait tout : pixels, boutons, surlignages, et une section entière pour le contact.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de nom, photos ni textes de la maquette d'origine.

## Règles prioritaires

1. **Une seule couleur : le lime.** Tout le reste est noir, blanc, gris clair ; les photos sont en noir et blanc.
2. **Aucun arrondi** (sauf les petites étiquettes en pilule du pied).
3. **Bas de casse pour les noms et les titres**, capitales mono pour la navigation, les boutons et les fiches.
4. **La mosaïque de pixels** traverse la photo du héros, visage compris ; blocs de 0.4 case du quadrillage.
5. **Des gestes de carnet, avec mesure** : un surlignage, un ovale, un ou deux autocollants par paragraphe, pas plus.
6. **Texte noir sur lime**, jamais de lime en texte sur fond clair ; sur noir, le lime sert aux mots forts.
7. **Les sections se touchent** : photo → clair → noir → clair → lime → noir.
8. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root`. |
| `references/components.md` | Mosaïque, navigation, étiquette, nom, bouton mono, énoncé et ses gestes, fiche de carnet, grille de projets, récompenses, contact, pied. |
| `references/layouts.md` | Héros, ordre et hauteur des sections, grille de projets, autres pages, mobile. |
| `references/motion.md` | Apparition de la mosaïque, tracé des ovales, surlignage par pas, autocollants, performance, mouvement réduit. |
| `references/assets.md` | Avant de placer une image : portraits, vignettes, traitement noir et blanc, code des gestes graphiques. |
| `examples/demo.html` | Portfolio complet animé (créatif fictif « noé valin »). |
| `source.md` | Référence, mesures, ce qui est proposé, écarts. |

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Nom (héros) | **Inter Tight** 400 | 58px, bas de casse, approche −0.03em, 2 lignes décalées |
| Énoncés | Inter Tight 400 / 600 | 52px / 1.22 ; italique 600 pour les mots surlignés |
| Titres, noms de projets | Inter Tight 400 | 46px et 42px, bas de casse |
| Nom géant (pied) | Inter Tight 500 | d'un bord à l'autre |
| Navigation, boutons | **JetBrains Mono** 500 | 12px, capitales, soulignés |
| Fiches | JetBrains Mono 400 | 11px ; phrase 17px |
| Texte | Inter Tight 400 | 15px et 13px |

## Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `--ink` | #000000 | Sections sombres, texte, étiquettes, bouton plein |
| `--paper` | #f2f2f2 | Sections claires |
| `--white` | #f8f8f8 | Fiche blanche, feuille du formulaire, texte sur noir |
| `--lime` | #c9f852 | Pixels, boutons, surlignages, fiche, section contact |
| `--lime-deep` | #8cbc18 | Troisième fiche |
| `--grey-bar` | #c4c4c4 | Filets de la grille, barre de lien |
| `--muted` / `--soft` | #6a6a6a / #a8a8a8 | Secondaire sur clair / sur noir |

## Images et 3D

De **vraies photos en noir et blanc** : un portrait pris sur le vif pour le héros (le visage au centre, derrière la mosaïque), un second pour les récompenses, des visuels de projets sans couleur dans la grille. Le gris est fait dans le fichier ou par le serveur d'images. Mosaïque, ovales, surlignages, autocollants, perforations et quadrillage sont des gestes graphiques en canvas / SVG / CSS ; jamais un portrait ou un projet dessiné. 3D optionnelle pour un objet dans la grille. Détails dans `references/assets.md`.

## Signature

1. La **mosaïque de pixels lime** sur une photo noir et blanc.
2. L'**ovale au feutre** et le **surlignage** dans un énoncé géant.
3. Les **fiches de carnet perforées** en mono.
4. La **navigation mono soulignée** étalée sur toute la largeur.
5. Le **nom géant** du pied couvert d'étiquettes et d'autocollants.

## À éviter

- Une deuxième couleur, des dégradés, des ombres portées, des coins arrondis.
- Des photos en couleur ; un filtre CSS pour les désaturer.
- Des titres en capitales grasses : ici les grands textes sont en bas de casse et légers.
- Trop d'annotations (chaque paragraphe a un seul surlignage et un seul ovale).
- Du texte lime sur gris clair ou sur blanc.
- Une mosaïque animée en continu (voir « Performance » dans `motion.md`).

## Adaptation React / React Native

- **React** : `PixelMosaic` (canvas, props `rows`, `density`, `seed`), `Ring`, `Mark`, `Sticker` (composants en ligne), `NoteCard`, `WorkGrid`, `AwardList`, `PaperForm`. Un seul IntersectionObserver pour les apparitions.
- **React Native** : mosaïque en `react-native-skia` ou en grille de `View` générée une fois ; ovale en `react-native-svg` avec `strokeDashoffset` animé (Reanimated) ; fiches en `ScrollView` horizontal aimanté ; polices Inter Tight et JetBrains Mono chargées avec `expo-font` ; liste de récompenses en `Pressable` dont le fond passe au noir à l'appui.

## Avant de livrer

- [ ] `:root` copié de `tokens.css`, aucune couleur en dur ailleurs.
- [ ] Une seule couleur ; toutes les photos en noir et blanc, sans filtre CSS.
- [ ] Aucun arrondi ; texte sur lime en noir.
- [ ] Nom et navigation lisibles sur la photo (voile en haut et en bas).
- [ ] Mosaïque, ovales et autocollants en `aria-hidden` ; formulaire avec libellés.
- [ ] `prefers-reduced-motion` : mosaïque fixe, gestes en place.
- [ ] Pas de défilement horizontal à 390px.
- [ ] Nom, photos, projets et textes propres à la personne.
