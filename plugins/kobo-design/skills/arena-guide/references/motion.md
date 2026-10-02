# Arena Guide — mouvement

## Principes

Mesuré : `transform, filter 0.3s ease` (×24, survols), `all 0.2s linear` (×10), et sur boutons/onglets une courbe très « snap » : `color 1s, border-color 0.5s cubic-bezier(0.06, 0.81, 0, 0.98)` — le changement est presque instantané puis se pose lentement. `color, background-color 0.25s/0.3s ease-in-out`.

## Catalogue

| Moment | Effet | Durée | Courbe |
|---|---|---|---|
| Survol d'un médaillon | scale 1.05 + luminosité | 300ms | ease |
| Changement d'onglet | Le grand médaillon et le texte se croisent en fondu ; l'anneau change de couleur | 500ms | `--ease-snap` |
| Couleur des libellés d'onglet | inactif → actif | 1s | `--ease-snap` |
| Changement de vignette vidéo | Contour or apparaît, vidéo en fondu | 300ms | ease |
| Apparition de section | Titre qui monte de 24px + fondu | 600ms | `--ease-snap` |
| Bouton | Luminosité | 200ms | linéaire |

## Code de référence

```js
// Onglets médaillons : clic + flèches gauche/droite
document.querySelectorAll('[role=tablist]').forEach(list => {
  const tabs = [...list.querySelectorAll('[role=tab]')];
  const select = t => { tabs.forEach(x => x.setAttribute('aria-selected', x === t)); t.focus(); list.dispatchEvent(new CustomEvent('change', { detail: tabs.indexOf(t) })); };
  tabs.forEach(t => t.addEventListener('click', () => select(t)));
  list.addEventListener('keydown', e => { const i = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true'); if (e.key === 'ArrowRight') select(tabs[(i + 1) % tabs.length]); if (e.key === 'ArrowLeft') select(tabs[(i - 1 + tabs.length) % tabs.length]); });
});
```

## Mouvement réduit

Changements d'onglet sans fondu, vidéos en pause par défaut avec bouton lecture, pas d'apparition animée.
