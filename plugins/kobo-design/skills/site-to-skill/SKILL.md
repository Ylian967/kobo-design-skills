---
name: site-to-skill
description: Méthode Kōbō pour trouver une référence de design adaptée à un projet, puis en faire un skill de direction artistique complet et utilisable par kobo-studio. À utiliser quand on demande de créer un skill de design à partir d'un site (« fais un skill à partir de https://… », « analyse le style de ce site », « ajoute un style à la bibliothèque Kōbō »), ou de trouver des références pour un type d'application sans adresse en main (« des références pour un CRM », « à quoi doit ressembler un back-office, un ERP, un SaaS, un tableau de bord », « des exemples de landing, de boutique, de site d'événement »). Juge d'abord le registre (fonctionnel, produit, expressif), cherche en local avant le web, propose au plus dix références, s'arrête pour laisser choisir, puis n'analyse en entier que la ou les références choisies.
---

# site-to-skill

Deux travaux, dans cet ordre quand la demande n'a pas d'adresse :

- **B. Trouver des références** adaptées au type d'application, et laisser choisir.
- **A. Faire un skill** à partir de la référence choisie (ou de l'adresse donnée), au format actuel des skills, avec sa fiche de correspondance et sa couche de signature kobo-studio.

Une adresse est donnée : passe directement à A. Un type d'application est donné (« un CRM », « une boutique ») : commence par B.

## Règles fixes

1. **Le style, pas l'identité.** On reprend proportions, rythme, traitements, hiérarchie, mouvement. Jamais logos, noms, illustrations, photos, textes, polices propriétaires, ni une page copiée au point qu'on confonde la démo avec l'original.
2. **Le registre d'abord.** Il décide où chercher et ce qu'on attend du résultat (voir plus bas). Un projet fonctionnel appelle de la clarté, pas un design spectaculaire : ne lui propose jamais une référence expressive.
3. **Local avant le web, texte avant les captures, liste avant l'analyse.** L'entonnoir ci-dessous n'est pas un conseil : c'est l'ordre.
4. **Un arrêt obligatoire** après la liste de références : la personne choisit. Aucune analyse complète avant son choix.
5. **Mesuré, proposé, estimé : toujours dit.** Ce qu'on a lu dans le navigateur est « mesuré » ; ce qu'on a ajouté est « proposé » ; ce qu'on a jugé à l'œil est « estimé ». Une maquette (Dribbble) ne se mesure pas.
6. **Tout ce qui est vu rejoint l'index** (`references/index.md`), choisi ou non : la prochaine recherche commence là.

## Le registre

Juge-le avant toute recherche, et dis ta lecture en une phrase.

| Registre | C'est | Ce qu'on attend de la référence | Ce qu'on n'en attend pas |
|---|---|---|---|
| **Fonctionnel** | Faire un travail, tous les jours : CRM, ERP, back-office, outil interne, application SaaS, tableau de bord | Clarté et densité : tableaux denses, filtres, recherche, formulaires longs, états vides et d'erreur, raccourcis clavier, barre latérale, hiérarchie calme, un seul accent | Héros, grandes images, mouvement d'entrée, typographie d'affiche, 3D |
| **Produit** | Présenter ou vendre une offre : landing, site vitrine, e-commerce, tarifs | Une promesse lisible en un écran, une action, des preuves vraies, une fiche produit ou une grille | Une interface d'outil ; un récit qui retarde l'action |
| **Expressif** | L'image et le récit priment : jeu, marque, événement, culture, campagne | Une signature forte, du mouvement, une mise en scène | Densité d'information, tableaux |

Un projet mêle parfois deux registres (un SaaS a une landing *produit* et une application *fonctionnelle*) : traite-les comme deux recherches, et demande laquelle on veut d'abord.

## B. Trouver des références : l'entonnoir

Chaque étage coûte plus que le précédent. On ne descend que si l'étage du dessus ne suffit pas.

### B1. Local d'abord (aucun appel réseau)

1. `../kobo-studio/catalogue.md` : les 23 skills, leur registre, leurs forces et limites. Si l'un convient, il est en tête de liste, marqué « déjà un skill ».
2. `references/index.md` : les références déjà vues. Filtre par registre et par type d'application. Une référence déjà analysée ou déjà devenue skill se propose sans rien rouvrir.

Si le local donne déjà cinq références justes, **ne va pas sur le web** : passe à B3.

### B2. Sources fixes du registre (texte seulement)

Lis `references/sources.md` : les sources gardées pour chaque registre, leur page d'entrée, et la façon de les lire (requête simple ou navigateur). N'en ouvre pas d'autres ; pas de moteur de recherche tant que ces sources n'ont rien donné.

- **Trois pages de source au plus** par recherche, choisies pour le type d'application.
- **En texte** : titre, liens, noms, une ligne de description. **Aucune capture** à cet étage.
- Une source qui demande un compte, renvoie une erreur ou a changé d'adresse : note-le dans l'index et passe à la suivante. Ne contourne rien.
- Espace les appels (une page à la fois).

### B3. La liste, puis l'arrêt

Dix références **au plus**. Moins si moins de dix sont justes : une liste courte et juste vaut mieux qu'une liste remplie.

| # | Nom | Lien | En une ligne | Pourquoi pour ce projet | État |
|---|---|---|---|---|---|

- « Pourquoi » parle du projet de la personne (« tableaux denses avec filtres enregistrés : votre suivi d'affaires »), pas de la référence en général.
- « État » : *déjà un skill*, *déjà analysée*, *vue en liste*, et ce qui limite (*compte demandé*, *maquette : non mesurable*, *adresse instable*).
- Classe par justesse, pas par notoriété. Dis laquelle tu prendrais, et pourquoi, en une phrase.
- Avant d'envoyer la liste, vérifie que chaque lien répond (le code de réponse seulement, sans lire la page) : un lien mort ou redirigé ailleurs sort de la liste et entre dans l'index comme *écartée*.

**ARRÊT.** Envoie la liste et attends. La personne choisit une ou deux références. Ne commence aucune analyse, aucune capture, aucun fichier de skill.

### B4. Analyse complète des références choisies seulement

Une ou deux références, pas plus. Plafonds par référence :

| | Fonctionnel | Produit, expressif |
|---|---|---|
| Pages ouvertes | 5 : couleurs, typographie et espacement, tableau de données, formulaire, un schéma (état vide ou chargement) | 3 : accueil, une page intérieure, une page d'un autre type |
| Largeurs | 1440 px (390 px seulement si l'application a une version mobile) | 1440 et 390 px |
| Captures | 6 | 8 |

Au-delà, demande avant de continuer. Puis passe à A.

### B5. Tout rejoint l'index

Ajoute à `references/index.md` une ligne par référence **vue**, même écartée, même inaccessible : date, registre, type d'application, nom, lien, une ligne, état. Mets à jour la ligne d'une référence qui change d'état (analysée, devenue skill `<id>`).

## A. Faire le skill

### A1. Cadrer

Dans `source.md` : l'adresse, le registre, le type d'application, et **ce que la personne aime** dans cette référence. Le skill insiste sur ces points.

### A2. Mesurer

Ouvre la page à 1440 × 900, attends la fin des entrées, exécute `${CLAUDE_SKILL_DIR}/scripts/extract-design.js` (console du navigateur, ou injection par un outil d'automatisation). Recommence à 390 × 844 si la référence a une version mobile, et sur les autres pages du plafond B4.

L'extracteur donne : polices chargées, échelle de tailles, couleurs pondérées par surface, rayons, ombres, découpes, filtres, espacements, transitions, animations, points de rupture, variables CSS, styles calculés des boutons, liens, champs et cartes.

Registre fonctionnel, mesure en plus : hauteur d'une ligne de tableau et d'un champ, taille du texte de données, largeur de la barre latérale, écarts entre champs d'un formulaire, couleurs d'état (succès, attention, erreur, information).

### A3. Observer ce que les mesures ne disent pas

Dans la limite des captures : chaque type de section ou d'écran, survol et focus d'un bouton, d'une ligne, d'un champ ; menu ouvert ; état vide, erreur, chargement quand la référence les montre. Note la composition, le traitement des images, les ornements, le comportement au défilement.

### A4. Normaliser en tokens

Regroupe les tailles proches, une base d'espacement (4 ou 8), trois ou quatre rayons, deux ou trois durées, une ou deux courbes. Remplace chaque police payante par la police libre la plus proche, et écris-le dans `source.md`.

### A5. Écrire le skill, au format actuel

Dossier `plugins/kobo-design/skills/<id>/`, à partir de `templates/skill/`. Le détail de chaque fichier est dans `references/format-skill.md` : **lis-le avant d'écrire**. En bref :

- `SKILL.md` (moins de 300 lignes), `references/tokens.css` (en-tête « MESURÉS le … » et ligne `@contrast`), `components.md`, `layouts.md`, `motion.md` (avec **Performance** et **Mouvement réduit**), `assets.md`, `examples/demo.html` (**animée**, vraies images), `source.md` (**mesuré / proposé / écarts**).
- Registre fonctionnel : la démo est **un écran d'application** (barre latérale, tableau dense avec filtres, formulaire, état vide), pas une page d'accueil ; `motion.md` se limite aux retours d'état.

### A6. Le brancher sur kobo-studio

Un skill n'est fini que si kobo-studio peut s'en servir. Dans `../kobo-studio/` :

1. **Fiche de correspondance** : `python3 tools/gen_maps.py <id>`, puis relis `contract/maps/<id>.css` ligne à ligne (le script devine d'après les noms), corrige et marque `[main]` ce que tu décides, et lance `python3 tools/check_contract.py <id>`.
2. **Couche de signature** : `components/signatures/<id>.css`, selon `components/signatures/README.md` (deux blocs, intensité, premier **et** second lot de composants). Rien d'inventé : seulement ce que le skill décrit. Ajoute l'identifiant à `LAYERS` dans `components/gallery.html` et une ligne au tableau du README.
3. **Catalogue** : une fiche dans `catalogue.md` (registre, pour qui, forces, limites honnêtes, photos exigées, gabarits) et sa ligne dans « Gabarits par emplacement ». Un skill neuf n'a aucun gabarit : dis-le.
4. `python3 tools/check_components.py`, puis regarde le skill dans `components/gallery.html`, en `full` et en `off`, à 1440 et 390 px.

### A7. Prouver

1. Construis `examples/demo.html` en lisant seulement le skill, pas la référence.
2. Capture la démo et la référence aux mêmes largeurs, compare-les côte à côte.
3. Chaque écart est corrigé dans le skill (pas seulement dans la démo) ou assumé dans `source.md`.
4. `python3 tools/check.py <id>` et `python3 tools/build_gallery.py` (à la racine du dépôt).
5. Mets à jour la ligne de la référence dans `references/index.md` : « devenue skill `<id>` ».

Un skill est terminé quand la démo est reconnaissable comme « du même style » que la référence sans pouvoir être confondue avec elle, **et** que la galerie de kobo-studio le rend sans erreur.

## Ce que ce skill ne fait pas

- Il n'ouvre aucun compte et ne franchit aucune protection : une source fermée est notée et laissée.
- Il ne mesure pas une maquette : une référence Dribbble donne une idée, tout y est estimé, et `source.md` le dit.
- Il ne crée pas la structure d'application de kobo-studio (barre latérale, écran de liste, écran de fiche) : kobo-studio a les composants du registre fonctionnel (tableau, pagination, sélection, menu déroulant, interrupteur, accordéon…), pas encore de structure de page pour une application. À dire quand on livre un skill fonctionnel.
