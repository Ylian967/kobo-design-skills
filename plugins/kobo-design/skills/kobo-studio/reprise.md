# Mode reprise : refaire un site existant

On ne repart pas de zéro : le site a un contenu, des adresses, des habitudes. La reprise garde ce qui a de la valeur et remplace le reste, par lots, avec une capture avant et après chaque lot.

Quatre temps. Deux arrêts obligatoires dans le temps 2 : après les questions, puis après la proposition.

```
<projet>/
  avant/        le site d'origine, copié tel quel — jamais modifié, jamais livré
  index.html    le nouveau site, construit lot par lot
  kobo/  captures/  …
```

## 1. Lecture — ce qui existe

Copie le site d'origine dans `<projet>/avant/`, puis fais l'état des lieux :

```bash
python3 <kobo-studio>/tools/check_studio.py <projet>/avant --constat --captures <projet>/captures --prefixe avant-
```

Tu obtiens `captures/avant-<page>-1440.png` et `-390.png`, et les constats mesurés : contenu masqué, texte sous 12 px, débordement à 390 px, images cassées, contrastes au pire pixel. **Regarde les captures.**

Puis lis le code d'origine et dresse l'inventaire, sans rien juger encore :

| À relever | Détail |
|---|---|
| **Contenu** | Chaque texte porteur d'information : titres, paragraphes, prix, horaires, adresses, mentions. C'est lui qu'on garde |
| **Pages et adresses** | Les pages, leurs noms de fichier, les ancres : elles ne doivent pas casser |
| **Actions** | Ce que le visiteur peut faire : formulaire (et où il part), téléphone, lien de réservation, achat |
| **Images** | Lesquelles sont de vraies photos du client (à garder), lesquelles sont du décor ou de la banque |
| **Marque** | Logo, couleurs (codes exacts), police |
| **Ce qui ne marche pas** | Les constats du script, plus ce que tu vois : liens morts, faux contenu, texte de remplissage, formulaire sans retour |

## 2. Rapprochement — vers quoi on va

Pose au client les questions du premier tour de `interview.md` **que le site ne tranche pas** : l'action principale (souvent floue sur un vieux site), ce qui est encore vrai dans le contenu, les photos disponibles en plus, les couleurs à garder ou non, HTML ou React. Ne redemande pas ce que le site dit déjà. Joins les constats du temps 1, puis **arrête-toi** et attends les réponses.

Une fois les réponses reçues, écris la proposition (étape c de `SKILL.md`) avec, en plus, le **tableau de rapprochement** :

| Élément d'origine | Devient | Décision |
|---|---|---|
| chaque section, bloc ou page | la section de la structure, l'emplacement ou le composant qui le reçoit | **gardé** (tel quel), **réécrit** (même information, autre forme), **déplacé**, **retiré** (et pourquoi) |

Règles du rapprochement :

- **Aucune information ne disparaît sans être dite.** Un texte retiré figure dans le tableau avec sa raison (faux, périmé, doublon, remplissage).
- Un faux avis, un chiffre sans source, un logo inventé sont **retirés**, pas recopiés. Le client peut fournir les vrais.
- Les couleurs du site d'origine ne sont pas reprises par défaut : si le client y tient, elles passent par `brand.md`.
- Le balisage d'origine n'est pas repris : on reprend le **contenu**, dans la structure et les composants de kobo-studio.
- Les noms de fichier et les ancres d'origine sont gardés quand c'est possible ; sinon la correspondance ancienne → nouvelle adresse est écrite.

Joins le **plan de migration** (temps 3), puis **arrête-toi** : le client valide le skill, le rapprochement et les lots.

## 3. Plan de migration — les lots

Un lot est une partie du site qu'on peut montrer finie. Ordre conseillé :

| Lot | Contenu | Critère de fin |
|---|---|---|
| **1 — Socle et premier écran** | Kit posé, barre de navigation, héros, pied de page, marque | Le premier écran est reconnaissable et vrai |
| **2 — Corps de la page principale** | Les sections dans l'ordre du plan UX | Tout le contenu gardé de la page est en place |
| **3 — Actions et états** | Formulaire (validation, erreur, envoi, succès), états vides, liens | Chaque action aboutit ou dit pourquoi elle n'aboutit pas |
| **4 — Pages secondaires** | Une page par lot si elles sont longues | Toutes les adresses d'origine répondent |

Un petit site d'une page tient en deux lots (1 + 2, puis 3) ; une page très courte peut tenir en un seul, suivi d'un passage de vérification : dis-le plutôt que d'inventer une frontière. Dis combien de lots tu prévois et ce que chacun contient.

## 4. Migration par lots, avec captures avant / après

Lot 1 : pose le kit (`tools/kit.py`, étape d de `SKILL.md`) ; tout le reste de l'étape d s'applique.

Après **chaque** lot :

```bash
python3 <kobo-studio>/tools/check_studio.py <projet> --prefixe lot-<n>-
```

1. Corrige les `✗` du lot avant de passer au suivant. Une erreur laissée se paie au lot d'après.
2. Ouvre `captures/lot-<n>-<page>-1440.png` et `-390.png` **à côté** de `avant-<page>-…` : le contenu gardé est-il tout là ? Lisible ? Dans le bon ordre ?
3. Coche dans le tableau de rapprochement ce qui est migré.

Tant qu'un lot n'est pas fait, sa partie de la page de départ garde le contenu de démonstration : le script le signale (« reste du contenu de démonstration »), c'est normal jusqu'au dernier lot. À la fin, 0 erreur.

Dernier passage, sans préfixe, pour les captures finales, puis la grille anti-slop (étape e de `SKILL.md`).

## Livraison

Celle de `SKILL.md` (étape f), plus :

- le **tableau de rapprochement** final : gardé, réécrit, déplacé, retiré ;
- les captures **avant / après** aux deux largeurs ;
- les constats de départ que la reprise corrige (mesurés avant, mesurés après), et ceux qu'elle ne corrige pas ;
- la correspondance des adresses, si l'une a changé ;
- `avant/` reste dans le dossier pour comparaison : il n'est pas à mettre en ligne.

## Limites

- `--constat` lit des fichiers locaux. Pour un site en ligne, enregistre d'abord ses pages (HTML, CSS, images) dans `avant/` ; un site rendu par script côté client donnera un état des lieux partiel.
- Le script mesure ; il ne dit pas si un texte est encore vrai. Seul le client le sait.
- Le référencement (redirections, balises, plan du site) n'est pas traité ici au-delà du titre, de la langue et des adresses gardées.
