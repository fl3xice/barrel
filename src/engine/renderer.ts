import EventEmitter from "eventemitter3";
import TypedEmitter from "typed-emitter";

export enum RenderLayer {
  UI,
  TILES,
  DEFAULT,
}

type RenderInfo = {
  timestamp: number;
  fps: number;
};

type Events = {
  beforeRender: (info: RenderInfo) => void;
  afterRender: (info: RenderInfo) => void;
  beforeClearObjects: (info: RenderInfo) => void;
};

export abstract class RenderObject {
  public readonly layer: RenderLayer = RenderLayer.DEFAULT;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(ctx: CanvasRenderingContext2D): void {}
}

export class Renderer extends (EventEmitter as unknown as new () => TypedEmitter<Events>) {
  private renderObjects: RenderObject[] = [];

  private fps: number = 0;
  private lastTimeStamp: number = 0;
  private accumulatedTime: number = 0;
  private diagnosticFps: number = 0;
  private timestamp = 0;

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
    // TODO: ticks and other stuff...
    this.timestamp = timestamp;
    const delta = performance.now() - this.lastTimeStamp;
    this.lastTimeStamp = performance.now();

    this.accumulatedTime += delta;
    this.fps++;

    if (this.accumulatedTime >= 1000) {
      this.diagnosticFps = this.fps;
      this.fps = 0;
      this.accumulatedTime = 0;
    }

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.emit("beforeRender", this.getRenderInfo());

    for (const object of this.renderObjects) {
      this.render(object);
    }

    this.emit("beforeClearObjects", this.getRenderInfo());
    this.renderObjects = [];
    this.emit("afterRender", this.getRenderInfo());

    setTimeout(() => {
      requestAnimationFrame(this.loop.bind(this));
    }, 1000 / this.diagnosticFps);
  }

  private getRenderInfo(): RenderInfo {
    return { timestamp: this.timestamp, fps: this.diagnosticFps };
  }

  private render<T extends RenderObject>(object: T) {
    this.ctx.save();
    object.render(this.ctx);
    this.ctx.restore();
  }
}
