# Liste noire anti-« IA slop »

Ce que kobo-studio refuse de livrer, pourquoi, et comment le repérer.

Chaque point se détecte de deux façons :

- **Code** : une recherche automatique dans le HTML / CSS / JS livré. Un résultat positif n'est pas toujours une faute : il déclenche une relecture.
- **Œil** : un contrôle sur capture d'écran, à 390px et à 1440px de large.

Une exception est possible quand le skill de style choisi **impose** le motif dans sa signature (par exemple le verre dépoli de `glass-frame-estate`, ou les étoiles de `mint-street-basics`). L'exception doit alors être citée : nom du skill et règle concernée. Sans citation, le motif est refusé.

Les lignes marquées **[audit]** ont été ajoutées ou précisées d'après le relevé des 23 skills (voir `../audit/SYNTHESE.md`).

---

## 1. Couleur

| # | À refuser | Pourquoi | Détection dans le code | Détection à l'œil |
|---|---|---|---|---|
| C1 | Dégradé violet → bleu par défaut | C'est la palette que produit un modèle quand rien ne lui est imposé. Elle signale immédiatement une page sans direction. | `linear-gradient` ou `conic-gradient` contenant une teinte entre 230° et 290° ; valeurs `#8b5cf6`, `#7c3aed`, `#6366f1`, `#a855f7`, `#3b82f6` ou leurs voisines. | Un aplat ou un halo violet-bleu qui ne vient pas de la palette du skill. |
| C2 | Néon multicolore sans raison | Plusieurs couleurs vives en concurrence : aucune ne désigne plus rien. | Plus de 2 couleurs saturées (saturation > 70 %) hors `--k-accent`, `--k-accent-2` et `--k-sig-*`. | Compter les couleurs vives visibles dans un écran : plus de 2, c'est suspect. |
| C3 | Gris bleuté partout | Les gris « slate » (`#64748b`, `#94a3b8`, `#1e293b`, `#0f172a`) sont les gris par défaut des gabarits. Ils remplacent la palette du skill sans qu'on le voie. | Recherche de ces valeurs et de tout gris de teinte 210°–230° absent des tokens du skill. | Le texte secondaire et les bordures tirent sur le bleu alors que le skill est chaud ou neutre. |
| C4 | Couleur écrite en dur hors des tokens | La page ne suit plus le skill : un changement de skill ne change plus la page. | `#rrggbb`, `rgb(`, `hsl(` hors du bloc `:root` (contrôle déjà fait pour l'hexadécimal par `tools/check.py`, à étendre à `rgb()` et `hsl()`). **[audit]** 3 démos sur 23 en contiennent. | — |
| C5 | Couleur d'accent sur tout | Si le bouton, le titre, l'icône et le lien sont tous en accent, l'action principale ne ressort plus. | Nombre d'usages de `--k-accent` par écran : au-delà de 5, relire. | Une seule chose doit attirer l'œil en premier dans chaque écran. |
| C6 | **[audit]** Valeur « estimée » passée pour mesurée | Une couleur inventée par le modèle se glisse dans un skill censé reproduire une référence (cas relevé : l'anneau violet de `cosmic-voyage`). | Commentaire `estimé`, `à l'œil`, `choisi` à côté d'une couleur d'accent dans `tokens.css`. | — |
| C7 | **[audit]** Rouge et vert standard pour les états | Un vert `#22c55e` et un rouge `#ef4444` collés sur n'importe quel skill cassent la palette. | Ces deux valeurs et leurs voisines hors tokens. | Le message d'erreur ou de succès a une couleur étrangère au reste. |

## 2. Forme

| # | À refuser | Pourquoi | Détection dans le code | Détection à l'œil |
|---|---|---|---|---|
| F1 | Cartes arrondies à ombre douce partout | La carte blanche flottante est le contenant par défaut : tout y finit, sans hiérarchie. | `box-shadow` avec un flou ≥ 8px et une opacité < 0.2, répété sur plus de 2 sélecteurs. **[audit]** Aucune des 23 démos n'a d'ombre floue de ce type : toute apparition viendrait de kobo-studio. | Toutes les informations sont dans des boîtes identiques. |
| F2 | Tout en rayon 12–16px | Rayon par défaut des bibliothèques. Appliqué partout, il efface la forme propre du skill (0 pour 5 skills, pilule pour d'autres). | `border-radius` de 12 à 16px qui ne vient pas de `var(--k-radius…)`. **[audit]** 12 démos sur 23 ont déjà des rayons en dur à côté de leurs tokens. | Boutons, cartes, champs et images ont tous le même arrondi. |
| F3 | Verre dépoli décoratif | Le flou d'arrière-plan coûte cher et ne sert à rien s'il n'y a rien à lire à travers. | `backdrop-filter` hors d'un skill qui le prévoit. **[audit]** 4 skills l'utilisent ; 2 l'interdisent explicitement (`alpine-glass-expedition`, `cosmic-voyage` : « le verre est peint »). | Un panneau translucide posé sur un fond uni. |
| F4 | Bordure de 1px grise autour de tout | Même défaut que F1, version plate. | `border: 1px solid` sur plus de la moitié des blocs. | Quadrillage de boîtes. |
| F5 | **[audit]** Ombre par défaut quand le skill n'en veut pas | Au moins 7 skills écrivent « aucune ombre », « pas d'ombre portée » ou « jamais de flou » dans leurs règles. | Tout `box-shadow` non nul quand `--k-shadow` vaut `none`. | — |
| F6 | Pastille d'icône ronde colorée | Icône dans un rond pastel au-dessus d'un titre : motif de gabarit. | Élément rond (`border-radius: 50%`) de 40 à 64px contenant un seul `svg`, répété 3 fois ou plus. | Voir aussi K2. |

## 3. Composition

| # | À refuser | Pourquoi | Détection dans le code | Détection à l'œil |
|---|---|---|---|---|
| K1 | Héros centré + deux boutons | Titre centré, sous-titre gris, bouton plein et bouton contour : l'ouverture par défaut. | Premier bloc en `text-align: center` contenant un `h1`, un `p` et exactement 2 boutons ou liens-boutons. | Capture à 1440px : le héros pourrait appartenir à n'importe quel produit. |
| K2 | Séries de 3 cartes icône-titre-texte | Remplissage : trois arguments interchangeables. | Grille de 3 (ou 6) enfants de même structure : `svg` ou icône + titre + paragraphe court. | Cacher les titres : si les cartes sont indiscernables, c'est le motif. |
| K3 | Espacements uniformes sans hiérarchie | Si tout est séparé de la même distance, rien n'est regroupé ni mis en avant. | Une seule valeur de marge verticale entre sections ; un seul `gap` dans toute la page. | À 1440px, plisser les yeux : on doit voir des groupes, pas une colonne régulière. |
| K4 | Tout centré | L'alignement centré de bout en bout supprime tout axe de lecture. | `text-align: center` sur plus de la moitié des sections (hors skills dont c'est la règle : `heritage-lens`, `noir-inferno-chapters`). | — |
| K5 | Sections interchangeables | Héros, logos, 3 cartes, témoignages, tarifs, FAQ, appel final, dans cet ordre : le plan de page par défaut. | Suite des sections comparée à ce plan : 5 correspondances ou plus dans l'ordre. | L'ordre doit suivre le parcours du visiteur, pas une liste type. |
| K6 | **[audit]** Un seul point de rupture | La page saute du bureau au mobile sans palier ; la tablette est cassée. 17 démos sur 23 sont dans ce cas. | Moins de 2 valeurs distinctes de `max-width` / `min-width` dans les `@media`, sans `clamp()` ni requête de conteneur pour compenser. | Capture supplémentaire à 820px si le doute existe. |
| K7 | **[audit]** Signature diluée | La marque du skill (cadre, angle, lentille…) apparaît une fois dans le héros puis disparaît : le reste de la page est générique. | Les `--k-sig-*` ne sont utilisés que dans le premier écran. | Faire défiler jusqu'au milieu : reconnaît-on encore le skill ? |

## 4. Contenu

| # | À refuser | Pourquoi | Détection dans le code | Détection à l'œil |
|---|---|---|---|---|
| T1 | Texte de remplissage | Le faux texte cache les vrais problèmes de longueur et de ton. | `lorem`, `ipsum`, `dolor sit`, « Votre texte ici », « Titre de la section », « Description courte ». **[audit]** 0 occurrence dans les 23 démos. | Phrases qui ne disent rien de précis sur le produit. |
| T2 | Faux témoignages | Un avis inventé avec nom et fonction est un mensonge mis en page. | `<blockquote>`, classes `quote`, `review`, `testimonial`, `avis` avec un nom propre, sans source fournie par la personne. **[audit]** Présents dans 5 démos (`glass-frame-estate` : 6 avis nommés). | Un visage, un nom, une phrase élogieuse. |
| T3 | Logos clients inventés | Même raison ; s'y ajoute le risque d'utiliser de vraies marques. | Bloc « ils nous font confiance », « presse », « partenaires » ; rangée d'images ou de `svg` de même hauteur. **[audit]** `chrome-atelier` invente une revue de presse, `pixel-lime-portfolio` des prix. | Rangée de logos gris. |
| T4 | Chiffres non sourcés | « 99,98 % », « 120+ », « 4,8/5 » : sans source, ce sont des décorations. | Motif `\d+[\d,.]*\s?(%|\+|k|M|/5|x)` dans un bloc de statistiques. **[audit]** Présent dans 6 démos. | Tout chiffre affiché doit avoir une source donnée par la personne, ou être marqué comme exemple. |
| T5 | Emoji comme icônes | Rendu différent selon le système, style étranger au skill, lecture d'écran bavarde. | Caractères des plages emoji et symboles (`✦ ★ ✕ ✓ →` compris) hors texte courant. **[audit]** 4 démos utilisent `★`, `✦` ou `✕` comme pictogrammes. | — |
| T6 | Ton de brochure | « Révolutionnez », « Boostez », « solution innovante », « au cœur de », « nouvelle génération ». | Liste de mots à entretenir. | Remplacer le nom du produit par un autre : si la phrase tient encore, elle est vide. |
| T7 | **[audit]** Lien ou bouton d'action sans destination | « Acheter », « Commander », « Voir le détail » qui pointent sur `#`. 108 liens dans 15 démos. | `href="#"`, `href=""`, `href="javascript:"`. | — |
| T8 | **[audit]** Image de contenu sans texte alternatif | `alt=""` est réservé au décor. Une photo de produit, de bien ou de personnage est du contenu. | `alt=""` sur une image placée dans une carte, une fiche ou une figure. | — |

## 5. Images

| # | À refuser | Pourquoi | Détection dans le code | Détection à l'œil |
|---|---|---|---|---|
| I1 | Blobs 3D décoratifs | Formes molles brillantes sans rapport avec le sujet. | Images ou `svg` nommés `blob`, `shape`, `orb`, `gradient`, `abstract` ; `filter: blur()` supérieur à 40px sur un élément décoratif. | Une forme qui pourrait illustrer n'importe quoi. |
| I2 | Illustrations génériques | Personnages plats sans visage, isométrie de bureau : banque d'images par défaut. | Sources connues de packs d'illustrations ; `svg` de plus de 200 chemins sans rôle. | L'image dit-elle quelque chose de ce produit-ci ? |
| I3 | Dessins CSS à la place de photos | Règle déjà écrite dans `site-to-skill` et contrôlée par `tools/check.py` : jamais de dessin CSS ou SVG à la place d'une photo, d'un personnage ou d'un objet. | Zéro `<img>`, zéro `<video>`, zéro scène 3D ; produit ou personne faits de `div` et de dégradés. | — |
| I4 | Fausse capture d'interface | Tableau de bord dessiné en rectangles gris dans le héros. | Bloc du héros fait de nombreux `div` vides à fond gris. | — |
| I5 | Photo de banque sans traitement | Une photo brute dans un skill qui impose un traitement (duotone, noir et blanc, grain) casse le style. | Pour les skills concernés : image sans le calque, le filtre ou le canvas prévu. | Les photos ont-elles toutes le même traitement ? |
| I6 | **[audit]** Image en fond CSS pour du contenu | Une image de contenu mise en `background-image` n'a pas de texte alternatif (cas de `noir-inferno-chapters`). | `background-image: url(` sur un élément porteur de sens, sans `role="img"` ni `aria-label`. | — |

## 6. Mouvement

| # | À refuser | Pourquoi | Détection dans le code | Détection à l'œil |
|---|---|---|---|---|
| M1 | Tout grossit au survol | Un `scale(1.05)` sur chaque carte et chaque bouton ne signifie rien. | `:hover` avec `scale(` sur plus de 2 sélecteurs. **[audit]** 7 démos en ont 3 ou plus. | Passer la souris partout : le retour doit dire quelque chose (ouvrir, sélectionner, suivre). |
| M2 | Même fondu sur chaque bloc | Montée + fondu identiques sur toutes les sections : animation par défaut. | Une seule classe d'entrée (`.rise`, `.reveal`, `.fade-in`) appliquée à plus de 10 éléments avec la même durée. | Faire défiler vite : si tout arrive pareil, c'est le motif. |
| M3 | Animations sans lien avec le défilement ou l'action | Boucles décoratives (flottement, pulsation, rotation) qui tournent sans cause. | `animation: … infinite` hors chargement, défilant ou signature du skill. | Qu'est-ce qui déclenche ce mouvement ? Sans réponse, le retirer. |
| M4 | `transition: all` | Anime des propriétés non voulues, coûte en fluidité. | `transition: all`, `transition-property: all`. **[audit]** 8 occurrences dans 3 démos. | — |
| M5 | Mouvement réduit ignoré | Obligation d'accessibilité. | Absence de `prefers-reduced-motion` alors qu'il y a des animations. **[audit]** Respecté par les 23 démos : à conserver. | Activer le réglage système et recharger. |
| M6 | **[audit]** Défilement confisqué | Intercepter la molette ou bloquer le défilement sans issue au clavier. | `addEventListener('wheel'` avec `preventDefault` ; `overflow: hidden` sur `body` hors chargement et modale. | Peut-on tout parcourir au clavier seul ? |
| M7 | **[audit]** Survol collant au toucher | Les effets de survol restent accrochés sur mobile. 21 démos sur 23 ne les protègent pas. | Règles `:hover` hors `@media (hover: hover)`. | Tester à 390px en mode tactile. |

## 7. UX factice

| # | À refuser | Pourquoi | Détection dans le code | Détection à l'œil |
|---|---|---|---|---|
| U1 | Boutons qui ne font rien | Une interface qui ne répond pas est une image. | `<button>` sans écouteur ni `type="submit"` dans un formulaire ; `href="#"` (voir T7). | Cliquer sur chaque bouton de la capture. |
| U2 | Formulaires sans état d'erreur | Sans erreur écrite, la personne ne sait pas quoi corriger. | Formulaire sans `aria-invalid`, sans message lié par `aria-describedby`, ou avec `onsubmit="return false"`. **[audit]** 9 démos sur 13 : 6 font `return false`, 3 affichent « Merci » sans rien vérifier. | Envoyer le formulaire vide, puis avec une adresse fausse. |
| U3 | Chargements infinis | Indicateur d'attente qui ne se termine jamais ou qui n'aboutit à rien. | `aria-busy="true"` jamais retiré ; animation de chargement sans fin ni délai d'échec. | Attendre 10 secondes. |
| U4 | Menus inaccessibles au clavier | Menu ouvert par un `div` cliquable, sans focus ni fermeture par Échap. | Éléments cliquables qui ne sont ni `a` ni `button` ; menu sans `aria-expanded` ; pas de gestion de la touche Échap. | Parcourir la page à la touche Tab seule. |
| U5 | **[audit]** Aucun état vide | Liste filtrée sans résultat, panier vide, recherche vide : 0 démo sur 23 le prévoit. | Composant filtrable ou liste sans gabarit « aucun résultat ». | Choisir le filtre le plus rare. |
| U6 | **[audit]** Aucun état désactivé | Bouton d'achat sans taille choisie, flèche en bout de carrousel : 21 démos sur 23 n'ont aucun état désactivé. | Absence de `:disabled` et de `aria-disabled` dans une page qui a des choix obligatoires. | — |
| U7 | **[audit]** Succès sans vérification | Le bouton affiche « Merci ! » quel que soit le contenu envoyé. | Changement de texte du bouton directement dans `onsubmit`. | — |
| U8 | **[audit]** Focus invisible | `outline: none` sans remplacement, ou contour de 1px peu contrasté. | `outline: none` ou `outline: 0` sans règle `:focus-visible` voisine ; contour < 2px. | Capture avec le focus sur un bouton puis sur un champ. |
| U9 | **[audit]** Pas de lien d'évitement | 22 démos sur 23. | Aucun lien vers `#main` ou équivalent en premier élément focalisable. | — |
| U10 | **[audit]** Bouton sans `type` | Dans un formulaire, un bouton sans `type` envoie le formulaire. 141 boutons dans 18 démos. | `<button` sans attribut `type`. | — |
| U11 | **[audit]** Recherche décorative | Champ de recherche qui ne cherche rien (cas de `zigzag-snack-pop`). | `input[type=search]` sans écouteur ni `action`. | — |
| U12 | **[audit]** Structure sémantique manquante | Pas de `<header>`, `<main>`, `<footer>` ; `<h1>` vide ; `<h2>` avant le `<h1>`. | Comptage des balises de structure et ordre des titres. | — |

## 8. Typo

| # | À refuser | Pourquoi | Détection dans le code | Détection à l'œil |
|---|---|---|---|---|
| Y1 | Mêmes polices partout | Inter, Roboto ou la police système sur toute la page, quel que soit le skill. | Familles chargées comparées à `--k-font-display`, `--k-font-body`, `--k-font-mono` du skill. **[audit]** Inter ou Inter Tight sert de police dans 11 skills sur 23 : le risque d'uniformité existe déjà dans la bibliothèque. | Deux pages de deux skills différents ne doivent pas avoir la même voix. |
| Y2 | Tailles moyennes sans contraste d'échelle | Titres à 32px, texte à 16px, rien de grand, rien de petit : hiérarchie plate. | Rapport entre la plus grande et la plus petite taille de la page : sous 3, relire. | À 1440px, y a-t-il un élément typographique qu'on lit à 3 mètres ? |
| Y3 | **[audit]** Texte sous 12px | 9 skills prévoient 10 ou 11px dans leurs tokens. Admis pour des libellés en capitales, pas pour du texte à lire. | `font-size` calculée inférieure à 12px sur un élément de plus de 40 caractères. | À 390px, tout se lit-il sans zoomer ? |
| Y4 | **[audit]** Petit texte sur une paire « grand texte » | 12 skills valident certaines paires de couleurs à 3:1 seulement. Les utiliser pour du petit texte est une faute de contraste. | Couleur d'une paire `:large` appliquée à un texte de moins de 24px (ou 18,66px gras). | — |
| Y5 | Capitales espacées partout | Le surtitre en petites capitales très espacées au-dessus de chaque titre : tic de gabarit. | `text-transform: uppercase` + `letter-spacing` ≥ 0.1em sur plus de 5 éléments, hors skill qui en fait sa règle. | — |
| Y6 | Titre en dégradé | Texte rempli d'un dégradé (`background-clip: text`) : signe très reconnaissable, sauf quand le skill le prévoit. | `background-clip: text` hors skill qui le prévoit. **[audit]** 4 skills l'utilisent (`mint-street-basics`, `alpine-glass-expedition`, `glass-frame-estate`, `pocket-device-noir`). | — |
| Y7 | Lignes trop longues | Paragraphes de plus de 80 caractères par ligne à 1440px. | `max-width` absent ou supérieur à 75ch sur les paragraphes. | — |

---

## Grille de relecture visuelle

À remplir sur deux captures pleine page : **390px** et **1440px** de large. Cocher quand le point est vérifié et conforme. Une case non cochée bloque la livraison, sauf exception citée (skill + règle).

Projet : ………………………… Skill de style : ………………………… Date : …………………………

### Capture 1440px

**Premier écran**

- [ ] On reconnaît le skill de style sans lire son nom (signature présente).
- [ ] Le héros n'est pas « titre centré + sous-titre + deux boutons » (K1).
- [ ] Une seule chose attire l'œil en premier (C5).
- [ ] Aucun dégradé violet-bleu ni couleur étrangère à la palette (C1, C2, C3).
- [ ] Un élément typographique se lit de loin ; l'échelle est contrastée (Y2).

**Corps de page**

- [ ] Pas de série de 3 cartes icône-titre-texte (K2, F6).
- [ ] Les contenants ne sont pas tous la même carte arrondie à ombre douce (F1, F2, F4).
- [ ] Les espacements dessinent des groupes ; les sections n'ont pas toutes la même hauteur d'air (K3).
- [ ] L'ordre des sections suit le parcours, pas le plan type (K5).
- [ ] La signature du skill est encore visible au milieu et en bas de page (K7).
- [ ] Aucun flou d'arrière-plan décoratif, aucune ombre non prévue par le skill (F3, F5).
- [ ] Les images sont de vraies photos, des rendus ou une vraie scène 3D, avec le traitement du skill (I1 à I5).
- [ ] Pas d'emoji ni de symbole en guise d'icône (T5).

**Contenu**

- [ ] Aucun texte de remplissage (T1).
- [ ] Aucun témoignage, logo, prix ou article de presse inventé (T2, T3).
- [ ] Chaque chiffre a une source ou est marqué comme exemple (T4).
- [ ] Les phrases parlent de ce produit-ci (T6).
- [ ] Les lignes de texte ne dépassent pas 80 caractères (Y7).

### Capture 390px

- [ ] Aucun défilement horizontal ; rien n'est coupé par le bord.
- [ ] Le titre du héros tient sans césure maladroite et reste le plus grand élément.
- [ ] La signature du skill existe encore (pas seulement une pile de blocs).
- [ ] Tout le texte se lit sans zoomer ; rien de long sous 12px (Y3).
- [ ] Les cibles tactiles font au moins 44px de haut.
- [ ] Le menu s'ouvre, se ferme, et son contenu tient dans l'écran.
- [ ] Les grilles passent en une colonne sans laisser de carte orpheline étirée.
- [ ] Les images gardent leur cadrage (le sujet n'est pas coupé).
- [ ] L'ordre de lecture reste logique une fois les colonnes empilées.

### États (captures ciblées, aux deux largeurs)

- [ ] Focus clavier visible sur un bouton, un lien, un champ (U8).
- [ ] Survol d'un bouton et d'une carte : le retour a un sens, tout ne grossit pas (M1).
- [ ] Formulaire envoyé vide : message d'erreur écrit, lié au champ (U2).
- [ ] Formulaire en cours d'envoi, puis succès réel ou échec (U3, U7).
- [ ] Élément désactivé quand un choix manque (U6).
- [ ] Liste ou filtre sans résultat : état vide prévu (U5).
- [ ] Page parcourue à la touche Tab seule, menu compris ; Échap ferme ce qui s'ouvre (U4).
- [ ] Réglage « mouvement réduit » activé : la page reste complète et lisible (M5).
- [ ] Défilement rapide : les blocs n'arrivent pas tous avec le même fondu (M2).
- [ ] Aucun mouvement en boucle sans cause (M3).

### Contrôles automatiques à lancer avant la relecture

- [ ] Couleurs en dur hors `:root` : 0 (C4).
- [ ] Rayons, ombres et flous hors tokens : 0 (F2, F3, F5).
- [ ] `href="#"`, boutons sans `type`, `transition: all` : 0 (T7, U10, M4).
- [ ] `lorem`, emoji-icônes, mots de la liste T6 : 0.
- [ ] Images de contenu avec `alt=""` : 0 (T8).
- [ ] `<header>`, `<main>`, `<footer>`, un seul `<h1>` non vide, lien d'évitement (U9, U12).
- [ ] Contrastes des paires de tokens utilisées : conformes (Y4).

---

## Ce qui reste à faire pour cette liste

- Les détections « dans le code » sont décrites, pas encore écrites : aucun script n'existe à ce stade. `tools/check.py` ne couvre aujourd'hui que C4 (hexadécimal seulement), I3 et une partie de Y4.
- Les seuils chiffrés (2 couleurs vives, rapport d'échelle de 3, 5 usages d'accent, 80 caractères) sont des propositions de départ, à régler sur de vraies pages.
