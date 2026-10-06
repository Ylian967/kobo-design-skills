# Parcours types par domaine

Sept fiches. Chacune décrit un parcours que les gens connaissent déjà : les écrans attendus, l'ordre, les règles sur téléphone, les erreurs fréquentes. On les lit pendant la méthode UX (`../../methode.md`, point 2), **seulement celles des tâches du projet**.

| Tâche du plan | Fiche |
|---|---|
| Réserver une place dans un créneau à horaire fixe (cours, séance, salle, table) ; voir et annuler ses réservations | `reservation-creneaux.md` |
| Adhérer, s'inscrire à une activité, à un essai, à une liste | `adhesion-inscription.md` |
| Se connecter, créer un compte, retrouver ce qui est à soi | `compte-espace-membre.md` |
| Choisir un produit, remplir un panier, payer | `boutique-panier.md` |
| Écrire, appeler, demander un devis ; demander un rendez-vous dont **la maison** fixera la date en répondant | `contact-devis.md` |
| Prendre rendez-vous en **choisissant soi-même** un jour et une heure libres (soin, conseil, visite) | `prise-de-rendez-vous.md` |
| Travailler toute la journée sur des enregistrements (employés) | `outil-interne.md` |

## Une tâche sans fiche

Consulter des réalisations ou un portfolio, lire un programme, trouver des horaires et une adresse : aucune fiche ne les encadre, et c'est voulu (ce sont des lectures, pas des transactions). Écris leur parcours avec la méthode seule, et vérifie trois choses : chaque élément qu'on voudrait ouvrir **est une destination** ou dit clairement qu'il n'y a rien derrière (heuristique 6) ; deux éléments différents ne mènent pas au même endroit (heuristiques 4 et 8) ; l'action principale est proposée à la fin de la lecture.

## Comment lire une fiche

- **Écrans attendus** : le minimum. Un écran absent de la liste se justifie par une tâche du plan.
- **Parcours** : la suite des étapes et l'objectif d'étapes à écrire dans le plan.
- **Sur téléphone** : ce qui change à 390 px.
- **Erreurs fréquentes** : chacune sera cherchée à la vérification (`quality/ux-grille.md`).
- **Composants** : les pièces de `components/INDEX.md` qui conviennent.

## D'où viennent les règles

Chaque règle porte la marque de sa source. Une règle sans marque de source n'a pas sa place dans une fiche.

| Marque | Source | Adresse |
|---|---|---|
| **[N1] à [N10]** | Jakob Nielsen, « 10 Usability Heuristics for User Interface Design », Nielsen Norman Group, 1994, revu en 2024 | https://www.nngroup.com/articles/ten-usability-heuristics/ |
| **[NN-mur]** | Raluca Budiu, « Login Walls Stop Users in Their Tracks », NN/g, 2014 | https://www.nngroup.com/articles/login-walls/ |
| **[NN-form]** | Kathryn Whitenton, « Website Forms Usability: Top 10 Recommendations », NN/g, 2016 | https://www.nngroup.com/articles/web-form-design/ |
| **[NN-tableau]** | Page Laubheimer, « Data Tables: Four Major User Tasks », NN/g, 2022 | https://www.nngroup.com/articles/data-tables/ |
| **[NN-tableau-mobile]** | Amy Schade, « Mobile Tables: Comparisons and Other Data Tables », NN/g, 2017 | https://www.nngroup.com/articles/mobile-tables/ |
| **[NN-doigt]** | Aurora Harley, « Touch Targets on Touchscreens », NN/g, 2019 (cible d'au moins 1 cm × 1 cm, cibles espacées) | https://www.nngroup.com/articles/touch-target-size/ |
| **[B-abandon]** | Baymard Institute, « Cart Abandonment Rate Statistics » (page lue en octobre 2026, données mises à jour en septembre 2025) | https://baymard.com/lists/cart-abandonment-rate |
| **[B-champs]** | Edward Scott, « Checkout Optimization: Minimize Form Fields », Baymard Institute, 2024 | https://baymard.com/blog/checkout-flow-average-form-fields |
| **[B-compte]** | Edward Scott, « Save Account Creation for the Confirmation Step », Baymard Institute, 2023 | https://baymard.com/blog/delayed-account-creation |
| **[B-creneau]** | Baymard Institute, « Time Booking Interface », résumé public du banc d'essai (le détail est payant, non lu) | https://baymard.com/checkout-usability/benchmark/step-type/time-booking-interface/ |
| **[G-depart]** | GOV.UK Design System, « Start using a service » | https://design-system.service.gov.uk/patterns/start-using-a-service/ |
| **[G-compte]** | GOV.UK Design System, « Create accounts » | https://design-system.service.gov.uk/patterns/create-accounts/ |
| **[G-question]** | GOV.UK Design System, « Question pages » | https://design-system.service.gov.uk/patterns/question-pages/ |
| **[G-relire]** | GOV.UK Design System, « Check answers » | https://design-system.service.gov.uk/patterns/check-answers/ |
| **[G-confirmation]** | GOV.UK Design System, « Confirmation pages » | https://design-system.service.gov.uk/patterns/confirmation-pages/ |
| **[G-contact]** | GOV.UK Design System, « Contact a department or service team » | https://design-system.service.gov.uk/patterns/contact-a-department-or-service-team/ |
| **[G-dates]** | GOV.UK Design System, « Dates » | https://design-system.service.gov.uk/patterns/dates/ |
| **[W-cible]** | W3C, WCAG 2.2, critères 2.5.8 (cible de 24 × 24 px CSS au moins, niveau AA) et 2.5.5 (44 × 44 px, niveau AAA) | https://www.w3.org/TR/WCAG22/ |
| **[W-ressaisie]** | W3C, WCAG 2.2, critère 3.3.7 (ne pas redemander une information déjà donnée, niveau A) | https://www.w3.org/TR/WCAG22/ |
| **[club]** | Constat interne : premier exemple `club-escalade` (octobre 2026), relevé dans `quality/ux-audit-exemples.md`. Ce n'est pas une source extérieure : c'est une erreur que nous avons faite | — |

Les pages ont été relues en ligne le 6 octobre 2026. Les chiffres de Baymard changent d'une année à l'autre (les deux articles ne donnent pas le même nombre moyen de champs) : cite la page, pas le chiffre de mémoire.

**Limite à connaître.** Aucune de ces sources ne traite en accès libre de la réservation récurrente de créneaux par des membres, ni de la prise de rendez-vous en détail : les fiches `reservation-creneaux.md` et `prise-de-rendez-vous.md` assemblent des règles générales (heuristiques, dates, confirmation, cibles tactiles) et le dit là où une règle est une déduction. « Déduit de [N…] » veut dire : application de l'heuristique à ce cas, par nous.
