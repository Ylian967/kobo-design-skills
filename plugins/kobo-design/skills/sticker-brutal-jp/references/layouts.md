# Sticker Brutal JP — mises en page

Contenu de 1248px (marges de 96px à 1440), posé dans le cadre. Les sections viennent du site en ligne ; le cadre et les autocollants viennent du shot.

## Page d'accueil

```
  ◆ autocollant                                      ( ● Français )
╭────────────────────────────────────────────────────────────────╮
│ (ミ mio.design)        Projets Services Avis Journal Contact    │ 89px
│                                                                │
│ Bonjour, moi c'est Mio            (ミオ)  ▸        デ ミ        │
│ DESIGN                         ┌───────────┐       ザ オ        │
│ NOMADE                    [▥]  │ portrait  │       イ ・        │
│ 国境をこえるデザインを。        │ sur rose  │       ン ア        │
│ Chapeau (560px)             (◉) ╲         ╱           ラ        │
│ [ Parlons-en ]                    ╲     ╱   (✓ Disponible)     │
├────────────────────────────────────────────────────────────────┤ blanc
│ « citation »  ○ nom          « Grande citation »  ○ nom         │
├────────────────────────────────────────────────────────────────┤
│              Votre marque, jusqu'au Japon.                      │
│   [fiche service]   [fiche service]   [fiche service]           │
├────────────────────────────────────────────────────────────────┤
│                     Projets récents                             │
│  texte ·················│████ image de travers ████            │ damier
│  ████ image ████████████│ texte ····················           │
├────────────────────────────────────────────────────────────────┤ jaune
│                 À lire dans le journal                          │
│        [fiche article]          [fiche article]                 │
├────────────────────────────────────────────────────────────────┤
│  Parlez-moi de votre projet        [nom][e-mail]                │
│  texte, adresse                    [site][message]   [Envoyer]  │
╰────────────────────────────────────────────────────────────────╯
```

Repères mesurés (site, 1440px) : navigation 89px ; héros 714px, deux colonnes égales ; bande des témoignages 628px ; section des services à 100px de marge haute et basse, trois fiches de 381px ; bande du journal à marges 60px / 100px ; contact à marges 100px / 60px.

Les autocollants jalonnent les deux bords du cadre, un tous les 300 à 800px, en alternant gauche et droite.

## Tablette (sous 1040px)

Menu replié ; la pilule de langue remonte au-dessus du cadre ; tuiles de service de 120px.

## Mobile (sous 820px)

- Une colonne partout. Dans le héros, le portrait passe **au-dessus** du texte (380px de large au plus).
- Damier : texte puis image, dans l'ordre de lecture, pour chaque projet.
- Formulaire sur une colonne, bouton sur toute la largeur.
- Autocollants réduits à 64px ; les demi-anneaux des bords sont masqués, seuls restent l'étoile, la spirale et le tampon.
- Rayon du cadre ramené à 26px.

## Autres pages

Le site en ligne en a d'autres (services, boutique, blog) qui n'ont pas été mesurées. Propositions dans le même langage :

**Projets.** Titre en `--font-jp-display`, rangée d'étiquettes servant de filtres, puis le damier texte / image sur toute la hauteur.

**Étude de cas.** Bandeau de couleur pleine avec l'image de travers, étiquettes, titre gras ; texte sur 700px ; chiffres clés dans trois fiches autocollantes.

**Journal.** Grille de fiches d'article sur deux colonnes, sur fond `--yellow` pour la une et `--paper` ensuite.

**Contact.** La section de contact seule, avec une courte liste de questions fréquentes en fiches dépliables.

## Règles

- Le cadre entoure toute la page ; aucune section n'en sort.
- Deux bandes de couleur pleine au plus par page (blanc des témoignages, jaune du journal).
- Titres de section centrés ; textes du héros et du contact alignés à gauche.
- Un autocollant ne recouvre jamais un texte : il vit sur le bord du cadre ou autour du portrait.
