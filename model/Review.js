const { default: mongoose } = require("mongoose");

const reviewSchema = new mongoose.Schema({
  productid:String,
  name:String,
  review:String
});

module.exports = mongoose.model('review', reviewSchema);