# Interview

Deux tours, courts. Le premier se pose seul, avant tout le reste : il donne de quoi écrire le plan de parcours. Le second accompagne la proposition de skills : il ne porte que sur ce que les skills candidats exigent.

Règles :

- Un seul message par tour, questions numérotées, réponses possibles en une ligne.
- Ne repose pas une question dont la demande donne déjà la réponse ; redis-la en une ligne (« J'ai compris : … ») pour que le client corrige.
- Une réponse « je ne sais pas » est une réponse : note que tu décideras, et dis ce que tu as décidé à la livraison.
- Après chaque tour, **arrête-toi**.

## Premier tour — les personnes, puis le projet

Le premier tour a un tronc commun de quatre questions, puis une suite qui dépend de la nature du projet. Tout part dans **un seul message**.

**On commence par les personnes, pas par le registre.** « Qui s'en sert, sur quel appareil, à quelle fréquence, pour faire quoi » décide de tout le reste : c'est la matière du plan de parcours (`ux/methode.md`). La nature du projet se **déduit** de ces réponses.

**Lis d'abord la demande.** Écris en tête du message ce que tu as compris des personnes et des tâches (« J'ai compris : des curieux qui veulent essayer, des membres qui réservent sur leur téléphone »), et ne pose que ce qui manque.

Si la demande ne permet pas de savoir qui utilise le site (« une plateforme », « un espace membres »), pose le tronc commun **seul**, arrête-toi, puis pose la suite adaptée. C'est le seul cas où le premier tour prend deux messages.

### Tronc commun

1. **Les personnes.** Qui utilise le site ? Un à trois profils : pour chacun, ce qu'il sait déjà de vous, l'appareil (téléphone, ordinateur), la fréquence (une fois, chaque semaine, toute la journée), et s'il a un compte. Y a-t-il des gens **sans compte** qui doivent pouvoir faire quelque chose (essayer, s'inscrire, acheter, écrire) ?
2. **Les tâches.** Pour chaque profil, les trois à cinq choses qu'il vient faire, dans l'ordre d'importance. Laquelle doit être possible dès son premier écran ? Peut-il la défaire (annuler, modifier) ?
3. **Le mode.** Part-on de zéro, ou quelque chose existe déjà (adresse ou fichiers) ? → s'il existe : `reprise.md`.
4. **La technique.** Pages HTML simples ou React ?

### Nature du projet

À déduire des réponses 1 et 2, à dire au client dès que tu la connais, à redire dans la proposition.

| Nature | À quoi on la reconnaît | Ce que kobo-studio a |
|---|---|---|
| **Site ouvert au public** | Des visiteurs, des clients, des membres, des adhérents ; souvent sur téléphone ; une partie n'a pas de compte | Les 23 skills de style, choisis selon le public, l'ambiance et les images ; structures landing, site vitrine, récit, article |
| **Site public avec espace connecté** (projet mixte) | Les mêmes, plus des tâches réservées à ceux qui ont un compte (réserver, suivre, gérer) | **Un seul** skill de style : intensité `full` sur la partie publique, `reduced` ou `off` dans l'espace connecté, même barre de navigation. Voir `SKILL.md`, « Projet mixte » |
| **Outil interne** | Des **employés** qui s'en servent plusieurs fois par jour, sur ordinateur, sur beaucoup d'enregistrements : les quatre « oui » de `ux/patterns/domaines/outil-interne.md` | Le skill `clear-ledger-desk`, la structure `application`, les composants de données |

Deux lectures à ne plus faire :

- « C'est une application, donc un outil » : **non**. Une application de réservation pour des membres est un site public avec espace connecté. Ce qui compte est qui s'en sert, pas le mot de la demande.
- « L'espace membre est fonctionnel, donc `clear-ledger-desk` » : **non**. `clear-ledger-desk` est réservé aux outils internes utilisés par des employés. Un membre, un client, un adhérent restent un public : ils gardent la marque de la partie publique.

Un projet se classe aussi par ce qu'il veut faire ressentir : *expressif* (l'image et le récit priment) ou *produit* (présenter, vendre). C'est une aide pour lire le catalogue, pas un critère de choix à lui seul.

### Suite pour un site ouvert au public (avec ou sans espace connecté)

5. **Le but.** Pour le profil le plus important, qu'est-ce qu'il doit avoir fait en partant : réservé, acheté, écrit, adhéré, simplement appris quelque chose ? Ce sera l'action principale. Les autres profils ont la leur dans leur partie du site.
6. **Les règles du parcours.** Ce qu'il faut savoir pour dessiner les tâches : prix, formules, quotas, délais d'annulation, pièces à fournir, paiement en ligne ou sur place, qui valide.
7. **Le contenu réel.** Qu'avez-vous déjà : textes, tarifs, horaires, programme, adresse, mentions ? Ce qui manque, faut-il l'écrire ou laisser la section de côté ?
8. **Les photos.** Combien, de quoi (lieu, personnes, produits, plats, scène), prises par qui, et dans quel état : portrait de face, objet sur fond uni, paysage large, de nuit ? Y a-t-il une vidéo, un modèle 3D, un logo ?
9. **Les couleurs de marque.** Y a-t-il un logo, une ou deux couleurs imposées (code exact), une police ? Ou tout est libre ?
10. **L'ambiance.** Trois mots pour le ton voulu, et un site que vous aimez ou détestez. Avec le public et les photos, c'est ce qui choisit le style.
11. **Les envois.** Où partent les formulaires (adresse e-mail, service, rien pour l'instant) ? La connexion, le paiement, les données sont-ils réels ou simulés pour l'instant ?

### Suite pour un outil interne (employés)

Pas de « visiteur », pas de photos, pas d'ambiance : on parle de personnes qui travaillent et de données. Vérifie d'abord les quatre « oui » de `ux/patterns/domaines/outil-interne.md`.

5. **Les données.** Quels enregistrements (clients, affaires, commandes), combien de chacun aujourd'hui et dans un an, quelles colonnes comptent pour décider, d'où viennent-ils (saisie, import, autre logiciel) ? Faut-il des données d'exemple, et lesquelles sont permises ?
6. **Les écrans.** Lesquels faut-il d'abord : la liste, la fiche d'un enregistrement, le tableau de bord ? Dans quel ordre de priorité ?
7. **Les rôles et les droits.** Tout le monde voit-il tout ? Qui peut créer, modifier, supprimer, exporter ? Y a-t-il des données qu'un rôle ne doit pas voir ?
8. **Les couleurs de marque.** Une couleur imposée (code exact), ou tout est libre ? Dans un outil, elle ne sert qu'à l'action principale ; les couleurs d'état restent celles du skill.
9. **Les habitudes.** Quel outil remplace-t-on (tableur, autre logiciel), et qu'est-ce qui y marche bien ou mal ? Travaille-t-on au clavier, ligne après ligne, ou à la souris ?

Le second tour d'un outil interne ne parle pas de photos ni de 3D : il se limite aux données qui manquent pour remplir le plan et à la densité (confort ou compact).

**Outil interne : dis-le franchement.** Un outil de travail appelle de la clarté, pas un design spectaculaire. kobo-studio a ce qu'il faut :

- **un skill** : `clear-ledger-desk` (fond blanc, texte de 14 px, une seule couleur d'action, densité confort ou compact). C'est le seul skill pour cette nature de projet ; propose-le seul, ou avec un second choix issu de `site-to-skill`.
- **une structure** : `application`, avec trois écrans de départ : la **liste** (barre latérale repliable, en-tête à recherche, filtres, tableau et panneau de détail), la **fiche** d'un enregistrement en pleine page (en-tête, faits, étapes, onglets, historique) et le **tableau de bord** (chiffres, répartition, activité récente). Lis `ux/structures/application/README.md`. Chaque pièce (barre latérale, recherche, raccourcis, tableau de bord) reste soumise au plan de parcours : une tâche doit la demander.
- **les composants** : tableau à tri, sélection et lignes parcourables, pagination, sélection, cases, boutons radio, interrupteur, menu déroulant, accordéon, onglets, modale, notification, état vide, chargement.

Si le client veut une autre allure qu'un outil clair et neutre : **`/kobo-design:site-to-skill` avec le type d'application** (« un CRM B2B pour une PME de services »). On revient ici avec ce skill et la structure `application`.

Ce que kobo-studio n'a pas, à dire au client : les graphiques (courbes, camemberts), la connexion aux données, l'authentification, le paiement. Les données d'exemple sont écrites dans la page ; une connexion d'exemple est simulée.

Ne présente jamais un skill expressif comme adapté à un outil interne, ni `clear-ledger-desk` comme adapté à un public.

## Second tour — ce que les skills candidats exigent

À poser avec la proposition (étape c). Ne garde que les questions utiles aux skills que tu proposes.

1. **La photo qu'exige le gabarit.** Chaque fiche du catalogue a une ligne « Photos exigées ». Demande précisément ce type :

   | Le gabarit demande | Skills concernés (exemples) | Question à poser |
   |---|---|---|
   | Un visage de face, regard caméra, fond clair | acid-scan-security | Avez-vous un portrait de face sur fond clair ? |
   | Un portrait (pied, mi-corps ou sur le vif) | serif-bistro-green, pixel-lime-portfolio, sticker-brutal-jp, mint-street-basics | Qui montre-t-on, et la photo existe-t-elle ? |
   | Un produit détourable (objet entier sur fond uni) | showroom-bento, zigzag-snack-pop, pocket-device-noir, chrome-atelier | Avez-vous le produit détouré, ou photographié sur fond uni ? |
   | Un paysage large, zone calme pour le texte | alpine-glass-expedition, retro-mission-poster, heritage-lens, noir-inferno-chapters | Avez-vous une vue large du lieu ? |
   | Un bâtiment devant un ciel dégagé, ou de nuit | glass-frame-estate, nocturne-architecture | De jour ou à l'heure bleue ? |
   | Des illustrations ou personnages | anime-x-slash, cosmic-voyage, lore-frame-editorial, hyper-lime-street | Avez-vous des illustrations ? Sinon des photos les remplaceront. |
   | Un modèle 3D | glacial-mono-3d, tiny-planet-toy, pocket-device-noir | Avez-vous un modèle `.glb` ? Sinon la scène générique ou une photo. |

   Si le client n'a pas la photo, dis ce que le gabarit donnera sans elle (ligne « Limites » de la fiche), et propose : une photo de banque en attendant, ou un autre skill.

2. **Les preuves.** Avis, chiffres, prix, presse : en avez-vous de vrais, avec leur source ? Sans source, la section n'existe pas.
3. **L'intensité.** Tout le style (`full`), les formes sans mouvement (`reduced`), ou sobre (`off`) ? Projet mixte : `full` sur la partie publique, `reduced` ou `off` dans l'espace connecté, sauf avis contraire du client.
4. **Les pièces lourdes.** Le skill charge une scène 3D ou des canvas (ligne « Pièces lourdes ») : le public est-il surtout sur téléphone, sur des réseaux lents ?
5. **Les couleurs de marque**, si le client en a : l'accent seul (cas courant), ou aussi les fonds ? → `brand.md`.
6. **Ce qui manque encore** au contenu réel pour remplir le plan proposé, section par section.

## Ce que tu notes pour la suite

Garde ces réponses sous la main : elles servent à la proposition, puis à la livraison (« inventé » = tout ce qui n'est pas dans cette liste).

- les profils (qui, appareil, fréquence, avec ou sans compte) et leurs tâches classées : c'est la matière de `parcours.md` ;
- la nature du projet ; technique (HTML ou React) ;
- couleurs de marque ;
- site : action principale ; règles du parcours (prix, quotas, annulation, paiement) ; contenu fourni / à écrire / absent ; photos fournies, et leur type ; ambiance, intensité ; destination du formulaire ;
- outil interne : enregistrements, volumes, colonnes, origine des données ; écrans voulus ; rôles et droits ; densité.
