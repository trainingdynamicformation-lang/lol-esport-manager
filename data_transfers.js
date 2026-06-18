// data_transfers.js - Marche des transferts (joueurs reels de divisions inferieures, ERL/EMEA Masters)
// Genere depuis CDC/lol_esports_update_2026_with_transfers.xlsx (feuilles TransferMarket / TransferPools)
// 75 joueurs.

const TRANSFER_PLAYERS = [
 {
  "id": "TR-TOP-01",
  "name": "Carlsen",
  "role": "TOP",
  "fromTeam": "Galions",
  "league": "LFL / EMEA Masters",
  "division": "LFL",
  "nationality": "EU",
  "level": 85,
  "potential": 84,
  "form": 90,
  "mental": 84,
  "shotcalling": 72,
  "laning": 83,
  "teamfight": 87,
  "mechanics": 82,
  "championPool": [
   "Sion",
   "Gnar",
   "Rumble"
  ],
  "comforts": [
   {
    "champion": "Sion",
    "score": 94
   },
   {
    "champion": "Gnar",
    "score": 89
   },
   {
    "champion": "Rumble",
    "score": 83
   },
   {
    "champion": "K'Sante",
    "score": 78
   },
   {
    "champion": "Ornn",
    "score": 73
   }
  ],
  "signaturePick": "Sion",
  "transferScore": 92,
  "scoutGrade": "S",
  "marketValueK": 1540,
  "salaryK": 169,
  "scoutingNote": "Champion EMEA/LFL profile with tank-control tops; ready-made weakside or teamfight top."
 },
 {
  "id": "TR-TOP-02",
  "name": "Kryze",
  "role": "TOP",
  "fromTeam": "Solary",
  "league": "LFL",
  "division": "LFL",
  "nationality": "DE",
  "level": 84,
  "potential": 80,
  "form": 89,
  "mental": 86,
  "shotcalling": 70,
  "laning": 85,
  "teamfight": 84,
  "mechanics": 83,
  "championPool": [
   "Rumble",
   "K'Sante",
   "Gnar"
  ],
  "comforts": [
   {
    "champion": "Rumble",
    "score": 93
   },
   {
    "champion": "K'Sante",
    "score": 88
   },
   {
    "champion": "Gnar",
    "score": 82
   },
   {
    "champion": "Sion",
    "score": 77
   },
   {
    "champion": "Jax",
    "score": 72
   }
  ],
  "signaturePick": "Rumble",
  "transferScore": 90,
  "scoutGrade": "S",
  "marketValueK": 1432,
  "salaryK": 158,
  "scoutingNote": "LFL finalist profile; strong Rumble/K'Sante/Gnar sample in Spring 2026."
 },
 {
  "id": "TR-TOP-03",
  "name": "Spooder",
  "role": "TOP",
  "fromTeam": "TLN Pirates",
  "league": "LFL",
  "division": "LFL",
  "nationality": "EU",
  "level": 81,
  "potential": 84,
  "form": 84,
  "mental": 80,
  "shotcalling": 66,
  "laning": 82,
  "teamfight": 81,
  "mechanics": 83,
  "championPool": [
   "Ambessa",
   "Renekton",
   "Gwen"
  ],
  "comforts": [
   {
    "champion": "Ambessa",
    "score": 89
   },
   {
    "champion": "Renekton",
    "score": 84
   },
   {
    "champion": "Gwen",
    "score": 79
   },
   {
    "champion": "Gnar",
    "score": 74
   },
   {
    "champion": "Jax",
    "score": 69
   }
  ],
  "signaturePick": "Ambessa",
  "transferScore": 89,
  "scoutGrade": "S",
  "marketValueK": 1479,
  "salaryK": 163,
  "scoutingNote": "Aggressive top-side option for teams needing lane pressure and carry threat."
 },
 {
  "id": "TR-TOP-04",
  "name": "Tao",
  "role": "TOP",
  "fromTeam": "Karmine Corp Blue",
  "league": "LFL",
  "division": "LFL",
  "nationality": "FR/EU",
  "level": 80,
  "potential": 87,
  "form": 82,
  "mental": 78,
  "shotcalling": 64,
  "laning": 83,
  "teamfight": 78,
  "mechanics": 84,
  "championPool": [
   "Rumble",
   "Renekton",
   "K'Sante"
  ],
  "comforts": [
   {
    "champion": "Rumble",
    "score": 88
   },
   {
    "champion": "Renekton",
    "score": 83
   },
   {
    "champion": "K'Sante",
    "score": 78
   },
   {
    "champion": "Gwen",
    "score": 73
   },
   {
    "champion": "Gragas",
    "score": 68
   }
  ],
  "signaturePick": "Rumble",
  "transferScore": 89,
  "scoutGrade": "S",
  "marketValueK": 1496,
  "salaryK": 165,
  "scoutingNote": "High-upside academy top, good profile for a top team development slot."
 },
 {
  "id": "TR-TOP-05",
  "name": "Potent",
  "role": "TOP",
  "fromTeam": "Vitality.Bee",
  "league": "LFL",
  "division": "LFL",
  "nationality": "TR/EU",
  "level": 79,
  "potential": 86,
  "form": 81,
  "mental": 77,
  "shotcalling": 62,
  "laning": 82,
  "teamfight": 78,
  "mechanics": 85,
  "championPool": [
   "Gwen",
   "Jax",
   "Rumble"
  ],
  "comforts": [
   {
    "champion": "Gwen",
    "score": 87
   },
   {
    "champion": "Jax",
    "score": 82
   },
   {
    "champion": "Rumble",
    "score": 77
   },
   {
    "champion": "Aatrox",
    "score": 72
   },
   {
    "champion": "K'Sante",
    "score": 67
   }
  ],
  "signaturePick": "Gwen",
  "transferScore": 88,
  "scoutGrade": "S",
  "marketValueK": 1480,
  "salaryK": 163,
  "scoutingNote": "Carry-oriented top pool; useful in splitpush and skirmish-heavy drafts."
 },
 {
  "id": "TR-TOP-06",
  "name": "Wao",
  "role": "TOP",
  "fromTeam": "ZYB Esport",
  "league": "LFL",
  "division": "LFL",
  "nationality": "ES/EU",
  "level": 78,
  "potential": 78,
  "form": 76,
  "mental": 80,
  "shotcalling": 70,
  "laning": 79,
  "teamfight": 77,
  "mechanics": 78,
  "championPool": [
   "Ornn",
   "K'Sante",
   "Gnar"
  ],
  "comforts": [
   {
    "champion": "Ornn",
    "score": 86
   },
   {
    "champion": "K'Sante",
    "score": 81
   },
   {
    "champion": "Gnar",
    "score": 76
   },
   {
    "champion": "Sion",
    "score": 71
   },
   {
    "champion": "Renekton",
    "score": 66
   }
  ],
  "signaturePick": "Ornn",
  "transferScore": 85,
  "scoutGrade": "A+",
  "marketValueK": 1369,
  "salaryK": 151,
  "scoutingNote": "Stable veteran-style top; low-risk tank and engage coverage."
 },
 {
  "id": "TR-TOP-07",
  "name": "Jenax",
  "role": "TOP",
  "fromTeam": "Eintracht Spandau",
  "league": "Prime League / EMEA Masters",
  "division": "Prime League",
  "nationality": "DE",
  "level": 79,
  "potential": 77,
  "form": 78,
  "mental": 82,
  "shotcalling": 68,
  "laning": 80,
  "teamfight": 80,
  "mechanics": 78,
  "championPool": [
   "Gnar",
   "Renekton",
   "K'Sante"
  ],
  "comforts": [
   {
    "champion": "Gnar",
    "score": 87
   },
   {
    "champion": "Renekton",
    "score": 82
   },
   {
    "champion": "K'Sante",
    "score": 77
   },
   {
    "champion": "Jayce",
    "score": 72
   },
   {
    "champion": "Ornn",
    "score": 67
   }
  ],
  "signaturePick": "Gnar",
  "transferScore": 86,
  "scoutGrade": "A+",
  "marketValueK": 1280,
  "salaryK": 141,
  "scoutingNote": "Experienced ERL top, good plug-and-play option for structured teams."
 },
 {
  "id": "TR-TOP-08",
  "name": "Kozi",
  "role": "TOP",
  "fromTeam": "UCAM Esports",
  "league": "SuperLiga / EMEA Masters",
  "division": "SuperLiga",
  "nationality": "ES/EU",
  "level": 78,
  "potential": 83,
  "form": 79,
  "mental": 76,
  "shotcalling": 62,
  "laning": 81,
  "teamfight": 77,
  "mechanics": 82,
  "championPool": [
   "Aatrox",
   "Jax",
   "Gwen"
  ],
  "comforts": [
   {
    "champion": "Aatrox",
    "score": 86
   },
   {
    "champion": "Jax",
    "score": 81
   },
   {
    "champion": "Gwen",
    "score": 76
   },
   {
    "champion": "K'Sante",
    "score": 71
   },
   {
    "champion": "Rumble",
    "score": 66
   }
  ],
  "signaturePick": "Aatrox",
  "transferScore": 86,
  "scoutGrade": "A+",
  "marketValueK": 1379,
  "salaryK": 152,
  "scoutingNote": "Upside top laner with carry-heavy pool and good academy-team fit."
 },
 {
  "id": "TR-TOP-09",
  "name": "Papiteero",
  "role": "TOP",
  "fromTeam": "Team Heretics Academy",
  "league": "SuperLiga / EMEA Masters",
  "division": "SuperLiga",
  "nationality": "ES/EU",
  "level": 78,
  "potential": 84,
  "form": 80,
  "mental": 76,
  "shotcalling": 61,
  "laning": 82,
  "teamfight": 77,
  "mechanics": 82,
  "championPool": [
   "Renekton",
   "Gnar",
   "Rumble"
  ],
  "comforts": [
   {
    "champion": "Renekton",
    "score": 86
   },
   {
    "champion": "Gnar",
    "score": 81
   },
   {
    "champion": "Rumble",
    "score": 76
   },
   {
    "champion": "K'Sante",
    "score": 71
   },
   {
    "champion": "Gragas",
    "score": 66
   }
  ],
  "signaturePick": "Renekton",
  "transferScore": 87,
  "scoutGrade": "A+",
  "marketValueK": 1395,
  "salaryK": 153,
  "scoutingNote": "Development top with LEC-academy environment; balanced blind/counter pool."
 },
 {
  "id": "TR-TOP-10",
  "name": "Vizicsacsi",
  "role": "TOP",
  "fromTeam": "E WIE EINFACH E-SPORTS",
  "league": "Prime League / EMEA Masters",
  "division": "Prime League",
  "nationality": "HU",
  "level": 78,
  "potential": 72,
  "form": 77,
  "mental": 88,
  "shotcalling": 78,
  "laning": 77,
  "teamfight": 82,
  "mechanics": 73,
  "championPool": [
   "Ornn",
   "Gnar",
   "Sion"
  ],
  "comforts": [
   {
    "champion": "Ornn",
    "score": 86
   },
   {
    "champion": "Gnar",
    "score": 81
   },
   {
    "champion": "Sion",
    "score": 76
   },
   {
    "champion": "K'Sante",
    "score": 71
   },
   {
    "champion": "Gragas",
    "score": 66
   }
  ],
  "signaturePick": "Ornn",
  "transferScore": 84,
  "scoutGrade": "A+",
  "marketValueK": 1233,
  "salaryK": 136,
  "scoutingNote": "Veteran control top; adds leadership and stable weakside drafts."
 },
 {
  "id": "TR-TOP-11",
  "name": "Ragner",
  "role": "TOP",
  "fromTeam": "Misa Esports",
  "league": "TCL / EMEA Masters",
  "division": "TCL",
  "nationality": "FR/EU",
  "level": 77,
  "potential": 79,
  "form": 76,
  "mental": 80,
  "shotcalling": 65,
  "laning": 79,
  "teamfight": 76,
  "mechanics": 78,
  "championPool": [
   "Renekton",
   "Jax",
   "Aatrox"
  ],
  "comforts": [
   {
    "champion": "Renekton",
    "score": 85
   },
   {
    "champion": "Jax",
    "score": 80
   },
   {
    "champion": "Aatrox",
    "score": 75
   },
   {
    "champion": "Gnar",
    "score": 70
   },
   {
    "champion": "K'Sante",
    "score": 65
   }
  ],
  "signaturePick": "Renekton",
  "transferScore": 84,
  "scoutGrade": "A+",
  "marketValueK": 1305,
  "salaryK": 144,
  "scoutingNote": "Physical laning profile; good value option for teams needing top-side aggression."
 },
 {
  "id": "TR-TOP-12",
  "name": "Leny",
  "role": "TOP",
  "fromTeam": "Esprit Shonen",
  "league": "LFL",
  "division": "LFL",
  "nationality": "FR/EU",
  "level": 77,
  "potential": 84,
  "form": 75,
  "mental": 76,
  "shotcalling": 60,
  "laning": 80,
  "teamfight": 76,
  "mechanics": 82,
  "championPool": [
   "Rumble",
   "Gnar",
   "K'Sante"
  ],
  "comforts": [
   {
    "champion": "Rumble",
    "score": 85
   },
   {
    "champion": "Gnar",
    "score": 80
   },
   {
    "champion": "K'Sante",
    "score": 75
   },
   {
    "champion": "Aatrox",
    "score": 70
   },
   {
    "champion": "Jayce",
    "score": 65
   }
  ],
  "signaturePick": "Rumble",
  "transferScore": 86,
  "scoutGrade": "A+",
  "marketValueK": 1448,
  "salaryK": 159,
  "scoutingNote": "Young LFL top with draft flexibility between AP top and standard bruisers."
 },
 {
  "id": "TR-TOP-13",
  "name": "Badlulu",
  "role": "TOP",
  "fromTeam": "Ici Japon Corp. Esport",
  "league": "LFL",
  "division": "LFL",
  "nationality": "FR/EU",
  "level": 76,
  "potential": 82,
  "form": 76,
  "mental": 75,
  "shotcalling": 58,
  "laning": 78,
  "teamfight": 76,
  "mechanics": 81,
  "championPool": [
   "Renekton",
   "Aatrox",
   "Gwen"
  ],
  "comforts": [
   {
    "champion": "Renekton",
    "score": 84
   },
   {
    "champion": "Aatrox",
    "score": 79
   },
   {
    "champion": "Gwen",
    "score": 74
   },
   {
    "champion": "Gnar",
    "score": 69
   },
   {
    "champion": "Ornn",
    "score": 64
   }
  ],
  "signaturePick": "Renekton",
  "transferScore": 84,
  "scoutGrade": "A+",
  "marketValueK": 1416,
  "salaryK": 156,
  "scoutingNote": "Developmental bruiser/carry top; relevant for a lower-cost transfer list."
 },
 {
  "id": "TR-TOP-14",
  "name": "iBo",
  "role": "TOP",
  "fromTeam": "Forsaken",
  "league": "Ultraliga / EMEA Masters",
  "division": "Ultraliga",
  "nationality": "PL/EU",
  "level": 76,
  "potential": 77,
  "form": 75,
  "mental": 78,
  "shotcalling": 60,
  "laning": 78,
  "teamfight": 77,
  "mechanics": 77,
  "championPool": [
   "K'Sante",
   "Gnar",
   "Ornn"
  ],
  "comforts": [
   {
    "champion": "K'Sante",
    "score": 84
   },
   {
    "champion": "Gnar",
    "score": 79
   },
   {
    "champion": "Ornn",
    "score": 74
   },
   {
    "champion": "Rumble",
    "score": 69
   },
   {
    "champion": "Jayce",
    "score": 64
   }
  ],
  "signaturePick": "K'Sante",
  "transferScore": 83,
  "scoutGrade": "A",
  "marketValueK": 1284,
  "salaryK": 141,
  "scoutingNote": "Solid ERL top with meta-stable pool and safe blind-pick options."
 },
 {
  "id": "TR-TOP-15",
  "name": "Vertigo",
  "role": "TOP",
  "fromTeam": "Joblife",
  "league": "LFL",
  "division": "LFL",
  "nationality": "FR/EU",
  "level": 75,
  "potential": 80,
  "form": 74,
  "mental": 74,
  "shotcalling": 58,
  "laning": 78,
  "teamfight": 74,
  "mechanics": 79,
  "championPool": [
   "Gwen",
   "Jax",
   "Renekton"
  ],
  "comforts": [
   {
    "champion": "Gwen",
    "score": 83
   },
   {
    "champion": "Jax",
    "score": 78
   },
   {
    "champion": "Renekton",
    "score": 73
   },
   {
    "champion": "Camille",
    "score": 68
   },
   {
    "champion": "Aatrox",
    "score": 63
   }
  ],
  "signaturePick": "Gwen",
  "transferScore": 83,
  "scoutGrade": "A",
  "marketValueK": 1394,
  "salaryK": 153,
  "scoutingNote": "Scouting bet for teams wanting a low-cost carry top profile."
 },
 {
  "id": "TR-JUN-01",
  "name": "Zicssi",
  "role": "JUNGLE",
  "fromTeam": "Solary",
  "league": "LFL",
  "division": "LFL",
  "nationality": "FR",
  "level": 86,
  "potential": 84,
  "form": 91,
  "mental": 84,
  "shotcalling": 76,
  "laning": 75,
  "teamfight": 87,
  "mechanics": 86,
  "championPool": [
   "Pantheon",
   "Xin Zhao",
   "Jarvan IV"
  ],
  "comforts": [
   {
    "champion": "Pantheon",
    "score": 95
   },
   {
    "champion": "Xin Zhao",
    "score": 90
   },
   {
    "champion": "Jarvan IV",
    "score": 84
   },
   {
    "champion": "Skarner",
    "score": 79
   },
   {
    "champion": "Vi",
    "score": 74
   }
  ],
  "signaturePick": "Pantheon",
  "transferScore": 93,
  "scoutGrade": "S",
  "marketValueK": 1486,
  "salaryK": 163,
  "scoutingNote": "Premium LFL jungle target; exact alias kept for search: Zicssi/Ziccsi."
 },
 {
  "id": "TR-JUN-02",
  "name": "Thayger",
  "role": "JUNGLE",
  "fromTeam": "Galions",
  "league": "LFL / EMEA Masters",
  "division": "LFL",
  "nationality": "EU",
  "level": 85,
  "potential": 84,
  "form": 89,
  "mental": 83,
  "shotcalling": 78,
  "laning": 76,
  "teamfight": 86,
  "mechanics": 85,
  "championPool": [
   "Pantheon",
   "Xin Zhao",
   "Vi"
  ],
  "comforts": [
   {
    "champion": "Pantheon",
    "score": 94
   },
   {
    "champion": "Xin Zhao",
    "score": 89
   },
   {
    "champion": "Vi",
    "score": 83
   },
   {
    "champion": "Jarvan IV",
    "score": 78
   },
   {
    "champion": "Wukong",
    "score": 73
   }
  ],
  "signaturePick": "Pantheon",
  "transferScore": 92,
  "scoutGrade": "S",
  "marketValueK": 1540,
  "salaryK": 169,
  "scoutingNote": "High-impact jungle from Galions; strong early skirmish and engage pool."
 },
 {
  "id": "TR-JUN-03",
  "name": "Yukino",
  "role": "JUNGLE",
  "fromTeam": "Karmine Corp Blue",
  "league": "LFL",
  "division": "LFL",
  "nationality": "US",
  "level": 83,
  "potential": 91,
  "form": 86,
  "mental": 80,
  "shotcalling": 75,
  "laning": 77,
  "teamfight": 84,
  "mechanics": 88,
  "championPool": [
   "Xin Zhao",
   "Vi",
   "Wukong"
  ],
  "comforts": [
   {
    "champion": "Xin Zhao",
    "score": 92
   },
   {
    "champion": "Vi",
    "score": 87
   },
   {
    "champion": "Wukong",
    "score": 81
   },
   {
    "champion": "Pantheon",
    "score": 76
   },
   {
    "champion": "Jarvan IV",
    "score": 71
   }
  ],
  "signaturePick": "Xin Zhao",
  "transferScore": 93,
  "scoutGrade": "S",
  "marketValueK": 1595,
  "salaryK": 175,
  "scoutingNote": "North American rookie in KCB; perfect transfer-market example with high upside."
 },
 {
  "id": "TR-JUN-04",
  "name": "Markoon",
  "role": "JUNGLE",
  "fromTeam": "G2 NORD",
  "league": "NLC / EMEA Masters",
  "division": "NLC",
  "nationality": "NL/EU",
  "level": 82,
  "potential": 79,
  "form": 82,
  "mental": 84,
  "shotcalling": 82,
  "laning": 74,
  "teamfight": 84,
  "mechanics": 80,
  "championPool": [
   "Vi",
   "Xin Zhao",
   "Sejuani"
  ],
  "comforts": [
   {
    "champion": "Vi",
    "score": 90
   },
   {
    "champion": "Xin Zhao",
    "score": 85
   },
   {
    "champion": "Sejuani",
    "score": 80
   },
   {
    "champion": "Maokai",
    "score": 75
   },
   {
    "champion": "Jarvan IV",
    "score": 70
   }
  ],
  "signaturePick": "Vi",
  "transferScore": 89,
  "scoutGrade": "S",
  "marketValueK": 1321,
  "salaryK": 145,
  "scoutingNote": "Experienced jungle leader; ideal plug-in for top teams needing macro stability."
 },
 {
  "id": "TR-JUN-05",
  "name": "Lurox",
  "role": "JUNGLE",
  "fromTeam": "Team Heretics Academy",
  "league": "SuperLiga / EMEA Masters",
  "division": "SuperLiga",
  "nationality": "DE/EU",
  "level": 81,
  "potential": 79,
  "form": 83,
  "mental": 82,
  "shotcalling": 78,
  "laning": 75,
  "teamfight": 84,
  "mechanics": 82,
  "championPool": [
   "Vi",
   "Xin Zhao",
   "Jarvan IV"
  ],
  "comforts": [
   {
    "champion": "Vi",
    "score": 89
   },
   {
    "champion": "Xin Zhao",
    "score": 84
   },
   {
    "champion": "Jarvan IV",
    "score": 79
   },
   {
    "champion": "Wukong",
    "score": 74
   },
   {
    "champion": "Lee Sin",
    "score": 69
   }
  ],
  "signaturePick": "Vi",
  "transferScore": 88,
  "scoutGrade": "S",
  "marketValueK": 1344,
  "salaryK": 148,
  "scoutingNote": "Veteran academy jungler; balanced engage and skirmish pool."
 },
 {
  "id": "TR-JUN-06",
  "name": "Stefan",
  "role": "JUNGLE",
  "fromTeam": "TLN Pirates",
  "league": "LFL",
  "division": "LFL",
  "nationality": "EU",
  "level": 80,
  "potential": 83,
  "form": 82,
  "mental": 78,
  "shotcalling": 70,
  "laning": 75,
  "teamfight": 82,
  "mechanics": 83,
  "championPool": [
   "Vi",
   "Wukong",
   "Xin Zhao"
  ],
  "comforts": [
   {
    "champion": "Vi",
    "score": 88
   },
   {
    "champion": "Wukong",
    "score": 83
   },
   {
    "champion": "Xin Zhao",
    "score": 78
   },
   {
    "champion": "Pantheon",
    "score": 73
   },
   {
    "champion": "Sejuani",
    "score": 68
   }
  ],
  "signaturePick": "Vi",
  "transferScore": 88,
  "scoutGrade": "S",
  "marketValueK": 1463,
  "salaryK": 161,
  "scoutingNote": "Good French ERL development profile, can accelerate tempo-heavy comps."
 },
 {
  "id": "TR-JUN-07",
  "name": "bluerzor",
  "role": "JUNGLE",
  "fromTeam": "UCAM Esports",
  "league": "SuperLiga / EMEA Masters",
  "division": "SuperLiga",
  "nationality": "FR/EU",
  "level": 80,
  "potential": 80,
  "form": 81,
  "mental": 79,
  "shotcalling": 74,
  "laning": 74,
  "teamfight": 82,
  "mechanics": 81,
  "championPool": [
   "Xin Zhao",
   "Vi",
   "Sejuani"
  ],
  "comforts": [
   {
    "champion": "Xin Zhao",
    "score": 88
   },
   {
    "champion": "Vi",
    "score": 83
   },
   {
    "champion": "Sejuani",
    "score": 78
   },
   {
    "champion": "Nocturne",
    "score": 73
   },
   {
    "champion": "Jarvan IV",
    "score": 68
   }
  ],
  "signaturePick": "Xin Zhao",
  "transferScore": 87,
  "scoutGrade": "A+",
  "marketValueK": 1340,
  "salaryK": 147,
  "scoutingNote": "Reliable ERL jungle, valuable for controlled engage and objective setup."
 },
 {
  "id": "TR-JUN-08",
  "name": "Xagog",
  "role": "JUNGLE",
  "fromTeam": "Eintracht Spandau",
  "league": "Prime League / EMEA Masters",
  "division": "Prime League",
  "nationality": "DE/EU",
  "level": 79,
  "potential": 81,
  "form": 78,
  "mental": 77,
  "shotcalling": 72,
  "laning": 74,
  "teamfight": 79,
  "mechanics": 82,
  "championPool": [
   "Wukong",
   "Nocturne",
   "Vi"
  ],
  "comforts": [
   {
    "champion": "Wukong",
    "score": 87
   },
   {
    "champion": "Nocturne",
    "score": 82
   },
   {
    "champion": "Vi",
    "score": 77
   },
   {
    "champion": "Jarvan IV",
    "score": 72
   },
   {
    "champion": "Pantheon",
    "score": 67
   }
  ],
  "signaturePick": "Wukong",
  "transferScore": 86,
  "scoutGrade": "A+",
  "marketValueK": 1368,
  "salaryK": 150,
  "scoutingNote": "Good upside option from Prime League, focused on engage and pick tools."
 },
 {
  "id": "TR-JUN-09",
  "name": "Afroboi",
  "role": "JUNGLE",
  "fromTeam": "E WIE EINFACH E-SPORTS",
  "league": "Prime League / EMEA Masters",
  "division": "Prime League",
  "nationality": "DE/EU",
  "level": 79,
  "potential": 84,
  "form": 78,
  "mental": 76,
  "shotcalling": 68,
  "laning": 75,
  "teamfight": 78,
  "mechanics": 84,
  "championPool": [
   "Xin Zhao",
   "Pantheon",
   "Wukong"
  ],
  "comforts": [
   {
    "champion": "Xin Zhao",
    "score": 87
   },
   {
    "champion": "Pantheon",
    "score": 82
   },
   {
    "champion": "Wukong",
    "score": 77
   },
   {
    "champion": "Graves",
    "score": 72
   },
   {
    "champion": "Vi",
    "score": 67
   }
  ],
  "signaturePick": "Xin Zhao",
  "transferScore": 87,
  "scoutGrade": "A+",
  "marketValueK": 1395,
  "salaryK": 153,
  "scoutingNote": "Mechanics-first jungle bet; good for aggressive scouting pipelines."
 },
 {
  "id": "TR-JUN-10",
  "name": "Manaty",
  "role": "JUNGLE",
  "fromTeam": "ZYB Esport",
  "league": "LFL",
  "division": "LFL",
  "nationality": "FR/EU",
  "level": 78,
  "potential": 78,
  "form": 76,
  "mental": 78,
  "shotcalling": 74,
  "laning": 72,
  "teamfight": 78,
  "mechanics": 77,
  "championPool": [
   "Nocturne",
   "Vi",
   "Xin Zhao"
  ],
  "comforts": [
   {
    "champion": "Nocturne",
    "score": 86
   },
   {
    "champion": "Vi",
    "score": 81
   },
   {
    "champion": "Xin Zhao",
    "score": 76
   },
   {
    "champion": "Sejuani",
    "score": 71
   },
   {
    "champion": "Jarvan IV",
    "score": 66
   }
  ],
  "signaturePick": "Nocturne",
  "transferScore": 84,
  "scoutGrade": "A+",
  "marketValueK": 1358,
  "salaryK": 149,
  "scoutingNote": "Stable LFL jungle; good depth pickup for teams wanting low variance."
 },
 {
  "id": "TR-JUN-11",
  "name": "Dawciu",
  "role": "JUNGLE",
  "fromTeam": "Vitality.Bee",
  "league": "LFL",
  "division": "LFL",
  "nationality": "PL/EU",
  "level": 78,
  "potential": 82,
  "form": 79,
  "mental": 76,
  "shotcalling": 69,
  "laning": 73,
  "teamfight": 79,
  "mechanics": 82,
  "championPool": [
   "Vi",
   "Wukong",
   "Jarvan IV"
  ],
  "comforts": [
   {
    "champion": "Vi",
    "score": 86
   },
   {
    "champion": "Wukong",
    "score": 81
   },
   {
    "champion": "Jarvan IV",
    "score": 76
   },
   {
    "champion": "Sejuani",
    "score": 71
   },
   {
    "champion": "Maokai",
    "score": 66
   }
  ],
  "signaturePick": "Vi",
  "transferScore": 86,
  "scoutGrade": "A+",
  "marketValueK": 1436,
  "salaryK": 158,
  "scoutingNote": "Academy jungle with useful engage/farming mix and upside."
 },
 {
  "id": "TR-JUN-12",
  "name": "Kobs",
  "role": "JUNGLE",
  "fromTeam": "Esprit Shonen",
  "league": "LFL",
  "division": "LFL",
  "nationality": "FR/EU",
  "level": 77,
  "potential": 80,
  "form": 76,
  "mental": 76,
  "shotcalling": 70,
  "laning": 72,
  "teamfight": 78,
  "mechanics": 77,
  "championPool": [
   "Maokai",
   "Sejuani",
   "Vi"
  ],
  "comforts": [
   {
    "champion": "Maokai",
    "score": 85
   },
   {
    "champion": "Sejuani",
    "score": 80
   },
   {
    "champion": "Vi",
    "score": 75
   },
   {
    "champion": "Jarvan IV",
    "score": 70
   },
   {
    "champion": "Wukong",
    "score": 65
   }
  ],
  "signaturePick": "Maokai",
  "transferScore": 84,
  "scoutGrade": "A+",
  "marketValueK": 1404,
  "salaryK": 154,
  "scoutingNote": "Tank-control jungle, good for teams prioritising objective structure."
 },
 {
  "id": "TR-JUN-13",
  "name": "Kaboom",
  "role": "JUNGLE",
  "fromTeam": "Ici Japon Corp. Esport",
  "league": "LFL",
  "division": "LFL",
  "nationality": "FR/EU",
  "level": 76,
  "potential": 79,
  "form": 75,
  "mental": 74,
  "shotcalling": 68,
  "laning": 72,
  "teamfight": 76,
  "mechanics": 79,
  "championPool": [
   "Xin Zhao",
   "Jarvan IV",
   "Vi"
  ],
  "comforts": [
   {
    "champion": "Xin Zhao",
    "score": 84
   },
   {
    "champion": "Jarvan IV",
    "score": 79
   },
   {
    "champion": "Vi",
    "score": 74
   },
   {
    "champion": "Nocturne",
    "score": 69
   },
   {
    "champion": "Skarner",
    "score": 64
   }
  ],
  "signaturePick": "Xin Zhao",
  "transferScore": 83,
  "scoutGrade": "A",
  "marketValueK": 1388,
  "salaryK": 153,
  "scoutingNote": "Low-cost LFL skirmish jungler; useful for bench/academy transfer logic."
 },
 {
  "id": "TR-JUN-14",
  "name": "Shift",
  "role": "JUNGLE",
  "fromTeam": "Joblife",
  "league": "LFL",
  "division": "LFL",
  "nationality": "FR/EU",
  "level": 75,
  "potential": 78,
  "form": 73,
  "mental": 73,
  "shotcalling": 68,
  "laning": 71,
  "teamfight": 74,
  "mechanics": 78,
  "championPool": [
   "Skarner",
   "Vi",
   "Sejuani"
  ],
  "comforts": [
   {
    "champion": "Skarner",
    "score": 83
   },
   {
    "champion": "Vi",
    "score": 78
   },
   {
    "champion": "Sejuani",
    "score": 73
   },
   {
    "champion": "Wukong",
    "score": 68
   },
   {
    "champion": "Poppy",
    "score": 63
   }
  ],
  "signaturePick": "Skarner",
  "transferScore": 82,
  "scoutGrade": "A",
  "marketValueK": 1372,
  "salaryK": 151,
  "scoutingNote": "Defensive and engage pool; realistic development target."
 },
 {
  "id": "TR-JUN-15",
  "name": "Spooky",
  "role": "JUNGLE",
  "fromTeam": "Skillcamp",
  "league": "LFL",
  "division": "LFL",
  "nationality": "FR/EU",
  "level": 74,
  "potential": 82,
  "form": 72,
  "mental": 72,
  "shotcalling": 66,
  "laning": 70,
  "teamfight": 73,
  "mechanics": 80,
  "championPool": [
   "Nocturne",
   "Vi",
   "Xin Zhao"
  ],
  "comforts": [
   {
    "champion": "Nocturne",
    "score": 82
   },
   {
    "champion": "Vi",
    "score": 77
   },
   {
    "champion": "Xin Zhao",
    "score": 72
   },
   {
    "champion": "Maokai",
    "score": 67
   },
   {
    "champion": "Jarvan IV",
    "score": 62
   }
  ],
  "signaturePick": "Nocturne",
  "transferScore": 83,
  "scoutGrade": "A",
  "marketValueK": 1440,
  "salaryK": 158,
  "scoutingNote": "Rookie scouting bet with simple, pro-play viable champion pool."
 },
 {
  "id": "TR-MID-01",
  "name": "Kamiloo",
  "role": "MID",
  "fromTeam": "Karmine Corp Blue",
  "league": "LFL",
  "division": "LFL",
  "nationality": "FR/EU",
  "level": 85,
  "potential": 91,
  "form": 88,
  "mental": 82,
  "shotcalling": 72,
  "laning": 87,
  "teamfight": 84,
  "mechanics": 90,
  "championPool": [
   "Aurora",
   "LeBlanc",
   "Ryze"
  ],
  "comforts": [
   {
    "champion": "Aurora",
    "score": 94
   },
   {
    "champion": "LeBlanc",
    "score": 89
   },
   {
    "champion": "Ryze",
    "score": 83
   },
   {
    "champion": "Ahri",
    "score": 78
   },
   {
    "champion": "Taliyah",
    "score": 73
   }
  ],
  "signaturePick": "Aurora",
  "transferScore": 95,
  "scoutGrade": "S",
  "marketValueK": 1581,
  "salaryK": 174,
  "scoutingNote": "Premium mid prospect; public Spring sample includes Aurora/Ryze/LeBlanc/Ahri."
 },
 {
  "id": "TR-MID-02",
  "name": "OMON",
  "role": "MID",
  "fromTeam": "Galions",
  "league": "LFL / EMEA Masters",
  "division": "LFL",
  "nationality": "EU",
  "level": 84,
  "potential": 84,
  "form": 89,
  "mental": 83,
  "shotcalling": 76,
  "laning": 84,
  "teamfight": 86,
  "mechanics": 84,
  "championPool": [
   "Orianna",
   "Ryze",
   "Azir"
  ],
  "comforts": [
   {
    "champion": "Orianna",
    "score": 92
   },
   {
    "champion": "Ryze",
    "score": 87
   },
   {
    "champion": "Azir",
    "score": 82
   },
   {
    "champion": "Aurora",
    "score": 77
   },
   {
    "champion": "Taliyah",
    "score": 72
   }
  ],
  "signaturePick": "Orianna",
  "transferScore": 92,
  "scoutGrade": "S",
  "marketValueK": 1540,
  "salaryK": 169,
  "scoutingNote": "High-form teamfight mid from Galions; strong control-mage value."
 },
 {
  "id": "TR-MID-03",
  "name": "Jool",
  "role": "MID",
  "fromTeam": "Solary",
  "league": "LFL",
  "division": "LFL",
  "nationality": "FR/EU",
  "level": 83,
  "potential": 82,
  "form": 88,
  "mental": 83,
  "shotcalling": 78,
  "laning": 82,
  "teamfight": 84,
  "mechanics": 82,
  "championPool": [
   "Azir",
   "Ryze",
   "Aurora"
  ],
  "comforts": [
   {
    "champion": "Azir",
    "score": 92
   },
   {
    "champion": "Ryze",
    "score": 87
   },
   {
    "champion": "Aurora",
    "score": 81
   },
   {
    "champion": "Galio",
    "score": 76
   },
   {
    "champion": "Taliyah",
    "score": 71
   }
  ],
  "signaturePick": "Azir",
  "transferScore": 91,
  "scoutGrade": "S",
  "marketValueK": 1454,
  "salaryK": 160,
  "scoutingNote": "LFL Spring pool shows Azir/Ryze/Aurora/Galio; ready for structured top teams."
 },
 {
  "id": "TR-MID-04",
  "name": "Czajek",
  "role": "MID",
  "fromTeam": "Vitality.Bee",
  "league": "LFL",
  "division": "LFL",
  "nationality": "PL/EU",
  "level": 82,
  "potential": 84,
  "form": 84,
  "mental": 80,
  "shotcalling": 72,
  "laning": 84,
  "teamfight": 82,
  "mechanics": 86,
  "championPool": [
   "Aurora",
   "Ahri",
   "Orianna"
  ],
  "comforts": [
   {
    "champion": "Aurora",
    "score": 90
   },
   {
    "champion": "Ahri",
    "score": 85
   },
   {
    "champion": "Orianna",
    "score": 80
   },
   {
    "champion": "LeBlanc",
    "score": 75
   },
   {
    "champion": "Taliyah",
    "score": 70
   }
  ],
  "signaturePick": "Aurora",
  "transferScore": 91,
  "scoutGrade": "S",
  "marketValueK": 1465,
  "salaryK": 161,
  "scoutingNote": "Mechanically solid mid with meta mage/roam pool."
 },
 {
  "id": "TR-MID-05",
  "name": "PowerOfEvil",
  "role": "MID",
  "fromTeam": "Eintracht Spandau",
  "league": "Prime League / EMEA Masters",
  "division": "Prime League",
  "nationality": "DE",
  "level": 82,
  "potential": 74,
  "form": 80,
  "mental": 88,
  "shotcalling": 80,
  "laning": 81,
  "teamfight": 83,
  "mechanics": 77,
  "championPool": [
   "Orianna",
   "Azir",
   "Syndra"
  ],
  "comforts": [
   {
    "champion": "Orianna",
    "score": 90
   },
   {
    "champion": "Azir",
    "score": 85
   },
   {
    "champion": "Syndra",
    "score": 80
   },
   {
    "champion": "Viktor",
    "score": 75
   },
   {
    "champion": "Corki",
    "score": 70
   }
  ],
  "signaturePick": "Orianna",
  "transferScore": 87,
  "scoutGrade": "A+",
  "marketValueK": 1274,
  "salaryK": 140,
  "scoutingNote": "Veteran control-mage specialist; valuable leadership transfer target."
 },
 {
  "id": "TR-MID-06",
  "name": "Toffe",
  "role": "MID",
  "fromTeam": "TLN Pirates",
  "league": "LFL",
  "division": "LFL",
  "nationality": "FR/EU",
  "level": 80,
  "potential": 83,
  "form": 82,
  "mental": 78,
  "shotcalling": 68,
  "laning": 82,
  "teamfight": 80,
  "mechanics": 83,
  "championPool": [
   "Taliyah",
   "Ryze",
   "Aurora"
  ],
  "comforts": [
   {
    "champion": "Taliyah",
    "score": 88
   },
   {
    "champion": "Ryze",
    "score": 83
   },
   {
    "champion": "Aurora",
    "score": 78
   },
   {
    "champion": "Ahri",
    "score": 73
   },
   {
    "champion": "Viktor",
    "score": 68
   }
  ],
  "signaturePick": "Taliyah",
  "transferScore": 88,
  "scoutGrade": "S",
  "marketValueK": 1463,
  "salaryK": 161,
  "scoutingNote": "Good LFL upside mid; balanced roam/control profile."
 },
 {
  "id": "TR-MID-07",
  "name": "Mercy9",
  "role": "MID",
  "fromTeam": "Team Heretics Academy",
  "league": "SuperLiga / EMEA Masters",
  "division": "SuperLiga",
  "nationality": "ES/EU",
  "level": 80,
  "potential": 86,
  "form": 82,
  "mental": 78,
  "shotcalling": 66,
  "laning": 82,
  "teamfight": 80,
  "mechanics": 88,
  "championPool": [
   "Ahri",
   "Aurora",
   "Yone"
  ],
  "comforts": [
   {
    "champion": "Ahri",
    "score": 88
   },
   {
    "champion": "Aurora",
    "score": 83
   },
   {
    "champion": "Yone",
    "score": 78
   },
   {
    "champion": "LeBlanc",
    "score": 73
   },
   {
    "champion": "Akali",
    "score": 68
   }
  ],
  "signaturePick": "Ahri",
  "transferScore": 90,
  "scoutGrade": "S",
  "marketValueK": 1436,
  "salaryK": 158,
  "scoutingNote": "High-mechanics academy mid; attractive for carry-oriented rosters."
 },
 {
  "id": "TR-MID-08",
  "name": "Nisqy",
  "role": "MID",
  "fromTeam": "ZYB Esport",
  "league": "LFL",
  "division": "LFL",
  "nationality": "BE",
  "level": 79,
  "potential": 72,
  "form": 76,
  "mental": 88,
  "shotcalling": 84,
  "laning": 77,
  "teamfight": 80,
  "mechanics": 72,
  "championPool": [
   "Taliyah",
   "Twisted Fate",
   "Ahri"
  ],
  "comforts": [
   {
    "champion": "Taliyah",
    "score": 87
   },
   {
    "champion": "Twisted Fate",
    "score": 82
   },
   {
    "champion": "Ahri",
    "score": 77
   },
   {
    "champion": "Ryze",
    "score": 72
   },
   {
    "champion": "Galio",
    "score": 67
   }
  ],
  "signaturePick": "Taliyah",
  "transferScore": 84,
  "scoutGrade": "A+",
  "marketValueK": 1289,
  "salaryK": 142,
  "scoutingNote": "Veteran macro/roam mid; transfer value comes from shotcalling and map play."
 },
 {
  "id": "TR-MID-09",
  "name": "ESCIK",
  "role": "MID",
  "fromTeam": "UCAM Esports",
  "league": "SuperLiga / EMEA Masters",
  "division": "SuperLiga",
  "nationality": "EU",
  "level": 79,
  "potential": 82,
  "form": 80,
  "mental": 78,
  "shotcalling": 68,
  "laning": 80,
  "teamfight": 80,
  "mechanics": 81,
  "championPool": [
   "Aurora",
   "Orianna",
   "Azir"
  ],
  "comforts": [
   {
    "champion": "Aurora",
    "score": 87
   },
   {
    "champion": "Orianna",
    "score": 82
   },
   {
    "champion": "Azir",
    "score": 77
   },
   {
    "champion": "Ryze",
    "score": 72
   },
   {
    "champion": "Hwei",
    "score": 67
   }
  ],
  "signaturePick": "Aurora",
  "transferScore": 87,
  "scoutGrade": "A+",
  "marketValueK": 1384,
  "salaryK": 152,
  "scoutingNote": "Reliable control-mage mid with good academy-team fit."
 },
 {
  "id": "TR-MID-10",
  "name": "Ruby",
  "role": "MID",
  "fromTeam": "Partizan Esports",
  "league": "Balkan / EMEA Masters",
  "division": "Balkan",
  "nationality": "KR/EU",
  "level": 79,
  "potential": 75,
  "form": 78,
  "mental": 82,
  "shotcalling": 74,
  "laning": 79,
  "teamfight": 80,
  "mechanics": 77,
  "championPool": [
   "Azir",
   "Orianna",
   "Corki"
  ],
  "comforts": [
   {
    "champion": "Azir",
    "score": 87
   },
   {
    "champion": "Orianna",
    "score": 82
   },
   {
    "champion": "Corki",
    "score": 77
   },
   {
    "champion": "Ahri",
    "score": 72
   },
   {
    "champion": "Ryze",
    "score": 67
   }
  ],
  "signaturePick": "Azir",
  "transferScore": 85,
  "scoutGrade": "A+",
  "marketValueK": 1260,
  "salaryK": 139,
  "scoutingNote": "Experienced import-style mid; solid control and scaling pool."
 },
 {
  "id": "TR-MID-11",
  "name": "Relative",
  "role": "MID",
  "fromTeam": "E WIE EINFACH E-SPORTS",
  "league": "Prime League / EMEA Masters",
  "division": "Prime League",
  "nationality": "DE/EU",
  "level": 78,
  "potential": 83,
  "form": 78,
  "mental": 76,
  "shotcalling": 66,
  "laning": 80,
  "teamfight": 78,
  "mechanics": 82,
  "championPool": [
   "Ahri",
   "Orianna",
   "Taliyah"
  ],
  "comforts": [
   {
    "champion": "Ahri",
    "score": 86
   },
   {
    "champion": "Orianna",
    "score": 81
   },
   {
    "champion": "Taliyah",
    "score": 76
   },
   {
    "champion": "Aurora",
    "score": 71
   },
   {
    "champion": "Yone",
    "score": 66
   }
  ],
  "signaturePick": "Ahri",
  "transferScore": 87,
  "scoutGrade": "A+",
  "marketValueK": 1389,
  "salaryK": 153,
  "scoutingNote": "Young Prime League mid, flexible between pick and control styles."
 },
 {
  "id": "TR-MID-12",
  "name": "xKenzuke",
  "role": "MID",
  "fromTeam": "Esprit Shonen",
  "league": "LFL",
  "division": "LFL",
  "nationality": "FR/EU",
  "level": 78,
  "potential": 84,
  "form": 76,
  "mental": 76,
  "shotcalling": 65,
  "laning": 81,
  "teamfight": 77,
  "mechanics": 83,
  "championPool": [
   "Hwei",
   "Aurora",
   "Ryze"
  ],
  "comforts": [
   {
    "champion": "Hwei",
    "score": 86
   },
   {
    "champion": "Aurora",
    "score": 81
   },
   {
    "champion": "Ryze",
    "score": 76
   },
   {
    "champion": "Taliyah",
    "score": 71
   },
   {
    "champion": "Ahri",
    "score": 66
   }
  ],
  "signaturePick": "Hwei",
  "transferScore": 87,
  "scoutGrade": "A+",
  "marketValueK": 1458,
  "salaryK": 160,
  "scoutingNote": "Developmental French mid; good champion diversity for academy scouting."
 },
 {
  "id": "TR-MID-13",
  "name": "Dajor",
  "role": "MID",
  "fromTeam": "Ici Japon Corp. Esport",
  "league": "LFL",
  "division": "LFL",
  "nationality": "DE/EU",
  "level": 77,
  "potential": 78,
  "form": 77,
  "mental": 78,
  "shotcalling": 66,
  "laning": 79,
  "teamfight": 77,
  "mechanics": 80,
  "championPool": [
   "Ahri",
   "Viktor",
   "Aurora"
  ],
  "comforts": [
   {
    "champion": "Ahri",
    "score": 85
   },
   {
    "champion": "Viktor",
    "score": 80
   },
   {
    "champion": "Aurora",
    "score": 75
   },
   {
    "champion": "Orianna",
    "score": 70
   },
   {
    "champion": "Azir",
    "score": 65
   }
  ],
  "signaturePick": "Ahri",
  "transferScore": 85,
  "scoutGrade": "A+",
  "marketValueK": 1369,
  "salaryK": 151,
  "scoutingNote": "Stable ERL mid, useful for depth and low-cost transfer routes."
 },
 {
  "id": "TR-MID-14",
  "name": "Czekolad",
  "role": "MID",
  "fromTeam": "Joblife",
  "league": "LFL",
  "division": "LFL",
  "nationality": "PL/EU",
  "level": 77,
  "potential": 76,
  "form": 75,
  "mental": 80,
  "shotcalling": 70,
  "laning": 78,
  "teamfight": 78,
  "mechanics": 77,
  "championPool": [
   "LeBlanc",
   "Ahri",
   "Orianna"
  ],
  "comforts": [
   {
    "champion": "LeBlanc",
    "score": 85
   },
   {
    "champion": "Ahri",
    "score": 80
   },
   {
    "champion": "Orianna",
    "score": 75
   },
   {
    "champion": "Ryze",
    "score": 70
   },
   {
    "champion": "Syndra",
    "score": 65
   }
  ],
  "signaturePick": "LeBlanc",
  "transferScore": 84,
  "scoutGrade": "A+",
  "marketValueK": 1312,
  "salaryK": 144,
  "scoutingNote": "Experienced mid; good secondary shotcaller and control-mage coverage."
 },
 {
  "id": "TR-MID-15",
  "name": "Nafkelah",
  "role": "MID",
  "fromTeam": "Skillcamp",
  "league": "LFL",
  "division": "LFL",
  "nationality": "FR/EU",
  "level": 75,
  "potential": 82,
  "form": 72,
  "mental": 73,
  "shotcalling": 62,
  "laning": 77,
  "teamfight": 73,
  "mechanics": 82,
  "championPool": [
   "Aurora",
   "Akali",
   "Yone"
  ],
  "comforts": [
   {
    "champion": "Aurora",
    "score": 83
   },
   {
    "champion": "Akali",
    "score": 78
   },
   {
    "champion": "Yone",
    "score": 73
   },
   {
    "champion": "LeBlanc",
    "score": 68
   },
   {
    "champion": "Taliyah",
    "score": 63
   }
  ],
  "signaturePick": "Aurora",
  "transferScore": 84,
  "scoutGrade": "A+",
  "marketValueK": 1450,
  "salaryK": 160,
  "scoutingNote": "Rookie carry-mid bet with high-mechanics champion pool."
 },
 {
  "id": "TR-ADC-01",
  "name": "Harpoon",
  "role": "ADC",
  "fromTeam": "Galions",
  "league": "LFL / EMEA Masters",
  "division": "LFL",
  "nationality": "EU",
  "level": 86,
  "potential": 84,
  "form": 91,
  "mental": 84,
  "shotcalling": 68,
  "laning": 84,
  "teamfight": 88,
  "mechanics": 86,
  "championPool": [
   "Yunara",
   "Varus",
   "Ezreal"
  ],
  "comforts": [
   {
    "champion": "Yunara",
    "score": 94
   },
   {
    "champion": "Varus",
    "score": 89
   },
   {
    "champion": "Ezreal",
    "score": 84
   },
   {
    "champion": "Caitlyn",
    "score": 79
   },
   {
    "champion": "Ashe",
    "score": 74
   }
  ],
  "signaturePick": "Yunara",
  "transferScore": 93,
  "scoutGrade": "S",
  "marketValueK": 1586,
  "salaryK": 174,
  "scoutingNote": "High-form ADC from Galions; strong fit for top teams needing lane-to-teamfight carry."
 },
 {
  "id": "TR-ADC-02",
  "name": "Aetinoth",
  "role": "ADC",
  "fromTeam": "Solary",
  "league": "LFL",
  "division": "LFL",
  "nationality": "FR/EU",
  "level": 85,
  "potential": 86,
  "form": 89,
  "mental": 82,
  "shotcalling": 66,
  "laning": 84,
  "teamfight": 86,
  "mechanics": 87,
  "championPool": [
   "Ashe",
   "Lucian",
   "Yunara"
  ],
  "comforts": [
   {
    "champion": "Ashe",
    "score": 94
   },
   {
    "champion": "Lucian",
    "score": 89
   },
   {
    "champion": "Yunara",
    "score": 83
   },
   {
    "champion": "Ezreal",
    "score": 78
   },
   {
    "champion": "Caitlyn",
    "score": 73
   }
  ],
  "signaturePick": "Ashe",
  "transferScore": 92,
  "scoutGrade": "S",
  "marketValueK": 1521,
  "salaryK": 167,
  "scoutingNote": "LFL Spring pool includes Yunara/Ashe/Caitlyn/Lucian/Ezreal; Jhin noted as optional add-on."
 },
 {
  "id": "TR-ADC-03",
  "name": "Lure",
  "role": "ADC",
  "fromTeam": "Team Heretics Academy",
  "league": "SuperLiga / EMEA Masters",
  "division": "SuperLiga",
  "nationality": "EU",
  "level": 83,
  "potential": 88,
  "form": 86,
  "mental": 80,
  "shotcalling": 62,
  "laning": 86,
  "teamfight": 83,
  "mechanics": 90,
  "championPool": [
   "Varus",
   "Yunara",
   "Caitlyn"
  ],
  "comforts": [
   {
    "champion": "Varus",
    "score": 91
   },
   {
    "champion": "Yunara",
    "score": 86
   },
   {
    "champion": "Caitlyn",
    "score": 81
   },
   {
    "champion": "Ezreal",
    "score": 76
   },
   {
    "champion": "Aphelios",
    "score": 71
   }
  ],
  "signaturePick": "Varus",
  "transferScore": 92,
  "scoutGrade": "S",
  "marketValueK": 1466,
  "salaryK": 161,
  "scoutingNote": "Premium academy ADC profile with strong laning/mechanics upside."
 },
 {
  "id": "TR-ADC-04",
  "name": "Looki",
  "role": "ADC",
  "fromTeam": "Karmine Corp Blue",
  "league": "LFL / EMEA Masters",
  "division": "LFL",
  "nationality": "FR/EU",
  "level": 82,
  "potential": 89,
  "form": 84,
  "mental": 79,
  "shotcalling": 62,
  "laning": 84,
  "teamfight": 82,
  "mechanics": 88,
  "championPool": [
   "Yunara",
   "Ezreal",
   "Varus"
  ],
  "comforts": [
   {
    "champion": "Yunara",
    "score": 90
   },
   {
    "champion": "Ezreal",
    "score": 85
   },
   {
    "champion": "Varus",
    "score": 80
   },
   {
    "champion": "Kai'Sa",
    "score": 75
   },
   {
    "champion": "Caitlyn",
    "score": 70
   }
  ],
  "signaturePick": "Yunara",
  "transferScore": 91,
  "scoutGrade": "S",
  "marketValueK": 1595,
  "salaryK": 175,
  "scoutingNote": "KCB development ADC, high-ceiling transfer target for top teams."
 },
 {
  "id": "TR-ADC-05",
  "name": "Keduii",
  "role": "ADC",
  "fromTeam": "Eintracht Spandau",
  "league": "Prime League / EMEA Masters",
  "division": "Prime League",
  "nationality": "DE/EU",
  "level": 82,
  "potential": 79,
  "form": 80,
  "mental": 82,
  "shotcalling": 66,
  "laning": 82,
  "teamfight": 84,
  "mechanics": 80,
  "championPool": [
   "Varus",
   "Ezreal",
   "Aphelios"
  ],
  "comforts": [
   {
    "champion": "Varus",
    "score": 90
   },
   {
    "champion": "Ezreal",
    "score": 85
   },
   {
    "champion": "Aphelios",
    "score": 80
   },
   {
    "champion": "Zeri",
    "score": 75
   },
   {
    "champion": "Xayah",
    "score": 70
   }
  ],
  "signaturePick": "Varus",
  "transferScore": 88,
  "scoutGrade": "S",
  "marketValueK": 1344,
  "salaryK": 148,
  "scoutingNote": "Proven ERL ADC with strong teamfight and scaling champion pool."
 },
 {
  "id": "TR-ADC-06",
  "name": "Yakkey",
  "role": "ADC",
  "fromTeam": "Vitality.Bee",
  "league": "LFL",
  "division": "LFL",
  "nationality": "FR/EU",
  "level": 81,
  "potential": 85,
  "form": 82,
  "mental": 78,
  "shotcalling": 62,
  "laning": 84,
  "teamfight": 82,
  "mechanics": 86,
  "championPool": [
   "Yunara",
   "Caitlyn",
   "Kai'Sa"
  ],
  "comforts": [
   {
    "champion": "Yunara",
    "score": 89
   },
   {
    "champion": "Caitlyn",
    "score": 84
   },
   {
    "champion": "Kai'Sa",
    "score": 79
   },
   {
    "champion": "Jinx",
    "score": 74
   },
   {
    "champion": "Varus",
    "score": 69
   }
  ],
  "signaturePick": "Yunara",
  "transferScore": 89,
  "scoutGrade": "S",
  "marketValueK": 1485,
  "salaryK": 163,
  "scoutingNote": "Young LFL marksman; good balance between lane pressure and late scaling."
 },
 {
  "id": "TR-ADC-07",
  "name": "Hazel",
  "role": "ADC",
  "fromTeam": "Karmine Corp Blue",
  "league": "LFL",
  "division": "LFL",
  "nationality": "FR/EU",
  "level": 81,
  "potential": 88,
  "form": 82,
  "mental": 78,
  "shotcalling": 62,
  "laning": 84,
  "teamfight": 81,
  "mechanics": 86,
  "championPool": [
   "Yunara",
   "Ezreal",
   "Varus"
  ],
  "comforts": [
   {
    "champion": "Yunara",
    "score": 90
   },
   {
    "champion": "Ezreal",
    "score": 85
   },
   {
    "champion": "Varus",
    "score": 79
   },
   {
    "champion": "Kai'Sa",
    "score": 74
   },
   {
    "champion": "Jinx",
    "score": 69
   }
  ],
  "signaturePick": "Yunara",
  "transferScore": 90,
  "scoutGrade": "S",
  "marketValueK": 1512,
  "salaryK": 166,
  "scoutingNote": "Spring sample includes Yunara/Ezreal/Varus; Jhin flagged in additions if you expand champions."
 },
 {
  "id": "TR-ADC-08",
  "name": "ANDARIEL",
  "role": "ADC",
  "fromTeam": "UCAM Esports",
  "league": "SuperLiga / EMEA Masters",
  "division": "SuperLiga",
  "nationality": "ES/EU",
  "level": 80,
  "potential": 83,
  "form": 80,
  "mental": 78,
  "shotcalling": 62,
  "laning": 83,
  "teamfight": 80,
  "mechanics": 83,
  "championPool": [
   "Ezreal",
   "Varus",
   "Kai'Sa"
  ],
  "comforts": [
   {
    "champion": "Ezreal",
    "score": 88
   },
   {
    "champion": "Varus",
    "score": 83
   },
   {
    "champion": "Kai'Sa",
    "score": 78
   },
   {
    "champion": "Yunara",
    "score": 73
   },
   {
    "champion": "Ashe",
    "score": 68
   }
  ],
  "signaturePick": "Ezreal",
  "transferScore": 88,
  "scoutGrade": "S",
  "marketValueK": 1399,
  "salaryK": 154,
  "scoutingNote": "Flexible ADC, strong for teams needing safe blind and poke comps."
 },
 {
  "id": "TR-ADC-09",
  "name": "Axelent",
  "role": "ADC",
  "fromTeam": "TLN Pirates",
  "league": "LFL",
  "division": "LFL",
  "nationality": "EU",
  "level": 80,
  "potential": 82,
  "form": 82,
  "mental": 78,
  "shotcalling": 60,
  "laning": 82,
  "teamfight": 80,
  "mechanics": 84,
  "championPool": [
   "Varus",
   "Ezreal",
   "Caitlyn"
  ],
  "comforts": [
   {
    "champion": "Varus",
    "score": 88
   },
   {
    "champion": "Ezreal",
    "score": 83
   },
   {
    "champion": "Caitlyn",
    "score": 78
   },
   {
    "champion": "Jinx",
    "score": 73
   },
   {
    "champion": "Ashe",
    "score": 68
   }
  ],
  "signaturePick": "Varus",
  "transferScore": 88,
  "scoutGrade": "S",
  "marketValueK": 1457,
  "salaryK": 160,
  "scoutingNote": "High-value LFL target with classic lane pressure picks."
 },
 {
  "id": "TR-ADC-10",
  "name": "Nawa",
  "role": "ADC",
  "fromTeam": "PCIFIC Esports",
  "league": "TCL / EMEA Masters",
  "division": "TCL",
  "nationality": "TR/EU",
  "level": 79,
  "potential": 83,
  "form": 78,
  "mental": 76,
  "shotcalling": 58,
  "laning": 81,
  "teamfight": 79,
  "mechanics": 84,
  "championPool": [
   "Kai'Sa",
   "Varus",
   "Yunara"
  ],
  "comforts": [
   {
    "champion": "Kai'Sa",
    "score": 87
   },
   {
    "champion": "Varus",
    "score": 82
   },
   {
    "champion": "Yunara",
    "score": 77
   },
   {
    "champion": "Ezreal",
    "score": 72
   },
   {
    "champion": "Zeri",
    "score": 67
   }
  ],
  "signaturePick": "Kai'Sa",
  "transferScore": 87,
  "scoutGrade": "A+",
  "marketValueK": 1389,
  "salaryK": 153,
  "scoutingNote": "Mechanics-forward ADC from TCL route, useful for broad transfer realism."
 },
 {
  "id": "TR-ADC-11",
  "name": "Jezu",
  "role": "ADC",
  "fromTeam": "ZYB Esport",
  "league": "LFL",
  "division": "LFL",
  "nationality": "FR/EU",
  "level": 79,
  "potential": 76,
  "form": 76,
  "mental": 82,
  "shotcalling": 62,
  "laning": 80,
  "teamfight": 80,
  "mechanics": 78,
  "championPool": [
   "Varus",
   "Ashe",
   "Jinx"
  ],
  "comforts": [
   {
    "champion": "Varus",
    "score": 87
   },
   {
    "champion": "Ashe",
    "score": 82
   },
   {
    "champion": "Jinx",
    "score": 77
   },
   {
    "champion": "Ezreal",
    "score": 72
   },
   {
    "champion": "Caitlyn",
    "score": 67
   }
  ],
  "signaturePick": "Varus",
  "transferScore": 84,
  "scoutGrade": "A+",
  "marketValueK": 1312,
  "salaryK": 144,
  "scoutingNote": "Experienced LFL ADC; stable option with good weakside utility picks."
 },
 {
  "id": "TR-ADC-12",
  "name": "Unkn0wn",
  "role": "ADC",
  "fromTeam": "WLGaming Esports",
  "league": "Greek Legends / EMEA Masters",
  "division": "Greek Legends",
  "nationality": "EU",
  "level": 79,
  "potential": 84,
  "form": 79,
  "mental": 76,
  "shotcalling": 58,
  "laning": 82,
  "teamfight": 79,
  "mechanics": 85,
  "championPool": [
   "Ezreal",
   "Kai'Sa",
   "Yunara"
  ],
  "comforts": [
   {
    "champion": "Ezreal",
    "score": 87
   },
   {
    "champion": "Kai'Sa",
    "score": 82
   },
   {
    "champion": "Yunara",
    "score": 77
   },
   {
    "champion": "Varus",
    "score": 72
   },
   {
    "champion": "Zeri",
    "score": 67
   }
  ],
  "signaturePick": "Ezreal",
  "transferScore": 87,
  "scoutGrade": "A+",
  "marketValueK": 1395,
  "salaryK": 153,
  "scoutingNote": "EMEA scouting target with strong upside and meta-safe pool."
 },
 {
  "id": "TR-ADC-13",
  "name": "Soldier",
  "role": "ADC",
  "fromTeam": "Ici Japon Corp. Esport",
  "league": "LFL",
  "division": "LFL",
  "nationality": "EU",
  "level": 78,
  "potential": 79,
  "form": 77,
  "mental": 78,
  "shotcalling": 58,
  "laning": 80,
  "teamfight": 78,
  "mechanics": 80,
  "championPool": [
   "Kai'Sa",
   "Varus",
   "Jinx"
  ],
  "comforts": [
   {
    "champion": "Kai'Sa",
    "score": 86
   },
   {
    "champion": "Varus",
    "score": 81
   },
   {
    "champion": "Jinx",
    "score": 76
   },
   {
    "champion": "Ezreal",
    "score": 71
   },
   {
    "champion": "Caitlyn",
    "score": 66
   }
  ],
  "signaturePick": "Kai'Sa",
  "transferScore": 85,
  "scoutGrade": "A+",
  "marketValueK": 1374,
  "salaryK": 151,
  "scoutingNote": "Useful depth ADC; mostly plug-and-play for mid-table or academy teams."
 },
 {
  "id": "TR-ADC-14",
  "name": "Comp",
  "role": "ADC",
  "fromTeam": "Joblife",
  "league": "LFL",
  "division": "LFL",
  "nationality": "GR",
  "level": 78,
  "potential": 73,
  "form": 74,
  "mental": 84,
  "shotcalling": 64,
  "laning": 79,
  "teamfight": 80,
  "mechanics": 76,
  "championPool": [
   "Kai'Sa",
   "Xayah",
   "Varus"
  ],
  "comforts": [
   {
    "champion": "Kai'Sa",
    "score": 86
   },
   {
    "champion": "Xayah",
    "score": 81
   },
   {
    "champion": "Varus",
    "score": 76
   },
   {
    "champion": "Ezreal",
    "score": 71
   },
   {
    "champion": "Jinx",
    "score": 66
   }
  ],
  "signaturePick": "Kai'Sa",
  "transferScore": 83,
  "scoutGrade": "A",
  "marketValueK": 1285,
  "salaryK": 141,
  "scoutingNote": "Veteran marksman; realism pick for leadership and playoff experience."
 },
 {
  "id": "TR-ADC-15",
  "name": "AVRA",
  "role": "ADC",
  "fromTeam": "Esprit Shonen",
  "league": "LFL",
  "division": "LFL",
  "nationality": "EU",
  "level": 77,
  "potential": 83,
  "form": 76,
  "mental": 75,
  "shotcalling": 58,
  "laning": 80,
  "teamfight": 76,
  "mechanics": 82,
  "championPool": [
   "Sivir",
   "Kai'Sa",
   "Varus"
  ],
  "comforts": [
   {
    "champion": "Sivir",
    "score": 85
   },
   {
    "champion": "Kai'Sa",
    "score": 80
   },
   {
    "champion": "Varus",
    "score": 75
   },
   {
    "champion": "Jinx",
    "score": 70
   },
   {
    "champion": "Ezreal",
    "score": 65
   }
  ],
  "signaturePick": "Sivir",
  "transferScore": 85,
  "scoutGrade": "A+",
  "marketValueK": 1432,
  "salaryK": 158,
  "scoutingNote": "Low-cost upside ADC with scaling and teamfight options."
 },
 {
  "id": "TR-SUP-01",
  "name": "Zoelys",
  "role": "SUPPORT",
  "fromTeam": "Galions",
  "league": "LFL / EMEA Masters",
  "division": "LFL",
  "nationality": "FR/EU",
  "level": 85,
  "potential": 84,
  "form": 90,
  "mental": 86,
  "shotcalling": 82,
  "laning": 72,
  "teamfight": 88,
  "mechanics": 78,
  "championPool": [
   "Renata Glasc",
   "Milio",
   "Bard"
  ],
  "comforts": [
   {
    "champion": "Renata Glasc",
    "score": 94
   },
   {
    "champion": "Milio",
    "score": 89
   },
   {
    "champion": "Bard",
    "score": 83
   },
   {
    "champion": "Rell",
    "score": 78
   },
   {
    "champion": "Seraphine",
    "score": 73
   }
  ],
  "signaturePick": "Renata Glasc",
  "transferScore": 91,
  "scoutGrade": "S",
  "marketValueK": 1529,
  "salaryK": 168,
  "scoutingNote": "Premium ERL support: broad 2026 support pool across enchanter, engage and pocket picks."
 },
 {
  "id": "TR-SUP-02",
  "name": "Piero",
  "role": "SUPPORT",
  "fromTeam": "Solary",
  "league": "LFL",
  "division": "LFL",
  "nationality": "KR",
  "level": 84,
  "potential": 82,
  "form": 89,
  "mental": 86,
  "shotcalling": 78,
  "laning": 72,
  "teamfight": 87,
  "mechanics": 78,
  "championPool": [
   "Rell",
   "Alistar",
   "Leona"
  ],
  "comforts": [
   {
    "champion": "Rell",
    "score": 93
   },
   {
    "champion": "Alistar",
    "score": 88
   },
   {
    "champion": "Leona",
    "score": 82
   },
   {
    "champion": "Rakan",
    "score": 77
   },
   {
    "champion": "Lulu",
    "score": 72
   }
  ],
  "signaturePick": "Rell",
  "transferScore": 90,
  "scoutGrade": "S",
  "marketValueK": 1443,
  "salaryK": 159,
  "scoutingNote": "Core Solary support target; career pool strongly supports engage picks Rell/Alistar/Leona."
 },
 {
  "id": "TR-SUP-03",
  "name": "Prime",
  "role": "SUPPORT",
  "fromTeam": "Karmine Corp Blue",
  "league": "LFL",
  "division": "LFL",
  "nationality": "FR/EU",
  "level": 82,
  "potential": 78,
  "form": 83,
  "mental": 84,
  "shotcalling": 82,
  "laning": 70,
  "teamfight": 84,
  "mechanics": 75,
  "championPool": [
   "Nautilus",
   "Bard",
   "Nami"
  ],
  "comforts": [
   {
    "champion": "Nautilus",
    "score": 91
   },
   {
    "champion": "Bard",
    "score": 86
   },
   {
    "champion": "Nami",
    "score": 80
   },
   {
    "champion": "Lulu",
    "score": 75
   },
   {
    "champion": "Rakan",
    "score": 70
   }
  ],
  "signaturePick": "Nautilus",
  "transferScore": 87,
  "scoutGrade": "A+",
  "marketValueK": 1355,
  "salaryK": 149,
  "scoutingNote": "KCB support profile; public Spring pool includes Nautilus/Bard/Nami/Lulu/Rakan."
 },
 {
  "id": "TR-SUP-04",
  "name": "Batuuu",
  "role": "SUPPORT",
  "fromTeam": "Team Heretics Academy",
  "league": "SuperLiga / EMEA Masters",
  "division": "SuperLiga",
  "nationality": "TR/EU",
  "level": 81,
  "potential": 86,
  "form": 83,
  "mental": 80,
  "shotcalling": 76,
  "laning": 70,
  "teamfight": 84,
  "mechanics": 80,
  "championPool": [
   "Rell",
   "Rakan",
   "Nautilus"
  ],
  "comforts": [
   {
    "champion": "Rell",
    "score": 89
   },
   {
    "champion": "Rakan",
    "score": 84
   },
   {
    "champion": "Nautilus",
    "score": 79
   },
   {
    "champion": "Alistar",
    "score": 74
   },
   {
    "champion": "Leona",
    "score": 69
   }
  ],
  "signaturePick": "Rell",
  "transferScore": 89,
  "scoutGrade": "S",
  "marketValueK": 1426,
  "salaryK": 157,
  "scoutingNote": "High-upside academy support with top-team compatible engage pool."
 },
 {
  "id": "TR-SUP-05",
  "name": "Thomas",
  "role": "SUPPORT",
  "fromTeam": "TLN Pirates",
  "league": "LFL",
  "division": "LFL",
  "nationality": "EU",
  "level": 80,
  "potential": 82,
  "form": 82,
  "mental": 80,
  "shotcalling": 76,
  "laning": 70,
  "teamfight": 82,
  "mechanics": 78,
  "championPool": [
   "Rell",
   "Alistar",
   "Leona"
  ],
  "comforts": [
   {
    "champion": "Rell",
    "score": 88
   },
   {
    "champion": "Alistar",
    "score": 83
   },
   {
    "champion": "Leona",
    "score": 78
   },
   {
    "champion": "Rakan",
    "score": 73
   },
   {
    "champion": "Nautilus",
    "score": 68
   }
  ],
  "signaturePick": "Rell",
  "transferScore": 87,
  "scoutGrade": "A+",
  "marketValueK": 1412,
  "salaryK": 155,
  "scoutingNote": "Reliable LFL support, good for teams needing engage and setup."
 },
 {
  "id": "TR-SUP-06",
  "name": "iLevi",
  "role": "SUPPORT",
  "fromTeam": "UCAM Esports",
  "league": "SuperLiga / EMEA Masters",
  "division": "SuperLiga",
  "nationality": "EU",
  "level": 80,
  "potential": 83,
  "form": 81,
  "mental": 79,
  "shotcalling": 76,
  "laning": 70,
  "teamfight": 82,
  "mechanics": 78,
  "championPool": [
   "Milio",
   "Lulu",
   "Rakan"
  ],
  "comforts": [
   {
    "champion": "Milio",
    "score": 88
   },
   {
    "champion": "Lulu",
    "score": 83
   },
   {
    "champion": "Rakan",
    "score": 78
   },
   {
    "champion": "Nami",
    "score": 73
   },
   {
    "champion": "Rell",
    "score": 68
   }
  ],
  "signaturePick": "Milio",
  "transferScore": 87,
  "scoutGrade": "A+",
  "marketValueK": 1389,
  "salaryK": 153,
  "scoutingNote": "Balanced enchanter/engage support, realistic academy transfer."
 },
 {
  "id": "TR-SUP-07",
  "name": "seaz",
  "role": "SUPPORT",
  "fromTeam": "Eintracht Spandau",
  "league": "Prime League / EMEA Masters",
  "division": "Prime League",
  "nationality": "DE/EU",
  "level": 79,
  "potential": 78,
  "form": 79,
  "mental": 82,
  "shotcalling": 78,
  "laning": 70,
  "teamfight": 82,
  "mechanics": 76,
  "championPool": [
   "Rell",
   "Nautilus",
   "Leona"
  ],
  "comforts": [
   {
    "champion": "Rell",
    "score": 87
   },
   {
    "champion": "Nautilus",
    "score": 82
   },
   {
    "champion": "Leona",
    "score": 77
   },
   {
    "champion": "Braum",
    "score": 72
   },
   {
    "champion": "Renata Glasc",
    "score": 67
   }
  ],
  "signaturePick": "Rell",
  "transferScore": 86,
  "scoutGrade": "A+",
  "marketValueK": 1319,
  "salaryK": 145,
  "scoutingNote": "Experienced support with strong engage fundamentals and shotcalling value."
 },
 {
  "id": "TR-SUP-08",
  "name": "Tockimo",
  "role": "SUPPORT",
  "fromTeam": "G2 NORD",
  "league": "NLC / EMEA Masters",
  "division": "NLC",
  "nationality": "EU",
  "level": 79,
  "potential": 82,
  "form": 80,
  "mental": 78,
  "shotcalling": 76,
  "laning": 70,
  "teamfight": 81,
  "mechanics": 78,
  "championPool": [
   "Nautilus",
   "Rakan",
   "Alistar"
  ],
  "comforts": [
   {
    "champion": "Nautilus",
    "score": 87
   },
   {
    "champion": "Rakan",
    "score": 82
   },
   {
    "champion": "Alistar",
    "score": 77
   },
   {
    "champion": "Leona",
    "score": 72
   },
   {
    "champion": "Braum",
    "score": 67
   }
  ],
  "signaturePick": "Nautilus",
  "transferScore": 87,
  "scoutGrade": "A+",
  "marketValueK": 1384,
  "salaryK": 152,
  "scoutingNote": "Development support with straightforward top-team utility."
 },
 {
  "id": "TR-SUP-09",
  "name": "Dekap",
  "role": "SUPPORT",
  "fromTeam": "Vitality.Bee",
  "league": "LFL",
  "division": "LFL",
  "nationality": "FR/EU",
  "level": 78,
  "potential": 83,
  "form": 80,
  "mental": 78,
  "shotcalling": 74,
  "laning": 70,
  "teamfight": 80,
  "mechanics": 77,
  "championPool": [
   "Rell",
   "Alistar",
   "Rakan"
  ],
  "comforts": [
   {
    "champion": "Rell",
    "score": 86
   },
   {
    "champion": "Alistar",
    "score": 81
   },
   {
    "champion": "Rakan",
    "score": 76
   },
   {
    "champion": "Nautilus",
    "score": 71
   },
   {
    "champion": "Braum",
    "score": 66
   }
  ],
  "signaturePick": "Rell",
  "transferScore": 86,
  "scoutGrade": "A+",
  "marketValueK": 1442,
  "salaryK": 159,
  "scoutingNote": "Academy support with engage-first identity and good potential."
 },
 {
  "id": "TR-SUP-10",
  "name": "RIIPPP",
  "role": "SUPPORT",
  "fromTeam": "ZYB Esport",
  "league": "LFL",
  "division": "LFL",
  "nationality": "FR/EU",
  "level": 78,
  "potential": 80,
  "form": 77,
  "mental": 78,
  "shotcalling": 74,
  "laning": 68,
  "teamfight": 80,
  "mechanics": 76,
  "championPool": [
   "Nautilus",
   "Rell",
   "Alistar"
  ],
  "comforts": [
   {
    "champion": "Nautilus",
    "score": 86
   },
   {
    "champion": "Rell",
    "score": 81
   },
   {
    "champion": "Alistar",
    "score": 76
   },
   {
    "champion": "Leona",
    "score": 71
   },
   {
    "champion": "Tahm Kench",
    "score": 66
   }
  ],
  "signaturePick": "Nautilus",
  "transferScore": 85,
  "scoutGrade": "A+",
  "marketValueK": 1415,
  "salaryK": 156,
  "scoutingNote": "Stable LFL support with tank and peel coverage."
 },
 {
  "id": "TR-SUP-11",
  "name": "Wildenbruch",
  "role": "SUPPORT",
  "fromTeam": "E WIE EINFACH E-SPORTS",
  "league": "Prime League / EMEA Masters",
  "division": "Prime League",
  "nationality": "EU",
  "level": 77,
  "potential": 82,
  "form": 76,
  "mental": 76,
  "shotcalling": 72,
  "laning": 68,
  "teamfight": 78,
  "mechanics": 76,
  "championPool": [
   "Rakan",
   "Leona",
   "Alistar"
  ],
  "comforts": [
   {
    "champion": "Rakan",
    "score": 85
   },
   {
    "champion": "Leona",
    "score": 80
   },
   {
    "champion": "Alistar",
    "score": 75
   },
   {
    "champion": "Nautilus",
    "score": 70
   },
   {
    "champion": "Braum",
    "score": 65
   }
  ],
  "signaturePick": "Rakan",
  "transferScore": 84,
  "scoutGrade": "A+",
  "marketValueK": 1354,
  "salaryK": 149,
  "scoutingNote": "Young support bet with engage mobility and strong development value."
 },
 {
  "id": "TR-SUP-12",
  "name": "Mersa",
  "role": "SUPPORT",
  "fromTeam": "Joblife",
  "league": "LFL",
  "division": "LFL",
  "nationality": "GR",
  "level": 77,
  "potential": 73,
  "form": 75,
  "mental": 82,
  "shotcalling": 76,
  "laning": 68,
  "teamfight": 80,
  "mechanics": 74,
  "championPool": [
   "Rakan",
   "Nautilus",
   "Leona"
  ],
  "comforts": [
   {
    "champion": "Rakan",
    "score": 85
   },
   {
    "champion": "Nautilus",
    "score": 80
   },
   {
    "champion": "Leona",
    "score": 75
   },
   {
    "champion": "Rell",
    "score": 70
   },
   {
    "champion": "Alistar",
    "score": 65
   }
  ],
  "signaturePick": "Rakan",
  "transferScore": 83,
  "scoutGrade": "A",
  "marketValueK": 1285,
  "salaryK": 141,
  "scoutingNote": "Veteran support: realistic leadership pickup for a transfer market."
 },
 {
  "id": "TR-SUP-13",
  "name": "whiteinn",
  "role": "SUPPORT",
  "fromTeam": "Ici Japon Corp. Esport",
  "league": "LFL",
  "division": "LFL",
  "nationality": "PL/EU",
  "level": 76,
  "potential": 77,
  "form": 76,
  "mental": 78,
  "shotcalling": 72,
  "laning": 68,
  "teamfight": 78,
  "mechanics": 74,
  "championPool": [
   "Rell",
   "Nautilus",
   "Alistar"
  ],
  "comforts": [
   {
    "champion": "Rell",
    "score": 84
   },
   {
    "champion": "Nautilus",
    "score": 79
   },
   {
    "champion": "Alistar",
    "score": 74
   },
   {
    "champion": "Rakan",
    "score": 69
   },
   {
    "champion": "Braum",
    "score": 64
   }
  ],
  "signaturePick": "Rell",
  "transferScore": 83,
  "scoutGrade": "A",
  "marketValueK": 1342,
  "salaryK": 148,
  "scoutingNote": "Low-cost support option with standard engage pool."
 },
 {
  "id": "TR-SUP-14",
  "name": "Mxe",
  "role": "SUPPORT",
  "fromTeam": "Esprit Shonen",
  "league": "LFL",
  "division": "LFL",
  "nationality": "FR/EU",
  "level": 75,
  "potential": 80,
  "form": 75,
  "mental": 75,
  "shotcalling": 70,
  "laning": 66,
  "teamfight": 76,
  "mechanics": 73,
  "championPool": [
   "Nautilus",
   "Leona",
   "Rell"
  ],
  "comforts": [
   {
    "champion": "Nautilus",
    "score": 83
   },
   {
    "champion": "Leona",
    "score": 78
   },
   {
    "champion": "Rell",
    "score": 73
   },
   {
    "champion": "Alistar",
    "score": 68
   },
   {
    "champion": "Braum",
    "score": 63
   }
  ],
  "signaturePick": "Nautilus",
  "transferScore": 82,
  "scoutGrade": "A",
  "marketValueK": 1383,
  "salaryK": 152,
  "scoutingNote": "Developmental support; easy to balance in a management game economy."
 },
 {
  "id": "TR-SUP-15",
  "name": "Steeelback",
  "role": "SUPPORT",
  "fromTeam": "Skillcamp",
  "league": "LFL",
  "division": "LFL",
  "nationality": "FR",
  "level": 75,
  "potential": 70,
  "form": 72,
  "mental": 84,
  "shotcalling": 74,
  "laning": 66,
  "teamfight": 76,
  "mechanics": 72,
  "championPool": [
   "Rakan",
   "Lulu",
   "Nami"
  ],
  "comforts": [
   {
    "champion": "Rakan",
    "score": 83
   },
   {
    "champion": "Lulu",
    "score": 78
   },
   {
    "champion": "Nami",
    "score": 73
   },
   {
    "champion": "Rell",
    "score": 68
   },
   {
    "champion": "Nautilus",
    "score": 63
   }
  ],
  "signaturePick": "Rakan",
  "transferScore": 80,
  "scoutGrade": "A",
  "marketValueK": 1236,
  "salaryK": 136,
  "scoutingNote": "Veteran role-swap/leadership style pick for realism and storylines."
 }
];
