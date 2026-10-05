# Banc d'essai React

Les pages qui ont servi à essayer dans un vrai navigateur les versions React des 20 composants, des 4 structures et des gabarits du héros (étape 6). Données fictives (« Cordée Brume »).

| Page | Ce qu'elle rend |
|---|---|
| `composants.html` | les 20 composants, une section par composant (`#nav`, `#tableau`…) |
| `accueil.html`, `interieure.html`, `landing.html`, `article.html`, `recit.html` | les 4 structures (le site vitrine a deux pages) |
| `gabarits.html` | la landing avec `emplacements={gabarits(skill)}` ; `&page=accueil`, `&sans-image`, `&strict`, `&i=off` |

Le skill se choisit dans l'adresse : `?skill=nocturne-architecture` (fiche et couche de signature chargées à l'exécution). Joué sous glass-frame-estate, tiny-planet-toy, sticker-brutal-jp et acid-scan-security : résultats dans `../relecture-etape-6.md`.

```bash
ln -s ../../examples/restaurant-react/node_modules node_modules      # React et Vite, déjà installés pour l'essai restaurant ; à retirer ensuite (le lien n'est pas ignoré par git)
PAGES=composants,accueil,interieure,landing,article,recit,gabarits node node_modules/vite/bin/vite.js build
python3 -m http.server 8766 --directory ../../..     # les skills : fiches, tokens, signatures (adresse attendue par les pages)
python3 -m http.server 8767 --directory dist         # le banc
```

Une compilation, puis deux serveurs de fichiers : pas de serveur de développement. Le navigateur garde les fichiers en cache : le désactiver avant de relire une correction.
