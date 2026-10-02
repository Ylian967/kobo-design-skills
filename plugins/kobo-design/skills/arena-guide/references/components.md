# Arena Guide — composants

## Barre de navigation (80px, `--nav`)

Logo éditeur + logo jeu (emplacements) à gauche. Liens Inter 700 14px capitales blancs espacés de 36px, certains avec ▾. À droite : bouton recherche carré sombre arrondi 8px, icône langue, bouton **JOUER** (dégradé cyan, Inter 600 13px capitales +0.08em, rayon 12px, 80×32).

## Bouton principal

```css
.btn-play { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: 8px 16px; border: 0; border-radius: var(--radius-lg);
  background: var(--grad-cta); color: var(--on-accent); font: 600 var(--text-xs)/1 var(--font-ui); letter-spacing: var(--tracking-ui); text-transform: uppercase;
  transition: color var(--dur-color) var(--ease-snap), filter var(--dur-base) var(--ease); }
.btn-play:hover { filter: brightness(1.12); }
```
Version large (formulaire d'inscription) : 437×48, Inter 600 16px.

## Bouton secondaire (or)

Aplat `--gold`, texte `--on-gold` Inter 700 14px capitales, coins droits, padding 18px 32px. Utilisé pour « Regarder » dans le héros. Variante contour : bordure 0.8px `--gold`, texte blanc.

## Titre de section

```css
.title { margin: 0 0 var(--space-6); font: italic 800 var(--text-title)/var(--leading-title) var(--font-display); text-transform: uppercase; text-wrap: balance; }
.kicker { font: 400 var(--text-base) var(--font-body); }            /* ligne au-dessus (« Cinématique ») */
.subtitle { font: italic 800 var(--text-xl) var(--font-display); text-transform: uppercase; } /* « VOTRE NEXUS » */
```

## Médaillon-onglet (signature)

```html
<div role="tablist" class="medals">
  <button role="tab" aria-selected="true" class="medal medal--ally"><span class="medal__img"></span><span class="medal__label">Votre base</span></button>
  <button role="tab" aria-selected="false" class="medal medal--enemy"><span class="medal__img"></span><span class="medal__label">Base ennemie</span></button>
</div>
```
```css
.medal { display: grid; justify-items: center; gap: var(--space-4); background: none; border: 0; cursor: pointer; color: var(--muted); font: 700 var(--text-sm) var(--font-ui); text-transform: uppercase; }
.medal__img { position: relative; width: 92px; height: 92px; border-radius: 50%; border: var(--ring) solid var(--accent); padding: 4px; background-clip: content-box; }
.medal--enemy .medal__img { border-color: var(--enemy); }
.medal__img::before { content: ""; position: absolute; left: 50%; top: -10px; width: 10px; height: 10px; background: currentColor; transform: translateX(-50%) rotate(45deg); color: inherit; }
.medal[aria-selected="true"] { color: var(--text); }
.medal[aria-selected="false"] .medal__img { opacity: .7; }
```
Le **grand médaillon** (180px, anneau 8px) affiché à côté de l'explication reprend la même forme, avec un anneau extérieur ouvert en haut (deux arcs).

## Carte en fond

Image de carte (vue de dessus) à droite de la section, masquée par un dégradé radial vers `--bg` : `mask-image: radial-gradient(60% 60% at 60% 50%, #000 40%, transparent 75%)`.

## Bloc vidéo + vignettes

Vidéo 16:9 dans le container (1208px), contrôles natifs, muette, en boucle. Sous la vidéo : 4 vignettes 126×72, la sélectionnée a un **contour or 1px**, puis un filet horizontal `--line`, le titre de l'étape en Inter 700 16px capitales centré, et le paragraphe explicatif centré.

## Héros cinématique

Vidéo ou image plein cadre, voile sombre à gauche. Texte à gauche : « Cinématique » (Source Sans 18px), titre serif italique 57px, phrase en italique 18px, bouton or « Regarder ».

## Section d'introduction (blanche)

Fond `--paper`, titre en `--ink` italique, paragraphe centré `--ink`, puis une grande illustration panoramique qui fait la transition vers la section sombre suivante.

## États

- **Chargement** : squelettes `--panel` (cadre vidéo gris bleuté uni, mesuré).
- **Vide / erreur** : médaillon gris + titre italique « Rien à afficher » + bouton or.
