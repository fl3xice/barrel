export class Vector2D {
  private _vector: [number, number] = [0, 0];

  constructor(x: number, y: number) {
    this._vector = [x, y];
  }

  get tuple(): [number, number] {
    return this._vector;
  }

  add(vector: Vector2D | [number, number]) {
    if (vector instanceof Vector2D) {
      return new Vector2D(
        this.tuple[0] + vector.tuple[0],
        this.tuple[1] + vector.tuple[1]
      );
    } else {
      return new Vector2D(this.tuple[0] + vector[0], this.tuple[1] + vector[1]);
    }
  }

  normalize(): Vector2D {
    const v = Math.abs(
      Math.sqrt(Math.pow(this.tuple[0], 2) + Math.pow(this.tuple[1], 2))
    );

    return new Vector2D(this.tuple[0] / v, this.tuple[1] / v);
  }

  mult(vector: Vector2D | [number, number]) {
    if (vector instanceof Vector2D) {
      return new Vector2D(
        this.tuple[0] * vector.tuple[0],
        this.tuple[1] * vector.tuple[1]
      );
    } else {
      return new Vector2D(this.tuple[0] * vector[0], this.tuple[1] * vector[1]);
    }
  }

  sub(vector: Vector2D | [number, number]) {
    if (vector instanceof Vector2D) {
      return new Vector2D(
        this.tuple[0] - vector.tuple[0],
        this.tuple[1] - vector.tuple[1]
      );
    } else {
      return new Vector2D(this.tuple[0] - vector[0], this.tuple[1] - vector[1]);
    }
  }

  div(vector: Vector2D | [number, number]) {
    if (vector instanceof Vector2D) {
      return new Vector2D(
        this.tuple[0] / vector.tuple[0],
        this.tuple[1] / vector.tuple[1]
      );
    } else {
      return new Vector2D(this.tuple[0] / vector[0], this.tuple[1] / vector[1]);
    }
  }

  dot(vector: Vector2D | [number, number]): number {
    if (vector instanceof Vector2D) {
      return this.tuple[0] * vector.tuple[0] + this.tuple[1] * vector.tuple[1];
    } else {
      return this.tuple[0] * vector[0] + this.tuple[1] * vector[1];
    }
  }

  length(): number {
    return Math.sqrt(this.tuple[0] ** 2 + this.tuple[1] ** 2);
  }

  clone(): Vector2D {
    return new Vector2D(this.tuple[0], this.tuple[1]);
  }

  equals(vector: Vector2D | [number, number]): boolean {
    if (vector instanceof Vector2D) {
      return (
        this.tuple[0] === vector.tuple[0] && this.tuple[1] === vector.tuple[1]
      );
    } else {
      return this.tuple[0] === vector[0] && this.tuple[1] === vector[1];
    }
  }
}
