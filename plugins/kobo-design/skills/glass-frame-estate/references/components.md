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
Sans photo détourée, le mot-marque se place dans le ciel, au-dessus du sujet sans le toucher. Photo réelle et détourage : voir `assets.md`.

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
Contenu : portrait carré 84px (photo réelle, voir `assets.md`) (rayon 2px) + surtitre « Votre conseillère » 11px capitales, nom Inter 500 16px, téléphone en lien `tel:` ; dessous, bouton blanc pleine largeur « Appeler → » (flèche à droite, `justify-content: space-between`).

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
Photo ≈ 5:4 (mesuré 580×460 dans une colonne de 580), rayon `--radius-card` (10px mesuré), zoom 1.04 au survol (900ms). Deux étiquettes collées en haut à gauche (mesuré) : **lieu** blanche avec pictogramme épingle + **statut** noire « À vendre / À louer » (16px 500 capitales, padding 9×12, rayon 4px) ; bouton favori rond en verre 44px en haut à droite (option). Ligne titre (20px 500 capitales) / prix aligné à droite, puis **caractéristiques en petites cases à contour** (pictogramme + « 3 CH. », 16px 500, contour 1px `--line`, rayon 4px). Pas d'ombre, pas de fond de carte.

## Bande de chiffres

Fond `--ink`. 4 chiffres Inter Tight 400 40–64px avec légende `--on-dark-muted` 14px, filet `--line-dark`, puis rangée de logos de presse en `--line-dark` (grands, ≥ 18px), répartis en `space-between`.

## Portrait d'équipe

Photo réelle (voir `assets.md`), rapport 4:5, rayon `--radius-card`, `filter: grayscale(.35)` sur l'`img`, qui disparaît au survol. Nom Inter 500, rôle `--muted` 14px.

## Carte d'article

Photo 4:3, méta « Catégorie · 6 min » en 11px capitales, titre Inter 500 20px, lien « Lire → » en `--accent-2` ; titre souligné finement au survol.

## Champ de lettre d'info

Ligne seule : `border-bottom: 1px solid var(--ink)` (2px au focus), champ sans bordure, bouton noir collé à droite. Message d'aide `--muted` 12px. Erreur : filet et message en `--accent`.

## Pied de page

Fond `--ink`, 4 colonnes (marque + 3 listes), titres de colonne 11px capitales `--on-dark-muted`, liens blancs 14px, puis mot-marque géant en dégradé blanc 30 % → transparent, coupé par le bas.

## États

- **Photo en chargement** : fond `--shade` avec dégradé ciel en tokens (repli si l'image ne charge pas) ; la photo apparaît par mise au point (voir motion).
- **Aucun résultat** : texte Inter 500 28px centré + bouton contour « Réinitialiser les filtres ».

---

# Composants relevés sur le site en ligne (2026-10-03)

Le template existe en vrai site Framer (voir `source.md`) : les composants ci-dessous y ont été **mesurés** (styles calculés) ou **observés** (≈). Tous les titres sont en **Inter 500 capitales** (`--weight-title`), interligne 1.1, approche `--tracking-title` ; le texte courant est Inter 400 16px/1.6 `--muted`.

## Surtitre « // »

```html
<p class="eyebrow">// À propos</p>
```
```css
.eyebrow { font: 500 var(--text-base)/1 var(--font-body); text-transform: uppercase; color: var(--ink); margin: 0 0 var(--space-4); }
```
Mesuré : 16px/16px 500, noir, deux barres obliques avant le libellé. Remplace le surtitre numéroté sur toutes les sections. Centré quand le titre est centré.

## Bouton à flèche (mesuré)

Rectangle **plein** 50px de haut, rayon 4px, padding `13px 12px 13px 18px`, libellé 16px 500 capitales **à gauche**, flèche → **à droite** (`justify-content: space-between`, largeur 217–327px). Trois variantes mesurées : gris `--surface` texte noir (sur photo et sur fond clair), noir texte blanc (sur blanc), transparent texte noir (« Plus de quartiers », fond `--surface` au survol). Transition de couleur `--dur-color` `--ease-color`.

```css
.btn-arrow { display: inline-flex; align-items: center; justify-content: space-between; gap: var(--space-6);
  min-width: 220px; height: 50px; padding: 13px 12px 13px 18px; border-radius: var(--radius-btn);
  font: 500 var(--text-base)/1 var(--font-body); text-transform: uppercase;
  transition: background-color var(--dur-color) var(--ease-color), color var(--dur-color) var(--ease-color); }
.btn-arrow--grey { background: var(--surface); color: var(--ink); }
.btn-arrow--ink  { background: var(--ink); color: var(--white); }
```
Le petit bouton 11px du shot n'existe pas sur le site : préférer celui-ci, le petit reste possible dans une barre dense.

## Carte conseiller du héros (mesurée)

Pas une seule carte de verre mais **deux cellules côte à côte** dans un contour fin : à gauche le portrait carré (~140px, rayon 6px) ; à droite une cellule de 259×140 (fond noir 5 %, `backdrop-filter: blur(2px)`, rayon 10px, padding 20px) avec le téléphone en **24px 500 blanc** puis le bouton gris « Appeler → » pleine largeur. Le flou est **léger** : la photo reste lisible derrière.

## Compteurs « odomètre »

Chiffres 48px 500 (« 15+ », « 98 % », « 120+ ») dont chaque chiffre **défile verticalement** comme un compteur mécanique à l'entrée dans l'écran ; légende 16px 500 capitales `--muted` dessous. Sur la page À propos, les chiffres sont posés dans des **cartes grises** (`--surface`, rayon 10px) avec, en haut à gauche, un **indicateur de 4 petits carrés** dont 1, 2, 3 puis 4 sont noirs (progression 1/4 → 4/4 de carte en carte).

## Règle graduée (séparateur)

Fine règle de traits verticaux gris clair, sur toute la largeur du conteneur, un trait plus haut tous les 5 — comme un mètre d'architecte. Sert de séparateur entre deux sections blanches (sous « À propos », après les étapes, après le contact). `aria-hidden="true"`.

```css
.ruler { height: 18px; background:
  repeating-linear-gradient(90deg, var(--line) 0 1px, transparent 1px 10px) bottom / 100% 10px no-repeat,
  repeating-linear-gradient(90deg, var(--line) 0 1px, transparent 1px 50px) bottom / 100% 18px no-repeat; }
```

## Ligne de service (fond noir)

Section noire, liste de lignes séparées par un filet gris foncé : index « 01. » 16px à gauche, titre 32px 500 blanc sur 2 lignes, **trois vignettes photo** ~60×60 rayon 4px au centre, « VOIR LE DÉTAIL » 16px à droite. Au survol, le texte passe du gris au blanc (`--ease-color`). Sur la page Services, la même liste est sur **fond blanc**, 6 lignes de 1200px.

## Carte de quartier

Carte grise `--surface`, rayon 10px, padding `--pad-card` (10px) : photo carrée-ish (rayon 6px) **insérée** dans la carte, puis épingle + nom du quartier 16px 500 capitales. 4 colonnes de ~290px.

## Pile d'étapes collantes

Grand panneau **noir** 1200px, rayon 10px, padding 10px : colonne gauche = photo de l'étape (rayon 6px), colonne droite = « 01. » en haut, titre 32px blanc et texte en bas. Au défilement, les étapes s'**empilent** : chaque nouvelle photo glisse par-dessus la précédente dont il ne reste qu'une bande, les index « 01. 02. 03. » s'alignent en haut (section collante, ≈ observé).

## Mosaïque de témoignages

Grille 3 colonnes × 2 rangées, gap 10px, cartes 380×428 de deux natures alternées : **photo pleine** (citation 20px blanche capitales en bas, « — NOM · QUARTIER ») et **carte grise** `--surface` padding 30px (titre de citation 20px, texte 16px/1.6, avatar carré 48px + nom + rôle en bas).

## Carte d'agent

Portrait 4:5 plein cadre, rayon 10px, sur fond `--surface` de section ; nom 16px 500 capitales, rôle 16px 400, liens sociaux textuels « Fb / Be / X / Ln » séparés par des barres obliques (pas d'icônes).

## Formulaire en panneau gris

Panneau `--surface` 560px, rayon 10px, padding 30px ; libellés 16px 500 capitales avec « * » ; champs **blancs** sans bordure, rayon 4px, hauteur ~50px, deux par ligne (nom / e-mail) ; liste déroulante avec chevron ; zone de texte redimensionnable ; bouton noir pleine largeur « Envoyer le message → ». À gauche du panneau : titre 48px + coordonnées en paires « TÉLÉPHONE : » (500) / valeur (400 `--muted`).

## Carte d'article (mesurée)

Carte grise 520×460 rayon 10px padding 10px : photo insérée, puis catégorie 16px 500 capitales + date 16px 400 `--muted`, titre 24px 500 capitales. Première carte deux fois plus haute (mise en avant), les deux autres avec « VOIR LE DÉTAIL » (≈ observé sur l'accueil).

## FAQ

Colonne gauche : titre 48px + carte agent blanche (portrait 100px, « Agent », nom, téléphone ; rayon 10px, padding 10px). Colonne droite 580px : questions en **cartes blanches** rayon 4px padding 22×20, question 16px 500 capitales + « + » ; la question ouverte montre la réponse 16px/1.6 `--muted`.

## Encarts latéraux d'une fiche de bien

Colonne droite 460px : **encart prix noir** (rayon 10px, padding 30px, « PRIX » 24px + montant 32px blancs), **encart « Planifier une visite »** gris avec agent + bouton, puis **formulaire gris** « Une question sur ce bien ? ». À gauche (650px) : description, liste de caractéristiques en paires « TYPE : » / valeur, équipements en liste à puces 3 colonnes, galerie 2×2 (rayon 10px), carte de localisation.

## Menu plein écran (mesuré)

Clic sur « MENU ⠿ » : voile plein écran sur la page assombrie, `backdrop-filter: blur(5px)` (`--blur-menu`), liens **centrés** empilés en 32px 500 capitales blancs (Accueil, À propos, Services, Biens, Quartiers, Journal, Contact) ; la barre reste visible et « MENU » devient « FERMER ». Padding mesuré du panneau : 120px 30px 80px.

## Héros de page interne (mesuré)

700px de haut, photo pleine largeur assombrie (voile noir ~40 %), titre unique **100px 600 capitales blanc** (`--text-page`, −2px) : aligné en bas à gauche sur les fiches (« Détails du bien »), centré sur À propos, Contact et 404 (« 404 » à 340px, blanc translucide, message 16px dessous).
