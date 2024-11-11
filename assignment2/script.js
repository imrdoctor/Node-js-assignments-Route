// // // // // // // // // // // // // // // // // // // //
// 1. Write a function that uses a `for` loop to print numbers from 1 to 10. If the number is divisible by 3, skip printing the number.

// function printNumbers() {
//     for (let i = 1; i <= 10; i++) {
//       if (i % 3 == 0) {
//         continue; // تخطي الرقم إذا كان يقبل القسمة على 3
//       }
//       console.log(i);
//     }
//   }
//   printNumbers();
// // // // // // // // // // // // // // // // // // // //
// 2. Write a function that uses a `while` loop to calculate the sum of numbers from 1 to 100.
// function sumNumbers() {
//     let sum = 1 ;
//     let i = 1 ;
//     while (i<=100){
//         sum += i;
//         i++;
//     }
//     return sum;
// }
// console.log(sumNumbers());
// // // // // // // // // // // // // // // // // // // //
// 3. Implement a function using `forEach` to iterate over an array and print each element. (0.5 Grade)
// let arr = ['mobile','tv','laptop','router','route']
// function printArrayElements(arry) {
//     arr.forEach(element => {
//         console.log(element);
//     })
// }
// printArrayElements( arr );

// // // // // // // // // // // // // // // // // // // //
// 4. Explain the difference between `forEach` and `for...of` loops in JavaScript. (0.5 Grade)
// let arr = ['mobile','tv','laptop','router','route','forEch','for']

// forEach

// arr.forEach(ele=>{
//     console.log(ele)
// })

// for

// for (const ele of arr) {
//     console.log(ele)
// }
// // // // // // // // // // // // // // // // // // // //
// 5. Write a function that destructures an object to extract values and returns a formatted string. (0.5 Grade)

// let object = {
//     name : "Mohamed",
//     age : 25
// }
// function printObjectValues({name,age}) {
//    return `myname is ${name} and my age is ${age}`  
// }
// console.log(printObjectValues(object));

// // // // // // // // // // // // // // // // // // // //
//6. Use the spread operator to merge two arrays, then return the merged array.

// let arr1 = [1,2,3,4,5]
// let arr2 = [6,7,8,9,10]
// function mergeArrays(arry1,arry2){
//     return[...arry1,...arry2]
// }
// console.log(mergeArrays(arr1,arr2));

// // // // // // // // // // // // // // // // // // // //
// 7. Write a function that accepts multiple parameters (two or more) and returns their sum.
// function sumAll(...numbers) {
//     return numbers.reduce((sum, num) => sum + num, 0);
// }
// console.log(sumAll(1, 2, 3, 4));

// // // // // // // // // // // // // // // // // // // //
//8. Compare primitive and non-primitive data types in JavaScript with examples.

// let num1 = 5
// let num2 = num1
// num2 = 10
// console.log(`num1 ${num1} num2 ${num2}`)

// let arry1 = [1,2,3,4,5]
// let arry2 = arry1
// arry2.push(6)
// console.log(`arry1 ${arry1} arry2 ${arry2}`);

// // // // // // // // // // // // // // // // // // // //
// 9. Explain how hoisting works in JavaScript and describe the Temporal Dead Zone (TDZ).

// console.log(y);
// var x = 'Hello'

// console.log(y);
// let y = 'tdz'
// // // // // // // // // // // // // // // // // // // //
// 10. Write a function that demonstrates closure by creating a counter function that returns the number of times it has been called.

// function createCounter() {
//     let count = 0;
//     return function() {
//       count++;
//       return count;
//     };
//   }
  
//   const counter = createCounter();
//   console.log(counter()); // 1
//   console.log(counter()); // 2

// // // // // // // // // // // // // // // // // // // //
// 11. Create a function that returns a promise which resolves after 3 seconds with a 'Success' message.

// function delayedSuccess() {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve('Success');
//       }, 3000);
//     });
//   }
  
//   delayedSuccess().then(message => console.log(message));

// // // // // // // // // // // // // // // // // // // //
// 12. Convert the previous promise-based function to use `async` and `await`.

// async function delayedSuccess() {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve('Success');
//       }, 3000);
//     });
//   }
  
//   async function getResult() {
//     const message = await delayedSuccess();
//     console.log(message);
//   }
  
//   getResult();

// // // // // // // // // // // // // // // // // // // //
// 13. Create a function that returns a promise, which resolves if a random number is greater than 5, otherwise it rejects.

// function randomNumberCheck() {
//     return new Promise((resolve, reject) => {
//         const randomNum = Math.random()*10;
//         if (randomNum > 5) {
//             resolve(`Success: ${randomNum}`);
//         }else{
//             reject(`Failure: ${randomNum}`);
//         }
//     })
// }
// randomNumberCheck()
// .then(message => console.log(message))
// .catch(error => console.log(error));

// // // // // // // // // // // // // // // // // // // //
// 14. Implement a function that chains multiple .then() handlers to a promise to demonstrate promise chaining.

// function promiseChain() {
//     return new Promise(resolve => {
//       setTimeout(() => resolve(1), 1000);
//     });
//   }
  
//   promiseChain()
//     .then(result => {
//       console.log(result); 
//       return result * 2;
//     })
//     .then(result => {
//       console.log(result); 
//       return result * 3;
//     })
//     .then(result => {
//       console.log(result); 
//     });

// // // // // // // // // // // // // // // // // // // //
// 15. Implement a function that handles errors using `try...catch` in an asynchronous operation.
// async function fetchData() {
//     try {
//       let response = await fetch('https://fakestoreapi.com/products');
//       let data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }
//   fetchData();  