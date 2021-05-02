const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json());

const data = require('./users.json');
const users = data.users;

// Get general page
app.get('/', (req, res) => {
    res.status(200).send("Home, try this/users");
});

// Get /users
app.get('/users', (req, res) => {
    res.status(200).send(users);
});

// Get specific user /user/username
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    let response = `No user with id ${id}`;
    for (const user of users) {
        if (parseInt(id) == parseInt(user.id)) {
            response = user;
            break;
        }
    }
    res.status(200)
        .send(response);
});

// uh post
app.post('/users', (req, res) => {
    const newUser = req.body;
    console.log(req);
    users.push(newUser);
    console.log(newUser)
    res.status(201) // POST requests should return 201 if they create something
        .send(users);
});

// put
app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    for (const user of users) {
        if (parseInt(id) == parseInt(user.id)) {
            const index = users.indexOf(user);
            users[index] = updatedUser;
            break;
        }
    }
    res.status(200)
        .send(updatedUser);
});

// del
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    for (const user of users) {
        if (parseInt(id) == parseInt(user.id)) {
            const index = users.indexOf(user);
            users.splice(index, 1); // Remove 1 user from the array at this index
        }
    }
    res.send(users);
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
