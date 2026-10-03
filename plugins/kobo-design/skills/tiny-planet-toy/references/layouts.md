# Tiny Planet Toy — mises en page

## Écran-titre (plein écran, pas de défilement)

```
┌──────────────────────────────────────┐
│ ·        ·            ·        ·     │  poussières
│            ( planète + logo )         │  centre, 60–70 % de la hauteur
│                 [ BEGIN ]             │  bouton jaune penché sous la planète
│ ·    ·                    ·          │
└──────────────────────────────────────┘
```
Hauteur `100dvh` (ou `height: 100%` sur html/body), centrage en grid, aucun autre texte visible.

## Écran d'exploration

La planète grossit et la caméra se rapproche ; HUD dans les coins ; bulles de dialogue ancrées en bas au centre (max 520px).

## Pages d'information (crédits, à propos)

Panneau crème centré (max 560px) sur fond turquoise, titre Bungee, texte Nunito, bouton « Retour » relief. Ouvert par-dessus la scène, la planète continue de tourner derrière (floutée 4px).

## Mobile

- Planète à 80vw, logo réduit, bouton à 70 % de la hauteur.
- Interaction au doigt : glisser pour tourner, toucher pour parler.
- Orientation portrait privilégiée ; en paysage, la planète à gauche et les bulles à droite.

---

## Séquence réelle (observée sur le site, 2026-10-03)

1. **Chargement** blanc (enveloppe dessinée + « CHARGEMENT ») ~10s.
2. **Volet turquoise incliné** qui recouvre le blanc par le bas, planète minuscule au centre.
3. La planète **grandit** en tournant, les poussières apparaissent, puis les **blocs du logo** tombent un à un ; le **bloc de départ** jaune apparaît dessous (~10s après le volet).
4. Clic → retour au **chargement** blanc → volet incliné → **scène de jeu** plein écran, sans interface.

Sur un écran étroit (612px), la composition reste centrée : planète et logo occupent ~80 % de la largeur, bloc de départ à ~85 % de la hauteur.
