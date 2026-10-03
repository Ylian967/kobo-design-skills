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

Toutes les vignettes, fiches et chapitres contiennent une **image réelle** (art du projet ou photo), teintée selon `references/assets.md` ; jamais un dégradé ou un dessin à la place.

---

# Relevés sur le site en ligne (2026-10-03)

Le site refuse les fenêtres étroites (écran « RESIZE ») ; il a été mesuré en **1440×900 émulé** (navigateur intégré), sur toute sa hauteur (16 410px). Valeurs **mesurées** (styles calculés) sauf mention.

## Écran « résolution non prise en charge » (observé)

Sous une certaine largeur, la page est remplacée par une phrase en grotesque 20px (« Votre résolution n'est pas prise en charge. **Agrandissez la fenêtre…** », seconde moitié en gras) et le mot **« RESIZE »** en police hexagonale noire géante en bas, sur blanc, avec le bouton menu (deux traits) en haut à gauche. Le skill préfère une vraie version mobile, mais cet écran est un bon modèle d'état « non pris en charge ».

## Échelle typographique fluide (mesurée)

| Rôle | Taille à 1440px | Réglages |
|---|---|---|
| Paragraphe | 13.5px | ABC Whyte Plus 400, −0.02em, blanc ou noir |
| Récit long | 18.9px | 400 |
| Phrase-chapitre | 46.8px | **650**, capitales, une idée par écran, alternance noir sur blanc / blanc sur sombre |
| Manifeste | 135.9px | interligne 0.84, approche −0.094em (police variable, 350 mesuré sur la ponctuation) |
| Grand numéro | 369px | **Hexaframe 700** (police hexagonale) : « 03 », « 07 », « 10 » qui défilent comme un compteur |
| Mot-titre de section | 273.6px | Hexaframe 700 (« GARDIENS ») |
| Micro-label | 9.9px / 8.1px | IBM Plex Mono 400–450, capitales |
| Navigation | 11px | IBM Plex Mono 450 capitales ; menu 12.6px −0.04em |

## Libellés doublés (survol en roulement)

Chaque lien de navigation existe **deux fois** dans le DOM (une copie en casse normale à opacité 0, une en capitales visible) : au survol, la ligne visible glisse vers le haut et la copie la remplace (effet de rouleau). Reproduire avec deux `span` empilés dans un conteneur `overflow: hidden`.

## Texte qui se décode (observé dans le DOM)

Les micro-labels et le pied de page apparaissent **lettre par lettre** avec des caractères aléatoires qui se fixent (états intermédiaires lus dans le DOM, du type « DISCOVgVjq ») : effet terminal sur tout le texte mono à l'entrée dans l'écran. Les mots en mono sont découpés en **une lettre par élément** pour l'animation.

## Indexation « 01K / 02P / 03R »

Devant chaque mot du manifeste : un index mono 9.9px (numéro + initiale du mot), aligné en haut du mot géant.
