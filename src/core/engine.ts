// Note: it's only for node
// import EventEmitter from "node:events";
import { injectable } from "inversify";
import EventEmitter from "eventemitter3";
import TypedEmitter from "typed-emitter";

type Events = {
  tickBefore: (tick: number) => void;
  tickAfter: (tick: number) => void;
};

@injectable("Singleton")
export class Engine extends (EventEmitter as unknown as new () => TypedEmitter<Events>) {
  readonly maxTick = 10;

  private tick = 0;
  private interval: NodeJS.Timeout;

  constructor() {
    super();

    this.interval = setInterval(() => {
      this.emit("tickBefore", this.tick);
      this.tick = this.tick == this.maxTick ? 0 : this.tick + 1;
      this.emit("tickAfter", this.tick);
    }, 500);
  }

  getTick() {
    return this.tick;
  }

  end() {
    clearInterval(this.interval);
  }
}

export function clone<T extends object>(instance: T): T {
  const copy = new (instance.constructor as { new (): T })();
  Object.assign(copy, instance);
  return copy;
}
