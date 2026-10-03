# Anime X Slash — mouvement

Le mouvement du site de référence est **sec et rapide** : presque tout dure 0,3 à 0,5s, sans rebond, et les seuls effets « spectaculaires » sont le chargement, l'arrivée des personnages et le glitch du logo. Les valeurs ci-dessous sont **mesurées** : elles viennent des feuilles de style et des scripts du site (lus le 2026-10-03), pas de captures. Les rares valeurs proposées sont marquées.

## Principes

- **Coupé net** : `ease` partout, 0,3s pour un survol, 0,4s pour un lien ou une entrée, 0,5s pour un panneau. La seule courbe marquée est `--ease-slam` (`cubic-bezier(0.86, 0, 0.07, 1)`) : départ lent, arrivée brutale, pour les personnages du héros.
- **Tout bouge en biais ou en bloc** : une bande qui s'étire, une porte diagonale qui s'ouvre, un bloc qui glisse de 15px. Jamais de fondu doux seul.
- **Pas de révélation au défilement** dans les sections : le texte est là, immobile. Le défilement ne pilote que la parallaxe du héros et l'ouverture de la bande-annonce.

## Les 9 mouvements signature

| # | Nom | Quand | Ce qui se passe | Durée / courbe (mesurées) |
|---|---|---|---|---|
| 1 | **Compteur et logo qui se remplit** | chargement | Fond noir, « LOADING » en bas à gauche, pourcentage en bas à droite (+1 % toutes les 10ms) ; le logo gris foncé se remplit en blanc de bas en haut au même rythme | ≈ 1s |
| 2 | **Bande rouge** | à 100 % | Une bande rouge biaisée (`skewX(-25deg)`) traverse le logo de gauche à droite (`width: 0 → 100%`), l'accroche apparaît dedans en montant de 10px | 0,2s `ease` |
| 3 | **Glitch du logo** | 1s après la bande, puis toutes les 5s dans le héros | Deux copies décalées (−3px et +5px) du logo, découpées en bandes horizontales qui sautent | 0,25 à 0,5s au chargement ; 0,5 à 1s à l'arrivée ; 0,4 à 0,6s en boucle, `linear`, `alternate-reverse` |
| 4 | **Fondu du chargement** | 0,3s après le glitch | L'écran noir s'efface | 0,5s `ease` |
| 5 | **Arrivée des personnages** | 10ms après | Les personnages de gauche glissent depuis −20 %, ceux de droite depuis +20 %, le centre rétrécit de 1,25 à 1, le fond de 1,15 à 1, le logo grossit de 0,75 à 1 | 0,4s `--ease-slam` ; retards 0,07s (logo), 0,1 / 0,12 / 0,15 / 0,16s (personnages) ; accroche à 0,6s |
| 6 | **Parallaxe du héros** | défilement | Chaque morceau du visuel glisse à sa vitesse ; le mouvement est rattrapé par une transition | 0,5s `--ease-snap` (`cubic-bezier(0.47, 0.53, 0.18, 1)`) |
| 7 | **Porte diagonale** | la bande-annonce entre à l'écran | Deux panneaux biaisés (`skewX(-37deg)`) qui se rejoignent au centre s'écartent vers les bords et découvrent la vidéo masquée en X | 0,5s `ease` |
| 8 | **Curseur rond** | survol de la bande-annonce | Un disque de 110px avec un texte circulaire qui tourne et un triangle de lecture suit le pointeur avec retard | retard : 1/10 de la distance par image ; rotation 10s `linear` ; apparition 0,2s |
| 9 | **Grille en noir et blanc** | survol d'une carte de personnage | Toutes les autres cartes passent en niveaux de gris, l'image survolée grossit à 1,1 | 0,3s `ease` |

### Mouvements secondaires (mesurés)

| Élément | Effet | Durée |
|---|---|---|
| Bouton MENU | Fond noir → rouge ; les deux traits se croisent (`rotate(±20deg)`) ; « MENU » devient « CLOSE » | 0,5s (traits), 0,3s (libellé) |
| Menu plein écran | Fondu du panneau ; lien survolé ou courant sur aplat rouge | 0,5s `ease-in-out` ; 0,4s |
| Sélecteur de visuel | Le visuel du héros part en fondu agrandi (`scale(1.2)`, opacité 0), le nouveau revient | 0,5s `ease` |
| Bouton « ARCHIVE » | Fond transparent → noir, texte → blanc | 0,3s |
| Ligne d'actualité | Le titre glisse de 15px à droite ; le chevron suit avec 0,2s de retard | 0,3s |
| Langue, onglets, filtres | Fond → rouge | 0,3s |
| Bouton rond du casting | Fond → noir, icône → blanche | 0,3s |
| Texte circulaire « officiel » | Tourne en continu ; rétrécit à 0,9 au survol | 10s (6s sur mobile) ; 0,3s |
| Filets du fond | Les tracés se redessinent en boucle (`stroke-dashoffset: 2000 → 0`) | 3s `linear` infini |
| Lien d'ancre | Défilement animé | 1s `easeOutQuart` |
| Modale (vidéo, image, message) | Fondu ; la croix tourne (`±65deg`) au survol | 0,5s |
| Lien, réseau du pied | Couleur → rouge | 0,4 à 0,5s |

### Pages internes (mesurés)

| Élément | Effet | Durée |
|---|---|---|
| Fiche personnage, changement de vue | La vue quitte à `scale(0.8)`, la nouvelle arrive en fondu de 0,8 à 1 ; le bouton rond de rotation tourne de −180° au survol | 0,4s (fondu), 0,3s |
| Onglets « autres personnages » | Fond → noir ; contenu en fondu | 0,3s ; 0,4s |
| Pagination des actualités | Fond → blanc ou rouge | 0,6s |
| Sélecteur d'épisodes | Case → rouge | 0,3s |
| Vignettes d'épisode | Niveaux de gris → couleur ; changement d'image en fondu | 0,3s |
| Vignette vidéo | Grossit à 1,1, voile et triangle apparaissent | 0,3s |
| Liste de vidéos filtrée | Réapparaît en fondu | 0,6s |
| Accordéon (musique) | Le panneau se déplie (`slideToggle`, 0,4s par défaut de jQuery) ; le « + » devient « − », le rond passe au rouge ; l'image de fond grise prend sa couleur ; au survol le trait vertical descend de 10px | 0,4s ; 0,3s |
| Onglets de musique | La section apparaît en fondu | 1s |

## Code de référence (vanilla, sans dépendance)

### 1 à 4. Chargement

```js
await new Promise(res => { let n = 0; const t = setInterval(() => {
  pct.textContent = n + '%'; fill.style.setProperty('--p', n / 100);        // +1 % toutes les 10ms
  if (++n > 100) { clearInterval(t); res(); } }, 10); });
loading.classList.add('is-band');   await wait(1000);    // bande rouge 0,2s, puis on laisse lire
glitch(loadMark);                   await wait(300);
loading.classList.add('is-hidden');                      // fondu 0,5s
hero.classList.add('is-in');                             // arrivée des personnages
setInterval(() => glitch(heroMark), 5000);
```
```css
.mark__fill { clip-path: inset(calc(100% - var(--p, 0) * 100%) 0 0 0); }      /* le blanc monte dans le logo */
.loading__band::before { width: 0; background: var(--accent); transform: scaleX(1.1) skewX(var(--band-skew)); transform-origin: left; }
.loading.is-band .loading__band::before { animation: widthup var(--dur-xs) ease forwards; }
@keyframes widthup { to { width: 100%; } }
.loading { transition: opacity var(--dur-slow) ease; } .loading.is-hidden { opacity: 0; }
```

### 3. Glitch

Le site découpe deux copies du logo avec `clip: rect()` sur 30 images clés. Même effet avec `clip-path` et le texte en `data-text` :

```css
.glitch::before, .glitch::after { content: attr(data-text); position: absolute; inset: 0; clip-path: inset(100% 0 0 0); }
.glitch::before { left: -3px; color: var(--accent); }
.glitch::after  { left: 5px;  color: var(--pop); }
.glitch.is-glitch::before { animation: glitch var(--dur-glitch) steps(1) 1 alternate-reverse; }
.glitch.is-glitch::after  { animation: glitch calc(var(--dur-glitch) * 2) steps(1) 1 alternate-reverse; }
@keyframes glitch { 0% { clip-path: inset(52% 0 30% 0); } 10% { clip-path: inset(6% 0 55% 0); } 20% { clip-path: inset(0 0 91% 0); } /* … 10 bandes … */ 100% { clip-path: inset(100% 0 0 0); } }
```
```js
const glitch = el => { el.classList.remove('is-glitch'); void el.offsetWidth; el.classList.add('is-glitch'); };   // relance l'animation
```

### 5. Arrivée des personnages

```css
.js .shard { opacity: 0; transition: opacity var(--dur-base) var(--ease-slam) var(--d, 0s), translate var(--dur-base) var(--ease-slam) var(--d, 0s), scale var(--dur-base) var(--ease-slam) var(--d, 0s); }
.js .shard[data-from="l"] { translate: -20% 0; }  .js .shard[data-from="r"] { translate: 20% 0; }  .js .shard[data-from="c"] { scale: 1.25; }
.js .hero__logo { opacity: 0; scale: .75; }
.hero.is-in .shard { opacity: 1; translate: 0 0; scale: 1; }       /* --d : 0,1s / 0,12s / 0,15s / 0,16s */
```
Les propriétés `translate` et `scale` sont séparées de `transform`, qui garde le biais de l'éclat.

### 6. Parallaxe rattrapée

```css
.hero.is-live .shard { transition: translate var(--dur-slow) var(--ease-snap); }   /* après l'entrée seulement */
```
```js
const y = Math.round(scrollY * speed);                 // speed : 0,04 (centre) à 0,22 (bords), −0,12 pour le grand logotype
if (y !== last) { last = y; el.style.translate = '0 ' + y + 'px'; }
```

### 7. Porte diagonale

```css
.trailer__wrap::before, .trailer__wrap::after { content: ""; position: absolute; top: 0; bottom: 0; width: 100%; background: var(--bg);
  transform: skewX(-37deg); transition: left var(--dur-slow) ease, right var(--dur-slow) ease; }
.trailer__wrap::before { right: calc(50% - 1px); }  .trailer__wrap::after { left: calc(50% - 1px); }
.trailer.is-open .trailer__wrap::before { right: 125%; }  .trailer.is-open .trailer__wrap::after { left: 125%; }
```
Le site ajoute la classe au défilement, quand le haut de la bande-annonce arrive à l'écran ; la démo utilise un `IntersectionObserver` (milieu de l'écran).

### 8. Curseur

```js
cx += (mx - cx) / 10; cy += (my - cy) / 10;                             // retard mesuré : 1/10 par image
cursor.style.transform = 'translate3d(' + Math.round(cx - 55) + 'px,' + Math.round(cy - 55) + 'px,0)';
```

### 9. Grille en noir et blanc

```css
.cards:hover .card__img > div { filter: grayscale(1); }
.cards .card:hover .card__img > div { filter: none; }
.card:hover img { transform: scale(1.1); }
.card__img > div, .card__img img { transition: var(--dur-fast) ease; }
```

## Performance (obligatoire)

Mesuré sur la démo, 1440×900, Chrome **sans carte graphique** (rendu logiciel) : **42 images/s** au survol de la bande-annonce dans la première version → **83 à 144 images/s** partout après les règles ci-dessous (héros 144, défilement 100, bande-annonce 83, survol des cartes 97).

- **Pas de `mix-blend-mode`** : le site l'utilise pour le curseur et un bouton (`difference`). Sur un élément qui bouge au-dessus d'une grande image, tout l'écran est recomposé à chaque image. La démo utilise un disque `--ink` opaque.
- **Pas de filet animé en plein écran** : le site redessine ses filets de fond en boucle (3s). Trois lignes animées couvrant l'écran coûtaient environ 10ms par image ; les filets de la démo sont fixes. Si le tracé animé est voulu, le limiter à un petit SVG local (dans un titre, un bouton).
- **Une seule boucle** `requestAnimationFrame` (curseur + parallaxe) ; écouteurs `{ passive: true }` ; on n'écrit un style que si la valeur arrondie a changé.
- **Parallaxe coupée hors écran** (`IntersectionObserver` sur le héros et la bande-annonce).
- **N'animer que `transform`, `translate`, `scale`, `opacity`, `clip-path`** ; la porte diagonale anime `left` / `right` une seule fois (comme le site), c'est acceptable.
- **`filter: grayscale()`** uniquement en transition de survol, jamais en animation continue.
- **Images** : visuel central en `fetchpriority="high"`, le reste en `loading="lazy" decoding="async"`.
- **Polices** : Oswald 400/500/700 et Noto Sans JP 400/700, `display=swap`.

## Mouvement réduit

- Pas d'écran de chargement : la page s'ouvre sur le héros en place.
- Pas de glitch, de parallaxe ni de curseur animé ; la porte diagonale est déjà ouverte.
- Le sélecteur de visuel change l'image sans fondu ; les ancres sautent sans défilement animé.
- Les survols changent d'état sans transition.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```
