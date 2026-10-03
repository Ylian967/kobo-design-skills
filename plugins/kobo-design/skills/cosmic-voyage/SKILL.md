---
name: cosmic-voyage
description: Direction artistique « Cosmic Voyage » pour sites et apps de jeu gacha / RPG de science-fantasy, inspirée des sites officiels de RPG spatiaux grand public. Nuit étoilée, panneaux de verre bleuté, cartes sombres à un seul coin arrondi, accents dorés, frise verticale d'emblèmes circulaires, fiches de personnages avec citation. Couvre l'accueil, les pages personnages et actualités, la carte stellaire des mondes (orbites, mondes lumineux), la fiche d'un monde avec carrousel de lieux et l'accueil mobile (bouton jaune, pilule de téléchargement, bannière cookies). À utiliser pour une page d'accueil de jeu, une page personnages, une liste d'actualités, un launcher, un wiki ou une app au style « voyage spatial, galaxie, train stellaire, gacha élégant ».
---

# Cosmic Voyage

> Un carnet de voyage interstellaire : nuit profonde, verre bleuté, filets dorés, et une seule courbe par carte.

## L'idée

Le fond est toujours une **nuit étoilée** (image ou dégradé + étoiles). Par-dessus flottent deux familles de surfaces : des **cartes noires mates** (actualités, listes) et des **panneaux de verre bleuté** (fiches de personnages). L'or n'est jamais un aplat de fond, sauf pour le bouton d'action principal : il souligne, il encadre, il signale l'élément actif. La typographie est sobre et petite (11–15px), ce sont les illustrations et les panneaux qui portent la page.

La page **Mondes** pousse l'idée jusqu'au bout : une carte stellaire plein écran où de grands anneaux orbitaux fins traversent la nuit bleue et portent des mondes ronds et lumineux ; chaque monde ouvre une fiche sur fond flouté avec un carrousel de lieux.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de logo, de personnage, d'emblème ni de nom de l'univers d'origine.

## Règles prioritaires

1. **Un seul coin arrondi** sur les cartes (`--radius-card` : haut-droit 28px), les autres coins droits. C'est la signature.
2. **Fond étoilé partout**, jamais d'aplat uni sur une page de contenu.
3. **Or = actif / précieux** : onglet actif, ornements, bouton principal, titre de section. Le bleu `--link` ne sert qu'à l'onglet actif de la barre du haut (et au halo des mondes). Exception mobile : le gros bouton de téléchargement est **jaune** `--cta-yellow`, seul aplat jaune du site.
4. **En-tête de section** : petit titre blanc dans une bande sombre qui s'efface vers la droite, avec un trait doré vertical à gauche.
5. **Texte petit mais lisible** : 11–15px en UI, couleurs `--text` / `--text-soft`, jamais de gris plus foncé que `--muted` sur fond sombre.
6. **Contraste** : texte noir sur or (8,7:1) ; or sur carte noire (10,7:1) ; vérifié dans `tokens.css`.
7. **Accessibilité** : cibles ≥ 44px même si le visuel est plus petit (`padding` ou zone cliquable étendue), focus visible doré.
8. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier. |
| `references/components.md` | Barre de navigation, bouton « Télécharger », en-tête de section, onglets, carte d'actualité, panneau de personnage, frise d'emblèmes, carrousel de vignettes, citations, rail social ; carte stellaire et mondes, fiche d'un monde, carrousel de lieux, navigation mobile, bouton jaune, bouton lecture à anneau, bannière cookies. |
| `references/layouts.md` | Accueil plein écran, personnages, actualités, carte des mondes, fiche d'un monde, mobile (observé + proposé). |
| `references/motion.md` | Intro « hyperespace », transitions de panneaux, survols, orbites tracées, carrousel de lieux, menu mobile. |
| `references/assets.md` | Avant de placer une image ou la scène 3D : photos d'espace, traitements, prompts IA, recette Three.js (étoiles, nébuleuse, planète). |
| `examples/demo.html` | Exemple : accueil, personnages, actualités. |
| `examples/mondes.html` | Exemple : carte stellaire des mondes (Three.js + orbites SVG) et fiche d'un monde avec carrousel de lieux ; bouton jaune et menu en mobile. |
| `source.md` | Mesures et écarts. |

## Typographie

La référence utilise des polices système (Microsoft YaHei, Inter en appoint). Équivalent Google Fonts :

| Rôle | Police | Réglages |
|---|---|---|
| Interface, texte | **Noto Sans** 400/500 (+ Noto Sans SC pour le chinois/japonais) | 11–15px, poids 500 dominant |
| Nom de personnage, grands titres | Noto Sans 300/400 | 30–50px, léger, blanc |
| Citations | **Noto Serif** 400 | 11–12px, blanc, sur bandes noires |

## Images et 3D

Le fond étoilé est une **vraie scène 3D** (Three.js) fixe derrière l'interface : champ d'étoiles, nébuleuse en particules aux couleurs des tokens et planète gazeuse annelée d'or qui s'éloigne au défilement, posée sur une photo de nébuleuse qui sert de repli. Les illustrations et vignettes sont de vraies images (illustrations du projet, sinon photos d'espace : nébuleuses, stations, Terre en orbite), fondues dans le verre par un masque en dégradé. Jamais d'étoiles, de planète ou de personnage dessinés en CSS/SVG à la place d'une image ou de la 3D. Sur la carte des mondes, seuls les **anneaux orbitaux** sont tracés (SVG ou lignes Three.js) : l'intérieur de chaque monde est une vraie image recadrée en rond. Détails : `references/assets.md`.

## Pages couvertes

| Page | Gabarit | Composants clés | Exemple |
|---|---|---|---|
| Accueil (une hauteur d'écran) | `layouts.md` § Accueil | bloc de téléchargement, bouton lecture, rail social | `examples/demo.html` |
| Personnages | `layouts.md` § Page personnages | panneau de verre, frise d'emblèmes, citations | `examples/demo.html` |
| Actualités | `layouts.md` § Page actualités | onglets à étoile, carte à un coin | `examples/demo.html` |
| Mondes (carte stellaire) | `layouts.md` § Mondes | orbites, mondes à halo, étiquette « Mondes » | `examples/mondes.html` |
| Fiche d'un monde | `layouts.md` § Fiche d'un monde | bouton Retour, carrousel de lieux | `examples/mondes.html` |
| Mobile | `layouts.md` § Mobile (accueil observé, reste proposé) | pilule blanche + hamburger, bouton jaune, bannière cookies | les deux exemples à 390px |

## Signature

**La carte à un coin** : rectangle noir mat, coin haut-droit arrondi de 28px, vignette à gauche, titre blanc, date grise en bas à droite.

## À éviter

- Arrondir les quatre coins ou mettre des ombres colorées.
- Des dégradés arc-en-ciel ou néon : la palette est nuit + bleu acier + or.
- Des titres énormes en gras : les titres restent légers.
- Copier logos, emblèmes de factions, illustrations ou noms de l'univers de référence.

## Adaptation React / React Native

- Coin unique : `borderTopRightRadius: 28` (natif, aucun souci).
- Verre : `expo-blur` (`BlurView intensity={30} tint="dark"`) + calque bleu `--glass-veil`.
- Fond étoilé : photo de nébuleuse (`expo-image`) + scène `expo-gl` / `@react-three/fiber/native` légère (voir `assets.md`) ; sur appareil faible, l'image seule.
- Frise d'emblèmes : `FlatList` verticale avec `snapToInterval`.

## Avant de livrer

- [ ] Fond étoilé, aucune page sur aplat uni.
- [ ] Cartes avec un seul coin arrondi.
- [ ] Or réservé à l'actif et au bouton principal.
- [ ] Contrastes et cibles tactiles vérifiés.
- [ ] Testé à 375px et 1440px, mouvement réduit respecté.
- [ ] Vraies images (ou 3D) traitées selon `references/assets.md`, avec `alt` et couleur de repli.
- [ ] Aucun élément de l'univers d'origine.
