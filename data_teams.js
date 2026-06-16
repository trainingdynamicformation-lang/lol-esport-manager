// data_teams.js - Equipes IA (CDC §11.1)
// Genere a partir de lol_esports_update_2026_with_counters.xlsx (feuilles Teams_Rosters / DraftProfiles)
// Regions: LEC, LCK, LPL, LTAN (LTA North), LTAS (LTA South / CBLOL), LCP, LJL

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
        "role": "TOP",
        "nationality": "EMEA",
        "level": 82,
        "potential": 89,
        "form": 65,
        "fatigue": 0,
        "mental": 82,
        "shotcalling": 72,
        "laning": 82,
        "teamfight": 80,
        "mechanics": 79,
        "championPool": [
          "Rumble",
          "Gnar",
          "K'Sante"
        ],
        "traits": [
          "rookie"
        ]
      },
      {
        "id": "fnc_jungle",
        "name": "Razork",
        "role": "JUNGLE",
        "nationality": "EMEA",
        "level": 86,
        "potential": 92,
        "form": 62,
        "fatigue": 0,
        "mental": 86,
        "shotcalling": 98,
        "laning": 85,
        "teamfight": 88,
        "mechanics": 90,
        "championPool": [
          "Vi",
          "Jarvan IV",
          "Wukong"
        ],
        "traits": [
          "igl",
          "leader",
          "mechanical"
        ]
      },
      {
        "id": "fnc_mid",
        "name": "Vladi",
        "role": "MID",
        "nationality": "EMEA",
        "level": 81,
        "potential": 81,
        "form": 75,
        "fatigue": 0,
        "mental": 81,
        "shotcalling": 75,
        "laning": 80,
        "teamfight": 84,
        "mechanics": 81,
        "championPool": [
          "Azir",
          "Ryze",
          "Orianna"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "fnc_adc",
        "name": "Upset",
        "role": "ADC",
        "nationality": "EMEA",
        "level": 81,
        "potential": 80,
        "form": 71,
        "fatigue": 0,
        "mental": 83,
        "shotcalling": 72,
        "laning": 86,
        "teamfight": 80,
        "mechanics": 83,
        "championPool": [
          "Ezreal",
          "Varus",
          "Aphelios"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "fnc_support",
        "name": "Lospa",
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 79,
        "potential": 82,
        "form": 65,
        "fatigue": 0,
        "mental": 77,
        "shotcalling": 75,
        "laning": 81,
        "teamfight": 77,
        "mechanics": 75,
        "championPool": [
          "Nautilus",
          "Rakan",
          "Bard"
        ],
        "traits": []
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
        "role": "TOP",
        "nationality": "EMEA",
        "level": 86,
        "potential": 91,
        "form": 67,
        "fatigue": 0,
        "mental": 78,
        "shotcalling": 77,
        "laning": 90,
        "teamfight": 86,
        "mechanics": 91,
        "championPool": [
          "K'Sante",
          "Jax",
          "Gnar"
        ],
        "traits": [
          "mechanical"
        ]
      },
      {
        "id": "g2_jungle",
        "name": "SkewMond",
        "role": "JUNGLE",
        "nationality": "EMEA",
        "level": 79,
        "potential": 77,
        "form": 66,
        "fatigue": 0,
        "mental": 79,
        "shotcalling": 81,
        "laning": 80,
        "teamfight": 76,
        "mechanics": 82,
        "championPool": [
          "Vi",
          "Nocturne",
          "Jarvan IV"
        ],
        "traits": []
      },
      {
        "id": "g2_mid",
        "name": "Caps",
        "role": "MID",
        "nationality": "EMEA",
        "level": 91,
        "potential": 95,
        "form": 82,
        "fatigue": 0,
        "mental": 89,
        "shotcalling": 97,
        "laning": 93,
        "teamfight": 88,
        "mechanics": 95,
        "championPool": [
          "Ryze",
          "Azir",
          "Ahri"
        ],
        "traits": [
          "clutch",
          "consistant",
          "leader",
          "mechanical"
        ]
      },
      {
        "id": "g2_adc",
        "name": "Hans Sama",
        "role": "ADC",
        "nationality": "EMEA",
        "level": 85,
        "potential": 91,
        "form": 78,
        "fatigue": 0,
        "mental": 79,
        "shotcalling": 76,
        "laning": 82,
        "teamfight": 94,
        "mechanics": 89,
        "championPool": [
          "Ezreal",
          "Varus",
          "Ashe"
        ],
        "traits": [
          "consistant",
          "mechanical"
        ]
      },
      {
        "id": "g2_support",
        "name": "Labrov",
        "role": "SUPPORT",
        "nationality": "EMEA",
        "level": 83,
        "potential": 83,
        "form": 78,
        "fatigue": 0,
        "mental": 79,
        "shotcalling": 84,
        "laning": 77,
        "teamfight": 82,
        "mechanics": 78,
        "championPool": [
          "Nautilus",
          "Rakan",
          "Karma"
        ],
        "traits": [
          "consistant",
          "igl"
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
        "role": "TOP",
        "nationality": "EMEA",
        "level": 62,
        "potential": 66,
        "form": 49,
        "fatigue": 0,
        "mental": 56,
        "shotcalling": 56,
        "laning": 62,
        "teamfight": 61,
        "mechanics": 61,
        "championPool": [
          "Jayce",
          "Kennen",
          "Rumble"
        ],
        "traits": []
      },
      {
        "id": "gx_jungle",
        "name": "ISMA",
        "role": "JUNGLE",
        "nationality": "EMEA",
        "level": 69,
        "potential": 74,
        "form": 65,
        "fatigue": 0,
        "mental": 67,
        "shotcalling": 68,
        "laning": 67,
        "teamfight": 71,
        "mechanics": 69,
        "championPool": [
          "Nidalee",
          "Graves",
          "Ivern"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "gx_mid",
        "name": "Jackies",
        "role": "MID",
        "nationality": "EMEA",
        "level": 69,
        "potential": 74,
        "form": 55,
        "fatigue": 0,
        "mental": 63,
        "shotcalling": 69,
        "laning": 70,
        "teamfight": 66,
        "mechanics": 74,
        "championPool": [
          "Orianna",
          "Hwei",
          "Zoe"
        ],
        "traits": []
      },
      {
        "id": "gx_adc",
        "name": "Noah",
        "role": "ADC",
        "nationality": "KR",
        "level": 65,
        "potential": 64,
        "form": 55,
        "fatigue": 0,
        "mental": 65,
        "shotcalling": 56,
        "laning": 63,
        "teamfight": 72,
        "mechanics": 66,
        "championPool": [
          "Ezreal",
          "Varus",
          "Caitlyn"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "gx_support",
        "name": "Jun",
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 71,
        "potential": 77,
        "form": 59,
        "fatigue": 0,
        "mental": 64,
        "shotcalling": 75,
        "laning": 66,
        "teamfight": 77,
        "mechanics": 68,
        "championPool": [
          "Karma",
          "Milio",
          "Nami"
        ],
        "traits": [
          "consistant"
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
          "Hwei",
          "Zoe"
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
        "role": "TOP",
        "nationality": "KR",
        "level": 77,
        "potential": 75,
        "form": 71,
        "fatigue": 0,
        "mental": 79,
        "shotcalling": 73,
        "laning": 80,
        "teamfight": 76,
        "mechanics": 78,
        "championPool": [
          "Kennen",
          "Renekton",
          "Jax"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "kc_jungle",
        "name": "Yike",
        "role": "JUNGLE",
        "nationality": "EMEA",
        "level": 75,
        "potential": 81,
        "form": 61,
        "fatigue": 0,
        "mental": 73,
        "shotcalling": 76,
        "laning": 68,
        "teamfight": 79,
        "mechanics": 75,
        "championPool": [
          "Elise",
          "Vi",
          "Lee Sin"
        ],
        "traits": []
      },
      {
        "id": "kc_mid",
        "name": "kyeahoo",
        "role": "MID",
        "nationality": "KR",
        "level": 84,
        "potential": 90,
        "form": 74,
        "fatigue": 0,
        "mental": 86,
        "shotcalling": 86,
        "laning": 83,
        "teamfight": 82,
        "mechanics": 89,
        "championPool": [
          "Taliyah",
          "LeBlanc",
          "Ahri"
        ],
        "traits": [
          "consistant",
          "mechanical",
          "rookie"
        ]
      },
      {
        "id": "kc_adc",
        "name": "Caliste",
        "role": "ADC",
        "nationality": "EMEA",
        "level": 85,
        "potential": 95,
        "form": 67,
        "fatigue": 0,
        "mental": 80,
        "shotcalling": 76,
        "laning": 86,
        "teamfight": 89,
        "mechanics": 96,
        "championPool": [
          "Varus",
          "Ezreal",
          "Yunara"
        ],
        "traits": [
          "mechanical",
          "rookie"
        ]
      },
      {
        "id": "kc_support",
        "name": "Busio",
        "role": "SUPPORT",
        "nationality": "EMEA",
        "level": 73,
        "potential": 78,
        "form": 71,
        "fatigue": 0,
        "mental": 75,
        "shotcalling": 79,
        "laning": 77,
        "teamfight": 71,
        "mechanics": 71,
        "championPool": [
          "Rakan",
          "Bard",
          "Nautilus"
        ],
        "traits": [
          "consistant"
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
          "LeBlanc",
          "Ahri"
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
        "role": "TOP",
        "nationality": "EMEA",
        "level": 88,
        "potential": 88,
        "form": 76,
        "fatigue": 0,
        "mental": 80,
        "shotcalling": 82,
        "laning": 94,
        "teamfight": 83,
        "mechanics": 90,
        "championPool": [
          "K'Sante",
          "Rumble",
          "Gnar"
        ],
        "traits": [
          "consistant",
          "mechanical"
        ]
      },
      {
        "id": "mkoi_jungle",
        "name": "Elyoya",
        "role": "JUNGLE",
        "nationality": "EMEA",
        "level": 86,
        "potential": 92,
        "form": 81,
        "fatigue": 0,
        "mental": 90,
        "shotcalling": 96,
        "laning": 82,
        "teamfight": 83,
        "mechanics": 87,
        "championPool": [
          "Jarvan IV",
          "Vi",
          "Lee Sin"
        ],
        "traits": [
          "clutch",
          "consistant",
          "igl",
          "leader"
        ]
      },
      {
        "id": "mkoi_mid",
        "name": "Jojopyun",
        "role": "MID",
        "nationality": "NA",
        "level": 84,
        "potential": 89,
        "form": 82,
        "fatigue": 0,
        "mental": 80,
        "shotcalling": 80,
        "laning": 88,
        "teamfight": 84,
        "mechanics": 90,
        "championPool": [
          "LeBlanc",
          "Ahri",
          "Akali"
        ],
        "traits": [
          "consistant",
          "mechanical"
        ]
      },
      {
        "id": "mkoi_adc",
        "name": "Supa",
        "role": "ADC",
        "nationality": "EMEA",
        "level": 84,
        "potential": 90,
        "form": 65,
        "fatigue": 0,
        "mental": 82,
        "shotcalling": 82,
        "laning": 80,
        "teamfight": 90,
        "mechanics": 88,
        "championPool": [
          "Ashe",
          "Ezreal",
          "Varus"
        ],
        "traits": [
          "mechanical"
        ]
      },
      {
        "id": "mkoi_support",
        "name": "Alvaro",
        "role": "SUPPORT",
        "nationality": "EMEA",
        "level": 84,
        "potential": 88,
        "form": 81,
        "fatigue": 0,
        "mental": 82,
        "shotcalling": 86,
        "laning": 88,
        "teamfight": 89,
        "mechanics": 85,
        "championPool": [
          "Bard",
          "Nautilus",
          "Rakan"
        ],
        "traits": [
          "consistant",
          "igl"
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
        "role": "TOP",
        "nationality": "EMEA",
        "level": 64,
        "potential": 63,
        "form": 60,
        "fatigue": 0,
        "mental": 64,
        "shotcalling": 62,
        "laning": 63,
        "teamfight": 66,
        "mechanics": 61,
        "championPool": [
          "Renekton",
          "Kennen",
          "Jayce"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "navi_jungle",
        "name": "Rhilech",
        "role": "JUNGLE",
        "nationality": "EMEA",
        "level": 57,
        "potential": 60,
        "form": 44,
        "fatigue": 0,
        "mental": 52,
        "shotcalling": 58,
        "laning": 49,
        "teamfight": 55,
        "mechanics": 59,
        "championPool": [
          "Elise",
          "Vi",
          "Lee Sin"
        ],
        "traits": [
          "tiltable"
        ]
      },
      {
        "id": "navi_mid",
        "name": "Poby",
        "role": "MID",
        "nationality": "KR",
        "level": 58,
        "potential": 61,
        "form": 44,
        "fatigue": 0,
        "mental": 55,
        "shotcalling": 55,
        "laning": 56,
        "teamfight": 64,
        "mechanics": 60,
        "championPool": [
          "Taliyah",
          "LeBlanc",
          "Ahri"
        ],
        "traits": [
          "tiltable"
        ]
      },
      {
        "id": "navi_adc",
        "name": "SamD",
        "role": "ADC",
        "nationality": "KR",
        "level": 61,
        "potential": 65,
        "form": 59,
        "fatigue": 0,
        "mental": 59,
        "shotcalling": 59,
        "laning": 63,
        "teamfight": 64,
        "mechanics": 65,
        "championPool": [
          "Caitlyn",
          "Kai'Sa",
          "Varus"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "navi_support",
        "name": "Parus",
        "role": "SUPPORT",
        "nationality": "EMEA",
        "level": 59,
        "potential": 63,
        "form": 50,
        "fatigue": 0,
        "mental": 61,
        "shotcalling": 57,
        "laning": 53,
        "teamfight": 55,
        "mechanics": 62,
        "championPool": [
          "Pyke",
          "Nautilus",
          "Thresh"
        ],
        "traits": [
          "consistant"
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
          "LeBlanc",
          "Ahri"
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
        "role": "TOP",
        "nationality": "KR",
        "level": 67,
        "potential": 72,
        "form": 57,
        "fatigue": 0,
        "mental": 69,
        "shotcalling": 67,
        "laning": 71,
        "teamfight": 62,
        "mechanics": 66,
        "championPool": [
          "Jax",
          "Fiora",
          "Camille"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "shf_jungle",
        "name": "Boukada",
        "role": "JUNGLE",
        "nationality": "EMEA",
        "level": 67,
        "potential": 67,
        "form": 58,
        "fatigue": 0,
        "mental": 61,
        "shotcalling": 69,
        "laning": 59,
        "teamfight": 64,
        "mechanics": 68,
        "championPool": [
          "Viego",
          "Lee Sin",
          "Nocturne"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "shf_mid",
        "name": "nuc",
        "role": "MID",
        "nationality": "EMEA",
        "level": 71,
        "potential": 69,
        "form": 51,
        "fatigue": 0,
        "mental": 66,
        "shotcalling": 68,
        "laning": 72,
        "teamfight": 71,
        "mechanics": 73,
        "championPool": [
          "Ryze",
          "Akali",
          "Twisted Fate"
        ],
        "traits": []
      },
      {
        "id": "shf_adc",
        "name": "Paduck",
        "role": "ADC",
        "nationality": "KR",
        "level": 69,
        "potential": 73,
        "form": 51,
        "fatigue": 0,
        "mental": 62,
        "shotcalling": 64,
        "laning": 68,
        "teamfight": 73,
        "mechanics": 76,
        "championPool": [
          "Vayne",
          "Ezreal",
          "Kai'Sa"
        ],
        "traits": []
      },
      {
        "id": "shf_support",
        "name": "Trymbi",
        "role": "SUPPORT",
        "nationality": "EMEA",
        "level": 62,
        "potential": 60,
        "form": 54,
        "fatigue": 0,
        "mental": 61,
        "shotcalling": 61,
        "laning": 63,
        "teamfight": 65,
        "mechanics": 57,
        "championPool": [
          "Bard",
          "Tahm Kench",
          "Rakan"
        ],
        "traits": [
          "consistant"
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
          "Nocturne",
          "Viego"
        ],
        "MID": [
          "Twisted Fate",
          "Ryze"
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
        "role": "TOP",
        "nationality": "EMEA",
        "level": 62,
        "potential": 63,
        "form": 50,
        "fatigue": 0,
        "mental": 66,
        "shotcalling": 60,
        "laning": 66,
        "teamfight": 65,
        "mechanics": 65,
        "championPool": [
          "Sion",
          "Gnar",
          "Ornn"
        ],
        "traits": [
          "consistant",
          "veteran"
        ]
      },
      {
        "id": "sk_jungle",
        "name": "Skeanz",
        "role": "JUNGLE",
        "nationality": "EMEA",
        "level": 68,
        "potential": 72,
        "form": 52,
        "fatigue": 0,
        "mental": 66,
        "shotcalling": 66,
        "laning": 59,
        "teamfight": 70,
        "mechanics": 72,
        "championPool": [
          "Jarvan IV",
          "Sejuani",
          "Maokai"
        ],
        "traits": []
      },
      {
        "id": "sk_mid",
        "name": "LIDER",
        "role": "MID",
        "nationality": "EMEA",
        "level": 62,
        "potential": 66,
        "form": 55,
        "fatigue": 0,
        "mental": 56,
        "shotcalling": 55,
        "laning": 65,
        "teamfight": 59,
        "mechanics": 61,
        "championPool": [
          "Orianna",
          "Azir",
          "Viktor"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "sk_adc",
        "name": "Jopa",
        "role": "ADC",
        "nationality": "EMEA",
        "level": 62,
        "potential": 66,
        "form": 59,
        "fatigue": 0,
        "mental": 57,
        "shotcalling": 53,
        "laning": 64,
        "teamfight": 67,
        "mechanics": 67,
        "championPool": [
          "Jinx",
          "Aphelios",
          "Caitlyn"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "sk_support",
        "name": "Mikyx",
        "role": "SUPPORT",
        "nationality": "EMEA",
        "level": 86,
        "potential": 91,
        "form": 57,
        "fatigue": 0,
        "mental": 91,
        "shotcalling": 89,
        "laning": 84,
        "teamfight": 84,
        "mechanics": 81,
        "championPool": [
          "Rakan",
          "Braum",
          "Nautilus"
        ],
        "traits": [
          "clutch",
          "igl",
          "veteran"
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
          "Lulu",
          "Milio"
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
        "role": "TOP",
        "nationality": "EMEA",
        "level": 77,
        "potential": 76,
        "form": 71,
        "fatigue": 0,
        "mental": 75,
        "shotcalling": 69,
        "laning": 84,
        "teamfight": 82,
        "mechanics": 78,
        "championPool": [
          "Kennen",
          "Jayce",
          "Renekton"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "th_jungle",
        "name": "Daglas",
        "role": "JUNGLE",
        "nationality": "EMEA",
        "level": 76,
        "potential": 77,
        "form": 65,
        "fatigue": 0,
        "mental": 77,
        "shotcalling": 74,
        "laning": 72,
        "teamfight": 79,
        "mechanics": 73,
        "championPool": [
          "Vi",
          "Lee Sin",
          "Elise"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "th_mid",
        "name": "Serin",
        "role": "MID",
        "nationality": "EMEA",
        "level": 68,
        "potential": 69,
        "form": 67,
        "fatigue": 0,
        "mental": 64,
        "shotcalling": 63,
        "laning": 71,
        "teamfight": 67,
        "mechanics": 73,
        "championPool": [
          "Ahri",
          "Taliyah",
          "LeBlanc"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "th_adc",
        "name": "Ice",
        "role": "ADC",
        "nationality": "KR",
        "level": 76,
        "potential": 81,
        "form": 60,
        "fatigue": 0,
        "mental": 73,
        "shotcalling": 70,
        "laning": 77,
        "teamfight": 75,
        "mechanics": 83,
        "championPool": [
          "Varus",
          "Caitlyn",
          "Kai'Sa"
        ],
        "traits": []
      },
      {
        "id": "th_support",
        "name": "Way",
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 69,
        "potential": 70,
        "form": 54,
        "fatigue": 0,
        "mental": 69,
        "shotcalling": 65,
        "laning": 63,
        "teamfight": 70,
        "mechanics": 66,
        "championPool": [
          "Nautilus",
          "Thresh",
          "Pyke"
        ],
        "traits": []
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
          "LeBlanc",
          "Ahri"
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
        "role": "TOP",
        "nationality": "EMEA",
        "level": 77,
        "potential": 79,
        "form": 69,
        "fatigue": 0,
        "mental": 78,
        "shotcalling": 67,
        "laning": 78,
        "teamfight": 81,
        "mechanics": 79,
        "championPool": [
          "Rumble",
          "Gnar",
          "K'Sante"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "vit_jungle",
        "name": "Lyncas",
        "role": "JUNGLE",
        "nationality": "EMEA",
        "level": 71,
        "potential": 77,
        "form": 66,
        "fatigue": 0,
        "mental": 69,
        "shotcalling": 77,
        "laning": 66,
        "teamfight": 68,
        "mechanics": 75,
        "championPool": [
          "Vi",
          "Nocturne",
          "Jarvan IV"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "vit_mid",
        "name": "Humanoid",
        "role": "MID",
        "nationality": "EMEA",
        "level": 73,
        "potential": 73,
        "form": 59,
        "fatigue": 0,
        "mental": 65,
        "shotcalling": 74,
        "laning": 74,
        "teamfight": 72,
        "mechanics": 73,
        "championPool": [
          "Orianna",
          "Azir",
          "LeBlanc"
        ],
        "traits": []
      },
      {
        "id": "vit_adc",
        "name": "Carzzy",
        "role": "ADC",
        "nationality": "EMEA",
        "level": 77,
        "potential": 82,
        "form": 68,
        "fatigue": 0,
        "mental": 70,
        "shotcalling": 73,
        "laning": 78,
        "teamfight": 76,
        "mechanics": 78,
        "championPool": [
          "Ashe",
          "Ezreal",
          "Varus"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "vit_support",
        "name": "Fleshy",
        "role": "SUPPORT",
        "nationality": "EMEA",
        "level": 71,
        "potential": 70,
        "form": 63,
        "fatigue": 0,
        "mental": 70,
        "shotcalling": 71,
        "laning": 73,
        "teamfight": 75,
        "mechanics": 72,
        "championPool": [
          "Nautilus",
          "Rakan",
          "Bard"
        ],
        "traits": [
          "consistant"
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
        "role": "TOP",
        "nationality": "KR",
        "level": 65,
        "potential": 65,
        "form": 59,
        "fatigue": 0,
        "mental": 64,
        "shotcalling": 58,
        "laning": 65,
        "teamfight": 70,
        "mechanics": 67,
        "championPool": [
          "Rumble",
          "Gnar",
          "K'Sante"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "fx_jungle",
        "name": "Raptor",
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 65,
        "potential": 70,
        "form": 60,
        "fatigue": 0,
        "mental": 61,
        "shotcalling": 70,
        "laning": 57,
        "teamfight": 63,
        "mechanics": 69,
        "championPool": [
          "Nocturne",
          "Jarvan IV",
          "Vi"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "fx_mid",
        "name": "VicLa",
        "role": "MID",
        "nationality": "KR",
        "level": 67,
        "potential": 66,
        "form": 59,
        "fatigue": 0,
        "mental": 69,
        "shotcalling": 59,
        "laning": 68,
        "teamfight": 71,
        "mechanics": 72,
        "championPool": [
          "Orianna",
          "Azir",
          "Ryze"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "fx_adc",
        "name": "Diable",
        "role": "ADC",
        "nationality": "KR",
        "level": 68,
        "potential": 71,
        "form": 58,
        "fatigue": 0,
        "mental": 63,
        "shotcalling": 58,
        "laning": 74,
        "teamfight": 69,
        "mechanics": 73,
        "championPool": [
          "Ashe",
          "Ezreal",
          "Varus"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "fx_support",
        "name": "Kellin",
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 62,
        "potential": 68,
        "form": 65,
        "fatigue": 0,
        "mental": 54,
        "shotcalling": 64,
        "laning": 58,
        "teamfight": 60,
        "mechanics": 64,
        "championPool": [
          "Rakan",
          "Nautilus",
          "Lulu"
        ],
        "traits": [
          "consistant"
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
        "role": "TOP",
        "nationality": "KR",
        "level": 56,
        "potential": 55,
        "form": 60,
        "fatigue": 0,
        "mental": 52,
        "shotcalling": 52,
        "laning": 59,
        "teamfight": 56,
        "mechanics": 56,
        "championPool": [
          "Renekton",
          "Kennen",
          "Jayce"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ]
      },
      {
        "id": "soop_jungle",
        "name": "Pyosik",
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 60,
        "potential": 58,
        "form": 58,
        "fatigue": 0,
        "mental": 62,
        "shotcalling": 63,
        "laning": 59,
        "teamfight": 66,
        "mechanics": 56,
        "championPool": [
          "Vi",
          "Lee Sin",
          "Elise"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "soop_mid",
        "name": "Clozer",
        "role": "MID",
        "nationality": "KR",
        "level": 56,
        "potential": 58,
        "form": 59,
        "fatigue": 0,
        "mental": 55,
        "shotcalling": 53,
        "laning": 61,
        "teamfight": 54,
        "mechanics": 57,
        "championPool": [
          "Ahri",
          "Taliyah",
          "LeBlanc"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ]
      },
      {
        "id": "soop_adc",
        "name": "deokdam",
        "role": "ADC",
        "nationality": "KR",
        "level": 61,
        "potential": 62,
        "form": 44,
        "fatigue": 0,
        "mental": 60,
        "shotcalling": 52,
        "laning": 64,
        "teamfight": 64,
        "mechanics": 62,
        "championPool": [
          "Kai'Sa",
          "Varus",
          "Caitlyn"
        ],
        "traits": []
      },
      {
        "id": "soop_support",
        "name": "Life",
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 65,
        "potential": 67,
        "form": 62,
        "fatigue": 0,
        "mental": 62,
        "shotcalling": 61,
        "laning": 67,
        "teamfight": 62,
        "mechanics": 61,
        "championPool": [
          "Pyke",
          "Nautilus",
          "Thresh"
        ],
        "traits": [
          "consistant"
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
          "LeBlanc",
          "Ahri"
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
        "role": "TOP",
        "nationality": "KR",
        "level": 75,
        "potential": 75,
        "form": 68,
        "fatigue": 0,
        "mental": 75,
        "shotcalling": 70,
        "laning": 80,
        "teamfight": 78,
        "mechanics": 79,
        "championPool": [
          "Gnar",
          "K'Sante",
          "Rumble"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "dk_jungle",
        "name": "Lucid",
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 79,
        "potential": 81,
        "form": 60,
        "fatigue": 0,
        "mental": 79,
        "shotcalling": 85,
        "laning": 76,
        "teamfight": 80,
        "mechanics": 77,
        "championPool": [
          "Nocturne",
          "Jarvan IV",
          "Vi"
        ],
        "traits": [
          "igl"
        ]
      },
      {
        "id": "dk_mid",
        "name": "ShowMaker",
        "role": "MID",
        "nationality": "KR",
        "level": 90,
        "potential": 94,
        "form": 63,
        "fatigue": 0,
        "mental": 92,
        "shotcalling": 86,
        "laning": 89,
        "teamfight": 88,
        "mechanics": 97,
        "championPool": [
          "LeBlanc",
          "Syndra",
          "Azir"
        ],
        "traits": [
          "clutch",
          "mechanical"
        ]
      },
      {
        "id": "dk_adc",
        "name": "Smash",
        "role": "ADC",
        "nationality": "KR",
        "level": 76,
        "potential": 83,
        "form": 64,
        "fatigue": 0,
        "mental": 68,
        "shotcalling": 71,
        "laning": 73,
        "teamfight": 83,
        "mechanics": 82,
        "championPool": [
          "Ashe",
          "Ezreal",
          "Varus"
        ],
        "traits": [
          "consistant",
          "rookie"
        ]
      },
      {
        "id": "dk_support",
        "name": "Career",
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 82,
        "potential": 84,
        "form": 60,
        "fatigue": 0,
        "mental": 78,
        "shotcalling": 80,
        "laning": 86,
        "teamfight": 86,
        "mechanics": 77,
        "championPool": [
          "Nautilus",
          "Rakan",
          "Bard"
        ],
        "traits": []
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
        "role": "TOP",
        "nationality": "KR",
        "level": 92,
        "potential": 90,
        "form": 69,
        "fatigue": 0,
        "mental": 87,
        "shotcalling": 86,
        "laning": 94,
        "teamfight": 91,
        "mechanics": 90,
        "championPool": [
          "Gnar",
          "K'Sante",
          "Rumble"
        ],
        "traits": [
          "mechanical"
        ]
      },
      {
        "id": "gen_jungle",
        "name": "Canyon",
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 95,
        "potential": 98,
        "form": 82,
        "fatigue": 0,
        "mental": 98,
        "shotcalling": 98,
        "laning": 86,
        "teamfight": 98,
        "mechanics": 98,
        "championPool": [
          "Nidalee",
          "Lee Sin",
          "Viego"
        ],
        "traits": [
          "clutch",
          "igl",
          "leader",
          "mechanical"
        ]
      },
      {
        "id": "gen_mid",
        "name": "Chovy",
        "role": "MID",
        "nationality": "KR",
        "level": 96,
        "potential": 98,
        "form": 64,
        "fatigue": 0,
        "mental": 90,
        "shotcalling": 98,
        "laning": 96,
        "teamfight": 98,
        "mechanics": 99,
        "championPool": [
          "Yone",
          "Azir",
          "Corki"
        ],
        "traits": [
          "clutch",
          "mechanical"
        ]
      },
      {
        "id": "gen_adc",
        "name": "Ruler",
        "role": "ADC",
        "nationality": "KR",
        "level": 94,
        "potential": 96,
        "form": 81,
        "fatigue": 0,
        "mental": 98,
        "shotcalling": 98,
        "laning": 90,
        "teamfight": 98,
        "mechanics": 99,
        "championPool": [
          "Varus",
          "Ezreal",
          "Jinx"
        ],
        "traits": [
          "clutch",
          "leader",
          "mechanical",
          "veteran"
        ]
      },
      {
        "id": "gen_support",
        "name": "Duro",
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 87,
        "potential": 92,
        "form": 65,
        "fatigue": 0,
        "mental": 86,
        "shotcalling": 84,
        "laning": 91,
        "teamfight": 90,
        "mechanics": 84,
        "championPool": [
          "Rakan",
          "Bard",
          "Nautilus"
        ],
        "traits": [
          "igl",
          "rookie"
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
        "role": "TOP",
        "nationality": "KR",
        "level": 72,
        "potential": 76,
        "form": 56,
        "fatigue": 0,
        "mental": 64,
        "shotcalling": 68,
        "laning": 71,
        "teamfight": 70,
        "mechanics": 73,
        "championPool": [
          "Sion",
          "Gnar",
          "Ornn"
        ],
        "traits": []
      },
      {
        "id": "bro_jungle",
        "name": "GIDEON",
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 74,
        "potential": 72,
        "form": 70,
        "fatigue": 0,
        "mental": 70,
        "shotcalling": 76,
        "laning": 75,
        "teamfight": 71,
        "mechanics": 75,
        "championPool": [
          "Maokai",
          "Jarvan IV",
          "Sejuani"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "bro_mid",
        "name": "Roamer",
        "role": "MID",
        "nationality": "KR",
        "level": 77,
        "potential": 80,
        "form": 66,
        "fatigue": 0,
        "mental": 79,
        "shotcalling": 76,
        "laning": 84,
        "teamfight": 83,
        "mechanics": 80,
        "championPool": [
          "Viktor",
          "Orianna",
          "Azir"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "bro_adc",
        "name": "Teddy",
        "role": "ADC",
        "nationality": "KR",
        "level": 73,
        "potential": 78,
        "form": 56,
        "fatigue": 0,
        "mental": 73,
        "shotcalling": 69,
        "laning": 79,
        "teamfight": 82,
        "mechanics": 72,
        "championPool": [
          "Jinx",
          "Aphelios",
          "Caitlyn"
        ],
        "traits": []
      },
      {
        "id": "bro_support",
        "name": "Namgung",
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 73,
        "potential": 71,
        "form": 69,
        "fatigue": 0,
        "mental": 68,
        "shotcalling": 73,
        "laning": 73,
        "teamfight": 71,
        "mechanics": 76,
        "championPool": [
          "Lulu",
          "Milio",
          "Karma"
        ],
        "traits": [
          "consistant"
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
        "role": "TOP",
        "nationality": "KR",
        "level": 94,
        "potential": 92,
        "form": 72,
        "fatigue": 0,
        "mental": 88,
        "shotcalling": 94,
        "laning": 98,
        "teamfight": 97,
        "mechanics": 99,
        "championPool": [
          "Gwen",
          "Jayce",
          "Rumble"
        ],
        "traits": [
          "clutch",
          "mechanical"
        ]
      },
      {
        "id": "hle_jungle",
        "name": "Kanavi",
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 93,
        "potential": 93,
        "form": 75,
        "fatigue": 0,
        "mental": 90,
        "shotcalling": 91,
        "laning": 84,
        "teamfight": 93,
        "mechanics": 91,
        "championPool": [
          "Jarvan IV",
          "Lee Sin",
          "Viego"
        ],
        "traits": [
          "clutch",
          "igl",
          "mechanical"
        ]
      },
      {
        "id": "hle_mid",
        "name": "Zeka",
        "role": "MID",
        "nationality": "KR",
        "level": 91,
        "potential": 89,
        "form": 79,
        "fatigue": 0,
        "mental": 83,
        "shotcalling": 93,
        "laning": 89,
        "teamfight": 97,
        "mechanics": 99,
        "championPool": [
          "Akali",
          "Yone",
          "Ahri"
        ],
        "traits": [
          "consistant",
          "mechanical"
        ]
      },
      {
        "id": "hle_adc",
        "name": "Gumayusi",
        "role": "ADC",
        "nationality": "KR",
        "level": 92,
        "potential": 96,
        "form": 70,
        "fatigue": 0,
        "mental": 85,
        "shotcalling": 83,
        "laning": 89,
        "teamfight": 95,
        "mechanics": 99,
        "championPool": [
          "Varus",
          "Jinx",
          "Caitlyn"
        ],
        "traits": [
          "mechanical"
        ]
      },
      {
        "id": "hle_support",
        "name": "Delight",
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 91,
        "potential": 96,
        "form": 73,
        "fatigue": 0,
        "mental": 93,
        "shotcalling": 96,
        "laning": 89,
        "teamfight": 93,
        "mechanics": 92,
        "championPool": [
          "Rakan",
          "Rell",
          "Nautilus"
        ],
        "traits": [
          "clutch",
          "igl",
          "leader",
          "mechanical"
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
        "role": "TOP",
        "nationality": "KR",
        "level": 68,
        "potential": 72,
        "form": 65,
        "fatigue": 0,
        "mental": 61,
        "shotcalling": 60,
        "laning": 68,
        "teamfight": 72,
        "mechanics": 67,
        "championPool": [
          "Jayce",
          "Renekton",
          "Kennen"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "drx_jungle",
        "name": "Willer",
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 67,
        "potential": 65,
        "form": 65,
        "fatigue": 0,
        "mental": 67,
        "shotcalling": 73,
        "laning": 65,
        "teamfight": 64,
        "mechanics": 63,
        "championPool": [
          "Lee Sin",
          "Elise",
          "Vi"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "drx_mid",
        "name": "Ucal",
        "role": "MID",
        "nationality": "KR",
        "level": 65,
        "potential": 64,
        "form": 63,
        "fatigue": 0,
        "mental": 58,
        "shotcalling": 62,
        "laning": 72,
        "teamfight": 62,
        "mechanics": 67,
        "championPool": [
          "Taliyah",
          "LeBlanc",
          "Ahri"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "drx_adc",
        "name": "Jiwoo",
        "role": "ADC",
        "nationality": "KR",
        "level": 70,
        "potential": 74,
        "form": 55,
        "fatigue": 0,
        "mental": 69,
        "shotcalling": 62,
        "laning": 76,
        "teamfight": 71,
        "mechanics": 71,
        "championPool": [
          "Caitlyn",
          "Kai'Sa",
          "Varus"
        ],
        "traits": []
      },
      {
        "id": "drx_support",
        "name": "Andil",
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 71,
        "potential": 70,
        "form": 51,
        "fatigue": 0,
        "mental": 70,
        "shotcalling": 76,
        "laning": 65,
        "teamfight": 67,
        "mechanics": 68,
        "championPool": [
          "Pyke",
          "Nautilus",
          "Thresh"
        ],
        "traits": []
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
          "LeBlanc",
          "Ahri"
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
        "role": "TOP",
        "nationality": "KR",
        "level": 75,
        "potential": 78,
        "form": 74,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 68,
        "laning": 80,
        "teamfight": 72,
        "mechanics": 80,
        "championPool": [
          "Gnar",
          "K'Sante",
          "Rumble"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "kt_jungle",
        "name": "Cuzz",
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 83,
        "potential": 87,
        "form": 77,
        "fatigue": 0,
        "mental": 85,
        "shotcalling": 82,
        "laning": 79,
        "teamfight": 85,
        "mechanics": 82,
        "championPool": [
          "Vi",
          "Nocturne",
          "Sejuani"
        ],
        "traits": [
          "consistant",
          "igl"
        ]
      },
      {
        "id": "kt_mid",
        "name": "Bdd",
        "role": "MID",
        "nationality": "KR",
        "level": 88,
        "potential": 94,
        "form": 70,
        "fatigue": 0,
        "mental": 89,
        "shotcalling": 87,
        "laning": 85,
        "teamfight": 93,
        "mechanics": 93,
        "championPool": [
          "Azir",
          "Taliyah",
          "Orianna"
        ],
        "traits": [
          "clutch",
          "mechanical"
        ]
      },
      {
        "id": "kt_adc",
        "name": "Aiming",
        "role": "ADC",
        "nationality": "KR",
        "level": 88,
        "potential": 92,
        "form": 70,
        "fatigue": 0,
        "mental": 80,
        "shotcalling": 82,
        "laning": 90,
        "teamfight": 95,
        "mechanics": 88,
        "championPool": [
          "Ezreal",
          "Jinx",
          "Varus"
        ],
        "traits": [
          "mechanical"
        ]
      },
      {
        "id": "kt_support",
        "name": "Effort",
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 83,
        "potential": 83,
        "form": 61,
        "fatigue": 0,
        "mental": 83,
        "shotcalling": 87,
        "laning": 85,
        "teamfight": 79,
        "mechanics": 81,
        "championPool": [
          "Nautilus",
          "Rakan",
          "Bard"
        ],
        "traits": [
          "igl"
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
        "role": "TOP",
        "nationality": "KR",
        "level": 70,
        "potential": 72,
        "form": 64,
        "fatigue": 0,
        "mental": 66,
        "shotcalling": 65,
        "laning": 73,
        "teamfight": 69,
        "mechanics": 71,
        "championPool": [
          "Renekton",
          "Kennen",
          "Jayce"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "ns_jungle",
        "name": "Sponge",
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 62,
        "potential": 61,
        "form": 50,
        "fatigue": 0,
        "mental": 62,
        "shotcalling": 65,
        "laning": 58,
        "teamfight": 63,
        "mechanics": 59,
        "championPool": [
          "Lee Sin",
          "Elise",
          "Vi"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "ns_mid",
        "name": "Scout",
        "role": "MID",
        "nationality": "CN",
        "level": 69,
        "potential": 75,
        "form": 59,
        "fatigue": 0,
        "mental": 68,
        "shotcalling": 61,
        "laning": 72,
        "teamfight": 66,
        "mechanics": 75,
        "championPool": [
          "Azir",
          "Ryze",
          "LeBlanc"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "ns_adc",
        "name": "Taeyoon",
        "role": "ADC",
        "nationality": "KR",
        "level": 62,
        "potential": 63,
        "form": 57,
        "fatigue": 0,
        "mental": 62,
        "shotcalling": 54,
        "laning": 63,
        "teamfight": 65,
        "mechanics": 64,
        "championPool": [
          "Varus",
          "Caitlyn",
          "Kai'Sa"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "ns_support",
        "name": "Lehends",
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 87,
        "potential": 85,
        "form": 60,
        "fatigue": 0,
        "mental": 86,
        "shotcalling": 89,
        "laning": 83,
        "teamfight": 89,
        "mechanics": 86,
        "championPool": [
          "Bard",
          "Rakan",
          "Thresh"
        ],
        "traits": [
          "igl"
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
          "LeBlanc",
          "Ahri"
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
        "role": "TOP",
        "nationality": "KR",
        "level": 88,
        "potential": 93,
        "form": 81,
        "fatigue": 0,
        "mental": 85,
        "shotcalling": 83,
        "laning": 90,
        "teamfight": 88,
        "mechanics": 88,
        "championPool": [
          "Rumble",
          "Gnar",
          "K'Sante"
        ],
        "traits": [
          "consistant",
          "mechanical"
        ]
      },
      {
        "id": "t1_jungle",
        "name": "Oner",
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 91,
        "potential": 91,
        "form": 81,
        "fatigue": 0,
        "mental": 98,
        "shotcalling": 98,
        "laning": 84,
        "teamfight": 93,
        "mechanics": 92,
        "championPool": [
          "Lee Sin",
          "Viego",
          "Vi"
        ],
        "traits": [
          "clutch",
          "consistant",
          "igl",
          "leader",
          "mechanical"
        ]
      },
      {
        "id": "t1_mid",
        "name": "Faker",
        "role": "MID",
        "nationality": "KR",
        "level": 95,
        "potential": 98,
        "form": 65,
        "fatigue": 0,
        "mental": 98,
        "shotcalling": 98,
        "laning": 94,
        "teamfight": 96,
        "mechanics": 95,
        "championPool": [
          "Azir",
          "Orianna",
          "Ryze"
        ],
        "traits": [
          "clutch",
          "leader",
          "mechanical",
          "veteran"
        ]
      },
      {
        "id": "t1_adc",
        "name": "Peyz",
        "role": "ADC",
        "nationality": "KR",
        "level": 91,
        "potential": 94,
        "form": 76,
        "fatigue": 0,
        "mental": 88,
        "shotcalling": 80,
        "laning": 95,
        "teamfight": 97,
        "mechanics": 98,
        "championPool": [
          "Ezreal",
          "Varus",
          "Zeri"
        ],
        "traits": [
          "clutch",
          "mechanical"
        ]
      },
      {
        "id": "t1_support",
        "name": "Keria",
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 94,
        "potential": 92,
        "form": 77,
        "fatigue": 0,
        "mental": 96,
        "shotcalling": 98,
        "laning": 89,
        "teamfight": 94,
        "mechanics": 92,
        "championPool": [
          "Thresh",
          "Renata",
          "Nautilus"
        ],
        "traits": [
          "clutch",
          "igl",
          "leader",
          "mechanical"
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
        "role": "TOP",
        "nationality": "CN",
        "level": 86,
        "potential": 85,
        "form": 68,
        "fatigue": 0,
        "mental": 90,
        "shotcalling": 76,
        "laning": 85,
        "teamfight": 81,
        "mechanics": 85,
        "championPool": [
          "Gangplank",
          "Jayce",
          "Kennen"
        ],
        "traits": [
          "clutch",
          "veteran"
        ]
      },
      {
        "id": "al_jungle",
        "name": "Tarzan",
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 90,
        "potential": 91,
        "form": 79,
        "fatigue": 0,
        "mental": 89,
        "shotcalling": 88,
        "laning": 87,
        "teamfight": 91,
        "mechanics": 89,
        "championPool": [
          "Jarvan IV",
          "Sejuani",
          "Lee Sin"
        ],
        "traits": [
          "clutch",
          "consistant",
          "igl",
          "mechanical"
        ]
      },
      {
        "id": "al_mid",
        "name": "Shanks",
        "role": "MID",
        "nationality": "CN",
        "level": 79,
        "potential": 78,
        "form": 81,
        "fatigue": 0,
        "mental": 73,
        "shotcalling": 75,
        "laning": 80,
        "teamfight": 83,
        "mechanics": 84,
        "championPool": [
          "Ryze",
          "Orianna",
          "Azir"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "al_adc",
        "name": "Hope",
        "role": "ADC",
        "nationality": "CN",
        "level": 89,
        "potential": 94,
        "form": 72,
        "fatigue": 0,
        "mental": 83,
        "shotcalling": 80,
        "laning": 85,
        "teamfight": 93,
        "mechanics": 89,
        "championPool": [
          "Varus",
          "Ashe",
          "Ezreal"
        ],
        "traits": [
          "mechanical"
        ]
      },
      {
        "id": "al_support",
        "name": "Kael",
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 89,
        "potential": 92,
        "form": 73,
        "fatigue": 0,
        "mental": 88,
        "shotcalling": 87,
        "laning": 89,
        "teamfight": 87,
        "mechanics": 84,
        "championPool": [
          "Rakan",
          "Bard",
          "Nautilus"
        ],
        "traits": [
          "clutch",
          "igl"
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
        "role": "TOP",
        "nationality": "CN",
        "level": 95,
        "potential": 98,
        "form": 75,
        "fatigue": 0,
        "mental": 90,
        "shotcalling": 88,
        "laning": 96,
        "teamfight": 95,
        "mechanics": 99,
        "championPool": [
          "Jax",
          "Gnar",
          "Rumble"
        ],
        "traits": [
          "clutch",
          "mechanical"
        ]
      },
      {
        "id": "blg_jungle",
        "name": "Xun",
        "role": "JUNGLE",
        "nationality": "CN",
        "level": 91,
        "potential": 91,
        "form": 69,
        "fatigue": 0,
        "mental": 90,
        "shotcalling": 93,
        "laning": 86,
        "teamfight": 97,
        "mechanics": 92,
        "championPool": [
          "Wukong",
          "Vi",
          "Nocturne"
        ],
        "traits": [
          "clutch",
          "igl",
          "mechanical"
        ]
      },
      {
        "id": "blg_mid",
        "name": "Knight",
        "role": "MID",
        "nationality": "CN",
        "level": 96,
        "potential": 98,
        "form": 77,
        "fatigue": 0,
        "mental": 97,
        "shotcalling": 96,
        "laning": 93,
        "teamfight": 98,
        "mechanics": 99,
        "championPool": [
          "Orianna",
          "Ahri",
          "Syndra"
        ],
        "traits": [
          "clutch",
          "mechanical"
        ]
      },
      {
        "id": "blg_adc",
        "name": "Viper",
        "role": "ADC",
        "nationality": "KR",
        "level": 94,
        "potential": 97,
        "form": 82,
        "fatigue": 0,
        "mental": 90,
        "shotcalling": 91,
        "laning": 92,
        "teamfight": 98,
        "mechanics": 99,
        "championPool": [
          "Varus",
          "Ezreal",
          "Aphelios"
        ],
        "traits": [
          "clutch",
          "consistant",
          "mechanical"
        ]
      },
      {
        "id": "blg_support",
        "name": "ON",
        "role": "SUPPORT",
        "nationality": "CN",
        "level": 90,
        "potential": 95,
        "form": 70,
        "fatigue": 0,
        "mental": 91,
        "shotcalling": 94,
        "laning": 86,
        "teamfight": 88,
        "mechanics": 90,
        "championPool": [
          "Rakan",
          "Nautilus",
          "Rell"
        ],
        "traits": [
          "clutch",
          "igl",
          "mechanical"
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
        "role": "TOP",
        "nationality": "CN",
        "level": 69,
        "potential": 71,
        "form": 58,
        "fatigue": 0,
        "mental": 69,
        "shotcalling": 59,
        "laning": 74,
        "teamfight": 64,
        "mechanics": 74,
        "championPool": [
          "Ornn",
          "Sion",
          "Gnar"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "edg_jungle",
        "name": "Xiaohao",
        "role": "JUNGLE",
        "nationality": "CN",
        "level": 64,
        "potential": 67,
        "form": 59,
        "fatigue": 0,
        "mental": 57,
        "shotcalling": 69,
        "laning": 62,
        "teamfight": 65,
        "mechanics": 65,
        "championPool": [
          "Sejuani",
          "Maokai",
          "Jarvan IV"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "edg_mid",
        "name": "Angel",
        "role": "MID",
        "nationality": "CN",
        "level": 64,
        "potential": 66,
        "form": 50,
        "fatigue": 0,
        "mental": 56,
        "shotcalling": 65,
        "laning": 61,
        "teamfight": 70,
        "mechanics": 66,
        "championPool": [
          "Viktor",
          "Orianna",
          "Azir"
        ],
        "traits": []
      },
      {
        "id": "edg_adc",
        "name": "Leave",
        "role": "ADC",
        "nationality": "CN",
        "level": 69,
        "potential": 70,
        "form": 49,
        "fatigue": 0,
        "mental": 69,
        "shotcalling": 64,
        "laning": 70,
        "teamfight": 69,
        "mechanics": 69,
        "championPool": [
          "Aphelios",
          "Caitlyn",
          "Jinx"
        ],
        "traits": []
      },
      {
        "id": "edg_support",
        "name": "Jwei",
        "role": "SUPPORT",
        "nationality": "CN",
        "level": 63,
        "potential": 67,
        "form": 57,
        "fatigue": 0,
        "mental": 61,
        "shotcalling": 60,
        "laning": 57,
        "teamfight": 63,
        "mechanics": 61,
        "championPool": [
          "Milio",
          "Karma",
          "Lulu"
        ],
        "traits": [
          "consistant"
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
          "Lulu",
          "Milio"
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
        "role": "TOP",
        "nationality": "CN",
        "level": 76,
        "potential": 77,
        "form": 63,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 75,
        "laning": 78,
        "teamfight": 71,
        "mechanics": 73,
        "championPool": [
          "Renekton",
          "Kennen",
          "Jayce"
        ],
        "traits": []
      },
      {
        "id": "ig_jungle",
        "name": "Wei",
        "role": "JUNGLE",
        "nationality": "CN",
        "level": 82,
        "potential": 83,
        "form": 75,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 88,
        "laning": 78,
        "teamfight": 80,
        "mechanics": 82,
        "championPool": [
          "Vi",
          "Lee Sin",
          "Elise"
        ],
        "traits": [
          "consistant",
          "igl"
        ]
      },
      {
        "id": "ig_mid",
        "name": "Renard",
        "role": "MID",
        "nationality": "CN",
        "level": 79,
        "potential": 84,
        "form": 71,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 77,
        "laning": 83,
        "teamfight": 78,
        "mechanics": 83,
        "championPool": [
          "LeBlanc",
          "Ahri",
          "Taliyah"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "ig_adc",
        "name": "Nia",
        "role": "ADC",
        "nationality": "CN",
        "level": 75,
        "potential": 73,
        "form": 73,
        "fatigue": 0,
        "mental": 69,
        "shotcalling": 67,
        "laning": 76,
        "teamfight": 83,
        "mechanics": 82,
        "championPool": [
          "Caitlyn",
          "Kai'Sa",
          "Varus"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "ig_support",
        "name": "Meiko",
        "role": "SUPPORT",
        "nationality": "CN",
        "level": 88,
        "potential": 90,
        "form": 59,
        "fatigue": 0,
        "mental": 91,
        "shotcalling": 98,
        "laning": 82,
        "teamfight": 87,
        "mechanics": 83,
        "championPool": [
          "Nautilus",
          "Rakan",
          "Braum"
        ],
        "traits": [
          "clutch",
          "igl",
          "leader",
          "veteran"
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
          "LeBlanc",
          "Ahri"
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
        "role": "TOP",
        "nationality": "CN",
        "level": 88,
        "potential": 91,
        "form": 68,
        "fatigue": 0,
        "mental": 80,
        "shotcalling": 82,
        "laning": 88,
        "teamfight": 92,
        "mechanics": 90,
        "championPool": [
          "Rumble",
          "Gnar",
          "K'Sante"
        ],
        "traits": [
          "mechanical"
        ]
      },
      {
        "id": "jdg_jungle",
        "name": "JunJia",
        "role": "JUNGLE",
        "nationality": "APAC",
        "level": 82,
        "potential": 83,
        "form": 72,
        "fatigue": 0,
        "mental": 84,
        "shotcalling": 81,
        "laning": 81,
        "teamfight": 82,
        "mechanics": 82,
        "championPool": [
          "Vi",
          "Nocturne",
          "Jarvan IV"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "jdg_mid",
        "name": "HongQ",
        "role": "MID",
        "nationality": "APAC",
        "level": 81,
        "potential": 81,
        "form": 80,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 83,
        "laning": 87,
        "teamfight": 81,
        "mechanics": 86,
        "championPool": [
          "Azir",
          "Ryze",
          "Orianna"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "jdg_adc",
        "name": "GALA",
        "role": "ADC",
        "nationality": "CN",
        "level": 89,
        "potential": 89,
        "form": 75,
        "fatigue": 0,
        "mental": 84,
        "shotcalling": 85,
        "laning": 89,
        "teamfight": 89,
        "mechanics": 97,
        "championPool": [
          "Kai'Sa",
          "Xayah",
          "Varus"
        ],
        "traits": [
          "mechanical"
        ]
      },
      {
        "id": "jdg_support",
        "name": "Vampire",
        "role": "SUPPORT",
        "nationality": "CN",
        "level": 87,
        "potential": 92,
        "form": 69,
        "fatigue": 0,
        "mental": 88,
        "shotcalling": 93,
        "laning": 82,
        "teamfight": 89,
        "mechanics": 82,
        "championPool": [
          "Bard",
          "Nautilus",
          "Rakan"
        ],
        "traits": [
          "clutch",
          "igl"
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
        "role": "TOP",
        "nationality": "KR",
        "level": 59,
        "potential": 57,
        "form": 58,
        "fatigue": 0,
        "mental": 51,
        "shotcalling": 53,
        "laning": 60,
        "teamfight": 56,
        "mechanics": 62,
        "championPool": [
          "Ornn",
          "Sion",
          "Gnar"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ]
      },
      {
        "id": "lgd_jungle",
        "name": "Heng",
        "role": "JUNGLE",
        "nationality": "CN",
        "level": 60,
        "potential": 65,
        "form": 49,
        "fatigue": 0,
        "mental": 59,
        "shotcalling": 57,
        "laning": 57,
        "teamfight": 56,
        "mechanics": 62,
        "championPool": [
          "Maokai",
          "Jarvan IV",
          "Sejuani"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "lgd_mid",
        "name": "Tangyuan",
        "role": "MID",
        "nationality": "CN",
        "level": 64,
        "potential": 67,
        "form": 57,
        "fatigue": 0,
        "mental": 56,
        "shotcalling": 62,
        "laning": 71,
        "teamfight": 62,
        "mechanics": 65,
        "championPool": [
          "Azir",
          "Viktor",
          "Orianna"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "lgd_adc",
        "name": "Shaoye",
        "role": "ADC",
        "nationality": "CN",
        "level": 62,
        "potential": 62,
        "form": 44,
        "fatigue": 0,
        "mental": 54,
        "shotcalling": 57,
        "laning": 66,
        "teamfight": 62,
        "mechanics": 61,
        "championPool": [
          "Caitlyn",
          "Jinx",
          "Aphelios"
        ],
        "traits": []
      },
      {
        "id": "lgd_support",
        "name": "Ycx",
        "role": "SUPPORT",
        "nationality": "CN",
        "level": 64,
        "potential": 67,
        "form": 49,
        "fatigue": 0,
        "mental": 66,
        "shotcalling": 65,
        "laning": 58,
        "teamfight": 66,
        "mechanics": 60,
        "championPool": [
          "Karma",
          "Lulu",
          "Milio"
        ],
        "traits": []
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
          "Lulu",
          "Milio"
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
        "role": "TOP",
        "nationality": "CN",
        "level": 61,
        "potential": 60,
        "form": 54,
        "fatigue": 0,
        "mental": 59,
        "shotcalling": 61,
        "laning": 64,
        "teamfight": 56,
        "mechanics": 66,
        "championPool": [
          "Jayce",
          "Kennen",
          "Rumble"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "lng_jungle",
        "name": "Croco",
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 67,
        "potential": 70,
        "form": 56,
        "fatigue": 0,
        "mental": 60,
        "shotcalling": 67,
        "laning": 64,
        "teamfight": 65,
        "mechanics": 68,
        "championPool": [
          "Ivern",
          "Nidalee",
          "Graves"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "lng_mid",
        "name": "BuLLDoG",
        "role": "MID",
        "nationality": "KR",
        "level": 68,
        "potential": 72,
        "form": 63,
        "fatigue": 0,
        "mental": 66,
        "shotcalling": 66,
        "laning": 65,
        "teamfight": 70,
        "mechanics": 73,
        "championPool": [
          "Orianna",
          "Hwei",
          "Zoe"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "lng_adc",
        "name": "1xn",
        "role": "ADC",
        "nationality": "CN",
        "level": 61,
        "potential": 61,
        "form": 60,
        "fatigue": 0,
        "mental": 62,
        "shotcalling": 53,
        "laning": 61,
        "teamfight": 67,
        "mechanics": 61,
        "championPool": [
          "Caitlyn",
          "Ezreal",
          "Varus"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "lng_support",
        "name": "MISSING",
        "role": "SUPPORT",
        "nationality": "CN",
        "level": 67,
        "potential": 72,
        "form": 61,
        "fatigue": 0,
        "mental": 67,
        "shotcalling": 69,
        "laning": 68,
        "teamfight": 71,
        "mechanics": 64,
        "championPool": [
          "Karma",
          "Milio",
          "Nami"
        ],
        "traits": [
          "consistant"
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
          "Hwei",
          "Zoe"
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
        "role": "TOP",
        "nationality": "KR",
        "level": 74,
        "potential": 78,
        "form": 56,
        "fatigue": 0,
        "mental": 66,
        "shotcalling": 64,
        "laning": 75,
        "teamfight": 72,
        "mechanics": 75,
        "championPool": [
          "Renekton",
          "Kennen",
          "Jayce"
        ],
        "traits": []
      },
      {
        "id": "nip_jungle",
        "name": "Guwon",
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 72,
        "potential": 74,
        "form": 72,
        "fatigue": 0,
        "mental": 67,
        "shotcalling": 76,
        "laning": 65,
        "teamfight": 71,
        "mechanics": 69,
        "championPool": [
          "Vi",
          "Lee Sin",
          "Elise"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "nip_mid",
        "name": "Care",
        "role": "MID",
        "nationality": "CN",
        "level": 75,
        "potential": 78,
        "form": 68,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 68,
        "laning": 73,
        "teamfight": 80,
        "mechanics": 77,
        "championPool": [
          "LeBlanc",
          "Ahri",
          "Taliyah"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "nip_adc",
        "name": "Assum",
        "role": "ADC",
        "nationality": "CN",
        "level": 72,
        "potential": 74,
        "form": 67,
        "fatigue": 0,
        "mental": 68,
        "shotcalling": 70,
        "laning": 71,
        "teamfight": 77,
        "mechanics": 74,
        "championPool": [
          "Kai'Sa",
          "Varus",
          "Caitlyn"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "nip_support",
        "name": "Zhuo",
        "role": "SUPPORT",
        "nationality": "CN",
        "level": 69,
        "potential": 75,
        "form": 54,
        "fatigue": 0,
        "mental": 68,
        "shotcalling": 66,
        "laning": 65,
        "teamfight": 70,
        "mechanics": 68,
        "championPool": [
          "Pyke",
          "Nautilus",
          "Thresh"
        ],
        "traits": []
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
          "LeBlanc",
          "Ahri"
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
        "role": "TOP",
        "nationality": "CN",
        "level": 64,
        "potential": 69,
        "form": 56,
        "fatigue": 0,
        "mental": 57,
        "shotcalling": 59,
        "laning": 71,
        "teamfight": 68,
        "mechanics": 66,
        "championPool": [
          "Jayce",
          "Kennen",
          "Rumble"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "omg_jungle",
        "name": "Juhan",
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 61,
        "potential": 62,
        "form": 50,
        "fatigue": 0,
        "mental": 63,
        "shotcalling": 67,
        "laning": 60,
        "teamfight": 65,
        "mechanics": 60,
        "championPool": [
          "Nidalee",
          "Graves",
          "Ivern"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "omg_mid",
        "name": "haichao",
        "role": "MID",
        "nationality": "CN",
        "level": 61,
        "potential": 59,
        "form": 50,
        "fatigue": 0,
        "mental": 55,
        "shotcalling": 61,
        "laning": 61,
        "teamfight": 65,
        "mechanics": 62,
        "championPool": [
          "Orianna",
          "Hwei",
          "Zoe"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ]
      },
      {
        "id": "omg_adc",
        "name": "Photic",
        "role": "ADC",
        "nationality": "CN",
        "level": 70,
        "potential": 76,
        "form": 61,
        "fatigue": 0,
        "mental": 63,
        "shotcalling": 63,
        "laning": 75,
        "teamfight": 69,
        "mechanics": 69,
        "championPool": [
          "Caitlyn",
          "Ezreal",
          "Varus"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "omg_support",
        "name": "Moham",
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 63,
        "potential": 69,
        "form": 50,
        "fatigue": 0,
        "mental": 59,
        "shotcalling": 67,
        "laning": 60,
        "teamfight": 60,
        "mechanics": 61,
        "championPool": [
          "Karma",
          "Milio",
          "Nami"
        ],
        "traits": []
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
          "Hwei",
          "Zoe"
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
        "role": "TOP",
        "nationality": "CN",
        "level": 77,
        "potential": 80,
        "form": 67,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 68,
        "laning": 78,
        "teamfight": 75,
        "mechanics": 74,
        "championPool": [
          "Gnar",
          "Ornn",
          "Sion"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "we_jungle",
        "name": "Monki",
        "role": "JUNGLE",
        "nationality": "CN",
        "level": 72,
        "potential": 78,
        "form": 56,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 73,
        "laning": 65,
        "teamfight": 68,
        "mechanics": 69,
        "championPool": [
          "Maokai",
          "Jarvan IV",
          "Sejuani"
        ],
        "traits": []
      },
      {
        "id": "we_mid",
        "name": "Karis",
        "role": "MID",
        "nationality": "KR",
        "level": 74,
        "potential": 79,
        "form": 69,
        "fatigue": 0,
        "mental": 70,
        "shotcalling": 67,
        "laning": 73,
        "teamfight": 71,
        "mechanics": 79,
        "championPool": [
          "Viktor",
          "Orianna",
          "Azir"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "we_adc",
        "name": "About",
        "role": "ADC",
        "nationality": "KR",
        "level": 75,
        "potential": 81,
        "form": 68,
        "fatigue": 0,
        "mental": 69,
        "shotcalling": 70,
        "laning": 79,
        "teamfight": 78,
        "mechanics": 82,
        "championPool": [
          "Jinx",
          "Aphelios",
          "Caitlyn"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "we_support",
        "name": "Erha",
        "role": "SUPPORT",
        "nationality": "CN",
        "level": 67,
        "potential": 65,
        "form": 72,
        "fatigue": 0,
        "mental": 59,
        "shotcalling": 71,
        "laning": 67,
        "teamfight": 70,
        "mechanics": 66,
        "championPool": [
          "Karma",
          "Lulu",
          "Milio"
        ],
        "traits": [
          "consistant"
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
        "role": "TOP",
        "nationality": "CN",
        "level": 58,
        "potential": 62,
        "form": 46,
        "fatigue": 0,
        "mental": 54,
        "shotcalling": 56,
        "laning": 61,
        "teamfight": 56,
        "mechanics": 60,
        "championPool": [
          "Kennen",
          "Jayce",
          "Renekton"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ]
      },
      {
        "id": "ttg_jungle",
        "name": "Junhao",
        "role": "JUNGLE",
        "nationality": "CN",
        "level": 55,
        "potential": 59,
        "form": 60,
        "fatigue": 0,
        "mental": 49,
        "shotcalling": 51,
        "laning": 49,
        "teamfight": 60,
        "mechanics": 52,
        "championPool": [
          "Elise",
          "Vi",
          "Lee Sin"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ]
      },
      {
        "id": "ttg_mid",
        "name": "Heru",
        "role": "MID",
        "nationality": "KR",
        "level": 62,
        "potential": 67,
        "form": 47,
        "fatigue": 0,
        "mental": 57,
        "shotcalling": 64,
        "laning": 64,
        "teamfight": 69,
        "mechanics": 61,
        "championPool": [
          "LeBlanc",
          "Ahri",
          "Taliyah"
        ],
        "traits": [
          "rookie"
        ]
      },
      {
        "id": "ttg_adc",
        "name": "Ahn",
        "role": "ADC",
        "nationality": "CN",
        "level": 65,
        "potential": 64,
        "form": 47,
        "fatigue": 0,
        "mental": 64,
        "shotcalling": 54,
        "laning": 70,
        "teamfight": 66,
        "mechanics": 65,
        "championPool": [
          "Varus",
          "Caitlyn",
          "Kai'Sa"
        ],
        "traits": []
      },
      {
        "id": "ttg_support",
        "name": "Feather",
        "role": "SUPPORT",
        "nationality": "CN",
        "level": 56,
        "potential": 55,
        "form": 59,
        "fatigue": 0,
        "mental": 57,
        "shotcalling": 55,
        "laning": 59,
        "teamfight": 53,
        "mechanics": 53,
        "championPool": [
          "Pyke",
          "Nautilus",
          "Thresh"
        ],
        "traits": [
          "consistant",
          "tiltable"
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
          "LeBlanc",
          "Ahri"
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
        "role": "TOP",
        "nationality": "CN",
        "level": 84,
        "potential": 91,
        "form": 75,
        "fatigue": 0,
        "mental": 83,
        "shotcalling": 84,
        "laning": 85,
        "teamfight": 86,
        "mechanics": 87,
        "championPool": [
          "Gnar",
          "K'Sante",
          "Rumble"
        ],
        "traits": [
          "consistant",
          "rookie"
        ]
      },
      {
        "id": "tes_jungle",
        "name": "Tian",
        "role": "JUNGLE",
        "nationality": "CN",
        "level": 89,
        "potential": 91,
        "form": 70,
        "fatigue": 0,
        "mental": 86,
        "shotcalling": 86,
        "laning": 85,
        "teamfight": 93,
        "mechanics": 98,
        "championPool": [
          "Lee Sin",
          "Viego",
          "Jarvan IV"
        ],
        "traits": [
          "igl",
          "mechanical"
        ]
      },
      {
        "id": "tes_mid",
        "name": "Creme",
        "role": "MID",
        "nationality": "CN",
        "level": 82,
        "potential": 83,
        "form": 79,
        "fatigue": 0,
        "mental": 80,
        "shotcalling": 82,
        "laning": 81,
        "teamfight": 87,
        "mechanics": 81,
        "championPool": [
          "Azir",
          "Ryze",
          "Orianna"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "tes_adc",
        "name": "JackeyLove",
        "role": "ADC",
        "nationality": "CN",
        "level": 89,
        "potential": 92,
        "form": 68,
        "fatigue": 0,
        "mental": 83,
        "shotcalling": 82,
        "laning": 88,
        "teamfight": 97,
        "mechanics": 95,
        "championPool": [
          "Lucian",
          "Ezreal",
          "Kai'Sa"
        ],
        "traits": [
          "mechanical"
        ]
      },
      {
        "id": "tes_support",
        "name": "fengyue",
        "role": "SUPPORT",
        "nationality": "CN",
        "level": 86,
        "potential": 85,
        "form": 73,
        "fatigue": 0,
        "mental": 79,
        "shotcalling": 89,
        "laning": 90,
        "teamfight": 88,
        "mechanics": 83,
        "championPool": [
          "Bard",
          "Nautilus",
          "Rakan"
        ],
        "traits": [
          "igl"
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
        "role": "TOP",
        "nationality": "CN",
        "level": 62,
        "potential": 63,
        "form": 61,
        "fatigue": 0,
        "mental": 62,
        "shotcalling": 53,
        "laning": 68,
        "teamfight": 66,
        "mechanics": 60,
        "championPool": [
          "Fiora",
          "Camille",
          "Jax"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "up_jungle",
        "name": "Climber",
        "role": "JUNGLE",
        "nationality": "CN",
        "level": 58,
        "potential": 60,
        "form": 49,
        "fatigue": 0,
        "mental": 57,
        "shotcalling": 60,
        "laning": 50,
        "teamfight": 62,
        "mechanics": 55,
        "championPool": [
          "Lee Sin",
          "Nocturne",
          "Viego"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ]
      },
      {
        "id": "up_mid",
        "name": "Saber",
        "role": "MID",
        "nationality": "CN",
        "level": 61,
        "potential": 65,
        "form": 49,
        "fatigue": 0,
        "mental": 57,
        "shotcalling": 62,
        "laning": 68,
        "teamfight": 63,
        "mechanics": 66,
        "championPool": [
          "Ryze",
          "Akali",
          "Twisted Fate"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ]
      },
      {
        "id": "up_adc",
        "name": "Hena",
        "role": "ADC",
        "nationality": "KR",
        "level": 55,
        "potential": 56,
        "form": 59,
        "fatigue": 0,
        "mental": 55,
        "shotcalling": 50,
        "laning": 53,
        "teamfight": 61,
        "mechanics": 59,
        "championPool": [
          "Ezreal",
          "Kai'Sa",
          "Vayne"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ]
      },
      {
        "id": "up_support",
        "name": "Xiaoxia",
        "role": "SUPPORT",
        "nationality": "CN",
        "level": 62,
        "potential": 67,
        "form": 45,
        "fatigue": 0,
        "mental": 57,
        "shotcalling": 58,
        "laning": 66,
        "teamfight": 66,
        "mechanics": 57,
        "championPool": [
          "Rakan",
          "Bard",
          "Tahm Kench"
        ],
        "traits": []
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
          "Nocturne",
          "Viego"
        ],
        "MID": [
          "Twisted Fate",
          "Ryze"
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
        "role": "TOP",
        "nationality": "CN",
        "level": 74,
        "potential": 78,
        "form": 63,
        "fatigue": 0,
        "mental": 66,
        "shotcalling": 69,
        "laning": 80,
        "teamfight": 78,
        "mechanics": 73,
        "championPool": [
          "Gnar",
          "K'Sante",
          "Rumble"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "wbg_jungle",
        "name": "Jiejie",
        "role": "JUNGLE",
        "nationality": "CN",
        "level": 80,
        "potential": 84,
        "form": 61,
        "fatigue": 0,
        "mental": 80,
        "shotcalling": 85,
        "laning": 74,
        "teamfight": 83,
        "mechanics": 80,
        "championPool": [
          "Jarvan IV",
          "Viego",
          "Lee Sin"
        ],
        "traits": [
          "igl"
        ]
      },
      {
        "id": "wbg_mid",
        "name": "Xiaohu",
        "role": "MID",
        "nationality": "CN",
        "level": 90,
        "potential": 89,
        "form": 66,
        "fatigue": 0,
        "mental": 93,
        "shotcalling": 92,
        "laning": 96,
        "teamfight": 90,
        "mechanics": 89,
        "championPool": [
          "Azir",
          "Annie",
          "Taliyah"
        ],
        "traits": [
          "clutch",
          "leader",
          "mechanical",
          "veteran"
        ]
      },
      {
        "id": "wbg_adc",
        "name": "Elk",
        "role": "ADC",
        "nationality": "CN",
        "level": 91,
        "potential": 92,
        "form": 65,
        "fatigue": 0,
        "mental": 83,
        "shotcalling": 89,
        "laning": 95,
        "teamfight": 98,
        "mechanics": 99,
        "championPool": [
          "Varus",
          "Kai'Sa",
          "Aphelios"
        ],
        "traits": [
          "mechanical"
        ]
      },
      {
        "id": "wbg_support",
        "name": "Hang",
        "role": "SUPPORT",
        "nationality": "CN",
        "level": 74,
        "potential": 77,
        "form": 66,
        "fatigue": 0,
        "mental": 75,
        "shotcalling": 77,
        "laning": 77,
        "teamfight": 79,
        "mechanics": 77,
        "championPool": [
          "Nautilus",
          "Rakan",
          "Bard"
        ],
        "traits": [
          "consistant"
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
        "role": "TOP",
        "nationality": "KR",
        "level": 79,
        "potential": 84,
        "form": 66,
        "fatigue": 0,
        "mental": 71,
        "shotcalling": 75,
        "laning": 85,
        "teamfight": 83,
        "mechanics": 80,
        "championPool": [
          "K'Sante",
          "Rumble",
          "Gnar"
        ],
        "traits": []
      },
      {
        "id": "c9_jungle",
        "name": "Blaber",
        "role": "JUNGLE",
        "nationality": "NA",
        "level": 84,
        "potential": 82,
        "form": 76,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 80,
        "laning": 83,
        "teamfight": 89,
        "mechanics": 86,
        "championPool": [
          "Kindred",
          "Lee Sin",
          "Viego"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "c9_mid",
        "name": "APA",
        "role": "MID",
        "nationality": "NA",
        "level": 79,
        "potential": 84,
        "form": 65,
        "fatigue": 0,
        "mental": 80,
        "shotcalling": 78,
        "laning": 78,
        "teamfight": 79,
        "mechanics": 80,
        "championPool": [
          "Azir",
          "Ryze",
          "Orianna"
        ],
        "traits": []
      },
      {
        "id": "c9_adc",
        "name": "Zven",
        "role": "ADC",
        "nationality": "NA",
        "level": 81,
        "potential": 86,
        "form": 76,
        "fatigue": 0,
        "mental": 83,
        "shotcalling": 78,
        "laning": 84,
        "teamfight": 81,
        "mechanics": 82,
        "championPool": [
          "Varus",
          "Ashe",
          "Ezreal"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "c9_support",
        "name": "Vulcan",
        "role": "SUPPORT",
        "nationality": "NA",
        "level": 87,
        "potential": 93,
        "form": 79,
        "fatigue": 0,
        "mental": 82,
        "shotcalling": 87,
        "laning": 86,
        "teamfight": 86,
        "mechanics": 87,
        "championPool": [
          "Nautilus",
          "Rakan",
          "Braum"
        ],
        "traits": [
          "consistant",
          "igl"
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
        "role": "TOP",
        "nationality": "KR",
        "level": 70,
        "potential": 75,
        "form": 64,
        "fatigue": 0,
        "mental": 71,
        "shotcalling": 64,
        "laning": 77,
        "teamfight": 75,
        "mechanics": 72,
        "championPool": [
          "Ornn",
          "Sion",
          "Gnar"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "dig_jungle",
        "name": "eXyu",
        "role": "JUNGLE",
        "nationality": "NA",
        "level": 67,
        "potential": 70,
        "form": 54,
        "fatigue": 0,
        "mental": 64,
        "shotcalling": 66,
        "laning": 66,
        "teamfight": 66,
        "mechanics": 67,
        "championPool": [
          "Sejuani",
          "Maokai",
          "Jarvan IV"
        ],
        "traits": []
      },
      {
        "id": "dig_mid",
        "name": "Palafox",
        "role": "MID",
        "nationality": "NA",
        "level": 70,
        "potential": 72,
        "form": 58,
        "fatigue": 0,
        "mental": 64,
        "shotcalling": 64,
        "laning": 67,
        "teamfight": 69,
        "mechanics": 74,
        "championPool": [
          "Viktor",
          "Orianna",
          "Azir"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "dig_adc",
        "name": "FBI",
        "role": "ADC",
        "nationality": "NA",
        "level": 70,
        "potential": 71,
        "form": 61,
        "fatigue": 0,
        "mental": 64,
        "shotcalling": 68,
        "laning": 69,
        "teamfight": 75,
        "mechanics": 71,
        "championPool": [
          "Caitlyn",
          "Jinx",
          "Aphelios"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "dig_support",
        "name": "Ignar",
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 62,
        "potential": 64,
        "form": 67,
        "fatigue": 0,
        "mental": 57,
        "shotcalling": 60,
        "laning": 56,
        "teamfight": 61,
        "mechanics": 57,
        "championPool": [
          "Karma",
          "Lulu",
          "Milio"
        ],
        "traits": [
          "consistant"
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
          "Lulu",
          "Milio"
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
        "role": "TOP",
        "nationality": "KR",
        "level": 60,
        "potential": 60,
        "form": 57,
        "fatigue": 0,
        "mental": 61,
        "shotcalling": 57,
        "laning": 59,
        "teamfight": 64,
        "mechanics": 58,
        "championPool": [
          "Renekton",
          "Kennen",
          "Jayce"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "dsg_jungle",
        "name": "Kisno",
        "role": "JUNGLE",
        "nationality": "NA",
        "level": 56,
        "potential": 61,
        "form": 59,
        "fatigue": 0,
        "mental": 53,
        "shotcalling": 60,
        "laning": 54,
        "teamfight": 57,
        "mechanics": 56,
        "championPool": [
          "Lee Sin",
          "Elise",
          "Vi"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ]
      },
      {
        "id": "dsg_mid",
        "name": "KryRa",
        "role": "MID",
        "nationality": "NA",
        "level": 63,
        "potential": 63,
        "form": 60,
        "fatigue": 0,
        "mental": 64,
        "shotcalling": 55,
        "laning": 60,
        "teamfight": 67,
        "mechanics": 69,
        "championPool": [
          "LeBlanc",
          "Ahri",
          "Taliyah"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "dsg_adc",
        "name": "Callme",
        "role": "ADC",
        "nationality": "KR",
        "level": 59,
        "potential": 61,
        "form": 53,
        "fatigue": 0,
        "mental": 56,
        "shotcalling": 53,
        "laning": 64,
        "teamfight": 62,
        "mechanics": 65,
        "championPool": [
          "Caitlyn",
          "Kai'Sa",
          "Varus"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ]
      },
      {
        "id": "dsg_support",
        "name": "Lyonz",
        "role": "SUPPORT",
        "nationality": "NA",
        "level": 61,
        "potential": 61,
        "form": 53,
        "fatigue": 0,
        "mental": 56,
        "shotcalling": 67,
        "laning": 56,
        "teamfight": 59,
        "mechanics": 60,
        "championPool": [
          "Pyke",
          "Nautilus",
          "Thresh"
        ],
        "traits": [
          "consistant",
          "tiltable"
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
          "LeBlanc",
          "Ahri"
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
        "role": "TOP",
        "nationality": "EMEA",
        "level": 86,
        "potential": 97,
        "form": 75,
        "fatigue": 0,
        "mental": 78,
        "shotcalling": 81,
        "laning": 84,
        "teamfight": 87,
        "mechanics": 86,
        "championPool": [
          "K'Sante",
          "Rumble",
          "Gnar"
        ],
        "traits": [
          "consistant",
          "rookie"
        ]
      },
      {
        "id": "fly_jungle",
        "name": "Gryffinn",
        "role": "JUNGLE",
        "nationality": "NA",
        "level": 88,
        "potential": 93,
        "form": 77,
        "fatigue": 0,
        "mental": 82,
        "shotcalling": 87,
        "laning": 86,
        "teamfight": 86,
        "mechanics": 92,
        "championPool": [
          "Nocturne",
          "Jarvan IV",
          "Vi"
        ],
        "traits": [
          "consistant",
          "igl",
          "mechanical",
          "rookie"
        ]
      },
      {
        "id": "fly_mid",
        "name": "Quad",
        "role": "MID",
        "nationality": "KR",
        "level": 81,
        "potential": 83,
        "form": 67,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 83,
        "laning": 79,
        "teamfight": 88,
        "mechanics": 85,
        "championPool": [
          "Azir",
          "Ryze",
          "Orianna"
        ],
        "traits": []
      },
      {
        "id": "fly_adc",
        "name": "Massu",
        "role": "ADC",
        "nationality": "NA",
        "level": 89,
        "potential": 98,
        "form": 71,
        "fatigue": 0,
        "mental": 83,
        "shotcalling": 78,
        "laning": 85,
        "teamfight": 95,
        "mechanics": 96,
        "championPool": [
          "Varus",
          "Ashe",
          "Ezreal"
        ],
        "traits": [
          "mechanical",
          "rookie"
        ]
      },
      {
        "id": "fly_support",
        "name": "Cryogen",
        "role": "SUPPORT",
        "nationality": "NA",
        "level": 84,
        "potential": 93,
        "form": 66,
        "fatigue": 0,
        "mental": 84,
        "shotcalling": 84,
        "laning": 82,
        "teamfight": 86,
        "mechanics": 85,
        "championPool": [
          "Nautilus",
          "Rakan",
          "Bard"
        ],
        "traits": [
          "igl",
          "rookie"
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
        "role": "TOP",
        "nationality": "NA",
        "level": 80,
        "potential": 86,
        "form": 76,
        "fatigue": 0,
        "mental": 75,
        "shotcalling": 71,
        "laning": 84,
        "teamfight": 81,
        "mechanics": 77,
        "championPool": [
          "Kennen",
          "Jayce",
          "Renekton"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "lyo_jungle",
        "name": "Inspired",
        "role": "JUNGLE",
        "nationality": "NA",
        "level": 76,
        "potential": 74,
        "form": 59,
        "fatigue": 0,
        "mental": 78,
        "shotcalling": 81,
        "laning": 75,
        "teamfight": 75,
        "mechanics": 75,
        "championPool": [
          "Nocturne",
          "Viego",
          "Graves"
        ],
        "traits": []
      },
      {
        "id": "lyo_mid",
        "name": "Saint",
        "role": "MID",
        "nationality": "KR",
        "level": 74,
        "potential": 76,
        "form": 73,
        "fatigue": 0,
        "mental": 67,
        "shotcalling": 74,
        "laning": 81,
        "teamfight": 81,
        "mechanics": 79,
        "championPool": [
          "Ahri",
          "Taliyah",
          "LeBlanc"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "lyo_adc",
        "name": "Berserker",
        "role": "ADC",
        "nationality": "KR",
        "level": 87,
        "potential": 87,
        "form": 60,
        "fatigue": 0,
        "mental": 80,
        "shotcalling": 84,
        "laning": 93,
        "teamfight": 90,
        "mechanics": 92,
        "championPool": [
          "Aphelios",
          "Zeri",
          "Kai'Sa"
        ],
        "traits": [
          "mechanical"
        ]
      },
      {
        "id": "lyo_support",
        "name": "Isles",
        "role": "SUPPORT",
        "nationality": "NA",
        "level": 78,
        "potential": 77,
        "form": 70,
        "fatigue": 0,
        "mental": 72,
        "shotcalling": 84,
        "laning": 81,
        "teamfight": 80,
        "mechanics": 73,
        "championPool": [
          "Pyke",
          "Nautilus",
          "Thresh"
        ],
        "traits": [
          "consistant",
          "igl"
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
          "LeBlanc",
          "Ahri"
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
        "role": "TOP",
        "nationality": "NA",
        "level": 86,
        "potential": 91,
        "form": 76,
        "fatigue": 0,
        "mental": 92,
        "shotcalling": 77,
        "laning": 93,
        "teamfight": 84,
        "mechanics": 90,
        "championPool": [
          "K'Sante",
          "Ornn",
          "Gnar"
        ],
        "traits": [
          "clutch",
          "consistant",
          "mechanical",
          "veteran"
        ]
      },
      {
        "id": "sen_jungle",
        "name": "HamBak",
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 74,
        "potential": 76,
        "form": 59,
        "fatigue": 0,
        "mental": 70,
        "shotcalling": 72,
        "laning": 75,
        "teamfight": 71,
        "mechanics": 74,
        "championPool": [
          "Nocturne",
          "Jarvan IV",
          "Vi"
        ],
        "traits": []
      },
      {
        "id": "sen_mid",
        "name": "DARKWINGS",
        "role": "MID",
        "nationality": "NA",
        "level": 78,
        "potential": 80,
        "form": 64,
        "fatigue": 0,
        "mental": 78,
        "shotcalling": 75,
        "laning": 78,
        "teamfight": 83,
        "mechanics": 83,
        "championPool": [
          "Ryze",
          "Orianna",
          "Azir"
        ],
        "traits": []
      },
      {
        "id": "sen_adc",
        "name": "Rahel",
        "role": "ADC",
        "nationality": "KR",
        "level": 77,
        "potential": 79,
        "form": 60,
        "fatigue": 0,
        "mental": 77,
        "shotcalling": 76,
        "laning": 82,
        "teamfight": 83,
        "mechanics": 79,
        "championPool": [
          "Ezreal",
          "Varus",
          "Ashe"
        ],
        "traits": []
      },
      {
        "id": "sen_support",
        "name": "huhi",
        "role": "SUPPORT",
        "nationality": "NA",
        "level": 81,
        "potential": 87,
        "form": 67,
        "fatigue": 0,
        "mental": 80,
        "shotcalling": 84,
        "laning": 78,
        "teamfight": 87,
        "mechanics": 82,
        "championPool": [
          "Rakan",
          "Bard",
          "Nautilus"
        ],
        "traits": [
          "igl"
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
        "role": "TOP",
        "nationality": "NA",
        "level": 77,
        "potential": 81,
        "form": 68,
        "fatigue": 0,
        "mental": 69,
        "shotcalling": 73,
        "laning": 83,
        "teamfight": 82,
        "mechanics": 82,
        "championPool": [
          "Camille",
          "Jax",
          "Fiora"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "sr_jungle",
        "name": "Contractz",
        "role": "JUNGLE",
        "nationality": "NA",
        "level": 74,
        "potential": 76,
        "form": 61,
        "fatigue": 0,
        "mental": 67,
        "shotcalling": 74,
        "laning": 66,
        "teamfight": 80,
        "mechanics": 70,
        "championPool": [
          "Lee Sin",
          "Nocturne",
          "Viego"
        ],
        "traits": []
      },
      {
        "id": "sr_mid",
        "name": "Zinie",
        "role": "MID",
        "nationality": "KR",
        "level": 74,
        "potential": 74,
        "form": 57,
        "fatigue": 0,
        "mental": 75,
        "shotcalling": 67,
        "laning": 78,
        "teamfight": 72,
        "mechanics": 74,
        "championPool": [
          "Twisted Fate",
          "Ryze",
          "Akali"
        ],
        "traits": []
      },
      {
        "id": "sr_adc",
        "name": "Bvoy",
        "role": "ADC",
        "nationality": "KR",
        "level": 77,
        "potential": 79,
        "form": 72,
        "fatigue": 0,
        "mental": 70,
        "shotcalling": 67,
        "laning": 81,
        "teamfight": 82,
        "mechanics": 83,
        "championPool": [
          "Kai'Sa",
          "Vayne",
          "Ezreal"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "sr_support",
        "name": "Ceos",
        "role": "SUPPORT",
        "nationality": "NA",
        "level": 73,
        "potential": 74,
        "form": 56,
        "fatigue": 0,
        "mental": 75,
        "shotcalling": 73,
        "laning": 73,
        "teamfight": 72,
        "mechanics": 76,
        "championPool": [
          "Bard",
          "Tahm Kench",
          "Rakan"
        ],
        "traits": []
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
          "Nocturne",
          "Viego"
        ],
        "MID": [
          "Twisted Fate",
          "Ryze"
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
        "role": "TOP",
        "nationality": "KR",
        "level": 86,
        "potential": 90,
        "form": 69,
        "fatigue": 0,
        "mental": 84,
        "shotcalling": 81,
        "laning": 90,
        "teamfight": 89,
        "mechanics": 91,
        "championPool": [
          "Gnar",
          "K'Sante",
          "Rumble"
        ],
        "traits": [
          "mechanical"
        ]
      },
      {
        "id": "tl_jungle",
        "name": "Josedeodo",
        "role": "JUNGLE",
        "nationality": "NA",
        "level": 85,
        "potential": 85,
        "form": 79,
        "fatigue": 0,
        "mental": 87,
        "shotcalling": 85,
        "laning": 80,
        "teamfight": 91,
        "mechanics": 88,
        "championPool": [
          "Nocturne",
          "Jarvan IV",
          "Vi"
        ],
        "traits": [
          "consistant",
          "igl",
          "mechanical"
        ]
      },
      {
        "id": "tl_mid",
        "name": "Quid",
        "role": "MID",
        "nationality": "KR",
        "level": 82,
        "potential": 81,
        "form": 68,
        "fatigue": 0,
        "mental": 84,
        "shotcalling": 80,
        "laning": 85,
        "teamfight": 86,
        "mechanics": 85,
        "championPool": [
          "Azir",
          "Orianna",
          "Ahri"
        ],
        "traits": []
      },
      {
        "id": "tl_adc",
        "name": "Yeon",
        "role": "ADC",
        "nationality": "NA",
        "level": 85,
        "potential": 86,
        "form": 71,
        "fatigue": 0,
        "mental": 81,
        "shotcalling": 74,
        "laning": 81,
        "teamfight": 89,
        "mechanics": 84,
        "championPool": [
          "Ezreal",
          "Varus",
          "Ashe"
        ],
        "traits": []
      },
      {
        "id": "tl_support",
        "name": "CoreJJ",
        "role": "SUPPORT",
        "nationality": "NA",
        "level": 86,
        "potential": 91,
        "form": 70,
        "fatigue": 0,
        "mental": 89,
        "shotcalling": 98,
        "laning": 81,
        "teamfight": 83,
        "mechanics": 84,
        "championPool": [
          "Rakan",
          "Alistar",
          "Nautilus"
        ],
        "traits": [
          "clutch",
          "igl",
          "leader",
          "veteran"
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
        "role": "TOP",
        "nationality": "BR",
        "level": 76,
        "potential": 75,
        "form": 63,
        "fatigue": 0,
        "mental": 70,
        "shotcalling": 68,
        "laning": 78,
        "teamfight": 72,
        "mechanics": 74,
        "championPool": [
          "Rumble",
          "Jayce",
          "Kennen"
        ],
        "traits": []
      },
      {
        "id": "fxw_jungle",
        "name": "Peach",
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 76,
        "potential": 81,
        "form": 66,
        "fatigue": 0,
        "mental": 72,
        "shotcalling": 77,
        "laning": 75,
        "teamfight": 78,
        "mechanics": 72,
        "championPool": [
          "Graves",
          "Ivern",
          "Nidalee"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "fxw_mid",
        "name": "cody",
        "role": "MID",
        "nationality": "BR",
        "level": 77,
        "potential": 83,
        "form": 67,
        "fatigue": 0,
        "mental": 78,
        "shotcalling": 70,
        "laning": 83,
        "teamfight": 77,
        "mechanics": 77,
        "championPool": [
          "Hwei",
          "Zoe",
          "Orianna"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "fxw_adc",
        "name": "BAO",
        "role": "ADC",
        "nationality": "KR",
        "level": 68,
        "potential": 67,
        "form": 63,
        "fatigue": 0,
        "mental": 61,
        "shotcalling": 58,
        "laning": 65,
        "teamfight": 71,
        "mechanics": 69,
        "championPool": [
          "Varus",
          "Caitlyn",
          "Ezreal"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "fxw_support",
        "name": "Momochi",
        "role": "SUPPORT",
        "nationality": "BR",
        "level": 75,
        "potential": 81,
        "form": 64,
        "fatigue": 0,
        "mental": 73,
        "shotcalling": 73,
        "laning": 73,
        "teamfight": 73,
        "mechanics": 74,
        "championPool": [
          "Milio",
          "Nami",
          "Karma"
        ],
        "traits": [
          "consistant"
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
          "Hwei",
          "Zoe"
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
        "role": "TOP",
        "nationality": "BR",
        "level": 80,
        "potential": 79,
        "form": 79,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 76,
        "laning": 83,
        "teamfight": 79,
        "mechanics": 81,
        "championPool": [
          "Gnar",
          "K'Sante",
          "Rumble"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "fur_jungle",
        "name": "Tatu",
        "role": "JUNGLE",
        "nationality": "BR",
        "level": 89,
        "potential": 91,
        "form": 73,
        "fatigue": 0,
        "mental": 85,
        "shotcalling": 94,
        "laning": 87,
        "teamfight": 91,
        "mechanics": 89,
        "championPool": [
          "Jarvan IV",
          "Vi",
          "Nocturne"
        ],
        "traits": [
          "igl",
          "mechanical"
        ]
      },
      {
        "id": "fur_mid",
        "name": "Tutsz",
        "role": "MID",
        "nationality": "BR",
        "level": 80,
        "potential": 78,
        "form": 81,
        "fatigue": 0,
        "mental": 81,
        "shotcalling": 75,
        "laning": 85,
        "teamfight": 82,
        "mechanics": 85,
        "championPool": [
          "Orianna",
          "Azir",
          "Ryze"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "fur_adc",
        "name": "Ayu",
        "role": "ADC",
        "nationality": "BR",
        "level": 84,
        "potential": 85,
        "form": 75,
        "fatigue": 0,
        "mental": 77,
        "shotcalling": 76,
        "laning": 84,
        "teamfight": 86,
        "mechanics": 86,
        "championPool": [
          "Ezreal",
          "Varus",
          "Ashe"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "fur_support",
        "name": "JoJo",
        "role": "SUPPORT",
        "nationality": "BR",
        "level": 87,
        "potential": 87,
        "form": 70,
        "fatigue": 0,
        "mental": 83,
        "shotcalling": 90,
        "laning": 84,
        "teamfight": 87,
        "mechanics": 90,
        "championPool": [
          "Rakan",
          "Bard",
          "Nautilus"
        ],
        "traits": [
          "igl",
          "mechanical"
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
        "role": "TOP",
        "nationality": "BR",
        "level": 65,
        "potential": 63,
        "form": 46,
        "fatigue": 0,
        "mental": 65,
        "shotcalling": 58,
        "laning": 63,
        "teamfight": 61,
        "mechanics": 70,
        "championPool": [
          "Jax",
          "Fiora",
          "Camille"
        ],
        "traits": []
      },
      {
        "id": "lev_jungle",
        "name": "Booki",
        "role": "JUNGLE",
        "nationality": "BR",
        "level": 64,
        "potential": 64,
        "form": 49,
        "fatigue": 0,
        "mental": 59,
        "shotcalling": 67,
        "laning": 64,
        "teamfight": 70,
        "mechanics": 62,
        "championPool": [
          "Lee Sin",
          "Nocturne",
          "Viego"
        ],
        "traits": []
      },
      {
        "id": "lev_mid",
        "name": "Enga",
        "role": "MID",
        "nationality": "BR",
        "level": 58,
        "potential": 58,
        "form": 51,
        "fatigue": 0,
        "mental": 52,
        "shotcalling": 58,
        "laning": 65,
        "teamfight": 56,
        "mechanics": 63,
        "championPool": [
          "Ryze",
          "Akali",
          "Twisted Fate"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ]
      },
      {
        "id": "lev_adc",
        "name": "Snaker",
        "role": "ADC",
        "nationality": "BR",
        "level": 61,
        "potential": 60,
        "form": 45,
        "fatigue": 0,
        "mental": 63,
        "shotcalling": 58,
        "laning": 66,
        "teamfight": 62,
        "mechanics": 62,
        "championPool": [
          "Ezreal",
          "Kai'Sa",
          "Vayne"
        ],
        "traits": []
      },
      {
        "id": "lev_support",
        "name": "TopLop",
        "role": "SUPPORT",
        "nationality": "BR",
        "level": 63,
        "potential": 64,
        "form": 54,
        "fatigue": 0,
        "mental": 62,
        "shotcalling": 69,
        "laning": 66,
        "teamfight": 68,
        "mechanics": 60,
        "championPool": [
          "Bard",
          "Tahm Kench",
          "Rakan"
        ],
        "traits": [
          "consistant"
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
          "Nocturne",
          "Viego"
        ],
        "MID": [
          "Twisted Fate",
          "Ryze"
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
        "role": "TOP",
        "nationality": "BR",
        "level": 69,
        "potential": 75,
        "form": 59,
        "fatigue": 0,
        "mental": 61,
        "shotcalling": 63,
        "laning": 72,
        "teamfight": 70,
        "mechanics": 74,
        "championPool": [
          "Renekton",
          "Kennen",
          "Jayce"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "loud_jungle",
        "name": "YoungJae",
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 72,
        "potential": 75,
        "form": 68,
        "fatigue": 0,
        "mental": 69,
        "shotcalling": 73,
        "laning": 67,
        "teamfight": 72,
        "mechanics": 74,
        "championPool": [
          "Elise",
          "Vi",
          "Lee Sin"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "loud_mid",
        "name": "Envy",
        "role": "MID",
        "nationality": "BR",
        "level": 69,
        "potential": 72,
        "form": 65,
        "fatigue": 0,
        "mental": 70,
        "shotcalling": 71,
        "laning": 66,
        "teamfight": 75,
        "mechanics": 75,
        "championPool": [
          "Ahri",
          "Taliyah",
          "LeBlanc"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "loud_adc",
        "name": "Bull",
        "role": "ADC",
        "nationality": "KR",
        "level": 67,
        "potential": 69,
        "form": 67,
        "fatigue": 0,
        "mental": 62,
        "shotcalling": 60,
        "laning": 72,
        "teamfight": 69,
        "mechanics": 67,
        "championPool": [
          "Varus",
          "Caitlyn",
          "Kai'Sa"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "loud_support",
        "name": "RedBert",
        "role": "SUPPORT",
        "nationality": "BR",
        "level": 69,
        "potential": 69,
        "form": 60,
        "fatigue": 0,
        "mental": 66,
        "shotcalling": 65,
        "laning": 71,
        "teamfight": 67,
        "mechanics": 64,
        "championPool": [
          "Thresh",
          "Pyke",
          "Nautilus"
        ],
        "traits": [
          "consistant"
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
          "LeBlanc",
          "Ahri"
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
        "role": "TOP",
        "nationality": "KR",
        "level": 75,
        "potential": 81,
        "form": 72,
        "fatigue": 0,
        "mental": 75,
        "shotcalling": 65,
        "laning": 80,
        "teamfight": 73,
        "mechanics": 78,
        "championPool": [
          "K'Sante",
          "Rumble",
          "Gnar"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "los_jungle",
        "name": "Drakehero",
        "role": "JUNGLE",
        "nationality": "BR",
        "level": 82,
        "potential": 82,
        "form": 62,
        "fatigue": 0,
        "mental": 79,
        "shotcalling": 79,
        "laning": 80,
        "teamfight": 82,
        "mechanics": 78,
        "championPool": [
          "Jarvan IV",
          "Vi",
          "Nocturne"
        ],
        "traits": []
      },
      {
        "id": "los_mid",
        "name": "Curse",
        "role": "MID",
        "nationality": "BR",
        "level": 78,
        "potential": 81,
        "form": 72,
        "fatigue": 0,
        "mental": 73,
        "shotcalling": 73,
        "laning": 80,
        "teamfight": 77,
        "mechanics": 77,
        "championPool": [
          "Azir",
          "Ryze",
          "Orianna"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "los_adc",
        "name": "Feisty",
        "role": "ADC",
        "nationality": "KR",
        "level": 78,
        "potential": 81,
        "form": 62,
        "fatigue": 0,
        "mental": 70,
        "shotcalling": 76,
        "laning": 84,
        "teamfight": 83,
        "mechanics": 77,
        "championPool": [
          "Varus",
          "Ashe",
          "Ezreal"
        ],
        "traits": []
      },
      {
        "id": "los_support",
        "name": "Duduhh",
        "role": "SUPPORT",
        "nationality": "BR",
        "level": 73,
        "potential": 79,
        "form": 62,
        "fatigue": 0,
        "mental": 70,
        "shotcalling": 79,
        "laning": 74,
        "teamfight": 76,
        "mechanics": 71,
        "championPool": [
          "Bard",
          "Nautilus",
          "Rakan"
        ],
        "traits": [
          "consistant"
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
        "role": "TOP",
        "nationality": "BR",
        "level": 78,
        "potential": 81,
        "form": 62,
        "fatigue": 0,
        "mental": 77,
        "shotcalling": 71,
        "laning": 82,
        "teamfight": 77,
        "mechanics": 80,
        "championPool": [
          "Sion",
          "K'Sante",
          "Renekton"
        ],
        "traits": []
      },
      {
        "id": "png_jungle",
        "name": "CarioK",
        "role": "JUNGLE",
        "nationality": "BR",
        "level": 64,
        "potential": 62,
        "form": 53,
        "fatigue": 0,
        "mental": 63,
        "shotcalling": 62,
        "laning": 59,
        "teamfight": 70,
        "mechanics": 62,
        "championPool": [
          "Jarvan IV",
          "Sejuani",
          "Maokai"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "png_mid",
        "name": "Keine",
        "role": "MID",
        "nationality": "KR",
        "level": 66,
        "potential": 71,
        "form": 50,
        "fatigue": 0,
        "mental": 58,
        "shotcalling": 68,
        "laning": 66,
        "teamfight": 73,
        "mechanics": 65,
        "championPool": [
          "Viktor",
          "Orianna",
          "Azir"
        ],
        "traits": []
      },
      {
        "id": "png_adc",
        "name": "Trigger",
        "role": "ADC",
        "nationality": "KR",
        "level": 71,
        "potential": 72,
        "form": 51,
        "fatigue": 0,
        "mental": 63,
        "shotcalling": 64,
        "laning": 76,
        "teamfight": 71,
        "mechanics": 73,
        "championPool": [
          "Jinx",
          "Aphelios",
          "Caitlyn"
        ],
        "traits": []
      },
      {
        "id": "png_support",
        "name": "Kuri",
        "role": "SUPPORT",
        "nationality": "BR",
        "level": 69,
        "potential": 72,
        "form": 51,
        "fatigue": 0,
        "mental": 68,
        "shotcalling": 73,
        "laning": 67,
        "teamfight": 74,
        "mechanics": 70,
        "championPool": [
          "Milio",
          "Karma",
          "Lulu"
        ],
        "traits": []
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
          "Lulu",
          "Milio"
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
        "role": "TOP",
        "nationality": "BR",
        "level": 81,
        "potential": 81,
        "form": 82,
        "fatigue": 0,
        "mental": 80,
        "shotcalling": 79,
        "laning": 83,
        "teamfight": 78,
        "mechanics": 80,
        "championPool": [
          "Jayce",
          "Renekton",
          "Kennen"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "red_jungle",
        "name": "STEPZ",
        "role": "JUNGLE",
        "nationality": "BR",
        "level": 81,
        "potential": 87,
        "form": 68,
        "fatigue": 0,
        "mental": 73,
        "shotcalling": 82,
        "laning": 77,
        "teamfight": 86,
        "mechanics": 79,
        "championPool": [
          "Vi",
          "Lee Sin",
          "Elise"
        ],
        "traits": [
          "igl"
        ]
      },
      {
        "id": "red_mid",
        "name": "Kaze",
        "role": "MID",
        "nationality": "BR",
        "level": 87,
        "potential": 85,
        "form": 64,
        "fatigue": 0,
        "mental": 80,
        "shotcalling": 88,
        "laning": 92,
        "teamfight": 91,
        "mechanics": 86,
        "championPool": [
          "Taliyah",
          "LeBlanc",
          "Ahri"
        ],
        "traits": []
      },
      {
        "id": "red_adc",
        "name": "Rabelo",
        "role": "ADC",
        "nationality": "BR",
        "level": 87,
        "potential": 91,
        "form": 68,
        "fatigue": 0,
        "mental": 79,
        "shotcalling": 78,
        "laning": 84,
        "teamfight": 93,
        "mechanics": 89,
        "championPool": [
          "Varus",
          "Caitlyn",
          "Kai'Sa"
        ],
        "traits": [
          "mechanical"
        ]
      },
      {
        "id": "red_support",
        "name": "frosty",
        "role": "SUPPORT",
        "nationality": "BR",
        "level": 87,
        "potential": 88,
        "form": 73,
        "fatigue": 0,
        "mental": 85,
        "shotcalling": 84,
        "laning": 91,
        "teamfight": 89,
        "mechanics": 84,
        "championPool": [
          "Nautilus",
          "Thresh",
          "Pyke"
        ],
        "traits": [
          "igl"
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
          "LeBlanc",
          "Ahri"
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
        "role": "TOP",
        "nationality": "BR",
        "level": 81,
        "potential": 85,
        "form": 66,
        "fatigue": 0,
        "mental": 82,
        "shotcalling": 76,
        "laning": 85,
        "teamfight": 86,
        "mechanics": 83,
        "championPool": [
          "K'Sante",
          "Gnar",
          "Renekton"
        ],
        "traits": []
      },
      {
        "id": "key_jungle",
        "name": "Disamis",
        "role": "JUNGLE",
        "nationality": "BR",
        "level": 77,
        "potential": 80,
        "form": 60,
        "fatigue": 0,
        "mental": 73,
        "shotcalling": 73,
        "laning": 73,
        "teamfight": 79,
        "mechanics": 81,
        "championPool": [
          "Nocturne",
          "Jarvan IV",
          "Vi"
        ],
        "traits": []
      },
      {
        "id": "key_mid",
        "name": "Mireu",
        "role": "MID",
        "nationality": "KR",
        "level": 79,
        "potential": 78,
        "form": 59,
        "fatigue": 0,
        "mental": 71,
        "shotcalling": 79,
        "laning": 85,
        "teamfight": 80,
        "mechanics": 84,
        "championPool": [
          "Azir",
          "Ryze",
          "Orianna"
        ],
        "traits": []
      },
      {
        "id": "key_adc",
        "name": "ceo",
        "role": "ADC",
        "nationality": "BR",
        "level": 73,
        "potential": 74,
        "form": 62,
        "fatigue": 0,
        "mental": 69,
        "shotcalling": 70,
        "laning": 72,
        "teamfight": 72,
        "mechanics": 78,
        "championPool": [
          "Varus",
          "Ashe",
          "Ezreal"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "key_support",
        "name": "Kaiwing",
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 74,
        "potential": 80,
        "form": 70,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 77,
        "laning": 68,
        "teamfight": 70,
        "mechanics": 73,
        "championPool": [
          "Rakan",
          "Nautilus",
          "Bard"
        ],
        "traits": [
          "consistant"
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
        "role": "TOP",
        "nationality": "APAC",
        "level": 85,
        "potential": 88,
        "form": 71,
        "fatigue": 0,
        "mental": 78,
        "shotcalling": 84,
        "laning": 85,
        "teamfight": 85,
        "mechanics": 86,
        "championPool": [
          "K'Sante",
          "Rumble",
          "Gnar"
        ],
        "traits": []
      },
      {
        "id": "cfo_jungle",
        "name": "Shad0w",
        "role": "JUNGLE",
        "nationality": "CN",
        "level": 84,
        "potential": 86,
        "form": 73,
        "fatigue": 0,
        "mental": 77,
        "shotcalling": 86,
        "laning": 81,
        "teamfight": 82,
        "mechanics": 85,
        "championPool": [
          "Nocturne",
          "Jarvan IV",
          "Vi"
        ],
        "traits": [
          "consistant",
          "igl"
        ]
      },
      {
        "id": "cfo_mid",
        "name": "Pungyeon",
        "role": "MID",
        "nationality": "KR",
        "level": 85,
        "potential": 88,
        "form": 64,
        "fatigue": 0,
        "mental": 78,
        "shotcalling": 83,
        "laning": 83,
        "teamfight": 92,
        "mechanics": 85,
        "championPool": [
          "Ryze",
          "Orianna",
          "Azir"
        ],
        "traits": []
      },
      {
        "id": "cfo_adc",
        "name": "Doggo",
        "role": "ADC",
        "nationality": "APAC",
        "level": 81,
        "potential": 81,
        "form": 73,
        "fatigue": 0,
        "mental": 82,
        "shotcalling": 79,
        "laning": 81,
        "teamfight": 81,
        "mechanics": 85,
        "championPool": [
          "Varus",
          "Kai'Sa",
          "Ezreal"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "cfo_support",
        "name": "Kino",
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 81,
        "potential": 79,
        "form": 82,
        "fatigue": 0,
        "mental": 83,
        "shotcalling": 85,
        "laning": 80,
        "teamfight": 87,
        "mechanics": 81,
        "championPool": [
          "Bard",
          "Nautilus",
          "Rakan"
        ],
        "traits": [
          "consistant",
          "igl"
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
        "role": "TOP",
        "nationality": "APAC",
        "level": 61,
        "potential": 62,
        "form": 55,
        "fatigue": 0,
        "mental": 53,
        "shotcalling": 57,
        "laning": 68,
        "teamfight": 60,
        "mechanics": 65,
        "championPool": [
          "Rumble",
          "Jayce",
          "Kennen"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ]
      },
      {
        "id": "dcg_jungle",
        "name": "Pop9",
        "role": "JUNGLE",
        "nationality": "APAC",
        "level": 66,
        "potential": 68,
        "form": 64,
        "fatigue": 0,
        "mental": 65,
        "shotcalling": 65,
        "laning": 66,
        "teamfight": 63,
        "mechanics": 69,
        "championPool": [
          "Graves",
          "Ivern",
          "Nidalee"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "dcg_mid",
        "name": "HongSuo",
        "role": "MID",
        "nationality": "APAC",
        "level": 68,
        "potential": 73,
        "form": 52,
        "fatigue": 0,
        "mental": 60,
        "shotcalling": 62,
        "laning": 66,
        "teamfight": 70,
        "mechanics": 74,
        "championPool": [
          "Hwei",
          "Zoe",
          "Orianna"
        ],
        "traits": []
      },
      {
        "id": "dcg_adc",
        "name": "XiaoXiang",
        "role": "ADC",
        "nationality": "APAC",
        "level": 69,
        "potential": 73,
        "form": 62,
        "fatigue": 0,
        "mental": 71,
        "shotcalling": 65,
        "laning": 67,
        "teamfight": 69,
        "mechanics": 73,
        "championPool": [
          "Ezreal",
          "Varus",
          "Caitlyn"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "dcg_support",
        "name": "ShiauC",
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 68,
        "potential": 69,
        "form": 56,
        "fatigue": 0,
        "mental": 66,
        "shotcalling": 65,
        "laning": 71,
        "teamfight": 70,
        "mechanics": 71,
        "championPool": [
          "Nami",
          "Karma",
          "Milio"
        ],
        "traits": [
          "consistant"
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
          "Hwei",
          "Zoe"
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
        "role": "TOP",
        "nationality": "APAC",
        "level": 74,
        "potential": 79,
        "form": 57,
        "fatigue": 0,
        "mental": 73,
        "shotcalling": 67,
        "laning": 79,
        "teamfight": 75,
        "mechanics": 76,
        "championPool": [
          "Sion",
          "Gnar",
          "Ornn"
        ],
        "traits": []
      },
      {
        "id": "dfm_jungle",
        "name": "Citrus",
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 72,
        "potential": 77,
        "form": 58,
        "fatigue": 0,
        "mental": 73,
        "shotcalling": 75,
        "laning": 65,
        "teamfight": 76,
        "mechanics": 70,
        "championPool": [
          "Jarvan IV",
          "Sejuani",
          "Maokai"
        ],
        "traits": []
      },
      {
        "id": "dfm_mid",
        "name": "Fisher",
        "role": "MID",
        "nationality": "KR",
        "level": 76,
        "potential": 79,
        "form": 71,
        "fatigue": 0,
        "mental": 72,
        "shotcalling": 72,
        "laning": 73,
        "teamfight": 76,
        "mechanics": 80,
        "championPool": [
          "Viktor",
          "Orianna",
          "Azir"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "dfm_adc",
        "name": "Kakkun",
        "role": "ADC",
        "nationality": "APAC",
        "level": 68,
        "potential": 71,
        "form": 69,
        "fatigue": 0,
        "mental": 68,
        "shotcalling": 61,
        "laning": 64,
        "teamfight": 77,
        "mechanics": 69,
        "championPool": [
          "Aphelios",
          "Caitlyn",
          "Jinx"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "dfm_support",
        "name": "Woody",
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 77,
        "potential": 82,
        "form": 69,
        "fatigue": 0,
        "mental": 75,
        "shotcalling": 79,
        "laning": 75,
        "teamfight": 83,
        "mechanics": 73,
        "championPool": [
          "Karma",
          "Lulu",
          "Milio"
        ],
        "traits": [
          "consistant"
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
        "role": "TOP",
        "nationality": "APAC",
        "level": 80,
        "potential": 80,
        "form": 63,
        "fatigue": 0,
        "mental": 80,
        "shotcalling": 70,
        "laning": 85,
        "teamfight": 75,
        "mechanics": 85,
        "championPool": [
          "Gnar",
          "K'Sante",
          "Rumble"
        ],
        "traits": []
      },
      {
        "id": "fsh_jungle",
        "name": "Van1",
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 78,
        "potential": 80,
        "form": 76,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 84,
        "laning": 71,
        "teamfight": 82,
        "mechanics": 82,
        "championPool": [
          "Vi",
          "Nocturne",
          "Jarvan IV"
        ],
        "traits": [
          "consistant",
          "igl"
        ]
      },
      {
        "id": "fsh_mid",
        "name": "Aria",
        "role": "MID",
        "nationality": "APAC",
        "level": 80,
        "potential": 86,
        "form": 74,
        "fatigue": 0,
        "mental": 75,
        "shotcalling": 77,
        "laning": 80,
        "teamfight": 78,
        "mechanics": 86,
        "championPool": [
          "Azir",
          "Ryze",
          "Orianna"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "fsh_adc",
        "name": "Marble",
        "role": "ADC",
        "nationality": "APAC",
        "level": 83,
        "potential": 89,
        "form": 65,
        "fatigue": 0,
        "mental": 82,
        "shotcalling": 80,
        "laning": 81,
        "teamfight": 89,
        "mechanics": 90,
        "championPool": [
          "Ezreal",
          "Varus",
          "Ashe"
        ],
        "traits": [
          "mechanical"
        ]
      },
      {
        "id": "fsh_support",
        "name": "Vsta",
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 78,
        "potential": 77,
        "form": 65,
        "fatigue": 0,
        "mental": 80,
        "shotcalling": 79,
        "laning": 72,
        "teamfight": 80,
        "mechanics": 81,
        "championPool": [
          "Nautilus",
          "Rakan",
          "Bard"
        ],
        "traits": []
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
        "role": "TOP",
        "nationality": "APAC",
        "level": 80,
        "potential": 82,
        "form": 66,
        "fatigue": 0,
        "mental": 80,
        "shotcalling": 80,
        "laning": 86,
        "teamfight": 85,
        "mechanics": 85,
        "championPool": [
          "Jayce",
          "Renekton",
          "Kennen"
        ],
        "traits": []
      },
      {
        "id": "gam_jungle",
        "name": "Draktharr",
        "role": "JUNGLE",
        "nationality": "APAC",
        "level": 88,
        "potential": 92,
        "form": 76,
        "fatigue": 0,
        "mental": 80,
        "shotcalling": 87,
        "laning": 88,
        "teamfight": 90,
        "mechanics": 89,
        "championPool": [
          "Vi",
          "Lee Sin",
          "Elise"
        ],
        "traits": [
          "consistant",
          "igl",
          "mechanical"
        ]
      },
      {
        "id": "gam_mid",
        "name": "Aress",
        "role": "MID",
        "nationality": "APAC",
        "level": 80,
        "potential": 78,
        "form": 72,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 79,
        "laning": 77,
        "teamfight": 78,
        "mechanics": 87,
        "championPool": [
          "Taliyah",
          "LeBlanc",
          "Ahri"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "gam_adc",
        "name": "Artemis",
        "role": "ADC",
        "nationality": "APAC",
        "level": 79,
        "potential": 78,
        "form": 82,
        "fatigue": 0,
        "mental": 73,
        "shotcalling": 73,
        "laning": 85,
        "teamfight": 88,
        "mechanics": 81,
        "championPool": [
          "Caitlyn",
          "Kai'Sa",
          "Varus"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "gam_support",
        "name": "Taki",
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 78,
        "potential": 83,
        "form": 75,
        "fatigue": 0,
        "mental": 75,
        "shotcalling": 84,
        "laning": 74,
        "teamfight": 82,
        "mechanics": 78,
        "championPool": [
          "Pyke",
          "Nautilus",
          "Thresh"
        ],
        "traits": [
          "consistant",
          "igl"
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
          "LeBlanc",
          "Ahri"
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
        "role": "TOP",
        "nationality": "APAC",
        "level": 63,
        "potential": 69,
        "form": 60,
        "fatigue": 0,
        "mental": 58,
        "shotcalling": 63,
        "laning": 64,
        "teamfight": 64,
        "mechanics": 65,
        "championPool": [
          "Camille",
          "Jax",
          "Fiora"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "gzg_jungle",
        "name": "Husha",
        "role": "JUNGLE",
        "nationality": "APAC",
        "level": 61,
        "potential": 64,
        "form": 53,
        "fatigue": 0,
        "mental": 56,
        "shotcalling": 60,
        "laning": 54,
        "teamfight": 57,
        "mechanics": 57,
        "championPool": [
          "Nocturne",
          "Viego",
          "Lee Sin"
        ],
        "traits": [
          "consistant",
          "tiltable"
        ]
      },
      {
        "id": "gzg_mid",
        "name": "JimieN",
        "role": "MID",
        "nationality": "APAC",
        "level": 63,
        "potential": 68,
        "form": 56,
        "fatigue": 0,
        "mental": 60,
        "shotcalling": 56,
        "laning": 70,
        "teamfight": 66,
        "mechanics": 66,
        "championPool": [
          "Ryze",
          "Akali",
          "Twisted Fate"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "gzg_adc",
        "name": "Shunn",
        "role": "ADC",
        "nationality": "APAC",
        "level": 71,
        "potential": 72,
        "form": 49,
        "fatigue": 0,
        "mental": 67,
        "shotcalling": 70,
        "laning": 67,
        "teamfight": 77,
        "mechanics": 71,
        "championPool": [
          "Kai'Sa",
          "Vayne",
          "Ezreal"
        ],
        "traits": []
      },
      {
        "id": "gzg_support",
        "name": "Orca",
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 68,
        "potential": 66,
        "form": 57,
        "fatigue": 0,
        "mental": 64,
        "shotcalling": 70,
        "laning": 62,
        "teamfight": 70,
        "mechanics": 67,
        "championPool": [
          "Rakan",
          "Bard",
          "Tahm Kench"
        ],
        "traits": [
          "consistant"
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
          "Nocturne",
          "Viego"
        ],
        "MID": [
          "Twisted Fate",
          "Ryze"
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
        "role": "TOP",
        "nationality": "APAC",
        "level": 77,
        "potential": 75,
        "form": 58,
        "fatigue": 0,
        "mental": 78,
        "shotcalling": 70,
        "laning": 84,
        "teamfight": 74,
        "mechanics": 76,
        "championPool": [
          "Jayce",
          "Renekton",
          "Kennen"
        ],
        "traits": []
      },
      {
        "id": "mvk_jungle",
        "name": "Kratos",
        "role": "JUNGLE",
        "nationality": "APAC",
        "level": 75,
        "potential": 75,
        "form": 55,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 79,
        "laning": 75,
        "teamfight": 72,
        "mechanics": 78,
        "championPool": [
          "Elise",
          "Vi",
          "Lee Sin"
        ],
        "traits": []
      },
      {
        "id": "mvk_mid",
        "name": "Gury",
        "role": "MID",
        "nationality": "APAC",
        "level": 75,
        "potential": 73,
        "form": 61,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 72,
        "laning": 72,
        "teamfight": 77,
        "mechanics": 82,
        "championPool": [
          "Ahri",
          "Taliyah",
          "LeBlanc"
        ],
        "traits": []
      },
      {
        "id": "mvk_adc",
        "name": "Chika",
        "role": "ADC",
        "nationality": "APAC",
        "level": 68,
        "potential": 72,
        "form": 71,
        "fatigue": 0,
        "mental": 67,
        "shotcalling": 66,
        "laning": 65,
        "teamfight": 69,
        "mechanics": 72,
        "championPool": [
          "Kai'Sa",
          "Varus",
          "Caitlyn"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "mvk_support",
        "name": "SiuLoong",
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 73,
        "potential": 72,
        "form": 62,
        "fatigue": 0,
        "mental": 75,
        "shotcalling": 79,
        "laning": 68,
        "teamfight": 70,
        "mechanics": 75,
        "championPool": [
          "Thresh",
          "Pyke",
          "Nautilus"
        ],
        "traits": [
          "consistant"
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
          "LeBlanc",
          "Ahri"
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
        "role": "TOP",
        "nationality": "APAC",
        "level": 83,
        "potential": 87,
        "form": 67,
        "fatigue": 0,
        "mental": 75,
        "shotcalling": 78,
        "laning": 86,
        "teamfight": 86,
        "mechanics": 85,
        "championPool": [
          "Gnar",
          "K'Sante",
          "Rumble"
        ],
        "traits": []
      },
      {
        "id": "tsw_jungle",
        "name": "Hizto",
        "role": "JUNGLE",
        "nationality": "APAC",
        "level": 73,
        "potential": 72,
        "form": 76,
        "fatigue": 0,
        "mental": 73,
        "shotcalling": 75,
        "laning": 66,
        "teamfight": 77,
        "mechanics": 76,
        "championPool": [
          "Nocturne",
          "Jarvan IV",
          "Vi"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "tsw_mid",
        "name": "Dire",
        "role": "MID",
        "nationality": "APAC",
        "level": 76,
        "potential": 76,
        "form": 75,
        "fatigue": 0,
        "mental": 78,
        "shotcalling": 76,
        "laning": 81,
        "teamfight": 82,
        "mechanics": 76,
        "championPool": [
          "Azir",
          "Ryze",
          "Orianna"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "tsw_adc",
        "name": "Eddie",
        "role": "ADC",
        "nationality": "APAC",
        "level": 77,
        "potential": 80,
        "form": 65,
        "fatigue": 0,
        "mental": 77,
        "shotcalling": 71,
        "laning": 76,
        "teamfight": 79,
        "mechanics": 80,
        "championPool": [
          "Varus",
          "Ashe",
          "Ezreal"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "tsw_support",
        "name": "Bie",
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 74,
        "potential": 75,
        "form": 68,
        "fatigue": 0,
        "mental": 75,
        "shotcalling": 74,
        "laning": 70,
        "teamfight": 75,
        "mechanics": 77,
        "championPool": [
          "Rakan",
          "Bard",
          "Nautilus"
        ],
        "traits": [
          "consistant"
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
        "role": "TOP",
        "nationality": "APAC",
        "level": 69,
        "potential": 71,
        "form": 70,
        "fatigue": 0,
        "mental": 62,
        "shotcalling": 59,
        "laning": 71,
        "teamfight": 70,
        "mechanics": 67,
        "championPool": [
          "Gnar",
          "K'Sante",
          "Rumble"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "arn_jungle",
        "name": "Kania",
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 74,
        "potential": 78,
        "form": 64,
        "fatigue": 0,
        "mental": 69,
        "shotcalling": 73,
        "laning": 69,
        "teamfight": 77,
        "mechanics": 70,
        "championPool": [
          "Jarvan IV",
          "Vi",
          "Nocturne"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "arn_mid",
        "name": "Daemi",
        "role": "MID",
        "nationality": "KR",
        "level": 77,
        "potential": 79,
        "form": 57,
        "fatigue": 0,
        "mental": 69,
        "shotcalling": 73,
        "laning": 83,
        "teamfight": 78,
        "mechanics": 81,
        "championPool": [
          "Orianna",
          "Azir",
          "Ryze"
        ],
        "traits": []
      },
      {
        "id": "arn_adc",
        "name": "dresscode",
        "role": "ADC",
        "nationality": "APAC",
        "level": 68,
        "potential": 69,
        "form": 68,
        "fatigue": 0,
        "mental": 70,
        "shotcalling": 62,
        "laning": 65,
        "teamfight": 70,
        "mechanics": 71,
        "championPool": [
          "Varus",
          "Ashe",
          "Ezreal"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "arn_support",
        "name": "Taiyaki",
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 74,
        "potential": 76,
        "form": 70,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 73,
        "laning": 78,
        "teamfight": 74,
        "mechanics": 76,
        "championPool": [
          "Nautilus",
          "Rakan",
          "Bard"
        ],
        "traits": [
          "consistant"
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
        "role": "TOP",
        "nationality": "KR",
        "level": 81,
        "potential": 79,
        "form": 77,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 73,
        "laning": 80,
        "teamfight": 86,
        "mechanics": 83,
        "championPool": [
          "Sion",
          "Gnar",
          "Ornn"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "dfma_jungle",
        "name": "Grit",
        "role": "JUNGLE",
        "nationality": "APAC",
        "level": 82,
        "potential": 86,
        "form": 76,
        "fatigue": 0,
        "mental": 79,
        "shotcalling": 82,
        "laning": 76,
        "teamfight": 79,
        "mechanics": 84,
        "championPool": [
          "Maokai",
          "Jarvan IV",
          "Sejuani"
        ],
        "traits": [
          "consistant",
          "igl"
        ]
      },
      {
        "id": "dfma_mid",
        "name": "Ravvy",
        "role": "MID",
        "nationality": "APAC",
        "level": 73,
        "potential": 71,
        "form": 73,
        "fatigue": 0,
        "mental": 72,
        "shotcalling": 68,
        "laning": 80,
        "teamfight": 79,
        "mechanics": 73,
        "championPool": [
          "Viktor",
          "Orianna",
          "Azir"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "dfma_adc",
        "name": "Damocles",
        "role": "ADC",
        "nationality": "KR",
        "level": 75,
        "potential": 77,
        "form": 61,
        "fatigue": 0,
        "mental": 69,
        "shotcalling": 70,
        "laning": 76,
        "teamfight": 80,
        "mechanics": 76,
        "championPool": [
          "Jinx",
          "Aphelios",
          "Caitlyn"
        ],
        "traits": []
      },
      {
        "id": "dfma_support",
        "name": "Kurahuto",
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 77,
        "potential": 82,
        "form": 62,
        "fatigue": 0,
        "mental": 69,
        "shotcalling": 74,
        "laning": 81,
        "teamfight": 74,
        "mechanics": 79,
        "championPool": [
          "Lulu",
          "Milio",
          "Karma"
        ],
        "traits": []
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
        "role": "TOP",
        "nationality": "APAC",
        "level": 83,
        "potential": 86,
        "form": 75,
        "fatigue": 0,
        "mental": 80,
        "shotcalling": 73,
        "laning": 85,
        "teamfight": 83,
        "mechanics": 88,
        "championPool": [
          "Rumble",
          "Gnar",
          "K'Sante"
        ],
        "traits": [
          "consistant",
          "mechanical"
        ]
      },
      {
        "id": "fnl_jungle",
        "name": "Ellim",
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 87,
        "potential": 92,
        "form": 81,
        "fatigue": 0,
        "mental": 83,
        "shotcalling": 92,
        "laning": 82,
        "teamfight": 88,
        "mechanics": 86,
        "championPool": [
          "Nocturne",
          "Jarvan IV",
          "Vi"
        ],
        "traits": [
          "consistant",
          "igl"
        ]
      },
      {
        "id": "fnl_mid",
        "name": "DICE",
        "role": "MID",
        "nationality": "KR",
        "level": 85,
        "potential": 89,
        "form": 77,
        "fatigue": 0,
        "mental": 78,
        "shotcalling": 87,
        "laning": 82,
        "teamfight": 88,
        "mechanics": 89,
        "championPool": [
          "Azir",
          "Ryze",
          "Orianna"
        ],
        "traits": [
          "consistant",
          "mechanical"
        ]
      },
      {
        "id": "fnl_adc",
        "name": "MayR",
        "role": "ADC",
        "nationality": "APAC",
        "level": 87,
        "potential": 89,
        "form": 64,
        "fatigue": 0,
        "mental": 86,
        "shotcalling": 81,
        "laning": 87,
        "teamfight": 94,
        "mechanics": 88,
        "championPool": [
          "Ezreal",
          "Varus",
          "Ashe"
        ],
        "traits": [
          "mechanical"
        ]
      },
      {
        "id": "fnl_support",
        "name": "Bruce",
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 85,
        "potential": 84,
        "form": 70,
        "fatigue": 0,
        "mental": 81,
        "shotcalling": 90,
        "laning": 80,
        "teamfight": 87,
        "mechanics": 85,
        "championPool": [
          "Bard",
          "Nautilus",
          "Rakan"
        ],
        "traits": [
          "igl"
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
        "role": "TOP",
        "nationality": "APAC",
        "level": 64,
        "potential": 65,
        "form": 65,
        "fatigue": 0,
        "mental": 63,
        "shotcalling": 58,
        "laning": 62,
        "teamfight": 65,
        "mechanics": 69,
        "championPool": [
          "Kennen",
          "Jayce",
          "Renekton"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "lgg_jungle",
        "name": "HyunSim",
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 68,
        "potential": 72,
        "form": 51,
        "fatigue": 0,
        "mental": 65,
        "shotcalling": 70,
        "laning": 69,
        "teamfight": 68,
        "mechanics": 71,
        "championPool": [
          "Lee Sin",
          "Elise",
          "Vi"
        ],
        "traits": []
      },
      {
        "id": "lgg_mid",
        "name": "p1ng",
        "role": "MID",
        "nationality": "APAC",
        "level": 69,
        "potential": 73,
        "form": 58,
        "fatigue": 0,
        "mental": 61,
        "shotcalling": 62,
        "laning": 70,
        "teamfight": 74,
        "mechanics": 71,
        "championPool": [
          "Taliyah",
          "LeBlanc",
          "Ahri"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "lgg_adc",
        "name": "Karaage",
        "role": "ADC",
        "nationality": "APAC",
        "level": 66,
        "potential": 72,
        "form": 55,
        "fatigue": 0,
        "mental": 64,
        "shotcalling": 60,
        "laning": 63,
        "teamfight": 70,
        "mechanics": 72,
        "championPool": [
          "Caitlyn",
          "Kai'Sa",
          "Varus"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "lgg_support",
        "name": "rre",
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 62,
        "potential": 64,
        "form": 58,
        "fatigue": 0,
        "mental": 54,
        "shotcalling": 66,
        "laning": 61,
        "teamfight": 64,
        "mechanics": 61,
        "championPool": [
          "Thresh",
          "Pyke",
          "Nautilus"
        ],
        "traits": [
          "consistant"
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
          "LeBlanc",
          "Ahri"
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
        "role": "TOP",
        "nationality": "KR",
        "level": 77,
        "potential": 78,
        "form": 74,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 68,
        "laning": 75,
        "teamfight": 80,
        "mechanics": 77,
        "championPool": [
          "Jayce",
          "Kennen",
          "Rumble"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "nm_jungle",
        "name": "HRK",
        "role": "JUNGLE",
        "nationality": "APAC",
        "level": 77,
        "potential": 83,
        "form": 60,
        "fatigue": 0,
        "mental": 78,
        "shotcalling": 83,
        "laning": 70,
        "teamfight": 73,
        "mechanics": 78,
        "championPool": [
          "Graves",
          "Ivern",
          "Nidalee"
        ],
        "traits": [
          "igl"
        ]
      },
      {
        "id": "nm_mid",
        "name": "Zlatan",
        "role": "MID",
        "nationality": "APAC",
        "level": 80,
        "potential": 85,
        "form": 67,
        "fatigue": 0,
        "mental": 82,
        "shotcalling": 77,
        "laning": 77,
        "teamfight": 86,
        "mechanics": 80,
        "championPool": [
          "Zoe",
          "Orianna",
          "Hwei"
        ],
        "traits": []
      },
      {
        "id": "nm_adc",
        "name": "Eria",
        "role": "ADC",
        "nationality": "APAC",
        "level": 81,
        "potential": 87,
        "form": 64,
        "fatigue": 0,
        "mental": 82,
        "shotcalling": 76,
        "laning": 86,
        "teamfight": 88,
        "mechanics": 87,
        "championPool": [
          "Caitlyn",
          "Ezreal",
          "Varus"
        ],
        "traits": []
      },
      {
        "id": "nm_support",
        "name": "Alps",
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 75,
        "potential": 73,
        "form": 61,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 78,
        "laning": 76,
        "teamfight": 75,
        "mechanics": 74,
        "championPool": [
          "Milio",
          "Nami",
          "Karma"
        ],
        "traits": []
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
          "Hwei",
          "Zoe"
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
        "role": "TOP",
        "nationality": "KR",
        "level": 66,
        "potential": 68,
        "form": 65,
        "fatigue": 0,
        "mental": 58,
        "shotcalling": 66,
        "laning": 70,
        "teamfight": 70,
        "mechanics": 70,
        "championPool": [
          "Jax",
          "Fiora",
          "Camille"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "ryn_jungle",
        "name": "Kangkuk",
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 65,
        "potential": 66,
        "form": 51,
        "fatigue": 0,
        "mental": 64,
        "shotcalling": 71,
        "laning": 57,
        "teamfight": 66,
        "mechanics": 63,
        "championPool": [
          "Viego",
          "Lee Sin",
          "Nocturne"
        ],
        "traits": []
      },
      {
        "id": "ryn_mid",
        "name": "Razer",
        "role": "MID",
        "nationality": "APAC",
        "level": 62,
        "potential": 65,
        "form": 65,
        "fatigue": 0,
        "mental": 55,
        "shotcalling": 56,
        "laning": 65,
        "teamfight": 65,
        "mechanics": 61,
        "championPool": [
          "Twisted Fate",
          "Ryze",
          "Akali"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "ryn_adc",
        "name": "Fluid",
        "role": "ADC",
        "nationality": "APAC",
        "level": 64,
        "potential": 68,
        "form": 63,
        "fatigue": 0,
        "mental": 61,
        "shotcalling": 54,
        "laning": 60,
        "teamfight": 70,
        "mechanics": 68,
        "championPool": [
          "Kai'Sa",
          "Vayne",
          "Ezreal"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "ryn_support",
        "name": "chico",
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 70,
        "potential": 73,
        "form": 52,
        "fatigue": 0,
        "mental": 66,
        "shotcalling": 76,
        "laning": 70,
        "teamfight": 71,
        "mechanics": 65,
        "championPool": [
          "Tahm Kench",
          "Rakan",
          "Bard"
        ],
        "traits": []
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
          "Nocturne",
          "Viego"
        ],
        "MID": [
          "Twisted Fate",
          "Ryze"
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
        "role": "TOP",
        "nationality": "APAC",
        "level": 73,
        "potential": 79,
        "form": 77,
        "fatigue": 0,
        "mental": 72,
        "shotcalling": 67,
        "laning": 80,
        "teamfight": 70,
        "mechanics": 78,
        "championPool": [
          "Gnar",
          "K'Sante",
          "Rumble"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "rsg_jungle",
        "name": "ankochan",
        "role": "JUNGLE",
        "nationality": "APAC",
        "level": 73,
        "potential": 79,
        "form": 74,
        "fatigue": 0,
        "mental": 72,
        "shotcalling": 77,
        "laning": 64,
        "teamfight": 74,
        "mechanics": 74,
        "championPool": [
          "Jarvan IV",
          "Vi",
          "Nocturne"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "rsg_mid",
        "name": "Ramune",
        "role": "MID",
        "nationality": "APAC",
        "level": 75,
        "potential": 76,
        "form": 67,
        "fatigue": 0,
        "mental": 76,
        "shotcalling": 77,
        "laning": 74,
        "teamfight": 82,
        "mechanics": 82,
        "championPool": [
          "Orianna",
          "Azir",
          "Ryze"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "rsg_adc",
        "name": "Archer",
        "role": "ADC",
        "nationality": "KR",
        "level": 75,
        "potential": 81,
        "form": 64,
        "fatigue": 0,
        "mental": 70,
        "shotcalling": 73,
        "laning": 78,
        "teamfight": 82,
        "mechanics": 79,
        "championPool": [
          "Varus",
          "Ashe",
          "Ezreal"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "rsg_support",
        "name": "Patch",
        "role": "SUPPORT",
        "nationality": "KR",
        "level": 73,
        "potential": 79,
        "form": 59,
        "fatigue": 0,
        "mental": 75,
        "shotcalling": 70,
        "laning": 68,
        "teamfight": 70,
        "mechanics": 74,
        "championPool": [
          "Rakan",
          "Bard",
          "Nautilus"
        ],
        "traits": []
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
        "role": "TOP",
        "nationality": "APAC",
        "level": 67,
        "potential": 72,
        "form": 68,
        "fatigue": 0,
        "mental": 59,
        "shotcalling": 63,
        "laning": 70,
        "teamfight": 62,
        "mechanics": 71,
        "championPool": [
          "Kennen",
          "Jayce",
          "Renekton"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "uwk_jungle",
        "name": "Elative",
        "role": "JUNGLE",
        "nationality": "KR",
        "level": 77,
        "potential": 82,
        "form": 56,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 82,
        "laning": 68,
        "teamfight": 82,
        "mechanics": 80,
        "championPool": [
          "Lee Sin",
          "Elise",
          "Vi"
        ],
        "traits": [
          "igl"
        ]
      },
      {
        "id": "uwk_mid",
        "name": "Jericho",
        "role": "MID",
        "nationality": "APAC",
        "level": 71,
        "potential": 73,
        "form": 60,
        "fatigue": 0,
        "mental": 66,
        "shotcalling": 63,
        "laning": 73,
        "teamfight": 69,
        "mechanics": 77,
        "championPool": [
          "LeBlanc",
          "Ahri",
          "Taliyah"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "uwk_adc",
        "name": "Gimi",
        "role": "ADC",
        "nationality": "KR",
        "level": 76,
        "potential": 75,
        "form": 65,
        "fatigue": 0,
        "mental": 77,
        "shotcalling": 75,
        "laning": 81,
        "teamfight": 75,
        "mechanics": 78,
        "championPool": [
          "Caitlyn",
          "Kai'Sa",
          "Varus"
        ],
        "traits": [
          "consistant"
        ]
      },
      {
        "id": "uwk_support",
        "name": "f4ke",
        "role": "SUPPORT",
        "nationality": "APAC",
        "level": 75,
        "potential": 76,
        "form": 67,
        "fatigue": 0,
        "mental": 74,
        "shotcalling": 75,
        "laning": 74,
        "teamfight": 72,
        "mechanics": 74,
        "championPool": [
          "Nautilus",
          "Thresh",
          "Pyke"
        ],
        "traits": [
          "consistant"
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
          "LeBlanc",
          "Ahri"
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
  }
];
