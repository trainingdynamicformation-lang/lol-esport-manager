# Changelog

Toutes les modifications notables du projet sont documentées ici.
Format basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).

---

## [1.2.7] — 2026-06-18

### Modifié
- **Classement des round robins (saison + groupes MSI/Worlds)** : ajout de la différence de nexus (nexus gagnés - nexus perdus) comme départage, intercalée entre le head-to-head et la différence d'or. Nouvel ordre : victoires → confrontation directe → diff. nexus → diff. or
- **Colonne Nexus au classement** : chaque ligne affiche désormais `V D Nexus(gagnés-perdus) Diff.or` (ex : `2 MKoi 3 2 6-3 +4325`)
- **Matchs IA en saison/groupes** : simulés en BO3 (comme les matchs du joueur) pour alimenter le compteur de nexus de façon cohérente

### Corrigé
- **Diff. or du classement** : la différence d'or enregistrée au classement correspond désormais à l'or réellement accumulé pendant les games de la série (cumul du point de vue du joueur), au lieu d'une valeur aléatoire dérivée du score. Échelle de l'or des matchs IA alignée sur celle des vraies games pour rester cohérente

---

## [1.2.6] — 2026-06-17

### Ajouté
- **Recherche de champion en draft** : un champ de saisie à droite des filtres de rôle (bans ET picks) — la liste se réduit en temps réel aux champions dont le nom contient le texte tapé

### Corrigé
- **Cohérence des côtés en simulation** : tout l'écran de match est désormais indexé sur le côté de carte. La couleur du nom d'équipe fait foi — si Karmine Corp est en bleu, c'est qu'elle est Blue Side, donc ses kills, son or, ses objectifs (dragons, grubs…) et ses structures s'affichent en bleu. Fini l'inversion bleu/rouge entre le bandeau et les compteurs
- **Compteur de drakes / objectifs** : les compteurs au-dessus de la carte correspondent exactement aux événements du journal (plus de 3 drakes annoncés mais 2 comptés)
- **Structures carte ↔ journal** : quand le journal annonce « détruit la Tour 3 (Top) », c'est bien cette structure-là qui s'éteint sur la carte (l'indexation par côté était inversée)

### Modifié
- **Condition de victoire unique — destruction du nexus** : une partie se gagne en détruisant le nexus adverse. Il faut au préalable détruire, dans une même lane, la T1, la T2, la T3 et l'inhibiteur adverses, plus les 2 tours du nexus. Le vainqueur affiché découle de l'état réel de la partie (nexus détruit), garde-fou de temps résolu à l'avantage structurel sinon

---

## [1.2.5] — 2026-06-17

### Ajouté
- **Différence d'or en simulation** : sous le compteur de kills, affichage dynamique de l'avance en or — valeur toujours positive, en bleu si l'équipe bleue est devant, en rouge sinon ; calculée à partir des kills (300g/kill), objectifs (dragons 250g, baron 300g, herald 150g, etc.) et structures (tours T1/T2/T3, inhibiteurs)

---

## [1.2.4] — 2026-06-17

### Corrigé
- **Side/Pick indépendants** : Blue Side et First Pick sont désormais deux choix séparés — un joueur peut être Blue Side + Last Pick ou Red Side + First Pick ; attribution toujours respectée
- **Carte — toutes les structures** : tours T1/T2/T3, inhibiteurs (triangles), tours du nexus et nexus (étoile) positionnés correctement sur la map ; formes plus élégantes et plus petites
- **Simulation — structures nommées** : le journal de match indique quelle structure exacte est détruite (ex : "Tour 2 (Mid)", "Inhibiteur (Bot)") et respecte l'ordre T1→T2→T3→Inhibiteur→Tours Nexus→Nexus
- **Bouton fermer Changelog** : repositionné en haut à droite de la fenêtre modale, dans la charte graphique or/navy
- **Labels colonnes de draft** : colonnes renommées "First Pick / Last Pick" au lieu de "Bleu / Rouge" — évite la confusion entre ordre de pick et côté de map (ex : Red Side + First Pick s'affichait sous la colonne "Bleu")
- **Map side en simulation** : le côté affiché dans la simulation (Bleu/Rouge) reflète désormais le vrai côté de carte choisi au coin flip, indépendamment de l'ordre de pick

---

## [1.2.3] — 2026-06-17

### Corrigé
- **Timings objectifs neutres** : Baron (Nashor) apparaît à la minute 20 de jeu, réapparaît 6 min après sa mort ; Herald apparaît à la minute 14 — la simulation respecte ces délais et empêche tout événement Baron avant ces seuils
- **Fearless en saison** : mode Fearless Draft actif pour tous les matchs de saison régulière (BO3)
- **Changelog** : le lien en pied de page ouvre une fenêtre modale formatée (plus de lien 404)

### Ajouté
- **Filtres de rôle dans la draft** : boutons Tous / Top / Jungle / Mid / ADC / Support lors des bans ET des picks

---

## [1.2.2] — 2026-06-17

### Ajouté
- **Tours & Nexus sur la carte** — tours représentées par des carrés bleu/rouge (noirs avec liseré coloré quand détruites), nexus en étoile ★ avec même logique visuelle
- **Disclaimer Riot Games** — mention légale en pied de page : projet indépendant non affilié à Riot Games
- **Lien Changelog** — lien cliquable vers le changelog en pied de page
- **Side/Pick pour les games 2+ en série** — le perdant de la game précédente choisit en premier sa catégorie (côté OU ordre de pick) ; le gagnant obtient la catégorie restante

### Corrigé
- **Fatigue — affichage `undefined`** : propriété `p.fatigué` (cassée par le script d'accents v1.2.1) corrigée en `p.fatigue`
- **Carte non affichée** : chemin `IMG/map.png` corrigé en `img/map.png` (sensible à la casse sur serveur Linux)
- **Teamfight (0 kills)** : un teamfight garantit désormais ≥ 2 kills (4 max) ; si le kill cap est atteint, 1 kill est quand même accordé
- **Draft alphabétique** : champions triés par ordre alphabétique dans la grille de draft (bans et picks)
- **Fearless en saison** : guard explicite — le verrou fearless ne s'applique que si `fearlessMode === 'on'`, éliminant tout risque de faux positif en saison régulière

---

## [1.2.1] — 2026-06-16

### Corrigé
- **Accents français** — tous les textes du jeu corrigés avec les accents manquants (é, è, ê, à, î, ç, etc.) dans `game.js` et `index.html` (~400 remplacements)

---

## [1.2.0] — 2026-06-16

### Ajouté
- **Sauvegarde cloud GitHub Gist** — synchronisation optionnelle inter-appareils via GitHub Gist (ID + token), tuto intégré, fonctionne en parallèle du mode local

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
