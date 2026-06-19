# Changelog

Toutes les modifications notables du projet sont documentées ici.
Format basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).

---

## [1.5.4] — 2026-06-19

### Corrigé
- **Arbre de phase finale sur les écrans de fin** : l'arbre du bracket réapparaît désormais sur l'écran récapitulatif de fin de saison (« … - Terminée ») ainsi qu'en fin de MSI et de Worlds. Il avait disparu de ces écrans pourtant essentiels pour visualiser le résultat final après les playoffs.

---

## [1.5.3] — 2026-06-19

### Amélioré
- **Simulation de match plus réaliste et plus variée** : refonte de la résolution des affrontements pour casser le schéma répétitif (une équipe à 10-0 en 5 min puis stomp systématique).
  - **Résolution probabiliste** : chaque affrontement est désormais tranché par une sigmoïde sur l'écart de puissance, et non plus par un vainqueur déterministe. Deux équipes proches → combats à ~50/50 (matchs serrés, leads qui changent de camp) ; gros écart → favori dominant. **Plus les deux équipes sont proches, plus le match est serré.**
  - **Snowball adouci et contextuel** : l'avance en or pèse moins (±4 au lieu de ±5) et son intensité dépend du scénario (faible en *control*, forte en *stomp*).
  - **Prime de comeback (shutdown gold)** : l'équipe menée touche un bonus d'or en gagnant un fait d'armes — les avances ne sont plus définitives, les retournements deviennent possibles.
  - **Plafonds de kills early abaissés** : fin des 10-0 en 5 minutes.
  - **Choix du scénario lié à la proximité des équipes** : rosters proches → matchs disputés (control/standard), gros écart → domination (stomp).
- Les timers des objectifs neutres (dragon, grubs, herald, baron, elder) restent inchangés.

---

## [1.5.2] — 2026-06-19

### Ajouté
- **Bloc Vainqueur dans l'arbre** : à droite de la finale (playoffs, MSI, Worlds), un encart doré affiche « Vainqueur », le nom de la compétition (ex. *Spring 1 - LEC*) et l'équipe championne. Reste en pointillés « À déterminer » tant que la finale n'est pas jouée.
- **Section Palmarès** (écran Progression, entre Statistiques globales et Évolution des joueurs) : titres régionaux, qualifications MSI, titres MSI, meilleur résultat MSI, qualifications Worlds, titres Worlds, meilleur résultat Worlds. Les sauvegardes existantes voient leurs titres déjà gagnés rétro-comptés automatiquement.

### Amélioré
- **Arbre centré** : le bracket est désormais centré horizontalement dans le panneau, comblant l'espace vide à droite.

---

## [1.5.1] — 2026-06-19

### Amélioré
- **Arbre de phase finale** : les playoffs (saison), MSI et Worlds affichent désormais un bracket visuel avec connecteurs SVG calculés dynamiquement — à la place des anciens chips texte. Chaque rencontre est une carte avec équipes, scores et état (qualifié/éliminé/à venir). La carte du prochain match est mise en évidence en doré. La section "Derniers résultats" reste inchangée en dessous.
  - Saison : 6 équipes — byes seeds 1 & 2 intégrés à la colonne des quarts, demi-finales, finale
  - MSI : 4 équipes — demi-finales directes, finale
  - Worlds : 8 équipes — 4 quarts, 2 demis, finale

### Corrigé
- **Connecteurs de l'arbre (saison)** : les byes (seeds 1 & 2) partagent désormais la colonne des quarts de finale, ce qui évite que les traits de connexion ne passent par-dessus les cartes de match.
- **Rafraîchissement du cache (Mac/Safari)** : ajout d'un suffixe de version (`?v=1.5.1`) sur le CSS et les scripts pour forcer le rechargement de `style.css` — l'arbre ne s'affichait pas sur Mac car l'ancien CSS restait en cache.

---

## [1.5.0] — 2026-06-19

### Refonte
- **Simulation de match recalibrée sur les données pro réelles** (LCK/LPL/LEC/LCS 2026 — gol.gg) : les parties génèrent désormais des statistiques cohérentes avec le pro play (27-31 kills/partie, durée 29-35 min, écart d'or progressif).

### Ajouté
- **5 scénarios de match** tirés au sort au lancement, pondérés selon la région et l'écart de niveau entre équipes :
  - *Contrôle/Macro* (25 %) : peu de kills, priorité farm et objectifs — style LCK propre
  - *Standard pro* (35 %) : avantage progressif, action concentrée sur les timings logiques — scénario central
  - *Snowball réaliste* (22 %) : early réussi mais rythme crédible, 10-17 kills à 25 min
  - *Stomp pro* (8 %) : grosse différence de niveau, partie pliée avant 28 min — rare
  - *Fiesta/Chaotique* (10 %) : beaucoup de kills mais lead pas toujours stable, possibles 40-55 kills
- **Poids par région** : LCK favorise le contrôle, LPL favorise snowball/fiesta, LEC/LCS équilibrés, International plus de stomps
- **Plafond de kills par minute** (garde-fou temporel) : à 10 min max 5-13 kills selon scénario, à 15 min max 10-19, à 20 min max 18-28 — empêche les outliers absurdes hors scénario stomp/fiesta
- **Comportement défensif sous grand écart d'or** : quand le lead dépasse 3 000 or, l'équipe menée joue plus safe — poids des events de kills réduit (×0.55-0.75), poids des tours augmenté (×1.4). Le snowball se convertit en structures/objectifs plutôt qu'en kills supplémentaires.

### Modifié
- Poids des events `lane_kill` et `gank` réduit de 2 → 1 (ratio de base en early : 44 % → 22 % des events)
- Kills par teamfight : `randomInt(2,4)` → `randomInt(1, maxKillsPerTF)` selon scénario (1-4)
- Plafond absolu de kills porté à 55 (réservé au scénario fiesta extrême)

---

## [1.4.3] — 2026-06-19

### Amélioré
- **Effet snowball** : l'avantage en or influence désormais directement la puissance de chaque camp lors des events de match. Chaque tranche de 2 000 or d'avance apporte +1 de puissance (plafonné à ±5, soit ±10 000 or). Concrètement, une équipe avec 10 000 or d'avance gagne les events de façon quasi systématique, ce qui reflète le comportement réel d'une partie de League of Legends où un retour de 10k gold n'existe quasiment pas.

---

## [1.4.2] — 2026-06-19

### Corrigé
- **Filtre de rôle en draft — rôles secondaires inclus** : le filtre Top/Jungle/Mid/ADC/Support affiche désormais aussi les champions dont ce rôle est un rôle secondaire (ex : Gragas avec `role: TOP` et `secondaryRoles: ['JUNGLE']` apparaît dans le filtre Jungle). Alignement avec ce que l'IA peut picker.

---

## [1.4.1] — 2026-06-19

### Corrigé
- **Qualification MSI / Worlds basée sur les playoffs** : les équipes représentant la région du joueur sont désormais sélectionnées selon les résultats des playoffs, et non le classement de saison régulière. MSI : champion + finaliste (2 spots). Worlds : champion + finaliste + meilleur demi-finaliste éliminé par seed de saison régulière (3 spots). Sans victoire en finale de playoffs il n'est plus possible de se qualifier automatiquement au MSI/Worlds depuis le classement régulier

---

## [1.4.0] — 2026-06-19

### Modifié
- **Niveau global dynamique** : la valeur globale d'un joueur (ex. 89) n'est plus un chiffre statique importé — elle est désormais calculée en temps réel comme la moyenne de ses 5 sous-stats (Mental + Shotcalling + Laning + Teamfight + Mécaniques) / 5. Si l'entraînement améliore une stat, le niveau global monte immédiatement
- **Impact direct sur les matchs** : c'est ce niveau calculé qui alimente le moteur de simulation (calcul de puissance par joueur). Un joueur qui progresse en entraînement est plus fort au prochain match ; un joueur qui régresse l'est moins
- **Affichage cohérent** : la carte Roster et le tableau récapitulatif affichent désormais le niveau réel (calculé), non la valeur figée du fichier de données
- **Moyennes d'équipe dynamiques** : la moyenne de niveau d'équipe (utilisée en scouting et dans les comparaisons) reflète également les sous-stats actuelles

---

## [1.3.7] — 2026-06-19

### Corrigé
- **Classement — suppression du "(Vous)"** : le nom de l'équipe du joueur s'affiche sans mention, comme les autres équipes (saison régulière et groupes MSI/Worlds)
- **Sauvegarde cloud — confirmation avant envoi** : un popup demande confirmation avant d'écraser la sauvegarde cloud existante
- **Sauvegarde cloud — confirmation avant chargement** : un popup demande confirmation avant d'écraser la partie actuelle avec la sauvegarde cloud
- **Chargement cloud — réinitialisation préalable** : avant d'appliquer la sauvegarde cloud, la partie en cours est réinitialisée proprement (match en cours stoppé, état remis à zéro) pour éviter tout état parasite

---

## [1.3.6] — 2026-06-18

### Modifié
- **Économie — suppression du gain de budget par match** : le budget ne s'incrémente plus à chaque victoire (+10) ou défaite (+3) — les revenus proviennent uniquement du classement en fin de compétition
- **Récompenses de classement revues à la baisse** : fin de saison 1er +100 / 2e +80 / Top 4 +60 / Top 6 +40 / Top 8 +20 / hors top 8 +0 (était 200/140/100/70/40/15)
- **Multiplicateurs MSI / Worlds** : MSI ×1,25 et Worlds ×1,5 par rapport aux récompenses de fin de saison (était ×1,4 et ×2)

---

## [1.3.5] — 2026-06-18

### Corrigé
- **Historique des matchs — colonne Compétition** : la colonne affichait toujours « Scrim » pour tous les matchs. Elle indique désormais le bon contexte : « Spring 1 - LEC » (saison régulière), « Playoffs - Spring 1 - LEC » (playoffs), « MSI 1 - Groupes » / « MSI 1 - Phase finale », « Worlds 1 - Groupes » / « Worlds 1 - Phase finale », ou « Scrim » pour les entraînements

---

## [1.3.4] — 2026-06-18

### Modifié
- **Synthèse de draft — raison du matchup** : chaque ligne de matchup indique désormais pourquoi le matchup est favorable ou défavorable, entre parenthèses (ex : « Top : Sion contre Jayce, matchup favorable (Poke) » et « Top : Sion contre Jayce, matchup défavorable (Engage) »). Lorsque deux entrées coexistent dans la base (champ. A contre B ET B contre A), les deux lignes s'affichent avec leur profil respectif

---

## [1.3.3] — 2026-06-18

### Modifié
- **Classement — colonne Diff. or masquée** : la différence d'or n'est plus affichée dans les tableaux de classement (saison régulière, groupes MSI et Worlds) mais reste utilisée en dernier critère de départage (victoires → h2h → diff. nexus → diff. or)

---

## [1.3.2] — 2026-06-18

### Corrigé
- **Inversion des matchups (counter ↔ synthèse de draft)** : la synthèse post-draft annonçait l'inverse de l'écran Counters (ex : « Renekton contre Jayce, matchup favorable » alors que Jayce contre Renekton). La synthèse s'appuie désormais sur le fichier de counters (même source que l'écran Counters) ; le repli sur les tags a été remis dans le bon sens
- **Bonus de counter en simulation** : la fonction `getCounterEntry` manquait, donc le calcul de puissance en match utilisait un repli de tags inversé (il avantageait l'équipe contrée). Le moteur lit maintenant le fichier de counters et applique le bon signe

---

## [1.3.1] — 2026-06-18

### Modifié
- **Passe d'équilibrage majeure (330 joueurs)** : recalibrage des stats globales et sous-stats des rosters principaux (`lol_esports_update_2026_major_balance_v2.xlsx`). Moyenne de niveau 75,0 → 81,3 ; min 55 → 66 ; max 96 → 97
- **Pools de champions étendus à 5 + masteries explicites** : chaque joueur majeur dispose désormais d'un pool de 5 champions avec des maîtrises explicites (plus de formule automatique punitive). Maîtrise moyenne du pick 1 : 65,0 → 86,6 ; pick 2 : 50,0 → 83,9 ; pick 3 : 35,0 → 80,7
- **Maîtrises réelles en jeu** : le roster du joueur utilise directement ces maîtrises explicites (badges de maîtrise et liséré de confort en draft alignés sur les vraies données) ; repli sur l'ancienne formule si une maîtrise est absente
- **DraftProfiles synchronisés** : comfort picks d'équipe (IA) alignés sur les nouveaux pools joueurs
- _Le marché des transferts (75 joueurs ERL) reste inchangé._

---

## [1.3.0] — 2026-06-18

### Ajouté
- **Draft — liséré de confort sur les bans** : pendant la phase de ban (et de pick), chaque champion qu'un de vos joueurs sait jouer (confort ≥ 1) est entouré d'un liséré coloré selon le niveau de maîtrise, avec les mêmes couleurs que le roster (bleu praticable, vert confort, or signature/élite). Survol = nom du joueur et maîtrise
- **Marché des transferts — 75 vrais joueurs ERL / EMEA Masters** : import des joueurs de divisions inférieures (LFL, Prime League, SuperLiga, NLC, Ultraliga, TCL, Balkan, Greek Legends) depuis `lol_esports_update_2026_with_transfers.xlsx`
- **Transferts — affichage complet et filtres** : tous les joueurs disponibles sont affichés d'un coup, avec filtres par poste (boutons), par division, par équipe actuelle, par champion pool, et un champ de recherche (nom du joueur, équipe ou champion). Les champion pools sont affichés avec le liséré de confort et la note de scouting
- **Transferts — maîtrises réelles à la signature** : un joueur signé conserve ses comfort picks et leurs scores comme maîtrises, ce qui alimente directement le liséré de confort en draft

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
