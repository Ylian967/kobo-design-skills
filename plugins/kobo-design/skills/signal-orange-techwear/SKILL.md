---
name: signal-orange-techwear
description: Direction artistique « Signal Orange Techwear » pour mode technique, streetwear et marques cyberpunk (techwear, sneakers, équipement outdoor urbain, accessoires, drops de collection, gaming lifestyle), inspirée d'un concept Dribbble de boutique techwear. Fond anthracite, orange signal unique, titres en capitales très étendues empilées (une ligne orange, une ligne « // » avec pilule orange numérotée, une ligne en contour orange, une ligne blanche), silhouette masquée au centre avec texte vertical, panneaux translucides à filet fin (fiche produit + tableau « specs opérateur » à étiquettes orange espacées et valeurs grises), lien souligné « Explorer ↗ », ronds au contour, index de section « 01 / La collection — », fiches système, onglets rectangulaires orange plein / contour, fiches produit en noir et blanc à étiquette de code et bouton rond « + », écran de fiche produit gris clair. À utiliser pour une landing de collection, une fiche produit, un e-shop mode, un lookbook ou une app au style « techwear, cyberpunk, ninja urbain, nuit, HUD, orange et noir ». Fournit tokens, composants, mises en page, animations et une page d'exemple.
---

# Signal Orange Techwear

> La nuit, un masque, et un seul orange : une boutique qui se lit comme un affichage tête haute.

## L'idée

Le visiteur regarde une **silhouette masquée** sortir du noir, et l'interface la décrit comme un instrument décrirait une machine : un **titre empilé** en capitales très larges dont chaque ligne change de registre (pleine orange, barres « // », creuse, pleine blanche), des **panneaux** à filet fin qui donnent des « specs opérateur », des étiquettes orange aux lettres très espacées. Tout est sombre, presque sans arrondi, et **l'orange est le seul signal**.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de nom, images ni textes de la maquette d'origine.

## Règles prioritaires

1. **Une seule couleur : l'orange `--orange`**, sur anthracite. Hors du héros, les photos sont en noir et blanc.
2. **Titre empilé à registres** : une ligne orange, une ligne « // », une ligne creuse, une ligne blanche — jamais deux lignes creuses.
3. **Tout en capitales étendues ou en caractère technique** : Unbounded pour les titres, Orbitron pour le reste.
4. **Panneaux à filet de 1px**, translucides, angles de 2px, halo orange dans le bas.
5. **Étiquettes orange très espacées** (0.18em) face à des valeurs grises : le motif du tableau de specs.
6. **Silhouette au visage caché** au centre ; le texte à gauche, les panneaux à droite.
7. **Texte sombre sur orange plein** ; jamais de texte orange sur fond clair en petite taille.
8. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root`. |
| `references/components.md` | Navigation, titre empilé, pilule, index, panneau, tableau de specs, bouton, fiche système, onglets, fiche produit. |
| `references/layouts.md` | Les quatre écrans, mobile, autres pages. |
| `references/motion.md` | Lignes qui montent, changement de silhouette, décodage des valeurs, profondeur, filtre, performance, mouvement réduit. |
| `references/assets.md` | Avant de placer une image : traitement des photos, recadrages, choix. |
| `examples/demo.html` | Page complète animée, quatre écrans (marque fictive « Noctunit »). |
| `source.md` | Référence, mesures, ce qui est proposé, écarts. |

## Typographie

| Rôle | Police | Taille |
|---|---|---|
| Titre empilé | Unbounded 800, capitales | `--fs-title` (jusqu'à 66px, interligne 1.04) |
| « // » | Unbounded 700 italique | même taille |
| Accroche (« Nouvelle collection ») | Orbitron 400 | `--fs-lead` (16px) |
| Paragraphe | Orbitron 400, interligne 1.75 | `--fs-body` (14px) |
| Navigation, valeurs, liens | Orbitron 400 | `--fs-small` (12px) |
| Étiquettes, boutons, codes | Orbitron, capitales, espacées | `--fs-tiny` (11px) |

Les paragraphes restent courts (300 à 350px de large) : Orbitron fatigue vite en texte long.

## Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `--bg` | #0e0e0f | Fond, intérieur des lettres creuses |
| `--screen` | #141515 | Fond d'un écran sous sa photo |
| `--panel` | noir chaud à 74 % | Panneaux translucides |
| `--line` | blanc à 20 % | Filets des panneaux |
| `--orange` | #e05c1a | Le signal : titres, étiquettes, filets actifs, boutons |
| `--on-orange` | #0e0e0f | Texte sur orange plein |
| `--muted` | #a9a9a9 | Valeurs, textes secondaires |
| `--fog`, `--fog-panel` | #dcdcdc, #ececec | Écran clair de fiche produit |
| `--orange-deep` | #b8430a | Grand titre orange sur l'écran clair |

## Mise en page

- Écrans de 1440 × 852px, marges de 40px ; chaque section fait au moins la hauteur de la fenêtre.
- Héros en trois zones : texte, silhouette (44 %), colonne de panneaux de 310px.
- Puis : collection (trois fiches système), équipement (onglets et trois fiches produit), fiche claire (41 % de texte, photo, panneaux).
- Détail et mobile : `references/layouts.md`.

## Mouvement

La référence est fixe : tout le mouvement est **proposé**. Les lignes du titre **montent** l'une après l'autre ; la pilule « 01/04 » **change de silhouette** en fondu pendant que les valeurs du tableau **se décodent** ; la silhouette **suit le pointeur** tant que l'interrupteur « Profondeur » est allumé ; boutons et onglets se remplissent **par pas**. Rien ne tourne en continu. Détail, code et mesures : `references/motion.md`.

## Images et 3D

- **Vraies photos** : une silhouette masquée en couleur, à lumière orange, pour le héros ; tout le reste en noir et blanc sombre (`sat=-100` demandé au serveur d'images).
- La référence utilise des images de synthèse noires et orange ; le skill en garde la palette par ce traitement, sans retouche.
- **Pas de 3D** dans la démo. Une scène 3D (silhouette ou produit tournant) peut remplacer la photo du héros si le projet la fournit, avec un rendu à la demande.
- Jamais de silhouette ou de produit dessiné en CSS ou en SVG.
- Identifiants et recadrages : `references/assets.md`.

## Accessibilité

- Contrastes vérifiés dans `tokens.css` (`@contrast`) : texte sombre sur orange, écran clair éclairci par rapport au shot.
- « Profondeur » est un `role="switch"` ; onglets en `aria-pressed` ; grille en `aria-live="polite"` ; compteur du sac annoncé.
- Les barres « // », le texte vertical et les silhouettes de fond sont décoratifs.
- `prefers-reduced-motion` : plus de décodage, plus de suivi du pointeur, apparitions immédiates.

## À ne pas faire

- Ajouter une seconde couleur vive, un néon bleu ou rose, un dégradé coloré.
- Arrondir les panneaux ou les boutons.
- Écrire un titre en minuscules ou dans une police étroite.
- Mettre du texte blanc sur l'orange plein, ou du texte orange en petit sur le gris clair.
- Animer une ligne de balayage, un grain ou un flou en continu.

## Vérification

1. `python3 tools/check.py signal-orange-techwear` passe.
2. À 1440px et à 390px : pas de défilement horizontal, aucune erreur dans la console.
3. Les quatre silhouettes s'enchaînent et les valeurs du tableau changent avec elles.
4. Le titre reste lisible là où il mord sur la silhouette.
5. Mouvement réduit : la page est entièrement utilisable.
