const orders = require('../../helpers/admin/orders')
const db = require('../../model/connection')
const multer = require('multer')

exports.orders=async (req, res) => {
    try {
      const [order, adminStatus] = await Promise.all([
        
      
       ]);
       const getDate = (date) => {
        let orderDate = new Date(date);
        let day = orderDate.getDate();
        let month = orderDate.getMonth() + 1;
        let year = orderDate.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        return `${isNaN(day) ? "00" : day}-${isNaN(month) ? "00" : month}-${
          isNaN(year) ? "0000" : year
        } ${date.getHours(hours)}:${date.getMinutes(minutes)}:${date.getSeconds(
          seconds
        )}`;
      };

      orders.getUserOrdersall().then((orders)=>{

        res.render('admin/orders', {
          layout: 'adminLayout',
          adminStatus:true,
          orders,
          getDate
        });
      })
    } catch (error) {
      console.log(error);
    }
  },
  

exports.changeOrderStatus=async (req, res) => {
    // console.log(req.body,'njn ethiiiiiiiiiiiiiiiiiiii');
    orders.changeStatus(req.body.orderId,req.body.status).then(() => {
      res.json({ status: true })
    })
  },
  exports.orderview=(req, res) => {
    console.log('snolygooster');
    const userId = req.session.user ? req.session.user._id : null;
    const orderId = req.params.id;
    const name=req.body.name
    const getDate = (date) => {
      let orderDate = new Date(date);
      let day = orderDate.getDate();
      let month = orderDate.getMonth() + 1;
      let year = orderDate.getFullYear();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      return `${isNaN(day) ? "00" : day}-${isNaN(month) ? "00" : month}-${
        isNaN(year) ? "0000" : year
      } ${date.getHours(hours)}:${date.getMinutes(minutes)}:${date.getSeconds(
        seconds
      )}`;
    };
    orders.getOneOrder(orderId).then((singleOrder) => {
        console.log("00000000000000000000000000000000000000000000000000");
        console.log(singleOrder, "ORDERS")
        console.log(singleOrder[0].products.length);
        console.log("00000000000000000000000000000000000000000000000000");
        res.render('user/userprofileordersview', { singleOrder, userId, name,getDate})
    })
  }
  








  
