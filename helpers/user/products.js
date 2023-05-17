
const bcrypt = require('bcrypt')
const { user } = require("../../model/connection");
const db = require('../../model/connection')
const {ObjectId}  = require("mongodb") 
const { ObjectID } = require("bson")

const { log } = require('debug/src/node')








exports.listProductShop=()=>{
    return new Promise(async(resolve, reject) => {
      await db.products.find().exec().then((response)=>{
        resolve(response)
     })
    })
  },
  exports.zoomlistProductShop=(productId)=>{
    return new Promise(async(resolve, reject) => {
      await db.products.findOne({_id:productId}).exec().then((response)=>{

        resolve(response)
     })
    })
  },
  exports.findAllcategories=()=>{
    return new Promise (async(resolve,reject)=>{
        await db.category.find().exec().then((response)=>{
            resolve(response)
        })

    })
}
  