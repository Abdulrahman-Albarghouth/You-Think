/*
var nums=[1,2,4,7,10],sonuc=0;
for (let i = 0; i < nums.length; i++) {
    if (nums[i]%3==0&&nums[i]%2==0) {
        sonuc+=nums[i];
    }
    
}
sonuc/=2;
console.log(sonuc);
*/
/**************************************************************************/
function findX(a, b, c) {
    let Delta=Math.sqrt(b^2-4*a*c);
    if (Delta<0) {
        console.log("Çözülmaz.")
    }else if(Delta>0){
        let x=0;
        x=(-b)/(2*a);
        console.log(`x tek çözümü var x= ${x}`)
    }else{
        let x1=0,x2=0;
        x1=((-b)+Delta)/(2*a);
        x2=((-b)-Delta)/(2*a);
        console.log(`x iki çözümü var x1= ${x1}, x2= ${x2}`);
    }
}
var A = prompt("Please enter a:");
var B = prompt("Please enter b:");
var C = prompt("Please enter c:");

findX(A, B, C);
















































