# Hold To Play Music — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo d'artiste, une vidéo ou une pochette. Restent en SVG ou en police : le logo du label, les pictogrammes, la touche, et le **lettrage peint** (c'est de la typographie).

Sur le site de référence, le fond est fait de **vidéos** : extraits de clips en noir et blanc sur l'accueil, en couleur pendant l'appui, puis une scène propre à chaque artiste (clip, illustration animée, photo). La démo utilise des photos ; le code accepte des `<video>` aux mêmes emplacements.

## 1. Ce que montrent les images

| Emplacement | Sujet | Cadrage | Traitement |
|---|---|---|---|
| Plans d'accueil | Un musicien ou un instrument en action : chanteuse au micro, guitariste de dos aux projecteurs, mains sur un clavier, batterie, platine | Paysage, **sujet décentré**, le centre et le bas restent sombres (mot peint et consigne) | Noir et blanc, voile noir à 45 %, grain |
| Plans d'appui | Les mêmes images en couleur, couleurs franches (rouge, rose, violet, jaune) | Idem | Aucun voile supplémentaire (35 %) |
| Scène d'artiste | L'image de l'artiste : portrait, scène, objet | Plein écran | Grise au repos, couleur quand on maintient la touche de scène |
| Pochette | Visuel carré de l'album : peinture abstraite, photo, illustration | 1:1, 300px (vignette) et 900px (ouverte) | Aucun |
| Lettrage | Le mot-titre peint à la main | — | Voir § 3 |

**Cohérence** : des images de concert et de studio à forts contrastes, éclairées par des projecteurs ou des néons ; pas de photos de groupe posées en plein jour, pas d'images sans rapport avec la musique. Six à dix plans suffisent : ils servent à la fois à l'accueil (gris) et à l'appui (couleur).

## 2. Où les trouver

1. **Le fonds du label ou de l'artiste** : clips, captations, photos de presse, pochettes. Toujours en priorité, et c'est là que le style prend son sens.
2. **Banques libres** : [Unsplash](https://unsplash.com), [Pexels](https://www.pexels.com) (Pexels propose aussi des vidéos libres). Recherches utiles : `concert singer stage`, `guitarist stage`, `drummer live`, `synthesizer musician`, `dj vinyl turntable`, `singer portrait neon`, et `abstract paint colorful` pour les pochettes.
3. **Génération** — prompts de départ :
   > Live concert photograph, singer at the microphone seen from the side, a single vertical neon tube behind her, deep red and blue stage light, haze, strong contrast, shallow depth of field, grain, no text, 16:9

   > Square album cover, abstract acrylic painting, thick palette-knife strokes in orange, cobalt blue and off-white, visible canvas texture, no text
4. **À éviter** : logos et visages d'artistes réels sans droits, pochettes existantes, images de banque « musique » trop propres (casque sur fond blanc), captures de clips protégés.

## 3. Le lettrage peint

Le mot-titre du site est un **vrai lettrage** peint au pinceau, découpé en traits bleus, orange et blancs qui s'assemblent. Deux façons de l'obtenir :

- **Idéal** : faire peindre le mot (gouache, pinceau plat, lettres hautes et étroites), le scanner, le vectoriser lettre par lettre en SVG, une couleur par lettre. Chaque lettre devient un `<span>` contenant son SVG ; l'animation d'assemblage reste la même.
- **Repli de la démo** : police `Londrina Solid` 900, lettres étirées (`scaleY` ≈ 1.9), inclinées chacune différemment, bords déformés par un filtre SVG :

```html
<filter id="rough" x="-5%" y="-10%" width="110%" height="120%">
  <feTurbulence type="fractalNoise" baseFrequency="0.035 0.12" numOctaves="2" seed="7" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G"/>
</filter>
```

## 4. Traitements

```js
// Deux fichiers par photo : le gris est fait par le serveur d'images, pas en CSS
gray.src  = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=70&sat=-100`;
color.src = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=70`;
```

```css
.shots::after { content: ""; position: absolute; inset: 0; background: var(--veil); }   /* lisibilité du texte */
.grain { opacity: .16; }                                                               /* tuile de bruit de 256px, fixe */
```

- Avec des fichiers locaux, exporter soi-même une version grise de chaque image (ou vidéo) plutôt que d'utiliser `filter: grayscale()` sur du plein écran.
- **Vidéos** : `<video muted playsinline loop preload="metadata">` aux mêmes emplacements que les `<img>` ; ne lancer `play()` que sur le plan visible, mettre les autres en pause ; 720p et 1 à 2 Mbit/s suffisent sous le voile et le grain.
- **Son** : le site joue un extrait par artiste. Ne jamais le démarrer avant un geste de l'utilisateur ; l'appui sur la touche est ce geste.

## 5. 3D (optionnel)

Le style n'en a pas besoin. Le site dessine ses scènes d'artistes en 2D (PixiJS). Si le projet veut une scène interactive par artiste, la traiter comme un calque plein écran à la place de la photo (canvas 2D ou Three.js), mise en pause dès qu'elle n'est plus l'artiste affiché, 30 images/s au plus.

## 6. Photos de la démo (Unsplash, licence libre)

Artistes : `photo-1615748562188-07be820cff5b` (chanteuse au néon), `1499424017184-418f6808abf9` (guitariste), `1524578471438-cdd96d68d82c` (clavier), `1568153354382-6bcd1d46568b` (batterie), `1616681255209-368a2cd3e643` (vinyle). Pochettes : `1533208087231-c3618eab623c`, `1532640331846-d2da5987c3ee`, `1562619371-b67725b6fde2`, `1547560789-365538e5b23e`, `1524664399170-77e7118fdb6d`. À remplacer par les images du projet.
