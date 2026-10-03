# Acid Scan Security — composants

Toutes les valeurs viennent de `tokens.css`. Code complet dans `examples/demo.html`. « Relevé » = vu sur l'image de référence ; « proposé » = ajouté par le skill pour faire une page complète.

## 1. Navigation (relevé)

Barre de 72px **sans fond** posée sur la photo, grille 3 colonnes :
- **Logo** à gauche (marge `--edge`) : anneau épais + nom en Inter 500 17px capitales, `--text`. L'anneau extérieur pointillé tourne lentement (6s).
- **Liens** centrés : Inter 600 12px capitales, interlettrage `--tracking-nav` (.14em), `--text`, écart ≈ 46px. Survol : filet `--signal` qui s'étire dessous.
- **Bouton** collé au bord droit et au bord haut, **aussi haut que la barre** (≈ 214 × 72px) : fond clair translucide `--glass-a` + flou, filet gauche `--line`, texte Inter 600 12px. Survol : aplat `--signal` qui monte, texte `--on-signal`.
- Après le héros : la barre prend un fond `--bg` à 88 % flouté et un filet bas ; le bouton passe à `--glass` opaque.
- Mobile : logo + bouton « Menu » (deux traits) ; les liens et le bouton passent dans le menu.

## 2. Photo de scan en couches (signature, relevé)

Une seule photo réelle, **4 versions superposées** au même endroit :

| Couche | Rôle | Couleurs | Découpe |
|---|---|---|---|
| `layer--base` | l'image principale | rampe verte `--void → --deep → --mid → --hot` (+30 % `--text` dans les plus hautes lumières) | bords gauche/droit fondus |
| `layer--ghost` | frange rouge du vieux moniteur | `--ghost` là où l'image est sombre, transparent ailleurs ; décalée de `--rgb-shift` (6px) | aucune |
| `layer--band` | bande plus lumineuse sur les yeux, décalée de 12px vers la droite (effet « tranche glissée ») | rampe chaude `--deep → --hot → --signal` | `clip-path: inset()` : de 40 % à 74 % de la largeur, ≈ 6 % de la hauteur |
| `layer--box` | intérieur jaune du cadre de détection | rampe jaune autour de `--signal` | moitié haute du cadre (au-dessus du réticule) |

Positionnement commun : `--ix`, `--iy`, `--ih` calculés en JS pour que **l'œil gauche de la photo (à l'écran) tombe sur le croisement du réticule** (50 % ; `--eye-y` 36 %), un peu au-dessus de la ligne. Réglages par photo : `data-eye="x y"` (position de l'œil en fractions de la photo) et `data-scale` (hauteur de la photo / hauteur du héros, ≈ 1,3).

Par-dessus : **chiffres binaires** (`.bits`, 0/1 en mono 7px tous les 9px, `--bits-opacity` 10 %), **lignes de balayage** tous les 3px (`--void` à 22 %), **voiles** : assombrissement `--veil` derrière le titre (bas gauche) et le paragraphe (haut droit), dégradé vers `--bg` en bas.

```html
<div class="rig" role="img" aria-label="Portrait … traité en vert, bande de scan sur l'œil">
  <div class="layer layer--base"><img crossorigin="anonymous" src="…" alt="" fetchpriority="high"></div>
  <div class="layer layer--ghost" aria-hidden="true"><img crossorigin="anonymous" src="…" alt=""></div>
  <div class="layer layer--band" aria-hidden="true"><img crossorigin="anonymous" src="…" alt=""></div>
  <div class="layer layer--box" aria-hidden="true"><img crossorigin="anonymous" src="…" alt=""></div>
</div>
```
Les `<img>` sont remplacées au chargement par des canvas déjà colorés (voir `motion.md`, « Photo en 4 couches »).

## 3. Réticule et cadre de détection (signature, relevé)

- **Réticule** : un filet vertical à 50 % sur toute la hauteur, un filet horizontal à `--eye-y` sur toute la largeur, couleur `--line` (blanc-vert à 22 %).
- **Cadre** : carré ≈ 8,4 % de la largeur (121px à 1440, 72–132px), contour 1px `--signal` à 70 % ; **moitié haute remplie** par la couche jaune ; **trait `--signal` de 2px** qui déborde de 6 % de chaque côté, exactement sur le réticule horizontal.
- **Lecture** (proposé) : « ID 07 · 98,6 % » en mono 10px `--signal` à droite du cadre, masquée en mobile.

## 4. Surtitre pixel (relevé)

« CHIFFREMENT / GRADE MILITAIRE » : VT323 `--fs-label` (≈ 33px), interligne .9, capitales, couleur `--label` (jaune-citron), à gauche à 27 % de la hauteur. Se décode à l'entrée.

## 5. Paragraphe d'intro (relevé)

Inter 400 `--fs-intro` (≈ 18px) / 1.6, `--text-2`, ≈ 383px de large, placé à 68 % de la largeur et 17,5 % de la hauteur. Lignes allumées une à une.

## 6. Titre pixel 3 lignes (relevé)

VT323 `--fs-hero` (≈ 106px à 1440, limité par la hauteur d'écran), interligne `--lh-hero` 1 (les accents français ont besoin de place), capitales, **lignes 1–2 en `--text`, ligne 3 en `--muted`**, léger halo `--hot` à 30 %. Ancré en bas à gauche (14 % du bas). Lignes de 14 caractères maximum. Chaque ligne a `aria-hidden`, le `<h1>` porte le vrai texte en `aria-label`.

## 7. Carte CTA cadenas (relevé)

Carré `--cta-size` (186px ; 132px en mobile), dégradé vertical `--deep → --panel`, cadenas au trait 24 × 28px + libellé Inter 600 12px capitales centrés, `--text`. **Crochets d'angle en L** `--bracket` (32px, 1,5px) écartés de `--cta-gap` (14px). Survol : crochets collés à la carte, lueur `--hot` qui balaie la carte, anse du cadenas qui se soulève.

## 8. Crochets d'angle (relevé)

Huit dégradés d'une couleur en `background`, sans élément en plus. Variables `--c` couleur, `--l` longueur, `--w` épaisseur.

```css
.brackets { --c: var(--bracket); --l: var(--bracket-len); --w: var(--bracket-w);
  background:
    linear-gradient(var(--c), var(--c)) top left / var(--l) var(--w) no-repeat, linear-gradient(var(--c), var(--c)) top left / var(--w) var(--l) no-repeat,
    linear-gradient(var(--c), var(--c)) top right / var(--l) var(--w) no-repeat, linear-gradient(var(--c), var(--c)) top right / var(--w) var(--l) no-repeat,
    linear-gradient(var(--c), var(--c)) bottom left / var(--l) var(--w) no-repeat, linear-gradient(var(--c), var(--c)) bottom left / var(--w) var(--l) no-repeat,
    linear-gradient(var(--c), var(--c)) bottom right / var(--l) var(--w) no-repeat, linear-gradient(var(--c), var(--c)) bottom right / var(--w) var(--l) no-repeat; }
```
Mettre les crochets sur un `<span>` à part (position absolue) quand l'élément a déjà un fond.

## 9. Composants des sections (proposé)

| Composant | Description |
|---|---|
| **Surtitre de section** | VT323 `--fs-label` `--label` + carré 8px qui clignote |
| **Titre de section** | VT323 `--fs-h2`, interligne 1, 2 lignes, la seconde en `--muted` ; décodé à l'entrée |
| **Bandeau de mesures** | 4 cellules séparées par des filets `--line-solid` ; chiffre VT323 `--fs-stat` qui monte ; jauge segmentée ; étiquette mono `--dim`. Mobile 2 × 2 |
| **Jauge segmentée** | segments de 8px de haut, écart 3px, `--line-solid` éteints, `--hot` allumés, dernier allumé `--signal` |
| **Carte de couche** | fond `--deep`, filet `--line-solid`, image 4:3 en rampe verte avec lignes de balayage et étiquette `--signal` « COUCHE 01 » ; corps : index mono, titre VT323, texte `--text-2`. Survol : crochets, ligne de scan jaune sur l'image |
| **Champ terminal** | 52px, fond `--panel`, filet `--line-solid`, invite `>_` `--signal`, saisie mono ; focus : filet `--signal` ; erreur : message `--label` + `aria-invalid` |
| **Bouton plein** | 52px, fond `--signal`, texte `--on-signal` Inter 600 12px capitales, carré 6px ; survol : aplat `--text` qui glisse |
| **Journal** | panneau `--panel` à crochets, barre (adresse + état), lignes mono 12px / 2 (heure `--dim`, statut `--text`, ALERTE `--label`), curseur qui clignote, jauge 24 segments ; `role="log" aria-live="polite"` |
| **Fiche d'identité** | portrait 3:4 en rampe verte avec réticule, liste mono (Agent, Accès, Clé, Statut) |
| **Bandeau final** | fond radial `--mid → --deep → --bg`, chiffres binaires, titre VT323 géant centré, bouton plein, crochets autour |
| **Pied** | mono `--dim`, filet haut |

## États

- **Chargement de la page** : amorçage terminal puis allumage (voir `motion.md`).
- **Image absente** : le héros garde son dégradé vert (`.hero.no-img`), le texte reste lisible.
- **Canvas refusé** (image sans CORS) : les `<img>` gardent le filtre SVG de repli.
- **Formulaire** : vide (« En attente d'une cible » + curseur), en cours (`aria-busy`, « ● Analyse » en `--signal`), erreur (message `--label`, focus renvoyé), terminé (« ● Terminé »).
- **Focus clavier** : contour 1px `--signal` décalé de 3px partout.
