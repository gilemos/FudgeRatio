const buttonAddHour = document.getElementById("add-hour");
const buttonMinusHour = document.getElementById("minus-hour");
const buttonAddMinute = document.getElementById("add-minute");
const buttonMinusMinute = document.getElementById("minus-minute");
const buttonAddSecond = document.getElementById("add-second");
const buttonMinusSecond = document.getElementById("minus-second");

const durationContents = document.getElementById("time-duration-contents");
const durationSubmit = document.getElementById("duration-submit");

const durationText = document.getElementById("time");

const timerContents = document.getElementById("timer-contents");
const dropdown = document.getElementById("dropdown-contents");

const padd = num => {
  const padding = num < 10 ? "0" : "";
  return padding + num;
};

let durationSec = 0,
  durationMin = 0,
  durationHour = 0;

const duration = localStorage.getItem("expected");

durationSubmit.addEventListener("click", () => {
  durationContents.style.display = "none";
  timerContents.style.display = "block";
  dropdown.style.display = "block";

  localStorage.setItem(
    "expected",
    [durationHour, durationMin, durationSec].map(e => padd(e)).join(":")
  );
});

if (duration) {
  [durationHour, durationMin, durationSec] = duration.split(":").map(e => Number(e));

  durationSubmit.click();
} else {
  timerContents.style.display = "none";
  dropdown.style.display = "none";
}

buttonAddHour.addEventListener("click", () => {
  durationHour += 1;
  durationText.textContent = padd(durationHour) + ":" + padd(durationMin) + ":" + padd(durationSec);
});

buttonMinusHour.addEventListener("click", () => {
  if (durationHour > 0) {
    durationHour -= 1;
  }
  durationText.textContent = padd(durationHour) + ":" + padd(durationMin) + ":" + padd(durationSec);
});

buttonAddMinute.addEventListener("click", () => {
  if (durationMin == 59) {
    durationMin = 0;
    durationHour += 1;
  } else {
    durationMin += 1;
  }
  durationText.textContent = padd(durationHour) + ":" + padd(durationMin) + ":" + padd(durationSec);
});

buttonMinusMinute.addEventListener("click", () => {
  if (durationMin > 0) {
    durationMin -= 1;
  }
  durationText.textContent = padd(durationHour) + ":" + padd(durationMin) + ":" + padd(durationSec);
});

buttonAddSecond.addEventListener("click", () => {
  if (durationSec == 59) {
    durationSec = 0;
    if (durationMin == 59) {
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
  if (durationSec > 0) {
    durationSec -= 1;
  }
  durationText.textContent = padd(durationHour) + ":" + padd(durationMin) + ":" + padd(durationSec);
});
