---
name: alpine-glass-expedition
description: Direction artistique « Alpine Glass Expedition » pour sites de voyage d'aventure et d'outdoor (agence de trek, randonnée, alpinisme, bivouac, ski de randonnée, safari, écotourisme, refuge, guide de montagne), inspirée d'un concept Dribbble de site de voyages d'aventure. Photo de montagne plein cadre en bleus froids désaturés, de la brume blanche au bleu profond, vignette sombre en bas ; grand titre en serif contrastée et un peu étroite, en capitales blanches sur deux lignes ; nav avec liens minuscules en capitales espacées centrés et pilule blanche à droite ; bouton rond en verre dépoli avec flèche ↗ ; bouton lecture rond ; note « 4,8/5 ★ » ; puces en contour blanc fin ; cartes de voyage arrondies avec panneau de verre. À utiliser pour une landing d'agence d'aventure, une page de séjours, une fiche itinéraire, un site de refuge ou une app de randonnée au style « montagne, brume, verre dépoli, élégant, froid, premium outdoor ».
---

# Alpine Glass Expedition

> Un sommet dans la brume du matin, un titre gravé en capitales blanches, et un bouton de verre posé sur la montagne comme une goutte de givre.

## L'idée

Le site est une **fenêtre sur la montagne** : la photo occupe tout l'écran, dans une gamme **froide et désaturée** qui va du blanc de brume (`--fog`) au bleu de nuit (`--night`), avec une **vignette** qui assombrit le bas pour poser l'interface. Le titre, en **serif d'affiche un peu étroite**, en capitales blanches, donne le ton éditorial et premium ; tout le reste est **minuscule et espacé** (Inter 11px, +0.18em). L'interface est **ronde et transparente** : pilules, puces en contour blanc, bouton lecture, et surtout un **bouton rond en verre dépoli** qui flotte sur la photo. Une seule touche chaude : l'**étoile jaune** de la note.

Inspiré de : voir `source.md`. On reprend le langage visuel (photo froide plein cadre, serif capitales, verre dépoli, pilules), jamais l'identité : pas de nom, logo, photo ni texte d'origine.

## Règles prioritaires

1. **La photo d'abord, et froide** : plein cadre, bleus et blancs désaturés, brume ; jamais de couleurs chaudes saturées. Vignette `--vignette` obligatoire (haut léger, bas sombre).
2. **Deux voix** : serif d'affiche (Instrument Serif) en **capitales** pour les titres ; Inter pour tout le reste, en **petites capitales espacées** (11px, +0.18em) pour la nav, les étiquettes, les boutons et les puces.
3. **Tout est rond** : boutons et puces en pilule, bouton lecture et bouton de verre circulaires, cartes à 28px. Aucun angle vif dans l'interface.
4. **Le verre est rare** : un bouton rond en verre par écran, plus les panneaux de cartes. Toujours `backdrop-filter` + bordure fine claire + reflet interne.
5. **Hiérarchie** : le titre crie (blanc, 48–96px), tout le reste chuchote (11–14px). Pas de taille intermédiaire en héros.
6. **Une seule couleur chaude** : `--star`, uniquement pour l'étoile de note (et l'état d'erreur sur fond nuit). Jamais en fond large.
7. **Contraste** : texte blanc seulement sur zones sombres de la photo (vignette, versants à l'ombre) ou sur `--deep`/`--night` ; sur clair, texte `--deep` ou `--muted` (paires vérifiées dans `references/tokens.css`).
8. **Accessibilité** : cibles ≥ 44px (les puces de 36px ont une zone tactile étendue), `:focus-visible` blanc (bleu profond sur clair), `prefers-reduced-motion` coupe dérive de la brume et entrées ; la photo a un `alt` descriptif.
9. **Aucune valeur en dur** : couleurs, polices, tailles, rayons et durées viennent de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root` dans le projet. |
| `references/components.md` | Avant de coder un bouton (pilule, verre, lecture), la nav, une puce, la note, une carte de voyage, un panneau de verre, un champ. |
| `references/layouts.md` | Avant de construire une page : héros montagne, grille de séjours, méthode, témoignage, appel final, mobile. |
| `references/assets.md` | Avant de placer une image : photo de montagne du héros, cartes de séjour, avatar, traitement froid, sources, prompts IA. |
| `references/motion.md` | Avant d'ajouter une animation ou une transition. |
| `examples/demo.html` | Pour voir le résultat attendu (agence fictive « Hautvent ») et reprendre des morceaux. |
| `source.md` | Shot de référence, ce qui a été vu, écarts. |

## Typographie

| Rôle | Police (Google Fonts) | Réglages |
|---|---|---|
| Titre du héros | **Instrument Serif** 400 | `--text-hero` 46–96px, capitales, interligne 0.94 ; 1re ligne à 0.86em et +0.06em pour que la 2e paraisse plus large |
| Titres de section, cartes | Instrument Serif 400 | `--text-h2` 36–64px / 24px (`--text-lg`), capitales |
| Chiffres (note, statistiques) | Instrument Serif 400 | 44–60px, « /5 » à 0.5em |
| Citations | Instrument Serif 400 + italique | 30–52px, bas de casse, partie en italique `--slate` |
| Nav, étiquettes, boutons, puces | **Inter** 500/600 | 11px, capitales, +0.18em |
| Texte | Inter 400 | 14px / 1.6 sur photo, 16px ailleurs |

La serif du shot n'est pas identifiée : elle est contrastée, transitionnelle, un peu condensée. Instrument Serif en est l'équivalent le plus proche à l'œil ; **Gloock** donne un rendu plus gras et plus dramatique (à garder pour un seul mot-titre).

## Couleurs

| Rôle | Token | Usage |
|---|---|---|
| Brume | `--fog`, `--frost` | fond des sections claires, cartes claires |
| Glace | `--ice` | lointains, texte secondaire sur nuit |
| Versants | `--steel`, `--slate` | teinte froide et repli des photos ; `--slate` en texte secondaire sur clair |
| Profond | `--deep` | texte sur clair, sections sombres, pilule sombre |
| Nuit | `--night` | bas de la vignette, pied de page |
| Blanc | `--white` / `--on-white` | titres sur photo, pilule principale |
| Verre | `--glass`, `--glass-strong`, `--glass-border` | bouton rond, panneaux, puces sur carte |
| Méta | `--muted` | surtitres et méta sur fond clair |
| Chaud | `--star` | étoile de la note, erreur sur nuit |

## Images et 3D

La montagne est une **vraie photo** plein cadre (sommets enneigés, brume, ciel sombre au-dessus du titre), refroidie en CSS : désaturation, teinte bleue en `mix-blend-mode: color`, calque de brume qui dérive, vignette. Les cartes de séjour et l'avatar du témoignage sont aussi de vraies photos traitées de la même façon. Pas de 3D attendue. Jamais de paysage, de personnage ou d'objet dessiné en CSS/SVG à la place d'une photo ; détails dans `references/assets.md`.

## Signature

**Le bouton rond en verre dépoli** (112px) posé sur la photo, à droite du sommet : dégradé bleu glacé translucide, flou d'arrière-plan, bordure 1px claire, reflet en haut à gauche, anneau extérieur fin, flèche ↗ et libellé en capitales minuscules sur 2 lignes. Un par écran, jamais deux.

Avec lui, le **trio du bas du héros** : bouton lecture rond + 3 lignes en capitales à gauche, puces en contour au centre, note « 4,8/5 ★ » à droite.

## À éviter

- Des photos chaudes (coucher de soleil orange, forêt verte saturée) : le style est froid et brumeux.
- Un paysage dessiné en SVG ou des cartes en dégradés CSS à la place des photos.
- Des boutons carrés, des ombres dures, des cartes à angles vifs.
- Mettre le titre en sans-serif ou en gras : il est en serif fine, capitales.
- Multiplier le verre (chaque carte, chaque bouton) : il perd son effet et coûte cher au rendu.
- Du texte blanc sur la neige ou le ciel clair : déplacer le texte ou renforcer la vignette.
- Utiliser `--star` pour des boutons ou des badges.
- Reprendre le nom, le logo, la photo ou les textes du shot de référence.

## Adaptation React / React Native

- **Photo** : `ImageBackground` plein écran + `expo-linear-gradient` pour la vignette (mêmes arrêts que `--vignette`).
- **Verre dépoli** : `expo-blur` (`<BlurView intensity={40} tint="light">`) dans une `View` ronde `overflow: 'hidden'`, bordure `StyleSheet.hairlineWidth` blanche à 45 %, dégradé translucide par-dessus. Sur Android ancien, repli : fond `--glass-solid` à 70 %.
- **Capitales espacées** : `textTransform: 'uppercase'`, `letterSpacing: 2` (≈ 0.18em à 11px).
- **Note** : `Text` imbriqués (« 4,8 » + « /5 » plus petit + « ★ » `--star`), `accessibilityLabel="Note moyenne 4,8 sur 5"`.
- **Cartes de voyage** : `Pressable` + `Animated` (`scale` 1 → 1.05 de l'image au `onPressIn`).
- Brume qui dérive : Reanimated `withRepeat(withTiming(...), -1, true)` sur `translateX`, coupé si `isReduceMotionEnabled`.
- Polices : `@expo-google-fonts/instrument-serif`, `@expo-google-fonts/inter`.

## Avant de livrer

- [ ] Tokens importés, aucune couleur hors `:root` ; palette froide, `--star` seul point chaud.
- [ ] Héros : photo plein cadre + vignette, nav (logo, liens centrés, pilule blanche), titre serif capitales 2 lignes, texte 3 lignes.
- [ ] Vraies images (ou 3D) traitées selon `references/assets.md`, avec `alt` et couleur de repli.
- [ ] Un bouton rond en verre ; trio du bas (lecture + texte, puces, note).
- [ ] Texte blanc uniquement sur zones sombres ; contrastes vérifiés.
- [ ] Boutons : repos, survol, appui, focus, désactivé, chargement (`aria-busy`).
- [ ] Menu mobile accessible (`aria-expanded`).
- [ ] Testé à 390px et 1440px, sans défilement horizontal ; sommet toujours visible en portrait ; mouvement réduit respecté.
- [ ] Aucun élément de la marque d'origine.
