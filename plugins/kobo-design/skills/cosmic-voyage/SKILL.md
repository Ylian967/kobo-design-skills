---
name: cosmic-voyage
description: Direction artistique « Cosmic Voyage » pour sites et apps de jeu gacha / RPG de science-fantasy, inspirée des sites officiels de RPG spatiaux grand public. Nuit étoilée, panneaux de verre bleuté, cartes sombres à un seul coin arrondi, accents dorés, frise verticale d'emblèmes circulaires, fiches de personnages avec citation. À utiliser pour une page d'accueil de jeu, une page personnages, une liste d'actualités, un launcher, un wiki ou une app au style « voyage spatial, galaxie, train stellaire, gacha élégant ».
---

# Cosmic Voyage

> Un carnet de voyage interstellaire : nuit profonde, verre bleuté, filets dorés, et une seule courbe par carte.

## L'idée

Le fond est toujours une **nuit étoilée** (image ou dégradé + étoiles). Par-dessus flottent deux familles de surfaces : des **cartes noires mates** (actualités, listes) et des **panneaux de verre bleuté** (fiches de personnages). L'or n'est jamais un aplat de fond, sauf pour le bouton d'action principal : il souligne, il encadre, il signale l'élément actif. La typographie est sobre et petite (11–15px), ce sont les illustrations et les panneaux qui portent la page.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de logo, de personnage, d'emblème ni de nom de l'univers d'origine.

## Règles prioritaires

1. **Un seul coin arrondi** sur les cartes (`--radius-card` : haut-droit 28px), les autres coins droits. C'est la signature.
2. **Fond étoilé partout**, jamais d'aplat uni sur une page de contenu.
3. **Or = actif / précieux** : onglet actif, ornements, bouton principal, titre de section. Le bleu `--link` ne sert qu'à l'onglet actif de la barre du haut.
4. **En-tête de section** : petit titre blanc dans une bande sombre qui s'efface vers la droite, avec un trait doré vertical à gauche.
5. **Texte petit mais lisible** : 11–15px en UI, couleurs `--text` / `--text-soft`, jamais de gris plus foncé que `--muted` sur fond sombre.
6. **Contraste** : texte noir sur or (8,7:1) ; or sur carte noire (10,7:1) ; vérifié dans `tokens.css`.
7. **Accessibilité** : cibles ≥ 44px même si le visuel est plus petit (`padding` ou zone cliquable étendue), focus visible doré.
8. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier. |
| `references/components.md` | Barre de navigation, bouton « Télécharger », en-tête de section, onglets, carte d'actualité, panneau de personnage, frise d'emblèmes, carrousel de vignettes, citations, rail social. |
| `references/layouts.md` | Accueil plein écran, page personnages, page actualités, mobile. |
| `references/motion.md` | Intro « hyperespace », transitions de panneaux, survols. |
| `examples/demo.html` | Page d'exemple complète. |
| `source.md` | Mesures et écarts. |

## Typographie

La référence utilise des polices système (Microsoft YaHei, Inter en appoint). Équivalent Google Fonts :

| Rôle | Police | Réglages |
|---|---|---|
| Interface, texte | **Noto Sans** 400/500 (+ Noto Sans SC pour le chinois/japonais) | 11–15px, poids 500 dominant |
| Nom de personnage, grands titres | Noto Sans 300/400 | 30–50px, léger, blanc |
| Citations | **Noto Serif** 400 | 11–12px, blanc, sur bandes noires |

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
- Fond étoilé : image statique ou `react-native-svg` avec quelques centaines de cercles ; éviter un canvas animé en continu.
- Frise d'emblèmes : `FlatList` verticale avec `snapToInterval`.

## Avant de livrer

- [ ] Fond étoilé, aucune page sur aplat uni.
- [ ] Cartes avec un seul coin arrondi.
- [ ] Or réservé à l'actif et au bouton principal.
- [ ] Contrastes et cibles tactiles vérifiés.
- [ ] Testé à 375px et 1440px, mouvement réduit respecté.
- [ ] Aucun élément de l'univers d'origine.
