const button = document.getElementById("startStopButton");
const buttonClear = document.getElementById("clear");
const text = document.getElementById("timer");
button.textContent = "Start";

let seconds = 0,
  minutes = 0,
  hours = 0;
let timer = null;
let task = "";
let duration = " PLACE HOLDER" //leaving this here for now because it might interfere with how Jerry wants to do things

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
    if (document.getElementById('dropdown-contents').value == "") {
        alert("You must pick a task before starting");
        return;
    } 
    task = document.getElementById('dropdown-contents').value;
    const minutesSince = startTimer();
  } 
  else {
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
});

const formatTaskString = () => {
    let dropdown = document.getElementById("dropdown-contents");
    let op = dropdown.options[dropdown.selectedIndex];
	let category = op.parentNode.label;
    let formattedString = "";
    if (category == "Schoolwork"){
        formattedString = task + " homework!";
    }
    else if (category == "Job-related tasks"){
        formattedString = "doing " + task + "!" ;
    }
    else formattedString = task + "!"; 
    return formattedString; 
}
const displayMessage = () => {
    document.getElementById("finalMessage").innerHTML = "Next time please allocate" + duration + " for "  + formatTaskString();
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
    return optionElement;
}