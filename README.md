# LOL Esport Manager

> **BETA** — Jeu de gestion d'équipe esport League of Legends

Prenez en main une équipe professionnelle de League of Legends, gérez votre roster, préparez vos drafts, signez des joueurs sur le marché des transferts et menez votre équipe vers les Worlds.

---

## Fonctionnalités

### Roster
Visualisez et gérez vos 5 joueurs (TOP, JUNGLE, MID, ADC, SUPPORT). Chaque joueur possède un niveau, une forme, une fatigue, un mental, des stats individuelles (Laning, Teamfight, Mécaniques, Shotcalling) et un champion pool.

### Entraînement & Scrims
Organisez des sessions d'entraînement pour améliorer les stats de vos joueurs. Gérez la fatigue avec des options de repos.

### Calendrier
Suivez la saison et planifiez vos matchs selon le calendrier de votre ligue régionale.

### Draft
Préparez vos compositions d'équipe avec un système de draft complet (bans, picks, ordre de sélection).

### Counters
Base de données de matchups par champion et par rôle, avec niveau de confiance (High / Medium / Low).

### Match
Simulation de match en temps réel avec objectifs (Dragons, Baron, Elder), barre de progression et journal d'événements. Vitesse de simulation ajustable (x1 à x5).

### Scouting
Analysez les équipes adverses avant un match pour identifier leurs forces et faiblesses.

### Marché des transferts
Recrutez des joueurs libres ou des joueurs issus des équipes IA. Comparez les stats, gérez votre budget et libérez un joueur existant lors de chaque signature.

### Progression
Historique complet des matchs, évolution des joueurs split après split, statistiques globales et gestion de la sauvegarde (export / import JSON).

---

## Régions disponibles

| Code | Région | Style de jeu |
|------|--------|--------------|
| LEC | Europe | Draft créative, polyvalence |
| LCK | Corée | Rigueur, macro, discipline |
| LPL | Chine | Agressivité, teamfights précoces |
| LTA | Amériques | Individualisme, carry early |
| LCP | Asie-Pacifique | Picks surprises, styles émergents |
| CBLOL | Brésil | Intensité, soutien du public |
| LJL | Japon | Précision, compositions techniques |

---

## Technologies

- HTML5 / CSS3 / JavaScript vanilla — aucune dépendance externe
- Sauvegarde locale via `localStorage` (aucune donnée transmise à des tiers)
- Compatible desktop et mobile (responsive)

---

## Démarrage rapide

```bash
# Cloner le repo
git clone https://github.com/trainingdynamicformation-lang/lol-esport-manager.git

# Ouvrir dans le navigateur
open index.html
```

Ou directement en ligne : [lol-esport-manager.com](https://lol-esport-manager.com/)

---

## Sauvegarde

La progression est sauvegardée automatiquement dans le `localStorage` de votre navigateur. Vous pouvez exporter votre sauvegarde en JSON depuis la vue **Progression** pour la conserver ou la transférer.

---

## Mentions légales

© 2026 Thierry Demorest — Tous droits réservés. Concept et design protégés par la propriété intellectuelle.

Les données de progression sont stockées localement dans votre navigateur et ne sont jamais transmises à des tiers.

*LOL Esport Manager n'est pas affilié à Riot Games ou League of Legends.*
