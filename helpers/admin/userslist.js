const { log } = require('debug/src/node')
const db = require('../../model/connection')

exports.listUsers=()=>{
    let userData=[]

    return new Promise(async(resolve,reject)=>{
         db.user.find().exec().then((result)=>{
            userData= result
            resolve(result)
            
        })
        console.log(userData);
        
    })
},
exports.blockUser=(userId)=>{
    return new Promise(async(resolve,reject)=>{
    await db.user.updateOne({_id:userId},{$set:{blocked:true}}).then((data)=>{
        console.log('user blocked success');
        resolve()
    })
    })
}, 

exports.UnblockUser=(userId)=>{
    return new Promise(async(resolve,reject)=>{
    await db.user.updateOne({_id:userId},{$set:{blocked:false}}).then((data)=>{
        console.log('user unblocked success');
        resolve()
    })
    })
}
