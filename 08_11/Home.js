// var nums=[94,65,82,40,79,74,92,84,37,19,16,85,20,79,25,89,55,67,84,3,79,38,16,44,2,54,58,94,69,71,14,24,13,21],sonuc=0,bol=0;
// for (let i = 0; i < nums.length; i++) {
//     if (nums[i]%3==0&&nums[i]%2==0) {
//         sonuc+=nums[i];
//         bol++;
//     }
// }
// if(sonuc!=0){

//     sonuc/=bol;
// }

// // return Math.floor(sonuc);
// console.log(Math.floor(sonuc));
/******************************************************************************* */
// function findX(a, b, c) {
//     let Delta=Math.sqrt(b^2-4*a*c);
//     if (Delta<0) {
//         console.log("Çözülmaz.")
//     }else if(Delta>0){
//         let x=0;
//         x=(-b)/(2*a);
//         console.log(`x tek çözümü var x= ${x}`)
//     }else{
//         let x1=0,x2=0;
//         x1=((-b)+Delta)/(2*a);
//         x2=((-b)-Delta)/(2*a);
//         console.log(`x iki çözümü var x1= ${x1}, x2= ${x2}`);
//     }
// }
// var A = prompt("Please enter a:");
// var B = prompt("Please enter b:");
// var C = prompt("Please enter c:");

// findX(A, B, C);
/******************************************************************************* */

// var nums = [3,3], target = 6,sonuc=[]
// for (let i = 0; i < nums.length; i++) {
//     for (let j = i+1; j < nums.length; j++) {
//         if (nums[i]+nums[j]==target) {
//             return([i,j])
//         }

//     }

// }
// console.log(sonuc)
/****************************************************************************** */
// var x=[5,8,9,7,10,15,87,79,62,73,0,1];

// console.log(x[parseInt(Math.random()*x.length)])
/******************************************************************************* */
var y=[],N = parseInt((Math.random() * (100-10))+10);

for (let i = 0; i < N; i++) {
    y.push(parseInt(Math.random() * 100));
    
}

console.log(y);
