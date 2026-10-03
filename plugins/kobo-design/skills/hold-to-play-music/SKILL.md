---
name: hold-to-play-music
description: Direction artistique « Hold To Play Music » pour la musique et les expériences interactives (label, artiste, album, festival, rétrospective, lancement, playlist, anniversaire de marque), mesurée sur une rétrospective interactive primée d'un label. Page plein écran sans défilement où l'on maintient une touche puis la relâche pour avancer - mot-titre en lettrage peint bleu Klein, orange et blanc qui s'assemble trait par trait, plans photo ou vidéo en noir et blanc avec grain, consigne « Maintenez ( espace ) pour lancer » avec une touche en pilule dont le contour se remplit en orange, défilement rapide de plans en couleur pendant l'appui, annonce centrée de l'artiste puis de l'année, scène par artiste avec sa propre touche, vignette de pochette, aide, pied de page en police mono. Fond noir, texte blanc, coupes franches. À utiliser pour une expérience musicale, une page d'artiste ou d'album, un site événementiel, un mini-site de marque au style « interactif, clip, fait main, noir et blanc, peinture ».
---

# Hold To Play Music

> On ne clique pas, on ne fait pas défiler : on appuie, on tient, on lâche — et la musique change.

## L'idée

Un écran noir, des images de concert en **noir et blanc** qui se succèdent en coupes sèches, et au milieu un **mot peint à la main** en bleu, orange et blanc. Une seule consigne : **maintenir une touche**. Tant qu'on la tient, tout s'emballe — la couleur revient, les plans défilent, le contour de la touche se remplit. Quand on lâche, un artiste apparaît : son nom, l'année, puis sa scène. Et on recommence. L'interface est presque absente : quelques phrases en gras, une touche dessinée, un pied de page de machine à écrire.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de nom, logo, artistes, pochettes ni vidéos du site d'origine.

## Règles prioritaires

1. **Un geste : maintenir puis relâcher.** Il fait avancer l'expérience ; le défilement n'existe pas.
2. **Gris au repos, couleur dans l'action.** La couleur des images est la récompense de l'appui.
3. **Coupes franches** : les images se remplacent d'un coup, les textes basculent avec `--ease-snap`. Pas de fondu enchaîné.
4. **Trois couleurs de peinture** (`--klein`, `--orange`, blanc) pour le lettrage ; orange vif `--hot` pour l'état « appuyé ». Rien d'autre.
5. **Texte centré, posé sur l'image**, sans carte ni panneau ; contours de 1.6px, pilules et cercles.
6. **Le bleu Klein n'est jamais un texte sur noir** : grandes lettres peintes uniquement.
7. **Toujours une issue sans maintien** (Entrée, clic) et une annulation sans conséquence.
8. **Jamais de son avant un geste.**
9. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root`. |
| `references/components.md` | Mot peint, logo, consigne et touche, écran blanc, annonce d'artiste, touche de scène, barre d'artiste, pochette, aide, pied. |
| `references/layouts.md` | Accueil, enchaînement des écrans, scène d'artiste, mobile. |
| `references/motion.md` | Maintenir / relâcher, coupes, assemblage du mot, performance, mouvement réduit. |
| `references/assets.md` | Avant de placer une image : plans gris et couleur, pochettes, lettrage peint, vidéos, son. |
| `examples/demo.html` | Expérience complète (label fictif « Minuit Dix », cinq artistes). |
| `source.md` | Référence, mesures, ce qui est proposé, écarts. |

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Mot peint, logo | **Londrina Solid** 900 (site : lettrage peint à la main) | lettres étirées ×1.9, inclinées, bords déformés ; ≈ 713 × 187px à 1440 |
| Annonce d'artiste | **Figtree** 600 (site : Camphor 400) | 38px, centré |
| Consigne | Figtree 600 | 20px, interligne 48px |
| Touche, accroche | Figtree 300 (site : Camphor 200) | 17px et 14.3px |
| Pied, mentions | **Inconsolata** 400 | 13px et 12px |
| Générique | Figtree 400 | 46px / 1.4 |

## Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `--bg` | #000000 | Fond, sous les images |
| `--white` | #ffffff | Texte, contours, lettres peintes |
| `--orange` | #e47839 | Lettres peintes, rôles, survols |
| `--klein` | #002fa7 | Lettres peintes ; texte seulement sur blanc |
| `--hot` | #ff6600 | Contour et libellé de la touche pendant l'appui |
| `--grey` / `--pale` | #858585 / #bababa | Mentions, texte secondaire |
| `--paper` / `--ink` | #ffffff / #383838 | Écran blanc d'ouverture, scènes claires |
| `--veil` | noir 45 % | Voile sur les images |

## Images et 3D

De **vraies images plein écran** de musique en train de se faire (chanteuse au micro, guitariste, clavier, batterie, platine), chacune en deux versions : grise au repos, en couleur pendant l'appui. Des pochettes carrées pour chaque artiste. Idéalement des **vidéos** (clips) aux mêmes emplacements. Le lettrage peint, le logo et les pictogrammes sont des signes et restent en SVG ou en police ; jamais un artiste ou un instrument dessiné. 3D ou canvas optionnels pour une scène interactive par artiste. Détails dans `references/assets.md`.

## Signature

1. La **touche en pilule** dont le contour se remplit quand on la tient.
2. Le **mot peint** aux trois couleurs, qui s'assemble puis blanchit.
3. Le **défilement de plans couleur** pendant l'appui, sur fond de plans gris au repos.
4. L'**annonce centrée** : nom et morceau, puis l'année.
5. Le **grain** et le pied de page en mono.

## À éviter

- Un bouton « Suivant » classique à la place du geste (l'issue au clavier existe, mais elle reste discrète).
- Des fondus enchaînés entre images, des transitions douces sur les textes.
- `filter: grayscale()` sur du plein écran, un filtre SVG sur des lettres en mouvement, un zoom ou un grain animés en continu sur tout l'écran (voir « Performance » dans `motion.md`).
- Du texte en bleu Klein sur noir, de l'orange sur blanc sans l'assombrir.
- Des cartes, des fonds de panneau, des ombres.
- Lancer du son au chargement.

## Adaptation React / React Native

- **React** : `useHold({ key: 'Space', duration })` renvoie `{ holding, ready, bind }` (clavier + `pointerdown`/`pointerup`) ; `ShotStack` (images gris / couleur, coupe par `visibility`) ; `HoldKey` (pilule SVG à deux contours) ; `PaintWord` ; `ArtistIntro` (machine à états : nom → année → scène).
- **React Native** : `Pressable` avec `onPressIn` / `onPressOut` à la place de la barre d'espace ; remplissage du contour en `react-native-svg` + Reanimated (`strokeDashoffset`) ; retour haptique au moment « prêt » et au relâcher ; `expo-av` pour les vidéos et le son, démarrés au premier appui.

## Avant de livrer

- [ ] `:root` copié de `tokens.css`, aucune couleur en dur ailleurs.
- [ ] Maintenir fonctionne au clavier, à la souris et au doigt ; relâcher trop tôt ne fait rien ; quitter la fenêtre annule.
- [ ] Entrée sur la touche passe à la suite ; Échap ferme les fenêtres.
- [ ] Chaque image existe en gris et en couleur ; aucun `filter` sur le plein écran.
- [ ] Texte lisible sur chaque plan (voile), bleu Klein jamais en texte sur noir.
- [ ] `prefers-reduced-motion` : pas de défilement rapide, mot en place d'emblée.
- [ ] Pas de défilement horizontal à 390px ; touche de 48px de haut.
- [ ] Nom, lettrage, artistes, images et sons propres au projet.
