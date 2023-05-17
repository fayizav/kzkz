
const bcrypt = require('bcrypt')
const { user } = require("../../model/connection");
const db = require('../../model/connection')
const {ObjectId}  = require("mongodb") 
const { ObjectID } = require("bson")

const { log } = require('debug/src/node')








exports.otpverification=(otpvariable)=>{
    return new Promise(async(resolve, reject) => {
        await db.products.findOne({
            phoneNumber:otpvariable  }).then((response)=>{
            resolve(response)
        })
       })
     }