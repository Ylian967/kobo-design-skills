# Source — Hold To Play Music

- **Site de référence** : http://www.because-recollection.com/ (fiche Awwwards : https://www.awwwards.com/sites/because-recollection — Site of the Day, déc. 2015)
- **Famille** : Musique / expérience interactive
- **Analysé le** : 2026-10-01, Chrome

## Ce qui a été vu

- 2026-10-01 : le site n'avait pas été ouvert ; **2026-10-03 : site ouvert, toujours en ligne** (navigateur intégré, 612px).
- **Fiche Awwwards** : palette #000, #2779a7, #DF6C4F ; catégories : musique & son, animation, navigation inhabituelle, WebGL ; description : voyage interactif à travers dix ans de musique et d'artworks d'un label.
- **Captures officielles** (3 images) : accueil avec triptyque photo N&B, logo du label « présente », titre en lettrage peint bleu/orange/blanc, consigne « Hold [spacebar] to launch », pied de page minuscule ; page d'artiste sur fond blanc avec silhouette en contre-jour, vignette de pochette, « Nom (année) » et bouton ↓ ; variante avec vidéo et titre peint blanc.

## Pages explorées (2026-10-03)

| Écran | Relevé |
|---|---|
| Chargement | Mesuré : « présente » Inconsolata 12px #858585. Observé : grain animé, logo dessiné, anneau, traits de pinceau qui forment le titre. |
| Choix d'écoute | Mesuré : Camphor 17px 400, orange rgb(228,120,57) / bleu rgb(0,47,167) ; « commencer » 16px 200. |
| Générique | Mesuré : Camphor 26px 400, rôles orange, noms blancs, en-têtes bleu Klein. |
| Pied | Mesuré : liens 13px blancs ; message « Tournez votre appareil » 13px. |
| Technique | Mesuré : polices chargées Camphor 200/400 et Inconsolata 400 ; 1 canvas (PixiJS, cité au générique). |
| Accueil « maintenir » et pages d'artistes | Non atteints (le panneau étroit a gelé avant le lancement) : restent décrits d'après les captures Awwwards. |

## Non mesuré

- Valeurs calculées seulement pour le texte HTML (polices, tailles, couleurs) ; tout le dessin est en canvas. Polices : Camphor (payante) → Figtree ; Inconsolata (gratuite) gardée telle quelle ; le lettrage peint reste Londrina Solid + filtre. Durée d'appui estimée.

## Écarts assumés

| Élément du site | Dans le skill | Raison |
|---|---|---|
| Bleu Klein #002fa7 sur noir (2,1:1) | `--blue-klein` décoratif, `--blue-light` pour tout texte | Contraste |
| Camphor (payante) | Figtree | Licence |
| Logo du label, artistes, pochettes, vidéos | Formes et contenu inventé | Marque et droits d'auteur |
| Bleu #2779a7 en petit texte (3,9:1) | `--blue-light` pour le petit texte | Lisibilité |
| Geste obligatoire | Alternative clic et flèches | Accessibilité |
| Vidéos et photos du label | Visuels de la démo : photos Unsplash libres (licence Unsplash), à remplacer par les images du projet | Droits ; les `<img>` du triptyque sont prêtes à devenir des `<video>` |
