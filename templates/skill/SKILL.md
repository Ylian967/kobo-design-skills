---
name: {{id}}
description: {{Direction artistique « Nom » inspirée de <type de site>. À utiliser pour créer ou styliser <types de pages/écrans>, quand on demande <mots-clés : style, ambiance, références>. Fournit tokens, composants, mises en page, animations et une page d'exemple.}}
---

# {{Nom du style}}

> {{Une phrase qui résume le rendu.}}

## L'idée

{{3 à 5 phrases : ce que le visiteur doit ressentir, d'où vient ce langage visuel, où vit le style (titres, fonds, cadres, mouvement) et ce qui reste sobre.}}

Inspiré de : voir `source.md`. On reprend le langage visuel (proportions, rythme, traitements), jamais l'identité : pas de logo, illustration, personnage, texte ou police propriétaire du site d'origine.

## Règles prioritaires

1. {{La règle qui fait 80 % du style.}}
2. {{Hiérarchie : ce qui crie, ce qui se tait.}}
3. Contraste : texte courant ≥ 4,5:1, texte sur accent en `--on-accent` (paires vérifiées dans `references/tokens.css`).
4. {{Règle de forme : rayons, coupes, cadres.}}
5. {{Règle de mouvement.}}
6. Accessibilité : cibles ≥ 44px, focus visible, `prefers-reduced-motion` respecté.
7. Aucune valeur en dur : couleurs, polices, tailles, rayons et durées viennent de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root` dans le projet. |
| `references/components.md` | Avant de coder un bouton, une carte, une navigation, un champ, un badge, un modal. |
| `references/layouts.md` | Avant de construire une page : structures de héros, sections, grilles, pied de page. |
| `references/motion.md` | Avant d'ajouter une animation ou une transition. |
| `examples/demo.html` | Pour voir le résultat attendu et reprendre des morceaux. |
| `source.md` | Pour connaître le site de référence et les mesures relevées. |

## Typographie

{{Tableau : rôle, police (Google Fonts), poids, taille, interlignage, espacement. Préciser l'équivalent gratuit si la police d'origine est payante.}}

## Couleurs

{{Tableau court des rôles de couleur (renvoie vers tokens.css pour les valeurs). Règle d'usage de l'accent.}}

## Signature

{{L'élément qu'on reconnaît immédiatement. Où et combien de fois l'utiliser.}}

## À éviter

- {{Ce qui rendrait le style cheap ou générique.}}
- Copier des assets, logos, textes ou interfaces du site de référence.

## Adaptation React / React Native

{{Notes spécifiques : équivalents des effets CSS non disponibles en natif, librairies conseillées.}}

## Avant de livrer

- [ ] Tokens importés, aucune valeur en dur.
- [ ] Composants conformes à `references/components.md` (tous les états).
- [ ] Mise en page issue de `references/layouts.md`, testée à 375px et 1440px.
- [ ] Animations conformes à `references/motion.md`, mouvement réduit respecté.
- [ ] Contrastes vérifiés.
- [ ] La signature est présente, sans excès.
