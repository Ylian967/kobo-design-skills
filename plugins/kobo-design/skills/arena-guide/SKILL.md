---
name: arena-guide
description: Direction artistique « Arena Guide » pour pages de guide, tutoriel et présentation de jeu compétitif, inspirée des pages « comment jouer » des grands MOBA. Bleu nuit, or et cyan, titres à empattements très gras en italique capitales, sections centrées qui alternent texte et visuel, médaillons circulaires à anneau (allié cyan / adversaire rouge) servant d'onglets, carte de jeu en fond fondu, vidéos courtes avec sélecteur. À utiliser pour un guide de jeu, un onboarding, une page « règles du jeu », une page de présentation de mode, une app d'apprentissage ou un wiki au style « arène fantasy compétitive ».
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
| `references/components.md` | Navigation, boutons, titres, médaillons-onglets, bloc vidéo + vignettes, carte en fond, héros vidéo. |
| `references/layouts.md` | Héros cinématique, intro blanche, sections « objectif », sections vidéo, mobile. |
| `references/motion.md` | Courbe « snap » mesurée, changements d'onglet, apparitions. |
| `examples/demo.html` | Page d'exemple complète. |
| `source.md` | Mesures et écarts. |

## Typographie

Les polices d'origine (Beaufort, Spiegel) sont propriétaires. Équivalents Google Fonts :

| Rôle | Police | Réglages |
|---|---|---|
| Titres | **Spectral** 800 italique | capitales, 57px desktop, interligne 1.125 |
| Texte | **Source Sans 3** 400/600 | 18px / 28px |
| Navigation, boutons, onglets | **Inter** 600/700 | 13–14px, capitales, espacement +0.08em |

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
- [ ] Aucun élément du jeu d'origine.
