# Source — Clear Ledger Desk

- **Références** : deux design systems publics, choisis par Ylian le 5 octobre 2026 dans la liste proposée par `site-to-skill` pour « un CRM B2B pour une PME de services ».
  - **Style** : le design system public d'un éditeur d'outils de suivi de travail — `https://atlassian.design`.
  - **Schémas propres au CRM** : le design system public d'un éditeur de CRM — `https://www.lightningdesignsystem.com` (version 2).
- **Famille** : Outil de travail / CRM, back-office
- **Registre** : fonctionnel. **Type d'application** : CRM, back-office.
- **Analysé le** : 2026-10-05, Chrome, fenêtre 1440 × 900. Pas de mesure à 390 px : ce sont des sites de documentation, pas l'application.
- **Ce que la personne veut** : la clarté pour signature ; une densité réglable ; des tableaux lisibles ; la couleur réservée aux états et à l'action principale ; aucun mouvement de décor.

## Ce que contient la référence

**Référence de style, cinq pages ouvertes** (le plafond du registre fonctionnel) : couleurs, typographie, tableau dynamique (exemples), formulaire (exemples), état vide (exemples). Les exemples y sont rendus dans la page : tout y est mesurable.

**Référence CRM, cinq pages ouvertes** : index des composants, densité d'affichage, tableau de données, indicateur de progression, affichage des données. Les exemples y sont dans des cadres d'un autre domaine : **rien n'y a été mesuré au pixel**, seules les règles d'usage ont été lues.

Six captures par référence au plus : quatre prises pour la première, quatre pour la seconde.

## Mesuré (référence de style, navigateur, 1440 px)

| Quoi | Valeur |
|---|---|
| Texte courant | 14 px / 20 px, graisse 400, `#292a2e` |
| Texte secondaire, discret | `#505258`, `#6b6e76` |
| Titres | 14/20, 16/20, 20/24, 24/28, 28/32 px, graisse 653 (police variable) |
| Libellé de champ, en-tête de colonne | 12 px / 16 px, graisse 653, `#505258`, sans capitales ni interlettrage |
| Fonds | `#ffffff`, retrait `#f8f8f8`, survol `#f0f1f2`, survol de ligne `#051524` à 6 % |
| Filets | `#0b120e` à 14 % ; contour de champ `#8c8f97` ; focus `#4688ec` |
| États | erreur `#ae2e24` sur `#ffeceb`, plein `#c9372c` ; succès `#4c6b1f` sur `#efffd6` ; attention `#9e4c00` sur `#fff5db`, plein `#fbc828` ; information `#1558bc` sur `#e9f2fe` |
| Espacement | 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64 px |
| Rayons | 4, 6 (le plus courant), 8, 12 px |
| Ombres | posée : `0 1px 1px` à 25 % + `0 0 1px` à 31 % ; flottante : `0 8px 12px` à 15 % + `0 0 1px` à 31 % |
| Tableau | en-tête 34 px, 12 px gras gris ; ligne 48 px ; cellule 4 px 8 px ; un seul filet sous l'en-tête |
| Champ | 40 px, contour 0,8 px, rayon 6 px, marge 8 px 6 px ; libellé à 4 px au-dessus ; aide 12 px à 4 px dessous |
| Bouton | 32 px, 14 px en graisse 500, rayon 6 px, marge 6 px 12 px |
| Pagination | cellules de 32 px, rayon 6 px ; la page courante sur fond sélectionné |
| État vide | titre 20 px / 24 px en gras, centré, bloc de 464 px |
| Transitions | couleurs en 50 ms (100, 150 ms), `cubic-bezier(0.4, 1, 0.6, 1)` ; opacité et déplacement en 200 ms |
| Points de rupture | 30, 48, 64, 90 rem |

## Lu en texte (référence CRM, non mesuré)

- **Densité** : deux réglages, « confort » (par défaut, plus d'air, champs empilés) et « compact » (moins d'espace, plus d'information visible, champs côte à côte). C'est un choix de l'utilisateur ; l'interface doit tenir dans les deux ; en compact, vérifier les cibles tactiles et la lisibilité.
- **Tableau de données** : trier et filtrer par les colonnes ; sélection de lignes et actions groupées ; le tableau va d'un bord à l'autre de sa liste, un filet sépare l'en-tête ; éviter trop de champs et l'édition en place pour ce qui change rarement.
- **Affichage des données** : un tableau au-delà de dix enregistrements, des tuiles en dessous ; titrer chaque liste et libeller les champs ; un message quand la liste est vide (« essayez de modifier les filtres ») ; sur écran étroit, le tableau se replie en liste de tuiles.
- **Indicateur de progression** : trois étapes au moins, six au plus ; étapes terminée, en cours, à venir, en erreur ; nommer l'étape par une action, pas par un numéro.

## Lu à l'œil (captures)

Barre latérale claire dont le lien courant porte un fond teinté et un trait à gauche ; beaucoup de blanc, peu de boîtes ; les exemples de tableau n'ont aucun fond de ligne alterné.

## Polices

| Référence | Dans le skill | Raison |
|---|---|---|
| Sans propriétaire de la référence de style (variable, graisse 653) | **Inter** 400, 500, 650 | Licence. Même structure : sans humaniste neutre, chiffres tabulaires disponibles |
| Mono propriétaire | **JetBrains Mono** | Licence |

## Proposé par le skill

- La **couleur d'action** sarcelle `#0f6e6a`, son survol, son fond de sélection et son focus.
- La **densité compacte** chiffrée : ligne de 36 px, champ de 32 px, bouton de 28 px, texte de 13 px.
- La **coquille d'application** : en-tête de 48 px, barre latérale de 240 px repliable à 56 px, panneau de détail de 416 px.
- Le **chemin d'étapes** en segments, le **bandeau d'actions groupées**, l'**historique**, les **chiffres de tableau de bord**, la **notification** annulable.
- Les **raccourcis clavier** et leur aide « ? ».
- La version étroite du tableau en liste de fiches.

## Écarts assumés

| Élément des références | Dans le skill | Raison |
|---|---|---|
| Bleu d'action et de sélection de la référence de style | Sarcelle `#0f6e6a` | La couleur d'action est ce qui identifie le plus la référence : on ne la reprend pas |
| Polices propriétaires | Inter, JetBrains Mono | Licence |
| Logos, nom des produits, jeu d'icônes, illustrations d'état vide | Aucun ; icônes au trait écrites à la main | Identité |
| Graisse 653 | 650 | Valeur ronde, même rendu avec Inter |
| Filet à 14 % d'opacité | `#dddee1` plein | Un filet plein se déclare dans `@contrast` et se lit sur tous les fonds |
| Étiquettes d'état en capitales grasses (ancienne forme) | Bas de casse, graisse 500 | Mesuré ainsi sur la version actuelle ; plus lisible en liste dense |
| Chemin d'étapes en chevrons du CRM (ancienne version, non ouverte) | Segments rectangulaires | Non mesuré ; les chevrons sont une forme très identifiable |
| En-tête d'enregistrement, fil d'activité du CRM | Proposés par le skill | Absents de la version 2 de la référence ; la version 1 n'a pas été ouverte (plafond de pages) |
| Mode sombre des deux références | Non repris | Hors de la demande ; les rôles le permettent |

## Limites connues

- La référence CRM n'a fourni **que des règles lues** : ses exemples sont dans des cadres qu'on n'a pas mesurés. Tout ce qui est propre au CRM (chemin, fiche, historique) est **proposé**, pas relevé.
- Aucune mesure sur une vraie application : seulement sur des pages de documentation.
- La densité compacte n'a pas de valeur mesurée : ses cotes sont des choix.
- Démo essayée dans Chrome seulement ; pas au doigt sur un vrai téléphone ; pas avec un lecteur d'écran.
- Pas d'édition en place, pas de tri sur plusieurs colonnes, pas de colonnes redimensionnables, pas de virtualisation.
