import { SOUNDS, INITIAL_TILES } from "./constants.js";

const tiles = { ...INITIAL_TILES };
let intervalId;
let isPlaying = false;
let currentStep = 0;
let bpm = 120;
let intervalTime = 60_000 / bpm / 4;

const INSTRUMENTS = Object.keys(SOUNDS);
const grid = Object.fromEntries(
  INSTRUMENTS.map((instrument) => {
    const row = document.querySelector(`.row.${instrument}`);
    const inputs = [...row.querySelectorAll(".cell input")];
    return [instrument, inputs];
  }),
);

function tick() {
  for (const instrument of INSTRUMENTS) {
    const inputs = grid[instrument];
    const currentCell = inputs[currentStep].closest(".cell");
    const prevIndex = currentStep === 0 ? inputs.length - 1 : currentStep - 1;
    const previousCell = inputs[prevIndex].closest(".cell");

    previousCell?.classList.remove("playing");
    currentCell.classList.add("playing");

    if (tiles[instrument][currentStep]) {
      SOUNDS[instrument].cloneNode().play();
    }
  }

  currentStep = currentStep === 15 ? 0 : currentStep + 1;
}

function clear() {
  for (const instrument of INSTRUMENTS) {
    for (let i = 0; i < grid[instrument].length; i++) {
      grid[instrument][i].checked = false;
      tiles[instrument][i] = false;
    }
  }
}

function playOrPause() {
  isPlaying = !isPlaying;
  const icon = document.querySelector(".ph-fill");

  if (isPlaying) {
    icon.classList.remove("ph-play");
    icon.classList.add("ph-pause");
    intervalId = setInterval(tick, intervalTime);
  } else {
    icon.classList.remove("ph-pause");
    icon.classList.add("ph-play");
    clearInterval(intervalId);
    currentStep = 0;

    document
      .querySelectorAll(".cell.playing")
      .forEach((c) => c.classList.remove("playing"));
  }
}

function changeBpm({ target }) {
  bpm = target.value;
  intervalTime = 60_000 / bpm / 4;

  if (isPlaying) {
    clearInterval(intervalId);
    intervalId = setInterval(tick, intervalTime);
  }
}

function toggleCell(instrument, index) {
  tiles[instrument][index] = !tiles[instrument][index];
}

document.querySelector(".btn-play")?.addEventListener("click", playOrPause);
document.querySelector(".bpm-slider")?.addEventListener("input", (e) => {
  const { value, min, max } = e.target;
  const pct = ((value - min) / (max - min)) * 100;
  document.querySelector(".num").textContent = value;
  document
    .querySelector(".bpm-slider-wrap")
    .style.setProperty("--bpm-fill", `${pct}%`);
});
document.querySelector(".bpm-slider")?.addEventListener("change", changeBpm);
document.querySelector(".btn.danger")?.addEventListener("click", clear);
document.querySelectorAll(".cell").forEach((cell, i) => {
  while (i > 16) {
    i -= 16;
  }

  const instrument = cell.parentElement.classList[1];
  cell.firstChild.addEventListener("click", () => toggleCell(instrument, i));
});
