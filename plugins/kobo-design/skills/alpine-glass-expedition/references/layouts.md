# Alpine Glass Expedition — mises en page

> La référence ne montre **que le héros** (une image : maquette 1440 × 1120px, coupée en bas). Les positions du héros sont **mesurées** sur cette image ; les sections suivantes sont **proposées** pour faire une page complète dans le même langage.

## Héros (relevé)

Hauteur `100svh` (min 720px). Le haut est ancré en haut, le bloc titre est ancré **en bas** (marge `--edge`).

```
▲ Hautvent              AVENTURES    ITINÉRAIRE    GUIDES             ( VOIR LES SÉJOURS )   ← nav 86px, texte sombre sur brume
   (brume claire)                         ▓▓▓
 ●▶  VOTRE VOYAGE,                      ▓▓▓▓▓▓▓  (personne, 40–50 % de la largeur)     4,8/5 ★
     PENSÉ AVEC                         ▓▓▓▓▓▓▓                                        NOTE MOYENNE
     ATTENTION                          ▓▓▓▓▓▓▓            (ombre bleue en diagonale)
                                        ▓▓▓▓▓▓▓                        ╭──────╮
                                         ▓▓▓▓▓                         │  ↗   │  ← bouton de verre 192px
 ( TREKS D'ALTITUDE )    EXPLORER         ▓▓▓                          ╰──────╯
 ( BIVOUAC SAUVAGE  )    SANS LIMITES                                           ← titre 122px, 2 lignes
                         Des sommets, des vallées secrètes…                     ← paragraphe 20px, 3 lignes
   (bleu profond uni)
```

| Élément | Position à 1440 (mesurée) |
|---|---|
| Logo | gauche 91px (`--edge`), centré à 43px du haut |
| Liens | centrés sur la page (de 470 à 969px), écart 82px |
| Pilule | droite 74px (`--edge-end`), 199 × 54px |
| Bouton lecture + texte | gauche 91px, haut 217px (≈ 19,4 %) ; texte à 15px du disque |
| Note | bord droit à 94px, haut 223px ; libellé 12px plus bas |
| Puces | gauche 91px, empilées, haut aligné sur le titre (+5px) |
| Titre | gauche 372px (colonne `--col-side` de 281px après la marge), capitales de 87px, pas de 113px |
| Paragraphe | même bord gauche, 50px sous le titre, 580px de large, bas à 91px du bord |
| Bouton de verre | gauche 951px (579px après le début du titre), centre à 613px du haut ; son bas mord de 8px sur le titre |
| Lumière | brume `--mist` en haut à gauche, ombre `--ridge` / `--deep` en bas à droite, frontière à ≈ 155° ; bas uni `--deep` à partir de ≈ 75 % |

Règles de placement de la photo : la **personne entre 40 et 50 % de la largeur**, tête sous la nav ; le **coin haut gauche clair** (texte sombre) ; le titre passe **devant ses jambes**.

## Page complète (proposé)

| # | Section | Fond | Contenu |
|---|---|---|---|
| 0 | Ouverture | `--mist` | altimètre centré, libellé, filet de progression |
| 1 | Héros | photo + voile diagonal | voir ci-dessus |
| 2 | Séjours | `--deep` | surtitre + titre 2 lignes à gauche, phrase à droite (alignée en bas) ; rangée de filtres ; **4 cartes** de séjour ; bande de **4 chiffres** à filets |
| 3 | Film de la semaine | `--deep` | section de 340vh, scène collante en 2 colonnes `1.05fr / 1fr` : cadre photo avec altitude | surtitre, titre, liste des 6 jours, profil d'altitude |
| 4 | Parole de guide | `--deep` | surtitre ; portrait rond à gauche, citation en serif et signature à droite |
| 5 | Appel final | photo refroidie + voile vertical | titre à la taille du héros, champ pilule à gauche, bouton de verre à droite |
| 6 | Pied | `--abyss` | une ligne |

Conteneur : `--container` 1258px (mêmes marges que le héros) ; rythme vertical 96–128px ; point de rupture 860px. **Tout le site reste sur fond `--deep`** après le héros : le bas de la photo et la page ont la même couleur, sans couture.

## Adaptation mobile (≤ 860px)

- **Nav** 64px : logo + pilule « Menu » 44px.
- **Héros** (min 640px) : bouton lecture 56px et texte 13px en haut à gauche ; note à droite (chiffre 40px) sur une ombre `--ridge` renforcée ; le bloc du bas s'empile : **puces en ligne** (44px) → **titre** `12vw` sur 2 lignes → paragraphe 16px ; le **bouton de verre** (132px) se place à droite, au-dessus des puces ; le voile du bas monte plus haut (dès 35 %).
- Photo : même sujet centré (`object-position: 48% 30%`).
- Cartes sur 2 colonnes (ratio 3 / 4.6, petite sphère masquée) ; chiffres en 2 × 2.
- Film : une colonne, cadre photo à 30svh, liste compacte (14px), profil dessous.
- Témoignage et appel final en une colonne ; le champ pilule devient un bloc arrondi de 28px avec le bouton en pleine largeur ; le second bouton de verre est masqué.
