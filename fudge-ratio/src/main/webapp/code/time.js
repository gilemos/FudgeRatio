class Timer {
  seconds = 0;
  constructor(time = "00:00:00") {
    const seconds = parseInt(time.substring(6, 8));
    const minutes = 60 * parseInt(time.substring(3, 5));
    const hours = 3600 * parseInt(time.substring(0, 2));

    this.seconds = seconds + minutes + hours;
  }

  // Concatenates a zero to the beginning of a number less than 10.
  padd(num = 0) {
    const padding = num < 10 ? "0" : "";
    return padding + num.toString();
  }

  addSeconds(howMany = 0) {
    this.seconds = Math.max(0, howMany + this.seconds);
    return this;
  }

  getText() {
    const seconds = this.padd(this.seconds % 60);
    const minutes = this.padd(Math.floor(this.seconds / 60) % 60);
    const hours = this.padd(Math.floor(this.seconds / 3600) % 24);

    return `${hours}:${minutes}:${seconds}`;
  }

  updateTimer(elapsed = 0) {
    this.seconds = elapsed;
    return this;
  }

  clear() {
    this.seconds = 0;
    return this;
  }
}

export default Timer;
