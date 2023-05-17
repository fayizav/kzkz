const bcrypt = require('bcrypt')

const db = require('../../model/connection')
const {ObjectId}  = require("mongodb") 
const { ObjectID } = require("bson")

const { log } = require('debug/src/node')






exports.viewAddress=(userId)=>{
    return new Promise(async(resolve,reject)=>{
      let address=await db.orders.aggregate([
        {
          $match:{
            'user':new ObjectId(userId)
          }
        }
      ])
      console.log(address,"2hjasaskh")
      resolve(address)
    })
  },
  exports.address=(userId,add) => {
    console.log('dilsha');
    return new Promise(async(resolve, reject) => {
     
      let ordAdd={
        name:add.name,
        firstLine:add.firstLine,
        secondLine:add.secondLine,
        city:add.city,
        state:add.state,
        pincode:add.pincode
      }
      let addressObj={
        user:userId,
        address:ordAdd
      }

      let userExist= await db.address.findOne({user:userId})
      if (!userExist){
        let addressdata=await db.address(addressObj);
      await addressdata.save()
      resolve(addressdata)
      }else{
        db.address.findOneAndUpdate({user:userId},{$push:{address:ordAdd}},function(err){
          if(err){
            console.log(err);
          }
        }).then((response)=>{
          resolve()
      })
      }
      
        
      })
      
      
  },
  exports.getAddresses=(userId) => {
    console.log(userId,"june")
    return new Promise(async(resolve, reject) => {
   console.log(userId,'userssssssss');

    await db.address.findOne({user:ObjectId(userId)}).then((response)=>{
      console.log(response)
        resolve(response)
    })
  //  const addresses= await db.order.aggregate(
  //   [
  //   {
  //     '$match': {
  //       '_id': new ObjectId(userId)
  //     }
  //   }, {
  //     '$unwind': 
  //       {'path': '$shippingAddress'}
      
  //   }, {
  //     '$project': {
  //       // 'address': 1,
  //       // '_id':0
  //       name:'$address.name',
  //       contactNumber: '$address.contactNumber',
  //       firstLine:"$address.firstLine",
  //       secondLine:'$address.secondLine',
  //       city:'$address.city',
  //       state:'$address.state',
  //       pincode:'$address.pincode',
  //       _id:'$address._id'
  //     }
  //   }
  // ]
  // )
  // console.log(addresses,'july');
  //   resolve(addresses)   
    });
    }

   
  
  
