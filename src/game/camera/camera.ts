import { Vector2D } from "@game/types/vector2d";

export interface Viewport {
  pos: Vector2D;
  size: Vector2D;
  zoom: number;
}

export class Camera2D {
  public viewport: Viewport;

  constructor(viewportSize: [number, number], zoom = 1) {
    this.viewport = {
      pos: new Vector2D(0, 0),
      size: new Vector2D(viewportSize[0], viewportSize[1]),
      zoom,
    };
  }

  follow(target: Vector2D) {
    const halfSize = this.viewport.size.div([2, 2]);
    this.viewport.pos = target.sub(halfSize).add([32, 32]);
  }

  worldToScreen(worldPos: Vector2D): Vector2D {
    return worldPos
      .sub(this.viewport.pos)
      .mult([this.viewport.zoom, this.viewport.zoom]);
  }

  screenToWorld(screenPos: Vector2D): Vector2D {
    return screenPos
      .div([this.viewport.zoom, this.viewport.zoom])
      .add(this.viewport.pos);
  }

  isVisible(worldPos: Vector2D, size: number): boolean {
    const screen = this.worldToScreen(worldPos);
    const scaledSize = size * this.viewport.zoom;
    return (
      screen.x + scaledSize >= 0 &&
      screen.y + scaledSize >= 0 &&
      screen.x < this.viewport.size.x &&
      screen.y < this.viewport.size.y
    );
  }
}
