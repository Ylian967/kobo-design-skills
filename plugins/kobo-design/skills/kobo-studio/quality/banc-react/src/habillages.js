// Habillages des skills : feuilles et scripts sont tous bornés par [data-k-skill], on peut les charger ensemble.
// Dans un module à part : il doit s'exécuter après le moteur et les familles.
import.meta.glob(['@k/ux/templates/hero-photo/*.css', '@k/ux/templates/objet/*.css', '!**/hero-photo.css', '!**/objet.css'], { eager: true });
import.meta.glob(['@k/ux/templates/objet/*.js', '!**/objet.js'], { eager: true });
import.meta.glob(['@k/ux/templates/hero-photo/*.js', '!**/hero-photo.js'], { eager: true });
