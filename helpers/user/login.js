const bcrypt = require('bcrypt')
const { user } = require("../../model/connection");
const db = require('../../model/connection')
const {ObjectId}  = require("mongodb") 
const { ObjectID } = require("bson")

const { log } = require('debug/src/node')








exports.dologin=(userData)=>{   
    return new Promise (async(resolve,reject)=>{
        try{
          let user = await db.user
        .findOne({ email: userData.email });
      if (user) {
        if (user.blocked == false) {
          bcrypt.compare(userData.password, user.Password).then((status) => {
            if (status) {
              let username = user.name;
              resolve({ loggedInStatus: true, username, user });
            } else {
              resolve({ loggedInStatus: false });
            }
          });
        } else {
          resolve({ blockedStatus: true });
        }
      } else {
        resolve({ loggedInStatus: false });
        }
      }
        catch(err){
            console.log(err);
        }

        }) 
    

}

  