const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
    sourceCode : String
});

module.exports = mongoose.model('Code', codeSchema);