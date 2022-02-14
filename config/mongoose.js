const mongoose = require('mongoose');

const dburl = `mongodb://localhost/code_together_development`;

mongoose.connect(dburl);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to DB'));

db.once('open', function(){
    console.log(`Connected to MongoDB : ${dburl}`)
});

module.exports = db ;