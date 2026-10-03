---
name: glacial-mono-3d
description: Direction artistique « Glacial Mono 3D » pour sites-vitrines immersifs en 3D (entreprise tech, web3, studio, lancement produit), inspirée d'un site primé où une scène 3D glacée et monochrome occupe tout l'écran. Gris-bleu acier, neige et brouillard, objets de glace à facettes, interface minuscule en monospace collée aux quatre coins, boutons à crochets de coin, étiquettes blanches pleines reliées aux objets par un trait, constellation de points numérotés. Animée — chargement en chaîne ASCII, scène qui s'assemble en fil de fer puis se remplit, texte qui passe par des pavés avant de s'afficher, défilement qui fait voyager la caméra de scène en scène, transition en pixels et franges arc-en-ciel, sculpture de particules. À utiliser pour une landing 3D, un site corporate « froid et premium », un portfolio WebGL ou une page de lancement au style « glace, minimal, monospace, techno ».
---

# Glacial Mono 3D

> Un paysage de glace dans le brouillard, quelques lignes de texte minuscules aux quatre coins, et une caméra qui voyage quand on fait défiler.

## L'idée

L'écran entier est une **scène 3D monochrome** : gris-bleu, brume, glace à facettes. Il n'y a pas de page : le défilement **déplace la caméra** d'un lieu à l'autre, et l'ambiance bascule du brouillard clair à la nuit. L'interface se fait oublier : **monospace de 10–11px collée aux bords**, boutons sans fond marqués par quatre **crochets de coin**, étiquettes blanches reliées aux objets par un trait. Tout ce qui apparaît **se construit** : la scène en fil de fer, le texte en pavés.

Le mouvement fait la moitié du style (`references/motion.md`). Le site de référence dessine tout dans un canvas : rien n'y est mesurable, donc les durées sont proposées et les couleurs lues sur capture (voir `source.md`).

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : ni le logo, ni la mascotte, ni les modèles 3D, ni les textes du site.

## Règles prioritaires

1. **Une scène, pas une page** : canvas fixe plein écran, espace de défilement dessous, caméra à positions clés.
2. **Monochrome gris-bleu** : `--fog`, `--frost`, `--steel`, `--night`. La seule couleur autorisée est la frange `--prism-*` de la transition.
3. **Interface aux quatre coins**, en monospace 10–11px, à `--edge` des bords. Rien au centre sauf l'objet.
4. **Crochets de coin** pour tout bouton ; étiquettes pleines blanches pour annoter un objet.
5. **Tout se construit** : fil de fer → réseau → matière ; pavés → lettres.
6. **Texte lisible** : sombre `--steel` sur scène claire, clair `--text` sur nuit ; jamais de blanc sur brouillard clair hors logotype.
7. **L'interface est en HTML** par-dessus le canvas (le site la dessine dans le canvas : à ne pas imiter).
8. **Fluide partout** : matières simples, 30 images/s, résolution adaptative (`motion.md`, « Performance »).
9. **Accessibilité** : `aria-label` avec le vrai texte sur ce qui se brouille, canvas `aria-hidden`, repli photo sans WebGL, mouvement réduit en coupes franches, cibles 44px.
10. **Aucune valeur en dur** : tout vient de `references/tokens.css` (les couleurs de la scène sont lues dans les variables CSS).

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : couleurs lues sur capture, tailles, durées proposées. |
| `references/motion.md` | **Toujours** : les 6 mouvements signature, le code, les règles de performance 3D. |
| `references/components.md` | Interface aux coins, logotype, bouton à crochets, texte en pavés, étiquettes, constellation, scènes, panneau, chargement, états. |
| `references/layouts.md` | Écran type, parcours des scènes, panneau, mobile. |
| `references/assets.md` | Avant de construire la scène ou de choisir un repli : géométries, matières, photos. |
| `examples/demo.html` | Expérience complète en Three.js (studio fictif « Polar Labs »). |
| `source.md` | Ce qui a été observé, lu sur capture, proposé ; écarts. |

## Typographie

| Rôle | Police (Google Fonts) | Réglages |
|---|---|---|
| Toute l'interface | **IBM Plex Mono** 400 / 500 (c'est la police chargée par le site) | 10px et 11px, interligne 1.45, approche 0.02em ; paragraphes de panneau 13px |
| Logotype | **Unbounded** 700 (le logo du site est un dessin arrondi) | 24px, blanc, léger halo |

## Couleurs

| Rôle | Token |
|---|---|
| Brouillard, scène claire | `--fog`, `--mist`, `--frost` |
| Ciel, roche, ombres | `--sky`, `--rock`, `--shade`, `--steel` |
| Glace | `--ice`, `--frost` |
| Nuit | `--night` |
| Texte | `--steel` (sur clair), `--text` (sur nuit), `--muted` |
| Lueur | `--halo`, `--glow` |
| Étiquettes pleines, pavés | `--white` ; cartouche `--tag` |
| Chargement | `--loader` |
| Franges de la transition | `--prism-a`, `--prism-b`, `--prism-c` |

## Images et 3D

Le visuel est une **vraie scène 3D** en Three.js : amas de glace à facettes, bloc sombre et éclats, socle et sculpture de particules, dans un brouillard de la couleur du fond. Les couleurs viennent des tokens. Sans WebGL, trois photos de glace en niveaux de gris prennent le relais. Logotype, crochets, constellation, traits et étiquettes sont des signes et restent en HTML / SVG ; jamais de glace dessinée en CSS. Détails dans `references/assets.md`.

## Signature

**La scène qui s'assemble sous une interface de coins** : un objet de glace apparaît en fil de fer dans le brouillard, se remplit, et quatre petits blocs de texte monospace l'encadrent aux coins de l'écran.

## À éviter

- De la couleur, des dégradés d'ambiance, des photos colorées.
- Un titre ou un bouton au centre de l'écran ; des boutons pleins ou arrondis.
- Du texte dessiné dans le canvas.
- Des sections qui défilent comme une page classique.
- Des matières réalistes coûteuses sans mesure de fluidité.
- Le logo, la mascotte, les modèles ou les textes du site d'origine.

## Adaptation React / React Native

- `@react-three/fiber` : `<Canvas frameloop="demand" dpr={[0.4, 1.25]}>`, `invalidate()` au défilement, hook `useScrollProgress`.
- Texte en pavés : hook `useScramble(text)`.
- React Native : `expo-gl` + three, ou vidéos pré-rendues par scène ; interface en vues natives ; crochets avec quatre `View` en bordure.
- Polices : `@expo-google-fonts/ibm-plex-mono`, `@expo-google-fonts/unbounded`.

## Avant de livrer

- [ ] Tokens importés, aucune valeur en dur.
- [ ] Scène monochrome, interface aux quatre coins en HTML.
- [ ] Assemblage, texte en pavés, voyage de caméra et transition présents, coupés en mouvement réduit.
- [ ] Fluidité mesurée ; résolution adaptative et repli photo en place.
- [ ] Contrastes vérifiés (`python3 tools/check.py glacial-mono-3d`).
- [ ] Testé à 390px et 1440px, sans débordement horizontal.
- [ ] Aucun élément du site d'origine.
