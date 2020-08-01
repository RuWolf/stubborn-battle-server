const mongoose = require('mongoose');

// Model for Admin base
const countSchema = new mongoose.Schema({
    maxCont: Number,
});

module.exports = mongoose.model('Max', countSchema);