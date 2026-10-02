# Source — Anime X Slash

- **Site de référence** : https://tbhx.net/en/ (site officiel d'une série animée d'action)
- **Famille** : Jeu vidéo & anime
- **Analysé le** : 2026-10-01, Chrome, fenêtre 1536×730, page d'accueil complète (7114px de haut)
- **Méthode** : `extract-design.js` + captures à chaque section (héros, visuel découpé, actualités, introduction, staff/casting, classement, pied de page)

## Mesures brutes

- **Polices chargées** : Noto Sans JP 400/500/700, Oswald 400/500, Roboto 400/500 (marginal), Noto Sans SC 400 (marginal)
- **Tailles dominantes** : 20px (texte d'intro), 16px, 11–12px (labels), 32px (accroches), 91px (titres de section)
- **Graisse dominante** : 700 ; espacement 0.8px ; interligne 40px sur 20px
- **Fonds (pondérés par surface)** : #f4f4f4 (dominant), #000000, #ffffff, #ff211e, #ff4040
- **Textes** : #000000, #ffffff, #ff211e, #ff4040
- **Variables CSS** : --color-red01 #ff4040, --color-red02 #ed2215, --color-red03 #ff211e, 9 couleurs de personnages (--chara-color-*)
- **Bordures** : 0.8px et 1.6px noir, 4px #ff4040
- **Rayons** : uniquement 50% (boutons ronds)
- **Ombres, dégradés CSS** : aucun (hors visuels)
- **Mélange** : mix-blend-mode difference (×2)
- **Transitions** : all 0.4s ease (×56), all 0.3s ease (×41), all 0.5s cubic-bezier(0.47, 0.53, 0.18, 1) (×17), all 1s ease
- **Keyframes** : strokeAnim, widthup, rotate, glitch-effect, glitch-effect-loop, fadeIn
- **Points de rupture** : max-width 768px / min-width 769px
- **En-tête** : fixe ; padding des sections 80px 0 ; container des actualités ≈ 1146px ; colonne de texte à x≈332px

## Non mesuré

- La version mobile n'a pas été mesurée : `layouts.md` décrit une adaptation déduite des points de rupture et de la composition desktop.
- Les animations ont été observées sur des captures fixes ; les durées viennent des feuilles de style, l'enchaînement exact est reconstitué.

## Écarts assumés

| Élément du site | Dans le skill | Raison |
|---|---|---|
| Logo, illustrations et personnages officiels | Formes, trames et emplacements `data-slot` | Droits d'auteur |
| Visuels de la démo | Photos Unsplash libres (licence Unsplash), à remplacer par les images du projet | Démo sans droits ; voir `references/assets.md` |
| Noms de la série, des personnages et du casting | Contenu fictif | Identité de l'œuvre |
| Blanc sur rouge en 14px (« OFFICIAL SNS ») | Noir sur rouge | Contraste 3,8:1 insuffisant |
