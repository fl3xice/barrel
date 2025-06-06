import { BaseUI } from "@engine/ui";

type Config = {
  x: number;
  y: number;
  width: number;
  height: number;
  background: string;
  // TODO: In future
  stroke?: string;
};

export class RectUI extends BaseUI {
  constructor(public config: Config) {
    super();
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.config.background;
    ctx.fillRect(
      this.config.x,
      this.config.y,
      this.config.width,
      this.config.height
    );
  }
}
