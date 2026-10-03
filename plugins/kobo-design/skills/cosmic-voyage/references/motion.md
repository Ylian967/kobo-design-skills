# Cosmic Voyage — mouvement

Le site de référence bouge peu et vite : presque tout est un fondu ou un glissement de 0,2 à 0,5s. Les valeurs « mesurées » viennent des feuilles de style de la page (lues le 2026-10-03) ; « observé » = vu sur captures successives, sans valeur lisible ; « proposé » = ajouté par le skill.

## Principes

- **On voyage, puis on lit** : un seul grand effet, le saut en hyperespace à l'arrivée. Ensuite la page est calme : la nuit scintille, les panneaux changent en fondu.
- **Linéaire et court** pour l'interface (0,2s `linear` sur les boutons), `ease-in-out` pour ce qui glisse (0,5s).
- **Rien ne rebondit.** Les seuls mouvements continus sont minuscules : étoiles, barres de musique, trait « défiler ».

## Les 7 mouvements signature

| # | Nom | Quand | Ce qui se passe | Durée / courbe |
|---|---|---|---|---|
| 1 | **Saut en hyperespace** | arrivée | Écran noir, logo en haut à gauche ; des traits de lumière (blanc, or, bleu) fusent du centre et accélèrent ; fondu vers la page | observé : ≈ 2s ; démo 2,2s + fondu 0,6s |
| 2 | **Barre qui s'efface** | défilement | La barre de navigation glisse hors de l'écran en descendant et revient en remontant | mesuré : `transform 0.5s ease-in-out` |
| 3 | **Nuit qui scintille** | en continu | Quelques étoiles à halo bleu s'éteignent et se rallument, chacune à son rythme | mesuré : `fade-out` de 1,08 à 1,88s, `ease`, aller-retour, retards 0,5 à 1,2s |
| 4 | **Carrousel d'actualités** | flèches | Les cartes glissent d'un cran ; le compteur « 01 / 05 » suit | observé (Swiper) ; démo 0,5s `--ease-out` |
| 5 | **Changement de personnage** | clic sur une carte, une vignette ou un emblème | Le nom et le texte glissent de 16px en s'effaçant, le portrait part de l'autre côté, puis le nouveau contenu revient ; l'emblème de sa faction s'allume dans la frise | mesuré : `opacity 0.4s, transform 0.4s` sur le nom ; bascule de visibilité 0,6s |
| 6 | **Mondes au survol** | survol d'un monde | L'icône grossit, son halo bleu s'élargit | mesuré : `opacity 0.3s, transform 0.3s` sur les éléments de la carte |
| 7 | **Lecture** | en continu | L'anneau dégradé du bouton lecture tourne ; les 5 barres de l'égaliseur montent et descendent | mesuré : barres 0,3 à 0,7s `ease` en aller-retour ; anneau : rotation proposée 4s |

### Mouvements secondaires

| Élément | Effet | Source |
|---|---|---|
| Bouton doré, boutons de boutique, « En savoir plus » | Fond et bord changent d'un coup | mesuré : `all 0.2s linear` |
| Lien de navigation | Passe au bleu ; filet bleu sous le lien actif | mesuré (couleur) ; filet 0,3s proposé |
| Menu déroulant de la nav | Fondu | mesuré : `opacity 0.2s` |
| Plaque « Télécharger » | Un reflet clair la traverse, puis pause | mesuré : image clé `left: -100% → 100%` à mi-cycle ; cycle de 4s proposé |
| « Défiler » | Le trait s'allonge et se rétracte ; chevron qui descend de 0,5rem | mesuré : 2s `linear`, aller-retour |
| Changement de page | Fondu | mesuré : `0.3s linear` |
| Fenêtres (connexion, messages) | Le voile fonce, la fenêtre grandit de 0,3 à 1 | mesuré : 0,2s `ease` ; courbe `cubic-bezier(0.15, 0.59, 0.45, 0.89)` |
| Cartes d'actualité et de personnage | Image qui grossit à 1,05, bord doré plein ; la carte choisie remonte de 8px | proposé |
| Titres et blocs | Montent de 24px en fondu à l'entrée | proposé : 0,6s `--ease-out` |

## Code de référence (vanilla, sans dépendance)

### 1. Saut en hyperespace

```js
const stars = Array.from({ length: 260 }, () => ({ a: Math.random() * 6.283, r: Math.random() * .2 + .02, s: Math.random() * .9 + .4, c: cols[Math.random() * 3 | 0] }));
(function tick(now) {
  const p = Math.min(1, (now - t0) / 2200), speed = .004 + p * p * .05;         // accélération
  cx.globalAlpha = .28; cx.fillStyle = fond; cx.fillRect(0, 0, W, H);           // on efface à moitié : les traits laissent une traînée
  for (const s of stars) { const r0 = s.r; s.r += speed * s.s * (1 + s.r * 6);  // plus loin du centre, plus vite
    cx.beginPath(); cx.moveTo(W / 2 + Math.cos(s.a) * r0 * W, H / 2 + Math.sin(s.a) * r0 * W);
    cx.lineTo(W / 2 + Math.cos(s.a) * s.r * W, H / 2 + Math.sin(s.a) * s.r * W); cx.stroke(); }
  p < 1 ? requestAnimationFrame(tick) : done();
})(t0);
setTimeout(done, 2200 + 1200);   // filet de sécurité : dans un onglet masqué, les images ne tournent pas et l'intro resterait bloquée
```
Les trois couleurs des traits sont lues dans les tokens (`--text`, `--gold`, `--link`). Canvas en demi-résolution.

### 2. Barre qui s'efface

```css
.nav { transition: transform var(--dur-slow) ease-in-out; }  .nav.is-hidden { transform: translateY(-101%); }
```
```js
addEventListener('scroll', () => { const y = scrollY; nav.classList.toggle('is-hidden', y > lastY && y > innerHeight * .6); lastY = y; }, { passive: true });
```

### 3. Étoiles

```css
.star { border-radius: 50%; background: var(--text); box-shadow: 0 0 8px 2px color-mix(in srgb, var(--halo) 80%, transparent);
  animation: twinkle var(--t, 1.4s) ease var(--d, 0s) infinite alternate; }
@keyframes twinkle { to { opacity: 0; } }
```
Une quinzaine d'étoiles au plus, posées en JS avec `--t` entre 1,08 et 1,88s.

### 5. Changement de personnage

```css
.panel [data-swap], .panel__art { transition: opacity var(--dur-name) ease, transform var(--dur-name) ease; }
.panel.is-swap [data-swap] { opacity: 0; transform: translateX(-16px); }
.panel.is-swap .panel__art { opacity: 0; transform: translateX(24px); }
```
```js
panel.classList.add('is-swap');
setTimeout(() => { fill(i); panel.classList.remove('is-swap'); }, 400);   // on change le contenu quand il est invisible
```

## Performance (obligatoire)

Mesuré sur la démo, 1440×900, Chrome sans carte graphique : **132 images/s** pendant le saut en hyperespace, **144** au repos et pendant tout le défilement (plafond de l'écran).

- **Aucune boucle après l'intro** : le canvas s'arrête et disparaît ; le reste est en CSS.
- **Le seul écouteur de défilement** sert à la barre de navigation (`passive`), sans calcul de position d'éléments.
- **Peu d'étoiles animées** (14), petites ; le ciel lui-même est une photo fixe sous un dégradé.
- **Le verre est peint, pas flouté** : sur le site le panneau est une image ; ici des dégradés translucides. Pas de `backdrop-filter`.
- **N'animer que `transform` et `opacity`.**
- **Images** : visuel du héros en `fetchpriority="high"`, le reste en `loading="lazy" decoding="async"` (sauf le portrait de la fiche, qui change au clic).

## Mouvement réduit

- Pas de saut en hyperespace : la page s'ouvre sur le héros.
- Pas d'étoiles animées, de barres de musique, d'anneau tournant ni de reflet.
- Le personnage change sans glissement ; le carrousel saute d'une carte à l'autre.
- Tous les blocs sont visibles sans attendre le défilement.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
  html { scroll-behavior: auto; }
}
```
