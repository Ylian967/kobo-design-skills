# Cosmic Voyage — images et 3D

> Les images font la moitié du style. **Jamais** de personnage, de planète ou de décor dessiné en CSS ou SVG : de **vraies images**. Restent dessinés, parce que ce sont des signes : le logotype, les emblèmes de faction, les orbites, la frise dorée, les étoiles qui scintillent, les traits de l'hyperespace.

## 1. Ce que montrent les images du site de référence (relevé le 2026-10-03)

| Emplacement (`data-slot`) | Sur le site | Cadrage | Traitement |
|---|---|---|---|
| `key-visual` (héros) | l'illustration de la version en cours : personnages en plein saut, décor très coloré | plein écran, sujet à droite, ciel à gauche | fondu vers la nuit en bas |
| ciel de la page | champ d'étoiles bleu nuit avec quelques astres lumineux | plein fond | sous un dégradé `--bg-top` → `--bg` |
| `news-poster` | visuels d'annonce : personnages, bannières | 396 / 227 | coin haut droit arrondi |
| `chara-card` | personnage en buste, de face, fond sombre | 226 / 486 (très vertical) | fondu noir en bas pour le nom |
| `chara-full` (fiche) | le personnage en pied, en mouvement, avec éclats de couleur | portrait, débordant du panneau | fondu à gauche dans le verre |
| vignettes | visage serré | carré 48px | bord fin, doré si actif |
| `world-icon` | planète, station, monde sous bulle de verre | rond 64px | halo bleu |
| lieux d'un monde | paysages du monde | 16:9 | voisines assombries |

**Règle de cohérence** : la page est **bleu nuit et or** ; les images apportent les couleurs vives (rose, cyan, violet), toujours sur fond sombre.

## 2. Où les trouver

1. **L'art du projet** : visuel clé, personnages détourés, bannières d'annonce, icônes de mondes. Toujours en priorité.
2. **Banques gratuites** (en attendant) : [Unsplash](https://unsplash.com) (licence Unsplash). Mots-clés : « milky way silhouette », « nebula », « earth from space », « space station », « planet », « neon portrait » pour les personnages.
3. **Génération IA** — prompts de départ :
   - Visuel clé : > *anime key visual for a space fantasy RPG, two heroes leaping above a colorful futuristic city under a giant moon, vivid pastel sky, dynamic angle, 16:9, no text, no logo*
   - Personnage : > *anime character, half-body, facing the viewer, elegant sci-fi outfit, dark starry background, soft rim light, very vertical 1:2, no text*
   - Monde : > *small glowing planet inside a glass sphere, deep blue space, soft blue halo, centered, 1:1, no text*
4. **À éviter** : fonds clairs ou blancs derrière les personnages, photos de jour, images ternes, personnages d'un jeu existant.

## 3. Traitements (code)

```css
/* Héros : fondu vers la nuit */
.hero::after { background: linear-gradient(180deg, color-mix(in srgb, var(--bg) 55%, transparent), transparent 30%, transparent 60%, var(--bg)); }
/* Ciel : photo d'étoiles sous un dégradé et un halo bleu */
.night__sky img { opacity: .5; }
.night__sky::after { background: radial-gradient(70% 40% at 80% 30%, color-mix(in srgb, var(--bg-glow) 60%, transparent), transparent),
  linear-gradient(180deg, color-mix(in srgb, var(--bg-top) 70%, transparent), color-mix(in srgb, var(--bg) 80%, transparent)); }
/* Carte de personnage : fondu bas pour le nom */
.ccard::after { background: linear-gradient(180deg, transparent 55%, color-mix(in srgb, var(--bg-deep) 88%, transparent)); }
/* Fiche : le portrait se fond dans le verre */
.panel__art { -webkit-mask: linear-gradient(90deg, transparent, black 34%); mask: linear-gradient(90deg, transparent, black 34%); }
/* Monde : halo */
.world b { border-radius: 50%; box-shadow: 0 0 0 1px var(--orbit), 0 0 26px 6px var(--halo); }
```

## 4. Intégration

- Vrai `alt` sur le visuel du héros et le portrait de la fiche ; `alt=""` sur les cartes dont le lien porte déjà le titre ou le nom.
- Héros 2000px, cartes d'actualité 800 × 460, cartes de personnage 520 × 1118, fiche 900 × 1125, icônes 160px.
- Régler `object-position` pour garder le visage au-dessus du nom.
- **React Native / Expo** : `expo-image` ; coin unique avec `borderTopRightRadius: 28` ; orbites en `react-native-svg` ; panneau en dégradés (`expo-linear-gradient`).

## 5. 3D

Optionnelle. Deux usages qui servent le style : la **carte des mondes** en Three.js (sphères texturées, orbites en lignes, légère rotation au pointeur — voir `examples/mondes.html`) et l'**intro** en particules. Repli : les icônes rondes en images et l'intro en canvas 2D de la démo.
