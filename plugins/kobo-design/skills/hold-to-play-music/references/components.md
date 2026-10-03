# Hold To Play Music — composants

Valeurs dans `tokens.css`. Les dimensions sont **mesurées** sur le site de référence à 1440×900 sauf mention « proposé ». Code complet dans `examples/demo.html`.

## Règles communes

- **Noir et blanc partout, couleur seulement quand on agit** : les images sont grises au repos, en couleur pendant un appui.
- **Trois couleurs de peinture** : bleu Klein `--klein`, orange `--orange`, blanc. Sur noir, le bleu Klein ne sert qu'aux grandes lettres peintes (2,1:1) ; jamais à du texte.
- **Trois polices** : lettrage peint (`--font-paint`) pour le mot-titre et le logo ; sans (`--font-ui`) en gras pour les consignes, en fin pour la touche et les phrases ; mono (`--font-mono`) 13px pour le pied et les mentions.
- Aucune carte, aucun fond de panneau : le texte est posé sur l'image, centré.
- Les contours font **1.6px**, les formes sont des pilules ou des cercles.

## Mot peint

Le titre de l'expérience, en lettres capitales peintes, **hautes et étroites** (≈ 713 × 187px à 1440), chaque lettre d'une des trois couleurs.

```html
<h1 class="paint" aria-label="Persistance"><span class="k" style="--tilt:-2deg;--tall:1.9" aria-hidden="true">P</span>…</h1>
```

- Police `--font-paint` 900, lettres étirées en hauteur (`scaleY` 1.75 à 2.05) et inclinées de ±3.5°, chacune différemment : c'est l'irrégularité qui fait « fait main ».
- Bords irréguliers : filtre SVG `feTurbulence` + `feDisplacementMap` (échelle 9), posé une fois les lettres en place.
- Pendant un appui et sur les pages d'artistes, toutes les lettres passent au blanc.
- Idéalement, remplacer par un **vrai lettrage peint** fourni par le projet (SVG ou PNG) : voir `assets.md`.

## Logo du label

En haut à gauche, à 30px : un petit signe au trait (2px) au-dessus du nom en lettrage peint 20px. Rappel du mot peint en haut à droite, en blanc 24px, sur les pages d'artistes.

## Consigne et touche

```
Maintenez  ( espace )  pour lancer Persistance.
```

- Phrase en sans **600**, 20px, interligne 48px, blanche, centrée.
- **Touche** : pilule de 140 × 48px, rayon 24px, contour blanc de 1.6px, libellé en graisse fine 17px. C'est un vrai `<button>`.
- Pendant l'appui, un second contour orange `--hot` se trace par-dessus (voir `motion.md`). Une fois plein : « Maintenez » → « Relâchez », la fin de phrase change (« … est prête. »), le libellé passe à l'orange.
- Sur une scène claire, phrase et touche passent en `--ink`.
- Écran tactile : le libellé devient « ici » ; on maintient le doigt sur la touche.

## Phrase d'accroche

Sous le mot peint : une ligne en graisse fine 14.3px, blanche. Au-dessus : « présente » en mono 12px `--grey`.

## Écran blanc d'ouverture

Fond `--paper`, texte `--ink` : logo, deux pictogrammes au trait (notes, casque), deux lignes en sans 600 15px dont quelques mots sont colorés (`--orange-ink`, `--klein`), lien « Commencer ». Il disparaît seul après 3s.

## Annonce d'artiste

Plein centre, sans 600 38px, deux lignes : le nom, puis le titre entre guillemets. Remplacée par l'année seule, puis par la touche de scène.

## Touche de scène

Petite touche carrée arrondie de 30px qui clignote + consigne soulignée (« Maintenez H pour rallumer la scène. »), 14px 600. Chaque artiste peut avoir sa propre touche et son propre effet.

## Barre d'artiste (bas de l'écran)

| Gauche | Centre | Droite |
|---|---|---|
| Vignette de pochette 150px, puis « Nom (année) » souligné + rond fléché de 26px | Consigne « Maintenez ( espace ) pour changer d'artiste. » | « Besoin d'aide ? » avec pictogramme |

La vignette ouvre la **pochette** : voile `--veil-strong`, pochette de 424px, nom + titre 38px, année orange, liste des morceaux à filets `--ghost` avec numéro en mono.

## Aide

Même voile ; titre 38px, court texte `--pale`, liste des commandes : chaque touche est dessinée en pilule (contour 1.6px, graisse fine) suivie de son effet.

## Pied de page

Mono 13px, à 44px du bas : à gauche ©, « À propos » ; à droite mot-dièse et mention. Survol : orange.

## Générique (page « À propos » du site)

Sur noir, sans 46px interligne 1.4 : rôles en `--orange`, noms en blanc, têtes de rubrique en `--klein` (grandes tailles uniquement).

## Accessibilité

- **Le geste « maintenir » a toujours une issue** : Entrée sur la touche passe à la suite ; relâcher trop tôt n'a aucune conséquence ; quitter la fenêtre annule l'appui.
- La touche et la touche de scène sont des boutons focusables, avec un libellé (`aria-label`) qui décrit l'action et l'issue au clavier.
- L'annonce d'artiste est dans une zone `aria-live="polite"`.
- Contrastes : texte blanc sur voile `--veil` ; orange et gris vérifiés sur noir ; bleu Klein jamais en texte sur noir.
- Pas de son lancé sans action de l'utilisateur.
