# Synthèse de l'audit — étape 1 de kobo-studio

> Audit en lecture seule des skills de style de `plugins/kobo-design/skills/`. Aucun fichier existant n'a été modifié.
> Détail par skill : un fichier `<id>.md` dans ce dossier.

## Périmètre réel : 23 skills, pas 26

Le dépôt contient **25 dossiers** : 23 skills de style + `catalogue` + `site-to-skill`. La consigne en annonçait 26. Les trois skills manquants ont été retirés par deux commits antérieurs :

- `0ce6f78` — retrait de `arena-guide` et `bubble-publisher-hub` ;
- `55d24b3` — retrait de `epic-jrpg-product`.

Ils existent encore dans le plugin installé sur la machine (qui liste 26 styles), mais plus dans le dépôt. Le `catalogue` du dépôt annonce bien 23 styles. L'audit porte donc sur 23 skills.

## Méthode et limites

- Tokens : toutes les variables de `references/tokens.css` ont été extraites par script (1 298 variables au total), puis rangées à la main dans les 36 rôles du contrat.
- Composants et états : détection automatique dans `examples/demo.html` (sélecteurs CSS, pseudo-classes, attributs ARIA, écouteurs d'événements), puis relecture. **Aucune démo n'a été ouverte dans un navigateur ni capturée** : les états sont ceux écrits dans le code, pas ceux constatés à l'écran.
- Contrastes : repris de `tools/check.py` (exécuté en lecture seule, 25/25 valides). Seules les paires déclarées par chaque skill sont vérifiées ; les paires non déclarées ne le sont pas.
- Signature : tirée des sections « L'idée », « Règles prioritaires » et « Signature » de chaque `SKILL.md`.
- Les fichiers `components.md`, `layouts.md`, `motion.md` et `assets.md` n'ont pas été lus en entier : un composant décrit dans `components.md` mais absent de la démo n'apparaît pas dans ce relevé.

## 1. Tableau skill × rôles

● rempli (un token du skill tient ce rôle) · ◐ dérivable (la valeur existe sous un autre nom, ou se déduit) · ○ absent

### Surfaces et texte

| Skill | bg | surf | surf-2 | overlay | text | text-2 | muted | on-acc |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| acid-scan-security | ● | ● | ● | ● | ● | ● | ● | ● |
| alpine-glass-expedition | ● | ◐ | ◐ | ○ | ● | ● | ● | ◐ |
| anime-x-slash | ● | ● | ◐ | ● | ● | ◐ | ● | ● |
| chrome-atelier | ● | ● | ● | ● | ● | ● | ◐ | ◐ |
| cosmic-voyage | ● | ● | ● | ● | ● | ● | ● | ● |
| glacial-mono-3d | ● | ◐ | ◐ | ● | ● | ◐ | ● | ◐ |
| glass-frame-estate | ● | ● | ● | ● | ● | ○ | ● | ◐ |
| heritage-lens | ● | ◐ | ◐ | ● | ● | ● | ◐ | ◐ |
| hold-to-play-music | ● | ● | ○ | ● | ● | ● | ● | ◐ |
| hyper-lime-street | ● | ● | ◐ | ● | ● | ○ | ● | ● |
| lore-frame-editorial | ● | ● | ◐ | ● | ● | ○ | ● | ◐ |
| mint-street-basics | ● | ● | ● | ○ | ● | ● | ● | ◐ |
| nocturne-architecture | ● | ● | ◐ | ● | ● | ● | ● | ● |
| noir-inferno-chapters | ● | ● | ◐ | ● | ● | ● | ◐ | ○ |
| pixel-lime-portfolio | ● | ● | ● | ● | ● | ○ | ● | ◐ |
| pocket-device-noir | ● | ● | ● | ● | ● | ● | ◐ | ◐ |
| retro-mission-poster | ● | ◐ | ○ | ● | ● | ● | ○ | ◐ |
| serif-bistro-green | ● | ● | ● | ◐ | ● | ● | ○ | ◐ |
| showroom-bento | ● | ● | ● | ○ | ● | ○ | ● | ◐ |
| signal-orange-techwear | ● | ● | ● | ● | ● | ○ | ● | ● |
| sticker-brutal-jp | ● | ● | ● | ○ | ● | ● | ○ | ◐ |
| tiny-planet-toy | ● | ● | ● | ○ | ● | ● | ○ | ◐ |
| zigzag-snack-pop | ● | ● | ● | ◐ | ● | ● | ○ | ◐ |
| **Total ● / ◐ / ○** | 23/0/0 | 19/4/0 | 13/8/2 | 16/2/5 | 23/0/0 | 15/2/6 | 14/4/5 | 6/16/1 |

### Accent, états et filets

| Skill | acc | acc-2 | success | warning | danger | focus | line | line-str |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| acid-scan-security | ● | ◐ | ○ | ○ | ○ | ◐ | ● | ● |
| alpine-glass-expedition | ◐ | ◐ | ○ | ○ | ● | ◐ | ● | ○ |
| anime-x-slash | ● | ◐ | ○ | ○ | ○ | ◐ | ● | ◐ |
| chrome-atelier | ◐ | ◐ | ○ | ○ | ◐ | ◐ | ● | ◐ |
| cosmic-voyage | ● | ● | ○ | ○ | ◐ | ◐ | ● | ● |
| glacial-mono-3d | ○ | ○ | ○ | ○ | ○ | ◐ | ● | ○ |
| glass-frame-estate | ◐ | ○ | ○ | ○ | ○ | ◐ | ● | ◐ |
| heritage-lens | ● | ◐ | ○ | ○ | ○ | ◐ | ● | ◐ |
| hold-to-play-music | ● | ● | ○ | ○ | ○ | ◐ | ◐ | ○ |
| hyper-lime-street | ● | ● | ○ | ○ | ○ | ◐ | ○ | ○ |
| lore-frame-editorial | ● | ● | ○ | ○ | ○ | ◐ | ● | ○ |
| mint-street-basics | ● | ● | ◐ | ◐ | ○ | ◐ | ● | ○ |
| nocturne-architecture | ● | ● | ○ | ○ | ○ | ◐ | ● | ○ |
| noir-inferno-chapters | ● | ○ | ○ | ○ | ○ | ◐ | ● | ◐ |
| pixel-lime-portfolio | ● | ● | ○ | ○ | ○ | ◐ | ● | ◐ |
| pocket-device-noir | ● | ○ | ○ | ○ | ○ | ◐ | ● | ● |
| retro-mission-poster | ● | ● | ○ | ○ | ○ | ◐ | ◐ | ○ |
| serif-bistro-green | ● | ● | ○ | ○ | ○ | ◐ | ● | ◐ |
| showroom-bento | ● | ● | ○ | ○ | ○ | ◐ | ● | ○ |
| signal-orange-techwear | ● | ● | ○ | ○ | ○ | ◐ | ● | ● |
| sticker-brutal-jp | ● | ● | ◐ | ○ | ● | ● | ◐ | ◐ |
| tiny-planet-toy | ● | ● | ◐ | ◐ | ◐ | ◐ | ◐ | ◐ |
| zigzag-snack-pop | ● | ● | ◐ | ○ | ○ | ◐ | ○ | ○ |
| **Total ● / ◐ / ○** | 19/3/1 | 14/5/4 | 0/4/19 | 0/2/21 | 2/3/18 | 1/22/0 | 17/4/2 | 4/9/10 |

### Typo

| Skill | f-display | f-body | f-mono | fs-hero | fs-h1 | fs-h2 | fs-body | fs-small |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| acid-scan-security | ● | ● | ● | ● | ◐ | ● | ◐ | ● |
| alpine-glass-expedition | ● | ● | ○ | ● | ◐ | ● | ◐ | ● |
| anime-x-slash | ● | ● | ○ | ◐ | ● | ◐ | ● | ● |
| chrome-atelier | ● | ◐ | ● | ● | ○ | ● | ● | ● |
| cosmic-voyage | ● | ● | ○ | ● | ◐ | ● | ● | ● |
| glacial-mono-3d | ● | ◐ | ● | ◐ | ○ | ○ | ● | ● |
| glass-frame-estate | ◐ | ● | ● | ● | ● | ● | ● | ● |
| heritage-lens | ● | ● | ○ | ● | ● | ◐ | ● | ● |
| hold-to-play-music | ● | ● | ● | ● | ◐ | ◐ | ● | ● |
| hyper-lime-street | ● | ● | ○ | ◐ | ● | ◐ | ● | ◐ |
| lore-frame-editorial | ● | ◐ | ● | ● | ● | ◐ | ● | ● |
| mint-street-basics | ● | ● | ○ | ● | ◐ | ● | ● | ● |
| nocturne-architecture | ● | ● | ○ | ● | ◐ | ● | ● | ● |
| noir-inferno-chapters | ● | ● | ○ | ● | ◐ | ◐ | ● | ● |
| pixel-lime-portfolio | ◐ | ● | ● | ● | ● | ● | ● | ● |
| pocket-device-noir | ◐ | ● | ● | ● | ◐ | ● | ● | ● |
| retro-mission-poster | ● | ● | ○ | ● | ● | ◐ | ● | ● |
| serif-bistro-green | ● | ● | ○ | ● | ◐ | ● | ● | ● |
| showroom-bento | ◐ | ● | ○ | ● | ◐ | ◐ | ● | ● |
| signal-orange-techwear | ● | ● | ○ | ● | ○ | ◐ | ● | ● |
| sticker-brutal-jp | ● | ● | ○ | ○ | ● | ● | ● | ● |
| tiny-planet-toy | ● | ● | ◐ | ● | ○ | ● | ● | ● |
| zigzag-snack-pop | ● | ● | ○ | ● | ◐ | ● | ● | ● |
| **Total ● / ◐ / ○** | 19/4/0 | 20/3/0 | 8/1/14 | 19/3/1 | 8/11/4 | 13/9/1 | 21/2/0 | 22/1/0 |

### Formes, espace et mouvement

| Skill | radius | radius-lg | border-w | cut | space | edge | contain. | ease-out | ease-io | dur-fast | dur-base | dur-slow |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| acid-scan-security | ● | ◐ | ◐ | ◐ | ● | ● | ● | ● | ● | ● | ● | ● |
| alpine-glass-expedition | ◐ | ● | ○ | ◐ | ● | ● | ● | ● | ● | ● | ● | ● |
| anime-x-slash | ◐ | ○ | ● | ◐ | ● | ○ | ● | ● | ◐ | ● | ● | ● |
| chrome-atelier | ◐ | ○ | ● | ◐ | ● | ● | ● | ● | ● | ● | ● | ◐ |
| cosmic-voyage | ● | ● | ○ | ◐ | ● | ○ | ● | ● | ◐ | ● | ● | ● |
| glacial-mono-3d | ◐ | ○ | ● | ◐ | ● | ● | ○ | ● | ○ | ● | ● | ● |
| glass-frame-estate | ● | ● | ○ | ◐ | ◐ | ● | ● | ◐ | ● | ● | ● | ● |
| heritage-lens | ○ | ● | ○ | ◐ | ○ | ● | ◐ | ● | ● | ● | ◐ | ● |
| hold-to-play-music | ○ | ○ | ● | ◐ | ○ | ● | ○ | ● | ● | ● | ● | ● |
| hyper-lime-street | ● | ● | ○ | ● | ○ | ○ | ● | ● | ● | ● | ● | ● |
| lore-frame-editorial | ● | ● | ● | ● | ○ | ● | ○ | ● | ● | ● | ● | ● |
| mint-street-basics | ● | ● | ○ | ◐ | ◐ | ● | ● | ● | ● | ● | ● | ● |
| nocturne-architecture | ● | ● | ○ | ◐ | ◐ | ● | ● | ● | ● | ● | ● | ● |
| noir-inferno-chapters | ○ | ○ | ● | ◐ | ○ | ● | ◐ | ● | ● | ◐ | ● | ● |
| pixel-lime-portfolio | ● | ◐ | ○ | ◐ | ○ | ● | ● | ● | ○ | ● | ● | ● |
| pocket-device-noir | ● | ● | ○ | ◐ | ○ | ● | ● | ● | ○ | ● | ● | ● |
| retro-mission-poster | ● | ○ | ● | ◐ | ○ | ● | ○ | ● | ● | ● | ● | ● |
| serif-bistro-green | ● | ● | ○ | ◐ | ○ | ● | ● | ● | ○ | ● | ● | ● |
| showroom-bento | ● | ● | ○ | ◐ | ◐ | ● | ● | ● | ○ | ● | ● | ● |
| signal-orange-techwear | ● | ○ | ● | ○ | ○ | ● | ● | ● | ○ | ● | ● | ● |
| sticker-brutal-jp | ● | ● | ● | ◐ | ○ | ● | ● | ○ | ● | ○ | ● | ● |
| tiny-planet-toy | ● | ○ | ● | ◐ | ○ | ● | ● | ● | ○ | ● | ● | ● |
| zigzag-snack-pop | ● | ● | ○ | ◐ | ○ | ● | ● | ● | ○ | ● | ● | ● |
| **Total ● / ◐ / ○** | 16/4/3 | 13/2/8 | 10/1/12 | 2/20/1 | 6/4/13 | 20/0/3 | 17/2/4 | 21/1/1 | 13/2/8 | 21/1/1 | 22/1/0 | 22/1/0 |

### Bilan par skill

| Skill | Variables | ● | ◐ | ○ | Variables hors contrat |
|---|--:|--:|--:|--:|--:|
| acid-scan-security | 69 | 26 | 7 | 3 | 27 |
| alpine-glass-expedition | 72 | 20 | 10 | 6 | 34 |
| anime-x-slash | 92 | 20 | 10 | 6 | 47 |
| chrome-atelier | 76 | 21 | 11 | 4 | 41 |
| cosmic-voyage | 90 | 26 | 5 | 5 | 48 |
| glacial-mono-3d | 48 | 16 | 9 | 11 | 20 |
| glass-frame-estate | 69 | 22 | 8 | 6 | 35 |
| heritage-lens | 53 | 18 | 11 | 7 | 22 |
| hold-to-play-music | 46 | 21 | 6 | 9 | 18 |
| hyper-lime-street | 51 | 21 | 5 | 10 | 23 |
| lore-frame-editorial | 57 | 24 | 5 | 7 | 27 |
| mint-street-basics | 60 | 24 | 7 | 5 | 32 |
| nocturne-architecture | 50 | 25 | 5 | 6 | 22 |
| noir-inferno-chapters | 42 | 18 | 9 | 9 | 17 |
| pixel-lime-portfolio | 45 | 23 | 6 | 7 | 22 |
| pocket-device-noir | 55 | 23 | 6 | 7 | 28 |
| retro-mission-poster | 40 | 20 | 6 | 10 | 15 |
| serif-bistro-green | 48 | 22 | 6 | 8 | 19 |
| showroom-bento | 43 | 20 | 7 | 9 | 18 |
| signal-orange-techwear | 47 | 24 | 2 | 10 | 20 |
| sticker-brutal-jp | 49 | 23 | 5 | 8 | 17 |
| tiny-planet-toy | 46 | 21 | 9 | 6 | 20 |
| zigzag-snack-pop | 50 | 21 | 6 | 9 | 24 |

Sur 1 298 variables, **596 ne tiennent aucun rôle du contrat** : 194 couleurs, 165 réglages de typo (tailles supplémentaires, interlignes, approches, graisses), 129 dimensions de composant (hauteur de bouton, de barre, largeur de carte…), 67 réglages de mouvement, 30 de forme, 11 divers.

### Ce que le tableau montre

- **Toujours remplis** : `bg`, `text`, `fs-body`, `fs-small`, `dur-base`, `dur-slow`, `ease-out`, `dur-fast` (21 à 23 skills sur 23).
- **Presque jamais remplis** : `success` (0 rempli, 19 absents), `warning` (0 rempli, 21 absents), `danger` (2 remplis, 18 absents), `focus` (1 seul token dédié : `sticker-brutal-jp`), `line-strong` (4 remplis), `on-accent` (6 remplis, 16 dérivables).
- **`cut`** : 2 skills seulement ont un vrai biseau en token (`lore-frame-editorial` : `--chamfer` ; `hyper-lime-street` : un angle). 20 skills valent 0.
- **`space-1…12`** : 6 skills ont une échelle, aucune ne va de 1 à 12 (les pas réels sont 1, 2, 3, 4, 6, 8, 12, 16, 24, 32). 17 skills n'ont aucune échelle.
- **`font-mono`** : absent de 14 skills ; **`ease-in-out`** : absent de 8 ; **`radius-lg`** : absent de 8.

## 2. Composants communs et leurs noms

| Composant | Skills | Noms rencontrés (nombre de skills) |
|---|--:|---|
| Barre de navigation | 21 | `.nav` (14), `.burger` (7), `.rail` (4), `.nav-links` (4), `.hud` (3), `.bar` (3), `.menu-btn` (2), `.top` (2), `.nav-tools` (2), `.pills` (1) |
| Menu plein écran | 7 | `.menu` (6), `.menu-open` (3), `.menu-close` (1), `.plan` (1) |
| Héros | 21 | `.hero` (17), `.intro` (5), `.stage` (5), `.hero-title` (2), `.hero-copy` (2), `.hero-body` (1), `.hero-back` (1), `.hero-right` (1), `.hero-left` (1), `.hero-row` (1), `.hero-cta` (1) |
| Bouton principal | 21 | `.btn` (11), `.cta` (6), `.pill` (6), `.more` (6), `.cart` (2), `.buy` (2), `.next` (2), `.btn--line` (2), `.btn--s` (2), `.btn-nav` (1), `.pill--light` (1), `.pill--full` (1), `.enter` (1), `.btn-line` (1), `.btn-sign` (1), `.open` (1), `.btn--paper` (1), `.go` (1), `.pill--ink` (1), `.btn--full` (1), `.add` (1), `.brut` (1), `.btn--orange` (1) |
| Bouton rond / icône | 16 | `.round` (6), `.play` (4), `.close` (4), `.social` (4), `.arrow` (2), `.fav` (2), `.arrows` (2), `.orb` (1), `.share` (1), `.to-top` (1), `.sns` (1), `.help-btn` (1), `.sound` (1), `.icon-btn` (1), `.about-btn` (1), `.socials` (1) |
| Onglets / sélecteur | 13 | `.chips` (3), `.lang` (3), `.tab` (3), `.swatches` (2), `.tabs` (2), `.days` (1), `.filters` (1), `.wheel` (1), `.karats` (1), `.thumbs` (1), `.sizes` (1), `.segs` (1), `.swatch` (1) |
| Carte | 18 | `.card` (7), `.cards` (6), `.world` (3), `.cell` (3), `.post` (3), `.posts` (3), `.tile` (2), `.idcard` (1), `.spec-card` (1), `.ncard` (1), `.ccard` (1), `.svc` (1), `.agent-card` (1), `.listing` (1), `.hood` (1), `.agent` (1), `.listings` (1), `.cells` (1), `.feat` (1), `.prod` (1), `.note` (1), `.dish` (1), `.fav-card` (1), `.dishes` (1), `.tile-text` (1), `.tile--acc` (1), `.tile--color` (1), `.tile--wide` (1), `.system` (1), `.look` (1), `.service` (1), `.work-img` (1), `.flavor` (1), `.fuel-card` (1), `.person` (1) |
| Puce / étiquette | 15 | `.tag` (8), `.label` (7), `.chip` (4), `.kicker` (3), `.sticker` (3), `.eyebrow` (1), `.tags` (1), `.badge` (1), `.labels` (1), `.stamp` (1), `.tagpill` (1) |
| Carrousel / pagination | 9 | `.dots` (4), `.deck` (2), `.strip` (2), `.frieze` (1), `.bullets` (1), `.slide` (1), `.nums` (1), `.fav-track` (1), `.track` (1) |
| Accordéon / étapes | 5 | `.step` (3), `.steps` (3), `.faq` (2), `.how` (2), `.route` (1), `.q` (1), `.qa` (1), `.proc` (1) |
| Champ / formulaire | 17 | `.news` (8), `.hint` (7), `.field` (4), `.form` (3), `.sub` (3), `.contact` (3), `.search` (2), `.input` (1), `.wait` (1), `.signup` (1) |
| Panneau / modale | 14 | `.panel` (4), `.veil` (3), `.about` (3), `.sheet` (3), `.editorial` (1), `.glass` (1), `.offer` (1), `.dialog` (1) |
| Chiffres clés | 8 | `.stats` (5), `.stat` (4), `.rating` (2), `.count` (2), `.gauge` (1), `.odo` (1), `.facts` (1) |
| Citation / avis | 6 | `.quote` (3), `.say` (2), `.voice` (1), `.voices` (1), `.quotes` (1), `.quote-s` (1), `.quote-l` (1), `.review` (1) |
| Défilant | 3 | `.ticker` (2), `.marquee` (1) |
| Chargement de page | 9 | `.loader` (7), `.boot` (1), `.loading` (1), `.scr` (1), `.loader-ring` (1), `.loader-pct` (1), `.curtain` (1) |
| Indice de défilement | 3 | `.scroll-hint` (1), `.scrolldown` (1), `.scroll` (1) |
| Pied de page | 14 | `.foot` (12), `.legal` (9), `.foot-top` (5), `.footer` (1), `.foot-card` (1), `.foot-cols` (1), `.foot-grid` (1) |

Lecture :

- **Le bouton principal porte 6 noms de base** (`.btn`, `.pill`, `.cta`, `.more`, `.brut`, `.enter`) et autant de formes : pilule, rectangle, bloc épais, autocollant, crochets de coin. C'est le composant le plus divergent, donc le premier à définir dans la bibliothèque partagée.
- **La carte est le composant le plus éclaté** : 35 noms différents (`.card`, `.tile`, `.prod`, `.listing`, `.dish`, `.post`…). Derrière ces noms, quatre vrais gabarits : carte média (photo + titre), carte produit (photo + nom + prix + action), carte article (photo + date + titre), tuile d'information (icône + valeur).
- **Le bouton rond** (`.round`, `.play`, `.close`, `.social`, `.arrow`) existe dans 17 skills : lecture, fermeture, flèche de carrousel, réseau social.
- **Communs mais jamais nommés pareil** : sélecteur à choix unique (onglets, puces de filtre, pastilles de couleur, tailles, langue) — 13 skills, 13 noms, et trois mécanismes ARIA différents (`aria-pressed`, `aria-selected`, `aria-checked`).
- **Absents des 23 démos** : tableau de données (aucune balise `<table>`), fil d'Ariane, pagination de liste, barre latérale d'application, notification (toast), boîte de confirmation, infobulle, menu déroulant, interrupteur, case à cocher stylée (2 skills seulement), champ de recherche fonctionnel, état vide. **Tout le registre fonctionnel (CRM, back-office, SaaS) est à construire : aucun skill existant ne le couvre.**

## 3. Schémas UX rencontrés (base du socle)

### Structures de page

| Schéma | Skills | Description |
|---|---|---|
| Page longue à sections | acid-scan-security, alpine-glass-expedition, anime-x-slash, chrome-atelier, cosmic-voyage, glass-frame-estate, hyper-lime-street, mint-street-basics, nocturne-architecture, pixel-lime-portfolio, pocket-device-noir, serif-bistro-green, signal-orange-techwear, sticker-brutal-jp, tiny-planet-toy, zigzag-snack-pop (16) | Héros, puis 4 à 12 sections empilées, pied. Sections alternées clair / sombre dans 9 cas. |
| Récit en scènes pilotées par le défilement | heritage-lens, lore-frame-editorial, retro-mission-poster, glacial-mono-3d (4) | Scènes plein écran ou épinglées ; le défilement fait avancer un récit ou une caméra. |
| Écran unique sans défilement | hold-to-play-music, noir-inferno-chapters, showroom-bento (3) | Tout tient dans la fenêtre ; on avance par un geste, des numéros ou un carrousel. |
| Page dans un cadre | lore-frame-editorial, retro-mission-poster, sticker-brutal-jp, showroom-bento, glass-frame-estate (héros) (5) | Un cadre fixe ou un filet entoure tout l'écran. |

### Navigation

| Schéma | Skills |
|---|---|
| Barre haute (fixe ou dans le héros) avec ancres | 14 skills (`.nav`) |
| Menu plein écran ouvert par un bouton | anime-x-slash, glass-frame-estate, lore-frame-editorial, retro-mission-poster, heritage-lens (plan), zigzag-snack-pop / serif-bistro-green (mobile) |
| Interface de coins (HUD), sans barre | glacial-mono-3d, heritage-lens, noir-inferno-chapters, hold-to-play-music |
| Rail ou onglet latéral | cosmic-voyage, anime-x-slash, lore-frame-editorial, hyper-lime-street |
| Points ou numéros de progression | heritage-lens, noir-inferno-chapters, lore-frame-editorial, hyper-lime-street |
| Groupe de pilules (section active en plein) | showroom-bento, serif-bistro-green |

### Parcours

| Parcours | Skills | Étapes |
|---|---|---|
| Vitrine → preuve → contact ou lettre d'info | 12 skills | Héros, arguments, chiffres ou avis, formulaire court en bas de page. |
| Catalogue → fiche → panier | mint-street-basics, signal-orange-techwear, zigzag-snack-pop, serif-bistro-green (carte) | Grille filtrable, fiche avec options (taille, couleur), ajout au panier annoncé en `aria-live`. |
| Configurateur | showroom-bento, chrome-atelier | Un objet central, on change une option (teinte, métal), l'objet se met à jour. |
| Récit en chapitres | heritage-lens, lore-frame-editorial, retro-mission-poster, noir-inferno-chapters, hold-to-play-music | Entrée, chapitres numérotés, sortie vers un « à propos ». |
| Essai immédiat | acid-scan-security | Saisir une valeur, voir un résultat simulé. |
| Liste d'attente / précommande | chrome-atelier, pocket-device-noir | Un seul champ e-mail, confirmation. |

### États et retours

| Schéma | Présence |
|---|---|
| Chargement de page (écran d'entrée) | 9 skills ; 6 formes différentes (barre, pourcentage, ASCII, tracé, terminal, rideau) |
| Sélection (`aria-pressed`, `aria-selected`, `aria-checked`, `aria-current`) | 15 skills |
| Ouverture / fermeture (`aria-expanded`) : menu, accordéon, FAQ | 11 skills |
| Modale déclarée `aria-modal` | glacial-mono-3d, glass-frame-estate, heritage-lens, hold-to-play-music, noir-inferno-chapters (5) ; `retro-mission-poster` utilise `inert` sans `aria-modal` |
| Annonce `aria-live` (panier, confirmation, compteur) | 13 skills |
| Formulaire complet : validation, erreur écrite, envoi en cours, succès | **4 skills seulement** : acid-scan-security, alpine-glass-expedition, chrome-atelier, cosmic-voyage |
| Bouton désactivé | 2 skills (cosmic-voyage, mint-street-basics) |
| État vide | **0 skill** |
| Erreur de page, hors ligne, 404 | **0 skill** |
| Mouvement réduit (`prefers-reduced-motion`) | 23 skills |
| Repli sans WebGL | glacial-mono-3d, tiny-planet-toy |

## 4. Incohérences et défauts les plus fréquents

| # | Défaut | Skills touchés |
|--:|---|---|
| 1 | Aucun état vide dans la démo | 23 / 23 |
| 2 | `--k-focus` sans token dédié (le contour réutilise une autre couleur) | 22 / 23 |
| 3 | Pas de lien d'évitement | 22 / 23 (seul `cosmic-voyage` en a un) |
| 4 | Aucun état désactivé | 21 / 23 |
| 5 | Survols non protégés par `@media (hover: hover)` | 21 / 23 |
| 6 | Aucune couleur de succès, d'avertissement ni de danger | 19, 21 et 18 / 23 |
| 7 | Bouton sans attribut `type` | 18 / 23 (141 boutons) |
| 8 | Aucune échelle d'espacement : marges en px écrites en dur | 17 / 23 |
| 9 | Un seul point de rupture (pas de palier tablette) | 17 / 23 |
| 10 | Liens `href="#"` | 15 / 23 (108 liens, dont 45 dans `glass-frame-estate`) |
| 11 | Formulaire factice ou sans état d'erreur | 9 / 13 démos avec formulaire (6 en `onsubmit="return false"`, 3 qui affichent « Merci » sans validation) |
| 12 | Rayons écrits en dur à côté des tokens de rayon | 12 / 23 |
| 13 | Paires de contraste validées seulement en « grand texte » (3:1) | 12 / 23 |
| 14 | Texte sous 12px prévu par les tokens (10 ou 11px) | 9 / 23 |
| 15 | Contenu inventé présenté comme réel : avis, presse, prix, chiffres | 11 / 23 |

Autres constats :

- **« Aucune valeur en dur »** est une règle écrite dans 17 `SKILL.md`. Les couleurs la respectent presque partout (3 démos seulement ont une couleur hors `:root`), mais pas les dimensions : entre 26 et 210 valeurs px en dur par démo, et dans 2 démos plus de valeurs en dur que d'usages de variables (`pocket-device-noir`, `zigzag-snack-pop`). `tools/check.py` ne contrôle que les couleurs hexadécimales.
- **Deux gabarits de `SKILL.md` cohabitent** : 6 skills (`serif-bistro-green`, `showroom-bento`, `signal-orange-techwear`, `sticker-brutal-jp`, `tiny-planet-toy`, `zigzag-snack-pop`) ont des sections « Mouvement / Mise en page / Accessibilité / À ne pas faire / Vérification » et **pas de section « Signature »** ; les 17 autres ont « Signature / À éviter / Avant de livrer ». Pour ces 6 skills, la signature du relevé a été déduite de « L'idée » et des règles prioritaires.
- **Deux niveaux de finition des tokens** : seuls 6 skills (`acid-scan-security`, `alpine-glass-expedition`, `anime-x-slash`, `chrome-atelier`, `cosmic-voyage`, `glacial-mono-3d`) ont une échelle `--space-*`, et les 4 formulaires complets se trouvent tous parmi eux.
- **Un même nom, deux sens** : `--line` est une couleur dans 12 skills et une épaisseur dans 2 (`lore-frame-editorial`, `retro-mission-poster`) ; `--paper` est le fond dans 5 skills et une surface inversée dans 5 autres ; `--white` vaut `#f8f8f8` dans `pixel-lime-portfolio`.
- **Un même sens, plusieurs noms** : marge latérale = `--edge` (8), `--gutter` (9), `--pad` (2), `--frame-pad` ; largeur de contenu = `--container` (7), `--page` (10), `--page-w` ; durée de base = `--dur` (13), `--dur-base` (3), `--dur-ui` (4) ; courbe = `--ease` (19) ou `--ease-out` ; tailles = `--fs-*` (19 skills) ou `--text-*` (4) ; rayons = `--r-*` (15) ou `--radius-*` (3) ; police de texte = `--font`, `--font-body`, `--font-ui`, `--font-sans`, `--font-text`.
- **Sémantique** : 8 démos sans `<header>`, 6 sans `<footer>`, 2 avec un `<h1>` vide rempli par script, 2 où un `<h2>` précède le `<h1>`.
- **Signe de liste noire déjà présent** : `cosmic-voyage` a un anneau en dégradé violet → bleu → orange dont le violet (`#8b5cf6`) est une valeur « estimée » et non mesurée.

## 5. Propositions de corrections du contrat

Rien n'est appliqué : ce sont des propositions à valider avant l'étape 2.

### Rôles à ajouter

| Rôle proposé | Pourquoi | Appui dans le relevé |
|---|---|---|
| `--k-bg-inverse`, `--k-text-inverse` | La plupart des skills alternent sections claires et sombres. Sans paire inversée, un composant partagé ne sait pas quelle couleur prendre sur une section inversée. | `--ink` présent dans 20 skills, `--paper` dans 10 ; 9 pages à sections alternées. |
| `--k-scrim` (voile sous un texte posé sur une image) | `--k-overlay` mélange aujourd'hui deux choses : le fond d'une modale et le voile dégradé sous un titre. | `--veil*` dans 15 skills, presque toujours pour du texte sur photo. |
| `--k-radius-pill` | La pilule et le rond sont partout et ne rentrent ni dans `radius` ni dans `radius-lg`. | `--r-pill` dans 8 skills ; `50%` ou `999px` dans les 23 démos. |
| `--k-control-h`, `--k-nav-h` | Les hauteurs de bouton, de champ et de barre sont les dimensions les plus souvent déclarées, et elles conditionnent l'accessibilité (cible de 44px). | `--btn-h` (8), `--pill-h` (4), `--nav-h` (8) ; 129 dimensions de composant hors contrat. |
| `--k-fs-h3`, `--k-fs-label` | Le contrat saute de `h2` à `body`. Les titres de carte et les libellés en capitales ont leur propre taille presque partout. | `--fs-h3` (6), `--fs-label` (7), `--fs-nav` (7). |
| `--k-lh-tight`, `--k-lh-body`, `--k-ls-display`, `--k-ls-caps`, `--k-fw-display` | L'identité typographique d'un skill tient autant à l'interligne, à l'approche et à la graisse qu'à la taille. Sans eux, deux skills avec la même police se ressemblent. | 165 variables de typo hors contrat. |
| `--k-shadow` (`none` par défaut) | Trois skills reposent sur une ombre dure décalée ; la majorité interdit toute ombre. Sans rôle, la bibliothèque partagée appliquera une ombre douce par défaut : précisément le signe à éviter. | `--shadow`, `--drop`, `--hard` (sticker, tiny-planet, zigzag). |
| `--k-angle` (`0deg` par défaut) | Le biseau de deux skills est un angle, pas une longueur : il ne peut pas aller dans `--k-cut`. | `--slant` 36,4° (anime), `--angle` 41° (hyper-lime), `--tilt` (retro, tiny-planet). |
| `--k-ease-spring` (facultatif) | Courbe à rebond pour les styles joueurs. | `--ease-back`, `--ease-pop`, `--ease-drop`, `--ease-spring` dans 6 skills. |
| `--k-section-y` | Rythme vertical entre sections : aujourd'hui en dur partout. | Un seul skill le déclare (`glass-frame-estate`). |

### Rôles à préciser ou à changer

| Rôle | Problème | Proposition |
|---|---|---|
| `--k-space-1` à `--k-space-12` | 17 skills n'ont pas d'échelle ; les 6 autres utilisent les pas 1, 2, 3, 4, 6, 8, 12, 16, 24, 32 (multiples de 4px), pas une suite de 1 à 12. | Faire porter l'échelle par le **socle** de kobo-studio (base 4px, pas 1-2-3-4-6-8-12-16-24-32), pas par chaque skill. Le skill ne fournit que `--k-edge`, `--k-container` et `--k-section-y`. |
| `--k-success`, `--k-warning`, `--k-danger` | Presque jamais fournis (0, 0 et 2 skills). Pourtant indispensables au socle UX (formulaires, états). | Les garder, mais prévoir une **règle de dérivation** par skill à l'étape 2 (teinte choisie dans la palette du skill, contraste vérifié), au lieu d'attendre que le skill les fournisse. Ne pas imposer un vert et un rouge standard. |
| `--k-focus` | Un seul skill a un token ; les 22 autres réutilisent l'accent, le texte ou `currentColor`. | Le rendre **obligatoire**, avec épaisseur et décalage (`--k-focus-w`, `--k-focus-offset`) : les contours actuels vont de 1px à 3px. |
| `--k-accent` | 4 skills n'ont volontairement aucune couleur d'accent (`glass-frame-estate`, `chrome-atelier`, `alpine-glass-expedition`, `glacial-mono-3d`) : l'action principale y est noire ou blanche. | Écrire dans le contrat que l'accent **peut être neutre** (égal à `--k-text` ou à un blanc). Ne pas forcer une couleur. |
| `--k-on-accent` | 16 skills le dérivent. | Obligatoire dès que `--k-accent` existe, avec contraste vérifié. |
| `--k-cut` | Rempli par 2 skills, vaut 0 pour 20. | Le garder (coût nul), mais en longueur seulement ; l'angle va dans `--k-angle`. |
| `--k-fs-h1` | 11 dérivables, 4 absents : les skills ont un titre de héros et un `h2`, rarement un `h1` distinct. | Règle de repli : `--k-fs-h1` = `--k-fs-hero` si absent. |
| `--k-font-mono`, `--k-line-strong`, `--k-ease-in-out`, `--k-radius-lg`, `--k-text-2` | Absents de 14, 10, 8, 8 et 6 skills. | Les déclarer **facultatifs** avec repli écrit (`font-mono` → `font-body`, `line-strong` → `text`, `ease-in-out` → `ease-out`, `radius-lg` → `radius`, `text-2` → `text`). |
| `--k-bg` | 4 skills ont deux ou trois fonds de page alternés (`glacial`, `serif-bistro`, `zigzag`, `mint`). | Préciser que `--k-bg` est le fond **dominant** ; les autres vont dans `--k-bg-inverse` ou `--k-sig-*`. |

### Rôles qui ne servent à rien

Aucun rôle n'est inutile au point d'être supprimé. Les plus faibles sont `--k-cut` (2 skills) et `--k-accent-2` (souvent un simple état de survol de l'accent) : à garder comme facultatifs.

### Règle pour `--k-sig-*`

Le relevé compte 194 couleurs et une centaine d'autres valeurs propres à un seul skill. Proposition : tout ce qui n'entre pas dans un rôle garde son nom d'origine préfixé (`--k-sig-<nom>`), et **aucun composant partagé n'a le droit de lire un `--k-sig-*`** — seuls les composants de signature du skill le font. C'est ce qui empêchera la signature de devenir générique.

### Point d'attention avant l'étape 2

Les 23 skills sont tous des registres **produit / marketing** ou **expressif**. Aucun ne montre un écran d'application (tableau, filtres, formulaire long, navigation latérale). Le socle UX et la bibliothèque de composants du registre fonctionnel ne pourront donc pas être déduits de l'existant : ils devront venir des sources externes (voir `sources.md`).
