---
name: glass-frame-estate
description: Direction artistique « Glass Frame Estate » pour l'immobilier haut de gamme et les annonces de biens (agence, promoteur, location de villas, chalets, architecture, hôtellerie boutique), inspirée des templates Dribbble d'annonces immobilières. Héros photo encadré d'un filet blanc fin à coins légèrement arrondis posé sur la même photo floutée, mot-marque géant blanc en dégradé vers la transparence placé derrière le bâtiment, petite navigation en capitales (heure, ville, MENU + bouton rond à points), titre Inter 500 en capitales en bas à gauche, bouton rectangulaire à flèche, carte conseiller en verre, puis pages blanches éditoriales : surtitres « // », cartes grises à 10px, compteurs odomètre, règle graduée, grille 2×2 d'annonces à étiquettes, services sur fond noir, pile d'étapes collantes, témoignages en mosaïque, FAQ, pied noir avec mot-marque géant. Couvre aussi les pages internes mesurées sur le site en ligne du template : menu plein écran flouté, héros de page à titre 100px, fiche de bien avec encarts latéraux, détail de service, quartier, journal, article, contact, 404. À utiliser pour une landing d'agence, une fiche de bien, un catalogue d'annonces, une app de location ou un site au style « luxe calme, golden hour, verre, minimal, Inter ».
---

# Glass Frame Estate

> Une photo de maison au coucher du soleil, posée dans un cadre de verre ; tout le reste est blanc, noir et silencieux.

## L'idée

Le héros est une **photo dans un cadre** : un filet blanc de 1px, coins à 6px, posé à quelques pixels du bord de l'écran sur **la même photo floutée** — l'image semble sous verre. Derrière le bâtiment, un **mot-marque géant** blanc qui s'efface vers le bas, comme gravé dans le ciel. L'interface tient en lignes fines et petites capitales : heure locale, ville, « MENU » et un rond blanc à points. Le texte est **net et moyen** (Inter 500 en capitales, mesuré) et la seule matière en relief est la **carte conseiller en verre dépoli**. Sous le héros, la page devient un catalogue éditorial blanc rythmé par une bande noire.

Inspiré de : voir `source.md`. On reprend le langage visuel, jamais l'identité : pas de nom, logo, photos ni textes du template d'origine.

## Règles prioritaires

1. **Le cadre** : `border: 1px solid var(--frame-line)`, `border-radius: var(--radius-frame)`, marge `--frame-inset`, photo floutée (`--blur-bg`) visible tout autour.
2. **Mot-marque derrière le sujet** : ciel → mot-marque → colline/maison. Le sommet du bâtiment mord dans le bas des lettres.
3. **Titres Inter 500 en capitales** (`--weight-title`, interligne 1.1, `--tracking-title`), surtitres « // » 16px, texte 16px/1.6 `--muted`. Rien au-delà de 600 (le mot-marque).
4. **Deux matières seulement** dans le héros : photo et verre (`--glass` + `backdrop-filter`). Ailleurs : blanc, `--surface`, noir `--ink`.
5. **Ambre « golden hour »** (`--accent`) réservé aux prix et aux liens « Lire → » ; jamais de fond ambré.
6. **Contraste** : le texte blanc du héros repose toujours sur le voile `--shade` (bas de photo) ; repli opaque `--glass-solid` si `backdrop-filter` manque.
7. **Accessibilité** : cibles ≥ 44px (puces, rond menu, favoris), focus visible ambre (blanc sur photo et noir), photos avec `role="img"` + `aria-label`.
8. **Aucune valeur en dur** : tout vient de `references/tokens.css`.

## Fichiers du skill

| Fichier | Quand le lire |
|---|---|
| `references/tokens.css` | Toujours, en premier : copier le bloc `:root`. |
| `references/components.md` | Cadre photo, mot-marque, barre du haut, boutons, carte verre, carte d'annonce… puis la partie **mesurée sur le site** : surtitre « // », bouton à flèche, compteurs odomètre, règle graduée, ligne de service, carte de quartier, pile d'étapes, mosaïque de témoignages, carte d'agent, formulaire gris, FAQ, encarts de fiche, menu plein écran, héros de page interne. |
| `references/layouts.md` | Héros encadré, catalogue 2×2… puis l'**accueil réel en 13 sections**, les **10 pages internes** et le mobile observé. |
| `references/motion.md` | Mise au point de la photo, montée du texte, survols ; transition de couleur **mesurée** (400ms), titres qui se remplissent, odomètres, étapes collantes. |
| `references/assets.md` | Avant de placer une image : sujets, cadrages, lumière dorée, grade et voile, détourage pour le mot-marque, sources, prompts IA, maquette 3D optionnelle. |
| `examples/demo.html` | Page d'exemple complète (agence fictive). |
| `source.md` | Référence, site en ligne, pages explorées (mesuré / observé) et écarts. |

## Pages couvertes

| Page | Gabarit (`layouts.md`) | Composants clés |
|---|---|---|
| Accueil | Accueil réel (13 sections) | Héros + carte conseiller, compteurs, annonces, services noirs, quartiers, étapes, témoignages, FAQ |
| À propos | Pages internes | Héros de page centré, logos clients en cases grises, cartes de chiffres à indicateur, agents |
| Services / détail | Pages internes | Lignes de service, colonne 750px |
| Biens / fiche | Pages internes | Cartes d'annonce ; encarts prix noir, visite, formulaire ; galerie 2×2 |
| Quartier, Journal, Article | Pages internes | Carte de quartier, carte d'article, colonne 800px |
| Contact, 404 | Pages internes | Formulaire gris, « 404 » géant translucide |
| Menu | — | Menu plein écran flouté 5px |

## Typographie

| Rôle | Police (Google Fonts) | Réglages |
|---|---|---|
| Mot-marque géant | **Inter** 600 (ou Inter Tight 700) | 280px mesuré, capitales, −0.04em, dégradé blanc → transparent |
| Titre du héros | **Inter** 500 | 80px desktop / 40px mobile (mesuré), capitales, interligne 1.1, −0.02em |
| Titre de page interne | Inter 600 | 100px (mesuré), capitales, −0.02em |
| Titres de section | Inter 500 | 48px (mesuré) / 32px mobile, capitales, −0.02em ; sous-titres 32, 24, 20px |
| Chiffres | Inter Tight 400 | 40–64px, −0.04em |
| Nav, surtitres « // », boutons, étiquettes | Inter 500 | 16px (mesuré), capitales, sans approche |
| Texte | Inter 400 | 14–16px / 1.55 |

## Couleurs

| Rôle | Token | Usage |
|---|---|---|
| Fond | `--white`, `--surface` | sections claires alternées |
| Encre | `--ink` | texte, bande de chiffres, pied de page, bouton plein |
| Secondaire | `--muted`, `--on-dark-muted` | méta, légendes |
| Accent | `--accent` / `--accent-2` | prix, « Lire → » |
| Verre | `--glass`, `--glass-line`, `--frame-line` | carte conseiller, cadre, favoris |
| Repli photo | `--sky-*`, `--shade`, `--stone` | fond des conteneurs avant chargement, grade doré |

## Images et 3D

Le style vit de **vraies photos d'architecture en lumière dorée** (fin de journée, ciel dégagé en haut du cadre) et de **vrais portraits** homogènes pour l'équipe et la carte conseiller. Traitement discret : grade chaud en `soft-light`, voile `--shade` sous le texte du héros, même photo floutée hors du cadre, portraits légèrement désaturés. Pour que le mot-marque passe derrière le toit, on superpose un détourage réel de la photo. La 3D est optionnelle (maquette du bien sur une fiche). Jamais de dessin CSS/SVG à la place d'une photo, d'un personnage ou d'un bâtiment : détails dans `references/assets.md`.

## Signature

**Le héros encadré avec mot-marque derrière la maison** : une fois par site, en haut de l'accueil. Le pied de page en fait l'écho (mot-marque estompé sur noir).

## À éviter

- Des ombres portées, des coins arrondis > 10px (mesuré : 4px boutons, 6px cadre, 10px cartes), des boutons pilule colorés.
- Un titre de héros en gras 700+ ou centré sur l'accueil : il est en 500, en bas à gauche (les pages internes, elles, peuvent centrer leur titre).
- Du verre dépoli partout : une carte en verre par écran, sur une photo.
- Des photos froides ou en plein jour : la lumière est dorée, rasante.
- Copier le nom, le logo ou les photos du template d'origine.

## Adaptation React / React Native

- Cadre : `View` absolue avec `borderWidth: 1`, `borderRadius: 6`, `pointerEvents="none"` ; fond = `Image` avec `blurRadius={22}`.
- Mot-marque en dégradé : `MaskedView` + `LinearGradient` (expo-linear-gradient) sur un `Text`, placé entre l'image du ciel et un PNG détouré du bâtiment.
- Verre : `BlurView` (expo-blur, `intensity` 40, `tint="light"`) ; Android ancien → fond `--glass-solid`.
- Heure locale : `Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone })`.
- Polices : `@expo-google-fonts/inter`, `@expo-google-fonts/inter-tight`.

## Avant de livrer

- [ ] Tokens importés, aucune valeur en dur.
- [ ] Cadre 1px sur photo floutée, mot-marque derrière le sujet.
- [ ] Une seule carte en verre dans le héros, avec repli opaque.
- [ ] Annonces en 2×2, bande noire, équipe 4×2 (2 colonnes en mobile).
- [ ] Testé à 375px et 1440px, aucun débordement horizontal, mouvement réduit respecté.
- [ ] Contrastes vérifiés (`python3 tools/check.py glass-frame-estate`).
- [ ] Vraies images (ou 3D) traitées selon `references/assets.md`, avec `alt` et couleur de repli.
- [ ] Aucun élément du template d'origine.
