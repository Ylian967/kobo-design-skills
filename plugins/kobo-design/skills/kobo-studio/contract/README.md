# Le contrat de rôles kobo-studio

Le contrat est la couche commune entre les 23 skills de style et la future bibliothèque de composants. Un composant partagé ne connaît aucun skill : il lit des **rôles** (`--k-bg`, `--k-accent`, `--k-radius`…). Une **fiche de correspondance** dit, pour un skill donné, quelle variable tient quel rôle.

Aucun skill n'est modifié : la fiche importe son `tokens.css` et le traduit.

## Les fichiers

| Fichier | Rôle |
|---|---|
| `roles.css` | La liste définitive des rôles, une ligne de commentaire par rôle, une valeur neutre par défaut, l'échelle d'espacement du socle, les interrupteurs d'intensité. |
| `maps/<id>.css` | Une fiche par skill (23). |
| `brand.css` | Modèle de surcouche pour les couleurs d'un client. Pas encore utilisé. |
| `preview.html` | Page de test : les mêmes éléments sous chaque skill, dessinés avec les seuls rôles. |
| `../tools/check_contract.py` | Vérifie les fiches : rôles manquants, variables inexistantes, contrastes, drapeau d'accent. |
| `../tools/gen_maps.py` | Crée ou régénère une fiche ; conserve les lignes marquées `[main]`. |

Ordre de chargement dans une page : `roles.css` → `maps/<id>.css` → `brand.css` (facultatif). Une fiche importe déjà `roles.css`, les polices et le `tokens.css` du skill : charger la fiche seule suffit.

**Un seul skill par page.** Les `tokens.css` déclarent tous leurs variables sur `:root` avec des noms qui se recoupent (`--ink`, `--line`, `--ease`…) : charger deux fiches à la fois les mélangerait.

## Les rôles

62 rôles déclarés par chaque fiche, plus 10 pas d'espacement, `--k-hit-min` et `--k-fs-min`, fournis par le socle.

| Famille | Rôles |
|---|---|
| Surfaces (6) | `bg`, `surface`, `surface-2`, `overlay`, `scrim`, `bg-inverse` |
| Texte (5) | `text`, `text-2`, `text-muted`, `on-accent`, `text-inverse` |
| Accent et états (10) | `accent`, `accent-edge`, `accent-on-bg`, `accent-2`, `success`, `warning`, `danger`, `focus`, `focus-w`, `focus-offset` |
| Filets (2) | `line`, `line-strong` |
| Typo (18) | `font-display`, `font-body`, `font-mono`, `fs-hero`, `fs-h1`, `fs-h2`, `fs-h3`, `fs-body`, `fs-small`, `fs-label`, `lh-tight`, `lh-body`, `ls-display`, `ls-caps`, `fw-display`, `btn-case`, `btn-tracking`, `label-case` ; socle : `fs-min` |
| Formes et images (8) | `radius`, `radius-lg`, `radius-pill`, `border-w`, `cut`, `angle`, `shadow`, `img-filter` |
| Espace (5 + socle) | `edge`, `container`, `section-y`, `control-h`, `nav-h` ; socle : échelle `space-1, 2, 3, 4, 6, 8, 12, 16, 24, 32` et `hit-min` |
| Mouvement (8) | `ease-out`, `ease-in-out`, `ease-spring`, `dur-fast`, `dur-base`, `dur-slow`, `dur-toast`, `dur-exit` |

Ce que chaque rôle fait et sur quoi il se pose est écrit à côté de sa déclaration dans `roles.css`.

Points à connaître :

- **L'échelle `--k-space-*` appartient au socle**, pas aux skills : base 4px, mêmes valeurs partout. Une fiche ne la redéfinit pas. Le skill n'apporte que `--k-edge`, `--k-container`, `--k-section-y`, `--k-control-h` et `--k-nav-h`.
- **L'accent peut être neutre.** Dans 6 skills, l'action principale est noire ou blanche (`alpine-glass-expedition`, `chrome-atelier`, `glacial-mono-3d`, `glass-frame-estate`, `lore-frame-editorial`, `pocket-device-noir`) : `--k-accent` y vaut une encre ou un blanc, et la couleur vive du skill passe en `--k-accent-2`.
- **`--k-accent-edge`** et **`--k-accent-on-bg`** : voir « La règle de l'accent pâle » ci-dessous.
- **`--k-control-h`** est la hauteur *affichée* d'un bouton ou d'un champ, reprise du skill, même sous 44px. **`--k-hit-min`** (44px, socle) est le côté minimal de la zone cliquable : voir « Les cibles tactiles ».
- **`--k-bg-inverse` / `--k-text-inverse`** : la paire pour un bloc en ton inversé. Un composant posé dans un tel bloc lit cette paire, pas `--k-surface`.
- **`--k-overlay`** est le fond d'une modale ; **`--k-scrim`** est le voile sous un texte posé sur une image. Ne pas les confondre.
- **`--k-fs-hero ≥ --k-fs-h1 ≥ --k-fs-h2 ≥ --k-fs-h3 ≥ --k-fs-body ≥ --k-fs-small`** : l'ordre est garanti dans les 23 fiches (vérifié dans le navigateur à 1440px). Les mots géants des skills (mot-marque de 34vw, nom géant du pied) ne sont pas des tailles de titre : ils restent en signature.
- **`--k-btn-case` et `--k-btn-tracking`** : casse et approche des libellés d'action (boutons, liens de nav, onglets). **`--k-label-case`** : casse des surtitres et des étiquettes.
- **`--k-img-filter`** : le traitement des photos de contenu. Un filtre CSS ne suffit pas toujours : quand le skill exige un canvas, des couches ou un grain, la fiche garde la meilleure approximation et **le dit en commentaire**.
- **`--k-fs-min`** (12px, socle) : plancher de lisibilité. Un composant écrit `font-size: max(var(--k-fs-small), var(--k-fs-min))` pour tout texte qui porte une information (aide, erreur, bouton, champ, notification, onglet, lien de nav). Un surtitre purement décoratif peut rester à la taille du skill, même plus petite.
- **`--k-dur-toast` et `--k-dur-exit`** : temps d'affichage d'une notification et durée de sa sortie ; le script les lit.
- **`--k-shadow` vaut `none`** sauf dans les 3 skills à ombre dure. Aucun composant partagé n'ajoute d'ombre de lui-même.

## La règle de l'accent pâle

Dans 7 skills, l'accent n'atteint pas 3:1 sur le fond : `hyper-lime-street`, `mint-street-basics`, `pixel-lime-portfolio`, `serif-bistro-green`, `sticker-brutal-jp`, `tiny-planet-toy`, `zigzag-snack-pop`. L'assombrir les rendrait méconnaissables. Leur fiche déclare donc deux choses :

- `--k-accent-edge` : une couleur du skill qui atteint 3:1 sur le fond. Tout aplat d'accent est cerné de ce contour. Un composant partagé écrit **toujours** `border: var(--k-border-w) solid var(--k-accent-edge)` autour d'un aplat d'accent (dans les 16 autres skills, le contour vaut l'accent et ne se voit pas).
- `--k-accent-on-bg: 0` : le drapeau lu par les composants. Il vaut `1` dans les 16 autres skills.

Quand `--k-accent-on-bg` vaut `0`, **l'accent ne porte jamais seul une information sur `--k-bg`** :

- pas de texte ni de lien en accent ;
- pas d'icône ni de filet fin en accent ;
- pas d'état actif, sélectionné ou courant signalé uniquement par l'accent.

L'accent reste permis en aplat cerné (bouton, étiquette, pastille) avec `--k-on-accent` par-dessus, et sur `--k-bg-inverse` si le composant vérifie ce contraste lui-même.

Recette pour un composant, sans condition ni JavaScript :

```css
/* texte, icône ou filet « en accent » : l'accent si le drapeau vaut 1, sinon la couleur du texte */
color: color-mix(in srgb, var(--k-accent) calc(var(--k-accent-on-bg) * 100%), var(--k-text));

/* état actif : toujours un second signe (graisse, soulignement, filet --k-line-strong), jamais la couleur seule */
```

`preview.html` montre la recette sur un lien ; `check_contract.py` refuse une fiche dont le drapeau ne correspond pas au contraste mesuré.

## Les cibles tactiles

Le contrat n'impose pas 44px de hauteur visible : `pixel-lime-portfolio` a des boutons de 26px, et c'est son style. `--k-control-h` garde la hauteur du skill ; `--k-hit-min` (44px) agrandit la zone cliquable autour, sans rien changer à l'affichage :

```css
.bouton { position: relative; min-height: var(--k-control-h); }
.bouton::after {
  content: ""; position: absolute; top: 50%; left: 50%;
  width: max(100%, var(--k-hit-min)); height: max(100%, var(--k-hit-min));
  transform: translate(-50%, -50%);
}
```

`--k-hit-min` appartient au socle, comme l'échelle d'espacement : une fiche ne le déclare pas. Deux cibles voisines doivent rester assez écartées pour que leurs zones agrandies ne se recouvrent pas (au moins `--k-space-2` entre deux petits boutons).

## Lire une fiche

Une fiche a quatre parties.

**1. L'en-tête** (commentaire) : le nom du skill, le décompte des rôles (liens directs, dérivations, valeurs relevées dans la démo, replis), les URL Google Fonts, et la liste des `--k-sig-*`.

**2. Les imports** : polices, `roles.css`, puis le `tokens.css` du skill par chemin relatif (`../../../<id>/references/tokens.css`).

**3. Le bloc `:root`** : les 62 rôles, dans l'ordre de `roles.css`. Chaque ligne est d'un de ces quatre types, reconnaissable à son commentaire :

| Forme | Sens |
|---|---|
| `--k-bg: var(--paper);` | **Lien direct** : une variable du skill tient ce rôle. Un commentaire peut préciser pourquoi. |
| `--k-danger: #d22d2d; /* dérivé … 5.06:1 sur --k-bg */` | **Dérivé** : le skill n'a pas cette valeur. Elle est calculée à partir de ses couleurs, et le commentaire dit d'où elle vient et quel contraste elle atteint. |
| `--k-focus-offset: 3px; /* relevé dans la démo */` | **Relevé** : la valeur existe dans `examples/demo.html` du skill, mais pas dans ses tokens. |
| `--k-lh-body: 1.5; /* repli */` | **Repli** : le skill ne dit rien ; valeur neutre du contrat. |

Un commentaire qui commence par **`[main]`** signale une ligne décidée à la main : `gen_maps.py` la recopie telle quelle à chaque régénération (15 à 31 lignes par fiche). Les lignes sans marqueur sont celles que le script retrouve seul.

Puis viennent les `--k-sig-*` : toutes les variables du skill qui ne tiennent aucun rôle, sous leur nom d'origine préfixé.

**4. Les deux blocs d'intensité** en fin de fiche.

### Comment les couleurs d'état sont dérivées

`--k-success`, `--k-warning`, `--k-danger` et parfois `--k-text-muted` n'existent presque jamais dans les skills. Règle suivie, dans cet ordre :

1. Si le skill a une couleur de la bonne teinte et qu'elle atteint 4.5:1 sur `--k-bg`, `--k-surface` et `--k-surface-2`, elle est reprise telle quelle (`var(--…)`, commentaire « repris de »).
2. Si elle a la bonne teinte mais pas le contraste, on garde sa teinte et sa saturation et on ajuste la clarté jusqu'à 4.6:1 sur les trois fonds (commentaire « dérivé de --x (ancien rapport) »).
3. Sinon on part d'une teinte de principe (vert 150°, ambre 40°, rouge 0°), avec la saturation de l'accent du skill, et on ajuste la clarté. Un skill sans couleur reçoit des états peu saturés.

Il n'y a donc pas de vert ni de rouge standard : chaque fiche a les siens.

### La règle des `--k-sig-*`

**Un composant partagé ne lit jamais un `--k-sig-*`.** Seuls les composants de signature d'un skill (le cadre de `lore-frame-editorial`, les crochets de `acid-scan-security`…) le font. C'est ce qui empêche la signature de se diluer dans des composants génériques, et ce qui permet de la couper d'un seul réglage.

## L'intensité de la signature

Un attribut sur `<html>`, ou sur n'importe quel élément parent (il vaut alors pour sa descendance) :

```html
<html data-k-intensity="full">     <!-- ou "reduced", ou "off" -->
```

| Valeur | Effet |
|---|---|
| `full` (ou absent) | Tout le skill. |
| `reduced` | Ornements gardés, mouvements de signature coupés. |
| `off` | Couleurs, typo et formes gardées ; ornements **et** mouvements de signature coupés. Reste une interface sobre aux couleurs du skill. |

Le réglage vit dans le contrat et dans la fiche, jamais dans le skill. Trois mécanismes, du plus général au plus précis :

1. **Deux interrupteurs** dans `roles.css` : `--k-sig` (1 ou 0) et `--k-sig-motion` (1 ou 0). Un composant de signature peut s'en servir dans un calcul, par exemple `opacity: var(--k-sig)` ou `animation-duration: calc(var(--k-sig-dur-scan) * var(--k-sig-motion))`.
2. **Un attribut de balisage** : tout ornement de signature porte `data-k-sig` ; s'il bouge, `data-k-sig="motion"`. En `off`, `roles.css` masque les premiers ; en `reduced` et `off`, il arrête l'animation des seconds.
3. **Les blocs de la fiche** : `:root[data-k-intensity="reduced"]` et `:root[data-k-intensity="off"]` remettent à `0s` les durées de signature du skill (`--k-sig-dur-*`, `--k-sig-spin-*`…).

Les variantes de signature des composants (`components/signatures/`) se branchent sur ces interrupteurs : voir `components/signatures/README.md`. On resserre l'intensité en descendant dans la page (`full` → `reduced` → `off`) ; un bloc `full` placé dans un parent `off` ne retrouve pas les durées de signature remises à zéro.

Les rôles ordinaires ne changent pas avec l'intensité : `--k-angle`, `--k-cut`, `--k-shadow` et `--k-radius` sont des formes, et les formes sont gardées.

## Les couleurs de marque d'un client

Prévu, pas encore utilisé. Le modèle est `brand.css` :

```html
<html data-k-brand>
<link rel="stylesheet" href="contract/maps/<id>.css">
<link rel="stylesheet" href="brand.css">   <!-- en dernier -->
```

- **Niveau 1** : la marque remplace `--k-accent`, avec `--k-on-accent`, `--k-accent-edge` et `--k-accent-2`. C'est le cas courant.
- **Niveau 2** : la marque remplace aussi les surfaces et le texte. Les couleurs d'état doivent alors être recalculées sur le nouveau fond.

La surcouche ne redéfinit que des rôles `--k-*`, jamais une variable du skill ni un `--k-sig-*` : la signature du skill garde ses propres couleurs. Les contrastes à tenir sont rappelés en tête de `brand.css`. Le vérificateur ne lit pas encore les surcouches : c'est à écrire quand la première marque arrivera.

## Écrire une fiche pour un nouveau skill

Pour un skill ajouté à la main ou produit par `site-to-skill`.

1. **Générer un premier jet** : `python3 tools/gen_maps.py <id>`. Le script devine d'après les noms de variables ; il se trompe sur les skills aux noms inhabituels, et ne sait rien de ce qui n'est écrit que dans la démo. Tout ce qui suit est une relecture, ligne à ligne. **Chaque ligne corrigée reçoit `[main]` au début de son commentaire**, sinon la prochaine régénération l'écrasera (ou lancer `gen_maps.py --adopt <id>` après coup : il marque toute ligne qui diffère de sa propre proposition).
2. **Relier les rôles**, famille par famille, en lisant `references/tokens.css` :
   - d'abord `--k-bg` et `--k-text` : le fond dominant et le texte qui s'y lit ;
   - `--k-surface` et `--k-surface-2` doivent rester lisibles avec `--k-text`. Une surface de ton opposé va dans `--k-bg-inverse` ;
   - `--k-accent` est la couleur de l'action principale telle que le skill la dessine. Si c'est un noir ou un blanc, l'accent est neutre ;
   - si l'accent n'atteint pas 3:1 sur le fond, donner à `--k-accent-edge` une couleur sombre (ou claire) du skill ; le script met alors `--k-accent-on-bg` à 0 ;
   - les tailles : respecter l'ordre `hero ≥ h1 ≥ h2 ≥ h3 ≥ body ≥ small`. Un mot géant décoratif n'est pas un titre.
3. **Dériver ce qui manque** en suivant la règle des couleurs d'état ci-dessus. Toute valeur calculée porte un commentaire qui commence par « dérivé », avec le rapport de contraste quand c'est une couleur.
4. **Laisser un repli** pour ce que le skill ne dit pas (`/* repli */`). Ne rien inventer : pas d'ombre, pas d'angle, pas de biseau si le skill n'en a pas.
5. **Déclarer les 62 rôles**, même en repli : le vérificateur refuse une fiche incomplète. Ne pas redéclarer `--k-space-*` ni `--k-hit-min`, ni `--k-fs-min`.
6. **Lister la signature** : toute variable du skill restée sans rôle devient `--k-sig-<nom> : var(--<nom>)`, et son nom va dans l'en-tête.
7. **Écrire les deux blocs d'intensité** : y remettre à `0s` chaque `--k-sig-*` qui est une durée.
8. **Vérifier** :

```bash
python3 plugins/kobo-design/skills/kobo-studio/tools/check_contract.py <id>
```

   Si une paire échoue, on corrige la **dérivation dans la fiche**, jamais le skill.

9. **Regarder** : ajouter l'identifiant et sa liste de signature à l'objet `DATA` de `preview.html`, ouvrir la page et contrôler que le skill reste reconnaissable et que rien n'est illisible.

Pour `site-to-skill` : cette fiche devient une étape de plus après « Écrire le skill » (étape 5) et avant « Prouver » (étape 6). La méthode n'a pas encore été modifiée ; c'est à faire quand kobo-studio aura son `SKILL.md`.

## Le vérificateur

```bash
python3 tools/check_contract.py            # toutes les fiches
python3 tools/check_contract.py <id> …     # certaines fiches
python3 tools/check_contract.py --json     # résultats en JSON
```

Il contrôle, pour chaque fiche :

- les rôles de `roles.css` non déclarés ;
- les `var(--…)` qui appellent une variable absente du `tokens.css` du skill ;
- vingt-deux paires de contraste :

| Paire | Seuil |
|---|---|
| `text`, `text-2`, `text-muted`, chacun sur `bg`, `surface` et `surface-2` | 4.5:1 |
| `success`, `warning`, `danger`, chacun sur `bg`, `surface` et `surface-2` | 4.5:1 |
| `on-accent` / `accent` | 4.5:1 |
| `text-inverse` / `bg-inverse` | 4.5:1 |
| `accent` / `bg`, `focus` / `bg` | 3:1 |

- le drapeau `--k-accent-on-bg` : il doit valoir `1` si l'accent atteint 3:1 sur le fond, `0` sinon. Quand il vaut `0`, c'est `--k-accent-edge` qui est mesuré à la place de l'accent (la ligne de sortie le dit), et il doit être différent de l'accent.

Code de sortie 1 si une fiche a une erreur.

## Le générateur

```bash
python3 tools/gen_maps.py <id> …      # crée ou régénère ces fiches
python3 tools/gen_maps.py --all       # régénère toutes les fiches
python3 tools/gen_maps.py --check     # n'écrit rien ; dit quelles fiches changeraient
python3 tools/gen_maps.py --adopt     # marque [main] toute ligne qui diffère de la proposition du script
```

Il relie les rôles d'après les noms de variables, met les replis, dérive les couleurs d'état et le texte discret sur les trois fonds, calcule le drapeau d'accent, liste la signature et écrit les blocs d'intensité. Il **recopie sans y toucher** toute ligne marquée `[main]`. Sur les 23 fiches actuelles, `--check` ne signale aucun changement : les relancer ne modifie rien.

Une ligne `[main]` qui contient une couleur écrite (`#…`) n'est pas recalculée si le skill change ses tokens : c'est `check_contract.py` qui le signalera.

Le script comprend les couleurs hexadécimales, `rgb()` avec transparence, `color-mix(in srgb, …)` et les chaînes de `var()`. Une couleur transparente est posée sur `--k-bg` avant la mesure. Il ne sait pas calculer une taille (`clamp()`, `vw`) : l'ordre des tailles se contrôle dans `preview.html`.

## La page de test

`preview.html` affiche, pour le skill et l'intensité choisis : le nuancier des rôles, l'échelle typo, un bouton dans ses états, un champ avec erreur, une carte et un bloc inversé, trois notifications, un ornement de signature témoin, et le tableau des contrastes mesurés par le navigateur.

Elle n'utilise que des rôles `--k-*` : aucune couleur ni dimension écrite en dur.

Elle s'ouvre directement depuis le disque (`file://`) : vérifié dans Chrome sur les 23 skills. Une connexion est nécessaire pour les polices Google ; sans elle, la page s'affiche avec les polices de repli. Pour la servir malgré tout :

```bash
cd plugins/kobo-design/skills && python3 -m http.server 5190
# puis http://localhost:5190/kobo-studio/contract/preview.html#lore-frame-editorial
```

L'adresse accepte `#<id>` et `#<id>:<intensité>`.

## Ce qui n'est pas couvert

- Les fiches ne sont pas générées à la volée : si un skill change ses tokens, sa fiche doit être relue et le vérificateur relancé.
- Le vérificateur ne mesure pas les couleurs d'état ni le texte secondaire sur `--k-bg-inverse`.
- Sur trois fonds à la fois, certaines couleurs d'état deviennent très claires ou très sombres et se distinguent mal entre elles (`serif-bistro-green`, `tiny-planet-toy`, `heritage-lens`) : un état ne doit jamais être signalé par la couleur seule, toujours avec une icône ou un mot.
- `gen_maps.py` ne met pas à jour l'objet `DATA` de `preview.html` : c'est à faire à la main pour un nouveau skill.
- `--k-fw-display` de `cosmic-voyage` est supposé (700), non vérifié titre par titre.
