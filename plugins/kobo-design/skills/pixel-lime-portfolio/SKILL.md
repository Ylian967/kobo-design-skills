---
name: pixel-lime-portfolio
description: Direction artistique « Pixel Lime Portfolio » pour portfolios personnels et sites de créatifs indépendants (designer, directeur artistique, photographe, développeur créatif, studio solo), inspirée d'un concept Dribbble de portfolio éditorial audacieux. Héros photo noir et blanc granuleuse avec mosaïque de pixels lime acide façon glitch 8-bit, nom en bas de casse géant sur deux lignes décalées, petites étiquettes noires, bouton lime en mono capitales, navigation mono soulignée étalée sur toute la largeur. Sections gris clair à grille fine avec énoncé mêlant regular et gras, surlignages lime en pilule, cercle et soulignement tracés à la main, petits autocollants ; section nuit avec cartes-notes inclinées (lime, blanc, lime) en mono avec cases à cocher ; grille de projets aux titres en minuscules. À utiliser pour un portfolio, une page « à propos », une liste de projets, un CV en ligne ou une app perso au style « éditorial, brut, lime, pixel, noir et blanc, mono ».
---

# Pixel Lime Portfolio

> Un portrait en noir et blanc que quelques pixels lime viennent « pirater » : tout le reste est gris, noir, mono — et très sûr de lui.

## L'idée

Le site est un **carnet de créatif** : une photo N&B granuleuse en ouverture, un nom écrit en **grand bas de casse** comme une signature, puis des pages de papier gris clair quadrillées où la personne explique **comment elle pense**, et une page nuit où elle **épingle ses principes** sur des fiches. Une seule couleur, le **lime acide**, sert à tout ce qui est vivant : les **pixels** qui grignotent la photo, le bouton, les **surlignages** derrière les mots, les fiches et les autocollants. Le reste se tait : texte noir ou blanc, petites étiquettes mono, grille à peine visible. La personnalité vient du **geste** (cercle tracé à la main, fiches de travers, pixels) et non d'une palette chargée.

Inspiré de : voir `source.md`. On reprend le langage visuel (photo N&B + pixels, bas de casse, mono, surlignage, fiches), jamais l'identité : pas de nom, photo, texte ni projet du shot d'origine.

## Règles prioritaires

1. **Une seule couleur : `--lime`.** Tout le reste est `--ink`, `--paper`, `--white` et les gris de la photo. Jamais de deuxième accent, jamais de dégradé coloré.
2. **Deux voix seulement** : Inter Tight (nom, énoncés, titres, en **bas de casse**) et JetBrains Mono (nav, étiquettes, boutons, notes, en **capitales espacées**, 11–12px).
3. **Le nom est l'affiche** : `--text-name`, poids 400, interlignage 0.86, deuxième ligne décalée de ~0.9em vers la droite. Rien d'autre n'est aussi grand, sauf le titre de contact.
4. **Les mots importants sont travaillés, pas colorés** : gras (700), pilule lime derrière le mot, cercle ou soulignement tracé. Au plus 3 traitements par énoncé.
5. **Matières alternées** : héros photo → papier quadrillé (`--paper` + grille 64px) → nuit quadrillée (`--ink`) → papier → nuit. Pas de section blanche pure.
6. **Formes** : étiquettes, boutons et pixels **carrés** ; seules les pilules (surlignage, filtres) et les fiches (6px) sont arrondies.
7. **Mouvement en pas** : les pixels apparaissent par à-coups (`steps()`), les traits se dessinent, les fiches se redressent au survol. Rien ne flotte en continu sauf le carré « disponible ».
8. **Contraste** : texte courant ≥ 4,5:1 (paires vérifiées dans `references/tokens.css`) ; sur lime, toujours `--on-lime` ; le lime en texte uniquement sur `--ink` ou `--card-dark`.
9. **Accessibilité** : cibles ≥ 44px (liens de nav compris), `:focus-visible` lime, `prefers-reduced-motion` coupe pixels animés et tracés ; la photo a un `aria-label`, mosaïques et autocollants sont `aria-hidden`.
10. **Aucune valeur en dur** : couleurs, polices, tailles, rayons et durées viennent de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root` dans le projet. |
| `references/components.md` | Avant de coder un bouton, la nav, une étiquette, la mosaïque, un surlignage, un tracé, une fiche, une carte projet, un filtre, un champ. |
| `references/layouts.md` | Avant de construire une page : héros photo, énoncé, fiches, grille de projets, services, contact, mobile. |
| `references/motion.md` | Avant d'ajouter une animation ou une transition. |
| `examples/demo.html` | Pour voir le résultat attendu (portfolio fictif « noé valin ») et reprendre des morceaux. |
| `source.md` | Shot de référence, ce qui a été vu, écarts. |

## Typographie

| Rôle | Police (Google Fonts) | Réglages |
|---|---|---|
| Nom du héros | **Inter Tight** 400 (300 pour une variante plus fine) | `--text-name` 72–208px, interligne 0.86, approche -0.045em, bas de casse |
| Énoncés (« comment je pense ») | Inter Tight 400 + 700 | `--text-statement` 28–48px, interligne 1.28, approche -0.02em, bas de casse |
| Titres de section, projets | Inter Tight 400/500 | 40–88px (`--text-section`) / 22px (`--text-lg`), bas de casse |
| Nav, étiquettes, boutons, méta | **JetBrains Mono** 500 | 11–12px, capitales, +0.08em |
| Fiches (listes à cocher) | JetBrains Mono 400 | 14px / 28px (aligné sur les lignes de la fiche) |
| Texte courant | Inter Tight 400 | 14–16px / 1.5 |

La grotesque du shot n'est pas identifiée : Inter Tight en est l'équivalent le plus proche à l'œil (serrée, neutre, bons bas de casse). Pour la mono, Space Mono donne un rendu plus « rétro » si on le souhaite.

## Couleurs

| Rôle | Token | Usage |
|---|---|---|
| Nuit | `--ink` | sections sombres, texte sur papier, étiquettes |
| Papier | `--paper` + `--line` | sections claires quadrillées |
| Blanc | `--white` | nom sur photo, fiche blanche, vignettes, puces |
| Accent | `--lime` / `--on-lime` | pixels, bouton principal, surlignages, fiches, autocollants |
| Accent doux | `--lime-soft` | survol d'un surlignage, fond de puce active secondaire |
| Surfaces nuit | `--card-dark`, `--rule-dark` | champs, cartes sur nuit |
| Secondaire | `--muted` (sur clair), `--muted-dark` (sur nuit) | méta, aides, descriptions |
| Photo | `--photo-0` → `--photo-5` | dégradés de remplacement N&B |

Règle de l'accent : sur un écran donné, le lime occupe **moins de 10 % de la surface** — sauf les fiches, qui sont l'exception assumée de la section nuit.

## Signature

**La mosaïque de pixels lime sur la photo N&B** : une grappe de 30 à 60 carrés `--pixel` (14–24px), irrégulière, posée sur le visage ou le bord du sujet, avec 1 ou 2 pixels noirs/blancs et un pixel en contour. Une grappe principale dans le héros + 1 ou 2 petites grappes d'écho (près du nom, dans un coin, au contact). On la rappelle en petit au survol des vignettes de projets.

Deuxième marque : **l'énoncé travaillé** (gras + pilule lime + cercle tracé + soulignement tracé), une fois par page.

## À éviter

- Ajouter une deuxième couleur (bleu, rose, orange) ou des photos en couleurs : le N&B + lime est le style.
- Des pixels réguliers en damier ou en dégradé : la grappe doit être organique, comme un glitch.
- Mettre le nom en capitales ou en gras : il est en bas de casse, poids normal.
- Des cartes à grosse ombre ou à gros rayon : seules les fiches ont une ombre, et elles sont de travers.
- Surligner plus de trois mots par énoncé : l'effet devient un surligneur d'étudiant.
- Du texte lime sur papier ou sur blanc (1,2:1) : illisible.
- Reprendre le nom, la photo, les textes ou les projets du shot de référence.

## Adaptation React / React Native

- **Mosaïque** : composant `<PixelCluster pattern="..xx/.xxx" size={18} />` qui mappe chaque caractère vers une `View` carrée absolue ; apparition échelonnée avec Reanimated (`withDelay(i * 18, withTiming(1, { duration: 1 }))` pour l'effet « pas »).
- **Photo N&B** : en web `filter: grayscale(1) contrast(1.1)` ; en natif, image déjà traitée, ou `@shopify/react-native-skia` (`ColorMatrix` en niveaux de gris). Grain : PNG de bruit en `opacity: 0.2` par-dessus.
- **Grille de fond** : en web `background-image` (deux `linear-gradient`) ; en natif, un SVG `Pattern` (`react-native-svg`) ou un PNG répété.
- **Surlignage pilule** : en natif, `Text` imbriqué ne prend pas de rayon : envelopper le mot dans une `View` lime `borderRadius: 999` (ligne à part) ou dessiner le fond en SVG.
- **Tracés à la main** : `react-native-svg` `Path` + `strokeDasharray`/`strokeDashoffset` animés.
- **Fiches inclinées** : `transform: [{ rotate: '-3deg' }]`, redressées au `Pressable` `onPressIn`.
- Polices : `@expo-google-fonts/inter-tight`, `@expo-google-fonts/jetbrains-mono`.

## Avant de livrer

- [ ] Tokens importés, aucune couleur hors `:root` ; lime seul accent.
- [ ] Héros : photo N&B granuleuse, grappe de pixels, 2 étiquettes, nom bas de casse décalé, bouton lime mono.
- [ ] Nav mono soulignée, liens ≥ 44px de haut.
- [ ] Un énoncé travaillé (gras, pilule, tracé), sur papier quadrillé.
- [ ] Fiches inclinées sur nuit, cases à cocher en mono.
- [ ] Boutons : repos, survol, appui, focus, désactivé, chargement (`aria-busy`).
- [ ] Testé à 390px et 1440px, sans défilement horizontal ; mouvement réduit respecté.
- [ ] Aucun élément du portfolio d'origine (nom, photo, textes, projets).
