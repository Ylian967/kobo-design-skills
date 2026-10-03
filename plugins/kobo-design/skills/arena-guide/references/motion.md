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

## Pages internes (observé le 2026-10-02)

Durées mesurées quand la feuille de style les donne (0.3s ease, 0.2s linéaire, courbe snap), sinon **estimées (≈)**.

| Moment | Effet | Durée | Courbe |
|---|---|---|---|
| Survol carte champion | Image zoom 1.05 ; bandeau navy → ardoise `--card-hover` | 300ms (mesuré `transform, filter 0.3s ease`) | ease |
| Ouverture menu déroulant | Onglet → fond gris foncé ; panneau en fondu + glissement de 4px vers le bas | ≈ 200ms | linéaire |
| Survol lien du menu | Blanc → or | 200ms | linéaire |
| Changement de compétence | Icône active : bord or ; nom gris → blanc (1s, `--ease-snap`) ; vidéo en fondu croisé | 300ms (vidéo) / 1s (couleur) | `--ease-snap` |
| Changement de skin | Grande image en fondu croisé + léger zoom 1.02 → 1 ; cadre or qui saute sur la vignette ; barre de progression qui s'allonge | ≈ 500ms | `--ease-snap` |
| Héros fiche champion | Splash qui se décale de 24px vers la gauche à l'arrivée, texte qui monte de 24px | ≈ 800ms | `--ease-snap` |
| Survol carte d'actu | Image zoom 1.05, titre souligné | 300ms | ease |

```css
.dropdown:not([hidden]) { animation: drop var(--dur-fast) linear both; }
@keyframes drop { from { opacity: 0; transform: translateY(-4px); } }
.skins__stage img { transition: opacity var(--dur-base) var(--ease-snap), transform 500ms var(--ease-snap); }
.skins__stage img.is-out { opacity: 0; transform: scale(1.02); }
```

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

Changements d'onglet, de compétence et de skin sans fondu ni zoom, vidéos en pause par défaut avec bouton lecture, pas d'apparition animée ; le menu déroulant s'ouvre sans glissement.
