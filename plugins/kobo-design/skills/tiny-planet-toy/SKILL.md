---
name: tiny-planet-toy
description: Direction artistique « Tiny Planet Toy » pour sites-expériences ludiques et mini-jeux web, inspirée des expériences WebGL primées où l'on explore une petite planète dessinée à la main. Turquoise doux, petite planète ronde couverte de maisons et d'arbres au style aquarelle/cel, logo en lettres-blocs posées sur la planète, bouton jaune penché en relief, poussières flottantes, interface minimale. À utiliser pour une landing de jeu indé, un portfolio interactif, une page d'événement ludique, un mini-jeu web ou une app au style « jouet, diorama, monde miniature, cosy 3D ».
---

# Tiny Planet Toy

> Un diorama de poche : une petite planète dessinée flotte dans un ciel turquoise, et un seul bouton jaune invite à jouer.

## L'idée

L'écran entier est un **jouet**. Au centre, une petite planète vue de l'espace (maisons, arbres, routes qui épousent la courbure). Le logo est fait de **lettres-blocs** posées à plat sur la planète, comme des bâtiments. Autour : un turquoise uni, quelques poussières qui dérivent. L'interface se réduit à un **bouton jaune penché, en relief**, et à de petites étiquettes. Rien ne doit rappeler un site web classique tant que la personne n'a pas commencé.

Inspiré de : voir `source.md`. On reprend le principe (planète-diorama, palette, interface-jouet), jamais l'identité : pas le monde, le logo ni les illustrations d'origine.

## Règles prioritaires

1. **Un seul élément central** (la planète) et **un seul appel à l'action** (bouton jaune). Tout le reste attend.
2. **Couleurs douces, encre sombre** : turquoise de fond, crème pour les surfaces, vert sapin pour le texte. Jamais de blanc pur ni de noir pur.
3. **Tout est légèrement penché** (-3°) et **en relief** (ombre pleine de 4px vers le bas qui s'écrase à l'appui).
4. **Typo-jouet** : lettres-blocs (Bungee) pour le logo et les titres, police pixel (Silkscreen) pour les boutons, Nunito pour le texte lu.
5. **Contraste** : texte vert sapin sur turquoise (5,9:1) ; jamais de blanc sur turquoise (2:1).
6. **La planète est en vraie 3D** (Three.js, low-poly, qu'on fait tourner au glisser). Un repli doit exister pour le premier affichage et les appareils sans WebGL : capture du rendu, sinon disque aux couleurs des tokens — jamais de maisons ou d'arbres dessinés en CSS/SVG.
7. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier. |
| `references/components.md` | Planète (Three.js et repli), logo en blocs, bouton relief, bulles de dialogue, HUD minimal, poussières. Puis, observés sur le site : écran de chargement dessiné, bloc de départ 3D, scène de jeu cel-shading. |
| `references/layouts.md` | Écran-titre, écran de jeu / exploration, pages d'info, mobile. |
| `references/motion.md` | Rotation lente, flottement, rebonds, transition titre → jeu. |
| `references/assets.md` | Avant de construire la planète ou de placer un visuel : recette 3D complète (géométrie, matières toon, lumière, caméra, glisser), modèles libres, repli, prompts IA. |
| `examples/demo.html` | Écran-titre complet : planète Three.js qu'on fait tourner au glisser, logo et bouton en HTML. |
| `source.md` | Observations et écarts. |

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Logo, titres | **Bungee** | capitales, blocs, crème avec contour sombre |
| Boutons, HUD | **Silkscreen** | 14–16px, capitales |
| Texte | **Nunito** 600/800 | 16–18px |

## Images et 3D

Pas de photo : le cœur du style est une **petite planète low-poly en Three.js**, toute ronde, avec herbe, chemins de pierre, maisons à toit rouge, arbres et rochers posés selon la normale, en ombrage cel 3 tons aux couleurs des tokens. On la fait **tourner au glisser** (inertie, rotation lente au repos) et la caméra zoome au lancement du jeu. Repli : capture du rendu, sinon un simple disque token. Jamais de dessin CSS/SVG à la place d'une maison, d'un arbre ou d'un personnage. Recette complète dans `references/assets.md`.

## Signature

**Le logo posé sur la planète** : lettres-blocs crème disposées en grille 3×3 par-dessus la planète, avec une ombre portée vers le centre comme si elles étaient des bâtiments.

## À éviter

- Ajouter une barre de navigation, un pied de page chargé ou du texte autour de l'écran-titre.
- Des ombres floues : les reliefs sont pleins et nets.
- Des couleurs saturées criardes : tout est un peu poudré.
- Reproduire le monde, le logo ou les personnages de la référence.

## Adaptation React / React Native

- Planète : `react-three-fiber` sur le web ; en natif, `expo-gl` + `@react-three/fiber/native`, ou une capture du rendu qui tourne (`Animated` rotate).
- Bouton relief : `Pressable` avec `translateY` de 4px à l'appui et une `View` sœur décalée pour le bord.
- Polices : `@expo-google-fonts/bungee`, `silkscreen`, `nunito`.

## Avant de livrer

- [ ] Un seul élément central, un seul bouton d'action.
- [ ] Aucune couleur pure (ni blanc, ni noir).
- [ ] Reliefs pleins, éléments penchés.
- [ ] Vraies images (ou 3D) traitées selon `references/assets.md`, avec `alt` et couleur de repli.
- [ ] Version sans WebGL fonctionnelle, mouvement réduit respecté.
- [ ] Testé à 375px et 1440px.
