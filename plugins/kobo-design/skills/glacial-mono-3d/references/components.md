# Glacial Mono 3D — composants

Toutes les valeurs viennent de `tokens.css`. Code complet dans `examples/demo.html`. Le site de référence dessine son interface dans le canvas : tout est **observé sur capture** (1440 × 900) ; les tailles sont approchées.

## 1. Interface aux quatre coins (signature)

Le contenu de l'écran, c'est la scène. L'interface est **minuscule, en monospace, collée aux bords** (`--edge` : 28px) :

| Coin | Contenu |
|---|---|
| Haut gauche | logotype large et arrondi, blanc lumineux ; dessous, un **petit cartouche sombre** `--tag` (« // Copyright © 2026 ») |
| Haut droit | rubrique (« ////// Manifeste »), puis un paragraphe court **aligné à droite**, 190px de large |
| Bas gauche | « Défiler pour découvrir », réglage du son, bouton à crochets |
| Bas centre | (dernière scène) carrousel de liens : flèche fine, bouton à crochets, flèche fine |

Texte en `--text-xs` (11px) et `--text-2xs` (10px), sombre `--steel` sur scène claire, clair `--text` sur scène de nuit.

## 2. Logotype

Mot en capitales très larges et arrondies (`--font-logo`), blanc avec un léger halo. C'est un signe : il reste en texte.

## 3. Bouton à crochets de coin (signature)

Pas de fond, pas de bord : **quatre petits crochets en L** (8px, 1px) aux coins du texte. Survol : les crochets se resserrent de 3px. Hauteur de cible 44px.

```css
.bracket::before, .bracket::after, .bracket span::before, .bracket span::after { content: ""; position: absolute; width: var(--bracket); height: var(--bracket); border: var(--bracket-w) solid currentColor; }
.bracket::before { left: 0; top: 0; border-right: 0; border-bottom: 0; }   /* … un par coin */
.bracket:hover::before { transform: translate(3px, 3px); }
```

## 4. Texte en pavés

Tout texte d'interface qui apparaît passe par un état **bloc blanc plein** (`.is-busy` : fond `--white`, pavés `█▓▒░`), puis se décode. Le vrai texte est dans `aria-label`. Voir `motion.md`.

## 5. Étiquette pleine

Petit rectangle **blanc** à texte sombre, sans arrondi (« PROJET_CO_01 », date, « CLIQUER POUR EXPLORER »), posé près de l'objet et relié à lui par un **trait fin blanc coudé**.

## 6. Constellation numérotée

Sur l'objet de la première scène : 4 ou 5 points numérotés « 01 … 05 » en blanc 10px, reliés par des **traits blancs de 1px** formant un polygone. Signe en SVG, posé au-dessus du canvas.

## 7. Scènes 3D

| Scène | Fond | Objet | Détails |
|---|---|---|---|
| 1 — Accueil | brouillard `--fog`, sol de neige | amas de blocs ou de cristaux de glace, lueur `--halo` aux joints | constellation numérotée, fragments qui flottent |
| 2 — Projet | nuit `--night` | un grand bloc sombre contenant un signe, éclats en orbite | étiquettes pleines et traits de rappel, grille de points en fond |
| 3 — Fin | clair `--frost` | socle à anneaux + sculpture en particules | carrousel de liens à crochets |

Matières : glace claire à facettes, un peu translucide ; roche `--steel` à facettes ; socle clair brillant. Lumière froide : une lumière d'ambiance ciel / sol et un soleil latéral.

## 8. Panneau de contenu

Plein écran sur voile sombre (`--scrim-dark`) : **colonne étroite** de 360px centrée, rubriques en gris (« ////// Résumé », « /// Découvrir »), texte 13px, liens **entre crochets** (« [X] ↗ »). Bouton « Fermer » à crochets en haut à droite. Échap ferme.

## 9. Chargement

Fond `--loader`, une chaîne de signes ASCII au centre, 13px, blanche.

## États

- **WebGL absent** : photo de repli par scène (glace, glacier, banquise), en niveaux de gris, sous un voile.
- **Mouvement réduit** : scène complète d'emblée, coupes franches (voir `motion.md`).
- **Focus clavier** : contour pointillé 1px de la couleur du texte, décalé de 4px.
- **Son** : bouton à bascule (`aria-pressed`), coupé par défaut.
- **Petit écran** : marges de 16px, paragraphe du coin haut droit masqué, carrousel resserré.
