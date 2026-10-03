---
name: arena-guide
description: Direction artistique « Arena Guide » pour pages de guide, tutoriel et présentation de jeu compétitif, inspirée des pages « comment jouer » des grands MOBA. Bleu nuit, or et cyan, titres à empattements très gras en italique capitales, sections centrées qui alternent texte et visuel, médaillons circulaires à anneau (allié cyan / adversaire rouge) servant d'onglets, carte de jeu en fond fondu, vidéos courtes avec sélecteur. Couvre aussi les pages internes : barre globale avec menus déroulants, liste de personnages jouables en cartes portrait, fiche personnage (héros splash, compétences en onglets avec vidéo à double cadre doré, carrousel de skins), page d'actualités en grille, mobile. À utiliser pour un guide de jeu, un roster ou une fiche de héros, un hub d'actus de jeu, un onboarding, une page « règles du jeu », une page de présentation de mode, une app d'apprentissage ou un wiki au style « arène fantasy compétitive ».
---

# Arena Guide

> Un manuel d'arène : nuit bleue, or patiné, titres gravés en italique, et chaque notion se découvre en cliquant sur un médaillon.

## L'idée

La page enseigne. Chaque section répond à une question (« Détruire la base », « À l'assaut de la jungle ») avec un **titre énorme en serif italique capitales**, un paragraphe court et centré, et un **élément interactif** : des médaillons circulaires qui changent le visuel et l'explication, ou une vidéo de 6 secondes avec ses vignettes. Le fond reste bleu nuit, une seule section blanche ouvre la page. L'or marque la marque et les sélections ; le cyan marque l'action et « notre camp » ; le rouge marque l'adversaire.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de logo, de champion, de carte de jeu ni de nom de l'éditeur.

## Règles prioritaires

1. **Titres de section** : serif 800–900 italique capitales, 36–57px, blancs sur nuit (ou nuit sur blanc). C'est l'élément qui fait le style.
2. **Texte centré et court** : 18px / 28px, 2 à 4 lignes, colonne ≤ 880px.
3. **Code couleur de camp** : cyan = allié / action ; rouge = adversaire ; or = sélection / marque. Jamais de cyan et de rouge dans le même anneau.
4. **Bouton principal** : dégradé cyan à 315°, texte noir capitales Inter 600 espacé, rayon 12px. Un seul type de bouton plein.
5. **Médaillons-onglets** : cercle avec anneau de 4px et petit losange en haut, libellé en capitales dessous ; l'actif est blanc, les autres en `--muted`.
6. **Contraste** : texte noir sur cyan (9:1) ; le rouge `--enemy` n'est utilisé qu'en anneau ou en texte ≥ 24px.
7. **Accessibilité** : les médaillons sont de vrais onglets (`role="tab"`, flèches clavier) ; les vidéos ont des contrôles et sont muettes par défaut.
8. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier. |
| `references/components.md` | Navigation, boutons, titres, médaillons-onglets, bloc vidéo + vignettes, carte en fond, héros vidéo ; puis **menu déroulant**, en-tête de liste, recherche/filtres, carte champion, héros de fiche + cartes info, onglets de compétences + double cadre doré, carrousel de skins, bandeau et carte d'actu. |
| `references/layouts.md` | Guide (héros, intro blanche, objectifs, vidéos) + gabarits **liste**, **fiche**, **actus** et **mobile observé**. |
| `references/motion.md` | Courbe « snap » mesurée, onglets, apparitions, survols de cartes, menu déroulant, skins. |
| `references/assets.md` | Avant de placer une image : paysages fantasy, médaillons, carte fondue, voiles, sources, prompts IA, 3D optionnelle. |
| `examples/demo.html` | Page guide « comment jouer ». |
| `examples/champions.html` | Liste : barre globale + menu déroulant, en-tête « Choisissez votre », recherche/filtres, grille de cartes portrait, actus en grille. |
| `examples/champion.html` | Fiche : héros splash + cartes info, compétences en onglets + vidéo à double cadre doré, carrousel de skins. |
| `source.md` | Mesures, pages explorées (mesuré / observé) et écarts. |

## Pages couvertes

| Page | Gabarit (`layouts.md`) | Composants clés (`components.md`) | Exemple |
|---|---|---|---|
| Guide « comment jouer » | Structure d'une page guide | Médaillons-onglets, bloc vidéo + vignettes, carte en fond | `demo.html` |
| Barre globale + menus | Barre globale | Menu déroulant (panneau `--nav-panel`, bord cyan), pilule JOUER | `champions.html`, `champion.html` |
| Liste des personnages | Gabarit « Liste » | En-tête « Choisissez votre », recherche/filtres (proposés), carte champion | `champions.html` |
| Fiche personnage | Gabarit « Fiche » | Héros splash + cartes info, onglets de compétences, double cadre doré, carrousel de skins | `champion.html` |
| Actualités | Gabarit « Actualités » | Bandeau navy, carte d'actu avec pastille | `champions.html` (section actus) |
| Mobile | Section « Mobile » (observée à 390px) | Hamburger carré gris, bouton or plein, splash 16:9 + bloc navy | toutes les pages d'exemple |

Les pages de liste et d'actus sont **claires** (fond `--paper-2`, titres navy) ; la fiche reste **sombre** (navy, or, blanc). L'or y marque la sélection (compétence, skin) exactement comme le médaillon actif du guide.

## Typographie

Les polices d'origine (Beaufort, Spiegel) sont propriétaires. Équivalents Google Fonts :

| Rôle | Police | Réglages |
|---|---|---|
| Titres | **Spectral** 800 italique | capitales, 57px desktop, interligne 1.125 |
| Texte | **Source Sans 3** 400/600 | 18px / 28px |
| Navigation, boutons, onglets | **Inter** 600/700 | 13–14px, capitales, espacement +0.08em |

## Images et 3D

Les visuels sont de vraies images : captures, cinématiques et splash arts du projet en priorité, sinon photos de paysages de légende (châteaux sur la montagne, vallées, parois rocheuses) et de scène esport. Elles sont toujours posées sous un **voile nuit** (dégradé latéral pour le texte du héros, fondus blanc → nuit pour le panorama, flou + radial pour les fonds de section) et, dans les médaillons, recadrées en cercle derrière l'anneau de camp. Les anneaux, losanges et filets restent en CSS ; jamais de héros, de bâtiment ou de carte dessiné en CSS/SVG à la place d'une image. 3D optionnelle. Détails : `references/assets.md`.

## Signature

**Le médaillon à anneau et losange** : un cercle (image ou icône) entouré d'un anneau de 4px coloré selon le camp, avec un petit losange posé en haut de l'anneau. Il sert d'onglet, et sa version grande (180px) accompagne l'explication.

## À éviter

- Des titres droits ou en sans-serif : ils doivent être en serif italique gras.
- Aligner le texte à gauche dans les sections de guide : il est centré (sauf dans les colonnes texte + visuel).
- Utiliser l'or comme couleur de fond de grandes zones.
- Copier les champions, la carte, le logo ou les noms du jeu d'origine.

## Adaptation React / React Native

- Médaillon : `View` rond avec `borderWidth: 4` + petit `View` carré tourné de 45° en `position: absolute; top: -6`.
- Titres italiques : `fontStyle: 'italic'` avec la police Spectral 800 italique chargée (`@expo-google-fonts/spectral`).
- Bouton dégradé : `expo-linear-gradient` avec `start={{x:1,y:1}} end={{x:0,y:0}}`.
- Vidéos : `expo-av` / `expo-video`, muettes, boucle.

## Avant de livrer

- [ ] Titres serif italique capitales, texte centré court.
- [ ] Code couleur allié / adversaire / sélection respecté.
- [ ] Médaillons accessibles au clavier.
- [ ] Contrastes vérifiés, rouge seulement en grand.
- [ ] Testé à 375px et 1440px, mouvement réduit respecté.
- [ ] Vraies images (ou 3D) traitées selon `references/assets.md`, avec `alt` et couleur de repli.
- [ ] Sur fond clair : or remplacé par `--gold-deep` pour le texte, contour de focus `--ink`.
- [ ] Aucun élément du jeu d'origine.
