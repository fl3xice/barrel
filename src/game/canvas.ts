export type CanvasCtx = CanvasRenderingContext2D;

export function canvasInit(
  width: number,
  height: number
): [HTMLCanvasElement, CanvasCtx] {
  const canvas = document.getElementById("game_canvas") as HTMLCanvasElement;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d")!;

  return [canvas, ctx];
}

export function drawBackground(ctx: CanvasCtx, canvas: HTMLCanvasElement) {
  ctx.fillStyle = "#070707";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
