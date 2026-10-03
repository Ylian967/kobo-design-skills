# Retro Mission Poster — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer un paysage, un véhicule ou une machine. Seuls les signes restent en CSS / SVG : cadre, anneau dentelé, flèches, traits du menu, filets.

Sur le site d'origine, chaque chapitre était une **scène 3D stylisée** (désert rouge, voiture ancienne, ciel strié) au rendu d'affiche de voyage. Le skill obtient ce rendu à partir de **photos**, redessinées en aplats.

## 1. Ce que montrent les images

| Chapitre | Sujet | Ce qu'il faut dans la photo |
|---|---|---|
| Ouverture | Un **véhicule ancien** dans un désert de roche rouge | Le sujet dans la moitié gauche ou au centre bas ; une zone unie (ciel, colline) pour le titre |
| Mission | Une route droite vers des falaises | Un grand ciel bleu : il deviendra sarcelle |
| Procédé | Une installation industrielle : colonnes, cuves, tuyaux | Des silhouettes nettes sur un ciel clair |
| Ciel | Un avion vu d'en dessous, des traînées | Un ciel uni ; le mot géant passe derrière |
| Conclusion | Un soleil bas sur l'horizon | De grandes masses simples |
| Journal | Les mêmes sujets, cadrés plus serré | Ratio 1 : 0.627 |

**Contraintes** : paysage, 1600px de large ; **de grandes masses et peu de détails** (l'effet d'affiche écrase les textures fines) ; lumière franche ; pas de personnes en gros plan.

## 2. Où les trouver

1. **Les images du projet** : photos de sites, de véhicules, rendus 3D. Toujours en priorité.
2. **Banques libres** : [Unsplash](https://unsplash.com), [Pexels](https://www.pexels.com). Recherches utiles : `vintage car desert road`, `desert highway red rock`, `refinery industrial sunset`, `airplane sky contrail`, `desert dunes sunset`.
3. **Génération** — prompt de départ :
   > Vintage travel poster illustration, a 1960s muscle car seen from behind on a red desert road, streaked teal sky, distant pale mesas, flat colour areas with a coarse print grain, limited palette of rust, cream and deep teal, no text, 16:10
4. **À éviter** : photos de nuit, images très détaillées (foules, feuillages), couleurs hors gamme (vert vif, violet), logos de marques sur les véhicules.

## 3. L'effet d'affiche (calculé une fois)

```js
// Pour chaque pixel : luminance réduite à 7 niveaux, puis trois tons (ombre → terre → lumière) ;
// les zones bleues de la photo deviennent le ciel sarcelle ; on garde 22 % de la photo et on ajoute le grain.
let l = Math.round((r * .299 + g * .587 + b * .114) / 255 * 7) / 7;
const cool = Math.max(0, Math.min(1, (b - r) / 70 + .15));
const warm = l < .5 ? mix(dark, mid, l * 2) : mix(mid, light, (l - .5) * 2);
const cold = mix(sky, pale, l);
pixel = mix(mix(warm, cold, cool), original, .22) + grain;
```

- Les cinq tons viennent des tokens (`--rust-deep`, `--rust`, `--sand`, `--sky`, `--sky-pale`) : changer la palette change toutes les affiches.
- L'image est chargée avec `crossorigin="anonymous"` (nécessaire pour lire ses pixels) ; le canvas est ensuite converti en image (`toBlob`) qui remplace la photo. Si la lecture échoue, la photo d'origine reste affichée.
- Canvas de 1200px de large au plus : suffisant sous le grain.
- Pour un site en production : **préparer les affiches à l'avance** (même calcul dans un script, ou dans un logiciel d'image : postérisation + courbe de transfert de dégradé + grain) et servir des JPEG.

## 4. Autres traitements

```css
.chapter::after { background: linear-gradient(180deg, var(--veil-0) 55%, var(--veil-1)); }   /* sous l'accroche */
.frame { border: var(--frame) solid var(--cream); }
```

Texte alternatif : ce que montre l'image (« Voiture ancienne claire arrêtée dans un désert de roche rouge »). `fetchpriority="high"` pour la première, `loading="lazy"` ensuite.

## 5. 3D (optionnel)

C'était la forme d'origine : une scène WebGL par chapitre, caméra qui avance au défilement, rendu en aplats avec grain. À n'envisager qu'avec de vrais modèles (véhicule, décor) : Three.js, matériaux « toon » à trois tons pris dans les tokens, pas d'ombres dynamiques, 30 images/s au plus, rendu arrêté hors écran, repli sur les affiches fixes décrites ici.

## 6. Photos de la démo (Unsplash, licence libre)

`photo-1765211003684-d09c736eebe7` (voiture ancienne), `1770816149208-60206f8527aa` (route et falaises), `1786532852011-443cba5dc9fe` (usine), `1517258922744-606330ad6639` (avion), `1621025975976-54ffaad6b8a5` (soleil sur le désert) ; journal : `1765211003564-c13a09328f0a`, `1786532852258-8305f40f9925`. À remplacer par les images du projet.
