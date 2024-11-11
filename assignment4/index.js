const http = require("http");
const path = require("path");
const fs = require("fs");
const EventEmitter = require("events");
const fileEvents = new EventEmitter();
const os = require('os');
const zlib = require("zlib");

port = 3000;
function sendJsonResponse(response, statusCode, data) {
  response.writeHead(statusCode, { "Content-Type": "application/json" });
  response.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
    // Path Module
  if (req.method === "POST" && req.url === "/path-info") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const parsedBody = JSON.parse(body);
      const filePath = parsedBody.filePath;

      const parsedPath = path.parse(filePath);

      const responseData = {
        parsedPath: parsedPath,
        formattedPath: path.format(parsedPath),
      };
      sendJsonResponse(res, 200, responseData);
    });
  } else if (req.method === "POST" && req.url === "/path-check") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const parsedBody = JSON.parse(body);
      const filePath = parsedBody.filePath;
      const isAbsolutePath = path.isAbsolute(filePath);
      const baseName = path.basename(filePath);
      const extName = path.extname(filePath);
      const joinedPath = path.join(filePath);
      const resolvedPath = path.resolve(filePath);
      const responseData = {
        isAbsolutePath,
        baseName,
        extName,
        joinedPath,
        resolvedPath,
      };

      sendJsonResponse(res, 200, responseData);
    });
}
// Events Module
//   else if (req.method === "POST" && req.url === "/create-file") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk;
//     });
//     req.on("end", () => {
//       const { fileName, filedata } = JSON.parse(body);
//       fs.writeFile(path.join(__dirname, fileName), filedata, (err) => {
//         if (err) {
//           res.writeHead(500, { "Content-Type": "application/json" });
//           res.end(JSON.stringify({ message: "Error creating file" }));
//         } else {
//           fileEvents.emit("fileCreated", fileName);
//           res.writeHead(201, { "Content-Type": "application/json" });
//           res.end(
//             JSON.stringify({ message: `File ${fileName} created successfully` })
//           );
//         }
//       });
//     });
//   } else if (req.method === "DELETE" && req.url === "/delete-file") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk;
//     });
//     req.on("end", () => {
//       const { fileName } = JSON.parse(body);
//       fs.unlink(path.join(__dirname, fileName), (err) => {
//         if (err) {
//           res.writeHead(500, { "Content-Type": "application/json" });
//           res.end(JSON.stringify({ message: "Error deleting file" }));
//         } else {
//           fileEvents.emit("fileDeleted", fileName);
//           res.writeHead(200, { "Content-Type": "application/json" });
//           res.end(
//             JSON.stringify({ message: `File ${fileName} deleted successfully` })
//           );
//         }
//       });
//     });
//   }  else if (req.method === "POST" && req.url === "/read-file") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk;
//     });
//     req.on("end", () => {
//       const { fileName } = JSON.parse(body);
//       fs.readFile(path.join(__dirname, fileName), (err, data) => {
//         if (err) {
//           res.writeHead(404, { "Content-Type": "application/json" });
//           res.end(JSON.stringify({ message: "File not found" }));
//         } else {
//           res.writeHead(200, { "Content-Type": "application/json" });
//           res.end(JSON.stringify({ data: data.toString() }));
//         }
//       });
//     });
//   }
// OS Module (1 Grades) 
// else if (req.method === 'GET' && req.url === '/system-info') {
//     const { url, method } = req;
//     const systemInfo = {
//       architecture: os.arch(), 
//       platform: os.platform(), 
//       freeMemory: os.freemem(), 
//       totalMemory: os.totalmem(), 
//     };

// OS Module (1 Grades)
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify(systemInfo));
//   } 





//   4. File System Module
 if (req.method === "POST" && req.url === "/create-file") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const { fileName } = JSON.parse(body);
      const filePath = path.join(__dirname, fileName);

      fs.writeFile(filePath, "", (err) => {
        if (err) {
          return sendJsonResponse(res, 500, { message: "Error creating file" });
        }
        sendJsonResponse(res, 201, { message: `File ${fileName} created successfully` });
      });
    });
  } else if (req.method === "DELETE" && req.url === "/delete-file") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const { fileName } = JSON.parse(body);
      const filePath = path.join(__dirname, fileName);

      fs.unlink(filePath, (err) => {
        if (err) {
          return sendJsonResponse(res, 500, { message: "Error deleting file" });
        }
        sendJsonResponse(res, 200, { message: `File ${fileName} deleted successfully` });
      });
    });
  } else if (req.method === "POST" && req.url === "/append-async") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const { fileName, content } = JSON.parse(body);
      const filePath = path.join(__dirname, fileName);

      fs.appendFile(filePath, content, (err) => {
        if (err) {
          return sendJsonResponse(res, 500, { message: "Error appending to file" });
        }
        sendJsonResponse(res, 200, { message: `Content appended to file ${fileName}` });
      });
    });
  } else if (req.method === "POST" && req.url === "/read-async") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const { fileName } = JSON.parse(body);
      const filePath = path.join(__dirname, fileName);

      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          return sendJsonResponse(res, 404, { message: "File not found" });
        }
        sendJsonResponse(res, 200, { data });});});}


// stream

else if (req.method === "POST" && req.url === "/copy-file") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const { sourceFile, destinationFile } = JSON.parse(body);
      const sourcePath = path.join(__dirname, sourceFile);
      const destinationPath = path.join(__dirname, destinationFile);
      const readStream = fs.createReadStream(sourcePath);
      const writeStream = fs.createWriteStream(destinationPath);

      readStream.pipe(writeStream);

      writeStream.on("finish", () => {
        sendJsonResponse(res, 200, { message: `File copied to ${destinationFile}` });
      });

      readStream.on("error", (err) => {
        console.error("Error reading source file:", err);
        sendJsonResponse(res, 500, { message: "Error reading source file" });
      });

      writeStream.on("error", (err) => {
        console.error("Error writing destination file:", err);
        sendJsonResponse(res, 500, { message: "Error writing destination file" });
      });
    });
  } else if (req.method === "POST" && req.url === "/compress-file") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const { fileName } = JSON.parse(body);
      const filePath = path.join(__dirname, fileName);
      const compressedFilePath = path.join(__dirname, `${fileName}.gz`);

      const readStream = fs.createReadStream(filePath);
      const writeStream = fs.createWriteStream(compressedFilePath);
      const gzip = zlib.createGzip();

      readStream.pipe(gzip).pipe(writeStream);

      writeStream.on("finish", () => {
        sendJsonResponse(res, 200, { message: "File compressed successfully" });
      });

      readStream.on("error", (err) => {
        console.error("Error reading file:", err);
        sendJsonResponse(res, 500, { message: "Error reading file" });
      });

      writeStream.on("error", (err) => {
        console.error("Error writing compressed file:", err);
        sendJsonResponse(res, 500, { message: "Error writing compressed file" });
      });
    });
  } else {
    sendJsonResponse(res, 404, { msg: "404 Page Not Found" });
  }
})


server.listen(port, () => {
  console.log(
    "Server running on \x1b[32m%s\x1b[0m",
    `http://localhost:${port}`
  );
});
