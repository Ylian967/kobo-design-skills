---
name: glass-frame-estate
description: Direction artistique « Glass Frame Estate » pour l'immobilier et les annonces de biens (agence, promoteur, location de villas, chalets, architecture, hôtellerie), mesurée sur un template immobilier en ligne. Héros photo encadré d'un filet blanc sur la même photo floutée, mot-marque géant blanc en dégradé placé derrière le bâtiment, barre en capitales (heure, ville, MENU + rond à points), titre Inter 500 en capitales, bouton large à flèche, cellules de conseiller en verre. Puis une page entièrement noire, blanche et grise : surtitres « // », compteurs odomètre, règle graduée, annonces 2×2 à étiquettes, services sur noir, cartes de quartier grises, étapes en carte collante qui bascule au défilement, témoignages en damier, agents, formulaire gris, FAQ, pied noir à mot-marque géant, menu plein écran. Tout apparaît par une montée de 80px au ressort. À utiliser pour une landing d'agence, un catalogue ou une fiche de bien, un site au style « luxe calme, minimal, noir et blanc, verre, Inter ».
---

# Glass Frame Estate

> Une maison devant le ciel, le nom de l'agence écrit derrière elle, et plus aucune couleur ensuite.

## L'idée

Le héros est **une photo sous verre** : un cadre d'un pixel blanc posé sur la même photo floutée. Le **mot-marque géant** traverse le ciel et passe derrière le bâtiment, dont le sommet mord dans les lettres. En bas, un titre en capitales, un bouton large, et deux petites cellules de verre pour le conseiller. Sous le héros, tout est **noir, blanc et gris** : la couleur ne vient que des photos de biens. La page est calme : chaque bloc monte de 80px une seule fois, les survols inversent le noir et le blanc.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de nom, logo, photos ni textes du template d'origine.

## Règles prioritaires

1. **Aucune couleur d'interface.** Noir `--ink`, blanc, `--surface`, `--muted`. Pas d'accent, pas d'ombre portée.
2. **Tout en capitales, Inter 500**, interligne 1.1, approche −0.02em. Seuls les paragraphes sont en bas de casse (16px / 1.6, `--muted`).
3. **Le mot-marque passe derrière le bâtiment** : photo posée deux fois, copie du dessus détourée en `clip-path` (`assets.md`).
4. **Le verre est discret** : fond noir à 5 %, flou 2px, liseré intérieur blanc. Uniquement dans le héros.
5. **Trois rayons** : 10px (cartes, photos), 6px (photo dans une carte), 4px (boutons, étiquettes, champs).
6. **Rythme mesuré** : contenu 1200px, sections à 140px, cartes écartées de 10px, un seul bloc noir (services) avant le pied.
7. **Un seul mouvement d'entrée** : montée de 80px + fondu, courbe `--ease-spring`, une fois. Une seule séquence liée au défilement : les étapes.
8. **Texte blanc** uniquement sur noir, sur `--shade` ou sur un dégradé noir ; jamais sur le ciel.
9. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root`. |
| `references/components.md` | Cadre, mot-marque, barre, boutons, verre, compteurs, règle, annonce, service, quartier, étape, témoignage, agent, formulaire, article, FAQ, menu. |
| `references/layouts.md` | Héros, ordre des 13 sections de l'accueil, pages internes, mobile. |
| `references/motion.md` | Montée au ressort, étapes qui basculent, survols, menu, performance, mouvement réduit. |
| `references/assets.md` | Avant de placer une image : sujets, détourage du héros, sources, traitements. |
| `examples/demo.html` | Page complète animée (agence fictive « Halden »). |
| `source.md` | Référence, mesures, ce qui est proposé, écarts. |

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Mot-marque | **Inter** 600 | 280px, −0.04em, dégradé blanc → transparent |
| Titre du héros | Inter 500 | 80px (40px mobile), capitales, 1.1, −0.02em |
| Titre de page interne | Inter 600 | 100px |
| Titres de section | Inter 500 | 48px (32px mobile) ; puis 32, 24, 20px |
| Libellés (nav, surtitres « // », boutons, étiquettes) | Inter 500 | 16px / 16px, capitales (14px mobile) |
| Texte | Inter 400 | 16px / 1.6 |
| Heure | **Geist Mono** 500 | 16px |

## Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `--white` | #ffffff | Fond dominant, texte sur noir et sur photo |
| `--ink` | #000000 | Texte, bloc services, cartes d'étape, pied, bouton plein, étiquette de statut |
| `--surface` | #f2f2f2 | Sections grises, cartes, bouton clair, panneau de formulaire |
| `--muted` | #555555 | Texte secondaire sur clair |
| `--soft` | #cccccc | Texte secondaire sur noir |
| `--veil`, `--shade`, `--shade-1` | voile 20 %, #2b2d27 | Assombrir la photo sous le texte |
| `--glass`, `--glass-edge` | noir 5 %, blanc 50 % | Cellules en verre |
| `--word-from` → `--word-to` | blanc 62 % → 0 | Mot-marque |

## Images et 3D

De **vraies photos**, nombreuses et homogènes : une maison à silhouette simple devant un ciel dégagé pour le héros (détourée pour laisser passer le mot-marque derrière elle), façades et intérieurs pour les annonces, vues de villes pour les quartiers, portraits de studio sur fond gris pour les agents. Aucun filtre de couleur. Logo, flèches et pictogrammes sont des signes et restent en SVG ; jamais une maison ou un portrait dessinés. 3D optionnelle (maquette d'un bien), jamais dans le héros. Détails dans `references/assets.md`.

## Signature

1. Le **mot-marque derrière le bâtiment**, dans un cadre d'un pixel sur photo floutée.
2. Les **cellules de verre** au liseré blanc.
3. Les **surtitres « // »** et la **règle graduée** entre les sections.
4. Les **étiquettes** blanche et noire sur les photos d'annonce.
5. La **carte d'étape noire** sur laquelle la suivante se déplie.

## À éviter

- Ajouter une couleur d'accent, un dégradé coloré, une ombre portée.
- Écrire le mot-marque par-dessus le bâtiment, ou sur un ciel blanc.
- Des titres en gras (700 et plus) ou en bas de casse.
- Du verre partout : il n'existe que dans le héros.
- Animer un flou plein écran (menu, fond du héros) : voir « Performance » dans `motion.md`.
- Des entrées différentes d'un bloc à l'autre (glissements latéraux, zooms, rebonds).
- Des photos de plein midi surexposées ou des portraits hétérogènes.

## Adaptation React / React Native

- **React** : un composant par bloc (`FrameHero`, `ListingCard`, `ServiceRow`, `StepDeck`, `FaqItem`), `tokens.css` importé une fois ; `Rise` enveloppe un bloc et pose la classe `in` par IntersectionObserver ; `StepDeck` garde un seul écouteur de défilement.
- **React Native** : tokens en objet JS ; cadre = `ImageBackground` flouté (`blurRadius`) + vue à bordure ; mot-marque en `MaskedView` avec dégradé, bâtiment détouré en PNG posé au-dessus ; verre avec `expo-blur` (intensité faible) ; montée au ressort avec Reanimated (`withSpring`, raideur 250, amortissement 54) ; étapes en liste verticale simple, comme en mobile.

## Avant de livrer

- [ ] `:root` copié de `tokens.css`, aucune couleur en dur ailleurs.
- [ ] Le polygone de détourage suit le bâtiment à 1440 et à 390px.
- [ ] Titre du héros lisible (voile + dégradé), verre visible grâce au liseré.
- [ ] Pas de défilement horizontal à 390px ; étapes empilées en mobile.
- [ ] Menu : Échap ferme, focus rendu au bouton ; FAQ au clavier.
- [ ] `prefers-reduced-motion` : tout visible, pas de carte collante.
- [ ] Nom, logo, photos et textes propres au projet.
