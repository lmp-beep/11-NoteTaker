
// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid'); //npm process to create unique id's

// JSON Database as a variable
let database = require('./db/db.json');

// Sets up Express App
const app = express();
const PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ----------------------------------------------------------------------------

// Routes
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/notes', function (request, response) {
    response.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/api/notes', function (request, response) {
    response.json(database)
});

// ----------------------------------------------------------------------------

// Post a new note
app.post('/api/notes', function (request, response) {
        let jsonPath = path.join(__dirname, '/db/db.json');
        let newNote = {
                    id: uniqid.process(),
                    title: request.body.title,
                    text: request.body.text,
                }

        database.push(newNote)
        fs.writeFile(jsonPath, JSON.stringify(database), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Added a new note!")
        });
        response.json(newNote);
    });

// ----------------------------------------------------------------------------

// Delete an existing note
app.delete("/api/notes/:id", (request, response) => {
    let noteId = request.params.id
    let jsonPath = path.join(__dirname, '/db/db.json');

    if (noteId) {
      database = database.filter(function(note) {
          return note.id != request.params.id;
      })
      response.json();
    } else {
      response.status(400).json();
    }

    fs.writeFile(jsonPath, JSON.stringify(database), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Deleted note!");
    });
  });



app.listen(PORT)










