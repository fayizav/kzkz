const { log } = require('debug/src/node')
const db = require('../../model/connection')


exports.getUserOrdersall=() => {
    return new Promise(async (resolve, reject) => {
      await db.order.find().exec().then((response) => {
        console.log(response, 'hai sona')
        let orders = response
        resolve(orders)
      })
    })
  },
  

  exports.changeStatus=(orderId, status) => {
    return new Promise((resolve, reject) => {
      console.log(orderId, '44444444444444444444');
      let dateStatus = new Date()
      db.order.updateOne({ _id: orderId },
        { $set: { status: status, date: dateStatus } }).then(() => {
          resolve()
        })
    })
  }
  


