import matzLib from "lib/core";

interface IVector {
  /**
   * Add two vectors
   * ```
   * [4, 5, 6] => [4, 5, 6] => [8,10,12]
   * ```
   */
  add(v: IVector): IVector;
  /**
   * Subtract two vectors
   * ```
   * [4, 5, 6] => [4, 5, 6] => [0, 0, 0]
   * ```
   */
  sub(v: IVector): IVector;
  /**
   * Calculate the dot product of two vectors
   * ```
   * [4, 5, 6] => [4, 5, 6] => 77
   * ```
   */
  dot(v: IVector): number;
  /**
   * Calculate the cross product of two vectors
   * ```
   * [4, 5, 6] => [4, 5, 6] => [-3, 6,-3]
   * ```
   */
  cross(v: IVector): IVector;
  /**
   * Multiply a vector by a scalar
   * ```
   * [4, 5, 6] => 2 => [8,10,12]
   * ```
   * */
  scale(s: number): IVector;
  /**
   * Calculate the norm of the vector
   * ```
   * [4, 5, 6] => 8.77
   * ```
   */
  norm(): number;
  /**
   * Normalize the vector
   * ```
   * [4, 5, 6] => [0.45, 0.55, 0.66]
   * ```
   */
  normalize(): IVector;
  /**
   * Calculate the angle between two vectors
   * ```
   * [4, 5, 6] => [4, 5, 6] => 0.00
   * ```
   */
  angle(v: IVector): number;
  /**
   * Calculate the distance between two vectors
   * ```
   * [4, 5, 6] => [4, 5, 6] => 0.00
   * ```
   */
  distance(v: IVector): number;
  /**
   * Calculate the midpoint between two vectors
   * ```
   * [4, 5, 6] => [4, 5, 6] => [4, 5, 6]
   * ```
   */
  midpoint(v: IVector): IVector;
  /**
   * Calculate the projection of a vector onto another vector
   * ```
   * [4, 5, 6] => [4, 5, 6] => [4, 5, 6]
   * ```
   */
  project(v: IVector): IVector;
  /**
   * Calculate the rejection of a vector onto another vector
   * ```
   * [4, 5, 6] => [4, 5, 6] => [4, 5, 6]
   * ```
   * */
  reject(v: IVector): IVector;
  /**
   * Calculate the reflection of a vector onto another vector
   * ```
   * [4, 5, 6] => [4, 5, 6] => [4, 5, 6]
   * ```
   */
  reflect(v: IVector): IVector;
  /**
   * Calculate the refraction of a vector onto another vector
   * ```
   * eta = 1.0
   * [4, 5, 6] => [4, 5, 6] => [4, 5, 6]
   * ```
   */
  refract(v: IVector, eta: number): IVector;
}

interface IMatrix {
  /**
   * Transpose the matrix
   * ```
   * [1, 2, 3]    [1, 4, 7]
   * [4, 5, 6] => [2, 5, 8]
   * [7, 8, 9]    [3, 6, 9]
   * ```
   */
  transpose(): IMatrix;
  /**
   * Inverse the matrix
   * ```
   * [1, 2, 3]    [-0.22, 0.11, 0.11]
   * [4, 5, 6] => [ 0.11, 0.00, 0.11]
   * [7, 8, 9]    [ 0.00,-0.11, 0.11]
   * ```
   */
  inverse(): IMatrix;
  /**
   * Calculate the determinant of the matrix
   * ```
   * [1, 2, 3]    0
   * [4, 5, 6] => 0
   * [7, 8, 9]    0
   * ```
   */
  determinant(): number;
  /**
   * Multiply two matrices
   * ```
   * [1, 2, 3]    [1, 2, 3]    [14, 32, 50]
   * [4, 5, 6] => [4, 5, 6] => [32, 77,122]
   * [7, 8, 9]    [7, 8, 9]    [50,122,194]
   * ```
   */
  mul(m: IMatrix): IMatrix;
  /**
   * Add two matrices
   * ```
   * [1, 2, 3]    [1, 2, 3]    [ 2, 4, 6]
   * [4, 5, 6] => [4, 5, 6] => [ 8,10,12]
   * [7, 8, 9]    [7, 8, 9]    [14,16,18]
   * ```
   */
  add(m: IMatrix): IMatrix;
  /**
   * Subtract two matrices
   * ```
   * [1, 2, 3]    [1, 2, 3]    [ 0, 0, 0]
   * [4, 5, 6] => [4, 5, 6] => [ 0, 0, 0]
   * [7, 8, 9]    [7, 8, 9]    [ 0, 0, 0]
   * ```
   */
  sub(m: IMatrix): IMatrix;
  /**
   * Divide two matrices
   * ```
   * [1, 2, 3]    [1, 2, 3]    [ 1, 1, 1]
   * [4, 5, 6] => [4, 5, 6] => [ 1, 1, 1]
   * [7, 8, 9]    [7, 8, 9]    [ 1, 1, 1]
   * ```
   */
  div(m: IMatrix): IMatrix;
}

export { IMatrix, IVector };
