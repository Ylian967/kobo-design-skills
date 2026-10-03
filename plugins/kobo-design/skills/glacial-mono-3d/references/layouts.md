# Glacial Mono 3D — mises en page

Relevé sur captures du site de référence à 1440 × 900 (2026-10-03). Le site n'a pas de page au sens habituel : un canvas plein écran, et le défilement déplace la caméra.

## Écran type

```
 LOGO                                                ////// Manifeste
 [// Copyright © 2026]                         Notre mission : construire
 Polar Labs. Tous droits…                       la plus grande communauté…

                         ◇  objet 3D  ◇
                      01 ─── 02
                        ╲      ╲ 03
                      05 ─── 04

 Défiler pour découvrir
 ◖ Son : coupé
 ⌜ Lire ⌟                  ‹—— Studio   ⌜ X / Réseau ⌟   Archives ——›
```

- **Canvas fixe** plein écran ; l'interface est une couche HTML fixe par-dessus (`pointer-events` seulement sur ses éléments).
- **Marge unique** de 28px (`--edge`) ; aucun autre alignement.
- **Un espace de défilement** de 400vh sous la scène : c'est lui qui donne la progression (0 → 1).

## Parcours

| Progression | Scène | Ambiance | Interface |
|---|---|---|---|
| chargement | chaîne ASCII | `--loader` | — |
| 0 – 0,34 | 1 : amas de glace sur la neige | brouillard clair | texte sombre, constellation numérotée |
| 0,34 – 0,67 | 2 : bloc sombre et éclats | nuit | texte clair, étiquettes pleines |
| 0,67 – 1 | 3 : socle et sculpture de particules | clair | texte sombre, carrousel de liens en bas |

La caméra **reste posée** sur chaque scène pendant un quart de son segment, voyage pendant la moitié, puis se pose.

Sur le site : accueil (dôme de glace), recul avec transition en pixels, « portfolio » (cubes de glace contenant des logos, un par projet, flèches latérales), symbole (anneaux qui s'assemblent), fin (socle, sculpture en particules, liens).

## Panneau de contenu

Ouvert depuis un bouton à crochets : voile sombre plein écran, colonne de 360px centrée. La scène reste visible, floue, derrière.

## Mobile

- Marges de 16px ; le paragraphe du coin haut droit disparaît, la rubrique reste.
- Champ de vision de la caméra élargi (50° au lieu de 35°) quand l'écran est plus haut que large, pour garder l'objet entier.
- Constellation et étiquettes conservées, à leur position en pourcentage.
- Carrousel du bas resserré, texte de 10px.
