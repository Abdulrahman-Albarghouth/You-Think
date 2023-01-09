// tsc index

let num:number = 5;

let st:string ="abd";

let x:boolean = true;

let y:any = 6;
y ="abd";
y=false;

let arr:number[] = [1, 2, 3];

const data: [number, boolean, string] = [1, true, "abd"];

let c: number | string = 2;
c ="abd";
////////////////////////////////////

enum weeks {
    sun, // = 0
    mod = 2, // = 2
    tusd // = 3
}
////////////////////////////////////

type Obj = {
    name: string,
    age: number
}
let obj:Obj = {
    name: "string",
    age: 4
}
////////////////////////////////////

let r: any = 1;
let f = <number>r
let t = r as number
////////////////////////////////////

let fac = (name: string): string => {
    return name
}
let fac1 = (name: string): void => {
    return 
}
let fac2 = (num: number): number => {
    return num;
}
////////////////////////////////////

interface User {
    name: string,
    age: number,
    degree?: number
}
let user: User = {
    name: "string",
    age: 10,
    degree: 12
}
let user1: User = {
    name: "string",
    age: 10,
}
////////////////////////////////////

interface Perinterface {
    name: string,
    age: number,
    ya: number,
    info(): string

}
class Per implements Perinterface {
    // public name: string
    // private age: number
    // protected ya: number
    name: string
    age: number
    ya: number

    constructor (name:string, age:number, ya: number){
        this.name = name;
        this.age = age;
        this.ya = ya;
    }

    info(){
        return `${this.name} ${this.age}`
    }

}
let abd = new Per("abd", 23, 12);
abd.info()
abd.name;
class Per1 extends Per {
    degree: number
    constructor(name:string, age:number, ya: number, degree: number){
        super(name, age, ya);
        this.degree = degree;
    }

}
let ali = new Per1("abd", 23, 12, 100);


