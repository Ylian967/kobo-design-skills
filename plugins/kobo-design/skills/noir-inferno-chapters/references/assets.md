# Noir Inferno Chapters — images et 3D

> Les visuels font la moitié du style. On n'utilise **jamais** de dessin CSS ou SVG pour remplacer une scène. Seuls les signes restent en CSS : cercles, pointillés, croix, filets, grain, points de poussière.

Sur le site de référence, chaque scène est une **peinture numérique en noir et blanc**, découpée en plans (premier plan flou, sujet, fond brumeux) et animée. Le skill fonctionne avec des illustrations si le projet en a, sinon avec des **photos en noir et blanc**.

## 1. Ce que montrent les images

Une image par scène, plein écran, qui raconte **un lieu et une situation**, pas un détail :

| Type de scène | Sujet | Ce qu'il faut dans l'image |
|---|---|---|
| Rue, ville | Une rue la nuit, des réverbères dans la brume, une voiture | Une source de lumière diffuse, beaucoup de noir autour |
| Hauteur, vide | Falaise, promontoire, arbre isolé au-dessus du brouillard | Une grande zone claire et vide (le brouillard) |
| Foule | Silhouettes alignées, de dos ou à contre-jour | Des formes noires nettes sur un ciel gris |
| Forêt, labyrinthe | Troncs dans le brouillard | De la profondeur : plans de plus en plus pâles |
| Descente | Escalier, tunnel, couloir vers une lumière | Un point de fuite central |
| Menace | Mer d'orage, machine, ciel chargé | Du mouvement figé |
| Fin | Une silhouette seule dans une ouverture lumineuse | Un seul sujet, au centre |

**Contraintes communes**
- **Paysage**, 16:10, 1800px de large ; le centre de l'image doit rester lisible sous un texte blanc assombri.
- **Bords sombres** : un vignettage est ajouté, mais l'image doit déjà s'éteindre vers les bords.
- **Brume, contre-jour, silhouettes** : peu de détails, de grandes masses. Pas de visages reconnaissables.
- Toutes les images dans la **même gamme de gris** (ni sépia, ni bleuté).

## 2. Où les trouver

1. **Les illustrations du projet** : idéalement des peintures livrées en plans séparés (PNG transparents : premier plan, sujet, fond) pour retrouver la profondeur du site.
2. **Banques libres** : [Unsplash](https://unsplash.com), [Pexels](https://www.pexels.com). Recherches utiles : `foggy street night black and white`, `fog cliff black and white`, `crowd silhouette black and white`, `dark forest fog black and white`, `staircase dark black and white`, `stormy sea black and white`, `tunnel light silhouette`.
3. **Génération** — prompts de départ :
   > Black and white digital painting, night street in a foggy city, an old sedan stopped under a streetlight, a cyclist passing, large dark road sign in the foreground out of focus, soft volumetric light, visible brush texture, film grain, cinematic wide shot, no text, 16:10

   > Black and white digital painting, lone twisted pine on a cliff above a sea of fog, tiny figure at the edge, huge empty pale sky, soft painterly shapes, grain, 16:10
4. **À éviter** : photos en couleur simplement désaturées en CSS, images nettes et détaillées de type reportage, portraits de face, illustrations au trait.

## 3. Traitements

```js
// Noir et blanc fait par le serveur d'images
const U = id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1800&h=1125&q=70&sat=-100`;
```

```css
/* Vignettage et assombrissement : des dégradés fixes, pas de filtre */
.stage::after { background:
  radial-gradient(ellipse 75% 70% at 50% 50%, var(--veil-0) 35%, var(--veil-1)),
  linear-gradient(180deg, var(--veil-1), var(--veil-0) 22%, var(--veil-0) 72%, var(--veil-2)); }
.dim { background: var(--veil-1); }          /* posé sous le texte en état « titre » */
.grain { opacity: .13; }                     /* tuile de bruit de 200px, répétée */
```

- Avec des fichiers locaux : exporter les images **déjà en niveaux de gris**, contraste légèrement relevé, noirs à 5 % plutôt qu'à 0.
- Illustrations en plans : empiler les PNG dans la scène et donner à chacun un décalage à la souris différent (4, 10, 20px) ; flouter le premier plan **dans le fichier**, pas en CSS.
- La première image en `fetchpriority="high"`, les suivantes en `loading="lazy"`.

## 4. 3D (optionnel)

Le site d'origine utilise WebGL pour animer ses peintures (plans en profondeur, particules, personnages en boucle). À n'envisager que si le projet fournit des **illustrations découpées en plans** : Three.js, un plan texturé par calque, caméra qui glisse de quelques unités avec la souris, particules en `Points` ; 30 images/s au plus, résolution adaptée, rendu arrêté quand le panneau « à propos » est ouvert. Toujours garder le repli en images fixes décrit ici.

## 5. Photos de la démo (Unsplash, licence libre)

`photo-1607963090318-248f0f9065db` (rue dans la brume), `1568172253813-045eb1b4cd14` (falaise), `1607210173206-5de6655b67c8` (silhouettes), `1673083636285-9bed2bf9a884` (forêt), `1743469347507-69f5cc7adb8f` (escalier), `1514695307237-bfad60f67684` (mer d'orage), `1490668219599-a79d4d90cf66` (tunnel). À remplacer par les images du projet.
