# Glacial Mono 3D — mouvement

> **À savoir** : le site de référence dessine **tout** dans un canvas WebGL, texte compris. Aucune durée, aucune courbe n'est lisible dans le code de la page. Tout ce qui suit est **observé** sur des captures prises pendant le chargement et le défilement (2026-10-03) ; les durées sont **proposées** par le skill. Dans le navigateur de test (sans carte graphique), le site lui-même mettait environ 8 secondes par image : son rythme réel n'a pas pu être chronométré.

## Principes

- **La scène se construit** : rien n'apparaît d'un coup. D'abord des traits, puis un réseau, puis la matière.
- **Le défilement est un voyage** : on ne fait pas défiler une page, on déplace la caméra d'un lieu à l'autre.
- **L'interface se décode** : chaque texte passe par des pavés pleins avant d'être lisible.
- **Froid et lent** : mouvements amortis, sortie longue (`--ease`), aucun rebond.

## Les 6 mouvements signature

| # | Nom | Quand | Ce qui se passe (observé) | Durée (proposée) |
|---|---|---|---|---|
| 1 | **Chaîne ASCII** | chargement | Sur le fond `--loader`, une courte chaîne de signes `-=+` change sans cesse au centre de l'écran | 1,6s, un tirage toutes les 80ms |
| 2 | **Assemblage** | fin du chargement | L'objet apparaît en **fil de fer lumineux**, un **réseau de traits** s'étend autour de lui, puis la matière se remplit et le sol s'étend depuis le centre | `--dur-born` 2,8s |
| 3 | **Texte en pavés** | apparition de tout texte d'interface | Le texte est d'abord un **bloc blanc plein** fait de pavés `█▓▒░`, puis les lettres se fixent de gauche à droite | un pas toutes les 40ms (`--scramble`), 2 lettres par pas |
| 4 | **Voyage de la caméra** | défilement | La caméra glisse d'une scène à la suivante ; le brouillard change de couleur (clair → nuit → clair), l'interface suit (texte sombre → clair) | amorti 0,06 par image ; fonds `--dur-scene` 1,6s |
| 5 | **Transition en pixels** | passage d'une scène à l'autre | L'image se casse en **pavés** et en **franges arc-en-ciel** pendant le déplacement, puis se recompose | `--dur-glitch` 0,52s, par paliers (`steps(4)`) |
| 6 | **Sculpture de particules** | arrivée sur la dernière scène | Un nuage de points épars se rassemble en une forme au-dessus du socle | amorti 0,04 par image |

### Mouvements secondaires

| Élément | Effet | Statut |
|---|---|---|
| Fragments de glace | Flottent et tournent lentement tout le long du parcours | observé (blocs qui s'écartent du dôme) ; rythme proposé |
| Pointeur | La caméra se décale légèrement à l'opposé du pointeur | proposé |
| Crochets de coin d'un bouton | Se resserrent de 3px vers le centre au survol | observé ; 0,2s proposé |
| Constellation numérotée, légendes à trait | Apparaissent en fondu sur leur scène | observé ; 0,6s proposé |
| Neige | Quelques flocons traversent l'écran en biais | observé ; 9 à 13s proposé |
| Panneau de contenu | Fondu sur voile sombre | observé ; 0,6s proposé |

## Code de référence

### 2. Assemblage (Three.js)

```js
// arêtes de chaque objet + réseau de segments autour : même matière de trait, transparente
const wireMat = new THREE.LineBasicMaterial({ color: C.text, transparent: true, opacity: 0 });
cluster.children.forEach(m => wires.add(new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry), wireMat)));
netGeo.setDrawRange(0, 0);
// à chaque image, born va de 0 à 1 en --dur-born
wireMat.opacity = born < .5 ? born * 1.6 : (1 - born) * 1.6;                       // les traits montent puis s'effacent
netGeo.setDrawRange(0, Math.floor(Math.min(1, born * 1.8) * NET) * 2);             // le réseau s'étend
const solid = smooth(Math.max(0, (born - .35) / .65));
ice.opacity = .86 * solid; ground.scale.setScalar(.05 + .95 * solid);              // la matière arrive, le sol s'étend
```

### 3. Texte en pavés

```js
const chars = '█▓▒░#/\\_<>01';
function scramble(el) {
  const target = el.dataset.text ||= el.textContent; el.setAttribute('aria-label', target);
  let i = -8; el.classList.add('is-busy');                                           // i négatif : quelques pas entièrement en pavés
  el._t = setInterval(() => {
    el.textContent = [...target].map((c, k) => k < i || c === ' ' ? c : chars[Math.random() * chars.length | 0]).join('');
    if ((i += 2) > target.length) { clearInterval(el._t); el.textContent = target; el.classList.remove('is-busy'); }
  }, 40);
}
```
```css
.scr.is-busy { background: var(--white); color: var(--steel); }
```

### 4. Voyage de la caméra

```js
const keys = [ { cam, look, bg: C.fog }, { cam, look, bg: C.night }, { cam, look, bg: C.frost } ];   // une position clé par scène
const t = clamp01((scrollY / max - .08) / .84) * 2, i = Math.min(Math.floor(t), 1), f = smooth(clamp01((t - i - .25) / .5));
camPos.lerpVectors(keys[i].cam, keys[i + 1].cam, f);      // on reste posé sur chaque scène, on voyage entre deux
camera.position.lerp(camPos, .06);                         // amorti
scene.background.copy(bg); scene.fog.color.copy(bg);
```

### 5. Transition en pixels

```js
glitchEl.innerHTML = Array.from({ length: 14 }, () => `<i style="--x:${rnd(90)}%;--y:${rnd(90)}%;--w:${6 + rnd(26)}%;--h:${2 + rnd(12)}%;--d:${rnd(160) | 0}ms"></i>`).join('');
glitchEl.classList.remove('is-on'); void glitchEl.offsetWidth; glitchEl.classList.add('is-on');
```
```css
.glitch i { position: absolute; left: var(--x); top: var(--y); width: var(--w); height: var(--h); opacity: 0; background: linear-gradient(100deg, var(--prism-a), var(--prism-b), var(--prism-c)); }
.glitch i:nth-child(odd) { background: var(--mist); }
.glitch.is-on i { animation: px var(--dur-glitch) steps(4) both; animation-delay: var(--d); }
@keyframes px { 25% { opacity: .75; transform: translateX(-18px); } 60% { opacity: .5; transform: translateX(12px); } 100% { opacity: 0; } }
```
Sur le site, l'effet est un traitement de l'image entière dans le canvas ; ici, 14 pavés en CSS par-dessus.

## Performance (obligatoire)

Mesuré sur la démo, 1440×900, Chrome **sans carte graphique** (WebGL calculé par le processeur) : première version à **5 images/s** → **105 au repos, 76 pendant le défilement** après les règles ci-dessous (la scène elle-même est rendue 30 fois par seconde).

- **Pas de carte d'environnement ni de matière « physique »** : `MeshPhongMaterial` et `MeshLambertMaterial` à facettes. La transmission (verre réaliste) et l'environnement pré-filtré multipliaient le coût par vingt.
- **Scène rendue à 30 images/s au plus**, et pas du tout si l'onglet est masqué.
- **Résolution adaptative** : si les images dépassent 45ms, le rapport de pixels baisse par paliers de 0,2 jusqu'à 0,4 ; le canvas reste plein écran.
- **Pas d'anticrénelage** en plein écran ; rapport de pixels plafonné à 1,25.
- **Géométries légères** : octaèdres et icosaèdres à facettes, 1 800 points pour la sculpture.
- **Interface en HTML par-dessus le canvas** : le texte reste net, lisible par les lecteurs d'écran, et ne coûte rien à la 3D.
- **Repli** : si WebGL manque, trois photos traitées en gris remplacent la scène.

## Mouvement réduit

- Chargement de 0,1s, pas d'assemblage : la scène est affichée complète.
- La caméra **saute** d'une scène à l'autre (coupes franches) au lieu de voyager ; pas de transition en pixels, pas de neige, pas de flottement.
- Le texte s'affiche sans brouillage.
- La scène n'est redessinée qu'au défilement ou au redimensionnement.
