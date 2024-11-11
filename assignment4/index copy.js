// 1. Path Module
// Write an HTTP server that handles file paths. Implement the following:
// • Task 1.1: Respond with a breakdown of a given file path (e.g., extract root,
// directory, file name, and extension) and return the full path in a formatted string.
// o URL: POST /path-info (Get the file path from the body)
// o Input: Provide a file path, such as C:/Users/example/project/sample.txt.
// ------------------------------------------------------------------------------
// Task 1.2: checks if a provided file path is absolute and returns additional path-
// related information (Ensure that you use path.join() to handle the correct path

// separators for your file system (i.e., using / or \ as appropriate)).
// o URL: POST /path-check
// o Input: Provide a relative or absolute file path in the request body (e.g.,
// ./data/file.txt or /Users/example/project/data/file.txt).
// ------------------------------------------------------------------------------
const http = require("http");
const path = require("path");
const fs = require("fs");
const EventEmitter = require("events");
const fileEvents = new EventEmitter();

port = 3000;
function sendJsonResponse(response, statusCode, data) {
  response.writeHead(statusCode, { "Content-Type": "application/json" });
  response.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
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

      // {

      // };

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
  } else if (req.method === "POST" && req.url === "/create-file") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const { fileName , filedata } = JSON.parse(body);
      fs.writeFile(path.join(__dirname, fileName), filedata, (err) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Error creating file" }));
        } else {
          fileEvents.emit("fileCreated", fileName);
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ message: `File ${fileName} created successfully` })
          );
        }
      });
    });
  }else if (req.method === "DELETE" && req.url === "/delete-file")
    {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        })
        req.on("end", () => {
            const { fileName } = JSON.parse(body);
            fs.unlink(path.join(__dirname, fileName), (err) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ message: "Error deleting file" }));
                    } else {
                        fileEvents.emit("fileDeleted", fileName);
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ message: `File ${fileName} deleted successfully` }));
                        }
                    })
        })
    }
    else if (req.method === "POST" && req.url === "/read-file") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const { fileName } = JSON.parse(body);
      fs.readFile(path.join(__dirname, fileName), (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "File not found" }));
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ data: data.toString() }));
        }
      });
    });
  }
  
  
  
  else {
    sendJsonResponse(res, 404, { msg: "404 Page Not Found" });
  }
});

server.listen(port, () => {
  console.log(
    "Server running on \x1b[32m%s\x1b[0m",
    `http://localhost:${port}`
  );
});
