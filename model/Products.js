const { default: mongoose } = require("mongoose");

const Productschema = new mongoose.Schema({
  Producttitle:String,
  Productweight:String,
  Productimage:String,
  Productimage2:String,
  Productimage3:String,
  Productdescription:String,
  Productcategory:String,
  Productquantity:String,
  Regularprice:String,
  Saleprice:String

});

module.exports = mongoose.model('AddProduct', Productschema);