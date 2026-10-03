# Kōbō — skills de direction artistique pour Claude Code

**工房 (kōbō) : l'atelier.** Une bibliothèque de skills qui apprennent à Claude Code à construire des sites entiers dans un style précis : jeu vidéo, gacha, splash art, Japon, street art, art graphique.

Chaque skill part d'un **site de référence mesuré dans le navigateur** (polices, couleurs, espacements, formes, animations), est écrit sous forme de règles et de composants réutilisables, puis **testé** sur une page d'exemple comparée à l'original.

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

## Ajouter un style

**Guide pas à pas : [CREER-UN-SKILL.md](CREER-UN-SKILL.md)** (créer un style ou n'importe quel skill avec Claude, demandes prêtes à copier).

La méthode complète est dans le skill [`site-to-skill`](plugins/kobo-design/skills/site-to-skill/SKILL.md) (utilisable aussi depuis Claude Code : `/kobo-design:site-to-skill https://…`).

En bref :

1. Mesurer le site avec `plugins/kobo-design/skills/site-to-skill/scripts/extract-design.js` (console du navigateur).
2. Copier `templates/skill/` vers `plugins/kobo-design/skills/<style>/` et remplir.
3. Construire `examples/demo.html` à partir du skill seul, avec de vraies images (et la 3D si le style en a), la comparer au site.
4. Vérifier : `python3 tools/check.py <style>`
5. Mettre à jour la galerie : `python3 tools/build_gallery.py`

## Galerie

`docs/index.html` montre un aperçu vivant de chaque démo. Pour la publier : *Settings → Pages → Deploy from a branch → `main` / `docs`*.

## Styles disponibles

| Style | Famille | Référence |
|---|---|---|
| [`acid-scan-security`](plugins/kobo-design/skills/acid-scan-security/) — Acid Scan Security | Tech / cybersécurité | [Dribbble](https://dribbble.com/shots/27776445-ThreatIQ-Next-Gen-Data-Security-Website) |
| [`alpine-glass-expedition`](plugins/kobo-design/skills/alpine-glass-expedition/) — Alpine Glass Expedition | Voyage / aventure | [Dribbble](https://dribbble.com/shots/27767056-WayWild-Adventure-Travel-Website) |
| [`anime-x-slash`](plugins/kobo-design/skills/anime-x-slash/) — Anime X Slash | Jeu vidéo & anime | [tbhx.net](https://tbhx.net/en/) |
| [`chrome-atelier`](plugins/kobo-design/skills/chrome-atelier/) — Chrome Atelier | Luxe / bijou produit 3D | [Dribbble](https://dribbble.com/shots/27491195-Website-Design-for-Avant-Garde-Jewelry-Product) |
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

Pour choisir : `/kobo-design:catalogue <ta demande>`.
