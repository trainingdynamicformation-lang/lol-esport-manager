/* ============================================================
   LOL ESPORT MANAGER - game.js
   État global, persistance localStorage, navigation, utilitaires
   (squelette repris d'AquaStrike, adapte au CDC LOL Esport Manager v1.0)
   ============================================================ */

const STORAGE_KEY = 'lol_esport_manager_save';
const VERSION_KEY = 'lol_esport_manager_version';
const SETTINGS_KEY = 'lol_esport_manager_settings';
const CURRENT_VERSION = '1.0';

/* ------------------------------------------------------------
   Regions (CDC 2.2 / 9.1)
   ------------------------------------------------------------ */
const REGIONS = [
  { id: 'LEC', name: 'LEC', inspiration: 'Europe', style: 'Équipes polyvalentes, draft creative', aiRegion: 'LEC' },
  { id: 'LCK', name: 'LCK', inspiration: 'Coree', style: 'Rigueur, macro et discipline', aiRegion: 'LCK' },
  { id: 'LPL', name: 'LPL', inspiration: 'Chine', style: 'Agressivité et teamfights précoces', aiRegion: 'LPL' },
  { id: 'LTA', name: 'LTA', inspiration: 'Ameriques', style: 'Individualisme et carry early', aiRegion: 'LTAN' },
  { id: 'LCP', name: 'LCP', inspiration: 'Asie-Pacifique', style: 'Styles emergents et picks surprises', aiRegion: 'LCP' },
  { id: 'CBLOL', name: 'CBLOL', inspiration: 'Bresil', style: 'Intensite et soutien du public', aiRegion: 'LTAS' },
  { id: 'LJL', name: 'LJL', inspiration: 'Japon', style: 'Precision et compositions techniques', aiRegion: 'LJL' }
];

/* ------------------------------------------------------------
   Accès aux équipes IA (data_teams.js, CDC 11.1)
   ------------------------------------------------------------ */
function getAITeamsForRegion(regionId) {
  const region = REGIONS.find(r => r.id === regionId);
  if (!region || typeof AI_TEAMS === 'undefined') return [];
  return AI_TEAMS.filter(team => team.region === region.aiRegion);
}

/* ------------------------------------------------------------
   Maîtrise champion (CDC 3.2 / 14)
   ------------------------------------------------------------ */
const MASTERY_TIERS = [
  { id: 'decouverte', label: 'Decouverte', min: 0, max: 24 },
  { id: 'praticable', label: 'Praticable', min: 25, max: 49 },
  { id: 'confort', label: 'Confort', min: 50, max: 74 },
  { id: 'signature', label: 'Signature', min: 75, max: 89 },
  { id: 'elite', label: 'Elite', min: 90, max: 100 }
];

function getMasteryTier(mastery) {
  return MASTERY_TIERS.find((t) => mastery >= t.min && mastery <= t.max) || MASTERY_TIERS[0];
}

/**
 * Initialise la maîtrise champion de chaque joueur a partir de son championPool
 * (CDC 2.2 championProgress / CDC 3.2 ChampionMastery). Le premier champion
 * du pool est le plus maîtrise, puis la maîtrise décroît pour les suivants.
 */
function initChampionProgress() {
  const progress = {};
  for (const player of state.roster) {
    const playerProgress = {};
    player.championPool.forEach((champName, index) => {
      const champion = getChampionByName(champName);
      const championId = champion ? champion.id : champName;
      // Masteries explicites (balance v2) prioritaires ; sinon ancienne formule décroissante
      const explicit = (player.masteries && player.masteries[index] != null) ? player.masteries[index] : null;
      const mastery = explicit != null
        ? Math.max(1, Math.min(100, explicit))
        : Math.max(10, Math.min(95, player.level - 10 - index * 15));
      playerProgress[championId] = {
        championId,
        mastery,
        xp: mastery * 20,
        confidence: Math.max(0, Math.min(100, mastery + 5)),
        stageReady: mastery >= 50,
        lastPlayedMatchIds: []
      };
    });
    progress[player.id] = playerProgress;
  }
  state.championProgress = progress;
}

/**
 * Récupéré la ChampionMastery d'un joueur pour un champion donne (par nom).
 */
function getChampionMastery(playerId, champName) {
  const champion = getChampionByName(champName);
  const championId = champion ? champion.id : champName;
  const playerProgress = state.championProgress[playerId];
  return (playerProgress && playerProgress[championId]) || null;
}

/* ------------------------------------------------------------
   Nom d'équipe par defaut
   ------------------------------------------------------------ */
const DEFAULT_TEAM_NAMES = [
  'Hextech Wardens', 'Void Surge', 'Frost Dragons', 'Crimson Rift',
  'Obsidian Vanguard', 'Storm Riders', 'Golden Nexus'
];

function randomDefaultTeamName() {
  return randomChoice(DEFAULT_TEAM_NAMES);
}

/* ------------------------------------------------------------
   État par defaut (CDC 2.2)
   ------------------------------------------------------------ */
function createDefaultState() {
  return {
    version: CURRENT_VERSION,
    teamName: randomDefaultTeamName(),
    teamShortName: null,
    aiTeamId: null,
    region: null,
    resources: {
      coachingPoints: 100,
      budget: 50,
      prestige: 0
    },
    roster: [],
    staff: {},
    championProgress: {},
    draftPreferences: {},
    draft: null,
    matchSeries: null,
    season: null,
    international: null,
    mercatoOpen: true, // fenêtre de prolongation : ouverte en pré-saison, fermée au 1er match du split
    aiRosters: {},
    aiMatchHistory: {},
    careerLog: [],
    lastCareerProgression: [],
    scrims: {
      plan: null,
      history: []
    },
    matchHistory: [],
    scouting: {},
    settings: {
      speed: 2,
      soundEnabled: true,
      mapAnimations: true
    },
    progress: {
      matchesPlayed: 0,
      wins: 0,
      losses: 0,
      currentWinStreak: 0,
      bestWinStreak: 0,
      yearsPlayed: 0,
      titlesEarned: [],
      palmares: {
        regionalTitles: 0,
        msi: { qualified: 0, titles: 0, bestPlacement: null },
        worlds: { qualified: 0, titles: 0, bestPlacement: null }
      }
    }
  };
}

/* ------------------------------------------------------------
   État global en memoire
   ------------------------------------------------------------ */
let state = createDefaultState();

/* ------------------------------------------------------------
   Persistance localStorage (CDC 2.2)
   ------------------------------------------------------------ */
function saveGame() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
  } catch (e) {
    console.error('Erreur de sauvegarde', e);
  }
}

/* Palmarès (v1.5.2) : reconstruit les compteurs à partir des titres connus
   pour les sauvegardes antérieures qui n'avaient pas d'objet palmares. */
function buildPalmaresFromTitles(titles) {
  const pal = {
    regionalTitles: 0,
    msi: { qualified: 0, titles: 0, bestPlacement: null },
    worlds: { qualified: 0, titles: 0, bestPlacement: null }
  };
  (titles || []).forEach((t) => {
    if (/Champion\s+MSI/i.test(t)) { pal.msi.titles++; pal.msi.qualified++; pal.msi.bestPlacement = 1; }
    else if (/Champion\s+Worlds/i.test(t)) { pal.worlds.titles++; pal.worlds.qualified++; pal.worlds.bestPlacement = 1; }
    else if (/Champion/i.test(t)) { pal.regionalTitles++; }
  });
  return pal;
}

function ensurePalmares() {
  if (!state.progress.palmares) {
    state.progress.palmares = buildPalmaresFromTitles(state.progress.titlesEarned);
  }
  return state.progress.palmares;
}

function intlBestResultLabel(placement) {
  if (placement === null || placement === undefined) return '—';
  if (placement === 1) return 'Champion';
  if (placement === 2) return 'Finaliste';
  if (placement === 3) return 'Demi-finaliste';
  if (placement <= 5) return 'Quart de finaliste';
  return 'Phase de groupes';
}

function loadGame() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultState();
    const parsed = JSON.parse(raw);
    // fusion avec l'état par defaut pour assurer la compatibilite ascendante
    const defaults = createDefaultState();
    const merged = {
      version: CURRENT_VERSION,
      teamName: parsed.teamName || defaults.teamName,
      teamShortName: parsed.teamShortName !== undefined ? parsed.teamShortName : defaults.teamShortName,
      aiTeamId: parsed.aiTeamId !== undefined ? parsed.aiTeamId : defaults.aiTeamId,
      region: parsed.region !== undefined ? parsed.region : defaults.region,
      resources: Object.assign({}, defaults.resources, parsed.resources),
      roster: parsed.roster || defaults.roster,
      staff: Object.assign({}, defaults.staff, parsed.staff),
      championProgress: Object.assign({}, defaults.championProgress, parsed.championProgress),
      draftPreferences: Object.assign({}, defaults.draftPreferences, parsed.draftPreferences),
      draft: parsed.draft !== undefined ? parsed.draft : defaults.draft,
      matchSeries: parsed.matchSeries !== undefined ? parsed.matchSeries : defaults.matchSeries,
      season: parsed.season !== undefined ? parsed.season : defaults.season,
      international: parsed.international !== undefined ? parsed.international : defaults.international,
      mercatoOpen: parsed.mercatoOpen !== undefined ? parsed.mercatoOpen : true,
      aiRosters: parsed.aiRosters || defaults.aiRosters,
      aiMatchHistory: parsed.aiMatchHistory || defaults.aiMatchHistory,
      careerLog: parsed.careerLog || defaults.careerLog,
      lastCareerProgression: parsed.lastCareerProgression || defaults.lastCareerProgression,
      scrims: Object.assign({}, defaults.scrims, parsed.scrims),
      matchHistory: parsed.matchHistory || defaults.matchHistory,
      scouting: Object.assign({}, defaults.scouting, parsed.scouting),
      settings: Object.assign({}, defaults.settings, parsed.settings),
      progress: Object.assign({}, defaults.progress, parsed.progress)
    };
    // Migration palmarès : backfill depuis les titres si absent de la sauvegarde
    if (!(parsed.progress && parsed.progress.palmares)) {
      merged.progress.palmares = buildPalmaresFromTitles(merged.progress.titlesEarned);
    }
    // Migration contrats (v1.8.0) : attribue un contrat aux joueurs qui n'en ont
    // pas, pondéré par tier, ancré sur l'année en cours de la sauvegarde.
    if (Array.isArray(merged.roster) && merged.roster.length) {
      const baseYear = merged.season ? merged.season.year : 1;
      merged.roster.forEach((p) => {
        if (p.contractUntil == null) {
          const longProb = CONTRACT_LONG_PROB[getContractTier(p)];
          p.contractUntil = baseYear + (Math.random() < longProb ? 1 : 0);
        }
      });
    }
    // Migration âge (v1.8.4) : backfill baseAge/retirementAge depuis les data files.
    if (Array.isArray(merged.roster) && merged.roster.length) {
      const lookup = {};
      if (typeof AI_TEAMS !== 'undefined') AI_TEAMS.forEach(t => (t.roster || []).forEach(r => {
        if (r.name && r.baseAge != null) lookup[r.name.toLowerCase()] = { baseAge: r.baseAge, retirementAge: r.retirementAge };
      }));
      if (typeof TRANSFER_PLAYERS !== 'undefined') TRANSFER_PLAYERS.forEach(r => {
        if (r.name && r.baseAge != null) lookup[r.name.toLowerCase()] = { baseAge: r.baseAge, retirementAge: r.retirementAge };
      });
      merged.roster.forEach((p) => {
        if (p.baseAge == null) {
          const found = p.name && lookup[p.name.toLowerCase()];
          if (found) { p.baseAge = found.baseAge; p.retirementAge = found.retirementAge; }
        }
      });
    }
    return merged;
  } catch (e) {
    console.error('Erreur de chargement', e);
    return createDefaultState();
  }
}

function resetGame() {
  state = createDefaultState();
  saveGame();
  updateResourceBar();
  if (!state.region && typeof showRegionSelection === 'function') {
    showRegionSelection();
  } else {
    showView('home');
  }
  showToast('Partie reinitialisee', 'info');
}

/* ------------------------------------------------------------
   Export / Import
   ------------------------------------------------------------ */
const GIST_CONFIG_KEY = 'lol_esport_gist_config';

function loadGistConfig() {
  try { return JSON.parse(localStorage.getItem(GIST_CONFIG_KEY)) || {}; } catch { return {}; }
}

function saveGistConfig(gistId, token) {
  localStorage.setItem(GIST_CONFIG_KEY, JSON.stringify({ gistId, token }));
}

function setCloudStatus(msg, type) {
  const el = document.getElementById('cloud-save-status');
  if (!el) return;
  const color = type === 'success' ? 'var(--color-gold)' : type === 'error' ? '#e05252' : 'var(--color-text-muted)';
  el.innerHTML = `<span style="color:${color};">${msg}</span>`;
}

async function cloudExport() {
  const { gistId, token } = loadGistConfig();
  if (!gistId || !token) { setCloudStatus('⚠ Configuration manquante. Renseignez l\'ID Gist et le token.', 'error'); return; }
  setCloudStatus('Envoi en cours...', 'info');
  try {
    const res = await fetch(`https://api.github.com/gists/${gistId}`, {
      method: 'PATCH',
      headers: { Authorization: `token ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ files: { 'save.json': { content: JSON.stringify(state, null, 2) } } })
    });
    if (!res.ok) throw new Error(`Erreur ${res.status}`);
    const now = new Date().toLocaleTimeString('fr-FR');
    setCloudStatus(`✓ Sauvegarde envoyee le ${new Date().toLocaleDateString('fr-FR')} a ${now}`, 'success');
    showToast('Sauvegarde envoyee vers le cloud', 'success');
  } catch (err) {
    setCloudStatus(`✗ Échec : ${err.message}`, 'error');
    showToast('Échec de l\'envoi cloud', 'error');
  }
}

async function cloudImport() {
  const { gistId, token } = loadGistConfig();
  if (!gistId || !token) { setCloudStatus('⚠ Configuration manquante. Renseignez l\'ID Gist et le token.', 'error'); return; }
  setCloudStatus('Chargement depuis le cloud...', 'info');
  try {
    const res = await fetch(`https://api.github.com/gists/${gistId}`, {
      headers: { Authorization: `token ${token}` }
    });
    if (!res.ok) throw new Error(`Erreur ${res.status}`);
    const data = await res.json();
    const content = data.files?.['save.json']?.content;
    if (!content) throw new Error('Fichier save.json introuvable dans le Gist');
    const parsed = JSON.parse(content);
    if (!parsed.resources || !parsed.roster) throw new Error('Format de sauvegarde invalide');
    if (matchRuntime && matchRuntime.timer) clearInterval(matchRuntime.timer);
    matchRuntime = null;
    state = createDefaultState();
    state = parsed;
    ensureRosterContracts(0); // migration contrats (v1.8.0) pour les saves cloud
    ensureRosterAges();       // migration âge (v1.8.4)
    saveGame();
    updateResourceBar();
    showView('home');
    if (typeof renderHome === 'function') renderHome();
    setCloudStatus('✓ Sauvegarde chargée depuis le cloud', 'success');
    showToast('Sauvegarde cloud chargée avec succès', 'success');
  } catch (err) {
    setCloudStatus(`✗ Échec : ${err.message}`, 'error');
    showToast('Échec du chargement cloud', 'error');
  }
}

function initCloudSaveUI() {
  const cfg = loadGistConfig();
  const gistInput = document.getElementById('gist-id-input');
  const tokenInput = document.getElementById('gist-token-input');
  if (gistInput && cfg.gistId) gistInput.value = cfg.gistId;
  if (tokenInput && cfg.token) tokenInput.value = cfg.token;

  const saveConfigBtn = document.getElementById('btn-save-gist-config');
  if (saveConfigBtn) saveConfigBtn.addEventListener('click', () => {
    const gistId = gistInput?.value.trim();
    const token = tokenInput?.value.trim();
    if (!gistId || !token) { setCloudStatus('⚠ Les deux champs sont requis.', 'error'); return; }
    saveGistConfig(gistId, token);
    setCloudStatus('✓ Configuration enregistree', 'success');
    showToast('Configuration cloud sauvegardee', 'success');
  });

  const exportBtn = document.getElementById('btn-cloud-export');
  if (exportBtn) exportBtn.addEventListener('click', () => {
    showModal(`
      <div class="modal-confirm">
        <h3 class="panel-title">Envoyer vers le cloud</h3>
        <p>Cette action va <strong>écraser la sauvegarde cloud existante</strong> avec votre partie actuelle. Continuer ?</p>
        <div class="training-form__actions">
          <button class="btn-secondary" onclick="closeModal()">Annuler</button>
          <button class="btn-primary" id="btn-confirm-cloud-export">Confirmer l'envoi</button>
        </div>
      </div>
    `);
    document.getElementById('btn-confirm-cloud-export').addEventListener('click', () => { closeModal(); cloudExport(); });
  });

  const importBtn = document.getElementById('btn-cloud-import');
  if (importBtn) importBtn.addEventListener('click', () => {
    showModal(`
      <div class="modal-confirm">
        <h3 class="panel-title">Charger depuis le cloud</h3>
        <p>Cette action va <strong>écraser votre partie actuelle</strong> avec la sauvegarde cloud. Toute progression non sauvegardée sera perdue. Continuer ?</p>
        <div class="training-form__actions">
          <button class="btn-secondary" onclick="closeModal()">Annuler</button>
          <button class="btn-primary" id="btn-confirm-cloud-import">Confirmer le chargement</button>
        </div>
      </div>
    `);
    document.getElementById('btn-confirm-cloud-import').addEventListener('click', () => { closeModal(); cloudImport(); });
  });
}

function exportSave() {
  const dataStr = JSON.stringify(state, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  a.href = url;
  a.download = `lol_esport_manager_save_${timestamp}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Sauvegarde exportee', 'success');
}

function importSave(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (!parsed.resources || !parsed.roster) {
        throw new Error('Format invalide');
      }
      state = parsed;
      ensureRosterContracts(0); // migration contrats (v1.8.0) pour les saves importées
      ensureRosterAges();       // migration âge (v1.8.4)
      saveGame();
      updateResourceBar();
      showView('home');
      if (typeof renderHome === 'function') renderHome();
      showToast('Sauvegarde importee avec succès', 'success');
    } catch (err) {
      showToast('Fichier de sauvegarde invalide', 'error');
    }
  };
  reader.readAsText(file);
}

/* ------------------------------------------------------------
   Navigation SPA (CDC 2.3)
   ------------------------------------------------------------ */
function showView(viewName) {
  const views = document.querySelectorAll('.view');
  views.forEach((v) => v.classList.remove('view--active'));

  const target = document.getElementById(`view-${viewName}`);
  if (target) target.classList.add('view--active');

  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach((btn) => {
    btn.classList.toggle('nav-btn--active', btn.dataset.view === viewName);
  });

  // Rendu spécifique a chaque vue
  switch (viewName) {
    case 'home':
      if (typeof renderHome === 'function') renderHome();
      break;
    case 'roster':
      if (typeof renderRoster === 'function') renderRoster();
      break;
    case 'training':
      if (typeof renderTraining === 'function') renderTraining();
      break;
    case 'calendar':
      if (typeof renderCalendar === 'function') renderCalendar();
      break;
    case 'draft':
      if (typeof renderDraft === 'function') renderDraft();
      break;
    case 'champions':
      if (typeof renderChampions === 'function') renderChampions();
      break;
    case 'counters':
      if (typeof renderCounters === 'function') renderCounters();
      break;
    case 'match':
      if (typeof renderMatchSetup === 'function') renderMatchSetup();
      break;
    case 'scouting':
      if (typeof renderScouting === 'function') renderScouting();
      break;
    case 'transfers':
      if (typeof renderTransfers === 'function') renderTransfers();
      break;
    case 'progression':
      if (typeof renderProgression === 'function') renderProgression();
      break;
  }
}

/* ------------------------------------------------------------
   Barre de ressources (CDC 10.1)
   ------------------------------------------------------------ */
function updateResourceBar() {
  const coachingEl = document.getElementById('resource-coaching');
  const budgetEl = document.getElementById('resource-budget');
  const prestigeEl = document.getElementById('resource-prestige');

  if (coachingEl) coachingEl.textContent = state.resources.coachingPoints;
  if (budgetEl) budgetEl.textContent = state.resources.budget;
  if (prestigeEl) prestigeEl.textContent = state.resources.prestige;
}

/* ------------------------------------------------------------
   Toasts non-bloquants
   ------------------------------------------------------------ */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => toast.classList.add('toast--visible'), 10);
  setTimeout(() => {
    toast.classList.remove('toast--visible');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ------------------------------------------------------------
   Modal generique
   ------------------------------------------------------------ */
function showModal(innerHtml) {
  let overlay = document.getElementById('modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'modal-overlay';
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = `<div class="modal-content">${innerHtml}</div>`;
  overlay.classList.add('modal-overlay--visible');
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.classList.remove('modal-overlay--visible');
}

function showChangelogModal() {
  showModal(`<div class="changelog-modal"><p class="changelog-loading">Chargement…</p></div>`);
  fetch('CHANGELOG.md')
    .then(r => r.text())
    .then(md => {
      const html = md
        .replace(/^# (.+)$/gm, '<h2 class="changelog-h1">$1</h2>')
        .replace(/^## \[(.+)\] — (.+)$/gm, '<h3 class="changelog-version"><span class="changelog-tag">v$1</span><span class="changelog-date">$2</span></h3>')
        .replace(/^### (.+)$/gm, '<h4 class="changelog-section">$1</h4>')
        .replace(/^- \*\*(.+?)\*\* — (.+)$/gm, '<li><strong>$1</strong> — $2</li>')
        .replace(/^- \*\*(.+?)\*\*\s*:(.+)$/gm, '<li><strong>$1</strong> :$2</li>')
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        .replace(/(<li>[\s\S]+?<\/li>)(\n(?=<li>))?/g, (m) => m)
        .replace(/(<li>.*<\/li>\n?)+/g, s => `<ul>${s}</ul>`)
        .replace(/\n{2,}/g, '\n')
        .replace(/^---$/gm, '<hr class="changelog-hr">')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\`(.+?)\`/g, '<code>$1</code>');

      const overlay = document.getElementById('modal-overlay');
      if (overlay) {
        overlay.querySelector('.modal-content').innerHTML = `
          <div class="changelog-modal">
            <div class="changelog-header">
              <h2 class="changelog-title">Changelog</h2>
              <button class="changelog-close" id="changelog-close-btn">✕</button>
            </div>
            <div class="changelog-body">${html}</div>
          </div>`;
        document.getElementById('changelog-close-btn').addEventListener('click', closeModal);
      }
    })
    .catch(() => {
      const overlay = document.getElementById('modal-overlay');
      if (overlay) overlay.querySelector('.modal-content').innerHTML =
        `<div class="changelog-modal"><p>Impossible de charger le changelog.</p><button class="btn-secondary" onclick="closeModal()">Fermer</button></div>`;
    });
}

/* ------------------------------------------------------------
   Aleas
   ------------------------------------------------------------ */
function randomFloat(min, max) {
  return min + Math.random() * (max - min);
}

function randomInt(min, max) {
  return Math.floor(randomFloat(min, max + 1));
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function weightedChoice(items) {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const item of items) {
    roll -= item.weight;
    if (roll <= 0) return item;
  }
  return items[items.length - 1];
}

/* ------------------------------------------------------------
   Initiales d'un joueur pour l'avatar circulaire
   ------------------------------------------------------------ */
function getInitials(name) {
  const parts = name.split(/[\s-]+/).filter(Boolean);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

/* ------------------------------------------------------------
   Nom d'équipe - propagation
   ------------------------------------------------------------ */
function updateAllTeamNameDisplays() {
  document.querySelectorAll('.player-team-name').forEach((el) => {
    el.textContent = state.teamName;
  });
}

/* ------------------------------------------------------------
   Libelles des styles de draft IA (CDC 11.1)
   ------------------------------------------------------------ */
const STYLE_LABELS = {
  early_aggression: 'Agressivité early',
  scaling: 'Scaling',
  teamfight: 'Teamfight',
  pick: 'Pick',
  splitpush: 'Splitpush'
};

function formatStyle(style) {
  return STYLE_LABELS[style] || style;
}

/* ------------------------------------------------------------
   Scouting (CDC 11.2)
   ------------------------------------------------------------ */
const SCOUTING_THRESHOLDS = { advanced: 40, premium: 75 };
const VIDEO_REVIEW_CONFIDENCE_GAIN = 15;

function getScoutingReport(opponentId) {
  return state.scouting[opponentId] || { confidence: 0, scrimsPlayed: 0 };
}

function getScoutingTier(confidence) {
  if (confidence >= SCOUTING_THRESHOLDS.premium) return 'premium';
  if (confidence >= SCOUTING_THRESHOLDS.advanced) return 'advanced';
  return 'basic';
}

function computeLevel(p) {
  return Math.round((p.mental + p.shotcalling + p.laning + p.teamfight + p.mechanics) / 5);
}

function getTeamAverageLevel(team) {
  const total = team.roster.reduce((sum, p) => sum + computeLevel(p), 0);
  return Math.round(total / team.roster.length);
}

function getTeamTopChampions(team, count = 3) {
  const counts = {};
  team.roster.forEach((p) => {
    p.championPool.forEach((champ, idx) => {
      const weight = p.championPool.length - idx;
      counts[champ] = (counts[champ] || 0) + weight;
    });
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, count).map(([name]) => name);
}

function getTeamWeakestRole(team) {
  let weakest = null;
  team.roster.forEach((p) => {
    const score = (p.laning + p.teamfight + p.mechanics) / 3;
    if (!weakest || score < weakest.score) weakest = { role: p.role, player: p, score: Math.round(score) };
  });
  return weakest;
}

function getTeamRecentForm(teamId) {
  const history = state.aiMatchHistory && state.aiMatchHistory[teamId];
  if (!history || history.length === 0) return null;
  const wins = history.filter((m) => m.win).length;
  const total = history.length;
  const streak = [...history].reverse();
  let currentStreak = 0;
  const lastResult = streak[0] && streak[0].win;
  for (const m of streak) {
    if (m.win === lastResult) currentStreak++;
    else break;
  }
  return { wins, total, winRate: Math.round((wins / total) * 100), streakWin: lastResult, streakLen: currentStreak };
}

function getTeamRecentChampions(teamId, count = 5) {
  const history = state.aiMatchHistory && state.aiMatchHistory[teamId];
  if (!history || history.length === 0) return null;
  const champCounts = {};
  history.forEach((m) => {
    (m.mainChamps || []).forEach((c) => {
      champCounts[c] = (champCounts[c] || 0) + 1;
    });
  });
  return Object.entries(champCounts).sort((a, b) => b[1] - a[1]).slice(0, count).map(([name, n]) => ({ name, games: n }));
}

function getTeamDraftPriorityList(team) {
  if (!team.draftProfile) return [];
  const lines = [];
  (team.draftProfile.banPriorities || []).slice(0, 3).forEach((champ) => {
    lines.push(`${champ} (ban prioritaire)`);
  });
  DRAFT_ROLES.forEach((role) => {
    const picks = (team.draftProfile.comfortPicks || {})[role];
    if (picks && picks.length) lines.push(`${ROLE_NAMES[role]} : ${picks[0]} (pick confort)`);
  });
  return lines;
}

/**
 * Construit le corps HTML du rapport de scouting (CDC 11.2) pour une équipe,
 * reutilise par l'ecran Scouting et par le panneau de conseil de la Draft.
 */
function buildScoutingReportBody(team) {
  const report = getScoutingReport(team.id);
  const tier = getScoutingTier(report.confidence);
  const avgLevel = getTeamAverageLevel(team);
  const topChamps = getTeamTopChampions(team);

  const form = getTeamRecentForm(team.id);
  const formHtml = form ? (() => {
    const streakLabel = form.streakWin ? `<span class="level-delta level-delta--up">&#9650; ${form.streakLen}V</span>` : `<span class="level-delta level-delta--down">&#9660; ${form.streakLen}D</span>`;
    return `<p>Forme recente (${form.total} matchs) : ${form.wins}V/${form.total - form.wins}D &mdash; ${form.winRate}% victoires &mdash; serie actuelle : ${streakLabel}</p>`;
  })() : '';

  let html = `
    <div class="progress-bar"><div class="progress-bar__fill" style="width:${report.confidence}%"></div></div>
    <p class="card__count">Confiance scouting : ${report.confidence}/100 &mdash; ${report.scrimsPlayed || 0} scrim(s) de préparation, matchs déjà affrontés inclus.</p>

    <h4>Rapport basique</h4>
    <p>Style général : ${formatStyle(team.style)}.</p>
    <p>Niveau moyen de l'effectif : ${avgLevel}/100.</p>
    <p>Champions les plus joues (pool) : ${topChamps.join(', ')}.</p>
    ${formHtml}
  `;

  if (tier === 'advanced' || tier === 'premium') {
    const priorities = getTeamDraftPriorityList(team);
    const weak = getTeamWeakestRole(team);
    const recentChamps = getTeamRecentChampions(team.id);
    const recentChampsHtml = recentChamps
      ? `<p>Champions joues recemment : ${recentChamps.map((c) => `${c.name} (${c.games} game${c.games > 1 ? 's' : ''})`).join(', ')}.</p>`
      : '';
    html += `
      <h4>Rapport avance</h4>
      <p>Ordre de priorite en draft :</p>
      <div class="scrim-report">${priorities.map((l) => `<p>${l}</p>`).join('')}</div>
      <p>Faiblesse de matchup : leur ${ROLE_NAMES[weak.role]} (${weak.player.name}) est leur point le plus exploitable (niveau ${weak.score}/100).</p>
      ${recentChampsHtml}
    `;
  } else {
    html += `<div class="objective-description">Réalisez des scrims de préparation (ou affrontez cette équipe) pour débloquer le rapport avance : priorites de draft, bans probables et faiblesses de matchup.</div>`;
  }

  if (tier === 'premium') {
    const weak = getTeamWeakestRole(team);
    const myPlayer = state.roster.find((p) => p.role === weak.role);
    const topBan = (team.draftProfile && team.draftProfile.banPriorities || [])[0];
    const roleOrder = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'];
    const playerRows = roleOrder.map((role) => {
      const p = team.roster.find((r) => r.role === role);
      if (!p) return '';
      const avg = Math.round((p.laning + p.teamfight + p.mechanics) / 3);
      const myP = state.roster.find((r) => r.role === role);
      const myAvg = myP ? Math.round((myP.laning + myP.teamfight + myP.mechanics) / 3) : null;
      const advantage = myAvg !== null ? (myAvg >= avg ? `<span class="level-delta level-delta--up">&#9650; avantage</span>` : `<span class="level-delta level-delta--down">&#9660; désavantage</span>`) : '';
      return `
        <div class="career-progression-row">
          <span class="career-progression-row__name">${p.name} <span class="career-progression-row__role">${role}</span></span>
          <span class="career-progression-row__levels">Lane ${p.laning} &bull; TF ${p.teamfight} &bull; Meca ${p.mechanics}</span>
          <span class="career-progression-row__period">Moy. ${avg}</span>
          ${advantage}
        </div>`;
    }).join('');
    html += `
      <h4>Rapport premium</h4>
      <div class="career-progression-list" style="margin-bottom:10px;">${playerRows}</div>
      <p>Plan de draft suggere : misez sur un pick fort en ${ROLE_NAMES[weak.role]}${myPlayer ? ` pour ${myPlayer.name}` : ''} et bannissez ${topBan || 'leur pick signature'} en priorite.</p>
      <p>Scrim de préparation recommandé : "Préparation matchup" ciblé sur le ${ROLE_NAMES[weak.role]} adverse.</p>
    `;
  } else if (tier === 'advanced') {
    html += `<div class="objective-description">Continuez le scouting pour débloquer le rapport premium : suggestion de plan de draft et scrim de préparation recommandé.</div>`;
  }

  return html;
}

/* ------------------------------------------------------------
   Scrims et entraînement (CDC 5)
   ------------------------------------------------------------ */
const SCRIM_OBJECTIVES = [
  { id: 'champion_mastery', label: 'Champion ciblé', description: "Entrainer un joueur sur un nouveau champion ou approfondir sa maîtrise.", risk: 'Fatigue et mauvais résultat si le champion est trop difficile.' },
  { id: 'composition_test', label: 'Composition', description: 'Tester un style de jeu (engage, poke, scaling, dive, protect ADC...).', risk: 'Peu de progression individuelle.' },
  { id: 'matchup_prep', label: 'Préparation matchup', description: 'Préparer un adversaire spécifique et améliorer le scouting.', risk: 'Nécessite un rapport adversaire pour être vraiment efficace.' },
  { id: 'macro_objectives', label: 'Macro / objectifs', description: 'Travailler dragons, Baron, vision et rotations.', risk: 'Progression champion faible.' },
  { id: 'free_scrim', label: 'Scrim libre', description: "Match d'entraînement général, bon pour la forme et la cohesion.", risk: 'Moins rentable.' }
];

const COMP_TAGS = ['engage', 'poke', 'scaling', 'splitpush', 'pick', 'protect', 'dive', 'disengage'];
const COMP_TAG_LABELS = {
  engage: 'Engage', poke: 'Poke', scaling: 'Scaling', splitpush: 'Splitpush',
  pick: 'Pick', protect: 'Protect', dive: 'Dive', disengage: 'Disengage'
};

const SCRIM_INTENSITIES = [
  { id: 'low', label: 'Faible', cost: 5, fatigueGain: 6, multiplier: 0.7 },
  { id: 'normal', label: 'Normale', cost: 10, fatigueGain: 12, multiplier: 1.0 },
  { id: 'high', label: 'Intense', cost: 15, fatigueGain: 20, multiplier: 1.4 }
];

const REST_OPTIONS = [
  { id: 'short', label: 'Courte (1 jour)', fatigueReduction: 10, cost: 5 },
  { id: 'medium', label: 'Moyenne (2 jours)', fatigueReduction: 20, cost: 10 },
  { id: 'long', label: 'Longue (3 jours)', fatigueReduction: 35, cost: 18 }
];

// Seuil de prestige requis pour demander un scrim à une équipe hors-région selon son tier
const SCRIM_PRESTIGE_REQ = { 1: 75, 2: 40 };

// Bonus de gains selon le tier de l'adversaire : tier 1 +20%, tier 2 +10%, tier 3+ +0%
const SCRIM_TIER_BONUS = { 1: 1.20, 2: 1.10 };

function getScrimTierMultiplier(tier) {
  return SCRIM_TIER_BONUS[tier] || 1.0;
}

function getScrimPrestigeReq(tier) {
  return SCRIM_PRESTIGE_REQ[tier] || 0;
}

/* ------------------------------------------------------------
   Systeme de contrats (v1.8.0)
   Le prestige est une EXIGENCE (seuil a atteindre, non depense) ;
   le budget est PAYE. Calque sur la mecanique des scrims hors-region.
   ------------------------------------------------------------ */
// Cout d'une prolongation selon le tier du joueur et la duree (1 ou 2 ans).
const CONTRACT_EXTENSION_COSTS = {
  superstar: { 1: { prestige: 50, budget: 100 }, 2: { prestige: 70, budget: 185 } },
  star:      { 1: { prestige: 35, budget:  75 }, 2: { prestige: 50, budget: 140 } },
  solid:     { 1: { prestige: 20, budget:  50 }, 2: { prestige: 32, budget:  95 } },
  role:      { 1: { prestige: 8,  budget:  30 }, 2: { prestige: 15, budget:  55 } }
};
const CONTRACT_TIER_LABELS = { superstar: 'Superstar', star: 'Star', solid: 'Solide', role: 'Role player' };
// Probabilite qu'un joueur recoive un contrat long (annee de base +1) selon son tier.
const CONTRACT_LONG_PROB = { superstar: 0.80, star: 0.65, solid: 0.45, role: 0.25 };

function getContractTier(p) {
  const lvl = computeLevel(p);
  if (lvl >= 90) return 'superstar';
  if (lvl >= 85) return 'star';
  if (lvl >= 78) return 'solid';
  return 'role';
}

function getExtensionCost(p, years) {
  return CONTRACT_EXTENSION_COSTS[getContractTier(p)][years];
}

function currentGameYear() {
  return state.season ? state.season.year : 1;
}

// Attribue un contrat initial pondere par tier : les meilleurs joueurs sont
// securises plus longtemps. baseYear = annee en cours ; minExtra force une duree
// minimale (utile pour les signatures, qui ne doivent pas expirer instantanement).
function assignInitialContract(p, baseYear, minExtra) {
  minExtra = minExtra || 0;
  const longProb = CONTRACT_LONG_PROB[getContractTier(p)];
  const extra = Math.max(minExtra, Math.random() < longProb ? 1 : 0);
  return baseYear + extra; // fin Worlds baseYear ou baseYear+1
}

// Fenetre de prolongation (mercato) : ouverte de la fin du MSI/Worlds jusqu'au
// 1er match du split suivant (toute la pre-saison). Piloté par state.mercatoOpen,
// ouvert aussi tant que l'international est en cours de cloture (filet de securite).
function isContractWindowOpen() {
  if (state.mercatoOpen !== undefined) return state.mercatoOpen !== false;
  return !!(state.international && state.international.phase === 'done');
}

// Un contrat est dans sa derniere annee si son echeance est l'annee en cours.
function isContractFinalYear(p) {
  return p.contractUntil != null && p.contractUntil <= currentGameYear();
}

// Backfill : attribue un contrat a tout joueur du roster qui n'en a pas
// (nouvelle partie, migration d'une sauvegarde anterieure a la v1.8.0).
function ensureRosterContracts(minExtra) {
  if (!Array.isArray(state.roster)) return;
  const baseYear = currentGameYear();
  state.roster.forEach((p) => {
    if (p.contractUntil == null) {
      p.contractUntil = assignInitialContract(p, baseYear, minExtra);
    }
  });
}

// ─── Âge et retraite (v1.8.4) ────────────────────────────────────────────────

function playerAge(p) {
  return (p.baseAge != null ? p.baseAge : 22) + (currentGameYear() - 1);
}

// Année de jeu (numéro de Worlds) à partir de laquelle le joueur est à la retraite.
function playerRetirementYear(p) {
  const base = p.baseAge != null ? p.baseAge : 22;
  const ret  = p.retirementAge != null ? p.retirementAge : 30;
  return ret - base + 1;
}

// Limite absolue infranchissable : 33 ans.
function playerAbsoluteRetirementYear(p) {
  if (p.baseAge == null) return 999;
  return 33 - p.baseAge + 1;
}

// Type d'extension :
//   'normal'  → dans les limites de retraite prévue
//   'special' → dépasse retirementAge mais reste ≤ 33 ans (x1.5)
//   'blocked' → dépasserait les 33 ans (interdit)
function getExtensionType(p, years) {
  if (p.baseAge == null || p.retirementAge == null) return 'normal';
  const newEnd = (p.contractUntil || currentGameYear()) + years;
  if (newEnd > playerAbsoluteRetirementYear(p)) return 'blocked';
  if (newEnd > playerRetirementYear(p)) return 'special';
  return 'normal';
}

// Coût final : x1.5 arrondi au supérieur pour les extensions spéciales.
function getExtensionCostFinal(p, years) {
  const base = getExtensionCost(p, years);
  if (getExtensionType(p, years) === 'special') {
    return { prestige: Math.ceil(base.prestige * 1.5), budget: Math.ceil(base.budget * 1.5) };
  }
  return base;
}

// Peut-on prolonger le contrat de `years` années supplémentaires ?
// (normal ou spécial = oui ; bloqué = non)
function canExtendForYears(p, years) {
  return getExtensionType(p, years) !== 'blocked';
}

// Attribue baseAge/retirementAge à un joueur sans âge.
// Cherche en priorité dans AI_TEAMS + TRANSFER_PLAYERS, sinon génère par tier.
function assignPlayerAge(p) {
  const lookup = {};
  if (typeof AI_TEAMS !== 'undefined') AI_TEAMS.forEach(t => (t.roster || []).forEach(r => {
    if (r.name && r.baseAge != null) lookup[r.name.toLowerCase()] = { baseAge: r.baseAge, retirementAge: r.retirementAge };
  }));
  if (typeof TRANSFER_PLAYERS !== 'undefined') TRANSFER_PLAYERS.forEach(r => {
    if (r.name && r.baseAge != null) lookup[r.name.toLowerCase()] = { baseAge: r.baseAge, retirementAge: r.retirementAge };
  });
  const found = p.name && lookup[p.name.toLowerCase()];
  if (found) {
    p.baseAge = found.baseAge;
    p.retirementAge = found.retirementAge;
  } else {
    const tier = getContractTier(p);
    const minAge = { superstar: 22, star: 20, solid: 19, role: 18 }[tier] ?? 20;
    const maxAge = { superstar: 26, star: 25, solid: 24, role: 23 }[tier] ?? 24;
    const baseRet = { superstar: 33, star: 31, solid: 29, role: 28 }[tier] ?? 29;
    p.baseAge = minAge + Math.floor(Math.random() * (maxAge - minAge + 1));
    const rv = Math.random();
    p.retirementAge = baseRet + (rv < 0.33 ? -1 : rv < 0.67 ? 0 : 1);
  }
}

function ensureRosterAges() {
  if (!Array.isArray(state.roster)) return;
  state.roster.forEach(p => { if (p.baseAge == null) assignPlayerAge(p); });
}

// ─── Fin de saison Worlds ────────────────────────────────────────────────────

// Fin de saison Worlds : les joueurs dont le contrat s'acheve et qui n'ont pas
// ete prolonges quittent l'equipe (postes a pourvoir au marche des transferts).
function processContractExpirations(completedYear) {
  if (!Array.isArray(state.roster)) return [];
  const leaving = state.roster.filter((p) => p.contractUntil != null && p.contractUntil <= completedYear);
  if (!leaving.length) return [];
  const leavingIds = new Set(leaving.map((p) => p.id));
  leaving.forEach((p) => { if (state.championProgress) delete state.championProgress[p.id]; });
  state.roster = state.roster.filter((p) => !leavingIds.has(p.id));
  const names = leaving.map((p) => `${p.name} (${p.role})`).join(', ');
  if (Array.isArray(state.careerLog)) {
    state.careerLog.unshift(`Fin de contrat : ${names} quitte(nt) l'equipe. Poste(s) a pourvoir.`);
  }
  return leaving;
}

// Retourne la raison d'exemption si l'équipe accepte malgré le seuil, null sinon
function getScrimExemptionReason(opponent) {
  if (!state.international) return null;
  if (!state.international.teams.includes(opponent.id)) return null;
  return `votre organisation partage la même compétition internationale (${eventLabel(state.international)} ${state.international.year})`;
}

/* ------------------------------------------------------------
   Compte-rendu narratif (CR de scrim)
   ------------------------------------------------------------ */
const STAT_LABELS = {
  shotcalling: 'Macro / Objectifs',
  laning: 'Phase de lane',
  teamfight: 'Teamfight',
  mechanics: 'Mécanique',
  mental: 'Mental',
  form: 'Forme'
};

const OBJECTIVE_STAT_FOCUS = {
  champion_mastery: ['mechanics', 'laning'],
  composition_test: ['teamfight', 'mechanics'],
  matchup_prep: ['shotcalling', 'laning'],
  macro_objectives: ['shotcalling', 'mental'],
  free_scrim: ['shotcalling', 'laning', 'teamfight', 'mechanics']
};

function snapshotRosterStats() {
  const snap = {};
  state.roster.forEach((p) => {
    snap[p.id] = {
      shotcalling: p.shotcalling,
      laning: p.laning,
      teamfight: p.teamfight,
      mechanics: p.mechanics,
      mental: p.mental,
      form: p.form
    };
  });
  return snap;
}

function pickWeakLink(statKeys) {
  let worst = null;
  state.roster.forEach((p) => {
    statKeys.forEach((key) => {
      if (!worst || p[key] < worst.value) worst = { player: p, statKey: key, value: p[key] };
    });
  });
  return worst;
}

function pickStrongLink(statKeys) {
  let best = null;
  state.roster.forEach((p) => {
    statKeys.forEach((key) => {
      if (!best || p[key] > best.value) best = { player: p, statKey: key, value: p[key] };
    });
  });
  return best;
}

function buildScrimReport(plan, opponent, win, before, after) {
  const lines = [];
  const objLabel = (SCRIM_OBJECTIVES.find((o) => o.id === plan.objective) || {}).label || plan.objective;
  lines.push(`Scrim ${win ? 'remporte' : 'perdu'} contre ${opponent.name} (${objLabel}).`);

  const focusStats = OBJECTIVE_STAT_FOCUS[plan.objective] || OBJECTIVE_STAT_FOCUS.free_scrim;

  if (!win) {
    const weak = pickWeakLink(focusStats);
    if (weak) {
      lines.push(`Analyse : ${weak.player.name} a montre des difficultés en ${STAT_LABELS[weak.statKey]} (${weak.value}/100), un facteur cle de la défaite.`);
    }
  } else {
    const strong = pickStrongLink(focusStats);
    if (strong) {
      lines.push(`Analyse : ${strong.player.name} a porte l'équipe grace a son niveau en ${STAT_LABELS[strong.statKey]} (${strong.value}/100).`);
    }
  }

  const lastWeak = state.scrims.lastWeakLink;
  if (lastWeak) {
    const player = state.roster.find((p) => p.id === lastWeak.playerId);
    if (player && focusStats.includes(lastWeak.statKey)) {
      const currentVal = after[player.id][lastWeak.statKey];
      const delta = currentVal - lastWeak.value;
      if (delta > 0) {
        lines.push(`Suivi : depuis le dernier debrief, ${player.name} a progresse en ${STAT_LABELS[lastWeak.statKey]} (${lastWeak.value} -> ${currentVal}, +${delta}). L'entraînement ciblé porte ses fruits.`);
      } else {
        lines.push(`Suivi : ${player.name} reste a ${currentVal}/100 en ${STAT_LABELS[lastWeak.statKey]}, aucune amélioration nette depuis le dernier debrief malgre cet entraînement ciblé.`);
      }
    }
  }

  const deltaLines = [];
  state.roster.forEach((p) => {
    const b = before[p.id], a = after[p.id];
    Object.keys(STAT_LABELS).forEach((key) => {
      if (a[key] !== b[key]) {
        const diff = a[key] - b[key];
        deltaLines.push(`${p.name} : ${STAT_LABELS[key]} ${diff > 0 ? '+' : ''}${diff} (${b[key]} -> ${a[key]})`);
      }
    });
  });
  if (deltaLines.length) {
    lines.push('Evolution des stats :');
    lines.push(...deltaLines);
  }

  if (!win) {
    const weak = pickWeakLink(focusStats);
    if (weak) {
      state.scrims.lastWeakLink = { playerId: weak.player.id, statKey: weak.statKey, value: weak.value };
    }
  } else if (lastWeak && focusStats.includes(lastWeak.statKey)) {
    const player = state.roster.find((p) => p.id === lastWeak.playerId);
    if (player && player[lastWeak.statKey] - lastWeak.value >= 3) {
      delete state.scrims.lastWeakLink;
    }
  }

  return lines;
}

function showScrimRefusalModal(opponent, required, costSpent, currentPrestige) {
  showModal(`
    <h3 class="panel-title" style="color:var(--color-danger, #e05);">&#10007; Demande de scrim refusée</h3>
    <div style="display:flex;flex-direction:column;gap:14px;margin-top:8px;">
      <p style="color:var(--color-text);">
        <strong>${opponent.name}</strong> a refusé votre demande de scrim.
      </p>
      <div style="background:var(--color-surface-alt);border:1px solid var(--color-border);border-radius:6px;padding:12px 14px;">
        <p style="color:var(--color-text-muted);margin:0 0 6px;">
          &#127942; Prestige requis : <strong style="color:var(--color-gold);">${required}</strong>
          &nbsp;|&nbsp; Votre prestige : <strong style="color:${currentPrestige >= required ? 'var(--color-seafoam)' : '#e05'};">${currentPrestige}</strong>
        </p>
        <p style="color:var(--color-text-muted);margin:0;font-size:13px;">
          L'organisation <em>${opponent.name}</em> estime que votre réputation n'est pas encore suffisante pour justifier un scrim.
          Terminez des splits et des tournois internationaux pour gagner en prestige.
        </p>
      </div>
      <div style="background:var(--color-surface-alt);border:1px solid var(--color-border);border-radius:6px;padding:12px 14px;">
        <p style="color:var(--color-text-muted);margin:0;font-size:13px;">
          &#128464; <strong style="color:var(--color-text);">−${costSpent} pts de coaching consommés.</strong>
          Votre staff avait mobilisé les ressources nécessaires pour préparer cette demande.
          La sollicitation d'une organisation de ce standing sans le prestige requis est considérée comme un manque de préparation.
        </p>
      </div>
    </div>
    <div class="modal-content__actions" style="margin-top:20px;">
      <button class="btn-primary" onclick="closeModal();renderTraining();">Compris</button>
    </div>
  `);
}

function showScrimReportModal(report) {
  showModal(`
    <h3 class="panel-title">Compte-rendu du scrim</h3>
    <div class="scrim-report">
      ${report.map((line) => `<p>${line}</p>`).join('')}
    </div>
    <div class="training-form__actions">
      <button class="btn-primary" id="btn-close-scrim-report">Fermer</button>
    </div>
  `);
  const btn = document.getElementById('btn-close-scrim-report');
  if (btn) btn.addEventListener('click', closeModal);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getChampionsForRole(role) {
  return CHAMPIONS.filter((c) => c.role === role || c.secondaryRoles.includes(role));
}

function averageRosterLevel(roster) {
  if (!roster.length) return 0;
  return roster.reduce((sum, p) => sum + computeLevel(p), 0) / roster.length;
}

/* ------------------------------------------------------------
   Equilibrage global (CDC 13) - BALANCE_CONFIG centralise les
   coefficients afin de pouvoir ajuster l'equilibre sans toucher
   au moteur de simulation.
   ------------------------------------------------------------ */
const BALANCE_CONFIG = {
  // CDC 13.2 - playerChampionPower
  power: {
    levelWeight: 0.38,
    masteryWeight: 0.32,
    roleSkillWeight: 0.12,
    formWeight: 0.08,
    fatiguePenaltyMax: 12,
    // Garde-fou 13.1 : un champion non maîtrise ne doit pas devenir optimal
    // uniquement grace au matchup -> le bonus de matchup reste sous l'ecart
    // de maîtrise type entre un pick confort et un pick non maîtrise.
    matchupBonus: 1.5,
    // Bonus base sur les donnees de counter explicites (data_counters.js).
    // counterScore (0-100) est ramene a [0, counterBonusMax], reste sous
    // matchupBonus + ecart de maîtrise type pour respecter le garde-fou 13.1.
    counterBonusMax: 2
  },
  mentalPressure: {
    baseImpact: 4,
    stakesMultiplier: { regular: 1, playoffs: 1.6 },
    tiltablePenaltyMultiplier: 1.6,
    clutchBonus: 3
  },
  traits: {
    igl: { categories: ['macro', 'objective'], bonus: 3 },
    mechanical: { categories: ['lane', 'jungle', 'teamfight'], bonus: 3 },
    leader: { mentalBonusFactor: 0.1 },
    veteran: { fatigueResistance: 0.3 },
    rookie: { varianceMultiplier: 1.4 },
    consistant: { varianceMultiplier: 0.6 }
  },
  mastery: {
    diminishingFloor: 0.25
  },
  fatigue: {
    // Garde-fou 13.1 : les scrims intensifs doivent créer une vraie fatigué,
    // mais celle-ci doit pouvoir être recuperee entre deux matchs.
    trainingPenaltyDivisor: 200,
    matchRecovery: 15
  },
  events: {
    matchVariance: 3,
    // Garde-fou 13.1 : les événements dramatiques sont rares en saison
    // reguliere et plus presents en playoffs/Worlds/EWC.
    dramaticWeight: { regular: 1, playoffs: 3 }
  }
};

function getMatchStakes() {
  if (state.season && state.season.phase === 'playoffs') return 'playoffs';
  if (state.international && state.international.pendingMatch) {
    return state.international.pendingMatch.type === 'bracket' ? 'playoffs' : 'regular';
  }
  return 'regular';
}

function fatiguePenaltyFactor(player) {
  return 1 - player.fatigue / BALANCE_CONFIG.fatigue.trainingPenaltyDivisor;
}

function potentialMultiplier(player) {
  return 0.6 + (player.potential / 100) * 0.6;
}

function diminishingReturns(mastery) {
  return Math.max(BALANCE_CONFIG.mastery.diminishingFloor, 1 - mastery / 120);
}

/**
 * Modificateur de pression mentale (CDC 13.2 mentalPressureModifier).
 * Un mental eleve donne un leger bonus, un mental faible une pénalité,
 * amplifiee en playoffs/Worlds et pour les joueurs "tiltable", attenuee
 * (et inversee positivement) pour les joueurs "clutch".
 */
function computeMentalPressureModifier(player, stakes) {
  const cfg = BALANCE_CONFIG.mentalPressure;
  const stakesMultiplier = cfg.stakesMultiplier[stakes] || 1;
  let modifier = ((player.mental - 50) / 50) * cfg.baseImpact * stakesMultiplier;
  if (modifier < 0 && (player.traits || []).includes('tiltable')) {
    modifier *= cfg.tiltablePenaltyMultiplier;
  }
  if (stakes === 'playoffs' && (player.traits || []).includes('clutch')) {
    modifier += cfg.clutchBonus;
  }
  return modifier;
}

/**
 * Modificateur de traits (CDC 13.2 traitModifier) : bonus contextuel selon
 * la categorie d'événement (igl/mechanical) et le leadership (leader).
 */
function computeTraitModifier(player, category) {
  const cfg = BALANCE_CONFIG.traits;
  let modifier = 0;
  (player.traits || []).forEach((trait) => {
    const def = cfg[trait];
    if (!def) return;
    if (def.categories && def.categories.includes(category)) modifier += def.bonus;
    if (trait === 'leader') modifier += (player.mental - 50) * def.mentalBonusFactor;
  });
  return modifier;
}

/**
 * Pénalité de fatigué (CDC 13.2 fatiguePenalty), attenuee pour les joueurs
 * "veteran".
 */
function computeFatiguePenalty(player) {
  let penalty = (player.fatigue / 100) * BALANCE_CONFIG.power.fatiguePenaltyMax;
  if ((player.traits || []).includes('veteran')) {
    penalty *= (1 - BALANCE_CONFIG.traits.veteran.fatigueResistance);
  }
  return penalty;
}

/**
 * Multiplicateur de variance applique aux événements de match : les
 * "rookie" sont plus inconstants, les "consistant" plus reguliers.
 */
function getVarianceMultiplier(player) {
  const cfg = BALANCE_CONFIG.traits;
  let multiplier = 1;
  (player.traits || []).forEach((trait) => {
    if (cfg[trait] && cfg[trait].varianceMultiplier) multiplier *= cfg[trait].varianceMultiplier;
  });
  return multiplier;
}

/**
 * Formule de performance joueur (CDC 13.2) :
 * playerChampionPower = level*0.38 + mastery*0.32 + roleSkill*0.12 +
 *   form*0.08 + mentalPressureModifier + traitModifier - fatiguePenalty
 */
function computePlayerChampionPower(player, options = {}) {
  const cfg = BALANCE_CONFIG.power;
  const mastery = options.mastery != null ? options.mastery : 40;
  const roleSkill = options.roleSkill != null ? options.roleSkill : player.mechanics;
  const stakes = options.stakes || 'regular';
  const category = options.category || 'macro';

  return computeLevel(player) * cfg.levelWeight
    + mastery * cfg.masteryWeight
    + roleSkill * cfg.roleSkillWeight
    + player.form * cfg.formWeight
    + computeMentalPressureModifier(player, stakes)
    + computeTraitModifier(player, category)
    - computeFatiguePenalty(player);
}

function ensureChampionMasteryEntry(playerId, champion) {
  if (!state.championProgress[playerId]) state.championProgress[playerId] = {};
  if (!state.championProgress[playerId][champion.id]) {
    state.championProgress[playerId][champion.id] = {
      championId: champion.id,
      mastery: 0,
      xp: 0,
      confidence: 50,
      stageReady: false,
      lastPlayedMatchIds: []
    };
  }
  return state.championProgress[playerId][champion.id];
}

/* ------------------------------------------------------------
   Sélection de region puis d'équipe (CDC 11.1)
   Le joueur ne créé pas son équipe : il prend les commandes
   d'une équipe existante recuperee dans data_teams.js.
   ------------------------------------------------------------ */
function showRegionSelection() {
  renderRegionStep();
}

function renderRegionStep() {
  const overlay = document.getElementById('region-select-overlay');
  const content = document.getElementById('region-select-content');
  if (!overlay || !content) return;

  content.innerHTML = `
    <h2 class="region-select-title">Choisissez votre region</h2>
    <p class="region-select-warning">Ce choix definit la ligue regionale dans laquelle votre équipe evoluera.</p>
    <div class="region-grid" id="region-grid">
      ${REGIONS.map((r) => `
        <div class="region-card" data-region="${r.id}">
          <div class="region-badge region-badge--${r.id}">${r.name}</div>
          <div class="region-card__name">${r.inspiration}</div>
          <div class="region-card__inspiration">${r.style}</div>
        </div>
      `).join('')}
    </div>
  `;

  overlay.style.display = 'flex';

  content.querySelectorAll('.region-card').forEach((card) => {
    card.addEventListener('click', () => {
      renderTeamStep(card.dataset.region);
    });
  });
}

function renderTeamStep(regionId) {
  const content = document.getElementById('region-select-content');
  if (!content) return;

  const region = REGIONS.find((r) => r.id === regionId);
  const teams = getAITeamsForRegion(regionId);

  content.innerHTML = `
    <h2 class="region-select-title">Choisissez votre équipe (${region.name})</h2>
    <p class="region-select-warning">Vous prendrez les commandes de cette équipe pour la saison.</p>
    <div class="team-select-grid" id="team-select-grid">
      ${teams.map((t) => `
        <div class="team-select-card" data-team="${t.id}">
          <div class="region-badge region-badge--${regionId}">${t.shortName}</div>
          <div class="team-select-card__name">${t.name}</div>
          <div class="team-select-card__meta">Tier ${t.tier} &mdash; ${formatStyle(t.style)}</div>
        </div>
      `).join('')}
    </div>
    <div class="quick-actions" style="justify-content:center;">
      <button class="btn-secondary" id="btn-back-to-regions">Retour aux regions</button>
    </div>
  `;

  content.querySelectorAll('.team-select-card').forEach((card) => {
    card.addEventListener('click', () => {
      const team = teams.find((t) => t.id === card.dataset.team);
      showTeamConfirmModal(team, regionId);
    });
  });

  content.querySelector('#btn-back-to-regions').addEventListener('click', renderRegionStep);
}

function showTeamConfirmModal(team, regionId) {
  const roleOrder = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'];
  const sortedRoster = [...team.roster].sort((a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role));

  const rosterRows = sortedRoster.map((p) => `
    <tr>
      <td>${p.role}</td>
      <td>${p.name}</td>
      <td>${p.nationality}</td>
      <td>${computeLevel(p)}</td>
    </tr>
  `).join('');

  showModal(`
    <h2 class="region-select-title">${team.name} (${team.shortName})</h2>
    <p class="region-select-warning">Tier ${team.tier} &mdash; Style : ${formatStyle(team.style)}</p>
    <table class="history-table">
      <thead>
        <tr><th>Role</th><th>Joueur</th><th>Nationalite</th><th>Niveau</th></tr>
      </thead>
      <tbody>${rosterRows}</tbody>
    </table>
    <div class="modal-content__actions">
      <button class="btn-secondary" id="btn-cancel-team">Revenir en arriere</button>
      <button class="btn-primary" id="btn-confirm-team">Valider cette équipe</button>
    </div>
  `);

  document.getElementById('btn-cancel-team').addEventListener('click', closeModal);
  document.getElementById('btn-confirm-team').addEventListener('click', () => {
    confirmTeamSelection(team, regionId);
  });
}

function confirmTeamSelection(team, regionId) {
  state.region = regionId;
  state.teamName = team.name;
  state.teamShortName = team.shortName;
  state.aiTeamId = team.id;
  state.roster = JSON.parse(JSON.stringify(team.roster));
  ensureRosterContracts(0); // contrats initiaux (fin Worlds 1 ou 2, pondéré par tier)
  ensureRosterAges();       // âge initial (v1.8.4)
  initChampionProgress();

  closeModal();
  const overlay = document.getElementById('region-select-overlay');
  if (overlay) overlay.style.display = 'none';

  saveGame();
  updateAllTeamNameDisplays();
  showView('home');
  showToast(`Bienvenue chez ${team.name} !`, 'success');
}

/* ------------------------------------------------------------
   Ecran d'accueil (CDC 12.1)
   ------------------------------------------------------------ */
function renderHome() {
  updateAllTeamNameDisplays();

  const regionEl = document.getElementById('home-team-region');
  if (regionEl) {
    regionEl.innerHTML = state.region
      ? `<span class="region-badge region-badge--${state.region}">${state.region}</span>`
      : '';
  }

  const avatarsEl = document.getElementById('home-team-avatars');
  if (avatarsEl) {
    if (state.roster.length === 0) {
      avatarsEl.innerHTML = '<div class="mini-avatar mini-avatar--empty">?</div>'.repeat(5);
    } else {
      avatarsEl.innerHTML = state.roster.slice(0, 5).map((p) => `<div class="mini-avatar">${getInitials(p.name)}</div>`).join('');
    }
  }

  const resultsEl = document.getElementById('home-recent-results');
  if (resultsEl) {
    if (state.matchHistory.length === 0) {
      resultsEl.innerHTML = '<p class="card__count">Aucun match joue pour le moment.</p>';
    } else {
      resultsEl.innerHTML = state.matchHistory.slice(0, 3).map((m) => {
        const cls = m.result === 'win' ? 'result-chip--win' : 'result-chip--loss';
        return `<div class="result-chip ${cls}">vs ${m.opponent} &mdash; ${m.scoreHome}-${m.scoreAway}</div>`;
      }).join('');
    }
  }
}

/* ------------------------------------------------------------
   Vues encore vides (squelette, completees aux étapes suivantes)
   ------------------------------------------------------------ */
function renderRoster() {
  const el = document.getElementById('roster-content');
  if (!el) return;

  if (state.roster.length === 0) {
    el.innerHTML = '<div class="empty-state">Aucun joueur dans le roster pour le moment.</div>';
    return;
  }

  const roleOrder = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'];
  const sorted = [...state.roster].sort((a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role));

  const avgFatigue = Math.round(state.roster.reduce((sum, p) => sum + p.fatigue, 0) / state.roster.length);

  el.innerHTML = `
    <div class="panel-subsection rest-panel">
      <h3 class="panel-title">Repos de l'équipe</h3>
      <p class="card__count">Fatigue moyenne actuelle : ${avgFatigue}/100</p>
      <div class="training-form__actions">
        ${REST_OPTIONS.map((o) => `<button class="btn-secondary" data-rest="${o.id}">${o.label} (-${o.fatigueReduction} fatigue, ${o.cost} pts coaching)</button>`).join('')}
      </div>
    </div>
    <div class="player-grid">${sorted.map(playerCardHtml).join('')}</div>
  `;

  document.querySelectorAll('[data-rest]').forEach((btn) => {
    btn.addEventListener('click', () => restTeam(btn.dataset.rest));
  });
}

function restTeam(optionId) {
  const option = REST_OPTIONS.find((o) => o.id === optionId);
  if (!option) return;

  if (state.resources.coachingPoints < option.cost) {
    showToast('Pas assez de points de coaching pour ce repos.', 'error');
    return;
  }

  state.resources.coachingPoints -= option.cost;
  state.roster.forEach((p) => {
    p.fatigue = clamp(p.fatigue - option.fatigueReduction, 0, 100);
  });

  saveGame();
  updateResourceBar();
  renderRoster();
  showToast(`Repos (${option.label}) effectué : fatigué de l'équipe reduite.`, 'success');
}

function playerStatRow(label, value) {
  return `
    <div class="player-stat">
      <span class="player-stat__label">${label}</span>
      <div class="progress-bar"><div class="progress-bar__fill" style="width:${value}%"></div></div>
      <span class="player-stat__value">${value}</span>
    </div>
  `;
}

function playerCardHtml(p) {
  const progression = (state.lastCareerProgression || []).find((e) => e.playerId === p.id);
  const deltaHtml = progression ? `
    <span class="level-delta ${progression.delta > 0 ? 'level-delta--up' : 'level-delta--down'}" title="Evolution du dernier split">
      ${progression.delta > 0 ? '&#9650;' : '&#9660;'} ${progression.delta > 0 ? '+' : ''}${progression.delta}
    </span>
  ` : '';

  return `
    <div class="player-card">
      <div class="player-card__header">
        <div class="mini-avatar">${getInitials(p.name)}</div>
        <div class="player-card__identity">
          <div class="player-card__name">${p.name}</div>
          <div class="player-card__role">${p.role} &mdash; ${p.nationality}</div>
          ${p.baseAge != null ? `<div style="font-size:11px;margin-top:1px;color:var(--color-text-muted);">${playerAge(p)} ans</div>` : ''}
          ${p.contractUntil != null ? `<div style="font-size:11px;margin-top:2px;color:${isContractFinalYear(p) ? '#e0a020' : 'var(--color-text-muted)'};">&#128203; Contrat : Worlds ${p.contractUntil}${isContractFinalYear(p) ? ' &mdash; derni&egrave;re ann&eacute;e' : ''}</div>` : ''}
        </div>
        <div class="player-card__level">${computeLevel(p)}${deltaHtml}</div>
      </div>
      <div class="player-card__stats">
        ${playerStatRow('Forme', p.form)}
        ${playerStatRow('Fatigue', p.fatigue)}
        ${playerStatRow('Mental', p.mental)}
        ${playerStatRow('Shotcalling', p.shotcalling)}
        ${playerStatRow('Laning', p.laning)}
        ${playerStatRow('Teamfight', p.teamfight)}
        ${playerStatRow('Mécaniques', p.mechanics)}
      </div>
      <div class="player-card__pool">
        <span class="player-card__pool-label">Champion pool</span>
        <div class="champion-chip-list">
          ${p.championPool.map((c) => {
            const mastery = getChampionMastery(p.id, c);
            if (!mastery) return `<span class="champion-chip">${c}</span>`;
            const tier = getMasteryTier(mastery.mastery);
            return `<span class="champion-chip champion-chip--${tier.id}" title="${tier.label} (${mastery.mastery})">${c} <span class="champion-chip__mastery">${mastery.mastery}</span></span>`;
          }).join('')}
        </div>
      </div>
      ${p.traits.length ? `
        <div class="player-card__traits">
          ${p.traits.map((t) => `<span class="trait-chip">${t}</span>`).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

function renderTraining() {
  const el = document.getElementById('training-content');
  if (!el) return;

  if (state.roster.length === 0) {
    el.innerHTML = '<div class="empty-state">Constituez votre roster avant de planifier un entraînement.</div>';
    return;
  }

  el.innerHTML = `
    <h3 class="panel-title">Planifier un scrim</h3>
    <div class="training-form">
      <div class="training-form__group">
        <label for="scrim-objective">Objectif</label>
        <select id="scrim-objective">
          ${SCRIM_OBJECTIVES.map((o) => `<option value="${o.id}">${o.label}</option>`).join('')}
        </select>
        <div class="objective-description" id="scrim-objective-description"></div>
      </div>

      <div class="training-form__group">
        <label for="scrim-region">Region adverse</label>
        <select id="scrim-region">
          ${REGIONS.map((r) => `<option value="${r.id}" ${r.id === state.region ? 'selected' : ''}>${r.name}</option>`).join('')}
        </select>
      </div>

      <div class="training-form__group">
        <label for="scrim-opponent">Adversaire</label>
        <select id="scrim-opponent"></select>
      </div>

      <div class="training-form__group">
        <label for="scrim-intensity">Intensite</label>
        <select id="scrim-intensity">
          ${SCRIM_INTENSITIES.map((i) => `<option value="${i.id}">${i.label} (cout ${i.cost} pts)</option>`).join('')}
        </select>
      </div>

      <div class="training-form__group" id="scrim-focus-player-group">
        <label for="scrim-focus-player">Joueur ciblé</label>
        <select id="scrim-focus-player">
          ${state.roster.map((p) => `<option value="${p.id}">${p.name} (${p.role})</option>`).join('')}
        </select>
      </div>

      <div class="training-form__group" id="scrim-focus-champion-group">
        <label for="scrim-focus-champion">Champion ciblé</label>
        <select id="scrim-focus-champion"></select>
      </div>

      <div class="training-form__group training-form__group--full" id="scrim-comp-tags-group">
        <label>Style de composition</label>
        <div class="comp-tag-list">
          ${COMP_TAGS.map((tag) => `
            <label class="comp-tag-option">
              <input type="checkbox" value="${tag}" class="comp-tag-checkbox">
              ${COMP_TAG_LABELS[tag]}
            </label>
          `).join('')}
        </div>
      </div>
    </div>
    <div class="training-form__actions">
      <button class="btn-primary" id="btn-run-scrim">Lancer le scrim</button>
      <span class="card__count" id="scrim-cost-label"></span>
    </div>

    <h3 class="panel-title" style="margin-top:24px;">Historique des scrims</h3>
    <div id="scrim-history-wrapper"></div>
  `;

  setupTrainingFormHandlers();
  renderScrimHistory();
}

function setupTrainingFormHandlers() {
  const objectiveSelect = document.getElementById('scrim-objective');
  const focusPlayerSelect = document.getElementById('scrim-focus-player');
  const intensitySelect = document.getElementById('scrim-intensity');
  const regionSelect = document.getElementById('scrim-region');
  const opponentSelect = document.getElementById('scrim-opponent');
  const runBtn = document.getElementById('btn-run-scrim');

  function updateOpponentOptions() {
    const playerAiRegion = (REGIONS.find(r => r.id === state.region) || {}).aiRegion;
    const opponents = getAITeamsForRegion(regionSelect.value).filter((t) => t.id !== state.aiTeamId);
    opponentSelect.innerHTML = opponents.map((t) => {
      const isSameRegion = t.region === playerAiRegion;
      const req = getScrimPrestigeReq(t.tier);
      const hasPrestige = state.resources.prestige >= req;
      const exemption = getScrimExemptionReason(t);
      let suffix = '';
      if (!isSameRegion && req > 0 && !exemption) {
        suffix = hasPrestige ? ` ✓ Prestige OK (${req})` : ` ⚠ Prestige requis : ${req}`;
      } else if (!isSameRegion && exemption) {
        suffix = ' ★ Même compétition';
      }
      return `<option value="${t.id}">${t.name} (${t.shortName})${suffix}</option>`;
    }).join('');
  }

  function updateObjectiveVisibility() {
    const objective = objectiveSelect.value;
    const def = SCRIM_OBJECTIVES.find((o) => o.id === objective);
    document.getElementById('scrim-objective-description').textContent = `${def.description} ${def.risk}`;

    document.getElementById('scrim-focus-player-group').style.display =
      (objective === 'champion_mastery' || objective === 'matchup_prep') ? '' : 'none';
    document.getElementById('scrim-focus-champion-group').style.display =
      (objective === 'champion_mastery') ? '' : 'none';
    document.getElementById('scrim-comp-tags-group').style.display =
      (objective === 'composition_test') ? '' : 'none';
  }

  function updateChampionOptions() {
    const player = state.roster.find((p) => p.id === focusPlayerSelect.value);
    const champSelect = document.getElementById('scrim-focus-champion');
    if (!player) { champSelect.innerHTML = ''; return; }
    const candidates = getChampionsForRole(player.role);
    champSelect.innerHTML = candidates.map((c) => {
      const mastery = getChampionMastery(player.id, c.name);
      const label = mastery ? `${c.name} (maîtrise ${mastery.mastery})` : `${c.name} (nouveau)`;
      return `<option value="${c.id}">${label}</option>`;
    }).join('');
  }

  function updateCostLabel() {
    const intensity = SCRIM_INTENSITIES.find((i) => i.id === intensitySelect.value);
    document.getElementById('scrim-cost-label').textContent =
      `Coût : ${intensity.cost} points de coaching (disponible : ${state.resources.coachingPoints})`;
  }

  objectiveSelect.addEventListener('change', updateObjectiveVisibility);
  focusPlayerSelect.addEventListener('change', updateChampionOptions);
  intensitySelect.addEventListener('change', updateCostLabel);
  regionSelect.addEventListener('change', updateOpponentOptions);

  updateOpponentOptions();
  updateObjectiveVisibility();
  updateChampionOptions();
  updateCostLabel();

  runBtn.addEventListener('click', () => {
    const plan = {
      id: 'scrim_' + Date.now(),
      opponentTeamId: document.getElementById('scrim-opponent').value,
      objective: objectiveSelect.value,
      focusPlayerId: focusPlayerSelect.value || null,
      focusChampionId: document.getElementById('scrim-focus-champion').value || null,
      targetCompTags: Array.from(document.querySelectorAll('.comp-tag-checkbox:checked')).map((cb) => cb.value),
      intensity: intensitySelect.value,
      result: null
    };
    runScrim(plan);
  });
}

function renderScrimHistory() {
  const wrapper = document.getElementById('scrim-history-wrapper');
  if (!wrapper) return;

  if (state.scrims.history.length === 0) {
    wrapper.innerHTML = '<div class="empty-state">Aucun scrim joue pour le moment.</div>';
    return;
  }

  wrapper.innerHTML = `
    <table class="history-table">
      <thead>
        <tr><th>Adversaire</th><th>Objectif</th><th>Intensite</th><th>Résultat</th><th>Gains</th><th>CR</th></tr>
      </thead>
      <tbody>
        ${state.scrims.history.map((s, index) => {
          const objLabel = (SCRIM_OBJECTIVES.find((o) => o.id === s.objective) || {}).label || s.objective;
          const intLabel = (SCRIM_INTENSITIES.find((i) => i.id === s.intensity) || {}).label || s.intensity;
          return `
            <tr>
              <td>${s.opponentName}</td>
              <td>${objLabel}</td>
              <td>${intLabel}</td>
              <td><span class="result-tag ${s.win ? 'result-tag--win' : 'result-tag--loss'}">${s.win ? 'Victoire' : 'Défaite'}</span></td>
              <td>${s.summary}</td>
              <td>${s.report ? `<button class="btn-secondary btn-view-report" data-history-index="${index}">Voir CR</button>` : ''}</td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;

  wrapper.querySelectorAll('.btn-view-report').forEach((btn) => {
    btn.addEventListener('click', () => {
      const entry = state.scrims.history[Number(btn.dataset.historyIndex)];
      if (entry && entry.report) showScrimReportModal(entry.report);
    });
  });
}

/* ------------------------------------------------------------
   Resolution d'un scrim (CDC 5.3 / 3.3)
   ------------------------------------------------------------ */
function runScrim(plan) {
  const intensity = SCRIM_INTENSITIES.find((i) => i.id === plan.intensity);
  const opponent = getTeamRef(plan.opponentTeamId);
  if (!intensity || !opponent) {
    showToast('Configuration de scrim invalide.', 'error');
    return;
  }

  if (state.resources.coachingPoints < intensity.cost) {
    showToast('Pas assez de points de coaching pour ce scrim.', 'error');
    return;
  }

  // --- Vérification prestige (v1.7.0) ---
  const playerAiRegion = (REGIONS.find(r => r.id === state.region) || {}).aiRegion;
  const isSameRegion = opponent.region === playerAiRegion;
  const exemptionReason = !isSameRegion ? getScrimExemptionReason(opponent) : null;
  const prestigeReq = getScrimPrestigeReq(opponent.tier || 3);
  const playerPrestige = state.resources.prestige;

  if (!isSameRegion && !exemptionReason && prestigeReq > 0 && playerPrestige < prestigeReq) {
    state.resources.coachingPoints -= intensity.cost;
    saveGame();
    updateResourceBar();
    showScrimRefusalModal(opponent, prestigeReq, intensity.cost, playerPrestige);
    return;
  }

  if (exemptionReason) {
    showToast(`${opponent.name} a accepté votre demande : ${exemptionReason}.`, 'info');
  }
  // --- Fin vérification prestige ---

  state.resources.coachingPoints -= intensity.cost;

  const myRating = averageRosterLevel(state.roster);
  const oppRating = averageRosterLevel(opponent.roster);
  const winProbability = clamp(0.5 + (myRating - oppRating) / 150, 0.15, 0.85);
  const win = Math.random() < winProbability;

  state.roster.forEach((p) => {
    p.fatigue = clamp(p.fatigue + intensity.fatigueGain, 0, 100);
  });

  const before = snapshotRosterStats();
  const summary = applyScrimObjective(plan, opponent, intensity, win);
  const after = snapshotRosterStats();
  const report = buildScrimReport(plan, opponent, win, before, after);

  state.scrims.history.unshift({
    id: plan.id,
    opponentTeamId: opponent.id,
    opponentName: opponent.name,
    objective: plan.objective,
    intensity: plan.intensity,
    win,
    summary,
    report
  });
  if (state.scrims.history.length > 20) state.scrims.history.length = 20;

  saveGame();
  updateResourceBar();
  renderTraining();
  showToast(win ? `Scrim gagne contre ${opponent.name} !` : `Scrim perdu contre ${opponent.name}.`, win ? 'success' : 'info');
  showScrimReportModal(report);
}

function applyScrimObjective(plan, opponent, intensity, win) {
  const resultFactor = (win ? 1.1 : 0.9) * getScrimTierMultiplier(opponent.tier || 3);

  switch (plan.objective) {
    case 'champion_mastery':
      return applyChampionMasteryGain(plan, intensity, resultFactor);
    case 'composition_test':
      return applyCompositionGain(plan, intensity, resultFactor);
    case 'matchup_prep':
      return applyMatchupPrepGain(plan, opponent, intensity, resultFactor);
    case 'macro_objectives':
      return applyMacroGain(plan, intensity, resultFactor);
    case 'free_scrim':
    default:
      return applyFreeScrimGain(intensity, win, getScrimTierMultiplier(opponent.tier || 3));
  }
}

function applyChampionMasteryGain(plan, intensity, resultFactor) {
  const player = state.roster.find((p) => p.id === plan.focusPlayerId);
  const champion = getChampionById(plan.focusChampionId);
  if (!player || !champion) return 'Ciblé d\'entraînement invalide.';

  if (!player.championPool.includes(champion.name)) {
    player.championPool.push(champion.name);
  }

  const entry = ensureChampionMasteryEntry(player.id, champion);
  const base = 8;
  const gain = Math.round(
    base * intensity.multiplier * potentialMultiplier(player) *
    diminishingReturns(entry.mastery) * fatiguePenaltyFactor(player) * resultFactor
  );

  entry.mastery = clamp(entry.mastery + gain, 0, 100);
  entry.xp += gain * 20;
  entry.confidence = clamp(entry.confidence + (resultFactor > 1 ? 3 : -2), 0, 100);
  entry.stageReady = entry.mastery >= 50;

  player.form = clamp(player.form + (resultFactor > 1 ? 2 : -1), 0, 100);
  if (resultFactor > 1) {
    player.mechanics = clamp(player.mechanics + 1, 0, 100);
  }

  return `${player.name} : maîtrise ${champion.name} +${gain} (-> ${entry.mastery})`;
}

function applyCompositionGain(plan, intensity, resultFactor) {
  const tags = plan.targetCompTags || [];
  if (tags.length === 0) return 'Aucun style de composition sélectionné.';

  let affected = 0;
  state.roster.forEach((player) => {
    player.championPool.forEach((champName) => {
      const champion = getChampionByName(champName);
      if (!champion || !champion.tags.some((t) => tags.includes(t))) return;

      const entry = ensureChampionMasteryEntry(player.id, champion);
      const gain = Math.round(
        4 * intensity.multiplier * potentialMultiplier(player) *
        diminishingReturns(entry.mastery) * fatiguePenaltyFactor(player) * resultFactor
      );
      entry.mastery = clamp(entry.mastery + gain, 0, 100);
      entry.xp += gain * 20;
      entry.stageReady = entry.mastery >= 50;
      affected++;
    });

    if (Math.random() < 0.3 * intensity.multiplier) {
      const statKey = ['JUNGLE', 'SUPPORT'].includes(player.role) ? 'shotcalling' : 'teamfight';
      player[statKey] = clamp(player[statKey] + 1, 0, 100);
    }
  });

  return `Composition ${tags.map((t) => COMP_TAG_LABELS[t]).join('/')} entrainee : ${affected} champion(s) progressent.`;
}

function applyMatchupPrepGain(plan, opponent, intensity, resultFactor) {
  if (!state.scouting[opponent.id]) {
    state.scouting[opponent.id] = { confidence: 0, scrimsPlayed: 0 };
  }
  const report = state.scouting[opponent.id];
  report.confidence = clamp(report.confidence + Math.round(15 * intensity.multiplier), 0, 100);
  report.scrimsPlayed = (report.scrimsPlayed || 0) + 1;

  let extra = '';
  const player = state.roster.find((p) => p.id === plan.focusPlayerId);
  if (player && player.championPool.length > 0) {
    const champion = getChampionByName(player.championPool[0]);
    if (champion) {
      const entry = ensureChampionMasteryEntry(player.id, champion);
      const gain = Math.round(
        3 * intensity.multiplier * diminishingReturns(entry.mastery) *
        fatiguePenaltyFactor(player) * resultFactor
      );
      entry.mastery = clamp(entry.mastery + gain, 0, 100);
      entry.stageReady = entry.mastery >= 50;
      extra = ` ${player.name} consolide ${champion.name} (+${gain}).`;
    }
    if (resultFactor > 1) {
      player.laning = clamp(player.laning + 1, 0, 100);
    }
  }

  return `Scouting ${opponent.name} : confiance ${report.confidence}/100.${extra}`;
}

function applyMacroGain(plan, intensity, resultFactor) {
  let total = 0;
  state.roster.forEach((player) => {
    const weight = ['JUNGLE', 'SUPPORT'].includes(player.role) ? 1.5 : 1;
    const gain = Math.round(weight * intensity.multiplier * potentialMultiplier(player) * fatiguePenaltyFactor(player) * resultFactor);
    if (gain > 0) {
      player.shotcalling = clamp(player.shotcalling + gain, 0, 100);
      total += gain;
    }
    player.mental = clamp(player.mental + (resultFactor > 1 ? 1 : 0), 0, 100);
  });
  return `Travail macro/objectifs : +${total} shotcalling cumule sur l'équipe.`;
}

function applyFreeScrimGain(intensity, win, tierMult) {
  const formDelta = Math.round((win ? 3 : -1) * intensity.multiplier * (tierMult || 1));
  state.roster.forEach((player) => {
    player.form = clamp(player.form + formDelta, 0, 100);
    player.mental = clamp(player.mental + (win ? 1 : 0), 0, 100);
  });
  return `Scrim libre ${win ? 'gagne' : 'perdu'} : forme d'équipe ${formDelta >= 0 ? '+' : ''}${formDelta}.`;
}

/* ------------------------------------------------------------
   Draft (CDC 6)
   ------------------------------------------------------------ */
const ROLE_NAMES = {
  TOP: 'Top', JUNGLE: 'Jungle', MID: 'Mid', ADC: 'ADC', SUPPORT: 'Support'
};

const DRAFT_ROLES = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'];

const DRAFT_TURN_SEQUENCE = [
  { type: 'ban', side: 'blue' }, { type: 'ban', side: 'red' },
  { type: 'ban', side: 'blue' }, { type: 'ban', side: 'red' },
  { type: 'ban', side: 'blue' }, { type: 'ban', side: 'red' },
  { type: 'pick', side: 'blue' }, { type: 'pick', side: 'red' }, { type: 'pick', side: 'red' },
  { type: 'pick', side: 'blue' }, { type: 'pick', side: 'blue' }, { type: 'pick', side: 'red' },
  { type: 'ban', side: 'red' }, { type: 'ban', side: 'blue' },
  { type: 'ban', side: 'red' }, { type: 'ban', side: 'blue' },
  { type: 'pick', side: 'red' }, { type: 'pick', side: 'blue' },
  { type: 'pick', side: 'blue' }, { type: 'pick', side: 'red' }
];

function startDraft(opponentTeamId, playerSide, mapSide) {
  const series = state.matchSeries;
  state.draft = {
    opponentTeamId,
    playerSide,
    mapSide: mapSide || playerSide,
    format: series ? series.format : 'BO1',
    fearlessMode: series ? series.fearlessMode : 'off',
    turnIndex: 0,
    blueBans: [],
    redBans: [],
    bluePicks: {},
    redPicks: {},
    blueFearlessLocked: [],
    redFearlessLocked: [],
    globalFearlessLocked: series ? series.globalFearlessLocked.slice() : [],
    log: [],
    status: 'in_progress',
    result: null
  };
  resolveAiTurnsUntilPlayer();
  saveGame();
  renderDraft();
}

function getOpponentTeam(draft) {
  return getTeamRef(draft.opponentTeamId);
}

function aiSide(draft) {
  return draft.playerSide === 'blue' ? 'red' : 'blue';
}

function isChampionTaken(draft, champName) {
  const fearlessActive = draft.fearlessMode === 'on' && Array.isArray(draft.globalFearlessLocked);
  return draft.blueBans.includes(champName) || draft.redBans.includes(champName) ||
    Object.values(draft.bluePicks).includes(champName) || Object.values(draft.redPicks).includes(champName) ||
    (fearlessActive && draft.globalFearlessLocked.includes(champName));
}

function emptyRoles(picks) {
  return DRAFT_ROLES.filter((role) => !picks[role]);
}

function currentTurn(draft) {
  return DRAFT_TURN_SEQUENCE[draft.turnIndex] || null;
}

function aiChooseBan(draft) {
  const opponent = getOpponentTeam(draft);
  const profile = opponent.draftProfile;
  const riskTolerance = profile ? profile.riskTolerance : 50;

  // Ban proactif : un champion que l'IA redoute pour son propre plan de draft
  const proactive = profile ? (profile.banPriorities || []).find((c) => !isChampionTaken(draft, c)) : null;

  // Ban reactif : le champion le plus maîtrise disponible cote joueur
  let reactive = null;
  state.roster.forEach((player) => {
    player.championPool.forEach((champName) => {
      if (isChampionTaken(draft, champName)) return;
      const mastery = (getChampionMastery(player.id, champName) || {}).mastery || 0;
      if (!reactive || mastery > reactive.mastery) reactive = { champName, mastery };
    });
  });

  if (proactive && reactive) {
    return Math.random() * 100 < riskTolerance ? proactive : reactive.champName;
  }
  if (proactive) return proactive;
  if (reactive) return reactive.champName;
  const fallback = CHAMPIONS.find((c) => !isChampionTaken(draft, c.name));
  return fallback ? fallback.name : null;
}

function aiChoosePick(draft) {
  const side = aiSide(draft);
  const picks = draft[side + 'Picks'];
  const roles = emptyRoles(picks);
  if (roles.length === 0) return null;
  const opponent = getOpponentTeam(draft);
  const profile = opponent.draftProfile;
  const role = roles[0];

  const fitsRole = (champName) => {
    const champion = getChampionByName(champName);
    return champion && (champion.role === role || champion.secondaryRoles.includes(role));
  };

  if (profile) {
    const comfort = ((profile.comfortPicks || {})[role] || []).find((c) => !isChampionTaken(draft, c) && fitsRole(c));
    if (comfort) return { role, champName: comfort };

    const flex = (profile.flexPicks || []).find((c) => !isChampionTaken(draft, c) && fitsRole(c));
    if (flex) return { role, champName: flex };
  }

  const aiPlayer = opponent.roster.find((p) => p.role === role);
  if (aiPlayer) {
    const champName = aiPlayer.championPool.find((c) => !isChampionTaken(draft, c));
    if (champName) return { role, champName };
  }
  const fallback = getChampionsForRole(role).find((c) => !isChampionTaken(draft, c.name));
  return fallback ? { role, champName: fallback.name } : null;
}

function resolveAiTurnsUntilPlayer() {
  const draft = state.draft;
  while (draft && draft.status !== 'done' && draft.turnIndex < DRAFT_TURN_SEQUENCE.length) {
    const turn = currentTurn(draft);
    if (turn.side === draft.playerSide) break;

    const sideLabel = turn.side === 'blue' ? 'Bleu' : 'Rouge';
    if (turn.type === 'ban') {
      const champName = aiChooseBan(draft);
      if (champName) {
        draft[turn.side + 'Bans'].push(champName);
        draft.log.push(`${sideLabel} (IA) bannit ${champName}.`);
      }
    } else {
      const pick = aiChoosePick(draft);
      if (pick) {
        draft[turn.side + 'Picks'][pick.role] = pick.champName;
        draft.log.push(`${sideLabel} (IA) sélectionné ${pick.champName} (${ROLE_NAMES[pick.role]}).`);
      }
    }
    draft.turnIndex++;
  }

  if (draft && draft.status !== 'done' && draft.turnIndex >= DRAFT_TURN_SEQUENCE.length) {
    finalizeDraft();
  }
}

function playerBan(champName) {
  const draft = state.draft;
  if (!draft || draft.status === 'done') return;
  const turn = currentTurn(draft);
  if (!turn || turn.type !== 'ban' || turn.side !== draft.playerSide) return;
  if (isChampionTaken(draft, champName)) return;

  draft[turn.side + 'Bans'].push(champName);
  draft.log.push(`Vous bannissez ${champName}.`);
  draft.turnIndex++;
  resolveAiTurnsUntilPlayer();
  saveGame();
  renderDraft();
}

function playerPick(role, champName) {
  const draft = state.draft;
  if (!draft || draft.status === 'done') return;
  const turn = currentTurn(draft);
  if (!turn || turn.type !== 'pick' || turn.side !== draft.playerSide) return;
  if (isChampionTaken(draft, champName)) return;

  const picks = draft[turn.side + 'Picks'];
  if (picks[role]) return;
  const champion = getChampionByName(champName);
  if (!champion || (champion.role !== role && !champion.secondaryRoles.includes(role))) return;

  picks[role] = champName;
  draft.log.push(`Vous selectionnez ${champName} (${ROLE_NAMES[role]}).`);
  draft.turnIndex++;
  resolveAiTurnsUntilPlayer();
  saveGame();
  renderDraft();
}

function finalizeDraft() {
  const draft = state.draft;
  draft.status = 'done';
  draft.result = computeDraftScore(draft);
  draft.log.push('Draft terminée.');

  if (state.matchSeries && state.matchSeries.fearlessMode === 'on') {
    const series = state.matchSeries;
    [...Object.values(draft.bluePicks), ...Object.values(draft.redPicks)].forEach((champName) => {
      if (champName && !series.globalFearlessLocked.includes(champName)) {
        series.globalFearlessLocked.push(champName);
      }
    });
  }
}

function computeDraftScore(draft) {
  const side = draft.playerSide;
  const enemySide = aiSide(draft);
  const myPicks = draft[side + 'Picks'];
  const enemyPicks = draft[enemySide + 'Picks'];
  const opponent = getOpponentTeam(draft);

  let teamComfortScore = 0;
  let riskPenalty = 0;
  const comfortDetails = [];
  state.roster.forEach((player) => {
    const champName = myPicks[player.role];
    if (!champName) return;
    const mastery = (getChampionMastery(player.id, champName) || {}).mastery || 0;
    teamComfortScore += Math.round(mastery / 5);
    if (mastery < 25) riskPenalty += 3;
    else if (mastery < 50) riskPenalty += 1;
    comfortDetails.push(`${player.name} sur ${champName} (maîtrise ${mastery}).`);
  });

  let matchupScore = 0;
  const matchupDetails = [];
  DRAFT_ROLES.forEach((role) => {
    const myChamp = getChampionByName(myPicks[role]);
    const enemyChamp = getChampionByName(enemyPicks[role]);
    if (!myChamp || !enemyChamp) return;
    // Source de vérité : le fichier de counters (même que l'écran Counters)
    const iCounter = getCounterEntry(myChamp.id, enemyChamp.id);     // je contre l'ennemi
    const theyCounter = getCounterEntry(enemyChamp.id, myChamp.id);  // l'ennemi me contre
    if (iCounter || theyCounter) {
      const fmtTags = (entry) => (entry.matchedTags || []).map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ');
      if (iCounter) {
        const suffix = fmtTags(iCounter) ? ` (${fmtTags(iCounter)})` : '';
        matchupScore += 3;
        matchupDetails.push(`${ROLE_NAMES[role]} : ${myChamp.name} contre ${enemyChamp.name}, matchup favorable${suffix}.`);
      }
      if (theyCounter) {
        const suffix = fmtTags(theyCounter) ? ` (${fmtTags(theyCounter)})` : '';
        matchupScore -= 3;
        matchupDetails.push(`${ROLE_NAMES[role]} : ${myChamp.name} contre ${enemyChamp.name}, matchup defavorable${suffix}.`);
      }
    } else {
      // Repli sur les tags (direction corrigée) : je contre l'ennemi si MES counterTags touchent SON profil
      if (enemyChamp.tags.some((t) => myChamp.counterTags.includes(t))) {
        matchupScore += 3;
        matchupDetails.push(`${ROLE_NAMES[role]} : ${myChamp.name} contre ${enemyChamp.name}, matchup favorable.`);
      }
      if (myChamp.tags.some((t) => enemyChamp.counterTags.includes(t))) {
        matchupScore -= 3;
        matchupDetails.push(`${ROLE_NAMES[role]} : ${myChamp.name} contre ${enemyChamp.name}, matchup defavorable.`);
      }
    }
  });

  const tagCounts = {};
  DRAFT_ROLES.forEach((role) => {
    const champ = getChampionByName(myPicks[role]);
    if (!champ) return;
    new Set([...champ.tags, ...champ.synergyTags]).forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  const synergyTags = Object.entries(tagCounts).filter(([, count]) => count >= 3).map(([tag]) => tag);
  const compositionScore = synergyTags.length * 2;

  const mapSideForBonus = draft.mapSide || side;
  const sideBonus = mapSideForBonus === 'blue' ? 2 : 3;

  const scouting = state.scouting[opponent.id];
  const scoutingBonus = scouting ? Math.round(scouting.confidence / 20) : 0;

  const total = teamComfortScore + matchupScore + compositionScore + sideBonus + scoutingBonus - riskPenalty;

  return {
    teamComfortScore, matchupScore, compositionScore, sideBonus, scoutingBonus, riskPenalty,
    total, comfortDetails, matchupDetails, synergyTags
  };
}

function getDraftSuggestion(draft) {
  const turn = currentTurn(draft);
  if (!turn || turn.side !== draft.playerSide) return null;

  if (turn.type === 'ban') {
    const opponent = getOpponentTeam(draft);
    const report = getScoutingReport(opponent.id);
    if (getScoutingTier(report.confidence) !== 'basic') {
      const target = (opponent.draftProfile && opponent.draftProfile.banPriorities || []).find((c) => !isChampionTaken(draft, c));
      if (target) {
        return `Suggestion (scouting) : ${opponent.shortName} compte sur ${target} dans son plan de draft, envisagez de le bannir.`;
      }
    }

    let best = null;
    state.roster.forEach((player) => {
      player.championPool.forEach((champName) => {
        if (isChampionTaken(draft, champName)) return;
        const mastery = (getChampionMastery(player.id, champName) || {}).mastery || 0;
        if (!best || mastery > best.mastery) best = { champName, mastery };
      });
    });
    if (best && best.mastery >= 50) {
      return `Suggestion : surveillez ${best.champName}, un champion fort qui pourrait revenir cote adverse.`;
    }
    return 'Suggestion : bannissez un champion cle de la composition adverse ou un contre-pick dangereux.';
  }

  const side = draft.playerSide;
  const myPicks = draft[side + 'Picks'];
  const roles = emptyRoles(myPicks);
  if (roles.length === 0) return null;

  let best = null;
  roles.forEach((role) => {
    const player = state.roster.find((p) => p.role === role);
    if (!player) return;
    player.championPool.forEach((champName) => {
      if (isChampionTaken(draft, champName)) return;
      const mastery = (getChampionMastery(player.id, champName) || {}).mastery || 0;
      if (!best || mastery > best.mastery) best = { role, champName, mastery, player };
    });
  });

  if (best) {
    let suggestion = `Suggestion : ${best.player.name} sur ${best.champName} (${ROLE_NAMES[best.role]}, maîtrise ${best.mastery}) pour un pick confort.`;
    const opponent = getOpponentTeam(draft);
    const report = getScoutingReport(opponent.id);
    if (getScoutingTier(report.confidence) === 'premium') {
      const weak = getTeamWeakestRole(opponent);
      if (weak && weak.role === best.role) {
        suggestion += ` Scouting premium : leur ${ROLE_NAMES[weak.role]} (${weak.player.name}) est leur point faible, exploitez cet avantage.`;
      }
    }
    return suggestion;
  }
  return `Suggestion : completez le role ${ROLE_NAMES[roles[0]]}, même avec un champion peu maîtrise pour l'instant.`;
}

function renderBansRow(draft, side) {
  const bans = draft[side + 'Bans'];
  const slots = [];
  for (let i = 0; i < 5; i++) slots.push(bans[i] || null);
  return slots.map((b) => `<div class="ban-slot ${b ? 'ban-slot--filled' : ''}">${b || '-'}</div>`).join('');
}

function renderPicksColumn(draft, side) {
  const picks = draft[side + 'Picks'];
  const roster = side === draft.playerSide ? state.roster : (getOpponentTeam(draft).roster || []);
  return DRAFT_ROLES.map((role) => {
    const champName = picks[role];
    const player = roster.find((p) => p.role === role);
    let masteryInfo = '';
    if (champName && side === draft.playerSide && player) {
      const mastery = (getChampionMastery(player.id, champName) || {}).mastery || 0;
      const tier = getMasteryTier(mastery);
      masteryInfo = `<span class="champion-chip champion-chip--${tier.id}">${mastery}</span>`;
    }
    return `
      <div class="draft-pick-slot ${champName ? 'draft-pick-slot--filled' : ''}">
        <span class="draft-pick-slot__role">${ROLE_NAMES[role]}</span>
        <span class="draft-pick-slot__champion">${champName || '—'}</span>
        ${masteryInfo}
      </div>
    `;
  }).join('');
}

/**
 * Pour un champion donne, renvoie le meilleur confort pick parmi mes joueurs
 * ({ mastery, tier, playerName }) ou null si aucun joueur ne le joue (mastery < 1).
 */
function getBestRosterComfort(champName) {
  let best = null;
  state.roster.forEach((p) => {
    const mastery = (getChampionMastery(p.id, champName) || {}).mastery || 0;
    if (mastery >= 1 && (!best || mastery > best.mastery)) {
      best = { mastery, playerName: p.name, role: p.role };
    }
  });
  if (!best) return null;
  best.tier = getMasteryTier(best.mastery);
  return best;
}

function renderChampionGrid(draft, mode, role, roleFilter, search) {
  let pool = CHAMPIONS;
  if (roleFilter && roleFilter !== 'ALL') pool = pool.filter(c => c.role === roleFilter || (c.secondaryRoles && c.secondaryRoles.includes(roleFilter)));
  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    pool = pool.filter(c => c.name.toLowerCase().includes(q));
  }
  const champions = [...pool].sort((a, b) => a.name.localeCompare(b.name, 'fr'));
  const player = role ? state.roster.find((p) => p.role === role) : null;
  return `
    <div class="draft-champion-grid">
      ${champions.map((c) => {
        const taken = isChampionTaken(draft, c.name);
        let masteryBadge = '';
        if (mode === 'pick' && player) {
          const mastery = (getChampionMastery(player.id, c.name) || {}).mastery || 0;
          const tier = getMasteryTier(mastery);
          masteryBadge = `<span class="champion-chip champion-chip--${tier.id}">${mastery}</span>`;
        }
        // Liséré de confort : champions qu'un de mes joueurs sait jouer (confort >= 1)
        const comfort = getBestRosterComfort(c.name);
        const comfortClass = comfort ? ` draft-champion-card--comfort draft-champion-card--comfort-${comfort.tier.id}` : '';
        const comfortTitle = comfort ? ` title="${comfort.playerName} (${comfort.role}) — ${comfort.tier.label} ${comfort.mastery}"` : '';
        return `
          <button class="draft-champion-card ${taken ? 'draft-champion-card--taken' : ''}${comfortClass}" data-champion="${c.name}"${comfortTitle} ${taken ? 'disabled' : ''}>
            <span class="draft-champion-card__name">${c.name}</span>
            <span class="draft-champion-card__role">${ROLE_NAMES[c.role] || c.role}</span>
            ${masteryBadge}
          </button>
        `;
      }).join('')}
    </div>
  `;
}

function renderDraft() {
  const el = document.getElementById('draft-content');
  if (!el) return;

  const draft = state.draft;
  if (!draft) {
    if (state.roster.length === 0) {
      el.innerHTML = '<div class="empty-state">Constituez votre roster avant de lancer une draft.</div>';
      return;
    }
    const opponents = getAITeamsForRegion(state.region).filter((t) => t.id !== state.aiTeamId);
    el.innerHTML = `
      <div class="panel">
        <h3 class="panel-title">Préparer une draft</h3>
        <div class="training-form">
          <div class="training-form__group">
            <label>ADVERSAIRE</label>
            <select id="draft-opponent">
              ${opponents.map((t) => `<option value="${t.id}">${t.name} (${t.shortName})</option>`).join('')}
            </select>
          </div>
          <div class="training-form__group">
            <label>VOTRE SIDE</label>
            <select id="draft-side">
              <option value="blue">Bleu (premier ban/pick)</option>
              <option value="red">Rouge (dernier pick)</option>
            </select>
          </div>
        </div>
        <div class="training-form__actions">
          <button class="btn-primary" id="btn-start-draft">Démarrer la draft</button>
        </div>
      </div>
    `;
    const startBtn = document.getElementById('btn-start-draft');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        const opponentId = document.getElementById('draft-opponent').value;
        const side = document.getElementById('draft-side').value;
        startDraft(opponentId, side);
      });
    }
    return;
  }

  const opponent = getOpponentTeam(draft);
  const turn = currentTurn(draft);
  const sideLabel = (s) => (s === 'blue' ? 'Bleu' : 'Rouge');
  const isPlayerTurn = draft.status !== 'done' && turn && turn.side === draft.playerSide;

  let actionHtml = '';
  if (draft.status === 'done') {
    const r = draft.result;
    actionHtml = `
      <div class="draft-score-panel">
        <h3 class="panel-title">Bilan de draft</h3>
        <div class="draft-score-row"><span>Confort champion</span><span>+${r.teamComfortScore}</span></div>
        <div class="draft-score-row"><span>Matchups</span><span>${r.matchupScore >= 0 ? '+' : ''}${r.matchupScore}</span></div>
        <div class="draft-score-row"><span>Composition (${r.synergyTags.length ? r.synergyTags.map((t) => COMP_TAG_LABELS[t] || t).join(', ') : 'aucune synergie forte'})</span><span>+${r.compositionScore}</span></div>
        <div class="draft-score-row"><span>Side (${sideLabel(draft.mapSide || draft.playerSide)})</span><span>+${r.sideBonus}</span></div>
        <div class="draft-score-row"><span>Scouting</span><span>+${r.scoutingBonus}</span></div>
        <div class="draft-score-row"><span>Risque</span><span>-${r.riskPenalty}</span></div>
        <div class="draft-score-row draft-score-row--total"><span>Score total</span><span>${r.total}</span></div>
        <div class="scrim-report">
          ${r.comfortDetails.map((d) => `<p>${d}</p>`).join('')}
          ${r.matchupDetails.map((d) => `<p>${d}</p>`).join('')}
        </div>
        <div class="training-form__actions">
          ${state.matchSeries
            ? '<button class="btn-primary" id="btn-launch-match">Lancer le match</button>'
            : '<button class="btn-secondary" id="btn-new-draft">Nouvelle draft</button>'}
        </div>
      </div>
    `;
  } else if (isPlayerTurn) {
    const suggestion = getDraftSuggestion(draft);
    const ROLE_FILTERS = [
      { id: 'ALL', label: 'Tous' },
      { id: 'TOP', label: 'Top' },
      { id: 'JUNGLE', label: 'Jungle' },
      { id: 'MID', label: 'Mid' },
      { id: 'ADC', label: 'ADC' },
      { id: 'SUPPORT', label: 'Support' }
    ];
    const searchVal = draft._champSearch || '';
    const searchHtml = `<input type="text" id="draft-search" class="draft-search-input" placeholder="Rechercher…" value="${searchVal.replace(/"/g, '&quot;')}" autocomplete="off">`;
    if (turn.type === 'ban') {
      const banFilter = draft._banRoleFilter || 'ALL';
      actionHtml = `
        <div class="draft-turn-banner">A vous : choisissez un ban (${sideLabel(turn.side)}).</div>
        ${suggestion ? `<div class="objective-description">${suggestion}</div>` : ''}
        <div class="draft-filter-row">
          <div class="draft-role-filter">
            ${ROLE_FILTERS.map(f => `<button class="comp-tag-option ${f.id === banFilter ? 'comp-tag-option--active' : ''}" data-ban-filter="${f.id}">${f.label}</button>`).join('')}
          </div>
          ${searchHtml}
        </div>
        ${renderChampionGrid(draft, 'ban', null, banFilter, searchVal)}
      `;
    } else {
      const roles = emptyRoles(draft[draft.playerSide + 'Picks']);
      const pickFilter = draft._pickRoleFilter || 'ALL';
      const activeRole = (pickFilter !== 'ALL' && roles.includes(pickFilter))
        ? pickFilter
        : (draft._pendingRole && roles.includes(draft._pendingRole) ? draft._pendingRole : roles[0]);
      actionHtml = `
        <div class="draft-turn-banner">A vous : choisissez un pick pour ${ROLE_NAMES[activeRole]} (${sideLabel(turn.side)}).</div>
        ${suggestion ? `<div class="objective-description">${suggestion}</div>` : ''}
        <div class="draft-filter-row">
          <div class="draft-role-filter">
            ${ROLE_FILTERS.map(f => `<button class="comp-tag-option ${f.id === pickFilter ? 'comp-tag-option--active' : ''}" data-pick-filter="${f.id}">${f.label}</button>`).join('')}
          </div>
          ${searchHtml}
        </div>
        ${renderChampionGrid(draft, 'pick', pickFilter !== 'ALL' ? pickFilter : activeRole, pickFilter, searchVal)}
      `;
    }
  } else {
    actionHtml = `<div class="draft-turn-banner">Tour de ${sideLabel(turn ? turn.side : '')} (IA)...</div>`;
  }

  const seriesLabel = state.matchSeries
    ? ` &mdash; ${state.matchSeries.format} Game ${state.matchSeries.gameNumber} (score ${state.matchSeries.scoreFor}-${state.matchSeries.scoreAgainst})`
    : '';

  el.innerHTML = `
    <div class="panel">
      <h3 class="panel-title">Draft vs ${opponent.name} &mdash; ${sideLabel(draft.mapSide || draft.playerSide)} / ${draft.playerSide === 'blue' ? 'First Pick' : 'Last Pick'}${seriesLabel}</h3>
      <div class="draft-bans">
        <div class="draft-bans__team">
          <span class="draft-bans__label">Bans First Pick</span>
          <div class="draft-bans__row">${renderBansRow(draft, 'blue')}</div>
        </div>
        <div class="draft-bans__team">
          <span class="draft-bans__label">Bans Last Pick</span>
          <div class="draft-bans__row">${renderBansRow(draft, 'red')}</div>
        </div>
      </div>
      <div class="draft-board">
        <div class="draft-team-column">
          <h4>First Pick ${draft.playerSide === 'blue' ? '(Vous)' : `(${opponent.shortName})`}</h4>
          ${renderPicksColumn(draft, 'blue')}
        </div>
        <div class="draft-team-column">
          <h4>Last Pick ${draft.playerSide === 'red' ? '(Vous)' : `(${opponent.shortName})`}</h4>
          ${renderPicksColumn(draft, 'red')}
        </div>
      </div>
      ${actionHtml}
    </div>
    <div class="panel">
      <h3 class="panel-title">Scouting ${opponent.shortName}</h3>
      ${buildScoutingReportBody(opponent)}
    </div>
    <div class="panel">
      <h3 class="panel-title">Journal de draft</h3>
      <div class="scrim-report">
        ${draft.log.length ? draft.log.slice().reverse().map((l) => `<p>${l}</p>`).join('') : '<p>Aucun événement.</p>'}
      </div>
    </div>
  `;

  document.querySelectorAll('.draft-champion-card:not([disabled])').forEach((btn) => {
    btn.addEventListener('click', () => {
      const champName = btn.dataset.champion;
      const currentDraft = state.draft;
      const currentTurnInfo = currentTurn(currentDraft);
      if (!currentTurnInfo) return;
      currentDraft._champSearch = '';
      if (currentTurnInfo.type === 'ban') {
        playerBan(champName);
      } else {
        const roles = emptyRoles(currentDraft[currentDraft.playerSide + 'Picks']);
        const pf = currentDraft._pickRoleFilter;
        const role = (pf && pf !== 'ALL' && roles.includes(pf))
          ? pf
          : (currentDraft._pendingRole && roles.includes(currentDraft._pendingRole) ? currentDraft._pendingRole : roles[0]);
        delete currentDraft._pendingRole;
        playerPick(role, champName);
      }
    });
  });

  document.querySelectorAll('.draft-role-filter [data-role]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.draft._pendingRole = btn.dataset.role;
      renderDraft();
    });
  });

  document.querySelectorAll('[data-ban-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.draft._banRoleFilter = btn.dataset.banFilter;
      renderDraft();
    });
  });

  document.querySelectorAll('[data-pick-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.draft._pickRoleFilter = btn.dataset.pickFilter;
      renderDraft();
    });
  });

  const searchInput = document.getElementById('draft-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const pos = searchInput.selectionStart;
      state.draft._champSearch = searchInput.value;
      renderDraft();
      const again = document.getElementById('draft-search');
      if (again) { again.focus(); again.setSelectionRange(pos, pos); }
    });
  }

  const newDraftBtn = document.getElementById('btn-new-draft');
  if (newDraftBtn) {
    newDraftBtn.addEventListener('click', () => {
      state.draft = null;
      saveGame();
      renderDraft();
    });
  }

  const launchMatchBtn = document.getElementById('btn-launch-match');
  if (launchMatchBtn) {
    launchMatchBtn.addEventListener('click', () => {
      startMatch(state.matchSeries.opponentTeamId);
      showView('match');
    });
  }
}

/* ------------------------------------------------------------
   Saison : calendrier, classement et playoffs (CDC 9.2-9.3, Étape 8)
   ------------------------------------------------------------ */
function getSeasonTeamIds() {
  const aiTeams = getAITeamsForRegion(state.region).filter((t) => t.id !== state.aiTeamId);
  return ['player', ...aiTeams.map((t) => t.id)];
}

function getTeamRef(teamId) {
  if (teamId === 'player') {
    return { id: 'player', name: state.teamName || 'Votre équipe', shortName: state.teamShortName || 'YOU', roster: state.roster, region: state.region };
  }
  const base = AI_TEAMS.find((t) => t.id === teamId);
  if (!base) return null;
  if (state.aiRosters && state.aiRosters[teamId]) {
    return Object.assign({}, base, { roster: state.aiRosters[teamId] });
  }
  return base;
}

function getTeamName(teamId) {
  const t = getTeamRef(teamId);
  return t ? t.name : teamId;
}

function getTeamShortName(teamId) {
  const t = getTeamRef(teamId);
  return t ? t.shortName : teamId;
}

function generateRoundRobin(teamIds) {
  const ids = teamIds.slice();
  if (ids.length % 2 !== 0) ids.push('BYE');
  const n = ids.length;
  const arr = ids.slice();
  const rounds = [];
  for (let r = 0; r < n - 1; r++) {
    const pairings = [];
    for (let i = 0; i < n / 2; i++) {
      const home = arr[i];
      const away = arr[n - 1 - i];
      if (home !== 'BYE' && away !== 'BYE') {
        pairings.push(r % 2 === 0 ? { home, away } : { home: away, away: home });
      }
    }
    rounds.push(pairings);
    const fixed = arr[0];
    const rest = arr.slice(1);
    rest.unshift(rest.pop());
    arr.splice(0, arr.length, fixed, ...rest);
  }
  return rounds;
}

function splitLabel(split) {
  return split === 'summer' ? 'Summer' : 'Spring';
}

function showSeasonIntroModal(split, year, teamIds) {
  const splitName = split === 'summer' ? 'Summer Split' : 'Spring Split';
  const intlEvent = split === 'summer' ? 'Worlds' : 'MSI';
  const totalMatchdays = teamIds.length - 1;
  // Nombre de places de la région du joueur pour l'événement international,
  // dérivé de la même source que la qualification réelle (évite tout écart).
  const eventType = split === 'summer' ? 'worlds' : 'msi';
  const playerRegion = REGIONS.find((r) => r.id === state.region);
  const playerAiRegion = playerRegion ? playerRegion.aiRegion : 'LEC';
  const regionSlots = getRegionRepCounts(eventType, playerAiRegion)[playerAiRegion] || 2;
  const qualifTiersHtml = `
    <li>Le <strong>champion des playoffs</strong>.</li>
    <li>Le <strong>finaliste</strong> (perdant de la grande finale).</li>
    ${regionSlots >= 3 ? `<li>Le <strong>meilleur demi-finaliste éliminé</strong>, départagé selon le classement de la saison reguliere (meilleur seed).</li>` : ''}`;
  const teamListHtml = teamIds.map((id, i) => {
    const t = getTeamRef(id);
    const name = t ? t.name : id;
    const isPlayer = id === 'player';
    return `<li style="${isPlayer ? 'color:var(--color-gold);font-weight:700;' : ''}">${i + 1}. ${name}${isPlayer ? ' (vous)' : ''}</li>`;
  }).join('');

  showModal(`
    <h2 class="panel-title" style="margin-bottom:16px;">&#127942; ${splitName} ${year} — Bienvenue !</h2>
    <div style="display:flex;flex-direction:column;gap:18px;max-height:65vh;overflow-y:auto;padding-right:6px;">
      <div>
        <h3 style="color:var(--color-gold);margin-bottom:6px;">&#128197; Saison reguliere</h3>
        <p style="color:var(--color-text-muted);line-height:1.6;">
          Vous affrontez <strong>${teamIds.length - 1} équipes</strong> en round-robin complet : chaque équipe joue contre toutes les autres une fois.
          Cela represente <strong>${totalMatchdays} journées</strong>. Chaque match se joue en <strong>BO3</strong>.
          Le classement est determine par le nombre de victoires, puis par le head-to-head, puis par la différence de nexus (gagnés - perdus), puis par la différence d'or.
        </p>
      </div>
      <div>
        <h3 style="color:var(--color-gold);margin-bottom:6px;">&#9876;&#65039; Playoffs</h3>
        <p style="color:var(--color-text-muted);line-height:1.6;">
          Les <strong>6 meilleures équipes</strong> se qualifient pour les playoffs.
          Les seeds 3-6 s'affrontent en quarts de finale (BO5), les vainqueurs rejoignent les seeds 1 et 2 en demi-finales (BO5).
          La grande finale se joue en <strong>BO5</strong>.
        </p>
      </div>
      <div>
        <h3 style="color:var(--color-gold);margin-bottom:6px;">&#127758; Qualification ${intlEvent}</h3>
        <p style="color:var(--color-text-muted);line-height:1.6;">
          Les <strong>${regionSlots} meilleures équipes</strong> de votre region se qualifient pour le <strong>${intlEvent}</strong>.
          Pour representer votre region sur la scene internationale, votre équipe doit faire partie de ces ${regionSlots} qualifiés à l'issue des playoffs :
        </p>
        <ul style="color:var(--color-text-muted);line-height:1.8;padding-left:18px;margin-top:6px;">
          ${qualifTiersHtml}
        </ul>
      </div>
      <div>
        <h3 style="color:var(--color-gold);margin-bottom:8px;">&#127942; Équipes participantes</h3>
        <ul style="list-style:none;padding:0;margin:0;display:grid;grid-template-columns:1fr 1fr;gap:4px 16px;font-size:13px;">
          ${teamListHtml}
        </ul>
      </div>
    </div>
    <div class="modal-content__actions" style="margin-top:20px;">
      <button class="btn-primary" onclick="closeModal();showView('calendar');">Lancer la saison !</button>
    </div>
  `);
}

function startSeason(split, year) {
  initAIRosters();
  split = split || 'spring';
  year = year || (state.season ? state.season.year : 1);
  const teamIds = getSeasonTeamIds();
  const standings = {};
  teamIds.forEach((id) => { standings[id] = { wins: 0, losses: 0, goldDiff: 0, nexusWon: 0, nexusLost: 0, h2h: {} }; });
  state.season = {
    year,
    split,
    region: state.region,
    teamIds,
    standings,
    schedule: generateRoundRobin(teamIds),
    matchday: 1,
    phase: 'regular',
    pendingMatch: null,
    playoffs: null,
    log: []
  };
  state.international = null;
  saveGame();
  showSeasonIntroModal(split, year, teamIds);
}

function getSortedStandings() {
  const season = state.season;
  return season.teamIds.slice().sort((a, b) => {
    const sa = season.standings[a];
    const sb = season.standings[b];
    if (sb.wins !== sa.wins) return sb.wins - sa.wins;
    if (sa.h2h[b] === 'W') return -1;
    if (sa.h2h[b] === 'L') return 1;
    const ndA = (sa.nexusWon || 0) - (sa.nexusLost || 0);
    const ndB = (sb.nexusWon || 0) - (sb.nexusLost || 0);
    if (ndB !== ndA) return ndB - ndA;
    return sb.goldDiff - sa.goldDiff;
  });
}

function getPlayerFixture(matchday) {
  const season = state.season;
  const pairings = season.schedule[matchday - 1] || [];
  return pairings.find((p) => p.home === 'player' || p.away === 'player') || null;
}

function simulateAIMatch(teamAId, teamBId) {
  const a = getTeamRef(teamAId);
  const b = getTeamRef(teamBId);
  const ratingA = averageRosterLevel(a.roster);
  const ratingB = averageRosterLevel(b.roster);
  const prob = clamp(0.5 + (ratingA - ratingB) / 150, 0.1, 0.9);
  const win = Math.random() < prob;
  // Échelle alignée sur le différentiel d'or réel d'une game jouée (~1k-7k)
  const goldDiff = randomInt(800, 7000);
  return {
    winner: win ? teamAId : teamBId,
    loser: win ? teamBId : teamAId,
    goldDiffForA: win ? goldDiff : -goldDiff
  };
}

function simulateAISeries(teamAId, teamBId, format) {
  const winsNeeded = format === 'BO5' ? 3 : (format === 'BO3' ? 2 : 1);
  let scoreA = 0;
  let scoreB = 0;
  let goldDiffForA = 0;
  while (scoreA < winsNeeded && scoreB < winsNeeded) {
    const res = simulateAIMatch(teamAId, teamBId);
    if (res.winner === teamAId) scoreA++; else scoreB++;
    goldDiffForA += res.goldDiffForA;
  }
  return {
    winner: scoreA > scoreB ? teamAId : teamBId,
    loser: scoreA > scoreB ? teamBId : teamAId,
    scoreA,
    scoreB,
    goldDiffForA
  };
}

function recordMatchResult(homeId, awayId, winnerId, goldDiffForHome, nexusForHome, nexusAgainstHome) {
  const st = state.season.standings;
  if (winnerId === homeId) {
    st[homeId].wins++;
    st[awayId].losses++;
    st[homeId].h2h[awayId] = 'W';
    st[awayId].h2h[homeId] = 'L';
  } else {
    st[awayId].wins++;
    st[homeId].losses++;
    st[awayId].h2h[homeId] = 'W';
    st[homeId].h2h[awayId] = 'L';
  }
  st[homeId].goldDiff += goldDiffForHome;
  st[awayId].goldDiff -= goldDiffForHome;
  if (nexusForHome != null && nexusAgainstHome != null) {
    st[homeId].nexusWon = (st[homeId].nexusWon || 0) + nexusForHome;
    st[homeId].nexusLost = (st[homeId].nexusLost || 0) + nexusAgainstHome;
    st[awayId].nexusWon = (st[awayId].nexusWon || 0) + nexusAgainstHome;
    st[awayId].nexusLost = (st[awayId].nexusLost || 0) + nexusForHome;
  }
}

function playoffRoundLabel(round) {
  return { qf: 'Quarts de finale', sf: 'Demi-finales', final: 'Finale' }[round] || round;
}

function winnerOf(m) {
  return m.result.winner;
}

function startPlayoffs() {
  const season = state.season;
  const ranked = getSortedStandings();
  const seeds = ranked.slice(0, 6);
  season.phase = 'playoffs';
  season.playoffs = {
    seeds,
    matches: {
      qf1: { home: seeds[2], away: seeds[5], format: 'BO5', result: null },
      qf2: { home: seeds[3], away: seeds[4], format: 'BO5', result: null },
      sf1: { home: seeds[0], away: null, format: 'BO5', result: null },
      sf2: { home: seeds[1], away: null, format: 'BO5', result: null },
      final: { home: null, away: null, format: 'BO5', result: null }
    },
    round: 'qf',
    champion: null
  };
  season.log.unshift(`Phase de playoffs ! Seeds : ${seeds.map((id, i) => `${i + 1}. ${getTeamShortName(id)}`).join(', ')}.`);
  const playerRank = ranked.indexOf('player') + 1;
  if (playerRank > 6) {
    season.log.unshift(`Vous terminez ${playerRank}e de la saison reguliere et n'etes pas qualifié pour les playoffs.`);
  }
  processPlayoffRound();
}

function advancePlayoffBracket() {
  const po = state.season.playoffs;
  if (po.round === 'qf') {
    po.matches.sf1.away = winnerOf(po.matches.qf2);
    po.matches.sf2.away = winnerOf(po.matches.qf1);
    po.round = 'sf';
  } else if (po.round === 'sf') {
    po.matches.final.home = winnerOf(po.matches.sf1);
    po.matches.final.away = winnerOf(po.matches.sf2);
    po.round = 'final';
  } else if (po.round === 'final') {
    po.champion = winnerOf(po.matches.final);
    po.round = 'done';
  }
}

function processPlayoffRound() {
  const season = state.season;
  const po = season.playoffs;
  if (po.round === 'done') {
    finishSeason();
    return;
  }

  const keys = po.round === 'qf' ? ['qf1', 'qf2'] : (po.round === 'sf' ? ['sf1', 'sf2'] : ['final']);

  for (const key of keys) {
    const m = po.matches[key];
    if (m.result) continue;
    if (m.home === 'player' || m.away === 'player') {
      const opponentId = m.home === 'player' ? m.away : m.home;
      season.pendingMatch = { type: 'playoff', matchKey: key, opponentTeamId: opponentId, format: m.format };
      saveGame();
      return;
    }
    const res = simulateAISeries(m.home, m.away, m.format);
    recordAIMatchResult(m.home, m.away, res.winner);
    m.result = { winner: res.winner, loser: res.loser, scoreA: res.scoreA, scoreB: res.scoreB };
    season.log.unshift(`Playoffs (${playoffRoundLabel(po.round)}) : ${getTeamName(res.winner)} éliminé ${getTeamName(res.loser)} (${res.scoreA}-${res.scoreB}).`);
  }

  advancePlayoffBracket();
  processPlayoffRound();
}

function getFinalPlacement() {
  const season = state.season;
  const ranked = getSortedStandings();
  const regularRank = ranked.indexOf('player') + 1;
  if (regularRank > 6) return regularRank;

  const po = season.playoffs;
  if (po.champion === 'player') return 1;
  if (po.matches.final.home === 'player' || po.matches.final.away === 'player') return 2;
  if (['sf1', 'sf2'].some((k) => po.matches[k].home === 'player' || po.matches[k].away === 'player')) return 3;
  return 5;
}

function getPlacementRewards(placement) {
  if (placement === 1) return { coaching: 120, budget: 160, prestige: 15 };
  if (placement === 2) return { coaching: 90,  budget: 125, prestige: 10 };
  if (placement <= 4) return { coaching: 70,  budget:  95, prestige: 6 };
  if (placement <= 6) return { coaching: 50,  budget:  65, prestige: 3 };
  if (placement <= 8) return { coaching: 25,  budget:  35, prestige: 1 };
  return { coaching: 10, budget: 15, prestige: 0 };
}

function placementLabel(placement) {
  if (placement === 1) return '1er - Champion !';
  if (placement === 2) return '2e - Finaliste';
  if (placement === 3) return '3e-4e - Demi-finaliste';
  if (placement === 5) return '5e-6e - Quart de finaliste';
  return `${placement}e de la saison reguliere`;
}

function finishSeason() {
  const season = state.season;
  season.phase = 'done';
  const placement = getFinalPlacement();
  const rewards = getPlacementRewards(placement);
  state.resources.coachingPoints += rewards.coaching;
  state.resources.budget += rewards.budget;
  state.resources.prestige += rewards.prestige;
  if (placement === 1) {
    state.progress.titlesEarned.push(`Champion ${splitLabel(season.split)} ${season.year} (${season.region})`);
    ensurePalmares().regionalTitles++;
  }
  season.log.unshift(`Fin de saison ! Classement final : ${placementLabel(placement)}. Récompenses : +${rewards.coaching} coaching, +${rewards.budget} budget, +${rewards.prestige} prestige.`);
  applyCareerProgression();
  applyAICareerProgression();
  saveGame();
}

/**
 * Progression de carriere (fin de saison) :
 * les joueurs sous leur potentiel progressent (rookies plus vite),
 * les joueurs au niveau de leur potentiel ou au-dela peuvent legerement
 * decliner (sauf veterans, plus resistants au declin).
 */
function applyCareerProgression() {
  const season = state.season;
  const entries = [];

  state.roster.forEach((player) => {
    const oldLevel = player.level;
    const diff = player.potential - player.level;
    const isRookie = (player.traits || []).includes('rookie');
    const isVeteran = (player.traits || []).includes('veteran');
    let delta = 0;

    if (diff > 0) {
      const base = isRookie ? randomInt(2, 4) : randomInt(1, 3);
      delta = Math.min(diff, base);
    } else {
      const declineChance = isVeteran ? 0.15 : 0.35;
      if (Math.random() < declineChance) delta = -1;
    }

    if (delta === 0) return;
    player.level = clamp(player.level + delta, 30, 99);
    entries.push({
      playerId: player.id,
      name: player.name,
      role: player.role,
      oldLevel,
      newLevel: player.level,
      delta
    });
  });

  state.lastCareerProgression = entries;
  applyCareerProgressionLogEntries(entries);
}

function applyCareerProgressionLogEntries(entries) {
  const season = state.season;
  entries.forEach((e) => {
    state.careerLog.unshift({
      year: season.year,
      split: season.split,
      playerId: e.playerId,
      name: e.name,
      role: e.role,
      oldLevel: e.oldLevel,
      newLevel: e.newLevel,
      delta: e.delta
    });
  });
  if (state.careerLog.length > 60) state.careerLog.length = 60;
}

function recordAIMatchResult(teamAId, teamBId, winnerId) {
  if (!state.aiMatchHistory) state.aiMatchHistory = {};
  const year = state.season ? state.season.year : (state.international ? state.international.year : 1);
  const split = state.season ? state.season.split : (state.international ? state.international.event : 'spring');
  [teamAId, teamBId].forEach((id) => {
    if (id === 'player') return;
    const team = getTeamRef(id);
    if (!team) return;
    if (!state.aiMatchHistory[id]) state.aiMatchHistory[id] = [];
    const mainChamps = team.roster.slice(0, 5).map((p) => p.championPool[0] || '?');
    state.aiMatchHistory[id].push({ opponent: id === teamAId ? teamBId : teamAId, win: winnerId === id, year, split, mainChamps });
    if (state.aiMatchHistory[id].length > 5) state.aiMatchHistory[id].shift();
  });
}

function initAIRosters() {
  if (!state.aiRosters) state.aiRosters = {};
  AI_TEAMS.forEach((t) => {
    if (!state.aiRosters[t.id]) {
      state.aiRosters[t.id] = JSON.parse(JSON.stringify(t.roster));
    }
  });
}

function applyAICareerProgression() {
  if (!state.aiRosters || Object.keys(state.aiRosters).length === 0) return;
  Object.keys(state.aiRosters).forEach((teamId) => {
    const roster = state.aiRosters[teamId];
    const baseTeam = AI_TEAMS.find((t) => t.id === teamId);
    roster.forEach((player, idx) => {
      const basePlayer = baseTeam && baseTeam.roster[idx];
      const potential = basePlayer ? basePlayer.potential : 80;
      const diff = potential - player.level;
      const isRookie = (player.traits || []).includes('rookie');
      const isVeteran = (player.traits || []).includes('veteran');
      let delta = 0;
      if (diff > 0) {
        delta = Math.min(diff, isRookie ? randomInt(2, 4) : randomInt(1, 3));
      } else {
        const declineChance = isVeteran ? 0.15 : 0.35;
        if (Math.random() < declineChance) delta = -1;
      }
      if (delta !== 0) player.level = clamp(player.level + delta, 30, 99);

      // v1.7.4 — Progression des maîtrises sur les champions signature (top 3),
      // pour que l'IA reste compétitive saison après saison. Plafond 100.
      // Rookies progressent un peu plus vite (+2 vs +1).
      if (Array.isArray(player.masteries) && player.masteries.length > 0) {
        const masteryGain = isRookie ? 2 : 1;
        const topIdx = player.masteries
          .map((m, i) => ({ m, i }))
          .sort((a, b) => b.m - a.m)
          .slice(0, 3)
          .map((x) => x.i);
        topIdx.forEach((i) => {
          player.masteries[i] = clamp(player.masteries[i] + masteryGain, 0, 100);
        });
      }
    });
  });
}

function careerProgressionHtml(entries) {
  if (!entries || entries.length === 0) {
    return `
      <div class="panel-subsection">
        <h4 class="panel-title">Evolution des joueurs</h4>
        <p class="card__count">Aucune evolution de niveau ce split.</p>
      </div>
    `;
  }

  const rows = entries.map((e) => {
    const sign = e.delta > 0 ? '+' : '';
    const cls = e.delta > 0 ? 'level-delta--up' : 'level-delta--down';
    const arrow = e.delta > 0 ? '&#9650;' : '&#9660;';
    return `
      <div class="career-progression-row">
        <span class="career-progression-row__name">${e.name} <span class="career-progression-row__role">${e.role}</span></span>
        <span class="career-progression-row__levels">${e.oldLevel} &rarr; ${e.newLevel}</span>
        <span class="level-delta ${cls}">${arrow} ${sign}${e.delta}</span>
      </div>
    `;
  }).join('');

  return `
    <div class="panel-subsection">
      <h4 class="panel-title">Evolution des joueurs</h4>
      <div class="career-progression-list">${rows}</div>
    </div>
  `;
}

/* ------------------------------------------------------------
   Competitions internationales : MSI et Worlds
   Après chaque split (Spring -> MSI, Summer -> Worlds), les meilleures
   équipes de chaque region s'affrontent en phase de groupes (BO3)
   puis en bracket a élimination directe (BO5, Fearless Draft).
   ------------------------------------------------------------ */
function eventLabel(intl) {
  return intl.event === 'worlds' ? 'Worlds' : 'MSI';
}

function teamPowerRating(teamId) {
  const t = getTeamRef(teamId);
  if (!t) return 0;
  return averageRosterLevel(t.roster) + (t.tier ? (6 - t.tier) : 0);
}

function getRegionRepCounts(eventType, playerAiRegion) {
  const allAiRegions = ['LEC', 'LCK', 'LPL', 'LTAN', 'LTAS', 'LCP', 'LJL'];
  const counts = {};
  if (eventType === 'msi') {
    allAiRegions.forEach((r) => { counts[r] = 1; });
    counts[playerAiRegion] += 1; // 6*1 + 2 = 8 équipes
  } else {
    allAiRegions.forEach((r) => { counts[r] = 2; });
    counts[playerAiRegion] += 1; // base 14 + 1 = 15
    const extra = playerAiRegion === 'LPL' ? 'LCK' : 'LPL';
    counts[extra] += 1; // + 1 = 16 équipes
  }
  return counts;
}

function getPlayoffQualifiers(count) {
  const po = state.season.playoffs;
  if (!po || !po.champion) return getSortedStandings().slice(0, count);
  const qualified = [];
  // 1er : champion des playoffs
  qualified.push(po.champion);
  // 2e : finaliste
  if (po.matches.final.result) {
    qualified.push(po.matches.final.result.loser);
  }
  // 3e (Worlds uniquement) : meilleur demi-finaliste éliminé selon seed saison régulière
  if (count >= 3) {
    const sf1Loser = po.matches.sf1.result ? po.matches.sf1.result.loser : null;
    const sf2Loser = po.matches.sf2.result ? po.matches.sf2.result.loser : null;
    const sfLosers = [sf1Loser, sf2Loser].filter((id) => id && !qualified.includes(id));
    sfLosers.sort((a, b) => po.seeds.indexOf(a) - po.seeds.indexOf(b));
    qualified.push(...sfLosers.slice(0, count - 2));
  }
  return qualified.slice(0, count);
}

function startInternational(eventType) {
  // Garde anti-double-appel (v1.7.8) : si un événement international est déjà
  // en cours, ne pas le relancer — cela réinitialiserait les groupes et
  // recompterait la qualification au palmarès (cause du bug "qualified" gonflé).
  // startSeason() remet state.international à null avant chaque nouvelle saison.
  if (state.international) {
    renderCalendar();
    return;
  }
  const season = state.season;
  const playerRegion = REGIONS.find((r) => r.id === state.region);
  const playerAiRegion = playerRegion ? playerRegion.aiRegion : 'LEC';
  const repCounts = getRegionRepCounts(eventType, playerAiRegion);

  let teams = [];
  Object.keys(repCounts).forEach((ar) => {
    const count = repCounts[ar];
    if (ar === playerAiRegion) {
      teams = teams.concat(getPlayoffQualifiers(count));
    } else {
      const regionTeams = AI_TEAMS.filter((t) => t.region === ar).slice().sort((a, b) => a.tier - b.tier);
      teams = teams.concat(regionTeams.slice(0, count).map((t) => t.id));
    }
  });

  // Palmarès : le joueur s'est qualifié pour cet événement international
  if (teams.includes('player')) {
    ensurePalmares()[eventType].qualified++;
  }

  const numGroups = eventType === 'msi' ? 2 : 4;
  const groups = Array.from({ length: numGroups }, () => []);

  // Repartir les équipes en s'assurant que deux équipes de même region ne sont pas dans le même groupe.
  // On trie par puissance decroissante puis on place chaque équipe dans le groupe le moins rempli
  // qui ne contient pas encore de representant de sa region.
  const getTeamAiRegion = (id) => {
    if (id === 'player') return playerAiRegion;
    const t = AI_TEAMS.find((t) => t.id === id);
    return t ? t.region : 'UNK';
  };
  const ranked = teams.slice().sort((a, b) => teamPowerRating(b) - teamPowerRating(a));
  for (const id of ranked) {
    const teamRegion = getTeamAiRegion(id);
    // Cherche le groupe eligible : pas encore de même region, et le moins plein
    const eligible = groups
      .map((g, i) => ({ i, size: g.length, hasRegion: g.some((tid) => getTeamAiRegion(tid) === teamRegion) }))
      .filter((g) => !g.hasRegion)
      .sort((a, b) => a.size - b.size);
    // Si aucun groupe eligible (trop d'équipes d'une même region), on prend le moins plein
    const target = eligible.length > 0 ? eligible[0].i : groups.reduce((mi, g, i) => g.length < groups[mi].length ? i : mi, 0);
    groups[target].push(id);
  }

  const groupSchedules = groups.map((g) => generateRoundRobin(g));
  const groupStandings = {};
  teams.forEach((id) => { groupStandings[id] = { wins: 0, losses: 0, goldDiff: 0, nexusWon: 0, nexusLost: 0 }; });

  state.international = {
    event: eventType,
    year: season.year,
    teams,
    groups,
    groupSchedules,
    groupStandings,
    groupMatchday: 1,
    totalGroupRounds: groups[0].length - 1,
    phase: 'groups',
    bracket: null,
    rewards: null,
    pendingMatch: null,
    log: [`${eventType === 'msi' ? 'MSI' : 'Worlds'} ${season.year} : phase de groupes (${groups.length} groupes de ${groups[0].length}).`]
  };
  saveGame();
  showInternationalIntroModal(eventType, season.year, teams, groups);
}

function showInternationalIntroModal(eventType, year, teams, groups) {
  const isMSI = eventType === 'msi';
  const eventName = isMSI ? 'MSI' : 'Worlds';
  const emoji = isMSI ? '&#127775;' : '&#127758;';
  const numGroups = groups.length;
  const teamsPerGroup = groups[0].length;
  const qualifiersPerGroup = isMSI ? 2 : 2;

  const groupsHtml = groups.map((g, gi) => {
    const rows = g.map((id) => {
      const t = getTeamRef(id);
      const name = t ? t.name : id;
      const region = t ? (t.region || t.aiRegion || '') : '';
      const isPlayer = id === 'player';
      return `<li style="${isPlayer ? 'color:var(--color-gold);font-weight:700;' : 'color:var(--color-text-muted);'};font-size:13px;">${name}${region ? ` <span style="opacity:0.5;">(${region})</span>` : ''}${isPlayer ? ' &#9733;' : ''}</li>`;
    }).join('');
    return `
      <div>
        <div style="font-weight:700;color:var(--color-seafoam);margin-bottom:4px;">Groupe ${String.fromCharCode(65 + gi)}</div>
        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:2px;">${rows}</ul>
      </div>`;
  }).join('');

  const teamCount = teams.length;
  const playerQualified = teams.includes('player');
  const qualifMsg = playerQualified
    ? `<p style="color:var(--color-gold);font-weight:700;margin-top:4px;">&#10003; Vous etes qualifié pour le ${eventName} !</p>`
    : `<p style="color:#e05;margin-top:4px;">&#10007; Votre équipe n'est pas qualifiée pour cette edition.</p>`;

  showModal(`
    <h2 class="panel-title" style="margin-bottom:16px;">${emoji} ${eventName} ${year}</h2>
    <div style="display:flex;flex-direction:column;gap:18px;max-height:65vh;overflow-y:auto;padding-right:6px;">
      ${qualifMsg}
      <div>
        <h3 style="color:var(--color-gold);margin-bottom:6px;">&#127942; Format de la compétition</h3>
        <p style="color:var(--color-text-muted);line-height:1.6;">
          <strong>${teamCount} équipes</strong> issues de toutes les regions du monde s'affrontent.
          La compétition se déroule en deux phases :
        </p>
        <ul style="color:var(--color-text-muted);line-height:1.8;padding-left:18px;margin-top:6px;">
          <li><strong>Phase de groupes</strong> — ${numGroups} groupes de ${teamsPerGroup} équipes, round-robin en BO3. Les ${qualifiersPerGroup} premiers de chaque groupe passent en bracket.</li>
          <li><strong>Bracket a élimination directe</strong> — ${isMSI ? 'Demi-finales et finale en BO5.' : 'Quarts de finale, demi-finales et grande finale, tous en BO5.'}</li>
        </ul>
      </div>
      <div>
        <h3 style="color:var(--color-gold);margin-bottom:10px;">&#127937; Équipes qualifiées par groupe</h3>
        <div style="display:grid;grid-template-columns:repeat(${Math.min(numGroups, 2)}, 1fr);gap:14px;">
          ${groupsHtml}
        </div>
      </div>
    </div>
    <div class="modal-content__actions" style="margin-top:20px;">
      <button class="btn-primary" onclick="closeModal();processInternationalGroupMatchday();showView('calendar');">C'est parti !</button>
    </div>
  `);
}

function recordInternationalResult(intl, homeId, awayId, winnerId, goldDiffForHome, nexusForHome, nexusAgainstHome) {
  const st = intl.groupStandings;
  if (winnerId === homeId) {
    st[homeId].wins++;
    st[awayId].losses++;
  } else {
    st[awayId].wins++;
    st[homeId].losses++;
  }
  st[homeId].goldDiff += goldDiffForHome;
  st[awayId].goldDiff -= goldDiffForHome;
  if (nexusForHome != null && nexusAgainstHome != null) {
    st[homeId].nexusWon = (st[homeId].nexusWon || 0) + nexusForHome;
    st[homeId].nexusLost = (st[homeId].nexusLost || 0) + nexusAgainstHome;
    st[awayId].nexusWon = (st[awayId].nexusWon || 0) + nexusAgainstHome;
    st[awayId].nexusLost = (st[awayId].nexusLost || 0) + nexusForHome;
  }
}

function sortGroupStandings(group, standings) {
  return group.slice().sort((a, b) => {
    const sa = standings[a];
    const sb = standings[b];
    if (sb.wins !== sa.wins) return sb.wins - sa.wins;
    const ndA = (sa.nexusWon || 0) - (sa.nexusLost || 0);
    const ndB = (sb.nexusWon || 0) - (sb.nexusLost || 0);
    if (ndB !== ndA) return ndB - ndA;
    return sb.goldDiff - sa.goldDiff;
  });
}

function processInternationalGroupMatchday(startGroup, startPairing) {
  const intl = state.international;
  const gStart = startGroup || 0;
  for (let g = gStart; g < intl.groups.length; g++) {
    const rounds = intl.groupSchedules[g];
    const pairings = rounds[intl.groupMatchday - 1] || [];
    const pStart = (g === gStart) ? (startPairing || 0) : 0;
    for (let pi = pStart; pi < pairings.length; pi++) {
      const p = pairings[pi];
      if (p.home === 'player' || p.away === 'player') {
        const opponentId = p.home === 'player' ? p.away : p.home;
        intl.pendingMatch = { type: 'group', groupIndex: g, pairingIndex: pi, opponentTeamId: opponentId, isHome: p.home === 'player', started: false };
        saveGame();
        return;
      }
      const res = simulateAISeries(p.home, p.away, 'BO3');
      recordAIMatchResult(p.home, p.away, res.winner);
      recordInternationalResult(intl, p.home, p.away, res.winner, res.goldDiffForA, res.scoreA, res.scoreB);
    }
  }
  intl.log.unshift(`${eventLabel(intl)} : journée ${intl.groupMatchday}/${intl.totalGroupRounds} de phase de groupes terminée.`);
  intl.groupMatchday++;
  if (intl.groupMatchday > intl.totalGroupRounds) {
    finishGroupStage();
    return;
  }
  processInternationalGroupMatchday();
}

function buildInternationalBracket(seeds) {
  const matches = {};
  if (seeds.length === 4) {
    matches.sf1 = { home: seeds[0], away: seeds[3], format: 'BO5', result: null };
    matches.sf2 = { home: seeds[1], away: seeds[2], format: 'BO5', result: null };
    matches.final = { home: null, away: null, format: 'BO5', result: null };
    return { matches, round: 'sf' };
  }
  matches.qf1 = { home: seeds[0], away: seeds[7], format: 'BO5', result: null };
  matches.qf2 = { home: seeds[3], away: seeds[4], format: 'BO5', result: null };
  matches.qf3 = { home: seeds[2], away: seeds[5], format: 'BO5', result: null };
  matches.qf4 = { home: seeds[1], away: seeds[6], format: 'BO5', result: null };
  matches.sf1 = { home: null, away: null, format: 'BO5', result: null };
  matches.sf2 = { home: null, away: null, format: 'BO5', result: null };
  matches.final = { home: null, away: null, format: 'BO5', result: null };
  return { matches, round: 'qf' };
}

function finishGroupStage() {
  const intl = state.international;
  const winners = [];
  const runnersup = [];
  intl.groups.forEach((group, idx) => {
    const ranked = sortGroupStandings(group, intl.groupStandings);
    winners.push(ranked[0]);
    runnersup.push(ranked[1]);
    intl.log.unshift(`Groupe ${String.fromCharCode(65 + idx)} : 1. ${getTeamShortName(ranked[0])}, 2. ${getTeamShortName(ranked[1])} qualifiés.`);
  });
  const seedsOrdered = winners.concat(runnersup);
  const built = buildInternationalBracket(seedsOrdered);
  intl.bracket = { seeds: seedsOrdered, matches: built.matches, round: built.round, champion: null };
  intl.phase = 'bracket';
  processInternationalBracketRound();
}

function advanceInternationalBracket(bracket) {
  const m = bracket.matches;
  if (bracket.round === 'qf') {
    m.sf1.home = winnerOf(m.qf1);
    m.sf1.away = winnerOf(m.qf4);
    m.sf2.home = winnerOf(m.qf2);
    m.sf2.away = winnerOf(m.qf3);
    bracket.round = 'sf';
  } else if (bracket.round === 'sf') {
    m.final.home = winnerOf(m.sf1);
    m.final.away = winnerOf(m.sf2);
    bracket.round = 'final';
  } else if (bracket.round === 'final') {
    bracket.champion = winnerOf(m.final);
    bracket.round = 'done';
  }
}

function internationalRoundLabel(round) {
  return { qf: 'Quarts de finale', sf: 'Demi-finales', final: 'Finale' }[round] || round;
}

function internationalRoundLabelFromKey(key) {
  return { qf1: 'Quart 1', qf2: 'Quart 2', qf3: 'Quart 3', qf4: 'Quart 4', sf1: 'Demi 1', sf2: 'Demi 2', final: 'Finale' }[key] || key;
}

function processInternationalBracketRound() {
  const intl = state.international;
  const bracket = intl.bracket;
  if (bracket.round === 'done') {
    finishInternational();
    return;
  }

  const keys = bracket.round === 'qf' ? ['qf1', 'qf2', 'qf3', 'qf4'] : (bracket.round === 'sf' ? ['sf1', 'sf2'] : ['final']);

  for (const key of keys) {
    const m = bracket.matches[key];
    if (m.result) continue;
    if (m.home === 'player' || m.away === 'player') {
      const opponentId = m.home === 'player' ? m.away : m.home;
      intl.pendingMatch = { type: 'bracket', matchKey: key, opponentTeamId: opponentId, format: m.format, started: false };
      saveGame();
      return;
    }
    const res = simulateAISeries(m.home, m.away, m.format);
    recordAIMatchResult(m.home, m.away, res.winner);
    m.result = { winner: res.winner, loser: res.loser, scoreA: res.scoreA, scoreB: res.scoreB };
    intl.log.unshift(`${eventLabel(intl)} (${internationalRoundLabel(bracket.round)}) : ${getTeamName(res.winner)} éliminé ${getTeamName(res.loser)} (${res.scoreA}-${res.scoreB}).`);
  }

  advanceInternationalBracket(bracket);
  processInternationalBracketRound();
}

function getInternationalPlacement(intl) {
  if (!intl.teams.includes('player')) return null;
  if (!intl.bracket || !intl.bracket.seeds.includes('player')) return 9;
  const b = intl.bracket;
  if (b.champion === 'player') return 1;
  const f = b.matches.final;
  if (f.home === 'player' || f.away === 'player') return 2;
  if (['sf1', 'sf2'].some((k) => b.matches[k] && (b.matches[k].home === 'player' || b.matches[k].away === 'player'))) return 3;
  return 5;
}

function getInternationalRewards(event, placement) {
  const mult = event === 'worlds' ? 1.5 : 1.25;
  const base = getPlacementRewards(placement);
  return {
    coaching: Math.round(base.coaching * mult),
    budget: Math.round(base.budget * mult),
    prestige: Math.round(base.prestige * mult) + (event === 'worlds' ? 2 : 1)
  };
}

function finishInternational() {
  const intl = state.international;
  intl.phase = 'done';
  const placement = getInternationalPlacement(intl);
  if (placement !== null) {
    const rewards = getInternationalRewards(intl.event, placement);
    state.resources.coachingPoints += rewards.coaching;
    state.resources.budget += rewards.budget;
    state.resources.prestige += rewards.prestige;
    intl.rewards = rewards;
    const pal = ensurePalmares()[intl.event];
    if (pal.bestPlacement === null || placement < pal.bestPlacement) pal.bestPlacement = placement;
    if (placement === 1) {
      state.progress.titlesEarned.push(`Champion ${eventLabel(intl)} ${intl.year}`);
      pal.titles++;
    }
    intl.log.unshift(`${eventLabel(intl)} terminé ! Classement : ${placement === 1 ? 'Champion !' : placement + 'e'}. Récompenses : +${rewards.coaching} coaching, +${rewards.budget} budget, +${rewards.prestige} prestige.`);
  } else {
    intl.log.unshift(`${eventLabel(intl)} ${intl.year} terminé. Champion : ${getTeamName(intl.bracket.champion)}.`);
  }
  state.mercatoOpen = true; // ouverture du mercato : prolongations possibles jusqu'au 1er match du prochain split
  saveGame();
}

function proceedAfterInternational() {
  const intl = state.international;
  const season = state.season;
  if (intl.event === 'msi') {
    startSeason('summer', season.year);
    return;
  }
  // Worlds terminé : traiter les fins de contrat avant la nouvelle saison.
  const completedYear = season.year;
  const nextYear = season.year + 1;
  const leaving = processContractExpirations(completedYear);
  if (leaving.length) {
    showContractDeparturesModal(leaving, () => startSeason('spring', nextYear));
  } else {
    startSeason('spring', nextYear);
  }
}

// Annonce les joueurs partis en fin de contrat, puis enchaîne sur la nouvelle saison.
function showContractDeparturesModal(leaving, onContinue) {
  const rows = leaving.map((p) => `
    <div class="transfer-card__header" style="margin-bottom:8px;">
      <div class="mini-avatar">${getInitials(p.name)}</div>
      <div class="transfer-card__identity">
        <div class="transfer-card__name">${p.name}</div>
        <div class="transfer-card__meta">${p.role} &mdash; fin de contrat</div>
      </div>
    </div>
  `).join('');
  showModal(`
    <h3 class="panel-title">&#128203; Fins de contrat</h3>
    <p style="margin-bottom:12px;">Faute de prolongation, ${leaving.length === 1 ? 'ce joueur quitte' : 'ces joueurs quittent'} l'équipe. Recrutez ${leaving.length === 1 ? 'un remplaçant' : 'des remplaçants'} au marché des transferts.</p>
    <div class="transfer-release-list">${rows}</div>
    <div class="modal-content__actions" style="margin-top:16px;">
      <button class="btn-primary" id="btn-departures-continue">Continuer</button>
    </div>
  `);
  document.getElementById('btn-departures-continue').addEventListener('click', () => {
    closeModal();
    if (typeof onContinue === 'function') onContinue();
  });
}

function resolveInternationalSeries(rt) {
  const intl = state.international;
  const pm = intl.pendingMatch;
  const won = rt.seriesEvent.won;
  const scoreFor = rt.seriesEvent.scoreFor;
  const scoreAgainst = rt.seriesEvent.scoreAgainst;

  if (pm.type === 'group') {
    const goldDiff = rt.seriesEvent.goldDiffTotal != null
      ? rt.seriesEvent.goldDiffTotal
      : (scoreFor - scoreAgainst) * randomInt(600, 1400);
    const winnerId = won ? 'player' : pm.opponentTeamId;
    recordInternationalResult(intl, 'player', pm.opponentTeamId, winnerId, goldDiff, scoreFor, scoreAgainst);
    intl.log.unshift(`${eventLabel(intl)} (Phase de groupes) : ${won ? 'Victoire' : 'Défaite'} ${scoreFor}-${scoreAgainst} contre ${getTeamName(pm.opponentTeamId)}.`);
    const finishedGroup = pm.groupIndex;
    const finishedPairing = pm.pairingIndex || 0;
    intl.pendingMatch = null;
    processInternationalGroupMatchday(finishedGroup, finishedPairing + 1);
  } else if (pm.type === 'bracket') {
    const bracket = intl.bracket;
    const m = bracket.matches[pm.matchKey];
    m.result = {
      winner: won ? 'player' : pm.opponentTeamId,
      loser: won ? pm.opponentTeamId : 'player',
      scoreA: scoreFor,
      scoreB: scoreAgainst
    };
    intl.log.unshift(`${eventLabel(intl)} (${internationalRoundLabel(bracket.round)}) : ${won ? 'Victoire' : 'Défaite'} ${scoreFor}-${scoreAgainst} contre ${getTeamName(pm.opponentTeamId)}.`);
    intl.pendingMatch = null;
    processInternationalBracketRound();
  }

  rt.seriesEvent.returnToCalendar = true;
  saveGame();
}

function resolveSeasonSeries(rt) {
  const season = state.season;
  const pm = season.pendingMatch;
  const won = rt.seriesEvent.won;
  const scoreFor = rt.seriesEvent.scoreFor;
  const scoreAgainst = rt.seriesEvent.scoreAgainst;

  if (pm.type === 'regular') {
    const opponentId = pm.opponentTeamId;
    const goldDiff = rt.seriesEvent.goldDiffTotal != null
      ? rt.seriesEvent.goldDiffTotal
      : (scoreFor - scoreAgainst) * randomInt(600, 1400);
    recordMatchResult('player', opponentId, won ? 'player' : opponentId, goldDiff, scoreFor, scoreAgainst);
    season.log.unshift(`J${season.matchday} : ${won ? 'Victoire' : 'Défaite'} ${scoreFor}-${scoreAgainst} contre ${getTeamName(opponentId)}.`);

    const pairings = season.schedule[season.matchday - 1] || [];
    pairings.forEach((p) => {
      if (p.home === 'player' || p.away === 'player') return;
      const res = simulateAISeries(p.home, p.away, 'BO3');
      recordAIMatchResult(p.home, p.away, res.winner);
      recordMatchResult(p.home, p.away, res.winner, res.goldDiffForA, res.scoreA, res.scoreB);
      season.log.unshift(`J${season.matchday} : ${getTeamName(res.winner)} bat ${getTeamName(res.loser)} (${res.scoreA}-${res.scoreB}).`);
    });

    season.pendingMatch = null;
    season.matchday++;
    if (season.matchday > season.schedule.length) {
      startPlayoffs();
    }
  } else if (pm.type === 'playoff') {
    const po = season.playoffs;
    const m = po.matches[pm.matchKey];
    m.result = {
      winner: won ? 'player' : pm.opponentTeamId,
      loser: won ? pm.opponentTeamId : 'player',
      scoreA: scoreFor,
      scoreB: scoreAgainst
    };
    season.log.unshift(`Playoffs (${playoffRoundLabel(po.round)}) : ${won ? 'Victoire' : 'Défaite'} ${scoreFor}-${scoreAgainst} contre ${getTeamName(pm.opponentTeamId)}.`);
    season.pendingMatch = null;
    processPlayoffRound();
  }

  rt.seriesEvent.returnToCalendar = true;
  saveGame();
}

function renderCalendar() {
  const el = document.getElementById('calendar-content');
  if (!el) return;

  if (!state.season) {
    el.innerHTML = `
      <div class="empty-state">La saison n'a pas encore commencé.</div>
      <div class="training-form__actions">
        <button class="btn-primary" id="btn-start-season">Démarrer la saison</button>
      </div>
    `;
    const startBtn = document.getElementById('btn-start-season');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        startSeason('spring', 1);
        renderCalendar();
      });
    }
    return;
  }

  if (state.international) {
    renderInternationalCalendar(el, state.international);
    return;
  }

  const season = state.season;
  if (season.phase === 'regular') {
    renderRegularSeasonCalendar(el, season);
  } else if (season.phase === 'playoffs') {
    renderPlayoffsCalendar(el, season);
  } else {
    renderSeasonRecap(el, season);
  }
}

function renderRegularSeasonCalendar(el, season) {
  const totalMatchdays = season.schedule.length;
  const ranked = getSortedStandings();
  const fixture = getPlayerFixture(season.matchday);

  const standingsRows = ranked.map((id, i) => {
    const s = season.standings[id];
    const isPlayer = id === 'player';
    return `
      <tr class="${isPlayer ? 'standings-row--player' : ''}">
        <td>${i + 1}</td>
        <td>${getTeamShortName(id)}</td>
        <td>${s.wins}</td>
        <td>${s.losses}</td>
        <td>${s.nexusWon || 0}-${s.nexusLost || 0}</td>
      </tr>
    `;
  }).join('');

  let fixtureLabel;
  if (fixture) {
    const opponentId = fixture.home === 'player' ? fixture.away : fixture.home;
    fixtureLabel = `Journée ${season.matchday}/${totalMatchdays} : ${getTeamName('player')} vs ${getTeamName(opponentId)} (BO3)`;
  } else {
    fixtureLabel = `Journée ${season.matchday}/${totalMatchdays} : pas de match pour votre équipe (journée de repos)`;
  }

  let actionLabel;
  let actionType;
  if (season.pendingMatch) {
    actionLabel = 'Continuer le match en cours';
    actionType = 'resume';
  } else if (fixture) {
    actionLabel = 'Jouer la journée';
    actionType = 'play';
  } else {
    actionLabel = 'Simuler la journée';
    actionType = 'simulate';
  }

  const logHtml = season.log.slice(0, 8).map((l) => `<div class="result-chip">${l}</div>`).join('');

  el.innerHTML = `
    <h3 class="panel-title">${splitLabel(season.split)} ${season.year} - ${season.region} - Saison reguliere</h3>
    <p class="card__count">${fixtureLabel}</p>
    <div class="training-form__actions">
      <button class="btn-primary" id="btn-calendar-action">${actionLabel}</button>
    </div>
    <h3 class="panel-title">Classement</h3>
    <table class="history-table">
      <thead><tr><th>#</th><th>Équipe</th><th>V</th><th>D</th><th title="Nexus gagnés - Nexus perdus">Nexus</th></tr></thead>
      <tbody>${standingsRows}</tbody>
    </table>
    <h3 class="panel-title">Derniers résultats</h3>
    <div class="recent-results">${logHtml || '<p class="card__count">Aucun résultat pour le moment.</p>'}</div>
  `;

  const actionBtn = document.getElementById('btn-calendar-action');
  if (actionBtn) {
    actionBtn.addEventListener('click', () => {
      if (actionType === 'resume') {
        showView('match');
      } else if (actionType === 'play') {
        const opponentId = fixture.home === 'player' ? fixture.away : fixture.home;
        season.pendingMatch = { type: 'regular', opponentTeamId: opponentId };
        state.mercatoOpen = false; // le split démarre : fermeture du mercato
        saveGame();
        startMatchSeries(opponentId, 'BO3', 'on', `${splitLabel(season.split)} ${season.year} - ${season.region}`);
      } else {
        state.mercatoOpen = false; // le split démarre : fermeture du mercato
        const pairings = season.schedule[season.matchday - 1] || [];
        pairings.forEach((p) => {
          if (p.home === 'player' || p.away === 'player') return;
          const res = simulateAISeries(p.home, p.away, 'BO3');
          recordAIMatchResult(p.home, p.away, res.winner);
          recordMatchResult(p.home, p.away, res.winner, res.goldDiffForA, res.scoreA, res.scoreB);
          season.log.unshift(`J${season.matchday} : ${getTeamName(res.winner)} bat ${getTeamName(res.loser)} (${res.scoreA}-${res.scoreB}).`);
        });
        season.matchday++;
        if (season.matchday > totalMatchdays) startPlayoffs();
        saveGame();
        renderCalendar();
      }
    });
  }
}

/* ── Arbre de phase finale v1.5.1 ─────────────────────── */
function poBracketCard(poId, label, m, seedA, seedB, isUpcoming, isFinal) {
  const teamA = m ? m.home : null;
  const teamB = m ? m.away : null;
  const result = m ? m.result : null;
  const isDone = !!result;
  const aName = teamA ? getTeamShortName(teamA) : 'TBD';
  const bName = teamB ? getTeamShortName(teamB) : 'TBD';
  const aWins = isDone && result.winner === teamA;
  const bWins = isDone && result.winner === teamB;
  // v1.7.6 — scoreA/scoreB sont stockés selon des conventions différentes
  // (home/away pour l'IA, joueur/adversaire pour le joueur). Invariant fiable :
  // dans une série, le gagnant a toujours plus de manches que le perdant.
  const winScore = isDone ? Math.max(result.scoreA, result.scoreB) : '';
  const loseScore = isDone ? Math.min(result.scoreA, result.scoreB) : '';
  const aScore = isDone ? (aWins ? winScore : loseScore) : '';
  const bScore = isDone ? (bWins ? winScore : loseScore) : '';
  const aSt = isDone ? (aWins ? 'winner' : 'loser') : '';
  const bSt = isDone ? (bWins ? 'winner' : 'loser') : '';
  const aScCl = isDone ? (aWins ? 'win' : 'loss') : '';
  const bScCl = isDone ? (bWins ? 'win' : 'loss') : '';
  const sA = seedA !== null ? `<span class="po-card__seed">${seedA}</span>` : '';
  const sB = seedB !== null ? `<span class="po-card__seed">${seedB}</span>` : '';
  return `<div class="po-card${isUpcoming ? ' po-card--upcoming' : ''}${isFinal ? ' po-card--final' : ''}" data-po="${poId}">
    ${isFinal ? '<div class="po-card__trophy">🏆</div>' : ''}
    <div class="po-card__label">${label}</div>
    <div class="po-card__team po-card__team--${aSt}">${sA}<span class="po-card__name">${aName}</span><span class="po-card__score po-card__score--${aScCl}">${aScore}</span></div>
    <div class="po-card__team po-card__team--${bSt}">${sB}<span class="po-card__name">${bName}</span><span class="po-card__score po-card__score--${bScCl}">${bScore}</span></div>
    ${isUpcoming ? '<div class="po-card__cta">À venir · Jouer la série</div>' : ''}
  </div>`;
}

function poByeCard(poId, teamId, seed) {
  return `<div class="po-bye" data-po="${poId}">
    <div class="po-bye__label">Qualifié directement</div>
    <div class="po-bye__name">${getTeamShortName(teamId)}</div>
    <div class="po-bye__seed">Seed #${seed}</div>
  </div>`;
}

function poChampionBlock(seasonLabel, championId) {
  const pending = !championId;
  const name = championId ? getTeamShortName(championId) : 'À déterminer';
  return `<div class="po-champion${pending ? ' po-champion--pending' : ''}" data-po="po-champion">
    <div class="po-champion__crown">👑</div>
    <div class="po-champion__title">Vainqueur</div>
    <div class="po-champion__season">${seasonLabel}</div>
    <div class="po-champion__team">${name}</div>
  </div>`;
}

function drawPoBracketLines(bracketId) {
  const bracket = document.getElementById(bracketId);
  if (!bracket) return;
  const svg = bracket.querySelector('.po-bracket__svg');
  if (!svg) return;
  svg.innerHTML = '';
  const br = bracket.getBoundingClientRect();
  if (!br.width) return;
  const get = (id) => bracket.querySelector(`[data-po="${id}"]`);
  const midY = (el) => { const r = el.getBoundingClientRect(); return r.top + r.height / 2 - br.top; };
  const rx = (el) => el.getBoundingClientRect().right - br.left;
  const lx = (el) => el.getBoundingClientRect().left  - br.left;
  const line = (x1, y1, x2, y2, c) => {
    const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    l.setAttribute('x1', x1); l.setAttribute('y1', y1);
    l.setAttribute('x2', x2); l.setAttribute('y2', y2);
    l.setAttribute('stroke', c); l.setAttribute('stroke-width', '1.5');
    l.setAttribute('stroke-linecap', 'round');
    svg.appendChild(l);
  };
  // Connecteur à angles droits uniquement : 2 horizontales depuis les sources
  // vers une barre verticale (mx), puis une horizontale dans la cible à sa
  // hauteur exacte (yt). La barre verticale s'étend pour inclure yt afin que
  // le raccord cible reste un angle droit même si la cible n'est pas pile au
  // centre des deux sources (v1.7.5).
  const connect = (a, b, t, c) => {
    if (!a || !b || !t) return;
    const x1 = rx(a), y1 = midY(a), x2 = rx(b), y2 = midY(b);
    const xt = lx(t), yt = midY(t), mx = (Math.max(x1, x2) + xt) / 2;
    line(x1, y1, mx, y1, c); line(x2, y2, mx, y2, c);
    line(mx, Math.min(y1, y2, yt), mx, Math.max(y1, y2, yt), c);
    line(mx, yt, xt, yt, c);
  };
  const single = (a, t, c) => {
    if (!a || !t) return;
    const x1 = rx(a), y1 = midY(a), xt = lx(t), yt = midY(t);
    // Aligné verticalement → trait parfaitement droit, pas de jog inutile.
    if (Math.abs(y1 - yt) < 1) { line(x1, y1, xt, yt, c); return; }
    const mx = (x1 + xt) / 2;
    line(x1, y1, mx, y1, c); line(mx, y1, mx, yt, c); line(mx, yt, xt, yt, c);
  };
  const BL = '#2A4A70', GD = '#C89B3C';
  // Saison (byes dans la colonne des quarts) : Demi 1 = G2 + vainqueur Quart 2, Demi 2 = vainqueur Quart 1 + KC
  connect(get('po-bye-top'), get('po-qf2'), get('po-sf-top'), BL);
  connect(get('po-qf1'), get('po-bye-bot'), get('po-sf-bot'), BL);
  // Worlds (8 équipes) : 4 quarts -> 2 demis
  connect(get('po-qf1-top'), get('po-qf1-bot'), get('po-sf-top'), BL);
  connect(get('po-qf2-top'), get('po-qf2-bot'), get('po-sf-bot'), BL);
  // Demi-finales -> Finale (saison, MSI, Worlds)
  connect(get('po-sf-top'), get('po-sf-bot'), get('po-final'), GD);
  // Finale -> bloc Vainqueur
  single(get('po-final'), get('po-champion'), GD);
}

function buildSeasonBracketHtml(po, pendingMatch, seasonLabel) {
  const seeds = po.seeds;
  const m = po.matches;
  const isUp = (k) => pendingMatch && pendingMatch.matchKey === k;
  const champ = po.champion || (m.final.result ? m.final.result.winner : null);
  const H = 440;
  // Demi-finale 1 = seed 1 (bye) + vainqueur Quart 2 ; Demi 2 = seed 2 (bye) + vainqueur Quart 1.
  // Les byes partagent la colonne des quarts (round 1) -> les connecteurs ne croisent aucune carte.
  const half = (c1, c2) => `<div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:30px;">${c1}${c2}</div>`;
  const centered = (card) => `<div style="flex:1;display:flex;align-items:center;justify-content:center;">${card}</div>`;
  const col = (lbl, inner) => `<div style="height:${H}px;display:flex;flex-direction:column;">
    <div class="po-col__label">${lbl}</div>
    <div style="flex:1;display:flex;flex-direction:column;">${inner}</div>
  </div>`;
  const legend = `<div class="po-legend">
    <div class="po-legend__item"><div class="po-legend__dot po-legend__dot--win"></div>Qualifié</div>
    <div class="po-legend__item"><div class="po-legend__dot po-legend__dot--gold"></div>Prochain match</div>
    <div class="po-legend__item"><div class="po-legend__dot po-legend__dot--out"></div>Éliminé</div>
  </div>`;
  return `<div class="po-bracket-wrapper">
    <div class="po-bracket" id="po-bracket-season">
      <svg class="po-bracket__svg"></svg>
      ${col('Quarts de finale & Byes<br>BO5',
        half(poByeCard('po-bye-top', seeds[0], 1), poBracketCard('po-qf2','Quart 2',m.qf2,4,5,isUp('qf2'),false)) +
        half(poBracketCard('po-qf1','Quart 1',m.qf1,3,6,isUp('qf1'),false), poByeCard('po-bye-bot', seeds[1], 2))
      )}
      <div class="po-gap"></div>
      ${col('Demi-finales<br>BO5',
        centered(poBracketCard('po-sf-top','Demi 1',m.sf1,null,null,isUp('sf1'),false)) +
        centered(poBracketCard('po-sf-bot','Demi 2',m.sf2,null,null,isUp('sf2'),false))
      )}
      <div class="po-gap"></div>
      ${col('Finale<br>BO5', centered(poBracketCard('po-final','Grand Final',m.final,null,null,isUp('final'),true)))}
      <div class="po-gap"></div>
      ${col('&nbsp;<br>&nbsp;', centered(poChampionBlock(seasonLabel || '', champ)))}
    </div>
    ${legend}
  </div>`;
}

function buildIntlBracketHtml(b, pendingMatch, seasonLabel) {
  const m = b.matches;
  const isUp = (k) => pendingMatch && pendingMatch.matchKey === k;
  const has8 = !!m.qf1;
  const champ = b.champion || (m.final.result ? m.final.result.winner : null);
  const championColMSI = (H) => `<div style="height:${H}px;display:flex;flex-direction:column;">
    <div class="po-col__label">&nbsp;<br>&nbsp;</div>
    <div style="flex:1;display:flex;align-items:center;justify-content:center;">${poChampionBlock(seasonLabel || '', champ)}</div>
  </div>`;
  const legend = `<div class="po-legend">
    <div class="po-legend__item"><div class="po-legend__dot po-legend__dot--win"></div>Qualifié</div>
    <div class="po-legend__item"><div class="po-legend__dot po-legend__dot--gold"></div>Prochain match</div>
    <div class="po-legend__item"><div class="po-legend__dot po-legend__dot--out"></div>Éliminé</div>
  </div>`;

  if (!has8) {
    // MSI : 4 équipes, départ en demi-finales
    const H = 240;
    const pairCol = (lbl, c1, c2) => `<div style="height:${H}px;display:flex;flex-direction:column;">
      <div class="po-col__label">${lbl}</div>
      <div style="flex:1;display:flex;flex-direction:column;justify-content:space-between;">${c1}${c2}</div>
    </div>`;
    const singleCol = (lbl, card) => `<div style="height:${H}px;display:flex;flex-direction:column;">
      <div class="po-col__label">${lbl}</div>
      <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">${card}</div>
    </div>`;
    return `<div class="po-bracket-wrapper">
      <div class="po-bracket" id="po-bracket-intl">
        <svg class="po-bracket__svg"></svg>
        ${pairCol('Demi-finales<br>BO5', poBracketCard('po-sf-top','Demi 1',m.sf1,1,4,isUp('sf1'),false), poBracketCard('po-sf-bot','Demi 2',m.sf2,2,3,isUp('sf2'),false))}
        <div class="po-gap"></div>
        ${singleCol('Finale<br>BO5', poBracketCard('po-final','Grand Final',m.final,null,null,isUp('final'),true))}
        <div class="po-gap"></div>
        ${championColMSI(H)}
      </div>
      ${legend}
    </div>`;
  }

  // Worlds : 8 équipes — QF → SF → Finale
  const H = 430;
  const halfH = Math.floor((H - 38) / 2); // 38px ≈ label height
  const pairCol = (lbl, c1, c2) => `<div style="height:${H}px;display:flex;flex-direction:column;">
    <div class="po-col__label">${lbl}</div>
    <div style="flex:1;display:flex;flex-direction:column;justify-content:space-between;">${c1}${c2}</div>
  </div>`;
  const singleCol = (lbl, card) => `<div style="height:${H}px;display:flex;flex-direction:column;">
    <div class="po-col__label">${lbl}</div>
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">${card}</div>
  </div>`;
  const qfColHtml = `<div style="height:${H}px;display:flex;flex-direction:column;">
    <div class="po-col__label">Quarts de finale<br>BO5</div>
    <div style="flex:1;display:flex;flex-direction:column;">
      <div style="height:${halfH}px;display:flex;flex-direction:column;justify-content:space-between;">
        ${poBracketCard('po-qf1-top','Quart 1',m.qf1,1,8,isUp('qf1'),false)}
        ${poBracketCard('po-qf1-bot','Quart 4',m.qf4,2,7,isUp('qf4'),false)}
      </div>
      <div style="flex:1;"></div>
      <div style="height:${halfH}px;display:flex;flex-direction:column;justify-content:space-between;">
        ${poBracketCard('po-qf2-top','Quart 2',m.qf2,4,5,isUp('qf2'),false)}
        ${poBracketCard('po-qf2-bot','Quart 3',m.qf3,3,6,isUp('qf3'),false)}
      </div>
    </div>
  </div>`;
  return `<div class="po-bracket-wrapper">
    <div class="po-bracket" id="po-bracket-intl">
      <svg class="po-bracket__svg"></svg>
      ${qfColHtml}
      <div class="po-gap"></div>
      ${pairCol('Demi-finales<br>BO5', poBracketCard('po-sf-top','Demi 1',m.sf1,null,null,isUp('sf1'),false), poBracketCard('po-sf-bot','Demi 2',m.sf2,null,null,isUp('sf2'),false))}
      <div class="po-gap"></div>
      ${singleCol('Finale<br>BO5', poBracketCard('po-final','Grand Final',m.final,null,null,isUp('final'),true))}
      <div class="po-gap"></div>
      ${championColMSI(H)}
    </div>
    ${legend}
  </div>`;
}

function renderPlayoffsCalendar(el, season) {
  const po = season.playoffs;
  const logHtml = season.log.slice(0, 8).map((l) => `<div class="result-chip">${l}</div>`).join('');

  let actionHtml;
  if (season.pendingMatch) {
    const pm = season.pendingMatch;
    actionHtml = `
      <p class="card__count">Prochaine serie : ${pm.format} contre ${getTeamName(pm.opponentTeamId)} (Fearless Draft active).</p>
      <div class="training-form__actions"><button class="btn-primary" id="btn-play-playoff">Jouer la serie</button></div>
    `;
  } else {
    actionHtml = '<p class="card__count">Playoffs en cours...</p>';
  }

  el.innerHTML = `
    <h3 class="panel-title">${splitLabel(season.split)} ${season.year} - ${season.region} - Playoffs</h3>
    ${buildSeasonBracketHtml(po, season.pendingMatch, `${splitLabel(season.split)} ${season.year} - ${season.region}`)}
    ${actionHtml}
    <h3 class="panel-title">Derniers résultats</h3>
    <div class="recent-results">${logHtml || '<p class="card__count">Aucun résultat pour le moment.</p>'}</div>
  `;

  requestAnimationFrame(() => drawPoBracketLines('po-bracket-season'));

  const playBtn = document.getElementById('btn-play-playoff');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      const pm = season.pendingMatch;
      startMatchSeries(pm.opponentTeamId, pm.format, 'on', `Playoffs - ${splitLabel(season.split)} ${season.year} - ${season.region}`);
    });
  }
}

function renderSeasonRecap(el, season) {
  const placement = getFinalPlacement();
  const rewards = getPlacementRewards(placement);
  const logHtml = season.log.slice(0, 10).map((l) => `<div class="result-chip">${l}</div>`).join('');
  const nextLabel = season.split === 'spring' ? 'Continuer vers le MSI' : 'Continuer vers les Worlds';
  const progressionHtml = careerProgressionHtml(state.lastCareerProgression);
  const bracketHtml = season.playoffs
    ? buildSeasonBracketHtml(season.playoffs, null, `${splitLabel(season.split)} ${season.year} - ${season.region}`)
    : '';

  el.innerHTML = `
    <h3 class="panel-title">${splitLabel(season.split)} ${season.year} - ${season.region} - Terminee</h3>
    <p class="card__count">Classement final : ${placementLabel(placement)}</p>
    <p class="card__count">Récompenses obtenues : +${rewards.coaching} points coaching, +${rewards.budget} budget, +${rewards.prestige} prestige.</p>
    ${bracketHtml}
    <div class="recent-results">${logHtml}</div>
    ${progressionHtml}
    <div class="training-form__actions">
      <button class="btn-primary" id="btn-next-competition">${nextLabel}</button>
    </div>
  `;

  if (season.playoffs) requestAnimationFrame(() => drawPoBracketLines('po-bracket-season'));

  const btn = document.getElementById('btn-next-competition');
  if (btn) {
    btn.addEventListener('click', () => {
      startInternational(season.split === 'spring' ? 'msi' : 'worlds');
      renderCalendar();
    });
  }
}

/* ------------------------------------------------------------
   Calendrier - vues MSI / Worlds
   ------------------------------------------------------------ */
function renderInternationalCalendar(el, intl) {
  if (intl.phase === 'groups') {
    renderInternationalGroups(el, intl);
  } else if (intl.phase === 'bracket') {
    renderInternationalBracket(el, intl);
  } else {
    renderInternationalRecap(el, intl);
  }
}

function renderInternationalGroups(el, intl) {
  const groupsHtml = intl.groups.map((group, i) => {
    const ranked = sortGroupStandings(group, intl.groupStandings);
    const rows = ranked.map((id, idx) => {
      const s = intl.groupStandings[id];
      const isPlayer = id === 'player';
      return `
        <tr class="${isPlayer ? 'standings-row--player' : ''}">
          <td>${idx + 1}</td>
          <td>${getTeamShortName(id)}</td>
          <td>${s.wins}</td>
          <td>${s.losses}</td>
          <td>${s.nexusWon || 0}-${s.nexusLost || 0}</td>
        </tr>
      `;
    }).join('');
    return `
      <h3 class="panel-title">Groupe ${String.fromCharCode(65 + i)}</h3>
      <table class="history-table">
        <thead><tr><th>#</th><th>Équipe</th><th>V</th><th>D</th><th title="Nexus gagnés - Nexus perdus">Nexus</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }).join('');

  const logHtml = intl.log.slice(0, 8).map((l) => `<div class="result-chip">${l}</div>`).join('');
  const pm = intl.pendingMatch;
  if (!pm) { processInternationalGroupMatchday(); renderCalendar(); return; }
  const actionLabel = pm.started ? 'Continuer le match en cours' : 'Jouer le match';

  el.innerHTML = `
    <h3 class="panel-title">${eventLabel(intl)} ${intl.year} - Phase de groupes (journée ${intl.groupMatchday}/${intl.totalGroupRounds})</h3>
    <p class="card__count">Prochain match : ${getTeamName('player')} vs ${getTeamName(pm.opponentTeamId)} (BO3)</p>
    <div class="training-form__actions">
      <button class="btn-primary" id="btn-international-action">${actionLabel}</button>
    </div>
    ${groupsHtml}
    <h3 class="panel-title">Derniers résultats</h3>
    <div class="recent-results">${logHtml || '<p class="card__count">Aucun résultat pour le moment.</p>'}</div>
  `;

  const btn = document.getElementById('btn-international-action');
  if (btn) {
    btn.addEventListener('click', () => {
      if (!pm.started) {
        pm.started = true;
        saveGame();
        startMatchSeries(pm.opponentTeamId, 'BO3', 'on', `${eventLabel(intl)} ${intl.year} - Groupes`);
      } else {
        showView('match');
      }
    });
  }
}

function renderInternationalBracket(el, intl) {
  const b = intl.bracket;
  const logHtml = intl.log.slice(0, 8).map((l) => `<div class="result-chip">${l}</div>`).join('');

  let actionHtml;
  if (intl.pendingMatch) {
    const pm = intl.pendingMatch;
    const actionLabel = pm.started ? 'Continuer la serie en cours' : 'Jouer la serie';
    actionHtml = `
      <p class="card__count">Prochaine serie : ${pm.format} contre ${getTeamName(pm.opponentTeamId)} (Fearless Draft active).</p>
      <div class="training-form__actions"><button class="btn-primary" id="btn-international-action">${actionLabel}</button></div>
    `;
  } else {
    actionHtml = '<p class="card__count">Phase finale en cours...</p>';
  }

  el.innerHTML = `
    <h3 class="panel-title">${eventLabel(intl)} ${intl.year} - Phase finale</h3>
    ${buildIntlBracketHtml(b, intl.pendingMatch, `${eventLabel(intl)} ${intl.year}`)}
    ${actionHtml}
    <h3 class="panel-title">Derniers résultats</h3>
    <div class="recent-results">${logHtml || '<p class="card__count">Aucun résultat pour le moment.</p>'}</div>
  `;

  requestAnimationFrame(() => drawPoBracketLines('po-bracket-intl'));

  const btn = document.getElementById('btn-international-action');
  if (btn) {
    btn.addEventListener('click', () => {
      const pm = intl.pendingMatch;
      if (!pm.started) {
        pm.started = true;
        saveGame();
        startMatchSeries(pm.opponentTeamId, pm.format, 'on', `${eventLabel(intl)} ${intl.year} - Phase finale`);
      } else {
        showView('match');
      }
    });
  }
}

function renderInternationalRecap(el, intl) {
  const placement = getInternationalPlacement(intl);
  const logHtml = intl.log.slice(0, 10).map((l) => `<div class="result-chip">${l}</div>`).join('');

  let placementHtml = '';
  if (placement !== null && intl.rewards) {
    placementHtml = `<p class="card__count">Votre classement : ${placement === 1 ? 'Champion !' : placement + 'e'}. Récompenses : +${intl.rewards.coaching} coaching, +${intl.rewards.budget} budget, +${intl.rewards.prestige} prestige.</p>`;
  }

  const bracketHtml = intl.bracket
    ? buildIntlBracketHtml(intl.bracket, null, `${eventLabel(intl)} ${intl.year}`)
    : '';

  el.innerHTML = `
    <h3 class="panel-title">${eventLabel(intl)} ${intl.year} - Terminé</h3>
    <p class="card__count">Champion : ${getTeamName(intl.bracket.champion)}</p>
    ${placementHtml}
    ${bracketHtml}
    <div class="recent-results">${logHtml}</div>
    <div class="training-form__actions">
      <button class="btn-primary" id="btn-international-continue">Continuer</button>
    </div>
  `;

  if (intl.bracket) requestAnimationFrame(() => drawPoBracketLines('po-bracket-intl'));

  const btn = document.getElementById('btn-international-continue');
  if (btn) {
    btn.addEventListener('click', () => {
      proceedAfterInternational();
      renderCalendar();
    });
  }
}

/* ------------------------------------------------------------
   Simulation de match (CDC 7 + avenant v1.1 - deroulement)
   ------------------------------------------------------------ */
const MATCH_PHASE_THRESHOLDS = { early: 14 * 60, mid: 25 * 60 };
const MATCH_PHASE_LABELS = { early: 'Early game', mid: 'Mid game', late: 'Late game' };
const MATCH_SOFT_TIME_LIMIT = 55 * 60;

function formatClock(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

const MATCH_EVENTS = [
  { id: 'lane_kill', category: 'lane', phases: ['early', 'mid'], weight: 1 },
  { id: 'gank', category: 'jungle', phases: ['early', 'mid'], weight: 1 },
  { id: 'dragon', category: 'objective', phases: ['early', 'mid', 'late'], weight: 3, objective: 'dragons' },
  { id: 'herald', category: 'objective', phases: ['mid'], weight: 1, objective: 'heralds' },
  { id: 'grubs', category: 'objective', phases: ['early', 'mid'], weight: 2, objective: 'grubs' },
  { id: 'tower', category: 'macro', phases: ['mid', 'late'], weight: 3, objective: 'towers' },
  { id: 'teamfight', category: 'teamfight', phases: ['mid', 'late'], weight: 3 },
  { id: 'baron', category: 'objective', phases: ['late'], weight: 2, objective: 'barons' },
  { id: 'elder', category: 'objective', phases: ['late'], weight: 1, objective: 'elders' },
  { id: 'dramatic', category: 'dramatic', phases: ['late'], weight: 1 }
];

const MATCH_KILL_CAP = 55; // plafond absolu (fiesta extrême)

// v1.5.0 — 5 scénarios réalistes, pondérés par région
const SCENARIO_WEIGHTS_BY_REGION = {
  LCK:           { control: 35, standard: 35, snowball: 18, stomp:  7, fiesta:  5 },
  LPL:           { control: 15, standard: 32, snowball: 28, stomp: 10, fiesta: 15 },
  LEC:           { control: 20, standard: 35, snowball: 22, stomp:  8, fiesta: 15 },
  LCS:           { control: 25, standard: 40, snowball: 22, stomp:  8, fiesta:  5 },
  International: { control: 25, standard: 30, snowball: 25, stomp: 12, fiesta:  8 },
};
// killWeightMult : multiplie le poids des events lane/gank
// maxKillsPerTF  : max kills générés par un teamfight/dramatic
// killCapByMin   : plafond kills total à [<10 min, <15 min, <20 min, <25 min]
// maxKills       : plafond absolu kills pour la partie entière
// decisiveness   : v1.5.3 — "raideur" de la sigmoïde de résolution d'un duel.
//                  Petit = le favori gagne presque toujours (domination, peu de
//                  hasard) ; grand = chaque combat tend vers pile/face (chaos).
// snowballFactor : v1.5.3 — intensité de l'effet boule de neige de l'or.
//                  Faible = comebacks possibles (match serré) ; fort = l'avance
//                  fait gagner les combats suivants (vrai stomp).
const MATCH_SCENARIOS = {
  control:  { killWeightMult: 0.65, maxKillsPerTF: 1, killCapByMin: [ 3,  8, 15, 24], maxKills: 26, decisiveness: 4.5, snowballFactor: 0.6 },
  standard: { killWeightMult: 0.90, maxKillsPerTF: 2, killCapByMin: [ 4, 11, 19, 30], maxKills: 32, decisiveness: 5.0, snowballFactor: 0.8 },
  snowball: { killWeightMult: 1.10, maxKillsPerTF: 2, killCapByMin: [ 6, 13, 22, 35], maxKills: 38, decisiveness: 4.5, snowballFactor: 1.1 },
  stomp:    { killWeightMult: 1.40, maxKillsPerTF: 3, killCapByMin: [ 8, 15, 25, 40], maxKills: 44, decisiveness: 3.5, snowballFactor: 1.4 },
  fiesta:   { killWeightMult: 1.70, maxKillsPerTF: 4, killCapByMin: [10, 18, 30, 52], maxKills: 55, decisiveness: 6.5, snowballFactor: 0.9 },
};
const DRAGON_BUFF_DURATION = 180;
const BARON_BUFF_DURATION = 180;
const ELDER_BUFF_DURATION = 150;
const MATCH_GRUBS_TOTAL = 3;
const GRUBS_SPAWN_TIME = 480;
const HERALD_SPAWN_TIME = 840;
const HERALD_DESPAWN_TIME = 1195;
const DRAGON_FIRST_SPAWN = 300;
const DRAGON_RESPAWN = 300;
const DRAGON_SOUL_COUNT = 4;
const ELDER_RESPAWN = 360;
const BARON_SPAWN_TIME = 1200;
const BARON_RESPAWN = 360;

let matchRuntime = null;

function getMatchPicks(opponent) {
  if (state.draft && state.draft.status === 'done' && state.draft.opponentTeamId === opponent.id) {
    const d = state.draft;
    // draft.playerSide = ordre de pick ('blue'=First, 'red'=Last) ; on re-clé tout par CÔTÉ DE CARTE
    const playerPickSide = d.playerSide;
    const oppPickSide = playerPickSide === 'blue' ? 'red' : 'blue';
    const playerMapSide = d.mapSide || playerPickSide;
    const oppMapSide = playerMapSide === 'blue' ? 'red' : 'blue';
    const picks = {};
    picks[playerMapSide] = d[playerPickSide + 'Picks'];
    picks[oppMapSide] = d[oppPickSide + 'Picks'];
    return { blue: picks.blue, red: picks.red, playerSide: playerMapSide };
  }

  const playerPicks = {};
  state.roster.forEach((p) => {
    let bestChamp = null;
    let bestMastery = -1;
    p.championPool.forEach((champName) => {
      const m = getChampionMastery(p.id, champName);
      const mastery = m ? m.mastery : 0;
      if (mastery > bestMastery) {
        bestMastery = mastery;
        bestChamp = champName;
      }
    });
    if (!bestChamp) {
      const fallback = getChampionsForRole(p.role)[0];
      bestChamp = fallback ? fallback.name : null;
    }
    playerPicks[p.role] = bestChamp;
  });

  const aiPicks = {};
  opponent.roster.forEach((p) => {
    const fallback = getChampionsForRole(p.role)[0];
    aiPicks[p.role] = (p.championPool && p.championPool[0]) || (fallback ? fallback.name : null);
  });

  return { blue: playerPicks, red: aiPicks, playerSide: 'blue' };
}

function computeBaseWinProbability(opponent) {
  const myRating = averageRosterLevel(state.roster);
  const oppRating = averageRosterLevel(opponent.roster);
  let prob = 0.5 + (myRating - oppRating) / 150;
  if (state.draft && state.draft.status === 'done' && state.draft.opponentTeamId === opponent.id) {
    prob += state.draft.result.total / 200;
  }
  return clamp(prob, 0.1, 0.9);
}

function startMatchSeries(opponentTeamId, format, fearlessMode, context) {
  state.matchSeries = {
    opponentTeamId,
    format,
    fearlessMode,
    context: context || 'Scrim',
    scoreFor: 0,
    scoreAgainst: 0,
    goldDiffTotal: 0,
    gameNumber: 1,
    globalFearlessLocked: []
  };
  state.draft = null;
  saveGame();
  showCoinFlipModal(opponentTeamId);
}

// Deux catégories distinctes : Side et Pick Order
// Le gagnant choisit dans l'une → le perdant est contraint à l'autre
/* Pile ou Face — Side et Pick sont des choix indépendants (Blue Side ≠ First Pick) */
const COIN_FLIP_CATEGORIES = {
  side: [
    { id: 'blue',  label: 'Blue Side',    desc: 'Spawn & vision supérieurs en early', type: 'side' },
    { id: 'red',   label: 'Red Side',     desc: 'Dragon & Baron côté droit',           type: 'side' }
  ],
  pick: [
    { id: 'first', label: 'First Pick',   desc: 'Contrôle le meta — impose le tempo', type: 'pick' },
    { id: 'last',  label: 'Last Pick',    desc: 'Contre-pick assuré en position 5',   type: 'pick' }
  ]
};
const COIN_FLIP_ALL = [...COIN_FLIP_CATEGORIES.side, ...COIN_FLIP_CATEGORIES.pick];

function getCoinFlipOpt(id) { return COIN_FLIP_ALL.find(x => x.id === id); }
function getOtherCategory(chosenId) {
  return COIN_FLIP_CATEGORIES.side.some(o => o.id === chosenId)
    ? COIN_FLIP_CATEGORIES.pick
    : COIN_FLIP_CATEGORIES.side;
}

/* Résout les choix : playerOptId = ce que le joueur a choisi, aiOptId = ce que l'IA a choisi
   Retourne playerMapSide ('blue'|'red') et playerPickOrder ('blue'=FirstPick | 'red'=LastPick) */
function resolveFlipChoices(playerOptId, aiOptId) {
  const playerOpt = getCoinFlipOpt(playerOptId);
  const aiOpt     = getCoinFlipOpt(aiOptId);
  let playerMapSide, playerPickOrder;
  if (playerOpt.type === 'side') {
    playerMapSide   = playerOptId;                          // 'blue' ou 'red'
    playerPickOrder = aiOptId === 'first' ? 'red' : 'blue'; // opposé du pick de l'IA
  } else {
    playerPickOrder = playerOptId === 'first' ? 'blue' : 'red'; // 'blue'=FirstPick
    playerMapSide   = aiOptId === 'blue'  ? 'red' : 'blue';    // opposé du side de l'IA
  }
  return { playerMapSide, playerPickOrder };
}

/* Modal side/pick pour les games 2+ d'une série BO3/BO5.
   Le PERDANT choisit en premier sa catégorie (Côté OU Ordre de pick), séparément. */
function showSeriesGameModal(opponentTeamId, playerWonLastGame) {
  const series = state.matchSeries;
  const opponent = getTeamRef(opponentTeamId);
  const opName = opponent ? opponent.shortName : 'ADV';
  const gameNum = series ? series.gameNumber : '?';

  function optionBtns(opts, prefix) {
    return opts.map(o =>
      `<button class="btn-secondary coin-flip__option" data-opt="${o.id}" data-prefix="${prefix}">${o.label}<span>${o.desc}</span></button>`
    ).join('');
  }

  function showSummary(playerOptId, aiOptId) {
    const { playerMapSide, playerPickOrder } = resolveFlipChoices(playerOptId, aiOptId);
    const sLabel = playerMapSide   === 'blue' ? 'Blue Side'   : 'Red Side';
    const pLabel = playerPickOrder === 'blue' ? 'First Pick'  : 'Last Pick';
    const overlay = document.getElementById('modal-overlay');
    overlay.querySelector('.modal-content').innerHTML = `
      <div class="coin-flip">
        <h3 class="coin-flip__title">Game ${gameNum} — Résumé</h3>
        <div class="coin-flip__summary">
          Côté : <strong>${sLabel}</strong> &nbsp;|&nbsp; Draft : <strong>${pLabel}</strong>
        </div>
        <div class="modal-content__actions">
          <button class="btn-primary" id="series-game-go">Lancer la draft !</button>
        </div>
      </div>`;
    document.getElementById('series-game-go').addEventListener('click', () => {
      closeModal();
      startDraft(opponentTeamId, playerPickOrder, playerMapSide);
      showView('draft');
    });
  }

  function showLoserChooses() {
    const overlay = document.getElementById('modal-overlay');
    overlay.querySelector('.modal-content').innerHTML = `
      <div class="coin-flip">
        <h3 class="coin-flip__title">Game ${gameNum} — Choix du perdant</h3>
        <div class="coin-flip__result coin-flip__result--loss">Vous avez perdu la game précédente — vous choisissez en premier.</div>
        <p class="coin-flip__sub coin-flip__category-label">— Côté —</p>
        <div class="coin-flip__options">${optionBtns(COIN_FLIP_CATEGORIES.side, 'sg-loser')}</div>
        <p class="coin-flip__sub coin-flip__category-label">— Ordre de pick —</p>
        <div class="coin-flip__options">${optionBtns(COIN_FLIP_CATEGORIES.pick, 'sg-loser')}</div>
      </div>`;
    overlay.querySelectorAll('[data-prefix="sg-loser"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const aiCat = getOtherCategory(btn.dataset.opt);
        const aiOpt = aiCat[Math.floor(Math.random() * aiCat.length)];
        showSummary(btn.dataset.opt, aiOpt.id);
      });
    });
  }

  function showWinnerChooses() {
    const aiOpt = COIN_FLIP_ALL[Math.floor(Math.random() * COIN_FLIP_ALL.length)];
    const playerCat = getOtherCategory(aiOpt.id);
    const overlay = document.getElementById('modal-overlay');
    overlay.querySelector('.modal-content').innerHTML = `
      <div class="coin-flip">
        <h3 class="coin-flip__title">Game ${gameNum} — Choix du gagnant</h3>
        <div class="coin-flip__result coin-flip__result--win">Vous avez gagné — ${opName} (perdant) choisit en premier.</div>
        <p class="coin-flip__sub"><strong>${opName}</strong> a choisi : <em>${getCoinFlipOpt(aiOpt.id).label}</em></p>
        <p class="coin-flip__sub coin-flip__category-label">— ${playerCat === COIN_FLIP_CATEGORIES.side ? 'Côté' : 'Ordre de pick'} —</p>
        <div class="coin-flip__options">${optionBtns(playerCat, 'sg-winner')}</div>
      </div>`;
    overlay.querySelectorAll('[data-prefix="sg-winner"]').forEach(btn => {
      btn.addEventListener('click', () => showSummary(btn.dataset.opt, aiOpt.id));
    });
  }

  showModal(`
    <div class="coin-flip">
      <h3 class="coin-flip__title">Game ${gameNum} — Choix des sides</h3>
      <p class="coin-flip__sub">
        ${playerWonLastGame
          ? `<strong>${opName}</strong> (perdant) choisit en premier sa catégorie.`
          : `Vous (perdant) choisissez en premier votre catégorie.`}
      </p>
      <div class="modal-content__actions">
        <button class="btn-primary" id="series-game-next">Continuer</button>
      </div>
    </div>`);

  document.getElementById('series-game-next').addEventListener('click', () => {
    if (playerWonLastGame) showWinnerChooses();
    else showLoserChooses();
  });
}

function showCoinFlipModal(opponentTeamId) {
  const opponent = getTeamRef(opponentTeamId);
  const opName = opponent ? opponent.shortName : 'ADV';
  const playerWon = Math.random() < 0.5;

  function optionBtns(opts, prefix) {
    return opts.map(o =>
      `<button class="btn-secondary coin-flip__option" data-opt="${o.id}" data-prefix="${prefix}">${o.label}<span>${o.desc}</span></button>`
    ).join('');
  }

  function showSummary(playerOptId, aiOptId) {
    const playerOpt = getCoinFlipOpt(playerOptId);
    const aiOpt     = getCoinFlipOpt(aiOptId);
    const { playerMapSide, playerPickOrder } = resolveFlipChoices(playerOptId, aiOptId);
    const sideLabel = playerMapSide   === 'blue' ? 'Blue Side'  : 'Red Side';
    const pickLabel = playerPickOrder === 'blue' ? 'First Pick' : 'Last Pick';
    const overlay = document.getElementById('modal-overlay');
    overlay.querySelector('.modal-content').innerHTML = `
      <div class="coin-flip">
        <p class="coin-flip__sub"><strong>Vous</strong> avez choisi : <em>${playerOpt.label}</em></p>
        <p class="coin-flip__sub"><strong>${opName}</strong> a choisi : <em>${aiOpt.label}</em></p>
        <div class="coin-flip__summary">
          Côté : <strong>${sideLabel}</strong> &nbsp;|&nbsp; Draft : <strong>${pickLabel}</strong>
        </div>
        <div class="modal-content__actions">
          <button class="btn-primary" id="coin-flip-go">Lancer la draft !</button>
        </div>
      </div>`;
    document.getElementById('coin-flip-go').addEventListener('click', () => {
      closeModal();
      startDraft(opponentTeamId, playerPickOrder, playerMapSide);
      showView('draft');
    });
  }

  function step2PlayerChooses() {
    const overlay = document.getElementById('modal-overlay');
    overlay.querySelector('.modal-content').innerHTML = `
      <div class="coin-flip">
        <div class="coin-flip__result coin-flip__result--win">Vous choisissez en premier !</div>
        <p class="coin-flip__sub">Choisissez votre avantage :</p>
        <p class="coin-flip__sub coin-flip__category-label">— Côté —</p>
        <div class="coin-flip__options">${optionBtns(COIN_FLIP_CATEGORIES.side, 'cf-winner')}</div>
        <p class="coin-flip__sub coin-flip__category-label">— Ordre de pick —</p>
        <div class="coin-flip__options">${optionBtns(COIN_FLIP_CATEGORIES.pick, 'cf-winner')}</div>
      </div>`;
    overlay.querySelectorAll('[data-prefix="cf-winner"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const aiCat = getOtherCategory(btn.dataset.opt);
        const aiOpt = aiCat[Math.floor(Math.random() * aiCat.length)];
        showSummary(btn.dataset.opt, aiOpt.id);
      });
    });
  }

  function step2AIChoosesFirst() {
    const aiOpt = COIN_FLIP_ALL[Math.floor(Math.random() * COIN_FLIP_ALL.length)];
    const playerCat = getOtherCategory(aiOpt.id);
    const overlay = document.getElementById('modal-overlay');
    overlay.querySelector('.modal-content').innerHTML = `
      <div class="coin-flip">
        <div class="coin-flip__result coin-flip__result--loss">${opName} choisit en premier...</div>
        <p class="coin-flip__sub"><strong>${opName}</strong> a choisi : <em>${aiOpt.label}</em></p>
        <p class="coin-flip__sub">Choisissez parmi la catégorie restante :</p>
        <p class="coin-flip__sub coin-flip__category-label">— ${playerCat === COIN_FLIP_CATEGORIES.side ? 'Côté' : 'Ordre de pick'} —</p>
        <div class="coin-flip__options">${optionBtns(playerCat, 'cf-loser')}</div>
      </div>`;
    overlay.querySelectorAll('[data-prefix="cf-loser"]').forEach(btn => {
      btn.addEventListener('click', () => showSummary(btn.dataset.opt, aiOpt.id));
    });
  }

  const resultHtml = playerWon
    ? `<div class="coin-flip__result coin-flip__result--win">Vous gagnez le pile ou face !</div>`
    : `<div class="coin-flip__result coin-flip__result--loss">Vous perdez le pile ou face...</div>`;

  showModal(`
    <div class="coin-flip">
      <h3 class="coin-flip__title">Pile ou Face</h3>
      <div class="coin-flip__coin" id="coin-anim">🪙</div>
      ${resultHtml}
      <div class="modal-content__actions">
        <button class="btn-primary" id="coin-flip-next">Continuer</button>
      </div>
    </div>`);

  document.getElementById('coin-flip-next').addEventListener('click', () => {
    if (playerWon) step2PlayerChooses();
    else step2AIChoosesFirst();
  });
}

function pickMatchScenario(opponent) {
  let regionKey = 'LEC';
  if (state.international && state.international.event) {
    regionKey = 'International';
  } else if (state.season && state.season.region) {
    regionKey = state.season.region;
  }
  const w = SCENARIO_WEIGHTS_BY_REGION[regionKey] || SCENARIO_WEIGHTS_BY_REGION.LEC;
  const playerAvg = averageRosterLevel(state.roster);
  const oppAvg = averageRosterLevel(opponent.roster);
  const tierGap = Math.abs(playerAvg - oppAvg);

  // v1.5.3 — la proximité des deux équipes oriente le type de match :
  // équipes proches → matchs serrés (control/standard), gros écart → domination.
  let control = w.control, standard = w.standard, snowball = w.snowball,
      stomp = w.stomp, fiesta = w.fiesta;
  if (tierGap <= 3) {            // équipes très proches : matchs disputés
    control *= 1.5; standard *= 1.3; snowball *= 0.8; stomp *= 0.4; fiesta *= 0.7;
  } else if (tierGap <= 7) {     // léger avantage
    control *= 1.1; standard *= 1.1; stomp *= 0.8;
  } else if (tierGap <= 12) {    // écart marqué
    control *= 0.7; snowball *= 1.2; stomp *= 1.6;
  } else {                       // gros écart : domination probable
    control *= 0.4; standard *= 0.7; snowball *= 1.3; stomp *= 2.2; fiesta *= 1.2;
  }

  const items = [
    { id: 'control',  weight: control },
    { id: 'standard', weight: standard },
    { id: 'snowball', weight: snowball },
    { id: 'stomp',    weight: stomp },
    { id: 'fiesta',   weight: fiesta },
  ];
  return weightedChoice(items).id;
}

function startMatch(opponentTeamId) {
  const opponent = getTeamRef(opponentTeamId);
  if (!opponent) return;

  const scenario = pickMatchScenario(opponent);
  matchRuntime = {
    opponent,
    picks: getMatchPicks(opponent),
    scenario,
    scenarioCfg: MATCH_SCENARIOS[scenario],
    gameClock: 0,
    phase: 'early',
    score: { blue: 0, red: 0 },
    gold: { blue: 0, red: 0 },
    objectives: {
      dragons: { blue: 0, red: 0 },
      heralds: { blue: 0, red: 0 },
      barons: { blue: 0, red: 0 },
      grubs: { blue: 0, red: 0 },
      elders: { blue: 0, red: 0 }
    },
    structuresDown: { blue: [], red: [] },
    nexusWinner: null,
    dragonBuff: null,
    baronBuff: null,
    elderBuff: null,
    soulOwner: null,
    nextDragonTime: DRAGON_FIRST_SPAWN,
    nextBaronTime: BARON_SPAWN_TIME,
    nextElderTime: null,
    winProbability: computeBaseWinProbability(opponent),
    eventHistory: [],
    before: snapshotRosterStats(),
    speed: state.settings.speed || 2,
    paused: false,
    finished: false,
    timer: null
  };

  renderMatchArena();
  resetMatchMap(matchRuntime);
  restartMatchTimer();
}

// v1.7.3 — Maîtrise réelle de l'IA sur le champion pické : on lit la valeur
// alignée dans championPool/masteries (données data_teams.js). Un champion
// hors de son pool de confort → maîtrise réduite (l'IA est moins à l'aise),
// ce qui récompense le scouting et les bans ciblés en draft.
function getAiChampionMastery(player, champName) {
  if (!champName || !Array.isArray(player.championPool)) return 40;
  const idx = player.championPool.indexOf(champName);
  if (idx >= 0 && Array.isArray(player.masteries) && player.masteries[idx] != null) {
    return player.masteries[idx];
  }
  return 35; // hors pool de confort
}

function teamEventPower(side, category, role) {
  const rt = matchRuntime;
  const isPlayer = side === rt.picks.playerSide;
  const roster = isPlayer ? state.roster : rt.opponent.roster;
  const picks = rt.picks[side];
  const stakes = getMatchStakes();

  let players = role ? roster.filter((p) => p.role === role) : roster;
  if (players.length === 0) players = roster;

  let total = 0;
  let varianceMultiplier = 0;
  players.forEach((player) => {
    const champName = picks[player.role];
    const champion = getChampionByName(champName);
    let mastery;
    if (isPlayer) {
      const masteryEntry = getChampionMastery(player.id, champName);
      mastery = masteryEntry ? masteryEntry.mastery : 40;
    } else {
      mastery = getAiChampionMastery(player, champName);
    }
    const phasePower = champion ? champion.phasePower[rt.phase] : 5;

    let roleSkill;
    switch (category) {
      case 'lane': roleSkill = player.laning; break;
      case 'jungle': case 'macro': roleSkill = player.shotcalling; break;
      case 'teamfight': case 'dramatic': roleSkill = player.teamfight; break;
      case 'objective': roleSkill = champion ? champion.objectivePower * 10 : 50; break;
      default: roleSkill = player.mechanics;
    }

    const power = computePlayerChampionPower(player, { mastery, roleSkill, stakes, category });
    total += power / 10 + phasePower;
    varianceMultiplier += getVarianceMultiplier(player);
  });
  total /= players.length;
  varianceMultiplier /= players.length;

  if (role) {
    const enemySide = side === 'blue' ? 'red' : 'blue';
    const myChamp = getChampionByName(picks[role]);
    const enemyChamp = getChampionByName(rt.picks[enemySide][role]);
    const matchupBonus = BALANCE_CONFIG.power.matchupBonus;
    const counterBonusMax = BALANCE_CONFIG.power.counterBonusMax;
    if (myChamp && enemyChamp) {
      const myCounter = typeof getCounterEntry === 'function' ? getCounterEntry(myChamp.id, enemyChamp.id) : null;
      const enemyCounter = typeof getCounterEntry === 'function' ? getCounterEntry(enemyChamp.id, myChamp.id) : null;
      if (myCounter || enemyCounter) {
        if (myCounter) total += (myCounter.score / 100) * counterBonusMax;
        if (enemyCounter) total -= (enemyCounter.score / 100) * counterBonusMax;
      } else {
        // Repli tags (direction corrigée) : je contre l'ennemi si MES counterTags touchent SON profil
        if (enemyChamp.tags.some((t) => myChamp.counterTags.includes(t))) total += matchupBonus;
        if (myChamp.tags.some((t) => enemyChamp.counterTags.includes(t))) total -= matchupBonus;
      }
    }
  }

  // Snowball : l'équipe avec plus d'or gagne les events plus facilement.
  // v1.5.3 — adouci (±4 max) et modulé par le scénario : en "control" l'avance
  // pèse peu (comebacks possibles), en "stomp" elle fait boule de neige.
  const enemySide = side === 'blue' ? 'red' : 'blue';
  const goldLead = rt.gold[side] - rt.gold[enemySide];
  const snowballFactor = rt.scenarioCfg ? rt.scenarioCfg.snowballFactor : 1;
  total += clamp(goldLead / 3000, -4, 4) * snowballFactor;

  const variance = BALANCE_CONFIG.events.matchVariance;
  total += randomFloat(-variance, variance) * varianceMultiplier;
  return total;
}

function sideTeamLabel(side) {
  const rt = matchRuntime;
  return side === rt.picks.playerSide ? (state.teamShortName || state.teamName) : rt.opponent.shortName;
}

/* ------------------------------------------------------------------
   Structures de map : T1→T2→T3→INH par lane, puis NEX_T1+NEX_T2→NEXUS
   ------------------------------------------------------------------ */
const STRUCTURE_LABELS = {
  BOT_T1: 'Tour 1 (Bot)', BOT_T2: 'Tour 2 (Bot)', BOT_T3: 'Tour 3 (Bot)', BOT_INH: 'Inhibiteur (Bot)',
  MID_T1: 'Tour 1 (Mid)', MID_T2: 'Tour 2 (Mid)', MID_T3: 'Tour 3 (Mid)', MID_INH: 'Inhibiteur (Mid)',
  TOP_T1: 'Tour 1 (Top)', TOP_T2: 'Tour 2 (Top)', TOP_T3: 'Tour 3 (Top)', TOP_INH: 'Inhibiteur (Top)',
  NEX_T1: 'Tour du Nexus 1', NEX_T2: 'Tour du Nexus 2',
  NEXUS: 'Nexus'
};

function getStructureLabel(id) { return STRUCTURE_LABELS[id] || id; }

function getNextDestroyableStructure(side, rt) {
  const down = new Set(rt.structuresDown[side]);
  const TIER_REQ = { T2: 'T1', T3: 'T2', INH: 'T3' };
  const lanes = ['BOT', 'MID', 'TOP'];
  const shuffled = lanes.slice().sort(() => Math.random() - 0.5);

  for (const lane of shuffled) {
    for (const tier of ['T1', 'T2', 'T3', 'INH']) {
      const id = `${lane}_${tier}`;
      if (down.has(id)) continue;
      if (tier === 'T1' || down.has(`${lane}_${TIER_REQ[tier]}`)) return id;
      break; // lane bloquée, essayer la suivante
    }
  }
  // Tours et Nexus (nécessitent au moins 1 inhibiteur)
  const hasInh = ['BOT_INH', 'MID_INH', 'TOP_INH'].some(id => down.has(id));
  if (hasInh) {
    if (!down.has('NEX_T1')) return 'NEX_T1';
    if (!down.has('NEX_T2')) return 'NEX_T2';
    if (down.has('NEX_T1') && down.has('NEX_T2') && !down.has('NEXUS')) return 'NEXUS';
  }
  return null;
}

function structureTowerCount(side, rt) {
  return rt.structuresDown[side].filter(id => id.endsWith('_T1') || id.endsWith('_T2') || id.endsWith('_T3') || id === 'NEX_T1' || id === 'NEX_T2').length;
}

function buildEventText(template, winnerLabel, role, kills) {
  switch (template.id) {
    case 'lane_kill': return `${winnerLabel} remporte un duel en lane (${ROLE_NAMES[role]}) et prend l'avantage.`;
    case 'gank': return `${winnerLabel} reussit un gank et obtient un kill.`;
    case 'dragon': return `${winnerLabel} prend le Dragon.`;
    case 'herald': return `${winnerLabel} prend l'Herald de la Faille.`;
    case 'grubs': return `${winnerLabel} prend le controle des Void Grubs.`;
    case 'tower': {
      const rt = matchRuntime;
      const struct = rt ? rt._lastStructure : null;
      if (struct === 'NEXUS') return `${winnerLabel} détruit le NEXUS et remporte la partie !`;
      if (struct && struct.endsWith('_INH')) return `${winnerLabel} détruit ${getStructureLabel(struct)} !`;
      return struct ? `${winnerLabel} détruit ${getStructureLabel(struct)}.` : `${winnerLabel} fait tomber une tour.`;
    }
    case 'teamfight': return `${winnerLabel} gagne un teamfight (${kills} kills) !`;
    case 'baron': return `${winnerLabel} prend le Baron Nashor !`;
    case 'elder': return `${winnerLabel} terrasse le Dragon Ancien (Elder) !`;
    case 'dramatic': return `${winnerLabel} réalisé une action decisive en fin de partie !`;
    default: return `${winnerLabel} prend l'avantage.`;
  }
}

function isObjectiveAvailable(eventTemplate, rt) {
  if (eventTemplate.objective === 'dragons') {
    return !rt.soulOwner && rt.gameClock >= rt.nextDragonTime;
  }
  if (eventTemplate.objective === 'elders') {
    return !!rt.soulOwner && rt.nextElderTime !== null && rt.gameClock >= rt.nextElderTime;
  }
  if (eventTemplate.objective === 'grubs') {
    // Avenant v1.1 5.1 : spawn unique a 08:00, pas de respawn.
    const total = rt.objectives.grubs.blue + rt.objectives.grubs.red;
    return rt.gameClock >= GRUBS_SPAWN_TIME && total < MATCH_GRUBS_TOTAL;
  }
  if (eventTemplate.objective === 'heralds') {
    // Avenant v1.1 5.2 : spawn unique a 14:00, despawn a 19:55 sans respawn.
    const total = rt.objectives.heralds.blue + rt.objectives.heralds.red;
    return total === 0 && rt.gameClock >= HERALD_SPAWN_TIME && rt.gameClock <= HERALD_DESPAWN_TIME;
  }
  if (eventTemplate.objective === 'barons') {
    return rt.gameClock >= rt.nextBaronTime;
  }
  return true;
}

function getEventGold(template, kills, struct) {
  let gold = kills * 300;
  if (template.objective === 'dragons') gold += 250;
  else if (template.objective === 'barons') gold += 300;
  else if (template.objective === 'heralds') gold += 150;
  else if (template.objective === 'grubs') gold += 100;
  else if (template.objective === 'elders') gold += 500;
  else if (template.objective === 'towers' && struct) {
    if (struct.endsWith('_T1')) gold += 160;
    else if (struct.endsWith('_T2')) gold += 250;
    else if (struct.endsWith('_T3') || struct.startsWith('NEX_')) gold += 125;
    else if (struct.endsWith('_INH')) gold += 200;
  }
  if (gold === 0) gold = 80;
  return gold;
}

function simulateTick() {
  const rt = matchRuntime;
  if (!rt || rt.finished) return;

  rt.gameClock += randomChoice([20, 25, 30, 35, 45]);
  rt.phase = rt.gameClock < MATCH_PHASE_THRESHOLDS.early ? 'early' : (rt.gameClock < MATCH_PHASE_THRESHOLDS.mid ? 'mid' : 'late');

  let candidates = MATCH_EVENTS.filter((e) => e.phases.includes(rt.phase) && isObjectiveAvailable(e, rt));
  if (candidates.length === 0) candidates = MATCH_EVENTS.filter((e) => e.phases.includes(rt.phase) && !['dragons', 'elders', 'grubs', 'heralds'].includes(e.objective));

  const cfg = rt.scenarioCfg;
  const dramaticWeight = BALANCE_CONFIG.events.dramaticWeight[getMatchStakes()];
  // Le nexus d'un camp est sur le point de tomber (inhib + 2 tours nexus down) ?
  const nexusImminent = ['blue', 'red'].some((s) => {
    const d = new Set(rt.structuresDown[s]);
    return d.has('NEX_T1') && d.has('NEX_T2') && ['BOT_INH', 'MID_INH', 'TOP_INH'].some((i) => d.has(i)) && !d.has('NEXUS');
  });
  const goldDiff = Math.abs(rt.gold.blue - rt.gold.red);
  candidates = candidates.map((e) => {
    let w = e.weight;
    if (e.id === 'dramatic' && dramaticWeight != null) return { ...e, weight: dramaticWeight };
    // Scénario : modifie le poids des events de kills en lane/jungle
    if (e.category === 'lane' || e.category === 'jungle') w *= cfg.killWeightMult;
    // Grand écart de gold → l'équipe menée joue défensif : moins de kills, plus de tours/objectifs
    if (goldDiff > 3000) {
      if (['lane', 'jungle', 'teamfight'].includes(e.category)) w *= goldDiff > 5000 ? 0.55 : 0.75;
      if (e.category === 'macro') w *= 1.4;
    }
    // Tours en late / nexus imminent
    if (e.id === 'tower' && (nexusImminent || rt.phase === 'late')) w *= nexusImminent ? 5 : 2;
    return { ...e, weight: Math.max(0.1, w) };
  });

  const template = weightedChoice(candidates);

  let role = null;
  if (template.category === 'lane') role = randomChoice(['TOP', 'MID', 'ADC']);
  if (template.category === 'jungle') role = 'JUNGLE';

  const bluePower = teamEventPower('blue', template.category, role);
  const redPower = teamEventPower('red', template.category, role);
  // v1.5.3 — résolution PROBABILISTE : l'écart de puissance se traduit en
  // probabilité via une sigmoïde, au lieu d'un vainqueur déterministe. Équipes
  // proches → ~50/50 (match serré, retournements) ; gros écart → favori dominant.
  // La "raideur" (decisiveness) dépend du scénario : faible = domination,
  // élevée = chaos type fiesta.
  const powerGap = bluePower - redPower;
  const decisiveness = cfg.decisiveness || 5;
  const blueWinProb = 1 / (1 + Math.exp(-powerGap / decisiveness));
  const winner = Math.random() < blueWinProb ? 'blue' : 'red';
  const diff = Math.abs(powerGap);

  let kills = 0;
  if (['lane', 'jungle', 'teamfight', 'dramatic'].includes(template.category)) {
    const totalKills = rt.score.blue + rt.score.red;
    const isTF = template.category === 'teamfight' || template.category === 'dramatic';
    // Plafond de kills combiné : scénario × horloge de jeu
    const minuteNow = rt.gameClock / 60;
    const capIdx = minuteNow < 10 ? 0 : minuteNow < 15 ? 1 : minuteNow < 20 ? 2 : 3;
    const timeCap = cfg.killCapByMin[capIdx] ?? cfg.maxKills;
    const effectiveCap = Math.min(cfg.maxKills, timeCap);
    if (totalKills < effectiveCap) {
      const desiredKills = isTF ? randomInt(1, cfg.maxKillsPerTF) : 1;
      kills = Math.max(0, Math.min(desiredKills, effectiveCap - totalKills));
    } else if (isTF) {
      kills = 1; // teamfight sans kill n'existe pas
    }
    rt.score[winner] += kills;
  }

  rt._lastStructure = null;
  if (template.objective === 'towers') {
    const loser = winner === 'blue' ? 'red' : 'blue';
    const nextStruct = getNextDestroyableStructure(loser, rt);
    if (nextStruct) {
      rt.structuresDown[loser].push(nextStruct);
      rt._lastStructure = nextStruct;
      if (nextStruct === 'NEXUS') {
        rt.finished = true;
        rt.endReason = 'nexus';
        rt.nexusWinner = winner;
      }
    }
  }

  let eventGold = getEventGold(template, kills, rt._lastStructure);
  // v1.5.3 — shutdown gold : quand l'équipe menée gagne un fait d'armes, elle
  // touche une prime de comeback (équivalent des primes de la vraie LoL). Les
  // avances ne sont plus définitives → retournements et matchs plus vivants.
  if (kills > 0) {
    const winnerLead = rt.gold[winner] - rt.gold[winner === 'blue' ? 'red' : 'blue'];
    if (winnerLead < -2000) {
      eventGold += Math.min(Math.abs(winnerLead) * 0.12, 600);
    }
  }
  rt.gold[winner] += Math.round(eventGold);

  if (template.objective && template.objective !== 'towers') {
    const grubsExhausted = template.objective === 'grubs' && (rt.objectives.grubs.blue + rt.objectives.grubs.red) >= MATCH_GRUBS_TOTAL;
    if (!grubsExhausted) {
      rt.objectives[template.objective][winner]++;
      if (template.objective === 'dragons') {
        rt.dragonBuff = { side: winner, expiresAt: rt.gameClock + DRAGON_BUFF_DURATION };
        rt.nextDragonTime = rt.gameClock + DRAGON_RESPAWN;
        if (rt.objectives.dragons[winner] >= DRAGON_SOUL_COUNT) {
          rt.soulOwner = winner;
          rt.nextElderTime = rt.gameClock + ELDER_RESPAWN;
        }
      }
      if (template.objective === 'barons') {
        rt.baronBuff = { side: winner, expiresAt: rt.gameClock + BARON_BUFF_DURATION };
        rt.nextBaronTime = rt.gameClock + BARON_RESPAWN;
      }
      if (template.objective === 'elders') {
        rt.elderBuff = { side: winner, expiresAt: rt.gameClock + ELDER_BUFF_DURATION };
        rt.nextElderTime = rt.gameClock + ELDER_RESPAWN;
      }
    }
  }

  rt.winProbability = clamp(rt.winProbability + (winner === 'blue' ? diff : -diff) * 0.01, 0.05, 0.95);

  const text = buildEventText(template, sideTeamLabel(winner), role, kills);
  rt.eventHistory.push({ category: template.category, text, dramatic: template.category === 'dramatic', side: winner });

  const mapEvent = buildMapEvent(template, role, winner, text, diff, rt);
  triggerMapEvent(mapEvent);
  updateMapObjectives(rt);

  renderMatchEvent(text, template.category);
  updateMatchScoreboard();

  if (!rt.finished && rt.gameClock >= MATCH_SOFT_TIME_LIMIT) {
    rt.finished = true;
    rt.endReason = 'time_limit';
  }
  if (rt.finished) finishMatch();
}

function renderMatchEvent(text, category) {
  const log = document.getElementById('match-log');
  if (!log) return;
  let variant = 'normal';
  if (category === 'objective' || category === 'macro') variant = 'objective';
  if (category === 'teamfight') variant = 'danger';
  if (category === 'dramatic') variant = 'dramatic';

  const entry = document.createElement('div');
  entry.className = `log-entry log-entry--${variant}`;
  entry.textContent = `[${formatClock(matchRuntime.gameClock)}] ${text}`;
  log.appendChild(entry);
  log.scrollTop = log.scrollHeight;
}

function updateMatchScoreboard() {
  const rt = matchRuntime;
  if (!rt) return;
  const scoreEl = document.getElementById('match-score');
  if (scoreEl) scoreEl.textContent = `${rt.score.blue} - ${rt.score.red}`;

  const goldDiffEl = document.getElementById('match-gold-diff');
  if (goldDiffEl) {
    const diff = rt.gold.blue - rt.gold.red;
    if (diff === 0) {
      goldDiffEl.textContent = '';
      goldDiffEl.className = 'scoreboard__gold-diff';
    } else {
      const leader = diff > 0 ? 'blue' : 'red';
      const abs = Math.round(Math.abs(diff));
      const formatted = abs >= 1000 ? `${(abs / 1000).toFixed(1)}k` : String(abs);
      goldDiffEl.textContent = `+${formatted}g`;
      goldDiffEl.className = `scoreboard__gold-diff scoreboard__gold-diff--${leader}`;
    }
  }

  const structureProgress = Math.max(rt.structuresDown.blue.length, rt.structuresDown.red.length);
  const pct = clamp((structureProgress / 15) * 100, 0, 100);
  const fillEl = document.getElementById('match-time-fill');
  if (fillEl) fillEl.style.width = `${pct}%`;

  const currentEl = document.getElementById('match-time-current');
  if (currentEl) currentEl.textContent = formatClock(rt.gameClock);
  const totalEl = document.getElementById('match-time-total');
  if (totalEl) totalEl.textContent = MATCH_PHASE_LABELS[rt.phase];

  updateMatchObjectivesPanel();
}

function setMatchObjectiveText(id, text, sideClass) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  el.className = sideClass ? `match-objectives__value ${sideClass}` : 'match-objectives__value';
}

function updateMatchObjectivesPanel() {
  const rt = matchRuntime;
  if (!rt) return;

  const dragonsBlueEl = document.getElementById('match-obj-dragons-blue');
  if (dragonsBlueEl) dragonsBlueEl.textContent = rt.objectives.dragons.blue;
  const dragonsRedEl = document.getElementById('match-obj-dragons-red');
  if (dragonsRedEl) dragonsRedEl.textContent = rt.objectives.dragons.red;

  const grubsBlueEl = document.getElementById('match-obj-grubs-blue');
  if (grubsBlueEl) grubsBlueEl.textContent = rt.objectives.grubs.blue;
  const grubsRedEl = document.getElementById('match-obj-grubs-red');
  if (grubsRedEl) grubsRedEl.textContent = rt.objectives.grubs.red;

  if (rt.soulOwner) {
    setMatchObjectiveText('match-obj-soul', sideTeamLabel(rt.soulOwner), `side-${rt.soulOwner}`);
  } else {
    setMatchObjectiveText('match-obj-soul', '-');
  }

  const baronBuffRemaining = rt.baronBuff ? rt.baronBuff.expiresAt - rt.gameClock : 0;
  if (baronBuffRemaining > 0) {
    setMatchObjectiveText('match-obj-baron-buff', `${sideTeamLabel(rt.baronBuff.side)} - ${formatClock(baronBuffRemaining)}`, `side-${rt.baronBuff.side}`);
  } else {
    setMatchObjectiveText('match-obj-baron-buff', '-');
  }

  const elderBuffRemaining = rt.elderBuff ? rt.elderBuff.expiresAt - rt.gameClock : 0;
  if (elderBuffRemaining > 0) {
    setMatchObjectiveText('match-obj-elder-buff', `${sideTeamLabel(rt.elderBuff.side)} - ${formatClock(elderBuffRemaining)}`, `side-${rt.elderBuff.side}`);
  } else {
    setMatchObjectiveText('match-obj-elder-buff', '-');
  }
}

function restartMatchTimer() {
  const rt = matchRuntime;
  if (!rt) return;
  if (rt.timer) clearInterval(rt.timer);
  if (rt.paused || rt.finished) return;
  rt.timer = setInterval(simulateTick, 1400 / rt.speed);
}

function setMatchSpeed(speed) {
  if (!matchRuntime) return;
  matchRuntime.speed = speed;
  state.settings.speed = speed;
  document.querySelectorAll('#match-speed-selector .speed-btn').forEach((btn) => {
    btn.classList.toggle('speed-btn--active', Number(btn.dataset.speed) === speed);
  });
  restartMatchTimer();
}

function togglePauseMatch() {
  const rt = matchRuntime;
  if (!rt || rt.finished) return;
  rt.paused = !rt.paused;
  const btn = document.getElementById('btn-pause-match');
  if (btn) btn.textContent = rt.paused ? 'Reprendre' : 'Pause';
  restartMatchTimer();
}

function applyMatchOutcome(win) {
  const rt = matchRuntime;
  const resultFactor = win ? 1.15 : 0.9;

  state.roster.forEach((player) => {
    player.fatigue = clamp(player.fatigue + 18, 0, 100);
    player.form = clamp(player.form + (win ? 3 : -2), 0, 100);
    player.mental = clamp(player.mental + (win ? 1 : -1), 0, 100);

    const champName = rt.picks[rt.picks.playerSide][player.role];
    const champion = getChampionByName(champName);
    if (champion) {
      const entry = ensureChampionMasteryEntry(player.id, champion);
      const gain = Math.round(6 * potentialMultiplier(player) * diminishingReturns(entry.mastery) * fatiguePenaltyFactor(player) * resultFactor);
      entry.mastery = clamp(entry.mastery + gain, 0, 100);
      entry.xp += gain * 20;
      entry.confidence = clamp(entry.confidence + (win ? 4 : -3), 0, 100);
      entry.stageReady = entry.mastery >= 50;
      if (!player.championPool.includes(champion.name)) player.championPool.push(champion.name);
    }
  });

  state.resources.coachingPoints = clamp(state.resources.coachingPoints + (win ? 15 : 8), 0, 999);
  // Pas de gain de budget par match — revenus uniquement via classement fin de saison / MSI / Worlds
  if (win) state.resources.prestige += 1;

  return snapshotRosterStats();
}

function buildMatchReport(opponent, win, before, after, eventHistory) {
  const lines = [];
  lines.push(`Match ${win ? 'remporte' : 'perdu'} contre ${opponent.name}.`);

  const dramaticEvents = eventHistory.filter((e) => e.dramatic);
  if (dramaticEvents.length) {
    lines.push(`Moment cle : ${dramaticEvents[dramaticEvents.length - 1].text}`);
  }

  const focusStats = OBJECTIVE_STAT_FOCUS.free_scrim;
  if (!win) {
    const weak = pickWeakLink(focusStats);
    if (weak) {
      lines.push(`Analyse : ${weak.player.name} a montre des difficultés en ${STAT_LABELS[weak.statKey]} (${weak.value}/100), un facteur cle de la défaite.`);
    }
  } else {
    const strong = pickStrongLink(focusStats);
    if (strong) {
      lines.push(`Analyse : ${strong.player.name} a porte l'équipe grace a son niveau en ${STAT_LABELS[strong.statKey]} (${strong.value}/100).`);
    }
  }

  const deltaLines = [];
  state.roster.forEach((p) => {
    const b = before[p.id], a = after[p.id];
    Object.keys(STAT_LABELS).forEach((key) => {
      if (a[key] !== b[key]) {
        const diff = a[key] - b[key];
        deltaLines.push(`${p.name} : ${STAT_LABELS[key]} ${diff > 0 ? '+' : ''}${diff} (${b[key]} -> ${a[key]})`);
      }
    });
  });
  if (deltaLines.length) {
    lines.push('Evolution des stats :');
    lines.push(...deltaLines);
  }

  return lines;
}

function finishMatch() {
  const rt = matchRuntime;
  if (rt.timer) clearInterval(rt.timer);

  // Le vainqueur découle de l'état de la partie (cohérence écran) : nexus détruit avant tout,
  // sinon (garde-fou de temps) avance structurelle, puis or, puis kills.
  let winnerSide;
  if (rt.nexusWinner) {
    winnerSide = rt.nexusWinner;
  } else {
    const blueDestroyed = rt.structuresDown.red.length; // structures rouges tombées = détruites par blue
    const redDestroyed = rt.structuresDown.blue.length;
    if (blueDestroyed !== redDestroyed) winnerSide = blueDestroyed > redDestroyed ? 'blue' : 'red';
    else if (rt.gold.blue !== rt.gold.red) winnerSide = rt.gold.blue > rt.gold.red ? 'blue' : 'red';
    else if (rt.score.blue !== rt.score.red) winnerSide = rt.score.blue > rt.score.red ? 'blue' : 'red';
    else winnerSide = Math.random() < 0.5 ? 'blue' : 'red';
  }

  const win = winnerSide === rt.picks.playerSide;
  rt.result = win ? 'win' : 'loss';
  rt.winner = winnerSide;

  const after = applyMatchOutcome(win);
  rt.report = buildMatchReport(rt.opponent, win, rt.before, after, rt.eventHistory);

  const playerScore = rt.score[rt.picks.playerSide];
  const opponentScore = rt.score[rt.picks.playerSide === 'blue' ? 'red' : 'blue'];

  const series = state.matchSeries;

  if (!state.scouting[rt.opponent.id]) state.scouting[rt.opponent.id] = { confidence: 0, scrimsPlayed: 0 };
  state.scouting[rt.opponent.id].confidence = clamp(state.scouting[rt.opponent.id].confidence + VIDEO_REVIEW_CONFIDENCE_GAIN, 0, 100);

  // Garde-fou CDC 13.1.2 : le repos post-match attenue la fatigué accumulee
  state.roster.forEach((player) => {
    player.fatigue = clamp(player.fatigue - BALANCE_CONFIG.fatigue.matchRecovery, 0, 100);
  });

  state.matchHistory.unshift({
    date: Date.now(),
    competition: series ? series.context : 'Scrim',
    opponent: rt.opponent.name,
    scoreHome: playerScore,
    scoreAway: opponentScore,
    result: rt.result
  });
  if (state.matchHistory.length > 30) state.matchHistory.length = 30;

  const p = state.progress;
  p.matchesPlayed++;
  if (win) {
    p.wins++;
    p.currentWinStreak++;
    p.bestWinStreak = Math.max(p.bestWinStreak, p.currentWinStreak);
  } else {
    p.losses++;
    p.currentWinStreak = 0;
  }

  // Différentiel d'or réel de la game, du point de vue du joueur
  const opponentMapSide = rt.picks.playerSide === 'blue' ? 'red' : 'blue';
  const gameGoldDiff = rt.gold[rt.picks.playerSide] - rt.gold[opponentMapSide];

  rt.seriesEvent = null;
  if (series) {
    if (win) series.scoreFor++; else series.scoreAgainst++;
    series.goldDiffTotal = (series.goldDiffTotal || 0) + gameGoldDiff;
    const winsNeeded = series.format === 'BO3' ? 2 : (series.format === 'BO5' ? 3 : 1);
    if (series.scoreFor >= winsNeeded || series.scoreAgainst >= winsNeeded) {
      rt.seriesEvent = { type: 'done', won: series.scoreFor >= winsNeeded, scoreFor: series.scoreFor, scoreAgainst: series.scoreAgainst, goldDiffTotal: series.goldDiffTotal, format: series.format };
      state.matchSeries = null;
      state.draft = null;
    } else {
      series.gameNumber++;
      rt.seriesEvent = { type: 'next', gameNumber: series.gameNumber };
      state.draft = null;
    }
  }

  if (rt.seriesEvent && rt.seriesEvent.type === 'done' && state.season && state.season.pendingMatch) {
    resolveSeasonSeries(rt);
  } else if (rt.seriesEvent && rt.seriesEvent.type === 'done' && state.international && state.international.pendingMatch) {
    resolveInternationalSeries(rt);
  }

  saveGame();
  updateResourceBar();
  renderMatchEvent(win ? 'Victoire ! GG.' : 'Défaite. GG.', 'dramatic');

  const pauseBtn = document.getElementById('btn-pause-match');
  if (pauseBtn) {
    if (rt.seriesEvent && rt.seriesEvent.type === 'next') {
      pauseBtn.textContent = `Draft Game ${rt.seriesEvent.gameNumber}`;
    } else if (rt.seriesEvent && rt.seriesEvent.type === 'done') {
      pauseBtn.textContent = rt.seriesEvent.won
        ? `Serie remportee (${rt.seriesEvent.scoreFor}-${rt.seriesEvent.scoreAgainst})`
        : `Serie perdue (${rt.seriesEvent.scoreFor}-${rt.seriesEvent.scoreAgainst})`;
    } else {
      pauseBtn.textContent = 'Retour';
    }
  }
  showScrimReportModal(rt.report);
}

function renderMatchArena() {
  const setupEl = document.getElementById('match-setup');
  const arenaEl = document.getElementById('match-arena');
  if (!setupEl || !arenaEl) return;
  setupEl.style.display = 'none';
  arenaEl.style.display = '';

  const rt = matchRuntime;
  const playerMapSide = rt.picks.playerSide; // rt.picks est clé par côté de carte
  const blueLabel = playerMapSide === 'blue' ? (state.teamName || 'Votre équipe') : rt.opponent.name;
  const redLabel = playerMapSide === 'red' ? (state.teamName || 'Votre équipe') : rt.opponent.name;

  document.getElementById('match-team-home-name').textContent = blueLabel;
  document.getElementById('match-team-home-league').textContent = playerMapSide === 'blue' ? (state.region || '') : rt.opponent.region;
  document.getElementById('match-team-away-name').textContent = redLabel;
  document.getElementById('match-team-away-league').textContent = playerMapSide === 'red' ? (state.region || '') : rt.opponent.region;

  const seriesLabelEl = document.getElementById('match-series-label');
  if (seriesLabelEl) {
    const series = state.matchSeries;
    seriesLabelEl.textContent = series
      ? `${series.format} - Game ${series.gameNumber} (score de la serie : ${series.scoreFor}-${series.scoreAgainst})`
      : '';
  }

  document.getElementById('match-log').innerHTML = '';

  document.querySelectorAll('#match-speed-selector .speed-btn').forEach((btn) => {
    btn.classList.toggle('speed-btn--active', Number(btn.dataset.speed) === rt.speed);
    btn.onclick = () => setMatchSpeed(Number(btn.dataset.speed));
  });

  updateMatchObjectivesPanel();

  const pauseBtn = document.getElementById('btn-pause-match');
  pauseBtn.textContent = 'Pause';
  pauseBtn.onclick = () => {
    const finishedRt = matchRuntime;
    if (finishedRt.finished) {
      if (finishedRt.seriesEvent && finishedRt.seriesEvent.type === 'next') {
        const opponentId = finishedRt.opponent.id;
        const playerWonGame = finishedRt.picks.playerSide === finishedRt.winner;
        matchRuntime = null;
        showSeriesGameModal(opponentId, playerWonGame);
      } else if (finishedRt.seriesEvent && finishedRt.seriesEvent.returnToCalendar) {
        matchRuntime = null;
        showView('calendar');
      } else {
        matchRuntime = null;
        renderMatchSetup();
      }
    } else {
      togglePauseMatch();
    }
  };

  updateMatchScoreboard();
}

function renderMatchSetup() {
  const setupEl = document.getElementById('match-setup');
  const arenaEl = document.getElementById('match-arena');
  if (!setupEl || !arenaEl) return;

  if (matchRuntime) {
    renderMatchArena();
    return;
  }

  arenaEl.style.display = 'none';
  setupEl.style.display = '';

  if (state.roster.length === 0) {
    setupEl.innerHTML = `
      <h2 class="panel-title">Préparer un match</h2>
      <p id="match-setup-message" class="card__count" style="margin-bottom: 12px;">Constituez votre roster avant de lancer un match.</p>
    `;
    return;
  }

  if (state.matchSeries) {
    const series = state.matchSeries;
    const opponent = getTeamRef(series.opponentTeamId);
    setupEl.innerHTML = `
      <h2 class="panel-title">Serie en cours</h2>
      <p id="match-setup-message" class="card__count" style="margin-bottom: 12px;">
        ${series.format} contre ${opponent.name} &mdash; score ${series.scoreFor}-${series.scoreAgainst}, Game ${series.gameNumber}.
      </p>
      ${scoutingPreviewHtml(series.opponentTeamId)}
      <div class="training-form__actions">
        <button class="btn-primary" id="btn-resume-series">Continuer la serie</button>
      </div>
    `;
    const resumeBtn = document.getElementById('btn-resume-series');
    if (resumeBtn) {
      resumeBtn.addEventListener('click', () => {
        if (!state.draft) {
          const nextPickOrder = series.gameNumber % 2 === 1 ? 'blue' : 'red';
          startDraft(series.opponentTeamId, nextPickOrder, nextPickOrder);
        }
        showView('draft');
      });
    }
    return;
  }

  const opponents = getAITeamsForRegion(state.region).filter((t) => t.id !== state.aiTeamId);

  setupEl.innerHTML = `
    <h2 class="panel-title">Préparer un match</h2>
    <p id="match-setup-message" class="card__count" style="margin-bottom: 12px;">
      Chaque match commencé par une draft. Les picks influencent directement le deroulement de la partie.
    </p>
    <div class="training-form">
      <div class="training-form__group">
        <label>ADVERSAIRE</label>
        <select id="match-opponent">
          ${opponents.map((t) => `<option value="${t.id}">${t.name} (${t.shortName})</option>`).join('')}
        </select>
      </div>
      <div class="training-form__group">
        <label>FORMAT</label>
        <select id="match-format">
          <option value="BO1">BO1</option>
          <option value="BO3">BO3</option>
          <option value="BO5">BO5</option>
        </select>
      </div>
      <div class="training-form__group">
        <label>FEARLESS DRAFT</label>
        <select id="match-fearless">
          <option value="off">Désactivé</option>
          <option value="on">Active (champions verrouilles entre les games)</option>
        </select>
      </div>
    </div>
    <div class="training-form__actions">
      <button class="btn-primary" id="btn-start-match">Commencer la serie (Draft)</button>
    </div>
    <div id="match-scouting-preview"></div>
  `;

  const opponentSelect = document.getElementById('match-opponent');
  const scoutingPreviewEl = document.getElementById('match-scouting-preview');

  function updateScoutingPreview() {
    if (scoutingPreviewEl && opponentSelect) {
      scoutingPreviewEl.innerHTML = scoutingPreviewHtml(opponentSelect.value);
    }
  }

  if (opponentSelect) {
    opponentSelect.addEventListener('change', updateScoutingPreview);
    updateScoutingPreview();
  }

  const startBtn = document.getElementById('btn-start-match');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      const opponentId = document.getElementById('match-opponent').value;
      const format = document.getElementById('match-format').value;
      const fearlessMode = document.getElementById('match-fearless').value;
      startMatchSeries(opponentId, format, fearlessMode);
    });
  }
}

function scoutingPreviewHtml(opponentId) {
  const team = getTeamRef(opponentId);
  if (!team) return '';
  const report = getScoutingReport(opponentId);
  const tier = getScoutingTier(report.confidence);
  const topChamps = getTeamTopChampions(team);
  const tierLabel = { basic: 'Basique', advanced: 'Avance', premium: 'Premium' }[tier];

  let html = `
    <div class="scouting-preview-panel">
      <h4 class="panel-title">Scouting — ${team.name} <span class="result-tag" style="font-size:11px;padding:2px 6px;">${tierLabel} ${report.confidence}/100</span></h4>
      <p>Style : ${formatStyle(team.style)} &bull; Niveau moyen : ${getTeamAverageLevel(team)}/100 &bull; Champions cles : ${topChamps.join(', ')}</p>
  `;

  if (tier === 'advanced' || tier === 'premium') {
    const weak = getTeamWeakestRole(team);
    const topBan = (team.draftProfile && team.draftProfile.banPriorities || [])[0];
    html += `<p>Faiblesse : ${ROLE_NAMES[weak.role]} (${weak.player.name}, moy. ${weak.score}/100) &bull; Ban prioritaire : ${topBan || '?'}</p>`;
  } else {
    html += `<p class="card__count" style="font-size:12px;">Atteignez 40+ de confiance scouting pour débloquer les priorites de draft et faiblesses.</p>`;
  }

  html += `</div>`;
  return html;
}

/* ------------------------------------------------------------
   Ecran Counters (matchups de champions)
   ------------------------------------------------------------ */

/* Renvoie l'entrée du fichier de counters où `counterId` contre `targetId`
   (c.-à-d. counterId a l'avantage sur targetId), ou null. Source de vérité :
   data_counters.js (issu de l'Excel des counters). */
function getCounterEntry(counterId, targetId) {
  if (typeof CHAMPION_COUNTERS === 'undefined') return null;
  return CHAMPION_COUNTERS.find((e) => e.counter === counterId && e.target === targetId) || null;
}

/* ------------------------------------------------------------
   Ecran Champions : liste filtrable + fiche detaillee (v1.6.0)
   ------------------------------------------------------------ */
let championsView = { role: '', selected: null };

function renderChampions() {
  const el = document.getElementById('champions-content');
  if (!el) return;
  if (typeof CHAMPIONS === 'undefined') {
    el.innerHTML = '<div class="empty-state">Donnees des champions indisponibles.</div>';
    return;
  }
  if (championsView.selected) {
    renderChampionDetail(el, championsView.selected);
  } else {
    renderChampionsList(el);
  }
}

function renderChampionsList(el) {
  const roles = ['', 'TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'];
  const roleLabels = { '': 'Tous', TOP: 'TOP', JUNGLE: 'JUNGLE', MID: 'MID', ADC: 'ADC', SUPPORT: 'SUPPORT' };
  const searchInput = document.getElementById('champions-search');
  const search = (searchInput ? searchInput.value : '').trim().toLowerCase();

  const filterHtml = roles.map((r) =>
    `<button class="comp-tag-option ${championsView.role === r ? 'comp-tag-option--active' : ''}" data-champ-role="${r}">${roleLabels[r]}</button>`
  ).join('');

  const list = CHAMPIONS.filter((c) => {
    if (championsView.role && c.role !== championsView.role && !(c.secondaryRoles || []).includes(championsView.role)) return false;
    if (search && !c.name.toLowerCase().includes(search)) return false;
    return true;
  }).slice().sort((a, b) => a.name.localeCompare(b.name));

  const cardsHtml = list.length ? list.map((c) => `
    <button class="champ-card" data-champ-id="${c.id}">
      <span class="champ-card__name">${c.name}</span>
      <span class="champ-card__role champ-card__role--${c.role}">${c.role}</span>
      <span class="champ-card__tags">${(c.tags || []).slice(0, 3).join(' · ') || '—'}</span>
    </button>
  `).join('') : '<div class="empty-state">Aucun champion ne correspond.</div>';

  el.innerHTML = `
    <div class="draft-role-filter">${filterHtml}</div>
    <p class="card__count">${list.length} champion${list.length > 1 ? 's' : ''}</p>
    <div class="champ-grid">${cardsHtml}</div>
  `;

  el.querySelectorAll('[data-champ-role]').forEach((btn) => btn.addEventListener('click', () => {
    championsView.role = btn.dataset.champRole;
    renderChampions();
  }));
  el.querySelectorAll('[data-champ-id]').forEach((btn) => btn.addEventListener('click', () => {
    championsView.selected = btn.dataset.champId;
    renderChampions();
  }));
}

function renderChampionDetail(el, champId) {
  const c = getChampionById(champId);
  if (!c) { championsView.selected = null; renderChampionsList(el); return; }

  const counters = (typeof getCountersFor === 'function' ? getCountersFor(c.id) : CHAMPION_COUNTERS.filter((e) => e.counter === c.id))
    .slice().sort((a, b) => b.score - a.score);
  const counteredBy = (typeof getCounteredBy === 'function' ? getCounteredBy(c.id) : CHAMPION_COUNTERS.filter((e) => e.target === c.id))
    .slice().sort((a, b) => b.score - a.score);

  const chips = (arr) => (arr && arr.length)
    ? arr.map((t) => `<span class="champ-chip">${t}</span>`).join('')
    : '<span class="champ-chip champ-chip--empty">—</span>';
  const stat = (val, label) => `<div class="stat-card"><div class="stat-card__value">${val}</div><div class="stat-card__label">${label}</div></div>`;
  const roleLine = [c.role].concat(c.secondaryRoles || []).join(' / ');

  const counterRow = (e, mode) => {
    const otherId = mode === 'counter' ? e.target : e.counter;
    const other = getChampionById(otherId);
    const otherName = other ? other.name : otherId;
    const otherRole = mode === 'counter' ? e.targetRole : e.counterRole;
    const confClass = `counter-confidence--${(e.confidence || '').toLowerCase()}`;
    return `<button class="counter-row counter-row--link" data-champ-id="${otherId}">
      <div class="counter-row__main">
        <span><strong>${otherName}</strong> <span class="champ-card__role champ-card__role--${otherRole}">${otherRole}</span></span>
        <span class="counter-row__score ${confClass}">${e.score} · ${e.confidence}</span>
      </div>
      <div class="counter-row__tags">Tags communs : ${(e.matchedTags || []).join(', ') || '-'}</div>
      <div class="counter-row__reason">${e.gameplayReason || ''}</div>
    </button>`;
  };

  el.innerHTML = `
    <button class="btn-back" id="champ-detail-back">← Retour</button>
    <div class="panel">
      <div class="champ-detail__head">
        <h3 class="panel-title">${c.name}</h3>
        <span class="champ-card__role champ-card__role--${c.role}">${roleLine}</span>
      </div>
      <div class="stats-grid">
        ${stat(c.difficulty + '/5', 'Difficulté')}
        ${stat(c.phasePower.early, 'Early')}
        ${stat(c.phasePower.mid, 'Mid')}
        ${stat(c.phasePower.late, 'Late')}
        ${stat(c.objectivePower, 'Objectifs')}
      </div>
      <div class="champ-detail__tags">
        <div><span class="champ-detail__label">Style</span> ${chips(c.tags)}</div>
        <div><span class="champ-detail__label">Synergies</span> ${chips(c.synergyTags)}</div>
        <div><span class="champ-detail__label">Fort contre les profils</span> ${chips(c.counterTags)}</div>
      </div>
    </div>
    <div class="panel">
      <h3 class="panel-title">${c.name} contre (${counters.length})</h3>
      ${counters.length ? counters.map((e) => counterRow(e, 'counter')).join('') : '<div class="empty-state">Aucune donnée de counter.</div>'}
    </div>
    <div class="panel">
      <h3 class="panel-title">Contré par (${counteredBy.length})</h3>
      ${counteredBy.length ? counteredBy.map((e) => counterRow(e, 'target')).join('') : '<div class="empty-state">Aucune donnée de counter.</div>'}
    </div>
  `;

  const backBtn = document.getElementById('champ-detail-back');
  if (backBtn) backBtn.addEventListener('click', () => { championsView.selected = null; renderChampions(); });
  el.querySelectorAll('[data-champ-id]').forEach((btn) => btn.addEventListener('click', () => {
    championsView.selected = btn.dataset.champId;
    renderChampions();
    const view = document.getElementById('view-champions');
    if (view) view.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
}

function renderCounters() {
  const el = document.getElementById('counters-content');
  if (!el) return;

  if (typeof CHAMPION_COUNTERS === 'undefined') {
    el.innerHTML = '<div class="empty-state">Donnees de counter indisponibles.</div>';
    return;
  }

  const searchInput = document.getElementById('counters-search');
  const roleFilter = document.getElementById('counters-role-filter');
  const confidenceFilter = document.getElementById('counters-confidence-filter');

  const search = (searchInput ? searchInput.value : '').trim().toLowerCase();
  const role = roleFilter ? roleFilter.value : '';
  const confidence = confidenceFilter ? confidenceFilter.value : '';

  if (!search) {
    el.innerHTML = '<div class="empty-state">Recherchez un champion pour voir ses matchups.</div>';
    return;
  }

  const matches = CHAMPION_COUNTERS.filter((e) => {
    const counterChamp = getChampionById(e.counter);
    const targetChamp = getChampionById(e.target);
    const counterName = counterChamp ? counterChamp.name.toLowerCase() : e.counter;
    const targetName = targetChamp ? targetChamp.name.toLowerCase() : e.target;
    if (!counterName.includes(search) && !targetName.includes(search)) return false;
    if (role && e.counterRole !== role && e.targetRole !== role) return false;
    if (confidence && e.confidence !== confidence) return false;
    return true;
  });

  const champCounters = matches.filter((e) => getChampionById(e.counter) && getChampionById(e.counter).name.toLowerCase().includes(search))
    .sort((a, b) => b.score - a.score);
  const champCountered = matches.filter((e) => getChampionById(e.target) && getChampionById(e.target).name.toLowerCase().includes(search))
    .sort((a, b) => b.score - a.score);

  function renderRow(e, mode) {
    const counterChamp = getChampionById(e.counter);
    const targetChamp = getChampionById(e.target);
    const counterName = counterChamp ? counterChamp.name : e.counter;
    const targetName = targetChamp ? targetChamp.name : e.target;
    const confClass = `counter-confidence--${(e.confidence || '').toLowerCase()}`;
    return `
      <div class="counter-row">
        <div class="counter-row__main">
          <strong>${counterName}</strong> (${e.counterRole}) contre <strong>${targetName}</strong> (${e.targetRole})
          <span class="counter-row__score ${confClass}">${e.score} - ${e.confidence}</span>
        </div>
        <div class="counter-row__tags">Tags : ${(e.matchedTags || []).join(', ') || '-'}</div>
        <div class="counter-row__reason">${e.gameplayReason || ''}</div>
        <div class="counter-row__advice">${e.draftUse || ''}</div>
      </div>
    `;
  }

  el.innerHTML = `
    <div class="panel">
      <h3 class="panel-title">Champions contres par "${search}"</h3>
      ${champCounters.length ? champCounters.map((e) => renderRow(e, 'counter')).join('') : '<div class="empty-state">Aucun résultat.</div>'}
    </div>
    <div class="panel">
      <h3 class="panel-title">Champions qui contrent "${search}"</h3>
      ${champCountered.length ? champCountered.map((e) => renderRow(e, 'target')).join('') : '<div class="empty-state">Aucun résultat.</div>'}
    </div>
  `;
}

function renderScouting() {
  const el = document.getElementById('scouting-content');
  if (!el) return;

  if (state.roster.length === 0) {
    el.innerHTML = '<div class="empty-state">Constituez votre roster avant de consulter le scouting.</div>';
    return;
  }

  const selectedRegion = state._scoutingRegion || state.region;
  state._scoutingRegion = selectedRegion;

  const opponents = getAITeamsForRegion(selectedRegion).filter((t) => t.id !== state.aiTeamId);
  if (opponents.length === 0) {
    el.innerHTML = '<div class="empty-state">Aucune équipe adverse disponible dans cette region.</div>';
    return;
  }

  const selectedId = (state._scoutingSelected && opponents.some((t) => t.id === state._scoutingSelected))
    ? state._scoutingSelected
    : opponents[0].id;
  state._scoutingSelected = selectedId;
  const team = opponents.find((t) => t.id === selectedId);

  const regionSelectHtml = REGIONS.map((r) => `<option value="${r.id}" ${r.id === selectedRegion ? 'selected' : ''}>${r.name}</option>`).join('');

  const listHtml = opponents.map((t) => {
    const r = getScoutingReport(t.id);
    return `<button class="comp-tag-option ${t.id === selectedId ? 'comp-tag-option--active' : ''}" data-scout-team="${t.id}">${t.name} (${r.confidence}/100)</button>`;
  }).join('');

  el.innerHTML = `
    <div class="panel">
      <h3 class="panel-title">Équipes adverses</h3>
      <div class="scouting-region-filter">
        <label for="scouting-region">Region</label>
        <select id="scouting-region">${regionSelectHtml}</select>
      </div>
      <div class="draft-role-filter">${listHtml}</div>
    </div>
    <div class="panel">
      <h3 class="panel-title">${team.name} (${team.shortName})</h3>
      ${buildScoutingReportBody(team)}
    </div>
  `;

  document.getElementById('scouting-region').addEventListener('change', (e) => {
    state._scoutingRegion = e.target.value;
    state._scoutingSelected = null;
    renderScouting();
  });

  document.querySelectorAll('[data-scout-team]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state._scoutingSelected = btn.dataset.scoutTeam;
      renderScouting();
    });
  });
}

/* ------------------------------------------------------------
   Marche des transferts
   ------------------------------------------------------------ */

const FREE_AGENT_NAMES = [
  'Phantom','Lynx','Nova','Storm','Blaze','Frost','Vega','Orion','Echo','Titan',
  'Spark','Ridge','Flux','Dusk','Arc','Bolt','Raze','Kite','Vex','Null',
  'Pyro','Shade','Crest','Axon','Drift','Gale','Haze','Iota','Jolt','Kova'
];

function getPlayerCost(player) {
  const avg = Math.round((player.laning + player.teamfight + player.mechanics + (player.shotcalling || 60)) / 4);
  return Math.max(15, Math.round(avg * 0.75));
}

function getPlayerAvg(player) {
  return Math.round((player.laning + player.teamfight + player.mechanics + (player.shotcalling || 60)) / 4);
}

function generateFreeAgent(role, region) {
  const level = 55 + Math.floor(Math.random() * 30);
  const spread = 12;
  const name = FREE_AGENT_NAMES[Math.floor(Math.random() * FREE_AGENT_NAMES.length)];
  const suffix = Math.floor(Math.random() * 99);
  const champs = getChampionsForRole(role).slice(0, 3).map(c => c.name);
  return {
    id: `fa_${role}_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
    name: `${name}${suffix}`,
    role,
    region: region || 'LEC',
    laning: Math.min(99, level + Math.floor(Math.random() * spread) - spread / 2),
    teamfight: Math.min(99, level + Math.floor(Math.random() * spread) - spread / 2),
    mechanics: Math.min(99, level + Math.floor(Math.random() * spread) - spread / 2),
    shotcalling: Math.min(99, level + Math.floor(Math.random() * spread) - spread / 2),
    mental: Math.min(99, level + Math.floor(Math.random() * spread) - spread / 2),
    forme: 60 + Math.floor(Math.random() * 30),
    fatigue: 0,
    championPool: champs.length ? champs : ['Jinx'],
    traits: [],
    isFreeAgent: true,
    fromTeam: 'Agent libre'
  };
}

function generateTransferMarket() {
  if (!state.transferMarket) state.transferMarket = { candidates: [], refreshedAt: null };
  const roles = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'];
  const candidates = [];
  const usedIds = new Set(state.roster.map(p => p.id));

  // Piocher dans les aiRosters (2 joueurs par role max)
  if (state.aiRosters) {
    Object.entries(state.aiRosters).forEach(([teamId, roster]) => {
      if (teamId === state.aiTeamId) return;
      const teamRef = AI_TEAMS ? AI_TEAMS.find(t => t.id === teamId) : null;
      const teamName = teamRef ? teamRef.name : teamId;
      roster.forEach(player => {
        if (!usedIds.has(player.id) && Math.random() < 0.35) {
          candidates.push(Object.assign({}, player, { fromTeam: teamName, isFreeAgent: false }));
          usedIds.add(player.id);
        }
      });
    });
  }

  // Ajouter des agents libres pour compléter (au moins 2 par role)
  roles.forEach(role => {
    const existing = candidates.filter(c => c.role === role).length;
    const needed = Math.max(0, 2 - existing);
    for (let i = 0; i < needed; i++) {
      candidates.push(generateFreeAgent(role, state.region));
    }
  });

  // Mélanger et limiter à 15
  state.transferMarket.candidates = candidates.sort(() => Math.random() - 0.5).slice(0, 15);
  state.transferMarket.refreshedAt = Date.now();
  saveGame();
}

function escapeAttr(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;'); }

/* Liste des joueurs transferables encore disponibles (non signés) */
function getAvailableTransfers() {
  if (!state.transferMarket) state.transferMarket = { signedIds: [] };
  if (!state.transferMarket.signedIds) state.transferMarket.signedIds = [];
  const signed = new Set(state.transferMarket.signedIds);
  const list = (typeof TRANSFER_PLAYERS !== 'undefined') ? TRANSFER_PLAYERS : [];
  return list.filter(p => !signed.has(p.id));
}

function renderTransferCard(c, budget) {
  const avg = getPlayerAvg(c);
  const cost = getPlayerCost(c);
  const canAfford = budget >= cost;
  const myPlayer = state.roster.find(p => p.role === c.role);
  const myAvg = myPlayer ? getPlayerAvg(myPlayer) : 0;
  const diff = avg - myAvg;
  const diffHtml = myPlayer
    ? `<span class="level-delta ${diff >= 0 ? 'level-delta--up' : 'level-delta--down'}">${diff >= 0 ? '▲' : '▼'} ${Math.abs(diff)} vs ${myPlayer.name}</span>`
    : '';

  // Champion pool affiché avec liséré de confort (mêmes couleurs que le roster)
  const comforts = (c.comforts && c.comforts.length)
    ? c.comforts
    : (c.championPool || []).map(ch => ({ champion: ch, score: 0 }));
  const poolHtml = comforts.slice(0, 5).map(cf => {
    const tier = getMasteryTier(cf.score || 0);
    return `<span class="champion-chip champion-chip--${tier.id}" title="${escapeAttr(tier.label)}">${cf.champion}${cf.score ? ` <span class="champion-chip__mastery">${cf.score}</span>` : ''}</span>`;
  }).join('');

  return `
    <div class="transfer-card ${canAfford ? '' : 'transfer-card--unavailable'}">
      <div class="transfer-card__header">
        <div class="mini-avatar">${getInitials(c.name)}</div>
        <div class="transfer-card__identity">
          <div class="transfer-card__name">${c.name}${c.scoutGrade ? ` <span class="transfer-grade">${c.scoutGrade}</span>` : ''}</div>
          <div class="transfer-card__meta">${c.role} &mdash; ${c.fromTeam || 'Agent libre'}${c.division ? ` <span class="transfer-div">${c.division}</span>` : ''}${c.baseAge != null ? ` &mdash; ${playerAge(c)} ans` : ''}</div>
        </div>
        <div class="transfer-card__level">${avg}</div>
      </div>
      <div class="transfer-card__stats">
        <span>Lane <strong>${c.laning}</strong></span>
        <span>TF <strong>${c.teamfight}</strong></span>
        <span>Meca <strong>${c.mechanics}</strong></span>
        <span>Shotcall <strong>${c.shotcalling || '?'}</strong></span>
      </div>
      <div class="transfer-card__pool champion-chip-list">${poolHtml}</div>
      <div class="transfer-card__footer">
        ${diffHtml}
        <div class="transfer-card__cost">
          <span class="resource-chip__icon">💰</span> ${cost} budget
        </div>
        <button class="btn-primary btn-small" data-sign-id="${escapeAttr(c.id)}" ${canAfford ? '' : 'disabled'}>
          ${canAfford ? 'Signer' : 'Budget insuffisant'}
        </button>
      </div>
    </div>
  `;
}

function renderTransfers() {
  const el = document.getElementById('transfers-content');
  if (!el) return;

  if (state.roster.length === 0) {
    el.innerHTML = '<div class="empty-state">Constituez votre roster avant de consulter le marche.</div>';
    return;
  }

  const budget = state.resources.budget;
  const roles = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'];
  const all = getAvailableTransfers();

  const roleFilter = state._transferRoleFilter || '';
  const divFilter = state._transferDivision || '';
  const teamFilter = state._transferTeam || '';
  const champFilter = state._transferChamp || '';
  const search = (state._transferSearch || '').trim().toLowerCase();

  // Valeurs distinctes pour les listes déroulantes
  const divisions = [...new Set(all.map(p => p.division).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'fr'));
  const teams = [...new Set(all.map(p => p.fromTeam).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'fr'));
  const champs = [...new Set(all.flatMap(p => p.championPool || []))].sort((a, b) => a.localeCompare(b, 'fr'));

  const matches = all.filter(p => {
    if (roleFilter && p.role !== roleFilter) return false;
    if (divFilter && p.division !== divFilter) return false;
    if (teamFilter && p.fromTeam !== teamFilter) return false;
    if (champFilter && !(p.championPool || []).includes(champFilter)) return false;
    if (search) {
      const hay = `${p.name} ${p.fromTeam || ''} ${(p.championPool || []).join(' ')}`.toLowerCase();
      if (!hay.includes(search)) return false;
    }
    return true;
  }).sort((a, b) => (b.transferScore || 0) - (a.transferScore || 0));

  const cardsHtml = matches.length
    ? matches.map(c => renderTransferCard(c, budget)).join('')
    : '<div class="empty-state">Aucun joueur ne correspond aux filtres.</div>';

  el.innerHTML = `
    ${renderContractsPanel()}
    <div class="panel">
      <div class="transfer-header">
        <div>
          <p class="card__count">Budget disponible : <strong>${budget}</strong></p>
          <p class="card__count" style="font-size:12px;color:var(--color-text-muted);">${matches.length} joueur(s) affiché(s) sur ${all.length} — divisions ERL / EMEA Masters.</p>
        </div>
      </div>
      <div class="draft-role-filter">
        <button class="comp-tag-option ${!roleFilter ? 'comp-tag-option--active' : ''}" data-transfer-role="">Tous</button>
        ${roles.map(r => `<button class="comp-tag-option ${roleFilter === r ? 'comp-tag-option--active' : ''}" data-transfer-role="${r}">${r}</button>`).join('')}
      </div>
      <div class="transfer-filters">
        <select class="transfer-select" id="transfer-division">
          <option value="">Toutes divisions</option>
          ${divisions.map(d => `<option value="${escapeAttr(d)}" ${divFilter === d ? 'selected' : ''}>${d}</option>`).join('')}
        </select>
        <select class="transfer-select" id="transfer-team">
          <option value="">Toutes équipes</option>
          ${teams.map(t => `<option value="${escapeAttr(t)}" ${teamFilter === t ? 'selected' : ''}>${t}</option>`).join('')}
        </select>
        <select class="transfer-select" id="transfer-champ">
          <option value="">Tous champions</option>
          ${champs.map(ch => `<option value="${escapeAttr(ch)}" ${champFilter === ch ? 'selected' : ''}>${ch}</option>`).join('')}
        </select>
        <input type="text" class="transfer-search" id="transfer-search" placeholder="Rechercher (joueur, équipe, champion)…" value="${escapeAttr(state._transferSearch || '')}" autocomplete="off">
      </div>
    </div>
    <div class="transfer-grid">${cardsHtml}</div>
  `;

  el.querySelectorAll('[data-transfer-role]').forEach(btn => {
    btn.addEventListener('click', () => { state._transferRoleFilter = btn.dataset.transferRole; renderTransfers(); });
  });
  const divSel = document.getElementById('transfer-division');
  if (divSel) divSel.addEventListener('change', () => { state._transferDivision = divSel.value; renderTransfers(); });
  const teamSel = document.getElementById('transfer-team');
  if (teamSel) teamSel.addEventListener('change', () => { state._transferTeam = teamSel.value; renderTransfers(); });
  const champSel = document.getElementById('transfer-champ');
  if (champSel) champSel.addEventListener('change', () => { state._transferChamp = champSel.value; renderTransfers(); });
  const searchInput = document.getElementById('transfer-search');
  if (searchInput) searchInput.addEventListener('input', () => {
    const pos = searchInput.selectionStart;
    state._transferSearch = searchInput.value;
    renderTransfers();
    const again = document.getElementById('transfer-search');
    if (again) { again.focus(); again.setSelectionRange(pos, pos); }
  });

  el.querySelectorAll('[data-sign-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const candidate = getAvailableTransfers().find(c => c.id === btn.dataset.signId);
      if (candidate) showSignModal(candidate);
    });
  });

  el.querySelectorAll('[data-extend-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      showExtendModal(btn.dataset.extendId, parseInt(btn.dataset.extendYears, 10));
    });
  });
}

/* Section « Mon effectif — contrats » en tête du marché des transferts (v1.8.0). */
function renderContractsPanel() {
  if (!state.roster.length) return '';
  const roleOrder = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'];
  const windowOpen = isContractWindowOpen();
  const sorted = [...state.roster].sort((a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role));
  const prestige = state.resources.prestige;
  const budget = state.resources.budget;

  const curYear = currentGameYear();
  const rows = sorted.map((p) => {
    const tier = getContractTier(p);
    const final = isContractFinalYear(p);
    const c1 = getExtensionCost(p, 1);
    const c2 = getExtensionCost(p, 2);
    const alreadyExtended = p.contractExtendedYear === curYear;
    const retYear = playerRetirementYear(p);
    const age = playerAge(p);
    const yearsToRet = retYear - curYear;
    const retTooltip = escapeAttr(`Choix personnel : ${p.name} a décidé de mettre fin à sa carrière à ${p.retirementAge} ans. Une prolongation reste possible, mais à des conditions exceptionnelles (×1.5).`);
    const retWarning = p.baseAge != null && yearsToRet <= 2
      ? `<span style="font-size:11px;color:#e05;margin-left:6px;cursor:help;" title="${retTooltip}" data-lore-tooltip="${retTooltip}">⚠ retraite W${retYear}</span>`
      : '';
    const btn = (years, c) => {
      if (alreadyExtended) return '';
      const extType = getExtensionType(p, years);
      if (extType === 'blocked') {
        return `<span style="font-size:11px;color:var(--color-text-muted);align-self:center;cursor:help;" title="La réglementation ne permet pas de jouer après 33 ans." data-lore-tooltip="La réglementation ne permet pas de jouer après 33 ans.">+${years} an${years > 1 ? 's' : ''} impossible (limite 33 ans)</span>`;
      }
      const cost = extType === 'special'
        ? { prestige: Math.ceil(c.prestige * 1.5), budget: Math.ceil(c.budget * 1.5) }
        : c;
      const affordable = prestige >= cost.prestige && budget >= cost.budget;
      const ready = windowOpen && affordable;
      const specialStyle = extType === 'special' ? 'border-color:#e0a020;color:#e0a020;' : '';
      const label = extType === 'special' ? `+${years} an${years > 1 ? 's' : ''} ⭐` : `+${years} an${years > 1 ? 's' : ''}`;
      const title = !windowOpen ? 'Disponible en inter-saison (après le MSI ou les Worlds)'
        : extType === 'special' ? `Négociation de carrière — coût x1.5 (retraite dépassée)`
        : (prestige < cost.prestige ? `Prestige requis : ${cost.prestige}` : (budget < cost.budget ? `Budget requis : ${cost.budget}` : 'Prolonger'));
      // Jamais `disabled` : un bouton désactivé n'émet aucun clic. On garde le
      // bouton cliquable et c'est showExtendModal qui explique le blocage.
      return `<button class="btn-small ${ready ? 'btn-primary' : 'btn-secondary'}" style="${ready ? '' : 'opacity:.6;'}${specialStyle}" data-extend-id="${escapeAttr(p.id)}" data-extend-years="${years}" title="${escapeAttr(title)}">
        ${label} <span style="opacity:.85;">(P${cost.prestige} · 💰${cost.budget})</span>
      </button>`;
    };
    const extendedBadge = alreadyExtended
      ? `<span style="font-size:12px;color:var(--color-seafoam);font-weight:600;">✓ Prolongé cette saison</span>`
      : `${btn(1, c1)}${btn(2, c2)}`;
    return `
      <div class="transfer-card" style="padding:10px;">
        <div class="transfer-card__header">
          <div class="mini-avatar">${getInitials(p.name)}</div>
          <div class="transfer-card__identity">
            <div class="transfer-card__name">${p.name} <span class="transfer-grade">${CONTRACT_TIER_LABELS[tier]}</span></div>
            <div class="transfer-card__meta">${p.role}${p.baseAge != null ? ` &mdash; ${age} ans` : ''} &mdash; Niveau ${computeLevel(p)}${retWarning}</div>
          </div>
          <div class="transfer-card__level" style="color:${final ? '#e0a020' : 'inherit'};">W${p.contractUntil}</div>
        </div>
        <div style="font-size:12px;margin:6px 0;color:${final ? '#e0a020' : 'var(--color-text-muted)'};">
          Contrat jusqu'à Worlds ${p.contractUntil}${final ? ' — ⚠ dernière année' : ''}
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">${extendedBadge}</div>
      </div>`;
  }).join('');

  const note = windowOpen
    ? `<div style="background:rgba(46,204,160,.12);border:1px solid var(--color-seafoam);border-radius:8px;padding:8px 12px;margin-bottom:4px;">
         <span style="color:var(--color-seafoam);font-weight:600;">🟢 Mercato ouvert</span>
         <span style="font-size:12px;color:var(--color-text-muted);"> — prolongations possibles jusqu'au 1er match du prochain split. Le prestige est une exigence (non dépensé) ; seul le budget est payé.</span>
       </div>`
    : `<div style="background:rgba(255,255,255,.04);border:1px solid var(--color-border, #333);border-radius:8px;padding:8px 12px;margin-bottom:4px;">
         <span style="color:#e0a020;font-weight:600;">🔒 Mercato fermé</span>
         <span style="font-size:12px;color:var(--color-text-muted);"> — le split a commencé. La fenêtre rouvrira après le prochain MSI / Worlds. Prestige : <strong>${prestige}</strong> — Budget : <strong>${budget}</strong>.</span>
       </div>`;

  return `
    <div class="panel">
      <h3 class="panel-title">📜 Mon effectif — contrats</h3>
      ${note}
      <div class="transfer-grid" style="margin-top:10px;">${rows}</div>
    </div>`;
}

function showExtendModal(playerId, years) {
  const p = state.roster.find((x) => x.id === playerId);
  if (!p) return;
  if (!isContractWindowOpen()) {
    showToast('Mercato fermé : le split a commencé. Les prolongations rouvriront après le prochain MSI / Worlds (toute la pré-saison).', 'info');
    return;
  }
  if (p.contractExtendedYear === currentGameYear()) {
    showToast(`${p.name} a déjà été prolongé cette saison. Une seule prolongation par joueur par saison.`, 'info');
    return;
  }
  const extType = getExtensionType(p, years);
  if (extType === 'blocked') {
    showToast(`Impossible : prolonger ${p.name} de ${years} an${years > 1 ? 's' : ''} dépasserait la limite absolue de 33 ans.`, 'info');
    return;
  }
  const c = getExtensionCostFinal(p, years);
  const newEnd = (p.contractUntil || currentGameYear()) + years;
  const isSpecial = extType === 'special';
  const specialBanner = isSpecial
    ? `<div style="background:rgba(224,160,32,.12);border:1px solid #e0a020;border-radius:8px;padding:8px 12px;margin-bottom:10px;">
        <span style="color:#e0a020;font-weight:600;">⭐ Négociation de carrière</span>
        <span style="font-size:12px;color:var(--color-text-muted);"> — ${p.name} a dépassé son âge de retraite prévu. Il exige des conditions exceptionnelles : <strong>coût x1.5</strong>.</span>
       </div>`
    : (p.baseAge != null && newEnd === playerRetirementYear(p)
        ? `<p style="font-size:11px;color:#e0a020;margin-bottom:8px;">⚠ Ce contrat court jusqu'à sa retraite prévue (W${newEnd}).</p>`
        : '');
  const okPrestige = state.resources.prestige >= c.prestige;
  const okBudget = state.resources.budget >= c.budget;
  showModal(`
    <h3 class="panel-title">${isSpecial ? '⭐ ' : ''}Prolonger ${p.name}</h3>
    <p style="margin-bottom:10px;">${p.name} (${CONTRACT_TIER_LABELS[getContractTier(p)]}) demande, pour <strong>${years} an${years > 1 ? 's' : ''}</strong> de plus (jusqu'à Worlds ${newEnd}) :</p>
    <div class="transfer-card__stats" style="margin-bottom:12px;">
      <span>Prestige exigé : <strong style="color:${okPrestige ? 'var(--color-seafoam)' : '#e05'};">${c.prestige}</strong> <span style="opacity:.7;">(vous : ${state.resources.prestige})</span></span>
      <span>Budget payé : <strong style="color:${okBudget ? 'inherit' : '#e05'};">💰 ${c.budget}</strong> <span style="opacity:.7;">(vous : ${state.resources.budget})</span></span>
    </div>
    ${specialBanner}
    <p style="font-size:12px;color:var(--color-text-muted);margin-bottom:14px;">Le prestige n'est pas décrémenté : c'est un seuil de standing. Seul le budget est dépensé.</p>
    <div class="modal-content__actions">
      <button class="btn-primary" id="btn-confirm-extend" ${okPrestige && okBudget ? '' : 'disabled'}>Signer la prolongation</button>
      <button class="btn-secondary" id="btn-cancel-extend">Annuler</button>
    </div>
  `);
  document.getElementById('btn-cancel-extend').addEventListener('click', closeModal);
  document.getElementById('btn-confirm-extend').addEventListener('click', () => {
    extendContract(playerId, years);
    closeModal();
  });
}

function extendContract(playerId, years) {
  const p = state.roster.find((x) => x.id === playerId);
  if (!p) return;
  if (!isContractWindowOpen()) { showToast('Mercato fermé : prolongations indisponibles pendant le split.', 'error'); return; }
  const extType = getExtensionType(p, years);
  if (extType === 'blocked') { showToast(`${p.name} dépasserait la limite absolue de 33 ans.`, 'error'); return; }
  const c = getExtensionCostFinal(p, years);
  if (state.resources.prestige < c.prestige) {
    showToast(`Prestige insuffisant : ${p.name} exige ${c.prestige} de prestige (vous : ${state.resources.prestige}).`, 'error');
    return;
  }
  if (state.resources.budget < c.budget) {
    showToast(`Budget insuffisant : ${c.budget} requis (vous : ${state.resources.budget}).`, 'error');
    return;
  }
  state.resources.budget -= c.budget; // prestige NON décrémenté (seuil de standing)
  p.contractUntil = (p.contractUntil || currentGameYear()) + years;
  p.contractExtendedYear = currentGameYear();
  saveGame();
  updateResourceBar();
  const specialLabel = extType === 'special' ? ' (négociation de carrière)' : '';
  showToast(`${p.name} prolongé jusqu'à Worlds ${p.contractUntil}${specialLabel}. -${c.budget} budget.`, 'success');
  renderTransfers();
}

function showSignModal(candidate) {
  const cost = getPlayerCost(candidate);
  const myPlayers = state.roster.filter(p => p.role === candidate.role);
  const hasReplacements = myPlayers.length > 0;

  const releaseOptions = myPlayers.map(p => {
    const avg = getPlayerAvg(p);
    return `
      <label class="transfer-release-option">
        <input type="radio" name="release-player" value="${p.id}" />
        <div class="transfer-card__header" style="flex:1;">
          <div class="mini-avatar">${getInitials(p.name)}</div>
          <div class="transfer-card__identity">
            <div class="transfer-card__name">${p.name}</div>
            <div class="transfer-card__meta">${p.role} &mdash; Moy. ${avg}</div>
          </div>
          <div class="transfer-card__level">${avg}</div>
        </div>
      </label>
    `;
  }).join('');

  const avg = getPlayerAvg(candidate);
  showModal(`
    <h3 class="panel-title">Signer ${candidate.name}</h3>
    <div class="transfer-card__stats" style="margin-bottom:12px;">
      <span>Role : <strong>${candidate.role}</strong></span>
      <span>Niveau moy. : <strong>${avg}</strong></span>
      <span>Coût : <strong>💰 ${cost} budget</strong></span>
    </div>
    ${hasReplacements
      ? `<p style="margin-bottom:10px;">Choisissez le joueur a libérer :</p>
         <div class="transfer-release-list">${releaseOptions}</div>`
      : `<p style="margin-bottom:10px;color:var(--color-seafoam);">Poste <strong>${candidate.role}</strong> vacant : signature directe, aucun joueur à libérer.</p>`}
    <div class="modal-content__actions" style="margin-top:16px;">
      <button class="btn-primary" id="btn-confirm-sign">Confirmer la signature</button>
      <button class="btn-secondary" id="btn-cancel-sign">Annuler</button>
    </div>
  `);

  // Pré-sélectionner le premier
  const firstRadio = document.querySelector('input[name="release-player"]');
  if (firstRadio) firstRadio.checked = true;

  document.getElementById('btn-cancel-sign').addEventListener('click', closeModal);

  document.getElementById('btn-confirm-sign').addEventListener('click', () => {
    if (hasReplacements) {
      const selected = document.querySelector('input[name="release-player"]:checked');
      if (!selected) { showToast('Selectionnez un joueur a libérer.', 'error'); return; }
      signPlayer(candidate, selected.value);
    } else {
      signPlayer(candidate, null); // poste vacant : aucune libération
    }
    closeModal();
  });
}

function signPlayer(candidate, releasePlayerId) {
  const cost = getPlayerCost(candidate);
  if (state.resources.budget < cost) {
    showToast('Budget insuffisant pour signer ce joueur.', 'error');
    return;
  }

  // releasePlayerId peut être null : signature sur un poste vacant (fin de contrat).
  const idx = releasePlayerId ? state.roster.findIndex(p => p.id === releasePlayerId) : -1;
  if (releasePlayerId && idx === -1) { showToast('Joueur introuvable.', 'error'); return; }

  const released = idx !== -1 ? state.roster[idx] : null;

  // Champion pool : privilégier les comfort picks (champions + scores réels)
  const comforts = (candidate.comforts && candidate.comforts.length) ? candidate.comforts : null;
  const pool = comforts ? comforts.map(cf => cf.champion) : (candidate.championPool || []);

  // Préparer le nouveau joueur (nettoyer les champs de marche)
  const avg = Math.round((candidate.laning + candidate.teamfight + candidate.mechanics + (candidate.shotcalling || 60)) / 4);
  const newId = `player_${candidate.role.toLowerCase()}_${Date.now()}`;
  const newPlayer = Object.assign({}, candidate, {
    id: newId,
    fatigue: 0,
    level: candidate.level || avg,
    potential: candidate.potential || Math.min(99, avg + 10),
    form: candidate.form || candidate.forme || 70,
    nationality: candidate.nationality || candidate.region || 'EU',
    traits: candidate.traits || [],
    championPool: pool.length ? pool : (candidate.championPool || []),
    isFreeAgent: undefined,
    fromTeam: undefined,
    forme: undefined,
    comforts: undefined
  });
  // Contrat de la recrue : au moins 1 an pleine (pas d'expiration immédiate).
  newPlayer.contractUntil = assignInitialContract(newPlayer, currentGameYear(), 1);
  // Âge de la recrue : depuis les data files si disponible, sinon généré par tier.
  if (newPlayer.baseAge == null) assignPlayerAge(newPlayer);

  // Remplacer dans le roster (ou ajouter si poste vacant)
  if (idx !== -1) {
    state.roster[idx] = newPlayer;
  } else {
    state.roster.push(newPlayer);
  }

  // Initialiser la maîtrise champion (depuis les comfort picks si dispo, sinon décroissante)
  if (!state.championProgress) state.championProgress = {};
  const progress = {};
  newPlayer.championPool.forEach((champName, index) => {
    const champion = getChampionByName(champName);
    const championId = champion ? champion.id : champName;
    let mastery;
    if (comforts && comforts[index] && comforts[index].score) {
      mastery = Math.max(1, Math.min(100, comforts[index].score));
    } else {
      mastery = Math.max(10, Math.min(95, (newPlayer.level || 70) - 10 - index * 15));
    }
    progress[championId] = {
      championId, mastery, xp: mastery * 20,
      confidence: Math.max(0, Math.min(100, mastery + 5)),
      stageReady: mastery >= 50, lastPlayedMatchIds: []
    };
  });
  state.championProgress[newId] = progress;
  if (released && state.championProgress[released.id]) delete state.championProgress[released.id];

  // Déduire le budget
  state.resources.budget -= cost;

  // Marquer le joueur transféré comme signé (retiré du marché)
  if (!state.transferMarket) state.transferMarket = { signedIds: [] };
  if (!state.transferMarket.signedIds) state.transferMarket.signedIds = [];
  state.transferMarket.signedIds.push(candidate.id);

  saveGame();
  updateResourceBar();
  showToast(released ? `${candidate.name} signé ! ${released.name} libéré. -${cost} budget.` : `${candidate.name} signé (poste vacant comblé). -${cost} budget.`, 'success');
  renderTransfers();
}

/* ------------------------------------------------------------
   Ecran de progression
   ------------------------------------------------------------ */
function renderProgression() {
  const p = state.progress;
  const winRate = p.matchesPlayed > 0 ? Math.round((p.wins / p.matchesPlayed) * 100) : 0;

  document.getElementById('progression-stats').innerHTML = `
    <div class="stat-card"><div class="stat-card__value">${p.matchesPlayed}</div><div class="stat-card__label">Matchs joues</div></div>
    <div class="stat-card"><div class="stat-card__value">${p.wins}</div><div class="stat-card__label">Victoires</div></div>
    <div class="stat-card"><div class="stat-card__value">${winRate}%</div><div class="stat-card__label">Taux de victoire</div></div>
    <div class="stat-card"><div class="stat-card__value">${p.bestWinStreak}</div><div class="stat-card__label">Meilleure serie de victoires</div></div>
  `;

  const pal = ensurePalmares();
  const palmaresEl = document.getElementById('progression-palmares');
  if (palmaresEl) {
    palmaresEl.innerHTML = `
      <div class="stat-card"><div class="stat-card__value">${pal.regionalTitles}</div><div class="stat-card__label">Titres régionaux</div></div>
      <div class="stat-card"><div class="stat-card__value">${pal.msi.qualified}</div><div class="stat-card__label">Qualifications MSI</div></div>
      <div class="stat-card"><div class="stat-card__value">${pal.msi.titles}</div><div class="stat-card__label">Titres MSI</div></div>
      <div class="stat-card"><div class="stat-card__value stat-card__value--text">${intlBestResultLabel(pal.msi.bestPlacement)}</div><div class="stat-card__label">Meilleur résultat MSI</div></div>
      <div class="stat-card"><div class="stat-card__value">${pal.worlds.qualified}</div><div class="stat-card__label">Qualifications Worlds</div></div>
      <div class="stat-card"><div class="stat-card__value">${pal.worlds.titles}</div><div class="stat-card__label">Titres Worlds</div></div>
      <div class="stat-card"><div class="stat-card__value stat-card__value--text">${intlBestResultLabel(pal.worlds.bestPlacement)}</div><div class="stat-card__label">Meilleur résultat Worlds</div></div>
    `;
  }

  const historyEl = document.getElementById('progression-history');
  historyEl.innerHTML = state.matchHistory.slice(0, 10).map((m) => {
    const cls = m.result === 'win' ? 'result-tag--win' : 'result-tag--loss';
    const label = m.result === 'win' ? 'Victoire' : 'Défaite';
    const date = new Date(m.date).toLocaleDateString('fr-FR');
    return `
      <tr>
        <td>${date}</td>
        <td>${m.competition || 'Scrim'}</td>
        <td>${m.opponent}</td>
        <td>${m.scoreHome} - ${m.scoreAway}</td>
        <td><span class="result-tag ${cls}">${label}</span></td>
      </tr>
    `;
  }).join('') || '<tr><td colspan="5" class="card__count">Aucun match joue</td></tr>';

  const careerEl = document.getElementById('progression-career');
  if (careerEl) {
    careerEl.innerHTML = state.careerLog.slice(0, 20).map((e) => {
      const sign = e.delta > 0 ? '+' : '';
      const cls = e.delta > 0 ? 'level-delta--up' : 'level-delta--down';
      const arrow = e.delta > 0 ? '&#9650;' : '&#9660;';
      return `
        <div class="career-progression-row">
          <span class="career-progression-row__name">${e.name} <span class="career-progression-row__role">${e.role}</span></span>
          <span class="career-progression-row__period">${splitLabel(e.split)} ${e.year}</span>
          <span class="career-progression-row__levels">${e.oldLevel} &rarr; ${e.newLevel}</span>
          <span class="level-delta ${cls}">${arrow} ${sign}${e.delta}</span>
        </div>
      `;
    }).join('') || '<p class="card__count">Aucune evolution pour le moment.</p>';
  }
}

/* ------------------------------------------------------------
   Initialisation
   ------------------------------------------------------------ */
function initGame() {
  state = loadGame();
  updateResourceBar();
  setupNavigation();
  if (!state.region) {
    showRegionSelection();
  } else {
    showView('home');
  }
}

function setupNavigation() {
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    if (!btn.dataset.view) return;
    btn.addEventListener('click', () => {
      showView(btn.dataset.view);
    });
  });

  document.querySelectorAll('[data-view-link]').forEach((btn) => {
    btn.addEventListener('click', () => {
      showView(btn.dataset.viewLink);
    });
  });

  // Recherche / filtres de l'ecran Counters
  const countersSearch = document.getElementById('counters-search');
  const countersRoleFilter = document.getElementById('counters-role-filter');
  const countersConfidenceFilter = document.getElementById('counters-confidence-filter');
  [countersSearch, countersRoleFilter, countersConfidenceFilter].forEach((input) => {
    if (!input) return;
    input.addEventListener('input', () => renderCounters());
    input.addEventListener('change', () => renderCounters());
  });

  // Recherche de l'ecran Champions (revient a la liste si on tape)
  const championsSearch = document.getElementById('champions-search');
  if (championsSearch) {
    championsSearch.addEventListener('input', () => {
      championsView.selected = null;
      renderChampions();
    });
  }

  // Bouton reset (double-clic de confirmation)
  const resetBtn = document.getElementById('btn-reset-game');
  if (resetBtn) {
    let confirmReset = false;
    resetBtn.addEventListener('click', () => {
      if (confirmReset) {
        resetGame();
        confirmReset = false;
        resetBtn.textContent = 'Réinitialiser la partie';
      } else {
        confirmReset = true;
        resetBtn.textContent = 'Cliquer a nouveau pour confirmer';
        setTimeout(() => {
          confirmReset = false;
          resetBtn.textContent = 'Réinitialiser la partie';
        }, 3000);
      }
    });
  }

  // Export / Import local
  const exportBtn = document.getElementById('btn-export-save');
  if (exportBtn) exportBtn.addEventListener('click', exportSave);

  // Cloud save
  initCloudSaveUI();

  const importInput = document.getElementById('input-import-save');
  if (importInput) {
    importInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) importSave(file);
      e.target.value = '';
    });
  }
}

document.addEventListener('DOMContentLoaded', initGame);

// Délégation globale : clic sur tout élément [data-lore-tooltip] → showToast (mobile + Mac)
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-lore-tooltip]');
  if (el) showToast(el.dataset.loreTooltip, 'info');
});
