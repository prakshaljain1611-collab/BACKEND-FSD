// //promise for asynchronous :: a javascript promise is an object representing the eventual completion or failure of an asynchronous operation
// //A promise is in one ot these states:
// //pennding:initial state,neither fulfilled nor rejected
// //fulfilled:meaning that the operation was completed successfully
// //rejected:meaning that the operation failed

// import { useCallback } from "react";

// //js is a single threaded programming language
// const promiseone =new promise((resolve,reject)=>{
//     if(!msg==true){
//         console.log("message");
//     }
//     else {
//         console.log("eroor........");
//     }
//     setTimeout(() => {
//        console.log(resolve()); 
//     },2000)
// });
// promise.then((result)=>{
//     console.log(result);
// }).catch((error)=>{
//     console.log(error);
// })
// create a promise tht will print username and password using resolve and rejected
// and if uswrname and password not found then it will call 
// reject state and print error message 
// const promise =new promise((resolve,reject)=>{
//     setTimeout(()=>{
//         let error =false;
//         if(!error){
//             const username="admin";
//             const password="password123";
//             if(username=="admin" && password==="password123"){
//                 resolve({username,password});
//             }else{
//                 reject(new error("invalid"));
//             }
//         }
//     },2000);
// });
// promise.then((result)=>{
//     console.log("username")
// })
async function test() {
  console.log("message:1");

  try {
    const response = await fetch("./studentsdata.json");
    const stdn = await response.json();
    console.log(stdn);
    console.log("message 3");
    return stdn;
  } catch (error) {
    console.error("Error:", error);
  }
}

test();