# Bubble Publisher Hub — mises en page

## Principes

- Marges latérales 36px, contenu en pleine largeur (pas de container étroit), cartes en grille de 3.
- Sections séparées par des changements de fond (blanc → visuel plein cadre → rose → visuel sombre → blanc).
- Points de rupture : 767px, 1023px, 1200px (même plateforme que les pages produit de l'éditeur).

## Accueil d'éditeur

1. **Manifeste** : grand titre 60px sur 3 lignes à gauche (« Nous sommes … »), visuel-bulle à droite (image réelle, voir `assets.md`) avec un **slogan dans une bulle rouge** qui déborde en haut à droite, lien souligné « Rejoignez l'aventure » en bas à gauche.
2. **Jeu à la une** : visuel réel plein cadre (≈ 700px), pile d'encarts-bulles blancs à droite.
3. **Club** : section rose, titre-bulle noir, panneau blanc avec carrousel de récompenses.
4. **Playtest** : photo sombre plein cadre, titre-bulle blanc à gauche, icône + texte + bouton.
5. **Jeux tendance et à venir** : titre-bulle blanc sur visuel, puis grille de cartes de sortie et bouton rouge.
6. **Pied de page** : noir, liens blancs, filet 4 couleurs en haut.

## Gabarits des pages internes

### Catalogue « Jeux » — exemple : `examples/jeux.html`

1. En-tête interne (barre utilitaire, filet épais à droite, barre blanche, « Jeux » actif).
2. **Haut de page** : bande noire + lettre géante ; titre en **bulles empilées** rouges ; **2 cartes vedettes** dont la moitié haute chevauche la bande.
3. **Outils** : champ de recherche (≤ 520px) + « Catégorie ⌄ » + « Date de sortie ⌄ » sur une ligne, compteur à droite.
4. **Rangées par catégorie** (Action, Aventure & RPG, Famille…) : titre-bulle noir + flèches, carrousel 16:9 pleine largeur avec carte coupée à droite. Espacement 24–36px entre rangées.
5. (Option) **aperçu Actualités** sur bande rose.
6. Pied de page noir à filet 4 couleurs.

### Actualités (« /live »)

1. En-tête interne (« Actualités » actif).
2. **Bande rose `--band-news`** derrière le haut (≈ 45 % des premières cartes) ; titre-bulle noir « Dernières actualités jeux ».
3. Grille 3 colonnes (gouttière 24px) de cartes d'actualité ; sur la référence, une première rangée en carrousel puis la recherche.
4. **Outils** : « Rechercher des actualités de jeu » + filtre « Catégorie ».
5. Rangée « Actualités » (titre-bulle noir + flèches rouges) ; bouton rouge « Toutes les actualités ».

### Pied de page (commun)

Noir, filet 4 couleurs en haut ; liens À propos, Presse, Recrutement, Licences, puis deux liens en capitales espacées (« Enregistrer un jeu », « Rejoignez le Club ! »).

## Mobile (observé en iframe 390px)

Le site est responsive. Relevés réels :
- **Barre utilitaire noire conservée** (compte, FR, logo carré).
- Barre de nav sur **fond de couleur** (celle de la bande de la page), **logo-bulle blanc**, loupe + burger à droite.
- **Titres-bulles conservés** (rouges sur noir pour Jeux, noirs sur rose pour Actualités).
- **Cartes pleine largeur** : vedettes empilées ; carrousels à 86 % de largeur (la suivante dépasse).
- Recherche pleine largeur, menus déroulants en dessous.
- Accueil mobile : titre « Nous sommes … » navy 800 32px, puis carte image arrondie.

### Accueil (≤ 767px)

- Barre noire masquée, barre blanche 60px avec logo, loupe, burger.
- Manifeste : titre 40px, visuel en dessous.
- Encarts-bulles sous le visuel (plus par-dessus), pleine largeur.
- Cartes de sortie en carrousel horizontal (85 % de largeur).
- Fenêtre d'inscription : collage masqué, contenu seul.
