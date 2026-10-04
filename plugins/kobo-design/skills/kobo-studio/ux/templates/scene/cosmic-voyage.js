// kobo-studio — scène plein écran, habillage cosmic-voyage : la photo de ciel étoilé de la démo du skill, fixe derrière la page. Aucune 3D.
(function () {
  'use strict';
  Kobo.templates.register({ skill: 'cosmic-voyage', family: 'scene', slot: 'backdrop',
    render: function () { return '<div class="g-scene3d"><img src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=2000&q=72" alt="" decoding="async"></div>'; } });
})();
