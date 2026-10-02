# Sticker Brutal JP — composants

Chaque composant : rôle, anatomie, valeurs (en tokens), états, code de référence. Valeurs estimées sur les captures (voir `source.md`). Tous les extraits n'utilisent que des `var(--…)`.

## La brique : autocollant

Tout objet (bouton, carte, bulle, tuile, forme décorative) part de cette recette.

```css
.sticker {
  border: var(--stroke) solid var(--ink);   /* 3px ; 2px pour cartes et puces */
  box-shadow: var(--shadow-hard);           /* 5px 5px 0 — jamais de flou */
  background: var(--yellow);                /* un aplat de la palette */
}
```

- Formes décoratives : demi-cercle (`border-radius: 92px 92px 0 0` sur un rectangle 2:1), carré arrondi (16px), goutte (`50% 50% 50% 8px`), étoile (`clip-path` + `filter: drop-shadow(3px 3px 0 var(--ink))` car `clip-path` coupe l'ombre).
- Inclinaison : une valeur par objet entre -18° et +22°, en alternant les sens.

## Bouton principal

- **Rôle** : l'action de la page (« 無料で相談する »). Un seul par écran.
- **Anatomie** : rectangle rayon 8px, fond `--yellow`, contour 3px, ombre dure 5px, Noto Sans JP 900 16px, flèche épaisse optionnelle. Hauteur 52px.
- **États** : repos ; survol (monte de 2px, ombre 7px) ; appui (descend de 5px, ombre 0 : il « s'écrase ») ; focus (contour 3px noir décalé de 3px) ; désactivé (fond `--paper`, contour en pointillés, pas d'ombre) ; chargement (texte remplacé par 3 points qui sautent, largeur figée).

```html
<a class="btn btn--primary" href="#contact">無料で相談する<svg aria-hidden="true"><use href="#i-arrow"/></svg></a>
```

```css
.btn { display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); min-height: 52px; padding: 0 var(--space-6);
  border: var(--stroke) solid var(--ink); border-radius: var(--radius-sm); box-shadow: var(--shadow-hard);
  font: 900 var(--text-base)/1 var(--font-jp); color: var(--ink); text-decoration: none; cursor: pointer;
  transition: translate var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out); }
.btn--primary { background: var(--yellow); }
.btn:hover { translate: -2px -2px; box-shadow: 7px 7px 0 0 var(--ink); }
.btn:active { translate: 5px 5px; box-shadow: 0 0 0 0 var(--ink); }
.btn:focus-visible { outline: var(--stroke) solid var(--ink); outline-offset: 3px; }
.btn:disabled, .btn[aria-disabled="true"] { background: var(--paper); border-style: dashed; box-shadow: none; translate: none; cursor: not-allowed; }
.btn[aria-busy="true"] { color: transparent; position: relative; }
.btn[aria-busy="true"]::after { content: "• • •"; position: absolute; color: var(--ink); animation: dots 0.9s steps(3) infinite; }
@keyframes dots { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
```

## Bouton secondaire

Même gabarit, fond `--card` (`.btn--ghost`). Sur fond jaune (bloc contact), le bouton secondaire devient le principal visuel : fond `--card`.

## Navigation

- **Logo** : pilule blanche à contour 2px, point rose contouré + nom en Archivo 900 16px.
- **Liens** : Noto Sans JP 700 14px, pilule invisible qui prend un contour noir et un fond blanc au survol ; `aria-current="page"` → fond `--ink`, texte `--paper`.
- **Sélecteur de langue** : pilule `--pink`, contour 2px, ombre 3px, point `--red` contouré, libellé « 日本語 JA ». C'est un bouton : son libellé change avec la langue (le point rouge ne porte aucune information seul).
- **Mobile** : liens masqués, bouton carré 44px (contour + ombre 3px) avec trois traits épais ; le menu s'ouvre en panneau `--paper` plein écran à contour, liens en Noto Sans JP 900 28px.

```html
<header class="nav">
  <a class="logo" href="/"><b aria-hidden="true"></b>ARATA MIO</a>
  <nav aria-label="メインメニュー"><ul><li><a href="#services">サービス</a></li>…</ul></nav>
  <button class="lang" aria-label="言語を切り替える（現在：日本語）"><span>日本語</span>JA</button>
</header>
```

```css
.lang { display: inline-flex; align-items: center; gap: var(--space-2); min-height: 44px; padding: 0 var(--space-4);
  background: var(--pink); border: var(--stroke-sm) solid var(--ink); border-radius: var(--radius-pill); box-shadow: var(--shadow-hard-sm);
  font: 700 var(--text-sm)/1 var(--font-jp); color: var(--ink); }
.lang::before { content: ""; width: 10px; height: 10px; border-radius: 50%; background: var(--red); border: var(--stroke-sm) solid var(--ink); }
```

## Carte de service

- **Anatomie** : fond `--card`, contour 2px, rayon 12px, ombre 5px, padding 24px ; tuile d'icône 56px colorée (contour 2px + ombre 3px) ; titre latin Archivo 900 20px capitales + sous-titre japonais 900 14px ; texte 14px `--muted` ; lien « 詳しく → » en bas.
- **États** : survol (monte de 4px, tourne de -1°, ombre 8px, ressort `--ease-spring`) ; focus (contour décalé) ; appui (comme le bouton).
- Faire varier la couleur de tuile d'une carte à l'autre (pervenche, jaune, sarcelle, rose).

```css
.card { display: flex; flex-direction: column; gap: var(--space-3); padding: var(--space-6); background: var(--card);
  border: var(--stroke-sm) solid var(--ink); border-radius: var(--radius-md); box-shadow: var(--shadow-hard);
  transition: translate var(--dur-base) var(--ease-spring), rotate var(--dur-base) var(--ease-spring), box-shadow var(--dur-base) var(--ease-spring); }
.card:hover { translate: -3px -4px; rotate: -1deg; box-shadow: var(--shadow-hard-lg); }
.card .ico { width: 56px; height: 56px; display: grid; place-items: center; border: var(--stroke-sm) solid var(--ink); border-radius: var(--radius-md); box-shadow: var(--shadow-hard-sm); }
```

## Puce (filtre / sujet)

Pilule blanche 44px de haut, contour 2px, Noto Sans JP 700 14px. Survol : ombre 3px. Sélectionnée (`aria-pressed="true"`) : fond `--ink`, texte `--paper`.

```css
.chip { min-height: 44px; padding: 0 var(--space-4); background: var(--card); border: var(--stroke-sm) solid var(--ink); border-radius: var(--radius-pill); font: 700 var(--text-sm)/1 var(--font-jp); color: var(--ink); }
.chip[aria-pressed="true"] { background: var(--ink); color: var(--paper); }
```

## Kicker (surtitre de section)

Petite pilule `--mint` à contour 2px, Archivo 900 12px capitales +0.04em (« SERVICES »), au-dessus d'un titre japonais 900.

## Champ de saisie

- Fond `--card`, contour 3px, rayon 8px, hauteur 52px, Noto Sans JP 500 16px ; libellé au-dessus en 700 12px.
- **Focus** : l'ombre dure 3px apparaît (pas de halo flou). **Erreur** : contour en pointillés + message sous le champ précédé de « ✕ » (pas uniquement de la couleur). **Désactivé** : fond `--paper`, contour pointillé.

```css
.input { min-height: 52px; padding: 0 var(--space-4); background: var(--card); border: var(--stroke) solid var(--ink); border-radius: var(--radius-sm); font: 500 var(--text-base) var(--font-jp); color: var(--ink); }
.input:focus { outline: none; box-shadow: var(--shadow-hard-sm); }
.input[aria-invalid="true"] { border-style: dashed; }
```

## Bulle et pastilles (autocollants de texte)

- **Bulle du prénom** : fond `--peri`, contour 3px, ombre 3px, coins 12px sauf bas-gauche à 0, petite queue triangulaire ; Noto Sans JP 900 ; inclinaison `--tilt`.
- **Pastille de statut** : pilule `--green`, icône ✓ épaisse + « 新規ご依頼 受付中 », inclinée +4°.
- **Tuiles d'icône flottantes** : carré arrondi `--teal` (graphique) et rond `--yellow` (œil), contour + ombre 3px, icône trait 2.6px en `--ink`.

## Portrait hexagonal (signature)

```html
<div class="hex-wrap"><div class="hex" data-slot="portrait"><img src="portrait-nb.jpg" alt="Portrait de la designer" width="1000" height="1000" fetchpriority="high"></div></div>
```

```css
/* Le contour suit l'hexagone : 4 drop-shadow de 3px + l'ombre dure (clip-path coupe border et box-shadow) */
.hex-wrap { filter: drop-shadow(var(--stroke) 0 0 var(--ink)) drop-shadow(calc(-1 * var(--stroke)) 0 0 var(--ink))
  drop-shadow(0 var(--stroke) 0 var(--ink)) drop-shadow(0 calc(-1 * var(--stroke)) 0 var(--ink)) drop-shadow(6px 6px 0 var(--ink)); }
.hex { clip-path: polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0 50%);
  background: radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--paper) 35%, transparent) 0 1.5px, transparent 2px) 0 0 / 14px 14px, var(--pink); }
.hex img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 18%; filter: grayscale(1) contrast(1.2) brightness(1.08); mix-blend-mode: multiply; }
```

Photo réelle (voir `assets.md`) : personne en niveaux de gris sur fond blanc, cadrée buste ; le `multiply` donne au fond la couleur rose de l'hexagone. Avec un détourage PNG, la personne peut dépasser légèrement le bas.

## Katakana vertical (signature)

```css
.kana { writing-mode: vertical-rl; font: 400 clamp(3rem, 6.4vw, 5.6rem)/1 var(--font-sticker); color: var(--yellow);
  -webkit-text-stroke: var(--stroke) var(--ink); paint-order: stroke fill; text-shadow: 5px 5px 0 var(--ink); }
```

Un mot de 3–5 katakana (ブランド, デザイン…), décoratif : `aria-hidden="true"` si le sens est déjà dans le titre. Attention à la spécificité : une règle `.hero p` peut écraser sa couleur.

## Bande défilante

Bandeau `--yellow` à contours haut et bas, incliné de -1.2°, mots en Archivo 900 capitales séparés par « ✦ », mélange latin / japonais. Décoratif (`aria-hidden`), contenu dupliqué pour une boucle sans saut.

## Bloc contact

Grand panneau `--yellow`, contour 3px, rayon 24px, ombre 8px, un rond `--pink` contouré qui sort du coin ; titre japonais 900, champ e-mail + bouton blanc.

## États vide, chargement, erreur

- **Vide** : autocollant gris-papier (`--paper`) à contour pointillé + phrase japonaise courte (« まだ何もありません »).
- **Chargement** : squelettes `--paper` à contour 2px plein, sans dégradé animé ; un autocollant étoile qui tourne lentement.
- **Erreur** : bulle `--pink` contourée « ✕ うまく送信できませんでした » + bouton « もう一度 ».
