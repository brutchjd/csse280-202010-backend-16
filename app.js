// loading in modules
const express = require("express");
const bodyParser = require("body-parser");
const carsRoutes = require('./routes/cars');
const app = express();
require('./models/db');
const cors = require("cors");
// initializing server
app.use(cors());
const port = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//     res.send("Hello world");
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/cars', carsRoutes);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});