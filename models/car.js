const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const carSchema = new mongoose.Schema({
    vin: String,
    make: String,
    model: String,
    details: {
        year: String,
        price: String,
        color: String,
        miles: String,
        mpg: String,
    },
    images: {
      main1: String,
      main2: String  
    }
},
{usePushEach: true} );

const Car = mongoose.model("Car", carSchema);
module.exports = Car;

