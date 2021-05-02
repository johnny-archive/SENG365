require('dotenv').config({ path: '.env' });
const mysql = require('mysql2/promise');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});


async function getUsers(req, res) {
    console.log('Request to get all users from the database');
    try {
        const connection = await pool.getConnection();
        console.log('Successfully connected to the database');
        const [rows, fields] = await connection.query('select * from lab2_users');
        res.status(200)
            .send(rows);
    } catch (err) {
        res.status(500)
            .send(`ERROR getting users: ${err}`);
    }
}

async function getUser(req, res) {
    console.log('Request to get a user from the database');
    try {
        const connection = await pool.getConnection();
        console.log('Successfully connected to the database');
        const [rows, fields] = await connection.query(`select * from lab2_users where user_id=${req.params.id}`);
        res.status(200)
            .send(rows);
    } catch (err) {
        res.status(500)
            .send(`ERROR getting user: ${err}`);
    }
}

async function postUser(req, res) {
    console.log('Request to add a new user to the database');
    try {
        const connection = await pool.getConnection();
        const sql = 'insert into lab2_users (username) values ( ? )';
        const values = [req.body.username];
        await connection.query(sql, [values]);
        res.status(201)
            .send(`User successfully added to the database`);
    } catch (err) {
        res.status(500)
            .send(`ERROR posting user: ${err}`)
    }
}


async function putUser(req, res) {
    console.log('Request to change a user in the database');
    try {
        const connection = await pool.getConnection();
        const sql = `update lab2_users set username="${req.body.username}" where user_id=${req.params.id}`;
        await connection.query(sql);
        res.status(201)
            .send(`User successfully updated in the database`);
    } catch (err) {
        res.status(500)
            .send(`ERROR putting user: ${err}`)
    }
}

async function deleteUser(req, res) {
    console.log('Request to delete a user from the database');
    try {
        const connection = await pool.getConnection();
        const sql = `delete from lab2_users where user_id=${req.params.id}`;
        await connection.query(sql);
        res.status(201)
            .send(`User successfully deleted from the database`);
    } catch (err) {
        res.status(500)
            .send(`ERROR deleting user: ${err}`)
    }
}

app.get('/users', getUsers);
app.get('/users/:id', getUser);
app.post('/users', postUser);
app.put('/users/:id', putUser);
app.delete('/users/:id', deleteUser);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
