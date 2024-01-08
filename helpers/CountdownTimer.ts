class CountdownTimer {
  private targetDateTime: number;
  private daysEl: HTMLElement;
  private hoursEl: HTMLElement;
  private minutesEl: HTMLElement;
  private secondsEl: HTMLElement;
  private timer: NodeJS.Timeout | null;

  constructor(date: string, daysEl: any, hoursEl: any, minutesEl: any, secondsEl: any) {
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

  private updateTime(remainingTime: number) {
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

    this.daysEl.innerHTML = this.formatNumber(days);
    this.hoursEl.innerHTML = this.formatNumber(hours);
    this.minutesEl.innerHTML = this.formatNumber(minutes);
    this.secondsEl.innerHTML = this.formatNumber(seconds);
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
      clearInterval(this.timer);
    }
  }
}

export default CountdownTimer;
