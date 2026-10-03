# Zigzag Snack Pop — images et pictogrammes

## Ce que montre la référence

- Des **emballages de marque** détourés (barres, boîtes empilées), tenus dans une main.
- Des **ingrédients détourés** dans des pastilles de couleur.
- Des **personnes détourées** (coach, randonneuse, surfeuse) posées sur le brun.
- Des **silhouettes d'aventure** dessinées (grimpeur, cycliste, skateur) et des montagnes en aplats.

## Ce que fait le skill

Sans détourage ni emballage de marque, le skill garde de **vraies photos entières** et retrouve l'effet par le cadre et la fusion :

| Rôle | Solution |
|---|---|
| Produit du héros | Photo dans un cadre blanc penché, à ombre dure (« photo-autocollant ») |
| Ingrédients | Photo **sur fond clair**, recadrée en cercle, fondue dans la couleur de la pastille (`mix-blend-mode: multiply`) |
| Produits des fiches | Photo **sur fond blanc**, fondue (`multiply`) dans une **teinte pâle** de la couleur de la fiche : le blanc disparaît, le produit semble posé sur la couleur sans changer de teinte |
| Personnes | Photo dans un cadre en arche, avec une pilule-étiquette |
| Montagnes | Deux aplats en SVG (décor, pas une illustration) |
| Silhouettes d'aventure | Non reprises |

## Photos de la démo (Unsplash)

| Rôle | Identifiant |
|---|---|
| Produit du héros | `photo-1622484212850-eb596d769edc` |
| Amandes | `photo-1554721388-3db53bf7a24a` |
| Cacahuètes (pastille, mosaïque) | `photo-1639070863891-a20035caf05a` |
| Cacao | `photo-1640958899669-12f9b327d38f` |
| Miel | `photo-1655169947079-5b2a38815147` |
| Dattes | `photo-1691657917109-c6e027eac44a` |
| Noix | `photo-1633101142524-695abcd282c8` |
| Pile de produits | `photo-1704650312560-4414980bab95` |
| Coach | `photo-1758875568932-0eefd3e60090` |
| Main et emballage | `photo-1558022045-7e3227c153f5` |
| Saveur « amande blanche » | `photo-1772986509919-61b14bf702fa` |
| Saveur « fruits des crêtes » | `photo-1633360821154-1935fb5671e6` |
| Saveur « caramel croquant » | `photo-1772984960561-89f57b996449` |
| Randonneuse | `photo-1729653824492-0504ec9cb137` |
| Surfeur | `photo-1486432155089-343c871b640f` |
| Sportif qui croque | `photo-1678875525705-1952dd9dd430` |

## Choisir une photo

- **Pour une fusion « multiply »** : fond blanc ou très clair, sujet plus sombre que le fond. Un fond gris ou coloré laisserait un rectangle visible. Ne jamais fondre une photo directement dans une couleur foncée (bleu, brun) : le produit en prendrait la teinte ; passer par une teinte pâle de cette couleur.
- **Produit du héros** : gros plan appétissant, tons chauds (chocolat, caramel, céréales) qui s'accordent à l'orange.
- **Personnes** : en mouvement ou en extérieur, souriantes ; pas de pose de studio figée.
- Texte alternatif pour chaque photo qui apporte une information ; les pastilles répétées de la bande sont masquées aux lecteurs d'écran.

## Pictogrammes

Très peu, au trait de 2 à 2.4 : loupe, menu. Les chevrons et flèches sont des signes typographiques (« › », « ⌄ »). Le tampon est un SVG avec texte en cercle.

## Polices

- **Anton** : titres, boutons, noms de saveur, notes. Une seule graisse.
- **Barlow** 400, 500, 700, et 800 italique pour les mentions « 20 g de protéines » et le mot géant.
- **Barlow Semi Condensed** 500, 600 : navigation, libellés d'ingrédients.

Toutes trois sont des équivalents libres choisis à l'œil.

## Interdits

- Pas d'emballage dessiné, pas de produit en CSS.
- Pas de silhouette ni de personnage illustré à la main.
- Pas de dégradé de couleur : des aplats, des dents de scie, des ombres dures.
- Pas d'émoji en guise de pictogramme dans l'interface.
