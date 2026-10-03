# Lore Frame Editorial — mouvement

Le mouvement **est** le style : la page se comporte comme un terminal qui ouvre des dossiers d'archives. Tout est piloté par le défilement ou par un événement précis, rien ne bouge « pour décorer ». Relevé sur la référence le 2026-10-03 (image par image) ; les durées marquées ≈ sont estimées, les autres viennent des styles du site.

## Les 9 mouvements signature

| # | Mouvement | Déclencheur | Ce qu'on voit | Durée / courbe |
|---|---|---|---|---|
| 1 | **Chargement terminal** | Arrivée | Page blanche ; un filet horizontal pleine largeur se remplit en noir ; à gauche « ▸▸ CHARGEMENT – 47% » en mono, à droite un **chemin de fichier qui se tape tout seul** (`HTTPS://…/ARCHIVE/KAI-14/…`) ; un **cercle « cliquer pour activer le son »** suit le pointeur, son anneau en tirets tourne | ≈ 1,8–3s, linéaire |
| 2 | **Fusion du logo** | Fin du chargement | Des **barres arrondies noires** (comme un code-barres) jaillissent de haut en bas, se touchent et **fondent les unes dans les autres comme du liquide**, puis se figent en logo géant ; elles se retirent ensuite pour révéler l'illustration | ≈ 1,6s, `--ease-in-out-cubic` |
| 3 | **Décodage de texte** | Entrée à l'écran, survol, ouverture du menu | Les libellés mono et les mots du menu apparaissent en **lettres aléatoires qui se fixent une à une** de gauche à droite (« JOUQKW » → « JOURNAL ») | 40ms par tirage, 2–3 tirages par lettre |
| 4 | **Révélation des titres** | Défilement | Les phrases-chapitres sont d'abord **gris clair** ; chaque mot passe au noir (ou au blanc sur illustration) à mesure que la phrase traverse l'écran | liée au défilement |
| 5 | **Texte tapé** | Entrée à l'écran | Les petits paragraphes s'écrivent **caractère par caractère** (« Isolé dans le Ne… ») | ≈ 18ms par caractère |
| 6 | **Planche qui se plie** | Défilement | Les images (forme de **dossier à onglet**) penchent et se déforment légèrement selon la vitesse de défilement, puis se redressent à l'arrêt ; en sortie, elles basculent de 2–4° | ressort, ≈ `--dur-panel` |
| 7 | **Héros → planche** | Défilement du 1er écran | L'illustration plein écran **rétrécit en planche** et glisse à droite pendant qu'un **panneau blanc à bord biseauté** entre par la gauche ; le titre suivant apparaît | liée au défilement |
| 8 | **Chapitre plein cadre** | Défilement | Une petite planche **grandit jusqu'à remplir le cadre**, la légende centrée se révèle, puis la planche **ressort en biais** (bord bas déformé) pour laisser la place à la suivante | liée au défilement |
| 9 | **Menu** | Clic sur l'icône du rail | Le panneau noir **glisse depuis le rail** (coins 10px), la page derrière **passe en gris** ; les 6 mots du menu se **décodent** l'un après l'autre ; la page active est sur **fond citron** avec « PAGE 001 » ; au survol, bloc **blanc à coin coupé** + décodage | panneau ≈ 700ms `--ease-out-quart` ; décalage 60ms par mot |

### Mouvements secondaires

| Mouvement | Détail |
|---|---|
| Barre de progression du cadre | Le bloc gris clair (`--panel`) de la barre du haut s'allonge de la gauche avec la progression du défilement (`the-frame-progress` sur le site). |
| Nav de section | Le carré « ■ » passe d'un lien à l'autre (PROJET → LE BASTION → FACTIONS → LE MONDE) quand la section correspondante occupe l'écran ; transition de couleur 200ms. |
| Inversion du cadre | Sur illustration, filets en `--line-light`, textes du cadre en blanc ; sur blanc, `--line-dark` et noir. Changement à l'entrée de la section, 200ms. |
| Rideau de barres | Entre deux grandes sections, le même motif de barres liquides que le mouvement 2, en **blanc**, balaie l'écran au-dessus de l'illustration. |
| Éventail de cartes | La rangée de portraits (section collection) se **réorganise toutes les ≈ 2,4s** : chaque carte glisse d'une place, la plus grande au centre. |
| Compteur roulant | Le grand nombre vertical en police hexagonale change (« 05K » → « 10K ») en faisant **rouler ses chiffres**. |
| Cartes qui s'écrasent | Sur le mot géant « GARDIENS », les planches flottantes **s'aplatissent horizontalement** (scaleX → 0) en sortant. |
| Barres de son | L'icône « ıIıI » en bas du rail anime ses barres en boucle quand le son est actif. |
| Fondu des vignettes | Dans les grilles (galerie), chaque image arrive **délavée et grise** puis reprend ses couleurs au chargement (≈ 600ms). |
| Survol des cellules | Dans les grilles à filets (équipe), une **planche illustrée surgit** au survol, légèrement tournée et débordant de la cellule. |

## Code de référence (vanilla, sans dépendance)

Toutes les fonctions lisent les tokens et **ne font rien** si `prefers-reduced-motion: reduce` est actif (l'état final est affiché directement).

```js
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = v => Math.min(1, Math.max(0, v));
// progression 0→1 d'un élément qui traverse l'écran
const progress = el => { const r = el.getBoundingClientRect(); return clamp01((innerHeight - r.top) / (innerHeight + r.height)); };
```

### 3. Décodage (scramble)

```js
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function scramble(el, { tick = 40, rounds = 3 } = {}) {
  const final = el.dataset.text ??= el.textContent;
  if (reduce) { el.textContent = final; return; }
  let frame = 0;
  clearInterval(el._scr);
  el._scr = setInterval(() => {
    const fixed = Math.floor(frame / rounds);            // lettres déjà figées
    el.textContent = [...final].map((c, i) =>
      i < fixed || c === ' ' ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]).join('');
    if (fixed >= final.length) clearInterval(el._scr);
    frame++;
  }, tick);
}
// à l'entrée à l'écran
new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { scramble(e.target); } }), { threshold: .6 })
  .observe(el);
```
Accessibilité : le vrai texte reste dans `aria-label` du parent (ou un `.sr-only`), le texte qui défile est `aria-hidden="true"`.

### 4. Révélation des titres mot à mot

```js
// HTML : <h2 class="statement" data-reveal>Un monde familier… sur une autre voie.</h2>
document.querySelectorAll('[data-reveal]').forEach(h => {
  h.setAttribute('aria-label', h.textContent);
  h.innerHTML = h.textContent.split(' ').map(w => `<span aria-hidden="true">${w}</span>`).join(' ');
});
function revealTick() {
  document.querySelectorAll('[data-reveal]').forEach(h => {
    const words = h.children, p = clamp01((innerHeight * .85 - h.getBoundingClientRect().top) / (innerHeight * .5));
    [...words].forEach((w, i) => w.classList.toggle('is-on', i < p * words.length));
  });
}
```
```css
[data-reveal] span { color: var(--reveal-from); transition: color var(--dur-ui) linear; }
[data-reveal] span.is-on { color: var(--ink); }
.on-art [data-reveal] span { color: var(--reveal-from-dark); }
.on-art [data-reveal] span.is-on { color: var(--paper); }
```

### 5. Texte tapé

```js
function type(el, speed = 18) {
  const full = el.dataset.text ??= el.textContent;
  if (reduce) { el.textContent = full; return; }
  let i = 0; el.textContent = '';
  const t = setInterval(() => { el.textContent = full.slice(0, ++i); if (i >= full.length) clearInterval(t); }, speed);
}
```

### 6. Planche qui se plie selon la vitesse

Sur la référence, les planches sont des plans WebGL déformés. En CSS, on obtient l'essentiel avec une inclinaison et un cisaillement proportionnels à la vitesse, amortis :

```js
let last = scrollY, vel = 0;
function bendTick() {
  const v = scrollY - last; last = scrollY;
  vel = lerp(vel, Math.max(-60, Math.min(60, v)), .12);       // ressort
  document.querySelectorAll('.planche').forEach((p, i) => {
    const side = i % 2 ? 1 : -1;
    p.style.transform = `perspective(900px) rotateX(${vel * -.08}deg) rotate(${vel * .025 * side}deg) skewY(${vel * .03}deg)`;
  });
}
```

### 7 et 8. Héros → planche, chapitre plein cadre

Section **collante** (`position: sticky`) plus haute que l'écran ; la progression interne pilote les propriétés :

```js
function pinTick(section, apply) {
  const r = section.getBoundingClientRect();
  const p = clamp01(-r.top / (r.height - innerHeight));   // 0 au début de la section, 1 à la fin
  apply(p);
}
// héros : l'image passe de plein cadre à planche à droite
pinTick(hero, p => {
  const e = Math.min(1, p * 1.6);
  heroArt.style.clipPath = `inset(${e * 14}% ${e * 4}% ${e * 8}% ${e * 36}% round ${e * 16}px)`;
  heroArt.style.transform = `rotate(${e * -1.5}deg)`;
  heroPanel.style.transform = `translateX(${(1 - e) * -100}%)`;   // panneau blanc biseauté
});
// chapitre : petite planche → plein cadre → sortie en biais
pinTick(chapter, p => {
  const grow = clamp01(p / .35), leave = clamp01((p - .75) / .25);
  art.style.clipPath = `inset(${(1 - grow) * 22}% ${(1 - grow) * 30}% ${(1 - grow) * 22}% ${(1 - grow) * 30}% round ${16 - grow * 6}px)`;
  art.style.transform = `translateY(${leave * -30}%) rotate(${leave * -3}deg)`;
});
```

### 2. Fusion du logo (barres liquides)

Effet « goo » : des formes noires floutées puis re-contrastées fusionnent quand elles se touchent. Le logo est un **signe** (texte en police hexagonale dans un SVG), pas une illustration.

```html
<svg class="goo" viewBox="0 0 1200 600" aria-hidden="true">
  <defs><filter id="goo"><feGaussianBlur in="SourceGraphic" stdDeviation="10"/>
    <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -12"/></filter></defs>
  <g filter="url(#goo)">
    <g class="bars"><!-- 18 à 24 <rect rx="16"> verticaux, hauteurs variées --></g>
    <text class="mark" x="600" y="390" text-anchor="middle">AXO</text>
  </g>
</svg>
```
```css
.goo .bars rect { transform-box: fill-box; transform-origin: center; animation: bar 1.6s var(--ease-in-out-cubic) both; }
.goo .bars rect:nth-child(odd) { animation-delay: .08s; }
@keyframes bar { 0% { transform: scaleY(0); } 45% { transform: scaleY(1); } 100% { transform: scaleY(.05) translateY(40%); } }
.goo .mark { font: var(--weight-hex) 300px/1 var(--font-hex); letter-spacing: var(--ls-hex); animation: mark 1.6s var(--ease-in-out-cubic) both; }
@keyframes mark { 0%, 35% { opacity: 0; transform: scale(1.15); } 70%, 100% { opacity: 1; transform: none; } }
```

### 9. Menu

```css
.menu { position: fixed; inset: var(--frame-pad) auto var(--frame-pad) var(--frame-pad); width: min(640px, 100% - 2 * var(--frame-pad));
  border-radius: var(--frame-radius); background: var(--ink); clip-path: inset(0 100% 0 0 round var(--frame-radius));
  transition: clip-path var(--dur-menu) var(--ease-out-quart); }
.menu.is-open { clip-path: inset(0 0 0 0 round var(--frame-radius)); }
.page { transition: filter var(--dur-menu) var(--ease-out-quart); }
body.menu-open .page { filter: grayscale(1) brightness(.75); }
```
À l'ouverture : `scramble()` sur chaque mot avec 60ms de décalage ; focus envoyé sur le premier lien ; `Échap` ferme.

## Mouvement réduit

- Pas de chargement animé : le logo apparaît fixe, puis l'illustration.
- Titres directement révélés, textes complets, pas de décodage ni de frappe.
- Planches droites, sections non collantes (les images s'affichent les unes sous les autres à leur taille finale).
- Menu : apparition sans glissement, mots fixes.
- L'éventail de cartes et le compteur ne tournent pas ; le son reste coupé par défaut.
