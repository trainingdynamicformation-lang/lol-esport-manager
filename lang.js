// lang.js — Internationalisation FR/EN (v1.13.0)
// Chargé AVANT game.js. Expose I18N, t(), getLang(), setLang(), applyStaticI18n().
//
// Architecture :
//   - HTML statique : attributs data-i18n (textContent), data-i18n-html (innerHTML),
//     data-i18n-placeholder (placeholder). Traduits par applyStaticI18n().
//   - JS dynamique : appels t('clé', { var: valeur }) dans game.js.
//   - La langue est lue depuis state.settings.lang ('fr' par défaut).

const I18N = {
  fr: {
    // -- Navigation --
    'nav.home': 'Accueil',
    'nav.roster': 'Roster',
    'nav.training': 'Entraînement',
    'nav.calendar': 'Calendrier',
    'nav.draft': 'Draft',
    'nav.champions': 'Champions',
    'nav.counters': 'Counters',
    'nav.match': 'Match',
    'nav.scouting': 'Scouting',
    'nav.transfers': 'Transferts',
    'nav.journal': 'Journal',
    'nav.progression': 'Progression',

    // -- Barre de ressources --
    'res.coaching': 'Points coaching',
    'res.budget': 'Budget',
    'res.prestige': 'Prestige',

    // -- Accueil --
    'home.hero': 'Préparez vos joueurs, draftez vos compositions et menez votre équipe vers les Worlds.',
    'home.team': 'Équipe',
    'home.nextMatch': 'Prochain match',
    'home.tbd': 'À définir',
    'home.recentResults': 'Derniers résultats',
    'home.noMatches': 'Aucun match joué pour le moment.',

    // -- Titres de vues --
    'view.roster': 'Roster',
    'view.training': 'Entraînement & scrims',
    'view.calendar': 'Calendrier de la saison',
    'view.draft': 'Draft',
    'view.champions': 'Champions',
    'view.counters': 'Counters',
    'view.transfers': 'Marché des transferts',
    'view.journal': 'Journal des transferts',
    'view.scouting': 'Scouting',
    'view.progression': 'Progression',

    // -- États vides --
    'empty.roster': 'Aucun joueur dans le roster pour le moment.',
    'empty.training': "Aucune session d'entraînement disponible pour le moment.",
    'empty.calendar': "La saison n'a pas encore commencé.",
    'empty.draft': 'Aucune draft en cours.',
    'empty.champions': 'Chargement des champions...',
    'empty.counters': 'Recherchez un champion pour voir ses matchups.',
    'empty.match': 'Aucun match disponible pour le moment.',
    'empty.transfers': 'Chargement du marché...',
    'empty.journal': 'Aucun mouvement enregistré pour le moment.',
    'empty.scouting': 'Aucun rapport de scouting disponible pour le moment.',

    // -- Recherche / placeholders --
    'ph.searchChampion': 'Rechercher un champion...',
    'ph.searchCounter': 'Rechercher un champion (counter ou cible)...',
    'counters.allRoles': 'Tous les rôles',
    'counters.allConfidence': 'Toute confiance',

    // -- Match --
    'match.setupTitle': 'Préparer un match',
    'match.yourTeam': 'Votre équipe',
    'match.opponent': 'Adversaire',
    'match.dragons': 'Dragons',
    'match.grubs': 'Void Grubs',
    'match.dragonSoul': 'Âme du Dragon',
    'match.baronBuff': 'Buff Baron actif',
    'match.elderBuff': 'Buff Elder actif',
    'match.pause': 'Pause',

    // -- Progression --
    'prog.globalStats': 'Statistiques globales',
    'prog.palmares': 'Palmarès',
    'prog.playerEvolution': 'Évolution des joueurs',
    'prog.noEvolution': 'Aucune évolution pour le moment.',
    'prog.matchHistory': 'Historique des matchs',
    'prog.date': 'Date',
    'prog.competition': 'Compétition',
    'prog.opponent': 'Adversaire',
    'prog.score': 'Score',
    'prog.result': 'Résultat',
    'prog.noMatch': 'Aucun match joué',
    'prog.worldSettings': 'Réglages du monde',
    'prog.localSave': 'Sauvegarde locale',
    'prog.exportSave': 'Exporter ma sauvegarde',
    'prog.importSave': 'Importer une sauvegarde',
    'prog.resetGame': 'Réinitialiser la partie',
    'prog.cloudSave': 'Sauvegarde cloud',
    'prog.optional': '(optionnel)',
    'prog.cloudIntro': 'Synchronisez votre progression sur tous vos appareils via GitHub Gist. Si non configuré, le jeu fonctionne normalement en local.',
    'prog.gistId': 'ID du Gist',
    'prog.gistToken': 'Token GitHub',
    'prog.saveConfig': 'Enregistrer la configuration',
    'prog.cloudExport': 'Envoyer vers le cloud',
    'prog.cloudImport': 'Charger depuis le cloud',

    // -- Réglage de langue --
    'settings.language': 'Langue',
    'settings.languageDesc': "Choisissez la langue de l'interface du jeu.",
    'settings.langFr': 'Français',
    'settings.langEn': 'English',
    'settings.aiRotation.title': 'Rotation des effectifs IA',
    'settings.aiRotation.desc': 'Les joueurs IA partent à la retraite et sont remplacés par de jeunes talents du niveau de leur équipe. Désactivé : les rosters adverses restent figés.',
    'settings.playerContracts.title': 'Âge & contrats de mon équipe',
    'settings.playerContracts.desc': "Vos joueurs vieillissent et leurs contrats expirent (prolongations à gérer). Désactivé : ils restent dans l'équipe indéfiniment, sans gestion de contrat.",

    // -- Footer --
    'footer.tagline': "Jeu de gestion d'équipe esport League of Legends",
    'footer.changelog': 'Changelog',
    'footer.copyright': '© 2026 redbaron1308 — Tous droits réservés. Concept et design protégés par la propriété intellectuelle.',
    'footer.localStorage': 'Les données de progression sont stockées localement dans votre navigateur (localStorage) et ne sont jamais transmises à des tiers.',
    'footer.disclaimer': "LOL Esport Manager est un projet indépendant non affilié à Riot Games. League of Legends est une marque déposée de Riot Games, Inc. Ce jeu est créé à titre de fan project à but non commercial.",

    // -- Roster --
    'roster.restTitle': "Repos de l'équipe",
    'roster.avgFatigue': 'Fatigue moyenne actuelle : {n}/100',
    'roster.restBtn': '{label} (-{red} fatigue, {cost} pts coaching)',
    'roster.age': '{n} ans',
    'roster.contract': '📋 Contrat : Worlds {y}',
    'roster.lastYear': ' — dernière année',
    'roster.championPool': 'Champion pool',
    'roster.evolTitle': 'Évolution du dernier split',
    'rest.short': 'Courte (1 jour)',
    'rest.medium': 'Moyenne (2 jours)',
    'rest.long': 'Longue (3 jours)',
    'stat.form': 'Forme',
    'stat.fatigue': 'Fatigue',
    'stat.mental': 'Mental',
    'stat.shotcalling': 'Shotcalling',
    'stat.laning': 'Laning',
    'stat.teamfight': 'Teamfight',
    'stat.mechanics': 'Mécaniques',
    'trait.igl': 'IGL',
    'trait.mechanical': 'Mécanique',
    'trait.leader': 'Leader',
    'trait.veteran': 'Vétéran',
    'trait.rookie': 'Rookie',
    'trait.tiltable': 'Tiltable',
    'trait.clutch': 'Clutch',
    'trait.consistant': 'Consistant',
    'toast.restNoCoaching': 'Pas assez de points de coaching pour ce repos.',
    'toast.restDone': "Repos ({label}) effectué : fatigue de l'équipe réduite.",

    // -- Commun --
    'common.all': 'Tous',
    'common.back': '← Retour',
    'common.noResult': 'Aucun résultat.',

    // -- Champions --
    'champ.dataUnavailable': 'Données des champions indisponibles.',
    'champ.noMatch': 'Aucun champion ne correspond.',
    'champ.champion': 'champion',
    'champ.champions': 'champions',
    'champ.difficulty': 'Difficulté',
    'champ.objectives': 'Objectifs',
    'champ.style': 'Style',
    'champ.synergies': 'Synergies',
    'champ.strongVs': 'Fort contre les profils',
    'champ.vsTitle': '{name} contre ({n})',
    'champ.counteredBy': 'Contré par ({n})',
    'champ.noCounterData': 'Aucune donnée de counter.',
    'champ.commonTags': 'Tags communs : ',

    // -- Counters --
    'counters.dataUnavailable': 'Données de counter indisponibles.',
    'counters.vs': 'contre',
    'counters.tags': 'Tags : ',
    'counters.counteredTitle': 'Champions contrés par « {q} »',
    'counters.counterTitle': 'Champions qui contrent « {q} »',

    // -- Toast langue --
    'lang.changed': 'Langue mise à jour.'
  },

  en: {
    // -- Navigation --
    'nav.home': 'Home',
    'nav.roster': 'Roster',
    'nav.training': 'Training',
    'nav.calendar': 'Calendar',
    'nav.draft': 'Draft',
    'nav.champions': 'Champions',
    'nav.counters': 'Counters',
    'nav.match': 'Match',
    'nav.scouting': 'Scouting',
    'nav.transfers': 'Transfers',
    'nav.journal': 'Journal',
    'nav.progression': 'Progression',

    // -- Resource bar --
    'res.coaching': 'Coaching points',
    'res.budget': 'Budget',
    'res.prestige': 'Prestige',

    // -- Home --
    'home.hero': 'Train your players, draft your compositions and lead your team to Worlds.',
    'home.team': 'Team',
    'home.nextMatch': 'Next match',
    'home.tbd': 'TBD',
    'home.recentResults': 'Recent results',
    'home.noMatches': 'No matches played yet.',

    // -- View titles --
    'view.roster': 'Roster',
    'view.training': 'Training & scrims',
    'view.calendar': 'Season calendar',
    'view.draft': 'Draft',
    'view.champions': 'Champions',
    'view.counters': 'Counters',
    'view.transfers': 'Transfer market',
    'view.journal': 'Transfer journal',
    'view.scouting': 'Scouting',
    'view.progression': 'Progression',

    // -- Empty states --
    'empty.roster': 'No players in the roster yet.',
    'empty.training': 'No training session available yet.',
    'empty.calendar': 'The season has not started yet.',
    'empty.draft': 'No draft in progress.',
    'empty.champions': 'Loading champions...',
    'empty.counters': 'Search for a champion to see their matchups.',
    'empty.match': 'No match available yet.',
    'empty.transfers': 'Loading market...',
    'empty.journal': 'No movement recorded yet.',
    'empty.scouting': 'No scouting report available yet.',

    // -- Search / placeholders --
    'ph.searchChampion': 'Search for a champion...',
    'ph.searchCounter': 'Search for a champion (counter or target)...',
    'counters.allRoles': 'All roles',
    'counters.allConfidence': 'Any confidence',

    // -- Match --
    'match.setupTitle': 'Prepare a match',
    'match.yourTeam': 'Your team',
    'match.opponent': 'Opponent',
    'match.dragons': 'Dragons',
    'match.grubs': 'Void Grubs',
    'match.dragonSoul': 'Dragon Soul',
    'match.baronBuff': 'Baron buff active',
    'match.elderBuff': 'Elder buff active',
    'match.pause': 'Pause',

    // -- Progression --
    'prog.globalStats': 'Global statistics',
    'prog.palmares': 'Honours',
    'prog.playerEvolution': 'Player evolution',
    'prog.noEvolution': 'No evolution yet.',
    'prog.matchHistory': 'Match history',
    'prog.date': 'Date',
    'prog.competition': 'Competition',
    'prog.opponent': 'Opponent',
    'prog.score': 'Score',
    'prog.result': 'Result',
    'prog.noMatch': 'No match played',
    'prog.worldSettings': 'World settings',
    'prog.localSave': 'Local save',
    'prog.exportSave': 'Export my save',
    'prog.importSave': 'Import a save',
    'prog.resetGame': 'Reset the game',
    'prog.cloudSave': 'Cloud save',
    'prog.optional': '(optional)',
    'prog.cloudIntro': 'Sync your progress across all your devices via GitHub Gist. If not configured, the game works normally in local mode.',
    'prog.gistId': 'Gist ID',
    'prog.gistToken': 'GitHub token',
    'prog.saveConfig': 'Save configuration',
    'prog.cloudExport': 'Upload to cloud',
    'prog.cloudImport': 'Load from cloud',

    // -- Language setting --
    'settings.language': 'Language',
    'settings.languageDesc': 'Choose the language of the game interface.',
    'settings.langFr': 'Français',
    'settings.langEn': 'English',
    'settings.aiRotation.title': 'AI roster rotation',
    'settings.aiRotation.desc': 'AI players retire and are replaced by young talents at their team level. Disabled: opposing rosters stay frozen.',
    'settings.playerContracts.title': 'My team age & contracts',
    'settings.playerContracts.desc': 'Your players age and their contracts expire (extensions to manage). Disabled: they stay on the team indefinitely, with no contract management.',

    // -- Footer --
    'footer.tagline': 'League of Legends esport team management game',
    'footer.changelog': 'Changelog',
    'footer.copyright': '© 2026 redbaron1308 — All rights reserved. Concept and design protected by intellectual property.',
    'footer.localStorage': 'Progression data is stored locally in your browser (localStorage) and is never transmitted to third parties.',
    'footer.disclaimer': 'LOL Esport Manager is an independent project not affiliated with Riot Games. League of Legends is a registered trademark of Riot Games, Inc. This game is created as a non-commercial fan project.',

    // -- Roster --
    'roster.restTitle': 'Team rest',
    'roster.avgFatigue': 'Current average fatigue: {n}/100',
    'roster.restBtn': '{label} (-{red} fatigue, {cost} coaching pts)',
    'roster.age': '{n} yrs',
    'roster.contract': '📋 Contract: Worlds {y}',
    'roster.lastYear': ' — final year',
    'roster.championPool': 'Champion pool',
    'roster.evolTitle': 'Last split evolution',
    'rest.short': 'Short (1 day)',
    'rest.medium': 'Medium (2 days)',
    'rest.long': 'Long (3 days)',
    'stat.form': 'Form',
    'stat.fatigue': 'Fatigue',
    'stat.mental': 'Mental',
    'stat.shotcalling': 'Shotcalling',
    'stat.laning': 'Laning',
    'stat.teamfight': 'Teamfight',
    'stat.mechanics': 'Mechanics',
    'trait.igl': 'IGL',
    'trait.mechanical': 'Mechanical',
    'trait.leader': 'Leader',
    'trait.veteran': 'Veteran',
    'trait.rookie': 'Rookie',
    'trait.tiltable': 'Tiltable',
    'trait.clutch': 'Clutch',
    'trait.consistant': 'Consistent',
    'toast.restNoCoaching': 'Not enough coaching points for this rest.',
    'toast.restDone': 'Rest ({label}) done: team fatigue reduced.',

    // -- Common --
    'common.all': 'All',
    'common.back': '← Back',
    'common.noResult': 'No results.',

    // -- Champions --
    'champ.dataUnavailable': 'Champion data unavailable.',
    'champ.noMatch': 'No champion matches.',
    'champ.champion': 'champion',
    'champ.champions': 'champions',
    'champ.difficulty': 'Difficulty',
    'champ.objectives': 'Objectives',
    'champ.style': 'Style',
    'champ.synergies': 'Synergies',
    'champ.strongVs': 'Strong against profiles',
    'champ.vsTitle': '{name} counters ({n})',
    'champ.counteredBy': 'Countered by ({n})',
    'champ.noCounterData': 'No counter data.',
    'champ.commonTags': 'Common tags: ',

    // -- Counters --
    'counters.dataUnavailable': 'Counter data unavailable.',
    'counters.vs': 'vs',
    'counters.tags': 'Tags: ',
    'counters.counteredTitle': 'Champions countered by "{q}"',
    'counters.counterTitle': 'Champions that counter "{q}"',

    // -- Language toast --
    'lang.changed': 'Language updated.'
  }
};

// Libellé court traduit d'un trait joueur (igl, veteran, ...).
function traitLabel(id) {
  const key = 'trait.' + id;
  const val = t(key);
  return val === key ? id : val;
}

// Libellé traduit d'une option de repos (REST_OPTIONS) par son id.
function restLabel(id) {
  return t('rest.' + id);
}

// Langue courante : lit state.settings.lang si dispo, sinon 'fr'.
function getLang() {
  try {
    if (typeof state !== 'undefined' && state.settings && state.settings.lang) {
      return state.settings.lang;
    }
  } catch (e) { /* state pas encore défini */ }
  return 'fr';
}

// Traduit une clé. vars optionnel pour interpolation {nom}.
// Retourne la clé elle-même si introuvable (utile pour repérer les oublis).
function t(key, vars) {
  const lang = getLang();
  const dict = I18N[lang] || I18N.fr;
  let str = dict[key];
  if (str === undefined) str = (I18N.fr[key] !== undefined ? I18N.fr[key] : key);
  if (vars) {
    Object.keys(vars).forEach((k) => {
      str = str.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]);
    });
  }
  return str;
}

// Change la langue, persiste, ré-applique le HTML statique et re-render la vue active.
function setLang(lang) {
  if (!I18N[lang]) return;
  if (typeof state !== 'undefined' && state.settings) {
    state.settings.lang = lang;
    if (typeof saveGame === 'function') saveGame();
  }
  document.documentElement.lang = lang;
  applyStaticI18n();
  // Re-render la vue courante si possible
  if (typeof currentView !== 'undefined' && typeof showView === 'function') {
    showView(currentView);
  }
}

// Applique les traductions au HTML statique (attributs data-i18n*).
function applyStaticI18n() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    el.innerHTML = t(el.getAttribute('data-i18n-html'));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
  });
  document.documentElement.lang = getLang();
}
