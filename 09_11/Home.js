// var nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4],
//   x = [],
//   y = 0;
// x.push(nums[0]);
// for (let i = 1; i < nums.length; i++) {
//   for (let j = 0; j < x.length; j++) {
//     if (x[j] == nums[i]) {
//       y++;
//     }
//   }
//   if (y == 0) {
//     x.push(nums[i]);
//   } else {
//     y = 0;
//   }
// }
// console.log(x);
/**************************************************************************** */
function emailT() {
    if (email.value.includes("@")&&email.value.includes(".")&&email.value!="") {
        window.alert("true")
    }else{
        window.alert("false")
    }
}

const email=document.getElementById("emailTag");
const pas=document.getElementById("Pas");
const btn=document.getElementById("btn");

btn.addEventListener("click",emailT);





























