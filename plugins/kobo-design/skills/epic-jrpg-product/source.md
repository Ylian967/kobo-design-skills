# Source — Epic JRPG Product

- **Site de référence** : https://fr.bandainamcoent.eu/tales-of/tales-of-arise (page produit d'un J-RPG chez un éditeur japonais)
- **Famille** : Jeu vidéo
- **Analysé le** : 2026-10-01, Chrome, 1536×674, page complète (11930px)
- **Méthode** : `extract-design.js` + captures (héros, pitch, achat rapide, notes, caractéristiques, module d'achat)

## Mesures brutes

- **Police** : Metropolis 300/400/500/600/700 (tout le site)
- **Tailles** : 16px (dominant), 24px, 15px, 12px, 13px, 18px, 36px, 14px, 25px, 45px (H1 900)
- **Graisses** : 500 dominant, 400, 900, 700, 300 ; **interlettrage** -0.48px (dominant)
- **Textes** : #ffffff, #263238, #f1c66f, #1e244d, #000000, #b0030d, #858f94
- **Fonds** : #000000 (dominant), #ffffff, #f1c66f, #d2691e, #e20613
- **Bordures** : 0.8px #ffffff, 0.8px #f1c66f, 0.8px #b5bdc1, 0.8px #1e244d
- **Rayons** : 4px (×28), 5px, 50%, 20px, 7px
- **Ombre** : 0 0 29px rgba(0,0,0,.5) (×21)
- **Bouton ACHETER** : fond #f1c66f, texte blanc 14px 600 +1.12px capitales, rayon 7px, padding 12px 25px, transitions 0.2s
- **Variables** : --color--primary #e20613, --transition-duration 0.3s/0.2s/0.1s, --spacing 1.9rem, --size-cta--min 4.4rem, --height-header 14rem / 7rem
- **Points de rupture** : max-width 767px, 1023px, 1200px ; min-width 768px, 1024px, 1200px

## Pages explorées

Exploration complète le 2026-10-02 (Chrome, bureau + iframe 390px). « Mesuré » = valeur lue dans le navigateur (styles calculés, dimensions) ; « observé » = relevé à l'œil sur capture.

| URL | Ce qui y a été relevé |
|---|---|
| `/tales-of/tales-of-arise` (fiche produit) | Déjà mesurée le 2026-10-01 (voir « Mesures brutes »). Revue : barre éditeur, nav produit, ornement d'onglet actif. |
| `/tales-of/tales-of-arise/shop-now` (Acheter) | Configurateur d'achat, carte d'édition, configuration requise. |
| `/tales-of/tales-of-arise/media` (Média) | Visionneuse : retour « ‹ Précédent », compteur « 1/8 » entre flèches, grande vidéo 16:9. |
| `/tales-of/tales-of-arise/news` (actualités du jeu) | Même gabarit de bas de page ; pas de composant nouveau noté. |
| Nav produit : Caractéristiques principales, Musique, Média, Wiki, extension | Liens visités depuis la nav ; mêmes en-tête et bas de page partout. |
| Toutes pages en iframe 390px | Version mobile (barre éditeur conservée, nav réduite, héros mobile, configurateur en une colonne). |

### Mesuré

- **Nav produit** : hauteur ≈ 70px, liens Metropolis 17px / 300 blancs.
- **Bouton ACHETER (nav)** : fond #f1c66f, texte blanc Metropolis 14px / 600 capitales espacées, rayon 7px, 126×44px.
- **Filet multicolore** : 3px, pleine largeur, sous la barre éditeur.
- **Boutique** : titre « Acheter » 36px / 900 blanc ; libellés de champ 18px / 900 centrés ; selects fond transparent, bord blanc 0.8px, rayon 4px ; boutons plateforme 244×54px, bord blanc 0.8px, rayon 4px, texte 16px / 700.
- **Configuration requise** : H2 36px / 900 ; intitulés de colonne 18px / 500 ; listes 15px.
- **Bas de page commun** : titres « Reste informé » / « Nous suivre » 36px / 900.
- **Boutons flottants** : ronds 60px.

### Observé (à l'œil)

- Fond de la boutique et de la newsletter : texture lave / braises sombre plein écran (couleur de repli `--lava` estimée).
- Ornement d'onglet actif « ✦ ✦ ✦ » (3 petits losanges) centré sous le lien.
- Barre éditeur : icône compte, « FR », logo éditeur encadré ; ordre des couleurs du filet : rouge, jaune, bleu, (turquoise).
- Grande icône sac au trait blanc à côté du titre « Acheter ».
- Carte d'édition sur « verre sombre » (rayon ≈ 8px), bouton or « DÉMATÉRIALISÉ » avec icône, accordéon « Voir le contenu de l'édition + » souligné d'or.
- Boîtes de configuration à bord blanc fin.
- Bas de page en deux moitiés : gauche texture lave (titre, sous-texte, champ blanc, bouton or « JE M'ABONNE ») ; droite panneau or plein texturé (« Nous suivre », « Rejoins notre communauté », icônes réseaux blanches).
- Boutons flottants : blanc (newsletter, icône or), or (achat, icône blanche).
- Mobile : barre éditeur + filet conservés ; nav = logo à gauche, loupe + burger ; héros = logo du jeu centré, titre capitales gras, lignes méta (« Date de sortie », « Genres », « Développeur ») avec libellés en or, lien « Kit presse » souligné, visuel ; configurateur en une colonne avec grille plateformes 2 colonnes conservée.

## Non mesuré

- Mobile : observé en iframe 390px (pas de mesures chiffrées). Durées d'ouverture du menu mobile et de la visionneuse média non mesurées (estimées dans `motion.md`). Les couleurs du filet multicolore de l'en-tête sont relevées à l'œil.

## Écarts assumés

| Élément du site | Dans le skill | Raison |
|---|---|---|
| Metropolis (libre, hors Google Fonts) | Montserrat | Même dessin d'origine, disponible partout |
| Texte blanc sur or (1,6:1) | Texte bleu nuit #1e244d sur or (9,2:1) | Lisibilité |
| Icônes blanches sur or / or sur blanc (boutons flottants, réseaux) : 1,6:1 | Icônes bleu nuit `--on-gold` | Contraste des éléments graphiques (≥ 3:1) |
| Logos de plateformes et de réseaux sociaux | Noms génériques (« Console A ») et pictogrammes neutres | Marques |
| Logos, personnages, jaquettes, vidéos | Emplacements | Droits d'auteur |
| Visuels du jeu | Visuels de la démo : photos Unsplash libres (licence Unsplash) et/ou scène Three.js, à remplacer par les images du projet | Droits d'auteur |
