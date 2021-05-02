const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(express.urlencoded({extended: true}));

let users = [];
loadUsers();

// load users into users var.
// reads users.json and for each user, if no following field exists, initialize it to an empty list
function loadUsers() {
    const data = require('./users.json');
    const rawUsers = data.users;
    for (let user of rawUsers) {
        if (user.followers === undefined) {
            user.followers = [];
        }
    }
    users = rawUsers;
}


function getUserIndex(id) {
    for (let i = 0; i < users.length; i++) {
        if (parseInt(id) == parseInt(users[i].id)) {
            return i;
        }
    }
    return -1;
}

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

    let i = getUserIndex(id);
    if (i != -1) response = users[i];

    res.status(200)
        .send(response);
});

// // uh post
// app.post('/users', (req, res) => {
//     const newUser = req.body;
//     users.push(newUser);
//     res.status(201) // POST requests should return 201 if they create something
//         .send(users);
// });

// post follower
app.post('/users/:user', (req, res) => {
    // const newUser = req.body;
    // users.push(newUser);

    const followerId = req.params.user;

    console.log(req.body.follow);

    console.log(req.body);
    console.log(req.fields);
    // console.log(res);

    // console.log(req);
    // console.log(res);

    res.status(201) // POST requests should return 201 if they create something
        .send("Hoes");
});

// put a user thing
app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;

    let i = getUserIndex(id);
    if (i != -1) users[i] = updatedUser;

    res.status(200)
        .send(updatedUser);
});

// del
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    let i = getUserIndex(id);
    if (i != -1) users.splice(index, 1);

    res.send(users);
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
