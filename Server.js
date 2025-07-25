express = require("express");

app = express();

//bodyparser-------------------
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({}));
app.use(bodyParser.urlencoded({ extended: true }));


//cors----------------
cors = require("cors");
app.use(cors());

//model schema-------------------
const Users = require("./model/Users");
let Productschema = require("./model/Products");
let wishlistschema = require("./model/wishlist");
// let addtocartschema = require("./model/addtocart");
let Cartitem = require("./model/addtocart")
let Reviews = require("./model/Review");
const address = require("./model/address")

//mongodb-------------
const { default: mongoose } = require("mongoose");
mongoose.connect("mongodb+srv://Iti:Y3j0ohOIvrI8VJxN@cluster0.sltjpd7.mongodb.net/freshcart").then(() => {
    console.log("mongodb connect");
  })
  .catch((err) => {
    console.log(err);
  });

//signup----------------
// app.post("/signup", async (req, res) => {
  //   console.log(req.body)

//   let ouruser = req.body.signupdata;

//   let a = await Users.insertOne({
//     firstname: ouruser.firstname,
//     lastname: ouruser.lastname,
//     email: ouruser.email,
//     password: ouruser.password,
//   });

//   let result = await a.save();

//   if (result) {
//     res.json({
//       status: true,
//     });
//   } else {
//     res.json({
//       status: false,
//     });
//   }
// });


app.post("/signup", async (req, res) => {
  try {
    let ouruser = req.body;  // <- signupdata हटा दो क्योंकि आप frontend से flat object भेज रहे हो

    let a = new Users({
      firstname: ouruser.firstname,
      lastname: ouruser.lastname,
      email: ouruser.email,
      password: ouruser.password,
    });

    let result = await a.save();

    if (result) {
      res.json({ status: true });
    } else {
      res.json({ status: false });
    }

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ status: false, error: "Signup failed." });
  }
});





// GET all signup users
app.get("/signup", async (req, res) => {
  try {
    let data = await Users.find(); // Assuming Users is a Mongoose model
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});





//login---------------------
app.post("/login", async (req, res) => {
  // console.log(req.body)

  let ouruser = req.body.logindata;

  let a = await Users.findOne({
    email: ouruser.email,
    password: ouruser.password,
  });

  // console.log(a)

  if (a) {
    res.json({
      status: true,
      logedin: a,
    });
  } else {
    res.json({
      status: false,
    });
  }
});

//reset password---------------------
app.post("/resetpassword", async (req, res) => {
  // console.log(req.body)

  let ouruser = req.body.resetpassword;

  let a = await Users.findOneAndUpdate(
    { email: ouruser.email },
    { $set: { password: ouruser.password } }
  );

  //  console.log(a)

  if (a) {
    res.json({
      status: true,
    });
  } else {
    res.json({
      status: false,
    });
  }
});

//addproduct api--------
// app.post("/addproduct", async (req, res) => {
  // console.log(req.body)

//   let productdata = await Productschema.insertOne({
//     Producttitle: req.body.product.Producttitle,
//     Productweight: req.body.product.Productweight,
//     Productimage: req.body.product.Productimage,
//     Productimage2: req.body.product.Productimage2,
//     Productimage3: req.body.product.Productimage3,
//     Productdescription: req.body.product.Productdescription,
//     Productcategory: req.body.product.Productcategory,
//     Productquantity: req.body.product.Productquantity,
//     Regularprice: req.body.product.Regularprice,
//     Saleprice: req.body.product.Saleprice,
//   });

//   let result = await productdata.save();

//   if (result) {
//     res.json({
//       status: true,
//       msg: "Addproduct success",
//     });
//   } else {
//     res.json({
//       status: false,
//       msg: "failed to addproduct",
//     });
//   }
// });



app.post("/addproduct", async (req, res) => {
  try {
    const productdata = new Productschema({
      Producttitle: req.body.product.Producttitle,
      Productweight: req.body.product.Productweight,
      Productimage: req.body.product.Productimage,
      Productimage2: req.body.product.Productimage2,
      Productimage3: req.body.product.Productimage3,
      Productdescription: req.body.product.Productdescription,
      Productcategory: req.body.product.Productcategory,
      Productquantity: req.body.product.Productquantity,
      Regularprice: req.body.product.Regularprice,
      Saleprice: req.body.product.Saleprice,
    });

    const result = await productdata.save();

    res.json({
      status: true,
      msg: "Addproduct success",
      data: result,
    });
  } catch (error) {
    console.error("AddProduct Error:", error);
    res.status(500).json({
      status: false,
      msg: "Failed to add product",
    });
  }
});




//products--------------------------------
app.get("/products", async (req, res) => {
  let ourproduct = await Productschema.find({});
  // console.log(ourproduct)

  if (ourproduct) {
    res.json({
      status: true,
      dataproduct: ourproduct,
    });
  } else {
    res.json({
      status: false,
    });
  }
});

//deleteproduct---------------------
app.post("/deleteproduct", async (req, res) => {
  let deleteourproduct = await Productschema.findOneAndDelete({_id: req.body._id});

  if (deleteourproduct) {
    res.json({
      status: true,
    });
  } else {
    res.json({
      status: false,
    });
  }
});

//  editproduct-------------

app.post("/editproduct", async (req, res) => {
  // console.log(req.body)

  let ourproduct = req.body.edititem;

  let editourproduct = await Productschema.findOneAndUpdate(
    { _id: ourproduct._id },
    {
      $set: {
        Producttitle: ourproduct.Producttitle,
        Productweight: ourproduct.Productweight,
        Productimage: ourproduct.Productimage,
        Productimage2: ourproduct.Productimage2,
        Productimage3: ourproduct.Productimage3,
        Productdescription: ourproduct.Productdescription,
        Productcategory: ourproduct.Productcategory,
        Productquantity: ourproduct.Productquantity,
        Regularprice: ourproduct.Regularprice,
        Saleprice: ourproduct.Saleprice,
      },
    }
  );

  if (editourproduct) {
    res.json({
      status: true,
    });
  } else {
    res.json({
      status: false,
    });
  }
});

// wishlist--------------

// app.post("/wishlist", async (req, res) => {
  // console.log(req.body)

//   let ourproduct = req.body.a;

//   let a = await wishlistschema.insertOne({
//     Producttitle: ourproduct.Producttitle,
//     Productweight: ourproduct.Productweight,
//     Productimage: ourproduct.Productimage,
//     Productimage2: ourproduct.Productimage2,
//     Productimage3: ourproduct.Productimage3,
//     Productdescription: ourproduct.Productdescription,
//     Productcategory: ourproduct.Productcategory,
//     Productquantity: ourproduct.Productquantity,
//     Regularprice: ourproduct.Regularprice,
//     Saleprice: ourproduct.Saleprice,
//   });

//   let result = await a.save();

//   if (result) {
//     res.json({
//       status: true,
//     });
//   } else {
//     res.json({
//       status: false,
//     });
//   }
// });




app.post("/wishlist", async (req, res) => {
  try {
    let ourproduct = req.body.a;

    let a = new wishlistschema({
      Producttitle: ourproduct.Producttitle,
      Productweight: ourproduct.Productweight,
      Productimage: ourproduct.Productimage,
      Productimage2: ourproduct.Productimage2,
      Productimage3: ourproduct.Productimage3,
      Productdescription: ourproduct.Productdescription,
      Productcategory: ourproduct.Productcategory,
      Productquantity: ourproduct.Productquantity,
      Regularprice: ourproduct.Regularprice,
      Saleprice: ourproduct.Saleprice,
    });

    let result = await a.save();

    res.json({ status: true });
  } catch (error) {
    console.error("Wishlist Error:", error);
    res.status(500).json({ status: false });
  }
});








// wishlistproduct--------------

app.get("/wishlistproduct", async (req, res) => {
  let a = await wishlistschema.find({});

  if (a) {
    res.json({
      status: true,
      wishlistproduct: a,
    });
  } else {
    res.json({
      status: false,
    });
  }
});

//deletewishlistproduct---------------------
app.post("/deletewishlistproduct", async (req, res) => {
  let deleteourproduct = await wishlistschema.findOneAndDelete({
    _id: req.body._id,
  });

  if (deleteourproduct) {
    res.json({
      status: true,
    });
  } else {
    res.json({
      status: false,
    });
  }
});

// addtocart--------------

// app.post("/addtocart", async (req, res) => {
  // console.log(req.body)

//   let ourproduct = req.body.a;

//   let a = await addtocartschema.insertOne({
//     Producttitle: ourproduct.Producttitle,
//     Productweight: ourproduct.Productweight,
//     Productimage: ourproduct.Productimage,
//     Productimage2: ourproduct.Productimage2,
//     Productimage3: ourproduct.Productimage3,
//     Productdescription: ourproduct.Productdescription,
//     Productcategory: ourproduct.Productcategory,
//     Productquantity: ourproduct.Productquantity,
//     Regularprice: ourproduct.Regularprice,
//     Saleprice: ourproduct.Saleprice,
//   });

//   let result = await a.save();

//   if (result) {
//     res.json({
//       status: true,
//     });
//   } else {
//     res.json({
//       status: false,
//     });
//   }
// });

// addtocartproduct--------------

// app.get("/addtocartproduct", async (req, res) => {
//   let a = await addtocartschema.find({});

//   if (a) {
//     res.json({
//       status: true,
//       addtocartproduct: a,
//     });
//   } else {
//     res.json({
//       status: false,
//     });
//   }
// });


//deleteaddtocartproduct---------------------
// app.post("/deleteaddtocartproduct", async (req, res) => {
//   let deleteourproduct = await addtocartschema.findOneAndDelete({
//     _id: req.body._id,
//   });

//   if (deleteourproduct) {
//     res.json({
//       status: true,
//     });
//   } else {
//     res.json({
//       status: false,
//     });
//   }
// });












// cart -----------------
// app.post("/cart",async(req,res)=>{
  
  // console.log(req.body)

//     let ourcart = req.body.cartitem
//     let a = await Cartitem.insertOne({
//         Producttitle: ourcart.Producttitle,
//         Productcategory: ourcart.Productcategory,
//         Productweight: ourcart.Productweight,
//         Productquantity: ourcart.Productquantity,
//         Productimage: ourcart.Productimage,
//         Productdescription: ourcart.Productdescription,
//         Regularprice: ourcart.Regularprice,
//         Saleprice: ourcart.Saleprice
//     })

//     let result = await a.save()

//     if (result) {
//         res.json({
//             status: true
//         })
//     }
//     else {
//         res.json({
//             status: false
//         })
//     }
// })





app.post("/cart", async (req, res) => {
  try {
    let ourcart = req.body.cartitem;

    let a = new Cartitem({
      Producttitle: ourcart.Producttitle,
      Productcategory: ourcart.Productcategory,
      Productweight: ourcart.Productweight,
      Productquantity: ourcart.Productquantity,
      Productimage: ourcart.Productimage,
      Productdescription: ourcart.Productdescription,
      Regularprice: ourcart.Regularprice,
      Saleprice: ourcart.Saleprice,
    });

    let result = await a.save();

    res.json({ status: true });
  } catch (error) {
    console.error("Cart Error:", error);
    res.status(500).json({ status: false });
  }
});







// allcart items--------------
app.get("/allcartitem",async(req,res)=>{
     let allcartitem = await Cartitem.find({})


    if (allcartitem) {
        res.json({
            status: true,
            ourcartitem: allcartitem
        })
    }
    else {
        res.json({
            status: false
        })
    }

})



// removecart item--------------------

app.post("/removecartitem", async (req, res) => {
        // console.log(req.body._id)   

  let removeitem = await Cartitem.findOneAndDelete({"_id": req.body._id});

  if (removeitem) {
    res.json({
      status: true,
    });
  } else {
    res.json({
      status: false,
    });
  }
});




// updatequantity--------------

app.post("/updatequantity",async(req,res)=>{
  // console.log(req.body.data._id)
  // console.log(req.body.quantity)

  let productid=req.body.data._id
  let updatedquantity=req.body.quantity


  let updateitem = await Cartitem.findOneAndUpdate({"_id": productid},{$set:
    {"Productquantity":updatedquantity}});


    if (updateitem) {
    res.json({
      status: true,
    });
  } else {
    res.json({
      status: false,
    });
  }


})







// product review-----------------

// app.post("/productreview", async (req, res) => {
  // console.log(req.body)

//   let a = await Reviews.insertOne({
//     productid: req.body.id,
//     name: req.body.review.fullname,
//     review: req.body.review.review,
//   });

//   let result = await a.save();

//   if (result) {
//     res.json({
//       status: true,
//     });
//   } else {
//     res.json({
//       status: false,
//     });
//   }
// });




app.post("/productreview", async (req, res) => {
  try {
    let a = new Reviews({
      productid: req.body.id,
      name: req.body.review.fullname,
      review: req.body.review.review,
    });

    let result = await a.save();

    res.json({ status: true });
  } catch (error) {
    console.error("Review Error:", error);
    res.status(500).json({ status: false });
  }
});






// review Get-----------------

app.get("/allreview", async (req, res) => {
  let allreviews = await Reviews.find({});
  // console.log(ourproduct)

  if (allreviews) {
    res.json({
      status: true,
      ourreview: allreviews,
    });
  } else {
    res.json({
      status: false,
    });
  }
});







// addaddress-----------
// app.post("/addaddress", async (req, res) => {

//     let ouraddress = req.body.address
//     let a = await address.insertOne({
//         firstname: ouraddress.firstname,
//         lastname: ouraddress.lastname,
//         address1: ouraddress.address1,
//         address2: ouraddress.address2,
//         city: ouraddress.city,
//         mobilenumber: ouraddress.mobilenumber,
//     })

//     let result = await a.save()

//     if (result) {
//         res.json({
//             status: true
//         })
//     }
//     else {
//         res.json({
//             status: false
//         })
//     }
// })





app.post("/addaddress", async (req, res) => {
  try {
    let ouraddress = req.body.address;

    let a = new address({
      firstname: ouraddress.firstname,
      lastname: ouraddress.lastname,
      address1: ouraddress.address1,
      address2: ouraddress.address2,
      city: ouraddress.city,
      mobilenumber: ouraddress.mobilenumber,
    });

    let result = await a.save();

    res.json({ status: true });
  } catch (error) {
    console.error("Add Address Error:", error);
    res.status(500).json({ status: false });
  }
});








app.get("/alladdresses", async (req, res) => {
  try {
    const all = await address.find({});
    res.json({ status: true, addresses: all });
  } catch (err) {
    console.log(err);
    res.json({ status: false, error: "Failed to fetch addresses" });
  }
});







// Port------------------
app.listen(8080, () => {
  console.log("node server start at 8080");
});




app.get("/",(req,res)=>{
  res.json({
    status:true
  })
})