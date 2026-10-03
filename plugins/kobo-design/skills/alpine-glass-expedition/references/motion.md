# Alpine Glass Expedition — mouvement

> **À savoir** : la référence est **une image fixe** (un seul visuel Dribbble, aucun site en ligne, aucune vidéo). Aucun mouvement n'y est visible. Tout ce qui suit est **proposé** par le skill, à partir de ce que l'image suggère : de la brume, de la neige soufflée, une sphère de verre posée sur la photo, un bouton lecture, une note chiffrée. Les durées sont des choix, pas des mesures.

## Principes

- **L'air de la montagne** : tout est lent, continu, sans rebond. Une seule courbe pour les entrées, `--ease` (sortie longue), et `--ease-in-out` pour ce qui flotte.
- **La photo respire, l'interface reste nette** : seuls la photo, la brume et la neige bougent en continu ; le texte ne bouge qu'à son entrée et au défilement.
- **Une histoire à l'ouverture** : l'altimètre monte → la brume se lève → le titre sort de la pente → la sphère de verre se pose → la note compte.
- **Survol rapide** : 180–420ms.

## Les 10 mouvements signature

| # | Nom | Quand | Ce qui se passe | Durée |
|---|---|---|---|---|
| 1 | **Altimètre** | chargement | Écran `--mist` ; un grand chiffre fin et étroit monte de 0 à 3 842 m, un filet se remplit dessous | 1,5s |
| 2 | **La brume se lève** | fin de l'altimètre | Le voile `--mist` s'efface en grossissant (échelle 1 → 1,18) ; la photo recule (1,16 → 1) ; les nappes de brume, très denses, s'éclaircissent | `--dur-veil` 1,4s ; photo 2,4s |
| 3 | **Titre qui sort de la pente** | après le voile | Chaque ligne du titre monte depuis sous son masque (`translateY(108%)` → 0), la 2e avec 120ms de retard | `--dur-slow` 1,1s |
| 4 | **Sphère de verre vivante** | en continu + pointeur | Le bouton rond flotte (−5px ↔ +7px) ; à moins de 1,1 fois sa largeur du pointeur, il est attiré de 22 % de la distance ; au survol, un reflet s'allume en haut et la flèche ↗ sort par le coin pour revenir par l'autre | `--dur-float` 7s ; aimant lissé 0,12 ; flèche `--dur` |
| 5 | **Brume en dérive et neige fine** | en continu | 4 nappes de brume glissent en va-et-vient ; 70 flocons traversent en biais, poussés par la position du pointeur | cycles de 60–120s ; 30 images/s |
| 6 | **Profondeur** | pointeur + défilement | La photo part à l'opposé du pointeur (±9px / ±6px) ; au défilement elle descend à 16 % de la vitesse, la brume monte, le bloc titre monte de 70px et s'efface | lissage 0,05 |
| 7 | **Note qui compte** | entrée du héros | « 0,0 » → « 4,8 » ; l'étoile arrive en tournant (−140° → 0, échelle 0 → 1) | 1,3s ; étoile 900ms |
| 8 | **Anneau du bouton lecture** | en continu | Un anneau fin part du disque et grandit en s'effaçant (1 → 1,75) | `--dur-pulse` 2,6s |
| 9 | **Cartes qui se lèvent** | entrée à l'écran | La carte se découvre de bas en haut (`clip-path: inset(100% 0 0 0)` → `inset(0)`), l'image recule (1,3 → 1), 110ms de décalage entre cartes | 1,2s / 1,6s |
| 10 | **Le film de la semaine** | défilement (scène collante de 340vh) | Le profil d'altitude se trace, un point `--star` suit la ligne, l'altitude défile, le jour actif s'allume dans la liste, la photo change en fondu tous les deux jours | lié au défilement ; fondu 900ms |

### Mouvements secondaires

| Élément | Effet | Durée / courbe |
|---|---|---|
| Nav | Les 3 blocs descendent en fondu (80ms d'écart) ; après le héros, fond `--deep` à 94 %, texte blanc, hauteur 86 → 70px | `--dur-slow` / `--dur` |
| Lien de nav | Filet qui s'étire de gauche à droite, repart vers la droite | `--dur` |
| Pilule blanche | Un reflet `--sky` incliné traverse la pilule ; léger enfoncement à l'appui (0,97) | 800ms / `--dur-fast` |
| Puce | Un aplat blanc monte du bas, le texte passe en `--ink` | `--dur` |
| Bouton lecture | Le disque grossit (1,08), le triangle aussi (1,2) | `--dur` |
| Puces et paragraphe du héros | Puces glissées depuis la gauche (100ms d'écart), paragraphe en fondu montant | `--dur-slow` |
| Titres de section | Même montée par ligne que le titre du héros | `--dur-slow` |
| Carte au survol | Image 1,07, petite sphère qui monte de 6px, flèche qui traverse | 1,4s / `--dur` |
| Filtre | Les cartes hors filtre passent à 22 % d'opacité | `--dur` |
| Compteurs | Montée de 0 à la valeur, format français | 1,4s |
| Citation | Mots allumés un à un (22 % → 100 %) | 55ms par mot |
| Photo finale | Glisse de ±6 % avec le défilement | lié au défilement |
| Menu mobile | Panneau `--deep` découvert de haut en bas (`clip-path`) | `--dur-slow` |

## Code de référence (vanilla, sans dépendance)

### Photo refroidie une seule fois

Toutes les photos passent sur la rampe brume → nuit **dans un canvas, au chargement**. Les pixels chauds et saturés (sac, casque) gardent leur couleur : c'est le seul point chaud de l'image.

```js
const STOPS = ['--abyss', '--deep', '--ridge', '--slate', '--steel', '--haze', '--mist', '--white'].map(rgb); // lus dans les tokens
// LUT = table de 256 couleurs interpolées entre ces arrêts
const L = (r * .3 + g * .59 + b * .11) | 0, o = L * 3;
const warm = Math.max(0, Math.min(1, (r - b - 46) / 70)), k = .74 * (1 - warm);   // 0 = on garde la couleur d'origine
d[i] = r + (LUT[o] - r) * k; d[i + 1] = g + (LUT[o + 1] - g) * k; d[i + 2] = b + (LUT[o + 2] - b) * k;
canvas.toBlob(bl => { img.classList.add('is-graded'); img.src = URL.createObjectURL(bl); }, 'image/jpeg', .86);
```
Repli tant que ce n'est pas fait (ou si le canvas est refusé) : `img[data-grade]:not(.is-graded) { filter: saturate(.45) brightness(.96); }`.

### Brume et neige dans un seul canvas

```js
const HALF = .5;                                   // canvas en demi-résolution, étiré en CSS
// une nappe = un dégradé radial --mist pré-rendu (128px), dessiné très grand
for (const f of FOG) {
  const x = (f.x + Math.sin(t * .00005 * f.s + f.d) * .09 - wind * .05 * f.d) * FW - w / 2;
  cx.globalAlpha = Math.min(1, f.a * (1 + dense * 1.6));   // dense : 1 à l'ouverture, retombe vers 0
  cx.drawImage(puff, x, y, w, h);
}
for (const f of flakes) { f.x += (1.1 + wind * 2.4) * f.s; f.y += f.s * f.r; cx.globalAlpha = f.a; cx.fillRect(f.x, f.y, f.r * 1.6, f.r * 1.6); }
```
Appelé depuis la boucle unique, au plus toutes les 32ms : `if (t - lastFx > 32) { lastFx = t; drawFx(t, px, p); }`.

### Titre par lignes

```html
<h1 class="title" aria-label="Explorer sans limites"><span class="ln" aria-hidden="true"><span>Explorer</span></span><span class="ln" aria-hidden="true"><span>sans limites</span></span></h1>
```
```css
.ln { display: block; overflow: hidden; white-space: nowrap; padding: .04em 0; margin-bottom: -.08em; }
.js .ln > span { display: inline-block; transform: translateY(108%); }
.js .is-in .ln > span { transform: none; transition: transform var(--dur-slow) var(--ease) var(--d, 0ms); }
.js .ln + .ln > span { --d: 120ms; }
```

### Sphère de verre : flotter et suivre le pointeur sans conflit

```css
.orb { transform: translate3d(var(--mx), var(--my), 0);            /* aimant, posé par JS */
  animation: float var(--dur-float) var(--ease-in-out) infinite alternate; }
@keyframes float { from { translate: 0 -5px; } to { translate: 0 7px; } }  /* propriété `translate`, indépendante de `transform` */
```
```js
const dx = e.clientX - cx0, dy = e.clientY - cy0;
if (Math.hypot(dx, dy) < r.width * 1.1) { tx = dx * .22; ty = dy * .22; } else { tx = ty = 0; }
ox += (tx - ox) * .12; oy += (ty - oy) * .12;      // dans la boucle
```

### Cartes : observer le parent, pas la carte

Un élément entièrement découpé par `clip-path` n'est jamais « visible » pour `IntersectionObserver`. On observe donc le `<li>` et on anime la carte à l'intérieur.

```css
.js [data-rise] .card { clip-path: inset(100% 0 0 0 round var(--r-card)); }
.js [data-rise].is-in .card { clip-path: inset(0 0 0 0 round var(--r-card)); transition: clip-path 1.2s var(--ease) var(--d, 0ms); }
```

### Film au défilement

```js
const r = route.getBoundingClientRect(), p = clamp01(-r.top / (r.height - innerHeight));   // 0 → 1 dans la section collante
const at = trace.getPointAtLength(LEN * p);
trace.style.strokeDashoffset = LEN * (1 - p);             // strokeDasharray = LEN
dot.setAttribute('cx', at.x); dot.setAttribute('cy', at.y);
const day = Math.min(5, Math.floor(p * 6));               // jour actif, photo = Math.floor(day / 2)
```

## Performance (obligatoire)

Mesuré sur la démo, 1440×900, Chrome **sans carte graphique** (rendu logiciel SwiftShader, écran 144 Hz) : première version à **40 images/s** dans le héros → **≈ 58 images/s** après les règles ci-dessous (au repos et pointeur en mouvement ; 51 pendant le défilement du héros ; plus de 100 dans les sections suivantes). Avec une carte graphique, c'est plus rapide dans tous les cas.

- **Deux grands calques, pas cinq** : le voile dégradé est **dans** le calque de la photo ; brume et neige partagent **un** canvas. Chaque grand calque translucide en plus coûtait environ 7ms par image (estimation tirée des mesures).
- **Pas de `backdrop-filter`** : la sphère de verre est un dégradé opaque (c'est ce que montre la référence). Un flou d'arrière-plan sur un élément qui flotte au-dessus d'une photo qui bouge se recalcule à chaque image.
- **Pas de `mix-blend-mode` ni de `filter` sur la photo** : les couleurs sont cuites une fois dans un canvas.
- **Déplacements en pixels entiers, sans zoom** sur le calque photo (`Math.round`) : le navigateur recopie le calque au lieu de le rééchantillonner.
- **Brume et neige à 30 images/s** en demi-résolution : leur mouvement est lent, la différence ne se voit pas.
- **Une seule boucle** `requestAnimationFrame` ; écouteurs `{ passive: true }` ; on n'écrit un style que si sa valeur a changé.
- **Arrêter ce qui n'est pas visible** : chaque partie de la boucle dépend d'un `IntersectionObserver` (héros, film, photo finale) ; rien ne tourne si l'onglet est caché.
- **N'animer que `transform`, `translate`, `opacity`, `clip-path`**.
- **Images** : photo du héros en `fetchpriority="high"`, les autres en `loading="lazy" decoding="async"` ; toutes en `crossorigin="anonymous"` (nécessaire pour le canvas).
- **Polices** : 2 fichiers variables (Archivo largeur + graisse, Roboto Serif à largeur fixe 90), `display=swap`.

## Mouvement réduit

- Pas d'altimètre ni de voile : la page s'ouvre sur le héros final, titre en place, note à « 4,8 ».
- Brume dessinée une fois, immobile ; pas de neige, de parallaxe, d'aimant, de flottement ni d'anneau.
- Le film n'est plus collant : section à hauteur normale, profil entièrement tracé, tous les mots de la citation allumés.
- Compteurs à leur valeur finale ; cartes et titres visibles tout de suite.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
  html { scroll-behavior: auto; }
  .route { height: auto; }
  .route__stage { position: static; height: auto; }
}
```
