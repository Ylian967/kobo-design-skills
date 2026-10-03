# Hyper Lime Street — mises en page

## Principes

- Navigation noire fixe 60px. Pagination latérale fixe à droite.
- Le fond est `--bg`. Chaque section mesure ≈ 117px de padding vertical et est numérotée.
- Les sections alternent : contenu à gauche + numéro à droite, puis l'inverse. Les rubans noirs font la liaison en diagonale.
- Points de rupture mesurés : 1025px / 1024px (desktop), 1024–1365px, ≤ 1023px (mobile), ≤ 374px (petit mobile).

## Héros (section 01)

Image réelle plein cadre (key art du projet ou photo de rue, voir `assets.md`) dans un rectangle légèrement **incliné** (le bord gauche part en biais), logo du jeu en bas à gauche qui déborde, boutons des stores (noirs, rayon 8px) en bas à droite. Fond béton autour.

## Sections 02 → 06

Structure type :
```
┌──────── ruban noir rayé (72px, coupe 45°) ───────┐
│  bloc lime numéroté    │   contenu (blanc)        │
└──────── pellicule en diagonale ──────────────────┘
```
- **Personnages** : grande image réelle à droite (duotone noir → lime sur le bloc numéroté, voir `assets.md`), carrousel de vignettes en bas à gauche, bouton pilule à droite.
- **Vidéos** : image de la vidéo en fond, bande d'infos sombre translucide par-dessus (étiquette lime, date, titre), carrousel de vignettes, numéro « 03 » dans le bloc lime à droite.
- **Actus** : carte d'actualité dans un panneau blanc, bloc lime à gauche.
- **Univers** : grande image à coins 24px, texte court, bouton pilule.

## Pied de page

Ruban noir pleine largeur, liens Inter 12px gris, réseaux en icônes rondes, défilant lime en haut du pied.

## Gabarits des pages internes

Toutes les pages internes partagent : navigation noire 60px (lien actif = pilule blanche), **badge de section** en haut à gauche sur sa bande diagonale rayée, **filigrane** du mot anglais à droite, contenu dans une colonne de ≈ 1200px (estimé) sur béton, bas de page `--ink` avec newsletter. Composants : `components.md` § « Composants des pages internes ».

### Actu & infos (liste) — exemple : `examples/actus.html`
```
nav
┌ badge 04 ─┐ ╱╱ bande rayée ╱╱             NEWS & INFO (filigrane)
carrousel bannière 16:9 (r 24px) ── carte suivante qui dépasse
• • ◉ • •   (points)
[ Dernières ▱ Actus  Événements  Avis ]   ← barre d'onglets pilule noire
┌ carte ┐ ┌ carte ┐ ┌ carte ┐   grille 3 colonnes, gouttière 24px (estimé)
┌ carte ┐ ┌ carte ┐ ┌ carte ┐
       [ Charger plus › ]        ← bouton pilule à gros contour
bas de page : réseaux · newsletter
```
- Grille : `repeat(3, minmax(0, 1fr))`, gap 32px vertical / 24px horizontal (estimé) ; 2 colonnes de 768 à 1023px, 1 colonne en dessous.

### Article
- Badge 04 réduit (même page parente), puis colonne centrée ≈ 760px : titre centré 28px → barre pilule noire (fil d'Ariane / date) → image de tête à coins asymétriques → texte centré 13px.
- Onglet latéral fixe « Retour » au bord droit.

### Univers du jeu (coverflow)
- Pas de béton : fond = image du lieu actif **floutée** plein écran + voile `--veil` ; la navigation reste noire.
- Badge 05 en haut à gauche (sur la bande rayée), filigrane « WORLD » en `--watermark-ink`.
- Coverflow centré verticalement (hauteur ≈ 70vh) ; flèches en pilules aux bords gauche et droit ; points de pagination dessous.
- Le fond flouté change en fondu croisé quand la carte centrale change.

### Personnages (fiche)
```
nav
┌ badge 02 (BLEU) ┐                         NOM (filigrane géant)
 ┌───────────────┐   NOM 48px                     ┌──┐
 │ rendu du      │   [🎙 doubleur  JP|EN ]         │▮ │ cartes
 │ personnage    │   « citation »                  │▮ │ factions
 │ (détouré)     │   ┌ bio défilante ┐             │▮ │
 └───────────────┘   └───────────────┘             [Plus de factions]
 ‹ vignettes des autres personnages (carrousel parallélogrammes de l'accueil) ›
```
- Grille `minmax(0, 5fr) minmax(0, 6fr) 110px` (estimé). Le badge est en `--accent-blue` sur cette page uniquement.

### Documents vidéo (03)
- Observé : badge 03 et filigrane « VIDEO » seulement. Proposé pour le reste (non relevé) : lecteur 16:9 à coins asymétriques en tête, puis grille de vignettes 3 colonnes reprenant la carte de liste (étiquette « Bande-annonce », « Musique »…).

## Mobile

**Ce qui a été observé** : rien de fiable. Le site de référence sert une version mobile distincte selon l'appareil (détection du navigateur) ; dans une fenêtre de 390px on ne voit que la version bureau réduite. Les règles ci-dessous sont donc une **adaptation proposée**, cohérente avec les points de rupture mesurés (≤ 1023px, ≤ 374px), pas un relevé.

### Accueil et commun (≤ 1023px)

- Navigation : logo + bouton télécharger + menu burger ; liens dans un tiroir noir avec pilule blanche pour l'actif.
- Pagination latérale masquée.
- Sections empilées : bloc lime numéroté en haut (numéro 72px), contenu dessous ; rubans réduits à des bandes de 40px de haut entre les sections.
- Rayon des pistes réduit à 36px, coupes conservées.

### Pages internes (≤ 1023px, proposé)
- **Badge** : largeur 100 % − 16px, numéro 64px ; la bande rayée passe à 48px de haut et 6° ; filigrane réduit à `4rem` et coupé par le bord (jamais de défilement horizontal : `overflow: hidden` sur l'en-tête).
- **Onglets** : la pilule défile horizontalement (`overflow-x: auto`, sans barre visible), l'onglet actif reste en parallélogramme.
- **Carrousel bannière** : une carte à 88 % de la largeur, la suivante dépasse de 12 %.
- **Grille d'actus** : 1 colonne, image pleine largeur ; extrait limité à 2 lignes.
- **Article** : texte aligné à gauche (le centré devient pénible sur 12 lignes étroites), onglet « Retour » remplacé par un lien en haut.
- **Univers** : carte centrale à 80vw, voisines masquées (glisser au doigt), flèches en bas sous la carte.
- **Personnage** : rendu en haut (60vh, détouré), puis nom, pilule de doublage, citation, bio sans hauteur fixe ; cartes factions en rangée horizontale défilante.
- **Newsletter** : champ et bouton empilés pleine largeur, cibles 48px.
- **≤ 374px** : nav réduite au logo + burger (le bouton Télécharger passe dans le tiroir).
