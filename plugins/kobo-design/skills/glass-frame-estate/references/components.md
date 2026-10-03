# Glass Frame Estate — composants

Toutes les valeurs viennent de `tokens.css`. Les dimensions citées sont **mesurées** sur le site de référence à 1440px, sauf mention « proposé ». Le code complet de chaque composant est dans `examples/demo.html`.

## Règles communes

- **Tout est en capitales**, sauf les paragraphes et les champs. Titres en Inter 500, interligne 1.1, approche −0.02em.
- **Libellé** (`.label`) : 16px / 16px, graisse 500, capitales, sans approche (14px en mobile). Il sert à la navigation, aux surtitres, aux boutons, aux étiquettes, aux puces.
- **Surtitre** : un libellé précédé de `// ` (« // À PROPOS »), 18px au-dessus du titre.
- Trois rayons : 10px (cartes, photos, verre), 6px (photo dans une carte), 4px (boutons, étiquettes, puces, champs, FAQ).
- Trois fonds : blanc, `--surface`, noir. Aucune ombre portée, aucune couleur.

## Cadre du héros

```html
<header class="hero">
  <img class="hero-back" alt="" src="…&w=480&blur=160">   <!-- même photo, floutée par le serveur -->
  <div class="frame">
    <div class="shot"><img alt="…" src="…"></div>             <!-- photo entière -->
    <p class="word" aria-hidden="true">Halden</p>            <!-- mot-marque -->
    <div class="shot front" aria-hidden="true"><img alt="" src="…"></div>   <!-- la maison seule, détourée -->
    <nav class="top">…</nav>
    <div class="hero-body">…</div>
  </div>
</header>
```

- `.hero` : padding `--frame-inset`, fond = photo floutée. `.frame` : filet 1px `--frame-line`, rayon `--r-frame`, hauteur `100svh − 2 × marge` (640px au moins), `overflow: hidden`.
- `.frame::after` : voile `--veil` (mesuré) + dégradé `--shade-0` → `--shade-1` sur la moitié basse (proposé, pour le contraste du titre).
- **Le cadre vient du shot** (mise en scène de la maquette) ; le site, lui, est plein écran. Marge proposée : 8 à 20px.

## Mot-marque derrière la maison

280px, graisse 600, approche −0.04em, centré, à 100px du haut. Couleur transparente, `background-clip: text` avec `linear-gradient(0deg, var(--word-to) 19%, var(--word-from) 100%)` : net en haut, effacé en bas.

Il passe **derrière le bâtiment** : la photo est posée deux fois avec exactement la même géométrie (`.shot`), la copie du dessus est découpée au contour du bâtiment par `clip-path: polygon(…)` en pourcentages de l'image. `.shot` garde le ratio de la photo (`aspect-ratio`) et couvre le cadre (`width: max(100%, hauteur × ratio)`), donc le polygone reste juste à toutes les tailles. Voir `assets.md` pour relever le polygone.

Dans le pied de page, le même mot-marque est posé en bas, gradient `--word-dark`, interligne 0.86, coupé par le bord.

## Barre du haut

Logo (signe + nom, 22px, 500) à gauche ; heure locale en `--font-mono` 500 centrée ; ville ; « MENU » + rond blanc de 40px à cinq points. Pas de fond : elle est posée sur la photo et défile avec elle. Sous 810px, l'heure et la ville disparaissent.

## Bouton

| Variante | Fond | Texte | Survol |
|---|---|---|---|
| `.btn` (sur photo, sur noir) | `--surface` | noir | fond noir, texte blanc |
| `.btn.ink` (sur clair) | noir | blanc | fond `--surface`, texte noir |
| `.btn.line` (secondaire) | blanc, contour `--rule` | noir | fond noir, texte blanc |

50px de haut, rayon 4px, padding 13 / 12 / 13 / 18, libellé à gauche et flèche à droite séparés d'au moins 80px (`justify-content: space-between`) : le bouton est **large** (238px dans le héros). `.more` : lien texte + flèche, 44px de haut.

## Cellules en verre (conseiller)

Deux cellules accolées en bas à droite du héros : portrait (160 × 140, padding 10px, photo rayon 6px) et appel (259 × 140 : téléphone 24px + bouton).

```css
.cell { border-radius: var(--r-card); background: var(--glass);
  backdrop-filter: blur(var(--blur-glass));
  box-shadow: inset 1.5px 1.5px 1px var(--glass-edge), inset -1.5px -1.5px 1.5px var(--glass-edge); }
```

Le verre est presque invisible : c'est le **liseré intérieur blanc** qui le dessine. Repli sans `backdrop-filter` : `--glass-solid`.

## Compteurs et règle graduée

- Compteur : chiffre 48px / 500, suffixe collé (« + », « % »), libellé `--muted` 14px dessous. Chaque chiffre est une colonne 0–9 qui défile (`.odo`).
- Règle (`.ruler`) : bande de 16px, graduations de 1px `--tick` tous les 10px (10px de haut) et tous les 50px (16px de haut), en `repeating-linear-gradient`. Elle sépare deux sections blanches à la place d'un filet.

## Carte d'annonce

Photo 580 × 460 rayon 10px ; en haut à gauche (20px), **deux étiquettes** de 34px : lieu (fond blanc, pictogramme épingle) et statut (fond noir, texte blanc). Dessous : nom 20px à gauche, prix à droite ; puis des **puces** de 32px à contour (chambres, bains, surface) avec pictogramme. Toute la carte est cliquable (`a::after`). Grille 2 colonnes, 40px entre colonnes, 30px entre rangées.

## Ligne de service (sur noir)

Numéro « 01. » (libellé, aligné en haut) · titre 32px sur 300px · trois vignettes 80px rayon 6px · « VOIR LE DÉTAIL » à droite. Padding vertical 40px, filets `--rule-dark`. Au survol : fond blanc, texte noir.

## Carte de quartier

290 × 320, fond `--surface`, padding 10px, photo rayon 6px, libellé avec épingle dessous. Quatre par rangée, écart 10px.

## Carte d'étape

1200 × 380, fond noir, padding 10px, rayon 10px : photo à gauche (470px, rayon 6px), à droite le numéro en haut et, en bas, titre 32px + phrase `--soft`. Les cartes sont empilées dans `.deck` ; voir `motion.md`.

## Témoignages (mosaïque)

Grille 3 colonnes, écart 10px, cartes de 428px de haut, **en damier** : carte photo / carte texte / carte photo, puis l'inverse.
- Carte texte : fond `--surface`, padding 30px, citation-titre 20px, texte `--muted`, en bas vignette 44px + nom + qualité.
- Carte photo : portrait plein cadre, dégradé noir sur la moitié basse, citation et « — Nom · Lieu » en blanc.

## Carte d'agent

Portrait 380 × 399 rayon 10px. Au survol ou au focus, une carte blanche (retrait 10px, padding 30px) le recouvre : nom, rôle, liens « Fb / Ig / Ln ». Sur écran tactile, la carte devient un bandeau blanc fixe en bas du portrait (proposé).

## Formulaire

Panneau `--surface`, padding 30px, rayon 10px ; champs blancs de 48px, rayon 4px, libellé au-dessus ; bouton noir sur toute la largeur. Focus : contour noir 1px.

## Carte d'article

Fond `--surface`, padding 10px. Grande carte : photo en haut, puis « CATÉGORIE | date » et titre 24px. Petites cartes : photo à gauche, texte à droite, lien « LIRE → ».

## FAQ

Lignes blanches sur `--surface`, rayon 4px, padding 22 / 20, écart 10px ; question en libellé, chevron à droite. Une seule réponse ouverte (`aria-expanded`). À gauche du bloc : titre et mini-carte blanche du conseiller (photo 76px, nom, téléphone).

## Appel final et pied

- Appel : carte photo de 500px, rayon 10px, dégradé `linear-gradient(270deg, transparent 12%, noir 103%)` (mesuré), surtitre, titre 48px, bouton clair.
- Pied : noir, photo d'immeuble en niveaux de gris à 28 % d'opacité, quatre colonnes, ligne légale, mot-marque géant.

## Menu plein écran

Voile sombre, liens 32px / 500 centrés, 30px d'écart ; « MENU » devient « FERMER ». `role="dialog"`, `inert` quand il est fermé, Échap ferme, le focus va sur « Fermer » puis revient sur « Menu ».

## Accessibilité

- Texte blanc toujours sur `--shade`, noir ou un dégradé noir ; jamais sur le ciel.
- Cibles de 44px au moins (menu, liens du pied, réseaux des agents).
- Le mot-marque et la copie détourée de la photo sont `aria-hidden`.
- Focus visible : contour 2px de la couleur du texte.
