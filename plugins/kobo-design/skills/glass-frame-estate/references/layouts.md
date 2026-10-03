# Glass Frame Estate — mises en page

Conteneur `--container` (1200px mesuré), marges `--gutter`, sections `--section-y` (140px mesuré) en vertical. Points de rupture mesurés : **1200px** et **768px**.

## Accueil

```
┌──────────────── photo floutée ────────────────┐
│ ┌──────────── cadre 1px, rayon 6 ───────────┐ │
│ │ ✕ MARQUE          10:30     PARIS · MENU ⠿│ │
│ │        M A R Q U E  (blanc → transparent) │ │
│ │                 /\                        │ │
│ │   colline      /██\  maison    🌲          │ │
│ │ PROPRIÉTÉS                ┌─ verre ─────┐ │ │
│ │ D'EXCEPTION               │ ▣ conseiller│ │ │
│ │ [EN SAVOIR PLUS →]        │ [APPELER →] │ │ │
│ └───────────────────────────└─────────────┘─┘ │
└───────────────────────────────────────────────┘
 01 — SÉLECTION                  (TOUS)(MAISONS)…
 BIENS À LA UNE
 [photo 16:10]          [photo 16:10]
 titre ........ prix    titre ........ prix
 [photo]                [photo]
█████████████ bande noire █████████████████████████
 1 200+     48 h     96 %     14
 logo   logo   logo   logo   logo
████████████████████████████████████████████████████
 02 — L'ÉQUIPE / NOS CONSEILLERS      [NOUS REJOINDRE →]
 [▯][▯][▯][▯]
 [▯][▯][▯][▯]
░░ surface ░░ 03 — JOURNAL : 3 cartes ░░ lettre d'info ░░
█ pied noir : colonnes + M A R Q U E estompé █
```

## Héros

- Hauteur `100svh`, bornée 640–960px ; marge `--frame-inset` autour du cadre.
- Plans dans la photo réelle (voir `assets.md`) : ciel → mot-marque (haut, 12 %) → sujet (détourage optionnel) → voile.
- Titre à `--space-8` du bas et de la gauche ; carte verre à `--space-8` du bas et de la droite. Les deux reposent sur le voile.

## Catalogue

Grille 2 colonnes, `gap: 48px 32px`. En-tête de section : surtitre numéroté (« 01 — Sélection ») + titre en capitales à gauche, filtres ou bouton contour à droite (`flex-wrap`).

## Bande noire

Pleine largeur, 4 colonnes de chiffres puis logos, sans titre (étiquette `aria-label`).

## Équipe

4 colonnes × 2 rangées, portraits 4:5.

## Journal + lettre d'info

Section `--surface` : 3 cartes, puis bloc 2 colonnes séparé par un filet (titre à gauche, champ à droite, alignés en bas).

## Mobile (390px)

- Cadre à 12px du bord ; barre : logo + « MENU » ⠿.
- Mot-marque à ~80px, à 16 % ; photo du héros en recadrage portrait (`<picture>`, voir `assets.md`).
- Carte verre pleine largeur collée en bas du cadre ; titre et bouton juste au-dessus (accroche masquée).
- Annonces, articles : 1 colonne. Équipe et chiffres : 2 colonnes. Lettre d'info et pied : 1 colonne.
- Toujours `min-width: 0` sur les enfants de grille qui contiennent un champ.

---

## Accueil réel (mesuré sur le site, 1536px, ~15 900px de haut)

1. **Héros** plein écran (photo pleine page ; sur le shot Dribbble il est présenté dans un cadre — garder le cadre comme signature, mais il est aussi juste de le retirer sur mobile).
2. **À propos** : 2 colonnes — à gauche surtitre « // », titre 48px, texte, 3 compteurs odomètre, bouton noir + adresse en 16px capitales ; à droite photo 480px rayon 10px. Puis **règle graduée**.
3. **Biens à la une** : en-tête centré (surtitre + titre 48px sur 2 lignes), grille 2×2 de cartes d'annonce, gouttière 40px.
4. **Services** : section **noire**, titre 48px à droite de l'en-tête, 4 lignes de service.
5. **Quartiers** : en-tête à gauche + bouton transparent « Plus de quartiers → » à droite, 4 cartes grises.
6. **Étapes** : en-tête centré, pile d'étapes collantes dans un panneau noir. Règle graduée.
7. **Témoignages** : en-tête à gauche, mosaïque 3×2.
8. **Agents** : section `--surface`, en-tête centré, grille 3×2 de portraits.
9. **Contact** : 2 colonnes (titre + coordonnées / formulaire gris). Règle graduée.
10. **Journal** : en-tête centré, 3 cartes d'article.
11. **FAQ** : 2 colonnes (titre + carte agent / accordéon).
12. **Appel final** : bandeau photo assombri, titre 48px blanc, bouton gris « Explorer les biens → ».
13. **Pied** noir : phrase + liens sociaux textuels, 3 colonnes de liens (titres 16px 500 blancs, liens 32px 500 pour les services), mentions, puis **mot-marque géant** en bas.

Les titres de section apparaissent d'abord en **gris clair** et se « remplissent » en noir au défilement (voir `motion.md`).

## Pages internes (toutes : héros 700px + titre 100px)

| Page | Contenu sous le héros |
|---|---|
| À propos | Bande « Nos clients » : 8 logos dans des cases grises 4×2 (rayon 10px) ; « // Qui nous sommes » à gauche + grande phrase 32px à droite ; 4 cartes de chiffres à indicateur de carrés ; grande photo 1200px rayon 10px ; agents ; témoignages (grille 380px, 2 rangées). |
| Services | Liste de 6 lignes de service sur blanc (1200px). |
| Détail d'un service | Colonne de 750px : titre 40px, texte, puis 9 blocs (sous-titre 32px + paragraphe) ; colonne latérale à droite (≈ liste des autres services + contact). |
| Biens | Grille 2 colonnes de cartes d'annonce (≈ 2 730px pour 8 biens). |
| Fiche d'un bien | Titre aligné à gauche dans le héros. 2 colonnes : contenu 650px (description, caractéristiques, équipements, galerie 2×2, carte) / encarts 460px (prix noir, visite, formulaire). Gap 60px entre blocs. |
| Quartier | Héros au nom du quartier, puis les biens de ce quartier en cartes d'annonce. |
| Journal | 3 colonnes de cartes d'article (≈ 1 400px). |
| Article | Colonne de 800px centrée : catégorie, titre 48px, paragraphes 16px/1.6, intertitres 32px. |
| Contact | Héros « Prenez contact », bloc contact 2 colonnes (e-mails, téléphone, adresse, horaires + formulaire), puis carte. |
| 404 | Héros seul : « 404 » géant translucide centré + message. |

## Mobile observé (612px, Framer ≤ 767px)

Titre du héros **40px**, titres de section **32px**, nom de bien **16px** ; cartes d'annonce en **1 colonne**, photo pleine largeur rayon 10px, étiquettes conservées ; cases de caractéristiques sur une ligne. Mot-marque géant conservé à 280px (il déborde volontairement et se coupe).
