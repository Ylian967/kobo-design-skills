# Signal Orange Techwear — images et pictogrammes

## Ce que montre la référence

Des **images de synthèse** : silhouettes en techwear noir avec des pièces d'armure orange, un crâne orange sous une capuche, une chaussure noire et orange sur fond gris. Le noir et l'orange de l'interface sont **dans les images elles-mêmes**.

## Ce que fait le skill

De vraies photos ne portent pas cet orange. Le skill garde donc la palette par le traitement :

- **Une photo en couleur, à dominante orange ou ambrée, pour le héros** (visage masqué éclairé par une lumière chaude). C'est elle qui porte l'orange de l'image.
- **Toutes les autres photos en noir et blanc**, sombres : l'orange ne vient plus que de l'interface.
- Le noir et blanc est demandé au serveur d'images (`&sat=-100`), jamais fait par `filter`.

| Rôle | Type de photo | Recadrage |
|---|---|---|
| Silhouette du héros | Portrait serré, masque, capuche ou casque, fond sombre | `w=900&h=1200&fit=crop` |
| Fond d'écran | Silhouette de dos ou en pied, peu de détails, sombre | `w=1600&h=1000&sat=-100`, opacité 0.5 sous un voile |
| Fiche produit | Pièce portée ou objet seul, cadrage serré | `w=520&h=560&sat=-100` |
| Fiche claire | Objet sombre sur fond clair uni | `w=1200&h=1100&sat=-100` |
| Vignettes | Même objet, en petit | `w=160&h=160&sat=-100` |

## Photos de la démo (Unsplash)

| Rôle | Identifiant |
|---|---|
| Héros, look 1 (couleur) | `photo-1739470339657-55ea0fb7bae3` |
| Héros, look 2 | `photo-1580046939256-c377c5b099f1` |
| Héros, look 3 ; col Seconde peau | `photo-1659141632957-a2cd74b8a446` |
| Héros, look 4 ; masque Filtre | `photo-1582178538120-06a684adaec5` |
| Fond de l'écran 2 ; veste Vecteur | `photo-1535732176766-a9a9513547e5` |
| Fond de l'écran 3 ; sweat Tunnel | `photo-1626759486966-c067e3f79982` |
| Capuche Ombre | `photo-1715157067742-f63a790da34e` |
| Sac NX-01 (fiche de la grille, « produit suivant ») | `photo-1622560481979-f5b0174242a0` |
| Sac NX-01 (écran clair, vignette du héros) | `photo-1541267732407-8f72c182cf11` |

## Choisir une photo

- **Sombre d'abord** : fond noir ou très foncé, sujet éclairé de côté.
- **Visage caché** : masque, capuche, casque, dos. Le style perd son mystère avec un visage souriant.
- **Pas de marque lisible** sur le vêtement ou l'objet.
- Pour le héros, une lumière **orange ou ambrée** ; éviter le rouge vif et le bleu néon, qui concurrencent l'orange.
- Toujours un texte alternatif pour les fiches produit ; les silhouettes de fond sont décoratives (`alt=""`).

## Pictogrammes

Tracés SVG en ligne, au trait de 1.3 à 1.5, sans remplissage : casque (logo), compte, chevron, menu. Les flèches sont le signe ↗ ; les réseaux sont des lettres dans un rond.

## Polices

- **Unbounded** 700, 800 (Google Fonts) : titres empilés.
- **Orbitron** 400, 500, 600 : tout le reste — navigation, textes, étiquettes, valeurs.

## Interdits

- Pas de silhouette dessinée en CSS ou en SVG, pas d'illustration de substitution.
- Pas de photo en couleur vive hors du héros.
- Pas de flou d'arrière-plan sous les panneaux, pas de grain animé.
