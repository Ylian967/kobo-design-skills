# Boutique et panier

Choisir un produit, remplir un panier, payer. Sources : marques de `README.md`. Les règles de cette fiche viennent surtout du Baymard Institute ; seules ses pages en accès libre ont été lues. **Non couvert, faute de source lue :** la recherche dans le catalogue, les filtres à facettes, la page de liste. Pour un catalogue de plus de quelques dizaines de produits, dis-le au client.

## Écrans attendus

| Écran | Ce qu'il fait | Source |
|---|---|---|
| **Liste ou accueil de boutique** | Les produits avec photo, nom, prix | [N6] |
| **Fiche produit** | Photos, prix **complet**, choix obligatoires (taille, couleur), disponibilité, « Ajouter au panier » | [B-abandon] coût caché ; [N1] ; [N5] |
| **Panier** | Les lignes, la quantité modifiable, « Retirer », le total avec la livraison ou sa règle, « Commander » | [N3] ; [B-abandon] : 12 % abandonnent faute de voir le total d'avance |
| **Commande** | Coordonnées, livraison, paiement ; possible **sans compte** | [B-abandon] : 18 % abandonnent parce qu'un compte est exigé ; [NN-mur] |
| **Relecture** | Ce qui va être payé, avant de payer | [G-relire] |
| **Confirmation** | Numéro de commande, ce qui se passe ensuite et quand, un contact ; c'est **ici** qu'on propose de créer un compte | [G-confirmation] ; [B-compte] |

## Petite offre et billetterie (moins de sept articles)

Quelques billets, trois formules, un seul produit en plusieurs tailles : la liste, la fiche et le panier **tiennent sur un écran** (`../../methode.md`, règle 4). Ne construis pas trois pages pour cinq lignes.

| Écran | Ce qu'il fait | Source |
|---|---|---|
| **Choix** | Toutes les lignes visibles, chacune avec son prix complet et sa quantité ; le total suit ; les règles qui engagent (maximum par commande, pas de remboursement, justificatif demandé) sont écrites ici, avant « Commander » | [N6], [N5] ; [B-abandon] total visible d'avance |
| **Commande** | Le récapitulatif modifiable, le moins de champs possible (pour un billet envoyé par e-mail : l'e-mail et le paiement, ni nom ni adresse), puis payer | [B-champs] ; [G-relire] |
| **Confirmation** | Une référence, ce qui a été acheté, où et quand arrive le billet, qui joindre ; la référence sert à retrouver sa commande sans compte | [G-confirmation] ; [G-compte] |

- **Quantité** : kobo-studio n'a pas de bouton « − / + ». Jusqu'à six ou huit, une `selection` (« 0 à 6 ») sur chaque ligne ; dis-le au client comme une pièce qui manque.
- **Quota** (places par soir, stock) : une ligne épuisée reste affichée, « Complet » écrit, quantité bloquée [N1], [N5]. Le maximum par commande est dit avant qu'on le dépasse, pas en erreur après.
- **Non remboursable** : écrit sur l'écran de choix et redit au-dessus du bouton de paiement ; voir `../../methode.md`, règle 2.
- Le bouton d'achat est dans la barre de **toutes** les pages, avec le nombre d'articles choisis [N1], [N6].
- **Objectif** : accueil → choix → commande → paiement, 4 étapes, et le nombre de champs écrit en chiffre.

Ces lignes sont des déductions de notre part à partir des sources citées : aucune ne traite la billetterie en accès libre.

## Parcours

Entrée : une fiche produit (lien partagé, recherche) aussi souvent que l'accueil.

1. Fiche produit → choisir la taille → « Ajouter au panier ».
2. Le panier se met à jour, un message le dit, on peut continuer ou commander.
3. Panier → « Commander ».
4. Coordonnées et livraison.
5. Paiement, relecture, validation.
6. Confirmation.

**Objectif à écrire dans le plan :** ajouter au panier depuis la fiche, 2 touches (le choix, le bouton) ; de panier à commande payée, le nombre de champs écrit en chiffre. Baymard situe une commande bien faite autour de **huit champs** [B-champs] ; au-delà, justifie chaque champ.

## États

| État | Rendu | Source |
|---|---|---|
| Choix manquant (taille) | Le bouton reste atteignable ; un texte dit ce qui manque et y conduit | [N5], [N9] ; `../formulaire.md` |
| Rupture | Dit sur la fiche et sur la carte ; pas de bouton qui échoue ensuite | [N1], [N5] |
| Ajouté au panier | Confirmation écrite et compteur du panier mis à jour dans la barre | [N1] |
| Panier vide | État vide avec un lien vers la boutique | [N1] |
| Paiement refusé | Message écrit, rien n'est perdu, rien n'est débité, on peut réessayer ou changer de moyen | [N9] ; [B-abandon] (carte refusée : 10 %) |
| Déconnecté | La commande reste possible en invité | [B-abandon], [NN-mur] |

## Sur téléphone

- Le panier est atteignable depuis la barre sur toutes les pages, avec son nombre d'articles [N1], [N6]. Dans `barre-nav`, pose-le dans `.k-nav__actions` **sans** la classe `k-nav__extra` (qui masque l'élément quand la barre se replie) : un lien court, « Panier (2) », qui reste à côté de « Menu ».
- « Ajouter au panier » reste visible sans remonter en haut de la fiche ; cible de 44 px [W-cible], [NN-doigt].
- Formulaire de commande sur une colonne ; un seul champ « Nom complet » ; la seconde ligne d'adresse, le code de réduction et l'adresse de facturation sont repliés derrière un lien [B-champs] ; [NN-form] point 3.
- `autocomplete` sur chaque champ d'adresse et de paiement [W-ressaisie].

## Erreurs fréquentes

| Erreur | Pourquoi | Source |
|---|---|---|
| Compte obligatoire pour commander | 18 % des abandons cités | [B-abandon], [B-compte] |
| Frais de port découverts à la dernière étape | Première cause d'abandon citée (coûts supplémentaires : 40 %) | [B-abandon] |
| Création de compte proposée au milieu de la commande | Elle détourne de l'achat ; à la confirmation, il ne reste qu'un mot de passe à choisir | [B-compte] |
| Champ « Code promo » bien visible | Fait partir chercher un code | [B-champs] |
| Quantité non modifiable, ou « Retirer » absent du panier | On ne peut pas défaire | [N3] |
| Ajout au panier sans retour visible | La personne clique deux fois | [N1] |
| Boutique sans panier (un bouton « Acheter » par produit qui ouvre un e-mail) annoncée comme boutique | Ce n'est pas le parcours attendu : le dire au client et choisir `contact-devis.md` | [N4] |

## Composants

`carte` (produit : image, nom, prix, destination), `bouton-radio` (taille, couleur), `champ`, `selection` (pays), `bouton`, `notification` (ajout au panier), `etat-vide` (panier vide), `modale` seulement pour confirmer une suppression.

## Ce que kobo-studio ne fait pas

Ni paiement ni stock réels : le panier d'un exemple vit dans le navigateur. À dire au client sous « Inventé ».
