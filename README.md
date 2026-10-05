# Kōbō — skills de direction artistique pour Claude Code

**工房 (kōbō) : l'atelier.** Une bibliothèque de skills qui apprennent à Claude Code à construire des sites entiers dans un style précis : jeu vidéo, gacha, splash art, Japon, street art, art graphique, et un style sobre pour les outils de travail.

Le plugin contient :

| Skill | À quoi il sert |
|---|---|
| **24 skills de style** | Chacun décrit une apparence complète : couleurs, typographie, composants, mouvements, images |
| [`kobo-studio`](plugins/kobo-design/skills/kobo-studio/SKILL.md) | Conduit un projet de la demande à la livraison vérifiée, avec un seul style |
| [`site-to-skill`](plugins/kobo-design/skills/site-to-skill/SKILL.md) | Crée un nouveau skill de style à partir d'un site de référence |
| [`catalogue`](plugins/kobo-design/skills/catalogue/SKILL.md) | Aide à choisir un style |

Chaque skill de style part d'un **site ou d'une maquette de référence**, est écrit sous forme de règles et de composants réutilisables, puis **testé** sur une page d'exemple. Son fichier `source.md` dit ce qui a été mesuré dans le navigateur, ce qui a été estimé à l'œil et ce qui est proposé.

> On reprend un langage visuel, jamais une identité : aucun logo, illustration, personnage, texte ou police propriétaire des sites de référence n'est inclus.

## Installer

Dans Claude Code :

```
/plugin marketplace add Ylian967/kobo-design-skills
/plugin install kobo-design@kobo
```

Les styles s'activent tout seuls quand ta demande correspond à leur description, ou à la main :

```
/kobo-design:<nom-du-style> crée la page d'accueil de mon jeu
```

## kobo-studio : mener un projet

Les skills de style donnent l'apparence. `kobo-studio` donne la méthode, la structure des pages, les composants et la vérification.

**À quoi il sert.** À construire un site ou un outil de travail entier sans réinventer la navigation, les formulaires ni les tableaux. Il sert aussi à reprendre un site existant sans perdre son contenu.

**Comment le lancer.** Avec la demande en une phrase :

```
/kobo-design:kobo-studio un site vitrine pour mon cabinet d'architectes
```

Il se déclenche aussi seul sur une demande de site sans style imposé.

**Ce qu'il fait**, dans l'ordre :

1. Il pose un premier tour de questions, puis s'arrête. La première porte sur le registre : un site qu'on visite, ou un outil dans lequel on travaille.
2. Il propose deux ou trois skills, chacun avec sa limite, et un plan des pages. Puis il s'arrête et attend la validation. Pour un outil de travail, il propose `clear-ledger-desk` seul.
3. Il construit. Une commande (`tools/kit.py`) pose dans le projet les fichiers nécessaires et une page de départ. La page charge un seul skill.
4. Il vérifie par script (`tools/check_studio.py`) : fichiers du projet, puis les pages à 1440 et 390 px, avec le contraste mesuré sur capture. Sans navigateur, le script le dit et la livraison l'écrit.
5. Il livre en séparant ce qui est mesuré, ce qui est estimé et ce qui est inventé.

**Ce qu'il contient** (dossier [`kobo-studio/`](plugins/kobo-design/skills/kobo-studio/)) :

| Dossier | Contenu |
|---|---|
| `contract/` | Les rôles `--k-*` communs, et une fiche par skill qui relie ses variables à ces rôles |
| `components/` | 20 composants (bouton, champ, tableau, modale, onglets…) en HTML/CSS/JS et en React ; la liste est dans [`INDEX.md`](plugins/kobo-design/skills/kobo-studio/components/INDEX.md). `components/motion/` porte les mouvements signature de six skills |
| `ux/structures/` | 5 structures de page : landing produit, site vitrine, récit collant, article, application |
| `ux/templates/` | Les gabarits qui portent la signature d'un skill (héros, cadre de page, titres) |
| `tools/` | `kit.py` (poser le kit), `check_studio.py` (vérifier un projet), `compare.py` (poser la page à côté de la démo du skill), et les vérificateurs de la bibliothèque |
| `quality/` | La grille de relecture et les comptes rendus des essais |
| `examples/` | Les projets construits pendant les essais |

La structure **application** sert aux outils de travail. Elle a trois écrans de départ : une liste avec filtres et panneau de détail, la fiche d'un enregistrement, un tableau de bord.

**Couleurs de marque.** Les couleurs d'un client se posent par-dessus le skill, dans un fichier `brand.css` du projet. Le script recalcule les contrastes avec ces couleurs. La marche à suivre est dans [`brand.md`](plugins/kobo-design/skills/kobo-studio/brand.md).

### Exemples

Ces projets ont été construits par un agent qui n'avait que `kobo-studio/SKILL.md` et une demande. Tous sont fictifs. Les comptes rendus, avec ce qui a mal marché, sont dans [`quality/essais-etape-5.md`](plugins/kobo-design/skills/kobo-studio/quality/essais-etape-5.md).

| Exemple | Demande | Skill | Structure |
|---|---|---|---|
| [`festival-lyon`](plugins/kobo-design/skills/kobo-studio/examples/festival-lyon/) | Une landing pour un festival de musique électronique | `nocturne-architecture` | landing produit |
| [`restaurant-react`](plugins/kobo-design/skills/kobo-studio/examples/restaurant-react/) | Le site d'un restaurant de quartier, en React | `retro-mission-poster` | site vitrine |
| [`reprise-poterie`](plugins/kobo-design/skills/kobo-studio/examples/reprise-poterie/) | Reprendre un site existant de cours de poterie | `serif-bistro-green` | reprise |
| [`crm-pme`](plugins/kobo-design/skills/kobo-studio/examples/crm-pme/) | Un CRM B2B pour une PME de services | `clear-ledger-desk` | application |
| [`cabinet-architectes`](plugins/kobo-design/skills/kobo-studio/examples/cabinet-architectes/) | Le site d'un cabinet d'architectes, avec deux couleurs de marque imposées | `glass-frame-estate` | site vitrine |
| [`club-escalade`](plugins/kobo-design/skills/kobo-studio/examples/club-escalade/) | Une application de réservation pour un club d'escalade, avec une page publique et un espace membre | `clear-ledger-desk` | application |

La galerie publique permet de les ouvrir.

## Contenu d'un skill

```
plugins/kobo-design/skills/<style>/
├── SKILL.md                  règles prioritaires, typo, couleurs, signature, à éviter
├── source.md                 site de référence, mesures brutes, écarts assumés
├── references/
│   ├── tokens.css            variables CSS (contrastes déclarés et vérifiés)
│   ├── components.md         boutons, cartes, navigation, champs, badges, modals + états
│   ├── layouts.md            héros, sections, grilles, en-tête, mobile
│   ├── motion.md             animations : durées, courbes, mouvement réduit
│   └── assets.md             images et 3D : sujets, traitements, sources, recette 3D
└── examples/
    └── demo.html             page complète construite uniquement avec le skill
```

Claude ne charge `references/` que lorsqu'il en a besoin : le skill reste léger dans le contexte.

## Ajouter un style avec site-to-skill

**Guide pas à pas : [CREER-UN-SKILL.md](CREER-UN-SKILL.md)** (créer un style ou n'importe quel skill avec Claude, demandes prêtes à copier).

Le skill [`site-to-skill`](plugins/kobo-design/skills/site-to-skill/SKILL.md) contient la méthode. Il se lance de deux façons :

```
/kobo-design:site-to-skill https://un-site-que-j-aime.com
/kobo-design:site-to-skill un CRM B2B pour une PME de services
```

Avec une adresse, il analyse ce site. Avec un type de projet, il cherche lui-même :

1. Il lit le **registre** du projet : expressif, produit ou fonctionnel.
2. Il regarde d'abord si un skill existant convient.
3. Sinon il cherche dans une liste fixe de sources (`references/sources.md`) et propose **dix références au plus**.
4. Il **s'arrête** et laisse choisir une ou deux références.
5. Il mesure les références choisies dans le navigateur, écrit le skill, sa page d'exemple, sa fiche pour `kobo-studio` et sa couche de signature.
6. Il note les références analysées dans `references/index.md`.

`clear-ledger-desk` a été créé ainsi. Son style a été mesuré sur le système de design public d'Atlassian. Les schémas propres au CRM ont été lus dans la documentation de Salesforce Lightning 2, sans mesure. Sa couleur d'action et sa densité compacte sont proposées.

À la main, les étapes restent :

1. Mesurer le site avec `plugins/kobo-design/skills/site-to-skill/scripts/extract-design.js` (console du navigateur).
2. Copier `templates/skill/` vers `plugins/kobo-design/skills/<style>/` et remplir.
3. Construire `examples/demo.html` à partir du skill seul, avec de vraies images (et la 3D si le style en a).
4. Vérifier : `python3 tools/check.py <style>`
5. Mettre à jour la galerie : `python3 tools/build_gallery.py`

## Galerie

`docs/index.html` présente `kobo-studio` et `site-to-skill`, donne accès aux exemples de `kobo-studio` (copiés dans `docs/exemples/`) et montre un aperçu vivant de la page d'exemple des 24 skills. Elle est générée par `python3 tools/build_gallery.py`. Pour la publier : *Settings → Pages → Deploy from a branch → `main` / `docs`*.

## Styles disponibles

| Style | Famille | Référence |
|---|---|---|
| [`acid-scan-security`](plugins/kobo-design/skills/acid-scan-security/) — Acid Scan Security | Tech / cybersécurité | [Dribbble](https://dribbble.com/shots/27776445-ThreatIQ-Next-Gen-Data-Security-Website) |
| [`alpine-glass-expedition`](plugins/kobo-design/skills/alpine-glass-expedition/) — Alpine Glass Expedition | Voyage / aventure | [Dribbble](https://dribbble.com/shots/27767056-WayWild-Adventure-Travel-Website) |
| [`anime-x-slash`](plugins/kobo-design/skills/anime-x-slash/) — Anime X Slash | Jeu vidéo & anime | [tbhx.net](https://tbhx.net/en/) |
| [`chrome-atelier`](plugins/kobo-design/skills/chrome-atelier/) — Chrome Atelier | Luxe / bijou produit 3D | [Dribbble](https://dribbble.com/shots/27491195-Website-Design-for-Avant-Garde-Jewelry-Product) |
| [`clear-ledger-desk`](plugins/kobo-design/skills/clear-ledger-desk/) — Clear Ledger Desk | Outil de travail / CRM, back-office | [atlassian.design](https://atlassian.design) (style), [lightningdesignsystem.com](https://www.lightningdesignsystem.com) (schémas CRM) |
| [`cosmic-voyage`](plugins/kobo-design/skills/cosmic-voyage/) — Cosmic Voyage | Jeu vidéo & gacha | [hsr.hoyoverse.com](https://hsr.hoyoverse.com/fr-fr/home) |
| [`glacial-mono-3d`](plugins/kobo-design/skills/glacial-mono-3d/) — Glacial Mono 3D | Expérience web 3D | [igloo.inc](https://www.igloo.inc/) |
| [`glass-frame-estate`](plugins/kobo-design/skills/glass-frame-estate/) — Glass Frame Estate | Immobilier / annonces | [Dribbble](https://dribbble.com/shots/27776118-Realeste-Real-Estate-Property-Listing-Website-Template) |
| [`heritage-lens`](plugins/kobo-design/skills/heritage-lens/) — Heritage Lens | Culture / patrimoine immersif | [getty.edu](http://www.getty.edu/persepolis) |
| [`hold-to-play-music`](plugins/kobo-design/skills/hold-to-play-music/) — Hold To Play Music | Musique / expérience interactive | [because-recollection.com](http://www.because-recollection.com/) |
| [`hyper-lime-street`](plugins/kobo-design/skills/hyper-lime-street/) — Hyper Lime Street | Jeu vidéo | [zenless.hoyoverse.com](https://zenless.hoyoverse.com/fr-fr/main) |
| [`lore-frame-editorial`](plugins/kobo-design/skills/lore-frame-editorial/) — Lore Frame Editorial | Narration / univers illustré | [kprverse.com](https://kprverse.com/) |
| [`mint-street-basics`](plugins/kobo-design/skills/mint-street-basics/) — Mint Street Basics | Mode / e-commerce streetwear | [Dribbble](https://dribbble.com/shots/27774954-Modern-Fashion-E-commerce-Website) |
| [`nocturne-architecture`](plugins/kobo-design/skills/nocturne-architecture/) — Nocturne Architecture | Architecture / immobilier de luxe | [Dribbble](https://dribbble.com/shots/27769939-Architecture-Studio-Website-Design-Baraka) |
| [`noir-inferno-chapters`](plugins/kobo-design/skills/noir-inferno-chapters/) — Noir Inferno Chapters | Récit illustré / musique | [falter.madebywild.com](http://falter.madebywild.com/#en) |
| [`pixel-lime-portfolio`](plugins/kobo-design/skills/pixel-lime-portfolio/) — Pixel Lime Portfolio | Portfolio / éditorial créatif | [Dribbble](https://dribbble.com/shots/27766428-CH-Bold-Editorial-Creative-Personal-Portfolio-Website-UI-Design) |
| [`pocket-device-noir`](plugins/kobo-design/skills/pocket-device-noir/) — Pocket Device Noir | Produit tech / objet connecté | [Dribbble](https://dribbble.com/shots/27771993-Noda-AI-Companion-Website-Design) |
| [`retro-mission-poster`](plugins/kobo-design/skills/retro-mission-poster/) — Retro Mission Poster | Récit de marque / affiche | [prometheusfuels.com](https://www.prometheusfuels.com/) |
| [`serif-bistro-green`](plugins/kobo-design/skills/serif-bistro-green/) — Serif Bistro Green | Restaurant / food | [Dribbble](https://dribbble.com/shots/27769189--Vesta-Dining-Restaurant-Landing-Page-UI-UX-Design) |
| [`showroom-bento`](plugins/kobo-design/skills/showroom-bento/) — Showroom Bento | E-commerce / showroom produit | [Dribbble](https://dribbble.com/shots/27766449-Motorcycle-E-Commerce-Website-Design) |
| [`signal-orange-techwear`](plugins/kobo-design/skills/signal-orange-techwear/) — Signal Orange Techwear | Mode / techwear cyberpunk | [Dribbble](https://dribbble.com/shots/27776418-CyberRonin-TechWear-website-concept) |
| [`sticker-brutal-jp`](plugins/kobo-design/skills/sticker-brutal-jp/) — Sticker Brutal JP | Portfolio / néo-brutalisme japonais | [Dribbble](https://dribbble.com/shots/27769104-Neobrutalism-in-Japanese-Localizing-My-Website-for-Japan) |
| [`tiny-planet-toy`](plugins/kobo-design/skills/tiny-planet-toy/) — Tiny Planet Toy | Expérience web / jeu | [messenger.abeto.co](https://messenger.abeto.co/) |
| [`zigzag-snack-pop`](plugins/kobo-design/skills/zigzag-snack-pop/) — Zigzag Snack Pop | Food / marque snack énergique | [Dribbble](https://dribbble.com/shots/27735034-ONE-Protein-Bar-Performance-Snack-Landing-Page) |

Pour choisir : `/kobo-design:catalogue <ta demande>`. Pour mener un projet entier : `/kobo-design:kobo-studio <ta demande>`.
