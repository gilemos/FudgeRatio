const dropdownText = `
<div id="dropdown">
  <p>Select a task and click the start button when you're ready!</p>
  <label>Choose a task:</label>
  <select id="options">
      <option value="" selected>Select one</option>
      <optgroup label="Schoolwork" id="Schoolwork"></optgroup>
      <optgroup label="Job-related tasks" id="Job-related tasks"></optgroup>
      <optgroup label="Housework" id="Housework"></optgroup>
  </select>
  <button disabled id="submit">Add activity</button>
</div>
  `;

import { get, parent, createFromText } from "./utils.js";
import { KEYS } from "./save.js";

const getActivities = async () => {
  const response = await fetch("/data");
  return await response.json();
};

const appendActivities = async () => {
  const activities = await getActivities();

  const create = name => {
    const node = document.createElement("option");
    node.value = node.text = node.label = name;
    return node;
  };

  activities.forEach(({ type, name }) => get(type)?.appendChild(create(name)));
};

const showActivities = () =>
  new Promise(async (resolve, _) => {
    const activityStorage = localStorage.getItem(KEYS.INDEX_KEY);
    if (activityStorage) {
      resolve(activityStorage);
      return;
    }
    parent.appendChild(createFromText(dropdownText));
    await appendActivities();

    const submitButton = get("submit");
    const options = get("options");
    options.onchange = () => (submitButton.disabled = options.value == "");

    submitButton.onclick = () => {
      if (submitButton.disabled) return;
      localStorage.setItem(KEYS.INDEX_KEY, options.selectedIndex);
      const close = () => {
        parent.innerHTML = null;
        resolve(options.value);
      };

      get("dropdown").style.opacity = "0";
      setTimeout(close, 400);
    };
  });

export { getActivities };
export default showActivities;
