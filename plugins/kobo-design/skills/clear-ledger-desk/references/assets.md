# Clear Ledger Desk — images et 3D

## 1. Ce que montrent les images

Presque rien, et c'est voulu. Un outil de travail n'a ni photo d'ambiance ni illustration de marque. Trois sortes d'images seulement :

| Image | Forme | Règle |
|---|---|---|
| **Portrait d'une personne** (responsable, contact) | rond de 24 px, 32 px dans une fiche | une vraie photo ; en repli, les initiales sur `--neutral` |
| **Vignette d'un compte** (entreprise cliente) | carré de 48 px, rayon 8 px | l'initiale en `--accent` sur `--selected`, ou le logo que le client fournit |
| **Illustration d'état vide** (facultative) | 120 px au plus, au trait | un seul ton neutre ; jamais indispensable : le titre et la phrase suffisent |

## 2. Où les trouver

- Portraits de démonstration : photos libres (Unsplash), recadrées sur le visage (`fit=facearea`), 96 px pour un affichage à 24 px. Elles n'ont **aucun lien** avec les noms fictifs affichés : le dire dans la démo.
- En production : les photos viennent des comptes des utilisateurs. Prévoir le repli en initiales.
- Icônes : un jeu libre au trait (Lucide, Tabler, Phosphor en version « regular »), ou des tracés écrits à la main comme dans la démo. **Jamais** les icônes d'un design system propriétaire.

## 3. Traitements (code)

```css
.avatar { width: 1.5rem; height: 1.5rem; border-radius: var(--r-pill); object-fit: cover; background: var(--neutral); }
svg.i { width: 1rem; height: 1rem; fill: none; stroke: currentColor; stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; }
```

Aucun filtre, aucun fondu, aucune ombre sur une image.

## 4. Intégration

- Un portrait à côté d'un nom est décoratif : `alt=""`, le nom est écrit.
- Une icône seule dans un bouton : le bouton porte `aria-label`.
- `width`, `height` et `loading="lazy"` sur chaque portrait d'une liste.

## 5. 3D

Aucune. Un graphique reste en HTML et CSS (barres horizontales) tant qu'il tient en une répartition simple ; au-delà, une bibliothèque de graphiques, en gardant les gris et en réservant la couleur aux états.
