require('dotenv').config();
require('./models/Registration');
require('./models/Users');
const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`);
});