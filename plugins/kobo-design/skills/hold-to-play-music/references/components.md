# Hold To Play Music — composants

## Touche « maintenir » (signature)

```html
<p class="hold">Maintenez <button class="key" id="key" aria-describedby="holdHelp"><span class="key__fill"></span><span class="key__label">espace</span></button> pour lancer l'expérience.</p>
```
```css
.key { position: relative; min-width: 140px; min-height: 44px; padding: 0 24px; border-radius: var(--key-radius); border: 2px solid currentColor; background: var(--paper); color: var(--ink);
  box-shadow: 0 var(--key-depth) 0 currentColor; overflow: hidden; font: 500 var(--text-sm) var(--font-ui); cursor: pointer; transition: transform var(--dur-fast) var(--ease), box-shadow var(--dur-fast) var(--ease); }
.key.is-held { transform: translateY(var(--key-depth)); box-shadow: 0 0 0 currentColor; }
.key__fill { position: absolute; inset: 0; background: var(--orange); transform-origin: left; transform: scaleX(var(--p, 0)); }
.key__label { position: relative; }
```
JS : à l'appui (espace, pointeur), `--p` monte de 0 à 1 en `--hold` ; à 1, action ; au relâchement avant 1, `--p` redescend en 300ms. Clic simple = action immédiate (alternative).

## Lettrage peint

Police Londrina Solid + filtre SVG qui rend les bords irréguliers et ajoute des « traces » de pinceau :
```html
<svg width="0" height="0"><filter id="brush"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="5"/></filter></svg>
```
```css
.brush { font: 900 var(--text-logo)/0.9 var(--font-brush); filter: url(#brush); letter-spacing: .02em; }
.brush span:nth-child(3n+1) { color: var(--blue); } .brush span:nth-child(3n+2) { color: var(--orange); } .brush span:nth-child(3n) { color: var(--text); }
```
Sur fond vidéo clair, titre entièrement blanc (variante).

## Page d'artiste

Fond `--paper`, portrait en contre-jour (silhouette noire) centré, qui touche le bas ; logo du label en haut à gauche (encre), titre du site en petit lettrage en haut à droite.

## Vignette d'artiste

En bas à gauche : pochette carrée 90px, sous elle « Nom (2011) » en Fira Sans 700 14px souligné + bouton rond ↓ (contour 1.5px) pour la liste des titres.

## Pied de page

Ligne Fira Mono 10px : « © 2026 Label · À propos · Site du label » à gauche ; à droite « #NomDuProjet · Partager f t · plein écran ⤢ ». « Besoin d'aide ? » au-dessus à droite (ouvre l'explication des contrôles).

## États

- **Chargement** : noir, logo dessiné au trait en blanc au centre, petit compteur.
- **Son coupé** : icône barrée dans le pied de page.
