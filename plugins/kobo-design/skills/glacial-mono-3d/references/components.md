# Glacial Mono 3D — composants

## Chargeur ASCII

Fond `--loader`, au centre une chaîne de 10 caractères parmi `- = +` qui change toutes les 80ms (comme une barre de progression bruitée), blanche, 13px. Quand le chargement est fini, la chaîne se remplit de `=` puis disparaît en fondu.

```js
const glyphs = '-=+'; const el = document.querySelector('.loader__ascii');
const tick = setInterval(() => { el.textContent = Array.from({ length: 10 }, () => glyphs[Math.random() * 3 | 0]).join(''); }, 80);
```

## Crochets de coin (signature)

```css
.bracket { position: relative; display: inline-flex; align-items: center; min-height: 44px; padding: 6px 14px; background: none; border: 0; color: inherit; font: 500 var(--text-xs) var(--font-mono); cursor: pointer; }
.bracket::before, .bracket::after { content: ""; position: absolute; width: var(--bracket); height: var(--bracket); border: var(--bracket-w) solid currentColor; transition: transform var(--dur-fast) var(--ease); }
.bracket::before { left: 0; top: 0; border-right: 0; border-bottom: 0; }
.bracket::after { right: 0; bottom: 0; border-left: 0; border-top: 0; }
.bracket:hover::before { transform: translate(3px, 3px); } .bracket:hover::after { transform: translate(-3px, -3px); }
```
(Pour 4 coins, ajouter un `<span>` interne qui porte les deux autres coins.)

## Texte brouillé

Chaque texte qui apparaît passe par 6 à 10 étapes de caractères aléatoires (`A-Z0-9/\\_<>`) avant d'afficher la vraie lettre, de gauche à droite, pas de `--scramble`. L'attribut `aria-label` porte le vrai texte dès le départ.

## Barre d'interface

- **Haut gauche** : logotype (Unbounded 24px blanc avec halo `text-shadow: 0 0 12px var(--glow)`), et dessous deux lignes mono 10px (`// Copyright © 2026`, `Studio. Tous droits réservés.`).
- **Haut droite** : rubrique courante (`////// Manifeste`) + 4 lignes de texte 10px alignées à droite, colonne de 180px.
- **Bas gauche** : `Défiler pour découvrir` + bouton son `◖ Son : activé`.
- **Bas centre** (chapitres à carrousel) : `‹— Précédent   ⌜ X / Réseau ⌟   Suivant —›`.

## Panneau de contenu

Overlay sur scène sombre floutée : colonne 360px centrée, sections préfixées `////// Résumé`, `/// Découvrir`, `/// Visiter`, texte 11–13px, liens entre crochets droits `[X] ↗ [IG] ↗`. Bouton `⌜ Fermer ⌟` en haut à droite.

## Socle 3D

Un disque métallique en anneaux concentriques (vrai objet 3D : cylindres `MeshPhysicalMaterial` métal, voir `assets.md`) sur lequel flotte l'objet du chapitre (logo en particules `THREE.Points`, objet `.glb`). Flèches fines `<——` `——>` de part et d'autre.

## Neige / particules

Points blancs flous qui tombent lentement (canvas 2D ou `radial-gradient` animé), densité faible, désactivés si mouvement réduit.

## États

- **Pas de WebGL** : photo réelle N&B de la scène en fond (`data-slot`, voir `assets.md`), interface inchangée.
- **Son coupé** par défaut ; le bouton change de libellé sans popup.
