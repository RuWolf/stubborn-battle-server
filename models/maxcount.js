const mongoose = require('mongoose');

const countSchema = new mongoose.Schema({
    count: Number,
}, {
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000
    }
  });

module.exports = mongoose.model('Record', countSchema);