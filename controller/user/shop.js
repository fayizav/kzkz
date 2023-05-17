const { log } = require("debug/src/browser");
const products= require('../../helpers/user/products')

const { category } = require("../../model/connection");
let loggedInStatus,username;
exports.shopView=(req,res)=>{
    products.listProductShop().then((response)=>{
        products.findAllcategories().then((cat)=>{
            res.render('user/shop',{response,cat,loggedInStatus,username})
        })
       
   })
},
exports.zoomshopView=(req,res)=>{
    products. zoomlistProductShop(req.params.id).then((response)=>{
    res.render('user/imagezoom',{response, loggedInStatus})
    })
  

} 