---
name: cosmic-voyage
description: Direction artistique « Cosmic Voyage » pour sites et apps de jeu gacha / RPG de science-fantasy, inspirée du site officiel d'un RPG spatial grand public. Nuit étoilée bleu profond, barre noire à lien actif bleu et plaque dorée « Télécharger », frise dorée verticale à nœuds le long de la page, titres en petit cartouche, cartes sombres à cadre doré dont un seul coin est arrondi, cartes de personnages très hautes, frise d'emblèmes ronds, panneau de verre bleu avec portrait qui déborde et citation en bandes noires, carte stellaire à orbites et mondes lumineux, rail « Suivre » à pastilles. Animée — saut en hyperespace à l'arrivée, étoiles qui scintillent, barre qui s'efface au défilement, carrousel, changement de personnage en glissé-fondu. Couvre l'accueil, les pages personnages et actualités, la carte des mondes, la fiche d'un monde et le mobile. À utiliser pour une page d'accueil de jeu, une page personnages, une liste d'actualités, un launcher, un wiki ou une app au style « voyage spatial, galaxie, train stellaire, gacha élégant ».
---

# Cosmic Voyage

> On saute en hyperespace, puis on descend le long d'un fil d'or : actualités, personnages et mondes défilent sur une nuit étoilée.

## L'idée

Tout repose sur **deux matières** : la **nuit étoilée** bleu profond, et le **noir** des barres. Dessus, une seule couleur d'ornement, **l'or** (cadres fins, dates, frise, emblèmes), et un seul **bleu vif** pour le lien courant. Les images, très colorées, vivent dans des **cadres sombres dont un seul coin est arrondi**. La page se lit comme un itinéraire : un **filet doré vertical** relie des **nœuds** posés devant chaque section. Les personnages ont leur propre mobilier : une **frise d'emblèmes ronds** et un **panneau de verre bleu** d'où le portrait déborde.

Le mouvement est sobre : un grand effet à l'arrivée, puis des fondus courts (`references/motion.md`).

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : ni logo, ni personnages, ni illustrations, ni noms, ni textes du jeu d'origine.

## Règles prioritaires

1. **Nuit et noir** : fond de page en dégradé `--bg-top` → `--bg` avec un ciel d'étoiles ; barres et bandes en `--nav`. Pas de section claire.
2. **L'or est un ornement** : cadres de 1px, dates, frise, emblèmes, bouton principal. Le bleu `--link` ne sert qu'au lien courant.
3. **Un seul coin arrondi** (`--radius-card`, haut droit) sur les cartes ; boutons à 12px ou sans arrondi.
4. **Petite typographie** : 11 à 15px pour presque tout, noms à 30px. Une seule famille sans-serif ; la serif italique est réservée aux citations.
5. **La frise du voyage** : filet doré vertical à gauche, un nœud et un titre en cartouche par section.
6. **Personnages** : cartes très verticales (226 / 486), puis frise d'emblèmes + panneau de verre + citation en bandes.
7. **Le verre est peint** : dégradés translucides, pas de flou d'arrière-plan.
8. **Fluide** : aucune boucle après l'intro, un seul écouteur de défilement (`motion.md`, « Performance »).
9. **Accessibilité** : cartes, vignettes, emblèmes et mondes sont des boutons ou des liens (`aria-pressed`), `aria-live` sur le compteur et le formulaire, `prefers-reduced-motion` supprime l'intro et affiche tout, cibles ≥ 44px, focus doré.
10. **Aucune valeur en dur** : tout vient de `references/tokens.css` (les couleurs de l'intro sont lues dans les variables CSS).

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : couleurs, tailles, rayons, durées mesurés. |
| `references/motion.md` | **Toujours** : les 7 mouvements signature, le code, la performance. |
| `references/components.md` | Barre, logotype, héros, rail, frise et titre, carte d'actualité, boutons, carte de personnage, frise d'emblèmes, panneau de verre, carte stellaire, liste d'actualités, abonnement, états. |
| `references/layouts.md` | Ordre et mesures de l'accueil, pages internes, mobile. |
| `references/assets.md` | Avant de placer une image : sujets, cadrages, traitements, sources. |
| `examples/demo.html` | Accueil complet et animé (jeu fictif « Astralis »). |
| `examples/mondes.html` | Carte stellaire et fiche d'un monde (page statique, passe précédente). |
| `source.md` | Ce qui a été mesuré, observé, proposé ; écarts. |

## Typographie

| Rôle | Police (Google Fonts) | Réglages |
|---|---|---|
| Tout le texte | **Noto Sans** 400 / 500 / 700 (site : police système Microsoft YaHei) | nav 15px ; titres de carte 12px / 1.66 ; dates et libellés 11px ; noms de carte 15 à 17px ; nom de la fiche 30px en 400 ; titre d'abonnement 24px en 700 |
| Citations | **Noto Serif** italique | 12px, sur bandes noires |
| Logotype | Noto Sans 700 italique | capitales très espacées |

## Couleurs

| Rôle | Token |
|---|---|
| Nuit (haut, bas, halo) | `--bg-top`, `--bg`, `--bg-glow` |
| Barres, bande d'abonnement, pied | `--nav`, `--sub`, `--bg-deep` |
| Cartes | `--surface`, `--surface-2` |
| Texte | `--text`, `--text-soft`, `--muted` |
| Ornements, dates, onglet actif | `--gold` |
| Bouton principal | `--accent`, `--accent-hot` (texte `--on-accent`) |
| Lien courant | `--link` |
| Verre | `--glass`, `--glass-light` (texte `--ink-glass`), `--glass-edge` |
| Carte des mondes | `--map-bg`, `--map-bg-2`, `--orbit`, `--halo` |
| Mobile | `--pill`, `--cta-yellow` |

## Images et 3D

De **vraies images** sur fond sombre : un visuel clé plein écran, des visuels d'annonce, des personnages en buste (cartes) et en pied (fiche), des mondes en icônes rondes à halo. Le ciel de la page est une photo d'étoiles sous un dégradé. Logotype, emblèmes, orbites, frise et étoiles animées sont des signes et restent en CSS / SVG ; jamais un personnage ou une planète dessinés. 3D optionnelle pour la carte des mondes. Détails dans `references/assets.md`.

## Signature

**Le fil d'or et le coin unique** : une nuit étoilée traversée d'un filet doré à nœuds, des cartes sombres à cadre doré dont seul le coin haut droit est arrondi, et un panneau de verre bleu d'où sort le personnage.

## À éviter

- Des sections claires, des cartes à quatre coins arrondis, des ombres portées.
- De l'or en aplat partout, ou d'autres couleurs d'interface.
- De grands titres : ici les titres sont petits et dans un cartouche.
- Un flou d'arrière-plan sur le panneau, des animations en boucle voyantes.
- Des personnages sur fond clair.
- Le logo, les personnages, les noms ou les textes du jeu d'origine.

## Adaptation React / React Native

- Carte à coin unique : `borderTopRightRadius: 28` ; cadre doré 1px.
- Intro : canvas dans un `useEffect`, avec le filet de sécurité `setTimeout`.
- Fiche : état `index`, classe `is-swap` pendant 400ms ; `react-native-reanimated` en natif.
- Orbites et emblèmes : `react-native-svg`.
- Polices : `@expo-google-fonts/noto-sans`, `@expo-google-fonts/noto-serif`.

## Avant de livrer

- [ ] Tokens importés, aucune valeur en dur.
- [ ] Nuit étoilée et barres noires ; or en ornement, bleu pour le seul lien courant.
- [ ] Cartes à un seul coin arrondi ; frise dorée et nœuds devant chaque section.
- [ ] Vraies images sur fond sombre, avec `alt` et replis.
- [ ] Les mouvements de `motion.md` présents là où la page en a besoin, coupés en mouvement réduit.
- [ ] Contrastes vérifiés (`python3 tools/check.py cosmic-voyage`).
- [ ] Testé à 390px et 1440px, sans débordement horizontal.
- [ ] Aucun élément du jeu d'origine.
