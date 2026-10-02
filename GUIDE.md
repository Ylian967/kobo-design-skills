# Guide : utiliser et gérer les skills Kōbō

Ce guide explique, sans jargon, comment installer les skills, les utiliser dans Claude Code pour construire une app ou un site, et les mettre à jour.

---

## 1. C'est quoi un skill, en une minute

Un skill est un **dossier de consignes** que Claude Code lit quand il en a besoin. Ici, chaque skill décrit **un style visuel complet** : les couleurs, les polices, la forme des boutons et des cartes, la mise en page, les animations, et il contient une **page d'exemple** qui montre le résultat.

Quand tu demandes « fais-moi une page d'accueil dans le style X », Claude Code ouvre le skill X, applique ses règles et s'en sert comme d'une charte graphique.

Kōbō regroupe tous ces skills dans **un seul plugin** (`kobo-design`), publié sur GitHub sous forme de **marketplace** : tu l'installes une fois, et tous les styles sont disponibles.

---

## 2. Installer (une seule fois)

Dans Claude Code, tape :

```
/plugin marketplace add Ylian967/kobo-design-skills
/plugin install kobo-design@kobo
```

Puis redémarre la session (ou tape `/reload-plugins`).

Pour vérifier : `/plugin` → onglet **Installed** → `kobo-design` doit apparaître avec la liste de ses skills.

> En local, sans passer par GitHub : `claude --plugin-dir ~/Desktop/kobo-design-skills/plugins/kobo-design`

---

## 3. Utiliser un style pour ton app

### Façon la plus simple : le demander en français

Claude Code choisit le skill tout seul si ta demande correspond à sa description :

```
Refais l'écran d'accueil de mon app dans le style « Anime X Slash ».
```
```
Je veux une landing page de jeu gacha façon Cosmic Voyage, en React.
```

### Façon la plus sûre : l'appeler par son nom

```
/kobo-design:anime-x-slash crée la page de classement des personnages de mon app
```

Le préfixe `kobo-design:` est le nom du plugin, la suite est le nom du skill (liste complète dans le README, ou via `/kobo-design:catalogue`).

### Tu ne sais pas lequel choisir ?

```
/kobo-design:catalogue je veux un site sombre et élégant pour un jeu
```

Le skill **catalogue** liste tous les styles, avec le site qui les a inspirés, et propose les plus adaptés à ta demande.

### Pour une app React Native / Expo

Précise-le dans ta demande. Chaque skill a une section « Adaptation React / React Native » que Claude Code suivra (équivalents des effets CSS, librairies Expo à installer, polices).

```
/kobo-design:hyper-lime-street applique ce style à mon app Expo (todo-list), écran par écran, en commençant par l'écran principal.
```

### Conseils pour un bon résultat

- **Un style par projet.** Mélanger deux skills donne un résultat moyen.
- **Commence par les tokens.** Demande d'abord : « installe les tokens du skill dans mon projet » (couleurs, polices, espacements), puis construis les écrans.
- **Montre la démo.** Tu peux dire : « inspire-toi de `examples/demo.html` du skill pour la structure ».
- **Les images et la 3D.** Chaque skill a un fichier `references/assets.md` : quel type de photo ou de rendu utiliser, avec quel cadrage et quel traitement (noir et blanc, duotone…), où les trouver (tes images, Unsplash, Pexels, génération IA avec un prompt prêt à l'emploi) et, pour les styles 3D, comment monter la scène (Three.js, React Three Fiber, modèles `.glb`). Les démos utilisent des photos Unsplash libres : remplace-les par les tiennes aux emplacements `data-slot`.

---

## 4. Ce qu'il y a dans chaque skill

```
plugins/kobo-design/skills/<style>/
├── SKILL.md              ← l'essentiel : idée, règles, typo, signature, à éviter
├── source.md             ← site de référence, ce qui a été mesuré ou seulement observé
├── references/
│   ├── tokens.css        ← variables CSS (couleurs, polices, espaces, durées)
│   ├── components.md     ← boutons, cartes, menus, champs… avec code
│   ├── layouts.md        ← structure des pages + version mobile
│   ├── motion.md         ← animations et version « mouvement réduit »
│   └── assets.md         ← images et 3D : sujets, traitements, sources, recette 3D
└── examples/
    └── demo.html         ← page d'exemple à ouvrir dans le navigateur
```

**Pour voir un style** : ouvre son `examples/demo.html` dans ton navigateur (double-clic), ou la galerie `docs/index.html`.

**À savoir** : les démos chargent les polices depuis Google Fonts ; hors connexion, elles s'affichent avec des polices de remplacement.

---

## 5. Gérer les skills

| Je veux… | Commande / action |
|---|---|
| Voir les skills installés | `/plugin` → Installed → kobo-design |
| Mettre à jour après un changement sur GitHub | `/plugin marketplace update kobo` puis `/reload-plugins` |
| Désactiver le plugin un moment | `/plugin` → kobo-design → Disable |
| Le désinstaller | `/plugin uninstall kobo-design@kobo` |
| Tester une modification locale sans publier | `claude --plugin-dir ./plugins/kobo-design` |
| Vérifier qu'un skill est valide | `python3 tools/check.py <style>` |
| Vérifier tout le dépôt | `python3 tools/check.py` puis `claude plugin validate .` |
| Regénérer la galerie | `python3 tools/build_gallery.py` |

### Modifier un style

1. Ouvre le dossier du skill.
2. Change les valeurs dans `references/tokens.css` (une couleur, une police…).
3. Reporte le changement dans `examples/demo.html` (le bloc `:root` en haut est une copie des tokens).
4. Lance `python3 tools/check.py <style>` : il vérifie les contrastes et les fichiers.
5. Commit + push ; les autres mettent à jour avec `/plugin marketplace update kobo`.

### Ajouter un nouveau style à partir d'un site

> Guide complet, avec les règles et des demandes prêtes à copier : [CREER-UN-SKILL.md](CREER-UN-SKILL.md).

Dans Claude Code :

```
/kobo-design:site-to-skill https://le-site-qui-te-plait.com — j'aime surtout les animations et la typo
```

Le skill `site-to-skill` décrit toute la méthode : mesurer le site dans le navigateur avec `extract-design.js`, écrire les fichiers à partir du gabarit `templates/skill/`, construire la démo, la comparer au site, vérifier.

### Renommer ou supprimer un style

- Renommer : renommer le dossier **et** le champ `name:` dans son `SKILL.md` (ils doivent être identiques), puis mettre à jour le catalogue.
- Supprimer : supprimer le dossier et sa ligne dans `plugins/kobo-design/skills/catalogue/SKILL.md` et dans le README.

---

## 6. Problèmes fréquents

| Problème | Solution |
|---|---|
| Claude Code n'utilise pas le skill | L'appeler par son nom : `/kobo-design:<style>` |
| `/kobo-design:…` est inconnu | Plugin pas installé ou pas rechargé : `/plugin` puis `/reload-plugins` |
| Les couleurs ne correspondent pas | Vérifier que les tokens ont été copiés tels quels dans le projet |
| Les photos ou la 3D ne s'affichent pas | Les démos chargent les photos (Unsplash) et Three.js depuis Internet : vérifier la connexion ; hors ligne, une couleur de repli s'affiche |
| Une police ne s'affiche pas | Vérifier le lien Google Fonts du skill, ou installer le paquet `@expo-google-fonts/…` en React Native |
| `check.py` signale un contraste | Ajuster la couleur dans `tokens.css` jusqu'à repasser au-dessus de 4,5:1 |

---

## 7. Droits et bon usage

Les skills reprennent **un langage visuel** (proportions, rythme, traitements), **jamais une identité** : aucun logo, personnage, illustration, texte ou police propriétaire des sites de référence n'est inclus, et les démos utilisent des noms inventés. Garde la même règle quand tu construis avec : tes propres images, tes propres noms.
