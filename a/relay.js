class Relay {
  constructor(target, parent) {
    this.target = target;
    this.parent = parent;
  }

  toggle(force) {
    this.target.classList.toggle('_active', force);
  }

  get src() {
    return this.target.dataset.src;
  }
}

export default class Relays {
  constructor(target, onSwitch) {
    this.target = target;
    this.onSwitch = onSwitch;
    this.stack = new Map;
    this._active = null;

    [...target.children].forEach((el, i) => {
      this.stack.set(el, new Relay(el, this));
    });

    this.activeRelay = this.stack.values().next().value;
    onSwitch.call(this.activeRelay);

    target.addEventListener('click', (e) => {
      const trg = e.target;
      const relay = this.stack.get(trg);

      if (!(relay instanceof Relay)) return;

      this.activeRelay = relay;
      this.onSwitch.call(relay);
    });
  }

  get activeRelay() {
    return this._active;
  }

  set activeRelay(relay) {
    if (this._active) this._active.toggle(0);
    this._active = relay;
    relay.toggle(1);
  }
}