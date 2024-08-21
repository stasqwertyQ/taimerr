class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.timer = document.querySelector(selector);
    this.targetDate = targetDate;

    this.refs = {
      days: this.timer.querySelector('[data-value="days"]'),
      hours: this.timer.querySelector('[data-value="hours"]'),
      mins: this.timer.querySelector('[data-value="mins"]'),
      secs: this.timer.querySelector('[data-value="secs"]'),
    };

    this.start();
  }

  start() {
    this.updateClockface(0); // Оновити UI з початковими значеннями

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const time = this.targetDate - currentTime;

      if (time <= 0) {
        clearInterval(this.intervalId);
        this.updateClockface(0);
        return;
      }

      this.updateClockface(time);
    }, 1000);
  }

  updateClockface(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);

    this.refs.days.textContent = days;
    this.refs.hours.textContent = this.pad(hours);
    this.refs.mins.textContent = this.pad(mins);
    this.refs.secs.textContent = this.pad(secs);
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

// Приклад використання
new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2025'), // Вкажіть дату, до якої треба вести зворотний відлік
});
