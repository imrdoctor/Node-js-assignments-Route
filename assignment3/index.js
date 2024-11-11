// // // // // // // // // //
//           START         //
// // // // // // // // // //

const path = require("node:path");
const fs = require('fs');
const EventEmitter = require('node:events');


// // // // // // // // // //
// 1.Write a function that prints the full path of the current file.

// console.log(path.resolve(__dirname))

// // // // // // // // // //
// 2.Write a function that takes a file path and returns its file extension.

// const file = './data.txt'
// function getFileExtension(filePath){
//     return path.extname(filePath)
// }
// console.log(getFileExtension(file));

// // // // // // // // // //
// 3.Write a function that checks if a given path is absolute.

// const oneFile = 'E:/NodeJs./data.txt'
// const toWFile = './data.txt'
// function getFileExtension(filePath){
//     return path.isAbsolute(filePath)
// }
// console.log(getFileExtension(oneFile));
// console.log(getFileExtension(toWFile));

// // // // // // // // // //
// 4.Write a function that joins two paths. 

// const oneFolder = 'folder1'
// const towFolder = 'folder2/data.txt'

// function getFileExtension(folder1,folder2){
//     return path.join(folder1,folder2)
// }
// console.log(getFileExtension(oneFolder,towFolder));

// // // // // // // // // //
// 5.Write a function that demonstrates the difference between path.parse and path.format. The function should take a file path as input, parse it, log the parsed object to the console, then reformat it and log the formatted path to the console.

// function demonstratePathFunctions(filePath){
//     const parsedPath = path.parse(filePath);
//     const formattedPath = path.format(parsedPath)
//     console.log("Parsed Path ",parsedPath);
//     console.log("formatted Path",formattedPath);
// }
// demonstratePathFunctions(`E:/NodeJs/assignment3/index.js`)

// // // // // // // // // //
// 6.Write a function that deletes a file.

// fs.unlinkSync("./data.txt")

// // // // // // // // // //
// 7- Write a function that creates a folder.

// function createFolder(folderName){
//     fs.mkdirSync(folderName, { recursive: true });
// }
// createFolder("folder")

// // // // // // // // // //
// 8. Write a function that creates a custom event and listens for. Trigger the event with a message.

// const myEmitter = new EventEmitter();
// myEmitter.on('myEvent',(arg1,arg2)=>{
//     console.log(arg1,arg2);
// });
// myEmitter.emit('myEvent',"hi",'hello')

// // // // // // // // // //
//           END           //
// // // // // // // // // //