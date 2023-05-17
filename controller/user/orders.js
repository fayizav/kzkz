const { log } = require("debug/src/browser");
const orders = require('../../helpers/user/orders')
const address = require('../../helpers/user/adddress')
const cart = require('../../helpers/user/cart')
const payment = require('../../helpers/user/payment')
const crypto = require('crypto');
const shortid=require('shortid')

// ...

// const orderIdHashed = crypto.createHash('sha256').update(orderId.toString()).digest('hex');
// res.render('user/userprofileorders1', { orderIdHashed });


const { category } = require("../../model/connection");

let loginStatus,username,orderId;
exports.Orderssuccessful=async(req,res)=>{
    orders.ordersuccess(orderId).then((order)=>{
        console.log(order,"tttttttttttttttttttttttttt");
        res.render('user/ordersuccess',{order})
    })
    
    },

exports.userprofile=(req,res)=>{
    res.render('user/userprofile')
},
exports.userprofileorders1=(req,res)=>{
    const userId = req.session.user._id;
    const getDate = (date) => {
        let orderDate = new Date(date);
        let day = orderDate.getDate();
        let month = orderDate.getMonth() + 1;
        let year = orderDate.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        return `${isNaN(day) ? "00" : day}-${isNaN(month) ? "00" : month}-${
          isNaN(year) ? "0000" : year
        } ${date.getHours(hours)}:${date.getMinutes(minutes)}:${date.getSeconds(
          seconds
        )}`;
      };
    orders. GetAllOrders(userId).then((orders)=>{
        console.log(orders[0].date);
        orders=orders.reverse()
        res.render('user/userprofileorders1',{orders,username,getDate})

    })
    
},
exports.userprofileordersview=(req,res)=>{
    console.log('snolygooster');
    const userId = req.session.user._id;
    const orderId=req.params.id
    console.log(orderId,"orderviieewwwwwww");
    orders.getOneOrder(orderId).then((singleOrder)=>{
        console.log("00000000000000000000000000000000000000000000000000");
        console.log(singleOrder,"ORDERS")
       
        console.log("00000000000000000000000000000000000000000000000000");
    res.render('user/userprofileordersview',{singleOrder,userId,username})
})
},

exports.cancelOrder= (req, res) => {
    console.log("deleteeeee",req.params.id);
    orders.Status(req.params.id).then(() => {
      orders
        .getViewproducts(req.params.id)
        .then((orderDetails) => {
          console.log("oooooooorrrrdddeeeerdetails", orderDetails);
          const userId = orderDetails.user;
          const total = orderDetails.totalPrice;
          const payment = orderDetails.paymentMethod;
          if (payment === "ONLINE") {
            orders.addWallet(userId, total).then((response) => {
              console.log(response, "addWAllleeeeeet");
              res.redirect("/order-page");
            });
          } else {
            res.redirect("/order-page");
          }
        })
        .catch((error) => {
          console.error(`the operation failed with error`);
        });
    });
}
exports.getBalance=(req, res) => {

}

exports.shopCheckOutt=async (req, res) => {
    const userId = req.session.user._id;


    let cartTotal =await cart.getTotalAmount(userId)
     address.getAddresses(userId).then((address) => {
    cart.viewCart(userId).then(async (cartProducts) =>{
        
        console.log(cartProducts,'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
        console.log(cartTotal );
        console.log(address,'swimming');
        let offerprice=req.session.offerprice
        console.log(offerprice,"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
        
    res.render('user/shop-checkoutt', {addresses: address,cart:cartProducts,cartTotal,offerprice});
    
    })
    })
    },
    

    exports.placeOrder=async(req,res) =>{

    try {
        const body=req.body
        console.log(body,"aleeshya");


console.log('ajmal');
console.log(req.body)
const addressId = req.body.address
const userId= req.session.user._id;
let cartCount = await cart.getCartCount(userId)
let cartTotal =await cart.getTotalAmount(userId)
let product = await orders.cartOrder(userId)
 let shippingAddress = await orders.getOrderAddress(userId,addressId)
 console.log('shipping address',shippingAddress);
 let requiredAddress={
    name:shippingAddress.address[0].name,
    firstLine:shippingAddress.address[0].firstLine,
    secondLine:shippingAddress.address[0].secondLine,
    city:shippingAddress.address[0].city,
    state:shippingAddress.address[0].state,
    pincode:shippingAddress.address[0].pincode

 }
let uniqueId=shortid.generate()

orders.placeOrder(req.body.paymentMethod,userId,product,cartTotal, requiredAddress,uniqueId).then((response)=>{
    console.log(response,"ppppppppppppppppppppppppppppppppppppp");
    orderId=response._id
    if (req.body["paymentMethod"] == "COD") {
        res.json({ COD: true });
      } else if(req.body["paymentMethod"]=="wallet"){
        console.log("hyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
       orders.balanceWallet(req.session.user_id).then((response)=>{
        console.log(response,'response');
        console.log(response[0].balance,"t555555555555555555555555555555555555555555555555");
        console.log(cartTotal,"77777777777777777777777777777777777777777777777777");

        let check=response[0].balance-cartTotal

        console.log(check,"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
        if(check>=0){
          console.log('userid',req.session.user._id);
          orders.updatewallet(req.session.user._id,check).then((response)=>{
            
            res.json({COD:true})
          })
        }
       })
       

      }
      
      
      
      
      else {
        
       payment.generateRazorpay (req.session.user._id,cartTotal).then((response)=>{
            res.json(response)
        })
      }
   
})
    } catch (error) {
        console.log(error.message);
    }
 
 },

 exports.getOrders=async(req, res) =>{
    const userId = req.session.user._id;
    let cartTotal;
    let cartProducts;
    let cartProductsPromise = cart.viewCart(userId);
  
    cartTotal = await cart.getTotalAmount(userId);
    console.log(cartTotal);
  
    cartProducts = await cartProductsPromise;
    console.log(cartProducts);
    console.log(cartProducts, "12345");
    res.render("user/order", { cart: cartProducts ,cartTotal,username});
  },
  
  exports.viewOrders=async(req,res)=>{
    console.log("haaaaaaaaaaaaiiiiiiii");
    let user
    if(req.session.user){
      user=req.session.user._id
    }
    console.log(req.params.id,'pinkkkkkkkkkkkkkkkkkkkkkkkkk');
  let products=await cart.getViewproducts(req.params.id)
  console.log("products......",products);
  console.log("products.product");
  orders.GetAllOrders(req.params.id).then(async(response)=>{
    console.log(response,"402 userController");
    res.render('user/userprofileordersview',{response,loggedInStatus,products,username})
    console.log("response in orderpage........");
    console.log(response);
  })
  },
  exports.orderconfirmation=async(req,res)=>{
    const body=req.body
    const addressId = req.body.address
  const userId= req.session.user._id;
    let cartTotal =await cart.getTotalAmount(userId)
  let product = await cart.cartOrder(userId)
   let shippingAddress = await cart.getOrderAddress(userId,addressId)
   console.log('shipping address',shippingAddress);
   let requiredAddress={
      name:shippingAddress.address[0].name,
      firstLine:shippingAddress.address[0].firstLine,
      secondLine:shippingAddress.address[0].secondLine,
      city:shippingAddress.address[0].city,
      state:shippingAddress.address[0].state,
      pincode:shippingAddress.address[0].pincode
  
   }
   res.render('user/orderconfirmation', {addresses,cart:cartProducts,cartTotal});
      
  
  
  },
  exports.orderconfirmation=async(req,res)=>{
    const body=req.body
    const addressId = req.body.address
  const userId= req.session.user._id;
    let cartTotal =await cart.getTotalAmount(userId)
  let product = await cart.cartOrder(userId)
   let shippingAddress = await orders.getOrderAddress(userId,addressId)
   console.log('shipping address',shippingAddress);
   let requiredAddress={
      name:shippingAddress.address[0].name,
      firstLine:shippingAddress.address[0].firstLine,
      secondLine:shippingAddress.address[0].secondLine,
      city:shippingAddress.address[0].city,
      state:shippingAddress.address[0].state,
      pincode:shippingAddress.address[0].pincode
  
   }
   res.render('user/orderconfirmation', {addresses,cart:cartProducts,cartTotal});
      
  
  
  },
  exports.cancelOrder=(req, res) => {
    console.log("deleteeeee");
    orders.Status(req.params.id).then(() => {
      orders
        .getViewproducts(req.params.id)
        .then((orderDetails) => {
          console.log("oooooooorrrrdddeeeerdetails", orderDetails);
          const userId = orderDetails.user;
          const total = orderDetails.totalPrice;
          const payment = orderDetails.paymentMethod;
          if (payment === "razorpay") {
            orders.addWallet(userId, total).then((response) => {
                console.log("haaaaaaaaaaiiiiiiii");
              console.log(response, "addWAllleeeeeet");
              res.redirect("/userprofileorders1");
            });
          } else {
            console.log("heeelllllllllooooooooo");
            res.redirect("/userprofileorders1");
          }
        })
        .catch((error) => {
          console.error(`the operation failed with error`);
        });
    });
  }
  exports.walletBalance=(req,res)=> {
    orders.balanceWallet(req.session.user._id).then(async(balance)=>{
      const userId= req.session.user._id;
      let cartTotal =await cart.getTotalAmount(userId)

      if(balance>cartTotal){
        balance=balance-cartTotal 
      }
      let updatedwallet=balance
        res.render('user/wallet',{balance})
    })
  }
  
  
  
  
