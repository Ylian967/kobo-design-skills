# Chrome Atelier — mouvement

## Principes

Lent, précis, joaillier : la pièce **flotte** et la planche **se trace**. Rien ne rebondit. Courbe de sortie douce `--ease-out`, durées longues pour l'entrée (`--dur-slow` 900ms), courtes pour les survols (`--dur-fast` 180ms). Le shot de référence étant une image fixe, ces mouvements sont une proposition (voir `source.md`).

## Catalogue

| Moment | Effet | Durée | Courbe | Notes |
|---|---|---|---|---|
| Chargement | Lignes de titre qui montent derrière un masque, 90ms d'écart | 900ms | `--ease-out` | `<b>` dans `<span overflow:hidden>` |
| Chargement | Texte, pilules, sélecteur : fondu + montée 28px, décalés de 100ms | 900ms | `--ease-out` | |
| Chargement | Traits de légende qui se tracent depuis la pièce (`scaleX` origine droite) | 900ms, délai 400ms | `--ease-out` | |
| En continu | Pièce qui flotte (±7px, ±1.5°) | 7s aller-retour | `--ease-inout` | `alternate infinite` |
| En continu | Point qui orbite sur le grand cercle | 24s | linéaire | `--dur-spin` |
| Survol pilule | Inversion des couleurs, flèche +3px | 180ms | `--ease-out` | |
| Appui pilule | `scale(.97)` | 180ms | `--ease-out` | |
| Survol lien nav | Soulignement tracé de gauche à droite | 420ms | `--ease-out` | sort par la droite |
| Choix du titre d'or | La pièce change de teinte (dégradés) en fondu | 420ms | `--ease-inout` | avec un vrai rendu 3D : changement de matériau |
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
