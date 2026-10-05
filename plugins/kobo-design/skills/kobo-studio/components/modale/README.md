# Modale

**Rôle.** Demander une décision ou une saisie courte sans quitter la page. À réserver à ce qui doit vraiment interrompre.

Fichiers : `modale.css`, `modale.js`, `Modale.jsx`.

Elle repose sur l'élément `<dialog>` ouvert par `showModal()` : piège du focus, touche Échap et mise hors service du reste de la page sont fournis par le navigateur.

## Anatomie

```
dialog.k-modal[aria-labelledby]      [k-modal--wide] ; role="alertdialog" pour une confirmation
├── .k-modal__head
│   ├── h2.k-modal__title
│   └── button[data-k-modal-close]   croix avec aria-label (absente d'une confirmation)
├── .k-modal__body                   défile si le contenu dépasse
└── .k-modal__foot                   actions : la moins risquée reçoit autofocus
```

Déclencheur : `<button type="button" data-k-modal-open="id">`. Fermeture : `data-k-modal-close` ou `data-k-modal-close="valeur"` ; la valeur se lit dans `dialog.returnValue` à l'événement `close`.

## États

| État | Déclencheur | Rendu |
|---|---|---|
| Fermée | — | absente |
| Ouverte | `showModal()` | fenêtre centrée, voile `--k-overlay` ; entrée en fondu de `--k-dur-base` |
| Chargement | bouton d'action en `aria-busy` | la fenêtre reste ouverte jusqu'à la réponse |
| Erreur | message dans le corps ou champ en erreur | la fenêtre reste ouverte ; le focus va sur le premier champ fautif |

## Variantes

| Réglage | Usage |
|---|---|
| `k-modal--wide` | contenu plus large |
| `data-k-modal-dismiss="backdrop"` | un clic sur le voile ferme. Jamais sur une confirmation |
| `role="alertdialog"` | confirmation d'une action sensible : pas de croix, pas de fermeture par le voile, deux boutons explicites |

## Clavier

| Touche | Effet |
|---|---|
| `Entrée` / `Espace` sur le déclencheur | ouvre ; le focus va sur l'élément `autofocus`, sinon sur le premier élément focalisable |
| `Tab` / `Maj+Tab` | tourne dans la fenêtre sans en sortir |
| `Échap` | ferme, sans valeur de retour |

À la fermeture, le focus revient au déclencheur.

## Accessibilité

- Nom par `aria-labelledby` (le titre) ; pour une confirmation, `aria-describedby` vers le texte.
- Dans une confirmation, le focus initial va sur l'action **la moins risquée** (« Garder ma place »), et le bouton destructeur dit ce qu'il fait (« Oui, annuler »), pas « OK ».
- La page derrière ne défile pas tant que la fenêtre est ouverte.
- `prefers-reduced-motion` : pas d'animation d'entrée.

## Exemple

```html
<button type="button" class="k-btn k-btn--danger" data-k-modal-open="annuler">Annuler ma réservation</button>

<dialog class="k-modal" id="annuler" role="alertdialog" aria-labelledby="annuler-t" aria-describedby="annuler-d">
  <div class="k-modal__head"><h2 class="k-modal__title" id="annuler-t">Annuler la réservation ?</h2></div>
  <div class="k-modal__body" id="annuler-d"><p>Votre place sera rendue. Le remboursement est intégral jusqu'à sept jours avant la sortie.</p></div>
  <div class="k-modal__foot">
    <button type="button" class="k-btn k-btn--secondary" data-k-modal-close autofocus>Garder ma place</button>
    <button type="button" class="k-btn k-btn--danger" data-k-modal-close="annule">Oui, annuler</button>
  </div>
</dialog>
```

```jsx
<Modale ouverte={ouverte} surFermer={(valeur) => { setOuverte(false); if (valeur === 'annule') annuler(); }}
        titre="Annuler la réservation ?" alerte
        pied={<><Bouton variante="secondary" data-k-autofocus onClick={() => setOuverte(false)}>Garder ma place</Bouton>
                <Bouton variante="danger" onClick={annuler}>Oui, annuler</Bouton></>}>
  Votre place sera rendue. Le remboursement est intégral jusqu'à sept jours avant la sortie.
</Modale>
```
