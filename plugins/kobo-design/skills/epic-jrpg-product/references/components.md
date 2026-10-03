# Epic JRPG Product — composants

## En-tête (barre éditeur + nav produit)

- **Barre éditeur** (`--bar-h`, noire) : à droite icône compte, langue « FR », logo éditeur encadré (emplacement). Conservée sur mobile.
- **Filet multicolore** : `--stripe-h` (3px mesuré) **sur toute la largeur**, juste sous la barre éditeur, 4 segments égaux `--stripe-1…4` (rouge, jaune, bleu, turquoise).
- **Nav produit** (`--nav-h` 70px, noire, collante) : logo du jeu à gauche, liens Montserrat **300** `--text-nav` (17px) blancs, loupe, bouton **ACHETER** or (`--buy-w` × `--cta-min` = 126×44).
- **Lien actif** : ornement « ✦ ✦ ✦ » (3 petits losanges) centré sous le mot, couleur `--gold`.

```css
.pubbar { height: var(--bar-h); display: flex; justify-content: flex-end; align-items: center; gap: var(--space-5); padding: 0 var(--space-6);
  background: var(--bg); border-bottom: var(--stripe-h) solid; border-image: linear-gradient(90deg, var(--stripe-1) 0 25%, var(--stripe-2) 25% 50%, var(--stripe-3) 50% 75%, var(--stripe-4) 75%) 1; }
.navlinks a { position: relative; display: grid; place-items: center; min-height: var(--cta-min); font: 300 var(--text-nav)/1 var(--font); color: var(--text); text-decoration: none; transition: color var(--dur-fast) var(--ease); }
.navlinks a::after { content: "✦ ✦ ✦"; position: absolute; left: 50%; bottom: -2px; transform: translateX(-50%); font-size: 7px; letter-spacing: 2px; color: var(--gold); opacity: 0; transition: opacity var(--dur-fast) var(--ease); }
.navlinks a:hover { color: var(--gold); }
.navlinks a[aria-current]::after, .navlinks a:hover::after { opacity: 1; }
```
États : repos blanc ; survol texte or + ornement ; actif (`aria-current="page"`) ornement fixe ; focus `outline` or 2px décalé de 3px.

## Menu mobile (burger)

- Déclencheur : bouton 44×44 « ☰ » (`aria-expanded`, `aria-controls`) à droite de la loupe.
- Panneau : plein écran sous la nav, fond `--bg` avec texture braises, liens en colonne 300 `--text-xl`, ornement « ✦ ✦ ✦ » sous l'actif, bouton or « Acheter » pleine largeur en bas.
- Fermeture : même bouton (devient « ✕ »), touche Échap, clic sur un lien. Le défilement du corps est bloqué tant qu'il est ouvert.
- Mouvement : fondu + descente de 8px, 300ms (estimé, non mesuré).

## Bouton or

```css
.btn-gold { display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); min-height: var(--cta-min); padding: 12px 25px;
  background: var(--gold); color: var(--on-gold); border: 0.8px solid var(--gold); border-radius: var(--radius-md);
  font: 600 var(--text-sm)/1 var(--font); letter-spacing: var(--tracking-caps); text-transform: uppercase; text-decoration: none;
  transition: color var(--dur-fast) var(--ease), background-color var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease); }
.btn-gold:hover { background: transparent; color: var(--gold); }
```
Variantes : **contour or** (fond transparent, texte or, icône cœur « Ajouter à la liste de souhaits ») ; **large** avec icône à gauche (« Dématérialisé », 50px de haut).

## Plaque de titre (signature)

```css
.plate { display: inline-block; padding: 14px 20px 14px 80px; background: var(--gold); color: var(--on-gold); font: 700 var(--text-xl)/1.3 var(--font); letter-spacing: var(--tracking); text-align: right; }
```
Elle chevauche le haut d'une image (décalage de -40px) et peut être alignée à gauche ou à droite selon le zigzag.

## Ornement losange

SVG fin blanc : un losange central plein entre deux losanges ajourés reliés par des traits. Posé centré au-dessus et au-dessous d'une vidéo (débord de 10px), ou seul sous un paragraphe (24px).

## Vidéo encadrée

Image réelle 16:9 à coins 4px (voir `assets.md`), logo du jeu en haut à gauche (emplacement), bouton lecture rond blanc 64px avec triangle contour au centre. Au clic, l'image est remplacée par la vidéo.

## Badges de plateforme

Rectangles à contour blanc 0.8px, rayon 4px, logo de la plateforme en blanc, date de sortie en 12px au-dessus si différente.

## Bandeau de notes presse

Bandeau bleu de 1000px (aplat/dégradé de marque), grille 4×2 : note « 9/10 » en 24px 700 blanc encadrée de deux traînées lumineuses, nom du média en capitales 12px dessous.

## Module d'achat

- Colonne gauche : `select` pays, `select` édition (fond transparent, contour blanc 0.8px, rayon 5px, chevron), titre « Sélectionnez la plateforme » 700 18px, **grille 2×3 de tuiles** (contour blanc, logo ; tuile active = fond or, logo bleu nuit).
- Colonne droite : visuel réel de l'édition (rayon 4px, voir `assets.md`, bouton plein écran carré noir), nom de l'édition 700 18px, bouton or large « Dématérialisé », **accordéon** « Voir le contenu de l'édition » avec « + » or et filet or dessous.

## Boutons flottants

Pile verticale en bas à droite (mesuré : cercles **60px**, `--fab`) : **blanc** (newsletter) puis **or** (achat). Sur la référence l'icône est or sur blanc et blanche sur or (1,6:1) : dans le skill, icônes **bleu nuit** `--on-gold` sur les deux. Ombre `--shadow`. Mobile : `--fab-m` 48px.

```css
.fab { position: fixed; right: 20px; bottom: calc(20px + env(safe-area-inset-bottom, 0px)); z-index: 60; display: grid; gap: 10px; }
.fab a { width: var(--fab); height: var(--fab); border-radius: 50%; display: grid; place-items: center; background: var(--paper); color: var(--on-gold); box-shadow: var(--shadow); transition: transform var(--dur-fast) var(--ease); }
.fab a:last-child { background: var(--gold); }
.fab a:hover { transform: translateY(-2px); }
```

## Configurateur d'achat (page « Acheter »)

Rôle : choisir pays → édition → plateforme, voir l'édition, puis acheter. Sur fond lave plein écran.

- **Titre** : grande icône sac au trait blanc (≈ 56px) + « Acheter » 900 `--text-2xl` (36px).
- **Colonne gauche** : libellés **centrés** 900 `--text-lg` (« Sélectionnez votre pays », « Choisir l'édition », « Sélectionnez la plateforme ») ; `select` pleine largeur `--select-h`, fond transparent, bord `--border-w` `--line`, rayon `--radius-xs`, chevron or ; grille **2 colonnes** de boutons plateforme `--tile-h` (54px ; 244px de large au bureau), bord blanc 0.8px, rayon 4px, texte 700 16px.
- **Colonne droite** : carte d'édition (voir ci-dessous).

```css
.field-label { display: block; text-align: center; font: 900 var(--text-lg)/1.2 var(--font); margin: var(--space-5) 0 var(--space-2); }
.select { width: 100%; min-height: var(--select-h); padding: 0 44px 0 var(--space-3); appearance: none; background: transparent; color: var(--text);
  border: var(--border-w) solid var(--line); border-radius: var(--radius-xs); font: 500 var(--text-base) var(--font); }
.platforms { display: grid; grid-template-columns: repeat(2, minmax(0, var(--tile-w))); justify-content: center; gap: var(--space-2); border: 0; padding: 0; margin: 0; }
.platforms input { position: absolute; opacity: 0; }
.platforms span { display: grid; place-items: center; min-height: var(--tile-h); border: var(--border-w) solid var(--line); border-radius: var(--radius-xs); font: 700 var(--text-base) var(--font); cursor: pointer; transition: background-color var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease); }
.platforms span:hover { border-color: var(--gold); }
.platforms input:checked + span { background: var(--gold); border-color: var(--gold); color: var(--on-gold); }
.platforms input:focus-visible + span { outline: 2px solid var(--gold); outline-offset: 3px; }
.platforms input:disabled + span { border-style: dashed; color: var(--muted); cursor: not-allowed; }
```
États : repos contour blanc ; survol contour or ; sélectionné fond or + texte bleu nuit ; focus contour or extérieur ; indisponible pointillés + `--muted` + mention « bientôt ».

## Carte d'édition (verre sombre)

Fond `--glass` + `backdrop-filter: blur(6px)`, bord `--glass-line`, rayon `--radius-glass` (≈ 8px), padding `--space-5`. Contenu centré : visuel 16:9 (rayon 4px, bouton agrandir carré noir), titre 700 `--text-lg` blanc, bouton or large « Dématérialisé » avec icône (min 54px), **accordéon** « Voir le contenu de l'édition » + « + » or, filet `--line-gold` dessous. Changement d'édition : fondu du visuel et du titre (200ms).

## Configuration requise

H2 900 `--text-2xl` « Configuration requise : » ; deux colonnes (« Minimum » / « Recommandée », 500 `--text-lg`) ; chacune une **boîte** à bord `--border-w` `--line`, rayon `--radius-xs`, padding `--space-4`, liste à puces `--text-md` (15px) interligne 1.6 (« Système : … », « Processeur : … »). Mobile : les boîtes s'empilent.

## Visionneuse média (page « Média »)

- Lien retour « ‹ Précédent » 500 16px blanc en haut à gauche (vers la fiche).
- Barre de navigation : flèche ← fine, compteur « 1/8 » 600 `--text-lg`, flèche → fine ; boutons 44×44, survol or, désactivés à 35 % d'opacité aux extrémités.
- Grande vidéo / image 16:9 pleine largeur du container, rayon `--radius-xs`, bouton lecture rond blanc au centre.
- Clavier : ← / → changent de média ; `aria-live="polite"` sur le compteur.

## Bas de page commun : newsletter + réseaux

Section en **deux moitiés** pleine largeur (grille 1fr 1fr, min ≈ 360px de haut) :
- **Gauche** sur texture lave : « Reste informé » 900 36px, sous-texte 500 16px, formulaire en ligne : champ e-mail blanc `--field` (texte `--ink`, rayon `--radius-xs`, 54px) + bouton or « Je m'abonne ».
- **Droite** panneau **or plein** à fines hachures (`repeating-linear-gradient` blanc 12 %) : « Nous suivre » 900 36px + « Rejoins notre communauté », rangée d'icônes réseaux rondes 44px **bleu nuit** (pictogrammes génériques, jamais les logos de marques).
- Mobile : les deux moitiés s'empilent, formulaire en colonne.

```css
.signup { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
.signup__form { display: flex; gap: var(--space-2); }
.signup input { flex: 1; min-width: 0; min-height: var(--select-h); padding: 0 var(--space-3); border: 0; border-radius: var(--radius-xs); background: var(--field); color: var(--ink); font: 500 var(--text-base) var(--font); }
.follow { background: var(--gold) repeating-linear-gradient(60deg, rgb(255 255 255 / .12) 0 1px, transparent 1px 40px); color: var(--on-gold); }
```
États du champ : focus contour or 2px ; erreur bord `--red` + message sous le champ ; succès message « Merci ! » qui remplace le formulaire.

## Héros mobile (lignes méta)

Sous le visuel : logo du jeu centré (emplacement), titre 900 capitales blanc, puis lignes méta 500 14px « **Date de sortie :** 22/05/2026 · **Genres :** RPG · **Développeur :** … » avec **libellés en or**, lien « Kit presse » souligné.

## Sous-titre de pitch

Phrase en 700 16px blanc centrée (« Libérez-vous des chaînes… »), un ornement losange dessous, puis des paragraphes 500 16px/24px.

## États

- **Chargement** : 4 points qui tournent (keyframes `dot-move`, `dot-rotate` mesurées), couleur or.
- **Désactivé / indisponible** : tuile plateforme en pointillés, texte `--muted`, `aria-disabled`.
- **Erreur** : plaque rouge `--red` avec texte blanc, bouton contour or « Réessayer ».
