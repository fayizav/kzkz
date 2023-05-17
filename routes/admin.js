var express = require('express');
var router = express.Router();

const db = require('../model/connection')
const multer = require('multer')
const photoload = require('../multer/multer')
const authentication = require('../middleware/middlewares')
const category = require('../controller/admin/category')
const loginadmin = require('../controller/admin/loginadmin')
const orders = require('../controller/admin/orders')
const products = require('../controller/admin/products')
const userblock= require('../controller/admin/userblock')
const coupons=require('../controller/admin/coupons')

//showdashboard
router.get('/',authentication.adminAuth,loginadmin.showDashboard)

//login
router.route('/login')
    .get(loginadmin.getAdminLogin)
    .post(loginadmin.postAdminLogin)


//logout
router.get('/logout', authentication.adminAuth,loginadmin.adminLogout)

//get userslist
router.get('/view-users',authentication.adminAuth, loginadmin.getUserlist)

//blockuser
router.post('/block-users/:id',authentication.adminAuth,userblock.blockTheUser)
//unblockuser
router.post('/unblock-users/:id',authentication.adminAuth,userblock.unblockTheUser)


//add and post products
router.route("/add-product")
        .all(authentication.adminAuth)
        .get(products.addProducts)
        .post(photoload.uploads.array('images',4), products.postProducts)

//view products
router.get('/view-product',authentication.adminAuth, products.viewProducts)
//edit products
router.route('/edit-product/:id')
        .all(authentication.adminAuth)
        .get(products.editProduct)
        .post(photoload.uploads.array('images',4),products.post_EditProduct)
//delete product
router.get('/delete-product/:id',authentication.adminAuth,products.deleteTheProduct)


//category
router.route('/add-category')
        .all(authentication.adminAuth)
        .get(category.getCategory)
        .post(category.postCategory)
 //delete category
router.get("/delete-category/:id",authentication.adminAuth,category.deleteCategory)
//edit category
router.get('/edit_category/:id',authentication.adminAuth,category.editTheCategory)
//post category
router.post('/edit-category/:id',authentication.adminAuth,category.posttheCategory)


//orders
router.get('/orders',authentication.adminAuth,orders.orders)

router.get('/order-details/:id',authentication.adminAuth,orders.orderview)

//coupons
router.get('/view-coupons',authentication.adminAuth,coupons.viewcoupons)
router.post('/addcoupon',authentication.adminAuth,coupons.addcoupons)











module.exports = router;