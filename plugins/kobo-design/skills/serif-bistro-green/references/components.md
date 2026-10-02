# Serif Bistro Green — composants

Chaque composant : rôle, anatomie, valeurs (en tokens), états, code de référence. Valeurs estimées sur les captures (voir `source.md`). Tous les extraits n'utilisent que des `var(--…)`.

## Bouton principal

- **Rôle** : réserver (« Réserver une table »). Un par écran, plus un dans la navigation.
- **Anatomie** : rectangle rayon 4px, 44px de haut, padding 0 16px, DM Sans 500 14px, flèche fine 16px à droite.
- **États** : repos (`--orange-strong`, texte blanc) ; survol (`--orange`, texte `--ink`, flèche glisse de 3px) ; appui (`translate: 0 1px`) ; focus (contour `--orange` 2px décalé de 3px) ; désactivé (fond `--line`, texte `--muted`) ; chargement (flèche remplacée par un petit cercle qui tourne, texte « Un instant… »).

```html
<a class="btn btn--primary" href="#reserver">Réserver une table<svg aria-hidden="true"><use href="#i-arrow"/></svg></a>
```

```css
.btn { display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); min-height: 44px; padding: 0 var(--space-4);
  border-radius: var(--radius-btn); border: 1px solid transparent; font: 500 var(--text-sm)/1 var(--font-body); text-decoration: none; cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out); }
.btn svg { width: 16px; height: 16px; transition: translate var(--dur-fast) var(--ease-out); }
.btn:hover svg { translate: 3px 0; }
.btn:active { translate: 0 1px; }
.btn--primary { background: var(--orange-strong); color: var(--white); }
.btn--primary:hover { background: var(--orange); color: var(--ink); }
.btn:disabled { background: var(--line); color: var(--muted); cursor: not-allowed; }
```

## Bouton secondaire

Contour 1px `--cream`, texte crème, fond transparent (« Notre histoire → ») ; survol : fond crème, texte `--green`. Sur crème : contour et texte `--green`, survol fond vert.

```css
.btn--outline { border-color: var(--cream); color: var(--cream); background: transparent; }
.btn--outline:hover { background: var(--cream); color: var(--green); }
```

## Bouton rond

44px, cercle. Variantes : recherche (fond crème à 12 % sur vert), flèche de carte (fond `--white`, flèche ↗ `--orange-strong`, tourne de -45° au survol), contrôle de carrousel (contour `--green`, survol plein).

## Navigation flottante

- **Anatomie** : barre collante à 16px du haut, largeur du conteneur, fond `--green-deep` à 82 % + flou 10px, filet crème à 14 %, rayon 8px. Logo (rond orange 30px avec icône crème + nom en serif 28px) ; groupe de liens en pilules centré dans une gélule crème à 8 % ; recherche ronde ; bouton principal.
- **Lien actif** : pilule `--cream`, texte `--green` (`aria-current="page"`). Autres : `--cream-muted`, survol `--cream`.
- **Mobile (< 1024px)** : liens remplacés par un bouton menu rond ; sous 720px le bouton « Réserver » ne garde que la flèche (avec `aria-label`) et la recherche passe dans le menu.

```css
.nav { position: sticky; top: var(--space-4); display: flex; align-items: center; gap: var(--space-4); padding: var(--space-2) var(--space-2) var(--space-2) var(--space-4);
  background: color-mix(in srgb, var(--green-deep) 82%, transparent); backdrop-filter: blur(10px);
  border: 1px solid color-mix(in srgb, var(--cream) 14%, transparent); border-radius: var(--radius-sm); color: var(--cream); }
.nav ul a[aria-current] { background: var(--cream); color: var(--green); }
```

## Carte de plat (avec reliure)

- **Anatomie** : fond `--orange` (une carte sur deux en `--orange-strong`), rayon 12px, padding 24px, ombre `--shadow-card` ; assiette ronde blanche vue de dessus (78 % de la largeur, liseré `--line`, ombre portée) ; en bas : nom en serif 28px blanc, description 14px (`--ink` sur orange vif, blanc sur orange foncé), prix dans une petite étiquette crème ; bouton rond blanc ↗.
- **Reliure** : encoches crème de 12px sur les bords gauche et droit (pas de 26px), et une colonne d'anneaux verts dans la gouttière entre deux cartes.
- **États** : survol (l'assiette tourne de 25°, 800ms) ; focus du bouton rond ; carte entière non cliquable (seul le bouton l'est, pour éviter les liens imbriqués).

```css
.dish { position: relative; display: flex; flex-direction: column; padding: var(--space-6); border-radius: var(--radius-md); color: var(--white); box-shadow: var(--shadow-card);
  background: radial-gradient(circle at 0 50%, var(--cream) 0 6px, transparent 6.5px) left 0 top 40px / 12px 26px repeat-y,
              radial-gradient(circle at 100% 50%, var(--cream) 0 6px, transparent 6.5px) right 0 top 40px / 12px 26px repeat-y,
              var(--orange); }
.dish:not(:last-child)::after { content: ""; position: absolute; top: 40px; bottom: 40px; right: calc(var(--bind) * -1 - 6px); width: calc(var(--bind) + 12px);
  background: radial-gradient(ellipse 50% 7px at 50% 50%, transparent 0 calc(100% - 3px), var(--green) calc(100% - 3px) 100%, transparent 100%) 0 0 / 100% 26px repeat-y; }
.dish:hover .plate { rotate: 25deg; }
```

## Carrousel

Piste en `grid-auto-flow: column`, 4 cartes visibles (2,2 sous 1024px, 1,3 sous 720px), `scroll-snap-type: x mandatory`, barre de défilement masquée, piste focusable (`tabindex="0"`, `aria-label`). Sous la piste : flèche précédente, points (8px, l'actif s'allonge en pilule verte de 22px, zone cliquable 24×44px), flèche suivante.

## Titre échelonné avec vignettes

Titre `h2` en serif `--text-3xl` vert, découpé en 3 lignes : 1re à gauche, 2e décalée de 12 %, 3e à droite ; un mot en italique `--orange-strong` ; 3 vignettes **dans** les lignes (carré 1.25em ou 4:3 1.6em), bord `--card` 8px, rayon 4px, ombre `--shadow-photo`, rotations -4°, +5°, -2°. Vignettes décoratives (`aria-hidden`), le texte reste lisible seul.

```html
<h2 class="stagger"><span>Des moments <i class="ph ph--a" data-slot="photo-salle" aria-hidden="true"></i> à part,</span>…</h2>
```

## Bloc « expérience »

Grille de 3 colonnes sous un filet `--line` : numéro « 01 » en serif orange foncé, titre serif 20px vert, texte 14px `--muted`, lien souligné avec flèche (44px de haut).

## Newsletter

- Bandeau `--orange` (feuille arrondie), dessins au trait crème (fourchette, feuille, verre, poisson, cloche) en SVG `stroke-width: 2`, opacité 55 %, décoratifs.
- Titre serif crème `--text-3xl` (grand texte → 3,2:1 accepté), texte `--ink`.
- Champ en gélule `--card` avec ombre ; bouton en pilule `--green` / texte crème à l'intérieur.
- **États** : focus du champ (contour vert 2px) ; erreur (message `--ink` sous la gélule précédé de « ! », `aria-invalid`) ; succès (le bouton affiche « Merci ! »).

```css
.subscribe { display: flex; gap: var(--space-2); padding: var(--space-2); background: var(--card); border-radius: var(--radius-pill); box-shadow: var(--shadow-card); }
.subscribe label { flex: 1; display: flex; min-width: 0; }
.subscribe input { flex: 1; min-width: 0; min-height: 44px; border: 0; background: transparent; font: 400 var(--text-base) var(--font-body); color: var(--ink); }
.btn--pill { border-radius: var(--radius-pill); background: var(--green); color: var(--cream); padding: 0 var(--space-6); }
```

## Champ de saisie (formulaire de réservation)

Fond `--card`, filet 1px `--line`, rayon 4px, 48px de haut, libellé 12px capitales au-dessus. Focus : filet `--green` 2px. Erreur : filet `--orange-strong` + message texte. Désactivé : fond `--cream`, texte `--muted`.

## Puce (filtres de la carte)

Pilule 36px (zone 44px) en DM Sans 500 14px : contour `--line`, texte `--green` ; sélectionnée : fond `--green`, texte `--cream` (`aria-pressed`). Exemples : « Entrées », « Plats », « Desserts », « Végétarien ».

## Pied de page

Feuille verte : phrase d'accroche en serif 28px, colonnes Adresse / Horaires / Suivre (surtitres 12px capitales `--cream-muted`, texte 14px crème), filet crème à 20 %, mentions, puis **nom géant** en serif crème `--text-wordmark`, interligne 0.72, coupé en bas par le bord de la page.

## États vide, chargement, erreur

- **Vide** (aucun créneau) : assiette vide dessinée + « Complet ce soir — essayez demain midi ? » + bouton secondaire.
- **Chargement** : cartes squelettes `--line` sur crème, assiette en cercle qui pulse doucement (opacité 0.6 → 1).
- **Erreur** : bandeau crème à filet `--orange-strong`, texte `--ink`, bouton « Réessayer ».
