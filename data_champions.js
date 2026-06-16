// data_champions.js - Base champions (CDC §4.1 et §14.2)
// 90 champions : extension 2026 basee sur lol_esports_update_2026_with_counters.xlsx
// (88 champions issus du fichier 2026 + Sylas et Blitzcrank conserves de la base initiale)

const CHAMPIONS = [
  // ---------------- TOP ----------------
  { id: 'rumble', name: 'Rumble', role: 'TOP', secondaryRoles: ['MID'], difficulty: 4, tags: ['poke', 'teamfight', 'engage'], phasePower: { early: 8, mid: 9, late: 6 }, objectivePower: 4, synergyTags: ['teamfight', 'poke'], counterTags: ['protect'] },
  { id: 'sion', name: 'Sion', role: 'TOP', secondaryRoles: [], difficulty: 2, tags: ['engage', 'scaling'], phasePower: { early: 4, mid: 6, late: 8 }, objectivePower: 5, synergyTags: ['teamfight', 'siege'], counterTags: ['poke'] },
  { id: 'gnar', name: 'Gnar', role: 'TOP', secondaryRoles: [], difficulty: 4, tags: ['engage', 'poke'], phasePower: { early: 6, mid: 8, late: 7 }, objectivePower: 4, synergyTags: ['teamfight', 'splitpush'], counterTags: ['dive'] },
  { id: 'ambessa', name: 'Ambessa', role: 'TOP', secondaryRoles: ['MID'], difficulty: 5, tags: ['dive', 'pick'], phasePower: { early: 7, mid: 8, late: 7 }, objectivePower: 3, synergyTags: ['dive', 'pick'], counterTags: ['poke'] },
  { id: 'renekton', name: 'Renekton', role: 'TOP', secondaryRoles: [], difficulty: 2, tags: ['dive', 'engage'], phasePower: { early: 9, mid: 7, late: 4 }, objectivePower: 3, synergyTags: ['dive'], counterTags: ['scaling'] },
  { id: 'ksante', name: 'K\'Sante', role: 'TOP', secondaryRoles: [], difficulty: 5, tags: ['engage', 'protect'], phasePower: { early: 5, mid: 7, late: 8 }, objectivePower: 4, synergyTags: ['teamfight', 'protect'], counterTags: ['dive'] },
  { id: 'jax', name: 'Jax', role: 'TOP', secondaryRoles: ['JUNGLE'], difficulty: 3, tags: ['splitpush', 'scaling', 'dive'], phasePower: { early: 5, mid: 7, late: 9 }, objectivePower: 3, synergyTags: ['splitpush'], counterTags: ['protect'] },
  { id: 'gwen', name: 'Gwen', role: 'TOP', secondaryRoles: [], difficulty: 4, tags: ['splitpush', 'scaling', 'dive'], phasePower: { early: 5, mid: 7, late: 9 }, objectivePower: 3, synergyTags: ['splitpush', 'dive'], counterTags: ['engage'] },
  { id: 'aatrox', name: 'Aatrox', role: 'TOP', secondaryRoles: [], difficulty: 4, tags: ['dive', 'teamfight'], phasePower: { early: 7, mid: 8, late: 6 }, objectivePower: 3, synergyTags: ['teamfight', 'dive'], counterTags: ['poke'] },
  { id: 'gragas', name: 'Gragas', role: 'TOP', secondaryRoles: ['JUNGLE', 'SUPPORT'], difficulty: 3, tags: ['engage', 'disengage', 'pick'], phasePower: { early: 6, mid: 7, late: 6 }, objectivePower: 4, synergyTags: ['pick', 'disengage'], counterTags: ['dive'] },
  { id: 'camille', name: 'Camille', role: 'TOP', secondaryRoles: [], difficulty: 4, tags: ['splitpush', 'pick', 'dive'], phasePower: { early: 6, mid: 8, late: 8 }, objectivePower: 3, synergyTags: ['splitpush', 'pick'], counterTags: ['protect'] },
  { id: 'ornn', name: 'Ornn', role: 'TOP', secondaryRoles: [], difficulty: 2, tags: ['engage', 'scaling', 'protect'], phasePower: { early: 4, mid: 6, late: 9 }, objectivePower: 5, synergyTags: ['teamfight', 'siege'], counterTags: ['poke'] },
  { id: 'jayce', name: 'Jayce', role: 'TOP', secondaryRoles: ['MID'], difficulty: 4, tags: ['poke', 'siege'], phasePower: { early: 8, mid: 8, late: 5 }, objectivePower: 2, synergyTags: ['poke', 'siege'], counterTags: ['engage'] },
  { id: 'kennen', name: 'Kennen', role: 'TOP', secondaryRoles: [], difficulty: 4, tags: ['engage', 'teamfight', 'poke'], phasePower: { early: 6, mid: 8, late: 7 }, objectivePower: 4, synergyTags: ['teamfight'], counterTags: ['protect'] },
  { id: 'gangplank', name: 'Gangplank', role: 'TOP', secondaryRoles: [], difficulty: 5, tags: ['scaling', 'poke', 'splitpush'], phasePower: { early: 4, mid: 7, late: 10 }, objectivePower: 3, synergyTags: ['scaling', 'siege'], counterTags: ['engage'] },
  { id: 'fiora', name: 'Fiora', role: 'TOP', secondaryRoles: [], difficulty: 5, tags: ['splitpush', 'scaling'], phasePower: { early: 5, mid: 7, late: 10 }, objectivePower: 2, synergyTags: ['splitpush'], counterTags: ['protect'] },
  // ---------------- JUNGLE ----------------
  { id: 'jarvaniv', name: 'Jarvan IV', role: 'JUNGLE', secondaryRoles: [], difficulty: 2, tags: ['engage', 'dive'], phasePower: { early: 8, mid: 8, late: 6 }, objectivePower: 5, synergyTags: ['teamfight', 'dive'], counterTags: ['poke'] },
  { id: 'nocturne', name: 'Nocturne', role: 'JUNGLE', secondaryRoles: [], difficulty: 2, tags: ['dive', 'pick'], phasePower: { early: 6, mid: 8, late: 7 }, objectivePower: 3, synergyTags: ['pick', 'dive'], counterTags: ['poke'] },
  { id: 'vi', name: 'Vi', role: 'JUNGLE', secondaryRoles: [], difficulty: 2, tags: ['dive', 'pick'], phasePower: { early: 7, mid: 8, late: 6 }, objectivePower: 4, synergyTags: ['pick', 'dive'], counterTags: ['protect'] },
  { id: 'xinzhao', name: 'Xin Zhao', role: 'JUNGLE', secondaryRoles: [], difficulty: 2, tags: ['engage', 'dive'], phasePower: { early: 8, mid: 7, late: 5 }, objectivePower: 4, synergyTags: ['teamfight', 'dive'], counterTags: ['scaling'] },
  { id: 'wukong', name: 'Wukong', role: 'JUNGLE', secondaryRoles: ['TOP'], difficulty: 3, tags: ['engage', 'dive'], phasePower: { early: 6, mid: 8, late: 7 }, objectivePower: 5, synergyTags: ['teamfight'], counterTags: ['poke'] },
  { id: 'skarner', name: 'Skarner', role: 'JUNGLE', secondaryRoles: ['TOP'], difficulty: 2, tags: ['engage', 'pick', 'protect'], phasePower: { early: 6, mid: 8, late: 7 }, objectivePower: 5, synergyTags: ['pick', 'teamfight'], counterTags: ['splitpush'] },
  { id: 'pantheon', name: 'Pantheon', role: 'JUNGLE', secondaryRoles: ['TOP', 'MID', 'SUPPORT'], difficulty: 3, tags: ['dive', 'pick'], phasePower: { early: 9, mid: 8, late: 4 }, objectivePower: 3, synergyTags: ['pick', 'dive'], counterTags: ['scaling'] },
  { id: 'leesin', name: 'Lee Sin', role: 'JUNGLE', secondaryRoles: [], difficulty: 5, tags: ['dive', 'pick'], phasePower: { early: 9, mid: 7, late: 4 }, objectivePower: 3, synergyTags: ['pick', 'dive'], counterTags: ['scaling'] },
  { id: 'viego', name: 'Viego', role: 'JUNGLE', secondaryRoles: [], difficulty: 4, tags: ['dive', 'scaling'], phasePower: { early: 6, mid: 8, late: 8 }, objectivePower: 4, synergyTags: ['teamfight', 'dive'], counterTags: ['disengage'] },
  { id: 'sejuani', name: 'Sejuani', role: 'JUNGLE', secondaryRoles: [], difficulty: 2, tags: ['engage', 'protect'], phasePower: { early: 5, mid: 7, late: 8 }, objectivePower: 5, synergyTags: ['teamfight', 'protect'], counterTags: ['poke'] },
  { id: 'nidalee', name: 'Nidalee', role: 'JUNGLE', secondaryRoles: [], difficulty: 5, tags: ['poke', 'pick'], phasePower: { early: 9, mid: 8, late: 4 }, objectivePower: 2, synergyTags: ['poke', 'pick'], counterTags: ['engage'] },
  { id: 'maokai', name: 'Maokai', role: 'JUNGLE', secondaryRoles: ['TOP', 'SUPPORT'], difficulty: 2, tags: ['engage', 'protect', 'disengage'], phasePower: { early: 5, mid: 7, late: 8 }, objectivePower: 5, synergyTags: ['teamfight', 'protect'], counterTags: ['splitpush'] },
  { id: 'poppy', name: 'Poppy', role: 'JUNGLE', secondaryRoles: ['TOP', 'SUPPORT'], difficulty: 3, tags: ['engage', 'disengage', 'protect'], phasePower: { early: 7, mid: 7, late: 6 }, objectivePower: 4, synergyTags: ['protect', 'disengage'], counterTags: ['dive'] },
  { id: 'elise', name: 'Elise', role: 'JUNGLE', secondaryRoles: [], difficulty: 4, tags: ['dive', 'pick'], phasePower: { early: 9, mid: 7, late: 3 }, objectivePower: 2, synergyTags: ['pick', 'dive'], counterTags: ['scaling'] },
  { id: 'khazix', name: 'Kha\'Zix', role: 'JUNGLE', secondaryRoles: [], difficulty: 4, tags: ['pick', 'dive'], phasePower: { early: 6, mid: 8, late: 7 }, objectivePower: 2, synergyTags: ['pick'], counterTags: ['protect'] },
  { id: 'graves', name: 'Graves', role: 'JUNGLE', secondaryRoles: [], difficulty: 3, tags: ['scaling', 'poke'], phasePower: { early: 7, mid: 8, late: 7 }, objectivePower: 3, synergyTags: ['poke', 'scaling'], counterTags: ['engage'] },
  { id: 'kindred', name: 'Kindred', role: 'JUNGLE', secondaryRoles: [], difficulty: 5, tags: ['scaling', 'protect'], phasePower: { early: 6, mid: 8, late: 9 }, objectivePower: 4, synergyTags: ['protect', 'scaling'], counterTags: ['dive'] },
  { id: 'ivern', name: 'Ivern', role: 'JUNGLE', secondaryRoles: [], difficulty: 4, tags: ['protect', 'disengage'], phasePower: { early: 5, mid: 7, late: 8 }, objectivePower: 4, synergyTags: ['protect', 'poke'], counterTags: ['dive'] },
  // ---------------- MID ----------------
  { id: 'orianna', name: 'Orianna', role: 'MID', secondaryRoles: [], difficulty: 3, tags: ['teamfight', 'protect', 'scaling'], phasePower: { early: 6, mid: 8, late: 9 }, objectivePower: 4, synergyTags: ['teamfight', 'protect'], counterTags: ['dive'] },
  { id: 'ryze', name: 'Ryze', role: 'MID', secondaryRoles: ['TOP'], difficulty: 4, tags: ['scaling', 'splitpush'], phasePower: { early: 5, mid: 8, late: 8 }, objectivePower: 3, synergyTags: ['splitpush', 'teamfight'], counterTags: ['poke'] },
  { id: 'azir', name: 'Azir', role: 'MID', secondaryRoles: [], difficulty: 5, tags: ['scaling', 'siege', 'disengage'], phasePower: { early: 4, mid: 7, late: 10 }, objectivePower: 4, synergyTags: ['siege', 'scaling'], counterTags: ['engage'] },
  { id: 'aurora', name: 'Aurora', role: 'MID', secondaryRoles: ['TOP'], difficulty: 5, tags: ['dive', 'teamfight'], phasePower: { early: 6, mid: 8, late: 8 }, objectivePower: 4, synergyTags: ['teamfight', 'dive'], counterTags: ['poke'] },
  { id: 'annie', name: 'Annie', role: 'MID', secondaryRoles: ['SUPPORT'], difficulty: 2, tags: ['engage', 'pick'], phasePower: { early: 7, mid: 8, late: 6 }, objectivePower: 4, synergyTags: ['pick', 'teamfight'], counterTags: ['poke'] },
  { id: 'ahri', name: 'Ahri', role: 'MID', secondaryRoles: [], difficulty: 3, tags: ['pick', 'dive'], phasePower: { early: 6, mid: 8, late: 7 }, objectivePower: 3, synergyTags: ['pick'], counterTags: ['protect'] },
  { id: 'leblanc', name: 'LeBlanc', role: 'MID', secondaryRoles: [], difficulty: 4, tags: ['pick', 'poke'], phasePower: { early: 8, mid: 8, late: 5 }, objectivePower: 2, synergyTags: ['pick', 'poke'], counterTags: ['engage'] },
  { id: 'viktor', name: 'Viktor', role: 'MID', secondaryRoles: [], difficulty: 4, tags: ['scaling', 'poke', 'siege'], phasePower: { early: 5, mid: 7, late: 10 }, objectivePower: 4, synergyTags: ['siege', 'scaling'], counterTags: ['dive'] },
  { id: 'akali', name: 'Akali', role: 'MID', secondaryRoles: ['TOP'], difficulty: 5, tags: ['dive', 'pick'], phasePower: { early: 5, mid: 8, late: 8 }, objectivePower: 2, synergyTags: ['dive', 'pick'], counterTags: ['protect'] },
  { id: 'corki', name: 'Corki', role: 'MID', secondaryRoles: ['ADC'], difficulty: 3, tags: ['poke', 'scaling', 'siege'], phasePower: { early: 5, mid: 7, late: 9 }, objectivePower: 3, synergyTags: ['poke', 'siege'], counterTags: ['engage'] },
  { id: 'twistedfate', name: 'Twisted Fate', role: 'MID', secondaryRoles: ['TOP'], difficulty: 4, tags: ['pick', 'splitpush'], phasePower: { early: 5, mid: 7, late: 6 }, objectivePower: 2, synergyTags: ['pick', 'splitpush'], counterTags: ['engage'] },
  { id: 'syndra', name: 'Syndra', role: 'MID', secondaryRoles: [], difficulty: 4, tags: ['pick', 'scaling', 'poke'], phasePower: { early: 6, mid: 8, late: 9 }, objectivePower: 3, synergyTags: ['pick', 'poke'], counterTags: ['dive'] },
  { id: 'hwei', name: 'Hwei', role: 'MID', secondaryRoles: [], difficulty: 5, tags: ['poke', 'disengage', 'siege'], phasePower: { early: 5, mid: 8, late: 8 }, objectivePower: 3, synergyTags: ['poke', 'siege'], counterTags: ['dive'] },
  { id: 'taliyah', name: 'Taliyah', role: 'MID', secondaryRoles: ['JUNGLE'], difficulty: 4, tags: ['pick', 'disengage'], phasePower: { early: 6, mid: 8, late: 7 }, objectivePower: 4, synergyTags: ['pick', 'teamfight'], counterTags: ['splitpush'] },
  { id: 'yone', name: 'Yone', role: 'MID', secondaryRoles: ['TOP'], difficulty: 5, tags: ['dive', 'scaling'], phasePower: { early: 5, mid: 8, late: 9 }, objectivePower: 3, synergyTags: ['dive', 'teamfight'], counterTags: ['disengage'] },
  { id: 'galio', name: 'Galio', role: 'MID', secondaryRoles: ['SUPPORT'], difficulty: 3, tags: ['engage', 'protect', 'dive'], phasePower: { early: 6, mid: 7, late: 7 }, objectivePower: 4, synergyTags: ['dive', 'protect'], counterTags: ['poke'] },
  { id: 'zoe', name: 'Zoe', role: 'MID', secondaryRoles: [], difficulty: 5, tags: ['poke', 'pick'], phasePower: { early: 7, mid: 8, late: 6 }, objectivePower: 2, synergyTags: ['poke', 'pick'], counterTags: ['engage'] },
  { id: 'malzahar', name: 'Malzahar', role: 'MID', secondaryRoles: [], difficulty: 2, tags: ['pick', 'protect'], phasePower: { early: 5, mid: 7, late: 7 }, objectivePower: 3, synergyTags: ['pick', 'protect'], counterTags: ['poke'] },
  { id: 'sylas', name: 'Sylas', role: 'MID', secondaryRoles: [], difficulty: 4,
    tags: ['dive', 'scaling', 'pick'], phasePower: { early: 5, mid: 7, late: 8 },
    objectivePower: 3, synergyTags: ['dive'], counterTags: ['disengage'] },
  // ---------------- ADC ----------------
  { id: 'varus', name: 'Varus', role: 'ADC', secondaryRoles: ['MID'], difficulty: 3, tags: ['poke', 'pick', 'siege'], phasePower: { early: 8, mid: 8, late: 6 }, objectivePower: 4, synergyTags: ['poke', 'siege'], counterTags: ['engage'] },
  { id: 'ashe', name: 'Ashe', role: 'ADC', secondaryRoles: ['SUPPORT'], difficulty: 2, tags: ['pick', 'engage', 'poke'], phasePower: { early: 7, mid: 7, late: 6 }, objectivePower: 4, synergyTags: ['pick', 'teamfight'], counterTags: ['dive'] },
  { id: 'ezreal', name: 'Ezreal', role: 'ADC', secondaryRoles: [], difficulty: 4, tags: ['poke', 'scaling'], phasePower: { early: 6, mid: 7, late: 8 }, objectivePower: 3, synergyTags: ['poke'], counterTags: ['engage'] },
  { id: 'caitlyn', name: 'Caitlyn', role: 'ADC', secondaryRoles: [], difficulty: 3, tags: ['poke', 'siege'], phasePower: { early: 8, mid: 7, late: 7 }, objectivePower: 3, synergyTags: ['siege', 'poke'], counterTags: ['dive'] },
  { id: 'yunara', name: 'Yunara', role: 'ADC', secondaryRoles: [], difficulty: 4, tags: ['scaling', 'poke'], phasePower: { early: 5, mid: 8, late: 9 }, objectivePower: 3, synergyTags: ['scaling', 'protect'], counterTags: ['dive'] },
  { id: 'lucian', name: 'Lucian', role: 'ADC', secondaryRoles: ['MID'], difficulty: 3, tags: ['dive', 'poke'], phasePower: { early: 8, mid: 8, late: 5 }, objectivePower: 2, synergyTags: ['dive', 'pick'], counterTags: ['scaling'] },
  { id: 'jinx', name: 'Jinx', role: 'ADC', secondaryRoles: [], difficulty: 3, tags: ['scaling', 'siege'], phasePower: { early: 4, mid: 7, late: 10 }, objectivePower: 3, synergyTags: ['protect', 'siege'], counterTags: ['dive'] },
  { id: 'zeri', name: 'Zeri', role: 'ADC', secondaryRoles: [], difficulty: 5, tags: ['scaling', 'dive'], phasePower: { early: 4, mid: 7, late: 10 }, objectivePower: 3, synergyTags: ['protect', 'teamfight'], counterTags: ['pick'] },
  { id: 'kalista', name: 'Kalista', role: 'ADC', secondaryRoles: [], difficulty: 4, tags: ['dive', 'engage'], phasePower: { early: 9, mid: 7, late: 4 }, objectivePower: 5, synergyTags: ['dive', 'engage'], counterTags: ['scaling'] },
  { id: 'kaisa', name: 'Kai\'Sa', role: 'ADC', secondaryRoles: [], difficulty: 3, tags: ['dive', 'scaling', 'pick'], phasePower: { early: 6, mid: 8, late: 9 }, objectivePower: 3, synergyTags: ['dive', 'pick'], counterTags: ['disengage'] },
  { id: 'sivir', name: 'Sivir', role: 'ADC', secondaryRoles: [], difficulty: 2, tags: ['scaling', 'disengage', 'siege'], phasePower: { early: 5, mid: 7, late: 9 }, objectivePower: 3, synergyTags: ['siege', 'protect'], counterTags: ['pick'] },
  { id: 'xayah', name: 'Xayah', role: 'ADC', secondaryRoles: [], difficulty: 3, tags: ['scaling', 'disengage'], phasePower: { early: 5, mid: 8, late: 9 }, objectivePower: 3, synergyTags: ['protect', 'teamfight'], counterTags: ['dive'] },
  { id: 'aphelios', name: 'Aphelios', role: 'ADC', secondaryRoles: [], difficulty: 5, tags: ['scaling', 'teamfight'], phasePower: { early: 4, mid: 7, late: 10 }, objectivePower: 3, synergyTags: ['protect', 'scaling'], counterTags: ['dive'] },
  { id: 'vayne', name: 'Vayne', role: 'ADC', secondaryRoles: ['TOP'], difficulty: 4, tags: ['scaling', 'splitpush'], phasePower: { early: 4, mid: 7, late: 10 }, objectivePower: 2, synergyTags: ['splitpush', 'scaling'], counterTags: ['engage'] },
  { id: 'kogmaw', name: 'Kog\'Maw', role: 'ADC', secondaryRoles: [], difficulty: 3, tags: ['scaling', 'protect', 'siege'], phasePower: { early: 3, mid: 7, late: 10 }, objectivePower: 3, synergyTags: ['protect', 'siege'], counterTags: ['dive'] },
  { id: 'tristana', name: 'Tristana', role: 'ADC', secondaryRoles: ['MID'], difficulty: 2, tags: ['scaling', 'siege', 'dive'], phasePower: { early: 6, mid: 7, late: 9 }, objectivePower: 3, synergyTags: ['siege', 'scaling'], counterTags: ['pick'] },
  { id: 'missfortune', name: 'Miss Fortune', role: 'ADC', secondaryRoles: [], difficulty: 2, tags: ['teamfight', 'poke'], phasePower: { early: 7, mid: 8, late: 6 }, objectivePower: 4, synergyTags: ['teamfight', 'engage'], counterTags: ['dive'] },
  { id: 'senna', name: 'Senna', role: 'ADC', secondaryRoles: ['SUPPORT'], difficulty: 4, tags: ['scaling', 'protect', 'poke'], phasePower: { early: 5, mid: 7, late: 10 }, objectivePower: 3, synergyTags: ['protect', 'poke'], counterTags: ['engage'] },
  // ---------------- SUPPORT ----------------
  { id: 'nautilus', name: 'Nautilus', role: 'SUPPORT', secondaryRoles: [], difficulty: 2, tags: ['engage', 'pick'], phasePower: { early: 8, mid: 8, late: 6 }, objectivePower: 5, synergyTags: ['engage', 'pick'], counterTags: ['poke'] },
  { id: 'karma', name: 'Karma', role: 'SUPPORT', secondaryRoles: ['MID', 'TOP'], difficulty: 3, tags: ['poke', 'protect', 'siege'], phasePower: { early: 8, mid: 7, late: 6 }, objectivePower: 3, synergyTags: ['poke', 'siege'], counterTags: ['engage'] },
  { id: 'bard', name: 'Bard', role: 'SUPPORT', secondaryRoles: [], difficulty: 5, tags: ['pick', 'disengage'], phasePower: { early: 6, mid: 8, late: 7 }, objectivePower: 4, synergyTags: ['pick', 'disengage'], counterTags: ['dive'] },
  { id: 'seraphine', name: 'Seraphine', role: 'SUPPORT', secondaryRoles: ['ADC', 'MID'], difficulty: 2, tags: ['protect', 'disengage', 'scaling'], phasePower: { early: 5, mid: 8, late: 9 }, objectivePower: 4, synergyTags: ['protect', 'teamfight'], counterTags: ['pick'] },
  { id: 'lulu', name: 'Lulu', role: 'SUPPORT', secondaryRoles: [], difficulty: 2, tags: ['protect', 'disengage', 'scaling'], phasePower: { early: 6, mid: 7, late: 8 }, objectivePower: 3, synergyTags: ['protect'], counterTags: ['dive'] },
  { id: 'nami', name: 'Nami', role: 'SUPPORT', secondaryRoles: [], difficulty: 3, tags: ['protect', 'poke', 'engage'], phasePower: { early: 7, mid: 8, late: 7 }, objectivePower: 3, synergyTags: ['poke', 'protect'], counterTags: ['dive'] },
  { id: 'rakan', name: 'Rakan', role: 'SUPPORT', secondaryRoles: [], difficulty: 4, tags: ['engage', 'disengage', 'dive'], phasePower: { early: 6, mid: 8, late: 8 }, objectivePower: 5, synergyTags: ['teamfight', 'dive'], counterTags: ['poke'] },
  { id: 'braum', name: 'Braum', role: 'SUPPORT', secondaryRoles: [], difficulty: 2, tags: ['protect', 'disengage'], phasePower: { early: 5, mid: 7, late: 8 }, objectivePower: 4, synergyTags: ['protect', 'disengage'], counterTags: ['dive'] },
  { id: 'alistar', name: 'Alistar', role: 'SUPPORT', secondaryRoles: [], difficulty: 2, tags: ['engage', 'disengage', 'dive'], phasePower: { early: 7, mid: 8, late: 6 }, objectivePower: 5, synergyTags: ['engage', 'dive'], counterTags: ['poke'] },
  { id: 'leona', name: 'Leona', role: 'SUPPORT', secondaryRoles: [], difficulty: 2, tags: ['engage', 'pick', 'dive'], phasePower: { early: 8, mid: 8, late: 5 }, objectivePower: 5, synergyTags: ['engage', 'pick'], counterTags: ['disengage'] },
  { id: 'rell', name: 'Rell', role: 'SUPPORT', secondaryRoles: [], difficulty: 3, tags: ['engage', 'teamfight'], phasePower: { early: 6, mid: 8, late: 8 }, objectivePower: 5, synergyTags: ['teamfight', 'engage'], counterTags: ['disengage'] },
  { id: 'thresh', name: 'Thresh', role: 'SUPPORT', secondaryRoles: [], difficulty: 5, tags: ['pick', 'protect', 'disengage'], phasePower: { early: 6, mid: 8, late: 7 }, objectivePower: 4, synergyTags: ['pick', 'protect'], counterTags: ['dive'] },
  { id: 'yuumi', name: 'Yuumi', role: 'SUPPORT', secondaryRoles: [], difficulty: 2, tags: ['protect', 'scaling'], phasePower: { early: 4, mid: 7, late: 9 }, objectivePower: 3, synergyTags: ['protect', 'scaling'], counterTags: ['engage'] },
  { id: 'janna', name: 'Janna', role: 'SUPPORT', secondaryRoles: [], difficulty: 2, tags: ['disengage', 'protect'], phasePower: { early: 5, mid: 7, late: 8 }, objectivePower: 4, synergyTags: ['protect', 'disengage'], counterTags: ['dive'] },
  { id: 'milio', name: 'Milio', role: 'SUPPORT', secondaryRoles: [], difficulty: 2, tags: ['protect', 'disengage', 'scaling'], phasePower: { early: 5, mid: 7, late: 8 }, objectivePower: 3, synergyTags: ['protect'], counterTags: ['pick'] },
  { id: 'pyke', name: 'Pyke', role: 'SUPPORT', secondaryRoles: [], difficulty: 5, tags: ['pick', 'dive'], phasePower: { early: 8, mid: 7, late: 4 }, objectivePower: 2, synergyTags: ['pick'], counterTags: ['protect'] },
  { id: 'renataglasc', name: 'Renata', role: 'SUPPORT', secondaryRoles: [], difficulty: 4, tags: ['protect', 'disengage'], phasePower: { early: 5, mid: 8, late: 8 }, objectivePower: 4, synergyTags: ['protect', 'disengage'], counterTags: ['dive'] },
  { id: 'tahmkench', name: 'Tahm Kench', role: 'SUPPORT', secondaryRoles: ['TOP'], difficulty: 3, tags: ['protect', 'disengage'], phasePower: { early: 5, mid: 7, late: 8 }, objectivePower: 3, synergyTags: ['protect'], counterTags: ['pick'] },
  { id: 'blitzcrank', name: 'Blitzcrank', role: 'SUPPORT', secondaryRoles: [], difficulty: 2,
    tags: ['engage', 'pick', 'dive'], phasePower: { early: 7, mid: 6, late: 5 },
    objectivePower: 2, synergyTags: ['engage', 'pick'], counterTags: ['disengage'] },
];

/**
 * Retrouve un champion par son nom exact (utilise par championPool).
 */
function getChampionByName(name) {
  return CHAMPIONS.find((c) => c.name === name) || null;
}

/**
 * Retrouve un champion par son identifiant.
 */
function getChampionById(id) {
  return CHAMPIONS.find((c) => c.id === id) || null;
}
