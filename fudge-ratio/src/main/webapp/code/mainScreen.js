const mainText = `
  <div id="timer-contents">
    <h3 id="title"></h3>
    <p id="timer-display">00:00:00</p>
    <div class="timer-buttons">
      <div>
        <button id="start-stop">Start</button>
        <button id="finish" disabled>Finish</button>
      </div>
      <div>
        <button id="clear">Reset all</button>
      </div>
    </div>
  </div>
  `;

import { get, parent, createFromText } from "./utils.js";
import { KEYS } from "./save.js";
import Timer from "./time.js";

const showMain = () =>
  new Promise((resolve, _) => {
    const finalTime = localStorage.getItem(KEYS.FINAL_KEY);
    if (finalTime) {
      resolve(finalTime);
      return;
    }

    const timerStorage = localStorage.getItem(KEYS.TIME_KEY);
    const timer = new Timer();

    parent.appendChild(createFromText(mainText));

    const activity = localStorage.getItem(KEYS.ACTIVITY_KEY);
    get("title").textContent = "You are doing: " + activity;

    const text = get("timer-display");
    const startStop = get("start-stop");
    const finish = get("finish");
    const oneDay = 1000 * 60 * 60 * 24;
    let id = null;
    let keepGoing = true;
    startStop.onclick = () => {
      if (startStop.textContent !== "Stop for a bit") {
        id = setInterval(() => (text.textContent = timer.addSeconds(1).getText()), 1000);
        startStop.textContent = "Stop for a bit";
        startStop.style.backgroundColor = "var(--red-color)";
        text.style.fontWeight = 700;
        finish.disabled = false;
        if (!timerStorage) localStorage.setItem(KEYS.TIME_KEY, Date.now());
        if (localStorage.getItem(KEYS.TIME_KEY)){
          let elapsed = Date.now() - localStorage.getItem(KEYS.TIME_KEY);
          if (elapsed > oneDay) {
              keepGoing = confirm("You have been gone for a while, would you like to continue?");
          }
          if (!keepGoing) {
            localStorage.clear();
            location.reload();
          }
        }
      }
        else {
        startStop.textContent = "Continue";
        text.style.fontWeight = 400;
        startStop.style.backgroundColor = "var(--green-color)";
        clearInterval(id);
        localStorage.removeItem(KEYS.TIME_KEY);
      }
    };

    if (timerStorage) {
      timer.seconds = Math.round((Date.now() - timerStorage) / 1000);
      startStop.click();
    }

    get("clear").onclick = () => {
      localStorage.clear();
      location.reload();
    };

    get("finish").onclick = async () => {
      startStop.click();
      localStorage.setItem(KEYS.FINAL_KEY, timer.getText());
      parent.innerHTML = null;
      resolve(timer.getText());
    };
  });

export default showMain;
