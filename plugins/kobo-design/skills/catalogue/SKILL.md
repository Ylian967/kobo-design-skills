---
name: catalogue
description: Catalogue des 24 directions artistiques Kōbō (jeu vidéo, anime, gacha, expériences web primées, luxe, tech, mode, food, immobilier, voyage, portfolio, et un style sobre pour les outils de travail — CRM, back-office, tableau de bord). À utiliser quand on demande quel style choisir, « montre-moi les styles », « je veux un site sombre / coloré / japonais / luxe… », ou avant de lancer un projet sans style imposé. Propose 1 à 3 skills adaptés et explique pourquoi.
---

# Catalogue Kōbō

Ce skill ne dessine rien : il aide à **choisir** le bon style, puis passe la main au skill choisi (`/kobo-design:<id>`).

## Comment répondre

1. Lire la demande : type de produit (jeu, boutique, portfolio…), ambiance (sombre, lumineuse, joyeuse, luxe), plateforme (web, React Native). Si c'est un **outil de travail** (CRM, ERP, back-office, tableau de bord, application SaaS), proposer `clear-ledger-desk` seul : les autres styles sont faits pour présenter, pas pour travailler.
2. Proposer **1 à 3 styles** du tableau, chacun avec une phrase : pourquoi il colle, et ce qu'il faudra fournir (photos, illustrations, 3D).
3. Indiquer la commande à lancer : `/kobo-design:<id> <la demande>`.
4. Si rien ne colle, proposer `/kobo-design:site-to-skill <url>` pour créer un style à partir d'un site, ou `/kobo-design:site-to-skill <type de projet>` pour qu'il propose dix références au plus et laisse choisir.
5. Pour un projet entier (interview, structure des pages, composants, vérification), passer la main à `/kobo-design:kobo-studio`.

Ne jamais mélanger deux styles dans un même projet : choisir, puis s'y tenir.

## Jeu vidéo, anime, gacha

| id | En un mot | Ambiance | Inspiré de |
|---|---|---|---|
| `anime-x-slash` | Anime d'action | Gris papier, noir, rouge signal, coupes obliques | tbhx.net (série animée) |
| `cosmic-voyage` | Gacha spatial | Nuit étoilée, verre bleuté, cartes à un seul coin arrondi, accents dorés | hsr.hoyoverse.com |
| `hyper-lime-street` | Action urbaine | Béton clair, blocs noirs rayés, jaune-vert acide | zenless.hoyoverse.com |

## Expériences web primées (Awwwards)

| id | En un mot | Ambiance | Inspiré de |
|---|---|---|---|
| `tiny-planet-toy` | Mini-monde ludique | Turquoise doux, petite planète dessinée | messenger.abeto.co |
| `glacial-mono-3d` | Vitrine 3D glacée | Gris-bleu acier, neige, monochrome | igloo.inc |
| `lore-frame-editorial` | Univers illustré en chapitres | Cadre fin, typographie éditoriale | kprverse.com |
| `heritage-lens` | Visite patrimoniale | Scènes plein cadre, loupe passé/présent | Persepolis Reimagined (Getty) |
| `retro-mission-poster` | Récit de marque rétro-futur | Affiche années 70, écran encadré | prometheusfuels.com |
| `noir-inferno-chapters` | Récit en noir et blanc peint | N&B, rouge rare, chapitres | Falter Inferno |
| `hold-to-play-music` | Expérience musicale | N&B, lettrage peint, « maintenir pour jouer » | Because Recollection |

## Marques, produits et services (concepts Dribbble)

| id | En un mot | Ambiance | Inspiré de |
|---|---|---|---|
| `chrome-atelier` | Luxe / bijou | Blanc cassé, lignes fines, objet chromé centré | Shot « Avant-Garde Jewelry » (Shakuro) |
| `acid-scan-security` | Cybersécurité | Vert acide monochrome, pixels, viseurs | Shot « ThreatIQ » |
| `showroom-bento` | Showroom produit / configurateur | Gris studio, pilules, tuiles bento, rouge | Shot « Motorcycle E-Commerce » (Nixtio) |
| `nocturne-architecture` | Architecture / immobilier luxe | Nuit, nom géant en minuscules, rouge | Shot « Baraka » |
| `mint-street-basics` | Mode du quotidien | Marine, menthe, vert, titres condensés | Shot « Modern Fashion E-commerce » |
| `pocket-device-noir` | Objet tech / IA | Noir profond, verre, rouge ponctuel | Shot « Noda AI Companion » |
| `zigzag-snack-pop` | Snack énergique | Orange, jaune, brun, bords en zigzag | Shot « ONE Protein Bar » |
| `glass-frame-estate` | Annonces immobilières | Photo cadrée, nom géant en fondu, verre | Shot « Realeste » |
| `signal-orange-techwear` | Techwear cyberpunk | Anthracite, orange signal, typo étendue | Shot « CyberRonin » |
| `sticker-brutal-jp` | Néo-brutalisme japonais | Pêche, autocollants à contour noir, JP/EN | Shot « Neobrutalism in Japanese » |
| `serif-bistro-green` | Restaurant | Vert profond, crème, orange, serif d'affiche | Shot « Vesta Dining » |
| `pixel-lime-portfolio` | Portfolio créatif | N&B, blocs pixel citron vert, mono | Shot « CH — Bold Editorial Portfolio » |
| `alpine-glass-expedition` | Voyage d'aventure | Montagne bleutée, serif capitales, verre | Shot « WayWild » |

## Outils de travail (registre fonctionnel)

| id | En un mot | Ambiance | Inspiré de |
|---|---|---|---|
| `clear-ledger-desk` | CRM, back-office, tableau de bord | Fond blanc, texte de 14 px, tableaux denses, une seule couleur d'action, densité confort ou compact | atlassian.design (style mesuré) et Salesforce Lightning 2 (schémas lus) |

## Raccourcis par envie

- **Sobre, pour travailler** : `clear-ledger-desk`.
- **Sombre et premium** : `pocket-device-noir`, `nocturne-architecture`, `glacial-mono-3d`.
- **Clair et élégant** : `chrome-atelier`, `glass-frame-estate`, `showroom-bento`.
- **Coloré et joyeux** : `sticker-brutal-jp`, `zigzag-snack-pop`, `tiny-planet-toy`.
- **Japon / anime** : `anime-x-slash`, `hyper-lime-street`, `sticker-brutal-jp`, `cosmic-voyage`.
- **Street / mode** : `signal-orange-techwear`, `mint-street-basics`, `hyper-lime-street`.
- **Néon / tech** : `acid-scan-security`, `signal-orange-techwear`, `pixel-lime-portfolio`.
- **Narratif / immersif** : `lore-frame-editorial`, `noir-inferno-chapters`, `heritage-lens`, `retro-mission-poster`, `hold-to-play-music`.
- **App mobile (React Native)** : préférer les styles à base de cartes et de pilules (`showroom-bento`, `mint-street-basics`, `cosmic-voyage`, `hyper-lime-street`, `sticker-brutal-jp`) ; les styles « expérience » (`heritage-lens`, `hold-to-play-music`, `tiny-planet-toy`) demandent plus d'adaptation.

## À savoir

- Chaque style a une page d'exemple : `skills/<id>/examples/demo.html` (galerie : `docs/index.html`).
- Les styles inspirés de Dribbble viennent de **maquettes** : valeurs estimées à l'œil (voir `source.md` de chaque skill). Les sites de jeu ont été mesurés dans le navigateur ; les sites Awwwards en WebGL ont été analysés surtout à partir de leurs fiches. `clear-ledger-desk` vient d'un système de design public mesuré dans le navigateur ; sa couleur d'action et sa densité compacte sont proposées (voir son `source.md`).
- Aucun style ne contient de logo, personnage, illustration ou texte des sites d'origine.
