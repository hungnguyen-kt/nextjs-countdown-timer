class CountdownTimer {
  private targetDateTime: number;
  private daysEl: HTMLElement | null;
  private hoursEl: HTMLElement | null;
  private minutesEl: HTMLElement | null;
  private secondsEl: HTMLElement | null;
  private timer: NodeJS.Timeout | null;

  constructor(
    date: string,
    daysEl: HTMLElement | null,
    hoursEl: HTMLElement | null,
    minutesEl: HTMLElement | null,
    secondsEl: HTMLElement | null
  ) {
    this.targetDateTime = new Date(date).getTime();
    this.daysEl = daysEl;
    this.hoursEl = hoursEl;
    this.minutesEl = minutesEl;
    this.secondsEl = secondsEl;
    this.timer = null;
  }

  private formatNumber(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

  private setTimer(
    days: string,
    hours: string,
    minutes: string,
    seconds: string
  ) {
    if (this.daysEl) {
      this.daysEl.innerHTML = days;
    }
    if (this.hoursEl) {
      this.hoursEl.innerHTML = hours;
    }
    if (this.minutesEl) {
      this.minutesEl.innerHTML = minutes;
    }
    if (this.secondsEl) {
      this.secondsEl.innerHTML = seconds;
    }
  }

  private updateTime(remainingTime: number) {
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    this.setTimer(
      this.formatNumber(days),
      this.formatNumber(hours),
      this.formatNumber(minutes),
      this.formatNumber(seconds)
    );
  }

  public start() {
    this.timer = setInterval(() => {
      const now = new Date().getTime();
      const remainingTime = this.targetDateTime - now;

      if (remainingTime <= 0) {
        this.stop();
        return;
      } else {
        this.updateTime(remainingTime);
      }
    }, 1000);
  }

  public stop() {
    if (this.timer) {
      this.setTimer('00', '00', '00', '00');
      clearInterval(this.timer);
    }
  }
}

export default CountdownTimer;
