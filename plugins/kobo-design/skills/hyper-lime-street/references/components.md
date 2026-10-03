# Hyper Lime Street — composants

## Barre de navigation (fixe, 60px, noire)

Logo à gauche (emplacement). Liens en Inter 700 12–14px gris `--muted-dark`, sur deux lignes si besoin, centrés. **Lien actif = pilule blanche** (texte noir). « Plus ▾ ». À droite : bouton **« Télécharger maintenant »** pilule lime (Inter 700 14px noir), puis trois icônes rondes (musique, partage, compte) blanches.

```css
.nav a[aria-current="page"] { background: var(--surface); color: var(--text); border-radius: var(--radius-pill); padding: 4px 14px; }
.btn-dl { background: var(--accent); color: var(--on-accent); border-radius: var(--radius-pill); padding: 6px 10px; font: 700 var(--text-sm)/1 var(--font-body); }
```

## Bouton pilule « En savoir plus »

```html
<a class="pill" href="#">En savoir plus <span aria-hidden="true">›</span></a>
```
```css
.pill { display: inline-flex; align-items: center; gap: 10px; min-height: 46px; padding: 0 20px; border-radius: var(--radius-pill);
  background: var(--ink); color: var(--on-ink); border: var(--stroke-w) solid var(--stroke); font: 400 var(--text-md)/1 var(--font-display);
  text-decoration: none; transition: all var(--dur-1) var(--ease); }
.pill:hover { background: var(--accent); color: var(--on-accent); border-color: var(--ink); }
```

## Bouton plein lime (abonnement)

Fond `--accent-2`, texte noir, rayon 24px, padding 14px 16px, bordure 0.8px de la même couleur, `all 0.2s linear` (mesuré). Un seul par écran.

## Ruban « piste » (signature)

Grand bloc sombre à extrémités arrondies, coupé à 45°, rayé.
```css
.track { position: relative; background: var(--ink) repeating-linear-gradient(var(--cut), var(--hatch) 0 2px, transparent 2px 9px);
  border-radius: 0 var(--radius-track) var(--radius-track) 0; }
.track--cut { clip-path: polygon(0 0, 100% 0, 100% 100%, 220px 100%); } /* coupe à 45° côté gauche : hauteur = largeur coupée */
```
Les rubans se superposent légèrement d'une section à l'autre et changent de côté (zigzag).

## Bloc de section numéroté

Bloc lime à extrémité arrondie (72px), qui contient en haut à droite le **titre de section** (Anton 53px noir), en dessous un **sous-titre anglais** en capitales (Anton 19px), puis le **numéro géant** (Anton `--text-num`).

```html
<div class="sec-label"><h2>Documents vidéo</h2><span>VIDEO</span><b>03</b></div>
```

## Carrousel de vignettes

Barre pilule noire à contour gris contenant : flèche ← (cercle gris clair), 3 vignettes en **parallélogramme** (coins 8.4px, inclinées), flèche → (cercle blanc). Vignette active : contour lime 3px. Le titre de l'élément actif s'affiche au-dessus avec une étiquette lime en Anton (« Découverte du personnage ») et la date en gris.

## Pellicule photo

Bande noire avec une rangée de perforations carrées blanches arrondies (rayon 4px, 28px, espacées de 28px). Elle peut être droite ou partir en diagonale à 45°. Décor uniquement (`aria-hidden`).
```css
.film { height: 40px; background-color: var(--ink-2);
  background-image: linear-gradient(90deg, var(--surface) 0 28px, transparent 28px 56px);
  background-size: 56px 22px; background-repeat: repeat-x; background-position: 14px center; }
```

## Pagination latérale

Onglet fixé au bord droit de l'écran : noir avec bord gauche arrondi, numéro de section courant en Anton lime vertical (01), flèches ⇤ ⇥ lime, numéro suivant plus petit en dessous. Il change pendant le défilement.

## Carte d'actualité

Panneau blanc à grand rayon (72px côté extérieur), image réelle 16:9 à coins 24px (voir `assets.md`), un **défilant** noir sur le bas de l'image (texte Anton italique gris clair), date Inter 700 12px, titre Inter 700 14px, points de pagination (le point actif est lime), bouton pilule à droite.

## Défilant (marquee)

Texte Anton qui défile en boucle (20s linéaire). S'arrête au survol et quand le mouvement est réduit.

## États

- **Chargement** : barre lime qui remplit un ruban noir rayé (easeOutCubic), numéro « 00 ».
- **Vide** : bloc numéroté avec « 00 » et une phrase.
- **Erreur** : ruban noir, texte lime « HORS SERVICE », bouton pilule « Réessayer ».

---

# Composants des pages internes

> Relevés lors de l'exploration des pages Actu & infos, article, Univers du jeu, Personnages et du bas de page (2026-10-02, voir `source.md`). Les valeurs marquées « observé » sont lues à l'œil sur capture, pas mesurées par script.

## Badge de section (signature des pages internes)

**Rôle** : remplace le bloc numéroté de l'accueil en haut de chaque page interne ; dit où l'on est et donne le numéro de la rubrique (02 Personnages, 03 Vidéo, 04 Actus, 05 Univers).

**Anatomie** (observé) :
- une **bande diagonale noire rayée** (matière « piste ») qui traverse tout l'écran en biais derrière le badge ;
- posé dessus en haut à gauche, un bloc `--accent` (ou `--accent-blue` pour Personnages) dont le **bord droit est arrondi en pilule** ;
- dedans : titre FR (Inter 700 16px noir), sous-titre EN en capitales (10px, `--text-2xs`), et le **numéro géant** en Anton ;
- à droite de la page, un **filigrane** : le mot EN géant en Anton italique, `--watermark` (≈ 6 % de noir), qui sort du cadre.

**États** : statique. Pas de survol (ce n'est pas un lien). Le filigrane est `aria-hidden`.

```html
<header class="page-head">
  <div class="page-head__band" aria-hidden="true"></div>
  <div class="badge"><h1>Actu &amp; infos</h1><span>NEWS &amp; INFO</span><b>04</b></div>
  <p class="watermark" aria-hidden="true">NEWS &amp; INFO</p>
</header>
```
```css
.page-head { position: relative; padding: calc(var(--nav-h) + var(--space-8)) 0 var(--space-8); overflow: hidden; }
.page-head__band { position: absolute; left: -10%; right: -10%; top: calc(var(--nav-h) + 40px); height: 90px; transform: rotate(-8deg);
  background: var(--ink) repeating-linear-gradient(var(--cut), var(--hatch) 0 2px, transparent 2px 9px); }
.badge { position: relative; width: min(var(--badge-w), 85vw); display: grid; grid-template-columns: 1fr auto; align-items: end; gap: 0 var(--space-4);
  padding: var(--space-4) var(--space-8) var(--space-4) var(--space-6); background: var(--accent); color: var(--on-accent);
  border-radius: 0 var(--radius-pill) var(--radius-pill) 0; }
.badge--blue { background: var(--accent-blue); }
.badge h1 { margin: 0; font: 700 1rem/1.2 var(--font-body); }
.badge span { grid-column: 1; font: 700 var(--text-2xs)/1 var(--font-body); letter-spacing: .12em; }
.badge b { grid-column: 2; grid-row: 1 / 3; font: 400 var(--text-num)/.85 var(--font-display); }
.watermark { position: absolute; right: -2vw; top: calc(var(--nav-h) + 10px); margin: 0; white-space: nowrap; pointer-events: none;
  font: italic 400 var(--text-mark)/1 var(--font-display); color: var(--watermark); }
```

## Barre d'onglets (pilule noire, actif en parallélogramme)

**Rôle** : filtrer une liste (Dernières / Actus / Événements / Avis).
**Anatomie** : une pilule `--ink-2` contenant 4 onglets (Inter 700 14px `--muted-dark`) ; l'onglet actif est un **parallélogramme blanc** incliné (`--skew-tab`), texte noir non incliné.

| État | Rendu |
|---|---|
| Repos | texte `--muted-dark` |
| Survol | texte `--on-ink` (300ms `--ease`) |
| Actif (`aria-selected="true"`) | parallélogramme `--surface`, texte `--text` |
| Focus | contour 3px `--accent` |
| Désactivé | opacité .4, `cursor: not-allowed` |

```html
<div class="tabbar" role="tablist" aria-label="Catégories">
  <button role="tab" aria-selected="true">Dernières</button><button role="tab" aria-selected="false">Actus</button>…
</div>
```
```css
.tabbar { display: inline-flex; gap: var(--space-1); padding: 6px; background: var(--ink-2); border-radius: var(--radius-pill); max-width: 100%; overflow-x: auto; }
.tabbar [role="tab"] { position: relative; min-height: 44px; padding: 0 var(--space-6); border: 0; background: none; color: var(--muted-dark);
  font: 700 var(--text-sm) var(--font-body); cursor: pointer; white-space: nowrap; transition: color var(--dur-1) var(--ease); }
.tabbar [role="tab"]::before { content: ""; position: absolute; inset: 4px 0; z-index: -1; background: var(--surface); transform: skewX(var(--skew-tab)) scaleX(0);
  transition: transform var(--dur-2) var(--ease); }
.tabbar [role="tab"] { isolation: isolate; }
.tabbar [role="tab"]:hover { color: var(--on-ink); }
.tabbar [role="tab"][aria-selected="true"] { color: var(--text); }
.tabbar [role="tab"][aria-selected="true"]::before { transform: skewX(var(--skew-tab)) scaleX(1); }
.tabbar [role="tab"]:disabled { opacity: .4; cursor: not-allowed; }
```

## Carrousel bannière (actus)

**Anatomie** : cartes 16:9 de rayon `--radius-md` (≈ 24px observé) qui défilent horizontalement, la carte voisine dépasse à droite ; dessous, des **points** : point inactif `--ink`, point actif lime cerclé (anneau 2px `--ink` + 2px d'écart).
**États** : point au survol = `--stroke` ; focus = contour lime ; défilement auto toutes les 5s (estimé), arrêté au survol, au focus et en mouvement réduit.

```css
.banner { display: grid; grid-auto-flow: column; grid-auto-columns: min(78%, 900px); gap: var(--space-4); overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; }
.banner > a { scroll-snap-align: start; aspect-ratio: 16/9; border-radius: var(--radius-md); overflow: hidden; background: var(--ink); }
.banner img { width: 100%; height: 100%; object-fit: cover; }
.bdots button { width: 12px; height: 12px; padding: 0; border-radius: 50%; border: 0; background: var(--ink); }
.bdots button[aria-current="true"] { background: var(--accent); box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--ink); }
```

## Carte d'actualité de liste (coins asymétriques)

**Rôle** : élément de la grille 3 colonnes de la page Actu & infos.
**Anatomie** (observé) : image 16:9 aux **coins asymétriques** (haut-gauche et bas-droit 24px, autres coins droits : `--radius-asym`) ; ligne méta = date Inter 700 14px + **étiquette catégorie en parallélogramme noir, texte lime 11px** ; titre Inter 700 17px tronqué sur 1 ligne ; extrait gris 12px sur 2 lignes.

| État | Rendu |
|---|---|
| Repos | comme ci-dessus |
| Survol | image `scale(1.05)` (500ms `--ease`), titre souligné |
| Focus | contour 3px `--accent` autour de la carte |
| Désactivé / à venir | image en niveaux de gris, étiquette « Bientôt » |

```html
<a class="ncard" href="#">
  <span class="ncard__img"><img src="…" alt="…" width="640" height="360" loading="lazy"></span>
  <span class="ncard__meta"><time datetime="2026-10-01">2026/10/01</time><i class="tag">Événements</i></span>
  <strong class="ncard__title">Titre tronqué sur une ligne</strong>
  <span class="ncard__ex">Extrait sur deux lignes maximum…</span>
</a>
```
```css
.ncard { display: grid; gap: var(--space-2); color: var(--text); text-decoration: none; min-width: 0; }
.ncard__img { aspect-ratio: 16/9; overflow: hidden; border-radius: var(--radius-asym); background: var(--ink); }
.ncard__img img { width: 100%; height: 100%; object-fit: cover; transition: transform var(--dur-3) var(--ease); }
.ncard:hover img { transform: scale(1.05); }
.ncard__meta { display: flex; align-items: center; gap: var(--space-3); font: 700 var(--text-sm) var(--font-body); }
.tag { padding: 2px 10px; background: var(--ink-2); color: var(--accent); font: normal 700 11px/1.4 var(--font-body); transform: skewX(var(--skew-tab)); }
.ncard__title { font: 700 var(--text-card)/1.3 var(--font-body); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ncard__ex { font-size: var(--text-xs); color: var(--muted); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
```

## En-tête d'article

**Anatomie** (observé) : titre centré Inter 700 28px (`--text-article`) ; dessous, une **barre pilule noire** sur toute la largeur du contenu : fil d'Ariane blanc à gauche (« Actu & infos › Actus »), date `--muted-dark` à droite ; corps centré 13px. Largeur de lecture ≈ 760px (estimé).

```css
.article h1 { text-align: center; font: 700 var(--text-article)/1.25 var(--font-body); }
.crumbbar { display: flex; justify-content: space-between; gap: var(--space-4); padding: var(--space-3) var(--space-6); background: var(--ink-2); color: var(--on-ink); border-radius: var(--radius-pill); font: 700 var(--text-xs) var(--font-body); }
.crumbbar time { color: var(--muted-dark); }
```

## Onglet latéral « Retour »

**Anatomie** : languette fixée au bord droit, noire, bord gauche arrondi (12px), texte vertical lime « RETOUR » (Anton) et flèche ↑. Variante de la pagination latérale de l'accueil.
**États** : survol = fond lime / texte noir (300ms) ; focus = contour lime décalé ; masquée sous 1023px (remplacée par un lien en haut de l'article).

## Coverflow « Univers du jeu »

**Rôle** : parcourir les lieux / factions de l'univers.
**Anatomie** (observé) : fond = image plein écran **floutée** (`blur(16px)`) + voile `--veil` ; au centre une grande **carte noire** (rayon `--radius-lg`, 16px) : emblème en haut, titre condensé blanc ~40px (Anton), sous-titre lime, image en **bandes diagonales** (l'image est découpée en 3–4 bandes inclinées à 45° séparées par des filets noirs) ; à gauche et à droite, les cartes voisines **plus petites et assombries** ; flèches ← → dans des **pilules noires à contour blanc** collées aux bords de l'écran.

| État | Rendu |
|---|---|
| Carte centrale | `scale(1)`, opacité 1, `z-index` le plus haut |
| Voisines | `scale(.78)`, `brightness(.45)`, décalées de ±62 % |
| Survol d'une voisine | `brightness(.7)` ; clic = elle devient centrale |
| Flèches survol | fond `--accent`, texte noir |
| Flèches désactivées (bout de liste) | opacité .35 |

```css
.cover { position: absolute; left: 50%; top: 50%; width: min(520px, 80vw); aspect-ratio: 4/5; border-radius: var(--radius-lg); overflow: hidden; background: var(--ink);
  transform: translate(calc(-50% + var(--x, 0%)), -50%) scale(var(--s, 1)); filter: brightness(var(--b, 1)); transition: transform var(--dur-4) var(--ease), filter var(--dur-4) var(--ease); }
.cover[data-pos="-1"] { --x: -62%; --s: .78; --b: .45; } .cover[data-pos="1"] { --x: 62%; --s: .78; --b: .45; }
.cover__strips { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; transform: skewX(calc(var(--cut) * -0.3)); }
.cf-arrow { min-width: 56px; min-height: 44px; border-radius: var(--radius-pill); background: var(--ink-2); color: var(--on-ink); border: 2px solid var(--on-ink); }
```

## Fiche personnage

**Anatomie** (observé), sur béton :
1. Rendu du personnage à gauche (image réelle détourée, `data-slot="character-render"`), qui touche le bas de l'écran.
2. À droite : **nom énorme** Anton/Inter 700 ~48px noir (`--text-name`) avec, derrière, le **même nom en filigrane** géant `--watermark`.
3. **Pilule de doublage** : pilule `--ink-2`, icône micro dans un cercle, nom du doubleur, **interrupteur JP / EN** (deux segments, l'actif en lime).
4. **Citation** en Inter 700 16px.
5. Texte gris 13px dans un **bloc défilant** (hauteur fixe ≈ 160px) avec une barre de défilement fine (3px, pouce `--ink`).
6. Colonne de droite : **cartes noires verticales** (≈ 90×150px, rayon `--radius-sm`) portant un emblème (image), une par faction ; active = contour lime ; puis un bouton pilule lime « Plus de factions ».

**États** : interrupteur JP/EN = `role="radiogroup"` ; segment actif lime, survol `--stroke`, focus contour lime. Cartes faction : survol `translateY(-4px)`, actif contour 3px `--accent`.

```css
.va-pill { display: inline-flex; align-items: center; gap: var(--space-3); padding: 6px 6px 6px 8px; background: var(--ink-2); color: var(--on-ink); border-radius: var(--radius-pill); font: 700 var(--text-xs) var(--font-body); }
.va-switch { display: inline-flex; background: var(--field); border-radius: var(--radius-pill); }
.va-switch button { min-width: 44px; min-height: 32px; border: 0; border-radius: var(--radius-pill); background: none; color: var(--muted-dark); font: inherit; }
.va-switch button[aria-checked="true"] { background: var(--accent); color: var(--on-accent); }
.bio { max-height: 160px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: var(--ink) transparent; color: var(--muted); }
```

## Newsletter du bas de page

**Anatomie** (observé), sur `--ink` : rangée d'icônes réseaux grises (cercles 36px) ; titre « M'abonner aux messages » Inter 700 26px `--on-ink`, texte `--muted-dark` ; **champ pilule sombre** `--field` (texte blanc, placeholder `--muted-dark`) + **bouton pilule lime** « M'abonner maintenant » texte noir ; **case à cocher** de consentement avec lien lime « Détails >> ».

| État | Rendu |
|---|---|
| Champ focus | contour 2px `--accent` |
| Champ invalide | contour 2px `--accent`, message lime sous le champ « Adresse invalide » (le lime est lisible sur noir) |
| Bouton survol | `filter: brightness(1.08)` ; désactivé tant que la case n'est pas cochée (opacité .45) |
| Case cochée | carré lime, coche noire |

```css
.nl { display: grid; gap: var(--space-4); max-width: 640px; }
.nl h2 { margin: 0; font: 700 1.625rem/1.2 var(--font-body); color: var(--on-ink); }
.nl__row { display: flex; gap: var(--space-2); flex-wrap: wrap; }
.nl input[type="email"] { flex: 1 1 220px; min-height: 48px; padding: 0 var(--space-6); border: 2px solid transparent; border-radius: var(--radius-pill); background: var(--field); color: var(--on-ink); font: 400 var(--text-sm) var(--font-body); }
.nl input[type="email"]:focus { outline: none; border-color: var(--accent); }
.nl button { min-height: 48px; padding: 0 var(--space-6); border: 0; border-radius: var(--radius-pill); background: var(--accent); color: var(--on-accent); font: 700 var(--text-sm) var(--font-body); }
.nl button:disabled { opacity: .45; }
.nl input[type="checkbox"] { accent-color: var(--accent); width: 18px; height: 18px; }
.nl a { color: var(--accent); }
```
