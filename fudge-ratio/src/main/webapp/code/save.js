const timeKey = "startingTime";
const indexKey = "selectedIndex";

const saveSessionState = dropdown => {
  if (isNotEmpty()) return;
  localStorage.setItem(timeKey, Date.now());
  localStorage.setItem(indexKey, dropdown.selectedIndex);
};

const recoverSessionState = () => {
  return [localStorage.getItem(timeKey), localStorage.getItem(indexKey)];
};

const cleanSessionState = () => {
  localStorage.removeItem(timeKey);
  localStorage.removeItem(indexKey);
};

const isNotEmpty = () => recoverSessionState().every(x => x != null)

export {saveSessionState, recoverSessionState, cleanSessionState, isNotEmpty}