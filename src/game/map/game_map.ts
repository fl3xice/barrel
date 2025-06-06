import { Camera2D } from "@game/camera";
import { PlayerController } from "@game/player";
import { Vector2D } from "@game/types/vector2d";

import { TileSet, TileTypes } from "./tile";

export class TileMap {
  private tiles: TileTypes[][] = [
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  ];

  constructor(private playerController: PlayerController) {}

  render(ctx: CanvasRenderingContext2D, camera: Camera2D) {
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles[i].length; j++) {
        // const worldX = j * 64;
        // const worldY = i * 64;
        const worldPos = new Vector2D(j * 64, i * 64);

        if (!camera.isVisible(worldPos, 64)) continue;

        const screen = camera.worldToScreen(worldPos);

        const tile = TileSet[this.tiles[i][j]];
        ctx.drawImage(tile, Math.ceil(screen.x), Math.ceil(screen.y), 64, 64);

        // const tile = TileSet[this.tiles[i][j]];
        // ctx.drawImage(tile, worldX, worldY, 64, 64);
      }
    }
  }
}
