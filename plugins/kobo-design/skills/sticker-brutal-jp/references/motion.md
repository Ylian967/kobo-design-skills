# Sticker Brutal JP — mouvement

## Principes

Physique et jouet : les objets sont des autocollants épais posés sur la page. Ils **montent** quand on les survole, **s'écrasent** sur leur ombre quand on appuie, **sautent** en place quand ils apparaissent (ressort léger). Rien de flou, rien de lent : 120–240ms pour les interactions, 600ms pour les apparitions. Le shot est une image fixe : ce catalogue est une proposition cohérente avec le genre, pas une observation (voir `source.md`).

## Catalogue

Les lignes en *italique* concernent les pages Projets et Contact, **proposées** (absentes du shot).

| Moment | Effet | Durée | Courbe | Notes |
|---|---|---|---|---|
| Chargement de page | Autocollants du héros qui « pop » (scale 0.6 → 1, opacité), décalés de 80ms | 600ms | `--ease-spring` | 5 objets max |
| Apparition au défilement | Cartes qui montent de 16px et tournent de 2° → 0 | 400ms | `--ease-spring` | une fois, `IntersectionObserver` |
| Survol de bouton | Monte de 2px, ombre 5 → 7px | 120ms | `--ease-out` | |
| Appui de bouton | Descend de 5px, ombre → 0 (« écrasé ») | 120ms | `--ease-out` | aussi au clavier (`:active`) |
| Survol de carte | Monte de 4px, rotation -1°, ombre 8px | 240ms | `--ease-spring` | |
| Autocollants décoratifs | Flottement vertical de 10px, aller-retour | 6s | `--ease-out` | décalages négatifs différents |
| Bande défilante | Translation continue de -50 % | 26s | linéaire | contenu dupliqué |
| Sélecteur de langue | Le libellé bascule, le point rouge fait un petit saut | 240ms | `--ease-spring` | |
| Ouverture du menu mobile | Panneau qui tombe de -8px avec rotation 1° → 0 | 240ms | `--ease-spring` | |
| *Projets — changement de filtre* | Les cartes affichées rejouent `rise` (montent de 16px, 2° → 0) ; le compteur change (annoncé `aria-live`) | 400ms | `--ease-spring` | `display: none` → bloc relance l'animation, sans JS |
| *Projets — survol de carte* | Monte (-3px, -4px), penche -1.5° (paires +1.2°), ombre 8px, photo 1.04, **coin décollé** (`::after` scale 0 → 1 depuis le coin bas-droit) | 240ms | `--ease-spring` | appui : écrasée sur l'ombre |
| *Projets — ouverture de fiche* | `<dialog>` : opacité, monte de 24px, scale 0.92 → 1, rotation -2° → 0 ; voile en fondu | 320ms (`--dur-modal`) / 240ms | `--ease-spring` / `--ease-out` | fermeture instantanée (Échap, ✕, clic voile) |
| *Projets — bouton fermer* | Rotation 6° → -6° au survol | 240ms | `--ease-spring` | |
| *Contact — focus d'un champ* | Fond `--yellow-soft`, ombre 3 → 5px, monte de 2px | 120ms | `--ease-out` | |
| *Contact — erreur* | Bulle « ✕ » et récapitulatif qui « pop » | 240ms | `--ease-spring` | une fois par envoi |
| *Contact — envoi* | Le libellé du bouton laisse place à « • • • » révélé par `clip-path` | 900ms en boucle | `steps(4)` | `aria-busy="true"` |
| *Contact — succès* | Badge ✓ vert qui « pop » (incliné -8°) | 600ms | `--ease-spring` | le titre reçoit le focus |
| *Contact — FAQ* | Le « + » tourne de 45° et devient jaune ; la réponse tombe de -8px | 240ms | `--ease-spring` | `<details>` natif |

## Code de référence

```css
@keyframes pop { from { opacity: 0; scale: 0.6; } }
@keyframes bob { to { translate: 0 -10px; } }
@keyframes tape { to { transform: translateX(-50%); } }

.pop { animation: pop var(--dur-slow) var(--ease-spring) both; }
.pop:nth-child(2) { animation-delay: 80ms; }
.float { animation: bob 6s var(--ease-out) infinite alternate; }
.tape__track { display: flex; width: max-content; animation: tape 26s linear infinite; }

.btn { transition: translate var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out); }
.btn:hover { translate: -2px -2px; box-shadow: 7px 7px 0 0 var(--ink); }
.btn:active { translate: 5px 5px; box-shadow: 0 0 0 0 var(--ink); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; }
  .btn:hover, .card:hover { translate: none; rotate: none; }
}

/* Pages Projets / Contact */
@keyframes rise { from { opacity: 0; translate: 0 16px; rotate: 2deg; } }
@keyframes drop { from { opacity: 0; translate: 0 -8px; rotate: 1deg; } }
@keyframes modal-in { from { opacity: 0; translate: 0 24px; scale: 0.92; rotate: -2deg; } }
@keyframes dots { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
.works li { animation: rise 400ms var(--ease-spring) both; }
.modal[open] { animation: modal-in var(--dur-modal) var(--ease-spring) both; }
.qa[open] .qa__a { animation: drop var(--dur-base) var(--ease-spring) both; }
.btn[aria-busy="true"]::after { content: "• • •"; position: absolute; animation: dots 0.9s steps(4) infinite; }

@media (prefers-reduced-motion: reduce) {
  .work:hover, .work:hover img { translate: none; rotate: none; scale: none; }
  .input:focus, .qa:hover { translate: none; }
}
```

## Mouvement réduit

- Pop, flottement et bande défilante : supprimés, objets affichés à leur place finale.
- Survols : seule l'ombre change (pas de déplacement ni de rotation).
- Appui : conservé en instantané (c'est un retour d'état, pas une animation décorative).
- Menu mobile : apparition sans déplacement.
- Projets : cartes affichées directement au filtrage ; survol = ombre seule (ni montée, ni inclinaison, ni zoom photo) ; la fiche s'ouvre sans glissement.
- Contact : focus = fond jaune pâle + ombre, sans déplacement ; bulles d'erreur et badge de succès apparaissent sans « pop » ; les « • • • » d'envoi restent fixes (le libellé `aria-busy` suffit) ; la FAQ s'ouvre sans chute.
