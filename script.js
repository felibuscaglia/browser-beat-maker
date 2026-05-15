import { SOUNDS, INITIAL_TILES } from "./constants.js";

const tiles = { ...INITIAL_TILES };
let intervalId;
let isPlaying = false;
let currentStep = 0;
let bpm = 120;
let intervalTime = 60_000 / bpm / 4;

function tick() {
  const rows = document.querySelectorAll(".row");

  for (const row of rows) {
    const cells = row.querySelectorAll(".cell");
    const currentCell = cells[currentStep];
    const previousCell = cells[currentStep - 1] || cells[cells.length - 1];

    if (previousCell) {
      previousCell.classList.remove("playing");
    }

    currentCell.classList.add("playing");
    const instrument = row.classList[1];

    if (tiles[instrument][currentStep]) {
      SOUNDS[instrument].play();
    }
  }

  currentStep = currentStep === 15 ? 0 : currentStep + 1;
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
