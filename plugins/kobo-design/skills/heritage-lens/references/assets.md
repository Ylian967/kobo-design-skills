# Heritage Lens — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer un monument, un paysage ou une œuvre. Seuls les signes restent en SVG : ornement en dentelle, flèches, croix, pictogrammes des boutons.

Sur le site de référence, chaque scène est une **reconstitution 3D** du lieu tel qu'il était, et la lentille montre une **photo de l'état actuel**. Le skill fonctionne avec l'un ou l'autre : des reconstitutions si le projet en a, sinon des photos — la lentille révèle alors une autre vue du même lieu (de nuit, de près, d'en bas, une gravure ancienne).

## 1. Ce que montrent les images

| Emplacement | Sujet | Cadrage | Lumière |
|---|---|---|---|
| Prologue A | Paysage vide et calme autour du site : un arbre, une plaine, de la brume. Aucun monument | Paysage, sujet centré bas, **beaucoup de ciel** (les phrases s'y posent) | Voilée ; elle passe sous un calque bleu nuit |
| Prologue B / titre | Le même pays en lumière dorée, reliefs au loin | Paysage, horizon au tiers haut, centre dégagé pour le mot géant | Fin de journée |
| Chapitre, photo A | L'approche : le lieu vu de loin ou par une ouverture (défilé, porte, allée) | Plein cadre, sujet au centre : la photo grossit jusqu'à 1.3 | Contrastée, zones sombres bienvenues |
| Chapitre, photo B | Le monument de près, de face | Plein cadre ; la **moitié droite** reçoit le texte (elle sera assombrie) | Chaude |
| Lentille / vue révélée | Le **même lieu autrement** : état actuel, nuit, détail, contre-plongée, archive | Carré 400px pour la lentille, plein cadre 1600px pour la vue | Différente de la scène, pour que la révélation se voie |
| Page éditoriale | Une image d'ouverture verticale ; des œuvres ou détails | 4:5 pour l'ouverture, 3:4 pour les œuvres | Neutre, façon musée |
| Fin | Vue d'ensemble apaisée | Portrait ou carré | Crépuscule |

**Cohérence** : une seule gamme chaude (ocre, rose, brun) ; pas de ciel blanc ; pas de foule ni de véhicule au premier plan ; les deux photos d'un chapitre montrent le même endroit.

## 2. Où les trouver

1. **Les images du projet** : reconstitutions, relevés, photographies de fouilles, fonds du musée. Toujours en priorité, avec leurs crédits dans les légendes.
2. **Fonds ouverts** : [Wikimedia Commons](https://commons.wikimedia.org), les collections en libre accès de musées (Getty Open Content, Met Open Access, Rijksmuseum) pour les œuvres et les gravures anciennes.
3. **Banques libres** : [Unsplash](https://unsplash.com), [Pexels](https://www.pexels.com). Chercher le nom du lieu, puis `<lieu> by night`, `<lieu> detail`, `<lieu> landscape`, `desert tree fog`, `ruins golden hour`.
4. **Génération** — prompts de départ :
   > Photorealistic reconstruction of an ancient ceremonial gateway as it stood two thousand years ago, painted plaster and coloured friezes intact, warm low sunlight, long shadows, seen from the ground at eye level, no people, no text, 16:9

   > Misty pre-dawn landscape, a single acacia tree on a dry plain, distant cliffs fading into blue fog, muted desaturated palette, wide shot with a large empty sky, 16:9
5. **À éviter** : photos de vacances avec touristes au premier plan, filtres saturés, images d'un site ou d'une institution existante reprises telles quelles, reconstitutions de jeu vidéo sans rapport avec le lieu.

## 3. Traitements

```css
.layer img { width: 100%; height: 100%; object-fit: cover; }
.veil.night { background: var(--night-veil); }     /* brume bleue du prologue, opacité pilotée par le défilement */
.veil.read  { background:
  radial-gradient(ellipse 60% 55% at 50% 52%, var(--veil-1), var(--veil-0) 70%),             /* sous le texte centré */
  linear-gradient(180deg, var(--veil-1), var(--veil-0) 22%, var(--veil-0) 70%, var(--veil-2)); } /* haut et bas, sous les commandes */
.veil.side  { background: linear-gradient(90deg, var(--veil-0) 30%, var(--veil-1) 62%, var(--veil-2)); } /* sous le point d'intérêt */
```

- **Aucun filtre CSS sur les photos** (ni `filter`, ni mode de fusion) : l'ambiance vient du choix des images et des voiles en dégradé.
- Tailles : 2000px pour les scènes, 1600px pour les vues révélées, 400px carré pour les lentilles, 700px pour les œuvres. Première photo en `fetchpriority="high"`, les autres en `loading="lazy"`.
- Texte alternatif : ce que l'on voit (« Le défilé du Siq, deux parois sombres et une fente de lumière »), vide pour la copie décorative du titre.

## 4. 3D (optionnel)

C'est la forme d'origine du site : scène WebGL, caméra sur rail pilotée par le défilement. À n'envisager que si le projet possède **un modèle 3D du lieu** (`.glb`) :

- Three.js, une courbe de caméra (`CatmullRomCurve3`) parcourue selon la progression de la scène ; les blocs de texte gardent le même système `data-on`.
- Matériaux simples (Lambert), lumière chaude directionnelle + ciel en image ; pas de reflets calculés ni d'ombres dynamiques ; 30 images/s au plus, résolution adaptée, rendu arrêté hors écran.
- Toujours prévoir le repli en photos décrit ici (mobile, mouvement réduit, WebGL absent).

## 5. Photos de la démo (Unsplash, licence libre)

Prologue : `photo-1543964198-d54e4f0e44e3` (arbre dans la brume), `photo-1709599349283-9e207d6b2d99` (désert doré). Le Siq : `1714577744181-735bd0b2dff7`, `1643388820565-ddf8532d30ae`. Le Trésor : `1764869870536-66a550424d32`, `1691783639104-806ca12a9a8f`, de nuit `1606210122158-eeb10e0823bf`. Le Monastère : `1783696663079-cf5b55122031`, `1677752512557-a29806af5c38`. Les autres identifiants sont dans `examples/demo.html`. À remplacer par les images du projet.
