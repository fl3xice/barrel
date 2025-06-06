import { createImage } from "@game";

import { COLLIDERS } from "./collisions";

export class PlayerController {
  // TODO: Classes
  public points: [number, number][] = [
    // X
    [0, 16],
    // Y
    [1, 16],
  ];

  readonly sprite: HTMLImageElement;

  public canvasPlayer: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  readonly WIDTH = 64;
  readonly HEIGHT = 64;

  public velocity: [number, number] = [0, 0];

  readonly COFF = 0.2;
  readonly speed = 0.4;

  // Map Coordinates
  public x = 0;
  public y = 0;

  public coords: [number, number] = [256 * 1.5, 256 * 2];

  right: boolean = false;
  left: boolean = false;
  down: boolean = false;
  up: boolean = false;

  constructor() {
    this.sprite = createImage("sprites/player.png")();
    this.sprite.width = 64;
    this.sprite.height = 16;

    this.canvasPlayer = document.createElement("canvas");
    this.ctx = this.canvasPlayer.getContext("2d")!;

    this.canvasPlayer.width = 16;
    this.canvasPlayer.height = 16;

    this.sprite.onload = () => {
      this.canvasPlayer.getContext("2d")!.drawImage(this.sprite, 0, 0);
    };

    window.addEventListener("keypress", (ev) => {
      switch (ev.code) {
        case "KeyW":
          this.up = true;
          break;
        case "KeyD":
          this.right = true;
          break;
        case "KeyS":
          this.down = true;
          break;
        case "KeyA":
          this.left = true;
          break;
      }
    });

    window.addEventListener("keyup", (ev) => {
      switch (ev.code) {
        case "KeyW":
          this.up = false;
          break;
        case "KeyD":
          this.right = false;
          break;
        case "KeyS":
          this.down = false;
          break;
        case "KeyA":
          this.left = false;
          break;
      }
    });
  }

  // TOP 0
  // RIGHT 16
  // DOWN 16*2
  // LEFT 16*3
  // TOP-RIGHT 16*4
  // DOWN-RIGHT 16*5
  // DOWN-LEFT 16*6
  // TOP-LEFT 16*7
  updateSprite(direction: [number, number]) {
    // Right
    if (direction[0] > 0 && direction[1] == 0) {
      this.draw(16);
    } // Left
    else if (direction[0] < 0 && direction[1] == 0) {
      this.draw(16 * 3);
    } // Bottom
    else if (direction[1] > 0 && direction[0] == 0) {
      this.draw(16 * 2);
    } // Top
    else if (direction[1] < 0 && direction[0] == 0) {
      this.draw(0);
    } // Top-Right
    else if (direction[1] < 0 && direction[0] > 0) {
      this.draw(16 * 4);
    } // Bottom-Right
    else if (direction[1] > 0 && direction[0] > 0) {
      this.draw(16 * 5);
    } // Bottom-Left
    else if (direction[1] > 0 && direction[0] < 0) {
      this.draw(16 * 6);
    } // Top-Left
    else if (direction[1] < 0 && direction[0] < 0) {
      this.draw(16 * 7);
    }
  }

  // Render
  updateMove(_ctx: CanvasRenderingContext2D) {
    const direction = this.move();
    this.updateSprite(direction);

    // ctx.fillStyle = "#fff";
    // ctx.font = "16px serif";
    // ctx.fillText(
    //   `X: ${direction[0]} Y: ${direction[1]} Direction`,
    //   20,
    //   120,
    //   150
    // );

    if (direction[0] != 0 || direction[1] != 0) {
      this.addVelocity(direction);
    }

    if (this.velocity[0] != 0 || this.velocity[1] != 0) {
      this.subVelocity();
    }

    this.addToCoords(this.velocity);
    this.points = this.posToPoints(this.coords);
  }

  addToCoords(vec: [number, number]) {
    this.coords[0] += vec[0];
    this.coords[1] += vec[1];
  }

  posToPoints(vec: [number, number]): [number, number][] {
    const points: [number, number][] = [
      [0, 0],
      [0, 0],
    ];

    points[0][0] = vec[0];
    points[0][1] = vec[0] + 64;
    points[1][0] = vec[1];
    points[1][1] = vec[1] + 64;
    return points;
  }

  addVelocity(direction: [number, number]) {
    const v = this.normalize(direction);
    v[0] *= this.speed;
    v[1] *= this.speed;

    const nextPoints = this.posToPoints([
      this.coords[0] + v[0] * 2,
      this.coords[1] + v[1] * 2,
    ]);

    // If player next step is inside collider
    // we preventing this step
    for (const collider of COLLIDERS) {
      if (collider.isColliderInside(nextPoints)) {
        this.velocity[0] = 0;
        this.velocity[1] = 0;

        return;
      }
    }

    this.velocity[0] += v[0];
    this.velocity[1] += v[1];
  }

  subVelocity() {
    if (Math.abs(this.velocity[0]) < 0.000005) {
      this.velocity[0] = 0;
    }
    if (Math.abs(this.velocity[1]) < 0.000005) {
      this.velocity[1] = 0;
    }

    this.velocity[0] -= this.velocity[0] * this.COFF;
    this.velocity[1] -= this.velocity[1] * this.COFF;
  }

  normalize(direction: [number, number]): [number, number] {
    const length = Math.sqrt(direction[0] ** 2 + direction[1] ** 2);
    if (length === 0) return [0, 0];
    return [direction[0] / length, direction[1] / length];
  }

  move(): [number, number] {
    const direction: [number, number] = [0, 0];

    if (this.up) {
      direction[1]--;
    }

    if (this.down) {
      direction[1]++;
    }

    if (this.right) {
      direction[0]++;
    }

    if (this.left) {
      direction[0]--;
    }

    return direction;
  }

  draw(offset: number = 0) {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(this.sprite, -offset, 0);
  }
}
