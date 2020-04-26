const expectedTimeText = `
  <div id="expected-time">
    <p class="title" id="text">Enter expected time</p>
    <div class="duration-buttons">
      <button title="Add hour" id="add-hour">∧</button>
      <button title="Add minute" id="add-minute">∧</button>
      <button title="Add second" id="add-second">∧</button>
    </div>
    <p id="timer-display">00:00:00</p>
    <div class="duration-buttons">
      <button title="Minus hour" id="minus-hour">∨</button>
      <button title="Minus minute" id="minus-minute">∨</button>
      <button title="Minus second" id="minus-second">∨</button>
    </div>
    <button disabled id="submit">Add Duration</button>
  </div>
  `;

import { get, parent, createFromText } from "./utils.js";
import { KEYS } from "./save.js";
import Timer from "./time.js";

const showExpectedTime = () =>
  new Promise((resolve, _) => {
    const timer = new Timer();

    const expectedStorage = localStorage.getItem(KEYS.EXPECTED_KEY);
    if (expectedStorage) {
      resolve(expectedStorage);
      return;
    }

    parent.appendChild(createFromText(expectedTimeText));

    const activity = localStorage.getItem(KEYS.ACTIVITY_KEY);
    get("text").textContent += ` for ${activity}`
    
    const text = get("timer-display");
    const updateAndShow = time => () => (text.textContent = timer.addSeconds(time).getText());
    get("add-second").onclick = updateAndShow(1);
    get("minus-second").onclick = updateAndShow(-1);

    get("add-minute").onclick = updateAndShow(60);
    get("minus-minute").onclick = updateAndShow(-60);

    get("add-hour").onclick = updateAndShow(3600);
    get("minus-hour").onclick = updateAndShow(-3600);

    const submitButton = get("submit");
    text.addEventListener(
      "DOMSubtreeModified",
      () => (submitButton.disabled = timer.getText() === "00:00:00")
    );

    submitButton.onclick = () => {
      if (submitButton.disabled) return;
      localStorage.setItem(KEYS.EXPECTED_KEY, timer.getText());
      const close = () => {
        parent.innerHTML = null;
        resolve(timer.getText());
      };

      get("expected-time").style.opacity = "0";
      setTimeout(close, 400);
    };
  });

export default showExpectedTime;
