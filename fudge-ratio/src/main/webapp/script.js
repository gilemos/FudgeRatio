const button = document.getElementById("startStopButton");
const text = document.getElementById("timer");
button.textContent = "Start";

let seconds = 0,
  minutes = 0,
  hours = 0;
let timer = null;

// Concatenates a zero to the beginning of a number less than 10.
const padd = num => (num < 10 ? "0" : "") + num;

// Checks when the start and stop buttons are clicked once the HTML page is loaded.
window.addEventListener("load", activateListeners);

// Waits for the user to click start or stop to run their respective functions.
function activateListeners() {
    document.getElementById("start-button").addEventListener("click", startTimer);
    document.getElementById("stop-button").addEventListener("click", stopTimer);
}

// Updates the timer text in index.html to increment every second, minute, and hour.
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

// When the start button is clicked, the timer variable is initialized to 1 every second.
const startTimer = () => {
  if (timer) return;
  timer = setInterval(() => {
    addOneSecond();
    text.textContent = padd(hours) + ":" + padd(minutes) + ":" + padd(seconds);
  }, 1000);
};

// Stops the increment of hours, minutes, and seconds on the timer.
const stopTimer = () => {
  clearInterval(timer);
  timer = null;
};

button.addEventListener("click", event => {
  if (button.textContent === "Start") {
    const minutesSince = startTimer();
  } else {
    stopTimer();
  }

  button.classList.toggle("stop")
  text.classList.toggle("stopped")
  button.textContent = button.textContent === "Start" ? "Stop" : "Start";
});
