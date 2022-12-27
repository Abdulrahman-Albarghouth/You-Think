const arr =[1,2,3,6,6,4,5,6];

const bul = (val, arr) =>{
    var t = -1;
    arr.map((num, i)=> {
        if (num == val) {
            t=i;
        }
    })
    return t;

}

const fanBul = (val, arr, i=0) =>{
    if (arr[i] == val) {
        return i;
    }
    if (arr.length-1 > i) {
        return fanBul(val, arr, i+1)
    }
    return -1;
}

console.log(bul(6,arr));
console.log(fanBul(6,arr));

const fanBulAll = (val, arr, i=0, sonuc=[]) =>{
    if (arr[i] == val) {
        sonuc.push(i);
    }
    if (arr.length-1 == i) {
        return sonuc;
    }
    return fanBulAll(val, arr, i+1, sonuc);
    
}

console.log(fanBulAll(6,arr));


const fak = (num, sounc = 1) =>{
    if (num>0) {
        sounc *= num;
        return fak(num-1, sounc)
    }
    return sounc
}

console.log(fak(5));

const fak1 = (num) =>{
    if (num==1) {
        return 1
    }
    return num * fak1(num-1)
}

console.log(fak1(5));
