// Genera los SVG locales de las ranas y el fondo del estanque.
// Ejecutar con: node scripts/generate-assets.mjs
// Reproducible: si cambias los colores y vuelves a ejecutar, se regeneran.

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const FROG_CONFIG = [
  { id: 'frog_01', body: '#FFD45C', accent: '#FF914D', pattern: 'spots', belly: '#FFF3C4' },
  { id: 'frog_02', body: '#FF914D', accent: '#A66DD4', pattern: 'spots', belly: '#FFE0C2' },
  { id: 'frog_03', body: '#FFD45C', accent: '#1B1B1B', pattern: 'stripes', belly: '#FFF3C4' },
  { id: 'frog_04', body: '#228B45', accent: '#FFD45C', pattern: 'stripes', belly: '#CFF0D4' },
  { id: 'frog_05', body: '#ED6464', accent: '#65C7E8', pattern: 'spots', belly: '#FFD6D6' },
  { id: 'frog_06', body: '#A66DD4', accent: '#65C7E8', pattern: 'spots', belly: '#E9D9F5' },
  { id: 'frog_07', body: '#65BD48', accent: '#FFF8E7', pattern: 'spots', belly: '#DFF3D4' },
  { id: 'frog_08', body: '#FF914D', accent: '#FFF8E7', pattern: 'stripes', belly: '#FFE0C2' },
  { id: 'frog_09', body: '#65C7E8', accent: '#65BD48', pattern: 'spots', belly: '#D8F2FB' },
  { id: 'frog_10', body: '#228B45', accent: '#FF914D', pattern: 'spots', belly: '#CFF0D4' },
];

function patternMarkup(cfg) {
  if (cfg.pattern === 'stripes') {
    return [
      `<path d="M 88 72 Q 96 92 86 112" stroke="${cfg.accent}" stroke-width="7" fill="none" stroke-linecap="round"/>`,
      `<path d="M 104 70 Q 112 92 102 116" stroke="${cfg.accent}" stroke-width="7" fill="none" stroke-linecap="round"/>`,
    ].join('\n');
  }
  return [
    `<circle cx="82" cy="90" r="5" fill="${cfg.accent}"/>`,
    `<circle cx="100" cy="82" r="4.5" fill="${cfg.accent}"/>`,
    `<circle cx="118" cy="92" r="5" fill="${cfg.accent}"/>`,
    `<circle cx="92" cy="104" r="4" fill="${cfg.accent}"/>`,
  ].join('\n');
}

function frogSvg(cfg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" role="img" aria-label="Rana ${cfg.id}">
  <ellipse cx="52" cy="168" rx="30" ry="20" fill="${cfg.body}" stroke="#00000022" stroke-width="2"/>
  <ellipse cx="148" cy="168" rx="30" ry="20" fill="${cfg.body}" stroke="#00000022" stroke-width="2"/>
  <ellipse cx="100" cy="112" rx="56" ry="50" fill="${cfg.body}" stroke="#00000022" stroke-width="2"/>
  <ellipse cx="100" cy="132" rx="34" ry="26" fill="${cfg.belly}"/>
  <circle cx="70" cy="62" r="23" fill="${cfg.body}" stroke="#00000022" stroke-width="2"/>
  <circle cx="130" cy="62" r="23" fill="${cfg.body}" stroke="#00000022" stroke-width="2"/>
  <circle cx="70" cy="62" r="12" fill="#ffffff"/>
  <circle cx="130" cy="62" r="12" fill="#ffffff"/>
  <circle cx="70" cy="64" r="6" fill="#1a1a1a"/>
  <circle cx="130" cy="64" r="6" fill="#1a1a1a"/>
  <circle cx="73" cy="60" r="2.5" fill="#ffffff"/>
  <circle cx="133" cy="60" r="2.5" fill="#ffffff"/>
  ${patternMarkup(cfg)}
  <circle cx="58" cy="112" r="8" fill="#FF9FB0" opacity="0.65"/>
  <circle cx="142" cy="112" r="8" fill="#FF9FB0" opacity="0.65"/>
  <path d="M 78 122 Q 100 138 122 122" stroke="#1a1a1a" stroke-width="4" fill="none" stroke-linecap="round"/>
  <ellipse cx="58" cy="162" rx="14" ry="9" fill="${cfg.body}" stroke="#00000022" stroke-width="2"/>
  <ellipse cx="142" cy="162" rx="14" ry="9" fill="${cfg.body}" stroke="#00000022" stroke-width="2"/>
</svg>`;
}

function lilyPadSvg() {
  // Hoja de nenúfar decorativa para el fondo.
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <path d="M 100 30 C 160 30 180 80 180 130 C 180 170 150 180 100 180 C 40 180 20 160 20 130 C 20 70 40 30 100 30 Z" fill="#4FAE3F" opacity="0.85"/>
  <path d="M 100 30 L 100 180" stroke="#2E7D32" stroke-width="4" opacity="0.5"/>
  <path d="M 35 90 L 165 130 M 40 120 L 160 95" stroke="#2E7D32" stroke-width="3" opacity="0.35"/>
</svg>`;
}

function pondSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#65C7E8"/>
      <stop offset="100%" stop-color="#2F9EC4"/>
    </linearGradient>
    <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#FFD45C" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#FFD45C" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="600" fill="url(#water)"/>
  <circle cx="680" cy="80" r="160" fill="url(#sun)"/>
  <ellipse cx="120" cy="90" rx="140" ry="50" fill="#65BD48" opacity="0.5"/>
  <ellipse cx="620" cy="520" rx="180" ry="60" fill="#228B45" opacity="0.5"/>
  <ellipse cx="360" cy="560" rx="200" ry="55" fill="#228B45" opacity="0.45"/>
  ${[ [140,180,0.8], [300,300,0.6], [520,200,0.7], [660,360,0.6], [240,440,0.7], [470,120,0.55] ]
    .map(([x,y,s]) => `<g transform="translate(${x},${y}) scale(${s})">${lilyPadSvg()}</g>`).join('\n')}
  <ellipse cx="400" cy="300" rx="60" ry="14" fill="#ffffff" opacity="0.12"/>
  <ellipse cx="180" cy="420" rx="45" ry="10" fill="#ffffff" opacity="0.10"/>
  <ellipse cx="620" cy="180" rx="50" ry="11" fill="#ffffff" opacity="0.12"/>
</svg>`;
}

mkdirSync(join(ROOT, 'public/assets/frogs'), { recursive: true });
mkdirSync(join(ROOT, 'public/assets/backgrounds'), { recursive: true });
mkdirSync(join(ROOT, 'public/assets/sounds'), { recursive: true });

for (const cfg of FROG_CONFIG) {
  writeFileSync(join(ROOT, `public/assets/frogs/${cfg.id}.svg`), frogSvg(cfg));
}
writeFileSync(join(ROOT, 'public/assets/backgrounds/pond.svg'), pondSvg());

console.log('Assets generados: 10 ranas + fondo de estanque.');
