# Hyper Lime Street — composants

Valeurs dans `tokens.css`. Les dimensions sont **mesurées** sur le site de référence à 1440×900 sauf mention « proposé ». Code complet dans `examples/demo.html`.

## Règles communes

- **Un seul angle** : toutes les diagonales font 41° avec la verticale (`--angle`). Blocs, bandes, panneaux, découpes d'image, pellicule.
- **Trois matières** : béton clair `--bg`, noir tramé `--ink`, lime `--accent`. Le blanc sert aux panneaux.
- **Police d'affiche condensée** (`--font-display`) pour tout ce qui se voit de loin : titres, numéros, noms, boutons. Texte courant et barre de navigation en `--font-body` gras.
- Coins **arrondis** sur les grandes formes (22px), pilules pour les commandes.
- Chaque section porte un **numéro à deux chiffres** (01 à 06) et un **sous-titre anglais en capitales**.

## Formes inclinées

Une forme est un rectangle arrondi incliné par `skewX`, qui sort de l'écran d'un côté :

```css
.shape { position: absolute; border-radius: var(--r-shape); transform: skewX(calc(var(--angle) * -1)); }
.slab  { height: var(--panel-h); left: 18%; right: -40vw;                      /* bande noire */
  background: var(--ink) repeating-linear-gradient(135deg, var(--hatch) 0 2px, transparent 2px 6px); }
```

| Forme | Rôle | Dimensions |
|---|---|---|
| **Bande noire** (`.slab`) | Passe derrière le panneau, décalée de 35 % vers le bas, sort à droite ou à gauche | hauteur 442px |
| **Bloc lime** (`.block`) | Porte le titre de section ; sort de l'écran du côté opposé | 475 × 442px |
| **Panneau** (`.panel`) | Fond blanc (ou noir) du contenu, doublé d'un liseré lime de 8px dessous | ≈ 1161 × 442px |
| **Pellicule** (`.film`) | Ruban noir à perforations, posé en diagonale derrière les sections | 26px d'épaisseur |

Le contenu n'est **jamais dans l'élément incliné** : il est posé par-dessus, droit.

## Image découpée

Une photo dans un panneau garde ses proportions ; elle est coupée au même angle :

```css
.cut { position: absolute; inset: 0 -30vw 0 0;
  clip-path: polygon(calc(var(--panel-h) * var(--slant)) 0, 100% 0, 100% 100%, 0 100%); }   /* --slant = tan(41°) */
```

Pour un personnage : une bande en parallélogramme (les deux côtés coupés), qui dépasse le panneau de 8 % en haut.

## Bloc titre de section

```
Personnages        ← 36.5px
CHARACTERS         ← 18px, capitales
02                 ← 104.6px
```

Texte `--text` sur lime, aligné à gauche, calé dans la partie haute du bloc (là où le lime est le plus large). Version à droite (`.block.right`) : texte aligné à droite, calé en bas.

## Barre de navigation

Noire, 56px, contenu centré : logo, liens sur une ou deux lignes (11.25px gras, `--nav-idle`), **onglet actif en pilule blanche** (28px, agrandie à 1.12, texte noir), pilule lime « Télécharger maintenant » (25px de haut), bouton rond de son. Sous 1024px : logo, pilule lime et son seulement.

## Onglet latéral

Collé au bord droit, centré en hauteur : 46px de large, fond `--tab`, coins gauches à 8.4px ; flèche lime, numéro blanc 27px, flèche lime. Masqué sous 1024px.

## Visuel d'accueil

Grande image à coins de 22px sur le béton. Par-dessus : **autocollants** inclinés de ±8° (logo sur fond noir à ombre lime, « Télécharger maintenant » sur fond blanc à ombre noire, ombres décalées de 4px sans flou), accroche en capitales dont la seconde ligne est lime, rangée de boutons de plateformes (41px, noirs, coins 8px). Mot géant vertical au bord droit, pellicule en diagonale.

## Fiche de personnage

Dans le panneau blanc : photo en bande inclinée à gauche ; à droite, aligné à droite, la faction (18px), le **nom en 49.5px**, deux lignes de texte `--muted`. Derrière, sur la bande noire, le prénom en **mot géant** (406px, `--watermark-ink`). Sous le panneau : pilule de vignettes et bouton « En savoir plus ».

## Pilule de vignettes

Barre `--text` de 43px, rayon plein, contenant une flèche ronde, des vignettes de 54 × 33px (coins 6px, 50 % d'opacité), la vignette choisie à 100 % avec un contour lime de 2px, puis une flèche. `role="tablist"`, flèches du clavier.

## Bouton « En savoir plus »

Pilule `--text` de 43px, texte `--soft` en police d'affiche 13.5px, pastille lime de 22px avec chevron. Survol : fond lime, texte noir, pastille noire.

## Carte vidéo

Panneau noir à liseré lime, image découpée du côté droit, voile en bas, **bouton lecture rond lime** de 64px, légende (catégorie lime + titre) et pilule de vignettes sous l'image.

## Actualités

Dans le panneau blanc : bannière à coins de 8.4px avec **étiquette de catégorie** (parallélogramme noir, texte lime 11px capitales), puis date, titre en gras, points de pagination (9px, actif lime cerclé de noir) et bouton. Sous le panneau, le **texte défilant** en police d'affiche 22.5px `--muted`.

## Carte « univers »

Image 16:9 à coins de 22px, **ombre lime pleine décalée de 10px**, légende blanche en bas à gauche. À côté : titre, numéro, petite carte lime « radio » (pastille noire avec triangle), bouton.

## Bannière de caractéristique

Panneau noir, image découpée, titre **lime 45px aligné à droite** en bas, points de pagination blancs.

## Pied de page

Fond `--ink` : onglet blanc « TOP » qui dépasse en haut à gauche, rangée de réseaux (ronds de 44px), « M'abonner aux messages » (24px gras, `--soft`) + texte, champ en pilule `--field` de 48px, bouton lime `--accent-2` (rayon 24px), case de consentement avec lien lime. Dessous, bande noire : logo, liens légaux, mentions.

## Accessibilité

- Noir sur lime (17,6:1) et blanc sur noir partout ; jamais de texte lime sur blanc ou sur béton.
- Le texte posé sur une photo a toujours un voile `--veil` dessous.
- Cibles de 44px (liens de la barre, flèches de l'onglet, réseaux) ; les points de pagination ont une zone de 24px.
- Carrousels : `role="tablist"` / `tab`, `aria-selected`, flèches gauche et droite.
- La section en cours est signalée par `aria-current` dans la barre.
- Les mots géants, la pellicule et les formes sont `aria-hidden`.
