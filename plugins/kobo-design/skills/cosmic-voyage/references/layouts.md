# Cosmic Voyage — mises en page

## Principes

- Barre de navigation fixe 58px en haut, contenu en dessous.
- Fond fixe : nuit étoilée réelle — scène Three.js (étoiles, nébuleuse en particules, planète) au-dessus d'une photo de nébuleuse en repli, voir `assets.md`. Jamais d'étoiles ou de planète dessinées en CSS.
- Points de rupture mesurés : 1024px (desktop), 1024–1365px (petit desktop), ≤ 1023px (mobile/tablette).
- Échelle d'espacement 4 → 80px (mesurée), rayons 6 → 48px.

## Accueil (une seule hauteur d'écran)

La page d'accueil **ne défile pas** : c'est une scène pleine hauteur (100vh − nav).
1. Illustration plein écran du projet (`data-slot="key-art"`) ou, sans illustration, la scène 3D de l'espace (planète annelée à droite, voir `assets.md`) avec un voile sombre à gauche pour le logo.
2. Logo en haut à gauche (emplacement).
3. Bloc de téléchargement en bas au centre-gauche (QR + 6 boutons) et bouton lecture vidéo.
4. Rail social à droite, « Scroll Down » vertical à gauche.

## Page personnages

Grille sur 3 zones à 1440px : frise d'emblèmes (≈ 120px) à gauche, panneau de verre (≈ 900px) au centre, l'illustration qui déborde. En-tête de section « Personnages » au-dessus du panneau.

## Page actualités

Colonne centrée ≈ 880px : en-tête de section, onglets, puis liste de cartes à un coin espacées de 16px. Pagination simple en bas (numéros 14px, actif en or).

## Mondes — carte stellaire (exemple : `examples/mondes.html`)

```
nav (lien « Mondes » actif, trait bleu)
┌───────────────────────────────────────────────────────┐
│ [Mondes]                                    ✦ étoiles   │
│        ╭────────── orbite pleine ─────────────╮          │
│   ◉ Station   ╭──── orbite pointillée ────╮     ◉ Bulle   │
│            ◉ Planète                     ◉ …             │
└───────────────────────────────────────────────────────┘
(aperçu du monde choisi : fiche, voir ci-dessous)
```
- Une hauteur d'écran, **pas de défilement** sur la carte elle-même.
- Orbites : 3–4 ellipses concentriques dont le centre est **hors écran en bas à droite** (observé : les anneaux traversent l'écran) ; 1 sur 2 en pointillés.
- 5–8 mondes répartis sur les orbites, jamais alignés ; libellé à droite de l'icône (à gauche si l'icône est près du bord droit).
- Fond : scène Three.js (champ d'étoiles) au-dessus d'une photo de nébuleuse en repli ; anneaux en SVG par-dessus.

## Fiche d'un monde

```
[‹ Retour]                                  ◉ Nom du monde
                 TITRE DU MONDE (léger, centré)
         paragraphe centré 12px, 3–4 lignes, ≈ 640px
 ▒▒▒▒▒ ┌──────────── lieu 16:9 net ────────────┐ ▒▒▒▒▒
 ▒voisin‹                                       › voisin▒
 ▒▒▒▒▒ └────────────────────────────────────────┘ ▒▒▒▒▒
                  Légende du lieu · 2 / 5
```
- Fond : illustration du monde floutée + voile `--veil-world`.
- Grille du carrousel : `1fr min(820px, 76vw) 1fr`, les colonnes latérales sont coupées par le bord (`overflow: hidden` sur la section).

## Mobile

### Observé (accueil, 375px, navigateur intégré)
- **Barre** noire : pilule blanche « Télécharger maintenant » sur 2 lignes à gauche, **hamburger** 3 traits à droite. Pas de liens visibles.
- **Héros** : visuel clé plein écran en **portrait**, logo en haut à gauche ; **bouton lecture** rond à anneau dégradé (violet → bleu → orange) ; **gros bouton jaune** « Télécharger maintenant » centré en bas (fond `--cta-yellow`, bord doré, lueur) ; **chevron ⌄** de défilement.
- **Bannière cookies** en bas : boutons pleine largeur bleus (« Tout refuser », « Accepter ») et « Paramètres » en contour.

### Proposé (non observé : pages internes en mobile)

- Navigation : reprendre la barre observée (pilule blanche à gauche, hamburger à droite) ; menu en tiroir plein écran (fond `--nav`, liens 18px).
- Accueil : voir « Observé » ; le bloc QR + 6 boutons du bureau disparaît au profit du seul bouton jaune.
- Personnages : frise d'emblèmes horizontale en haut (cercles 56px), panneau pleine largeur, illustration au-dessus du texte, citations masquées sauf la première.
- Actualités : cartes en une colonne, vignette au-dessus du texte (16:6), coin arrondi conservé.
- **Mondes** : la carte garde une hauteur d'écran ; les orbites sont recadrées (`preserveAspectRatio="xMidYMid slice"`), les mondes passent en icônes 48px et se repositionnent en colonne en zigzag ; libellés toujours visibles (pas de survol au doigt).
- **Fiche d'un monde** : bouton Retour + icône du monde sur une ligne ; titre 28px ; carrousel à une image (90vw), voisines masquées, glisser au doigt, flèches sous l'image.
