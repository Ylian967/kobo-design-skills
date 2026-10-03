---
name: serif-bistro-green
description: Direction artistique « Serif Bistro Green » pour restaurants, bistrots, brasseries, traiteurs, caves, épiceries fines et landings food. Héros vert profond avec énorme titre en serif d'affiche crème sur deux lignes et photo de la cheffe cadrée dans une arche glissée entre les mots, barre de navigation flottante avec liens en pilules et bouton orange « Réserver », sections en feuilles à grand rayon supérieur qui se recouvrent (vert, crème, orange), carrousel de fiches orange avec vraie photo d'assiette ronde vue de dessus reliées par une « reliure à spirale », carte filtrable en fiches de plat, titre en escalier avec photos encadrées glissées entre les mots, bandeau de lettre d'information orange aux dessins au trait, pied de page vert avec nom géant. À utiliser quand on demande : site de restaurant, réservation de table, carte / menu, landing gastronomique, food, chef, bistronomie, ambiance chaleureuse, vert et orange, serif élégant, éditorial culinaire. Fournit tokens, composants, mises en page, animations et une page d'exemple.
---

# Serif Bistro Green

> Une nappe vert bouteille, une grande serif crème et une assiette sur fond orange : chic, mais on a envie d'y entrer.

## L'idée

Le visiteur doit sentir **la salle avant d'avoir réservé** : chaleur, produit, gens. Un **vert profond** sert de nappe, une **serif d'affiche à fort contraste** parle fort et lentement, un **orange tomate** est réservé à ce qui se mange ou se réserve. Le style vit dans le **titre du héros** (énorme, avec une personne prise entre les mots), dans les **feuilles** aux coins très arrondis qui se recouvrent, et dans les **fiches de plats reliées** comme un carnet. L'interface (barre, boutons, champs) reste petite et précise.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de nom, photos ni textes de la maquette d'origine.

## Règles prioritaires

1. **Trois couleurs, pas plus** : vert, crème, orange. Chaque section est une feuille d'une seule couleur ; jamais deux feuilles de même couleur à la suite.
2. **La serif d'affiche pour tout ce qui se lit de loin** (titres, noms de plats, prix, boutons) ; DM Sans pour le reste.
3. **Une personne dans le titre** : une seule arche par page, entre les deux moitiés du titre du héros.
4. **Les assiettes sont rondes et vraies** : photo vue de dessus recadrée en cercle, jamais un dessin.
5. **Feuilles empilées** : coins supérieurs de `--r-sheet`, chaque section remonte sur la précédente.
6. **Orange en surface, orange foncé en bouton** : `--orange` pour les fiches et bandeaux, `--orange-btn` pour les boutons. Petit texte sur orange : `--ink`.
7. **Un cadre crème épais** (`--frame`, 8px) autour de chaque photo rectangulaire posée sur une feuille.
8. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root`. |
| `references/components.md` | Barre flottante, bouton, titre à arche, assiette ronde, fiche reliée, feuille, pastille, fiche de plat, titre en escalier, bandeau, pied. |
| `references/layouts.md` | Ordre des sections, repères, version mobile, autres pages. |
| `references/motion.md` | Mots qui montent, assiettes qui tournent, carrousel, filtre, cadres en décalage, performance, mouvement réduit. |
| `references/assets.md` | Avant de placer une image : types de photo, recadrages, pictogrammes. |
| `examples/demo.html` | Page d'accueil complète animée (restaurant fictif « Maison Sauge »). |
| `source.md` | Référence, mesures, ce qui est proposé, écarts. |

## Typographie

| Rôle | Police | Taille |
|---|---|---|
| Titre du héros, ligne 1 | Abril Fatface | `--fs-hero` (jusqu'à 154px) |
| Titre du héros, ligne 2 | Abril Fatface | `--fs-hero-2` (2/3 de la première) |
| Titre en escalier | Abril Fatface | `--fs-stagger` |
| Nom géant du pied | Abril Fatface | `--fs-giant` |
| Titre de section | Abril Fatface | `--fs-h2` (≈ 64px) |
| Nom de plat, prix | Abril Fatface | `--fs-card`, `--fs-price` |
| Bouton, pastille | Abril Fatface, espacée de 0.06em | `--fs-small`, `--fs-tiny` |
| Texte | DM Sans 400 | `--fs-body`, `--fs-lead` dans le héros |

Interligne des titres : 1 à 1.12. Pas de capitales forcées dans les titres ; pas d'italique.

## Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `--green` | #004e48 | Héros, carte, pied |
| `--green-card` | #18605a | Fiche de plat, barre |
| `--cream` | #fef8e6 | Feuilles claires, texte sur vert |
| `--orange` | #e45834 | Fiches reliées, bandeaux |
| `--orange-btn` | #c8431f | Boutons, pastille active |
| `--frame` | #fae8d2 | Cadre des photos |
| `--ink` | #1d1208 | Petit texte sur orange |

Le crème sur `--orange` n'est permis qu'en **grand texte** (24px et plus).

## Mise en page

- Page de 1440px, marges de 60px ; barre flottante de 1028px centrée.
- Héros : titre sur deux lignes, chacune coupée en deux autour de l'arche ; à gauche une assiette ronde et trois lignes, à droite un texte et deux boutons.
- Puis : feuille crème (carrousel relié), bandeau orange, feuille verte (carte filtrable sur 4 colonnes), feuille crème (titre en escalier et cadres), feuille orange (lettre), pied vert au nom géant.
- Détail et version mobile : `references/layouts.md`.

## Mouvement

La référence est fixe : tout le mouvement est **proposé**. Trois gestes : les **mots montent** derrière un cache, les **assiettes tournent** (au défilement dans le héros, au survol sur les fiches), les **feuilles se recouvrent**. Rien ne tourne en continu ; le carrousel avance seul toutes les 4.2s et s'arrête au survol. Détail, code et mesures : `references/motion.md`.

## Images et 3D

- **Pas de 3D** dans ce style.
- **Vraies photos** partout : portrait sur fond sombre pour l'arche, assiettes vues de dessus pour les cercles, plats en gros plan pour la carte, photos sombres et chaudes pour les cadres.
- La référence utilise des images détourées ; le skill obtient l'effet par le **cadrage** (arche, cercle), sans détourage.
- Dessins au trait en SVG pour les bandeaux orange.
- Identifiants et recadrages : `references/assets.md`.

## Accessibilité

- Contrastes vérifiés dans `tokens.css` (`@contrast`) ; l'orange du shot a été foncé pour les boutons.
- Carrousel : piste focalisable, défilable au clavier, arrêt de l'avance au focus ; points avec libellé.
- Filtres : boutons `aria-pressed`, grille en `aria-live="polite"`.
- Le nom géant du pied est décoratif (`aria-hidden`).
- `prefers-reduced-motion` : tout est en place d'emblée, plus d'avance automatique.

## À ne pas faire

- Ajouter une quatrième couleur, un dégradé ou une ombre colorée.
- Mettre du petit texte crème sur orange.
- Remplacer une assiette par un dessin ou un émoji.
- Empiler deux arches ou deux titres en escalier sur une même page.
- Animer une feuille entière au défilement.

## Vérification

1. `python3 tools/check.py serif-bistro-green` passe.
2. À 1440px et à 390px : pas de défilement horizontal, aucune erreur dans la console.
3. L'arche ne masque pas un mot entier du titre.
4. Les trois couleurs alternent d'une feuille à l'autre.
5. Mouvement réduit : la page est lisible sans aucune animation.
