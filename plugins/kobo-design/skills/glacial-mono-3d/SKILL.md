---
name: glacial-mono-3d
description: Direction artistique « Glacial Mono 3D » pour sites-vitrines immersifs en 3D (entreprise tech, web3, studio, lancement produit), inspirée des sites primés où une scène 3D glacée et monochrome occupe tout l'écran. Gris-bleu acier, neige et brouillard, objets 3D lumineux (blocs de glace, particules), interface minuscule en monospace collée aux bords, crochets de coin autour des boutons, texte qui se brouille avant de s'afficher, chargement en caractères ASCII, défilement qui fait voyager la caméra. À utiliser pour une landing 3D, un site corporate « froid et premium », un portfolio WebGL ou une page de lancement au style « glace, minimal, monospace, techno ».
---

# Glacial Mono 3D

> Une vitrine prise dans la glace : une scène 3D grise et silencieuse, et une interface qui chuchote en monospace dans les coins.

## L'idée

La **scène 3D est la page**. Elle occupe tout l'écran, et le défilement déplace la caméra d'un objet à l'autre (un bâtiment de glace, un logo en particules, un socle). L'interface est **minuscule** (10–13px), en **monospace**, collée aux bords : logo en haut à gauche, rubrique en haut à droite, son et aide en bas. Les boutons sont entourés de **crochets de coin** `⌜ ⌟`. Le texte se **brouille** (caractères aléatoires) avant de se fixer. Deux ambiances alternent : brouillard clair et nuit d'acier.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de logo, de personnage, de marque ni de modèles 3D d'origine.

## Règles prioritaires

1. **Monochrome strict** : uniquement les gris-bleus de `tokens.css` ; la seule « couleur » est la lueur blanche (`--glow`).
2. **Une seule famille de police** (IBM Plex Mono), petite, avec des préfixes en barres obliques (`////// Manifeste`, `/// Découvrir`).
3. **Interface aux bords, contenu au centre** : jamais de grille de cartes, jamais de bloc de texte large (colonne 360px max).
4. **Crochets de coin** sur tous les éléments cliquables.
5. **Contraste selon l'ambiance** : sur scène claire, encre `--steel` ; sur scène sombre, `--text`. Si un texte blanc passe sur du clair, ajouter un voile (`--scrim-dark`) — le blanc sur brouillard ne fait que 2,5:1.
6. **Repli sans WebGL** : image fixe de la scène + même interface ; le site reste lisible et navigable.
7. **Mouvement réduit** : caméra par coupes au lieu de travellings, texte affiché sans brouillage.
8. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier. |
| `references/components.md` | Chargeur ASCII, crochets, texte brouillé, bouton son, panneau de contenu, carrousel 3D sur socle, défilant. |
| `references/layouts.md` | Scène plein écran, chapitres au défilement, panneau de contenu, mobile. |
| `references/motion.md` | Caméra, brouillage, transitions de chapitre, Three.js. |
| `examples/demo.html` | Démo en CSS (sans WebGL) avec l'interface complète. |
| `source.md` | Observations et écarts. |

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Interface et texte | **IBM Plex Mono** 400/500 | 10–13px, interligne 1.45 |
| Logotype | **Unbounded** 700 (équivalent arrondi et large) | 24px, blanc avec halo |

## Signature

**Le bouton à crochets** : un libellé monospace entouré seulement de quatre coins (pas de cadre complet), qui se referment légèrement au survol.

## À éviter

- Ajouter de la couleur, des dégradés vifs, des icônes colorées.
- Des titres énormes : ici le gigantisme est porté par la 3D, pas par la typo.
- Un menu classique en haut au centre.
- Reprendre le logo, la mascotte, les marques ou les modèles 3D de la référence.

## Adaptation React / React Native

- Web : `@react-three/fiber` + `@react-three/drei` (`ScrollControls`, `Environment`, `Float`), post-traitement léger (bloom).
- Natif : vidéo pré-rendue de la scène en fond (`expo-video`, boucle muette) + interface en `View` absolues.
- Texte brouillé : un hook `useScramble(text)` qui remplace progressivement des caractères aléatoires.

## Avant de livrer

- [ ] Monochrome strict, une seule police.
- [ ] Interface collée aux bords, colonne de texte étroite.
- [ ] Crochets sur tous les éléments cliquables.
- [ ] Contraste vérifié dans les deux ambiances.
- [ ] Repli sans WebGL et mouvement réduit fonctionnels.
- [ ] Testé à 375px et 1440px.
