# Créer un skill avec Claude

Ce guide explique comment fabriquer un nouveau skill, avec Claude qui fait le gros du travail. La première partie concerne les **styles de design Kōbō** (le cas le plus courant ici). La seconde concerne **n'importe quel skill** (une méthode de travail, une checklist, un processus d'équipe).

---

## 1. L'idée en deux minutes

Un skill, c'est **un mode d'emploi que Claude lit au bon moment**. Il tient dans un dossier :

- un fichier principal, `SKILL.md`, court : à quoi sert le skill et les règles les plus importantes ;
- des fichiers de détail (`references/`), que Claude n'ouvre que lorsqu'il en a besoin ;
- éventuellement des exemples ou des scripts.

Le point le plus important est la **description** en haut de `SKILL.md`. C'est elle que Claude lit pour décider si le skill concerne la demande. Une description vague, et le skill n'est jamais utilisé ; une description qui liste les bons mots (« landing page », « jeu vidéo », « néon »…), et Claude le choisit tout seul.

Créer un skill avec Claude se fait toujours en quatre temps :

1. **Montrer** à Claude ce que tu veux (un site, une maquette, un exemple de résultat).
2. **Le laisser écrire** le skill à partir d'un gabarit.
3. **Le faire prouver** : construire quelque chose uniquement avec le skill et comparer.
4. **Corriger** ce qui ne va pas, puis publier.

---

## 2. Créer un style de design Kōbō

### Ce qu'il te faut

- Le plugin Kōbō installé dans Claude Code (voir `GUIDE.md`).
- Une **référence** : l'adresse d'un site, un shot Dribbble, une capture d'écran.
- Si possible, l'extension **Claude in Chrome** : Claude peut alors ouvrir le site et **mesurer** les vraies couleurs, polices, tailles et animations au lieu de les deviner.

### Étape 1 — Lancer la création

Dans Claude Code, ouvert dans le dossier `kobo-design-skills` :

```
/kobo-design:site-to-skill https://le-site-de-reference.com
Ce que j'aime : les titres énormes et l'ambiance de nuit.
Ce que je veux en faire : des landing pages pour mes projets.
Nom du style : nuit-de-neon
```

Le skill `site-to-skill` contient toute la méthode. Claude va :

1. ouvrir le site et lancer le script de mesure (`scripts/extract-design.js`) ;
2. relever couleurs, polices, tailles, espacements, arrondis, ombres et animations ;
3. analyser les **visuels** (photos, illustrations, 3D) : sujets, cadrages, traitements ;
4. écrire le skill à partir du gabarit `templates/skill/` ;
5. construire une page d'exemple et la comparer au site.

> **Pas de Chrome ?** Joins une ou plusieurs captures d'écran à ta demande. Claude travaillera à l'œil : les valeurs seront des estimations, et il doit l'écrire dans `source.md`.

### Étape 2 — Ce que Claude doit produire

```
plugins/kobo-design/skills/<nom-du-style>/
├── SKILL.md              l'idée, les règles, la typo, les couleurs, la signature, à éviter
├── source.md             la référence, ce qui a été mesuré ou seulement estimé, les écarts
├── references/
│   ├── tokens.css        toutes les valeurs (couleurs, polices, tailles, durées)
│   ├── components.md     boutons, cartes, menus, champs… avec leurs états
│   ├── layouts.md        structures de pages, version mobile
│   ├── motion.md         animations et version « mouvement réduit »
│   └── assets.md         images et 3D : quoi montrer, comment, où les trouver
└── examples/
    └── demo.html         une page complète construite uniquement avec le skill
```

### Étape 3 — Les règles à faire respecter

Rappelle-les à Claude si besoin, ce sont celles qui font la qualité :

| Règle | Pourquoi |
|---|---|
| **Le langage visuel, jamais l'identité** : pas de logo, personnage, texte, illustration ou police payante du site d'origine. | Droits d'auteur et marques. On s'inspire, on ne copie pas. |
| **Des valeurs mesurées, ou signalées comme estimées** dans `source.md`. | Pour savoir ce qui est fiable. |
| **De vraies images et une vraie 3D** dans la démo, jamais des dessins CSS/SVG à la place d'une photo, d'un personnage ou d'un objet. | Sinon la démo ressemble à une maquette vide et Claude Code reproduira ce réflexe. |
| **Des contrastes lisibles** : les paires texte/fond déclarées dans `tokens.css` avec `@contrast`. | `tools/check.py` les vérifie automatiquement. |
| **Mobile et mouvement réduit** pris en charge. | Accessibilité et confort. |
| **`SKILL.md` court** (moins de 300 lignes), le détail dans `references/`. | Claude charge moins de texte, il reste précis. |

### Étape 4 — Vérifier

Demande à Claude :

```
Lance python tools/check.py nuit-de-neon, corrige les erreurs,
puis ouvre la démo dans Chrome à 1440 px et 390 px et compare-la au site de référence.
Liste-moi ce qui est différent et ce qui a été estimé.
```

Puis regarde toi-même la démo (`examples/demo.html`, double-clic). Les questions à se poser :

- Est-ce que je reconnais l'**ambiance** du site en 3 secondes ?
- La **signature** (l'élément qu'on remarque tout de suite) est-elle là ?
- Les **images** ressemblent-elles à celles qu'on attend (sujets, lumière, traitement) ?
- Est-ce que ça tient sur **téléphone** ?

S'il manque quelque chose, dis-le simplement : « les titres ne sont pas assez serrés », « il manque la lueur derrière les cartes », « les photos devraient être plus froides ». Claude corrige le skill **et** la démo.

### Étape 5 — Publier

```
Ajoute le style au catalogue (plugins/kobo-design/skills/catalogue/SKILL.md) et au tableau du README,
relance python tools/check.py et python tools/build_gallery.py,
puis commit et push.
```

Les autres mettent à jour avec `/plugin marketplace update kobo`.

### Le tester dans un vrai projet

C'est la meilleure preuve :

```
/kobo-design:nuit-de-neon crée la page d'accueil de mon app avec ce style
```

Si le résultat s'éloigne du style, c'est le skill qu'il faut corriger (une règle manque ou est floue), pas seulement la page.

---

## 3. Créer n'importe quel skill (hors design)

### Le principe

On part d'une tâche que tu refais souvent et que tu expliques toujours de la même façon : préparer une release, relire un contrat, écrire un compte rendu, configurer un projet Expo… Le skill est cette explication, écrite une fois pour toutes.

### La façon la plus simple : faire la tâche avec Claude, puis la transformer en skill

1. Fais la tâche une fois avec Claude, en le corrigeant au fur et à mesure.
2. Quand le résultat est bon, demande :

```
Transforme ce qu'on vient de faire en skill réutilisable.
Nom : release-expo
Il doit se déclencher quand je parle de publier une version de l'app.
Garde les étapes, les vérifications et les erreurs qu'on a corrigées.
```

3. Relis le `SKILL.md` produit, surtout la description et les étapes.

### Où ranger le skill

| Portée | Dossier |
|---|---|
| Pour toi, dans tous tes projets | `~/.claude/skills/<nom>/SKILL.md` |
| Pour un projet (partagé via Git) | `.claude/skills/<nom>/SKILL.md` à la racine du projet |
| Dans un plugin (comme Kōbō) | `<plugin>/skills/<nom>/SKILL.md` |

### Le squelette minimal

```markdown
---
name: release-expo
description: Publie une nouvelle version de l'app Expo (build EAS, numéro de version, notes de version). À utiliser quand on parle de release, de publier l'app, de build de production ou de mise à jour sur les stores.
---

# Release Expo

## Étapes
1. …
2. …

## Vérifications avant de terminer
- [ ] …

## Erreurs fréquentes
- …
```

Le `name` doit être identique au nom du dossier. D'autres champs facultatifs existent (par exemple `allowed-tools` pour pré-autoriser des outils, ou `disable-model-invocation: true` pour qu'un skill ne se lance que quand tu le demandes) : voir la [documentation des skills](https://code.claude.com/docs/en/skills).

### Écrire une bonne description

- **Ce que fait le skill**, en une phrase.
- **Quand l'utiliser** : les mots que tu emploies vraiment (« release », « publier », « mettre en prod »).
- Pas de « ce skill est très utile » : uniquement des faits.

### Garder le skill efficace

- **Court en haut, détaillé en bas** : les règles essentielles dans `SKILL.md`, les longues listes, exemples et modèles dans `references/`, avec une ligne qui dit quand les lire.
- **Des exemples concrets** valent mieux que des principes abstraits.
- **Des vérifications** à la fin : une checklist que Claude doit cocher avant de dire « fini ».
- **Des chemins relatifs au skill** : dans un skill, `${CLAUDE_SKILL_DIR}` désigne son propre dossier (pratique pour appeler un script qu'il contient).

### Tester et ajuster

1. Démarre une nouvelle session (ou recharge : `/reload-plugins` pour un plugin).
2. Fais une demande **sans nommer le skill** : se déclenche-t-il tout seul ? Sinon, enrichis la description.
3. Appelle-le par son nom (`/release-expo`, ou `/kobo-design:<nom>` dans un plugin) et vérifie le résultat.
4. Note ce qui a mal tourné et demande à Claude de corriger le skill, pas seulement le résultat.

> Anthropic propose aussi un skill **skill-creator** qui aide à écrire un skill, à le tester sur plusieurs cas et à améliorer sa description. Dans l'app Claude (Cowork), il suffit de demander « crée-moi un skill pour… ». Dans Claude Code, regarde dans `/plugin` s'il est disponible pour ton compte.

---

## 4. Demandes prêtes à copier

**Nouveau style à partir d'un site**
```
/kobo-design:site-to-skill <url> — nom : <nom-du-style>. Ce que j'aime : <…>. Usage prévu : <…>.
```

**Nouveau style à partir de captures**
```
Crée un skill Kōbō nommé <nom-du-style> à partir des captures jointes, en suivant templates/skill/
et la méthode de plugins/kobo-design/skills/site-to-skill. Les valeurs seront estimées : signale-le dans source.md.
```

**Améliorer un style existant**
```
Dans le skill <nom-du-style>, <ce qui ne va pas>. Corrige les règles, les tokens et la démo,
puis relance python tools/check.py <nom-du-style>.
```

**Ajouter la 3D à un style**
```
Ajoute une scène 3D au skill <nom-du-style> : <objet / ambiance>. Mets la recette dans references/assets.md
(matières, lumière, interaction, modèles .glb libres, version React Native) et intègre-la dans la démo avec une image de repli.
```

**Transformer une tâche en skill**
```
Transforme ce qu'on vient de faire en skill nommé <nom>, qui se déclenche quand je parle de <…>.
Garde les étapes, les vérifications et les erreurs corrigées.
```
