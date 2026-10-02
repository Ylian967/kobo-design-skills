# Nocturne Architecture — mises en page

Conteneur `--container` 1440px, marges `--gutter` (16px mobile → 40px), sections séparées par `--space-24` (96px) et par l'alternance `--bg` / `--surface`, jamais par des bordures.

## Héros nocturne (ouverture)

```
Studio  Projets  Services  Journal              MER 1 OCT \ 21:40 \ 18°C  (Parlons-en →)
(▶) VOIR LE SHOWREEL
Court paragraphe 3 lignes, 300px
                     [ photo de ville la nuit, plein écran ]
                                                    Architecture, intérieurs — villes
o  r  s  e  l   ← mot-marque géant, bord à bord, coupé d'un quart en bas
```
- Hauteur `max(640px, 100svh)`, `overflow: hidden`, photo en fond absolu + `--shade-hero` (noir 55 % en haut pour la barre, noir 90 % en bas pour faire le lien avec la section suivante).
- Texte d'intro à 48px sous la barre, colonne de 300px, ombre de texte douce.
- Ligne de localisation en 12px à droite, posée juste au-dessus du mot-marque.

## « À propos »

```
• À PROPOS        Grande phrase bicolore sur 4–5 lignes, blanc → gris
©2026
[ photo 1fr ]     [ 15+ | 120+ ]
                  [ 08  | 34k  ]   ← grille 2×2 sur filets
```
Grille `1fr 2.2fr`, puis rangée `1fr 1.4fr` (photo + stats) à 64px en dessous.

## Carrousel de projets

```
Résidences d'exception
signées orsel (gris)                                      (‹) (›)
[ROUGE 4:5] [photo 4:5] [photo 4:5] [photo 4:5] [photo… coupée au bord]
━━━━━━━━━━━━──────────────────────────────────────────── 01 / 06
```
Fond `--surface`. Les cartes débordent à droite pour signaler le défilement ; la première est rouge. Ligne de progression rouge sur filet gris.

## Méthode (étapes)

```
• MÉTHODE                01  Terrain et faisabilité                (×)
Faire de vos projets         [ photo 4:3 ]   Points clés
immobiliers une réalité                      • …  • …  • …
Paragraphe gris                              (Réserver une visite →)
                         02  Esquisse et lumière                   (+)
                         03  Chantier suivi                        (+)
```
Grille `1fr 2fr` ; le corps de l'étape ouverte est indenté de 80px pour s'aligner sur le titre.

## Contact + pied de page

Grande phrase bicolore en `clamp(40px, 6vw, 88px)` à gauche, champ e-mail à droite ; 96px plus bas, filet puis quatre colonnes de liens (titres en capitales 11px). Rappel du mot-marque en `--raised` (presque invisible), coupé par le bas de page.

## Mobile (≤ 640px)

- Barre : bouton menu rond à gauche, pilule rouge à droite ; horloge masquée.
- Héros : intro sous la barre, ligne de localisation alignée à gauche au-dessus du mot-marque, mot-marque à 44vw (toujours bord à bord).
- Toutes les grilles passent en une colonne (≤ 900px) ; libellé et ©2026 sur une ligne.
- Carrousel : cartes à 78 % de largeur, défilement au doigt avec aimantation, flèches au-dessus.
- Étapes : colonne numéro 40px, titres 20px, corps sans retrait (photo puis liste).
- Pied : deux colonnes de liens.
