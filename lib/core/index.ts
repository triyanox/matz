import { IMatrix, IVector } from "./types";

/**
 * Create a vector from an array of numbers (of any length)
 * ```
 * const v = new Vector([1, 2, 3]);
 * ```
 */
class Vector implements IVector {
  constructor(private values: number[]) {
    this.values = values;
  }

  add(v: Vector): Vector {
    return new Vector(this.values.map((x, i) => x + v.values[i]));
  }

  sub(v: Vector): Vector {
    return new Vector(this.values.map((x, i) => x - v.values[i]));
  }

  mul(v: Vector): Vector {
    return new Vector(this.values.map((x, i) => x * v.values[i]));
  }

  div(v: Vector): Vector {
    return new Vector(this.values.map((x, i) => x / v.values[i]));
  }

  dot(v: Vector): number {
    if (!v) throw new Error("Vector is undefined");
    if (this.values.length !== v.values.length)
      throw new Error("Vectors are not the same length");
    if (this.values.length === 0) throw new Error("Vector is empty");
    return this.values.reduce((acc, x, i) => acc + x * v.values[i], 0);
  }

  cross(v: Vector): Vector {
    return new Vector([
      this.values[1] * v.values[2] - this.values[2] * v.values[1],
      this.values[2] * v.values[0] - this.values[0] * v.values[2],
      this.values[0] * v.values[1] - this.values[1] * v.values[0],
    ]);
  }

  scale(s: number): Vector {
    return new Vector(this.values.map((x) => x * s));
  }

  norm(): number {
    return Math.sqrt(this.values.reduce((acc, x) => acc + x * x, 0));
  }

  normalize(): Vector {
    return this.scale(1 / this.norm());
  }

  angle(v: Vector): number {
    return Math.acos(this.dot(v) / (this.norm() * v.norm()));
  }

  distance(v: Vector): number {
    return this.sub(v).norm();
  }

  midpoint(v: Vector): Vector {
    return this.add(v).scale(0.5);
  }

  project(v: Vector): Vector {
    return v.scale(this.dot(v) / v.dot(v));
  }

  reject(v: Vector): Vector {
    return this.sub(this.project(v));
  }

  reflect(v: Vector): Vector {
    return this.sub(v.scale((2 * this.dot(v)) / v.dot(v)));
  }

  refract(v: Vector, eta: number): Vector {
    const cosI = this.dot(v);
    const sinT2 = eta * eta * (1.0 - cosI * cosI);
    if (sinT2 > 1.0) return this;
    const cosT = Math.sqrt(1.0 - sinT2);
    return this.scale(eta).add(v.scale(eta * cosI - cosT));
  }

  toString(): string {
    return `[${this.values.join(", ")}]`;
  }
}

/**
 * Create a matrix from an array of arrays of numbers
 * ```
 * const m = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
 * ```
 */
class Matrix implements IMatrix {
  constructor(private values: number[][]) {
    this.values = values;
  }

  toString(): string {
    return this.values.map((x) => `[${x.join(", ")}]`).join("\n");
  }

  transpose(): Matrix {
    return new Matrix(
      this.values[0].map((_, i) => this.values.map((x) => x[i]))
    );
  }

  private minor(i: number, j: number): Matrix {
    return new Matrix(
      this.values
        .slice(0, i)
        .concat(this.values.slice(i + 1))
        .map((x) => x.slice(0, j).concat(x.slice(j + 1)))
    );
  }

  private cofactor(i: number, j: number): number {
    return this.minor(i, j).determinant() * (1 - 2 * ((i + j) % 2));
  }

  determinant(): number {
    if (this.values.length === 1) {
      return this.values[0][0];
    }
    return this.values[0].reduce(
      (acc, x, i) => acc + x * this.cofactor(0, i),
      0
    );
  }

  inverse(): Matrix {
    const det = this.determinant();
    if (det === 0) {
      throw new Error("Matrix is not invertible");
    }
    return this.transpose()
      .cofactorMatrix()
      .scale(1 / det);
  }

  private cofactorMatrix(): Matrix {
    return new Matrix(
      this.values.map((x, i) => x.map((_, j) => this.cofactor(i, j)))
    );
  }

  mul(m: Matrix): Matrix {
    return new Matrix(
      this.values.map((x) =>
        m
          .transpose()
          .values.map((y) => y.reduce((acc, z, i) => acc + z * x[i], 0))
      )
    );
  }

  add(m: Matrix): Matrix {
    return new Matrix(
      this.values.map((x, i) => x.map((y, j) => y + m.values[i][j]))
    );
  }

  sub(m: Matrix): Matrix {
    return new Matrix(
      this.values.map((x, i) => x.map((y, j) => y - m.values[i][j]))
    );
  }

  div(m: Matrix): Matrix {
    return this.mul(m.inverse());
  }

  scale(s: number): Matrix {
    return new Matrix(this.values.map((x) => x.map((y) => y * s)));
  }
}

/**
 * Create a vector from an array of numbers (of any length)
 * ```
 * const v = vector([1, 2, 3]);
 * ```
 */
const vector = (values: number[]): Vector => new Vector(values);
/**
 * Create a matrix from an array of arrays of numbers
 * ```
 * const m = matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
 * ```
 */
const matrix = (values: number[][]): Matrix => new Matrix(values);

export { type IMatrix, type IVector };
const matzLib = {
  Matrix,
  Vector,
  matrix,
  vector,
};

export default matzLib;
