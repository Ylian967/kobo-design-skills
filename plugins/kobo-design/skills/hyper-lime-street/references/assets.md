# Hyper Lime Street — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une photo, un personnage ou un objet : on utilise de vraies images (key art, illustrations, photos de rue). Les matières graphiques du style (rubans-pistes rayés, rayures à 45°, pellicule, pastilles, étiquettes) restent en CSS.

## 1. Ce que montrent les images

| Emplacement (`data-slot`) | Sujet | Cadrage / ratio | Lumière et ambiance | Traitement |
|---|---|---|---|---|
| `key-art` (héros) | Personnage(s) en action : saut de skate, course, pose de groupe | Paysage ≈ 2,3:1 dans un cadre au bord gauche coupé ; sujet au centre-haut, le bas laisse la place au logo | Plein jour dur ou néon, ciel ou mur coloré | Couleurs conservées, `contrast(1.12) saturate(.9)`, rayures `--hatch` à 45° + dégradé sombre en bas |
| `character-art` (bloc lime numéroté) | Le personnage actif, plan large | Remplit le bloc, sujet à gauche (le numéro est à droite) | Contre-jour, silhouette lisible | **Duotone noir → lime** : N&B contrasté en `mix-blend-mode: multiply` sur `--accent`, fondu lime vers la droite |
| vignettes du carrousel | Visage ou pose du personnage | 16:9 en parallélogramme (`skewX(-12deg)`, image contre-biaisée) | Identique | Couleurs ; contour lime si actif |
| `video-cover` | Lieu de l'histoire : tunnel, ruelle, toit, parking la nuit | Paysage, horizon au milieu (la bande d'infos passe à 30 %) | Sombre, une source chaude (jaune, sodium) | `contrast(1.1) saturate(.85)`, bande `rgb(17 17 17 / .78)` |
| `news-image` | Mur d'autocollants, affiche, détail urbain | 2:1, coins 24px, bas réservé au défilant | Jour | `contrast(1.1)` + étiquette lime en haut à gauche |

**Règle de cohérence** : des lieux et des gens de la rue, vus de près, jamais propres ni « stock » ; le lime n'apparaît dans une image que par le duotone ou les étiquettes, jamais par une photo déjà verte fluo.

## 2. Où les trouver

1. **Les images du projet** : key art, rendus des personnages, captures du jeu. Toujours en priorité.
2. **Banques gratuites** : [Unsplash](https://unsplash.com), [Pexels](https://www.pexels.com) (usage commercial permis, crédit apprécié). Mots-clés :
   - FR : « skate saut », « graffiti ruelle », « tunnel graffiti », « autocollants porte », « rue nuit néon », « parking béton ».
   - EN : « skateboard trick sky », « graffiti alley », « graffiti tunnel », « sticker covered door », « urban night street », « concrete skatepark », « streetwear crew ».
3. **Génération IA** — prompts de départ :
   - `key-art` :
     > Stylized urban action key visual, young street fighter mid-jump over a concrete wall, graffiti and sticker-covered city behind, strong midday sun, cel-shaded anime look with bold outlines, high contrast, wide 21:9, no text, no logo
   - `character-art` :
     > Full-body character in streetwear and headphones, dynamic pose, plain light grey background, hard rim light, high-contrast black and white, clean silhouette for duotone, 4:3, no text, no logo
   - `video-cover` :
     > Dark graffiti-covered underpass at night lit by one sodium-yellow lamp, wet floor reflections, cinematic wide 16:9, gritty, no people, no legible text, no logo
4. **À éviter** : personnages, logos ou captures d'un jeu existant ; photos de stock souriantes en studio ; tags lisibles portant un nom de marque ; images à dominante verte (elles se battent avec le lime) ; skate ou personnage dessiné en CSS.

## 3. Traitements (code)

```css
/* Duotone noir → lime sur le bloc numéroté */
.char-art { position: absolute; inset: 0; overflow: hidden; border-radius: inherit; background: var(--accent); }
.char-art img { width: 100%; height: 100%; object-fit: cover; object-position: 30% 40%;
  filter: grayscale(1) contrast(1.35) brightness(1.1); mix-blend-mode: multiply; }
.char-art::after { content: ""; position: absolute; inset: 0; background: linear-gradient(270deg, var(--accent) 10%, transparent 60%); } /* le numéro reste sur du lime pur */

/* Héros : photo + rayures 45° de la matière « piste » */
.hero__frame { position: relative; overflow: hidden; background: var(--ink); clip-path: polygon(8% 0, 100% 0, 100% 100%, 0 100%); }
.hero__frame img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; filter: contrast(1.12) saturate(.9); }
.hero__frame::after { content: ""; position: absolute; inset: 0;
  background: repeating-linear-gradient(var(--cut), var(--hatch) 0 2px, transparent 2px 14px), linear-gradient(0deg, rgb(17 17 17 / .45), transparent 40%); }

/* Vignette en parallélogramme, image contre-biaisée */
.thumb { overflow: hidden; transform: skewX(-12deg); background: var(--muted); }
.thumb img { width: 100%; height: 100%; object-fit: cover; transform: skewX(12deg) scale(1.2); }
```

Changement de personnage : l'image du bloc lime passe à opacité 0 (200ms `--ease`), change de `src`/`alt`, revient ; immédiat en mouvement réduit.

## 4. Intégration

- `<img>` avec `width`/`height`, `alt` qui décrit l'image (« Skateur en plein saut sur fond de ciel bleu »), `loading="lazy"` sauf le héros (`fetchpriority="high"`). Vignettes : `alt=""`, le bouton porte le nom.
- Formats : AVIF/WebP via `<picture>` ou un CDN ; héros ≤ 300 Ko.
- Repli : fond token sur chaque conteneur (`--ink` pour le héros, la vidéo et l'actu, `--accent` pour le duotone, `--muted` pour les vignettes) ; texte toujours sur bande ou étiquette pleine, donc lisible sans image.
- **React Native / Expo** : `expo-image` (`contentFit="cover"`, `placeholder` blurhash, `transition={200}`). Duotone : image N&B pré-traitée (CDN `?sat=-100`) posée sur une `View` `backgroundColor: accent` avec `mixBlendMode: 'multiply'` (RN ≥ 0.77), sinon un duotone pré-calculé côté serveur.

## 5. 3D

Optionnelle. Usage sobre qui sert le style : dans le bloc lime « Personnages », un modèle `.glb` du personnage en pose idle, rendu en `MeshToonMaterial` noir et blanc à 2 tons (pour rester dans le duotone) sur fond `--accent` transparent, qui tourne de ±25° en suivant le pointeur ; ou une planche de skate `.glb` qui fait un kickflip au survol du bouton « En savoir plus ». Modèles : ceux du projet, ou libres sur [Poly Pizza](https://poly.pizza) (rechercher « skateboard », CC0/CC-BY), [Quaternius](https://quaternius.com) (personnages CC0), [Kenney](https://kenney.nl/assets) (CC0). Web : Three.js ou React Three Fiber + drei (`useGLTF`, `Float`) ; React Native : `expo-gl` + `@react-three/fiber/native`. Repli : la photo duotone si WebGL est absent ou en mouvement réduit.
