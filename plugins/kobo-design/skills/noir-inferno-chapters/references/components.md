# Noir Inferno Chapters — composants

## Scène peinte

Image réelle plein écran (photo ou illustration peinte, voir `assets.md`) en niveaux de gris très contrastés (`filter: grayscale(1) contrast(1.4) brightness(.85)` si la source est en couleur), recouverte de : vignettage (`--shade`), brume (2 dégradés blancs à 6–10 % qui dérivent), grain léger. `role="img"` + `aria-label` qui décrit la scène.

## Titre de chapitre

```css
.ch-title { position: absolute; left: 50%; top: 50%; translate: -50% -50%; margin: 0; font: 400 var(--text-title)/1 var(--font-title); color: var(--text); text-align: center; text-shadow: 0 0 40px var(--bg); }
```
Texte en capitales (SC), terminé par un point.

## Numéro

En bas au centre : un petit point blanc 3px, puis le chiffre en Playfair Display 32–44px. Change en fondu.

## Coins d'interface

- **Haut gauche** : nom du projet en Playfair Display SC 400 16px.
- **Haut centre** : « EN SAVOIR PLUS SUR LE PROJET. » (Josefin 10px +0.2em, mesuré : 10px capitales, approche 1–2px), ouvre un panneau.
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

---

# Relevés sur le site en ligne (2026-10-03)

Le site est toujours en ligne à une **nouvelle adresse** (voir `source.md`) ; ouvert dans le navigateur intégré (612px), interface HTML mesurée, scènes en canvas (3 canvas).

## Cercle de navigation (signature, mesuré)

On n'avance pas en défilant : on **attrape un cercle et on le tire vers une cible**.
- Cercle principal : 52px, contour **0.8px** blanc, vide.
- Halo « pulsation » : 149px, contour 0.8px blanc, qui grandit et s'efface en boucle autour du cercle.
- Ligne **pointillée** verticale (points de 1px) qui mène à la **cible** : cercle 65px en **tirets** blancs, plus bas.
- Consigne sous l'ensemble : « Cliquez et tirez le cercle pour naviguer », 10px capitales +1.4px, blanc, 2 lignes centrées.
Accessible : le cercle est un bouton (Entrée / flèche bas = scène suivante), la consigne est son libellé.

```css
.drag-dot { width: 52px; aspect-ratio: 1; border: .8px solid var(--text); border-radius: 50%; background: none; cursor: grab; touch-action: none; }
.drag-dot::after { content: ""; position: absolute; inset: -48px; border: .8px solid var(--text); border-radius: 50%; animation: pulse 2.4s var(--ease) infinite; }
.drag-line { width: 1px; height: 120px; background: repeating-linear-gradient(var(--text) 0 1px, transparent 1px 5px); }
.drag-target { width: 65px; aspect-ratio: 1; border: 1px dashed var(--text); border-radius: 50%; }
@keyframes pulse { from { transform: scale(.35); opacity: 1; } to { transform: scale(1); opacity: 0; } }
```

## Citation d'accueil (mesuré)

Sur fond noir à grain et étoiles éparses : une phrase de 3 lignes centrée en **serif romaine 20px capitales +0.6px** blanche, au-dessus du cercle.

## Texte de scène (observé)

Sous le titre de chapitre (serif capitales blanches ~48px, centré, qui **déborde** volontairement en écran étroit), un paragraphe de 2–3 lignes en sans-serif ~13px blanc, casse normale, centré ; un petit cercle 20px en dessous rappelle le geste. Croix fine « × » en haut au centre pour fermer la scène.

## Panneau « à propos » (mesuré)

Panneau **blanc** (inversion) : texte 12px/20px noir +0.24px, rôles du générique en 10px capitales (« Agence : », « Illustration : »…), lien d'abonnement et « Retour au début » en 10px capitales noires.

## Fin (mesuré)

Dernière scène : consigne « Cliquez et tirez la main vers le bas », et un appel en serif condensée **30px gris #5a5a5a** (« Sortez-moi d'ici ! »). Conseil d'écoute : « utilisez un casque pour la meilleure expérience » en 10px capitales.

## Langues (mesuré)

« DE / EN » en 10px capitales +2px ; la langue inactive à **opacité 0.5**.
