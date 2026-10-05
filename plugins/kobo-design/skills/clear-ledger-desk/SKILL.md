---
name: clear-ledger-desk
description: Direction artistique « Clear Ledger Desk » pour applications de travail du registre fonctionnel (CRM, ERP, back-office, outil interne, application SaaS, tableau de bord, suivi d'affaires, gestion de clients, console d'administration). Interface claire et calme sur fond blanc, texte de 14 px en une seule sans (Inter), hiérarchie par la taille et la graisse, tableaux denses à en-têtes discrets, filtres, sélection multiple et actions groupées, fiche d'enregistrement à onglets, historique et chemin d'étapes, barre latérale repliable, densité réglable (confort ou compact), couleur réservée aux états (succès, attention, erreur, information) et à une seule action principale en sarcelle, mouvements uniquement fonctionnels, raccourcis clavier avec aide « ? ». À utiliser quand on demande un CRM, un back-office, un outil de gestion, une liste d'enregistrements, un tableau de données, un écran d'administration, une interface sobre, dense, lisible, sans décor. Fournit tokens, composants, mises en page d'écran, mouvement et une démo de CRM.
---

# Clear Ledger Desk

> Un outil de travail : on y passe la journée, donc rien n'y crie. La clarté est la signature.

## L'idée

L'utilisateur vient faire un travail, des dizaines de fois par jour : trouver une affaire, changer son étape, rappeler un client. L'interface s'efface. Un fond blanc, un seul gris de retrait, des filets d'un pixel, un texte de 14 px qui ne change presque jamais de taille. La hiérarchie vient de la graisse et de la place, pas de la couleur. La couleur ne sert qu'à deux choses : dire un état, et désigner l'action principale de l'écran. Le langage vient de design systems publics d'outils de suivi et de CRM (voir `source.md`).

On reprend le langage visuel (proportions, rythme, densité), jamais l'identité : pas de logo, de nom de produit, d'icône ni de police propriétaire des références ; leur couleur d'action n'est pas reprise.

## Règles prioritaires

1. **La clarté avant tout.** Un écran, une tâche, une action principale. Si deux boutons sont pleins sur le même écran, l'un des deux est en trop.
2. **La couleur est réservée.** Sarcelle `--accent` : l'action principale, les liens, l'élément sélectionné. Vert, jaune, rouge, bleu : les états, toujours avec un mot. Tout le reste est neutre.
3. **La densité se règle, elle ne se subit pas.** Deux réglages, `confort` (par défaut) et `compact` (`data-density="compact"`), qui changent hauteurs et marges, jamais la structure. Le texte ne descend pas sous 13 px.
4. **Le tableau est le cœur.** En-tête discret (12 px, gras, gris), lignes de 48 ou 36 px, nombres alignés à droite en chiffres tabulaires, une seule ligne de texte par cellule. Tri par l'en-tête, sélection par case, actions groupées au-dessus.
5. **Tout se fait au clavier.** Flèches dans la liste, Espace pour sélectionner, Entrée pour ouvrir, Échap pour fermer, « / » pour chercher, « ? » pour l'aide. Le focus est toujours visible (2 px `--focus`).
6. **Le mouvement répond, il ne décore pas.** 50 à 200 ms, sur une couleur, un panneau qui s'ouvre, un squelette qui attend. Aucune entrée de page, aucun défilement animé.
7. **Chaque liste a ses trois états** : vide (pourquoi, et quoi faire), chargement (squelette à la place des lignes), erreur (ce qui s'est passé, ce qui est préservé, comment réessayer).
8. Contraste : texte courant à 4,5:1 au moins, paires vérifiées dans `references/tokens.css`. Cibles de 44 px au doigt, tenues par une zone élargie quand le contrôle est plus petit.
9. Aucune valeur en dur : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root` et le bloc de densité. |
| `references/components.md` | Avant de coder un tableau, un filtre, un champ, une étiquette d'état, un chemin d'étapes, un panneau de détail. |
| `references/layouts.md` | Avant de construire un écran : coquille d'application, liste, fiche, tableau de bord. |
| `references/motion.md` | Avant d'ajouter une transition. |
| `references/assets.md` | Icônes, avatars, illustrations d'état vide. |
| `examples/demo.html` | Un CRM complet : liste d'affaires, fiche client, tableau de bord, états, raccourcis. |
| `source.md` | Les références, ce qui est mesuré, proposé, écarté. |

## Typographie

Une seule famille : **Inter** (libre), en remplacement de la sans propriétaire mesurée. Mono : **JetBrains Mono**, pour les touches et les identifiants.

| Rôle | Taille / interligne | Graisse | Couleur |
|---|---|---|---|
| Titre d'écran | 24 / 28 px | 650 | `--text` |
| Titre de panneau | 16 / 20 px | 650 | `--text` |
| Texte de travail, cellule | 14 / 20 px (13 px en compact) | 400 | `--text` |
| Libellé de champ, en-tête de colonne | 12 / 16 px | 650 | `--text-2` |
| Aide, date, compteur | 12 / 16 px | 400 | `--muted` |
| Bouton | 14 px | 500 | selon la variante |
| Chiffre de tableau de bord | 32 px | 650 | `--text` |

Ni capitales, ni interlettrage, ni italique. Les nombres sont en chiffres tabulaires (`font-variant-numeric: tabular-nums`).

## Couleurs

| Rôle | Token | Usage |
|---|---|---|
| Surface de travail | `--bg` | fond des écrans, des tableaux, des champs |
| Retrait | `--surface`, `--surface-2` | barre latérale, en-tête de tableau, survol |
| Texte | `--text`, `--text-2`, `--muted` | trois niveaux, pas plus |
| Filets | `--line`, `--line-strong` | séparations ; contour d'un champ |
| Action | `--accent` (+ `--selected`) | **un** bouton plein par écran, liens, ligne ou choix sélectionné |
| États | `--success`, `--warning`, `--danger`, `--info` et leurs fonds | étiquettes, messages, étape terminée ou perdue |

Un état ne se dit jamais par la couleur seule : toujours un mot (« Gagnée », « En retard »), souvent une icône.

## Images et 3D

Aucune photo d'ambiance, aucune 3D : un outil n'en a pas besoin. Les seules images sont les **portraits des personnes** (avatars ronds de 24 px, vraies photos, avec les initiales en repli) et, au besoin, une petite illustration au trait dans un état vide. Les icônes sont des tracés de 16 px, au trait de 1,75 px, de la couleur du texte. Jamais de dessin CSS ou SVG à la place d'une photo de personne ; détails dans `references/assets.md`.

## Signature

Discrète, et c'est le but : **le calme**. On la reconnaît à quatre choses tenues ensemble : un texte de 14 px partout, des en-têtes de colonne petits et gris, un seul bouton plein par écran, et la bascule confort / compact. Si une cinquième chose attire l'œil, elle est de trop.

## À éviter

- Un héros, une grande image, un dégradé, une ombre décorative, un titre d'affiche.
- Deux couleurs d'accent, ou une couleur pour « faire joli » dans un tableau.
- Des cartes à la place d'un tableau quand il y a plus de dix enregistrements.
- Un état dit par la couleur seule ; une icône sans mot pour une action destructrice.
- Une animation d'entrée, un compteur qui monte, un défilement fluide.
- Des lignes de tableau sur deux lignes de texte ; des colonnes sans en-tête.
- Copier logos, noms, icônes ou couleur de marque des références.

## Adaptation React / React Native

Les composants sont du HTML sémantique (`table`, `button`, `dialog`, `nav`) : en React, garder ces balises et les attributs ARIA (`aria-sort`, `aria-selected`, `aria-current="step"`). La densité se passe par un attribut sur la racine, pas par des props sur chaque composant. Tableau virtualisé au-delà de quelques centaines de lignes (TanStack Virtual ou équivalent), en gardant la navigation aux flèches. React Native : la liste remplace le tableau (une fiche par enregistrement, comme la version étroite de la démo) ; pas de survol, donc la sélection passe par un appui long ou une case.

## Avec kobo-studio

Fiche de correspondance `kobo-studio/contract/maps/clear-ledger-desk.css`, couche de signature `components/signatures/clear-ledger-desk.css`, structure de page `ux/structures/application/`. Le skill n'a aucun gabarit de signature : sa signature est la sobriété.

## Avant de livrer

- [ ] Tokens importés, aucune valeur en dur ; bloc de densité présent.
- [ ] Un seul bouton plein par écran ; aucune couleur hors états et action.
- [ ] Tableau : tri, sélection, actions groupées, états vide / chargement / erreur.
- [ ] Tout l'écran se parcourt au clavier ; focus visible ; aide « ? » à jour.
- [ ] Essayé en confort et en compact, à 1440 et 390 px (le tableau devient une liste de fiches).
- [ ] Mouvement réduit respecté ; contrastes vérifiés.
- [ ] Données de démonstration annoncées comme fictives.
