const array = [10, 5, 3, 2, 8, 1];

const selection = (i = 0) => {
  let InI = i;
  let min = array[i];
  let minIn = -1;
  for (++i; i < array.length; i++) {
    if (array[i] < min) {
      min = array[i];
      minIn = i;
    }
  }
  if (minIn > 0) {
    array[InI] += min;
    array[minIn] = array[InI] - array[minIn];
    array[InI] -= array[minIn];
  }

  if (array.length - 1 > InI) {
    return selection(InI + 1);
  }
  return array;
};

console.log(selection());
