# Heritage Lens — mouvement

Le site de référence est un film que l'on fait avancer à la molette : la caméra traverse une reconstitution 3D, les textes apparaissent et disparaissent à des moments précis, les ornements dorés tournent sans fin. Le skill garde ce rythme avec des **photos** : chaque scène est un écran collant, et la progression du défilement dans la scène décide de ce qui est visible.

Les durées et courbes « mesuré » viennent de la feuille de style du site (voir `source.md`). Ce qui remplace la caméra 3D est proposé.

## Catalogue

| Moment | Effet | Durée / courbe | Statut |
|---|---|---|---|
| Chargement | Anneau de dentelle doré qui tourne, pourcentage au centre ; l'écran s'efface | rotation 60s linéaire ; fondu 800ms `--ease` | Rotation et pourcentage **mesurés** ; fondu proposé |
| Prologue | Phrases centrées l'une après l'autre ; la brume bleue se lève et la photo dorée remplace la photo de nuit | lié au défilement | Observé (4 phrases, brume → lumière) ; fondu entre deux photos proposé |
| Aide « Faire défiler » | Bouton rond qui flotte de 8px | 3s | Proposé (le site trace un second anneau) |
| Titre | Les lettres montent une à une | 800ms `--ease-out`, 28ms entre lettres | Observé (lettres séparées dans le site) ; valeurs proposées |
| Bouton « Entrez » | Un disque doré monte du bas et remplit le bouton, le texte passe au sombre | 450ms `--ease-expo` ; couleur 300ms `--ease` | **Mesuré** |
| Boutons ronds et pilules | Même remplissage | 650ms `--ease-expo` | **Mesuré** |
| Chapitre | Médaillon (deux dentelles qui tournent en sens contraires) + titre géant, puis récit, puis point d'intérêt | 60s et 30s linéaires | Rotations **mesurées** ; enchaînement observé |
| Caméra | La photo grossit de 1 à 1.3 pendant le défilement, puis fond vers la suivante | lié au défilement | Proposé (remplace le déplacement 3D) |
| Textes | Montée de 18px + fondu à l'entrée ; sortie vers le haut, plus rapide | 800ms `--ease` / 300ms `--ease-in` | Courbes **mesurées** ; distances proposées |
| Lentille | L'ornement tourne ; au survol la fenêtre grossit à 1.12 | 60s ; 650ms `--ease-expo` | Rotation **mesurée** ; survol proposé |
| Vue révélée | Fondu plein écran de la seconde photo, bouton fermer en haut à droite | 800ms à l'ouverture, 400ms à la fermeture | Observé (plein écran + fermer) ; fondu proposé |
| Page éditoriale | Monte du bas ; défile à l'horizontale à la molette | 1100ms `--ease-expo` | Défilement horizontal observé ; entrée proposée |
| Puce active | Anneau en pointillé qui tourne ; bulle d'aide au survol | 20s ; 400ms `--ease-out` | **Mesuré** |
| Bouton de plan | Halo qui s'élargit et s'efface | 1.5s linéaire, délai 0.5s | **Mesuré** |

## Code

```css
/* Une scène = une section haute, un écran collant */
.scene { height: calc(var(--len) * 100svh); }
.stage { position: sticky; top: 0; height: 100svh; overflow: hidden; }

/* Un bloc de texte : visible seulement dans sa plage de défilement */
.beat { opacity: 0; transform: translateY(18px);
  transition: opacity var(--dur-text) var(--ease), transform var(--dur-text) var(--ease-out); }
.beat.on { opacity: 1; transform: none; }
.beat.gone { opacity: 0; transform: translateY(-18px); transition-duration: var(--dur-fast); transition-timing-function: var(--ease-in); }

/* Remplissage doré d'un bouton */
.round::before { content: ""; position: absolute; left: 50%; top: 100%; width: 140%; aspect-ratio: 1; border-radius: 50%;
  background: var(--gold); transform: translate(-50%, 0) scale(.4); transition: transform var(--dur-fill) var(--ease-expo); }
.round:hover::before { transform: translate(-50%, -85%) scale(1); }
```

```html
<p class="phrase beat" data-on="0.26 0.46">…</p>          <!-- visible de 26 % à 46 % de la scène -->
<div class="layer b" data-fade="0.5 0.66" data-zoom="1.12 1">…</div>   <!-- apparaît de 50 % à 66 %, zoom de 1.12 à 1 -->
```

```js
// p = progression de 0 à 1 dans la scène
const p = Math.min(1, Math.max(0, -rect.top / (rect.height - innerHeight)));
beats.forEach(({ b, on }) => { b.classList.toggle('on', p >= on[0] && p <= on[1]); b.classList.toggle('gone', p > on[1]); });
fades.forEach(({ f, at }) => { f.style.opacity = lerp(0, 1, (p - at[0]) / (at[1] - at[0])); });
zooms.forEach(({ z, s }) => { z.style.transform = `scale(${lerp(s[0], s[1], p)})`; });
```

Le défilement reste **natif** (le site, lui, bloque la page et pilote tout en JavaScript) : la barre de défilement, le clavier et les ancres fonctionnent.

## Performance

- **Un seul écouteur de défilement**, un `requestAnimationFrame` au plus par image ; seules les scènes proches de l'écran sont calculées.
- Le défilement ne change que `opacity` et `transform: scale()` sur deux photos par scène ; les textes sont des **classes** basculées, animées par des transitions CSS.
- **Pas de filtre ni de mode de fusion** : la brume bleue du prologue est un simple calque de couleur dont l'opacité baisse ; les voiles de lisibilité sont des dégradés fixes.
- **Vue révélée en simple fondu.** Trois versions ont été mesurées dans un Chrome sans carte graphique : cercle qui s'ouvre (`clip-path`) 33–36 images/s, zoom depuis la lentille 33, fondu seul 56. Un anneau doré qui s'élargit sur tout l'écran faisait à lui seul tomber à 27.
- Les ornements (SVG) ne font que tourner (`transform`) ; ils sont mis en pause quand une fenêtre recouvre la scène.
- Photos en 2000px pour les scènes, 1600px pour les vues révélées, 400px pour les lentilles ; `loading="lazy"` après le prologue.
- Mesuré (rendu logiciel, écran 144 Hz), 1440×900 : prologue 51 images/s, chapitre 61 à 65, scène au repos 74 à 84, ouverture de la page éditoriale 77 à 82, son défilement 143 ; 390×844 : 134. Ouverture de la vue révélée : 56 (mesure faite en neutralisant le zoom ; la version finale, fondu seul, n'a pas été re-mesurée séparément).

## Mouvement réduit

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition-duration: 1ms !important; transition-delay: 0s !important; }
  .layer { transform: none !important; }
}
```

Les ornements ne tournent plus, les photos ne zooment plus, les textes changent sans transition ; le contenu et l'ordre de lecture sont identiques. Le premier bouton rond en bas à droite applique le même réglage à la demande (classe `.calm`), comme le panneau d'accessibilité du site.
