# Sticker Brutal JP — mises en page

Structures déduites des captures du shot (valeurs estimées), réécrites comme patrons réutilisables.

## Grille et conteneur

- Page `--bg` ; une **scène** centrée de `--container` (1240px) + marges `--frame-gap` (12 → 48px) qui laisse la place aux autocollants.
- À l'intérieur, un **cadre** `--paper` : contour 3px, rayon 24px, ombre `--shadow-hard-lg`, `overflow: hidden`.
- Padding interne : 32px desktop, 16px mobile. Grilles : héros 1.08fr / 0.92fr, cartes 4 colonnes (2 sous 900px, 1 sous 640px), gouttière 24px.
- Points de rupture : 900px (héros empilé), 640px (navigation repliée, cartes en colonne).

```
 pêche ─────────────────────────────────────────────── ★ ■
 ◖ ┌─ ● ● ●  [ adresse ] ─────────────────────────────┐
   │ (● LOGO)  ホーム サービス 実績 お問い合わせ (●日本語)│
   │                                                    │
   │ (こんにちは…)            ブ ┌──────╱╲──────┐       │
   │ LOUD                     ラ │  portrait   │ (◉)   │
   │ [BRAND]                  ン │   N&B sur   │       │
   │ DESIGN                   ド │    rose     │ [▤]   │
   │ 売れるブランドを、          (✓ 受付中) ╲╱           │
   │ corps 3 lignes                                     │
   │ [ 無料で相談する → ] [ 実績を見る ]                │
   │ ════ BRANDING ✦ UI DESIGN ✦ ロゴ制作 ✦ … ═════════ │
   │              (SERVICES)  できること                 │
   │  [▣ carte] [▣ carte] [▣ carte] [▣ carte]           │
   │  chiffres inclinés      puces de sujets            │
   │  ┌──── bloc contact jaune ───────────────(●)┐     │
   │  └──────────────────────────────────────────┘     │
   │ © …                              liens            │
 ◗ └────────────────────────────────────────────────────┘ ◗
```

## En-tête / navigation

- Barre « navigateur » blanche (trois ronds rose / jaune / vert contourés + pilule d'adresse), séparée par un filet 3px. Décorative (`aria-hidden`).
- Navigation statique (pas collante) dans le cadre : logo pilule à gauche, liens centrés, sélecteur de langue rose à droite.

## Héros

- Gauche : salutation en pilule inclinée (-2°), titre latin sur 3 lignes avec **un mot surligné** par un autocollant pervenche incliné derrière, sous-titre japonais 900 sur 2 lignes, corps 3 lignes max (34em), deux boutons.
- Droite : composition carrée — hexagone avec portrait photo réel (88 % de la zone, voir `assets.md`), katakana vertical qui dépasse à droite, 4 autocollants aux coins (bulle en haut à gauche, pastille œil à gauche, tuile graphique en bas à droite, pastille verte en bas à gauche).
- Padding vertical : 32px haut, 64px bas.

## Sections types

### Bande défilante
Pleine largeur du cadre (déborde de 2 % de chaque côté), inclinée, entre le héros et la première section.

### Services
En-tête centré (kicker + titre japonais 900 + phrase), 4 cartes. Padding 96px haut, 64px bas.

### Preuves
Deux colonnes : 3 chiffres en tuiles colorées inclinées (-2°, +1.5°, -1°) ; puces de sujets à sélectionner.

### Contact
Bloc jaune pleine largeur du cadre (marges 32px), titre + phrase à gauche, champ + bouton à droite.

## Site complet : trois pages (proposé)

Le shot ne montre **qu'une page** ; les gabarits Projets et Contact ci-dessous sont **proposés** pour un site de freelance bilingue (voir `source.md`). Ils réutilisent le même cadre, la même navigation (lien courant en pilule noire `aria-current="page"`), le même sélecteur de langue et le même pied de page.

| Page | Fichier | Zone jaune dominante | Katakana vertical | Autocollants autour du cadre |
|---|---|---|---|---|
| Accueil | `examples/demo.html` | bouton du héros puis bloc contact | ブランド (héros) | 4–5 |
| Projets | `examples/projets.html` | bandeau d'appel en bas | ワークス (en-tête) | 4 (demi-cercle, carré, goutte, étoile) |
| Contact | `examples/contact.html` | bouton « 送信する » | ハロー (en-tête) | 4 |

Liens croisés : boutons du héros → Contact / Projets, cartes de service → `projets.html#branding|web|sns` (filtre pré-sélectionné), bandeau Projets → Contact, panneau de succès Contact → Projets.

### En-tête de page intérieure

Pas de héros à portrait (une seule signature par site, sur l'accueil). Grille `1fr auto` : kicker, titre latin 2 mots dont un surligné, sous-titre japonais 900, phrase `--muted` (36em max) ; katakana vertical à droite. Padding 48px haut, 32px bas.

### Gabarit Projets

```
 ┌─ ● ● ●  [ …/ja/works ] ────────────────────────────┐
 │ (● LOGO)  ホーム サービス [実績] お問い合わせ (●日本語)│
 │ (WORKS · 2023—2025)                             ワ │
 │ SELECTED [WORKS]                                ー │
 │ 一緒につくったもの。                              ク │
 │ phrase                                          ス │
 │ [すべて 9] (ブランディング 4) (ウェブ 3) …   9 件の作品 │
 │ ╭étiquette                                         │
 │ [▣ carte] [▣ carte] [▣ carte]   ← 3 colonnes       │
 │ [▣ carte] [▣ carte] [▣ carte]                      │
 │ [▣ carte] [▣ carte] [▣ carte]                      │
 │ ┌── bandeau jaune : 次の作品、一緒に… [相談してみる →] ┐│
 │ © …                                         liens  │
 └────────────────────────────────────────────────────┘
        clic sur une carte → fiche projet (<dialog>) 2 colonnes
```

- Barre d'outils : filtres à gauche (`flex-wrap`), compteur à droite ; padding latéral 32px.
- Grille `repeat(3, 1fr)`, gouttière 32px vertical / 24px horizontal (les étiquettes à cheval ont besoin de l'air vertical).
- État vide (filtre sans résultat) : cadre `--paper` à contour pointillé + pastille katakana « マダ！ » (`--mint`, inclinée) + phrase + bouton « すべての作品を見る ».
- Fiche : modale centrée 920px max, 2 colonnes `minmax(0, 1.1fr) minmax(0, 0.9fr)`.

### Gabarit Contact

```
 ┌─ ● ● ●  [ …/ja/contact ] ──────────────────────────┐
 │ (● LOGO)  ホーム サービス 実績 [お問い合わせ] (●日本語)│
 │ (CONTACT)                                       ハ │
 │ SAY [HELLO]                                     ロ │
 │ ご相談はこちらから。                              ー │
 │ ┌── formulaire (carte blanche) ──┐ ┌ profil pervenche ┐│
 │ │ お名前* │ 会社名                 │ └──────(✓受付中)──┘│
 │ │ メール*                          │ [✉ mail]          │
 │ │ (ロゴ)(ウェブ)(…)  ← cases       │ [◷ délai]         │
 │ │ (〜30万)(30〜80万)… ← budget     │ [✦ langues]       │
 │ │ 時期 [select ▾]                 │ ┌┄ étapes 1·2·3 ┄┐ │
 │ │ ご相談内容 [textarea]   0 / 800 │ └┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┘ │
 │ │ ☐ 同意   [送信する →]           │                   │
 │ └─────────────────────────────────┘                   │
 │                (FAQ) よくある質問                       │
 │        [Q1 ……………………………… (+)]  ← 860px max, centré  │
 │        [Q2 ……………………………… (+)]                       │
 │ © …                                         liens  │
 └────────────────────────────────────────────────────┘
```

- Grille `1.4fr 0.85fr`, gouttière 32px, `align-items: start` ; formulaire en carte `--card` contour 3px, rayon 24px, ombre 8px, padding 32px.
- Nom / société sur deux colonnes (`.row2`), le reste en pleine largeur ; 24px entre champs.
- Après envoi réussi, le formulaire est remplacé **dans la même carte** par le panneau de succès (pas de nouvelle page).

## Pied de page

Bande blanche à filet supérieur 3px, Noto Sans JP 700 14px : mention à gauche, liens (ホーム, 実績, お問い合わせ, réseau) à droite — identique sur les trois pages.

## Adaptation mobile

- Sous 640px : cadre à 12px des bords, barre d'adresse masquée, liens remplacés par un bouton menu 44px, libellé de langue réduit à « JA ».
- Héros empilé : texte puis visuel (max 420px, centré) ; titre à `clamp(2.6rem, 13vw, 3.6rem)` ; boutons pleine largeur.
- Autocollants flottants réduits (56px) ; ceux qui débordent sont coupés par `overflow-x: clip` sur `html` et `body` — vérifier `scrollWidth = 390`.
- Cartes en une colonne ; chiffres restent sur 3 colonnes serrées ; champ et bouton pleine largeur.

### Mobile — pages Projets et Contact (390px)

- En-tête intérieur : titre `clamp(2.6rem, 13vw, 3.4rem)`, katakana réduit à 2.4rem et **posé en absolu** en haut à droite (il ne pousse pas le titre) ; padding 32px / 16px.
- Projets : filtres en pilules qui passent à la ligne (gap 8px, jamais de défilement horizontal caché) ; grille 2 colonnes sous 900px, **1 colonne** sous 640px ; bandeau jaune empilé, bouton pleine largeur. Fiche projet : une colonne (photo au-dessus, filet 3px dessous), défile dans `max-height: calc(100dvh - 32px)`, boutons 前へ / 次へ côte à côte.
- Contact : formulaire puis colonne d'infos (une colonne sous 900px) ; nom / société empilés ; carte formulaire padding 24px / 16px ; bouton « 送信する » pleine largeur ; carte profil avec portrait 72px ; FAQ avec pastilles Q et « + » à 36px, réponse sans retrait.
- Autocollants autour du cadre réduits (44–56px) ; vérifier `scrollWidth = 390` sur chaque page.
