# Source — Cosmic Voyage

- **Site de référence** : https://hsr.hoyoverse.com/fr-fr/home (site officiel d'un RPG gacha de science-fantasy)
- **Pages observées** : accueil, /character, /news (1re passe) ; /world, /world/<id>, accueil mobile 375px (2e passe, voir « Pages explorées »)
- **Famille** : Jeu vidéo & gacha
- **Analysé le** : 2026-10-01, Chrome, 1536×674
- **Méthode** : `extract-design.js` sur l'accueil + captures et zooms sur les pages personnages et actualités

## Mesures brutes

- **Polices** : Microsoft YaHei (dominant, police système), Inter, system-ui ; seule police web chargée : une police d'icônes
- **Tailles** : 11px (dominant), 12px, 14px, 15px, 10.5px, 24px, 30px, 50px, 100px ; poids 500 dominant
- **Textes** : #e9e9e9, #ccd0d2, #919191, #ffffff, #dbbf91 (or), #bbbbbb
- **Fonds** : #000000, #111111, #121212, #212226, #db9a45
- **Bordures** : 0.8px rgba(229,229,229,.5), 0.8px #323232 / #323339 / #4f5159, 0.8px #db9a45
- **Rayons** : `0 28px 0 0` (×11, cartes), 12px, 4.8px, 28px
- **Variables** : --global-radius-1…7 (6, 12, 16, 20, 28, 40, 48px), --global-spacing-1…13 (4 → 80px), --global-text-title/body/secondary…
- **Bouton principal** : fond #db9a45, texte #000, bordure 0.8px #db9a45, rayon 12px, padding 14px 16px, `all 0.2s linear`
- **Transitions** : opacity 0.2s ease, opacity 0.3s ease-out, width 0.4s ease, opacity/transform 0.5s ease-in-out
- **Keyframes** : rotation, float-1…5, moreDown, scroll, user-model-loading
- **Points de rupture** : min-width 1024px, 1024–1365px, max-width 1023px, 768–1023px
- **Structure** : accueil = une scène de 674px (pas de défilement), 1 canvas (intro), 39 images, 5 iframes

## Pages explorées

**Mesuré** = valeur lue par script dans le navigateur ; **observé** = relevé à l'œil sur capture.

| URL | Relevé | Nature |
|---|---|---|
| `/fr-fr/home` | Accueil, voir « Mesures brutes » | mesuré |
| `/fr-fr/character` | Panneau de verre, frise d'emblèmes, citations en bandes, vignettes (1re passe) | observé |
| `/fr-fr/news` | Onglets à étoile, cartes à un coin, en-tête de section (1re passe) | observé |
| `/fr-fr/world` (2026-10-02) | Carte stellaire plein écran fond nuit bleu profond ; grands anneaux orbitaux concentriques (traits blancs fins pleins ou pointillés) qui traversent l'écran ; mondes = icônes rondes lumineuses (planètes, stations, bulles de verre) avec halo bleu et libellé blanc 11px ; étiquette « Mondes » en haut à gauche dans un petit cadre sombre ; lien de nav actif souligné de bleu clair | observé |
| `/fr-fr/world/<id>` (2026-10-02) | Fond = illustration du monde floutée + voile ; bouton « Retour » rectangle à bord fin en haut à gauche ; nom du monde + icône ronde en haut à droite ; titre et paragraphe 12px centrés ; carrousel de lieux : image centrale 16:9 nette à coins arrondis, voisines assombries et coupées, flèches ‹ › fines sur l'image, légende sous l'image | observé |
| accueil mobile, 375px (2026-10-02, navigateur intégré) | Barre noire : pilule blanche « Télécharger maintenant » sur 2 lignes à gauche, hamburger à droite ; héros portrait plein écran, logo en haut à gauche ; bouton lecture rond à anneau dégradé violet → bleu → orange ; gros bouton jaune #ffd93b à bord doré et lueur centré en bas ; chevron ⌄ ; bannière cookies à boutons bleus pleine largeur + « Paramètres » en contour | observé (le jaune #ffd93b est relevé sur capture) |

Valeurs estimées (pas lues par script) : `--map-bg`, `--map-bg-2`, opacités des orbites et du halo, `--cta-yellow-edge`, couleurs de l'anneau du bouton lecture, `--cookie-blue` (assombri pour porter du texte blanc à 5,5:1), toutes les durées des animations de la carte et du mobile. Le menu mobile ouvert et les pages internes en mobile n'ont **pas** été observés.

## Non mesuré

- Mobile : seul l'accueil a été observé (375px) ; aucune valeur mesurée par script. Les pages internes en mobile sont une adaptation proposée.
- Le bleu de l'onglet actif (`--link`) et le bleu du verre ont été relevés à l'œil sur capture, pas par le script.
- Les pages Personnages et Actualités ont été observées sur captures, pas passées au script.

## Écarts assumés

| Élément du site | Dans le skill | Raison |
|---|---|---|
| Microsoft YaHei (système Windows) | Noto Sans / Noto Sans SC | Disponible partout via Google Fonts |
| Illustrations, logo, emblèmes de factions | Emplacements `data-slot` et formes | Droits d'auteur |
| Visuels de la démo | Photos Unsplash libres (licence Unsplash) et scène Three.js, à remplacer par les images du projet | Démo sans droits ; voir `references/assets.md` |
| Icônes et illustrations des mondes | Photos d'espace Unsplash (nébuleuses, Terre, station) dans les icônes rondes et le carrousel de `examples/mondes.html` | Droits d'auteur |
| Intro vidéo/canvas d'origine | Hyperespace recodé en canvas simple | Identité de l'œuvre |
