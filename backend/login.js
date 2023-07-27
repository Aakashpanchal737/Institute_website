const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer();

app.post('/login', upload.single(), (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    res.send('login successful');
});

app.listen(3000, () => {
    console.log("server started on port 3000");
});
