class DigitalClock {
  template: string;

  constructor(template: string) {
    this.template = template;
  }

  private render() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const output = this.template
      .replace('h', hours.toString())
      .replace('m', minutes.toString())
      .replace('s', seconds.toString());

    document.getElementById('clock')!.innerHTML = output;
  }

  start() {
    this.render();
    setInterval(() => this.render(), 1000);
  }
}

export default DigitalClock;
