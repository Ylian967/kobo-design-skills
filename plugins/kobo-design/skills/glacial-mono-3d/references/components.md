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

---

# Relevés sur le site en ligne (2026-10-03)

La scène s'est cette fois chargée (navigateur intégré, ~612px de large). **Tout, y compris le texte, est dessiné dans le WebGL** : le document ne contient qu'un `div` vide, aucune police ni aucun style n'est lisible par script. Ce qui suit est **observé** (≈).

## Interface aux quatre coins (relevée)

- Haut gauche : logotype arrondi blanc, puis « // Copyright © année » et le nom de la société sur 2 lignes, mono ~11px blanc.
- Haut droite : « ////// Manifeste » puis la phrase de mission en mono, **justifiée à droite** sur 5 lignes.
- Bas gauche : « Défiler pour découvrir. » sur 2 lignes ; tout en bas, icône haut-parleur barrée + « Son : Non ».
- Ces blocs disparaissent (brouillage) dès qu'on quitte l'écran d'accueil ; seuls le logo et « Son » restent.

## Étiquettes de données sur l'objet

Sur l'igloo de l'accueil, des **nombres** (« 12 », « 21 », « 29 »…) reliés par des **segments fins blancs** forment une constellation posée sur les blocs, comme une mesure technique de l'objet. Les nombres changent quand la caméra bouge.

## Étiquette de portfolio (fiche d'objet)

Pour chaque projet, un **bloc de glace** flottant, le logo du projet pris dans la glace ; à côté, une étiquette mono en capitales reliée par un trait de rappel : « PORTFOLIO_CO_01 / NOM » ou « D 06.01.2023 / CLIQUER POUR EXPLORER » soulignée d'un filet. Des **faisceaux de traits fins** (comme des éclats de verre) partent de l'objet. Le logo du site lui-même se brouille brièvement (lettres remplacées) pendant les transitions.

## Anneaux qui s'assemblent

Grands segments d'anneau en pierre/glace sculptée qui **convergent** et s'emboîtent pour former le symbole de la marque, avec une lumière bleu-blanc qui naît au centre et un réseau de lignes et points (plexus) en surimpression ; puis l'ensemble se dissout en **flou radial** (tunnel) pour passer à la scène suivante.

## Socle et sculpture de particules (fin de page)

Un **socle rond** lumineux (anneau de lumière sur son bord, disque gravé) porte une **sculpture en nuage de points** sombres qui change de forme ; en bas, un **carrousel de liens** : libellé central entre **crochets de coin** (« [ Réseau ] »), libellés voisins estompés, et deux flèches en traits fins de part et d'autre de l'objet (← →).
