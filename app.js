// loading in modules
const express = require("express");
const bodyParser = require("body-parser");
const carsRoutes = require('./routes/cars');
const contactRoutes = require('./routes/contact');
const app = express();
require('./models/db');
const cors = require("cors");
app.use(cors());

// initialize the port as posted to heroku or running locally
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send("Hello, World!");
});

app.use('/cars', carsRoutes);

app.use('/contact', contactRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});