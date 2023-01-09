const arr=[]
var max =10, min=0;
const randomNum = () =>{
    return Math.floor(Math.random() * (max - min) + min)
}
const numPush = () => {
    const x = randomNum();
    var t=false;
    arr.map((n)=> {
        if (n == x) {
            numPush();
            t=true;
        }
    })
    if (!t) arr.push(x)
}
const swap = (i, j, arr) =>{
    arr[i] += arr[j];
    arr[j] = arr[i] - arr[j];
    arr[i] -= arr[j];

}

for (let i = 0;i<10;i++) {
    numPush();
}

console.log(arr);
var newAee =[...arr];
for (let index = 0; index < newAee.length; index++) {
    for (let i = 0; i < newAee.length-1; i++) {
        if (newAee[i+1]<newAee[i]) {
            swap(i, i+1, newAee);
        }
        
    }
    
}

console.log(newAee);
