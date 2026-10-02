# Retro Mission Poster — composants

## Cadre

```css
.frame { position: fixed; inset: 0; z-index: 50; pointer-events: none; border: var(--frame) solid var(--cream); }
```

## Grain

```html
<svg width="0" height="0"><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter></svg>
```
```css
.grain::after { content: ""; position: absolute; inset: 0; filter: url(#grain); opacity: var(--grain-opacity); mix-blend-mode: overlay; pointer-events: none; }
```

## Titre de chapitre

Surtitre « CHAPITRE 1 » (Jost 12px +0.12em crème), puis 2–4 mots en Big Shoulders Display 800, crème, interligne 0.85, rotation `--tilt`, aligné à droite de l'écran. Ombre très légère pour détacher du ciel.

## Mot entre deux plans (signature)

```html
<div class="layers">
  <div class="layer layer--back" data-slot="planet-landscape"></div>
  <p class="giant" aria-hidden="true">MISSION</p>
  <div class="layer layer--front" data-slot="silhouettes"></div>
</div>
<h2 class="sr-only">Mission</h2>
```
`.giant` : Big Shoulders Display 900, `--text-giant`, `--accent`, centré ; `.layer--front` est une image PNG détourée (ou SVG de silhouettes) au-dessus.

## Anneau dentelé

Cercle `--ring` dessiné en pointillés fins (`stroke-dasharray: 2 4`) rouge ou crème, flèche ↓ fine au centre. Sur le chargement, l'anneau entoure le logo et se « remplit » (la partie parcourue passe en rouge plein).
```css
.ring-btn { width: var(--ring); aspect-ratio: 1; border-radius: 50%; border: 1px dashed currentColor; background: none; color: var(--accent); display: grid; place-items: center; cursor: pointer; transition: transform var(--dur-fast) var(--ease); }
.ring-btn:hover { transform: rotate(20deg); }
```

## Bouton crème

Rectangle crème, texte `--on-cream` Jost 600 12px capitales +0.12em, padding 10px 22px, coins droits. Survol : fond `--accent`.

## Bloc d'accroche

En bas à droite : titre en Jost 600 18px capitales crème (« ZÉRO CARBONE NET »), 2 lignes Jost 400 14px, bouton crème. Aligné à droite.

## Logo et menu

Logo en capitales espacées rouge en haut à gauche (avec une lettre remplacée par un symbole), burger à 3 traits crème fins en haut à droite. Sur les chapitres suivants, le logo devient le symbole seul.

## Chargement

Fond `--bg`, carte sombre arrondie au centre (rayon 12px), anneau dentelé avec le symbole rouge au centre ; la dentelure se remplit avec la progression.

## États

- **Image manquante** : dégradé terre → crépuscule + grain (le style reste cohérent).
