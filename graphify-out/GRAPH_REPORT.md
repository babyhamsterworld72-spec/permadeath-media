# Graph Report - permadeath-media  (2026-11-13)

## Corpus Check
- Corpus is ~27 words - fits in a single context window. You may not need a graph.

## Summary
- 26 nodes · 37 edges · 5 communities (4 shown, 1 thin omitted)
- Extraction: 49% EXTRACTED · 51% INFERRED · 0% AMBIGUOUS · INFERRED: 19 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Short-Form Hook Reels
- Full Story & Premise
- Parts 8-9 Cliffhangers
- Game & Art Style
- Repo & Hosting

## God Nodes (most connected - your core abstractions)
1. `Part 8 cover (s1p08_cover.jpg)` - 7 edges
2. `Quiet Hours (PERMADEATH Season 1 interactive story)` - 6 edges
3. `Full story compilation Parts 1-9 (10 min)` - 6 edges
4. `permadeath-media repo` - 4 edges
5. `PERMADEATH Instagram account` - 4 edges
6. `Part 9 cover (s1p09_cover.jpg)` - 4 edges
7. `Reel 1 cover "3 Rules After 3 AM"` - 4 edges
8. `Reel 2 cover "Find it in 5 seconds"` - 4 edges
9. `Part 8 reel (s1p08_upload.mp4)` - 3 edges
10. `Part 9 hook: "47 missed calls"` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Quiet Hours (PERMADEATH Season 1 interactive story)` --conceptually_related_to--> `PERMADEATH Instagram account`  [INFERRED]
  media/s1p08_cover.jpg → README.md
- `permadeath-media repo` --references--> `Part 8 cover (s1p08_cover.jpg)`  [EXTRACTED]
  README.md → media/s1p08_cover.jpg
- `Part 8 reel (s1p08_upload.mp4)` --references--> `Part 8 cover (s1p08_cover.jpg)`  [EXTRACTED]
  README.md → media/s1p08_cover.jpg
- `One life / permadeath rule (heart "ONE LIFE")` --semantically_similar_to--> `Premise: 9 nights, 1 life, you control it`  [INFERRED] [semantically similar]
  media/quiet_hours_full_s1p1-9.mp4 → media/long02_thumb.jpg
- `Full story compilation Parts 1-9 (10 min)` --conceptually_related_to--> `Part 8 reel (s1p08_upload.mp4)`  [INFERRED]
  media/quiet_hours_full_s1p1-9.mp4 → README.md

## Hyperedges (group relationships)
- **Short-form hook reels** — r01_reel, r02_reel, three_rules_3am, spot_it_game [INFERRED 0.75]
- **Quiet Hours release assets (reels, covers, full story)** — s1p08_reel, s1p09_reel, full_story, media_s1p08_cover, media_s1p09_cover, media_long02_thumb [INFERRED 0.85]

## Communities (5 total, 1 thin omitted)

### Community 0 - "Short-Form Hook Reels"
Cohesion: 0.33
Nodes (6): Silhouette hand under a door/ledge, Reel 1 cover "3 Rules After 3 AM", PERMADEATH Instagram account, Reel r01_three_rules.mp4 (28s), Reel r02_spot_it.mp4 (24s), Hook: 3 rules after 3 AM (your building has...)

### Community 1 - "Full Story & Premise"
Cohesion: 0.47
Nodes (6): Full story compilation Parts 1-9 (10 min), Long-form thumbnail "9 Nights. 1 Life. You control it.", Premise: 9 nights, 1 life, you control it, Written note: "If it knocks...", One life / permadeath rule (heart "ONE LIFE"), Quiet Hours (PERMADEATH Season 1 interactive story)

### Community 2 - "Parts 8-9 Cliffhangers"
Cohesion: 0.47
Nodes (6): Part 8 cover (s1p08_cover.jpg), Part 9 cover (s1p09_cover.jpg), Phone showing "MOM calling", Part 8 hook: "You never look", Part 9 hook: "47 missed calls", Part 9 reel (s1p09_upload.mp4, 61s)

### Community 3 - "Game & Art Style"
Cohesion: 0.40
Nodes (5): Dark bedroom with cat and lit door gap, Reel 2 cover "Find it in 5 seconds", Spot-the-wrong-thing engagement game (you live alone), Dark code-drawn stick-figure art style, Audience vote: comment A, B or C

## Knowledge Gaps
- **3 isolated node(s):** `Written note: "If it knocks..."`, `Hook: 3 rules after 3 AM (your building has...)`, `Silhouette hand under a door/ledge`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 4 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Quiet Hours (PERMADEATH Season 1 interactive story)` connect `Full Story & Premise` to `Short-Form Hook Reels`, `Parts 8-9 Cliffhangers`, `Game & Art Style`?**
  _High betweenness centrality (0.405) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `Quiet Hours (PERMADEATH Season 1 interactive story)` (e.g. with `Full story compilation Parts 1-9 (10 min)` and `Premise: 9 nights, 1 life, you control it`) actually correct?**
  _`Quiet Hours (PERMADEATH Season 1 interactive story)` has 4 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Written note: "If it knocks..."`, `Hook: 3 rules after 3 AM (your building has...)`, `Silhouette hand under a door/ledge` to the rest of the system?**
  _3 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Why does `PERMADEATH Instagram account` connect `Short-Form Hook Reels` to `Full Story & Premise`, `Repo & Hosting`?**
  _High betweenness centrality (0.286) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `Full story compilation Parts 1-9 (10 min)` (e.g. with `Long-form thumbnail "9 Nights. 1 Life. You control it."` and `Quiet Hours (PERMADEATH Season 1 interactive story)`) actually correct?**
  _`Full story compilation Parts 1-9 (10 min)` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Why does `Part 8 cover (s1p08_cover.jpg)` connect `Parts 8-9 Cliffhangers` to `Full Story & Premise`, `Game & Art Style`, `Repo & Hosting`?**
  _High betweenness centrality (0.277) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `PERMADEATH Instagram account` (e.g. with `Quiet Hours (PERMADEATH Season 1 interactive story)` and `Reel r01_three_rules.mp4 (28s)`) actually correct?**
  _`PERMADEATH Instagram account` has 3 INFERRED edges - model-reasoned connections that need verification._