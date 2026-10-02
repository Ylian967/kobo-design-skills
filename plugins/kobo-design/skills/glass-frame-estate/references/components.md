# Glass Frame Estate — composants

Tous les exemples supposent le `:root` de `tokens.css`.

## Cadre photo (signature)

```html
<header class="hero">
  <div class="hero-bg" aria-hidden="true"><img src="maison.jpg" alt=""></div>   <!-- même photo, floutée -->
  <div class="frame">
    <div class="photo" role="img" aria-label="…">
      <img class="sky" …>  <p class="wordmark" aria-hidden="true">Marque</p>  <img class="subject" …> <!-- PNG détouré -->
      <div class="veil"></div>
    </div>
    …barre du haut, titre, carte verre…
  </div>
</header>
```
```css
.hero { height: 100svh; min-height: 640px; max-height: 960px; padding: var(--frame-inset); overflow: hidden; background: var(--shade); }
.hero-bg { position: absolute; inset: calc(-2 * var(--blur-bg)); filter: blur(var(--blur-bg)) saturate(1.1); }
.frame { position: relative; height: 100%; border: 1px solid var(--frame-line); border-radius: var(--radius-frame); overflow: hidden; isolation: isolate; }
.veil { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 50%, color-mix(in srgb, var(--shade) 80%, transparent) 88%, var(--shade)); }
```
Sans photo détourée, le mot-marque passe simplement derrière une colline/le toit dessinés, ou au-dessus du sujet sans le toucher.

## Mot-marque géant

```css
.wordmark { position: absolute; inset: 12% 0 auto; margin: 0; text-align: center;
  font: 700 var(--text-wordmark)/0.8 var(--font-display); letter-spacing: var(--tracking-wordmark); text-transform: uppercase;
  background: linear-gradient(180deg, var(--wordmark-from) 10%, var(--wordmark-to) 92%); -webkit-background-clip: text; background-clip: text; color: transparent; }
```
Toujours `aria-hidden="true"` (le nom est déjà dans le logo). 5 à 8 lettres maximum.

## Barre du haut

Grille 3 colonnes (`1fr auto 1fr`) : logo (X fin + nom espacé +0.18em) / heure locale en `<time>` / ville + « MENU » + rond blanc 36px à 4 points noirs. Au survol, les points tournent de 45°. Mobile : heure et ville masquées.

## Boutons

```css
.btn { display: inline-flex; align-items: center; gap: var(--space-3); min-height: 44px; padding: 0 var(--space-4); border-radius: var(--radius-btn); border: 1px solid transparent;
  font: 500 var(--text-xs)/1 var(--font-body); letter-spacing: var(--tracking-caps); text-transform: uppercase; }
.btn .arr { transition: transform var(--dur) var(--ease); }
.btn:hover .arr { transform: translateX(4px); }          /* la flèche avance */
.btn--white { background: var(--white); color: var(--ink); }   .btn--white:hover { background: var(--surface); }
.btn--ink   { background: var(--ink);   color: var(--white); } .btn--ink:hover   { background: var(--shade); }
.btn--ghost { border-color: var(--ink); color: var(--ink); }   .btn--ghost:hover { background: var(--ink); color: var(--white); }
.btn:active { transform: translateY(1px); }
.btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }   /* blanc sur photo et sur noir */
.btn[disabled] { background: var(--line); color: var(--muted); cursor: not-allowed; }
```
Libellé court + « → ». Bouton blanc sur photo, noir ou contour sur fond clair.

## Carte conseiller en verre

```css
.agent { width: 300px; padding: var(--space-3); border-radius: var(--radius-frame); border: 1px solid var(--glass-line);
  background: var(--glass); backdrop-filter: blur(var(--blur-glass)) saturate(1.2); box-shadow: var(--shadow-glass); }
@supports not (backdrop-filter: blur(1px)) { .agent { background: var(--glass-solid); color: var(--ink); } }
```
Contenu : portrait carré 84px (rayon 2px) + surtitre « Votre conseillère » 11px capitales, nom Inter 500 16px, téléphone en lien `tel:` ; dessous, bouton blanc pleine largeur « Appeler → » (flèche à droite, `justify-content: space-between`).

## Puces de filtre

Pilule 44px, contour `--line`, Inter 500 12px capitales. Survol : contour `--ink`. Active (`aria-pressed="true"`) : fond `--ink`, texte blanc. Groupe en `role="group"` avec `aria-label`.

## Carte d'annonce

```html
<li class="listing"><a href="…">
  <div class="pic"><img …><span class="badge caps">Nouveau</span></div>
  <div class="row"><h3>Nom du bien</h3><span class="price">1 240 000 €</span></div>
  <div class="specs"><span>Lieu</span><span>4 ch.</span><span>3 sdb</span><span>210 m²</span></div>
</a></li>
```
Photo 16:10, rayon 4px, zoom 1.04 au survol (900ms). Étiquette blanche rectangulaire en haut à gauche ; bouton favori rond en verre 44px en haut à droite (option). Ligne titre / prix séparée des caractéristiques par un filet `--line`. Pas d'ombre, pas de fond de carte.

## Bande de chiffres

Fond `--ink`. 4 chiffres Inter Tight 400 40–64px avec légende `--on-dark-muted` 14px, filet `--line-dark`, puis rangée de logos de presse en `--line-dark` (grands, ≥ 18px), répartis en `space-between`.

## Portrait d'équipe

Rapport 4:5, rayon 4px, `filter: grayscale(.35)` qui disparaît au survol. Nom Inter 500, rôle `--muted` 14px.

## Carte d'article

Photo 4:3, méta « Catégorie · 6 min » en 11px capitales, titre Inter 500 20px, lien « Lire → » en `--accent-2` ; titre souligné finement au survol.

## Champ de lettre d'info

Ligne seule : `border-bottom: 1px solid var(--ink)` (2px au focus), champ sans bordure, bouton noir collé à droite. Message d'aide `--muted` 12px. Erreur : filet et message en `--accent`.

## Pied de page

Fond `--ink`, 4 colonnes (marque + 3 listes), titres de colonne 11px capitales `--on-dark-muted`, liens blancs 14px, puis mot-marque géant en dégradé blanc 30 % → transparent, coupé par le bas.

## États

- **Photo en chargement** : fond `--shade` avec dégradé ciel ; la photo apparaît par mise au point (voir motion).
- **Aucun résultat** : texte Inter 300 28px centré + bouton contour « Réinitialiser les filtres ».
