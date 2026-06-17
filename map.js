/* ============================================================
   map.js — Mini-map SVG et rendu animé des événements de match
   Etape 7 du CDC : la carte devient le support principal de
   lecture du match, le log texte reste en complement.
   ============================================================ */

const MAP_VIEWBOX = '0 0 600 600';

const MAP_ROLES = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'];

/* Coordonnees des zones cibles pour les evenements */
const MAP_ZONES = {
  top: { x: 300, y: 60 },
  mid: { x: 300, y: 300 },
  bot: { x: 300, y: 540 },
  dragon: { x: 420, y: 420 },
  baron: { x: 180, y: 180 },
  jungle_blue: { x: 180, y: 420 },
  jungle_red: { x: 420, y: 180 },
  base_blue: { x: 55, y: 550 },
  base_red: { x: 545, y: 55 }
};

/* Positions "maison" des icones de champions, par cote et par role */
const MAP_UNIT_HOME = {
  blue: {
    TOP: { x: 240, y: 130 },
    JUNGLE: { x: 180, y: 420 },
    MID: { x: 260, y: 340 },
    ADC: { x: 260, y: 470 },
    SUPPORT: { x: 230, y: 500 }
  },
  red: {
    TOP: { x: 360, y: 130 },
    JUNGLE: { x: 420, y: 180 },
    MID: { x: 340, y: 260 },
    ADC: { x: 340, y: 470 },
    SUPPORT: { x: 370, y: 500 }
  }
};

/* Positions des tours (3 par lane par cote + nexus) */
const MAP_TOWER_POS = {
  blue: {
    BOT_T1: { x: 220, y: 480 }, BOT_T2: { x: 190, y: 430 },
    MID_T1: { x: 220, y: 380 }, MID_T2: { x: 205, y: 310 },
    TOP_T1: { x: 160, y: 200 }, TOP_T2: { x: 160, y: 145 }
  },
  red: {
    BOT_T1: { x: 380, y: 480 }, BOT_T2: { x: 410, y: 430 },
    MID_T1: { x: 380, y: 220 }, MID_T2: { x: 395, y: 290 },
    TOP_T1: { x: 440, y: 200 }, TOP_T2: { x: 440, y: 145 }
  }
};

/* Positions des nexus */
const MAP_NEXUS_POS = {
  blue: { x: 70, y: 530 },
  red:  { x: 530, y: 70 }
};

/* Categorie d'evenement de match -> type MapEvent (CDC 8.2) */
const MAP_EVENT_TYPES = {
  lane: 'kill',
  jungle: 'kill',
  objective: 'objective',
  macro: 'tower',
  teamfight: 'teamfight',
  dramatic: 'dramatic'
};

/* Severite 1-5 (CDC 8.2) */
const MAP_EVENT_SEVERITY = {
  lane_kill: 1,
  gank: 2,
  dragon: 3,
  herald: 2,
  grubs: 2,
  tower: 2,
  teamfight: 4,
  baron: 4,
  elder: 5,
  dramatic: 5
};

/* Roles impliques selon la categorie d'evenement */
const MAP_EVENT_ROLE_SETS = {
  lane: (role) => [role],
  jungle: (role) => Array.from(new Set(['JUNGLE', role || 'TOP'])),
  objective: () => ['JUNGLE', 'SUPPORT', 'MID'],
  macro: (role) => [role || 'TOP'],
  teamfight: () => MAP_ROLES.slice(),
  dramatic: () => MAP_ROLES.slice()
};

function resolveEventZone(template, role) {
  switch (template.category) {
    case 'lane':
      return { TOP: 'top', MID: 'mid', ADC: 'bot' }[role] || 'mid';
    case 'jungle':
    case 'macro':
      return randomChoice(['top', 'mid', 'bot']);
    case 'objective':
      // Les void grubs et le Herald apparaissent dans le pit du Baron
      return ['baron', 'herald', 'grubs'].includes(template.id) ? 'baron' : 'dragon';
    case 'teamfight':
      return randomChoice(['dragon', 'baron', 'mid']);
    case 'dramatic':
      return randomChoice(['dragon', 'baron', 'top', 'mid', 'bot']);
    default:
      return 'mid';
  }
}

function buildMapEvent(template, role, winner, text, diff, rt) {
  const zone = resolveEventZone(template, role);
  const roleSet = (MAP_EVENT_ROLE_SETS[template.category] || (() => ['MID']))(role);
  const participants = [];
  ['blue', 'red'].forEach((side) => {
    roleSet.forEach((r) => {
      participants.push({ side, role: r, championId: rt.picks[side][r] });
    });
  });

  return {
    id: `evt-${rt.gameClock}-${rt.eventHistory.length}`,
    type: MAP_EVENT_TYPES[template.category] || 'macro',
    zone,
    participants,
    title: text,
    description: text,
    impact: {
      winProbDelta: (winner === 'blue' ? diff : -diff) * 0.01,
      objective: template.objective
    },
    severity: MAP_EVENT_SEVERITY[template.id] || 1,
    winner
  };
}

function champAbbrev(rt, side, role) {
  const champName = rt.picks[side] && rt.picks[side][role];
  return champName ? champName.slice(0, 2).toUpperCase() : role.slice(0, 1);
}

/* Chemin SVG en étoile 5 branches (rayon ext, rayon int) */
function starPath(cx, cy, rOut, rIn) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const r = i % 2 === 0 ? rOut : rIn;
    pts.push(`${(cx + Math.cos(angle) * r).toFixed(1)},${(cy + Math.sin(angle) * r).toFixed(1)}`);
  }
  return `M${pts.join('L')}Z`;
}

function renderMatchMap(rt) {
  const container = document.getElementById('match-map');
  if (!container || !rt) return;

  const towersSvg = ['blue', 'red'].map((side) => {
    return Object.keys(MAP_TOWER_POS[side]).map((key) => {
      const pos = MAP_TOWER_POS[side][key];
      return `<rect id="map-tower-${side}-${key}" class="map-tower map-tower--${side}" x="${pos.x - 6}" y="${pos.y - 6}" width="12" height="12" rx="2"></rect>`;
    }).join('');
  }).join('');

  const nexusSvg = ['blue', 'red'].map((side) => {
    const pos = MAP_NEXUS_POS[side];
    return `<path id="map-nexus-${side}" class="map-nexus map-nexus--${side}" d="${starPath(pos.x, pos.y, 11, 5)}"></path>`;
  }).join('');

  const unitsSvg = ['blue', 'red'].map((side) => {
    return MAP_ROLES.map((role) => {
      const home = MAP_UNIT_HOME[side][role];
      return `
        <g id="map-unit-${side}-${role}" class="map-unit map-unit--${side}" data-side="${side}" data-role="${role}" transform="translate(${home.x}, ${home.y})">
          <circle class="map-unit__circle" r="14"></circle>
          <text class="map-unit__label" dy="4">${champAbbrev(rt, side, role)}</text>
        </g>`;
    }).join('');
  }).join('');

  container.innerHTML = `
    <svg viewBox="${MAP_VIEWBOX}" class="match-map__svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <clipPath id="map-clip">
          <rect x="0" y="0" width="600" height="600" rx="18"></rect>
        </clipPath>
      </defs>
      <image class="map-bg-image" href="img/map.png" x="-121.6" y="0" width="843.2" height="600" clip-path="url(#map-clip)" preserveAspectRatio="xMidYMid slice"></image>
      <rect class="map-bg-border" x="0" y="0" width="600" height="600" rx="18"></rect>

      <g id="map-baron-pit" class="map-pit map-pit--baron">
        <circle cx="${MAP_ZONES.baron.x}" cy="${MAP_ZONES.baron.y}" r="24"></circle>
        <text x="${MAP_ZONES.baron.x}" y="${MAP_ZONES.baron.y + 4}">BARON</text>
      </g>
      <g id="map-dragon-pit" class="map-pit map-pit--dragon">
        <circle cx="${MAP_ZONES.dragon.x}" cy="${MAP_ZONES.dragon.y}" r="24"></circle>
        <text x="${MAP_ZONES.dragon.x}" y="${MAP_ZONES.dragon.y + 4}">DRAGON</text>
      </g>
      <text id="map-dragon-count-blue" class="map-objective-count map-objective-count--blue" x="${MAP_ZONES.dragon.x - 34}" y="${MAP_ZONES.dragon.y + 4}"></text>
      <text id="map-dragon-count-red" class="map-objective-count map-objective-count--red" x="${MAP_ZONES.dragon.x + 34}" y="${MAP_ZONES.dragon.y + 4}"></text>
      <text id="map-baron-count-blue" class="map-objective-count map-objective-count--blue" x="${MAP_ZONES.baron.x - 34}" y="${MAP_ZONES.baron.y + 4}"></text>
      <text id="map-baron-count-red" class="map-objective-count map-objective-count--red" x="${MAP_ZONES.baron.x + 34}" y="${MAP_ZONES.baron.y + 4}"></text>

      ${towersSvg}
      ${nexusSvg}
      ${unitsSvg}
    </svg>
  `;

  updateMapObjectives(rt);
}

function resetMatchMap(rt) {
  const container = document.getElementById('match-map');
  if (!container) return;
  renderMatchMap(rt);
}

function updateMapObjectives(rt) {
  const container = document.getElementById('match-map');
  if (!container) return;
  const obj = rt.objectives;

  ['blue', 'red'].forEach((side) => {
    const dragonCountEl = container.querySelector(`#map-dragon-count-${side}`);
    if (dragonCountEl) dragonCountEl.textContent = obj.dragons[side] > 0 ? String(obj.dragons[side]) : '';

    const baronCountEl = container.querySelector(`#map-baron-count-${side}`);
    if (baronCountEl) baronCountEl.textContent = obj.barons[side] > 0 ? String(obj.barons[side]) : '';
  });

  const baronPit = container.querySelector('#map-baron-pit');
  if (baronPit) {
    baronPit.classList.toggle('map-pit--aura-blue', obj.barons.blue > obj.barons.red);
    baronPit.classList.toggle('map-pit--aura-red', obj.barons.red > obj.barons.blue);
  }

  ['blue', 'red'].forEach((side) => {
    const opponent = side === 'blue' ? 'red' : 'blue';
    const destroyedByOpponent = obj.towers[opponent];
    const towerKeys = Object.keys(MAP_TOWER_POS[side]);
    towerKeys.forEach((key, idx) => {
      const tower = container.querySelector(`#map-tower-${side}-${key}`);
      if (tower) tower.classList.toggle('map-tower--down', idx < destroyedByOpponent);
    });

    /* Nexus : détruit si 9 tours tombées (fin de game par nexus) */
    const nexusEl = container.querySelector(`#map-nexus-${side}`);
    if (nexusEl) nexusEl.classList.toggle('map-nexus--down', destroyedByOpponent >= towerKeys.length);
  });
}

function triggerMapEvent(event) {
  const container = document.getElementById('match-map');
  if (!container) return;
  const svg = container.querySelector('svg');
  const zone = MAP_ZONES[event.zone];
  if (!svg || !zone) return;

  const count = Math.max(event.participants.length, 1);
  event.participants.forEach((p, idx) => {
    const unit = container.querySelector(`#map-unit-${p.side}-${p.role}`);
    if (!unit) return;
    const home = MAP_UNIT_HOME[p.side][p.role];
    const angle = (idx / count) * Math.PI * 2;
    const spread = 20 + event.severity * 2;
    const tx = zone.x + Math.cos(angle) * spread - home.x;
    const ty = zone.y + Math.sin(angle) * spread - home.y;
    unit.style.transform = `translate(${home.x}px, ${home.y}px) translate(${tx}px, ${ty}px)`;
    unit.classList.add('map-unit--active', `map-unit--${event.winner === p.side ? 'winner' : 'loser'}`);
  });

  const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  pulse.setAttribute('cx', zone.x);
  pulse.setAttribute('cy', zone.y);
  pulse.setAttribute('r', '6');
  pulse.setAttribute('class', `map-pulse map-pulse--${event.type} map-pulse--${event.winner}`);
  svg.appendChild(pulse);

  const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  label.setAttribute('x', zone.x);
  label.setAttribute('y', zone.y - 30 - event.severity * 3);
  label.setAttribute('class', `map-event-label map-event-label--${event.type}`);
  label.textContent = event.title;
  svg.appendChild(label);

  const duration = 900 + event.severity * 250;
  setTimeout(() => {
    pulse.remove();
    label.remove();
    event.participants.forEach((p) => {
      const unit = container.querySelector(`#map-unit-${p.side}-${p.role}`);
      if (!unit) return;
      const home = MAP_UNIT_HOME[p.side][p.role];
      unit.style.transform = `translate(${home.x}px, ${home.y}px)`;
      unit.classList.remove('map-unit--active', 'map-unit--winner', 'map-unit--loser');
    });
  }, duration);
}
