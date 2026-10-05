# Interview

Deux tours, courts. Le premier se pose seul, avant tout le reste. Le second accompagne la proposition de skills : il ne porte que sur ce que les skills candidats exigent.

Règles :

- Un seul message par tour, questions numérotées, réponses possibles en une ligne.
- Ne repose pas une question dont la demande donne déjà la réponse ; redis-la en une ligne (« J'ai compris : … ») pour que le client corrige.
- Une réponse « je ne sais pas » est une réponse : note que tu décideras, et dis ce que tu as décidé à la livraison.
- Après chaque tour, **arrête-toi**.

## Premier tour — le projet

Le premier tour a un tronc commun de trois questions, puis une suite qui dépend du registre. Tout part dans **un seul message**.

**Lis d'abord le registre dans la demande.** « Un CRM », « un back-office », « un outil de suivi », « un tableau de bord » : c'est un outil, registre fonctionnel. « Un site pour mon restaurant », « une landing », « un portfolio » : c'est un site. Écris ta lecture en tête du message (« J'ai compris : un outil de travail, pas un site de présentation ») et pose la suite qui correspond.

Si la demande ne permet pas de trancher (« une plateforme pour mes clients », « un espace membres »), pose le tronc commun **seul**, arrête-toi, puis pose la suite adaptée à la réponse. C'est le seul cas où le premier tour prend deux messages.

### Tronc commun

1. **Le registre.** Est-ce un site qu'on **visite** (présenter, vendre, raconter) ou un outil dans lequel on **travaille** (saisir, chercher, suivre des enregistrements) ?
2. **Le mode.** Part-on de zéro, ou quelque chose existe déjà (adresse ou fichiers) ? → s'il existe : `reprise.md`.
3. **La technique.** Pages HTML simples ou React ? Une page ou plusieurs ?

### Suite pour un site (registres expressif et produit)

4. **Le but.** Qu'est-ce que le visiteur doit faire à la fin : réserver, acheter, écrire, s'inscrire, simplement s'informer ? Une seule réponse : ce sera l'action principale.
5. **Le public.** Qui vient, d'où (recherche, réseau social, affiche, bouche-à-oreille), sur téléphone ou sur ordinateur ?
6. **Le contenu réel.** Qu'avez-vous déjà : textes, tarifs, horaires, programme, adresse, mentions ? Ce qui manque, faut-il l'écrire ou laisser la section de côté ?
7. **Les photos.** Combien, de quoi (lieu, personnes, produits, plats, scène), prises par qui, et dans quel état : portrait de face, objet sur fond uni, paysage large, de nuit ? Y a-t-il une vidéo, un modèle 3D, un logo ?
8. **Les couleurs de marque.** Y a-t-il un logo, une ou deux couleurs imposées (code exact), une police ? Ou tout est libre ?
9. **L'ambiance.** Trois mots pour le ton voulu, et un site que vous aimez ou détestez.
10. **Le formulaire**, s'il y en a un : où part-il (adresse e-mail, service, rien pour l'instant) ?

### Suite pour un outil (registre fonctionnel)

Pas de « visiteur », pas de photos, pas d'ambiance : on parle de personnes qui travaillent et de données.

4. **Les utilisateurs.** Qui s'en sert, combien sont-ils, à quelle fréquence, sur quel écran (ordinateur de bureau, portable, téléphone en déplacement) ?
5. **Les tâches fréquentes.** Les deux ou trois gestes faits cent fois par jour (chercher un client, changer une étape, ajouter une ligne). Lequel doit être possible dès le premier écran ? Ce sera l'action principale.
6. **Les données.** Quels enregistrements (clients, affaires, commandes), combien de chacun aujourd'hui et dans un an, quelles colonnes comptent pour décider, d'où viennent-ils (saisie, import, autre logiciel) ? Faut-il des données d'exemple, et lesquelles sont permises ?
7. **Les écrans.** Lesquels faut-il d'abord : la liste, la fiche d'un enregistrement, le tableau de bord ? Dans quel ordre de priorité ?
8. **Les rôles et les droits.** Tout le monde voit-il tout ? Qui peut créer, modifier, supprimer, exporter ? Y a-t-il des données qu'un rôle ne doit pas voir ?
9. **Les couleurs de marque.** Une couleur imposée (code exact), ou tout est libre ? Dans un outil, elle ne sert qu'à l'action principale ; les couleurs d'état restent celles du skill.
10. **Les habitudes.** Quel outil remplace-t-on (tableur, autre logiciel), et qu'est-ce qui y marche bien ou mal ? Travaille-t-on au clavier, ligne après ligne, ou à la souris ?

Le second tour d'un projet fonctionnel ne parle pas de photos ni de 3D : il se limite aux données qui manquent pour remplir le plan et à la densité (confort ou compact).

## Registre

D'après la demande et la réponse à la première question, classe le projet. Dis ta lecture au client dès le premier message, et redis-la dans la proposition.

| Registre | Ce que c'est | Ce que kobo-studio a |
|---|---|---|
| **Expressif** | L'image et le récit priment : festival, univers, jeu, campagne, exposition | Les skills à scène, cadre, chapitres ; intensité `full` |
| **Produit** | Vendre ou présenter une offre : restaurant, boutique, agence, objet, service | La majorité des skills ; intensité `full` ou `reduced` |
| **Fonctionnel** | Faire un travail : CRM, ERP, back-office, tableau de bord, outil interne, application SaaS | Le skill `clear-ledger-desk`, la structure `application`, les composants de données ; intensité sans objet (aucun mouvement de signature) |

**Projet fonctionnel : dis-le franchement.** Un outil de travail appelle de la clarté, pas un design spectaculaire : tableaux denses, filtres, recherche, raccourcis clavier, états vides et d'erreur. kobo-studio a ce qu'il faut :

- **un skill** : `clear-ledger-desk` (fond blanc, texte de 14 px, une seule couleur d'action, densité confort ou compact). C'est le seul skill du registre ; propose-le en premier, seul ou avec un second choix issu de `site-to-skill`.
- **une structure** : `application`, avec trois écrans de départ : la **liste** (barre latérale repliable, en-tête à recherche, filtres, tableau et panneau de détail), la **fiche** d'un enregistrement en pleine page (en-tête, faits, étapes, onglets, historique) et le **tableau de bord** (chiffres, répartition, activité récente). Lis `ux/structures/application/README.md`.
- **les composants** : tableau à tri, sélection et lignes parcourables, pagination, sélection, cases, boutons radio, interrupteur, menu déroulant, accordéon, onglets, modale, notification, état vide, chargement.

Si le client veut une autre allure qu'un outil clair et neutre (les couleurs d'un produit qu'il connaît, un ton plus chaleureux) : **`/kobo-design:site-to-skill` avec le type d'application** (« un CRM B2B pour une PME de services »). Il cherche d'abord en local, propose dix références au plus, s'arrête pour laisser choisir, puis crée le skill avec sa fiche et sa couche de signature. On revient ici avec ce skill et la structure `application`.

Ce que kobo-studio n'a pas, à dire au client : les graphiques (courbes, camemberts) et la connexion aux données. Le tableau de bord montre des chiffres et des barres de répartition en HTML ; les données d'exemple sont écrites dans la page.

Ne présente jamais un skill expressif comme adapté à un outil de travail.

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
3. **L'intensité.** Tout le style (`full`), les formes sans mouvement (`reduced`), ou sobre (`off`) ?
4. **Les pièces lourdes.** Le skill charge une scène 3D ou des canvas (ligne « Pièces lourdes ») : le public est-il surtout sur téléphone, sur des réseaux lents ?
5. **Les couleurs de marque**, si le client en a : l'accent seul (cas courant), ou aussi les fonds ? → `brand.md`.
6. **Ce qui manque encore** au contenu réel pour remplir le plan proposé, section par section.

## Ce que tu notes pour la suite

Garde ces réponses sous la main : elles servent à la proposition, puis à la livraison (« inventé » = tout ce qui n'est pas dans cette liste).

- registre ; technique (HTML ou React, nombre de pages) ;
- couleurs de marque ;
- site : action principale ; public et appareil ; contenu fourni / à écrire / absent ; photos fournies, et leur type ; ambiance, intensité ; destination du formulaire ;
- outil : utilisateurs et écran ; tâches fréquentes et action principale ; enregistrements, volumes, colonnes, origine des données ; écrans voulus ; rôles et droits ; densité.
