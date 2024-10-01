const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Render the form and display posts
app.get('/', (req, res) => {
    connection.query('SELECT * FROM posts ORDER BY created_at DESC', (err, posts) => {
        if (err) throw err;
        res.render('index', { posts });
    });
});

// Insert a new post
app.post('/create-post', (req, res) => {
    const { post_link, description } = req.body;
    connection.query('INSERT INTO posts (post_link, description) VALUES (?, ?)', [post_link, description], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.listen(4500, () => {
    console.log('Server is running on http://localhost:4500');
});
