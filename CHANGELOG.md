# Changelog

Toutes les modifications notables du projet sont documentées ici.
Format basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).

---

## [1.1.0] — 2026-06-16

### Ajouté
- **Marché des transferts** — recrutement de joueurs libres et issus des équipes IA, comparaison de stats, gestion budget, modal de confirmation
- **PWA** — installation sur iOS (Safari) et Android (Chrome), mode hors-ligne via Service Worker, icônes natives
- **Popups de début de compétition** — explication du format au lancement de chaque split et des tournois internationaux (MSI/Worlds)
- **Footer légal** — badge BETA, copyright © 2026 Thierry Demorest, mention stockage localStorage

### Modifié
- **Formats de match** — saison régulière en BO3 (était BO1), tous les matchs playoffs en BO5
- **Tirage groupes MSI/Worlds** — deux équipes de la même région ne peuvent plus être dans le même groupe
- **Navigation** — sidebar fixe sur desktop, barre horizontale sur mobile

### Corrigé
- Joueur signé depuis le marché : `level`, `form`, `nationality` manquants → affichage `undefined` dans le roster
- Tous les labels et appels BO1 remplacés par BO3 dans le flux de saison et les tournois internationaux

---

## [0.1.0-beta] — 2026-06-16

### Ajouté
- **Roster** — affichage des 5 joueurs avec stats complètes, champion pool, traits et barre de fatigue
- **Entraînement & Scrims** — sessions d'entraînement avec amélioration de stats et gestion de la fatigue
- **Calendrier** — suivi de saison par ligue régionale
- **Draft** — système de draft complet avec bans, picks et ordre de sélection par équipe
- **Counters** — base de données de matchups champions avec filtres par rôle et niveau de confiance
- **Match** — simulation temps réel avec objectifs (Dragons, Baron, Elder, Void Grubs), journal d'événements et vitesses x1/x2/x3/x5
- **Scouting** — analyse des équipes adverses avant match
- **Marché des transferts** — recrutement de joueurs libres et issus des équipes IA, comparaison de stats, gestion budget
- **Progression** — historique des matchs, évolution des joueurs, export/import de sauvegarde JSON
- **7 régions jouables** — LEC, LCK, LPL, LTA, LCP, CBLOL, LJL avec styles de jeu distincts
- **Palette "Rift Night"** — design dark navy / royal blue / gold
- **Navigation sidebar** — menu latéral fixe sur desktop, barre horizontale sur mobile
- **Sauvegarde automatique** — progression persistée en localStorage
- **Barre de ressources** — Points coaching, Budget et Prestige accessibles en permanence dans le header
- **Système économique** — budget déduit à chaque signature, vérification avant confirmation
- **Footer légal** — badge BETA, copyright © 2026 Thierry Demorest, mention stockage localStorage
- **Responsive design** — breakpoints à 768px et 480px

### Corrigé
- Mapping `forme` → `form` et ajout de `level` lors de la signature d'un joueur (évitait des `undefined` dans le roster)
- Attribut `disabled` sur les boutons "Budget insuffisant" du marché des transferts
- Classes CSS manquantes (`comp-tag-checkbox`, `draft-bans__team`) identifiées et ajoutées
- `flex-wrap: nowrap` sur le header pour éviter le retour à la ligne de la barre de ressources

---

## À venir

- Système de split complet avec classement et montée/descente entre divisions
- Économie dynamique — gains selon les victoires, sponsors, prestige
- Fatigue cumulative entre les matchs avec impact sur les performances
- Contrats joueurs et agents libres en fin de saison
- Meta patches par split influençant les picks de draft
- Résumé post-match détaillé avec stats individuelles (KDA, objectifs)
