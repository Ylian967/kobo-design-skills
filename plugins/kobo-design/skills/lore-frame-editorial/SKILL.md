---
name: lore-frame-editorial
description: Direction artistique « Lore Frame Editorial » pour raconter un univers illustré (jeu, licence, collection de personnages, projet artistique, NFT, bande dessinée), inspirée des sites primés qui se lisent comme un dossier d'archives. Tout vit dans un cadre fixe à coins de 10px avec rail gauche (menu, étoile-réticule, son) et barre de progression ; phrases-chapitres énormes en grotesque 650 très serrée révélées mot à mot ; mots géants en police hexagonale ; micro-labels mono qui se décodent lettre par lettre ; images en planches à onglet de dossier qui se plient au défilement et grandissent jusqu'au plein cadre ; chargement façon terminal et logo qui fond comme du liquide ; menu noir à mot actif citron ; section lavande avec éventail de portraits ; pied noir avec logo géant. À utiliser pour une landing d'univers, un lore, une présentation de factions ou de personnages, une collection, une page équipe ou un portfolio d'illustrateur au style « archive, terminal, art de concept, éditorial ».
---

# Lore Frame Editorial

> On ouvre les archives d'un monde : un terminal charge les fichiers, puis chaque dossier s'ouvre en grand, illustration après illustration.

## L'idée

Trois couches qui ne se mélangent jamais :
1. **Le cadre** — un terminal posé sur l'écran : filet fin, coins de 10px, rail à gauche, barre en haut avec la progression et la nav de section. Il ne bouge pas, il change seulement de couleur (noir sur blanc, blanc sur illustration).
2. **La voix** — des **phrases énormes et serrées** (Inter Tight 650, −0.07em, capitales) qui se révèlent mot à mot, des **mots géants hexagonaux**, et tout le reste en **mono minuscule** qui se décode.
3. **Les archives** — des illustrations très colorées présentées comme des **planches en forme de dossier** (coins arrondis, onglet, coin coupé), qui se plient quand on défile et s'ouvrent en plein cadre pour les chapitres.

Le mouvement est la moitié du style : sans les animations de `references/motion.md`, la page est ratée.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : ni le logo, ni les personnages, ni les noms, ni les textes de la référence.

## Règles prioritaires

1. **Le cadre est toujours là** : marge 20px, rail 67px, barre 51px, coins 10px, filets 1px ; il s'inverse sur les illustrations.
2. **Deux tailles seulement** : énorme (phrases, manifeste, mots hexagonaux, menu) ou minuscule (mono 10–14px, paragraphes 14px). Rien entre les deux.
3. **Capitales serrées** pour toute la grande typo ; la première ligne d'une phrase-chapitre est **indentée** après son index « ■ 001 ».
4. **Images = planches de dossier**, jamais de rectangle simple ; couleurs vives, dominante lavande.
5. **Tout texte mono se décode**, toute phrase-chapitre se révèle, tout petit paragraphe se tape.
6. **Sections collantes** : chaque étape occupe 1,5 à 3 écrans de défilement.
7. **Couleurs d'interface** : noir, blanc, gris clair, **lavande** (section collection) et **citron** (seulement la page active du menu).
8. **Accessibilité** : vrai texte dans `aria-label` pour tout ce qui se décode ou se tape ; `prefers-reduced-motion` affiche tout à l'état final ; menu au clavier (Échap ferme) ; contrastes de `tokens.css`.
9. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : couleurs, échelle fluide, cadre, courbes (mesurés). |
| `references/motion.md` | **Toujours** : les 9 mouvements signature et leur code (chargement, fusion du logo, décodage, révélation, frappe, planches pliées, héros → planche, chapitre plein cadre, menu). |
| `references/components.md` | Cadre, bouton à coin coupé, label mono, phrase-chapitre, manifeste, planche de dossier, chapitre plein cadre, grille HUD, rideau de barres, compteur vertical, éventail, fiche objet à règle, mot-titre, menu, pied, grille d'équipe, galerie. |
| `references/layouts.md` | Ordre de l'accueil (10 sections), pages internes (À propos, Galerie, Journal, Média, Protocole), grilles à filets, mobile. |
| `references/assets.md` | Avant de placer une image : familles d'images, emplacements, sources, prompts IA, option WebGL. |
| `examples/demo.html` | Accueil complet avec toutes les animations. |
| `source.md` | Ce qui a été mesuré / observé sur la référence, et les écarts. |

## Typographie

| Rôle | Police (Google Fonts) | Réglages |
|---|---|---|
| Phrases-chapitres, manifeste, menu | **Inter Tight** 650 (site : ABC Whyte Plus) | capitales ; 3.25vw / 8.85vw / 4vw ; interligne 0.9 / 0.84 / 0.85 ; −0.07em (manifeste −0.094em) |
| Mots géants, compteur, logo | **Tektur** 700 (site : Hexaframe) | 18–19vw, interligne 0.8, −0.1em |
| Labels, nav, pied, boutons | **IBM Plex Mono** 400 / 450 / 600 | 10–14px, capitales, −0.04em |
| Paragraphes | Inter Tight 400–500 | 14px / 1.3 (site 13.5px) ; légendes de chapitre 18.9px centrées |

## Couleurs

| Rôle | Token |
|---|---|
| Fond éditorial / texte | `--paper` / `--ink` |
| Nav inactive, texte secondaire | `--muted` (sur blanc), `--on-dark-muted` (sur noir) |
| Progression, fonds gris | `--panel` |
| Section collection, équipe | `--lavender` (texte `--ink`) |
| Page active du menu | `--lime` (texte `--ink`) |
| Mot non révélé | `--reveal-from` / `--reveal-from-dark` |
| Filets | `--line-dark` / `--line-light` |

## Images et 3D

De **vraies images** très colorées : portraits de personnages sur fond uni et panoramas peints du monde (couchant rose-orange, violet, lavande), plus quelques objets isolés. Présentées en **planches de dossier** ; jamais de dessin CSS/SVG à la place d'un personnage, d'un lieu ou d'un objet. Le cadre, l'étoile, le rideau de barres, la règle et le logo sont des signes et restent en SVG. WebGL optionnel pour plier les planches. Détails dans `references/assets.md`.

## Signature

**Le cadre-terminal + la planche de dossier qui s'ouvre** : un écran encadré qui charge comme un terminal, puis des illustrations en forme de dossier qui se plient et s'agrandissent jusqu'au plein cadre.

## À éviter

- Des images rectangulaires simples, des ombres portées, des cartes à coins réguliers.
- Des tailles moyennes (24–40px) : soit énorme, soit minuscule.
- Des images ternes ou nocturnes uniformes : la référence est lumineuse et colorée.
- Du citron ailleurs que sur la page active du menu.
- Une page sans mouvement, ou des animations décoratives non liées au défilement.
- Le logo, les personnages, les noms ou les textes de la référence.

## Adaptation React / React Native

- Cadre : composant `Frame` fixe ; React Native : `View` absolue `pointerEvents="box-none"`.
- Révélation, décodage, frappe : hooks `useInView` + `requestAnimationFrame` ; React Native : `react-native-reanimated` (`useAnimatedScrollHandler`).
- Planche de dossier : `clipPath` SVG en `objectBoundingBox` ; React Native : `MaskedView` + `react-native-svg`.
- Polices : `@expo-google-fonts/inter-tight`, `@expo-google-fonts/tektur`, `@expo-google-fonts/ibm-plex-mono`.

## Avant de livrer

- [ ] Tokens importés, aucune valeur en dur.
- [ ] Cadre complet (rail, barre, progression, nav de section active, inversion sur illustration).
- [ ] Les 9 mouvements de `motion.md` présents là où la page en a besoin, et coupés en mouvement réduit.
- [ ] Toutes les images en planches de dossier, colorées, avec `alt` et couleur de repli.
- [ ] Texte réel accessible pour tout ce qui se décode ou se tape.
- [ ] Testé à 375px et 1440px, sans débordement horizontal.
- [ ] Contrastes vérifiés (`python3 tools/check.py lore-frame-editorial`).
- [ ] Aucun élément de l'univers d'origine.
