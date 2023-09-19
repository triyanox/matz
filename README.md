# matz

This is a toy programming language that I'm building to learn more about intrepreters. It's inspired by the syntax of python and javascript and it's meant to be used for linear algebra operations.

## Syntax

This is the syntax it's inspired by the synatax of python and javascript.

```py
# declare scaler
scaler B = 2

# declare vector
vector A = [21, 24, 12]
vector L = [24, 12, 24]

# declare matrix
matrix D = [[23, 12, 11], [12, 23, 12], [12, 12, 23]]

# declare a computed vector
computeVector C = [A, A]

# declare a computed matrix
computeMatrix E = [D, D]

# print the values
print("print A", A)

# vector operations
calcVec SUM = A + A
calcVec SUB = A - A
calcVec MUL = A * A
calcVec DIV = A / A
calcVec CROSS = A x A
calcVec SCALE = A _ 4

# vector builtins operations
calc norm = norm(A)  # calculate the norm of the vector
calc normalize = normalize(A)  # normalize the vector
calc angle = angle(A, A)  # calculate the angle between two vectors
calc distance = distance(A, A)  # calculate the distance between two vectors
calc midpoint = midpoint(A, A)  # calculate the midpoint between two vectors
# calculate the projection of a vector on another vector
calc projection = project(A, A)
# calculate the rejection of a vector on another vector
calc rejection = reject(A, A)
# calculate the reflection of a vector on another vector
calc reflection = reflect(A, A)
# calculate the refraction of a vector on another vector
calc refraction = refract(A, L, 4)

# matrix operations
calcMat SUM2 = D + D  # sum two matrices
calcMat SUB2 = D - D  # subtract two matrices
calcMat MUL2 = D * D  # multiply two matrices
calcMat SCALE2 = D _ 6  # scale a matrix

# matrix builtins operations
calc INVERSE2 = inverse(D)  # calculate the inverse of a matrix
calc TRANSPOSE2 = transpose(D)  # calculate the transpose of a matrix
calc DETERMINANT2 = determinant(D)  # calculate the determinant of a matrix

print(" ")
# print the result of the multiplication of two matrices using the star to run custom js code
print("*D.mul(D).toString()")
print(" ")
print("refraction", refraction)
print(" ")
print("*refraction.toString()")
```

## Roadmap

This is just a toy project to learn more about intrepreters so it's not meant to be used in production. But this is the roadmap for the future:

- [x] Comments
- [x] Vectors
- [x] Matrices
- [x] Operations
- [x] Builtins
- [x] Custom JS code
- [ ] Accessors 
- [ ] Functions
- [ ] Conditionals
- [ ] Loops

## Installation

```
npm install -g matz
```

## Usage

```
Usage: matz [options] [command]

Options:
  -V, --version            output the version number
  -h, --help               display help for command

Commands:
  run <file>               Run a matz file
  transpile <file> <path>  Transpile a matz file to javascript
  ast <file>               Print the AST of a matz file
  help [command]           display help for command
```