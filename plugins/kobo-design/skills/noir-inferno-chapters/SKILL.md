---
name: noir-inferno-chapters
description: Direction artistique « Noir Inferno Chapters » pour récits illustrés en chapitres (clip, album, court-métrage, campagne engagée, livre, jeu narratif), inspirée des expériences primées en noir et blanc peint qui traversent une suite de « cercles ». Noir et blanc strict, scènes peintes plein écran avec brume et vignettage, un titre court en capitales serif au centre, numéro de chapitre en bas au centre, navigation minuscule en capitales très espacées, aucun autre élément. À utiliser pour une landing de clip ou d'album, un manifeste, une campagne de sensibilisation, un roman graphique web ou une app de lecture au style « noir, cinéma, gravure, solennel ».
---

# Noir Inferno Chapters

> Un film muet en neuf cercles : une image peinte en noir et blanc, un titre, un numéro. Puis le suivant.

## L'idée

Chaque chapitre est **une seule image** en noir et blanc, peinte, brumeuse, plein écran. Au centre, **un titre très court** en capitales serif blanches, terminé par un point (« LES MARIONNETTES DU POUVOIR. »). En bas au centre, le **numéro du chapitre**. Aux quatre coins, une interface minuscule en capitales très espacées. On avance chapitre par chapitre (défilement, flèches, clic), comme on tourne les pages d'un livre sombre. Rien d'autre : pas de couleur, pas de bouton, pas de texte long.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas d'illustrations, de titres ni du nom de l'œuvre d'origine.

## Règles prioritaires

1. **Noir et blanc strict** : trois valeurs (`--bg`, `--muted`, `--text`) plus les gris des images. Zéro couleur.
2. **Un titre, un numéro, une image** par écran. Titre ≤ 4 mots, terminé par un point.
3. **Interface aux coins**, en capitales minuscules espacées de 0.28em.
4. **Atmosphère** : brume (dégradés blancs très transparents), vignettage, grain léger, particules qui dérivent.
5. **Navigation séquentielle** : défilement, flèches clavier, molette ; un chapitre à la fois.
6. **Contraste** : blanc sur scène sombre avec vignettage ; si l'image est claire, ajouter une ombre portée large au titre (`0 0 40px #000`).
7. **Accessibilité** : chaque chapitre a un texte alternatif qui décrit la scène ; un sommaire accessible au clavier liste tous les chapitres.
8. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier. |
| `references/components.md` | Scène peinte, titre de chapitre, numéro, coins d'interface, sommaire, brume et particules. Puis, relevés sur le site en ligne : cercle à glisser (navigation), citation d'accueil, texte de scène, panneau « à propos » blanc, sortie. |
| `references/layouts.md` | Ouverture, chapitre, sommaire, fin, mobile. |
| `references/motion.md` | Fondus au noir, dérive, apparition du titre. |
| `references/assets.md` | Avant de placer une image ou une scène 3D : sujets, N&B contrasté, grain, vignettage, sources, prompts IA, idée 3D. |
| `examples/demo.html` | Démo de 4 chapitres en photos N&B. |
| `source.md` | Observations et écarts. |

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Titres de chapitre | **Playfair Display SC** 400 (site : Parkinson Condensed 400, mesuré) | 28–48px, capitales, interligne 1, centré ; citation d'accueil 20px +0.03em |
| Interface | **Josefin Sans** 400 | 10px, capitales, +0.1 à +0.2em (mesuré 1–2px) ; texte de scène ~13px casse normale |
| Numéro | Playfair Display 400 | 40px / 35px (mesuré) |

## Images et 3D

Chaque chapitre est **une vraie image** (photo ou illustration peinte) en noir et blanc très contrasté : noirs bouchés, blancs francs, grain, vignettage et brume par-dessus. Les sujets sont humains et graves (foule, geste, visage, silhouette dans le noir). La brume, le vignettage et le grain restent en CSS ; jamais de dessin CSS/SVG à la place d'une photo, d'une foule, d'un visage ou d'un lieu. La 3D est optionnelle (parallaxe 2,5D par carte de profondeur). Détails et code dans `references/assets.md`.

## Signature

**Le numéro de chapitre seul en bas au centre**, avec un petit point au-dessus, qui change en fondu à chaque chapitre.

## À éviter

- Ajouter une couleur, même en accent.
- Écrire des paragraphes dans les chapitres (un panneau « À propos » peut les contenir).
- Des transitions rapides ou bondissantes.
- Reprendre les illustrations, titres ou le nom de l'œuvre d'origine.

## Adaptation React / React Native

- Chapitres : `FlatList` verticale paginée (`pagingEnabled`), images plein écran `resizeMode="cover"`.
- Brume : `expo-linear-gradient` blanc à 8 % animé lentement.
- Polices : `@expo-google-fonts/playfair-display-sc`, `josefin-sans`.

## Avant de livrer

- [ ] Zéro couleur.
- [ ] Un titre court + un numéro par chapitre.
- [ ] Interface uniquement aux coins.
- [ ] Sommaire clavier et textes alternatifs.
- [ ] Vraies images (ou 3D) traitées selon `references/assets.md`, avec `alt` et couleur de repli.
- [ ] Testé à 375px et 1440px, mouvement réduit respecté.
