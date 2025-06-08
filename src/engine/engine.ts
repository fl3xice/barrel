import { Renderer } from "@engine/renderer";
import { Container, injectable } from "inversify";

@injectable("Singleton")
export class Engine {
  private _canvas: HTMLCanvasElement | undefined;

  public static readonly CANVAS_WIDTH = 800;
  public static readonly CANVAS_HEIGHT = 477;

  public static readonly TICKRATE = 30;
  public static readonly MAX_FRAME_RATE = 250;

  private renderer: Renderer | undefined;

  get canvas(): HTMLCanvasElement {
    if (this._canvas == undefined) {
      throw new Error("Canvas is not defined");
    }

    return this._canvas;
  }

  constructor() {}

  setup(canvasId: string) {
    const canvas = document.getElementById(canvasId);

    if (canvas instanceof HTMLCanvasElement) {
      this._canvas = canvas;

      this._canvas.width = Engine.CANVAS_WIDTH;
      this._canvas.height = Engine.CANVAS_HEIGHT;

      const resizeCanvas = () => {
        const dpr = window.devicePixelRatio || 1;

        const logicalWidth = Engine.CANVAS_WIDTH;
        const logicalHeight = Engine.CANVAS_HEIGHT;

        this.canvas.width = logicalWidth * dpr;
        this.canvas.height = logicalHeight * dpr;

        this.canvas.style.width = logicalWidth + "px";
        this.canvas.style.height = logicalHeight + "px";

        const ctx = this._canvas!.getContext("2d");
        if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
    } else {
      throw new Error("This is not a canvas");
    }

    const ctx = canvas.getContext("2d");

    if (ctx === null) throw new Error("Bro change the browser ;)");

    this.renderer = new Renderer(ctx);

    this.renderer.start();

    return this.renderer;
  }
}

export enum EntityType {
  PLAYER,
  ANIMAL,
  ENEMY,
  NPC,
  UNKNOWN,
  OBJECT,
}

export class EntityManager {
  private constructor() {}

  public static createEntity() {}
}

export const container = new Container({
  autobind: true,
});

container.bind(Engine);
