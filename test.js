var array2D = [];
for (var i = 0; i < 3; i++) {
  array2D[i] = [];
  for (var j = 0; j < 4; j++) {
    array2D[i][j] = 0;
  }
}

// Insert data into the 2D array
array2D[0][0] = 10;
array2D[0][1] = 20;
array2D[0][2] = 30;
array2D[0][3] = 40;

array2D[1][0] = 50;
array2D[1][1] = 60;
array2D[1][2] = 70;
array2D[1][3] = 80;

array2D[2][0] = 90;
array2D[2][1] = 100;
array2D[2][2] = 110;
array2D[2][3] = 120;

// Print the 2D array
console.log(array2D);