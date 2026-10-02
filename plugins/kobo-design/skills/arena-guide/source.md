# Source — Arena Guide

- **Site de référence** : https://www.leagueoflegends.com/fr-fr/how-to-play/ (page « comment jouer » d'un MOBA)
- **Famille** : Jeu vidéo
- **Analysé le** : 2026-10-01, Chrome, 1536×674, page complète (11716px)
- **Méthode** : `extract-design.js` + captures des sections héros, intro, objectifs, vidéos

## Mesures brutes

- **Polices chargées** : Beaufort for LOL 700/800 italique, Spiegel 400/600/700 (+ italique), Inter 400–700
- **Titres H1/H2** : Beaufort 57.14px, 900, interligne 64.28px, capitales, italique ; blanc ou #0a1428
- **Texte** : Spiegel 18px / 28px (dominant), 13px, 14px, 22px, 24px ; capitales ×882 (nav, boutons)
- **Textes** : #ffffff, #f9f9f9, #0a1428, #7e7e7e, #999999
- **Fonds** : #161f32, #0a1428 (dominants), #3b4353, #ffffff, #111111, #c8aa6e
- **Bordures** : 0.8px #c8aa6e, 0.8px #3b4353
- **Dégradé** : linear-gradient(315deg, #0bc4e2 0%, #2c8cc2 100%) (boutons JOUER)
- **Rayons** : 12px (×7), 8px, 16px, 6.4px
- **Espacements** : gaps 16/32px ; paddings 0 48px, 48px 0, 8px 16px, 18px 32px
- **Transitions** : transform, filter 0.3s ease ; all 0.2s linear ; color 1s / border-color 0.5s cubic-bezier(0.06, 0.81, 0, 0.98)
- **Points de rupture** : max-width 1024px (×143), 600px (×62), 768px, 420px, 640px
- **Médias** : 67 images, 2 vidéos, 37 SVG

## Non mesuré

- Mobile non mesuré (déduit). Rouge `--enemy` relevé à l'œil sur les anneaux adverses. Le `--muted` (#a09b8c) est choisi pour l'onglet inactif observé en gris chaud.

## Écarts assumés

| Élément du site | Dans le skill | Raison |
|---|---|---|
| Beaufort for LOL (propriétaire) | Spectral 800 italique | Licence ; même serif robuste |
| Spiegel (propriétaire) | Source Sans 3 | Licence ; sans humaniste |
| Champions, carte, logos, vidéos | Emplacements et formes | Droits d'auteur |
