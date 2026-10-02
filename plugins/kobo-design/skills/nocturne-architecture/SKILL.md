---
name: nocturne-architecture
description: Direction artistique « Nocturne Architecture » pour studios d'architecture, promoteurs et agences immobilières haut de gamme (résidences de luxe, villas, tours, architecture d'intérieur, hôtellerie), inspirée d'un concept Dribbble de site de studio d'architecture. Site noir presque pur, photo de ville la nuit en pose longue (tours éclairées, traînées de phares) en plein écran, mot-marque géant en minuscules serrées coupé en bas du héros, liens minuscules en haut, date / heure / température en capitales, une seule couleur d'accent rouge signal (pilule « Parlons-en », bouton lecture du showreel, carte de projet rouge, ligne de progression), grande phrase bicolore blanc puis gris, chiffres clés fins en grille 2×2 sur filets, carrousel de cartes 4:5, étapes numérotées 01 / 02 / 03 en accordéon. À utiliser pour une page d'accueil de studio, un portfolio de projets, une vitrine de programmes immobiliers ou une app de promoteur au style « luxe, nuit, minimal, architecture, noir et rouge ».
---

# Nocturne Architecture

> La ville la nuit, un nom immense en bas de l'écran et un seul point rouge qui dit « appelez-nous ».

## L'idée

Le visiteur doit sentir le **calme cher** d'un studio qui n'a rien à prouver : beaucoup de noir, des textes minuscules, et une image de ville nocturne qui fait tout le travail. Le langage vient des sites de studios d'architecture et de promoteurs de luxe : **photo plein cadre en pose longue**, **mot-marque géant** en minuscules qui déborde en bas du héros, puis des sections noires très aérées rythmées par des **filets fins**. Le style vit dans trois endroits : le héros, la **grande phrase bicolore** (blanc puis gris) et le **rouge signal**, utilisé avec parcimonie. Tout le reste (navigation, libellés, listes) se tait : petit, blanc ou gris, sans fond.

Inspiré de : voir `source.md`. On reprend le langage visuel (proportions, rythme, traitements), jamais l'identité : pas de nom de studio, de logo, de photo ni de texte du shot d'origine.

## Règles prioritaires

1. **Noir + une image + un rouge.** Fond `--bg` (#111), photos nocturnes bleutées, et `--accent` rouge réservé à : la pilule de contact, le bouton lecture, une carte de projet par carrousel, la ligne de progression, l'étape ouverte. Jamais en fond de section.
2. **Le mot-marque géant** occupe toute la largeur du héros, en minuscules, interlettrage -0.04em, et il est **coupé par le bas** (environ un quart de sa hauteur hors champ). Un seul par page (un rappel en gris très sombre dans le pied de page est permis).
3. **Hiérarchie par la taille, pas par la graisse** : titres en Inter Tight 400, chiffres en 300 ; libellés en capitales 11px espacées. Le gras est presque absent.
4. **Phrase bicolore** : chaque grand texte se termine en `--dim` (gris) ; la première idée en blanc, la suite en gris.
5. Contraste : texte courant ≥ 4,5:1 ; `--dim` (#777) et le rouge `--accent` en texte uniquement en grand (≥ 24px) ; petit texte rouge en `--accent-text` ; texte sur rouge en `--on-accent` (paires vérifiées dans `references/tokens.css`).
6. **Formes** : pilules (999px) pour les actions, cercles 44px à contour fin pour les flèches, cartes et photos presque droites (4px). Séparateurs = filets 1px `--line`.
7. **Mouvement lent et cinématique** : le mot-marque monte lettre par lettre au chargement, la photo du héros zoome très lentement (vraie vidéo de traînées si on en a une), les photos zooment de 4 % au survol. Rien ne rebondit.
8. Accessibilité : cibles ≥ 44px, focus visible (contour rouge clair), `prefers-reduced-motion` respecté, le carrousel se pilote au clavier.
9. Aucune valeur en dur : couleurs, polices, tailles, rayons et durées viennent de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root` dans le projet. |
| `references/components.md` | Avant de coder une pilule, un bouton rond, la navigation, l'horloge, une carte de projet, une stat, une étape, un champ. |
| `references/layouts.md` | Avant de construire une page : héros nocturne, « À propos », carrousel de projets, méthode, contact, mobile. |
| `references/motion.md` | Avant d'ajouter une animation ou une transition. |
| `references/assets.md` | Avant de placer une image ou une scène 3D : sujets nocturnes, cadrages (plein écran, 4:5, 4:3), étalonnage nuit, sources, prompts IA, 3D optionnelle. |
| `examples/demo.html` | Pour voir le résultat attendu et reprendre des morceaux. |
| `source.md` | Pour connaître le shot de référence et ce qui a été estimé. |

## Typographie

| Rôle | Police (Google Fonts) | Poids | Taille | Interligne | Espacement |
|---|---|---|---|---|---|
| Mot-marque géant | **Inter Tight** | 500 | `--text-wordmark` (jusqu'à 44vw) | 0.92 | -0.04em, minuscules |
| Titres de section | Inter Tight | 400 | `--text-title` 32–52px | 1.08 | -0.03em |
| Grande phrase | Inter Tight | 400 | `--text-statement` 24–40px | 1.2 | -0.02em |
| Chiffres clés | Inter Tight | 300 | `--text-stat` 48–88px | 1 | -0.04em, « + » en `--muted` à 60 % |
| Texte courant | **Inter** | 400 | 14–16px | 1.55 | normal |
| Libellés, date, heure | Inter | 500 | 11px | 1 | +0.08em, capitales |

La police du shot ressemble à une Helvetica / Inter Display ; **Inter Tight** est l'équivalent gratuit choisi à l'œil.

## Couleurs

| Rôle | Token | Usage |
|---|---|---|
| Fond | `--bg` #111 / `--surface` #141414 | Sections alternées, sans bord |
| Relief | `--raised` #1c1c1c | Survols, menu mobile, champs |
| Texte | `--text` blanc | Titres, liens |
| Secondaire | `--muted` #8a8a8a | Libellés, « + », légendes |
| Suite de phrase | `--dim` #777 | Grand texte seulement |
| Filets | `--line` #2a2a2a | Séparateurs, stats, étapes |
| Accent | `--accent` #e3191f + `--on-accent` | Pilule, lecture, carte rouge, progression |
| Photos | `--night`, `--night-3`, `--grade-night` | Repli et teinte des photos, jamais l'interface |

**Règle de l'accent** : au plus trois touches rouges visibles dans un même écran.

## Images et 3D

Le style repose sur de **vraies photos d'architecture la nuit** : ville en pose longue pour le héros, villas et tours éclairées pour les cartes 4:5 et les étapes 4:3. Toutes passent par le même étalonnage (`--grade-night`, teinte bleu nuit, voile `--shade-card` ou `--shade-hero`) avec `--night` en couleur de repli. La 3D est optionnelle (maquette `.glb` du programme, éclairage qui passe du jour à la nuit). Jamais de dessin CSS/SVG à la place d'une photo, d'un bâtiment ou d'une ville : détails, sources et prompts dans `references/assets.md`.

## Signature

**Le héros nocturne au mot-marque coupé** : photo de ville en pose longue plein écran, voile noir en haut et en bas, mot-marque blanc géant posé sur la ligne du bas et tronqué par le bord. Associé à la pilule rouge « Parlons-en » en haut à droite et au bouton lecture rouge en haut à gauche. Une fois par page, en ouverture.

## À éviter

- Des couleurs secondaires (bleu d'interface, dégradés vifs) : le bleu n'existe que dans les photos.
- Des titres en gras ou en capitales : le luxe ici est fin et minuscule.
- Le rouge en fond de section, en texte courant ou sur plus de trois éléments par écran.
- Des cartes à grands rayons, des ombres portées visibles, des icônes colorées.
- Un mot-marque centré entier et sage : il doit déborder.
- Copier des assets, logos, textes ou interfaces du shot de référence.

## Adaptation React / React Native

- Mot-marque : `Text` avec `fontSize` calculé (`width * 0.44`), `letterSpacing` négatif en points (`-0.04 * fontSize`), dans une `View` en `overflow: 'hidden'` ; montée des lettres avec Reanimated (`withDelay` par lettre).
- Photo du héros : `ImageBackground` + `LinearGradient` (expo-linear-gradient) pour le voile haut et bas.
- Traînées de phares : vidéo en boucle (`expo-av`) ou image fixe ; ne pas les recréer en vues natives.
- Carrousel : `FlatList` horizontale, `snapToInterval`, `decelerationRate="fast"` ; ligne de progression = `Animated.View` dont la largeur suit `scrollX`.
- Étapes : `Pressable` + hauteur animée (`LayoutAnimation` ou Reanimated `Layout`), une seule ouverte.
- Horloge : `Intl.DateTimeFormat('fr-FR')` mis à jour chaque minute.
- Polices : `@expo-google-fonts/inter-tight`, `@expo-google-fonts/inter`.

## Avant de livrer

- [ ] Tokens importés, aucune valeur en dur.
- [ ] Héros : photo nocturne plein écran, voile, mot-marque géant coupé en bas, liens + horloge + pilule rouge.
- [ ] Au plus trois touches de rouge par écran.
- [ ] Grande phrase bicolore et chiffres fins sur filets.
- [ ] Carrousel 4:5 avec une carte rouge, flèches rondes et ligne de progression.
- [ ] Composants conformes à `references/components.md` (repos, survol, appui, focus, désactivé).
- [ ] Testé à 390px et 1440px, sans défilement horizontal ; mouvement réduit respecté.
- [ ] Vraies images (ou 3D) traitées selon `references/assets.md` (nuit, étalonnage commun), avec `alt` et couleur de repli `--night`.
- [ ] Aucun élément du shot d'origine (nom, logo, photos, textes).
