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
  { id: 'LTA', name: 'LCS', inspiration: 'Ameriques', style: 'Individualisme et carry early', aiRegion: 'LTAN' },
  { id: 'LCP', name: 'LCP', inspiration: 'Asie-Pacifique', style: 'Styles emergents et picks surprises', aiRegion: 'LCP' },
  { id: 'CBLOL', name: 'CBLOL', inspiration: 'Bresil', style: 'Intensite et soutien du public', aiRegion: 'LTAS' },
  { id: 'LJL', name: 'LJL', inspiration: 'Japon', style: 'Precision et compositions techniques', aiRegion: 'LJL' }
];

// v1.14.1 : nom d'affichage d'une région à partir de son id interne (id conservé
// pour la compatibilité des sauvegardes ; seul le libellé visible change — ex.
// LTA (id) s'affiche « LCS »).
function regionDisplayName(id) {
  const r = REGIONS.find((reg) => reg.id === id);
  return r ? r.name : id;
}

/* ------------------------------------------------------------
   Accès aux équipes IA (data_teams.js, CDC 11.1)
   ------------------------------------------------------------ */
// v1.15.3 — fix : retournait les équipes brutes de AI_TEAMS (jamais rotées), donc tout
// écran qui lit team.roster à partir de ce résultat (ex. Scouting) affichait un effectif
// périmé après une retraite/remplacement IA, alors que Draft/Match (qui repassent par
// getTeamRef) montraient déjà le bon joueur. Fusion avec state.aiRosters, même logique
// que getTeamRef, pour que tous les consommateurs voient l'effectif à jour.
function getAITeamsForRegion(regionId) {
  const region = REGIONS.find(r => r.id === regionId);
  if (!region || typeof AI_TEAMS === 'undefined') return [];
  return AI_TEAMS.filter(team => team.region === region.aiRegion).map((team) => {
    if (state.aiRosters && state.aiRosters[team.id]) {
      return Object.assign({}, team, { roster: state.aiRosters[team.id] });
    }
    return team;
  });
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
    lastMsiWinnerRegion: null, // région du dernier vainqueur MSI → ouvre une 3e place Worlds (même année)
    lastWorldsWinnerRegion: null, // région du dernier vainqueur Worlds → ouvre une 2e place MSI (année suivante)
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
    transferLog: [], // journal des transferts (v1.11.0), plafonné à 10 ans
    sponsor: {           // v1.15.0 : contrat de sponsoring
      current: null,       // { contractId, type, tier, signedYear, amount, streakYears }
      offers: null,        // 6 ids tirés au hasard (1 par palier x type) pendant la fenêtre de renouvellement
      decisionPending: false,
      pendingRenewalAmount: null,
      pendingRenewalOutcome: null, // 'success' | 'partial' (résultat de l'évaluation du contrat en cours)
      pendingNextSeason: null      // { split, year } — saison à démarrer une fois la décision prise
    },
    sponsorLog: [],       // journal des sponsors (v1.15.0), plafonné à 10 ans
    sponsorYearRecap: null, // v1.15.0 : accumulateur des résultats de l'année en cours (remis à zéro au printemps)
    settings: {
      speed: 2,
      soundEnabled: true,
      mapAnimations: true,
      aiRotation: true,        // v1.11.0 : rotation des effectifs IA (retraites + remplaçants)
      playerContracts: true,   // v1.11.0 : âge + gestion des contrats de l'équipe du joueur
      seenOnboarding1110: false, // v1.11.0 : popup d'explication vue au moins une fois
      lang: 'fr',              // v1.13.0 : langue de l'interface ('fr' | 'en')
      langChosen: false,       // v1.13.0 : popup de bienvenue + choix de langue déjà affichée
      seenTutorial: false      // v1.15.1 : visite guidée du jeu déjà proposée/vue
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

// v1.14.2 — Détection de nouvelle version (Service Worker) : capturé le plus tôt
// possible (avant tout `controllerchange`) pour distinguer une VRAIE mise à jour
// (un contrôleur existait déjà) d'une première activation sur un tout nouveau
// visiteur (aucun contrôleur au chargement → `self.clients.claim()` du SW
// déclenche quand même un `controllerchange`, qu'il ne faut pas confondre avec
// une mise à jour et donc ne pas signaler par le bandeau).
const hadServiceWorkerControllerAtLoad = !!(navigator.serviceWorker && navigator.serviceWorker.controller);

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
  if (placement === 1) return t('intlBest.champion');
  if (placement === 2) return t('intlBest.finalist');
  if (placement === 3) return t('intlBest.semifinalist');
  if (placement <= 5) return t('intlBest.quarterfinalist');
  return t('intlBest.groups');
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
      lastMsiWinnerRegion: parsed.lastMsiWinnerRegion !== undefined ? parsed.lastMsiWinnerRegion : defaults.lastMsiWinnerRegion,
      lastWorldsWinnerRegion: parsed.lastWorldsWinnerRegion !== undefined ? parsed.lastWorldsWinnerRegion : defaults.lastWorldsWinnerRegion,
      mercatoOpen: parsed.mercatoOpen !== undefined ? parsed.mercatoOpen : true,
      aiRosters: parsed.aiRosters || defaults.aiRosters,
      aiMatchHistory: parsed.aiMatchHistory || defaults.aiMatchHistory,
      careerLog: parsed.careerLog || defaults.careerLog,
      lastCareerProgression: parsed.lastCareerProgression || defaults.lastCareerProgression,
      scrims: Object.assign({}, defaults.scrims, parsed.scrims),
      matchHistory: parsed.matchHistory || defaults.matchHistory,
      scouting: Object.assign({}, defaults.scouting, parsed.scouting),
      transferLog: parsed.transferLog || defaults.transferLog,
      sponsor: Object.assign({}, defaults.sponsor, parsed.sponsor),
      sponsorLog: parsed.sponsorLog || defaults.sponsorLog,
      sponsorYearRecap: parsed.sponsorYearRecap !== undefined ? parsed.sponsorYearRecap : defaults.sponsorYearRecap,
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
    // Migration âge IA (v1.15.3) : voir ensureAIRosterAges(). Appelée aussi depuis les
    // imports fichier/cloud (v1.15.3, fix) qui contournaient loadGame() et donc ce backfill.
    ensureAIRosterAges(merged.aiRosters);
    // Nettoyage rétroactif (v1.15.4) : voir cleanupPhantomPlayerJournalEntries().
    cleanupPhantomPlayerJournalEntries(merged);
    return merged;
  } catch (e) {
    console.error('Erreur de chargement', e);
    return createDefaultState();
  }
}

function resetGame() {
  const savedLang = (state.settings && state.settings.lang) || 'fr';
  state = createDefaultState();
  state.settings.lang = savedLang; // continuité visuelle immédiate (pas de flash dans l'autre langue)
  // v1.15.1 — fix : langChosen reste à false (valeur par défaut) au lieu d'être forcé à true,
  // pour que la popup de langue soit reproposée avant le tuto sur une "nouvelle partie" (reset),
  // exactement comme au tout premier lancement du jeu.
  applyStaticI18n();
  saveGame();
  updateResourceBar();
  showToast(t('toast.reset'), 'info');
  showWelcomeLanguageModal(() => {
    if (!state.region && typeof showRegionSelection === 'function') {
      showRegionSelection();
    } else {
      showView('home');
    }
  });
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
  if (!gistId || !token) { setCloudStatus(t('cloud.missingConfig'), 'error'); return; }
  setCloudStatus(t('cloud.sending'), 'info');
  try {
    const res = await fetch(`https://api.github.com/gists/${gistId}`, {
      method: 'PATCH',
      headers: { Authorization: `token ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ files: { 'save.json': { content: JSON.stringify(state, null, 2) } } })
    });
    if (!res.ok) throw new Error(`Erreur ${res.status}`);
    const locale = getLang() === 'en' ? 'en-US' : 'fr-FR';
    const now = new Date().toLocaleTimeString(locale);
    setCloudStatus(t('cloud.savedOn', { date: new Date().toLocaleDateString(locale), time: now }), 'success');
    showToast(t('toast.cloudSent'), 'success');
  } catch (err) {
    setCloudStatus(t('cloud.failed', { err: err.message }), 'error');
    showToast(t('toast.cloudSendFail'), 'error');
  }
}

async function cloudImport() {
  const { gistId, token } = loadGistConfig();
  if (!gistId || !token) { setCloudStatus(t('cloud.missingConfig'), 'error'); return; }
  setCloudStatus(t('cloud.loading'), 'info');
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
    ensureAIRosterAges(state.aiRosters); // v1.15.3 : idem pour les effectifs IA
    cleanupPhantomPlayerJournalEntries(state); // v1.15.4 : purge les fausses entrées retraite/arrivée
    saveGame();
    updateResourceBar();
    showView('home');
    if (typeof renderHome === 'function') renderHome();
    setCloudStatus(t('cloud.loadedOk'), 'success');
    showToast(t('toast.cloudLoaded'), 'success');
  } catch (err) {
    setCloudStatus(t('cloud.failed', { err: err.message }), 'error');
    showToast(t('toast.cloudLoadFail'), 'error');
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
    if (!gistId || !token) { setCloudStatus(t('cloud.bothRequired'), 'error'); return; }
    saveGistConfig(gistId, token);
    setCloudStatus(t('cloud.configSaved'), 'success');
    showToast(t('toast.cloudConfigSaved'), 'success');
  });

  const exportBtn = document.getElementById('btn-cloud-export');
  if (exportBtn) exportBtn.addEventListener('click', () => {
    showModal(`
      <div class="modal-confirm">
        <h3 class="panel-title">${t('prog.cloudExport')}</h3>
        <p>${t('cloud.exportConfirm')}</p>
        <div class="training-form__actions">
          <button class="btn-secondary" onclick="closeModal()">${t('common.cancel')}</button>
          <button class="btn-primary" id="btn-confirm-cloud-export">${t('cloud.confirmExport')}</button>
        </div>
      </div>
    `);
    document.getElementById('btn-confirm-cloud-export').addEventListener('click', () => { closeModal(); cloudExport(); });
  });

  const importBtn = document.getElementById('btn-cloud-import');
  if (importBtn) importBtn.addEventListener('click', () => {
    showModal(`
      <div class="modal-confirm">
        <h3 class="panel-title">${t('prog.cloudImport')}</h3>
        <p>${t('cloud.importConfirm')}</p>
        <div class="training-form__actions">
          <button class="btn-secondary" onclick="closeModal()">${t('common.cancel')}</button>
          <button class="btn-primary" id="btn-confirm-cloud-import">${t('cloud.confirmImport')}</button>
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
  showToast(t('toast.saveExported'), 'success');
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
      ensureAIRosterAges(state.aiRosters); // v1.15.3 : idem pour les effectifs IA
    cleanupPhantomPlayerJournalEntries(state); // v1.15.4 : purge les fausses entrées retraite/arrivée
      saveGame();
      updateResourceBar();
      showView('home');
      if (typeof renderHome === 'function') renderHome();
      showToast(t('toast.saveImported'), 'success');
    } catch (err) {
      showToast(t('toast.saveInvalid'), 'error');
    }
  };
  reader.readAsText(file);
}

/* ------------------------------------------------------------
   Navigation SPA (CDC 2.3)
   ------------------------------------------------------------ */
let currentView = 'home';

function showView(viewName) {
  currentView = viewName;
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
    case 'journal':
      if (typeof renderJournal === 'function') renderJournal();
      break;
    case 'sponsor':
      if (typeof renderSponsorView === 'function') renderSponsorView();
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
  showModal(`<div class="changelog-modal"><p class="changelog-loading">${t('common.loading')}</p></div>`);
  const changelogFile = getLang() === 'en' ? 'CHANGELOG.en.md' : 'CHANGELOG.md'; // v1.15.2 : changelog traduit en anglais
  fetch(changelogFile)
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

const TRAIT_SCOUT_LABELS = {
  igl:        { label: 'IGL',                note: 'orchestre la stratégie collective' },
  mechanical: { label: 'Mécaniquement fort', note: 'excelle dans les duels et l\'exécution' },
  leader:     { label: 'Leader',             note: 'renforce le mental de l\'équipe sous pression' },
  veteran:    { label: 'Vétéran',            note: 'constant sur la durée, résistant à la fatigue' },
  rookie:     { label: 'Rookie',             note: 'inconstant — peut surprendre ou décevoir' },
  tiltable:   { label: 'Tiltable',           note: 'performances chutent si l\'équipe prend du retard' },
  clutch:     { label: 'Clutch',             note: 'monte en régime en situation critique (playoffs)' },
  consistant: { label: 'Consistant',         note: 'fiable, peu de variations de performance' }
};

const SCOUT_TAG_LABELS = {
  engage: 'Engage', poke: 'Poke', scaling: 'Scaling', splitpush: 'Split-push',
  pick: 'Pick', protect: 'Protect', dive: 'Dive', disengage: 'Disengage',
  teamfight: 'Teamfight', siege: 'Siège', execute: 'Execute'
};

function getTeamCompositionTags(team) {
  const counts = {};
  team.roster.forEach((p) => {
    p.championPool.forEach((champName) => {
      const champ = getChampionByName(champName);
      if (!champ) return;
      (champ.tags || []).forEach((tag) => { counts[tag] = (counts[tag] || 0) + 1; });
    });
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([tag]) => tag);
}

function getTeamPhasePower(team) {
  const totals = { early: 0, mid: 0, late: 0 };
  let count = 0;
  team.roster.forEach((p) => {
    p.championPool.slice(0, 3).forEach((champName) => {
      const champ = getChampionByName(champName);
      if (!champ || !champ.phasePower) return;
      totals.early += champ.phasePower.early;
      totals.mid += champ.phasePower.mid;
      totals.late += champ.phasePower.late;
      count++;
    });
  });
  if (count === 0) return null;
  return {
    early: Math.round(totals.early / count),
    mid: Math.round(totals.mid / count),
    late: Math.round(totals.late / count)
  };
}

function getTeamH2HRecord(teamId) {
  const teamName = getTeamName(teamId);
  const real = (state.matchHistory || []).filter((m) => m.opponent === teamName && m.competition !== 'Scrim');
  if (real.length === 0) return null;
  const wins = real.filter((m) => m.result === 'win').length;
  return { wins, losses: real.length - wins, total: real.length };
}

function getCounterPickSuggestions(team) {
  const suggestions = [];
  DRAFT_ROLES.forEach((role) => {
    const opp = team.roster.find((p) => p.role === role);
    if (!opp) return;
    const comfort = (((team.draftProfile || {}).comfortPicks || {})[role] || []).slice(0, 2);
    const likely = [...new Set([...comfort, ...opp.championPool.slice(0, 2)])].slice(0, 3);
    let best = null;
    likely.forEach((name) => {
      const champ = getChampionByName(name);
      if (!champ) return;
      const top = CHAMPION_COUNTERS
        .filter((e) => e.target === champ.id && e.score >= 72)
        .sort((a, b) => b.score - a.score)[0];
      if (top && (!best || top.score > best.score)) {
        best = { theirChamp: name, counterId: top.counter, score: top.score };
      }
    });
    if (best) {
      const counterChamp = getChampionById(best.counterId);
      if (counterChamp) suggestions.push({ role, theirChamp: best.theirChamp, counterName: counterChamp.name, score: best.score });
    }
  });
  return suggestions;
}

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
    lines.push(t('scout.priorityBan', { champ }));
  });
  DRAFT_ROLES.forEach((role) => {
    // v1.15.3 : pas de priorité de pick fiable pour un joueur encore inconnu.
    const rolePlayer = team.roster.find((r) => r.role === role);
    if (rolePlayer && rolePlayer.unknownScout) {
      lines.push(t('scout.priorityUnknown', { role: ROLE_NAMES[role] }));
      return;
    }
    const picks = (team.draftProfile.comfortPicks || {})[role];
    if (picks && picks.length) lines.push(t('scout.priorityComfort', { role: ROLE_NAMES[role], champ: picks[0] }));
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
  const compTags = getTeamCompositionTags(team);
  const phase = getTeamPhasePower(team);

  // --- Forme récente ---
  const form = getTeamRecentForm(team.id);
  const formHtml = form ? (() => {
    const streakLabel = form.streakWin
      ? `<span class="level-delta level-delta--up">${t('scout.streakWin', { n: form.streakLen })}</span>`
      : `<span class="level-delta level-delta--down">${t('scout.streakLoss', { n: form.streakLen })}</span>`;
    return `<p>${t('scout.recentForm', { total: form.total, wins: form.wins, losses: form.total - form.wins, wr: form.winRate, streak: streakLabel })}</p>`;
  })() : '';

  // --- Tags de composition ---
  const tagsHtml = compTags.length
    ? `<p>${t('scout.compStyle', { tags: compTags.map((tag) => `<span class="scout-comp-tag">${scoutTagLabel(tag)}</span>`).join(' ') })}</p>`
    : '';

  // --- Force par phase ---
  let phaseHtml = '';
  if (phase) {
    const vals = [['Early', phase.early], ['Mid', phase.mid], ['Late', phase.late]];
    const maxPhase = vals.reduce((a, b) => (b[1] > a[1] ? b : a));
    phaseHtml = `<p>${t('scout.phaseForce', { phases: vals.map(([label, val]) => {
      const strong = label === maxPhase[0];
      return `<span class="${strong ? 'scout-phase--strong' : 'scout-phase--normal'}">${label} ${val}/10</span>`;
    }).join(' &bull; ') })}</p>`;
  }

  const tierSuffix = team.tier === 1 ? t('scout.tierMajor') : team.tier === 2 ? t('scout.tierCompetitive') : t('scout.tierEmerging');

  // ===================== BASIQUE =====================
  let html = `
    <div class="progress-bar"><div class="progress-bar__fill" style="width:${report.confidence}%"></div></div>
    <p class="card__count">${t('scout.confidence', { conf: report.confidence, scrims: report.scrimsPlayed || 0 })}</p>

    <h4>${t('scout.reportBasic')}</h4>
    <p>${t('scout.tierLine', { n: team.tier, suffix: tierSuffix })}</p>
    <p>${t('scout.generalStyle', { style: formatStyle(team.style) })}</p>
    <p>${t('scout.avgLevel', { n: avgLevel })}</p>
    <p>${t('scout.topChamps', { champs: topChamps.join(', ') })}</p>
    ${tagsHtml}
    ${phaseHtml}
    ${formHtml}
  `;

  // ===================== AVANCÉ =====================
  if (tier === 'advanced' || tier === 'premium') {
    const priorities = getTeamDraftPriorityList(team);
    const weak = getTeamWeakestRole(team);
    const recentChamps = getTeamRecentChampions(team.id);
    const h2h = getTeamH2HRecord(team.id);

    // Pool par rôle
    const poolRows = DRAFT_ROLES.map((role) => {
      const p = team.roster.find((r) => r.role === role);
      if (!p) return '';
      // v1.15.3 : un remplaçant tout juste arrivé reste inconnu tant qu'aucun match/scrim
      // n'a été joué contre son équipe (voir revealScoutedTeam).
      if (p.unknownScout) {
        return `<div class="scout-pool-row"><span class="scout-pool-role">${ROLE_NAMES[role]}</span><span class="scout-pool-name">${p.name}</span><span class="scout-pool-champs scout-unknown">${t('scout.unknownInfo')}</span></div>`;
      }
      if (p.championPool.length === 0) return '';
      const picks = p.championPool.slice(0, 3).join(', ');
      return `<div class="scout-pool-row"><span class="scout-pool-role">${ROLE_NAMES[role]}</span><span class="scout-pool-name">${p.name}</span><span class="scout-pool-champs">${picks}</span></div>`;
    }).join('');

    // Traits joueurs
    const traitRows = DRAFT_ROLES.map((role) => {
      const p = team.roster.find((r) => r.role === role);
      if (!p) return '';
      if (p.unknownScout) {
        return `<div class="scout-trait-row"><span class="scout-pool-name">${p.name} <span class="scout-pool-role">${ROLE_NAMES[role]}</span></span><span class="scout-unknown">${t('scout.unknownInfo')}</span></div>`;
      }
      if (!p.traits || p.traits.length === 0) return '';
      const traitLabels = p.traits.map((tr) => {
        const lbl = scoutTraitLabel(tr);
        return lbl ? `<span class="scout-trait">${lbl}</span>` : null;
      }).filter(Boolean).join(' ');
      const firstNote = p.traits[0] ? scoutTraitNote(p.traits[0]) : '';
      const note = firstNote ? ` — ${firstNote}` : '';
      return traitLabels ? `<div class="scout-trait-row"><span class="scout-pool-name">${p.name} <span class="scout-pool-role">${ROLE_NAMES[role]}</span></span><span>${traitLabels}${note}</span></div>` : '';
    }).filter(Boolean).join('');

    const recentChampsHtml = recentChamps
      ? `<p>${t('scout.recentChamps', { champs: recentChamps.map((c) => `${c.name} (${c.games}x)`).join(', ') })}</p>`
      : '';

    const h2hHtml = h2h
      ? `<p>${t('scout.h2h', { w: h2h.wins, l: h2h.losses, total: h2h.total, s: h2h.total > 1 ? 's' : '' })}</p>`
      : '';

    html += `
      <h4>${t('scout.reportAdvanced')}</h4>
      <p><strong>${t('scout.poolByRole')}</strong></p>
      <div class="scout-pool-list">${poolRows}</div>
      <p style="margin-top:10px;"><strong>${t('scout.playerProfiles')}</strong></p>
      ${traitRows || `<p class="card__count">${t('scout.noTraits')}</p>`}
      <p style="margin-top:10px;"><strong>${t('scout.draftPriorities')}</strong></p>
      <div class="scrim-report">${priorities.map((l) => `<p>${l}</p>`).join('')}</div>
      <p>${t('scout.matchupWeak', { role: ROLE_NAMES[weak.role], name: weak.player.name, score: weak.score })}</p>
      ${recentChampsHtml}
      ${h2hHtml}
    `;
  } else {
    html += `<div class="objective-description">${t('scout.lockedAdvanced')}</div>`;
  }

  // ===================== PREMIUM =====================
  if (tier === 'premium') {
    const weak = getTeamWeakestRole(team);
    const myPlayer = state.roster.find((p) => p.role === weak.role);
    const topBan = ((team.draftProfile && team.draftProfile.banPriorities) || [])[0];
    const flexPicks = (team.draftProfile && team.draftProfile.flexPicks) || [];
    const counterSuggestions = getCounterPickSuggestions(team);

    // Tableau joueurs enrichi (Lane / TF / Méca / SC / Mental + forme)
    const playerRows = DRAFT_ROLES.map((role) => {
      const p = team.roster.find((r) => r.role === role);
      if (!p) return '';
      // v1.15.3 : pas de stats détaillées fiables pour un joueur encore inconnu.
      if (p.unknownScout) {
        return `
        <div class="career-progression-row">
          <span class="career-progression-row__name">${p.name} <span class="career-progression-row__role">${role}</span></span>
          <span class="career-progression-row__levels scout-unknown">${t('scout.unknownInfo')}</span>
        </div>`;
      }
      const avg = Math.round((p.laning + p.teamfight + p.mechanics + p.shotcalling + p.mental) / 5);
      const myP = state.roster.find((r) => r.role === role);
      const myAvg = myP ? Math.round((myP.laning + myP.teamfight + myP.mechanics + myP.shotcalling + myP.mental) / 5) : null;
      const advantage = myAvg !== null
        ? (myAvg >= avg
          ? `<span class="level-delta level-delta--up">${t('scout.advantage')}</span>`
          : `<span class="level-delta level-delta--down">${t('scout.disadvantage')}</span>`)
        : '';
      const formIcon = p.form >= 70 ? '🔥' : p.form >= 45 ? '➡️' : '📉';
      return `
        <div class="career-progression-row">
          <span class="career-progression-row__name">${p.name} <span class="career-progression-row__role">${role}</span> ${formIcon}</span>
          <span class="career-progression-row__levels">${t('scout.statLine', { lane: p.laning, tf: p.teamfight, meca: p.mechanics, sc: p.shotcalling, mental: p.mental })}</span>
          <span class="career-progression-row__period">${t('tr.avg', { n: avg })}</span>
          ${advantage}
        </div>`;
    }).join('');

    // Counter-picks suggérés
    const counterHtml = counterSuggestions.length
      ? counterSuggestions.map((s) => `<div class="scout-counter-row"><span class="scout-pool-role">${ROLE_NAMES[s.role]}</span><span class="card__count">${t('scout.counterIf', { champ: s.theirChamp })}</span><span class="scout-counter-pick">→ ${s.counterName} <span class="card__count">${t('scout.counterScore', { score: s.score })}</span></span></div>`).join('')
      : `<p class="card__count">${t('scout.noCounter')}</p>`;

    // Flex picks
    const flexHtml = flexPicks.length
      ? `<p>${t('scout.flexPicks', { picks: flexPicks.slice(0, 4).join(', ') })}</p>`
      : '';

    // Joueur à surveiller (potentiel le plus élevé)
    const watchPlayer = team.roster.reduce((best, p) =>
      (!best || (p.potential || 0) > (best.potential || 0)) ? p : best, null);
    const watchHtml = watchPlayer && (watchPlayer.potential || 0) > avgLevel
      ? `<p>${t('scout.watchPlayer', { name: watchPlayer.name, role: ROLE_NAMES[watchPlayer.role], pot: watchPlayer.potential })}</p>`
      : '';

    html += `
      <h4>${t('scout.reportPremium')}</h4>
      <div class="career-progression-list" style="margin-bottom:10px;">${playerRows}</div>
      <p style="margin-top:10px;"><strong>${t('scout.counterSuggested')}</strong></p>
      <div class="scout-pool-list">${counterHtml}</div>
      ${flexHtml}
      ${watchHtml}
      <p style="margin-top:10px;">${t('scout.draftPlan', { role: ROLE_NAMES[weak.role], forPlayer: myPlayer ? t('scout.forPlayer', { name: myPlayer.name }) : '', ban: topBan || t('scout.signaturePick') })}</p>
      <p>${t('scout.recommendedScrim', { role: ROLE_NAMES[weak.role] })}</p>
    `;
  } else if (tier === 'advanced') {
    html += `<div class="objective-description">${t('scout.lockedPremium')}</div>`;
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

const OBJECTIVE_GUIDE = {
  champion_mastery: {
    icon: '🎯',
    gains: [{ label: 'Maîtrise champion', dots: 3 }, { label: 'Mécanique', dots: 1 }],
    best: 'Développer le pool · Débloquer un pick pour la draft',
    warning: 'Aucune stat générale améliorée. Rendement faible si maîtrise déjà > 80.'
  },
  composition_test: {
    icon: '⚔️',
    gains: [{ label: 'Maîtrise (multi-champions)', dots: 2 }, { label: 'Teamfight / Shotcalling', dots: 1 }],
    best: 'Préparer un style de jeu · Polir plusieurs picks en parallèle',
    warning: 'Gain réduit vs Champion ciblé. Inefficace si le pool ne contient pas le tag visé.'
  },
  matchup_prep: {
    icon: '🔍',
    gains: [{ label: 'Scouting (confiance adversaire)', dots: 3 }, { label: 'Laning (si victoire)', dots: 1 }],
    best: 'Avant un match clé · Débloquer les rapports scouting avancés',
    warning: 'Très peu de progression en stats joueurs. Peu utile hors contexte d\'un prochain adversaire.'
  },
  macro_objectives: {
    icon: '🗺️',
    gains: [{ label: 'Shotcalling (toute l\'équipe)', dots: 3 }, { label: 'Mental (+1 si victoire)', dots: 1 }],
    best: 'Améliorer la coordination collective · Jungle & Support progressent 1,5× plus vite',
    warning: 'Aucun effet sur la maîtrise des champions ni la mécanique individuelle.'
  },
  free_scrim: {
    icon: '🎲',
    gains: [{ label: 'Forme (toute l\'équipe)', dots: 2 }, { label: 'Mental (+1 si victoire)', dots: 1 }],
    best: 'Maintenir la Forme · Gain amplifié contre un adversaire Tier 1 (×1.2)',
    warning: 'N\'améliore aucune stat permanente. Défaite en haute intensité peut faire baisser la forme.'
  }
};

function buildObjectiveCardHtml(objectiveId, def) {
  const guide = OBJECTIVE_GUIDE[objectiveId] || {};
  const dotsHtml = (n) => {
    return [1, 2, 3].map((i) =>
      `<span class="obj-dot ${i <= n ? 'obj-dot--on' : 'obj-dot--off'}">●</span>`
    ).join('');
  };
  const gainsHtml = (guide.gains || []).map((g, i) =>
    `<span class="obj-card__gain">${t('scrim.guide.' + objectiveId + '.gain' + (i + 1))} <span class="obj-dots">${dotsHtml(g.dots)}</span></span>`
  ).join('');

  return `<div class="obj-card">
    <div class="obj-card__header">
      <span class="obj-card__icon">${guide.icon || ''}</span>
      <span class="obj-card__name">${scrimObjLabel(objectiveId)}</span>
    </div>
    <p class="obj-card__desc">${t('scrim.obj.' + objectiveId + '.desc')}</p>
    ${guide.gains ? `<div class="obj-card__row"><span class="obj-card__row-label">${t('train.develops')}</span><div class="obj-card__gain-list">${gainsHtml}</div></div>` : ''}
    ${guide.gains ? `<div class="obj-card__row obj-card__row--best"><span class="obj-card__row-icon">⚡</span><span>${t('scrim.guide.' + objectiveId + '.best')}</span></div>` : ''}
    ${guide.gains ? `<div class="obj-card__row obj-card__row--warn"><span class="obj-card__row-icon">⚠</span><span>${t('scrim.guide.' + objectiveId + '.warn')}</span></div>` : ''}
  </div>`;
}

function showObjectiveGuideModal() {
  const cards = SCRIM_OBJECTIVES.map((o) =>
    `<div class="obj-guide-entry">${buildObjectiveCardHtml(o.id, o)}</div>`
  ).join('');
  showModal(`
    <h3 class="panel-title">${t('train.guideTitle')}</h3>
    <p style="color:var(--color-text-muted);font-size:13px;margin:0 0 16px;">${t('train.guideIntro')}</p>
    <div class="obj-guide-grid">${cards}</div>
    <div class="modal-content__actions" style="margin-top:20px;">
      <button class="btn-primary" onclick="closeModal();">${t('common.close')}</button>
    </div>
  `);
}

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

/* ------------------------------------------------------------
   Sponsors (v1.15.0)
   ------------------------------------------------------------
   Deux types de contrats :
   - 'signature' : bonus fixe à la signature, objectifs à tenir sur l'année,
     renouvellement +successPct si 100% des objectifs atteints, -failurePct
     (avertissement) si atteints partiellement, résiliation + remboursement
     au prorata (plafonné au budget dispo, le manque se convertit en malus
     de prestige) si aucun objectif atteint.
   - 'result' : aucun bonus à la signature, payé en continu à chaque
     compétition (domesticWeight × récompense de saison, intlWeight ×
     récompense internationale). Seuls les paliers premium ont une clause
     de rupture (breach), vérifiée aux jalons existants du jeu.
   Chaque objectif est soit un code seul (obligatoire), soit un tableau de
   codes (groupe OU, un seul suffit).
   ------------------------------------------------------------ */
const SPONSOR_TIER_ORDER = ['premium', 'standard', 'secure'];
const SPONSOR_TIERS = {
  premium:  { prestigeReq: 75 },
  standard: { prestigeReq: 50 },
  secure:   { prestigeReq: 10 }
};

const SPONSOR_CONTRACTS = [
  // --- Signature / Premium ---
  { id: 'sig_premium_auroratech', type: 'signature', tier: 'premium', brand: 'AuroraTech',
    signingBonus: 500, objectives: [['REG1', 'POTITLE'], 'INTLQUAL2', 'INTLSF'], successPct: 0.05, failurePct: 0.05 },
  { id: 'sig_premium_wardstone', type: 'signature', tier: 'premium', brand: 'Wardstone Bank',
    signingBonus: 550, objectives: ['POTITLE', 'INTLF'], successPct: 0.08, failurePct: 0.03 },
  { id: 'sig_premium_helios', type: 'signature', tier: 'premium', brand: 'Helios Energy',
    signingBonus: 480, objectives: ['REGTOP2', 'POSF', 'INTLQUAL'], successPct: 0.04, failurePct: 0.06 },
  { id: 'sig_premium_zenith', type: 'signature', tier: 'premium', brand: 'Zenith Airlines',
    signingBonus: 420, objectives: ['INTLWIN', 'REGTOP4'], successPct: 0.10, failurePct: 0.10 },

  // --- Signature / Standard ---
  { id: 'sig_standard_pulsecola', type: 'signature', tier: 'standard', brand: 'PulseCola',
    signingBonus: 320, objectives: ['REGTOP4', 'POSF'], successPct: 0.06, failurePct: 0.05 },
  { id: 'sig_standard_byteforge', type: 'signature', tier: 'standard', brand: 'ByteForge',
    signingBonus: 280, objectives: ['REGFLOOR6', 'POF'], successPct: 0.05, failurePct: 0.07 },
  { id: 'sig_standard_ironpeak', type: 'signature', tier: 'standard', brand: 'IronPeak Insurance',
    signingBonus: 250, objectives: ['REGTOP4'], successPct: 0.04, failurePct: 0.04 },
  { id: 'sig_standard_voltra', type: 'signature', tier: 'standard', brand: 'Voltra Mobile',
    signingBonus: 220, objectives: ['INTLQUAL', 'POSF'], successPct: 0.07, failurePct: 0.06 },

  // --- Signature / Secure ---
  { id: 'sig_secure_cornerstore', type: 'signature', tier: 'secure', brand: 'CornerStore Gaming',
    signingBonus: 150, objectives: ['REGFLOOR6'], successPct: 0.05, failurePct: 0.03 },
  { id: 'sig_secure_riftsnack', type: 'signature', tier: 'secure', brand: 'RiftSnack',
    signingBonus: 120, objectives: ['POSF'], successPct: 0.06, failurePct: 0.04 },
  { id: 'sig_secure_localhost', type: 'signature', tier: 'secure', brand: 'LocalHost ISP',
    signingBonus: 100, objectives: ['REGTOP4'], successPct: 0.04, failurePct: 0.03 },
  { id: 'sig_secure_greenleaf', type: 'signature', tier: 'secure', brand: 'GreenLeaf Cafe',
    signingBonus: 80, objectives: ['REGFLOOR6'], successPct: 0.08, failurePct: 0.02 },

  // --- Résultat / Premium (clause de rupture) ---
  { id: 'res_premium_novastream', type: 'result', tier: 'premium', brand: 'NovaStream',
    domesticWeight: 0.6, intlWeight: 0.6, breach: 'MISSED_PLAYOFFS' },
  { id: 'res_premium_primevolt', type: 'result', tier: 'premium', brand: 'PrimeVolt',
    domesticWeight: 0.3, intlWeight: 1.0, breach: 'NO_INTL_QUAL' },
  { id: 'res_premium_eagleeye', type: 'result', tier: 'premium', brand: 'EagleEye Analytics',
    domesticWeight: 1.0, intlWeight: 0.2, breach: 'MISSED_SEMIFINAL' },
  { id: 'res_premium_titanium', type: 'result', tier: 'premium', brand: 'Titanium Sports Co.',
    domesticWeight: 0.4, intlWeight: 0.4, flatBonus: { onPoTitle: 100, onIntlFinal: 150 }, breach: 'MISSED_PLAYOFFS' },

  // --- Résultat / Standard ---
  { id: 'res_standard_sparkfuel', type: 'result', tier: 'standard', brand: 'SparkFuel',
    domesticWeight: 0.35, intlWeight: 0.35 },
  { id: 'res_standard_rapidnet', type: 'result', tier: 'standard', brand: 'RapidNet',
    domesticWeight: 0.2, intlWeight: 0.5 },
  { id: 'res_standard_bluehive', type: 'result', tier: 'standard', brand: 'BlueHive Media',
    domesticWeight: 0.5, intlWeight: 0.15 },
  { id: 'res_standard_ferrotech', type: 'result', tier: 'standard', brand: 'Ferrotech',
    domesticWeight: 0.25, intlWeight: 0.25, flatBonus: { onPoTitle: 60 } },

  // --- Résultat / Secure ---
  { id: 'res_secure_quickbite', type: 'result', tier: 'secure', brand: 'QuickBite',
    domesticWeight: 0.15, intlWeight: 0.15 },
  { id: 'res_secure_startergg', type: 'result', tier: 'secure', brand: 'StarterGG',
    domesticWeight: 0.2, intlWeight: 0.1 },
  { id: 'res_secure_localarena', type: 'result', tier: 'secure', brand: 'LocalArena',
    domesticWeight: 0.15, intlWeight: 0.15, presenceBonus: 10 },
  { id: 'res_secure_copperleague', type: 'result', tier: 'secure', brand: 'CopperLeague',
    domesticWeight: 0.1, intlWeight: 0.1 }
];

function getSponsorContract(contractId) {
  return SPONSOR_CONTRACTS.find((c) => c.id === contractId) || null;
}

function getSponsorContractsByTierType(tier, type) {
  return SPONSOR_CONTRACTS.filter((c) => c.tier === tier && c.type === type);
}

function isSponsorTierUnlocked(tier) {
  return state.resources.prestige >= SPONSOR_TIERS[tier].prestigeReq;
}

function sponsorEffectiveYear() {
  const pending = state.sponsor && state.sponsor.pendingNextSeason;
  return pending ? pending.year : currentGameYear();
}

function pushSponsorLog(kind, contractId, extra) {
  if (!Array.isArray(state.sponsorLog)) state.sponsorLog = [];
  const contract = getSponsorContract(contractId);
  const year = sponsorEffectiveYear();
  state.sponsorLog.unshift(Object.assign({ y: year, k: kind, brand: contract ? contract.brand : contractId }, extra || {}));
  const cutoff = year - 9;
  state.sponsorLog = state.sponsorLog.filter((e) => e.y >= cutoff);
}

/* --- Accumulateur des résultats de l'année (persiste entre les 2 splits) --- */
function createEmptySponsorYearRecap() {
  return {
    regBestRank: null,
    poBestPlacement: null,
    poTitleWon: false,
    intlQualified: { msi: false, worlds: false },
    intlBestPlacement: null
  };
}

function updateSponsorYearRecap(patch) {
  if (!state.sponsorYearRecap) state.sponsorYearRecap = createEmptySponsorYearRecap();
  const r = state.sponsorYearRecap;
  if (patch.regularRank != null) {
    r.regBestRank = r.regBestRank == null ? patch.regularRank : Math.min(r.regBestRank, patch.regularRank);
  }
  if (patch.finalPlacement != null) {
    r.poBestPlacement = r.poBestPlacement == null ? patch.finalPlacement : Math.min(r.poBestPlacement, patch.finalPlacement);
  }
  if (patch.poTitle) r.poTitleWon = true;
  if (patch.intlEvent) {
    r.intlQualified[patch.intlEvent] = true;
    if (patch.intlPlacement != null) {
      r.intlBestPlacement = r.intlBestPlacement == null ? patch.intlPlacement : Math.min(r.intlBestPlacement, patch.intlPlacement);
    }
  }
}

/* --- Évaluation des objectifs (sponsors signature) --- */
function checkSponsorObjective(code, recap) {
  switch (code) {
    case 'REG1': return recap.regBestRank === 1;
    case 'REGTOP2': return recap.regBestRank != null && recap.regBestRank <= 2;
    case 'REGTOP4': return recap.regBestRank != null && recap.regBestRank <= 4;
    case 'REGFLOOR6': return recap.regBestRank != null && recap.regBestRank <= 6;
    case 'POTITLE': return recap.poTitleWon === true;
    case 'POSF': return recap.poBestPlacement != null && recap.poBestPlacement <= 3;
    case 'POF': return recap.poBestPlacement != null && recap.poBestPlacement <= 2;
    case 'INTLQUAL': return recap.intlQualified.msi || recap.intlQualified.worlds;
    case 'INTLQUAL2': return recap.intlQualified.msi && recap.intlQualified.worlds;
    case 'INTLSF': return recap.intlBestPlacement != null && recap.intlBestPlacement <= 4;
    case 'INTLF': return recap.intlBestPlacement != null && recap.intlBestPlacement <= 2;
    case 'INTLWIN': return recap.intlBestPlacement === 1;
    default: return false;
  }
}

// 'success' (tous atteints), 'partial' (au moins un), 'failure' (aucun).
function evaluateSponsorObjectives(objectives, recap) {
  const results = objectives.map((item) => (
    Array.isArray(item) ? item.some((c) => checkSponsorObjective(c, recap)) : checkSponsorObjective(item, recap)
  ));
  const metCount = results.filter(Boolean).length;
  if (metCount === results.length) return 'success';
  if (metCount === 0) return 'failure';
  return 'partial';
}

// Échec total d'un sponsor signature : remboursement intégral du bonus en cours,
// plafonné au budget disponible (jamais négatif) ; le manque se convertit en
// perte de prestige (~1 point par tranche de 10 de budget non remboursé).
function applySponsorTerminationRefund(current) {
  const owed = Math.round(current.amount || 0);
  const paid = Math.min(state.resources.budget, owed);
  state.resources.budget -= paid;
  const shortfall = owed - paid;
  let prestigeLost = 0;
  if (shortfall > 0) {
    prestigeLost = Math.ceil(shortfall / 10);
    state.resources.prestige = Math.max(0, state.resources.prestige - prestigeLost);
  }
  return { paid, shortfall, prestigeLost };
}

// Évalue le sponsor en cours à la clôture de l'année (avant de proposer la matrice
// d'offres). Sponsors signature : succès/partiel/échec sur les objectifs de l'année.
// Sponsors résultat : uniquement la clause de rupture liée à la qualification
// internationale (la clause "hors playoffs" est déjà vérifiée en cours d'année,
// voir applySponsorDomesticPayout).
function evaluateCurrentSponsorAtYearEnd() {
  state.sponsor.pendingRenewalAmount = null;
  state.sponsor.pendingRenewalOutcome = null;
  const current = state.sponsor.current;
  if (!current) return;
  const contract = getSponsorContract(current.contractId);
  if (!contract) { state.sponsor.current = null; return; }
  const recap = state.sponsorYearRecap || createEmptySponsorYearRecap();

  if (current.type === 'result') {
    if (contract.breach === 'NO_INTL_QUAL' && !(recap.intlQualified.msi || recap.intlQualified.worlds)) {
      showToast(t('sponsor.toast.breach', { brand: contract.brand }), 'error');
      pushSponsorLog('terminated_breach', current.contractId, {});
      state.sponsor.current = null;
    }
    return;
  }

  const outcome = evaluateSponsorObjectives(contract.objectives, recap);
  if (outcome === 'success') {
    state.sponsor.pendingRenewalAmount = Math.round(current.amount * (1 + contract.successPct));
    state.sponsor.pendingRenewalOutcome = 'success';
  } else if (outcome === 'partial') {
    state.sponsor.pendingRenewalAmount = Math.round(current.amount * (1 - contract.failurePct));
    state.sponsor.pendingRenewalOutcome = 'partial';
    showToast(t('sponsor.toast.warning', { brand: contract.brand }), 'warning');
    pushSponsorLog('warned', current.contractId, {});
  } else {
    const { paid, prestigeLost } = applySponsorTerminationRefund(current);
    showToast(t('sponsor.toast.terminated', { brand: contract.brand }), 'error');
    pushSponsorLog(prestigeLost > 0 ? 'terminated_refund_shortfall' : 'terminated_refund', current.contractId, { paid, prestigeLost });
    state.sponsor.current = null;
  }
}

/* --- Paiements en continu des sponsors résultat --- */
function applySponsorDomesticPayout(rewards, placement) {
  const current = state.sponsor.current;
  if (!current || current.type !== 'result') return;
  const contract = getSponsorContract(current.contractId);
  if (!contract) return;
  let bonus = Math.round(rewards.budget * contract.domesticWeight);
  if (contract.flatBonus && contract.flatBonus.onPoTitle && placement === 1) bonus += contract.flatBonus.onPoTitle;
  if (contract.presenceBonus) bonus += contract.presenceBonus;
  if (bonus > 0) {
    state.resources.budget += bonus;
    pushSponsorLog('payout', current.contractId, { amount: bonus });
  }
  // Clauses de rupture vérifiées aux jalons existants (fin de saison régulière / fin des playoffs du split).
  let breached = false;
  if (contract.breach === 'MISSED_PLAYOFFS') {
    const regularRank = getSortedStandings().indexOf('player') + 1;
    breached = regularRank > 6;
  } else if (contract.breach === 'MISSED_SEMIFINAL') {
    breached = placement > 3; // pas au moins demi-finaliste (placement inclut déjà le résultat des playoffs du split)
  }
  if (breached) {
    showToast(t('sponsor.toast.breach', { brand: contract.brand }), 'error');
    pushSponsorLog('terminated_breach', current.contractId, {});
    state.sponsor.current = null;
  }
}

function applySponsorInternationalPayout(placement, rewards) {
  const current = state.sponsor.current;
  if (!current || current.type !== 'result') return;
  const contract = getSponsorContract(current.contractId);
  if (!contract) return;
  let bonus = Math.round(rewards.budget * contract.intlWeight);
  if (contract.flatBonus && contract.flatBonus.onIntlFinal && placement != null && placement <= 2) bonus += contract.flatBonus.onIntlFinal;
  if (bonus > 0) {
    state.resources.budget += bonus;
    pushSponsorLog('payout', current.contractId, { amount: bonus });
  }
}

/* --- Fenêtre de renouvellement (fin d'année) --- */
function drawSponsorOfferMatrix() {
  const cells = [];
  ['signature', 'result'].forEach((type) => {
    SPONSOR_TIER_ORDER.forEach((tier) => {
      const pool = getSponsorContractsByTierType(tier, type);
      cells.push(randomChoice(pool).id);
    });
  });
  return cells;
}

function openSponsorRenewalWindow(nextYear) {
  evaluateCurrentSponsorAtYearEnd(); // peut modifier budget/prestige (remboursement, malus)
  state.sponsor.pendingNextSeason = { split: 'spring', year: nextYear };
  state.sponsor.offers = drawSponsorOfferMatrix();
  state.sponsor.decisionPending = true;
  saveGame();
  updateResourceBar();
  showSponsorBanner();
}

function signSponsorContract(contractId) {
  const contract = getSponsorContract(contractId);
  if (!contract) return;
  if (contract.type === 'signature') {
    state.resources.budget += contract.signingBonus;
  }
  state.sponsor.current = {
    contractId: contract.id,
    type: contract.type,
    tier: contract.tier,
    signedYear: sponsorEffectiveYear(),
    amount: contract.type === 'signature' ? contract.signingBonus : null,
    streakYears: 1
  };
  pushSponsorLog('signed', contract.id, {});
  finalizeSponsorDecision();
}

function renewCurrentSponsor() {
  const current = state.sponsor.current;
  if (!current) return;
  const outcome = state.sponsor.pendingRenewalOutcome;
  if (current.type === 'signature' && state.sponsor.pendingRenewalAmount != null) {
    current.amount = state.sponsor.pendingRenewalAmount;
  }
  current.signedYear = sponsorEffectiveYear();
  current.streakYears = (current.streakYears || 1) + 1;
  pushSponsorLog(outcome === 'partial' ? 'renewed_malus' : 'renewed_bonus', current.contractId, {});
  finalizeSponsorDecision();
}

function finalizeSponsorDecision() {
  state.sponsor.offers = null;
  state.sponsor.decisionPending = false;
  state.sponsor.pendingRenewalAmount = null;
  state.sponsor.pendingRenewalOutcome = null;
  const pending = state.sponsor.pendingNextSeason;
  state.sponsor.pendingNextSeason = null;
  saveGame();
  updateResourceBar(); // bonus de signature / reconduction : rafraîchit budget/prestige à l'écran
  hideSponsorBanner();
  closeModal();
  if (pending) startSeason(pending.split, pending.year);
  else if (typeof renderSponsorView === 'function' && currentView === 'sponsor') renderSponsorView();
}

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

// v1.15.3 — équivalent de ensureRosterAges() pour les effectifs IA (state.aiRosters).
// Backfill par nom depuis AI_TEAMS ; repli assignPlayerAge (aléatoire par tier) pour les
// remplaçants générés ou les noms absents des données de base. Sans ce backfill, les
// joueurs IA retombent sur les défauts (22 ans / retraite à 30) → aucune retraite avant
// l'année ~9, journal des transferts vide côté IA. Appelée par loadGame() ET par les
// imports fichier/cloud (qui écrivent state directement sans passer par loadGame).
function ensureAIRosterAges(aiRosters) {
  if (!aiRosters || typeof aiRosters !== 'object') return;
  const lookup = {};
  if (typeof AI_TEAMS !== 'undefined') AI_TEAMS.forEach(t => (t.roster || []).forEach(r => {
    if (r.name && r.baseAge != null) lookup[r.name.toLowerCase()] = { baseAge: r.baseAge, retirementAge: r.retirementAge };
  }));
  Object.values(aiRosters).forEach((roster) => {
    if (!Array.isArray(roster)) return;
    roster.forEach((p) => {
      if (p.baseAge != null && p.retirementAge != null) return;
      const found = p.name && lookup[p.name.toLowerCase()];
      if (found) { p.baseAge = found.baseAge; p.retirementAge = found.retirementAge; }
      else assignPlayerAge(p);
    });
  });
}

// v1.15.4 — nettoyage rétroactif : avant le fix de applyAIRetirementRotation (qui
// touchait par erreur la copie fantôme de l'équipe du joueur dans aiRosters), une
// sauvegarde pouvait contenir de fausses entrées "retraite"/"arrivée" au nom de votre
// équipe, alors que votre vrai roster (state.roster) n'était jamais concerné. Ces deux
// types d'entrées ne doivent exister QUE côté IA ; côté joueur, seuls 'depart'
// (fin de contrat) et 'signature' sont légitimes.
function cleanupPhantomPlayerJournalEntries(s) {
  if (!Array.isArray(s.transferLog) || !s.transferLog.length) return;
  const mine = s.teamShortName || s.teamName || null;
  if (!mine) return;
  s.transferLog = s.transferLog.filter((e) => !(e.t === mine && (e.k === 'retraite' || e.k === 'arrivee')));
}

// ─── Fin de saison Worlds ────────────────────────────────────────────────────

// Fin de saison Worlds : les joueurs dont le contrat s'acheve et qui n'ont pas
// ete prolonges quittent l'equipe (postes a pourvoir au marche des transferts).
function processContractExpirations(completedYear) {
  // v1.11.0 : si la gestion des contrats est désactivée, aucun joueur ne part.
  if (state.settings && state.settings.playerContracts === false) return [];
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
  return t('scrim.exemptionShared', { event: eventLabel(state.international), year: state.international.year });
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
  const objLabel = scrimObjLabel(plan.objective);
  lines.push(t('train.reportResult', { result: win ? t('train.won') : t('train.lost'), opp: opponent.name, obj: objLabel }));

  const focusStats = OBJECTIVE_STAT_FOCUS[plan.objective] || OBJECTIVE_STAT_FOCUS.free_scrim;

  if (!win) {
    const weak = pickWeakLink(focusStats);
    if (weak) {
      lines.push(t('train.reportAnalysisLoss', { name: weak.player.name, stat: statLabel(weak.statKey), val: weak.value }));
    }
  } else {
    const strong = pickStrongLink(focusStats);
    if (strong) {
      lines.push(t('train.reportAnalysisWin', { name: strong.player.name, stat: statLabel(strong.statKey), val: strong.value }));
    }
  }

  const lastWeak = state.scrims.lastWeakLink;
  if (lastWeak) {
    const player = state.roster.find((p) => p.id === lastWeak.playerId);
    if (player && focusStats.includes(lastWeak.statKey)) {
      const currentVal = after[player.id][lastWeak.statKey];
      const delta = currentVal - lastWeak.value;
      if (delta > 0) {
        lines.push(t('train.reportFollowUp', { name: player.name, stat: statLabel(lastWeak.statKey), old: lastWeak.value, cur: currentVal, delta }));
      } else {
        lines.push(t('train.reportFollowUpNone', { name: player.name, cur: currentVal, stat: statLabel(lastWeak.statKey) }));
      }
    }
  }

  const deltaLines = [];
  state.roster.forEach((p) => {
    const b = before[p.id], a = after[p.id];
    ['shotcalling', 'laning', 'teamfight', 'mechanics', 'mental', 'form'].forEach((key) => {
      if (a[key] !== b[key]) {
        const diff = a[key] - b[key];
        deltaLines.push(t('train.reportDeltaLine', { name: p.name, stat: statLabel(key), sign: diff > 0 ? '+' : '', diff, old: b[key], new: a[key] }));
      }
    });
  });
  if (deltaLines.length) {
    lines.push(t('train.reportEvolution'));
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
    <h3 class="panel-title" style="color:var(--color-danger, #e05);">${t('train.refusalTitle')}</h3>
    <div style="display:flex;flex-direction:column;gap:14px;margin-top:8px;">
      <p style="color:var(--color-text);">${t('train.refusalDesc', { name: opponent.name })}</p>
      <div style="background:var(--color-surface-alt);border:1px solid var(--color-border);border-radius:6px;padding:12px 14px;">
        <p style="color:var(--color-text-muted);margin:0 0 6px;">
          &#127942; ${t('train.refusalReqLabel')} <strong style="color:var(--color-gold);">${required}</strong>
          &nbsp;|&nbsp; ${t('train.refusalYourLabel')} <strong style="color:${currentPrestige >= required ? 'var(--color-seafoam)' : '#e05'};">${currentPrestige}</strong>
        </p>
        <p style="color:var(--color-text-muted);margin:0;font-size:13px;">${t('train.refusalReason', { name: opponent.name })}</p>
      </div>
      <div style="background:var(--color-surface-alt);border:1px solid var(--color-border);border-radius:6px;padding:12px 14px;">
        <p style="color:var(--color-text-muted);margin:0;font-size:13px;">&#128464; ${t('train.refusalCost', { cost: costSpent })}</p>
      </div>
    </div>
    <div class="modal-content__actions" style="margin-top:20px;">
      <button class="btn-primary" onclick="closeModal();renderTraining();">${t('common.understood')}</button>
    </div>
  `);
}

function showScrimReportModal(report) {
  showModal(`
    <h3 class="panel-title">${t('train.reportTitle')}</h3>
    <div class="scrim-report">
      ${report.map((line) => `<p>${typeof line === 'object' ? logChip(line) : line}</p>`).join('')}
    </div>
    <div class="training-form__actions">
      <button class="btn-primary" id="btn-close-scrim-report">${t('common.close')}</button>
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
    <h2 class="region-select-title">${t('region.chooseRegion')}</h2>
    <p class="region-select-warning">${t('region.regionWarning')}</p>
    <div class="region-grid" id="region-grid">
      ${REGIONS.map((r) => `
        <div class="region-card" data-region="${r.id}">
          <div class="region-badge region-badge--${r.id}">${r.name}</div>
          <div class="region-card__name">${t('region.' + r.id + '.name')}</div>
          <div class="region-card__inspiration">${t('region.' + r.id + '.style')}</div>
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
    <h2 class="region-select-title">${t('region.chooseTeam', { region: region.name })}</h2>
    <p class="region-select-warning">${t('region.teamWarning')}</p>
    <div class="team-select-grid" id="team-select-grid">
      ${teams.map((team) => `
        <div class="team-select-card" data-team="${team.id}">
          <div class="region-badge region-badge--${regionId}">${team.shortName}</div>
          <div class="team-select-card__name">${team.name}</div>
          <div class="team-select-card__meta">${t('region.tierStyle', { n: team.tier, style: formatStyle(team.style) })}</div>
        </div>
      `).join('')}
    </div>
    <div class="quick-actions" style="justify-content:center;">
      <button class="btn-secondary" id="btn-back-to-regions">${t('region.backToRegions')}</button>
    </div>
  `;

  content.querySelectorAll('.team-select-card').forEach((card) => {
    card.addEventListener('click', () => {
      const team = teams.find((tm) => tm.id === card.dataset.team);
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
    <p class="region-select-warning">${t('region.tierStyleLabel', { n: team.tier, style: formatStyle(team.style) })}</p>
    <table class="history-table">
      <thead>
        <tr><th>${t('region.colRole')}</th><th>${t('region.colPlayer')}</th><th>${t('region.colNationality')}</th><th>${t('region.colLevel')}</th></tr>
      </thead>
      <tbody>${rosterRows}</tbody>
    </table>
    <div class="modal-content__actions">
      <button class="btn-secondary" id="btn-cancel-team">${t('region.goBack')}</button>
      <button class="btn-primary" id="btn-confirm-team">${t('region.confirm')}</button>
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
  showToast(t('toast.welcome', { team: team.name }), 'success');
  maybeShowOnboarding1110(maybeShowTutorialPrompt);
}

/* ------------------------------------------------------------
   Ecran d'accueil (CDC 12.1)
   ------------------------------------------------------------ */
function getNextMatchInfo() {
  // International en cours (priorité sur la saison régulière)
  const intl = state.international;
  if (intl && intl.phase !== 'done' && intl.pendingMatch) {
    const pm = intl.pendingMatch;
    const ev = intl.event === 'worlds' ? 'Worlds' : 'MSI';
    const phase = pm.type === 'group' ? 'Phase de groupes' : 'Bracket';
    return { competition: `${ev} ${intl.year} · ${phase}`, opponent: getTeamName(pm.opponentTeamId) };
  }

  const season = state.season;
  if (!season) return null;
  const splitName = season.split === 'summer' ? 'Summer Split' : 'Spring Split';

  // Playoffs avec match en attente
  if (season.phase === 'playoffs' && season.pendingMatch) {
    return { competition: `${splitName} · Playoffs`, opponent: getTeamName(season.pendingMatch.opponentTeamId) };
  }

  // Saison régulière avec match en attente
  if (season.phase === 'regular' && season.pendingMatch) {
    return { competition: `${splitName} · J${season.matchday}`, opponent: getTeamName(season.pendingMatch.opponentTeamId) };
  }

  // Saison régulière entre deux journées — cherche le prochain match du joueur
  if (season.phase === 'regular' && season.matchday <= season.schedule.length) {
    const fixture = getPlayerFixture(season.matchday);
    if (fixture) {
      const oppId = fixture.home === 'player' ? fixture.away : fixture.home;
      return { competition: `${splitName} · J${season.matchday}`, opponent: getTeamName(oppId) };
    }
  }

  return null;
}

function renderHome() {
  updateAllTeamNameDisplays();

  const regionEl = document.getElementById('home-team-region');
  if (regionEl) {
    regionEl.innerHTML = state.region
      ? `<span class="region-badge region-badge--${state.region}">${regionDisplayName(state.region)}</span>`
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

  const nextEl = document.getElementById('home-next-match');
  if (nextEl) {
    const info = getNextMatchInfo();
    nextEl.querySelector('.match-card--next__label').textContent = info ? info.competition : t('home.nextMatch');
    nextEl.querySelector('.match-card--next__teams').textContent = info ? `vs ${info.opponent}` : t('home.tbd');
  }

  const resultsEl = document.getElementById('home-recent-results');
  if (resultsEl) {
    if (state.matchHistory.length === 0) {
      resultsEl.innerHTML = `<p class="card__count">${t('home.noMatches')}</p>`;
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
    el.innerHTML = `<div class="empty-state">${t('empty.roster')}</div>`;
    return;
  }

  const roleOrder = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'];
  const sorted = [...state.roster].sort((a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role));

  const avgFatigue = Math.round(state.roster.reduce((sum, p) => sum + p.fatigue, 0) / state.roster.length);

  el.innerHTML = `
    <div class="panel-subsection rest-panel">
      <h3 class="panel-title">${t('roster.restTitle')}</h3>
      <p class="card__count">${t('roster.avgFatigue', { n: avgFatigue })}</p>
      <div class="training-form__actions">
        ${REST_OPTIONS.map((o) => `<button class="btn-secondary" data-rest="${o.id}">${t('roster.restBtn', { label: restLabel(o.id), red: o.fatigueReduction, cost: o.cost })}</button>`).join('')}
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
    showToast(t('toast.restNoCoaching'), 'error');
    return;
  }

  state.resources.coachingPoints -= option.cost;
  state.roster.forEach((p) => {
    p.fatigue = clamp(p.fatigue - option.fatigueReduction, 0, 100);
  });

  saveGame();
  updateResourceBar();
  renderRoster();
  showToast(t('toast.restDone', { label: restLabel(option.id) }), 'success');
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
    <span class="level-delta ${progression.delta > 0 ? 'level-delta--up' : 'level-delta--down'}" title="${t('roster.evolTitle')}">
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
          ${state.settings.playerContracts !== false && p.baseAge != null ? `<div style="font-size:11px;margin-top:1px;color:var(--color-text-muted);">${t('roster.age', { n: playerAge(p) })}</div>` : ''}
          ${state.settings.playerContracts !== false && p.contractUntil != null ? `<div style="font-size:11px;margin-top:2px;color:${isContractFinalYear(p) ? '#e0a020' : 'var(--color-text-muted)'};">${t('roster.contract', { y: p.contractUntil })}${isContractFinalYear(p) ? t('roster.lastYear') : ''}</div>` : ''}
        </div>
        <div class="player-card__level">${computeLevel(p)}${deltaHtml}</div>
      </div>
      <div class="player-card__stats">
        ${playerStatRow(t('stat.form'), p.form)}
        ${playerStatRow(t('stat.fatigue'), p.fatigue)}
        ${playerStatRow(t('stat.mental'), p.mental)}
        ${playerStatRow(t('stat.shotcalling'), p.shotcalling)}
        ${playerStatRow(t('stat.laning'), p.laning)}
        ${playerStatRow(t('stat.teamfight'), p.teamfight)}
        ${playerStatRow(t('stat.mechanics'), p.mechanics)}
      </div>
      <div class="player-card__pool">
        <span class="player-card__pool-label">${t('roster.championPool')}</span>
        <div class="champion-chip-list">
          ${p.championPool.map((c) => {
            const mastery = getChampionMastery(p.id, c);
            if (!mastery) return `<span class="champion-chip">${c}</span>`;
            const tier = getMasteryTier(mastery.mastery);
            return `<span class="champion-chip champion-chip--${tier.id}" title="${masteryTierLabel(tier.id)} (${mastery.mastery})">${c} <span class="champion-chip__mastery">${mastery.mastery}</span></span>`;
          }).join('')}
        </div>
      </div>
      ${p.traits.length ? `
        <div class="player-card__traits">
          ${p.traits.map((tr) => `<span class="trait-chip">${traitLabel(tr)}</span>`).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

function renderTraining() {
  const el = document.getElementById('training-content');
  if (!el) return;

  if (state.roster.length === 0) {
    el.innerHTML = `<div class="empty-state">${t('train.empty')}</div>`;
    return;
  }

  el.innerHTML = `
    <h3 class="panel-title">${t('train.planTitle')}</h3>
    <div class="training-form">
      <div class="training-form__group" id="scrim-objective-group">
        <div class="training-form__label-row">
          <label for="scrim-objective">${t('train.objective')}</label>
          <button type="button" class="btn-obj-guide" id="btn-obj-guide">${t('train.guideBtn')}</button>
        </div>
        <select id="scrim-objective">
          ${SCRIM_OBJECTIVES.map((o) => `<option value="${o.id}">${scrimObjLabel(o.id)}</option>`).join('')}
        </select>
        <div id="scrim-objective-description"></div>
      </div>

      <div class="training-form__group">
        <label for="scrim-region">${t('train.regionLabel')}</label>
        <select id="scrim-region">
          ${REGIONS.map((r) => `<option value="${r.id}" ${r.id === state.region ? 'selected' : ''}>${r.name}</option>`).join('')}
        </select>
      </div>

      <div class="training-form__group">
        <label for="scrim-opponent">${t('train.opponent')}</label>
        <select id="scrim-opponent"></select>
      </div>

      <div class="training-form__group">
        <label for="scrim-intensity">${t('train.intensity')}</label>
        <select id="scrim-intensity">
          ${SCRIM_INTENSITIES.map((i) => `<option value="${i.id}">${t('train.intensityOpt', { label: scrimIntensityLabel(i.id), cost: i.cost })}</option>`).join('')}
        </select>
      </div>

      <div class="training-form__group" id="scrim-focus-player-group">
        <label for="scrim-focus-player">${t('train.focusPlayer')}</label>
        <select id="scrim-focus-player">
          ${state.roster.map((p) => `<option value="${p.id}">${p.name} (${p.role})</option>`).join('')}
        </select>
      </div>

      <div class="training-form__group" id="scrim-focus-champion-group">
        <label for="scrim-focus-champion">${t('train.focusChampion')}</label>
        <select id="scrim-focus-champion"></select>
      </div>

      <div class="training-form__group training-form__group--full" id="scrim-comp-tags-group">
        <label>${t('train.compStyle')}</label>
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
      <button class="btn-primary" id="btn-run-scrim">${t('train.runScrim')}</button>
      <span class="card__count" id="scrim-cost-label"></span>
    </div>

    <h3 class="panel-title" style="margin-top:24px;">${t('train.historyTitle')}</h3>
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
    const opponents = getAITeamsForRegion(regionSelect.value).filter((team) => team.id !== state.aiTeamId);
    opponentSelect.innerHTML = opponents.map((team) => {
      const isSameRegion = team.region === playerAiRegion;
      const req = getScrimPrestigeReq(team.tier);
      const hasPrestige = state.resources.prestige >= req;
      const exemption = getScrimExemptionReason(team);
      let suffix = '';
      if (!isSameRegion && req > 0 && !exemption) {
        suffix = hasPrestige ? t('train.prestigeOk', { req }) : t('train.prestigeReq', { req });
      } else if (!isSameRegion && exemption) {
        suffix = t('train.sameComp');
      }
      return `<option value="${team.id}">${team.name} (${team.shortName})${suffix}</option>`;
    }).join('');
  }

  function updateObjectiveVisibility() {
    const objective = objectiveSelect.value;
    const def = SCRIM_OBJECTIVES.find((o) => o.id === objective);
    document.getElementById('scrim-objective-description').innerHTML = buildObjectiveCardHtml(objective, def);

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
      const label = mastery ? t('train.champMastery', { name: c.name, m: mastery.mastery }) : t('train.champNew', { name: c.name });
      return `<option value="${c.id}">${label}</option>`;
    }).join('');
  }

  function updateCostLabel() {
    const intensity = SCRIM_INTENSITIES.find((i) => i.id === intensitySelect.value);
    document.getElementById('scrim-cost-label').textContent =
      t('train.cost', { cost: intensity.cost, avail: state.resources.coachingPoints });
  }

  objectiveSelect.addEventListener('change', updateObjectiveVisibility);
  focusPlayerSelect.addEventListener('change', updateChampionOptions);
  intensitySelect.addEventListener('change', updateCostLabel);
  regionSelect.addEventListener('change', updateOpponentOptions);
  const guideBtn = document.getElementById('btn-obj-guide');
  if (guideBtn) guideBtn.addEventListener('click', showObjectiveGuideModal);

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
    wrapper.innerHTML = `<div class="empty-state">${t('train.emptyHistory')}</div>`;
    return;
  }

  wrapper.innerHTML = `
    <table class="history-table">
      <thead>
        <tr><th>${t('train.colOpponent')}</th><th>${t('train.colObjective')}</th><th>${t('train.colIntensity')}</th><th>${t('train.colResult')}</th><th>${t('train.colGains')}</th><th>${t('train.colReport')}</th></tr>
      </thead>
      <tbody>
        ${state.scrims.history.map((s, index) => {
          const objLabel = scrimObjLabel(s.objective);
          const intLabel = scrimIntensityLabel(s.intensity);
          return `
            <tr>
              <td>${s.opponentName}</td>
              <td>${objLabel}</td>
              <td>${intLabel}</td>
              <td><span class="result-tag ${s.win ? 'result-tag--win' : 'result-tag--loss'}">${s.win ? t('log.win') : t('log.loss')}</span></td>
              <td>${typeof s.summary === 'object' ? logChip(s.summary) : (s.summary || '')}</td>
              <td>${s.report ? `<button class="btn-secondary btn-view-report" data-history-index="${index}">${t('train.viewReport')}</button>` : ''}</td>
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
    showToast(t('train.toastInvalid'), 'error');
    return;
  }

  if (state.resources.coachingPoints < intensity.cost) {
    showToast(t('train.toastNoCoaching'), 'error');
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
    showToast(t('train.toastAccepted', { name: opponent.name, reason: exemptionReason }), 'info');
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
  showToast(win ? t('train.toastWin', { name: opponent.name }) : t('train.toastLoss', { name: opponent.name }), win ? 'success' : 'info');
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
  if (!player || !champion) return t('train.gainInvalidTarget');

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

  return t('train.gainMastery', { name: player.name, champ: champion.name, gain, m: entry.mastery });
}

function applyCompositionGain(plan, intensity, resultFactor) {
  const tags = plan.targetCompTags || [];
  if (tags.length === 0) return t('train.gainNoComp');

  let affected = 0;
  state.roster.forEach((player) => {
    player.championPool.forEach((champName) => {
      const champion = getChampionByName(champName);
      if (!champion || !champion.tags.some((tag) => tags.includes(tag))) return;

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

  return t('train.gainComp', { tags: tags.map((tag) => COMP_TAG_LABELS[tag]).join('/'), n: affected });
}

function applyMatchupPrepGain(plan, opponent, intensity, resultFactor) {
  if (!state.scouting[opponent.id]) {
    state.scouting[opponent.id] = { confidence: 0, scrimsPlayed: 0 };
  }
  const report = state.scouting[opponent.id];
  report.confidence = clamp(report.confidence + Math.round(15 * intensity.multiplier), 0, 100);
  report.scrimsPlayed = (report.scrimsPlayed || 0) + 1;
  revealScoutedTeam(opponent.id); // v1.15.3 : ce scrim découvre les joueurs inconnus de l'adversaire

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
      extra = t('train.gainScoutingExtra', { name: player.name, champ: champion.name, gain });
    }
    if (resultFactor > 1) {
      player.laning = clamp(player.laning + 1, 0, 100);
    }
  }

  return t('train.gainScouting', { opp: opponent.name, conf: report.confidence, extra });
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
  return t('train.gainMacro', { total });
}

function applyFreeScrimGain(intensity, win, tierMult) {
  const formDelta = Math.round((win ? 3 : -1) * intensity.multiplier * (tierMult || 1));
  state.roster.forEach((player) => {
    player.form = clamp(player.form + formDelta, 0, 100);
    player.mental = clamp(player.mental + (win ? 1 : 0), 0, 100);
  });
  return t('train.gainFree', { result: win ? t('train.won') : t('train.lost'), delta: `${formDelta >= 0 ? '+' : ''}${formDelta}` });
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

// Un champion de l'IA contre-t-il le champion du joueur ?
// Source de vérité identique à computeDraftScore : entrée de counter explicite,
// repli sur les counterTags.
function aiChampCounters(aiChampName, playerChampName) {
  const aiChamp = getChampionByName(aiChampName);
  const playerChamp = getChampionByName(playerChampName);
  if (!aiChamp || !playerChamp) return false;
  if (getCounterEntry(aiChamp.id, playerChamp.id)) return true;
  return playerChamp.tags.some((t) => aiChamp.counterTags.includes(t));
}

// Meilleur champion candidat de l'IA pour un rôle donné (confort → flex → pool → repli).
function aiCandidateForRole(draft, role) {
  const opponent = getOpponentTeam(draft);
  const profile = opponent.draftProfile;
  const fitsRole = (champName) => {
    const champion = getChampionByName(champName);
    return champion && (champion.role === role || champion.secondaryRoles.includes(role));
  };
  if (profile) {
    const comfort = ((profile.comfortPicks || {})[role] || []).find((c) => !isChampionTaken(draft, c) && fitsRole(c));
    if (comfort) return comfort;
    const flex = (profile.flexPicks || []).find((c) => !isChampionTaken(draft, c) && fitsRole(c));
    if (flex) return flex;
  }
  const aiPlayer = opponent.roster.find((p) => p.role === role);
  if (aiPlayer) {
    const champName = aiPlayer.championPool.find((c) => !isChampionTaken(draft, c) && fitsRole(c));
    if (champName) return champName;
  }
  const fallback = getChampionsForRole(role).find((c) => !isChampionTaken(draft, c.name));
  return fallback ? fallback.name : null;
}

// Sélection non-linéaire (v1.9.0) : l'IA ne suit plus l'ordre TOP→SUP.
// Elle cherche d'abord un rôle où elle peut contre-pick un champion déjà choisi
// par le joueur dans la même lane ; sinon elle retombe sur l'ordre habituel.
function aiChoosePick(draft) {
  const side = aiSide(draft);
  const picks = draft[side + 'Picks'];
  const roles = emptyRoles(picks);
  if (roles.length === 0) return null;

  const opponent = getOpponentTeam(draft);
  const profile = opponent.draftProfile;
  const riskTolerance = profile ? (profile.riskTolerance != null ? profile.riskTolerance : 50) : 50;
  const playerPicks = draft[draft.playerSide + 'Picks'];

  // Recherche d'une opportunité de contre-pick : un rôle vide où le joueur a déjà
  // pické et où l'IA dispose d'un candidat qui le contre dans la même lane.
  const counterOpportunities = [];
  roles.forEach((role) => {
    const playerChamp = playerPicks[role];
    if (!playerChamp) return;
    const candidate = aiCandidateForRole(draft, role);
    if (candidate && aiChampCounters(candidate, playerChamp)) {
      counterOpportunities.push({ role, champName: candidate });
    }
  });

  // L'IA saisit le contre-pick selon son agressivité (riskTolerance) : une équipe
  // prudente ne le fait pas systématiquement, ce qui la garde imprévisible.
  if (counterOpportunities.length && Math.random() * 100 < riskTolerance) {
    return counterOpportunities[0];
  }

  // Repli : ordre habituel (premier rôle vide) + meilleur candidat.
  const role = roles[0];
  const champName = aiCandidateForRole(draft, role);
  return champName ? { role, champName } : null;
}

function resolveAiTurnsUntilPlayer() {
  const draft = state.draft;
  while (draft && draft.status !== 'done' && draft.turnIndex < DRAFT_TURN_SEQUENCE.length) {
    const turn = currentTurn(draft);
    if (turn.side === draft.playerSide) break;

    const sideName = draftSideLabel(turn.side);
    if (turn.type === 'ban') {
      const champName = aiChooseBan(draft);
      if (champName) {
        draft[turn.side + 'Bans'].push(champName);
        draft.log.push(t('draft.logAiBan', { side: sideName, champ: champName }));
      }
    } else {
      const pick = aiChoosePick(draft);
      if (pick) {
        draft[turn.side + 'Picks'][pick.role] = pick.champName;
        draft.log.push(t('draft.logAiPick', { side: sideName, champ: pick.champName, role: ROLE_NAMES[pick.role] }));
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
  draft.log.push(t('draft.logPlayerBan', { champ: champName }));
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
  draft.log.push(t('draft.logPlayerPick', { champ: champName, role: ROLE_NAMES[role] }));
  draft.turnIndex++;
  resolveAiTurnsUntilPlayer();
  saveGame();
  renderDraft();
}

function finalizeDraft() {
  const draft = state.draft;
  draft.status = 'done';
  draft.result = computeDraftScore(draft);
  draft.log.push(t('draft.logDone'));

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
    comfortDetails.push(t('draft.detailComfort', { name: player.name, champ: champName, m: mastery }));
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
      const fmtTags = (entry) => (entry.matchedTags || []).map(tag => tag.charAt(0).toUpperCase() + tag.slice(1)).join(', ');
      if (iCounter) {
        const suffix = fmtTags(iCounter) ? ` (${fmtTags(iCounter)})` : '';
        matchupScore += 3;
        matchupDetails.push(t('draft.detailFavorable', { role: ROLE_NAMES[role], my: myChamp.name, enemy: enemyChamp.name, suffix }));
      }
      if (theyCounter) {
        const suffix = fmtTags(theyCounter) ? ` (${fmtTags(theyCounter)})` : '';
        matchupScore -= 3;
        matchupDetails.push(t('draft.detailUnfavorable', { role: ROLE_NAMES[role], my: myChamp.name, enemy: enemyChamp.name, suffix }));
      }
    } else {
      // Repli sur les tags (direction corrigée) : je contre l'ennemi si MES counterTags touchent SON profil
      if (enemyChamp.tags.some((tag) => myChamp.counterTags.includes(tag))) {
        matchupScore += 3;
        matchupDetails.push(t('draft.detailFavorable', { role: ROLE_NAMES[role], my: myChamp.name, enemy: enemyChamp.name, suffix: '' }));
      }
      if (myChamp.tags.some((tag) => enemyChamp.counterTags.includes(tag))) {
        matchupScore -= 3;
        matchupDetails.push(t('draft.detailUnfavorable', { role: ROLE_NAMES[role], my: myChamp.name, enemy: enemyChamp.name, suffix: '' }));
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

// ---- Assistant Coach de draft (v1.12.1) ----

// v1.14.1 : cherche, pour un rôle et une liste de champions cibles (ids) donnés,
// le meilleur counter DANS le pool du joueur concerné (confort) et le meilleur
// counter TOUTES POSSIBILITÉS CONFONDUES (idéal), en excluant systématiquement
// les champions bannis/déjà pris. Si le meilleur counter idéal se trouve aussi
// être dans le pool, comfort === ideal (même champion) : pas de carte "risquée"
// à afficher, un seul conseil suffit.
function getRoleCounterOptions(draft, myPlayer, role, targetChampIds) {
  let comfort = null;
  if (myPlayer) {
    myPlayer.championPool.forEach((champName) => {
      if (isChampionTaken(draft, champName)) return;
      const champ = getChampionByName(champName);
      if (!champ) return;
      targetChampIds.forEach((targetId) => {
        const entry = CHAMPION_COUNTERS.find((e) => e.counter === champ.id && e.target === targetId && e.score >= 65);
        if (entry && (!comfort || entry.score > comfort.score)) {
          const mastery = (getChampionMastery(myPlayer.id, champName) || {}).mastery || 0;
          comfort = { champName, score: entry.score, mastery, targetId };
        }
      });
    });
  }
  let ideal = null;
  targetChampIds.forEach((targetId) => {
    CHAMPION_COUNTERS.filter((e) => e.target === targetId && e.score >= 65).forEach((e) => {
      const champ = getChampionById(e.counter);
      if (!champ) return;
      if (champ.role !== role && !(champ.secondaryRoles || []).includes(role)) return;
      if (isChampionTaken(draft, champ.name)) return;
      if (!ideal || e.score > ideal.score) ideal = { champName: champ.name, score: e.score, targetId };
    });
  });
  return { comfort, ideal };
}

function getDraftCoachAdvice(draft) {
  const turn = currentTurn(draft);
  if (!turn || turn.side !== draft.playerSide) return [];

  const advice = [];
  const opponent = getOpponentTeam(draft);
  const oppSide = aiSide(draft);
  const oppPicks = draft[oppSide + 'Picks'];
  const myPicks = draft[draft.playerSide + 'Picks'];
  const freeRoles = emptyRoles(myPicks);

  if (turn.type === 'ban') {
    // Ban prioritaire scouting
    const report = getScoutingReport(opponent.id);
    if (getScoutingTier(report.confidence) !== 'basic') {
      const target = ((opponent.draftProfile || {}).banPriorities || []).find((c) => !isChampionTaken(draft, c));
      if (target) advice.push({ type: 'ban', icon: '🛡', label: t('coach.lbl.banPriority'), text: t('coach.banPriority', { opp: opponent.shortName, champ: target }) });
    }
    // Menace retour : notre meilleur champion pourrait être pris par l'adversaire
    let bestOurs = null;
    state.roster.forEach((p) => p.championPool.forEach((n) => {
      if (isChampionTaken(draft, n)) return;
      const m = (getChampionMastery(p.id, n) || {}).mastery || 0;
      if (!bestOurs || m > bestOurs.mastery) bestOurs = { champName: n, mastery: m };
    }));
    if (bestOurs && bestOurs.mastery >= 60) {
      advice.push({ type: 'threat', icon: '⚠️', label: t('coach.lbl.threat'), text: t('coach.threat', { champ: bestOurs.champName, m: bestOurs.mastery }) });
    }
    // Flex pick adverse : alerte uniquement si le champion joue HORS de son rôle principal
    Object.entries(oppPicks).filter(([, v]) => v).forEach(([slot, champName]) => {
      const champ = getChampionByName(champName);
      if (champ && champ.role !== slot) {
        advice.push({ type: 'flex', icon: '👁', label: t('coach.lbl.flex'), text: t('coach.flex', { champ: champName, slot: ROLE_NAMES[slot], role: ROLE_NAMES[champ.role] }) });
      }
    });
    if (advice.length === 0) advice.push({ type: 'info', icon: '📋', label: t('coach.lbl.advice'), text: t('coach.banInfo') });

  } else {
    // PICK TURN

    // Mastery du joueur du rôle `ideal.__role` sur le champion idéal (0 la plupart
    // du temps, puisque idéal ≠ confort implique qu'il n'est pas dans le pool).
    const idealMasteryFor = (ideal) => {
      const player = state.roster.find((p) => p.role === ideal.__role);
      return player ? ((getChampionMastery(player.id, ideal.champName) || {}).mastery || 0) : 0;
    };

    // Helper d'ajout d'une carte "confort" + éventuelle carte "idéal" (si le
    // meilleur counter réel n'est pas dans le pool). Les deux partagent le même
    // `type` pour rester adjacentes après le tri (tri stable par type).
    const pushCounterPair = (baseType, icon, label, comfort, ideal, textComfort, warnKeyNone, warnKeyLow) => {
      const pushIdealWarn = () => {
        const warnKey = idealMasteryFor(ideal) > 0 ? warnKeyLow : warnKeyNone;
        advice.push({ type: baseType, variant: 'ideal', icon: '🎯', label: t('coach.lbl.counterIdeal'), text: t(warnKey, { champ: ideal.champName, opp: ideal.__oppName, role: ROLE_NAMES[ideal.__role], score: ideal.score }) });
      };
      if (comfort) {
        advice.push({ type: baseType, icon, label, text: textComfort(comfort) });
        if (ideal && ideal.champName !== comfort.champName && ideal.score > comfort.score) pushIdealWarn();
      } else if (ideal) {
        pushIdealWarn();
      }
    };

    // 1. Counter-pick : le MEILLEUR rôle où l'adversaire a DÉJÀ locké un pick
    // (parmi les rôles encore libres pour vous). Une seule opportunité retenue
    // pour rester focus ; jamais de champion banni/déjà pris.
    let bestLocked = null;
    freeRoles.forEach((role) => {
      const oppChampName = oppPicks[role];
      if (!oppChampName) return;
      const oppChamp = getChampionByName(oppChampName);
      if (!oppChamp) return;
      const myPlayer = state.roster.find((p) => p.role === role);
      const { comfort, ideal } = getRoleCounterOptions(draft, myPlayer, role, [oppChamp.id]);
      if (!comfort && !ideal) return;
      const bestScore = Math.max(comfort ? comfort.score : 0, ideal ? ideal.score : 0);
      if (ideal) { ideal.__role = role; ideal.__oppName = oppChampName; }
      if (!bestLocked || bestScore > bestLocked.bestScore) bestLocked = { role, comfort, ideal, bestScore, oppChampName };
    });
    if (bestLocked) {
      pushCounterPair('counter', '⚡', t('coach.lbl.counter'), bestLocked.comfort, bestLocked.ideal,
        (c) => t('coach.counter', { champ: c.champName, m: c.mastery, opp: bestLocked.oppChampName, role: ROLE_NAMES[bestLocked.role], score: c.score }),
        'coach.idealWarnNone', 'coach.idealWarnLow');
    }

    // 2. Anticipation : le MEILLEUR rôle où l'adversaire n'a PAS encore locké,
    // basé sur ses picks probables (draftProfile.comfortPicks, à défaut son
    // propre pool). Une seule opportunité retenue, jamais de champion banni.
    let bestAnticipated = null;
    freeRoles.forEach((role) => {
      if (oppPicks[role]) return; // déjà géré par le bloc "locked" ci-dessus
      const oppPlayer = opponent.roster.find((p) => p.role === role);
      if (!oppPlayer) return;
      const profileComfort = ((opponent.draftProfile || {}).comfortPicks || {})[role] || [];
      const candidateNames = (profileComfort.length ? profileComfort : (oppPlayer.championPool || []))
        .filter((name) => !isChampionTaken(draft, name));
      const targetIds = candidateNames.map((name) => (getChampionByName(name) || {}).id).filter(Boolean).slice(0, 3);
      if (targetIds.length === 0) return;
      const myPlayer = state.roster.find((p) => p.role === role);
      const { comfort, ideal } = getRoleCounterOptions(draft, myPlayer, role, targetIds);
      if (!comfort && !ideal) return;
      const bestScore = Math.max(comfort ? comfort.score : 0, ideal ? ideal.score : 0);
      const matchedTargetId = comfort ? comfort.targetId : (ideal ? ideal.targetId : null);
      const targetChamp = matchedTargetId ? getChampionById(matchedTargetId) : null;
      const targetName = targetChamp ? targetChamp.name : candidateNames[0];
      if (ideal) { ideal.__role = role; ideal.__oppName = targetName; }
      if (!bestAnticipated || bestScore > bestAnticipated.bestScore) bestAnticipated = { role, comfort, ideal, bestScore, targetName };
    });
    if (bestAnticipated) {
      pushCounterPair('anticipate', '🔮', t('coach.lbl.anticipate'), bestAnticipated.comfort, bestAnticipated.ideal,
        (c) => t('coach.anticipate', { champ: c.champName, m: c.mastery, opp: bestAnticipated.targetName, role: ROLE_NAMES[bestAnticipated.role], score: c.score }),
        'coach.anticipateIdealWarnNone', 'coach.anticipateIdealWarnLow');
    }

    // 3. Analyse composition
    const myTagCounts = {};
    Object.values(myPicks).filter(Boolean).forEach((champName) => {
      const champ = getChampionByName(champName);
      (champ ? champ.tags : []).forEach((tag) => { myTagCounts[tag] = (myTagCounts[tag] || 0) + 1; });
    });
    const pickedCount = Object.values(myPicks).filter(Boolean).length;
    if (pickedCount >= 2) {
      const missing = ['engage', 'disengage', 'scaling', 'teamfight'].filter((tag) => !myTagCounts[tag]);
      if (missing.length >= 1 && missing.length <= 2) {
        advice.push({ type: 'comp', icon: '🧩', label: t('coach.lbl.comp'), text: t('coach.comp', { missing: missing.map((tag) => SCOUT_TAG_LABELS[tag] || tag).join(' / ') }) });
      }
    }

    // 4. Scouting insight
    const scoutReport = getScoutingReport(opponent.id);
    if (getScoutingTier(scoutReport.confidence) !== 'basic') {
      const weak = getTeamWeakestRole(opponent);
      if (weak && freeRoles.includes(weak.role)) {
        advice.push({ type: 'scouting', icon: '📋', label: t('coach.lbl.scouting'), text: t('coach.scouting', { role: ROLE_NAMES[weak.role], name: weak.player.name, score: weak.score }) });
      }
    }

    // 5. Flex pick alerte : uniquement si le champion joue hors de son rôle principal
    Object.entries(oppPicks).filter(([, v]) => v).forEach(([slot, champName]) => {
      const champ = getChampionByName(champName);
      if (champ && champ.role !== slot) {
        advice.push({ type: 'flex', icon: '👁', label: t('coach.lbl.flex'), text: t('coach.flex', { champ: champName, slot: ROLE_NAMES[slot], role: ROLE_NAMES[champ.role] }) });
      }
    });

    // 6. Fallback : pick confort
    if (advice.length === 0) {
      let best = null;
      freeRoles.forEach((role) => {
        const player = state.roster.find((p) => p.role === role);
        if (!player) return;
        player.championPool.forEach((n) => {
          if (isChampionTaken(draft, n)) return;
          const m = (getChampionMastery(player.id, n) || {}).mastery || 0;
          if (!best || m > best.mastery) best = { role, champName: n, mastery: m, playerName: player.name };
        });
      });
      if (best) advice.push({ type: 'pick', icon: '🎯', label: t('coach.lbl.pickComfort'), text: t('coach.pickComfort', { name: best.playerName, champ: best.champName, role: ROLE_NAMES[best.role], m: best.mastery }) });
      else if (freeRoles.length > 0) advice.push({ type: 'info', icon: '📋', label: t('coach.lbl.advice'), text: t('coach.completeRole', { role: ROLE_NAMES[freeRoles[0]] }) });
    }
  }

  // Trier par type prioritaire (tri stable : une paire confort+idéal du même
  // type reste toujours adjacente) et limiter à 3 cartes affichées.
  const prio = { counter: 0, anticipate: 1, ban: 2, scouting: 3, comp: 4, threat: 5, flex: 6, pick: 7, info: 8 };
  return advice.sort((a, b) => (prio[a.type] ?? 9) - (prio[b.type] ?? 9)).slice(0, 3);
}

function renderCoachPanel(advice) {
  if (!advice || advice.length === 0) return '';
  const colorClass = { counter: 'coach-card--counter', anticipate: 'coach-card--anticipate', ban: 'coach-card--ban',
    scouting: 'coach-card--scouting', comp: 'coach-card--comp', flex: 'coach-card--flex',
    threat: 'coach-card--threat', pick: 'coach-card--pick', info: 'coach-card--info' };
  const cards = advice.map((a) =>
    `<div class="coach-card ${colorClass[a.type] || ''}${a.variant === 'ideal' ? ' coach-card--ideal' : ''}">
      <span class="coach-card__icon">${a.icon}</span>
      <div class="coach-card__body">
        <span class="coach-card__label">${a.label}</span>
        <span class="coach-card__text">${a.text}</span>
      </div>
    </div>`
  ).join('');
  return `<div class="coach-panel"><div class="coach-panel__title">${t('coach.title')}</div><div class="coach-panel__cards">${cards}</div></div>`;
}

function renderMiniBans(bans) {
  const slots = [];
  for (let i = 0; i < 5; i++) slots.push(bans[i] || null);
  return slots.map((b) => `
    <div class="mini-ban-slot ${b ? 'mini-ban-slot--filled' : ''}">
      ${championPortraitHtml(b, 'mini-ban-slot__portrait')}
      <span class="mini-ban-slot__name">${b || '-'}</span>
    </div>
  `).join('');
}

/**
 * Bans du set : la game en cours + l'historique des games précédentes
 * (série BO3/BO5). Alimenté par series.gameBansHistory, poussé dans
 * finishMatch() juste avant que state.draft ne soit réinitialisé.
 */
function renderBanHistorySection(draft) {
  const series = state.matchSeries;
  const history = (series && series.gameBansHistory) || [];
  const games = history.map((g, i) => ({ n: i + 1, blueBans: g.blueBans, redBans: g.redBans, current: false }));
  const currentN = series ? series.gameNumber : (games.length + 1);
  games.push({ n: currentN, blueBans: draft.blueBans, redBans: draft.redBans, current: true });
  return `
    <div class="draft-ban-history">
      <h4 class="panel-title draft-ban-history__title">${t('draft.banHistoryTitle')}</h4>
      ${games.slice().reverse().map((g) => `
        <div class="draft-ban-history__game">
          <span class="draft-ban-history__label">${t('draft.gameLabel', { n: g.n })}${g.current ? ` · ${t('draft.currentGame')}` : ''}</span>
          <div class="draft-ban-history__row">
            <div class="draft-ban-history__side">
              <span class="draft-ban-history__side-label">${t('draft.bansFirst')}</span>
              <div class="draft-ban-history__slots">${renderMiniBans(g.blueBans)}</div>
            </div>
            <div class="draft-ban-history__side">
              <span class="draft-ban-history__side-label">${t('draft.bansLast')}</span>
              <div class="draft-ban-history__slots">${renderMiniBans(g.redBans)}</div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
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
        ${championPortraitHtml(champName, 'draft-pick-slot__portrait')}
        <span class="draft-pick-slot__text">
          <span class="draft-pick-slot__role">${player ? player.name : ROLE_NAMES[role]}</span>
          <span class="draft-pick-slot__champion">${champName || '—'}</span>
        </span>
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

/**
 * Tous les joueurs du roster qui savent jouer ce champion (maîtrise >= 1),
 * triés du plus maîtrisé au moins maîtrisé. Pour les flex picks (TF TOP+MID...),
 * cela liste chaque joueur concerné avec son niveau.
 */
function getAllRosterComforts(champName) {
  const list = [];
  state.roster.forEach((p) => {
    const mastery = (getChampionMastery(p.id, champName) || {}).mastery || 0;
    if (mastery >= 1) list.push({ mastery, playerName: p.name, role: p.role, tier: getMasteryTier(mastery) });
  });
  return list.sort((a, b) => b.mastery - a.mastery);
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
        // Liséré contextuel (v1.9.0) : en pick, basé sur la maîtrise du joueur DU
        // rôle pické (TF pické au TOP = liséré du top, même si le mid le maîtrise mieux).
        // En ban (pas de rôle), repli sur le meilleur confort tous rôles.
        let borderTier = null;
        if (mode === 'pick' && player) {
          const roleMastery = (getChampionMastery(player.id, c.name) || {}).mastery || 0;
          if (roleMastery >= 1) borderTier = getMasteryTier(roleMastery).id;
        } else {
          const best = getBestRosterComfort(c.name);
          if (best) borderTier = best.tier.id;
        }
        const comfortClass = borderTier ? ` draft-champion-card--comfort draft-champion-card--comfort-${borderTier}` : '';
        // Tooltip : tous les joueurs qui savent jouer ce champion (flex picks inclus).
        const comforts = getAllRosterComforts(c.name);
        const tooltipText = comforts.length
          ? comforts.map((cf) => t('draft.tipComfort', { role: cf.role, name: cf.playerName, m: cf.mastery, extra: cf.mastery < 25 ? t('draft.tipLowMastery') : ` (${masteryTierLabel(cf.tier.id)})` })).join('\n')
          : '';
        // Pas de data-lore-tooltip ici : la carte est un bouton de pick, un clic ne
        // doit pas déclencher à la fois le pick ET un toast. title = hover desktop.
        const tooltipAttr = tooltipText ? ` title="${escapeAttr(tooltipText)}"` : '';
        return `
          <button class="draft-champion-card ${taken ? 'draft-champion-card--taken' : ''}${comfortClass}" data-champion="${c.name}"${tooltipAttr} ${taken ? 'disabled' : ''}>
            ${championPortraitHtml(c.name, 'draft-champion-card__portrait')}
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
      el.innerHTML = `<div class="empty-state">${t('draft.empty')}</div>`;
      return;
    }
    const opponents = getAITeamsForRegion(state.region).filter((team) => team.id !== state.aiTeamId);
    el.innerHTML = `
      <div class="panel">
        <h3 class="panel-title">${t('draft.prepTitle')}</h3>
        <div class="training-form">
          <div class="training-form__group">
            <label>${t('draft.opponentLabel')}</label>
            <select id="draft-opponent">
              ${opponents.map((team) => `<option value="${team.id}">${team.name} (${team.shortName})</option>`).join('')}
            </select>
          </div>
          <div class="training-form__group">
            <label>${t('draft.sideSelectLabel')}</label>
            <select id="draft-side">
              <option value="blue">${t('draft.sideBlue')}</option>
              <option value="red">${t('draft.sideRed')}</option>
            </select>
          </div>
        </div>
        <div class="training-form__actions">
          <button class="btn-primary" id="btn-start-draft">${t('draft.startBtn')}</button>
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
  const sideLabel = (s) => draftSideLabel(s);
  const isPlayerTurn = draft.status !== 'done' && turn && turn.side === draft.playerSide;

  let actionHtml = '';
  if (draft.status === 'done') {
    const r = draft.result;
    actionHtml = `
      <div class="draft-score-panel">
        <h3 class="panel-title">${t('draft.scoreTitle')}</h3>
        <div class="draft-score-row"><span>${t('draft.scoreComfort')}</span><span>+${r.teamComfortScore}</span></div>
        <div class="draft-score-row"><span>${t('draft.scoreMatchups')}</span><span>${r.matchupScore >= 0 ? '+' : ''}${r.matchupScore}</span></div>
        <div class="draft-score-row"><span>${t('draft.scoreComposition')} (${r.synergyTags.length ? r.synergyTags.map((tag) => COMP_TAG_LABELS[tag] || tag).join(', ') : t('draft.noSynergy')})</span><span>+${r.compositionScore}</span></div>
        <div class="draft-score-row"><span>${t('draft.scoreSide')} (${sideLabel(draft.mapSide || draft.playerSide)})</span><span>+${r.sideBonus}</span></div>
        <div class="draft-score-row"><span>${t('draft.scoreScouting')}</span><span>+${r.scoutingBonus}</span></div>
        <div class="draft-score-row"><span>${t('draft.scoreRisk')}</span><span>-${r.riskPenalty}</span></div>
        <div class="draft-score-row draft-score-row--total"><span>${t('draft.scoreTotal')}</span><span>${r.total}</span></div>
        <div class="scrim-report">
          ${r.comfortDetails.map((d) => `<p>${d}</p>`).join('')}
          ${r.matchupDetails.map((d) => `<p>${d}</p>`).join('')}
        </div>
        <div class="training-form__actions">
          ${state.matchSeries
            ? `<button class="btn-primary" id="btn-launch-match">${t('draft.launchMatch')}</button>`
            : `<button class="btn-secondary" id="btn-new-draft">${t('draft.newDraft')}</button>`}
        </div>
      </div>
    `;
  } else if (isPlayerTurn) {
    const coachAdvice = getDraftCoachAdvice(draft);
    const coachHtml = renderCoachPanel(coachAdvice);
    const ROLE_FILTERS = [
      { id: 'ALL', label: t('common.all') },
      { id: 'TOP', label: 'Top' },
      { id: 'JUNGLE', label: 'Jungle' },
      { id: 'MID', label: 'Mid' },
      { id: 'ADC', label: 'ADC' },
      { id: 'SUPPORT', label: 'Support' }
    ];
    const searchVal = draft._champSearch || '';
    const searchHtml = `<input type="text" id="draft-search" class="draft-search-input" placeholder="${escapeAttr(t('draft.searchPlaceholder'))}" value="${searchVal.replace(/"/g, '&quot;')}" autocomplete="off">`;
    if (turn.type === 'ban') {
      const banFilter = draft._banRoleFilter || 'ALL';
      actionHtml = `
        <div class="draft-turn-banner">${t('draft.turnBan', { side: sideLabel(turn.side) })}</div>
        ${coachHtml}
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
        <div class="draft-turn-banner">${t('draft.turnPick', { role: ROLE_NAMES[activeRole], side: sideLabel(turn.side) })}</div>
        ${coachHtml}
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
    actionHtml = `<div class="draft-turn-banner">${t('draft.turnAi', { side: sideLabel(turn ? turn.side : '') })}</div>`;
  }

  const seriesLabel = state.matchSeries
    ? t('draft.seriesLabel', { fmt: state.matchSeries.format, n: state.matchSeries.gameNumber, a: state.matchSeries.scoreFor, b: state.matchSeries.scoreAgainst })
    : '';
  const pickOrder = draft.playerSide === 'blue' ? 'First Pick' : 'Last Pick';
  const whoFirst = draft.playerSide === 'blue' ? `(${t('common.you')})` : `(${opponent.shortName})`;
  const whoLast = draft.playerSide === 'red' ? `(${t('common.you')})` : `(${opponent.shortName})`;

  el.innerHTML = `
    <div class="panel draft-arena">
      <h3 class="panel-title">${t('draft.vsTitle', { opp: opponent.name, side: sideLabel(draft.mapSide || draft.playerSide), pickOrder })}${seriesLabel}</h3>
      <div class="draft-arena-layout">
        <div class="draft-team-column">
          <h4>${t('draft.colFirst', { who: whoFirst })}</h4>
          ${renderPicksColumn(draft, 'blue')}
        </div>
        <div class="draft-center">
          ${actionHtml}
        </div>
        <div class="draft-team-column">
          <h4>${t('draft.colLast', { who: whoLast })}</h4>
          ${renderPicksColumn(draft, 'red')}
        </div>
      </div>
      ${renderBanHistorySection(draft)}
    </div>
    <div class="panel">
      <h3 class="panel-title">${t('draft.scoutingTitle', { team: opponent.shortName })}</h3>
      ${buildScoutingReportBody(opponent)}
    </div>
    <div class="panel">
      <h3 class="panel-title">${t('draft.journalTitle')}</h3>
      <div class="scrim-report">
        ${draft.log.length ? draft.log.slice().reverse().map((l) => `<p>${l}</p>`).join('') : `<p>${t('draft.noEvent')}</p>`}
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
  const aiIds = aiTeams.map((t) => t.id);
  for (let i = aiIds.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [aiIds[i], aiIds[j]] = [aiIds[j], aiIds[i]];
  }
  return ['player', ...aiIds];
}

function getTeamRef(teamId) {
  if (teamId === 'player') {
    return { id: 'player', name: state.teamName || t('match.yourTeam'), shortName: state.teamShortName || 'YOU', roster: state.roster, region: state.region };
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
    <li>${t('season.qualifTier1')}</li>
    ${regionSlots >= 2 ? `<li>${t('season.qualifTier2')}</li>` : ''}
    ${regionSlots >= 3 ? `<li>${t('season.qualifTier3')}</li>` : ''}`;
  // Note explicative sur la place bonus liée à l'autre tournoi (boucle MSI <-> Worlds).
  let linkNoteHtml = '';
  if (eventType === 'msi') {
    const w = state.lastWorldsWinnerRegion;
    linkNoteHtml = w
      ? t('season.linkMsi', { region: w, suffix: w === playerAiRegion ? t('season.linkMsiYours') : t('season.linkMsiOther') })
      : t('season.linkMsiNone');
  } else {
    const m = state.lastMsiWinnerRegion;
    linkNoteHtml = m
      ? t('season.linkWorlds', { region: m })
      : t('season.linkWorldsNone');
  }
  const teamListHtml = teamIds.map((id, i) => {
    const tm = getTeamRef(id);
    const name = tm ? tm.name : id;
    const isPlayer = id === 'player';
    return `<li style="${isPlayer ? 'color:var(--color-gold);font-weight:700;' : ''}">${i + 1}. ${name}${isPlayer ? t('season.you') : ''}</li>`;
  }).join('');

  showModal(`
    <h2 class="panel-title" style="margin-bottom:16px;">${t('season.welcome', { split: splitName, year })}</h2>
    <div style="display:flex;flex-direction:column;gap:18px;max-height:65vh;overflow-y:auto;padding-right:6px;">
      <div>
        <h3 style="color:var(--color-gold);margin-bottom:6px;">${t('season.regularTitle')}</h3>
        <p style="color:var(--color-text-muted);line-height:1.6;">
          ${t('season.regularDesc', { teams: teamIds.length - 1, days: totalMatchdays })}
        </p>
      </div>
      <div>
        <h3 style="color:var(--color-gold);margin-bottom:6px;">${t('season.playoffsTitle')}</h3>
        <p style="color:var(--color-text-muted);line-height:1.6;">
          ${t('season.playoffsDesc')}
        </p>
      </div>
      <div>
        <h3 style="color:var(--color-gold);margin-bottom:6px;">${t('season.qualifTitle', { event: intlEvent })}</h3>
        <p style="color:var(--color-text-muted);line-height:1.6;">
          ${t('season.qualifDesc', { slots: regionSlots, event: intlEvent })}
        </p>
        <ul style="color:var(--color-text-muted);line-height:1.8;padding-left:18px;margin-top:6px;">
          ${qualifTiersHtml}
        </ul>
        <p style="color:var(--color-text-muted);line-height:1.6;margin-top:8px;font-size:13px;border-left:2px solid var(--color-gold);padding-left:10px;">
          ${linkNoteHtml}
        </p>
      </div>
      <div>
        <h3 style="color:var(--color-gold);margin-bottom:8px;">${t('season.participatingTeams')}</h3>
        <ul style="list-style:none;padding:0;margin:0;display:grid;grid-template-columns:1fr 1fr;gap:4px 16px;font-size:13px;">
          ${teamListHtml}
        </ul>
      </div>
    </div>
    <div class="modal-content__actions" style="margin-top:20px;">
      <button class="btn-primary" onclick="closeModal();showView('calendar');">${t('season.startSeason')}</button>
    </div>
  `);
}

function startSeason(split, year) {
  initAIRosters();
  split = split || 'spring';
  year = year || (state.season ? state.season.year : 1);
  if (split === 'spring') state.sponsorYearRecap = createEmptySponsorYearRecap(); // v1.15.0 : nouvel accumulateur pour la nouvelle année
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
    log: [],
    matchResults: [] // v1.14.0 : scores structurés par journée (index = journée - 1)
  };
  state.international = null;
  delete state._calExpandedMd; // v1.14.0 : repli par défaut sur la journée en cours
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

// v1.14.0 : enregistre le score structuré d'un match dans la journée (mdIndex = journée - 1).
// hs/as = manches gagnées par l'équipe à domicile / extérieur. Permet d'afficher le
// programme des journées (passées avec scores, à venir en « vs »).
function recordMatchdayMatch(season, mdIndex, home, away, winner, hs, as) {
  if (!Array.isArray(season.matchResults)) season.matchResults = [];
  while (season.matchResults.length <= mdIndex) season.matchResults.push(null);
  if (!season.matchResults[mdIndex]) season.matchResults[mdIndex] = [];
  season.matchResults[mdIndex].push({ home, away, winner, hs, as });
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
  return { qf: t('bracket.quarterfinals'), sf: t('bracket.semis'), final: t('bracket.final') }[round] || round;
}

// Traduit une entrée de journal de résultats. Compat : une chaîne (anciennes
// sauvegardes) est affichée telle quelle ; un objet {k, p} est traduit au rendu
// dans la langue active, avec résolution des sous-parties dynamiques.
function logChip(entry) {
  if (typeof entry === 'string') return entry;
  if (!entry || !entry.k) return '';
  const p = Object.assign({}, entry.p || {});
  if (p.winnerId != null) p.winner = getTeamName(p.winnerId);
  if (p.loserId != null) p.loser = getTeamName(p.loserId);
  if (p.teamId != null) p.team = getTeamName(p.teamId);
  if (p.roundKey != null) p.round = playoffRoundLabel(p.roundKey);
  if (p.matchKey != null) p.match = intlMatchLabel(p.matchKey);
  if (p.placement != null) {
    p.placementLabel = placementLabel(p.placement);
    p.rank = p.placement === 1 ? t('intl.champion') : t('intl.nth', { n: p.placement });
  }
  if (p.resultWon != null) p.result = p.resultWon ? t('log.win') : t('log.loss');
  return t(entry.k, p);
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
  season.log.unshift({ k: 'log.playoffsStart', p: { seeds: seeds.map((id, i) => `${i + 1}. ${getTeamShortName(id)}`).join(', ') } });
  const playerRank = ranked.indexOf('player') + 1;
  if (playerRank > 6) {
    season.log.unshift({ k: 'log.notQualified', p: { rank: playerRank } });
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
    season.log.unshift({ k: 'log.poAiResult', p: { roundKey: po.round, winnerId: res.winner, loserId: res.loser, score: `${res.scoreA}-${res.scoreB}` } });
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
  if (placement === 1) return t('placement.champion');
  if (placement === 2) return t('placement.finalist');
  if (placement === 3) return t('placement.semifinalist');
  if (placement === 5) return t('placement.quarterfinalist');
  return t('placement.regular', { n: placement });
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
  season.log.unshift({ k: 'log.seasonEnd', p: { placement, coaching: rewards.coaching, budget: rewards.budget, prestige: rewards.prestige } });
  // v1.15.0 — sponsors : accumulateur annuel + paiement en continu / clause de rupture des sponsors résultat.
  const sponsorRegularRank = getSortedStandings().indexOf('player') + 1;
  updateSponsorYearRecap({ regularRank: sponsorRegularRank, finalPlacement: placement, poTitle: placement === 1 });
  applySponsorDomesticPayout(rewards, placement);
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
      // v1.11.0 : on lit le potential porté par le joueur (les remplaçants générés
      // par la rotation IA en ont un, et l'index vers AI_TEAMS ne correspond plus).
      const potential = (player.potential != null) ? player.potential : (basePlayer ? basePlayer.potential : 80);
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

// ─── Rotation des effectifs IA (v1.11.0) ─────────────────────────────────────
// Quand un joueur IA atteint son âge de retraite, il quitte son équipe et est
// remplacé par un jeune généré au niveau moyen de l'équipe (± 3), pour que la
// hiérarchie par tier reste stable saison après saison.

// Pseudos fictifs variés (inspirés du style esport, sans copier de vrais noms).
const AI_REPLACEMENT_NAMES = [
  'Vesper', 'Kryo', 'Naelin', 'Solund', 'Maximo', 'Drael', 'Onric', 'Pyx', 'Kavu', 'Zenith',
  'Lumio', 'Tarn', 'Wex', 'Quill', 'Brann', 'Ysor', 'Velko', 'Doru', 'Krane', 'Soven',
  'Mirko', 'Tavi', 'Renji', 'Castor', 'Velm', 'Drix', 'Oryx', 'Saji', 'Kemp', 'Volt',
  'Brizz', 'Cyne', 'Dovo', 'Esca', 'Fyre', 'Hael', 'Iro', 'Jace', 'Kolt', 'Lior',
  'Mavi', 'Nael', 'Orin', 'Pavo', 'Quen', 'Rovel', 'Suun', 'Tovi', 'Veyl', 'Wraen',
  'Yorbe', 'Zael', 'Krios', 'Maelo', 'Nuvo', 'Praxis', 'Tyro', 'Vael', 'Wisp', 'Zaro',
  'Kael', 'Brevo', 'Drayn', 'Espen', 'Garo', 'Helic', 'Ivar', 'Joren', 'Kavi', 'Loxe',
  'Nireo', 'Ovan', 'Pruun', 'Ryze9', 'Sett', 'Tovik', 'Zylo', 'Aro', 'Brux', 'Cael',
  'Nyx7', 'Fabr', 'Goven', 'Hroar', 'Juno', 'Kestr', 'Mire', 'Riv4', 'Tann', 'Vexx'
];

function pickReplacementName(teamId) {
  const used = new Set();
  Object.values(state.aiRosters || {}).forEach((r) => (r || []).forEach((p) => used.add(p.name)));
  state.roster.forEach((p) => used.add(p.name));
  const free = AI_REPLACEMENT_NAMES.filter((n) => !used.has(n));
  if (free.length) return randomChoice(free);
  // Tous pris : on suffixe pour rester unique.
  return randomChoice(AI_REPLACEMENT_NAMES) + randomInt(2, 99);
}

// Génère un remplaçant complet (tous les champs consommés par la sim/draft/scouting).
// `year` = saison à laquelle il arrive (pour caler l'âge via playerAge).
function generateAIReplacement(teamId, retiree, remainingRoster, year) {
  const role = retiree.role;
  const baseAvg = remainingRoster.length ? Math.round(averageRosterLevel(remainingRoster)) : 75;
  const target = clamp(baseAvg + randomInt(-3, 3), 55, 95);
  const stat = () => clamp(target + randomInt(-5, 5), 40, 99);
  const mental = stat(), shotcalling = stat(), laning = stat(), teamfight = stat(), mechanics = stat();
  const lvl = Math.round((mental + shotcalling + laning + teamfight + mechanics) / 5);

  const curAge = randomInt(18, 22);
  // baseAge calé pour que playerAge() == curAge à l'année 'year' (playerAge = baseAge + year - 1).
  const baseAge = curAge - (year - 1);
  const retirementAge = clamp(curAge + randomInt(6, 11), curAge + 3, 33);

  const rolePool = getChampionsForRole(role).map((c) => c.name); // objets -> noms
  const shuffled = rolePool.slice().sort(() => Math.random() - 0.5);
  const pool = shuffled.slice(0, 5);
  while (pool.length < 5 && rolePool.length) pool.push(rolePool[pool.length % rolePool.length]);
  const masteries = pool.map((_, i) => clamp(88 - i * randomInt(4, 8) + randomInt(-3, 3), 30, 99));

  return {
    id: `${teamId}_${role.toLowerCase()}_g${year}_${randomInt(1000, 9999)}`,
    name: pickReplacementName(teamId),
    baseAge, retirementAge,
    role,
    nationality: retiree.nationality || 'EU',
    level: lvl,
    potential: clamp(lvl + randomInt(4, 10), lvl + 1, 99),
    form: randomInt(60, 75),
    fatigue: 0,
    mental, shotcalling, laning, teamfight, mechanics,
    championPool: pool,
    traits: ['rookie'],
    masteries,
    unknownScout: true // v1.15.3 : inconnu tant qu'aucun match/scrim n'a été joué contre son équipe
  };
}

// v1.15.3 — lève le statut "inconnu" de tous les joueurs d'une équipe IA : appelé dès
// qu'un match (réel ou scrim) est joué contre elle, cohérent avec le gain de confiance
// scouting existant (mêmes points de déclenchement).
function revealScoutedTeam(teamId) {
  const roster = state.aiRosters && state.aiRosters[teamId];
  if (!Array.isArray(roster)) return;
  roster.forEach((p) => { if (p.unknownScout) delete p.unknownScout; });
}

// Traite les retraites IA pour la saison `year` et remplace les partants.
// Renvoie la liste des mouvements { teamId, out, in } pour le journal.
// v1.15.3 — plafond de départs à la retraite par équipe et par mercato. Lisse le
// renouvellement : une sauvegarde « en retard » (ex. âges IA rétro-remplis après coup)
// ne vide plus la moitié de la ligue d'un coup ; les plus âgés partent en priorité,
// les autres attendent le mercato suivant.
const AI_MAX_RETIREMENTS_PER_TEAM_PER_YEAR = 1;

function applyAIRetirementRotation(year) {
  const movements = [];
  if (state.settings && state.settings.aiRotation === false) return movements;
  if (!state.aiRosters) return movements;
  Object.keys(state.aiRosters).forEach((teamId) => {
    // v1.15.4 — fix : initAIRosters() copie AUSSI l'équipe du joueur dans state.aiRosters
    // (copie fantôme jamais affichée, ignorée ailleurs via ce même garde-fou — voir
    // generateTransferMarket). Sans lui, la rotation IA faisait "partir en retraite" et
    // "remplaçait" des joueurs bien réels de VOTRE roster dans le journal (ex: Canna),
    // alors que votre effectif réel (state.roster) n'était jamais touché — ces retraites
    // ne devaient exister QUE côté IA, votre équipe suit exclusivement les contrats
    // joueur (processContractExpirations / signatures volontaires).
    if (teamId === state.aiTeamId) return;
    const roster = state.aiRosters[teamId];
    if (!Array.isArray(roster)) return;
    // Candidats à la retraite (âge >= âge de retraite), triés du plus âgé au moins âgé
    // (plus grand dépassement d'abord) pour retirer les vétérans en priorité sous plafond.
    const candidates = [];
    roster.forEach((player, idx) => {
      const base = player.baseAge != null ? player.baseAge : 22;
      const age = base + (year - 1);
      const retAge = player.retirementAge != null ? player.retirementAge : 30;
      if (age >= retAge) candidates.push({ idx, over: age - retAge });
    });
    candidates.sort((a, b) => b.over - a.over);
    candidates.slice(0, AI_MAX_RETIREMENTS_PER_TEAM_PER_YEAR).forEach(({ idx }) => {
      const player = roster[idx];
      const remaining = roster.filter((_, i) => i !== idx);
      const rep = generateAIReplacement(teamId, player, remaining, year);
      roster[idx] = rep;
      movements.push({ teamId, out: player, in: rep });
      // v1.15.3 — un remplaçant est un inconnu (lore) : on perd l'équivalent d'un match
      // de connaissance sur l'équipe. N'agit que si un rapport existe déjà ; scrimsPlayed
      // (effort de préparation passé) n'est pas touché, seule la connaissance actuelle l'est.
      if (state.scouting[teamId]) {
        state.scouting[teamId].confidence = clamp(state.scouting[teamId].confidence - VIDEO_REVIEW_CONFIDENCE_GAIN, 0, 100);
      }
    });
  });
  return movements;
}

// ─── Journal des transferts (v1.11.0) ────────────────────────────────────────
// Entrées compactes { y: année, k: type, t: équipe, p: joueur, r: rôle },
// plafonnées aux 10 dernières saisons.
function logTransfer(year, kind, teamLabel, playerName, role) {
  if (!Array.isArray(state.transferLog)) state.transferLog = [];
  state.transferLog.unshift({ y: year, k: kind, t: teamLabel, p: playerName, r: role });
  const cutoff = year - 9; // on conserve l'année courante + les 9 précédentes
  state.transferLog = state.transferLog.filter((e) => e.y >= cutoff);
}

function teamShortById(teamId) {
  const t = AI_TEAMS.find((x) => x.id === teamId);
  return t ? t.shortName : teamId;
}

function logAIRotation(year, movements) {
  movements.forEach((mv) => {
    const team = teamShortById(mv.teamId);
    logTransfer(year, 'retraite', team, mv.out.name, mv.out.role);
    logTransfer(year, 'arrivee', team, mv.in.name, mv.in.role);
  });
}

function careerProgressionHtml(entries) {
  if (!entries || entries.length === 0) {
    return `
      <div class="panel-subsection">
        <h4 class="panel-title">${t('prog.playerEvolution')}</h4>
        <p class="card__count">${t('career.noEvolSplit')}</p>
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
      <h4 class="panel-title">${t('prog.playerEvolution')}</h4>
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

// Région qui reçoit la place bonus liée au tournoi précédent, avec filet de
// sécurité : si aucun vainqueur n'est encore enregistré (1re saison / vieille
// sauvegarde), la place revient à la région du joueur — garantit le total fixe.
function getBonusRegion(storedRegion, counts, playerAiRegion) {
  return (storedRegion && counts[storedRegion] != null) ? storedRegion : playerAiRegion;
}

function getRegionRepCounts(eventType, playerAiRegion) {
  const allAiRegions = ['LEC', 'LCK', 'LPL', 'LTAN', 'LTAS', 'LCP', 'LJL'];
  const counts = {};
  if (eventType === 'msi') {
    allAiRegions.forEach((r) => { counts[r] = 1; });
    // 2e place MSI : région vainqueure des derniers Worlds (filet année 1 : région du joueur).
    const worldsWinner = getBonusRegion(state.lastWorldsWinnerRegion, counts, playerAiRegion);
    counts[worldsWinner] += 1; // 7*1 + 1 = 8 équipes
  } else {
    allAiRegions.forEach((r) => { counts[r] = 2; });
    // Place MSI : 3e qualif Worlds pour la région du vainqueur du MSI (filet : région du joueur).
    const msiWinner = getBonusRegion(state.lastMsiWinnerRegion, counts, playerAiRegion);
    counts[msiWinner] += 1;
    // Place structurelle majeure : LCK par défaut, glisse vers LPL si LCK détient déjà la place MSI
    // (évite 4 équipes d'une même région et garde LCK+LPL à 3 quand une majeure gagne le MSI).
    const structural = msiWinner === 'LCK' ? 'LPL' : 'LCK';
    counts[structural] += 1; // base 14 + 1 + 1 = 16 équipes
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
    log: [{ k: 'log.intlGroupsStart', p: { event: eventType === 'msi' ? 'MSI' : 'Worlds', year: season.year, groups: groups.length, size: groups[0].length } }]
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
      const tm = getTeamRef(id);
      const name = tm ? tm.name : id;
      const region = tm ? (tm.region || tm.aiRegion || '') : '';
      const isPlayer = id === 'player';
      return `<li style="${isPlayer ? 'color:var(--color-gold);font-weight:700;' : 'color:var(--color-text-muted);'};font-size:13px;">${name}${region ? ` <span style="opacity:0.5;">(${region})</span>` : ''}${isPlayer ? ' &#9733;' : ''}</li>`;
    }).join('');
    return `
      <div>
        <div style="font-weight:700;color:var(--color-seafoam);margin-bottom:4px;">${t('intl.group', { g: String.fromCharCode(65 + gi) })}</div>
        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:2px;">${rows}</ul>
      </div>`;
  }).join('');

  const teamCount = teams.length;
  const playerQualified = teams.includes('player');
  const qualifMsg = playerQualified
    ? `<p style="color:var(--color-gold);font-weight:700;margin-top:4px;">${t('intlIntro.qualifiedYes', { event: eventName })}</p>`
    : `<p style="color:#e05;margin-top:4px;">${t('intlIntro.qualifiedNo')}</p>`;

  showModal(`
    <h2 class="panel-title" style="margin-bottom:16px;">${emoji} ${eventName} ${year}</h2>
    <div style="display:flex;flex-direction:column;gap:18px;max-height:65vh;overflow-y:auto;padding-right:6px;">
      ${qualifMsg}
      <div>
        <h3 style="color:var(--color-gold);margin-bottom:6px;">${t('intlIntro.formatTitle')}</h3>
        <p style="color:var(--color-text-muted);line-height:1.6;">
          ${t('intlIntro.formatDesc', { count: teamCount })}
        </p>
        <ul style="color:var(--color-text-muted);line-height:1.8;padding-left:18px;margin-top:6px;">
          <li>${t('intlIntro.phaseGroups', { groups: numGroups, size: teamsPerGroup, qual: qualifiersPerGroup })}</li>
          ${isMSI
            ? `<li>${t('intlIntro.bracketSingle')}</li>`
            : `<li>${t('intlIntro.bracketDouble')}</li>`}
        </ul>
      </div>
      <div>
        <h3 style="color:var(--color-gold);margin-bottom:10px;">${t('intlIntro.qualifiedByGroup')}</h3>
        <div style="display:grid;grid-template-columns:repeat(${Math.min(numGroups, 2)}, 1fr);gap:14px;">
          ${groupsHtml}
        </div>
      </div>
    </div>
    <div class="modal-content__actions" style="margin-top:20px;">
      <button class="btn-primary" onclick="closeModal();processInternationalGroupMatchday();showView('calendar');">${t('intlIntro.start')}</button>
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
  // Garde anti-double-simulation (v1.9.4) : un démarrage « frais » (appel sans
  // argument, donc qui repart du groupe 0) ne doit jamais resimuler une journée
  // déjà lancée et en attente du match du joueur. Sans cette garde, les deux
  // points d'entrée du démarrage (rendu du calendrier + bouton « C'est parti ! »)
  // faisaient jouer deux fois la même journée aux groupes 100 % IA.
  if (startGroup == null && intl.pendingMatch) return;
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
  intl.log.unshift({ k: 'log.intlMatchdayDone', p: { event: eventLabel(intl), d: intl.groupMatchday, total: intl.totalGroupRounds } });
  intl.groupMatchday++;
  if (intl.groupMatchday > intl.totalGroupRounds) {
    finishGroupStage();
    return;
  }
  processInternationalGroupMatchday();
}

function loserOf(m) {
  return m.result.loser;
}

function buildInternationalBracket(seeds, eventType) {
  const matches = {};
  const M = (home, away) => ({ home: home != null ? home : null, away: away != null ? away : null, format: 'BO5', result: null });
  if (seeds.length === 4) {
    // MSI : 4 équipes, simple élimination (inchangé)
    matches.sf1 = M(seeds[0], seeds[3]);
    matches.sf2 = M(seeds[1], seeds[2]);
    matches.final = M();
    return { matches, round: 'sf' };
  }
  if (eventType === 'worlds') {
    // Worlds : 8 équipes, DOUBLE ÉLIMINATION (v1.10.0).
    // Upper bracket — quarts (même seeding anti-clash que l'ancien format)
    matches.qf1 = M(seeds[0], seeds[7]);
    matches.qf2 = M(seeds[3], seeds[4]);
    matches.qf3 = M(seeds[2], seeds[5]);
    matches.qf4 = M(seeds[1], seeds[6]);
    matches.df1 = M(); matches.df2 = M(); // demis upper bracket
    matches.f = M();                       // finale upper bracket
    // Lower bracket
    matches.lb1 = M(); matches.lb2 = M(); // perdants des quarts
    matches.lb3 = M(); matches.lb4 = M(); // vainqueur LB1/LB2 vs perdants demis UB
    matches.lb5 = M();                     // demi lower bracket
    matches.lb6 = M();                     // finale lower bracket (vs perdant finale UB)
    matches.gf = M();                      // grande finale
    return { matches, type: 'double', stage: 'qf' };
  }
  // Fallback simple élimination 8 (ne devrait plus servir)
  matches.qf1 = M(seeds[0], seeds[7]);
  matches.qf2 = M(seeds[3], seeds[4]);
  matches.qf3 = M(seeds[2], seeds[5]);
  matches.qf4 = M(seeds[1], seeds[6]);
  matches.sf1 = M(); matches.sf2 = M();
  matches.final = M();
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
    intl.log.unshift({ k: 'log.groupQualified', p: { g: String.fromCharCode(65 + idx), first: getTeamShortName(ranked[0]), second: getTeamShortName(ranked[1]) } });
  });
  const seedsOrdered = winners.concat(runnersup);
  const built = buildInternationalBracket(seedsOrdered, intl.event);
  intl.bracket = {
    seeds: seedsOrdered,
    matches: built.matches,
    type: built.type || 'single',
    round: built.round || null,
    stage: built.stage || null,
    champion: null
  };
  intl.phase = 'bracket';
  processInternationalBracketRound();
}

function advanceInternationalBracket(bracket) {
  if (bracket.type === 'double') { advanceDoubleBracket(bracket); return; }
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

// Double élimination Worlds : propage vainqueurs (upper) et perdants (vers lower)
// à chaque transition d'étape. Étapes : qf -> r2 -> r3 -> lb5 -> lb6 -> gf -> done.
function advanceDoubleBracket(bracket) {
  const m = bracket.matches;
  const W = (k) => winnerOf(m[k]);
  const L = (k) => loserOf(m[k]);
  switch (bracket.stage) {
    case 'qf':
      m.df1.home = W('qf1'); m.df1.away = W('qf2');
      m.df2.home = W('qf3'); m.df2.away = W('qf4');
      m.lb1.home = L('qf1'); m.lb1.away = L('qf2');
      m.lb2.home = L('qf3'); m.lb2.away = L('qf4');
      bracket.stage = 'r2';
      break;
    case 'r2':
      m.f.home = W('df1'); m.f.away = W('df2');
      m.lb3.home = W('lb1'); m.lb3.away = L('df2');
      m.lb4.home = W('lb2'); m.lb4.away = L('df1');
      bracket.stage = 'r3';
      break;
    case 'r3':
      m.lb5.home = W('lb3'); m.lb5.away = W('lb4');
      bracket.stage = 'lb5';
      break;
    case 'lb5':
      m.lb6.home = W('lb5'); m.lb6.away = L('f');
      bracket.stage = 'lb6';
      break;
    case 'lb6':
      m.gf.home = W('f'); m.gf.away = W('lb6');
      bracket.stage = 'gf';
      break;
    case 'gf':
      bracket.champion = W('gf');
      bracket.stage = 'done';
      break;
  }
}

// Remplit les emplacements (home/away) de chaque match aval dès que ses matchs
// sources sont joués — sans attendre la fin de l'étape, pour que le bracket
// s'alimente visuellement match par match (v1.10.3). Purement cosmétique :
// n'avance pas l'étape et ne déclenche aucun match (géré par advanceDoubleBracket).
function propagateDoubleBracket(bracket) {
  const m = bracket.matches;
  if (!m.gf) return;
  const W = (k) => (m[k] && m[k].result) ? m[k].result.winner : null;
  const L = (k) => (m[k] && m[k].result) ? m[k].result.loser : null;
  const set = (key, side, val) => { if (val != null && m[key][side] == null) m[key][side] = val; };
  set('df1', 'home', W('qf1')); set('df1', 'away', W('qf2'));
  set('df2', 'home', W('qf3')); set('df2', 'away', W('qf4'));
  set('lb1', 'home', L('qf1')); set('lb1', 'away', L('qf2'));
  set('lb2', 'home', L('qf3')); set('lb2', 'away', L('qf4'));
  set('f', 'home', W('df1')); set('f', 'away', W('df2'));
  set('lb3', 'home', W('lb1')); set('lb3', 'away', L('df2'));
  set('lb4', 'home', W('lb2')); set('lb4', 'away', L('df1'));
  set('lb5', 'home', W('lb3')); set('lb5', 'away', W('lb4'));
  set('lb6', 'home', W('lb5')); set('lb6', 'away', L('f'));
  set('gf', 'home', W('f')); set('gf', 'away', W('lb6'));
}

const DOUBLE_STAGE_KEYS = {
  qf: ['qf1', 'qf2', 'qf3', 'qf4'],
  r2: ['df1', 'df2', 'lb1', 'lb2'],
  r3: ['f', 'lb3', 'lb4'],
  lb5: ['lb5'],
  lb6: ['lb6'],
  gf: ['gf']
};

function internationalRoundLabel(round) {
  return { qf: 'Quarts de finale', sf: 'Demi-finales', final: 'Finale' }[round] || round;
}

// Libellé court d'un match par sa clé — couvre simple ET double élimination.
function intlMatchLabel(key) {
  return {
    qf1: t('bracket.qf1'), qf2: t('bracket.qf2'), qf3: t('bracket.qf3'), qf4: t('bracket.qf4'),
    sf1: t('bracket.sf1'), sf2: t('bracket.sf2'), final: t('bracket.final'),
    df1: t('dbl.ubSemi1'), df2: t('dbl.ubSemi2'), f: t('dbl.ubFinal'),
    lb1: t('dbl.lbRound1'), lb2: t('dbl.lbRound1'), lb3: t('dbl.lbRound2'), lb4: t('dbl.lbRound2'),
    lb5: t('dbl.lbSemi'), lb6: t('dbl.lbFinal'), gf: t('dbl.grandFinal')
  }[key] || key;
}

function internationalRoundLabelFromKey(key) {
  return intlMatchLabel(key);
}

function processInternationalBracketRound() {
  const intl = state.international;
  const bracket = intl.bracket;
  const isDouble = bracket.type === 'double';
  const stage = isDouble ? bracket.stage : bracket.round;
  if (stage === 'done') {
    finishInternational();
    return;
  }

  const keys = isDouble
    ? DOUBLE_STAGE_KEYS[stage]
    : (stage === 'qf' ? ['qf1', 'qf2', 'qf3', 'qf4'] : (stage === 'sf' ? ['sf1', 'sf2'] : ['final']));

  for (const key of keys) {
    const m = bracket.matches[key];
    if (m.result) continue;
    if (m.home === 'player' || m.away === 'player') {
      const opponentId = m.home === 'player' ? m.away : m.home;
      intl.pendingMatch = { type: 'bracket', matchKey: key, opponentTeamId: opponentId, format: m.format, started: false };
      if (isDouble) propagateDoubleBracket(bracket); // persiste les blocs aval déjà déterminés
      saveGame();
      return;
    }
    const res = simulateAISeries(m.home, m.away, m.format);
    recordAIMatchResult(m.home, m.away, res.winner);
    m.result = { winner: res.winner, loser: res.loser, scoreA: res.scoreA, scoreB: res.scoreB };
    intl.log.unshift({ k: 'log.intlAiResult', p: { event: eventLabel(intl), matchKey: key, winnerId: res.winner, loserId: res.loser, score: `${res.scoreA}-${res.scoreB}` } });
  }

  advanceInternationalBracket(bracket);
  processInternationalBracketRound();
}

function getInternationalPlacement(intl) {
  if (!intl.teams.includes('player')) return null;
  if (!intl.bracket || !intl.bracket.seeds.includes('player')) return 9;
  const b = intl.bracket;
  if (b.champion === 'player') return 1;
  if (b.type === 'double') {
    // L'élimination est déterminée par la dernière défaite en lower bracket (ou grande finale).
    const lostIn = (k) => b.matches[k] && b.matches[k].result && b.matches[k].result.loser === 'player';
    if (lostIn('gf')) return 2;
    if (lostIn('lb6')) return 3;
    if (lostIn('lb5')) return 4;
    if (lostIn('lb3') || lostIn('lb4')) return 5;
    if (lostIn('lb1') || lostIn('lb2')) return 7;
    return 5;
  }
  const f = b.matches.final;
  if (f.home === 'player' || f.away === 'player') return 2;
  if (['sf1', 'sf2'].some((k) => b.matches[k] && (b.matches[k].home === 'player' || b.matches[k].away === 'player'))) return 3;
  return 5;
}

function getInternationalRewards(event, placement) {
  const mult = event === 'worlds' ? 1.5 : 1.25;
  const base = getPlacementRewards(placement);
  const rewards = {
    coaching: Math.round(base.coaching * mult),
    budget: Math.round(base.budget * mult),
    prestige: Math.round(base.prestige * mult) + (event === 'worlds' ? 2 : 1)
  };
  // Budgets exacts par palier (v1.11.2). Prestige et coaching calculés par formule.
  if (event === 'msi') {
    if (placement === 1)       rewards.budget = 200;
    else if (placement === 2)  rewards.budget = 157;
    else if (placement <= 4)   rewards.budget = 119;
    else if (placement <= 6)   rewards.budget = 81;
    else if (placement <= 8)   rewards.budget = 31;
    else                       rewards.budget = 25; // éliminé en phase de groupes
  } else {
    if (placement === 1)       rewards.budget = 240;
    else if (placement === 2)  rewards.budget = 188;
    else if (placement <= 4)   rewards.budget = 143;
    else if (placement <= 6)   rewards.budget = 98;
    else if (placement <= 8)   rewards.budget = 53;
    else                       rewards.budget = 35; // éliminé en phase de groupes
    // 3e Worlds (perdant LB finale) : coaching et prestige bonifiés (v1.10.1)
    if (placement === 3) { rewards.coaching = 120; rewards.prestige = 13; }
  }
  return rewards;
}

// Région d'une équipe (joueur ou IA), pour mémoriser le vainqueur international.
function getTeamRegionId(teamId) {
  if (teamId === 'player') {
    const pr = REGIONS.find((r) => r.id === state.region);
    return pr ? pr.aiRegion : 'LEC';
  }
  const t = AI_TEAMS.find((tt) => tt.id === teamId);
  return t ? t.region : null;
}

function finishInternational() {
  const intl = state.international;
  intl.phase = 'done';
  // Mémorise la région du champion → débloque la place bonus du tournoi suivant
  // (MSI → 3e place Worlds même année ; Worlds → 2e place MSI année suivante).
  const championRegion = intl.bracket ? getTeamRegionId(intl.bracket.champion) : null;
  if (championRegion) {
    if (intl.event === 'msi') state.lastMsiWinnerRegion = championRegion;
    else state.lastWorldsWinnerRegion = championRegion;
  }
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
    intl.log.unshift({ k: 'log.intlEnd', p: { event: eventLabel(intl), placement, coaching: rewards.coaching, budget: rewards.budget, prestige: rewards.prestige } });
    // v1.15.0 — sponsors : accumulateur annuel + paiement en continu des sponsors résultat.
    updateSponsorYearRecap({ intlEvent: intl.event, intlPlacement: placement });
    applySponsorInternationalPayout(placement, rewards);
  } else {
    intl.log.unshift({ k: 'log.intlChampion', p: { event: eventLabel(intl), year: intl.year, teamId: intl.bracket.champion } });
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
  // v1.15.0 — garde-fou : tant que la décision sponsor n'est pas finalisée,
  // state.international reste sur phase 'done' et l'écran de recap Worlds reste
  // accessible (ex: retour au calendrier). Sans ce verrou, recliquer "Continuer"
  // relancerait la rotation IA, les fins de contrat ET retirerait une nouvelle
  // matrice de sponsors à chaque clic.
  if (intl.postProcessed) {
    if (state.sponsor.decisionPending) showSponsorBanner();
    return;
  }
  intl.postProcessed = true;
  // Worlds terminé : traiter les fins de contrat avant la nouvelle saison.
  const completedYear = season.year;
  const nextYear = season.year + 1;
  // v1.11.0 — Rotation des effectifs IA (retraites + remplaçants) pour la saison à venir.
  const aiMovements = applyAIRetirementRotation(nextYear);
  if (aiMovements.length) logAIRotation(nextYear, aiMovements);
  const leaving = processContractExpirations(completedYear);
  leaving.forEach((p) => logTransfer(nextYear, 'depart', playerTeamLabel(), p.name, p.role));
  // v1.15.0 — fenêtre de renouvellement sponsor obligatoire avant la nouvelle année.
  if (leaving.length) {
    showContractDeparturesModal(leaving, () => openSponsorRenewalWindow(nextYear));
  } else {
    openSponsorRenewalWindow(nextYear);
  }
}

// Annonce les joueurs partis en fin de contrat, puis enchaîne sur la nouvelle saison.
function showContractDeparturesModal(leaving, onContinue) {
  const rows = leaving.map((p) => `
    <div class="transfer-card__header" style="margin-bottom:8px;">
      <div class="mini-avatar">${getInitials(p.name)}</div>
      <div class="transfer-card__identity">
        <div class="transfer-card__name">${p.name}</div>
        <div class="transfer-card__meta">${p.role} &mdash; ${t('depart.meta')}</div>
      </div>
    </div>
  `).join('');
  showModal(`
    <h3 class="panel-title">${t('depart.title')}</h3>
    <p style="margin-bottom:12px;">${leaving.length === 1 ? t('depart.desc1') : t('depart.descN')}</p>
    <div class="transfer-release-list">${rows}</div>
    <div class="modal-content__actions" style="margin-top:16px;">
      <button class="btn-primary" id="btn-departures-continue">${t('common.continue')}</button>
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
    intl.log.unshift({ k: 'log.intlPlayerGroup', p: { event: eventLabel(intl), resultWon: won, score: `${scoreFor}-${scoreAgainst}`, teamId: pm.opponentTeamId } });
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
    intl.log.unshift({ k: 'log.intlPlayerMatch', p: { event: eventLabel(intl), matchKey: pm.matchKey, resultWon: won, score: `${scoreFor}-${scoreAgainst}`, teamId: pm.opponentTeamId } });
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
    season.log.unshift({ k: 'log.seasonPlayerResult', p: { d: season.matchday, resultWon: won, score: `${scoreFor}-${scoreAgainst}`, teamId: opponentId } });

    // v1.14.0 : score structuré du match du joueur (respecte l'ordre home/away du calendrier)
    const pf = getPlayerFixture(season.matchday);
    if (pf) {
      const playerHome = pf.home === 'player';
      recordMatchdayMatch(season, season.matchday - 1, pf.home, pf.away, won ? 'player' : opponentId,
        playerHome ? scoreFor : scoreAgainst, playerHome ? scoreAgainst : scoreFor);
    }

    const pairings = season.schedule[season.matchday - 1] || [];
    pairings.forEach((p) => {
      if (p.home === 'player' || p.away === 'player') return;
      const res = simulateAISeries(p.home, p.away, 'BO3');
      recordAIMatchResult(p.home, p.away, res.winner);
      recordMatchResult(p.home, p.away, res.winner, res.goldDiffForA, res.scoreA, res.scoreB);
      recordMatchdayMatch(season, season.matchday - 1, p.home, p.away, res.winner, res.scoreA, res.scoreB);
      season.log.unshift({ k: 'log.seasonAiResult', p: { d: season.matchday, winnerId: res.winner, loserId: res.loser, score: `${res.scoreA}-${res.scoreB}` } });
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
    season.log.unshift({ k: 'log.poPlayerResult', p: { roundKey: po.round, resultWon: won, score: `${scoreFor}-${scoreAgainst}`, teamId: pm.opponentTeamId } });
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
      <div class="empty-state">${t('empty.calendar')}</div>
      <div class="training-form__actions">
        <button class="btn-primary" id="btn-start-season">${t('cal.startSeason')}</button>
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

// v1.14.0 : programme des journées repliable (passées avec scores, à venir en « vs »).
function buildMatchdayScheduleHtml(season) {
  const total = season.schedule.length;
  const current = season.matchday;
  const expandedMd = (state._calExpandedMd !== undefined) ? state._calExpandedMd : current;
  const results = Array.isArray(season.matchResults) ? season.matchResults : [];

  const blocks = [];
  for (let md = 1; md <= total; md++) {
    const pairings = season.schedule[md - 1] || [];
    const mdResults = results[md - 1] || [];
    const isPast = md < current;
    const isCurrent = md === current;
    const expanded = md === expandedMd;
    const badge = isCurrent
      ? `<span class="md-badge md-badge--current">${t('cal.mdCurrent')}</span>`
      : (isPast ? `<span class="md-badge md-badge--done">✓</span>` : '');

    const rows = pairings.map((p) => {
      const isMine = p.home === 'player' || p.away === 'player';
      const homeShort = getTeamShortName(p.home);
      const awayShort = getTeamShortName(p.away);
      const res = mdResults.find((r) => r.home === p.home && r.away === p.away);
      const mineCls = isMine ? ' md-match--mine' : '';
      if (res) {
        const homeWin = res.winner === p.home ? ' md-match__team--win' : '';
        const awayWin = res.winner === p.away ? ' md-match__team--win' : '';
        return `<div class="md-match${mineCls}">
          <span class="md-match__team${homeWin}">${homeShort}</span>
          <span class="md-match__score">${res.hs} - ${res.as}</span>
          <span class="md-match__team md-match__team--right${awayWin}">${awayShort}</span>
        </div>`;
      }
      return `<div class="md-match${mineCls}">
        <span class="md-match__team">${homeShort}</span>
        <span class="md-match__score md-match__score--vs">vs</span>
        <span class="md-match__team md-match__team--right">${awayShort}</span>
      </div>`;
    }).join('');

    blocks.push(`<div class="md-block${isCurrent ? ' md-block--current' : ''}">
      <button class="md-header" data-md-toggle="${md}">
        <span class="md-header__chevron">${expanded ? '&#9662;' : '&#9656;'}</span>
        <span class="md-header__title">${t('cal.mdLabel', { n: md })}</span>
        ${badge}
      </button>
      <div class="md-body"${expanded ? '' : ' style="display:none;"'}>${rows || ''}</div>
    </div>`);
  }
  return `<h3 class="panel-title">${t('cal.scheduleTitle')}</h3><div class="md-schedule">${blocks.join('')}</div>`;
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
    fixtureLabel = t('cal.matchday', { d: season.matchday, total: totalMatchdays, home: getTeamName('player'), away: getTeamName(opponentId) });
  } else {
    fixtureLabel = t('cal.restDay', { d: season.matchday, total: totalMatchdays });
  }

  let actionLabel;
  let actionType;
  if (season.pendingMatch) {
    actionLabel = t('cal.resume');
    actionType = 'resume';
  } else if (fixture) {
    actionLabel = t('cal.playDay');
    actionType = 'play';
  } else {
    actionLabel = t('cal.simDay');
    actionType = 'simulate';
  }

  const logHtml = season.log.slice(0, 8).map((l) => `<div class="result-chip">${logChip(l)}</div>`).join('');

  el.innerHTML = `
    <h3 class="panel-title">${t('cal.regularTitle', { split: splitLabel(season.split), year: season.year, region: regionDisplayName(season.region) })}</h3>
    <p class="card__count">${fixtureLabel}</p>
    <div class="training-form__actions">
      <button class="btn-primary" id="btn-calendar-action">${actionLabel}</button>
    </div>
    <h3 class="panel-title">${t('cal.standings')}</h3>
    <table class="history-table">
      <thead><tr><th>#</th><th>${t('cal.colTeam')}</th><th>${t('cal.colW')}</th><th>${t('cal.colL')}</th><th title="${t('cal.nexusTip')}">${t('cal.colNexus')}</th></tr></thead>
      <tbody>${standingsRows}</tbody>
    </table>
    <h3 class="panel-title">${t('cal.recentResults')}</h3>
    <div class="recent-results">${logHtml || `<p class="card__count">${t('cal.noResults')}</p>`}</div>
    ${buildMatchdayScheduleHtml(season)}
  `;

  el.querySelectorAll('[data-md-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const md = Number(btn.dataset.mdToggle);
      const cur = (state._calExpandedMd !== undefined) ? state._calExpandedMd : season.matchday;
      state._calExpandedMd = (cur === md) ? -1 : md;
      renderCalendar();
    });
  });

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
        startMatchSeries(opponentId, 'BO3', 'on', `${splitLabel(season.split)} ${season.year} - ${regionDisplayName(season.region)}`);
      } else {
        state.mercatoOpen = false; // le split démarre : fermeture du mercato
        const pairings = season.schedule[season.matchday - 1] || [];
        pairings.forEach((p) => {
          if (p.home === 'player' || p.away === 'player') return;
          const res = simulateAISeries(p.home, p.away, 'BO3');
          recordAIMatchResult(p.home, p.away, res.winner);
          recordMatchResult(p.home, p.away, res.winner, res.goldDiffForA, res.scoreA, res.scoreB);
          recordMatchdayMatch(season, season.matchday - 1, p.home, p.away, res.winner, res.scoreA, res.scoreB);
          season.log.unshift({ k: 'log.seasonAiResult', p: { d: season.matchday, winnerId: res.winner, loserId: res.loser, score: `${res.scoreA}-${res.scoreB}` } });
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
  // Deux variantes de nom : la CSS affiche le complet sur écran large (Worlds),
  // l'abréviation sur petit écran / autres brackets.
  const nameHtml = (team) => team
    ? `<span class="tname-full">${getTeamName(team)}</span><span class="tname-short">${getTeamShortName(team)}</span>`
    : 'TBD';
  const aName = nameHtml(teamA);
  const bName = nameHtml(teamB);
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
    ${isUpcoming ? `<div class="po-card__cta">${t('bracket.upcoming')}</div>` : ''}
  </div>`;
}

function poByeCard(poId, teamId, seed) {
  return `<div class="po-bye" data-po="${poId}">
    <div class="po-bye__label">${t('bracket.byeLabel')}</div>
    <div class="po-bye__name">${getTeamShortName(teamId)}</div>
    <div class="po-bye__seed">${t('bracket.seed', { n: seed })}</div>
  </div>`;
}

function poChampionBlock(seasonLabel, championId) {
  const pending = !championId;
  const name = championId
    ? `<span class="tname-full">${getTeamName(championId)}</span><span class="tname-short">${getTeamShortName(championId)}</span>`
    : t('bracket.tbd');
  return `<div class="po-champion${pending ? ' po-champion--pending' : ''}" data-po="po-champion">
    <div class="po-champion__crown">👑</div>
    <div class="po-champion__title">${t('bracket.winner')}</div>
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
  // Demi-finales -> Finale (saison, MSI, Worlds simple élim)
  connect(get('po-sf-top'), get('po-sf-bot'), get('po-final'), GD);
  // Finale -> bloc Vainqueur
  single(get('po-final'), get('po-champion'), GD);
  // Worlds double élimination — connecteurs internes par section (null-safe).
  // Upper bracket
  connect(get('po-ub-qf1'), get('po-ub-qf2'), get('po-ub-df1'), BL);
  connect(get('po-ub-qf3'), get('po-ub-qf4'), get('po-ub-df2'), BL);
  connect(get('po-ub-df1'), get('po-ub-df2'), get('po-ub-f'), GD);
  // Lower bracket (les arrivées externes depuis l'upper sont indiquées par les libellés)
  single(get('po-lb-1'), get('po-lb-3'), BL);
  single(get('po-lb-2'), get('po-lb-4'), BL);
  connect(get('po-lb-3'), get('po-lb-4'), get('po-lb-5'), BL);
  single(get('po-lb-5'), get('po-lb-6'), GD);
  // Grande finale -> bloc Vainqueur
  single(get('po-gf'), get('po-champion'), GD);
}

// Trace les lignes du bracket international : 3 sous-conteneurs si double élim.
function drawIntlBracketLines(b) {
  if (b && b.type === 'double') {
    drawPoBracketLines('po-bracket-intl-ub');
    drawPoBracketLines('po-bracket-intl-lb');
    drawPoBracketLines('po-bracket-intl-gf');
  } else {
    drawPoBracketLines('po-bracket-intl');
  }
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
    <div class="po-legend__item"><div class="po-legend__dot po-legend__dot--win"></div>${t('bracket.legendQualified')}</div>
    <div class="po-legend__item"><div class="po-legend__dot po-legend__dot--gold"></div>${t('bracket.legendNext')}</div>
    <div class="po-legend__item"><div class="po-legend__dot po-legend__dot--out"></div>${t('bracket.legendOut')}</div>
  </div>`;
  return `<div class="po-bracket-wrapper">
    <div class="po-bracket" id="po-bracket-season">
      <svg class="po-bracket__svg"></svg>
      ${col(t('bracket.qfByes') + '<br>BO5',
        half(poByeCard('po-bye-top', seeds[0], 1), poBracketCard('po-qf2', t('bracket.qf2'), m.qf2,4,5,isUp('qf2'),false)) +
        half(poBracketCard('po-qf1', t('bracket.qf1'), m.qf1,3,6,isUp('qf1'),false), poByeCard('po-bye-bot', seeds[1], 2))
      )}
      <div class="po-gap"></div>
      ${col(t('bracket.semis') + '<br>BO5',
        centered(poBracketCard('po-sf-top', t('bracket.sf1'), m.sf1,null,null,isUp('sf1'),false)) +
        centered(poBracketCard('po-sf-bot', t('bracket.sf2'), m.sf2,null,null,isUp('sf2'),false))
      )}
      <div class="po-gap"></div>
      ${col(t('bracket.final') + '<br>BO5', centered(poBracketCard('po-final', t('bracket.grandFinal'), m.final,null,null,isUp('final'),true)))}
      <div class="po-gap"></div>
      ${col('&nbsp;<br>&nbsp;', centered(poChampionBlock(seasonLabel || '', champ)))}
    </div>
    ${legend}
  </div>`;
}

// Bracket double élimination (Worlds, v1.10.0) : Upper + Lower + Grande Finale.
function buildDoubleBracketHtml(b, pendingMatch, seasonLabel) {
  propagateDoubleBracket(b); // alimente les blocs aval déjà déterminés
  const m = b.matches;
  const isUp = (k) => pendingMatch && pendingMatch.matchKey === k;
  const champ = b.champion || (m.gf.result ? m.gf.result.winner : null);
  const legend = `<div class="po-legend">
    <div class="po-legend__item"><div class="po-legend__dot po-legend__dot--win"></div>${t('bracket.legendQualified')}</div>
    <div class="po-legend__item"><div class="po-legend__dot po-legend__dot--gold"></div>${t('bracket.legendNext')}</div>
    <div class="po-legend__item"><div class="po-legend__dot po-legend__dot--out"></div>${t('bracket.legendOut')}</div>
  </div>`;
  const pairCol = (H, lbl, c1, c2) => `<div style="height:${H}px;display:flex;flex-direction:column;">
    <div class="po-col__label">${lbl}</div>
    <div style="flex:1;display:flex;flex-direction:column;justify-content:space-between;">${c1}${c2}</div>
  </div>`;
  const singleCol = (H, lbl, card) => `<div style="height:${H}px;display:flex;flex-direction:column;">
    <div class="po-col__label">${lbl}</div>
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">${card}</div>
  </div>`;
  const sectionTitle = (title, sub) => `<div class="dbl-section-title">${title}${sub ? ` <span class="dbl-section-sub">${sub}</span>` : ''}</div>`;

  // ---------- UPPER BRACKET ----------
  const Hub = 430;
  const halfH = Math.floor((Hub - 38) / 2);
  // Colonne "demis" alignée sur la structure en deux moitiés des quarts : la carte
  // du haut est centrée sur le couple Q1/Q2, celle du bas sur Q3/Q4 → liaisons
  // centrées et symétriques (v1.10.2).
  const halfSplitCol = (H, lbl, cTop, cBot) => `<div style="height:${H}px;display:flex;flex-direction:column;">
    <div class="po-col__label">${lbl}</div>
    <div style="flex:1;display:flex;flex-direction:column;">
      <div style="height:${halfH}px;display:flex;flex-direction:column;justify-content:center;">${cTop}</div>
      <div style="flex:1;"></div>
      <div style="height:${halfH}px;display:flex;flex-direction:column;justify-content:center;">${cBot}</div>
    </div>
  </div>`;
  const ubQfCol = `<div style="height:${Hub}px;display:flex;flex-direction:column;">
    <div class="po-col__label">${t('dbl.ubQf')}<br>BO5</div>
    <div style="flex:1;display:flex;flex-direction:column;">
      <div style="height:${halfH}px;display:flex;flex-direction:column;justify-content:space-between;">
        ${poBracketCard('po-ub-qf1', t('bracket.qf1'), m.qf1, 1, 8, isUp('qf1'), false)}
        ${poBracketCard('po-ub-qf2', t('bracket.qf2'), m.qf2, 4, 5, isUp('qf2'), false)}
      </div>
      <div style="flex:1;"></div>
      <div style="height:${halfH}px;display:flex;flex-direction:column;justify-content:space-between;">
        ${poBracketCard('po-ub-qf3', t('bracket.qf3'), m.qf3, 3, 6, isUp('qf3'), false)}
        ${poBracketCard('po-ub-qf4', t('bracket.qf4'), m.qf4, 2, 7, isUp('qf4'), false)}
      </div>
    </div>
  </div>`;
  const ubHtml = `<div class="po-bracket" id="po-bracket-intl-ub">
    <svg class="po-bracket__svg"></svg>
    ${ubQfCol}
    <div class="po-gap"></div>
    ${halfSplitCol(Hub, t('dbl.ubSemis') + '<br>BO5', poBracketCard('po-ub-df1', t('dbl.ubSemi1'), m.df1, null, null, isUp('df1'), false), poBracketCard('po-ub-df2', t('dbl.ubSemi2'), m.df2, null, null, isUp('df2'), false))}
    <div class="po-gap"></div>
    ${singleCol(Hub, t('dbl.ubFinal') + '<br>BO5', poBracketCard('po-ub-f', t('dbl.ubFinal'), m.f, null, null, isUp('f'), false))}
  </div>`;

  // ---------- LOWER BRACKET ----------
  const Hlb = 300;
  const lbHtml = `<div class="po-bracket" id="po-bracket-intl-lb">
    <svg class="po-bracket__svg"></svg>
    ${pairCol(Hlb, t('dbl.lbRound1') + '<br>BO5', poBracketCard('po-lb-1', t('dbl.lbLoserQ12'), m.lb1, null, null, isUp('lb1'), false), poBracketCard('po-lb-2', t('dbl.lbLoserQ34'), m.lb2, null, null, isUp('lb2'), false))}
    <div class="po-gap"></div>
    ${pairCol(Hlb, t('dbl.lbRound2') + '<br>BO5', poBracketCard('po-lb-3', t('dbl.lbVsLoserUbSemi2'), m.lb3, null, null, isUp('lb3'), false), poBracketCard('po-lb-4', t('dbl.lbVsLoserUbSemi1'), m.lb4, null, null, isUp('lb4'), false))}
    <div class="po-gap"></div>
    ${singleCol(Hlb, t('dbl.lbSemi') + '<br>BO5', poBracketCard('po-lb-5', t('dbl.lbSemi'), m.lb5, null, null, isUp('lb5'), false))}
    <div class="po-gap"></div>
    ${singleCol(Hlb, t('dbl.lbFinal') + '<br>BO5', poBracketCard('po-lb-6', t('dbl.lbVsLoserUbFinal'), m.lb6, null, null, isUp('lb6'), false))}
  </div>`;

  // ---------- GRANDE FINALE ----------
  const Hgf = 240;
  const gfHtml = `<div class="po-bracket" id="po-bracket-intl-gf">
    <svg class="po-bracket__svg"></svg>
    ${singleCol(Hgf, t('dbl.grandFinal') + '<br>BO5', poBracketCard('po-gf', t('dbl.gfCard'), m.gf, null, null, isUp('gf'), true))}
    <div class="po-gap"></div>
    <div style="height:${Hgf}px;display:flex;flex-direction:column;">
      <div class="po-col__label">&nbsp;<br>&nbsp;</div>
      <div style="flex:1;display:flex;align-items:center;justify-content:center;">${poChampionBlock(seasonLabel || '', champ)}</div>
    </div>
  </div>`;

  return `<div class="po-bracket-wrapper dbl-bracket">
    ${sectionTitle('Upper Bracket', t('dbl.upperSub'))}
    ${ubHtml}
    ${sectionTitle('Lower Bracket', t('dbl.lowerSub'))}
    ${lbHtml}
    ${sectionTitle(t('dbl.grandFinal'))}
    ${gfHtml}
    ${legend}
  </div>`;
}

function buildIntlBracketHtml(b, pendingMatch, seasonLabel) {
  if (b.type === 'double') return buildDoubleBracketHtml(b, pendingMatch, seasonLabel);
  const m = b.matches;
  const isUp = (k) => pendingMatch && pendingMatch.matchKey === k;
  const has8 = !!m.qf1;
  const champ = b.champion || (m.final.result ? m.final.result.winner : null);
  const championColMSI = (H) => `<div style="height:${H}px;display:flex;flex-direction:column;">
    <div class="po-col__label">&nbsp;<br>&nbsp;</div>
    <div style="flex:1;display:flex;align-items:center;justify-content:center;">${poChampionBlock(seasonLabel || '', champ)}</div>
  </div>`;
  const legend = `<div class="po-legend">
    <div class="po-legend__item"><div class="po-legend__dot po-legend__dot--win"></div>${t('bracket.legendQualified')}</div>
    <div class="po-legend__item"><div class="po-legend__dot po-legend__dot--gold"></div>${t('bracket.legendNext')}</div>
    <div class="po-legend__item"><div class="po-legend__dot po-legend__dot--out"></div>${t('bracket.legendOut')}</div>
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
        ${pairCol(t('bracket.semis') + '<br>BO5', poBracketCard('po-sf-top', t('bracket.sf1'), m.sf1,1,4,isUp('sf1'),false), poBracketCard('po-sf-bot', t('bracket.sf2'), m.sf2,2,3,isUp('sf2'),false))}
        <div class="po-gap"></div>
        ${singleCol(t('bracket.final') + '<br>BO5', poBracketCard('po-final', t('bracket.grandFinal'), m.final,null,null,isUp('final'),true))}
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
    <div class="po-col__label">${t('bracket.quarterfinals')}<br>BO5</div>
    <div style="flex:1;display:flex;flex-direction:column;">
      <div style="height:${halfH}px;display:flex;flex-direction:column;justify-content:space-between;">
        ${poBracketCard('po-qf1-top', t('bracket.qf1'), m.qf1,1,8,isUp('qf1'),false)}
        ${poBracketCard('po-qf1-bot', t('bracket.qf4'), m.qf4,2,7,isUp('qf4'),false)}
      </div>
      <div style="flex:1;"></div>
      <div style="height:${halfH}px;display:flex;flex-direction:column;justify-content:space-between;">
        ${poBracketCard('po-qf2-top', t('bracket.qf2'), m.qf2,4,5,isUp('qf2'),false)}
        ${poBracketCard('po-qf2-bot', t('bracket.qf3'), m.qf3,3,6,isUp('qf3'),false)}
      </div>
    </div>
  </div>`;
  return `<div class="po-bracket-wrapper">
    <div class="po-bracket" id="po-bracket-intl">
      <svg class="po-bracket__svg"></svg>
      ${qfColHtml}
      <div class="po-gap"></div>
      ${pairCol(t('bracket.semis') + '<br>BO5', poBracketCard('po-sf-top', t('bracket.sf1'), m.sf1,null,null,isUp('sf1'),false), poBracketCard('po-sf-bot', t('bracket.sf2'), m.sf2,null,null,isUp('sf2'),false))}
      <div class="po-gap"></div>
      ${singleCol(t('bracket.final') + '<br>BO5', poBracketCard('po-final', t('bracket.grandFinal'), m.final,null,null,isUp('final'),true))}
      <div class="po-gap"></div>
      ${championColMSI(H)}
    </div>
    ${legend}
  </div>`;
}

function renderPlayoffsCalendar(el, season) {
  const po = season.playoffs;
  const logHtml = season.log.slice(0, 8).map((l) => `<div class="result-chip">${logChip(l)}</div>`).join('');

  let actionHtml;
  if (season.pendingMatch) {
    const pm = season.pendingMatch;
    actionHtml = `
      <p class="card__count">${t('cal.nextSeries', { fmt: pm.format, team: getTeamName(pm.opponentTeamId) })}</p>
      <div class="training-form__actions"><button class="btn-primary" id="btn-play-playoff">${t('cal.playSeries')}</button></div>
    `;
  } else {
    actionHtml = `<p class="card__count">${t('cal.playoffsOngoing')}</p>`;
  }

  el.innerHTML = `
    <h3 class="panel-title">${t('cal.playoffsTitle', { split: splitLabel(season.split), year: season.year, region: regionDisplayName(season.region) })}</h3>
    ${buildSeasonBracketHtml(po, season.pendingMatch, `${splitLabel(season.split)} ${season.year} - ${regionDisplayName(season.region)}`)}
    ${actionHtml}
    <h3 class="panel-title">${t('cal.recentResults')}</h3>
    <div class="recent-results">${logHtml || `<p class="card__count">${t('cal.noResults')}</p>`}</div>
  `;

  requestAnimationFrame(() => drawPoBracketLines('po-bracket-season'));

  const playBtn = document.getElementById('btn-play-playoff');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      const pm = season.pendingMatch;
      startMatchSeries(pm.opponentTeamId, pm.format, 'on', `Playoffs - ${splitLabel(season.split)} ${season.year} - ${regionDisplayName(season.region)}`);
    });
  }
}

function renderSeasonRecap(el, season) {
  const placement = getFinalPlacement();
  const rewards = getPlacementRewards(placement);
  const logHtml = season.log.slice(0, 10).map((l) => `<div class="result-chip">${logChip(l)}</div>`).join('');
  const nextLabel = season.split === 'spring' ? t('cal.toMsi') : t('cal.toWorlds');
  const progressionHtml = careerProgressionHtml(state.lastCareerProgression);
  const bracketHtml = season.playoffs
    ? buildSeasonBracketHtml(season.playoffs, null, `${splitLabel(season.split)} ${season.year} - ${regionDisplayName(season.region)}`)
    : '';

  el.innerHTML = `
    <h3 class="panel-title">${t('cal.finishedTitle', { split: splitLabel(season.split), year: season.year, region: regionDisplayName(season.region) })}</h3>
    <p class="card__count">${t('cal.finalRank', { label: placementLabel(placement) })}</p>
    <p class="card__count">${t('cal.rewardsGot', { coaching: rewards.coaching, budget: rewards.budget, prestige: rewards.prestige })}</p>
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
      <h3 class="panel-title">${t('intl.group', { g: String.fromCharCode(65 + i) })}</h3>
      <table class="history-table">
        <thead><tr><th>#</th><th>${t('cal.colTeam')}</th><th>${t('cal.colW')}</th><th>${t('cal.colL')}</th><th title="${t('cal.nexusTip')}">${t('cal.colNexus')}</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }).join('');

  const logHtml = intl.log.slice(0, 8).map((l) => `<div class="result-chip">${logChip(l)}</div>`).join('');
  const pm = intl.pendingMatch;
  if (!pm) { processInternationalGroupMatchday(); renderCalendar(); return; }
  const actionLabel = pm.started ? t('cal.resume') : t('intl.playMatch');

  el.innerHTML = `
    <h3 class="panel-title">${t('intl.groupsTitle', { event: eventLabel(intl), year: intl.year, d: intl.groupMatchday, total: intl.totalGroupRounds })}</h3>
    <p class="card__count">${t('intl.nextMatch', { home: getTeamName('player'), away: getTeamName(pm.opponentTeamId) })}</p>
    <div class="training-form__actions">
      <button class="btn-primary" id="btn-international-action">${actionLabel}</button>
    </div>
    ${groupsHtml}
    <h3 class="panel-title">${t('cal.recentResults')}</h3>
    <div class="recent-results">${logHtml || `<p class="card__count">${t('cal.noResults')}</p>`}</div>
  `;

  const btn = document.getElementById('btn-international-action');
  if (btn) {
    btn.addEventListener('click', () => {
      if (!pm.started) {
        pm.started = true;
        saveGame();
        startMatchSeries(pm.opponentTeamId, 'BO3', 'on', t('intl.ctxGroups', { event: eventLabel(intl), year: intl.year }));
      } else {
        showView('match');
      }
    });
  }
}

function renderInternationalBracket(el, intl) {
  const b = intl.bracket;
  const logHtml = intl.log.slice(0, 8).map((l) => `<div class="result-chip">${logChip(l)}</div>`).join('');

  let actionHtml;
  if (intl.pendingMatch) {
    const pm = intl.pendingMatch;
    const actionLabel = pm.started ? t('intl.resumeSeries') : t('cal.playSeries');
    actionHtml = `
      <p class="card__count">${t('cal.nextSeries', { fmt: pm.format, team: getTeamName(pm.opponentTeamId) })}</p>
      <div class="training-form__actions"><button class="btn-primary" id="btn-international-action">${actionLabel}</button></div>
    `;
  } else {
    actionHtml = `<p class="card__count">${t('intl.finalsOngoing')}</p>`;
  }

  el.innerHTML = `
    <h3 class="panel-title">${t('intl.finalsTitle', { event: eventLabel(intl), year: intl.year })}</h3>
    ${buildIntlBracketHtml(b, intl.pendingMatch, `${eventLabel(intl)} ${intl.year}`)}
    ${actionHtml}
    <h3 class="panel-title">${t('cal.recentResults')}</h3>
    <div class="recent-results">${logHtml || `<p class="card__count">${t('cal.noResults')}</p>`}</div>
  `;

  requestAnimationFrame(() => drawIntlBracketLines(b));

  const btn = document.getElementById('btn-international-action');
  if (btn) {
    btn.addEventListener('click', () => {
      const pm = intl.pendingMatch;
      if (!pm.started) {
        pm.started = true;
        saveGame();
        startMatchSeries(pm.opponentTeamId, pm.format, 'on', t('intl.ctxFinals', { event: eventLabel(intl), year: intl.year }));
      } else {
        showView('match');
      }
    });
  }
}

function renderInternationalRecap(el, intl) {
  const placement = getInternationalPlacement(intl);
  const logHtml = intl.log.slice(0, 10).map((l) => `<div class="result-chip">${logChip(l)}</div>`).join('');

  let placementHtml = '';
  if (placement !== null && intl.rewards) {
    const rank = placement === 1 ? t('intl.champion') : t('intl.nth', { n: placement });
    placementHtml = `<p class="card__count">${t('intl.recapRewards', { rank, coaching: intl.rewards.coaching, budget: intl.rewards.budget, prestige: intl.rewards.prestige })}</p>`;
  }

  const bracketHtml = intl.bracket
    ? buildIntlBracketHtml(intl.bracket, null, `${eventLabel(intl)} ${intl.year}`)
    : '';

  el.innerHTML = `
    <h3 class="panel-title">${t('intl.finishedTitle', { event: eventLabel(intl), year: intl.year })}</h3>
    <p class="card__count">${t('intl.championIs', { team: getTeamName(intl.bracket.champion) })}</p>
    ${placementHtml}
    ${bracketHtml}
    <div class="recent-results">${logHtml}</div>
    <div class="training-form__actions">
      <button class="btn-primary" id="btn-international-continue">${t('common.continue')}</button>
    </div>
  `;

  if (intl.bracket) requestAnimationFrame(() => drawIntlBracketLines(intl.bracket));

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
  LTA:           { control: 25, standard: 40, snowball: 22, stomp:  8, fiesta:  5 }, // v1.14.1 : clé alignée sur l'id région (season.region='LTA', affiché « LCS »)
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
    globalFearlessLocked: [],
    gameBansHistory: []
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
      `<button class="btn-secondary coin-flip__option" data-opt="${o.id}" data-prefix="${prefix}">${o.label}<span>${t('coinflip.desc.' + o.id)}</span></button>`
    ).join('');
  }

  function showSummary(playerOptId, aiOptId) {
    const { playerMapSide, playerPickOrder } = resolveFlipChoices(playerOptId, aiOptId);
    const sLabel = playerMapSide   === 'blue' ? 'Blue Side'   : 'Red Side';
    const pLabel = playerPickOrder === 'blue' ? 'First Pick'  : 'Last Pick';
    const overlay = document.getElementById('modal-overlay');
    overlay.querySelector('.modal-content').innerHTML = `
      <div class="coin-flip">
        <h3 class="coin-flip__title">${t('match.gameSummary', { n: gameNum })}</h3>
        <div class="coin-flip__summary">
          ${t('coinflip.sideLabel')} <strong>${sLabel}</strong> &nbsp;|&nbsp; ${t('coinflip.draftLabel')} <strong>${pLabel}</strong>
        </div>
        <div class="modal-content__actions">
          <button class="btn-primary" id="series-game-go">${t('coinflip.startDraft')}</button>
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
        <h3 class="coin-flip__title">${t('match.loserChoice', { n: gameNum })}</h3>
        <div class="coin-flip__result coin-flip__result--loss">${t('match.youLostFirst')}</div>
        <p class="coin-flip__sub coin-flip__category-label">${t('coinflip.catSide')}</p>
        <div class="coin-flip__options">${optionBtns(COIN_FLIP_CATEGORIES.side, 'sg-loser')}</div>
        <p class="coin-flip__sub coin-flip__category-label">${t('coinflip.catPick')}</p>
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
        <h3 class="coin-flip__title">${t('match.winnerChoice', { n: gameNum })}</h3>
        <div class="coin-flip__result coin-flip__result--win">${t('match.youWonAiFirst', { name: opName })}</div>
        <p class="coin-flip__sub">${t('coinflip.aiChose', { name: opName, opt: getCoinFlipOpt(aiOpt.id).label })}</p>
        <p class="coin-flip__sub coin-flip__category-label">${playerCat === COIN_FLIP_CATEGORIES.side ? t('coinflip.catSide') : t('coinflip.catPick')}</p>
        <div class="coin-flip__options">${optionBtns(playerCat, 'sg-winner')}</div>
      </div>`;
    overlay.querySelectorAll('[data-prefix="sg-winner"]').forEach(btn => {
      btn.addEventListener('click', () => showSummary(btn.dataset.opt, aiOpt.id));
    });
  }

  showModal(`
    <div class="coin-flip">
      <h3 class="coin-flip__title">${t('match.sidesChoice', { n: gameNum })}</h3>
      <p class="coin-flip__sub">
        ${playerWonLastGame
          ? t('match.aiLoserFirst', { name: opName })
          : t('match.youLoserFirst')}
      </p>
      <div class="modal-content__actions">
        <button class="btn-primary" id="series-game-next">${t('common.continue')}</button>
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
      `<button class="btn-secondary coin-flip__option" data-opt="${o.id}" data-prefix="${prefix}">${o.label}<span>${t('coinflip.desc.' + o.id)}</span></button>`
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
        <p class="coin-flip__sub">${t('coinflip.playerChose', { you: t('common.you'), opt: playerOpt.label })}</p>
        <p class="coin-flip__sub">${t('coinflip.aiChose', { name: opName, opt: aiOpt.label })}</p>
        <div class="coin-flip__summary">
          ${t('coinflip.sideLabel')} <strong>${sideLabel}</strong> &nbsp;|&nbsp; ${t('coinflip.draftLabel')} <strong>${pickLabel}</strong>
        </div>
        <div class="modal-content__actions">
          <button class="btn-primary" id="coin-flip-go">${t('coinflip.startDraft')}</button>
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
        <div class="coin-flip__result coin-flip__result--win">${t('coinflip.youFirst')}</div>
        <p class="coin-flip__sub">${t('coinflip.chooseAdvantage')}</p>
        <p class="coin-flip__sub coin-flip__category-label">${t('coinflip.catSide')}</p>
        <div class="coin-flip__options">${optionBtns(COIN_FLIP_CATEGORIES.side, 'cf-winner')}</div>
        <p class="coin-flip__sub coin-flip__category-label">${t('coinflip.catPick')}</p>
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
        <div class="coin-flip__result coin-flip__result--loss">${t('coinflip.aiFirst', { name: opName })}</div>
        <p class="coin-flip__sub">${t('coinflip.aiChose', { name: opName, opt: aiOpt.label })}</p>
        <p class="coin-flip__sub">${t('coinflip.chooseRemaining')}</p>
        <p class="coin-flip__sub coin-flip__category-label">${playerCat === COIN_FLIP_CATEGORIES.side ? t('coinflip.catSide') : t('coinflip.catPick')}</p>
        <div class="coin-flip__options">${optionBtns(playerCat, 'cf-loser')}</div>
      </div>`;
    overlay.querySelectorAll('[data-prefix="cf-loser"]').forEach(btn => {
      btn.addEventListener('click', () => showSummary(btn.dataset.opt, aiOpt.id));
    });
  }

  const resultHtml = playerWon
    ? `<div class="coin-flip__result coin-flip__result--win">${t('coinflip.win')}</div>`
    : `<div class="coin-flip__result coin-flip__result--loss">${t('coinflip.loss')}</div>`;

  showModal(`
    <div class="coin-flip">
      <h3 class="coin-flip__title">${t('coinflip.title')}</h3>
      <div class="coin-flip__coin" id="coin-anim">🪙</div>
      ${resultHtml}
      <div class="modal-content__actions">
        <button class="btn-primary" id="coin-flip-next">${t('common.continue')}</button>
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

function getStructureLabel(id) {
  if (id === 'NEXUS') return t('struct.nexus');
  if (id.startsWith('NEX_T')) return t('struct.nexusTurret', { n: id.slice(5) });
  const parts = id.split('_');
  const lane = { BOT: 'Bot', MID: 'Mid', TOP: 'Top' }[parts[0]] || parts[0];
  const tier = parts[1] || '';
  if (tier === 'INH') return t('struct.inhibitor', { lane });
  if (tier.startsWith('T')) return t('struct.tower', { n: tier.slice(1), lane });
  return STRUCTURE_LABELS[id] || id;
}

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

// v1.14.1 : pioche une variante de texte au hasard parmi les clés numérotées
// `${prefix}1`, `${prefix}2`, ... (jusqu'à `count`).
function pickEventVariant(prefix, count, vars) {
  const idx = 1 + Math.floor(Math.random() * count);
  return t(`${prefix}${idx}`, vars);
}

function buildEventText(template, winnerLabel, loserLabel, role, kills) {
  switch (template.id) {
    case 'lane_kill':
      return kills > 0
        ? pickEventVariant('event.laneKill', 2, { winner: winnerLabel, role: ROLE_NAMES[role] })
        : pickEventVariant('event.laneKillMiss', 2, { winner: winnerLabel, loser: loserLabel, role: ROLE_NAMES[role] });
    case 'gank':
      return kills > 0
        ? pickEventVariant('event.gank', 3, { winner: winnerLabel, loser: loserLabel })
        : pickEventVariant('event.gankMiss', 3, { winner: winnerLabel, loser: loserLabel });
    case 'dragon': return t('event.dragon', { winner: winnerLabel });
    case 'herald': return t('event.herald', { winner: winnerLabel });
    case 'grubs': return t('event.grubs', { winner: winnerLabel });
    case 'tower': {
      const rt = matchRuntime;
      const struct = rt ? rt._lastStructure : null;
      if (struct === 'NEXUS') return t('event.nexusDestroyed', { winner: winnerLabel });
      if (struct && struct.endsWith('_INH')) return t('event.inhibitor', { winner: winnerLabel, struct: getStructureLabel(struct) });
      return struct ? t('event.structure', { winner: winnerLabel, struct: getStructureLabel(struct) }) : t('event.towerGeneric', { winner: winnerLabel });
    }
    case 'teamfight': return t('event.teamfight', { winner: winnerLabel, kills });
    case 'baron': return t('event.baron', { winner: winnerLabel });
    case 'elder': return t('event.elder', { winner: winnerLabel });
    case 'dramatic': return t('event.dramatic', { winner: winnerLabel });
    default: return t('event.default', { winner: winnerLabel });
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

  let soulJustSecured = false;
  if (template.objective && template.objective !== 'towers') {
    const grubsExhausted = template.objective === 'grubs' && (rt.objectives.grubs.blue + rt.objectives.grubs.red) >= MATCH_GRUBS_TOTAL;
    if (!grubsExhausted) {
      rt.objectives[template.objective][winner]++;
      if (template.objective === 'dragons') {
        rt.dragonBuff = { side: winner, expiresAt: rt.gameClock + DRAGON_BUFF_DURATION };
        rt.nextDragonTime = rt.gameClock + DRAGON_RESPAWN;
        if (rt.objectives.dragons[winner] >= DRAGON_SOUL_COUNT && !rt.soulOwner) {
          rt.soulOwner = winner;
          rt.nextElderTime = rt.gameClock + ELDER_RESPAWN;
          soulJustSecured = true;
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

  const text = buildEventText(template, sideTeamLabel(winner), sideTeamLabel(winner === 'blue' ? 'red' : 'blue'), role, kills);
  rt.eventHistory.push({ category: template.category, text, dramatic: template.category === 'dramatic', side: winner });

  const mapEvent = buildMapEvent(template, role, winner, text, diff, rt);
  triggerMapEvent(mapEvent);
  updateMapObjectives(rt);

  renderMatchEvent(text, template.category);

  // v1.14.1 : ligne de log dédiée à l'Âme du Dragon, en plus de la prise du 4e dragon.
  if (soulJustSecured) {
    const soulText = t('event.dragonSoul', { winner: sideTeamLabel(winner) });
    rt.eventHistory.push({ category: 'dramatic', text: soulText, dramatic: true, side: winner });
    renderMatchEvent(soulText, 'dramatic');
  }

  updateMatchScoreboard();

  // v1.15.5 — fix : seule la destruction du nexus met fin à une partie, comme dans LoL
  // (une limite de temps forcée à 55 min désignait un vainqueur par avantage structurel
  // sans que le nexus ne tombe — supprimée, la partie peut désormais durer aussi
  // longtemps que nécessaire jusqu'à la vraie condition de victoire).
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
  if (btn) btn.textContent = rt.paused ? t('match.resume') : t('match.pause');
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
  lines.push(t('match.reportResult', { result: win ? t('train.won') : t('train.lost'), opp: opponent.name }));

  const dramaticEvents = eventHistory.filter((e) => e.dramatic);
  if (dramaticEvents.length) {
    lines.push(t('match.reportKeyMoment', { text: dramaticEvents[dramaticEvents.length - 1].text }));
  }

  const focusStats = OBJECTIVE_STAT_FOCUS.free_scrim;
  if (!win) {
    const weak = pickWeakLink(focusStats);
    if (weak) {
      lines.push(t('train.reportAnalysisLoss', { name: weak.player.name, stat: statLabel(weak.statKey), val: weak.value }));
    }
  } else {
    const strong = pickStrongLink(focusStats);
    if (strong) {
      lines.push(t('train.reportAnalysisWin', { name: strong.player.name, stat: statLabel(strong.statKey), val: strong.value }));
    }
  }

  const deltaLines = [];
  state.roster.forEach((p) => {
    const b = before[p.id], a = after[p.id];
    ['shotcalling', 'laning', 'teamfight', 'mechanics', 'mental', 'form'].forEach((key) => {
      if (a[key] !== b[key]) {
        const diff = a[key] - b[key];
        deltaLines.push(t('train.reportDeltaLine', { name: p.name, stat: statLabel(key), sign: diff > 0 ? '+' : '', diff, old: b[key], new: a[key] }));
      }
    });
  });
  if (deltaLines.length) {
    lines.push(t('train.reportEvolution'));
    lines.push(...deltaLines);
  }

  return lines;
}

function finishMatch() {
  const rt = matchRuntime;
  if (rt.timer) clearInterval(rt.timer);

  // v1.15.5 : la destruction du nexus est l'unique condition de victoire (comme dans
  // LoL) — finishMatch() n'est désormais appelée que lorsque rt.nexusWinner est défini.
  const winnerSide = rt.nexusWinner;

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
  revealScoutedTeam(rt.opponent.id); // v1.15.3 : ce match découvre les joueurs inconnus de l'adversaire

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
    if (state.draft) {
      series.gameBansHistory = series.gameBansHistory || [];
      series.gameBansHistory.push({ blueBans: state.draft.blueBans.slice(), redBans: state.draft.redBans.slice() });
    }
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
  renderMatchEvent(win ? t('match.win') : t('match.loss'), 'dramatic');

  const pauseBtn = document.getElementById('btn-pause-match');
  if (pauseBtn) {
    if (rt.seriesEvent && rt.seriesEvent.type === 'next') {
      pauseBtn.textContent = t('match.draftGame', { n: rt.seriesEvent.gameNumber });
    } else if (rt.seriesEvent && rt.seriesEvent.type === 'done') {
      pauseBtn.textContent = rt.seriesEvent.won
        ? t('match.seriesWon', { a: rt.seriesEvent.scoreFor, b: rt.seriesEvent.scoreAgainst })
        : t('match.seriesLost', { a: rt.seriesEvent.scoreFor, b: rt.seriesEvent.scoreAgainst });
    } else {
      pauseBtn.textContent = t('match.return');
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
  const blueLabel = playerMapSide === 'blue' ? (state.teamName || t('match.yourTeam')) : rt.opponent.name;
  const redLabel = playerMapSide === 'red' ? (state.teamName || t('match.yourTeam')) : rt.opponent.name;

  document.getElementById('match-team-home-name').textContent = blueLabel;
  document.getElementById('match-team-home-league').textContent = playerMapSide === 'blue' ? (state.region ? regionDisplayName(state.region) : '') : rt.opponent.region;
  document.getElementById('match-team-away-name').textContent = redLabel;
  document.getElementById('match-team-away-league').textContent = playerMapSide === 'red' ? (state.region ? regionDisplayName(state.region) : '') : rt.opponent.region;

  const seriesLabelEl = document.getElementById('match-series-label');
  if (seriesLabelEl) {
    const series = state.matchSeries;
    if (series) {
      const myShort = state.teamShortName || 'YOU';
      const oppShort = getTeamShortName(series.opponentTeamId);
      seriesLabelEl.textContent = `${series.format} - Game ${series.gameNumber} · ${myShort} ${series.scoreFor} - ${series.scoreAgainst} ${oppShort}`;
    } else {
      seriesLabelEl.textContent = '';
    }
  }

  document.getElementById('match-log').innerHTML = '';

  document.querySelectorAll('#match-speed-selector .speed-btn').forEach((btn) => {
    btn.classList.toggle('speed-btn--active', Number(btn.dataset.speed) === rt.speed);
    btn.onclick = () => setMatchSpeed(Number(btn.dataset.speed));
  });

  updateMatchObjectivesPanel();

  const pauseBtn = document.getElementById('btn-pause-match');
  pauseBtn.textContent = t('match.pause');
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
      <h2 class="panel-title">${t('match.setupTitle')}</h2>
      <p id="match-setup-message" class="card__count" style="margin-bottom: 12px;">${t('match.emptyRoster')}</p>
    `;
    return;
  }

  if (state.matchSeries) {
    const series = state.matchSeries;
    const opponent = getTeamRef(series.opponentTeamId);
    setupEl.innerHTML = `
      <h2 class="panel-title">${t('match.seriesInProgress')}</h2>
      <p id="match-setup-message" class="card__count" style="margin-bottom: 12px;">
        ${t('match.seriesScore', { fmt: series.format, opp: opponent.name, a: series.scoreFor, b: series.scoreAgainst, n: series.gameNumber })}
      </p>
      ${scoutingPreviewHtml(series.opponentTeamId)}
      <div class="training-form__actions">
        <button class="btn-primary" id="btn-resume-series">${t('match.resumeSeries')}</button>
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

  setupEl.innerHTML = `
    <h2 class="panel-title">${t('match.setupTitle')}</h2>
    <p id="match-setup-message" class="card__count" style="margin-bottom: 12px;">
      ${t('match.intro')}
    </p>
    <div class="training-form">
      <div class="training-form__group">
        <label>${t('match.regionLabel')}</label>
        <select id="match-region">
          ${REGIONS.map((r) => `<option value="${r.id}" ${r.id === state.region ? 'selected' : ''}>${r.name}</option>`).join('')}
        </select>
      </div>
      <div class="training-form__group">
        <label>${t('match.opponentLabel')}</label>
        <select id="match-opponent"></select>
      </div>
      <div class="training-form__group">
        <label>${t('match.formatLabel')}</label>
        <select id="match-format">
          <option value="BO1">BO1</option>
          <option value="BO3">BO3</option>
          <option value="BO5">BO5</option>
        </select>
      </div>
      <div class="training-form__group">
        <label>${t('match.fearlessLabel')}</label>
        <select id="match-fearless">
          <option value="off">${t('match.fearlessOff')}</option>
          <option value="on">${t('match.fearlessOn')}</option>
        </select>
      </div>
    </div>
    <div class="training-form__actions">
      <button class="btn-primary" id="btn-start-match">${t('match.startSeries')}</button>
    </div>
    <div id="match-scouting-preview"></div>
  `;

  const regionSelect = document.getElementById('match-region');
  const opponentSelect = document.getElementById('match-opponent');
  const scoutingPreviewEl = document.getElementById('match-scouting-preview');

  function updateScoutingPreview() {
    if (scoutingPreviewEl && opponentSelect) {
      scoutingPreviewEl.innerHTML = scoutingPreviewHtml(opponentSelect.value);
    }
  }

  // v1.15.2 — un sélecteur de région permet d'affronter n'importe quelle équipe de
  // n'importe quelle région en scrim hors saison (auparavant limité à sa propre région),
  // mêmes conditions d'accès que les scrims d'Entraînement : région, prestige, exemption
  // tournoi partagé (mêmes fonctions getScrimPrestigeReq/getScrimExemptionReason).
  function updateOpponentOptions() {
    if (!regionSelect || !opponentSelect) return;
    const playerAiRegion = (REGIONS.find(r => r.id === state.region) || {}).aiRegion;
    const opponents = getAITeamsForRegion(regionSelect.value).filter((team) => team.id !== state.aiTeamId);
    opponentSelect.innerHTML = opponents.map((team) => {
      const isSameRegion = team.region === playerAiRegion;
      const req = getScrimPrestigeReq(team.tier);
      const hasPrestige = state.resources.prestige >= req;
      const exemption = getScrimExemptionReason(team);
      let suffix = '';
      if (!isSameRegion && req > 0 && !exemption) {
        suffix = hasPrestige ? t('train.prestigeOk', { req }) : t('train.prestigeReq', { req });
      } else if (!isSameRegion && exemption) {
        suffix = t('train.sameComp');
      }
      return `<option value="${team.id}">${team.name} (${team.shortName})${suffix}</option>`;
    }).join('');
    updateScoutingPreview();
  }

  if (regionSelect) regionSelect.addEventListener('change', updateOpponentOptions);
  if (opponentSelect) opponentSelect.addEventListener('change', updateScoutingPreview);
  updateOpponentOptions();

  const startBtn = document.getElementById('btn-start-match');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      const opponentId = document.getElementById('match-opponent').value;
      const format = document.getElementById('match-format').value;
      const fearlessMode = document.getElementById('match-fearless').value;
      const opponent = getTeamRef(opponentId);
      if (!opponent) return;

      const playerAiRegion = (REGIONS.find(r => r.id === state.region) || {}).aiRegion;
      const isSameRegion = opponent.region === playerAiRegion;
      const exemptionReason = !isSameRegion ? getScrimExemptionReason(opponent) : null;
      const prestigeReq = getScrimPrestigeReq(opponent.tier || 3);
      const playerPrestige = state.resources.prestige;

      if (!isSameRegion && !exemptionReason && prestigeReq > 0 && playerPrestige < prestigeReq) {
        showMatchRefusalModal(opponent, prestigeReq, playerPrestige);
        return;
      }
      if (exemptionReason) {
        showToast(t('train.toastAccepted', { name: opponent.name, reason: exemptionReason }), 'info');
      }

      startMatchSeries(opponentId, format, fearlessMode);
    });
  }
}

// v1.15.2 — refus d'un match amical hors saison pour prestige insuffisant, même logique
// que showScrimRefusalModal (Entraînement) mais sans coût en points de coaching : Match
// n'a pas de ressource engagée avant le lancement, contrairement à un scrim.
function showMatchRefusalModal(opponent, required, currentPrestige) {
  showModal(`
    <h3 class="panel-title" style="color:var(--color-danger, #e05);">${t('match.refusalTitle')}</h3>
    <div style="display:flex;flex-direction:column;gap:14px;margin-top:8px;">
      <p style="color:var(--color-text);">${t('match.refusalDesc', { name: opponent.name })}</p>
      <div style="background:var(--color-surface-alt);border:1px solid var(--color-border);border-radius:6px;padding:12px 14px;">
        <p style="color:var(--color-text-muted);margin:0 0 6px;">
          &#127942; ${t('train.refusalReqLabel')} <strong style="color:var(--color-gold);">${required}</strong>
          &nbsp;|&nbsp; ${t('train.refusalYourLabel')} <strong style="color:${currentPrestige >= required ? 'var(--color-seafoam)' : '#e05'};">${currentPrestige}</strong>
        </p>
        <p style="color:var(--color-text-muted);margin:0;font-size:13px;">${t('match.refusalReason', { name: opponent.name })}</p>
      </div>
    </div>
    <div class="modal-content__actions" style="margin-top:20px;">
      <button class="btn-primary" onclick="closeModal();renderMatchSetup();">${t('common.understood')}</button>
    </div>
  `);
}

function scoutingPreviewHtml(opponentId) {
  const team = getTeamRef(opponentId);
  if (!team) return '';
  const report = getScoutingReport(opponentId);
  const tier = getScoutingTier(report.confidence);
  const topChamps = getTeamTopChampions(team);
  const tierLabel = scoutTierLabel(tier);

  let html = `
    <div class="scouting-preview-panel">
      <h4 class="panel-title">${t('match.scoutTitle', { team: team.name })} <span class="result-tag" style="font-size:11px;padding:2px 6px;">${tierLabel} ${report.confidence}/100</span></h4>
      <p>${t('match.scoutStyle', { style: formatStyle(team.style), lvl: getTeamAverageLevel(team), champs: topChamps.join(', ') })}</p>
  `;

  if (tier === 'advanced' || tier === 'premium') {
    const weak = getTeamWeakestRole(team);
    const topBan = (team.draftProfile && team.draftProfile.banPriorities || [])[0];
    html += `<p>${t('match.scoutWeak', { role: ROLE_NAMES[weak.role], name: weak.player.name, score: weak.score, ban: topBan || '?' })}</p>`;
  } else {
    html += `<p class="card__count" style="font-size:12px;">${t('match.scoutLocked')}</p>`;
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
    el.innerHTML = `<div class="empty-state">${t('champ.dataUnavailable')}</div>`;
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
  const roleLabels = { '': t('common.all'), TOP: 'TOP', JUNGLE: 'JUNGLE', MID: 'MID', ADC: 'ADC', SUPPORT: 'SUPPORT' };
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
      ${championPortraitHtml(c.name, 'champ-card__portrait')}
      <span class="champ-card__name">${c.name}</span>
      <span class="champ-card__role champ-card__role--${c.role}">${c.role}</span>
      <span class="champ-card__tags">${(c.tags || []).slice(0, 3).join(' · ') || '—'}</span>
    </button>
  `).join('') : `<div class="empty-state">${t('champ.noMatch')}</div>`;

  el.innerHTML = `
    <div class="draft-role-filter">${filterHtml}</div>
    <p class="card__count">${list.length} ${t(list.length > 1 ? 'champ.champions' : 'champ.champion')}</p>
    <div class="champ-grid">${cardsHtml}</div>
  `;

  el.querySelectorAll('[data-champ-role]').forEach((btn) => btn.addEventListener('click', () => {
    championsView.role = btn.dataset.champRole;
    renderChampions();
  }));
  el.querySelectorAll('[data-champ-id]').forEach((btn) => btn.addEventListener('click', () => {
    championsView.selected = btn.dataset.champId;
    renderChampions();
    const view = document.getElementById('view-champions');
    if (view) view.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    ? arr.map((tag) => `<span class="champ-chip">${tag}</span>`).join('')
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
      <div class="counter-row__tags">${t('champ.commonTags')}${(e.matchedTags || []).join(', ') || '-'}</div>
      <div class="counter-row__reason">${e.gameplayReason || ''}</div>
    </button>`;
  };

  el.innerHTML = `
    <button class="btn-back" id="champ-detail-back">${t('common.back')}</button>
    <div class="panel">
      ${championPortraitHtml(c.name, 'champ-detail__portrait', true)}
      <div class="champ-detail__head">
        <h3 class="panel-title">${c.name}</h3>
        <span class="champ-card__role champ-card__role--${c.role}">${roleLine}</span>
      </div>
      <div class="stats-grid">
        ${stat(c.difficulty + '/5', t('champ.difficulty'))}
        ${stat(c.phasePower.early, 'Early')}
        ${stat(c.phasePower.mid, 'Mid')}
        ${stat(c.phasePower.late, 'Late')}
        ${stat(c.objectivePower, t('champ.objectives'))}
      </div>
      <div class="champ-detail__tags">
        <div><span class="champ-detail__label">${t('champ.style')}</span> ${chips(c.tags)}</div>
        <div><span class="champ-detail__label">${t('champ.synergies')}</span> ${chips(c.synergyTags)}</div>
        <div><span class="champ-detail__label">${t('champ.strongVs')}</span> ${chips(c.counterTags)}</div>
      </div>
    </div>
    <div class="panel">
      <h3 class="panel-title">${t('champ.vsTitle', { name: c.name, n: counters.length })}</h3>
      ${counters.length ? counters.map((e) => counterRow(e, 'counter')).join('') : `<div class="empty-state">${t('champ.noCounterData')}</div>`}
    </div>
    <div class="panel">
      <h3 class="panel-title">${t('champ.counteredBy', { n: counteredBy.length })}</h3>
      ${counteredBy.length ? counteredBy.map((e) => counterRow(e, 'target')).join('') : `<div class="empty-state">${t('champ.noCounterData')}</div>`}
    </div>
  `;

  const backBtn = document.getElementById('champ-detail-back');
  if (backBtn) backBtn.addEventListener('click', () => {
    championsView.selected = null;
    renderChampions();
    const view = document.getElementById('view-champions');
    if (view) view.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
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
    el.innerHTML = `<div class="empty-state">${t('counters.dataUnavailable')}</div>`;
    return;
  }

  const searchInput = document.getElementById('counters-search');
  const roleFilter = document.getElementById('counters-role-filter');
  const confidenceFilter = document.getElementById('counters-confidence-filter');

  const search = (searchInput ? searchInput.value : '').trim().toLowerCase();
  const role = roleFilter ? roleFilter.value : '';
  const confidence = confidenceFilter ? confidenceFilter.value : '';

  if (!search) {
    el.innerHTML = `<div class="empty-state">${t('empty.counters')}</div>`;
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
          <strong>${counterName}</strong> (${e.counterRole}) ${t('counters.vs')} <strong>${targetName}</strong> (${e.targetRole})
          <span class="counter-row__score ${confClass}">${e.score} - ${e.confidence}</span>
        </div>
        <div class="counter-row__tags">${t('counters.tags')}${(e.matchedTags || []).join(', ') || '-'}</div>
        <div class="counter-row__reason">${e.gameplayReason || ''}</div>
        <div class="counter-row__advice">${e.draftUse || ''}</div>
      </div>
    `;
  }

  el.innerHTML = `
    <div class="panel">
      <h3 class="panel-title">${t('counters.counteredTitle', { q: search })}</h3>
      ${champCounters.length ? champCounters.map((e) => renderRow(e, 'counter')).join('') : `<div class="empty-state">${t('common.noResult')}</div>`}
    </div>
    <div class="panel">
      <h3 class="panel-title">${t('counters.counterTitle', { q: search })}</h3>
      ${champCountered.length ? champCountered.map((e) => renderRow(e, 'target')).join('') : `<div class="empty-state">${t('common.noResult')}</div>`}
    </div>
  `;
}

function renderScouting() {
  const el = document.getElementById('scouting-content');
  if (!el) return;

  if (state.roster.length === 0) {
    el.innerHTML = `<div class="empty-state">${t('scout.emptyRoster')}</div>`;
    return;
  }

  const selectedRegion = state._scoutingRegion || state.region;
  state._scoutingRegion = selectedRegion;

  const opponents = getAITeamsForRegion(selectedRegion).filter((team) => team.id !== state.aiTeamId);
  if (opponents.length === 0) {
    el.innerHTML = `<div class="empty-state">${t('match.noOpponents')}</div>`;
    return;
  }

  const selectedId = (state._scoutingSelected && opponents.some((t) => t.id === state._scoutingSelected))
    ? state._scoutingSelected
    : opponents[0].id;
  state._scoutingSelected = selectedId;
  const team = opponents.find((t) => t.id === selectedId);

  const regionSelectHtml = REGIONS.map((r) => `<option value="${r.id}" ${r.id === selectedRegion ? 'selected' : ''}>${r.name}</option>`).join('');

  const listHtml = opponents.map((team) => {
    const r = getScoutingReport(team.id);
    return `<button class="comp-tag-option ${team.id === selectedId ? 'comp-tag-option--active' : ''}" data-scout-team="${team.id}">${team.name} (${r.confidence}/100)</button>`;
  }).join('');

  el.innerHTML = `
    <div class="panel">
      <h3 class="panel-title">${t('scout.opposingTeams')}</h3>
      <div class="scouting-region-filter">
        <label for="scouting-region">${t('scout.regionLabel')}</label>
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
    return `<span class="champion-chip champion-chip--${tier.id}" title="${escapeAttr(masteryTierLabel(tier.id))}">${cf.champion}${cf.score ? ` <span class="champion-chip__mastery">${cf.score}</span>` : ''}</span>`;
  }).join('');

  return `
    <div class="transfer-card ${canAfford ? '' : 'transfer-card--unavailable'}">
      <div class="transfer-card__header">
        <div class="mini-avatar">${getInitials(c.name)}</div>
        <div class="transfer-card__identity">
          <div class="transfer-card__name">${c.name}${c.scoutGrade ? ` <span class="transfer-grade">${c.scoutGrade}</span>` : ''}</div>
          ${c.baseAge != null ? `<div style="font-size:11px;color:var(--color-text-muted);margin-top:1px;">${t('roster.age', { n: playerAge(c) })}</div>` : ''}
          <div class="transfer-card__meta">${c.role} &mdash; ${c.fromTeam || t('tr.freeAgent')}${c.division ? ` <span class="transfer-div">${c.division}</span>` : ''}</div>
        </div>
        <div class="transfer-card__level">${avg}</div>
      </div>
      <div class="transfer-card__stats">
        <span>${t('tr.cardLane')} <strong>${c.laning}</strong></span>
        <span>${t('tr.cardTf')} <strong>${c.teamfight}</strong></span>
        <span>${t('tr.cardMeca')} <strong>${c.mechanics}</strong></span>
        <span>${t('tr.cardShotcall')} <strong>${c.shotcalling || '?'}</strong></span>
      </div>
      <div class="transfer-card__pool champion-chip-list">${poolHtml}</div>
      <div class="transfer-card__footer">
        ${diffHtml}
        <div class="transfer-card__cost">
          <span class="resource-chip__icon">💰</span> ${cost} ${t('tr.budgetWord')}
        </div>
        <button class="btn-primary btn-small" data-sign-id="${escapeAttr(c.id)}" ${canAfford ? '' : 'disabled'}>
          ${canAfford ? t('tr.sign') : t('tr.insufficientBudget')}
        </button>
      </div>
    </div>
  `;
}

const TRANSFER_KIND_META = {
  retraite:  { label: 'Retraite',        icon: '🎖️', cls: 'tj-row--out' },
  arrivee:   { label: 'Arrivée',         icon: '🌱', cls: 'tj-row--in' },
  depart:    { label: 'Fin de contrat',  icon: '📤', cls: 'tj-row--out' },
  signature: { label: 'Signature',       icon: '✍️', cls: 'tj-row--in' }
};

// Libellé de l'équipe du joueur dans le journal (remplace l'ancien "Vous").
function playerTeamLabel() {
  return state.teamShortName || state.teamName || t('common.you');
}

// v1.15.4 — résout la région (id REGIONS) d'une entrée du journal, pour le filtre par
// région. Les entrées ne stockent qu'un libellé d'équipe (shortName IA ou libellé joueur),
// donc on le résout via AI_TEAMS.region (= REGIONS.aiRegion) ; l'entrée du joueur suit sa
// propre région (state.region).
function journalEntryRegion(e) {
  if (e.t === playerTeamLabel()) return state.region;
  const team = AI_TEAMS.find((tm) => tm.shortName === e.t);
  if (!team) return null;
  const region = REGIONS.find((r) => r.aiRegion === team.region);
  return region ? region.id : null;
}

// Journal des transferts (v1.11.0) — groupé par saison décroissante.
// v1.15.4 : filtres région + équipe (state._journalRegion/_journalTeam).
function renderTransferJournal() {
  const log = Array.isArray(state.transferLog) ? state.transferLog : [];
  if (!log.length) {
    return `<div class="panel"><p class="card__count">${t('journal.empty')}</p></div>`;
  }

  const regionFilter = state._journalRegion || 'all';
  const teamFilter = state._journalTeam || 'all';

  const teamsInRegion = Array.from(new Set(
    log.filter((e) => regionFilter === 'all' || journalEntryRegion(e) === regionFilter).map((e) => e.t)
  )).sort((a, b) => a.localeCompare(b));

  const regionOptions = `<option value="all">${t('journal.allRegions')}</option>` +
    REGIONS.map((r) => `<option value="${r.id}" ${regionFilter === r.id ? 'selected' : ''}>${r.name}</option>`).join('');
  const teamOptions = `<option value="all">${t('journal.allTeams')}</option>` +
    teamsInRegion.map((tm) => `<option value="${escapeAttr(tm)}" ${teamFilter === tm ? 'selected' : ''}>${escapeAttr(tm)}</option>`).join('');

  const filtersHtml = `
    <div class="training-form">
      <div class="training-form__group">
        <label for="journal-region-filter">${t('journal.filterRegion')}</label>
        <select id="journal-region-filter">${regionOptions}</select>
      </div>
      <div class="training-form__group">
        <label for="journal-team-filter">${t('journal.filterTeam')}</label>
        <select id="journal-team-filter">${teamOptions}</select>
      </div>
    </div>
  `;

  const filtered = log.filter((e) => {
    if (regionFilter !== 'all' && journalEntryRegion(e) !== regionFilter) return false;
    if (teamFilter !== 'all' && e.t !== teamFilter) return false;
    return true;
  });

  if (!filtered.length) {
    return `<div class="panel">
      <p class="card__count" style="margin-bottom:12px;">${t('journal.intro')}</p>
      ${filtersHtml}
      <p class="card__count">${t('journal.emptyFiltered')}</p>
    </div>`;
  }

  const mine = playerTeamLabel();
  const byYear = {};
  filtered.forEach((e) => { (byYear[e.y] = byYear[e.y] || []).push(e); });
  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a);
  const sections = years.map((y) => {
    const rows = byYear[y].map((e) => {
      const meta = TRANSFER_KIND_META[e.k] || { label: e.k, icon: '•', cls: '' };
      const kindLabel = t('transferKind.' + e.k) === 'transferKind.' + e.k ? meta.label : t('transferKind.' + e.k);
      const isMine = (e.t === 'Vous' || e.t === mine);
      const team = isMine ? mine : e.t;
      return `<div class="tj-row ${meta.cls}${isMine ? ' tj-row--mine' : ''}">
        <span class="tj-row__icon">${meta.icon}</span>
        <span class="tj-row__team">${team}</span>
        <span class="tj-row__player">${e.p} <span class="tj-row__role">${e.r}</span></span>
        <span class="tj-row__kind">${kindLabel}</span>
      </div>`;
    }).join('');
    return `<div class="tj-season"><div class="tj-season__title">${t('journal.season', { y })}</div>${rows}</div>`;
  }).join('');
  return `<div class="panel">
    <p class="card__count" style="margin-bottom:12px;">${t('journal.intro')}</p>
    ${filtersHtml}
    ${sections}
  </div>`;
}

// Écran dédié Journal des transferts.
function renderJournal() {
  const el = document.getElementById('journal-content');
  if (!el) return;
  el.innerHTML = renderTransferJournal();
  const regionSelect = document.getElementById('journal-region-filter');
  const teamSelect = document.getElementById('journal-team-filter');
  if (regionSelect) {
    regionSelect.addEventListener('change', (e) => {
      state._journalRegion = e.target.value;
      state._journalTeam = 'all'; // repli sur "toutes les équipes" au changement de région
      renderJournal();
    });
  }
  if (teamSelect) {
    teamSelect.addEventListener('change', (e) => {
      state._journalTeam = e.target.value;
      renderJournal();
    });
  }
}

function renderTransfers() {
  const el = document.getElementById('transfers-content');
  if (!el) return;

  if (state.roster.length === 0) {
    el.innerHTML = `<div class="empty-state">${t('tr.emptyRoster')}</div>`;
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
    : `<div class="empty-state">${t('tr.noMatch')}</div>`;

  el.innerHTML = `
    ${renderContractsPanel()}
    <div class="panel">
      <div class="transfer-header">
        <div>
          <p class="card__count">${t('tr.budgetAvailable')} <strong>${budget}</strong></p>
          <p class="card__count" style="font-size:12px;color:var(--color-text-muted);">${t('tr.shownCount', { n: matches.length, total: all.length })}</p>
        </div>
      </div>
      <div class="draft-role-filter">
        <button class="comp-tag-option ${!roleFilter ? 'comp-tag-option--active' : ''}" data-transfer-role="">${t('common.all')}</button>
        ${roles.map(r => `<button class="comp-tag-option ${roleFilter === r ? 'comp-tag-option--active' : ''}" data-transfer-role="${r}">${r}</button>`).join('')}
      </div>
      <div class="transfer-filters">
        <select class="transfer-select" id="transfer-division">
          <option value="">${t('tr.allDivisions')}</option>
          ${divisions.map(d => `<option value="${escapeAttr(d)}" ${divFilter === d ? 'selected' : ''}>${d}</option>`).join('')}
        </select>
        <select class="transfer-select" id="transfer-team">
          <option value="">${t('tr.allTeams')}</option>
          ${teams.map(tm => `<option value="${escapeAttr(tm)}" ${teamFilter === tm ? 'selected' : ''}>${tm}</option>`).join('')}
        </select>
        <select class="transfer-select" id="transfer-champ">
          <option value="">${t('tr.allChampions')}</option>
          ${champs.map(ch => `<option value="${escapeAttr(ch)}" ${champFilter === ch ? 'selected' : ''}>${ch}</option>`).join('')}
        </select>
        <input type="text" class="transfer-search" id="transfer-search" placeholder="${escapeAttr(t('tr.searchPlaceholder'))}" value="${escapeAttr(state._transferSearch || '')}" autocomplete="off">
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
  // v1.11.0 : gestion des contrats désactivée → on masque tout le panneau.
  if (state.settings && state.settings.playerContracts === false) {
    return `<div class="panel"><p class="card__count">${t('tr.contractsDisabled')}</p></div>`;
  }
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
    const retTooltip = escapeAttr(t('tr.retireTooltip', { name: p.name, age: p.retirementAge }));
    const retWarning = p.baseAge != null && yearsToRet <= 2
      ? `<span style="font-size:11px;color:#e05;margin-left:6px;cursor:help;" title="${retTooltip}" data-lore-tooltip="${retTooltip}">${t('tr.retireWarn', { y: retYear })}</span>`
      : '';
    const btn = (years, c) => {
      if (alreadyExtended) return '';
      const extType = getExtensionType(p, years);
      if (extType === 'blocked') {
        const rule = escapeAttr(t('tr.rule33'));
        return `<span style="font-size:11px;color:var(--color-text-muted);align-self:center;cursor:help;" title="${rule}" data-lore-tooltip="${rule}">${t('tr.extImpossible', { n: years, unit: yearUnit(years) })}</span>`;
      }
      const cost = extType === 'special'
        ? { prestige: Math.ceil(c.prestige * 1.5), budget: Math.ceil(c.budget * 1.5) }
        : c;
      const affordable = prestige >= cost.prestige && budget >= cost.budget;
      const ready = windowOpen && affordable;
      const specialStyle = extType === 'special' ? 'border-color:#e0a020;color:#e0a020;' : '';
      const label = extType === 'special' ? `+${years} ${yearUnit(years)} ⭐` : `+${years} ${yearUnit(years)}`;
      const title = !windowOpen ? t('tr.titleOffseason')
        : extType === 'special' ? t('tr.titleCareerNego')
        : (prestige < cost.prestige ? t('tr.titlePrestigeReq', { n: cost.prestige }) : (budget < cost.budget ? t('tr.titleBudgetReq', { n: cost.budget }) : t('tr.extend')));
      // Jamais `disabled` : un bouton désactivé n'émet aucun clic. On garde le
      // bouton cliquable et c'est showExtendModal qui explique le blocage.
      return `<button class="btn-small ${ready ? 'btn-primary' : 'btn-secondary'}" style="${ready ? '' : 'opacity:.6;'}${specialStyle}" data-extend-id="${escapeAttr(p.id)}" data-extend-years="${years}" title="${escapeAttr(title)}">
        ${label} <span style="opacity:.85;">(P${cost.prestige} · 💰${cost.budget})</span>
      </button>`;
    };
    const extendedBadge = alreadyExtended
      ? `<span style="font-size:12px;color:var(--color-seafoam);font-weight:600;">${t('tr.extendedThisSeason')}</span>`
      : `${btn(1, c1)}${btn(2, c2)}`;
    return `
      <div class="transfer-card" style="padding:10px;">
        <div class="transfer-card__header">
          <div class="mini-avatar">${getInitials(p.name)}</div>
          <div class="transfer-card__identity">
            <div class="transfer-card__name">${p.name} <span class="transfer-grade">${contractTierLabel(tier)}</span></div>
            <div class="transfer-card__meta">${p.role}${p.baseAge != null ? ` &mdash; ${t('roster.age', { n: age })}` : ''} &mdash; ${t('tr.level')} ${computeLevel(p)}${retWarning}</div>
          </div>
          <div class="transfer-card__level" style="color:${final ? '#e0a020' : 'inherit'};">W${p.contractUntil}</div>
        </div>
        <div style="font-size:12px;margin:6px 0;color:${final ? '#e0a020' : 'var(--color-text-muted)'};">
          ${t('tr.contractUntil', { y: p.contractUntil })}${final ? t('tr.lastYearWarn') : ''}
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">${extendedBadge}</div>
      </div>`;
  }).join('');

  const note = windowOpen
    ? `<div style="background:rgba(46,204,160,.12);border:1px solid var(--color-seafoam);border-radius:8px;padding:8px 12px;margin-bottom:4px;">
         <span style="color:var(--color-seafoam);font-weight:600;">${t('tr.mercatoOpen')}</span>
         <span style="font-size:12px;color:var(--color-text-muted);">${t('tr.mercatoOpenDesc')}</span>
       </div>`
    : `<div style="background:rgba(255,255,255,.04);border:1px solid var(--color-border, #333);border-radius:8px;padding:8px 12px;margin-bottom:4px;">
         <span style="color:#e0a020;font-weight:600;">${t('tr.mercatoClosed')}</span>
         <span style="font-size:12px;color:var(--color-text-muted);">${t('tr.mercatoClosedDesc', { prestige, budget })}</span>
       </div>`;

  return `
    <div class="panel">
      <h3 class="panel-title">${t('tr.contractsTitle')}</h3>
      ${note}
      <div class="transfer-grid" style="margin-top:10px;">${rows}</div>
    </div>`;
}

function showExtendModal(playerId, years) {
  const p = state.roster.find((x) => x.id === playerId);
  if (!p) return;
  if (!isContractWindowOpen()) {
    showToast(t('tr.toastMercatoClosed'), 'info');
    return;
  }
  if (p.contractExtendedYear === currentGameYear()) {
    showToast(t('tr.toastAlreadyExtended', { name: p.name }), 'info');
    return;
  }
  const extType = getExtensionType(p, years);
  if (extType === 'blocked') {
    showToast(t('tr.toastExtBlocked', { name: p.name, years, unit: yearUnit(years) }), 'info');
    return;
  }
  const c = getExtensionCostFinal(p, years);
  const newEnd = (p.contractUntil || currentGameYear()) + years;
  const isSpecial = extType === 'special';
  const specialBanner = isSpecial
    ? `<div style="background:rgba(224,160,32,.12);border:1px solid #e0a020;border-radius:8px;padding:8px 12px;margin-bottom:10px;">
        <span style="color:#e0a020;font-weight:600;">${t('tr.careerNegoTitle')}</span>
        <span style="font-size:12px;color:var(--color-text-muted);">${t('tr.careerNegoDesc', { name: p.name })}</span>
       </div>`
    : (p.baseAge != null && newEnd === playerRetirementYear(p)
        ? `<p style="font-size:11px;color:#e0a020;margin-bottom:8px;">${t('tr.contractToRetirement', { y: newEnd })}</p>`
        : '');
  const okPrestige = state.resources.prestige >= c.prestige;
  const okBudget = state.resources.budget >= c.budget;
  showModal(`
    <h3 class="panel-title">${isSpecial ? '⭐ ' : ''}${t('tr.extendTitle', { name: p.name })}</h3>
    <p style="margin-bottom:10px;">${t('tr.extendAsk', { name: p.name, tier: contractTierLabel(getContractTier(p)), years, unit: yearUnit(years), y: newEnd })}</p>
    <div class="transfer-card__stats" style="margin-bottom:12px;">
      <span>${t('tr.prestigeRequired')} <strong style="color:${okPrestige ? 'var(--color-seafoam)' : '#e05'};">${c.prestige}</strong> <span style="opacity:.7;">(${t('tr.you')} : ${state.resources.prestige})</span></span>
      <span>${t('tr.budgetPaid')} <strong style="color:${okBudget ? 'inherit' : '#e05'};">💰 ${c.budget}</strong> <span style="opacity:.7;">(${t('tr.you')} : ${state.resources.budget})</span></span>
    </div>
    ${specialBanner}
    <p style="font-size:12px;color:var(--color-text-muted);margin-bottom:14px;">${t('tr.prestigeNote')}</p>
    <div class="modal-content__actions">
      <button class="btn-primary" id="btn-confirm-extend" ${okPrestige && okBudget ? '' : 'disabled'}>${t('tr.signExtension')}</button>
      <button class="btn-secondary" id="btn-cancel-extend">${t('common.cancel')}</button>
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
  if (!isContractWindowOpen()) { showToast(t('tr.toastMercatoClosedShort'), 'error'); return; }
  const extType = getExtensionType(p, years);
  if (extType === 'blocked') { showToast(t('tr.toastExt33', { name: p.name }), 'error'); return; }
  const c = getExtensionCostFinal(p, years);
  if (state.resources.prestige < c.prestige) {
    showToast(t('tr.toastPrestigeInsuf', { name: p.name, n: c.prestige, have: state.resources.prestige }), 'error');
    return;
  }
  if (state.resources.budget < c.budget) {
    showToast(t('tr.toastBudgetInsuf', { n: c.budget, have: state.resources.budget }), 'error');
    return;
  }
  state.resources.budget -= c.budget; // prestige NON décrémenté (seuil de standing)
  p.contractUntil = (p.contractUntil || currentGameYear()) + years;
  p.contractExtendedYear = currentGameYear();
  saveGame();
  updateResourceBar();
  const specialLabel = extType === 'special' ? t('tr.careerNegoSuffix') : '';
  showToast(t('tr.toastExtended', { name: p.name, y: p.contractUntil, special: specialLabel, cost: c.budget }), 'success');
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
            <div class="transfer-card__meta">${p.role} &mdash; ${t('tr.avg', { n: avg })}</div>
          </div>
          <div class="transfer-card__level">${avg}</div>
        </div>
      </label>
    `;
  }).join('');

  const avg = getPlayerAvg(candidate);
  showModal(`
    <h3 class="panel-title">${t('tr.signTitle', { name: candidate.name })}</h3>
    <div class="transfer-card__stats" style="margin-bottom:12px;">
      <span>${t('tr.roleLabel')} <strong>${candidate.role}</strong></span>
      <span>${t('tr.avgLevel')} <strong>${avg}</strong></span>
      <span>${t('tr.costLabel')} <strong>💰 ${cost} ${t('tr.budgetWord')}</strong></span>
    </div>
    ${hasReplacements
      ? `<p style="margin-bottom:10px;">${t('tr.chooseRelease')}</p>
         <div class="transfer-release-list">${releaseOptions}</div>`
      : `<p style="margin-bottom:10px;color:var(--color-seafoam);">${t('tr.vacantPost', { role: candidate.role })}</p>`}
    <div class="modal-content__actions" style="margin-top:16px;">
      <button class="btn-primary" id="btn-confirm-sign">${t('tr.confirmSign')}</button>
      <button class="btn-secondary" id="btn-cancel-sign">${t('common.cancel')}</button>
    </div>
  `);

  // Pré-sélectionner le premier
  const firstRadio = document.querySelector('input[name="release-player"]');
  if (firstRadio) firstRadio.checked = true;

  document.getElementById('btn-cancel-sign').addEventListener('click', closeModal);

  document.getElementById('btn-confirm-sign').addEventListener('click', () => {
    if (hasReplacements) {
      const selected = document.querySelector('input[name="release-player"]:checked');
      if (!selected) { showToast(t('tr.toastSelectRelease'), 'error'); return; }
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
    showToast(t('tr.toastSignBudget'), 'error');
    return;
  }

  // releasePlayerId peut être null : signature sur un poste vacant (fin de contrat).
  const idx = releasePlayerId ? state.roster.findIndex(p => p.id === releasePlayerId) : -1;
  if (releasePlayerId && idx === -1) { showToast(t('tr.toastPlayerNotFound'), 'error'); return; }

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

  // Journal des transferts (v1.11.0)
  const sigYear = currentGameYear();
  if (released) logTransfer(sigYear, 'depart', playerTeamLabel(), released.name, released.role);
  logTransfer(sigYear, 'signature', playerTeamLabel(), candidate.name, candidate.role);

  saveGame();
  updateResourceBar();
  showToast(released ? t('tr.toastSigned', { name: candidate.name, released: released.name, cost }) : t('tr.toastSignedVacant', { name: candidate.name, cost }), 'success');
  renderTransfers();
}

/* ------------------------------------------------------------
   Ecran de progression
   ------------------------------------------------------------ */
// ─── Réglages du monde + onboarding (v1.11.0) ────────────────────────────────
function worldToggleRow(key, title, desc, on) {
  return `<label class="world-setting">
    <span class="world-setting__text">
      <span class="world-setting__title">${title}</span>
      <span class="world-setting__desc">${desc}</span>
    </span>
    <input type="checkbox" class="world-setting__toggle" data-setting="${key}" ${on ? 'checked' : ''}>
    <span class="world-setting__switch"></span>
  </label>`;
}

function languageSettingRow() {
  const cur = getLang();
  return `<div class="world-setting">
    <span class="world-setting__text">
      <span class="world-setting__title">${t('settings.language')}</span>
      <span class="world-setting__desc">${t('settings.languageDesc')}</span>
    </span>
    <span class="lang-switch">
      <button class="lang-switch__btn ${cur === 'fr' ? 'lang-switch__btn--active' : ''}" data-lang-set="fr">🇫🇷 ${t('settings.langFr')}</button>
      <button class="lang-switch__btn ${cur === 'en' ? 'lang-switch__btn--active' : ''}" data-lang-set="en">🇬🇧 ${t('settings.langEn')}</button>
    </span>
  </div>`;
}

// includeLang : affiche le sélecteur de langue (Progression) ou non (popup onboarding).
function worldSettingsHtml(includeLang) {
  const s = state.settings;
  const langRow = includeLang === false ? '' : languageSettingRow();
  return langRow
  + worldToggleRow('aiRotation', t('settings.aiRotation.title'), t('settings.aiRotation.desc'), s.aiRotation !== false)
  + worldToggleRow('playerContracts', t('settings.playerContracts.title'), t('settings.playerContracts.desc'), s.playerContracts !== false);
}

// Branche les toggles ; onChange optionnel rafraîchit la vue appelante.
function wireWorldSettings(container, onChange) {
  container.querySelectorAll('[data-setting]').forEach((cb) => {
    cb.addEventListener('change', () => {
      state.settings[cb.dataset.setting] = cb.checked;
      saveGame();
      if (typeof onChange === 'function') onChange();
    });
  });
  container.querySelectorAll('[data-lang-set]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.langSet;
      if (lang === getLang()) return;
      setLang(lang);
      if (typeof showToast === 'function') showToast(t('lang.changed'), 'success');
    });
  });
}

// Popup unique au 1er lancement de la 1.11.0 : explique et laisse choisir.
// v1.15.1 — onDone (optionnel) : chaîné vers maybeShowTutorialPrompt() une fois cette
// popup traitée, y compris quand elle ne s'affiche pas (déjà vue / pas encore de roster).
function maybeShowOnboarding1110(onDone) {
  if (!state.settings || state.settings.seenOnboarding1110) { if (typeof onDone === 'function') onDone(); return; }
  if (!Array.isArray(state.roster) || !state.roster.length) { if (typeof onDone === 'function') onDone(); return; }
  showModal(`
    <h2 class="panel-title" style="margin-bottom:6px;">${t('onboarding.title')}</h2>
    <p style="color:var(--color-text-muted);line-height:1.6;margin-bottom:14px;">
      ${t('onboarding.intro')}
    </p>
    <div id="onboarding-settings" class="world-settings-list">${worldSettingsHtml(false)}</div>
    <div class="modal-content__actions" style="margin-top:18px;">
      <button class="btn-primary" id="btn-onboarding-validate">${t('onboarding.validate')}</button>
    </div>
  `);
  const cont = document.getElementById('onboarding-settings');
  if (cont) wireWorldSettings(cont);
  const btn = document.getElementById('btn-onboarding-validate');
  if (btn) btn.addEventListener('click', () => {
    state.settings.seenOnboarding1110 = true;
    saveGame();
    closeModal();
    showToast(t('toast.onboardingSaved'), 'success');
    if (typeof onDone === 'function') onDone();
  });
}

/* ------------------------------------------------------------
   Visite guidée (v1.15.1)
   ------------------------------------------------------------
   Une étape par onglet principal : on affiche l'écran correspondant en fond, on
   met en évidence son bouton de navigation (voile sombre + halo, technique
   box-shadow), et une bulle explique ce qu'on y trouve. "Suivant" avance et change
   d'onglet automatiquement ; "Passer" quitte à tout moment. Proposé une seule fois
   (nouvelle partie ET sauvegarde existante via state.settings.seenTutorial),
   rejouable depuis Progression.
   ------------------------------------------------------------ */
const TUTORIAL_STEPS = [
  { view: 'home',        target: '.nav-btn[data-view="home"]',        titleKey: 'tutorial.step.home.title',        textKey: 'tutorial.step.home.text' },
  { view: 'home',        target: '.resource-bar',                     titleKey: 'tutorial.step.resources.title',   textKey: 'tutorial.step.resources.text' },
  { view: 'roster',      target: '.nav-btn[data-view="roster"]',      titleKey: 'tutorial.step.roster.title',      textKey: 'tutorial.step.roster.text' },
  { view: 'roster',      target: '.rest-panel',                       titleKey: 'tutorial.step.rest.title',        textKey: 'tutorial.step.rest.text' },
  { view: 'training',    target: '.nav-btn[data-view="training"]',    titleKey: 'tutorial.step.training.title',    textKey: 'tutorial.step.training.text' },
  { view: 'training',    target: '#scrim-objective-group',            titleKey: 'tutorial.step.trainObj.title',    textKey: 'tutorial.step.trainObj.text' },
  { view: 'calendar',    target: '.nav-btn[data-view="calendar"]',    titleKey: 'tutorial.step.calendar.title',    textKey: 'tutorial.step.calendar.text' },
  { view: 'draft',       target: '.nav-btn[data-view="draft"]',       titleKey: 'tutorial.step.draft.title',       textKey: 'tutorial.step.draft.text' },
  { view: 'champions',   target: '.nav-btn[data-view="champions"]',   titleKey: 'tutorial.step.champions.title',   textKey: 'tutorial.step.champions.text' },
  { view: 'counters',    target: '.nav-btn[data-view="counters"]',    titleKey: 'tutorial.step.counters.title',    textKey: 'tutorial.step.counters.text' },
  { view: 'match',       target: '.nav-btn[data-view="match"]',       titleKey: 'tutorial.step.match.title',       textKey: 'tutorial.step.match.text' },
  { view: 'scouting',    target: '.nav-btn[data-view="scouting"]',    titleKey: 'tutorial.step.scouting.title',    textKey: 'tutorial.step.scouting.text' },
  { view: 'transfers',   target: '.nav-btn[data-view="transfers"]',   titleKey: 'tutorial.step.transfers.title',   textKey: 'tutorial.step.transfers.text' },
  { view: 'journal',     target: '.nav-btn[data-view="journal"]',     titleKey: 'tutorial.step.journal.title',     textKey: 'tutorial.step.journal.text' },
  { view: 'sponsor',     target: '.nav-btn[data-view="sponsor"]',     titleKey: 'tutorial.step.sponsor.title',     textKey: 'tutorial.step.sponsor.text' },
  { view: 'progression', target: '.nav-btn[data-view="progression"]', titleKey: 'tutorial.step.progression.title', textKey: 'tutorial.step.progression.text' },
  { view: 'progression', target: '#panel-prog-stats',     titleKey: 'tutorial.step.progStats.title',     textKey: 'tutorial.step.progStats.text' },
  { view: 'progression', target: '#panel-prog-palmares',  titleKey: 'tutorial.step.progPalmares.title',  textKey: 'tutorial.step.progPalmares.text' },
  { view: 'progression', target: '#panel-prog-career',    titleKey: 'tutorial.step.progCareer.title',    textKey: 'tutorial.step.progCareer.text' },
  { view: 'progression', target: '#panel-prog-history',   titleKey: 'tutorial.step.progHistory.title',   textKey: 'tutorial.step.progHistory.text' },
  { view: 'progression', target: '#panel-prog-settings',  titleKey: 'tutorial.step.progSettings.title',  textKey: 'tutorial.step.progSettings.text' },
  { view: 'progression', target: '#panel-prog-localsave', titleKey: 'tutorial.step.progLocalSave.title', textKey: 'tutorial.step.progLocalSave.text' },
  { view: 'progression', target: '#panel-prog-cloudsave', titleKey: 'tutorial.step.progCloudSave.title', textKey: 'tutorial.step.progCloudSave.text' }
];

let tutorialStepIndex = 0;

function maybeShowTutorialPrompt() {
  if (!state.settings || state.settings.seenTutorial) return;
  if (!Array.isArray(state.roster) || !state.roster.length) return;
  showModal(`
    <h2 class="panel-title" style="margin-bottom:6px;">${t('tutorial.prompt.title')}</h2>
    <p style="color:var(--color-text-muted);line-height:1.6;margin-bottom:18px;">${t('tutorial.prompt.desc')}</p>
    <div class="modal-content__actions">
      <button class="btn-secondary" id="btn-tutorial-decline">${t('tutorial.prompt.decline')}</button>
      <button class="btn-primary" id="btn-tutorial-accept">${t('tutorial.prompt.accept')}</button>
    </div>
  `);
  document.getElementById('btn-tutorial-decline').addEventListener('click', () => {
    state.settings.seenTutorial = true;
    saveGame();
    closeModal();
  });
  document.getElementById('btn-tutorial-accept').addEventListener('click', () => {
    closeModal();
    startTutorial();
  });
}

function ensureTutorialOverlay() {
  let block = document.getElementById('tutorial-block');
  if (!block) {
    block = document.createElement('div');
    block.id = 'tutorial-block';
    block.className = 'tutorial-block';
    document.body.appendChild(block);
  }
  let spot = document.getElementById('tutorial-spotlight');
  if (!spot) {
    spot = document.createElement('div');
    spot.id = 'tutorial-spotlight';
    spot.className = 'tutorial-spotlight';
    document.body.appendChild(spot);
  }
  let bubble = document.getElementById('tutorial-bubble');
  if (!bubble) {
    bubble = document.createElement('div');
    bubble.id = 'tutorial-bubble';
    bubble.className = 'tutorial-bubble';
    document.body.appendChild(bubble);
  }
  return { block, spot, bubble };
}

function startTutorial() {
  tutorialStepIndex = 0;
  const { block } = ensureTutorialOverlay();
  block.classList.add('tutorial-block--visible');
  renderTutorialStep();
}

function renderTutorialStep() {
  const step = TUTORIAL_STEPS[tutorialStepIndex];
  if (!step) { endTutorial(); return; }
  showView(step.view);
  requestAnimationFrame(() => positionTutorialStep(step));
}

function positionTutorialStep(step) {
  const { spot, bubble } = ensureTutorialOverlay();
  const target = document.querySelector(step.target);
  if (!target) { advanceTutorial(); return; } // garde-fou : cible introuvable, on saute l'étape

  // v1.15.1 — fix : la cible peut être hors du viewport (ex: bas de l'écran Progression),
  // le voile étant fixe et bloquant les clics, le joueur restait alors coincé sans pouvoir
  // atteindre le bouton Suivant. On scrolle d'abord la cible au centre de l'écran, puis on
  // attend un frame pour que le navigateur applique le scroll avant de mesurer sa position.
  target.scrollIntoView({ block: 'center', behavior: 'auto' });

  requestAnimationFrame(() => {
    const rect = target.getBoundingClientRect();
    const pad = 6;
    spot.style.top = (rect.top - pad) + 'px';
    spot.style.left = (rect.left - pad) + 'px';
    spot.style.width = (rect.width + pad * 2) + 'px';
    spot.style.height = (rect.height + pad * 2) + 'px';
    spot.classList.add('tutorial-spotlight--visible');

    const isLast = tutorialStepIndex === TUTORIAL_STEPS.length - 1;
    bubble.innerHTML = `
      <p class="tutorial-bubble__step">${t('tutorial.stepCounter', { n: tutorialStepIndex + 1, total: TUTORIAL_STEPS.length })}</p>
      <p class="tutorial-bubble__title">${t(step.titleKey)}</p>
      <p class="tutorial-bubble__text">${t(step.textKey)}</p>
      <div class="tutorial-bubble__actions">
        <button class="tutorial-bubble__skip" id="btn-tutorial-skip">${t('tutorial.skip')}</button>
        <button class="btn-primary" id="btn-tutorial-next">${isLast ? t('tutorial.finish') : t('tutorial.next')}</button>
      </div>
    `;

    requestAnimationFrame(() => {
      const bw = bubble.offsetWidth;
      const bh = bubble.offsetHeight;
      let top = rect.bottom + 16;
      if (top + bh > window.innerHeight - 12) top = rect.top - bh - 16;
      top = Math.max(12, Math.min(top, window.innerHeight - bh - 12)); // toujours dans le viewport, même si la cible est plus grande que l'écran
      let left = Math.max(12, Math.min(rect.left, window.innerWidth - bw - 12));
      bubble.style.top = top + 'px';
      bubble.style.left = left + 'px';
      bubble.classList.add('tutorial-bubble--visible');
    });

    document.getElementById('btn-tutorial-next').addEventListener('click', advanceTutorial);
    document.getElementById('btn-tutorial-skip').addEventListener('click', endTutorial);
  });
}

function advanceTutorial() {
  tutorialStepIndex++;
  const { bubble } = ensureTutorialOverlay();
  bubble.classList.remove('tutorial-bubble--visible');
  renderTutorialStep();
}

function endTutorial() {
  state.settings.seenTutorial = true;
  saveGame();
  const block = document.getElementById('tutorial-block');
  const spot = document.getElementById('tutorial-spotlight');
  const bubble = document.getElementById('tutorial-bubble');
  if (block) block.classList.remove('tutorial-block--visible');
  if (spot) spot.classList.remove('tutorial-spotlight--visible');
  if (bubble) bubble.classList.remove('tutorial-bubble--visible');
}

// Popup de bienvenue + choix de langue au tout premier lancement (v1.13.0).
// Bilingue par nature : affichée avant que le joueur ait choisi sa langue.
function showWelcomeLanguageModal(onDone) {
  showModal(`
    <div class="welcome-modal">
      <img src="img/logo.png" alt="LOL Esport Manager" class="welcome-modal__logo" />
      <h2 class="welcome-modal__title">Bienvenue ! · Welcome!</h2>
      <p class="welcome-modal__text">
        <strong>FR —</strong> Prenez les rênes d'une équipe d'esport League of Legends : recrutez, entraînez,
        draftez et menez vos joueurs des splits régionaux jusqu'aux Worlds.
      </p>
      <p class="welcome-modal__text">
        <strong>EN —</strong> Take charge of a League of Legends esports team: recruit, train, draft and lead
        your players from regional splits all the way to Worlds.
      </p>
      <p class="welcome-modal__choose">Choisissez votre langue · Choose your language</p>
      <div class="welcome-modal__flags">
        <button class="welcome-flag" data-lang="fr">
          <span class="welcome-flag__emoji">🇫🇷</span>
          <span class="welcome-flag__label">Français</span>
        </button>
        <button class="welcome-flag" data-lang="en">
          <span class="welcome-flag__emoji">🇬🇧</span>
          <span class="welcome-flag__label">English</span>
        </button>
      </div>
      <p class="welcome-modal__note">Modifiable à tout moment dans Progression · Changeable anytime in Progression</p>
    </div>
  `);
  document.querySelectorAll('.welcome-flag').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      state.settings.lang = lang;
      state.settings.langChosen = true;
      document.documentElement.lang = lang;
      applyStaticI18n();
      saveGame();
      closeModal();
      if (typeof onDone === 'function') onDone();
    });
  });
}

function renderProgression() {
  const p = state.progress;
  const winRate = p.matchesPlayed > 0 ? Math.round((p.wins / p.matchesPlayed) * 100) : 0;

  document.getElementById('progression-stats').innerHTML = `
    <div class="stat-card"><div class="stat-card__value">${p.matchesPlayed}</div><div class="stat-card__label">${t('prog.matchesPlayed')}</div></div>
    <div class="stat-card"><div class="stat-card__value">${p.wins}</div><div class="stat-card__label">${t('prog.wins')}</div></div>
    <div class="stat-card"><div class="stat-card__value">${winRate}%</div><div class="stat-card__label">${t('prog.winRate')}</div></div>
    <div class="stat-card"><div class="stat-card__value">${p.bestWinStreak}</div><div class="stat-card__label">${t('prog.bestStreak')}</div></div>
  `;

  const pal = ensurePalmares();
  const palmaresEl = document.getElementById('progression-palmares');
  if (palmaresEl) {
    palmaresEl.innerHTML = `
      <div class="stat-card"><div class="stat-card__value">${pal.regionalTitles}</div><div class="stat-card__label">${t('prog.regionalTitles')}</div></div>
      <div class="stat-card"><div class="stat-card__value">${pal.msi.qualified}</div><div class="stat-card__label">${t('prog.msiQualifs')}</div></div>
      <div class="stat-card"><div class="stat-card__value">${pal.msi.titles}</div><div class="stat-card__label">${t('prog.msiTitles')}</div></div>
      <div class="stat-card"><div class="stat-card__value stat-card__value--text">${intlBestResultLabel(pal.msi.bestPlacement)}</div><div class="stat-card__label">${t('prog.msiBest')}</div></div>
      <div class="stat-card"><div class="stat-card__value">${pal.worlds.qualified}</div><div class="stat-card__label">${t('prog.worldsQualifs')}</div></div>
      <div class="stat-card"><div class="stat-card__value">${pal.worlds.titles}</div><div class="stat-card__label">${t('prog.worldsTitles')}</div></div>
      <div class="stat-card"><div class="stat-card__value stat-card__value--text">${intlBestResultLabel(pal.worlds.bestPlacement)}</div><div class="stat-card__label">${t('prog.worldsBest')}</div></div>
    `;
  }

  const historyEl = document.getElementById('progression-history');
  historyEl.innerHTML = state.matchHistory.slice(0, 10).map((m) => {
    const cls = m.result === 'win' ? 'result-tag--win' : 'result-tag--loss';
    const label = m.result === 'win' ? t('log.win') : t('log.loss');
    const date = new Date(m.date).toLocaleDateString(getLang() === 'en' ? 'en-US' : 'fr-FR');
    return `
      <tr>
        <td>${date}</td>
        <td>${m.competition || 'Scrim'}</td>
        <td>${m.opponent}</td>
        <td>${m.scoreHome} - ${m.scoreAway}</td>
        <td><span class="result-tag ${cls}">${label}</span></td>
      </tr>
    `;
  }).join('') || `<tr><td colspan="5" class="card__count">${t('prog.noMatch')}</td></tr>`;

  const settingsEl = document.getElementById('progression-settings');
  if (settingsEl) {
    settingsEl.innerHTML = worldSettingsHtml() + `
      <div class="world-setting">
        <span class="world-setting__text">
          <span class="world-setting__title">${t('settings.tutorial.title')}</span>
          <span class="world-setting__desc">${t('settings.tutorial.desc')}</span>
        </span>
        <button class="btn-secondary" id="btn-replay-tutorial">${t('settings.tutorial.replay')}</button>
      </div>
    `;
    wireWorldSettings(settingsEl, () => renderProgression());
    const replayBtn = document.getElementById('btn-replay-tutorial');
    if (replayBtn) replayBtn.addEventListener('click', () => startTutorial());
  }

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
    }).join('') || `<p class="card__count">${t('prog.noEvolution')}</p>`;
  }
}

/* ------------------------------------------------------------
   Initialisation
   ------------------------------------------------------------ */
// v1.14.2 — Bandeau discret « nouvelle version disponible ». S'appuie sur
// l'événement natif `controllerchange` du Service Worker : il se déclenche
// dès qu'un nouveau sw.js a fini de s'installer et pris le contrôle de la
// page (le navigateur compare sw.js au fichier serveur automatiquement,
// aucune vérification manuelle à coder). Hors-ligne : cette vérification
// échoue silencieusement, aucun bandeau ne s'affiche, le jeu se lance
// normalement sur la version déjà en cache.
function initUpdateBanner() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    // Ignore la toute première activation (nouveau visiteur, pas de vraie mise
    // à jour) : on ne signale que si un contrôleur existait déjà au chargement.
    if (!hadServiceWorkerControllerAtLoad) return;
    showUpdateBanner();
  });
}

function showUpdateBanner() {
  const banner = document.getElementById('update-banner');
  if (!banner || banner.classList.contains('update-banner--visible')) return;
  banner.innerHTML = `
    <span class="update-banner__text">🔄 ${t('update.available')}</span>
    <button class="update-banner__btn" id="btn-update-reload">${t('update.reload')}</button>
    <button class="update-banner__dismiss" id="btn-update-dismiss" aria-label="${t('common.close')}">&times;</button>
  `;
  requestAnimationFrame(() => banner.classList.add('update-banner--visible'));
  document.getElementById('btn-update-reload').addEventListener('click', () => window.location.reload());
  document.getElementById('btn-update-dismiss').addEventListener('click', () => {
    banner.classList.remove('update-banner--visible');
  });
}

// v1.15.0 — bandeau d'appel à l'action pour la fenêtre de renouvellement sponsor.
// Réutilise le même style visuel que le bandeau de mise à jour (v1.14.2).
function showSponsorBanner() {
  const banner = document.getElementById('sponsor-banner');
  if (!banner) return;
  banner.innerHTML = `
    <span class="update-banner__text">📋 ${t('sponsor.toast.new')}</span>
    <button class="update-banner__btn" id="btn-sponsor-goto">${t('sponsor.banner.view')}</button>
    <button class="update-banner__dismiss" id="btn-sponsor-dismiss" aria-label="${t('common.close')}">&times;</button>
  `;
  requestAnimationFrame(() => banner.classList.add('update-banner--visible'));
  document.getElementById('btn-sponsor-goto').addEventListener('click', () => {
    banner.classList.remove('update-banner--visible');
    showView('sponsor');
  });
  document.getElementById('btn-sponsor-dismiss').addEventListener('click', () => {
    banner.classList.remove('update-banner--visible');
  });
}

function hideSponsorBanner() {
  const banner = document.getElementById('sponsor-banner');
  if (banner) banner.classList.remove('update-banner--visible');
}

/* ------------------------------------------------------------
   Écran Sponsor (v1.15.0)
   ------------------------------------------------------------ */
function sponsorTierLabel(tier) { return t('sponsor.tier.' + tier); }
function sponsorTypeLabel(type) { return t('sponsor.type.' + type); }

const SPONSOR_BREACH_KEYS = {
  MISSED_PLAYOFFS: 'missedPlayoffs',
  MISSED_SEMIFINAL: 'missedSemifinal',
  NO_INTL_QUAL: 'noIntlQual'
};
function sponsorBreachLabel(breach) {
  return t('sponsor.detail.breach.' + (SPONSOR_BREACH_KEYS[breach] || breach));
}

// Affiche le poids d'un sponsor résultat en pourcentage concret (plus lisible qu'un
// libellé qualitatif type "Modéré"), avec une info-bulle expliquant le mécanisme.
function sponsorPayoutStatHtml(label, weight) {
  const pct = Math.round(weight * 100);
  const info = t('sponsor.detail.payoutInfo', { pct });
  return `
    <div class="sponsor-detail__stat">
      <p class="sponsor-detail__stat-label">${label} <span class="sponsor-info-icon" data-tip="${escapeAttr(info)}" tabindex="0">ⓘ</span></p>
      <p class="sponsor-detail__stat-value">+${pct}%</p>
    </div>
  `;
}

function objectiveLabel(code) { return t('sponsor.obj.' + code); }
function objectiveGroupLabel(item) {
  return Array.isArray(item) ? item.map(objectiveLabel).join(' ' + t('sponsor.obj.or') + ' ') : objectiveLabel(item);
}

// Suivi live des objectifs du sponsor en cours, façon todo-list — coché dès que
// l'objectif est atteint sur l'année en cours (state.sponsorYearRecap), sans attendre
// la fenêtre de fin d'année.
function sponsorObjectiveChecklistHtml(contract) {
  const recap = state.sponsorYearRecap || createEmptySponsorYearRecap();
  const rows = contract.objectives.map((item) => {
    const met = Array.isArray(item) ? item.some((c) => checkSponsorObjective(c, recap)) : checkSponsorObjective(item, recap);
    return `
      <li class="sponsor-objective-row ${met ? 'sponsor-objective-row--met' : 'sponsor-objective-row--unmet'}">
        <span class="sponsor-objective-row__icon">${met ? '✓' : '✗'}</span>
        <span>${objectiveGroupLabel(item)}</span>
      </li>
    `;
  }).join('');
  return `
    <div class="sponsor-current__objectives">
      <p class="sponsor-current__objectives-title">${t('sponsor.current.objectivesTitle')}</p>
      <ul class="sponsor-objective-list">${rows}</ul>
    </div>
  `;
}

function renderSponsorView() {
  const el = document.getElementById('sponsor-content');
  if (!el) return;
  let html = renderSponsorCurrentBlock();
  if (state.sponsor.decisionPending && Array.isArray(state.sponsor.offers)) {
    html += renderSponsorOfferMatrix();
  }
  html += renderSponsorJournal();
  el.innerHTML = html;
  wireSponsorViewEvents();
}

function renderSponsorCurrentBlock() {
  const current = state.sponsor.current;
  if (!current) {
    return `<div class="panel"><div class="empty-state">${t('sponsor.empty')}</div></div>`;
  }
  const contract = getSponsorContract(current.contractId);
  const brand = contract ? contract.brand : current.contractId;
  const canRenew = state.sponsor.decisionPending;
  const nextYear = state.sponsor.pendingNextSeason ? state.sponsor.pendingNextSeason.year : '';
  return `
    <div class="panel sponsor-current">
      <p class="sponsor-current__label">${t('sponsor.current.label')}</p>
      <div class="sponsor-current__row">
        <div class="sponsor-current__identity">
          <p class="sponsor-current__brand">${brand}</p>
          <p class="sponsor-current__meta">
            <span class="sponsor-tier-badge sponsor-tier-badge--${current.tier}">${sponsorTierLabel(current.tier)}</span>
            ${sponsorTypeLabel(current.type)} &middot; ${t('sponsor.current.signedYear', { year: current.signedYear })}
          </p>
        </div>
        ${canRenew ? `<button class="btn-primary" id="btn-sponsor-renew">${t('sponsor.current.renewBtn', { year: nextYear })}</button>` : ''}
      </div>
      ${contract && contract.type === 'signature' ? sponsorObjectiveChecklistHtml(contract) : ''}
    </div>
  `;
}

function sortSponsorByTier(list) {
  return list.slice().sort((a, b) => SPONSOR_TIER_ORDER.indexOf(a.tier) - SPONSOR_TIER_ORDER.indexOf(b.tier));
}

function renderSponsorCard(contract) {
  const unlocked = isSponsorTierUnlocked(contract.tier);
  const payoutText = contract.type === 'signature'
    ? t('sponsor.card.signingBonus', { amount: contract.signingBonus })
    : t('sponsor.card.resultPayout');
  return `
    <div class="sponsor-card ${unlocked ? '' : 'sponsor-card--locked'}" ${unlocked ? `data-sponsor-offer="${contract.id}"` : ''}>
      <span class="sponsor-tier-badge sponsor-tier-badge--${contract.tier}">${sponsorTierLabel(contract.tier)}</span>
      <p class="sponsor-card__brand">${contract.brand}</p>
      ${unlocked
        ? `<p class="sponsor-card__payout">${payoutText}</p>`
        : `<p class="sponsor-card__locked">${t('sponsor.locked', { prestige: SPONSOR_TIERS[contract.tier].prestigeReq })}</p>`}
    </div>
  `;
}

function renderSponsorOfferMatrix() {
  const offers = state.sponsor.offers || [];
  const byType = { signature: [], result: [] };
  offers.forEach((id) => {
    const c = getSponsorContract(id);
    if (c) byType[c.type].push(c);
  });
  const renderRow = (list, label) => `
    <p class="sponsor-matrix__label">${label}</p>
    <div class="grid grid--cols-3 sponsor-matrix">
      ${sortSponsorByTier(list).map(renderSponsorCard).join('')}
    </div>
  `;
  return `
    <div class="panel">
      <h3 class="panel-title">${t('sponsor.matrix.title')}</h3>
      ${renderRow(byType.signature, t('sponsor.matrix.signatureLabel'))}
      ${renderRow(byType.result, t('sponsor.matrix.resultLabel'))}
    </div>
  `;
}

function sponsorLogLine(e) {
  return t('sponsorLog.' + e.k, { brand: e.brand, y: e.y, amount: e.amount, paid: e.paid, prestigeLost: e.prestigeLost });
}

function renderSponsorJournal() {
  const log = state.sponsorLog || [];
  if (!log.length) return '';
  const rows = log.slice(0, 12).map((e) => `<li>${sponsorLogLine(e)}</li>`).join('');
  return `
    <div class="panel">
      <h3 class="panel-title">${t('sponsor.journal.title')}</h3>
      <ul class="sponsor-journal">${rows}</ul>
    </div>
  `;
}

function wireSponsorViewEvents() {
  const renewBtn = document.getElementById('btn-sponsor-renew');
  if (renewBtn) renewBtn.addEventListener('click', () => showSponsorDetail(state.sponsor.current.contractId, true));
  document.querySelectorAll('[data-sponsor-offer]').forEach((cardEl) => {
    cardEl.addEventListener('click', () => showSponsorDetail(cardEl.dataset.sponsorOffer, false));
  });
}

function showSponsorDetail(contractId, isRenewal) {
  const contract = getSponsorContract(contractId);
  if (!contract) return;
  const amount = isRenewal && state.sponsor.pendingRenewalAmount != null ? state.sponsor.pendingRenewalAmount : contract.signingBonus;
  const outcome = isRenewal ? state.sponsor.pendingRenewalOutcome : null;

  let body = '';
  if (contract.type === 'signature') {
    body += `
      <div class="sponsor-detail__stats">
        <div class="sponsor-detail__stat">
          <p class="sponsor-detail__stat-label">${t('sponsor.detail.bonus')}</p>
          <p class="sponsor-detail__stat-value">${amount}</p>
        </div>
      </div>
      ${outcome === 'partial' ? `<p class="sponsor-detail__warning">${t('sponsor.detail.warningPartial')}</p>` : ''}
      <p class="sponsor-detail__section-title">${t('sponsor.detail.objectives')}</p>
      <ul class="sponsor-detail__objectives">
        ${contract.objectives.map((o) => `<li>${objectiveGroupLabel(o)}</li>`).join('')}
      </ul>
      <p class="sponsor-detail__section-title">${t('sponsor.detail.clauses')}</p>
      <div class="sponsor-clause sponsor-clause--success">
        <span>${t('sponsor.clause.success')}</span><span>${t('sponsor.clause.successValue', { pct: Math.round(contract.successPct * 100) })}</span>
      </div>
      <div class="sponsor-clause sponsor-clause--warning">
        <span>${t('sponsor.clause.partial')}</span><span>${t('sponsor.clause.partialValue', { pct: Math.round(contract.failurePct * 100) })}</span>
      </div>
      <div class="sponsor-clause sponsor-clause--danger">
        <span>${t('sponsor.clause.failure')}</span><span>${t('sponsor.clause.failureValue')}</span>
      </div>
    `;
  } else {
    body += `
      <p class="sponsor-detail__section-title">${t('sponsor.detail.payout')}</p>
      <div class="sponsor-detail__stats">
        ${sponsorPayoutStatHtml(t('sponsor.detail.domesticWeight'), contract.domesticWeight)}
        ${sponsorPayoutStatHtml(t('sponsor.detail.intlWeight'), contract.intlWeight)}
      </div>
      ${contract.breach ? `<p class="sponsor-detail__warning">${sponsorBreachLabel(contract.breach)}</p>` : ''}
    `;
  }

  showModal(`
    <div class="sponsor-detail">
      <div class="sponsor-detail__header">
        <p class="sponsor-detail__brand">${contract.brand}</p>
        <span class="sponsor-tier-badge sponsor-tier-badge--${contract.tier}">${sponsorTierLabel(contract.tier)}</span>
        <span class="sponsor-detail__type">${sponsorTypeLabel(contract.type)}</span>
      </div>
      ${body}
      <div class="modal-content__actions" style="margin-top:16px;">
        <button class="btn-secondary" id="btn-sponsor-back">${t('sponsor.btn.back')}</button>
        <button class="btn-primary" id="btn-sponsor-commit">${isRenewal ? t('sponsor.btn.renew') : t('sponsor.btn.commit')}</button>
      </div>
    </div>
  `);
  document.getElementById('btn-sponsor-back').addEventListener('click', () => closeModal());
  document.getElementById('btn-sponsor-commit').addEventListener('click', () => showSponsorConfirm(contract, isRenewal));
}

function showSponsorConfirm(contract, isRenewal) {
  showModal(`
    <div class="sponsor-confirm">
      <p>${t('sponsor.confirm.text', { brand: contract.brand })}</p>
      <div class="modal-content__actions" style="margin-top:16px;">
        <button class="btn-secondary" id="btn-sponsor-confirm-back">${t('sponsor.confirm.back')}</button>
        <button class="btn-primary" id="btn-sponsor-confirm-commit">${t('sponsor.confirm.confirm')}</button>
      </div>
    </div>
  `);
  document.getElementById('btn-sponsor-confirm-back').addEventListener('click', () => showSponsorDetail(contract.id, isRenewal));
  document.getElementById('btn-sponsor-confirm-commit').addEventListener('click', () => {
    if (isRenewal) renewCurrentSponsor();
    else signSponsorContract(contract.id);
  });
}

function initGame() {
  state = loadGame();
  applyStaticI18n();
  updateResourceBar();
  setupNavigation();
  initUpdateBanner();
  if (state.sponsor && state.sponsor.decisionPending) showSponsorBanner(); // décision sponsor laissée en attente lors de la session précédente
  if (!state.settings.langChosen) {
    showWelcomeLanguageModal(continueInit);
  } else {
    continueInit();
  }
}

function continueInit() {
  if (!state.region) {
    showRegionSelection();
  } else {
    showView('home');
    maybeShowOnboarding1110(maybeShowTutorialPrompt);
  }
}

function setupNavigation() {
  wireRewardTooltip();
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
        resetBtn.textContent = t('prog.resetGame');
      } else {
        confirmReset = true;
        resetBtn.textContent = t('reset.confirm');
        setTimeout(() => {
          confirmReset = false;
          resetBtn.textContent = t('prog.resetGame');
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

// ---------- Tooltip récompenses (survol chip budget / prestige) ----------

function buildRewardTooltipHtml(resource) {
  const cls   = resource === 'budget' ? 'rt-budget' : 'rt-prestige';
  const icon  = resource === 'budget' ? '💰 Budget' : '⭐ Prestige';
  const sp = (p) => '+' + getPlacementRewards(p)[resource];
  const intl = (ev, p) => '+' + getInternationalRewards(ev, p)[resource];

  const ROWS = [
    { label: '1er',     s: sp(1), m: intl('msi',1), w: intl('worlds',1) },
    { label: '2e',      s: sp(2), m: intl('msi',2), w: intl('worlds',2) },
    { label: '3e–4e',   s: sp(3), m: intl('msi',3), w: intl('worlds',3) },
    { label: '5e–6e',   s: sp(5), m: intl('msi',5), w: intl('worlds',5) },
    { label: '7e–8e',   s: sp(7), m: intl('msi',7), w: intl('worlds',7) },
    { label: '9e–10e',  s: sp(9), m: '—',            w: '—' },
    { label: 'Groupes', s: '—',   m: intl('msi',9), w: intl('worlds',9) },
  ];

  const trs = ROWS.map(r =>
    `<tr><td class="rt-pl">${r.label}</td>` +
    `<td class="${cls}">${r.s}</td>` +
    `<td class="${cls}">${r.m}</td>` +
    `<td class="${cls}">${r.w}</td></tr>`
  ).join('');

  return `<div class="rt-title">Gains ${icon}</div>
<table class="rt-table">
<thead><tr><th></th><th>Split</th><th>MSI</th><th>Worlds</th></tr></thead>
<tbody>${trs}</tbody>
</table>`;
}

function wireRewardTooltip() {
  const tooltip = document.getElementById('rewards-tooltip');
  if (!tooltip) return;

  [['chip-budget','budget'], ['chip-prestige','prestige']].forEach(([chipId, resource]) => {
    const chip = document.getElementById(chipId);
    if (!chip) return;
    chip.style.cursor = 'help';
    chip.addEventListener('mouseenter', () => {
      tooltip.innerHTML = buildRewardTooltipHtml(resource);
      tooltip.classList.remove('rt-hidden');
      requestAnimationFrame(() => {
        const rect = chip.getBoundingClientRect();
        const tw = tooltip.offsetWidth;
        let left = rect.left + rect.width / 2 - tw / 2;
        left = Math.max(8, Math.min(left, window.innerWidth - tw - 8));
        tooltip.style.left = left + 'px';
        tooltip.style.top = (rect.bottom + 8) + 'px';
        const arrowLeft = (rect.left + rect.width / 2) - left;
        tooltip.style.setProperty('--rt-arrow-left', arrowLeft + 'px');
      });
    });
    chip.addEventListener('mouseleave', () => {
      tooltip.classList.add('rt-hidden');
    });
  });
}

// Délégation globale : clic sur tout élément [data-lore-tooltip] → showToast (mobile + Mac)
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-lore-tooltip]');
  if (el) showToast(el.dataset.loreTooltip, 'info');
});
