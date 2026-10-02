# Source — Cosmic Voyage

- **Site de référence** : https://hsr.hoyoverse.com/fr-fr/home (site officiel d'un RPG gacha de science-fantasy)
- **Pages observées** : accueil, /character, /news
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

## Non mesuré

- Mobile non mesuré : adaptation déduite des points de rupture.
- Le bleu de l'onglet actif (`--link`) et le bleu du verre ont été relevés à l'œil sur capture, pas par le script.
- Les pages Personnages et Actualités ont été observées sur captures, pas passées au script.

## Écarts assumés

| Élément du site | Dans le skill | Raison |
|---|---|---|
| Microsoft YaHei (système Windows) | Noto Sans / Noto Sans SC | Disponible partout via Google Fonts |
| Illustrations, logo, emblèmes de factions | Emplacements `data-slot` et formes | Droits d'auteur |
| Visuels de la démo | Photos Unsplash libres (licence Unsplash) et scène Three.js, à remplacer par les images du projet | Démo sans droits ; voir `references/assets.md` |
| Intro vidéo/canvas d'origine | Hyperespace recodé en canvas simple | Identité de l'œuvre |
