const express = require('express');
const path = require('path');
const fs = require('fs');
const dbService = require('./db/dbService');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    const data = fs.readFileSync('db/db.json', 'utf8');
    res.send(data);
})

app.post('/api/notes', (req, res) => {
    const data = dbService.writeToDb(req.body);
    res.json(data);
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
    console.log("listening on port 3001");
});

