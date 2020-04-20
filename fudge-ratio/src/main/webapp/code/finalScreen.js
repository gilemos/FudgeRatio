const mainText = `
  <div class="finalMessage">
    <p class="you" id="result"></p>
    <p class="others" id="average"></p>

    <div>
      <button class="active" id="clear">Start another task</button>
      <button class="active" id="home">Go Home</button>
    </div>
  </div>
  `;

import { get, parent, createFromText } from "./utils.js";
import { KEYS } from "./save.js";
import Timer from "./time.js";

const showFinal = () =>
  new Promise((resolve, _) => {
    parent.appendChild(createFromText(mainText));

    const startTimer = new Timer().getText();
    const expected = new Timer(localStorage.getItem(KEYS.EXPECTED_KEY)).seconds;
    const activity = localStorage.getItem(KEYS.ACTIVITY_KEY);
    const endTime = localStorage.getItem(KEYS.FINAL_KEY);

    const timer = new Timer(endTime);

    get("clear").onclick = () => {
      localStorage.clear();
      location.reload();
    };

    get("home").onclick = () => location.replace("/");

    (async () => {
      const response = await fetch("/fudgeRatio", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json;charset=UTF-8" },
        body: JSON.stringify({ start: startTimer, end: endTime, expected }),
      });

      const { ratio } = await response.json();
      const ratioText = `(${ratio.toFixed(2)}x) ${ratio > 1 ? "more" : "less"} for ${activity}`;

      const temporal = new Timer(endTime);
      temporal.seconds = Math.abs(timer.seconds - expected);
      get("result").textContent = `Next time think about allocating ${temporal.getHumanText()} ${ratioText}`;

      const responseData = await fetch("/data");
      const data = await responseData.json();
      const average = data.find(element => element.name === activity).avgFudgeRatio;
      const message = `Users usually take ${average}x ${average > 1 ? "more" : "less"}`;
      get("average").textContent = message + ` than expected for ${activity}`;
    })();
  });

export default showFinal;
