const db = require('../../model/connection')
const coupons = require('../../helpers/admin/coupons')

module.exports={
    
    
    
    viewcoupons:(req,res)=>{
        coupons.viewcoupons1().then((response)=>{
            res.render('admin/coupon',{layout:"adminLayout",response,adminStatus:true})

        })
        
    } ,

    addcoupons:(req,res)=>{
        console.log(req.body);
        coupons.addcoupons1(req.body)
        
    }

}
