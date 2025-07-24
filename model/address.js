const { default: mongoose } = require("mongoose");

const addressSchema = new mongoose.Schema({
  firstname:String,
  lastname:String,
  address1:String,
  address2:String,
  city:String,
  mobilenumber:String,


});


module.exports = mongoose.model('address', addressSchema);