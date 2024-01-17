// get the library
const mongoose =require("mongoose");
const dotenv =require("dotenv");
dotenv.config()
 const url = process.env.URL
// connect the database
mongoose.connect(url);


//acquire the connection (to check if it is succesfull)
const db = mongoose.connection;

db.on('connected', function() {
    console.log('Successfully connected to the database');
});

db.on('disconnected', function() {
    console.log('Disconnected from the database');
});

db.on('error', function(err) {
    console.error('Error connecting to the database:', err.message);
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose connection disconnected through app termination');
        process.exit(0);
    });
});

module.exports = db;

