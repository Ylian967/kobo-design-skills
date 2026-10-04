# Relecture visuelle — étape 3 (premier lot de composants)

Grille de `anti-slop.md` passée sur `components/gallery.html`, ouverte depuis le disque dans Chrome.

**Captures regardées.** Cinq skills : acid-scan-security, lore-frame-editorial, pixel-lime-portfolio, serif-bistro-green, glacial-mono-3d.
- 1440 px, intensité full : première moitié de page pour les cinq ; seconde moitié pour acid-scan et lore-frame.
- 390 px, intensité full : haut de page pour acid-scan, lore-frame et pixel-lime ; cartes pour serif-bistro ; notifications et états vides pour glacial.
- Intensité off : section « signature » de lore-frame à 390 px. Les autres captures off ont été prises mais pas toutes regardées : hors variantes de signature, la page est identique en full et en off.

Les 23 skills ont en plus été passés par mesure (débordement, repli de la barre, zone cliquable, tailles de texte) aux deux largeurs.

## Ce qui passe

| Point | Constat |
|---|---|
| Skill reconnaissable sans lire son nom | oui pour les cinq : police de titre, palette, rayons, hauteur des contrôles |
| C1, C2, C3 — couleur étrangère au skill | aucune : tout vient des rôles |
| F1, F3, F5 — ombres douces, flou | aucune ombre hors `--k-shadow`, aucun flou |
| M1, M4 — tout grossit, `transition: all` | aucun |
| T1, T5, T7 — remplissage, emoji, liens morts | aucun ; données fictives annoncées en tête de page |
| I3 — dessin à la place d'une photo | non : vraies photos, `alt` descriptif |
| 390 px — défilement horizontal | aucun sur les 23 skills, après correction de la barre de navigation (marque trop large sous tiny-planet-toy et sticker-brutal-jp) |
| 390 px — menu, grilles en une colonne, ordre de lecture | conformes |
| Cibles tactiles | 44 px partout, y compris pixel-lime (bouton affiché : 26 px) |
| États | focus visible, erreur écrite et reliée, désactivé, vide, chargement : présents et déclenchables |
| Clavier seul | 39 contrôles automatisés, tous conformes (menu, onglets, modale, notification, champ, progression) |
| M5 — mouvement réduit | squelette, barre et témoin immobiles, transitions à zéro |

## Ce qui échoue ou reste faible

| Point | Constat | Skills |
|---|---|---|
| **I5 — photo sans le traitement du skill** | Les photos des cartes sont brutes. acid-scan impose une rampe verte, pixel-lime et signal du noir et blanc, retro des aplats granuleux. | tous ceux qui imposent un traitement |
| **K7 — signature diluée** | Les composants de base sont neutres par construction. Hors typo, couleurs et formes, le geste propre au skill n'apparaît que dans les deux variantes écrites (biseau, crochets). Le cadre de lore-frame, la mosaïque de pixel-lime, l'arche de serif-bistro n'existent pas encore. | 21 skills sur 23 n'ont aucune variante |
| **« Kit générique »** | En intensité off, et pour les skills sans variante, la galerie se lit comme un kit sobre teinté aux couleurs du skill. C'est l'effet voulu pour off ; c'est insuffisant pour full. | lore-frame et pixel-lime surtout : gris clair, noir, coins arrondis |
| **Y3 — texte sous 12 px** | L'aide des champs, les surtitres et les libellés de bouton descendent à 10 ou 11 px, parce que la fiche reprend les tailles du skill. | lore-frame et noir-inferno (10 px) ; chrome-atelier et glacial (11 px) ; surtitres à 11 px dans anime, nocturne, pixel-lime, signal |
| **Y5 inversé — casse des boutons** | Les skills qui écrivent leurs boutons en capitales espacées (acid-scan, lore-frame, pixel-lime, glacial, chrome…) perdent ce trait : le contrat n'a pas de rôle pour la casse des libellés. | une dizaine |
| **États peu distincts entre eux** | Sur fond vert, succès, avertissement et erreur sont trois teintes pâles ; l'erreur est presque de la couleur du texte. L'icône et le mot font le travail, comme prévu, mais la couleur n'aide plus. | serif-bistro ; même cause attendue sous tiny-planet et heritage-lens |
| **F1 — même contenant partout** | Quatre cartes identiques en rangée dans la section « Carte ». C'est une planche d'états, pas une mise en page, mais le motif est là. | tous |

## Corrigé pendant la relecture

- lore-frame : titres sur deux lignes qui se chevauchaient (interligne de 0,84 prévu pour des mots géants) → plancher à 1,1 dans les composants.
- glacial : les éléments désactivés ressortaient en blanc (`--k-surface-2` relié à `--halo`) → dérivation corrigée dans la fiche.
- Tous : barres de défilement parasites sur la liste d'onglets ; témoin de chargement carré dans les skills sans arrondi ; carte « squelette » écrasée dans la galerie.
- tiny-planet et sticker-brutal à 390 px : la barre repliée débordait encore → la marque se tronque.

## Non vérifié à l'œil

- 18 skills sur 23 (mesurés seulement).
- Les survols et le focus réels : les captures montrent les états figés par `data-k-state`.
- L'intensité « reduced » en mouvement (crochets qui ne s'écartent plus) : vérifiée par les valeurs calculées, pas regardée.
- Les lecteurs d'écran : rôles et annonces sont en place, aucun n'a été essayé.
