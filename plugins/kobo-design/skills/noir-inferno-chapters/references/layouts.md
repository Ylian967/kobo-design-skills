# Noir Inferno Chapters — gabarits

Un seul écran, **sans défilement** : les scènes se remplacent. Tout est centré sur l'axe vertical ; les coins ne servent qu'en mode « vue ». Marge des coins : 46px (18px en mobile).

## Les trois états d'un écran (1440 × 900)

```
 OUVERTURE                    TITRE                         VUE
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│                      │  │          ×           │  │ MÉDIA  EN SAVOIR… FR EN│
│   SEUL CELUI QUI     │  │                      │  │                      │
│   OSE DESCENDRE…     │  │                      │  │                      │
│          ○           │  │   LE BORD DU MONDE.  │  │    (image entière)   │
│          ┊           │  │   trois lignes de    │  │                      │
│          ◌           │  │   texte centrées     │  │          ∘           │
│                      │  │          ∘           │  │          ┊           │
│  CLIQUEZ ET TIREZ…   │  │          ┊           │  │    [ LIRE LA SCÈNE ] │
│                      │  │          2           │  │ TW FB  1 2 3 4 5  À PROPOS│
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘
```

| Élément | Position mesurée |
|---|---|
| Citation d'ouverture | haut à 153px, 300px de large |
| Cercle d'ouverture | centre à 357px du haut (40 %) |
| Consigne | à 712px du haut |
| Croix | à 60px du haut |
| Titre | centré, légèrement au-dessus du milieu (≈ 400px) |
| Numéro | bas de l'écran, à ≈ 40px du bord |
| Coins | à ≈ 46px des bords |

## Déroulé

1. **Ouverture** : citation, cercle, consigne. Tirer le cercle.
2. **Scène 1** en état « titre ».
3. La croix masque le texte → état « vue » ; « Lire la scène » le rappelle.
4. Tirer le cercle (ou molette, flèches) → scène suivante, en état « titre ».
5. **Dernière scène** : le cercle est rouge ; le tirer ramène au début (sur le site : ouvre un appel final).

Le site compte neuf scènes ; la démo en a sept.

## Panneau « à propos »

Plein écran clair, tout centré : croix en haut, titre géant, deux paragraphes dans une colonne de 500px, crédits en bas.

## Mobile (390px, proposé)

- Mêmes états, mêmes positions relatives ; la course du cercle passe de 160 à 110px.
- En mode « vue » : nom et langues en haut, « À propos » sous les langues, pas de lien central ni de réseaux ; numéros serrés en bas.
- Le paragraphe occupe toute la largeur moins les marges.

Le site d'origine demandait un écran large ; cette version mobile est une proposition.

## Variantes

- **Récit plus long** : regrouper les scènes en chapitres ; le numéro devient « II · 3 ».
- **Page d'accueil d'un projet éditorial** : l'ouverture seule (citation + cercle), qui mène à un article classique.
- **Avec son** : ajouter en bas à droite un bouton « SON » en capitales de 10px ; ne rien jouer avant le premier geste.
