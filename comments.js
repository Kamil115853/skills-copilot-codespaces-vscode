// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET request
app.get('/comments', (req, res) => {
    // Read the comments file
    const comments = fs.readFileSync(path.join(__dirname, 'comments.json'));

    // Parse the comments file
    const commentsJSON = JSON.parse(comments);

    // Return the comments
    res.status(200).json(commentsJSON);
});

// POST request
app.post('/comments', (req, res) => {
    // Read the comments file
    const comments = fs.readFileSync(path.join(__dirname, 'comments.json'));

    // Parse the comments file
    const commentsJSON = JSON.parse(comments);

    // Add the new comment
    commentsJSON.push(req.body);

    // Write the comments file
    fs.writeFileSync(path.join(__dirname, 'comments.json'), JSON.stringify(commentsJSON));

    // Return the comments
    res.status(201).json(commentsJSON);
});

// Listen to port 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Run the server
// node comments.js
// Open the browser and go to http://localhost:3000/comments
// Send a POST request to http://localhost:3000/comments with a comment in the request body
// Open the browser and go to http://localhost:3000/comments to see the new comment
// Close the server with Ctrl+C