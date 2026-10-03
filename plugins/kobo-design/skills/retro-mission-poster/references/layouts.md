# Retro Mission Poster — gabarits

Chaque écran est **une affiche** : un chapitre = une image plein écran dans un cadre crème, un titre en biais, une accroche. Le site d'origine règle sa taille de base sur la largeur (1rem = largeur / 144) : tout grandit avec la fenêtre.

## Un chapitre (1440 × 900)

```
╔══════════════════════════════════════════════════════════════╗  cadre crème de 9px, fixe
║ HÉLIOS                                                    ≡  ║  logo rouge · menu
║                                   C H A P I T R E  1         ║
║                              DU CARBURANT                    ║  titre géant incliné de 13°,
║                              TIRÉ DE L'AIR                   ║  dans la moitié droite (ou gauche)
║        (sujet de la photo)                                   ║
║                                                              ║
║                                          ZÉRO CARBONE NET    ║  accroche en bas à droite,
║                              ⟳                Nous captons… ║  alignée à droite
║                              ↓                 [ LA MISSION ]║  anneau dentelé centré en bas
╚══════════════════════════════════════════════════════════════╝
```

| Élément | Position |
|---|---|
| Cadre | 8px pour 1290px de large (mesuré), sur les quatre côtés, au-dessus de tout |
| Logo | haut gauche, à ≈ 30px du cadre |
| Titre | commence vers 55 % de la largeur et 15 % de la hauteur ; 2 lignes |
| Accroche | bas droite : titre gras en capitales, 2 lignes, bouton crème |
| Anneau | centré, posé sur le bord bas |

## Déroulé

| # | Écran | Particularité |
|---|---|---|
| 0 | Chargement | fond #161616, logo rouge, cercle tracé |
| 1 | Chapitre 1 | titre à droite |
| 2 | Chapitre 2 | titre à gauche + **mot rouge géant** derrière |
| 3 | Chapitre 3 | titre à droite + liste de trois faits en bas à gauche |
| 4 | Chapitre 4 | titre à gauche + mot géant |
| 5 | Chapitre 5 | conclusion, bouton vers le journal |
| 6 | Journal | page sombre (voir ci-dessous) |

Le titre **alterne** de côté d'un chapitre à l'autre ; un chapitre sur deux porte un mot géant.

## Journal (mesuré dans la feuille de style d'origine)

Fond #161616. Titre rouge géant centré (120px). Cartes sur 2 colonnes : image au ratio 1 : 0.627, coins 12px ; date en capitales 14px ; titre 40px / 34px en capitales étroites, 3 lignes au plus ; filet rouge de 1px. Page d'article : titre 120px / 100px centré sur 80 % de la largeur, image à la une sur les deux tiers de la largeur (coins 12px, contour rouge 2px), date centrée, texte 18px / 24px dans une colonne de 50 % de la largeur.

## Menu

Plein écran #161616 : à gauche la liste des chapitres en capitales étroites géantes (crème, rouge pour l'actif) ; à droite, en bas, l'inscription (titre rouge en capitales grasses 20px, texte gris 16px / 1.6, champ souligné de 2px avec flèche, boutons ronds à contour de 2px).

## Mobile (390px, proposé)

- Le titre occupe toute la largeur, à 17 % du haut, toujours incliné.
- L'accroche passe au-dessus de l'anneau, alignée à gauche.
- Chapitre à faits : la liste remplace l'accroche.
- Menu et journal en une colonne.
- Le site d'origine avait ses propres réglages (1rem = largeur / 37.5) ; la version mobile n'a pas pu être revue.
