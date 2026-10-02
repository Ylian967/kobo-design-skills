/*
 * Kōbō — extracteur de design
 * À exécuter dans la console du navigateur (ou via un outil d'automatisation) sur la page de référence.
 * Renvoie un objet JSON qui mesure le langage visuel réel de la page :
 * polices, échelle typographique, couleurs pondérées par surface, rayons, ombres, espacements,
 * animations, points de rupture, variables CSS et styles des composants clés.
 * Rien n'est envoyé nulle part : le résultat reste dans la console.
 */
(() => {
  const MAX_EL = 4000;
  const els = [...document.querySelectorAll('body *')].filter(e => {
    const r = e.getBoundingClientRect();
    const cs = getComputedStyle(e);
    return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none';
  }).slice(0, MAX_EL);

  const bump = (map, key, w = 1) => { if (key == null || key === '') return; map.set(key, (map.get(key) || 0) + w); };
  const top = (map, n = 12) => [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => ({ value: k, weight: Math.round(v) }));

  // --- couleurs : toute couleur CSS (rgb, hsl, lab, oklab, oklch, color()) convertie en hex sRGB via un pixel de canvas ---
  const cv = document.createElement('canvas'); cv.width = cv.height = 1;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  const hexCache = new Map();
  const toHex = c => {
    if (!c || c === 'transparent' || c === 'none') return null;
    if (hexCache.has(c)) return hexCache.get(c);
    cx.clearRect(0, 0, 1, 1); cx.fillStyle = '#000'; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = cx.getImageData(0, 0, 1, 1).data;
    let out = null;
    if (a > 0) {
      const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
      out = a < 255 ? `${hex} @${Math.round(a / 2.55)}%` : hex;
    }
    hexCache.set(c, out);
    return out;
  };
  // rayons : valeurs géantes (pilules) regroupées
  const normRadius = v => v.split(' ').map(x => parseFloat(x) >= 999 ? 'pill' : x).join(' ');
  // police : première famille de la pile réellement chargée par la page, sinon la première déclarée
  const loadedFams = new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => f.family.replace(/["']/g, '').trim().toLowerCase()));
  const famOf = stack => { const list = stack.split(',').map(x => x.replace(/["']/g, '').trim()); return list.find(f => loadedFams.has(f.toLowerCase())) || list[0]; };

  const fonts = new Map(), sizes = new Map(), weights = new Map(), tracking = new Map(), leading = new Map(), transforms = new Map();
  const textColors = new Map(), bgColors = new Map(), borderColors = new Map();
  const radii = new Map(), shadows = new Map(), gaps = new Map(), paddings = new Map(), transitions = new Map(), animations = new Map(), gradients = new Map(), blends = new Map(), clips = new Map(), filters = new Map();
  const headings = [];

  for (const e of els) {
    const cs = getComputedStyle(e);
    const r = e.getBoundingClientRect();
    const area = r.width * r.height;
    const ownText = [...e.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join(' ');
    const tl = ownText.length;

    if (tl) {
      const fam = famOf(cs.fontFamily);
      bump(fonts, fam, tl);
      bump(sizes, cs.fontSize, tl);
      bump(weights, cs.fontWeight, tl);
      bump(tracking, cs.letterSpacing, tl);
      bump(leading, cs.lineHeight, tl);
      if (cs.textTransform !== 'none') bump(transforms, cs.textTransform, tl);
      bump(textColors, toHex(cs.color), tl);
    }
    const bg = toHex(cs.backgroundColor);
    if (bg) bump(bgColors, bg, area / 1000);
    if (cs.borderTopWidth !== '0px' && cs.borderTopStyle !== 'none') bump(borderColors, `${cs.borderTopWidth} ${cs.borderTopStyle} ${toHex(cs.borderTopColor)}`);
    if (cs.borderRadius !== '0px') bump(radii, normRadius(cs.borderRadius));
    if (cs.boxShadow !== 'none') bump(shadows, cs.boxShadow);
    if (cs.display.includes('flex') || cs.display.includes('grid')) { if (cs.gap !== 'normal' && cs.gap !== '0px') bump(gaps, cs.gap); }
    if (cs.paddingTop !== '0px' || cs.paddingLeft !== '0px') bump(paddings, `${cs.paddingTop} ${cs.paddingLeft}`);
    if (cs.transitionDuration !== '0s') bump(transitions, `${cs.transitionProperty} ${cs.transitionDuration} ${cs.transitionTimingFunction}`);
    if (cs.animationName !== 'none') bump(animations, `${cs.animationName} ${cs.animationDuration} ${cs.animationTimingFunction}`);
    if (cs.backgroundImage.includes('gradient')) bump(gradients, cs.backgroundImage.slice(0, 220), area / 1000);
    if (cs.mixBlendMode !== 'normal') bump(blends, cs.mixBlendMode);
    if (cs.clipPath !== 'none') bump(clips, cs.clipPath.slice(0, 160));
    if (cs.filter !== 'none' || cs.backdropFilter && cs.backdropFilter !== 'none') bump(filters, `${cs.filter} | backdrop: ${cs.backdropFilter || 'none'}`);
    if (/^H[1-6]$/.test(e.tagName) && headings.length < 20) {
      headings.push({ tag: e.tagName, text: e.textContent.trim().slice(0, 60), font: famOf(cs.fontFamily), size: cs.fontSize, weight: cs.fontWeight, lineHeight: cs.lineHeight, letterSpacing: cs.letterSpacing, transform: cs.textTransform, style: cs.fontStyle, color: toHex(cs.color) });
    }
  }

  // --- composants : boutons, liens de navigation, cartes, champs ---
  const pick = (el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      text: (el.innerText || el.value || '').trim().slice(0, 40), w: Math.round(r.width), h: Math.round(r.height),
      font: famOf(cs.fontFamily), size: cs.fontSize, weight: cs.fontWeight, letterSpacing: cs.letterSpacing, textTransform: cs.textTransform,
      color: toHex(cs.color), bg: toHex(cs.backgroundColor), bgImage: cs.backgroundImage !== 'none' ? cs.backgroundImage.slice(0, 160) : null,
      border: `${cs.borderTopWidth} ${cs.borderTopStyle} ${toHex(cs.borderTopColor)}`, radius: normRadius(cs.borderRadius), padding: cs.padding,
      shadow: cs.boxShadow !== 'none' ? cs.boxShadow : null, clip: cs.clipPath !== 'none' ? cs.clipPath.slice(0, 120) : null,
      cssTransform: cs.transform !== 'none' ? cs.transform : null, transition: cs.transitionDuration !== '0s' ? `${cs.transitionProperty} ${cs.transitionDuration} ${cs.transitionTimingFunction}` : null
    };
  };
  const uniqBy = (arr, keyFn, n) => { const s = new Set(); const out = []; for (const a of arr) { const k = keyFn(a); if (!s.has(k)) { s.add(k); out.push(a); } if (out.length >= n) break; } return out; };
  const visible = sel => [...document.querySelectorAll(sel)].filter(e => { const r = e.getBoundingClientRect(); return r.width > 20 && r.height > 14; });
  const buttons = uniqBy(visible('button, [role=button], a[class*=btn], a[class*=button], input[type=submit]').map(pick), b => b.bg + b.radius + b.border + b.size, 8);
  const navLinks = uniqBy(visible('header a, nav a').map(pick), b => b.size + b.weight + b.color, 5);
  const inputs = uniqBy(visible('input:not([type=hidden]):not([type=submit]), textarea, select').map(pick), b => b.bg + b.border + b.radius, 4);
  const cards = uniqBy(els.filter(e => {
    const cs = getComputedStyle(e); const r = e.getBoundingClientRect();
    return r.width > 160 && r.width < innerWidth * 0.6 && r.height > 120 && (cs.boxShadow !== 'none' || cs.borderTopStyle !== 'none' || cs.borderRadius !== '0px') && e.querySelector('img, picture, h2, h3, h4');
  }).map(pick), c => c.bg + c.radius + c.shadow + c.border, 5);

  // --- variables CSS, @font-face, media queries, keyframes ---
  const vars = {}, faces = new Set(), media = new Map(), keyframes = [];
  for (const sheet of document.styleSheets) {
    let rules; try { rules = sheet.cssRules; } catch (e) { continue; }
    const walk = list => {
      for (const rule of list) {
        if (rule.type === 1 && /^(:root|html|body)$/.test(rule.selectorText)) {
          for (const p of rule.style) if (p.startsWith('--') && Object.keys(vars).length < 200) vars[p] = rule.style.getPropertyValue(p).trim();
        } else if (rule.type === 5) faces.add(rule.style.getPropertyValue('font-family').replace(/["']/g, '').trim());
        else if (rule.type === 4) { bump(media, rule.conditionText || rule.media.mediaText); walk(rule.cssRules); }
        else if (rule.type === 7 && keyframes.length < 25) keyframes.push(rule.name);
        else if (rule.cssRules) walk(rule.cssRules);
      }
    };
    walk(rules);
  }

  // --- structure de page ---
  const header = document.querySelector('header, [role=banner]');
  const hcs = header && getComputedStyle(header);
  const sections = [...document.querySelectorAll('main > *, body > section, main section')].slice(0, 16).map(s => {
    const r = s.getBoundingClientRect(); const cs = getComputedStyle(s);
    return { tag: s.tagName, cls: (s.className || '').toString().slice(0, 60), height: Math.round(r.height), bg: toHex(cs.backgroundColor), bgImage: cs.backgroundImage !== 'none', padding: cs.padding };
  });
  const media_ = { images: document.images.length, videos: document.querySelectorAll('video').length, canvas: document.querySelectorAll('canvas').length, svg: document.querySelectorAll('svg').length, iframes: document.querySelectorAll('iframe').length };
  const libs = ['gsap', 'ScrollTrigger', 'THREE', 'Swiper', 'Lenis', 'lottie', 'PIXI', 'barba', 'anime', 'Splide', 'AOS', 'Locomotive'].filter(k => k in window);

  return {
    url: location.href, title: document.title, measuredAt: new Date().toISOString(), viewport: `${innerWidth}x${innerHeight}`, scrollHeight: document.documentElement.scrollHeight,
    page: { bodyBg: toHex(getComputedStyle(document.body).backgroundColor), htmlBg: toHex(getComputedStyle(document.documentElement).backgroundColor), headerPosition: hcs ? hcs.position : null, headerHeight: header ? Math.round(header.getBoundingClientRect().height) : null, sections, media: media_, libraries: libs, smoothScroll: getComputedStyle(document.documentElement).scrollBehavior },
    typography: { families: top(fonts, 8), fontFaces: [...faces].slice(0, 20), loadedFonts: [...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => `${f.family.replace(/["']/g, '')} ${f.weight} ${f.style}`))].slice(0, 30), sizes: top(sizes, 14), weights: top(weights, 8), letterSpacing: top(tracking, 8), lineHeight: top(leading, 8), textTransform: top(transforms, 4), headings },
    color: { text: top(textColors, 12), backgrounds: top(bgColors, 14), borders: top(borderColors, 10), gradients: top(gradients, 6) },
    shape: { radii: top(radii, 10), shadows: top(shadows, 8), clipPaths: top(clips, 6), blendModes: top(blends, 4), filters: top(filters, 6) },
    space: { gaps: top(gaps, 10), paddings: top(paddings, 12) },
    motion: { transitions: top(transitions, 10), animations: top(animations, 10), keyframes },
    breakpoints: top(media, 12),
    cssVariables: vars,
    components: { buttons, navLinks, inputs, cards }
  };
})();
