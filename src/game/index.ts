import { container } from "@game";
import { Player } from "@entities";
import { TileMap } from "@game/tile";
import { UIInventory } from "@game/ui";
import { Camera2D } from "@game/camera";
import { inject, injectable } from "inversify";
import { Vector2D } from "@game/types/vector2d";
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

  private camera: Camera2D;

  public started: boolean = false;

  constructor(
    @inject(Player)
    private player: Player,
    @inject(UIInventory) private uiInventory: UIInventory
  ) {
    this.playerController = new PlayerController();
    this.playerController.draw();
    this.renderBind = this.render.bind(this);
    this.tileMap = new TileMap(this.playerController);
    this.camera = new Camera2D([canvas.width, canvas.height], 1);
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
    this.tileMap.render(ctx, this.camera);

    const playerScreenPos = this.camera.worldToScreen(
      new Vector2D(
        this.playerController.coords[0],
        this.playerController.coords[1]
      )
    );

    this.camera.follow(
      new Vector2D(
        this.playerController.coords[0],
        this.playerController.coords[1]
      )
    );

    ctx.drawImage(
      this.playerController.canvasPlayer,
      playerScreenPos.x,
      playerScreenPos.y,
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
        const [xRange, yRange] = collider.points;

        const topLeft = this.camera.worldToScreen(
          new Vector2D(xRange[0], yRange[0])
        );
        const sizeX = (xRange[1] - xRange[0]) * this.camera.viewport.zoom;
        const sizeY = (yRange[1] - yRange[0]) * this.camera.viewport.zoom;

        ctx.beginPath();
        ctx.rect(topLeft.tuple[0], topLeft.tuple[1], sizeX, sizeY);
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
    this.started = true;
  }
}

container.bind(Game);

const game = container.get(Game);

game.start();
