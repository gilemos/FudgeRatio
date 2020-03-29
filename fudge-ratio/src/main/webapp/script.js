const button = document.getElementById("startStopButton");
const buttonClear = document.getElementById("clear");
const text = document.getElementById("timer");
button.textContent = "Start";

let seconds = 0,
  minutes = 0,
  hours = 0;
let timer = null;

// Concatenates a zero to the beginning of a number less than 10.
const padd = num => (num < 10 ? "0" : "") + num;

const addOneSecond = () => {
  seconds++;
  if (seconds == 60) {
    minutes++;
    seconds = 0;
  }
  if (minutes == 60) {
    hours = (hours + 1) % 24;
    minutes = 0;
  }
};

// Updates the timer text in index.html to increment every second, minute, and hour.
const updateText = () =>
  (text.textContent = padd(hours) + ":" + padd(minutes) + ":" + padd(seconds));

// When the start button is clicked, the timer variable is initialized to 1 every second.
const startTimer = () => {
  if (timer) return;
  timer = setInterval(() => {
    addOneSecond();
    updateText();
  }, 1000);
};

// Stops the increment of hours, minutes, and seconds on the timer.
const stopTimer = () => {
  clearInterval(timer);
  timer = null;
};

button.addEventListener("click", () => {
  if (button.textContent === "Start") {
    const minutesSince = startTimer();
  } else {
    stopTimer();
  }

  button.classList.toggle("stop");
  text.classList.toggle("stopped");
  button.textContent = button.textContent === "Start" ? "Stop" : "Start";
});

buttonClear.addEventListener("click", () => {
  if (button.textContent === "Stop") button.click();
  (seconds = 0), (minutes = 0), (hours = 0);
  updateText();
});
