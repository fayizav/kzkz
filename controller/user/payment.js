const { log } = require("debug/src/browser");
const payment = require('../../helpers/user/payment')

const { category } = require("../../model/connection");
const Razorpay=require("Razorpay")

let loggedInStatus;
var instance = new Razorpay({
    key_id: "rzp_test_E6MNPnyr0tBqss",
    key_secret: "wRMIwKaycq0tnWUxjqb0FIvP",
  });

let loginStatus,username;



exports.verifyPayment= (req, res) => {
    try {
      payment
        .verifyPayment(req.body)
        .then((response) => {
            res.json({ status: true });
        })
        .catch((err) => {
          res.json({ status: "payment failed" });
        });
    } catch {
      res.render("error");
    }
  }
