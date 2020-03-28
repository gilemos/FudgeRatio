

var seconds = 0;
var minutes = 0;
var hours = 0;
var timer;

function interval() {
    document.getElementById("timer").innerHTML = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds);
    seconds++;
    if(seconds == 60) {
        minutes++;
        seconds = 0;
    }
    if(minutes == 60) {
        hours++;
        minutes = 0;
    }
}

function startTimer() {
    if(!timer) {
        timer = setInterval(interval, 1000);
    }
}

function stopTimer() {
    
}

function addZero(number) {
    if(number < 10) {
        return number = "0" + number;
    }
    else {
        return number;
    }
}