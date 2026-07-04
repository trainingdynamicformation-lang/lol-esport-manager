# Changelog

Toutes les modifications notables du projet sont documentées ici.
Format basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).

---

## [1.15.5] — 2026-07-06

### Corrigé — Une partie ne devait plus se terminer sans destruction du nexus

Un match pouvait être perdu (ou gagné) sans que le nexus n'ait été détruit, simplement parce que l'horloge de la partie dépassait 55 minutes — un vainqueur était alors désigné par avantage structurel/or/kills. Or comme dans League of Legends, **la seule condition de victoire est la destruction du nexus**, quelle que soit la durée réelle de la partie (60, 90 minutes ou plus). La limite de temps forcée a été supprimée : une partie peut désormais durer aussi longtemps que nécessaire, jusqu'à ce qu'un nexus tombe réellement.

---

## [1.15.4] — 2026-07-05

### Ajouté — Filtres du journal des transferts

Le journal (retraites, arrivées, fins de contrat, signatures) devenait difficile à lire au fil des saisons. Deux filtres combinables ont été ajoutés en haut de l'écran :

- **Région** : n'affiche que les mouvements de la région sélectionnée (votre équipe suit sa propre région).
- **Équipe** : la liste des équipes proposées se met à jour automatiquement selon la région choisie.
- Filtres alignés sur la charte graphique du jeu (mêmes sélecteurs stylés que Entraînement/Scouting).

### Corrigé — Fausses entrées « retraite »/« arrivée » au nom de votre équipe

Le journal pouvait afficher un joueur de votre effectif comme parti à la retraite et remplacé (ex. Canna), alors qu'il restait bien présent et actif dans votre roster réel. Cause : la rotation des retraites IA touchait par erreur une copie technique de votre équipe conservée en interne, jamais affichée mais que le code de rotation ne savait pas distinguer des vraies équipes adverses. Corrigé : votre équipe n'est plus jamais concernée par cette rotation — seuls les contrats/transferts que vous décidez vous-même apparaissent désormais en son nom dans le journal. Les fausses entrées déjà présentes dans les sauvegardes existantes sont purgées automatiquement au chargement.

---

## [1.15.3] — 2026-07-04

### Corrigé — Retraites des joueurs IA (sauvegardes anciennes)

Sur les parties commencées avant l'ajout des âges (v1.8.4), les effectifs IA n'avaient jamais reçu leurs âges : ils restaient figés sur des valeurs par défaut, et **aucun joueur IA ne partait à la retraite** — le journal des transferts restait donc vide côté IA, saison après saison.

- **Rattrapage d'âge des effectifs IA au chargement** : chaque joueur IA sans âge récupère désormais son `baseAge`/`retirementAge` par correspondance de nom avec les données du jeu (repli aléatoire cohérent avec son niveau pour les remplaçants générés). Le rattrapage appliqué aux effectifs du joueur depuis la v1.8.4 couvre enfin aussi les équipes adverses.
- **Renouvellement générationnel lissé** : pour éviter qu'une sauvegarde « en retard » ne voie la moitié de la ligue partir à la retraite d'un seul coup, un plafond limite désormais les départs à **un par équipe et par intersaison** (les joueurs les plus âgés partent en priorité, les autres attendent l'intersaison suivante). Le rattrapage se fait donc progressivement sur quelques saisons, puis le rythme se normalise.
- **Rattrapage manquant sur les imports** : charger une sauvegarde depuis un fichier ou depuis le cloud contournait ce rattrapage d'âge (chemins d'import séparés du chargement normal). Corrigé : les deux passent désormais par le même correctif.
- **Effectifs affichés périmés après un remplacement** : l'écran Scouting (et tout autre écran lisant la liste d'équipes d'une région) continuait d'afficher l'ancien joueur après une retraite/remplacement IA, alors que la Draft et les matchs affichaient déjà le bon — `getAITeamsForRegion()` retournait les équipes brutes des données du jeu au lieu de la version à jour. Corrigé pour toujours refléter l'effectif réel.

### Ajouté — Confiance scouting réduite après un remplacement IA

Un nouveau joueur qui débarque en équipe IA (suite à une retraite) reste un inconnu pour votre staff : la confiance scouting de l'équipe concernée baisse désormais de 15 points (l'équivalent d'un match de préparation en moins) à chaque remplacement, clampée à 0. Le compteur de scrims de préparation déjà effectués n'est pas affecté — seule la connaissance actuelle de l'équipe se périme.

- **Un remplaçant reste "inconnu" tant qu'aucun match n'a été joué contre son équipe** : son pool de champions, son profil/traits, sa priorité de draft (et son détail de stats en rapport premium) affichent désormais « Inconnu — jouez un match ou un scrim contre cette équipe pour le découvrir » à la place de ses vraies données. Dès qu'un match réel **ou** un scrim d'entraînement est joué contre cette équipe, le joueur est révélé et le rapport redevient normal.

---

## [1.15.2] — 2026-07-03

### Ajouté
- **Changelog traduit en anglais** : l'intégralité de l'historique (90 versions) est désormais disponible en anglais, affiché automatiquement si la langue du jeu est réglée sur English.
- **Aide GitHub Gist traduite en anglais** : le guide de configuration en 3 étapes (Progression → Sauvegarde cloud) bascule désormais avec la langue du jeu, comme le reste de l'interface.
- **Scrims hors saison contre toutes les régions** : l'écran Match propose désormais un sélecteur de région pour affronter n'importe quelle équipe de n'importe quelle région, comme c'était déjà le cas pour les scrims d'Entraînement.

---

## [1.15.1] — 2026-07-02

### Ajouté — Visite guidée

Plusieurs retours de joueurs demandaient un tutoriel pour mieux se repérer à la première connexion. Ajout d'une visite guidée du jeu :

- **Popup d'invitation** dès le premier lancement (nouvelle partie **et** sauvegarde déjà en cours), avec un choix explicite « Oui, s'il vous plaît » / « Non merci ».
- **12 étapes** : une par onglet principal (Accueil, Roster, Entraînement, Calendrier, Draft, Scouting, Transferts, Journal, Sponsor, Progression), plus deux zooms sur des éléments précis à l'intérieur d'un écran (la barre de ressources en haut à droite, le repos d'équipe dans Roster) — l'écran correspondant s'affiche en fond, l'élément ciblé est mis en évidence par un halo doré sur voile sombre, une bulle explique ce qu'on y trouve.
- Bouton « Suivant » qui avance et change d'onglet automatiquement, bouton « Passer le tuto » disponible à tout moment.
- Rejouable à volonté via un bouton dédié dans Progression.
- Bilingue FR/EN.

### Corrigé — retours joueurs sur la visite guidée

- L'onglet **Journal** avait été oublié entre Transferts et Sponsor.
- La toute première bulle décrivait les ressources (en haut à droite) tout en pointant vers le bouton Accueil (en haut à gauche) — dédoublée en deux étapes distinctes, chacune pointant vers ce dont elle parle.
- Ajout d'un zoom dédié sur le repos d'équipe dans Roster, à la demande d'un joueur.

---

## [1.15.0] — 2026-07-01

### Ajouté — Sponsors

Nouvel onglet **Sponsor** : votre équipe doit désormais négocier un contrat de sponsoring chaque fin d'année, avant d'attaquer la saison suivante.

- **Fenêtre de renouvellement obligatoire** : à la fin de Worlds, avant de démarrer la nouvelle année, une matrice de **6 offres** est proposée (2 types × 3 paliers), tirées au hasard parmi un vivier de **24 contrats**. Un bandeau discret prévient qu'une décision sponsor est en attente.
- **3 paliers**, débloqués par le prestige de l'équipe : Secure (10), Standard (50), Premium (75).
- **2 types de contrats** :
  - **Signature** — bonus fixe versé à la signature, contre des objectifs à tenir sur l'année (classement, titre régional, qualifications internationales...). Tous les objectifs atteints → reconduction avec bonus composé l'année suivante. Partiellement atteints → avertissement et reconduction à montant réduit. Aucun atteint → résiliation immédiate et remboursement du bonus, plafonné au budget disponible (jamais négatif) ; le manque éventuel se convertit en perte de prestige.
  - **Résultat** — aucun bonus à la signature, payé en continu selon les résultats de chaque compétition (domestique et internationale). Les sponsors Premium ont une clause de rupture (hors playoffs, ou absence de qualification internationale sur l'année) qui peut mettre fin au contrat en cours d'année.
- Paliers non débloqués visibles mais verrouillés dans la matrice (badge de prestige requis), pour montrer la progression à viser.
- Fiche de contrat détaillée au clic sur une offre (bonus, objectifs, clauses), avec confirmation explicite avant signature.
- Journal des sponsors (contrats signés, reconduits, avertissements, résiliations, versements).
- Bilingue FR/EN.

---

## [1.14.2] — 2026-06-28

### Ajouté — Bandeau de nouvelle version disponible

Jusqu'ici, un joueur devait deviner qu'une mise à jour existait et forcer un rechargement complet pour l'obtenir. Désormais, un **bandeau discret en bas d'écran** apparaît automatiquement dès qu'une nouvelle version est détectée :

- **Détection native** : s'appuie sur l'événement `controllerchange` du Service Worker (le navigateur compare `sw.js` au fichier serveur automatiquement, sans code de vérification manuel).
- **Hors-ligne friendly** : si aucune connexion n'est disponible (mode avion, etc.), la vérification échoue silencieusement — aucun bandeau ne s'affiche, le jeu se lance normalement sur la version déjà en cache. Aucune interruption forcée.
- **Non-intrusif** : bandeau discret, pas de popup bloquante ; le joueur peut continuer sa partie en cours et recharger quand il le souhaite (bouton « Recharger » ou fermeture du bandeau).
- **Garde-fou premier lancement** : un nouveau joueur (aucune version précédente installée) ne voit jamais ce bandeau à sa première visite — seule une vraie mise à jour (un Service Worker actif remplacé par un nouveau) le déclenche.
- Bilingue FR/EN, cohérent avec le style visuel des notifications existantes.

---

## [1.14.1] — 2026-06-28

### Modifié — Retours joueurs (Reddit)

- **Région Amériques renommée LCS** (au lieu de LTA) — affichage uniquement, l'identifiant interne reste `LTA` pour ne pas casser les sauvegardes existantes. Nouveau helper `regionDisplayName()`. Effectif immédiatement sur une partie en cours, y compris déjà commencée.
- **Bug corrigé (découvert au passage)** : la clé `SCENARIO_WEIGHTS_BY_REGION.LCS` n'était jamais atteinte car la région stockait l'id `LTA` — la région Amériques utilisait silencieusement les pondérations de scénarios de match de la LEC par défaut. La clé est renommée `LTA` pour être enfin utilisée.
- **Assistant Coach de draft — refonte du counter-pick** : ne propose plus de counter contre un champion banni ou déjà pické par un rôle adverse différent du vôtre (bug remonté : suggérer Ryze pour contrer un Gnar top déjà locké). La logique est désormais **par rôle** :
  - **Counter-pick** : meilleure opportunité parmi les rôles où l'adversaire a déjà locké un pick.
  - **Anticipation** (nouveau) : meilleure opportunité parmi les rôles pas encore lockés, basée sur les picks probables de l'adversaire (comfort picks ou pool).
  - Pour chacune, si le meilleur counter réel n'est **pas** dans votre pool, une **carte « Contre idéal »** distincte apparaît à côté de la carte confort (ou seule s'il n'y a aucun counter exploitable dans le pool), avec un avertissement explicite sur le niveau de maîtrise (aucune / très faible).
- **Gank et duels de lane** : le texte du log reflète désormais le résultat réel de l'action. Si le plafond de kills du moment est atteint (kill non comptabilisé), le texte ne prétend plus un kill — plusieurs variantes narratives (réussite / tentative repoussée) pour plus de crédibilité et de variété.
- **Âme du Dragon** ajoutée au journal de match : une ligne dédiée apparaît dès qu'une équipe sécurise sa 4ᵉ prise de dragon, en plus de la ligne de capture du dragon lui-même. Le Baron Nashor était déjà correctement loggé (aucun changement nécessaire).

---

## [1.14.0] — 2026-06-28

### Ajouté — Programme des journées (calendrier de saison régulière)

Sous le classement, une nouvelle section **« Programme des journées »** liste toutes les journées de la saison, repliables :
- **Journées passées** (✓) : tous les matchs avec leur score, le vainqueur mis en évidence.
- **Journée en cours** (badge « EN COURS ») : dépliée par défaut, affiche les affrontements à jouer.
- **Journées à venir** : affrontements programmés (« vs »).
- Ton match est surligné en doré. Un clic sur une journée la déplie/replie (accordéon).

**Technique** : nouveau champ `state.season.matchResults[]` (scores structurés par journée, index = journée − 1), alimenté à la fois quand tu joues ton match et quand les matchs IA sont simulés. Helper `recordMatchdayMatch()`. Compatible avec les sauvegardes existantes (les journées déjà jouées d'une partie en cours n'ont pas de détail, mais tout fonctionne pour les nouvelles).

---

## [1.13.0] — 2026-06-27 — 🌍 Jeu entièrement bilingue FR / EN

### Version majeure — Internationalisation complète

LOL Esport Manager est désormais **intégralement jouable en français et en anglais**. Une popup de bienvenue au premier lancement permet de choisir sa langue (🇫🇷 / 🇬🇧) ; le choix est modifiable à tout moment dans **Progression → Réglages du monde**, avec bascule instantanée.

**Couverture complète** (721 clés de traduction, FR = EN, vérifiées) :
- Interface : navigation, écrans, boutons, formulaires, états vides, barre de ressources, pied de page.
- Roster, Champions, Counters, Calendrier (domestique + international MSI/Worlds), brackets (simple + double élimination), Transferts, Contrats, Journal.
- Entraînement (scrims, guide des objectifs, comptes-rendus), Draft (assistant coach), Match (déroulé en direct, événements, structures), Scouting (rapports basique/avancé/premium), pile ou face.
- Sélection de région, onboarding, sauvegarde locale/cloud, modals d'intro de saison/internationale, qualifications, départs de contrat, tous les toasts et journaux de résultats.

### Dernier lot (sélection de région, progression, modals, sauvegarde)
- Sélection de région/équipe, cartes de Progression et palmarès, modals d'introduction de saison et de tournoi international, statut de qualification, fins de contrat, sauvegarde locale/cloud (statuts + confirmations) et tous les toasts globaux traduits.
- Audit final : zéro chaîne d'affichage française résiduelle hors termes LoL universels (Blue/Red Side, First/Last Pick, BO3/BO5, Early/Mid/Late game).

> Phases intermédiaires livrées en 1.12.2 → 1.12.13.

---

## [1.12.13] — 2026-06-27

### Ajouté — i18n FR/EN Phase 3 (lot 8 : Scouting)

L'écran Scouting complet est traduit (sélecteur d'équipes/région + rapports basique/avancé/premium).

- **Rapport basique** : confiance, tier (majeure/compétitive/émergente), style, niveau moyen, pool, tags de composition, force par phase, forme récente (série V/D ↔ W/L).
- **Rapport avancé** : pool par rôle, profils joueurs (traits + notes traduits), priorités de draft, faiblesse de matchup, champions récents, bilan H2H (pluriel géré).
- **Rapport premium** : tableau joueurs (Lane/TF/Méca/SC/Mental, avantage/désavantage), counter-picks suggérés, flex picks, joueur à surveiller, plan de draft, scrim recommandé.
- Messages de déblocage des paliers, traits de scouting (`TRAIT_SCOUT_LABELS`) et tags (`SCOUT_TAG_LABELS`) traduits. Nouveaux helpers `scoutTagLabel()`, `scoutTraitLabel()`, `scoutTraitNote()`.

---

## [1.12.12] — 2026-06-27

### Ajouté — i18n FR/EN Phase 3 (lot 7 : Match)

- **Préparation de match** : titre, message roster vide, série en cours, intro, libellés (adversaire, format, fearless draft), bouton démarrer.
- **Aperçu scouting** (avant match) : tier (Basique/Avancé/Premium), style, niveau, faiblesse, ban prioritaire, message de déblocage.
- **Déroulé en direct** : tous les événements du commentaire (duels de lane, ganks, Dragon, Herald, Void Grubs, tours/inhibiteurs/Nexus, teamfights, Baron, Elder, actions décisives) — générés dans la langue active.
- **Structures de la carte** (`STRUCTURE_LABELS`) traduites : Tour/Inhibiteur/Tour du Nexus/Nexus.
- **Compte-rendu de match**, **boutons de fin** (série remportée/perdue, Draft Game N, Retour), bouton Pause/Reprendre.
- **Modal de choix de side entre games** (pile ou face de série).
- Nouveaux helpers `scoutTierLabel()` et `getStructureLabel()` traduit.

---

## [1.12.11] — 2026-06-27

### Ajouté — i18n FR/EN : Pile ou Face (coin flip)

Le pile ou face d'avant-draft (choix du side et de l'ordre de pick) n'était pas traduit. Désormais bilingue : titre, résultats gagné/perdu, choix d'avantage (descriptions des options Blue/Red Side, First/Last Pick), récapitulatif et boutons. Les termes LoL universels (Blue Side, First Pick…) restent inchangés.

---

## [1.12.10] — 2026-06-27

### Ajouté — i18n FR/EN Phase 3 (lot 6 : Draft + Assistant Coach)

- **Écran de draft** : formulaire de préparation (adversaire, side), bannières de tour (ban/pick/IA), filtres de rôle, recherche, colonnes First/Last Pick, bilan de draft (confort, matchups, composition, side, scouting, risque, total), journal de draft.
- **Assistant Coach** : tous les conseils traduits (counter-pick, pick proactif, ban prioritaire, menace retour, composition, scouting, flex pick, pick confort) — régénérés dans la langue active à chaque tour.
- **Journal de draft** et **détails de matchup** traduits à la génération.
- **Tiers de maîtrise** (`MASTERY_TIERS` : Découverte/Praticable/Confort/Signature/Élite) traduits — bénéficie aussi aux tooltips du roster et du marché des transferts. Nouveaux helpers `draftSideLabel()`, `masteryTierLabel()`.

---

## [1.12.9] — 2026-06-27

### Ajouté — i18n FR/EN Phase 3 (lot 5 : Entraînement)

- **Formulaire de scrim** : objectifs (libellés + descriptions), guide des objectifs (cartes : gains, cas d'usage, mise en garde), intensités, région/adversaire (suffixes prestige), joueur/champion ciblé, style de composition, coût, bouton.
- **Historique des scrims** : en-têtes de colonnes, résultats, libellés objectif/intensité (traduits au rendu, basculent avec la langue).
- **Compte-rendu de scrim** : analyse de victoire/défaite, suivi des progrès, évolution des stats — généré dans la langue active.
- **Modal de refus** de scrim (prestige insuffisant) et **tous les toasts** d'entraînement.
- Labels de stats (`STAT_LABELS`) traduits. Nouveaux helpers `scrimObjLabel()`, `scrimIntensityLabel()`, `statLabel()`.

> Comptes-rendus/résumés de scrim : traduits à la génération (un nouveau scrim s'affiche dans la langue active ; les entrées d'historique déjà enregistrées gardent leur langue d'origine).

---

## [1.12.8] — 2026-06-27

### Ajouté — i18n FR/EN Phase 2 (lot 4/4 : Transferts + contrats)

Le plus gros écran narratif du jeu, entièrement traduit (~55 chaînes).

- **Marché des transferts** : état vide, budget, compteur, filtres (divisions/équipes/champions), recherche, cartes joueurs (stats, agent libre, coût, bouton Signer / Budget insuffisant).
- **Panneau contrats** : notice de désactivation, mercato ouvert/fermé, tiers de contrat (Superstar/Star/Solide/Role player), avertissements de retraite, boutons de prolongation (+1/+2 ans, négociation de carrière ×1.5, limites 33 ans), tooltips.
- **Modal de prolongation** : titre, demande, prestige exigé / budget payé, bannière négociation de carrière, note prestige-seuil, boutons.
- **Modal de signature** : choix du joueur à libérer, poste vacant, confirmation.
- **Tous les toasts** transferts/contrats (signatures, libérations, prolongations, budgets/prestige insuffisants…).
- Gestion correcte du **pluriel** (an/ans, yr/yrs) via `yearUnit()`. Nouveaux helpers `contractTierLabel()`, `yearUnit()`.

> **Phase 2 terminée.** Restent en Phase 3 : entraînement (scrims + guide objectifs), draft (assistant coach), match (déroulé), scouting, sélection de région, et les divers textes narratifs générés.

---

## [1.12.7] — 2026-06-27

### Ajouté — i18n FR/EN : journaux de résultats (« Derniers résultats »)

Les entrées de résultats récents (calendrier domestique, playoffs, phase de groupes et bracket internationaux) étaient générées en français figé et stockées telles quelles. Elles sont désormais **structurées** (`{k, p}`) et **traduites au rendu** dans la langue active — elles basculent donc en direct au changement de langue.

- 17 modèles de log traduits (résultats joueur/IA, qualifications de groupe, fins de saison/tournoi, etc.).
- Nouveau helper `logChip()` qui résout les sous-parties dynamiques (noms d'équipes, labels de tour, classements) au moment de l'affichage.
- `playoffRoundLabel` et `intlMatchLabel` traduits.
- **Compatibilité** : les entrées déjà enregistrées dans une sauvegarde existante (chaînes figées en français) restent affichées telles quelles ; seules les **nouvelles** entrées profitent de la traduction bilingue.

---

## [1.12.6] — 2026-06-27

### Ajouté — i18n FR/EN Phase 2 (lot 3/4 : Calendrier international MSI/Worlds)

- **Phase de groupes** : titre, libellé groupe, prochain match, classement (colonnes), boutons jouer/continuer.
- **Phase finale (bracket)** : titre, prochaine série, état en cours.
- **Récap international** : titre, champion, classement + récompenses, bouton continuer.
- **Brackets** : MSI (simple élim, 4 équipes), Worlds simple élim (8 équipes, quarts/demis/finale) et **Worlds double élimination** (Upper/Lower Bracket + Grande Finale) entièrement traduits — labels de colonnes et de cartes (Quarts UB, Demis UB, LB Tour 1/2, Perd. Q1/Q2, vs Perd. Finale UB, Vainq. UB vs Vainq. LB…).
- Contextes de série (« {event} {year} — Groupes / Phase finale ») traduits.

> Le journal de résultats des matchs internationaux reste en français (Phase 3). Reste en Phase 2 : lot 4 = transferts/contrats, puis entraînement, draft, match, scouting.

---

## [1.12.5] — 2026-06-27

### Ajouté — i18n FR/EN Phase 2 (lot 2/4 : Journal + Calendrier domestique)

- **Journal des transferts** : intro, libellés saison, types de mouvement (Retraite, Arrivée, Fin de contrat, Signature).
- **Calendrier domestique** : saison régulière (titre, journée vs adversaire, jour de repos, boutons jouer/simuler/continuer), classement (colonnes Équipe/V/D/Nexus), playoffs (prochaine série, jouer la série), récap de fin de split (classement final, récompenses, suite vers MSI/Worlds).
- **Bracket de playoffs** (partagé avec l'international) : libellés colonnes (Quarts/Demis/Finale), légende (Qualifié/Prochain match/Éliminé), cartes (byes, seeds, vainqueur, à venir).
- **Placements** et **évolution des joueurs** traduits.

> Le contenu du journal de résultats (`season.log`, ex. « J3 : Victoire 2-1 contre G2 ») reste en français — il sera traduit en Phase 3 (texte narratif généré). Reste en Phase 2 : lot 3 = calendrier international, lot 4 = transferts/contrats, lot 5 = entraînement, lot 6 = draft/match/scouting.

---

## [1.12.4] — 2026-06-27

### Ajouté — i18n FR/EN Phase 2 (lot 1/4 : Roster, Champions, Counters)

Traduction des écrans dynamiques (le contenu rendu par JavaScript), au-delà du shell statique déjà fait.

- **Roster** : panneau de repos, libellés de statistiques (Forme, Fatigue, Mental, Shotcalling…), âge, contrat, champion pool, traits des joueurs (IGL, Vétéran, Tiltable…), toasts de repos.
- **Champions** : filtres de rôle, fiche détaillée (difficulté, style, synergies, fort/faible contre), listes « counters » et « contré par », bouton retour.
- **Counters** : titres de résultats, libellés de matchup, états vides.
- Nouveaux helpers `traitLabel()` et `restLabel()` dans `lang.js`. Correction de deux variables `t` locales qui masquaient la fonction de traduction.

---

## [1.12.3] — 2026-06-27

### Modifié
- **Popup d'onboarding (rotation IA / contrats)** : le sélecteur de langue en a été retiré — il faisait doublon avec la popup de bienvenue. Le choix de langue reste accessible à tout moment dans **Progression → Réglages du monde**.

---

## [1.12.2] — 2026-06-27

### Ajouté — Internationalisation FR/EN (Phase 1/3 du chantier v1.13.0)

Premier socle du système bilingue. Le jeu pourra être joué intégralement en **français** et en **anglais** une fois le chantier terminé (versions 1.12.x intermédiaires, release complète en 1.13.0).

- **Nouveau module `lang.js`** — dictionnaire `I18N = { fr, en }`, fonction `t(clé, vars)` avec interpolation, `setLang()` et `applyStaticI18n()`. Chargé avant `game.js`.
- **Popup de bienvenue au premier lancement** — présente le but du jeu en FR et EN, avec deux drapeaux 🇫🇷 / 🇬🇧 pour choisir la langue. Affichée une seule fois (`state.settings.langChosen`).
- **Sélecteur de langue dans Progression** — deux boutons drapeaux dans les Réglages du monde, changement instantané sans rechargement.
- **Shell statique entièrement traduit** — navigation, titres d'écrans, états vides, barre de ressources, écran de match, tableau de progression, sauvegarde locale/cloud, pied de page.
- Langue par défaut : français. Les sauvegardes existantes restent en français sans interruption.

> Phases suivantes : 2/3 = texte des écrans dynamiques (roster, draft, calendrier, transferts), 3/3 = texte narratif (rapports de scouting, comptes-rendus de matchs, journal, contrats, notifications).

---

## [1.12.1] — 2026-06-26

### Ajouté — Assistant Coach de draft

Remplace la ligne de suggestion unique par un **panneau coach structuré** affiché à chaque tour du joueur (ban et pick), avec jusqu'à 3 cartes colorées hiérarchisées par priorité :

- ⚡ **Counter-pick** — quand l'adversaire a déjà pick dans votre rôle, identifie le meilleur champion de votre pool qui le contrecarre (via `CHAMPION_COUNTERS`, score ≥ 65). Ex. : « Vex contre leur Viktor MID — avantage de matchup (score 87) »
- 🔥 **Pick proactif** — champion de votre pool qui met en difficulté plusieurs champions probables du pool adverse. Calcul basé sur les counters croisés avec le pool réel de l'équipe IA
- 🛡 **Ban prioritaire** — si scouting avancé ou premium, signale le champion que l'adversaire va prioriser
- ⚠️ **Menace retour** — votre meilleur champion pourrait être dangereux côté adverse, pensez à le bannir
- 🧩 **Composition** — alerte si votre comp (après 2+ picks) manque de engage / disengage / scaling / teamfight
- 📋 **Scouting** — rappelle le rôle le plus faible de l'adversaire si vous avez un rapport avancé/premium
- 👁 **Flex adverse** — détecte les champions adverses multi-rôles dont l'assignation est ambiguë

---

## [1.12.0] — 2026-06-26

### Ajouté — Scouting enrichi (apprentissage progressif maintenu)

**Rapport basique (0 → 39 de confiance)**
- Tier de l'équipe (Tier 1 majeure / Tier 2 compétitive / Tier 3 émergente)
- Style de composition en tags visuels (Engage, Poke, Scaling, Teamfight…) dérivés des pools de champions
- Force par phase (Early / Mid / Late) calculée depuis le `phasePower` des champions du pool — la phase dominante est mise en or

**Rapport avancé (40 → 74)**
- Pool de champions **par rôle** (TOP : Rumble · Gnar, MID : Azir · Viktor…) au lieu du top 3 global
- Profils des joueurs avec leurs **traits** et implications tactiques (IGL, Vétéran, Tiltable, Clutch…)
- **Bilan H2H** : résultat de tes confrontations officielles passées contre cette équipe

**Rapport premium (75+)**
- Tableau joueurs enrichi : **Shotcalling et Mental** ajoutés aux colonnes Lane / TF / Méca
- **Forme individuelle** de chaque joueur (🔥 chaud / ➡️ neutre / 📉 en baisse)
- **Counter-picks suggérés** par rôle (si adversaire joue Orianna MID → Ahri score 85)
- **Flex picks** adverses identifiés (surprises potentielles en draft)
- **Joueur à surveiller** : celui dont le potentiel dépasse le niveau actuel de l'équipe

---

## [1.11.8] — 2026-06-26

### Modifié
- **Draft — noms des joueurs** : les colonnes de picks affichent désormais le nom du joueur à la place du rôle (TOP → Caps, JUNGLE → Jankos, etc.) pour les deux équipes. Si un joueur est introuvable pour un rôle, le nom de rôle reste affiché en fallback.

---

## [1.11.7] — 2026-06-26

### Modifié
- **Accueil — Prochain match** : la zone affichait toujours "À définir". Elle indique désormais la compétition active et le prochain adversaire selon le contexte : saison régulière (`Spring Split · J3 · vs FNC`), playoffs (`Playoffs · vs T1`), phase de groupes internationale (`MSI 2027 · Phase de groupes · vs BLG`) ou bracket international (`Worlds 2027 · Bracket · vs G2`). Se met à jour à chaque retour sur l'écran Accueil.

---

## [1.11.6] — 2026-06-25

### Ajouté
- **Nouveau champion : Locke** (patch 26.13) — AP assassin/skirmisher MID (rôle secondaire JUNGLE). Difficulty 4, tags `dive / pick / scaling`, phase early 7 / mid 8 / late 6. Disponible en draft dès l'installation ; absent des pools de joueurs au départ (à débloquer via Champion ciblé). 22 matchups défavorables (X bat Locke) et 8 matchups favorables (Locke bat X) ajoutés dans `data_counters.js`. Données issues de `CDC/lol_esports_locke_counters_2026.xlsx` — valeurs à affiner dans une version ultérieure.

---

## [1.11.5] — 2026-06-23

### Modifié
- **Score de série avec acronymes** — le label au-dessus du timer affiche désormais les abréviations des deux équipes de part et d'autre du score, ex. `BO3 - Game 2 · G2 2 - 0 GX`.

---

## [1.11.4] — 2026-06-23

### Ajouté
- **Guide des objectifs d'entraînement** — chaque objectif de scrim affiche désormais une carte enrichie dès sa sélection : icône, description, barres de gains (●●● / ●●○ / ●○○), cas d'usage idéal et mise en garde. Un bouton **? Guide** ouvre une modale défilable comparant les 5 objectifs côte à côte, accessible à tout moment depuis l'écran Entraînement.

---

## [1.11.3] — 2026-06-23

### Corrigé
- **Calendrier varié entre les saisons** — l'ordre des adversaires en saison régulière était toujours identique (Spring = Summer = saison suivante). Les équipes IA sont désormais mélangées aléatoirement (Fisher-Yates) à chaque début de saison, en conservant le joueur en position fixe du round-robin. Le format (tout le monde affronte tout le monde une fois) est inchangé.

---

## [1.11.2] — 2026-06-23

### Ajouté
- **Tooltip gains par compétition** — survoler la bulle 💰 Budget ou ⭐ Prestige en haut de l'écran affiche une popup récapitulant les récompenses (budget, prestige, coaching) pour chaque placement en saison régulière, MSI et Worlds.

---

## [1.11.1] — 2026-06-23

### Corrigé
- **Régression Training / Draft / Scouting** — les menus de sélection de champion affichaient « undefined (nouveau) » au lieu des noms. Cause : la fonction `getChampionsForRole` ajoutée en v1.11.0 pour la génération de remplaçants IA (retournant des chaînes) écrasait la version originale (retournant des objets champion), cassant tous les appels `.name` / `.id`. Fix : suppression du doublon ; `generateAIReplacement` appelle désormais `getChampionsForRole(role).map(c => c.name)` pour extraire les noms.

---

## [1.11.0] — 2026-06-23

### Ajouté
- **Rotation des effectifs IA** — les rosters adverses vivent enfin : à la fin de chaque saison Worlds, les joueurs IA qui atteignent leur âge de retraite quittent leur équipe et sont remplacés par un **jeune talent généré** (18–22 ans, `potential > niveau`) au **niveau moyen de l'équipe ± 3**, avec un pool de 5 champions cohérent avec son rôle, des masteries et un nom fictif varié. La hiérarchie par tier reste ainsi stable saison après saison.
- **Journal des transferts** — nouvelle section dans l'onglet Transferts qui retrace, **saison par saison** (10 dernières années), tous les mouvements : retraites et arrivées IA, fins de contrat et signatures de votre équipe. Stockage compact et plafonné.
- **Réglages du monde (onglet Progression)** — deux interrupteurs pour adapter l'expérience :
  - **Rotation des effectifs IA** : activer/désactiver le vieillissement des équipes adverses (désactivé = les rosters restent figés, « T1 reste T1 »).
  - **Âge & contrats de mon équipe** : activer/désactiver le vieillissement et la gestion des contrats de vos joueurs (désactivé = effectif figé, sans prolongations à gérer ; la progression de niveau reste active).
- **Popup d'accueil 1.11.0** — au premier lancement de cette version, une fenêtre explique les nouvelles mécaniques et laisse choisir les deux réglages directement, en rappelant qu'ils sont modifiables à tout moment dans Progression.

### Technique
- Nouvelles fonctions : `applyAIRetirementRotation`, `generateAIReplacement`, `getChampionsForRole`, `pickReplacementName`, `logTransfer` / `logAIRotation`, `renderTransferJournal`, `worldSettingsHtml` / `wireWorldSettings`, `maybeShowOnboarding1110`. `applyAICareerProgression` lit désormais `player.potential` (compatible avec les remplaçants générés). Nouveaux champs persistants : `state.transferLog`, `state.settings.aiRotation`, `state.settings.playerContracts`, `state.settings.seenOnboarding1110`.

---

## [1.10.4] — 2026-06-22

### Modifié
- **Worlds — bracket centré et noms complets** : les arbres de la phase finale (upper bracket, lower bracket, grande finale) étaient tassés à gauche ; ils sont désormais **centrés horizontalement** et prennent davantage de place (cartes élargies, espacements plus larges), tout en conservant le centrage vertical. Sur écran large (≥ 900 px), les cartes affichent le **nom complet** des équipes (ex. « CTBC Flying Oyster » au lieu de « CFO ») ; sur petit écran (smartphone/tablette), l'abréviation est conservée pour la lisibilité.

---

## [1.10.3] — 2026-06-22

### Modifié
- **Worlds — le bracket s'alimente match par match** : les blocs suivants (demis UB, finale UB, tours du lower bracket…) affichent désormais les équipes qualifiées **dès que les matchs sources sont joués**, sans attendre la fin de l'étape. Exemple : si les Quarts 1 et 2 sont terminés mais que le Quart 3 (votre match) est encore en attente, la Demi UB 1 et le LB Tour 1 affichent déjà leurs équipes au lieu de « TBD ». Nouvelle fonction `propagateDoubleBracket` (purement visuelle, n'avance pas la compétition).

---

## [1.10.2] — 2026-06-22

### Corrigé
- **Worlds — alignement visuel de l'upper bracket** : les demi-finales upper bracket n'étaient pas centrées verticalement par rapport à leurs quarts (Demi 1 collée au Quart 1, Demi 2 collée au Quart 4), ce qui rendait les lignes de liaison asymétriques. Demi UB 1 est désormais centrée sur le couple Quart 1/Quart 2 et Demi UB 2 sur le couple Quart 3/Quart 4 → liaisons centrées et symétriques.

---

## [1.10.1] — 2026-06-22

### Modifié
- **Worlds — 3e place mieux récompensée** : le perdant de la finale lower bracket (3e) constitue désormais un palier distinct du 4e, pour valoriser son parcours plus long. Récompenses 3e : **165 budget / 120 coaching / 13 prestige** (au lieu de 143 / 105 / 11, identiques au 4e auparavant). Le 4e et les autres places sont inchangés ; le barème domestique et le MSI ne sont pas affectés.

---

## [1.10.0] — 2026-06-22

### Ajouté
- **Worlds en double élimination** — la phase finale des Worlds adopte le format réaliste à upper/lower bracket (le MSI reste en simple élimination). Les 8 qualifiés des groupes entrent dans un **upper bracket** (Quarts → Demis UB → Finale UB) ; chaque défaite fait basculer dans le **lower bracket** (LB Tour 1 → LB Tour 2 → LB Demi → LB Finale), où une 2ᵉ défaite élimine. Le vainqueur de l'upper et le survivant du lower s'affrontent en **grande finale** (BO5). 14 séries au total au lieu de 7.
  - **Classements distincts** : 1er (vainqueur grande finale), 2e (finaliste), 3e (perdant LB Finale), 4e (perdant LB Demi), 5e-6e (perdants LB Tour 2), 7e-8e (perdants LB Tour 1). Les récompenses budget/prestige suivent ce classement via le barème existant (multiplicateur Worlds ×1.5).
  - **Nouveau visuel** : bracket sur 3 sections (Upper / Lower / Grande Finale) avec connecteurs, états colorés (qualifié, prochain match, éliminé) et bloc champion.
  - Le modal d'intro des Worlds décrit désormais le format double élimination.

### Technique
- Modèle de bracket étendu (`type: 'double'`, machine d'étapes `qf → r2 → r3 → lb5 → lb6 → gf`). Nouvelles fonctions : `advanceDoubleBracket`, `buildDoubleBracketHtml`, `drawIntlBracketLines`, `loserOf`, `intlMatchLabel`. `buildInternationalBracket`, `processInternationalBracketRound` et `getInternationalPlacement` gèrent les deux formats. Moteur de phase de groupes et MSI inchangés.

---

## [1.9.4] — 2026-06-22

### Corrigé
- **Phase de groupes internationale jouée deux fois** — au démarrage du MSI/Worlds, les groupes 100 % IA (sans le joueur) voyaient leur journée 1 simulée deux fois : chaque équipe affichait 1V-1D (2 séries) alors qu'un seul match aurait dû être joué, pendant que le groupe du joueur restait à 0-0 et que l'en-tête indiquait toujours « Journée 1/3 ». Cause : deux points d'entrée déclenchaient la simulation (l'effet de bord du rendu du calendrier **et** le bouton « C'est parti ! » du modal d'intro), et un appel « frais » repartait du groupe 0 sans que la journée se soit incrémentée. Ajout d'une garde dans `processInternationalGroupMatchday()` : un démarrage sans argument ne resimule plus une journée déjà lancée et en attente du match du joueur. Le déroulé reprend désormais un seul round par journée pour tous les groupes.

---

## [1.9.3] — 2026-06-22

### Ajouté
- **Boucle de qualification MSI ↔ Worlds (système réaliste)** — les places internationales de chaque région ne sont plus figées, elles se gagnent sur la scène internationale :
  - **MSI → Worlds (même année)** : le vainqueur du MSI ouvre une **3ᵉ place Worlds** pour sa région. Une place structurelle majeure (LCK par défaut) complète les 16 qualifiés ; si une majeure remporte le MSI, la place structurelle **glisse** vers l'autre majeure pour éviter qu'une région ait 4 équipes (LCK et LPL restent alors toutes deux à 3).
  - **Worlds → MSI (année suivante)** : le vainqueur des Worlds ouvre une **2ᵉ place MSI** pour sa région au printemps suivant.
  - **Filet de sécurité (année 1 / vieilles sauvegardes)** : tant qu'aucun vainqueur n'est encore enregistré, la place bonus revient par défaut à la région du joueur — le MSI reste à 8 équipes, les Worlds à 16.
  - **Conséquence gameplay** : la 3ᵉ place Worlds et la 2ᵉ place MSI de votre région ne sont plus automatiques. Hors LCK/LPL, il faut désormais gagner le tournoi international correspondant pour les débloquer.

### Modifié
- **Messages d'intro de saison** — la section « Qualification » indique le nombre exact de places de votre région (1, 2 ou 3 selon le contexte), n'affiche le palier « finaliste » que si la région a au moins 2 places, et ajoute une note expliquant l'origine de la place bonus (région vainqueure du tournoi précédent).

### Technique
- Deux champs persistants : `lastMsiWinnerRegion` et `lastWorldsWinnerRegion`, renseignés à la fin de chaque événement international dans `finishInternational()` et restaurés au chargement des sauvegardes. Logique centralisée dans `getRegionRepCounts()` ; moteur de phase de groupes inchangé (total d'équipes constant).

---

## [1.9.2] — 2026-06-21

### Modifié
- **Nouveau logo (logoV2.png)** — logo principal remplacé dans le jeu, le header et l'écran d'accueil. Icônes PWA régénérées : `icon-512.png` (512×512), `icon-192.png` (192×192), `apple-touch-icon.png` (180×180 iOS). Favicons navigateur : `favicon-32.png` et `favicon-16.png` avec balises `<link sizes>` dans `index.html` pour une meilleure prise en charge multi-navigateur.

---

## [1.9.1] — 2026-06-21

### Corrigé
- **Scouting — noms d'équipes invisibles** : les boutons de sélection d'équipe adverse n'avaient pas de couleur de texte explicite et héritaient d'une valeur sombre sur fond sombre. Ajout de `color: var(--color-text)` sur `.comp-tag-option` dans `style.css`.

---

## [1.9.0] — 2026-06-21

### Ajouté
- **IA de draft non-linéaire (counter-pick)** — l'IA ne suit plus strictement l'ordre TOP→JUNGLE→MID→ADC→SUPPORT. À chaque pick, elle cherche d'abord un rôle vide où le joueur a déjà choisi un champion qu'elle peut contrer dans la même lane (via `data_counters.js` + repli sur les counterTags), et y répond en priorité. Si aucun contre pertinent, elle retombe sur l'ordre habituel (confort pick). L'agressivité est pilotée par `riskTolerance` du profil IA : une équipe prudente ne contre pas systématiquement, ce qui la garde imprévisible. Nouvelles fonctions : `aiChampCounters`, `aiCandidateForRole`, `aiChoosePick` réécrit.
- **Affichage champion contextuel au rôle (flex picks)** — pendant un pick, le liséré de confort d'un champion reflète désormais la maîtrise du joueur **du rôle en cours de sélection**, et non plus le meilleur score tous rôles confondus. Exemple : Twisted Fate maîtrisé 93 par le mid et 7 par le top affiche un liséré or quand on picke pour le mid, mais faible quand on picke pour le top.
- **Tooltip multi-joueurs sur les champions de draft** — au survol d'un champion, la bulle liste désormais **tous** les joueurs du roster qui savent le jouer, avec leur rôle, leur maîtrise et un ⚠ « peu maîtrisé » si < 25. Nouvelle fonction `getAllRosterComforts`.

---

## [1.8.11] — 2026-06-21

### Modifié
- **Carte joueur (marché des transferts)** — l'âge s'affiche désormais sur sa propre ligne entre le nom et la ligne "Rôle — Équipe", cohérent avec l'affichage du roster.

---

## [1.8.10] — 2026-06-20

### Modifié
- **Tooltips retraite — compatibilité mobile/tablette/Mac** : les badges ⚠ retraite et "impossible (limite 33 ans)" utilisent désormais `data-lore-tooltip` + délégation globale au clic en plus du `title` natif. Un tap/clic affiche le message via toast, ce qui fonctionne sur tous les appareils.

---

## [1.8.9] — 2026-06-20

### Ajouté
- **Tooltips de retraite (immersion/lore)** — survoler le badge ⚠ retraite W{N} affiche : *"Choix personnel : {joueur} a décidé de mettre fin à sa carrière à {age} ans. Une prolongation reste possible, mais à des conditions exceptionnelles (×1.5)."* Survoler le texte "impossible (limite 33 ans)" affiche : *"La réglementation ne permet pas de jouer après 33 ans."*

---

## [1.8.8] — 2026-06-20

### Modifié
- **Carte joueur (roster)** — l'âge est maintenant affiché sur sa propre ligne entre "Rôle — Nationalité" et la date de fin de contrat, au lieu d'être accolé sur la même ligne que la nationalité.

---

## [1.8.7] — 2026-06-20

### Équilibrage
- **Renouvellements de contrat — budget revus à la hausse** : Superstar 💰100/185, Star 💰75/140, Solide 💰50/95, Role 💰30/55 (prestige inchangé). Les négociations de carrière ×1.5 s'appliquent sur ces nouveaux montants.
- **Gains budget par compétition — +60%** : 1er split 100→160, 2e 80→125, 3e-4e 60→95, 5e-6e 40→65, 7e-8e 20→35, 9e-10e 0→15. Les tournois internationaux (MSI ×1.25 / Worlds ×1.5) héritent automatiquement de ces nouvelles bases. Les éliminations en phase de groupes internationale donnent désormais 19 budget (MSI) et 23 budget (Worlds) au lieu de 0.

---

## [1.8.6] — 2026-06-20

### Équilibrage
- **Coûts de renouvellement de contrat revus à la hausse** — les budgets étaient trop bas par rapport aux prix du marché des transferts (renouveler une Star coûtait 22 budget, recruter un remplaçant plus faible en coûtait 61). Nouveau barème aligné sur le marché : Superstar 💰65/120, Star 💰50/90, Solide 💰35/65, Role player 💰20/38. Les exigences de prestige restent inchangées.

---

## [1.8.5] — 2026-06-20

### Ajouté
- **Négociation de carrière (prolongation au-delà de la retraite prévue)** — quand une extension dépasse `retirementAge` mais reste dans la limite absolue de 33 ans, un mode "négociation de carrière" s'active : coût x1.5 (prestige et budget, arrondi au supérieur), bouton ⭐ ambré distinctif, bannière explicative dans le modal.
- **Limite absolue infranchissable à 33 ans** (`playerAbsoluteRetirementYear`) — au-delà, le bouton est remplacé par un texte "impossible (limite 33 ans)". Garde de sécurité identique dans `extendContract`.
- **`getExtensionType(p, years)`** — retourne `'normal'`, `'special'` ou `'blocked'`, utilisé par tous les points de décision (bouton, modal, fonction d'extension).

---

## [1.8.4] — 2026-06-20

### Ajouté
- **Système d'âge joueurs** — chaque joueur a désormais un `baseAge` (âge en saison 1) et un `retirementAge` (âge de retraite). L'âge s'affiche sur les cartes du roster et du marché des transferts. `data_teams.js` (330 joueurs) et `data_transfers.js` (75 joueurs) ont été enrichis depuis l'Excel `lol_esports_update_2026_contracts_age.xlsx`.
- **Boutons de prolongation intelligents** — si une prolongation dépasse l'âge de retraite, le bouton est remplacé par un texte explicatif ("impossible – retraite W{N}"). Un avertissement ⚠ rouge apparaît sur la carte quand la retraite est dans ≤ 2 saisons.
- **Note de retraite dans le modal de prolongation** — quand le contrat proposé court exactement jusqu'à la retraite, un message ⚠ l'indique clairement.
- **Migration rétroactive** — les sauvegardes existantes reçoivent `baseAge`/`retirementAge` au chargement (lookup par nom dans AI_TEAMS/TRANSFER_PLAYERS, sinon assignation aléatoire par tier). Couvre `loadGame`, `importSave`, `cloudImport` et `confirmTeamSelection`.
- **Joueurs générés/recrutés** — les nouvelles recrues sans âge dans les data files reçoivent un âge aléatoire cohérent avec leur tier à la signature.

---

## [1.8.3] — 2026-06-20

### Ajouté
- **Limite de prolongation : une seule fois par joueur par saison** — il n'était pas possible d'empêcher l'abus de cliquer plusieurs fois sur +1 an / +2 ans pour un même joueur. Désormais, dès qu'un joueur est prolongé, un champ `contractExtendedYear` est enregistré. Toute tentative supplémentaire pendant la même saison affiche un message clair et les boutons sont remplacés par un badge « ✓ Prolongé cette saison ».

---

## [1.8.2] — 2026-06-20

### Corrigé
- **Boutons « +1 an / +2 ans » sans effet au clic** — les boutons étaient rendus `disabled` quand la fenêtre était fermée ou le coût non payable ; or un bouton désactivé n'émet aucun clic → « rien ne se passe », sans explication. Les boutons sont désormais toujours cliquables et un message clair indique le blocage (mercato fermé, prestige ou budget insuffisant).

### Modifié
- **Fenêtre de prolongation transformée en vrai « mercato »** (`state.mercatoOpen`) — auparavant ouverte seulement sur l'écran de récap MSI/Worlds (refermée dès le clic « Continuer »), un piège. Désormais : le mercato s'ouvre à la fin du MSI/Worlds **et reste ouvert toute la pré-saison suivante**, jusqu'au 1er match du split. Bannière d'état claire (🟢 ouvert / 🔒 fermé) dans la section contrats. Migration : les sauvegardes existantes ouvrent le mercato par défaut (prolongations possibles immédiatement).

---

## [1.8.1] — 2026-06-20

### Corrigé
- **Contrats « Worlds undefined » sur les sauvegardes importées** — les chemins d'import (fichier `importSave` et cloud `cloudImport`) affectaient l'état directement (`state = parsed`) sans passer par la migration de `loadGame`, laissant `contractUntil` indéfini → affichage « Wundefined / Worlds undefined » dans la section contrats.
  - Appel de `ensureRosterContracts(0)` après import (fichier **et** cloud) : les joueurs sans contrat reçoivent une échéance pondérée par tier, ancrée sur l'année en cours.
  - Une sauvegarde déjà importée se répare au simple rechargement (la migration de `loadGame` rattrape les `contractUntil` indéfinis du localStorage).

---

## [1.8.0] — 2026-06-20

### Ajouté
- **Système de contrats joueurs** — chaque joueur du roster est désormais engagé jusqu'à la fin d'un Worlds donné (« jusqu'à Worlds 1 », « Worlds 2 »…). L'échéance est affichée sur sa carte (avec alerte ⚠ « dernière année »).
  - **Génération pondérée par tier** : les superstars/stars sont sécurisées plus longtemps (souvent +1 an) que les role players. Vaut pour les nouvelles parties **et** rétroactivement pour les sauvegardes existantes (migration au chargement, ancrée sur l'année en cours — aucune donnée perdue).
  - **Prolongations en inter-saison** (après le MSI ou les Worlds), depuis le marché des transferts, section « Mon effectif — contrats » : +1 an ou +2 ans, au coût tier-scalé.
  - **Le prestige est une exigence (seuil, non décrémenté), le budget est payé** — même logique que les scrims hors-région. Barème : Superstar P50/💰30 (1 an) · P70/💰60 (2 ans), Star P35/💰22 · P50/💰45, Solide P20/💰15 · P32/💰30, Role player P8/💰10 · P15/💰20.
  - **Expiration = départ** : un contrat non prolongé à la fin des Worlds → le joueur quitte l'équipe (annonce dédiée), laissant un poste à pourvoir.
  - **Signature sur poste vacant** : le marché des transferts permet désormais de signer sans libérer de joueur quand un poste est vide. Les recrues reçoivent un contrat (≥ 1 an).

---

## [1.7.8] — 2026-06-20

### Corrigé
- **Palmarès : qualifications MSI/Worlds comptées plusieurs fois** — un clic répété sur « Continuer vers le MSI/les Worlds » (possible à l'époque du bug d'enchaînement v1.6.2) appelait `startInternational` plusieurs fois, incrémentant le compteur de qualifications à chaque clic et réinitialisant les groupes.
  - Ajout d'une garde anti-double-appel : si un événement international est déjà en cours, `startInternational` ne le relance pas (les groupes et le palmarès ne sont plus recomptés).
  - Bug de comptage uniquement : aucune incidence sur le déroulement des compétitions.

---

## [1.7.7] — 2026-06-20

### Corrigé
- **Popup d'intro de saison : nombre de qualifiés pour l'international** — la popup annonçait toujours « les 2 meilleures équipes » quel que soit le split, alors que le Summer Split qualifie **3 équipes** de la région du joueur pour les Worlds (contre 2 pour le MSI au Spring).
  - Le nombre est désormais dérivé de la même source que la qualification réelle (`getRegionRepCounts`) → plus aucun écart possible.

### Ajouté
- **Détail des qualifiés pour le MSI/Worlds dans la popup d'intro** — explication de qui se qualifie et comment :
  - Le champion des playoffs.
  - Le finaliste (perdant de la grande finale).
  - (Worlds uniquement) Le meilleur demi-finaliste éliminé, départagé selon le classement de la saison reguliere (meilleur seed).

---

## [1.7.6] — 2026-06-20

### Corrigé
- **Scores inversés dans l'arbre de phase finale** — sur l'écran de synthèse (saison, MSI, Worlds), les scores de chaque série étaient affichés à l'envers (le gagnant montrait le score du perdant et inversement), par ex. une défaite 0-3 affichée comme 3-0.
  - Cause : `scoreA`/`scoreB` sont stockés selon deux conventions différentes (home/away pour les matchs IA, joueur/adversaire pour le match du joueur), alors que l'affichage supposait `scoreA` = score du gagnant.
  - Fix : `poBracketCard` déduit désormais le score de chaque équipe via un invariant fiable — dans une série, le gagnant a toujours plus de manches que le perdant (`max`/`min` de scoreA/scoreB). Robuste pour tous les cas (joueur/IA, home/away, saison/international).
  - Bug purement visuel : les sauvegardes existantes sont saines, l'affichage se corrige automatiquement.

---

## [1.7.5] — 2026-06-20

### Corrigé
- **Arbre de phase finale : lignes de connexion en angles droits uniquement** — certains connecteurs étaient tracés en diagonale lorsqu'un bloc cible n'était pas pile au centre vertical de ses deux sources, et le trait Finale → Vainqueur faisait un coude inutile.
  - `connect()` : la barre verticale s'étend désormais jusqu'à la hauteur exacte de la cible, puis un trait horizontal entre dans la cible → angle droit garanti, plus aucune diagonale.
  - `single()` (Finale → Vainqueur) : trait parfaitement droit quand les blocs sont alignés verticalement, coude en L uniquement si nécessaire.
  - **Bloc Vainqueur aligné sur la Finale** : la colonne Vainqueur avait un label sur 1 ligne (`&nbsp;`) contre 2 lignes pour la Finale, décalant son centrage vertical et créant un zigzag inutile. Label uniformisé sur 2 lignes → Finale et Vainqueur exactement à la même hauteur, connecteur en ligne droite (saison + international).

---

## [1.7.4] — 2026-06-20

### Amélioré
- **Les maîtrises de l'IA évoluent dans le temps** — auparavant figées, les maîtrises champion des équipes IA progressent désormais à chaque fin de split, pour qu'elles restent compétitives saison après saison (et n'accumulent plus un retard permanent face à un roster joueur qui, lui, s'entraîne).
  - **Portée** : seuls les **champions signature** (top 3 maîtrises de chaque joueur) progressent — l'IA se spécialise, et sortir une équipe de ses champions de confort (bans/scouting) reste un levier tactique fort.
  - **Vitesse** : +1 par split (+2 pour les rookies), en parallèle de la progression de niveau existante.
  - **Plafond** : 100.
  - Appliqué dans `applyAICareerProgression` (fin de saison), répercuté en match via la copie évolutive `state.aiRosters`.

---

## [1.7.3] — 2026-06-20

### Amélioré
- **Maîtrise réelle des champions de l'IA en match** — auparavant, l'IA jouait tous ses champions avec une maîtrise figée à 40, quel que soit le champion : les grosses équipes (T1, Gen.G, G2…) étaient artificiellement faibles, rendant les matchs trop faciles pour un roster développé.
  - L'IA utilise désormais sa **vraie maîtrise** par champion (données `championPool`/`masteries` de `data_teams.js`, déjà présentes). Une équipe sur ses champions signature devient un véritable mur (maîtrise 90-100).
  - **Récompense le scouting et les bans** : forcer une équipe hors de son pool de confort (en bannissant ses mains) réduit sa maîtrise à 35 — un vrai levier tactique en draft.
  - Aucune asymétrie en faveur du joueur : le calcul de puissance par événement reste identique pour les deux camps.
  - La simulation IA vs IA (matchs de groupe sans le joueur) est inchangée (pas de draft, basée sur le niveau moyen du roster).

---

## [1.7.2] — 2026-06-19

### Corrigé
- **Phase de groupes internationale (MSI/Worlds) : pairings IA skippés** — après que le joueur terminait son match dans un groupe, les pairings suivants du même round (ex. CFO vs FUR) n'étaient jamais simulés. Résultat : certaines équipes restaient à 0 match joué tandis que d'autres cumulaient des défaites impossibles sur une même journée.
  - Cause : `resolveInternationalSeries` appelait `processInternationalGroupMatchday(finishedGroup + 1)` — sautant directement au groupe suivant au lieu de continuer depuis le pairing suivant dans le même groupe.
  - Fix : `pendingMatch` stocke maintenant `pairingIndex`; après le match du joueur, la reprise se fait depuis `processInternationalGroupMatchday(finishedGroup, finishedPairingIndex + 1)`.

---

## [1.7.1] — 2026-06-19

### Amélioré
- **Scrims : bonus de gains selon le tier de l'adversaire** — s'entraîner contre une équipe d'élite rapporte davantage que contre une équipe de bas tableau.
  - Tier 1 (T1, Gen.G, BLG…) : **+20 %** sur tous les gains (maîtrise champion, composition, matchup, macro, forme).
  - Tier 2 : **+10 %**.
  - Tier 3+ : aucun bonus (inchangé).
  - Le bonus s'applique à tous les objectifs de scrim via le `resultFactor`.

---

## [1.7.0] — 2026-06-19

### Ajouté
- **Système de prestige pour les scrims** : les équipes hors-région de tier élevé peuvent désormais refuser une demande de scrim si le prestige du joueur est insuffisant.
  - Tier 1 (T1, Gen.G, BLG, JDG…) : **75 prestige** requis.
  - Tier 2 : **40 prestige** requis.
  - Tier 3+ : aucune restriction.
  - **Exemption région** : les équipes de la même région que le joueur acceptent toujours.
  - **Exemption tournoi partagé** : si le joueur et l'équipe cible sont tous deux qualifiés au même tournoi international actif (MSI ou Worlds), l'équipe accepte et un message l'explique.
  - **En cas de refus** : 100 % des points de coaching engagés (intensité choisie) sont consommés, et une modale explicative indique la cause (prestige insuffisant, staff mobilisé en vain).
  - **Indicateur dans le sélecteur d'adversaire** : chaque équipe affiche son seuil de prestige requis, avec un ✓ si le joueur le remplit, ⚠ sinon, ou ★ si une exemption tournoi s'applique.

---

## [1.6.2] — 2026-06-19

### Corrigé
- **Fin de playoffs → MSI/Worlds** : après avoir cliqué "Continuer vers le MSI" (ou Worlds) et confirmé dans la popup "C'est parti !", rien ne se passait et l'écran revenait à la récapitulation. Cause : `showView('calendar')` était appelé avant `processInternationalGroupMatchday()`, provoquant un `TypeError` (`pendingMatch` était encore `null`). Corrigé en inversant l'ordre des appels + garde défensive dans `renderInternationalGroups`.

---

## [1.6.1] — 2026-06-19

### Corrigé
- **Écran Champions** : dans la fiche détail d'un champion, les noms des champions counter (panneaux « X contre » et « Contré par ») s'affichaient en noir sur fond sombre. Texte passé en blanc (`var(--color-text)`).

---

## [1.6.0] — 2026-06-19

### Ajouté
- **Roster complet des champions de League of Legends** : la base passe de 90 à **172 champions** (liste officielle Riot complète), répartis sur les 5 rôles (TOP 38, JUNGLE 41, MID 43, ADC 24, SUPPORT 26).
- **Base de counters étendue** : de 1 120 à **4 259 matchups de counter** effectifs prêts pour la draft, scorés et tracés (contexte, tags communs, conseil de draft, raison gameplay). Chaque champion dispose désormais de données de counter.
- **Nouvel écran Champions** (menu entre Draft et Counters) : liste des 172 champions avec filtre par rôle (boutons) et champ de recherche. Un clic ouvre la fiche du champion — caractéristiques (rôle, difficulté, puissances early/mid/late, objectifs, style, synergies, profils contrés), liste complète des champions qu'il counter et de ceux qui le contrent (chaque ligne cliquable pour naviguer de fiche en fiche). Flèche « ← Retour » pour revenir à la liste.

### Détails techniques
- `data_champions.js` et `data_counters.js` régénérés depuis `lol_esports_update_2026_full_champion_counters.xlsx` (feuilles *Champions_All_Complete* et *ChampionCounters_Complete*).
- Format et fonctions d'accès inchangés (`getChampionByName`, `getChampionById`, `getCounterEntry`) → compatibilité totale : les 75 champions référencés par les rosters existants résolvent tous correctement.
- Correction au passage : le support Renata Glasc portait le nom « Renata » dans l'ancienne base (les rosters utilisaient « Renata Glasc ») — désormais aligné.

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
