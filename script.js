import { SOUNDS, INITIAL_TILES } from './constants.js';

const tiles = { ...INITIAL_TILES };
let intervalId;
let isPlaying = false;
let currentStep = 0;
let intervalTime = 500;

function playOrPause() {
  isPlaying = !isPlaying;
  const icon = document.querySelector(".ph-fill");

  if (isPlaying) {
    icon.classList.remove("ph-play");
    icon.classList.add("ph-pause");

    intervalId = setInterval(() => {
      const rows = document.querySelectorAll(".row");

      for (const row of rows) {
        const cells = row.querySelectorAll('.cell');
        const currentCell = cells[currentStep];
        const previousCell = cells[currentStep - 1];

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
    }, intervalTime);
  } else {
    icon.classList.remove("ph-pause");
    icon.classList.add("ph-play");
    clearInterval(intervalId);
  }
}

document.querySelector('.btn-play')?.addEventListener('click', playOrPause);
