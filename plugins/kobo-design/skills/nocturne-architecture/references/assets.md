# Nocturne Architecture — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo de ville, de maison ou d'intérieur. Seuls les signes restent en SVG ou CSS : triangle de lecture, chevrons, signe du studio, points, filets.

Toute la page est noire ; ce sont les photos qui apportent la lumière. Elles sont prises **à la tombée de la nuit ou de nuit** : ciel bleu profond, fenêtres allumées, reflets.

## 1. Ce que montrent les images

| Emplacement | Sujet | Cadrage | Lumière |
|---|---|---|---|
| `hero` | Une ville la nuit : immeubles aux fenêtres éclairées, traînées de phares en pose longue | Paysage 3:2, 2200px ; le **tiers bas plutôt sombre ou simple** (le mot-marque blanc s'y pose), le coin haut gauche calme (texte) | Dominante bleue, quelques points chauds |
| Cartes de biens | Une maison par carte, entière, de trois quarts | ≈ 19:20 (presque carré), sujet au centre haut ; le bas reçoit le nom | Heure bleue, intérieur éclairé |
| Étapes | Une vue large et calme : piscine, terrasse, façade | Paysage 15:7 | Crépuscule |
| Panneau « méthode » | Un détail d'architecture : angle de verre, façade | 5:4, petite | **De jour** : c'est l'une des deux respirations claires |
| Carte film | Un intérieur sombre, matières visibles | Paysage 5:3, 2000px ; bas gauche lisible sous la phrase | Très sombre, lumière rasante |
| Articles | Architecture blanche, minimaliste | ≈ 4:3 | **De jour**, ciel clair : contraste voulu avec le reste de la page |

**Cohérence** : pas de personnages au premier plan, verticales droites, pas d'images HDR. Les photos de nuit dominent ; le jour n'apparaît que dans le panneau « méthode » et le journal.

## 2. Où les trouver

1. **Les photos du studio** : reportages de fin de chantier, faits à l'heure bleue. Toujours en priorité.
2. **Banques libres** : [Unsplash](https://unsplash.com), [Pexels](https://www.pexels.com). Recherches utiles : `city long exposure night traffic`, `city night apartment building blue`, `modern house night exterior`, `house pool dusk`, `dark interior living room`, `white architecture minimal`, `glass building corner sky`.
3. **Génération** — prompts de départ :
   > Night cityscape, long exposure, light trails of traffic curving along a wide avenue, tall apartment blocks with scattered lit windows, cold deep blue tones, light mist, shot from a rooftop, no text, 3:2

   > Architectural photograph of a contemporary dark timber house at blue hour, warm interior lights on, pool in the foreground, deep blue sky, straight verticals, no people, almost square
4. **À éviter** : photos de plein jour dans le héros ou les cartes de biens, néons multicolores, rendus 3D trop lisses, images d'un studio ou d'un promoteur existant.

## 3. Traitements

```css
/* Voile fixe sous le texte : en haut et à gauche du héros, en bas des cartes */
.hero::after { background: linear-gradient(180deg, var(--veil), var(--veil-0) 30%), linear-gradient(90deg, var(--veil), var(--veil-0) 55%); }
.card::after  { background: linear-gradient(0deg, var(--veil), var(--veil-0) 45%); }
.reel::after  { background: linear-gradient(0deg, var(--veil), var(--veil-0) 55%); }
img { width: 100%; height: 100%; object-fit: cover; }
```

- **Aucun filtre de couleur** : choisir des photos déjà sombres et bleues plutôt que d'assombrir en CSS.
- Le mot-marque blanc doit rester lisible : si le bas de la photo du héros est clair, changer de photo ou la recadrer.
- Fond de repli des conteneurs : `--night` (héros) ou `--panel` (cartes).
- Tailles : 2200px (héros), 2000px (film), 1500px (étapes), 900px (cartes). `fetchpriority="high"` pour le héros, `loading="lazy"` ailleurs.
- Texte alternatif : le lieu et la lumière (« Chalet contemporain éclairé à la tombée de la nuit »).

## 4. 3D (optionnel)

Le style n'en a pas besoin. Si le studio possède une **maquette 3D d'un projet** (`.glb`), elle peut remplacer la photo d'une étape ou la carte film : Three.js, fond `--bg`, matériaux mats, une seule lumière chaude venant de l'intérieur du bâtiment, rotation lente au glisser, 30 images/s au plus, rendu arrêté hors écran.

## 5. Photos de la démo (Unsplash, licence libre)

Héros : `photo-1470723710355-95304d8aece4`. Biens : `1568605114967-8130f3a36994`, `1706164971302-e30c0640cc3b`, `1608619769165-25647672335f`, `1544984243-ec57ea16fe25`. Étapes : `1598924957326-0446ac30341e`, `1748063578185-3d68121b11ff`, `1706164971309-fb4785fe6ceb`. Méthode : `1550136513-548af4445338`. Film : `1790193719924-864e0c4d22af`. Journal : `1543067362-3756ae0bafa7`, `1483366774565-c783b9f70e2c`. À remplacer par les images du projet.
