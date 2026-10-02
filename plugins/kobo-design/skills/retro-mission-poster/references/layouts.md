# Retro Mission Poster — mises en page

## Chapitres plein écran

Chaque chapitre = `100vh` (ou `100dvh`), défilement par chapitre (`scroll-snap-type: y mandatory` ou défilement piloté).

```
┌─ cadre crème ─────────────────────────────┐
│ LOGO                                  ≡   │
│                         CHAPITRE 1        │
│   (photos collage)      TITRE EN          │
│                         BIAIS             │
│                              ACCROCHE     │
│              ( ↓ )           [BOUTON]     │
└───────────────────────────────────────────┘
```

## Chapitre « mission »

Image réelle du ciel (planète, lancement) en haut, désert en bas, silhouettes ou horizon détouré au premier plan (voir `assets.md`), mot géant rouge entre les deux, anneau ↓ en bas au centre.

## Pages de lecture (si nécessaire)

Fond `--bg`, colonne de 560px, titres en Big Shoulders 48px, texte Jost 16px crème ; le cadre reste.

## Mobile

- Cadre 8px. Titres de chapitre à 56px, alignés à gauche, rotation réduite (-3°).
- Mot géant à 22vw.
- Accroche sous le titre (plus en bas à droite), bouton pleine largeur.
- Images recadrées en portrait, silhouettes conservées.
