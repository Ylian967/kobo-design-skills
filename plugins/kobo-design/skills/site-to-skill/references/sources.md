# Sources fixes, par registre

Sources vérifiées le 4 octobre 2026 (détail : `../../kobo-studio/audit/sources.md`). On n'ouvre que celles-ci à l'étage B2 de l'entonnoir, trois pages au plus par recherche, lues en texte.

« Lecture » : **simple** = une requête sans navigateur suffit ; **navigateur** = page rendue par script ou protégée, il faut un navigateur piloté, et espacer les appels.

Les galeries servent à **trouver** une adresse. Les mesures se font ensuite sur le site lui-même.

## Fonctionnel (CRM, ERP, back-office, outil interne, SaaS)

Une application est derrière un compte : la référence mesurable est un **design system public** (ses fiches montrent les vrais composants dans un navigateur) ou la documentation publique d'un produit.

| Source | Page d'entrée | Lecture | Pour quoi |
|---|---|---|---|
| Atlassian Design System | `atlassian.design/components` ; fiches `/components/<nom>` ; `/foundations` | simple | Outils de suivi : formulaires, états vides, messages, chargement |
| IBM Carbon | `carbondesignsystem.com` (composants, fondations couleur, espacement, mouvement, grille) | navigateur | Écrans denses : tableau de données, pagination, filtres, notifications |
| GitHub Primer | `primer.style/product/components/` ; `/product/ui-patterns/` ; `/product/primitives/` | navigateur | Schémas d'interface : états vides, formulaires, chargement, navigation |
| Salesforce Lightning | `lightningdesignsystem.com` (redirige vers Lightning Design System 2, adresses à identifiants, instables) | simple | Le CRM d'origine : listes, fiches, chemins d'étapes |
| Microsoft Fluent 2 | `fluent2.microsoft.design/components/web/react` ; `/wait-ux`, `/onboarding` | simple | Applications de bureau : densité, attente, accueil |
| Shopify Polaris | `shopify.dev/docs/api/polaris` (l'ancien site de design n'est plus servi) | simple | Second rang : noms et propriétés des composants, peu de règles d'usage |
| The Component Gallery | `component.gallery/components/` ; `/design-systems/` | simple | Trouver le nom d'un composant et sa fiche dans des dizaines de design systems ; liste de design systems par technologie |
| Page Flows | `pageflows.com/web/` ; `/web/screens/<type>/` (dashboard…) | simple pour les listes ; détail derrière un essai payant | Parcours enregistrés (inscription, accueil) : à citer, pas à mesurer |
| Refero | `refero.design/search` | navigateur ; résultats limités sans compte | Écrans d'applications classés par schéma : à citer, pas à mesurer |

Écartées : Mobbin et Nicelydone (compte obligatoire).

## Produit (landing, vitrine, e-commerce)

| Source | Page d'entrée | Lecture | Pour quoi |
|---|---|---|---|
| Lapa Ninja | `lapa.ninja/category/<nom>/` (saas, ecommerce, portfolio, agency, product, fintech…) | navigateur | Le classement par secteur le plus complet |
| Land-book | `land-book.com/websites` ; `/sections` | navigateur | Pages d'accueil récentes |
| One Page Love | `onepagelove.com/style/<nom>` (typographic, editorial, luxury, bold…) | simple | Classement par style, proche de la façon de nommer les skills |
| SaaS Landing Page | `saaslandingpage.com/tag/<nom>/` (b2b, productivity, finance, dark…) | simple | SaaS seulement ; sert aussi de contre-exemple (pages qui se ressemblent) |
| Minimal Gallery | `minimal.gallery/tag/<nom>/` | simple | Sélection sobre, par secteur |
| Saaspo | `saaspo.com/page-types/<type>` (pricing, about, contact, 404…) | navigateur | Pages autres que l'accueil |
| Dribbble | `dribbble.com/shots/popular/web-design` | navigateur ; maquettes | Une idée seulement : rien n'y est mesurable |

## Expressif (jeu, marque, événement, culture)

| Source | Page d'entrée | Lecture | Pour quoi |
|---|---|---|---|
| Awwwards | `awwwards.com/websites/<catégorie>/` (webgl, 3d, animation, scrolling, fashion, architecture…) | simple | Sites réels primés, donc mesurables |
| The FWA | `thefwa.com/awards` ; fiches `/cases/<nom>` | simple | Sites expérimentaux, une fiche par projet |
| Siteinspire | `siteinspire.com/websites/category/<nom>` (typographic, minimal, unusual-layout…) | navigateur, appels espacés (429 sinon) | Sélection sobre et typographique |
| Httpster | `httpster.net/style/<nom>/` (brutalist, typographic, non-standard-navigation, retro…) | simple | Classement par style précis ; la page la plus légère à lire |

Écartée : Godly (`godly.website` redirige vers un autre site, `recent.design`, non évalué).

## Quand une source a changé

Adresse morte, redirection vers autre chose, compte désormais demandé : note-le ici (date, ce qui a changé) et dans `index.md`, puis passe à la source suivante. Ne remplace pas une source par une recherche libre sans le dire.
