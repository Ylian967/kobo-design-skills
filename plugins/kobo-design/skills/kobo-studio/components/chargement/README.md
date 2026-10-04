# Chargement : squelette et barre de progression

**Rôle.** Faire patienter sans mentir. Le **squelette** tient la place d'un contenu qui arrive ; la **barre** dit où en est une opération longue.

Fichiers : `chargement.css`, `chargement.js` (barre seulement), `Chargement.jsx`. Composant non interactif.

## Lequel choisir

| Situation | Composant |
|---|---|
| Un contenu se charge, on connaît sa forme | squelette |
| Une opération dure, on connaît l'avancement | barre avec pourcentage |
| Une opération dure, on ne sait pas combien | barre « durée inconnue » |
| Une action de moins d'une seconde | rien, ou le bouton en `aria-busy` |

## Squelette

```
[aria-busy="true"]                    le conteneur (carte, liste, panneau)
├── span.k-sr-only[role="status"]     « Chargement des guides… »
└── span.k-skeleton[aria-hidden]      blocs : --title, --short, --medium, --media, --circle
```

Les blocs reprennent la forme du contenu attendu (une image, un titre, deux lignes). Ils pulsent doucement ; pas de reflet qui glisse. Quand le contenu arrive, il remplace les blocs et `aria-busy` repasse à `false`.

## Barre de progression

```
.k-progress                           [k-progress--indeterminate] ; data-k-state="done|error"
├── .k-progress__head
│   ├── span                          ce qui progresse
│   └── .k-progress__value            « 40 % », écrit en toutes lettres
├── .k-progress__track[role="progressbar"]   aria-valuenow, aria-valuemin, aria-valuemax
│   └── .k-progress__bar              largeur = --_value (0 à 1)
├── p.k-progress__status--done        icône + « Terminé… »
└── p.k-progress__status--error       icône + message d'échec
```

## États

| État | Déclencheur | Rendu |
|---|---|---|
| En cours | `--_value` entre 0 et 1 | barre de la couleur d'accent si `--k-accent-on-bg` vaut 1, sinon de la couleur du texte ; pourcentage écrit |
| Durée inconnue | `k-progress--indeterminate` | la barre va et vient ; le texte dit « en cours… » |
| Terminé | `data-k-state="done"` | barre pleine, icône et « Terminé » |
| Erreur | `data-k-state="error"` | barre `--k-danger`, icône et message qui dit quoi faire |
| Vide | valeur 0 | piste seule, « 0 % » |

Survol, focus et désactivé ne s'appliquent pas.

## Script

```js
Kobo.progress.set('import', 0.4);     // largeur, aria-valuenow et texte « 40 % »
Kobo.progress.set('import', 1);       // passe en « terminé »
Kobo.progress.fail('import', 'Import interrompu à la ligne 47 : date illisible.');
Kobo.progress.reset('import');
```

## Accessibilité

- Squelette : les blocs sont `aria-hidden` ; c'est le texte `role="status"` qui annonce le chargement.
- Barre : `role="progressbar"` avec un nom (`aria-labelledby` ou `aria-label`) et `aria-valuetext`.
- Un chargement a toujours une fin : contenu, état vide, ou erreur avec une action. Jamais un squelette qui tourne sans limite.
- Terminé et échec ne reposent pas sur la couleur : icône + mot.
- `prefers-reduced-motion` : le squelette ne pulse plus ; la barre « durée inconnue » devient une bande fixe.

## Exemple

```html
<div class="k-progress" id="import">
  <div class="k-progress__head"><span id="import-l">Import de reservations.csv</span><span class="k-progress__value">0 %</span></div>
  <div class="k-progress__track" role="progressbar" aria-labelledby="import-l" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="k-progress__bar"></div></div>
  <p class="k-progress__status k-progress__status--done" role="status"><svg class="k-icon" aria-hidden="true">…</svg><span>Terminé.</span></p>
  <p class="k-progress__status k-progress__status--error" role="alert"><svg class="k-icon" aria-hidden="true">…</svg><span></span></p>
</div>
```

```jsx
<ZoneEnChargement enCours={chargement} annonce="Chargement des guides…"
                  squelette={<><Squelette forme="title" /><Squelette forme="medium" /></>}>
  <ListeGuides />
</ZoneEnChargement>
<BarreProgression libelle="Import de reservations.csv" valeur={avancement} echec={erreur} />
```
