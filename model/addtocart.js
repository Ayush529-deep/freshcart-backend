
const { default: mongoose } = require("mongoose");

const cartSchema = new mongoose.Schema({
  Producttitle: String,
  Productcategory: String,
  Productweight: String,
  Productquantity: String,
  Productimage:String,
  Productdescription: String,
  Regularprice: String,
  Saleprice:String
});


module.exports = mongoose.model('cartitems', cartSchema);



// const { default: mongoose } = require("mongoose");

// const addtocartschema = new mongoose.Schema({
  // Producttitle:String,
//   Productweight:String,
//   Productimage:String,
//   Productimage2:String,
//   Productimage3:String,
//   Productdescription:String,
//   Productcategory:String,
//   Productquantity:String,
//   Regularprice:String,
//   Saleprice:String

// });

// module.exports = mongoose.model('addtocart', addtocartschema);