import EventEmitter from "eventemitter3";

export enum RenderLayer {
  TILES = 0,
  DEFAULT = 1,
  UI = 2,
}

type RenderInfo = {
  timestamp: number;
  fps: number;
  alpha: number;
};

type Events = {
  beforeRender: (info: RenderInfo) => void;
  afterRender: (info: RenderInfo) => void;
  beforeClearObjects: (info: RenderInfo) => void;
  tick: (tick: number) => void;
};

export abstract class RenderObject {
  public readonly layer: RenderLayer = RenderLayer.DEFAULT;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(ctx: CanvasRenderingContext2D): void {}
}

export class Renderer extends EventEmitter<Events> {
  private renderObjects: RenderObject[] = [];

  private lastTimeStamp: number = 0;
  private accumulatedTime: number = 0;
  private diagnosticFps: number = 0;
  private timestamp = 0;
  private lastFpsTime = 0;
  private frameCount: number = 0;

  private static readonly TICK_RATE = 1000 / 60;

  constructor(private readonly ctx: CanvasRenderingContext2D) {
    super();
  }

  start() {
    requestAnimationFrame(this.loop.bind(this));
  }

  schedule<T extends RenderObject>(object: T) {
    this.renderObjects.push(object);
  }

  private loop(timestamp: number) {
    if (!this.lastTimeStamp) this.lastTimeStamp = timestamp;
    if (!this.lastFpsTime) this.lastFpsTime = timestamp;
    this.timestamp = timestamp;

    const delta = timestamp - this.lastTimeStamp;
    this.lastTimeStamp = timestamp;
    this.accumulatedTime += delta;

    this.frameCount++;
    const fpsDelta = timestamp - this.lastFpsTime;
    if (fpsDelta >= 500) {
      this.diagnosticFps = Math.round((this.frameCount / fpsDelta) * 1000);
      this.frameCount = 0;
      this.lastFpsTime = timestamp;
    }

    while (this.accumulatedTime >= Renderer.TICK_RATE) {
      this.emit("tick", Renderer.TICK_RATE);
      this.accumulatedTime -= Renderer.TICK_RATE;
    }

    const info: RenderInfo = {
      timestamp: this.timestamp,
      fps: this.diagnosticFps,
      alpha: this.accumulatedTime / Renderer.TICK_RATE,
    };

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.emit("beforeRender", info);

    for (const object of this.renderObjects.sort((a, b) => a.layer - b.layer)) {
      this.render(object);
    }

    this.emit("beforeClearObjects", info);
    this.renderObjects = [];
    this.emit("afterRender", info);

    setTimeout(() => {
      requestAnimationFrame(this.loop.bind(this));
    }, 1000 / 250);
  }

  private render<T extends RenderObject>(object: T) {
    this.ctx.save();
    object.render(this.ctx);
    this.ctx.restore();
  }
}
