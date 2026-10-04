# Vérification des sources de site-to-skill

Vérifié le 4 octobre 2026.

## Remarque préalable

`site-to-skill/SKILL.md` **ne contient aucune liste de sources** : il décrit une méthode (cadrer, mesurer, observer, normaliser, écrire, prouver) à partir d'une URL fournie. Le `catalogue` cite seulement l'origine des 23 skills existants (sites de jeux, Awwwards, Dribbble). Les sources vérifiées ici sont donc celles de la consigne, à ajouter à kobo-studio ou à site-to-skill à une étape ultérieure.

## Méthode

Chaque source a été testée de deux façons :

1. **Dans le navigateur** (Chrome piloté par Playwright) : code de réponse, adresse finale, titre, longueur du texte lisible, présence de liens de catégorie, mentions de connexion ou d'abonnement.
2. **Sans navigateur** (`curl` avec un agent utilisateur de navigateur) : pour savoir si un outil automatique simple peut lire la page.

« Lecture automatique » se lit donc en deux temps : **navigateur piloté** (oui / non) et **requête simple** (oui / non).

Limites : une seule page d'entrée testée par source, lue en texte ; aucune capture prise. Je n'ai ouvert **aucun compte** et je n'ai pas vérifié le contenu exact des offres payantes : la colonne « payante » repose sur ce que la page d'accueil affiche (liens « Pricing », « Get Pro », « Try 3 Days », redirection vers une page de connexion). Les conditions d'utilisation de chaque site (droit de copier ou d'analyser automatiquement) n'ont pas été lues.

---

## 1. Registre fonctionnel (CRM, ERP, back-office, SaaS)

### Design systems

| Source | Sans compte | Payante | Lecture auto (navigateur / requête simple) | Pages utiles | Qualité pour notre usage | Verdict |
|---|---|---|---|---|---|---|
| **Atlassian Design System** | oui | non | oui / oui (page complète servie en HTML) | `atlassian.design/components` ; fiches `/components/<nom>` (button, form, modal-dialog, empty-state, skeleton, spinner, flag, inline-message…) ; `/foundations` | Excellente. Une fiche par composant avec usage, états et contenu. Couvre exactement ce qui manque aux 23 skills : états vides, messages, formulaires, chargement. | **Garder** (source de référence) |
| **IBM Carbon** | oui | non | oui / partiel (la requête simple ne renvoie presque pas de texte : page rendue par script) | L'ancienne adresse redirige vers `carbondesignsystem.com/building-blocks/core/components/overview/components` ; fondations sous `/building-blocks/foundations/` (color, spacing, motion, typography, 2x-grid) | Excellente pour les écrans denses : data table, pagination, filtres, notifications, progress indicator. Fondations d'espacement et de mouvement très précises. | **Garder** (navigateur obligatoire) |
| **Shopify Polaris** | oui | non | oui / oui | `polaris.shopify.com/components` **et** `polaris-react.shopify.com/components` redirigent tous deux vers `shopify.dev/docs/api/polaris` | **Dégradée.** L'ancien site de design (fiches de composants, patterns, contenu) n'est plus servi : on arrive sur une documentation d'API pour développeurs d'applications Shopify (composants web). Utile pour les noms et les propriétés, beaucoup moins pour les règles d'usage. | **Garder en second rang** ; signaler que l'adresse de la consigne ne mène plus au design system |
| **GitHub Primer** | oui | non | oui / non (la requête simple ne renvoie aucun texte lisible) | `primer.style/product/components/` ; `primer.style/product/ui-patterns/` (empty-states, forms, loading, navigation, notification-messaging, progressive-disclosure, degraded-experiences) ; `primer.style/product/primitives/` (color, size, typography, token-names) | Excellente. La section **UI Patterns** est la plus proche de notre futur socle UX : elle traite des schémas (états vides, chargement, formulaires), pas seulement des composants. Les règles de nommage de tokens sont directement utiles au contrat `--k-*`. | **Garder** (source de référence, navigateur obligatoire) |
| **Salesforce Lightning** | oui | non | oui / oui | `lightningdesignsystem.com` redirige vers le site « Lightning Design System 2 » (adresses à identifiants, ex. `/2e1ef8501/p/…`) : Components, Patterns, Styling Hooks, Visual Language | Bonne pour le CRM pur (c'est le cas d'usage d'origine). Adresses peu lisibles et susceptibles de changer ; bandeau de cookies à franchir ; navigation à 479 liens. | **Garder** (pour le registre CRM), en notant la fragilité des adresses |
| **Microsoft Fluent 2** | oui | non | oui / oui | `fluent2.microsoft.design/components/web/react` ; fiches `/components/web/react/core/<nom>/usage` ; fondations : `/color`, `/layout`, `/motion`, `/shapes`, `/typography`, `/design-tokens`, `/wait-ux`, `/onboarding` | Très bonne. Fiches « usage » claires ; pages rares et utiles sur l'attente (`wait-ux`) et l'accueil (`onboarding`). | **Garder** |

### Galeries d'écrans et de parcours

| Source | Sans compte | Payante | Lecture auto (navigateur / requête simple) | Pages utiles | Qualité pour notre usage | Verdict |
|---|---|---|---|---|---|---|
| **Mobbin** | **non** | partiel (offre gratuite limitée + abonnement) | **non / non** : `mobbin.com/browse/web/apps` renvoie à la page d'accueil avec `?redirect_to=…` ; aucune liste d'écrans sans connexion | Pages publiques : accueil, `/pricing`, `/glossary` | Contenu de très haute qualité (plus de 620 000 écrans, 320 000 parcours annoncés), mais inaccessible sans compte, donc inutilisable par un skill automatique. | **Écarter** pour l'usage automatique ; utile à la main avec un compte personnel |
| **Refero** | partiel | partiel (lien « Pricing », connexion demandée) | partiel / non (la requête simple ne renvoie que 57 caractères) | `refero.design/search` (pages web), `/apps/search`, recherches par type de page, par parcours (`/search/flows`) et par élément ; `styles.refero.design` | Bonne : classement par schéma (onboarding, tableaux de données…). La page d'accueil se lit, mais je n'ai pas vérifié combien de résultats sont visibles sans compte. | **Garder sous réserve** (à confirmer : quantité visible sans compte) |
| **Page Flows** | partiel | oui (« Try 3 Days ») | oui / oui pour les pages de liste | `pageflows.com/web/` ; `/web/screens/<type>/` (dashboard, sign-up, pricing-plans, forgot-password) ; `/web/elements/` (dropdown, modal, tabs) ; `/post/desktop-web/onboarding/<produit>/` | Bonne pour les **parcours** (inscription, onboarding, paiement) enregistrés pas à pas. Les listes et vignettes sont publiques ; le détail des parcours est derrière l'essai payant (non vérifié au-delà de la page de liste). | **Garder sous réserve** : sert d'index de schémas, pas de source de mesures |

---

## 2. Registre produit / marketing

| Source | Sans compte | Payante | Lecture auto (navigateur / requête simple) | Pages utiles | Qualité pour notre usage | Verdict |
|---|---|---|---|---|---|---|
| **Land-book** | oui | partiel (« Get Pro ») | oui / **non** (403, protection anti-robot) | `land-book.com/websites`, `/sections` ; filtres Landing, Portfolio, Blog… | Bonne galerie de pages d'accueil, mise à jour chaque jour. Sert à trouver des sites ; les mesures se font ensuite sur le site lui-même. | **Garder** (navigateur obligatoire) |
| **Lapa Ninja** | oui | partiel (« Pro ») | oui / **non** (403, protection anti-robot) | `lapa.ninja/category/<nom>/` : saas, ecommerce, portfolio, agency, product, fintech, 3d-websites… | Très bonne : plus de 7 300 pages annoncées, classement par secteur le plus complet du lot, captures pleine page. | **Garder** (navigateur obligatoire) |
| **SaaS Landing Page** | oui | non | oui / oui | `saaslandingpage.com/tag/<nom>/` (productivity, dark, ai, devtools, finance, b2b) ; `/tags` | Correcte : 840 exemples, limités au SaaS. Beaucoup de pages se ressemblent : à utiliser aussi comme **contre-exemple** pour la liste noire. | **Garder** |
| **One Page Love** | oui | non | oui / oui | `onepagelove.com/style/<nom>` (typographic, brutalism, editorial, retro-vintage, luxury, bold, 3d…) ; sections | Très bonne : plus de 9 000 sites et 9 000 exemples de **sections**, classés par style. Le classement par style correspond à notre façon de nommer les skills. | **Garder** |
| **Godly** | — | — | — | — | **`godly.website` redirige désormais vers `recent.design/?ref=godly`** (« Recent — Design Inspiration »), un autre site, avec inscription mise en avant (« Join 19 084 members »). La galerie Godly d'origine n'est plus servie à cette adresse. | **Écarter** sous ce nom ; `recent.design` reste à évaluer à part (non fait) |
| **Dribbble** | oui (navigation) | partiel | partiel / **non** (réponse 202 vide : contrôle anti-robot) | `dribbble.com/shots/popular/web-design`, `/shots/popular/product-design`, `/shots/popular/branding` | Source de **maquettes**, pas de sites : rien n'est mesurable dans un navigateur, tout est estimé à l'œil (13 des 23 skills actuels en viennent, avec les limites notées dans leur `source.md`). C'est aussi un grand réservoir de motifs de la liste noire. | **Garder pour l'idée, écarter pour la mesure** |

---

## 3. Registre expressif

| Source | Sans compte | Payante | Lecture auto (navigateur / requête simple) | Pages utiles | Qualité pour notre usage | Verdict |
|---|---|---|---|---|---|---|
| **Awwwards** | oui | partiel (cours payants ; galerie libre) | oui / oui (avec quelques marqueurs anti-robot dans la page) | `awwwards.com/websites/<catégorie>/` : webgl, 3d, animation, scrolling, portfolio, e-commerce, architecture, fashion ; `/websites/sites_of_the_day/` | Excellente pour l'expressif : sites réels, donc mesurables. 7 skills actuels en viennent. | **Garder** |
| **The FWA** | oui | non | oui / oui | `thefwa.com/awards` ; fiches `/cases/<nom>` ; filtres par date | Très bonne : sites très expérimentaux, une fiche par projet avec lien direct. Peu de classement par style. | **Garder** |
| **Godly** | — | — | — | — | Voir registre marketing : redirigé vers `recent.design`. | **Écarter** |
| **Siteinspire** | oui | non (abonnement à une lettre, connexion facultative) | oui / **non** (429 : trop de requêtes dès le premier appel) | `siteinspire.com/websites/category/<nom>` : typographic, minimal, unusual-layout, grid-layout, portfolio, fashion, art | Très bonne : sélection sobre et typographique, classement par style, type et sujet. | **Garder** (navigateur obligatoire, appels espacés) |
| **Httpster** | oui | non | oui / oui | `httpster.net/style/<nom>/` (brutalist, typographic, non-standard-layout, non-standard-navigation, scrolling-behaviour, monotone, retro) ; `/type/<nom>/` | Très bonne : 3 116 sites, classement par style précis (navigation non standard, comportement au défilement). Page légère, la plus simple à lire automatiquement. | **Garder** |
| **Dribbble** | — | — | — | — | Voir registre marketing. | **Garder pour l'idée, écarter pour la mesure** |

---

## 4. Suggestions (non demandées, à valider)

Sources ajoutées de ma propre initiative, testées de la même façon.

| Source | Registre | Sans compte | Payante | Lecture auto (navigateur / requête simple) | Pourquoi | Verdict proposé |
|---|---|---|---|---|---|---|
| **The Component Gallery** — `component.gallery/components/` | fonctionnel | oui | non | oui / oui | Pour chaque composant (accordion, alert, breadcrumbs, combobox, empty-state, drawer…) : la définition, **tous ses autres noms** et des liens vers sa fiche dans des dizaines de design systems. C'est exactement l'outil qu'il faut pour le tableau « composants communs et leurs noms » et pour nommer la bibliothèque partagée. | **Suggestion forte : garder** |
| **Minimal Gallery** — `minimal.gallery/tag/<nom>/` | marketing | oui | non | oui / oui | Sélection sobre, classée par secteur (saas, e-commerce, portfolio, fashion, finance). Bon contrepoids aux galeries très chargées. | Suggestion : garder |
| **Saaspo** — `saaspo.com/page-types/<type>` | marketing | oui | partiel | oui / non (403) | Classe les sites SaaS par **type de page** (pricing, about, contact, 404, book-a-demo, compare) et par section : utile pour le socle UX des pages autres que l'accueil. | Suggestion : garder (navigateur obligatoire) |
| **Nicelydone** — `nicelydone.club` | fonctionnel | non | oui (essai gratuit) | non / oui pour l'accueil seulement | Écrans d'applications web (208 000 annoncés), mais derrière un compte, comme Mobbin. | Suggestion écartée |

---

## Bilan

**Gardées (13)** : Atlassian, Carbon, Primer, Lightning, Fluent 2, Land-book, Lapa Ninja, SaaS Landing Page, One Page Love, Awwwards, The FWA, Siteinspire, Httpster.

**Gardées sous réserve (4)** : Polaris (l'adresse ne mène plus au design system mais à une documentation d'API), Refero et Page Flows (accès partiel, à confirmer avec un essai réel), Dribbble (idées seulement, rien de mesurable).

**Écartées (2)** : Mobbin (connexion obligatoire), Godly (redirigé vers un autre site).

**Suggestions** : The Component Gallery (forte), Minimal Gallery, Saaspo ; Nicelydone testée et écartée.

## Ce qu'il faut retenir pour la suite

1. **Les design systems couvrent ce que les 23 skills ne couvrent pas** : états vides, erreurs, chargement, tableaux, formulaires longs. Primer (UI Patterns), Atlassian et Carbon suffisent à fonder le socle UX du registre fonctionnel.
2. **Une requête simple ne suffit pas** pour 7 sources sur 19 (Carbon, Primer, Refero, Land-book, Lapa Ninja, Dribbble, Siteinspire). Le skill devra passer par un navigateur piloté, et espacer ses appels.
3. **Les galeries servent à trouver, pas à mesurer.** Elles donnent une adresse de site ; les mesures (étape 2 de `site-to-skill`) se font sur le site réel. Les sources de maquettes (Dribbble) ne permettent aucune mesure.
4. **Deux adresses de la consigne ont changé de destination** (Polaris, Godly) : à ne pas écrire telles quelles dans le skill.

## Non vérifié

- Quantité de contenu réellement visible sans compte sur Refero et Page Flows.
- Prix et contenu des offres payantes (aucune page de tarifs ouverte).
- Conditions d'utilisation des sites concernant la lecture automatique.
- `recent.design` (destination de la redirection de Godly).
- Stabilité des adresses de Lightning Design System 2.
