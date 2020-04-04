const button = document.getElementById("startStopButton");
const buttonClear = document.getElementById("clear");
const buttonAddHour = document.getElementById("add-hour");
const buttonMinusHour = document.getElementById("minus-hour");
const buttonAddMinute = document.getElementById("add-minute");
const buttonMinusMinute = document.getElementById("minus-minute");
const buttonAddSecond = document.getElementById("add-second");
const buttonMinusSecond = document.getElementById("minus-second");
const text = document.getElementById("timer");
const durationText = document.getElementById("time");
const dropdown = document.getElementById("dropdown-contents");

button.textContent = "Start";

let seconds = 0,
  minutes = 0,
  hours = 0,
  durationSec = 0,
  durationMin = 0,
  durationHour = 0;
let timer = null;
let task = "";
let duration = " PLACE HOLDER"; //leaving this here for now because it might interfere with how Jerry wants to do things

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
  displayMessage();
};

button.addEventListener("click", () => {
  if (button.textContent === "Start") {
    if (dropdown.value == "") {
      alert("You must pick a task before starting");
      return;
    }
    task = dropdown.value;
    const minutesSince = startTimer();
    saveSessionState();
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
  cleanSessionState();
});

buttonAddHour.addEventListener("click", () => {
    durationHour += 1;
    durationText.textContent = padd(durationHour) + ":" + padd(durationMin) + ":" + padd(durationSec);
});

buttonMinusHour.addEventListener("click", () => {
    if(durationHour > 0) {
        durationHour -= 1;
    }
    durationText.textContent = padd(durationHour) + ":" + padd(durationMin) + ":" + padd(durationSec);
});

buttonAddMinute.addEventListener("click", () => {
    if(durationMin == 59) {
        durationMin = 0;
        durationHour += 1;
    } else {
        durationMin += 1;
    }
    durationText.textContent = padd(durationHour) + ":" + padd(durationMin) + ":" + padd(durationSec);
});

buttonMinusMinute.addEventListener("click", () => {
    if(durationMin > 0) {
        durationMin -= 1;
    }
    durationText.textContent = padd(durationHour) + ":" + padd(durationMin) + ":" + padd(durationSec);
});

buttonAddSecond.addEventListener("click", () => {
    if(durationSec == 59) {
        durationSec = 0;
        if(durationMin == 59) {
            durationMin = 0;
            durationHour += 1;
        } else {
            durationMin += 1;
        }
    } else {
        durationSec += 1;
    }
    durationText.textContent = padd(durationHour) + ":" + padd(durationMin) + ":" + padd(durationSec);
});

buttonMinusSecond.addEventListener("click", () => {
    if(durationSec > 0) {
        durationSec -= 1;
    }
    durationText.textContent = padd(durationHour) + ":" + padd(durationMin) + ":" + padd(durationSec);
});

const formatTaskString = () => {
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
const displayMessage = () => {
  document.getElementById("finalMessage").innerHTML =
    "Next time please allocate" + duration + " for " + formatTaskString();
};

// Save state in local Store ====
const timeKey = "startingTime";
const indexKey = "selectedIndex";

const saveSessionState = () => {
  if (informationThere(recoverSessionState())) return;
  localStorage.setItem(timeKey, Date.now());
  localStorage.setItem(indexKey, dropdown.selectedIndex);
};

const recoverSessionState = () => {
  return [localStorage.getItem(timeKey), localStorage.getItem(indexKey)];
};

function loadActivities() {
    fetch('/data').then(response => response.json()).then((activities) => {
        activities.forEach((activity) => {
            let activityType = activity.type;
            const activityListElement = document.getElementById(activityType);
            activityListElement.appendChild(createElement(activity));
        })
    });
}

function createElement(act) {
    const optionElement = document.createElement("OPTION");
    optionElement.text = act.name;
    optionElement.label = act.name;
    optionElement.value = act.name;
    return optionElement;
}

const cleanSessionState = () => {
  localStorage.removeItem(timeKey);
  localStorage.removeItem(indexKey);
};

const informationThere = array => array.every(x => x != null);

if (informationThere(recoverSessionState())) {
  const [timeStarted, selectedIndex] = recoverSessionState();
  const start = parseInt(timeStarted);
  dropdown.selectedIndex = selectedIndex;

  const now = Date.now();
  const elapsed = Math.floor((now - start) / 1000);

  seconds = elapsed % 60;
  minutes = Math.floor(elapsed / 60) % 60;
  hours = Math.floor(elapsed / 3600) % 24;
  updateText();
  button.click();
}

dropdown.addEventListener("change", () => {
  const current = recoverSessionState()[1];
  if (current) dropdown.selectedIndex = current
});
