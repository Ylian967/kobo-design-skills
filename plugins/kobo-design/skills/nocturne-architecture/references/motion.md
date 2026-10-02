# Nocturne Architecture — mouvement

## Principes

**Lent, nocturne, sans rebond.** Comme une pose longue : les lumières glissent, les lettres montent, les photos respirent. Courbe principale `--ease-out` (départ vif, arrivée très douce), survols courts (`--dur-fast` 180ms), apparitions longues (`--dur-slow` 900ms, `--dur-reveal` 1200ms). Le shot de référence étant une image fixe, ces mouvements sont une proposition (voir `source.md`).

## Catalogue

| Moment | Effet | Durée | Courbe | Notes |
|---|---|---|---|---|
| Chargement | Lettres du mot-marque qui montent de 60 % en fondu, décalées de 70ms | 1200ms | `--ease-out` | démarre à 200ms |
| Héros (continu) | Photo qui zoome très lentement (1 → 1.06), comme une pose longue | 40s | `--ease-inout` | aller-retour, en pause pendant le showreel |
| Héros (continu) | Feu rouge d'antenne qui clignote | 2.4s | `steps(1)` | |
| Survol lien | Soulignement 1px qui se dessine de gauche à droite | 360ms | `--ease-out` | |
| Survol pilule | Fond éclairci, flèche qui pivote de -45° et avance de 3px | 180ms | `--ease-out` | appui `scale(.97)` |
| Survol lecture | Disque rouge à 1.1 | 360ms | `--ease-out` | |
| Survol carte | Photo à 1.04, bouton ↗ qui descend de 6px en fondu | 900ms / 360ms | `--ease-out` | aussi au focus |
| Carrousel | Défilement doux d'une carte, ligne rouge qui s'allonge | navigateur / 360ms | `--ease-out` | |
| Étape | Corps en fondu + 8px, « + » qui tourne de 45° et passe au rouge | 360ms | `--ease-out` | une seule ouverte |
| Apparition au défilement (option) | Bloc qui monte de 32px en fondu à l'entrée dans l'écran | 900ms | `--ease-out` | IntersectionObserver, uniquement sous la ligne de flottaison |

## Code de référence

```css
@keyframes rise { from { transform: translateY(60%); opacity: 0; } }
.wordmark span { display: inline-block; animation: rise var(--dur-reveal) var(--ease-out) both; animation-delay: calc(var(--i) * 70ms + 200ms); }

@keyframes breathe { to { transform: scale(1.06); } }
.city img { transform-origin: 50% 70%; animation: breathe 40s var(--ease-inout) infinite alternate; }  /* vraie photo, voir assets.md */
.hero.is-paused .city img { animation-play-state: paused; }

.card .photo { transition: transform var(--dur-slow) var(--ease-out); }
.card:hover .photo { transform: scale(1.04); }
```

```js
// Apparition au défilement (option) : ne masquer que ce qui est sous la ligne de flottaison
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }));
document.querySelectorAll('.reveal').forEach(el => el.getBoundingClientRect().top > innerHeight ? io.observe(el) : el.classList.add('is-in'));
```

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; }
}
```
Mot-marque affiché d'un coup, photo du héros fixe, pas d'apparition au défilement, carrousel sans défilement animé ; les changements d'état (étape ouverte, bouton rouge) restent visibles.
