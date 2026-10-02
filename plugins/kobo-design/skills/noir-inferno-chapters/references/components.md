# Noir Inferno Chapters — composants

## Scène peinte

Image réelle plein écran (photo ou illustration peinte, voir `assets.md`) en niveaux de gris très contrastés (`filter: grayscale(1) contrast(1.4) brightness(.85)` si la source est en couleur), recouverte de : vignettage (`--shade`), brume (2 dégradés blancs à 6–10 % qui dérivent), grain léger. `role="img"` + `aria-label` qui décrit la scène.

## Titre de chapitre

```css
.ch-title { position: absolute; left: 50%; top: 50%; translate: -50% -50%; margin: 0; font: 900 var(--text-title)/1 var(--font-title); color: var(--text); text-align: center; text-shadow: 0 0 40px var(--bg); }
```
Texte en capitales (SC), terminé par un point.

## Numéro

En bas au centre : un petit point blanc 3px, puis le chiffre en Playfair Display 32–44px. Change en fondu.

## Coins d'interface

- **Haut gauche** : nom du projet en Playfair Display SC 900 16px.
- **Haut centre** : « EN SAVOIR PLUS SUR LE PROJET. » (Josefin 10px +0.28em), ouvre un panneau.
- **Haut droite** : langues « DE · EN » + bouton son (barres).
- **Bas gauche** : icônes de réseaux, blanches, 12px.
- **Bas droite** : « À PROPOS DU GROUPE » (ou de l'auteur).

## Sommaire

Panneau noir plein écran : liste numérotée des chapitres (numéro + titre en Playfair SC 24px), l'actif en blanc, les autres en `--muted`. Ouvert par la touche « S » ou un lien « SOMMAIRE ».

## Brume et particules

```css
.haze { position: absolute; inset: -20%; background: radial-gradient(40% 30% at 30% 60%, var(--haze), transparent 70%), radial-gradient(35% 25% at 70% 40%, var(--haze), transparent 70%); animation: drift var(--drift) linear infinite alternate; pointer-events: none; }
@keyframes drift { to { transform: translate(6%, -3%); } }
```

## États

- **Chargement** : écran noir, numéro « 0 » qui clignote lentement.
- **Image manquante** : fond `--mid` + vignettage ; le titre et le numéro suffisent (pas de silhouettes dessinées).
