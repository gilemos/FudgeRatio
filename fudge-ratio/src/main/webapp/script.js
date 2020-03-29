/* This is a javascript page for the index.html */

let seconds = 0;
let minutes = 0;
let totalMinutes = 0;
let hours = 0;
let timer;

// Updates the timer text in index.html to increment every second, minute, and hour.
function interval() {
    document.getElementById("timer").innerHTML = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds);
    seconds++;
    if(seconds == 60) {
        minutes++;
        totalMinutes++;
        console.log(totalMinutes);
        seconds = 0;
    }
    if(minutes == 60) {
        hours++;
        minutes = 0;
    }
}

// When the start button is clicked, the timer variable is initialized to 1 every second.
function startTimer() {
    if(!timer) {
        timer = setInterval(interval, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    timer = 0;
}

// Concatenates a zero to the beginning of a number less than 10.
function addZero(number) {
    if(number < 10) {
        return number = "0" + number;
    }
    else {
        return number;
    }
}