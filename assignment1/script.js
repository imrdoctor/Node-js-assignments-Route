// 1. Create a function that calculates the sum of two given numbers.

// function calculates(num1 , num2) {
//     return num1 + num2;
// }
// console.log(calculates(3 ,5));

// // // // // // // // // // // // // // // // // // // //
// 2. Write a function that checks if a number is prime (a number that can only be divided

// function isPrime(num) {
//     if (num <= 1) return false;
//     for (let i = 2; i < num; i++) {
//       if (num % i === 0) return false;
//     }
//     return true;
//   }
//   console.log(isPrime(7)); 

// // // // // // // // // // // // // // // // // // // //
// 3. Write a function to reverse a given string (using built in method).

// function reverseString(str) {
//     return str.split('').reverse().join('');
//   }
//   console.log(reverseString("hello")); 
  
// // // // // // // // // // // // // // // // // // // //
// 4. Write a function to find the largest number in an array.

// function findLargest(arr) {
//     return Math.max(...arr);
// }
// console.log(findLargest([1, 3, 7, 2, 4])); 

// // // // // // // // // // // // // // // // // // // //
// 5. Write a function that filters an array and returns only the even numbers.

// function getEvenNumbers(arr) {
//     return arr.filter(function(num) {
//       return num % 2 === 0;
//     });
//   }
// console.log(getEvenNumbers([1, 2, 3, 4, 5 , 6]));  

// // // // // // // // // // // // // // // // // // // //
// 6. Implement a function to reverse a string without using the built-in reverse() method.

// function reverseString(str) {
//     let reversed = "";
    
//     for (let i = str.length - 1; i >= 0; i--) {
//       reversed += str[i];
//     }
    
//     return reversed;
//   }
// console.log(reverseString("Route Egypt"));

// // // // // // // // // // // // // // // // // // // //
// 7. Write a function to calculate the average value of all numbers in an array.

// function calculateAvg() {
//     const numbers = [1,2,3,4,5,6,7,8,9,10,11]
//     let sum = 0
//     for (let index = 0; index < numbers.length; index++) {
//         sum += numbers[index]
//     }
//     const avg = sum / numbers.length
//     console.log(avg);
// }
// calculateAvg()


// // // // // // // // // // // // // // // // // // // //
// 8. Write a function that determines whether a given day number (1-7) represents 

// function determineDayType(dayNumber) {
//     if (dayNumber < 1 || dayNumber > 7) {
//         return "Invalid day number";
//     }
//     return (dayNumber === 6 || dayNumber === 7) ? "Weekend" : "Weekday";
// }
// console.log(determineDayType(2)); 
// console.log(determineDayType(7)); 

// // // // // // // // // // // // // // // // // // // //
//9. Write a function that filters an array of numbers and returns only those that are divisible by 2 or 3.

// const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// function filterDivisibleBy2Or3(numbers) {
//     return numbers.filter(num => num % 2 === 0 || num % 3 === 0);
// }
// const filteredArray = filterDivisibleBy2Or3(array);
// console.log(filteredArray); 

// // // // // // // // // // // // // // // // // // // //
// 10. Write a function that finds the index of a given element in an array. If the element isn't found, return `-1`.

// const array = [10, 20, 30, 40];
// var element = 30
// function findIndex(array,element){
//     for (let i = 0 ; i<array.length ; i++){
//         if (array[i] == element ){
//             return i
//         }
//     }
//     return -1;
// }
// console.log(findIndex(array,element));  

// // // // // // // // // // // // // // // // // // // //
// 11. Write a function to calculate the factorial of a given number. Input: 5

// let n = 5;
// let r = 1;
// function factorial(n,r) {
//     for(let i = 2 ; i <= n ; i++){
//         r = r * i
//     }
//     return r
// }
// console.log(factorial(n,r));

// // // // // // // // // // // // // // // // // // // //
// 12. Write a function that takes an object and returns an array containing only its keys.
// const myObject = {
//     name: "Mohamed",
//     age: 19,
//     city: "Boruto Said",
//     occupation: "Software Engineer",
// }
// function getKeys(myObject) {
//     return Object.keys(myObject);
// }
// console.log(getKeys(myObject))
// // // // // // // // // // // // // // // // // // // //
// 13. Write a function that returns only the unique numbers from an array.
// const numbers = [1, 2, 2, 3, 4, 4, 5, 6, 8, 8, 12];
// function getUniqueNumbers(arr) {
//     return [...new Set(arr)];
// }
// console.log(getUniqueNumbers(numbers)); 
// // // // // // // // // // // // // // // // // // // //
// 14. Write a function to count the occurrences of each character in a string.

// const inputString = "hello";
// function countCharacterOccurrences(str) {
//     const charCount = {}; 
//     for (const char of str) { 
//         charCount[char] = (charCount[char] || 0) + 1; 
//     }
//     return charCount; 
// }
// console.log(countCharacterOccurrences(inputString));

// // // // // // // // // // // // // // // // // // // //
// 15. Write a function that sorts an array of numbers in ascending order.
// const numbers = [8,7,6,5,2,4,3,1,9];
// function numSorts(arr){
//     return arr.sort((a,b)=> a -b );
// }
// console.log( numSorts(numbers));
// // // // // // // // // // // // // // // // // // // //
// 16.Write a function to check if a given string is an anagram of another string (i.e., contains the same characters in a different order).

// function checkAnagram(params1,params2) {
//     if(params1.length  !== params2.length ){
//         console.log("not anagram");
//         return false
//     }
//     const sotrString1 = params1.split('').sort().join('');
//     const sotrString2 = params2.split('').sort().join('');
//     console.log("anagram");
//     return sotrString1 === sotrString2;

// }
// console.log(checkAnagram("listen","silent"));

// // // // // // // // // // // // // // // // // // // //
// 17. Write a function that removes all falsy values (`false`, `null`, `0`, `""`, `undefined`,

// let arry = [0, false, "Hello", "", null, undefined, NaN, 42];
// function removeFalsy(arr) {
//     let arryNotFalse = []
//     for(let i = 0 ;i <arr.length; i++){
//         if (arr[i]){
//             arryNotFalse.push(arr[i])
//         }
//     }
//     arr = arryNotFalse
//     return arr;
// }
// console.log(removeFalsy(arry));

// // // // // // // // // // // // // // // // // // // //
// 18. Write a function that creates a car object with properties such as `model` and `year’ and includes a method to display the car's details.

// function createCar(model , year) {
//     return{
//         model:model ,
//         year:year ,
//         displayCarDetails: function(){
//             return `model: ${this.model} year: ${this.year}`
//         }
//     }
// }
// let car = createCar("Mercedes G Class ", 2024);
// console.log(car.displayCarDetails());

// // // // // // // // // // // // // // // // // // // //
// 19. Write a function that checks if a given object contains a specific property.

// function hasProperty(obj, prop) {
//    return obj.hasOwnProperty(prop)
// }
// console.log(hasProperty({name:"ahmed",age:"25"},"name"));
// console.log(hasProperty({name:"ahmed",age:"25"},"address"));

// // // // // // // // // // // // // // // // // // // //
// 20. Write a function to count the number of vowels (a, e, i, o, u) in a string, regardless of case.

// function countVowels(str) {
//     const vowels = "aeiouAEIOU";
//     let count = 0;
//     for (let char of str ){
//         if  (vowels.includes(char)){
//             count++;
//         }
//     }
//     return count;
// }
// console.log(countVowels("hellow"));

// // // // // // // // // // // // // // // // // // // //
// 21.Write a function that splits a string into an array of words based on spaces.

// let string = "hellow js how are you why you want kill me"
// function splitsStr(str){
//     let arr = string.split(" ");
//     return arr;
// }
// console.log(splitsStr(string));

// // // // // // // // // // // // // // // // // // // //
// 22. Write a function that performs a mathematical operation (`+`, `-`, `*`, `/`) on two numbers.
// function performOperation(num1, num2, operator) {
//     if (operator !== '+' && operator !== '-' && operator !== '*' && operator !== '/') {
//         return "Invalid operator";
//     }
//     switch (operator) {
//         case '+':
//             return num1 + num2;
//         case '-':
//             return num1 - num2;
//         case '*':
//             return num1 * num2;
//         case '/':
//             return num2 !== 0 ? num1 / num2 : "Cannot divide by zero";
//         default:
//             return "Invalid operation";
//     }
// }
// console.log(performOperation(5,3,'+'));

// console.log(performOperation(5,4,'*'));
// // // // // // // // // // // // // // // // // // // //