---
name: serif-bistro-green
description: Direction artistique « Serif Bistro Green » pour restaurants, bistrots, brasseries, traiteurs, caves, épiceries fines et landings food. Héros vert profond avec énorme titre en serif d'affiche crème sur deux lignes et personnage détouré (chef, serveur) glissé entre les mots, barre de navigation flottante translucide avec liens en pilules et petit bouton orange « Réserver une table », sections crème à grand rayon supérieur qui chevauchent le vert comme des feuilles empilées, carrousel de cartes orange avec assiette ronde vue de dessus reliées par une « reliure à spirale », titre échelonné avec petites photos encadrées glissées entre les mots, bandeau newsletter orange aux dessins au trait crème, pied de page vert avec nom géant. À utiliser quand on demande : site de restaurant, réservation de table, carte / menu, landing gastronomique, food, chef, bistronomie, ambiance chaleureuse, vert et orange, serif élégant, éditorial culinaire. Fournit tokens, composants, mises en page, animations et une page d'exemple.
---

# Serif Bistro Green

> Une ardoise vert bouteille, une grande serif crème et une assiette orange qui donne faim : chic, mais on a envie d'y entrer.

## L'idée

Le visiteur doit sentir **la salle avant d'avoir réservé** : chaleur, produit, gens. Le langage vient des sites de restaurants éditoriaux : un **vert profond** qui sert de nappe, une **serif d'affiche à fort contraste** qui parle fort et lentement, un **orange tomate** réservé à ce qui se mange ou se réserve. Le style vit dans le **titre du héros** (énorme, avec un personnage pris entre les deux lignes), dans les **feuilles crème** aux coins très arrondis qui recouvrent le vert, et dans les **cartes de plats** reliées comme un carnet. L'interface (navigation, boutons, champs) reste petite, précise, presque discrète.

Inspiré de : voir `source.md`. On reprend le langage visuel (proportions, rythme, traitements), jamais l'identité : pas de nom, logo, photo ni texte du shot d'origine.

## Règles prioritaires

1. **Trois matières seulement** : vert (`--green`) pour le héros et le pied de page, crème (`--cream`) pour la lecture, orange (`--orange`) pour les plats et le bandeau newsletter. Chaque section est une **feuille** à rayon supérieur 32px qui chevauche la précédente de 32px.
2. **La serif crie, la sans se tait** : DM Serif Display pour tout ce qui est titre, nom de plat, chiffre ; DM Sans 400–500 en 14–16px pour le reste. Jamais de serif en gras, jamais de sans en grand.
3. **Le titre du héros est une affiche** : 2 lignes, 56 → 168px, interligne 0.9, la 1re à gauche, la 2e à droite, un mot en italique orange ; un personnage détouré passe **entre** les deux lignes (derrière la 2e, devant la 1re).
4. **Les boutons sont petits** : rayon 4px, hauteur 44px, 14px ; orange plein (`--orange-strong`) pour l'action, contour crème pour le secondaire, pilule verte seulement dans un champ newsletter.
5. **Contraste** : l'orange vif `--orange` ne porte que du **grand texte** (≥ 24px) ou du texte `--ink` ; tout petit texte blanc ou crème se pose sur `--orange-strong` (paires vérifiées dans `references/tokens.css`).
6. **Mouvement doux** : montées de 24–48px et fondus lents (800ms, `--ease-out`), assiettes qui tournent au survol ; rien qui rebondit.
7. **Accessibilité** : cibles ≥ 44px, focus orange 2px décalé, carrousel utilisable au clavier (flèches + points), `prefers-reduced-motion` respecté.
8. **Aucune valeur en dur** : couleurs, polices, tailles, rayons et durées viennent de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root` dans le projet. |
| `references/components.md` | Avant de coder la navigation flottante, un bouton, une carte de plat, la reliure, le titre échelonné, la newsletter, un champ, une puce. |
| `references/layouts.md` | Avant de construire une page : héros avec personnage, feuilles empilées, carrousel, expériences, pied de page, mobile. |
| `references/motion.md` | Avant d'ajouter une animation : entrée du héros, apparitions au défilement, assiettes, carrousel. |
| `examples/demo.html` | Pour voir le résultat attendu et reprendre des morceaux. |
| `source.md` | Pour connaître le shot de référence, ce qui a été vu et les écarts. |

## Typographie

| Rôle | Police (Google Fonts) | Poids | Taille | Interlignage | Espacement |
|---|---|---|---|---|---|
| Titre du héros | **DM Serif Display** | 400 (+ italique) | `--text-hero` (56 → 168px) | 0.9 | -0.02em |
| Titres de section, titre échelonné | DM Serif Display | 400 | `--text-3xl` (40 → 80px) | 1–1.15 | 0 |
| Noms de plats, chiffres, citations | DM Serif Display | 400 | 20–28px | 1.1 | 0 |
| Nom géant du pied de page | DM Serif Display | 400 | `--text-wordmark` (80 → 320px) | 0.72 | -0.04em |
| Texte courant | **DM Sans** | 400 | 16px | 1.6 | 0 |
| Navigation, boutons | DM Sans | 500 | 14px | 1 | 0 |
| Surtitres | DM Sans | 500 | 12px | 1 | +0.1em, capitales, tiret de 24px devant |

Le shot montre une serif d'affiche haute et contrastée (type Abril Fatface / DM Serif Display) ; DM Serif Display est retenue car elle a une italique, utile pour le mot coloré du titre.

## Couleurs

| Rôle | Token | Usage |
|---|---|---|
| Nappe | `--green` / `--green-deep` | héros, pied de page, barre de navigation, titres sur crème |
| Papier | `--cream` / `--card` | sections de lecture ; cadres photo et champs |
| Accent | `--orange` | cartes de plats, bandeau newsletter, icône du logo, mot en italique du héros |
| Action | `--orange-strong` | boutons principaux, petit texte sur orange en blanc |
| Texte | `--ink` / `--muted` sur crème ; `--cream` / `--cream-muted` sur vert | |
| Illustration | `--skin`, `--herb`, `--tomato`, `--crust` | uniquement pour les visuels dessinés (personnage, assiettes) |

Règle d'usage : **l'orange = ce qui se mange ou se réserve**. Pas d'orange décoratif ailleurs (pas de filets, pas d'icônes orange dans le texte).

## Signature

**Le personnage entre les mots** : dans le héros vert, une personne détourée (chef qui tend une assiette) se tient au centre, sa tête passe devant la première ligne du titre et la seconde ligne passe devant son torse ; le bas du personnage est coupé net par la feuille crème qui remonte. Une seule fois, en haut de la page d'accueil. Écho secondaire : **la reliure** — les cartes orange du carrousel sont percées d'encoches sur les bords et reliées par une colonne d'anneaux, comme un carnet de commandes.

## À éviter

- Des photos plein cadre sans détourage dans le héros : la signature disparaît.
- Des boutons arrondis géants ou en pilule partout : ils sont petits et presque carrés.
- Plusieurs accents (bleu, jaune…) : vert, crème, orange, point.
- Mettre du petit texte blanc ou crème sur l'orange vif (3,2:1) : passer en `--orange-strong` ou en `--ink`.
- Des sections plates bord à bord : chaque section est une feuille arrondie qui recouvre la précédente.
- Reprendre le nom, le logo, les photos ou les textes du shot de référence.

## Adaptation React / React Native

- Feuilles empilées : `View` avec `borderTopLeftRadius/RightRadius: 32` et `marginTop: -32`, `zIndex` croissant.
- Personnage entre les mots : trois couches absolues (ligne 1, image PNG détourée, ligne 2) dans un même conteneur ; en natif, l'ordre des enfants fait le `zIndex`.
- Carrousel : `FlatList` horizontale avec `snapToInterval` = largeur de carte + gouttière ; reliure dessinée en `react-native-svg` (anneaux) entre les cartes, encoches via `View` ronds couleur crème sur les bords.
- Barre flottante translucide : `expo-blur` (`BlurView`) teinté vert profond.
- Titre échelonné avec photos : `Text` imbriqués + `Image` en ligne (iOS) ou lignes en `flexDirection: 'row'` avec `flexWrap` (plus fiable sur Android).
- Polices : `@expo-google-fonts/dm-serif-display`, `@expo-google-fonts/dm-sans`.

## Avant de livrer

- [ ] Tokens importés, aucune valeur en dur.
- [ ] Héros vert avec titre serif 2 lignes et personnage glissé entre les mots.
- [ ] Sections en feuilles arrondies qui se chevauchent (vert → crème → orange → vert).
- [ ] Cartes de plats orange reliées, carrousel au clavier, points synchronisés.
- [ ] Boutons petits (rayon 4px), états survol / focus / appui / désactivé conformes à `references/components.md`.
- [ ] Contrastes vérifiés (petit texte jamais blanc sur `--orange`).
- [ ] Testé à 375px et 1440px sans défilement horizontal ; mouvement réduit respecté.
- [ ] Aucun élément du shot d'origine (nom, logo, photos, textes).
