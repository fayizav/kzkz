const bcrypt = require('bcrypt')
const { user } = require("../../model/connection");
const db = require('../../model/connection')
const { ObjectId } = require("mongodb")
const { ObjectID } = require("bson")

const { log } = require('debug/src/node')














exports.addToCarts = (userId, prodId) => {
  //  console.log(userId,prodId,'faaaaaaaaaaaaaaaaaaaaaaaaaaaaaaay');
  return new Promise(async (resolve, reject) => {
    var proobj = {
      product: ObjectId(prodId),
      quantity: 1
    }
    var obj = {
      userid: userId,
      products: proobj
    }
    let usercart = await db.cart.find({ userid: userId })
    if (usercart.length < 1) {
      db.cart.create(obj)
    } else {

      let proExist = await db.cart.findOne({ userid: userId, "products.product": ObjectId(prodId) })

      console.log(proExist + "PRO EXIST TTT TTT");

      if (proExist) {
        db.cart.findOneAndUpdate({ userid: userId, "products.product": ObjectId(prodId) }, { $inc: { "products.$.quantity": 1 } }, function (err) {
          if (err) {
            console.log(err);
          }
        })
      }
      else {
        db.cart.findOneAndUpdate({ userid: userId }, { $push: { products: proobj } }, function (err) {
          if (err) {
            console.log(err);
          }
        })
      }
    }
  }).then((response) => {
    resolve()
  })

},


  exports.viewCart = (userId) => {
    return new Promise(async (resolve, reject) => {
      let cartproducts = await db.cart.aggregate(

        [
          {
            '$match': {
              'userid': new ObjectId(userId)
            }
          }, {
            '$unwind': '$products'



          }, {
            '$project': {
              'product': '$products.product',
              'quantity': '$products.quantity'
            }
          }, {
            '$lookup': {
              'from': 'products',
              'localField': 'product',
              'foreignField': '_id',
              'as': 'products'
            }
          }, {
            '$project': {
              'product': 1,
              'products': 1,
              'quantity': 1,
              'sample': {
                '$arrayElemAt': [
                  '$products', 0
                ]
              }
            }
          }, {
            '$project': {
              'product': 1,
              'products': 1,
              'quantity': 1,
              'price': '$sample.Price'
            }
          }, {
            '$project': {
              'product': 1,
              'products': 1,
              'quantity': 1,
              'subtotal': {
                '$multiply': [
                  {
                    '$toInt': '$quantity'
                  }, {
                    '$toInt': '$price'
                  }
                ]
              }
            }
          }
        ]
      )
      console.log(cartproducts, 'xxxxxxxxxxxxxxxxxxxxxxx');

      resolve(cartproducts)

    })



  },
  exports.changeProductQuantity = (details) => {
    count = parseInt(details.count);
    quantity = parseInt(details.quantity);
    return new Promise((resolve, reject) => {

      if (count == -1 && quantity == 1) {
        db.cart
          .updateOne(
            { _id: ObjectId(details.cart) },
            {
              $pull: { products: { item: ObjectId(details.product) } },
            }
          )
          .then((response) => {
            resolve({ removeProduct: true });
          });
      } else {
        db.cart
          .updateOne(
            {
              _id: ObjectId(details.cart),
              "products.product": ObjectId(details.product),
            },
            {
              $inc: { "products.$.quantity": count },
            }
          )
          .then((response) => {
            resolve({ status: true });
          });
      }
    });
  },


  exports.getSubtotalAmount = (userId, product) => {
    console.log('gggggggggggggg')
    return new Promise(async (resolve, reject) => {
      let subtotal = await db.cart
        .aggregate(
          [
            {
              '$match': {
                'userid': new ObjectId(userId)
              }
            }, {
              '$unwind': {
                'path': '$products'
              }
            }, {
              '$match': {
                'products.product': new ObjectId(product)
              }
            }, {
              '$lookup': {
                'from': 'products',
                'localField': 'products.product',
                'foreignField': '_id',
                'as': 'cartproducts'
              }
            }, {
              '$project': {
                'quantity': '$products.quantity',
                'product': {
                  '$arrayElemAt': [
                    '$cartproducts', 0
                  ]
                }
              }
            }, {
              '$project': {

                'subtotal': {

                  '$multiply': [
                    {
                      '$toInt': '$quantity'
                    }, {
                      '$toInt': '$product.Price'
                    }
                  ]

                }
              }
            }
          ]

        )

      resolve(subtotal[0]?.subtotal);
    });
  },

  exports.getCartCount = (userId) => {
    console.log('CART COUNT IS WRONG');
    let count = 0
    return new Promise(async (resolve, reject) => {
      let cart = await db.cart.findOne({ user: ObjectId(userId) })
      if (cart) {
        count = cart.products.length
      }
      resolve(count)
      console.log(count, 'COUNT IS WRONG')
    })
  },

  exports.removeitem = (productid, userid) => {

    return new Promise(async (resolve, reject) => {
      db.cart.updateOne({ userid: userid, "products.product": ObjectId(productid) }, { $pull: { products: { product: ObjectId(productid) } } }).then((response) => {
        resolve(response)
      })
    })
  },
  exports.getTotalAmount = (userId) => {
    return new Promise(async (resolve, reject) => {
      let total = await db.cart
        .aggregate(
          [
            {
              '$match': {
                'userid': new ObjectId(userId)
              }
            }, {
              '$unwind': {
                'path': '$products'
              }
            }, {
              '$project': {
                'item': '$products.product',
                'quantity': '$products.quantity'
              }
            }, {
              '$lookup': {
                'from': 'products',
                'localField': 'item',
                'foreignField': '_id',
                'as': 'product'
              }
            }, {
              '$project': {
                'item': 1,
                'quantity': 1,
                'product': {
                  '$arrayElemAt': [
                    '$product', 0
                  ]
                }
              }
            }, {
              '$group': {
                '_id': null,
                'total': {
                  '$sum': {
                    '$multiply': [
                      {
                        '$toInt': '$quantity'
                      }, {
                        '$toInt': '$product.Price'
                      }
                    ]
                  }
                }
              }
            }
          ]
        )
      console.log(total, "I CAN AND I WILL");
      resolve(total[0]?.total);
    });
  },
  exports.removeitem = (productid, userid) => {

    return new Promise(async (resolve, reject) => {
      db.cart.updateOne({ userid: userid, "products.product": ObjectId(productid) }, { $pull: { products: { product: ObjectId(productid) } } }).then((response) => {
        resolve(response)
      })
    })
  }
