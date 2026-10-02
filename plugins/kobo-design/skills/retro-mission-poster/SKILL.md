---
name: retro-mission-poster
description: Direction artistique « Retro Mission Poster » pour récits de marque et landings narratives (énergie, climat, spatial, mobilité, startup « mission »), inspirée des sites primés au style affiche rétro-futuriste des années 70. Écran encadré d'un filet crème, paysages désertiques granuleux en collage, titres de chapitre en capitales hautes et étroites qui montent en biais, mot géant pris entre deux plans de l'image, anneau dentelé rouge pour défiler, petits boutons crème rectangulaires. À utiliser pour une page « notre mission », un storytelling produit, une landing d'entreprise tech engagée ou une app éditoriale au style « affiche vintage, conquête spatiale, désert, grain ».
---

# Retro Mission Poster

> Une affiche de 1974 qui raconte l'avenir : désert rouge, grain d'impression, grandes lettres étroites et une mission écrite en géant.

## L'idée

Chaque chapitre est une **affiche** plein écran, encadrée par un **filet crème** qui fait tout le tour de l'écran. L'image est un **collage granuleux** (désert, ciel strié, planète, silhouettes) ; le texte de chapitre est en **capitales hautes et étroites**, crème, qui montent légèrement (-6°). Sur les écrans forts, un **mot géant rouge** passe **entre deux plans** de l'image (derrière les personnages, devant le décor). La navigation tient en un logo, un burger, un **anneau dentelé** avec une flèche pour avancer, et de petits boutons crème rectangulaires.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de logo, de textes ni d'illustrations d'origine.

## Règles prioritaires

1. **Le cadre crème** (12px) entoure toujours l'écran ; il ne défile pas.
2. **Grain partout** sur les images (bruit SVG en `mix-blend-mode: overlay`, 18 %).
3. **Typo d'affiche** : Big Shoulders Display, capitales, très haute ; un chapitre = 2–4 mots.
4. **Profondeur** : le mot géant est placé entre un calque de fond et un calque de premier plan (silhouettes détourées).
5. **Rouge = signature** (logo, mot géant, anneau) ; le bleu ciel vient des images, pas de l'interface.
6. **Contraste** : crème sur nuit 15:1, noir sur crème ; le rouge en texte seulement en grand (4,6:1).
7. **Accessibilité** : l'anneau de défilement est un vrai bouton « Chapitre suivant » ; le texte du mot géant est aussi présent pour les lecteurs d'écran.
8. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier. |
| `references/components.md` | Cadre, grain, titre de chapitre, mot entre deux plans, anneau dentelé, bouton crème, bloc d'accroche, chargement. |
| `references/layouts.md` | Chapitres plein écran, écran « mission », mobile. |
| `references/motion.md` | Parallaxe des calques, montée des titres, anneau. |
| `examples/demo.html` | Page d'exemple complète. |
| `source.md` | Observations et écarts. |

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Titres de chapitre, mot géant | **Big Shoulders Display** 700–900 | capitales, interligne 0.85, -6° pour les titres |
| Surtitres (« CHAPITRE 1 ») | Jost 500 | 12px, capitales, +0.12em |
| Accroche, boutons | **Jost** 400/600 | 14–18px |

## Signature

**Le mot entre deux plans** : un mot géant rouge (« MISSION ») posé derrière des silhouettes et devant le paysage — trois calques empilés (fond, texte, premier plan détouré).

## À éviter

- Des images propres et lisses : sans grain, le style s'effondre.
- Des boutons arrondis ou colorés : ils sont rectangulaires et crème.
- Un menu visible en permanence : burger seulement.
- Reprendre le logo, les illustrations, la voiture ou les textes de la référence.

## Adaptation React / React Native

- Calques : trois `Image`/`View` absolues avec parallaxe Reanimated selon le défilement.
- Grain : image PNG de bruit en `opacity: 0.18` par-dessus.
- Cadre : `View` absolue avec bordure crème et `pointerEvents="none"`.
- Big Shoulders Display : `@expo-google-fonts/big-shoulders-display`.

## Avant de livrer

- [ ] Cadre crème permanent, grain sur toutes les images.
- [ ] Titres d'affiche étroits et montants.
- [ ] Au moins un mot entre deux plans.
- [ ] Anneau de défilement accessible.
- [ ] Testé à 375px et 1440px, mouvement réduit respecté.
- [ ] Aucun élément de la marque d'origine.
