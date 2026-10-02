# Mint Street Basics — composants

Toutes les valeurs viennent de `tokens.css`. Code complet et fonctionnel dans `examples/demo.html`.

## Pilule

- **Rôle** : actions. Hauteur 48px, padding 0 32px, rayon 999px, DM Sans 700 14px, capitales +0.1em, flèche → optionnelle qui avance de 3px au survol (courbe élastique).
- **Variantes** :
  - blanche `--paper` / `--navy` : action du héros (« Explorer ») ;
  - verte `--green-strong` / `--on-green` : achat, inscription.
- **États** : survol (blanche → `--green-light` ; verte → assombrie de 15 % vers le bleu nuit + `--shadow-pop`) ; appui `scale(.97)` ; focus contour 3px `--green-bright` (sur bleu nuit) ou `--green-ink` (sur menthe) ; désactivée opacité .45, curseur interdit ; chargement « Ajout… » + `aria-busy` ; succès « Ajouté ✓ » sur fond `--navy` pendant 1,8s.

```html
<a class="pill pill--paper" href="#shop">Explorer <svg class="ico">…</svg></a>
<button class="pill pill--green" id="add">Ajouter au panier</button>
```
```css
.pill { display: inline-flex; align-items: center; gap: var(--space-2); min-height: var(--control); padding: 0 var(--space-8); border: 0; border-radius: var(--radius-pill);
  font: 700 var(--text-sm)/1 var(--font-body); letter-spacing: var(--tracking-caps); text-transform: uppercase;
  transition: transform var(--dur-fast) var(--ease-out), background var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out); }
.pill:active { transform: scale(.97); }
.pill--paper { background: var(--paper); color: var(--navy); }
.pill--paper:hover { background: var(--green-light); }
.pill--green { background: var(--green-strong); color: var(--on-green); }
.pill--green:hover { background: color-mix(in srgb, var(--green-strong) 85%, var(--navy)); box-shadow: var(--shadow-pop); }
.pill--green[data-state="done"] { background: var(--navy); }
.pill:disabled { opacity: .45; cursor: not-allowed; }
```

## Bouton favori (carré) et boutons icône

- **Favori carré** 48px, rayon 8px, fond `--card`, contour `--line` → `--ink` au survol ; `aria-pressed="true"` remplit l'icône signet.
- **Cœur sur carte** : bouton rond 44px en haut à droite de la carte, rempli de `--green` quand actif.
- **Icônes de la barre** (recherche, compte, panier) : ronds 44px, fond `--navy-2` au survol ; badge du panier `--green-bright` / `--navy` 18px qui rebondit à chaque ajout, nombre aussi dans l'`aria-label`.

## Navigation

Grille `1fr auto 1fr` sur `--navy`, hauteur 76px : logotype « brume. » (DM Serif Display 32px, point en `--green-bright`) | liens en pilules (DM Sans 500 14px, `--muted-inv`, actif ou survol en `--text-inv` sur `--navy-2`) | icônes. Mobile (< 760px) : liens masqués derrière un menu (à ajouter selon le projet), icônes conservées.

## Bandeau défilant

```html
<div class="band" aria-label="Soldes d'automne : livraison offerte dès 60 €…">
  <div class="band__track" aria-hidden="true"><p><span>Soldes d'automne</span>…</p><p>…copie identique…</p></div>
</div>
```
```css
.band { background: var(--green); color: var(--on-green); overflow: hidden; padding: var(--space-4) 0; }
.band__track { display: flex; width: max-content; animation: marquee var(--dur-marquee) linear infinite; }
.band:hover .band__track { animation-play-state: paused; }
.band p { display: flex; gap: var(--space-8); padding-right: var(--space-8); font: 400 var(--text-band)/1 var(--font-display); text-transform: uppercase; white-space: nowrap; }
.band p span::after { content: "✦"; margin-left: var(--space-8); color: var(--navy); }
@keyframes marquee { to { transform: translateX(-50%); } }
```
Le texte reste à 24px minimum (blanc sur vert = grand texte uniquement). Le contenu lisible est dans l'`aria-label`, la piste est masquée aux lecteurs d'écran.

## Arc du héros (signature)

```html
<div class="stage" data-slot="hero-model" role="img" aria-label="…">
  <div class="disc"></div><div class="arc"></div><img class="model" alt="" src="mannequin-detoure.png">
</div>
```
```css
.arc { position: absolute; left: 50%; bottom: -8%; width: min(520px, 92%); aspect-ratio: 1; translate: -50% 0; border-radius: 50%;
  background: conic-gradient(from 210deg, var(--green) 0deg, var(--green-light) 200deg, transparent 205deg 360deg);
  mask: radial-gradient(closest-side, transparent 80%, black 81%); }
.disc { /* disque intérieur légèrement plus clair que le fond */ background: radial-gradient(circle at 50% 40%, color-mix(in srgb, var(--green) 26%, var(--navy)), var(--navy-2) 70%); }
```
Le mannequin est coupé à la taille par le bas du héros (`overflow: hidden`). Une étiquette flottante blanche (« Sweat Nuage · 59 € ») peut pointer le produit porté.

## Chiffres clés

Anton `--text-stat`, « + » en `<span>` `--green-bright`, libellé 12px `--muted-inv` ; deux chiffres séparés par un filet vertical `--line-inv`.

## Puce de filtre

Pilule 44px, contour `--line`, texte `--ink` ; survol contour `--ink` ; active (`aria-pressed="true"`) fond `--navy`, texte `--text-inv`.

## Carte produit

- **Anatomie** : visuel 4:5 rayon 16px (fond `--card` ou `--card-alt` en alternance), vêtement détouré centré à 62 % avec ombre douce ; badge « Nouveau » / « -20 % » en pilule `--navy` en haut à gauche ; cœur en haut à droite ; nom Anton 18px capitales `--navy` ; ligne prix (DM Sans 700, ancien prix barré `--muted`) + pastilles de couleur.
- **États** : survol = visuel qui monte de 4px et vêtement à 1.05 / -2° ; focus sur le lien du nom (zone cliquable étendue à tout le visuel) ; rupture = badge « Épuisé » + pastilles désactivées.
- **Pastilles** : `role="radio"` dans un `radiogroup`, bouton 44×44 transparent, pastille 16px dessinée en `::before` ; choisie = double anneau (`--mint` puis `--navy`). Changer la pastille recolore le visuel.

```css
.swatch { width: var(--target); height: var(--target); background: none; border: 0; display: grid; place-items: center; }
.swatch::before { content: ""; width: 16px; height: 16px; border-radius: 50%; background: var(--c); }
.swatch[aria-checked="true"]::before { box-shadow: 0 0 0 2px var(--mint), 0 0 0 4px var(--navy); }
```

## Puces de taille

Grille de 6 carrés arrondis (8px) de 48px de haut, fond `--card-alt`, DM Sans 500 14px. Survol contour `--ink`. **Choisie** : fond `--card` blanc, contour `--navy`, `--shadow-pop`, 700. **Épuisée** : `disabled`, texte barré `--muted`, contour pointillé, `aria-label="XXL, épuisé"`. Navigation aux flèches dans le `radiogroup`.

## Étoiles d'avis

Cinq étoiles SVG 16px `--star` (décoratives, `aria-hidden`) + texte « 4,8 sur 5 · 126 avis » en `--muted`.

## Champ d'inscription

Pilule `--navy-2` contenant le champ (sans bord, placeholder `--muted-inv`) et la pilule verte « S'inscrire » ; focus = anneau 2px `--green-bright` autour de la pilule. Erreur : message sous le champ + `aria-invalid` ; succès : message de bienvenue.

## Collage de cercles

Quatre cercles de tailles différentes (46 %, 40 %, 34 %, 26 % de la largeur) qui se chevauchent légèrement, fonds `--green`, `--mint`, `--card-alt`, `--navy-2`, un vêtement détouré dans chacun ; ils flottent de 8px en décalé.

## Carte du logotype

Carte `--mint` rayon 28px en bas du pied : ligne légale 12px en haut, logotype DM Serif Display `--text-logo-xl` centré, coupé par le bas de la carte, point final en `--green`.
