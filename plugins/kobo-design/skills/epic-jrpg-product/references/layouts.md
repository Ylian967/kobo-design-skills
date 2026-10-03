# Epic JRPG Product — mises en page

## Principes

- En-tête : barre éditeur (`--bar-h`) + filet 3px pleine largeur + nav produit 70px collante. Fond de page noir, sections sur texture sombre chaude (braises).
- Container ≈ 1100px ; grilles 2 colonnes (texte 40 % / média 60 %).
- Points de rupture mesurés : 767px (mobile), 1023px (tablette), 1200px (grand écran).
- Rythme vertical : `--spacing` 19px, `--spacing--big` 30px, `--spacing--desktop` 35px.

## Ordre de la page produit

1. **Héros** : visuel clé plein cadre (groupe de personnages — image réelle, voir `assets.md`), fondu vers le noir, logo du jeu en bas au centre.
2. **Pitch + vidéo** : à gauche sous-titre + ornement + 3 paragraphes ; à droite vidéo encadrée d'ornements.
3. **Achat rapide** : badges de plateformes avec dates, bouton or « Acheter », bouton contour « Ajouter à la liste de souhaits ».
4. **Notes presse** : bandeau centré.
5. **Caractéristiques principales** : titre 36px, puis blocs en **zigzag** (capture réelle ou vidéo d'un côté — voir `assets.md` —, plaque dorée + paragraphe + petit losange de l'autre).
6. **Module d'achat** détaillé.
7. **Pied de page** doré clair à motifs fins, liens bleu nuit.

## Gabarits des pages internes

Toutes les pages partagent : barre éditeur + filet → nav produit (lien actif à ornement ✦✦✦) → contenu → **bas de page commun** (newsletter | réseaux) → pied de page → boutons flottants.

### Page « Acheter » (configurateur) — exemple : `examples/achat.html`

Fond **lave/braises plein écran** (`--lava` + photo de braises à 30 %) sur toute la hauteur du contenu.
1. **Titre** : icône sac + « Acheter » 36px 900, centré, `--space-8` au-dessus.
2. **Configurateur** : container 1100px, grille `minmax(0,1fr) minmax(0,1fr)`, gouttière `--space-8`.
   - Gauche : pays → édition → plateformes (grille 2 colonnes de 244px centrée).
   - Droite : carte d'édition en verre sombre, alignée en haut.
3. **Configuration requise** : H2 36px 900 aligné à gauche, puis grille 2 colonnes Minimum / Recommandée (gouttière `--space-5`).
4. **Bas de page commun**.

### Page « Média » (visionneuse)

1. Barre : « ‹ Précédent » à gauche ; à droite (ou centré) ← compteur « 1/8 » →.
2. Grande vidéo 16:9 dans le container 1100px, centrée, `--space-6` au-dessus et au-dessous.
3. (Option) rangée de vignettes 16:9 sous la vidéo, la courante encadrée d'or.
4. Bas de page commun.

### Page « Actualités » du jeu

Même en-tête et même bas de page ; contenu = liste d'articles (visuel 16:9 rayon 4px, titre 700 `--text-lg`, date 600 `--text-xs` `--muted`) en grille 3 colonnes → 1 colonne en mobile. (Pas de composant propre relevé : reprendre cartes et tokens existants.)

### Bas de page commun

Grille 2 moitiés pleine largeur (sans container) : newsletter sur lave à gauche, panneau or « Nous suivre » à droite ; puis pied de page fin noir (liens légaux `--muted` 12px). Sur la page d'accueil, le pied de page doré tient le rôle de la bande claire ; ailleurs c'est le panneau « Nous suivre » : **une seule** bande or par page.

## Mobile (observé en iframe 390px)

Le site est responsive (points de rupture 767/1023px mesurés). Relevés réels :

- **Barre éditeur conservée** (compte, FR, logo) + filet multicolore 3px pleine largeur.
- **Nav produit réduite** : logo du jeu à gauche ; à droite loupe + burger (le bouton ACHETER disparaît de la barre, l'achat passe par le bouton flottant or et par le menu).
- **Héros mobile** : visuel 4:5, logo du jeu centré, titre blanc 900 capitales, lignes méta (Date de sortie · Genres · Développeur) à libellés or, lien souligné « Kit presse ».
- **Configurateur** : une colonne (libellés, selects pleine largeur), **grille plateformes 2 colonnes conservée** (tuiles `1fr`), carte d'édition sous le formulaire.
- **Configuration requise** : boîtes empilées.
- **Bas de page commun** : newsletter puis panneau or empilés ; champ et bouton en colonne pleine largeur.
- Toutes les grilles de contenu en une colonne : média au-dessus, texte dessous ; plaques de titre pleine largeur alignées à gauche.
- Boutons flottants réduits à 48px (`--fab-m`) ; marges latérales 20px ; cibles ≥ 44px.
