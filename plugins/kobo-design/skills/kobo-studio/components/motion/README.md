# Couche mouvement

Les mouvements signature d'un skill, posés sur les composants, les structures et les gabarits du kit. Les composants restent neutres ; la couche de signature (`../signatures/`) donne les formes et les survols ; cette couche ajoute ce qui **se passe dans le temps** : entrée de page, révélations au défilement, effets de texte.

| Fichier | Rôle |
|---|---|
| `motion.js` | Le moteur commun : une seule boucle d'animation, pause hors écran, intensité, mouvement réduit, effets de texte |
| `motion.css` | Ce que tous les skills partagent (mots découpés, canvas d'effet). Rien n'y masque un contenu |
| `<skill>.css`, `<skill>.js` | Les mouvements d'un skill, tirés de son `references/motion.md` et du code de sa démo |
| `Mouvement.jsx` | `useMouvement()` : relance la recherche des éléments après un rendu React |

Skills couverts (premier lot) : `acid-scan-security`, `hold-to-play-music`, `lore-frame-editorial`, `nocturne-architecture`, `retro-mission-poster`, `serif-bistro-green`. Les 18 autres n'ont pas encore de couche mouvement : leurs pages gardent les seuls mouvements des gabarits et de la couche de signature.

## Ce que chaque couche apporte

| Skill | Entrée de page | Au défilement | Texte | Survol, focus |
|---|---|---|---|---|
| `acid-scan-security` | allumage CRT du premier écran ; liens de la barre un à un | blocs qui s'allument par paliers ; images décryptées en mosaïque (8 paliers) ; compteurs | décodage des titres et surtitres (`01<>/\#*+=[]_`) ; carré clignotant du surtitre | (couche de signature) |
| `hold-to-play-music` | barre en coupe franche | blocs en coupe franche ; pochettes qui montent de 40 px | mots du titre dispersés qui se rangent | liens qui basculent de couleur ; contour clignotant de l'action finale |
| `lore-frame-editorial` | liens de la barre décodés l'un après l'autre | blocs en rideau ; planches pliées par la vitesse | décodage des surtitres ; titres mot à mot du gris à l'encre ; phrase d'appui tapée | décodage des liens et des boutons |
| `nocturne-architecture` | liens de la barre en fondu | blocs qui montent de 32 px ; chiffres qui comptent | titres mot à mot du gris au blanc, liés au défilement | pilule : fond clair qui monte ; photo de carte qui zoome dans son cadre |
| `retro-mission-poster` | liens de la barre en cascade | blocs qui montent de 24 px ; faits qui arrivent de la gauche | mots du titre qui montent derrière un cache ; surtitre en fondu | contour rouge autour de l'image d'une carte |
| `serif-bistro-green` | liens de la barre | blocs qui montent de 28 px ; photos en arche (18 %) | mots du titre qui montent derrière un cache | (couche de signature) |

Chaque feuille dit en tête ce qu'elle a lu dans le skill et ce qu'elle ne reprend pas. Ce qui n'est pas repris tient presque toujours à une pièce absente des structures (carrousel, bandeau, écran de chargement) ou à une section collante qui confisquerait le défilement.

## Charger

Après la couche de signature, avant `brand.css` ; les scripts après ceux des gabarits. `tools/kit.py` écrit ces balises quand le skill a une couche mouvement.

```html
<link rel="stylesheet" href="kobo/kobo-studio/components/signatures/<skill>.css">
<link rel="stylesheet" href="kobo/kobo-studio/components/motion/motion.css">
<link rel="stylesheet" href="kobo/kobo-studio/components/motion/<skill>.css">
…
<script src="kobo/kobo-studio/components/motion/motion.js"></script>
<script src="kobo/kobo-studio/components/motion/<skill>.js"></script>
```

Le moteur démarre seul quand la page est lue, après la pose des gabarits. Après un contenu ajouté ou un rendu React : `Kobo.motion.start()` (ou `useMouvement()`).

## Règles

- **Une seule boucle** `requestAnimationFrame` pour toute la page. Elle s'arrête quand rien de visible ne bouge ; un mouvement lié au défilement ne tourne que pendant le défilement et 400 ms après.
- **Pause hors écran** : un mouvement attaché à un élément ne tourne que si l'élément est à l'écran ; une animation CSS en boucle ne joue que sous `[data-k-inview]`. Onglet caché : tout s'arrête.
- **Seuls `transform` (`translate`, `rotate`, `scale`), `opacity` et `clip-path` sont animés**, plus la couleur d'un texte ou d'un contour quand le skill le fait. `tools/check_components.py` refuse une transition sur autre chose.
- **Intensité** : `full` joue tout. `reduced`, `off` et `prefers-reduced-motion` donnent l'**état final**, immobile : le moteur pose `data-k-motion="still"` et les feuilles des skills ne s'appliquent plus (elles sont toutes écrites sous `html[data-k-motion="on"]`).
- **Sans script, rien n'est masqué.** Aucun état de départ n'existe hors de `html[data-k-motion="on"]`, attribut que seul le moteur pose.
- **Clavier** : un élément qui reçoit le focus est révélé aussitôt, avec ce qui le contient. Aucun focus n'attend une image d'animation.
- **Texte** : un titre découpé en mots garde son texte entier pour les lecteurs d'écran (`k-sr-only`), les mots affichés sont décoratifs. Un texte décodé ou tapé porte son vrai texte en `aria-label` le temps de l'effet. Un élément qui a des enfants (un lien dans un titre) n'est jamais découpé : il prend le mouvement de repli de son skill.
- **Un bloc, un mouvement** : un élément déjà porté par un bloc révélé n'est pas révélé une seconde fois.
- **Le héros a l'entrée de son gabarit** : la couche ne révèle rien dans l'emplacement `hero`, sauf le titre d'une page intérieure.
- **Zoom d'une photo au survol** : permis seulement dans un cadre qui ne grandit pas (`overflow: hidden` sur le cadre, `scale` sur l'image), quand le skill le décrit.

## Écrire la couche d'un skill

1. Lire `../<skill>/references/motion.md` et le code de mouvement de `../<skill>/examples/demo.html` (lecture seule).
2. Recopier les mouvements qui s'appliquent aux pièces du kit (titres de section, blocs, images, faits, cartes, barre, boutons), en remplaçant les variables du skill par les rôles `--k-*` et `--k-sig-*`. Un écart de cascade s'écrit comme une fraction d'un rôle de durée (`calc(var(--_i) * var(--k-dur-fast) * 0.45)`), jamais en dur.
3. Écrire en tête de la feuille les sources lues et ce qui n'est pas repris.
4. Toutes les règles sous `html[data-k-motion="on"][data-k-skill="<skill>"]`.
5. `python3 tools/check_components.py`, puis mesurer la fluidité fenêtre au premier plan (1440 et 390 px), essayer `reduced`, `off`, le clavier seul.

## Limites connues

- Six skills sur vingt-quatre.
- La couche ne change pas la mise en page : une page aux sections sages reste sage, même si elle bouge. Les trois exemples rejoués sont encore en dessous de leur démo (`../../quality/essais-etape-5.md`).
- Après un passage de `full` à `reduced` puis retour à `full` sans recharger, les mouvements liés au défilement ne reprennent pas.
- En React, un texte découpé ou décodé est réécrit hors de React : à réserver aux textes qui ne changent pas après le premier rendu.
- Les effets de texte changent le contenu d'un élément pendant leur durée : une sélection de texte faite à ce moment est perdue.
- Essayé dans Chrome seulement.
