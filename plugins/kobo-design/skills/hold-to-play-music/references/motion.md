# Hold To Play Music — mouvement

Le site de référence se joue comme un instrument : **on maintient une touche, on relâche**. Pendant l'appui, des plans vidéo en couleur défilent à toute vitesse ; au relâcher, un artiste arrive. Tout le reste est fait de **coupes franches** : la courbe dominante du site, `cubic-bezier(1, 0, 0, 1)`, reste immobile puis bascule d'un coup.

Les durées et courbes « mesuré » viennent de la feuille de style du site ; « observé » vient des captures (voir `source.md`). La démo remplace les vidéos par des photos.

## Catalogue

| Moment | Effet | Durée / courbe | Statut |
|---|---|---|---|
| Écran blanc | Logo, pictogrammes, phrase aux mots colorés ; l'écran s'efface | 300ms `--ease-soft` | Écran observé ; fondu **mesuré** (opacité 0.3s) |
| Mot peint | Des traits de pinceau dispersés se rangent en lettres | 900ms `--ease-slide`, 45ms entre lettres | Observé (traits bleus, orange, blancs) ; valeurs proposées |
| Accueil | Plans noir et blanc qui se succèdent en coupe franche, sous un grain fixe | un plan toutes les 2s (`--cut`) | Observé (vidéos, 2 à 3s par plan) ; cadence proposée |
| Maintenir | Le contour de la touche se remplit en orange ; les plans passent en couleur et défilent ; le mot peint devient blanc | remplissage `--hold` (1.5s) linéaire ; un plan toutes les 180ms ; couleurs 500ms `--ease-snap` | Remplissage et changement de texte observés (≈ 1.5s) ; couleur de la touche **mesurée** (#f60, 0.1s linéaire) ; cadence proposée |
| Prêt | « Maintenez » devient « Relâchez », le libellé de la touche passe à l'orange | 100ms linéaire | **Mesuré** |
| Relâcher trop tôt | Le contour se vide, retour au plan précédent | 300ms `--ease-soft` | Proposé |
| Arrivée d'un artiste | Nom + morceau (1.7s), puis l'année (1.2s), puis la scène et ses commandes | bascules 500ms `--ease-snap` | Enchaînement observé ; bascule **mesurée** |
| Pochette | La vignette monte de 40px | 1s `--ease-push` | **Mesuré** (`push-cover 1s cubic-bezier(.19,1,.22,1)`) |
| Touche de scène | La touche clignote ; la maintenir rallume la scène en couleur | clignotement 0.9s en 2 pas | Site : `blink .3s infinite` **mesuré**, ralenti ici ; effet de scène observé (une interaction différente par artiste) |
| Pochette ouverte | Voile sombre, la pochette glisse de 60px | 300ms + 700ms `--ease-slide` | Glissement **mesuré** (0.7s) |
| Liens | Changement de couleur | 500ms `--ease-snap` | **Mesuré** |

## Code

```css
/* La touche : deux contours superposés, le second se trace pendant l'appui */
.key .fill-line { stroke: var(--hot); stroke-dasharray: 1; stroke-dashoffset: 1;   /* pathLength="1" sur le <rect> */
  transition: stroke-dashoffset var(--dur-fade) var(--ease-soft); }
.holding .key .fill-line { stroke-dashoffset: 0; transition: stroke-dashoffset var(--hold) linear; }
.ready .key { color: var(--hot); }

/* Coupes franches : on montre ou on cache, jamais de fondu */
.shots img { position: absolute; inset: 0; visibility: hidden; }
.shots img.show { visibility: visible; }

/* Bascule nette du texte */
.artist > * { opacity: 0; transition: opacity var(--dur-snap) var(--ease-snap); }
```

```js
const startHold = () => {
  holding = true; body.classList.add('holding', 'zap');
  zapTimer = setInterval(() => show(nextColorShot()), ZAP);          // plans couleur
  holdTimer = setTimeout(() => { ready = true; body.classList.add('ready'); }, HOLD);
};
const endHold = () => {
  clearTimeout(holdTimer); clearInterval(zapTimer);
  body.classList.remove('holding', 'zap', 'ready');
  ready ? next() : showCurrent();                                    // relâché trop tôt : rien ne change
};
addEventListener('keydown', e => { if (e.code === 'Space' && !e.repeat) { e.preventDefault(); startHold(); } });
addEventListener('keyup',   e => { if (e.code === 'Space') endHold(); });
addEventListener('blur', endHold);                                   // fenêtre quittée pendant l'appui
```

Souris et doigt : `pointerdown` / `pointerup` sur la touche dessinée (avec `setPointerCapture` et `touch-action: none`). Clavier seul : Entrée sur la touche passe directement à la suite.

## Performance

- **Aucune animation continue en plein écran.** Les plans changent par `visibility`, ce qui ne coûte rien. Un zoom lent sur la photo ou un grain animé faisaient chacun tomber l'accueil à 34 images/s (27 avec les deux) en rendu logiciel : ils ont été retirés. Avec de vraies vidéos, le mouvement vient de la vidéo elle-même.
- **Noir et blanc fait par le serveur d'images** (`sat=-100`), pas par `filter: grayscale()` : chaque photo existe en deux fichiers, gris et couleur.
- **Grain** : une tuile de bruit de 256px tirée une fois dans un canvas, posée en fond répété, **fixe**.
- **Filtre du lettrage posé après coup** : le filtre SVG qui rend les bords irréguliers n'est appliqué qu'une fois les lettres rangées, et le mot est isolé dans son propre calque (`will-change: transform`) pour ne pas être recalculé quand le fond change.
- Les minuteries (`setInterval` des plans) sont arrêtées dès le relâcher ou la perte du focus ; aucune boucle `requestAnimationFrame`.
- Mesuré dans un Chrome sans carte graphique (rendu logiciel, écran 144 Hz), 1440×900 : assemblage du mot 129 images/s, accueil 142, appui 96, arrivée d'un artiste 138, touche de scène 113, ouverture de la pochette 94 ; 390×844 (avant ces retraits) : 125 à 145.

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; transition-delay: 0s !important; }
  .paint span { transform: rotate(var(--tilt)) scaleY(var(--tall)); }
}
```

Le mot peint est en place d'emblée, et pendant l'appui **un seul plan couleur** s'affiche au lieu du défilement rapide (les changements d'image à 180ms peuvent gêner). L'enchaînement nom → année → scène est raccourci.
