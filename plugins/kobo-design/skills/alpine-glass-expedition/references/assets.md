# Alpine Glass Expedition — images et 3D

> Les photos font la moitié du style. **Jamais** de montagne, de personne, de tente ou de refuge dessinés en CSS, SVG ou canvas : ce sont de **vraies photos**, refroidies. Seuls les signes d'interface restent dessinés : logo, flèche, triangle de lecture, étoile, profil d'altitude (c'est un graphique), nappes de brume et flocons ajoutés par-dessus la photo.

## 1. Ce que montre l'image de référence (relevé)

Un **alpiniste vu de face, de près**, casque orange, lunettes, bâtons, cordes au baudrier, qui descend une pente de neige dans la **brume**. La photo est presque **monochrome bleu-gris** : brume très claire en haut à gauche (`--mist`, `--haze`), ombre bleue qui gagne en diagonale vers le bas à droite (`--ridge`), bas de l'image bleu nuit uni (`--deep`). **Un seul objet chaud** : le casque orange. La personne occupe le centre gauche (≈ 30 à 52 % de la largeur), de la nav jusqu'au titre, qui passe devant ses jambes.

| Emplacement (`data-slot`) | Sujet | Cadrage | Traitement |
|---|---|---|---|
| `hero-climber` (héros) | une personne en montagne, **de près**, dans la neige ou la brume, avec un vêtement ou un sac de couleur chaude | paysage 4:3 ou 3:2, ≥ 2000px ; sujet au centre, **haut de l'image clair** | rampe froide + voile diagonal + brume et neige |
| `trip-photo` (cartes) | un lieu ou une scène par séjour : arête dans le vent, cordée sur glacier, tentes sur la neige, raquettes en forêt | portrait 3:4.3, 900px | rampe froide, voile haut et bas |
| `route-photo` (film) | étapes du voyage : cabane, sommet dans les nuages, refuge | 4:3, 1400px | rampe froide, voile bas |
| `guide-portrait` | portrait d'un guide, en extérieur | carré 480px, visage centré | rampe froide, cadre rond |
| `final-photo` | parois dans la brume, sans personne | paysage, 1800px | rampe froide, voile vertical fort |

**Pourquoi un haut clair** : la nav, le logo et le texte du bouton lecture sont **sombres** et se posent sur la brume. Une photo au ciel sombre les rend illisibles.

## 2. Où les trouver

1. **Les images du projet** : photos de l'agence ou du guide, avec autorisation des personnes reconnaissables.
2. **Banques gratuites** : [Unsplash](https://unsplash.com) (licence Unsplash, usage commercial permis ; `images.unsplash.com` autorise le CORS, nécessaire pour le canvas). Mots-clés : « ski touring fog », « mountaineer snow », « alpinist ice axe », « glacier trek », « winter camping tent snow », « snowshoe hiking », « mountain hut snow », « mountain guide portrait ».
3. **Génération IA** — prompts de départ :
   - Héros : > *photo of a mountaineer seen up close walking down a snowy slope in thick fog, orange helmet, ski goggles, trekking poles, ropes on harness, cold blue-grey monochrome, bright mist in the upper left, deep blue shadow in the lower right, 4:3, no text*
   - Carte : > *photo of two small tents on a snowfield above a sea of clouds at dusk, cold blue tones, vertical 3:4, no text, no logo*
4. **À éviter** : couchers de soleil orange, forêts vertes, ciels bleu vif, personnes minuscules dans un paysage (le héros est un portrait en action), photos au ciel sombre en haut.

## 3. Traitement (code)

Chaque pixel est ramené vers la **rampe du skill** selon sa luminance ; les pixels **chauds et saturés** sont épargnés.

```js
const STOPS = ['--abyss', '--deep', '--ridge', '--slate', '--steel', '--haze', '--mist', '--white']; // du plus sombre au plus clair
const L = r * .3 + g * .59 + b * .11;                               // 0…255
const warm = clamp01((r - b - 46) / 70);                            // 1 = orange, rouge, jaune francs
const k = .74 * (1 - warm);                                         // force du refroidissement
out = orig + (rampe[L] - orig) * k;
```
- Calcul **une fois** au chargement (photo ramenée à 1600px de large au plus), résultat remis dans le `<img>` par `toBlob` : l'`alt`, `object-fit` et le chargement différé restent ceux d'une image normale. Détail dans `motion.md`.
- Réglages : `.74` = force (0,6 plus naturel, 0,9 presque monochrome) ; `46` = seuil de chaleur (plus haut : seuls les orange vifs survivent).
- **Repli 1** (avant le calcul, ou canvas refusé) : `filter: saturate(.45) brightness(.96)`.
- **Repli 2** (image absente) : dégradé diagonal des tokens ; la page reste lisible.
- En production, on peut livrer des images **déjà refroidies** (même rampe, côté serveur ou dans l'outil photo) et supprimer le script.

## 4. Intégration

- `crossorigin="anonymous"` et `data-grade` sur chaque `<img>` ; vrai `alt` qui décrit la scène.
- Photo du héros : `fetchpriority="high"`, dans un conteneur plus grand que l'écran (130 % × 108 %) pour la parallaxe ; régler `object-position` pour garder la personne entre 40 et 50 % de la largeur.
- Poids : héros JPEG/WebP 2000px ≤ 350 Ko ; cartes 900px ≤ 120 Ko ; `loading="lazy" decoding="async"` hors héros.
- **React / Next** : calcul dans un `useEffect` après `onLoad`, ou images déjà refroidies avec `next/image`.
- **React Native / Expo** : images **déjà refroidies**, `expo-image` ; voile diagonal avec `expo-linear-gradient` (`start={{x:.2,y:0}} end={{x:.8,y:1}}`).

## 5. 3D

Pas de 3D attendue : le style est photographique. Option sobre : une **carte de relief** (Three.js, plan déformé par une carte de hauteur, fil de fer `--haze` sur `--deep`) dans la section itinéraire, à la place du profil d'altitude. Ne jamais remplacer la photo du héros par une montagne en 3D.
