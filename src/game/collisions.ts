export abstract class Collider {
  public points: [number, number][] = [];

  getBounds(): [x: number, y: number, w: number, h: number] {
    return [
      this.points[0][0],
      this.points[1][0],
      this.points[0][1] - this.points[0][0],
      this.points[1][1] - this.points[1][0],
    ];
  }
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

  isColliderInside(other: [number, number][]) {
    const [[minX, maxX], [minY, maxY]] = this.points;
    const [[oMinX, oMaxX], [oMinY, oMaxY]] = other;

    const xOverlap = maxX > oMinX && oMaxX > minX;
    const yOverlap = maxY > oMinY && oMaxY > minY;

    return xOverlap && yOverlap;
  }
}

export const COLLIDERS = [
  new RectCollider([
    [64 * 2, 64 + 64 * 2],
    [64 * 2, 64 + 64 * 2],
  ]),
];
