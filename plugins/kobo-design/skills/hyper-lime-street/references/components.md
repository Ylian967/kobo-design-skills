# Hyper Lime Street — composants

## Barre de navigation (fixe, 60px, noire)

Logo à gauche (emplacement). Liens en Inter 700 12–14px gris `--muted-dark`, sur deux lignes si besoin, centrés. **Lien actif = pilule blanche** (texte noir). « Plus ▾ ». À droite : bouton **« Télécharger maintenant »** pilule lime (Inter 700 14px noir), puis trois icônes rondes (musique, partage, compte) blanches.

```css
.nav a[aria-current="page"] { background: var(--surface); color: var(--text); border-radius: var(--radius-pill); padding: 4px 14px; }
.btn-dl { background: var(--accent); color: var(--on-accent); border-radius: var(--radius-pill); padding: 6px 10px; font: 700 var(--text-sm)/1 var(--font-body); }
```

## Bouton pilule « En savoir plus »

```html
<a class="pill" href="#">En savoir plus <span aria-hidden="true">›</span></a>
```
```css
.pill { display: inline-flex; align-items: center; gap: 10px; min-height: 46px; padding: 0 20px; border-radius: var(--radius-pill);
  background: var(--ink); color: var(--on-ink); border: var(--stroke-w) solid var(--stroke); font: 400 var(--text-md)/1 var(--font-display);
  text-decoration: none; transition: all var(--dur-1) var(--ease); }
.pill:hover { background: var(--accent); color: var(--on-accent); border-color: var(--ink); }
```

## Bouton plein lime (abonnement)

Fond `--accent-2`, texte noir, rayon 24px, padding 14px 16px, bordure 0.8px de la même couleur, `all 0.2s linear` (mesuré). Un seul par écran.

## Ruban « piste » (signature)

Grand bloc sombre à extrémités arrondies, coupé à 45°, rayé.
```css
.track { position: relative; background: var(--ink) repeating-linear-gradient(var(--cut), var(--hatch) 0 2px, transparent 2px 9px);
  border-radius: 0 var(--radius-track) var(--radius-track) 0; }
.track--cut { clip-path: polygon(0 0, 100% 0, 100% 100%, 220px 100%); } /* coupe à 45° côté gauche : hauteur = largeur coupée */
```
Les rubans se superposent légèrement d'une section à l'autre et changent de côté (zigzag).

## Bloc de section numéroté

Bloc lime à extrémité arrondie (72px), qui contient en haut à droite le **titre de section** (Anton 53px noir), en dessous un **sous-titre anglais** en capitales (Anton 19px), puis le **numéro géant** (Anton `--text-num`).

```html
<div class="sec-label"><h2>Documents vidéo</h2><span>VIDEO</span><b>03</b></div>
```

## Carrousel de vignettes

Barre pilule noire à contour gris contenant : flèche ← (cercle gris clair), 3 vignettes en **parallélogramme** (coins 8.4px, inclinées), flèche → (cercle blanc). Vignette active : contour lime 3px. Le titre de l'élément actif s'affiche au-dessus avec une étiquette lime en Anton (« Découverte du personnage ») et la date en gris.

## Pellicule photo

Bande noire avec une rangée de perforations carrées blanches arrondies (rayon 4px, 28px, espacées de 28px). Elle peut être droite ou partir en diagonale à 45°. Décor uniquement (`aria-hidden`).
```css
.film { height: 40px; background-color: var(--ink-2);
  background-image: linear-gradient(90deg, var(--surface) 0 28px, transparent 28px 56px);
  background-size: 56px 22px; background-repeat: repeat-x; background-position: 14px center; }
```

## Pagination latérale

Onglet fixé au bord droit de l'écran : noir avec bord gauche arrondi, numéro de section courant en Anton lime vertical (01), flèches ⇤ ⇥ lime, numéro suivant plus petit en dessous. Il change pendant le défilement.

## Carte d'actualité

Panneau blanc à grand rayon (72px côté extérieur), image réelle 16:9 à coins 24px (voir `assets.md`), un **défilant** noir sur le bas de l'image (texte Anton italique gris clair), date Inter 700 12px, titre Inter 700 14px, points de pagination (le point actif est lime), bouton pilule à droite.

## Défilant (marquee)

Texte Anton qui défile en boucle (20s linéaire). S'arrête au survol et quand le mouvement est réduit.

## États

- **Chargement** : barre lime qui remplit un ruban noir rayé (easeOutCubic), numéro « 00 ».
- **Vide** : bloc numéroté avec « 00 » et une phrase.
- **Erreur** : ruban noir, texte lime « HORS SERVICE », bouton pilule « Réessayer ».
