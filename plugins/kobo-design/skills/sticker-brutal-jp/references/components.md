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

## Champ de saisie (formulaire néo-brutal)

Utilisé par `examples/contact.html` (proposé, voir `source.md`).

- **Repos** : fond `--card`, contour 3px `--ink`, rayon `--radius-sm`, hauteur `--field-h` (52px), Noto Sans JP 500 16px. Libellé **au-dessus** en 900 14px, suivi d'une pastille « 必須 » (`--pink`) ou « 任意 » (`--paper`), contour 2px.
- **Survol** : ombre `--shadow-hard-sm`.
- **Focus** : fond `--yellow-soft`, ombre `--shadow-hard`, le champ monte de 2px (pas de halo flou, pas d'`outline` bleu).
- **Erreur** : contour **en pointillés** + fond `--pink-soft` + bulle « ✕ message » sous le champ (`aria-invalid="true"` + `aria-describedby`) ; la couleur n'est jamais le seul signal.
- **Désactivé** : fond `--paper`, contour pointillé, pas d'ombre.
- `textarea` : 160px min, interlignage `--leading-jp`, compteur « 18 / 800 » en Archivo à droite. `select` : `appearance: none` + chevron dessiné par deux dégradés `--ink`.

```css
.input { width: 100%; min-height: var(--field-h); padding: 0 var(--space-4); background: var(--card); border: var(--stroke) solid var(--ink);
  border-radius: var(--radius-sm); font: 500 var(--text-base)/1.5 var(--font-jp); color: var(--ink);
  transition: box-shadow var(--dur-fast) var(--ease-out), translate var(--dur-fast) var(--ease-out), background var(--dur-fast); }
.input::placeholder { color: var(--muted); opacity: 1; }
.input:hover { box-shadow: var(--shadow-hard-sm); }
.input:focus-visible, .input:focus { outline: none; background: var(--yellow-soft); box-shadow: var(--shadow-hard); translate: -2px -2px; }
.input[aria-invalid="true"] { border-style: dashed; background: var(--pink-soft); }
.input:disabled { background: var(--paper); border-style: dashed; box-shadow: none; }
.err { display: none; padding: 2px var(--space-3); background: var(--pink-soft); border: var(--stroke-sm) solid var(--ink);
  border-radius: var(--radius-sm) var(--radius-sm) var(--radius-sm) 0; font: 700 var(--text-xs)/1.6 var(--font-jp); rotate: -1deg; }
.field.is-invalid .err { display: inline-flex; animation: pop var(--dur-base) var(--ease-spring) both; }
```

### Pilules à choix (budget, sujets)

Un `<fieldset>` + `<legend>` ; chaque option est un **vrai** `input` radio (budget, choix unique) ou case (sujets, choix multiple) posé en `opacity: 0` sur la pilule qui le dessine. Cochée : fond `--ink`, texte `--paper`, « ✓ » ajouté (pas que la couleur). Focus clavier : contour 3px décalé de 3px sur la pilule.

```css
.pill { position: relative; }
.pill input { position: absolute; inset: 0; opacity: 0; margin: 0; cursor: pointer; }
.pill span { display: inline-flex; align-items: center; gap: var(--space-2); min-height: 44px; padding: 0 var(--space-4); background: var(--card);
  border: var(--stroke-sm) solid var(--ink); border-radius: var(--radius-pill); font: 700 var(--text-sm)/1 var(--font-jp); pointer-events: none; }
.pill input:checked + span { background: var(--ink); color: var(--paper); box-shadow: var(--shadow-hard-sm); }
.pill input:checked + span::before { content: "✓"; font-weight: 900; }
.pill input:focus-visible + span { outline: var(--stroke) solid var(--ink); outline-offset: 3px; }
```

### Case d'accord

Carré 28px, contour 3px, ombre 3px ; cochée : fond `--yellow` + coche dessinée par deux bordures `--ink`. Erreur : pointillés + `--pink-soft`.

### Récapitulatif d'erreurs et succès

- **Récapitulatif** : panneau `--pink-soft` contour 3px en tête du formulaire, `role="alert"`, liste de liens vers chaque champ fautif ; reçoit le focus après un envoi raté (`tabindex="-1"`). Après une première erreur, chaque champ se re-valide dès qu'on le corrige.
- **Envoi** : le bouton jaune passe en `aria-busy="true"`, libellé masqué et remplacé par « • • • » qui se révèle (`clip-path`, keyframes `dots`), clics bloqués.
- **Succès** : le formulaire est remplacé par un panneau `--green-soft` : badge rond `--green` incliné -8° avec ✓ (pop), titre japonais 900 « 送信しました！ » qui reçoit le focus, phrase, boutons « 実績を見る » / « もう一度送る ».

## Bulle et pastilles (autocollants de texte)

- **Bulle du prénom** : fond `--peri`, contour 3px, ombre 3px, coins 12px sauf bas-gauche à 0, petite queue triangulaire ; Noto Sans JP 900 ; inclinaison `--tilt`.
- **Pastille de statut** : pilule `--green`, icône ✓ épaisse + « 新規ご依頼 受付中 », inclinée +4°.
- **Tuiles d'icône flottantes** : carré arrondi `--teal` (graphique) et rond `--yellow` (œil), contour + ombre 3px, icône trait 2.6px en `--ink`.

## Portrait hexagonal (signature)

```html
<div class="hex-wrap"><div class="hex">
  <div class="hex__photo" data-slot="portrait">
    <img src="portrait-nb.jpg" alt="Portrait de la designer" width="1000" height="1000" fetchpriority="high">
  </div>
</div></div>
```

```css
/* Le contour suit l'hexagone : 4 drop-shadow de 3px + l'ombre dure (clip-path coupe border et box-shadow) */
.hex-wrap { filter: drop-shadow(var(--stroke) 0 0 var(--ink)) drop-shadow(calc(-1 * var(--stroke)) 0 0 var(--ink))
  drop-shadow(0 var(--stroke) 0 var(--ink)) drop-shadow(0 calc(-1 * var(--stroke)) 0 var(--ink)) drop-shadow(6px 6px 0 var(--ink)); }
/* Hexagone rose tramé = cadre/fond */
.hex { position: relative; overflow: hidden; clip-path: polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0 50%);
  background: radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--paper) 35%, transparent) 0 1.5px, transparent 2px) 0 0 / 14px 14px, var(--pink); }
/* Hexagone intérieur : filet noir (fond --ink) + photo N&B en rendu NORMAL */
.hex__photo { position: absolute; inset: 9% 9% 7%; clip-path: polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0 50%); background: var(--ink); }
.hex__photo img { position: absolute; inset: var(--stroke); width: calc(100% - 2 * var(--stroke)); height: calc(100% - 2 * var(--stroke));
  clip-path: polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0 50%); object-fit: cover; object-position: 50% 22%;
  color: transparent; background: var(--paper); filter: grayscale(1) contrast(1.12); }
```

Photo réelle (voir `assets.md`) : personne cadrée buste, en N&B **sans `mix-blend-mode`** ; le rose tramé reste visible tout autour comme un cadre épais (~9 % de chaque côté). Pourquoi ne plus utiliser `multiply` : voir `assets.md` § « Pourquoi pas multiply ». Avec un détourage PNG, la personne peut dépasser légèrement le bas.

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

## En-tête de page intérieure (Projets, Contact)

Proposé (le shot n'a qu'une page). Kicker `--mint` + titre latin Archivo 900 `clamp(3rem, 7vw, 6rem)` dont **un mot** est surligné par un autocollant incliné (`--pink` pour WORKS, `--green` pour HELLO, via `--hl`), sous-titre japonais 900, phrase `--muted`, et à droite un **katakana vertical** plus petit (ワークス, ハロー) incliné +4°. Un seul katakana par page.

```css
.phead h1 .hl { position: relative; display: inline-block; padding: 0 0.08em; z-index: 0; }
.phead h1 .hl::before { content: ""; position: absolute; inset: 0.14em -0.02em 0.06em; z-index: -1; border: var(--stroke) solid var(--ink);
  border-radius: var(--radius-sm); rotate: -1.5deg; background: var(--hl, var(--peri)); }
```

## Filtres en pilules (page Projets)

Rangée de `.chip` (`<button aria-pressed>`), **un seul actif** ; chaque pilule porte un compteur rond `--yellow` en Archivo 900. Un filtre à 0 reste visible (et mène à l'état vide). À droite, un compteur « **9** 件の作品 » dans une région `aria-live="polite"`. Le filtre peut être lu depuis l'ancre (`projets.html#web`).

```css
.chip .n { display: inline-grid; place-items: center; min-width: 24px; height: 24px; padding: 0 6px; border-radius: var(--radius-pill);
  background: var(--yellow); color: var(--ink); border: var(--stroke-sm) solid var(--ink); font: 900 var(--text-xs)/1 var(--font-display); }
.chip[aria-pressed="true"] { background: var(--ink); color: var(--paper); box-shadow: var(--shadow-hard-sm); }
```

## Carte projet (carte-autocollant)

Un `<button class="work" aria-haspopup="dialog">` dans un `<li>` : carte `--card`, contour 2px, rayon 12px, ombre 5px, padding 12px.

- **Vignette** 4:3 contourée 2px, rayon 8px ; fond = aplat tramé de la couleur de catégorie (`--tag`) qui sert aussi de repli si la photo ne charge pas.
- **Étiquette de catégorie** : pilule `--tag` à contour 2px + ombre 3px, **à cheval sur le bord haut** (`top: -12px`), inclinée -5° (cartes impaires, à gauche) ou +4° (paires, à droite).
- **Texte** : nom latin Archivo 900 capitales 20px, ligne japonaise 900 14px, méta « 2025 ・ Web » en `--muted` 12px + flèche.
- **Survol** : la carte monte (-3px, -4px), penche (-1.5° ou +1.2°), ombre 8px, la photo zoome à 1.04, et un **coin décollé** (`::after`, triangle `--yellow-soft` / filet `--ink` / `--paper`, taille `--peel`) se déplie en bas à droite. **Appui** : écrasée sur son ombre.
- Couleurs de catégorie : branding `--yellow`/`--mint`/`--peri`, web `--pink`/`--teal`, SNS `--green`/`--pink` — deux cartes voisines jamais de la même couleur.

```css
.work { position: relative; display: flex; flex-direction: column; padding: var(--space-3); text-align: left; background: var(--card);
  border: var(--stroke-sm) solid var(--ink); border-radius: var(--radius-md); box-shadow: var(--shadow-hard);
  transition: translate var(--dur-base) var(--ease-spring), rotate var(--dur-base) var(--ease-spring), box-shadow var(--dur-base) var(--ease-spring); }
.work::after { content: ""; position: absolute; right: -2px; bottom: -2px; width: var(--peel); height: var(--peel); border-radius: 0 0 var(--radius-md) 0;
  background: linear-gradient(135deg, var(--yellow-soft) 0 46%, var(--ink) 46% 54%, var(--paper) 54%); scale: 0; transform-origin: 100% 100%;
  transition: scale var(--dur-base) var(--ease-spring); }
.work:hover { translate: -3px -4px; rotate: -1.5deg; box-shadow: var(--shadow-hard-lg); }
.work:hover::after { scale: 1; }
.work:active { translate: 4px 4px; rotate: 0deg; box-shadow: 0 0 0 0 var(--ink); }
```

## Fiche projet (modale)

`<dialog>` natif (`showModal()` : piège du focus, Échap, retour du focus sur la carte) : papier `--paper`, contour 3px, rayon 24px, ombre 8px, voile `--backdrop`. Deux colonnes `minmax(0, 1.1fr) minmax(0, 0.9fr)` — **`minmax(0, …)` obligatoire**, sinon la largeur intrinsèque de l'image (`width="1200"`) fait exploser la colonne. Gauche : aplat `--tag` avec la photo contourée inclinée -1.5°. Droite : kicker de catégorie, nom latin 900, ligne japonaise, description `--muted`, méta en pilules (`<dl>` client / année / rôle), deux chiffres en tuiles inclinées (`--peri`, `--mint`), boutons « 前へ / 次へ ». Bouton fermer : carré `--pink` 44px incliné 6° en haut à droite (le kicker garde une marge droite pour ne pas passer dessous). Sous 900px : une colonne, la modale défile dans sa hauteur (`max-height: calc(100dvh - 32px)`).

```css
.modal { width: min(920px, calc(100% - 2 * var(--space-4))); max-height: calc(100dvh - 2 * var(--space-4)); padding: 0; overflow: auto;
  background: var(--paper); border: var(--stroke) solid var(--ink); border-radius: var(--radius-lg); box-shadow: var(--shadow-hard-lg); }
.modal::backdrop { background: var(--backdrop); }
.modal__inner { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); }
body:has(.modal[open]) { overflow: hidden; }
```

## Bandeau d'appel (bas de page Projets)

Panneau `--yellow` contour 3px, rayon 24px, ombre 8px : question japonaise 900 à gauche (« 次の作品、一緒につくりませんか？ »), bouton blanc à droite vers `contact.html`. C'est la zone jaune dominante de la page.

## Colonne d'infos (page Contact)

- **Carte profil** `--peri` inclinée +1° : portrait rond N&B 96px (contour + ombre 3px, fond `--pink`), nom japonais 900, rôle, pastille verte « ✓ 11月から受付中 » qui déborde du coin bas-droit.
- **Lignes d'info** : cartes blanches à contour 2px avec tuile d'icône 44px colorée (mail, délai de réponse, langues).
- **Étapes** : cadre `--paper` à contour **pointillé** (élément informatif, pas un objet) ; numéros dans des carrés colorés inclinés (compteur CSS).

## FAQ en accordéon

`<details>`/`<summary>` natifs (clavier et lecteurs d'écran gratuits). Chaque question : carte blanche contour 2px, ombre 3px → 5px ouverte ; à gauche un carré « Q1 » coloré incliné -4° (`--q`), à droite un rond « + » qui tourne de 45° et passe au `--yellow` à l'ouverture. Réponse `--muted`, alignée sous le texte de la question, qui tombe de -8px (`drop`). Focus : contour 3px décalé sur le `summary`.

## États vide, chargement, erreur

- **Vide** : autocollant gris-papier (`--paper`) à contour pointillé + phrase japonaise courte (« まだ何もありません »).
- **Chargement** : squelettes `--paper` à contour 2px plein, sans dégradé animé ; un autocollant étoile qui tourne lentement.
- **Erreur** : bulle `--pink` contourée « ✕ うまく送信できませんでした » + bouton « もう一度 ».
