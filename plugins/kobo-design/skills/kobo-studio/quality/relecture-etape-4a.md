# Relecture de l'étape 4a — structures de page neutres

But de l'étape : la partie UX commune. Quatre structures de page qui marchent sous n'importe quel skill, avec des emplacements nommés que les gabarits de signature (étape 4b) viendront remplir. Aucun gabarit n'est écrit ici.

## Ce qui est livré

| Livrable | Où |
|---|---|
| Principe des emplacements | `ux/README.md` |
| 4 structures (HTML, CSS, JS, React, README) | `ux/structures/landing-produit/`, `recit-collant/`, `site-vitrine/` (accueil et page intérieure), `article/` |
| Socle commun | `ux/structures/page.css`, `page.js`, `Page.jsx`, `apercu.js` (démonstration seulement) |
| 4 fiches de patterns | `ux/patterns/` : états de page, formulaire, navigation, mouvements |
| Page de démonstration | `ux/structures.html` |
| Vérificateur étendu à `ux/` | `tools/check_components.py` |

## Emplacements retenus

`frame`, `backdrop`, `hero`, `title`, `media`, `grid`, `chapter`, `finale`. Les six de la consigne, plus `title` et `media` : la liste des gabarits de l'étape 3 bis demande un titre typographique propre à plusieurs skills et un traitement d'image propre à d'autres.

## Vérifications

| Contrôle | Méthode | Résultat |
|---|---|---|
| `check_components.py` | — | 11 dossiers de composants, 4 structures, 0 erreur |
| `check_contract.py` | — | 23 fiches valides |
| React | compilation (esbuild) et rendu côté serveur des 5 pages ; un gabarit d'essai posé dans `hero` | rendu sans erreur ; un `<h1>` par page ; le gabarit remplace bien le contenu neutre |
| Débordement horizontal | 5 pages × 23 skills × 1440 et 390 px | aucun |
| Texte sous 12 px | mêmes 230 combinaisons | aucun |
| Erreurs de script | console du navigateur pendant tous les passages | aucune |
| Captures | 5 pages sous 4 skills (serif-bistro-green, acid-scan-security, tiny-planet-toy, lore-frame-editorial), pleine page à 1440 px ; 12 vues d'écran à 390 px | lecture claire ; défauts trouvés listés plus bas |
| Emplacements | `Kobo.slots.fill('hero', …)` puis `reset` sur le récit | rempli, puis contenu neutre remis à l'identique |
| Page de démonstration | changement de structure, de skill, affichage des emplacements | la page affichée suit ; contours dessinés |

### Clavier seul

| Structure | Parcours | Résultat |
|---|---|---|
| Landing | 19 arrêts, du lien d'évitement au pied | contour de focus sur chacun |
| Landing, formulaire | Entrée sur l'envoi sans date → focus sur « Choisissez d'abord une date » ; date choisie aux flèches → envoi libéré et annoncé ; envoi vide → deux erreurs écrites, focus sur le premier champ ; envoi rempli → « Envoi en cours… » puis notification, formulaire vidé | conforme |
| Site vitrine, accueil | 15 arrêts ; « canyon » → état vide annoncé ; « Effacer la recherche » → 5 sorties, focus rendu au champ ; « debutant » (sans accent) → 1 sortie | conforme |
| Site vitrine, page intérieure | 18 arrêts | contour sur chacun |
| Article | 16 arrêts ; le sommaire marque le titre en cours ; « Copier le lien » → notification | conforme |
| Récit | lien d'évitement → barre → sommaire → rail → suite ; rail : chapitre en cours annoncé, image collée sous le rail, progression | conforme après correction (ci-dessous) |

## Ce que la grille anti-slop a révélé

| Point | Constat | Suite |
|---|---|---|
| K1 — héros centré + deux boutons | Aucun héros centré, un seul bouton par héros, sous les 23 skills (mesuré) | — |
| K2 — trois cartes identiques en rang | Sous serif-bistro, dont le conteneur est large, l'accueil alignait trois cartes | Grille plafonnée à deux colonnes, quelle que soit la largeur |
| Y7 — lignes trop longues | Jusqu'à 146 caractères par ligne : les bornes étaient en pixels, et plusieurs skills ont un petit texte ou une police étroite | Bornes en caractères (rôle `--k-measure`, 50ch) ; 83 caractères au pire, sur 6 combinaisons sur 115 ; 49 au plus court |
| U5 — état vide | L'état vide de la recherche s'affichait en permanence : le composant pose son propre `display` | `[hidden]` forcé dans le socle |
| M6 — lecture confisquée | À 390 px, le sommaire collant de l'article passait par-dessus le texte | Un bloc ne colle que s'il a un voisin sur la même ligne (mesuré) |
| U4 — clavier | Dans le récit, la première tabulation arrivait au milieu du rail : `scrollIntoView` déplace le point de départ de la tabulation | Le rail défile seul, sans `scrollIntoView` |
| Y2 — échelle typographique | Rapport entre le plus grand et le plus petit texte sous 3 pour chrome-atelier (2,2), glacial-mono-3d (2,0) et noir-inferno-chapters (2,6) | Vient des tokens de ces skills (titre de page petit). Laissé : c'est à un gabarit `hero` ou `title` de le porter |
| K7 — signature diluée | Sans gabarit, la signature d'un skill ne tient qu'aux composants (boutons, cartes, champs) | Attendu à ce stade : c'est l'objet de l'étape 4b |
| T2, T3, T4 | Aucun témoignage ni logo. Les prix, dates et chiffres sont ceux d'un projet annoncé comme fictif dans le code, le pied de page et la démonstration ; l'article dit que ses chiffres sont sans source | — |
| I3 | Uniquement de vraies photos (13 photos Unsplash, chacune regardée avant d'écrire son texte alternatif) | — |

## Corrigé hors de `ux/`

- **Carte en ligne (`k-card--row`, composant de base)** : sous acid-scan à 390 px, son pied débordait. Elle se replie maintenant d'elle-même (image au-dessus) quand elle est étroite, et son pied prend toute la largeur. La galerie des composants n'utilise pas cette variante.
- **`check_components.py`** : couvre `ux/`. Aucune exception : la longueur de ligne passe par les rôles `--k-measure` et `--k-measure-wide`, ajoutés au socle du contrat.

## Ajustements après validation

| Demande | Fait | Vérifié |
|---|---|---|
| Longueur de ligne sans exception dans le vérificateur | Rôles `--k-measure` (50ch) et `--k-measure-wide` (62ch) ajoutés au socle du contrat ; tous les `max-inline-size` en `ch` remplacés ; exception retirée de `check_components.py` | Vérificateurs au vert ; plus aucun `ch` écrit dans `ux/` ni `components/` |
| Barre du récit qui recouvre le rail | La barre publie sa hauteur (`--_top-h`) ; le rail descend d'autant quand elle revient, remonte quand elle se cache | À 1440 et 390 px : à la descente, rail à 0 px ; à la remontée, bas de la barre à 64 px et rail à 64 px |
| Échec d'envoi du formulaire | Déclenché par `landing-produit.html?echec` | Notification d'erreur « La demande n'est pas partie », annoncée (`assertive`), encore là après 7 s ; réponses gardées ; bouton revenu à son libellé |
| Refus de copie du lien | Déclenché en faisant refuser l'écriture au presse-papiers | Notification d'erreur qui donne l'adresse à copier ; le focus reste sur le bouton |
| Structures en `reduced` et en `off` | 4 structures × 2 intensités × 2 skills (anime-x-slash, tiny-planet-toy), pleine page à 1440 px | `reduced` : formes de signature présentes (bouton penché, étiquettes, cartes noires) ; `off` : composants de base ; aucun débordement ; structure identique dans les deux cas |

**Valeur des rôles de mesure.** La consigne donnait ≈ 65ch et ≈ 80ch. Mesuré dans le navigateur, `ch` (largeur du zéro) est nettement plus large qu'une lettre moyenne : 60ch donnaient déjà des lignes de 99 caractères sous showroom-bento et serif-bistro-green. Les rôles valent donc 50ch et 62ch, ce qui donne en caractères réels 50 à 83 pour le texte courant. C'est une ligne à changer dans `contract/roles.css` si la valeur littérale est préférée.

**Observé.** Une notification d'erreur ne prend pas le focus : la touche Échap ne la ferme que si le focus est dedans ; sinon, son bouton de fermeture.

## Non vérifié

- Les versions React n'ont pas été essayées dans un navigateur (compilation et rendu serveur seulement).
- Captures pleine page faites sous 4 skills ; les 19 autres ne sont couverts que par les mesures (débordement, taille de texte, longueur de ligne).
- À 390 px : 12 vues d'écran regardées, pas les pages entières.
- `prefers-reduced-motion` : non regardé sur les structures.
- Le menu mobile ouvert depuis une structure : non regardé (il l'a été dans la galerie).
- Testé dans Chrome seulement.
