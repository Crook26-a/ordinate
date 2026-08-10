# Ordinate Survey

The plotting table for **Errantry**. Lay out a country in stones and
roads, put things in the places worth going to, and see what the whole
thing is worth before you commit three months to walking it.

It's one HTML file. No build step, no dependencies, no server.

## Running it

Open `index.html` in a browser. That's it.

To install it as an app you need HTTPS, so push this folder to GitHub
Pages and add it to your home screen or desktop from there.

## Deploying

Either works, with the same files — every path is relative.

**As a folder inside the game's repo.** Drop this `survey` folder into the
Errantry repo and it's live at `yourname.github.io/errantry/survey/`. One
repo, one deploy, and it sits next to the game so exporting a map and
pasting it in is two clicks.

**As its own repo.** Upload the *contents* of this folder to a new public
repo, turn on Pages, and it's live at `yourname.github.io/ordinate-survey/`.
Cleaner separation, one more thing to keep track of.

## What it holds

**Surveys** — stones, roads with real mileage, terrain, and rivers.
Roads measure along their curve, so a meander costs what a meander costs.

**Town plans** — step inside any marker and draw streets, squares and
blocks at yards per pixel instead of miles.

**Premises** — what's behind a door. Who keeps it, who else is about,
what they'll tell you, what's for sale.

**Sites** — foes and loot, graded against a solo budget as you add them.
"Two bandits" stops being a guess.

**Hidden things** — a skill check, a difficulty, and what turns up. With
a live readout of who can actually clear that DC.

**The ledger** — what the map is worth in experience, what level cap it
can support, and everything that wants attention: places with nothing in
them, sites that would kill a carrier, roads that go nowhere.

## Your work lives in this browser

Surveys are held in IndexedDB on the machine you drew them on. They do
not sync, and they are not in the repo.

The **shelf** in the Data pane keeps as many maps as you like and never
discards one silently — anything you replace goes on the shelf first. But
that's still one browser. **Download the JSON** for anything you'd hate
to redraw.

## Feeding the game

Data pane → **Copy JSON to clipboard**, then paste it wherever the game
wants a survey. The export carries every town plan with it.

Ids are permanent: a saved campaign remembers where it is by node id and
road id. Rename `n3` and somebody's character is standing nowhere.
