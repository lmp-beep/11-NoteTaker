
// Dependencies
const { response } = require('express');
const express = require('express');
const path = require('path');
const uniqid = require('uniqid'); //npm process to create unique id's
// const fs = require('fs');

// JSON Database
let database = require('./db/db.json');

// Empty array for data to get pushed into
// let data = [];

// Sets up Express App
const app = express();
const PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


 
// Routes
app.get('*', function (request, response) {
    response.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/notes', function (request, response) {
    response.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/api/notes', function (request, response) {
    response.json(database)
});




// Add a new note
// app.post('/api/notes.html', function (request, response) {
    // const newNote = 

//     database.push(newNote);
//     response.json(database);
// })


 
app.listen(PORT)










