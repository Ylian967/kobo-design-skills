# Notification (toast)

**Rôle.** Confirmer le résultat d'une action, ou prévenir, sans interrompre. Pour une décision à prendre, c'est une modale.

Fichiers : `notification.css`, `notification.js`, `Notification.jsx`.

## Anatomie

```
.k-toasts[role="region"][aria-label="Notifications"]     fixe, en bas à droite
├── .k-toasts__live[aria-live="polite"]                   succès, information, avertissement
└── .k-toasts__live[aria-live="assertive"]                erreurs
    └── .k-toast.k-toast--{success|info|warning|error}
        ├── svg.k-icon.k-toast__icon                      icône du type
        ├── div
        │   ├── p.k-toast__title                          mot du type (lecteur d'écran) + titre
        │   ├── p.k-toast__text
        │   └── button.k-toast__action                    action facultative (« Réessayer », « Rétablir »)
        └── button.k-toast__close                         aria-label « Fermer la notification : … »
```

## Types

Un type n'est **jamais** signalé par la couleur seule : chacun a son icône et son mot.

| Type | Mot annoncé | Annonce | Fermeture |
|---|---|---|---|
| `success` | Succès | polie | seule après 6 s, ou au bouton |
| `info` | Information | polie | seule après 6 s, ou au bouton |
| `warning` | Attention | polie | seule après 6 s, ou au bouton |
| `error` | Erreur | immédiate | **reste** jusqu'à fermeture |

## États

| État | Rendu |
|---|---|
| Entrée | monte de `--k-space-4` en fondu (`--k-dur-base`) |
| Repos | fond `--k-surface`, bordure `--k-line-strong`, filet gauche de la couleur du type |
| Survol ou focus dans la notification | le compte à rebours s'arrête |
| Focus clavier sur « Fermer » | contour `--k-focus` |
| Sortie | fondu de `--k-dur-fast` |

## Script

```js
const n = Kobo.toast({ type: 'success', title: 'Réservation enregistrée', text: 'La confirmation part vers vous.' });
n.close();
Kobo.toast({ type: 'info', title: 'Réservation annulée', action: { label: 'Rétablir', onClick: retablir }, duration: 0 });
```

`duration` : millisecondes (6000 par défaut ; 0 = reste). `returnFocus` : élément qui reprend le focus si la notification fermée l'avait.

## Clavier

`Tab` atteint le bouton d'action puis « Fermer ». `Échap` ferme la notification qui a le focus. Une notification ne prend jamais le focus d'elle-même.

## Accessibilité

- La zone `aria-live` existe **avant** l'insertion : le script la crée au premier appel ; en React, `<ZoneNotifications>` la rend dès le départ.
- Une notification qui porte une action ne doit pas disparaître seule : passer `duration: 0`.
- Le bouton « Fermer » a une zone cliquable de `--k-hit-min`.
- `prefers-reduced-motion` : ni entrée ni sortie animée.
- Les durées d'affichage (6 s, 200 ms de sortie) sont dans le script, pas dans le contrat : ce ne sont pas des durées de mouvement.

## Exemple

```jsx
<ZoneNotifications>
  <App />
</ZoneNotifications>

const { notifier } = useNotifications();
notifier({ type: 'error', titre: 'Paiement refusé', texte: 'Rien n’a été débité.', action: { libelle: 'Réessayer', surClic: payer } });
```
