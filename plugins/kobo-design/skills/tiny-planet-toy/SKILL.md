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
6. **3D optionnelle** : la planète peut être en WebGL (Three.js), mais une version CSS/SVG doit exister pour le premier affichage, le mouvement réduit et les appareils modestes.
7. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier. |
| `references/components.md` | Planète (CSS et Three.js), logo en blocs, bouton relief, bulles de dialogue, HUD minimal, poussières. |
| `references/layouts.md` | Écran-titre, écran de jeu / exploration, pages d'info, mobile. |
| `references/motion.md` | Rotation lente, flottement, rebonds, transition titre → jeu. |
| `examples/demo.html` | Écran-titre complet en CSS/SVG. |
| `source.md` | Observations et écarts. |

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Logo, titres | **Bungee** | capitales, blocs, crème avec contour sombre |
| Boutons, HUD | **Silkscreen** | 14–16px, capitales |
| Texte | **Nunito** 600/800 | 16–18px |

## Signature

**Le logo posé sur la planète** : lettres-blocs crème disposées en grille 3×3 par-dessus la planète, avec une ombre portée vers le centre comme si elles étaient des bâtiments.

## À éviter

- Ajouter une barre de navigation, un pied de page chargé ou du texte autour de l'écran-titre.
- Des ombres floues : les reliefs sont pleins et nets.
- Des couleurs saturées criardes : tout est un peu poudré.
- Reproduire le monde, le logo ou les personnages de la référence.

## Adaptation React / React Native

- Planète : `react-three-fiber` sur le web ; en natif, une image ronde qui tourne (`Animated` rotate) ou `expo-gl` + Three.
- Bouton relief : `Pressable` avec `translateY` de 4px à l'appui et une `View` sœur décalée pour le bord.
- Polices : `@expo-google-fonts/bungee`, `silkscreen`, `nunito`.

## Avant de livrer

- [ ] Un seul élément central, un seul bouton d'action.
- [ ] Aucune couleur pure (ni blanc, ni noir).
- [ ] Reliefs pleins, éléments penchés.
- [ ] Version sans WebGL fonctionnelle, mouvement réduit respecté.
- [ ] Testé à 375px et 1440px.
