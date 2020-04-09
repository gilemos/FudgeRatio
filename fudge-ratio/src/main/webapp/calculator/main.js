import { saveSessionState, recoverSessionState } from "../code/save.js";
import { cleanSessionState, isNotEmpty } from "../code/save.js";
import loadActivities from "../code/loadActivities.js";
import displayMessage from "../code/nextTimeAllocate.js";
import Timer from "../code/time.js";
import "../code/expectedTime.js";

const button = document.getElementById("startStopButton");
const buttonClear = document.getElementById("clear");
const text = document.getElementById("timer");
const dropdown = document.getElementById("dropdown-contents");

button.textContent = "Start";

const timer = new Timer();

button.addEventListener("click", () => {
  if (button.textContent === "Start") {
    if (dropdown.value == "") {
      alert("You must pick a task before starting");
      return;
    }
    const minutesSince = startTimer();
    saveSessionState(dropdown);
  } else {
    stopTimer();
  }
  button.classList.toggle("stop");
  text.classList.toggle("stopped");
  button.textContent = button.textContent === "Start" ? "Stop" : "Start";
});

// Recover state

loadActivities(() => {
  if (isNotEmpty()) {
    const [timeStarted, selectedIndex] = recoverSessionState();
    const start = parseInt(timeStarted);

    setTimeout(() => {
      dropdown.selectedIndex = selectedIndex;
      const now = Date.now();
      const elapsed = Math.floor((now - start) / 1000);

      timer.updateTimer(elapsed);
      text.textContent = timer.getText();
      button.click();
    }, 1000);
  }
});

// When the start button is clicked, the timer variable is initialized to 1 every second.
const startTimer = () => {
  if (timer.interval) return;
  timer.interval = setInterval(() => {
    timer.addOneSecond();
    text.textContent = timer.getText();
  }, 1000);
};

// Stops the increment of hours, minutes, and seconds on the timer.
const stopTimer = () => {
  clearInterval(timer.interval);
  timer.interval = null;
  cleanSessionState();

  displayMessage(dropdown, timer.getText(), localStorage.getItem("expected"));
  localStorage.removeItem("expected");
};

buttonClear.addEventListener("click", () => {
  if (button.textContent === "Stop") button.click();
  timer.clear();
  text.textContent = timer.getText();
  cleanSessionState();
  localStorage.clear();
  dropdown.selectedIndex = 0;
});

dropdown.addEventListener("change", () => {
  const current = recoverSessionState()[1];
  if (current) dropdown.selectedIndex = current;
});
