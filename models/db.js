const mongoose = require("mongoose");
const server = '127.0.0.1:27017';
const database = 'oraclecarsdb';

let dbURI = `mongodb://${server}/${database}`;
if(process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGODB_ATLAS_URI;
}

class Database {
    constructor() {
        this.connectToDB();
    }

    connectToDB() {
        mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useFindAndModify: false
        }).then(() => {
          console.log("Database connection succesful");
          console.log(`Mongoose connected to ${dbURI}`);  
        }).catch((err) => {
            console.error(`Database connection error: ${err}`);
        });
    }
}

module.exports = new Database();