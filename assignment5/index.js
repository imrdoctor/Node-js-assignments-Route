const express = require('express');
const fs = require('fs');
const server = express();
server.use(express.json());
const PORT = 3000;
const USERS_FILE = './users.json';

if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

function getUsers() {
    try {
        const data = fs.readFileSync(USERS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function saveUsers(users) {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    } catch (error) {
        throw new Error('Error saving users');
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// مش مطلوب
// GetUsers -
server.get('/getUsers', (req, res) => {
    try {
        const users = getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});


// AddUser 
//  استخدمت Try + Catch 
// عارف اننا لسه ماخدناهمش
server.post('/addUser', (req, res) => {
    try {
        const { name, age, email } = req.body;

        // التحقق من البيانات المدخلة
        if (!name || !age || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        if (typeof age !== 'number' || age <= 0) {
            return res.status(400).json({ message: 'Age must be a positive number' });
        }

        let users = getUsers();
        
        const emailExists = users.find(user => user.email === email);
        const nameExists = users.find(user => user.name === name);

        if (emailExists && nameExists) {
            return res.status(400).json({ message: 'User already exists' });
        } else if (emailExists) {
            return res.status(400).json({ message: 'Email already exists' });
        } else if (nameExists) {
            return res.status(400).json({ message: 'Name already exists' });
        }

        const id = Math.max(...users.map(user => user.id), 0) + 1;
        
        const newUser = { id, name, age, email };
        users.push(newUser);
        saveUsers(users);
        
        res.status(201).json({ 
            message: 'User created successfully',
            user: newUser
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// updateUser
server.put('/updateUser/:id', (req, res) => {
  const {id} = req.params;
  const {name, age, email} = req.body;
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === parseInt(id));
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  if (name) users[userIndex].name = name;
  if (age) users[userIndex].age = age;
  if (email) users[userIndex].email = email;
  saveUsers(users);
  res.json({ message: 'User updated successfully' });
})
// deleteUser
server.delete('/deleteUser/:id' , (req, res) => {
  const id = req.params.id;
    const users = getUsers();
    const userIndex = users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    users.splice(userIndex, 1);
    saveUsers(users);
    res.json({ message: 'User deleted successfully' });
})
server.delete('/deleteUser', (req, res) => {
  const id = req.body.id;
    const users = getUsers();
    const userIndex = users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    users.splice(userIndex, 1);
    saveUsers(users);
    res.json({ message: 'User deleted successfully' });
})
// getUserByName
server.get('/getUserByName/:name' , (req, res) => {
  const name = req.params.name;
    const users = getUsers();
    const userIndex = users.findIndex(user => user.name === name);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(users[userIndex]);
  })
server.get('/getUserByName', (req, res) => {
  const name = req.body.name;
    const users = getUsers();
    const userIndex = users.findIndex(user => user.name === name);
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(users[userIndex]);
})
// getUserByid
server.get('/getUserByid/:id' , (req, res) => {
  const id = req.params.id;
    const users = getUsers();
    const userIndex = users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(users[userIndex]);
  })
server.get('/getUserByid', (req, res) => {
  const id = req.body.id;
    const users = getUsers();
    const userIndex = users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(users[userIndex]);
})

// PART 2 - Q&A on Node.js Internals
// // // // // // // // // // // // // 
// 1 -  What is the Node.js Event Loop?
// - The Node.js Event Loop is a mechanism that handles asynchronous operations in a non-blocking way
// - It allows Node.js to handle multiple requests concurrently without blocking the execution of other tasks
// // // // // // // // // // // // // 
// 2 - What is the Role of the V8 Engine?
// - The V8 Engine is a JavaScript engine that is used by Node.js to execute JavaScript code
// // // // // // // // // // // // //
// 3 - What is the Node.js Thread Pool and How to Set the Thread Pool Size?
// - The Node.js Thread Pool is a pool of background worker threads that handle non-blocking, CPU-intensive tasks like file system operations, encryption, and network requests. It's part of the libuv library, which Node.js uses for managing asynchronous I/O.
// // // // // // // // // // // // //
// 4 - What is the Node.js Thread Pool and How to Set the Thread Pool Size?
// The Node.js Thread Pool is a component of the libuv library that provides a pool of threads for handling non-blocking tasks that cannot be executed asynchronously in the main event loop
// // // // // // // // // // // // //
// 5 -  What is the purpose of the libuv library in Node.js? 
// The libuv library is a core part of Node.js that provides an asynchronous, event-driven I/O model. It allows Node.js to perform non-blocking operations
// // // // // // // // // // // // //
// Explain how Node.js handles asynchronous I/O operations.
// Node.js handles asynchronous I/O operations using an event-driven, non-blocking model, which is key to its high performance and scalability
// // // // // // // // // // // // //




// Error handling middleware
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

server.listen(PORT, () => {
    console.log(
        "Server running on \x1b[32m%s\x1b[0m",
        `http://localhost:${PORT}`
    );
});
