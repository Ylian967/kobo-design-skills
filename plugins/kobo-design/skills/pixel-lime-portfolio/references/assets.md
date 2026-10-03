# Pixel Lime Portfolio — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer un portrait ou un visuel de projet. Restent en CSS / SVG / canvas les **gestes graphiques** : mosaïque de pixels, ovales au feutre, surlignages, autocollants, perforations, quadrillage.

Toutes les photos sont en **noir et blanc** : la seule couleur de la page est le lime, et elle n'appartient jamais à une image.

## 1. Ce que montrent les images

| Emplacement | Sujet | Cadrage | Notes |
|---|---|---|---|
| `hero` | **Un portrait pris sur le vif** : la personne dans une voiture, à une fenêtre, dans la rue ; de profil ou de trois quarts, pas de pose | Paysage 3:2, 1800px ; visage au centre de l'image, à mi-hauteur : la mosaïque passe devant | Noir et blanc contrasté, grain ; bas de l'image sombre (le nom blanc s'y pose) |
| Vignettes de projets | Le travail réalisé : affiche, spécimen typographique, écran de téléphone, emballage, identité | ≈ carré (20:19), 700px | En noir et blanc, sur fond neutre ; **pas de logos de marques existantes** |
| Photo des récompenses | Second portrait, même série que le héros | ≈ carré, 700px | Reçoit une petite mosaïque |

**Cohérence** : mêmes noirs profonds et même grain sur tous les portraits ; les vignettes de projets peuvent être plus nettes, mais restent sans couleur.

## 2. Où les trouver

1. **Les images de la personne** : un reportage d'une demi-journée en noir et blanc suffit (deux ou trois portraits sur le vif). Les visuels de projets sont les siens.
2. **Banques libres** : [Unsplash](https://unsplash.com), [Pexels](https://www.pexels.com). Recherches utiles : `portrait cap car window`, `portrait black and white street candid`, `poster typography design`, `phone app mockup`, `stationery branding black`, `brand identity mockup`.
3. **Génération** — prompts de départ :
   > Black and white candid photograph, young person in a baseball cap sitting in the passenger seat of an old car, looking out of the window, rear-view mirror in frame, strong grain, high contrast, 35mm, shot from the back seat, no text, 3:2

   > Black and white product shot of a brand identity system: posters, business cards and a phone screen arranged on a dark surface, bold geometric logo, studio light, square
4. **À éviter** : portraits posés de studio, photos en couleur, selfies, visuels de projets remplis de couleurs (les désaturer), logos de marques réelles.

## 3. Traitements

```js
// Noir et blanc par le serveur d'images
`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1800&h=1170&q=75&sat=-100`
```

```css
.hero > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.hero::after { background: linear-gradient(0deg, var(--veil), var(--veil-0) 40%), linear-gradient(180deg, var(--veil), var(--veil-0) 16%); }  /* sous le nom et la navigation */
```

- Avec des fichiers locaux : exporter en niveaux de gris, contraste relevé, un léger grain dans le fichier.
- Aucun `filter` CSS, aucun mode de fusion sur les photos.
- `fetchpriority="high"` pour le portrait du héros, `loading="lazy"` ailleurs.
- Texte alternatif : ce que montre l'image (« Portrait en noir et blanc : une personne en casquette regarde par la vitre d'une voiture »).

## 4. Gestes graphiques (code, pas des images)

```html
<!-- Ovale au feutre : un seul symbole SVG, étiré sur n'importe quel groupe de mots -->
<symbol id="oval" viewBox="0 0 200 60" preserveAspectRatio="none">
  <path pathLength="1" vector-effect="non-scaling-stroke"
        d="M14 34C8 14 60 4 112 5c52 1 82 12 80 28-2 17-54 24-104 22C44 53 4 46 9 28c3-10 30-17 62-20"/>
</symbol>
<span class="ring">peu plus belles<svg aria-hidden="true"><use href="#oval"/></svg></span>
```

```css
/* Quadrillage de 17 colonnes */
.gridded { background-image: linear-gradient(var(--g) 1px, transparent 1px), linear-gradient(90deg, var(--g) 1px, transparent 1px);
  background-size: var(--cell) var(--cell); }
/* Perforations d'une fiche */
.note::before { background: radial-gradient(circle, var(--ink) 3.2px, transparent 3.6px) 0 9px / 7px 43px repeat-y; }
```

La **mosaïque** est tirée au hasard avec une graine fixe (le dessin est le même à chaque visite) ; pour une forme précise (un mot, une silhouette), remplacer le tirage par une matrice de 0 et de 1.

## 5. 3D (optionnel)

Le style n'en a pas besoin. Si un projet du portfolio est un objet (emballage, produit), il peut être montré en 3D dans une case de la grille : Three.js, fond `--paper`, matériaux gris (pas de couleur), rotation au survol, 30 images/s au plus, rendu arrêté hors écran.

## 6. Photos de la démo (Unsplash, licence libre)

Héros : `photo-1780909863720-07b2acbc2cad`. Récompenses : `1763674999861-2672aa24e969`. Projets : `1610454059909-f9a5a6eb4e58`, `1627542557169-5ed71c66ed85`, `1696603975280-74ac56b87bc9`. À remplacer par les images du projet.
