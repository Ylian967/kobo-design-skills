# Chrome Atelier — mouvement

Trois sources, signalées à chaque ligne : **mesuré** = lu dans la feuille de style ou les scripts du site en ligne de la marque ; **observé** = vu image par image dans la vidéo du shot (15,7s) ou en faisant défiler le site, sans valeur lisible (le site pilote ces mouvements avec les interactions Webflow et une séquence d'images) ; **proposé** = ajouté par le skill.

## Principes

- **Une planche qui se dessine** : les filets, le cercle et les légendes se construisent sous les yeux, puis ne bougent plus.
- **Le défilement tient la pièce** : la rotation et le changement de métal suivent exactement le doigt ; rien ne joue tout seul, sauf le chargement.
- **Interface discrète** : 0,2 à 0,45s, courbe `ease`, aucun rebond.

## Les 8 mouvements signature

| # | Nom | Quand | Ce qui se passe | Durée / courbe |
|---|---|---|---|---|
| 1 | **Chargement au compas** | arrivée | Sur fond `--mist`, deux groupes d'arcs se tracent comme au compas, un pourcentage « [41%] » monte au centre en mono ; les deux moitiés glissent l'une vers l'autre et se rejoignent, des points apparaissent aux croisements, puis l'écran s'efface | mesuré : le 3e groupe d'arcs démarre à 3s et dure 3s, cercle central en fondu 0,5s, glissement `transform 1s ease`, points `opacity 0.5s`. La démo raccourcit le tracé à 1,5s |
| 2 | **Cercles de cadrage** | fin du chargement | Les cercles et les axes fins du héros reprennent ceux du chargement et se posent autour du bijou | proposé : 1,4s, échelle 0,86 → 1 |
| 3 | **Titre en escalier** | entrée du héros | Les 4 lignes montent de 14px en fondu, 90ms d'écart ; puis texte, pilules, barre | proposé : 0,9s `--ease-out` |
| 4 | **La barre devient des cartes** | début du défilement | Chaque cellule de la barre (libellé + valeur) monte en **carte photo** portant le même libellé ; les trois cartes montent à des vitesses différentes et passent devant le bas du héros | observé ; lié au défilement |
| 5 | **La planche se trace** | entrée de l'atelier | Les 4 filets partent du centre et s'étirent jusqu'aux bords, le cercle grandit, puis la pièce, les légendes et les carats apparaissent | observé ; lié au défilement |
| 6 | **Trois ors au défilement** | scène collante | La pièce tourne et passe de l'or jaune à l'or blanc puis à l'or rose ; la **roue des légendes** tourne d'un cran à chaque métal : le libellé actif vient se placer en haut à droite, relié à la pièce par un trait, les autres s'estompent | observé (séquence d'images sur le site) ; roue : proposé 0,9s `--ease-io` |
| 7 | **Presse au survol** | survol, focus ou clic d'un logo | Le logo gris passe en blanc sur une photo qui apparaît dans sa cellule ; l'article correspondant s'affiche au-dessus | observé ; fondu proposé 0,5s |
| 8 | **Colonnes décalées** | défilement de la galerie | Les deux colonnes de photos glissent en sens opposé (−50px / +40px) | observé ; lié au défilement |

### Mouvements secondaires

| Élément | Effet | Source |
|---|---|---|
| Barre de navigation | Glisse depuis le haut quand on quitte le héros ; les liens du héros remontent et s'effacent | mesuré : `transform 0.45s`, barre `all 0.2s` |
| Pilules | Fond qui se remplit, texte qui s'inverse | mesuré : `background-color 0.3s` |
| Logo, liens | Changement de couleur | mesuré : `0.3s ease` |
| « Défiler pour explorer » | Flotte de 15px vers le haut | mesuré : `floatY 3s ease-in-out infinite` |
| Compteurs (barre, série) | Montent de 0 à la valeur à l'entrée | mesuré : le site utilise CountUp déclenché à 80 % de l'écran ; durée de la démo 1,4s |
| Accordéon | Hauteur 0 → auto, chevron à −180° ; un seul ouvert | mesuré : `0.3s power1.inOut` |
| Anneau de progression des vidéos | Le contour du bouton rond se remplit avec la lecture | mesuré : `stroke-dashoffset 0.1s linear` |
| Photo du héros | Descend à 12 % de la vitesse du défilement | proposé |
| Pièce | Tourne très lentement au repos ; se fait tourner au doigt | proposé |
| Liens d'ancre | Défilement doux | mesuré : `scroll-behavior: smooth` |

## Code de référence (vanilla, sans dépendance hors Three.js)

### 1. Chargement au compas

```html
<svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
  <g class="up"><path class="arc" pathLength="1" d="M 220 450 A 500 500 0 0 1 1220 450"/>…</g>
  <g class="down">…</g><circle class="dot" cx="220" cy="450" r="3"/>…
</svg>
<span class="tag">[<span id="pct">0</span>%]</span>
```
```css
.arc { stroke-dasharray: 1; stroke-dashoffset: 1; }                                  /* pathLength="1" : pas de longueur à mesurer */
.is-draw .arc { stroke-dashoffset: 0; transition: stroke-dashoffset 1.3s var(--ease-io) var(--d, 0s); }
.loader g { transition: transform var(--dur-shift) var(--ease); }
.is-join .up { transform: translateY(4%); }  .is-join .down { transform: translateY(-4%); }
.is-join .dot { opacity: 1; transition: opacity var(--dur-fade) var(--ease); }
```

### 4. La barre devient des cartes

```js
const r = cardsSection.getBoundingClientRect(), p = clamp01((innerHeight - r.top) / (innerHeight * .9));
cards.forEach(c => c.style.transform = `translate3d(0, ${Math.round(+c.dataset.from + (+c.dataset.to - c.dataset.from) * p)}px, 0)`);
// data-from / data-to : 70 → −170, 24 → −300, 130 → −110 (la carte du milieu monte le plus haut)
```

### 5 et 6. Scène collante

```css
.atelier { height: 330vh; }  .stage { position: sticky; top: 0; height: 100svh; }
.lines i { width: 150vw; height: var(--hairline); transform: rotate(var(--a)) scaleX(var(--p, 0)); }   /* --a : 0, 90, 45, −45deg */
.ring { transform: scale(var(--p, 0)); opacity: var(--p, 0); }
.wheel { transform: rotate(var(--rot, 0deg)); transition: transform 900ms var(--ease-io); }
.wheel button { transform: rotate(var(--a)) translateX(calc(var(--ring) / 2)); }                       /* --a : −40, 0, 40deg */
.wheel button span { transform: rotate(calc(var(--a) * -1 - var(--rot, 0deg))); }                      /* le texte reste droit */
```
```js
const p = clamp01(-r.top / (r.height - innerHeight));          // 0 → 1 dans la scène
const metal = p < .38 ? 0 : p < .68 ? 1 : 2;                   // or jaune, blanc, rose
wheel.style.setProperty('--rot', (-40 * metal) + 'deg');
// côté 3D : la couleur du matériau glisse vers le métal visé, la rotation suit p
mat.color.lerp(METALS[metal], .12);  piece.rotation.y = .5 + p * Math.PI * 2.2;
```

### Accordéon sans JavaScript de hauteur

```css
.faq__panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--dur-ui) var(--ease-io); }
.faq__panel > div { overflow: hidden; }
button[aria-expanded="true"] + .faq__panel { grid-template-rows: 1fr; }
button svg { transition: transform var(--dur-ui) var(--ease-io); }  button[aria-expanded="true"] svg { transform: rotate(-180deg); }
```

## Performance (obligatoire)

Mesuré sur la démo, 1440×900, Chrome **sans carte graphique** (rendu logiciel, WebGL compris) : héros et cartes **136 images/s**, presse à la fin de page **142**, scène 3D **45 à 60** (le rendu 3D logiciel est le facteur limitant ; avec une carte graphique il ne l'est plus).

- **3D à la demande** : la scène n'est rendue que si elle est à l'écran, au plus 30 fois par seconde, et seulement si la rotation ou la couleur a changé. `MeshStandardMaterial` (pas de vernis), rapport de pixels plafonné à 1,5, maillages légers (tubes de 200 × 40 segments).
- **Une seule boucle** pour tout le défilement ; elle ne calcule rien si la position n'a pas changé ; chaque partie dépend d'un `IntersectionObserver`.
- **N'animer que `transform`, `opacity`, `stroke-dashoffset`, `grid-template-rows`** (ce dernier uniquement à l'ouverture d'une question).
- **Pas de flou d'arrière-plan qui bouge** : la barre du héros est floutée sur le site (4px) ; la démo la laisse en aplat translucide, car la photo glisse dessous.
- **Déplacements arrondis au pixel** pour la photo du héros, les cartes et les colonnes.
- **Images** : photo du héros en `fetchpriority="high"`, le reste en `loading="lazy" decoding="async"`.
- **Polices** : Inter 400/500, IBM Plex Mono 400, une serif pour un seul logo de presse, `display=swap`.

## Mouvement réduit

- Pas de chargement : le héros est affiché en place, compteurs à leur valeur.
- La scène de l'atelier n'est plus collante : planche déjà tracée, pièce immobile ; le métal se choisit au clic sur les légendes.
- Pas de parallaxe ; la presse et l'accordéon changent d'état sans fondu.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
  html { scroll-behavior: auto; }
  .atelier { height: auto; }  .stage { position: relative; }
}
```
