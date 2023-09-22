# `matz` - An Experimental Linear Algebra Langauge Written With Bun.sh

<img src="https://raw.githubusercontent.com/triyanox/matz/main/assets/banner.png" alt="matz banner"
title="matz" align="center" height="auto" width="100%"/>

This is a toy programming language that I'm building with Bun.sh to learn more about intrepreters. It's inspired by the syntax of python and javascript and it's meant to be used for linear algebra operations.

## Syntax

<img src="https://raw.githubusercontent.com/triyanox/matz/main/assets/hello-world.png" alt="matz banner"
title="matz" align="center" height="auto" width="100%"/>

This is the syntax it's inspired by the synatax of python and javascript.

```
# declare scaler
scaler B = 2

# declare vector
vector A = [21, 24, 12]
vector L = [24, 12, 24]

# declare matrix
matrix D = [[23, 12, 11], [12, 23, 12], [12, 12, 23]]

# declare in one line
scaler K = 2, scaler O = 2, scaler P = 2
vector F = [2, 2, 2], vector G = [2, 2, 2], vector H = [2, 2, 2]
matrix Z = [[23, 12, 11], [12, 23, 12], [12, 12, 23]] matrix Y = [[23, 12, 11], [12, 23, 12], [12, 12, 23]]

# declare a computed vector
computeVector C = [A, A]

# declare a computed matrix
computeMatrix E = [D, D]

# print the values
print("print A", A) # print the vector

# vector operations
calcVec SUM = A + A
calcVec SUB = A - A
calcVec MUL = A * A
calcVec DIV = A / A
calcVec CROSS = A x A
calcVec SCALE = A _ 4 # scale a vector

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
calcMat SUM2 = D + D
calcMat SUB2 = D - D 
calcMat MUL2 = D * D   
calcMat SCALE2 = D _ 6   

# matrix builtins operations
calc INVERSE2 = inverse(D)  # calculate the inverse of a matrix
calc TRANSPOSE2 = transpose(D)  # calculate the transpose of a matrix
calc DETERMINANT2 = determinant(D)  # calculate the determinant of a matrix

# also you can the js context and access the built-in methods inside the print string args
print(" ")
print("print A", "*A.values")
print(" ")
print("print A scaled by 2", "*D.scale(2).values")

# declare a function to compute a matrix from a vector
function matFromVecs(vector A)-> matrix {
    computeMatrix B = [A, A, A]
    return B
}

# declare a function to compute the norm of a vector
function getNorm(vector A)-> scaler {
    calc B = norm(A)
    return B # function can return only values for the moement
}

# call the functions
result mat = matFromVecs(A) # result is a keyword to return a value from a function
result n = getNorm(A)

print("print mat", "*mat.values") # print the matrix
print("print n", n) # print the norm
```

## Roadmap

This is just a toy project to learn more about intrepreters so it's not meant to be used in production. But this is the roadmap for the future:

- [x] Comments
- [x] Vectors
- [x] Matrices
- [x] Operations
- [x] Builtins
- [x] Functions
- [ ] Custom JS code
- [ ] Accessors 
- [ ] Conditionals
- [ ] Loops
- [ ] Error handling 
- [ ] Modules
- [ ] Async/Await

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

## Install vscode extension

You can install the vscode extension [here](https://marketplace.visualstudio.com/items?itemName=matz.matz-vscode).