# Interview

Deux tours, courts. Le premier se pose seul, avant tout le reste. Le second accompagne la proposition de skills : il ne porte que sur ce que les skills candidats exigent.

Règles :

- Un seul message par tour, questions numérotées, réponses possibles en une ligne.
- Ne repose pas une question dont la demande donne déjà la réponse ; redis-la en une ligne (« J'ai compris : … ») pour que le client corrige.
- Une réponse « je ne sais pas » est une réponse : note que tu décideras, et dis ce que tu as décidé à la livraison.
- Après chaque tour, **arrête-toi**.

## Premier tour — le projet

1. **Mode.** Part-on de zéro, ou un site existe déjà (adresse ou fichiers) ? → s'il existe : `reprise.md`.
2. **Le but.** Qu'est-ce que le visiteur doit faire à la fin : réserver, acheter, écrire, s'inscrire, simplement s'informer ? Une seule réponse : ce sera l'action principale.
3. **Le public.** Qui vient, d'où (recherche, réseau social, affiche, bouche-à-oreille), sur téléphone ou sur ordinateur ?
4. **Le contenu réel.** Qu'avez-vous déjà : textes, tarifs, horaires, programme, adresse, mentions ? Ce qui manque, faut-il l'écrire ou laisser la section de côté ?
5. **Les photos.** Combien, de quoi (lieu, personnes, produits, plats, scène), prises par qui, et dans quel état : portrait de face, objet sur fond uni, paysage large, de nuit ? Y a-t-il une vidéo, un modèle 3D, un logo ?
6. **Les couleurs de marque.** Y a-t-il un logo, une ou deux couleurs imposées (code exact), une police ? Ou tout est libre ?
7. **L'ambiance.** Trois mots pour le ton voulu, et un site que vous aimez ou détestez.
8. **La technique.** Pages HTML simples ou React ? Une page ou plusieurs ? Où part le formulaire s'il y en a un (adresse e-mail, service, rien pour l'instant) ?

## Registre

D'après les réponses, classe le projet. Dis ta lecture au client dans la proposition.

| Registre | Ce que c'est | Ce que kobo-studio a |
|---|---|---|
| **Expressif** | L'image et le récit priment : festival, univers, jeu, campagne, exposition | Les skills à scène, cadre, chapitres ; intensité `full` |
| **Produit** | Vendre ou présenter une offre : restaurant, boutique, agence, objet, service | La majorité des skills ; intensité `full` ou `reduced` |
| **Fonctionnel** | Faire un travail : CRM, back-office, tableau de bord, outil interne | **Rien de dédié** |

**Projet fonctionnel : dis-le franchement.** Aucun des 23 skills ne couvre ce registre : aucun ne montre un tableau de données, des filtres, une barre latérale d'application ou un formulaire long, et kobo-studio n'a pas ces composants (ni tableau, ni pagination, ni menu déroulant, ni interrupteur). Deux voies honnêtes, à proposer telles quelles :

1. **Un skill en intensité `off`** : on garde ses couleurs, sa typo et ses formes, sans ornement ni mouvement. Choisir un skill aux textes lisibles et aux surfaces calmes (catalogue, « Choisir vite », ligne « Interface sobre »). Les dix composants existants servent (bouton, champ, carte, onglets, modale, notification, état vide, chargement, barre, menu) ; le reste sera écrit pour le projet, avec les seuls rôles `--k-*`, et signalé comme tel.
2. **`/kobo-design:site-to-skill <adresse>`** : créer un skill à partir d'une application que le client trouve juste, puis revenir ici.

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

- action principale ; public et appareil ;
- contenu fourni / à écrire / absent ;
- photos fournies, et leur type ;
- couleurs de marque ;
- registre, ambiance, intensité ;
- technique (HTML ou React, nombre de pages, destination du formulaire).
