---
name: hyper-lime-street
description: Direction artistique « Hyper Lime Street » pour le jeu vidéo et la culture urbaine (site officiel de jeu d'action, e-sport, événement, streetwear, skate, musique urbaine, lancement de produit jeune), mesurée sur le site officiel d'un jeu d'action urbain. Fond béton clair traversé de grandes formes inclinées toutes au même angle de 41° - bandes noires tramées, blocs lime fluo portant le titre de section, son sous-titre anglais et un numéro géant 01 à 06, panneaux blancs à liseré lime, pellicule en diagonale. Police d'affiche condensée type Impact, barre de navigation noire à onglet actif en pilule blanche et pilule lime « Télécharger », onglet latéral numéroté, autocollants inclinés, fiches de personnages à vignettes, carrousels vidéo et actualités, texte défilant, pied noir avec abonnement. À utiliser pour une landing de jeu, une page de personnages, un site d'événement ou de marque au style « urbain, fluo, dynamique, manga, graphique ».
---

# Hyper Lime Street

> Du béton, du noir, un lime qui pique les yeux — et tout penche du même côté.

## L'idée

La page est une rue vue en perspective forcée : de **grandes formes inclinées** traversent l'écran et sortent par les bords. Les noires sont tramées comme de la fibre de carbone, les **lime** portent les titres, les blanches portent le contenu. Chaque section a son **numéro géant** et son nom doublé en anglais, comme une signalétique. Par-dessus, des images très colorées, découpées au même angle. La typographie est une affiche : condensée, serrée, noire.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de nom, logo, personnages ni images du jeu d'origine.

## Règles prioritaires

1. **Un seul angle, partout** : 41° (`--angle`). Formes, découpes d'image, pellicule.
2. **Les formes sortent de l'écran** : un bloc lime déborde d'un côté, le panneau et la bande noire de l'autre. Rien ne s'arrête sagement à la marge.
3. **Trois couleurs** : béton `--bg`, noir `--ink`, lime `--accent` ; blanc pour les panneaux. Les images apportent le reste.
4. **Texte noir sur lime, blanc sur noir.** Jamais de lime sur blanc ou sur béton.
5. **Chaque section est numérotée** (01–06) avec titre + sous-titre anglais en capitales + numéro géant.
6. **Une section sur deux est inversée** (bloc lime à droite).
7. **On incline les formes, jamais le texte ni les photos** : les photos sont découpées (`clip-path`), le texte reste droit. Seuls les autocollants sont tournés (±8°).
8. **Commandes en pilules noires** : vignettes, « En savoir plus », plateformes ; pilule lime pour l'action principale.
9. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root`. |
| `references/components.md` | Formes inclinées, image découpée, bloc titre, barre, onglet latéral, visuel d'accueil, fiche de personnage, vignettes, boutons, vidéo, actualités, univers, pied. |
| `references/layouts.md` | Section type, ordre des six sections, éléments fixes, pages internes, mobile. |
| `references/motion.md` | Entrées le long de la diagonale, carrousels, texte défilant, performance, mouvement réduit. |
| `references/assets.md` | Avant de placer une image : sujets, découpe, personnages détourés, formes en CSS. |
| `examples/demo.html` | Accueil complet animé (jeu fictif « NEON DISTRICT »). |
| `source.md` | Référence, mesures, ce qui est proposé, écarts. |

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Numéro de section | **Anton** (site : Impact) | 104.6px, interligne 1 |
| Titre de section | Anton | 36.5px ; sous-titre anglais 18px capitales |
| Nom de personnage | Anton | 49.5px |
| Titre sur image | Anton | 45px, lime |
| Mot géant | Anton | 406px, très pâle |
| Boutons, texte défilant | Anton | 13.5px et 22.5px |
| Barre de navigation | **Inter** 800 | 11.25px, sur deux lignes |
| Texte courant | Inter 400 | 14px / 1.5 |
| Pied | Inter 800 | 24px (titre d'abonnement) |

## Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `--bg` | #efefef | Béton de la page |
| `--surface` | #ffffff | Panneaux, onglet actif |
| `--ink` / `--black` | #111111 / #000000 | Bandes, pied / barre de navigation |
| `--accent` | #d8fa00 | Blocs titre, liserés, pilule principale, titres sur image |
| `--accent-2` | #c6e800 | Bouton d'abonnement |
| `--text` | #222122 | Titres, boutons sombres |
| `--muted` / `--soft` | #61636b / #ccd0d2 | Secondaire sur clair / sur sombre |
| `--field` | #222222 | Champ, bouton rond |

## Images et 3D

De **vraies images** très colorées : un visuel clé de rue, un personnage par fiche (buste, regard fort, idéalement détouré), des images d'action pour les vidéos, des bannières, des lieux. Elles sont découpées à 41°, jamais inclinées ni filtrées. Bandes, blocs lime, pellicule, flèches et logo sont des signes et restent en CSS / SVG ; jamais un personnage ou un décor dessiné. 3D optionnelle pour un modèle de personnage. Détails dans `references/assets.md`.

## Signature

1. Les **grandes formes inclinées à 41°** qui sortent de l'écran.
2. Le **bloc lime numéroté** : titre, sous-titre anglais, numéro géant.
3. Le **panneau blanc à liseré lime** sur bande noire tramée.
4. La **pellicule** en diagonale et le **mot géant** en filigrane.
5. Les **autocollants** inclinés à ombre pleine.

## À éviter

- Plusieurs angles différents, ou des formes qui s'arrêtent au bord du contenu.
- Du texte lime sur fond clair ; du lime en grande surface derrière un paragraphe.
- Incliner une photo ou un bloc de texte avec `skew`.
- Des dégradés, des ombres floues, du verre dépoli : tout est en aplats.
- Une police d'affiche large ou arrondie ; des titres en bas de casse fins.
- Plusieurs animations continues plein écran (le texte défilant suffit).

## Adaptation React / React Native

- **React** : `Shape` (bande, bloc, panneau : un `div` incliné), `SectionBlock` (titre + numéro), `CutImage`, `Carousel` (diapositives + `Thumbs` ou `Dots`, état partagé), `SideTab` et barre pilotés par un seul observateur de section.
- **React Native** : formes en `react-native-svg` (polygones à coins arrondis) ou vues avec `transform: [{ skewX: '-41deg' }]` ; images découpées avec `MaskedView` ; carrousels en `FlatList` horizontale paginée ; texte défilant avec Reanimated (`withRepeat` linéaire, 20s) ; police Anton chargée avec `expo-font`.

## Avant de livrer

- [ ] `:root` copié de `tokens.css`, aucune couleur en dur ailleurs.
- [ ] Un seul angle sur toute la page ; photos et texte non inclinés.
- [ ] Pas de défilement horizontal malgré les formes qui débordent (`overflow-x: clip` sur `main`).
- [ ] Texte du bloc titre entièrement sur le lime, à 1440 et à 390px.
- [ ] Carrousels utilisables au clavier ; section en cours annoncée dans la barre.
- [ ] `prefers-reduced-motion` : formes en place, texte défilant figé.
- [ ] Nom, logo et visuels propres au projet.
