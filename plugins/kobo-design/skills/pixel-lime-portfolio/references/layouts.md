# Pixel Lime Portfolio — mises en page

Conteneur : `max-width: var(--max)` (1360px), marges `--edge` (16 → 40px). Sections : padding vertical `--space-24` (96px).

## Ordre de page type

| # | Section | Matière | Contenu |
|---|---|---|---|
| 1 | Héros | photo N&B + grain | nav, mosaïque, étiquettes, nom, bouton, accroche |
| 2 | Comment je pense | `--paper` quadrillé | étiquette + énoncé travaillé + chiffres clés + autocollants |
| 3 | Principes | `--ink` quadrillé | énoncé avec gras lime + 3 fiches inclinées |
| 4 | Travaux | `--paper` quadrillé | titre bas de casse + filtres + grille 2 colonnes |
| 5 | Services | `--paper` (suite) | liste à lignes |
| 6 | Contact + pied | `--ink` quadrillé | titre géant, champ, liens mono |

## Héros

```
N.VALIN      TRAVAUX      À PROPOS      SERVICES      CONTACT      ■ DISPO
                                          ┌ créatif ┐  ▓▓▓
                                            └ designer ┘▓▓ ▓▓▓
                                          ( portrait N&B ) ▓▓
noé
▓▓ ▓     valin
[DÉCOUVRIR LA SUITE →]     accroche 3 lignes          PARIS — LISBONNE
```
- `min-height: 100svh`, photo plein cadre ; sujet au centre-droit (≈ 47 % → 90 %).
- Nom en bas à gauche, 2 lignes, la 2e décalée. Il peut chevaucher le bas du sujet.
- Grappe principale sur le visage / le bord du sujet ; une petite grappe entre les deux lignes du nom ; une au bord droit.
- Rangée du bas : bouton lime, accroche (34ch, `--photo-5`), méta mono à droite.

## Énoncé « comment je pense »

Grille `220px 1fr` : à gauche l'étiquette noire + numéro mono « (01) — méthode » ; à droite l'énoncé (`--text-statement`, 30ch max) puis les chiffres clés (3 colonnes, filet). Autocollants dans les marges (haut gauche, haut droite, milieu droit).

## Principes (fiches)

En-tête : étiquette lime + énoncé blanc (22ch, gras en `--lime`) à gauche, numéro mono à droite. Puis 3 fiches en grille `repeat(3, 1fr)`, gap 32px, la fiche du milieu descendue de 32px. Les fiches débordent un peu de leur colonne à cause de la rotation : garder `padding-inline: 16px` sur la rangée.

## Travaux

En-tête : titre `--text-section` bas de casse avec compteur en exposant mono « (04) », filtres à droite. Grille 2 colonnes, gap 48px / 32px, colonne paire décalée de 64px vers le bas (rythme éditorial). 4 à 8 projets ; au-delà, bouton `.btn--line` « Tous les projets ».

## Services

Liste pleine largeur, filet noir en haut, filets `--rule` entre les lignes. Pas de titre visible (le titre est `sr-only`) : la liste parle d'elle-même.

## Contact et pied

Étiquette lime, titre géant Inter Tight 300 (≈ 11vw) sur 3 lignes avec le mot central en 700 `--lime`, grappe de pixels en haut à droite ; champ e-mail + bouton (560px max) ; pied mono : copyright à gauche, liens soulignés à droite, filet `--rule-dark` au-dessus.

## Pages secondaires

- **Projet** : héros photo N&B pleine largeur (sans nom géant), titre bas de casse 88px, ligne de méta mono (client, année, rôle), puis alternance d'images pleine largeur et de colonnes de texte 60ch sur papier quadrillé ; un énoncé travaillé au milieu.
- **À propos** : portrait N&B à gauche (avec grappe), énoncé à droite, fiches « outils » / « clients » / « en ce moment ».

## Mobile (< 640px)

- `--grid-cell: 40px`, `--pixel: 15px`.
- Nav : logo + 3 liens (masquer « À propos » et l'indicateur) ou bouton MENU.
- Héros : sujet recentré et agrandi (≈ 92vw), remonté ; nom à 4.9rem, toujours décalé ; accroche sous le bouton, méta masquée.
- Énoncé : une colonne, autocollants réduits aux bords.
- Fiches : une colonne (max 420px), inclinaison conservée, plus d'écart vertical (48px).
- Travaux : une colonne, sans décalage.
- Services : `48px 1fr 44px`, description masquée.
- Contact : titre ≈ 3.25rem, grappe masquée.
- Vérifier à 390px : aucun débordement horizontal (`overflow-x: clip` sur `html`, `overflow: hidden` sur les sections qui portent des autocollants).
