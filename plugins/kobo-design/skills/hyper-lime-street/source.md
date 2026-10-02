# Source — Hyper Lime Street

- **Site de référence** : https://zenless.hoyoverse.com/fr-fr/main (site officiel d'un jeu d'action urbain)
- **Famille** : Jeu vidéo
- **Analysé le** : 2026-10-01, Chrome, 1536×674, page d'accueil complète (5441px)
- **Méthode** : `extract-design.js` + captures de chaque section

## Mesures brutes

- **Polices chargées** : Impact (« en impact »), icomoon ; texte secondaire en police système (« meSubFont », Inter, system-ui)
- **Tailles** : 25.2px (dominant, display), 12px, 52.8px, 14.4px, 14px, 24px, 60px, 39px, 19.2px, 48px
- **Textes** : #222122 (dominant), #919191, #ccd0d2, #000000, #ffffff, #787878
- **Fonds** : #111111 (dominant), #000000, #ffffff, #c6e800, #d8fa00 ; fond de page #efefef
- **Bordures** : 4.8px solid #767678 (boutons pilule), 2.4px #646464, 0.8px #c6e800
- **Rayons** : 8.4px (×18), 72px (×7), 100%, 24px, 3px
- **Padding de section** : 117px 0 (×62)
- **Transitions** : all 0.3/0.4/0.5/0.6s cubic-bezier(0.215, 0.61, 0.355, 1) (~250 éléments), transform 0.3s ease-in-out
- **Animations** : wordsLoop 20s linear, heartbeat 0.8s ; keyframes rotation, tada, wordsLoopMob, swiper-preloader-spin
- **Bouton plein** : « M'abonner maintenant » fond #c6e800, rayon 24px, padding 14px 16px, all 0.2s linear
- **Points de rupture** : min-width 1025px, 1024px, max-width 1023px, 1024–1365px, max-width 374px

## Non mesuré

- Mobile non mesuré (déduit des points de rupture).
- Les rayures fines des rubans et la pellicule ont été relevées sur captures (ce sont des images sur la référence) ; elles sont recodées en CSS.

## Écarts assumés

| Élément du site | Dans le skill | Raison |
|---|---|---|
| Impact (police système) | Anton (Google Fonts) | Disponible partout, même structure condensée |
| Gris #787878 sur béton | #6b6b6b | 3,8:1 → 4,6:1 |
| Logo, personnages, illustrations | Emplacements `data-slot` | Droits d'auteur |
