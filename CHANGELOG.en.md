# Changelog

All notable changes to the project are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.16.6] — 2026-07-14

### Added — Post-game recap screen

At the end of a game, a new **Recap** button appears next to the "Next game" button. It opens a broadcast-style recap screen, full-width on PC and adapted for mobile:

- **Header**: each team's name (blue on the left, red on the right), its kill count, and the game duration in the center. A themed band recalls the competition and format.
- **Left column**: the game's team stats (turrets, dragons, elder dragons, barons, rift heralds, void grubs) and the game's bans. KDA and per-team gold aren't shown (the engine doesn't track these at the individual level).
- **Right column**: the **gold difference over time** curve, drawn across the whole game. The curve is **two-toned** — blue while the blue team leads, red while the red team leads, switching color at each crossing of the balance line. Hovering the curve shows a tooltip with the minute and the gold difference, in the color of the team that was ahead at that moment.

---

## [1.16.5] — 2026-07-13

### Changed — Draft: previous games' picks history (instead of bans)

The block at the bottom of the draft screen used to show the previous games' bans, which wasn't very useful. Now:

- The **current game's bans** are always displayed (dedicated block).
- Below them, **each team's picks from the games already played** in the same series (your picks and the opponent's) — far more useful to anticipate compositions.
- Past picks are **column-aligned** with the current game: your picks always appear on the same side (left/right) as on the current board, regardless of which side you played in previous games. They are stored per team (not per blue/red side, which can change from game to game).

---

## [1.16.4] — 2026-07-12

### Added — Detailed player card with illustrated champion pool

On the Roster screen, clicking a player's card now opens their detailed card as an overlay (same data as the card: level, stats, traits). Between the gauges and the champion pool, the card also shows the player's **split-by-split level evolution**, with an explanatory note (also added to the Progression screen) clarifying that this score tracks the internal progression toward potential, distinct from the level shown at the top of the card (average of the 5 stats). The champion pool is shown with thumbnail portraits, **sorted from highest to lowest comfort**, each champion colored by mastery tier (Elite in solid gold, Signature with a gold border, Comfort in green, Workable in blue, Discovery in grey) and accompanied by its mastery score. Clicking outside the card closes it.

---

## [1.16.3] — 2026-07-11

### Added — Full-size portrait on the champion detail sheet

On a champion's detail sheet, clicking its portrait now shows it large, at full size, in an overlay. Clicking anywhere else closes it.

---

## [1.16.2] — 2026-07-10

### Changed — Much lighter champion portraits

Portraits weighed up to 2.5 MB each (390 MB for all 173 champions), which slowed down the first load despite the caching added in 1.16.1. Two formats are now used:

- **Lightweight thumbnail (~75 KB)**: the Champions screen, draft (picks, bans, grid) and match mini-map now use a compressed, resized version.
- **Full image**: a champion's detail sheet (the only place the portrait is shown large) still uses the original, full-quality image.

---

## [1.16.1] — 2026-07-09

### Fixed — Much faster champion portrait loading

Champion portraits (draft, Champions screen, match mini-map) were being re-downloaded every time, which made loading slow. The service worker now caches each portrait the first time it's viewed: every time after that, the image shows up instantly from the device, without going back to the network — even across future game updates (only the app code is refreshed each version, not the images already downloaded).

---

## [1.16.0] — 2026-07-08

### Added — Champion portraits and a redesigned draft screen

> ℹ️ The champion portraits added in this version are **AI-generated images**, not official Riot Games artwork.

- **Champion portraits**: pick/ban cards, each team's pick slots, and bans now show the champion's portrait (`img/champions/{id}.png`). As long as a champion doesn't have an image yet, its slot simply stays text-only — nothing breaks as images get added over time.
- **New draft screen layout**: your team's picks and the opponent's now flank the center area (turn banner, coach, filters, champion grid), modeled after professional draft tools. The portrait becomes the full-bleed background of each pick tile (cropped from the top to keep the champion's head visible), and the 5 slots per team now use all the available height.
- **Series ban history**: a new block at the bottom of the screen recaps the bans of the current game and every previous game of the same series (BO3/BO5), most recent first — the 5 thumbnails per team now spread across the full width, with the banned champion's name under each thumbnail.
- **Champions screen**: every card in the list now shows the champion's portrait, and its detail sheet shows the image in a large square (1:1) format.
- **Match map**: player bubbles on the mini-map now show the champion's portrait (cropped to a circle), at the same size as before.

---

## [1.15.6] — 2026-07-07

### Changed — Wider desktop layout

On PC, the screen was capped at 1400px wide and the side menu took up a fixed column on the left: on large monitors, this left a lot of unused space on either side.

- **Horizontal top bar navigation, even on desktop**: navigation now uses a horizontal bar at the top of the screen everywhere (PC as well as mobile), instead of a fixed side column.
- **Full-width content**: screens now use the full available width of the window, with spacing that scales progressively with screen size instead of content being centered in a narrow column.

---

## [1.15.5] — 2026-07-06

### Fixed — A game should never end without the nexus being destroyed

A match could be lost (or won) without the nexus ever being destroyed, simply because the in-game clock passed 55 minutes — a winner was then picked based on structural/gold/kill advantage. But just like in League of Legends, **the only win condition is nexus destruction**, no matter how long the actual game takes (60, 90 minutes or more). The forced time limit has been removed: a game can now run as long as needed, until a nexus is actually destroyed.

---

## [1.15.4] — 2026-07-05

### Added — Transfer journal filters

The journal (retirements, arrivals, contract endings, signings) was getting hard to read over the seasons. Two combinable filters were added at the top of the screen:

- **Region**: only shows movements from the selected region (your team follows its own region).
- **Team**: the list of available teams updates automatically based on the selected region.
- Filters aligned with the game's visual style (same styled selects as Training/Scouting).

### Fixed — False "retirement"/"arrival" entries under your own team's name

The journal could show one of your own players as retired and replaced (e.g. Canna), even though they were still present and active on your real roster. Cause: the AI retirement rotation was mistakenly touching an internal technical copy of your team, never displayed, that the rotation code couldn't tell apart from real opposing teams. Fixed: your team is never affected by this rotation anymore — only contracts/transfers you decide yourself now appear under its name in the journal. Any false entries already present in existing saves are purged automatically on load.

---

## [1.15.3] — 2026-07-04

### Fixed — AI player retirements (old saves)

On games started before ages were added (v1.8.4), AI rosters had never received their ages: they stayed frozen on default values, and **no AI player ever retired** — so the transfer journal stayed empty on the AI side, season after season.

- **AI roster age backfill on load**: every AI player without an age now recovers their `baseAge`/`retirementAge` by name match against the game data (random fallback consistent with their level for generated replacements). The backfill applied to the player's own roster since v1.8.4 finally covers the opposing teams too.
- **Smoothed generational turnover**: to prevent a "behind" save from seeing half the league retire at once, a cap now limits departures to **one per team per offseason** (the oldest players leave first, the others wait for the next offseason). The catch-up therefore happens gradually over a few seasons, then the pace normalizes.
- **Missing catch-up on imports**: loading a save from a file or from the cloud bypassed this age backfill (import paths separate from the normal load). Fixed: both now go through the same fix.
- **Stale rosters shown after a replacement**: the Scouting screen (and any other screen reading a region's team list) kept showing the old player after an AI retirement/replacement, while Draft and matches already showed the right one — `getAITeamsForRegion()` returned the raw teams from the game data instead of the up-to-date version. Fixed to always reflect the actual roster.

### Added — Scouting confidence drops after an AI replacement

A new player arriving on an AI team (following a retirement) is still an unknown to your staff: the team's scouting confidence now drops by 15 points (the equivalent of one less preparation match) on every replacement, capped at 0. The count of preparation scrims already played is unaffected — only the team's current knowledge decays.

- **A replacement stays "unknown" until a match has been played against their team**: their champion pool, profile/traits, draft priority (and detailed stats in the premium report) now show "Unknown — play a match or scrim against this team to find out" instead of their real data. As soon as a real match **or** a training scrim is played against that team, the player is revealed and the report returns to normal.

---

## [1.15.2] — 2026-07-03

### Added
- **Changelog translated to English**: the entire history (90 versions) is now available in English, displayed automatically when the game's language is set to English.
- **GitHub Gist help translated to English**: the 3-step setup guide (Progression → Cloud save) now switches with the game's language, like the rest of the interface.
- **Off-season scrims against all regions**: the Match screen now offers a region selector to face any team from any region, as was already the case for Training scrims.

---

## [1.15.1] — 2026-07-02

### Added — Guided tour

Several player reports asked for a tutorial to help newcomers find their way on first launch. Added a guided tour of the game:

- **Invitation popup** on first launch (new game **and** existing save), with an explicit choice: "Yes, please" / "No thanks".
- **12 steps**: one per main tab (Home, Roster, Training, Calendar, Draft, Scouting, Transfers, Journal, Sponsor, Progression), plus two zoom-ins on specific elements inside a screen (the resource bar top-right, team rest in Roster) — the corresponding screen shows in the background, the targeted element is highlighted with a golden halo over a dark veil, and a bubble explains what's there.
- "Next" button that advances and switches tabs automatically, "Skip tour" button available at any time.
- Replayable at will via a dedicated button in Progression.
- Bilingual FR/EN.

### Fixed — player feedback on the guided tour

- The **Journal** tab had been forgotten between Transfers and Sponsor.
- The very first bubble described the resources (top-right) while pointing at the Home button (top-left) — split into two distinct steps, each pointing at what it describes.
- Added a dedicated zoom on team rest in Roster, at a player's request.

---

## [1.15.0] — 2026-07-01

### Added — Sponsors

New **Sponsor** tab: your team must now negotiate a sponsorship contract every year-end, before starting the following season.

- **Mandatory renewal window**: at the end of Worlds, before starting the new year, a matrix of **6 offers** is presented (2 types × 3 tiers), drawn at random from a pool of **24 contracts**. A discreet banner warns that a sponsor decision is pending.
- **3 tiers**, unlocked by team prestige: Secure (10), Standard (50), Premium (75).
- **2 contract types**:
  - **Signature** — a fixed bonus paid at signing, in exchange for objectives to meet over the year (standing, regional title, international qualifications...). All objectives met → renewal with a compounded bonus the following year. Partially met → warning and renewal at a reduced amount. None met → immediate termination and refund of the bonus, capped at available budget (never negative); any shortfall converts into a loss of prestige.
  - **Results** — no signing bonus, paid continuously based on the results of each competition (domestic and international). Premium sponsors have a termination clause (missing the playoffs, or no international qualification over the year) that can end the contract mid-year.
- Locked tiers stay visible but locked in the matrix (required-prestige badge), to show the progress to aim for.
- Detailed contract sheet when clicking an offer (bonus, objectives, clauses), with explicit confirmation before signing.
- Sponsor journal (contracts signed, renewed, warnings, terminations, payouts).
- Bilingual FR/EN.

---

## [1.14.2] — 2026-06-28

### Added — New version available banner

Until now, a player had to guess that an update existed and force a full reload to get it. Now, a **discreet banner at the bottom of the screen** appears automatically as soon as a new version is detected:

- **Native detection**: relies on the Service Worker's `controllerchange` event (the browser compares `sw.js` to the server file automatically, no manual check code needed).
- **Offline-friendly**: if no connection is available (airplane mode, etc.), the check silently fails — no banner appears, the game launches normally on the version already cached. No forced interruption.
- **Non-intrusive**: discreet banner, no blocking popup; the player can carry on with their current game and reload whenever they like (a "Reload" button or dismissing the banner).
- **First-launch safeguard**: a new player (no previous version installed) never sees this banner on their first visit — only a genuine update (an active Service Worker replaced by a new one) triggers it.
- Bilingual FR/EN, consistent with the visual style of existing notifications.

---

## [1.14.1] — 2026-06-28

### Changed — Player feedback (Reddit)

- **Americas region renamed LCS** (instead of LTA) — display only, the internal id stays `LTA` so existing saves aren't broken. New `regionDisplayName()` helper. Effective immediately on an ongoing game, including one already started.
- **Bug fixed (found along the way)**: the `SCENARIO_WEIGHTS_BY_REGION.LCS` key was never reached because the region stored the id `LTA` — the Americas region was silently using LEC's default match scenario weights. The key is renamed `LTA` to finally be used.
- **Draft coaching assistant — counter-pick overhaul**: no longer suggests a counter against a banned champion or one already picked by an opposing role different from yours (reported bug: suggesting Ryze to counter an already-locked top-lane Gnar). The logic is now **per role**:
  - **Counter-pick**: best opportunity among the roles where the opponent has already locked a pick.
  - **Anticipation** (new): best opportunity among the roles not yet locked, based on the opponent's probable picks (comfort picks or pool).
  - For each, if the actual best counter is **not** in your pool, a distinct **"Ideal counter" card** appears next to the comfort card (or alone if there's no usable counter in the pool), with an explicit warning about mastery level (none / very low).
- **Gank and lane duels**: the log text now reflects the actual outcome of the action. If the current kill cap is reached (kill not counted), the text no longer claims a kill — several narrative variants (success / repelled attempt) for more credibility and variety.
- **Dragon Soul** added to the match log: a dedicated line appears as soon as a team secures its 4th dragon, in addition to the dragon capture line itself. Baron Nashor was already logged correctly (no change needed).

---

## [1.14.0] — 2026-06-28

### Added — Matchday schedule (regular season calendar)

Below the standings, a new **"Matchday schedule"** section lists all matchdays of the season, collapsible:
- **Past matchdays** (✓): all matches with their score, the winner highlighted.
- **Current matchday** ("IN PROGRESS" badge): expanded by default, shows the matchups to be played.
- **Upcoming matchdays**: scheduled matchups ("vs").
- Your match is highlighted in gold. Clicking a matchday expands/collapses it (accordion).

**Technical**: new field `state.season.matchResults[]` (structured scores per matchday, index = matchday − 1), populated both when you play your match and when AI matches are simulated. `recordMatchdayMatch()` helper. Compatible with existing saves (matchdays already played in an ongoing game have no detail, but everything works for new ones).

---

## [1.13.0] — 2026-06-27 — 🌍 Fully bilingual game FR / EN

### Major release — Full internationalization

LOL Esport Manager is now **fully playable in French and English**. A welcome popup on first launch lets you choose your language (🇫🇷 / 🇬🇧); the choice can be changed at any time in **Progression → World settings**, with instant switching.

**Full coverage** (721 translation keys, FR = EN, verified):
- Interface: navigation, screens, buttons, forms, empty states, resource bar, footer.
- Roster, Champions, Counters, Calendar (domestic + international MSI/Worlds), brackets (single + double elimination), Transfers, Contracts, Journal.
- Training (scrims, objective guide, reports), Draft (coaching assistant), Match (live playthrough, events, structures), Scouting (basic/advanced/premium reports), coin flip.
- Region selection, onboarding, local/cloud save, season/international intro modals, qualifications, contract departures, all toasts and result logs.

### Final batch (region selection, progression, modals, save)
- Region/team selection, Progression and trophy case cards, season and international tournament intro modals, qualification status, contract endings, local/cloud save (statuses + confirmations) and all global toasts translated.
- Final audit: zero residual French display string outside universal LoL terms (Blue/Red Side, First/Last Pick, BO3/BO5, Early/Mid/Late game).

> Intermediate phases delivered in 1.12.2 → 1.12.13.

---

## [1.12.13] — 2026-06-27

### Added — i18n FR/EN Phase 3 (batch 8: Scouting)

The full Scouting screen is translated (team/region selector + basic/advanced/premium reports).

- **Basic report**: confidence, tier (major/competitive/emerging), style, average level, pool, composition tags, phase strength, recent form (W/L ↔ V/D streak).
- **Advanced report**: pool by role, player profiles (translated traits + notes), draft priorities, matchup weakness, recent champions, H2H record (plural handled).
- **Premium report**: player table (Lane/TF/Mechanics/SC/Mental, advantage/disadvantage), suggested counter-picks, flex picks, player to watch, draft plan, recommended scrim.
- Tier unlock messages, scouting traits (`TRAIT_SCOUT_LABELS`) and tags (`SCOUT_TAG_LABELS`) translated. New helpers `scoutTagLabel()`, `scoutTraitLabel()`, `scoutTraitNote()`.

---

## [1.12.12] — 2026-06-27

### Added — i18n FR/EN Phase 3 (batch 7: Match)

- **Match setup**: title, empty roster message, series in progress, intro, labels (opponent, format, fearless draft), start button.
- **Scouting preview** (pre-match): tier (Basic/Advanced/Premium), style, level, weakness, priority ban, unlock message.
- **Live playthrough**: all commentary events (lane duels, ganks, Dragon, Herald, Void Grubs, towers/inhibitors/Nexus, teamfights, Baron, Elder, decisive plays) — generated in the active language.
- **Map structures** (`STRUCTURE_LABELS`) translated: Tower/Inhibitor/Nexus Tower/Nexus.
- **Match report**, **end-of-match buttons** (series won/lost, Draft Game N, Back), Pause/Resume button.
- **Side-choice modal between games** (series coin flip).
- New translated helpers `scoutTierLabel()` and `getStructureLabel()`.

---

## [1.12.11] — 2026-06-27

### Added — i18n FR/EN: coin flip

The pre-draft coin flip (side and pick order choice) wasn't translated. Now bilingual: title, won/lost results, advantage choice (descriptions of Blue/Red Side, First/Last Pick options), recap and buttons. Universal LoL terms (Blue Side, First Pick...) remain unchanged.

---

## [1.12.10] — 2026-06-27

### Added — i18n FR/EN Phase 3 (batch 6: Draft + Coaching Assistant)

- **Draft screen**: setup form (opponent, side), turn banners (ban/pick/AI), role filters, search, First/Last Pick columns, draft recap (comfort, matchups, composition, side, scouting, risk, total), draft log.
- **Coaching Assistant**: all advice translated (counter-pick, proactive pick, priority ban, threat, composition, scouting, flex pick, comfort pick) — regenerated in the active language on every turn.
- **Draft log** and **matchup details** translated at generation time.
- **Mastery tiers** (`MASTERY_TIERS`: Discovery/Playable/Comfort/Signature/Elite) translated — also benefits roster and transfer market tooltips. New helpers `draftSideLabel()`, `masteryTierLabel()`.

---

## [1.12.9] — 2026-06-27

### Added — i18n FR/EN Phase 3 (batch 5: Training)

- **Scrim form**: objectives (labels + descriptions), objective guide (cards: gains, use cases, warning), intensities, region/opponent (prestige suffixes), targeted player/champion, composition style, cost, button.
- **Scrim history**: column headers, results, objective/intensity labels (translated at render, switch with the language).
- **Scrim report**: win/loss analysis, progress tracking, stat evolution — generated in the active language.
- **Scrim decline modal** (insufficient prestige) and **all training toasts**.
- Stat labels (`STAT_LABELS`) translated. New helpers `scrimObjLabel()`, `scrimIntensityLabel()`, `statLabel()`.

> Scrim reports/summaries: translated at generation time (a new scrim displays in the active language; already-recorded history entries keep their original language).

---

## [1.12.8] — 2026-06-27

### Added — i18n FR/EN Phase 2 (batch 4/4: Transfers + contracts)

The game's biggest narrative screen, fully translated (~55 strings).

- **Transfer market**: empty state, budget, counter, filters (divisions/teams/champions), search, player cards (stats, free agent, cost, Sign / Insufficient budget button).
- **Contracts panel**: disabled notice, mercato open/closed, contract tiers (Superstar/Star/Solid/Role player), retirement warnings, extension buttons (+1/+2 years, ×1.5 career negotiation, 33-year limit), tooltips.
- **Extension modal**: title, request, required prestige / budget paid, career negotiation banner, prestige-threshold note, buttons.
- **Signing modal**: choice of player to release, vacant position, confirmation.
- **All transfer/contract toasts** (signings, releases, extensions, insufficient budget/prestige...).
- Correct **plural** handling (an/ans, yr/yrs) via `yearUnit()`. New helpers `contractTierLabel()`, `yearUnit()`.

> **Phase 2 complete.** Remaining for Phase 3: training (scrims + objective guide), draft (coaching assistant), match (playthrough), scouting, region selection, and various generated narrative texts.

---

## [1.12.7] — 2026-06-27

### Added — i18n FR/EN: result logs ("Recent results")

Recent result entries (domestic calendar, playoffs, international group stage and bracket) used to be generated as fixed French text and stored as-is. They are now **structured** (`{k, p}`) and **translated at render time** in the active language — they therefore switch live when the language changes.

- 17 translated log templates (player/AI results, group qualifications, season/tournament endings, etc.).
- New `logChip()` helper that resolves dynamic sub-parts (team names, round labels, standings) at display time.
- `playoffRoundLabel` and `intlMatchLabel` translated.
- **Compatibility**: entries already recorded in an existing save (fixed French strings) are displayed as-is; only **new** entries benefit from bilingual translation.

---

## [1.12.6] — 2026-06-27

### Added — i18n FR/EN Phase 2 (batch 3/4: International calendar MSI/Worlds)

- **Group stage**: title, group label, next match, standings (columns), play/continue buttons.
- **Final phase (bracket)**: title, next series, in-progress state.
- **International recap**: title, champion, standings + rewards, continue button.
- **Brackets**: MSI (single elim, 4 teams), Worlds single elim (8 teams, quarters/semis/final) and **Worlds double elimination** (Upper/Lower Bracket + Grand Final) fully translated — column and card labels (UB Quarters, UB Semis, LB Round 1/2, Loser Q1/Q2, vs UB Final Loser, UB Winner vs LB Winner...).
- Series contexts ("{event} {year} — Groups / Final phase") translated.

> The result log of international matches stays in French (Phase 3). Remaining for Phase 2: batch 4 = transfers/contracts, then training, draft, match, scouting.

---

## [1.12.5] — 2026-06-27

### Added — i18n FR/EN Phase 2 (batch 2/4: Journal + Domestic calendar)

- **Transfer journal**: intro, season labels, movement types (Retirement, Arrival, Contract end, Signing).
- **Domestic calendar**: regular season (title, matchday vs opponent, rest day, play/simulate/continue buttons), standings (Team/W/L/Nexus columns), playoffs (next series, play the series), split-end recap (final standing, rewards, continue to MSI/Worlds).
- **Playoffs bracket** (shared with international): column labels (Quarters/Semis/Final), legend (Qualified/Next match/Eliminated), cards (byes, seeds, winner, upcoming).
- **Standings** and **player evolution** translated.

> Result log content (`season.log`, e.g. "Matchday 3: 2-1 win against G2") stays in French — it will be translated in Phase 3 (generated narrative text). Remaining for Phase 2: batch 3 = international calendar, batch 4 = transfers/contracts, batch 5 = training, batch 6 = draft/match/scouting.

---

## [1.12.4] — 2026-06-27

### Added — i18n FR/EN Phase 2 (batch 1/4: Roster, Champions, Counters)

Translation of the dynamic screens (content rendered by JavaScript), beyond the static shell already done.

- **Roster**: rest panel, stat labels (Form, Fatigue, Mental, Shotcalling...), age, contract, champion pool, player traits (IGL, Veteran, Tiltable...), rest toasts.
- **Champions**: role filters, detail sheet (difficulty, style, synergies, strong/weak against), "counters" and "countered by" lists, back button.
- **Counters**: result titles, matchup labels, empty states.
- New helpers `traitLabel()` and `restLabel()` in `lang.js`. Fixed two local `t` variables that were shadowing the translation function.

---

## [1.12.3] — 2026-06-27

### Changed
- **Onboarding popup (AI rotation / contracts)**: the language selector was removed from it — it duplicated the welcome popup. The language choice remains accessible at any time in **Progression → World settings**.

---

## [1.12.2] — 2026-06-27

### Added — FR/EN internationalization (Phase 1/3 of the v1.13.0 project)

First foundation of the bilingual system. The game will be fully playable in **French** and **English** once the project is complete (intermediate 1.12.x versions, full release in 1.13.0).

- **New `lang.js` module** — `I18N = { fr, en }` dictionary, `t(key, vars)` function with interpolation, `setLang()` and `applyStaticI18n()`. Loaded before `game.js`.
- **Welcome popup on first launch** — presents the game's purpose in FR and EN, with two flags 🇫🇷 / 🇬🇧 to choose the language. Shown only once (`state.settings.langChosen`).
- **Language selector in Progression** — two flag buttons in World settings, instant switching without reload.
- **Fully translated static shell** — navigation, screen titles, empty states, resource bar, match screen, progression table, local/cloud save, footer.
- Default language: French. Existing saves stay in French without interruption.

> Next phases: 2/3 = dynamic screen text (roster, draft, calendar, transfers), 3/3 = narrative text (scouting reports, match reports, journal, contracts, notifications).

---

## [1.12.1] — 2026-06-26

### Added — Draft coaching assistant

Replaces the single suggestion line with a **structured coach panel** shown on every player turn (ban and pick), with up to 3 color-coded cards ranked by priority:

- ⚡ **Counter-pick** — when the opponent has already picked in your role, identifies the best champion from your pool that counters it (via `CHAMPION_COUNTERS`, score ≥ 65). E.g.: "Vex against their mid Viktor — matchup advantage (score 87)"
- 🔥 **Proactive pick** — a champion from your pool that troubles several probable champions from the opponent's pool. Calculation based on counters cross-referenced with the AI team's actual pool
- 🛡 **Priority ban** — with advanced or premium scouting, flags the champion the opponent is likely to prioritize
- ⚠️ **Comeback threat** — your best champion could be dangerous on the opponent's side, consider banning it
- 🧩 **Composition** — alert if your comp (after 2+ picks) lacks engage / disengage / scaling / teamfight
- 📋 **Scouting** — reminds you of the opponent's weakest role if you have an advanced/premium report
- 👁 **Opponent flex** — detects multi-role opponent champions whose assignment is ambiguous

---

## [1.12.0] — 2026-06-26

### Added — Enriched scouting (progressive unlocking kept)

**Basic report (0 → 39 confidence)**
- Team tier (Tier 1 major / Tier 2 competitive / Tier 3 emerging)
- Composition style as visual tags (Engage, Poke, Scaling, Teamfight...) derived from champion pools
- Phase strength (Early / Mid / Late) computed from the pool champions' `phasePower` — the dominant phase is highlighted in gold

**Advanced report (40 → 74)**
- Champion pool **by role** (TOP: Rumble · Gnar, MID: Azir · Viktor...) instead of the overall top 3
- Player profiles with their **traits** and tactical implications (IGL, Veteran, Tiltable, Clutch...)
- **H2H record**: the result of your past official matchups against this team

**Premium report (75+)**
- Enriched player table: **Shotcalling and Mental** added to the Lane / TF / Mechanics columns
- Each player's **individual form** (🔥 hot / ➡️ neutral / 📉 declining)
- **Suggested counter-picks** by role (if the opponent plays mid Orianna → Ahri scores 85)
- Opponent **flex picks** identified (potential draft surprises)
- **Player to watch**: the one whose potential exceeds the team's current level

---

## [1.11.8] — 2026-06-26

### Changed
- **Draft — player names**: pick columns now show the player's name instead of the role (TOP → Caps, JUNGLE → Jankos, etc.) for both teams. If no player is found for a role, the role name is shown as a fallback.

---

## [1.11.7] — 2026-06-26

### Changed
- **Home — Next match**: the section always showed "TBD". It now shows the active competition and the next opponent based on context: regular season (`Spring Split · Matchday 3 · vs FNC`), playoffs (`Playoffs · vs T1`), international group stage (`MSI 2027 · Group stage · vs BLG`) or international bracket (`Worlds 2027 · Bracket · vs G2`). Updates every time you return to the Home screen.

---

## [1.11.6] — 2026-06-25

### Added
- **New champion: Locke** (patch 26.13) — AP assassin/skirmisher MID (secondary role JUNGLE). Difficulty 4, `dive / pick / scaling` tags, early 7 / mid 8 / late 6 phase power. Available in draft immediately after install; absent from player pools at the start (unlockable via a targeted Champion scrim). 22 unfavorable matchups (X beats Locke) and 8 favorable matchups (Locke beats X) added to `data_counters.js`. Data sourced from `CDC/lol_esports_locke_counters_2026.xlsx` — values to be refined in a later version.

---

## [1.11.5] — 2026-06-23

### Changed
- **Series score with acronyms** — the label above the timer now shows both teams' abbreviations on either side of the score, e.g. `BO3 - Game 2 · G2 2 - 0 GX`.

---

## [1.11.4] — 2026-06-23

### Added
- **Training objective guide** — every scrim objective now shows an enriched card as soon as it's selected: icon, description, gain bars (●●● / ●●○ / ●○○), ideal use case and warning. A **? Guide** button opens a scrollable modal comparing all 5 objectives side by side, accessible at any time from the Training screen.

---

## [1.11.3] — 2026-06-23

### Fixed
- **Varied schedule between seasons** — the order of regular-season opponents was always identical (Spring = Summer = next season). AI teams are now shuffled randomly (Fisher-Yates) at the start of every season, keeping the player at a fixed round-robin position. The format (everyone plays everyone once) is unchanged.

---

## [1.11.2] — 2026-06-23

### Added
- **Per-competition rewards tooltip** — hovering the 💰 Budget or ⭐ Prestige chip at the top of the screen shows a popup summarizing the rewards (budget, prestige, coaching) for every placement in the regular season, MSI and Worlds.

---

## [1.11.1] — 2026-06-23

### Fixed
- **Training / Draft / Scouting regression** — champion selection menus showed "undefined (new)" instead of names. Cause: the `getChampionsForRole` function added in v1.11.0 for AI replacement generation (returning strings) overwrote the original version (returning champion objects), breaking all `.name` / `.id` calls. Fix: removed the duplicate; `generateAIReplacement` now calls `getChampionsForRole(role).map(c => c.name)` to extract names.

---

## [1.11.0] — 2026-06-23

### Added
- **AI roster rotation** — opposing rosters finally evolve: at the end of every Worlds season, AI players who reach their retirement age leave their team and are replaced by a **generated young talent** (18–22 years old, `potential > level`) at the team's **average level ± 3**, with a role-appropriate 5-champion pool, masteries and a varied fictional name. The tier hierarchy thus stays stable season after season.
- **Transfer journal** — new section in the Transfers tab tracking, **season by season** (last 10 years), every movement: AI retirements and arrivals, your own team's contract endings and signings. Compact, capped storage.
- **World settings (Progression tab)** — two toggles to tailor the experience:
  - **AI roster rotation**: enable/disable opposing teams aging (disabled = rosters stay frozen, "T1 stays T1").
  - **My team's age & contracts**: enable/disable your own players' aging and contract management (disabled = frozen roster, no extensions to manage; level progression stays active).
- **1.11.0 welcome popup** — on first launch of this version, a window explains the new mechanics and lets you choose both settings directly, reminding you they can be changed anytime in Progression.

### Technical
- New functions: `applyAIRetirementRotation`, `generateAIReplacement`, `getChampionsForRole`, `pickReplacementName`, `logTransfer` / `logAIRotation`, `renderTransferJournal`, `worldSettingsHtml` / `wireWorldSettings`, `maybeShowOnboarding1110`. `applyAICareerProgression` now reads `player.potential` (compatible with generated replacements). New persistent fields: `state.transferLog`, `state.settings.aiRotation`, `state.settings.playerContracts`, `state.settings.seenOnboarding1110`.

---

## [1.10.4] — 2026-06-22

### Changed
- **Worlds — centered bracket and full names**: the final-phase brackets (upper bracket, lower bracket, grand final) were squeezed to the left; they are now **centered horizontally** and take up more room (wider cards, larger spacing), while keeping vertical centering. On wide screens (≥ 900 px), cards show the team's **full name** (e.g. "CTBC Flying Oyster" instead of "CFO"); on small screens (phone/tablet), the abbreviation is kept for readability.

---

## [1.10.3] — 2026-06-22

### Changed
- **Worlds — the bracket fills in match by match**: the following blocks (UB semis, UB final, lower bracket rounds...) now show qualified teams **as soon as the source matches are played**, without waiting for the whole stage to finish. Example: if Quarters 1 and 2 are done but Quarter 3 (your match) is still pending, UB Semi 1 and LB Round 1 already show their teams instead of "TBD". New `propagateDoubleBracket` function (purely visual, does not advance the competition).

---

## [1.10.2] — 2026-06-22

### Fixed
- **Worlds — upper bracket visual alignment**: the upper bracket semifinals weren't vertically centered relative to their quarters (Semi 1 glued to Quarter 1, Semi 2 glued to Quarter 4), making the connecting lines asymmetric. UB Semi 1 is now centered on the Quarter 1/Quarter 2 pair and UB Semi 2 on the Quarter 3/Quarter 4 pair → centered, symmetric connectors.

---

## [1.10.1] — 2026-06-22

### Changed
- **Worlds — 3rd place better rewarded**: the lower bracket final loser (3rd place) is now a distinct tier from 4th, to reward their longer run. 3rd place rewards: **165 budget / 120 coaching / 13 prestige** (instead of 143 / 105 / 11, previously identical to 4th). 4th place and other placements are unchanged; the domestic reward scale and MSI are not affected.

---

## [1.10.0] — 2026-06-22

### Added
- **Worlds in double elimination** — the Worlds final phase adopts the realistic upper/lower bracket format (MSI stays single elimination). The 8 group-stage qualifiers enter an **upper bracket** (Quarters → UB Semis → UB Final); every loss sends a team to the **lower bracket** (LB Round 1 → LB Round 2 → LB Semi → LB Final), where a 2nd loss eliminates. The upper bracket winner and the lower bracket survivor face off in a **grand final** (BO5). 14 series total instead of 7.
  - **Distinct placements**: 1st (grand final winner), 2nd (finalist), 3rd (LB Final loser), 4th (LB Semi loser), 5th-6th (LB Round 2 losers), 7th-8th (LB Round 1 losers). Budget/prestige rewards follow this placement via the existing scale (Worlds ×1.5 multiplier).
  - **New visual**: bracket across 3 sections (Upper / Lower / Grand Final) with connectors, color-coded states (qualified, next match, eliminated) and a champion block.
  - The Worlds intro modal now describes the double-elimination format.

### Technical
- Extended bracket model (`type: 'double'`, stage machine `qf → r2 → r3 → lb5 → lb6 → gf`). New functions: `advanceDoubleBracket`, `buildDoubleBracketHtml`, `drawIntlBracketLines`, `loserOf`, `intlMatchLabel`. `buildInternationalBracket`, `processInternationalBracketRound` and `getInternationalPlacement` handle both formats. Group stage and MSI engine unchanged.

---

## [1.9.4] — 2026-06-22

### Fixed
- **International group stage played twice** — at MSI/Worlds startup, all-AI groups (without the player) had their day-1 matchday simulated twice: each team showed 1W-1L (2 series) while the player's group stayed at 0-0 and the header still read "Matchday 1/3". Cause: two entry points triggered the simulation (the calendar render's side effect **and** the intro modal's "Let's go!" button), and a "fresh" call restarted from group 0 without the matchday having advanced. Added a guard in `processInternationalGroupMatchday()`: a call with no arguments no longer re-simulates a matchday that's already started and awaiting the player's match. The playthrough now advances one round per matchday for all groups.

---

## [1.9.3] — 2026-06-22

### Added
- **MSI ↔ Worlds qualification loop (realistic system)** — every region's international slots are no longer fixed, they're earned on the international stage:
  - **MSI → Worlds (same year)**: the MSI winner opens a **3rd Worlds slot** for its region. A major structural slot (LCK by default) fills out the 16 qualifiers; if a major wins MSI, the structural slot **shifts** to the other major to avoid a region having 4 teams (LCK and LPL both then stay at 3).
  - **Worlds → MSI (following year)**: the Worlds winner opens a **2nd MSI slot** for its region the following spring.
  - **Safety net (year 1 / old saves)**: as long as no winner is recorded yet, the bonus slot defaults to the player's region — MSI stays at 8 teams, Worlds at 16.
  - **Gameplay consequence**: your region's 3rd Worlds slot and 2nd MSI slot are no longer automatic. Outside LCK/LPL, you now need to win the corresponding international tournament to unlock them.

### Changed
- **Season intro messages** — the "Qualification" section shows the exact number of slots for your region (1, 2 or 3 depending on context), only shows the "finalist" tier if the region has at least 2 slots, and adds a note explaining the origin of the bonus slot (region that won the previous tournament).

### Technical
- Two persistent fields: `lastMsiWinnerRegion` and `lastWorldsWinnerRegion`, set at the end of every international event in `finishInternational()` and restored on save load. Logic centralized in `getRegionRepCounts()`; group stage engine unchanged (constant total team count).

---

## [1.9.2] — 2026-06-21

### Changed
- **New logo (logoV2.png)** — main logo replaced in the game, the header and the home screen. PWA icons regenerated: `icon-512.png` (512×512), `icon-192.png` (192×192), `apple-touch-icon.png` (180×180 iOS). Browser favicons: `favicon-32.png` and `favicon-16.png` with `<link sizes>` tags in `index.html` for better cross-browser support.

---

## [1.9.1] — 2026-06-21

### Fixed
- **Scouting — invisible team names**: the opponent team selection buttons had no explicit text color and inherited a dark value on a dark background. Added `color: var(--color-text)` on `.comp-tag-option` in `style.css`.

---

## [1.9.0] — 2026-06-21

### Added
- **Non-linear draft AI (counter-pick)** — the AI no longer strictly follows the TOP→JUNGLE→MID→ADC→SUPPORT order. On every pick, it first looks for an empty role where the player has already picked a champion it can counter in the same lane (via `data_counters.js` + fallback on counterTags), and responds there as a priority. If no relevant counter, it falls back to the usual order (comfort pick). Aggressiveness is driven by the AI profile's `riskTolerance`: a cautious team doesn't systematically counter, keeping it unpredictable. New functions: `aiChampCounters`, `aiCandidateForRole`, rewritten `aiChoosePick`.
- **Role-contextual champion display (flex picks)** — during a pick, a champion's comfort outline now reflects the player's mastery **for the role currently being picked**, not the best score across all roles. Example: Twisted Fate mastered 93 by the mid and 7 by the top shows a gold outline when picking for mid, but a weak one when picking for top.
- **Multi-player tooltip on draft champions** — hovering a champion, the bubble now lists **every** roster player who can play it, with their role, mastery and a ⚠ "low mastery" if < 25. New `getAllRosterComforts` function.

---

## [1.8.11] — 2026-06-21

### Changed
- **Player card (transfer market)** — age is now shown on its own line between the name and the "Role — Team" line, consistent with the roster display.

---

## [1.8.10] — 2026-06-20

### Changed
- **Retirement tooltips — mobile/tablet/Mac compatibility**: the ⚠ retirement and "impossible (33-year limit)" badges now use `data-lore-tooltip` + global click delegation in addition to the native `title`. A tap/click shows the message via a toast, which works on all devices.

---

## [1.8.9] — 2026-06-20

### Added
- **Retirement tooltips (immersion/lore)** — hovering the ⚠ retirement W{N} badge shows: *"Personal choice: {player} decided to end their career at {age}. An extension remains possible, but under exceptional terms (×1.5)."* Hovering the "impossible (33-year limit)" text shows: *"Regulations do not allow playing past age 33."*

---

## [1.8.8] — 2026-06-20

### Changed
- **Player card (roster)** — age is now shown on its own line between "Role — Nationality" and the contract end date, instead of being appended to the same line as nationality.

---

## [1.8.7] — 2026-06-20

### Balance
- **Contract renewals — budget revised upward**: Superstar 💰100/185, Star 💰75/140, Solid 💰50/95, Role 💰30/55 (prestige unchanged). ×1.5 career negotiations apply on these new amounts.
- **Budget rewards per competition — +60%**: 1st split 100→160, 2nd 80→125, 3rd-4th 60→95, 5th-6th 40→65, 7th-8th 20→35, 9th-10th 0→15. International tournaments (MSI ×1.25 / Worlds ×1.5) automatically inherit these new bases. International group-stage eliminations now grant 19 budget (MSI) and 23 budget (Worlds) instead of 0.

---

## [1.8.6] — 2026-06-20

### Balance
- **Contract renewal costs revised upward** — budgets were too low compared to transfer market prices (renewing a Star cost 22 budget, signing a weaker replacement cost 61). New scale aligned with the market: Superstar 💰65/120, Star 💰50/90, Solid 💰35/65, Role player 💰20/38. Prestige requirements unchanged.

---

## [1.8.5] — 2026-06-20

### Added
- **Career negotiation (extension beyond planned retirement)** — when an extension goes past `retirementAge` but stays within the absolute 33-year limit, a "career negotiation" mode kicks in: ×1.5 cost (prestige and budget, rounded up), distinctive amber ⭐ button, explanatory banner in the modal.
- **Absolute, unbreakable limit at 33** (`playerAbsoluteRetirementYear`) — beyond that, the button is replaced with "impossible (33-year limit)" text. Same safety guard in `extendContract`.
- **`getExtensionType(p, years)`** — returns `'normal'`, `'special'` or `'blocked'`, used at every decision point (button, modal, extension function).

---

## [1.8.4] — 2026-06-20

### Added
- **Player age system** — every player now has a `baseAge` (age in season 1) and a `retirementAge` (retirement age). Age is shown on roster and transfer market cards. `data_teams.js` (330 players) and `data_transfers.js` (75 players) were enriched from the `lol_esports_update_2026_contracts_age.xlsx` spreadsheet.
- **Smart extension buttons** — if an extension would go past the retirement age, the button is replaced with an explanatory text ("impossible – retirement W{N}"). A red ⚠ warning appears on the card when retirement is ≤ 2 seasons away.
- **Retirement note in the extension modal** — when the proposed contract runs exactly until retirement, a ⚠ message states it clearly.
- **Retroactive migration** — existing saves receive `baseAge`/`retirementAge` on load (name lookup in AI_TEAMS/TRANSFER_PLAYERS, otherwise random assignment by tier). Covers `loadGame`, `importSave`, `cloudImport` and `confirmTeamSelection`.
- **Generated/recruited players** — new recruits without an age in the data files get a random age consistent with their tier at signing.

---

## [1.8.3] — 2026-06-20

### Added
- **Extension limit: once per player per season** — there was no way to prevent abuse of clicking +1 year / +2 years multiple times for the same player. Now, as soon as a player is extended, a `contractExtendedYear` field is recorded. Any further attempt during the same season shows a clear message and the buttons are replaced with a "✓ Extended this season" badge.

---

## [1.8.2] — 2026-06-20

### Fixed
- **"+1 year / +2 years" buttons had no effect on click** — the buttons were rendered `disabled` when the window was closed or the cost unaffordable; but a disabled button emits no click → "nothing happens", with no explanation. The buttons are now always clickable and a clear message states the blocker.

### Changed
- **Extension window turned into a real "mercato"** (`state.mercatoOpen`) — previously open only on the MSI/Worlds recap screen (closed the moment you clicked "Continue"), a trap. Now: the mercato opens at the end of MSI/Worlds **and stays open for the entire following preseason**, until the split's 1st match. Clear status banner (🟢 open / 🔒 closed) in the contracts section. Migration: existing saves open the mercato by default (extensions possible immediately).

---

## [1.8.1] — 2026-06-20

### Fixed
- **"Worlds undefined" contracts on imported saves** — the import paths (file `importSave` and cloud `cloudImport`) assigned state directly (`state = parsed`) without going through `loadGame`'s migration, leaving `contractUntil` undefined → "Wundefined / Worlds undefined" displayed in the contracts section.
  - Call `ensureRosterContracts(0)` after import (both file **and** cloud): players without a contract get a tier-weighted deadline, anchored on the current year.
  - An already-imported save fixes itself on a simple reload (`loadGame`'s migration catches undefined `contractUntil` values from localStorage).

---

## [1.8.0] — 2026-06-20

### Added
- **Player contract system** — every roster player is now signed until the end of a given Worlds ("until Worlds 1", "Worlds 2"...). The deadline is shown on their card (with a ⚠ "final year" alert).
  - **Tier-weighted generation**: superstars/stars are secured longer (often +1 year) than role players. Applies to new games **and** retroactively to existing saves (migration on load, anchored on the current year — no data lost).
  - **Inter-season extensions** (after MSI or Worlds), from the transfer market, "My roster — contracts" section: +1 year or +2 years, at a tier-scaled cost.
  - **Prestige is a requirement (threshold, not decremented), budget is paid** — same logic as out-of-region scrims. Scale: Superstar P50/💰30 (1 year) · P70/💰60 (2 years), Star P35/💰22 · P50/💰45, Solid P20/💰15 · P32/💰30, Role player P8/💰10 · P15/💰20.
  - **Expiration = departure**: a contract not renewed at the end of Worlds → the player leaves the team (dedicated announcement), leaving a spot to fill.
  - **Signing for a vacant spot**: the transfer market now allows signing without releasing a player when a spot is empty. Recruits receive a contract (≥ 1 year).

---

## [1.7.8] — 2026-06-20

### Fixed
- **Trophy case: MSI/Worlds qualifications counted multiple times** — repeatedly clicking "Continue to MSI/Worlds" (possible back when the v1.6.2 chaining bug existed) called `startInternational` multiple times, incrementing the qualification counter on every click and resetting the groups.
  - Added an anti-double-call guard: if an international event is already in progress, `startInternational` no longer restarts it (groups and trophy case are no longer recounted).
  - Counting bug only: no impact on how competitions play out.

---

## [1.7.7] — 2026-06-20

### Fixed
- **Season intro popup: number of international qualifiers** — the popup always announced "the top 2 teams" regardless of the split, while the Summer Split actually qualifies **3 teams** from the player's region for Worlds (vs 2 for MSI in Spring).
  - The number is now derived from the same source as the actual qualification (`getRegionRepCounts`) → no more possible discrepancy.

### Added
- **MSI/Worlds qualifier details in the intro popup** — explains who qualifies and how:
  - The playoffs champion.
  - The finalist (grand final loser).
  - (Worlds only) The best eliminated semifinalist, tie-broken by regular-season standing (best seed).

---

## [1.7.6] — 2026-06-20

### Fixed
- **Reversed scores in the final-phase bracket** — on the recap screen (season, MSI, Worlds), every series score was shown backwards (the winner showed the loser's score and vice versa), e.g. a 0-3 loss displayed as 3-0.
  - Cause: `scoreA`/`scoreB` are stored under two different conventions (home/away for AI matches, player/opponent for the player's match), while the display assumed `scoreA` = the winner's score.
  - Fix: `poBracketCard` now derives each team's score via a reliable invariant — in a series, the winner always has more games than the loser (`max`/`min` of scoreA/scoreB). Robust for all cases (player/AI, home/away, season/international).
  - Purely visual bug: existing saves are sound, the display fixes itself automatically.

---

## [1.7.5] — 2026-06-20

### Fixed
- **Final-phase bracket: right-angle connector lines only** — some connectors were drawn diagonally when a target block wasn't exactly at the vertical center of its two sources, and the Final → Winner line had an unnecessary kink.
  - `connect()`: the vertical bar now extends to the target's exact height, then a horizontal line enters the target → guaranteed right angle, no more diagonals.
  - `single()` (Final → Winner): perfectly straight line when blocks are vertically aligned, L-shaped kink only when needed.
  - **Winner block aligned with the Final**: the Winner column had a 1-line label (`&nbsp;`) versus 2 lines for the Final, offsetting its vertical centering and creating an unnecessary zigzag. Label standardized to 2 lines → Final and Winner at exactly the same height, straight-line connector (season + international).

---

## [1.7.4] — 2026-06-20

### Improved
- **AI masteries evolve over time** — previously frozen, AI teams' champion masteries now progress at the end of every split, so they stay competitive season after season (and no longer accumulate a permanent gap against a player roster that trains).
  - **Scope**: only **signature champions** (each player's top 3 masteries) progress — the AI specializes, and pulling a team out of their comfort champions (bans/scouting) remains a strong tactical lever.
  - **Rate**: +1 per split (+2 for rookies), alongside the existing level progression.
  - **Cap**: 100.
  - Applied in `applyAICareerProgression` (end of season), carried over into matches via the evolving `state.aiRosters` copy.

---

## [1.7.3] — 2026-06-20

### Improved
- **Real AI champion mastery in matches** — previously, the AI played every champion at a frozen mastery of 40, regardless of the champion: big teams (T1, Gen.G, G2...) were artificially weak, making matches too easy for a developed roster.
  - The AI now uses its **real per-champion mastery** (`championPool`/`masteries` data from `data_teams.js`, already present). A team on its signature champions becomes a genuine wall (90-100 mastery).
  - **Rewards scouting and bans**: forcing a team out of its comfort pool (by banning their mains) drops their mastery to 35 — a real tactical lever in draft.
  - No asymmetry in the player's favor: the per-event power calculation stays identical for both sides.
  - AI vs AI simulation (group matches without the player) is unchanged (no draft, based on average roster level).

---

## [1.7.2] — 2026-06-19

### Fixed
- **International group stage (MSI/Worlds): AI pairings skipped** — after the player finished their match in a group, the following pairings of the same round (e.g. CFO vs FUR) were never simulated. Result: some teams stayed at 0 matches played while others racked up impossible losses on the same matchday.
  - Cause: `resolveInternationalSeries` called `processInternationalGroupMatchday(finishedGroup + 1)` — jumping straight to the next group instead of continuing from the next pairing in the same group.
  - Fix: `pendingMatch` now stores `pairingIndex`; after the player's match, play resumes from `processInternationalGroupMatchday(finishedGroup, finishedPairingIndex + 1)`.

---

## [1.7.1] — 2026-06-19

### Improved
- **Scrims: reward bonus based on opponent tier** — training against an elite team pays off more than against a bottom-tier one.
  - Tier 1 (T1, Gen.G, BLG...): **+20%** on all gains (champion mastery, composition, matchup, macro, form).
  - Tier 2: **+10%**.
  - Tier 3+: no bonus (unchanged).
  - The bonus applies to every scrim objective via the `resultFactor`.

---

## [1.7.0] — 2026-06-19

### Added
- **Prestige system for scrims**: high-tier out-of-region teams can now decline a scrim request if the player's prestige is insufficient.
  - Tier 1 (T1, Gen.G, BLG, JDG...): **75 prestige** required.
  - Tier 2: **40 prestige** required.
  - Tier 3+: no restriction.
  - **Region exemption**: teams from the same region as the player always accept.
  - **Shared-tournament exemption**: if the player and the target team are both qualified for the same active international tournament (MSI or Worlds), the team accepts and a message explains it.
  - **On decline**: 100% of the coaching points committed (chosen intensity) are consumed, and an explanatory modal states the cause (insufficient prestige, staff mobilized for nothing).
  - **Indicator in the opponent selector**: every team shows its required prestige threshold, with a ✓ if the player meets it, ⚠ otherwise, or a ★ if a tournament exemption applies.

---

## [1.6.2] — 2026-06-19

### Fixed
- **End of playoffs → MSI/Worlds**: after clicking "Continue to MSI" (or Worlds) and confirming in the "Let's go!" popup, nothing happened and the screen reverted to the recap. Cause: `showView('calendar')` was called before `processInternationalGroupMatchday()`, causing a `TypeError` (`pendingMatch` was still `null`). Fixed by swapping the call order + a defensive guard in `renderInternationalGroups`.

---

## [1.6.1] — 2026-06-19

### Fixed
- **Champions screen**: in a champion's detail sheet, the names of counter champions (the "X counters" and "Countered by" panels) were displayed in black on a dark background. Text switched to white (`var(--color-text)`).

---

## [1.6.0] — 2026-06-19

### Added
- **Full League of Legends champion roster**: the database goes from 90 to **172 champions** (complete official Riot list), spread across the 5 roles (TOP 38, JUNGLE 41, MID 43, ADC 24, SUPPORT 26).
- **Extended counter database**: from 1,120 to **4,259 effective counter matchups** ready for draft, scored and documented (context, shared tags, draft tip, gameplay reason). Every champion now has counter data.
- **New Champions screen** (menu between Draft and Counters): list of all 172 champions with a role filter (buttons) and a search field. Clicking one opens the champion's sheet — traits (role, difficulty, early/mid/late power, objectives, style, synergies, countered profiles), full list of champions it counters and those that counter it (each row clickable to navigate from sheet to sheet). "← Back" arrow to return to the list.

### Technical details
- `data_champions.js` and `data_counters.js` regenerated from `lol_esports_update_2026_full_champion_counters.xlsx` (sheets *Champions_All_Complete* and *ChampionCounters_Complete*).
- Format and access functions unchanged (`getChampionByName`, `getChampionById`, `getCounterEntry`) → full compatibility: all 75 champions referenced by existing rosters resolve correctly.
- Fixed along the way: support Renata Glasc was named "Renata" in the old database (rosters used "Renata Glasc") — now aligned.

---

## [1.5.4] — 2026-06-19

### Fixed
- **Final-phase bracket on end screens**: the bracket tree now reappears on the season end recap screen ("... - Finished") as well as at the end of MSI and Worlds. It had disappeared from these screens, which are essential for visualizing the final outcome after the playoffs.

---

## [1.5.3] — 2026-06-19

### Improved
- **More realistic and varied match simulation**: reworked engagement resolution to break the repetitive pattern (one team at 10-0 after 5 min then a systematic stomp).
  - **Probabilistic resolution**: every engagement is now decided by a sigmoid on the power gap, no longer by a deterministic winner. Close teams → roughly 50/50 fights (tight matches, leads that change hands); a big gap → the favorite dominates. **The closer the two teams, the tighter the match.**
  - **Softer, contextual snowball**: a gold lead weighs less (±4 instead of ±5) and its intensity depends on the scenario (weak in *control*, strong in *stomp*).
  - **Comeback bonus (shutdown gold)**: the trailing team gets a gold bonus for winning a big play — leads are no longer permanent, comebacks become possible.
  - **Lower early kill caps**: no more 10-0 in 5 minutes.
  - **Scenario choice tied to team closeness**: close rosters → contested matches (control/standard), big gap → domination (stomp).
- Neutral objective timers (dragon, grubs, herald, baron, elder) remain unchanged.

---

## [1.5.2] — 2026-06-19

### Added
- **Winner block in the bracket**: to the right of the final (playoffs, MSI, Worlds), a golden box shows "Winner", the competition name (e.g. *Spring 1 - LEC*) and the champion team. Stays dotted "To be determined" until the final is played.
- **Trophy case section** (Progression screen, between Overall stats and Player evolution): regional titles, MSI qualifications, MSI titles, best MSI result, Worlds qualifications, Worlds titles, best Worlds result. Existing saves have their already-won titles automatically back-counted.

### Improved
- **Centered bracket**: the bracket is now horizontally centered in the panel, filling the empty space on the right.

---

## [1.5.1] — 2026-06-19

### Improved
- **Final-phase bracket**: the season playoffs, MSI and Worlds now show a visual bracket with dynamically computed SVG connectors — replacing the old text chips. Every matchup is a card with teams, scores and state (qualified/eliminated/upcoming). The next match's card is highlighted in gold. The "Recent results" section below is unchanged.
  - Season: 6 teams — seed 1 & 2 byes built into the quarterfinals column, semifinals, final
  - MSI: 4 teams — direct semifinals, final
  - Worlds: 8 teams — 4 quarters, 2 semis, final

### Fixed
- **Bracket connectors (season)**: seed 1 & 2 byes now share the quarterfinals column, preventing connector lines from crossing over match cards.
- **Cache refresh (Mac/Safari)**: added a version suffix (`?v=1.5.1`) on CSS and scripts to force `style.css` to reload — the bracket wasn't showing on Mac because the old CSS stayed cached.

---

## [1.5.0] — 2026-06-19

### Overhaul
- **Match simulation recalibrated on real pro data** (LCK/LPL/LEC/LCS 2026 — gol.gg): games now generate stats consistent with pro play (27-31 kills/game, 29-35 min duration, progressive gold gap).

### Added
- **5 match scenarios** drawn at launch, weighted by region and the power gap between teams:
  - *Control/Macro* (25%): few kills, farm and objective priority — clean LCK style
  - *Standard pro* (35%): progressive advantage, action focused on logical timings — the central scenario
  - *Realistic snowball* (22%): a successful early game but a credible pace, 10-17 kills at 25 min
  - *Pro stomp* (8%): a big skill gap, the game is decided before 28 min — rare
  - *Fiesta/Chaotic* (10%): lots of kills but a lead that isn't always stable, possibly 40-55 kills
- **Region-based weighting**: LCK favors control, LPL favors snowball/fiesta, LEC/LCS balanced, International more stomps
- **Kills-per-minute cap** (temporal safeguard): at 10 min max 5-13 kills depending on scenario, at 15 min max 10-19, at 20 min max 18-28 — prevents absurd outliers outside the stomp/fiesta scenario
- **Defensive behavior under a big gold gap**: when the lead exceeds 3,000 gold, the trailing team plays safer — kill event weight reduced (×0.55-0.75), tower event weight increased (×1.4). Snowball converts into structures/objectives rather than extra kills.

### Changed
- `lane_kill` and `gank` event weight reduced from 2 → 1 (base early-game ratio: 44% → 22% of events)
- Kills per teamfight: `randomInt(2,4)` → `randomInt(1, maxKillsPerTF)` depending on scenario (1-4)
- Absolute kill cap raised to 55 (reserved for the extreme fiesta scenario)

---

## [1.4.3] — 2026-06-19

### Improved
- **Snowball effect**: a gold lead now directly influences each side's power during match events. Every 2,000 gold of lead adds +1 power (capped at ±5, i.e. ±10,000 gold). Concretely, a team with a 10,000-gold lead wins events almost systematically, reflecting the actual behavior of a League of Legends game where a comeback from 10k gold essentially never happens.

---

## [1.4.2] — 2026-06-19

### Fixed
- **Role filter in draft — secondary roles included**: the Top/Jungle/Mid/ADC/Support filter now also shows champions for whom this role is a secondary role (e.g. Gragas with `role: TOP` and `secondaryRoles: ['JUNGLE']` appears in the Jungle filter). Aligned with what the AI can pick.

---

## [1.4.1] — 2026-06-19

### Fixed
- **MSI / Worlds qualification based on playoffs**: teams representing the player's region are now selected based on playoffs results, not regular-season standing. MSI: champion + finalist (2 spots). Worlds: champion + finalist + best semifinalist eliminated, tie-broken by regular-season seed (3 spots). Without a playoffs final win, it's no longer possible to auto-qualify for MSI/Worlds from the regular standing.

---

## [1.4.0] — 2026-06-19

### Changed
- **Dynamic overall level**: a player's overall value (e.g. 89) is no longer a static imported number — it's now computed in real time as the average of their 5 sub-stats (Mental + Shotcalling + Laning + Teamfight + Mechanics) / 5. If training improves a stat, the overall level rises immediately
- **Direct match impact**: this computed level is what feeds the simulation engine (per-player power calculation). A player who improves in training is stronger in the next match; one who regresses is weaker
- **Consistent display**: the Roster card and the recap table now show the real (computed) level, not the frozen value from the data file
- **Dynamic team averages**: the team level average (used in scouting and comparisons) also reflects current sub-stats

---

## [1.3.7] — 2026-06-19

### Fixed
- **Standings — "(You)" removed**: the player's team name is shown without a marker, like other teams (regular season and MSI/Worlds groups)
- **Cloud save — confirmation before upload**: a popup asks for confirmation before overwriting the existing cloud save
- **Cloud save — confirmation before loading**: a popup asks for confirmation before overwriting the current game with the cloud save
- **Cloud load — prior reset**: before applying the cloud save, the current game is cleanly reset (any ongoing match stopped, state cleared) to avoid any lingering state

---

## [1.3.6] — 2026-06-18

### Changed
- **Economy — removed per-match budget gain**: budget no longer increments on every win (+10) or loss (+3) — income now comes solely from end-of-competition standing
- **Standing rewards revised downward**: end of season 1st +100 / 2nd +80 / Top 4 +60 / Top 6 +40 / Top 8 +20 / outside top 8 +0 (was 200/140/100/70/40/15)
- **MSI / Worlds multipliers**: MSI ×1.25 and Worlds ×1.5 relative to end-of-season rewards (was ×1.4 and ×2)

---

## [1.3.5] — 2026-06-18

### Fixed
- **Match history — Competition column**: the column always showed "Scrim" for every match. It now shows the correct context: "Spring 1 - LEC" (regular season), "Playoffs - Spring 1 - LEC" (playoffs), "MSI 1 - Groups" / "MSI 1 - Final phase", "Worlds 1 - Groups" / "Worlds 1 - Final phase", or "Scrim" for training

---

## [1.3.4] — 2026-06-18

### Changed
- **Draft recap — matchup reason**: every matchup line now states why the matchup is favorable or unfavorable, in parentheses (e.g. "Top: Sion vs Jayce, favorable matchup (Poke)" and "Top: Sion vs Jayce, unfavorable matchup (Engage)"). When both entries coexist in the database (champion A vs B AND B vs A), both lines show with their respective profile

---

## [1.3.3] — 2026-06-18

### Changed
- **Standings — Gold diff. column hidden**: the gold difference is no longer shown in the standings tables (regular season, MSI and Worlds groups) but is still used as the last tiebreaker (wins → h2h → nexus diff. → gold diff.)

---

## [1.3.2] — 2026-06-18

### Fixed
- **Matchup inversion (counter ↔ draft recap)**: the post-draft recap announced the opposite of the Counters screen (e.g. "Renekton vs Jayce, favorable matchup" when it was actually Jayce vs Renekton). The recap now relies on the counters file (same source as the Counters screen); the tag-based fallback was flipped back to the right direction
- **Counter bonus in simulation**: the `getCounterEntry` function was missing, so the in-match power calculation used a reversed tag fallback (it favored the countered team). The engine now reads the counters file and applies the correct sign

---

## [1.3.1] — 2026-06-18

### Changed
- **Major balance pass (330 players)**: recalibrated overall stats and sub-stats for the main rosters (`lol_esports_update_2026_major_balance_v2.xlsx`). Average level 75.0 → 81.3; min 55 → 66; max 96 → 97
- **Champion pools extended to 5 + explicit masteries**: every major-league player now has a 5-champion pool with explicit masteries (no more punitive automatic formula). Average pick-1 mastery: 65.0 → 86.6; pick 2: 50.0 → 83.9; pick 3: 35.0 → 80.7
- **Real masteries in-game**: the player's roster now directly uses these explicit masteries (mastery badges and draft comfort outline aligned with real data); falls back to the old formula if a mastery is missing
- **Synced DraftProfiles**: AI team comfort picks aligned with the new player pools
- _The transfer market (75 ERL players) remains unchanged._

---

## [1.3.0] — 2026-06-18

### Added
- **Draft — comfort outline on bans**: during the ban phase (and pick phase), every champion known by one of your players (comfort ≥ 1) gets a colored outline based on mastery level, using the same colors as the roster (blue playable, green comfort, gold signature/elite). Hover = player name and mastery
- **Transfer market — 75 real ERL / EMEA Masters players**: import of lower-division players (LFL, Prime League, SuperLiga, NLC, Ultraliga, TCL, Balkan, Greek Legends) from `lol_esports_update_2026_with_transfers.xlsx`
- **Transfers — full display and filters**: all available players are shown at once, with filters by position (buttons), by division, by current team, by champion pool, and a search field (player name, team or champion). Champion pools are shown with the comfort outline and scouting note
- **Transfers — real masteries at signing**: a signed player keeps their comfort picks and scores as masteries, directly feeding the draft comfort outline

---

## [1.2.7] — 2026-06-18

### Changed
- **Round-robin standings (season + MSI/Worlds groups)**: added nexus difference (nexuses won − nexuses lost) as a tiebreaker, inserted between head-to-head and gold difference. New order: wins → head-to-head → nexus diff. → gold diff.
- **Nexus column in standings**: every row now shows `W L Nexus(won-lost) Gold diff.` (e.g. `2 MKoi 3 2 6-3 +4325`)
- **AI matches in season/groups**: simulated in BO3 (like the player's matches) to feed the nexus counter consistently

### Fixed
- **Standings gold diff.**: the gold difference recorded in the standings now matches the gold actually accumulated during the series' games (accumulated from the player's perspective), instead of a random value derived from the score. AI match gold scale aligned with real games to stay consistent

---

## [1.2.6] — 2026-06-17

### Added
- **Champion search in draft**: an input field to the right of the role filters (bans AND picks) — the list narrows in real time to champions whose name contains the typed text

### Fixed
- **Side consistency in simulation**: the whole match screen is now indexed on the map side. The team name color is authoritative — if Karmine Corp is blue, they're Blue Side, so their kills, gold, objectives (dragons, grubs...) and structures show in blue. No more blue/red inversion between the banner and the counters
- **Drake/objective counters**: the counters above the map now exactly match the events in the log (no more 3 drakes announced but 2 counted)
- **Map structures ↔ log**: when the log announces "destroyed Tower 3 (Top)", it's indeed that structure that goes dark on the map (the side indexing was reversed)

### Changed
- **Single win condition — nexus destruction**: a game is won by destroying the opponent's nexus. You must first destroy, in the same lane, the opponent's T1, T2, T3 and inhibitor, plus both nexus towers. The displayed winner follows the actual game state (nexus destroyed), with a time-based safeguard resolving to structural advantage otherwise

---

## [1.2.5] — 2026-06-17

### Added
- **Gold difference in simulation**: under the kill counter, a dynamic display of the gold lead — always a positive value, blue if the blue team is ahead, red otherwise; computed from kills (300g/kill), objectives (dragons 250g, baron 300g, herald 150g, etc.) and structures (T1/T2/T3 towers, inhibitors)

---

## [1.2.4] — 2026-06-17

### Fixed
- **Side/Pick independent**: Blue Side and First Pick are now two separate choices — a player can be Blue Side + Last Pick or Red Side + First Pick; assignment always respected
- **Map — all structures**: T1/T2/T3 towers, inhibitors (triangles), nexus towers and nexus (star) correctly positioned on the map; shapes made more elegant and smaller
- **Simulation — named structures**: the match log states exactly which structure is destroyed (e.g. "Tower 2 (Mid)", "Inhibitor (Bot)") and respects the T1→T2→T3→Inhibitor→Nexus Towers→Nexus order
- **Close Changelog button**: repositioned to the top-right of the modal window, in the gold/navy visual theme
- **Draft column labels**: columns renamed "First Pick / Last Pick" instead of "Blue / Red" — avoids confusion between pick order and map side (e.g. Red Side + First Pick was shown under the "Blue" column)
- **Map side in simulation**: the side shown in the simulation (Blue/Red) now reflects the actual map side chosen at the coin flip, independent of pick order

---

## [1.2.3] — 2026-06-17

### Fixed
- **Neutral objective timings**: Baron (Nashor) appears at minute 20 of the game, respawns 6 min after death; Herald appears at minute 14 — the simulation respects these delays and prevents any Baron event before these thresholds
- **Fearless in season**: Fearless Draft mode active for all regular-season matches (BO3)
- **Changelog**: the footer link opens a formatted modal window (no more 404 link)

### Added
- **Role filters in draft**: All / Top / Jungle / Mid / ADC / Support buttons during both bans AND picks

---

## [1.2.2] — 2026-06-17

### Added
- **Towers & Nexus on the map** — towers shown as blue/red squares (black with a colored outline when destroyed), nexus as a ★ star with the same visual logic
- **Riot Games disclaimer** — legal notice in the footer: independent project not affiliated with Riot Games
- **Changelog link** — clickable link to the changelog in the footer
- **Side/Pick for games 2+ in a series** — the loser of the previous game chooses first their category (side OR pick order); the winner gets the remaining category

### Fixed
- **Fatigue — `undefined` display**: the `p.fatigué` property (broken by the accent script in v1.2.1) fixed to `p.fatigue`
- **Map not displaying**: `IMG/map.png` path fixed to `img/map.png` (case-sensitive on a Linux server)
- **Teamfight (0 kills)**: a teamfight now guarantees ≥ 2 kills (4 max); if the kill cap is reached, 1 kill is still awarded
- **Alphabetical draft**: champions sorted alphabetically in the draft grid (bans and picks)
- **Fearless in season**: explicit guard — the fearless lock only applies if `fearlessMode === 'on'`, eliminating any risk of a false positive in the regular season

---

## [1.2.1] — 2026-06-16

### Fixed
- **French accents** — all game text fixed with missing accents (é, è, ê, à, î, ç, etc.) in `game.js` and `index.html` (~400 replacements)

---

## [1.2.0] — 2026-06-16

### Added
- **GitHub Gist cloud save** — optional cross-device sync via GitHub Gist (ID + token), built-in tutorial, works alongside local mode

---

## [1.1.0] — 2026-06-16

### Added
- **Transfer market** — recruiting free agents and AI team players, stat comparison, budget management, confirmation modal
- **PWA** — installable on iOS (Safari) and Android (Chrome), offline mode via Service Worker, native icons
- **Competition start popups** — format explanation at the launch of every split and every international tournament (MSI/Worlds)
- **Legal footer** — BETA badge, copyright © 2026 Thierry Demorest, localStorage storage notice

### Changed
- **Match formats** — regular season in BO3 (was BO1), all playoffs matches in BO5
- **MSI/Worlds group draw** — two teams from the same region can no longer be in the same group
- **Navigation** — fixed sidebar on desktop, horizontal bar on mobile

### Fixed
- Player signed from the market: missing `level`, `form`, `nationality` → showing `undefined` in the roster
- All BO1 labels and calls replaced with BO3 in the season flow and international tournaments

---

## [0.1.0-beta] — 2026-06-16

### Added
- **Roster** — display of the 5 players with full stats, champion pool, traits and fatigue bar
- **Training & Scrims** — training sessions with stat improvement and fatigue management
- **Calendar** — season tracking by regional league
- **Draft** — full draft system with bans, picks and per-team pick order
- **Counters** — champion matchup database with role filters and confidence level
- **Match** — real-time simulation with objectives (Dragons, Baron, Elder, Void Grubs), event log and x1/x2/x3/x5 speeds
- **Scouting** — opposing team analysis before a match
- **Transfer market** — recruiting free agents and AI team players, stat comparison, budget management
- **Progression** — match history, player evolution, JSON save export/import
- **7 playable regions** — LEC, LCK, LPL, LTA, LCP, CBLOL, LJL with distinct playstyles
- **"Rift Night" palette** — dark navy / royal blue / gold design
- **Sidebar navigation** — fixed side menu on desktop, horizontal bar on mobile
- **Auto-save** — progress persisted in localStorage
- **Resource bar** — Coaching Points, Budget and Prestige always accessible in the header
- **Economic system** — budget deducted on every signing, checked before confirmation
- **Legal footer** — BETA badge, copyright © 2026 Thierry Demorest, localStorage storage notice
- **Responsive design** — breakpoints at 768px and 480px

### Fixed
- `forme` → `form` mapping and added `level` when signing a player (avoided `undefined` in the roster)
- `disabled` attribute on "Insufficient budget" buttons in the transfer market
- Missing CSS classes (`comp-tag-checkbox`, `draft-bans__team`) identified and added
- `flex-wrap: nowrap` on the header to prevent the resource bar from wrapping

---

## Upcoming

- Full split system with standings and promotion/relegation between divisions
- Dynamic economy — earnings based on wins, sponsors, prestige
- Cumulative fatigue between matches affecting performance
- Player contracts and free agents at season end
- Meta patches per split influencing draft picks
- Detailed post-match summary with individual stats (KDA, objectives)
