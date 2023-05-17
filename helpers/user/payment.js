const bcrypt = require('bcrypt')
const { user } = require("../../model/connection");
const db = require('../../model/connection')
const {ObjectId}  = require("mongodb") 
const { ObjectID } = require("bson")

const { log } = require('debug/src/node')
const Razorpay=require("Razorpay")

var instance = new Razorpay({
  key_id: "rzp_test_E6MNPnyr0tBqss",
  key_secret: "wRMIwKaycq0tnWUxjqb0FIvP",
});






exports.generateRazorpay=(userId, totalPrice) => {
    console.log(
      totalPrice,"<<<<<<<<<<<"
    );
    return new Promise(async(resolve, reject) => {
      let orders=await db.order.find({user:userId})
      let order=orders[orders.length-1]
      let orderId=order._id
      var options = {
        amount: totalPrice * 100,
        currency: "INR",
        receipt: "" + orderId,
      };
      instance.orders.create(options, function (err, order) {
        if (err) {
          console.log(err,'444444444444444');
          
        } else {
          console.log("New order:", order);
          resolve(order);
          console.log("finish");
        }
      });
    });
  },
  
  exports.verifyPayment=async(details) => {
    return new Promise((resolve, reject) => {
      try {
        const crypto = require("crypto");
        let hmac = crypto.createHmac("sha256",instance.key_id);
        hmac.update(
          details["payment[razorpay_order_id]"] +
            "|" +
            details["payment[razorpay_payment_id]"]
        );
        hmac = hmac.digest("hex");
        if (hmac == details["payment[razorpay_signature]"]) {
          resolve(response);
        } else {
          reject("not match");
        }
      } catch (err) {
        reject(err);
      }
    });
  }                                                         