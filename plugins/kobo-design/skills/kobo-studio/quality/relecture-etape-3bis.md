# Relecture — étape 3 bis (couche de signature)

Question posée pour chaque skill : **« si je cache le nom du skill, est-ce que je reconnais sa démo dans la galerie ? »**

Méthode : pour chacun des six skills, une capture de `components/gallery.html` en intensité full à 1440 px (du haut de page à la fin de la section « Carte »), regardée à côté d'une capture de `examples/demo.html` du skill (ouverte en lecture seule). Pour sticker-brutal et noir-inferno, la seconde moitié de la galerie a aussi été regardée (onglets, notifications, états vides, chargement, blocs d'intensité).

## Verdicts

| Skill | Verdict | Ce qui fait reconnaître la démo | Ce qui manque |
|---|---|---|---|
| **serif-bistro-green** | **oui** | La barre flottante à liens en pilules avec l'actif en crème, les boutons en serif d'affiche suivis d'une flèche, la fiche de plat (photo en boîte crème, prix en serif) : c'est la section « Explorez la carte » de la démo. | Les feuilles qui se recouvrent, l'arche du héros, la reliure à spirale. Ce sont des mises en page, pas des composants. |
| **sticker-brutal-jp** | **oui** | L'effet autocollant est partout : bouton jaune cerné à ombre dure, logo et liens en pilules, étiquettes en pilules colorées, champs et fiches à ombre dure, titres de fiche en capitales. | Le cadre de page avec ses autocollants à cheval, le portrait en écusson, le katakana vertical. |
| **pixel-lime-portfolio** | **oui** | Boutons lime mono soulignés à flèche, navigation mono soulignée, étiquettes noires, photos en noir et blanc, noms en bas de casse, fiche de carnet lime perforée. | La mosaïque de pixels sur la photo, premier signe du skill, et les ovales au feutre. Sans eux la galerie est juste, mais moins frappante que la démo. |
| **lore-frame-editorial** | **en partie** | Nav mono dont l'actif porte le carré « ■ », micro-labels au carré, titres en capitales très serrées, bouton noir mono à coin coupé, images à coin coupé. | Le cadre fixe avec son rail, qui est LA signature du skill ; la forme de dossier des planches (onglet) ; les illustrations très colorées, que des photos de montagne ne remplacent pas. Reste aussi le champ, trop ordinaire (gris arrondi). |
| **glacial-mono-3d** | **en partie** | Les boutons sans fond à quatre crochets de coin sont exactement le bouton « Lire » de la démo ; mono partout, étiquettes pleines, photos en gris, panneau de nuit pour la modale. | La démo, c'est une scène 3D plein écran et une interface minuscule aux quatre coins. Une planche de composants sur fond de brouillard ne peut pas y ressembler. On reconnaît l'interface, pas le skill entier. |
| **noir-inferno-chapters** | **en partie** | Bouton à contour qui s'inverse au survol, liens à filet, capitales espacées, titres serif en capitales, champs réduits à une ligne, photos en gris, état vide centré dans une cible en tirets. | La démo est une image plein écran, un titre et un cercle à tirer. Aucun de ces trois éléments n'est un composant du lot. La galerie rend bien son interface de coin, pas son écran. |

acid-scan-security, tenu à jour, n'a pas été recomparé à sa démo dans cette passe.

## Lecture d'ensemble

- Les trois « oui » sont des skills dont l'identité vit dans des **composants** (bouton, carte, nav, champ). Les trois « en partie » sont des skills dont l'identité vit dans une **mise en page ou une image** (cadre, scène 3D, photo plein écran). La couche de signature ne peut pas combler cet écart : il faudra des composants de mise en page propres à ces skills.
- Le défaut relevé à l'étape 3 (« kit sobre recoloré ») est corrigé pour les six : aucun ne se lit plus comme un kit générique en full.
- En « off », les sept couches rendent **exactement** le composant de base (comparaison des styles calculés, couche chargée en off contre couche retirée : identiques).

## Ce qui a été difficile à traduire

| Skill | Difficulté | Choix fait |
|---|---|---|
| lore-frame | Le coin coupé coupe aussi le contour de focus. | Le bouton rogne un calque (`::before`), pas lui-même. La bordure ne suit donc pas la diagonale. |
| lore-frame | Le décodage des textes est sa moitié de style, et c'est du script. | Non traduit : full et reduced rendent pareil. |
| pixel-lime | Les perforations de la fiche de carnet, sans dégradé ni image. | Une bordure épaisse en pointillés ronds. Espacement non réglable (une tous les 43 px dans le skill). |
| pixel-lime | Le skill inverse le bouton « par pas » (`steps(4)`). | Repris par `--k-sig-ease-step`. |
| serif-bistro | Le bouton monte de 3 px et sa flèche avance de 5 px : valeurs absentes des tokens. | Calculées sur `--k-space-1` (0,75 × et 1,25 ×). |
| serif-bistro | La photo zoome à 1,06 au survol : c'est le motif « tout grossit » de la liste noire. | Gardé en full seulement, avec un commentaire qui cite la source. |
| glacial | Tous les boutons sont des crochets sans fond : plus rien ne distingue l'action principale. | Principal en gras, secondaire en texte secondaire. Hiérarchie faible, fidèle au skill. |
| glacial | Le logotype est blanc à halo sur brouillard clair (1,9:1). | Non repris : illisible hors d'un logotype. |
| sticker-brutal | L'ombre plus longue au survol est dans un `--k-sig-*`, que le vérificateur refusait. | Le vérificateur admet maintenant une ombre venue d'un `--k-sig-*` dans `signatures/`. |
| noir-inferno | « Pas de carte, pas de fond de bouton » : le bouton secondaire devient un simple texte. | Repris tel quel. Au repos, rien ne dit que c'est cliquable hors la casse et l'approche. |
| noir-inferno | Les numéros de scène (le courant à 40 px) appliqués à des onglets qui portent des mots. | Repris : l'onglet actif est en serif à 40 px. À regarder de près, c'est le choix le plus risqué du lot. |
| noir-inferno | Le skill interdit le gris en filtre CSS. | `--k-img-filter` reste un repli, et la fiche le dit. |
| tous | La couche a la même force que les règles d'état du composant et passe après. | Survol et désactivé redonnés à la main dans chaque couche. |

## Corrigé pendant la relecture

- **Barre de navigation (défaut de l'étape 3, déjà commité)** : depuis que la marque pouvait rétrécir, la barre ne débordait plus jamais et ne se repliait donc plus ; dans un conteneur étroit elle montrait les liens sans la marque ni le bouton « Menu ». La marque ne rétrécit plus qu'une fois la barre repliée. Vérifié sur les 23 skills aux deux largeurs.
- **noir-inferno** : le bouton de base était rouge (l'accent du contrat pointait sur le rouge que le skill réserve à la fin du récit). L'accent de la fiche est maintenant neutre (blanc), le rouge passe en `--k-accent-2`.
- **pixel-lime** : la carte en cours de chargement devenait une fiche de carnet lime.

## Vérifications

| Contrôle | Résultat |
|---|---|
| `tools/check_components.py` | 0 erreur |
| `tools/check_contract.py` | 23 fiches valides (62 rôles) |
| `tools/gen_maps.py --check` | aucune fiche ne changerait |
| Débordement horizontal, 23 skills, 1440 et 390 px | aucun |
| Repli de la barre de navigation, 23 skills, deux largeurs | conforme |
| Texte informatif sous 12 px (aide, erreur, bouton, notification, lien, onglet), 23 skills | aucun |
| « off » = composant de base, 7 couches | identique |
| Durées de notification lues dans le contrat | 6 s puis sortie ; vérifié |

## Non vérifié

- Les **mouvements** de signature (survols, flèches, filets qui se tracent, ligne de scan) : écrits d'après `motion.md`, mais les captures sont fixes. Aucun n'a été regardé en train de jouer.
- L'intensité **reduced** : vérifiée par construction (les mouvements sont dans un bloc à part), pas à l'œil.
- Les couches à **390 px** : mesurées (aucun débordement), pas regardées.
- Modale, menu mobile et notification **ouverts** sous chaque couche : seule la lisibilité de la modale a été mesurée (couleurs de fond et de texte) pour quatre skills.
- acid-scan-security : couche mise à jour, non recomparée à sa démo.
- La démo de lore-frame affichait encore son rideau de chargement à la première capture ; la comparaison s'appuie sur la capture prise après défilement.
