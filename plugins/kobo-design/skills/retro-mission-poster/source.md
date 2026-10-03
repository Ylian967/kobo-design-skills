# Source — Retro Mission Poster

- **Référence** : https://www.prometheusfuels.com/ (site d'une entreprise de carburants de synthèse ; Site of the Day Awwwards, mai 2021 — fiche : https://www.awwwards.com/sites/prometheus-fuels)
- **Famille** : Récit de marque / affiche
- **Analysé le** : 2026-10-01 et 2026-10-03 (premières versions, d'après la fiche Awwwards) ; **2026-10-03, réécriture complète** : fiche Awwwards rouverte, archive du web consultée (capture de janvier 2022), feuille de style d'origine récupérée et lue.
- **Ce qui plaît** : l'esthétique d'affiche de voyage, le titre en biais, le cadre crème, les aplats granuleux.

## État de la référence

- **Le site primé n'existe plus.** L'adresse renvoie vers un site entièrement refait, sans rapport avec ce style : rien n'en est repris.
- **Archive du web** : la page d'accueil de janvier 2022 est conservée, avec sa **feuille de style** (≈ 31 000 caractères) et ses déclarations de polices. Le script de l'expérience ne s'exécute plus : écran noir, aucun canvas. **L'expérience animée n'a donc pas pu être revue.**
- **Fiche Awwwards** : une seule capture encore disponible (1290 × 700, chapitre 1). Les trois autres captures citées dans la première version ne sont plus en ligne.

En clair : les valeurs de l'interface sont mesurées dans le vrai code ; l'allure des scènes repose sur **une** image ; leurs animations ne sont pas connues.

## Mesuré dans la feuille de style d'origine

| Élément | Valeur |
|---|---|
| Base | `html { font-size: calc(100vw / 1440 * 10) }` (1rem = 10px à 1440) ; mobile : `100vw / 375 * 10` ; tablette : `100vw / 768 * 10` |
| Couleurs | #e74833 (×16), #fdf0e1 (×13), #d8d8d8 (×11), #161616 (×4), #ee2f22 (×2) |
| Polices | « marscondensed-regular » (titres), « FuturaLT-Bold » et « FuturaLT-Medium » (texte) |
| Titres | 12rem (120px), interligne 10rem, capitales, rouge ou crème |
| Titre de carte | 4rem / 3.4rem, capitales, 3 lignes au plus |
| Texte | 1.8rem / 2.4rem ; dates 1.4rem en capitales ; titre d'inscription 2rem gras rouge ; texte du menu 1rem / 1.6rem |
| Images | rayon 1.2rem (1.5rem à la une), ratio 1 : 0.627, contour `0 0 0 2px #e74833` |
| Boutons ronds | contour 2px #d8d8d8, rayon 3.5rem |
| Champ | souligné de 0.15rem #d8d8d8, flèche en traits |
| Transitions | `all 300ms cubic-bezier(.19,1,.22,1)` (×13) ; `all 1000ms` même courbe (×5), avec 150ms de retard (×2) ; `opacity 500ms cubic-bezier(.455,.03,.515,.955) 500ms` |
| Animations | `GRAINS 1s linear` (apparition du grain), `rotate 50s linear infinite`, `draw 4s linear infinite` |
| Points de rupture | 500px, 600px, 960px |

## Lu sur la capture Awwwards (1290 × 700)

| Élément | Valeur |
|---|---|
| Cadre | crème #fdf0e0, 8px |
| Ciel | #285868 en haut, ≈ #98b0b0 en bas, stries plus claires |
| Terre | #885040 ; montagnes éclairées ≈ #e8d8c0 |
| Titre | crème ≈ #f8e8d0, sur 2 lignes, incliné d'environ 13 à 16° (retenu : 13°) ; « CHAPTER 1 » très espacé au-dessus |
| Logo | rouge #e84028, capitales |
| Accroche | bas droite : titre gras en capitales, 2 lignes, bouton crème rectangulaire |
| Anneau | dentelé, trait rouge, flèche au centre, à cheval sur le bord bas |
| Sujet | voiture ancienne vue de trois quarts arrière, route claire, rendu 3D à gros grain |

## Proposé par le skill (non mesuré)

- **L'effet d'affiche appliqué à des photos** (niveaux, trois tons, ciel, grain) et tous ses réglages.
- Les animations des chapitres : découpe du titre en lignes, mot géant qui glisse, liste de faits ; la cascade du menu.
- Le mot rouge géant, sa taille et sa place (décrit dans la première version d'après une capture aujourd'hui indisponible).
- `--red-text`, `--rust-deep`, les voiles.
- Toute la version mobile.
- Les images par seconde de `motion.md`, mesurées dans un Chrome sans carte graphique.

## Non vu

- L'expérience 3D, ses transitions entre chapitres, son écran de chargement animé, le son.
- Les autres chapitres du site d'origine, sa version mobile.

## Écarts assumés

| Référence | Dans le skill | Raison |
|---|---|---|
| Nom, logo, textes, voiture et décors du site | Entreprise fictive « Hélios », textes français, photos Unsplash | Identité et droits |
| Mars Condensed, Futura LT (payantes) | Big Shoulders Display, Jost | Polices libres |
| Scènes 3D stylisées | Photos traitées en affiches | Utilisable sans modèles 3D |
| Grain en calque animé | Grain cuit dans l'image | Fluidité (40 → 122 images/s) |
| Rouge #e74833 en petit texte sur #161616 (4,4:1) | `--red-text` #f0604c | Contraste |
| Tailles proportionnelles à la largeur sans limite | Tailles bornées par `clamp()` | Lisibilité aux extrêmes |
