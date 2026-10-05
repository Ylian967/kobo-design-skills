# Couleurs de marque d'un client

On pose les couleurs du client **par-dessus** le skill, dans un fichier du projet. On ne touche ni au skill, ni à sa fiche, ni à `kobo/`.

## Ce que la marque peut changer

| Niveau | Ce qui change | Quand |
|---|---|---|
| **1 — l'accent** | `--k-accent`, `--k-on-accent`, `--k-accent-edge`, `--k-accent-2`, parfois `--k-focus` | Le cas courant : une couleur de marque |
| **2 — les surfaces** | En plus : fonds, textes, filets, paire inversée, couleurs d'état | Seulement si la marque impose son fond |

La marque ne redéfinit que des rôles `--k-*`. **Jamais** une variable du skill, **jamais** un `--k-sig-*` : les ornements de signature gardent les couleurs du skill. Si la couleur du client jure avec eux, baisse l'intensité (`reduced` ou `off`) ou change de skill ; dis-le au client.

À dire au client avant de commencer : dans un skill dont l'identité **est** une couleur (le lime de pixel-lime-portfolio, l'orange de signal-orange-techwear, le vert d'acid-scan-security), remplacer l'accent défait le style. Propose plutôt un skill à accent neutre (alpine-glass-expedition, chrome-atelier, glacial-mono-3d, glass-frame-estate, lore-frame-editorial, pocket-device-noir) : la marque y prend la place d'`--k-accent-2` sans rien casser.

## Marche à suivre

1. **Copier le modèle** : `python3 <kobo-studio>/tools/kit.py <projet> --skill <id> --structure <structure> --marque` écrit `<projet>/brand.css`.
2. **Le charger en dernier**, après la couche de signature, et poser l'attribut sur `<html>` :

   ```html
   <html lang="fr" data-k-skill="<id>" data-k-intensity="full" data-k-brand>
   …
   <link rel="stylesheet" href="kobo/kobo-studio/components/signatures/<id>.css">
   <link rel="stylesheet" href="brand.css">
   ```

3. **Remplir le niveau 1**, les quatre lignes ensemble :

   ```css
   :root[data-k-brand] {
     --k-accent: #1f5fd0;        /* la couleur du client, code exact */
     --k-on-accent: #ffffff;     /* blanc ou noir : celui qui atteint 4.5:1 sur l'accent */
     --k-accent-edge: var(--k-accent);
     --k-accent-2: #17489e;      /* seconde couleur de la marque, ou une nuance plus sombre / plus claire */
     --k-accent-on-bg: 1;
   }
   ```

4. **Vérifier**, toujours :

   ```bash
   python3 <kobo-studio>/tools/check_studio.py <projet>
   ```

   Le script recalcule les 22 paires du contrat avec les couleurs de la marque (lignes `brand.css : …`), puis mesure le contraste sur capture.

`brand.css` est le seul fichier du projet où une couleur s'écrit en dur.

## Les contrastes à tenir

| Paire | Seuil | Si elle échoue |
|---|---|---|
| `--k-on-accent` sur `--k-accent` | 4.5:1 | Passer `--k-on-accent` du blanc au noir (ou l'inverse). Si aucun des deux n'atteint 4.5:1, l'accent est trop moyen : le foncer ou l'éclaircir **avec l'accord du client** |
| `--k-accent` sur `--k-bg` | 3:1 | Voir « Accent pâle » ci-dessous |
| `--k-focus` sur `--k-bg` | 3:1 | À revoir seulement si le contour de focus du skill reprenait l'ancien accent |
| Niveau 2 : `text`, `text-2`, `text-muted`, `success`, `warning`, `danger`, chacun sur `bg`, `surface`, `surface-2` | 4.5:1 | Ajuster la clarté de la couleur fautive, en gardant sa teinte |
| Niveau 2 : `--k-text-inverse` sur `--k-bg-inverse` | 4.5:1 | Idem |

### Accent pâle

Si la couleur du client n'atteint pas 3:1 sur le fond du skill (un jaune sur fond clair, un bleu nuit sur fond noir), on ne la modifie pas. On déclare :

```css
--k-accent-edge: #2a2a2a;   /* une couleur du skill ou de la marque qui atteint 3:1 sur --k-bg : elle cerne tout aplat d'accent */
--k-accent-on-bg: 0;        /* l'accent ne porte plus jamais seul une information sur le fond */
```

Avec le drapeau à `0`, les composants n'écrivent plus de texte, de lien, d'icône ni d'état actif en accent seul : l'accent reste un aplat cerné (bouton, étiquette). `check_studio.py` refuse un drapeau qui ne correspond pas au contraste mesuré.

### Niveau 2

Quand le fond change, **toutes** les paires changent. Remplis les lignes du modèle dans l'ordre (fond, surfaces, textes, filets, paire inversée), puis recalcule les trois couleurs d'état sur le nouveau fond : garde leur teinte, règle leur clarté jusqu'à 4.5:1 sur `--k-bg`, `--k-surface` et `--k-surface-2`. Pas de vert ni de rouge standard.

## Après la vérification

- Regarde les captures : la couleur de marque est-elle la seule chose qui attire l'œil dans chaque écran ? Un ornement de signature (`--k-sig-*`) garde-t-il une couleur qui jure ?
- Un texte posé sur une photo dépend de la photo, pas de la marque : s'il échoue, c'est la photo qu'on change.
- À la livraison, range dans **Mesuré** les paires recalculées, et dans **Estimé** l'accord visuel entre la marque et la signature du skill.

## Limites

- Le script ne mesure pas les couleurs d'état ni le texte secondaire sur `--k-bg-inverse` : à regarder sur capture si la page a un bloc en ton inversé avec un message d'erreur.
- Une police de marque n'est pas prévue par ce modèle : la typo fait partie du skill. Si le client impose sa police, redéfinis `--k-font-display` ou `--k-font-body` dans `brand.css`, charge la police dans la page, et préviens que l'échelle des tailles a été réglée pour la police d'origine.
