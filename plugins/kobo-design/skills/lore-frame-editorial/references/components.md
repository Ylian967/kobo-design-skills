# Lore Frame Editorial — composants

## Cadre et rail (signature)

```css
.frame { position: fixed; inset: var(--frame-inset); border: 1px solid var(--frame); pointer-events: none; z-index: 40; transition: border-color var(--dur) var(--ease); }
.frame::before { content: ""; position: absolute; top: 0; bottom: 0; left: var(--rail); border-left: 1px solid var(--frame); }      /* rail gauche */
.frame::after  { content: ""; position: absolute; left: 0; right: 0; top: var(--nav-h); border-top: 1px solid var(--frame); }      /* ligne de nav */
body.is-dark .frame, body.is-dark .frame::before, body.is-dark .frame::after { border-color: var(--frame-dark); }
```
Le rail contient l'**étoile-boussole** au milieu (SVG 24px, 4 branches fines + losange central), un burger 16px en haut et un numéro de chapitre mono en bas.

## Navigation mono

Centrée dans la bande du haut : `• PROJET   LE DONJON   FACTIONS   LE MONDE`, IBM Plex Mono 10px capitales, l'actif précédé d'un point et en noir, les autres en `--muted`. À droite : `SE CONNECTER`.

## Manifeste géant

3 mots-lignes en Inter Tight 900, chacun préfixé d'un petit index mono (`01K`, `02P`, `03R`) aligné sur la ligne de base, décalés en escalier vers la droite puis la gauche. Blanc sur illustration.

## Paragraphe d'intro

Colonne 260px en haut à gauche, Inter Tight 500 13px, premier mot en gras (le nom).

## Titre éditorial

Inter Tight 900 capitales 48px max, serré, sur 2 lignes, précédé d'un label mono `• 01`. Un filet horizontal fin sous la bande du titre, qui traverse la page.

## Vignette à coin coupé

```css
.chamfer { clip-path: polygon(0 0, calc(100% - var(--chamfer)) 0, 100% var(--chamfer), 100% 100%, var(--chamfer) 100%, 0 calc(100% - var(--chamfer))); }
```
Variante « onglet » : un coin supérieur cranté (un rectangle de 30 % de la largeur dépasse en haut à gauche, comme un dossier). Les vignettes sont dispersées librement (positions absolues sur grille 12 colonnes), avec un petit label mono collé dessus.

## Logo tracé (chargement)

Le logotype dessiné d'un trait fin à main levée (SVG `stroke-dasharray`) se trace sur fond blanc, puis les traits s'épaississent jusqu'aux lettres pleines. Lettres arrondies, irrégulières.

## Terminal « initialisation »

Bloc mono qui défile ligne par ligne : `// INITIALISATION`, `NOUVEAUX FICHIERS DANS LA BASE`, puis des noms de personnages/lieux qui s'écrivent en tapant. Sert de transition vers la section factions.

## Fiche de faction

Grande illustration à coin coupé à droite, nom en Inter Tight 900, 3 lignes de lore, badge mono `FACTION · 02`, lueur `--signal` sur un détail (contour 1px).

## Indicateur de défilement

Mot `SCROLL` en mono 10px en bas à droite du cadre, avec une petite flèche ↓ qui oscille.

## États

- **Chargement** : logo tracé.
- **Image manquante** : rectangle à coin coupé `--ink` avec label mono `IMAGE · À VENIR`.
