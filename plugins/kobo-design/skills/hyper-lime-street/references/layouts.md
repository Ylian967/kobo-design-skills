# Hyper Lime Street — mises en page

## Principes

- Navigation noire fixe 60px. Pagination latérale fixe à droite.
- Le fond est `--bg`. Chaque section mesure ≈ 117px de padding vertical et est numérotée.
- Les sections alternent : contenu à gauche + numéro à droite, puis l'inverse. Les rubans noirs font la liaison en diagonale.
- Points de rupture mesurés : 1025px / 1024px (desktop), 1024–1365px, ≤ 1023px (mobile), ≤ 374px (petit mobile).

## Héros (section 01)

Image réelle plein cadre (key art du projet ou photo de rue, voir `assets.md`) dans un rectangle légèrement **incliné** (le bord gauche part en biais), logo du jeu en bas à gauche qui déborde, boutons des stores (noirs, rayon 8px) en bas à droite. Fond béton autour.

## Sections 02 → 06

Structure type :
```
┌──────── ruban noir rayé (72px, coupe 45°) ───────┐
│  bloc lime numéroté    │   contenu (blanc)        │
└──────── pellicule en diagonale ──────────────────┘
```
- **Personnages** : grande image réelle à droite (duotone noir → lime sur le bloc numéroté, voir `assets.md`), carrousel de vignettes en bas à gauche, bouton pilule à droite.
- **Vidéos** : image de la vidéo en fond, bande d'infos sombre translucide par-dessus (étiquette lime, date, titre), carrousel de vignettes, numéro « 03 » dans le bloc lime à droite.
- **Actus** : carte d'actualité dans un panneau blanc, bloc lime à gauche.
- **Univers** : grande image à coins 24px, texte court, bouton pilule.

## Pied de page

Ruban noir pleine largeur, liens Inter 12px gris, réseaux en icônes rondes, défilant lime en haut du pied.

## Mobile (≤ 1023px)

- Navigation : logo + bouton télécharger + menu burger ; liens dans un tiroir noir avec pilule blanche pour l'actif.
- Pagination latérale masquée.
- Sections empilées : bloc lime numéroté en haut (numéro 72px), contenu dessous ; rubans réduits à des bandes de 40px de haut entre les sections.
- Rayon des pistes réduit à 36px, coupes conservées.
