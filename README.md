# Browser Beat Maker

A **browser-based step sequencer** and **drum machine** built with **vanilla JavaScript**. Compose 16-step patterns across five 808-style tracks, adjust tempo in real time, and save or load beats as JSON.

---

## Features

- **5 tracks** — Kick, Snare, Hi-Hat, Clap, Bass (808 samples in `sounds/`)
- **16-step sequencer** — classic 4/4 grid, one bar per loop
- **Transport** — Play / pause with visual playhead per track
- **Tempo** — BPM slider (60–200); interval recalculates while playing
- **Pattern tools** — Clear, randomize, toggle steps on click
- **Save & load** — Export/import patterns as `.json` (named via beat title field)

---

## Tech stack

- **HTML5** — static markup, checkbox step cells
- **CSS3** — custom console UI (Inter + JetBrains Mono, Phosphor Icons via CDN)
- **JavaScript (ES modules)** — `script.js`, `constants.js`
- **Web Audio API** — sample playback through native `<audio>` elements
- **Zero npm dependencies** — clone and run; no install or bundler required

---

## Quick start

```bash
git clone https://github.com/felibuscaglia/browser-beat-maker.git
cd browser-beat-maker
```

**Option A — open directly**

```bash
open index.html   # macOS
```

**Option B — local server** (recommended; avoids module/CORS quirks in some browsers)

```bash
npx serve .
# or: python3 -m http.server 8000
```

Then visit the URL shown (e.g. `http://localhost:3000`).

---

## Usage

1. Click cells in the grid to enable or disable steps per instrument.
2. Press **Play** to start the sequencer; adjust **BPM** anytime.
3. Use **Clear** to reset the pattern, **Randomize** for a random fill.
4. Enter a beat name, then **Save** to download JSON; **Load** to restore a saved pattern.

---

## Project structure

```
browser-beat-maker/
├── index.html      # Markup, step grid, transport controls
├── styles.css      # Layout and visual design
├── script.js       # Sequencer logic, events, save/load
├── constants.js    # Sound map and default pattern
└── sounds/         # 808 kick, snare, hi-hat, clap, bass samples
```

---

## How the sequencer works

- A `setInterval` tick advances `currentStep` (0–15) at `60000 / bpm / 4` ms (16th notes).
- Each tick checks `tiles[instrument][step]` and plays the matching sample if active.
- Pattern state lives in a `tiles` object mirrored to checkbox inputs in the DOM.
- Save serializes `tiles` to JSON; load parses the file and syncs the grid.

---

## Keywords

`step sequencer` · `drum machine` · `beat maker` · `vanilla javascript` · `web audio` · `browser music` · `808 drums` · `portfolio project` · `front-end`

---

## License

Source code and assets in this repository are provided for portfolio and educational use. Contact the author for other uses.
