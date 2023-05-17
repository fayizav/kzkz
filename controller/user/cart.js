const { log } = require("debug/src/browser");

const { category } = require("../../model/connection");
const cart = require('../../helpers/user/cart')

let loggedInStatus,username;
exports.addToCart=(req,res)=>{
    const userId= req.session.user._id
    console.log(userId,"ppppppppppp")
    

    const productId =req.params.id
   cart.addToCarts(userId,productId).then((response)=>{
        res.json({status:true})
    })
   },


   exports.cartview=(req,res) =>{

    
    let userId;
           if(req.session.user){
            userId = req.session.user._id
           }
           console.log(userId,"llllllllll");
    cart.viewCart(userId).then(async (cartProducts) =>{
        console.log(cartProducts,'cartproducts')
        let cartCount = await cart.getCartCount(userId);
       
        let cartTotal = await cart.getTotalAmount(userId)
      let formmattedcartTotal=new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(cartTotal);
        console.log(cartCount,)
       res.render('user/shop-cart',{cart:cartProducts,  cartCount:cartCount, cartTotal: formmattedcartTotal,loggedInStatus,username});
       
    });
},

   
exports.changeQuantity=(req, res) => {
        console.log(req.body);
        cart.changeProductQuantity(req.body).then(async (response) => {
          response.total = await cart.getTotalAmount(req.session.user._id); 
          response.subtotal = await cart.getSubtotalAmount(req.session.user._id, req.body.product);
          console.log(response)
          res.json(response);
        });
  },
  
  exports.deleteCartProduct=(req, res) => {
    cart
      .removeitem(req.params.id, req.session.user._id)
      .then((response) => {
        res.redirect("/cart");
      })
      .catch((err)=>{
        console.log(err);
        res.redirect("/cart");

      })
  }

 