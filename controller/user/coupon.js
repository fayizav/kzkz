const { category } = require("../../model/connection");
const coupon = require('../../helpers/user/coupon')
const cart = require('../../helpers/user/cart')

module.exports={
    applycoupon:(req,res)=>{
        code=req.body.code
        coupon.applycoupon1(code).then((data)=>{
            previousUrl=req.header('Referer')
            console.log('ggggggggggggggggggggggg',data);
            const currentDate = new Date();
            const expiryDate = new Date(data.expire); 
            if (currentDate.getTime() > expiryDate.getTime()) {
            console.log("Coupon has expired");
            } else {
                const userId= req.session.user._id
                cart.getTotalAmount(userId).then((totalamount)=>{
                    console.log("blooooooooooooooooooooooooooooooo");
                    minimum=data[0].min
                    console.log(minimum)
                    if(totalamount>minimum){
                        console.log("foooooooooooooooooooool");
                        discountamount=(totalamount/100)*data[0].discount
                         if(discountamount>data[0].limit)
                         {
                            discountamount=data[0].limit
                            totalamount=totalamount-discountamount
                            offerprice=totalamount
                            req.session.offerprice=offerprice
                            res.redirect(previousUrl)

                        }else{

                            totalamount=totalamount-discountamount
                            offerprice=totalamount
                            req.session.offerprice=offerprice
                            res.redirect(previousUrl)
                          

                         }

                    }else{
                        console.log("kiteela");
                    }
                })
            console.log("Coupon is still valid");
            }

        })
    }
}