# Anime X Slash — mouvement

## Principes

Mesuré : la majorité des transitions sont `all 0.4s ease` et `all 0.3s ease`, les entrées marquantes en `0.5s cubic-bezier(0.47, 0.53, 0.18, 1)`, quelques révélations en `1s ease`. Animations nommées dans la feuille de style : `strokeAnim` (tracé de contour, 3s linéaire), `widthup` (barre qui s'élargit), `glitch-effect`, `fadeIn`, `rotate`. Le caractère : net, rapide, avec un **glitch** ponctuel.

## Catalogue

| Moment | Effet | Durée | Courbe |
|---|---|---|---|
| Chargement | Logo qui se remplit de bas en haut + compteur % | selon le chargement | linéaire |
| Sortie du loader | Fondu au noir puis apparition du héros | 500ms | `--ease` |
| Filets diagonaux du fond | Tracé (`stroke-dashoffset`) à l'apparition | 3s | linéaire |
| Titres de section | Barre rouge qui balaie puis révèle le mot (`widthup`) | 500ms | `--ease-snap` |
| Texte d'intro | Montée de 20px + fondu, ligne par ligne, décalage 80ms | 400ms | `--ease` |
| Survol actualité | Titre +8px, chevron rouge | 300ms | `--ease` |
| Survol carte de classement | Zoom 1.05 du visuel, liseré couleur personnage | 500ms | `--ease-snap` |
| Logo / titre héros | Glitch : 3 décalages horizontaux de 4px avec tranches RGB, une seule fois | 400ms | steps(3) |
| Ouverture du menu | Panneau noir qui glisse depuis la gauche | 400ms | `--ease-snap` |

## Pages internes (observé le 2026-10-02)

Durées : mesurées quand la feuille de style les donne (0.3s onglets, 0.4s / 0.5s), sinon **estimées à l'œil** et marquées (≈).

| Moment | Effet | Durée | Courbe |
|---|---|---|---|
| Chargement (détail) | Logo #333 qui se remplit de blanc + **trait du X qui se dessine** (`strokeAnim`) + pourcentage qui monte | selon le chargement (tracé 3s mesuré) | linéaire |
| Intro après chargement | **Bande rouge diagonale** à `--slant` qui traverse l'écran avec un texte défilant, découvrant le logo | ≈ 800ms (estimé) | `--ease-snap` |
| Ouverture du menu plein écran | Overlay en fondu + illustration N&B qui se décale de 20px ; liens qui montent de 16px en cascade (40ms) | ≈ 400ms (estimé, cohérent avec `all 0.4s`) | `--ease-snap` |
| Bouton MENU → CLOSE | Fond noir → rouge, traits → croix | 400ms | `--ease` |
| Survol lien du menu | Blanc → rouge | 300ms | `--ease` |
| Onglets rectangulaires | Fond transparent → noir | 300ms (mesuré) | `--ease` |
| Filtres / onglets à encoche | Fond rouge + encoche qui descend de 4px | 300ms | `--ease` |
| Changement de fiche personnage | Nom en `widthup`, illustration glisse de 40px depuis la droite + fondu, éclats qui tournent de 8° | ≈ 500ms (estimé) | `--ease-snap` |
| Grille sous la fiche | Cartes inactives passent en N&B | 400ms | `--ease` |
| Accordéon | Bouton + blanc → − rouge ; panneau en hauteur (`grid-template-rows: 0fr → 1fr`) | ≈ 400ms (estimé) | `--ease` |
| Sélecteur d'épisodes | Case → fond rouge ; bloc épisode en fondu croisé | 300ms | `--ease` |
| Survol carte vidéo | Image zoom 1.05, ▶ rouge | 500ms | `--ease-snap` |

```css
/* Menu : cascade des liens */
.menu.is-open .menu__links li { animation: rise var(--dur-base) var(--ease-snap) both; animation-delay: calc(var(--i) * 40ms); }
@keyframes rise { from { transform: translateY(16px); opacity: 0; } }
/* Accordéon sans JS de hauteur */
.acc__wrap { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--dur-base) var(--ease); }
.acc__wrap.is-open { grid-template-rows: 1fr; } .acc__wrap > * { overflow: hidden; }
/* Bande d'intro */
@keyframes slash-in { from { transform: translateX(-120%) rotate(calc(var(--slant) * -1)); } to { transform: translateX(120%) rotate(calc(var(--slant) * -1)); } }
```

## Code de référence

```css
@keyframes widthup { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
.section-title { animation: widthup var(--dur-slow) var(--ease-snap) both; }

@keyframes glitch {
  0% { transform: translateX(0); text-shadow: none; }
  33% { transform: translateX(-4px); text-shadow: 4px 0 var(--accent), -4px 0 var(--chara-8); }
  66% { transform: translateX(4px); text-shadow: -4px 0 var(--accent), 4px 0 var(--chara-8); }
  100% { transform: translateX(0); text-shadow: none; }
}
.glitch-once { animation: glitch var(--dur-base) steps(3) 1; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 1ms !important; animation-iteration-count: 1 !important; transition-duration: 1ms !important; }
}
```

Déclencher les révélations au défilement avec `IntersectionObserver` (seuil 0.2), en partant d'un état **visible** par défaut : la classe d'animation est ajoutée par le script, jamais d'`opacity: 0` en CSS seul.

## Mouvement réduit

Plus de glitch ni de tracé : les éléments apparaissent directement. Menu, accordéon et fiche changent d'état sans cascade ni glissement ; la bande rouge d'intro est supprimée. Le loader passe à un simple compteur sans remplissage animé.
