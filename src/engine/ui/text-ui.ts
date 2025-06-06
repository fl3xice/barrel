import { BaseUI } from "@engine/ui";

type Config = {
  x: number | "center";
  y: number | "center";
  font?: string;
  color?: string;
  maxWidth?: number;
};

export class TextUI extends BaseUI {
  constructor(
    public text: string,
    public config: Config
  ) {
    super();
  }

  measureText(ctx: CanvasRenderingContext2D): {
    width: number;
    height: number;
  } {
    const textMetrics = ctx.measureText(this.text);

    return {
      width: textMetrics.width,
      height:
        textMetrics.actualBoundingBoxAscent +
        textMetrics.actualBoundingBoxDescent,
    };
  }

  render(ctx: CanvasRenderingContext2D): void {
    if (this.config.font) {
      ctx.font = this.config.font;
    }

    if (this.config.color) {
      ctx.fillStyle = this.config.color;
    }

    let x = 0,
      y = 0;

    const { width, height } =
      this.config.x == "center" || this.config.y == "center"
        ? this.measureText(ctx)
        : { width: 0, height: 0 };

    if (this.config.x == "center") {
      x = ctx.canvas.width / 2 - width / 2;
    } else {
      x = this.config.x;
    }

    if (this.config.y == "center") {
      y = ctx.canvas.height / 2 - height / 2;
    } else {
      y = this.config.y;
    }

    ctx.fillText(this.text, x, y, this.config.maxWidth);
  }
}
