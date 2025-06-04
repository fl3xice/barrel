import { container } from "@game";
import { Player } from "@entities";
import { TileMap } from "@game/tile";
import { UIInventory } from "@game/ui";
import { inject, injectable } from "inversify";
import { PlayerController } from "@game/player";
import { canvasInit, drawBackground } from "@game/canvas";

import { COLLIDERS, RectCollider } from "./collisions";

const [canvas, ctx] = canvasInit(800, 450);

ctx.imageSmoothingEnabled = false;

@injectable("Singleton")
class Game {
  private lastTimeStamp: number = 0;
  private frames: number = 0;
  private diagnosticFps = 0;
  private accumulatedTime: number = 0;
  private playerController: PlayerController;
  renderBind: (timestamp: number) => void;
  private tileMap: TileMap;

  constructor(
    @inject(Player)
    private player: Player,
    @inject(UIInventory) private uiInventory: UIInventory
  ) {
    this.playerController = new PlayerController();
    this.playerController.draw();
    this.renderBind = this.render.bind(this);
    this.tileMap = new TileMap();
  }

  render(timestamp: number) {
    const delta = timestamp - this.lastTimeStamp;
    this.lastTimeStamp = timestamp;

    this.accumulatedTime += delta;
    this.frames++;

    if (this.accumulatedTime >= 1000) {
      this.diagnosticFps = this.frames;
      this.frames = 0;
      this.accumulatedTime = 0;
    }

    drawBackground(ctx, canvas);
    this.tileMap.render(ctx);

    ctx.drawImage(
      this.playerController.canvasPlayer,
      this.playerController.coords[0],
      this.playerController.coords[1],
      this.playerController.WIDTH,
      this.playerController.HEIGHT
    );

    // ctx.fillStyle = "red";
    // ctx.fillRect(
    //   this.playerController.coords[0],
    //   this.playerController.coords[1],
    //   1,
    //   1
    // );

    ctx.save();
    ctx.strokeStyle = "red";
    for (const collider of COLLIDERS) {
      if (collider instanceof RectCollider && collider.points.length === 2) {
        // Draw rectangle from two points
        const [x0, x1] = collider.points[0];
        const [y0, y1] = collider.points[1];
        ctx.beginPath();
        ctx.rect(x0, y0, x1 - x0, y1 - y0);
        ctx.stroke();
      } else if (collider.points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(collider.points[0][0], collider.points[0][1]);
        for (let i = 1; i < collider.points.length; i++) {
          ctx.lineTo(collider.points[i][0], collider.points[i][1]);
        }
        ctx.closePath();
        ctx.stroke();
      }
    }
    ctx.restore();

    // ctx.fillStyle = "#AEAF35";
    // ctx.fillRect(64 * 2, 64 * 2, 64, 64);

    this.playerController.updateMove(ctx);

    ctx.fillStyle = "#fff";
    ctx.font = "32px serif";

    ctx.fillText(this.diagnosticFps + " FPS", 20, 50, 150);

    ctx.font = "16px serif";
    ctx.fillText(this.playerController.velocity + " Velocity", 20, 80);

    requestAnimationFrame(this.renderBind);
  }

  start() {
    requestAnimationFrame(this.renderBind);
  }
}

container.bind(Game);

const game = container.get(Game);

game.start();
