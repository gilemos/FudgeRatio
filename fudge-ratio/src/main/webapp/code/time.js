class Timer {
  seconds = 0;
  minutes = 0;
  hours = 0;

  interval = null;

  // Concatenates a zero to the beginning of a number less than 10.
  padd(num) {
    const padding = num < 10 ? "0" : "";
    return padding + num;
  }

  constructor(time) {
    if (time) {
      this.hours = parseInt(time.substring(0, 2));
      this.minutes = parseInt(time.substring(3, 5));
      this.seconds = parseInt(time.substring(6, 8));
    }
  }

  allSeconds() {
    return this.seconds + this.minutes * 60 + this.hours * 3600;
  }

  addOneSecond() {
    this.seconds++;
    if (this.seconds == 60) {
      this.minutes++;
      this.seconds = 0;
    }
    if (this.minutes == 60) {
      this.hours = (this.hours + 1) % 24;
      this.minutes = 0;
    }
  }

  getText() {
    return this.padd(this.hours) + ":" + this.padd(this.minutes) + ":" + this.padd(this.seconds);
  }

  updateTimer(elapsed) {
    this.seconds = elapsed % 60;
    this.minutes = Math.floor(elapsed / 60) % 60;
    this.hours = Math.floor(elapsed / 3600) % 24;
  }

  clear() {
    (this.seconds = 0), (this.minutes = 0), (this.hours = 0);
  }
}

export default Timer;
