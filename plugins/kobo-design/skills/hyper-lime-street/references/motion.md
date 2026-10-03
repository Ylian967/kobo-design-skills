# Hyper Lime Street — mouvement

## Principes

Une seule courbe pour presque tout : **easeOutCubic** `cubic-bezier(0.215, 0.61, 0.355, 1)`, mesurée sur ~250 éléments, à 300 / 400 / 500 / 600ms selon la taille de l'élément. Animations nommées : `wordsLoop` (défilant 20s linéaire), `heartbeat` (0.8s, bouton musique), `tada` (attention), `rotation` (disque musique).

## Catalogue

| Moment | Effet | Durée | Courbe |
|---|---|---|---|
| Entrée d'une section | Le ruban glisse de 80px sur l'axe de sa diagonale, le bloc lime suit 100ms après | 600ms | `--ease` |
| Numéro de section | Monte de 30px + fondu | 500ms | `--ease` |
| Changement de vignette | Vignette active : contour lime + scale 1.06 ; image principale en fondu croisé | 400ms | `--ease` |
| Survol pilule | Passe en lime, texte noir | 300ms | `--ease` |
| Défilant | Translation continue | 20s | linéaire |
| Bouton musique | Disque qui tourne + battement | 0.8s / 6s | ease / linéaire |
| Pagination latérale | Le numéro roule vers le haut | 300ms | `--ease` |


### Pages internes (observées le 2026-10-02 ; durées **estimées**, non mesurées par script, sauf mention)

| Moment | Effet | Durée | Courbe |
|---|---|---|---|
| Chargement d'une page interne | La bande rayée entre en glissant le long de sa diagonale, puis le badge se déplie depuis la gauche (`clip-path` inset 100 % → 0), le numéro monte de 30px | 600ms + 500ms (décalé 150ms) | `--ease` |
| Filigrane | Fondu + glissement de 60px vers la gauche, une fois | 800ms | `--ease` |
| Changement d'onglet | Le parallélogramme blanc se déplie (`scaleX` 0 → 1) sous le nouvel onglet ; la grille passe en fondu (sortie 150ms, entrée 300ms avec montée de 12px, cartes décalées de 40ms) | 400ms | `--ease` |
| Carrousel bannière | Glissement horizontal d'une carte, point actif qui grossit | 500ms | `--ease` |
| Survol carte d'actu | Image `scale(1.05)` | 500ms | `--ease` |
| Coverflow Univers | Les cartes changent de position (translation + scale + luminosité) ; le fond flouté fait un fondu croisé | 600ms / 800ms | `--ease` |
| Interrupteur JP/EN | Le segment lime glisse d'un côté à l'autre | 300ms | `--ease` (mesuré : courbe dominante du site) |
| Onglet latéral « Retour » | Survol : fond lime, flèche monte de 4px | 300ms | `--ease` |
| Bouton newsletter | `all 0.2s linear` | 200ms | linéaire (mesuré sur l'accueil) |

## Code de référence

```css
.marquee { overflow: hidden; white-space: nowrap; }
.marquee > span { display: inline-block; padding-right: 2em; animation: wordsLoop var(--marquee) linear infinite; }
.marquee:hover > span { animation-play-state: paused; }
@keyframes wordsLoop { to { transform: translateX(-100%); } }
.reveal-in { animation: slideIn var(--dur-4) var(--ease) both; }
@keyframes slideIn { from { transform: translate(-80px, 80px); opacity: 0; } }
/* Pages internes : dépliage du badge, onglet en parallélogramme */
.badge { animation: badgeIn var(--dur-4) var(--ease) 150ms both; }
@keyframes badgeIn { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
.page-head__band { animation: bandIn var(--dur-4) var(--ease) both; }
@keyframes bandIn { from { translate: -30% 0; opacity: 0; } }
.grid.is-leaving { opacity: 0; transition: opacity 150ms linear; }
.grid.is-entering > * { animation: cardUp var(--dur-1) var(--ease) both; animation-delay: calc(var(--i, 0) * 40ms); }
@keyframes cardUp { from { opacity: 0; transform: translateY(12px); } }
@media (prefers-reduced-motion: reduce) { .marquee > span, .reveal-in, .badge, .page-head__band, .grid.is-entering > * { animation: none; } }
```

## Mouvement réduit

Rubans, badge et bande affichés directement ; changement d'onglet et coverflow sans glissement (contenu remplacé, fondu de 150ms au plus) ; carrousel bannière sans défilement automatique ; défilant figé (texte tronqué avec « … ») ; pas de disque qui tourne.
