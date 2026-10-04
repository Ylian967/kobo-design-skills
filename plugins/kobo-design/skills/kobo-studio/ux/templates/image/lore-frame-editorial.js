// kobo-studio — image, habillage lore-frame-editorial : trois formes de dossier (tracés repris de la démo du skill).
(function () {
  'use strict';
  var defs = '<svg width="0" height="0" aria-hidden="true" focusable="false"><defs>' +
    '<clipPath id="g-folder-a" clipPathUnits="objectBoundingBox"><path d="M.04,0 H.4 Q.43,0 .45,.025 L.48,.06 H.96 Q1,.06 1,.1 V.9 L.9,1 H.05 Q.02,1 .02,.97 V.78 L0,.74 V.04 Q0,0 .04,0 Z"/></clipPath>' +
    '<clipPath id="g-folder-b" clipPathUnits="objectBoundingBox"><path d="M.03,0 H.5 Q.54,0 .57,.06 L.6,.11 H.97 Q1,.11 1,.16 V.95 Q1,1 .96,1 H.07 L0,.88 V.04 Q0,0 .03,0 Z"/></clipPath>' +
    '<clipPath id="g-folder-c" clipPathUnits="objectBoundingBox"><path d="M.04,0 H.62 Q.66,0 .69,.03 L.72,.06 H.95 Q1,.06 1,.1 V.93 L.92,1 H.06 Q.02,1 .02,.96 V.56 L0,.52 V.04 Q0,0 .04,0 Z"/></clipPath>' +
    '</defs></svg>';
  var g = Kobo.templates.families.image({ defs: defs, defsId: 'g-folder-defs', shapes: ['url(#g-folder-a)', 'url(#g-folder-b)', 'url(#g-folder-c)'], parallax: true, zoom: 1.12 });
  Kobo.templates.register({ skill: 'lore-frame-editorial', family: 'image', slot: 'media', render: g.render, mount: g.mount });
})();
