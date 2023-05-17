    
    const bcrypt = require('bcrypt')
    const { user } = require("../../model/connection");
    const db = require('../../model/connection')
    const {ObjectId}  = require("mongodb") 
    const { ObjectID } = require("bson")
    
    const { log } = require('debug/src/node')
    
    
    
    
    
    
    
    
    
    exports.doSignUp=(userData)=>{
      let response= {}
      return new Promise(async(resolve,reject)=>{
          

          try{
              email= userData.email;
              existingUser=  await db.user.findOne({email:email})
              if (existingUser)
              {
                  response= {status:false}
                  return resolve(response)
              }
              else{
                  var hashPassword= await bcrypt.hash(userData.password,10);
                  const data = {
                   
                      username:userData.name,
                      Password:hashPassword,
                      email:userData.email,
                      phoneNumber:userData.phonenumber
                  }
                   
                  console.log(data);
                  await db.user.create(data).then((data)=>{
                      resolve({data,status:true})
                  })

              }

          }
          catch(err){
              console.log(err)
          }
      })
  }

