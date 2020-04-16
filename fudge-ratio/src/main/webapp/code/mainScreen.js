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
      <p id="result"></p>
    </div>
  </div>
  `;

import { get, parent, createFromText } from "./utils.js";
import { KEYS } from "./save.js";
import { getActivities } from "./chooseActivities.js";
import Timer from "./time.js";

const showMain = () =>
  new Promise((resolve, _) => {
    const timerStorage = localStorage.getItem(KEYS.TIME_KEY);
    const timer = new Timer();

    parent.appendChild(createFromText(mainText));

    const index = parseInt(localStorage.getItem(KEYS.INDEX_KEY));
    let activity = "";
    getActivities().then(activities => {
      activity = activities[index].name;
      get("title").textContent = `You are doing ${activity}`;
    });

    const text = get("timer-display");
    const startStop = get("start-stop");
    const finish = get("finish");
    let id = null;
    startStop.onclick = () => {
      if (startStop.textContent !== "Stop") {
        id = setInterval(() => (text.textContent = timer.addSeconds(1).getText()), 1000);
        startStop.textContent = "Stop";
        startStop.style.backgroundColor = "var(--red-color)";
        text.style.fontWeight = 700;
        finish.disabled = false;
        if (!timerStorage) localStorage.setItem(KEYS.TIME_KEY, Date.now());
      } else {
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

    get("finish").onclick = () => {
      startStop.click()
      const estimated = new Timer(localStorage.getItem(KEYS.EXPECTED_KEY));
      const ratio = timer.seconds / estimated.seconds;
      get("result").textContent = `Next time please allocate ${ratio.toFixed(2)}x for ${activity}`;
    };
  });

export default showMain;
