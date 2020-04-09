import Timer from "./time.js";

const finalMessage = document.getElementById("finalMessage");

const formatTaskString = dropdown => {
  const task = dropdown.value;
  let op = dropdown.options[dropdown.selectedIndex];
  let category = op.parentNode.label;
  let formattedString = "";
  if (category == "Schoolwork") {
    formattedString = task + " homework!";
  } else if (category == "Job-related tasks") {
    formattedString = "doing " + task + "!";
  } else formattedString = task + "!";
  return formattedString;
};

const displayMessage = (dropdown, actual, expected) => {
  const act = new Timer(actual);
  const expe = new Timer(expected);

  const ratio = act.allSeconds() / expe.allSeconds();
  const duration = ratio + "x";

  finalMessage.innerHTML =
    "Next time please allocate " + duration + " for " + formatTaskString(dropdown);
};

export default displayMessage;
