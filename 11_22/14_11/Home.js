// function randomNum(min, max) {
//   return parseInt(Math.random() * (max - min + 1) + min);
// }
// var y = [],
//   z = [],
//   w = 0;
// var obj = {};
// for (let i = 0; i < 100; i++) {
//   var x = randomNum(-100, 100);
//   y.push(x);
//   if (!obj[`${x}`]) {
//     obj[`${x}`] = 1;
//   } else {
//     obj[`${x}`] += 1;
//   }
//   if (!z.includes(x)) {
//     z.push(x);
//   }
// }
// console.log(y);
// console.log(z);
// console.log(obj);
// for (let i = 1; i < z.length; i++) {
//   w = z[0];
//   if (obj[`${z[i - 1]}`] < obj[`${z[i]}`]) {
//     w = z[i];
//   }
// }

// console.log(w);

const randint = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const length = 100;
const arr = Array.from({ length }, () => randint(-100, 100));

let count = 0,
  index = -1,
  maxCount = 0;
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    if (arr[i] == arr[j] && i != j) {
      count++;
    }
  }
  if (count > maxCount) {
    maxCount = count;
    index = i;
  }
  count = 0;
}

console.log(arr);
if (index != -1) {
  console.log(arr[index], maxCount);
}
