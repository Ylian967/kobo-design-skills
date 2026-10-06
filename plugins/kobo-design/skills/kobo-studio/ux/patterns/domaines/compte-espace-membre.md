# Compte et espace membre

Se connecter, créer un compte, retrouver ce qui est à soi. L'espace connecté d'un site ouvert au public (membres, clients, adhérents) **n'est pas un outil interne** : mêmes personnes, même téléphone, même marque que la page publique. Sources : marques de `README.md`.

## Écrans attendus

| Écran | Ce qu'il fait | Source |
|---|---|---|
| **Connexion** | Deux champs, un bouton, « Mot de passe oublié », et un lien **distinct** vers la création de compte ou l'adhésion | [G-compte] : distinguer nettement se connecter et créer un compte, les poser côte à côte ne suffit pas |
| **Création de compte** | Seulement si le compte sert à revenir ; le moins de champs possible ; l'écran ne fait que cela | [G-compte] |
| **Accueil connecté** | S'ouvre sur la tâche la plus fréquente du membre (réserver, suivre sa commande), pas sur un tableau de bord. Dit qui est connecté | [N1] ; déduit de [N7] |
| **Mes … (réservations, commandes, documents)** | Ce que j'ai fait, avec les gestes pour le défaire ou le modifier | [N3], [N6] |
| **Mon compte** | Coordonnées, formule, échéance ; se déconnecter | [N3] |

## Parcours

Entrée : un lien « Se connecter » **visible dans la barre de toutes les pages publiques**. Une fois connecté, ce lien devient le nom de la personne ou « Mon espace » [N1], [N4].

1. Toucher « Se connecter ».
2. Remplir et envoyer.
3. Arriver sur l'accueil connecté (ou revenir à l'endroit d'où l'on venait : le créneau, le panier).

**Objectif à écrire dans le plan : 2 étapes** du premier écran à l'accueil connecté. Se déconnecter : 2 touches au plus.

## États

| État | Rendu | Source |
|---|---|---|
| Déconnecté sur une page de l'espace | Jamais l'écran de travail vide ni des données d'exemple : la page de connexion, qui dit ce qu'on trouvera derrière | [N1], [NN-mur] |
| Identifiants faux | Erreur écrite, l'adresse saisie reste ; lien vers « Mot de passe oublié » | [N9] |
| Connecté | Le nom ou « Mon espace » dans la barre, sur toutes les pages, publiques comprises | [N1], [N4] |
| Session finie | Retour à la connexion avec une phrase qui le dit ; après connexion, retour là où on était | [N1], [N3] |
| Rien encore (aucune réservation, aucune commande) | État vide avec le lien vers la première action | [N1] |

## Sur téléphone

- Champs de connexion avec `autocomplete="username"` et `autocomplete="current-password"`, pour que le gestionnaire de mots de passe remplisse ; un bouton pour afficher le mot de passe. Déduit de [N7] et de [W-ressaisie].
- La navigation de l'espace membre est celle du site (barre, menu plein écran), avec deux ou trois liens en plus. Pas de barre latérale [N4].
- Les listes « Mes … » sont des cartes ou des lignes empilées, pas un tableau [NN-tableau-mobile].

## Erreurs fréquentes

| Erreur | Pourquoi | Source |
|---|---|---|
| Pas de connexion du tout : l'« espace membre » est une page ouverte | Chacun voit et modifie les données de tous ; le membre ne sait pas qui il est | [club], [N1] |
| Espace membre habillé comme un outil d'employé (barre latérale, tableau dense, recherche globale, raccourcis) | Ce n'est pas le même public ni le même appareil ; la marque change entre la page publique et l'espace | [club], [N4], [N8] |
| Deux styles : la page publique d'un côté, l'espace de l'autre | La personne croit avoir changé de site | [N4] |
| Mur de connexion avant d'avoir montré quoi que ce soit | Voir `adhesion-inscription.md` | [NN-mur], [G-compte] |
| « S'inscrire » et « Se connecter » de même poids, l'un à côté de l'autre | On se trompe de porte | [G-compte] |
| Après connexion, arrivée sur une page d'accueil générale | Il faut encore chercher la tâche | [N7] |

## Composants

`champ`, `bouton`, `barre-nav` et `menu-mobile` (les mêmes que la partie publique), `etat-vide`, `notification`, `modale` (confirmer une annulation). Structure : les pages de la partie publique (`site-vitrine`, page intérieure), en intensité `reduced` ou `off`. **Pas** la structure `application`.

## Ce que kobo-studio ne fait pas

Aucune authentification réelle : la connexion d'un exemple est simulée dans le navigateur. À dire au client sous « Inventé ».
