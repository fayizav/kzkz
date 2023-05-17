const bcrypt = require('bcrypt')
const { user } = require("../../model/connection");
const db = require('../../model/connection')
const { ObjectId } = require("mongodb")
const { ObjectID } = require("bson")

const { log } = require('debug/src/node')









exports.cartOrder = async (userId) => {
  try {
    return new Promise(async (resolve, reject) => {
      const cartItems = await db.cart.aggregate([
        { $match: { userid: ObjectId(userId) } },
        { $unwind: "$products" },
        {
          $lookup: {
            from: "products",
            localField: "products.product",
            foreignField: "_id",
            as: "products.product"
          }
        },
        { $unwind: "$products.product" },
        {
          $group: {
            _id: "$_id",
            userid: { $first: "$userid" },
            products: { $push: "$products" }
          }
        },
        {
          $project: {
            _id: 0,
            userid: 1,
            products: {
              product: {
                _id: 1,
                Productname: 1,
                ProductDescription: 1,
                Price: 1,
                Image: 1

              },
              quantity: 1
            }
          }
        }
      ]);
      //console.log('helooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo');
      //console.log(cartItems)
      resolve(cartItems[0].products)

    })

  } catch (error) {
    //console.log(error)
  }

},
  exports.getOrderAddress = (userId, addressId) => {
    //console.log('addressssId', addressId);
    return new Promise(async (resolve, reject) => {
      await db.address.findOne({ user: ObjectId(userId), 'address._id': ObjectId(addressId) }, { 'address.$': 1, _id: 0 }).then((response) => {
        resolve(response)
      })
    })

  },



  exports.placeOrder = (paymentMethod, userId, products, total, address, uniqueId) => {


    return new Promise(async (resolve, reject) => {

      let status = paymentMethod === 'COD' ? 'placed' : 'pending'

      //console.log('kjhgfghgfgh', products);
      let orderObj = {
        shippingAddress: address,
        user: ObjectId(userId),
        paymentMethod: paymentMethod,
        products: products,
        totalPrice: parseInt(total),
        status: status,
        displayDate: new Date().toDateString(),
        date: new Date(),
        uniqueId: uniqueId
      }

      let proDetails = await db.cart.aggregate([{ $match: { userid: new ObjectId(userId) } }, { $unwind: "$products" }, {
        $project: {
          productId: "$products.product",
          quantity: "$products.quantity",
        }},
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "proDetails",
          }
        },
        { $unwind: "$proDetails" },
        {
          $project: {
            _id: "$proDetails._id",
            quantity: 1,
            productName: "$proDetails.productname",
            price: "$proDetails.Price",
            category: "$proDetails.category",
            image: "$proDetails.Image",
          },
        },
      ])

      //console.log(proDetails, "8888888888888888888888");
      for (let i = 0; i < proDetails.length; i++) {
        await db.products
          .updateOne(
            { _id: new ObjectId(proDetails[i]._id) },
            { $inc: { Quantity: -proDetails[i].quantity } }
          );
      }


      let orderInstance = new db.order(orderObj);
      await orderInstance.save().then(async(response) => {
        
        await db.cart.deleteMany({ user: ObjectId(userId) })


        //console.log("rameesssssssssssssssssssssssssss", response, "rameessssssssssssssssssssssssssss");
        resolve(response)

      }).catch((err) => {
        //console.log(err, 'error');
        reject(err)
      })
    })
  },
  exports.GetAllOrders = (orderId) => {
    return new Promise(async (resolve, reject) => {
      let orders = await db.order.find({ user: ObjectId(orderId) })
      resolve(orders)

    })
  },
  exports.getOneOrder = (orderId) => {
    //console.log(orderId)
    return new Promise(async (resolve, reject) => {
      let singleOrder = await db.order.find({ _id: orderId })
      //console.log('hipocrats', singleOrder);
      resolve(singleOrder)

    })
  },
  exports.getViewproducts = (orderId) => {
    return new Promise(async (resolve, reject) => {
      let orderDetails = await db.order.findOne({ _id: ObjectId(orderId) })
      resolve(orderDetails)
    })

  },
  exports.Status=(orderId, orderDetails) => {
    //console.log("ordere cancel details", orderDetails);
    return new Promise(async (resolve, reject) => {
      await db.order
        .updateOne({ _id: orderId }, { $set: { status: "cancelled" } })
        .then((response) => {
          //console.log("reeeee", response);
          resolve(response);
        })
        .catch((error) => {
          console.error(`the operation failed with error`);
        });
    });
  },
  exports.getViewproducts= (orderId) => {
    return new Promise(async (resolve, reject) => {
      let orderDetails = await db.order.findOne({ _id: ObjectId(orderId) });
      // //console.log(orderDetails,"prroooooooo")
      // //console.log(orderDetails.products[0]);
      //in productDetails address is in the form of objectId so we waant to find out the address in the order using aggregation and call it
      //in the controller
      resolve(orderDetails);
      //console.log("order details in get view products:", orderDetails);
    });
  },
  exports.addWallet= async (userId, total) => {
    try {
      const userWallet = await db.wallet.findOne({ user: userId });
      if (userWallet) {
        const response = await db.wallet.updateOne(
          { user: userId },
          { $inc: { balance: total } }
        );
        return { message: "Wallet updated successfully", response };
      } else {
        const walletObj = {
          user: userId,
          balance: total,
        };
        const response = await db.wallet.create(walletObj);
        return { message: "New wallet created successfully", response };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
  exports.balanceWallet= (userId) => {
    console.log("helllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll");
    try {
      return new Promise(async (resolve, reject) => {
        await db.wallet
          .find({ userid: ObjectId(userId) })
          .then((balance) => {
            resolve(balance);
          })
          .catch((err) => {
            // If there was an error retrieving the balance, reject the promise with the error message
            reject(err);
          });
      });
    } catch (err) {
      // If there was an error with the promise, reject the promise with the error message
      return Promise.reject(err);
    }
  
  }
exports.ordersuccess=(orderId)=>{
  return new Promise(async(resolve, reject) => {
    
    let order=await db.order.findOne({_id:new ObjectId(orderId)})
    resolve(order)
  })
}
exports.updatewallet=(id,total)=>{
  return new Promise((resolve,reject)=>{
     db.wallet.updateOne({user:id},{$set:{balance:total}}).then((response)=>{
      if(response){
        console.log(response,"1111111111111111111111111111111");
        resolve(response)
      }
    })
    
  })

}
  