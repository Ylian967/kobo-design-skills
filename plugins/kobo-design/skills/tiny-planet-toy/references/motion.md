# Tiny Planet Toy — mouvement

Le site de référence est **un jeu rendu entièrement en WebGL** : il n'expose ni feuille de style ni durée lisible. Ce qui suit distingue donc :

- **Observé** sur le site le 2026-10-03, par captures successives et en jouant (ordre des étapes, formes, pentes — les durées sont jugées à l'œil) ;
- **Proposé** par le skill pour une page web autour du même univers.

Le ton : un **jouet** — les choses tombent, rebondissent, s'enfoncent comme des touches ; rien n'est lisse.

## Observé sur le site

| Moment | Ce qu'on voit |
|---|---|
| Chargement | Écran blanc, enveloppe au trait, « LOADING » en petites lettres |
| Entrée | Un **volet turquoise incliné** balaie l'écran blanc de bas en haut, en un peu moins d'une seconde |
| Planète | Elle arrive petite, en haut, puis **grossit en descendant** au centre |
| Logo | Les neuf **lettres-blocs** se posent sur la planète, en grille 3 × 3 |
| Bouton | Le bloc jaune « BEGIN » apparaît en dernier, penché |
| Départ | Au clic : retour à l'écran blanc de chargement, puis le jeu |
| Dialogue | Le texte s'écrit **lettre à lettre** ; une flèche bleue fait passer à la réplique suivante |
| Jeu | Marche au clavier, caméra derrière le personnage, horizon courbe |

## Proposé

| Moment | Effet | Durée / courbe |
|---|---|---|
| Volet d'entrée | Panneau blanc incliné de `--wipe` (−7°) qui part vers le haut | `--dur-wipe` (900ms), `cubic-bezier(0.65, 0, 0.35, 1)` |
| Planète | De 0.18 à 1, en descendant | 1400ms `--ease`, retard 500ms |
| Lettres-blocs | Chacune tombe du haut de l'écran et rebondit | 700ms `--ease-drop`, 80ms d'écart |
| Bouton jaune | Grossit de 0 à 1, penché de `--tilt` | 500ms `--ease-drop`, en dernier |
| Planète au repos | Tourne lentement sur elle-même (0.16 rad/s) ; s'arrête dès qu'on choisit un quartier | rendu à 30 images/s |
| Glisser | La planète suit le doigt ou la souris | direct |
| Quartier choisi | La planète pivote pour présenter le lieu de face | 1100ms, ralenti cubique |
| Défilement | La planète glisse vers la gauche et rétrécit de 12 % ; le logo et le bouton s'effacent | lié au défilement ; `--dur` |
| Dialogue | Une lettre toutes les 28ms, curseur plein qui clignote pendant la frappe ; un premier clic sur la flèche termine la phrase, le suivant passe à la réplique d'après | `--type-speed` |
| Fiche de quartier | Se soulève de 3px en diagonale, ombre de 8px ; l'active passe au jaune | `--dur` `--ease` |
| Bouton, touche | S'enfonce de son épaisseur à l'appui, comme une vraie touche | `--dur-fast` |
| Touches de « Comment jouer » | Au survol de la fiche, les touches s'enfoncent l'une après l'autre | 900ms `--ease`, 60ms d'écart |
| Textes | Montée de 20px en fondu à l'entrée d'une section | 600 à 700ms `--ease` |

## Code

```css
/* Volet d'entrée : un panneau plus grand que l'écran, incliné, qui s'en va (transform seulement) */
.loader { position: fixed; left: -30%; top: -40%; width: 160%; height: 180%; background: var(--paper);
  transform: rotate(var(--wipe)); transition: transform var(--dur-wipe) cubic-bezier(0.65, 0, 0.35, 1); }
.is-ready .loader { transform: rotate(var(--wipe)) translateY(-115%); }

/* Lettre-bloc qui tombe */
.logo span { transform: translateY(-140vh) rotate(var(--a, 0deg)); transition: transform 700ms var(--ease-drop) var(--d, 0ms); }
.is-ready .logo span { transform: rotate(var(--a, 0deg)); }

/* Bloc qui s'enfonce : l'épaisseur est une ombre pleine */
.begin { box-shadow: 0 var(--depth) 0 0 var(--yellow-side), 0 var(--depth) 0 var(--bw) var(--ink); }
.begin:active { transform: rotate(var(--tilt)) translateY(var(--depth)); box-shadow: 0 0 0 0 var(--yellow-side), 0 0 0 var(--bw) var(--ink); }
```

```js
// Rendu à la demande : 30 images/s au plus, rien si la planète est hors écran ou immobile
const frame = t => { raf = 0; if (!visible) return;
  if (t - last < 33) { raf = requestAnimationFrame(frame); return; }
  const dt = Math.min(0.1, (t - last) / 1000); last = t;
  if (tween) { /* pivot vers un quartier */ } else if (idle && !dragging) world.rotateOnWorldAxis(up, dt * 0.16);
  renderer.render(scene, camera);
  if (tween || (idle && !dragging)) raf = requestAnimationFrame(frame); };

// Machine à écrire
timer = setInterval(() => { lineEl.textContent = text.slice(0, ++i); if (i >= text.length) clearInterval(timer); }, 28);
```

## Performance

- **Petit canvas** : la scène 3D ne couvre que la planète (620px au plus, densité de pixels limitée à 1.5), jamais tout l'écran. Le fond turquoise, les poussières et l'interface sont en HTML.
- **Rendu à la demande**, plafonné à 30 images/s ; arrêté hors écran (IntersectionObserver), onglet masqué, ou quand la planète est immobile.
- **Une dizaine de maillages** : maisons, toits, arbres sont fusionnés par couleur ; tous les contours d'encre tiennent dans un seul maillage (faces arrière, légèrement agrandies).
- Matériaux « dessin animé » à trois paliers, une seule lumière directionnelle, pas d'ombres portées, pas de post-traitement.
- Le déplacement de la planète au défilement est une transformation CSS du conteneur : la scène n'est pas redessinée pour autant.
- Les poussières sont **immobiles** ; le volet d'entrée n'anime que `transform`.
- Mesuré le 2026-10-03 dans un Chrome sans carte graphique (rendu logiciel, écran 144 Hz), 1440×900, cadence de la page pendant que la planète tourne : entrée 130 images/s, repos 140, défilement de toute la page en 4s 97, pivot vers un quartier 135. Non mesuré : la fluidité à 390px, et le glisser à la souris.

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; transition-delay: 0s !important; }
  .js .rise { opacity: 1; transform: none; }
  .planet { transform: translate3d(calc(var(--p, 0) * var(--shift, -24vw)), 0, 0); }
}
```

Le script lit aussi la préférence : la planète ne tourne plus seule, un quartier choisi s'affiche de face sans pivot, les répliques apparaissent d'un coup. On peut toujours la faire tourner à la main.
