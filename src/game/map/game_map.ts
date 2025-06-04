import { TileSet, TileTypes } from "./tile";

export class TileMap {
  private tiles: TileTypes[][] = [
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  constructor() {}

  render(ctx: CanvasRenderingContext2D) {
    let x = 0,
      y = 0;

    for (let i = 0; i < this.tiles.length; i++) {
      x = 0;
      for (let j = 0; j < this.tiles[i].length; j++) {
        const tile = TileSet[this.tiles[i][j]];
        ctx.drawImage(tile, x, y, 64, 64);
        x += 64;
      }
      y += 64;
    }
  }
}
