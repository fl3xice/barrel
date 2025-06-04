export abstract class Collider {
  public points: [number, number][] = [];
}

export class RectCollider extends Collider {
  public points: [number, number][] = [
    // X
    [0, 1],
    // Y
    [1, 0],
  ];

  constructor(points: [number, number][]) {
    super();

    this.points = points;
  }

  isInside(pos: [number, number]) {
    if (
      // X
      this.points[0][0] < pos[0] &&
      pos[0] < this.points[0][1] &&
      // Y
      this.points[1][0] < pos[1] &&
      pos[1] < this.points[1][1]
    ) {
      return true;
    }

    return false;
  }

  isColliderInside(points: [number, number][]) {
    // Check if all given points are inside this rectangle
    if (
      ((points[0][0] > this.points[0][0] && points[0][0] < this.points[0][1]) ||
        (points[0][1] > this.points[0][0] && points[0][1] < this.points[0][1])) &&
      ((points[1][0] > this.points[1][0] && points[1][0] < this.points[1][1]) ||
        (points[1][1] > this.points[1][0] && points[1][1] < this.points[1][1]))
    ) {
      return true;
    }

    return false;
  }
}

export const COLLIDERS = [
  new RectCollider([
    [64 * 2, 64 + (64 * 2) + 200],
    [64 * 2, 64 + (64 * 2) + 200],
  ]),
];
