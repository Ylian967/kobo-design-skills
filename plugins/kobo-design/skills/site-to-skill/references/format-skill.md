# Format d'un skill Kōbō (étape A5)

Dossier `plugins/kobo-design/skills/<id>/`, à partir de `templates/skill/` à la racine du dépôt. L'identifiant est en minuscules à tirets et dit le style, pas la marque (`dense-ledger-crm`, pas le nom du produit de référence).

| Fichier | Ce qu'il contient | À ne pas oublier |
|---|---|---|
| `SKILL.md` | L'idée, les règles prioritaires, la typo, les couleurs, la signature, ce qu'il faut éviter, l'adaptation React. Moins de 300 lignes | La `description` commence par ce que fait le style, puis liste les mots qu'on emploierait pour le demander, registre compris |
| `references/tokens.css` | Le bloc `:root` complet | En-tête : « MESURÉS le AAAA-MM-JJ » et comment (navigateur, pixels d'une image) ; une ligne `@contrast fg:bg …` qui déclare chaque paire utilisée (`:large` pour un texte d'au moins 24 px). Chaque valeur porte « mesuré », « proposé » ou « dérivé » en commentaire |
| `references/components.md` | Chaque composant : rôle, anatomie, états, code de référence | Une section « États » (focus, erreur, vide, chargement, désactivé). Registre fonctionnel : tableau (ligne, en-tête, tri, sélection), filtres, champ, sélection, pagination, barre latérale, état vide |
| `references/layouts.md` | Grille, en-tête, sections ou écrans types, mobile | Registre fonctionnel : écran de liste, écran de fiche, formulaire long, à la place du héros |
| `references/motion.md` | Sections « Observé », « Proposé », « Code », **« Performance »**, **« Mouvement réduit »** | « Performance » : ce qui est animé (seulement `transform`, `opacity`, couleurs), ce qui tourne en continu, et les images par seconde mesurées (dire dans quel navigateur). « Mouvement réduit » : le bloc `prefers-reduced-motion` |
| `references/assets.md` | Les visuels de la référence (sujets, cadrages, lumière, traitements), où trouver des équivalents libres, recette 3D s'il y en a | Registre fonctionnel : icônes, avatars, illustrations d'état vide ; pas de photo imposée |
| `examples/demo.html` | Une page complète construite **uniquement** à partir du skill | **Animée** (entrées, survols, états) ; de **vraies images** ; jamais de dessin CSS ou SVG à la place d'une photo. Registre fonctionnel : un écran d'application (barre latérale, tableau dense filtrable, formulaire, état vide), données fictives annoncées |
| `source.md` | La référence et ce qu'on en a fait | Sections : « Ce que contient la référence », **« Mesuré »**, « Observé (non mesuré) », « Lu à l'œil », « Polices », **« Proposé par le skill »**, **« Écarts assumés »** (tableau : élément, dans le skill, raison), « Limites connues » |

## Contrôles

À la racine du dépôt :

```bash
python3 tools/check.py <id>          # fichiers, frontmatter, contrastes déclarés
python3 tools/build_gallery.py       # docs/demos/<id>.html et la galerie
```

Puis le branchement sur kobo-studio (étape A6 de `SKILL.md`) : fiche de correspondance, couche de signature, catalogue, galerie des composants.

## Ce qui fait échouer un skill

- Des valeurs sans origine : on ne sait plus ce qui est mesuré.
- Une démo plus belle que le skill : un écart corrigé dans la démo et pas dans les fichiers de référence.
- Une paire de couleurs utilisée mais absente de `@contrast`.
- Un skill fonctionnel avec un héros, ou un skill expressif sans mouvement décrit.
- Pas de fiche kobo-studio : le skill existe, mais le chef d'atelier ne peut pas s'en servir.
