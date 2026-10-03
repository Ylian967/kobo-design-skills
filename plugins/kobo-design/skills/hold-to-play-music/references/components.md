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

Fond `--paper`, portrait en contre-jour centré, qui touche le bas : **image réelle, voir `assets.md`** (photo N&B, `contrast(1.8)` + `mix-blend-mode: multiply` sur le blanc, bords fondus par masque) ; logo du label en haut à gauche (encre), titre du site en petit lettrage en haut à droite.

## Vignette d'artiste

En bas à gauche : pochette carrée 90px (image réelle N&B, voir `assets.md`), sous elle « Nom (2011) » en Fira Sans 700 14px souligné + bouton rond ↓ (contour 1.5px) pour la liste des titres.

## Pied de page

Ligne Fira Mono 10px : « © 2026 Label · À propos · Site du label » à gauche ; à droite « #NomDuProjet · Partager f t · plein écran ⤢ ». « Besoin d'aide ? » au-dessus à droite (ouvre l'explication des contrôles).

## États

- **Chargement** : noir, logo dessiné au trait en blanc au centre, petit compteur.
- **Son coupé** : icône barrée dans le pied de page.

---

# Relevés sur le site en ligne (2026-10-03)

Le site de 2015 est **toujours en ligne** (rendu PixiJS dans un canvas, interface en HTML) ; ouvert dans le navigateur intégré (612px). « Mesuré » = style calculé ; « observé » = à l'œil.

## Chargement (observé)

Fond **noir avec grain de film animé** ; en haut au centre le logo du label (petit personnage-robot dessiné au trait + nom en lettrage manuscrit blanc) et « présente » en **Inconsolata 12px gris #858585** (mesuré) ; dessous un **anneau de progression** fin blanc. Autour, des **coups de pinceau** isolés (barres, points, arcs) bleu Klein, orange et blanc flottent puis **s'assemblent** pour écrire le titre en lettres peintes, avec texture de pinceau sec visible dans chaque trait.

## Choix d'écoute (mesuré)

Avant de commencer : deux choix en Camphor 17px 400, « haut-parleurs » en **orange #e47839** et « casque » en **bleu #002fa7**, puis le bouton « commencer » en Camphor 16px **200** noir (sur fond clair). Reprendre l'idée : une question d'écoute en deux mots colorés, puis un bouton très fin.

```html
<fieldset class="listen"><legend class="sr-only">Comment écoutez-vous ?</legend>
  <label><input type="radio" name="out" value="hp"> <span class="o">haut-parleurs</span></label>
  <label><input type="radio" name="out" value="casque"> <span class="b">casque</span></label>
</fieldset>
<button class="start">commencer</button>
```
```css
.listen span { font: 400 1.0625rem/1.3 var(--font-ui); }
.listen .o { color: var(--orange); }  .listen .b { color: var(--blue-light); }  /* bleu Klein illisible sur noir : version claire */
.start { font: var(--weight-light) var(--text-base) var(--font-ui); background: var(--paper); color: var(--ink); border: 0; min-height: 44px; padding: 0 var(--space-6); }
```

## Générique (mesuré)

Page de crédits en Camphor **26px 400** : rôles en **orange**, noms en **blanc**, la ligne d'en-tête et les remerciements en **bleu Klein** ; un seul nom par ligne, centré, long défilement. Phrase d'intro en blanc 26px, mots clés en couleur.

## Pied de page (mesuré)

Liens 13px 400 blancs : « À propos », site du label, mot-dièse, « Partagez ». Message d'orientation 13px : « Tournez votre appareil s'il vous plaît. » (l'expérience est **paysage uniquement** sur mobile).
