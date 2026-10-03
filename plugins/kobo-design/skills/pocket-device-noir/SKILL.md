---
name: pocket-device-noir
description: Direction artistique « Pocket Device Noir » pour un produit tech ou un objet connecté (assistant vocal, enregistreur, baladeur, montre, accessoire audio, gadget de poche, lancement de matériel, précommande), mesurée sur une maquette Dribbble de site d'objet connecté. Site noir où la chaleur vient des photos - héros sur un bureau en bois au soleil rasant avec l'objet au centre, titre blanc centré, bouton blanc et bouton en verre fumé, carte d'offre à contour en tirets ; manifeste centré avec deux mots en rouge sur des rayons fins ; nom du produit géant en dégradé gris derrière l'objet ; bande de cinq vignettes dont celle du centre est agrandie ; panneau de verre flouté « en vedette » sur photo ; vue intérieure avec points d'intérêt et graduation rouge ; témoignages en rail ; appel final sur photo dorée. Objet présenté en 3D ou en photo, un seul rouge, pointillés et tirets fins. À utiliser pour une landing produit, une page de précommande ou une fiche d'objet au style « sombre, premium, chaleureux, minimal, matériel ».
---

# Pocket Device Noir

> Un petit objet noir posé sur un bureau au soleil : tout le site est dans ce contraste entre la pénombre et le bois chaud.

## L'idée

Le site est **noir**, calme, presque muet — et il s'ouvre sur une **photo chaude** : un bureau en bois, une lumière de fin d'après-midi, et l'objet au milieu. Ce va-et-vient entre photos dorées et sections noires rythme toute la page. L'objet lui-même est montré sous tous les angles : tenu, de face devant son **nom géant**, de trois quarts avec ses points d'intérêt. L'interface s'efface : petits boutons blancs, étiquettes grises, verre fumé, pointillés. Une seule couleur, le **rouge du bouton de l'objet**, réapparaît sur deux mots et un pictogramme.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de nom, logo, produit, photos ni textes de la maquette d'origine.

## Règles prioritaires

1. **Noir + photos chaudes, en alternance.** Pas d'autre fond.
2. **Un seul rouge**, celui de l'objet : deux mots du manifeste, un pictogramme, un point d'intérêt, le haut de la graduation.
3. **L'objet est le héros de chaque section** : en photo ou en 3D, jamais dessiné en CSS.
4. **Le nom géant passe derrière l'objet**, en dégradé gris vers le noir.
5. **Boutons blancs petits** (40px, rayon 6px) ; second bouton en verre fumé.
6. **Pointillés et tirets** pour séparer, sélectionner, annoter ; pas de bordures pleines épaisses.
7. **Texte centré** dans les sections noires ; à gauche dans les panneaux de verre.
8. **Un seul flou** (le panneau « en vedette ») ; jamais de flou animé.
9. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root`. |
| `references/components.md` | Barre, boutons, étiquette, titre, carte d'offre, manifeste, nom géant, vignettes, panneau de verre, points d'intérêt, témoignages, pied, objet. |
| `references/layouts.md` | Héros, ordre des neuf sections, autres pages, mobile. |
| `references/motion.md` | Objet qui suit la souris, écran vivant, manifeste, vignettes, performance, mouvement réduit. |
| `references/assets.md` | Avant de placer une image : photos du produit, ambiances, construction de l'objet 3D, traitements. |
| `examples/demo.html` | Site complet animé (objet fictif « Ora P1 », en 3D). |
| `source.md` | Référence, mesures, ce qui est proposé, écarts. |

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Titre du héros | **Inter Tight** 500 | 104px (capitales de 80px), approche −0.035em |
| Nom géant | Inter Tight 500 | 328px, dégradé gris |
| Manifeste | Inter Tight 500 | 46px / 1.1 |
| Titres de section | Inter Tight 500 | 42px / 1.08 |
| Texte | Inter Tight 400 | 17px / 1.6, gris clair |
| Boutons, étiquettes, citations | Inter Tight 400–500 | 14px |
| Écran de l'objet | **JetBrains Mono** | chiffres et état |

## Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `--bg` / `--bg-2` / `--foot` | #000000 / #0b0b0b / #121212 | Sections noires, intérieur, pied |
| `--surface` / `--tag` / `--panel` | #181818 / #1c1c1c / #2c2c2c | Cartes, étiquettes, verre composé |
| `--text` / `--soft` | #ffffff / #b4b4b4 | Titres / paragraphes |
| `--paper` | #fcfcfc | Boutons blancs |
| `--red` | #fc383c | Mots du manifeste, pictogramme, bouton de l'objet |
| `--glass` | blanc 12 % | Panneaux et boutons en verre |
| `--giant-top` → `--giant-bottom` | #3a3a3a → #0a0a0a | Nom géant |

## Images et 3D

De **vraies photos chaudes** (bureau en bois au soleil rasant, mur doré traversé d'ombres, tissu orange) et des textures de pierre noire. L'objet est montré par des **photos du produit** — en main, posé, détouré — ou, comme dans la démo, par un **modèle 3D** (Three.js : boîtier, écran vivant, molette, bouton rouge) qui suit la souris. Logo, pictogramme, rayons, graduation et points d'intérêt sont des signes en CSS / SVG ; jamais l'objet dessiné à plat. Détails dans `references/assets.md`.

## Signature

1. L'**objet noir sur une photo de bureau ensoleillé**.
2. Le **nom géant gris** derrière l'objet.
3. Le **manifeste** aux deux mots rouges, sur des rayons fins.
4. La **vignette centrale agrandie** au contour en tirets.
5. Le **panneau de verre** flouté posé sur une moitié de photo.

## À éviter

- Des photos froides, bleutées ou sur fond blanc.
- Du rouge en aplat, en fond de bouton ou en titre entier.
- De gros boutons arrondis, des dégradés colorés, des ombres portées marquées.
- Des reflets 3D coûteux (environnement, transmission, ombres) et un rendu en continu : voir « Performance » dans `motion.md`.
- Plusieurs panneaux floutés, ou un flou qui s'anime.
- L'objet dessiné en CSS ou en SVG.

## Adaptation React / React Native

- **React** : `DeviceCanvas` (une instance par emplacement, props `pose`, rendu à la demande ; `@react-three/fiber` avec `frameloop="demand"` convient), `Manifesto` (mots révélés au défilement), `ThumbStrip`, `FeaturePanel`, `Hotspot`, `VoiceRail`. Un seul observateur pour les apparitions.
- **React Native** : objet en `expo-gl` + three, ou plus simplement une séquence de photos du produit que l'on fait défiler au doigt ; panneau de verre avec `expo-blur` ; bande de vignettes en `FlatList` horizontale centrée (`snapToAlignment="center"`) dont l'élément central grandit ; rail de témoignages aimanté ; retour haptique sur le bouton de précommande.

## Avant de livrer

- [ ] `:root` copié de `tokens.css`, aucune couleur en dur ailleurs.
- [ ] Le rouge n'apparaît qu'aux endroits prévus.
- [ ] Texte lisible sur chaque photo (dégradé sombre dessous).
- [ ] 3D : rendu à la demande, arrêté hors écran, repli en image sans WebGL.
- [ ] Vignettes, flèches et rail utilisables au clavier.
- [ ] `prefers-reduced-motion` : objet fixe, manifeste entièrement lisible.
- [ ] Pas de défilement horizontal à 390px.
- [ ] Nom, produit, photos et textes propres au projet.
