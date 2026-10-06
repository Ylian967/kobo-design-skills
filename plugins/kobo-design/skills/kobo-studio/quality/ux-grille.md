# Vérification UX : les parcours joués

Obligatoire avant toute livraison, après `check_studio.py` et la grille anti-slop. `check_studio.py` regarde des pages immobiles ; il ne sait pas si l'on peut réserver, s'inscrire ou annuler. **Il ne remplace pas cette étape.** Une page à 0 erreur dont un parcours échoue n'est pas livrable.

On part du plan de parcours validé (`<projet>/parcours.md`, écrit selon `ux/methode.md`). On en sort avec trois choses, toutes recopiées dans le message de livraison : le **tableau des tâches jouées**, la **grille cochée avec ses preuves**, le **verdict**.

## 1. Jouer chaque tâche, en vrai

Chaque tâche principale du plan est jouée deux fois dans un navigateur piloté, du point d'entrée écrit dans le plan jusqu'à l'état de succès :

| Passe | Largeur | Comment | Ce qu'on note |
|---|---|---|---|
| **Doigt** | 390 × 844 px | Toucher simulé (voir plus bas), aucun clavier hors saisie de texte, aucun survol | Le nombre d'étapes, la plus petite cible touchée (en px), ce qui a gêné |
| **Clavier** | 1440 × 900 px | Tab, Maj+Tab, Entrée, Espace, flèches, Échap. **Aucun clic** | Le nombre d'étapes, si le focus reste visible à chaque arrêt, si tout est atteignable |

Règles du jeu :

- **On joue, on ne lit pas.** Lire le code ou regarder une capture ne compte pas. Une tâche est « jouée » quand le navigateur est arrivé à l'état de succès et qu'une capture le montre.
- **Une étape** = un geste qui valide un choix ou change d'écran : toucher un bouton, un lien, une carte, un onglet ; envoyer un formulaire. Faire défiler, déplacer le focus et taper dans un champ ne sont pas des étapes ; le nombre de champs remplis se note à part. C'est la même définition que dans le plan.
- **On part de l'entrée du plan**, pas de l'écran qui arrange : un profil sans compte part de la page publique, navigateur vidé (ni session ni stockage local).
- **On joue aussi le retour** : la tâche inverse (annuler, retirer) et au moins un état vide, un état d'erreur et l'état déconnecté de chaque tâche qui en a dans le plan.
- **On compare à l'objectif.** Plus d'étapes que l'objectif écrit dans le plan : la tâche est « à corriger », même si elle aboutit.
- Les captures de preuve vont dans `<projet>/captures/parcours/` : `<tâche>-390-<n>.png`, `<tâche>-1440-<n>.png`, au moins celle de l'état de succès.

### Simuler le doigt

Une fenêtre réduite à 390 px ne suffit pas : il faut des évènements tactiles, sinon un survol ou un `mouseenter` masque un défaut. Avec un navigateur piloté par Playwright (MCP ou script), sur la page déjà ouverte :

```js
const cdp = await page.context().newCDPSession(page);
await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 1 });
// toucher le centre d'un élément, et rendre la taille de la cible
async function toucher(selecteur) {
  await page.bringToFront();                                  // fenêtre masquée : rien ne se stabilise, le toucher tombe à côté
  const el = page.locator(selecteur).first();
  await el.evaluate(e => e.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await page.waitForTimeout(600);                             // laisse finir un défilement ou un chargement d'image
  const b = await el.boundingBox();                           // mesuré APRÈS l'attente
  const p = { x: Math.round(b.x + b.width / 2), y: Math.round(b.y + b.height / 2) };
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [p] });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  return { largeur: Math.round(b.width), hauteur: Math.round(b.height) };
}
```

Vérifie d'abord que la simulation est réelle : `window.innerWidth` doit rendre 390 et `matchMedia('(pointer: coarse)').matches` doit rendre `true`. Sinon écris la largeur et le mode réels dans le tableau : une passe à 500 px à la souris n'est pas une passe à 390 px au doigt.

Après chaque toucher, **vérifie l'effet** (l'onglet est choisi, la page a changé) avant de compter l'étape : un toucher envoyé pendant qu'une page bouge encore, ou sur une ligne hors de l'écran, tombe à côté sans erreur. N'utilise pas `scrollIntoViewIfNeeded` ni rien qui attende `requestAnimationFrame` : dans une fenêtre masquée, ça n'arrive jamais. À la fin, coupe l'émulation (`Emulation.setTouchEmulationEnabled {enabled:false}`, `Emulation.clearDeviceMetricsOverride`).

La taille rendue est celle de la boîte de l'élément. Quand un composant agrandit sa zone cliquable sans agrandir sa boîte (`--k-hit-min`), vérifie-le par un toucher décalé de quelques pixels hors de la boîte, et note-le.

### Tableau des tâches jouées

À remplir et à recopier tel quel à la livraison :

| Tâche (profil) | Entrée | 390 px, doigt : étapes / objectif | Plus petite cible | 1440 px, clavier : étapes | Retour, vide, erreur, déconnecté | Résultat |
|---|---|---|---|---|---|---|
| T1 Réserver un créneau (membre) | accueil connecté | 2 / 3 | 48 px | 2, focus visible | annulation jouée ; jour sans créneau vu ; déconnecté renvoie à la connexion | OK |
| … | | | | | | OK / à corriger : … |

Une case vide veut dire « non joué » et s'écrit ainsi. On n'écrit jamais « OK » pour une passe non jouée.

## 2. Les dix heuristiques de Nielsen, avec preuve

Une ligne par heuristique. **Preuve** = l'écran et le fait observé pendant le jeu (« `mes-reservations-390-2.png` : la ligne disparaît et un message dit "Réservation annulée" »). « Conforme » sans preuve ne compte pas ; « sans objet » se justifie en une phrase.

| # | Heuristique | Question à se poser sur ce projet | Conforme | Preuve |
|---|---|---|---|---|
| 1 | Visibilité de l'état du système | Après chaque geste, l'écran dit-il ce qui s'est passé (réservé, ajouté, envoyé, connecté) ? Sait-on où l'on est et si l'on est connecté ? | ☐ | |
| 2 | Correspondance avec le monde réel | Les mots sont-ils ceux du public (« séance découverte », pas « créneau type B ») ? Aucun mot d'outil (enregistrement, fiche, statut) devant un public ? | ☐ | |
| 3 | Contrôle et liberté | Chaque chose faite peut-elle être défaite (annuler, retirer, revenir) ? Échap et « Retour » fonctionnent-ils ? | ☐ | |
| 4 | Cohérence et standards | Le même geste porte-t-il le même nom et la même forme partout ? La partie publique et l'espace connecté ont-ils la même marque et la même navigation ? | ☐ | |
| 5 | Prévention des erreurs | Les choix impossibles sont-ils désactivés avec leur raison (complet, quota) ? Un geste lourd est-il confirmé ? | ☐ | |
| 6 | Reconnaître plutôt que se rappeler | Tous les choix sont-ils visibles sans mémoire (jours, heures, formules) ? Retrouve-t-on ce qu'on a fait sans chercher ? | ☐ | |
| 7 | Flexibilité et efficacité | La tâche hebdomadaire est-elle plus courte que la tâche unique ? L'écran d'arrivée d'un habitué est-il déjà sa tâche ? | ☐ | |
| 8 | Design minimaliste | **Chaque fonction à l'écran sert-elle une tâche du plan ?** Liste les fonctions (recherche, filtres, raccourcis, barre latérale, tri, export) et la tâche qui justifie chacune. Une fonction sans tâche est un gadget : on la retire | ☐ | |
| 9 | Aider à reconnaître et corriger les erreurs | Formulaire envoyé vide, valeur fausse, créneau complet : le message est-il écrit, près du champ, et dit-il quoi faire ? | ☐ | |
| 10 | Aide et documentation | Ce qu'il faut savoir avant (prix, durée, pièces à fournir, règles d'annulation) est-il écrit là où l'on en a besoin ? | ☐ | |

Source : Jakob Nielsen, « 10 Usability Heuristics for User Interface Design », Nielsen Norman Group, 1994, revu en 2024, https://www.nngroup.com/articles/ten-usability-heuristics/. Les questions de la troisième colonne sont notre application à un projet ; les noms et le sens des heuristiques sont de l'auteur.

## 3. Règles mobile, avec preuve

Mesurées pendant la passe « doigt ».

| # | Règle | Conforme | Preuve (mesure ou capture) |
|---|---|---|---|
| M1 | Toute cible touchée pendant les parcours fait au moins 44 × 44 px de zone cliquable ; aucune n'est sous 24 × 24 px (WCAG 2.2, 2.5.5 et 2.5.8 ; NN/g : 1 cm) | ☐ | plus petite cible : … px |
| M2 | Deux cibles voisines ne se touchent pas (NN/g, « Touch Targets on Touchscreens ») | ☐ | |
| M3 | Aucun tableau de plus de trois colonnes à 390 px : des cartes ou des lignes empilées (NN/g, « Mobile Tables ») | ☐ | |
| M4 | Aucun geste ne dépend du survol, d'un raccourci clavier ou d'un glisser sans autre moyen (WCAG 2.2, 2.5.7) | ☐ | |
| M5 | Les champs ouvrent le bon clavier et se remplissent seuls : `type`, `inputmode`, `autocomplete` (WCAG 2.2, 3.3.7) | ☐ | champs relevés : … |
| M6 | Aucun défilement horizontal de la page pendant les parcours ; une rangée qui défile montre qu'elle continue | ☐ | |
| M7 | L'action principale de chaque écran est visible sans chercher : au plus un écran de défilement avant de la voir | ☐ | |
| M8 | Le menu, la connexion et le retour à l'accueil sont atteignables depuis chaque écran du parcours | ☐ | |

M6 à M8 sont des règles de kobo-studio (déduites des heuristiques 1, 3 et 6), pas des citations.

## 4. Erreurs du domaine

Pour chaque fiche de `ux/patterns/domaines/` lue à l'étape de méthode, reprends son tableau « Erreurs fréquentes » et écris, ligne par ligne, « absente » avec la preuve, ou « présente ». Une erreur présente est une case non conforme.

## 5. Verdict

- **Parcours OK** : toutes les tâches jouées aux deux passes, chacune dans son objectif d'étapes ; les dix heuristiques et les règles mobile conformes ou sans objet justifié ; aucune erreur du domaine présente.
- **À corriger** : tout le reste. **On corrige, puis on rejoue les tâches touchées. On ne livre pas un projet « à corriger ».** Ce qui ne peut pas être corrigé (une pièce manque à kobo-studio) s'écrit au client comme une limite, en première partie du message, et le verdict reste « à corriger ».

## Sans navigateur piloté

Si tu n'as aucun moyen de piloter un navigateur (ni Playwright, ni équivalent) : ne remplace pas le jeu par une lecture du code. Écris « **PARCOURS NON JOUÉS** » en première ligne du message de livraison, laisse le tableau avec « non joué » dans chaque case, et dis ce qu'il faudrait pour le faire. Le verdict est alors « non vérifié », jamais « OK ».

## Ce que cette grille ne voit pas

- Le doigt est simulé : ni la gêne du pouce, ni la lecture en plein soleil, ni un vrai clavier de téléphone qui recouvre le champ.
- Aucun lecteur d'écran, aucun autre navigateur que celui piloté.
- Celui qui joue a écrit le projet : il sait où cliquer. Une vraie personne hésite là où il ne voit rien. La grille trouve les parcours cassés ou trop longs, pas les parcours déroutants.
