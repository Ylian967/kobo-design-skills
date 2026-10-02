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

Plus de glitch ni de tracé : les éléments apparaissent directement. Le loader passe à un simple compteur sans remplissage animé.
