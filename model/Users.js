const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String

});


module.exports  = mongoose.model('Users', userSchema);