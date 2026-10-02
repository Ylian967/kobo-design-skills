# Alpine Glass Expedition — mises en page

Conteneur : `max-width: var(--max)` (1320px), marges `--edge` (16 → 48px). Sections : padding vertical `--space-24` (96px).

## Ordre de page type

| # | Section | Fond | Contenu |
|---|---|---|---|
| 1 | Héros | photo montagne + vignette | nav, surtitre, titre 2 lignes, texte, bouton de verre, trio du bas |
| 2 | Séjours | `--fog` | surtitre + titre serif + texte à droite, filtres, 3 cartes de voyage |
| 3 | Méthode | `--deep` + lignes de crêtes | titre, 3 panneaux d'étape, 4 chiffres |
| 4 | Témoignage | `--fog` | étoiles, citation, auteur |
| 5 | Appel final + pied | `--night`, crête en haut | titre, inscription, nom géant en dégradé, liens |

## Héros

```
(◬) Hautvent          AVENTURES   FAUNE   EXPÉRIENCES          ( VOIR LES VOYAGES )

                         —— SAISON 2027 · ALPES ——
                               EXPLORER
                            SANS LIMITES
                         texte sur trois lignes
                                              /\
                                         /\  /  \     ( ↗ verre )
                          ~~~~ brume ~~~~/    \
(▶) VOTRE VOYAGE,          ( TREKS EN MONTAGNE ) ( BIVOUAC SAUVAGE )       4,8/5★
    PENSÉ AVEC SOIN                                                    NOTE MOYENNE
```
- `min-height: 100svh`, colonne flex : nav, bloc titre (centré, haut), bas du héros (grille `1fr auto 1fr`, aligné en bas).
- **Le sommet est sous le texte**, décalé à droite du centre : le titre et le texte se posent sur le ciel assombri, jamais sur la neige.
- Bouton de verre à ≈ 15 % du bord droit, à 56 % de la hauteur, sur un versant.
- Vignette : `--vignette` (haut 35 %, milieu transparent, bas 82 %).

### Photo de remplacement en SVG

Calques de l'arrière vers l'avant, chacun avec un dégradé de tokens (les `stop` prennent `stop-color: var(--…)` en CSS) :
1. ciel (`--slate` → `--steel` → `--ice` → `--fog`) ; halo blanc radial à droite ;
2. lointains `--ice` à 75 % ;
3. bande de brume (ellipse floutée, dérive lente) ;
4. massif principal (dégradé roche `--ice` → `--steel` → `--deep`), face à l'ombre `--slate` à 50 %, calottes de neige blanches, couloirs en traits blancs ;
5. seconde brume, crête moyenne (`--steel` → `--deep`), troisième brume légère ;
6. premier plan `--deep` → `--night` avec sapins (triangles).
`preserveAspectRatio="xMidYMax slice"` ; en portrait, élargir le SVG (200 %) et le décaler (`left: -100%`) pour garder le sommet dans l'écran.

## Séjours

En-tête : surtitre `--muted`, titre serif 2 lignes à gauche ; paragraphe 36ch `--slate` à droite, aligné en bas. Filtres (`.chip--dark`). Grille `1.15fr 1fr 1fr`, gap 24px — la première carte est un peu plus large. 1000px : 2 colonnes, la première sur toute la largeur. 760px : 1 colonne.

## Méthode

Fond `--deep` avec 3 lignes de crêtes en filet `--ice` à 25 % en bas (SVG `preserveAspectRatio="none"`). En-tête comme ci-dessus (couleurs `--ice`). 3 panneaux d'étape en grille, puis 4 chiffres en serif séparés par un filet blanc à 20 %.

## Témoignage

Centré, une seule citation, beaucoup d'air (96px au-dessus et en dessous).

## Appel final et pied

Crête de montagne en haut (SVG rempli `--fog` qui « descend » dans la section nuit). Grille `1.2fr 1fr` : titre serif + texte à gauche, champ d'inscription à droite, alignés en bas. Puis nom de marque géant (`--text-giant`) en dégradé `--ice` → transparent (décoratif, `aria-hidden`), filet, ligne de liens en capitales.

## Pages secondaires

- **Fiche séjour** : héros photo 70vh avec titre du séjour, puces (durée, niveau, saison) et note ; puis colonne 2/3 – 1/3 : itinéraire jour par jour (liste avec ligne verticale et points) à gauche, panneau de réservation collant en verre clair (`--frost`) à droite avec prix serif et `.pill--deep`.
- **Liste de séjours** : filtres collants sous la nav, grille de cartes 3 colonnes, carte « Sur mesure » en fond `--deep`.

## Mobile (< 760px)

- Nav : logo + bouton « Menu » (pilule fantôme) ; panneau de verre sombre pour les liens.
- Titre à ≈ 50px, toujours 2 lignes ; texte 3–4 lignes.
- Photo recadrée en portrait sur le sommet (voir plus haut).
- Bouton de verre réduit à 96px, à droite, au-dessus du bas du héros.
- Bas du héros empilé : puces (2 lignes, à gauche) → lecture + texte à gauche, note à droite sur la même ligne.
- Cartes de voyage en une colonne, 440px de haut.
- Méthode : panneaux empilés, chiffres en 2 × 2.
- Vérifier à 390px : aucun débordement horizontal (`overflow-x: clip` sur `html`, `overflow: hidden` sur le héros).
