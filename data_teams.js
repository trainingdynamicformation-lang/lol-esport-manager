// data_teams.js - Equipes IA (CDC 11.1)
// Genere depuis CDC/lol_esports_update_2026_major_balance_v2.xlsx
// (Teams_Rosters / DraftProfiles / MajorChampionPools_Extended)
// Passe d'equilibrage majeure : stats recalibrees, pools etendus a 5 champions
// avec masteries explicites (champ 'masteries' aligne sur championPool).
// Regions: LEC, LCK, LPL, LTAN, LTAS, LCP, LJL

const AI_TEAMS = [
  {
    "id": "fnc",
    "name": "Fnatic",
    "shortName": "FNC",
    "region": "LEC",
    "tier": 2,
    "style": "teamfight",
    "roster": [
      {
        "id": "fnc_top",
        "name": "Empyros",
        "baseAge": 20,
        "retirementAge": 29,
        "role": "TOP",
        "nationality": "EMEA",
        "level": 87,
        "potential": 98,
        "form": 69,
        "fatigue": 0,
        "mental": 87,
        "shotcalling": 80,
        "laning": 90,
        "teamfight": 87,
        "mechanics": 88,
        "championPool": [
          "Rumble",
          "Gnar",
          "K'Sante",
          "Kennen",
          "Sion"
        ],
        "traits": [
          "rookie"
        ],
        "masteries": [
          93,
          90,
          87,
          82,
          78
        ]
      },
      {
        "id": "fnc_jungle",
        "name": "Razork",
        "baseAge": 25,
        "retirementAge": 30,
        "role": "JUNGLE",
        "nationality": "EMEA",
        "level": 90,
        "potential": 93,
        "form": 65,
        "fatigue": 0,
        "mental": 95,
        "shotcalling": 99,
        "laning": 88,
        "teamfight": 94,
        "mechanics": 96,
        "championPool": [
          "Vi",
          "Jarvan IV",
          "Wukong",
          "Skarner",
          "Sejuani"
        ],
        "traits": [
          "igl",
          "leader",
          "mechanical"
        ],
        "masteries": [
          96,
          94,
          91,
          86,
          82
        ]
      },
      {
        "id": "fnc_mid",
        "name": "Vladi",
        "baseAge": 24,
        "retirementAge": 28,
        "role": "MID",
        "nationality": "EMEA",
        "level": 86,
        "potential": 89,
        "form": 80,
        "fatigue": 0,
        "mental": 89,
        "shotcalling": 84,
        "laning": 89,
        "teamfight": 89,
        "mechanics": 89,
        "championPool": [
          "Azir",
          "Ryze",
          "Orianna",
          "Viktor",
          "Hwei"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          93,
          90,
          87,
          82,
          78
        ]
      },
      {
        "id": "fnc_adc",
        "name": "Upset",
        "baseAge": 26,
        "retirementAge": 28,
        "role": "ADC",
        "nationality": "EMEA",
        "level": 86,
        "potential": 89,
        "form": 76,
        "fatigue": 0,
        "mental": 90,
        "shotcalling": 78,
        "laning": 90,
        "teamfight": 90,
        "mechanics": 91,
        "championPool": [
          "Ezreal",
          "Varus",
          "Aphelios",
          "Jinx",
          "Xayah"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          93,
          90,
          87,
          82,
          78
        ]
      },
      {
        "id": "fnc_support",
        "name": "Lospa",
        "baseAge": 23,
        "retirementAge": 29,
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 86,
        "potential": 89,
        "form": 69,
        "fatigue": 0,
        "mental": 88,
        "shotcalling": 89,
        "laning": 87,
        "teamfight": 88,
        "mechanics": 81,
        "championPool": [
          "Nautilus",
          "Rakan",
          "Bard",
          "Rell",
          "Braum"
        ],
        "traits": [],
        "masteries": [
          92,
          89,
          86,
          81,
          77
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "Rumble",
          "Gnar"
        ],
        "JUNGLE": [
          "Vi",
          "Jarvan IV"
        ],
        "MID": [
          "Azir",
          "Ryze"
        ],
        "ADC": [
          "Ezreal",
          "Varus"
        ],
        "SUPPORT": [
          "Nautilus",
          "Rakan"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 75
    }
  },
  {
    "id": "g2",
    "name": "G2 Esports",
    "shortName": "G2",
    "region": "LEC",
    "tier": 1,
    "style": "teamfight",
    "roster": [
      {
        "id": "g2_top",
        "name": "BrokenBlade",
        "baseAge": 26,
        "retirementAge": 29,
        "role": "TOP",
        "nationality": "EMEA",
        "level": 90,
        "potential": 93,
        "form": 71,
        "fatigue": 0,
        "mental": 87,
        "shotcalling": 84,
        "laning": 96,
        "teamfight": 91,
        "mechanics": 97,
        "championPool": [
          "K'Sante",
          "Jax",
          "Gnar",
          "Rumble",
          "Kennen"
        ],
        "traits": [
          "mechanical"
        ],
        "masteries": [
          96,
          94,
          91,
          87,
          83
        ]
      },
      {
        "id": "g2_jungle",
        "name": "SkewMond",
        "baseAge": 22,
        "retirementAge": 28,
        "role": "JUNGLE",
        "nationality": "EMEA",
        "level": 87,
        "potential": 90,
        "form": 72,
        "fatigue": 0,
        "mental": 88,
        "shotcalling": 93,
        "laning": 84,
        "teamfight": 89,
        "mechanics": 89,
        "championPool": [
          "Vi",
          "Nocturne",
          "Jarvan IV",
          "Wukong",
          "Skarner"
        ],
        "traits": [],
        "masteries": [
          94,
          91,
          88,
          83,
          79
        ]
      },
      {
        "id": "g2_mid",
        "name": "Caps",
        "baseAge": 26,
        "retirementAge": 32,
        "role": "MID",
        "nationality": "EMEA",
        "level": 95,
        "potential": 98,
        "form": 88,
        "fatigue": 0,
        "mental": 99,
        "shotcalling": 99,
        "laning": 99,
        "teamfight": 98,
        "mechanics": 99,
        "championPool": [
          "Ryze",
          "Azir",
          "Ahri",
          "Orianna",
          "Viktor"
        ],
        "traits": [
          "clutch",
          "consistant",
          "leader",
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          91,
          88
        ]
      },
      {
        "id": "g2_adc",
        "name": "Hans Sama",
        "baseAge": 26,
        "retirementAge": 28,
        "role": "ADC",
        "nationality": "EMEA",
        "level": 89,
        "potential": 92,
        "form": 84,
        "fatigue": 0,
        "mental": 89,
        "shotcalling": 81,
        "laning": 91,
        "teamfight": 97,
        "mechanics": 98,
        "championPool": [
          "Ezreal",
          "Varus",
          "Ashe",
          "Jinx",
          "Aphelios"
        ],
        "traits": [
          "consistant",
          "mechanical"
        ],
        "masteries": [
          96,
          94,
          91,
          87,
          83
        ]
      },
      {
        "id": "g2_support",
        "name": "Labrov",
        "baseAge": 25,
        "retirementAge": 30,
        "role": "SUPPORT",
        "nationality": "EMEA",
        "level": 89,
        "potential": 92,
        "form": 85,
        "fatigue": 0,
        "mental": 93,
        "shotcalling": 98,
        "laning": 86,
        "teamfight": 92,
        "mechanics": 84,
        "championPool": [
          "Nautilus",
          "Rakan",
          "Karma",
          "Rell",
          "Braum"
        ],
        "traits": [
          "consistant",
          "igl"
        ],
        "masteries": [
          96,
          94,
          91,
          86,
          82
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "K'Sante",
          "Jax"
        ],
        "JUNGLE": [
          "Vi",
          "Nocturne"
        ],
        "MID": [
          "Ryze",
          "Azir"
        ],
        "ADC": [
          "Ezreal",
          "Varus"
        ],
        "SUPPORT": [
          "Nautilus",
          "Rakan"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 80
    }
  },
  {
    "id": "gx",
    "name": "GIANTX",
    "shortName": "GX",
    "region": "LEC",
    "tier": 4,
    "style": "poke",
    "roster": [
      {
        "id": "gx_top",
        "name": "Lot",
        "baseAge": 22,
        "retirementAge": 26,
        "role": "TOP",
        "nationality": "EMEA",
        "level": 72,
        "potential": 75,
        "form": 52,
        "fatigue": 0,
        "mental": 70,
        "shotcalling": 67,
        "laning": 75,
        "teamfight": 73,
        "mechanics": 74,
        "championPool": [
          "Jayce",
          "Kennen",
          "Rumble",
          "Gnar",
          "Gangplank"
        ],
        "traits": [],
        "masteries": [
          76,
          73,
          69,
          64,
          60
        ]
      },
      {
        "id": "gx_jungle",
        "name": "ISMA",
        "baseAge": 21,
        "retirementAge": 26,
        "role": "JUNGLE",
        "nationality": "EMEA",
        "level": 77,
        "potential": 80,
        "form": 70,
        "fatigue": 0,
        "mental": 79,
        "shotcalling": 82,
        "laning": 73,
        "teamfight": 81,
        "mechanics": 78,
        "championPool": [
          "Nidalee",
          "Graves",
          "Ivern",
          "Elise",
          "Jarvan IV"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          82,
          79,
          75,
          70,
          66
        ]
      },
      {
        "id": "gx_mid",
        "name": "Jackies",
        "baseAge": 22,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "EMEA",
        "level": 77,
        "potential": 80,
        "form": 58,
        "fatigue": 0,
        "mental": 75,
        "shotcalling": 78,
        "laning": 80,
        "teamfight": 78,
        "mechanics": 82,
        "championPool": [
          "Orianna",
          "Hwei",
          "Zoe",
          "Corki",
          "LeBlanc"
        ],
        "traits": [],
        "masteries": [
          81,
          78,
          74,
          69,
          65
        ]
      },
      {
        "id": "gx_adc",
        "name": "Noah",
        "baseAge": 26,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "KR",
        "level": 73,
        "potential": 76,
        "form": 60,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 65,
        "laning": 74,
        "teamfight": 80,
        "mechanics": 77,
        "championPool": [
          "Ezreal",
          "Varus",
          "Caitlyn",
          "Ashe",
          "Kai'Sa"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          78,
          75,
          71,
          66,
          62
        ]
      },
      {
        "id": "gx_support",
        "name": "Jun",
        "baseAge": 26,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 78,
        "potential": 81,
        "form": 63,
        "fatigue": 0,
        "mental": 80,
        "shotcalling": 85,
        "laning": 76,
        "teamfight": 84,
        "mechanics": 74,
        "championPool": [
          "Karma",
          "Milio",
          "Nami",
          "Bard",
          "Lulu"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          83,
          80,
          76,
          71,
          67
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Varus",
        "Ezreal",
        "Jayce",
        "Hwei",
        "Karma"
      ],
      "comfortPicks": {
        "TOP": [
          "Jayce",
          "Kennen"
        ],
        "JUNGLE": [
          "Nidalee",
          "Graves"
        ],
        "MID": [
          "Orianna",
          "Hwei"
        ],
        "ADC": [
          "Ezreal",
          "Varus"
        ],
        "SUPPORT": [
          "Karma",
          "Milio"
        ]
      },
      "flexPicks": [
        "Karma",
        "Jayce"
      ],
      "riskTolerance": 69
    }
  },
  {
    "id": "kc",
    "name": "Karmine Corp",
    "shortName": "KC",
    "region": "LEC",
    "tier": 2,
    "style": "pick",
    "roster": [
      {
        "id": "kc_top",
        "name": "Canna",
        "baseAge": 26,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "KR",
        "level": 84,
        "potential": 87,
        "form": 77,
        "fatigue": 0,
        "mental": 88,
        "shotcalling": 80,
        "laning": 88,
        "teamfight": 85,
        "mechanics": 86,
        "championPool": [
          "Rumble",
          "Gnar",
          "Renekton",
          "Kennen",
          "Sion"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          91,
          88,
          85,
          80,
          76
        ]
      },
      {
        "id": "kc_jungle",
        "name": "Yike",
        "baseAge": 25,
        "retirementAge": 27,
        "role": "JUNGLE",
        "nationality": "EMEA",
        "level": 82,
        "potential": 85,
        "form": 65,
        "fatigue": 0,
        "mental": 82,
        "shotcalling": 87,
        "laning": 76,
        "teamfight": 87,
        "mechanics": 83,
        "championPool": [
          "Elise",
          "Vi",
          "Lee Sin",
          "Nocturne",
          "Pantheon"
        ],
        "traits": [],
        "masteries": [
          88,
          85,
          82,
          77,
          73
        ]
      },
      {
        "id": "kc_mid",
        "name": "kyeahoo",
        "baseAge": 19,
        "retirementAge": 29,
        "role": "MID",
        "nationality": "KR",
        "level": 89,
        "potential": 99,
        "form": 80,
        "fatigue": 0,
        "mental": 92,
        "shotcalling": 91,
        "laning": 93,
        "teamfight": 90,
        "mechanics": 97,
        "championPool": [
          "Taliyah",
          "LeBlanc",
          "Ahri",
          "Twisted Fate",
          "Syndra"
        ],
        "traits": [
          "consistant",
          "mechanical",
          "rookie"
        ],
        "masteries": [
          96,
          94,
          91,
          86,
          82
        ]
      },
      {
        "id": "kc_adc",
        "name": "Caliste",
        "baseAge": 19,
        "retirementAge": 29,
        "role": "ADC",
        "nationality": "EMEA",
        "level": 88,
        "potential": 99,
        "form": 70,
        "fatigue": 0,
        "mental": 86,
        "shotcalling": 80,
        "laning": 91,
        "teamfight": 94,
        "mechanics": 99,
        "championPool": [
          "Varus",
          "Ezreal",
          "Yunara",
          "Ashe",
          "Caitlyn"
        ],
        "traits": [
          "mechanical",
          "rookie"
        ],
        "masteries": [
          95,
          92,
          89,
          84,
          80
        ]
      },
      {
        "id": "kc_support",
        "name": "Busio",
        "baseAge": 25,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "EMEA",
        "level": 82,
        "potential": 85,
        "form": 78,
        "fatigue": 0,
        "mental": 88,
        "shotcalling": 90,
        "laning": 84,
        "teamfight": 84,
        "mechanics": 78,
        "championPool": [
          "Rakan",
          "Bard",
          "Nautilus",
          "Thresh",
          "Pyke"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          89,
          86,
          83,
          78,
          74
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "LeBlanc",
        "Vi",
        "Varus",
        "Nautilus",
        "Rakan"
      ],
      "comfortPicks": {
        "TOP": [
          "Rumble",
          "Gnar"
        ],
        "JUNGLE": [
          "Elise",
          "Vi"
        ],
        "MID": [
          "Taliyah",
          "LeBlanc"
        ],
        "ADC": [
          "Varus",
          "Ezreal"
        ],
        "SUPPORT": [
          "Rakan",
          "Bard"
        ]
      },
      "flexPicks": [
        "Pantheon",
        "Taliyah"
      ],
      "riskTolerance": 85
    }
  },
  {
    "id": "mkoi",
    "name": "Movistar KOI",
    "shortName": "MKOI",
    "region": "LEC",
    "tier": 1,
    "style": "teamfight",
    "roster": [
      {
        "id": "mkoi_top",
        "name": "Myrwn",
        "baseAge": 25,
        "retirementAge": 29,
        "role": "TOP",
        "nationality": "EMEA",
        "level": 92,
        "potential": 95,
        "form": 82,
        "fatigue": 0,
        "mental": 91,
        "shotcalling": 87,
        "laning": 99,
        "teamfight": 91,
        "mechanics": 98,
        "championPool": [
          "K'Sante",
          "Rumble",
          "Gnar",
          "Kennen",
          "Sion"
        ],
        "traits": [
          "consistant",
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          90,
          86
        ]
      },
      {
        "id": "mkoi_jungle",
        "name": "Elyoya",
        "baseAge": 26,
        "retirementAge": 30,
        "role": "JUNGLE",
        "nationality": "EMEA",
        "level": 91,
        "potential": 94,
        "form": 87,
        "fatigue": 0,
        "mental": 99,
        "shotcalling": 99,
        "laning": 86,
        "teamfight": 95,
        "mechanics": 92,
        "championPool": [
          "Jarvan IV",
          "Vi",
          "Lee Sin",
          "Wukong",
          "Skarner"
        ],
        "traits": [
          "clutch",
          "consistant",
          "igl",
          "leader"
        ],
        "masteries": [
          96,
          94,
          91,
          87,
          84
        ]
      },
      {
        "id": "mkoi_mid",
        "name": "Jojopyun",
        "baseAge": 21,
        "retirementAge": 29,
        "role": "MID",
        "nationality": "NA",
        "level": 90,
        "potential": 93,
        "form": 89,
        "fatigue": 0,
        "mental": 91,
        "shotcalling": 89,
        "laning": 96,
        "teamfight": 92,
        "mechanics": 99,
        "championPool": [
          "LeBlanc",
          "Ahri",
          "Akali",
          "Orianna",
          "Azir"
        ],
        "traits": [
          "consistant",
          "mechanical"
        ],
        "masteries": [
          96,
          94,
          91,
          87,
          84
        ]
      },
      {
        "id": "mkoi_adc",
        "name": "Supa",
        "baseAge": 24,
        "retirementAge": 29,
        "role": "ADC",
        "nationality": "EMEA",
        "level": 90,
        "potential": 93,
        "form": 70,
        "fatigue": 0,
        "mental": 90,
        "shotcalling": 85,
        "laning": 91,
        "teamfight": 97,
        "mechanics": 99,
        "championPool": [
          "Ashe",
          "Ezreal",
          "Varus",
          "Jinx",
          "Aphelios"
        ],
        "traits": [
          "mechanical"
        ],
        "masteries": [
          96,
          94,
          91,
          87,
          83
        ]
      },
      {
        "id": "mkoi_support",
        "name": "Alvaro",
        "baseAge": 23,
        "retirementAge": 31,
        "role": "SUPPORT",
        "nationality": "EMEA",
        "level": 90,
        "potential": 93,
        "form": 88,
        "fatigue": 0,
        "mental": 95,
        "shotcalling": 99,
        "laning": 92,
        "teamfight": 95,
        "mechanics": 87,
        "championPool": [
          "Bard",
          "Nautilus",
          "Rakan",
          "Rell",
          "Braum"
        ],
        "traits": [
          "consistant",
          "igl"
        ],
        "masteries": [
          96,
          94,
          91,
          87,
          83
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "K'Sante",
          "Rumble"
        ],
        "JUNGLE": [
          "Jarvan IV",
          "Vi"
        ],
        "MID": [
          "LeBlanc",
          "Ahri"
        ],
        "ADC": [
          "Ashe",
          "Ezreal"
        ],
        "SUPPORT": [
          "Bard",
          "Nautilus"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 80
    }
  },
  {
    "id": "navi",
    "name": "Natus Vincere",
    "shortName": "NAVI",
    "region": "LEC",
    "tier": 5,
    "style": "pick",
    "roster": [
      {
        "id": "navi_top",
        "name": "Maynter",
        "baseAge": 23,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "EMEA",
        "level": 73,
        "potential": 76,
        "form": 65,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 70,
        "laning": 76,
        "teamfight": 75,
        "mechanics": 74,
        "championPool": [
          "Renekton",
          "Kennen",
          "Jayce",
          "Jax",
          "Camille"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          77,
          74,
          70,
          65,
          61
        ]
      },
      {
        "id": "navi_jungle",
        "name": "Rhilech",
        "baseAge": 23,
        "retirementAge": 24,
        "role": "JUNGLE",
        "nationality": "EMEA",
        "level": 68,
        "potential": 71,
        "form": 50,
        "fatigue": 0,
        "mental": 64,
        "shotcalling": 73,
        "laning": 61,
        "teamfight": 70,
        "mechanics": 70,
        "championPool": [
          "Elise",
          "Vi",
          "Lee Sin",
          "Nocturne",
          "Pantheon"
        ],
        "traits": [
          "tiltable"
        ],
        "masteries": [
          71,
          68,
          64,
          59,
          55
        ]
      },
      {
        "id": "navi_mid",
        "name": "Poby",
        "baseAge": 24,
        "retirementAge": 25,
        "role": "MID",
        "nationality": "KR",
        "level": 68,
        "potential": 71,
        "form": 50,
        "fatigue": 0,
        "mental": 65,
        "shotcalling": 68,
        "laning": 70,
        "teamfight": 73,
        "mechanics": 72,
        "championPool": [
          "Taliyah",
          "LeBlanc",
          "Ahri",
          "Twisted Fate",
          "Syndra"
        ],
        "traits": [
          "tiltable"
        ],
        "masteries": [
          71,
          68,
          64,
          59,
          55
        ]
      },
      {
        "id": "navi_adc",
        "name": "SamD",
        "baseAge": 23,
        "retirementAge": 26,
        "role": "ADC",
        "nationality": "KR",
        "level": 70,
        "potential": 73,
        "form": 64,
        "fatigue": 0,
        "mental": 72,
        "shotcalling": 65,
        "laning": 73,
        "teamfight": 75,
        "mechanics": 76,
        "championPool": [
          "Caitlyn",
          "Kai'Sa",
          "Varus",
          "Ashe",
          "Ezreal"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          74,
          71,
          67,
          62,
          58
        ]
      },
      {
        "id": "navi_support",
        "name": "Parus",
        "baseAge": 25,
        "retirementAge": 27,
        "role": "SUPPORT",
        "nationality": "EMEA",
        "level": 68,
        "potential": 71,
        "form": 55,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 72,
        "laning": 65,
        "teamfight": 69,
        "mechanics": 66,
        "championPool": [
          "Pyke",
          "Nautilus",
          "Thresh",
          "Rakan",
          "Bard"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          72,
          69,
          65,
          60,
          56
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "LeBlanc",
        "Vi",
        "Varus",
        "Nautilus",
        "Rakan"
      ],
      "comfortPicks": {
        "TOP": [
          "Renekton",
          "Kennen"
        ],
        "JUNGLE": [
          "Elise",
          "Vi"
        ],
        "MID": [
          "Taliyah",
          "LeBlanc"
        ],
        "ADC": [
          "Caitlyn",
          "Kai'Sa"
        ],
        "SUPPORT": [
          "Pyke",
          "Nautilus"
        ]
      },
      "flexPicks": [
        "Pantheon",
        "Taliyah"
      ],
      "riskTolerance": 70
    }
  },
  {
    "id": "shf",
    "name": "Shifters",
    "shortName": "SHF",
    "region": "LEC",
    "tier": 4,
    "style": "splitpush",
    "roster": [
      {
        "id": "shf_top",
        "name": "Rooster",
        "baseAge": 24,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "KR",
        "level": 75,
        "potential": 78,
        "form": 62,
        "fatigue": 0,
        "mental": 79,
        "shotcalling": 73,
        "laning": 80,
        "teamfight": 74,
        "mechanics": 77,
        "championPool": [
          "Jax",
          "Fiora",
          "Camille",
          "Gwen",
          "Gangplank"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          80,
          77,
          73,
          68,
          64
        ]
      },
      {
        "id": "shf_jungle",
        "name": "Boukada",
        "baseAge": 26,
        "retirementAge": 26,
        "role": "JUNGLE",
        "nationality": "EMEA",
        "level": 75,
        "potential": 78,
        "form": 63,
        "fatigue": 0,
        "mental": 75,
        "shotcalling": 81,
        "laning": 68,
        "teamfight": 77,
        "mechanics": 76,
        "championPool": [
          "Viego",
          "Lee Sin",
          "Nocturne",
          "Vi",
          "Wukong"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          80,
          77,
          73,
          68,
          64
        ]
      },
      {
        "id": "shf_mid",
        "name": "nuc",
        "baseAge": 23,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "EMEA",
        "level": 78,
        "potential": 81,
        "form": 53,
        "fatigue": 0,
        "mental": 77,
        "shotcalling": 78,
        "laning": 81,
        "teamfight": 80,
        "mechanics": 82,
        "championPool": [
          "Ryze",
          "Akali",
          "Twisted Fate",
          "Yone",
          "LeBlanc"
        ],
        "traits": [],
        "masteries": [
          82,
          79,
          75,
          70,
          66
        ]
      },
      {
        "id": "shf_adc",
        "name": "Paduck",
        "baseAge": 20,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "KR",
        "level": 77,
        "potential": 80,
        "form": 54,
        "fatigue": 0,
        "mental": 75,
        "shotcalling": 71,
        "laning": 79,
        "teamfight": 83,
        "mechanics": 84,
        "championPool": [
          "Vayne",
          "Ezreal",
          "Kai'Sa",
          "Lucian",
          "Xayah"
        ],
        "traits": [],
        "masteries": [
          81,
          78,
          74,
          69,
          65
        ]
      },
      {
        "id": "shf_support",
        "name": "Trymbi",
        "baseAge": 26,
        "retirementAge": 27,
        "role": "SUPPORT",
        "nationality": "EMEA",
        "level": 72,
        "potential": 75,
        "form": 60,
        "fatigue": 0,
        "mental": 77,
        "shotcalling": 77,
        "laning": 72,
        "teamfight": 76,
        "mechanics": 67,
        "championPool": [
          "Bard",
          "Tahm Kench",
          "Rakan",
          "Thresh",
          "Nautilus"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          77,
          74,
          70,
          65,
          61
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Jax",
        "Fiora",
        "Twisted Fate",
        "Nocturne",
        "Vayne"
      ],
      "comfortPicks": {
        "TOP": [
          "Jax",
          "Fiora"
        ],
        "JUNGLE": [
          "Viego",
          "Lee Sin"
        ],
        "MID": [
          "Ryze",
          "Akali"
        ],
        "ADC": [
          "Vayne",
          "Ezreal"
        ],
        "SUPPORT": [
          "Bard",
          "Tahm Kench"
        ]
      },
      "flexPicks": [
        "Ryze",
        "Vayne"
      ],
      "riskTolerance": 73
    }
  },
  {
    "id": "sk",
    "name": "SK Gaming",
    "shortName": "SK",
    "region": "LEC",
    "tier": 4,
    "style": "siege",
    "roster": [
      {
        "id": "sk_top",
        "name": "Wunder",
        "baseAge": 27,
        "retirementAge": 28,
        "role": "TOP",
        "nationality": "EMEA",
        "level": 72,
        "potential": 73,
        "form": 56,
        "fatigue": 0,
        "mental": 80,
        "shotcalling": 70,
        "laning": 77,
        "teamfight": 74,
        "mechanics": 75,
        "championPool": [
          "Sion",
          "Gnar",
          "Ornn",
          "Jayce",
          "Gangplank"
        ],
        "traits": [
          "consistant",
          "veteran"
        ],
        "masteries": [
          77,
          74,
          70,
          65,
          61
        ]
      },
      {
        "id": "sk_jungle",
        "name": "Skeanz",
        "baseAge": 25,
        "retirementAge": 26,
        "role": "JUNGLE",
        "nationality": "EMEA",
        "level": 76,
        "potential": 79,
        "form": 55,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 80,
        "laning": 69,
        "teamfight": 80,
        "mechanics": 79,
        "championPool": [
          "Jarvan IV",
          "Sejuani",
          "Maokai",
          "Nidalee",
          "Graves"
        ],
        "traits": [],
        "masteries": [
          80,
          77,
          73,
          68,
          64
        ]
      },
      {
        "id": "sk_mid",
        "name": "LIDER",
        "baseAge": 23,
        "retirementAge": 26,
        "role": "MID",
        "nationality": "EMEA",
        "level": 72,
        "potential": 75,
        "form": 60,
        "fatigue": 0,
        "mental": 72,
        "shotcalling": 70,
        "laning": 76,
        "teamfight": 73,
        "mechanics": 75,
        "championPool": [
          "Orianna",
          "Azir",
          "Viktor",
          "Corki",
          "Hwei"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          77,
          74,
          70,
          65,
          61
        ]
      },
      {
        "id": "sk_adc",
        "name": "Jopa",
        "baseAge": 24,
        "retirementAge": 26,
        "role": "ADC",
        "nationality": "EMEA",
        "level": 72,
        "potential": 75,
        "form": 64,
        "fatigue": 0,
        "mental": 73,
        "shotcalling": 64,
        "laning": 75,
        "teamfight": 78,
        "mechanics": 78,
        "championPool": [
          "Jinx",
          "Aphelios",
          "Caitlyn",
          "Varus",
          "Ezreal"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          77,
          74,
          70,
          65,
          61
        ]
      },
      {
        "id": "sk_support",
        "name": "Mikyx",
        "baseAge": 27,
        "retirementAge": 32,
        "role": "SUPPORT",
        "nationality": "EMEA",
        "level": 86,
        "potential": 91,
        "form": 56,
        "fatigue": 0,
        "mental": 97,
        "shotcalling": 97,
        "laning": 85,
        "teamfight": 90,
        "mechanics": 81,
        "championPool": [
          "Rakan",
          "Braum",
          "Nautilus",
          "Karma",
          "Milio"
        ],
        "traits": [
          "clutch",
          "igl",
          "veteran"
        ],
        "masteries": [
          91,
          88,
          84,
          79,
          75
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Caitlyn",
        "Azir",
        "Jinx",
        "Lulu",
        "Rumble"
      ],
      "comfortPicks": {
        "TOP": [
          "Sion",
          "Gnar"
        ],
        "JUNGLE": [
          "Jarvan IV",
          "Sejuani"
        ],
        "MID": [
          "Orianna",
          "Azir"
        ],
        "ADC": [
          "Jinx",
          "Aphelios"
        ],
        "SUPPORT": [
          "Rakan",
          "Braum"
        ]
      },
      "flexPicks": [
        "Tristana",
        "Sion"
      ],
      "riskTolerance": 62
    }
  },
  {
    "id": "th",
    "name": "Team Heretics",
    "shortName": "TH",
    "region": "LEC",
    "tier": 3,
    "style": "pick",
    "roster": [
      {
        "id": "th_top",
        "name": "Tracyn",
        "baseAge": 23,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "EMEA",
        "level": 83,
        "potential": 86,
        "form": 76,
        "fatigue": 0,
        "mental": 85,
        "shotcalling": 77,
        "laning": 89,
        "teamfight": 86,
        "mechanics": 85,
        "championPool": [
          "Kennen",
          "Jayce",
          "Renekton",
          "Jax",
          "Camille"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          89,
          86,
          83,
          78,
          74
        ]
      },
      {
        "id": "th_jungle",
        "name": "Daglas",
        "baseAge": 24,
        "retirementAge": 27,
        "role": "JUNGLE",
        "nationality": "EMEA",
        "level": 82,
        "potential": 85,
        "form": 70,
        "fatigue": 0,
        "mental": 85,
        "shotcalling": 86,
        "laning": 77,
        "teamfight": 86,
        "mechanics": 82,
        "championPool": [
          "Vi",
          "Lee Sin",
          "Elise",
          "Nocturne",
          "Pantheon"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          88,
          85,
          82,
          77,
          73
        ]
      },
      {
        "id": "th_mid",
        "name": "Serin",
        "baseAge": 22,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "EMEA",
        "level": 77,
        "potential": 80,
        "form": 73,
        "fatigue": 0,
        "mental": 78,
        "shotcalling": 76,
        "laning": 81,
        "teamfight": 79,
        "mechanics": 82,
        "championPool": [
          "Ahri",
          "Taliyah",
          "LeBlanc",
          "Twisted Fate",
          "Syndra"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          83,
          80,
          77,
          72,
          68
        ]
      },
      {
        "id": "th_adc",
        "name": "Ice",
        "baseAge": 22,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "KR",
        "level": 82,
        "potential": 85,
        "form": 63,
        "fatigue": 0,
        "mental": 82,
        "shotcalling": 75,
        "laning": 84,
        "teamfight": 86,
        "mechanics": 89,
        "championPool": [
          "Varus",
          "Caitlyn",
          "Kai'Sa",
          "Ashe",
          "Ezreal"
        ],
        "traits": [],
        "masteries": [
          87,
          84,
          81,
          76,
          72
        ]
      },
      {
        "id": "th_support",
        "name": "Way",
        "baseAge": 23,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 78,
        "potential": 81,
        "form": 58,
        "fatigue": 0,
        "mental": 81,
        "shotcalling": 81,
        "laning": 75,
        "teamfight": 81,
        "mechanics": 74,
        "championPool": [
          "Nautilus",
          "Thresh",
          "Pyke",
          "Rakan",
          "Bard"
        ],
        "traits": [],
        "masteries": [
          83,
          80,
          77,
          72,
          68
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "LeBlanc",
        "Vi",
        "Varus",
        "Nautilus",
        "Rakan"
      ],
      "comfortPicks": {
        "TOP": [
          "Kennen",
          "Jayce"
        ],
        "JUNGLE": [
          "Vi",
          "Lee Sin"
        ],
        "MID": [
          "Ahri",
          "Taliyah"
        ],
        "ADC": [
          "Varus",
          "Caitlyn"
        ],
        "SUPPORT": [
          "Nautilus",
          "Thresh"
        ]
      },
      "flexPicks": [
        "Pantheon",
        "Taliyah"
      ],
      "riskTolerance": 80
    }
  },
  {
    "id": "vit",
    "name": "Team Vitality",
    "shortName": "VIT",
    "region": "LEC",
    "tier": 3,
    "style": "teamfight",
    "roster": [
      {
        "id": "vit_top",
        "name": "Naak",
        "baseAge": 22,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "EMEA",
        "level": 83,
        "potential": 86,
        "form": 74,
        "fatigue": 0,
        "mental": 86,
        "shotcalling": 76,
        "laning": 86,
        "teamfight": 86,
        "mechanics": 86,
        "championPool": [
          "Rumble",
          "Gnar",
          "K'Sante",
          "Kennen",
          "Sion"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          89,
          86,
          83,
          78,
          74
        ]
      },
      {
        "id": "vit_jungle",
        "name": "Lyncas",
        "baseAge": 24,
        "retirementAge": 26,
        "role": "JUNGLE",
        "nationality": "EMEA",
        "level": 79,
        "potential": 82,
        "form": 72,
        "fatigue": 0,
        "mental": 81,
        "shotcalling": 87,
        "laning": 74,
        "teamfight": 81,
        "mechanics": 82,
        "championPool": [
          "Vi",
          "Nocturne",
          "Jarvan IV",
          "Wukong",
          "Skarner"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          85,
          82,
          79,
          74,
          70
        ]
      },
      {
        "id": "vit_mid",
        "name": "Humanoid",
        "baseAge": 26,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "EMEA",
        "level": 81,
        "potential": 84,
        "form": 63,
        "fatigue": 0,
        "mental": 78,
        "shotcalling": 82,
        "laning": 84,
        "teamfight": 83,
        "mechanics": 84,
        "championPool": [
          "Orianna",
          "Azir",
          "LeBlanc",
          "Ryze",
          "Viktor"
        ],
        "traits": [],
        "masteries": [
          86,
          83,
          80,
          75,
          71
        ]
      },
      {
        "id": "vit_adc",
        "name": "Carzzy",
        "baseAge": 24,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "EMEA",
        "level": 83,
        "potential": 86,
        "form": 73,
        "fatigue": 0,
        "mental": 83,
        "shotcalling": 77,
        "laning": 85,
        "teamfight": 87,
        "mechanics": 87,
        "championPool": [
          "Ashe",
          "Ezreal",
          "Varus",
          "Jinx",
          "Aphelios"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          89,
          86,
          83,
          78,
          74
        ]
      },
      {
        "id": "vit_support",
        "name": "Fleshy",
        "baseAge": 25,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "EMEA",
        "level": 79,
        "potential": 82,
        "form": 69,
        "fatigue": 0,
        "mental": 84,
        "shotcalling": 84,
        "laning": 80,
        "teamfight": 84,
        "mechanics": 76,
        "championPool": [
          "Nautilus",
          "Rakan",
          "Bard",
          "Rell",
          "Braum"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          85,
          82,
          79,
          74,
          70
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "Rumble",
          "Gnar"
        ],
        "JUNGLE": [
          "Vi",
          "Nocturne"
        ],
        "MID": [
          "Orianna",
          "Azir"
        ],
        "ADC": [
          "Ashe",
          "Ezreal"
        ],
        "SUPPORT": [
          "Nautilus",
          "Rakan"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 70
    }
  },
  {
    "id": "fx",
    "name": "BNK FEARX",
    "shortName": "FX",
    "region": "LCK",
    "tier": 4,
    "style": "teamfight",
    "roster": [
      {
        "id": "fx_top",
        "name": "Clear",
        "baseAge": 26,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "KR",
        "level": 73,
        "potential": 76,
        "form": 64,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 68,
        "laning": 76,
        "teamfight": 76,
        "mechanics": 76,
        "championPool": [
          "Rumble",
          "Gnar",
          "K'Sante",
          "Kennen",
          "Sion"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          78,
          75,
          71,
          66,
          62
        ]
      },
      {
        "id": "fx_jungle",
        "name": "Raptor",
        "baseAge": 26,
        "retirementAge": 26,
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 73,
        "potential": 76,
        "form": 65,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 80,
        "laning": 66,
        "teamfight": 75,
        "mechanics": 76,
        "championPool": [
          "Nocturne",
          "Jarvan IV",
          "Vi",
          "Wukong",
          "Skarner"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          78,
          75,
          71,
          66,
          62
        ]
      },
      {
        "id": "fx_mid",
        "name": "VicLa",
        "baseAge": 23,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "KR",
        "level": 75,
        "potential": 78,
        "form": 64,
        "fatigue": 0,
        "mental": 79,
        "shotcalling": 72,
        "laning": 78,
        "teamfight": 79,
        "mechanics": 80,
        "championPool": [
          "Orianna",
          "Azir",
          "Ryze",
          "Viktor",
          "Hwei"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          80,
          77,
          73,
          68,
          64
        ]
      },
      {
        "id": "fx_adc",
        "name": "Diable",
        "baseAge": 21,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "KR",
        "level": 76,
        "potential": 79,
        "form": 63,
        "fatigue": 0,
        "mental": 77,
        "shotcalling": 68,
        "laning": 81,
        "teamfight": 80,
        "mechanics": 82,
        "championPool": [
          "Ashe",
          "Ezreal",
          "Varus",
          "Jinx",
          "Aphelios"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          81,
          78,
          74,
          69,
          65
        ]
      },
      {
        "id": "fx_support",
        "name": "Kellin",
        "baseAge": 23,
        "retirementAge": 27,
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 72,
        "potential": 75,
        "form": 70,
        "fatigue": 0,
        "mental": 73,
        "shotcalling": 78,
        "laning": 70,
        "teamfight": 74,
        "mechanics": 70,
        "championPool": [
          "Rakan",
          "Nautilus",
          "Lulu",
          "Rell",
          "Braum"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          77,
          74,
          70,
          65,
          61
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "Rumble",
          "Gnar"
        ],
        "JUNGLE": [
          "Nocturne",
          "Jarvan IV"
        ],
        "MID": [
          "Orianna",
          "Azir"
        ],
        "ADC": [
          "Ashe",
          "Ezreal"
        ],
        "SUPPORT": [
          "Rakan",
          "Nautilus"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 65
    }
  },
  {
    "id": "soop",
    "name": "DN SOOPers",
    "shortName": "SOOP",
    "region": "LCK",
    "tier": 5,
    "style": "pick",
    "roster": [
      {
        "id": "soop_top",
        "name": "DuDu",
        "baseAge": 25,
        "retirementAge": 25,
        "role": "TOP",
        "nationality": "KR",
        "level": 68,
        "potential": 71,
        "form": 65,
        "fatigue": 0,
        "mental": 66,
        "shotcalling": 64,
        "laning": 72,
        "teamfight": 69,
        "mechanics": 70,
        "championPool": [
          "Renekton",
          "Kennen",
          "Jayce",
          "Jax",
          "Camille"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ],
        "masteries": [
          72,
          69,
          65,
          60,
          56
        ]
      },
      {
        "id": "soop_jungle",
        "name": "Pyosik",
        "baseAge": 26,
        "retirementAge": 25,
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 69,
        "potential": 72,
        "form": 63,
        "fatigue": 0,
        "mental": 73,
        "shotcalling": 75,
        "laning": 66,
        "teamfight": 75,
        "mechanics": 68,
        "championPool": [
          "Vi",
          "Lee Sin",
          "Elise",
          "Nocturne",
          "Pantheon"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          73,
          70,
          66,
          61,
          57
        ]
      },
      {
        "id": "soop_mid",
        "name": "Clozer",
        "baseAge": 26,
        "retirementAge": 25,
        "role": "MID",
        "nationality": "KR",
        "level": 68,
        "potential": 71,
        "form": 64,
        "fatigue": 0,
        "mental": 68,
        "shotcalling": 68,
        "laning": 73,
        "teamfight": 69,
        "mechanics": 71,
        "championPool": [
          "Ahri",
          "Taliyah",
          "LeBlanc",
          "Twisted Fate",
          "Syndra"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ],
        "masteries": [
          72,
          69,
          65,
          60,
          56
        ]
      },
      {
        "id": "soop_adc",
        "name": "deokdam",
        "baseAge": 22,
        "retirementAge": 26,
        "role": "ADC",
        "nationality": "KR",
        "level": 70,
        "potential": 73,
        "form": 50,
        "fatigue": 0,
        "mental": 71,
        "shotcalling": 62,
        "laning": 73,
        "teamfight": 75,
        "mechanics": 74,
        "championPool": [
          "Kai'Sa",
          "Varus",
          "Caitlyn",
          "Ashe",
          "Ezreal"
        ],
        "traits": [],
        "masteries": [
          73,
          70,
          66,
          61,
          57
        ]
      },
      {
        "id": "soop_support",
        "name": "Life",
        "baseAge": 23,
        "retirementAge": 27,
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 72,
        "potential": 75,
        "form": 66,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 75,
        "laning": 73,
        "teamfight": 74,
        "mechanics": 67,
        "championPool": [
          "Pyke",
          "Nautilus",
          "Thresh",
          "Rakan",
          "Bard"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          76,
          73,
          69,
          64,
          60
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "LeBlanc",
        "Vi",
        "Varus",
        "Nautilus",
        "Rakan"
      ],
      "comfortPicks": {
        "TOP": [
          "Renekton",
          "Kennen"
        ],
        "JUNGLE": [
          "Vi",
          "Lee Sin"
        ],
        "MID": [
          "Ahri",
          "Taliyah"
        ],
        "ADC": [
          "Kai'Sa",
          "Varus"
        ],
        "SUPPORT": [
          "Pyke",
          "Nautilus"
        ]
      },
      "flexPicks": [
        "Pantheon",
        "Taliyah"
      ],
      "riskTolerance": 70
    }
  },
  {
    "id": "dk",
    "name": "Dplus Kia",
    "shortName": "DK",
    "region": "LCK",
    "tier": 2,
    "style": "teamfight",
    "roster": [
      {
        "id": "dk_top",
        "name": "Siwoo",
        "baseAge": 24,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "KR",
        "level": 82,
        "potential": 85,
        "form": 74,
        "fatigue": 0,
        "mental": 85,
        "shotcalling": 78,
        "laning": 87,
        "teamfight": 84,
        "mechanics": 86,
        "championPool": [
          "Gnar",
          "K'Sante",
          "Rumble",
          "Kennen",
          "Sion"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          89,
          86,
          83,
          78,
          74
        ]
      },
      {
        "id": "dk_jungle",
        "name": "Lucid",
        "baseAge": 24,
        "retirementAge": 29,
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 86,
        "potential": 89,
        "form": 64,
        "fatigue": 0,
        "mental": 88,
        "shotcalling": 97,
        "laning": 82,
        "teamfight": 89,
        "mechanics": 86,
        "championPool": [
          "Nocturne",
          "Jarvan IV",
          "Vi",
          "Wukong",
          "Skarner"
        ],
        "traits": [
          "igl"
        ],
        "masteries": [
          92,
          89,
          86,
          81,
          77
        ]
      },
      {
        "id": "dk_mid",
        "name": "ShowMaker",
        "baseAge": 25,
        "retirementAge": 30,
        "role": "MID",
        "nationality": "KR",
        "level": 92,
        "potential": 95,
        "form": 65,
        "fatigue": 0,
        "mental": 97,
        "shotcalling": 91,
        "laning": 96,
        "teamfight": 95,
        "mechanics": 99,
        "championPool": [
          "LeBlanc",
          "Syndra",
          "Azir",
          "Orianna",
          "Ryze"
        ],
        "traits": [
          "clutch",
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          89,
          85
        ]
      },
      {
        "id": "dk_adc",
        "name": "Smash",
        "baseAge": 20,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "KR",
        "level": 83,
        "potential": 94,
        "form": 71,
        "fatigue": 0,
        "mental": 81,
        "shotcalling": 77,
        "laning": 84,
        "teamfight": 90,
        "mechanics": 90,
        "championPool": [
          "Ashe",
          "Ezreal",
          "Varus",
          "Jinx",
          "Aphelios"
        ],
        "traits": [
          "consistant",
          "rookie"
        ],
        "masteries": [
          90,
          87,
          84,
          79,
          75
        ]
      },
      {
        "id": "dk_support",
        "name": "Career",
        "baseAge": 20,
        "retirementAge": 29,
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 87,
        "potential": 90,
        "form": 63,
        "fatigue": 0,
        "mental": 88,
        "shotcalling": 91,
        "laning": 89,
        "teamfight": 92,
        "mechanics": 82,
        "championPool": [
          "Nautilus",
          "Rakan",
          "Bard",
          "Rell",
          "Braum"
        ],
        "traits": [],
        "masteries": [
          93,
          90,
          87,
          82,
          78
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "Gnar",
          "K'Sante"
        ],
        "JUNGLE": [
          "Nocturne",
          "Jarvan IV"
        ],
        "MID": [
          "LeBlanc",
          "Syndra"
        ],
        "ADC": [
          "Ashe",
          "Ezreal"
        ],
        "SUPPORT": [
          "Nautilus",
          "Rakan"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 75
    }
  },
  {
    "id": "gen",
    "name": "Gen.G",
    "shortName": "GEN",
    "region": "LCK",
    "tier": 1,
    "style": "teamfight",
    "roster": [
      {
        "id": "gen_top",
        "name": "Kiin",
        "baseAge": 27,
        "retirementAge": 31,
        "role": "TOP",
        "nationality": "KR",
        "level": 95,
        "potential": 98,
        "form": 72,
        "fatigue": 0,
        "mental": 94,
        "shotcalling": 90,
        "laning": 99,
        "teamfight": 96,
        "mechanics": 99,
        "championPool": [
          "Gnar",
          "K'Sante",
          "Rumble",
          "Kennen",
          "Sion"
        ],
        "traits": [
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          91,
          88
        ]
      },
      {
        "id": "gen_jungle",
        "name": "Canyon",
        "baseAge": 25,
        "retirementAge": 32,
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 97,
        "potential": 98,
        "form": 85,
        "fatigue": 0,
        "mental": 99,
        "shotcalling": 99,
        "laning": 91,
        "teamfight": 99,
        "mechanics": 99,
        "championPool": [
          "Nidalee",
          "Lee Sin",
          "Viego",
          "Jarvan IV",
          "Wukong"
        ],
        "traits": [
          "clutch",
          "igl",
          "leader",
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          91,
          88
        ]
      },
      {
        "id": "gen_mid",
        "name": "Chovy",
        "baseAge": 25,
        "retirementAge": 32,
        "role": "MID",
        "nationality": "KR",
        "level": 97,
        "potential": 98,
        "form": 66,
        "fatigue": 0,
        "mental": 98,
        "shotcalling": 99,
        "laning": 99,
        "teamfight": 99,
        "mechanics": 99,
        "championPool": [
          "Yone",
          "Azir",
          "Corki",
          "Orianna",
          "Ryze"
        ],
        "traits": [
          "clutch",
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          91,
          88
        ]
      },
      {
        "id": "gen_adc",
        "name": "Ruler",
        "baseAge": 27,
        "retirementAge": 33,
        "role": "ADC",
        "nationality": "KR",
        "level": 97,
        "potential": 97,
        "form": 84,
        "fatigue": 0,
        "mental": 99,
        "shotcalling": 98,
        "laning": 98,
        "teamfight": 99,
        "mechanics": 99,
        "championPool": [
          "Varus",
          "Ezreal",
          "Jinx",
          "Aphelios",
          "Xayah"
        ],
        "traits": [
          "clutch",
          "leader",
          "mechanical",
          "veteran"
        ],
        "masteries": [
          97,
          96,
          94,
          91,
          88
        ]
      },
      {
        "id": "gen_support",
        "name": "Duro",
        "baseAge": 20,
        "retirementAge": 32,
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 91,
        "potential": 99,
        "form": 70,
        "fatigue": 0,
        "mental": 94,
        "shotcalling": 99,
        "laning": 93,
        "teamfight": 95,
        "mechanics": 87,
        "championPool": [
          "Rakan",
          "Bard",
          "Nautilus",
          "Rell",
          "Braum"
        ],
        "traits": [
          "igl",
          "rookie"
        ],
        "masteries": [
          96,
          94,
          91,
          87,
          83
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "Gnar",
          "K'Sante"
        ],
        "JUNGLE": [
          "Nidalee",
          "Lee Sin"
        ],
        "MID": [
          "Yone",
          "Azir"
        ],
        "ADC": [
          "Varus",
          "Ezreal"
        ],
        "SUPPORT": [
          "Rakan",
          "Bard"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 80
    }
  },
  {
    "id": "bro",
    "name": "HANJIN BRION",
    "shortName": "BRO",
    "region": "LCK",
    "tier": 3,
    "style": "siege",
    "roster": [
      {
        "id": "bro_top",
        "name": "Casting",
        "baseAge": 26,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "KR",
        "level": 80,
        "potential": 83,
        "form": 60,
        "fatigue": 0,
        "mental": 77,
        "shotcalling": 76,
        "laning": 83,
        "teamfight": 80,
        "mechanics": 82,
        "championPool": [
          "Sion",
          "Gnar",
          "Ornn",
          "Jayce",
          "Gangplank"
        ],
        "traits": [],
        "masteries": [
          85,
          82,
          79,
          74,
          70
        ]
      },
      {
        "id": "bro_jungle",
        "name": "GIDEON",
        "baseAge": 23,
        "retirementAge": 27,
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 82,
        "potential": 85,
        "form": 76,
        "fatigue": 0,
        "mental": 83,
        "shotcalling": 88,
        "laning": 79,
        "teamfight": 84,
        "mechanics": 83,
        "championPool": [
          "Maokai",
          "Jarvan IV",
          "Sejuani",
          "Nidalee",
          "Graves"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          88,
          85,
          82,
          77,
          73
        ]
      },
      {
        "id": "bro_mid",
        "name": "Roamer",
        "baseAge": 25,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "KR",
        "level": 83,
        "potential": 86,
        "form": 71,
        "fatigue": 0,
        "mental": 87,
        "shotcalling": 84,
        "laning": 89,
        "teamfight": 88,
        "mechanics": 87,
        "championPool": [
          "Viktor",
          "Orianna",
          "Azir",
          "Corki",
          "Hwei"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          89,
          86,
          83,
          78,
          74
        ]
      },
      {
        "id": "bro_adc",
        "name": "Teddy",
        "baseAge": 28,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "KR",
        "level": 81,
        "potential": 84,
        "form": 60,
        "fatigue": 0,
        "mental": 82,
        "shotcalling": 75,
        "laning": 86,
        "teamfight": 89,
        "mechanics": 85,
        "championPool": [
          "Jinx",
          "Aphelios",
          "Caitlyn",
          "Varus",
          "Ezreal"
        ],
        "traits": [],
        "masteries": [
          86,
          83,
          80,
          75,
          71
        ]
      },
      {
        "id": "bro_support",
        "name": "Namgung",
        "baseAge": 26,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 81,
        "potential": 84,
        "form": 75,
        "fatigue": 0,
        "mental": 84,
        "shotcalling": 86,
        "laning": 81,
        "teamfight": 83,
        "mechanics": 79,
        "championPool": [
          "Lulu",
          "Milio",
          "Karma",
          "Nami",
          "Thresh"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          87,
          84,
          81,
          76,
          72
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Caitlyn",
        "Azir",
        "Jinx",
        "Lulu",
        "Rumble"
      ],
      "comfortPicks": {
        "TOP": [
          "Sion",
          "Gnar"
        ],
        "JUNGLE": [
          "Maokai",
          "Jarvan IV"
        ],
        "MID": [
          "Viktor",
          "Orianna"
        ],
        "ADC": [
          "Jinx",
          "Aphelios"
        ],
        "SUPPORT": [
          "Lulu",
          "Milio"
        ]
      },
      "flexPicks": [
        "Tristana",
        "Sion"
      ],
      "riskTolerance": 67
    }
  },
  {
    "id": "hle",
    "name": "Hanwha Life Esports",
    "shortName": "HLE",
    "region": "LCK",
    "tier": 1,
    "style": "teamfight",
    "roster": [
      {
        "id": "hle_top",
        "name": "Zeus",
        "baseAge": 22,
        "retirementAge": 32,
        "role": "TOP",
        "nationality": "KR",
        "level": 97,
        "potential": 98,
        "form": 75,
        "fatigue": 0,
        "mental": 98,
        "shotcalling": 95,
        "laning": 99,
        "teamfight": 99,
        "mechanics": 99,
        "championPool": [
          "Gwen",
          "Jayce",
          "Rumble",
          "Gnar",
          "Kennen"
        ],
        "traits": [
          "clutch",
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          91,
          88
        ]
      },
      {
        "id": "hle_jungle",
        "name": "Kanavi",
        "baseAge": 25,
        "retirementAge": 32,
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 97,
        "potential": 98,
        "form": 79,
        "fatigue": 0,
        "mental": 99,
        "shotcalling": 99,
        "laning": 91,
        "teamfight": 99,
        "mechanics": 99,
        "championPool": [
          "Jarvan IV",
          "Lee Sin",
          "Viego",
          "Wukong",
          "Skarner"
        ],
        "traits": [
          "clutch",
          "igl",
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          91,
          88
        ]
      },
      {
        "id": "hle_mid",
        "name": "Zeka",
        "baseAge": 23,
        "retirementAge": 30,
        "role": "MID",
        "nationality": "KR",
        "level": 94,
        "potential": 97,
        "form": 84,
        "fatigue": 0,
        "mental": 93,
        "shotcalling": 96,
        "laning": 97,
        "teamfight": 99,
        "mechanics": 99,
        "championPool": [
          "Akali",
          "Yone",
          "Ahri",
          "Orianna",
          "Azir"
        ],
        "traits": [
          "consistant",
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          91,
          88
        ]
      },
      {
        "id": "hle_adc",
        "name": "Gumayusi",
        "baseAge": 24,
        "retirementAge": 31,
        "role": "ADC",
        "nationality": "KR",
        "level": 95,
        "potential": 98,
        "form": 73,
        "fatigue": 0,
        "mental": 93,
        "shotcalling": 87,
        "laning": 97,
        "teamfight": 99,
        "mechanics": 99,
        "championPool": [
          "Varus",
          "Jinx",
          "Caitlyn",
          "Aphelios",
          "Xayah"
        ],
        "traits": [
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          91,
          88
        ]
      },
      {
        "id": "hle_support",
        "name": "Delight",
        "baseAge": 23,
        "retirementAge": 33,
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 95,
        "potential": 98,
        "form": 77,
        "fatigue": 0,
        "mental": 99,
        "shotcalling": 99,
        "laning": 95,
        "teamfight": 99,
        "mechanics": 95,
        "championPool": [
          "Rakan",
          "Rell",
          "Nautilus",
          "Braum",
          "Renata Glasc"
        ],
        "traits": [
          "clutch",
          "igl",
          "leader",
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          91,
          88
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "Gwen",
          "Jayce"
        ],
        "JUNGLE": [
          "Jarvan IV",
          "Lee Sin"
        ],
        "MID": [
          "Akali",
          "Yone"
        ],
        "ADC": [
          "Varus",
          "Jinx"
        ],
        "SUPPORT": [
          "Rakan",
          "Rell"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 80
    }
  },
  {
    "id": "drx",
    "name": "Kiwoom DRX",
    "shortName": "DRX",
    "region": "LCK",
    "tier": 4,
    "style": "pick",
    "roster": [
      {
        "id": "drx_top",
        "name": "Rich",
        "baseAge": 25,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "KR",
        "level": 76,
        "potential": 79,
        "form": 70,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 70,
        "laning": 79,
        "teamfight": 79,
        "mechanics": 78,
        "championPool": [
          "Jayce",
          "Renekton",
          "Kennen",
          "Jax",
          "Camille"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          81,
          78,
          74,
          69,
          65
        ]
      },
      {
        "id": "drx_jungle",
        "name": "Willer",
        "baseAge": 23,
        "retirementAge": 26,
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 75,
        "potential": 78,
        "form": 70,
        "fatigue": 0,
        "mental": 78,
        "shotcalling": 83,
        "laning": 71,
        "teamfight": 77,
        "mechanics": 74,
        "championPool": [
          "Lee Sin",
          "Elise",
          "Vi",
          "Nocturne",
          "Pantheon"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          80,
          77,
          73,
          68,
          64
        ]
      },
      {
        "id": "drx_mid",
        "name": "Ucal",
        "baseAge": 22,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "KR",
        "level": 73,
        "potential": 76,
        "form": 68,
        "fatigue": 0,
        "mental": 73,
        "shotcalling": 73,
        "laning": 79,
        "teamfight": 74,
        "mechanics": 77,
        "championPool": [
          "Taliyah",
          "LeBlanc",
          "Ahri",
          "Twisted Fate",
          "Syndra"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          78,
          75,
          71,
          66,
          62
        ]
      },
      {
        "id": "drx_adc",
        "name": "Jiwoo",
        "baseAge": 24,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "KR",
        "level": 77,
        "potential": 80,
        "form": 57,
        "fatigue": 0,
        "mental": 78,
        "shotcalling": 69,
        "laning": 82,
        "teamfight": 81,
        "mechanics": 81,
        "championPool": [
          "Caitlyn",
          "Kai'Sa",
          "Varus",
          "Ashe",
          "Ezreal"
        ],
        "traits": [],
        "masteries": [
          81,
          78,
          74,
          69,
          65
        ]
      },
      {
        "id": "drx_support",
        "name": "Andil",
        "baseAge": 25,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 78,
        "potential": 81,
        "form": 53,
        "fatigue": 0,
        "mental": 81,
        "shotcalling": 85,
        "laning": 75,
        "teamfight": 79,
        "mechanics": 74,
        "championPool": [
          "Pyke",
          "Nautilus",
          "Thresh",
          "Rakan",
          "Bard"
        ],
        "traits": [],
        "masteries": [
          82,
          79,
          75,
          70,
          66
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "LeBlanc",
        "Vi",
        "Varus",
        "Nautilus",
        "Rakan"
      ],
      "comfortPicks": {
        "TOP": [
          "Jayce",
          "Renekton"
        ],
        "JUNGLE": [
          "Lee Sin",
          "Elise"
        ],
        "MID": [
          "Taliyah",
          "LeBlanc"
        ],
        "ADC": [
          "Caitlyn",
          "Kai'Sa"
        ],
        "SUPPORT": [
          "Pyke",
          "Nautilus"
        ]
      },
      "flexPicks": [
        "Pantheon",
        "Taliyah"
      ],
      "riskTolerance": 75
    }
  },
  {
    "id": "kt",
    "name": "KT Rolster",
    "shortName": "KT",
    "region": "LCK",
    "tier": 2,
    "style": "teamfight",
    "roster": [
      {
        "id": "kt_top",
        "name": "PerfecT",
        "baseAge": 26,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "KR",
        "level": 82,
        "potential": 85,
        "form": 80,
        "fatigue": 0,
        "mental": 85,
        "shotcalling": 77,
        "laning": 87,
        "teamfight": 82,
        "mechanics": 86,
        "championPool": [
          "Gnar",
          "K'Sante",
          "Rumble",
          "Kennen",
          "Sion"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          89,
          86,
          83,
          78,
          74
        ]
      },
      {
        "id": "kt_jungle",
        "name": "Cuzz",
        "baseAge": 26,
        "retirementAge": 29,
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 88,
        "potential": 91,
        "form": 82,
        "fatigue": 0,
        "mental": 93,
        "shotcalling": 97,
        "laning": 83,
        "teamfight": 92,
        "mechanics": 89,
        "championPool": [
          "Vi",
          "Nocturne",
          "Sejuani",
          "Jarvan IV",
          "Wukong"
        ],
        "traits": [
          "consistant",
          "igl"
        ],
        "masteries": [
          95,
          92,
          89,
          84,
          80
        ]
      },
      {
        "id": "kt_mid",
        "name": "Bdd",
        "baseAge": 27,
        "retirementAge": 30,
        "role": "MID",
        "nationality": "KR",
        "level": 91,
        "potential": 94,
        "form": 72,
        "fatigue": 0,
        "mental": 95,
        "shotcalling": 92,
        "laning": 94,
        "teamfight": 97,
        "mechanics": 99,
        "championPool": [
          "Azir",
          "Taliyah",
          "Orianna",
          "Ryze",
          "Viktor"
        ],
        "traits": [
          "clutch",
          "mechanical"
        ],
        "masteries": [
          96,
          94,
          91,
          87,
          84
        ]
      },
      {
        "id": "kt_adc",
        "name": "Aiming",
        "baseAge": 25,
        "retirementAge": 29,
        "role": "ADC",
        "nationality": "KR",
        "level": 91,
        "potential": 94,
        "form": 72,
        "fatigue": 0,
        "mental": 88,
        "shotcalling": 84,
        "laning": 95,
        "teamfight": 98,
        "mechanics": 98,
        "championPool": [
          "Ezreal",
          "Jinx",
          "Varus",
          "Aphelios",
          "Xayah"
        ],
        "traits": [
          "mechanical"
        ],
        "masteries": [
          96,
          94,
          91,
          87,
          83
        ]
      },
      {
        "id": "kt_support",
        "name": "Effort",
        "baseAge": 25,
        "retirementAge": 30,
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 88,
        "potential": 91,
        "form": 64,
        "fatigue": 0,
        "mental": 92,
        "shotcalling": 99,
        "laning": 89,
        "teamfight": 89,
        "mechanics": 84,
        "championPool": [
          "Nautilus",
          "Rakan",
          "Bard",
          "Rell",
          "Braum"
        ],
        "traits": [
          "igl"
        ],
        "masteries": [
          94,
          91,
          88,
          83,
          79
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "Gnar",
          "K'Sante"
        ],
        "JUNGLE": [
          "Vi",
          "Nocturne"
        ],
        "MID": [
          "Azir",
          "Taliyah"
        ],
        "ADC": [
          "Ezreal",
          "Jinx"
        ],
        "SUPPORT": [
          "Nautilus",
          "Rakan"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 75
    }
  },
  {
    "id": "ns",
    "name": "Nongshim RedForce",
    "shortName": "NS",
    "region": "LCK",
    "tier": 4,
    "style": "pick",
    "roster": [
      {
        "id": "ns_top",
        "name": "Kingen",
        "baseAge": 26,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "KR",
        "level": 77,
        "potential": 80,
        "form": 68,
        "fatigue": 0,
        "mental": 78,
        "shotcalling": 73,
        "laning": 81,
        "teamfight": 78,
        "mechanics": 79,
        "championPool": [
          "Renekton",
          "Kennen",
          "Jayce",
          "Jax",
          "Camille"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          82,
          79,
          75,
          70,
          66
        ]
      },
      {
        "id": "ns_jungle",
        "name": "Sponge",
        "baseAge": 22,
        "retirementAge": 25,
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 72,
        "potential": 75,
        "form": 56,
        "fatigue": 0,
        "mental": 75,
        "shotcalling": 78,
        "laning": 67,
        "teamfight": 75,
        "mechanics": 72,
        "championPool": [
          "Lee Sin",
          "Elise",
          "Vi",
          "Nocturne",
          "Pantheon"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          77,
          74,
          70,
          65,
          61
        ]
      },
      {
        "id": "ns_mid",
        "name": "Scout",
        "baseAge": 28,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "CN",
        "level": 77,
        "potential": 80,
        "form": 64,
        "fatigue": 0,
        "mental": 80,
        "shotcalling": 74,
        "laning": 81,
        "teamfight": 78,
        "mechanics": 83,
        "championPool": [
          "Azir",
          "Ryze",
          "LeBlanc",
          "Ahri",
          "Taliyah"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          82,
          79,
          75,
          70,
          66
        ]
      },
      {
        "id": "ns_adc",
        "name": "Taeyoon",
        "baseAge": 23,
        "retirementAge": 26,
        "role": "ADC",
        "nationality": "KR",
        "level": 72,
        "potential": 75,
        "form": 62,
        "fatigue": 0,
        "mental": 75,
        "shotcalling": 64,
        "laning": 74,
        "teamfight": 77,
        "mechanics": 77,
        "championPool": [
          "Varus",
          "Caitlyn",
          "Kai'Sa",
          "Ashe",
          "Ezreal"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          77,
          74,
          70,
          65,
          61
        ]
      },
      {
        "id": "ns_support",
        "name": "Lehends",
        "baseAge": 27,
        "retirementAge": 30,
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 87,
        "potential": 90,
        "form": 59,
        "fatigue": 0,
        "mental": 91,
        "shotcalling": 97,
        "laning": 85,
        "teamfight": 91,
        "mechanics": 84,
        "championPool": [
          "Bard",
          "Rakan",
          "Thresh",
          "Nautilus",
          "Pyke"
        ],
        "traits": [
          "igl"
        ],
        "masteries": [
          91,
          88,
          84,
          79,
          75
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "LeBlanc",
        "Vi",
        "Varus",
        "Nautilus",
        "Rakan"
      ],
      "comfortPicks": {
        "TOP": [
          "Renekton",
          "Kennen"
        ],
        "JUNGLE": [
          "Lee Sin",
          "Elise"
        ],
        "MID": [
          "Azir",
          "Ryze"
        ],
        "ADC": [
          "Varus",
          "Caitlyn"
        ],
        "SUPPORT": [
          "Bard",
          "Rakan"
        ]
      },
      "flexPicks": [
        "Pantheon",
        "Taliyah"
      ],
      "riskTolerance": 75
    }
  },
  {
    "id": "t1",
    "name": "T1",
    "shortName": "T1",
    "region": "LCK",
    "tier": 1,
    "style": "teamfight",
    "roster": [
      {
        "id": "t1_top",
        "name": "Doran",
        "baseAge": 25,
        "retirementAge": 29,
        "role": "TOP",
        "nationality": "KR",
        "level": 92,
        "potential": 95,
        "form": 87,
        "fatigue": 0,
        "mental": 94,
        "shotcalling": 88,
        "laning": 97,
        "teamfight": 93,
        "mechanics": 97,
        "championPool": [
          "Rumble",
          "Gnar",
          "K'Sante",
          "Kennen",
          "Sion"
        ],
        "traits": [
          "consistant",
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          90,
          86
        ]
      },
      {
        "id": "t1_jungle",
        "name": "Oner",
        "baseAge": 23,
        "retirementAge": 32,
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 95,
        "potential": 98,
        "form": 87,
        "fatigue": 0,
        "mental": 99,
        "shotcalling": 99,
        "laning": 90,
        "teamfight": 99,
        "mechanics": 99,
        "championPool": [
          "Lee Sin",
          "Viego",
          "Vi",
          "Jarvan IV",
          "Wukong"
        ],
        "traits": [
          "clutch",
          "consistant",
          "igl",
          "leader",
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          91,
          88
        ]
      },
      {
        "id": "t1_mid",
        "name": "Faker",
        "baseAge": 30,
        "retirementAge": 33,
        "role": "MID",
        "nationality": "KR",
        "level": 97,
        "potential": 97,
        "form": 68,
        "fatigue": 0,
        "mental": 99,
        "shotcalling": 99,
        "laning": 99,
        "teamfight": 99,
        "mechanics": 99,
        "championPool": [
          "Azir",
          "Orianna",
          "Ryze",
          "Viktor",
          "Hwei"
        ],
        "traits": [
          "clutch",
          "leader",
          "mechanical",
          "veteran"
        ],
        "masteries": [
          97,
          96,
          94,
          91,
          88
        ]
      },
      {
        "id": "t1_adc",
        "name": "Peyz",
        "baseAge": 20,
        "retirementAge": 31,
        "role": "ADC",
        "nationality": "KR",
        "level": 94,
        "potential": 97,
        "form": 79,
        "fatigue": 0,
        "mental": 97,
        "shotcalling": 85,
        "laning": 99,
        "teamfight": 99,
        "mechanics": 99,
        "championPool": [
          "Ezreal",
          "Varus",
          "Zeri",
          "Jinx",
          "Aphelios"
        ],
        "traits": [
          "clutch",
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          91,
          88
        ]
      },
      {
        "id": "t1_support",
        "name": "Keria",
        "baseAge": 23,
        "retirementAge": 33,
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 97,
        "potential": 98,
        "form": 80,
        "fatigue": 0,
        "mental": 99,
        "shotcalling": 99,
        "laning": 96,
        "teamfight": 99,
        "mechanics": 96,
        "championPool": [
          "Thresh",
          "Renata Glasc",
          "Nautilus",
          "Rakan",
          "Rell"
        ],
        "traits": [
          "clutch",
          "igl",
          "leader",
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          91,
          88
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "Rumble",
          "Gnar"
        ],
        "JUNGLE": [
          "Lee Sin",
          "Viego"
        ],
        "MID": [
          "Azir",
          "Orianna"
        ],
        "ADC": [
          "Ezreal",
          "Varus"
        ],
        "SUPPORT": [
          "Thresh",
          "Renata Glasc"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 80
    }
  },
  {
    "id": "al",
    "name": "Anyone's Legend",
    "shortName": "AL",
    "region": "LPL",
    "tier": 1,
    "style": "teamfight",
    "roster": [
      {
        "id": "al_top",
        "name": "Flandre",
        "baseAge": 27,
        "retirementAge": 32,
        "role": "TOP",
        "nationality": "CN",
        "level": 90,
        "potential": 91,
        "form": 72,
        "fatigue": 0,
        "mental": 99,
        "shotcalling": 84,
        "laning": 93,
        "teamfight": 91,
        "mechanics": 92,
        "championPool": [
          "Gangplank",
          "Jayce",
          "Kennen",
          "Rumble",
          "Gnar"
        ],
        "traits": [
          "clutch",
          "veteran"
        ],
        "masteries": [
          96,
          94,
          91,
          87,
          83
        ]
      },
      {
        "id": "al_jungle",
        "name": "Tarzan",
        "baseAge": 26,
        "retirementAge": 31,
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 94,
        "potential": 97,
        "form": 85,
        "fatigue": 0,
        "mental": 99,
        "shotcalling": 99,
        "laning": 91,
        "teamfight": 99,
        "mechanics": 98,
        "championPool": [
          "Jarvan IV",
          "Sejuani",
          "Lee Sin",
          "Wukong",
          "Skarner"
        ],
        "traits": [
          "clutch",
          "consistant",
          "igl",
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          91,
          88
        ]
      },
      {
        "id": "al_mid",
        "name": "Shanks",
        "baseAge": 20,
        "retirementAge": 28,
        "role": "MID",
        "nationality": "CN",
        "level": 87,
        "potential": 90,
        "form": 89,
        "fatigue": 0,
        "mental": 87,
        "shotcalling": 86,
        "laning": 90,
        "teamfight": 91,
        "mechanics": 92,
        "championPool": [
          "Ryze",
          "Orianna",
          "Azir",
          "Viktor",
          "Hwei"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          95,
          92,
          89,
          84,
          80
        ]
      },
      {
        "id": "al_adc",
        "name": "Hope",
        "baseAge": 26,
        "retirementAge": 30,
        "role": "ADC",
        "nationality": "CN",
        "level": 93,
        "potential": 96,
        "form": 76,
        "fatigue": 0,
        "mental": 91,
        "shotcalling": 85,
        "laning": 94,
        "teamfight": 99,
        "mechanics": 99,
        "championPool": [
          "Varus",
          "Ashe",
          "Ezreal",
          "Jinx",
          "Aphelios"
        ],
        "traits": [
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          90,
          86
        ]
      },
      {
        "id": "al_support",
        "name": "Kael",
        "baseAge": 26,
        "retirementAge": 32,
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 93,
        "potential": 96,
        "form": 77,
        "fatigue": 0,
        "mental": 99,
        "shotcalling": 99,
        "laning": 93,
        "teamfight": 97,
        "mechanics": 88,
        "championPool": [
          "Rakan",
          "Bard",
          "Nautilus",
          "Rell",
          "Braum"
        ],
        "traits": [
          "clutch",
          "igl"
        ],
        "masteries": [
          97,
          96,
          94,
          90,
          86
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "Gangplank",
          "Jayce"
        ],
        "JUNGLE": [
          "Jarvan IV",
          "Sejuani"
        ],
        "MID": [
          "Ryze",
          "Orianna"
        ],
        "ADC": [
          "Varus",
          "Ashe"
        ],
        "SUPPORT": [
          "Rakan",
          "Bard"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 80
    }
  },
  {
    "id": "blg",
    "name": "Bilibili Gaming",
    "shortName": "BLG",
    "region": "LPL",
    "tier": 1,
    "style": "teamfight",
    "roster": [
      {
        "id": "blg_top",
        "name": "Bin",
        "baseAge": 23,
        "retirementAge": 32,
        "role": "TOP",
        "nationality": "CN",
        "level": 97,
        "potential": 98,
        "form": 78,
        "fatigue": 0,
        "mental": 99,
        "shotcalling": 92,
        "laning": 99,
        "teamfight": 99,
        "mechanics": 99,
        "championPool": [
          "Jax",
          "Gnar",
          "Rumble",
          "Kennen",
          "Sion"
        ],
        "traits": [
          "clutch",
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          91,
          88
        ]
      },
      {
        "id": "blg_jungle",
        "name": "Xun",
        "baseAge": 24,
        "retirementAge": 32,
        "role": "JUNGLE",
        "nationality": "CN",
        "level": 95,
        "potential": 98,
        "form": 73,
        "fatigue": 0,
        "mental": 99,
        "shotcalling": 99,
        "laning": 91,
        "teamfight": 99,
        "mechanics": 99,
        "championPool": [
          "Wukong",
          "Vi",
          "Nocturne",
          "Jarvan IV",
          "Skarner"
        ],
        "traits": [
          "clutch",
          "igl",
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          91,
          88
        ]
      },
      {
        "id": "blg_mid",
        "name": "Knight",
        "baseAge": 26,
        "retirementAge": 32,
        "role": "MID",
        "nationality": "CN",
        "level": 97,
        "potential": 98,
        "form": 79,
        "fatigue": 0,
        "mental": 99,
        "shotcalling": 98,
        "laning": 99,
        "teamfight": 99,
        "mechanics": 99,
        "championPool": [
          "Orianna",
          "Ahri",
          "Syndra",
          "Azir",
          "Ryze"
        ],
        "traits": [
          "clutch",
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          91,
          88
        ]
      },
      {
        "id": "blg_adc",
        "name": "Viper",
        "baseAge": 25,
        "retirementAge": 32,
        "role": "ADC",
        "nationality": "KR",
        "level": 97,
        "potential": 98,
        "form": 87,
        "fatigue": 0,
        "mental": 99,
        "shotcalling": 92,
        "laning": 99,
        "teamfight": 99,
        "mechanics": 99,
        "championPool": [
          "Varus",
          "Ezreal",
          "Aphelios",
          "Jinx",
          "Xayah"
        ],
        "traits": [
          "clutch",
          "consistant",
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          91,
          88
        ]
      },
      {
        "id": "blg_support",
        "name": "ON",
        "baseAge": 23,
        "retirementAge": 32,
        "role": "SUPPORT",
        "nationality": "CN",
        "level": 94,
        "potential": 97,
        "form": 74,
        "fatigue": 0,
        "mental": 99,
        "shotcalling": 99,
        "laning": 93,
        "teamfight": 98,
        "mechanics": 94,
        "championPool": [
          "Rakan",
          "Nautilus",
          "Rell",
          "Braum",
          "Renata Glasc"
        ],
        "traits": [
          "clutch",
          "igl",
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          91,
          88
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "Jax",
          "Gnar"
        ],
        "JUNGLE": [
          "Wukong",
          "Vi"
        ],
        "MID": [
          "Orianna",
          "Ahri"
        ],
        "ADC": [
          "Varus",
          "Ezreal"
        ],
        "SUPPORT": [
          "Rakan",
          "Nautilus"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 80
    }
  },
  {
    "id": "edg",
    "name": "EDward Gaming",
    "shortName": "EDG",
    "region": "LPL",
    "tier": 4,
    "style": "siege",
    "roster": [
      {
        "id": "edg_top",
        "name": "Zdz",
        "baseAge": 23,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "CN",
        "level": 77,
        "potential": 80,
        "form": 63,
        "fatigue": 0,
        "mental": 80,
        "shotcalling": 70,
        "laning": 82,
        "teamfight": 76,
        "mechanics": 81,
        "championPool": [
          "Ornn",
          "Sion",
          "Gnar",
          "Jayce",
          "Gangplank"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          82,
          79,
          75,
          70,
          66
        ]
      },
      {
        "id": "edg_jungle",
        "name": "Xiaohao",
        "baseAge": 22,
        "retirementAge": 26,
        "role": "JUNGLE",
        "nationality": "CN",
        "level": 74,
        "potential": 77,
        "form": 64,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 81,
        "laning": 70,
        "teamfight": 77,
        "mechanics": 75,
        "championPool": [
          "Sejuani",
          "Maokai",
          "Jarvan IV",
          "Nidalee",
          "Graves"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          79,
          76,
          72,
          67,
          63
        ]
      },
      {
        "id": "edg_mid",
        "name": "Angel",
        "baseAge": 21,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "CN",
        "level": 74,
        "potential": 77,
        "form": 54,
        "fatigue": 0,
        "mental": 71,
        "shotcalling": 75,
        "laning": 76,
        "teamfight": 79,
        "mechanics": 78,
        "championPool": [
          "Viktor",
          "Orianna",
          "Azir",
          "Corki",
          "Hwei"
        ],
        "traits": [],
        "masteries": [
          78,
          75,
          71,
          66,
          62
        ]
      },
      {
        "id": "edg_adc",
        "name": "Leave",
        "baseAge": 21,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "CN",
        "level": 77,
        "potential": 80,
        "form": 52,
        "fatigue": 0,
        "mental": 78,
        "shotcalling": 71,
        "laning": 79,
        "teamfight": 81,
        "mechanics": 81,
        "championPool": [
          "Aphelios",
          "Caitlyn",
          "Jinx",
          "Varus",
          "Ezreal"
        ],
        "traits": [],
        "masteries": [
          81,
          78,
          74,
          69,
          65
        ]
      },
      {
        "id": "edg_support",
        "name": "Jwei",
        "baseAge": 23,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "CN",
        "level": 73,
        "potential": 76,
        "form": 62,
        "fatigue": 0,
        "mental": 77,
        "shotcalling": 77,
        "laning": 70,
        "teamfight": 76,
        "mechanics": 69,
        "championPool": [
          "Milio",
          "Karma",
          "Lulu",
          "Nami",
          "Thresh"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          78,
          75,
          71,
          66,
          62
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Caitlyn",
        "Azir",
        "Jinx",
        "Lulu",
        "Rumble"
      ],
      "comfortPicks": {
        "TOP": [
          "Ornn",
          "Sion"
        ],
        "JUNGLE": [
          "Sejuani",
          "Maokai"
        ],
        "MID": [
          "Viktor",
          "Orianna"
        ],
        "ADC": [
          "Aphelios",
          "Caitlyn"
        ],
        "SUPPORT": [
          "Milio",
          "Karma"
        ]
      },
      "flexPicks": [
        "Tristana",
        "Sion"
      ],
      "riskTolerance": 62
    }
  },
  {
    "id": "ig",
    "name": "Invictus Gaming",
    "shortName": "IG",
    "region": "LPL",
    "tier": 2,
    "style": "pick",
    "roster": [
      {
        "id": "ig_top",
        "name": "Breathe",
        "baseAge": 26,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "CN",
        "level": 83,
        "potential": 86,
        "form": 67,
        "fatigue": 0,
        "mental": 84,
        "shotcalling": 81,
        "laning": 87,
        "teamfight": 82,
        "mechanics": 84,
        "championPool": [
          "Renekton",
          "Kennen",
          "Jayce",
          "Jax",
          "Camille"
        ],
        "traits": [],
        "masteries": [
          89,
          86,
          83,
          78,
          74
        ]
      },
      {
        "id": "ig_jungle",
        "name": "Wei",
        "baseAge": 21,
        "retirementAge": 29,
        "role": "JUNGLE",
        "nationality": "CN",
        "level": 87,
        "potential": 90,
        "form": 80,
        "fatigue": 0,
        "mental": 87,
        "shotcalling": 98,
        "laning": 82,
        "teamfight": 89,
        "mechanics": 88,
        "championPool": [
          "Vi",
          "Lee Sin",
          "Elise",
          "Nocturne",
          "Pantheon"
        ],
        "traits": [
          "consistant",
          "igl"
        ],
        "masteries": [
          94,
          91,
          88,
          83,
          79
        ]
      },
      {
        "id": "ig_mid",
        "name": "Renard",
        "baseAge": 24,
        "retirementAge": 28,
        "role": "MID",
        "nationality": "CN",
        "level": 86,
        "potential": 89,
        "form": 77,
        "fatigue": 0,
        "mental": 88,
        "shotcalling": 86,
        "laning": 91,
        "teamfight": 88,
        "mechanics": 91,
        "championPool": [
          "LeBlanc",
          "Ahri",
          "Taliyah",
          "Twisted Fate",
          "Syndra"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          93,
          90,
          87,
          82,
          78
        ]
      },
      {
        "id": "ig_adc",
        "name": "Nia",
        "baseAge": 26,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "CN",
        "level": 82,
        "potential": 85,
        "form": 79,
        "fatigue": 0,
        "mental": 82,
        "shotcalling": 74,
        "laning": 84,
        "teamfight": 90,
        "mechanics": 89,
        "championPool": [
          "Caitlyn",
          "Kai'Sa",
          "Varus",
          "Ashe",
          "Ezreal"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          89,
          86,
          83,
          78,
          74
        ]
      },
      {
        "id": "ig_support",
        "name": "Meiko",
        "baseAge": 28,
        "retirementAge": 33,
        "role": "SUPPORT",
        "nationality": "CN",
        "level": 92,
        "potential": 93,
        "form": 62,
        "fatigue": 0,
        "mental": 99,
        "shotcalling": 99,
        "laning": 89,
        "teamfight": 97,
        "mechanics": 87,
        "championPool": [
          "Nautilus",
          "Rakan",
          "Braum",
          "Bard",
          "Thresh"
        ],
        "traits": [
          "clutch",
          "igl",
          "leader",
          "veteran"
        ],
        "masteries": [
          97,
          96,
          93,
          88,
          84
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "LeBlanc",
        "Vi",
        "Varus",
        "Nautilus",
        "Rakan"
      ],
      "comfortPicks": {
        "TOP": [
          "Renekton",
          "Kennen"
        ],
        "JUNGLE": [
          "Vi",
          "Lee Sin"
        ],
        "MID": [
          "LeBlanc",
          "Ahri"
        ],
        "ADC": [
          "Caitlyn",
          "Kai'Sa"
        ],
        "SUPPORT": [
          "Nautilus",
          "Rakan"
        ]
      },
      "flexPicks": [
        "Pantheon",
        "Taliyah"
      ],
      "riskTolerance": 85
    }
  },
  {
    "id": "jdg",
    "name": "JD Gaming",
    "shortName": "JDG",
    "region": "LPL",
    "tier": 1,
    "style": "teamfight",
    "roster": [
      {
        "id": "jdg_top",
        "name": "Xiaoxu",
        "baseAge": 23,
        "retirementAge": 29,
        "role": "TOP",
        "nationality": "CN",
        "level": 92,
        "potential": 95,
        "form": 72,
        "fatigue": 0,
        "mental": 89,
        "shotcalling": 87,
        "laning": 96,
        "teamfight": 95,
        "mechanics": 98,
        "championPool": [
          "Rumble",
          "Gnar",
          "K'Sante",
          "Kennen",
          "Sion"
        ],
        "traits": [
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          89,
          85
        ]
      },
      {
        "id": "jdg_jungle",
        "name": "JunJia",
        "baseAge": 26,
        "retirementAge": 28,
        "role": "JUNGLE",
        "nationality": "APAC",
        "level": 88,
        "potential": 91,
        "form": 79,
        "fatigue": 0,
        "mental": 92,
        "shotcalling": 93,
        "laning": 85,
        "teamfight": 91,
        "mechanics": 89,
        "championPool": [
          "Vi",
          "Nocturne",
          "Jarvan IV",
          "Wukong",
          "Skarner"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          96,
          93,
          90,
          85,
          81
        ]
      },
      {
        "id": "jdg_mid",
        "name": "HongQ",
        "baseAge": 23,
        "retirementAge": 28,
        "role": "MID",
        "nationality": "APAC",
        "level": 87,
        "potential": 90,
        "form": 87,
        "fatigue": 0,
        "mental": 88,
        "shotcalling": 89,
        "laning": 93,
        "teamfight": 89,
        "mechanics": 92,
        "championPool": [
          "Azir",
          "Ryze",
          "Orianna",
          "Viktor",
          "Hwei"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          95,
          92,
          89,
          84,
          80
        ]
      },
      {
        "id": "jdg_adc",
        "name": "GALA",
        "baseAge": 25,
        "retirementAge": 30,
        "role": "ADC",
        "nationality": "CN",
        "level": 93,
        "potential": 96,
        "form": 79,
        "fatigue": 0,
        "mental": 92,
        "shotcalling": 87,
        "laning": 96,
        "teamfight": 97,
        "mechanics": 99,
        "championPool": [
          "Kai'Sa",
          "Xayah",
          "Varus",
          "Jinx",
          "Aphelios"
        ],
        "traits": [
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          90,
          86
        ]
      },
      {
        "id": "jdg_support",
        "name": "Vampire",
        "baseAge": 23,
        "retirementAge": 31,
        "role": "SUPPORT",
        "nationality": "CN",
        "level": 91,
        "potential": 94,
        "form": 73,
        "fatigue": 0,
        "mental": 98,
        "shotcalling": 99,
        "laning": 89,
        "teamfight": 97,
        "mechanics": 86,
        "championPool": [
          "Bard",
          "Nautilus",
          "Rakan",
          "Rell",
          "Braum"
        ],
        "traits": [
          "clutch",
          "igl"
        ],
        "masteries": [
          96,
          94,
          91,
          87,
          84
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "Rumble",
          "Gnar"
        ],
        "JUNGLE": [
          "Vi",
          "Nocturne"
        ],
        "MID": [
          "Azir",
          "Ryze"
        ],
        "ADC": [
          "Kai'Sa",
          "Xayah"
        ],
        "SUPPORT": [
          "Bard",
          "Nautilus"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 80
    }
  },
  {
    "id": "lgd",
    "name": "LGD Gaming",
    "shortName": "LGD",
    "region": "LPL",
    "tier": 5,
    "style": "siege",
    "roster": [
      {
        "id": "lgd_top",
        "name": "Burdol",
        "baseAge": 24,
        "retirementAge": 25,
        "role": "TOP",
        "nationality": "KR",
        "level": 68,
        "potential": 71,
        "form": 62,
        "fatigue": 0,
        "mental": 64,
        "shotcalling": 63,
        "laning": 71,
        "teamfight": 68,
        "mechanics": 71,
        "championPool": [
          "Ornn",
          "Sion",
          "Gnar",
          "Jayce",
          "Gangplank"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ],
        "masteries": [
          72,
          69,
          65,
          60,
          56
        ]
      },
      {
        "id": "lgd_jungle",
        "name": "Heng",
        "baseAge": 24,
        "retirementAge": 25,
        "role": "JUNGLE",
        "nationality": "CN",
        "level": 69,
        "potential": 72,
        "form": 54,
        "fatigue": 0,
        "mental": 72,
        "shotcalling": 73,
        "laning": 65,
        "teamfight": 70,
        "mechanics": 71,
        "championPool": [
          "Maokai",
          "Jarvan IV",
          "Sejuani",
          "Nidalee",
          "Graves"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          73,
          70,
          66,
          61,
          57
        ]
      },
      {
        "id": "lgd_mid",
        "name": "Tangyuan",
        "baseAge": 21,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "CN",
        "level": 73,
        "potential": 76,
        "form": 62,
        "fatigue": 0,
        "mental": 72,
        "shotcalling": 73,
        "laning": 79,
        "teamfight": 74,
        "mechanics": 76,
        "championPool": [
          "Azir",
          "Viktor",
          "Orianna",
          "Corki",
          "Hwei"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          77,
          74,
          70,
          65,
          61
        ]
      },
      {
        "id": "lgd_adc",
        "name": "Shaoye",
        "baseAge": 23,
        "retirementAge": 26,
        "role": "ADC",
        "nationality": "CN",
        "level": 71,
        "potential": 74,
        "form": 50,
        "fatigue": 0,
        "mental": 68,
        "shotcalling": 65,
        "laning": 75,
        "teamfight": 75,
        "mechanics": 75,
        "championPool": [
          "Caitlyn",
          "Jinx",
          "Aphelios",
          "Varus",
          "Ezreal"
        ],
        "traits": [],
        "masteries": [
          74,
          71,
          67,
          62,
          58
        ]
      },
      {
        "id": "lgd_support",
        "name": "Ycx",
        "baseAge": 22,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "CN",
        "level": 73,
        "potential": 76,
        "form": 52,
        "fatigue": 0,
        "mental": 77,
        "shotcalling": 78,
        "laning": 70,
        "teamfight": 77,
        "mechanics": 68,
        "championPool": [
          "Karma",
          "Lulu",
          "Milio",
          "Nami",
          "Thresh"
        ],
        "traits": [],
        "masteries": [
          76,
          73,
          69,
          64,
          60
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Caitlyn",
        "Azir",
        "Jinx",
        "Lulu",
        "Rumble"
      ],
      "comfortPicks": {
        "TOP": [
          "Ornn",
          "Sion"
        ],
        "JUNGLE": [
          "Maokai",
          "Jarvan IV"
        ],
        "MID": [
          "Azir",
          "Viktor"
        ],
        "ADC": [
          "Caitlyn",
          "Jinx"
        ],
        "SUPPORT": [
          "Karma",
          "Lulu"
        ]
      },
      "flexPicks": [
        "Tristana",
        "Sion"
      ],
      "riskTolerance": 57
    }
  },
  {
    "id": "lng",
    "name": "LNG Esports",
    "shortName": "LNG",
    "region": "LPL",
    "tier": 4,
    "style": "poke",
    "roster": [
      {
        "id": "lng_top",
        "name": "sheer",
        "baseAge": 23,
        "retirementAge": 26,
        "role": "TOP",
        "nationality": "CN",
        "level": 71,
        "potential": 74,
        "form": 60,
        "fatigue": 0,
        "mental": 73,
        "shotcalling": 69,
        "laning": 75,
        "teamfight": 70,
        "mechanics": 75,
        "championPool": [
          "Jayce",
          "Kennen",
          "Rumble",
          "Gnar",
          "Gangplank"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          76,
          73,
          69,
          64,
          60
        ]
      },
      {
        "id": "lng_jungle",
        "name": "Croco",
        "baseAge": 22,
        "retirementAge": 26,
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 75,
        "potential": 78,
        "form": 61,
        "fatigue": 0,
        "mental": 75,
        "shotcalling": 80,
        "laning": 71,
        "teamfight": 77,
        "mechanics": 76,
        "championPool": [
          "Ivern",
          "Nidalee",
          "Graves",
          "Elise",
          "Jarvan IV"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          80,
          77,
          73,
          68,
          64
        ]
      },
      {
        "id": "lng_mid",
        "name": "BuLLDoG",
        "baseAge": 23,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "KR",
        "level": 76,
        "potential": 79,
        "form": 68,
        "fatigue": 0,
        "mental": 78,
        "shotcalling": 76,
        "laning": 78,
        "teamfight": 79,
        "mechanics": 81,
        "championPool": [
          "Orianna",
          "Hwei",
          "Zoe",
          "Corki",
          "LeBlanc"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          81,
          78,
          74,
          69,
          65
        ]
      },
      {
        "id": "lng_adc",
        "name": "1xn",
        "baseAge": 22,
        "retirementAge": 26,
        "role": "ADC",
        "nationality": "CN",
        "level": 71,
        "potential": 74,
        "form": 66,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 63,
        "laning": 73,
        "teamfight": 78,
        "mechanics": 75,
        "championPool": [
          "Caitlyn",
          "Ezreal",
          "Varus",
          "Ashe",
          "Kai'Sa"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          76,
          73,
          69,
          64,
          60
        ]
      },
      {
        "id": "lng_support",
        "name": "MISSING",
        "baseAge": 25,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "CN",
        "level": 75,
        "potential": 78,
        "form": 66,
        "fatigue": 0,
        "mental": 80,
        "shotcalling": 81,
        "laning": 75,
        "teamfight": 80,
        "mechanics": 71,
        "championPool": [
          "Karma",
          "Milio",
          "Nami",
          "Bard",
          "Lulu"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          80,
          77,
          73,
          68,
          64
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Varus",
        "Ezreal",
        "Jayce",
        "Hwei",
        "Karma"
      ],
      "comfortPicks": {
        "TOP": [
          "Jayce",
          "Kennen"
        ],
        "JUNGLE": [
          "Ivern",
          "Nidalee"
        ],
        "MID": [
          "Orianna",
          "Hwei"
        ],
        "ADC": [
          "Caitlyn",
          "Ezreal"
        ],
        "SUPPORT": [
          "Karma",
          "Milio"
        ]
      },
      "flexPicks": [
        "Karma",
        "Jayce"
      ],
      "riskTolerance": 69
    }
  },
  {
    "id": "nip",
    "name": "Ninjas in Pyjamas",
    "shortName": "NIP",
    "region": "LPL",
    "tier": 3,
    "style": "pick",
    "roster": [
      {
        "id": "nip_top",
        "name": "HOYA",
        "baseAge": 25,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "KR",
        "level": 82,
        "potential": 85,
        "form": 60,
        "fatigue": 0,
        "mental": 79,
        "shotcalling": 76,
        "laning": 85,
        "teamfight": 82,
        "mechanics": 84,
        "championPool": [
          "Renekton",
          "Kennen",
          "Jayce",
          "Jax",
          "Camille"
        ],
        "traits": [],
        "masteries": [
          87,
          84,
          81,
          76,
          72
        ]
      },
      {
        "id": "nip_jungle",
        "name": "Guwon",
        "baseAge": 26,
        "retirementAge": 27,
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 80,
        "potential": 83,
        "form": 78,
        "fatigue": 0,
        "mental": 81,
        "shotcalling": 87,
        "laning": 74,
        "teamfight": 83,
        "mechanics": 80,
        "championPool": [
          "Vi",
          "Lee Sin",
          "Elise",
          "Nocturne",
          "Pantheon"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          86,
          83,
          80,
          75,
          71
        ]
      },
      {
        "id": "nip_mid",
        "name": "Care",
        "baseAge": 24,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "CN",
        "level": 81,
        "potential": 84,
        "form": 73,
        "fatigue": 0,
        "mental": 84,
        "shotcalling": 79,
        "laning": 83,
        "teamfight": 85,
        "mechanics": 85,
        "championPool": [
          "LeBlanc",
          "Ahri",
          "Taliyah",
          "Twisted Fate",
          "Syndra"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          87,
          84,
          81,
          76,
          72
        ]
      },
      {
        "id": "nip_adc",
        "name": "Assum",
        "baseAge": 21,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "CN",
        "level": 80,
        "potential": 83,
        "form": 73,
        "fatigue": 0,
        "mental": 81,
        "shotcalling": 75,
        "laning": 82,
        "teamfight": 86,
        "mechanics": 85,
        "championPool": [
          "Kai'Sa",
          "Varus",
          "Caitlyn",
          "Ashe",
          "Ezreal"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          86,
          83,
          80,
          75,
          71
        ]
      },
      {
        "id": "nip_support",
        "name": "Zhuo",
        "baseAge": 25,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "CN",
        "level": 78,
        "potential": 81,
        "form": 58,
        "fatigue": 0,
        "mental": 81,
        "shotcalling": 82,
        "laning": 76,
        "teamfight": 81,
        "mechanics": 75,
        "championPool": [
          "Pyke",
          "Nautilus",
          "Thresh",
          "Rakan",
          "Bard"
        ],
        "traits": [],
        "masteries": [
          83,
          80,
          77,
          72,
          68
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "LeBlanc",
        "Vi",
        "Varus",
        "Nautilus",
        "Rakan"
      ],
      "comfortPicks": {
        "TOP": [
          "Renekton",
          "Kennen"
        ],
        "JUNGLE": [
          "Vi",
          "Lee Sin"
        ],
        "MID": [
          "LeBlanc",
          "Ahri"
        ],
        "ADC": [
          "Kai'Sa",
          "Varus"
        ],
        "SUPPORT": [
          "Pyke",
          "Nautilus"
        ]
      },
      "flexPicks": [
        "Pantheon",
        "Taliyah"
      ],
      "riskTolerance": 80
    }
  },
  {
    "id": "omg",
    "name": "Oh My God",
    "shortName": "OMG",
    "region": "LPL",
    "tier": 4,
    "style": "poke",
    "roster": [
      {
        "id": "omg_top",
        "name": "Hery",
        "baseAge": 25,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "CN",
        "level": 74,
        "potential": 77,
        "form": 62,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 70,
        "laning": 80,
        "teamfight": 77,
        "mechanics": 77,
        "championPool": [
          "Jayce",
          "Kennen",
          "Rumble",
          "Gnar",
          "Gangplank"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          79,
          76,
          72,
          67,
          63
        ]
      },
      {
        "id": "omg_jungle",
        "name": "Juhan",
        "baseAge": 26,
        "retirementAge": 25,
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 71,
        "potential": 74,
        "form": 56,
        "fatigue": 0,
        "mental": 75,
        "shotcalling": 79,
        "laning": 68,
        "teamfight": 76,
        "mechanics": 72,
        "championPool": [
          "Nidalee",
          "Graves",
          "Ivern",
          "Elise",
          "Jarvan IV"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          76,
          73,
          69,
          64,
          60
        ]
      },
      {
        "id": "omg_mid",
        "name": "haichao",
        "baseAge": 26,
        "retirementAge": 25,
        "role": "MID",
        "nationality": "CN",
        "level": 71,
        "potential": 74,
        "form": 54,
        "fatigue": 0,
        "mental": 68,
        "shotcalling": 72,
        "laning": 74,
        "teamfight": 75,
        "mechanics": 74,
        "championPool": [
          "Orianna",
          "Hwei",
          "Zoe",
          "Corki",
          "LeBlanc"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ],
        "masteries": [
          76,
          73,
          69,
          64,
          60
        ]
      },
      {
        "id": "omg_adc",
        "name": "Photic",
        "baseAge": 22,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "CN",
        "level": 77,
        "potential": 80,
        "form": 65,
        "fatigue": 0,
        "mental": 77,
        "shotcalling": 70,
        "laning": 81,
        "teamfight": 81,
        "mechanics": 81,
        "championPool": [
          "Caitlyn",
          "Ezreal",
          "Varus",
          "Ashe",
          "Kai'Sa"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          82,
          79,
          75,
          70,
          66
        ]
      },
      {
        "id": "omg_support",
        "name": "Moham",
        "baseAge": 25,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 73,
        "potential": 76,
        "form": 54,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 80,
        "laning": 72,
        "teamfight": 75,
        "mechanics": 69,
        "championPool": [
          "Karma",
          "Milio",
          "Nami",
          "Bard",
          "Lulu"
        ],
        "traits": [],
        "masteries": [
          77,
          74,
          70,
          65,
          61
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Varus",
        "Ezreal",
        "Jayce",
        "Hwei",
        "Karma"
      ],
      "comfortPicks": {
        "TOP": [
          "Jayce",
          "Kennen"
        ],
        "JUNGLE": [
          "Nidalee",
          "Graves"
        ],
        "MID": [
          "Orianna",
          "Hwei"
        ],
        "ADC": [
          "Caitlyn",
          "Ezreal"
        ],
        "SUPPORT": [
          "Karma",
          "Milio"
        ]
      },
      "flexPicks": [
        "Karma",
        "Jayce"
      ],
      "riskTolerance": 69
    }
  },
  {
    "id": "we",
    "name": "Team WE",
    "shortName": "WE",
    "region": "LPL",
    "tier": 3,
    "style": "siege",
    "roster": [
      {
        "id": "we_top",
        "name": "Cube",
        "baseAge": 23,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "CN",
        "level": 83,
        "potential": 86,
        "form": 72,
        "fatigue": 0,
        "mental": 86,
        "shotcalling": 77,
        "laning": 86,
        "teamfight": 83,
        "mechanics": 84,
        "championPool": [
          "Gnar",
          "Ornn",
          "Sion",
          "Jayce",
          "Gangplank"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          89,
          86,
          83,
          78,
          74
        ]
      },
      {
        "id": "we_jungle",
        "name": "Monki",
        "baseAge": 21,
        "retirementAge": 27,
        "role": "JUNGLE",
        "nationality": "CN",
        "level": 80,
        "potential": 83,
        "form": 60,
        "fatigue": 0,
        "mental": 82,
        "shotcalling": 85,
        "laning": 74,
        "teamfight": 81,
        "mechanics": 80,
        "championPool": [
          "Maokai",
          "Jarvan IV",
          "Sejuani",
          "Nidalee",
          "Graves"
        ],
        "traits": [],
        "masteries": [
          85,
          82,
          79,
          74,
          70
        ]
      },
      {
        "id": "we_mid",
        "name": "Karis",
        "baseAge": 24,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "KR",
        "level": 82,
        "potential": 85,
        "form": 75,
        "fatigue": 0,
        "mental": 83,
        "shotcalling": 80,
        "laning": 85,
        "teamfight": 83,
        "mechanics": 87,
        "championPool": [
          "Viktor",
          "Orianna",
          "Azir",
          "Corki",
          "Hwei"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          88,
          85,
          82,
          77,
          73
        ]
      },
      {
        "id": "we_adc",
        "name": "About",
        "baseAge": 22,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "KR",
        "level": 81,
        "potential": 84,
        "form": 73,
        "fatigue": 0,
        "mental": 81,
        "shotcalling": 75,
        "laning": 85,
        "teamfight": 86,
        "mechanics": 88,
        "championPool": [
          "Jinx",
          "Aphelios",
          "Caitlyn",
          "Varus",
          "Ezreal"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          87,
          84,
          81,
          76,
          72
        ]
      },
      {
        "id": "we_support",
        "name": "Erha",
        "baseAge": 25,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "CN",
        "level": 76,
        "potential": 79,
        "form": 78,
        "fatigue": 0,
        "mental": 77,
        "shotcalling": 83,
        "laning": 76,
        "teamfight": 80,
        "mechanics": 73,
        "championPool": [
          "Karma",
          "Lulu",
          "Milio",
          "Nami",
          "Thresh"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          82,
          79,
          76,
          71,
          67
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Caitlyn",
        "Azir",
        "Jinx",
        "Lulu",
        "Rumble"
      ],
      "comfortPicks": {
        "TOP": [
          "Gnar",
          "Ornn"
        ],
        "JUNGLE": [
          "Maokai",
          "Jarvan IV"
        ],
        "MID": [
          "Viktor",
          "Orianna"
        ],
        "ADC": [
          "Jinx",
          "Aphelios"
        ],
        "SUPPORT": [
          "Karma",
          "Lulu"
        ]
      },
      "flexPicks": [
        "Tristana",
        "Sion"
      ],
      "riskTolerance": 67
    }
  },
  {
    "id": "ttg",
    "name": "ThunderTalk Gaming",
    "shortName": "TT",
    "region": "LPL",
    "tier": 5,
    "style": "pick",
    "roster": [
      {
        "id": "ttg_top",
        "name": "Keshi",
        "baseAge": 23,
        "retirementAge": 25,
        "role": "TOP",
        "nationality": "CN",
        "level": 68,
        "potential": 71,
        "form": 50,
        "fatigue": 0,
        "mental": 66,
        "shotcalling": 65,
        "laning": 72,
        "teamfight": 68,
        "mechanics": 71,
        "championPool": [
          "Kennen",
          "Jayce",
          "Renekton",
          "Jax",
          "Camille"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ],
        "masteries": [
          72,
          69,
          65,
          60,
          56
        ]
      },
      {
        "id": "ttg_jungle",
        "name": "Junhao",
        "baseAge": 23,
        "retirementAge": 24,
        "role": "JUNGLE",
        "nationality": "CN",
        "level": 68,
        "potential": 71,
        "form": 66,
        "fatigue": 0,
        "mental": 65,
        "shotcalling": 71,
        "laning": 62,
        "teamfight": 73,
        "mechanics": 68,
        "championPool": [
          "Elise",
          "Vi",
          "Lee Sin",
          "Nocturne",
          "Pantheon"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ],
        "masteries": [
          72,
          69,
          65,
          60,
          56
        ]
      },
      {
        "id": "ttg_mid",
        "name": "Heru",
        "baseAge": 19,
        "retirementAge": 26,
        "role": "MID",
        "nationality": "KR",
        "level": 71,
        "potential": 82,
        "form": 51,
        "fatigue": 0,
        "mental": 69,
        "shotcalling": 73,
        "laning": 75,
        "teamfight": 76,
        "mechanics": 74,
        "championPool": [
          "LeBlanc",
          "Ahri",
          "Taliyah",
          "Twisted Fate",
          "Syndra"
        ],
        "traits": [
          "rookie"
        ],
        "masteries": [
          74,
          71,
          67,
          62,
          58
        ]
      },
      {
        "id": "ttg_adc",
        "name": "Ahn",
        "baseAge": 25,
        "retirementAge": 26,
        "role": "ADC",
        "nationality": "CN",
        "level": 72,
        "potential": 75,
        "form": 50,
        "fatigue": 0,
        "mental": 73,
        "shotcalling": 63,
        "laning": 76,
        "teamfight": 76,
        "mechanics": 76,
        "championPool": [
          "Varus",
          "Caitlyn",
          "Kai'Sa",
          "Ashe",
          "Ezreal"
        ],
        "traits": [],
        "masteries": [
          75,
          72,
          68,
          63,
          59
        ]
      },
      {
        "id": "ttg_support",
        "name": "Feather",
        "baseAge": 26,
        "retirementAge": 26,
        "role": "SUPPORT",
        "nationality": "CN",
        "level": 68,
        "potential": 71,
        "form": 64,
        "fatigue": 0,
        "mental": 70,
        "shotcalling": 73,
        "laning": 69,
        "teamfight": 70,
        "mechanics": 64,
        "championPool": [
          "Pyke",
          "Nautilus",
          "Thresh",
          "Rakan",
          "Bard"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ],
        "masteries": [
          72,
          69,
          65,
          60,
          56
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "LeBlanc",
        "Vi",
        "Varus",
        "Nautilus",
        "Rakan"
      ],
      "comfortPicks": {
        "TOP": [
          "Kennen",
          "Jayce"
        ],
        "JUNGLE": [
          "Elise",
          "Vi"
        ],
        "MID": [
          "LeBlanc",
          "Ahri"
        ],
        "ADC": [
          "Varus",
          "Caitlyn"
        ],
        "SUPPORT": [
          "Pyke",
          "Nautilus"
        ]
      },
      "flexPicks": [
        "Pantheon",
        "Taliyah"
      ],
      "riskTolerance": 70
    }
  },
  {
    "id": "tes",
    "name": "Top Esports",
    "shortName": "TES",
    "region": "LPL",
    "tier": 1,
    "style": "teamfight",
    "roster": [
      {
        "id": "tes_top",
        "name": "ZUIAN",
        "baseAge": 20,
        "retirementAge": 30,
        "role": "TOP",
        "nationality": "CN",
        "level": 90,
        "potential": 99,
        "form": 83,
        "fatigue": 0,
        "mental": 92,
        "shotcalling": 88,
        "laning": 93,
        "teamfight": 92,
        "mechanics": 93,
        "championPool": [
          "Gnar",
          "K'Sante",
          "Rumble",
          "Kennen",
          "Sion"
        ],
        "traits": [
          "consistant",
          "rookie"
        ],
        "masteries": [
          96,
          94,
          91,
          87,
          83
        ]
      },
      {
        "id": "tes_jungle",
        "name": "Tian",
        "baseAge": 25,
        "retirementAge": 31,
        "role": "JUNGLE",
        "nationality": "CN",
        "level": 93,
        "potential": 96,
        "form": 74,
        "fatigue": 0,
        "mental": 94,
        "shotcalling": 99,
        "laning": 89,
        "teamfight": 98,
        "mechanics": 99,
        "championPool": [
          "Lee Sin",
          "Viego",
          "Jarvan IV",
          "Wukong",
          "Skarner"
        ],
        "traits": [
          "igl",
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          90,
          86
        ]
      },
      {
        "id": "tes_mid",
        "name": "Creme",
        "baseAge": 22,
        "retirementAge": 28,
        "role": "MID",
        "nationality": "CN",
        "level": 88,
        "potential": 91,
        "form": 86,
        "fatigue": 0,
        "mental": 90,
        "shotcalling": 89,
        "laning": 91,
        "teamfight": 92,
        "mechanics": 91,
        "championPool": [
          "Azir",
          "Ryze",
          "Orianna",
          "Viktor",
          "Hwei"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          96,
          93,
          90,
          85,
          81
        ]
      },
      {
        "id": "tes_adc",
        "name": "JackeyLove",
        "baseAge": 25,
        "retirementAge": 30,
        "role": "ADC",
        "nationality": "CN",
        "level": 93,
        "potential": 96,
        "form": 72,
        "fatigue": 0,
        "mental": 91,
        "shotcalling": 86,
        "laning": 96,
        "teamfight": 99,
        "mechanics": 99,
        "championPool": [
          "Lucian",
          "Ezreal",
          "Kai'Sa",
          "Jinx",
          "Aphelios"
        ],
        "traits": [
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          90,
          86
        ]
      },
      {
        "id": "tes_support",
        "name": "fengyue",
        "baseAge": 26,
        "retirementAge": 31,
        "role": "SUPPORT",
        "nationality": "CN",
        "level": 90,
        "potential": 93,
        "form": 77,
        "fatigue": 0,
        "mental": 91,
        "shotcalling": 99,
        "laning": 92,
        "teamfight": 94,
        "mechanics": 86,
        "championPool": [
          "Bard",
          "Nautilus",
          "Rakan",
          "Rell",
          "Braum"
        ],
        "traits": [
          "igl"
        ],
        "masteries": [
          96,
          94,
          91,
          86,
          82
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "Gnar",
          "K'Sante"
        ],
        "JUNGLE": [
          "Lee Sin",
          "Viego"
        ],
        "MID": [
          "Azir",
          "Ryze"
        ],
        "ADC": [
          "Lucian",
          "Ezreal"
        ],
        "SUPPORT": [
          "Bard",
          "Nautilus"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 80
    }
  },
  {
    "id": "up",
    "name": "Ultra Prime",
    "shortName": "UP",
    "region": "LPL",
    "tier": 5,
    "style": "splitpush",
    "roster": [
      {
        "id": "up_top",
        "name": "sasi",
        "baseAge": 26,
        "retirementAge": 26,
        "role": "TOP",
        "nationality": "CN",
        "level": 71,
        "potential": 74,
        "form": 66,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 65,
        "laning": 77,
        "teamfight": 74,
        "mechanics": 72,
        "championPool": [
          "Fiora",
          "Camille",
          "Jax",
          "Gwen",
          "Gangplank"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          75,
          72,
          68,
          63,
          59
        ]
      },
      {
        "id": "up_jungle",
        "name": "Climber",
        "baseAge": 23,
        "retirementAge": 24,
        "role": "JUNGLE",
        "nationality": "CN",
        "level": 68,
        "potential": 71,
        "form": 54,
        "fatigue": 0,
        "mental": 68,
        "shotcalling": 74,
        "laning": 61,
        "teamfight": 73,
        "mechanics": 68,
        "championPool": [
          "Lee Sin",
          "Nocturne",
          "Viego",
          "Vi",
          "Wukong"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ],
        "masteries": [
          72,
          69,
          65,
          60,
          56
        ]
      },
      {
        "id": "up_mid",
        "name": "Saber",
        "baseAge": 23,
        "retirementAge": 25,
        "role": "MID",
        "nationality": "CN",
        "level": 70,
        "potential": 73,
        "form": 53,
        "fatigue": 0,
        "mental": 68,
        "shotcalling": 71,
        "laning": 76,
        "teamfight": 73,
        "mechanics": 75,
        "championPool": [
          "Ryze",
          "Akali",
          "Twisted Fate",
          "Yone",
          "LeBlanc"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ],
        "masteries": [
          74,
          71,
          67,
          62,
          58
        ]
      },
      {
        "id": "up_adc",
        "name": "Hena",
        "baseAge": 25,
        "retirementAge": 25,
        "role": "ADC",
        "nationality": "KR",
        "level": 68,
        "potential": 71,
        "form": 65,
        "fatigue": 0,
        "mental": 68,
        "shotcalling": 62,
        "laning": 69,
        "teamfight": 75,
        "mechanics": 74,
        "championPool": [
          "Ezreal",
          "Kai'Sa",
          "Vayne",
          "Lucian",
          "Xayah"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ],
        "masteries": [
          72,
          69,
          65,
          60,
          56
        ]
      },
      {
        "id": "up_support",
        "name": "Xiaoxia",
        "baseAge": 24,
        "retirementAge": 27,
        "role": "SUPPORT",
        "nationality": "CN",
        "level": 71,
        "potential": 74,
        "form": 50,
        "fatigue": 0,
        "mental": 72,
        "shotcalling": 74,
        "laning": 73,
        "teamfight": 76,
        "mechanics": 66,
        "championPool": [
          "Rakan",
          "Bard",
          "Tahm Kench",
          "Thresh",
          "Nautilus"
        ],
        "traits": [],
        "masteries": [
          74,
          71,
          67,
          62,
          58
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Jax",
        "Fiora",
        "Twisted Fate",
        "Nocturne",
        "Vayne"
      ],
      "comfortPicks": {
        "TOP": [
          "Fiora",
          "Camille"
        ],
        "JUNGLE": [
          "Lee Sin",
          "Nocturne"
        ],
        "MID": [
          "Ryze",
          "Akali"
        ],
        "ADC": [
          "Ezreal",
          "Kai'Sa"
        ],
        "SUPPORT": [
          "Rakan",
          "Bard"
        ]
      },
      "flexPicks": [
        "Ryze",
        "Vayne"
      ],
      "riskTolerance": 68
    }
  },
  {
    "id": "wbg",
    "name": "Weibo Gaming",
    "shortName": "WBG",
    "region": "LPL",
    "tier": 2,
    "style": "teamfight",
    "roster": [
      {
        "id": "wbg_top",
        "name": "Zika",
        "baseAge": 21,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "CN",
        "level": 83,
        "potential": 86,
        "form": 70,
        "fatigue": 0,
        "mental": 82,
        "shotcalling": 79,
        "laning": 89,
        "teamfight": 86,
        "mechanics": 85,
        "championPool": [
          "Gnar",
          "K'Sante",
          "Rumble",
          "Kennen",
          "Sion"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          90,
          87,
          84,
          79,
          75
        ]
      },
      {
        "id": "wbg_jungle",
        "name": "Jiejie",
        "baseAge": 24,
        "retirementAge": 29,
        "role": "JUNGLE",
        "nationality": "CN",
        "level": 85,
        "potential": 88,
        "form": 64,
        "fatigue": 0,
        "mental": 87,
        "shotcalling": 96,
        "laning": 79,
        "teamfight": 89,
        "mechanics": 86,
        "championPool": [
          "Jarvan IV",
          "Viego",
          "Lee Sin",
          "Wukong",
          "Skarner"
        ],
        "traits": [
          "igl"
        ],
        "masteries": [
          91,
          88,
          85,
          80,
          76
        ]
      },
      {
        "id": "wbg_mid",
        "name": "Xiaohu",
        "baseAge": 28,
        "retirementAge": 32,
        "role": "MID",
        "nationality": "CN",
        "level": 93,
        "potential": 94,
        "form": 68,
        "fatigue": 0,
        "mental": 99,
        "shotcalling": 98,
        "laning": 99,
        "teamfight": 97,
        "mechanics": 99,
        "championPool": [
          "Azir",
          "Annie",
          "Taliyah",
          "Orianna",
          "Ryze"
        ],
        "traits": [
          "clutch",
          "leader",
          "mechanical",
          "veteran"
        ],
        "masteries": [
          97,
          96,
          94,
          90,
          86
        ]
      },
      {
        "id": "wbg_adc",
        "name": "Elk",
        "baseAge": 24,
        "retirementAge": 30,
        "role": "ADC",
        "nationality": "CN",
        "level": 93,
        "potential": 96,
        "form": 67,
        "fatigue": 0,
        "mental": 90,
        "shotcalling": 88,
        "laning": 98,
        "teamfight": 99,
        "mechanics": 99,
        "championPool": [
          "Varus",
          "Kai'Sa",
          "Aphelios",
          "Jinx",
          "Xayah"
        ],
        "traits": [
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          89,
          85
        ]
      },
      {
        "id": "wbg_support",
        "name": "Hang",
        "baseAge": 22,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "CN",
        "level": 83,
        "potential": 86,
        "form": 73,
        "fatigue": 0,
        "mental": 88,
        "shotcalling": 89,
        "laning": 84,
        "teamfight": 88,
        "mechanics": 81,
        "championPool": [
          "Nautilus",
          "Rakan",
          "Bard",
          "Rell",
          "Braum"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          90,
          87,
          84,
          79,
          75
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "Gnar",
          "K'Sante"
        ],
        "JUNGLE": [
          "Jarvan IV",
          "Viego"
        ],
        "MID": [
          "Azir",
          "Annie"
        ],
        "ADC": [
          "Varus",
          "Kai'Sa"
        ],
        "SUPPORT": [
          "Nautilus",
          "Rakan"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 75
    }
  },
  {
    "id": "c9",
    "name": "Cloud9",
    "shortName": "C9",
    "region": "LTAN",
    "tier": 1,
    "style": "teamfight",
    "roster": [
      {
        "id": "c9_top",
        "name": "Thanatos",
        "baseAge": 24,
        "retirementAge": 28,
        "role": "TOP",
        "nationality": "KR",
        "level": 86,
        "potential": 89,
        "form": 71,
        "fatigue": 0,
        "mental": 83,
        "shotcalling": 82,
        "laning": 92,
        "teamfight": 89,
        "mechanics": 88,
        "championPool": [
          "K'Sante",
          "Rumble",
          "Gnar",
          "Kennen",
          "Sion"
        ],
        "traits": [],
        "masteries": [
          93,
          90,
          87,
          82,
          78
        ]
      },
      {
        "id": "c9_jungle",
        "name": "Blaber",
        "baseAge": 26,
        "retirementAge": 28,
        "role": "JUNGLE",
        "nationality": "NA",
        "level": 89,
        "potential": 92,
        "form": 82,
        "fatigue": 0,
        "mental": 88,
        "shotcalling": 92,
        "laning": 86,
        "teamfight": 94,
        "mechanics": 91,
        "championPool": [
          "Kindred",
          "Lee Sin",
          "Viego",
          "Jarvan IV",
          "Wukong"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          96,
          94,
          91,
          86,
          82
        ]
      },
      {
        "id": "c9_mid",
        "name": "APA",
        "baseAge": 24,
        "retirementAge": 28,
        "role": "MID",
        "nationality": "NA",
        "level": 86,
        "potential": 89,
        "form": 70,
        "fatigue": 0,
        "mental": 87,
        "shotcalling": 87,
        "laning": 89,
        "teamfight": 88,
        "mechanics": 89,
        "championPool": [
          "Azir",
          "Ryze",
          "Orianna",
          "Viktor",
          "Hwei"
        ],
        "traits": [],
        "masteries": [
          93,
          90,
          87,
          82,
          78
        ]
      },
      {
        "id": "c9_adc",
        "name": "Zven",
        "baseAge": 28,
        "retirementAge": 28,
        "role": "ADC",
        "nationality": "NA",
        "level": 86,
        "potential": 89,
        "form": 82,
        "fatigue": 0,
        "mental": 90,
        "shotcalling": 81,
        "laning": 89,
        "teamfight": 90,
        "mechanics": 90,
        "championPool": [
          "Varus",
          "Ashe",
          "Ezreal",
          "Jinx",
          "Aphelios"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          94,
          91,
          88,
          83,
          79
        ]
      },
      {
        "id": "c9_support",
        "name": "Vulcan",
        "baseAge": 27,
        "retirementAge": 31,
        "role": "SUPPORT",
        "nationality": "NA",
        "level": 90,
        "potential": 93,
        "form": 84,
        "fatigue": 0,
        "mental": 94,
        "shotcalling": 99,
        "laning": 90,
        "teamfight": 93,
        "mechanics": 87,
        "championPool": [
          "Nautilus",
          "Rakan",
          "Braum",
          "Rell",
          "Renata Glasc"
        ],
        "traits": [
          "consistant",
          "igl"
        ],
        "masteries": [
          96,
          94,
          91,
          87,
          83
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "K'Sante",
          "Rumble"
        ],
        "JUNGLE": [
          "Kindred",
          "Lee Sin"
        ],
        "MID": [
          "Azir",
          "Ryze"
        ],
        "ADC": [
          "Varus",
          "Ashe"
        ],
        "SUPPORT": [
          "Nautilus",
          "Rakan"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 80
    }
  },
  {
    "id": "dig",
    "name": "Dignitas",
    "shortName": "DIG",
    "region": "LTAN",
    "tier": 4,
    "style": "siege",
    "roster": [
      {
        "id": "dig_top",
        "name": "Photon",
        "baseAge": 26,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "KR",
        "level": 76,
        "potential": 79,
        "form": 68,
        "fatigue": 0,
        "mental": 79,
        "shotcalling": 71,
        "laning": 82,
        "teamfight": 79,
        "mechanics": 79,
        "championPool": [
          "Ornn",
          "Sion",
          "Gnar",
          "Jayce",
          "Gangplank"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          81,
          78,
          74,
          69,
          65
        ]
      },
      {
        "id": "dig_jungle",
        "name": "eXyu",
        "baseAge": 24,
        "retirementAge": 26,
        "role": "JUNGLE",
        "nationality": "NA",
        "level": 74,
        "potential": 77,
        "form": 56,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 79,
        "laning": 71,
        "teamfight": 77,
        "mechanics": 75,
        "championPool": [
          "Sejuani",
          "Maokai",
          "Jarvan IV",
          "Nidalee",
          "Graves"
        ],
        "traits": [],
        "masteries": [
          78,
          75,
          71,
          66,
          62
        ]
      },
      {
        "id": "dig_mid",
        "name": "Palafox",
        "baseAge": 23,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "NA",
        "level": 76,
        "potential": 79,
        "form": 62,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 74,
        "laning": 78,
        "teamfight": 78,
        "mechanics": 81,
        "championPool": [
          "Viktor",
          "Orianna",
          "Azir",
          "Corki",
          "Hwei"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          81,
          78,
          74,
          69,
          65
        ]
      },
      {
        "id": "dig_adc",
        "name": "FBI",
        "baseAge": 27,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "NA",
        "level": 76,
        "potential": 79,
        "form": 65,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 71,
        "laning": 78,
        "teamfight": 82,
        "mechanics": 80,
        "championPool": [
          "Caitlyn",
          "Jinx",
          "Aphelios",
          "Varus",
          "Ezreal"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          81,
          78,
          74,
          69,
          65
        ]
      },
      {
        "id": "dig_support",
        "name": "Ignar",
        "baseAge": 26,
        "retirementAge": 27,
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 71,
        "potential": 74,
        "form": 72,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 75,
        "laning": 68,
        "teamfight": 74,
        "mechanics": 66,
        "championPool": [
          "Karma",
          "Lulu",
          "Milio",
          "Nami",
          "Thresh"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          76,
          73,
          69,
          64,
          60
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Caitlyn",
        "Azir",
        "Jinx",
        "Lulu",
        "Rumble"
      ],
      "comfortPicks": {
        "TOP": [
          "Ornn",
          "Sion"
        ],
        "JUNGLE": [
          "Sejuani",
          "Maokai"
        ],
        "MID": [
          "Viktor",
          "Orianna"
        ],
        "ADC": [
          "Caitlyn",
          "Jinx"
        ],
        "SUPPORT": [
          "Karma",
          "Lulu"
        ]
      },
      "flexPicks": [
        "Tristana",
        "Sion"
      ],
      "riskTolerance": 62
    }
  },
  {
    "id": "dsg",
    "name": "Disguised",
    "shortName": "DSG",
    "region": "LTAN",
    "tier": 5,
    "style": "pick",
    "roster": [
      {
        "id": "dsg_top",
        "name": "Castle",
        "baseAge": 25,
        "retirementAge": 26,
        "role": "TOP",
        "nationality": "KR",
        "level": 68,
        "potential": 71,
        "form": 62,
        "fatigue": 0,
        "mental": 71,
        "shotcalling": 65,
        "laning": 71,
        "teamfight": 71,
        "mechanics": 69,
        "championPool": [
          "Renekton",
          "Kennen",
          "Jayce",
          "Jax",
          "Camille"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          72,
          69,
          65,
          60,
          56
        ]
      },
      {
        "id": "dsg_jungle",
        "name": "Kisno",
        "baseAge": 26,
        "retirementAge": 24,
        "role": "JUNGLE",
        "nationality": "NA",
        "level": 67,
        "potential": 70,
        "form": 64,
        "fatigue": 0,
        "mental": 66,
        "shotcalling": 74,
        "laning": 63,
        "teamfight": 70,
        "mechanics": 68,
        "championPool": [
          "Lee Sin",
          "Elise",
          "Vi",
          "Nocturne",
          "Pantheon"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ],
        "masteries": [
          71,
          68,
          64,
          59,
          55
        ]
      },
      {
        "id": "dsg_mid",
        "name": "KryRa",
        "baseAge": 23,
        "retirementAge": 26,
        "role": "MID",
        "nationality": "NA",
        "level": 71,
        "potential": 74,
        "form": 65,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 68,
        "laning": 73,
        "teamfight": 75,
        "mechanics": 77,
        "championPool": [
          "LeBlanc",
          "Ahri",
          "Taliyah",
          "Twisted Fate",
          "Syndra"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          75,
          72,
          68,
          63,
          59
        ]
      },
      {
        "id": "dsg_adc",
        "name": "Callme",
        "baseAge": 24,
        "retirementAge": 25,
        "role": "ADC",
        "nationality": "KR",
        "level": 67,
        "potential": 70,
        "form": 57,
        "fatigue": 0,
        "mental": 66,
        "shotcalling": 60,
        "laning": 71,
        "teamfight": 72,
        "mechanics": 74,
        "championPool": [
          "Caitlyn",
          "Kai'Sa",
          "Varus",
          "Ashe",
          "Ezreal"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ],
        "masteries": [
          71,
          68,
          64,
          59,
          55
        ]
      },
      {
        "id": "dsg_support",
        "name": "Lyonz",
        "baseAge": 25,
        "retirementAge": 26,
        "role": "SUPPORT",
        "nationality": "NA",
        "level": 69,
        "potential": 72,
        "form": 57,
        "fatigue": 0,
        "mental": 69,
        "shotcalling": 77,
        "laning": 67,
        "teamfight": 71,
        "mechanics": 66,
        "championPool": [
          "Pyke",
          "Nautilus",
          "Thresh",
          "Rakan",
          "Bard"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ],
        "masteries": [
          73,
          70,
          66,
          61,
          57
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "LeBlanc",
        "Vi",
        "Varus",
        "Nautilus",
        "Rakan"
      ],
      "comfortPicks": {
        "TOP": [
          "Renekton",
          "Kennen"
        ],
        "JUNGLE": [
          "Lee Sin",
          "Elise"
        ],
        "MID": [
          "LeBlanc",
          "Ahri"
        ],
        "ADC": [
          "Caitlyn",
          "Kai'Sa"
        ],
        "SUPPORT": [
          "Pyke",
          "Nautilus"
        ]
      },
      "flexPicks": [
        "Pantheon",
        "Taliyah"
      ],
      "riskTolerance": 70
    }
  },
  {
    "id": "fly",
    "name": "FlyQuest",
    "shortName": "FLY",
    "region": "LTAN",
    "tier": 1,
    "style": "teamfight",
    "roster": [
      {
        "id": "fly_top",
        "name": "Gakgos",
        "baseAge": 20,
        "retirementAge": 29,
        "role": "TOP",
        "nationality": "EMEA",
        "level": 89,
        "potential": 99,
        "form": 81,
        "fatigue": 0,
        "mental": 87,
        "shotcalling": 85,
        "laning": 91,
        "teamfight": 90,
        "mechanics": 91,
        "championPool": [
          "K'Sante",
          "Rumble",
          "Gnar",
          "Kennen",
          "Sion"
        ],
        "traits": [
          "consistant",
          "rookie"
        ],
        "masteries": [
          96,
          94,
          91,
          86,
          82
        ]
      },
      {
        "id": "fly_jungle",
        "name": "Gryffinn",
        "baseAge": 18,
        "retirementAge": 31,
        "role": "JUNGLE",
        "nationality": "NA",
        "level": 91,
        "potential": 99,
        "form": 83,
        "fatigue": 0,
        "mental": 91,
        "shotcalling": 99,
        "laning": 88,
        "teamfight": 93,
        "mechanics": 97,
        "championPool": [
          "Nocturne",
          "Jarvan IV",
          "Vi",
          "Wukong",
          "Skarner"
        ],
        "traits": [
          "consistant",
          "igl",
          "mechanical",
          "rookie"
        ],
        "masteries": [
          96,
          94,
          91,
          87,
          84
        ]
      },
      {
        "id": "fly_mid",
        "name": "Quad",
        "baseAge": 24,
        "retirementAge": 28,
        "role": "MID",
        "nationality": "KR",
        "level": 86,
        "potential": 89,
        "form": 71,
        "fatigue": 0,
        "mental": 85,
        "shotcalling": 88,
        "laning": 88,
        "teamfight": 91,
        "mechanics": 91,
        "championPool": [
          "Azir",
          "Ryze",
          "Orianna",
          "Viktor",
          "Hwei"
        ],
        "traits": [],
        "masteries": [
          93,
          90,
          87,
          82,
          78
        ]
      },
      {
        "id": "fly_adc",
        "name": "Massu",
        "baseAge": 20,
        "retirementAge": 30,
        "role": "ADC",
        "nationality": "NA",
        "level": 92,
        "potential": 99,
        "form": 75,
        "fatigue": 0,
        "mental": 89,
        "shotcalling": 83,
        "laning": 93,
        "teamfight": 99,
        "mechanics": 99,
        "championPool": [
          "Varus",
          "Ashe",
          "Ezreal",
          "Jinx",
          "Aphelios"
        ],
        "traits": [
          "mechanical",
          "rookie"
        ],
        "masteries": [
          97,
          96,
          94,
          89,
          85
        ]
      },
      {
        "id": "fly_support",
        "name": "Cryogen",
        "baseAge": 18,
        "retirementAge": 31,
        "role": "SUPPORT",
        "nationality": "NA",
        "level": 89,
        "potential": 99,
        "form": 71,
        "fatigue": 0,
        "mental": 92,
        "shotcalling": 98,
        "laning": 88,
        "teamfight": 93,
        "mechanics": 86,
        "championPool": [
          "Nautilus",
          "Rakan",
          "Bard",
          "Rell",
          "Braum"
        ],
        "traits": [
          "igl",
          "rookie"
        ],
        "masteries": [
          96,
          93,
          90,
          85,
          81
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "K'Sante",
          "Rumble"
        ],
        "JUNGLE": [
          "Nocturne",
          "Jarvan IV"
        ],
        "MID": [
          "Azir",
          "Ryze"
        ],
        "ADC": [
          "Varus",
          "Ashe"
        ],
        "SUPPORT": [
          "Nautilus",
          "Rakan"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 80
    }
  },
  {
    "id": "lyo",
    "name": "LYON",
    "shortName": "LYO",
    "region": "LTAN",
    "tier": 2,
    "style": "pick",
    "roster": [
      {
        "id": "lyo_top",
        "name": "Dhokla",
        "baseAge": 25,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "NA",
        "level": 84,
        "potential": 87,
        "form": 81,
        "fatigue": 0,
        "mental": 85,
        "shotcalling": 78,
        "laning": 89,
        "teamfight": 85,
        "mechanics": 85,
        "championPool": [
          "Kennen",
          "Jayce",
          "Renekton",
          "Jax",
          "Camille"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          91,
          88,
          85,
          80,
          76
        ]
      },
      {
        "id": "lyo_jungle",
        "name": "Inspired",
        "baseAge": 24,
        "retirementAge": 27,
        "role": "JUNGLE",
        "nationality": "NA",
        "level": 82,
        "potential": 85,
        "form": 63,
        "fatigue": 0,
        "mental": 84,
        "shotcalling": 89,
        "laning": 79,
        "teamfight": 85,
        "mechanics": 83,
        "championPool": [
          "Nocturne",
          "Viego",
          "Graves",
          "Vi",
          "Pantheon"
        ],
        "traits": [],
        "masteries": [
          88,
          85,
          82,
          77,
          73
        ]
      },
      {
        "id": "lyo_mid",
        "name": "Saint",
        "baseAge": 26,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "KR",
        "level": 82,
        "potential": 85,
        "form": 80,
        "fatigue": 0,
        "mental": 82,
        "shotcalling": 83,
        "laning": 88,
        "teamfight": 87,
        "mechanics": 87,
        "championPool": [
          "Ahri",
          "Taliyah",
          "LeBlanc",
          "Twisted Fate",
          "Syndra"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          89,
          86,
          83,
          78,
          74
        ]
      },
      {
        "id": "lyo_adc",
        "name": "Berserker",
        "baseAge": 23,
        "retirementAge": 28,
        "role": "ADC",
        "nationality": "KR",
        "level": 89,
        "potential": 92,
        "form": 62,
        "fatigue": 0,
        "mental": 87,
        "shotcalling": 84,
        "laning": 95,
        "teamfight": 94,
        "mechanics": 98,
        "championPool": [
          "Aphelios",
          "Zeri",
          "Kai'Sa",
          "Ashe",
          "Varus"
        ],
        "traits": [
          "mechanical"
        ],
        "masteries": [
          96,
          93,
          90,
          85,
          81
        ]
      },
      {
        "id": "lyo_support",
        "name": "Isles",
        "baseAge": 22,
        "retirementAge": 29,
        "role": "SUPPORT",
        "nationality": "NA",
        "level": 84,
        "potential": 87,
        "form": 76,
        "fatigue": 0,
        "mental": 87,
        "shotcalling": 95,
        "laning": 85,
        "teamfight": 88,
        "mechanics": 79,
        "championPool": [
          "Pyke",
          "Nautilus",
          "Thresh",
          "Rakan",
          "Bard"
        ],
        "traits": [
          "consistant",
          "igl"
        ],
        "masteries": [
          91,
          88,
          85,
          80,
          76
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "LeBlanc",
        "Vi",
        "Varus",
        "Nautilus",
        "Rakan"
      ],
      "comfortPicks": {
        "TOP": [
          "Kennen",
          "Jayce"
        ],
        "JUNGLE": [
          "Nocturne",
          "Viego"
        ],
        "MID": [
          "Ahri",
          "Taliyah"
        ],
        "ADC": [
          "Aphelios",
          "Zeri"
        ],
        "SUPPORT": [
          "Pyke",
          "Nautilus"
        ]
      },
      "flexPicks": [
        "Pantheon",
        "Taliyah"
      ],
      "riskTolerance": 85
    }
  },
  {
    "id": "sen",
    "name": "Sentinels",
    "shortName": "SEN",
    "region": "LTAN",
    "tier": 2,
    "style": "teamfight",
    "roster": [
      {
        "id": "sen_top",
        "name": "Impact",
        "baseAge": 31,
        "retirementAge": 31,
        "role": "TOP",
        "nationality": "NA",
        "level": 88,
        "potential": 91,
        "form": 80,
        "fatigue": 0,
        "mental": 99,
        "shotcalling": 83,
        "laning": 95,
        "teamfight": 90,
        "mechanics": 95,
        "championPool": [
          "K'Sante",
          "Ornn",
          "Gnar",
          "Rumble",
          "Kennen"
        ],
        "traits": [
          "clutch",
          "consistant",
          "mechanical",
          "veteran"
        ],
        "masteries": [
          96,
          94,
          91,
          86,
          82
        ]
      },
      {
        "id": "sen_jungle",
        "name": "HamBak",
        "baseAge": 21,
        "retirementAge": 27,
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 82,
        "potential": 85,
        "form": 64,
        "fatigue": 0,
        "mental": 81,
        "shotcalling": 86,
        "laning": 79,
        "teamfight": 84,
        "mechanics": 83,
        "championPool": [
          "Nocturne",
          "Jarvan IV",
          "Vi",
          "Wukong",
          "Skarner"
        ],
        "traits": [],
        "masteries": [
          88,
          85,
          82,
          77,
          73
        ]
      },
      {
        "id": "sen_mid",
        "name": "DARKWINGS",
        "baseAge": 22,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "NA",
        "level": 84,
        "potential": 87,
        "form": 68,
        "fatigue": 0,
        "mental": 85,
        "shotcalling": 84,
        "laning": 87,
        "teamfight": 88,
        "mechanics": 89,
        "championPool": [
          "Ryze",
          "Orianna",
          "Azir",
          "Viktor",
          "Hwei"
        ],
        "traits": [],
        "masteries": [
          90,
          87,
          84,
          79,
          75
        ]
      },
      {
        "id": "sen_adc",
        "name": "Rahel",
        "baseAge": 21,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "KR",
        "level": 83,
        "potential": 86,
        "form": 64,
        "fatigue": 0,
        "mental": 84,
        "shotcalling": 79,
        "laning": 87,
        "teamfight": 90,
        "mechanics": 88,
        "championPool": [
          "Ezreal",
          "Varus",
          "Ashe",
          "Jinx",
          "Aphelios"
        ],
        "traits": [],
        "masteries": [
          89,
          86,
          83,
          78,
          74
        ]
      },
      {
        "id": "sen_support",
        "name": "huhi",
        "baseAge": 31,
        "retirementAge": 30,
        "role": "SUPPORT",
        "nationality": "NA",
        "level": 85,
        "potential": 88,
        "form": 70,
        "fatigue": 0,
        "mental": 89,
        "shotcalling": 95,
        "laning": 84,
        "teamfight": 91,
        "mechanics": 82,
        "championPool": [
          "Rakan",
          "Bard",
          "Nautilus",
          "Rell",
          "Braum"
        ],
        "traits": [
          "igl"
        ],
        "masteries": [
          91,
          88,
          85,
          80,
          76
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "K'Sante",
          "Ornn"
        ],
        "JUNGLE": [
          "Nocturne",
          "Jarvan IV"
        ],
        "MID": [
          "Ryze",
          "Orianna"
        ],
        "ADC": [
          "Ezreal",
          "Varus"
        ],
        "SUPPORT": [
          "Rakan",
          "Bard"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 75
    }
  },
  {
    "id": "sr",
    "name": "Shopify Rebellion",
    "shortName": "SR",
    "region": "LTAN",
    "tier": 3,
    "style": "splitpush",
    "roster": [
      {
        "id": "sr_top",
        "name": "Fudge",
        "baseAge": 24,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "NA",
        "level": 82,
        "potential": 85,
        "form": 72,
        "fatigue": 0,
        "mental": 81,
        "shotcalling": 78,
        "laning": 88,
        "teamfight": 85,
        "mechanics": 86,
        "championPool": [
          "Camille",
          "Jax",
          "Fiora",
          "Gwen",
          "Gangplank"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          88,
          85,
          82,
          77,
          73
        ]
      },
      {
        "id": "sr_jungle",
        "name": "Contractz",
        "baseAge": 26,
        "retirementAge": 27,
        "role": "JUNGLE",
        "nationality": "NA",
        "level": 81,
        "potential": 84,
        "form": 64,
        "fatigue": 0,
        "mental": 79,
        "shotcalling": 86,
        "laning": 74,
        "teamfight": 87,
        "mechanics": 80,
        "championPool": [
          "Lee Sin",
          "Nocturne",
          "Viego",
          "Vi",
          "Wukong"
        ],
        "traits": [],
        "masteries": [
          86,
          83,
          80,
          75,
          71
        ]
      },
      {
        "id": "sr_mid",
        "name": "Zinie",
        "baseAge": 24,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "KR",
        "level": 81,
        "potential": 84,
        "form": 60,
        "fatigue": 0,
        "mental": 82,
        "shotcalling": 79,
        "laning": 86,
        "teamfight": 82,
        "mechanics": 84,
        "championPool": [
          "Twisted Fate",
          "Ryze",
          "Akali",
          "Yone",
          "LeBlanc"
        ],
        "traits": [],
        "masteries": [
          86,
          83,
          80,
          75,
          71
        ]
      },
      {
        "id": "sr_adc",
        "name": "Bvoy",
        "baseAge": 22,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "KR",
        "level": 82,
        "potential": 85,
        "form": 76,
        "fatigue": 0,
        "mental": 82,
        "shotcalling": 74,
        "laning": 86,
        "teamfight": 88,
        "mechanics": 89,
        "championPool": [
          "Kai'Sa",
          "Vayne",
          "Ezreal",
          "Lucian",
          "Xayah"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          88,
          85,
          82,
          77,
          73
        ]
      },
      {
        "id": "sr_support",
        "name": "Ceos",
        "baseAge": 22,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "NA",
        "level": 80,
        "potential": 83,
        "form": 59,
        "fatigue": 0,
        "mental": 84,
        "shotcalling": 85,
        "laning": 80,
        "teamfight": 83,
        "mechanics": 78,
        "championPool": [
          "Bard",
          "Tahm Kench",
          "Rakan",
          "Thresh",
          "Nautilus"
        ],
        "traits": [],
        "masteries": [
          85,
          82,
          79,
          74,
          70
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Jax",
        "Fiora",
        "Twisted Fate",
        "Nocturne",
        "Vayne"
      ],
      "comfortPicks": {
        "TOP": [
          "Camille",
          "Jax"
        ],
        "JUNGLE": [
          "Lee Sin",
          "Nocturne"
        ],
        "MID": [
          "Twisted Fate",
          "Ryze"
        ],
        "ADC": [
          "Kai'Sa",
          "Vayne"
        ],
        "SUPPORT": [
          "Bard",
          "Tahm Kench"
        ]
      },
      "flexPicks": [
        "Ryze",
        "Vayne"
      ],
      "riskTolerance": 78
    }
  },
  {
    "id": "tl",
    "name": "Team Liquid",
    "shortName": "TL",
    "region": "LTAN",
    "tier": 1,
    "style": "teamfight",
    "roster": [
      {
        "id": "tl_top",
        "name": "Morgan",
        "baseAge": 23,
        "retirementAge": 28,
        "role": "TOP",
        "nationality": "KR",
        "level": 89,
        "potential": 92,
        "form": 72,
        "fatigue": 0,
        "mental": 89,
        "shotcalling": 85,
        "laning": 95,
        "teamfight": 91,
        "mechanics": 96,
        "championPool": [
          "Gnar",
          "K'Sante",
          "Rumble",
          "Kennen",
          "Sion"
        ],
        "traits": [
          "mechanical"
        ],
        "masteries": [
          96,
          94,
          91,
          86,
          82
        ]
      },
      {
        "id": "tl_jungle",
        "name": "Josedeodo",
        "baseAge": 23,
        "retirementAge": 29,
        "role": "JUNGLE",
        "nationality": "NA",
        "level": 88,
        "potential": 91,
        "form": 84,
        "fatigue": 0,
        "mental": 93,
        "shotcalling": 97,
        "laning": 84,
        "teamfight": 94,
        "mechanics": 93,
        "championPool": [
          "Nocturne",
          "Jarvan IV",
          "Vi",
          "Wukong",
          "Skarner"
        ],
        "traits": [
          "consistant",
          "igl",
          "mechanical"
        ],
        "masteries": [
          96,
          94,
          91,
          86,
          82
        ]
      },
      {
        "id": "tl_mid",
        "name": "Quid",
        "baseAge": 20,
        "retirementAge": 28,
        "role": "MID",
        "nationality": "KR",
        "level": 87,
        "potential": 90,
        "form": 72,
        "fatigue": 0,
        "mental": 89,
        "shotcalling": 87,
        "laning": 91,
        "teamfight": 91,
        "mechanics": 91,
        "championPool": [
          "Azir",
          "Orianna",
          "Ahri",
          "Ryze",
          "Viktor"
        ],
        "traits": [],
        "masteries": [
          94,
          91,
          88,
          83,
          79
        ]
      },
      {
        "id": "tl_adc",
        "name": "Yeon",
        "baseAge": 24,
        "retirementAge": 28,
        "role": "ADC",
        "nationality": "NA",
        "level": 88,
        "potential": 91,
        "form": 74,
        "fatigue": 0,
        "mental": 87,
        "shotcalling": 79,
        "laning": 88,
        "teamfight": 94,
        "mechanics": 92,
        "championPool": [
          "Ezreal",
          "Varus",
          "Ashe",
          "Jinx",
          "Aphelios"
        ],
        "traits": [],
        "masteries": [
          95,
          92,
          89,
          84,
          80
        ]
      },
      {
        "id": "tl_support",
        "name": "CoreJJ",
        "baseAge": 31,
        "retirementAge": 33,
        "role": "SUPPORT",
        "nationality": "NA",
        "level": 90,
        "potential": 91,
        "form": 74,
        "fatigue": 0,
        "mental": 99,
        "shotcalling": 99,
        "laning": 88,
        "teamfight": 94,
        "mechanics": 86,
        "championPool": [
          "Rakan",
          "Alistar",
          "Nautilus",
          "Rell",
          "Braum"
        ],
        "traits": [
          "clutch",
          "igl",
          "leader",
          "veteran"
        ],
        "masteries": [
          96,
          94,
          91,
          87,
          83
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "Gnar",
          "K'Sante"
        ],
        "JUNGLE": [
          "Nocturne",
          "Jarvan IV"
        ],
        "MID": [
          "Azir",
          "Orianna"
        ],
        "ADC": [
          "Ezreal",
          "Varus"
        ],
        "SUPPORT": [
          "Rakan",
          "Alistar"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 80
    }
  },
  {
    "id": "fxw",
    "name": "Fluxo W7M",
    "shortName": "FXW",
    "region": "LTAS",
    "tier": 3,
    "style": "poke",
    "roster": [
      {
        "id": "fxw_top",
        "name": "curty",
        "baseAge": 24,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "BR",
        "level": 81,
        "potential": 84,
        "form": 65,
        "fatigue": 0,
        "mental": 79,
        "shotcalling": 75,
        "laning": 85,
        "teamfight": 80,
        "mechanics": 82,
        "championPool": [
          "Rumble",
          "Jayce",
          "Kennen",
          "Gnar",
          "Gangplank"
        ],
        "traits": [],
        "masteries": [
          86,
          83,
          80,
          75,
          71
        ]
      },
      {
        "id": "fxw_jungle",
        "name": "Peach",
        "baseAge": 22,
        "retirementAge": 27,
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 81,
        "potential": 84,
        "form": 70,
        "fatigue": 0,
        "mental": 82,
        "shotcalling": 86,
        "laning": 78,
        "teamfight": 85,
        "mechanics": 80,
        "championPool": [
          "Graves",
          "Ivern",
          "Nidalee",
          "Elise",
          "Jarvan IV"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          87,
          84,
          81,
          76,
          72
        ]
      },
      {
        "id": "fxw_mid",
        "name": "cody",
        "baseAge": 23,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "BR",
        "level": 82,
        "potential": 85,
        "form": 71,
        "fatigue": 0,
        "mental": 85,
        "shotcalling": 80,
        "laning": 88,
        "teamfight": 84,
        "mechanics": 85,
        "championPool": [
          "Hwei",
          "Zoe",
          "Orianna",
          "Corki",
          "LeBlanc"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          88,
          85,
          82,
          77,
          73
        ]
      },
      {
        "id": "fxw_adc",
        "name": "BAO",
        "baseAge": 26,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "KR",
        "level": 76,
        "potential": 79,
        "form": 69,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 68,
        "laning": 77,
        "teamfight": 81,
        "mechanics": 80,
        "championPool": [
          "Varus",
          "Caitlyn",
          "Ezreal",
          "Ashe",
          "Kai'Sa"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          82,
          79,
          76,
          71,
          67
        ]
      },
      {
        "id": "fxw_support",
        "name": "Momochi",
        "baseAge": 25,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "BR",
        "level": 80,
        "potential": 83,
        "form": 68,
        "fatigue": 0,
        "mental": 84,
        "shotcalling": 84,
        "laning": 79,
        "teamfight": 82,
        "mechanics": 77,
        "championPool": [
          "Milio",
          "Nami",
          "Karma",
          "Bard",
          "Lulu"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          86,
          83,
          80,
          75,
          71
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Varus",
        "Ezreal",
        "Jayce",
        "Hwei",
        "Karma"
      ],
      "comfortPicks": {
        "TOP": [
          "Rumble",
          "Jayce"
        ],
        "JUNGLE": [
          "Graves",
          "Ivern"
        ],
        "MID": [
          "Hwei",
          "Zoe"
        ],
        "ADC": [
          "Varus",
          "Caitlyn"
        ],
        "SUPPORT": [
          "Milio",
          "Nami"
        ]
      },
      "flexPicks": [
        "Karma",
        "Jayce"
      ],
      "riskTolerance": 74
    }
  },
  {
    "id": "fur",
    "name": "FURIA",
    "shortName": "FUR",
    "region": "LTAS",
    "tier": 1,
    "style": "teamfight",
    "roster": [
      {
        "id": "fur_top",
        "name": "Guigo",
        "baseAge": 23,
        "retirementAge": 28,
        "role": "TOP",
        "nationality": "BR",
        "level": 85,
        "potential": 88,
        "form": 85,
        "fatigue": 0,
        "mental": 85,
        "shotcalling": 81,
        "laning": 89,
        "teamfight": 86,
        "mechanics": 87,
        "championPool": [
          "Gnar",
          "K'Sante",
          "Rumble",
          "Kennen",
          "Sion"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          93,
          90,
          87,
          82,
          78
        ]
      },
      {
        "id": "fur_jungle",
        "name": "Tatu",
        "baseAge": 23,
        "retirementAge": 30,
        "role": "JUNGLE",
        "nationality": "BR",
        "level": 92,
        "potential": 95,
        "form": 76,
        "fatigue": 0,
        "mental": 92,
        "shotcalling": 99,
        "laning": 89,
        "teamfight": 96,
        "mechanics": 96,
        "championPool": [
          "Jarvan IV",
          "Vi",
          "Nocturne",
          "Wukong",
          "Skarner"
        ],
        "traits": [
          "igl",
          "mechanical"
        ],
        "masteries": [
          97,
          96,
          94,
          89,
          85
        ]
      },
      {
        "id": "fur_mid",
        "name": "Tutsz",
        "baseAge": 23,
        "retirementAge": 28,
        "role": "MID",
        "nationality": "BR",
        "level": 85,
        "potential": 88,
        "form": 87,
        "fatigue": 0,
        "mental": 88,
        "shotcalling": 84,
        "laning": 90,
        "teamfight": 88,
        "mechanics": 90,
        "championPool": [
          "Orianna",
          "Azir",
          "Ryze",
          "Viktor",
          "Hwei"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          93,
          90,
          87,
          82,
          78
        ]
      },
      {
        "id": "fur_adc",
        "name": "Ayu",
        "baseAge": 25,
        "retirementAge": 28,
        "role": "ADC",
        "nationality": "BR",
        "level": 89,
        "potential": 92,
        "form": 81,
        "fatigue": 0,
        "mental": 89,
        "shotcalling": 81,
        "laning": 91,
        "teamfight": 94,
        "mechanics": 94,
        "championPool": [
          "Ezreal",
          "Varus",
          "Ashe",
          "Jinx",
          "Aphelios"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          96,
          94,
          91,
          86,
          82
        ]
      },
      {
        "id": "fur_support",
        "name": "JoJo",
        "baseAge": 25,
        "retirementAge": 31,
        "role": "SUPPORT",
        "nationality": "BR",
        "level": 90,
        "potential": 93,
        "form": 73,
        "fatigue": 0,
        "mental": 92,
        "shotcalling": 99,
        "laning": 90,
        "teamfight": 93,
        "mechanics": 91,
        "championPool": [
          "Rakan",
          "Bard",
          "Nautilus",
          "Rell",
          "Braum"
        ],
        "traits": [
          "igl",
          "mechanical"
        ],
        "masteries": [
          96,
          94,
          91,
          87,
          83
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "Gnar",
          "K'Sante"
        ],
        "JUNGLE": [
          "Jarvan IV",
          "Vi"
        ],
        "MID": [
          "Orianna",
          "Azir"
        ],
        "ADC": [
          "Ezreal",
          "Varus"
        ],
        "SUPPORT": [
          "Rakan",
          "Bard"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 80
    }
  },
  {
    "id": "lev",
    "name": "Leviatan",
    "shortName": "LEV",
    "region": "LTAS",
    "tier": 5,
    "style": "splitpush",
    "roster": [
      {
        "id": "lev_top",
        "name": "Devost",
        "baseAge": 24,
        "retirementAge": 26,
        "role": "TOP",
        "nationality": "BR",
        "level": 71,
        "potential": 74,
        "form": 50,
        "fatigue": 0,
        "mental": 72,
        "shotcalling": 66,
        "laning": 73,
        "teamfight": 70,
        "mechanics": 75,
        "championPool": [
          "Jax",
          "Fiora",
          "Camille",
          "Gwen",
          "Gangplank"
        ],
        "traits": [],
        "masteries": [
          74,
          71,
          67,
          62,
          58
        ]
      },
      {
        "id": "lev_jungle",
        "name": "Booki",
        "baseAge": 25,
        "retirementAge": 25,
        "role": "JUNGLE",
        "nationality": "BR",
        "level": 72,
        "potential": 75,
        "form": 52,
        "fatigue": 0,
        "mental": 71,
        "shotcalling": 78,
        "laning": 69,
        "teamfight": 78,
        "mechanics": 72,
        "championPool": [
          "Lee Sin",
          "Nocturne",
          "Viego",
          "Vi",
          "Wukong"
        ],
        "traits": [],
        "masteries": [
          75,
          72,
          68,
          63,
          59
        ]
      },
      {
        "id": "lev_mid",
        "name": "Enga",
        "baseAge": 24,
        "retirementAge": 25,
        "role": "MID",
        "nationality": "BR",
        "level": 66,
        "potential": 69,
        "form": 55,
        "fatigue": 0,
        "mental": 63,
        "shotcalling": 67,
        "laning": 72,
        "teamfight": 67,
        "mechanics": 71,
        "championPool": [
          "Ryze",
          "Akali",
          "Twisted Fate",
          "Yone",
          "LeBlanc"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ],
        "masteries": [
          70,
          67,
          63,
          58,
          54
        ]
      },
      {
        "id": "lev_adc",
        "name": "Snaker",
        "baseAge": 24,
        "retirementAge": 26,
        "role": "ADC",
        "nationality": "BR",
        "level": 69,
        "potential": 72,
        "form": 50,
        "fatigue": 0,
        "mental": 71,
        "shotcalling": 64,
        "laning": 73,
        "teamfight": 73,
        "mechanics": 73,
        "championPool": [
          "Ezreal",
          "Kai'Sa",
          "Vayne",
          "Lucian",
          "Xayah"
        ],
        "traits": [],
        "masteries": [
          72,
          69,
          65,
          60,
          56
        ]
      },
      {
        "id": "lev_support",
        "name": "TopLop",
        "baseAge": 23,
        "retirementAge": 27,
        "role": "SUPPORT",
        "nationality": "BR",
        "level": 71,
        "potential": 74,
        "form": 59,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 79,
        "laning": 72,
        "teamfight": 76,
        "mechanics": 67,
        "championPool": [
          "Bard",
          "Tahm Kench",
          "Rakan",
          "Thresh",
          "Nautilus"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          75,
          72,
          68,
          63,
          59
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Jax",
        "Fiora",
        "Twisted Fate",
        "Nocturne",
        "Vayne"
      ],
      "comfortPicks": {
        "TOP": [
          "Jax",
          "Fiora"
        ],
        "JUNGLE": [
          "Lee Sin",
          "Nocturne"
        ],
        "MID": [
          "Ryze",
          "Akali"
        ],
        "ADC": [
          "Ezreal",
          "Kai'Sa"
        ],
        "SUPPORT": [
          "Bard",
          "Tahm Kench"
        ]
      },
      "flexPicks": [
        "Ryze",
        "Vayne"
      ],
      "riskTolerance": 68
    }
  },
  {
    "id": "loud",
    "name": "LOUD",
    "shortName": "LOUD",
    "region": "LTAS",
    "tier": 3,
    "style": "pick",
    "roster": [
      {
        "id": "loud_top",
        "name": "xyno",
        "baseAge": 22,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "BR",
        "level": 77,
        "potential": 80,
        "form": 65,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 72,
        "laning": 81,
        "teamfight": 78,
        "mechanics": 81,
        "championPool": [
          "Renekton",
          "Kennen",
          "Jayce",
          "Jax",
          "Camille"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          83,
          80,
          77,
          72,
          68
        ]
      },
      {
        "id": "loud_jungle",
        "name": "YoungJae",
        "baseAge": 23,
        "retirementAge": 26,
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 79,
        "potential": 82,
        "form": 73,
        "fatigue": 0,
        "mental": 81,
        "shotcalling": 84,
        "laning": 74,
        "teamfight": 82,
        "mechanics": 81,
        "championPool": [
          "Elise",
          "Vi",
          "Lee Sin",
          "Nocturne",
          "Pantheon"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          85,
          82,
          79,
          74,
          70
        ]
      },
      {
        "id": "loud_mid",
        "name": "Envy",
        "baseAge": 23,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "BR",
        "level": 77,
        "potential": 80,
        "form": 71,
        "fatigue": 0,
        "mental": 80,
        "shotcalling": 79,
        "laning": 79,
        "teamfight": 82,
        "mechanics": 83,
        "championPool": [
          "Ahri",
          "Taliyah",
          "LeBlanc",
          "Twisted Fate",
          "Syndra"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          83,
          80,
          77,
          72,
          68
        ]
      },
      {
        "id": "loud_adc",
        "name": "Bull",
        "baseAge": 22,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "KR",
        "level": 75,
        "potential": 78,
        "form": 73,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 68,
        "laning": 79,
        "teamfight": 80,
        "mechanics": 79,
        "championPool": [
          "Varus",
          "Caitlyn",
          "Kai'Sa",
          "Ashe",
          "Ezreal"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          81,
          78,
          75,
          70,
          66
        ]
      },
      {
        "id": "loud_support",
        "name": "RedBert",
        "baseAge": 22,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "BR",
        "level": 77,
        "potential": 80,
        "form": 66,
        "fatigue": 0,
        "mental": 81,
        "shotcalling": 80,
        "laning": 78,
        "teamfight": 79,
        "mechanics": 72,
        "championPool": [
          "Thresh",
          "Pyke",
          "Nautilus",
          "Rakan",
          "Bard"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          83,
          80,
          77,
          72,
          68
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "LeBlanc",
        "Vi",
        "Varus",
        "Nautilus",
        "Rakan"
      ],
      "comfortPicks": {
        "TOP": [
          "Renekton",
          "Kennen"
        ],
        "JUNGLE": [
          "Elise",
          "Vi"
        ],
        "MID": [
          "Ahri",
          "Taliyah"
        ],
        "ADC": [
          "Varus",
          "Caitlyn"
        ],
        "SUPPORT": [
          "Thresh",
          "Pyke"
        ]
      },
      "flexPicks": [
        "Pantheon",
        "Taliyah"
      ],
      "riskTolerance": 80
    }
  },
  {
    "id": "los",
    "name": "LOS",
    "shortName": "LOS",
    "region": "LTAS",
    "tier": 2,
    "style": "teamfight",
    "roster": [
      {
        "id": "los_top",
        "name": "Zest",
        "baseAge": 22,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "KR",
        "level": 81,
        "potential": 84,
        "form": 78,
        "fatigue": 0,
        "mental": 84,
        "shotcalling": 74,
        "laning": 86,
        "teamfight": 81,
        "mechanics": 84,
        "championPool": [
          "K'Sante",
          "Rumble",
          "Gnar",
          "Kennen",
          "Sion"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          88,
          85,
          82,
          77,
          73
        ]
      },
      {
        "id": "los_jungle",
        "name": "Drakehero",
        "baseAge": 21,
        "retirementAge": 28,
        "role": "JUNGLE",
        "nationality": "BR",
        "level": 86,
        "potential": 89,
        "form": 65,
        "fatigue": 0,
        "mental": 86,
        "shotcalling": 90,
        "laning": 82,
        "teamfight": 89,
        "mechanics": 85,
        "championPool": [
          "Jarvan IV",
          "Vi",
          "Nocturne",
          "Wukong",
          "Skarner"
        ],
        "traits": [],
        "masteries": [
          92,
          89,
          86,
          81,
          77
        ]
      },
      {
        "id": "los_mid",
        "name": "Curse",
        "baseAge": 25,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "BR",
        "level": 84,
        "potential": 87,
        "form": 78,
        "fatigue": 0,
        "mental": 85,
        "shotcalling": 83,
        "laning": 88,
        "teamfight": 86,
        "mechanics": 87,
        "championPool": [
          "Azir",
          "Ryze",
          "Orianna",
          "Viktor",
          "Hwei"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          91,
          88,
          85,
          80,
          76
        ]
      },
      {
        "id": "los_adc",
        "name": "Feisty",
        "baseAge": 24,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "KR",
        "level": 84,
        "potential": 87,
        "form": 66,
        "fatigue": 0,
        "mental": 81,
        "shotcalling": 79,
        "laning": 89,
        "teamfight": 90,
        "mechanics": 88,
        "championPool": [
          "Varus",
          "Ashe",
          "Ezreal",
          "Jinx",
          "Aphelios"
        ],
        "traits": [],
        "masteries": [
          90,
          87,
          84,
          79,
          75
        ]
      },
      {
        "id": "los_support",
        "name": "Duduhh",
        "baseAge": 26,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "BR",
        "level": 81,
        "potential": 84,
        "form": 69,
        "fatigue": 0,
        "mental": 85,
        "shotcalling": 89,
        "laning": 81,
        "teamfight": 85,
        "mechanics": 77,
        "championPool": [
          "Bard",
          "Nautilus",
          "Rakan",
          "Rell",
          "Braum"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          88,
          85,
          82,
          77,
          73
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "K'Sante",
          "Rumble"
        ],
        "JUNGLE": [
          "Jarvan IV",
          "Vi"
        ],
        "MID": [
          "Azir",
          "Ryze"
        ],
        "ADC": [
          "Varus",
          "Ashe"
        ],
        "SUPPORT": [
          "Bard",
          "Nautilus"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 75
    }
  },
  {
    "id": "png",
    "name": "paiN Gaming",
    "shortName": "PNG",
    "region": "LTAS",
    "tier": 4,
    "style": "siege",
    "roster": [
      {
        "id": "png_top",
        "name": "Robo",
        "baseAge": 24,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "BR",
        "level": 82,
        "potential": 85,
        "form": 63,
        "fatigue": 0,
        "mental": 83,
        "shotcalling": 77,
        "laning": 87,
        "teamfight": 83,
        "mechanics": 85,
        "championPool": [
          "Sion",
          "K'Sante",
          "Renekton",
          "Jayce",
          "Gangplank"
        ],
        "traits": [],
        "masteries": [
          86,
          83,
          79,
          74,
          70
        ]
      },
      {
        "id": "png_jungle",
        "name": "CarioK",
        "baseAge": 23,
        "retirementAge": 26,
        "role": "JUNGLE",
        "nationality": "BR",
        "level": 73,
        "potential": 76,
        "form": 58,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 77,
        "laning": 68,
        "teamfight": 79,
        "mechanics": 73,
        "championPool": [
          "Jarvan IV",
          "Sejuani",
          "Maokai",
          "Nidalee",
          "Graves"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          78,
          75,
          71,
          66,
          62
        ]
      },
      {
        "id": "png_mid",
        "name": "Keine",
        "baseAge": 25,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "KR",
        "level": 73,
        "potential": 76,
        "form": 52,
        "fatigue": 0,
        "mental": 70,
        "shotcalling": 75,
        "laning": 76,
        "teamfight": 78,
        "mechanics": 76,
        "championPool": [
          "Viktor",
          "Orianna",
          "Azir",
          "Corki",
          "Hwei"
        ],
        "traits": [],
        "masteries": [
          77,
          74,
          70,
          65,
          61
        ]
      },
      {
        "id": "png_adc",
        "name": "Trigger",
        "baseAge": 24,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "KR",
        "level": 77,
        "potential": 80,
        "form": 53,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 70,
        "laning": 81,
        "teamfight": 81,
        "mechanics": 82,
        "championPool": [
          "Jinx",
          "Aphelios",
          "Caitlyn",
          "Varus",
          "Ezreal"
        ],
        "traits": [],
        "masteries": [
          81,
          78,
          74,
          69,
          65
        ]
      },
      {
        "id": "png_support",
        "name": "Kuri",
        "baseAge": 23,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "BR",
        "level": 76,
        "potential": 79,
        "form": 53,
        "fatigue": 0,
        "mental": 79,
        "shotcalling": 83,
        "laning": 75,
        "teamfight": 81,
        "mechanics": 73,
        "championPool": [
          "Milio",
          "Karma",
          "Lulu",
          "Nami",
          "Thresh"
        ],
        "traits": [],
        "masteries": [
          80,
          77,
          73,
          68,
          64
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Caitlyn",
        "Azir",
        "Jinx",
        "Lulu",
        "Rumble"
      ],
      "comfortPicks": {
        "TOP": [
          "Sion",
          "K'Sante"
        ],
        "JUNGLE": [
          "Jarvan IV",
          "Sejuani"
        ],
        "MID": [
          "Viktor",
          "Orianna"
        ],
        "ADC": [
          "Jinx",
          "Aphelios"
        ],
        "SUPPORT": [
          "Milio",
          "Karma"
        ]
      },
      "flexPicks": [
        "Tristana",
        "Sion"
      ],
      "riskTolerance": 62
    }
  },
  {
    "id": "red",
    "name": "RED Canids",
    "shortName": "RED",
    "region": "LTAS",
    "tier": 1,
    "style": "pick",
    "roster": [
      {
        "id": "red_top",
        "name": "zynts",
        "baseAge": 24,
        "retirementAge": 28,
        "role": "TOP",
        "nationality": "BR",
        "level": 86,
        "potential": 89,
        "form": 88,
        "fatigue": 0,
        "mental": 89,
        "shotcalling": 83,
        "laning": 90,
        "teamfight": 86,
        "mechanics": 88,
        "championPool": [
          "Jayce",
          "Renekton",
          "Kennen",
          "Jax",
          "Camille"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          94,
          91,
          88,
          83,
          79
        ]
      },
      {
        "id": "red_jungle",
        "name": "STEPZ",
        "baseAge": 21,
        "retirementAge": 29,
        "role": "JUNGLE",
        "nationality": "BR",
        "level": 86,
        "potential": 89,
        "form": 72,
        "fatigue": 0,
        "mental": 84,
        "shotcalling": 95,
        "laning": 81,
        "teamfight": 91,
        "mechanics": 86,
        "championPool": [
          "Vi",
          "Lee Sin",
          "Elise",
          "Nocturne",
          "Pantheon"
        ],
        "traits": [
          "igl"
        ],
        "masteries": [
          93,
          90,
          87,
          82,
          78
        ]
      },
      {
        "id": "red_mid",
        "name": "Kaze",
        "baseAge": 26,
        "retirementAge": 29,
        "role": "MID",
        "nationality": "BR",
        "level": 90,
        "potential": 93,
        "form": 67,
        "fatigue": 0,
        "mental": 88,
        "shotcalling": 91,
        "laning": 95,
        "teamfight": 94,
        "mechanics": 93,
        "championPool": [
          "Taliyah",
          "LeBlanc",
          "Ahri",
          "Twisted Fate",
          "Syndra"
        ],
        "traits": [],
        "masteries": [
          96,
          94,
          91,
          86,
          82
        ]
      },
      {
        "id": "red_adc",
        "name": "Rabelo",
        "baseAge": 22,
        "retirementAge": 29,
        "role": "ADC",
        "nationality": "BR",
        "level": 90,
        "potential": 93,
        "form": 71,
        "fatigue": 0,
        "mental": 87,
        "shotcalling": 82,
        "laning": 92,
        "teamfight": 97,
        "mechanics": 98,
        "championPool": [
          "Varus",
          "Caitlyn",
          "Kai'Sa",
          "Ashe",
          "Ezreal"
        ],
        "traits": [
          "mechanical"
        ],
        "masteries": [
          96,
          94,
          91,
          87,
          83
        ]
      },
      {
        "id": "red_support",
        "name": "frosty",
        "baseAge": 24,
        "retirementAge": 31,
        "role": "SUPPORT",
        "nationality": "BR",
        "level": 90,
        "potential": 93,
        "form": 76,
        "fatigue": 0,
        "mental": 93,
        "shotcalling": 98,
        "laning": 92,
        "teamfight": 94,
        "mechanics": 86,
        "championPool": [
          "Nautilus",
          "Thresh",
          "Pyke",
          "Rakan",
          "Bard"
        ],
        "traits": [
          "igl"
        ],
        "masteries": [
          96,
          94,
          91,
          86,
          82
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "LeBlanc",
        "Vi",
        "Varus",
        "Nautilus",
        "Rakan"
      ],
      "comfortPicks": {
        "TOP": [
          "Jayce",
          "Renekton"
        ],
        "JUNGLE": [
          "Vi",
          "Lee Sin"
        ],
        "MID": [
          "Taliyah",
          "LeBlanc"
        ],
        "ADC": [
          "Varus",
          "Caitlyn"
        ],
        "SUPPORT": [
          "Nautilus",
          "Thresh"
        ]
      },
      "flexPicks": [
        "Pantheon",
        "Taliyah"
      ],
      "riskTolerance": 90
    }
  },
  {
    "id": "key",
    "name": "Vivo Keyd Stars",
    "shortName": "KEY",
    "region": "LTAS",
    "tier": 2,
    "style": "teamfight",
    "roster": [
      {
        "id": "key_top",
        "name": "Wizer",
        "baseAge": 25,
        "retirementAge": 28,
        "role": "TOP",
        "nationality": "BR",
        "level": 85,
        "potential": 88,
        "form": 69,
        "fatigue": 0,
        "mental": 86,
        "shotcalling": 81,
        "laning": 90,
        "teamfight": 88,
        "mechanics": 88,
        "championPool": [
          "K'Sante",
          "Gnar",
          "Renekton",
          "Rumble",
          "Kennen"
        ],
        "traits": [],
        "masteries": [
          91,
          88,
          85,
          80,
          76
        ]
      },
      {
        "id": "key_jungle",
        "name": "Disamis",
        "baseAge": 21,
        "retirementAge": 27,
        "role": "JUNGLE",
        "nationality": "BR",
        "level": 83,
        "potential": 86,
        "form": 64,
        "fatigue": 0,
        "mental": 82,
        "shotcalling": 86,
        "laning": 78,
        "teamfight": 87,
        "mechanics": 86,
        "championPool": [
          "Nocturne",
          "Jarvan IV",
          "Vi",
          "Wukong",
          "Skarner"
        ],
        "traits": [],
        "masteries": [
          89,
          86,
          83,
          78,
          74
        ]
      },
      {
        "id": "key_mid",
        "name": "Mireu",
        "baseAge": 21,
        "retirementAge": 28,
        "role": "MID",
        "nationality": "KR",
        "level": 85,
        "potential": 88,
        "form": 63,
        "fatigue": 0,
        "mental": 82,
        "shotcalling": 86,
        "laning": 91,
        "teamfight": 87,
        "mechanics": 90,
        "championPool": [
          "Azir",
          "Ryze",
          "Orianna",
          "Viktor",
          "Hwei"
        ],
        "traits": [],
        "masteries": [
          91,
          88,
          85,
          80,
          76
        ]
      },
      {
        "id": "key_adc",
        "name": "ceo",
        "baseAge": 26,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "BR",
        "level": 81,
        "potential": 84,
        "form": 69,
        "fatigue": 0,
        "mental": 82,
        "shotcalling": 76,
        "laning": 83,
        "teamfight": 85,
        "mechanics": 87,
        "championPool": [
          "Varus",
          "Ashe",
          "Ezreal",
          "Jinx",
          "Aphelios"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          88,
          85,
          82,
          77,
          73
        ]
      },
      {
        "id": "key_support",
        "name": "Kaiwing",
        "baseAge": 25,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 82,
        "potential": 85,
        "form": 77,
        "fatigue": 0,
        "mental": 87,
        "shotcalling": 88,
        "laning": 79,
        "teamfight": 83,
        "mechanics": 79,
        "championPool": [
          "Rakan",
          "Nautilus",
          "Bard",
          "Rell",
          "Braum"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          89,
          86,
          83,
          78,
          74
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "K'Sante",
          "Gnar"
        ],
        "JUNGLE": [
          "Nocturne",
          "Jarvan IV"
        ],
        "MID": [
          "Azir",
          "Ryze"
        ],
        "ADC": [
          "Varus",
          "Ashe"
        ],
        "SUPPORT": [
          "Rakan",
          "Nautilus"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 75
    }
  },
  {
    "id": "cfo",
    "name": "CTBC Flying Oyster",
    "shortName": "CFO",
    "region": "LCP",
    "tier": 1,
    "style": "teamfight",
    "roster": [
      {
        "id": "cfo_top",
        "name": "Rest",
        "baseAge": 26,
        "retirementAge": 28,
        "role": "TOP",
        "nationality": "APAC",
        "level": 88,
        "potential": 91,
        "form": 74,
        "fatigue": 0,
        "mental": 86,
        "shotcalling": 86,
        "laning": 91,
        "teamfight": 89,
        "mechanics": 90,
        "championPool": [
          "K'Sante",
          "Rumble",
          "Gnar",
          "Kennen",
          "Sion"
        ],
        "traits": [],
        "masteries": [
          95,
          92,
          89,
          84,
          80
        ]
      },
      {
        "id": "cfo_jungle",
        "name": "Shad0w",
        "baseAge": 25,
        "retirementAge": 29,
        "role": "JUNGLE",
        "nationality": "CN",
        "level": 89,
        "potential": 92,
        "form": 79,
        "fatigue": 0,
        "mental": 90,
        "shotcalling": 99,
        "laning": 85,
        "teamfight": 91,
        "mechanics": 90,
        "championPool": [
          "Nocturne",
          "Jarvan IV",
          "Vi",
          "Wukong",
          "Skarner"
        ],
        "traits": [
          "consistant",
          "igl"
        ],
        "masteries": [
          96,
          94,
          91,
          86,
          82
        ]
      },
      {
        "id": "cfo_mid",
        "name": "Pungyeon",
        "baseAge": 23,
        "retirementAge": 28,
        "role": "MID",
        "nationality": "KR",
        "level": 88,
        "potential": 91,
        "form": 67,
        "fatigue": 0,
        "mental": 86,
        "shotcalling": 88,
        "laning": 90,
        "teamfight": 93,
        "mechanics": 91,
        "championPool": [
          "Ryze",
          "Orianna",
          "Azir",
          "Viktor",
          "Hwei"
        ],
        "traits": [],
        "masteries": [
          95,
          92,
          89,
          84,
          80
        ]
      },
      {
        "id": "cfo_adc",
        "name": "Doggo",
        "baseAge": 23,
        "retirementAge": 28,
        "role": "ADC",
        "nationality": "APAC",
        "level": 86,
        "potential": 89,
        "form": 79,
        "fatigue": 0,
        "mental": 89,
        "shotcalling": 81,
        "laning": 88,
        "teamfight": 90,
        "mechanics": 92,
        "championPool": [
          "Varus",
          "Kai'Sa",
          "Ezreal",
          "Jinx",
          "Aphelios"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          94,
          91,
          88,
          83,
          79
        ]
      },
      {
        "id": "cfo_support",
        "name": "Kino",
        "baseAge": 23,
        "retirementAge": 30,
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 86,
        "potential": 89,
        "form": 88,
        "fatigue": 0,
        "mental": 93,
        "shotcalling": 97,
        "laning": 86,
        "teamfight": 92,
        "mechanics": 83,
        "championPool": [
          "Bard",
          "Nautilus",
          "Rakan",
          "Rell",
          "Braum"
        ],
        "traits": [
          "consistant",
          "igl"
        ],
        "masteries": [
          94,
          91,
          88,
          83,
          79
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "K'Sante",
          "Rumble"
        ],
        "JUNGLE": [
          "Nocturne",
          "Jarvan IV"
        ],
        "MID": [
          "Ryze",
          "Orianna"
        ],
        "ADC": [
          "Varus",
          "Kai'Sa"
        ],
        "SUPPORT": [
          "Bard",
          "Nautilus"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 80
    }
  },
  {
    "id": "dcg",
    "name": "Deep Cross Gaming",
    "shortName": "DCG",
    "region": "LCP",
    "tier": 4,
    "style": "poke",
    "roster": [
      {
        "id": "dcg_top",
        "name": "Flauren",
        "baseAge": 25,
        "retirementAge": 25,
        "role": "TOP",
        "nationality": "APAC",
        "level": 70,
        "potential": 73,
        "form": 59,
        "fatigue": 0,
        "mental": 66,
        "shotcalling": 66,
        "laning": 76,
        "teamfight": 71,
        "mechanics": 74,
        "championPool": [
          "Rumble",
          "Jayce",
          "Kennen",
          "Gnar",
          "Gangplank"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ],
        "masteries": [
          75,
          72,
          68,
          63,
          59
        ]
      },
      {
        "id": "dcg_jungle",
        "name": "Pop9",
        "baseAge": 27,
        "retirementAge": 26,
        "role": "JUNGLE",
        "nationality": "APAC",
        "level": 73,
        "potential": 76,
        "form": 68,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 78,
        "laning": 70,
        "teamfight": 75,
        "mechanics": 75,
        "championPool": [
          "Graves",
          "Ivern",
          "Nidalee",
          "Elise",
          "Jarvan IV"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          78,
          75,
          71,
          66,
          62
        ]
      },
      {
        "id": "dcg_mid",
        "name": "HongSuo",
        "baseAge": 26,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "APAC",
        "level": 75,
        "potential": 78,
        "form": 54,
        "fatigue": 0,
        "mental": 72,
        "shotcalling": 73,
        "laning": 77,
        "teamfight": 78,
        "mechanics": 81,
        "championPool": [
          "Hwei",
          "Zoe",
          "Orianna",
          "Corki",
          "LeBlanc"
        ],
        "traits": [],
        "masteries": [
          79,
          76,
          72,
          67,
          63
        ]
      },
      {
        "id": "dcg_adc",
        "name": "XiaoXiang",
        "baseAge": 25,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "APAC",
        "level": 76,
        "potential": 79,
        "form": 66,
        "fatigue": 0,
        "mental": 80,
        "shotcalling": 70,
        "laning": 77,
        "teamfight": 80,
        "mechanics": 82,
        "championPool": [
          "Ezreal",
          "Varus",
          "Caitlyn",
          "Ashe",
          "Kai'Sa"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          81,
          78,
          74,
          69,
          65
        ]
      },
      {
        "id": "dcg_support",
        "name": "ShiauC",
        "baseAge": 27,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 75,
        "potential": 78,
        "form": 60,
        "fatigue": 0,
        "mental": 79,
        "shotcalling": 79,
        "laning": 76,
        "teamfight": 79,
        "mechanics": 73,
        "championPool": [
          "Nami",
          "Karma",
          "Milio",
          "Bard",
          "Lulu"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          80,
          77,
          73,
          68,
          64
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Varus",
        "Ezreal",
        "Jayce",
        "Hwei",
        "Karma"
      ],
      "comfortPicks": {
        "TOP": [
          "Rumble",
          "Jayce"
        ],
        "JUNGLE": [
          "Graves",
          "Ivern"
        ],
        "MID": [
          "Hwei",
          "Zoe"
        ],
        "ADC": [
          "Ezreal",
          "Varus"
        ],
        "SUPPORT": [
          "Nami",
          "Karma"
        ]
      },
      "flexPicks": [
        "Karma",
        "Jayce"
      ],
      "riskTolerance": 69
    }
  },
  {
    "id": "dfm",
    "name": "DetonatioN FocusMe",
    "shortName": "DFM",
    "region": "LCP",
    "tier": 3,
    "style": "siege",
    "roster": [
      {
        "id": "dfm_top",
        "name": "Momo",
        "baseAge": 26,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "APAC",
        "level": 81,
        "potential": 84,
        "form": 60,
        "fatigue": 0,
        "mental": 82,
        "shotcalling": 76,
        "laning": 86,
        "teamfight": 82,
        "mechanics": 84,
        "championPool": [
          "Sion",
          "Gnar",
          "Ornn",
          "Jayce",
          "Gangplank"
        ],
        "traits": [],
        "masteries": [
          86,
          83,
          80,
          75,
          71
        ]
      },
      {
        "id": "dfm_jungle",
        "name": "Citrus",
        "baseAge": 21,
        "retirementAge": 26,
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 79,
        "potential": 82,
        "form": 61,
        "fatigue": 0,
        "mental": 80,
        "shotcalling": 85,
        "laning": 73,
        "teamfight": 84,
        "mechanics": 79,
        "championPool": [
          "Jarvan IV",
          "Sejuani",
          "Maokai",
          "Nidalee",
          "Graves"
        ],
        "traits": [],
        "masteries": [
          84,
          81,
          78,
          73,
          69
        ]
      },
      {
        "id": "dfm_mid",
        "name": "Fisher",
        "baseAge": 26,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "KR",
        "level": 81,
        "potential": 84,
        "form": 75,
        "fatigue": 0,
        "mental": 82,
        "shotcalling": 80,
        "laning": 83,
        "teamfight": 83,
        "mechanics": 86,
        "championPool": [
          "Viktor",
          "Orianna",
          "Azir",
          "Corki",
          "Hwei"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          87,
          84,
          81,
          76,
          72
        ]
      },
      {
        "id": "dfm_adc",
        "name": "Kakkun",
        "baseAge": 26,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "APAC",
        "level": 76,
        "potential": 79,
        "form": 75,
        "fatigue": 0,
        "mental": 79,
        "shotcalling": 69,
        "laning": 76,
        "teamfight": 84,
        "mechanics": 80,
        "championPool": [
          "Aphelios",
          "Caitlyn",
          "Jinx",
          "Varus",
          "Ezreal"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          82,
          79,
          76,
          71,
          67
        ]
      },
      {
        "id": "dfm_support",
        "name": "Woody",
        "baseAge": 25,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 82,
        "potential": 85,
        "form": 73,
        "fatigue": 0,
        "mental": 86,
        "shotcalling": 88,
        "laning": 81,
        "teamfight": 88,
        "mechanics": 77,
        "championPool": [
          "Karma",
          "Lulu",
          "Milio",
          "Nami",
          "Thresh"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          88,
          85,
          82,
          77,
          73
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Caitlyn",
        "Azir",
        "Jinx",
        "Lulu",
        "Rumble"
      ],
      "comfortPicks": {
        "TOP": [
          "Sion",
          "Gnar"
        ],
        "JUNGLE": [
          "Jarvan IV",
          "Sejuani"
        ],
        "MID": [
          "Viktor",
          "Orianna"
        ],
        "ADC": [
          "Aphelios",
          "Caitlyn"
        ],
        "SUPPORT": [
          "Karma",
          "Lulu"
        ]
      },
      "flexPicks": [
        "Tristana",
        "Sion"
      ],
      "riskTolerance": 67
    }
  },
  {
    "id": "fsh",
    "name": "Fukuoka SoftBank HAWKS gaming",
    "shortName": "FSH",
    "region": "LCP",
    "tier": 2,
    "style": "teamfight",
    "roster": [
      {
        "id": "fsh_top",
        "name": "Evi",
        "baseAge": 30,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "APAC",
        "level": 84,
        "potential": 87,
        "form": 66,
        "fatigue": 0,
        "mental": 85,
        "shotcalling": 78,
        "laning": 89,
        "teamfight": 83,
        "mechanics": 88,
        "championPool": [
          "Gnar",
          "K'Sante",
          "Rumble",
          "Kennen",
          "Sion"
        ],
        "traits": [],
        "masteries": [
          90,
          87,
          84,
          79,
          75
        ]
      },
      {
        "id": "fsh_jungle",
        "name": "Van1",
        "baseAge": 21,
        "retirementAge": 28,
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 84,
        "potential": 87,
        "form": 82,
        "fatigue": 0,
        "mental": 87,
        "shotcalling": 95,
        "laning": 78,
        "teamfight": 89,
        "mechanics": 87,
        "championPool": [
          "Vi",
          "Nocturne",
          "Jarvan IV",
          "Wukong",
          "Skarner"
        ],
        "traits": [
          "consistant",
          "igl"
        ],
        "masteries": [
          91,
          88,
          85,
          80,
          76
        ]
      },
      {
        "id": "fsh_mid",
        "name": "Aria",
        "baseAge": 26,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "APAC",
        "level": 84,
        "potential": 87,
        "form": 79,
        "fatigue": 0,
        "mental": 85,
        "shotcalling": 84,
        "laning": 87,
        "teamfight": 85,
        "mechanics": 90,
        "championPool": [
          "Azir",
          "Ryze",
          "Orianna",
          "Viktor",
          "Hwei"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          91,
          88,
          85,
          80,
          76
        ]
      },
      {
        "id": "fsh_adc",
        "name": "Marble",
        "baseAge": 22,
        "retirementAge": 28,
        "role": "ADC",
        "nationality": "APAC",
        "level": 87,
        "potential": 90,
        "form": 68,
        "fatigue": 0,
        "mental": 88,
        "shotcalling": 82,
        "laning": 89,
        "teamfight": 94,
        "mechanics": 97,
        "championPool": [
          "Ezreal",
          "Varus",
          "Ashe",
          "Jinx",
          "Aphelios"
        ],
        "traits": [
          "mechanical"
        ],
        "masteries": [
          94,
          91,
          88,
          83,
          79
        ]
      },
      {
        "id": "fsh_support",
        "name": "Vsta",
        "baseAge": 26,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 84,
        "potential": 87,
        "form": 69,
        "fatigue": 0,
        "mental": 88,
        "shotcalling": 89,
        "laning": 81,
        "teamfight": 88,
        "mechanics": 82,
        "championPool": [
          "Nautilus",
          "Rakan",
          "Bard",
          "Rell",
          "Braum"
        ],
        "traits": [],
        "masteries": [
          90,
          87,
          84,
          79,
          75
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "Gnar",
          "K'Sante"
        ],
        "JUNGLE": [
          "Vi",
          "Nocturne"
        ],
        "MID": [
          "Azir",
          "Ryze"
        ],
        "ADC": [
          "Ezreal",
          "Varus"
        ],
        "SUPPORT": [
          "Nautilus",
          "Rakan"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 75
    }
  },
  {
    "id": "gam",
    "name": "GAM Esports",
    "shortName": "GAM",
    "region": "LCP",
    "tier": 1,
    "style": "pick",
    "roster": [
      {
        "id": "gam_top",
        "name": "Kiaya",
        "baseAge": 24,
        "retirementAge": 28,
        "role": "TOP",
        "nationality": "APAC",
        "level": 85,
        "potential": 88,
        "form": 70,
        "fatigue": 0,
        "mental": 86,
        "shotcalling": 83,
        "laning": 91,
        "teamfight": 88,
        "mechanics": 89,
        "championPool": [
          "Jayce",
          "Renekton",
          "Kennen",
          "Jax",
          "Camille"
        ],
        "traits": [],
        "masteries": [
          92,
          89,
          86,
          81,
          77
        ]
      },
      {
        "id": "gam_jungle",
        "name": "Draktharr",
        "baseAge": 22,
        "retirementAge": 30,
        "role": "JUNGLE",
        "nationality": "APAC",
        "level": 91,
        "potential": 94,
        "form": 81,
        "fatigue": 0,
        "mental": 91,
        "shotcalling": 99,
        "laning": 89,
        "teamfight": 95,
        "mechanics": 95,
        "championPool": [
          "Vi",
          "Lee Sin",
          "Elise",
          "Nocturne",
          "Pantheon"
        ],
        "traits": [
          "consistant",
          "igl",
          "mechanical"
        ],
        "masteries": [
          96,
          94,
          91,
          87,
          84
        ]
      },
      {
        "id": "gam_mid",
        "name": "Aress",
        "baseAge": 23,
        "retirementAge": 28,
        "role": "MID",
        "nationality": "APAC",
        "level": 85,
        "potential": 88,
        "form": 78,
        "fatigue": 0,
        "mental": 85,
        "shotcalling": 86,
        "laning": 87,
        "teamfight": 86,
        "mechanics": 91,
        "championPool": [
          "Taliyah",
          "LeBlanc",
          "Ahri",
          "Twisted Fate",
          "Syndra"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          93,
          90,
          87,
          82,
          78
        ]
      },
      {
        "id": "gam_adc",
        "name": "Artemis",
        "baseAge": 22,
        "retirementAge": 28,
        "role": "ADC",
        "nationality": "APAC",
        "level": 86,
        "potential": 89,
        "form": 89,
        "fatigue": 0,
        "mental": 86,
        "shotcalling": 79,
        "laning": 91,
        "teamfight": 94,
        "mechanics": 91,
        "championPool": [
          "Caitlyn",
          "Kai'Sa",
          "Varus",
          "Ashe",
          "Ezreal"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          94,
          91,
          88,
          83,
          79
        ]
      },
      {
        "id": "gam_support",
        "name": "Taki",
        "baseAge": 22,
        "retirementAge": 30,
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 85,
        "potential": 88,
        "form": 82,
        "fatigue": 0,
        "mental": 90,
        "shotcalling": 96,
        "laning": 83,
        "teamfight": 90,
        "mechanics": 82,
        "championPool": [
          "Pyke",
          "Nautilus",
          "Thresh",
          "Rakan",
          "Bard"
        ],
        "traits": [
          "consistant",
          "igl"
        ],
        "masteries": [
          93,
          90,
          87,
          82,
          78
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "LeBlanc",
        "Vi",
        "Varus",
        "Nautilus",
        "Rakan"
      ],
      "comfortPicks": {
        "TOP": [
          "Jayce",
          "Renekton"
        ],
        "JUNGLE": [
          "Vi",
          "Lee Sin"
        ],
        "MID": [
          "Taliyah",
          "LeBlanc"
        ],
        "ADC": [
          "Caitlyn",
          "Kai'Sa"
        ],
        "SUPPORT": [
          "Pyke",
          "Nautilus"
        ]
      },
      "flexPicks": [
        "Pantheon",
        "Taliyah"
      ],
      "riskTolerance": 90
    }
  },
  {
    "id": "gzg",
    "name": "Ground Zero Gaming",
    "shortName": "GZG",
    "region": "LCP",
    "tier": 4,
    "style": "splitpush",
    "roster": [
      {
        "id": "gzg_top",
        "name": "1Jiang",
        "baseAge": 24,
        "retirementAge": 26,
        "role": "TOP",
        "nationality": "APAC",
        "level": 72,
        "potential": 75,
        "form": 65,
        "fatigue": 0,
        "mental": 73,
        "shotcalling": 70,
        "laning": 75,
        "teamfight": 73,
        "mechanics": 75,
        "championPool": [
          "Camille",
          "Jax",
          "Fiora",
          "Gwen",
          "Gangplank"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          77,
          74,
          70,
          65,
          61
        ]
      },
      {
        "id": "gzg_jungle",
        "name": "Husha",
        "baseAge": 23,
        "retirementAge": 24,
        "role": "JUNGLE",
        "nationality": "APAC",
        "level": 70,
        "potential": 73,
        "form": 57,
        "fatigue": 0,
        "mental": 68,
        "shotcalling": 75,
        "laning": 64,
        "teamfight": 71,
        "mechanics": 69,
        "championPool": [
          "Nocturne",
          "Viego",
          "Lee Sin",
          "Vi",
          "Wukong"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ],
        "masteries": [
          75,
          72,
          68,
          63,
          59
        ]
      },
      {
        "id": "gzg_mid",
        "name": "JimieN",
        "baseAge": 23,
        "retirementAge": 26,
        "role": "MID",
        "nationality": "APAC",
        "level": 72,
        "potential": 75,
        "form": 61,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 70,
        "laning": 78,
        "teamfight": 75,
        "mechanics": 76,
        "championPool": [
          "Ryze",
          "Akali",
          "Twisted Fate",
          "Yone",
          "LeBlanc"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          77,
          74,
          70,
          65,
          61
        ]
      },
      {
        "id": "gzg_adc",
        "name": "Shunn",
        "baseAge": 25,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "APAC",
        "level": 77,
        "potential": 80,
        "form": 51,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 73,
        "laning": 77,
        "teamfight": 84,
        "mechanics": 81,
        "championPool": [
          "Kai'Sa",
          "Vayne",
          "Ezreal",
          "Lucian",
          "Xayah"
        ],
        "traits": [],
        "masteries": [
          81,
          78,
          74,
          69,
          65
        ]
      },
      {
        "id": "gzg_support",
        "name": "Orca",
        "baseAge": 23,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 75,
        "potential": 78,
        "form": 61,
        "fatigue": 0,
        "mental": 78,
        "shotcalling": 81,
        "laning": 72,
        "teamfight": 79,
        "mechanics": 72,
        "championPool": [
          "Rakan",
          "Bard",
          "Tahm Kench",
          "Thresh",
          "Nautilus"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          80,
          77,
          73,
          68,
          64
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Jax",
        "Fiora",
        "Twisted Fate",
        "Nocturne",
        "Vayne"
      ],
      "comfortPicks": {
        "TOP": [
          "Camille",
          "Jax"
        ],
        "JUNGLE": [
          "Nocturne",
          "Viego"
        ],
        "MID": [
          "Ryze",
          "Akali"
        ],
        "ADC": [
          "Kai'Sa",
          "Vayne"
        ],
        "SUPPORT": [
          "Rakan",
          "Bard"
        ]
      },
      "flexPicks": [
        "Ryze",
        "Vayne"
      ],
      "riskTolerance": 73
    }
  },
  {
    "id": "mvk",
    "name": "MVK Esports",
    "shortName": "MVK",
    "region": "LCP",
    "tier": 3,
    "style": "pick",
    "roster": [
      {
        "id": "mvk_top",
        "name": "Steller",
        "baseAge": 25,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "APAC",
        "level": 82,
        "potential": 85,
        "form": 60,
        "fatigue": 0,
        "mental": 83,
        "shotcalling": 77,
        "laning": 88,
        "teamfight": 82,
        "mechanics": 84,
        "championPool": [
          "Jayce",
          "Renekton",
          "Kennen",
          "Jax",
          "Camille"
        ],
        "traits": [],
        "masteries": [
          87,
          84,
          81,
          76,
          72
        ]
      },
      {
        "id": "mvk_jungle",
        "name": "Kratos",
        "baseAge": 25,
        "retirementAge": 27,
        "role": "JUNGLE",
        "nationality": "APAC",
        "level": 80,
        "potential": 83,
        "form": 57,
        "fatigue": 0,
        "mental": 81,
        "shotcalling": 87,
        "laning": 77,
        "teamfight": 82,
        "mechanics": 82,
        "championPool": [
          "Elise",
          "Vi",
          "Lee Sin",
          "Nocturne",
          "Pantheon"
        ],
        "traits": [],
        "masteries": [
          85,
          82,
          79,
          74,
          70
        ]
      },
      {
        "id": "mvk_mid",
        "name": "Gury",
        "baseAge": 21,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "APAC",
        "level": 80,
        "potential": 83,
        "form": 63,
        "fatigue": 0,
        "mental": 81,
        "shotcalling": 80,
        "laning": 82,
        "teamfight": 83,
        "mechanics": 86,
        "championPool": [
          "Ahri",
          "Taliyah",
          "LeBlanc",
          "Twisted Fate",
          "Syndra"
        ],
        "traits": [],
        "masteries": [
          85,
          82,
          79,
          74,
          70
        ]
      },
      {
        "id": "mvk_adc",
        "name": "Chika",
        "baseAge": 24,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "APAC",
        "level": 76,
        "potential": 79,
        "form": 77,
        "fatigue": 0,
        "mental": 79,
        "shotcalling": 71,
        "laning": 77,
        "teamfight": 80,
        "mechanics": 82,
        "championPool": [
          "Kai'Sa",
          "Varus",
          "Caitlyn",
          "Ashe",
          "Ezreal"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          82,
          79,
          76,
          71,
          67
        ]
      },
      {
        "id": "mvk_support",
        "name": "SiuLoong",
        "baseAge": 22,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 80,
        "potential": 83,
        "form": 67,
        "fatigue": 0,
        "mental": 86,
        "shotcalling": 88,
        "laning": 78,
        "teamfight": 82,
        "mechanics": 78,
        "championPool": [
          "Thresh",
          "Pyke",
          "Nautilus",
          "Rakan",
          "Bard"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          86,
          83,
          80,
          75,
          71
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "LeBlanc",
        "Vi",
        "Varus",
        "Nautilus",
        "Rakan"
      ],
      "comfortPicks": {
        "TOP": [
          "Jayce",
          "Renekton"
        ],
        "JUNGLE": [
          "Elise",
          "Vi"
        ],
        "MID": [
          "Ahri",
          "Taliyah"
        ],
        "ADC": [
          "Kai'Sa",
          "Varus"
        ],
        "SUPPORT": [
          "Thresh",
          "Pyke"
        ]
      },
      "flexPicks": [
        "Pantheon",
        "Taliyah"
      ],
      "riskTolerance": 80
    }
  },
  {
    "id": "tsw",
    "name": "Team Secret Whales",
    "shortName": "TSW",
    "region": "LCP",
    "tier": 2,
    "style": "teamfight",
    "roster": [
      {
        "id": "tsw_top",
        "name": "Pun",
        "baseAge": 23,
        "retirementAge": 28,
        "role": "TOP",
        "nationality": "APAC",
        "level": 87,
        "potential": 90,
        "form": 70,
        "fatigue": 0,
        "mental": 84,
        "shotcalling": 83,
        "laning": 91,
        "teamfight": 89,
        "mechanics": 90,
        "championPool": [
          "Gnar",
          "K'Sante",
          "Rumble",
          "Kennen",
          "Sion"
        ],
        "traits": [],
        "masteries": [
          93,
          90,
          87,
          82,
          78
        ]
      },
      {
        "id": "tsw_jungle",
        "name": "Hizto",
        "baseAge": 26,
        "retirementAge": 27,
        "role": "JUNGLE",
        "nationality": "APAC",
        "level": 81,
        "potential": 84,
        "form": 83,
        "fatigue": 0,
        "mental": 84,
        "shotcalling": 87,
        "laning": 75,
        "teamfight": 86,
        "mechanics": 83,
        "championPool": [
          "Nocturne",
          "Jarvan IV",
          "Vi",
          "Wukong",
          "Skarner"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          88,
          85,
          82,
          77,
          73
        ]
      },
      {
        "id": "tsw_mid",
        "name": "Dire",
        "baseAge": 21,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "APAC",
        "level": 82,
        "potential": 85,
        "form": 81,
        "fatigue": 0,
        "mental": 86,
        "shotcalling": 83,
        "laning": 87,
        "teamfight": 87,
        "mechanics": 85,
        "championPool": [
          "Azir",
          "Ryze",
          "Orianna",
          "Viktor",
          "Hwei"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          89,
          86,
          83,
          78,
          74
        ]
      },
      {
        "id": "tsw_adc",
        "name": "Eddie",
        "baseAge": 21,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "APAC",
        "level": 83,
        "potential": 86,
        "form": 71,
        "fatigue": 0,
        "mental": 86,
        "shotcalling": 76,
        "laning": 85,
        "teamfight": 88,
        "mechanics": 88,
        "championPool": [
          "Varus",
          "Ashe",
          "Ezreal",
          "Jinx",
          "Aphelios"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          90,
          87,
          84,
          79,
          75
        ]
      },
      {
        "id": "tsw_support",
        "name": "Bie",
        "baseAge": 25,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 82,
        "potential": 85,
        "form": 75,
        "fatigue": 0,
        "mental": 87,
        "shotcalling": 87,
        "laning": 80,
        "teamfight": 85,
        "mechanics": 80,
        "championPool": [
          "Rakan",
          "Bard",
          "Nautilus",
          "Rell",
          "Braum"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          89,
          86,
          83,
          78,
          74
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "Gnar",
          "K'Sante"
        ],
        "JUNGLE": [
          "Nocturne",
          "Jarvan IV"
        ],
        "MID": [
          "Azir",
          "Ryze"
        ],
        "ADC": [
          "Varus",
          "Ashe"
        ],
        "SUPPORT": [
          "Rakan",
          "Bard"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 75
    }
  },
  {
    "id": "arn",
    "name": "Arneb",
    "shortName": "ARN",
    "region": "LJL",
    "tier": 3,
    "style": "teamfight",
    "roster": [
      {
        "id": "arn_top",
        "name": "leaf",
        "baseAge": 25,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "APAC",
        "level": 76,
        "potential": 79,
        "form": 75,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 70,
        "laning": 80,
        "teamfight": 77,
        "mechanics": 77,
        "championPool": [
          "Gnar",
          "K'Sante",
          "Rumble",
          "Kennen",
          "Sion"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          82,
          79,
          76,
          71,
          67
        ]
      },
      {
        "id": "arn_jungle",
        "name": "Kania",
        "baseAge": 25,
        "retirementAge": 27,
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 80,
        "potential": 83,
        "form": 69,
        "fatigue": 0,
        "mental": 81,
        "shotcalling": 85,
        "laning": 75,
        "teamfight": 84,
        "mechanics": 79,
        "championPool": [
          "Jarvan IV",
          "Vi",
          "Nocturne",
          "Wukong",
          "Skarner"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          86,
          83,
          80,
          75,
          71
        ]
      },
      {
        "id": "arn_mid",
        "name": "Daemi",
        "baseAge": 26,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "KR",
        "level": 81,
        "potential": 84,
        "form": 59,
        "fatigue": 0,
        "mental": 78,
        "shotcalling": 80,
        "laning": 87,
        "teamfight": 83,
        "mechanics": 86,
        "championPool": [
          "Orianna",
          "Azir",
          "Ryze",
          "Viktor",
          "Hwei"
        ],
        "traits": [],
        "masteries": [
          86,
          83,
          80,
          75,
          71
        ]
      },
      {
        "id": "arn_adc",
        "name": "dresscode",
        "baseAge": 25,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "APAC",
        "level": 75,
        "potential": 78,
        "form": 73,
        "fatigue": 0,
        "mental": 79,
        "shotcalling": 68,
        "laning": 76,
        "teamfight": 80,
        "mechanics": 80,
        "championPool": [
          "Varus",
          "Ashe",
          "Ezreal",
          "Jinx",
          "Aphelios"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          81,
          78,
          75,
          70,
          66
        ]
      },
      {
        "id": "arn_support",
        "name": "Taiyaki",
        "baseAge": 22,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 80,
        "potential": 83,
        "form": 75,
        "fatigue": 0,
        "mental": 86,
        "shotcalling": 85,
        "laning": 82,
        "teamfight": 83,
        "mechanics": 78,
        "championPool": [
          "Nautilus",
          "Rakan",
          "Bard",
          "Rell",
          "Braum"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          86,
          83,
          80,
          75,
          71
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "Gnar",
          "K'Sante"
        ],
        "JUNGLE": [
          "Jarvan IV",
          "Vi"
        ],
        "MID": [
          "Orianna",
          "Azir"
        ],
        "ADC": [
          "Varus",
          "Ashe"
        ],
        "SUPPORT": [
          "Nautilus",
          "Rakan"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 70
    }
  },
  {
    "id": "dfma",
    "name": "DetonatioN FocusMe Academy",
    "shortName": "DFMA",
    "region": "LJL",
    "tier": 2,
    "style": "siege",
    "roster": [
      {
        "id": "dfma_top",
        "name": "Potential",
        "baseAge": 22,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "KR",
        "level": 84,
        "potential": 87,
        "form": 81,
        "fatigue": 0,
        "mental": 85,
        "shotcalling": 78,
        "laning": 87,
        "teamfight": 87,
        "mechanics": 87,
        "championPool": [
          "Sion",
          "Gnar",
          "Ornn",
          "Jayce",
          "Gangplank"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          91,
          88,
          85,
          80,
          76
        ]
      },
      {
        "id": "dfma_jungle",
        "name": "Grit",
        "baseAge": 25,
        "retirementAge": 29,
        "role": "JUNGLE",
        "nationality": "APAC",
        "level": 85,
        "potential": 88,
        "form": 80,
        "fatigue": 0,
        "mental": 88,
        "shotcalling": 94,
        "laning": 79,
        "teamfight": 87,
        "mechanics": 87,
        "championPool": [
          "Maokai",
          "Jarvan IV",
          "Sejuani",
          "Nidalee",
          "Graves"
        ],
        "traits": [
          "consistant",
          "igl"
        ],
        "masteries": [
          92,
          89,
          86,
          81,
          77
        ]
      },
      {
        "id": "dfma_mid",
        "name": "Ravvy",
        "baseAge": 24,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "APAC",
        "level": 80,
        "potential": 83,
        "form": 79,
        "fatigue": 0,
        "mental": 83,
        "shotcalling": 79,
        "laning": 86,
        "teamfight": 85,
        "mechanics": 83,
        "championPool": [
          "Viktor",
          "Orianna",
          "Azir",
          "Corki",
          "Hwei"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          87,
          84,
          81,
          76,
          72
        ]
      },
      {
        "id": "dfma_adc",
        "name": "Damocles",
        "baseAge": 22,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "KR",
        "level": 80,
        "potential": 83,
        "form": 64,
        "fatigue": 0,
        "mental": 78,
        "shotcalling": 74,
        "laning": 82,
        "teamfight": 86,
        "mechanics": 84,
        "championPool": [
          "Jinx",
          "Aphelios",
          "Caitlyn",
          "Varus",
          "Ezreal"
        ],
        "traits": [],
        "masteries": [
          86,
          83,
          80,
          75,
          71
        ]
      },
      {
        "id": "dfma_support",
        "name": "Kurahuto",
        "baseAge": 25,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 82,
        "potential": 85,
        "form": 65,
        "fatigue": 0,
        "mental": 81,
        "shotcalling": 86,
        "laning": 84,
        "teamfight": 84,
        "mechanics": 80,
        "championPool": [
          "Lulu",
          "Milio",
          "Karma",
          "Nami",
          "Thresh"
        ],
        "traits": [],
        "masteries": [
          88,
          85,
          82,
          77,
          73
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Caitlyn",
        "Azir",
        "Jinx",
        "Lulu",
        "Rumble"
      ],
      "comfortPicks": {
        "TOP": [
          "Sion",
          "Gnar"
        ],
        "JUNGLE": [
          "Maokai",
          "Jarvan IV"
        ],
        "MID": [
          "Viktor",
          "Orianna"
        ],
        "ADC": [
          "Jinx",
          "Aphelios"
        ],
        "SUPPORT": [
          "Lulu",
          "Milio"
        ]
      },
      "flexPicks": [
        "Tristana",
        "Sion"
      ],
      "riskTolerance": 72
    }
  },
  {
    "id": "fnl",
    "name": "FENNEL",
    "shortName": "FNL",
    "region": "LJL",
    "tier": 1,
    "style": "teamfight",
    "roster": [
      {
        "id": "fnl_top",
        "name": "kkkkkkkkk",
        "baseAge": 23,
        "retirementAge": 28,
        "role": "TOP",
        "nationality": "APAC",
        "level": 87,
        "potential": 90,
        "form": 81,
        "fatigue": 0,
        "mental": 89,
        "shotcalling": 80,
        "laning": 92,
        "teamfight": 88,
        "mechanics": 94,
        "championPool": [
          "Rumble",
          "Gnar",
          "K'Sante",
          "Kennen",
          "Sion"
        ],
        "traits": [
          "consistant",
          "mechanical"
        ],
        "masteries": [
          96,
          93,
          90,
          85,
          81
        ]
      },
      {
        "id": "fnl_jungle",
        "name": "Ellim",
        "baseAge": 23,
        "retirementAge": 29,
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 89,
        "potential": 92,
        "form": 86,
        "fatigue": 0,
        "mental": 91,
        "shotcalling": 99,
        "laning": 84,
        "teamfight": 92,
        "mechanics": 90,
        "championPool": [
          "Nocturne",
          "Jarvan IV",
          "Vi",
          "Wukong",
          "Skarner"
        ],
        "traits": [
          "consistant",
          "igl"
        ],
        "masteries": [
          96,
          94,
          91,
          86,
          82
        ]
      },
      {
        "id": "fnl_mid",
        "name": "DICE",
        "baseAge": 22,
        "retirementAge": 28,
        "role": "MID",
        "nationality": "KR",
        "level": 87,
        "potential": 90,
        "form": 82,
        "fatigue": 0,
        "mental": 87,
        "shotcalling": 89,
        "laning": 90,
        "teamfight": 90,
        "mechanics": 95,
        "championPool": [
          "Azir",
          "Ryze",
          "Orianna",
          "Viktor",
          "Hwei"
        ],
        "traits": [
          "consistant",
          "mechanical"
        ],
        "masteries": [
          96,
          93,
          90,
          85,
          81
        ]
      },
      {
        "id": "fnl_adc",
        "name": "MayR",
        "baseAge": 24,
        "retirementAge": 28,
        "role": "ADC",
        "nationality": "APAC",
        "level": 89,
        "potential": 92,
        "form": 67,
        "fatigue": 0,
        "mental": 90,
        "shotcalling": 82,
        "laning": 92,
        "teamfight": 96,
        "mechanics": 96,
        "championPool": [
          "Ezreal",
          "Varus",
          "Ashe",
          "Jinx",
          "Aphelios"
        ],
        "traits": [
          "mechanical"
        ],
        "masteries": [
          96,
          94,
          91,
          86,
          82
        ]
      },
      {
        "id": "fnl_support",
        "name": "Bruce",
        "baseAge": 23,
        "retirementAge": 30,
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 87,
        "potential": 90,
        "form": 73,
        "fatigue": 0,
        "mental": 89,
        "shotcalling": 98,
        "laning": 85,
        "teamfight": 91,
        "mechanics": 84,
        "championPool": [
          "Bard",
          "Nautilus",
          "Rakan",
          "Rell",
          "Braum"
        ],
        "traits": [
          "igl"
        ],
        "masteries": [
          94,
          91,
          88,
          83,
          79
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "Rumble",
          "Gnar"
        ],
        "JUNGLE": [
          "Nocturne",
          "Jarvan IV"
        ],
        "MID": [
          "Azir",
          "Ryze"
        ],
        "ADC": [
          "Ezreal",
          "Varus"
        ],
        "SUPPORT": [
          "Bard",
          "Nautilus"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 80
    }
  },
  {
    "id": "lgg",
    "name": "L Guide Gaming",
    "shortName": "LGG",
    "region": "LJL",
    "tier": 4,
    "style": "pick",
    "roster": [
      {
        "id": "lgg_top",
        "name": "SnowRabbit",
        "baseAge": 27,
        "retirementAge": 26,
        "role": "TOP",
        "nationality": "APAC",
        "level": 72,
        "potential": 75,
        "form": 70,
        "fatigue": 0,
        "mental": 75,
        "shotcalling": 67,
        "laning": 74,
        "teamfight": 73,
        "mechanics": 76,
        "championPool": [
          "Kennen",
          "Jayce",
          "Renekton",
          "Jax",
          "Camille"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          77,
          74,
          70,
          65,
          61
        ]
      },
      {
        "id": "lgg_jungle",
        "name": "HyunSim",
        "baseAge": 21,
        "retirementAge": 26,
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 74,
        "potential": 77,
        "form": 53,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 80,
        "laning": 71,
        "teamfight": 77,
        "mechanics": 76,
        "championPool": [
          "Lee Sin",
          "Elise",
          "Vi",
          "Nocturne",
          "Pantheon"
        ],
        "traits": [],
        "masteries": [
          78,
          75,
          71,
          66,
          62
        ]
      },
      {
        "id": "lgg_mid",
        "name": "p1ng",
        "baseAge": 24,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "APAC",
        "level": 75,
        "potential": 78,
        "form": 62,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 73,
        "laning": 78,
        "teamfight": 79,
        "mechanics": 79,
        "championPool": [
          "Taliyah",
          "LeBlanc",
          "Ahri",
          "Twisted Fate",
          "Syndra"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          80,
          77,
          73,
          68,
          64
        ]
      },
      {
        "id": "lgg_adc",
        "name": "Karaage",
        "baseAge": 24,
        "retirementAge": 26,
        "role": "ADC",
        "nationality": "APAC",
        "level": 72,
        "potential": 75,
        "form": 59,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 65,
        "laning": 73,
        "teamfight": 78,
        "mechanics": 79,
        "championPool": [
          "Caitlyn",
          "Kai'Sa",
          "Varus",
          "Ashe",
          "Ezreal"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          77,
          74,
          70,
          65,
          61
        ]
      },
      {
        "id": "lgg_support",
        "name": "rre",
        "baseAge": 22,
        "retirementAge": 27,
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 70,
        "potential": 73,
        "form": 63,
        "fatigue": 0,
        "mental": 71,
        "shotcalling": 77,
        "laning": 70,
        "teamfight": 74,
        "mechanics": 67,
        "championPool": [
          "Thresh",
          "Pyke",
          "Nautilus",
          "Rakan",
          "Bard"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          75,
          72,
          68,
          63,
          59
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "LeBlanc",
        "Vi",
        "Varus",
        "Nautilus",
        "Rakan"
      ],
      "comfortPicks": {
        "TOP": [
          "Kennen",
          "Jayce"
        ],
        "JUNGLE": [
          "Lee Sin",
          "Elise"
        ],
        "MID": [
          "Taliyah",
          "LeBlanc"
        ],
        "ADC": [
          "Caitlyn",
          "Kai'Sa"
        ],
        "SUPPORT": [
          "Thresh",
          "Pyke"
        ]
      },
      "flexPicks": [
        "Pantheon",
        "Taliyah"
      ],
      "riskTolerance": 75
    }
  },
  {
    "id": "nm",
    "name": "New Meta",
    "shortName": "NM",
    "region": "LJL",
    "tier": 2,
    "style": "poke",
    "roster": [
      {
        "id": "nm_top",
        "name": "advance",
        "baseAge": 26,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "KR",
        "level": 82,
        "potential": 85,
        "form": 79,
        "fatigue": 0,
        "mental": 84,
        "shotcalling": 76,
        "laning": 84,
        "teamfight": 84,
        "mechanics": 84,
        "championPool": [
          "Jayce",
          "Kennen",
          "Rumble",
          "Gnar",
          "Gangplank"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          89,
          86,
          83,
          78,
          74
        ]
      },
      {
        "id": "nm_jungle",
        "name": "HRK",
        "baseAge": 21,
        "retirementAge": 28,
        "role": "JUNGLE",
        "nationality": "APAC",
        "level": 82,
        "potential": 85,
        "form": 63,
        "fatigue": 0,
        "mental": 84,
        "shotcalling": 93,
        "laning": 76,
        "teamfight": 83,
        "mechanics": 83,
        "championPool": [
          "Graves",
          "Ivern",
          "Nidalee",
          "Elise",
          "Jarvan IV"
        ],
        "traits": [
          "igl"
        ],
        "masteries": [
          88,
          85,
          82,
          77,
          73
        ]
      },
      {
        "id": "nm_mid",
        "name": "Zlatan",
        "baseAge": 22,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "APAC",
        "level": 83,
        "potential": 86,
        "form": 69,
        "fatigue": 0,
        "mental": 85,
        "shotcalling": 83,
        "laning": 85,
        "teamfight": 88,
        "mechanics": 86,
        "championPool": [
          "Zoe",
          "Orianna",
          "Hwei",
          "Corki",
          "LeBlanc"
        ],
        "traits": [],
        "masteries": [
          89,
          86,
          83,
          78,
          74
        ]
      },
      {
        "id": "nm_adc",
        "name": "Eria",
        "baseAge": 22,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "APAC",
        "level": 84,
        "potential": 87,
        "form": 66,
        "fatigue": 0,
        "mental": 85,
        "shotcalling": 78,
        "laning": 88,
        "teamfight": 91,
        "mechanics": 91,
        "championPool": [
          "Caitlyn",
          "Ezreal",
          "Varus",
          "Ashe",
          "Kai'Sa"
        ],
        "traits": [],
        "masteries": [
          90,
          87,
          84,
          79,
          75
        ]
      },
      {
        "id": "nm_support",
        "name": "Alps",
        "baseAge": 25,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 80,
        "potential": 83,
        "form": 64,
        "fatigue": 0,
        "mental": 83,
        "shotcalling": 86,
        "laning": 80,
        "teamfight": 83,
        "mechanics": 77,
        "championPool": [
          "Milio",
          "Nami",
          "Karma",
          "Bard",
          "Lulu"
        ],
        "traits": [],
        "masteries": [
          86,
          83,
          80,
          75,
          71
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Varus",
        "Ezreal",
        "Jayce",
        "Hwei",
        "Karma"
      ],
      "comfortPicks": {
        "TOP": [
          "Jayce",
          "Kennen"
        ],
        "JUNGLE": [
          "Graves",
          "Ivern"
        ],
        "MID": [
          "Zoe",
          "Orianna"
        ],
        "ADC": [
          "Caitlyn",
          "Ezreal"
        ],
        "SUPPORT": [
          "Milio",
          "Nami"
        ]
      },
      "flexPicks": [
        "Karma",
        "Jayce"
      ],
      "riskTolerance": 79
    }
  },
  {
    "id": "ryn",
    "name": "RAYN Clocks",
    "shortName": "RYN",
    "region": "LJL",
    "tier": 4,
    "style": "splitpush",
    "roster": [
      {
        "id": "ryn_top",
        "name": "Gecko",
        "baseAge": 25,
        "retirementAge": 26,
        "role": "TOP",
        "nationality": "KR",
        "level": 72,
        "potential": 75,
        "form": 69,
        "fatigue": 0,
        "mental": 71,
        "shotcalling": 70,
        "laning": 77,
        "teamfight": 75,
        "mechanics": 76,
        "championPool": [
          "Jax",
          "Fiora",
          "Camille",
          "Gwen",
          "Gangplank"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          77,
          74,
          70,
          65,
          61
        ]
      },
      {
        "id": "ryn_jungle",
        "name": "Kangkuk",
        "baseAge": 26,
        "retirementAge": 25,
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 71,
        "potential": 74,
        "form": 53,
        "fatigue": 0,
        "mental": 72,
        "shotcalling": 79,
        "laning": 64,
        "teamfight": 74,
        "mechanics": 71,
        "championPool": [
          "Viego",
          "Lee Sin",
          "Nocturne",
          "Vi",
          "Wukong"
        ],
        "traits": [],
        "masteries": [
          75,
          72,
          68,
          63,
          59
        ]
      },
      {
        "id": "ryn_mid",
        "name": "Razer",
        "baseAge": 22,
        "retirementAge": 26,
        "role": "MID",
        "nationality": "APAC",
        "level": 70,
        "potential": 73,
        "form": 70,
        "fatigue": 0,
        "mental": 70,
        "shotcalling": 68,
        "laning": 74,
        "teamfight": 73,
        "mechanics": 73,
        "championPool": [
          "Twisted Fate",
          "Ryze",
          "Akali",
          "Yone",
          "LeBlanc"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          75,
          72,
          68,
          63,
          59
        ]
      },
      {
        "id": "ryn_adc",
        "name": "Fluid",
        "baseAge": 24,
        "retirementAge": 26,
        "role": "ADC",
        "nationality": "APAC",
        "level": 72,
        "potential": 75,
        "form": 68,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 64,
        "laning": 72,
        "teamfight": 79,
        "mechanics": 78,
        "championPool": [
          "Kai'Sa",
          "Vayne",
          "Ezreal",
          "Lucian",
          "Xayah"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          77,
          74,
          70,
          65,
          61
        ]
      },
      {
        "id": "ryn_support",
        "name": "chico",
        "baseAge": 23,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 75,
        "potential": 78,
        "form": 53,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 83,
        "laning": 75,
        "teamfight": 78,
        "mechanics": 70,
        "championPool": [
          "Tahm Kench",
          "Rakan",
          "Bard",
          "Thresh",
          "Nautilus"
        ],
        "traits": [],
        "masteries": [
          79,
          76,
          72,
          67,
          63
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Jax",
        "Fiora",
        "Twisted Fate",
        "Nocturne",
        "Vayne"
      ],
      "comfortPicks": {
        "TOP": [
          "Jax",
          "Fiora"
        ],
        "JUNGLE": [
          "Viego",
          "Lee Sin"
        ],
        "MID": [
          "Twisted Fate",
          "Ryze"
        ],
        "ADC": [
          "Kai'Sa",
          "Vayne"
        ],
        "SUPPORT": [
          "Tahm Kench",
          "Rakan"
        ]
      },
      "flexPicks": [
        "Ryze",
        "Vayne"
      ],
      "riskTolerance": 73
    }
  },
  {
    "id": "rsg",
    "name": "Rising Gaming",
    "shortName": "RSG",
    "region": "LJL",
    "tier": 2,
    "style": "teamfight",
    "roster": [
      {
        "id": "rsg_top",
        "name": "YellowYoshi",
        "baseAge": 26,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "APAC",
        "level": 80,
        "potential": 83,
        "form": 83,
        "fatigue": 0,
        "mental": 83,
        "shotcalling": 75,
        "laning": 86,
        "teamfight": 80,
        "mechanics": 84,
        "championPool": [
          "Gnar",
          "K'Sante",
          "Rumble",
          "Kennen",
          "Sion"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          87,
          84,
          81,
          76,
          72
        ]
      },
      {
        "id": "rsg_jungle",
        "name": "ankochan",
        "baseAge": 25,
        "retirementAge": 27,
        "role": "JUNGLE",
        "nationality": "APAC",
        "level": 80,
        "potential": 83,
        "form": 80,
        "fatigue": 0,
        "mental": 83,
        "shotcalling": 87,
        "laning": 73,
        "teamfight": 83,
        "mechanics": 81,
        "championPool": [
          "Jarvan IV",
          "Vi",
          "Nocturne",
          "Wukong",
          "Skarner"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          87,
          84,
          81,
          76,
          72
        ]
      },
      {
        "id": "rsg_mid",
        "name": "Ramune",
        "baseAge": 21,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "APAC",
        "level": 80,
        "potential": 83,
        "form": 72,
        "fatigue": 0,
        "mental": 83,
        "shotcalling": 82,
        "laning": 83,
        "teamfight": 85,
        "mechanics": 86,
        "championPool": [
          "Orianna",
          "Azir",
          "Ryze",
          "Viktor",
          "Hwei"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          87,
          84,
          81,
          76,
          72
        ]
      },
      {
        "id": "rsg_adc",
        "name": "Archer",
        "baseAge": 20,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "KR",
        "level": 80,
        "potential": 83,
        "form": 69,
        "fatigue": 0,
        "mental": 81,
        "shotcalling": 75,
        "laning": 83,
        "teamfight": 87,
        "mechanics": 86,
        "championPool": [
          "Varus",
          "Ashe",
          "Ezreal",
          "Jinx",
          "Aphelios"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          87,
          84,
          81,
          76,
          72
        ]
      },
      {
        "id": "rsg_support",
        "name": "Patch",
        "baseAge": 23,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 80,
        "potential": 83,
        "form": 63,
        "fatigue": 0,
        "mental": 84,
        "shotcalling": 84,
        "laning": 78,
        "teamfight": 82,
        "mechanics": 77,
        "championPool": [
          "Rakan",
          "Bard",
          "Nautilus",
          "Rell",
          "Braum"
        ],
        "traits": [],
        "masteries": [
          86,
          83,
          80,
          75,
          71
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "Orianna",
        "Varus",
        "Rumble",
        "Jarvan IV",
        "Nautilus"
      ],
      "comfortPicks": {
        "TOP": [
          "Gnar",
          "K'Sante"
        ],
        "JUNGLE": [
          "Jarvan IV",
          "Vi"
        ],
        "MID": [
          "Orianna",
          "Azir"
        ],
        "ADC": [
          "Varus",
          "Ashe"
        ],
        "SUPPORT": [
          "Rakan",
          "Bard"
        ]
      },
      "flexPicks": [
        "Gragas",
        "Poppy"
      ],
      "riskTolerance": 75
    }
  },
  {
    "id": "uwk",
    "name": "Uwinks",
    "shortName": "UWK",
    "region": "LJL",
    "tier": 3,
    "style": "pick",
    "roster": [
      {
        "id": "uwk_top",
        "name": "tol2",
        "baseAge": 23,
        "retirementAge": 27,
        "role": "TOP",
        "nationality": "APAC",
        "level": 74,
        "potential": 77,
        "form": 73,
        "fatigue": 0,
        "mental": 73,
        "shotcalling": 70,
        "laning": 78,
        "teamfight": 73,
        "mechanics": 78,
        "championPool": [
          "Kennen",
          "Jayce",
          "Renekton",
          "Jax",
          "Camille"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          80,
          77,
          74,
          69,
          65
        ]
      },
      {
        "id": "uwk_jungle",
        "name": "Elative",
        "baseAge": 24,
        "retirementAge": 28,
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 81,
        "potential": 84,
        "form": 58,
        "fatigue": 0,
        "mental": 82,
        "shotcalling": 92,
        "laning": 74,
        "teamfight": 86,
        "mechanics": 83,
        "championPool": [
          "Lee Sin",
          "Elise",
          "Vi",
          "Nocturne",
          "Pantheon"
        ],
        "traits": [
          "igl"
        ],
        "masteries": [
          86,
          83,
          80,
          75,
          71
        ]
      },
      {
        "id": "uwk_mid",
        "name": "Jericho",
        "baseAge": 23,
        "retirementAge": 27,
        "role": "MID",
        "nationality": "APAC",
        "level": 77,
        "potential": 80,
        "form": 65,
        "fatigue": 0,
        "mental": 78,
        "shotcalling": 74,
        "laning": 81,
        "teamfight": 78,
        "mechanics": 83,
        "championPool": [
          "LeBlanc",
          "Ahri",
          "Taliyah",
          "Twisted Fate",
          "Syndra"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          83,
          80,
          77,
          72,
          68
        ]
      },
      {
        "id": "uwk_adc",
        "name": "Gimi",
        "baseAge": 23,
        "retirementAge": 27,
        "role": "ADC",
        "nationality": "KR",
        "level": 80,
        "potential": 83,
        "form": 69,
        "fatigue": 0,
        "mental": 83,
        "shotcalling": 76,
        "laning": 84,
        "teamfight": 84,
        "mechanics": 85,
        "championPool": [
          "Caitlyn",
          "Kai'Sa",
          "Varus",
          "Ashe",
          "Ezreal"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          86,
          83,
          80,
          75,
          71
        ]
      },
      {
        "id": "uwk_support",
        "name": "f4ke",
        "baseAge": 27,
        "retirementAge": 28,
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 79,
        "potential": 82,
        "form": 71,
        "fatigue": 0,
        "mental": 84,
        "shotcalling": 84,
        "laning": 79,
        "teamfight": 81,
        "mechanics": 76,
        "championPool": [
          "Nautilus",
          "Thresh",
          "Pyke",
          "Rakan",
          "Bard"
        ],
        "traits": [
          "consistant"
        ],
        "masteries": [
          85,
          82,
          79,
          74,
          70
        ]
      }
    ],
    "draftProfile": {
      "banPriorities": [
        "LeBlanc",
        "Vi",
        "Varus",
        "Nautilus",
        "Rakan"
      ],
      "comfortPicks": {
        "TOP": [
          "Kennen",
          "Jayce"
        ],
        "JUNGLE": [
          "Lee Sin",
          "Elise"
        ],
        "MID": [
          "LeBlanc",
          "Ahri"
        ],
        "ADC": [
          "Caitlyn",
          "Kai'Sa"
        ],
        "SUPPORT": [
          "Nautilus",
          "Thresh"
        ]
      },
      "flexPicks": [
        "Pantheon",
        "Taliyah"
      ],
      "riskTolerance": 80
    }
  }
];
