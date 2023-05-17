
const db = require('../../model/connection')

module.exports={
    applycoupon1:(data)=>{
        return new Promise((resolve, reject) => {
            console.log('helo');
            console.log(data);
            db.coupon.find({code:data}).then((response)=>{
                if(response){
                    console.log("find");
                    resolve(response)
                }else{
                    console.log("not find");
                }
            })
        })
    }
}