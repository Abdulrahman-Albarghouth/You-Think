//const PI = 3.14 sabet kaler ve hiç bir şekilde dğişmez PI+=5 kabul edilmez
var arr = [];
var arrE = [];
var arrO = [];
for (var i = 0; i <= 100; i++) {
  arr[i] = i;
}
for (let index = 0; index < arr.length; index++) {
  if (arr[index] % 2 == 0) {
    arrE.push(arr[index]);
  } else arrO.push(arr[index]);
}
console.log(arr);
console.log(arrE);
console.log(arrO);

var m = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(Math.max(...m));

var ran = [],
  x = parseInt(Math.random() * 91) + 10,
  maxN,
  minN;
for (let index = 0; index < x; index++) {
  var ranN = parseInt(Math.random() * 100);
  ran.push(ranN);
  if (index == 0) {
    maxN = ranN;
    minN = ranN;
  } else {
    minN = Math.min(ranN, minN);
    max = Math.max(ranN, maxN);
  }
}
console.log(ran);
console.log(maxN);
console.log(minN);
