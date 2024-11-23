const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const routes = require('./routes');

app.use('/', routes)

app.get('/test', (req,res) => {
    return res.send("API working");
})

const PORT = 3000;
app.listen(PORT, () => (
    console.log(`Server running on port ${PORT}, http://localhost:${PORT}`))
);