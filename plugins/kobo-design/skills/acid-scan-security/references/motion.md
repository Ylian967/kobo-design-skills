# Acid Scan Security — mouvement

> **À savoir** : la référence est **une image fixe** (un seul visuel Dribbble, aucun site en ligne). Aucun mouvement n'y est visible. Tout ce qui suit est **proposé** par le skill, en partant de ce que l'image suggère : un écran vert de vision nocturne, une bande qui « scanne » le regard, un cadre jaune qui verrouille une cible, des chiffres binaires, un décalage rouge comme sur un vieux moniteur. Les durées sont des choix, pas des mesures.

## Principes

- **Machine, pas magie** : balayages linéaires, clignotements tout-ou-rien (`steps(1)`), apparitions par paliers (`--ease-step`), lettres qui se décodent. Aucun rebond élastique, aucun flou animé.
- **Une histoire à l'ouverture** : le terminal s'amorce → l'écran s'allume comme un vieux tube → la bande descend et se cale sur les yeux → le cadre jaune verrouille → le texte se décode. Ensuite, la page reste vivante mais calme.
- **Rapide au survol** : 120–260ms.

## Les 8 mouvements signature

| # | Nom | Quand | Ce qui se passe | Durée |
|---|---|---|---|---|
| 1 | **Amorçage terminal** | chargement | Fond `--void`, 4 lignes mono `> module … ok` qui s'ajoutent, barre `--signal` qui se remplit | `--dur-boot` 1,6s |
| 2 | **Allumage CRT** | fin de l'amorçage | Une ligne lumineuse s'étire horizontalement au centre, puis l'écran s'ouvre verticalement (`clip-path: inset(50% 0 50% 0)` → `inset(0)`) ; la photo clignote par paliers (`steps(6)`) | 260ms + 520ms |
| 3 | **Bande de scan** | après l'allumage | La bande claire (copie « chaude » de la photo découpée par `clip-path`) descend du haut avec un bord jaune lumineux, dépasse de 4 % puis se cale sur les yeux | `--dur-scan` 1,1s |
| 4 | **Verrouillage** | bande calée | Le cadre jaune clignote 3 fois (70ms), reste allumé ; un score « ID 07 · 98,6 % » monte de 0 | 420ms + 800ms |
| 5 | **Décodage** | titre, surtitre, titres de section | Chaque ligne passe par des signes aléatoires `01<>/\#*+=[]_` qui se fixent de gauche à droite ; ligne invisible tant que son décodage n'a pas commencé ; décalage de 180ms entre lignes | `--dur-decode` 900ms |
| 6 | **Frange RVB + glitch** | en continu | Copie rouge sombre (`--ghost`) des zones sombres décalée de 6px ; l'écart grandit avec la vitesse du pointeur ; toutes les 3–6s, un « glitch » de 140ms pousse la frange à +10–26px et fait glisser la bande | continu |
| 7 | **Chiffres binaires** | en continu | Rangées de 0/1 à 10 % d'opacité ; elles « scintillent » en sautant d'une cellule toutes les 120ms | 120ms |
| 8 | **Décryptage d'image** | images des sections, à l'entrée à l'écran | L'image apparaît en gros pixels (40px) qui s'affinent par paliers jusqu'à la netteté | 8 × 85ms |

### Mouvements secondaires

| Élément | Effet | Durée / courbe |
|---|---|---|
| Réticule | La verticale se trace depuis la hauteur des yeux, puis l'horizontale depuis la gauche | 600ms `--ease-out` |
| Nav | Les éléments apparaissent un à un | pas de 90ms |
| Paragraphe d'intro | Lignes qui s'allument une à une (`--ease-step`) | pas de 110ms |
| Carte CTA | Les crochets partent écartés de 26px et se resserrent ; au survol ils se collent à la carte (−5px), une lueur verte balaie la carte de haut en bas, l'anse du cadenas se soulève de 3px | 260ms / 700ms |
| Bouton nav | Un aplat `--signal` monte du bas, le texte passe en `--on-signal` | 260ms |
| Lien nav | Filet `--signal` qui s'étire de gauche à droite sous le lien | 260ms |
| Bouton plein | Un aplat `--text` glisse de gauche à droite | 260ms |
| Carte de section | Bordure plus claire, crochets qui apparaissent et se resserrent, ligne de scan jaune qui traverse l'image | 260ms + 1,2s |
| Compteurs | Montée de 0 à la valeur, décimales à la française | 1,2s, `ease-out` |
| Jauges segmentées | Segments allumés un par un, le dernier en `--signal` | pas de 45ms |
| Console | Ligne de journal ajoutée toutes les 420ms ; jauge qui avance ; état « ● Analyse » en `--signal` | 420ms |
| Défilement du héros | La photo descend à 18 % de la vitesse et grossit de 6 % ; les textes montent un peu plus vite que la page | lié au défilement |
| Pointeur | La photo suit la souris à l'opposé (±14px), lissée | lissage 0,06 |
| Clignotants | Carré du surtitre de section, curseur du journal, carré « Défiler » | `--dur-blink` 1s `steps(1)` |

## Code de référence (vanilla, sans dépendance)

### Photo en 4 couches « cuites » une seule fois

La même photo existe en 4 versions superposées, toutes positionnées par les mêmes variables `--ix --iy --ih` : **base** (rampe verte), **frange** (rouge sur les zones sombres, décalée), **bande** (rampe chaude, découpée en bande sur les yeux), **cadre** (rampe jaune, découpée dans le cadre). Pour la fluidité, on ne filtre pas en direct : on calcule les 4 versions **une fois** dans des canvas.

```js
// rampes = listes de couleurs lues dans les tokens (du plus sombre au plus clair)
const RAMPS = {
  duo:    [K.void, K.void, mix(K.void, K.deep, .6), K.deep, K.mid, K.hot, mix(K.hot, K.text, .3)],
  hot:    [K.deep, K.mid, K.hot, mix(K.hot, K.signal, .5), mix(K.hot, K.signal, .85)],
  yellow: [mix(K.void, K.signal, .1), mix(K.void, K.signal, .35), mix(K.deep, K.signal, .75), K.signal, mix(K.signal, K.text, .6)]
};
// luminance de chaque pixel → couleur de la rampe (table de 256 entrées)
for (let j = 0, i = 0; j < L.length; j++, i += 4) { const o = L[j] * 3; d[i] = t[o]; d[i+1] = t[o+1]; d[i+2] = t[o+2]; d[i+3] = 255; }
// frange : --ghost avec une opacité qui décroît quand la luminance monte
d[i+3] = Math.max(0, 1 - L[j] / 90) * 190;
// bords fondus cuits dans le canvas (pas de mask-image animé)
x.globalCompositeOperation = 'destination-in'; x.fillStyle = gradientHorizontal; x.fillRect(0, 0, w, h);
```
Repli : si le canvas est refusé (image sans CORS), les `<img>` gardent un filtre SVG `feColorMatrix` + `feComponentTransfer` dont les tables sont remplies en JS depuis les mêmes rampes.

### Bande qui descend et se cale

```js
const to = eyeY - bandH * .55, from = -bandH;
(function tick(now) {
  const p = clamp01((now - t0) / dur);
  const e = p < .82 ? ease(p / .82) * 1.04 : 1.04 - .04 * ease((p - .82) / .18); // léger dépassement
  setBand(from + (to - from) * e);   // met à jour --band-t / --band-b du clip-path
  if (p < 1) requestAnimationFrame(tick);
})(t0 = performance.now());
```

### Décodage

```js
const GLYPHS = '01<>/\\#*+=[]_';
function decode(el, dur = 900) {
  const full = [...el.childNodes].map(n => n.nodeType === 3 ? n.textContent : '\n').join('');
  const t0 = performance.now();
  (function tick(now) {
    const p = Math.min(1, (now - t0) / dur), fixed = Math.floor(p * full.length);
    el.innerHTML = [...full].map((ch, i) => i < fixed || ch === ' ' || ch === '\n' ? ch : GLYPHS[Math.random() * GLYPHS.length | 0])
      .join('').split('\n').map(esc).join('<br>');
    if (p < 1) requestAnimationFrame(tick);
  })(t0);
}
```
CSS : `.js [data-decode]:not([data-done]) { visibility: hidden; }` (la ligne n'apparaît qu'au début de son décodage). Le vrai texte est dans `aria-label` du parent.

### Chiffres binaires (sans repeindre l'écran)

```js
// une tuile de 0/1 dessinée une fois ; cellule = largeur entière (pas de couture)
const cw = Math.ceil(size * .62); tile.width = cw * 72; tile.height = pitch * 20;
// scintillement : saut d'une cellule par transform (calque du compositeur)
setInterval(() => bits.style.transform = `translate3d(${-cw * (Math.random() * 36 | 0)}px, ${-pitch * (Math.random() * 10 | 0)}px, 0)`, 120);
```
```css
.bits { position: absolute; inset: 0 -200px -100px 0; opacity: var(--bits-opacity); will-change: transform; }
```

### Décryptage d'image (mosaïque)

```js
const steps = [40, 28, 18, 12, 8, 5, 3, 1];   // taille d'un « pixel » à chaque palier
// à chaque palier : dessiner l'image en tout petit, puis l'agrandir sans lissage
t.getContext('2d').drawImage(img, ox / b, oy / b, dw / b, dh / b);
x.imageSmoothingEnabled = false; x.drawImage(t, 0, 0, c.width, c.height);   // toutes les 85ms
```

### Allumage CRT

```css
.hero.is-hidden { clip-path: inset(50% 0 50% 0); }
.hero.is-on { clip-path: inset(0); transition: clip-path 520ms var(--ease-in-out); }
.boot__line { transform: scaleX(0); }   /* animée à scaleX(1) en 260ms juste avant */
```

## Performance (obligatoire)

Mesuré sur la démo (Chromium sans carte graphique, 1440×900, souris en mouvement) : **17 i/s** avec filtres SVG, `mask-image`, fusion `screen` et texture en `overlay` recalculés à chaque image → **60 i/s** après les règles ci-dessous.

- **Cuire les couleurs une fois** : versions colorées de la photo calculées dans des canvas au chargement ; aucun `filter: url()` ni `mask-image` sur un élément qui bouge.
- **Pas de `mix-blend-mode`** sur une couche animée : la frange rouge est un canvas avec transparence en fusion normale.
- **Une seule boucle** `requestAnimationFrame` (pointeur + défilement + frange) ; écouteurs `{ passive: true }` ; on n'écrit une variable CSS que si elle change de plus de 0,3px.
- **N'animer que `transform`, `opacity`, `clip-path`** ; la texture binaire bouge par `transform`, pas en changeant son image.
- **Arrêter ce qui n'est pas visible** : boucle du héros coupée quand il sort de l'écran (`IntersectionObserver`), texture et glitch suspendus si l'onglet est caché.
- **Images** : portrait en `fetchpriority="high"` et `crossorigin="anonymous"` (sur toutes ses copies, pour un seul téléchargement) ; les autres en `loading="lazy" decoding="async"`.
- **Polices** : VT323, Inter 400/500/600, JetBrains Mono 400/500, `display=swap`.

## Mouvement réduit

- Pas d'amorçage ni d'allumage : la page s'ouvre directement sur le héros final (bande calée, cadre allumé, score à 98,6 %).
- Pas de décodage, de glitch, de frange mobile, de scintillement ni de parallaxe ; les images s'affichent sans mosaïque.
- Les compteurs et jauges affichent leur valeur finale ; le journal ajoute ses lignes sans délai.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```
