# Chrome Atelier — mouvement

## Principes

Lent, précis, joaillier : la pièce **flotte** et la planche **se trace**. Rien ne rebondit. Courbe de sortie douce `--ease-out`, durées longues pour l'entrée (`--dur-slow` 900ms), courtes pour les survols (`--dur-fast` 180ms). Le shot de référence étant une image fixe, ces mouvements sont une proposition (voir `source.md`).

## Catalogue

| Moment | Effet | Durée | Courbe | Notes |
|---|---|---|---|---|
| Chargement | Lignes de titre qui montent derrière un masque, 90ms d'écart | 900ms | `--ease-out` | `<b>` dans `<span overflow:hidden>` |
| Chargement | Texte, pilules, sélecteur : fondu + montée 28px, décalés de 100ms | 900ms | `--ease-out` | |
| Chargement | Traits de légende qui se tracent depuis la pièce (`scaleX` origine droite) | 900ms, délai 400ms | `--ease-out` | |
| En continu | Pièce qui flotte (±7px, ±1.5°) et tourne lentement sur elle-même (3D : `position.y = sin(t·0.9)·0.08`, `rotation.y += 0.25 rad/s`, inertie au glisser) | 7s aller-retour | `--ease-inout` | en CSS pour une image fixe, dans la boucle Three.js pour la 3D (`assets.md`) |
| En continu | Point qui orbite sur le grand cercle | 24s | linéaire | `--dur-spin` |
| Survol pilule | Inversion des couleurs, flèche +3px | 180ms | `--ease-out` | |
| Appui pilule | `scale(.97)` | 180ms | `--ease-out` | |
| Survol lien nav | Soulignement tracé de gauche à droite | 420ms | `--ease-out` | sort par la droite |
| Choix du titre d'or | La pièce change de teinte en fondu | ≈ 420ms | `--ease-inout` | 3D : `material.color.lerp(cible, 0.08)` à chaque image ; image fixe : `filter: saturate()` |
| Apparition au défilement | Panneau / titre nuit : fondu + montée 24px | 900ms | `--ease-out` | optionnel, voir ci-dessous |
| Envoi du formulaire | Formulaire remplacé par la confirmation, sceau qui se dessine | 420ms | `--ease-out` | focus déplacé |

## Code de référence

```css
@keyframes line-up { from { transform: translateY(105%); } }
@keyframes rise { from { opacity: 0; transform: translateY(28px); } }
@keyframes draw { from { transform: scaleX(0); } }
@keyframes float { from { transform: translateY(-6px) rotate(-1.5deg); } to { transform: translateY(8px) rotate(1.5deg); } }
@keyframes orbit { to { transform: rotate(360deg); } }

.title span { overflow: hidden; }
.title span b { display: block; animation: line-up var(--dur-slow) var(--ease-out) both; }
.title span:nth-child(2) b { animation-delay: 90ms; }
.callout::before { animation: draw var(--dur-slow) var(--ease-out) 400ms both; }
.piece { animation: float 7s var(--ease-inout) infinite alternate; }
```

Apparition au défilement (optionnelle) — n'armer l'état caché que pour ce qui est **sous la ligne de flottaison au chargement**, pour qu'une capture ou un lecteur sans défilement voie tout :

```js
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => {
  if (el.getBoundingClientRect().top > innerHeight) { el.classList.add('is-armed'); io.observe(el); }
});
```
```css
.reveal.is-armed:not(.is-in) { opacity: 0; transform: translateY(24px); }
.reveal { transition: opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out); }
```

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; transition-delay: 0ms !important; }
}
```
- Titres, légendes et texte affichés directement (les `@keyframes` n'utilisent que `from`, donc l'état final est l'état normal).
- Pièce immobile, point d'orbite fixe en haut du cercle.
- Survols : changement de couleur instantané, sans déplacement de flèche.
- Rendu 3D : pas d'auto-rotation ; la rotation reste possible au glisser.

---

## Relevé sur le site en ligne et la vidéo du shot (2026-10-03)

| Moment | Effet | Durée / courbe | Statut |
|---|---|---|---|
| Survols (pilules, liens) | `all` / `background-color` | 0.3s `ease` | **Mesuré** |
| Déplacements (cartes, panneaux) | `transform` | 0.45s `ease` | **Mesuré** |
| Pièce posée | `floatY` : flottement vertical continu | 3s `ease-in-out`, infini | **Mesuré** |
| Traits de légende | `stroke-dashoffset` piloté par le défilement | 0.1s linéaire (suit le scroll) | **Mesuré** |
| Intro | Cercles et axes tracés au compas, nœuds qui apparaissent, puis fondu vers le héros | ≈ 1–2s | Observé (vidéo) |
| Barre → cartes | Les 3 cellules montent en cartes photo, vitesses différentes (parallaxe) | lié au défilement | Observé (vidéo) |
| Atelier | Section épinglée ; la pièce tourne et change de métal par étape | lié au défilement | Observé |
| Presse | Logos défilants ; carte d'article qui se déploie au-dessus du logo actif | ≈ 0.45s | Observé |
| Barre de navigation | Devient une barre claire collante après le héros | ≈ 0.3s | Observé |

Bibliothèques détectées : GSAP et Swiper (pas de canvas : la pièce du site est une **vidéo** détourée, pas une scène WebGL — la scène Three.js du skill reste une option).

```css
@keyframes floatY { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
.piece { animation: floatY var(--dur-float) ease-in-out infinite; }
.pill { transition: background-color var(--dur-ui) var(--ease-site), color var(--dur-ui) var(--ease-site); }
```
Mouvement réduit : pas d'intro, pas de flottement, cartes de la barre affichées en place, section atelier non épinglée.
