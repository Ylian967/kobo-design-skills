# Bubble Publisher Hub — composants

## Bulle (signature)

```css
.bubble { position: relative; border-radius: var(--radius); background: var(--bubble-bg, var(--bg)); color: var(--bubble-fg, var(--text)); }
.bubble::after { content: ""; position: absolute; left: 0; bottom: calc(var(--tail) * -1 + 1px); width: var(--tail); height: var(--tail);
  background: inherit; clip-path: polygon(0 0, 100% 0, 0 100%); }
```
Variantes : `--bubble-bg: var(--ink); --bubble-fg: var(--on-ink)` (titre noir) ; blanche (encart, carte) ; rouge (logo, pastilles du collage).

## Barre double

- **Barre noire** 72px : compte, langue, logo éditeur en contour blanc à droite.
- **Filet 4 couleurs** (4px) qui part à ~28 % de la largeur.
- **Barre blanche** 72px : logo-bulle rouge à gauche (contour rouge 3px, texte noir 700), liens centrés Montserrat 600 16px noirs (padding 0 19px), loupe à droite.
- Au défilement la barre noire disparaît, la barre blanche reste collée.

## Bouton rouge

```css
.btn-red { display: inline-flex; align-items: center; justify-content: center; min-height: 52px; padding: 0 var(--space-9); border-radius: var(--radius-btn);
  background: var(--red); color: var(--on-red); font: 700 var(--text-sm)/1 var(--font); letter-spacing: var(--tracking-caps); text-transform: uppercase; text-decoration: none;
  transition: background var(--dur-fast) var(--ease); }
.btn-red:hover { background: var(--red-light); }
```

## Lien souligné

Capitales 700 14px +0.1em, noir, soulignement 2px noir décalé de 6px (« REJOIGNEZ L'AVENTURE »).

## Encart de jeu

Bulle blanche (≈ 350px) posée à droite d'un visuel plein cadre : titre rouge 24px 700 (nom + « est maintenant disponible »), puis bouton rouge pleine largeur « Acheter maintenant ! ». Plusieurs encarts peuvent s'empiler.

## Carte de sortie

Bulle à fond image (ratio 4:3), dégradé noir en bas, logo du jeu en bas à gauche (emplacement), date `JJ/MM/AAAA` blanche 16px en bas à droite. Grille de 3, gouttière 16px. Bouton rouge centré dessous « Toutes les prochaines sorties ».

## Titre-bulle

Bulle noire (ou blanche sur visuel) contenant un titre 48px 700 (« Rejoins le Club ! », « Deviens playtesteur ! »), posée en haut à gauche de la section, padding 12px 20px.

## Section club

Fond `--club` avec de grands pictogrammes de manettes/bulles en contour blanc translucide ; titre-bulle noir ; panneau blanc arrondi dessous contenant une icône rouge (trophée), un texte et un carrousel de cartes à bandeau dégradé `--grad-card`, flèches ← → rouges (la précédente pâle si inactive).

## Collage (fenêtre d'inscription)

Grille de tuiles inclinées de 15°, chacune une forme de bulle différente (coins arrondis variables, une pointe) : images, aplats noirs, cercles rouges. À droite : icône enveloppe rouge, titre 32px 700, bouton rouge « Je m'inscris ». Bouton fermer carré en haut à droite.

## Icônes

Pictogrammes au trait rouge 2px (manette, enveloppe, trophée) dans un cadre-bulle rouge.

## États

- **Chargement** : cartes en bulle grise `#eef0f2` qui pulsent doucement.
- **Vide** : titre-bulle + phrase + bouton rouge.
- **Erreur** : bulle rouge, texte blanc, lien souligné « Réessayer ».
