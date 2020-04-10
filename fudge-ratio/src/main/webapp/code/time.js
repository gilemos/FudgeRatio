class Timer {
  seconds = 0;
  interval = null;

  constructor(time) {
    if (time) {
      const seconds = parseInt(time.substring(6, 8));
      const minutes = 60 * parseInt(time.substring(3, 5));
      const hours = 3600 * parseInt(time.substring(0, 2));

      this.seconds = seconds + minutes + hours;
    }
  }

  // Concatenates a zero to the beginning of a number less than 10.
  padd(num) {
    const padding = num < 10 ? "0" : "";
    return padding + num;
  }

  addSeconds(howMany) {
    this.seconds = Math.max(0, howMany + this.seconds);
    return this;
  }

  getHuman() {
    const seconds = this.seconds % 60;
    const minutes = Math.floor(this.seconds / 60) % 60;
    const hours = Math.floor(this.seconds / 3600) % 24;
    return [seconds, minutes, hours];
  }

  getText() {
    const [seconds, minutes, hours] = this.getHuman();
    return this.padd(hours) + ":" + this.padd(minutes) + ":" + this.padd(seconds);
  }

  updateTimer(elapsed) {
    this.seconds = elapsed;
  }

  clear() {
    this.seconds = 0;
  }
}

export default Timer;
