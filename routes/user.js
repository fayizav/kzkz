var express = require('express');
var router = express.Router();
const authentication = require('../middleware/middlewares')
const address=require('../controller/user/address')
const cart=require('../controller/user/cart')
const orders=require('../controller/user/orders')
const otp=require('../controller/user/otp')
const payment=require('../controller/user/payment')
const shop=require('../controller/user/shop')
const signup=require('../controller/user/signup')
const userlogin=require('../controller/user/userlogin')
const coupon=require('../controller/user/coupon')




 //gethome
router.get('/',userlogin.getHome)

//signup
router.route('/signup').get(signup.showSignup).post(signup.postSignup)
router.route('/login').get(userlogin.showLogin).post(userlogin.postLogin)

//otp login
router.get('/otplogin',otp.showotp)
router.put('/sendOtp',otp.postotp)

//shop view
router.get('/shop',shop.shopView)

//zoom shop view
router.get('/zoomView/:id',shop.zoomshopView)

// add to cart
router.get('/add-to-cart/:id',authentication.userAuth,cart.addToCart)

//cart view
router.get('/cart',authentication.userAuth,cart.cartview)

//shopCheckOutt
router.get('/shop-checkoutt',authentication.userAuth,orders.shopCheckOutt)

//address 
router.post('/address',authentication.userAuth,address.postaddress)

//change product quantity
router.post('/change-product-quantity',authentication.userAuth,cart.changeQuantity)

//delete cart product
router.get("/delete-cart-product/:id", authentication.userAuth,cart.deleteCartProduct)

//place order 
router.post('/place-order',authentication.userAuth,orders.placeOrder)

//verify payment route
router.post('/verify_payment',payment.verifyPayment)

//get orders
router.get('/order',orders.getOrders)

//order successfull
router.get('/ordersuccess',authentication.userAuth,orders.Orderssuccessful)

//user logout
router.get('/logout',authentication.userAuth,userlogin.userlogout)

//userprofile
router.get('/userprofile',authentication.userAuth,orders.userprofile)

//user profile addresss
router.get('/userprofileaddress',authentication.userAuth,address.userprofileaddress)
router.get('/wallet',authentication.userAuth,orders.walletBalance)

//userprofileorders1
router.get('/userprofileorders1',authentication.userAuth,orders.userprofileorders1)

//userprofileordersview1
router.get('/userprofileordersview1/:id',authentication.userAuth,orders.userprofileordersview)

router.get('/order-cancel/:id',authentication.userAuth,orders.cancelOrder)

router.get('/wallet',authentication.userAuth,orders.getBalance)
//coupons
router.post('/applycoupon',authentication.userAuth,coupon.applycoupon)










 




module.exports = router;