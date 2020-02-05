const mongoose = require('mongoose');

const APNS_Schema = new mongoose.Schema({
  token: String
});

module.exports = mongoose.model('APNS', APNS_Schema);
