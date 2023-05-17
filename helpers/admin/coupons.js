
const { log } = require('debug/src/node')
const db = require('../../model/connection')
module.exports={


    addcoupons1:(data)=>{
        return new Promise((resolve, reject) => {
            db.coupon.create(data).then((response)=>{
                if(response){
                    console.log("insert successfully");
                }else{
                    console.log("not inserted");
                }
            }
                
            )
        })



    },
    viewcoupons1:()=>{
        return new Promise((resolve, reject) => {
            db.coupon.find().then((response)=>{
                if(response){
                    console.log("successfully find");
                    resolve(response)
                }else{
                    console.log("not find");
                }
            })
            
        })
       
    }
}