// "console.log("task 3");
// function hello(){
//     console.log("hello task 1");
// }
// hello();
// console.log("task 2");
function hello(n1,n2){
    console.log("task1");
    return n1+n2;
}
let a=10;
let b=20;
console.log(hello(a,b));
function hi(){
    console.log("say hi");
}
hello(a,b,hi);
